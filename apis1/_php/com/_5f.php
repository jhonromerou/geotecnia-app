<?php
class _5f{
static $tb0 = 'afr1'; #'app_files';
static $objType = 'fileUpd';
static $historyObjType = 'fileUpd';
static $historyTargetType = 'fileUpdData';
static $path = '/updsgo/';
static $maxWidth = 1024;
static $rootPATH; 
static $types = array('1'=>'gif','2'=>'jpeg','3'=>'png');
static $ERRORS = array(
0=>'There is no error, the file uploaded with success',
1=>'The uploaded file exceeds the upload_max_filesize directive in php.ini',
2=>'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
3=>'The uploaded file was only partially uploaded',
4=>'No file was uploaded',
6=>'Missing a temporary folder',
7=>'Failed to write file to disk.',
8=>'A PHP extension stopped the file upload.',
);
/* versión ocean
usar /apisoc/upload -> para obtener json 
*/
static public function saveJS($D=array()){
	if($js=_js::ise($D['tt'],'Se debe definir tt para guardar relación de archivo.')){ die($js); }
	else if($js=_js::ise($D['tr'],'Se debe definir tr para guardar relación de archivo.')){ die($js); }
	$L=json_decode($D['L'],1); unset($D['L']);
	foreach($L as $nu => $resp){
		$D['fileType'] = $resp['fileType'];
		$D['fileSize'] = $resp['fileSize'];
		$D['fileSizeText'] = _To::file_getSizeText($resp['fileSize']);
		$D['url'] = $resp['file'];
		$D['fileName'] = $resp['fileName'];
		$fileId = a_sql::qInsert($D,array('tbk'=>'app_fil1','qk'=>'ud','FIELDS'=>'insert'));
		if(a_sql::$err){ break;
			$js = _js::e(3,'Error subiendo archivo: '.a_sql::$errNoText); 
		}
		else{ $filesUpd++;
			$L[$nu]=a_sql::$FIELDS; a_sql::$FIELDS=array();
			$L[$nu]['id']=$fileId;
		}
	}
	if($filesUpd>0){ $js=_js::r('Se subieron '.$filesUpd.' archivos.',$L); }
	return $js;
}

/* end version ocean */
static public function updAndTable($P=array()){
	$fileSizeTotal = $rv['fileSizeTotal'];
	$histTargetRef = $P['targetRef'];
	$filesUpd = 0;
	$respMx = self::__multiUpload($_FILES['file'],array('ADMS_uploadFilesSubDir'=>$P['ADMS_uploadFilesSubDir'])); unset($P['ADMS_uploadFilesSubDir']);
	$jsX = array();
	if($respMx['error']){ return _js::e($respMx); }
	foreach($respMx as $nu => $resp){
		if($resp['errNo'] == -1){
			$P['fileType'] = $resp['fileType'];
			$P['fileSize'] = $resp['fileSize'];
			$P['fileSizeText'] = _To::file_getSizeText($resp['fileSize']);
			$P['url'] = $resp['file'];
			$P['fileName'] = $resp['fileName'];
			$jsR = a_sql::insert($P,array('tbk'=>'app_fil1','ou_dateC'=>1,'qDo'=>'insert'));
			if($jsR['errNo']){
				$js = json_encode($jsR); //_js::e(1,$jsR['text'].'');
				@unlink(self::$rootPATH.$resp['file']); break;
			}
			else{ $filesUpd++; }
		}
		else{ $js = _js::r(1,$resp['error']); break; }
	}
	if($filesUpd>0){ $js=_js::r('Se subieron '.$filesUpd.' archivos.'); }
	return $js;
}
static public function get($P=array()){
	if(_js::ise($P['tt']) || _js::ise($P['tr'])){ return _js::e(3,'No se ha definido el target para obtener los archivos.'); }
	$P['EXACTO'] = true;
	_ADMS::_lb('sql/filter');
	$whe = 'WHERE 1 '.a_sql_filtByT($P);
	$cList = a_sql::query('SELECT id,dateC,tt,tr,fileType,userId,userName,svr,url,fileName,fileSize,fileSizeText,lineMemo FROM app_fil1 '.$whe.' '.a_sql::nextLimit(),array(1=>'Error obteniendo archivos: ',2=>'No se encontraron archivos relacionados.'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($C = $cList->fetch_assoc()){
			$C['url']=str_replace('E:/svr/v1','',$C['url']);
			switch($L['svr']){
				case 'L': $C['url']=$C['url'];  break;
			}
			$C['canDelete'] = ($C['userId'] == a_ses::$userId) ? 'Y' :'N';
			$Mx['L'][]=$C;
		}
		$js=_js::enc($Mx);
	}
	return $js;
}
static public function deleteSave($P=array()){
	$fileId = $P['fileId'];
	if($js=_js::ise($fileId,'ID del archivo no definida.')){ die($js); }
	$gFile = a_sql::fetch('SELECT userId,url FROM app_fil1 WHERE id=\''.$fileId.'\' LIMIT 1',array(1=>'Error eliminando archivo: ',2=>'El archivo no existe.'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if(a_sql::$errNo==-1 && $gFile['userId'] != a_ses::$userId){
		return _js::e(4,'No tiene permisos para eliminar archivos de otro usuario.');
	}
	else{
		$q = a_sql::query('DELETE FROM app_fil1 WHERE id=\''.$fileId.'\' LIMIT 1',array(1=>'Error eliminando archivo:'));
		if(a_sql::$err){ return a_sql::$errNoText; }
		else{
			@unlink(self::$rootPATH.$gFile['url']);
			$js = _js::r('Archivo eliminado correctamente.','"fileId":"'.$fileId.'"');
		}
	}
	return $js;
}
static public function __upload($_FILE=array(),$PARS=array()){
	$INF = array();
	if(_ADMS::$uploadFiles != ''){ self::$path = _ADMS::$uploadFiles; }
	if($PARS['ADMS_uploadFilesSubDir']!=''){ self::$path .= $PARS['ADMS_uploadFilesSubDir']; }
	$pathREAL = self::$rootPATH . self::$path;
	$fileSize = $_FILE['size'];
	$type = $_FILE['type'];
	$name = $_FILE['name'];
	$ext = explode('.',$name); $c = count($ext)-1;
	$ext = $ext[$c];
	if($name != ''){
		$nName = ($PARS['name']) ? $PARS['name'] : time().rand();
		$INF['file'] = self::$path . $nName . '.'.$ext;
		$INF['fileSize'] = $fileSize;
		$INF['fileName'] = $name;
		$INF['fileType'] = self::getTypeMe($ext);;
		$savein = $pathREAL . $nName . '.'.$ext;
		if($_FILE['error'] == 0){
			if(copy($_FILE['tmp_name'],$savein)){
				$INF['text'] = 'Se guardo correctamente el archivo.';
				$INF['status'] = 1;
			}#sif copy
			else{
				$errors= error_get_last();
				$pathErr = (preg_match('/failed to open stream/',$errors['message']));
				$textErr = ($pathErr) ? 'El directorio de destino no existe...' : 'No se subió el archivo (2).'; 
				$INF['error'] = 1;
				$INF['text'] = $textErr;
				$INF['error_php'] = $errors['type'].'. '.$errors['message'];
				$INF['status'] = 0;
			}
		}
		else{
				$INF['error'] = 1;
				$INF['text'] = self::getError($_FILE,$fileSize);
				$INF['status'] = 0;
		}
	}
	return $INF;
}
/* end new */

static public function getExt($name=''){
	$ext = explode('.',$name); $c = count($ext)-1;
	$ext = $ext[$c];
	return $ext;
}

static public function __multiUpload($_FILE=array(),$PARS=array()){
	$len=count($_FILE['name']);
	if($len==0){ return $INF=array('error'=>2,'text'=>'No se recibió ningun archivo.'); }
	$INFMx = array();
	$INF = array(); $errs=0;
	if(_0s::$Path_files != ''){ self::$path = _0s::$Path_files; }
	if($PARS['ADMS_uploadFilesSubDir']!=''){ self::$path .= $PARS['ADMS_uploadFilesSubDir']; }
	$pathREAL = self::$rootPATH . self::$path; $num=1;
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
		$ext = self::getExt($name);
		if($name != ''){
			if($PARS['thisName']){ $nName =$PARS['thisName'].' ('.$num.')'; $num++; } 
			else if($PARS['name'] && $len==1){ $nName = $PARS['name']; } 
			else if($PARS['nameRand'] && $len==1){ $nName = $PARS['nameRand'].'-'.time().rand(); } 
			else{
				$timera=time().rand();
				$nName = ($PARS['name']) ? $PARS['name'].' ('.$num.')' : $timera;
			}
			$INF['file'] = self::$path . $nName . '.'.$ext;
			$INF['fileSize'] = $fileSize;
			$INF['fileName'] = $name;
			$INF['fileType'] = self::getTypeMe($ext);;
			$savein = $pathREAL . $nName . '.'.$ext;
			if($FILE['error'] == 0){
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
			else{
				$INF['error'] = 1;
				$INF['text'] = self::getError($FILE,$fileSize);
				$INF['errNo'] = 1; $errs++;
			}
		}
		}
		$INFMx[$n] = $INF;
	}
	if($errs>0){ $INFMx['errs'] =$errs; }
	return $INFMx;
}

static public function putReview($P=array(),$P2=array()){
	$R = array();
	$B = array('objType'=>_o::$Ty['fileUpd'],'targetType'=>$P['targetType'],'targetRef'=>$P['targetRef']);
	if(count($P) == 0){ $jsErr = (_ADMS::jsonError(3,'No se han recibido ningún dato.')); }
	else if(_js::isse($P['targetType']) || _js::isse($P['targetRef'])){ $jsErr = _ADMS::jsonError(3,'No se ha definido el target.'); }
	else if(count($P2['files'])>_0s::$cFile['maxUpd']){ $jsErr = (_ADMS::jsonError(3,'No se pueden cargar más de '._0s::$cFile['maxUpd'].' archivos.')); }
	else if($P2['firebaseUpd'] !='Y' && $P['targetType'] == ''){ $jsErr = (_ADMS::jsonError(3,'No se cargó el archivo, no se ha definido el targetType.')); }
	$jsSize = self::r_totalSize($P2['files']);
	if($jsSize['jsError']){ $jsErr = ($jsSize['jsError']); }
	$R['fileSizeTotal'] = $jsSize['fileSizeTotal'];
	$memberY = _o::userPerms($B);//perm to comment,fileUpd on objets
	if($memberY['r'] == 'N'){ $jsErr = $memberY['js']; }
	$o1Err = _o::plan_canDo(_o::$Ty['fileUpd'],array('get'=>'array','fileSizeTotal'=>$fileSizeTotal));
	if($o1Err['err']){ $jsErr = _ADMS::jsonError($o1Err['err']['errNo'],'Error subiendo archivo (limit): '.$o1Err['err']['text']); }
	if($jsErr!=''){ $R['jsErr'] = $jsErr;}
	return $R;
}

static public function put($P=array(),$D=array()){
	//P = POST, _FILES llega sin parametro
	$B = array('objType'=>_o::$Ty['fileUpd'],'targetType'=>$P['targetType'],'targetRef'=>$P['targetRef']);
	$rv = self::putReview($P,array('files'=>$_FILES['file']['size']));
	if($rv['jsErr']){ die($rv['jsErr']); }
	else{
		$fileSizeTotal = $rv['fileSizeTotal'];
		$histTargetRef = $P['targetRef'];
		$filesUpd = 0;
		$respMx = self::__multiUpload($_FILES['file'],array('ADMS_uploadFilesSubDir'=>$P['ADMS_uploadFilesSubDir'])); unset($P['ADMS_uploadFilesSubDir']);
		$jsX = array();
		foreach($respMx as $nu => $resp){
		if($resp['errNo'] == -1){
			$P['fileType'] = $resp['fileType'];
			$P['fileSize'] = $resp['fileSize'];
			$P['fileSizeText'] = _To::file_getSizeText($resp['fileSize']);
			$P['url'] = $resp['file'];
			$P['fileName'] = $resp['fileName'];
			$jsR = _5f::putLine($P);
			if($jsR['errNo']){ $errNo++;
				$js = _ADMS::jsonError(1,$jsR['text'].'');
				@unlink(self::$rootPATH.$resp['file']);
			}
			else{ $filesUpd++; }
		}
		else{ $js = _ADMS::jsonError(1,$resp['error']); break; }
		$jsX[] = $js;
		}
		$jsX[] = _o::plan_updVar(_o::$Ty['fileUpd'],array('qact'=>'insert','fileSizeTotal'=>$fileSizeTotal));
		$js = _ADMS::jsonRespNode($jsX,'"filesUploaded":"'.$filesUpd.'"');
	}
	return $js;
}

static public function putLine($P=array()){//local|firebase 1x1
	//quitar MR de orderSell, profileBase, os_oem
	$filesUpd = 0;
	$FR = $P['FR']; unset($P['FR']);
	$putOnFimId = $P['putOnFimId']; unset($P['putOnFimId']);//poner en fim, MR{}
	if(!_js::isse($putOnFimId)){
	 _ADMS::_lb('com/fim');
		$qAu = FIM::_folderTopUser(array('parentFolder'=>$putOnFimId),array('action'=>'uploadFile'));
		if(is_array($qAu) && $qAu['errNo']){ return $qAu; }
	}
	if($P['relRef']){ $P['relId'] = $P['relRef']; unset($P['relRef']); }
	$P['fileSizeText'] = _To::file_getSizeText($P['fileSize']);
	//new inset
	unset($P['relType'],$P['relId'],$P['relId2'],$P['cardId'],$P['cardName'],$P['userAssg'],$P['userAssgName']);
	$ins = a_sql::insert($P,array('ou_dateC'=>1,'POST'=>1,'table'=>_0s::$Tb['ap1_ofil'],'wh_change'=>'WHERE id=\'new\' LIMIT 1'));
	if($ins['err']){
		$js = array('errNo'=>1,'text'=>'Archivo no cargado. '.$ins['err']['error_sql'].')');
	}
	else{ $P['fileId'] = $ins['insertId'];
		$fileId = $ins['insertId'];
		$ext = _To::file_getExt($P['fileName']);
		_o::triger(array('qact'=>$ins['qact'],'objType'=>_o::$Ty['fileUpd'],'objRef'=>$fileId,'objName'=>$P['fileName'],'ext'=>$ext),array('putOnFimId'=>$putOnFimId,'FR'=>$FR));
		$js = array('text'=>'Archivo guardado correctamente','P'=>$P);
	}
	return $js;
}

static public function Sea_fim($P=array()){
	_ADMS::_lb('sql/filter');
	$wh = a_sql_filtByT($P);
	$qt = 'SELECT F1.fimId, F.id fileId, F.fileName, F.fileType, F.fileSizeText, F.dateC, F.userName, F.url FROM '._0s::$Tb['ap1_ofil'].' F 
LEFT JOIN '._0s::$Tb['ap3_fim1'].' F1 ON (F1.fileId = F.id AND F1.fimId=\''.$P['fimId'].'\') 
WHERE (F.ocardId=\''.a_ses::$ocardId.'\' AND F.osocId=\''.a_ses::$ocardSocId.'\') AND (F1.fimId IS NULL OR F1.fimId!=\''.$P['fimId'].'\') '.$wh.' GROUP BY F.id LIMIT 30';
	$q = a_sql::query($qt);
	if(a_sql::$errNo ==1 && $whFi==''){ $js = _ADMS::jsonError(1,'Error buscando archivos: '.$q['error_sql']); }
	else if(a_sql::$errNo ==2){ $js = _ADMS::jsonError(2,'No se encontraron archivos que no esten en esta carpeta.'); }
	else{
		while($L=$q->fetch_assoc()){
			$js .= a_sql::JSON($L).',';
		}
		$js = '{"Fi":['.substr($js,0,-1).']}';
	}
	return $js;
}

/* REVIEWS DATA */
static public function r_totalSize($FILES=array()){//$FILES=$_FILES['file']
	$R=array();
	$jsError='';
	$totalMB = 0; $totalByt = 0;
	if(is_array($FILES)) foreach($FILES as $n => $byt){
		$byt = (is_array($byt) && $byt['size'])?$byt['size']:$byt;
		$mb = _To::file_getSize($byt);
		$totalMb+=$mb; $totalByt+=$byt;
		if($mb>_0s::$cFile['maxSize']){
			$jsError = _ADMS::jsonError(3,'El tamaño de cada archivo no puede ser mayor a '._0s::$cFile['maxSize'].'MB, actual: '.$mb.' MB. No se guardo ningun archivo.'); break;
		}
	}
	if($jsError!=''){ $R['jsError'] = $jsError; }
	$R['totalMb'] = $totalMb;
	$R['fileSizeTotal'] = $totalByt;
	return $R;
}

static public function r_type($FILES=array(),$atype='noExe'){
	$errs=0;
	foreach($FILES['name'] as $n => $name){
		$ext=self::getExt($name); $fileType= self::getTypeMe($ext);
		if($atype=='img' && $fileType!=$atype){ $js=_js::e(3,'El archivo debe ser una Imagen.'); $errs++; break; }
		else if($atype=='pdf' && $fileType!=$atype){ $js=_js::e(3,'El archivo debe ser un Pdf.'); $errs++; break;}
		else if($atype=='xls' && $fileType!=$atype){ $js=_js::e(3,'El archivo debe ser un archivo una Hoja de Cálculo.'); $errs++; break; }
		else if($fileType=='exe' || $ext=='exe'){ $js=_js::e(3,'No se puede subir este tipo de archivos ('.$fileType.').'); $errs++; break; }
	}
	if($errs==0){ $js=false; }
	return $js;
}


/* OLDS */
static public function getError($FIL=array(),$si=''){
	if($FIL['error'] == 1){
		return 'El archivo excede el tamaño máximo permitir por el servidor (1)';
	}
	else if($FIL['error'] == 2){
		return 'El archivo excede el tamaño máximo (Er-02), Peso Actual:'.$FIL['size'];
	}
	else{ return 'Error No. '.$FIL['error']; }
}

static public function getTypeMe($ext=''){
	if(preg_match('/(png|jpeg|jpg|gif)/is',$ext)){ $fileType = 'img';}
	else if(preg_match('/(xls)/is',$ext)){ $fileType = 'xls';}
	else if(preg_match('/(doc|docx)/is',$ext)){ $fileType = 'doc';}
	else if(preg_match('/(pdf)/is',$ext)){ $fileType = 'pdf';}
	else { $fileType = ''; }
	return $fileType;
}

static public function tFile($_FILE=array(),$PARS=array()){
	$INF = array();
	if(_ADMS::$uploadFiles != ''){ self::$path = _ADMS::$uploadFiles; }
	if($PARS['ADMS_uploadFilesSubDir']!=''){ self::$path .= $PARS['ADMS_uploadFilesSubDir']; }
	$pathREAL = self::$rootPATH . self::$path;
	$fileSize = $_FILE['size'];
	$type = $_FILE['type'];
	$name = $_FILE['name'];
	$ext = explode('.',$name); $c = count($ext)-1;
	$ext = $ext[$c];
	if($name != ''){
		$nName = ($PARS['name']) ? $PARS['name'] : time().rand();
		$INF['file'] = self::$path . $nName . '.'.$ext;
		$INF['fileSize'] = $fileSize;
		$INF['fileName'] = $name;
		$INF['fileType'] = self::getTypeMe($ext);;
		$savein = $pathREAL . $nName . '.'.$ext;
		if($_FILE['error'] == 0){
			if(copy($_FILE['tmp_name'],$savein)){
				$INF['text'] = 'Se guardo correctamente el archivo.';
				$INF['status'] = 1;
			}#sif copy
			else{
				$errors= error_get_last();
				$pathErr = (preg_match('/failed to open stream/',$errors['message']));
				$textErr = ($pathErr) ? 'El directorio de destino no existe...' : 'No se subió el archivo (2).'; 
				$INF['error'] = $textErr;
				$INF['error_php'] = $errors['type'].'. '.$errors['message'];
				$INF['status'] = 0;
			}
		}
		else{
				$INF['error'] = self::getError($_FILE,$fileSize);
				$INF['status'] = 0;
		}
	}
	return $INF;
}

static public function getFileSize($bytes=0){
	if ($bytes >= 1073741824){ $bytes = number_format($bytes / 1073741824, 2) . ' GB'; }
	elseif ($bytes >= 1048576){ $bytes = number_format($bytes / 1048576, 2) . ' MB'; }
	elseif ($bytes >= 1024){ $bytes = number_format($bytes / 1024, 2) . ' Kb'; }
	elseif ($bytes > 1){ $bytes = $bytes . ' Bytes'; }
	elseif ($bytes == 1){ $bytes = $bytes . ' Byte'; }
	else{ $bytes = '0 Bytes'; }
	return $bytes;
}

static public function simpleSave($P=array(),$D=array()){
	//P = POST, _FILES llega sin parametro
	$B = array('objType'=>_o::$Ty['fileUpd'],'targetType'=>$P['targetType'],'targetRef'=>$P['targetRef']);
	$memberY = _5o::Rv_onPost($B);
	if($memberY['r'] == 'N'){ return $memberY['js']; }
	$o1Err = o1::plan_get(_o::$Ty['fileUpd'],array('get'=>'array','_FILE'=>$_FILES['file']));
	$histTargetRef = $P['targetRef']; 
	if($o1Err['err']){ $js = _ADMS::jsonError($o1Err['err']['errNo'],$o1Err['err']['text']); }
	else if(count($P) == 0){ $js = _ADMS::jsonError(3,'No se han recibido ningún dato.'); }
	else if($P['targetType'] == ''){ $js = _ADMS::jsonError(3,'No se cargó el archivo, no se ha definido el targetType.'); }
	else if($P['targetType'] == ''){ $js = _ADMS::jsonError(3,'No se cargó el archivo, no se ha definido el targetType.'); }
	else{
		$resp = self::tFile($_FILES['file'],array('ADMS_uploadFilesSubDir'=>$P['ADMS_uploadFilesSubDir']));
		unset($P['ADMS_uploadFilesSubDir']);
		if($resp['status'] == 1){
			$comm = $P['comment'];
			$fileSizeText = self::getFileSize($resp['fileSize']);
			$P['fileType'] = $resp['fileType'];
			$P['fileSize'] = $resp['fileSize'];
			$P['fileSizeText'] = $fileSizeText;
			$P['userId'] = a_ses::$userId;
			$P['userName'] = a_ses::$userName;
			$P['url'] = $resp['file'];
			$P['fileName'] = $resp['fileName'];
			$ins = a_sql::insert($P,array('table'=>_0s::$Tb['ap1_ofil'],'wh_change'=>'WHERE id=\'new\' LIMIT 1 '));
			if($ins['err']){
				$js = _ADMS::jsonError(1,'Archivo no cargado. '.($ins['err']['error_sql']).')');
				@unlink(self::$rootPATH.$resp['file']);
			}
			else{
				$fileId = $ins['last_id'];
				$js = '{"ok":true, "reLoad":true, "relType":"'.$P['relType'].'","relId":"'.$P['relId'].'", "relId2":"'.$P['relId2'].'"}';
				$jso1 = o1::plan_put(_o::$Ty['fileUpd']);
				$js = _ADMS::jsonRespNode(array($js,$jso1));
				$P['objType'] = self::$historyObjType;
				$P['objRef'] = $fileId;
				$P['targetRef'] = $histTargetRef; 
				//$P['targetId'] = $fileId;
				$P['relType'] = $P['relType'];
				$P['relRef'] = $P['relId'];
				$P['lineMemo'] = $resp['fileName'];
				$P['addData'] = '{"url":"'.$resp['file'].'", "fileType":"'.$resp['fileType'].'", "fileName":"'.$resp['fileName'].'","relType":"'.$P['relType'].'", "relId":"'.$P['relId'].'"}';
				_6::ouFn($P);
			}
		}
		else{ $js = _ADMS::jsonError(1,$resp['error']); }
	}
	return $js;
}

static public function deleteById($P=array()){//new
	$fileId = $P['fileId'];
	if(_js::isse($fileId)){ return _ADMS::jsonError(3,'No se encontró fileId.'); }
	$gFile = a_sql::fetch('SELECT userId,url,fileName,targetType,targetRef FROM '._0s::$Tb['ap1_ofil'].' WHERE id=\''.$fileId.'\' LIMIT 1');
	if(a_sql::$errNo == 2){ $js = _ADMS::jsonResp('No existe, borrar de html.'); }
	else if($gFile['userId'] != a_ses::$userId){
		$js = _ADMS::jsonError(4,'Solo el usuario que subió el documento puede eliminarlo.');
	}
	else{
		$cList = a_sql::query('DELETE FROM '._0s::$Tb['ap1_ofil'].' WHERE id=\''.$fileId.'\' LIMIT 1');
		if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,'Error eliminando archivo: '.$cList['error_sql']); }
		else{
			$js = _ADMS::jsonResp('Eliminado correctamente.','"fileId":"'.$fileId.'"');
			$jso1 = o1::plan_put(_o::$Ty['fileUpd'],array('act'=>'--'));
			$js = _ADMS::jsonRespNode(array($js,$jso1));
			_6::o_del(array('objType'=>_o::$Ty['fileUpd'],'objRef'=>$fileId));
			$o = array('verb'=>'delete','objType'=>_o::$Ty['fileUpd'],'objRef'=>$fileId,'targetType'=>$gFile['targetType'],'targetRef'=>$gFile['targetRef'],'lineMemo'=>$gFile['fileName']);
					_6::put($o);
		}
	}
	return $js;
}

static public function IMG_resize($_FILE=array(),$PARS=array()){

	$pathREAL = realpath($_SERVER['DOCUMENT_ROOT']) . self::$path;
	$size =$_FILE['size'];
	$type = $_FILE['type'];
	$name = $_FILE['name']; 
	$ext = explode('.',$name); $c = count($ext)-1;
	$ext = $ext[$c];
	$INF = array('status'=>1,'text'=>'Se guardó correctamente');
	if($name != ''){
		$nName = ($PARS['name']) ? $PARS['name'] : time().rand();
		$INF['file'] = self::$path . $nName . '.'.$ext;
		$INF['fileSize'] = $fileSize;
		$INF['fileName'] = $name;
		$INF['fileType'] = self::getTypeMe($ext);;
		$savein = $pathREAL . $nName . '.'.$ext;
		if($_FILE['error'] == 0){
			$source = $_FILE['tmp_name'];
			list($width_old, $height_old, $mime, $attr) = @getimagesize($source);
			$ratio = $width_old/$height_old;
			$width =  ($width_old > self::$maxWidth) ? self::$maxWidth : $width_old; 
			$height = round($width/$ratio);
			switch(self::$types[$mime]){
				case 'gif'  : $Filer = imagecreatefromgif($source); break;
				case 'jpeg' : $Filer = imagecreatefromjpeg($source); break;
				case 'png'  : $Filer = imagecreatefrompng($source); break;
			}
			$gd_d = imagecreatetruecolor($width,$height); 
			if($gd_d){} else{ $INF = array('status'=>0,'text'=>'Error al generar la imagen'); }
			if(imagealphablending($gd_d, false)){};
			if(imagesavealpha($gd_d, true)){};
			if(imagecopyresampled($gd_d, $Filer, 0, 0, 0, 0, $width, $height, $width_old,$height_old)){}
			else{ $INF = array('status'=>0,'text'=>'Error al generar la imagen');; }
			$save_error = false;
			switch(self::$types[$mime]){
				case 'gif'  : $save_error = imagegif($gd_d, $savein); break;
				case 'jpeg' : $save_error = imagejpeg($gd_d, $savein); break;
				case 'png'  : $save_error = imagepng($gd_d, $savein); break;
			}
			@imagedestroy($Filer); @imagedestroy($gd_d);
		}
		else{
			$INF['error'] = self::getError($_FILE,$size);
			$INF['status'] = 0;
		}
	}
	return $INF;
}

}

?>