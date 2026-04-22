<?php
unset($_GET['kObj']);
if(_0s::$router=='GET ban'){
	$date2=$_GET['date2']; unset($_GET['date2']);
	if(!$date2){ $date2=date('Y-m-d'); }
	_ADMS::lib('_2d');
	$gb='A.accId,A.accCode,A.accName';
	$fie=$gb;
	$_GET['from']=$fie.',A.accId docEntry,SUM(AC.debBal-AC.creBal) bal 
	FROM gfi_opdc A
	LEFT JOIN gfi_dac1 AC ON (AC.accId=A.accId AND AC.canceled=\'N\' AND AC.docDate <=\''.$date2.'\')';
	$_GET['gBy']=$gb;
	$_GET['wh']='A.comp=\'bank\' AND A.lvType=\'D\'';
	echo a_sql::rPaging($_GET);
}
else if(_0s::$router=='GET ban/history'){
	$_GET['wh']='A.comp=\'bank\' AND A.lvType=\'D\'';
	if($_GET['date1']){ $_GET['wh'].= ' AND AC.docDate>=\''.$_GET['date1'].'\''; }
	if($_GET['date2']){ $_GET['wh'].= ' AND AC.docDate<=\''.$_GET['date2'].'\''; }
	unset($_GET['date1'],$_GET['date2']);
	$_GET['from']='AC.docDate,AC.accId,AC.tt,AC.tr,AC.serieId,AC.docNum,AC.debBal,AC.creBal 
	FROM gfi_opdc A
	JOIN gfi_dac1 AC ON (AC.accId=A.accId AND AC.canceled=\'N\')';
	$_GET['orderBy']='AC.docDate DESC';
	echo a_sql::rPaging($_GET);
}
?>