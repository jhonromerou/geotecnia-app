<?php
$tbk=$_GET['mdl'].'_ojsv';
if(_0s::$router=='GET jsv'){
	_ADMS::lib('sql/filter'); unset($_GET['mdl']);
	$_GET['from']='* FROM '.$tbk.'';
	echo a_sql::rPaging($_GET,false,array(1=>'Error obteniendo variables '.$kv,2=>'No hay valores definidos.'));
}
else if(_0s::$router=='GET jsv/form'){
	$q= a_sql::fetch('SELECT * FROM '.$tbk.' WHERE vid=\''.$_GET['vid'].'\' LIMIT 1',array(1=>'Error obteniendo variables '.$kv,2=>'La información a actualizar no existe'));
	if(a_sql::$err){ echo a_sql::$errNoText; }
	else{ echo _js::enc2($q); }
}
else if(_0s::$router=='PUT jsv'){
	if($js=_js::ise($_J['kObj'],'kObj no fue definido.')){ die($js); }
	else if($js=_js::ise($_J['value'],'Se debe definir información')){ die($js); }
	else{
		$ins=a_sql::uniRow($_J,array('tbk'=>$tbk,'wh_change'=>'vid=\''.$_J['vid'].'\' LIMIT 1'));
		if(a_sql::$err){ $js=_js::e(3,'Error guardando información: '.a_sql::$errText); }
		else{
			$_J['vid']=($ins['insertId'])?$ins['insertId']:$_J['vid'];
			$js=_js::r('Información guardada correctamente.',$_J);
		}
	}
	echo $js;
}

?>