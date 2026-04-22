<?php
JRoute::get('gvt/rep/sor',function($D){
	_ADMS::lib('sql/filter');
	$vt=$D['viewType']; unset($D['viewType']);
	$whB='A.canceled=\'N\'';
	if($vt=='CC'){
		$gb='A.cardName,I.itemCode,I.itemName,B.itemSzId,A.whsId';
		$query='SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.openQty) openQty
		FROM gvt_osor A
		JOIN gvt_sor1 B ON (B.docEntry=A.docEntry)
	JOIN itm_oitm I ON (I.itemId=B.itemId)
		WHERE '.$whB.' '.a_sql_filtByT($D).' GROUP BY '.$gb;
	}
	else if($vt=='C'){
		$gb='I.itemCode,I.itemName,B.itemSzId,A.whsId';
		$query='SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.openQty) openQty
		FROM gvt_osor A
		JOIN gvt_sor1 B ON (B.docEntry=A.docEntry)
	JOIN itm_oitm I ON (I.itemId=B.itemId)
		WHERE '.$whB.' '.a_sql_filtByT($D).' GROUP BY '.$gb;
	}
	else{
		$query='SELECT A.docEntry,A.docNum,A.cardId,A.cardName,A.docDate,A.dueDate,B.itemId,B.itemSzId,B.quantity,B.openQty,I.itemCode,I.itemName,A.whsId
		FROM gvt_osor A
		JOIN gvt_sor1 B ON (B.docEntry=A.docEntry)
		JOIN itm_oitm I ON (I.itemId=B.itemId)
		WHERE '.$whB.' '.a_sql_filtByT($D);
	}
	return a_sql::fetchL($query,
	['k'=>'L','D'=>['_view'=>$vt]],true);
},[]);
JRoute::get('gvt/rep/sin',function($D){
	_ADMS::lib('sql/filter,_2d');
	$Ra=_2d::viewRang('A.docDate',$D);
	$fie=''; $gb='';
	$vt=$D['viewType'];
	$docsView=$D['docsView'];
	unset($D['viewType'],$D['docsView']);
	$whFilt= $Ra['wh'];
	$whB='A.canceled=\'N\' ';
	$qInv='';
	if($docsView=='FN'){
		$qInv ='SELECT A.docDate,\'FV\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_oinv A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt.'
		UNION
		SELECT A.docDate,\'NC\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_osnc A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt.'
		UNION
		SELECT A.docDate,\'ND\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_osnd A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt.'
		ORDER BY docDate ASC';
		$whB .= 'AND A.tt IN(\'gvtSin\',\'gvtSnc\',\'gvtSnd\') AND A.lineType IN(\'FV\',\'NC\',\'ND\')';
	}
	else{
		$qInv ='SELECT A.docDate,\'FV\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_oinv A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt;
		$whB .= 'AND A.tt IN(\'gvtSin\') AND A.lineType IN(\'FV\')';
	}
	$whInv='A.canceled=\'N\'';
	$whInv .= $whFilt;
	$whB .= $whFilt;
	if($vt=='G'){
		$query='SELECT SUM(A.debBal) docTotal,SUM(A.debBalDue) balDue
		FROM gfi_dac1 A
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB;
	}
	else if($vt=='D'){
		$gb='A.docDate';
		$query='SELECT '.$gb.',SUM(A.debBal) docTotal,SUM(A.debBalDue) balDue
		FROM gfi_dac1 A
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB.' GROUP BY '.$gb;
	}
	else if($vt=='C'){
		$gb='A.cardId,C.cardName';
		$query='SELECT '.$gb.',SUM(A.debBal) docTotal,SUM(A.debBalDue) balDue
		FROM gfi_dac1 A
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB.' GROUP BY '.$gb;
	}
	else if($vt=='CD'){
		$gb='A.cardId,C.cardName,A.docDate';
		$query='SELECT '.$gb.',SUM(A.debBal) docTotal,SUM(A.debBalDue) balDue
		FROM gfi_dac1 A
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB.' GROUP BY '.$gb;
	}
	else if($vt=='I'){
		$gb='I.itemCode,I.itemName,B.itemSzId';
		$query='SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.priceLine) priceLine
		FROM gvt_oinv A
		JOIN gvt_inv1 B ON (B.docEntry=A.docEntry)
		JOIN itm_oitm I ON (I.itemId=B.itemId)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whInv.' GROUP BY '.$gb;
	}
	else if($vt=='IC'){
		$gb='I.itemCode,I.itemName,B.itemSzId,A.cardId,C.cardName';
		$query='SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.priceLine) priceLine
		FROM gvt_oinv A
		JOIN gvt_inv1 B ON (B.docEntry=A.docEntry)
		JOIN itm_oitm I ON (I.itemId=B.itemId)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whInv.' GROUP BY '.$gb;
	}
	else if($vt=='DO'){
		$gb='A.serieId,A.docNum,C.licTradNum,A.cardName,A.slpId,A.docDate,A.dueDate,A.docTotal,A.balDue,A.pymId,I.itemCode,I.itemName,B.itemSzId,B.quantity,I.udm,B.price,B.priceLine,B.lineText,A.address,A.countyCode,A.cityCode,A.phone1,A.email,A.lineMemo,B.priceList,B.disc,B.discSum,B.grossTotal';
		$query='SELECT '.$gb.'
		FROM gvt_oinv A
		JOIN gvt_inv1 B ON (B.docEntry=A.docEntry)
		JOIN itm_oitm I ON (I.itemId=B.itemId)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whInv.' '.a_sql_filter($D['wh']);
	}
	else{
		$query=$qInv;
	}
	return a_sql::fetchL($query,
	['k'=>'L','D'=>['_view'=>$vt]],true);
},[]);
JRoute::get('gvt/rep/renta',function($D){
	_ADMS::lib('sql/filter,_2d');
	$Ra=_2d::viewRang('A.docDate',$D);
	$fie=$Ra['fie']; $gb=$Ra['gb'];
	$leff='';
	$sumas='SUM(A.docTotal) docTotal,SUM(A.vatSum) vatSum, SUM(A.rteSum) rteSum ,SUM(A.baseAmnt) baseAmnt,SUM(B.grossTotal) grossTotal';
	if($D['viewType']=='G'){ }
	else if($D['viewType']=='C'){ $fie='A.cardName'; $gb='A.cardName'; }
	else if($D['viewType']=='V'){ $fie='A.slpId'; $gb='A.slpId'; }
	else if($D['viewType']=='I'){
		$fie='B.itemId,B.itemSzId,I.itemName'; $gb='B.itemId,B.itemSzId,I.itemName';
		$leff='JOIN itm_oitm I ON (I.itemId=B.itemId)';
		$sumas='SUM(B.lineTotal) baseAmnt,SUM(B.grossTotal) grossTotal';
	}
	$q=a_sql::query('SELECT '.$fie.','.$sumas.'
	FROM gvt_oinv A 
	JOIN gvt_inv1 B ON (B.docEntry=A.docEntry)
	'.$leff.'
	WHERE A.canceled=\'N\' '.$Ra['wh'].' '.$wh.' GROUP BY '.$gb,[1=>'Error obteniendo resultados']);
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){ 
		while($L=$q->fetch_assoc()){
			$M['L'][]=$L;
		}
	}
	_err::errDie();
	$M['_view']=$D['viewType'];
	$M['_viewRang']=$D['viewRang'];
	return _js::enc2($M);
},[]);

JRoute::get('gvt/rep/gerence',function($D){
	_ADMS::lib('sql/filter');
	if($D['viewType']=='M'){
		$M=['_view'=>$D['viewType'],
		'L'=>[],
		];
		$whDate='AND (A.docDate>=\''.$D['year2'].'-'.$D['month1'].'-01\' AND A.docDate<=\''.date('Y-m-t',strtotime($D['year2'].'-'.$D['month2'].'-28')).'\')';
		$q=a_sql::query('SELECT SUBSTR(A.docDate,1,7) period,SUM(A.docTotal) docTotal,SUM(A.vatSum) vatSum, SUM(A.rteSum) rteSum ,SUM(A.baseAmnt) baseAmnt,SUM(B.grossTotal) grossTotal
		FROM gvt_oinv A 
		JOIN gvt_inv1 B ON (B.docEntry=A.docEntry)
		WHERE A.canceled=\'N\' '.$whDate.' GROUP BY SUBSTR(A.docDate,1,7)',[1=>'Error obteniendo facturacion por mes']);
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1){ 
			while($L=$q->fetch_assoc()){
				$M['L'][]=$L;
			}
		}
	}
	else{
		$M=['_view'=>$D['viewType'],
		'inv'=>['docTotal'=>0,'vatTotal'=>0,'grossTotal'=>0,'L'=>[]],
		'ing'=>0,
		'egr'=>0,
		'accL'=>[]
		];
		$whDate='AND (A.docDate>=\''.$D['date1'].'\' AND A.docDate<=\''.$D['date2'].'\')';
		$q=a_sql::query('SELECT A.pymId,SUM(B.grossTotal) grossTotal ,SUM(A.baseAmnt) baseAmnt,SUM(A.vatSum) vatSum, SUM(A.rteSum) rteSum,SUM(A.docTotal) docTotal
		FROM gvt_oinv A 
		JOIN gvt_inv1 B ON (B.docEntry=A.docEntry)
		WHERE A.canceled=\'N\' '.$whDate.' GROUP BY A.pymId',[1=>'Error obteniendo facturacion total']);
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1){ 
			while($L=$q->fetch_assoc()){
				$M['inv']['docTotal'] +=$L['docTotal'];
				$M['inv']['baseAmnt'] +=$L['baseAmnt'];
				$M['inv']['vatSum'] +=$L['vatSum'];
				$M['inv']['rteSum'] +=$L['rteSum'];
				$M['inv']['grossTotal'] +=$L['grossTotal'];
				$M['inv']['L'][]=$L;
			}
		}
		if(!_err::$err){ //ingresos
			$gb='AC.accId,AC.accName';
			$q=a_sql::query('SELECT '.$gb.',SUM(B.creBal) creBal 
			FROM gvt_orcv A JOIN gvt_rcv1 B ON (B.docEntry=A.docEntry)
			LEFT JOIN gfi_opdc AC ON (AC.accId=B.accId)
			WHERE A.canceled=\'N\' '.$whDate.' GROUP BY '.$gb,[1=>'Error obteniendo ingresos totales']);
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			else if(a_sql::$errNo==-1){
				while($L=$q->fetch_assoc()){
					$M['ing'] +=$L['creBal'];
					$k=$L['accId']; $L['debBal']=0;
					if(!$M['accL'][$k]){ $M['accL'][$k]=$L; }
					else{ $M['accL'][$k]['creBal'] +=$L['creBal']; }
				}
			}
		}
		if(!_err::$err){ //egresos
			$gb='AC.accId,AC.accName';
			$q=a_sql::query('SELECT '.$gb.',SUM(B.debBal) debBal 
			FROM gvt_orce A JOIN gvt_rce1 B ON (B.docEntry=A.docEntry)
			LEFT JOIN gfi_opdc AC ON (AC.accId=B.accId)
			WHERE A.canceled=\'N\' '.$whDate.' GROUP BY '.$gb,[1=>'Error obteniendo egresos totales']);
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			else if(a_sql::$errNo==-1){ 
				while($L=$q->fetch_assoc()){
					$M['egr'] +=$L['debBal'];
					$k=$L['accId']; $L['creBal']=0;
					if(!$M['accL'][$k]){ $M['accL'][$k]=$L; }
					else{ $M['accL'][$k]['debBal'] +=$L['debBal']; }
				}
			}
		}
	}
	_err::errDie();
	return _js::enc2($M);
},[]);

JRoute::get('gvt/rep/pin',function($D){
	_ADMS::lib('sql/filter,_2d');
	$Ra=_2d::viewRang('A.docDate',$D);
	$fie=''; $gb='';
	$vt=$D['viewType'];
	$docsView=$D['docsView'];
	unset($D['viewType'],$D['docsView'],$D['viewRang'],$D['date1'],$D['date2'],$D['month1'],$D['month2'],$D['year2']);
	$whFilt= $Ra['wh'];
	$whB='A.canceled=\'N\' ';
	$qInv='';
	if($docsView=='FN'){
		$qInv ='SELECT A.docDate,\'FC\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_opin A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt.'
		UNION
		SELECT A.docDate,\'NC\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_opnc A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt.'
		UNION
		SELECT A.docDate,\'ND\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_opnd A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt.'
		ORDER BY docDate ASC';
		$whB .= 'AND A.tt IN(\'gvtPin\',\'gvtPnc\',\'gvtPnd\') AND A.lineType IN(\'FC\',\'NC\',\'ND\')';
	}
	else{
		$qInv ='SELECT A.docDate,\'FC\' lineType,A.docEntry,A.docNum,C.cardId,C.cardName,A.dueDate,A.slpId,A.docTotal,A.balDue,C.cardName FROM gvt_opin A JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE 1 '.$whFilt;
		$whB .= 'AND A.tt IN(\'gvtPin\') AND A.lineType IN(\'FC\')';
	}
	$whInv='A.canceled=\'N\' '.a_sql_filter($D).' ';
	$whInv .= $whFilt;
	$whB .= $whFilt;
	if($vt=='G'){
		$gb='I.itemCode,I.itemName,B.itemSzId';
		$query='SELECT A.serieId,A.docNum,A.docDate,A.dueDate,C.cardName,I.itemCode,I.itemName,B.itemSzId,I.udm,B.quantity,B.price,B.priceLine
		FROM gvt_opin A
		JOIN gvt_pin1 B ON (B.docEntry=A.docEntry)
		JOIN itm_oitm I ON (I.itemId=B.itemId)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whInv;
	}
	else if($vt=='D'){
		$gb='A.docDate';
		$query='SELECT '.$gb.',SUM(A.creBal) docTotal,SUM(A.creBalDue) balDue
		FROM gfi_dac1 A
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB.' GROUP BY '.$gb;
	}
	else if($vt=='C'){
		$gb='A.cardId,C.cardName';
		$query='SELECT '.$gb.',SUM(A.creBal) docTotal,SUM(A.creBalDue) balDue
		FROM gfi_dac1 A
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB.' GROUP BY '.$gb;
	}
	else if($vt=='CD'){
		$gb='A.cardId,C.cardName,A.docDate';
		$query='SELECT '.$gb.',SUM(A.creBal) docTotal,SUM(A.creBalDue) balDue
		FROM gfi_dac1 A
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB.' GROUP BY '.$gb;
	}
	else if($vt=='I'){
		$gb='I.itemCode,I.itemName,B.itemSzId,I.udm';
		$query='SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.priceLine) priceLine
		FROM gvt_opin A
		JOIN gvt_pin1 B ON (B.docEntry=A.docEntry)
		JOIN itm_oitm I ON (I.itemId=B.itemId)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whInv.' GROUP BY '.$gb;
	}
	else{
		$query=$qInv;
	}
	return a_sql::fetchL($query,
	['k'=>'L','D'=>['_view'=>$vt]],true);
},[]);
?>