<?php
$hk=preg_replace('/^(itm\.(p|mp|se))\.?.*?$/','$1',_0s::$_hashKeyR);
if(_0s::$router=='GET a'){
	_ADMS::_lb('sql/filter');
	$wh=a_sql_filtByT($_GET);
	$q=a_sql::query('SELECT itemId,itemCode,itemName,status,webStatus,itemType,udm,itemGr,sellPrice,sellUdm,buyPrice,buyUdm FROM itm_oitm I WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo listado de artículo.',2=>'No se encontraron resultados.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){ $Mx['L'][] = $L; }
		$js =_js::enc($Mx); unset($Mx);
	}
	echo $js;
}
else if(_0s::$router=='GET a/form'){ #obsoleto
	if($js=_js::ise($_GET['itemId'],'Se debe definir el ID del artículo.')){ die($js); }
	$q=a_sql::fetch('SELECT * FROM itm_oitm I WHERE itemId=\''.$_GET['itemId'].'\' LIMIT 1',array(1=>'Error obteniendo información de artículo.',2=>'No se encontró el artículo.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{
		$q2=a_sql::query('SELECT * FROM itm_itp1 WHERE itemId=\''.$_GET['itemId'].'\' ',array(1=>'Error obteniendo propiedades de artículo.'));
		$q['Prp']=array();
		if(a_sql::$err){ $q['Prp']=a_sql::$errNoText; }
		else if(a_sql::$errNo==-1){
			while($L=$q2->fetch_assoc()){
				unset($L['itemId'],$L['id']);
				foreach($L as $k=>$v){ $q['Prp'][$k]=$v; }
			}
		}
		$js =_js::enc2($q);
	}
	echo $js;
}
//#Deprecated
else if(_0s::$router=='PUT a/form'){ #obsolteto
	$_J['itemType']=strtoupper($_J['itemType']);
	$buyItem=($_J['buyItem']=='Y');
	$sellItem=($_J['sellItem']=='Y');
	$handInv=($_J['handInv']=='Y');
	$old=$_J['old'];
	unset($_J['old'],$_J['textSearch'],$_J['cardName']);
	$cst=$_J['buyItem'].$_J['sellItem'].$_J['handInv'];
	if($js=_js::ise($_J['itemCode'],'El código del artículo debe estar definido')){}
	else if(!preg_match('/^[a-z0-9\-]{1,20}$/is',$_J['itemCode'])){ $js= _js::e(3,'El código solo puede contener letras, números y -. Longitud máxima de 20 caracteres.'); }
	else if($js=_js::ise($_J['itemType'],'Se debe definir el tipo del artículo. Permitidos: P, MP o SE','/^(P|MP|SE)$/')){}
	else if($js=_js::ise($_J['itemGr'],'Se debe definir el grupo del artículo.','numeric>0')){}
	else if($js=_js::ise($_J['udm'],'La unidad de medída debe estar definida')){}
	else if($buyItem && $_J['prdItem']=='Y'){ $js=_js::e(3,'Un producto no puede ser de compra y producción a la vez.'); }
	else if($js=_js::ise($_J['itemName'],'Se debe definir el nombre del artículo.')){}
	else if(!_js::textLimit($_J['itemName'],100)){ $js= _js::e(3,'El nombre no puede exceder los 100 caracteres.'); }
	else if($buyItem && (_js::ise($_J['buyUdm']) || _js::ise($_J['buyFactor']) || _js::ise($_J['buyPrice']) )){ $js= _js::e(3,'Se debe definir la Unidad, cantidad y precio de compra.'); }
	else if($buyItem && (_js::ise($_J['buyPrice'],'','numeric>0'))){ $js= _js::e(3,'El precio de Compra debe ser un número mayor a 0.'); }
	else if($sellItem && (_js::ise($_J['sellUdm']))){ $js= _js::e(3,'Se debe definir la Unidad de venta.'); }
	else if($handInv && $handInv && (_js::ise($_J['invPrice'],'','numeric>0'))){ $js= _js::e(3,'El coste promedio manual debe ser un número mayor a 0.'); }
	else{
		$PRP=$_J['PrP']; $LG=$_J['LG'];
		unset($_J['PrP'],$_J['LG']);
		$qe=a_sql::query('SELECT itemId FROM itm_oitm WHERE itemId!=\''.$_J['itemId'].'\' AND itemCode=\''.$_J['itemCode'].'\' LIMIT 1',array(1=>'Error verificando que no exista el código.',-1=>'Ya existe un artículo con este código.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{
			$_J['handSize']='Y'; //todos usan, 1=talla unica
			$ins=a_sql::uniRow($_J,array('tbk'=>'itm_oitm','wh_change'=>'itemId=\''.$_J['itemId'].'\' LIMIT 1','getSel'=>true));
			$gS=$ins['getSel'];
			if(a_sql::$err){ $js=_js::e(1,'Error actualizando articulo. '.a_sql::$errText); }
			else{
				$itemId=($ins['insertId'])?$ins['insertId']:$_J['itemId'];
				$jsA='"itemId":"'.$itemId.'"';
				//log de updates
				print_r($gS);
				$doUpd=($_J['itemType']=='MP' && $gS['invPrice'] && $gS['invPrice']!=$_J['invPrice']);
				if($ins['affected']>0 && $doUpd){
						$vari1=($_J['invPrice']);/*variacion total */
					_ADMS::_lb('itm'); _itm::log2_put(array('updateType'=>'mpUpdatePrice','itemId'=>$itemId,'vari1'=>$vari1,'lineMemo'=>($gS['invPrice']*1).' -> '.($_J['invPrice']*1)));
				}
				$errs=0;
				if(is_array($LG)){
					a_sql::uniRow($LG,['tbk'=>'itm_oitl','wh_change'=>'itemId=\''.$itemId.'\' LIMIT 1']);
				}
				if(is_array($PRP) && count($PRP)>0){
					$Li=array('itemId'=>$itemId);
					foreach($PRP as $prpId => $L2){
						$Li[$L2['k']]=$L2['value'];
					}
					$ins2=a_sql::uniRow($Li,array('tbk'=>'itm_itp1','wh_change'=>'itemId=\''.$itemId.'\' LIMIT 1'));
					if(a_sql::$err){ $js=_js::e(3,'Artículo guardado, pero error guardando propiedades: '.a_sql::$errText); $errs++;}
				}
				if($errs==0){$js=_js::r('Información guardada correctamente.',$jsA); }
			}
		}
	}
	echo $js;
}
?>
