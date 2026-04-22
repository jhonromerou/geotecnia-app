<?php
class gvtRce extends JxDoc{
static $serieSin='gvtPin';
static $AI='docEntry';
static $serie='gvtRce';
static $tbk='gvt_orce';
static $tbk1='gvt_rce1';
static $tbk2='gvt_rcp2';
static $tbk99='gvt_doc99';
static public function get($D){
	_ADMS::lib('iDoc,sql/filter');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docStatus,A.canceled,A.payType,A.bal,A.dateC,A.userId,A.docDate,C.cardName FROM gvt_orce A
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	return iDoc::get($D);
}
static public function getOne($D){
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	$M=a_sql::fetch('SELECT C.licTradType,C.licTradNum,A.*,C.cardName 
	FROM gvt_orce A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	WHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',[1=>'error obteniendo documento',2=>'El documento no existe']);
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else{
		$M['L']=a_sql::fetchL('SELECT AC.accCode,AC.accName, sAC.accCode saccCode,sAC.accName saccName,B.lineNum,B.lineType,B.serieId,B.docNum,B.tt,B.tr,B.debBal,B.creBal,B.lineClass,B.fpMethod,B.lineMemo 
		FROM gvt_rce1 B 
		LEFT JOIN gfi_opdc AC ON (AC.accId=B.accId)
		LEFT JOIN gfi_opdc sAC ON (sAC.accId=B.saccId)
		WHERE B.docEntry=\''.$D['docEntry'].'\' LIMIT 1',[1=>'error obteniendo lineas documento',2=>'El documento no tiene lineas registradas']);
		$M['LR']=a_sql::fetchL('SELECT B.* 
		FROM gvt_rcp2 B 
		WHERE B.tt=\'CE\' AND B.docEntry=\''.$D['docEntry'].'\' LIMIT 1',[1=>'error obteniendo retenciones',2=>'El documento no tiene lineas registradas']);
	}
	return _js::enc2($M);
}
static public function rev($_J=array()){
	$esAC=($_J['payType']=='AC');
	if(_js::iseErr($_J['cardId'],'Se debe definir el cliente.'.$ori,'numeric>0')){}
	if(_js::iseErr($_J['payType'],'Se debe definir el tipo de egreso.'.$ori)){}
	else if(_js::iseErr($_J['docDate'],'Se debe definir fecha del documento.'.$ori)){}
	//banco solo cuando no sea AC
	else if(!$esAC && _js::iseErr($_J['fpId'],'Se debe definir la forma de Pago.'.$ori,'numeric>0')){}
	else if($esAC && _js::iseErr($_J['cxcId'],'Se debe definir la cuenta de ajuste de cartera.'.$ori,'numeric>0')){}
	else if(_js::iseErr($_J['bal'],'Se debe definir valor del recibo.'.$ori,'numeric>0')){}
	else if($_J['payType']=='AN' && _js::iseErr($_J['antAccId'],'Se debe definir la cuenta de anticipo.'.$ori,'numeric>0')){}
	else{
		if(!$esAC){
			$Ac=a_sql::fetch('SELECT accId,fpMethod FROM gfi_ofdp WHERE fpId=\''.$_J['fpId'].'\' LIMIT 1',[1=>'Error obtiendo el medio de pago usado',2=>'El medio de pago definido no existe']);
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			if(_js::iseErr($Ac['accId'],'La cuenta contable asignada al medio de pago no esta definida.','numeric>0')){  }
		}
		else if($esAC){
			$Ac=array('accId'=>$_J['cxcId']);
		}
		return $Ac;
	}
}
static public function post($_J=array(),$P=array()){
	$ori=' on[gvtRce::post()]';
	$tD=self::rev($_J);
	a_sql::transaction(); $c=false;
	if(!_err::$err){
		_ADMS::lib('docSeries,JLog');
		$docEntryN=$_J['docEntry']=self::nextID();
		if(!_err::$err){ $_J=self::nextNum($_J); }
	}
	$Acc=array(); $qI=array(); $qU=array();
	$balRte=0; $balPay=$_J['bal'];
	if(!_err::$err && !_js::isArray($_J['LR'])){
		$n=0;
		foreach($_J['LR'] as $x=>$L){ $n++;
			$ln='Linea retención '.$n.': ';
			if(_js::iseErr($L['rteId'],$ln.'Se debe definir la retención','numeric>0')){ break;}
			else if(_js::iseErr($L['rate'],$ln.'La tasa de retención debe definirse','numeric>0')){ break; }
			else if(_js::iseErr($L['creBal'],$ln.'La base de retención debe definirse ','numeric>0')){ break; }
			else{
				$qR=a_sql::fetch('SELECT V1.sellAcc,V1.buyAcc
				FROM gfi_otax V1
				WHERE V1.vatId=\''.$L['rteId'].'\' LIMIT 1',array(1=>$ln.'Error obteniendo impuesto y retencion:'.$ori,2=>$ln.'La retención no está definida.'));
				if(a_sql::$err){ _err::err(a_sql::$errNoText); break; }
				else if(_js::iseErr($qR['buyAcc'],$ln.'No tiene definida cuenta contable de compra')){ break; }
				$balApply=$L['creBal']*$L['rate']/100;
				$balRte+=$balApply;
				$balPay-=$balApply;
				$Acc[]=array('baseAmnt'=>$L['creBal'],'creBal'=>$balApply,'accId'=>$qR['buyAcc'],'lineType'=>'T','vatId'=>$L['rteId'],'cardId'=>$_J['cardId']);
				$qI[]=array('i',self::$tbk2,'tt'=>'CE','docEntry'=>$docEntryN,'lineType'=>'rte','vatId'=>$L['rteId'],'vatRate'=>$L['rate'],'vatBase'=>$L['creBal'],'vatSum'=>$balApply);
			}
		}
		if(!_err::$err){
			if($balRte>$_J['bal']){ _err::err('El valor aplicado por retenciones es mayor que el valor a pagar. Revise las retenciones.',3); }
		}
	}
	_err::errDie();
	//die(print_r($Acc));
	if(!_err::$err){
		$Lx=$_J['L'];
		unset($_J['L'],$_J['LR']); 
		$ln=$P['ln'];
		$_J['dueDate']=$_J['docDate'];
		$paysNum=0;
		$qs='';
		$n=0; $errs=0;
		$totalBal=0;
		$Acc[]=array('creBal'=>$balPay,'accId'=>$tD['accId'],'lineType'=>'RP','cardId'=>$_J['cardId']);
		/* Revisión facturas Lineas de pago */
		if($_J['payType']=='F'){
			if(is_array($Lx)) foreach($Lx as $x=>$L){ $n++;
				$ln='Linea '.$n.': ';
				if($L['payTo']=='N'){ continue; }
				else if($js=_js::ise($L['acId'],$ln.'Se debe definir Id del asiento.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['debBal'],$ln.'Se debe definir el valor a pagar al documento'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else{
					$L['lineClass']=$_J['payCateg'];
					$paysNum++;
					$totalBal +=$L['debBal'];
					$Q=self::revApply($L,array('ln'=>$ln));
					if(_err::$err){ $js=_err::$errText; $errs++; break; }
					if($Q['cardId']!=$_J['cardId']){ _err::err($ln.'El tercero definido no corresponde con el tercero del asiento.'.$ori,3); $errs++; break; }
					else if($L['debBal']>$Q['creBalDue']){ _err::err($ln.'El valor a pagar ('.($L['debBal']*1).') no puede ser mayor que el valor pendiente de pago ('.($Q['creBalDue']*1).').'.$ori,3); $errs++; break; }
					else{
						$qU[]=array('u','gfi_dac1','creBalDue='=>'creBalDue-'.$L['debBal'],'_wh'=>'acId=\''.$L['acId'].'\' LIMIT 1');
						$qU[]=array('u',$Q['tbk'],'balDue='=>'balDue-'.$L['debBal'],'_wh'=>'docEntry=\''.$Q['tr'].'\' LIMIT 1');
						$qI[]=array('i',self::$tbk1,'docEntry'=>$docEntryN,'lineNum'=>$n,'acId'=>$L['acId'],'tt'=>$Q['tt'],'tr'=>$Q['tr'],'serieId'=>$Q['serieId'],'docNum'=>$Q['docNum'],'accId'=>$Q['accId'],'debBal'=>$L['debBal'],'fpId'=>$tD['fpId'],'fpMethod'=>$tD['fpMethod']);
						$Acc[]=array('debBal'=>$L['debBal'],'accId'=>$Q['accId'],'cardId'=>$_J['cardId']);
					}
				}
			}
			if($antBal>0 && $totalBal==0){
				_err::err('No se ha seleccionado ningun documento para aplicar valores.',3);
			}
			else if($totalBal!=$_J['bal']){ _err::err('El valor digitado '.$_J['bal'].' no es igual a la suma de los pagos a los documentos '.$totalBal,3); }
		}
		else if($_J['payType']=='G'){
			if(is_array($Lx)) foreach($Lx as $x=>$L){ $n++;
				$ln='Linea '.$n.': ';
				if($js=_js::ise($L['debBal'],$ln.'Se debe definir el valor del pago'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['lineClass'],$ln.'Se debe definir la categoria'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['accId'],$ln.'La categoria no tiene asignada una cuenta contable.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else{
					$totalBal +=$L['debBal'];
					$Acc[]=array('debBal'=>$L['debBal'],'accId'=>$L['accId'],'cardId'=>$_J['cardId']);
					$L[0]='i'; $L[1]=self::$tbk1;
					$L['docEntry']=$docEntryN;$L['lineNum']=$n;
					$L['saccId']=$L['accId'];
					$L['accId']=$tD['accId'];//la cuenta vista en el pago
					$qI[]=$L;
				}
			}
			if($errs==0 && $totalBal!=$_J['bal']){ _err::err('El valor digitado '.$_J['bal'].' no es igual a la suma de los pagos individuales '.$totalBal,3); }
		}
		else if($_J['payType']=='E'){
			if(is_array($Lx)) foreach($Lx as $x=>$L){ $n++;
				$ln='Linea '.$n.': ';
				if($js=_js::ise($L['debBal'],$ln.'Se debe definir el valor a aplicar a la cuenta'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['accId'],$ln.'El ID de la cuenta debe estar definido.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else{
					$totalBal +=$L['debBal'];
					$Acc[]=array('debBal'=>$L['debBal'],'accId'=>$L['accId'],'cardId'=>$_J['cardId']);
					$L[0]='i'; $L[1]=self::$tbk1;
					$L['docEntry']=$docEntryN; $L['lineNum']=$n;
					$L['saccId']=$L['accId'];
					$L['accId']=$tD['accId'];//la cuenta vista en el pago
					$qI[]=$L;
				}
			}
			if($errs==0 && $totalBal!=$_J['bal']){ _err::err('El valor digitado '.$_J['bal'].' no es igual a la suma de los pagos aplicados a las cuentas '.$totalBal,3); }
		}
		/*actualizar factura y asiento */
		if(!_err::$err && $paysNum>0){ a_sql::multiQuery($qU); }
		if(!_err::$err){ /* create doc */
			unset($_J['cxcId']);
			$docEntry=a_sql::qInsert($_J,array('tbk'=>self::$tbk,'qk'=>'ud'));
			if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); }
		}
		if(!_err::$err){/* contabilizar */
			_ADMS::mApps('gfi/Acc');
			self::dacPost($_J,$Acc); unset($Acc);
		}
		if(!_err::$err){ /*insert lineas */
			a_sql::multiQuery($qI);
		}
		if(!_err::$err){  $c=true; 
			$js=_js::r('Pago registrado correctamente.','"docEntry":"'.$docEntryN.'"');
			self::tb99P(['docEntry'=>$docEntryN,'dateC'=>1]);
		}
	}
	a_sql::transaction($c);
	_err::errDie();
	return $js;
}

static public function statusN($_J=array()){
	$js=''; a_sql::transaction(); $cmt=false;
	_ADMS::lib('iDoc');
	$ori=' on[gvtRce::putCancel()]';
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$_J['docEntry'],'serieType'=>self::$serie,
	'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$_J['lineMemo']));
	if(_err::$err){ $js=_err::$errText; }
	else{
		_ADMS::mApps('gfi/Acc');
		gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$_J['docEntry']));
		if(_err::$err){ return _err::$errText; }
		$q=a_sql::query('SELECT A.canceled,B.lineType,B.acId,B.tt,B.tr,B.debBal
		FROM '.self::$tbk.' A 
		JOIN '.self::$tbk1.' B ON (B.docEntry=A.docEntry)
		WHERE A.docEntry=\''.$_J['docEntry'].'\'',array(1=>'Error consultando recibo de pago.',2=>'No se encontró información del pago a anular.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			$errs=0;
			$qU=array();
			while($L=$q->fetch_assoc()){
				$qU[]=array('u','gfi_dac1','creBalDue='=>'creBalDue+'.$L['debBal'],'_wh'=>'acId=\''.$L['acId'].'\' LIMIT 1');
				if($L['tr']>0){//Revertir Doc
					$Q=self::revTT($L);
					if(_err::$err){ $errs=1; break; }
					$qU[]=array('u',$Q['tbk'],'balDue='=>'balDue+'.$L['debBal'],'_wh'=>'docEntry=\''.$L['tr'].'\' LIMIT 1');
				}
			}
			if($errs==0){/*actualizar */
				a_sql::multiQuery($qU);
				if(_err::$err){}
				else{ $cmt=true; $js=_js::r('Recibido anulado correctamente.');
				}
			}
		}
	}
	a_sql::transaction($cmt);
	return $js;
}

static public function revTT($Q=array(),$P=array()){
	$ln=$P['ln']; $ori=' on[gvtRce::revTT()]';
	if(!preg_match('/^(gvtPin|gvtPnd|gvtSnc)$/',$Q['tt'])){ _err::err($ln.'El id del asiento no corresponde a una linea valida para aplicar el pago (FC,NCC,NDP).'.$ori,3); return false; }
	if($Q['tt']=='gvtPin'){
		$tbk='gvt_opin';
		$q2=a_sql::fetch('SELECT docEntry,serieId,docNum,canceled,cardId,balDue FROM '.$tbk.' WHERE docEntry=\''.$Q['tr'].'\' LIMIT 1',array(1=>$ln.'Error consultando factura para pago.',2=>$ln.'La factura de compra no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q2['canceled']=='Y'){ _err::err($ln.'La factura está anulada.',3); }
	}
	else if($Q['tt']=='gvtPnd'){
		$tbk='gvt_opnd';
		$q2=a_sql::fetch('SELECT docEntry,serieId,docNum,canceled,cardId,balDue FROM '.$tbk.' WHERE docEntry=\''.$Q['tr'].'\' LIMIT 1',array(1=>$ln.'Error consultando nota débito proveedor.',2=>$ln.'La nota débito proveedor no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q2['canceled']=='Y'){ _err::err($ln.'La nota débito proveedor está anulada.',3); }
	}
	else if($Q['tt']=='gvtSnc'){
		$tbk='gvt_osnc';
		$q2=a_sql::fetch('SELECT docEntry,serieId,docNum,canceled,cardId,balDue FROM '.$tbk.' WHERE docEntry=\''.$Q['tr'].'\' LIMIT 1',array(1=>$ln.'Error consultando nota crédito cliente.',2=>$ln.'La nota crédito cliente no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q2['canceled']=='Y'){ _err::err($ln.'La nota crédito cliente está anulada.',3); }
	}
	if(is_array($q2)){
		$Q['tbk']=$tbk;
		$Q['cardId']=$q2['cardId'];
		$Q['serieId']=$q2['serieId'];
		$Q['docNum']=$q2['docNum'];
		$Q['balDue']=$q2['balDue'];
	}
	return $Q;
}
static public function revApply($L=array(),$P=array()){
	$R=array();
	$Q=a_sql::fetch('SELECT AC.tt,AC.tr,AC.canceled,AC.lineType,AC.creBalDue,AC.accId 
	FROM gfi_dac1 AC 
	WHERE AC.acId=\''.$L['acId'].'\' LIMIT 1',array(1=>$ln.'Error revisando asiento para pago.'.$ori,2=>$ln.'El asiento no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText);}
	else{
		$Q=self::revTT($Q,$P);
	}
	
	return $Q;
}

static public function dacPost($nDoc,$Ld){
	$ori =' on[gvtRce::dacPost()]';
	if($js=_js::ise($nDoc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tt'=>self::$serie,'tr'=>$nDoc['docEntry']),$nDoc);
	$nDac->setLine($Ld);
	$nDac->post(); if(_err::$err){ return false; }
}

}
?>