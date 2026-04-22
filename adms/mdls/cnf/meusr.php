<?php
if(_0s::$router=='GET meusr/form'){ a_ses::hashKey('sysd.user');
	$q=a_sql::fetch('SELECT user,userEmail,password,userName FROM a0_vs0_ousr WHERE userId=\''.$_GET['userId'].'\' LIMIT 1',array(1=>'Error obteniendo información del usuario.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $js=_js::enc2($q); }
	echo $js;
}
else if(_0s::$router=='PUT meusr'){ a_ses::hashKey('sysd.user');
	if(_js::iseErr($_J['user'],'Se debe definir el usuario.')){}
	else if(_js::iseErr($_J['userEmail'],'Se debe definir el correo del usuario.')){}
	else if(_js::iseErr($_J['password'],'Se debe definir una contraseña.')){}
	else if(_js::iseErr($_J['userName'],'Se debe definir el nombre del usuario.')){}
	if(_err::$err){ die(_err::$errText); }
	$q=a_sql::uniRow($_J,array('tbk'=>'a0_vs0_ousr','wh_change'=>'userId=\''.$_J['userId'].'\' LIMIT 1'));
	if(a_sql::$err){ echo _js::e(3,'Error actualizando: '.a_sql::$errText); }
	else{
		unset($_J['userId']);
		echo _js::r('Datos actualizados.',$_J);
	}
}
?>