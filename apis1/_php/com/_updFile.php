<?php
class _updFile{
static $rootPath='E:/svr/v1';
static $path='/files/';
static public function getExt($name=''){
	$ext = explode('.',$name); $c = count($ext)-1;
	$ext = $ext[$c];
	return $ext;
}
static public function getError($FIL=array(),$si=''){
	if($FIL['error'] == 1){
		return 'El archivo excede el tamaño máximo permitir por el servidor (1)';
	}
	else if($FIL['error'] == 2){
		return 'El archivo excede el tamaño máximo (Er-02), Peso Actual:'.$FIL['size'];
	}
	else{ return 'Error No. '.$FIL['error']; }
}
static public function getName($PARS=array()){
	$nName='unname.file';
	if($PARS['thisName']){ $nName =$PARS['thisName'].' ('.$num.')'; $num++; } 
	else if($PARS['name'] && $len==1){ $nName = $PARS['name']; } 
	else if($PARS['nameRand'] && $len==1){ $nName = $PARS['nameRand'].'-'.time().rand(); } 
	else{
		$timera=time().rand();
		$nName = ($PARS['name']) ? $PARS['name'].' ('.$num.')' : $timera;
	}
	return $nName;
}
static public function getTypeMe($ext=''){
	if(preg_match('/(png|jpeg|jpg|gif)/is',$ext)){ $fileType = 'img';}
	else if(preg_match('/(xls)/is',$ext)){ $fileType = 'xls';}
	else if(preg_match('/(doc|docx)/is',$ext)){ $fileType = 'doc';}
	else if(preg_match('/(pdf)/is',$ext)){ $fileType = 'pdf';}
	else { $fileType = ''; }
	return $fileType;
}
static public function load($_FILE=array(),$PARS=array()){
	$len=count($_FILE['name']);
	if($len==0){ return $INF=array('error'=>2,'text'=>'No se recibió ningun archivo.'); }
	$INFMx = array();
	$INF = array(); $errs=0;
	$pathREAL = self::$rootPath . self::$path;; $num=1;
	if(!preg_match('/\/$/',$pathREAL)){ $pathREAL .='/'; }
	foreach($_FILE['name'] as $n => $Fs){
		foreach($_FILE as $k => $_s){ $FILE[$k] = $_FILE[$k][$n]; }
		if($FILE['error']!= 0){
			$INF['error'] = 1; $INF['text'] = self::getError($FILE,$fileSize); $errs++;
		}
		else{
			$fileSize = $FILE['size'];
			$type = $FILE['type'];
			$name = $FILE['name'];
			$nName=self::getName($PARS);;
			$ext = self::getExt($name);
			$INF['file'] = self::$path . $nName . '.'.$ext;
			$INF['fileSize'] = $fileSize;
			$INF['fileName'] = $name;
			$INF['fileType'] = self::getTypeMe($ext);;
			$savein = $pathREAL . $nName . '.'.$ext;
			if($FILE['error']==0){
				if(@copy($FILE['tmp_name'],$savein)){
					$INF['errNo'] = '-1';
					$INF['text'] = 'Se guardo correctamente el archivo.';
				}
				else{
					$errors= error_get_last();
					$pathErr = (preg_match('/failed to open stream/',$errors['message']));
					$textErr = ($pathErr) ? 'El directorio de destino no existe: '.self::$path : 'No se subió el archivo (2).'; 
					$INF['error'] = $INF['text']= $textErr;
					$INF['error_php'] = $errors['type'].'. '.$errors['message'];
					$INF['errNo'] = 1; $errs++;
					return $INF;
				}
			}
		}
		$INFMx[$n] = $INF;
	}
	if($errs>0){ $INFMx['errs'] =$errs; }
	return $INFMx;
}
}
?>