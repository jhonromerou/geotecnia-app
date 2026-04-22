<?php
class gvtPor{
static $serie='gvtPor';
static $tbk='gvt_opor';
static $tbk1='gvt_por1';
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
static public function get($D=array()){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.dueDate,A.docTotal,A.userId,A.dateC
	FROM gvt_opor A';
	return iDoc::get($D);
}
static public function getOne($D){
	_ADMS::lib('iDoc');
	if(_js::iseErr($D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ return _err::$errText; }
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,A.*
	FROM gvt_opor A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.buyUdm, B.* FROM gvt_por1 B
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function toCopy($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'A.*
	FROM gvt_opor A ',
	'fromB'=>'I.itemCode, I.itemName,I.buyUdm, B.*,\'gvtPor\' lineTt,B.id lineTr, B.numFactor buyFactor FROM gvt_por1 B
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)','whB'=>'AND B.handInv=\'Y\''));
}

static public function post($_J=array()){
	_ADMS::lib('docSeries');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	a_sql::transaction(); $cmt=false;
	$_J['docStatus']='D';
	_ADMS::mApps('ivt/Ivt');
	$nDoc=new ivtDoc(array('tt'=>self::$serie,
	'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
	'revHand'=>'N','revWhs'=>'Y',
	'ori'=>'gvtSor::post()'));
	$nl=1;
	foreach($_J['L'] as $nx=>$L){
		$L['whsId']=$_J['whsId'];
		$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
		if(_err::$err){ return _err::$errText; }
		$L[0]='i'; $L[1]=self::$tbk1;
		$L['openQty']=$L['quantity'];
		$nDoc->L1[]=$L;
	}
	if(_err::$err){ return _err::$errText;  }
	$nDoc->post($_J); $docEntry=$nDoc->docEntry;
	if(_err::$err){ return _err::$errText;  }
	if($errs==0){ $cmt=true;
		_ADMS::lib('JLog');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		$js= _js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
	}
	a_sql::transaction($cmt);
	return $js;
}
static public function put($_J=array()){
	_ADMS::lib('iDoc');
	iDoc::vStatus(array('docEntry'=>$_J['docEntry'],'tbk'=>self::$tbk,'D'=>'Y'));
	if(_err::$err){ return _err::$errText; }
	self::revDoc($_J); if(_err::$err){ return _err::$errText; }
	else if(iDoc::$D['docStatus']!='D'){ _err::err('Solo se puede modificar si está en borrador.'.$ori,3); }
	a_sql::transaction(); $cmt=false;
	_ADMS::mApps('ivt/Ivt');
	$nDoc=new ivtDoc(array('tt'=>self::$serie,
	'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
	'revHand'=>'N','revWhs'=>'Y',
	'ori'=>'gvtPor::put()'));
	$nl=1;
	foreach($_J['L'] as $nx=>$L){
		$L['whsId']=$_J['whsId'];
		$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
		if(_err::$err){ return _err::$errText; }
		$L[0]='i'; $L[1]=self::$tbk1;
		$L['openQty']=$L['quantity'];
		$L['_unik']='id';
		$nDoc->L1[]=$L;
	}
	if(_err::$err){ return _err::$errText; }
	$nDoc->put($_J); $docEntry=$nDoc->docEntry;
	if(_err::$err){ return _err::$errText; }
	if($errs==0){ $cmt=true;
		_ADMS::lib('JLog');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'update'=>1));
		$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function putStatusOpen($D=array()){
	_ADMS::lib('iDoc,JLog');
	a_sql::transaction(); $cmt=false;
	iDoc::putStatus(array('t'=>'O','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y'));
	if(_err::$err){ return _err::$errText; }
	else if(iDoc::$D['docStatus']=='O'){ return _err::err('El documento ya se encuentra abierto.',3); }
	else{
		$errs=0;
		_ADMS::mApps('ivt/Ivt');
		Ivt::putFromDoc(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'onOrder'=>'+'));
		if(_err::$err){ return _err::$errText; }
		if($errs==0){ $js=_js::r('Documento abierto correctamente.'); $cmt=true;
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'O'));
		}
	}
	a_sql::transaction($cmt);
	return $js;
}
static public function putStatusCancel($D=array()){
	_ADMS::lib('iDoc,JLog');
	a_sql::transaction(); $cmt=false;
	iDoc::putStatus(array('t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'reqMemo'=>'Y','lineMemo'=>$D['lineMemo']));
	if(_err::$err){ return _err::$errText; }
	else{ $errs=0;
		/* Revisar origin */
		$Q=iDoc::tra1Get(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
		if(_err::$err){ return _err::$errText; }
		else if($Q['dStatus']=='C' && $Q['dtt']=='gvtPdn'){ return _err::err('No se puede anular está orden de compra, está relacionada a una entrega de compra.',3); }
		else if($Q['dStatus']=='C' && $Q['dtt']=='gvtSin'){ return _err::err('No se puede anular está orden de compra, está relacionada a una factura de compra.',3); }
		_ADMS::mApps('ivt/Ivt');
		Ivt::putFromDoc(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'qtyFie'=>'openQty','onOrder'=>'-','docDate'=>$_J['docDate'],'tt'=>self::$serie,'tr'=>$D['docEntry']));
		if(_err::$err){ return _err::$errText; }
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento anulado correctamente.');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'N','lineMemo'=>$D['lineMemo']));
		}
	}
	a_sql::transaction($cmt);
	return $js;
}
static public function putStatusClose($D=array()){
	_ADMS::lib('iDoc,JLog');
	a_sql::transaction(); $cmt=false;
	iDoc::putStatus(array('t'=>'C','tbk'=>'gvt_opor','docEntry'=>$D['docEntry']));
	if(_err::$err){ return _err::$errText; }
	else{ $errs=0;
		_ADMS::mApps('Ivt');
		Ivt::putFromDoc(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'qtyFie'=>'openQty','onOrder'=>'-','docDate'=>$_J['docDate'],'tt'=>self::$serie,'tr'=>$D['docEntry']));
		if(_err::$err){ return _err::$errText; }
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento cerrado correctamente.');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'O'));
		}
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}

/* usada en pdn */
static public function rev2Close($docEntry=0){
	$ori=' on[gvtPor::rev2Close()]';
	$q=a_sql::fetch('SELECT docEntry,SUM(openQty) openQty FROM gvt_por1 WHERE docEntry=\''.$docEntry.'\' GROUP BY docEntry',array(1=>'Error revisando cantidades pendientes para cierre.'.$ori,2=>'El documento no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else{
		if($q['openQty']==0){
			a_sql::query('UPDATE gvt_opor SET docStatus=\'C\' WHERE docEntry=\''.$docEntry.'\' LIMIT 1',array(1=>'Error cerrando documento.'.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		}
	}
}

}
?>
