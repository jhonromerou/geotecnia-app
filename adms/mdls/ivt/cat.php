<?php
$serieType='ocat';
Doc::$owh=false;
function barCode_docLine($D=array()){
	if($js=_js::ise($D['docEntry'],'El número de documento no está definido correctamente.','numeric>0')){ return $js; }
	else if(iDoc::vStatus(array('tbk'=>'ivt_ocat','docEntry'=>$D['docEntry']))){ return _err::$errText; }
	$Ds=json_decode($D['D'],1); unset($D['D']);
	if(count($Ds)<=0){ $js=_js::e(3,'No se obtuvieron lineas para guardar en el documento.'); }
	else{
		a_sql::transaction(); $cmt=false;
		$quantity=0; $errs=0;
		foreach($Ds as $n=>$L){
			$L['breads']=$L['reads']; unset($L['reads']);
			$L['docEntry']=$D['docEntry'];
			$L[0]='i'; $L[1]='ivt_cat1';
			$Ds[$n]=$L;
			$quantity += $L['quantity'];
		}
		a_sql::multiQuery($Ds);
		if(_err::$err){ $js=_err::$errText; $errs=1; }
		if($errs==0){ $cmt=true;
			$js = _js::r('Se guardaron '.$quantity.' unidades correctamente.');
		}
		a_sql::transaction($cmt);
	}
	return $js;
}

unset($___D['serieType'],$___D['textSearch']);
if(_0s::$router=='GET cat'){ a_ses::hashKey('ivt.cat.basic');
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.* FROM ivt_ocat A';
	echo iDoc::get($_GET);
}
else if(_0s::$router=='POST cat'){ a_ses::hashKey('ivt.cat.basic');
	if($js=_js::ise($___D['docDate'],'Se debe definir la fecha.')){ die($js); }
	else if($js=_js::ise($___D['cardId'],'Se debe definir el socio de negocios.')){ die($js); }
	else if($js=_js::ise($___D['cardName'],'Se debe definir el socio de negocios.')){ die($js); }
	else if($js=_js::ise($___D['docClass'],'Se debe definir la clasificación.')){ }
	else if($js=_js::ise($___D['whsId'],'Se debe definir la bodega.','')){}
	else if(!_js::textLimit($___D['lineMemo'],200)){ $js=_js::e(3,'Los detalles no pueden exceder 200 caracteres.'); }
	else{
		$docEntry=a_sql::qInsert($___D,array('tbk'=>'ivt_ocat','qk'=>'ud'));
		if(a_sql::$err){ $js=_js::e(3,'Error guardando documento: '.a_sql::$errText); $errs++; }
		else{ $js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			_ADMS::lib('iDoc');
			iDoc::logPost(array('serieType'=>$serieType,'docEntry'=>$docEntry,'dateC'=>1));
		}
	}
	echo $js;
}
else if(_0s::$router=='GET cat/view'){ a_ses::hashKey('ivt.cat.basic');
	_ADMS::lib('iDoc');
	$gb='B.itemId,B.itemSzId, B.itemId,B.itemSzId,I.itemCode,I.itemName';
	echo iDoc::getOne(array('docEntry'=>$_GET['docEntry'],'fromA'=>'A.* FROM ivt_ocat A','fromB'=>$gb.',SUM(B.quantity) quantity,SUM(B.breads) breads FROM ivt_cat1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)','whB'=>'GROUP BY '.$gb));
}
else if(_0s::$router=='GET cat/viewPacking'){ a_ses::hashKey('ivt.cat.basic');
	_ADMS::lib('iDoc');
	$gb='B.detail,B.itemId,B.itemSzId, B.itemId,B.itemSzId,I.itemCode,I.itemName';
	echo iDoc::getOne(array('docEntry'=>$_GET['docEntry'],'fromA'=>'A.* FROM ivt_ocat A','fromB'=>$gb.',SUM(B.quantity) quantity,SUM(B.breads) breads FROM ivt_cat1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)','whB'=>'GROUP BY '.$gb));
}
else if(_0s::$router=='PUT cat/statusClose'){ a_ses::hashKey('ivt.cat.basic');
	_ADMS::lib('iDoc');
	if($js=_js::ise($___D['docEntry'],'Se debe definir el Id del documento')){}
	if($js=_js::ise($___D['docDate'],'Se debe definir la fecha de cierre')){}
	else if(iDoc::vStatus(array('tbk'=>'ivt_ocat','docEntry'=>$___D['docEntry'],'fie'=>'whsId','D'=>'Y'))){ $js=_err::$errText; }
	else{
		$q=a_sql::query('SELECT B.itemId,B.itemSzId,SUM(B.quantity) quantity
		FROM ivt_cat1 B
		WHERE B.docEntry=\''.$___D['docEntry'].'\' GROUP BY B.itemId,B.itemSzId ',array(1=>'Error obteniendo información del documento.',2=>'El documento no tiene lineas registradas.'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{
			a_sql::transaction(); $cmt=false; $Liv=array(); $errs=0;
			while($L=$q->fetch_assoc()){
				$Liv[]=array('itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'whsId'=>iDoc::$D['whsId'],'inQty'=>$L['quantity']);
			}
			$q=a_sql::query('UPDATE ivt_ocat SET docStatus=\'C\',invMov=\'Y\' WHERE docEntry=\''.$___D['docEntry'].'\' LIMIT 1',array(1=>'Error cerrando documento: '));
			if(a_sql::$err){ $js=a_sql::$errNoText; $errs++; }
			if($errs==0 && $q['aff_rows']>0){
				_ADMS::mApps('ivt/Ivt');
				Ivt::onHand_put($Liv,array('lineVerify'=>'Y','tt'=>$serieType,'tr'=>$___D['docEntry'],'docDate'=>$___D['docDate']));
				if(_err::$err){ $js=_err::$errText; }
				else{ $js=_js::r('Documento cerrado correctamente.','"docEntry":"'.$___D['docEntry'].'"'); $cmt=true;
					iDoc::logPost(array('serieType'=>$serieType,'docEntry'=>$___D['docEntry'],'docStatus'=>'C'));
				}
				a_sql::transaction($cmt);
			}
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT cat/statusCancel'){ a_ses::hashKey('ivt.cat.basic');
	$___D['t']='N';
	$___D['tbk']='ivt_ocat';
	_ADMS::lib('iDoc');
	iDoc::putStatus($___D);
	if(_err::$err){ echo _err::$errText; }
	else{ echo _js::r('Documento anulado correctamente.'); }
}

else if(_0s::$router=='GET cat/lines'){ a_ses::hashKey('ivt.cat.basic');
_ADMS::lib('iDoc');
if(iDoc::vStatus(array('tbk'=>'ivt_ocat','docEntry'=>$_GET['docEntry'],'fie'=>'docEntry,cardName','D'=>'Y'))){ $js=_err::$errText; }
else{
	$gby='B.id,B.detail,B.itemId,I.itemCode,I.itemName,B.itemSzId';
	$q=a_sql::query('SELECT '.$gby.', quantity FROM ivt_cat1 B 
	JOIN itm_oitm I ON (I.itemId=B.itemId)
	WHERE B.docEntry=\''.$_GET['docEntry'].'\' ',array(1=>'Error obteniendo lineas del documento.',2=>'El documento no tiene lineas registradas.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{
		$Mx=iDoc::$D;
		$Mx['L']=array();
		while($S=$q->fetch_assoc()){
			$Mx['L'][]=$S;
		}
		$js=_js::enc2($Mx);
	}
}
echo $js;
}
else if(_0s::$router=='PUT cat/lines'){ a_ses::hashKey('ivt.cat.basic');
_ADMS::lib('iDoc');
if(iDoc::vStatus(array('tbk'=>'ivt_ocat','docEntry'=>$___D['docEntry']))){ die(_err::$errText); }
else{
	$L2=$___D['L']; unset($___D['L']); $nl=1; $errs=0;
	if(!is_array($L2)){ die(_js::e(3,'No se recibieron lineas para actualizar.')); }
	if($errs==0){ $nl=1; a_sql::transaction(); $cmt=false;
		_ADMS::_lb('src/Invt');
		foreach($L2 as $n=> $L){ $ln='Linea '.$nl.': '; $nl++;
			if($L['delete']=='Y'){
				$upd2=a_sql::query('DELETE FROM ivt_cat1 WHERE id=\''.$L['id'].'\' LIMIT 1',array(1=>$ln.'Error eliminando linea del documento.'));
				if(a_sql::$err){ $js=a_sql::$errNoText; $errs++; break; }
			}
			else{
				if($js=_js::ise($L['quantity'],$ln.'La cantidad debe ser mayor a 0.','numeric<0')){ $errs++; break; }
				$upd2=a_sql::query('UPDATE ivt_cat1 SET detail=\''.$L['detail'].'\',quantity=\''.$L['quantity'].'\' WHERE id=\''.$L['id'].'\' LIMIT 1',array(1=>$ln.'Error actualizando linea del documento.'));
				if(a_sql::$err){ $js=a_sql::$errNoText; $errs++; break; }
			}
		}
	}
	if($errs==0){ $js=_js::r('Lineas modificadas correctamente.');
		iDoc::logPost(array('tbk'=>$serieType,'docEntry'=>$docEntry,'lines'=>'update','lineMemo'=>'Lineas'));
		a_sql::transaction(true);
	}
}
echo $js;
}

else if(_0s::$router=='POST cat/digit'){
	_ADMS::lib('iDoc');
	echo barCode_docLine($___D);
}
?>