<?php
ob_start();
ini_set('display_errors', 1); error_reporting(E_ALL^E_NOTICE^E_DEPRECATED^E_WARNING);
function c_define($k='',$v='',$cns=false){
	c::$V[$k]=$v;
	if($cns){ define($k,$v); }
}
function c_is($k='',$v=''){
	if(c::$V[$k] && c::$V[$k]==$v){ return true; }
	else{ return false; }
}
function c_g($k=''){
	if(c::$V[$k]){ return c::$V[$k]; }
	else{ return false; }
}
class c{
	static $useHashKey='N';
	static string $scope = 'local'; // prod, local, local-prod
    static bool $isProdScope = false;
	static $V=array();
	static $ys=array(); /*Es $ys. en JS,
	storage:[H,L,FB=firebase]
	storBucket:Definir si es != FB
	JBF:{email,pass,folder:fpnor, Cnf:{} }
	*/
	static $URI=array();
	static $H=array(); //headers
	static $Sql=array();
	static $Sql2=array();//svr2
	static $Db=array('sqlMode'=>'ONLY_FULL_GROUP_BY,NO_ENGINE_SUBSTITUTION,NO_UNSIGNED_SUBTRACTION');
	static $Page=array(); //next,limit
	static $EmailSvr=array();//svr2
    static $Enviroment = [];
	static $ApiCodeInc=array(); //definir ruta para error, ejemplo, 404->/404.php
	static $T=array();//temp like textSearch
	static $Modules = array(); // load from adms.loadMdl.mdlCnf -> key=Y|N
	static public function setURI($X=array()){
		foreach($X as $k =>$v){
			self::$URI[$k]='';
			if($v[0]=='>'){//>3
				foreach(self::$URI as $n=>$vv){
					if(is_numeric($n) && $n>$v[1]){ self::$URI[$k] .= $vv.'/'; }
				}
			}
			else{ foreach($v as $n){ self::$URI[$k] .=self::$URI[$n].'/';  } }
			self::$URI[$k]=substr(self::$URI[$k],0,-1);
		}
	}
	static public function setMaxTime($seg=30){
		set_time_limit($seg);
		//self::$Memory['max_time']=$seg;
	}

    static public function IsActiveModule($module) {
        return self::$Modules[$module] == 'Y';
    }
	static $RAMini=0;
	static $RAMini1=0;
	static $RAMend=0;
	static $RAMend1=0;
	static $RAMJs=''; //pone en _js:r ramIni, ramEnd,
	static $RAMuse=false;
	static public function getMemory($ty='ini'){
		if($ty=='ini'){
			self::$RAMini=memory_get_peak_usage();
			self::$RAMini1=memory_get_usage();
		}
		else if(self::$RAMuse==false){ return ''; }
		else{
			if(a_ses::$userId==1){
				$unit=array('b','kb','mb','gb','tb','pb');
				self::$RAMend=memory_get_peak_usage();
				self::$RAMend1=memory_get_usage();
				$size=memory_get_peak_usage()-self::$RAMini;
				$size=round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
				$size1=memory_get_usage()-self::$RAMini1;
				$size1=round($size1/pow(1024,($i=floor(log($size1,1024)))),2).' '.$unit[$i];
				die('{
		"_peakIni":"'.self::$RAMini.'","_peakEnd":"'.self::$RAMend.'","_peakDif":"'.$size.',
		"_mIni":"'.self::$RAMini.'","_mEnd":"'.self::$RAMend.'","_mDif":"'.$size1.',
	}');
			}
		}
	}
}
if($_GET['__ramUse']=='Y'){ c::$RAMuse=true; }
c::getMemory('ini');
$host=$_SERVER['HTTP_HOST'];
$loc=(preg_match('/(192\.168|localh|127\.0)/',$host))?'Y':'N';
c_define('HOST','http://'.preg_replace('/\:(.*)$/','',$host));
c_define('HTTP_192',$loc);
$localMode='N';

$_PROJECT_ROOT = dirname(__FILE__);
c::$isProdScope = $loc == 'N';
//c::$scope = 'local-prod';
if (c::$scope == 'local-prod') {
    c::$isProdScope = true;
}
if(!c::$isProdScope){ require('_conf.local.php');  }
else {
    require('_conf.server.php');
}
c_define('PATH_TOP','/');
c_define('PROJECT_ROOT',$_PROJECT_ROOT);
c_define('REQUEST_VALIDATION_FILE', $_PROJECT_ROOT.'/request_validation.php');
c_define('LOAD_MODULES_FILE', $_PROJECT_ROOT.'/_inidb_wser.php');
c_define('CFILE_DBSOC',$_PROJECT_ROOT.'/_inidb_wser.php');
c_define('PATH_ROOT',$_PROJECT_ROOT.'/');
c_define('PATH_API',$_PROJECT_ROOT.'/apis1');
c_define('PATH_APPI',$_PROJECT_ROOT.'/appi/');
c_define('PATH_ADMS',$_PROJECT_ROOT.'/adms/');
c_define('PATH_controllers',$_PROJECT_ROOT.'/adms/controllers/');
c_define('PATH_LIB',$_PROJECT_ROOT.'/adms/lib/');
c_define('PATH_SLIB',$_PROJECT_ROOT.'/apis1/static/');
c_define('PATH_libexterna',$_PROJECT_ROOT.'var/www/libexternal/');
c_define('PATH_MAPPS',$_PROJECT_ROOT.'/adms/mapps/');
c_define('PATH_APPS',$_PROJECT_ROOT.'/apis1/__apps/');
c_define('PATH_www',$_PROJECT_ROOT.'/apis1/__adms');
c_define('PATH_WEB',$_PROJECT_ROOT.'/iweb/');

if($_GET['textSearch']){
	c::$T['textSearch']=$_GET['textSearch'];
}
c::$Page['next'] = (array_key_exists('_pnext',$_GET)) ? $_GET['_pnext'] : 0;
unset($_GET['_pnext'],$_GET['_haskKey'],$_GET['_hashDefine']);
c::$ys['jsVersion']="'v1.0.1'";
c_define('ocardcode', $ocardcode);
if($_SERVER['HTTPS']){
	c::$V['URI_STATIC']=str_replace('http://','https://',c::$V['URI_STATIC']);
	c::$V['URI_API']=str_replace('http://','https://',c::$V['URI_API']);
}
$uri = preg_replace('/\/$/','',preg_replace('/\?.*$/','',
	preg_replace('/^\//','',$_SERVER['REQUEST_URI'])
));
c::$URI=explode('/',$uri);
c::$URI['_']=$uri;
$st2=c::$V['URI_STATIC'];
$apiURI=c::$V['URI_API'];
$web=c::$V['URI_WEB'];

