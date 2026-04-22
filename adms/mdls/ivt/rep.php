<?php
$reqAcc=false; /* pedir cuentas */

if(_0s::$router=='GET rep/ivtBal'){
	$gb='I.itemId,I.itemCode,I.itemName,W.itemSzId';
	$fie='I.itemId,I.itemCode,I.itemName,W.itemSzId';
	if($_GET['gby']=='whsId'){
		$gb='W.whsId,'.$gb;
		$fie .=',W.whsId,SUM(W.onHand) onHand,SUM(W.avgPrice) avgPrice, SUM(W.stockValue) stockValue';
	}
	else{ $fie.=',SUM(W.onHand) onHand,SUM(W.stockValue) stockValue'; }
	unset($_GET['gby'],$_GET['reportLen']);
	$_GET['from']=$fie.' FROM ivt_oitw W
	JOIN itm_oitm I ON (I.itemId=W.itemId) ';
	$_GET['whA']='GROUP BY '.$gb;
	$q=a_sql::qPaging($_GET);
	if(_err::$err){echo _err::$errText; }
	else{
		$Lx=array();
		while($L=$q->fetch_assoc()){
			$Lx[]=$L;
		}
		echo _js::enc(array('L'=>$Lx));
	}
}
else if(_0s::$router=='GET rep/rota'){
	$date1=$_GET['date1'];
	$date2=$_GET['date2']; unset($_GET['date1'],$_GET['date2']);
	if(_js::iseErr($date1,'Se debe definir la fecha inicial')){ die(_err::$errText); }
	if(_js::iseErr($date2,'Se debe definir la fecha final')){ die(_err::$errText); }
	_ADMS::lib('_2d');
	$days=_2d::getDiff($date1,$date2)+1;
	$gb='I.itemId,I.itemCode,I.itemName,W1.itemSzId,W.onHand';
	$fie='I.itemId,I.itemCode,I.itemName,W1.itemSzId,W.onHand';
	if($_GET['gby']=='whsId'){
		$gb='W1.whsId,'.$gb;
	}
	$fie .=',W1.whsId,SUM(W1.sbPriceLine) sbPriceLine,SUM(W1.outQty-W1.inQty) qtyMov';
	unset($_GET['gby']);
	$_GET['from']=$fie.' 
	FROM ivt_wtr1 W1
	LEFT JOIN ivt_oitw W ON (W.itemId=W1.itemId AND W.itemSzId=W1.itemSzId AND W.whsId=W1.whsId)
	JOIN itm_oitm I ON (I.itemId=W1.itemId) ';
	$_GET['whA']='AND W1.docDate BETWEEN \''.$date1.'\' AND \''.$date2.'\' AND I.sellItem=\'Y\' AND W1.tt IN (\'gvtSin\',\'gvtSnc\') GROUP BY '.$gb;
	$q=a_sql::qPaging($_GET);
	if(_err::$err){echo _err::$errText; }
	else{
		$Mx=array('days'=>$days,'L'=>array());
		while($L=$q->fetch_assoc()){
			$Mx['L'][]=$L;
		}
		echo _js::enc($Mx);
	}
}
else if(_0s::$router=='GET rep/kardex'){
	$date1=$_GET['date1'];
	$date2=$_GET['date2']; unset($_GET['date1'],$_GET['date2']);
	if(_js::iseErr($date1,'Se debe definir la fecha inicial')){ die(_err::$errText); }
	if(_js::iseErr($date2,'Se debe definir la fecha final')){ die(_err::$errText); }
	_ADMS::lib('_2d');
	$days=_2d::getDiff($date1,$date2)+1;
	$gb='I.itemId,I.itemCode,I.itemName,W1.itemSzId';
	$fie='I.itemId,I.itemCode,I.itemName,W1.itemSzId';
	if($_GET['gby']=='whsId'){
		$gb='W1.whsId,'.$gb;
		$fie='W1.whsId,'.$fie;
	}
	$fie .=', SUM(IF(W1.docDate<\''.$date1.'\',(W1.inQty-W1.outQty),0)) iniQty, SUM(IF(W1.docDate<\''.$date1.'\',W1.price*(W1.inQty-W1.outQty),0)) iniCost,
	SUM(IF(W1.docDate>=\''.$date1.'\',W1.inQty,0)) inQty, SUM(IF(W1.docDate>=\''.$date1.'\' AND W1.inQty>0,W1.priceLine,0)) inCost,
	SUM(IF(W1.docDate>=\''.$date1.'\',W1.outQty,0)) outQty, SUM(IF(W1.docDate>=\''.$date1.'\' AND W1.outQty>0,W1.priceLine,0)) outCost
	
	';
	unset($_GET['gby']);
	a_sql::$limitDefBef=30;
	$_GET['from']=$fie.' FROM ivt_wtr1 W1
	LEFT JOIN ivt_oitw W ON (W.itemId=W1.itemId AND W.itemSzId=W1.itemSzId AND W.whsId=W1.whsId)
	JOIN itm_oitm I ON (I.itemId=W1.itemId) ';
	$_GET['whA']='AND W1.docDate <=\''.$date2.'\' GROUP BY '.$gb;
	$q=a_sql::qPaging($_GET);
	if(_err::$err){ echo _err::$errText; }
	else{
		$Mx=array('days'=>$days,'L'=>array());
		while($L=$q->fetch_assoc()){
			$Mx['L'][]=$L;
		}
		echo _js::enc($Mx);
	}
}

?>