<?php
$D=$___D;
$wh ='';
function whDocsODate($D=[]){
  $wh='';
  if($D['docNums']!=''){
    $sep1=explode(',',$D['docNums']);
    $docs=[];
    foreach($sep1 as $dn){
      $sep2=explode('-',$dn);
      if($sep2[1]){
        for($i=$sep2[0]; $i<=$sep2[1]; $i++){ $docs[]=$i;}
      }
      else{ foreach($sep2 as $dnum){ $docs[]=$dnum; } }
    }
    $wh .=' AND A.docEntry IN ('.implode(',',$docs).') ';
  }
  else{
    $diff=strtotime($D['date2'])-strtotime($D['date1']);
    if($diff<0){ _err::err('El rango de fechas generar inconsistencias.',3); }
    else if($diff>(86400*5)){ _err::err('El rango no puede ser mayor a 5 dias.',3); }
    $wh .=' AND A.dateC BETWEEN \''.$D['date1'].'\' AND \''.$D['date2'].'\' ';
  }
  return $wh;
}
if(_js::ise($D['origin'],'Se debe definir origen')){}
else if(_js::iseErr($D['codiC'],'Se debe definir el codigo del comprobante')){}
else if(_js::iseErr($D['docSiigo'],'Se debe definir el consecutivo siguiente de siigo','numeric>0')){}
else if($D['origin']=='pdp'){
  if(_js::iseErr($D['docNum'],'Se debe definir el número del documento de planificación','numeric>0')){}
  else if(_js::iseErr($D['whsMP'],'Se debe definir el almacen de los insumos')){}
  else if(_js::iseErr($D['whsPT'],'Se debe definir el almacen Producto Terminado')){}
  else{
    $whsMP=a_sql::fetch('SELECT whsCode FROM ivt_owhs WHERE whsId=\''.$D['whsMP'].'\' LIMIT 1',[1=>'Error verificando almacen MP',2=>'Almacen MP no existe']);
    if(a_sql::$err){ die(a_sql::$errNoText); }
    $whsPT=a_sql::fetch('SELECT whsCode FROM ivt_owhs WHERE whsId=\''.$D['whsPT'].'\' LIMIT 1',[1=>'Error verificando almacen PT',2=>'Almacen PT no existe']);
    if(a_sql::$err){ die(a_sql::$errNoText); }
  }
}
else{ //ddp,gvtSdn
 $wh=whDocsODate($D); 
}
_err::errDie();
/* variables de sociedad */
_ADMS::lib('sql/filter');
require('siigo/lb.php');
require('siigo/temp.fields.php');
_ADMS::lib('sql/filter');
_ADMS::libC('wma','mrp');
$Th=Siigo::getHead($THs,[
'def'=>[ 'slpCode'=>1,'cityCode'=>380,'ccosto'=>1,'nit'=>'800168320',
'codiC'=>$D['codiC'], //20 madera, 21 moldura, 22=pt
]
]);
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
$XL=[]; 
$nextNum=$D['docSiigo'];
$TDA=[]; $nl=1;
//desde notas de produccion
if($D['origin']=='ddp'){
  $gb='A.docDate,A.docEntry,A.quantity,B.itemId,B.itemSzId,I.itemCode,I.itemName,I.itemType,B.price,B.priceLine,WHB.whsCode';
	$fie =$gb.',SUM(B.quantity) reqQty';
  $fie ='C1.accCode accIvt,A.itemId pitemId,WHA.whsCode whsCodeA,'.$fie;
  $gb ='C1.accCode,A.itemId,WHA.whsCode,'.$gb;
	//$wh .=a_sql_filter($D);
	$q=a_sql::query('SELECT '.$fie.'
	FROM wma_oddp A
	JOIN wma_ddp1 B ON (B.docEntry=A.docEntry)
	JOIN itm_oitm I ON (I.itemId=B.itemId)
  JOIN itm_oiac GC ON GC.accGrId=I.accGrId
  LEFT JOIN gfi_opdc C1 ON C1.accId=GC.accIvt
  LEFT JOIN ivt_owhs WHA ON WHA.whsId=A.whsId
  LEFT JOIN ivt_owhs WHB ON WHB.whsId=B.whsId
	WHERE A.canceled=\'N\' '.$wh.'  
	GROUP BY '.$gb.' ORDER BY A.docDate,A.docEntry',array(1=>'Error obteniendo requerimiento materiales (opdp): ',2=>'No se encontraron resultados requerimiento materiales (opdp)'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
  else{
    $lastDoc=0; $lastChild=$q->num_rows; $nx=1; $lastItem=0; $nl=1;
    while($L=$q->fetch_assoc()){
      $solos=($L['itemType']=='MP' || $L['itemType']=='SE');
      if($lastDoc==0){ $totalCre=0; }
      //Siigo::$Base['nit']=$L['licTradNum'];
      Siigo::$Base['tipoC']='O';
      Siigo::$Base['noC']=$nextNum;
      Siigo::$Base['year']=substr($L['docDate'],0,4);
      Siigo::$Base['month']=substr($L['docDate'],5,2);
      Siigo::$Base['day']=substr($L['docDate'],8,2);
      $Lx=Siigo::$Base;
      //if(!$solos || $L['price']<=0){ }
      if($L['price']<=0){ }
      else{
        $nDeb=$n; $n++;
        $deb=round($L['reqQty']*$L['price'],2);
        $totalCre +=$deb;
        $Lx['lineNum']=$nl;
        $Lx['priceLine']=$deb;
        $sep=explode('-',$L['whsCode']);
        $Lx['whsCode']=$sep[0];
        if($sep[1]){ $Lx['codeUbi']=$sep[1]; }
        $Lx['accCode']=$L['accIvt'];
        $Lx['debCre']='C';
        $L['itemCode']=preg_replace('/([a-z]|[A-Z])+/i','',$L['itemCode']);
        $Lx['itemLine']=substr($L['itemCode'],0,3);
        $Lx['itemGr']=substr($L['itemCode'],3,4);
        $Lx['itemId']=substr($L['itemCode'],7,6);
        $Lx['quantity']=round($L['reqQty']*1,5);
        $Lx['lineText']=$L['itemName'];
        $Mx['L'][$n]=$Lx;
        $nl++; $n++;
      }
      if($lastDoc!=0 && ($lastDoc!=$L['docEntry'] || $lastChild==$nx)){
        $qI=a_sql::fetch('SELECT I.itemCode,I.itemName,PU.accCode accIvt
        FROM itm_oitm I
        LEFT JOIN itm_oiac IA ON (IA.accGrId=I.accGrId)
        LEFT JOIN gfi_opdc PU ON (PU.accId=IA.accIVt)
        WHERE I.itemId=\''.$lastItem['pitemId'].'\' LIMIT 1');
        $Lx=Siigo::$Base;
        $Lx['lineNum']=$nl;
        //entrada a proceso
        $Lx['priceLine']=round($totalCre,2);
        $sep=explode('-',$lastItem['whsCodeA']);
        $Lx['whsCode']=$sep[0];
        if($sep[1]){ $Lx['codeUbi']=$sep[1]; }
        $Lx['accCode']=$qI['accIvt'];
        $Lx['debCre']='D';
        $qI['itemCode']=preg_replace('/([a-z]|[A-Z])+/i','',$qI['itemCode']);
        $Lx['itemLine']=substr($qI['itemCode'],0,3);
        $Lx['itemGr']=substr($qI['itemCode'],3,4);
        $Lx['itemId']=substr($qI['itemCode'],7,6);
        $Lx['quantity']=round($lastItem['quantity']*1,5);
        $Lx['lineText']=$qI['itemName'];
        $Mx['L'][]=$Lx;
        $nl++;
        $totalCre=0;
      }
      $nx++;
      $lastItem=$L;
      $lastDoc=$L['docEntry'];
    }
  }
}
//desde plan de produccion
else if($D['origin']=='pdp'){
  $gb='A.docDate,B.itemId,B.itemSzId,I.itemCode,I.itemName,I.itemType';
	$fie =$gb.',SUM(B.quantity) reqQty';
  $fie ='C1.accCode accIvt,'.$fie;
  $gb ='C1.accCode,'.$gb;
	//$wh .=a_sql_filter($D);
	$q=a_sql::query('SELECT '.$fie.'
	FROM wma3_opdp A
	JOIN wma3_pdp1 B ON (B.docEntry=A.docEntry)
	JOIN itm_oitm I ON (I.itemId=B.itemId)
  JOIN itm_oiac GC ON GC.accGrId=I.accGrId
  LEFT JOIN gfi_opdc C1 ON C1.accId=GC.accIvt
	WHERE A.canceled=\'N\' AND A.docEntry='.$D['docNum'].' '.$wh.'  
	GROUP BY '.$gb.' ',array(1=>'Error obteniendo requerimiento materiales (opdp): ',2=>'No se encontraron resultados requerimiento materiales (opdp)'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
  else{
    $nl=1;
    while($L=$q->fetch_assoc()){
      wmaMrp::$MR=[]; // $nl=1; //$nextNum++;
      //cada articulo 1 doc
      wmaMrp::get($L,array('wh'=>$whI,'seView'=>$seView,
      'join'=>'LEFT JOIN itm_oiac IA ON IA.accGrId=I.accGrId
      LEFT JOIN gfi_opdc PU ON (PU.accId=IA.accIVt)',
      'joinf'=>'PU.accCode accIvt',
      'joing'=>'PU.accCode',
     ));
      if(_err::$err){ return _err::$errText; }
      $totalCre=0;
      //Siigo::$Base['nit']=$L['licTradNum'];
      Siigo::$Base['tipoC']='O';
      Siigo::$Base['noC']=$nextNum;
      Siigo::$Base['year']=substr($L['docDate'],0,4);
      Siigo::$Base['month']=substr($L['docDate'],5,2);
      Siigo::$Base['day']=substr($L['docDate'],8,2);
      $Lx=Siigo::$Base;
      $nDeb=$n; $n++; //asi pongo antes de creditos
      foreach(wmaMrp::$MR as $i2 =>$L2){
        $deb=round($L2['reqQty']*$L2['price'],2);
        $si1=($L['lineType']=='MA' || $L['lineType']=='MO' | $L['lineType']=='CIF');
        $solos=($L2['lineType']=='MP' || $L2['lineType']=='SE');
        //if(!$solos){ continue; }
        if($L2['price']<=0){ continue; }
        $totalCre +=$deb;
        $Lx['lineNum']=$nl;
        $Lx['priceLine']=$deb;
        $sep=explode('-',$whsMP['whsCode']);
        $Lx['whsCode']=$sep[0];
        if($sep[1]){ $Lx['codeUbi']=$sep[1]; }
        $Lx['accCode']=$L2['accIvt'];
        $Lx['debCre']='C';
        $L2['itemCode']=preg_replace('/([a-z]|[A-Z])+/i','',$L2['itemCode']);
        $Lx['itemLine']=substr($L2['itemCode'],0,3);
        $Lx['itemGr']=substr($L2['itemCode'],3,4);
        $Lx['itemId']=substr($L2['itemCode'],7,6);
        $Lx['lineText']=$L2['itemName'];
        $Lx['quantity']=round($L2['reqQty']*1,5);
        $Mx['L'][$n]=$Lx;
        $nl++; $n++;
      }
      $Lx=Siigo::$Base;
      $Lx['lineNum']=$nl;
      //entrada a proceso
      $Lx['priceLine']=round($totalCre,2);
      $sep=explode('-',$whsPT['whsCode']);
      $Lx['whsCode']=$sep[0];
      if($sep[1]){ $Lx['codeUbi']=$sep[1]; }
      $Lx['accCode']=$L['accIvt'];
      $Lx['debCre']='D';
      $L['itemCode']=preg_replace('/([a-z]|[A-Z])+/i','',$L['itemCode']);
      $Lx['itemLine']=substr($L['itemCode'],0,3);
      $Lx['itemGr']=substr($L['itemCode'],3,4);
      $Lx['itemId']=substr($L['itemCode'],7,6);

      $Lx['lineText']=$L['itemName'];
      $Lx['quantity']=round($L['reqQty']*1,5);
      $Mx['L'][]=$Lx;
      $nl++;
    }
  }
}
//desde gvtSdn entrega de venta C-14,D-61
//solo insumos
else if($D['origin']=='gvtSdn'){
  $gb='A.docDate,B.itemId,B.itemSzId,I.itemCode,I.itemName,I.itemType,WHA.whsCode';
	$fie =$gb.',B.quantity reqQty,IC.cost priceLine,C1.accCode accIvt,C2.accCode accCost';
	//$wh .=a_sql_filter($D);
	$q=a_sql::query('SELECT '.$fie.'
	FROM gvt_osdn A
	JOIN gvt_sdn1 B ON (B.docEntry=A.docEntry)
  LEFT JOIN ivt_owhs WHA ON WHA.whsId=A.whsId
  LEFT JOIN itm_oipc IC ON (IC.isModel=\'Y\' AND IC.itemId=B.itemId AND IC.itemSzId=B.itemSzId)
	JOIN itm_oitm I ON (I.itemId=B.itemId)
  JOIN itm_oiac GC ON GC.accGrId=I.accGrId
  LEFT JOIN gfi_opdc C1 ON C1.accId=GC.accIvt
  LEFT JOIN gfi_opdc C2 ON C2.accId=GC.accCost
	WHERE A.canceled=\'N\' '.$wh.'  
	 ',array(1=>'Error obteniendo requerimiento materiales (opdp): ',2=>'No se encontraron resultados requerimiento materiales (opdp)'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
  else{
    $nl=1;
    while($L=$q->fetch_assoc()){
      $totalCre=0;
      //Siigo::$Base['nit']=$L['licTradNum'];
      Siigo::$Base['tipoC']='L';
      Siigo::$Base['noC']=$nextNum;
      Siigo::$Base['year']=substr($L['docDate'],0,4);
      Siigo::$Base['month']=substr($L['docDate'],5,2);
      Siigo::$Base['day']=substr($L['docDate'],8,2);
      $Lx=Siigo::$Base;
      $nDeb=$n; $n++; //asi pongo antes de creditos
      $Lx=Siigo::$Base;
      $Lx['lineNum']=$nl;
      $Lx['priceLine']=round($L['priceLine']*$L['reqQty'],2);
      $sep=explode('-',$L['whsCode']);
      $Lx['whsCode']=$sep[0];
      if($sep[1]){ $Lx['codeUbi']=$sep[1]; }
      $Lx['debCre']='C'; $Lx['accCode']=$L['accIvt'];
      $L['itemCode']=preg_replace('/([a-z]|[A-Z])+/i','',$L['itemCode']);
      $Lx['itemLine']=substr($L['itemCode'],0,3);
      $Lx['itemGr']=substr($L['itemCode'],3,4);
      $Lx['itemId']=substr($L['itemCode'],7,6);
      $Lx['lineText']=$L['itemName'];
      $Lx['quantity']=round($L['reqQty']*1,5);
      $Mx['L'][]=$Lx;
      $nl++;
      //deb 61
      $Lx['lineNum']=$nl;
      $Lx['debCre']='D'; $Lx['accCode']=$L['accCost'];
      $Mx['L'][]=$Lx;
      $nl++;
    }
  }
}
  echo _js::enc2($Mx);
?>