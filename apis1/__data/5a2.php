<?php
header('Content-Type: application/json');
_ADMS::_lb('com/_5a2');
$D = $_POST;
if($ADMS_KEY == 'S'){
	if($ADMS_KEYo[1] == 'line' && $ADMS_MET == 'POST'){ echo _5a2::S_line($D); }
	else if($ADMS_KEYo[1] == 'mark' && $ADMS_MET == 'PUT'){ echo _5a2::S_markCompleted($D); }
	else if($ADMS_MET == 'DELETE'){ echo _5a2::S_delete($D); }
}
else if($ADMS_KEY == 'V'){
	if($ADMS_KEYo[1] == 'line' && $ADMS_MET == 'GET'){ echo _5a2::V_line($D); }
}
mysqli_close(a_sql::$DB);
?>