<?php
//incluir Acc
class GfiCart{
public $R=array();
public $M=array();
public function f_cartStatus(){
	//usado en cxcStatus para saldos iniciales
	self::$R=array(
	'cardId'=>$_GET['cardId'],
	'whA'=>'AND A.lineType IN(\'FV\',\'FC\',\'NC\',\'ND\',\'AN\',\'RC\',\'RP\')',
	);
	self::$R['date1']=($_GET['date1'])?$_GET['date1']:'0000-00-00';
	self::$R['date2']=($_GET['date2'])?$_GET['date2']:'9999-12-31';
	self::$R['balIniSum']='SUM(
		IF(A.lineType=\'RP\',A.creBal,
		IF(A.lineType=\'RC\',-A.debBal,A.debBal-A.creBal)
		)
	)';
}
static public function cart_balIni(){
	$M=a_sql::fetch('SELECT C.cardName,C.cardType,
	'.self::$R['balIniSum'].' balIni
	FROM par_ocrd C
	LEFT JOIN gfi_dac1 A ON (A.cardId=C.cardId AND A.docDate<=\''.self::$R['date1'].'\' '.self::$R['whA'].' )
	WHERE C.cardId=\''.self::$R['cardId'].'\' GROUP BY C.cardName',array(1=>'Error obteniendo saldos iniciales',2=>'No se encontro el tercero'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	if($M['balIni']==null){ $M['balIni']=0; }
	$M['date1']=self::$R['date1']; $M['date2']=self::$R['date2'];
	return $M;
}
static public function cart_movDocs($R=array()){
	$q=a_sql::query('SELECT A.lineType,A.tt,A.tr,A.serieId,A.docNum,A.docDate,A.dueDate,A.cdcId,A.debBal,A.creBal,(A.debBalDue-A.creBalDue) balDue
	FROM gfi_dac1 A
	WHERE A.canceled=\'N\' '.self::$R['whA'].' 
	AND A.cardId=\''.self::$R['cardId'].'\' AND A.docDate>\''.self::$R['date1'].'\' AND A.docDate<=\''.self::$R['date2'].'\'
	ORDER BY A.docDate ASC
	',array(1=>'Error obteniendo movimientos de cuenta'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==2){ self::$M['L']=array(); }
	else{
		self::$M['L']=array();
		while($L=$q->fetch_assoc()){
			if($L['lineType']=='RP'){ $L['debBal']=$L['creBal']; unset($L['creBal']); }
			else if($L['lineType']=='RC'){ $L['creBal']=$L['debBal']; unset($L['debBal']); }
			self::$M['L'][]=$L;
		}
	}
}
}
?>