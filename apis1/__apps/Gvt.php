<?php
class Gvt extends _err{
static public function sellOrd_openQty($D=array()){
	if($js=_js::ise($D['docEntry'],'No se ha definido el número del documento #'.$D['docEntry'].'.')){ return json_decode($js,1); }
	$gb='B.itemId,B.itemSzId,I.itemCode,G1.itemSize,I.itemName';
	$q=a_sql::query('SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.openQty) openQty 
	FROM gvt_pvt1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId) 
	LEFT JOIN itm_grs1 G1 ON (G1.itemSzId=B.itemSzId) 
	WHERE B.docEntry=\''.$D['docEntry'].'\' AND B.openQty>0 GROUP BY '.$gb.'',array(1=>'Error obteniendo cantidades pendientes: ',2=>'No hay unidades pendientes para este documento #'.$D['docEntry'].'.'));
	if(a_sql::$err){ $Mx=json_decode(a_sql::$errNoText,1); }
	else{$Mx=array('T'=>array(),'L'=>array()); $K=array(); $n=-1;
		while($L=$q->fetch_assoc()){
			$k=$L['itemCode']; $ta=$L['itemSzId'];
			$Mx['T'][$ta]=$L['itemSize'];
			if(!array_key_exists($k,$K)){ $n++;
				$L['T']=array();
				$Mx['L'][$n]=$L;
			}
			if(!array_key_exists($ta,$Mx['L'][$n]['T'])){
				$Mx['L'][$n]['T'][$ta]=array('o'=>0,'c'=>0);
			}
			$Mx['L'][$n]['T'][$ta]['o'] +=$L['openQty'];
			$K[$k]=$k;
		}
	}
	return $Mx;
}
static public function pvt_set1($P=array()){
	_err::i();
	$upd=a_sql::query('UPDATE '._0s::$Tb['gvt_pvt1'].' SET '.$P['set'].' WHERE docEntry=\''.$P['docEntry'].'\' AND itemId=\''.$P['itemId'].'\' AND itemSzId=\''.$P['itemSzId'].'\' LIMIT 1',array(1=>$ln.'Error actualizando pendientes del pedido: '));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	return true;
}
static public function pvt_cartStatus($P=array(),$_D=array()){
	if($P['qd']){ $qd=$P['qd']; }
	else{
	$qd=a_sql::fetch('SELECT curr,rate,discDef,discPf,slpId,cartStatus FROM gvt_opvt WHERE docEntry=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información del pedido relacionado #'.$P['docEntry'].': ',2=>'No se encontró el pedido relacionado #'.$P['docEntry'].'.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
	}
	if($qd['cartStatus']=='L'){ _err::err('El pedido se encuentra Bloqueado en cartera.',3); }
	else if($qd['cartStatus']=='R'){ _err::err('El pedido se encuentra en Revisión de cartera.',3); }
	else if($qd['cartStatus']=='V'){ _err::err('Comuniquese con cartera para conocer más detalles.',3); }
	else if($qd['cartStatus']!='P' && $qd['cartStatus']!='O'){ _err::err('El pedido no está autorizado. status='.$qd['cartStatus'].'.',3);}
	else{ unset($qd['cartStatus']);
		foreach($qd as $k=>$v){ $_D[$k]=$v; }
		return $_D;
	}
}
static public function sellOrd_openQty__v3($D=array()){
	if($js=_js::ise($D['docEntry'],'No se ha definido el número del documento #'.$D['docEntry'].'.')){ return json_decode($js,1); }
	$gb='B.itemId,B.itemSzId,I.itemCode,I.itemSize,I.itemName';
	$q=a_sql::query('SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.openQty) openQty FROM '._0s::$Tb['gvt_pvt1'].' B LEFT JOIN '._0s::$Tb['_itm_its1'].' I ON (I.itemId=B.itemId AND I.itemSzId=B.itemSzId) WHERE B.docEntry=\''.$D['docEntry'].'\' AND B.openQty>0 GROUP BY '.$gb.'',array(1=>'Error obteniendo cantidades pendientes: ',2=>'No hay unidades pendientes para este documento #'.$D['docEntry'].'.'));
	if(a_sql::$err){ $Mx=json_decode(a_sql::$errNoText,1); }
	else{$Mx=array('T'=>array(),'L'=>array()); $K=array(); $n=-1;
		while($L=$q->fetch_assoc()){
			$k=$L['itemCode']; $ta=$L['itemSzId'];
			$Mx['T'][$L['itemSize']]=$L['itemSize'];
			if(!array_key_exists($k,$K)){ $n++;
				$L['T']=array();
				$Mx['L'][$n]=$L;
			}
			if(!array_key_exists($ta,$Mx['L'][$n]['T'])){
				$Mx['L'][$n]['T'][$ta]=array('o'=>0,'c'=>0);
			}
			$Mx['L'][$n]['T'][$ta]['o'] +=$L['openQty'];
			$K[$k]=$k;
		}
	}
	return $Mx;
}

}

?>