<?php
class gvtPdn{
static $serie='gvtPdn';
static $tbk='gvt_opdn';
static $tbk1='gvt_pdn1';
static $tbk99='gvt_doc99';
static public function get($D){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.cardId,A.cardName,A.docType,A.docDate,A.docTotal,A.curr,A.docTotalME,A.userId,A.dateC
	FROM '.self::$tbk.' A';
	return iDoc::get($D);
}
static public function getOne($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,A.*
	FROM gvt_opdn A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.buyUdm, B.* FROM gvt_pdn1 B
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto.')){}
	//else if(_js::iseErr($_J['fdpId'],'La forma de pago debe estar definida.','numeric>0')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.')){}
	else if(_js::iseErr($_J['dueDate'],'La fecha de vencimiento debe estar definida.')){}
	else if(_js::iseErr($_J['pymId'],'Condición de pago: debe estar definida.','numeric>0')){}
	else if(_js::iseErr($_J['whsId'],'La bodega debe estar definida.','numeric>0')){}
	else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['ref2'],20,'Ref. 2: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ _err::err($js); }
	else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
}
static public function post($_J=array()){
	_ADMS::lib('docSeries,JLog');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	if($_J['ott']=='gvtPor'){/* Generar desde Por */
		return self::fromPor($_J);
	}
	else{
		$_J['docStatus']='C'; $errs=0;
		a_sql::transaction(); $cmt=false;
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
		'qtyMov'=>'inQty','revWhs'=>'Y','handInv'=>'Y',
		'priceIsCost'=>'Y',
		'ori'=>'gvtPdn::post()'));
		$nl=1; $reqAcc=array('accIvt','accBuyRem');
		foreach($_J['L'] as $nx=>$L){
			$L['whsId']=$_J['whsId'];
			$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ return _err::$errText; }
			$L['inQty']=$L['quantity'];
			$nDoc->handSet($L);
			unset($L['inQty']);
			//L1 Doc
			$L[0]='i'; $L[1]=self::$tbk1;
			$nDoc->L1[]=$L;
			if(1){
				//$costT=$nDoc->La['costLine'];
				$costT=$L['priceLine'];
				//L1 Dac
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'debBal'=>$costT,'accCode'=>'14xx');
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accBuyRem'],'creBal'=>$costT,'accCode'=>'2330xx');
			}
		}
		if(_err::$err){ return _err::$errText; }
		$nDoc->post($_J); $docEntry=$nDoc->docEntry;
		if(_err::$err){ return _err::$errText; }
		self::dacPost($nDoc); /* Contabilizar */
		if(_err::$err){ return _err::$errText; }
		$nDoc->handPost(); {/* Mover Inventario */
		if(_err::$err){ return _err::$errText; }
		if($errs==0){ $cmt=true; //Log
			$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		}
	}
		a_sql::transaction($cmt);
	}
	return $js;
}
static public function putStatusCancel($D=array()){
	_ADMS::lib('iDoc,JLog');
	a_sql::transaction(); $cmt=false;
	$ori=' on[gvtPdn::putCancel()]';
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'reqMemo'=>'Y','lineMemo'=>$D['lineMemo'],'D'=>'Y'));
	if(_err::$err){ return _err::$errText; }
	else{ $errs=0;
		_ADMS::mApps('gfi/Dac');
		gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
		if(_err::$err){ return _err::$errText; }
		else{
			_ADMS::mApps('ivt/Ivt');
			IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
			if(_err::$err){ return _err::$errText;}
			else{ $cmt=true;
				$js=_js::r('Documento anulado correctamente.');
				JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'N'));
			}
		}
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function fromPor($_J=array()){
	_ADMS::lib('iDoc,JLog');
	iDoc::vStatus(array('tbk'=>'gvt_opor','docEntry'=>$_J['otr']));
	if(_err::$err){ return _err::$errText; }
	if($js=docSeries::revi($_J)){ return _err::err($js); }
	else if(!is_array($_J['L']) || count($_J['L'])==0){ return (_js::e(3,'No se han enviado lineas a recibir.')); }
	else{
		$_J['docStatus']='C';
		a_sql::transaction(); $cmt=false;
		$Ld=$_J['L'];
		unset($_J['L'],$_J['Vats']);
		$errs=0; $nl=0;
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
		'qtyMov'=>'inQty','revWhs'=>'Y','handInv'=>'Y',
		'priceIsCost'=>'Y',
		'ori'=>'gvtPdn::fromPor()'));
		$nl=1; $reqAcc=array('accIvt','accBuyRem');
		$qI=array(); $qU=array();
		/*Revisar Lineas y configurar querys */
		foreach($Ld as $n => $L){ $nl++;
			$ln='Linea '.$nl.': ';
			$handInv=($L['handInv']=='Y');
			$whLP='id=\''.$L['lineTr'].'\' LIMIT 1';
			$L['whsId']=$_J['whsId'];
			if(_js::iseErr($L['lineTr'],$ln.'Se debe definir el ID de linea a entrega.','numeric>0')){ $errs++; break; }
			else if(_js::iseErr($L['quantity'],$ln.'Se debe definir la cantidad.','numeric>0')){ $errs++; break; }
			//if($L['numFactor']>0){ $L['quantity']=$L['numFactor']*$L['quantity']; }
			$qP=a_sql::fetch('SELECT openQty,whsId FROM gvt_por1 WHERE '.$whLP,array(1=>'Error obteniendo linea relacionada de orden de compra.',2=>'La id de la linea de la orden de compra no existe.'));
			if(a_sql::$err){ $errs++; break; }
			else if(_js::iseErr($qP['openQty'],$ln.'No hay cantidades pendientes por entregar en la orden de compra.','numeric>0')){ $errs++; break; }
			else if($L['quantity']>$qP['openQty']){ _err::err($ln.'La cantidad definida ('.$L['quantity'].') es mayor a la cantidad pendiente ('.($qP['openQty']*1).') en la orden de compra.',3); $errs++; break; }
			else{
				$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>$ln));
				if(_err::$err){ $errs=1; break; }
				//Update
				unset($L['id']);//id viene desde sor
				$qU[]=array('u','gvt_por1','_wh'=>$whLP,'openQty'=>$L['openQty']-$L['quantity']);;
				//L1 Doc
				$L[0]='i'; $L[1]=self::$tbk1;
				$nDoc->L1[]=$L;
				//Set ivt. aumentar inventario y disminuir onOrder
				$L['inQty']=$L['quantity'];
				$nDoc->handSet($L); unset($L['inQty']);
				$L['onOrder']=-$L['quantity'];
				$nDoc->handSet($L,array('whsId'=>$qP['whsId']));
				$costT=$L['priceLine'];//costo de linea
				//L1 Dac
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'debBal'=>$costT,'accCode'=>'14xx');
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accBuyRem'],'creBal'=>$costT,'accCode'=>'2330xx');
			}
		}
		if($errs==0){ /* Actualizar orden de venta */
			a_sql::multiQuery($qU);
			if(_err::$err){ return _err::$errText;  }
			_ADMS::ctrls('gvt/por');
			gvtPor::rev2Close($_J['otr']);
			if(_err::$err){ return _err::$errText;  }
		}
		die(print_r($qU));
		/* Generar y actualizar */
		if(!_err::$err){ $nDoc->post($_J); $docEntry=$nDoc->docEntry; }
		if(_err::$err){ return _err::$errText;  }
		self::dacPost($nDoc);/* Contabilizar */
		if(_err::$err){ return _err::$errText;  }
		$nDoc->handPost(); /* Mover Inventario */
		if(_err::$err){ return _err::$errText;  }
		if($errs==0){ $cmt=true; //Log
			$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1,'lineMemo'=>'from Doc #'.$_J['otr']));
		}
		a_sql::transaction($cmt);
	}
	return $js;
}

static public function dacPost($nDoc){
	$ori =' on[gvtPdn::dacPost()]';
	if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry']));
	$nDac->Doc=$nDoc->Doc;
	$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
	$nDac->post(); if(_err::$err){ return false; }
}

static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}
}
?>
