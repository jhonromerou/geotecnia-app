<?php
class ivtBitI{
static $qU=array();
static $qI=array();
static $Acc=array();
static $serie='ivtBitI';
static $tbk='ivt_obdi';
static $tbk1='ivt_bdi1';
static $tbk99='ivt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.')){}
	else if(_js::iseErr($_J['whsId'],'Se debe definir la bodega','numeric>0')){}
	else if(_js::isArray($_J['L'],'No se han enviado lineas para el documento.')){}
}
static public function revL1($L=[],$P=[]){
	if(_js::iseErr($L['bId'],$P['ln'].'Se debe definir el lote','numeric>0')){}
	else if(_js::iseErr($L['quantity'],$P['ln'].'La cantidad se debe definir y ser mayor a 0','numeric>0')){}
	return $L;
}
static public function get($P){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docDate,A.docStatus,A.canceled,A.docClass,A.lineMemo,A.userId,A.dateC,A.docType,A.ref1,A.ref2,A.whsId
	FROM '.self::$tbk.' A ';
	return iDoc::get($D);
}
static public function getOne($P){
	_ADMS::lib('iDoc');
	return iDoc::getOne(array('docEntry'=>$P['docEntry'],
	'fromA'=>'A.*
	FROM '.self::$tbk.' A',
	'fromB'=>'BI.itemId,BI.itemSzId,I.itemCode, I.itemName,I.udm, B.quantity, BI.bId, C.cardName 
	FROM '.self::$tbk1.' B 
	LEFT JOIN ivt_obit BI ON (BI.bId=B.bId)
	LEFT JOIN par_ocrd C ON (C.cardId=BI.cardId)
	LEFT JOIN itm_oitm I ON (I.itemId=BI.itemId)'));
}
static public function post($_J=array(),$trans=true){
	_ADMS::lib('JLog,docSeries,iDoc');
	self::revDoc($_J);
	if(_err::$err){ return _err::$errText; }
	_ADMS::libC('ivt','bit');
	if($trans!=='N'){ a_sql::transaction(); $cmt=false; }
	$_J['docStatus']='C';
	$nl=1;
	$Lx=$_J['L']; unset($_J['L']);
	$ivDoc=new ivtBit(['tt'=>self::$serie,'docDate'=>$_J['docDate']]);
	foreach($Lx as $nx=>$L){
		$ln='Linea '.$nl.': ';
		self::revL1($L,array('ln'=>$ln)); $nl++;
		if(_err::$err){ break; }
		else{
			$ivDoc->getInf(['bId'=>$L['bId'],'whsId'=>$_J['whsId']],array('ln'=>$ln));
			if(_err::$err){ break; }
			$L[0]='i'; $L[1]=self::$tbk1;
			$ivDoc->Lw[]=$L;
			$ivDoc->handSet(['inQty'=>$L['quantity']]);
		}
	}
	if(!_err::$err){ //genera doc
		$_J=docSeries::nextNum($_J,$_J);
		if(!_err::$err){
			$docEntry=a_sql::qInsert($_J,['tbk'=>self::$tbk,'qk'=>'ud','qku'=>'ud']);
			if(a_sql::$err){ _err::err('Error generando documento: '.a_sql::$errText,3); }
		}
	}
	if(!_err::$err){ $ivDoc->handPost([
		['_tbk'=>self::$tbk1,'docEntry'=>$docEntry],
		['_tbk'=>'ivt_bwtr','tr'=>$docEntry],
	]); }
	if(!_err::$err){ $cmt=true;
		//$js=_js::e(3,'Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
		JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		JLog::rel1(['ott'=>$_J['ott'],'otr'=>$_J['otr'],
			'tt'=>self::$serie,'tr'=>$docEntry,'serieId'=>$_J['serieId'],'docNum'=>$_J['docNum']
			]);
	}
	if($trans!=='N'){ a_sql::transaction($cmt); }
	_err::errDie();
	return $js;
}

static public function statusCancel($D=[]){
	$ori=' on[ivtBitI::statusCancel()]';
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