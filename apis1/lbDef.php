<?php
date_default_timezone_set('America/Bogota');
$lastUpd=date('Y-m-d--H:i');;
$s=$_GET['read'];
$s = preg_replace('/\?.*/','',$s);
$_fpb='base.js';
if($_GET['fileName']){ $_fpb= $_GET['fileName'].'.js'; }
else if($_GET['cacheName']){ $_fpb= '../cache/'.$_GET['cacheName'].'.js'; }
else{ $_fpb= '../cache/'.$_GET['read'].'.js'; }
$rootPATH = realpath($_SERVER['DOCUMENT_ROOT']);
if($lastUpd== $_GET['jsUpd']){
	echo '/* fromCache */'."\n";
	require_once($rootPATH.'/_js/'.$_fpb);
	die();
} 

$f = explode(',',$s);
$_fp=false;
$path='/_js/';
if($_GET['fopen']=='Y'){
	$_fp=$_fpb;
	@unlink($_fp);
	//echo 'Define File '.$_fpb.'
	//Lb on File: '.$s;
	file_put_contents($_fp,"\n",FILE_APPEND);
}
foreach($f as $n => $k){
	if(preg_match('/lib\/firebase/',$k)){
		reqFopen('lib/js/firebase-app.js',$_fp);
		reqFopen('lib/js/firebase-firestore.js',$_fp);
		reqFopen('_js/$fb.js',$_fp);
	}
	else if($k!=''){
		if(preg_match('/^apps/',$k)){ reqFopen($rootPATH.'/'.$k.'.js',$_fp); }
		else{ reqFopen($rootPATH.'/_js/'.$k.'.js',$_fp); }
	}
echo '
';
}
function reqFopen($file='',$fp=false){
	if($fp!=false){
		$f=file_get_contents($file);
		file_put_contents($fp,$f."\n",FILE_APPEND);
	}
	else{ require_once($file); }
}
?>
