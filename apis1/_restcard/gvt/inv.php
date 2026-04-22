<?php
if(_0s::$router=='GET inv'){
	$___D['fromA']='* FROM xdp_orit A';
	$___D['whA']='AND A.cardId=\''.$tok['cardId'].'\' ';
	echo Doc::get($___D);
}
?>