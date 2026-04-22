<?php
if(_0s::$router=='GET cdc'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	echo a_sql::queryL('SELECT A.* FROM gfi_ocdc A
	WHERE 1 '.$wh.' LIMIT 2000',array(1=>'Error obteniendo centros de costos',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET cdc/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($___D['cdcId'],'Se debe definir ID de centro de costo.')){ die($js); }
	else{
		$q=a_sql::fetch('SELECT * FROM gfi_ocdc WHERE cdcId=\''.$___D['cdcId'].'\' LIMIT 1',array(1=>'Error obteniendo cuenta centro de costo',2=>'El centro de costo no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::enc2($q); }
	}
	echo $js;
}
else if(_0s::$router=='POST cdc/form'){ a_ses::hashKey('sysd.suadmin');
	if(_err::$err){ die(_err::$errText); }
	else{
		$ins=a_sql::insert($_J,array('table'=>'gfi_ocdc','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(3,'Error guardando centro: '.$ins['text']); }
		else{
			$_J['cdcId']=$ins['insertId'];
			$js=_js::r('Centro creado Correctamente.',$_J);
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT cdc/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($_J['cdcId'],'Se debe definir ID de centro','numeric>0')){ die($js); }
	else{
		$ins=a_sql::insert($_J,array('table'=>'gfi_ocdc','qDo'=>'update','wh_change'=>'WHERE cdcId=\''.$_J['cdcId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error actualizando centro: '.$ins['text']); }
		else{
			$js=_js::r('Centro Actualizado Correctamente.',$_J);
		}
	}
	echo $js;
}
?>