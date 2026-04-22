<?php
require('__0_requi.php');
require('__0_aorigin.php');
header('Content-Type: application/json');
$ADMS_loginMode='Y';
require(c::$V['PATH_API'].'/phpbase2.php');
_ADMS::lib('_err,_js,a_sql,a_ses,JRoute');
$D=$_POST; unset($_POST);
//Revisar campos
$ocardcode=a_ses::ocardcode();
if(_js::iseErr($ocardcode,'ocardcode para login no definido ('.$ocardcode.').')){
	die(_err::$errText);
}
if($D['cardLogin']=='Y'){
	if(_js::iseErr($D['user'],'Se debe digitar su código de cliente.')){ die($js); }
}
else{
	if(_js::iseErr($D['user'],'Se debe digitar el usuario')){}
	else if(_js::iseErr($D['pass'],'Se debe digitar la contraseña.')){}
}
if(_err::$err){ die(_err::$errText); }

require(c::$V['CFILE_DBSOC']);
a_sql::dbase(c::$Sql);

$domainUrl='/';
/* $ocardcode viene definido de antes */
$user = $D['user'];
$pass = $D['pass'];
$ocardId = ($D['ocardId'])?$D['ocardId']:1;
$ocardSocId = ($D['ocardSocId'])?$D['ocardSocId']:1;
if($D['osocId']){ $ocardSocId= $D['osocId']; }
if($D['cardLogin']=='Y'){
	_ADMS::lib('parWac');
	$js= parWac::login(array('user'=>$user,'pass'=>$D['pass'],'ocardcode'=>$ocardcode));
	if(_err::$err){ $js= _err::$errText; }
}
else{
	$q = a_sql::fetch('SELECT U.userId FROM a0_vs0_ousr U
	WHERE U.user=\''.$user.'\' AND U.password=\''.$pass.'\' LIMIT 1 ');
	if(a_sql::$errNo == 1){ $js = _js::e(1,'Login Error: '.$q['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _js::e(2,'Datos de ingreso incorrectos. ('.$ocardcode.')'); }
	else{
		_ADMS::lib('_jwt');
		$token=_JWT::encode(array('userId'=>$q['userId'],'ocardcode'=>$ocardcode));
		if(_JWT::$err){ $js=_js::e(3,_JWT::$errNoText); }
		else{
			$dateC=date('Y-m-d H:i:s');
			a_sql::uniRow(['sessions='=>'sessions+1','sessions'=>1,
				'lastLogin'=>$dateC,'lastLoginOrigin'=>$_SERVER['REMOTE_ADDR'],'ocardtooken'=>$token],['tbk'=>'a0_vs0_ousr','wh_change'=>'userId=\''.$q['userId'].'\' LIMIT 1']);
			$qr=a_sql::fetch('SELECT sid FROM a0_ouss WHERE userId=\''.$q['userId'].'\' ORDER BY dateC DESC LIMIT 2,1');
			$rowSid=(a_sql::$errNo==-1)?$qr['sid']:0;
			a_sql::multiQuery([
				['p','DELETE FROM a0_ouss WHERE userId=\''.$q['userId'].'\' AND sid<=\''.$rowSid.'\' LIMIT 100'],
				['p','INSERT INTO a0_ouss (userId,token,dateC) VALUES (\''.$q['userId'].'\',\''.$token.'\',\''.$dateC.'\')'],
			]);
			$js = _js::r('Ingreso a sociedad realizado...','"domainUrl":"'.$domainUrl.'","localStor":{"ocardtooken":"'.$token.'"}');
		}
	}
}
echo $js;

?>
