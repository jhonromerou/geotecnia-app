<?php
class verify{
static $err=false;
static $errText='';
static $D=array();
static public function _reset(){
	self::$err=false; self::$errText='';
}
static public function _resetAll(){
	self::_reset();
	self::$D=array();
}
static public function itemCode($itemCode=false,$fie=true){
	self::_reset();
	$q=a_sql::fetch('SELECT I.itemId FROM '._0s::$Tb['itm_oitm'].' I WHERE I.itemCode=\''.$itemCode.'\' LIMIT 1',array(1=>$lnt.'Error obteniendo información del artículo.',2=>$lnt.'El código ('.$itemCode.') no existe.'));
	if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
	if(self::$err){ return self::$errText; }
	if($fie){ self::$D['itemId']=$q['itemId']; }
	return false;
}
static public function itemSize($itemSize=false,$fie=true){
	self::_reset();
	$q=a_sql::fetch('SELECT itemSzId FROM '._0s::$Tb['itm_grs1'].' WHERE itemSize=\''.$itemSize.'\' LIMIT 1',array(1=>$lnt.'Error obteniendo información de talla.',2=>$lnt.'La talla ('.$itemSize.') no existe.'));
	if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
	if(self::$err){ return self::$errText; }
	if($fie){ self::$D['itemSzId']=$q['itemSzId']; }
	return false;
}
static public function whsCode($k=false,$fie=true,$P=array()){
	self::_reset();
	$addText=$P['text'];
	$q=a_sql::fetch('SELECT whsId FROM '._0s::$Tb['itm_owhs'].' WHERE whsCode=\''.$k.'\' LIMIT 1',array(1=>$addText.'Error obteniendo información de la bodega: ',2=>$addText.'La bodega ('.$k.') no existe.'));
	if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
	if(self::$err){ return self::$errText; }
	if($fie){ self::$D['whsId']=$q['whsId']; }
	return false;
}
}
?>