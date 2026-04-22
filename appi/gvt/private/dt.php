<?php
JRoute::post('gvt/dt/sdn',function($_J){
	if(_js::isArray($_J['L'])){ die(_err::err('No se enviaron lineas en el documento',3)); }
	else if(_js::iseErr($_J['cardId'],'Se debe definir el Id del tercero','numeric>0')){ $js=_err::$errText; }
	else if(_js::iseErr($_J['docDate'],'Se debe definir la fecha')){ $js=_err::$errText; }
	else if(_js::iseErr($_J['serieId'],'Se debe definir el Id de la serie','numeric>0')){ $js=_err::$errText; }
	else if(_js::iseErr($_J['whsId'],'Se debe definir el almacen')){ $js=_err::$errText; }
	else{
		$Bod=array();
		$ITM=array();
    //obtener clientes
    $qC=a_sql::fetch('SELECT cardName,cityCode,countyCode,address,slpId FROM par_ocrd WHERE cardId=\''.$_J['cardId'].'\' LIMIT 1',[1=>'Error consultando tercero del documento',2=>'El tercero no existe']);
    if(a_sql::$err){ die(a_sql::$errNoText); }
		//Obtener bodegas
		$w=a_sql::fetch('SELECT whsCode,whsId FROM ivt_owhs WHERE whsId=\''.$_J['whsId'].'\' LIMIT 1',array(1=>'Error obteniendo bodega.',2=>'No existe el almacen definido.'));
		$whsId=0;
		if(a_sql::$err){ die(a_sql::$errNoText); }
		$whsId=$w['whsId'];
		$DC=array('docDate'=>$_J['docDate'],
		'cardId'=>$_J['cardId'],'cardName'=>$qC['cardName'],'slpId'=>$qC['slpId'],'cityCode'=>$qC['cityCode'],'countyCode'=>$qC['countyCode'],'address'=>$qC['address'],
		'serieId'=>$_J['serieId'],'whsId'=>$whsId,
		'lineMemo'=>'Generado por DT. '.$_J['lineMemo']);
		$DC['L']=array();
		/* generar */
		$Di=array(); $qI=array();
		foreach($_J['L'] as $ln => $Da){
			$lnt = 'Linea '.$ln.': '; $a = ' Actual: ';
			$lineTotal++;
			$Da['quantity']=preg_replace('/(\s|\t\n)+/','',$Da['quantity']);
			if($js=_js::ise($Da['itemCode'],$lnt.'Se debe definir el código del producto.')){ die($js); }
			else if($js=_js::ise($Da['itemSzId'],$lnt.'Se debe definir el ID del subproducto.')){ die($js); }
			else if($js=_err::iff($Da['quantity']<0,$lnt.'La cantidad a definir no puede ser negativa.')){ die($js); }
			else{
				//verificar articulo
				$quk=$Da['itemCode'];
				$QK1=_uniK::fromQuery(['k'=>$Da['itemCode'],'f'=>'itemId,handInv','from'=>'itm_oitm','wh'=>'itemCode=\''.$Da['itemCode'].'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El código del articulo ('.$Da['itemCode'].') no existe']);
				if(_err::$err){ die(_err::$errText); }
				/* verificar s/p
				$QK2=_uniK::fromQuery(['k'=>'sp_'.$Da['itemSzId'],'f'=>'itemSzId','from'=>'itm_grs1','wh'=>'itemSize=\''.$Da['itemSzId'].'\'',
				1=>$lnt.'Error obteniendo Id de articulo.',2=>$lnt.'El subproducto ('.$Da['itemSzId'].') no existe']);
				if(_err::$err){ die(_err::$errText); }
				*/
				$DC['L'][]=array('itemId'=>$QK1['itemId'],'itemSzId'=>$Da['itemSzId'],'quantity'=>$Da['quantity'],'handInv'=>$QK1['handInv']);
			}
		}//for
	}
  _err::errDie();
	if($js==false){
		_ADMS::libC('gvt','sdn');
		$js=gvtSdn::post($DC);
		if(_err::$err){ $js=_err::$errText; }
		else{ $c=true; $js=_js::r('Proceso realizado correctamente'); }
	}
	echo $js;
});
?>