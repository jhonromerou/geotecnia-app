<?php
JRoute::get('ivt/bitSea',function($D){
	if(_js::iseErr($D['whsId'],'Se debe definir la bodega','numeric>0')){ return _err::$errText; }
	$D['W.whsId']=$D['whsId']; unset($D['whsId']);
	_ADMS::lib('sql/filter');
	$fie='B.bId,B.itemId,B.itemSzId,W.onHand,I.udm,I.itemCode,I.itemName,CONCAT(B.bId,\' - \',I.itemName,\' (\',B.manCode,\')\') lineText';
	$fie.=($D['_fie'])?','.$D['_fie']:'';
	unset($D['_fie']);
	$wh='';
	if(c::$T['textSearch']){
		$sep=explode('lote ',c::$T['textSearch']);
		if($sep[1]){
			$wh .= 'AND (B.bId LIKE \'%'.$sep[1].'%\') ';
		}
		else{
			$sea=a_sql::toSe(c::$T['textSearch']);
			$wh .= 'AND (B.bId '.$sea.' OR I.itemCode '.$sea.' OR I.itemName '.$sea.') ';
		}
	}
	$wh .=a_sql_filtByT($D);
	return a_sql::fetchL('SELECT '.$fie.'
	FROM ivt_obit B 
	JOIN ivt_obiw W ON (W.bId=B.bId)
	JOIN itm_oitm I ON (B.itemId=I.itemId)
	WHERE 1 '.$wh.' LIMIT 15',['k'=>'L',1=>'Error obteniendo articulos.',2=>'No se encontraron resultados.'],true);
});
?>