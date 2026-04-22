<?php
class _export{
public $toMime = array(
	'byTab'=>array('mime'=>'text/plain','ext'=>'.txt'),
	'xls'=>array('mime'=>'text/html','ext'=>'.xls'),
	'pdf'=>array('mime'=>'Aplicacion/pdf','ext'=>'.pdf'),
	'JSON'=>array('mime'=>'Aplicacion/json','ext'=>'.json')
);

function download($P=array()){
	if($P['docType'] == 'JSON'){ echo stripslashes($_POST['DATA']); }
	else if($P['docType'] != 'pdf'){
		$DATA = json_decode(stripslashes($P['DATA']),true);
		foreach($DATA['THS'] as $n => $td){
			echo $td.'	';
		}
	echo '
';
	foreach($DATA['TDS'] as $n => $VAL){
		foreach($DATA['THS'] as $td => $nul){
			$val = (preg_match('/^\(?\$/',$VAL[$td])) ? preg_replace('/[^0-9\.]/','',$VAL[$td]) : $VAL[$td];
			echo $val.'	'; 
		}
		echo '
';
	}
	}
}

function simple($P=array()){
	if($P['docType'] != 'pdf'){
		$DATA = json_decode(stripslashes($P['DATA']),true);
		foreach($DATA['THS'] as $n => $td){
			echo $td.'	';
		}
	echo '
';
	foreach($DATA['TDS'] as $n => $VAL){
		foreach($DATA['THS'] as $td => $nul){
			$val = (preg_match('/^\(?\$/',$VAL[$td])) ? preg_replace('/[^0-9\.]/','',$VAL[$td]) : $VAL[$td];
			echo $val.'	'; 
		}
		echo '
';
	}
	}
}
}
?>