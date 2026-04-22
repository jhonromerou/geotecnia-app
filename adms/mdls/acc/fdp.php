<?php
if(_0s::$router=='GET fdp'){
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	echo a_sql::queryL('SELECT A.*,B.accCode,B.accName
	FROM gfi_ofdp A
	LEFT JOIN gfi_opdc B ON (B.accId=A.accId)
	WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo formas de pago',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET fdp/form'){
	if($js=_js::ise($___D['fpId'],'Se debe definir ID.')){ die($js); }
	else{
		$q=a_sql::fetch('SELECT A.*,B.accCode,B.accName FROM gfi_ofdp A
		LEFT JOIN gfi_opdc B ON (B.accId=A.accId)
		WHERE A.fpId=\''.$___D['fpId'].'\' LIMIT 1',array(1=>'Error obteniendo forma de pago',2=>'Forma de pago no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::enc2($q); }
	}
	echo $js;
}
else if(_0s::$router=='POST fdp/form'){
	if($js=_js::ise($_J['fpCode'],'Se debe definir el código.')){ die($js); }
	else if($js=_js::ise($_J['fpName'],'Se debe definir el nombre.')){ die($js); }
	else{
		unset($_J['accName']);
		$ins=a_sql::insert($_J,array('table'=>'gfi_ofdp','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(3,'Error guardando forma de pago. '.$ins['text']); }
		else{
			$_J['fpId']=$ins['insertId'];
			$js=_js::r('Forma de Pago guardada correctamente.',$_J);
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT fdp/form'){
	if($js=_js::ise($_J['fpId'],'Se debe definir ID.','numeric>0')){}
	else if($js=_js::ise($_J['fpCode'],'Se debe definir el código.')){}
	else if($js=_js::ise($_J['fpName'],'Se debe definir el nombre.')){}
	else{
		unset($_J['accName']);
		$ins=a_sql::insert($_J,array('table'=>'gfi_ofdp','qDo'=>'update','wh_change'=>'WHERE fpId=\''.$_J['fpId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error guardando forma de pago. '.$ins['text']); }
		else{
			$_J['fpId']=($ins['insertId'])?$ins['insertId']:$_J['fpId'];
			$js=_js::r('Forma de Pago guardada correctamente.',$_J);
		}
	}
	echo $js;
}
?>