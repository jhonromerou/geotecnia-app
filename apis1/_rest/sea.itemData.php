<?php
_ADMS::_lb('itm,sql/filter');
$lastSellPriceCardId = $D['wh']['lastSellPriceCardId'];
$getSrcType = $D['wh']['getSrcType'];
if(is_array($D['wh']) && array_key_exists('lastSellPriceCardId',$D['wh']) && _js::ise($lastSellPriceCardId)){ die(_js::e(3,'Se debe definir el socio de negocios para continuar.')); }
unset($D['wh']['lastSellPriceCardId'],$D['wh']['getSrcType']);
$justCode=preg_replace('/^C\:/i','',$D['text']);
if(preg_match('/^C\:/i',$D['text'])){
	$wh='(I.itemCode=\''.$justCode.'\')';
}
else{
	$s=a_sql::toSe($D['text']);
	$wh='(I.itemCode '.$s.' OR I.itemName '.$s.')';
}
if($D['viewType']=='itemSize'){
	$itemCode= substr($D['text'],0,-2);
	$itemSize= substr($D['text'],-2);
	$wh='(I.itemCode '.$s.' OR (I.itemCode=\''.$itemCode.'\' AND grs1.itemSize=\''.$itemSize.'\') OR I.itemName '.$s.')';
	$wh .= ' '.a_sql_filtByT($D['wh']); 
	$q= _itm::getSizes(array('fie'=>$D['fields'],'wh'=>$wh,'l'=>5,'err1'=>'Error buscando productos.','err2'=>'No se encontraron resultados'));
}
else{
	$wh .= ' '.a_sql_filtByT($D['wh']);
	$q= _itm::get(array('fie'=>$D['fields'],'wh'=>$wh,'l'=>10,'err1'=>'Error buscando productos.','err2'=>'No se encontraron resultados ('.$justCode.')'));
}
if(a_sql::$err){ $js=a_sql::$errNoText; }
else{ $Mx=array('L'=>array());
	while($L=$q->fetch_assoc()){
		if(_0s::jSocVerif('=','Y','opvt_showLastBuyPrice')){
			$qf=a_sql::fetch('SELECT B.price FROM '._0s::$Tb['gvt_pvt1'].' B JOIN '._0s::$Tb['gvt_opvt'].' A ON (A.docEntry=A.docEntry) WHERE B.itemId=\''.$L['itemId'].'\' AND A.cardId=\''.$lastSellPriceCardId.'\' AND A.docStatus IN (\'O\',\'C\') ORDER BY A.docDate DESC LIMIT 1');
			if(a_sql::$errNo==1){ $L['lastSellPriceCard']= -1; }
			else if(a_sql::$errNo==2){ $L['lastSellPriceCard']=0; }
			else{ $L['lastSellPriceCard']=$qf['price']; }
		}
		if($getSrcType!=''){
			$qf=a_sql::fetch('SELECT src FROM '._0s::$Tb['itm_src1'].' WHERE itemId=\''.$L['itemId'].'\' AND type=\''.$getSrcType.'\' LIMIT 1',array(1=>'Error obteniendo src del artículo.'));
			if(a_sql::$err){ die(a_sql::$errNoText); }
			else if(a_sql::$errNo==-1){ $L['src'.$getSrcType]= $qf['src']; }
		}
		$L['lineText']= $L['itemName'];
		$Mx['L'][] = $L;
	}
	$js=_js::enc($Mx,'NO_PAGER'); unset($Mx);
}
echo $js;
?>