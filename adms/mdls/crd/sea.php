<?php
_ADMS::_lb('sql/filter');
	//print_r(_0s::$uri);
if(_0s::$router=='GET sea/prs'){
	if(_0s::$D['textSearch']){
		$sea=a_sql::toSe(_0s::$D['textSearch']);
		$wh = 'AND A.name '.$sea.' ';
	}
	else{$wh =a_sql_filtByT($___D); }
	$fie='A.prsId,A.name,C.cardId,C.cardName';
	$fie.=($___D['_fie'])?','.$___D['_fie']:'';;
	$q=a_sql::query('SELECT '.$fie.' FROM par_ocpr A 
LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
WHERE 1 '.$wh.' LIMIT 5',array(1=>'Error obteniendo ordenes de producción.',2=>'No se encontraron resultados.'));
		$M=array('L'=>array());
		if(a_sql::$err){ die(a_sql::$errNoText); }
		else{ $k=0; $A=array(); $n=0;
			while($L=$q->fetch_assoc()){
				if(_0s::$D['textSearch']){ $L['lineText']=$L['name']; }
				$M['L'][]=$L;
			}
		}
		$js=_js::enc($M,'just');
	echo $js;
}
else if(_0s::$router=='GET sea/crd'){
	if(_0s::$D['textSearch']){
		$sea=a_sql::toSe(_0s::$D['textSearch']);
		$wh = 'AND (C.cardCode '.$sea.' OR C.cardName '.$sea.') ';
	}
	if($___D['wh']){ $wh .=a_sql_filtByT($___D['wh']); }
	$fie='C.cardId,C.cardName';
	$fie .=($___D['_fie'])?','.$___D['_fie']:'';
	unset($___D['wh'],$D['_fie']);
	$wh .=a_sql_filtByT($___D);
	$q=a_sql::query('SELECT '.$fie.' FROM par_ocrd C
WHERE 1 '.$wh.' LIMIT 5',array(1=>'Error obteniendo socios de negocios.',2=>'No se encontraron resultados.'));
		$M=array('L'=>array());
		if(a_sql::$err){ die(a_sql::$errNoText); }
		else{
			while($L=$q->fetch_assoc()){
				if(_0s::$D['textSearch']){ $L['lineText']=$L['cardName']; }
				$M['L'][]=$L;
			}
		}
		$js=_js::enc2($M);
	echo $js;
}

?>