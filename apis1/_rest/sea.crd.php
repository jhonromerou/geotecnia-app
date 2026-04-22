<?php
_ADMS::_lb('sql/filter');
$o=$__Ko[1];//crd.cust
$text=$D['text']; 
$D['_otD']=array('addr'=>array('addrType(E_in)'=>'merch,inv'));
$otD=$D['_otD']; unset($D['_otD']);//otherData like address
$otd=($otD)?true:false;
$fields= ($D['fields'])?','.$D['fields']:'';
$cardType = ($o=='c') ? 'C' : 'C';
$cardType = ($o=='s') ? 'S' : $cardType;
$cardType = ($o=='e') ? 'E' : $cardType;
$whCardType = ($o=='cl')?' AND A.cardType IN(\'C\',\'L\') ':' AND A.cardType IN(\''.$cardType.'\')';
$whCardType = ($o=='all')?'':$whCardType;
$o = 'bussPartner';
//$userRel = a_ses::soc_Au(array('cardType'=>$cardType,'whCode'=>'11-01'));
$slsp='';
if($cardType=='C'){
	$slps=a_ses::U_slpIds(array('f'=>'A.slpId','r'=>'in')); 
	if(_err::$err){ die(_err::$errText); }
}
$sTe = a_sql::toSe($text);
$qt = 'SELECT A.cardId,A.cardName,A.cardName lineText,A.cardCode'.$fields.' FROM par_ocrd A WHERE A.actived=\'Y\' '.$whCardType.' '.$slps.' AND (A.addId=\''.$text.'\' OR A.cardCode '.$sTe.' OR A.cardName '.$sTe.') LIMIT 5
';
$q = a_sql::query($qt,array(1=>'Error consultando contactos:',2=>'No se encontraron contactos.'));
if(a_sql::$err){ $js = a_sql::$errNoText; }
else{ $Mx=array('L'=>array());
	while($L = $q->fetch_assoc()){
		if($otd){
		if(array_key_exists('addr',$otD)){
			//$wh2=a_sql_filtByT($otD['addr']); 
			$ad=a_sql::fetch('SELECT addrType,address,cityCode,countyCode,country FROM cnt_addr
			WHERE objType=\'card\' AND objRef=\''.$L['cardId'].'\' AND addrType=\'merch\' LIMIT 1');
			if(a_sql::$errNo==-1){
					$L['cityCode']=$ad['cityCode']; $L['countyCode']=$ad['countyCode']; 
					$L['address']=$ad['address'];
			}
		}
		}
		$Mx['L'][] = $L;
	}
	$js = _js::enc($Mx,'NO_PAGER');
}
echo $js;
?>