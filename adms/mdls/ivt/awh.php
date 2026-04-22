<?php
if(_0s::$router=='GET awh'){
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.docEntry,A.serieId,A.whsId,A.docNum,A.docDate,A.docStatus,A.canceled,A.lineMemo,A.userId,A.dateC,A.docType FROM ivt_oawh A';
	echo iDoc::get($_GET);
}
else if(_0s::$router=='POST awh'){
	_ADMS::lib('iDoc,docSeries');
	_ADMS::mApps('ivt/Awh');
	$js=ivtAwh::post($_J);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='GET awh/view'){
	_ADMS::lib('docSeries,iDoc');
	$_GET['fromA']='C.licTradType,C.licTradNum,A.* 
	FROM ivt_oawh A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	$_GET['fromB']='I.itemCode, I.itemName,I.udm, B.* FROM ivt_awh1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)';
	echo iDoc::getOne($_GET);
}

else if(_0s::$router=='GET awh/tb99'){ a_ses::hashKey('ivtAwh');
	_ADMS::mApps('ivt/Awh');
	echo ivtAwh::logGet($_GET);
}

else if(_0s::$router=='PUT awh/statusCancel'){ a_ses::hashKey('ivtAwh.statusCancel');
	_ADMS::mApps('ivt/Awh'); _ADMS::lib('iDoc');
	$js=ivtAwh::putCancel($___D);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
?>