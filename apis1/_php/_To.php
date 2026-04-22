<?php
class _To{
static public function file_getSize($bytes=0,$udm='MB'){
	if($udm == 'GB'){ $bytes = number_format($bytes / 1073741824, 4); }
	else if($udm == 'MB'){ $bytes = number_format($bytes / 1048576, 4); }
	else if($udm == 'Kb'){ $bytes = number_format($bytes / 1024, 4); }
	else if($udm == 'Bytes'){ $bytes; }
	return $bytes;
}
static public function file_getSizeText($bytes=0){
	if ($bytes >= 1073741824){ $bytes = number_format($bytes / 1073741824, 2) . ' GB'; }
	elseif ($bytes >= 1048576){ $bytes = number_format($bytes / 1048576, 2) . ' MB'; }
	elseif ($bytes >= 1024){ $bytes = number_format($bytes / 1024, 2) . ' Kb'; }
	elseif ($bytes > 1){ $bytes = $bytes . ' Bytes'; }
	elseif ($bytes == 1){ $bytes = $bytes . ' Byte'; }
	else{ $bytes = '0 Bytes'; }
	return $bytes;
}
static public function file_getUpdSize($FILEk=array()){
	$fileSize = 0;
	$kf = array();
	if(is_array($FILEk)){
		foreach($FILEk['size'] as $nu => $f){
			$kf[$nu] = $nu;
			$fileSize += $f;
		}
	$fileSize = self::file_getSize($fileSize);
	$R = array('numFiles'=>count($kf),'sizeMb'=>$fileSize);
	}
	return $R;
}
static public function file_getExt($fileName=''){
	return strtolower(preg_replace('/^.*\.(.*)$/i','$1',$fileName));
}
}
?>