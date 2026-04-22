<?php

preg_match('/sysd\/(.*)/',_0s::$router,$cK);
$rFile='sysd.'.str_replace('/','.',$cK[1]);
if(preg_match('/sysd\/whs/',_0s::$router)){ require_once('sysd.whs.php'); }
else if(preg_match('/sysd\/groups/',_0s::$router)){ require_once('sysd.groups.php'); }
else if(preg_match('/sysd\/prp/',_0s::$router)){ require_once('sysd.prp.php'); }
?>