<?php
if(_0s::$router=='GET a0crd2/obtener'){
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
		$q= a_sql::query('SELECT *
	FROM a0_par_crd2
	WHERE 1 '.$wh.' LIMIT 200' ,array(1=>'Error obteniendo listado',2=>'No se encontraron resultados.'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){
			$k=$L['jsV'].'.'.$L['k'];
			echo '__SysD::puse(array(\'gr\'=>\''.$L['gr'].'\', \'jsV\'=>\''.$L['jsV'].'\',\'k\'=>\''.$L['k'].'\',\'editable\'=>\''.$L['editable'].'\', \'ini\'=>\''.$L['ini'].'\', \'type\'=>\''.$L['type'].'\', \'v\'=>\'\', \'descrip\'=>\''.$L['descrip'].'\', \'tag\'=>\''.$L['tag'].'\'));'."\n";
		}
	}
}
else if(_0s::$router=='GET a0crd2'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	_ADMS::_app($___D['mdlk'].'/sysd');
	$wh=a_sql_filtByT($___D); $Mx=array('L'=>array());
	$q= a_sql::query('SELECT id,editable,ini,type,jsV,k,v,descrip,tag
	FROM a0_par_crd2
	WHERE 1 '.$wh.' LIMIT 200' ,array(1=>'Error obteniendo listado'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			$k=$L['jsV'].'.'.$L['k'];
			__SysD::updFie($k,$L);
		}
	}
	foreach(__SysD::$V as $k =>$L){ $Mx['L'][]=$L; }
	echo _js::enc2($Mx);
}
else if(_0s::$router=='GET a0crd2/form'){ a_ses::hashKey('sysd.suadmin');
	$idk=$___D['idk'];
	if($js=_js::ise($idk,'Se debe definir IDk.')){ die($js); }
	else{
		$qf=a_sql::fetch('SELECT * FROM a0_par_crd2 WHERE idk=\''.$idk.'\' LIMIT 1',array(1=>'Error obteniendo parámetro'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{
			_ADMS::_app($___D['mdlk'].'/sysd');
			if(a_sql::$errNo==-1){
				$qf['exte']=json_decode($qf['exte'],1);
				if(!is_array($qf['exte'])){ $qf['exte']=array(); }
				__SysD::updFie($idk,$qf);
			}
			$js=_js::enc2(__SysD::$V[$idk]);
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT a0crd2/form'){ a_ses::hashKey('sysd.suadmin');
	$idk=$___D['idk'];
	if($js=_js::ise($idk,'Se debe definir la IDk')){ die($js); }
	else{
		$qF=a_sql::fetch('SELECT tag,type FROM a0_par_crd2 WHERE idk=\''.$idk.'\' LIMIT 1',array(1=>'Error obteniendo variable a actualizar.'));
		$existe=(a_sql::$errNo==-1);
		if(a_sql::$err){ die(a_sql::$errNoText); }
		_ADMS::_app($___D['mdlk'].'/sysd');
		__SysD::updFie($idk,array('v'=>$___D['v']));
		$DiB=__SysD::$V[$idk];
		$noEdi=(a_ses::$user=='supersu')?'':' AND editable=\'Y\'';
		$ins=a_sql::insert($DiB,array('table'=>'a0_par_crd2','wh_change'=>'WHERE idk=\''.$idk.'\' '.$noEdi.' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error actualizando información. '.$ins['text']); }
		else{
			$Di=$___D;
			$nV=$___D['v'];
			if($DiB['tag']=='colorMt'){ $Di=array('vUpd'=>$idk.'='.$nV); }
			else if($DiB['type']=='t'){ $Di=array('vUpd'=>$idk.'="'.$nV.'"'); }
			else{ $Di=array('vUpd'=>$idk.'='.$___D['v']); }
			$js=_js::r('Información guardada correctamente.',$Di);
		}
	}
	echo $js;
}
?>