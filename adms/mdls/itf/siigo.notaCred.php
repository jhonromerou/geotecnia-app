<?php
if($js=_js::ise($___D['docSiigo'],'El número de documento siguiente es SIIGO debe definirse.','numeric>0')){ die($js); }
$grTypeId=$___D['grTypeId'];
require('siigo/lb.php');
require('siigo/docTrs.notaCred.php');
Siigo::iniSoc();
$Th=Siigo::getDocHead($tr); unset($tr);
$n=0;
$tds=count($Th)-1;
$Mx=array('tds'=>$tds,'fileName'=>'Plantilla Nota Credito '.$docnam,'L'=>array());
$Mx['L'][$n]=Siigo::$Tds;
$Mx['L'][$n]['1']=Siigo::$iSoc['cardName']; $n++;
$Mx['L'][$n]=Siigo::$Tds;
$Mx['L'][$n]['1']='MODELO PARA LA IMPORTACION DE MOVIMIENTO CONTABLE';
$n++;
$Mx['L'][$n]=Siigo::$Tds; $n++;
$Mx['L'][$n]=Siigo::$Tds; $n++;/* blank to line 5 */
$Mx['L'][$n]=$Th; $n++;
$gb='A.docDate,owhs.whsCode,I.itemName,BC.barCode,I.invPrice,grs1.itemSize,IAC.accSell,IAC.accCost,IAC.accIvt';
$gb2='A.docDate,owhs.whsCode,I.itemName,BC.barCode,I.invPrice,grs1.itemSize,IAC.accSell,IAC.accCost,IAC.accIvt';
//grTypeId=1 contables
$otb='ivt_ocat';
$tb1='ivt_cat1';
$q=a_sql::query('SELECT '.$gb.', SUM(B.quantity) quantity 
FROM '.$otb.' A
JOIN '.$tb1.' B ON (B.docEntry=A.docEntry)  
LEFT JOIN itm_owhs owhs ON (owhs.whsId=A.whsId) 
LEFT JOIN itm_oitm I ON (I.itemId=B.itemId) 
LEFT JOIN itm_grs1 grs1 ON (grs1.itemSzId=B.itemSzId) 
LEFT JOIN itm_oiac IAC ON (IAC.accGrId=I.accGrId) 
LEFT JOIN itm_bar1 BC ON (grTypeId=\''.$grTypeId.'\' && BC.itemId=B.itemId AND BC.itemSzId=B.itemSzId AND BC.barCode!=\'\') 
WHERE B.docEntry=\''.$___D['docEntry'].'\' GROUP BY '.$gb2.' ',array(1=>'Error obteniendo información del documento: ',2=>'No se encontró el documento solicitado '.$___D['docEntry'].'.'));
$total=0; $lastWh=''; $nl=1;
$totalDeb=0;
if(a_sql::$err){ die(a_sql::$errNoText); }
else while($L=$q->fetch_assoc()){
	$Tc=Siigo::barcodeSep($L['barCode']);
	Siigo::$Base['lineNum']=$n;
	$Mx['L'][$n]=Siigo::$Base;
	$L['invPrice']=round($L['invPrice'],2);
	$costLine=$L['quantity']*$L['invPrice'];
	$ventaLine=$L['lineTotal'];
	$Mx['L'][$n]['docYear']=substr($L['docDate'],0,4);
	$Mx['L'][$n]['docMonth']=substr($L['docDate'],5,2);
	$Mx['L'][$n]['docDay']=substr($L['docDate'],8,2);
	$Mx['L'][$n]['whsCode']=$L['whsCode'];
	$Mx['L'][$n]['lineText']=$L['itemName'].' # '.$L['itemSize'];
	$Mx['L'][$n]['quantity']=$L['quantity'];
	if($Tc['l']){ $Mx['L'][$n]['itemLine']=$Tc['l']; }
	if($Tc['g']){ $Mx['L'][$n]['itemGr']=$Tc['g']; }
	if($Tc['code']){ $Mx['L'][$n]['itemId']=$Tc['code']; }
	$lastWh = $Mx['L'][$n]['whsCode'];
	/* 4175 - Venta */ $n1=$n;
	$Mx['L'][$n]=Siigo::acc2Itm($Mx['L'][$n1],
	array('accSell'=>'Y','debCred'=>'D','valorSec'=>$ventaLine,'secGravada'=>'N','lineNum'=>$nl),$L);
	/* 14 - inventario */ $n1=$n; $n++; $nl++;
	$Mx['L'][$n]=Siigo::acc2Itm($Mx['L'][$n1],
	array('accIvt'=>'Y','debCred'=>'D','valorSec'=>$costLine,'secGravada'=>'N','lineNum'=>$nl),$L);
	/* 61 - Costo */ $n1=$n; $n++; $nl++;
	$Mx['L'][$n]=Siigo::acc2Itm($Mx['L'][$n1],
	array('accCost'=>'Y','debCred'=>'C','valorSec'=>$costLine,'secGravada'=>'N','lineNum'=>$nl),$L);
	$nl++; $n++;
}
echo _js::enc2($Mx);
?>