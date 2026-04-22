<?php
if(_0s::$router=='GET '){
	$q=a_sql::query('SELECT A.* FROM app_onfy A 
WHERE A.userId=\''.a_ses::$userId.'\' ORDER BY dateC DESC '.a_sql::nextLimit(),array(1=>'Error obteniendo notificaciones',2=>'No hay notificaciones.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{
		$M=array('L'=>array());
		while($L=$q->fetch_assoc()){
			$M['L'][]=$L;
		}
		$js=_js::enc($M);
	}
	echo $js;
}
?>