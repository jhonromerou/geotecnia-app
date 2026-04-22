<?php
class gvtSrd{
static $qU=array();
static $qI=array();
static $Acc=array();
static $serie='gvtSrd';
static $tbk='gvt_osrd';
static $tbk1='gvt_srd1';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto.')){}
	else if(_js::iseErr($_J['slpId'],'Seleccione un empleado de Ventas.','numeric>0')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.','Y-m-d')){}
	else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: ')){}
	else if($js=_js::textMax($_J['ref2'],20,'Ref. 2: ')){}
	else if(_js::isArray($_J['L'],'No se han enviado lineas para el documento.')){}
}
static public function get($P){
	_ADMS::lib('iDoc');
	$P['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.dueDate,A.docTotal,A.curr,A.docTotalME,A.slpId,A.ref1,A.userId,A.dateC,A.whsIdSep
	FROM gvt_osrd A';
	return iDoc::get($P);
}
static public function getOne($P){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$P['docEntry'],
	'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,C.phone1,C.invDayClose,A.*
	FROM gvt_osrd A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm, B.* FROM gvt_srd1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function post($_J=array()){
	_ADMS::lib('_2d,JLog,docSeries');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	_ADMS::mApps('ivt/Ivt');
	a_sql::transaction(); $cmt=false;
	$_J['docStatus']='S';
	$nDoc=new ivtDoc(array('tt'=>self::$serie,
	'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
	'revHand'=>'N','revWhs'=>'N','handInv'=>'Y',
	'ori'=>'gvtSrd::post()'));
	$nl=1;
	foreach($_J['L'] as $nx=>$L){
		$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ','revWhs'=>'N')); $nl++;
		if(_err::$err){ return _err::$errText; }
		$L[0]='i'; $L[1]=self::$tbk1;
		$nDoc->L1[]=$L;
	}
	if(!_err::$err){ $_J=$nDoc->post($_J); $docEntry=$nDoc->docEntry; }
	if(!_err::$err){ //cierre de relacion
		_ADMS::libC('gvt','base');
		gvtBase::closeFromTt(self::$serie,$docEntry,$_J);
	}
	if(_err::$err){ return _err::$errText; $errs++;  }
	if($errs==0){ $cmt=true;
		$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
	}
	a_sql::transaction($cmt);
	return $js;
}
static public function put($_J=array()){
	_ADMS::lib('iDoc,_2d,docSeries');
	if(iDoc::vStatus(array('docEntry'=>$_J['docEntry'],'tbk'=>self::$tbk,'D'=>'Y'))){ return _err::$errText; }
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	else if(iDoc::$D['docStatus']!='S'){ return _err::err('Solo se puede modificar un documento que este como enviado.'.$ori,3); }
	_ADMS::mApps('ivt/Ivt');
	a_sql::transaction(); $cmt=false;
	$nDoc=new ivtDoc(array('tt'=>self::$serie,
	'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
	'revHand'=>'N','revWhs'=>'N','handInv'=>'Y',
	'ori'=>'gvtSrd::put()'));
	$nl=1;
	foreach($_J['L'] as $nx=>$L){
		$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ','revWhs'=>'N')); $nl++;
		if(_err::$err){ return _err::$errText; break; }
		$L[0]='i'; $L[1]=self::$tbk1;
		$L['_unik']='id';
		$nDoc->L1[]=$L;
	}
	if(!_err::$err){ $nDoc->put($_J); $docEntry=$nDoc->docEntry; }
	if(_err::$err){ return _err::$errText; $errs++;  }
	if($errs==0){ $cmt=true;
		$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		_ADMS::lib('JLog');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'update'=>1));
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}

static public function putStatusSend($D=array()){
	_ADMS::lib('iDoc');
	if(iDoc::vStatus(array('tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y'))){ return _err::$errText; }
	else if(iDoc::$D['docStatus']!='D'){ return _err::err('Solo un documento en estado borrador puede ser enviado .'.iDoc::$D['docStatus'].'.',3); }
	else{ $errs=0;
		a_sql::transaction(); $cmt=false;
		if($errs==0){
			$upd=a_sql::query('UPDATE '.self::$tbk.' SET docStatus=\'S\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error actualizando a enviado: '));
			if(a_sql::$err){ return _err::err(a_sql::$errNoText); }
			else{ $js=_js::r('Estado actualizado correctamente.'); $cmt=true;
				_ADMS::lib('JLog');
				JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'S'));
			}
		}
		a_sql::transaction($cmt);
	}
	return $js;
}
static public function putStatusClose($D=array()){
	a_sql::transaction(); $cmt=false; $errs=0;
	_ADMS::lib('iDoc');
	iDoc::putStatus(array('t'=>'C','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y','fie'=>'whsId'));
	if(_err::$err){ return _err::$errText; }
	else if(iDoc::$D['docStatus']!='S'){ return _err::err('Solo se pueden cerrar los documentos enviados.'.$ori,3); $errs++; }
	else{
		$D['whsId']=iDoc::$D['whsId'];
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
		'qtyMov'=>'outQty','revWhs'=>'Y','handInv'=>'Y',
		'ori'=>'gvtSdn::putClose()'));
		$reqAcc=array('accIvt','accCost');
		$Lq=$nDoc->fromDoc(array('docEntry'=>$D['docEntry']));
		if(_err::$err){ return _err::$errText; }
		$nl=1;
		while($L=$Lq->fetch_assoc()){
			$L['whsId']=$D['whsId'];
			$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ return _err::$errText;  }
			$L['outQty']=$L['quantity'];
			$nDoc->handSet($L);
			$costT=$nDoc->La['costLine'];
			$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'debBal'=>$costT,'accCode'=>'14xx');
			$nDoc->Ld[]=array('accId'=>$nDoc->La['accCost'],'creBal'=>$costT,'accCode'=>'61xx');
		}
		if($errs==0){/* Contabilizar */
			$nDoc->Doc['docDate']=date('Y-m-d');
			self::dacPost($nDoc);
			if(_err::$err){ return _err::$errText; $errs++; }
		}
		if($errs==0){/* Mover Inventario */
			$nDoc->handPost();
			if(_err::$err){ $errs++; }
		}
		if($errs==0){ $cmt=true; //Log
			$js=_js::r('Documento cerrado correctamente.','"docEntry":"'.$D['docEntry'].'"');
			_ADMS::lib('JLog');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'C'));
		}
	}
	a_sql::transaction($cmt);
	return $js;
}
static public function putStatusCancel($D=array()){
	a_sql::transaction(); $cmt=false;
	_ADMS::lib('iDoc');
	$ori=' on[gvtSrd::putCancel()]';
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo'],'D'=>'Y'));
	if(_err::$err){ $js=_err::$errText; }
	else{ $errs=0;
		//Si estaba cerrada revertir
		if(iDoc::$D['docStatus']=='C'){
			_ADMS::mApps('gfi/Dac');
			gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
			if(_err::$err){ $js=_err::$errText; }
			else{
				_ADMS::mApps('ivt/Ivt');
				IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
				if(_err::$err){ $js=_err::$errText; }
			}
		}
	}
	if(!_err::$err){ $cmt=true;
		$js=_js::r('Documento anulado correctamente.');
	}
	a_sql::transaction($cmt);
	return $js;
}
static public function dacPost($nDoc){
	$ori =' on[gvtSrd::dacPost()]';
	if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry']));
	$nDac->Doc=$nDoc->Doc;
	$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
	$nDac->post(); if(_err::$err){ return false; }
}
static public function logRel1($D=array()){
	_ADMS::lib('JLog');
	return JLog::rel1_get(array('ott'=>self::$serie,'otr'=>$D['docEntry']));
}
}
?>
