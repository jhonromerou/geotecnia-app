<?php
$series='gfiTba';
function revBan($banId=0,$ct='origen'){
	$Ac=a_sql::fetch('SELECT AC.accId 
	FROM gfi_oban A
	LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)
	WHERE A.banId=\''.$banId.'\' LIMIT 1',array(1=>'Error obteniendo información de cuenta de '.$ct.'.',2=>'La cuenta de '.$ct.' no existe.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(_js::iseErr($Ac['accId'],'La cuenta contable asignada a la cuenta de '.$ct.' no existe.','numeric>0')){  }
	return $Ac;
}

if(_0s::$router=='GET tba'){ a_ses::hashKey('gfiTba');
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.* FROM gfi_otba A ';
	echo iDoc::get($_GET);
}
if(_0s::$router=='GET tba/view'){ a_ses::hashKey('gfiTba');
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.* FROM gfi_otba A ';
	echo iDoc::getOne($_GET);
}
else if(_0s::$router=='POST tba'){ a_ses::hashKey('gfiTba.write');
	if(_js::iseErr($_J['docDate'],'Se debe definir la fecha del documento')){}
	else if(_js::iseErr($_J['docTotal'],'Se debe definir el valor de transferencia.','numeric>0')){}
	else if(_js::iseErr($_J['banIdFrom'],'Se debe definir la cuenta de origen.','numeric>0')){}
	else if(_js::iseErr($_J['banIdTo'],'Se debe definir la cuenta de destino.','numeric>0')){}
	else if(_err::iff($_J['banIdFrom']==$_J['banIdTo'],'La cuenta de origen y de destino no pueden ser iguales.')){}
	if(_err::$err){ die(_err::$errText); }
	$accF=revBan($_J['banIdFrom'],'origen');
	if(_err::$err){ die(_err::$errText); }
	$accTo=revBan($_J['banIdTo'],'destino');
	if(_err::$err){ die(_err::$errText); }
	else{
		_ADMS::lib('docSeries');
		a_sql::transaction(); $cmt=false;
		$_J=docSeries::nextNum($_J,$_J);
		if(_err::$err){ $errs++; }
		if($errs==0){//generar Doc.
			$docEntry=a_sql::qInsert($_J,array('tbk'=>'gfi_otba','qk'=>'ud'));
			if(a_sql::$err){ $js=_err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
		}
		if($errs==0){//conta
			_ADMS::mApps('gfi/Acc');
			$nDac=new gfiDac(array('tt'=>$series,'tr'=>$docEntry),$_J);
			$nDac->setLine([
			array('lineType'=>'TB','cardId'=>$_J['cardId'],'accId'=>$accF['accId'],'creBal'=>$_J['docTotal']),
			array('lineType'=>'TB','docDate'=>$_J['docDate'],'cardId'=>$_J['cardId'],'accId'=>$accTo['accId'],'debBal'=>$_J['docTotal'])
			]);
			$nDac->post(); if(_err::$err){ $js=_err::$errText; }
			else{ $cmt=true; $js=_js::r('Transferencia Registrada correctamente.','"docEntry":"'.$docEntry.'"'); }
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}
?>