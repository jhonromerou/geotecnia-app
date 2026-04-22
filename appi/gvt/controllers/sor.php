<?php
class gvtSor{
static $qU=array();
static $qI=array();
static $Acc=array();
static $serie='gvtSor';
static $tbk='gvt_osor';
static $tbk1='gvt_sor1';
static $tbk2='gvt_NNN';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	$daysDif=_2d::relTime($_J['docDate'],$_J['dueDate']);
	if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto (2).')){}
	//else if(_js::iseErr($_J['slpId'],'Seleccione un empleado de Ventas.','numeric>0')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.','Y-m-d')){}
	else if(_js::iseErr($_J['dueDate'],'La fecha de entrega debe estar definida.','Y-m-d')){}
	else if($daysDif<0){_err:err('La fecha de entrega no puede ser menor a la fecha del documento.',3); }
	//else if(_js::iseErr($_J['docType'],'El tipo de documento debe estar definido.')){}
	else if($js=_js::textMax($_J['ref1'],20,'Orden Compra: ')){ _err::err($js); }
	//else if(_js::iseErr($_J['countyMerch'],'Departamento de entrega debe estar definida.')){}
	//else if(_js::iseErr($_J['cityMerch'],'Ciudad de entrega debe estar definida.')){}
	//else if($js=_js::textMax($_J['addrMerch'],255,'Dirección Entrega ')){}
	else if(_js::iseErr($_J['countyCode'],'Departamento debe estar definida.')){}
	else if(_js::iseErr($_J['cityCode'],'La ciudad debe estar definida.')){}
	else if($js=_js::textMax($_J['address'],255,'Dirección ')){ }
	else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ }
	else if(_js::isArray($_J['L'],'No se han enviado lineas para el documento.')){}
}
static public function getOne($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,C.phone1,C.invDayClose,A.*
	FROM gvt_osor A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm, B.* FROM gvt_sor1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function toCopy($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode,A.*,C.phone1,C.email FROM gvt_osor A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm,I.sellFactor, B.*,B.openQty quantity FROM gvt_sor1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function getOpenQty($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],
	'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,C.phone1,C.invDayClose,A.*
	FROM gvt_osor A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm,B.lineNum,B.itemId,B.itemSzId,B.quantity,B.openQty,B.price,B.priceME,B.disc,B.priceList,B.cost FROM gvt_sor1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}

static public function post($_J=array(),$trans='Y'){
	$trans=$trans!='N';
	_ADMS::lib('_2d,docSeries,JLog');
	_ADMS::_lb('Doc');
	self::revDoc($_J);
	$_J['docStatus']='S';
	if(!_err::$err){
		$errs=0;
		if($trans){ a_sql::transaction(); $cmt=false; }
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'tbk2'=>self::$tbk2,'docType'=>'sell','revWhs'=>'N',
		'ori'=>'gvtSor::save()'));
		$nl=1;
		foreach($_J['L'] as $nx=>$L){
			$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ break; }
			$L['openQty']=$L['quantity'];
			$L[0]='i'; $L[1]=self::$tbk1;
			$L['_unik']='id';
			$nDoc->L1[]=$L;
		}
		if(!_err::$err){ $_J=$nDoc->post($_J); $docEntry=$nDoc->docEntry; }
		$_J['docEntry']=$docEntry;
		if(!_err::$err){ //cierre de relacion
			_ADMS::libC('gvt','base');
			gvtBase::closeFromTt(self::$serie,$docEntry,$_J);
		}
		if(!_err::$err){ $cmt=true; //Log
			if($trans){ $js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"'); }
			else{ $js=$_J; } /* devolver matriz */
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		}
		if($trans){ a_sql::transaction($cmt); }
	}
	_err::errDie();
	return $js;
}
static public function put($_J=array(),$trans='Y'){
	$trans=$trans!='N';
	_ADMS::lib('iDoc,_2d,docSeries');
	if(iDoc::vStatus(array('docEntry'=>$_J['docEntry'],'tbk'=>self::$tbk,'D'=>'Y','fie'=>'canceled,whsId'))){ return _err::$errText; }
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	else if(iDoc::$D['canceled']==''){ return _err::err('No se puede modificar la orden, esta anulada.'.$ori,3); }
	else if(iDoc::$D['whsId']>0){ return _err::err('No se puede modificar una orden que esté asignada a una bodega.'.$ori,3); }
	else{
		$errs=0;
		if($trans){ a_sql::transaction(); $cmt=false; }
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'tbk2'=>self::$tbk2,'docType'=>'sell','revWhs'=>'N',
		'ori'=>'gvtSor::save()'));
		$nl=1;
		foreach($_J['L'] as $nx=>$L){
			$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ break; }
			$L['openQty']=$L['quantity'];
			$L[0]='i'; $L[1]=self::$tbk1;
			$L['_unik']='id';
			$nDoc->L1[]=$L;
		}
		if(!_err::$err){ $nDoc->put($_J); $docEntry=$nDoc->docEntry; }
		$_J['docEntry']=$docEntry;
		if(!_err::$err){ $cmt=true; //Log
			if($trans){ $js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"'); }
			else{ $js=$_J; } /* devolver matriz */
		}
		if($trans){ a_sql::transaction($cmt); }
	}
	_err::errDie();
	return $js;
}
static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}
static public function logRel1($D=array()){
	_ADMS::lib('JLog');
	return JLog::rel1_get(array('ott'=>self::$serie,'otr'=>$D['docEntry']));
}

static public function putStatusSend($D=array()){
	_ADMS::lib('iDoc');
	if(iDoc::vStatus(array('tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y'))){ return _err::$errText; }
	else if(iDoc::$D['docStatus']!='D'){ return _err::err('Solo una orden en estado borrador puede ser enviada .'.Doc::$D['docStatus'].'.',3); }
	else{ $errs=0;
		a_sql::transaction(); $cmt=false;
		if(_Mdl::cnfIs('gvtSorReqOCAttach','=','Y')){
		$q=a_sql::fetch('SELECT id FROM app_fil1 WHERE tt=\''.self::$serie.'\' AND tr=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo relación de archivos del documento',2=>'No se ha relacionado el archivo de la orden de compra del cliente.'));
			if(a_sql::$err){ _err::err(a_sql::$errNoText); $errs++; }
		}
		if($errs==0){
			$upd=a_sql::query('UPDATE '.self::$tbk.' SET docStatus=\'S\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error actualizando a enviado: '));
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			else{ $js=_js::r('Estado actualizado correctamente.'); $cmt=true;
				_ADMS::lib('JLog');
				JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'S'));
			}
		}
		a_sql::transaction($cmt);
	}
	return $js;
}
static public function putStatusOpen($D=array()){
	_ADMS::lib('iDoc');
	if(iDoc::vStatus(array('tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y'))){}
	else if(iDoc::$D['docStatus']=='O'){ _err::err('La orden ya se encuentra en proceso.',3); }
	else{
		$errs=0;
		a_sql::transaction(); $cmt=false;
		$upd=a_sql::query('UPDATE '.self::$tbk.' SET docStatus=\'O\',whsId=\''.$D['whsId'].'\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error actualizando estado del documento: '));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			if($D['whsId']>0){
				_ADMS::mApps('ivt/Ivt');
				Ivt::putFromDoc(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'qtyFieSet'=>'(B.numFactor*B.quantity)','isCommited'=>'+','whsId'=>$D['whsId']));
				if(_err::$err){ $errs++; }
			}
		}
		if($errs==0){ $js=_js::r('Orden está en proceso.'); $cmt=true;
			_ADMS::lib('JLog');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'O'));
		}
		a_sql::transaction($cmt);
	}
	if(_err::$err){ return _err::$errText; }
	return $js;
}

static public function putStatusCancel($D=array()){
	a_sql::transaction(); $cmt=false; $errs=0;
	_ADMS::lib('iDoc');
	iDoc::putStatus(array('t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'fie'=>'whsId','D'=>'Y','lineMemo'=>$D['lineMemo'],'reqMemo'=>'Y'));
	if(!_err::$err){
		/* solicitado debe mermar si estaba en bodega */
		if(iDoc::$D['whsId']>0){
			_ADMS::mApps('ivt/Ivt');
			Ivt::putFromDoc(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'qtyFieSet'=>'(B.numFactor*B.openQty)','isCommited'=>'-','whsId'=>iDoc::$D['whsId']));
		}
		if(!_err::$err){ $cmt=true;
			$js=_js::r('Documento anulado correctamente.');
			_ADMS::lib('JLog');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'N','lineMemo'=>$D['lineMemo']));
		}
	}
	a_sql::transaction($cmt);
	if(_err::$err){ return _err::$errText; }
	return $js;
}
static public function putStatusClose($D=array()){
	a_sql::transaction(); $cmt=false; $errs=0;
	_ADMS::lib('iDoc');
	iDoc::putStatus(array('t'=>'C','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y','fie'=>'whsId','lineMemo'=>$D['lineMemo']));
	if(_err::$err){ return _err::$errText; }
	else{
		if(iDoc::$D['whsId']>0){/* Disminuir lo que falte */
			_ADMS::mApps('ivt/Ivt');
			Ivt::putFromDoc(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'qtyFieSet'=>'(B.numFactor*B.openQty)','isCommited'=>'-','whsId'=>iDoc::$D['whsId']));
			if(_err::$err){ $errs++; }
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento cerrado correctamente.');
			_ADMS::lib('JLog');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'C','lineMemo'=>$D['lineMemo']));
		}
	}
	a_sql::transaction($cmt);
	if(_err::$err){ return _err::$errText; }
	return $js;
}

static public function whsAssg($D=array()){
	_ADMS::lib('iDoc');
	if(iDoc::vStatus(array('tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y','fie'=>'whsId'))){}
	else if(iDoc::$D['docStatus']!='O'){ _err::err('Solo se puede asignar la bodega a una orden en proceso.',3); }
	else if(iDoc::$D['whsId']>0){ _err::err('No se puede modificar la bodega ya definida.',3); }
	else{
		$errs=0;
		a_sql::transaction(); $cmt=false;
		$upd=a_sql::query('UPDATE '.self::$tbk.' SET whsId=\''.$D['whsId'].'\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error asignado bodega: '));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			if($D['whsId']>0){
				_ADMS::mApps('ivt/Ivt');
				Ivt::putFromDoc(array('tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'qtyFieSet'=>'(B.numFactor*B.openQty)','isCommited'=>'+','whsId'=>$D['whsId']));
				if(_err::$err){ $errs++; }
			}
		}
		if($errs==0){ $js=_js::r('Bodega definida para orden.'); $cmt=true;
			_ADMS::lib('JLog');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'lineMemo'=>'Bodega definida'));
		}
		a_sql::transaction($cmt);
	}
	if(_err::$err){ return _err::$errText; }
	return $js;
}


/* no usadas ya */
static public function numSdn($D=array()){
	$q=a_sql::query('SELECT D.docEntry FROM gvt_osdn D WHERE D.canceled=\'N\' AND D.ott=\''.self::$serie.'\' AND D.otr=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de entregas relacionadas.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); $errs++; }
	else{ return $q; }
}
static public function rev2Close($docEntry=0){
	$ori=' on[gvtSor::rev2Close()]';
	$q=a_sql::fetch('SELECT docEntry,SUM(quantity) quantity,SUM(openQty) openQty FROM gvt_sor1 WHERE docEntry=\''.$docEntry.'\' GROUP BY docEntry',array(1=>'Error revisando cantidades pendientes para cierre.'.$ori,2=>'El documento no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else{
		$qSet=($q['openQty']==0)
		?'docStatus=\'C\',dlvStatus=\'C\''
		:'docStatus=\'O\',dlvStatus=\'EP\'';
		$qSet=($q['openQty']==$q['quantity'])
		?'docStatus=\'O\',dlvStatus=\'P\''
		:$qSet;
			a_sql::query('UPDATE '.self::$tbk.' SET '.$qSet.' WHERE docEntry=\''.$docEntry.'\' LIMIT 1',array(1=>'Error actualizando estado de entregas del documento.'.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	}
}

static public function putFinanceStatus($D=array()){
	$js=false; _ADMS::lib('iDoc');
	if(_js::iseErr($D['fieK'],'Debe definir el estado.')){ return $js; }
	iDoc::putStatus(array('t'=>'financeStatus=\''.$D['fieK'].'\'','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'reqMemo'=>'Y','lineMemo'=>$D['lineMemo']));
	if(_err::$err){ return _err::$errText; }
	else{
		$js=_js::r('Estado actualizado correctamente.');
		_ADMS::lib('JLog');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'financeStatus'=>$D['fieK'],'lineMemo'=>$D['lineMemo']));
	}
	return $js;
}
}
?>