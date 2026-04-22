<?php
if(_0s::$router =='GET card'){
	$M=a_sql::fetch('SELECT * FROM par_ocrd WHERE cardId=\''.$___D['cardId'].'\' LIMIT 1',array(1=>'Error obteniendo información del contacto: ',2=>'El contacto no existe ID:'.$___D['cardId']));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{
		$M['dL']=a_sql::queryL('SELECT * FROM cnt_addr WHERE objType=\'card\' AND objRef=\''.$___D['cardId'].'\' LIMIT 3',array('ky'=>'addrType','L'=>'N','enc'=>'N'));
		$M['cprL']=a_sql::queryL('SELECT name,position,tel1,cellular,tel2,email FROM par_ocpr WHERE cardId=\''.$___D['cardId'].'\' LIMIT 4',array('L'=>'N','enc'=>'N'));
		$js=_js::enc2($M);
	}
	echo $js;
}

?>