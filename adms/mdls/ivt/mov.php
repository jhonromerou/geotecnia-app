<?php
$serieType='ivtMov';
Doc::$owh=false;
if(_0s::$router=='GET mov'){ a_ses::hashKey('ivt.mov');
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.docEntry,A.docDate,A.docStatus,A.lineMemo,A.userId,A.dateC,A.docClass FROM ivt_omov A';
	echo iDoc::get($_GET);
}
else if(_0s::$router=='POST mov'){ a_ses::hashKey('ivt.mov');
	if($js=_js::ise($___D['docDate'],'Se debe definir la fecha.')){ die($js); }
	else if($js=_js::ise($___D['cardId'],'Se debe definir el socio de negocios.')){ die($js); }
	else if($js=_js::ise($___D['cardName'],'Se debe definir el socio de negocios.')){ die($js); }
	else if($js=_js::ise($___D['docClass'],'Se debe definir la clasificación.')){ die($js); }
	else if(!_js::textLimit($___D['lineMemo'],100)){ $js=_js::e(3,'Los detalles no pueden exceder 100 caracteres.'); }
	else if(!is_array($___D['L']) || count($___D['L'])==0){ die(_js::e(3,'No se han enviado lineas a guardar.')); }
	else{
		$Ld=$___D['L']; unset($___D['L'],$___D['cardName']);
		$errs=0;
		_ADMS::_app('Ivt');
		foreach($Ld as $n => $L){/* verificar linea e inventario */
			$ln='Linea '.$n.': ';
			if($js=_js::ise($L['itemId'],$ln.'Se debe definir el ID del artículo.','')){ $errs++; break; }
			else if($js=_js::ise($L['itemSzId'],$ln.'Se debe definir el ID de la talla del artículo.','',$jsA)){ $errs++; break; }
			else if($js=_js::ise($L['whsId'],$ln.'Se debe definir la bodega.','')){ $errs++; break; }
			else if($js=_js::ise($L['quantity'],$ln.'Se debe definir la cantidad a ingresar','',$jsA)){ $errs++; break; }
			else{
				if($L['lineType']=='O'){
					Ivt::onHand($L);
					if(_err::$err){ $js=_err::$errText; $errs++; break; }
				}
				$Ld[$n]['lineNum']=$n;
			}
		}
		if($errs==0){ /* generar lineas */
			a_sql::transaction(); $cmt=false;
			$docEntry=a_sql::qInsert($___D,array('tbk'=>'ivt_omov','qk'=>'ud'));
			if(a_sql::$err){ $js=_js::e(3,'Error guardando documento: '.a_sql::$errText); $errs++; }
			else{ $Liv=array();
			foreach($Ld as $n=>$L){
				$L['docEntry']=$docEntry;
				a_sql::qInsert($L,array('tbk'=>'ivt_mov1'));
				if(a_sql::$err){ $js=_js::e(3,'Error guardando linea: '.a_sql::$errText,$jsA); $errs++; break; }
				else{
					if($L['lineType']=='O'){ $Liv[]=array('itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'whsId'=>$L['whsId'],'outQty'=>$L['quantity']); }
					else{
						$Liv[]=array('itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'whsId'=>$L['whsId'],'inQty'=>$L['quantity']);
					}
				}
			}
			}
		}
		if($errs==0){/* actualizar inventario */
			Ivt::onHand_put($Liv,array('tt'=>$serieType,'tr'=>$docEntry,'docDate'=>$___D['docDate']));
			if(_err::$err){ $errs++; $js=_err::$errText; }
		}
		if($errs==0){ $js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"'); a_sql::transaction(true); }
		
	}
	echo $js;
}
else if(_0s::$router=='GET mov/view'){ a_ses::hashKey('ivt.mov');
	_ADMS::lib('iDoc');
	echo iDoc::getOne(array('docEntry'=>$_GET['docEntry'],'fromA'=>'A.docEntry,A.docDate,A.docStatus,A.lineMemo,A.userId,A.dateC,A.docClass FROM ivt_omov A','fromB'=>'B.lineNum,B.itemId,B.itemSzId,I.itemCode,I.itemName,B.lineType,B.whsId,B.quantity FROM ivt_mov1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
else if(_0s::$router=='PUT mov/statusCancel'){ a_ses::hashKey('ivt.mov');
	_ADMS::lib('iDoc');
	a_sql::transaction(); $___D['serieType']=$serieType;
	$___D['t']='N'; $___D['tbk']='ivt_omov';
	$___D['closeOmit']='Y';
	iDoc::putStatus($___D);
	if(_err::$err){ $js=_err::$errText; }
	else{
		_ADMS::_app('Ivt');
		Ivt::onHand_rever(array('tt'=>$serieType,'tr'=>$___D['docEntry'],'docDate'=>date('Y-m-d')));
		if(_err::$err){ $js=_err::$errText; }
		else{ $js=_js::r('Documento anulado correctamente.'); a_sql::transaction(true); }
	}
	echo $js;
}
?>