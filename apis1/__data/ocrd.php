<?php
header('Content-Type: application/json');
$D = ($_GET['_getIsPost']) ? $_GET : $_POST;
_ADMS::_lb('com/_ocrd');
if($ADMS_KEY == 'o'){
if($ADMS_KEYo[1] == 'cardId'){
	if($ADMS_MET == 'GET'){
		$fields = '*'; $cardId = $D['cardId'];
		$q = a_sql::fetch('SELECT '.$fields.' FROM '._ADMS::$TBSoc['par_ocrd'].' WHERE cardId=\''.$cardId.'\' LIMIT 1');
		if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$q['error_sql']); }
		else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontró el socio '.$cardId.'.'); }
		else{
			$addr = a_sql::query('SELECT A11.* FROM '._ADMS::$TBSoc['par_crd11'].' A11 WHERE A11.cardId=\''.$cardId.'\' ORDER BY lineNum ASC');
			if(a_sql::$errNo == -1){ while($l = $addr->fetch_assoc()){ $q['Address'] .= a_sql::JSON($l).','; }
				$q['Address'] = '['.substr($q['Address'],0,-1).']';
			}
			$addr = a_sql::query('SELECT A12.* FROM '._ADMS::$TBSoc['par_crd12'].' A12 WHERE A12.cardId=\''.$cardId.'\' ORDER BY lineNum ASC');
			if(a_sql::$errNo == -1){ while($l = $addr->fetch_assoc()){ $q['Phones'] .= a_sql::JSON($l).','; }
				$q['Phones'] = '['.substr($q['Phones'],0,-1).']';
			}
			$addr = a_sql::query('SELECT A13.* FROM '._ADMS::$TBSoc['par_crd13'].' A13 WHERE A13.cardId=\''.$cardId.'\' ORDER BY lineNum ASC');
			if(a_sql::$errNo == -1){ while($l = $addr->fetch_assoc()){ $q['Emails'] .= a_sql::JSON($l).','; }
				$q['Emails'] = '['.substr($q['Emails'],0,-1).']';
			}
			$js = a_sql::JSON($q);
			}
		echo $js;
	}
}
else if($ADMS_KEYo[1] == 'address'){
	if($ADMS_MET == 'GET'){
		$cardId = $D['cardId'];
		$q = a_sql::query('SELECT A.cardId,A11.addrName,A11.country,A11.address FROM '._ADMS::$TBSoc['par_ocrd'].' A INNER JOIN '._ADMS::$TBSoc['par_crd11'].' A11 ON (A11.cardId=A.cardId) WHERE A.cardId=\''.$cardId.'\' ');
		if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$q['error_sql']); }
		else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontró el cliente '.$cardId.'.'); }
		else{
			while($L = $q->fetch_assoc()){
				$k = $L['address'];
				$k .= ($L['city']!='') ? ', '.$L['city'] : '';
				$k .= ($L['country']!='') ? ', '.$L['country'] : '';
				$js .= '"'.$k.'":"('.$L['addrName'].') '.$k.'",';
			}
			$js = '{'.substr($js,0,-1).'}';
		}
		echo $js;
	}
}
else{
	if($ADMS_MET == 'GET') echo _ocrd::get($D);
	else if($ADMS_MET == 'PUT') echo _ocrd::put($D);
}
}

else if($ADMS_KEY == 'Members'){//AuTypes
_ADMS::_lb('com/_ocrd_members');
if($ADMS_MET == 'PUT') echo _ocrd_members::put($D);
else if($ADMS_MET == 'GET') echo _ocrd_members::get($D);
}

else if($ADMS_KEY == 'Vars'){
$_ADMS_TBSoc = 'par_var1';
if($ADMS_MET == 'GET'){
	$q = a_sql::query('SELECT * FROM '.$_ADMS_TBSoc.' WHERE cardId=\''.$D['cardId'].'\' ');
	if(a_sql::$errNo==1){ $js = _ADMS::jsonError(1,'Error obteniendo otros datos del cliente: '.$q['error_sql']); }
	else if(a_sql::$errNo==2){ $js = _ADMS::jsonError(2,'No se encontraron datos definidos.'); }
	else{
		$js = '';
		while($L=$q->fetch_assoc()){
			$js .= '"'.$L['varCode'].'":"'.$L['value'].'",';
		}
		$js = '{"V":{'.substr($js,0,-1).'}}';
	}
	echo $js;
}
else if($ADMS_MET == 'PUT'){
	if(_js::isse($D['cardId'])){ $js = _ADMS::jsonError(3,'No se encontró cardId.'); }
	else{
		$js = _ADMS::jsonResp('Ningun dato enviado');
		if(is_array($D['V'])){ $err = 0; $n = 0;
			foreach($D['V'] as $varCode=>$val){ $n++;
				$D2 = array('cardId'=>$D['cardId'],'varCode'=>$varCode,'value'=>$val);
				$ins = a_sql::insert($D2,array('table'=>$_ADMS_TBSoc,'wh_change'=>'WHERE cardId=\''.$D2['cardId'].'\' AND varCode=\''.$varCode.'\' LIMIT 1'));
				if($ins['err']){ $js = _ADMS::jsonError(1,'Error guardando información en Linea '.$n.': '.$ins['err']['error_sql']); $err++; break; }
			}
			if($err ==0){ $js = _ADMS::jsonResp('Se guardo la información correctamente.'); }
		}
	}
	echo $js;
}
}

else if($ADMS_KEY == 'GrD'){ 
if($ADMS_KEYo[1]=='Cards'){
if($ADMS_MET=='PUT'){
	$groupId = $D['groupId'];
	if(_js::isse($groupId)){ $js = _ADMS::jsonError(3,'No se encontró la ID del grupo donde se va a relacionar.'); }
	else{
		$ins = a_sql::insert($D,array('table'=>_0s::$Tb['par_cgr1'],'wh_change'=>'WHERE groupId=\''.$groupId.'\' AND cardId=\''.$D['cardId'].'\' LIMIT 1',
		'jsdie_err'=>'Error relacionado socio.'));
		$groupId = ($ins['insertId'])?$ins['insertId']:$groupId;
		$js = _ADMS::jsonResp('Socio relacionado correctamente.','"groupId":"'.$groupId.'"');
	}
	echo $js;
}
else if($ADMS_MET=='GET'){
	if(_js::isse($D['groupId'])){ die(_ADMS::jsonError(4,'No se encontró ID del grupo.')); }
	$q = a_sql::query('SELECT G1.id, G1.cardId, ocrd.cardName, ocrd.licTradNum, ocrd.userName, ocrd.userAssgName FROM '._0s::$Tb['par_cgr1'].' G1 INNER JOIN '._0s::$Tb['par_ocrd'].' ocrd ON (ocrd.cardId = G1.cardId) WHERE G1.groupId=\''.$D['groupId'].'\' ORDER BY ocrd.cardName ASC LIMIT 200',array('errNo'=>array(1=>'Error obteniendo socios del grupo: ',2=>'No se encontraron socios en el grupo.')) );
	if(a_sql::$errNoText){ $js = a_sql::$errNoText; }
	else{
		while($L=$q->fetch_assoc()){
			$js .= a_sql::JSON($L).',';
		}
		$js = '{"L":['.substr($js,0,-1).']}';
	}
	echo $js;
}
else if($ADMS_MET=='DELETE'){
	if(_js::isse($D['id'])){ die(_ADMS::jsonError(4,'No se encontró ID para eliminar.')); }
	else{
		$qd = a_sql::query('DELETE G1 FROM '._0s::$Tb['par_cgr1'].' G1 INNER JOIN '._0s::$Tb['par_ocgr'].' G0 ON (G0.groupId = G1.groupId AND G1.id=\''.$D['id'].'\' '.a_ses::get_owh('G0').') ');
		if(a_sql::$errNo==1){ $js = _ADMS::jsonError(1,'Error eliminado socio del grupo: '.$qd['error_sql']); }
		else{ $js = _ADMS::jsonResp('Socio eliminado del grupo','"id":"'.$D['id'].'"'); }
	}
	echo $js;
}
}
else{
if($ADMS_MET=='GET'){
	$q = a_sql::query('SELECT * FROM '._0s::$Tb['par_ocgr'].' ORDER BY groupName ASC LIMIT 200',array('errNo'=>array(1=>'Error obteniendo grupos: ',2=>'No se encontraron grupos')) );
	if(a_sql::$errNoText){ $js = a_sql::$errNoText; }
	else{
		while($L=$q->fetch_assoc()){
			$js .= a_sql::JSON($L).',';
		}
		$js = '{"L":['.substr($js,0,-1).']}';
	}
	echo $js;
}
else if($ADMS_MET=='PUT'){
	$groupId = $D['groupId']; unset($D['groupId']);
	if(_js::isse($D['groupName'])){ $js = _ADMS::jsonError(3,'Se debe dar un nombre al grupo'); }
	else{
		$ins = a_sql::insert($D,array('ou_dateC'=>1,'table'=>_0s::$Tb['par_ocgr'],'wh_change'=>'WHERE groupId=\''.$groupId.'\' LIMIT 1','no_update'=>'dateC,userId,userName',
		'jsdie_err'=>'Erro guardando información del grupo: '));
		$groupId = ($ins['insertId'])?$ins['insertId']:$groupId;
		$js = _ADMS::jsonResp('Grupo guardado correctamente.','"groupId":"'.$groupId.'"');
	}
	echo $js;
}
}
}
?>