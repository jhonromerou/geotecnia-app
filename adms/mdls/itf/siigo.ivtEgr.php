<?php
$D=$___D;
$grTypeId=$___D['grTypeId'];
$otb='ivt_oegr'; $tb1='ivt_egr1'; $docnam='Salida # '.$D['docNum']; 
/* variables de sociedad */
_ADMS::lib('sql/filter');
require('siigo/lb.php');
require('siigo/temp.ivtEgr.php');
$Th=Siigo::getDocHead(Siigo::$Temp['ivtEgr'],array('noDraw'=>'noDraw_ingProd')); unset($tr);

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
$gb2='A.docDate,owhs.whsCode,I.itemName,BC.barCode,I.invPrice,grs1.itemSize,grs1.uniqSize,AC.accCode,C.licTradNum';
$gb= 'A.docDate,owhs.whsCode,I.itemName,BC.barCode,I.invPrice,grs1.itemSize,grs1.uniqSize,AC.accCode accIvt,C.licTradNum';
//grTypeId=1 contables

$wh=a_sql_filter(['A.serieId'=>$D['serieId'],'A.docNum(E_in)'=>$D['docNum']]);
$q=a_sql::query('SELECT '.$gb.', SUM(B.quantity) quantity 
FROM '.$otb.' A
JOIN '.$tb1.' B ON (B.docEntry=A.docEntry)  
JOIN par_ocrd C ON (C.cardId=A.cardId)
JOIN ivt_owhs owhs ON (owhs.whsId=A.whsId) 
JOIN itm_oitm I ON (I.itemId=B.itemId) 
JOIN itm_grs1 grs1 ON (grs1.itemSzId=B.itemSzId) 
LEFT JOIN itm_oiac IAC ON (IAC.accGrId=I.accGrId) 
LEFT JOIN gfi_opdc AC ON (AC.accId=IAC.accIvt) 
LEFT JOIN itm_bar1 BC ON (grTypeId=\''.$grTypeId.'\' && BC.itemId=B.itemId AND BC.itemSzId=B.itemSzId AND BC.barCode!=\'\') 
WHERE 1 '.$wh.' GROUP BY '.$gb2.' ',array(1=>'Error obteniendo información del documento: ',2=>'No se encontraron resultados para: '.$D['docNum'].'.'));
$total=0; $lastWh=''; $nl=1;
$totalDeb=0;
if(a_sql::$err){ die(a_sql::$errNoText); }
else{
	while($L=$q->fetch_assoc()){
	$Tc=Siigo::barcodeSep($L['barCode']);
	Siigo::$Base['nit']=$L['licTradNum'];
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
	if($L['uniqSize']=='Y'){ $Mx['L'][$n]['itemName']=$L['itemName']; }
	else{ $Mx['L'][$n]['itemName']=$L['itemName'].' T:  '.$L['itemSize']; }
	$Mx['L'][$n]['quantity']=$L['quantity'];
	if($Tc['l']){ $Mx['L'][$n]['_itemLine']=$Tc['l']; }
	if($Tc['g']){ $Mx['L'][$n]['_itemGr']=$Tc['g']; }
	if($Tc['code']){ $Mx['L'][$n]['itemIdSiigo']=$Tc['code']; }
	$lastWh = $Mx['L'][$n]['whsCode'];
	$nl++; $n++;
}
}
echo _js::enc2($Mx);
?>