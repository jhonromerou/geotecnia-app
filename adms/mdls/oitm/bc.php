<?php
function getBarCode($barCode='',$P=array()){
	$itemCode=substr($barCode,0,-2);
	$itemSize=substr($barCode,-2);
	$fie='\'Y\' itemSz,I.itemCode,Isz.itemSize,B.itemId,B.itemSzId,B.barCode,I.itemName';
	$q=a_sql::fetch('SELECT '.$fie.' FROM 
itm_oitm I
LEFT JOIN itm_bar1 B ON (B.itemId=I.itemId) 
LEFT JOIN itm_grs1 Isz ON (Isz.itemSzId=B.itemSzId) 
WHERE B.barCode=\''.$barCode.'\' OR (I.itemCode=\''.$itemCode.'\' AND Isz.itemSize=\''.$itemSize.'\') LIMIT 1',array(1=>'Error obteniendo el código.',2=>'El código no existe o no está relacionado a ningun producto.'));
	return $q;
}

if(_0s::$router=='GET bc'){
	if($js=_js::ise($___D['itemId'],'Se debe definir el Id del producto')){ die($js); }
	else if($js=_js::ise($___D['grTypeId'],'Se debe definir el grupo de códigos.')){ die($js); }
	$grs='I.itemId, I.itemCode,I.itemName, g1.itemSize, g1.itemSzId, B.barCode';
	$q=a_sql::query('SELECT '.$grs.' FROM itm_oitm I 
	JOIN itm_grs2 g2 ON (g2.grsId=I.grsId)
	JOIN itm_grs1 g1 ON (g1.itemSzId=g2.itemSzId)
	LEFT JOIN itm_bar1 B ON (B.itemId=I.itemId AND B.itemSzId=g1.itemSzId AND B.grTypeId=\''.$___D['grTypeId'].'\') WHERE I.itemId=\''.$___D['itemId'].'\' GROUP BY '.$grs.' LIMIT 80',array(1=>'Error obteniendo información de artículo.',2=>'No se encontró el artículo.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{$Mx=array(); $n=0;
		while($L=$q->fetch_assoc()){
			if($n==0){ $Mx=array('itemCode'=>$L['itemCode'],'itemName'=>$L['itemName'],'L'=>array()); $n=1; }
			$Mx['L'][]=$L;
		}
		$js=_js::enc($Mx,'NO_PAGER');
	}
	echo $js;
}
else if(_0s::$router=='PUT bc'){
	if($js=_js::ise($___D['itemId'],'Se debe definir el Id del producto')){ die($js); }
	else if($js=_js::ise($___D['grTypeId'],'Se debe definir el grupo de códigos.')){ die($js); }
	$errs=0;
	foreach($___D['TA'] as $itemSzId => $barCode){
		$D2=array('itemId'=>$___D['itemId'],'itemSzId'=>$itemSzId,'grTypeId'=>$___D['grTypeId'],'barCode'=>$barCode);
		$ins=a_sql::insert($D2,array('table'=>'itm_bar1','wh_change'=>'WHERE itemId=\''.$___D['itemId'].'\' AND grTypeId=\''.$___D['grTypeId'].'\' AND itemSzId=\''.$itemSzId.'\' LIMIT 1'));
		if($ins['err']){ $errs++; }
	}
	$js=($errs>0)?_js::e(3,'Uno de los códigos no se guardó correctamente'):_js::r('Códigos guardados correctamente.');
	echo $js;
}

else if(_0s::$router=='GET bc/one'){
	if($js=_js::ise($_GET['barCode'],'Se debe definir el código de barras.')){ die($js); }
	_ADMS::_lb('itm');
	$q=getBarCode($_GET['barCode']);
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $js = _js::enc2($q); }
	echo $js;
}

else if(_0s::$router=='POST bc/labels'){
	$D = $_POST;
	$Mx=array(); $T=array();
	if(!is_array($D['LN'])){ die(_js::e(3,'No se recibió ningun dato.')); }
	$ln=1;
	foreach($D['LN'] as $n => $D2){
		$rows=0;
		$itemId=$D2['itemId']; $grId=$D2['grTypeId'];
		unset($D2['itemId'],$D2['grTypeId']);
		$wh = '(I.itemId=\''.$itemId.'\' AND B.grTypeId=\''.$grId.'\' AND B.itemSzId IN(';
		foreach($D2 as $tszId => $qua){
			if($qua>0){ $T[$tszId] = $qua; $rows++;
				$wh .= '\''.$tszId.'\',';
			}
		}
		if($rows==0){ die(_err::err('Linea '.$ln.': no tiene cantidades definidas',3)); }
		$ln++;
		$wh = substr($wh,0,-1).'))';
		$ql=a_sql::query('SELECT I.itemCode, G1.itemSize, B.barCode, I.itemName, B.itemSzId 
		FROM itm_oitm I 
		JOIN itm_bar1 B ON (B.itemId=I.itemId) 
		JOIN itm_grs1 G1 ON (G1.itemSzId=B.itemSzId) 
		WHERE '.$wh.' LIMIT 100',[1=>'Error obteniendo codigos',2=>'No se encontraron resultados']);
		if(a_sql::$err){ die(a_sql::$errNoText); }
		else{
			while($L=$ql->fetch_assoc()){
				$its=$L['itemSzId']; unset($L['itemSzId']);
				$Mx[] = array('itemCode'=>$L['itemCode'],'itemName'=>$L['itemName'],'itemSize'=>$L['itemSize'],'barCode'=>$L['barCode'],'quantity'=>$T[$its]*1);
			}
		}
	}
	$js=_js::enc2($Mx,'just'); unset($Mx);
	echo $js;
}

else if(_0s::$router=='POST bc/stickFromDoc'){
	_Soc::loadLib('BarC');
	echo Barc::stickFromDoc($D);
}
?>