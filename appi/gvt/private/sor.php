<?php
JRoute::get('gvt/sor',function($D){
	_ADMS::lib('iDoc');
	if(!_js::ise($D['ref1'])){ $D['A.ref1(E_igual)']=$D['ref1']; }
	unset($D['ref1']);
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.dueDate,A.docTotal,A.curr,A.docTotalME,A.slpId,A.userId,A.ref1,A.whsId,A.dateC,A.dlvStatus,A.financeStatus
	FROM gvt_osor A';
	return iDoc::get($D,array('perms'=>'slps'));
});

JRoute::get('gvt/sor/view','getOne');
JRoute::get('gvt/sor/toCopy','toCopy');
JRoute::get('gvt/sor/openQty','getOpenQty');
JRoute::get('gvt/sor/form','getOne');
JRoute::get('gvt/sor/tb99','logGet');
JRoute::get('gvt/sor/tbRel1','logRel1');

JRoute::post('gvt/sor','post');
JRoute::put('gvt/sor','put');
JRoute::put('gvt/sor/statusSend','putStatusSend');
JRoute::put('gvt/sor/statusOpen','putStatusOpen');
JRoute::put('gvt/sor/whsAssg','whsAssg');
JRoute::put('gvt/sor/statusClose','putStatusClose');
JRoute::put('gvt/sor/statusCancel','putStatusCancel');

//JRoute::put('gvt/sor/statusDraw','putStatusDraw',['hashKey'=>'gvtSor.statusDraw']);
//JRoute::put('gvt/sor/financeStatus','putFinanceStatus',['hashKey'=>'gvtSor.financeStatus']);
?>
