<?php
class Siigo{
static $iSoc=array('cardName'=>'Nombre Empresa SAS',
'slpCode'=>1,'codeCity'=>283,'codeZone'=>0,
'nit'=>1125082000,
);
static $Temp=[];
static public function fieReset($fies='',$D=array()){
	$F=explode(',',$fies);
	foreach($F as $n => $k){
		$D[$k]='';
	}
	return $D;
}
static public function iniSoc($k1='',$k2=''){
	$q=a_sql::fetch('SELECT jsv FROM itf_odov WHERE k=\''.$k1.'\' LIMIT 1',array(1=>'Error obteniendo parametrización para ['.$k1.']: ',2=>'No se ha definido parametrización para ['.$k1.']'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	self::$iSoc=json_decode($q['jsv'],1);
	$q=a_sql::fetch('SELECT jsv,trs FROM itf_odov WHERE k=\''.$k2.'\' LIMIT 1',array(1=>'Error obteniendo parametrización para ['.$k2.']: ',2=>'No se ha definido parametrización para ['.$k2.']'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$q['trs']=json_decode($q['trs'],1);
	return $q;
}
static $Base=array(); /* valor bases */
static $Tds=array();/* genera tds vacios para ancho fijo de lineas */
static public function getHead($tr=array(),$P=array()){//2021-usm
	$trR=array(); 
	$tdN=1;
	foreach($tr as $k => $L){
		self::$Base[$k] ='';
		if($P['def'] && $P['def'][$k]){ self::$Base[$k]=$P['def'][$k]; }
		else{
			if(array_key_exists($k,self::$iSoc)){ $L['d']=self::$iSoc[$k]; }
			else if(array_key_exists('d',$L)){ self::$Base[$k]=$L['d']; }
		}
		self::$Tds[$tdN]=''; $tdN++;
		$trR[$k]=($L['t']);
	}
	return $trR;
}
static public function getDocHead($tr=array(),$P=array()){
	$trR=array(); 
	$nM=array();
	if($P['noDraw'] && self::$iSoc[$P['noDraw']]){ $nM=self::$iSoc[$P['noDraw']]; }
	$tdN=1;
	foreach($tr as $k => $L){
		if(array_key_exists($k,$nM)){ continue; } //omitir
		if(array_key_exists($k,self::$iSoc)){ $L['d']=self::$iSoc[$k]; }
		if(array_key_exists('d',$L)){ self::$Base[$k]=$L['d']; }
		else{ self::$Base[$k] =''; }
		self::$Tds[$tdN]=''; $tdN++;
		$trR[$k]=($L['t']);
	}
	return $trR;
}
static public function barcodeSep($code=''){
	return array('l'=>substr($code,0,3),'g'=>substr($code,3,4),'code'=>substr($code,-6));
}

static public function acc2Itm($Mx=array(),$P=array(),$L=array()){
	if($P['accSell']){/* 4120 - venta */
		$Mx['lineNum']=$P['lineNum'];
		$Mx['debCred']=$P['debCred'];
		$Mx['vatPrc']=$L['vatPrc'];
		$Mx['vatSum']=$L['vatSum'];
		$Mx['whsCode']=$L['whsCode'];
		$Mx['accCode']=$L['accSell'];
		$Mx['quantity']=$L['quantity'];
		$Mx['valorSec']=$P['valorSec'];
		$Mx['secGravada']=$P['secGravada'];
	}
	if($P['accIvt']){/* 14 - inventario */
		$Mx['lineNum']=$P['lineNum'];
		$Mx['debCred']=$P['debCred'];
		$Mx['accCode']=$L['accIvt'];
		$Mx['valorSec']=$P['valorSec'];//costo
		$Mx['secGravada']=$P['secGravada'];
	}
	if($P['accCost']){/* 61 - costo */
		$Mx['lineNum']=$P['lineNum'];
		$Mx['debCred']=$P['debCred'];
		$Mx['accCode']=$L['accCost'];
		$Mx['valorSec']=$P['valorSec'];//costo
		$Mx['secGravada']=$P['secGravada'];
	}
	return $Mx;
}
}

?>