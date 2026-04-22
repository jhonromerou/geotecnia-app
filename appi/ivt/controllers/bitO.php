<?php
class ivtBitO{
static $qU=array();
static $qI=array();
static $Acc=array();
static $serie='ivtBitO';
static $tbk='ivt_obdo';
static $tbk1='ivt_obit';
static $tbk99='ivt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['docDate'],'La fecha debe estar definida.')){}
	else if(_js::iseErr($_J['whsId'],'Se debe definir la bodega','numeric>0')){}
	else if(_js::isArray($_J['L'],'No se han enviado lineas para el documento.')){}
}
static public function revL1($L=[],$P=[]){
	if(_js::iseErr($L['itemId'],$P['ln'].'Se debe definir articulo','numeric>0')){}
	else if(_js::iseErr($L['itemSzId'],$P['ln'].'Se debe definir subproducto','numeric>0')){}
	//else if(_js::iseErr($L['bCode'],$P['ln'].'Se debe el código para el lote')){}
	//else if(_js::maxLen($L['bCode'],20,'Codigo Lote')){}
	else if(_js::iseErr($L['inDate'],$P['ln'].'Fecha Ingreso debe estar definida')){}
	else if(_js::iseErr($L['quantity'],$P['ln'].'La cantidad se debe definir y ser mayor a 0','numeric>0')){}
	else if(_js::iseErr($L['cardId'],$P['ln'].'Se debe definir el fabricante','numeric>0')){}
	else if(_js::maxLen($L['macCode'],20,'Codigo Fabricante')){}
	else if(_js::iseErr($L['manDate'],$P['ln'].'Fecha Fabricación debe estar definida')){}
	else if(_js::iseErr($L['dueDate'],$P['ln'].'Fecha vencimiento debe estar definida')){}
	else if($L['dueDate']<$L['manDate']){ _err::err($P['ln'].'La fecha de vencimiento no puede ser menor a la fecha de fabricación',3); }
	else{
		// ,B.itemId,B.itemSzId
		// LEFT JOIN ivt_obit B ON (B.bCode=\''.$L['bCode'].'\' AND B.itemId=I.itemId AND B.itemSzId=\''.$L['itemSzId'].'\')
		$qL=a_sql::fetch('SELECT I.itemCode,I.ivtGes 
		FROM itm_oitm I
		WHERE I.itemId=\''.$L['itemId'].'\' LIMIT 1',[1=>'Error verificando creación de lote']);
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1){
			if($qL['ivtGes']!='B'){ _err::err($P['ln'].'El articulo '.$qL['itemCode'].' no está definido para gestionar por lotes. ('.$qL['ivtGes'].')',3); }
			//else if($qL['itemId']==$L['itemId'] && $qL['itemSzId']==$L['itemSzId']){ _err::err($P['ln'].'El código de lote '.$L['bCode'].' ya está definido para este artículo.',3); }
		}
	}
}
static public function get($P){
	_ADMS::lib('iDoc');
	$P['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.dueDate,A.docTotal,A.curr,A.docTotalME,A.slpId,A.ref1,A.userId,A.dateC,A.whsIdSep
	FROM gvt_osrd A';
	return iDoc::get($P);
}
static public function getOne($P){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$P['docEntry'],
	'fromA'=>'C.cardCode, C.licTradType,C.licTradNum,C.phone1,C.invDayClose,A.*
	FROM gvt_osrd A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm, B.* FROM gvt_srd1 B LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
}
static public function post($_J=array(),$trans=true){
	_ADMS::lib('JLog,docSeries,iDoc');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	_ADMS::libC('ivt','bit');
	if($trans!='N'){ a_sql::transaction(); $cmt=false; }
	$_J['docStatus']='C';
	$nl=1;
	$Lx=$_J['L']; unset($_J['L']);
	$_J=docSeries::nextNum($_J,$_J);
	$docEntry=a_sql::qInsert($_J,['tbk'=>self::$tbk,'qk'=>'ud','qku'=>'ud']);
	if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText); }
	$ivDoc=new ivtBit(['tt'=>self::$serie,'docDate'=>$_J['docDate']]);
	foreach($Lx as $nx=>$L){
		$L['inDate']=$_J['docDate'];
		self::revL1($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
		if(_err::$err){ break; }
	}
	if(!_err::$err){
		foreach($Lx as $nx=>$L){
			$L['docEntry']=$docEntry;
			$bId=a_sql::qInsert($L,['tbk'=>self::$tbk1,'qk'=>'ud','qku'=>'ud']);
			if(a_sql::$err){ _err::err('Error generando lote: '.a_sql::$errText,3); }
			$ivDoc->La=['bId'=>$bId,'whsId'=>$_J['whsId']];
			$ivDoc->handSet(['tr'=>$docEntry,'inQty'=>$L['quantity']]);
		}
	}
	//_err::errDie(); die(print_r($ivDoc->Lw));
	if(!_err::$err){
		$ivDoc->handPost();
	}
	if(!_err::$err){ $cmt=true;
		//$js=_js::e(3,'Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		JLog::rel1(['ott'=>$_J['ott'],'otr'=>$_J['otr'],
			'tt'=>self::$serie,'tr'=>$docEntry,'serieId'=>$_J['serieId'],'docNum'=>$_J['docNum']
			]);
	}
	if($trans!='N'){ a_sql::transaction($cmt); }
	_err::errDie();
	return $js;
}

static public function statusCancel($D=[]){
	$ori=' on[ivtBitO::statusCancel()]';
	_ADMS::lib('JLog,iDoc');
	a_sql::transaction(); $c=false;
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo']));
	if(!_err::$err){
		_ADMS::libC('ivt','bit');
		ivtBit::handRever(['tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')]);
	}
	if(!_err::$err){ $c=true;
		$js=_js::r('Documento anulado correctamente.');
	}
	a_sql::transaction($c);
	_err::errDie();
	return $js;
}


static public function getList($D=[]){
	_ADMS::lib('sql/filter');
	$gb='BI.bId,BI.bStatus,BI.manCode,BI.manDate,BI.dueDate,I.batDays,BI.dateC,I.itemCode,I.itemName,I.udm,I.batDays,BI.quantity,BI.lineMemo';
	return a_sql::fetchL('SELECT '.$gb.',SUM(BW.onHand) onHand
	FROM ivt_obit BI
	LEFT JOIN ivt_obiw BW ON (BW.bId=BI.bId)
	JOIN itm_oitm I ON (I.itemId=BI.itemId)
	WHERE BI.bStatus!=\'N\' '.a_sql_filtByT($D).' GROUP BY '.$gb,
	['k'=>'L'],true);
}
static public function lock($D=[]){
	$ori=' on[ivtBitO::lock()]';
	_ADMS::lib('JLog,iDoc');
	a_sql::transaction(); $c=false;
	$q=a_sql::fetch('SELECT bStatus FROM ivt_obit BI WHERE BI.bId=\''.$D['docEntry'].'\' LIMIT 1',[1=>'Error obteniendo estado actual del lote',2=>'El lote no existe']);
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if($q['bStatus']=='N'){ _err::err('No se puede modificar un lote anulado',3); }
	else{
		$locked='O';
		if($q['bStatus']=='O'){ $locked='L'; }
		a_sql::query('UPDATE ivt_obit SET bStatus=\''.$locked.'\' WHERE bId=\''.$D['docEntry'].'\' LIMIT 1',[1=>'Error obteniendo cambio estado bloquedo del lote']);
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		if(!_err::$err){ $c=true;
			$js=_js::r('Lote actualizado correctamente.');
		}
	}
	a_sql::transaction($c);
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
}
?>