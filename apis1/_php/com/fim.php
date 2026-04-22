<?php
$GLOBALS['n'] = 0;
class FIM {
static function Fo_readMembers($P=array()){
	$M = array();
	$M[] = array('userId'=>$P['userId'],'userName'=>$P['userName'],'userType'=>'owner');
	$k = $P['privacity'];
	switch($k){
		case 'members' : $qt = 'SELECT Usr.userId, Usr.userName, \'member\' userType  FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' Usr INNER JOIN '._ADMS::$TBSoc['ap3_fim2'].' F2 ON (F2.userId = Usr.userId) WHERE F2.fimId =\''.$P['fimId'].'\' ORDER BY Usr.userName '; break;
		case 'cardPublic' : $M[$k] = array('ocardId'=>a_ses::$ocardId); break;
		case 'socPublic' : $M[$k] = array('ocardId'=>a_ses::$ocardId,'osocId'=>a_ses::$ocardSocId); break;
	}
	if($qt!=''){
		$q = a_sql::query($qt);
		if(a_sql::$errNo == -1) while($L=$q->fetch_assoc()){
			$M[] = $L;
		}
	}
	return $M;
}

static function Fo_perms($fimId=0,$P=array()){
	//se debe relacionar tabla Usm
	$whPerms = 'AND (
(F0.userId =\''.a_ses::$userId.'\') OR 
(F0.privacity =\'private\' AND F0.userId =\''.a_ses::$userId.'\') OR 
(F0.privacity=\'members\' AND obj1.userId=\''.a_ses::$userId.'\') OR
(F0.privacity=\'cardPublic\' AND F0.ocardId = \''.a_ses::$ocardId.'\' AND F0.ocardId = \''.a_ses::$ocardId.'\' AND Usm.userId=\''.a_ses::$userId.'\' ) OR
(F0.privacity=\'socPublic\' AND F0.ocardId = \''.a_ses::$ocardId.'\' AND F0.osocId = \''.a_ses::$ocardSocId.'\' AND F0.ocardId = \''.a_ses::$ocardId.'\' AND F0.osocId = \''.a_ses::$ocardSocId.'\' AND Usm.userId=\''.a_ses::$userId.'\' )
)';
	if($fimId=='getWh'){ return $whPerms; }
	$q = a_sql::fetch('SELECT F0.*, F0_.name parentFolderName, obj1.userId userMemberId, Usr.userName userMemberName, obj1.perms FROM '._ADMS::$TBSoc['A0_par_ousm'].' Usm, '._ADMS::$TBSoc['ap3_ofim'].' F0
	LEFT JOIN '._ADMS::$TBSoc['ap3_ofim'].' F0_ ON (F0_.fimId = F0.parentFolder) 
	LEFT JOIN '._ADMS::$TBSoc['ap0_obj1'].' obj1 ON (obj1.objType=\''._o::$Ty['fimId'].'\' AND obj1.objRef = F0.fimId) 
	LEFT JOIN '._ADMS::$TBSoc['A0_vs0_ousr'].' Usr ON (Usr.userId = obj1.userId ) 
	WHERE F0.fimId=\''.$fimId.'\' '.$whPerms.'
	 LIMIT 1');
	if(a_sql::$errNo==1){ $js = array('errNo'=>1,'text'=>'Error obteniendo información de Carpeta {Fo_perms}: '.$q['error_sql']); }
	else if(a_sql::$errNo==2){
		$qFP = a_sql::fetch('SELECT F0.parentFolder FROM '._ADMS::$TBSoc['ap3_ofim'].' F0 WHERE F0.fimId= \''.$fimId.'\'LIMIT 1');
		if(a_sql::$errNo==1){ $js = array('errNo'=>1,'text'=>'Error obteniendo información de Carpeta-2 {Fo_perms}: '.$qFP['error_sql']); }
		else if(a_sql::$errNo==2){ $js = array('errNo'=>2,'text'=>'Sin resultados de carpeta ('.$fimId.')'); }
		else{ $js = $qFP;}
	}
	else{
		$userOwn = ($q['userId'] == a_ses::$userId)?'Y':'N';
		$userMember = ($q['userMemberId'] == a_ses::$userId)?'Y':'N';
		$userCan = ($userOwn=='Y')?'write' :'none';
		$userCan = ($userMember=='Y')?$q['perms'] :$userCan;
		$q['userOwn'] = $userOwn;
		$q['userMember'] = $userMember;
		if($userOwn=='Y'){ $q['permsLike'] = 'owner'; }
		else if(preg_match('/(cardPublic|socPublic)/',$q['privacity'])){ $q['permsLike'] = $q['privacity']; }
		else if($userMember=='Y'){ $q['permsLike'] = 'member'; }
		else{ $q['permsLike'] = 'null'; }
		if($P['getMembers'] == 'Y'){
			$q['Members'] = self::Fo_readMembers($q);
		}
		$js = $q; unset($q);
	}
	return $js;
}

static function _userPerms($P=array(),$D=array()){
	$userCan = ($P['userMember']=='Y')?$P['perms'] :'none';
	$a = $D['action']; $pLi = $P['permsLike'];
	$fimId = ' ('.$P['fimId'].')';
	$permCode = $pLi.'.'.$userCan;
	$r = array();
	if($pLi == 'cardPublic' || $pLi == 'socPublic'){ $userCan = 'read'; $permCode = $pLi.'.'.$userCan; }
	if($pLi =='owner'){ $permCode = 'Owner.write';
		$r = array('ok'=>1,'text'=>'Propietario de Carpeta');
	}
	else if(preg_match('/(uploadFile|quitFile)/',$a) && !preg_match('/^(write|writeQuit|writeFileUser|coowner)$/',$userCan)){
		$r = array('errNo'=>'3_4','text'=>'No tiene permisos de escritura en está carpeta.'.$fimId.': '.$permCode);
	}
	else if(preg_match('/(deleteFile)/',$a) && !preg_match('/^(write|writeFileUser|coowner)$/',$userCan)){ 
		$r = array('errNo'=>'3_4','text'=>'No tiene permisos para eliminar archivos de esta carpeta '.$fimId.': '.$permCode);
	}
	else if($userCan=='' || $userCan=='none'){ $r = array('errNo'=>'3_4','text'=>'No tiene permisos suficientes ('.$userCan.') para realizar la acción.'.$fimId); }
	else { $r = array('ok'=>true,'text'=>'Permiso desconocido '.$userCan.''); }
	return $r;
}

static function _folderTopUser($P=array(),$D=array()){
	if($P['errNo'] ==1){ return $P; }
	if(_js::isse($P['parentFolder'])){ return array('errNo'=>3,'text'=>'No se encontrol parentFolder. '.$P['parentFolder'].'.'); }
	$q = self::Fo_perms($P['parentFolder']);;
	$GLOBALS['n'] += 1;
	if($D['openFolder'] && array_key_exists('permsLike',$q) && $q['permsLike'] !='null'){ return self::_userPerms($q,$D); }
	else if(array_key_exists('permsLike',$q) && $q['permsLike'] !='null'){ return self::_userPerms($q,$D); }
	else if($GLOBALS['n']<15){
		if(array_key_exists('parentFolder',$q) && $q['parentFolder'] == 0){ 
			return self::_userPerms($q,$D);
		}
		else if($q['errNo'] == 2){ return $q; }
		else{ return self::_folderTopUser($q,$D); }
	}
	else{ $GLOBALS['n'] = 0;}
}

static function Fo_readLev($fimId=0){
	$q = a_sql::fetch('SELECT fimId,lev FROM '._ADMS::$TBSoc['ap3_ofim'].' WHERE fimId='.$fimId.' LIMIT 1');
	if(a_sql::$errNo == 1){ $qt = array('errNo'=>1,'text'=>'Error: '.$q['error_sql']); }
	else if(a_sql::$errNo == 2){ $qt = array('errNo'=>2,'text'=>'Sin resultados'); }
	else{
		$qt = 'F0.lev=('.($q['lev']+1).') AND F0.parentFolder=\''.$fimId.'\' ';
	}
	return $qt;
} 

}
$FOP = array(
'read'=>'Ver archivos de carpeta sin ejecución',
'readEx'=>'Ver y ejecutar archivos de la carpeta',
'writeQuit'=>'Escribir en la carpeta subir, agregar y quitar sin eliminar archivo',
'writeFileUser'=>'writeQuit+ posibilidad de eliminar el archivo si pertenece al usuario',
'write'=>'writeQuit+ eliminar archivo de carpeta sin importar el usuario'
);
?>