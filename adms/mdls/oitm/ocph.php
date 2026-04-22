<?php
$serieType='ocph';
if($__Ko[1]=='view'){ a_ses::hashKey('ivt.cph.basic');
	$He= Doc::view(array('docEntry'=>$D['docEntry'],'sel_otb'=>'docStatus,docDate,whsId,lineMemo FROM '._0s::$Tb['ivt_ocph']));
	if(!is_array($He)){ echo $He; }
	else{
		$ql=a_sql::query('SELECT B.tt,B.tr,B.lineNum,B.itemIdFrom,B.itemSzIdFrom, B.itemIdTo,B.itemSzIdTo,B.quantity FROM '._0s::$Tb['ivt_cph1'].' B WHERE docEntry=\''.$D['docEntry'].'\' ',array(1=>'Error obteniendo lineas del documento: '));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ _ADMS::_lb('itm');
			$He['L']=array();
			while($L=$ql->fetch_assoc()){
				$qi=_itm::getInfo(array('itemId'=>$L['itemIdFrom']));
				$qi2=_itm::getInfo(array('itemId'=>$L['itemIdTo']));
				$L['itemCodeFrom']=$qi['itemCode']; $L['itemNameFrom']=$qi['itemName'];
				$L['itemCodeTo']=$qi2['itemCode']; $L['itemNameTo']=$qi2['itemName'];
				$He['L'][$L['lineNum']]=$L;
			}
			$js=_js::enc($He,'NO_PAGER');
		}
	}
	echo $js;
}
else if($__Ko[1]=='transfer'){  a_ses::hashKey('ivt.cph.basic');
	if($js=Ivt::docStatus(array('serieType'=>$serieType,'docEntry'=>$D['docEntry']))){
		die($js);
	}
	else{
		$q=a_sql::query('SELECT A.whsId,B.itemIdFrom,B.itemSzIdFrom, B.itemIdTo,B.itemSzIdTo,B.quantity FROM '._0s::$Tb['ivt_cph1'].' B JOIN '._0s::$Tb['ivt_ocph'].' A ON (A.docEntry=B.docEntry) WHERE A.docEntry=\''.$D['docEntry'].'\' ',array(1=>'Error obteniendo artículos para cambio:',2=>'El documento no tiene lineas guardadas.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{
			$Ii=array(); $Liv=array();
			//from aumenta, to disminuye
			$docDate=date('Y-m-d');
			while($L=$q->fetch_assoc()){
				// $Ii[]=array('itemId'=>$L['itemIdFrom'],'itemSzId'=>$L['itemSzIdFrom'],'whsId'=>$L['whsId'],'quantity'=>$L['quantity'],'docDate'=>$docDate);
				// $Ii[]=array('itemId'=>$L['itemIdTo'],'itemSzId'=>$L['itemSzIdTo'],'whsId'=>$L['whsId'],'quantity'=>-$L['quantity'],'docDate'=>$docDate);
				$Liv[]=array('itemId'=>$L['itemIdFrom'],'itemSzId'=>$L['itemSzIdFrom'],'whsId'=>$L['whsId'],'inQty'=>$L['quantity']);
				$Liv[]=array('itemId'=>$L['itemIdTo'],'itemSzId'=>$L['itemSzIdTo'],'whsId'=>$L['whsId'],'outQty'=>$L['quantity']);
			}
			_ADMS::_lb('src/Invt');
			a_sql::transaction(); $commit='c';
			Invt::onHand_put($Liv,array('docDate'=>date('Y-m-d'),'tt'=>$serieType,'tr'=>$___D['docEntry']));
			if(Invt::$err){ $js= Invt::$errText; }
			//$R=Whs::onHand_p($Ii,array('tt'=>$serieType,'tr'=>$D['docEntry']));
			//if(a_sql::$err){ $js=a_sql::$errNoText;  $commit='rollback'; }
			else{
				$upd=a_sql::query('UPDATE '._0s::$Tb['ivt_ocph'].' SET docStatus=\'C\', invMov=\'Y\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error actualizando estado del documento: '));
				if(a_sql::$err){ $js=a_sql::$errNoText; $commit='rollback'; }
				else{ $js=_js::r('Documento Actualizado correctamente.'); }
			}
			a_sql::transaction($commit);
		}
	}
	echo $js;
}
else{ a_ses::hashKey('ivt.cph.basic');
if($__M=='PUT'){
	_ADMS::_lb('com/_2d');
	if(!_js::ise($D['docEntry']) && $js=Ivt::docStatus(array('serieType'=>$serieType,'docEntry'=>$D['docEntry']))){
		die($js);
	}
	else if($js=_js::ise($D['docDate'],'La fecha debe estar definida y no ser menor a hoy','today<0')){ die($js); }
	else if($js=_js::ise($D['whsId'],'Se debe definir la bodega.','numeric>0')){ die($js); }
	else if(!($js=_js::textLimit($D['lineMemo'],100,'La observación no puede excerder 100 caracteres.'))){ die($js); }
	else if(count($D['L'])<=0){ $js=_js::e(3,'No se recibieron lineas.'); }
	else{
		$L=$D['L']; unset($D['L']); $errs=0; $rows=0;
		foreach($L as $n=>$D2){ $ln='Linea '.$n.': ';
			$v=(($D2['tt'].$D2['tr'].$D2['itemId'].$D2['itemSzId'].$D2['quantity'])!='');
			if(!$v){ unset($L[$n]); continue; }
			else if($v && (_js::ise($D2['tt']) || _js::ise($D2['tr']))){ $js=_js::e(3,$ln.'Se debe definir el tipo y número de documento.'); $errs++; break; }
			else if($v && (_js::ise($D2['itemIdFrom']) || _js::ise($D2['itemSzIdFrom']))){ $js=_js::e(3,$ln.'Se debe definir el producto y talla original ('.$D2['itemIdFrom'].'-'.$D2['itemSzIdFrom'].').'); $errs++; break; }
			else if($v && (_js::ise($D2['itemIdTo']) || _js::ise($D2['itemSzIdTo']))){ $js=_js::e(3,$ln.'Se debe definir el producto y talla para cambio ('.$D2['itemIdTo'].'-'.$D2['itemSzIdTo'].').'); $errs++; break; }
			else if($v && $D2['itemIdFrom'].$D2['itemSzIdFrom']== $D2['itemIdTo'].$D2['itemSzIdTo']){ $js=_js::e(3,$ln.'El artículo original y el del cambio son identicos.'); $errs++; break; }
			else if($v && _js::ise($D2['quantity'],0,'numeric>0')){ $js=_js::e(3,$ln.'Defina una cantidad mayor a 0.'); $errs++; break; }
			$rows++;
		}
		if($rows==0 && $errs==0){ $js=_js::e(3,'No se recibieron lineas 2.'); }
		else if($errs==0){
			$ins=a_sql::insert($D,array('tbk'=>'ivt_ocph','ou_dateC'=>1,'wh_change'=>'WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1'));
			$docEntry=($ins['insertId'])?$ins['insertId']:$D['docEntry'];
			$jsA='"docEntry":"'.$docEntry.'"';
			if($ins['err']){ $js=_js::e(1,'Error guardando documento: '.$ins['text']); }
			else{
				a_sql::transaction(); $commit='c';
				$js=_js::r('Documento creado correctamente',$jsA);
				foreach($L as $n=>$D2){ $ln='Linea '.$n.': ';
					$D2['docEntry']=$docEntry; $D2['lineNum']=$n;
					$ins2=a_sql::insert($D2,array('tbk'=>'ivt_cph1','wh_change'=>'WHERE docEntry=\''.$D2['docEntry'].'\' AND lineNum=\''.$D2['lineNum'].'\' LIMIT 1'));
					if($ins2['err']){ $js=_js::e(3, $l.'Error guardando lineas del documento: '.$ins2['text'],$jsA); $errs++; $commit='rollback'; break; }
				}
				a_sql::transaction($commit);
			}
		}
	}
	echo $js;
}
else if($__M=='GET'){
	$D['fromA']='A.* FROM '._0s::$Tb['ivt_ocph'].' A ';
	echo Doc::get($D);
}
}
?>