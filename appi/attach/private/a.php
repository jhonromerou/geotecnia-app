<?php
_ADMS::lib('Attach,xCurl');
JRoute::get('attach/a',function($D){
	if(_js::iseErr($D['tt'],'Se debe definir tt para relacionar archivos.')){}
	else if(_js::iseErr($D['tr'],'Se debe definir tr para relacionar archivos.')){}
	else{
		return a_sql::fetchL('SELECT * FROM gtd_ffc1 WHERE tt=\''.$D['tt'].'\' AND tr=\''.$D['tr'].'\' LIMIT 50',['k'=>'L',1=>'Error obteniendo listado de archivos.',2=>'No se encontraron resultados.'],true);
	}
	_err::errDie();
	return $js;
});

JRoute::delete('attach/a',function($D){
	if(_js::iseErr($D['fileId'],'Se debe definir ID del archivo.','numeric>0')){}
	else{
		$q=a_sql::query('DELETE FROM gtd_ffc1 WHERE fileId=\''.$D['fileId'].'\' LIMIT 1',array(1=>'Error eliminando archivo.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q['aff_rows']==0){ $js= _js::r('Archivo eliminado correctamente (2).'); }
		else if($errs==0){
			$js= _js::r('Archivo eliminado correctamente.');
		}
	}
	_err::errDie();
	return $js;
});
JRoute::post('attach/a',function($D){
	$Lx=$D['L']; unset($D['L']);
	if(_js::iseErr($D['tt'],'Se debe definir tt para relacionar archivos.')){}
	else if($js=_js::iseErr($D['tr'],'Se debe definir tr para relacionar archivos.')){}
	else if(!is_array($Lx)){ $js=_js::e(3,'No se enviaron archivos a guardar.'); }
	else{
		$n=0; $errs=0; $files=0;
		a_sql::transaction(); $cmt=false;
		$Ls=array();
		foreach($Lx as $nx => $L){ $n++;
			$ln='Linea '.$n.': ';
			$L['tt']=$D['tt']; $L['tr']=$D['tr'];
			$L['dateC']=date('Y-m-d H:i:s');
			$L['versNum']=1;
			$L['userId']=a_ses::$userId;
			$L['fileId']=a_sql::qInsert($L,array('tbk'=>'gtd_ffc1','qk'=>'ud'));
			if(a_sql::$err){ _err::err($ln.'Error guardando archivo . '.a_sql::$errText,3); break; }
			else{ $files++;
				$Ls[]=$L;
			}
		}
		if(!_err::$err){ $js=_js::r('Se guardaron '.$files.' archivos.',$Ls); $cmt=true; }
		a_sql::transaction($cmt);
	}
	_err::errDie();
	return $js;
});

JRoute::get('attach/a/view',function($D){
	$M=a_sql::fetch('SELECT * FROM gtd_ffc1 WHERE fileId=\''.$D['fileId'].'\' LIMIT 1 ',array(1=>'Error obteniendo información del archivo',2=>'El archivo no existe'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else{
		$M['canDelete']='N';
		if($M['folId']>0){
			_ADMS::libC('jdrive','jdrive');
			$Mf= JDrive::getFolder(['folId'=>$M['folId'],'_permsVerify'=>'N']);
			if(JDrive::isPerm('W',$Mf)){  $M['canDelete']='Y'; }
		}
		else if($M['userId']==a_ses::$userId){
			$M['perms']='W';
			$M['canDelete']='Y';
		}
		if(!_err::$err){ $js=_js::enc2($M); }
	}
	_err::errDie();
	return $js;
});
JRoute::put('attach/a/fileName',function($D){
	if(_js::iseErr($D['fileId'],'Se debe definir Id de archivo.','numeric>0')){}
	else if(_js::iseErr($D['fileName'],'Se debe definir el nuevo nombre para el archivo.')){}
	else if($js=_js::textLen($D['fileName'],50,'El nombre del archivo no puede exceder los 50 caracteres.')){ _err::err($js); }
	else{
		$Q=a_sql::fetch('SELECT fileName FROM gtd_ffc1 WHERE fileId=\''.$D['fileId'].'\' LIMIT 1',array(1=>'Error obteniendo información de archivo.',2=>'El archivo no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			a_sql::query('UPDATE gtd_ffc1 SET fileName=\''.$D['fileName'].'\' WHERE fileId=\''.$D['fileId'].'\' LIMIT 1',array(1=>'Error actualizando nombre de archivo'));
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			else{ $js=_js::r('Nombre de archivo actualizado.'); }
		}
	}
	_err::errDie();
	return $js;
});

JRoute::get('attach/a/demo',function($D){
	$L=a_sql::oneMulti(['prueba'=>'john'],array('tbk'=>'gtd_ffc1x','qk'=>'ud','get'=>'querys'));
	echo '---> '.a_sql::$errText."\n";
	echo '-->userId == '.a_ses::$userId."\n";
	die(print_r($L));
});
?>