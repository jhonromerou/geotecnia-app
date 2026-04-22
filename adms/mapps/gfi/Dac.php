<?php
class gfiDac{
public $reqCard=false;
public $L=array();
public $Ld=array();
public $Doc=array();
public $tt=''; public $tr='';
public $tbk1='';
public $L1=false; //[('accSell'=>'deb','accIvt'=>'deb','accCost'=>'cre')];
public $L_1=false; //array('accSell'=>'deb','accIvt'=>'deb','accCost'=>'cre');
public $L_tax=false; //array('sellIva'=>'deb');

function __construct($P=array(),$Doc=array()){
	$this->reqCard=($P['reqCard']!='N');
	$this->tt=$P['tt'];
	$this->tbk=$P['tbk'];
	$this->tbk1=$P['tbk1'];
	$this->tbk2=$P['tbk2'];
	$this->docEntry=$P['tr'];
	$this->tr=$P['tr'];
	$this->Doc=$Doc;
}

public function setPym(){//Datos de Documento, fdpId
	$mType=$this->tt;
	$ori=' on[gfiDac::setPym() to '.$mType.']'; $errs=0;
	if(_js::iseErr($this->tr,'Número de documento no definido.'.$ori,'numeric>0')){ return false; }
	$qd=a_sql::fetch('SELECT AC.accId
	FROM '.$this->tbk.' A 
	LEFT JOIN gfi_opym FP ON (FP.pymId=A.pymId)
	LEFT JOIN gfi_opdc AC ON (AC.accId=FP.accId)
	WHERE A.docEntry=\''.$this->tr.'\' LIMIT 1',array(1=>'Error obteniendo información de la condicion de pago: '.$ori,2=>'docEntry no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
	else if(_js::iseErr($qd['accId'],'La forma de pago del documento no tiene cuenta definida.'.$ori,'numeric>0')){ return false; }
	else{
		$this->Doc['accId']=$qd['accId'];
	}
}
public function setFdp(){//Datos de Documento, fdpId
	return self::setPym();
	//usar condicion de pago
	$mType=$this->tt;
	$ori=' on[gfiDac::setFdp() to '.$mType.']'; $errs=0;
	if(_js::iseErr($this->tr,'Número de documento no definido.'.$ori,'numeric>0')){ return false; }
	$qd=a_sql::fetch('SELECT AC.accId
	FROM '.$this->tbk.' A 
	LEFT JOIN gfi_ofdp FP ON (FP.fpId=A.fdpId)
	LEFT JOIN gfi_opdc AC ON (AC.accId=FP.accId)
	WHERE A.docEntry=\''.$this->tr.'\' LIMIT 1',array(1=>'Error obteniendo información de la forma de pago: '.$ori,2=>'docEntry no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
	else if(_js::iseErr($qd['accId'],'La forma de pago del documento no tiene cuenta definida.'.$ori,'numeric>0')){ return false; }
	else{
		$this->Doc['accId']=$qd['accId'];
	}
}

public function setLine($L=array()){
	foreach($L as $V){ $this->Ld[]=$V; }
}
public function setDocLine1($P=array()){/* Lineas articuloes */
	$ori=' on[gfiDac::setLine1()]'; $errs=0;
	if(_js::iseErr($this->tr,'Número de documento no definido.'.$ori,'numeric>0')){ return false; }
	else{
		$Ac_f='I.handInv,B.numFactor,';
		$Ac_g='I.handInv,B.numFactor,'; 
		$leff='';
		$Ac_f .='IC.accSell,IC.accIvt,IC.accCost,IC.accRdn,IC.accBuyRem';
		$Ac_g .='IC.accSell,IC.accIvt,IC.accCost,IC.accRdn,IC.accBuyRem';
		$leff .='';
		$q=a_sql::query('SELECT '.$Ac_f.',SUM(I.invPrice*B.quantity) invPrice,SUM(B.priceLine) priceLine
	FROM '.$this->tbk1.' B 
	JOIN itm_oitm I ON (I.itemId=B.itemId)
	LEFT JOIN itm_oiac IC ON (IC.accgrId=I.accgrId)
	'.$leff.'
	WHERE B.docEntry=\''.$this->tr.'\' GROUP BY '.$Ac_g.'',array(1=>'Error obteniendo lineas documento.'.$ori.': ',2=>'El documento no tiene lineas.'.$ori));
		$accS=array();
		$fromDlv=($this->Doc['fromDlv']=='Y');
		if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
		else if(a_sql::$errNo==-1){
			$invPriceIsPrice=($P['isPurc']=='Y' || $P['invPrice']=='priceLine');
			//usar precio linea como coste, compras, entradas,etc
			while($L=$q->fetch_assoc()){
				$movInv=(!$fromDlv && $L['handInv']=='Y');
				$accSell=($P['accSell'])?$P['accSell'].'Bal':false;//deb,cre
				$accIvt=($P['accIvt'])?$P['accIvt'].'Bal':false;
				$accCost=($P['accCost'])?$P['accCost'].'Bal':false;
				$accRdn=($P['accRdn'])?$P['accRdn'].'Bal':false;
				$accBuyRem=($P['accBuyRem'])?$P['accBuyRem'].'Bal':false;
				$L['invPrice']=$L['invPrice']*$L['numFactor'];/* x140dm cada mt */
				if($invPriceIsPrice){
					$L['invPrice']=$L['priceLine'];
					if($fromDlv){
						$accBuyRem=$P['accBuyRem'].'Bal';
					}
				}
				if($accSell && $js=_js::ise($L['accSell'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($movInv && $accIvt && $js=_js::ise($L['accIvt'],$ln.'El articulo no tiene definida cuenta de Inventarios'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($movInv && $accCost && $js=_js::ise($L['accCost'],$ln.'El articulo no tiene definida cuenta de costos'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($accRdn && $js=_js::ise($L['accRdn'],$ln.'El articulo no tiene definida cuenta de devolución de ventas'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($fromDlv && $accBuyRem && $js=_js::ise($L['accBuyRem'],$ln.'El articulo no tiene definida cuenta de remisión compras'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				/*+ Definir */
				if($movInv && $accIvt){  $this->Ld[]=array($accIvt=>$L['invPrice'],'accId'=>$L['accIvt'],'accCode'=>'14xx'); }
				if($movInv && $accCost){  $this->Ld[]=array($accCost=>$L['invPrice'],'accId'=>$L['accCost'],'accCode'=>'61xx'); }
				if($accRdn){  $this->Ld[]=array($accRdn=>$L['priceLine'],'accId'=>$L['accRdn'],'accCode'=>'4175xx'); }
				if($fromDlv && $accBuyRem){  $this->Ld[]=array($accBuyRem=>$L['invPrice'],'accId'=>$L['accBuyRem'],'accCode'=>'2330xx'); }
				/* De ultima para order */
				if($accSell){  $this->Ld[]=array($accSell=>$L['priceLine'],'accId'=>$L['accSell'],'accCode'=>'41xx'); }
			}
		}
	}
}
public function setDocTax($P=array()){ //tax desde tbk2
	$ori=' on[gfiDac::setDocTax()]'; $errs=0;
	$leff=''; $kIva=''; $kRte='';
	if($js=_js::ise($this->docEntry,'Número de documento no definido.'.$ori,'numeric>0')){ return _err::err($js); }
	else if($js=_js::ise($this->Doc['cardId'],'Los impuestos requieren tercero.'.$ori,'numeric>0')){ _err::err($js); return false; }
	$kIva=$kRte='_ND';
	if($P['sellIva']=='cre'){ $kIva='creBal'; $kRte='debBal'; $accDef='sellAcc'; }
	else if($P['sellIva']=='deb' ){ $kIva='debBal'; $kRte='creBal'; $accDef='sellAcc'; }
	else if($P['buyIva']=='cre'){ $kIva='creBal'; $kRte='debBal'; $accDef='buyAcc'; }
	else if($P['buyIva']=='deb'){ $kIva='debBal'; $kRte='creBal'; $accDef='buyAcc'; }
	$SV=[];
	$q=a_sql::query('SELECT V1.vatId,V1.taxCode,IP.lineType,IP.vatBase baseAmnt,IP.vatSum,V1.sellAcc,V1.buyAcc
	FROM '.$this->tbk2.' IP
	LEFT JOIN gfi_otax V1 ON (V1.vatId=IP.vatId)
	WHERE IP.docEntry=\''.$this->docEntry.'\' ',array(1=>'Error obteniendo impuestos y retenciones de documento:'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1) while($L=$q->fetch_assoc()){
		$ln=''.$L['taxCode'].' ['.$L['vatId'].']: ';
		if($P['sellIva'] && $js=_js::ise($L['sellAcc'],$ln.'El impuesto no tiene definido cuenta contable de venta. '.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
		if($P['buyIva'] && $js=_js::ise($L['buyAcc'],$ln.'El impuesto no tiene definido cuenta contable de compra. '.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
		$vatSum=$L['vatSum'];
		$kActual='';
		if($L['lineType']=='iva'){
			$kActual=$kIva;
			$L[$kIva]=$vatSum; $L['accCode']='iva '.$accDef;
			}
		else{
			$kActual=$kRte;
			$L[$kRte]=$vatSum; $L['accCode']='rte '.$accDef;
		}
		$L['accId']=$L[$accDef];
		$L['cardId']=$this->Doc['cardId'];
		$L['lineType']='T';
		$k=$kIva.'_'.$L['vatId'];
		unset($L['taxCode'],$L['vatSum'],$L['buyAcc'],$L['sellAcc']);
		if(!$SV[$k]){ $SV[$k]=$L; }
		else{ 
			$SV[$k]['baseAmnt'] += $L['baseAmnt'];
			$SV[$k][$kActual] += $vatSum;
		}
	}
	if($P['r']){ return  $SV; }
	foreach($SV as $L){ $this->Ld[]=$L; } unset($SV);
	//die(print_r($this->Ld));
}

public function post($D=array()){
	//if(a_ses::$userId==1){ (print_r($this->Ld)); }
	$ori= ' on [gfiDac::post()]'; $errs=0; 
	$dateC=date('Y-m-d H:i:s');
	if($js=_js::ise($this->tt,'Se debe definir tt para asiento.'.$ori)){ return _err::err($js); }
	else if($js=_js::ise($this->tr,'Se debe definir tr para asiento.'.$ori,'numeric>0')){ return _err::err($js); }
	else if($js=_js::ise($this->Doc['docDate'],'Se debe definir fecha para asiento.'.$ori)){ return _err::err($js); }
	//else if($js=_js::ise($this->Doc['cdcId'],'Se debe definir el centro de costos.'.$ori)){ return _err::err($js); }
	$debCre=0; $qI=array(); $lastLine='';
$debCre2 = '0';
$data_ = [];
	if(!is_array($this->Ld) || count($this->Ld)==0){
		_err::err('No se enviaron lineas para asiento.'.$ori,3); $errs++;
	}
	else foreach($this->Ld as $x=>$L){
		$ln=$L['accCode'].': ';
		if(_js::iseErr($L['accId'],$ln.'La Id de cuenta debe estar definida.'.$ori,'numeric>0')){ $errs++; break; }
		$k=(array_key_exists('creBal',$L))?$L['accId'].'cre':$L['accId'].'deb';
		$k .=$L['cardId'].$L['cdcId'];
		$k .=($L['vatId'])?$L['vatId']:'';
		$L['tt']=$this->tt; $L['tr']=$this->tr;
		$L['docDate']=$this->Doc['docDate'];
		$L['cardId']=$this->Doc['cardId'];
		$L['cdcId']=$this->Doc['cdcId'];
		$L['serieId']=$this->Doc['serieId'];
		$L['docNum']=$this->Doc['docNum'];
		$L['dateC']=$dateC;
		if(!$L['debBal']){ $L['debBal']=0; }
		if(!$L['creBal']){ $L['creBal']=0; }
		if(!$L['debBalDue']){ $L['debBalDue']=0; }
		if(!$L['creBalDue']){ $L['creBalDue']=0; }
		$debCre+=$L['debBal']-$L['creBal'];
$debito = (string) $L['debBal'];
$credito = (string) $L['creBal'];
$diff_ = bcsub($debito, $credito, '4');
$debCre2 = bcadd($debCre2, $diff_, '4');
		$L[0]='i'; $L[1]='gfi_dac1';
		unset($L['accCode'],$L['accName']);
		unset($L['accCode'],$L['accName']);
		$L['_err1']=$ori;
		if(!array_key_exists($k,$qI)){ $qI[$k]=$L; }
		else{
			if($L['baseAmnt']){ $qI[$k]['baseAmnt']+=$L['baseAmnt']; }
			$qI[$k]['debBal']+=$L['debBal'];
			$qI[$k]['debBalDue']+=$L['debBalDue'];
			$qI[$k]['creBal']+=$L['creBal'];
			$qI[$k]['creBalDue']+=$L['creBalDue'];
		}
	}


$debCre = bccomp($debCre2, '0', '4');
	if($debCre!=0){ _err::err('Los debitos - créditos deben ser 0: '.$debCre2.$ori,3); $errs++; }
if(a_ses::$userId==1){ echo _err::$errText;  die(print_r([$comparacion, $qI])); }
	//print_r($qI);
	if($errs==0){
		a_sql::multiQuery($qI);
		if(_err::$err){ $errs++; }
		else{ return _js::r('Asiento creado correctamente.'); }
	}
}

static public function rever($D=array()){
	$ori=' on[gfiDac::revert()]';
	if(_js::iseErr($D['tt'],'El tt debe estar definido.'.$ori)){}
	else if(_js::iseErr($D['tr'],'El tr debe estar definido.'.$ori)){}
	else{
		$q=a_sql::query('SELECT * FROM gfi_dac1 WHERE tt=\''.$D['tt'].'\' AND tr=\''.$D['tr'].'\' ',array(1=>'Error obteniendo asiento de origen.'.$ori,2=>'El asiento de origen no existe.'.$ori));
		if(_err::errIf(a_sql::$err,a_sql::$errNoText)){}
		else{
			$docDate=date('Y-m-d');
			$qI=array();
			while($L=$q->fetch_assoc()){
				unset($L['acId']);
				$debBal=$L['debBal']; $creBal=$L['creBal'];
				$debBalDue=$L['debBalDue']; $creBalDue=$L['creBalDue'];
				$L['debBal']=$creBal; $L['debBalDue']=$creBalDue;
				$L['creBal']=$debBal; $L['creBalDue']=$debBalDue;
				$L['docDate']=$docDate;
				$L['isRever']='Y';
				$L[0]='i'; $L[1]='gfi_dac1';
				$qI[]=$L;
			}
			if(count($qI)>0){
				a_sql::multiQuery($qI);
				if(!_err::$err){ return _js::r('Asiento revertido correctamente.'); }
			}
		}
	}
}
static public function putCancel($D=array(),$P=array()){
	$ori=' on[gfiDac::putcancel()]';
	if($js=_js::ise($D['tt'],'Se debe definir tt.'.$ori)){ _err::err($js); }
	else if($js=_js::ise($D['tr'],'Se debe definir tr.'.$ori,'numeric>0')){ _err::err($js); }
	else{
		$q=a_sql::query('UPDATE gfi_dac1 SET canceled=\'Y\',cancelDate=\''.date('Y-m-d').'\' WHERE tt=\''.$D['tt'].'\' AND tr=\''.$D['tr'].'\' ',array(1=>'Error anulando asiento contable.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	}
}


/* por quitar */
public function setAll(){
	if($this->L1){
		$this->setDocLine($this->L1); if(_err::$err){ return false; }
	}
	else if($this->L_1){
		$this->setDocLine1($this->L_1); if(_err::$err){ return false; }
	}
	if($this->L_tax){
	$this->setDocTax($this->L_tax); if(_err::$err){ return false; }
	}
}

public function setTax($P=array()){
	//tb2, dc=deb|cre
	$mType=$this->tt;
	$ori=' on[gfiTax::sett()]'; $errs=0;
	$leff=''; $kIva=''; $kRte=''; $tb2='';
	if($js=_js::ise($this->docEntry,'Número de documento no definido.'.$ori,'numeric>0')){ return _err::err($js); }
	else if($js=_js::ise($this->Doc['cardId'],'Los impuestos requieren tercero.'.$ori,'numeric>0')){ return _err::err($js); }
	switch($this->tt){
		case 'gvtInv' :
			$kIva='creBal'; $kRte='debBal'; $tb2='gvt_inv2';
			$leff='LEFT JOIN gfi_otax V1 ON (V1.vatId=IP.vatId)
			LEFT JOIN gfi_opdc C1 ON (C1.accId=V1.sellAcc)';
		break;
		case 'gvtPin' :
			$kIva='debBal'; $kRte='creBal'; $tb2='gvt_pin2';
			$leff='LEFT JOIN gfi_otax V1 ON (V1.vatId=IP.vatId)
			LEFT JOIN gfi_opdc C1 ON (C1.accId=V1.buyAcc)';
		break;
		case 'gvtPnd' :
			$kIva='debBal'; $kRte='creBal'; $tb2='gvt_pnd2';
			$leff='LEFT JOIN gfi_otax V1 ON (V1.vatId=IP.vatId)
			LEFT JOIN gfi_opdc C1 ON (C1.accId=V1.buyAcc)';
		break;
		case 'gvtPnc' :
			$kIva='creBal'; $kRte='debBal'; $tb2='gvt_pnc2';
			$leff='LEFT JOIN gfi_otax V1 ON (V1.vatId=IP.vatId)
			LEFT JOIN gfi_opdc C1 ON (C1.accId=V1.buyAcc)';
		break;
		default : $errs++;
			_err::err('El tipo ['.$mType.'] no ha sido definido para calcular los impuestos.'.$ori,3); 
		break;
	}
	if($errs==0){
		$q=a_sql::query('SELECT V1.vatId,V1.taxCode,IP.lineType,C1.accId,C1.accCode,C1.accName,IP.vatBase baseAmnt,IP.vatSum
		FROM '.$tb2.' IP
		'.$leff.'
		WHERE IP.docEntry=\''.$this->docEntry.'\' ',array(1=>'Error obteniendo impuestos y retenciones de documento:'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1) while($L=$q->fetch_assoc()){
			$L['cardId']=$this->Doc['cardId'];
			$ln=''.$L['taxCode'].' ['.$L['vatId'].']: ';
			if($js=_js::ise($L['accId'],$ln.'El impuesto no tiene definido cuenta contable para el movimiento. '.$mType,'numeric>0')){ _err::err($js); $errs++; break; }
			if($L['lineType']=='iva'){ $L[$kIva]=$L['vatSum']; }
			else{ $L[$kRte]=$L['vatSum']; }
			unset($L['vatId'],$L['taxCode'],$L['lineType'],$L['vatSum']);
			$this->Ld[]=$L;
		}
	}
}
public function setItm($P=array()){
	//1[41-accSell], 2[14-accIvt], 3[61-accCost], 4[41 accRdn], 5[2330-accBuyRem]
	$mType=$this->tt;
	$ori=' on[gfiDac::setItm() to '.$mType.']'; $errs=0;
	$leff=''; $kIva=''; $kRte=''; $tb2='';
	if($js=_js::ise($this->docEntry,'Número de documento no definido.'.$ori,'numeric>0')){ return _err::err($js); }
	else if($js=_js::ise($this->Doc['cardId'],'Algunas cuentas requieren tercero.'.$ori,'numeric>0')){ return _err::err($js); }
	$Ac_f='I.handInv,B.numFactor,'; $Ac_g='I.handInv,B.numFactor,'; $leff='';
	//B.numFactor: para compra no aplica, para venta (invPrice*numFactor)
	//tipo trans
	$accIvt=($mType=='ivt' || $mType=='gvtInv' || $mType=='gvtPin');
	$dcIvt=''; $acc_14_61=false;
	$fromDlv=($this->Doc['fromDlv']=='Y');
	if($mType=='gvtInv'){ $acc_14_61=true;//14--61
		$dcIvt='creBal'; $tbk1='gvt_inv1';
		$Ac_f .='C1.accId acc1,C1.accCode ac1,C1.accName an1,';
		$Ac_g .='C1.accId,C1.accCode,C1.accName,';
		$leff .='LEFT JOIN gfi_opdc C1 ON (C1.accId=IC.accSell)
';
	}
	else if($mType=='gvtSdn'){ $acc_14_61=true; //14--61
		$tbk1='gvt_sdn1';
	}
	else if($mType=='gvtSrd'){ $acc_14_61=true;
		$dcIvt='creBal'; $tbk1='gvt_srd1';
		$Ac_f .='C4.accId acc4,C4.accCode ac4,C4.accName an4,';
		$Ac_g .='C4.accId,C4.accCode,C4.accName,';
		$leff ='LEFT JOIN gfi_opdc C4 ON (C4.accId=IC.accRdn)
';
	}
	
	/* Compras */
	else if($mType=='gvtPin'){//14--61 o 14--2330
		$dcIvt='debBal'; $tbk1='gvt_pin1';
		if(!$fromDlv){ $acc_14_61=true; }
		else{
			$Ac_f .='C5.accId acc5,C5.accCode ac5,C5.accName an5,';
			$Ac_g .='C5.accId,C5.accCode,C5.accName,';
			$leff ='LEFT JOIN gfi_opdc C2 ON (C2.accId=IC.accIvt)
			LEFT JOIN gfi_opdc C5 ON (C5.accId=IC.accBuyRem)
';
		}
	}
	else if($mType=='gvtPdn'){ $tbk1='gvt_pnd1'; //14--61
		$Ac_f .='C2.accId acc2,C2.accCode ac2,C2.accName an2,';
		$Ac_g .='C2.accId,C2.accCode,C2.accName,';
		$Ac_f .='C5.accId acc5,C5.accCode ac5,C5.accName an5,';
		$Ac_g .='C5.accId,C5.accCode,C5.accName,';
		$leff ='LEFT JOIN gfi_opdc C2 ON (C2.accId=IC.accIvt)
		LEFT JOIN gfi_opdc C5 ON (C5.accId=IC.accBuyRem)
';
	}
	else if($mType=='gvtPnd'){// 14--2330
		$dcIvt='debBal'; $tbk1='gvt_pnd1';
			$Ac_f .='C2.accId acc2,C2.accCode ac2,C2.accName an2,';
		$Ac_g .='C2.accId,C2.accCode,C2.accName,';
			$Ac_f .='C5.accId acc5,C5.accCode ac5,C5.accName an5,';
			$Ac_g .='C5.accId,C5.accCode,C5.accName,';
			$leff ='LEFT JOIN gfi_opdc C2 ON (C2.accId=IC.accIvt)
			LEFT JOIN gfi_opdc C5 ON (C5.accId=IC.accBuyRem)
';
	}
	else if($mType=='gvtPnc'){// 14--2330
		$dcIvt='creBal'; $tbk1='gvt_pnc1';
			$Ac_f .='C2.accId acc2,C2.accCode ac2,C2.accName an2,';
		$Ac_g .='C2.accId,C2.accCode,C2.accName,';
			$Ac_f .='C5.accId acc5,C5.accCode ac5,C5.accName an5,';
			$Ac_g .='C5.accId,C5.accCode,C5.accName,';
			$leff ='LEFT JOIN gfi_opdc C2 ON (C2.accId=IC.accIvt)
			LEFT JOIN gfi_opdc C5 ON (C5.accId=IC.accBuyRem)
';
	}
	else if($mType=='gvtPrd'){
		$dcIvt='creBal'; $tbk1='gvt_prd1';
			$Ac_f .='C2.accId acc2,C2.accCode ac2,C2.accName an2,';
		$Ac_g .='C2.accId,C2.accCode,C2.accName,';
			$Ac_f .='C5.accId acc5,C5.accCode ac5,C5.accName an5,';
			$Ac_g .='C5.accId,C5.accCode,C5.accName,';
			$leff ='LEFT JOIN gfi_opdc C2 ON (C2.accId=IC.accIvt)
			LEFT JOIN gfi_opdc C5 ON (C5.accId=IC.accBuyRem)
';
	}
	
	if($acc_14_61){
		$Ac_f .='C2.accId acc2,C2.accCode ac2,C2.accName an2,';
		$Ac_g .='C2.accId,C2.accCode,C2.accName,';
		$Ac_f .='C3.accId acc3,C3.accCode ac3,C2.accName an3,';
		$Ac_g .='C3.accId,C3.accCode,C3.accName,';
		$leff .='LEFT JOIN gfi_opdc C2 ON (C2.accId=IC.accIvt)
		LEFT JOIN gfi_opdc C3 ON (C3.accId=IC.accCost)
';
	}
	/* mejoras proximas
	- con base a cuenta revisar si pide tercero y vencimiento
 - añadir tabla bodegas para costo promedio con bodega
	*/
	$q=a_sql::query('SELECT '.substr($Ac_f,0,-1).',SUM(I.invPrice*B.quantity) invPrice,SUM(B.priceLine) priceLine
	FROM '.$tbk1.' B 
	JOIN itm_oitm I ON (I.itemId=B.itemId)
	LEFT JOIN itm_oiac IC ON (IC.accgrId=I.accgrId)
	'.$leff.'
	WHERE B.docEntry=\''.$this->docEntry.'\' GROUP BY '.substr($Ac_g,0,-1).'',array(1=>'Error obteniendo lineas documento.'.$ori.': ',2=>'El documento no tiene lineas.'.$ori));
	$accS=array();
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
	else if(a_sql::$errNo==-1) while($L=$q->fetch_assoc()){
		//echo $mType.' handInv='.$L['handInv'].' '.$Ac_f."\n";
		$movInv=(!$fromDlv && $L['handInv']=='Y');
		if($mType=='gvtInv'){
			if($js=_js::ise($L['acc1'],$ln.'El articulo no tiene definida cuenta de ventas.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
			$this->Ld[]=array('creBal'=>$L['priceLine'],'cardId'=>$this->Doc['cardId'],'accId'=>$L['acc1'],'accCode'=>$L['ac1'],'accName'=>$L['an1']);
			if($movInv){//salida
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($js=_js::ise($L['acc3'],$ln.'El articulo no tiene definida cuenta de costos'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$L['invPrice']=$L['invPrice']*$L['numFactor'];/* x140dm cada mt */
				$this->Ld[]=array('creBal'=>$L['invPrice'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
				$this->Ld[]=array('debBal'=>$L['invPrice'],'accId'=>$L['acc3'],'accCode'=>$L['ac3'],'accName'=>$L['an3']);
			}
		}
		else if($mType=='gvtSdn' && $movInv){
			if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
			if($js=_js::ise($L['acc3'],$ln.'El articulo no tiene definida cuenta de costos.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
			$this->Ld[]=array('creBal'=>$L['invPrice'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			$this->Ld[]=array('debBal'=>$L['invPrice'],'accId'=>$L['acc3'],'accCode'=>$L['ac3'],'accName'=>$L['an3'],'cardId'=>$this->Doc['cardId']);
		}
		else if($mType=='gvtSrd'){
			if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
			if($js=_js::ise($L['acc3'],$ln.'El articulo no tiene definida cuenta de costos'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
			$L['invPrice']=$L['invPrice']*$L['numFactor'];/* x140dm cada mt */
			$this->Ld[]=array('debBal'=>$L['invPrice'],'accId'=>$L['acc2']);
			$this->Ld[]=array('creBal'=>$L['invPrice'],'accId'=>$L['acc3']);
		}
		
		/* Compras */
		else if($mType=='gvtPin'){//salida
			if($fromDlv && $L['handInv']=='Y'){
				if($js=_js::ise($L['acc5'],$ln.'El articulo no tiene definida cuenta de remisión de compras.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc5'],'accCode'=>$L['ac5'],'accName'=>$L['an5'],'cardId'=>$this->Doc['cardId']);
			}
			else if($L['handInv']=='Y'){
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			}
			else{
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de auxiliar servicios (inventarios).'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			}
		}
		else if($mType=='gvtPrd'){//
			if($L['handInv']=='Y'){
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['acc5'],$ln.'El articulo no tiene definida cuenta de remisión de compras.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc5'],'accCode'=>$L['ac5'],'accName'=>$L['an5'],'cardId'=>$this->Doc['cardId']);
				$this->Ld[]=array('creBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			}
		}
		else if($mType=='gvtPdn' && $movInv){
			if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
			if($js=_js::ise($L['acc5'],$ln.'El articulo no tiene definida cuenta de remisión compras.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
			$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			$this->Ld[]=array('creBal'=>$L['priceLine'],'cardId'=>$this->Doc['cardId'],'accId'=>$L['acc5'],'accCode'=>$L['ac5'],'accName'=>$L['an5'],'cardId'=>$this->Doc['cardId']);
		}
		else if($mType=='gvtPnd'){
			if($fromDlv && $L['handInv']=='Y'){
				if($js=_js::ise($L['acc5'],$ln.'El articulo no tiene definida cuenta de remisión de compras.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc5'],'accCode'=>$L['ac5'],'accName'=>$L['an5'],'cardId'=>$this->Doc['cardId']);
			}
			else if($L['handInv']=='Y'){
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			}
			else{
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de auxiliar servicios (inventarios).'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('debBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			}
		}
		else if($mType=='gvtPnc'){
			if($fromDlv && $L['handInv']=='Y'){
				if($js=_js::ise($L['acc5'],$ln.'El articulo no tiene definida cuenta de remisión de compras.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('creBal'=>$L['priceLine'],'accId'=>$L['acc5'],'accCode'=>$L['ac5'],'accName'=>$L['an5'],'cardId'=>$this->Doc['cardId']);
			}
			else if($L['handInv']=='Y'){
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('creBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			}
			else{
				if($js=_js::ise($L['acc2'],$ln.'El articulo no tiene definida cuenta de auxiliar servicios (inventarios).'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				$this->Ld[]=array('creBal'=>$L['priceLine'],'accId'=>$L['acc2'],'accCode'=>$L['ac2'],'accName'=>$L['an2']);
			}
		}
	
	}
}

public function setDoc(){//Datos de Documento, fdpId
	$mType=$this->tt;
	$ori=' on[gfiDac::setDoc() to '.$mType.']'; $errs=0;
	if(_js::iseErr($this->tr,'Número de documento no definido.'.$ori,'numeric>0')){ return false; }
	$this->Doc=a_sql::fetch('SELECT A.fromDlv,
	A.fdpId,A.cdcId,A.cardId,A.docTotal,A.docDate,A.dueDate,
	AC.accId,A.serieId,A.docNum
	FROM '.$this->tbk.' A 
	LEFT JOIN gfi_ofdp FP ON (FP.fpId=A.fdpId)
	LEFT JOIN gfi_opdc AC ON (AC.accId=FP.accId)
	WHERE A.docEntry=\''.$this->tr.'\' LIMIT 1',array(1=>'Error obteniendo información del documento: '.$ori,2=>'docEntry no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
	else if($this->reqCard && _js::iseErr($this->Doc['cardId'],'El documento no tiene tercero. Algunas cuentas requieren tercero.'.$ori,'numeric>0')){ return false; }
}
public function setDocLine($P=array()){/* Lineas articuloes */
	$ori=' on[gfiDac::setLine()]'; $errs=0;
	if(_js::iseErr($this->tr,'Número de documento no definido.'.$ori,'numeric>0')){ return false; }
	else{
		$Ac_f='I.handInv,B.numFactor,';
		$Ac_g='I.handInv,B.numFactor,'; 
		$leff='';
		$Ac_f .='IC.accSell,IC.accIvt,IC.accCost,IC.accRdn,IC.accBuyRem';
		$Ac_g .='IC.accSell,IC.accIvt,IC.accCost,IC.accRdn,IC.accBuyRem';
		$Ac_g .=($P['fie'])?','.$P['fie']:'';//lineType 
		$leff .='';
		$q=a_sql::query('SELECT '.$Ac_f.',SUM(I.invPrice*B.quantity) invPrice,SUM(B.priceLine) priceLine
	FROM '.$this->tbk1.' B 
	JOIN itm_oitm I ON (I.itemId=B.itemId)
	LEFT JOIN itm_oiac IC ON (IC.accgrId=I.accgrId)
	'.$leff.'
	WHERE B.docEntry=\''.$this->tr.'\' GROUP BY '.$Ac_g.'',array(1=>'Error obteniendo lineas documento.'.$ori.': ',2=>'El documento no tiene lineas.'.$ori));
		$accS=array();
		$fromDlv=($this->Doc['fromDlv']=='Y');
		if(a_sql::$err){ _err::err(a_sql::$errNoText); return $Mx; }
		else if(a_sql::$errNo==-1){
			$invPriceIsPrice=($P['invPrice']=='priceLine');
			//usar precio linea como coste, compras, entradas,etc
			while($L=$q->fetch_assoc()){
				$movInv=(!$fromDlv && $L['handInv']=='Y');
				$L['invPrice']=$L['invPrice']*$L['numFactor'];/* x140dm cada mt */
				if($invPriceIsPrice){ $L['invPrice']=$L['priceLine']; }
				//verificar Cuentas
				if($P['accSell'] && $js=_js::ise($L['accSell'],$ln.'El articulo no tiene definida cuenta de inventarios.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($movInv && $P['accIvt'] && $js=_js::ise($L['accIvt'],$ln.'El articulo no tiene definida cuenta de Inventarios'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($movInv && $P['accCost'] && $js=_js::ise($L['accCost'],$ln.'El articulo no tiene definida cuenta de costos'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($P['accRdn'] && $js=_js::ise($L['accRdn'],$ln.'El articulo no tiene definida cuenta de devolución de ventas'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				if($fromDlv && $P['accBuyRem'] && $js=_js::ise($L['accBuyRem'],$ln.'El articulo no tiene definida cuenta de remisión compras'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				/*+ Definir */
				foreach($P['Li'] as $k=>$Lx){
					$balue=$L[$Lx['price']];//invPrice,priceLine
					if(!$fromDlv && $Lx['accIvt']){
						$this->Ld[]=array($Lx['accIvt']=>$balue,'accId'=>$L['accIvt'],'accCode'=>'14xx');
					}
					else if($movInv && $Lx['accCost']){
						$this->Ld[]=array($Lx['accCost']=>$balue,'accId'=>$L['accCost'],'accCode'=>'61xx');
					}
					else if($Lx['accRdn']){
						$this->Ld[]=array($Lx['accRdn']=>$balue,'accId'=>$L['accRdn'],'accCode'=>'4175xx','cardId'=>$this->Doc['cardId']);
					}
					else if($fromDlv && $Lx['accBuyRem']){
						$this->Ld[]=array($Lx['accBuyRem']=>$balue,'accId'=>$L['accBuyRem'],'accCode'=>'2330xx','cardId'=>$this->Doc['cardId']);
					} /* De ultima para order */
					else if($Lx['accSell']){  $this->Ld[]=array($Lx['accSell']=>$balue,'accId'=>$L['accSell'],'accCode'=>'41xx','cardId'=>$this->Doc['cardId']); }
				}
			}
		}
	}
}

}
?>
