<?php
class crd2{
static public function noIs($is='',$P=array()){ 
	switch($is){
		case 'cardType'; $fie='cardType'; break;
	}
	$q=a_sql::fetch('SELECT cardId,'.$fie.' FROM '._0s::$Tb['par_ocrd'].' WHERE cardId=\''.$P['cardId'].'\' '.$wh.' LIMIT 1',array(1=>'Error obteniendo información del contacto.',2=>'El contacto no existe.'));
	if(a_sql::$errNoText){ $r=a_sql::$errNoText; }
	else if($q[$fie] != $P['v']){ $r = _js::e(3,$P['text']); }
	else{ $r = false; }
	return $r;
}
}

?>