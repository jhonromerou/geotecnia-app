<?php
/* usar sysd/sysd.date.php */
class t_date{
static $days = array('Monday'=>'Lunes','Tuesday'=>'Martes','Wednesday'=>'Miercoles','Thursday'=>'Jueves','Friday'=>'Viernes','Saturday'=>'Sabado','Sunday'=>'Domingo');

static $days_abrev1 = array('','L','M','X','J','V','S','D');

static $meses = array('January'=>'Enero','February'=>'Febrero','March'=>'Marzo','April'=>'Abril','May'=>'Mayo','June'=>'Junio','July'=>'Julio','August'=>'Agosto','September'=>'Septiembre','October'=>'Octubre','November'=>'Noviembre','December'=>'Diciembre');

static $mesesNU = array('January','February','March','April','May','June','July','August','September','October','November','December');

static public function is0($date=''){
	if($date == ''){ return 1; }
	if(preg_match('/^0000\-/',$date) || !preg_match('/^[[0-9]{4}\-([0][1-9]|[1][0-2])\-([0-2][1-9]|[1-2][0-9]|[3][0-1])/',$date)){ return 1; } 
	else{ return 0; }
}

}
?>