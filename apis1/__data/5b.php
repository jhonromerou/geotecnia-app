<?php
header('Content-Type: application/json');
$D = $_POST;
_ADMS::_lb('apps/tickan');
$uS = a_ses::$userId;
$whPerm = 'AND (
WB0.wboPriv=\'share\' 
OR (WB0.wboPriv=\'owner\' AND WB0.userId=\''.$uS.'\')
OR (WB0.wboPriv=\'members\' AND WB0.userId=\''.$uS.'\' )
OR (WB0.wboPriv=\'members\' AND WB20.userId=\''.$uS.'\' )
)';
if($ADMS_KEY == 'o'){
if($ADMS_KEYo[1] == 'members'){
	if($ADMS_MET == 'GET'){
	$qu = a_sql::query('SELECT U.userId,U.user, U.userName, WB20.wboId FROM '._ADMS::$TBSoc['ap1_wbo20'].' WB20 INNER JOIN '._ADMS::$TBSoc['A0_vs0_ousr'].' U ON (U.userId = WB20.userId) WHERE WB20.wboId =\''.$D['wboId'].'\' ');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron miembros en ('.$D['wboId'].').'); }
	else{
		while($L = $qu->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '{"DATA":['.substr($js,0,-1).'
]}';
	}
	echo $js;
}
}
else if($ADMS_KEYo[1] == 'list'){
	if($ADMS_MET == 'GET'){
	$qu = a_sql::query('SELECT WB1.* FROM '._ADMS::$TBSoc['ap1_wbo1'].' WB1 WHERE WB1.wboId =\''.$D['wboId'].'\' ORDER BY wboPosic ASC ');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron listas en ('.$D['wboId'].').'); }
	else{
		while($L = $qu->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '{"DATA":['.substr($js,0,-1).'
		]}';
	}
	echo $js;
}
}
else{
	if($ADMS_MET == 'PUT'){
	$wboId = $D['wboId'];
	$USer = $D['U']; $LIST = $D['LIST'];
	unset($D['wboId'],$D['U'],$D['LIST']);
	if(is_numeric($wboId) && $wboId != 'newS'){
		$qE = a_sql::fetch('SELECT userId FROM '._ADMS::$TBSoc['ap1_owbo'].' WHERE wboId=\''.$wboId.'\' LIMIT 1');
		if($qE['userId'] != a_ses::$userId){ $js = _ADMS::jsonError(3,'Solo el propietario del Tablero puede modificar los datos ('.$wboId.').'); }
	}
	if($js != ''){}
	else if($D['wboName'] == ''){ $js = _ADMS::jsonError(3,'Se debe definir un nombre para el tablero.'); }
	else{
		$err = 0; $lineNum = 1;
		foreach($LIST as $n => $D2){
			if($D2['listName'] == ''){ $js = _ADMS::jsonError(3,'Linea '.$n.': Se debe definir el nombre de la lista.'); $err++; break; }
		}
		if($err == 0){
			$ins = a_sql::insert($D,array('u_dateC'=>true,'table'=>_ADMS::$TBSoc['ap1_owbo'],'wh_change'=>'WHERE wboId=\''.$wboId.'\' LIMIT 1','no_update'=>'userId,userName,dateC'));
			if($ins['err']){ $js = _ADMS::jsonError(1,$ins['err']['error_sql']); }
			else{
				$wboId = ($ins['insertId']) ? $ins['insertId'] : $wboId;
				if(is_array($USer)) foreach($USer as $line => $D2){ $D2['wboId'] = $wboId;
					$ins = a_sql::insert($D2,array('dateC'=>1,'table'=>_ADMS::$TBSoc['ap1_wbo20'],'wh_change'=>'WHERE wboId=\''.$wboId.'\' AND userId=\''.$D2['userId'].'\' LIMIT 1','no_update'=>'dateC'));
						if($ins['err']){ $js2 = _ADMS::jsonError(1,$ins['err']['error_sql']); break; }
				}
				$lineNum = 1;
				if(is_array($LIST)) foreach($LIST as $n => $D2){ unset($D2['delete']);
					$D2['wboPosic'] = $lineNum; $lineNum++;
					$D2['wboId'] = $wboId;
					$ins = a_sql::insert($D2,array('table'=>_ADMS::$TBSoc['ap1_wbo1'],'wh_change'=>'WHERE wboId=\''.$wboId.'\' AND wboListId=\''.$D2['wboListId'].'\' LIMIT 1','no_update'=>'dateC'));
					if($ins['err']){ $js3 = _ADMS::jsonError(1,$ins['err']['error_sql']); break; }
				}
				$js = _ADMS::jsonResp('Información de tablero guardada correctamente.','"wboId":"'.$wboId.'"');
			}
		}
		$js = ($js2 !='' && $j3 != '') ? _ADMS::jsonRespNode(array($js,$js2,$js3)) : $js;
		$js = ($js2 != '' && $j3 == '') ? _ADMS::jsonRespNode(array($js,$js2,$js3)) : $js;
		$js = ($js2 == '' && $j3 != '') ? _ADMS::jsonRespNode(array($js,$js2,$js3)) : $js;
	}
	
	echo $js;
}
	else if($ADMS_MET == 'GET'){
	_ADMS::_lb('sql/filter');
	$whUser = (a_ses::$user == 'supersu') ? '' : $whPerm;
	$wh = a_sql_filtByT($D);
	$qu = a_sql::query('SELECT WB0.* FROM '._ADMS::$TBSoc['ap1_owbo'].' WB0 LEFT JOIN '._ADMS::$TBSoc['ap1_wbo20'].' WB20 ON (WB20.wboId = WB0.wboId) WHERE 1 '.$whUser.' '.$wh.' GROUP BY WB0.wboId ORDER BY WB0.wboName ASC LIMIT 100');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron tableros.'); }
	else{
		while($L = $qu->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '{"DATA":['.substr($js,0,-1).'
]}';
	}
	echo $js;
}
}
}

else if($ADMS_KEY == 'List'){
if($ADMS_MET == 'PUT'){
	$wboListId = $D['wboListId']; unset($D['wboListId']);
	$wboId = $D['wboId'];
	if($wboId !='' && $wboId != 'newS'){
		$qE = a_sql::fetch('SELECT WB0.userId, MAX(WB1.wboPosic) wboPosic FROM '._ADMS::$TBSoc['ap1_owbo'].' WB0 INNER JOIN '._ADMS::$TBSoc['ap1_wbo1'].' WB1 ON (WB1.wboId = WB0.wboId) WHERE WB0.wboId=\''.$wboId.'\' LIMIT 1');
		if($qE['userId'] != a_ses::$userId){ $js = _ADMS::jsonError(3,'Solo el propietario del Tablero puede modificar las listas.'); }
	}
	if($js != ''){}
	else if($wboId ==''){ $js = _ADMS::jsonError(3,'No se ha encontrado la relación del wboId. ('.$wboId.').');}
	else if($D['listName'] == ''){ $js = _ADMS::jsonError(3,'Se debe definir un nombre para la lista.'); }
	else{
		$D['wboPosic'] = ($qE['wboPosic']) ? $qE['wboPosic']+1 : 1;
		$ins = a_sql::insert($D,array('table'=>_ADMS::$TBSoc['ap1_wbo1'],'wh_change'=>'WHERE wboListId=\''.$wboListId.'\' LIMIT 1','no_update'=>'userId,userName,dateC'));
		if($ins['err']){ $js = _ADMS::jsonError(1,$ins['err']['error_sql']); }
		else{
			$wboListId = ($ins['insertId']) ? $ins['insertId'] : $wboListId;
			$js = _ADMS::jsonResp('Información de tablero guardada correctamente.','"wboId":"'.$wboId.'"');
		}
	}
	echo $js;
}
else if($ADMS_MET == 'GET'){
	$wboId = $D['wboId'];
	if($wboId == ''){ $js = _ADMS::jsonError(5,'wboId undefined.'); }
	else{
		_ADMS::_lb('sql/filter,com/_2d');
		$WbA = array(); $Aon = array(); $Wa = array();
		$usg_Gr = '{}';
		if($wboId == 'admin'){
			$q = _5a::query('admin',$D);
			$usg_Gr = a_ses::usg_Gr();
			$qu = a_sql::query($q);
			if(a_sql::$errNo == 1){ echo _ADMS::jsonError(1,$qu['error_sql']); return ''; }
			else if(a_sql::$errNo == 2){ $A = _ADMS::jsonError(2,'No se encontraron resultados 2.'); }
			else{
				$r = $qu->num_rows; $n = 1;
				while($L = $qu->fetch_assoc()){
					$L['wboListId'] = ($L['userMember'] == $uS) ? 'member' : '';
					$L['wboListId'] = ($L['userAssg'] == $uS) ? 'assg' : $L['wboListId'];
					$L['wboListId'] = ($L['userId'] == $uS) ? 'owner' : $L['wboListId'];
					$k = $L['actId'].'_'.$L['cardId']; $kc = $L['cardId'];
					$wboK = $L['wboListId'];
					unset($L['objType']);
					$WbA[$wboK][$k] = $k;
					if(!array_key_exists($k,$Wa)){
						if(!_2d::is0($L['doDate'])) $Dates[$L['doDate']] = $L['doDate'];
						if(!_2d::is0($L['endDate'])) $Dates[$L['endDate']] = $L['endDate'];
						if(!_2d::is0($L['dueDate'])) $Dates[$L['dueDate']] = $L['dueDate'];
						$L['keyO'] = $k;
						$A .= '"'.$k.'":'.a_sql::JSON($L,'   ').",\n";
					}
					$Wa[$k] = $k;
				}
				$A = '{'.substr($A,0,-2).'}';
				$minDate = $maxDate = '';
				if(count($Dates)){ $minDate = min($Dates); $maxDate = max($Dates); }
			}
			$A = ($A!='') ? $A :'{}';
			$Ln = '{"wboListId":null}';
			$js = '{"userId":"'.a_ses::$userId.'",
 "wboId":"unboard", "wboName":"Administrador (Sys)",
 "minDate":"'.$minDate.'", "maxDate":"'.$maxDate.'",
 "usgGr":'.$usg_Gr.',
 "Aon":'.json_encode($Aon).',
 "WbA":'.json_encode($WbA).',
 "L":['.$Ln.'],
 "A":'.$A.'
}';
		}
		else if($wboId == 'unboard'){
			$q = _5a::query('unboard',$D);
			$qu = a_sql::query($q);
			if(a_sql::$errNo == 1){ echo _ADMS::jsonError(1,$qu['error_sql']); return ''; }
			else if(a_sql::$errNo == 2){ $A = _ADMS::jsonError(2,'No se encontraron resultados.'); }
			else{
				$r = $qu->num_rows; $n = 1;
				while($L = $qu->fetch_assoc()){
					$L['wboListId'] = ($L['userMember'] == $uS) ? 'member' : '';
					$L['wboListId'] = ($L['userAssg'] == $uS) ? 'assg' : $L['wboListId'];
					$L['wboListId'] = ($L['userId'] == $uS) ? 'owner' : $L['wboListId'];
					$k = $L['actId'].'_'.$L['cardId']; $kc = $L['cardId'];
					$wboK = $L['wboListId'];
					unset($L['objType']);
					$WbA[$wboK][$k] = $k;
					if(!array_key_exists($k,$Wa)){
						if(!_2d::is0($L['doDate'])) $Dates[$L['doDate']] = $L['doDate'];
						if(!_2d::is0($L['endDate'])) $Dates[$L['endDate']] = $L['endDate'];
						if(!_2d::is0($L['dueDate'])) $Dates[$L['dueDate']] = $L['dueDate'];
						$L['keyO'] = $k;
						$A .= '"'.$k.'":'.a_sql::JSON($L,'   ').",\n";
					}
					$Wa[$k] = $k;
				}
				$A = '{'.substr($A,0,-2).'}';
				$minDate = $maxDate = '';
				if(count($Dates)){ $minDate = min($Dates); $maxDate = max($Dates); }
			}
			$A = ($A!='') ? $A :'{}';
			$Ln = '{"wboListId":null}';
			$js = '{"userId":"'.a_ses::$userId.'",
 "wboId":"unboard", "wboName":"Mis Actividades (Sys)",
 "minDate":"'.$minDate.'", "maxDate":"'.$maxDate.'",
 "Aon":'.json_encode($Aon).',
 "WbA":'.json_encode($WbA).',
 "L":['.$Ln.'],
 "A":'.$A.'
}';
		}
		else if($wboId == 'unboard__v1'){
			$q = _5a::query('unboard',$D);
			$qu = a_sql::query($q);
			if(a_sql::$errNo == 1){ echo _ADMS::jsonError(1,$qu['error_sql']); return '';}
			else if(a_sql::$errNo == 2){ $Li = _ADMS::jsonError(2,'No se encontraron resultados.'); }
			else{
				$r = $qu->num_rows; $n = 1;
				while($L = $qu->fetch_assoc()){
					$L['wboListId'] = ($L['userMember'] == $uS) ? 'member' : '';
					$L['wboListId'] = ($L['userAssg'] == $uS) ? 'assg' : $L['wboListId'];
					$L['wboListId'] = ($L['userId'] == $uS) ? 'owner' : $L['wboListId'];
					$k = $L['actId']; $kc = $L['cardId'];
					$wboK = $L['wboListId'];
					unset($L['objType'],$L['cardName'],$L['cardId']);
					$WbA[$wboK][$k] = $k;
					if(!array_key_exists($k,$Wa)){
						if(!_2d::is0($L['doDate'])) $Dates[$L['doDate']] = $L['doDate'];
						if(!_2d::is0($L['endDate'])) $Dates[$L['endDate']] = $L['endDate'];
						if(!_2d::is0($L['dueDate'])) $Dates[$L['dueDate']] = $L['dueDate'];
						$L['keyO'] = $k;
						$A .= '"'.$k.'":'.a_sql::JSON($L,'   ').",\n";
					}
					$Wa[$k] = $k;
				}
				$A = '{'.substr($A,0,-2).'}';
				$minDate = $maxDate = '';
				if(count($Dates)){ $minDate = min($Dates); $maxDate = max($Dates); }
			}
			$A = ($A!='') ? $A :'{}';
			$Ln = '{"wboListId":"owner","listName":"Propietario"},{"wboListId":"assg","listName":"Responsable"},{"wboListId":"member","listName":"Miembro"}';
			$js = '{"userId":"'.a_ses::$userId.'",
 "wboId":"unboard", "wboName":"Mis Actividades 2",
 "minDate":"'.$minDate.'", "maxDate":"'.$maxDate.'",
 "Aon":'.json_encode($Aon).',
 "WbA":'.json_encode($WbA).',
 "L":['.$Ln.'],
 "A":'.$A.'
}';
		}
		else{
		$whUser = (a_ses::$user == 'supersu') ? '' : $whPerm;
		$qBPerm = a_sql::query('SELECT WB0.wboPriv, WB0.userId, WB20.userId FROM '._ADMS::$TBSoc['ap1_owbo'].' WB0 LEFT JOIN '._ADMS::$TBSoc['ap1_wbo20'].' WB20 ON (WB20.wboId = WB0.wboId) WHERE WB0.wboId =\''.$wboId.'\' '.$whUser.' LIMIT 1');
		if(a_sql::$errNo == 1){ $js = ADMS::jsonError(1,'workBoard Perm.: '.$qBPerm['error_sql']); }
		else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No tiene permisos para ver este tablero ('.$D['wboId'].').'); }
		else{
			$quBoards = a_sql::query('SELECT WB0.wboId, WB0.wboName, WB1.wboListId, WB1.actTotal, WB1.actOpen, WB1.listName, WB1.listColor FROM '._ADMS::$TBSoc['ap1_owbo'].' WB0 LEFT JOIN '._ADMS::$TBSoc['ap1_wbo1'].' WB1 ON (WB1.wboId = WB0.wboId) WHERE WB0.wboId =\''.$wboId.'\' ORDER BY WB1.wboPosic ASC, WB1.wboListId ASC');
			$Mx = array();
			$Li= ''; $Ln = '';
			if(a_sql::$errNo == 1){ 
			echo _ADMS::jsonError(1,$quBoards['error_sql']); return ''; }
			else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron listas definidas para el tablero. ('.$wboId.')','"wboId":"'.$wboId.'",'); }
			else{
				$Dates = array();
				$uniqueTask = array();
				$k = 0;
				while($L=$quBoards->fetch_assoc()){
					$wboId = $L['wboId']; $wboName = $L['wboName'];
					$Ln .= a_sql::JSON($L).',';
					$k++;
				}
				$qu = a_sql::query(_5a::query($wboId,$D));
				if(a_sql::$errNo == 1){ echo _ADMS::jsonError(1,$qu['error_sql']); return ''; }
				else if(a_sql::$errNo == 2){ $Li = _ADMS::jsonError(2,'No se encontraron resultados.'); }
				else{
					$r = $qu->num_rows; $n = 1;
					while($L = $qu->fetch_assoc()){
						$k = $L['actId']; $kc = $L['cardId'];
						$wboK = $L['wboListId'];
						unset($L['objType']);
						if($k!=''){ $WbA[$wboK][$k] = $k; }
						if(!array_key_exists($k,$Wa)){
							if(!_2d::is0($L['doDate'])) $Dates[$L['doDate']] = $L['doDate'];
							if(!_2d::is0($L['endDate'])) $Dates[$L['endDate']] = $L['endDate'];
							if(!_2d::is0($L['dueDate'])) $Dates[$L['dueDate']] = $L['dueDate'];
							$L['keyO'] = $k;
							$A .= '"'.$k.'":'.a_sql::JSON($L,'   ').",\n";
						}
						$Wa[$k] = $k;
					}
					$A = '{'.substr($A,0,-2).'}';
				}
				$A = ($A!='') ? $A :'{}';
				$minDate = $maxDate = '';
				if(count($Dates)){ $minDate = min($Dates); $maxDate = max($Dates); }
				$WbA = (count($WbA)==0)?'{}':json_encode($WbA);
				$js = '{
 "wboId":"'.$wboId.'", "wboName":"'.$wboName.'",
 "minDate":"'.$minDate.'", "maxDate":"'.$maxDate.'",
 "Aon":'.json_encode($Aon).',
 "WbA":'.$WbA.',
 "L":['.substr($Ln,0,-1).'],
 "A":'.$A.'
}';
			}
		}
		}
	}
	if(a_ses::$ocardSocId == 2){ echo ''; }
	echo $js;
}
}

else if($ADMS_KEY == 'R'){
	if($ADMS_MET == 'GET'){
		$q = a_sql::query('SELECT WB0.wboId,WB0.wboName, WB1.wboListId, WB1.listName,WB1.wboPosic FROM '._ADMS::$TBSoc['ap1_wbo10'].' WB10 INNER JOIN '._ADMS::$TBSoc['ap1_wbo1'].' WB1 ON (WB1.wboListId = WB10.wboListId) INNER JOIN '._ADMS::$TBSoc['ap1_owbo'].' WB0 ON (WB0.wboId = WB1.wboId) WHERE WB10.actId=\''.$D['actId'].'\' ORDER BY WB0.wboName ASC, WB1.wboPosic ASC');
		if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$ins['error_sql']); }
		else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron relaciones ('.$D['actId'].').'); }
		else{
			while($L=$q->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
			$js = '{"DATA":['.substr($js,0,-1).'
]}';
		}
		echo $js;
	}
	else if($ADMS_MET == 'PUT'){
		if($D['wboListId'] == ''){ $js = _ADMS::jsonError(5,'No se ha encontrado wboListId ('.$D['wboListId'].').'); }
		else if($D['actId'] == ''){ $js = _ADMS::jsonError(5,'No se ha encontrado la actividad ('.$D['actId'].').'); }
		else{
			_ADMS::_lb('com/_6');
			$authRel = _5b::authRel($D);
			if($authRel != ''){ $js = $authRel; }
			else{
				$ins = _5b::add2List($D);
				if($ins['err']){ $js = _ADMS::jsonError(1,$ins['err']['error_sql']); }
				else if($ins['num_rows'] >0){ $js = _ADMS::jsonResp('La actividad ya existe en la lista.'); }
				else{
				$action = ($ins['insertId']) ? '++' : '';
				$action = ($D['delete']) ? '--' : $action;
				$o = array('o'=>'no','delete'=>$D['delete'],
				'objType'=>_o::$Ty['activity'],'objRef'=>$D['actId'],'targetType'=>_o::$Ty['wboList'],'targetRef'=>$D['wboListId']);
				$jsResp = array('text'=>'Lista de Tablero Actualizada');
				$js = _6::ouFn($o,$jsResp);
				}
			}
		}
		echo $js;
	}
}
else{ echo _ADMS::jsonError(5,'ApiKey unknown: '.$ADMS_KEY.'.'); }
mysqli_close(a_sql::$DB);
?>