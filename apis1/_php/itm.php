<?php
//obsoleto, migrado a wma/lcost
class _itm{
static $Mt=array();
static public function getInfo($P=array()){
	$itemId=$P['itemId']; $itemSzId=$P['itemSzId'];
	if(array_key_exists($itemId,self::$Mt)){ return self::$Mt[$itemId]; }
	$q=a_sql::fetch('SELECT I.itemCode,I.itemName, I.grsId FROM '._0s::$Tb['itm_oitm'].' I 
WHERE itemId=\''.$itemId.'\' LIMIT 1',array(1=>$err1,2=>$err2));
	if(!a_sql::$err){
		self::$Mt[$itemId]=$q;
	}
	return self::$Mt[$itemId];
}
static public function get($P=array()){
	$err1=($P['err1'])?$P['err1']:'Error obteniendo listado de productos: ';
	$err2=($P['err2'])?$P['err2']:'No se encontraron resultados.';
	$wh=($P['wh'])?' AND '.$P['wh']:'';
	//$wh .= ' '.a_ses::get_owh('I');
	$limit=($P['l'])?$P['l']:1;
	$fie='I.itemId,I.itemCode,I.itemName,I.grsId';
	$fie .=($P['fie'])?','.$P['fie']:'';
	$q=a_sql::query('SELECT I.handSize,'.$fie.' FROM '._0s::$Tb['itm_oitm'].' I 
WHERE 1'.$wh.' LIMIT '.$limit,array(1=>$err1,2=>$err2));
	return $q;
}
static public function getSizes($P=array()){
	$err1=($P['err1'])?$P['err1']:'Error obteniendo listado de productos: ';
	$err2=($P['err2'])?$P['err2']:'No se encontraron resultados.';
	$wh=($P['wh'])?' AND '.$P['wh']:'';
	//$wh .= ' '.a_ses::get_owh('I');
	$limit=($P['l'])?$P['l']:1;
	$inner='';
	$fie='\'Y\' itemSz, I.itemId, grs1.itemSzId, I.itemCode, I.itemName itemNameBase, CONCAT(I.itemName,\' T:  \',grs1.itemSize) as itemName, grs1.itemSize';
	if(preg_match('/(buyPrice|sellPrice)/',$P['fie'])){
		$P['fie']=preg_replace('/I\.(buyPrice|sellPrice)\,?/','',$P['fie']);
		$inner .= ' LEFT JOIN '._0s::$Tb['itm_oits'].' its ON (its.itemId=I.itemId AND its.itemSzId=grs1.itemSzId)';
		$fie .=',IF(its.buyPrice IS NOT NULL,its.buyPrice,I.buyPrice) buyPrice';
		$fie .=',IF(its.sellPrice IS NOT NULL,its.sellPrice,I.sellPrice) sellPrice';
	}
	$fie .=($P['fie'])?','.$P['fie']:'';
	$q=a_sql::query('SELECT '.$fie.' FROM '._0s::$Tb['itm_oitm'].' I 
JOIN '._0s::$Tb['itm_grs2'].' grs2 ON (grs2.grsId=I.grsId) 
JOIN '._0s::$Tb['itm_grs1'].' grs1 ON (grs1.itemSzId=grs2.itemSzId)
'.$inner.'
WHERE 1'.$wh.' LIMIT '.$limit,array(1=>$err1,2=>$err2));
	return $q;
}
static public function getBarCode($barCode='',$P=array()){
	$itemCode=substr($barCode,0,-2);
	$itemSize=substr($barCode,-2);
	$fie='\'Y\' itemSz,I.itemCode,Isz.itemSize,B.itemId,B.itemSzId,B.barCode,I.itemName';
	$q=a_sql::fetch('SELECT '.$fie.' FROM 
'._0s::$Tb['itm_oitm'].' I
LEFT JOIN '._0s::$Tb['itm_bar1'].' B ON (B.itemId=I.itemId) 
LEFT JOIN '._0s::$Tb['itm_grs1'].' Isz ON (Isz.itemSzId=B.itemSzId) 
WHERE B.barCode=\''.$barCode.'\' OR (I.itemCode=\''.$itemCode.'\' AND Isz.itemSize=\''.$itemSize.'\') LIMIT 1',array(1=>'Error obteniendo el código.',2=>'El código no existe o no está relacionado a ningun producto.'));
	return $q;
}
static public function log2_put($P=array()){ /* log costos */
	$Di=array('updateType'=>$P['updateType'],'itemId'=>$P['itemId'],'itemSzId'=>$P['itemSzId']);
	if($Di['updateType']=='defineCost'){
		$Di['userExec']=a_ses::$userId;
		$Di['isExec']='Y'; $Di['dateExec']=date('Y-m-d H:i:s');
	}
	$Di['vari1']=$P['vari1']; $P['itemSzId']*=1;
	$Di['lineMemo']=$P['lineMemo']; $Di['dateC']=date('Y-m-d H:i:s');
	return a_sql::insert($Di,array('table'=>'itm_log2','userId'=>a_ses::$userId,'wh_change'=>'WHERE updateType=\''.$P['updateType'].'\' AND itemId=\''.$P['itemId'].'\' AND itemSzId=\''.$P['itemSzId'].'\' AND isExec=\'N\' LIMIT 1'));
}
static public function put_oipc($P=array()){
	$q=a_sql::query('SELECT A.itemId,B.itemSzId FROM '._0s::$Tb['itm_oitm'].' A JOIN '._0s::$Tb['itm_grs2'].' B ON (B.grsId=A.grsId) WHERE A.itemId=\''.$P['itemId'].'\' LIMIT 100',array(1=>'Error obteniendo tallas del artículo para actualizar tabla de costos: ',2=>'No se encontraron tallas definidas para actualizar tabla de costos:'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{
		$Di=array('itemId'=>$P['itemId'],'dateUpd'=>date('Y-m-d H:i:s'),'lastUpdFrom'=>$P['updFrom']);
		if($P['updFrom']=='formData'){
			foreach($P['u'] as $k=>$v){ $Di[$k]=$v; }
		}
		a_sql::$DB->begin_transaction();
		while($L=$q->fetch_assoc()){ $Di['itemSzId']=$L['itemSzId'];
			$ins=a_sql::insert($Di,array('table'=>'itm_oipc','wh_change'=>'WHERE itemId=\''.$L['itemId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1'));
		}
		a_sql::$DB->commit();
	}
	return $js;
}
static public function get_oipc($P=array()){
	if(a_sql::$errNoText=$js=_js::ise($P['itemId'],'ID de artículo no definido para obtener de wma_oipc.')){ a_sql::$err=true; return $js; }
	$fie=($P['fie'])?','.$P['fie']:''; unset($P['fie']);
	$q=a_sql::query('SELECT PC.itemSzId,PC.buyPrice,PC.cost,I.buyItem,I.prdItem'.$fie.' FROM itm_oipc PC JOIN itm_oitm I ON (I.itemId=PC.itemId) WHERE PC.itemId=\''.$P['itemId'].'\' LIMIT 100',array(1=>'Error obteniendo información de tabla wma_oipc: '));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if(_0s::$eSoc['require_oipc_onPvt']=='Y' && a_sql::$errNo==2){ a_sql::$err=true; return a_sql::$errNoText=_js::e(3,'No se encontró información de tabla de costos wma_oipc.'); }
	else{ $M=array();
		if(a_sql::$errNo==-1) while($L=$q->fetch_assoc()){
			$k=$L['itemSzId']; unset($L['itemSzId']);
			$L['defineCost']=($L['prdItem']=='Y')?$L['cost']:$L['buyPrice'];
			$M[$k]=$L;
		}
	}
	return $M;
}

static public function get_itemIdSize($D=array()){
	$q1=a_sql::fetch('SELECT itemId FROM '._0s::$Tb['itm_oitm'].' WHERE itemCode=\''.$D['itemCode'].'\' LIMIT 1',array(1=>$lnt.'Error obteniendo artículo',2=>$lnt.'El artículo '.$D['itemCode'].' no existe'));
	if(a_sql::$err){ return false; }
	else{
		$q2=a_sql::fetch('SELECT itemSzId FROM '._0s::$Tb['itm_grs1'].' WHERE ocardId=\''.a_ses::$ocardId.'\' AND itemSize=\''.$D['itemSize'].'\' LIMIT 1',array(1=>$lnt.'Error obteniendo talla',2=>$lnt.'La talla '.$D['itemSize'].' no existe'));
		if(a_sql::$err){ return false; }
	}
	return array('itemId'=>$q1['itemId'],'itemSzId'=>$q2['itemSzId']);
}
static public function exist_itemSize($D=array()){
	$q2=a_sql::fetch('SELECT itemSzId FROM '._0s::$Tb['itm_grs1'].' WHERE ocardId=\''.a_ses::$ocardId.'\' AND itemSize=\''.$D['itemSzId'].'\' LIMIT 1',array(1=>$lnt.'Error obteniendo talla',2=>$lnt.'La talla '.$D['itemSzId'].' no existe'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{ return false; }
}
}
?>