<?php
header('Content-Type: text/javascript');
if(c::$V['jsLibType']!='O'){
	if(c::$V['jsLoad']['app']){
		$app=c::$V['jsLoad']['app'];
		unset(c::$V['jsLoad']['app']);
		$filx=c::$V['PATH_APPI'].$app.'.php'; $fileok='N';
		if(is_file($filx)){ $fileok='Y'; require($filx); }
		echo '/*jsv: '.$app.' ('.$fileok.') */'."\n";
	}
	if(is_array(c::$V['jsLoad'])) foreach(c::$V['jsLoad'] as $x => $Lj){
		if($Lj['type']=='jsv'){
			$filx=c::$V['PATH_APPI'].$Lj['src'].'.php';
			$fileok='N';
			if(is_file($filx)){ $fileok='Y'; require($filx); }
		}
	}
}
_ADMS::lib('xCurl,_File');
/* Necesario aqui para obtener libreria al cargar */

_Mdl::$fromTb['ousr']=array('tbk'=>'a0_vs0_ousr','k'=>'userId','v'=>'
	IF(inactivo=\'Y\',CONCAT(userName,\' (Inac)\'),
	IF(userId=\''.a_ses::$userId.'\',CONCAT(\' Yo- \',userName),
	userName))','addFie'=>'user');

_Mdl::$fromTb['docSerie']=array('qSel'=>'serieId k, srTitle v, tt _kGr,numAuto,srCode,resBef,resAfter,srTitle FROM doc_oser');

$socPath='/var/www/html/apis1/dsys/';
$socFile=a_ses::$ocardCode.'.js';
$iniAll='';
$a=$socPath.$socFile;
{
	$htxt='';
	foreach(c::$ys as $k=>$v){ $htxt.= '$ys.'.$k.'='.$v.";\n"; }
	$htxt .='
/*0s2 ini */ '."\n";
	$htxt.= '$0s.Curr='.json_encode(_0s::$curr).';
$0s.currDefault="$";
$0s.rate= 3300;
$0s.useHashKey=\''.c::$useHashKey.'\';
/* inis */
if(typeof(ColMt)=="undefined"){ ColMt={}; }
';
	$svrIni = preg_replace('/^(.*)\.admsistems.com/','$1',$_SERVER['HTTP_HOST']);
	$qf=a_sql::fetch('SELECT A.ocardName
	FROM a0_par_ocrd A
	WHERE 1 LIMIT 1',array(1=>'Error obteniendo datos de sociedad: ',2=>'La sociedad no existe.'));
	$htxt.= '$0s.Soc={};'."\n";
	if(a_sql::$err){ $htxt.= '$0s.ocardName=\'Error '.a_sql::$errNo.'\'; $0s.osocName=\'Error\';'; }
	else{
		$htxt.= '
$0s.Soc.ocardName=\''.$qf['ocardName'].'\';
$0s.Soc.osocName=\''.$qf['ocardName'].' (svr:'.$svrIni.')\';'."\n".
'$0s.Soc.srcLogo=\''.$qf['srcLogo'].'\''."\n";
	} unset($qf);

	$htxt.= '$0s.Soc.socName="";'."\n";
	$htxt.= 'var $Soc= $jSoc={};'."\n";
	/* Obtener datos de sociedad */
	/*
	$u=a_sql::query('alter table mapp_miponq.a0_mecrd add column `ocardName` varchar(100) not null default \'\' after `licTradNum` ');
	a_sql::query('update mapp_miponq.a0_mecrd set ocardName=\'Panificador Mi Ponque SAS\' LIMIT 1');
	*/
	{/* datos empresa */
	$qf=a_sql::fetch('SELECT * FROM a0_mecrd
	WHERE 1 LIMIT 1',array(1=>'Error obteniendo datos de sociedad: ',2=>'Los datos de la sociedad no han sido definidos.'));
	if(a_sql::$err){ $htxt.= '/* $Soc.{} errNo '.a_sql::$errNo.' */'; }
	else{ unset($qf['id']);
		foreach($qf as $k=>$v){ $htxt .='$Soc.'.$k.'=\''.$v.'\';'."\n"; }
	}
	}
	{/* Obtener configuración modulo Inicial */
	$qf=a_sql::query('SELECT accK,value FROM a0_mcnf
	WHERE iniSys=\'Y\' LIMIT 1000',array(1=>'Error obteniendo configuración inicial de modulo: ',2=>'La sociedad no existe.'));
	if(a_sql::$err){ $htxt.= '$Mdl.McnfV={}; /* errNo '.a_sql::$errNo.' */'; }
	else{
		$M=array();
		while($L=$qf->fetch_assoc()){
			$M[$L['accK']]=$L['value'];
		}
		$htxt.= '$Mdl.McnfV='.json_encode($M).";\n"; unset($M);
	}
	}
	/* VARIABLES DE SOCIEDAD, como gvtDvl_minDaysToDeliv=15 */
	$htxt .= "\n".'/* _0s::jSocget:: */'."\n";
	$q=_0s::jSocGet(0,array('wh'=>array('ini'=>'Y','mdlk(E_noIgual)'=>'gen'),'get'=>'q'));
	if(a_sql::$err){ $htxt.= '/* '.a_sql::$errNoText.' */'."\n"; }
	else{
		while($L=$q->fetch_assoc()){
			$htxt.= $L['idk'].'=';
			if($L['type']=='json'){ $htxt.= ''.$L['v'].';'."\n"; }
			else{ $htxt.= '"'.$L['v'].'";'."\n"; }
		}
	}
	# */
	$htxt .= '
/* var socket = {on:function(){}, off:function(){}, emit:function(){}}; /*must declare */
$0s.cFile = '.json_encode(_0s::$cFile).';
'."\n";
	if(_0s::$cFile['svrs']){ _Mdl::jsFileTxt('$0s.fileSvrs='.json_encode(_0s::$cFile['svrs']).';'."\n"); }

	$htxt .= '/* _0s::$jsL inisys==0s */'."\n";
	$tbks='';
	if(array(_0s::$jsL)) foreach(_0s::$jsL as $tbk => $L){
		if($L['iniSys']=='Y' || $L['inisys']=='0s'){ $tbks .= $tbk.','; }
	}
	if($tbks!=''){ $htxt .= _0s::jsLoad($tbks,true); }
	_Mdl::jsvReq();
	$htxt .= "\n".'/* _Mdl::fromTb() */'."\n";
	$htxt .= _Mdl::fromTb();
	$htxt .="\n".'/*0s2 end */ '."\n";
}
#varian --- Obtener permisos
	$htxt .='$0s.user= \''.a_ses::$user.'\';
$0s.userId= \''.a_ses::$userId.'\';
$0s.userName= \''.a_ses::$userName.'\';

Attach_svrLocal=\''.c::$V['URI_API'].'\';
';
$htxt .= '/* a0_ojsv */ '."\n";
$q=a_sql::query('SELECT k,kObj,kAlias,v FROM a0_ojsv ');
if(a_sql::$errNo==1){ $htxt .='/* Error 1 to a0_ojsv; */'; }
else if(a_sql::$errNo==2){ $htxt .='/* Error 2 to a0_ojsv; */'; }
else{
	$JSV=[];
	while($L=$q->fetch_assoc()){
		$kObj=$L['kObj'];
		if(!array_key_exists($kObj,$JSV)){ $JSV[$kObj]=[]; }
		$k=($L['kAlias'])?$L['kAlias']:$L['k'];
		$JSV[$kObj][]=['k'=>$k,'v'=>$L['v']];
	}
	foreach($JSV as $kv=>$D){
		$htxt .= $kv.'='.json_encode($D).';'."\n";
	}
	unset($JSV);
}

	$htxt .= _Mdl::fromTbU();
	if(c::$useHashKey=='Y'){
		$htxt.= '		/* hashkeys using... */'."\n";
		$q=a_sql::fetch('SELECT perms FROM a0_vs0_ousa WHERE userId=\''.a_ses::$userId.'\' LIMIT 500',array(1=>'Error obteniendo permisos para usuario: ',2=>'Su usuario no tiene ningun permiso asignado.'));
		if(a_sql::$err){
			$htxt.= '$M.uA='.a_sql::$errNoText.';';
		}
		else if(a_sql::$errNo==-1){
			if($q['perms']==''){ $q['perms']=''; }
			$htxt.= '$M.uA='.$q['perms'].';'."\n";
		}
	}
	_Mdl::jsFileTxt(_Mdl::JsVV()."\n".$htxt);
//_Mdl::jsFile();
_Mdl::jsFile('YA');
mysqli_close(a_sql::$DB);
c::getMemory('end');
?>
