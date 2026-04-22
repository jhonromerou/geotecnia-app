<?php
if(_0s::$router=='GET riv'){
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.docEntry,A.serieId,A.docNum,A.docDate,A.docStatus,A.canceled,A.whsId,A.lineMemo,A.userId,A.dateC,A.docType FROM ivt_oriv A';
	echo iDoc::get($_GET);
}
else if(_0s::$router=='POST riv'){
	_ADMS::lib('iDoc,docSeries');
	_ADMS::mApps('ivt/Riv');
	$js=ivtRiv::post($_J);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='GET riv/view'){
	_ADMS::lib('docSeries,iDoc');
	if($js=_js::ise($_GET['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	echo iDoc::getOne(array('docEntry'=>$_GET['docEntry'],'fromA'=>'C.licTradType,C.licTradNum,A.* 
	FROM ivt_oriv A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	',
	'fromB'=>'I.itemCode, I.itemName,I.udm, B.quantity,B.priceLine,B.handAt,B.priceAt,B.diffQty,B.diffPrice FROM ivt_riv1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}

?>