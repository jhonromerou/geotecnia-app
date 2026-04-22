<?php
header('Content-Type: application/json');
_ADMS::_lb('com/_5o');
$D = $_POST;
$whUser = 'AND (
(NTY0.userId=\''.a_ses::$userId.'\')
)';
if($ADMS_KEY == 'Members'){
if($ADMS_MET == 'GET'){ echo _5o::members_get($D); }
else if($ADMS_MET == 'PUT'){ echo _5o::members_put($D); }
}
else if($ADMS_KEY == 'Se'){
if($ADMS_MET == 'GET'){ echo _5o::Se_get($D); }
}
else if($ADMS_KEY == 'Src'){
if($ADMS_MET == 'GET'){ echo _5o::src_get($D);; }
else if($ADMS_MET == 'PUT'){ echo _5o::src_put($D); }
else if($ADMS_MET == 'DELETE'){ echo _5o::src_delete($D); }
}
mysqli_close(a_sql::$DB);
?>