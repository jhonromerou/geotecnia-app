<?php
	class Au{
static public function obj($P=array()){
	if(a_ses::$user == 'supersu' && !$P['userId']){ return '';}
	$tbA = ($P['tbA']) ? $P['tbA'].'.' : '';
	$userId = ($P['userId']) ? $P['userId'] : a_ses::$userId;
	$Uo = a_sql::query('SELECT U2.*, U.userId, U.userName, U.user, U.rol, U.officName, U.dpto, U.team  FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' U LEFT JOIN '._ADMS::$TBSoc['A0_vs0_usr2'].' U2 ON (U2.userId = U.userId) WHERE U.userId=\''.$userId.'\' ');
	$whTotal = '';
	if(a_sql::$errNo == 1){ $whTotal = array('errNo'=>2,'errText'=>'Error en Historial: '.$Uo['error_sql']); }
	else if(a_sql::$errNo == -1){
		while($L = $Uo->fetch_assoc()){
		switch($L['auType']){
			default : $wh_dpto = 'AND (U.userId =\''.$L['userId'].'\') '; break;
			case 'E_ALL' : $wh_dpto = ''; break;
			case 'office' : $wh_dpto = 'AND (U.officName =\''.$L['officName'].'\') '; break;
			case 'office.dpto' : $wh_dpto = 'AND (U.officName =\''.$L['officName'].'\' AND U.dpto =\''.$L['dpto'].'\') '; break;
			case 'office.dpto.team' : $wh_dpto = 'AND (U.officName =\''.$L['officName'].'\' AND U.dpto =\''.$L['dpto'].'\' AND U.team =\''.$L['team'].'\') '; break;
		}
		$wh_user = '';
		if($L['auType'] != 'E_ALL'){
			$q = 'SELECT U.userId,U.user FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' U WHERE 1 '.$wh_dpto;
			$qu = a_sql::query($q);
			$uIds = '';
			while($L2 = $qu->fetch_assoc()){
				$uIds .= $L2['userId'].', ';
			}
			$uIds = substr($uIds,0,-2);
			$wh_user = ' AND ('.$tbA.'userId IN ('.$uIds.') OR '.$tbA.'userAssg IN ('.$uIds.'))';
		}
		$L['objType'] = ($L['objType'] == '') ? '__undObjType__' : $L['objType'];
		$whTotal .= '(('.$tbA.'objType =\''.$L['objType'].'\' OR '.$tbA.'targetType=\''.$L['objType'].'\')'.$wh_user.') OR';
	}
		if($whTotal!=''){ $whTotal = 'AND ( '.substr($whTotal,0,-3).' )'; }
		else{ $whTotal = 'NULL'; }
	}
	return $whTotal;
}

static public function objView($P=array()){
	//if(a_ses::$user == 'supersu' && !$P['userId']){ return '';}
	$tbA = ($P['tbA']) ? $P['tbA'].'.' : '';
	$userId = ($P['userId']) ? $P['userId'] : a_ses::$userId;
	$whIds = a_ses::U_Access('Offfice');
	$whObj = 'AND (
	('.$tbA.'userId IN('.$whIds.') OR '.$tbA.'userAssg IN('.$whIds.'))
	AND ('.$tbA.'objType IN (\'comment\',\'fileUpd\',\'activity\',\'bussPartner\'))
	)';
	return $whObj;
}

static public function usr($P=array()){
	$tbA = ($P['tbA']) ? $P['tbA'].'.' : '';
	$userId = ($P['userId']) ? $P['userId'] : a_ses::$userId;
	$Uo = a_sql::fetch('SELECT U1.*, U.userId, U.userName, U.user, U.rol, U.officName, U.dpto, U.team  FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' U LEFT JOIN '._ADMS::$TBSoc['vs0_usr1'].' U1 ON (U1.userId = U.userId) WHERE U.userId=\''.$userId.'\' ');
	$whSoc = '';
	$isNumera = ($Uo['rol'] == 'numerario');
	if($Uo['user'] == 'supersu'){ $whSoc = ''; }
	else if($isNumera){ $whereU = 'AND U.userId=\''.$Uo['userId'].'\''; }
	else{
		if($Uo['officWh'] !='' && $Uo['officWh'] != 'E_ALL'){
			$whSoc = 'U.officName IN ('.$Uo['officWh'].') ';
		}
		if($Uo['dptoWh'] != '' && $Uo['dptoWh'] != 'E_ALL'){
			$whSoc .= ($whSoc != '') ? 'AND ' : '';
			$whSoc .= 'U.dpto IN ('.$Uo['dptoWh'].') ';
		}
		if($Uo['teamWh'] != '' && $Uo['teamWh'] != 'E_ALL'){
			$whSoc .= ($whSoc != '') ? 'AND ' : '';
			$whSoc .= 'U.team IN ('.$Uo['teamWh'].') ';
		}
		switch($Uo['rol']){
			case 'admin' : $whRol .= ''; break;
			case 'gerencia' : $whRol .= ''; break;
			case 'director' : $whRol .= 'U.rol NOT IN (\'gerencia\') '; break;
			case 'supervisor' : $whRol .= 'U.rol NOT IN (\'gerencia\',\'director\') '; break;
		}
		if($whSoc == ''){ $whereU = 'AND U.userId=\''.$Uo['userId'].'\''; }
		else{
			$whereU = ($whSoc == '' && $whRol == '') ? '' : 'AND ( '.$whSoc.' AND '.$whRol.')';
			$whereU = ($whSoc == '' && $whRol != '') ? 'AND ('.$whRol.')' : $whereU;
			$whereU = ($whSoc != '' && $whRol == '') ? 'AND ( '.$whSoc.' )' : $whereU;
		}
	}
	$q = 'SELECT U.userId,U.user FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' U WHERE 1 '.$whereU;
	$qu = a_sql::query($q);
	$uIds = '';
	while($L2 = $qu->fetch_assoc()){
		$uIds .= $L2['userId'].', ';
	}
	$uIds = substr($uIds,0,-2);
	return $uIds;
}
}
?>