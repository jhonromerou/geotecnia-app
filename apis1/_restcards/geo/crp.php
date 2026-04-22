<?php
require('geo.php');
function crpInvIds($M=array()){
	$M['L']=array();
	$gb='B.id,B.itemId,B.ensType,I.itemCode,I.udm,I.itemName,B.lineDate,B.lineStatus,B.price,I.vatId,IV.rate ivaRate,I.rteId,IV2.rate rteRate,E.lineNum ensNum';
	$ql=a_sql::query('SELECT '.$gb.',B.quantity,B.priceLine
	FROM xdp_rit1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)
	LEFT JOIN gfi_otax IV ON (IV.vatId=I.vatId)
	LEFT JOIN gfi_otax IV2 ON (IV2.vatId=I.rteId)
	LEFT JOIN xdp_oens E ON (B.ensId>0 AND E.id=B.ensId)
	WHERE B.id IN ('.$M['ids'].') ',array(1=>'Error obteniendo lineas items de documento',2=>'El documento no tiene registros pendientes por facturar.'));
	if(a_sql::$err){ $M['L']=json_decode(a_sql::$errNoText,1); }
	else if(a_sql::$errNo==-1){
		$Gb=array(); $n=0;
		while($L=$ql->fetch_assoc()){
			$k=$L['itemId'].$L['price'];
			if(!array_key_exists($k,$Gb)){
				$Gb[$k]=$n;
				$M['L'][$n]=$L; $n++;
				
			}
			else{ 
				$kn=$Gb[$k];
				$M['L'][$kn]['quantity']+=$L['quantity'];
				$M['L'][$kn]['priceLine']+=($L['priceLine']);
				if($L['ensNum']>0){ $M['L'][$kn]['ensNum'] .=','.$L['ensNum']; }
				
			}
		}
	}
	return $M;
}

unset($_J['serieId'],$_J['slpId']);
if(_0s::$router=='GET crp'){ //a_ses::hashKey('geo.remi.read');
	_ADMS::_lb('sql/filter');
	$___D['fromA']='A.docEntry,A.dateC,A.docStatus,A.canceled,A.userId,A.docDate,R.proyect,R.cardName,A.remiId,A.invId,I.docTotal
	FROM xdp_ocrp A
	LEFT JOIN xdp_orit R ON (R.docEntry=A.remiId)
	LEFT JOIN gvt_oinv I ON (I.docEntry=A.invId) ';
 echo Doc::get($___D);
}
else if(_0s::$router=='GET crp/view'){ //a_ses::hashKey('geo.remi.read');
 $M=a_sql::fetch('SELECT A1.docEntry,A1.docDate,A1.docStatus,A1.canceled,A1.remiId,A1.invId,A1.dateC, A.cardName,A.proyect,A1.ids
		FROM xdp_ocrp A1 
		LEFT JOIN xdp_orit A ON(A.docEntry=A1.remiId)
		LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE A1.docEntry=\''.$_GET['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de documento',2=>'El documento no existe.'));
	if(a_sql::$err){ $js=(a_sql::$errNoText); }
	else{ $js=_js::enc2(crpInvIds($M)); }
	echo $js;
}
else if(_0s::$router=='GET crp/form'){ //a_ses::hashKey('geo.remi.read');
	if($js=_js::ise($_GET['docEntry'],'Se debe definir id de la remisión.','numeric>0')){}
	else if($js=_js::ise($_GET['lineDate'],'Se debe definir fecha de corte.')){}
	else{
		$M=a_sql::fetch('SELECT A.docEntry,A.cardId,A.cardName,A.proyect,A.dateC,C.licTradNum,C.fdpId,C.countyCode,C.cityCode,C.address,C.phone1,C.pymId,C.rteIva,C.rteIca
		FROM xdp_orit A 
		LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE A.docEntry=\''.$_GET['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de documento',2=>'El documento no existe.'));
		if(a_sql::$err){ die(a_sql::$errNoText); }
		$M['L']=array();
		$M['ids']='';
		$gb='B.id,B.itemId,B.ensType,I.itemCode,I.udm,I.itemName,B.lineDate,B.lineStatus,B.price,I.vatId,IV.rate ivaRate,I.rteId,IV2.rate rteRate';
		$ql=a_sql::query('SELECT '.$gb.',B.quantity,B.priceLine
		FROM xdp_rit1 B 
		LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)
		LEFT JOIN gfi_otax IV ON (IV.vatId=I.vatId)
		LEFT JOIN gfi_otax IV2 ON (IV2.vatId=I.rteId)
		WHERE docEntry=\''.$_GET['docEntry'].'\' AND B.lineStatus=\'O\' AND B.lineDate<=\''.$_GET['lineDate'].'\' ',array(1=>'Error obteniendo lineas items de documento',2=>'El documento no tiene registros pendientes por facturar.'));
		if(a_sql::$err){ $M['L']=json_decode(a_sql::$errNoText,1); }
		else if(a_sql::$errNo==-1){
			$Gb=array(); $n=0;
			while($L=$ql->fetch_assoc()){
				$k=$L['itemId'].$L['price'];
				$M['ids'] .= '\''.$L['id'].'\',';
				if(!array_key_exists($k,$Gb)){
					$Gb[$k]=$n;
					$M['L'][$n]=$L; $n++;
				}
				else{ 
					$kn=$Gb[$k];
					$M['L'][$kn]['quantity']+=$L['quantity'];
					$M['L'][$kn]['priceLine']+=$L['priceLine'];
				}
			}
			$M['ids']=substr($M['ids'],0,-1);
		}
		$js= _js::enc2($M);
	}
	echo $js;
}

else if(_0s::$router=='POST crp'){
	if($js=_js::ise($_J['remiId'],'Se debe definir el Id de la remisión','numeric>0')){}
	else if($js=_js::ise($_J['docDate'],'Se debe definir fecha de corte')){}
	else if($js=_js::ise($_J['ids'],'Ninguna id de remisión recibida.')){}
	else{
		a_sql::transaction(); $cmt=false;
		$ins=a_sql::insert($_J,array('table'=>'xdp_ocrp','kui'=>'ud','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(3,'Error generando documento cierre: '.$ins['text']); }
		else{
			$u=a_sql::query('UPDATE xdp_rit1 SET lineStatus=\'C\' WHERE id IN ('.$_J['ids'].') ',array(1=>'Error actualizando ids de remision a facturados.'));
			if(a_sql::$err){ $js=a_sql::$errNoText; }
			else if(a_sql::$aff_rows==0){ $js=_js::e(3,'Las ids de la remisión ya fueron cerradas.'); }
			else{ $js=_js::r('Documento de cierre generado correctamente.','"docEntry":"'.$ins['insertId'].'"'); $cmt=true; }
		}
			a_sql::transaction($cmt); 
	}
	echo $js;
}
else if(_0s::$router=='PUT crp'){
	if($js=_js::ise($_J['docEntry'],'Se debe definir el número de documento cierre.','numeric>0')){}
	if($js=_js::ise($_J['invId'],'Se debe definir el número de la factura generado','numeric>0')){}
	else{
		$u=a_sql::query('UPDATE xdp_ocrp SET docStatus=\'C\',invId=\''.$_J['invId'].'\' WHERE docEntry ='.$_J['docEntry'].' LIMIT 1',array(1=>'Error actualizando documento cierre.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::r('Ids de remision actualizados a facturados.'); }
	}
	echo $js;
}

else if(_0s::$router=='GET crp/inv'){ //a_ses::hashKey('geo.remi.read');
	if($js=_js::ise($_GET['docEntry'],'Se debe definir id de documento de cierre.','numeric>0')){}
	else{
		$M=a_sql::fetch('SELECT A1.canceled,A1.invId, A.docEntry,A.cardId,A.cardName,A.proyect,A.dateC,C.licTradNum,C.fdpId,C.countyCode,C.cityCode,C.address,C.phone1,C.email,C.pymId,C.rteIva,C.rteIca,
		A1.ids
		FROM xdp_ocrp A1 
		LEFT JOIN xdp_orit A ON(A.docEntry=A1.remiId)
		LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE A1.docEntry=\''.$_GET['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de documento',2=>'El documento no existe.'));
		if(a_sql::$err){ $js=(a_sql::$errNoText); }
		else if($M['canceled']=='Y'){ $js=(_js::e(3,'El documento está anulado y no se puede realizar la acción.')); }
		else if($M['invId']>0){ $js=(_js::e(3,'El documento ya tiene registrada una factura. '.$M['invId'].'.')); }
		else{ $js=_js::enc2(crpInvIds($M)); }
	}
	echo $js;
}
else if(_0s::$router=='PUT crp/statusCancel'){
	if($js=_js::ise($___D['docEntry'],'Se debe definir el número de documento cierre.','numeric>0')){}
	else{
		a_sql::transaction(); $cmt=false;
		$u=a_sql::query('UPDATE xdp_ocrp SET docStatus=\'N\',canceled=\'Y\' WHERE docEntry ='.$___D['docEntry'].' LIMIT 1',array(1=>'Error anulando documento cierre.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else if(a_sql::$aff_rows==0){ $js=_js::e(3,'El documento ya fue anulado'); }
		else{
			$qD=a_sql::fetch('SELECT ids FROM xdp_ocrp WHERE docEntry ='.$___D['docEntry'].' LIMIT 1',array(1=>'Error revisando documento de cierre: ',2=>'El documento de cierre no existe.'));
			if(a_sql::$err){ $js=a_sql::$errNoText; }
			else{
				a_sql::query('UPDATE xdp_rit1 SET lineStatus=\'O\' WHERE id IN ('.$qD['ids'].') ',array(1=>'Error actualizando ids de remision a abiertos.'));
				if(a_sql::$err){ $js=a_sql::$errNoText; }
				else{ $js=_js::r('Documento de cierre anulado correctamente'); $cmt=true; }
			}
		}
		a_sql::transaction($cmt); 
	}
	echo $js;
}

?>