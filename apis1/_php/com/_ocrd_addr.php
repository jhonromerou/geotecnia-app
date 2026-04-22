<?php
class _ocrd_addr{
static public function get($cardId=0,$P=array()){
	_ADMS::_lb('sql/filter');
	$wh = a_sql_filtByT($P['wh']);
	$r = ($P['r'])?$P['r']:'js';
	$fields = ($P['fields'])?$P['fields']:'*';
	$qu = a_sql::query('SELECT '.$fields.' FROM '._0s::$Tb['par_crd11'].' WHERE cardId=\''.$cardId.'\' '.$wh.' ORDER BY lineNum ASC LIMIT 10',array('errNo'=>array(1=>'Error obteniendo direcciones de socio:',2=>'No se encontraron direcciones registradas para el socio.')));
	$Mr = array();
	if($js =a_sql::$errNoText){ $js = _js::dec($js); }
	else{ while($L = $qu->fetch_assoc()){
		$k = $L['addrType'];
		if($r=='types'){ $Mr[$k][] = $L; }
		else if($r=='typesOne'){ $Mr[$k] = $L; }
		else{ $Mr[] = $L; }
		}
		$js = $Mr;
	}
	return $js;
}
}
?>