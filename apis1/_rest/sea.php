<?php
header('Content-Type: application/json');
$D = $_POST;
$D=$_GET;;
$ADMS_KEY=str_replace('GET ','',_0s::$router);
$ADMS_KEY=explode('.',$ADMS_KEY);
$ADMS_KEY=$ADMS_KEY[0];
$_k1 = $ADMS_KEYo[1];
if($ADMS_KEY == 'itemPict'){
	$t = a_sql::toSe($D['text']);
	$q = a_sql::query('SELECT '._0s::TbF('sea_itm').' FROM itm_oitm I LEFT JOIN ivt_oitw IW1 ON (IW1.itemId = I.itemId) WHERE (I.ocardId=\''.a_ses::$ocardId.'\' AND I.osocId=\''.a_ses::$ocardSocId.'\') AND (I.itemCode '.$t.' OR I.itemName '.$t.') GROUP BY I.itemCode, I.itemName LIMIT 5',array(1=>'Error obteniendo productos: ',2=>'No se encontraron elementos.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText;}
	else{
		$Mx = array();
		while($L=$q->fetch_assoc()){
		$L['onHand'] *= 1;
			$Mx[] = $L;
		}
		$js = _js::enc($Mx,'NO_PAGER');
	}
	echo $js;
}
else if($ADMS_KEY == 'itm_owhs'){
	$t = a_sql::toSe($D['text']);
	$q = a_sql::query('SELECT owhs.whsId, owhs.whsName, owhs.whsName lineText FROM '._0s::$Tb['itm_owhs'].' owhs WHERE (owhs.whsId '.$t.' OR owhs.whsName '.$t.') LIMIT 5',array(1=>'Error obteniendo bodegas: ',2=>'No se encontraron bodegas.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText;}
	else{
		$Mx = array();
		while($L=$q->fetch_assoc()){
			$Mx[] = $L;
		}
		$js = _js::enc($Mx,'NO_PAGER');
	}
	echo $js;
}
else if($ADMS_KEY!=''){ require_once('sea.'.$ADMS_KEY.'.php'); }
else{
	$err_1 = 'Error realizando busqueda: '; $err_2='No se encontraron coincidencias.';
	$o = $D['objType']; $text = $D['textSearch'];
	if(preg_match('/^bussPartner/',$o)){
	if($o=='bussPartnerGroups'){
		$sTe = a_sql::toSe($text);
		$qt = 'SELECT G0.groupId objRef, G0.groupName objText, G0.groupName lineText FROM '._0s::$Tb['par_ocgr'].' G0 WHERE 1  AND (G0.groupId=\''.$text.'\' OR G0.groupName '.$sTe.') LIMIT 10';
	}
	else{
		$fields= ($D['fields'])?','.$D['fields']:'';
		$cardType = ($o=='bussPartner_cust') ? 'C' : 'C';
		$cardType = ($o=='bussPartner_sup') ? 'S' : $cardType;
		$cardType = ($o=='bussPartner_emp') ? 'E' : $cardType;
		$whCardType = ($o=='bussPartner_all')?'':' AND A.cardType=\''.$cardType.'\' ';
		$o = 'bussPartner';
		$userRel = a_ses::soc_Au(array('cardType'=>$cardType,'objType'=>_o::$Ty['bussPartner'],'whCode'=>'11-01'));
		$sTe = a_sql::toSe($text);
		$qt = 'SELECT A.cardId objRef, A.cardName objText, A.cardName lineText, A.cardCode '.$fields.' FROM '._0s::$Tb['par_ocrd'].' A '.$userRel['inner'].' WHERE A.actived=\'Y\' '.$whCardType.' '.$userRel['wh'].' AND (A.addId=\''.$text.'\' OR A.cardCode '.$sTe.' OR A.cardName '.$sTe.' OR A.cardNameComer '.$sTe.') LIMIT 10';
	}
	}
	else if($o == 'userAssg'){
		$qt = 'SELECT A.userId objRef, A.userId objText, CONCAT(A.userName,\' (\',A.user,\')\') lineText FROM '._0s::$Tb['A0_vs0_ousr'].' A INNER JOIN '._0s::$Tb['A0_par_ousm'].' oUsm ON (oUsm.userId = A.userId) WHERE oUsm.ocardId=\''.a_ses::$ocardId.'\' AND (A.user '.a_sql::toSe($text).' OR A.userName '.a_sql::toSe($text).') LIMIT 10';
	}
	if($qt==''){ $js = _js::e(3,'No se realizó busquedad: o= '.$o.'.'); }
	else{
		$q = a_sql::query($qt,array(1=>$err_1,2=>$err_2));
		if(a_sql::$errNoText!=''){ $js = a_sql::$errNoText; }
		else{ $Mx=array('DATA'=>array());
			while($L = $q->fetch_assoc()){
				$L['objType'] = $o; $Mx['DATA'][] = $L;
			}
			$js = _js::enc($Mx);
		}
	}
	echo $js;
}
?>