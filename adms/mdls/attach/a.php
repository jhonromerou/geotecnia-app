<?php
_ADMS::lib('Attach,xCurl');
if(_0s::$router=='POST a/upload'){
	$js= Attach::post($_FILES['file'],array('revStor'=>'Y'));
	if(_err::$err){ $js=_err::$errText; }
	echo $js;
}
else if(_0s::$router=='DELETE a'){
	if($js=_js::ise($___D['fileId'],'Se debe definir ID del archivo.','numeric>0')){}
	else if($js=_js::ise($___D['filePath'],'Se debe definir ruta del archivo.')){}
	else{
		$errs=0; a_sql::transaction(); $cmt=false;
		$qf=a_sql::fetch('SELECT svr FROM gtd_ffc1 WHERE fileId=\''.$___D['fileId'].'\' LIMIT 1',array(1=>'Error obteniendo información del archivo.'));
		if(a_sql::$err){ die(a_sql::$errNoText); }
		$q=a_sql::query('DELETE FROM gtd_ffc1 WHERE fileId=\''.$___D['fileId'].'\' LIMIT 1',array(1=>'Error eliminando archivo.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; $errs=1; }
		else if($q['aff_rows']>0){
			$Rc=xCurl::post(Attach::getSvr($qf['svr']).'/__mnt/delete.php',array('filePath'=>$___D['filePath']));
			if(xCurl::$err){ $js= xCurl::$errText; $errs=1; }
		}
		if($errs==0){ $cmt=true;
			$js= _js::r('Archivo eliminado correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}
else if(_0s::$router=='GET tt/up'){
	if($js=_js::ise($___D['tt'],'Se debe definir tt para relacionar archivos.')){}
	else if($js=_js::ise($___D['tr'],'Se debe definir tr para relacionar archivos.')){}
	else{
		$q=a_sql::query('SELECT * FROM '._0s::$Tb['gtd_ffc1'].' WHERE tt=\''.$___D['tt'].'\' AND tr=\''.$___D['tr'].'\' LIMIT 30',array(1=>'Error obteniendo listado de archivos tt/up.',2=>'No se encontraron archivos en tt/up.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $M=array('L'=>array());
			while($L=$q->fetch_assoc()){
				if($L['userId']==a_ses::$userId || $L['userId']==1){
					$L['canDelete']='Y';
				}
				$M['L'][]=$L;
			}
			$js=_js::enc($M);
		}
	}
	echo $js;
}
else if(_0s::$router=='POST tt/up'){
	$Lx=$___D['L']; unset($___D['L']);
	if($js=_js::ise($___D['tt'],'Se debe definir tt para relacionar archivos.')){}
	else if($js=_js::ise($___D['tr'],'Se debe definir tr para relacionar archivos.')){}
	else if(!is_array($Lx)){ $js=_js::e(3,'No se enviaron archivos a guardar.'); }
	else{
		$n=0; $errs=0; $files=0;
		a_sql::transaction(); $cmt=false;
		$Ls=array();
		foreach($Lx as $nx => $L){ $n++;
			$ln='Linea '.$n.': ';
			$L['tt']=$___D['tt']; $L['tr']=$___D['tr'];
			$L['dateC']=date('Y-m-d H:i:s');
			$ins=a_sql::insert($L,array('tbk'=>'gtd_ffc1','qDo'=>'insert','kui'=>'uid'));
			if($ins['err']){ $js=_js::e(3,$ln.'Error guardando archivo . '.$ins['text']); $errs++; break; }
			else{ $files++;
				$L['versNum']=1;
				$L['fileId']=$ins['insertId'];
				$L['userId']=a_ses::$userId;
				$Ls[]=$L;
			}
		}
		if($errs==0){ $js=_js::r('Se subieron '.$files.' archivos.',$Ls); $cmt=true; }
		a_sql::transaction($cmt);
	}
	echo $js;
}
?>