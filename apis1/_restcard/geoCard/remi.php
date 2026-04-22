<?php
if(_0s::$router=='GET remi'){ //a_ses::hashKey('geo.remi.read');
	_ADMS::lib('iDoc');
	_ADMS::_lb('sql/filter');
	$_GET['fromA']='* FROM xdp_orit A';
	$_GET['orderByDef']='A.dateUpd DESC';
	$_GET['whA']='AND A.cardId=\''.a_ses::$Tok['cardId'].'\' ';
 echo iDoc::get($_GET);
}
else if(_0s::$router=='GET remi/view'){ //a_ses::hashKey('geo.remi.read');
	_ADMS::lib('iDoc');
	$_GET['fromA']='* FROM xdp_orit A';
	$_GET['whA']='AND A.cardId=\''.a_ses::$Tok['cardId'].'\' ';
 iDoc::getOne($_GET);
}
?>
