<?php
class JLog{
	static public function post($D=array(),$r=false){
		$datec=date('Y-m-d H:i:s');
		$tbk=$D['tbk'];
		if($r=='PRINT'){ echo $tbk; print_r($D); }
		$docEntry=$D['docEntry']; $lineMemo=$D['lineMemo'];
		$serieType=$D['serieType'];
		unset($D['tbk'],$D['docEntry'],$D['lineMemo'],$D['serieType']);
		foreach($D as $f =>$v){
			if($f=='dateC'){ $v=$datec; }
			$Di=array('serieType'=>$serieType,'docEntry'=>$docEntry,'fiek'=>$f,'fiev'=>$v,'lineMemo'=>$lineMemo,'userId'=>a_ses::$userId,'dateC'=>$datec);
			$i1=a_sql::qInsert($Di,array('tbk'=>$tbk,'qDo'=>'insert'));
			if($r){ print_r($i1); }
		}
	}
	static public function get($P=array()){
		return a_sql::queryL('SELECT dateC,userId,fiek,fiev,lineMemo FROM '.$P['tbk'].' WHERE  serieType=\''.$P['serieType'].'\' AND docEntry=\''.$P['docEntry'].'\' ORDER BY dateC DESC LIMIT 100');
	}

	// relations doc gvtSor -> gvtSin,gvtSdn
	static public function rel1($D=array(),$req=false){ //trans
		//ott,otr -> gvtSor - 21
		//tt,tr,serieId,docNum -> gvtSin,304, 12, 201
		$D['dateC']=date('Y-m-d H:i:s');
		$D['userId']=a_ses::$userId;
		a_sql::qInsert($D,array('tbk'=>'doc_rel1'));
		if($req=='Y' && a_sql::$err){ _err:err(a_sql::$errNoText); }
	}
	static public function rel1_get($P=array()){
		return a_sql::queryL('SELECT * FROM doc_rel1 WHERE (ott=\''.$P['ott'].'\' AND otr=\''.$P['otr'].'\') OR (tt=\''.$P['ott'].'\' AND tr=\''.$P['otr'].'\') LIMIT 100');
	}
}
?>
