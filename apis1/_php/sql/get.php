<?php
function a_sql_get($q='',$P=array()){
	$q = a_sql::query($q);
	$f = $P['f'];
	if(a_sql::$errNo == 1){ return '\'error SQL SQL::get();\''; }
	else if(a_sql::$errNo == 2){ return '\'0 rows on SQL::get()\''; }
	while($L=$q->fetch_assoc()){
		if($n==0){ $fType = (is_nan($L[$f])) ? 'text' : 'number'; }
		$n=1;
		$v = ($fType == 'text') ? '\''.$L[$f].'\'' : ''.$L[$f].'';
		switch($P['g']){//,
			default : $t .= $v.','; break; 
		}
	}
	return substr($t,0,-1);
}
?>