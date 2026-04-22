<?php
unset($_J['accName']);
$serieSin='gvtSin';
$tbkSin='gvt_oinv';
if(_0s::$router=='GET rcv'){
	_ADMS::lib('iDoc');
	_ADMS::_lb('sql/filter');
	if ($_GET['A_cardName(E_like3)']) {
		$_GET['C.cardName(E_like3)'] = $_GET['A_cardName(E_like3)'];
		unset($_GET['A_cardName(E_like3)']);
	}
	$_GET['fromA']='A.*,C.cardName FROM gvt_orcv A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	echo iDoc::get($_GET);
}
else if(_0s::$router=='GET rcv/tb99'){
	_ADMS::mApps('gvt/Rcv');
	echo gvtRcv::logGet($_GET);
}
else if(_0s::$router=='GET rcv/view'){
	_ADMS::mApps('gvt/Rcv');
	echo gvtRcv::getOne($_GET);
}

else if(_0s::$router=='GET rcv/invs'){
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($_GET);
	echo a_sql::queryL('SELECT
	AC.acId,AC.accId,AC.tt,AC.tr,AC.serieId,AC.docNum, AC.dueDate,AC.debBal,AC.debBalDue,F.numberr dfeNumber 
	FROM gfi_dac1 AC
	LEFT JOIN gvt_dinv F ON (AC.lineType=\'FV\' AND F.docEntry=AC.tr)
	WHERE AC.lineType IN(\'FV\',\'NC\',\'ND\') AND AC.cardId=\''.$_GET['cardId'].'\' AND AC.canceled=\'N\' AND (AC.debBalDue)>0 ',array(1=>'Error obteniendo facturas pendientes de pago',2=>'No hay facturas pendientes de pago.'));
}
else if(_0s::$router=='POST rcv/invs'){
		_ADMS::lib('docSeries'); _ADMS::mApps('gvt/Rcv');
	$js=gvtRcv::post($_J);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}

else if(_0s::$router=='GET rcv/toInv'){
	_ADMS::lib('iDoc');
	_ADMS::_lb('sql/filter');
	$_GET['fromA']='A.docNum,A.docDate,A.dueDate,A.docTotal,A.balDue,A.cardId,A.cardName
	FROM '.$tbkSin.' A ';
	$_GET['fromB']='B.canceled,B.docEntry,B.docDate,B1.accId,B1.creBal,B.lineMemo 
	FROM gvt_rcv1 B1
	JOIN gvt_orcv B ON (B.docEntry=B1.docEntry)';
	$_GET['whBAll']='B1.tt=\''.$serieSin.'\' AND B1.tr=\''.$_GET['docEntry'].'\'';
	echo iDoc::getOne($_GET);
}
else if(_0s::$router=='POST rcv/toInv'){
	if($js=_js::ise($_J['docEntry'],'Se debe definir Id de factura.','numeric>0')){}
	else{
		$_J['payType']='F';
		$Q=a_sql::fetch('SELECT A.canceled,AC.acId,AC.cardId,C.cardName 
		FROM 
		'.$tbkSin.' A 
		JOIN gfi_dac1 AC ON (AC.lineType=\'FV\' AND AC.tr=\''.$_J['docEntry'].'\' )
		JOIN par_ocrd C ON (C.cardId=AC.cardId)
		WHERE A.docEntry=\''.$_J['docEntry'].'\' LIMIT 1',array(1=>'Error consultando factura para pago.',2=>'No se encontró información para el pago.'));
		if(a_sql::$err){ die(a_sql::$errNoText); }
		
		unset($_J['docEntry']);
		_ADMS::lib('docSeries'); _ADMS::mApps('gvt/Rcv');
		$_J['cardId']=$Q['cardId'];
		$_J['cardName']=$Q['cardName'];
		$_J['L']=array();
		$_J['L'][]=array('acId'=>$Q['acId'],'creBal'=>$_J['bal']);
		$js=gvtRcv::post($_J);
		if(_err::$err){ $js=_err::$errText; }
	}
	echo $js;
}

else if(_0s::$router=='PUT rcv/statusCancel'){
	_ADMS::mApps('gvt/Rcv');
	$js=gvtRcv::putCancel($___D);
	if(_err::$err){ $js= _err::$errText; }
	echo $js;
}

?>