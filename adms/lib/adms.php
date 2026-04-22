<?php
class adms__{
static $Svr=array();
static $err=false; static $errText='';
/*modules */
static $Load=array(); /* lTask,GeDoc,Gsn*/
static $Mdl=array(
'lTask_emailNtyAssg'=>'N'
);
static public function _r(){ self::$err=false; self::$errText= ''; }
static public function getInfo($P=array()){
	a_sql::dbase(self::$Svr);
	$ocard=($P['ocard'])?','.$P['ocard']:'';
	$qu1='SELECT A.ocardId'.$ocard.' ';
	$qu2='FROM ocard A ';
	if($P['ofil']){
		$qu1 .=','.$P['ofil'];
		$qu2 .= 'JOIN ofil F ON (F.ocardId=A.ocardId) ';
	}
	if($P['om_ltas']){
		$qu1 .=','.$P['om_ltas'];
		$qu2 .= 'JOIN om_ltas LT ON (LT.ocardCode=A.ocardCode) ';
	}
	$q=a_sql::fetch($qu1.' '.$qu2.' WHERE A.ocardCode=\''._0s::$ocardcode.'\' LIMIT 1',array(1=>'Error obteniendo información on Attach::revStor().',2=>'El ocardcode ('._0s::$ocardcode.') no existe en nuestros servidor at Attach::revStor().'));
	if(a_sql::$err){ self::$err=true; return self::$errText= a_sql::$errNoText; }
	else{
		if(array_key_exists('svr',$q)){
			$rk=array('L'=>$q['svrLocal']);
			$q['svr']= $rk[$q['svr']]; unset($q['svrLocal']);
		}
		return $q;
	}
}
static public function mdl(){
	if(self::$Load['lTask']=='Y'){ _ADMS::_app('lTask'); }
	if(self::$Load['gsn']=='Y'){ _ADMS::_app('gsn'); }
}
static public function mdLoad($k='',$v='Y'){
	if(self::$Load[$k]===$v){  _ADMS::_app($k); }
	else{ return false; }
}
static public function active($k='',$v='Y'){
	if(self::$Mdl[$k]===$v){ return true; }
	else{ return false; }
}

static public function numAlet($longitud=4,$type=false) {//to _js::
	return _js::numAler($longitud,$type);
}
}
?>
