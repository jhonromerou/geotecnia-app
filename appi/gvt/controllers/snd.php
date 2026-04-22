<?php
class gvtSnd{
static $serie='gvtSnd';
static $tbk='gvt_osnd';
static $tbk1='gvt_snd1';
static $tbk2='gvt_snd2';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['otr'],'No se ha definido ID de factura origen','numeric>0')){}
	$qf=a_sql::fetch('SELECT docEntry,canceled,cardId,cardName FROM gvt_oinv WHERE docEntry=\''.$_J['otr'].'\' LIMIT 1',array(1=>'Error revisando factura de origen.',2=>'La factura de origen no existe.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if($qf['canceled']=='Y'){ _err::err('No se pueden aplicar notas a facturas anuladas.',3); }
	else{
		$_J['cardId']=$qf['cardId'];
		$_J['cardName']=$qf['cardName'];
		if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
		else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto.')){}
		else if(_js::iseErr($_J['pymId'],'Condición de pago debe estar definida.','numeric>0')){}
		else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.')){}
		else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: ')){ _err::err($js); }
		else if($js=_js::textMax($_J['ref2'],20,'Ref. 22: ')){ _err::err($js); }
		else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ _err::err($js); }
		else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
	}
}
static public function get($D){
	_ADMS::lib('iDoc');
	$D['fromA']='A.* FROM gvt_osnd A';
	return iDoc::get($D);
}
static public function getOne($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,A.*
	FROM gvt_osnd A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.buyUdm, B.* FROM gvt_snd1 B
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}

static public function post($_J=array()){
	_ADMS::lib('docSeries,JLog,_2d');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	else{
		$_J['ott']='gvtSin';
		$_J['docStatus']='C';
		$_J['dueDate']=$_J['docDate'];
		$_J['balDue']=$_J['docTotal'];
		$errs=0;
		a_sql::transaction(); $cmt=false;
		//actualizar saldo notas
		self::putSinBal(array('otr'=>$_J['otr'],'docTotal'=>$_J['docTotal']));
		if(_err::$err){ return _err::$errText; }
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'tbk2'=>self::$tbk2,
		'fromDlv'=>$_J['fromDlv'],'vats'=>'Y',
		'docType'=>'sell',
		'qtyMov'=>'inQty','revWhs'=>'Y',
		'ori'=>'gvtSnd::post()'));
		$nl=1; $reqAcc=array('accIvt','accCost','accSell');
		foreach($_J['L'] as $nx=>$L){
			$L['whsId']=$_J['whsId'];
			$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ return _err::$errText; }
			if(!$nDoc->fromDlv && $L['handInv']=='Y'){//Si viene de remision omitir
				$L['inQty']=$L['quantity'];
				$nDoc->handSet($L);unset($L['inQty']);
				$costT=$nDoc->La['costLine'];
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'creBal'=>$costT,'accCode'=>'14xx');
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accCost'],'debBal'=>$costT,'accCode'=>'61xx');
			}
			$nDoc->Ld[]=array('accId'=>$nDoc->La['accSell'],'creBal'=>$L['priceLine'],'accCode'=>'41xx');
			$L[0]='i'; $L[1]=self::$tbk1;
			$nDoc->L1[]=$L;
		}
		if(_err::$err){ return _err::$errText;  }
		$_J=$nDoc->post($_J); $docEntry=$nDoc->docEntry; /*Generar Doc */
		if(!_err::$err){ //cierre de relacion
			_ADMS::libC('gvt','base');
			gvtBase::closeFromTt(self::$serie,$docEntry,$_J);
		}
		if(_err::$err){ return _err::$errText;  }
		self::dacPost($nDoc); /* Contabilizar */
		if(_err::$err){ return _err::$errText;  }
		$nDoc->handPost(); /* mover inventario */
		if(_err::$err){ return _err::$errText; }
		if(!_err::$err){ $cmt=true;
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
			$js= _js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		}
		a_sql::transaction($cmt);
	}
	return $js;
}

static public function putSinBal($P){
	// -docTotal para restar
	$q=a_sql::query('UPDATE gvt_oinv SET balDue=balDue+'.$P['docTotal'].' WHERE docEntry=\''.$P['otr'].'\' LIMIT 1',[1=>'Error aplicando saldo a la factura.']);
	if(a_sql::$err){ return a_sql::$errNoText; }
	a_sql::query('UPDATE gfi_dac1 SET debBalDue=debBalDue+'.$P['docTotal'].' WHERE tt=\'gvtSin\' AND lineType=\'FV\' AND tr=\''.$P['otr'].'\' LIMIT 1',[1=>'Error aplicando saldo contable a la factura.']);
	if(a_sql::$err){ return a_sql::$errNoText; }
}

static public function putStatusCancel($D=array()){
	_ADMS::lib('iDoc');
	a_sql::transaction(); $cmt=false;
	$ori=' on[gvtSnd::putCancel()]';
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo'],'D'=>'Y','fie'=>'otr,docTotal,dfeNumber'));
	if(_err::$err){ $js=_err::$errText; }
	else if(iDoc::$D['dfeNumber']!=''){ _err::err('No se puede anular una nota débito relacionada a un documento electronico. Doc.: '.Doc::$D['dfeNumber'],3); }
	else{ $errs=0;
		/* Añadir aqui luego revision si se puede anular o no */
		self::putSinBal(array('otr'=>iDoc::$D['otr'],'docTotal'=>-iDoc::$D['docTotal']));
		if(_err::$err){ return _err::$errText; }
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			_ADMS::mApps('gfi/Dac');
			gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
			if(_err::$err){ $js=_err::$errText; }
			else{
				_ADMS::mApps('ivt/Ivt');
				IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
				if(_err::$err){ $js=_err::$errText;}
				else{ $cmt=true;
					$js=_js::r('Documento anulado correctamente.');
				}
			}
		}
	}
	_err::errDie();
	a_sql::transaction($cmt);
	return $js;
}

static public function dacPost($nDoc){
	$ori =' on[gvtSnd::dacPost()]';
	if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tbk'=>self::$tbk,'tbk2'=>self::$tbk2,'tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry'],
	));
	$nDac->Doc=$nDoc->Doc;
	$nDac->setFdp(); if(_err::$err){ return false; }
	$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
	$nDac->setDocTax(array('sellIva'=>'cre')); if(_err::$err){ return false; }
	$nDac->setLine([array('lineType'=>'ND','dueDate'=>$nDac->Doc['docDate'],'cardId'=>$nDac->Doc['cardId'],'accId'=>$nDac->Doc['accId'],'accCode'=>'13/11xx','debBal'=>$nDac->Doc['docTotal'],'debBalDue'=>$nDac->Doc['docTotal'])]);
	$nDac->post(); if(_err::$err){ return false; }
}
static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}
static public function logRel1($D=array()){
	_ADMS::lib('JLog');
	return JLog::rel1_get(array('ott'=>self::$serie,'otr'=>$D['docEntry']));
}
}
?>
