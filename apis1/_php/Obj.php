<?php
class Obj{
static $err=false;
static $A=array();
static $errText='';
static $usersLimit=100;
static $sTy=array();
/*gtdList{otb, tb2:members
fieId:id, fieStatus:'status',
St:{A:'Lista archivada no se puede modificar'}
*/
static $D=array(); /* save data temp */
static public function _r(){ self::$err=false; }
static public function g($oTy=''){
	if(array_key_exists($oTy,self::$sTy)){
		$A=self::$sTy[$oTy];
		return $A['gid'];
	}
	return $oTy;
}
static public function getTb($P=array()){
	$oTy=$P['oTy']; self::$A=array();
	$otb=$tb1=$tb2='';
	if(array_key_exists($oTy,self::$sTy)){
		$A=self::$sTy[$oTy];
		$otb=$A['otb']; $tb1=$A['tb1']; $tb2=$A['tb2'];
	}
	else if($oTy!=''){ self::$err=true; self::$errText= _js::e(3,'El tipo de objeto {{'.$oTy.'}} no tiene acciones definidas.'); }
	else{ self::$err=true; self::$errText= _js::e(3,'No se ha definido tipo de objeto para realizar acciones ('.$oTy.'). Obj::getTb'); }
	$A['otb']=_0s::$Tb[$otb];
	self::$A=$A;
	return $A;
}
static public function status($P=array()){
	//devuelve false i todo ok
	$A=self::getTb($P);
	if(self::$err){ return self::$errText; }
	$fieId=$A['gid'];
	$gid=$P['gid'];
	$fies=($P['fie'])?','.$P['fie']:'';
	$fieStatus=($A['fieStatus'])?$A['fieStatus']:'status';
	if($js=_js::ise($gid,'Se debe definir el número de gid. Obj::status')){ return $js; }
	else if(!is_array($A['St'])){ return _js::e(3,'El objeto no tiene A[St] definidos on Obj::status.'); }
	$q=a_sql::fetch('SELECT '.$fieStatus. $fies.' FROM '.$A['otb'].' WHERE '.$fieId.'=\''.$gid.'\' LIMIT 1',array(1=>'Error obteniendo estado del objeto.',2=>'El objeto '.$gid.' no existe.'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{
		if($P['D']=='Y'){ self::$D=$q; }
		foreach($A['St'] as $kStatus=>$err){
			if($kStatus==$q[$fieStatus]){ return _js::e(3,$err); }
		}
	}
	return $js;
}
static public function owner($P=array()){
	$A=self::getTb($P);
	if($A['errNo']){ return _js::e($A); }
	$fieId=$A['gid']; $userId=a_ses::$userId;
	$gid=$P['gid'];
	$fies=($P['fie'])?','.$P['fie']:'';
	$obR='"__o":{"oTy":"'.$P['oTy'].'","gid":"'.$gid.'"}';
	$fieStatus=($A['fieStatus'])?$A['fieStatus']:'status';
	$wh=($P['wh'])?'AND '.$P['wh']:'';
	$userType=($P['userType'])?$P['userType']:'M';
	$whB =' AND (B2.userId=\''.$userId.'\' AND B2.userType=\''.$userType.'\')';
	$userTypeN=($A['userTypes'] && $A['userTypes'][$P['userType']])?$A['userTypes'][$P['userType']]:$P['userType'];
	$fies='A.userId userOwner';
	if($P['oTy']=='gtdTask'){ $fies .=',A.userAssg'; }
	$fies .=',B2.userId,B2.userType';
	if($js=_js::ise($gid,'Se debe definir el número de gid. Obj::status')){ return $js; }
	$q=a_sql::fetch('SELECT '.$fies.' FROM '.$A['otb'].' A LEFT JOIN '.$A['tb2'].' B2 ON (B2.'.$fieId.' = A.'.$fieId.' '.$whB.') WHERE A.'.$fieId.'=\''.$gid.'\' '.$wh.' LIMIT 1',array(1=>'Error obteniendo miembros del objeto Obj::owner(): ',2=>'El objeto '.$gid.' no existe.','addJs'=>$obR));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{
		$errs=array();
		$errs['member']=($P['memberText'])?$P['memberText'].' Obj::Owner':'No es miembro del objeto.';
		$errs['coText']=($P['coText'])?$P['coText'].' Obj::Owner':'Solo un usuario con permisos de propietario puede modificar la información.';
		$errs['assgText']=($P['assgText'])?$P['assgText'].' Obj::Owner':'Solo un usuario asignado o con permisos de propietario puede modificar la información.';
		$isOwner=($q['userOwner']==$userId);
		$isAssg=($q['userAssg']==$userId);
		$isCoOwner=($q['userType']=='co');
		$isMember=($q['userId']==$userId || $q['userAssg']==$userId);
		switch($P['es']){
			case 'member': 
			if(!$isOwner && !$isMember){ return _js::e(3,$errs['member'],$obR); }
			break;
			case 'assg': 
			if(!$isOwner && !$isAssg){ return _js::e(3,$errs['assgText'],$obR); }
			break;
			case 'owner':
			if(!$isOwner){ return _js::e(3,'Solo el propietario del objeto puede modificar la información.',$obR); }
			break;
			case 'userType':
			if($q['userType']!=$P['userType']){ return _js::e(3,'Solo un usuario de tipo '.$userTypeN.' puede modificar la información.',$obR); }
			break;
			case 'co':
			if(!$isCoOwner){ return _js::e(3,$errs['coText'],$obR); }
			break;
			default:
			if(!$isOwner && !$isCoOwner){ return _js::e(3,$errs['coText'],$obR); }
			break;
		}
	}
	return false;
}
static public function member($P=array()){
	$P['es']='member';
	return self::owner($P);
}
static public function ownerA($P=array()){/* propieta en varios objcto */
	$A=($P[0])?$P[0]:array('gid'=>0);
	$B=($P[1])?$P[1]:array('gid'=>0);
	if($A['gid']!=0 && $js=Obj::member(array('oTy'=>$A['oTy'],'gid'=>$A['gid'],'coText'=>$A['coText']))){ return $js; }
	else if($B['gid']!=0 && $js=Obj::member(array('oTy'=>$B['oTy'],'gid'=>$B['gid'],'coText'=>$B['coText']))){ return $js; }
	return false;
}
static public function perms($P=array()){/* propieta en varios objectos */
	$A=$P[0];
	$B=$P[1];
	if($A['gid']!=0 && $js=Obj::member($A)){ return $js; }
	else if($A['gid']==0 && $js=Obj::member($B)){ return $js; }
	return false;
}

static public function users($P=array()){
	self::_r(); $A=self::getTb($P); 
	if(self::$err){ return self::$errText; }
	$fieId=$A['gid']; $userId=a_ses::$userId;
	$gid=$P['gid'];
	$wh=($P['wh'])?'AND '.$P['wh']:'';
	if($js=_js::ise($gid,'Se debe definir el número de gid. Obj::users')){ self::$err=true; self::$errText=$js; return self::$err; }
	$q=a_sql::query('SELECT A.userId userOwner,B2.userId,B2.userType 
FROM '.$A['otb'].' A 
LEFT JOIN '.$A['tb2'].' B2 ON (B2.'.$fieId.' = A.'.$fieId.') 
WHERE A.'.$fieId.'=\''.$gid.'\' '.$wh.' 
LIMIT '.self::$usersLimit.'',array(1=>'Error obteniendo miembros del objeto.',2=>'El objeto '.$gid.' no existe.'));
	if(a_sql::$err){ self::$err=true; self::$errText= a_sql::$errNoText; }
	else{
		$U=array(); $n=0;
		while($L=$q->fetch_assoc()){
			if($n==0){ $U[]=array('userId'=>$L['userOwner'],'userType'=>'owner'); $n=1; }
			if($L['userId']!='' && $L['userId']!='null'){
				$U[]=array('userId'=>$L['userId'],'userType'=>$L['userType']);
			}
		}
		return $U;
	}
	return self::$err;
}

static public function _99($tbk,$D=array()){
	$upd=true;
	if(array_key_exists('qRes',$D)){
		if($D['qRes']['affected_rows']>0){ $upd=true; }
		else{ $upd=false; }
	}
	if(array_key_exists('affected_rows',$D) && $D['affected_rows']==0){ $upd=false; }
	if($upd){
		unset($D['qRes'],$D['affected_rows']);
		$ins=a_sql::insert($D,array('tbk'=>$tbk,'kui'=>'uid_dateC','qDo'=>'insert'));
		if($ins['err']){ return ',"_log":{"errNo":"1"}'; }
		else{ return ',"_log":"Y"'; }
	}
}
static public function logg($act='',$D=array(),$ins=false){
	//D{gid,vb,vto}
	$tbk=false;
	$k=$act.'_'.$D['oTy']; unset($D['oTy']);
	switch($k){
		case 'comment_gtdTask': $tbk='gtd_tas99'; break;
	}
	if($D['tbk']){ $tbk=$D['tbk']; unset($D['tbk']); }
	if($tbk==false){ return _js::e(3,'act ('.$act.') not defined on Obj::logg.'); }
	$upd=true;
	if(is_array($ins)){
		if($ins['affected_rows']>0){ $upd=true; }
		else{ $upd=false; }
	}
	if($upd){
		$ins=a_sql::insert($D,array('tbk'=>$tbk,'kui'=>'uid_dateC','qDo'=>'insert'));
		if($ins['err']){ return ',"_log":{"errNo":"1"}'; }
		else{ return ',"_log":"Y"'; }
	}
}

static public function perm($P=array()){
	$A=self::getTb($P);
	if($A['errNo']){ return _js::e($A); }
	$fieId=$A['gid']; $gid=$P['gid']; $userId=a_ses::$userId;
	$fies=($P['fie'])?','.$P['fie']:'';
	$obR='"__o":{"oTy":"'.$P['oTy'].'","gid":"'.$gid.'"}';
	$fieStatus=($A['fieStatus'])?$A['fieStatus']:'status';
	$wh=($P['wh'])?'AND '.$P['wh']:'';
	$userType=($P['userType'])?$P['userType']:'M';
	$whB =' AND (A2.userId=\''.$userId.'\' AND A2.userType=\''.$userType.'\')';
	$userTypeN=($A['userTypes'] && $A['userTypes'][$P['userType']])?$A['userTypes'][$P['userType']]:$P['userType'];
	$fies='A.userId';
	if($P['oTy']=='gtdTask'){ $fies .=',A.userAssg'; }
	$fies .=',A2.userId userId2,A2.userType';
	if($js=_js::ise($gid,'Se debe definir el número de gid. Obj::status')){ return $js; }
	$q=a_sql::fetch('SELECT '.$fies.' FROM '.$A['otb'].' A 
	LEFT JOIN '.$A['tb2'].' A2 ON (A2.'.$fieId.' = A.'.$fieId.' '.$whB.') 
	WHERE A.'.$fieId.'=\''.$gid.'\' '.$wh.' LIMIT 1',array(1=>'Error obteniendo miembros del objeto Obj::perm(): ',2=>'El objeto {'.$P['oTy'].'.'.$gid.'} no existe on Obj::perm.','addJs'=>$obR));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{
		$errs=array();
		$errs['member']=($P['memberText'])?$P['memberText'].' Obj::Owner':'No es miembro del objeto.';
		$errs['coText']=($P['coText'])?$P['coText'].' Obj::Owner':'No tiene permisos de propietario para esta acción.';
		$errs['assgText']=($P['assgText'])?$P['assgText'].' Obj::Owner':'No tiene permisos de propietario o usuario asignado para esta acción.';
		$isOwner=($q['userId']==$userId);
		$isAssg=($q['userAssg']==$userId);
		$isCoOwner=($q['userType']=='co');
		$isMember=($q['userId']==$userId || $q['userAssg']==$userId);
		switch($P['is']){
			case 'member': 
			if(!$isOwner && !$isMember){ return _js::e(3,$errs['member'],$obR); }
			break;
			case 'assg': 
			if(!$isOwner && !$isAssg){ return _js::e(3,$errs['assgText'],$obR); }
			break;
			case 'owner':
			if(!$isOwner){ return _js::e(3,'No tiene permisos de propietario para esta acción.',$obR); }
			break;
			case 'userType':
			if($q['userType']!=$P['userType']){ return _js::e(3,'Solo un usuario de tipo '.$userTypeN.' puede modificar la información.',$obR); }
			break;
			case 'co':
			if(!$isCoOwner){ return _js::e(3,$errs['coText'],$obR); }
			break;
			default:
			if(!$isOwner && !$isCoOwner){ return _js::e(3,$errs['coText'],$obR); }
			break;
		}
	}
	return false;
}


/* extends obj form task_perms */
}
?>