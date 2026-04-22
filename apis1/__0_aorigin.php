<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: ocardtooken, ocardcode,byocard,ocardfileconf,userId,Content-Type');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
if($_SERVER['REQUEST_METHOD']=='OPTIONS'){ die('ok'); }
date_default_timezone_set('America/Bogota');
?>
