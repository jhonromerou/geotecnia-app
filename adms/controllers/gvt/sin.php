<?php
class gvtSin{
static $qU=array();
static $qI=array();
static $Acc=array();
static $serie='gvtSin';
static $tbk='gvt_oinv';
static $tbk1='gvt_inv1';
static $tbk2='gvt_inv2';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	$ori =' on[gvtSin::revDoc()]';
	$reqCntData=($_J['reqCntData']!='N');
	if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.'.$ori,'numeric>0')){}
	else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto (2).'.$ori)){}
	else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.'.$ori)){}
	else if(_js::iseErr($_J['dueDate'],'La fecha de vencimiento debe estar definida.'.$ori)){}
	else if(_js::iseErr($_J['pymId'],'Condición de pago: debe estar definida.'.$ori,'numeric>0')){}
	else if($reqCntData && _js::iseErr($_J['countyCode'],'Datos sin definir del cliente: Departamento.'.$ori)){}
	else if($reqCntData && _js::iseErr($_J['cityCode'],'Datos sin definir del cliente: Ciudad.'.$ori)){}
	else if($reqCntData && _js::iseErr($_J['address'],'Datos sin definir del cliente: Dirección.'.$ori)){}
	else if($reqCntData && _js::iseErr($_J['phone1'],'Datos sin definir del cliente: Teléfono 1.'.$ori)){}
	else if($reqCntData && _js::iseErr($_J['email'],'Datos sin definir del cliente: Correo F.E.'.$ori)){}
	else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: '.$ori)){ _err::err($js); }
	else if($js=_js::textMax($_J['lineMemo'],1000,'Detalles ')){ _err::err($js); }
	else if(_js::isArray($_J['L'],'No se han enviado lineas para el documento.')){}
}

static public function get($D){
	_ADMS::lib('iDoc');
	$D['F.numberr']=$D['__dfeNumber']; unset($D['__dfeNumber']);
	$D['from']='A.docEntry,A.serieId,A.docNum,A.projectId,A.docStatus,A.canceled,A.cardId,A.cardName,A.docType,A.docDate,A.pymId,A.slpId,A.docTotal,A.balDue,A.curr,A.docTotalME,A.userId,A.dateC,F.numberr dfeNumber,A.email
	FROM gvt_oinv A LEFT JOIN gvt_dinv F ON (F.docEntry=A.docEntry)
	';
	return a_sql::rPaging($D);
}
static public function getOne($D){
	//definir para obtener tel1,email to copy
	$addFie=($D['addFie'])?','.$D['addFie']:'';
	_ADMS::lib('docSeries,iDoc');
	$Mx= iDoc::getOne(array('r'=>'Mx','docEntry'=>$D['docEntry'],
	'fromA'=>'C.licTradType,C.licTradNum,A.*'.$addFie.' FROM gvt_oinv A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	LEFT JOIN par_ocpr P ON (P.prsId=A.prsId)',
	'fromB'=>'I.itemCode, I.itemName,I.sellUdm, B.itemId,B.itemSzId,B.handInv,B.price,B.quantity,B.priceLine,B.vatId,B.rteId,B.lineText FROM gvt_inv1 B
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)'));
	$Mx['Lt']=a_sql::fetchL('SELECT lineType,vatId,vatSum FROM '.self::$tbk2.' WHERE docEntry=\''.$D['docEntry'].'\' ',[1=>'Error obteniendo impuestos']);
	return _js::enc(docSeries::form($Mx),2);
}
static public function post($_J=array(),$trans=true){
	/* fdpId usar por defecto credito cliente */
	_ADMS::lib('docSeries,JLog');
if (a_ses::$userId == 1) {
// die(print_r($_J));
}
	self::revDoc($_J);
	unset($_J['reqCntData']); //omitir pedir información
	if(!_err::$err){
		$_J['docStatus']='C'; $errs=0;
		/* evitar transacciones */
		if($trans){ a_sql::transaction(); $cmt=false; }
		_ADMS::mApps('ivt/Ivt');
		$nDoc=new ivtDoc(array('tt'=>self::$serie,
		'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,'tbk2'=>self::$tbk2,
		'fromDlv'=>$_J['fromDlv'],'vats'=>'Y',
		'docType'=>'sell',
		'qtyMov'=>'outQty','revWhs'=>'Y',
		'ori'=>'gvtSin::post()'));
		$nl=1; $reqAcc=array('accIvt','accCost','accSell');
		foreach($_J['L'] as $nx=>$L){
			$L['whsId']=$_J['whsId'];
			unset($L['id']); //id de linea borrar
			$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ break; }
			$L['outQty']=$L['quantity'];
			$nDoc->handSet($L,array('whsId'=>$L['whsId']));
			unset($L['outQty']);
			if(!$nDoc->fromDlv && $L['handInv']=='Y'){//Si viene de remision omitir
				$costT=$nDoc->La['costLine'];
				//L1 Dac
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'creBal'=>$costT,'accCode'=>'14xx');
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accCost'],'debBal'=>$costT,'accCode'=>'61xx');
			}
			$nDoc->Ld[]=array('accId'=>$nDoc->La['accSell'],'creBal'=>$L['priceLine'],'accCode'=>'41xx');
			//L1 Doc
			$L['cost']=$nDoc->La['costLine'];
			$L['grossTotal']=$L['lineTotal']-$L['cost'];
			$L[0]='i'; $L[1]=self::$tbk1;
			$nDoc->L1[]=$L;
		}
		$_J['balDue']=$_J['docTotal'];
		if(!_err::$err){ $_J=$nDoc->post($_J); $docEntry=$nDoc->docEntry; }
		if(_err::$err){ $errs++;  }
		if($errs==0){/* Contabilizar */
			self::dacPost($nDoc);
			if(_err::$err){ $errs++; }
		}
		$_J['docEntry']=$docEntry;
		if($errs==0){/* Mover Inventario */
			$nDoc->handPost();
			if(_err::$err){ $errs++; }
		}
		if($errs==0){ //cierre de relacion
			_ADMS::libC('gvt','base');
			gvtBase::closeFromTt(self::$serie,$docEntry,$_J);
			if(_err::$err){ $errs=1; }
		}
		if($errs==0){ $cmt=true; //Log
			if($trans){ $js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"'); }
			else{ $js=$_J; } /* devolver matriz */
			JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		}
		if($trans){ a_sql::transaction($cmt); }
	}
	_err::errDie();
	return $js;
}
static public function putStatusCancel($D=array()){
	a_sql::transaction(); $cmt=false;
	$ori=' on[gvtSin::putCancel()]';
	_ADMS::lib('iDoc');
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo'],'D'=>'Y','fie'=>'ott,otr'));
	if(_err::$err){ $js=_err::$errText; }
	else{ $errs=0;
		$q=a_sql::fetch('SELECT RC.canceled rcvCanceled,RC1.tr
		FROM '.self::$tbk.' A
		LEFT JOIN gvt_rcv1 RC1 ON (RC1.tt=\''.self::$serie.'\' AND RC1.tr=A.docEntry)
		LEFT JOIN gvt_orcv RC ON (RC.docEntry=RC1.docEntry AND RC.canceled=\'N\')
		WHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error consultando factura de venta.',2=>'No se encontró información de factura a anular.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q['rcvCanceled']=='N' && $q['tr']>0){ _err::err('La factura tiene pagos registrados y no se puede anular. Debe anular los pagos primero para continuar.',3); }
		else{
			_ADMS::mApps('gfi/Dac,ivt/Ivt');
			gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
			if(_err::$err){ $js=_err::$errText; }
			else{
				IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
				if(_err::$err){ $js=_err::$errText;}
				else{ $cmt=true;
					$js=_js::r('Documento anulado correctamente.');
				}
			}
		}
	}
	_err::errDie();
	a_sql::transaction($cmt);
	return $js;
}

static public function dacPost($nDoc){
	$ori =' on[gvtSin::dacPost()]';
	if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tbk'=>self::$tbk,'tbk2'=>self::$tbk2,'tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry'],
	));
	$nDac->Doc=$nDoc->Doc;
	$nDac->setPym(); if(_err::$err){ return false; }
	$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
	$nDac->setDocTax(array('sellIva'=>'cre')); if(_err::$err){ return false; }
	$nDac->setLine([
	array('lineType'=>'FV','dueDate'=>$nDac->Doc['dueDate'],'cardId'=>$nDac->Doc['cardId'],'accId'=>$nDac->Doc['accId'],'accCode'=>'13/11xx','debBal'=>$nDac->Doc['docTotal'],'debBalDue'=>$nDac->Doc['docTotal'])
	]);
	$nDac->post(); if(_err::$err){ return false; }
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
