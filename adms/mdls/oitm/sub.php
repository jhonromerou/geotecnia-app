<?php
if(_0s::$router=='GET sub'){
	_ADMS::lib('sql/filter');
	$wh=a_sql_filtByT($_GET);
	$q=a_sql::query('SELECT itemSzId,uniqSize,itemSize FROM itm_grs1 WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo listado de subproductos.',2=>'No se encontraron resultados.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){ $Mx['L'][] = $L; }
		$js =_js::enc($Mx); unset($Mx);
	}
	echo $js;
}
else if(_0s::$router=='GET sub/form'){
	$q=a_sql::fetch('SELECT itemSzId,uniqSize,itemSize FROM itm_grs1 WHERE itemSzId=\''.$_GET['itemSzId'].'\' LIMIT 1',array(1=>'Error obteniendo subproducto.',2=>'El subproducto no existe.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $js =_js::enc2($q); }
	echo $js;
}
else if(_0s::$router=='PUT sub'){
	if($js=_js::textMax($_J['itemSize'],10,'Nombre subproducto: ')){}
	else if(!preg_match('/^[a-z0-9]{1,10}$/is',$_J['itemSize'])){ $js= _js::e(3,'Solo puede contener letras y/o números. Longitud máxima de 10 caracteres.'); }
	else{
		$js=false;
		if($_J['itemSzId']){
			$qe=a_sql::fetch('SELECT itemSzId,uniqSize FROM itm_grs1 WHERE itemSize=\''.$_J['itemSize'].'\' LIMIT 1',array(1=>'Error verificando que no exista el subproducto.'));
			if(a_sql::$err){ $js=a_sql::$errNoText; }
			else if(a_sql::$errNo==-1 && $qe['itemSzId']!=$_J['itemSzId']){ $js=_js::e(3,'Ya existe un subproducto con este nombre'); }
		}
		if(!$js){
			unset($_J['uniqSize']);
			$ins=a_sql::uniRow($_J,array('tbk'=>'itm_grs1','wh_change'=>'itemSzId=\''.$_J['itemSzId'].'\' LIMIT 1'));
			if(a_sql::$err){ $js=_js::e(3,'Error actualizando subproducto. '.a_sql::$errText); }
			else{
				$_J['itemSzId']=($ins['insertId'])?$ins['insertId']:$_J['itemSzId'];
				$js=_js::r('Información guardada correctamente.',array('k'=>$_J['itemSzId'],'v'=>$_J['itemSize']));
			}
		}
	}
	echo $js;
}

else if(_0s::$router=='GET sub/gr'){
	_ADMS::lib('sql/filter');
	$wh=a_sql_filtByT($_GET);
	$q=a_sql::query('SELECT grsId,grsName FROM itm_ogrs WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo grupo de subproductos.',2=>'No se encontraron resultados.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){ $Mx['L'][] = $L; }
		$js =_js::enc($Mx); unset($Mx);
	}
	echo $js;
}
else if(_0s::$router=='GET sub/gr/form'){
	$q=a_sql::fetch('SELECT grsId,grsName FROM itm_ogrs WHERE grsId=\''.$_GET['grsId'].'\' LIMIT 1',array(1=>'Error obteniendo grupo.',2=>'El grupo no existe.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{
		$q['L']=array();
		$q2=a_sql::query('SELECT itemSzId FROM itm_grs2 WHERE grsId=\''.$_GET['grsId'].'\' LIMIT 200',array(1=>'Error obteniendo grupo.'));
		if(a_sql::$errNoText!=''){ $q['L']=json_decode(a_sql::$errNoText,1); }
		else{ while($L=$q2->fetch_assoc()){ $q['L'][$L['itemSzId']]=$L['itemSzId']; } }
		$js =_js::enc2($q);
	}
	echo $js;
}
else if(_0s::$router=='PUT sub/gr'){
	if($js=_js::textMax($_J['grsName'],20,'Nombre grupo: ')){}
	else{
		$Lx=$_J['L']; unset($_J['L']);
		$ins=a_sql::uniRow($_J,array('tbk'=>'itm_ogrs','wh_change'=>'grsId=\''.$_J['grsId'].'\' LIMIT 1'));
		if(a_sql::$err){ $js=_js::e(3,'Error actualizando grupo. '.a_sql::$errText); }
		else{
			$_J['grsId']=($ins['insertId'])?$ins['insertId']:$_J['grsId'];
			$qM=array(); $errs=0;
			foreach($Lx as $n=>$L){
				/* revertir xk es seleccionado ok */
				$assig=$L['assig']; unset($L['assig']);
				$L['grsId']=$_J['grsId'];
				$qg=a_sql::fetch('SELECT I.itemCode 
				FROM itm_oitm I
				JOIN itm_grs2 G2 ON (G2.grsId=I.grsId AND G2.itemSzId=\''.$L['itemSzId'].'\')
				JOIN ivt_oitw W ON (W.itemId=I.itemId AND W.itemSzId=G2.itemSzId)
				WHERE I.grsId=\''.$L['grsId'].'\' LIMIT 1');
				if(a_sql::$errNo==1){ $js=_js::e(3,'Error revisando asignación de subproducto a grupo.'); $errs=1; break; }
				else{
					if($assig=='N' && a_sql::$errNo==-1){
						$js=_js::e(3,'No se puede eliminar un subproducto del grupo si tiene registros en la tabla de inventarios.'); $errs=1; break; 
					}
					else{
						if($assig=='N'){ a_sql::query('DELETE FROM itm_grs2 WHERE grsId=\''.$L['grsId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1'); }
						else{
							a_sql::uniRow($L,array('tbk'=>'itm_grs2','wh_change'=>'grsId=\''.$L['grsId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1'));
						}
						if(a_sql::$err){ $js=_js::e(3,'Error asignando subproducto a grupo: '.a_sql::$errText); $errs=1; break; }
					}
					if($assig=='N'){ unset($Lx[$n]); }
				}
			}
			if($errs==0){
				$Lx=array('grsId'=>$_J['grsId'],'L'=>$Lx);
				$js=_js::r('Información guardada correctamente.',$Lx);
			}
		}
	}
	echo $js;
}

?>
