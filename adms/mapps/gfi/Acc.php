<?php
require_once('Dac.php');


class gfiAcc{
static public function dwAC($L=array()){
	if(!$L['debBal']){ $L['debBal']=0; }
	if(!$L['creBal']){ $L['creBal']=0; }
	return array('accCode'=>$L['accCode'],'accName'=>$L['accName'],'debBal'=>$L['debBal'],'creBal'=>$L['creBal']);
}

static public function gvtSdn($D=array(),$P=array()){
	$ori =' on[gfiAcc::gvtSdn()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	$Mx=array();
	//1305 - cuenta pago, 
	$qd=a_sql::fetch('SELECT A.cardId,A.cdcId,A.docDate
	FROM gvt_osdn A 
	wHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información base de entrada de compra: '.$ori,2=>'Numero de entrega de mercancia no encontrado'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
	$nDac=new gfiDac(array('tt'=>'gvtSdn','tr'=>$D['docEntry']),$qd);
	$nDac->setItm(); if(_err::$err){ return _err::$errText; }
	$nDac->post(); if(_err::$err){ return _err::$errText; }
	return $Mx;
}
static public function gvtInv($D=array()){
	$ori =' on[gfiAcc::sellInv()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	$Mx=array();
	//1305 - cuenta pago, 
	$qd=a_sql::fetch('SELECT A.fromDlv,
	A.fdpId,A.cdcId,A.cardId,A.docTotal,A.docDate,A.dueDate,
	AC.accId,AC.accCode,AC.accName 
	FROM gvt_oinv A 
	LEFT JOIN gfi_ofdp FP ON (FP.fpId=A.fdpId)
	LEFT JOIN gfi_opdc AC ON (AC.accId=FP.accId)
	wHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información base de factura: '.$ori,2=>'Numero de factura no encontrado'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
	else if($qd['fdpId']=='null'){ _err::err('Forma de pago no definida en factura'.$ori,3); return $Mx; }
	else if($qd['accId']=='null'){ _err::err('Cuenta de forma de pago no definida.'.$ori,3); return $Mx; }
		$nDac=new gfiDac(array('tt'=>'gvtInv','tr'=>$D['docEntry']),$qd);
	$nDac->setLine([array('lineType'=>'FV','dueDate'=>$qd['dueDate'],'cardId'=>$qd['cardId'],'accId'=>$qd['accId'],'accCode'=>$qd['accCode'],'accName'=>$qd['accName'],'debBal'=>$qd['docTotal'],'debBalDue'=>$qd['docTotal'])]);
	$nDac->setTax(); if(_err::$err){ return _err::$errText; }
	$nDac->setItm(); if(_err::$err){ return _err::$errText; }
	$nDac->post(); if(_err::$err){ return _err::$errText; }
	return $Mx;
}

static public function gvtPdn($D=array(),$P=array()){
	$ori =' on[gfiAcc::gvtPdn()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	$Mx=array();
	//1305 - cuenta pago, 
	$qd=a_sql::fetch('SELECT A.cardId,A.cdcId,A.docDate
	FROM gvt_opdn A 
	wHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información base de entrada de compra: '.$ori,2=>'Numero de entrada mercancia no encontrado'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
	$nDac=new gfiDac(array('tt'=>'gvtPdn','tr'=>$D['docEntry']),$qd);
	$nDac->setItm(); if(_err::$err){ return _err::$errText; }
	$nDac->post(); if(_err::$err){ return _err::$errText; }
	return $Mx;
}
static public function gvtPin($D=array()){
	$ori =' on[gfiAcc::gvtPin()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	//1305 - cuenta pago, 
	$qd=a_sql::fetch('SELECT A.fromDlv,
	A.fdpId,A.cardId,A.docTotal,A.docDate,A.dueDate,
	AC.accId,AC.accCode,AC.accName 
	FROM gvt_opin A 
	LEFT JOIN gfi_ofdp FP ON (FP.fpId=A.fdpId)
	LEFT JOIN gfi_opdc AC ON (AC.accId=FP.accId)
	wHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información base de factura: '.$ori,2=>'Numero de factura no encontrado'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
	else if($qd['fdpId']=='null'){ _err::err('Forma de pago no definida en factura'.$ori,3); return $Mx; }
	else if($qd['accId']=='null'){ _err::err('Cuenta de forma de pago no definida.'.$ori,3); return $Mx; }
	$nDac=new gfiDac(array('tt'=>'gvtPin','tr'=>$D['docEntry']),$qd);
	$nDac->setLine([array('lineType'=>'FC','dueDate'=>$qd['dueDate'],'cardId'=>$qd['cardId'],'accId'=>$qd['accId'],'accCode'=>$qd['accCode'],'accName'=>$qd['accName'],'creBal'=>$qd['docTotal'],'creBalDue'=>$qd['docTotal'])]);
	$nDac->setTax(); if(_err::$err){ return _err::$errText; }
	$nDac->setItm(); if(_err::$err){ return _err::$errText; }
	$nDac->post(); if(_err::$err){ return _err::$errText; }
}
static public function gvtPnc($D=array(),$P=array()){/*nota credito compra */
	$ori =' on[gfiAcc::gvtPnc()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	$Mx=array();
	//1305 - cuenta pago, 
	$qd=a_sql::fetch('SELECT A.fromDlv,
	A.fdpId,A.cardId,A.docTotal,A.docDate,A.dueDate,
	AC.accId,AC.accCode,AC.accName 
	FROM gvt_opnc A 
	LEFT JOIN gfi_ofdp FP ON (FP.fpId=A.fdpId)
	LEFT JOIN gfi_opdc AC ON (AC.accId=FP.accId)
	wHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información base de entrada de compra: '.$ori,2=>'Numero de entrada mercancia no encontrado'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
	$nDac=new gfiDac(array('tt'=>'gvtPnc','tr'=>$D['docEntry']),$qd);
	$nDac->setLine([array('lineType'=>'NCC','dueDate'=>$qd['dueDate'],'cardId'=>$qd['cardId'],'accId'=>$qd['accId'],'accCode'=>$qd['accCode'],'accName'=>$qd['accName'],'debBal'=>$qd['docTotal'],'debBalDue'=>$qd['docTotal'])]);
	$nDac->setTax(); if(_err::$err){ return _err::$errText; }
	$nDac->setItm(); if(_err::$err){ return _err::$errText; }
	$nDac->post(); if(_err::$err){ return _err::$errText; }
	return $Mx;
}
static public function gvtPnd($D=array(),$P=array()){/*nota debito compra */
	$ori =' on[gfiAcc::gvtPnd()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	$Mx=array();
	//1305 - cuenta pago, 
	$qd=a_sql::fetch('SELECT A.fromDlv,
	A.fdpId,A.cardId,A.docTotal,A.docDate,A.dueDate,
	AC.accId,AC.accCode,AC.accName 
	FROM gvt_opnd A 
	LEFT JOIN gfi_ofdp FP ON (FP.fpId=A.fdpId)
	LEFT JOIN gfi_opdc AC ON (AC.accId=FP.accId)
	wHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información base de entrada de compra: '.$ori,2=>'Numero de entrada mercancia no encontrado'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
	$nDac=new gfiDac(array('tt'=>'gvtPnd','tr'=>$D['docEntry']),$qd);
	$nDac->setLine([array('lineType'=>'NDC','dueDate'=>$qd['dueDate'],'cardId'=>$qd['cardId'],'accId'=>$qd['accId'],'accCode'=>$qd['accCode'],'accName'=>$qd['accName'],'creBal'=>$qd['docTotal'],'creBalDue'=>$qd['docTotal'])]);
	$nDac->setTax(); if(_err::$err){ return _err::$errText; }
	$nDac->setItm(); if(_err::$err){ return _err::$errText; }
	$nDac->post(); if(_err::$err){ return _err::$errText; }
	return $Mx;
}


static public function dac_post($D=array(),$P=array()){
	$ori= ' on [gfiAcc::dac_post()]'; $errs=0; 
	if($js=_js::ise($D['tt'],'Se debe definir tt para asiento.'.$ori)){ return _err::err($js); }
	else if($js=_js::ise($D['tr'],'Se debe definir tr para asiento.'.$ori,'numeric>0')){ return _err::err($js); }
	else if($js=_js::ise($D['docDate'],'Se debe definir fecha para asiento.'.$ori)){ return _err::err($js); }
	$debCre=0; $qI=array();
	if(!is_array($D['L']) || count($D['L'])==0){
		_err::err('No se enviaron lineas para asiento.',3); $errs++;
	}
	else foreach($D['L'] as $x=>$L){
		$L['tt']=$D['tt']; $L['tr']=$D['tr'];
		$L['docDate']=$D['docDate'];
		$debCre+=$L['debBal']-$L['creBal'];
		$L[0]='i'; $L[1]='gfi_dac1';
		unset($L['accCode'],$L['accName']);
		$qI[]=$L;
	}
	if($debCre!=0){ _err::err('Los debitos - créditos deben ser 0: '.$debCre.$ori,3); $errs++; }
	if($errs==0){
		a_sql::multiQuery($qI);
		if(_err::$err){ $errs++; }
		else{ return _js::r('Asiento creado correctamente.'); }
	}
}

static public function dac_cancel($D=array(),$P=array()){
	$ori=' on[gfiAcc::dac_cancel()]';
	if($js=_js::ise($D['tt'],'Se debe definir tt.'.$ori)){ _err::err($js); }
	else if($js=_js::ise($D['tr'],'Se debe definir tr.'.$ori,'numeric>0')){ _err::err($js); }
	else{
		$q=a_sql::query('UPDATE gfi_dac1 SET canceled=\'Y\',cancelDate=\''.date('Y-m-d').'\' WHERE tt=\''.$D['tt'].'\' AND tr=\''.$D['tr'].'\' ',array(1=>'Error anulando asiento contable.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	}
}
}

class gfiTax{
static public function sett($mType='',$P=array()){
	//tb2, dc=deb|cre
	$ori=' on[gfiTax::sett()]'; $errs=0;
	$leff=''; $kIva=''; $kRte=''; $tb2='';
	if($js=_js::ise($P['docEntry'],'Número de documento no definido.'.$ori,'numeric>0')){ return _err::err($js); }
	else if($js=_js::ise($P['cardId'],'Los impuestos requieren tercero.'.$ori,'numeric>0')){ return _err::err($js); }
	switch($mType){
		case 'FC' :
			$kIva='debBal'; $kRte='creBal'; $tb2='gvt_pin2';
			$leff='LEFT JOIN gfi_otax V1 ON (V1.vatId=IP.vatId)
			LEFT JOIN gfi_opdc C1 ON (C1.accId=V1.buyAcc)';
		break;
		case 'FV' :
			$kIva='creBal'; $kRte='debBal'; $tb2='gvt_inv2';
			$leff='LEFT JOIN gfi_otax V1 ON (V1.vatId=IP.vatId)
			LEFT JOIN gfi_opdc C1 ON (C1.accId=V1.sellAcc)';
		break;
		default : $errs++;
			_err::err('El tipo ['.$mType.'] no ha sido definido para calcular los impuestos.'.$ori,3); 
		break;
	}
	if($errs==0){
		$q=a_sql::query('SELECT V1.vatId,V1.taxCode,IP.lineType,C1.accId,C1.accCode,C1.accName,IP.vatBase baseAmnt,IP.vatSum
		FROM '.$tb2.' IP
		'.$leff.'
		WHERE IP.docEntry=\''.$P['docEntry'].'\' ',array(1=>'Error obteniendo impuestos y retenciones de documento:'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1) while($L=$q->fetch_assoc()){
		
			$L['cardId']=$P['cardId'];
			$ln=''.$L['taxCode'].' ['.$L['vatId'].']: ';
			if($js=_js::ise($L['accId'],$ln.'El impuesto no tiene definido cuenta contable para el movimiento. '.$mType,'numeric>0')){ _err::err($js); $errs++; break; }
			if($L['lineType']=='iva'){ $L[$kIva]=$L['vatSum']; }
			else{ $L[$kRte]=$L['vatSum']; }
			unset($L['vatId'],$L['taxCode'],$L['lineType'],$L['vatSum']);
			gfiDac::$L[]=$L; $n++;
		}
	}
}
}

?>