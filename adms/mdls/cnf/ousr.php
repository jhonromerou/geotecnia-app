<?php
if(_0s::$router=='GET ousr'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	$_GET['wh']['user(E_noIgual)']='supersu';
	echo a_sql::queryL('SELECT A.* FROM a0_vs0_ousr A WHERE 1 '.a_sql_filtByT($_GET['wh']).' '.a_sql::nextLimit());
}
else if(_0s::$router=='PUT ousr'){ a_ses::hashKey('sysd.suadmin');
	if(!isset($_J['L']) || count($_J['L'])==0){ die(_js::e(3,'No hay lineas a modificar.')); }
	else{
		$nl=1;
		a_sql::transaction(); $cmt=false;
		foreach($_J['L'] as $n=>$X){
			$ln='Linea '.$nl.': '; $nl++;
			if(_js::iseErr($X['userName'],$ln.'Se debe definir el nombre del usuario.')){ break; }
			else if(_js::iseErr($X['user'],$ln.'Se debe definir el usuario.')){ break; }
			else if(_js::iseErr($X['userEmail'],$ln.'Se debe definir el correo.')){ break; }
			else if(_js::iseErr($X['password'],$ln.'Se debe definir una contraseña.')){ break; }
			else{
				$_J['L'][$n][0]='i';
				$_J['L'][$n][1]='a0_vs0_ousr';
				$_J['L'][$n]['_unik']='userId';
			}
		}
		if(_err::$err){ $js=_err::$errText; }
		else{
			a_sql::multiQuery($_J['L']);
			if(_err::$err){ $js=_err::$errText; }
			else{ $cmt=true; $js=_js::r('Datos actualizados correctamente.'); }
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}

?>