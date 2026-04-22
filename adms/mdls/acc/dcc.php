<?php
if(_0s::$router=='GET dcc'){
	$___D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.docTotal,A.curr,A.docTotalME,A.userId,A.dateC 
	FROM gfi_odcc A';
	echo Doc::get($___D);
}
else if(_0s::$router=='GET dcc/tb99'){
	_ADMS::mApps('gfi/Dcc');
	echo gfiDcc::logGet($_GET);
}
else if(_0s::$router=='POST dcc'){
	_ADMS::lib('docSeries'); _ADMS::mApps('gfi/Dcc');
	$js=gfiDcc::post($_J);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='PUT dcc'){
	_ADMS::mApps('gfi/Dcc');
	$js=gfiDcc::put($_J);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='GET dcc/view'){
	if($js=_js::ise($___D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	echo Doc::getOne(array('docEntry'=>$___D['docEntry'],'fromA'=>'A.* 
	FROM gfi_odcc A ',
	'fromB'=>'AC.accCode,AC.accName,C.cardName, B.* FROM gfi_dac1 B 
	LEFT JOIN gfi_opdc AC ON (AC.accId=B.accId)
	LEFT JOIN par_ocrd C ON (C.cardId=B.cardId)
	'));
}
else if(_0s::$router=='GET dcc/form'){
	if($js=_js::ise($_GET['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	echo Doc::getOne(array('docEntry'=>$_GET['docEntry'],'fromA'=>'A.* 
	FROM gfi_odcc A ',
	'fromB'=>'AC.accCode,AC.accName,C.cardName, B.acId id,B.* FROM gfi_dac1 B 
	LEFT JOIN gfi_opdc AC ON (AC.accId=B.accId)
	LEFT JOIN par_ocrd C ON (C.cardId=B.cardId)
	'));
}
else if(_0s::$router=='PUT dcc/statusCancel'){
	_ADMS::mApps('gvt/Pnd');
	$js=gfiDcc::putCancel($___D);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
?>