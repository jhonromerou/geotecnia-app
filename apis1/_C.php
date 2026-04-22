<?php
class _C{
static $K=array();
static public function e($k='',$v=false){
	if(array_key_exists($k,self::$K)){
		if($v!==false){
			if(self::$K[$k]==$v){ return true; }
		 else{ return false; }
		}
		return true;
	}
	return false;
}
static $errText=false;
}

?>