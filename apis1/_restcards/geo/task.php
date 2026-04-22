<?php

unset($_J['serieId'],$_J['slpId']);
if(_0s::$router=='GET task'){ //a_ses::hashKey('geo.remi.read');
	$q=a_sql::fetch('SELECT docDate,programado,ejecutado FROM xdp_task WHERE docDate=\''.$_GET['docDate'].'\' LIMIT 1',array(1=>'Error obteniendo tareas del dia.',2=>'Sin registros para hoy.'));
	if(a_sql::$err){ echo a_sql::$errNoText; }
	else{ echo _js::enc2($q); }
}
else if(_0s::$router=='POST task'){
	if($js=_js::ise($_J['docDate'],'Se debe la fecha')){}
	else{
		$ins=a_sql::uniRow($_J,array('tbk'=>'xdp_task','kui'=>'ud','wh_change'=>'docDate=\''.$_J['docDate'
		].'\' LIMIT 1'));
		if(a_sql::$err){ $js=_js::e(3,'Error guardando información: '.a_sql::$errText); }
		else{ $js=_js::r('Información actualizada correctamente.');}
	}
	echo $js;
}
?>