<?php
if(_0s::$router=='GET rep/assg'){ a_ses::hashKey('sysd.supersu');
	$q=a_sql::query('SELECT R.id,R.type,R.dpto,R.m1,R.m2,R.m3,R.text, R1.id 
	FROM '._0s::$Tb['a0_0vs_oqry'].' R 
	LEFT JOIN '._0s::$Tb['a0_0vs_qry1'].' R1 ON (R1.reportId=R.reportId AND R1.userId=\''.$___D['userId'].'\')
	WHERE 1 ',array(1=>'Error obteniendo reportes de sistema.',2=>'No se han encontrado reportes.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){
			$L['checked']=($L['id'])?'Y':'N';
			$Mx['L'][] = $L;
		}
		$js =_js::enc2($Mx); unset($Mx);
	}
	echo $js;
}
?>