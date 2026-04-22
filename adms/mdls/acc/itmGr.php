<?php
$Fx=array('accSell','accIvt','accCost','accRdn','accBuyRem','accAwh','accPeP','accBuy','accDep','accGDep','accDepNiif','accGDepNiif');
if(_0s::$router=='GET itmGr'){ a_ses::hashKey('acc.itmGr');
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($_GET);
	$aName='';$nn=0; $leff='';
	foreach($Fx as $n=>$kn){ $nn++;
		$cn='C'.$nn.'.';
		$aName .= $cn.'accCode '.$kn.'Code,'.$cn.'accName '.$kn.'Name,';
		$leff .='LEFT JOIN gfi_opdc C'.$nn.' ON ('.$cn.'accId=A.'.$kn.') '."\n";
	}
	$aName=substr($aName,0,-1);

	if($_GET['itemGr']=='AF'){
		$aName='
C1.accCode accBuyCode,C1.accName accBuyName,
C2.accCode accDepCode,C2.accName accDepName,
C3.accCode accGDepCode,C3.accName accGDepName,
C4.accCode accDepNiifCode,C4.accName accDepNiifName,
C5.accCode accGDepNiifCode,C5.accName accGDepNiifName';
		$leff='LEFT JOIN gfi_opdc C1 ON (C1.accId=A.accSell)
		LEFT JOIN gfi_opdc C1 ON (C1.accId=A.accBuy)
		LEFT JOIN gfi_opdc C2 ON (C2.accId=A.accDep)
		LEFT JOIN gfi_opdc C3 ON (C3.accId=A.accGDep)
		LEFT JOIN gfi_opdc C4 ON (C4.accId=A.accDepNiif)
		LEFT JOIN gfi_opdc C4 ON (C5.accId=A.accGDepNiif)
		';
	}
echo a_sql::queryL('SELECT A.*, '.$aName.'
FROM itm_oiac A '.$leff.'
WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo grupo de artículos.',2=>'No se encontraron resultados.'));
}
else if(_0s::$router=='GET itmGr/form'){ a_ses::hashKey('acc.itmGr');
	if($js=_js::ise($_GET['accgrId'],'Se debe definir ID de Grupo.')){ die($js); }
	else{
	$q=a_sql::fetch('SELECT A.*
	FROM itm_oiac A
	WHERE accgrId=\''.$_GET['accgrId'].'\'  LIMIT 1',array(1=>'Error obteniendo grupo de artículos',2=>'El grupo no existe.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{
			$errs=0;
			foreach($Fx as $k){
				$qF=a_sql::fetch('SELECT accCode,accName FROM gfi_opdc WHERE accId=\''.$q[$k].'\' LIMIT 1',array(1=>'Error obteniendo cuentas '.$k.': '));
				if(a_sql::$err){ $js=a_sql::$errNoText; $errs++; }
				else if(a_sql::$errNo==-1){
					$q[$k.'Code']=$qF['accCode'];
					$q[$k.'Name']=$qF['accName'];
				}
				else{ $q[$k.'Code']=null; $q[$k.'Name']=null;  }
			}
			$js=_js::enc2($q);
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT itmGr/form'){ a_ses::hashKey('acc.itmGr');
	if($js=_js::ise($_J['accgrName'],'Se debe definir el nombre del grupo.')){ die($js); }
	else if($js=_js::ise($_J['itmGr'],'Se debe definir el grupo.')){ die($js); }
	else{
		foreach($Fx as $n=>$k){
			$_J[$k]=$_J['L'][$n]['accId'];
		}
		unset($_J['L']);
		$ins=a_sql::uniRow($_J,array('tbk'=>'itm_oiac','wh_change'=>'accgrId=\''.$_J['accgrId'].'\' LIMIT 1'));
		if(a_sql::$err){ $js=_js::e(3,'Error guardando grupo de artículos. '.a_sql::$errText); }
		else{
			$_J['accgrId']=($ins['insertId'])?$ins['insertId']:$_J['accgrId'];
			$js=_js::r('Grupo Actualizado Correctamente.',$_J);
		}
	}
	echo $js;
}
?>
