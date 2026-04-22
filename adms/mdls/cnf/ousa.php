<?php
if(_0s::$router=='GET ousa'){
	/*
	$q=a_sql::query('SELECT userId,hashKey FROM dcp_app.a0_vs0_ousa ');
	$M=[];
	while($L=$q->fetch_assoc()){
		$k=$L['userId'];
		if(!$M[$k]){ $M[$k]=''; }
		$M[$k] .= '"'.$L['hashKey'].'":1,';
	}
	foreach($M as $userId=>$perms){
		$ins=a_sql::uniRow(['userId'=>$userId,'perms'=>'{'.substr($perms,0,-1).'}','hashKey'=>''],array('tbk'=>'dcp_app.a0_vs0_ousa','wh_change'=>'userId=\''.$userId.'\' AND hashKey=\'\' LIMIT 1'));
	}
	die(print_r($ins));
	*/
	if($js=_js::ise($_GET['userId'],'Id de usuario no definido.','numeric>0')){ die($js); }
	$q=a_sql::fetch('SELECT perms FROM a0_vs0_ousa WHERE userId=\''.$_GET['userId'].'\' LIMIT 2000',array(1=>'Error obteniendo permisos para usuario: '));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){ echo $q['perms']; }
	else{ echo '{}'; }
}
else if(_0s::$router=='PUT ousa'){
	$D=$___D; unset($___D);
	if($js=_js::ise($D['userId'],'Id de usuario no definido.','numeric>0')){ die($js); }
	else if(count($D['P'])==0){ $js=_js::e(3,'No se han recibido permisos.'); }
	else{ $errs=0;
		$D2=array('userId'=>$D['userId'],'hashKey'=>$k,'perms'=>'');
		foreach($D['P'] as $k=>$v){
			if($v=='Y'){ $D2['perms'] .= '"'.$k.'":1,'; }
		}
		$D2['perms'] = '{'.substr($D2['perms'],0,-1).'}';
		$ins=a_sql::uniRow($D2,array('tbk'=>'a0_vs0_ousa','wh_change'=>'userId=\''.$D['userId'].'\' LIMIT 1'));
		if(a_sql::$err){ $js=_js::e(3,'Error asignando permisos: '.a_sql::$errNoText); $errs++; }
		if($errs==0){ $js=_js::r('Permisos asignados correctamente.'); }
	}
	echo $js;
}
?>
