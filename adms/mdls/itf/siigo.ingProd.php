<?php
$D=$___D;
$grTypeId=$___D['grTypeId'];
$joinWhs='JOIN ivt_owhs owhs ON (owhs.whsId=A.whsId)';
if($js=_js::ise($D['docType'],'Se debe definir el tipo de documento a obtener')){ die($js); }
else if($js=_js::ise($D['docSiigo'],'El número de documento siguiente es SIIGO debe definirse.','numeric>0')){ die($js); }

if($D['docType']=='ivtCat'){ $otb='ivt_ocat'; $tb1='ivt_cat1'; $docnam='Inventario # '.$D['docEntry']; }
else if($D['docType']=='ivtIng'){ $otb='ivt_oing'; $tb1='ivt_ing1'; $docnam='Ingreso # '.	$D['docEntry'];
	$joinWhs='JOIN ivt_owhs owhs ON (owhs.whsId=B.whsId)';
}
else if($D['docType']=='ivtEgr'){ $otb='ivt_oegr'; $tb1='ivt_egr1'; $docnam='Salida # '.$D['docEntry']; }
/* variables de sociedad */
require('siigo/lb.php');
$R=Siigo::iniSoc('siigo.docInfo','siigo.ingProd');
$Th=Siigo::getDocHead($R['trs'],array('noDraw'=>'noDraw_ingProd')); unset($tr);

$n=0;
$tds=count($Th)-1;
$Mx=array('tds'=>$tds,'fileName'=>'Plantilla Documento '.$docnam,'L'=>array());
$Mx['L'][$n]=Siigo::$Tds;
$Mx['L'][$n]['1']=Siigo::$iSoc['cardName']; $n++;
$Mx['L'][$n]=Siigo::$Tds;
$Mx['L'][$n]['1']='MODELO PARA LA IMPORTACION DE MOVIMIENTO CONTABLE';
$n++;
$Mx['L'][$n]=Siigo::$Tds; $n++;
$Mx['L'][$n]=Siigo::$Tds; $n++;/* blank to line 5 */
$Mx['L'][$n]=$Th; $n++;
$gb='A.docDate,owhs.whsCode,I.itemName,BC.barCode,I.invPrice,grs1.itemSize,AC.accCode accIvt ';
$gb2='A.docDate,owhs.whsCode,I.itemName,BC.barCode,I.invPrice,grs1.itemSize,AC.accCode';
//grTypeId=1 contables

$q=a_sql::query('SELECT '.$gb.', SUM(B.quantity) quantity 
FROM '.$otb.' A
JOIN '.$tb1.' B ON (B.docEntry=A.docEntry)  
'.$joinWhs.' 
JOIN itm_oitm I ON (I.itemId=B.itemId) 
JOIN itm_grs1 grs1 ON (grs1.itemSzId=B.itemSzId) 
LEFT JOIN itm_oiac IAC ON (IAC.accGrId=I.accGrId) 
LEFT JOIN gfi_opdc AC ON (AC.accId=IAC.accIvt) 
LEFT JOIN itm_bar1 BC ON (grTypeId=\''.$grTypeId.'\' && BC.itemId=B.itemId AND BC.itemSzId=B.itemSzId AND BC.barCode!=\'\') 
WHERE B.docEntry=\''.$D['docEntry'].'\' GROUP BY '.$gb2.' ',array(1=>'Error obteniendo información del documento: ',2=>'No se encontró el documento solicitado '.$D['docEntry'].'.'));
$total=0; $lastWh=''; $nl=1;
$totalDeb=0;
if(a_sql::$err){ die(a_sql::$errNoText); }
else{
	while($L=$q->fetch_assoc()){
	$Tc=Siigo::barcodeSep($L['barCode']);
	Siigo::$Base['lineNum']=$nl;
	Siigo::$Base['noC']=$D['docSiigo'];
	$Mx['L'][$n]=Siigo::$Base;
	$L['invPrice']=round($L['invPrice'],2);
	$deb=$L['quantity']*$L['invPrice'];
	$Mx['L'][$n]['valorSec']=$deb;
	$totalDeb+=$deb;
	$total+=$Mx['L'][$n]['valorSec'];
	$Mx['L'][$n]['year']=substr($L['docDate'],0,4);
	$Mx['L'][$n]['month']=substr($L['docDate'],5,2);
	$Mx['L'][$n]['day']=substr($L['docDate'],8,2);
	$Mx['L'][$n]['whsCode']=$L['whsCode'];
	$Mx['L'][$n]['debAcc']=(Siigo::$iSoc['debAcc'])
	?Siigo::$iSoc['debAcc']
	:$L['accIvt'];
	if(Siigo::$iSoc['_lineName']=='itemName'){
		$Mx['L'][$n]['itemName']=$L['itemName'].' T:  '.$L['itemSize'];
	}
	else{ $Mx['L'][$n]['itemName']=Siigo::$iSoc['_lineName']; }
	$Mx['L'][$n]['quantity']=$L['quantity'];
	if($Tc['l']){ $Mx['L'][$n]['_itemLine']=$Tc['l']; }
	if($Tc['g']){ $Mx['L'][$n]['_itemGr']=$Tc['g']; }
	if($Tc['code']){ $Mx['L'][$n]['itemIdSiigo']=$Tc['code']; }
	$lastWh = $Mx['L'][$n]['whsCode'];
	$nl++; $n++;
}
}
$Mx['L'][$n]=$Mx['L'][$n-1];
$Mx['L'][$n]['lineNum']=$nl;
$Mx['L'][$n]['debCred']='C';
$Mx['L'][$n]['debAcc']=Siigo::$iSoc['creAcc'];// fc70 1410980000
$Mx['L'][$n]['valorSec']=$totalDeb;
$Mx['L'][$n]['itemName']=(Siigo::$iSoc['lastLineText'])?Siigo::$iSoc['lastLineText']:'PRODUCTO EN PROCESO';
$Mx['L'][$n]['quantity']=0;
$Mx['L'][$n]['whsCode']=$lastWh;
if(Siigo::$iSoc['lastLineCode']){
	$Tc=Siigo::barcodeSep(Siigo::$iSoc['lastLineCode']);
	$Mx['L'][$n]['_itemLine']=$Tc['l'];
	$Mx['L'][$n]['_itemGr']=$Tc['g'];
	$Mx['L'][$n]['itemIdSiigo']=$Tc['code'];
}
echo _js::enc2($Mx);
?>