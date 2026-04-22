<?php
$o=$__Ko[1];//crd.cust
$fields= ($D['fields'])?','.$D['fields']:'';
$cardType = ($o=='bussPartner_cust') ? 'C' : 'C';
$cardType = ($o=='bussPartner_sup') ? 'S' : $cardType;
$cardType = ($o=='bussPartner_emp') ? 'E' : $cardType;
$whCardType = ($o=='bussPartner_all')?'':' AND A.cardType=\''.$cardType.'\' ';
$o = 'bussPartner';
$userRel = a_ses::soc_Au(array('cardType'=>$cardType,'objType'=>_o::$Ty['bussPartner'],'whCode'=>'11-01'));
$sTe = a_sql::toSe($text);
$qt = 'SELECT A.cardId objRef, A.cardName objText, A.cardName lineText, A.cardCode '.$fields.' FROM '._0s::$Tb['par_ocrd'].' A '.$userRel['inner'].' WHERE actived=\'Y\' '.$whCardType.' '.$userRel['wh'].' AND (A.addId=\''.$text.'\' OR A.cardCode '.$sTe.' OR A.cardName '.$sTe.' OR A.cardNameComer '.$sTe.') LIMIT 10';
$q = a_sql::query($qt,array(1=>$err_1,2=>$err_2));
if(a_sql::$errNoText!=''){ $js = a_sql::$errNoText; }
else{ $Mx=array('DATA'=>array());
	while($L = $q->fetch_assoc()){
		$L['objType'] = $o; $Mx['DATA'][] = $L;
	}
	$js = _js::enc($Mx);
}
?>