<?php
if(_0s::$router=='GET sysd/whs'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	echo a_sql::queryL('SELECT A.*
	FROM itm_owhs A
	WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo listado',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET sysd/whs/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($___D['whsId'],'Se debe definir ID.')){ die($js); }
	else{
		$q=a_sql::fetch('SELECT * FROM itm_owhs WHERE whsId=\''.$___D['whsId'].'\' LIMIT 1',array(1=>'Error obteniendo almacen',2=>'Almacen no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::enc2($q); }
	}
	echo $js;
}
else if(_0s::$router=='PUT sysd/whs/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($___D['whsCode'],'Se debe definir el código.')){ die($js); }
	else if($js=_js::ise($___D['whsName'],'Se debe definir el nombre.')){ die($js); }
	else if($js=_js::ise($___D['whsType'],'Se debe definir el tipo.')){ die($js); }
	else{
		unset($___D['delete']);
		$ins=a_sql::insert($___D,array('table'=>'itm_owhs','wh_change'=>'WHERE whsId=\''.$___D['whsId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error guardando información. '.$ins['text']); }
		else{
			$___D['whsId']=($ins['insertId'])?$ins['insertId']:$___D['whsId'];
			$___D['whsName']=$___D['whsCode'].') '.$___D['whsName'];
			$js=_js::r('Información guardada correctamente.',$___D);
		}
	}
	echo $js;
}
?>