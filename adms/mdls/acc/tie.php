<?php
if(_0s::$router=='GET tie'){
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	echo a_sql::queryL('SELECT A.*,B.accCode,B.accName
	FROM gfi_otie A
	LEFT JOIN gfi_opdc B ON (B.accId=A.accId)
	WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo conceptos de pago',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET tie/form'){
	if($js=_js::ise($___D['vid'],'Se debe definir ID.')){ die($js); }
	else{
		$q=a_sql::fetch('SELECT A.*,B.accCode,B.accName FROM gfi_otie A
		LEFT JOIN gfi_opdc B ON (B.accId=A.accId)
		WHERE A.vid=\''.$___D['vid'].'\' LIMIT 1',array(1=>'Error obteniendo conceptos de pago',2=>'Concepto de pago no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::enc2($q); }
	}
	echo $js;
}
else if(_0s::$router=='POST tie/form'){
	if($js=_js::ise($_J['value'],'Se debe definir el concepto')){ die($js); }
	else if($js=_js::ise($_J['accId'],'Se debe la cuenta contable','numeric>0')){ die($js); }
	else{
		unset($_J['accName']);
		$ins=a_sql::insert($_J,array('table'=>'gfi_otie','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(3,'Error guardando concepto de pago. '.$ins['text']); }
		else{
			$_J['vid']=$ins['insertId'];
			$js=_js::r('Forma de Pago guardada correctamente.',$_J);
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT tie/form'){
	if($js=_js::ise($_J['vid'],'Se debe definir ID.','numeric>0')){}
  else if($js=_js::ise($_J['value'],'Se debe definir el concepto.')){}
  else if($js=_js::ise($_J['accId'],'Se debe la cuenta contable','numeric>0')){ die($js); }
	else{
		unset($_J['accName']);
		$ins=a_sql::insert($_J,array('table'=>'gfi_otie','qDo'=>'update','wh_change'=>'WHERE vid=\''.$_J['vid'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error guardando forma de pago. '.$ins['text']); }
		else{
			$_J['vid']=($ins['insertId'])?$ins['insertId']:$_J['vid'];
			$js=_js::r('Forma de Pago guardada correctamente.',$_J);
		}
	}
	echo $js;
}
?>