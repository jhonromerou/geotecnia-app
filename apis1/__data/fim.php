<?php
header('Content-Type: application/json');
$D = $_POST;

$GLOBALS['n'] = 0;
_ADMS::_lb('com/fim');
if($ADMS_KEY == 'Fo'){
if($ADMS_KEYo[1] == ''){
if($ADMS_MET == 'PUT'){
	if(_js::isse($D['parentFolder'])){ $js = _ADMS::jsonError(3,'No se encontro carpeta padre.'); }
	else if(_js::isse($D['name'])){ $js = _ADMS::jsonError(3,'Se debe definir un nombre para la carpeta.'); }
	else if(_js::isse($D['privacity'])){ $js = _ADMS::jsonError(3,'Se debe definir la privacidad para la carpeta.'); }
	else{
		if(!_js::isse($D['fimId'])){
			$qF = a_sql::fetch('SELECT userId,userName FROM '._ADMS::$TBSoc['ap3_ofim'].' WHERE fimId=\''.$D['fimId'].'\' LIMIT 1');
			if(a_sql::$errNo ==1){ die(_ADMS::jsonError(1,'Error obteniendo información de carpeta existente: '.$qF['error_sql'])); }
			else if(a_sql::$errNo == -1 && $qF['userId'] != a_ses::$userId){ die(_ADMS::jsonError(4,'Solo el propietario de la carpeta pueda modificarla. '.$qF['userName'].'.')); }
		}
		$qN = a_sql::fetch('SELECT name FROM '._ADMS::$TBSoc['ap3_ofim'].' WHERE parentFolder=\''.$D['parentFolder'].'\' AND name=\''.$D['name'].'\' AND fimId!=\''.$D['fimId'].'\' LIMIT 1 ');
		if(a_sql::$errNo ==1){ $js = _ADMS::jsonError(1,'Error obteniendo información de carpeta: '.$qN['error_sql']); }
		else if($qN['name']){ $js = _ADMS::jsonError(3,'Ya existe una carpeta con ese nombre en el directorio actual.'); }
		else{
			$qLv = a_sql::fetch('SELECT lev FROM '._ADMS::$TBSoc['ap3_ofim'].' WHERE fimId=\''.$D['parentFolder'].'\' LIMIT 1 ');
			if(a_sql::$errNo ==1){ $js = _ADMS::jsonError(1,'Error obteniendo información de carpeta padre: '.$qLv['error_sql']); }
			else{
				$D['lev'] = ($qLv['lev']>=0)?$qLv['lev']*1+1 : 0;
				$ins = a_sql::insert($D,array('ou_dateC'=>1,'table'=>_ADMS::$TBSoc['ap3_ofim'],'wh_change'=>'WHERE fimId=\''.$D['fimId'].'\' LIMIT 1'));
				if($ins['err']){ $js = _ADMS::jsonError(1,'Error guardando carpeta: '.$ins['err']['error_sql']); }
				else{
					$fimId = ($ins['insertId'])? $ins['insertId']:$D['fimId'];
					$D['text'] = ($ins['insertId'])?'Carpeta creada correctamente':'Carpeta Actualizada';
					_o::triger(array('qact'=>$ins['qact'],'objType'=>_o::$Ty['fimId'],'objRef'=>$fimId,'objName'=>$D['name'],'ext'=>'folder'));
					$js = json_encode($D);
				}
			}
		}
	}
	echo $js;
}
else if($ADMS_MET == 'GET'){
$fimId = (!_js::isse($D['fimId']) && $D['fimId']>0)?$D['fimId']:'';
if(_js::isse($D['openFolder'])){ 
$whFim = ($fimId!='')?' AND parentFolder='.$fimId.' ' : '';
$whFim .= FIM::Fo_perms('getWh');
}
else{
	$qAu = FIM::_folderTopUser(array('parentFolder'=>$D['openFolder']),array('openFolder'=>1));
	if(is_array($qAu) && $qAu['errNo']){ echo _ADMS::jsonError($qAu); return ''; }
	$qPF = FIM::Fo_readLev($D['openFolder']);
	if(is_array($qPF) && $qPF['errNo']){ echo _ADMS::jsonError($qPF); return ''; }
	$whFim = (is_array($qPF)) ? ' AND F0.fimId=\'xxxx\' ': ' AND ('.$qPF.')';
}
	$qt = 'SELECT F0.* FROM '._ADMS::$TBSoc['A0_par_ousm'].' Usm, '._ADMS::$TBSoc['ap3_ofim'].' F0
	LEFT JOIN '._ADMS::$TBSoc['ap0_obj1'].' obj1 ON (obj1.objType=\''._o::$Ty['fimId'].'\' AND obj1.objRef = F0.fimId) 
	WHERE 1 '.$whFim.' '.$whFo.' GROUP BY F0.fimId ORDER BY F0.lev ASC, F0.name ASC';
	$q = a_sql::query($qt);
	if(a_sql::$errNo ==1){ $js = _ADMS::jsonError(1,'Error generando estructura: '.$q['error_sql']); }
	else if(a_sql::$errNo ==2){ $js = _ADMS::jsonError(2,'No se encontraron carpetas.'); }
	else{
		$Ex = array();
		while($L=$q->fetch_assoc()){
			$k = $L['fimId']; $k2 = $L['parentFolder'];
			if(!array_key_exists($k2,$Ex)){
				$js .= a_sql::JSON($L).',';
			}
			$Ex[$k] = $k;
		}
		$js = '{"Fo":['.substr($js,0,-1).']}';
	}
echo $js;
}
}

else if($ADMS_KEYo[1] == 'byId'){
if($ADMS_MET == 'GET'){
	$fimId = $D['fimId'];
	if(_js::isse($D['fimId'])){ echo _ADMS::jsonError(3,'No se ha definido fimId.'); return '';}
	$q = a_sql::fetch('SELECT F0.* FROM '._ADMS::$TBSoc['ap3_ofim'].' F0 
	WHERE F0.fimId = \''.$fimId.'\' LIMIT 1');
	if(a_sql::$errNo ==1){ $js = _ADMS::jsonError(1,'Error consultado carpeta: '.$q['error_sql']); }
	else if(a_sql::$errNo ==2){ $js = _ADMS::jsonError(2,'No se encontró la carpeta: '.$fimId.'.'); }
	else{ $js = '{"Fo":'.a_sql::JSON($q,'e').'}';
	}
echo $js;
}
}

else if($ADMS_KEYo[1] == 'quitFile' && $ADMS_MET == 'DELETE'){
	if(_js::isse($D['fimId']) || _js::isse($D['fileId'])){ $js = _ADMS::jsonError(3,'No se encontró la ID de la carpeta o archivo.'); }
	else{
		$qAu = FIM::_folderTopUser(array('parentFolder'=>$D['fimId']),array('action'=>'quitFile'));
		if(is_array($qAu) && $qAu['errNo']){ $js = _ADMS::jsonError($qAu); }
		else{
		$del = a_sql::query('DELETE FROM '._ADMS::$TBSoc['ap3_fim1'].' WHERE fimId=\''.$D['fimId'].'\' AND fileId=\''.$D['fileId'].'\' LIMIT 1');
		if(a_sql::$errNo ==1){ $js = _ADMS::jsonError(1,'Error quitando archivo de carpeta: '.$del['error_sql']); }
		else{
			$js = _ADMS::jsonResp('Archivo quitado correctamente.');
			_o::triger(array('qact'=>'deleteOn','childType'=>_o::$Ty['fimId'], 'childRef'=>$D['fimId'],'objType'=>_o::$Ty['fileUpd'],'objRef'=>$D['fileId']));
		}
		}
	}
	echo $js;
}

else if($ADMS_KEYo[1] == 'deleteFile' && $ADMS_MET == 'DELETE'){
	if(_js::isse($D['fimId']) || _js::isse($D['fileId'])){ $js = _ADMS::jsonError(3,'No se encontró la ID de la carpeta o archivo.'); }
	else{
		$qAu = FIM::_folderTopUser(array('parentFolder'=>$D['fimId']),array('action'=>'deleteFile'));
		if(is_array($qAu) && $qAu['errNo']){ $js = _ADMS::jsonError($qAu); }
		else{
		$qF = a_sql::fetch('SELECT targetType,targetRef,url FROM '._0s::$Tb['ap1_ofil'].' WHERE id=\''.$D['fileId'].'\' LIMIT 1');
		if(a_sql::$errNo==1){ $js = _ADMS::jsonError(1,'Error eliminando archivo: '.$qF['error_sql']); }
		else if($qF['targetType'] != _o::$Ty['fimId'] || $qF['targetRef'] !=$D['fimId']){ $js = _ADMS::jsonError(4,'El archivo no puede ser eliminado; no existe ó está relacionado directamente a un elemento diferente a este. Debe eliminarlo desde este elemento, target= '.$qF['targetType'].'.'.$qF['targetRef']); }
		else{
			@unlink($rootPATH.$qF['url']);
			$del = a_sql::query('DELETE FROM '._ADMS::$TBSoc['ap1_ofil'].' WHERE id=\''.$D['fileId'].'\' LIMIT 1');
			if(a_sql::$errNo ==1){ $js = _ADMS::jsonError(1,'Error eliminando archivo de carpeta: '.$del['error_sql']); }
			else{ $js = _ADMS::jsonResp('Archivo quitado correctamente.');
				$del = a_sql::query('DELETE FROM '._ADMS::$TBSoc['ap3_fim1'].' WHERE fileId=\''.$D['fileId'].'\' LIMIT 1');
				_o::triger(array('qact'=>'delete','objType'=>_o::$Ty['fileUpd'],'objRef'=>$D['fileId']));
			}
		}
		}
	}
	echo $js;
}

else if($ADMS_KEYo[1] == 'read'){
$qAu = FIM::_folderTopUser(array('parentFolder'=>$D['fimId'])); 
if(is_array($qAu) && $qAu['errNo']){ die(_ADMS::jsonError($qAu));}
$qF = a_sql::query('SELECT F0.*, F0.name fileName, \'folder\' fileType, \'N/A\' fileSizeText
FROM '._ADMS::$TBSoc['ap3_ofim'].' F0 WHERE F0.parentFolder=\''.$D['fimId'].'\' ORDER BY F0.name ASC');
$Fi = array();
if(a_sql::$errNo==-1){
	while($L=$qF->fetch_assoc()){
		$Fi[] = $L;
	}
}
$q = a_sql::query('SELECT F0.*, F.id fileId, F.fileName, F.fileType, F.fileSizeText, F.dateC, F.userName, F.url 
FROM '._ADMS::$TBSoc['ap1_ofil'].' F INNER JOIN '._ADMS::$TBSoc['ap3_fim1'].' F1 ON (F1.fileId = F.id) 
INNER JOIN '._ADMS::$TBSoc['ap3_ofim'].' F0 ON (F0.fimId = F1.fimId)
WHERE F1.fimId=\''.$D['fimId'].'\' ORDER BY F.fileName ASC');
if(a_sql::$errNo ==1 && $whFi==''){ $js = _ADMS::jsonError(1,'Error leyendo carpeta: '.$q['error_sql']); }
else if(a_sql::$errNo ==2 && count($Fi)==0){ $js = _ADMS::jsonError(2,'No se encontraron archivos en la carpeta.'); }
else if(a_sql::$errNo ==2 && count($Fi)>0){ $js = '{"Fi":'.json_encode($Fi).'}'; }
else if(a_sql::$errNo==-1){
	while($L=$q->fetch_assoc()){
		$Fi[] = $L;
	}
	$js = '{"Fi":'.json_encode($Fi).'}';
}
echo $js;
}

else if($ADMS_KEYo[1] == 'putFile' && $ADMS_MET == 'PUT'){
	$fimId = $D['fimId'];
	if(_js::isse($D['fimId'])){ $js = _ADMS::jsonError(3,'No se encontró el ID de la carpeta de destino.'); }
	else if(is_array($D['fileIds']) && count($D['fileIds'])==0){ $js = _ADMS::jsonError(3,'No se recibió ningun archivo.'); }
	else{
		$qAu = FIM::_folderTopUser(array('parentFolder'=>$D['fimId']),array('action'=>'uploadFile'));
		if(is_array($qAu) && $qAu['errNo']){ $js = _ADMS::jsonError($qAu); }

		else{
			$rels =0; $err = 0;
			foreach($D['fileIds'] as $i => $fileId){
				$Di = array('fimId'=>$fimId,'fileId'=>$fileId);
				$ins = a_sql::insert($Di,array('table'=>_ADMS::$TBSoc['ap3_fim1'],'wh_change'=>'WHERE fimId=\''.$Di['fimId'].'\' AND fileId=\''.$Di['fileId'].'\' LIMIT 1'));
				if($ins['err']){ $js = _ADMS::jsonError(1,'Error relacionando archivo: '.$ins['err']['error_sql']); $err++; break; }
				else{
					_o::triger(array('obj_notCreate'=>true,'qact'=>$ins['qact'],'objType'=>_o::$Ty['fileUpd'],'objRef'=>$fileId),array('putOnFimId'=>$fimId));
					$rels++;
				}
			}
			if($err==0){ $js = _ADMS::jsonResp('Se relacionaron '.$rels.' archivos a la carpeta.'); }
		}
	}
	echo $js;
}
}
?>