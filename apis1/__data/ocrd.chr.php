<?php
header('Content-Type: application/json');
$D = ($_GET['_getIsPost']) ? $_GET : $_POST;
_ADMS::_lb('com/_ocrd');
if($ADMS_KEY == ''){
if($ADMS_MET == 'GET'){
	_ADMS::_lb('com/_5o,sql/filter');
	$userRel = _5o::Au_wh(array('objType'=>_o::$Ty['bussPartner'],'whCode'=>$CR1_wh));
	$where = $userRel['wh'].' '.a_sql_filtByT($D);
	$q = a_sql::query('SELECT A.cardId, A.cardCode,A.cardName FROM '._0s::$Tb['par_ocrd'].' A '.$userRel['inner'].' WHERE 1 '.$where.' ORDER BY A.cardName ASC, A.cardCode ASC LIMIT 40 ',array('errNo'=>array(1=>'Error obteniendo listado de Socios: ',2=>'No se encontraron Socios.')));
	if(a_sql::$errNoText!=''){ $js = a_sql::$errNoText; }
	else{ $jr = array();
		while($L=$q->fetch_assoc()){ $jr[] = $L; }
		$js = '{"L":'._js::enc($jr).'}';
	}
	echo $js;
}
}
else if($ADMS_KEY == 'o'){
if($ADMS_MET=='GET'){
	$ct = a_sql::fetch('SELECT cardType FROM '._0s::$Tb['par_ocrd'].'  WHERE cardId=\''.$D['cardId'].'\' LIMIT 1');
	$ql = a_sql::query('SELECT * FROM '._0s::$Tb['par_ochr'].' WHERE ocardId=\''.a_ses::$ocardId.'\' AND cardType =\''.$ct['cardType'].'\' ORDER BY chrFie ASC ',array(1=>'Error obteniendo listado de características del cliente: ',2=>'No se encontraron características definidas para asignar a los socios '.$ct['cardType']));
	if(a_sql::$errNoText!=''){$js=a_sql::$errNoText;}
	else{
	$jr = array();
	$Chr = array();
	while($c=$ql->fetch_assoc()){ $k = $c['chrFie'];
		$c['chrDom'] = json_decode($c['chrDom'],1);
		$jr[$k] = $c; $Chr[$k] = $k;
	}
	$chrfies = implode(',',$Chr);
	foreach($Chr as $k){
		$qv = a_sql::fetch('SELECT chrFie,value FROM '._0s::$Tb['par_chr1'].' WHERE cardId=\''.$D['cardId'].'\' AND chrFie=\''.$k.'\' LIMIT 1');
		$jr[$k]['value'] = (a_sql::$errNo==-1)?$qv['value']:'';
	}
	$js = '{"L":'._js::enc($jr).'}';
	}
	echo $js;
}
else if($ADMS_MET=='PUT'){
	if($js = _js::ise($D['cardId'],'ID de socio no ha sido encontrado.'.$D['cardId'])){}
	else{
		foreach($D['chrFie'] as $chrFie => $value){
			$D2 = array('cardId'=>$D['cardId'],'chrFie'=>$chrFie,'value'=>$value);
			$ins = a_sql::insert($D2,array('tbk'=>'par_chr1','wh_change'=>'WHERE cardId=\''.$D['cardId'].'\' AND chrFie=\''.$chrFie.'\' LIMIT 1'));
		}
		if($ins['err']){ $js=_js::e(1,$ins['err']['error_sql']); }
		else{ $js = _js::r('Características de Socio actualizadas.'); }
	}
	echo $js;
}
}
?>