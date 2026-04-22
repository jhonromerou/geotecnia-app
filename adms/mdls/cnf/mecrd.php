<?php
JRoute::get('cnf/mecrd',function(){
	$q=a_sql::fetch('SELECT * FROM a0_mecrd WHERE id=\'1\' LIMIT 1',array(1=>'Error obteniendo información de la empresa.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $js=_js::enc2($q); }
	return $js;
});
JRoute::put('cnf/mecrd',function($_J){
	$q=a_sql::uniRow($_J,array('tbk'=>'a0_mecrd','wh_change'=>'id=\'1\' LIMIT 1'));
	if(a_sql::$err){ return _js::e(3,'Error actualizando: '.a_sql::$errText); }
	else{
		unset($_J['id']);
		return _js::r('Datos actualizados.',$_J);
	}
});
?>