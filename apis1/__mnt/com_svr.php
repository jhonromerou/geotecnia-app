<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: ocardtooken,Content-Type');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
require('../../../_inicnf.php');
class _js{
static $err=false; static $errText='';
static public function err($errNo=0,$text=''){
	self::$err=true;
	self::$errText='{"errNo":'.$errNo.',"text":"'.$text.'"}';
	return self::$errText;
}
static public function errLast($errNo=0,$text=''){
	$err=error_get_last();//type,message,file,line
	if($err){ self::$err=true;
		$fil=explode('/',$err['file']);
		$fil=preg_replace('/\.(.*){1,5}$/','',$fil[count($fil)-1]);
		self::$errText='{"errNo":'.$errNo.',"text":"'.$text.': ['.$fil.' At Line '.$err['line'].'::> '.$err['message'].'"}';
		return self::$errText;
	}
}
}
class _Svr{
static $err=false; static $errText='';
static public function ori(){
	$svr = $_SERVER['REMOTE_ADDR'];
	if($svr=='127.0.0.1'){ return true; }
	$ori=(is_array(c::$V['STOR_ORIGINS']))?c::$V['STOR_ORIGINS']:array();
	if(!array_key_exists($svr,$ori)){
		self::$err=true; self::$errText=_js::err(4,'('.$svr.') is not an authorized server to upload images. (err-S901) on[_Svr::ori()]');
		return false;
	}
	else{ return true; }
}
}
?>
