<?php
//incluir Acc
class GfiCart{
public $R=array();
public $M=array();
function __construct(){
	//usado en cxcStatus para saldos iniciales
	$this->R=array(
	'cardId'=>$_GET['cardId'],
	'whA'=>'AND A.lineType IN(\'FV\',\'FC\',\'NC\',\'ND\',\'AN\',\'RC\',\'RP\')',
	);
	$this->R['date1']=($_GET['date1'])?$_GET['date1']:'0000-00-00';
	$this->R['date2']=($_GET['date2'])?$_GET['date2']:'9999-12-31';
	$this->R['balIniSum']='SUM(
		IF(A.lineType=\'RP\',A.creBal,
		IF(A.lineType=\'RC\',-A.debBal,A.debBal-A.creBal)
		)
	)';
}
public function balIni(){
	$this->M=a_sql::fetch('SELECT C.cardId,C.cardName,C.creditLine,
	'.$this->R['balIniSum'].' balIni
	FROM par_ocrd C
	LEFT JOIN gfi_dac1 A ON (A.cardId=C.cardId AND A.docDate<=\''.$this->R['date1'].'\' '.$this->R['whA'].' )
	WHERE C.cardId=\''.$this->R['cardId'].'\' GROUP BY C.cardName',array(1=>'Error obteniendo saldos iniciales',2=>'No se encontro el tercero'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	if($this->M['balIni']==null){ $this->M['balIni']=0; }
	$this->M['date1']=$this->R['date1']; $this->M['date2']=$this->R['date2'];
}
public function movDocs(){
	$q=a_sql::query('SELECT A.lineType,A.tt,A.tr,A.serieId,A.docNum,A.docDate,A.dueDate,A.cdcId,A.debBal,A.creBal,(A.debBalDue-A.creBalDue) balDue
	FROM gfi_dac1 A
	WHERE A.canceled=\'N\' '.$this->R['whA'].' 
	AND A.cardId=\''.$this->R['cardId'].'\' AND A.docDate>\''.$this->R['date1'].'\' AND A.docDate<=\''.$this->R['date2'].'\'
	ORDER BY A.docDate ASC
	',array(1=>'Error obteniendo movimientos de cuenta'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==2){ $this->M['L']=array(); }
	else{
		$this->M['L']=array();
		while($L=$q->fetch_assoc()){
			if($L['lineType']=='RP'){ $L['debBal']=$L['creBal']; unset($L['creBal']); }
			else if($L['lineType']=='RC'){ $L['creBal']=$L['debBal']; unset($L['debBal']); }
			if($L['debBal']>0){ unset($L['creBal']); }
			if($L['creBal']>0){ unset($L['debBal']); }
			$this->M['L'][]=$L;
		}
	}
}
}
?>