<?php
class _V{
static $err=false;
static $d=array();
static public function _g($k=false,$v=false){
	self::$err=false;
	if(self::$d[$k]){ return self::$d[$k]; }
	else{ return false; }
}
static public function _gA($ks='',$V=false){
	self::$err=false;
	$R1=array(); $sep=explode(',',$ks);
	foreach($sep as $k=>$v){
		if(self::$d[$v]){ $R1[$v]=self::$d[$v]; }
		else{ $R1[$v]=false; }
	}
	$R=array();
	if($V){ $R[$V]=$R1; }
	else{ return $R1; }
	return $R;
}
}

class _0s{
static $gid=0;
static $D=array();/*temporales */
static $wwwPath='/var/www/';
static $staticPath='/var/html/';
static $svrPath='/'; /* ROOT TOTAL */
static $isWinPath='N';
static $winPath='';
static $ocardcode=false;
static $ocardtooken=false;
static $uri=array();#1/gtd/task/inbox. [app]=gtd, [mdl]=task
static $uriReq=''; #req
static $sqlMode='ONLY_FULL_GROUP_BY,NO_ENGINE_SUBSTITUTION';
static public function uri(){
	$uri = preg_replace('/^\/?(GET|POST|PUT|DELETE)\/?/','',$_SERVER['REQUEST_URI']);
	$uri = preg_replace('/^\//','',$uri);
	$uri = preg_replace('/\?.*$/','',$uri);;
	$uri1 = preg_replace('/\/$/','',$uri);;
	$uri = explode('/',$uri1);
	$uriSh=preg_replace('/^'.$uri[0].'\/'.$uri[1].'\/?/','',$uri1);
	#omito _rest xk ya estoy en _rest/gtd.php
	/* / 1/task/list/
		app=task,
		mdl=list
		router= GET list
	*/
	$mdlA=($uri[2])?$uri[2]:'a';
	self::$uri=array($uri[0],'app'=>$uri[1],'mdl'=>$mdlA,'gid'=>0);
	$addRouter='';
	if(0 && a_ses::$userId==1){
		print_r($uri);
		print_r($uri1);
		echo ' -- '; print_r($uriSh);
	}
	if(is_numeric($uri[2])){
		self::$uri['gid']=$uri[2];
		$uriSh='.gid/'.preg_replace('/'.$uri[2].'\/?/','',$uriSh);
		$uriSh=preg_replace('/\/$/','',$uriSh);
	}
	else if(is_numeric($uri[3])){
		$uriSh=preg_replace('/\/(\d)+/','/gid',$uriSh);
		self::$gid=$uri[3];
	}
	self::$brouter=$uriSh;
	self::$router=self::$__M.' '.$uriSh;
	self::$uri['u']=$uriSh;
	self::$uri['r']=self::$router;
}
static public function uriReq($mdl=false,$app=false){
	$app=($app)?$app:self::$uri['app'];
	if($mdl && preg_match('/^('.$mdl.')$/',self::$uri['mdl'])){
		self::$uriReq=$app.'/'.self::$uri['mdl'].'.php'; #task/list
	}
	else{ self::$uriReq=self::$uri['app'].'/a.php'; } #task/a
}
static public function uriMdl($mdl=false){
	$ba=self::$uri['app'].'/'.self::$uri['mdl'];
	self::$uriReq=c::$V['PATH_ADMS'].'mdls/'.$ba.'.php';
	if(self::$uri[0]=='1c'){ //socios
		self::$uriReq=c::$V['PATH_API'].'/_restcards/'.$ba.'.php';
	}
	if(!file_exists(self::$uriReq)){
		die(_js::e(3,'Mdl to app not create. on[_0s::uriMdl] -> '.$ba));
	}
	if($mdl && !preg_match('/^('.$mdl.')$/',self::$uri['mdl'])){
		die(_js::e(3,'Mdl to app undefined. on[_0s::uriMdl] -> '.$ba));
	}
	return self::$uriReq;
}
static $timei=0;
static $routerApp=''; static $routerApp_err=false;
static $contentType='application/json';
static $__M; static $__K; static $__Ko; static $__fK;
static $jSoc=array();//jSoc configura js paraatros de sociedad
static $eSoc=array();//extender datos para sociedades
static $socL=array();
static $eSocPre=array();//predefinir datos de sociedad--> usado en soc_predefine.php
static $Memory=array('max_time'=>30);
static $_hashKeyR='';//get from ajax
static $_hashKey='';//get from rest api
static $hashDefine=false; //enviar _GET , por ejemplo geDoc.card
static $useHashKey='N';//determina si se revisan o no acceso según usuario
static $Tb = array();
static $TbF=array();
static $_P_=array();//recibe desde _GET[_P_]{l=limit, n=next,offset=next,back}
static $dbBase = '';
static $refApi='N';
static $jsL=array(); //librerias jsL para cargar conjsLoad [tbk]=k,v
static $curr=array('$'=>'$');
static $currDefault='$';
static $URL = array('a'=>'a');
static $App = array(
'mantenimiento_supersu'=>'supersu',
'mantenimiento'=>'N'
);
static $serverNodeActive = 'Y';
static $Server_node = '';//9095
static $PlainCode;
static $PlainCodeDefine;
static $bussPartnerPrivacity = 'private';/*defaulf|private
-Public_Card: Clientes segun cardId
-Public_Soc: Clientes segun cardId AND osocId
*/
static $webIndex = '';//go to onload
static $consLogApi = false;//mostrar cons rest api
static $SOCIE = array();#ADMS_SOCIE
/* Datos de Sociedad */
static $ocardId = 0;
static $ocardSocId = 0;
static $MailConf = array();
static $Path_web='/var/www/html/apis1';
static $Path_static = 'E:/svr/st3';
static $Path_staticData = 'E:/svr/st3/__data';
static $Path_relative = '';
static $Path_http = '';
static $Path_files = '/_files/';

static $Host_localMode = 'N';
static $db_localMode = 'Y';
static $Cache_css = '&cssUpd=2017-12-05--1604';
static $Cache_js = '&jsUpd=2018-01-04 08:46';
/* PLANES Y FACTURACIÓN */
static $cPlan = array();
static $cFile = array(
'storage'=>'local', 'maxUpd'=>3, 'maxSize'=>5
);
static $_FIREB = array('user'=>'null','pass'=>'null',
'i'=>'{"path":"sinclas"}',
'config'=>'null');
static public function jSocGet($k='',$P=array()){//address,web
	$rt=false;
	if($P=='r'){ $rt=true; $P=array(); }
	else if($P['r']){ $rt=true; }
	$fjson=($P['f']=='json');
	if($k!=false){ $whk= ' AND k '.a_sql::toSe($k,'in').' '; }
	if($P['jsV']){ $whk .= ' AND jsV '.a_sql::toSe($P['jsV'],'in').' '; }
	if($P['wh']){ _ADMS::_lb('sql/filter'); $whk .= a_sql_filtByT($P['wh']); }
	$q=a_sql::query('SELECT idk,jsV,k,v,type FROM a0_par_crd2 WHERE 1 '.$whk.' LIMIT 1000',array(1=>'Error obteniendo variables solicitadas de la sociedad: ',2=>'No se han definido variables para la sociedad'));
	if($P['get']=='q'){ return $q; }
	if(a_sql::$errNo==1){ $sep = explode(',',$v);
		foreach($sep as $va){ _0s::$jSoc[$va]='_null_'; }
	}
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			if($fjson){ $L['v']=json_decode($L['v'],1); }
			_0s::$jSoc[$L['k']]=$L['v'];
		}
	}
	if($rt){ return self::$jSoc[$k]; }
}
static public function jSocVerif($ev='=',$v=false,$k='',$P=array()){
	_0s::jSocGet($k);
	$r=false; $tv=_0s::$jSoc[$k];
	if(array_key_exists($k,_0s::$jSoc)){
		switch($ev){
			case '>' : $r=($tv>$v); break;
			case '<' : $r=($tv<$v); break;
			case '<=' : $r=($tv<=$v); break;
			case '>=' : $r=($tv>=$v); break;
			case '===' : $r=($tv===$v); break;
			case '!=' : $r=($tv!=$v); break;
			default : $r=($tv==$v); break;
		}
	}
	if($r && $P['t']){ return _js::e(3,$P['t']) ; }
	return $r;
}
static public function jsLoad_typeFie($v='',$ty=''){
	switch($ty){
		case 'number': $v=$v*1; break;
	}
	return $v;
}
static public function jsLoad($tbks='',$r=false){
	$Tbks= explode(',',$tbks);
	$txt='';
	$len=count($Tbks); $br ="\n";
	if(!is_array($Tbks) || $len==0){
		$txt .= '/*err: Tbks no es una matriz */';
	}
	else{ $ni=0;
		foreach($Tbks as $n => $tbk){
			$moreV=array();/* variables adiciones a obtener tbk, k, v*/
			if($tbk==''){ continue; }
			if(!array_key_exists($tbk,_0s::$jsL)){ $txt .= '/* tbk ('.$tbk.') undefined on jsL */'."\n"; continue; }
			$K=_0s::$jsL[$tbk]; $wh='';
			if($K['reqLib']){
				require_once($K['reqLib']);
				continue;
			}
			if($K['type']=='data' && $K['data']){
				$txt .= $tbk.'='.$K['data'].";\n"; continue;
			}
			//if($K['owh']){ $wh=a_ses::get_owh($K['tbAlias'],$K['owh']); }
			if($K['wh']){ $wh .= a_sql_filtByT($K['wh']); }
			if($K['whText']){ $wh .= ' AND '.$K['whText']; }
			if($K['tbk']){ $K['V']=$tbk; $tbk=$K['tbk']; } //usar variable en ves de tabla
			$addFie=($K['addFie'])?','.$K['addFie']:'';
			$q=a_sql::query('SELECT '.$K['k'].' k,'.$K['v'].' v '.$addFie.'
			FROM '.$tbk.' '.$K['join'].'
			WHERE 1 '.$wh.' LIMIT 1000');
			//if(a_ses::$userId==1){ print_r($q); }
			$Mv=array();
			if($K['k_0']){ //0=ninguno
				if($K['type']=='k-v'){ $Mv[0]=array('k'=>'0','v'=>$K['k_0']); }
				else{ $Mv[0]=$K['k_0']; }
			}
			if(a_sql::$errNo==1){ $txt .= $K['V'].'={};'.'/* '.$tbk.' errNo 1: '.$q['error_sql'].' */'; }
			else if(a_sql::$errNo==2){ $txt .= $K['V'].'={};'.'/*  errNo 2  */'; }
			else{
				while($L=$q->fetch_assoc()){
				$k=$L['k']; $v=$L['v']; unset($L['k'],$L['v']);
				if(array_key_exists('TbV',$K)){ //define on $TbV. = 4:val
					$v2=$L[$K['TbV']['v']]; $k2=$K['TbV']['k'];
					$moreV['$TbV.'.$k2][$k]=self::jsLoad_typeFie($v2,$K['TbV']['type']);
				}
				if($K['type']=='k-v'){
					$As=array('k'=>$k,'v'=>$v);
					foreach($L as $_k => $_v){ $As[$_k]=$_v; }
					$Mv[]=$As;
				}
				else{ $Mv[$k]=$v; }
			}
			$txt .= $K['V'].'= '.json_encode($Mv).';'.$br;
			foreach($moreV as $tbk2 => $_js){
				$txt .= $tbk2.'= '.json_encode($_js).';'.$br;
			}
			}
			$ni++;
			if($ni<$len){ $txt .= $br; }
		}
	}
	if($r){ return $txt; }
	else echo $txt;
}
static public function jsLoad_iniDef($Tbk=array(),$inisys='0s'){
	if(is_array($Tbk)) foreach($Tbk as $n => $tbk){
		if(array_key_exists($tbk,_0s::$jsL)){ _0s::$jsL[$tbk]['inisys']=$inisys; }
	}
}

static public function TbF($k=''){//_0s::TbF();
	if(self::$TbF[$k]){ return self::$TbF[$k]; }
	else{ return ''; }
}
static public function max_time($seg=30){
	set_time_limit($seg);
	self::$Memory['max_time']=$seg;
}
static public function reqHeads($k=false){
	$headers = array();
	foreach($_SERVER as $key => $value){
		if(preg_match('/^HTTP\_/',$key)){
			$tk=strtolower(str_replace('HTTP_','',$key));
			if($k && $k==$tk){ return $value; }
			$headers[$tk] = $value;
		}
	}
	if($k){ return $headers[$k]; }
	return $headers;
}
static $router=false; static $brouter=false; //sin GET
static public function router($__M_K='',$r=false){
	self::$router=false;
	$M=preg_replace('/(GET|PUT|DELETE|POST).*/','$1',$__M_K);
	$K=preg_replace('/(GET|PUT|DELETE|POST)\s?(.*)/','$2',$__M_K);
	if($r){
		echo $M.'='.$K.' //self... '.self::$__M.'='.self::$__K.'
';
	}
	self::$router=self::$__M.' '.self::$__K;
	if(self::$__M==$M && self::$__K==$K){ return $M.'->'.$K; }
	return false;
}
static public function app($app=false,$P=array()){
	self::$routerApp_err=false; $fileOk=false;
	$appEnd=explode('.',self::$__K);
	$appEnd=($appEnd && $appEnd[0])?$appEnd[0]:$appEnd[0];
	$aIs= (array_key_exists('a',$P));
	$a=($aIs)?$P['a']:false;
	$ma=($P['ma'])?$P['ma']:false;
	self::$router=self::$__M.' '.self::$__K;
	if($aIs && ($appEnd=='' || preg_match('/^('.$a.')$/',$appEnd))){// task/inbox, task/assg
		$appEnd='a'; $fileOk=true;
	}
	else if($ma){
		if(!preg_match('/^('.$ma.')$/',$appEnd)){ die(_js::e(3,'Link ma undefined action to '.self::$router)); }
		else{ $fileOk=true;  }
	}
	if($fileOk==false){die(_js::e(3,'Link undefined action to '.self::$router.' end:('.$appEnd.')')); }
	$app=($app)?'/_rest/'.$app.'/':'/_rest/';
	self::$routerApp = self::$Path_static . $app . $appEnd.'.php';
}

static $msgDie=false;
static public function msgDie($verif=false,$msg=''){
	if($verif){ die(_js::e(3,$msg)); }
}
static public function routerApp($ma=false,$app=false){
	self::$routerApp_err=false;
	self::$router=self::$__M.' '.self::$__K;
	if($ma){
		if(!preg_match('/^(a|'.$ma.')$/',self::$__Ko)){
			die(_js::e(3,'Link undefined action to '.self::$router));
		}
	}
	$app=($app)?'/_rest/'.$app.'/':'/_rest/';
	self::$routerApp = self::$Path_static . $app . self::$__Ko.'.php';
}
static public function ocardcode($r=false){
	$ocardtooken=''; $ra='ninguna';
	if($_GET['___ocardtooken']){ $ocardtooken=$_GET['___ocardtooken']; $ra='_GET'; }
	else{ $ocardtooken=_0s::reqHeads('ocardtooken'); $ra='head'; }
	if(!_js::ise($ocardtooken)){ $ra .='-> JWT';
	_ADMS::_lb('_jwt');
	$tok=_JWT::decode($ocardtooken);
	if(_JWT::$err==3){ die(_js::e(3,_JWT::$errNoText,'"requireLogin":"Y", "from":"_0s.ocardcode","ocardtooken":"'.$ocardtooken.'"')); }
	else if(_JWT::$err){ die(_js::e(3,_JWT::$errNoText,'"tookenErr":true, "from":"_0s.ocardcode","ocardtooken":"'.$ocardtooken.'"')); }
	$ocardcode=$tok['ocardcode'];
	}
	else{ $ocardcode = _0s::reqHeads('ocardcode'); $ra .= '-> heads'; }
	if($r){ return 'ocardtooken:'.$ocardtooken.', ocardcode('.$ocardcode.') ==> '.$ra; }
	self::$ocardtooken=$ocardtooken;
	self::$ocardcode=$ocardcode;
	return $ocardcode;
}
static public function disc($final=1,$inicial=1){
	if($inicial==0){ return 99.99; }
	return round((100-($final/$inicial)*100),2);
}
}

class __SysD{
static $k=false;
static $V=array();
static public function puse($A=array()){
	$k=$A['jsV'].'.'.$A['k'];
	self::$V[$k]=$A;
	self::$V[$k]['idk']=$k;
}
static public function updFie($k='',$L=array(),$F=false){
	if(!is_array($F)){
		$F=array('editable','ini','k','v');
	}
	if(!self::$V[$k]){ self::$V[$k]=array(); }
	foreach($F as $k1){
		if($L[$k1]){ self::$V[$k][$k1]=$L[$k1]; }
	}
}
}

class rEq{
static public function script($A=array(),$P=array()){
	//src, ?___ocardtooken
	$len=count($A);
	$s='';
	$stook='';
	for($n=0; $n<$len; $n++){
	$L=$A[$n];
	$pars='';
	if(preg_match('/\?$/',$L['src'])){ $pars='&'; }
	$pars.= _0s::$Cache_js;
	$parst=$pars;
	$parst.=($L['tooken']=='Y')?'&___ocardtooken=\'+$0s.stor(\'ocardtooken\')':'\'';
	$srcP='';
	$func=',{ ';
	if($L['defer']=='Y'){ $func .= 'defer:true,'; $srcP .='defer '; }
	if($L['func']){ $func .= 'func:function(){ '.$L['func'].'},'; }
	$func = substr($func,0,-1).'}';
	$http='';
	if($L['static']=='Y'){ $http = _0s::$Path_http; }
	$L['src']=$http.$L['src'];
	if($L['srcCache']){
		$srcP .='href="'.$L['src'].'" ';
		$L['src']=$http.$L['srcCache'];
	}
	if($P['html'] && $L['tooken']!='Y'){ $s .= '<script type="text/javascript" src="'.$L['src'].$pars.'"  '.$srcP.'></script>'."\n"; }
		else{ $stook .= '$js.getScript(\''.$L['src'].'?p='.$parst.''.$func.');'."\n"; }
	}
	if($P['html']){ return array('s'=>$s,'stook'=>$stook); }
	else{ echo $stook; }
}
}

function reqHeads($k=false){ return _0s::reqHeads($k); }
function reqFile($F=array(),$path=false){
	$rootPATH = ($path)?$path:realpath($_SERVER['DOCUMENT_ROOT']);
	if(is_array($F)) foreach($F as $k => $L){
		require_once($rootPATH.$L['src']);
	}
}

/* tablas */
_0s::$Tb['wma3_dcf1']='wma3_dcf1';
_0s::$Tb['wma3_dcf2']='wma3_dcf2';
_0s::$Tb['wma3_ddf1']='wma3_ddf1';
_0s::$Tb['wma3_doc99']='wma3_doc99';
_0s::$Tb['wma3_lop1']='wma3_lop1';
_0s::$Tb['wma3_odcf']='wma3_odcf';
_0s::$Tb['wma3_oddf']='wma3_oddf';
_0s::$Tb['wma3_odp1']='wma3_odp1';
_0s::$Tb['wma3_odp20']='wma3_odp20';
_0s::$Tb['wma3_odp21']='wma3_odp21';
_0s::$Tb['wma3_oodp']='wma3_oodp';
_0s::$Tb['wma3_opdp']='wma3_opdp';
_0s::$Tb['wma3_pdp1']='wma3_pdp1';
_0s::$Tb['wma_cif1']='wma_cif1';
_0s::$Tb['wma_cif2']='wma_cif2';
_0s::$Tb['wma_ilc1']='wma_ilc1';
_0s::$Tb['wma_mpg1']='wma_mpg1';
_0s::$Tb['wma_mpg2']='wma_mpg2';
_0s::$Tb['wma_ocif']='wma_ocif';
_0s::$Tb['wma_ompg']='wma_ompg';
_0s::$Tb['wma_owfa']='wma_owfa';
_0s::$Tb['wma_owop']='wma_owop';



_0s::$MailConf=c::$EmailSvr;
_0s::$timei=($ADMS_time)?$ADMS_time: microtime(true);
_0s::$Memory['max_time_ini']=_0s::$Memory['max_time']=ini_get('max_execution_time');
$___host=$_SERVER['HTTP_HOST'];
$___uri = $_SERVER['REQUEST_URI'];
$_com = preg_match('/\.(com|co|net|es)$/is',$___host);
$_192 = preg_match('/^192\./is',$___host);
$_dr = preg_match('/^[a-z]\:/is',$_SERVER['DOCUMENT_ROOT']);
_0s::$Host_localMode = ($_com) ? 'N' : 'Y';
_0s::$db_localMode = ($_com || $_dr) ? 'N' : 'Y';
_0s::$isWinPath=($_dr)?'Y':'N';
if(array_key_exists('ADMS_APP_KEY',$_GET)){ $_GET['APIKEY'] = $_GET['ADMS_APP_KEY']; }
if(array_key_exists('ADMS_API_METHOD',$_GET)){ $_GET['APIMET'] = $_GET['ADMS_API_METHOD']; }
if(preg_match('/^\/(GET|DELETE|POST|PUT)/',$$___uri) || preg_match('/^\/(xs|s|sa)\//',$___uri)){ _0s::$refApi = 'Y'; }
$__Mr=$__M=($_SERVER['REQUEST_METHOD']);
$__M = (array_key_exists('APIMET',$_GET) && $_GET['APIMET']!='') ? $_GET['APIMET'] : $__M;
$__K = (array_key_exists('APIKEY',$_GET)) ? $_GET['APIKEY'] : '';
$__Kf = $ADMS_KEYf = (array_key_exists('APIKEYf',$_GET)) ? $_GET['APIKEYf'] : '';
_0s::$_P_['next'] = (array_key_exists('_pnext',$_GET)) ? $_GET['_pnext'] : 0;
$appKey = explode('.',$__K);
if(is_array($appKey)){ _0s::$__Ko= $appKey[0]; }
else{ _0s::$__Ko= $appKey; }
if(_0s::$__Ko==''){ _0s::$__Ko='a'; }
$__K = $ADMS_KEY = (isset($appKey[1])) ? $appKey[0] : $__K; unset($appKey[0]);
$__Ko = $ADMS_KEYo = $appKey;
$__Kf= preg_replace('/^(GET|POST|PUT|DELETE)?\_?/','',$__Kf);
$__APIFILE=$_GET['APIFILE'];
$__fK= $_GET['APIFILE'].'.'.$__Kf;
_0s::$__M=$__M;
_0s::$__K=$_GET['APIKEY'];
_0s::$_hashKeyR = $_GET['_haskKey']; unset($_GET['_haskKey']);
_0s::$_hashKey = $__fK;
_0s::$hashDefine=$_GET['_hashDefine']; unset($_GET['_hashDefine']);
//print_r($_GET);
$OTy = array('comment'=>'comment','fileUpd'=>'fileUpd'); //Tipos
unset($_POST['alet'],$_GET['alet'],$_GET['_alet'],$_POST['_alet'],$_GET['js_Access'],$_GET['ADMS_APP_KEY'],$_GET['ADMS_API_METHOD'],$_GET['ADMS_APP_METHOD'],$_GET['ps_display_errors'],$_GET['APIMET'],$_GET['APIKEY'],$_GET['APIKEYf'],$_GET['APIFILE'],
$_GET['_pnext']);
$___D=(array_key_exists('__getIsPost',$_GET) || $__Mr=='GET')?$_GET:$_POST;
unset($_GET['__getIsPost'],$___D['__getIsPost']);
_0s::$D['textSearch']=$___D['textSearch'];
unset($___D['serieType'],$___D['textSearch']);
$_J=array();
if(preg_match('/application\/json/i',$_SERVER['CONTENT_TYPE'])){
	$_J= json_decode(file_get_contents('php://input'), TRUE );
}
else{ //quitar else si falla
switch($__Mr){
	case 'PUT': parse_str(file_get_contents("php://input"),$___D); break;
	case 'DELETE': parse_str(file_get_contents("php://input"),$___D); break;
}
}
?>
