<?php
JRoute::get('oitm/cost',function(){
	_ADMS::lib('sql/filter');
	$wh=a_sql_filter($_GET);
	return a_sql::fetchL('SELECT
	I.itemId,I.itemCode,I.itemName,I.grsId,grs2.itemSzId,I.udm,I.sellPrice,I.buyPrice,I.invPrice,
	PC.cost,PC.costMP,PC.costMO,PC.costSV,PC.costMA,PC.cif,PC.dateUpd
	FROM itm_oitm I
	JOIN itm_grs2 grs2 ON (grs2.grsId=I.grsId)
	LEFT JOIN itm_oipc PC ON (PC.isModel=\'Y\' AND PC.itemId=I.itemId AND PC.itemSzId=grs2.itemSzId)
	WHERE I.prdItem=\'Y\' '.$wh.' ORDER BY I.itemCode ASC '.a_sql::nextLimit(),
	['k'=>'L',1=>'Error obteniendo articulos',2=>'No se encontraron resultados.'],true);
});
if(_0s::$router=='GET cost/item'){
	$q=a_sql::query('SELECT I.itemCode,I.itemName,grs2.itemSzId,I.udm,I.sellPrice,MP.lineNum,WF.wfaId,WF.wfaName,PC.isModel,PC.cost,PC.costMP,PC.costMO,PC.costSV,PC.costMA,PC.cif
FROM itm_oitm I
JOIN itm_grs2 grs2 ON (grs2.grsId=I.grsId)
LEFT JOIN itm_oipc PC ON (PC.itemId=I.itemId AND PC.itemSzId=grs2.itemSzId)
LEFT JOIN wma_owfa WF ON (WF.wfaId=PC.wfaId)
LEFT JOIN wma_mpg1 MP ON (MP.itemId=I.itemId AND MP.wfaId=PC.wfaId)
WHERE I.itemId=\''.$_GET['itemId'].'\' AND grs2.itemSzId=\''.$_GET['itemSzId'].'\'
 '.$wh.' ORDER BY MP.lineNum ASC ',array(1=>'Error obteniendo maestro de costos del producto: '));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{
		$M=array('L'=>array()); $M['L'][0]=array();
		while($L=$q->fetch_assoc()){
			if($L['isModel']=='Y'){ $L['lineNum']=0; $L['wfaName']='General'; $M['L'][0]=$L; }
			if($L['wfaId']>0){ $M['L'][]=$L; }
		}
		_ADMS::libC('wma','mrp');
		$MR=wmaMrp::get(array('itemId'=>$_GET['itemId'],'itemSzId'=>$_GET['itemSzId'],'reqQty'=>1),array('ivt'=>'N','type'=>'all','gby'=>'T1.lineNum','gby1'=>'wfaId'));
		if($MR){ $js=$MR;}
		else{
			$M['LM']=wmaMrp::$MR;
			$js=_js::enc2($M);
		}
	}
	echo $js;
}

else if(_0s::$router=='GET cost/mpDiff'){
//revisar cotos matriz vs mp
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($_GET);
	$gb=$gb2='I.itemId,I.itemCode,I.itemName';
	$gb .=',COUNT(I.itemId) items,SUM((I2.invPrice-T.buyPrice)*T.quantity) costDiff';
	$gb2 .='';
	$q=a_sql::query('SELECT '.$gb.'
	FROM itm_itt1 T
	JOIN itm_oitm I ON (I.itemId=T.itemId)
	JOIN itm_oitm I2 ON (I2.itemId=T.citemId AND I2.invPrice!=T.buyPrice)
	WHERE 1 '.$wh.' GROUP BY '.$gb2.' '.a_sql::nextLimit(),array(1=>'Error obteniendo listado de log de modificaciones.',2=>'No se encontraron modificaciones pendientes.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){ $Mx['L'][] = $L; }
		$js =_js::enc($Mx); unset($Mx);
	}
	echo $js;
}
else if(_0s::$router=='PUT cost/mpDiff'){ 
	$errs=0;
	if($js=_js::ise($___D['itemId'],'No se ha definido el Id del articulo a actualizar.','numeric>0')){ die($js); }

	a_sql::transaction(); $cmt=false;
	$uq=a_sql::query('UPDATE itm_itt1 B
	SET B.buyPrice=(SELECT invPrice FROM itm_oitm WHERE itemId=B.citemId LIMIT 1), B.lineTotal=B.buyPrice*B.quantity
	WHERE B.itemId=\''.$___D['itemId'].'\' LIMIT 5000',array(1=>'Error actualizando costos diferentes en la ficha de costos.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; $errs=1; }
	else{
		_ADMS::mapps('wma/Cost'); _ADMS::_lb('itm');
		wmaCost::defineModel($___D);
		if(_err::$err){ $js=_err::$errText; $errs=1;}
		else{
			wmaCost::defineModelWfa($___D);
			if(_err::$err){ $js=_err::$errText; $errs=1; }
			else{
				wmaCost::sumTo(array('itemId'=>$___D['itemId']));
				if(_err::$err){ $js=_err::$errText; $errs=1; }
			}
		}
	}
	if($errs==0){ $cmt=true; $js=_js::r('Ficha de producto actualizada para subproductos y fases'); }
	a_sql::transaction($cmt);
	echo $js;
}


else if(_0s::$router=='GET cost/log2v1'){
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($___D);
	$q=a_sql::query('SELECT A.id,A.itemId,A.updateType,A.itemSzId,A.userId,A.dateC,A.isExec,A.userExec,A.dateExec,I.itemCode, I.itemName FROM itm_log2 A
	LEFT JOIN itm_oitm I ON (I.itemId=A.itemId)
	WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo listado de log de modificaciones.',2=>'No se encontraron modificaciones pendientes.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){ $Mx['L'][] = $L; }
		$js =_js::enc($Mx); unset($Mx);
	}
	echo $js;
}
else if(_0s::$router=='PUT cost/log2'){
	//a_sql::query('TRUNCATE table itm_log2'); die();
	a_sql::query('TRUNCATE table itm_oipc'); die();
	if($js=_js::ise($___D['id'],'No se ha definido el ID del log de actualizaciones.','numeric>0')){ die($js); }
	$qt=a_sql::fetch('SELECT A.id,A.isExec,A.updateType,A.itemId,A.itemSzId,A.vari1,I.grsId
	FROM itm_log2 A
	JOIN itm_oitm I ON (I.itemId=A.itemId)
	WHERE id=\''.$___D['id'].'\' LIMIT 1',array(1=>'Error obteniendo el log de modificación.',2=>'No se encontró el log de modificación #'.$D['id'].'.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else if($qt['isExec']=='Y'){ die(_js::e(3,'La actualización ya fue realizada.')); }
	else{
		_ADMS::mapps('wma/Cost'); _ADMS::_lb('itm');
		if($qt['updateType']=='model' || $qt['updateType']=='modelVari'){ $js=wmaCost::defineModelWfa($qt); }
		else if($qt['updateType']=='mpUpdatePrice'){ $js=wmaCost::defineFromMP_updatePrice($qt); }
		else{ $js=_js::e(3,'updateType <'.$qt['updateType'].'> not allowed'); }
	}
	echo $js;
}

else if(_0s::$router=='GET cost/mpDiff--'){ //actualizar todos los articulos
	$errs=0;
	_ADMS::mapps('wma/Cost'); _ADMS::_lb('itm');
	//a_sql::transaction(); $cmt=false;
	$page=0; $r=300;
	$n1=$r*$page;
	$q=a_sql::query('SELECT itemId FROM itm_oipc WHERE isModel=\'Y\' and itemSzId=0 LIMIT '.$n1.','.$r,array(1=>'Error actualizando costos diferentes en la ficha de costos.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; $errs=1; }
	else{
		while($L=$q->fetch_assoc()){
			wmaCost::defineModel($L);
			if(_err::$err){ $js=_err::$errText; $errs=1;}
			else{
				wmaCost::defineModelWfa($L);
				if(_err::$err){ $js=_err::$errText; $errs=1; }
				else{
					wmaCost::sumTo($L);
					if(_err::$err){ $js=_err::$errText; $errs=1; }
				}
			}
		}
	}
	if($errs==0){ $cmt=true; $js=_js::r('Fichas de producto actualizada para subproductos y fases'); }
	//a_sql::transaction($cmt);
	echo $js;
}
?>
