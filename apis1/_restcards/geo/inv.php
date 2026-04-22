<?php
require('geo.php');
unset($_J['serieId'],$_J['slpId']);
if(_0s::$router=='GET inv/remiOpen'){ //a_ses::hashKey('geo.remi.read');
	_ADMS::lib('iDoc');
	_ADMS::_lb('sql/filter');
	$gb='A.docEntry,A.dateC,A.dateUpd,A.cardName,A.proyect';
	$_GET['fromA']=$gb.',SUM(B.priceLine) docTotalxInv 
	FROM xdp_orit A
	JOIN xdp_rit1 B ON (B.docEntry=A.docEntry)';
	$_GET['whA']='AND B.lineStatus=\'O\' GROUP BY '.$gb;
 echo iDoc::get($_GET);
}

else if(_0s::$router=='GET inv/statuse'){ //a_ses::hashKey('geo.remi.read');
	$M=a_sql::fetch('SELECT A.docEntry,A.cardName,A.proyect,A.dateC,C.licTradNum 
	FROM xdp_orit A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	WHERE docEntry=\''.$_GET['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de documento',2=>'El documento no existe.'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$M['L']=array();
	$gb='B.itemId,B.ensType,I.itemCode,I.udm,I.itemName,B.lineStatus,B.price';
	$ql=a_sql::query('SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.priceLine) priceLine
	FROM xdp_rit1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)
	WHERE docEntry=\''.$_GET['docEntry'].'\'  
	GROUP BY '.$gb,array(1=>'Error obteniendo lineas items de documento'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if(a_sql::$errNo==-1){
		while($L=$ql->fetch_assoc()){
			$M['L'][]=$L;
		}
	}
	echo _js::enc2($M);
}

?>