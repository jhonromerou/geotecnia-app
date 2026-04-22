<?php
class gvtSdn{
static $qU=array();
static $qI=array();
static $Acc=array();
static $serie='gvtSdn';
static $tbk='gvt_osdn';
static $tbk1='gvt_sdn1';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto.')){}
	else if(_js::iseErr($_J['slpId'],'Seleccione un empleado de Ventas.','numeric>0')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.','Y-m-d')){}
	else if($js=_js::textMax($_J['ref1'],20,'Orden Compra: ')){ _err::err($js); }
	else if(_js::iseErr($_J['whsId'],'Se debe definir la bodega.','numeric>0')){}
	//else if(_js::iseErr($_J['countyMerch'],'Departamento entrega debe estar definido.')){}
	//else if(_js::iseErr($_J['cityMerch'],'La ciudad de entrega debe estar definida.')){}
	//else if(_js::iseErr($_J['addrMerch'],'La dirección de entrega debe estar definida.')){}
	//else if($js=_js::textMax($_J['addrMerch'],255,'Dirección Entrega ')){ _err::err($js); }
	else if(_js::iseErr($_J['countyCode'],'Departamento factura debe estar definido.')){}
	else if(_js::iseErr($_J['cityCode'],'La ciudad de factura debe estar definida.')){}
	else if(_js::iseErr($_J['address'],'La dirección de factura debe estar definida.')){}
	else if($js=_js::textMax($_J['address'],255,'Dirección Factura ')){ _err::err($js); }
	else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ _err::err($js); }
	else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
}
static public function get($D){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.dueDate,A.docTotal,A.curr,A.docTotalME,A.slpId,A.ref1,A.userId,A.dateC,A.whsSepStatus,A.whsIdSep
	FROM gvt_osdn A';
	return iDoc::get($D);
}
static public function getOne($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,C.phone1,C.invDayClose,A.*
	FROM gvt_osdn A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm, B.* FROM gvt_sdn1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function toSin($D){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode,C.invDayClose,C.slpId,A.*,C.phone1,C.email FROM gvt_osdn A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm, B.* FROM gvt_sdn1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}

static public function post($_J=array()){
	_ADMS::lib('_2d,docSeries,iDoc,JLog');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	a_sql::transaction(); $cmt=false;
	if($_J['whsIdSep']>0){ $_J['whsSepStatus']='O'; }
	else{ $_J['whsSepStatus']='C'; }
	_ADMS::mApps('ivt/Ivt');
	$nDoc=new ivtDoc(array('tt'=>self::$serie,
	'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
	'revHand'=>'N','revWhs'=>'Y','handInv'=>'Y',
	'ori'=>'gvtSdn::post()'));
	$nl=1;
	foreach($_J['L'] as $nx=>$L){
		$L['whsId']=$_J['whsId'];
		$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
		if(_err::$err){ break; }
		$L[0]='i'; $L[1]=self::$tbk1;
		$nDoc->L1[]=$L;
	}
	if(!_err::$err){ $nDoc->post($_J); $docEntry=$nDoc->docEntry; }
	if(_err::$err){ $errs++;  }
	if($errs==0){ //cierre de relacion
		_ADMS::libC('gvt','base');
		gvtBase::closeFromTt(self::$serie,$docEntry,$_J);
		if(_err::$err){ $errs=1; }
	}
	if($errs==0){ $cmt=true;
		$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		_ADMS::lib('JLog');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
	}
	_err::errDie();
	a_sql::transaction($cmt);
	return $js;
}
static public function put($_J=array()){
	_ADMS::lib('_2d,iDoc');
	if(iDoc::vStatus(array('docEntry'=>$_J['docEntry'],'tbk'=>self::$tbk,'D'=>'Y'))){ return _err::$errText; }
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	else if(iDoc::$D['docStatus']!='O'){ return _err::err('Solo se puede modificar si está abierto.'.$ori,3); }
	a_sql::transaction(); $cmt=false;
	if($_J['whsIdSep']>0){ $_J['whsSepStatus']='O'; }
	else{ $_J['whsSepStatus']='C'; }
	_ADMS::mApps('ivt/Ivt');
	$nDoc=new ivtDoc(array('tt'=>self::$serie,
	'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
	'revHand'=>'N','revWhs'=>'Y','handInv'=>'Y',
	'ori'=>'gvtSdn::post()'));
	$nl=1;
	foreach($_J['L'] as $nx=>$L){
		$L['whsId']=$_J['whsId'];
		$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
		if(_err::$err){ break; }
		$L[0]='i'; $L[1]=self::$tbk1;
		$L['_unik']='id';
		$nDoc->L1[]=$L;
	}
	if(!_err::$err){ $nDoc->put($_J); $docEntry=$nDoc->docEntry; }
	if(_err::$err){ $errs=1;  }
	if($errs==0){ $cmt=true;
		$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		_ADMS::lib('JLog');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'update'=>1));
	}
	_err::errDie();
	a_sql::transaction($cmt);
	return $js;
}

static public function putStatusClose($D=array()){
	a_sql::transaction(); $cmt=false; $errs=0;
	_ADMS::lib('iDoc,JLog');
	iDoc::putStatus(array('t'=>'C','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y','fie'=>'ott,otr,serieId,docNum,whsIdSep'));
	if(_err::$err){ $js=_err::$errText; }
	else if(iDoc::$D['docStatus']!='O'){ _err::err('Solo se pueden cerrar los documentos abiertos.'.$ori,3); $errs++; }
	else if(iDoc::$D['whsIdSep']>0){ _err::err('Actualmente la mercancia está separada, desmarque está opción para cerrar el documento.'.$ori,3); $errs++; }
	else{
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
		'qtyMov'=>'outQty','revWhs'=>'Y','handInv'=>'Y',
		'ori'=>'gvtSdn::putClose()'));
		$reqAcc=array('accIvt','accCost');
		$Lq=$nDoc->fromDoc(array('docEntry'=>$D['docEntry']));
		if(_err::$err){ return _err::$errText; }
		$nl=1;
		while($L=$Lq->fetch_assoc()){
			$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ break; }
			$L['outQty']=$L['quantity'];
			$nDoc->handSet($L);
			$costT=$nDoc->La['costLine'];
			$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'creBal'=>$costT,'accCode'=>'14xx');
			$nDoc->Ld[]=array('accId'=>$nDoc->La['accCost'],'debBal'=>$costT,'accCode'=>'61xx');
		}
		if($errs==0){/* Contabilizar */
			$nDoc->Doc['docDate']=date('Y-m-d');
			self::dacPost($nDoc);
			if(_err::$err){ $errs++; }
		}
		if($errs==0){/* Mover Inventario */
			$nDoc->handPost();
			if(_err::$err){ $errs++; }
		}
		if($errs==0){ $cmt=true; //Log
			$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$D['docEntry'].'"');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'docStatus'=>'C'));
		}
	}
	a_sql::transaction($cmt);
	_err::errDie();
	return $js;
}
static public function putStatusCancel($D=array()){
	a_sql::transaction(); $cmt=false;
	$ori=' on[gvtSdn::putCancel()]';
	_ADMS::lib('iDoc');
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo'],'D'=>'Y'));
	if(_err::$err){ $js=_err::$errText; }
	else{ $errs=0;
		//Si estaba cerrada revertir
		if(iDoc::$D['docStatus']=='C'){
			_ADMS::mApps('gfi/Dac');
			gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
			if(_err::$err){ $js=_err::$errText; }
			else{
				_ADMS::mApps('ivt/Ivt');
				IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
				if(_err::$err){ $js=_err::$errText; }
			}
		}
	}
	if(!_err::$err){ $cmt=true;
		$js=_js::r('Documento anulado correctamente.');
	}
	_err::errDie();
	a_sql::transaction($cmt);
	return $js;
}

static public function getPacking($D){
	_ADMS::lib('iDoc');
	iDoc::getOne(array('docEntry'=>$D['docEntry'],'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,C.phone1,C.invDayClose,A.*
	FROM gvt_osdn A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'B.boxNum,I.itemCode, I.itemName,B.quantity,B.itemSzId FROM gvt_sdn8 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function packingSet($D){
	_ADMS::mapps('ivt/Packi');
	$nPack=new Packi(array('docEntry'=>$D['docEntry'],'tbk'=>'gvt_osdn','tbk1'=>'gvt_sdn1','tbk8'=>'gvt_sdn8'));
	$js=$nPack->get(array('fie'=>'cardName'));
	if(_err::$err){ $js=_err::$errText; }
	//else if($js['docStatus']!='O'){ $js=_js::e(3,'El documento debe estar abierto para definir la lista de empaque.'); }
	else{ $js=_js::enc2($js); }
	return $js;
}
static public function putPackingSet($D){
	_ADMS::lib('iDoc');
	if(iDoc::vStatus(array('closeOmit'=>'Y','docEntry'=>$D['docEntry'],'tbk'=>'gvt_osdn','D'=>'Y'))){ die(_err::$errText); }
	_ADMS::mapps('ivt/Packi');
	a_sql::transaction(); $cmt=false;
	$nPack=new Packi(array('docEntry'=>$D['docEntry'],'tbk1'=>'gvt_sdn1','tbk8'=>'gvt_sdn8'));
	$nPack->rev($D['I']);
	if(_err::$err){ $js=_err::$errText; }
	else{
		$nPack->put($D['L']);
		if(_err::$err){ $js=_err::$errText; }
		else{ $cmt=true;
			$js=_js::r('Lista de empaque actualizada.');
		}
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function logGet($D=array()){
	_ADMS::lib('JLog');
	return JLog::get(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}
static public function logPost($D=array()){
	$D['tbk']=self::$tbk99;
	$D['serieType']=self::$serie;
	_ADMS::lib('JLog');
	JLog::post($D);
}
static public function logRel1($D=array()){
	_ADMS::lib('JLog');
	return JLog::rel1_get(array('ott'=>self::$serie,'otr'=>$D['docEntry']));
}

static public function dacPost($nDoc){
	$ori =' on[gvtSdn::dacPost()]';
	if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry']));
	$nDac->Doc=$nDoc->Doc;
	$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
	$nDac->post(); if(_err::$err){ return false; }
}

static public function putSepClose($D=array()){//inactive
	a_sql::transaction(); $cmt=false; $errs=0;
	Doc::putStatus(array('closeOmit'=>'Y','t'=>'whsSepStatus=\'C\'','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y','fie'=>'whsIdSep,whsSepStatus'));
	if(_err::$err){ $js=_err::$errText; }
	else{
		if(Doc::$D['whsSepStatus']=='C'){ _err::err('Esta acción ya fue realizada.'.$ori,3); $errs++; }
		else if(Doc::$D['docStatus']!='C'){ _err::err('Solo se puede realizar esta opción a los documentos cerrados.'.$ori,3); $errs++; }
		else{
			$docDate=date('Y-m-d');
			_ADMS::_app('Ivt');
			Ivt::putFromDoc(array('tbk1'=>self::$tbk1,'docEntry'=>$D['docEntry'],'outQty'=>'-','whsId'=>Doc::$D['whsIdSep'],'docDate'=>$docDate,'tt'=>self::$serie,'tr'=>$D['docEntry']));
			if(_err::$err){ $errs++; }
		}
		/* Esto ya esta contabilizado, ver opcion de doc inventario */
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento cerrado correctamente.');
			_ADMS::lib('JLog');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry'],'whsSepClose'=>'C'));
		}
	}
	a_sql::transaction($cmt);
	return $js;
}
}
?>
