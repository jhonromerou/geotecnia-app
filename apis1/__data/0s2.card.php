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
array('fileCache'=>'Y','src'=>'apps/a_m_c_f','lbDef'=>'$a,$M,5c,5f'),
array('fileCache'=>'Y','src'=>'apps/$Api','lbDef'=>'$Api'),
array('fileCache'=>'Y','src'=>'apps/$Doc','lbDef'=>'$Doc')
],'ini');
_Mdl::pushJSFile([
array('fileCache'=>'Y','src'=>'apps/xcard','lbDef'=>'apps/xcard')
],'last');
_Mdl::$fromTb['ousr']=array('tbk'=>'a0_vs0_ousr','k'=>'userId','v'=>'IF(inactivo=\'Y\',CONCAT(userName,\' (Inac)\'),userName)','k_0'=>'Ninguno','addFie'=>'user');
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
$0s.ocardCode= \''.a_ses::$ocardCode.'\';
$0s.ocardSocId= \''.a_ses::$ocardSocId.'\'; 
$0s.ocardSocKey= \''.$ADMS_socKey.'\';
$0s.ocardId= \''.a_ses::$ocardId.'\'; $0s.ocardSocId= \''.a_ses::$ocardSocId.'\'; $0s.ocardSocKey= \''.$ADMS_socKey.'\';
$0s.Host_localMode= \''._0s::$Host_localMode.'\';
$0s.useHashKey=\''._0s::$useHashKey.'\';

/* inis */
if(ColMt==undefined){ ColMt={}; }
';
	$svrIni = preg_replace('/^(.*)\.admsistems.com/','$1',$_SERVER['HTTP_HOST']);
	$qf=a_sql::fetch('SELECT A.ocardName,B.socName,B.srcLogo 
	FROM a0_par_ocrd A 
	JOIN a0_par_crd1 B ON (B.ocardId=A.ocardId) 
	WHERE 1 LIMIT 1',array(1=>'Error obteniendo datos de sociedad: ',2=>'La sociedad no existe.'));
	$htxt.= '$0s.Soc={};'."\n";
	if(a_sql::$err){ $htxt.= '$0s.ocardName=\'Error\'; $0s.osocName=\'Error\';'; }
	else{
		$htxt.= '
$0s.Soc.ocardName=\''.$qf['ocardName'].'\';
$0s.Soc.osocName=\''.$qf['socName'].' (svr:'.$svrIni.')\';'."\n".
'$0s.Soc.srcLogo=\''.$qf['srcLogo'].'\''."\n";
	} unset($qf);
	$htxt.= '$0s.Soc.socName="";'."\n";
	_Mdl::jsvReq();
	$htxt .= "\n".'/* _Mdl::fromTb() */'."\n";
	$htxt .= _Mdl::fromTb();
	$htxt .="\n".'/*0s2 end */ '."\n";
}
#varian --- Obtener permisos
	$htxt .='$0s.user= \''.a_ses::$user.'\';
	$0s.userId= \''.a_ses::$userId.'\';
	$0s.userName= \''.a_ses::$userName.'\';';
	$htxt .= _Mdl::fromTbU();
	_Mdl::jsFileTxt(_Mdl::jsv()."\n".$htxt);
_Mdl::jsFile();
mysqli_close(a_sql::$DB);
?>