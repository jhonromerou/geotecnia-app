<?php
if(_0s::$router=='GET wht'){ a_ses::hashKey('ivtWht');
	_ADMS::lib('iDoc');
$_GET['fromA']='A.docEntry,A.serieId,A.docNum,A.docDate,A.docStatus,A.canceled,A.docClass,A.whsIdFrom,A.whsId,A.lineMemo,A.userId,A.dateC,A.docType FROM ivt_owht A';
	echo iDoc::get($_GET);
}
else if(_0s::$router=='POST wht'){ a_ses::hashKey('ivtWht.write');
	_ADMS::lib('iDoc,docSeries');
	_ADMS::mApps('ivt/Wht');
	$js=ivtWht::post($_J);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='GET wht/tb99'){ a_ses::hashKey('ivtWht');
	_ADMS::mApps('ivt/Wht');
	echo ivtWht::logGet($_GET);
}

else if(_0s::$router=='PUT wht/statusCancel'){ a_ses::hashKey('ivtWht.statusCancel');
	_ADMS::mApps('ivt/Wht'); _ADMS::lib('iDoc');
	$js=ivtWht::putCancel($___D);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='GET wht/view'){ a_ses::hashKey('ivtWht');
	_ADMS::lib('docSeries,iDoc');
	if($js=_js::ise($___D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	echo iDoc::getOne(array('docEntry'=>$_GET['docEntry'],'fromA'=>'C.licTradType,C.licTradNum,A.* 
	FROM ivt_owht A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	',
	'fromB'=>'I.itemCode, I.itemName,I.udm, B.* FROM ivt_wht1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
?>