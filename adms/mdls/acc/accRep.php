<?php
$reqAcc=false; /* pedir cuentas */
class gfiAccAux{
public $L=array();
public $kName=false;
public $wh='';
public $lJoin='';
public $lvel=false; /* Nivel Presentacion */
public $fAccTxt='accCode'; /* 11 Disponible */

public function __construct($P=array()){
	$this->gb=$P['gb'];
	$this->kName=$P['kName'];
	$this->date1=$P['date1'];
	$this->date2=$P['date2'];
	$this->wh=$P['wh'];
	if($P['lvel']){ $this->lvel=$P['lvel']; }
	if($P['fAccTxt']){ $this->fAccTxt=$P['fAccTxt']; }
	if($this->kName=='cardId'){
		$this->wh .= ' AND A.cardId>0 ';
		$this->gb ='A.cardId,C.cardName,'.$this->gb;
		$this->lJoin ='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	if($this->kName=='cdcId'){
		$this->gb ='A.cdcId,'.$this->gb;
	}
}
public function quL($qu='',$P=array()){
	$n=0;
	$q=a_sql::query($qu,array(1=>'Error ejecutando consulta',2=>'No se encontraron resultados para la consulta.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else{
		$k1=explode(',',$P['k']); $n=0;
		while($L=$q->fetch_assoc()){
			if($P['k']){
				$k=''; foreach($k1 as $kv){ $k .= $L[$kv].'.'; }
			}else{ $k=$n; $n++; }
			$this->L[$k]=$L;
		}
		if($this->lvel){
			$Lo=$this->L; $this->L=array(); $n=0;
			$k1=explode(',',$P['kFa']); $n=0;
			foreach($Lo as $n=>$L){
				$nL=$this->fAccGet($L['accId'],$L,$this->lvel);
				if($P['kFa']){
					$k=''; foreach($k1 as $kv){ $k .= $nL[$kv].'.'; }
				}else{ $k=$n; $n++; }
				//Sumar en k si ya existe
				if(!array_key_exists($k,$this->L)){
					$this->L[$k]=$nL;
				}
				else{ $this->L[$k]['balTo']+=$nL['balTo']; }
			}
		}
	}
}
public function getK($L=array()){
	$k='';
	switch($this->kName){
		case 'cardId': $k=$L['cardId'].'_'.$L['accId']; break;
		case 'cdcId': $k=$L['cdcId'].'_'.$L['accId']; break;
		default : $k=$L['accId']; break;
	}
	return $k;
}
public function iniBal(){
	//,SUM(A.debBal) debBalOpen,SUM(A.creBal) creBalOpen
	$q=a_sql::query('SELECT '.$this->gb.',SUM(A.debBal-A.creBal) balOpen
	FROM gfi_dac1 A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	LEFT JOIN gfi_opdc fAC ON (fAC.accId=AC.fatherAcc)
	'.$this->lJoin.'
	WHERE A.canceled=\'N\' AND A.docDate<\''.$this->date1.'\'
	'.$this->wh.'
	GROUP BY '.$this->gb.' ',array(1=>'Error obteniendo saldo inicial'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if(a_sql::$errNo==-1) while($L=$q->fetch_assoc()){
		$k=$this->getK($L);
		$L['debBal']=0; $L['creBal']=0;
		$this->L[$k]=$L;
	}
}
public function rowBal(){
	$q=a_sql::query('SELECT '.$this->gb.',SUM(A.debBal) debBal,SUM(A.creBal) creBal
	FROM gfi_dac1 A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	LEFT JOIN gfi_opdc fAC ON (fAC.accId=AC.fatherAcc)
	'.$this->lJoin.'
	WHERE A.canceled=\'N\' AND A.docDate>=\''.$this->date1.'\' AND A.docDate<=\''.$this->date2.'\'
	'.$this->wh.'
	GROUP BY '.$this->gb.'
	',array(1=>'Error obteniendo movimientos'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1) while($L=$q->fetch_assoc()){
		if(!array_key_exists('balOpen',$L)){ $L['balOpen']=0; }
		if(!array_key_exists('balEnd',$L)){ $L['balEnd']=0; }
		$k=$this->getK($L);
		if(!array_key_exists($k,$this->L)){ $this->L[$k]=$L; }
		else{
			$this->L[$k]['debBal'] +=$L['debBal'];
			$this->L[$k]['creBal'] +=$L['creBal'];
		}
	}
}

public function fAccGet($accId=0,$L=array(),$lvel=5){
	if($lvel<0){ $lvel=1; }
	else if($lvel>5){ $lvel=5; }
	$q2=a_sql::fetch('SELECT
	P.fatherAcc,P.lvel lvelAcc,
	P2.lvel,P2.accId,P2.accCode,P2.accName
	FROM gfi_opdc P
	LEFT JOIN gfi_opdc P2 ON (P2.accId=P.fatherAcc)
	WHERE P.accId=\''.$accId.'\' AND P.fatherAcc>0 LIMIT 1',array(1=>'Error revisando cuenta padre.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		if($q2['lvel']>$lvel && $q2['fatherAcc']>0){
			return $this->fAccGet($q2['accId'],$L,$lvel);
		}
		else if($lvel>=$q2['lvelAcc']){ return $L; }
		else{
			$L['accId']=$q2['accId'];
			$L['accCode']=$q2['accCode'];
			if($this->fAccTxt=='all'){
				$L['accName']=$q2['accName'];
			}
			return $L;
		}
	}
	else{ return $L; }
}
/* Sumar en Padre */
public function lvTop($lvel=4){
	$Lx=$this->L; $this->L=array();
	foreach($Lx as $accId=>$L){
		$this->lvTopPut($accId,$L,$lvel);
		if(_err::$err){ break; }
	}
}
public function lvTopPut($accId=0,$L=array(),$lv=2){
	$q2=a_sql::fetch('SELECT P.fatherAcc,P.lvel lvelAcc,P2.lvel,P2.accId,P2.accCode,P2.accName
	FROM gfi_opdc P
	LEFT JOIN gfi_opdc P2 ON (P2.accId=P.fatherAcc)
	WHERE P.accId=\''.$accId.'\' AND P.fatherAcc>0 LIMIT 1',array(1=>'Error revisando cuenta padre.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		if($q2['lvel']*1>$lv && $q2['fatherAcc']>0){
			return $this->lvTopPut($q2['accId'],$L,$lv);
		}
		else if($lv>=$q2['lvelAcc']){
			$k2=$accId;
			$this->L[$k2]=$L;
		}
		else{
			unset($q2['fatherAcc']);
			$k2=$q2['accId'];
			/* Poner datos */
			if(!array_key_exists($k2,$this->L)){
				$this->L[$k2]=$q2;
				$this->L[$k2]['balOpen']=0;
				$this->L[$k2]['debBal']=0;
				$this->L[$k2]['creBal']=0;
			}
			if($L['balOpen']){$this->L[$k2]['balOpen'] += $L['balOpen']; }
			if($L['debBal']){$this->L[$k2]['debBal'] += $L['debBal']; }
			if($L['creBal']){ $this->L[$k2]['creBal'] += $L['creBal']; }
		}
		return $q2;

	}
}

public function setList($gby='',$P=array()){
	$gbyAll=($gby=='sep'); $wh='';
	if($gby=='doc' || $gbyAll){
		$gb .=',A.tt,A.tr,A.serieId,A.docNum';
		if($P['doc']){ $gb .=','.$P['doc']; }
		$wh .='';
	}
	if($gby=='cdcId' || $gbyAll){ $gb .=',A.cdcId'; }
	if($_GET['gby']=='cardId' || $gbyAll){
		$gb .=',A.cardId,C.cardName';
		if($P['cardId']){ $gb .=','.$P['cardId']; }
		$lJoin .='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	return array('gb'=>$gb,'lJoin'=>$lJoin,'wh'=>$wh);
}
}


if(_0s::$router=='GET accRep/daily'){
	$nD=new gfiAccAux(); _ADMS::_lb('sql/filter');
	$lvel=$_GET['lvel'];
	$GS=array();
	$GS['A.docDate(E_mayIgual)']=$_GET['date1'];
	$GS['A.docDate(E_menIgual)']=$_GET['date2'];
	$nD->quL('SELECT A.accId,A.serieId,A.docNum,A.tt,A.tr,A.docDate,AC.accCode,AC.accName,A.debBal,A.creBal
	FROM gfi_dac1 A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	WHERE A.canceled=\'N\' '.a_sql_filtByT($GS).'
	ORDER BY A.acId ASC,A.docDate ASC');
	if(_err::$err){ echo _err::$errText; }
	else{
		if($lvel){
			foreach($nD->L as $n=>$L){
				$nD->L[$n]=$nD->fAccGet($L['accId'],$L,$lvel);
			}
		}
		echo _js::enc(['L'=>$nD->L]);
	}
}
else if(_0s::$router=='GET accRep/major'){
	$Mx=array();
	$lvel=$_GET['lvel'];
	$wh='';
	$kName='accId';
	if($_GET['gby']){ $kName=$_GET['gby']; }
	$gb='AC.accId,AC.accCode,AC.accName';
	$qD=new gfiAccAux(array('kName'=>$kName,'gb'=>$gb,'date1'=>$_GET['date1'],'date2'=>$_GET['date2']));
	if($_GET['acc1']){ $qD->wh .='AND AC.accCode>=\''.$_GET['acc1'].'\' '; }
	if($_GET['acc2']){ $qD->wh .='AND AC.accCode<=\''.$_GET['acc2'].'\' '; }
	if($_GET['cardId']){ $qD->wh .='AND A.cardId=\''.$_GET['cardId'].'\' '; }
	if($_GET['cdcId']){ $qD->wh .='AND A.cdcId=\''.$_GET['cdcId'].'\' '; }
	$qD->iniBal(); if(_err::$err){ die(_err::$errText); }
	$qD->rowBal(); if(_err::$err){ die(_err::$errText); }
	if($lvel){ $qD->lvTop($lvel); }
	if(_err::$err){ die(_err::$errText); }
	$Mx['L']=$qD->L;
	echo _js::enc2($Mx);
}
else if(_0s::$router=='GET accRep/auxAcc'){
	if(_js::iseErr($_GET['date1'],'Se debe definir fecha de inicio')){}
	else if(_js::iseErr($_GET['date2'],'Se debe definir fecha de corte')){}
	if(_err::$err){ die(_err::$errText); }
	_ADMS::lib('sql/filter');
	$date1=$_GET['date1']; $date2=$_GET['date2'];
	$viewType=$_GET['viewType'];
	$wh ='AND A.docDate BETWEEN \''.$date1.'\' AND \''.$date2.'\'';
	if($_GET['cardId']>0){ $_GET['A.cardId']=$_GET['cardId']; }
	if($_GET['acc1']){ $wh .=' AND AC.accCode>=\''.$_GET['acc1'].'\''; }
	if($_GET['acc2']){ $wh .=' AND AC.accCode<=\''.$_GET['acc2'].'\''; }
	unset($_GET['date1'],$_GET['date2'],$_GET['cardId'],$_GET['viewType'],$_GET['acc1'],$_GET['acc2']);
	$wh .=' '.a_sql_filter($_GET);
	$M=array('_view'=>$viewType,'L'=>[]);
	$fie=$lf=''; $gb='';
	if($viewType=='DOC'){
		$gb='AC.accCode,AC.accName,A.docDate,C.licTradNum,C.cardName,A.tt,A.tr,A.serieId,A.docNum,A.debBal,A.creBal';
		$fie=$gb.'';
		$lf='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	else if($viewType=='C'){
		$gb='AC.accCode,AC.accName';
		$fie=$gb.',SUM(A.debBal) debBal,SUM(A.creBal) creBal';
		$lf='';
	}
	else if($viewType=='CC'){
		$gb='C.licTradNum,C.cardName,AC.accCode,AC.accName';
		$fie=$gb.',SUM(A.debBal) debBal,SUM(A.creBal) creBal';
		$lf='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	if($gb!=''){ $gb='GROUP BY '.$gb; }
	$q=a_sql::query('SELECT '.$fie.'
	FROM gfi_dac1 A '.$lf.'
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	WHERE A.canceled=\'N\' '.$wh.' '.$gb,array(1=>'Error obteniendo registros'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			$M['L'][]=$L;
		}
	}
	if(_err::$err){ die(_err::$errText); }
	else{ echo _js::enc2($M); }
}
else if(_0s::$router=='GET accRep/taxes'){
	$nD=new gfiAccAux(); _ADMS::_lb('sql/filter');
	$lvel=$_GET['lvel'];
	$wh='';
	$lJoin='';
	$gb='A.accId,A.tt,A.tr,T.taxType,T.taxCode,T.taxName,A.docDate,AC.accCode,AC.accName';
	if($_GET['taxBy']=='sell'){ $wh .= 'AND A.accId=T.sellAcc'; }
	else if($_GET['taxBy']=='pur'){ $wh .= 'AND A.accId=T.buyAcc'; }
	$gbyAll=($_GET['gby']=='sep');
	if($_GET['gby']=='doc' || $gbyAll){
		$gb .=',A.tt,A.tr,A.serieId,A.docNum';
	}
	if($_GET['gby']=='cdcId' || $gbyAll){ $gb .=',A.cdcId'; }
	if($_GET['gby']=='cardId' || $gbyAll){
		$gb .=',A.cardId,C.cardName';
		$lJoin .='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}

	if($_GET['taxType']){ $wh .= ' AND T.taxType=\''.$_GET['taxType'].'\' '; }
	$GS=array();
	$GS['A.docDate(E_mayIgual)']=$_GET['date1'];
	$GS['A.docDate(E_menIgual)']=$_GET['date2'];
	$nD->quL('SELECT '.$gb.',SUM(baseAmnt) baseAmnt,SUM(A.debBal) debBal,SUM(A.creBal) creBal
	FROM gfi_dac1 A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	LEFT JOIN gfi_otax T ON (T.vatId=A.vatId)
	'.$lJoin.'
	WHERE 1 '.$wh.' '.a_sql_filtByT($GS).'
	GROUP BY '.$gb);
	if(_err::$err){ echo _err::$errText; }
	else{
		if($lvel){
			foreach($nD->L as $n=>$L){
				$nD->L[$n]=$nD->fAccGet($L['accId'],$L,$lvel);
			}
		}
		echo _js::enc(['L'=>$nD->L]);
	}
}
else if(_0s::$router=='GET accRep/sf'){
	$nD=new gfiAccAux(array('lvel'=>$_GET['lvel'],'fAccTxt'=>'all')); _ADMS::_lb('sql/filter');
	$wh='';
	$lJoin='';
	$gb='AC.balType,AC.accId,AC.accCode,AC.accName';
	$GS=array();
	$GS['A.docDate(E_menIgual)']=$_GET['date2'];
	$nD->quL('SELECT '.$gb.',SUM(A.debBal-A.creBal) balTo
	FROM gfi_dac1 A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	'.$lJoin.'
	WHERE A.canceled=\'N\' AND AC.balType>0 '.$wh.' '.a_sql_filtByT($GS).'
	GROUP BY '.$gb,array('kFa'=>'balType,accId'));
	if(_err::$err){ echo _err::$errText; }
	else{ echo _js::enc(['L'=>$nD->L]); }
}
else if(_0s::$router=='GET accRep/er'){
	$nD=new gfiAccAux(array('lvel'=>$_GET['lvel'],'fAccTxt'=>'all')); _ADMS::_lb('sql/filter');
	$wh='';
	$kFa=false;
	$lJoin='';
	$gb='AC.erType';
	if($_GET['lvel']>0){
		$kFa='erType,accGr,accId';
		$gb .=',AC.accId,AC.accCode,AC.accName';
	}
	$GS=array();
	$GS['A.docDate(E_menIgual)']=$_GET['date2'];
	$nD->quL('SELECT '.$gb.',SUM(A.debBal-A.creBal) balTo
	FROM gfi_dac1 A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	'.$lJoin.'
	WHERE A.canceled=\'N\' AND AC.erType>0 '.$wh.' '.a_sql_filtByT($GS).'
	GROUP BY '.$gb,array('k'=>'erType,accGr','kFa'=>$kFa));
	if(_err::$err){ echo _err::$errText; }
	else{ echo _js::enc(['L'=>$nD->L]); }
}


else if(_0s::$router=='GET accRep/cxc'){
	$nD=new gfiAccAux();
	$kFa=false; $dtoday=date('Y-m-d');
	$lJoin='';
	$whTy='\'FV\',\'FC\',\'AN\'';
	$gb='C.licTradNum,C.cardName';
	$wh='AND (A.debBalDue+A.creBalDue)>0 AND A.lineType IN('.$whTy.')  ';
	if($_GET['cardType']=='C'){ $wh .=' AND C.cardType=\'C\' AND (A.debBalDue+A.creBalDue)>0 '; }
	else if($_GET['cardType']=='S'){$wh .=' AND C.cardType=\'S\' AND (A.creBalDue+A.creBalDue)>0 '; }
	$GS=array();
	if($_GET['date1']){ $wh .=' AND A.dueDate>=\''.$_GET['date1'].'\''; }
	if($_GET['date2']){ $wh .=' AND A.dueDate<=\''.$_GET['date2'].'\''; }
	if($_GET['cardId']){ $wh .=' AND A.cardId=\''.$_GET['cardId'].'\''; }
	$Dx=$nD->setList($_GET['gby'],array('doc'=>'A.docDate,A.dueDate'));
	$gb .=$Dx['gb'];
	$wh .=$Dx['wh'];
	//$lJoin .= $Dx['lJoin'];
	//SUM(IF(AC.sysType=\'B\',A.debBalDue-A.creBalDue,0)) balDue,
	//SUM(IF(AC.sysType=\'A\',A.debBal-A.creBal,0)) antBal
	$nD->quL('SELECT '.$gb.',
	SUM(A.debBal-A.creBal) docTotal,SUM(A.debBalDue-A.creBalDue) balDue
	FROM gfi_dac1 A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	'.$lJoin.'
	WHERE A.canceled=\'N\' '.$wh.' GROUP BY '.$gb.' ORDER BY C.cardName ASC',array());
	if(_err::$err){ echo _err::$errText; }
	else{ echo _js::enc(['L'=>$nD->L]); }
}
else if(_0s::$router=='GET accRep/estadcuenta'){
	if(_js::iseErr($_GET['cardId'],'Se debe el tercero','numeric>0')){}
	if(_err::$err){ die(_err::$errText); }
	_ADMS::mApps('gfi/GfiCart');
	$M=new GfiCart();
	$M->balIni(); if(_err::$err){ die(_err::$errText); }
	$M->movDocs(); if(_err::$err){ die(_err::$errText); }
	echo _js::enc2($M->M);
}
else if(_0s::$router=='GET accRep/ing'){
	if(_js::iseErr($_GET['date1'],'Se debe definir fecha de inicio')){}
	else if(_js::iseErr($_GET['date2'],'Se debe definir fecha de corte')){}
	if(_err::$err){ die(_err::$errText); }
	_ADMS::lib('sql/filter');
	$date1=$_GET['date1']; $date2=$_GET['date2'];
	$viewType=$_GET['viewType'];
	if($_GET['cardId']>0){ $_GET['A.cardId']=$_GET['cardId']; }
	unset($_GET['date1'],$_GET['date2'],$_GET['cardId'],$_GET['viewType']);
	$wh='AND A.docDate BETWEEN \''.$date1.'\' AND \''.$date2.'\' '.a_sql_filter($_GET);
	$M=array('_view'=>$viewType,'L'=>[]);
	$fie=$lf=''; $gb='';
	if($viewType=='C'){
		$gb='A.payType';
		$fie=$gb.',SUM(A.bal) bal';
	}
	else if($viewType=='DAY'){
		$gb='A.payType,A.docDate';
		$fie=$gb.',SUM(A.bal) bal';
		$lf='';
	}
	else if($viewType=='CC'){
		$gb='A.payType,C.cardName';
		$fie=$gb.',SUM(A.bal) bal';
		$lf='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	else if($viewType=='CDAY'){
		$gb='C.cardName,A.docDate,A.payType';
		$fie=$gb.',SUM(A.bal) bal';
		$lf='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	else if($viewType=='LC'){
		$gb='A.payType,B.lineClass';
		$fie=$gb.',SUM(B.creBal) bal';
		$lf='JOIN gvt_rcv1 B ON (B.docEntry=A.docEntry)';
	}
	else if($viewType=='DOC'){
		$gb='';
		$fie='A.docEntry,A.serieId,A.docNum,A.docDate,C.cardName,A.payType,A.payCateg,B.lineClass,B.creBal bal';
		$lf='JOIN par_ocrd C ON (C.cardId=A.cardId) 
		JOIN gvt_rcv1 B ON (B.docEntry=A.docEntry)';
	}
	if($gb!=''){ $gb='GROUP BY '.$gb; }
	$q=a_sql::query('SELECT '.$fie.'
	FROM gvt_orcv A '.$lf.'
	WHERE A.canceled=\'N\' '.$wh.' '.$gb,array(1=>'Error obteniendo ingresos'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			$M['L'][]=$L;
		}
	}
	if(_err::$err){ die(_err::$errText); }
	else{ echo _js::enc2($M); }
}
else if(_0s::$router=='GET accRep/egr'){
	if(_js::iseErr($_GET['date1'],'Se debe definir fecha de inicio')){}
	else if(_js::iseErr($_GET['date2'],'Se debe definir fecha de corte')){}
	if(_err::$err){ die(_err::$errText); }
	_ADMS::lib('sql/filter');
	$date1=$_GET['date1']; $date2=$_GET['date2'];
	$viewType=$_GET['viewType'];
	if($_GET['cardId']>0){ $_GET['A.cardId']=$_GET['cardId']; }
	unset($_GET['date1'],$_GET['date2'],$_GET['cardId'],$_GET['viewType']);
	$wh='AND A.docDate BETWEEN \''.$date1.'\' AND \''.$date2.'\' '.a_sql_filter($_GET);
	$M=array('_view'=>$viewType,'L'=>[]);
	$fie=$lf=''; $gb='';
	if($viewType=='C'){
		$gb='A.payType';
		$fie=$gb.',SUM(A.bal) bal';
	}
	else if($viewType=='DAY'){
		$gb='A.payType,A.docDate';
		$fie=$gb.',SUM(A.bal) bal';
		$lf='';
	}
	else if($viewType=='CC'){
		$gb='A.payType,C.cardName';
		$fie=$gb.',SUM(A.bal) bal';
		$lf='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	else if($viewType=='CDAY'){
		$gb='C.cardName,A.docDate,A.payType';
		$fie=$gb.',SUM(A.bal) bal';
		$lf='LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	}
	else if($viewType=='LC'){
		$gb='A.payType,B.lineClass';
		$fie=$gb.',SUM(B.debBal) bal';
		$lf='JOIN gvt_rce1 B ON (B.docEntry=A.docEntry)';
	}
	else if($viewType=='DOC'){
		$gb='';
		$fie='A.docEntry,A.serieId,A.docNum,A.docDate,C.cardName,A.payType,A.payCateg,B.lineClass,B.debBal bal';
		$lf='JOIN par_ocrd C ON (C.cardId=A.cardId) JOIN gvt_rce1 B ON (B.docEntry=A.docEntry)';
	}
	if($gb!=''){ $gb='GROUP BY '.$gb; }
	$q=a_sql::query('SELECT '.$fie.'
	FROM gvt_orce A '.$lf.'
	WHERE A.canceled=\'N\' '.$wh.' '.$gb,array(1=>'Error obteniendo egresos'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			$M['L'][]=$L;
		}
	}
	if(_err::$err){ die(_err::$errText); }
	else{ echo _js::enc2($M); }
}
?>
