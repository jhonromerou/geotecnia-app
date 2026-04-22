<?php
if($_GET['memory']){
	function convert($size){
    $unit=array('b','kb','mb','gb','tb','pb');
    return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
}
$mIni=memory_get_usage();
}
header('Content-Type: text/javascript');
_ADMS::lib('xCurl,_File');
/* Necesario aqui para obtener libreria al cargar */

_Mdl::pushJSFile([
array('fileCache'=>'Y','src'=>'apps/gfirebase','lbDef'=>'$a,$M,$Api,$Doc'),
array('fileCache'=>'Y','src'=>'apps/c_f','lbDef'=>'5c,5f'),
array('fileCache'=>'Y','src'=>'apps/interface','lbDef'=>'apps/interface'),
array('fileCache'=>'N','src'=>'lib/dian/mmag','lbDef'=>'../lib/dian/mmag'),
array('fileCache'=>'N','src'=>'lib/num2text','lbDef'=>'../lib/num2text')
],'ini');
_Mdl::$fromTb['ousr']=array('tbk'=>'a0_vs0_ousr','k'=>'userId','v'=>'IF(inactivo=\'Y\',CONCAT(userName,\' (Inac)\'),IF(userId=\''.a_ses::$userId.'\',CONCAT(\' Yo- \',userName),userName))','k_0'=>'Ninguno','addFie'=>'user');

_Mdl::$fromTb['docSerie']=array('qSel'=>'serieId k, srTitle v, tt _kGr,numAuto,srCode,resBef,resAfter,srTitle FROM doc_oser');

$socPath='/var/www/html/apis1/dsys/';
$socFile=a_ses::$ocardCode.'.js';
$iniAll='';
$a=$socPath.$socFile;
if(0 && @file_exists($a)){
	_Mdl::jsFileTxt('/* From /dsys/ */ '."\n"._File::getData($a)."\n");
}
else{
	$htxt='
/*0s2 ini */ '."\n";
	$htxt.= '$0s.Curr='.json_encode(_0s::$curr).';
$0s.currDefault="'._0s::$currDefault.'";
$0s.rate= 3300;
$0s.ocardId= \''.a_ses::$ocardId.'\';
$0s.ocardCode= \''.a_ses::$ocardCode.'\';
$0s.ocardSocId= \''.a_ses::$ocardSocId.'\';
$0s.ocardSocKey= \''.$ADMS_socKey.'\';
$0s.ocardSocId= \''.a_ses::$ocardSocId.'\'; $0s.ocardSocKey= \''.$ADMS_socKey.'\';
$0s.Host_localMode= \''._0s::$Host_localMode.'\';
$0s.useHashKey=\''._0s::$useHashKey.'\';

/* inis */
if(ColMt==undefined){ ColMt={}; }
';
	$svrIni = preg_replace('/^(.*)\.admsistems.com/','$1',$_SERVER['HTTP_HOST']);
	$qf=a_sql::fetch('SELECT A.ocardName
	FROM a0_par_ocrd A
	WHERE 1 LIMIT 1',array(1=>'Error obteniendo datos de sociedad: ',2=>'La sociedad no existe.'));
	$htxt.= '$0s.Soc={};'."\n";
	if(a_sql::$err){ $htxt.= '$0s.ocardName=\'Error\'; $0s.osocName=\'Error\';'; }
	else{
		$htxt.= '
$0s.Soc.ocardName=\''.$qf['ocardName'].'\';
$0s.Soc.osocName=\''.$qf['ocardName'].' (svr:'.$svrIni.')\';'."\n".
'$0s.Soc.srcLogo=\''.$qf['srcLogo'].'\''."\n";
	} unset($qf);
	$htxt.= '$0s.Soc.socName="";'."\n";
	$htxt.= 'var $Soc= $jSoc={};'."\n";
	/* Obtener datos de sociedad */
	$qf=a_sql::fetch('SELECT * FROM a0_mecrd
	WHERE 1 LIMIT 1',array(1=>'Error obteniendo datos de sociedad: ',2=>'Los datos de la sociedad no han sido definidos.'));
	if(a_sql::$err){ $htxt.= '/* $Soc.{} errNo '.a_sql::$errNo.' */'; }
	else{ unset($qf['id']);
		foreach($qf as $k=>$v){ $htxt .='$Soc.'.$k.'=\''.$v.'\';'."\n"; }
	}
	/* Obtener configuración modulo Inicial */
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
	/* VARIABLES DE SOCIEDAD */
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

	$htxt .= '
/* var socket = {on:function(){}, off:function(){}, emit:function(){}}; /*must declare */
$MCnf.Attach = '.json_encode(_0s::$cFile).';
'."\n";
	if(_0s::$cFile['svrs']){
		_Mdl::jsFileTxt('$0s.fileSvrs='.json_encode(_0s::$cFile['svrs']).';'."\n");
	}

	$htxt .= '
/* _0s::$jsL inisys==0s */'."\n";
	$tbks='';
	if(array(_0s::$jsL)) foreach(_0s::$jsL as $tbk => $L){
		if($L['iniSys']=='Y' || $L['inisys']=='0s'){ $tbks .= $tbk.','; }
	}
	if($tbks!=''){ $htxt .= _0s::jsLoad($tbks,true); }
	_Mdl::jsvReq();
	$htxt .= "\n".'/* _Mdl::fromTb() */'."\n";
	$htxt .= _Mdl::fromTb();
	if($_GET['john']){
		_File::create($socFile,$socPath,"\n0s2-File ".$socFile." \n".$htxt.' '._Mdl::jsv()."\n".'/*0s2 end */ '."\n");
	}
	$htxt .="\n".'/*0s2 end */ '."\n";
}
#varian --- Obtener permisos
	$htxt .='$0s.user= \''.a_ses::$user.'\';
	$0s.userId= \''.a_ses::$userId.'\';
	$0s.userName= \''.a_ses::$userName.'\';';
	$htxt .= _Mdl::fromTbU();
	if(_0s::$useHashKey=='Y'){
		$htxt.= '		/* hashkeys using... */'."\n";
		$q=a_sql::query('SELECT hashKey,perms FROM a0_vs0_ousa WHERE userId=\''.a_ses::$userId.'\' LIMIT 500',array(1=>'Error obteniendo permisos para usuario: ',2=>'Su usuario no tiene ningun permiso asignado.'));
		if(a_sql::$err){ $htxt.= '$M.uA='.a_sql::$errNoText.';'; }
		else if(a_sql::$errNo==-1){
			while($L=$q->fetch_assoc()){
				$js .= '"'.$L['hashKey'].'":"'.$L['perms'].'",';
			}
			$htxt.= '$M.uA={'.substr($js,0,-1).'};'."\n";
		}
	}
	_Mdl::jsFileTxt(_Mdl::JsVV()."\n".$htxt);
	_Mdl::jsFileTxt(_Mdl::jsv()."\n".$htxt);
_Mdl::jsFile();
mysqli_close(a_sql::$DB);
if($_GET['memory']){ echo 'RAM end: '.convert(memory_get_usage()-$mIni)."\n"; }
?>
