<?php
if(_0s::$router=='GET sysd/prp'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	echo a_sql::queryL('SELECT A.*
	FROM itm_oitp A
	WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo listado',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET sysd/prp/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($___D['prpId'],'Se debe definir ID.')){ die($js); }
	else{
		$q=a_sql::fetch('SELECT * FROM itm_oitp WHERE prpId=\''.$___D['prpId'].'\' LIMIT 1',array(1=>'Error obteniendo propiedad',2=>'Propiedad no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::enc2($q); }
	}
	echo $js;
}
else if(_0s::$router=='PUT sysd/prp/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($___D['name'],'Se debe definir el nombre.')){ die($js); }
	else{
		unset($___D['delete']);
		$ins=a_sql::insert($___D,array('table'=>'itm_oitp','wh_change'=>'WHERE prpId=\''.$___D['prpId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error guardando información. '.$ins['text']); }
		else{
			$___D['prpId']=($ins['insertId'])?$ins['insertId']:$___D['prpId'];
			$js=_js::r('Información guardada correctamente.',$___D);
		}
	}
	echo $js;
}
?>