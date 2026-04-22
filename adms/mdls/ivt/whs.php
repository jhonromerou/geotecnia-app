<?php
if(_0s::$router=='GET whs'){
	_ADMS::_lb('sql/filter');
	$DCom=[];
	$DCom['I.itemCode(E_in)']=$_GET['itemCode'];
	$DCom['I.itemName(E_like3)']=$_GET['itemName'];
	$DCom['GS2.itemSzId(E_in)']=$_GET['itemSzId'];
	unset($_GET['itemCode'],$_GET['itemName'],$_GET['itemSzId']);
	$whCom=a_sql_filtByT($DCom);
	$gby='I.itemId,I.itemCode,I.itemName,I.udm,GS2.itemSzId,W.whsId';
	$whBodega=($_GET['whs1_whsId(E_in)'])
	?'AND whs1.whsId=\''.$_GET['whs1_whsId(E_in)'].'\' '
	:'';
	unset($_GET['whs1_whsId(E_in)']);
	$grTypeId=(_js::ise($_GET['grTypeId']))?false:$_GET['grTypeId'];
	$viewType2=($_GET['viewType2'])?$_GET['viewType2']:'all';
	if($_GET['reportLen']=='full'){ a_sql::$limitFull='Y'; }
	unset($_GET['viewType'],$_GET['viewType2'],$_GET['reportLen'],$_GET['grTypeId']);
	$whAd='';
	switch($viewType2){
		case 'P': $whAd .= ' AND whs1.onHand>0'; break;
		case 'N': $whAd .= ' AND whs1.onHand<0'; break;
		case '0': $whAd .= ' AND whs1.onHand=0'; break;
	}
	$gby .=($grTypeId)?',BC.barCode':'';
	$bc_left=($grTypeId)
	?'LEFT JOIN itm_bar1 BC ON (BC.itemId=I.itemId AND BC.itemSzId=GS2.itemSzId AND BC.grTypeId=\''.$grTypeId.'\')'
	:'';
	$wh=$whCom.' '.a_sql_filtByT($_GET).$whAd;
	$qry='SELECT '.$gby.',whs1.onHand, whs1.isCommited, whs1.onOrder,whs1.minStock,whs1.maxStock,whs1.reorder
	FROM itm_oitm I
	LEFT JOIN itm_grs2 GS2 ON (GS2.grsId=I.grsId)
	LEFT JOIN ivt_oitw whs1 ON (whs1.itemId=I.itemId AND whs1.itemSzId=GS2.itemSzId '.$whBodega.')
	LEFT JOIN ivt_owhs W ON (W.whsId=whs1.whsId)
	'.$bc_left.'
	WHERE I.handInv=\'Y\' '.$wh.'  '.a_sql::nextLimit();
	$q=a_sql::query($qry,array(1=>'Error obteniendo información de inventario.',2=>'No se encontraron resultados.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $Mx=array('T'=>array(),'L'=>array());
		$ks=array(); $n=-1; $kst=array();
		while($L=$q->fetch_assoc()){
			if($L['onHand']==null){ $L['onHand']=0; }
			if($L['isCommited']==null){ $L['isCommited']=0; }
			if($L['onOrder']==null){ $L['onOrder']=0; }
			$Mx['L'][]= $L;
		}
		$js=_js::enc($Mx,'NO_PAGER'); unset($Mx);
	}
	echo $js;
}
else if(_0s::$router=='GET whs/history'){
	if($js=_js::ise($_GET['A_whsId(E_igual)'],'Se debe definir la bodega para el histórico.')){ echo $js; }
	else{
			_ADMS::lib('iDoc');
			_ADMS::_lb('sql/filter');
		$_GET['fromA']='A.tt,A.tr,I.itemCode,I.itemName,A.itemId,A.itemSzId,A.inQty,A.outQty,A.onHandAt, A.docDate
	FROM ivt_wtr1 A
	JOIN itm_oitm I ON (I.itemId=A.itemId)';
	$_GET['orderByDef']='A.id DESC';
		echo iDoc::get($_GET);
	}
}
else if(_0s::$router=='GET whs/withPeP'){
	_ADMS::_lb('sql/filter');
	$DCom=[];
	$DCom['I.itemCode(E_in)']=$_GET['itemCode'];
	$DCom['I.itemName(E_like3)']=$_GET['itemName'];
	$DCom['whs1.itemSzId(E_in)']=$_GET['itemSzId'];
	unset($_GET['itemCode'],$_GET['itemName'],$_GET['itemSzId']);
	$whCom=a_sql_filtByT($DCom);
	$gby='I.itemId,I.itemCode,I.itemName';
	$whBodega=($_GET['whs1_whsId(E_in)'])
	?'AND whs1.whsId=\''.$_GET['whs1_whsId(E_in)'].'\' '
	:'';
	unset($_GET['whs1_whsId(E_in)']);
	$grTypeId=(_js::ise($_GET['grTypeId']))?false:$_GET['grTypeId'];
	$viewType=($_GET['viewType'])?$_GET['viewType']:'general';
	$viewType2=($_GET['viewType2'])?$_GET['viewType2']:'all';
	$wh_left='';
	if($_GET['reportLen']=='full'){ a_sql::$limitFull='Y'; }
	unset($_GET['viewType'],$_GET['viewType2'],$_GET['reportLen'],$_GET['grTypeId']);
	$gby .=',W.whsId,GS2.itemSzId';
	$wh_left='LEFT JOIN ivt_owhs W ON (W.whsId=whs1.whsId)';
	$whAd='';
	switch($viewType2){
		case 'positive': $whAd .= ' AND whs1.onHand>0'; break;
		case 'negative': $whAd .= ' AND whs1.onHand<0'; break;
	}
	$gby .=($grTypeId)?',BC.barCode':'';
	$bc_left=($grTypeId)
	?'LEFT JOIN itm_bar1 BC ON (BC.itemId=I.itemId AND BC.itemSzId=GS2.itemSzId AND BC.grTypeId=\''.$grTypeId.'\')'
	:'';
	$wh=$whCom.' '.a_sql_filtByT($_GET).$whAd;
	$qry='SELECT '.$gby.',SUM(whs1.onHand) onHand, SUM(whs1.isCommited) isCommited, SUM(whs1.onOrder) onOrder 
FROM itm_oitm I
LEFT JOIN itm_grs2 GS2 ON (GS2.grsId=I.grsId)
LEFT JOIN ivt_oitw whs1 ON (whs1.itemId=I.itemId AND whs1.itemSzId=GS2.itemSzId '.$whBodega.')
'.$bc_left.'
'.$wh_left.'
WHERE I.handInv=\'Y\' AND I.prdItem=\'Y\' '.$wh.' GROUP BY '.$gby.' '.a_sql::nextLimit();
	$q=a_sql::query($qry,array(1=>'Error obteniendo información de inventario.',2=>'No se encontraron resultados.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $Mx=array('viewType'=>$viewType,'T'=>array(),'L'=>array(),'L2'=>[]);
		$ks=array(); $n=-1; $kst=array();
		while($L=$q->fetch_assoc()){
			$k=($viewType!='general')?$L['itemCode'].'_'.$L['whsId']:$L['itemCode'];
			if($L['onHand']==null){ $L['onHand']=0; }
			if($L['isCommited']==null){ $L['isCommited']=0; }
			if($L['onOrder']==null){ $L['onOrder']=0; }
			$Mx['L'][]= $L;
		}
		$gby='whs1.itemId,whs1.itemSzId,whs1.whsId';
		$q=a_sql::query('SELECT '.$gby.',SUM(whs1.onHand) onHand
		FROM pep_oitw whs1
		JOIN itm_oitm I ON (I.itemId=whs1.itemId)
		LEFT JOIN wma_owfa WFA ON (WFA.wfaId=whs1.wfaId) 
		WHERE WFA.wfaClass=\'N\' '.$whCom.' GROUP BY '.$gby,
		[1=>'Error obteniendo información de inventario.',2=>'No se encontraron resultados.']);
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else while($L=$q->fetch_assoc()){ 
			$Mx['L2'][$L['itemId'].'-'.$L['itemSzId'].'-'.$L['whsId']]=$L;
		}
		$js=_js::enc2($Mx);
	}
	echo $js;
}
?>