<?php
$reqAcc=false; /* pedir cuentas */


if(_0s::$router=='GET dac/view'){
	if($js=_js::ise($_GET['tt'],'tt no definido para obtener asiento')){}
	else if($js=_js::ise($_GET['tr'],'tr no definido para obtener asiento','numeric>0')){}
	else{
		echo a_sql::queryJs('SELECT 
		A.isRever,A.tt,A.tr,AC.accCode,AC.accName,A.canceled,A.debBal,A.creBal,A.docDate,C.cardName
		FROM gfi_dac1 A
		LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
		LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE A.tt=\''.$_GET['tt'].'\' AND A.tr=\''.$_GET['tr'].'\' ',array(1=>'Error obteniendo asiendo contable',2=>'Asiento contable no encontrado'));
	}
	echo $js;
}
?>