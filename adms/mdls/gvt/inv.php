<?php
if(_0s::$router=='GET inv'){ a_ses::hashKey('gvtInv');
	$___D['fromA']='A.docEntry,A.serieId,A.docNum,A.projectId,A.docStatus,A.cardId,A.cardName,A.docType,A.docDate,A.docTotal,A.balDue,A.curr,A.docTotalME,A.userId,A.dateC 
	FROM gvt_oinv A';
	echo Doc::get($___D);
}
else if(_0s::$router=='GET inv/tb99'){ a_ses::hashKey('gvtInv');
	_ADMS::mApps('gvt/Inv');
	echo gvtInv::logGet($_GET);
}
else if(_0s::$router=='POST inv'){ a_ses::hashKey('gvtInv.write');
	_ADMS::lib('docSeries'); _ADMS::mApps('gvt/Sin'); _ADMS::_lb('com/_2d');
	$js=gvtSin::post($_J);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='GET inv/view'){ //a_ses::hashKey('.basic');
	_ADMS::lib('docSeries');
	if($js=_js::ise($___D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	$Mx= Doc::getOne(array('r'=>'Mx','docEntry'=>$___D['docEntry'],'fromA'=>'C.licTradType,C.licTradNum,A.* 
	FROM gvt_oinv A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	LEFT JOIN par_ocpr P ON (P.prsId=A.prsId)
	',
	'fromB'=>'I.itemCode, I.itemName,I.udm, B.itemSzId,B.whsId,B.price,B.quantity,B.priceLine,B.vatId,B.rteId,B.lineText FROM gvt_inv1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
	echo _js::enc(docSeries::form($Mx));
}

else if(_0s::$router=='GET inv/view2'){ a_ses::hashKey('gvtInv');
	if($js=_js::ise($___D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	echo Doc::getOne(array('docEntry'=>$___D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,A.* 
	FROM gvt_oinv A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.buyUdm, B.* FROM gvt_inv1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
else if(_0s::$router=='PUT inv/statusCancel'){ a_ses::hashKey('gvtInv.statusCancel');
	_ADMS::mApps('gvt/Sin');
	$js=gvtSin::putCancel($___D);
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
?>