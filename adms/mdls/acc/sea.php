<?php
_ADMS::_lb('sql/filter');
if(_0s::$router=='GET sea/pdc'){
	if(_0s::$D['textSearch']){
		$sea=a_sql::toSe(_0s::$D['textSearch']);
		$wh = 'AND (A.accCode '.$sea.' OR A.accName '.$sea.') ';
	}
	$fie='A.accId,A.accCode,A.accName';
	$fie.=($___D['_fie'])?','.$___D['_fie']:'';;
	unset($___D['_fie'],$___D['textSearch']);
	$wh .=a_sql_filtByT($___D);
	$q=a_sql::query('SELECT '.$fie.' FROM gfi_opdc A
WHERE 1 '.$wh.' LIMIT 5',array(1=>'Error obteniendo cuentas.',2=>'No se encontraron resultados.'));
	$M=array('L'=>array());
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else{ $k=0; $A=array(); $n=0;
		while($L=$q->fetch_assoc()){
			$L['lineText']=$L['accCode'].' - '.$L['accName'];
			$M['L'][]=$L;
		}
	}
	$js=_js::enc2($M);
	echo $js;
}

?>