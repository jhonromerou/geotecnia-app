<?php
class gvtPin{
static $serie='gvtPin';
static $tbk='gvt_opin';
static $tbk1='gvt_pin1';
static $tbk2='gvt_pin2';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto.')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.')){}
	else if(_js::iseErr($_J['dueDate'],'La fecha de vencimiento debe estar definida.')){}
	else if(_js::iseErr($_J['pymId'],'Condición de pago: debe estar definida.','numeric>0')){}
	else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['ref2'],20,'Ref. 2: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ _err::err($js); }
	else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
}
static public function get($D){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.cardId,A.cardName,A.docType,A.docDate,A.docTotal,A.curr,A.docTotalME,A.userId,A.dateC
	FROM gvt_opin A';
	return iDoc::get($D);
}
static public function getOne($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,A.*
	FROM gvt_opin A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.buyUdm, B.* FROM gvt_pin1 B
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
		'ori'=>'gvtPin::post()'));
		$nl=1; $reqAcc=array('accIvt','accSell','accBuyRem');
		foreach($_J['L'] as $nx=>$L){
			$L['whsId']=$_J['whsId'];
			$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ return _err::$errText; }
			$costT=$L['priceLine'];
			if(!$nDoc->fromDlv && $L['handInv']=='Y'){//Si no viene de remision
				$L['inQty']=$L['quantity'];
				$nDoc->handSet($L); unset($L['inQty']);
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'debBal'=>$costT,'accCode'=>'14xx');
			}
			else if($nDoc->fromDlv && $L['handInv']=='Y'){//Si viene de remision
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accBuyRem'],'debBal'=>$costT,'accCode'=>'2330xx');
			}
			else{
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accSell'],'debBal'=>$costT,'accCode'=>'41xx');
			}
			//L1 Doc
			$L[0]='i'; $L[1]=self::$tbk1;
			$nDoc->L1[]=$L;
		}
		$_J['balDue']=$_J['docTotal'];
		if(!_err::$err){ $nDoc->post($_J); $docEntry=$nDoc->docEntry; }
		if(_err::$err){ return _err::$errText; }
		self::dacPost($nDoc);/* Contabilizar */
		if(_err::$err){ return _err::$errText; }
		$nDoc->handPost();/* Mover Inventario */
		if(_err::$err){ return _err::$errText; }
		if($errs==0){ $cmt=true; //Log
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
	$ori=' on[gvtPin::putCancel()]';
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'reqMemo'=>'Y','lineMemo'=>$D['lineMemo'],'D'=>'Y'));
	if(_err::$err){ return _err::$errText; }
	else{ $errs=0;
		$q=a_sql::fetch('SELECT RC.canceled rcvCanceled,RC1.tr
		FROM '.self::$tbk.' A
		LEFT JOIN gvt_rce1 RC1 ON (RC1.tt=\'ss'.self::$serie.'sss\' AND RC1.tr=A.docEntry)
		LEFT JOIN gvt_orce RC ON (RC.docEntry=RC1.docEntry)
		WHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error consultando factura de compra.',2=>'No se encontró información de factura a anular'));
		if(a_sql::$err){ return _err::err(a_sql::$errNoText); }
		else if($q['rcvCanceled']=='N' && $q['tr']>0){ return _err::err('La factura tiene pagos registrados y no se puede anular.',3); }
		else{
			_ADMS::mApps('gfi/Dac');
			gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
			if(_err::$err){ return _err::$errText; }
			else{
				_ADMS::mApps('ivt/Ivt');
				IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
				if(_err::$err){ return _err::$errText;}
				else{ $cmt=true;
					$js=_js::r('Documento anulado correctamente.');
					JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'N','lineMemo'=>$D['lineMemo']));
				}
			}
		}
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function dacPost($nDoc){
	$ori =' on[gvtPin::dacPost()]';
	if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'tbk2'=>self::$tbk2,'tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry'],
	));
	$nDac->Doc=$nDoc->Doc;
	$nDac->setFdp(); if(_err::$err){ return false; }
	$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
	$nDac->setDocTax(array('buyIva'=>'deb')); if(_err::$err){ return false; }
	$nDac->setLine([
	array('lineType'=>'FC','dueDate'=>$nDac->Doc['dueDate'],'cardId'=>$nDac->Doc['cardId'],'accId'=>$nDac->Doc['accId'],'accCode'=>'22/11xx','creBal'=>$nDac->Doc['docTotal'],'creBalDue'=>$nDac->Doc['docTotal'])
	]);
	$nDac->post(); if(_err::$err){ return false; }
}

static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}
}
?>
