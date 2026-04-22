<?php
_ADMS::lib('_File');
if($_GET['g']=='storageUsaged'){
	die('deshabilitado por ahora...pero funcional');
	_ADMS::lib('_Sys');
	$dbase='/mnt/vo1/';
	$dire=opendir($dbase);
	while(false !== ($dd = readdir($dire))){
		if(preg_match('/^(\.|\.\.|\_bk|lost\+found)$/',$dd)){ continue; }
		$tdir=$dbase.$dd;
		if(is_dir($tdir)){
			$kb=_Sys::_exec('du -b -s '.$tdir,0);
			echo 'Peso: '._File::getSize($kb).' --> ';
		}
		echo $tdir."\n";
	}
	die();
}

_ADMS::lib('a_mdl,_jwt');
_JWT::$due=false;
a_sql::dbase(a_cnf::$sql);
if($_GET['storGet']){
	$___D['maxFile']=_File::getSize($___D['maxFile']);
	$___D['upTotal']=_File::getSize($___D['upTotal']);
	$timer=time(); _JWT::$_pid=$timer;
	a_mdl::storGet($___D);
	
	$jwt=_JWT::encode(array('ocardCode'=>$___D['ocardCode']));
	echo '{"tooken":"'.$jwt.'"}';
	die('');
}
$JW=_JWT::decode($___D['tooken']);
if(_JWT::$err){ die(_js::e(3,_JWT::$errNoText)); } 
$___D['ocardCode']=$JW['ocardCode'];
$ups=_File::getSize($_FILES,'mb',1);
$Rv=a_mdl::stor($___D,array('upI'=>$ups));
$F=array();
_File::$path=$Rv['tpath'];
$Sv=(_File::copyy($_FILES));
if(_err::$err){ print_r(_err::$errText); 
 a_mdl::storPut(array('ocardId'=>$Rv['ocardId'],'qty'=>-$ups['t']));
}
else{ echo json_encode($Sv); }
?>