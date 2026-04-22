<?php
class _ocrd_emails{
static public function get($cardId=0,$P=array()){
	_ADMS::_lb('sql/filter');
	$wh = a_sql_filtByT($P['wh']);
	$r = ($P['r'])?$P['r']:'js';
	$fields = ($P['fields'])?$P['fields']:'*';
	$qu = a_sql::query('SELECT '.$fields.' FROM '._0s::$Tb['par_crd13'].' WHERE cardId=\''.$cardId.'\' '.$wh.' ORDER BY lineNum ASC');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,'Error obteniendo emails de socio: '.$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron emails registrados para el socio.'); }
	else{ while($L = $qu->fetch_assoc()){
		if($r=='plain'){ $js['emails'] .= $L['email'].','; }
		else if($r=='o'){ $js[] = $L; }
		else{ $js .= a_sql::JSON($L).','; }
		}
		if($r=='plain'){ $js['emails'] = substr($js['emails'],0,-1); }
		else if($r=='o'){ }
		else{ $js = '['.substr($js,0,-1).']'; }
	}
	if(a_sql::$errNo!=-1 && $r!='js'){ return json_decode($js,1); }
	return $js;
}
}

?>