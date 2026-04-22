<?php
JRoute::get('gvt/rce','get');
JRoute::get('gvt/rce/tb99','tb99');

JRoute::get('gvt/rce/view','getOne');
JRoute::get('gvt/rce/invs',function(){
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($_GET);
	echo a_sql::queryL('SELECT
	AC.acId,AC.accId,AC.tt,AC.tr,AC.serieId,AC.docNum, AC.dueDate,AC.creBal,AC.creBalDue
	FROM gfi_dac1 AC
	WHERE AC.lineType IN(\'FC\',\'NC\',\'ND\') AND AC.cardId=\''.$_GET['cardId'].'\' AND AC.canceled=\'N\' AND (AC.creBalDue)>0 ',array(1=>'Error obteniendo facturas pendientes de pago',2=>'No hay facturas pendientes de pago.'));
});
JRoute::post('gvt/rce','post');

JRoute::get('gvt/rce/toInv',function(){
	_ADMS::lib('iDoc');
	_ADMS::_lb('sql/filter');
	$_GET['fromA']='A.docNum,A.docDate,A.dueDate,A.docTotal,A.balDue,A.cardId,A.cardName FROM gvt_opin A';
	$_GET['fromB']='B.banId,B.payCateg,B.canceled,B.docEntry,B.docDate,B1.accId,B1.debBal,B.lineMemo 
	FROM gvt_rce1 B1
	JOIN gvt_orce B ON (B.docEntry=B1.docEntry)';
	$_GET['whBAll']='B1.tt=\'gvtSin\' AND B1.tr=\''.$_GET['docEntry'].'\'';
	echo iDoc::getOne($_GET);
});

JRoute::post('gvt/rce/toInv',function($_J){
	if($js=_js::ise($_J['docEntry'],'Se debe definir Id de factura.','numeric>0')){}
	else{
		$_J['payType']='F';
		$Q=a_sql::fetch('SELECT A.canceled,AC.acId,AC.cardId,C.cardName 
		FROM 
		gvt_opin A 
		JOIN gfi_dac1 AC ON (AC.lineType=\'FC\' AND AC.tr=\''.$_J['docEntry'].'\' )
		JOIN par_ocrd C ON (C.cardId=AC.cardId)
		WHERE A.docEntry=\''.$_J['docEntry'].'\' LIMIT 1',array(1=>'Error consultando factura para pago.',2=>'No se encontró información para el pago.'));
		if(a_sql::$err){ die(a_sql::$errNoText); }
		
		unset($_J['docEntry']);
		_ADMS::lib('docSeries'); _ADMS::mApps('gvt/Rce');
		$_J['cardId']=$Q['cardId'];
		$_J['cardName']=$Q['cardName'];
		$_J['L']=array();
		$_J['L'][]=array('acId'=>$Q['acId'],'debBal'=>$_J['bal']);
		$js=gvtRce::post($_J);
		if(_err::$err){ $js=_err::$errText; }
	}
	echo $js;
});

JRoute::put('gvt/rce/statusCancel','statusN');
?>