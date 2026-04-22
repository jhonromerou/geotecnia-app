<?php
$reqAcc=false; /* pedir cuentas */

if(_0s::$router=='GET tax'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	echo a_sql::queryL('SELECT A.*,
	C1.accCode sellCode,C1.accName sellName, C2.accCode buyCode,C2.accName buyName
	FROM gfi_otax A
	LEFT JOIN gfi_opdc C1 ON (C1.accId=A.sellAcc)
	LEFT JOIN gfi_opdc C2 ON (C2.accId=A.buyAcc)
	WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo impuestos',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET tax/form'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($___D['vatId'],'Se debe definir ID.')){ die($js); }
	else{
		$q=a_sql::fetch('SELECT A.*,
	C1.accCode sellCode,C1.accName sellName, C2.accCode buyCode,C2.accName buyName
	FROM gfi_otax A
	LEFT JOIN gfi_opdc C1 ON (C1.accId=A.sellAcc)
	LEFT JOIN gfi_opdc C2 ON (C2.accId=A.buyAcc)
		WHERE A.vatId=\''.$___D['vatId'].'\' LIMIT 1',array(1=>'Error obteniendo impuesto',2=>'Impuesto no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::enc2($q); }
	}
	echo $js;
}
else if(_0s::$router=='POST tax/form'){ a_ses::hashKey('sysd.suadmin');
	$L=($_J['L'])?$_J['L']:array(); unset($_J['L']);
	$_J['sellAcc']=$L[0]['accId'];
	$_J['buyAcc']=$L[1]['accId'];
	if($js=_js::ise($_J['taxCode'],'Se debe definir el código.')){}
	else if($js=_js::ise($_J['taxName'],'Se debe definir el nombre.')){}
	else if($js=_js::ise($_J['rate'],'Se debe definir la tasa','numeric')){}
	else if($js=_js::ise($_J['taxType'],'Se debe definir el tipo.')){}
	else if($reAcc && $js=_js::ise($_J['sellAcc'],'Se debe definir la cuenta de ventas.','numeric')){}
	else if($reAcc && $js=_js::ise($_J['buyAcc'],'Se debe definir la cuenta de compras.','numeric')){}
	else{
		$ins=a_sql::insert($_J,array('table'=>'gfi_otax','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(3,'Error guardando impuesto. '.$ins['text']); }
		else{
			$js=_js::r('Impuesto creado correctamente.',$_J);
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT tax/form'){ a_ses::hashKey('sysd.suadmin');
	$L=($_J['L'])?$_J['L']:array(); unset($_J['L']);
	$_J['sellAcc']=$L[0]['accId'];
	$_J['buyAcc']=$L[1]['accId'];
	if($js=_js::ise($_J['vatId'],'Se debe definir ID.','numeric>0')){}
	else if($js=_js::ise($_J['taxCode'],'Se debe definir el código.')){}
	else if($js=_js::ise($_J['taxName'],'Se debe definir el nombre.')){}
	else if($js=_js::ise($_J['rate'],'Se debe definir la tasa','numeric')){}
	else if($js=_js::ise($_J['taxType'],'Se debe definir el tipo.')){}
	else if($js=_js::ise($_J['sellAcc'],'Se debe definir la cuenta de ventas.','numeric')){}
	else if($js=_js::ise($_J['buyAcc'],'Se debe definir la cuenta de compras.','numeric')){}
	else{
		$ins=a_sql::insert($_J,array('table'=>'gfi_otax','qDo'=>'update','wh_change'=>'WHERE vatId=\''.$_J['vatId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error guardando impuesto. '.$ins['text']); }
		else{
			$js=_js::r('Impuesto actualizado correctamente.',$_J);
		}
	}
	echo $js;
}
?>