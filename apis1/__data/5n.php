<?php
header('Content-Type: application/json');
$D = $_POST;
$whUser = 'AND ((NTY0.userId=\''.a_ses::$userId.'\') )';
_ADMS::_lb('apps/tickan');
//search esta en adms_Search A:OWBO.list
if($ADMS_KEY == 'o'){
if($ADMS_MET == 'GET'){
	$qu = a_sql::query('SELECT NTY0.*, U1.userName, U2.userName userFromName FROM '._ADMS::$TBSoc['ap2_onot'].' NTY0 INNER JOIN '._ADMS::$TBSoc['A0_vs0_ousr'].' U1 ON (U1.userId = NTY0.userId) INNER JOIN '._ADMS::$TBSoc['A0_vs0_ousr'].' U2 ON (U2.userId = NTY0.userFrom) WHERE isRead=\'N\' '.$whUser.' '.$wh.' ORDER BY NTY0.dateC DESC, NTY0.notId DESC LIMIT 10');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron notificaciones.'); }
	else{
		while($L = $qu->fetch_assoc()){
			if($L['targetType'] == 'wboList'){
				$qBo = _5b::i_list($L['targetRef'],'');
				$L['wboId'] = $qBo['wboId'];
			}
			$js .= a_sql::JSON($L).',';
		}
		$js = '{"DATA":['.substr($js,0,-1).'
]}';
	}
	echo $js;
}
}
mysqli_close(a_sql::$DB);
?>