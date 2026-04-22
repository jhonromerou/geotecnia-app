<?php
if(_0s::$router=='GET rep/assg'){
	_ADMS::_lb('sql/filter');
	$___D['wh']['type']=''; //todos
	$wh =a_sql_filtByT($___D['wh']);
	$q=a_sql::query('SELECT R.reportId,R.type,R.dpt,R.m1,R.m2,R.m3,R.text, R1.reportId idAssg
	FROM a0_vs3_oqry R
	LEFT JOIN a0_vs3_qry1 R1 ON (R1.reportId=R.reportId AND R1.userId=\''.$___D['userId'].'\')
	WHERE 1 '.$wh.' ORDER BY R.type,R.dpt,R.m1,R.m2,R.m3',array(1=>'Error obteniendo reportes de sistema.',2=>'No se han encontrado reportes.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){
			$L['checked']=($L['idAssg'])?'Y':'N';
			$Mx['L'][] = $L;
		}
		$js =_js::enc2($Mx); unset($Mx);
	}
	echo $js;
}
else if(_0s::$router=='PUT rep/assg'){
	if($js=_js::ise($___D['userId'],'Se debe definir el usuario','numeric>0')){}
	else if(!is_array($___D['L']) || count($___D['L'])==0){ $js= _js::e(3,'No se recibieron actualizaciones a realizar'); }
	else{
		$errs=0;
		foreach($___D['L'] as $rId=>$ck){
			$L=array('reportId'=>$rId,'userId'=>$___D['userId']);
			if($ck=='N'){ $L['delete']='Y'; }
			$ins=a_sql::insert($L,array('table'=>'a0_vs3_qry1','wh_change'=>'WHERE reportId=\''.$rId.'\' AND userId=\''.$___D['userId'].'\' LIMIT 1'));
			if($ins['err']){ $js=_js::e(3,'Error definidiendo permisos: '.$ins['err']['error_sql']); $errs++; break; }
		}
		if($errs==0){ $js= _js::r('Permisos actualizados'); }
	}
	echo $js;
}
?>
