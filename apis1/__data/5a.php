<?php
header('Content-Type: application/json');
_ADMS::_lb('apps/tickan');
$D = $_POST;
if($ADMS_KEY == 'S'){
	if($ADMS_KEYo[1] == 'full' && $ADMS_MET == 'PUT'){ echo _5a::S_full($_POST); }
	else if($ADMS_KEYo[1] == 'updField' && $ADMS_MET == 'PUT'){ echo _5a::S_updField($_POST); }
	else if($ADMS_KEYo[1] == 'moveCard' && $ADMS_MET == 'PUT'){ echo _5a::S_moveCard($_POST); }
}
else if($ADMS_KEY == 'sBy'){
if($ADMS_KEYo[1] == 'wboList'){ echo _5a::sBy_wboList($D);}
}
else if($ADMS_KEY == 'O'){
if($ADMS_KEYo[1] == 'float'){ echo _5a::O_float($_POST['actId']); }
}
else if($ADMS_KEY == 'Copy'){
if($ADMS_MET == 'POST'){ echo _5a::S2_copy($D); }
}
mysqli_close(a_sql::$DB);
?>