<?php
JRoute::get('ivt/bitWhs',function($D){
	_ADMS::lib('sql/filter');
	$DCom=[];
	$DCom['I.itemCode(E_in)']=$_GET['itemCode'];
	$DCom['I.itemName(E_like3)']=$_GET['itemName'];
	$DCom['GS2.itemSzId(E_in)']=$_GET['itemSzId'];
	unset($_GET['itemCode'],$_GET['itemName'],$_GET['itemSzId']);
	$whCom=a_sql_filter($DCom);
	$gby='WH.bId,I.itemCode,I.itemName,I.batDays,BI.itemSzId,WH.whsId,BI.manDate,BI.manCode,BI.dueDate,C.cardName';
	$whBodega=($_GET['whsId'])
	?'AND WH.whsId=\''.$_GET['whsId'].'\' '
	:'';
	$viewType2=($_GET['viewType2'])?$_GET['viewType2']:'all';
	if($_GET['__dbReportLen']=='full'){ a_sql::$limitFull='Y'; }
	unset($_GET['viewType'],$_GET['viewType2'],$_GET['__dbReportLen'],$_GET['grTypeId'],$_GET['whsId)']);
	$whAd='';
	switch($viewType2){
		case 'S': $whAd .= ' AND WH.onHand>0'; break;
		case 'Z': $whAd .= ' AND WH.onHand=0'; break;
		case 'N': $whAd .= ' AND WH.onHand<0'; break;
		case 'A':  break;
	}
	$wh=$whCom.' '.a_sql_filter($_GET).$whAd;
	$qry='SELECT '.$gby.',SUM(WH.onHand) onHand
	FROM ivt_obiw WH
	JOIN ivt_obit BI ON (BI.bId=WH.bId)
	JOIN itm_oitm I ON (I.itemId=BI.itemId)
	LEFT JOIN par_ocrd C ON (C.cardId=BI.cardId)
	'.$bc_left.'
	WHERE 1 '.$wh.' GROUP BY '.$gby.' '.a_sql::nextLimit();
	$q=a_sql::query($qry,array(1=>'Error obteniendo información de inventario.',2=>'No se encontraron resultados.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		$ks=array(); $n=-1; $kst=array();
		while($L=$q->fetch_assoc()){
			$Mx['L'][]= $L;
		}
		$js=_js::enc2($Mx); unset($Mx);
	}
	return $js;
});
JRoute::get('ivt/bitWhs/history',function($D){
	if($js=_js::ise($D['whsId'],'Se debe definir la bodega para el histórico.')){ return $js; }
	else{
		_ADMS::lib('iDoc');
		_ADMS::lib('sql/filter');
		$D['fromA']='BI.bId,A.tt,A.tr,I.itemCode,I.itemName,BI.itemSzId,A.inQty,A.outQty,A.onHandAt, A.docDate
		FROM ivt_bwtr A
		JOIN ivt_obit BI ON (BI.bId=A.bId)
		JOIN itm_oitm I ON (I.itemId=BI.itemId)
';
		$D['orderByDef']='A.id DESC';
		return iDoc::get($D);
	}
});
?>