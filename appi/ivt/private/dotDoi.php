<?php
JRoute::get('ivt/dotDoi',function($D){
	$Px=fOCP::fg('owsu',['in'=>'C.workSede'],'nomBase');
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docDate,A.docStatus,A.canceled,A.docClass,A.lineMemo,A.userId,A.dateC,A.docType,A.ref1,A.ref2,A.whsId,A.cardId,A.cardName
	FROM ivt_odoi A
	LEFT JOIN nom_ocrd C ON (C.cardId=A.cardId)
	'.$Px['l'];
	return iDoc::get($D);
});
JRoute::get('ivt/dotDoi/tb99',function($D){
	_ADMS::libC('ivt','ing');
	ivtIng::setTbk(['serie'=>'ivtDotDoi']);
	return ivtIng::logGet($D);
});
JRoute::get('ivt/dotDoi/view',function($D){
	_ADMS::lib('docSeries,iDoc');
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.licTradType,C.licTradNum,A.* 
	FROM ivt_odoi A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.udm, B.* FROM ivt_doi1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
});

JRoute::post('ivt/dotDoi',function($D){
	if(_js::iseErr($D['whsId'],'Se debe definir la bodega','numeric>0')){ return _err::$errText; }
	else if(_js::iseErr($D['prp1'],'Se debe definir la Sede','numeric>0')){ return _err::$errText; }
	_ADMS::lib('iDoc,docSeries');
	_ADMS::libC('ivt','ing');
	ivtIng::setTbk(['serie'=>'ivtDotDoi','tbk'=>'ivt_odoi','tbk1'=>'ivt_doi1']);
	$js=ivtIng::post($D);
	if(_err::$err){ $js=_err::$errText; }
	return $js;
});
JRoute::put('ivt/dotDoi/statusCancel',function($D){
	_ADMS::libC('ivt','ing'); _ADMS::lib('iDoc');
	ivtIng::setTbk(['serie'=>'ivtDotDoi','tbk'=>'ivt_odoi','tbk1'=>'ivt_doi1']);
	$js=ivtIng::putCancel($D);
	if(_err::$err){ $js=_err::$errText; }
	return $js;
});
?>