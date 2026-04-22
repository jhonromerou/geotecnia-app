<?php
/*
curSend _POST{ _ocardId,_tbFile,_filePath,_fileMaxSize,_svr}
*/
class AttachMin{
static $rootPath='';
static $cD=array(); //filePath
static public function getSize($bytes=0,$mb='Mb'){
	$bytes=($bytes==0)?16:$bytes;
	switch($mb){
		case 'Gb': $b = number_format($bytes/1073741824,6); break;
		case 'Mb': $b = number_format($bytes/1048576,6); break;
		case 'Kb': $b = number_format($bytes/1024,6); break;
		case 'Mb': $b = number_format($bytes/1048576,6); break;
		default: $b = number_format($bytes/1048576,6); break;
	}
	return $b;
}
static public function getSizeText($bytes=0){
	$bytes=($bytes==0)?16:$bytes;
	if ($bytes >= 1073741824){ $bytes = number_format($bytes / 1073741824, 2) . ' Gb'; }
	elseif ($bytes >= 1048576){ $bytes = number_format($bytes / 1048576, 2) . ' Mb'; }
	elseif ($bytes >= 1024){ $bytes = number_format($bytes / 1024, 2) . ' Kb'; }
	elseif ($bytes > 1){ $bytes = $bytes . ' Bytes'; }
	elseif ($bytes == 1){ $bytes = $bytes . ' Byte'; }
	else{ $bytes = '0 Bytes'; }
	return $bytes;
}
static public function getExt($name=''){
	$ext = explode('.',$name); $c = count($ext)-1;
	$ext = $ext[$c];
	return $ext;
}
static public function getError($FIL=array(),$si=''){
	if($FIL['error'] == 1){
		return 'El archivo excede el tamaño máximo permitido por el servidor (1)';
	}
	else if($FIL['error'] == 2){
		return 'El archivo excede el tamaño máximo (Er-02), Peso Actual:'.$FIL['size'];
	}
	else{ return 'Error No. '.$FIL['error']; }
}
static public function getTypeMe($ext=''){
	if(preg_match('/(png|jpeg|jpg|gif)/is',$ext)){ $fileType = 'img';}
	else if(preg_match('/(xls|xlsx)/is',$ext)){ $fileType = 'xls';}
	else if(preg_match('/(csv|tsv)/is',$ext)){ $fileType = 'xls';}
	else if(preg_match('/(txt|rtf)/is',$ext)){ $fileType = 'txt';}
	else if(preg_match('/(html)/is',$ext)){ $fileType = 'html';}
	else if(preg_match('/(avi|mpeg|mp4)/is',$ext)){ $fileType = 'video';}
	else if(preg_match('/(mp3|wav|ra|au|aiff)/is',$ext)){ $fileType = 'audio';}
	else if(preg_match('/(doc|docx)/is',$ext)){ $fileType = 'doc';}
	else if(preg_match('/(pdf)/is',$ext)){ $fileType = 'pdf';}
	else { $fileType = $ext; }
	return $fileType;
}
static public function load($FILE=array(),$P=array()){
	$INFMx = array();
	$INF = array(); $errs=0;
	$pathREAL = $P['filePath']; $num=1;
	if(!preg_match('/\/$/',$pathREAL)){ $pathREAL .='/'; }
	$n=0;
	if($FILE['error']!= 0){
		return _js::errLast(1,self::getError($FILE,$FILE['size']));
	}
	else{
		$ext = self::getExt($FILE['name']);
		$fileName=time().rand(). '.'.$ext;;
		$INF['file']=$pathREAL.$fileName;
		if($FILE['error']==0){
			$copya= self::copy($FILE['tmp_name'],$fileName,$pathREAL);
			if(!$copya){ return _js::$errText; }
			else{
				$INF['url'] = $fileName;
				$INF['fullPath'] = self::$cD['filePath'];
				$INF['size'] = $FILE['size'];
				$INF['name'] = $FILE['name'];
				$INF['fileType'] = self::getTypeMe($ext);
				$INF['type'] = $FILE['type'];
				return json_encode($INF);
			}
		}
	}
}
static public function multiLoad($Fx=array(),$P=array()){
	$ori=' on[attach::multiLoad()]';
	$R=array('L'=>array());
	$INF = array(); $errs=0;
	$pathREAL = $P['filePath']; $num=1;
	if(!preg_match('/\/$/',$pathREAL)){ $pathREAL .='/'; }
	foreach($Fx['name'] as $n => $Fl){
		$F=array('name'=>$Fx['name'][$n],'type'=>$Fx['type'][$n],'tmp_name'=>$Fx['tmp_name'][$n],'error'=>$Fx['error'][$n],'size'=>$Fx['size'][$n]);
		if($F['error']!= 0){
			$INF['error'] = 1; $INF['text'] = self::getError($F,$F['size']).'.'.$ori; $errs++;
		}
		else{
			//tt,tr,svr,fileType,fileSize,fileSizeText,fileName,file
			$type = $F['type'];
			$name = $F['name'];
			$nName=time().rand();
			$ext = self::getExt($name);
			$filePath =c::$V['STOR_ROOT'].$pathREAL;
			$fileSave =$filePath. $nName . '.'.$ext;;
			self::mkDir($filePath);
			if(_js::$err){ return false; }
			if(copy($F['tmp_name'],$fileSave)){
				$INF['svr'] = $P['svr'];
				$INF['file'] =$pathREAL . $nName . '.'.$ext;;
				$INF['fileUri'] =$P['uriStor'].'/__mnt/downFile.php?file='.$pathREAL . $nName . '.'.$ext;;
				$INF['fileSize'] = self::getSize($F['size']);
				$INF['fileSizeText'] = self::getSizeText($F['size']);
				$INF['fileName'] = $name;
				$INF['fileType'] = self::getTypeMe($ext);;
			}
			else{
				$errors= error_get_last();
				$pathErr = (preg_match('/failed to open stream/',$errors['message']));
				$textErr = ($pathErr) ? 'El directorio de destino no existe: '.$P['filePath'] : 'No se subió el archivo (2).';
				$errPhp = $errors['type'].'. '.$errors['message'];
				$R['errNo'] = 1; $errs++;
				$R['text']= $textErr.' ('.$errPhp.') '.$ori;
			}
		}
		$R['L'][$n] = $INF;
	}
	if($errs>0){
		foreach($R['L'] as $n =>$L){ unset($R['L']); @unlink($L['file']); }
	}
	if($P['getL']){ return $R['L']; }
	return json_encode($R['L']);
}

/* Files */
static public function mkDir($dir=false){
	if($dir && !file_exists($dir)){
		if(!@mkdir($dir, 0777, true)){
			_js::err(3,'Error creando directorio '.$dir.' on AttachMin::mkDir');
		}
	}
	return $dir;
}
static public function copy($tmp='',$fil='',$path=false){
	$path=self::mkDir($path);
	if(_js::$err){ return false; }
	$filePath=$path.$fil;
	self::$cD['filePath']=$filePath;
	$copya=@copy($tmp,$filePath);
	if($copya){ return true; }
	else if(!file_exists($filePath)){
		_js::errLast(3,'El archivo no fue copiado correctamente on AttachMin::copy(): ');
		return false;
	}
	else{
		_js::errLast(3,'No se subió el archivo');
		return false;
	}
}
}
?>
