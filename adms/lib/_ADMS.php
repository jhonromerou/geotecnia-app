<?php
class _ADMS{
	static $reqD=array();//definir variable que deseo pasar con require
	static $supersu = false;
	static $NOLOGIN = false;
	protected $DEFAULT_CURRENCY = 'COP';
	static function _lb($f='',$P=array()){//st3/---path
		$path = (array_key_exists('path',$P)) ? $P['path'] : '_php/';
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				require_once($path.$F.'.php');
				}
		}
	}
	static function _app($f='',$noRequire='N',$P=array()){
		if($noRequire=='Y'){ return ''; }
		$path = _0s::$Path_static.'/__apps/';
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				require_once($path.$F.'.php');
			}
		}
	}
	/* Get Libreria new sep 2019 */
	static function lib($f='',$noRequire='N',$P=array()){
		if($noRequire=='Y'){ return ''; }
		$path = c::$V['PATH_LIB']; //c_g('PATH_ROOT').'adms/lib/';
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				require_once($path.$F.'.php');
			}
		}
	}
	static function libExt($f=''){
		require_once(c::$V['PATH_libexterna'].$f.'.php');
	}
	static function config($f=''){
		require_once(c::$V['PATH_ROOT'].'config/'.$f.'.php');
	}
	static function slib($f='',$noRequire='N',$P=array()){
		if($noRequire=='Y'){ return ''; }
		$path = c::$V['PATH_SLIB']; //c_g('PATH_ROOT').'adms/lib/';
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				require_once($path.$F.'.php');
			}
		}
	}
	static function ctrls($f='',$noRequire='N',$P=array()){
		if($noRequire=='Y'){ return ''; }
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				require_once(c::$V['PATH_controllers'].$F.'.php');
			}
		}
	}
	static function libC($mdl='',$f=''){ /* Obtener controllers en appi/{mdl}/{filepath} */
		if($noRequire=='Y'){ return ''; }
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				require_once(c::$V['PATH_ROOT'].'appi/'.$mdl.'/controllers/'.$F.'.php');
			}
		}
	}
	static function libM($mdl='',$f=''){ /* Obtener modelos en appi/nom/xxx */
		if($noRequire=='Y'){ return ''; }
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				require_once(c::$V['PATH_ROOT'].'appi/'.$mdl.'/models/'.$F.'.php');
			}
		}
	}
	static function mApps($f='',$noRequire='N',$P=array()){
		if($noRequire=='Y'){ return ''; }
		self::$reqD=$noRequire;
		$path = c_g('PATH_ROOT').'adms/mapps/';
		$f = ($f!='') ? explode(',',$f) : '';
		if(is_array($f)){
			foreach($f as $n => $F){//sql/filter
				$tfi=$path.$F.'.php';
				if(!file_exists($tfi)){
						trigger_error('Error obteniendo libreria '.$F.' ('.$tfi.')', E_USER_ERROR);
				}
				else{ require_once($tfi); }
			}
			self::$reqD=array();//liberar memoria
		}
	}
	static function libx($f='',$noRequire='N',$P=array()){
	if($noRequire=='Y'){ return ''; }
	$path = c_g('PATH_ROOT').'adms/libx/';
	$f = ($f!='') ? explode(',',$f) : '';
	if(is_array($f)){
		foreach($f as $n => $F){//sql/filter
			require_once($path.$F.'.php');
		}
	}
}
}

class fOCP{
	#permisos llamando archivos, OCard Personality, realiza verificaciones antes de ejecuta otra acción, usar die() para errores.
	static $reqFile=false; //ruta
	static $isReq=false; // usar solo cuando se invoca en JRoute
	static $fx=[];
	static $P=array();
	/* comun */
	static public function fgCom($k=false,$D=[],$reqFile=false,$isReq=false){
		$_existe=false;
		if($reqFile){  $_existe=self::reqCom($reqFile,$isReq); }
		if(is_callable(self::$fx[$k],true)){ return self::$fx[$k]($D); }
		else if($_existe){ die(_js::e(1,'fOCP::fgCom->'.$k.'() not defined on fOCP::req.')); }
	}
	static public function reqCom($reqFile='',$isReq=false){
		$_existe=false;
		self::$P=[];
		$reqFil=c::$V['PATH_OCP'].'z0/'.$reqFile.'.php';
		if(file_exists($reqFil)){ $_existe=true; require($reqFil); }
		else if($isReq){ die(_js::e(1,'fOCP::req: '.$reqFile.' not found on fOCP::reqCom.')); }
		return $_existe;
	}
	/* en ocard */
	static public function fg($k=false,$D=[],$reqFile=false,$isReq=false){
		$_existe=false;
		if($reqFile){ $_existe=self::req($reqFile,$isReq); }
		if(is_callable(self::$fx[$k],true)){ return self::$fx[$k]($D); }
		else if($_existe){ die(_js::e(1,'fOCP::fg->'.$k.'() not defined on fOCP::req.')); }
	}
	static public function req($reqFile='',$isReq=false){
		$_existe=false;
		self::$P=[];
		$reqFil=c::$V['PATH_OCP'].'z'.a_ses::$ocardcode.'/'.$reqFile.'.php';
		if(file_exists($reqFil)){ $_existe=true; require($reqFil); }
		else if($isReq){ die(_js::e(1,'fOCP::req: '.$reqFile.' not found.')); }
		return $_existe;
	}
}

class JxDoc{ // extends en funciones
	//static tbk99, serie
	static public function nextID(){
		if(!_err::$err){
			if(static::$AI){ return a_sql::nextID(static::$tbk,['AI'=>static::$AI]); }
			return a_sql::nextID(static::$tbk);
		}
		return -1;
	}
	static public function nextNum($D=[],$ty='d'){
		docSeries::revi($D);
		if(!_err::$err) return docSeries::nextNum($D,$D);
		return $D;
	}
	static public function formRequire($Da=[],$REV=false,$lnt='',$ln=1){
		if($REV==false){ $REV=static::fieldsRequire(); } //revision 2-3...
		foreach($REV as $n=>$L){
			$val=$Da[$L['k']];
			if(!$L['iMsg']){ $L['iMsg']=$L['k']; }
			$msg=$L['iMsg'].': ';
			if($L['req']=='Y' && _js::iseErr($val,$msg.'debe ser definido')){}
			if(!_err::$err && $L['regExp']){
				if($L['regExp']=='w'){ if(!preg_match('/^\w+$/',$val)){
					_err::err($msg.'Solo puede contener caracteres',3);
				}}
				else if(!preg_match('/^'.$L['regExp'].'$/',$val)){ _err::err($msg.'No cumple los criterios de validación de campo',3); }
			}
			if(!_err::$err){
				switch($L['ty']){
					case 'id' : $msg .='Debe estar definido.'; break;
					case '>0' : $msg .='Debe ser un numero mayor a 0.'; break;
					case 'num' : $msg .='Debe ser un numero. ('.$val.')'; break;
					default: $msg = $msg=$L['iMsg'].': Debe estar definido.'; break;
				}
				$msg=$lnt.$msg;
				if(($L['ty']=='id' || $L['ty']=='>0')){ _js::iseErr($val,$msg,'numeric>0'); }
				else if($L['ty']=='num'){ if(!is_numeric($val)){ _err::err($msg,3); } }
				else if($L['ty']=='isArray'){
					if(_js::isArray($val)){ _err::err($L['iMsg'].': No se envio información',3); }
				}
				else if($L['ty']=='L'){
					//ty=L, k=L,LS,etc, L=>nuevos
					if($L['req']=='N' && _js::isArray($val)){ }
					else{
						if(_js::isArray($val)){ _err::err($L['iMsg'].': No se envio información',3); break;}
						foreach($val as $n2=>$val2){
							self::formRequire($val2,$L['L'],'Linea '.$ln.'. ',$ln);
							$ln++;
							if(_err::$err){ break; }
						}
					}
				}
				else if($L['ty'] && _js::iseErr($val,$msg)){ }
			}
			if(!_err::$err){
				if($L['minLen']>0 && strlen($val)<$L['minLen']){ _err::err($L['iMsg'].': No pueden ser menor a '.$L['minLen'].' caracteres.',3); }
				else if($L['maxLen']>0 && !_js::textLimit($val,$L['maxLen'])){ _err::err($L['iMsg'].': No pueden exceder '.$L['maxLen'].' caracteres.',3); }
			}
			if(_err::$err){ break; }
		}
	}
	static public function tb99($D=array()){
		_ADMS::lib('JLog');
    return JLog::get(array('tbk'=>static::$tbk99,'serieType'=>static::$serie,'docEntry'=>$D['docEntry']));
  }
	static public function tb99P($D=array()){
		$D['tbk']=static::$tbk99;
		$D['serieType']=static::$serie;
		JLog::post($D);
	}

	static public function tbRel1($D=array()){
    _ADMS::lib('JLog');
    return JLog::rel1_get(array('ott'=>static::$serie,'otr'=>$D['docEntry']));
	}
	static public function tbRel1P($D=[]){
		JLog::rel1(['ott'=>$D['ott'],'otr'=>$D['otr'],'tt'=>static::$serie,'tr'=>$D['tr'],'serieId'=>$D['serieId'],'docNum'=>$D['docNum']]);
	}
}

class Mate{
static public function stockValue($L=array(),$P=array()){
	if($P['in']){
		if(!$L['lineTotal']){ $L['lineTotal']=0; }
		$L['._.stockValue']='+-+stockValue+'.$L['lineTotal'];
		$L['._.avgPrice']='+-+stockValue/onHand';
		$L['avgPrice']=$L['lineTotal']/$L['quantity'];
		$L['stockValue']=$L['lineTotal'];
	}
	else if($P['out']){/* sale costo estandar */
		if($L['lineTotal']){
			$L['._.stockValue']='+-+IF(onHand>0,stockValue-('.$L['lineTotal'].'),0)';
		}
		else{ $L['._.stockValue']='+-+stockValue-(avgPrice*'.$L['quantity'].')'; }
		$L['._.avgPrice']='+-+IF(onHand>0,stockValue/onHand,avgPrice)';
		$L['avgPrice']=$L['lineTotal']/$L['quantity']; /* ultimo costo salida */
		$L['stockValue']=$L['lineTotal'];
	}
	return $L;
}
}
?>