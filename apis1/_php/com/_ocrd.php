<?php
class _ocrd{

function get($wh=array(),$P=array()){
	_ADMS::_lb('com/_5o,sql/filter,sql/pager');
	$fields = ($P['fields']) ? $P['fields'] : 'A.*';
	$fields = ($wh['getFields']) ? $wh['getFields'] : $fields;
	$FILCONF = $wh['FILCONF'];
	$whIniK = ($wh['iniK']) ? ' AND A.iniK=\''.$wh['iniK'].'\' ': '';
	$whIniK .= ($wh['cardType']) ? ' AND A.cardType =\''.$wh['cardType'].'\' ': '';
	$CR1_wh = ($FILCONF['CR1_wh']) ? $FILCONF['CR1_wh'] : '11-01';
	
	$userRel = _5o::Au_wh(array('objType'=>_o::$Ty['bussPartner'],'whCode'=>$CR1_wh));
	$noUserAssg = ($FILCONF['noUserAssg']) ? ' AND A.userAssg=0 OR A.userAssgName=\'\' ' : '';
	$whActive = ($FILCONF['inactive'] == 'Y') ? ' AND A.inactive=\'Y\' ' : 'AND A.inactive=\'N\'';
	$whActive = ($FILCONF['inactive'] == 'A') ? '' : $whActive;
	$groupBy = 'GROUP BY A.cardId';
	$ordBy = ($wh['ordBy']) ? 'ORDER BY '.a_sql::ordBy($wh['ordBy']) : 'ORDER BY cardId DESC ';
	unset($wh['iniK']);
	$where = $whIniK.' '.a_sql_filtByT($wh);
	$wh_Full = $whActive . $noUserAssg . $userRel['wh'].' '.$where.' '.$groupBy;
	$qFrom = 'FROM '._ADMS::$TBSoc['par_ocrd'].' A '.$userRel['inner'].' WHERE 1 '.$wh_Full;
	$Pager = a_sql_getPager('SELECT A.cardId '.$qFrom,array('rowsxPage'=>20));
	$query = 'SELECT '.$fields.',A.iniK,A.cardId '.$userRel['f'].' '.$qFrom.' '.$ordBy.' '.$Pager['limit'];
	$qu = a_sql::query($query);
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,'Error obteniendo listado: '.$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron clientes.'); }
	else{
		$ABC = array();
		while($D = $qu->fetch_assoc()){
			a_sql::$jsonBegN = false;
			$D['Auths'] = self::getAuths($D);
			$D['Address'] = self::A11_get($D['cardId']);
			$D['Email'] = self::A13_get($D['cardId']);
			$D['Phone'] = self::A12_get($D['cardId']);
			a_sql::$jsonBegN = true;
			$js .= a_sql::JSON($D).',';
		}
		
		$js = '{'.$Pager['JS'].', "ABC":'.self::getABC($whActive.' '.$whUserAssg).',
"DATA":['.substr(stripslashes($js),0,-1).'
]
}';
	}
	return $js;
}

function put($D=array()){
	//configurar campos a omitir
	 $_GET['__saveOmit'] = 'cardCode,cardName';
	$omit = $_GET['__saveOmit'];
	$o_cardCode = (preg_match('/cardCode/',$omit))? true : false;
	_ADMS::_lb('com/_5o');
	$cardId = $D['cardId'];
	if(_js::isse($cardId)){ o1::plan_get(_o::$Ty['bussPartner']); }
	else{
		$cardInf =  self::getInfo($cardId,array('fields'=>'onSys'));
		//$auTy = _5o::Au_byCode(array('objType'=>_o::$Ty['bussPartner'],'objRef'=>$cardId,'code'=>'bussPartnerData'));
	}
	if($auTy['errNo']){ $js = _ADMS::jsonError($auTy['errNo'],$auTy['text']); }
	else if(!a_ses::$isSuper && $cardInf['onSys'] == 'Y'){ $js = _ADMS::jsonError(3,'No se puede actualizar la información de un socio de negocios bloqueado para actualización: onSys=Y. '.a_ses::$isSuper); }
	//else if(!a_ses::$isSuper){ die(_ADMS::jsonError(3,'No puede crear socios, por favor, solicitelo al área encargada.')); }
	else if(!$o_cardCode && _js::isse($D['cardCode'])){ $js = _ADMS::jsonError(3,'Se debe definir el código del Socio.'); }
	else if(_js::isse($D['licTradType']) || _js::isse($D['licTradNum'])){ $js = _ADMS::jsonError(3,'Se debe definir el tipo y el número de documento del Socio.'); }
	else if($D['cardType'] == '' || $D['cardGroup']==''){ $js = _ADMS::jsonError(3,'Se debe definir el tipo y grupo del Socio.'); }
	else if($D['cardName'] == ''){ $js = _ADMS::jsonError(3,'Se debe definir el nombre y nombre comercial del Socio.'); }
	else{
		$Add = $D['Address']; $Email = $D['Emails']; $Phones = $D['Phones'];
		unset($D['Address'],$D['Phones'],$D['Emails']);
		$D['iniK'] = substr($D['cardName'],0,1);
		$ins = a_sql::insert($D,array('ou_dateC'=>true,'table'=>_ADMS::$TBSoc['par_ocrd'],'wh_change'=>'WHERE cardId=\''.$cardId.'\' LIMIT 1','no_update'=>'ocardId,ocardSocId'));
		if($ins['err']){ $js = _ADMS::jsonError(1,$ins['err']['error_sql']); }
		else{
			$cardId = ($ins['insertId']) ? $ins['insertId'] : $cardId;
			$js = _ADMS::jsonResp('Socio de Negocio Actualizado.','"cardId":"'.$cardId.'"');
			$jso1 = o1::plan_put(_o::$Ty['bussPartner']);
			$js = _ADMS::jsonRespNode(array($js,$jso1));
			$line = 1;
			
			foreach($Add as $n =>$D1){
				if($D1['address'] == '' && $D1['city'] == '' && $D1['county'] == '' && $D1['contry']==''){ continue; }
				$D1['cardId'] = $cardId; $D1['lineNum'] = $line;
				$po = a_sql::insert($D1,array('table'=>_ADMS::$TBSoc['par_crd11'],'wh_change'=>'WHERE cardId=\''.$cardId.'\' AND addrId=\''.$D1['addrId'].'\' LIMIT 1')); 
			}
			foreach($Phones as $n =>$D1){
				if($D1['number'] == '' && $D1['numExt'] == '' && $D1['numHorary']){ continue; }
				$D1['cardId'] = $cardId; $D1['lineNum'] = $line;
				$po = a_sql::insert($D1,array('table'=>_ADMS::$TBSoc['par_crd12'],'wh_change'=>'WHERE cardId=\''.$cardId.'\' AND phoneId=\''.$D1['phoneId'].'\' LIMIT 1'));
			}
			foreach($Email as $n =>$D1){
				if($D1['email'] == ''){ continue; }
				$D1['cardId'] = $cardId; $D1['lineNum'] = $line;
				$po = a_sql::insert($D1,array('table'=>_ADMS::$TBSoc['par_crd13'],'wh_change'=>'WHERE cardId=\''.$cardId.'\' AND emailId=\''.$D1['emailId'].'\' LIMIT 1'));
			}
		}
		}
	return $js;
}

function userAuth($cardId=''){
	$q = self::getInfo($cardId,array('fields'=>'userId,userAssg'));
	if($q['userId'] == a_ses::$userId || $q['userAssg'] == a_ses::$userId){ return $q; }
	else{ return false; }
}

function getInfo($cardId=0,$P=array()){
	$fields = ($P['fields']) ? $P['fields'] : '*';
	$q = a_sql::fetch('SELECT '.$fields.',cardName FROM '._ADMS::$TBSoc['par_ocrd'].' 
	WHERE (cardId=\''.$cardId.'\') LIMIT 1');
	return $q;
}

function getWhere($cardIdCode='',$fields='A.cardId'){
	$wh = a_sql_filtByT($wh);
	$q = a_sql::fetch('SELECT '.$fields.' FROM '._ADMS::$TBSoc['par_ocrd'].' A LEFT JOIN '._ADMS::$TBSoc['par_ocar'].' oC ON (oC.cardId=A.cardId) WHERE (A.cardId=\''.$cardIdCode.'\' OR A.cardCode=\''.$cardIdCode.'\') LIMIT 1');
	return $q;
}

function getABC($wh=''){
	$userRel = _5o::Au_wh(array('objType'=>_o::$Ty['bussPartner'],'whCode'=>$CR1_wh));
	$qu = a_sql::query('SELECT A.iniK FROM '._ADMS::$TBSoc['par_ocrd'].' A '.$userRel['inner'].' WHERE 1 '.$userRel['wh'].' GROUP BY A.iniK ORDER BY A.iniK ASC');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'ABC. No se encontraron resultados.'); }
	else{
		while($L = $qu->fetch_assoc()){
			$js .= '"'.$L['iniK'].'":"'.$L['iniK'].'",';
		}
		$js = '{'.substr($js,0,-1).'}';
	}
	return $js;
}

function getAuths($D=array()){
	$js = '';
	$isOwn = ($D['userId'] == a_ses::$userId || a_ses::$user == 'supersu') ? true : false;
	$isAssg = ($D['userAssg'] == a_ses::$userId) ? true : false;
	$isMember = ($D['userMember'] == a_ses::$userId) ? true : false;
	$isSuperG = (a_ses::U_isType('supersu') && a_ses::U_isRol('gerencia')) ? true : false;
	$isSuperG = (a_ses::U_isType('suglobal')) ? true : $isSuperG;
	$js .= ($isSuperG || $isAssg || $isMember) ? '"canEdit":"Y"' : '"canEdit":"N"';
	$js .= ($isOwn || $isSuperG || $isAssg || $isMember) ? ',"userCollab":"Y"' : ',"userCollab":"N"';
	return '{'.$js.'}';
}

function A11_get($cardId=0,$wh=array()){
	$wh = a_sql_filtByT($wh,array('begi'=>'AND'));
	$qu = a_sql::query('SELECT * FROM '._ADMS::$TBSoc['par_crd11'].' WHERE cardId=\''.$cardId.'\' '.$wh.' ORDER BY lineNum ASC');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron clientes.'); }
	else{ while($L = $qu->fetch_assoc()){ $js .= a_sql::JSON($L,'').','; }
		$js = '['.substr($js,0,-1).']';
	}
	return $js;
}

function A12_get($cardId=0,$wh=array()){
	$wh = a_sql_filtByT($wh,array('begi'=>'AND'));
	$qu = a_sql::query('SELECT * FROM '._ADMS::$TBSoc['par_crd12'].' WHERE cardId=\''.$cardId.'\' '.$wh.' ORDER BY lineNum ASC');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron clientes.'); }
	else{ while($L = $qu->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '['.substr($js,0,-1).']';
	}
	return $js;
}

function A13_get($cardId=0,$wh=array()){
	_ADMS::_lb('com/_ocrd_emails');
	return _ocrd_emails::get($cardId,array('wh'=>$wh,'r'=>'js'));
	
	$wh = a_sql_filtByT($wh,array('begi'=>'AND'));
	$qu = a_sql::query('SELECT * FROM '._ADMS::$TBSoc['par_crd13'].' WHERE cardId=\''.$cardId.'\' '.$wh.' ORDER BY lineNum ASC');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron clientes.'); }
	else{ while($L = $qu->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '['.substr($js,0,-1).']';
	}
	return $js;
}

}

?>