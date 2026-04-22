<?php
class a_ses{
static $NOLOGIN = false;
static $R=array(); //ult respuesta
static $Tok=array();//guarda datos de tooken
static $ocardId, $ocardSocId, $ocardCode, $ocardName;
static public $user, $userId, $userName, $userRol, $userTeam, $userType, $userDpto, $userOfficName, $userSubType, $slpCode;
static $isSuper = false;
static $whOcard='';
static $whOcardA='';
static $owh = array();//ocard,osoc,user
static public function hashKey($k=false,$permsDef=false){
	if(1){ return false; } //no usar, dejarlo en JS
	if(c::$useHashKey!='Y'){ return false; }
	if($k=='sysd.user'){ return false; }/* Permiso publico de usuario */
	if(is_array($k)){ $P=$k; $k=($P['k'])?$P['k']:false; }
	$perms=$P['perms'];
	if($permsDef){ $perms=$permsDef; }
	$errNo=($P['errNo'])?$P['errNo']:'4_';
	$whK=' AND hashKey =\''.$k.'\'';
	$sep=explode('|',$k);
	if($sep[1]){
		$whK=' AND hashKey IN( ';
		foreach($sep as $n => $kse){ $whK .='\''.$kse.'\','; }
		$whK =substr($whK,0,-1).') ';
	}
	$q=a_sql::fetch('SELECT perms FROM a0_vs0_ousa WHERE userId=\''.self::$userId.'\' '.$whK.' LIMIT 1',array(1=>'Error consultando los permisos del usuario para el contenido: ',2=>'No tiene asignado ningun permiso para está acción ('.$k.').'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else if($perms!=''){
		/* $r=(preg_match('/^1/',$q['perms']));
		$w=(preg_match('/^11/',$q['perms']));
		$d=(preg_match('/.*1$/',$q['perms'])); */
		if($perms!=$q['perms'] && $perms=='111'){ $js=_js::e($errNo,'El usuario no tiene permisos para modificar está información. Se requieren permisos de escritura ['.$q['perms'].' to '.$k.']'); }
		else if($perms!=$q['perms'] && $perms=='100'){ $js=_js::e($errNo,'El usuario no tiene permisos para ver está información. Se requieren permisos de lectura ['.$q['perms'].' to '.$k.']'); }
	}
	if($js!=''){ die($js); }
}
static public function get_owh($tbA='',$k='soc'){
	$tbA = ($tbA)?$tbA.'.':'';
	switch($k){
		case 'card': $wh = 'AND ('.$tbA.'ocardId=\''.self::$ocardId.'\')'; break;
		case 'socId': $wh = 'AND ('.$tbA.'ocardId=\''.self::$ocardId.'\' AND '.$tbA.'socId=\''.self::$ocardSocId.'\')'; break;
		default: $wh = 'AND ('.$tbA.'ocardId=\''.self::$ocardId.'\' AND '.$tbA.'osocId=\''.self::$ocardSocId.'\')'; break;
	}
	return $wh;
}
static public function U_api($He=false){
	$oD=$_COOKIE;
	if(is_array($He)){ $oD=$He; }
	$iduser = $oD['userId'];//userId,oardId,ocardSocId
	$Q = a_sql::fetch('SELECT oUsr.userId, oUsr.user,oUsr.userName,oUsr.type, oUsr.rol, oUsr.dpto
 '.$addFields.' FROM a0_vs0_ousr oUsr WHERE oUsr.userId=\''.$iduser.'\' LIMIT 1',array('err1_noText'=>'Y',1=>'Error consultando usuario para U_api: ',2=>'No se encontró usuario ID '.$iduser.' on a_ses::U_api'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	if($Q['user'] == 'supersu'){ self::$isSuper = true; }
	self::$ocardId = $oD['ocardId']*1;
	if($oD['osocId']){ self::$ocardSocId = $oD['osocId']*1; }
	else{ self::$ocardSocId = $oD['ocardSocId']*1; }
	if($oD['ocardcode']){ self::$ocardCode = $oD['ocardcode']; }
	self::$whOcard=' AND ocardId=\''.self::$ocardId.'\' ';
	self::$whOcardA=' AND A.ocardId=\''.self::$ocardId.'\' ';
	self::$userId = $Q['userId'];
	self::$user = $Q['user'];
	self::$userName = $Q['userName'];
	self::$userType = $Q['type'];//suglobal
	self::$userRol = $Q['rol'];
	self::$userDpto = $Q['dpto'];
	return false;
}
static public function U_info($userId=false,$fie=''){
	$userId=($userId)?$userId:self::$userId;
	$q=a_sql::fetch('SELECT userId FROM a0_vs0_ousr WHERE userId=\''.$userId.'\' LIMIT 1',array(1=>'Error obteniendo información del usuario ::U_info.',2=>'No se encontró información del usuario.'));
	if(a_sql::$err){ return array('user'=>'__ERR_'.a_sql::$errNo); }
	else{ return $q;}
}
static public function ini($P=array()){
	foreach($P as $k => $v){
		self::cookie($k,$v,7);
	}
	if($P['userId']){ self::cookie('ps_userid',$P['userId'],7); }
}
static function ownerSh($L=array(),$P=array()){
	$userId=($P['userId'])?$P['userId']:self::$userId;
	unset($P['userId']);
	if($L['userId']==$userId){ $L['__owner']='Y'; }
	if(is_array($P)) foreach($P as $k => $L2){
		if($L2===true){ $L['__'.$k]='Y'; }
	}
	return $L;
}
static function isSuper($userId=false){
	if(self::$user=='supersu'){ return true; }
	return false;
}
static function U_nis($m='',$v='dpto',$P=array()){
	$R = false; $user = self::$user;
	if(self::isSuper()){ return false; }
	$errNo=($P['errNo'])?$P['errNo']:4;
	switch($v){
		case 'dpto':{ $matche = self::$userDpto;
			if(!preg_match('/^('.$m.')$/is',$matche)){ $R =array('errNo'=>$errNo,'text'=>'Su usuario ('.$user.'), no tiene permisos para realizar esta acción. Depatamento: {'.$m.'}'); }
		}break;
		case 'rol':{ $matche = self::$userRol;
			if(!preg_match('/^('.$m.')$/is',$matche)){ $R =array('errNo'=>$errNo,'text'=>'Su usuario ('.$user.'), no tiene permisos para realizar esta acción. Rol: {'.$m.'} Define: '.self::$userRol); }
		}break;
		case 'type':{ $matche = self::$userType;
			if(!preg_match('/^('.$m.')$/is',$matche)){ $R =array('errNo'=>$errNo,'text'=>'Su usuario ('.$user.'), no tiene permisos para realizar esta acción. Type: {'.$m.'} Define: '.self::$userRol); }
		}break;
	}
	if($matche==''){ $R =array('errNo'=>$errNo,'text'=>'Su usuario ('.$user.'), no tiene permisos para realizar esta acción porque no tiene definido {'.$m.' en '.$v.'}'); }
	if($R){
		if($P['r'] == 'a'){ return $R; }
		else{ $R = _js::e($R); }
	}
	return $R;
}

static public function nis_slp($slpId,$userId=false){
	//if(self::isSuper()){ return false; }
	$userId=($userId)?$userId:self::$userId;
	$a=self::slp_perms($userId);
	if(_err::$err){ return _err::$errText; }
	if($a['slps']=='all'){ return false; }
	else if($a['slps']=='ids' && !preg_match('/'.$slpId.'\,?/',$a['slpIds'])){
		$q=a_sql::fetch('SELECT slpName FROM par_oslp WHERE slpId=\''.$slpId.'\' LIMIT 1');
		$q=(a_sql::$errNo==-1)?$q:[];
	return _err::err('Su usuario no tiene definido permisos para visualizar información de este responsable de ventas ('.$q['slpName'].')',3);
	}
	else{ return false; }
}

static public function ousp($pT='slps',$P=array()){//en iDoc::get
	$tbA=($P['tbA'])?$P['tbA'].'.':'A.';
	$R=array(); $aor=($P['c'])?$P['c']:' AND ';
	$userId=($P['userId'])?$P['userId']:self::$userId;
	$fies=($pT=='users' || $pT=='usersAssg' || $pT=='users2')
	?'users,userIds'
	:'slps,slpIds';
	$a=a_sql::fetch('SELECT '.$fies.' FROM a0_vs0_ousp WHERE userId=\''.$userId.'\' LIMIT 1',array(1=>'Error obteniendo información de permisos para su usuario: '));
	//print_r($a);
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if($pT=='slps'){
		if($a['slps']=='all'){ }
		else if($a['slps']=='ids'){
			$R['wh']=$aor.'('.$tbA.'slpId IN ('.$a['slpIds'].'))';
		}
		else{ die(_js::e(3,'Su usuario no tiene definido permisos para visualizar los responsables.')); }
	}
	else if($pT=='lgcs'){
		if($a['lgcs']=='all'){ }
		else if($a['lgcs']=='ids'){
			$R['wh']=$aor.'('.$tbA.'lgcId IN ('.$a['lgcIds'].'))';
		}
		else{ die(_js::e(3,'Su usuario no tiene definido permisos para visualizar los cobradores.')); }
	}
	else if($pT=='users'){
		if($a['users']=='ids'){
			$R['wh']=$aor.'('.$tbA.'userId IN('.$a['userIds'].'))';
		}
		else if($a['slps']=='all'){ }
		else{ $R['wh']=$aor.'('.$tbA.'userId=\''.$userId.'\')'; }
	}
	else if($pT=='usersAssg'){
		if($a['users']=='ids'){
			$R['wh']=$aor.'('.$tbA.'userAssg IN('.$a['userIds'].'))';
		}
		else if($a['slps']=='all'){ }
		else { $R['wh']=$aor.'('.$tbA.'userAssg=\''.$userId.'\')'; }
	}
	else if($pT=='users2'){
		if($a['users']=='ids'){
			$R['wh']=$aor.'('.$tbA.'userId IN('.$a['userIds'].') OR '.$tbA.'userAssg IN('.$a['userIds'].'))';
		}
		else if($a['slps']=='all'){ }
		else{ $R['wh']=$aor.'('.$tbA.'userId='.$userId.'  OR '.$tbA.'userAssg='.$userId.')'; }
	}
	if($P['r']=='o'){ return $R; }
	return $R['wh'];
}

static public function slp_perms($userId=false){
	$userId=($userId)?$userId:self::$userId;
	$fie=($userId=='x1')?'slps,slpIds':'slps,slpIds';
	$a=a_sql::fetch('SELECT '.$fie.' FROM a0_vs0_ousp WHERE userId=\''.$userId.'\' LIMIT 1',array(1=>'Error obteniendo información de permisos para su usuario: ',2=>'Su usuario no tiene definido permisos para visualizar los vendedores (1).'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
	else if($a['slps']=='none'){ _err::err('Su usuario no tiene definido permisos para visualizar los vendedores.',3); return false; }
	else{ return $a; }
	//usar !slp_perms para mostrar jsE
}
static public function U_slpIds($P=array()){
	$ori= ' on[a_ses::U_slpIds]';
	$tbA=($P['tbA'] && $P['tbA']!='')?$P['tbA'].'.' : 'A.';
	$A=array('join'=>'LEFT JOIN par_oslp S ON (S.slpId='.$tbA.'slpId)','wh'=>'');
	$tre=($P['r']=='a')?$A:'';;
	//if(self::isSuper()){ return $tre; }
	$userId=($userId)?$userId:self::$userId;
	$a=self::slp_perms($userId);
	if(!$a){ return a_sql::$R; }
	else if($a['slps']=='all'){ return $tre; }
	else if($a['slps']=='ids'){ $ids=$a['slpIds']; }
	else{
		$q=a_sql::query('SELECT slpId FROM par_slp1 WHERE userId=\''.$userId.'\' LIMIT 200',array(1=>'Error obteniendo listado de vendedores.'.$ori));
		if(a_sql::$err){ $err=true; $r= 'ERROR_slp'; _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==2){ $ids= '\'NULL_slp_DEFINE\''; }
		else{
			while($L=$q->fetch_assoc()){ $ids.=$L['slpId'].','; }
			$ids=substr($ids,0,-1);
			a_sql::freeR($q);
		}
	}
	if($err){ return $r; }
	if($P['r']=='in'){ return 'AND '.$P['f'].' IN ('.$ids.')'; }
	if($P['r']=='a'){
		$A['wh']='AND '.$P['f'].' IN ('.$ids.')';
		return $A;
	}
	return $ids;
}
static public function byTooken($P=array()){
	return self::byJWT($P);
}
static public function byJWT($P=array()){
	$ta=''; self::$Tok=false;
	if(array_key_exists('___ocardtooken',$_GET)){ $ocardtooken= $_GET['___ocardtooken']; $ta=' (GET)';}
	else{ $ocardtooken=JRoute::reqHeads('ocardtooken'); }
	if(isset($ocardtooken)){
		$jwt=_JWT::decode($ocardtooken);
		if(_JWT::$errNo==2){ $js= _err::err(_JWT::$errNoText,3,'"requireLogin":"Y"'); }
		else if(_JWT::$errNo==3){ $js= _err::err(_JWT::$errNoText,3); }
		else{
			$js= $jwt;
			if($P['U_api']=='Y'){ a_ses::U_api($jwt); }
			else{ self::jwtData($jwt); }
		}
	}
	else{ $js= _err::err('Token is undefined.'.$ta,3); }
	self::$Tok=$js;
	return $js;
}
static public function jwtData($jwt=array()){
	if($jwt['ocardId']){ self::$ocardId = $jwt['ocardId']; }
	if($jwt['ocardcode']){ self::$ocardCode = $jwt['ocardcode']; }
}


static $ocardcode=false;
static $ocardtooken=false;
static public function ocardcode($r=false,$P=array()){
	$oapicode=JRoute::reqHeads('oapicode');
	if($oapicode){
		return ['ocardcode'=>$oapicode];
	}
	if($_GET['___ocardtooken']){ $ocardtooken=$_GET['___ocardtooken']; $ra='_GET'; }
	else{ $ocardtooken=JRoute::reqHeads('ocardtooken'); $ra='head'; }
	if (!isset($ocardtooken)) {
		die(_js::e(3, '-h ocardtooken is required'));
	}
	if(!_js::ise($ocardtooken)){ $ra .='-> JWT';
		_ADMS::_lb('_jwt');
		$jwt=_JWT::decode($ocardtooken);
		if(_JWT::$err==3){ die(_js::e(3,_JWT::$errNoText,'"requireLogin":"Y", "from":"a_ses.ocardcode","ocardtooken":"'.$ocardtooken.'"')); }
		else if(_JWT::$err){ die(_js::e(3,_JWT::$errNoText,'"tookenErr":true, "from":"a_ses.ocardcode","ocardtooken":"'.$ocardtooken.'"')); }
		$ocardcode=$jwt['ocardcode'];
	}
	else{ $ocardcode = JRoute::reqHeads('ocardcode'); $ra .= '-> heads'; }
	if($r){ return 'ocardtooken:'.$ocardtooken.', ocardcode('.$ocardcode.') ==> '.$ra; }
	self::$ocardtooken=$ocardtooken;
	self::$ocardcode=$ocardcode;
	$jwt['ocardcode']=$ocardcode;
	if($P['D']=='Y'){ return $jwt; }
	return $ocardcode;
}
static public function U_data($oD=array()){
	$Q = a_sql::fetch('SELECT oUsr.userId, oUsr.user,oUsr.userName
 '.$addFields.' FROM a0_vs0_ousr oUsr WHERE oUsr.userId=\''.$oD['userId'].'\' LIMIT 1',array('err1_noText'=>'Y',1=>'Error consultando usuario para U_data: ',2=>'No se encontró usuario ID '.$oD['userId'].' on a_ses::U_data'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	if($Q['user'] == 'supersu'){ self::$isSuper = true; }
	self::$userId = $Q['userId'];
	self::$user = $Q['user'];
	self::$userName = $Q['userName'];
	return false;
}

/* obsoleto nov 2018 */
static public function cookie($name='jrom',$valor='web',$days=1){
	setcookie($name, ($valor), time()+(60*60*24)*$days,"/");
}
}
?>
