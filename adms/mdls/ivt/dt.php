<?php
if(_0s::$router=='POST dt/ivtAwh'){
	if(_js::isArray($_J['L'])){ die(_err::err('No se enviaron lineas en el documento',3)); }
	a_sql::transaction(); $c=false;
	$docEntry=a_sql::nextAI(['tb'=>'ivt_oawh']);
	_err::errDie();
	$_J['docEntry']=$docEntry;
	if(_js::iseErr($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){ $js=_err::$errText; }
	else if(_js::iseErr($_J['serieId'],'Se debe definir el Id de la serie','numeric>0')){ $js=_err::$errText; }
	else if(_js::iseErr($_J['whsId'],'Se debe definir la bodega')){ $js=_err::$errText; }
	else{
		$Bod=array();
		$ITM=array();
		//Obtener bodegas
		$w=a_sql::fetch('SELECT whsCode,whsId FROM ivt_owhs WHERE whsId=\''.$_J['whsId'].'\' LIMIT 1',array(1=>'Error obteniendo bodega.',2=>'No existe la bodega definida.'));
		$whsId=0;
		if(a_sql::$err){ die(a_sql::$errNoText); }
		$whsId=$w['whsId'];
		$DC=array('docEntry'=>$docEntry,'docDate'=>date('Y-m-d'),
		'omitCard'=>'Y','cardName'=>'Sistema',
		'serieId'=>$_J['serieId'],'whsId'=>$whsId,
		'lineMemo'=>'Generado desde Data Transfer.');
		$DC['L']=array();
		/* generar */
		$Di=array(); $qI=array();
		foreach($_J['L'] as $ln => $Da){
			$lnt = 'Linea '.$ln.': '; $a = ' Actual: ';
			$lineTotal++;
			$Da['docEntry']=$docEntry;
			$Da['quantity']=preg_replace('/(\s|\t\n)+/','',$Da['quantity']);
			if($js=_js::ise($Da['docEntry'],$lnt.'Se debe definir el número de documento','numeric>0')){ die($js); }
			else if($js=_js::ise($Da['itemCode'],$lnt.'Se debe definir el código del producto.')){ die($js); }
			else if($js=_js::ise($Da['itemSzId'],$lnt.'Se debe definir el ID del Subproducto.')){ die($js); }
			else if($js=_err::iff($Da['quantity']<0,$lnt.'La cantidad a definir no puede ser negativa.')){ die($js); }
			else{
				//verificar articulo
				$quk=$Da['itemCode'];
				$QK1=_uniK::fromQuery(['k'=>$Da['itemCode'],'f'=>'itemId','from'=>'itm_oitm','wh'=>'itemCode=\''.$Da['itemCode'].'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El código del articulo ('.$Da['itemCode'].') no existe']);
				if(_err::$err){ die(_err::$errText); }
				/* verificar s/p
				$QK2=_uniK::fromQuery(['k'=>'sp_'.$Da['itemSzId'],'f'=>'itemSzId','from'=>'itm_grs1','wh'=>'itemSize=\''.$Da['itemSzId'].'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El subproducto ('.$Da['itemSzId'].') no existe']);
				if(_err::$err){ die(_err::$errText); }
				*/
				$DC['L'][]=array(
				'handInv'=>'Y','itemId'=>$QK1['itemId'],'itemSzId'=>$Da['itemSzId'],'quantity'=>$Da['quantity']);
			}
		}//for
	}
	if($js==false){
		_ADMS::lib('iDoc,docSeries');
		_ADMS::mApps('ivt/Awh');
		$js=ivtAwh::post($DC);
		if(_err::$err){ $js=_err::$errText; }
		else{ $c=true; $js=_js::r('Proceso realizado correctamente'); }
	}
	a_sql::transaction($c);
	echo $js;
}

else if(_0s::$router=='POST dt/ivtRiv'){
	if(_js::isArray($_J['L'])){ die(_err::err('No se enviaron lineas en el documento',3)); }
	a_sql::transaction(); $c=false;
	$docEntry=a_sql::nextAI(['tb'=>'ivt_oriv']);
	_err::errDie();
	$js=false;
	//die(print_r($R));
	$_J['docEntry']=$docEntry;
	if(_js::iseErr($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){ $js=_err::$errText; }
	else if(_js::iseErr($_J['serieId'],'Se debe definir el Id de la serie','numeric>0')){ $js=_err::$errText; }
	else if(_js::iseErr($_J['whsId'],'Se debe definir la bodega')){ $js=_err::$errText; }
	else{
		$Bod=array();
		$ITM=array();
		//Obtener bodegas
		$w=a_sql::fetch('SELECT whsCode,whsId FROM ivt_owhs WHERE whsId=\''.$_J['whsId'].'\' LIMIT 1',array(1=>'Error obteniendo bodega.',2=>'No existe la bodega definida.'));
		$whsId=0;
		if(a_sql::$err){ die(a_sql::$errNoText); }
		$whsId=$w['whsId'];
		$DC=array('docEntry'=>$docEntry,'docDate'=>date('Y-m-d'),
		'omitCard'=>'Y','cardName'=>'Sistema',
		'serieId'=>$_J['serieId'],'whsId'=>$whsId,
		'lineMemo'=>'Generado desde Data Transfer.');
		$DC['L']=array();
		/* generar */
		$Di=array(); $qI=array(); $ln=3;
		foreach($_J['L'] as $x => $Da){
			$lnt = 'Linea '.$ln.': '; $a = ' Actual: '; $ln++;
			$lineTotal++;
			$Da['docEntry']=$docEntry;
			if($js=_js::ise($Da['docEntry'],$lnt.'Se debe definir el número de documento','numeric>0')){ break; }
			else if($js=_js::ise($Da['itemCode'],$lnt.'Se debe definir el código del producto.')){ break; }
			else if($js=_js::ise($Da['itemSzId'],$lnt.'Se debe definir el ID del Subproducto.')){ break; }
			else if($js=_err::iff($Da['quantity']<0,$lnt.'La cantidad a definir no puede ser negativa.')){ break; }
			else if($js=_err::iff($Da['priceLine']<0,$lnt.'El valor unitario no puede ser negativa.')){ break; }
			else{
				//verificar articulo
				$quk=$Da['itemCode'];
				$QK1=_uniK::fromQuery(['k'=>$Da['itemCode'],'f'=>'itemId','from'=>'itm_oitm','wh'=>'itemCode=\''.$Da['itemCode'].'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El código del articulo ('.$Da['itemCode'].') no existe']);
				if(_err::$err){ die(_err::$errText); }
				/* verificar s/p
				$QK2=_uniK::fromQuery(['k'=>'sp_'.$Da['itemSzId'], 'f'=>'itemSzId','from'=>'itm_grs1','wh'=>'itemSize=\''.$Da['itemSzId'].'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El subproducto ('.$Da['itemSzId'].') no existe']);
				if(_err::$err){ die(_err::$errText); }
				*/
				$DC['L'][]=array(
				'handInv'=>'Y','itemId'=>$QK1['itemId'],'itemSzId'=>$Da['itemSzId'],'quantity'=>$Da['quantity'],'priceLine'=>$Da['priceLine']);
			}
		}//for
	}
	if($js==false){
		_ADMS::lib('iDoc,docSeries');
		_ADMS::mApps('ivt/Riv');
		$js=ivtRiv::post($DC);
		if(_err::$err){ $js=_err::$errText; }
		else{ $c=true; $js=_js::r('Proceso realizado correctamente'); }
	}
	a_sql::transaction($c);
	echo $js;
}

else if(_0s::$router=='POST dt/ivtItmN'){
	$js=false;
	if(_js::isArray($_J['L'])){ $js=_err::err('No se enviaron lineas en el documento',3); }
	else{
		$qI=array(); $ln=3;
		foreach($_J['L'] as $x => $Da){
			$Da['webStatus']='active';
			$lnt = 'Linea '.$ln.': '; $a = ' Actual: '; $ln++;
			$lineTotal++;
			if($js=_js::ise($Da['itemCode'],$lnt.'Se debe definir el código del producto.')){ die($js); }
			else if($js=_js::ise($Da['itemName'],$lnt.'Se debe definir el .')){ die($js); }
			else{
				$qL=a_sql::fetch('SELECT itemName FROM itm_oitm WHERE itemCode=\''.$Da['itemCode'].'\' LIMIT 1',[1=>$lnt.'Error verificando codido definido']);
				if(a_sql::$err){ die(a_sql::$errNoText); }
				else if(a_sql::$errNo==-1){ die(_err::err($lnt.'El código '.$Da['itemCode'].' ya esta siendo usando por el articulo: '.$qL['itemName'],3)); }
				$Da[0]='i'; $Da[1]='itm_oitm';
				$qI[]=$Da;
			}
		}//for
	}
	if($js==false){
		a_sql::transaction(); $c=false;
		a_sql::multiQuery($qI);
		if(_err::$err){ echo _err::$errText; }
		else{ $c=true; echo _js::r('Datos actualizados correctamente.'); }
		a_sql::transaction($c);
	}
	else{ echo $js; }
}

else if(_0s::$router=='POST dt/itmBc'){
	$js=false;
	if(_js::isArray($_J['L'])){ $js=_err::err('No se enviaron lineas en el documento',3); }
	else{
		$qI=array(); $ln=3;
		foreach($_J['L'] as $x => $Da){
			$lnt = 'Linea '.$ln.': '; $a = ' Actual: '; $ln++;
			$lineTotal++;
			if($js=_js::ise($Da['itemId'],$lnt.'Se debe definir el código del producto.')){ die($js); }
			else{
				$QK1=_uniK::fromQuery(['k'=>$Da['itemId'],'f'=>'itemId','from'=>'itm_oitm','wh'=>'itemCode=\''.$Da['itemId'].'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El código del articulo ('.$Da['itemId'].') no existe']);
				if(_err::$err){ die(_err::$errText); }
				$Da[0]='i'; $Da[1]='itm_bar1';
				$Da['itemId']=$QK1['itemId'];
				$qI[]=$Da;
			}
		}//for
	}
	if($js==false){
		a_sql::transaction(); $c=false;
		a_sql::multiQuery($qI);
		if(_err::$err){ echo _err::$errText; }
		else{ $c=true; echo _js::r('Códigos asinagos correctamente.'); }
		a_sql::transaction($c);
	}
	else{ echo $js; }
}
JRoute::post('ivt/dt/ivtItm',function($R){
	$js=false;
	if($R['errNo']){ $js = _js::e($R); }
	else{
		$qI=array(); $ln=2;
		foreach($R['L'] as $nx => $Da){ $ln++;
			$lnt = 'Linea '.$ln.': '; $a = ' Actual: ';
			$lineTotal++;
			if($js=_js::ise($Da['itemCode'],$lnt.'Se debe definir el código del producto.')){ die($js); }
			else{
				$quk=$Da['itemCode'];
				$QK=_uniK::fromQuery(array('k'=>$Da['itemCode'],'f'=>'itemId','from'=>'itm_oitm','wh'=>'itemCode=\''.$quk.'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El código del articulo ('.$quk.') no existe'));
				if(_err::$err){ die(_err::$errText); }
				$Da[0]='u'; $Da[1]='itm_oitm'; $Da['_wh']='itemId=\''.$QK['itemId'].'\' LIMIT 1';
				unset($Da['itemCode']);
				$qI[]=$Da;
			}
		}//for
	}
	if($js==false){
		a_sql::multiQuery($qI);
		if(_err::$err){ echo _err::$errText; }
		else{ echo _js::r('Datos actualizados correctamente.'); }
	}
	else{ echo $js; }
});
?>