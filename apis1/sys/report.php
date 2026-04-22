<?php
if(_0s::$router=='GET byForm'){
$mx = array();
$query='SELECT A.reportId,A.repVers,A.type,A.dpt,A.m1,A.m2,A.m3,A.text,A.qu FROM a0_vs3_oqry A INNER JOIN a0_vs3_qry1  B ON (B.reportId = A.reportId) WHERE B.userId=\''.a_ses::$userId.'\' ';
$q = a_sql::query($query,array(1=>'Error obteniendo reportes: ',2=>'No tiene reportes asignados para su usuario.'));
if(a_sql::$err){ die(a_sql::$errNoText); }
else{ 
	while($m = $q->fetch_assoc()){
	$dpt = $m['dpt']; $m1 = $m['m1']; $m2 = $m['m2']; $m3 = $m['m3'];
	$text = $m['text']; $id = $m['reportId'];
	$li = array('text'=>$m['text'],'repVers'=>$m['repVers'],'reportId'=>$m['reportId'],'type'=>$m['type']);
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
echo _js::enc2($mx);
}
}
else if(_0s::$router=='GET byForm.form'){
	$q = a_sql::fetch('SELECT type,descrip,qu,qwh FROM a0_vs3_oqry WHERE reportId=\''.$_GET['reportId'].'\' LIMIT 1 ');
	$q['qwh']=json_decode($q['qwh'],1);;
	echo _js::enc2($q);
}
else if(_0s::$router=='GET byForm.query'){
	$qu = a_sql::fetch('SELECT qu,quEnd,qwh,tds,trs,jsConf FROM a0_vs3_oqry WHERE reportId=\''.$_GET['reportId'].'\' LIMIT 1 ',array(1=>'Error consultando reporte: ',2=>'El reporte no existe'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$F = json_decode($qu['qwh'],true);
	$TDS=(!_js::ise($qu['tds']))?json_decode($qu['tds'],true):false;
	$TRS=(!_js::ise($qu['trs']))?json_decode($qu['trs'],true):false;
	$errF = 0;
	if(!is_array($F)){ $errF=1;}
	else foreach($F as $n => $Fj){
		$kv = $_GET['FIE'][$n][$Fj['name']];
		if($Fj['req'] == 'Y' && $kv == ''){ $errF++;
			$js = _js::e(3,$Fj['text'].', debe estar definido. ('.$kv.')');
			break;
		}
	}
	if($errF == 0){
		$q = $qu['qu'];
		_ADMS::_lb('sql/filter');
		preg_match_all('/TBK\{([a-z0-9\_\.]*)\}\s/is',$q,$tbk);
		if(is_array($tbk[1])){
			foreach($tbk[1] as $n => $k){ $q = preg_replace('/TBK\{'.$k.'\}/',_0s::$Tb[$k],$q); }
		}
		$wh = a_sql_filtByT($_GET);
		$qFull =$q.' '.$wh.'  '.$qu['quEnd'];
		$quer = a_sql::query($qFull);
		$fie = ''; $n = 0;
		$To = array();
		if(a_sql::$errNo == 1){ $js = _js::e(1,$quer['error_sql']); }
		else if(a_sql::$errNo == 2){ $js = _js::e(2,'No se encontraron resultados. (rid:'.$_GET['reportId'].')'); }
		else{
			$M=array('FIE'=>array(),'L'=>array(),'jsConf'=>json_decode($qu['jsConf'],1));
			$FIEn=array(); $TOTALs=array();
			while($L = $quer->fetch_assoc()){
				if($n==0){ $tdn=1;//heads
					foreach($L as $k => $v){
						$M['FIE'][$k]=$k; $FIEn[$tdn]=$k; $tdn++; //+1 
						if(is_array($TDS) && is_array($TDS['col'.$tdn])){ $TDk=$TDS['col'.$tdn];
							$M['FIE'][$TDk['text']]=$TDk['text'];
							$FIEn[$tdn]=$TDk['text'];
						}
					}
				}
				$n=1;
				$isA=is_array($TDS); $isB=is_array($TRS);
				if($isA || $isB){ $tdn=2;
					foreach($L as $k => $v){
						if($isA && is_array($TDS['col'.$tdn])){ $TDk=$TDS['col'.$tdn];
							$f1=$FIEn[$TDk['fie1']];
							$f2=$FIEn[$TDk['fie2']];
							$f1v=(is_numeric($L[$f1]))?$L[$f1]:1;
							$f2v=(is_numeric($L[$f2]))?$L[$f2]:1;
							switch($TDk['action']){
								case '*': $L[$TDk['text']]= $f1v*$f2v; break;
							}
						}
						if($isB && $TRS['col'.$tdn]){ $TRk=$TRS['col'.$tdn];
							$fie=($FIEn[$tdn])?$FIEn[$tdn]:'';
							if(is_array($TOTALS) && !array_key_exists($fie,$TOTALS)){ $TOTALs[$fie]=0; }
							switch($TRk['action']){
								case '+': $TOTALs[$fie] += $L[$fie]; break;
								default : if($TRk['text']){ $TOTALs[$fie]=$TRk['text']; }
								break;
							}
						}
						$tdn++;
					}
				}
				$M['L'][]=$L;
			}
			if(count($TOTALs)>0){
				$M['L'][]=$TOTALs;
			}
			$js = _js::enc($M,'NO_PAGER'); unset($M);
	}
	}
	echo $js;
}
else if(_0s::$router=='GET DT.readStr'){
	$qu = a_sql::fetch('SELECT qu,qwh FROM a0_vs3_oqry WHERE reportId=\''.$_GET['reportId'].'\' LIMIT 1',array(1=>'Error obteniendo información on readStr.',2=>'No se encontró el reportId '.$___D['reportId']));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$qu['qwh']=json_decode($qu['qwh'],1);
	echo _js::enc2($qu);
}
?>