<?php
header('Content-Type: application/json');
_ADMS::_lb('com/_5c');
$D = $_POST;
if($ADMS_MET == 'PUT') echo _5c::post($_POST);
else if($ADMS_MET == 'GET') echo _5c::getList($_POST);
else if($ADMS_MET == 'DELETE') echo _5c::deleteById($D);
?>