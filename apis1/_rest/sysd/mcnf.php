<?php
if(_0s::$router=='GET mcnf'){ a_ses::hashKey('sysd.suadmin');
	$kv=$___D['kname'];
	$q= a_sql::query('SELECT accK,value FROM a0_mcnf  WHERE mdl=\''.$_GET['mdl'].'\' LIMIT 100',array(1=>'Error obteniendo variables',2=>'El modulo no tiene variables para configurar.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $Mx=array();
		while($L=$q->fetch_assoc()){
			$Mx[$L['accK']]=$L['value'];
		}
		$js=_js::enc2($Mx);
	}
	echo $js;
}
else if(_0s::$router=='PUT mcnf'){ a_ses::hashKey('sysd.suadmin');
	if($js=_err::iff((!is_array($_J['L']) || count($_J['L'])==0),'No se enviaron lineas para actualizar.')){}
	else{
		$errs=0;
		foreach($_J['L'] as $k=>$L){
			if($js=_js::ise($L['accK'],'Se debe definir el código de la variable')){ $errs++; break; }
			else{
				$ins=a_sql::uniRow($L,array('tbk'=>'a0_mcnf','wh_change'=>'accK=\''.$L['accK'].'\' LIMIT 1'));
				if(a_sql::$err){ $errs++; $js=_js::e(3,'Error definiendo variable: '.a_sql::$errText); }
			}
		}
		if($errs==0){ 
			$js=_js::r('Variable definida correctamente.');
		}
	}
	echo $js;
}

?>