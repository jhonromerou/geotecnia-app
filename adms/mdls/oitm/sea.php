<?php
$textSearch=$_GET['textSearch']; unset($_GET['textSearch']);
if(_0s::$router=='GET sea/item'){
	$wh='';
	_ADMS::_lb('sql/filter');
	$fie=($_GET['fie'])?','.$_GET['fie']:'';
	$leff='';
	if($_GET['getBC']){
		$fie=',BC.barCode';
		$leff='JOIN itm_bar1 BC ON (BC.itemId=I.itemId AND BC.grTypeId=\''.$_GET['getBC'].'\')';
	}
	unset($_GET['fie'],$_GET['getBC']);
	$gb='I.itemId,I.itemCode,I.itemName,I.grsId'.$fie;
	if($textSearch){
		$s=a_sql::toSe($textSearch);
		$wh .= 'AND (I.itemCode '.$s.' OR I.itemName '.$s.')';
	}
	$wh .=a_sql_filtByT($_GET);
	if($_GET['wh']){ $wh .=a_sql_filtByT($_GET['wh']); }
	$q=a_sql::query('SELECT '.$gb.' 
	FROM itm_oitm I '.$leff.'
	WHERE 1 '.$wh.' ORDER BY I.itemName LIMIT 20',array(1=>'Error obteniendo artículos',2=>'No se encontraron articulos.'));
		$M=array('L'=>array());
		if(a_sql::$err){ die(a_sql::$errNoText); }
		else{ $k=0; $A=array(); $n=0;
			while($L=$q->fetch_assoc()){
				$M['L'][]=$L;
			}
		}
		$js=_js::enc($M,'just');
	echo $js;
}
else if(_0s::$router=='GET sea/itemSz'){
	/* omitir y reemplazar con private/itm/sea/sub */
	_ADMS::_lb('sql/filter');
	$fie=($_GET['fie'])?','.$_GET['fie']:'';; unset($_GET['fie']);
	$gb='I.itemId,G1.itemSzId,G1.itemSize,I.itemCode,I.itemName,I.grsId'.$fie;
	$whTa='';
	if(preg_match('/\s?\T\:\s?\s?(.*)$/',$textSearch,$S)){
		$whTa=' AND G1.itemSize =\''.$S[1].'\' ';
		$textSearch=preg_replace('/\s?\T\:\s?\s?(.*)$/','',$textSearch);
	}
	$s=a_sql::toSe($textSearch);
	$wh ='(I.itemCode '.$s.' OR I.itemName '.$s.$whTa.' )';
	if($_GET['wh']){ $wh .=a_sql_filtByT($_GET['wh']); }
	else{ $wh .=a_sql_filtByT($_GET); }
	$q=a_sql::query('SELECT '.$gb.' FROM itm_oitm I 
LEFT JOIN itm_grs2 G2 ON (G2.grsId=I.grsId) 
LEFT JOIN itm_grs1 G1 ON (G1.itemSzId=G2.itemSzId) 
WHERE '.$wh.' ORDER BY I.itemName,G1.itemSize LIMIT 50',array(1=>'Error obteniendo artículos',2=>'No se encontraron articulos.'));
		$M=array('L'=>array());
		if(a_sql::$err){ die(a_sql::$errNoText); }
		else{ $k=0; $A=array(); $n=0;
			while($L=$q->fetch_assoc()){
				$L['lineText']=$L['itemName'].' S: '.$L['itemSize'];
				$M['L'][]=$L;
			}
		}
		$js=_js::enc($M,'just');
	echo $js;
}
else if(_0s::$router=='GET sea/barcode'){
	if($js=_js::ise($_GET['barCode'],'Se debe definir el código')){ die($js); }
	$fie=($_GET['fie'])?','.$_GET['fie']:'';; unset($_GET['fie']);
	if($___D['wh']){ _ADMS::_lb('sql/filter');
		$wh =a_sql_filtByT($___D['wh']);
	}
	$sep=explode('-',$_GET['barCode']);
	$gb='I.itemId,I.itemCode,I.itemName,I.grsId,G1.itemSzId,G1.itemSize'.$fie;
	$gb .=($___D['_fie'])?','.$___D['_fie']:'';
	
	$Mx=a_sql::fetch('SELECT '.$gb.',B.barCode
	FROM itm_oitm I
	LEFT JOIN itm_bar1 B ON (B.itemId=I.itemId) 
	JOIN itm_grs1 G1 ON (G1.itemSzId=B.itemSzId OR G1.itemSize=\''.$sep[1].'\')
	WHERE 1 '.$wh.'
	AND (
		B.barCode=\''.$sep[0].'\'
	OR (I.itemCode=\''.$sep[0].'\' AND G1.itemSize=\''.$sep[1].'\')
	)
	LIMIT 1',array(1=>'Error obteniendo código de barras.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else if(a_sql::$errNo==-1){
		if($Mx['barCode']==null){ $Mx['barCode']=$_GET['barCode']; }
		$js=_js::enc2($Mx);
	}
	else if(a_sql::$errNo==2){
		$qTa=a_sql::fetch('SELECT '.$gb.' 
		FROM itm_oitm I
		JOIN itm_grs2 G2 ON (G2.grsId=I.grsId)
		JOIN itm_grs1 G1 ON (G1.itemSzId=G2.itemSzId)
		WHERE 1 '.$wh.' AND I.itemCode=\''.$sep[0].'\' AND (G1.uniqSize=\'Y\')
		 LIMIT 1',[1=>'Error verificando código barras (2).',2=>'No se encontró el código de barras (2) '.$_GET['barCode'].'.']);
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{
			$qTa['barCode']=$_GET['barCode'];
			$js=_js::enc2($qTa);
		}
	}
	echo $js;
}
?>