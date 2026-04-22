<?php
$D=$_POST;
if($__K=='perms'){
if($__M=='GET'){
	if($js=_js::ise($___D['userId'],'Id de usuario no definido.','numeric>0')){ die($js); }
	$q=a_sql::query('SELECT hashKey,perms FROM a0_vs0_ousa WHERE userId=\''.$D['userId'].'\' LIMIT 2000',array(1=>'Error obteniendo permisos para usuario: ',2=>'El usuario no tiene ningun permiso asignado.'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
	while($L=$q->fetch_assoc()){
		$js .= '"'.$L['hashKey'].'":"'.$L['perms'].'",';
	}
	echo '{'.substr($js,0,-1).'}';
	}
}
else if($__M=='PUT'){
	if($js=_js::ise($D['userId'],'Id de usuario no definido.','numeric>0')){ die($js); }
	else if(count($D['P'])==0){ $js=_js::e(3,'No se han recibido permisos.'); }
	else{ $errs=0;
		foreach($D['P'] as $k=>$v){
			$D2=array('userId'=>$D['userId'],'hashKey'=>$k,'ocardId'=>a_ses::$ocardId);
			if($v=='N'){ $D2['delete']='Y'; }
			$ins=a_sql::insert($D2,array('table'=>'a0_vs0_ousa','wh_change'=>'WHERE ocardId=\''.$D2['ocardId'].'\' AND userId=\''.$D['userId'].'\' AND hashKey=\''.$k.'\' LIMIT 1'));
			if($ins['err']){ $js=_js::e(3,'Error asignando permisos: '.$ins['text']); $errs++; break; }
		}
		if($errs==0){ $js=_js::r('Permisos asignados correctamente.'); }
	}
	echo $js;
}
}
?>