<?php
_0s::uriReq('ddp|rdp');
unset($___D['serieType'],$___D['textSearch']);
_0s::$Tb['pad_oddc']='pad_oddc';
_0s::$Tb['pad_ddc1']='pad_ddc1';
_0s::$Tb['pad_rdp1']='pad_rdp1';
_0s::$Tb['sys_ocdf']='sys_ocdf';

/*
 - nominal a efectiva: 10%nominal compuesto trimestralmente
 [ 1 + (T.N/n) ]^n - 1 -> [1+(0.1/4)]^4 - 1

*/
class _mathFin{
static public function EA_teq($iTasa=0,$nP=1){
	/* Teq = [(1 + i)1/n – 1] x 100*/
	$iTasa=$iTasa/100;
	$teq=( pow(1+$iTasa,(1/$nP))-1)*100;
	return round($teq,2);
}
static public function pr_cuotaFija($vp=0,$iTasa=0,$nP=0){
	//metodo frances o constante
	$it=$iTasa/100;
	//
	$v1=$it*(pow(1+$it,$nP));
	$v2=(pow(1+$it,$nP))-1;
	$c= $vp*( $v1/$v2);
	return round($c,2);
}
static public function disc($vp=0,$disc=0,$r=2){
	return round($vp*$disc/100,$r);
}
/*
Cuota Fija, formula
C = 
VP x (
 (i+(1+i)^n) /
 ((1+i)^n -1)
)
*/
}

class _cyp{
static public function getFeeDays($P=array()){
	$r=1;
	if($P['perUdm']=='days'){ $r=$P['perNum']; }
	else if($P['perUdm']=='week'){ $r=7*$P['perNum']; }
	else if($P['perUdm']=='month'){ $r=30*$P['perNum']; }
	else if($P['perUdm']=='year'){ $r=365*$P['perNum']; }
	return $r;
}
static public function fee_calcBy($P=array()){
	$R=array();
	if($P['calcBy']=='fee'){
		$total=$P['feeAmnt']*$P['feeQty'];
		$intPercTotal=abs(round(1-($total/$P['baseAmnt']),1));/* total por el periodo */
		$intPerc= (round($intPercTotal/$P['feeQty'],4)); /* int total / cuotas = int x cupta */
		$intBal=($P['baseAmnt']*$intPerc); /* valor de interes */
		$feeAmnt=$P['feeAmnt'];
		$feeCapital=$feeAmnt-$intBal; /* cuota - interes del periodo */
		$intPerc=$intPerc*100;
	}
	else if(0){
		$intBal=$P['baseAmnt']*($P['intPerc']/100); /* $ interes */
		$total=$P['baseAmnt']+($intBal*$P['feeQty']); /* prestamo + interes*n cuotas */
		$feeAmnt=$total/$P['feeQty'];
		$feeCapital=$feeAmnt-$intBal;
		$intPerc=$P['intPerc'];
		$intBal .=' --';
	}
	else{
		$intBal=$P['baseAmnt']*($P['intPerc']/100); /* $ interes fijo cada mes */
		$total=$P['baseAmnt']+($intBal*$P['feeQty']); /* prestamo + interes*n cuotas */
		$feeAmnt=($P['baseAmnt']/$P['feeQty'])+$intBal;
		$feeCapital=$feeAmnt-$intBal;
		$intPerc=$P['intPerc'];
	}
	$R['feeAmnt']=round($feeAmnt,2);
	$R['feeCapital']=round($feeCapital,2);
	$R['intBal']=round($intBal,2);
	$R['intPerc']=($intPerc).'%';
	$R['total']=round($total,2);
	return $R;
}
static public function intNum($iTasa=0,$mp=0){
	return $mp+($iTasa/100); /* 0.2 o 1.2 => 20%*/
}
/* creditos */
static public function crType_get($P=array()){
	/* simple, frances, cDefine, kPagoLib, */
	/* 100 al 5% Fijo, pagando 4 cuotas, 30x4=120 */
	$_kIntF=($P['tCred']=='kIntF');
	 /* 4 cuotas de 30, presto 100, pagan 120 */
	$iscDefine=($P['tCred']=='cDefine');
	$_kPagoLib=($P['tCred']=='kPagoLib');
	if($js=_js::ise($P['vPre'],'Se debe definir el valor del préstamo','numeric>0')){ _err::err($js); return false; }
	else if(!$iscDefine && $js=_js::ise($P['iTasa'],'Se debe definir la tasa de interes','numeric>0')){ _err::err($js); return false; }
	else if(!$_kPagoLib && $js=_js::ise($P['cuoCant'],'Se debe definir la cantidad de cuotas','numeric>0')){ _err::err($js); return false; }
	else if($js=_js::ise($P['cuoPerNum'],'Se debe definir el número para cálcular los plazos de pagos.','numeric>0')){ _err::err($js); return false; }
	else if($js=_js::ise($P['cuoPerUdm'],'Se debe definir la unidad para cálcular los plazos de pagos.')){ _err::err($js); return false; }
	/* call */
	if($_kIntF){ return self::crType_kIntF($P); }
	if($P['tCred']=='frances'){ return self::crType_frances($P); }
	if($P['tCred']=='simple'){ return self::crType_simple($P); }
	if($kPagoLib){ return self::crType_kIntF($P); }
	else if($iscDefine){ return self::crType_cDefine($P); }
}
/* calculo prestamo y cuotas */
static public function crType_simple($P=array()){#js
	$iTasa=self::intNum($P['iTasa']);
	$iCuo=round($P['vPre']*$iTasa,2);
	$vFut=$P['vPre']+$iCuo;
	$iTotal=$vFut-$P['vPre'];
	$iTTotal=($iTotal/$P['vPre'])*100;
	$cuoV=$vFut/$P['cuoCant'];
	$cuoPerInt=round($iTotal/$P['cuoCant'],2);
	$cuoPerCap=round($cuoV-$cuoPerInt,2);
	$R=array(
	'tCred'=>$P['tCred'],
	'vPre'=>$P['vPre'],'iTasa'=>$P['iTasa'], /* prestando: 100mil al 5%fijo */
	'cuoCant'=>$P['cuoCant'],'cuoV'=>$cuoV,/* pagando: 4 cuotas de 30mil */
	'cuoPerNum'=>$P['cuoPerNum'],'cuoPerUdm'=>$P['cuoPerUdm'],/* cada 7 dias 1 cuota */
	'vFut'=>$vFut,'iTTotal'=>$iTTotal,/* para un total de: 120mil equivalente al 20% */
	'cuoPerCap'=>$cuoPerCap,'cuoPerInt'=>$cuoPerInt, /* 25mil de cap, 5 int*/
	);
	$R['Lc']=self::crCuo_get($P,$R);
	return $R;
}
static public function crType_kIntF($P=array()){
	$iTasa=self::intNum($P['iTasa']);
	$iCuo=round($P['vPre']*$iTasa,2);//interes 
	$vFut=$P['vPre']+($iCuo*$P['cuoCant']); //interes fijo x n cuotas
	$iTotal=$vFut-$P['vPre'];
	$iTTotal=($iTotal/$P['vPre'])*100;
	$cuoV=$vFut/$P['cuoCant'];
	$cuoPerInt=$iTotal/$P['cuoCant'];
	$cuoPerCap=$cuoV-$cuoPerInt;
	$R=array(
	'tCred'=>$P['tCred'],
	'vPre'=>$P['vPre'],'iTasa'=>$P['iTasa'], /* prestando: 100mil al 5%fijo */
	'cuoCant'=>$P['cuoCant'],'cuoV'=>$cuoV,/* pagando: 4 cuotas de 30mil */
	'cuoPerNum'=>$P['cuoPerNum'],'cuoPerUdm'=>$P['cuoPerUdm'],/* cada 7 dias 1 cuota */
	'vFut'=>$vFut,'iTTotal'=>$iTTotal,/* para un total de: 120mil equivalente al 20% */
	'cuoPerCap'=>$cuoPerCap,'cuoPerInt'=>$cuoPerInt, /* 25mil de cap, 5 int*/
	);
	$R['Lc']=self::crCuo_get($P,$R);
	return $R;
}
static public function crType_frances($P=array()){#js
	$cuoV=_mathFin::pr_cuotaFija($P['vPre'],$P['iTasa'],$P['cuoCant']);
	$iTasa=self::intNum($P['iTasa']);
	$iCuo=$P['vPre']*$iTasa; /* solo cuota 1 */
	$vFut=$cuoV*$P['cuoCant'];
	$iTotal=$vFut-$P['vPre'];
	$iTTotal=round(($iTotal/$P['vPre'])*100,2);
	$iCouTasa=$P['iTasa'];/* solo cuota 1 */
	$cuoPerInt=round($iTotal/$P['cuoCant'],2);
	$cuoPerCap=round($cuoV-$cuoPerInt,2);
	/* prestando: 1000 al 4%, durante 5 meses, cuota de 224.63 */
	$R=array(
	'tCred'=>$P['tCred'],
	'vPre'=>$P['vPre'],'iTasa'=>$P['iTasa'], /* prestando: 1000 al 4% */
	'cuoCant'=>$P['cuoCant'],'cuoV'=>$cuoV,/* pagando: 4 cuotas de 30mil */
	'cuoPerCap'=>$cuoPerCap,'cuoPerInt'=>$cuoPerInt, /* 25mil de cap, 5 int*/
	'vFut'=>$vFut,'iTTotal'=>$iTTotal,/* para un total de: 120mil equivalente al 20% */
	'cuoPerNum'=>$P['cuoPerNum'],'cuoPerUdm'=>$P['cuoPerUdm'],/* cada 7 dias 1 cuota */
	);
	$R['Lc']=self::crCuo_get($P,$R);
	return $R;
}
static public function crType_cDefine($P=array()){#js
	/*cuota fijada, determina vFut */
	$iTasa=0; /* hallar al final */
	$iCuo=0; /* hallar al final */
	$vFut=$P['cuoV']*$P['cuoCant'];
	$iTotal=$vFut-$P['vPre'];
	$iTTotal=($iTotal/$P['vPre'])*100;
	$cuoV=$P['cuoV'];
	$iCouTasa=$P['iTasa'];
	$cuoPerInt=round($iTotal/$P['cuoCant'],2);
	$cuoPerCap=round($cuoV-$cuoPerInt,2);
	$R=array(
	'tCred'=>$P['tCred'],
	'vPre'=>$P['vPre'],'iTasa'=>$iTasa, /* prestando: 100mil sin i% */
	'cuoCant'=>$P['cuoCant'],'cuoV'=>$cuoV,/* pagando: 4 cuotas de 30mil */
	'cuoPerCap'=>$cuoPerCap,'cuoPerInt'=>$cuoPerInt, /* 25mil de cap, 5 int*/
	'vFut'=>$vFut,'iTTotal'=>$iTTotal,/* para un total de: 120mil equivalente al 20% */
	'cuoPerNum'=>$P['cuoPerNum'],'cuoPerUdm'=>$P['cuoPerUdm'],/* cada 7 dias 1 cuota */
	);
	$R['Lc']=self::crCuo_get($P,$R);
	return $R;
}
/*cuotas */
static public function crCuo_Days($P=array()){
	$r=1;
	if($P['cuoPerUdm']=='days'){ $r=$P['cuoPerNum']; }
	else if($P['cuoPerUdm']=='week'){ $r=7*$P['cuoPerNum']; }
	else if($P['cuoPerUdm']=='month'){ $r=30*$P['cuoPerNum']; }
	else if($P['cuoPerUdm']=='year'){ $r=365*$P['cuoPerNum']; }
	return $r;
}
static public function crCuo_get($P=array(),$PR=array()){
	/* n°, vencimiento, cuota, capita, interes, saldo, estado */
	$R=array(); $iniD=strtotime($P['dateIni']); $oneDay=86400;
	$daysRang=self::crCuo_Days($P);
	$cuoSaldo=$PR['vFut']; $capAt=$PR['vPre'];
	$kPagoLib=($P['tCred']=='kPagoLib');
	for($e=1; $e<=$P['cuoCant']; $e++){
		$cuoV=$PR['cuoV'];
		if($kPagoLib){
			$cuoV=0;
			$cuoSaldo=$PR['vPre']+$PR['cuoPerInt'];
		}
		$dueDate=date('Y-m-d',($iniD+$oneDay*$e*$daysRang));
		$cuoCap='???'; $cuoInt='???';
		if($P['tCred']=='kIntF'){
			$cuoCap=$PR['cuoPerCap'];
			$cuoInt=$PR['cuoPerInt'];
			$capAt =round($capAt-$cuoCap,2);
		}
		else if($P['tCred']=='frances'){
			$cuoInt=_mathFin::disc($capAt,$PR['iTasa']);
			$cuoCap=round($PR['cuoV']-$cuoInt,2);
			$capAt=round($capAt-$cuoCap,2);
		}
		else if($P['tCred']=='cDefine'){
			$cuoCap=$PR['cuoPerCap'];
			$cuoInt=$PR['cuoPerInt'];
			$capAt =round($capAt-$cuoCap,2);
		}
		else if($P['tCred']=='simple'){
			$cuoCap=$PR['cuoPerCap'];
			$cuoInt=$PR['cuoPerInt'];
			$capAt =round($capAt-$cuoCap,2);
		}
		else if($kPagoLib){
			$cuoCap=0; $cuoInt=$PR['cuoPerInt'];
		}
		$cuoSaldo_=round($cuoSaldo-$PR['cuoV'],2);
		$R[]=array('lineNum'=>$e,'dueDate'=>$dueDate,'cuoV'=>$cuoV,'cuoCap'=>$cuoCap,'cuoInt'=>$cuoInt,'cuoSaldo'=>$cuoSaldo_,'capAt'=>$capAt);
		if($kPagoLib){ break; /* solo la primera */ }
		$cuoSaldo-=$PR['cuoV'];
	}
	return $R;
}
}
require(_0s::$uriReq);
?>