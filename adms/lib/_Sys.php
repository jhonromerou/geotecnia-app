<?php
/*
STDIN, STDOUT y STDERR (que pueden ser sustituidos por 0, 1 y 2 respectivamente)
2> 
*/
class _Sys{
static $err=false; static $errText='';
static public function _err($errText='',$errNo=3){
	self::$err=true;
	self::$errText=$errText;
}
static public function execLineTxt($cmd='',$tr=false,$td=false){
	return '<div style="background-color:#CC0">'.$cmd.'</div>	'.self::_exec($cmd,$tr,$td). ' ::error('.self::$err.')==>'.self::$errText.'<br/>';
}
static public function _exec($cmd='',$tr=false,$td=false){
	/* ln y lntsirve para obtener una fila y columna */
	//127-error command simple
	exec($cmd.' 2>&1',$R,$errNo);
	if($R && preg_match('/sh\: 1\:/',$R[0])){ $errNo=127; }
	if($errNo==2){ self::_err('Error exec #2'); }
	else if($errNo==127){ self::_err('Error exec (127) '.$R[0]); }
	else if($errNo){ self::_err('Error exec #'.$errNo); }
	if($tr!==false){ return self::readd($R,$tr,$td); }
	return $R;
}
static public function readd($R=array(),$tr=-1,$td=0){
	$RN=array();
	if(is_array($R)){
		$nr=count($R)-1;
		if($tr=='l'){
			$s=explode('	',$R[$nr]);
			return $s[$td];
		}
		foreach($R as $n=>$vl){
			$s=explode('	',$vl);;
			if($k==$tr){ return $s[$td]; }
			$RN[]=$s;
		}
	}
	return $RN;
}
}
?>