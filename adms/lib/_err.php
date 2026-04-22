<?php
class _err{
static $ok=false;
static $err=false;
static $errText='';
static public function i($t='',$errNo=false){
	self::$err=false; self::$errText='';
}
static public function err($t='',$errNo=false){
	self::$err=true; self::$errText=$t;
	if($errNo){
		return self::$errText= _js::e($errNo,$t);
	}
	else{ return $t; }//js
}
static public function errDie(){
	if(_err::$err){ die(_err::$errText); }
}
static public function excep($t='',$errNo=false){
	$err=error_get_last();
	$t=$t.' '.$err['message'];
	_err::err($t,$errNo);
}

static public function iff($bol=false,$txt='',$errNo=3){
	self::$ok=false;
	if($bol){ _err::err($txt,$errNo); return _err::$errText; }
	else{ self::$ok=true; return false; }
}
static public function errIf($eif=false,$t='',$errNo=false){
	if($eif){ self::err($t,$errNo); return true; }
	return false;
}
}
?>
