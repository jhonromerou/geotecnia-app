<?php
$path = c_g('PATH_ROOT').'adms/mapps/';
$tfi=$path.'tb/'.$_GET['kObj'].'.php';
if(!file_exists($tfi)){
	trigger_error('Error obteniendo lb tb '.$F, E_USER_ERROR);
}
else{ require($tfi); }
$_wh= $vidn.'=\''.$_GET['vid'].'\'';
unset($_GET['vid'],$_GET['kObj']);

if(_0s::$router=='GET tb'){
	$q= a_sql::query('SELECT * FROM '.$tbk.' WHERE 1 '.$whGet.' LIMIT 20',array(1=>'Error obteniendo listado '.$kv,2=>'No hay registros.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{
		while($L=$q->fetch_assoc()){
			$L['vid']=$L[$vidn];
			$Mx[]=$L;
		}
		$js=_js::enc(array('L'=>$Mx));
	}
	echo $js;
}
else if(_0s::$router=='GET tb/form'){
	$q= a_sql::fetch('SELECT * FROM '.$tbk.' WHERE '.$_wh.' LIMIT 1',array(1=>'Error obteniendo variables '.$kv,2=>'La información a actualizar no existe'));
	if(a_sql::$err){ echo a_sql::$errNoText; }
	else{ echo _js::enc2($q); }
}
else if(_0s::$router=='PUT tb'){
	revisar($_J);
	if(_err::$err){ die(_err::$errText); }
	else{
		$vid=$_J['vid']; unset($_J['vid']);
		$_wh= $vidn.'=\''.$vid.'\''; 
		$ins=a_sql::uniRow($_J,array('tbk'=>$tbk,'wh_change'=>$_wh.' LIMIT 1'));
		if(a_sql::$err){ $js=_js::e(3,'Error guardando información: '.a_sql::$errText); }
		else{
			$_J[$vidn]=($ins['insertId'])?$ins['insertId']:$vid;
			$o=array('vid'=>$_J[$vidn]);
			foreach($_o as $k=>$v){ $o[$k]=$_J[$v]; }
			$js=_js::r('Información guardada correctamente.',$o);
		}
	}
	echo $js;
}

?>