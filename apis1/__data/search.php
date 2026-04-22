<?php
header('Content-Type: application/json');
$D = $_POST;
$_5b_whPerm = 'AND (
WB0.wboPriv=\'share\' 
OR (WB1.authRel=\'share\')
OR (WB0.wboPriv=\'owner\' AND WB0.userId=\''.a_ses::$userId.'\')
OR (WB0.wboPriv=\'members\' AND WB0.userId=\''.a_ses::$userId.'\' )
OR (WB0.wboPriv=\'members\' AND WB20.userId=\''.a_ses::$userId.'\' )
)';
if($ADMS_KEY == 'Type'){#DELETE 20 Julio 2017
$D = $_POST;
if($ADMS_MET == 'GET'){
	$wh = $_POST;
	$textS = $D['textS'];
	switch($D['type']){
		case 'user' : $qu =a_sql::query('SELECT 
		\'user\' srcType, userId srcRef, userName srcName
		FROM '._ADMS::$TBSoc['su__vs0_ousr'].' WHERE userName LIKE \'%'.$textS.'%\' OR user LIKE \'%'.$textS.'%\' LIMIT 10');
		break;
		case 'customer' : $qu = a_sql::query('SELECT 
		\'customer\' srcType, cardId srcRef, cardName srcName
		FROM '._ADMS::$TBSoc['par_ocrd'].' WHERE cardName LIKE \'%'.$textS.'%\' OR cardId LIKE \'%'.$textS.'%\' LIMIT 10');
		break;
	}
	if(!$qu){ $js = _ADMS::jsonError(3,'Any Type Defined.'); }
	else if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($D = $qu->fetch_assoc()){
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
}
}
#A:Type?type=&textS
else if($ADMS_KEY == 'TB'){# /s/search A:TB 
if($ADMS_MET == 'GET'){
	$D['BY_LIKE'] = 1;
	$table = ($D['tbKey']) ? _ADMS::$TBSoc[$D['tbKey']] : $D['tb'];
	//itemStatus de mp
	$status = ($D['itemStatus']) ? 'AND status=\''.$D['itemStatus'].'\' ' : '';
	$fields = ($D['fields']) ? $D['fields'] : '*';
	 unset($D['tb'],$D['tbKey'],$D['fields'],$D['itemStatus']);
	_ADMS::_lb('sql/filter');
	$wh =a_sql_filtByT($D,array('begi'=>'AND'));
	$qu =a_sql::query('SELECT '.$fields.' FROM '.$table.' WHERE 1 '.$wh.' '.$status.' LIMIT 20');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.');
	}
	else{
		while($D = $qu->fetch_assoc()){
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
}
}
#A:Type?type=&textS

else if($ADMS_KEY == 'ITM0' || $ADMS_KEY == 'OITM'){
$whMp = 'itemType=\'articulo\' AND itemGroup=\'materia prima\'';
$whModel = 'itemType=\'articulo\' AND itemGroup=\'modelo\'';
$whAll = 'itemType=\'articulo\' ';
$whAll_model = 'itemType=\'articulo\' AND itemGroup != \'modelo\'';
$D['BY_LIKE'] = 1;
$status = ($D['itemStatus']) ? 'AND status=\''.$D['itemStatus'].'\' ' : '';
$fields = ($D['fields']) ? $D['fields'] : '*';
	unset($D['tb'],$D['tbKey'],$D['fields'],$D['itemStatus']);
	_ADMS::_lb('sql/filter');
$wh =a_sql_filtByT($D,array('begi'=>'AND'));
if($ADMS_KEYo[1] == 'MP'){
	$qu =a_sql::query('SELECT '.$fields.' FROM '._ADMS::$TBSoc['i01_oitm'].' WHERE '.$whAll_model.' '.$wh.' '.$status.' ORDER BY itemCode ASC LIMIT 20');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($D = $qu->fetch_assoc()){
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
}

else if($ADMS_KEYo[1] == '~model'){
	$qu =a_sql::query('SELECT '.$fields.' FROM '._ADMS::$TBSoc['i01_oitm'].' WHERE '.$whAll_model.' '.$wh.' '.$status.' ORDER BY itemCode ASC LIMIT 20');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($D = $qu->fetch_assoc()){
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
}

else if($ADMS_KEYo[1] == 'All'){
	$qu =a_sql::query('SELECT '.$fields.' FROM '._ADMS::$TBSoc['i01_oitm'].' WHERE '.$whAll.' '.$wh.' '.$status.' ORDER BY itemCode ASC LIMIT 20');
	if(a_sql::$errNo == 1){ print_r($qu); $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($D = $qu->fetch_assoc()){
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
}
}

else if($ADMS_KEY == 'OCRD'){
	_ADMS::_lb('com/_5o');
if($ADMS_KEYo[1] == 'C' && $ADMS_KEYo[2] == 'seller'){
	$fields = ($D['fields']) ? ','.$D['fields'] : ',A.cardName';
	$userRel = _5o::Au_wh(array('objType'=>_o::$Ty['bussPartner'],'whCode'=>'11-01'));
	unset($D['tb'],$D['tbKey'],$D['fields'],$D['inactive']);
	$D['BY_LIKE'] = 1;
	_ADMS::_lb('sql/filter');
	$wh =a_sql_filtByT($D);
	$qu =a_sql::query('SELECT A.iniK,A.cardId'.$fields.' '.$userRel['f'].' FROM '._ADMS::$TBSoc['par_ocrd'].' A '.$userRel['inner'].' WHERE A.cardType=\'C\'  '.$userRel['wh'].' '.$wh.' LIMIT 10');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($L = $qu->fetch_assoc()){
			$js .=a_sql::JSON($L).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
}
else{
$cardType = ($ADMS_KEYo[1] == 'Sup') ? 'S': $ADMS_KEYo[1];
$whType = ($cardType == 'Sup' || $cardType == 'S') ? ' AND cardType=\'S\' ' : '';
$whType = ($cardType == 'C') ? ' AND cardType=\'C\' ' : $whType;
$whUserAssg = ($cardType == '') ? _ADMS::CR2_wh('11-01') : '';
if(1){
			$D['BY_LIKE'] = 1;
	$status = ($D['inactive']) ? '' : 'AND A.inactive=\'N\' ';
	$fields = ($D['fields']) ? ','.$D['fields'] : ',A.cardName';
	$userRel = _5o::Au_wh(array('cardType'=>$cardType,'objType'=>_o::$Ty['bussPartner'],'whCode'=>'11-01'));
	unset($D['tb'],$D['tbKey'],$D['fields'],$D['inactive']);
	_ADMS::_lb('sql/filter');
	$wh =a_sql_filtByT($D,array('begi'=>'AND'));
	$qu =a_sql::query('SELECT A.iniK,A.cardId'.$fields.' '.$userRel['f'].' FROM '._ADMS::$TBSoc['par_ocrd'].' A '.$userRel['inner'].' WHERE 1 '.$whType.' '.$userRel['wh'].' '.$wh.' LIMIT 10');
	//echo 'SELECT A.iniK,A.cardId'.$fields.' '.$userRel['f'].' FROM '._ADMS::$TBSoc['par_ocrd'].' A '.$userRel['inner'].' WHERE 1 '.$whType.' '.$userRel['wh'].' '.$wh.' LIMIT 10';
	//$qu =a_sql::query('SELECT '.$fields.' FROM '._ADMS::$TBSoc['par_ocrd'].' A LEFT JOIN '._ADMS::$TBSoc['par_aut1'].' AUR ON (AUR.cardId = A.cardId) WHERE 1 '.$whType.' '.$wh.' '.$status.' '.$whUserAssg.' GROUP BY A.cardId ORDER BY A.cardName ASC LIMIT 20');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($D = $qu->fetch_assoc()){
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
	}
}
}

else if($ADMS_KEY == 'OUSR'){
if($ADMS_KEYo[1] == 'all'){
			$D['BY_LIKE'] = 1;
	$status = ($D['inactive']) ? '' : 'AND U.inactivo=\'N\' ';
	$fields = ($D['fields']) ? $D['fields'] : '*';
	unset($D['tb'],$D['tbKey'],$D['fields'],$D['inactive']);
	_ADMS::_lb('sql/filter');
	$wh = a_sql_filtByT($D,array('begi'=>'AND'));
	$qt = 'SELECT '.$fields.' FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' U INNER JOIN '._ADMS::$TBSoc['A0_par_ousm'].' Usm ON (Usm.userId = U.userId) WHERE Usm.ocardId=\''.a_ses::$ocardId.'\' '.$wh.' '.$status.' ORDER BY U.userName ASC LIMIT 10';
	$qu =a_sql::query($qt);
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($D = $qu->fetch_assoc()){ unset($D['password']);
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
	}
}

else if($ADMS_KEY == 'OWBO'){
if($ADMS_KEYo[1] == 'list'){
	_ADMS::_lb('sql/filter');
	$D['BY_LIKE'] = 1;
	$fields = ($D['fields']) ? $D['fields'] : '*';
	unset($D['tb'],$D['tbKey'],$D['fields'],$D['inactive']);
	$userId = a_ses::$userId;
	$whUser = (a_ses::$user == 'supersu') ? '' : $_5b_whPerm;
	$wh =a_sql_filtByT($D,array('begi'=>'AND'));
	$qu =a_sql::query('SELECT '.$fields.' FROM '._ADMS::$TBSoc['ap1_owbo'].' WB0 INNER JOIN '._ADMS::$TBSoc['ap1_wbo1'].' WB1 ON (WB1.wboId = WB0.wboId) LEFT JOIN '._ADMS::$TBSoc['ap1_wbo20'].' WB20 ON (WB20.wboId = WB0.wboId) WHERE 1 '.$whUser.' '.$wh.' GROUP BY WB1.wboListId ORDER BY WB0.wboName ASC, WB1.listName ASC LIMIT 10');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron lista de tableros.'); }
	else{
		while($D = $qu->fetch_assoc()){
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
	}
}
//nuevo, 22 Ene 2018
else if($ADMS_KEY == 'usr'){
	$whoCard = 'Usm.ocardId=\''.a_ses::$ocardId.'\'';
	$whoCard .= ($ADMS_KEYo[1] == 'ocardSoc')?' AND Usm.socId=\''.a_ses::$ocardSocId.'\'' : '';
	$D['BY_LIKE'] = 1;
	$status = ($D['inactive']) ? '' : 'AND U.inactivo=\'N\' ';
	$fields = ($D['fields']) ? $D['fields'] : 'U.userId,U.userName';
	$fields .= ',ocard1.socName ';
	unset($D['tb'],$D['tbKey'],$D['fields'],$D['inactive']);
	_ADMS::_lb('sql/filter');
	$wh = a_sql_filtByT($D);
	$qt = 'SELECT '.$fields.' FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' U INNER JOIN '._ADMS::$TBSoc['A0_par_ousm'].' Usm ON (Usm.userId = U.userId) INNER JOIN '._ADMS::$TBSoc['A0_par_crd1'].' ocard1 ON (ocard1.socId = Usm.socId) WHERE '.$whoCard.' '.$wh.' '.$status.' ORDER BY U.userName ASC LIMIT 10';
	$qu =a_sql::query($qt);
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,'Erro buscando usuarios: '.$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{
		while($D = $qu->fetch_assoc()){ unset($D['password']);
			$js .=a_sql::JSON($D).',';
		}
		$js = '{
"DATA":['.substr($js,0,-1).'
]
}';
	}
	echo $js;
}


?>