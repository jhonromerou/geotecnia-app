<?php
class gvtSop{
static $qU=array();
static $qI=array();
static $Acc=array();
static $serie='gvtSop';
static $tbk='gvt_osop';
static $tbk1='gvt_sop1';
static $tbk99='gvt_doc99';
static public function get($P){
	$P['from']='A.docEntry,A.serieId,A.docNum,A.dateC,A.userId,A.slpId,A.docDate,A.docStatus,A.dueDate,A.cardName,A.docTotal FROM gvt_osop A';
	$P['permsBy']='slps';
	return a_sql::rPaging($P);
}
static public function getOne($P){
	_ADMS::lib('docSeries,iDoc');
	$_ext=array();
	$Mx = iDoc::getOne(array('docEntry'=>$P['docEntry'],'r' => 'Mx', '_EXT'=>$_ext,
	'fromA'=>'A.* FROM gvt_osop A',
	'fromB'=>'B.*,I.itemCode,I.itemName FROM gvt_sop1 B JOIN itm_oitm I ON (I.itemId=B.itemId) ','whB'=>'ORDER BY B.lineNum ASC'));

	return _js::enc(docSeries::form($Mx),2);
}
static public function post($_J=array()){
	_ADMS::lib('_2d,docSeries');
	_ADMS::_lb('Doc');
	if(_js::iseErr($_J['cardName'],'Se debe definir el socio de negocios.')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.','Y-m-d')){}
	else if(_js::iseErr($_J['dueDate'],'La fecha de validez debe estar definida.','Y-m-d')){}
	else if($js=_js::textMax($_J['lineMemo'],1000,'Detalles: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['condicGen'],5000,'Condiciones Generales: ')){ _err::err($js); }
	else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
	else{
		$nl=0; $Ld=$_J['L']; unset($_J['L'],$_J['Vats']);
		Doc::$revLineIvt='N';
		foreach($Ld as $nk=>$L){ $nl++;
			$ln ='Linea '.$nl.': '; unset($L['id']);
			if($js=Doc::revItmLine($L,array('ln'=>$ln))){ _err::err($js); $errs++; break; }
			else{
				$L['lineNum']=$nl; unset($L['udm']);
				$L[0]='i'; $L[1]=self::$tbk1;
				$qA[]=$L;
			}
		}
		Doc::$revLineIvt='Y';
		if($errs==0){
			a_sql::transaction(); $cmt=false;
			$_J=docSeries::nextNum($_J,$_J);
			if(_err::$err){ $errs++; }
			else{
				$docEntry=a_sql::qInsert($_J,array('tbk'=>self::$tbk,'qk'=>'ud'));
				if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
				else{
					a_sql::multiQuery($qA,array('i'=>array('docEntry'=>$docEntry)));
					if(_err::$err){ $errs++; }
				}
			}
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			_ADMS::lib('JLog');
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		}
		a_sql::transaction($cmt);
	}
	if(_err::$err){ return _err::$errText; }
	return $js;
}
static public function put($_J=array()){
	$docEntry=$_J['docEntry'];
	_ADMS::lib('_2d,docSeries'); _ADMS::_lb('Doc');
	if(_js::iseErr($_J['docEntry'],'Se debe definir Id de documento','numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir el socio de negocios.')){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.','Y-m-d')){}
	else if(_js::iseErr($_J['dueDate'],'La fecha de validez debe estar definida.','Y-m-d')){}
	else if($js=_js::textMax($_J['lineMemo'],1000,'Detalles: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['condicGen'],5000,'Condiciones Generales: ')){ _err::err($js); }
	else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
	else{
		$qA=array();
		$nl=0; $Ld=$_J['L']; unset($_J['L'],$_J['Vats']);
		$_J[0]='u'; $_J[1]=self::$tbk;
		$_J['_wh']='docEntry=\''.$docEntry.'\' LIMIT 1';
		$qA[]=$_J;
		Doc::$revLineIvt='N';
		foreach($Ld as $nk=>$L){ $nl++;
			$totaln=0; $ln ='Linea '.$nl.': ';
			if($js=Doc::revItmLine($L,array('ln'=>$ln))){ _err::err($js); $errs++; break; }
			else{
				$L['lineNum']=$nl; unset($L['udm']);
				$L[0]='i'; $L[1]=self::$tbk1;
				$L['_unik']='id';
				$qA[]=$L;
			}
		}
		Doc::$revLineIvt='Y';
		if($errs==0){
			a_sql::transaction(); $cmt=false;
			a_sql::multiQuery($qA,array('i'=>array('docEntry'=>$docEntry)));
			if(_err::$err){}
			else{ $cmt=true;
				$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			}
		}
		a_sql::transaction($cmt);
	}
	if(_err::$err){ return _err::$errText; }
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

static public function putStatusCancel($D=array()){
	a_sql::transaction(); $cmt=false;
	_ADMS::lib('iDoc');
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo']));
	if(_err::$err){ return _err::$errText; }
	else{ $cmt=true; $js=_js::r('Documento anulado correctamente.'); }
		a_sql::transaction($cmt);
	return $js;
}
static public function putStatusClose($D=array()){
	a_sql::transaction(); $cmt=false;
	_ADMS::lib('iDoc');
	iDoc::putStatus(array('cancelOmit'=>'Y','t'=>'C','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo']));
	if(_err::$err){ return _err::$errText; }
	else{ $cmt=true; $js=_js::r('Documento cerrado correctamente.'); }
		a_sql::transaction($cmt);
	return $js;
}
}
?>
