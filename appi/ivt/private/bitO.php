<?php
JRoute::get('ivt/bitO',function($D){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docDate,A.docStatus,A.canceled,A.docClass,A.lineMemo,A.userId,A.dateC,A.docType,A.ref1,A.ref2,A.whsId
	FROM ivt_obdo A
	'.$Px['l'];
	return iDoc::get($D);
});
JRoute::get('ivt/bitO/view',function($D){
	_ADMS::lib('docSeries,iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'A.* 
	FROM ivt_obdo A ',
	'fromB'=>'I.itemCode, I.itemName,I.udm, C.cardName, B.* 
	FROM ivt_obit B 
	LEFT JOIN par_ocrd C ON (C.cardId=B.cardId)
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
});

JRoute::post('ivt/bitO','post');
JRoute::put('ivt/bitO/statusCancel','statusCancel');


JRoute::get('ivt/bitO/tb99','logGet');
JRoute::get('ivt/bitO/tbRel1','logRel1');

JRoute::get('ivt/bitO/getList','getList');
JRoute::put('ivt/bitO/lock','lock');

?>