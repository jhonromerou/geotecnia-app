<?php
class _2d{
static $year;
static $m=array(
'01'=>'Enero','02'=>'Febrero','03'=>'Marzo','04'=>'Abril','05'=>'Mayo','06'=>'Junio','07'=>'Julio','08'=>'Agosto','09'=>'Septiembre','10'=>'Octubre','11'=>'Noviembre.','12'=>'Diciembre');
static $d=array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
static $regTime ='/^([0-1][0-9]|[2][0-3])[\:]([0-5][0-9])$/';
static $regYmd ='/^([2-9][0-9]{3})\-([0][1-9]|[1][0-2])\-([0][1-9]|[1-2][0-9]|[3][0-1])$/';
static $days = array('Monday'=>'Lunes','Tuesday'=>'Martes','Wednesday'=>'Miercoles','Thursday'=>'Jueves','Friday'=>'Viernes','Saturday'=>'Sabado','Sunday'=>'Domingo');
static $days_abrev1 = array('','L','M','X','J','V','S','D');
static $meses = array('January'=>'Enero','February'=>'Febrero','March'=>'Marzo','April'=>'Abril','May'=>'Mayo','June'=>'Junio','July'=>'Julio','August'=>'Agosto','September'=>'Septiembre','October'=>'Octubre','November'=>'Noviembre','December'=>'Diciembre');
static $mesesNU = array('January','February','March','April','May','June','July','August','September','October','November','December');

static public function _s($date='',$r=array()){
	$ya=date('Y');
	$d=substr($date,-2);
	$m=substr($date,5,2);
	$y=substr($date,0,4);
	$D= array($d,$m,$y,$h,$m,$s);
	if($r['m']){
		$D['m']=self::$m[$m];
		if($ya!=$y){ $D['m'].=' '.$y; }
	}
	if($r['mmm']){
		$D['mmm']=substr(self::$m[$m],0,3).'.';
		if($ya!=$y){ $D['mmm'].=' '.$y; }
	}
	return $D;
}
static function verif($t='',$v='hour'){
	switch($v){
		case 'Y-m-d':if(preg_match(self::$regYmd,$t)){ return true; } break;
		case 'H:i':
			if(preg_match(self::$regTime,$t)){ return true; }
		break;
		default:{
			if(preg_match(self::$regTime,$t)){ return true; }
		}break;
	}
	return false;
}
static public function f($d='Y-m-d',$f='Y-m-d'){
	$d=substr($d,0,10);
	$sep=explode('-',$d.'-'.substr($d,11,8)); /*añadi para hora */
	$dy=$sep[2]*1;
	$yearLast=($sep[0]!=self::$year)?' '.$sep[0]:'';
	switch($f){
		case 'd F': $r=$sep[2].' '.self::$m[$sep[1]]; break;
		case 'd M': $r=$sep[2].' '.substr(self::$m[$sep[1]],0,3); break;
		case 'd F H:i': $r=$sep[2].' '.self::$m[$sep[1]].' '.substr($sep[3],0,5); break;
		case 'd M H:i': $r=$sep[2].' '.substr(self::$m[$sep[1]],0,3).' '.substr($sep[3],0,5); break;
		case 'ddd m': $r=$sep[2].' '.substr(self::$m[$sep[1]],0,3).$yearLast; break;
		default : $r=$d; break;
	}
	return $r;
}
static function toHours($s=0){
	$neg = ($s<0)?'-':''; $s = abs($s);
	$h = floor($s/3600);
	$hR = round($s%3600,0);
	$m = round($hR/60,0);
	$h = ($h<10) ? '0'.$h : $h;
	$m = ($m<10) ? '0'.$m : $m;
	return $neg.$h.':'.$m;
}

static function toText($s=0){
	if($s==0){ return ''; }
	$h = floor($s/3600);
	$hR = round($s%3600,0);
	$m = round($hR/60,0);
	if($h>=24){
		$d = floor($h/24);
		$dR = round($h%24,0);
		$t = $d.'d';
		$t .= ($dR>0) ? ' '.$dR.' h' : '';
		$t .= ($m>0) ? ' '.$m.'m.' : '.';
		return $t;
	}
	$t = ($h>0) ? $h.' h' : '';;
	$t .= ($m>0 && $t!='') ? ' ' : '';
	$t .= ($m>0) ? $m.'m.' : '.';
	return $t;
}

static function str2Hour($text='00:00:00',$P=array()){
	$hDuration = '^([0-9]*)\:([0-9]{2})\:?([0-9]{2})?$';
	preg_match('/'.$hDuration.'/',$text,$R);
	$h = $R[1]*1;
	$m = $R[2]*1;
	$hD = $m/60;
	$h = ($h)+($hD);
	if($P == 'h'){ $h = $h; }
	else if($P['format'] == 'days'){ $h = $h*60*60*24; }
	else{ $h = ($h*60*60); }
	return $h;
}

static function hoursDif($h1='00:00',$h2='00:00'){
	$h1 = self::str2Hour($h1);
	$h2 = self::str2Hour($h2);
	if($h1>$h2){//02:30am > 14:30
		$times = (86400-$h1)+$h2*1;
	}
	else{ $times = $h2-$h1*1; }
	return $times;
}

static function is0($date=''){
	if($date == ''){ return 1; }
	if(preg_match('/^0000\-/',$date) || !preg_match('/^[[0-9]{4}\-([0][1-9]|[1][0-2])\-([0-2][1-9]|[1-2][0-9]|[3][0-1])/',$date)){ return 1; }
	else{ return 0; }
}

static function g($k='Y',$date=''){
	if(_2d::is0($date)){ return 'e'; }
	$timer = (is_numeric($date))?$date:strtotime($date);
	switch($k){
		case 'z' : $r = date('z',$timer); break;//javascript, con+1 da error
		case 'Y' : $r = date('Y',$timer); break;
	}
	return $r;
}
static public function relTime($date_1=0,$date_2=0,$PARS=array()){
	$date1 = (is_numeric($date_1)) ? $date_1 : strtotime($date_1);
	$date2 = (is_numeric($date_2)) ? $date_2 : strtotime($date_2);
	$dif_seconds = ($date2 - $date1);
	if($PARS['format']){ $PARS['f']=$PARS['format']; }
	$dif_minutes = floor(($dif_seconds/60));
	if($PARS['f'] == 'hours' || $PARS['f'] == 'h') return round($dif_minutes/60,2);
	if($PARS['f'] == 's') return $dif_seconds;
	else{//days
		$dif_hours = floor($dif_minutes/60);
		return round($dif_hours/24,2);
	}
}
static public function getDiff($date_1=0,$date_2=0,$f='days',$n=0){
	$date1 = (is_numeric($date_1)) ? $date_1 : strtotime($date_1);
	$date2 = (is_numeric($date_2)) ? $date_2 : strtotime($date_2);
	$dif_seconds = ($date2 - $date1);
	$dif_minutes = floor(($dif_seconds/60));
	if($f=='h') return round($dif_minutes/60,2);
	else if($f=='s') return $dif_seconds;
	else if($f=='h:i'){
		$xh=floor($dif_minutes/60);
		$xi=round($dif_minutes%60);
		return [substr('0'.$xh,-2).':'.substr('0'.$xi,-2),round($dif_minutes/60,2)];
	}
	else{//days
		$dif_hours = floor($dif_minutes/60);
		return round($dif_hours/24,2);
	}
}

static public function get($time=1,$format='Y/m/d',$P=array()){
	if($time==''){ return ''; }
	$GETDATE = array();
	$times = (is_numeric($time)) ? $time : strtotime($time);
	$date = getdate($times);
	if(preg_match('/^0000\-/',$time)){ return ''; }
	if($date[0] == 0 && $time!=''){ return 'Error'; }
	$mDay = ($date['mday'] < 10) ? '0'.$date['mday'] : $date['mday'];
	$mMonth = ($date['mon'] < 10) ? '0'.$date['mon'] : $date['mon'];
	$year = $date['year'];
	$isToday = (date('Y-m-d') == ($year.'-'.$mMonth.'-'.$mDay)) ? true : false;
	$yearDif = (date('Y') != $year) ? ' '.$year : '';;
	$year_2 = substr($year,-2);
	$mDayName = self::$days[$date['weekday']]; #dia lunes
	$mDayName3 = substr($mDayName,0,3);  #dia lun
	$mMonthName = self::$meses[$date['month']];
	$mMonthName_3 = substr($mMonthName,0,3);
	$mHours = ($date['hours'] < 10) ? '0'.$date['hours'] : $date['hours'];
	$mMinutes = ($date['minutes'] < 10) ? '0'.$date['minutes'] : $date['minutes'];
	if($format == 'getdate'){
		return $GETDATE = array(
		'time'=>$times, 'd'=>$mDay, 'm'=>$mMonth, 'y'=>$year_2,
		'day'=>$mDayName, 'day_3'=>$mDayName3.'.', 'month'=>$mMonthName, 'month_3'=>$mMonthName_3.'.', 'year'=>$year);
	}
	if($isToday == true && $P['today']){ $format = 'H:iam'; }
	switch($format){
		case 'mes' : return $mMonthName; break;
		case 'm/Y' : return $mMonth.'/'.$year; break;
		case 'mes de Y' : return $mMonthName.' de '.$year; break;
		case 'mes-Y' : return $mMonthName.'-'.$year; break;
		case 'd de m del y' : $mDay.' de '.$mMonthName.' de '.$year; break;
		case 'm, d y' : return  $mMonthName.' '.$mDay.', '.$year; break;
		case 'mmm, d y' : $mMonthName_3.' '.$mDay.', '.$year; break;
		case 'mmm' : $mMonthName_3 . $yearDif; break;
		case 'y/m/d' : return  $year.'/'.$mMonth.'/'.$mDay; break;
		case 'mmm d/y' : return "$mMonthName_3 $mDay/".$year; break;
		case 'mmm d' : return "$mMonthName_3 $mDay"; break;
		case 'd-mmm-y2' : return "$mDay-$mMonthName_3-".substr($year,2,2); break;
		case 'dia d m3 y' : return  "$mDayName $mDay $mMonthName_3. $year"; break;
		case 'dia d m y' : return  "$mDayName $mDay $mMonthName $year"; break;
		#Con horas
		case 'H:iam' : //hoy
			$am = ($mHours >=12) ? 'pm' : 'am';
			$mHours = ($mHours ==0) ? 12 : $mHours;
			$mHours = ($mHours >12) ? $mHours-12*1 : $mHours*1;;
			$mHours = ($mHours <9 && !preg_match('/[0][1-9]/',$mHours)) ? '0'.$mHours : $mHours;
			return "Hoy, $mHours:$mMinutes $am";
		break;
		case 'Y-m-d Hora' : return  "$year-$mMonth-$mDay $mHours:$mMinutes"; break;
		case 'm d, y H:i' : return  $mMonthName.' '.$mDay.', '.$year.' '.$mHours.':'.$mMinutes;  break;
		case 'Y-m-d H:i' : return  "$year-$mMonth-$mDay $mHours:$mMinutes"; break;
		case 'd-mmm-y2 H:i' : return "$mDay-$mMonthName_3-".substr($year,2,2)." $mHours:$mMinutes"; break;
		case 'd-mmm-y2 H:iam' :
			$am = ($mHours >=12) ? 'pm' : 'am';
			$mHours = ($mHours ==0) ? 12 : $mHours;
			$mHours = ($mHours >12) ? $mHours-12*1 : $mHours*1;;
			$mHours = ($mHours <9 && !preg_match('/[0][1-9]/',$mHours)) ? '0'.$mHours : $mHours;
			return "$mDay-$mMonthName_3-".substr($year,2,2)." $mHours:$mMinutes $am";
		break;
		default : return  "$year-$mMonth-$mDay"; break;
	}
}

static function explod($dat='',$ft=false,$F=false){
	$tim=(is_nan($date))?strtotime($dat):$dat;
	$R=array();
	$R['d']=date('d',$tim);
	$R['m']=date('m',$tim);
	$R['y']=date('Y',$tim);
	if($ft){
		if(preg_match('/(mName)/',$ft)){ $R['mName']=self::$m[$R['m']]; }
		if(preg_match('/(w)/',$ft)){
		$R['w']=date('w',$tim);
		$R['wName']=self::$d[$R['w']];
		}
	}
	if($F && is_array($F) && count($F)>0){
		$sep=''; $rt='';
		if($F['s']){ $sep=$F['s']; unset($F['s']); }
		foreach($F as $n =>$kt){
			if(preg_match('/^\_/',$kt)){ $rt .= preg_replace('/^\_/','',$kt); }
			else if($R[$kt]){ $rt.=$R[$kt]; }
			else { $rt.=$kt; }
			$rt.=$sep;
			/* array(wName,'_,',d,mName,'_,') domingo, 10 junio */
		}
		return $rt;
	}
	return $R;
}

static public function dateLong($date1='',$date2='',$F=false){
	$F=($F)?$F:array('wName','_, ','d','_ ','mName');
	$tim1=strtotime(substr($date1,0,10));
	$tim2=strtotime(substr($date2,0,10));
	$rt='';
	if($tim1==$tim2){
		$se=self::explod($tim1,'w|mName',$F);
		$rt=$se.' '.substr($date1,11,5).' - '.substr($date2,11,5);
	}
	else{
		$se=self::explod($tim1,'w|mName',$F);
		$rt=$se.' '.substr($date1,11,5).' - ';
		$se=self::explod($tim2,'w|mName',$F);
		$rt.=$se.' '.substr($date2,11,5);
	}
	return $rt;
}
static public function rangFields($P=array(),$t=1){
	//f1,fecha1,f2,fecha2
	if($t==2){// verifica 1 fecha en 2 campos diferentes, ingreso-retiro empleado
		$r= '(('.$P[0].'>=\''.$P[1].'\' AND '.$P[2].'<=\''.$P[3].'\') OR
('.$P[2].'>=\''.$P[1].'\' AND '.$P[0].'<=\''.$P[3].'\'))';
	}
	if($t==3){// fecha en 2 campos > y <
		$r= '('.$P[1].'<=\''.$P[0].'\' AND '.$P[2].'>=\''.$P[0].'\')';
	}
	else{
		$r= '(('.$P[0].'>=\''.$P[1].'\' AND '.$P[0].'<=\''.$P[3].'\') OR
('.$P[2].'>=\''.$P[1].'\' AND '.$P[2].'<=\''.$P[3].'\'))';
	}
	return $r;
}
static public function viewRang($fieName='',$D=[]){
	//para reportes, obtiene parametros para consultar
	switch($D['viewRang']){
		case 'M':
			$fie='SUBSTR('.$fieName.',1,7) period';
			$gb='SUBSTR('.$fieName.',1,7)';
			$rangWh='AND ('.$fieName.'>=\''.$D['year2'].'-'.$D['month1'].'-01\' AND '.$fieName.'<=\''.date('Y-m-t',strtotime($D['year2'].'-'.$D['month2'].'-28')).'\')';
		 break;
		case 'D':
			$fie=''.$fieName.'';
			$gb=''.$fieName.'';
			$rangWh='AND ('.$fieName.'>=\''.$D['date1'].'\' AND '.$fieName.'<=\''.$D['date2'].'\')'; break;
	}
	return ['fie'=>$fie,'gb'=>$gb,'wh'=>$rangWh];
}
}

_2d::$year=date('Y');
?>
