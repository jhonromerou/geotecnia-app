<?php
class gvtRcv extends JxDoc{
static $serieSin='gvtSin';
static $serie='gvtRcv';
static $AI='docEntry';
static $tbk='gvt_orcv';
static $tbk1='gvt_rcv1';
static $tbk2='gvt_rcp2';
static $tbk99='gvt_doc99';
static public function rev($_J=array()){
	$esAC=($_J['payType']=='AC'); $ori=' on[gvtRcv::rev()]';
	if(_js::iseErr($_J['cardId'],'Se debe definir el tercero.'.$ori,'numeric>0')){}
	if(_js::iseErr($_J['payType'],'Se debe definir el tipo de ingreso.'.$ori)){}
	else if(_js::iseErr($_J['docDate'],'Se debe definir fecha del documento.'.$ori)){}
	//banco solo cuando no sea AC
	//else if(!$esAC && _js::iseErr($_J['banId'],'Se debe definir la cuenta de ingreso.'.$ori,'numeric>0')){}
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
static public function post($_J=array(),$P=array(),$trans=true){
	$ori=' on[gvtRcv::post()]';
	if($trans){ a_sql::transaction(); $cmt=false; }
	$tD=self::rev($_J); unset($_J['fpId']);
	if(!_err::$err){
		_ADMS::lib('docSeries,JLog');
		$docEntryN=$_J['docEntry']=self::nextID();
		if(!_err::$err){ $_J=self::nextNum($_J); }
	}
	$Lx=$_J['L'];
	$ln=$P['ln'];
	$_J['dueDate']=$_J['docDate'];
	$paysNum=0;
	$qs=''; $qI=array(); $qU=array();
	$errs=0;
	$totalBal=0;
	$Acc=array(); $qI=array(); $qU=array();
	$balRte=0; $balPay=$_J['bal'];
	if(!_err::$err && !_js::isArray($_J['LR'])){
		$n=0;
		foreach($_J['LR'] as $x=>$L){ $n++;
			$ln='Linea retención '.$n.': ';
			if(_js::iseErr($L['rteId'],$ln.'Se debe definir la retención','numeric>0')){ break;}
			else if(_js::iseErr($L['rate'],$ln.'La tasa de retención debe definirse','numeric>0')){ break; }
			else if(_js::iseErr($L['debBal'],$ln.'La base de retención debe definirse ','numeric>0')){ break; }
			else if($L['debBal']>$_J['bal']){ _err::err($ln.'La base de retención es mayor al valor total del documento',3); break; }
			else{
				$qR=a_sql::fetch('SELECT V1.sellAcc
				FROM gfi_otax V1
				WHERE V1.vatId=\''.$L['rteId'].'\' LIMIT 1',array(1=>$ln.'Error obteniendo impuesto y retencion:'.$ori,2=>$ln.'La retención no está definida.'));
				if(a_sql::$err){ _err::err(a_sql::$errNoText); break; }
				else if(_js::iseErr($qR['sellAcc'],$ln.'No tiene definida cuenta contable de venta')){ break; }
				$balApply=$L['debBal']*$L['rate']/100;
				$balRte+=$L['debBal'];
				$balPay-=$balApply;
				$Acc[]=array('baseAmnt'=>$L['debBal'],'debBal'=>$balApply,'accId'=>$qR['sellAcc'],'lineType'=>'T','vatId'=>$L['rteId'],'cardId'=>$_J['cardId']);
				$qI[]=array('i',self::$tbk2,'tt'=>'RC','docEntry'=>$docEntryN,'lineType'=>'rte','vatId'=>$L['rteId'],'vatRate'=>$L['rate'],'vatBase'=>$L['debBal'],'vatSum'=>$balApply);
			}
		}
		if(!_err::$err){
			if($balRte>$_J['bal']){ _err::err('El valor base por retenciones es mayor que el valor a pagar. Revise las retenciones.',3); }
		}
	}
	unset($_J['L'],$_J['LR']);
	if(!_err::$err){
		$Acc[]=array('debBal'=>$balPay,'accId'=>$tD['accId'],'lineType'=>'RC','cardId'=>$_J['cardId']);
		/* Revisión Lineas de pago */
		if($_J['payType']=='G'){
			$n=0;
			if(is_array($Lx)) foreach($Lx as $x=>$L){ $n++;
				$ln='Linea '.$n.': ';
				if($js=_js::ise($L['creBal'],$ln.'Se debe definir el valor del pago'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['lineClass'],$ln.'Se debe definir la categoria'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['accId'],$ln.'La categoria no tiene asignada una cuenta contable.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else{
					$totalBal +=$L['creBal'];
					$Acc[]=array('creBal'=>$L['creBal'],'accId'=>$L['accId'],'cardId'=>$_J['cardId']);
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
				if($js=_js::ise($L['accId'],$ln.'El ID de la cuenta debe estar definido.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['creBal'],$ln.'Se debe definir el valor a aplicar a la cuenta'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else{
					$totalBal +=$L['creBal'];
					$Acc[]=array('creBal'=>$L['creBal'],'accId'=>$L['accId'],'cardId'=>$_J['cardId']);
					$L[0]='i'; $L[1]=self::$tbk1;
					$L['docEntry']=$docEntryN; $L['lineNum']=$n;
					$L['saccId']=$L['accId'];
					$L['accId']=$tD['accId'];//la cuenta vista en el pago
					$qI[]=$L;
				}
			}
			if($errs==0 && $totalBal!=$_J['bal']){ _err::err('El valor digitado '.$_J['bal'].' no es igual a la suma de los pagos aplicados a las cuentas '.$totalBal,3); }
		}
		else if(is_array($Lx)){
			$n=0;
			foreach($Lx as $x=>$L){ $n++;
				$ln='Linea '.$n.': ';
				if($L['payTo']=='N'){ continue; }
				if($js=_js::ise($L['acId'],$ln.'Se debe definir Id del asiento.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['creBal'],$ln.'Se debe definir el valor a pagar.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else{
					$paysNum++;
					$totalBal +=$L['creBal'];
					$Q=self::revApply($L,array('ln'=>$ln));
					if(_err::$err){ $js=_err::$errText; $errs++; break; }
					if($Q['cardId']!=$_J['cardId']){ _err::err($ln.'El tercero definido no corresponde con el tercero del asiento.'.$ori,3); $errs++; break; }
					else if($L['creBal']>$Q['debBalDue']){ _err::err($ln.'El valor a pagar ('.($L['creBal']*1).') no puede ser mayor que el valor pendiente de pago ('.($Q['debBalDue']*1).').'.$ori,3); $errs++; break; }
					else{
						$qU[]=array('u','gfi_dac1','debBalDue='=>'debBalDue-'.$L['creBal'],'_wh'=>'acId=\''.$L['acId'].'\' LIMIT 1');
						$qU[]=array('u',$Q['tbk'],'balDue='=>'balDue-'.$L['creBal'],'_wh'=>'docEntry=\''.$Q['tr'].'\' LIMIT 1');
						$qI[]=array('i',self::$tbk1,'lineNum'=>$n,'acId'=>$L['acId'],'tt'=>$Q['tt'],'tr'=>$Q['tr'],'serieId'=>$Q['serieId'],'docNum'=>$Q['docNum'],'accId'=>$Q['accId'],'creBal'=>$L['creBal'],'fpId'=>$tD['fpId'],'fpMethod'=>$tD['fpMethod']);
						$Acc[]=array('creBal'=>$L['creBal'],'accId'=>$Q['accId'],'cardId'=>$_J['cardId']);
					}
				}
			}
		}
		if(_err::$err){ $errs=1; }
		$antBal=$_J['bal']-$totalBal;
		if(!_err::$err){/* revision valor pagos */
			if($antBal>0 && $totalBal==0){
				_err::err('No se ha seleccionado ningun documento para aplicar valores.'."$totalBal>".$_J['bal'],3); $errs=1;
			}
			else if($totalBal>$_J['bal']){ _err::err('La suma de los pagos a aplicar a los documentos es mayor al valor del recibo.',3); $errs=1; }
			else if($totalBal<$_J['bal']){ _err::err('La suma de los pagos a aplicar a los documentos es menor al valor del recibo.',3); $errs=1; }
		}
		if(!_err::$err && $paysNum>0){/*actualizar factura y asiento */
			a_sql::multiQuery($qU);
			if(_err::$err){ $errs++; }
		}
		if(!_err::$err){ /* create doc */
			unset($_J['cxcId']);
			$docEntry=a_sql::qInsert($_J,array('tbk'=>self::$tbk,'qk'=>'ud'));
			if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs=1; }
		}
		if(!_err::$err){/* contabilizar */
			_ADMS::mApps('gfi/Acc');
			$_J['docEntry']=$docEntry;
			self::dacPost($_J,$Acc); unset($Acc);
		}
		if(!_err::$err){ /*insert lineas */
			a_sql::multiQuery($qI,0,array('docEntry'=>$docEntry));
			if(_err::$err){ $errs++; $js=_err::$errText; }
			else{ $cmt=true; $js=_js::r('Pago registrado correctamente.','"docEntry":"'.$docEntry.'"');
				self::tb99P(['docEntry'=>$docEntryN,'dateC'=>1]);
			}
		}
	}
	if($trans){ a_sql::transaction($cmt); }
	_err::errDie();
	return $js;
}
static public function getOne($D){
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	$M=a_sql::fetch('SELECT C.licTradType,C.licTradNum,A.*,C.cardName 
	FROM gvt_orcv A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	WHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',[1=>'error obteniendo documento',2=>'El documento no existe']);
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else{
		$M['L']=a_sql::fetchL('SELECT AC.accCode,AC.accName, sAC.accCode saccCode,sAC.accName saccName,B.lineNum,B.lineType,B.serieId,B.docNum,B.tt,B.tr,B.debBal,B.creBal,B.lineClass,B.fpMethod,B.lineMemo 
		FROM gvt_rcv1 B 
		LEFT JOIN gfi_opdc AC ON (AC.accId=B.accId)
		LEFT JOIN gfi_opdc sAC ON (sAC.accId=B.saccId)
		WHERE B.docEntry=\''.$D['docEntry'].'\'',[1=>'error obteniendo lineas documento',2=>'El documento no tiene lineas registradas']);
		$M['LR']=a_sql::fetchL('SELECT B.* 
		FROM gvt_rcp2 B 
		WHERE B.tt=\'RC\' AND B.docEntry=\''.$D['docEntry'].'\' LIMIT 1',[1=>'error obteniendo retenciones',2=>'El documento no tiene lineas registradas']);
	}
	return _js::enc2($M);
}

/* usado en pos, factura con varios medios de pago[] y pago directo
{cardId,docDate,bal,acId, L[{ fdpId, creBal} ]
*/
static public function postN($_J=array(),$trans=true){
	$ori=' on[gvtRcv::postN()]';
	if($js=docSeries::revi($_J)){ return _err::err($js); }
	if(_js::iseErr($_J['cardId'],'Se debe definir el tercero.'.$ori,'numeric>0')){}
	//else if(_js::iseErr($_J['payType'],'Se debe definir el tipo de ingreso.'.$ori)){}
	else if(_js::iseErr($_J['docDate'],'Se debe definir fecha del documento.'.$ori)){}
	else if(_js::iseErr($_J['bal'],'Se debe definir valor del recibo.'.$ori,'numeric>0')){}
	else if(_js::iseErr($_J['acId'],'Asiento del documento de origen no definido.'.$ori)){}
	$Lx=$_J['L']; unset($_J['L']);  $ln=$P['ln'];
	if(_err::$err){}
	else{
		$_J['dueDate']=$_J['docDate'];
		if($trans){ a_sql::transaction(); $cmt=false; }
		$paysNum=0;
		$qs=''; $qI=array(); $qU=array();
		$n=0; $errs=0;
		$totalBal=0;
		$Acc=array();
		/* revisar factura origen */
		$Q=self::revApply($_J);
		if(_err::$err){ $js=_err::$errText; $errs++; }
		if($Q['cardId']!=$_J['cardId']){ _err::err($ln.'El tercero definido no corresponde con el tercero del asiento.'.$ori,3); $errs++; }
		//else if($L['creBal']>$Q['debBalDue']){ _err::err($ln.'El valor a pagar ('.($L['creBal']*1).') no puede ser mayor que el valor pendiente de pago ('.($Q['debBalDue']*1).').'.$ori,3); $errs++; break; }
		else{
			$qU[0]=array('u','gfi_dac1','_wh'=>'acId=\''.$_J['acId'].'\' LIMIT 1');
			$qU[1]=array('u',$Q['tbk'],'_wh'=>'docEntry=\''.$Q['tr'].'\' LIMIT 1');
			$Acc[0]=array('creBal'=>0,'accId'=>$Q['accId'],'cardId'=>$_J['cardId']);
		}
		/* Revisión Lineas de pago */
		if($errs==0 && is_array($Lx)){
			foreach($Lx as $x=>$L){ $n++;
				$ln='Linea '.$n.': ';
				if(_js::iseErr($L['fdpId'],$ln.'Se debe definir el medio de pago.'.$ori,'numeric>0')){ $errs++; break; }
				else if(_js::iseErr($L['creBal'],$ln.'Se debe definir el valor a pagar.'.$ori,'numeric>0')){ $errs++; break; }
				else{
					$qFP=a_sql::fetch('SELECT accId,fpMethod FROM gfi_ofdp WHERE fpId=\''.$L['fdpId'].'\' LIMIT 1',[1=>'Error obtiendo el medio de pago usado',2=>'El medio de pago definido no existe']);
					if(a_sql::$err){ _err::err(a_sql::$errNoText); $errs++; break; }
					else{
						$paysNum++;
						$totalBal +=$L['creBal'];
						$qI[]=array('i',self::$tbk1,'lineNum'=>$n,'acId'=>$_J['acId'],'tt'=>$Q['tt'],'tr'=>$Q['tr'],'serieId'=>$Q['serieId'],'docNum'=>$Q['docNum'],'accId'=>$qFP['accId'],'creBal'=>$L['creBal'],'fpId'=>$L['fdpId'],'fpMethod'=>$qFP['fpMethod']);
						$Acc[]=array('debBal'=>$L['creBal'],'accId'=>$qFP['accId'],'lineType'=>'RC','cardId'=>$_J['cardId']);
					}
				}
			}
		}
		$antBal=$_J['bal']-$totalBal;
		if($errs==0 && $totalBal==0){
			_err::err('No se han definido valores para los pagos.',3); $errs=1;
		}
		if($errs==0 && $paysNum>0){/*actualizar factura y asiento */
			$qU[0]['debBalDue=']='debBalDue-'.$totalBal;
			$qU[1]['balDue=']='balDue-'.$totalBal;
			a_sql::multiQuery($qU);
			if(_err::$err){ $errs++; }
		}
		if($errs==0){ /* create doc */
			unset($_J['acId']);
			$_J=docSeries::nextNum($_J,$_J); unset($_J['cxcId']);
			$_J['bal']=$totalBal;
			$docEntry=a_sql::qInsert($_J,array('tbk'=>self::$tbk,'qk'=>'ud'));
			if(a_sql::$err){ $js=_js::e(3,'Error guardando documento: '.a_sql::$errText); $errs=1; }
		}
		if($errs==0){/* contabilizar */
			$Acc[0]['creBal']=$totalBal;
			_ADMS::mApps('gfi/Acc');
			$_J['docEntry']=$docEntry;
			self::dacPost($_J,$Acc); unset($Acc);
			if(_err::$err){ $errs++;}
		}
		if($errs==0){ /*insert lineas */
			a_sql::multiQuery($qI,0,array('docEntry'=>$docEntry));
			if(_err::$err){ $errs++; $js=_err::$errText; }
			else{ $cmt=true; $js=_js::r('Pago registrado correctamente.','"docEntry":"'.$docEntry.'"');
				self::tb99P(['docEntry'=>$docEntry,'dateC'=>1]);
				//Doc::logPost(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
			}
		}
		if($trans){ a_sql::transaction($cmt); }
	}
	return $js;
}


static public function rev1($_J=array()){
	$esAC=($_J['payType']=='AC');
	if($js=_js::ise($_J['cardId'],'Se debe definir el cliente.'.$ori,'numeric>0')){ _err::err($js); }
	else if($js=_js::ise($_J['docDate'],'Se debe definir fecha del documento.'.$ori)){ _err::err($js); }
	else if($js=_js::ise($_J['banId'],'Se debe definir la cuenta de ingreso.'.$ori,'numeric>0')){ _err::err($js); }
	else if($js=_js::ise($_J['bal'],'Se debe definir valor del recibo.'.$ori,'numeric>0')){ _err::err($js); }
	else{
		$Ac=a_sql::fetch('SELECT AC.accId 
		FROM gfi_oban A
		LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
		WHERE A.banId=\''.$_J['banId'].'\' LIMIT 1',array(1=>'Error obteniendo información de cuenta.',2=>'La cuenta no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(_js::iseErr($Ac['accId'],'La cuenta contable asignada a la cuenta no existe.','numeric>0')){  }
		return $Ac;
	}
}
static public function post1($_J=array(),$P=array()){
	$ori=' on[gvtRcv::post()]';
	if($js=docSeries::revi($_J)){ return _err::err($js); }
	$tD=self::rev($_J);
	$Lx=$_J['L']; unset($_J['L']);  $ln=$P['ln'];
	if(_err::$err){}
	else{
		a_sql::transaction(); $cmt=false;
		$paysNum=0;
		$qs=''; $qI=array(); $qU=array();
		$n=0; $errs=0;
		$totalBal=0;
		$Acc=array();
		$Acc[]=array('debBal'=>$_J['bal'],'accId'=>$tD['accId'],'lineType'=>'RC','cardId'=>$_J['cardId']);
		/* Revisión Lineas de pago */
		if(is_array($Lx)){
			foreach($Lx as $x=>$L){ $n++;
				$ln='Linea '.$n.': ';
				if($L['payTo']=='N'){ continue; }
				if($js=_js::ise($L['acId'],$ln.'Se debe definir Id del asiento.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else if($js=_js::ise($L['creBal'],$ln.'Se debe definir el valor a pagar.'.$ori,'numeric>0')){ _err::err($js); $errs++; break; }
				else{
					$paysNum++;
					$totalBal +=$L['creBal'];
					$Q=self::revApply($L,array('ln'=>$ln));
					if(_err::$err){ $js=_err::$errText; $errs++; break; }
					if($Q['cardId']!=$_J['cardId']){ _err::err($ln.'El tercero definido no corresponde con el tercero del asiento.'.$ori,3); $errs++; break; }
					else if($L['creBal']>$Q['debBalDue']){ _err::err($ln.'El valor a pagar ('.($L['creBal']*1).') no puede ser mayor que el valor pendiente de pago ('.($Q['debBalDue']*1).').'.$ori,3); $errs++; break; }
					else{
						$qU[]=array('u','gfi_dac1','debBalDue='=>'debBalDue-'.$L['creBal'],'_wh'=>'acId=\''.$L['acId'].'\' LIMIT 1');
						$qU[]=array('u',$Q['tbk'],'balDue='=>'balDue-'.$L['creBal'],'_wh'=>'docEntry=\''.$Q['tr'].'\' LIMIT 1');
						$qI[]=array('i',self::$tbk1,'lineNum'=>$n,'acId'=>$L['acId'],'tt'=>$Q['tt'],'tr'=>$Q['tr'],'serieId'=>$Q['serieId'],'docNum'=>$Q['docNum'],'accId'=>$Q['accId'],'creBal'=>$L['creBal']);
						$Acc[]=array('creBal'=>$L['creBal'],'accId'=>$Q['accId'],'cardId'=>$_J['cardId']);
					}
				}
			}
		}
		$antBal=$_J['bal']-$totalBal;
		if($errs==0){/* revision valor pagos */
			if($totalBal>$_J['bal']){ _err::err('La suma de los pagos a aplicar a las facturas es mayor al valor definido.',3); $errs++; }
			else if($totalBal<$_J['bal'] && _js::ise($_J['antAccId'],0,'numeric>0')){ _err::err('Se debe definir la cuenta de anticipos para el saldo restante ('.$antBal.').',3); $errs++; }
		}
		if($errs==0 && $paysNum>0){/*actualizar factura y asiento */
			a_sql::multiQuery($qU);
			if(_err::$err){ $errs++; }
		}
		if($errs==0){ /* create doc */
			if($antBal>0){//Anticipo
				$_J['antBal']=$antBal; $n++;
				$Acc[]=array('lineType'=>'AN','accId'=>$_J['antAccId'],'creBal'=>$antBal,'creBalDue'=>$antBal,'dueDate'=>$_J['docDate'],'cardId'=>$_J['cardId'],);
				$qI[]=array('i',self::$tbk1,'lineType'=>'AN','lineNum'=>$n,'accId'=>$_J['antAccId'],'creBal'=>$antBal);
			}
			$_J=docSeries::nextNum($_J,$_J);
			$docEntry=a_sql::qInsert($_J,array('tbk'=>self::$tbk,'qk'=>'ud'));
			if(a_sql::$err){ $js=_js::e(3,'Error guardando documento: '.a_sql::$errText); $errs=1; }
		}
		if($errs==0){/* contabilizar */
			_ADMS::mApps('gfi/Acc');
			$_J['docEntry']=$docEntry;
			self::dacPost($_J,$Acc); unset($Acc);
			if(_err::$err){ $errs++;}
		}
		if($errs==0){ /*insert lineas */
			a_sql::multiQuery($qI,0,array('docEntry'=>$docEntry));
			if(_err::$err){ $errs++; $js=_err::$errText; }
			else{ $cmt=true; $js=_js::r('Pago registrado correctamente.','"docEntry":"'.$docEntry.'"');
				Doc::logPost(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
			}
		}
		a_sql::transaction($cmt);
	}
	return $js;
}

static public function putCancel($_J=array()){
	$js=''; a_sql::transaction(); $cmt=false;
	$ori=' on[gvtRcv::putCancel()]'; _ADMS::lib('iDoc');
	iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$_J['docEntry'],'serieType'=>self::$serie,'D'=>'Y','log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$_J['lineMemo']));
	if(_err::$err){ $js=_err::$errText; }
	else{
		_ADMS::mApps('gfi/Acc');
		gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$_J['docEntry']));
		if(_err::$err){ return _err::$errText; }
		$q=a_sql::query('SELECT A.canceled,B.lineType,B.acId,B.tt,B.tr,B.creBal
		FROM '.self::$tbk.' A 
		JOIN '.self::$tbk1.' B ON (B.docEntry=A.docEntry)
		WHERE A.docEntry=\''.$_J['docEntry'].'\'',array(1=>'Error consultando recibo de pago.',2=>'No se encontró información del pago a anular.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			$errs=0;
			$qU=array();
			while($L=$q->fetch_assoc()){
				$qU[]=array('u','gfi_dac1','debBalDue='=>'debBalDue+'.$L['creBal'],'_wh'=>'acId=\''.$L['acId'].'\' LIMIT 1');
				if($L['tr']>0){//Revertir Doc
					$Q=self::revTT($L);
					if(_err::$err){ $errs=1; break; }
					$qU[]=array('u',$Q['tbk'],'balDue='=>'balDue+'.$L['creBal'],'_wh'=>'docEntry=\''.$L['tr'].'\' LIMIT 1');
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
	$ln=$P['ln'];
	if(!preg_match('/^(gvtSin|gvtSnd|gvtPnc)$/',$Q['tt'])){ _err::err($ln.'El id del asiento no corresponde a una linea valida para aplicar el pago (FV,NCP,NDC).'.$ori,3); return false; }
	if($Q['tt']=='gvtSin'){
		$tbk='gvt_oinv';
		$q2=a_sql::fetch('SELECT docEntry,serieId,docNum,canceled,cardId,balDue FROM '.$tbk.' WHERE docEntry=\''.$Q['tr'].'\' LIMIT 1',array(1=>$ln.'Error consultando factura para pago.',2=>$ln.'La factura de venta no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q2['canceled']=='Y'){ _err::err($ln.'La factura está anulada.',3); }
	}
	else if($Q['tt']=='gvtSnd'){
		$tbk='gvt_osnd';
		$q2=a_sql::fetch('SELECT docEntry,serieId,docNum,canceled,cardId,balDue FROM '.$tbk.' WHERE docEntry=\''.$Q['tr'].'\' LIMIT 1',array(1=>$ln.'Error consultando nota débito para pago.',2=>$ln.'La nota débito cliente no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q2['canceled']=='Y'){ _err::err($ln.'La nota débito cliente está anulada.',3); }
	}
	else if($Q['tt']=='gvtPnc'){
		$tbk='gvt_opnc';
		$q2=a_sql::fetch('SELECT docEntry,serieId,docNum,canceled,cardId,balDue FROM '.$tbk.' WHERE docEntry=\''.$Q['tr'].'\' LIMIT 1',array(1=>$ln.'Error consultando nota crédito para pago.',2=>$ln.'La nota crédito proveedor no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q2['canceled']=='Y'){ _err::err($ln.'La nota crédito proveedor está anulada.',3); }
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
	$Q=a_sql::fetch('SELECT AC.tt,AC.tr,AC.canceled,AC.lineType,AC.debBalDue,AC.accId 
	FROM gfi_dac1 AC 
	WHERE AC.acId=\''.$L['acId'].'\' LIMIT 1',array(1=>$ln.'Error revisando asiento para pago.'.$ori,2=>$ln.'El asiento no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText);}
	else{
		$Q=self::revTT($Q,$P);
	}
	
	return $Q;
}

static public function dacPost($nDoc,$Ld){
	$ori =' on[gvtRcv::dacPost()]';
	if($js=_js::ise($nDoc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
	$n=0; $errs=0;
	_ADMS::mApps('gfi/Dac');
	$nDac=new gfiDac(array('tt'=>self::$serie,'tr'=>$nDoc['docEntry']),$nDoc);
	$nDac->setLine($Ld);
	$nDac->post(); if(_err::$err){ return false; }
}

static public function logGet($D=array()){
	return Doc::logGet(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}

}
?>
