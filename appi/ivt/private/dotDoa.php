<?php
JRoute::get('ivt/dotDoa',function($D){
	$Px=fOCP::fg('owsu',['in'=>'C.workSede'],'nomBase');
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docDate,A.docStatus,A.canceled,A.docClass,A.lineMemo,A.userId,A.dateC,A.docType,A.ref1,A.ref2,A.whsId,A.cardId,A.cardName 
	FROM ivt_odoa A
	LEFT JOIN nom_ocrd C ON (C.cardId=A.cardId)
	'.$Px['l'];
	return iDoc::get($D);
});
JRoute::get('ivt/dotDoa/tb99',function($D){
	_ADMS::mApps('ivt/Awh');
	ivtAwh::setTbk(['serie'=>'ivtDotDoa']);
	return ivtAwh::logGet($D);
});
JRoute::get('ivt/dotDoa/view',function($D){
	_ADMS::lib('docSeries,iDoc');
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.licTradType,C.licTradNum,A.* 
	FROM ivt_odoa A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.udm, B.* FROM ivt_doa1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
});

JRoute::post('ivt/dotDoa',function($D){
	if(_js::iseErr($D['whsId'],'Se debe definir la bodega','numeric>0')){ return _err::$errText; }
	else if(_js::iseErr($D['prp1'],'Se debe definir la Sede','numeric>0')){ return _err::$errText; }
	_ADMS::lib('iDoc,docSeries');
	_ADMS::mApps('ivt/Awh');
	ivtAwh::setTbk(['serie'=>'ivtDotDoa','tbk'=>'ivt_odoa','tbk1'=>'ivt_doa1']);
	$js=ivtAwh::post($D);
	if(_err::$err){ $js=_err::$errText; }
	return $js;
});
JRoute::put('ivt/dotDoa/statusCancel',function($D){
	_ADMS::mApps('ivt/Awh'); _ADMS::lib('iDoc');
	ivtAwh::setTbk(['serie'=>'ivtDotDoa','tbk'=>'ivt_odoa','tbk1'=>'ivt_doa1']);
	$js=ivtAwh::putCancel($D);
	if(_err::$err){ $js=_err::$errText; }
	return $js;
});
?>