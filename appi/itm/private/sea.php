<?php
JRoute::get('itm/sea/items',function($D){
	_ADMS::lib('sql/filter');
	$fie='I.itemId,I.itemCode,I.itemName,I.itemName lineText';
	$fie.=($D['_fie'])?','.$D['_fie']:'';
	unset($D['_fie']);
	$wh='';
	if(c::$T['textSearch']){
		$sea=a_sql::toSe(c::$T['textSearch']);
		$wh .= 'AND (I.itemCode '.$sea.' OR I.itemName '.$sea.') ';
	}
	$wh .=a_sql_filtByT($D);
	return a_sql::fetchL('SELECT '.$fie.'
	FROM itm_oitm I 
	WHERE 1 '.$wh.' LIMIT 10',['k'=>'L',1=>'Error obteniendo articulos.',2=>'No se encontraron resultados.'],true);
});
JRoute::get('itm/sea/sub',function($D){
	_ADMS::lib('sql/filter');
	$fie='I.itemId,G2.itemSzId,I.itemCode,I.itemName,I.itemName lineText';
	$fie.=($D['_fie'])?','.$D['_fie']:''; unset($D['_fie']);
	$wh='';
	if($D['wfaId']){
		$fie .=',WF.wfaId,WF.wfaIdBef,WF.whsIdBef';
		$il ='JOIN wma_mpg1 WF ON (WF.wfaId=\''.$D['wfaId'].'\') ';
		unset($D['wfaId']);
	}
	if(c::$T['textSearch']){
		$sep=explode(':',c::$T['textSearch']);
		$whIt='';
		if($sep[1]){
			c::$T['textSearch']=preg_replace('/\s?\:(\s*?).*/','',c::$T['textSearch']);
			$whIt='AND G1.itemSize=\''.preg_replace('/\s+/','',$sep[1]).'\' ';
		}
		c::$T['textSearch']=preg_replace('/\s+$/','',c::$T['textSearch']);
		$sea=a_sql::toSe(c::$T['textSearch']);
		$wh .= 'AND ((I.itemCode '.$sea.' OR I.itemName '.$sea.') '.$whIt.') ';
	}
	$wh .=a_sql_filtByT($D);
	return a_sql::fetchL('SELECT '.$fie.'
	FROM itm_oitm I
	LEFT JOIN itm_grs2 G2 ON (G2.grsId=I.grsId)
	LEFT JOIN itm_grs1 G1 ON (G1.itemSzId=G2.itemSzId)
	'.$il.'
	WHERE 1 '.$wh.' LIMIT 10',['k'=>'L',1=>'Error obteniendo articulos.',2=>'No se encontraron resultados.'],true);
});

/* parece que no se usa */
JRoute::get('itm/sea/subItems',function($D){
	$if='I.itemId,G2.itemSzId,I.itemCode,I.itemName'; $il=''; $iw='';
	return a_sql::fetchL('SELECT '.$if.'
	FROM itm_oitm I
	JOIN itm_grs2 G2 ON (G2.grsId=I.grsId)
	'.$il.'
	',['k'=>'L',1=>'Error obteniendo articulos.',2=>'No se encontraron resultados.'],true);
});
?>
