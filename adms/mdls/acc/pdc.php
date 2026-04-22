<?php
class accPdp{
	/*añadir revision de asientos para evitar modificar */
static public function revi($_J=array()){
	if($js=_js::ise($_J['fatherAcc'],'Se debe definir cuenta padre','numeric>0')){ _err::err($js); }
	else if($js=_js::ise($_J['lvType'],'Se debe definir tipo nivel cuenta')){ _err::err($js); }
	else if($js=_js::ise($_J['accName'],'Se debe definir el nombre.')){ _err::err($js); }
	else{
	$qf=a_sql::fetch('SELECT lvType,accClass,accNature,accName,lvel FROM gfi_opdc WHERE accId=\''.$_J['fatherAcc'].'\' LIMIT 1',array(1=>'Error obteniendo información de cuenta padre.',2=>'Cuenta padre no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($qf['lvType']!='T'){ _err::err(_js::e(3,'La cuenta padre es de detalle, no puede tener subcuentas. Cuenta: '.$qf['accName'].'')); }
		$_J['accClass']=$qf['accClass'];
		$_J['accNature']=$qf['accNature'];
		$_J['lvel']=$qf['lvel']+1;
	}
	if($_J['accId']){
		$qf=a_sql::fetch('SELECT A.lvType, H.accId
		FROM gfi_opdc A
		LEFT JOIN gfi_opdc H ON (H.fatherAcc=A.accId)
		WHERE A.accId=\''.$_J['accId'].'\' LIMIT 1',array(1=>'Error verificando cuentas hijas de la cuenta.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1){
			if($qf['accId']>0 && $_J['lvType']=='D' && $qf['lvType']=='T'){
				_err::err(_js::e(3,'La cuenta tiene subcuentas y no se puede marcar como detalle.'));
			}
		}
	}
	return $_J;
}
}

if(_0s::$router=='GET pdc'){ a_ses::hashKey('acc.pdc');
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	echo a_sql::queryL('SELECT A.*
	FROM gfi_opdc A
	WHERE 1 '.$wh.' ORDER BY lvel ASC,accCode ASC LIMIT 2000',array(1=>'Error obteniendo plan de cuentas',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET pdc/form'){ a_ses::hashKey('acc.pdc');
	if($js=_js::ise($___D['accId'],'Se debe definir ID de cuenta.')){ die($js); }
	else{
		$q=a_sql::fetch('SELECT * FROM gfi_opdc WHERE accId=\''.$___D['accId'].'\' LIMIT 1',array(1=>'Error obteniendo cuenta de plan de cuentas',2=>'La cuenta no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::enc2($q); }
	}
	echo $js;
}
else if(_0s::$router=='POST pdc/form'){ a_ses::hashKey('acc.pdc');
	$_J=accPdp::revi($_J);
	if(_err::$err){ die(_err::$errText); }
	else{
		$ins=a_sql::insert($_J,array('table'=>'gfi_opdc','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(3,'Error guardando cuenta: '.$ins['text']); }
		else{
			$_J['newAcc']='Y';
			$_J['accId']=$ins['insertId'];
			$js=_js::r('Cuenta creada Correctamente.',$_J);
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT pdc/form'){ a_ses::hashKey('acc.pdc');
	if($js=_js::ise($_J['accId'],'Se debe definir ID de cuenta','numeric>0')){ die($js); }
	$_J=accPdp::revi($_J);
	if(_err::$err){ die(_err::$errText); }
	else{
		$ins=a_sql::insert($_J,array('table'=>'gfi_opdc','qDo'=>'update','wh_change'=>'WHERE accId=\''.$_J['accId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error guardando cuenta: '.$ins['text']); }
		else{
			$js=_js::r('Cuenta Actualizado Correctamente.',$_J);
		}
	}
	echo $js;
}
?>