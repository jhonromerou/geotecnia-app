<?php
/*
1. La cuenta de costo y de inventario, requiere costo promedio,
2. La cuenta de venta el precio de linea
*/
$D=$___D;
$grTypeId=$___D['grTypeId'];
if($js=_js::ise($D['docSiigo'],'El número de documento siguiente es SIIGO debe definirse.','numeric>0')){ die($js); }
_ADMS::_app('accT');
$ivaAcc=accT::acc_getOne(array('f'=>'A.accCode','wh'=>'sysCode=\'ivaVentas\'','r'=>'D'));
if(accT::$err){ die(accT::$errText); }

require('siigo/lb.php');
$R=Siigo::iniSoc('siigo.docInfo','siigo.dlv2Inv');
$Th=Siigo::getDocHead($R['trs'],array()); unset($tr);
$whs=array(1=>'301',2=>'101');

/* reade */
$n=0;
$tds=count($Th)-1;
$Mx=array('tds'=>$tds,'fileName'=>'Plantilla Para Factura - Entrega # '.$___D['docEntry'],'L'=>array());
$Mx['L'][$n]=Siigo::$Tds;
$Mx['L'][$n]['1']=Siigo::$iSoc['cardName']; $n++;
$Mx['L'][$n]=Siigo::$Tds;
$Mx['L'][$n]['1']='MODELO PARA LA IMPORTACION DE MOVIMIENTO CONTABLE';
$n++;
$Mx['L'][$n]=Siigo::$Tds; $n++;
$Mx['L'][$n]=Siigo::$Tds; $n++;/* blank to line 5 */
$Mx['L'][$n]=$Th; $n++;
$gb='A.baseAmnt,A.fdpId,A.rteIva,A.docTotal,C.licTradNum,C.cardName,A.docDate,owhs.whsCode,I.itemName,BC.barCode,I.invPrice,grs1.itemSize,FP.fpCode,S.slpCode,A.cityCode,CP.extraDays,A.tr';
$gb1=$gb.',AC1.accCode accSell,AC2.accCode accCost,AC3.accCode accIvt,FP.accCode cardAcc';
$gb2=$gb.',AC1.accCode,AC2.accCode,AC3.accCode,FP.accCode';
//grTypeId=1 contables
$L0=array(); /* linea 0 */
$q=a_sql::query('SELECT '.$gb1.',SUM(B.quantity) quantity,SUM(B.lineTotal) lineTotal
FROM gvt_odlv A
JOIN gvt_dlv1 B ON (B.docEntry=A.docEntry) 
JOIN itm_grs1 grs1 ON (grs1.itemSzId=B.itemSzId) 
LEFT JOIN par_ocrd C ON (C.cardId=A.cardId) 
LEFT JOIN par_oslp S ON (S.slpId=A.slpId) 
LEFT JOIN gfi_ofdp FP ON (FP.fpId=A.fdpId)
LEFT JOIN gfi_opym CP ON (CP.pymId=C.pymId)
LEFT JOIN ivt_owhs owhs ON (owhs.whsId=A.whsId) 
LEFT JOIN itm_oitm I ON (I.itemId=B.itemId) 
LEFT JOIN itm_oiac IAC ON (IAC.accGrId=I.accGrId) 
LEFT JOIN gfi_opdc AC1 ON (AC1.accId=IAC.accSell) 
LEFT JOIN gfi_opdc AC2 ON (AC2.accId=IAC.accCost) 
LEFT JOIN gfi_opdc AC3 ON (AC3.accId=IAC.accIvt) 
LEFT JOIN itm_bar1 BC ON (grTypeId=\''.$grTypeId.'\' && BC.itemId=B.itemId AND BC.itemSzId=B.itemSzId AND BC.barCode!=\'\') 
WHERE B.docEntry=\''.$___D['docEntry'].'\' GROUP BY '.$gb2.' ',array(1=>'Error obteniendo información del documento: ',2=>'No se encontró el documento solicitado '.$___D['docEntry'].'.'));
$total=0; $lastWh=''; $nl=1;
if(a_sql::$err){ die(a_sql::$errNoText); }
else while($L=$q->fetch_assoc()){
	if($nl==1){$L0=$L;
		Siigo::$Base['nit']=$L0['licTradNum'];
		Siigo::$Base['slpCode']=$L0['slpCode'];
		Siigo::$Base['codeCity']=$L0['cityCode'];
	}
	$Tc=Siigo::barcodeSep($L['barCode']);
	$Mx['L'][$n]=Siigo::$Base;
	$Mx['L'][$n]['lineNum']=$nl;
	$costLine=$L['quantity']*$L['invPrice'];
	$ventaLine=$L['lineTotal'];
	$Mx['L'][$n]['year']=substr($L['docDate'],0,4);
	$Mx['L'][$n]['month']=substr($L['docDate'],5,2);
	$Mx['L'][$n]['day']=substr($L['docDate'],8,2);
	/* 4120 - venta */
	$Mx['L'][$n]['debCred']='C';
	$Mx['L'][$n]['vatPrc']=19;
	$Mx['L'][$n]['vatSum']=$ventaLine*0.19;
	$Mx['L'][$n]['secGravada']='S';
	$Mx['L'][$n]['whsCode']=$L['whsCode'];
	$Mx['L'][$n]['accCode']=$L['accSell'];
	$Mx['L'][$n]['lineText']=$L['itemName'].' T:  '.$L['itemSize'];
	$Mx['L'][$n]['quantity']=$L['quantity']*1;
	$Mx['L'][$n]['valorSec']=$ventaLine;
	$Mx['L'][$n]['_op']=$L['tr'];
	if($Tc['l']){ $Mx['L'][$n]['itemLine']=$Tc['l']; }
	if($Tc['g']){ $Mx['L'][$n]['itemGr']=$Tc['g']; }
	if($Tc['code']){ $Mx['L'][$n]['itemId']=$Tc['code']; }
	$n1=$n;
	/* 14 - inventario */ $n++; $nl++;
	$Mx['L'][$n]=$Mx['L'][$n1];
	$Mx['L'][$n]['debCred']='C';
	$Mx['L'][$n]['lineNum']=$nl;
	$Mx['L'][$n]['accCode']=$L['accIvt'];
	$Mx['L'][$n]['valorSec']=$costLine;
	$Mx['L'][$n]['secGravada']='N';
		$n1=$n;
	/* 61 - costo */ $n++; $nl++;
	$Mx['L'][$n]=$Mx['L'][$n1];
	$Mx['L'][$n]['debCred']='D';
	$Mx['L'][$n]['lineNum']=$nl;
	$Mx['L'][$n]['accCode']=$L['accCost'];
	$Mx['L'][$n]['valorSec']=$costLine;
	$Mx['L'][$n]['secGravada']='N';
	$nl++; $n++; 
}
$n1=$n-1;
_ADMS::_app('accT');
$vatSum=$L0['baseAmnt']*0.19;
$docTotalCalc=$L0['docTotal']+$vatSum;

if($L0['rteIva']>0){/* rte iva */
	$vatRte=round($L0['baseAmnt']*0.19*($L0['rteIva']/100),2);
	$docTotalCalc -=$vatRte;
	$nAcc=accT::acc_getOne(array('f'=>'A.accCode,A.accName','wh'=>'sysCode=\'rteIvaVentas\'','r'=>'D'));
	$Mx['L'][$n]=$Mx['L'][$n1];
	$Mx['L'][$n]=Siigo::fieReset('vatPrc,vatSum,itemLine,itemGr,itemId',$Mx['L'][$n]);
	$Mx['L'][$n]['lineNum']=$nl;
	$Mx['L'][$n]['debCred']='D';
	$Mx['L'][$n]['accCode']=$nAcc['accCode'];
	$Mx['L'][$n]['lineText']=$nAcc['accName']; 
	$Mx['L'][$n]['valorSec']=$vatRte;
	$n1=$n; $n++; $nl++;
}

/* 2408 - IVA */
$Mx['L'][$n]=$Mx['L'][$n1];
$Mx['L'][$n]=Siigo::fieReset('fpCode,cardAcc,cruceNum,cruceYearDue,cruceMonthDue,cruceDayDue',$Mx['L'][$n]);
$Mx['L'][$n]['lineNum']=$nl;
$Mx['L'][$n]['debCred']='C';
$Mx['L'][$n]['accCode']=$ivaAcc['accCode'];
$Mx['L'][$n]['valorSec']=$vatSum;
$Mx['L'][$n]['lineText']=$L0['cardName']; 
$n1=$n; $n++; $nl++;
/* autorenta C-2365,D-1355*/
$nAcc=accT::acc_getOne(array('f'=>'A.accCode,A.accName','wh'=>'sysCode=\'autoRenta23\'','r'=>'D'));
$Mx['L'][$n]=$Mx['L'][$n1];
$Mx['L'][$n]['lineNum']=$nl;
$Mx['L'][$n]['debCred']='C';
$Mx['L'][$n]['accCode']=$nAcc['accCode'];
$Mx['L'][$n]['valorSec']=$L0['baseAmnt']*0.004;
$Mx['L'][$n]['lineText']=$nAcc['accName'];
$Mx['L'][$n]['baseRte']=$L0['baseAmnt'];
$n1=$n; $n++; $nl++;
$nAcc=accT::acc_getOne(array('f'=>'A.accCode,A.accName','wh'=>'sysCode=\'autoRenta13\'','r'=>'D'));
$Mx['L'][$n]=$Mx['L'][$n1];
$Mx['L'][$n]['baseRte']='';
$Mx['L'][$n]['lineNum']=$nl;
$Mx['L'][$n]['debCred']='D';
$Mx['L'][$n]['accCode']=$nAcc['accCode'];
$Mx['L'][$n]['lineText']=$nAcc['accName']; 
$Mx['L'][$n]['valorSec']=$L0['baseAmnt']*0.004;
$n1=$n; $n++; $nl++;
/* 1305- cxc clientes */
$Mx['L'][$n]=$Mx['L'][$n1];
$Mx['L'][$n]=Siigo::fieReset('vatPrc,vatSum,itemLine,itemGr,itemId',$Mx['L'][$n]);
$Mx['L'][$n]['lineNum']=$nl;
$Mx['L'][$n]['debCred']='D';
$Mx['L'][$n]['fpCode']=$L0['fpCode'];
$Mx['L'][$n]['accCode']=$L0['cardAcc'];
$Mx['L'][$n]['valorSec']=$docTotalCalc;
$Mx['L'][$n]['lineText']=$L0['cardName']; 
$Mx['L'][$n]['cruceNum']=$D['docSiigo'];
$Mx['L'][$n]['cruceYearDue']=$Mx['L'][$n]['year'];
$Mx['L'][$n]['cruceMonthDue']=$Mx['L'][$n]['month'];
$Mx['L'][$n]['cruceDayDue']=$Mx['L'][$n]['day'];
$n1=$n; $n++; $nl++;
echo _js::enc2($Mx);

?>