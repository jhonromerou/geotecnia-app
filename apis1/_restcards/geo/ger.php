<?php
if($_GET['date1']){
$date1=$_GET['date1'];
$date2=$_GET['date2']; unset($_GET['date1'],$_GET['date2']);
$diff=(strtotime($date2)-strtotime($date1))/86400;
}
if(_0s::$router=='GET ger/xfac'){ a_ses::hashKey('geoGer');
	$gb=($diff>29)?'SUBSTR(B.lineDate,1,7)':'B.lineDate';
	echo a_sql::queryL('SELECT '.$gb.' lineDate,SUM(B.priceLine) priceLine
FROM xdp_orit A
JOIN xdp_rit1 B ON (B.docEntry=A.docEntry)
WHERE B.lineStatus=\'O\' AND B.lineDate BETWEEN \''.$date1.'\' AND \''.$date2.'\' 
GROUP BY '.$gb);
}
else if(_0s::$router=='GET ger/actu'){ a_ses::hashKey('geoGer');
	$gb=($diff>29)?'SUBSTR(A.dateUpd,1,7)':'A.dateUpd';
	echo a_sql::queryL('SELECT '.$gb.' lineDate,SUM(B.priceLine) priceLine
FROM xdp_orit A
JOIN xdp_rit1 B ON (B.docEntry=A.docEntry)
WHERE B.lineStatus=\'O\' AND A.dateUpd BETWEEN \''.$date1.'\' AND \''.$date2.'\' 
GROUP BY '.$gb.'');
}
else if(_0s::$router=='GET ger/factu'){ a_ses::hashKey('geoGer');
	$gb=($diff>29)?'SUBSTR(A.docDate,1,7)':'A.docDate';
	echo a_sql::queryL('SELECT '.$gb.' docDate,SUM(A.baseAmnt) baseAmnt, SUM(A.vatSum) vatSum, SUM(A.rteSum) rteSum, SUM(A.docTotal) docTotal
FROM gvt_oinv A
WHERE A.canceled=\'N\' AND A.docDate BETWEEN \''.$date1.'\' AND \''.$date2.'\' 
GROUP BY '.$gb);
}
else if(_0s::$router=='GET ger/cliente'){ a_ses::hashKey('geoGer');
	_ADMS::_lb('sql/filter');
	echo a_sql::queryL('SELECT A.cardName, R.proyect, SUM(A.docTotal) docTotal, SUM(A.docTotal-A.balDue) balPay, SUM(A.balDue) balDue
FROM gvt_oinv A
LEFT JOIN xdp_ocrp CP ON (CP.invId=A.docEntry)
LEFT JOIN xdp_orit R ON (R.docEntry=CP.remiId)
WHERE A.canceled=\'N\' AND A.docDate BETWEEN \''.$date1.'\' AND \''.$date2.'\' '.a_sql_filtByT($_GET).'
GROUP BY A.cardName,R.proyect');
}
else if(_0s::$router=='GET ger/pagado'){ a_ses::hashKey('geoGer');
	_ADMS::_lb('sql/filter');
	echo a_sql::queryL('SELECT A.docDate, SUM(A.docTotal) docTotal, SUM(A.docTotal-A.balDue) balPay, SUM(A.balDue) balDue
FROM gvt_oinv A
WHERE A.canceled=\'N\' '.a_sql_filtByT($_GET).'
GROUP BY A.docDate');
}
else if(_0s::$router=='GET ger/iva'){ a_ses::hashKey('geoGer');
	if($js=_js::ise($_GET['year'],'Se debe definir el año')){ die($js); }
	_ADMS::_lb('sql/filter');
	$se='SUBSTR(A.docDate,1,7)';
	echo a_sql::queryL('SELECT '.$se.' periodo,SUM(A.baseAmnt) baseAmnt, SUM(A.vatSum) vatSum,SUM(A.rteSum) rteSum
FROM gvt_oinv A
WHERE A.canceled=\'N\' AND A.docDate BETWEEN \''.$_GET['year'].'-01-01\' AND \''.$_GET['year'].'-12-31\'
GROUP BY '.$se);
}

?>