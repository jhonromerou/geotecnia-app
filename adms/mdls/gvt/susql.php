<?php
if(a_ses::$userId!=1){ die(_js::e(4,'Solo el supersu puede realizar estas acciones')); }
if(_0s::$router=='GET susql/ivtFromPvt'){
echo 'Actualizando itm_oitw desde gvt_pvt1 valores pendientes en isCommited
';
/* ojo con bodegas a dejar en 0 */
a_sql::query('UPDATE ivt_oitw SET isCommited=\'0\' WHERE 1 ');
$upds=0;
$q=a_sql::query('SELECT A.whsId,B.itemId,B.itemSzId, SUM(B.openQty) isCommited 
FROM gvt_pvt1 B 
JOIN gvt_opvt A oN (A.docEntry=B.docEntry)
 WHERE A.docStatus=\'O\' AND B.openQty>0 
	GROUP BY A.whsId,B.itemId,B.itemSzId');
	print_r($q);
while($L=$q->fetch_assoc()){
	$u=a_sql::uniRow($L,array('tbk'=>'ivt_oitw','wh_change'=>'itemId=\''.$L['itemId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' AND whsId=\''.$L['whsId'].'\' LIMIT 1'));
	if(a_sql::$errNo==1){ echo 'Error: '.$L['whsId'].') '.$L['itemId'].'-'.$L['itemSzId'].' --> isCommited=\''.$L['isCommited']."\n"; break; } #*/
	else{ $upds++; }
}
echo 'Actualizados: '.$upds;
}
?>