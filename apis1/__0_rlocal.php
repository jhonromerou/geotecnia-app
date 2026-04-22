<?php
header('Content-Type: application/json');
require '__0_requi.php';
require 'phpbase2.php';
_ADMS::lib('_err,_js,a_sql,a_ses,JRoute');
if(JRoute::$app=='jcrons'){
	require(c::$V['PATH_ROOT'].'adms/publicapps/crons/'.JRoute::$app2.'.php');
}
else if(JRoute::$app=='pubapps'){
	require(c::$V['PATH_ROOT'].'adms/publicapps/'.JRoute::$app2.'.php');
}
else if(JRoute::$app=='_labs'){
	require('phplabs/'.JRoute::$app2.'.php');
}
?>
