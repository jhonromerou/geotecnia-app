<?php
class JFile{
static $path='/';
static $lastTmp=false;
static $PHPgenerate=[];//definir fecha en archivo
static $PHP=[];
static public function toPHP($DATA='',$fName=false,$P=[]){
	$dir=($P['path'])?c::$V['PATH_ROOT'].$P['path']:c::$V['PATH_ROOT'].'jfile2php/';
	self::mkDir($dir);
	if(!_err::$err){
		$data=var_export($DATA,true);
		//=>array
		//$data=preg_replace("/array \((\r|\n|\r\n)/s", "array(",$data);
		file_put_contents($dir.$fName.'.php','<?php
JFile::$PHPgenerate=\''.date('Y-m-d H:i:s').'\';
JFile::$PHP='.$data.'; 
?>');
	}
}
static public function fromPHP($fName=false,$P=[]){
	$dir=($P['path'])?c::$V['PATH_ROOT'].$P['path']:c::$V['PATH_ROOT'].'jfile2php/';
	require_once($dir.$fName.'.php');
}
static public function jsData($content='',$fName=false,$Rx=array()){
	$fName=self::tempFile($content,$fName);
	$R=array('tmp_name'=>[$fName],'name'=>[$fName],'_xfname'=>'file_jsData');
	foreach($Rx as $k=>$v){ $R[$k][0]=$v; }
	return $R;
}
static public function updTempB($content='',$fName=false,$Rx=array()){
	$fName=self::tempFile($content,$fName);
	$R=array('tmp_name'=>$fName,'name'=>$fName);
	foreach($Rx as $k=>$v){ $R[$k]=$v; }
	return $R;
}
static public function updTemp($content='',$fName=false,$Rx=array()){
	$fName=self::tempFile($content,$fName);
	$R=array('tmp_name'=>[$fName],'name'=>[$fName]);
	foreach($Rx as $k=>$v){ $R[$k][0]=$v; }
	return $R;
}
static public function tempFile($content='',$fName=false,$fup=false){
	if($fName){
		$fName=preg_replace('/\.(.*)/',time().'_'.mt_rand(1,30000).'.$1',$fName);
	}else{ $fName=time().'.txt'; }
	$fileName= c_g('PATH_TOP').'var/www/_tmpdir/'.$fName;
	self::$lastTmp=$fileName;
	if(file_exists($fileName)){
	$archivo = fopen($fileName, "w");
	fwrite($archivo,$content);
	fclose($archivo);
	}
	else{
	$archivo = fopen($fileName,"w+");
	fwrite($archivo,$content);
	fclose($archivo);
	}
	if(is_array($fup)){ 
		$fup['tmp_name']=$fileName;
		$fup['name']=$fName;
		$fup['size']=0;
		return $fup;
	}
	return $fileName;
}
static public function del($fName=false){
	if($fName){ @unlink($fName); }
	else{ @unlink(self::$lastTmp); }
}
static public function dels($fileS=[]){
	foreach($fileS as $k=>$L){ @unlink($L['tmp_name']); }
}

static public function mimeType($f=''){
	return @mime_content_type($f);
}
static public function mkDir($dir=false){
	if($dir==''){
		_err::err('Error creando directorio, nombre no defindio. on _File::mkDir');
	}
	if($dir && !file_exists($dir)){
		if(!@mkdir($dir, 0777, true)){
			_err::err('Error creando directorio '.$dir.' on _File::mkDir');
		}
	}
	return $dir;
}
static public function getSizeMb($bytes=0){
	$bytes=($bytes==0)?16:$bytes;
	return number_format($bytes*1/1048576,6,'.','');
}
static public function getSize($Byt=0,$mb='Mb',$maxi=false){
	$R=array('t'=>0);
	if($maxi){ $R['max']=0; }
	if(!is_array($Byt)){ $Byt=array(array('size'=>$Byt)); }
	foreach($Byt as $n=>$Lx){
		$bytes=($Lx['size']==0)?16:$Lx['size'];
		switch($mb){
			case 'Gb': $b = number_format($bytes/1073741824,6,'.',''); break;
			case 'Mb': $b = number_format($bytes/1048576,6,'.',''); break;
			case 'Kb': $b = number_format($bytes/1024,6,'.',''); break;
			default: $b = number_format($bytes/1048576,6,'.',''); break;
		}
		if($maxi && $b>$R['max']){ $R['max']=$b; $R['maxName']=$Lx['name']; }
		$R['t']+=$b*1;
	}
	if($maxi){ return $R; }
	return $R['t'];
}
static public function getFileSizeText($bytes=0){
	$bytes=($bytes==0)?16:$bytes;
	if ($bytes >= 1073741824){ $bytes = number_format($bytes / 1073741824, 2,'.','') . ' Gb'; }
	elseif ($bytes >= 1048576){ $bytes = number_format($bytes / 1048576, 2,'.','') . ' Mb'; }
	elseif ($bytes >= 1024){ $bytes = number_format($bytes / 1024, 2,'.','') . ' Kb'; }
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
static public function getTypeMe($ext='',$gExt=false){
	$ext=($gExt)?self::getExt($ext):$ext;
	if(preg_match('/(xls|xlsx)/is',$ext)){ $fileType = 'xls';}
	else if(preg_match('/(doc|docx)/is',$ext)){ $fileType = 'doc';}
	else if(preg_match('/(png|jpeg|jpg|gif|ico)/is',$ext)){ $fileType = 'img';}
	else if(preg_match('/(pdf)/is',$ext)){ $fileType = 'pdf';}
	else if(preg_match('/(avi)/is',$ext)){ $fileType = 'video';}
	else if(preg_match('/(bz|bz2|rar|zip|7z)/is',$ext)){ $fileType = 'rar';}
	else if(preg_match('/(ics|json|php|js|css|csv)/is',$ext)){ $fileType = 'tedit';}
	else { $fileType = ''; }
	return $fileType;
}
static public function tmpName($ext='',$n='rand'){
	if($n=='rand'){ $nName = time().rand().'.'.$ext; }
	else{
		$nName = $n.'.'.$ext;
	}
	return $nName;
}
static public function copyy($F=array(),$P=array()){
	$dir=self::mkDir(self::$path);
	if(_err::$err){ return array('errNo'=>3,'text'=>_err::$errText); }
	$len=count($F);
	if($len==0){ return _err::err('No se recibió ningun archivo.',3); }
	$INFMx = array();
	$INF = array(); $errs=0;
	foreach($F as $nk => $Fs){
		if($Fs['error']!= 0){
			_err::err(self::getError($FILE,$fileSize),3);
			$errs++;
		}
		else{
			$ext = self::getExt($Fs['name']);
			$nName=self::tmpName($ext);
			$INF['fileSize'] = self::getsize($Fs['size']);
			$INF['fileSizeText'] = self::getFileSizeText($Fs['size']);
			$INF['fileName'] = $Fs['name'];
			$INF['fileType'] = self::getTypeMe($ext);
			$INF['file'] = $dir . $nName;
			if(@copy($Fs['tmp_name'],$INF['file'])){}
			else{
				self::del($INF['file']);
				$errors= error_get_last();
				$pathErr = (preg_match('/failed to open stream/',$errors['message']));
				$textErr = ($pathErr) ? 'El directorio de destino no existe: '.$dir : 'No se subió el archivo (2).';;
				$INF['error_php'] = $errors['type'].'. '.$errors['message'];
				_err::err($textErr,3);
			}
		}
		$INFMx[] = $INF;
	}
	if($errs>0){ $INFMx['errs'] =$errs; }
	return $INFMx;
}
static public function create($fName='',$path='',$txt='',$errNo=0){
	$ori=' on [_File::create()]';
	try{
		$f=@fopen($path.$fName,'w');
		if(!$f){ throw new Exception('Error creando archivo: '.$ori); }
			else{
			if(!fwrite($f,$txt)){ _err::err('Error escribiendo en el archivo.'.$ori,$errNo); }
			fclose($f);
		}
	}
	catch(Exception $e){  _err::excep($e->getMessage()); }
}
static public function getData($f=''){
	return file_get_contents($f);
}
static public function replaceOn($pathFile,$_HTML=false){
	//if(!$_HTML['a']){ $_HTML['a']=[]; }
	ob_start(); include $pathFile; return ob_get_clean();
}
static public function blaze($html,$D=array(),$P=array()){
	{
		if(is_array($D)) foreach($D as $kName => $value){
			$html=preg_replace('/\<\{'.$kName.'\}\>(.*)\<\/\{'.$kName.'\}\>/','$1',$html);
			$html=preg_replace('/\{\{'.$kName.'\}\}/',$value,$html);
		}
		/*quitar posibles que no esten en campos D */
		$html=preg_replace('/\{\{(\w+)\}\}/','',$html);
		$html=preg_replace('/\<\{.*\}\>(.*)\<\/\{.*\}\>/','',$html); //quitar <$logoUrl$>
		if($P['encodeHTML']=='Y'){ return htmlentities($html); }
		return $html;
	}
}
}
class _File extends JFile{};
?>