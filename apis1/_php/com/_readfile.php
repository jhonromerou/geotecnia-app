<?php
class _readFile{

static public function csv($csvFile='',$P=array()){
	$fh = fopen($csvFile, 'r');
	$l = 0;
	$Ln = array();
	while(!feof($fh)){
		if($l==0){ $Ln['H'] = fgetcsv($fh, 1024);  }
		else{
			$gets = fgetcsv($fh, 1024);
			if($P['byKey']){
				foreach($Ln['H'] as $n=>$name){ $gets[$name] = $gets[$n]; unset($gets[$n]); }
			}
			$Ln['L'][$l] = $gets;
		}
		$l++;
	}
	fclose($fh);
	return $Ln;
}
}
?>