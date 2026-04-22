<?php
/* Posibles kkeys
weekly, weekly.ljv
- monthly
  - monthly.day.28 || monthly.day
  - monthtly.[1-4,l].week
 monthly.[1-4,l].v = Primer viernes del mes

- yearly.day.260 : Cada año el dia 260
- yearly.l.j : EN PRUEBAS Cada año el ultimo jueves
- yearly.4.j : cada año, el 4 jueves
- yearly: cada año segun fecha
*/
class DateCicle{
static $Fx1=array(1=>'first',2=>'second',3=>'third',4=>'fourth','l'=>'last');
static $Fx2=array('l'=>'mon','m'=>'tue','x'=>'wed','j'=>'thu','v'=>'fri','s'=>'sat','d'=>'sun','week'=>'week');
static $err=false;
static $errText='';
static public function calc($f='',$P=array()){
	//endDate,completDate,doDate
	self::$err=false; self::$errText='';
	$se=explode('.',$f); 
	/* monthly.last.mon.x2.on[iD,dD,cD] */
	$pr1=$se[0]; //daily,weekly
	$pr2=$se[1]; //weekly[lm]
	$pr3=$se[2];//mon
	$pr4=($se[3])?str_replace('x','',$se[3])*1:false;//cada x
	$pr5=preg_replace('/.*on(eD|cD|iD)$/','$1',$f);
	//Base fecha proxima repeticion en: por defecto completDate
	if($pr5=='eD' && $P['endDate']){ $iniDate=$P['endDate']; }
	else if($pr5=='cD' && $P['completDate']){ $iniDate=$P['completDate']; }
	else if($pr5=='iD' && $P['doDate']){ $iniDate=$P['doDate']; }
	else { $iniDate=date('Y-m-d'); }
	$iniBaseTime=strtotime($iniDate);
	if($iniBaseTime===false){
		self::$err=true; self::$errText='Date not valid ('.$iniDate.') on[Rmd.cal]';
		return self::$errText;
	}
	$iniDateBase=date('Y-m-d',$iniBaseTime);
	$iniDate=$iniDateBase;
	$D_WD=array('l'=>1,'m'=>2,'x'=>3,'j'=>4,'v'=>5,'s'=>6,'d'=>7);
	$D_WDi=array(1=>'l',2=>'m',3=>'x',4=>'j',5=>'v',6=>'s',7=>'d');
	$PWD_=($P['wd'])?$P['wd']:array(); /* wd[1]=lunes */
	if($pr4>1){/* Añadir cantidad a fecha pasada para iniciar */
		$txt=($pr1=='monthly')?'months':'days';
		$iniDate=date('Y-m-d',strtotime($iniDate.' +'.$pr4.$txt));
	}
	$iniDat=strtotime($iniDate); $_1day=86400;
	$X=explode('-',$iniDate); $Ym=$X[0].'-'.$X[1];
	$Fx1=self::$Fx1;
	$Fx2=self::$Fx2;
	
	if($pr1=='daily'){ $nextDate=date('Y-m-d',$iniDat+$_1day); }/* ok*/
	else if($pr1=='weekly'){/* ok*/
		$sep=($pr2)?preg_split('//',$pr2,-1, PREG_SPLIT_NO_EMPTY):false; /* weekly.[lmv] */
		if(is_array($sep)) foreach($sep as $nx=>$nv){
			$nk=$D_WD[$nv]*1;
			$PWD_[$nk]=$nv;
		}
		else{
			$nW=date('N',$iniDat+' +7days');
			$PWD_[$nW]=$D_WDi[$nW];
		}
		$nextDate='0000-00-00';
		for($d=1; $d<=7; $d++){
			$nda=$iniDat+($_1day*$d);
			$nW=date('N',$nda);
			//P2=array(1=L,2=>M,3=M)
			if($PWD_[$nW]){ $nextDate=date('Y-m-d',$nda); break; }
		}
	}
	else if($pr1=='monthlyDay'){/* ok*/
		if($pr2>=1 && $pr2<=31){
			$pr2=substr('0'.$pr2,-2);
			$k0='monthly.dayAt';
			$txt =' +1month'; /*solo sumar si no */
			$nextDate = date('Y-m-'.$pr2,strtotime($iniDate.$txt));
		}
		else{
			$k0='monthly.day';
			$txt =($pr4>1)?'':' +1month'; /*solo sumar si no */
			$nextDate = date('Y-m-'.$X[2],strtotime($iniDate.$txt));
		}
	}
	else if($pr1=='monthly' && $pr3=='week'){/* ok*/
		$k0='monthy.numWeekOnMonth-['.$pr2.']';
		$pr2=($pr2!='l' && $pr2<1)?1:$pr2;
		$pr2=($pr2!='l' && $pr2>4)?4:$pr2;
		$nextDate = self::iniWeek($iniDate,$pr2,'maxIni');
	}
	else if($pr1=='monthly'){ /* ok*/
		if($pr2 && $pr3){ /* monthly.1.x */
			$k0='monthy.weekDayRel';
			$fText=$Fx1[$pr2].' '.$Fx2[$pr3].' of';
			$nextDate=date('Y-m-d',strtotime($iniDate.' '.$fText));
			if($nextDate<=$iniDate){
				$iniDate=date('Y-m-d',strtotime($iniDate.' +1 month'));
				$nextDate=date('Y-m-d',strtotime($iniDate.' '.$fText));
			}
		}
		else{ $k0='monthy.atDay'; $nextDate=date('Y-m-d',strtotime($iniDate.' +1 month')); }
	}
	else if($pr1=='yearlyDay'){ /* yearly.day.260 */
			$k0='yearly.dayNum';
			$iniDate=date('Y-01-01',strtotime($iniDate.' +1 year'));
			$nextDate=date('Y-m-d',strtotime($iniDate.' +'.($pr2-1).' days'));
		}
	else if($pr1=='yearly'){
		if($pr2=='l' && $pr3){ /*  yearly.l.x */
			$k0='yearly.weekDayRel';
			$fText='last '.$Fx2[$pr3].' of';
			$fDay=date('Y-12-d',strtotime($iniDate.' +1 year'));
			$nextDate=date('Y-12-d',strtotime($fDay.' '.$fText));
		}
		else if($pr2 && $pr3){ /* yearly.4.x */
			$k0='yearly.weekDayRel';
			$fText='first '.$Fx2[$pr3].' of';
			$fDay=date('Y-01-d',strtotime($iniDate.' +1 year'));
			$fDay=date('Y-01-d',strtotime($fDay.' '.$fText));
			$fText2=' +'.($pr2-1).' weeks';
			$nextDate=date('Y-m-d',strtotime($fDay.' '.$fText2));
		}
		else{
			$k0='yearly';
			$nextDate=date('Y-m-d',strtotime($iniDate.' +1 year'));
		}
	}
	return array('f'=>$f,'by'=>$pr5,'k0'=>$k0,'iniDate'=>$iniDate,'nextDate'=>$nextDate);
}
static public function daysDiff($d1='',$d2=''){
	return ((strtotime($d2)-strtotime($d1))/86400);
}
static public function iniWeek($nextDate='',$rev=false,$maxIni=false){
	/* Verifica que la semana si aplica como inicio l=30 o 31 no */
	$iniDate=$nextDate;
	$fText=($rev)?self::$Fx1[$rev].' monday of':'first monday of';
	$nextDate = date('Y-m-d',strtotime($nextDate.' '.$fText));
	if($rev=='l'){
		/*Si l-m, solo ocupa 2 dias */
		$n2 = date('Y-m',strtotime($nextDate.' +2 days'));
		if(substr($n2,5,2)!=substr($nextDate,5,2)){
			$nextDate = date('Y-m-d',strtotime($nextDate.' -7 days'));
		}
		if($nextDate<=$iniDate){/*fecha mayor,calcular siguiente */
			$nextDate = date('Y-m-d',strtotime($nextDate.' +1month'));
			$nextDate = date('Y-m-d',strtotime($nextDate.' '.$fText));
		}
	}
	else if($rev && $rev>0){
		if($maxIni && $nextDate<=$iniDate){/* evitar que sea menor a fecha */
			$nextDate=date('Y-m-d',strtotime($nextDate.' +1 month'));
			$nextDate= date('Y-m-d',strtotime($nextDate.' '.$fText));
		}
		$fDay=date('N',strtotime($nextDate.' first day of'))*1;
		if($fDay==7){ $fDay=0; }
		if($fDay>1){ 
			$n2 = date('Y-m-d',strtotime($nextDate.' -7 days'));
			if(substr($n2,5,2)!=substr($nextDate,5,2)){
				$nextDate=date('Y-m-d',strtotime($nextDate.' -6 days'));
			}else{ $nextDate=$n2; }
		}
	}
	return $nextDate;
}
}
?>