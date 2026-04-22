<?php
if(_0s::$router=='GET v'){ a_ses::hashKey('sysd.suadmin');
	$kv=$___D['kname'];
	$q= a_sql::query('SELECT k,v FROM a0_ojsv A WHERE kname=\''.$kv.'\' LIMIT 500',array(1=>'Error obteniendo variable '.$kv));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else if(a_sql::$errNo==2){ $js='[]'; }
	else{ $Mx=array();
		while($L=$q->fetch_assoc()){
			$Mx[]=array('k'=>$L['k'],'v'=>$L['v']);
		}
		$js=json_encode($Mx);
	}
	echo $js;
}
else if(_0s::$router=='PUT slp/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($___D['slpCode'],'Se debe definir el código del vendedor.')){ die($js); }
	else if($js=_js::ise($___D['slpName'],'Se debe definir el nombre.')){ die($js); }
	else{
		$ins=a_sql::insert($___D,array('table'=>'par_oslp','wh_change'=>'WHERE slpId=\''.$___D['slpId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error guardando vendedor.'); }
		else{
			$___D['fpId']=($ins['insertId'])?$ins['insertId']:$___D['fpId'];
			$js=_js::r('Vendedor guardado correctamente.',$___D);
		}
	}
	echo $js;
}

?>