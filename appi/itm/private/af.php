<?php
JRoute::get('itm/af',function($D){
	$D['I.itemType']='AF';
	$D['from']='I.itemId,I.itemCode,I.itemName,I.status,I.webStatus,I.udm,I.itemGr FROM itm_oitm I';
	return a_sql::rPaging($D,false,[1=>'Error obteniendo listado de activos.',2=>'No se encontraron resultados.']);
});
JRoute::get('itm/af/form',function($D){
	if($js=_js::ise($D['itemId'],'Se debe definir el ID del artículo.')){ die($js); }
	$q=a_sql::fetch('SELECT * FROM itm_oitm I WHERE itemId=\''.$D['itemId'].'\' AND itemType=\'AF\' LIMIT 1',array(1=>'Error obteniendo información de artículo.',2=>'No se encontró el artículo.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $js =_js::enc2($q); }
	return $js;
});
JRoute::put('itm/af',function($_J){
	$_J['itemType']='AF';
	$buyItem=($_J['buyItem']=='Y');
	$prdItem=($_J['prdItem']=='Y');
	if(_js::iseErr($_J['itemCode'],'El código del artículo debe estar definido')){}
	else if(!preg_match('/^[a-z0-9\-]{1,20}$/is',$_J['itemCode'])){ _err::err('El código solo puede contener letras, números y -. Longitud máxima de 20 caracteres.',3); }
	else if(_js::iseErr($_J['itemGr'],'Se debe definir el grupo del artículo.','numeric>0')){}
	else if(_js::iseErr($_J['itemName'],'Se debe definir el nombre del artículo.')){}
	else if(_js::maxLen($_J['itemName'],100,'Nombre: ')){ }
	else if(_js::iseErr($_J['accgrId'],'Se debe definir el grupo contable del activo','numeric>0')){}
	else{
		a_sql::transaction(); $c=false;
		$qe=a_sql::query('SELECT itemId FROM itm_oitm WHERE itemId!=\''.$_J['itemId'].'\' AND itemCode=\''.$_J['itemCode'].'\' LIMIT 1',array(1=>'Error verificando que no exista el código.',-1=>'Ya existe un artículo con este código.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{
			$_J['handSize']='Y'; //todos usan, 1=talla unica
			$ins=a_sql::uniRow($_J,array('tbk'=>'itm_oitm','wh_change'=>'itemId=\''.$_J['itemId'].'\' LIMIT 1'));
			if(a_sql::$err){ _err::err('Error actualizando articulo. '.a_sql::$errText,3); }
			else{
				$itemId=($ins['insertId'])?$ins['insertId']:$_J['itemId'];
				$js=_js::r('Información guardada correctamente.','"itemId":"'.$itemId.'"');
			}
		}
		a_sql::transaction($c);
	}
	_err::errDie();
	return $js;
});
?>
