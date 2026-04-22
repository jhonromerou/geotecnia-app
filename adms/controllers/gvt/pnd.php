<?php
class gvtPnd{
static $serie='gvtPnd';
static $tbk='gvt_opnd';
static $tbk1='gvt_pnd1';
static $tbk2='gvt_pnd2';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto.')){}
	else if(_js::iseErr($_J['pymId'],'La condición de pago debe estar definida.','numeric>0')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.')){}
	else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['ref2'],20,'Ref. 2: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ _err::err($js); }
	else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
}
static public function get($D){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.docTotal,A.curr,A.docTotalME,A.userId,A.dateC
	FROM gvt_opnd A';
	return iDoc::get($D);
}
static public function getOne($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,A.*
	FROM gvt_opnd A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.buyUdm, B.* FROM gvt_pnd1 B
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}

static public function post($_J=array()){
	_ADMS::lib('docSeries,JLog');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	else{
		$_J['docStatus']='C'; $errs=0;
		a_sql::transaction(); $cmt=false;
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'tbk2'=>self::$tbk2,
		'fromDlv'=>$_J['fromDlv'],'vats'=>'Y',
		'qtyMov'=>'inQty','revWhs'=>'Y',
		'priceIsCost'=>'Y',
		'ori'=>'gvtPnd::post()'));
		$nl=1; $reqAcc=array('accIvt','accBuyRem');
		foreach($_J['L'] as $nx=>$L){
			$L['whsId']=$_J['whsId'];
			$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ return _err::$errText; }
			$costT=$L['priceLine'];
			if(!$nDoc->fromDlv && $L['handInv']=='Y'){//Si viene de remision
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'debBal'=>$costT,'accCode'=>'14xx');
				$L['inQty']=$L['quantity'];
				$nDoc->handSet($L); unset($L['inQty']);
			}
			else{
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accBuyRem'],'debBal'=>$costT,'accCode'=>'2330xx');
			}
			//L1 Doc
			$L[0]='i'; $L[1]=self::$tbk1;
			$nDoc->L1[]=$L;
		}
		if(!_err::$err){ $nDoc->post($_J); $docEntry=$nDoc->docEntry; }
		if(_err::$err){ return _err::$errText; }
		self::dacPost($nDoc); /* Contabilizar */
		if(_err::$err){ return _err::$errText; }
		$nDoc->handPost();/* Mover Inventario */
		if(_err::$err){ return _err::$errText; }
		if($errs==0){ $cmt=true;//Log
			$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		}
		a_sql::transaction($cmt);
	}
	return $js;
}
static public function putStatusCancel($D=array()){
	_ADMS::lib('iDoc,JLog');
	a_sql::transaction(); $cmt=false;
	$ori=' on[gvtPnd::putCancel()]';
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'reqMemo'=>'Y','lineMemo'=>$D['lineMemo'],'D'=>'Y','fie'=>'dfeNumber'));
	if(_err::$err){ $js=_err::$errText; }
	else if(iDoc::$D['dfeNumber']!=''){ return _err::err('No se puede anular una nota crédito relacionada a un documento electronico. Doc.: '.iDoc::$D['dfeNumber'],3); }
	else{ $errs=0;
		_ADMS::mApps('gfi/Dac');
		gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
		if(_err::$err){ return _err::$errText; }
		else{
			_ADMS::mApps('ivt/Ivt');
			IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
			if(_err::$err){ $js=_err::$errText;}
			else{ $cmt=true;
				$js=_js::r('Documento anulado correctamente.');
				JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'N','lineMemo'=>$D['lineMemo']));
			}
		}
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function dacPost($nDoc){
	$ori =' on[gvtPnd::dacPost()]';
	if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tbk'=>self::$tbk,'tbk2'=>self::$tbk2,'tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry'],
	));
	$nDac->Doc=$nDoc->Doc;
	$nDac->setPym(); if(_err::$err){ return false; }
	$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
	$nDac->setDocTax(array('buyIva'=>'deb')); if(_err::$err){ return false; }
	$nDac->setLine([
	array('lineType'=>'ND','dueDate'=>$nDac->Doc['docDate'],'cardId'=>$nDac->Doc['cardId'],'accId'=>$nDac->Doc['accId'],'accCode'=>'22/11xx','creBal'=>$nDac->Doc['docTotal'],'creBalDue'=>$nDac->Doc['docTotal'])
	]);
	$nDac->post(); if(_err::$err){ return false; }
}

static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}
}
?>
