<?php
if(a_ses::$userId!=1){ die(_js::e(3,'Usuario sin permisos')); }
//die(_js::e(3,'deshabilitado'));
if($_GET['qu1']){ /* mover inventario de doc despacho  */
	$gb='';
	$q=a_sql::query("SELECT 
B.docEntry tr,B.itemId,B.itemSzId,A.whsId,SUM(B.quantity) quantity
FROM gvt_dlv1 B
JOIN gvt_odlv A ON (A.docEntry=B.docEntry)
JOIN itm_whs1 W ON (W.whsId=A.whsId AND W.itemId=B.itemId AND W.itemSzId=B.itemSzId)
WHERE A.dateC >'2020-01-28 00:00:00'
GROUP BY B.docEntry,B.itemId,B.itemSzId,A.whsId ");
$Doc=array();
while($L=$q->fetch_assoc()){
	$k=$L['tr'];
	if(!$Doc[$k]){ $Doc[$k]=array(); }
	$Doc[$k][]=array('whsId'=>$L['whsId'],'itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'outQty'=>$L['quantity']);
}
_ADMS::_app('Invt');
foreach($Doc as $tr=>$Lx){
	Invt::onHand_put($Lx,array('docDate'=>date('Y-m-d'),'tt'=>'odlv','tr'=>$tr));
}
	if(Invt::$err){ echo Invt::$errText;  $errs++; }
}
else if($_GET['rever']){ /* reversar todos los odlv desde el 28  */
	$gb=''; die('Revertido');
	$q=a_sql::query("SELECT A.docEntry FROM gvt_odlv A 
WHERE A.dateC >'2020-01-28 00:00:00' ");
_ADMS::_app('Invt');
a_sql::transaction(); $cmt=false; $errs=0;
while($L=$q->fetch_assoc()){
	Invt::onHand_rever(array('docDate'=>date('Y-m-d'),'tt'=>'odlv','tr'=>$L['docEntry']));
	if(Invt::$err){ echo Invt::$errText;  $errs++;  break; }
}
if($errs==0){ a_sql::transaction(true); }
}
else if($_GET['corre']){ /* volver a replicar los movimientos */
	$gb=''; die("corregido");
	$q=a_sql::query("SELECT 
B.docEntry tr,B.itemId,B.itemSzId,A.whsId,SUM(B.quantity) quantity
FROM gvt_dlv1 B
JOIN gvt_odlv A ON (A.docEntry=B.docEntry)
WHERE A.dateC >'2020-01-28 00:00:00'
GROUP BY B.docEntry,B.itemId,B.itemSzId,A.whsId ");
$Doc=array();
while($L=$q->fetch_assoc()){
	$k=$L['tr'];
	if(!$Doc[$k]){ $Doc[$k]=array(); }
	$Doc[$k][]=array('whsId'=>$L['whsId'],'itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'outQty'=>$L['quantity']);
}
a_sql::transaction(); $cmt=false; $errs=0;
_ADMS::_app('Invt');
foreach($Doc as $tr=>$Lx){
	Invt::onHand_put($Lx,array('docDate'=>date('Y-m-d'),'tt'=>'odlv','tr'=>$tr));
	if(Invt::$err){ echo Invt::$errText;  $errs++; break; }
}
if($errs==0){ a_sql::transaction(true); }
}
?>