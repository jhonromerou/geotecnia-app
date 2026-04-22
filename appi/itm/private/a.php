<?php
JRoute::get('itm/a',function($D){
	switch($D['orderBy']){
		case 'code': $D['orderBy']='I.itemCode ASC'; break;
		case 'name': $D['orderBy']='I.itemName ASC'; break;
		case 'itemGr': $D['orderBy']='Gr.value ASC'; break;
	}
	$D['from']='I.itemId,I.itemCode,I.itemName,I.status,I.webStatus,I.itemType,I.udm,I.itemGr,I.sellPrice,I.sellUdm,I.buyPrice,I.buyUdm,I.handInv,I.sellItem,I.buyItem,I.prdItem FROM itm_oitm I
	LEFT JOIN itm_ojsv Gr on (Gr.vid=itemGr)
	';
	return a_sql::rPaging($D,false,[1=>'Error obteniendo listado de artículo.',2=>'No se encontraron resultados.']);
});
JRoute::get('itm/a/form',function($D){
	if($js=_js::ise($D['itemId'],'Se debe definir el ID del artículo.')){ die($js); }
	$q=a_sql::fetch('SELECT I.*,C.cardName FROM itm_oitm I
	LEFT JOIN par_ocrd C ON (C.cardId=I.cardId)
	WHERE I.itemId=\''.$D['itemId'].'\' LIMIT 1',array(1=>'Error obteniendo información de artículo.',2=>'No se encontró el artículo.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{
		$q['LG']=a_sql::fetch('SELECT * FROM itm_oitl WHERE itemId=\''.$_GET['itemId'].'\' LIMIT 1');
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
	return $js;
});
JRoute::put('itm/a/form',function($_J){
	$_J['itemType']=strtoupper($_J['itemType']);
	$buyItem=($_J['buyItem']=='Y');
	$sellItem=($_J['sellItem']=='Y');
	$handInv=($_J['handInv']=='Y');
	$prdItem=($_J['prdItem']=='Y');
	$old=$_J['old'];
	unset($_J['old'],$_J['textSearch'],$_J['cardName']);
	$cst=$_J['buyItem'].$_J['sellItem'].$_J['handInv'];
	if($_J['itemCode']!='' && !preg_match('/^[a-z0-9\-]{1,20}$/is',$_J['itemCode'])){ $js= _js::e(3,'El código solo puede contener letras, números y -. Longitud máxima de 20 caracteres.'); }
	else if($_J['itemCode']!='' && preg_match('/^0/is',$_J['itemCode'])){ $js= _js::e(3,'El código no puede empezar por 0.'); }
	else if($js=_js::ise($_J['itemType'],'Se debe definir el tipo del artículo. Permitidos: P, MP,SE,AI','/^(P|MP|SE|AI)$/')){}
	//else if($js=_js::ise($_J['itemGr'],'Se debe definir el grupo del artículo.','numeric>0')){}
	else if($js=_js::ise($_J['udm'],'La unidad de medída debe estar definida')){}
	else if($buyItem && $prdItem){ $js=_js::e(3,'Un producto no puede ser de compra y producción a la vez.'); }
	else if($js=_js::ise($_J['itemName'],'Se debe definir el nombre del artículo.')){}
	else if(!_js::textLimit($_J['itemName'],200)){ $js= _js::e(3,'El nombre no puede exceder los 200 caracteres.'); }
	else if($buyItem && (_js::ise($_J['buyUdm']) || _js::ise($_J['buyFactor']) || _js::ise($_J['buyPrice']) )){ $js= _js::e(3,'Se debe definir la Unidad, cantidad y precio de compra.'); }
	else if($buyItem && (_js::ise($_J['buyPrice'],'','numeric>0'))){ $js= _js::e(3,'El precio de Compra debe ser un número mayor a 0.'); }
	else if($sellItem && (_js::ise($_J['sellUdm'])  || _js::ise($_J['sellFactor']))){ $js= _js::e(3,'Se debe definir la Unidad y cantidad de venta.'); }
	else if($js=_js::ise($_J['accgrId'],'Se debe definir el grupo contable del articulo','numeric>0')){}
	//else if($handInv && (_js::ise($_J['invPrice'],'','numeric'))){ $js= _js::e(3,'El coste promedio manual debe ser un número mayor a 0.'); }
	else{
		a_sql::transaction(); $c=false;
		$PRP=$_J['PrP']; $LG=$_J['LG'];
		unset($_J['PrP'],$_J['LG']);
		a_sql::fUnique(['fie'=>'itemName','from'=>'itm_oitm WHERE itemId!=\''.$_J['itemId'].'\' AND itemCode=\''.$_J['itemCode'].'\''],'Codigo: ');
		if(_err::$err){ $js=_err::$errText; }
		else{
			$_J['handSize']='Y'; //todos usan, 1=talla unica
			$ins=a_sql::uniRow($_J,array('tbk'=>'itm_oitm','wh_change'=>'itemId=\''.$_J['itemId'].'\' LIMIT 1','getSel'=>true));
			$gS=$ins['getSel'];
			if(a_sql::$err){ $js=_js::e(1,'Error actualizando articulo. '.a_sql::$errText); }
			else{
				$itemId=($ins['insertId'])?$ins['insertId']:$_J['itemId'];
				$jsA='"itemId":"'.$itemId.'"';
				// Registrar actualización de costo en fichas si varia
				$doUpd=($_J['itemType']!='P' && $gS['invPrice'] && $gS['invPrice']!=$_J['invPrice']);
				if($ins['affected']>0 && $doUpd){
						$vari1=($_J['invPrice']);/*variacion total */
					_ADMS::_lb('itm'); _itm::log2_put(array('updateType'=>'mpUpdatePrice','itemId'=>$itemId,'vari1'=>$vari1,'lineMemo'=>($gS['invPrice']*1).' -> '.($_J['invPrice']*1)));
				}
				$errs=0;
				if(is_array($LG)){ $LG['itemId']=$itemId;
					a_sql::uniRow($LG,['tbk'=>'itm_oitl','wh_change'=>'itemId=\''.$itemId.'\' LIMIT 1']);
					if(a_sql::$err){ $js=_js::e(3,'Error guardando datos de logistica: '.a_sql::$errText); $errs++;}
				}
				if(!_js::isArray($PRP)){
					$Li=array('itemId'=>$itemId);
					foreach($PRP as $prpId => $L2){
						$Li[$L2['k']]=$L2['value'];
					}
					$ins2=a_sql::uniRow($Li,array('tbk'=>'itm_itp1','wh_change'=>'itemId=\''.$itemId.'\' LIMIT 1'));
					if(a_sql::$err){ $js=_js::r('Artículo guardado, pero no se asignaron las propiedades: '.a_sql::$errText); $errs++; $c=true;}
				}
				if($errs==0){ $c=true; $js=_js::r('Información guardada correctamente.',$jsA); }
			}
		}
		a_sql::transaction($c);
	}
	echo $js;
});
?>