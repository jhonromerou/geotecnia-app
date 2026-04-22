<?php
class ocrd{
static $err=false; static $errText='';
static public function canView($cardId=0,$fie=false){
	$slps=a_ses::U_slpIds(array('f'=>'A.slpId','r'=>'in'));
	$fie=($fie)?','.$fie:'';
	$q=a_sql::query('SELECT A.cardId'.$fie.' FROM '._0s::$Tb['par_ocrd'].' A WHERE cardId=\''.$cardId.'\' '.$slps.' LIMIT 1',array(1=>'Error verificando permisos en socio de negocios: ',2=>'El socio de negocios no existe o no tiene permisos para ver información.'));
	if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; return false; }
	else{
		if($fie){ return $q->fetch_assoc(); }
		return array();
	}
}
}
?>