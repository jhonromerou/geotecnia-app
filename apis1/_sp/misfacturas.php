<?php
/* parametros para app misfacturas.com
Creado: 9 nov 2018
Actualizado: 
*/

$pe_MF=array();
$pe_MF['payMethod']=array('efectivo'=>10,'cheque'=>20,'transf'=>41,'consig'=>42);
$pe_MF['licTradType']=array('rc'=>11,'ti'=>12,'dni'=>13,'dne'=>21,'nit'=>31,'pp'=>41,'die'=>42);
$pe_MF['RF_regTrib']=array('rs'=>0,'rc'=>2);
$pe_MF['RF_tipEnt']=array('pj'=>1,'pn'=>2);
$pe_MF['vatType']=array('iva'=>'01','impcons'=>'02','ica'=>'03','retef'=>'04');
$pe_MF['impRet']=array('impuesto'=>false,'retencion'=>true);
$pe_MF['feDocType']=array('fv'=>1,'nc'=>2,'db'=>3);
$pe_MF['dptoId']=array(5=>'Antioquia');
$pe_MF['cityId']=array(5001=>'Medellin');
$pe_MF['curList']=array(
'COP'=>'Colombia, Pesos'
);
$pe_MF['udmList']=array('CMK'=>'Centimetro Cuadrado');
$pe_MF['respStatus']=array(1=>'Creado',2=>'Emitido',3=>'Acusado',4=>'Aceptado',5=>'Rechazado',6=>'Anulado',7=>'Modificado',8=>'Eliminado',9=>'loading XML',10=>'Firmando...',11=>'Enviando a DIAN...');

/* rteICa 
solo se aplica a proveedores del mismo municipio
base = valor - iva, y aplica segun la actividad
*/
?>