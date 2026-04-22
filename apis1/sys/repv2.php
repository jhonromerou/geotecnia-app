<?php
_0s::uriReq('');
/* oct 2019 */
if(_0s::$router=='GET form'){
	$q = a_sql::fetch('SELECT type,descrip,jsF FROM a0_vs3_oqry WHERE reportId=\''.$___D['reportId'].'\' LIMIT 1 ');
	echo _js::enc2($q);
}
else if(_0s::$router=='POST query'){
	$qu = a_sql::fetch('SELECT qu,quEnd,jsF,jsH FROM a0_vs3_oqry WHERE reportId=\''.$___D['reportId'].'\' LIMIT 1 ',array(1=>'Error consultando reporte: ',2=>'El reporte no existe'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if($qu['jsH']!='' && !preg_match('/^(\[|\{)/',$qu['jsH'])){
		$q=a_sql::fetch('SELECT v FROM a0_par_crd2 WHERE idk=\''.$qu['jsH'].'\' LIMIT 1',array(1=>'Error consultando reporte: ',2=>'El reporte no existe'));
		if(a_sql::$err){ $qu['jsH']=''; }
		else{ $qu['jsH']=$q['v']; }
	}
	$M=array('jsH'=>$qu['jsH']);
	$M['L']=array();
	$jsF = json_decode($qu['jsF'],true);
	$errF = 0;
	$quFie='';
	if(!is_array($jsF)){ $errF=1;}
	$filters=0;
	foreach($jsF as $n => $Fj){
		if($___D['FIE'][$Fj['fn']]!=''){
			$filters++;
		}
		if($___D['cv'.$Fj['k']]=='Y'){
			$quFie .= $Fj['qk'].' \''.$Fj['k'].'\',';
		}
	}
	if($filters<2){ $errF++;
		$js = _js::e(3,'Debe definir al menos 2 filtros.');
	}
	if($errF == 0){
		$quFie=substr($quFie,0,-1);
		_ADMS::_lb('sql/filter');
		$wh = a_sql_filtByT($___D['FIE']);
		$qFull ='SELECT '.$quFie.' FROM '.$qu['qu'].' '.$wh.'  '.$qu['quEnd'];
		$quer = a_sql::query($qFull,array('Error obteniendo resultados',2=>'No se encontraron resultados. (rid:'.$___D['reportId']));
		$fie = ''; $n = 0;
		$To = array();
		if(a_sql::$err){ $js = a_sql::$errNoText; }
		else{
			while($L = $quer->fetch_assoc()){
				$M['L'][]=$L;
			}
			$js = _js::enc2($M); unset($M);
		}
	}
	echo $js;
}

else if(_0s::router('POST byForm')){
$mx = array();
$query = (a_ses::$user == 'supersus')
?'SELECT reportId,dpt,m1,m2,m3,text FROM '._0s::$Tb['A0_vs3_oqry'].' WHERE 1 '
:'SELECT A.reportId,A.type,A.dpt,A.m1,A.m2,A.m3,A.text,A.qu FROM '._0s::$Tb['A0_vs3_oqry'].' A INNER JOIN '._0s::$Tb['A0_vs3_qry1'].'  B ON (B.reportId = A.reportId) WHERE A.ocardId=\''.a_ses::$ocardId.'\' AND B.userId=\''.a_ses::$userId.'\' ';
$q = a_sql::query($query,array(1=>'Error obteniendo reportes: ',2=>'No tiene reportes asignados para su usuario.'));
if(a_sql::$err){ die(a_sql::$errNoText); }
else{ 
	while($m = $q->fetch_assoc()){
	$dpt = $m['dpt']; $m1 = $m['m1']; $m2 = $m['m2']; $m3 = $m['m3'];
	$text = $m['text']; $id = $m['reportId'];
	$li = array('text'=>$m['text'],'reportId'=>$m['reportId'],'type'=>$m['type']);
	if($li['type']=='data'){ $li['qu']=$m['qu']; }
	if($m3 != ''){
		$mx[$dpt]['text'] = $dpt;
		$mx[$dpt]['opts'][$m1]['text'] = $m1;
		$mx[$dpt]['opts'][$m1]['opts'][$m2]['text'] = $m2;
		$mx[$dpt]['opts'][$m1]['opts'][$m2]['opts'][$m3]['text'] = $m3;
		$mx[$dpt]['opts'][$m1]['opts'][$m2]['opts'][$m3]['opts'][$id] = $li;
	}
	else if($m2 != ''){
		$mx[$dpt]['text'] = $dpt;
		$mx[$dpt]['opts'][$m1]['text'] = $m1;
		$mx[$dpt]['opts'][$m1]['opts'][$m2]['text'] = $m2;
		$mx[$dpt]['opts'][$m1]['opts'][$m2]['opts'][$id] = $li;
	}
	else if($m1 != ''){
		$mx[$dpt]['text'] = $dpt;
		$mx[$dpt]['opts'][$m1]['text'] = $m1;
		$mx[$dpt]['opts'][$m1]['opts'][$id] = $li;
	}
	else{ $mx[$dpt]['opts'][$id] = $li; }
}
$mx=array('version'=>'3','L'=>$mx);
echo _js::enc($mx,'NO_PAGER');
}
}
else if(_0s::router('POST DT.readStr')){
	$qu = a_sql::fetch('SELECT qu,qwh FROM '._0s::$Tb['A0_vs3_oqry'].' WHERE reportId=\''.$___D['reportId'].'\' LIMIT 1',array(1=>'Error obteniendo información on readStr.',2=>'No se encontró el reportId '.$___D['reportId']));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$qu['qwh']=json_decode($qu['qwh'],1);
	echo _js::enc($qu,'just');
}
?>