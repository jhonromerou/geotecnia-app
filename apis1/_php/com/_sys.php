<?php
class _sys{
static $err=false; static $errText='';
static public function _r(){
	self::$err=false; self::$errText='';
}
static public function du($path='',$p='s',$udm='Mb'){
	/*b=bytes, s= */
	self::_r();
	exec('du -b'.$p.' '.$path,$Ds);
	$R=array();
	if(is_array($Ds)){
		foreach($Ds as $n=>$x){
			$sep=explode('	',$x);
			$len=number_format($sep[0]/1048576,6);
			$R[$sep[1]]=$len;
		}
	}
	return $R;
}
}
?>