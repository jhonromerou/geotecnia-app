<?php
JRoute::get('ivt/bitRep/down',function($D){
	_ADMS::lib('sql/filter');
	$vt=$D['viewType']; unset($D['viewType']);
	$whB='1';
	if($vt=='GN'){
		$query='SELECT A.docDate,A.docNum,B.bId,I.itemCode,I.itemName,BI.itemId,BI.itemSzId,A.whsId,B.lineType,B.quantity quantity
		FROM ivt_obdd A
    JOIN ivt_bdd1 B ON (B.docEntry=A.docEntry)
    JOIN ivt_obit BI ON (BI.bId=B.bId)
    JOIN itm_oitm I ON (I.itemId=BI.itemId)
		WHERE '.$whB.' '.a_sql_filtByT($D).'';
  }
	return a_sql::fetchL($query,
	['k'=>'L','D'=>['_view'=>$vt]],true);
},[]);
?>