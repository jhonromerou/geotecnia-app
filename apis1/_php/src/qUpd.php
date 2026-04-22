<?php

class qUpd{
static $err=false;
static $errText='';
static public function _reset(){
	self::$err=false; self::$errText='';
}
static public function pvt_openQty($D=array()){
	self::_reset(); /*  pasar -quantity para disminuir, o solo quantity para aumentar */
	if(self::$errText=_js::ise($D['docEntry'],'El número de documento debe estar definido (pvt_openQty).')){ self::$err=true; }
	else if(self::$errText=_js::ise($D['itemId'],'El ID del producto debe definirse (pvt_openQty).')){ self::$err=true; }
	else if(self::$errText=_js::ise($D['itemId'],'La talla del producto debe definirse (pvt_openQty).')){ self::$err=true; }
	else if(self::$errText=_js::ise($D['quantity'],'La cantidad debe ser un número: '.$D['quantity'].' (qUpd::pvt_openQty).','numeric')){ self::$err=true; }
	else{
		$upd=a_sql::query('UPDATE '._0s::$Tb['gvt_pvt1'].' SET openQty=openQty+'.$D['quantity'].' WHERE docEntry=\''.$D['docEntry'].'\' AND itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' LIMIT 1',array(1=>$ln.'Error actualizando pendientes abiertos del pedido: '));
		if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
	}
	return self::$err;
}
static public function pvt_dlvStatus($D=array()){
	self::_reset();
	if(self::$errText=_js::ise($D['docEntry'],'Se debe definir el número de documento para actualizar estado despacho del pedido.')){ return self::$err=true; }
	$q=a_sql::fetch('SELECT A.docEntry,SUM(B.quantity) quantity,SUM(B.openQty) openQty FROM gvt_pvt1 B JOIN gvt_opvt A ON (A.docEntry=B.docEntry) WHERE A.docEntry=\''.$D['docEntry'].'\' GROUP BY A.docEntry',array(1=>'Error obteniendo listado de cantidades abiertas.',2=>'El pedido no existe. (openQty_dlvStatus)'));
	if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
	else{
		$dif=$q['quantity']*1-$q['openQty']*1;
		if($dif==0){ $upd='SET docStatus=\'O\', dlvStatus=\'pendiente\' '; }
		else if($q['openQty']>0){ $upd='SET docStatus=\'O\', dlvStatus=\'despacho parcial\' '; }
		else if($q['openQty']<=0){ $upd='SET docStatus=\'C\', dlvStatus=\'despachado\' '; }
		$updq=a_sql::query('UPDATE '._0s::$Tb['gvt_opvt'].' '.$upd.' WHERE docEntry=\''.$D['docEntry'].'\' AND docStatus!=\'N\' LIMIT 1',array(1=>'Error actualizando estado despacho del pedido: '));
		if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
	}
	return self::$err;
}

}
?>