<?php
/*
 200=ok, 201=created, 204=no content (sin datos),
 301=movido, 302-303=recurso esta en esta url, 307
 400=bad request, 401=unauthorized (sin login), 403=forbidden (sabe quien pero sin permisos), 404=not found, 405=method not allowed
 500=, 502=bad gateway, 503=service unavailable
 ---
 ?sort=&fields[articules]=content
  &filter[title]=laravel&
  &page[size]=10&page[number]=2
*/
class JRoute{
	static $bodyType='G';//G, JS,PUT
	static $Appi=false;
	static $public=false;
	static $Met='';
	static $path='';//(a/)mpa/tas
	static $bs='x'; //a,x,
	static $Ctr; //controlador
	static $app='';
	static $app2='';
	static $view='';
	static $Page=array();
	static $ok=false;
	static public function getData(){
		return json_decode(file_get_contents('php://input'), TRUE );
	}
	static public function pathMatch($es=''){
		if(preg_match('/'.$es.'/i',self::$path)){ return true; }
		return false;
	}
	static public function getParms($path){
		$PRv=false;
		if(preg_match('/\{(.*)\}/',$path)){//save gid->gid
			preg_match_all('/\{(\w+)\}/',$path,$Pwh);
			unset($Pwh[0]);
			if(count($Pwh[1])==0){ $Pwh=false; }
			else{ $Pwh=$Pwh[1]; $PRv=array();
				foreach($Pwh as $kv){ $PRv[$kv]=$kv; }
			}
		}
		return $PRv;
	}
	static public function req($path='',$fx,$P=array(),$met=false){
		if(fOCP::$reqFile){ fOCP::req(fOCP::$reqFile,fOCP::$isReq); }
		unset($_GET['textSearch']);
		self::$ok=false; //echo $path.'';
		/* Multiple views */
		if(is_array($path)){
			foreach($path as $v){
				self::req($v,$fx,$P,$met);
				if(self::$ok){ break; }
			}
		}
		$isOk=true; $RV=array();
		/* verificar parametros {gid:val} */
		$PRv=self::getParms($path);
		if(is_array($PRv)){
			$sep=explode('/',$path); /* debe ser === /vapp/itm */
			$sepR=explode('/',self::$path);
			$isWh=(isset($P['_wh']));
			if(count($sep)!=count($sepR)){ $isOk=false; }
			else foreach($sep as $n=>$va){
				$va=preg_replace('/(\{|\})/','',$va);
				if(!$PRv[$va]){ continue; }//no existe, omitir revision
				$RV[$va]=$sepR[$n]; //almaceno
				if($isWh){
					if($P['_wh'][$va]=='*'){ continue; }
					if($P['_wh'][$va] && !preg_match('/^'.$P['_wh'][$va].'$/',$sepR[$n])){ $isOk=false; break; }
				}
			}
			unset($sep,$sepR);
		}
		else{ $isOk=(self::$path==$path); }
		if($isOk && self::$Met==$met){
			$_D=array();
			if(self::$bodyType=='JS'){ $_D=json_decode(file_get_contents('php://input'), TRUE ); }
			else if(self::$bodyType=='P'){ parse_str(file_get_contents("php://input"),$_D); }
			else if($met=='POST'){ $_D=$_POST; }
			else{ $_D=$_GET; foreach($RV as $k=>$v){ $_D[$k]=$v; } }
			if($P['hashPerms']){ a_ses::hashKey($P['hashPerms']); }
			if($P['libM']){ _ADMS::libM($P['libM'][0],$P['libM'][1]); }
			if($P['c']){ _ADMS::ctrls($P['c']); }
			if($P['lib']){ _ADMS::lib($P['lib']); }
			if(self::$Appi){
				if(is_string($fx)){ echo self::$Ctr->{$fx}($_D,$RV); }
				else if(is_callable($fx,true)){ echo $fx($_D,$RV,self::$Ctr); }
			}
			else{
				if(is_string($fx)){ echo self::$Ctr->{$fx}($_D,$RV); }
				else if(is_callable($fx,true)){ echo $fx($_D,$RV,self::$Ctr); }
			}
			self::$ok=true;
			c::getMemory('end');
			die();
		}
        else{
//            $errCode=400; header($_SERVER['SERVER_PROTOCOL'].'',true, $errCode);
//            $errText='Bad Request. api request not found ('.self::$path.'=='.$path.' // '.self::$Met.'=='.$met.')';
//            include('errCode.php');
//            die();
        }
	}
	static public function get($path='',$fx,$P=array()){
		return self::req($path,$fx,$P,'GET');
	}
	static public function post($path='',$fx,$P=array()){
		return self::req($path,$fx,$P,'POST');
	}
	static public function put($path='',$fx,$P=array()){
		return self::req($path,$fx,$P,'PUT');
	}
	static public function delete($path='',$fx,$P=array()){
		return self::req($path,$fx,$P,'DELETE');
	}
	/* Render */
	static public function render($type='private'){
		if($type=='public'){ // vapp/public/itm.php
			$reqFil=c::$V['PATH_ROOT'].'appi/'.c::$URI['app'].'/public/'.c::$URI['ctr'].'.php';
		}
		else if($type=='open'){ // vapp/public/itm.php
			$reqFil=c::$V['PATH_ROOT'].'appi/'.c::$URI['app'].'/open/'.c::$URI['ctr'].'.php';
		}
		else if($type=='defined'){ // vapp/public/itm.php
			return $reqFil=c::$V['PATH_ROOT'].'appi/'.c::$URI['routeDefined'].'.php';
		}
		else{ // vapp/private/itm.php
			$reqFil=c::$V['PATH_ROOT'].'appi/'.c::$URI['app'].'/private/'.c::$URI['ctr'].'.php';
		}
		if(!file_exists($reqFil)){
			http_response_code(404);
			die(_js::e(3,'Sorry, the page you are looking for could not be found. on[JRoute::render()] -> '.self::$view.'.'));
		}
		$fController=c::$V['PATH_ROOT'].'appi/'.c::$URI['app'].'/controllers/'.c::$URI['ctr'].'.php';
		if(is_file($fController)){
			$xApp=c::$URI['app'].'/'.c::$URI['ctr']; // vappitm = vappItm
			$xApp=preg_replace_callback('/\/(\w{1})/', function($mx){ return strtoupper($mx[1]); }, $xApp);
			$fController=c::$V['PATH_ROOT'].'appi/'.c::$URI['app'].'/controllers/'.c::$URI['ctr'].'.php';
			require($fController); //omitir por si no existe
			self::$Ctr =new $xApp;
		}
		require($reqFil);
		return $reqFil;
	}
	static public function renderJS($mdl=false){
		if(self::$bs=='1c'){ //socios
			$reqFil=c::$V['PATH_ROOT'].'/html/apis1/_restcards/'.self::$view.'.php';
		}
		else if(self::$bs=='js'){ $reqFil=c::$V['PATH_ADMS'].'views/'.self::$view.'.php'; }
		else if(self::$bs=='jsx'){ $reqFil=c::$V['PATH_ADMS'].'views/'.self::$view.'.php'; }
		else{ $reqFil=c::$V['PATH_ADMS'].'views/'.self::$view.'.php'; }
		if(!file_exists($reqFil)){
			die(_js::e(3,'Mdl to app not create. on[JRoute::renderJS()] -> '.self::$view));
		}
		self::$Ctr=JApp::init();
		require($reqFil);
		return $reqFil;
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
		if($k=='_c'){ return c::$H=$headers; }
		return $headers;
	}
	static public function apiResource($path='',$P=[]){
		JRoute::get($path,'index'); # /card -> get all
		JRoute::get($path.'/show','show'); # /card/show -> get one
		#create -> form recurso
		JRoute::post($path,'store');# /card -> new
		JRoute::put($path,'update');# /card -> actualizar
		JRoute::delete($path,'destroy');# /card -> eliminar 
	}
}

class JRModel{
	static $R=array(); /*
	tbk=>{docEntry->int,(10), unsigned, not auto_increment
	[0=text,number,list, 1=int
	*/
	static public function sett($tbk='',$D){
		self::$R[$tbk]=$D;
	}
	static public function sql($G=array()){
		$tbk=$G['tbk'];
		if(!self::$R[$tbk]){ return _err::err('Model '.$tbk.' is undefined.'); }
		else{
			$isAlter=($G['type']=='alter');
			$sql ='';
			if($G['type']=='dc'){ a_sql::query('DROP TABLE IF EXISTS `'.$tbk.'`'); }
			$sql .='CREATE TABLE `'.$tbk.'` (';
			if($isAlter){ $sql='ALTER TABLE `'.$tbk.'`'; }
			foreach(self::$R[$tbk] as $fie =>$ld){
				if($fie=='_index'){ continue; }
				if($isAlter){ $sql .=' CHANGE COLUMN `'.$fie.'` `'.$fie.'` '.$ld."\n"; }
				else{ $sql .=' `'.$fie.'` '.$ld."\n"; }
			}
			if(self::$R[$tbk]['_index']){ 
				$sql .= ($isAlter)
				?'# , add '.implode(', add ',self::$R[$tbk]['_index'])
				: ', '.implode(', ',self::$R[$tbk]['_index']);
			}
			if(!$isAlter){ $sql .="\n)"; }
			if($G['ac']=='exec'){
				$q=a_sql::query($sql,[1=>'Error realizando creación del modelo de tabla']);
				if(a_sql::$err){ return _err::err(a_sql::$errNoText); }
				else{ return _js::r('Modelo '.$tbk.', creado correctamente'); }
			}
		}
		return $sql;
	}
}

JRoute::$Met=$_SERVER['REQUEST_METHOD'];
$uri1 = c::$URI['_'];
JRoute::$bs=c::$URI[0]; //  /{y,xl,a}/map/tas
JRoute::$app=c::$URI[1]; // /y/{mpa,crd}/tas
JRoute::$view=c::$URI[1].'/'.c::$URI[2]; // mpa/tas
// fix route private
JRoute::$path=preg_replace('/^'.JRoute::$bs.'\/?/','',$uri1); //all mpa/tas/xxx/yyy/zzz..
JRoute::$app2=preg_replace('/^'.c::$URI[0].'\/'.c::$URI[1].'\/?/','',$uri1);; // pubapps/(emailSend)
unset($uri);
unset($_POST['alet'],$_GET['alet'],$_GET['_alet'],$_POST['_alet'],$_GET['js_Access']);
if(preg_match('/application\/json/i',$_SERVER['CONTENT_TYPE'])){ Jroute::$bodyType='JS'; }
else if(JRoute::$Met=='PUT' || JRoute::$Met=='DELETE'){ JRoute::$bodyType='P'; }
?>