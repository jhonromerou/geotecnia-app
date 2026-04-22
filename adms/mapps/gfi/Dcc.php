<?php
class gfiDcc{
static $serie='gfiDcc';
static $tbk99='gvt_doc99';
static public function revDoc($_J=array()){
	if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.')){}
	else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['ref2'],20,'Ref. 2: ')){ _err::err($js); }
	else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ _err::err($js); }
	else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
}

static public function revLine($L=array(),$P=array()){
	$balTotal=($L['debBal'])?$L['debBal']*1:0;
	$balTotal +=($L['creBal'])?$L['creBal']*1:0;
	$ln='Linea '.$P['lineNum'].': ';
	$L['lineNum']=$P['lineNum'];
	$L['docDate']=$P['docDate'];
	if(_js::iseErr($L['accId'],$ln.'Se debe definir la cuenta.','numeric>0')){}
	else if(_err::iff($balTotal==0,$ln.'Se debe definir valor para la cuenta')){}
	else if(_err::iff(($L['debBal']>0 && $L['creBal']>0),$ln.'No se puede registrar débito y crédito en una misma linea.')){}
	else{
		if($L['debBal']){ unset($L['creBal']); }
		if($L['creBal']){ unset($L['debBal']); }
		$qAc=a_sql::fetch('SELECT lvType,reqCard FROM gfi_opdc WHERE accId=\''.$L['accId'].'\' LIMIT 1',array(1=>$ln.'Error consultando cuenta.',2=>$ln.'La cuenta no existe.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText);}
		else if(_err::iff($qAc['lvType']!='D',$ln.'La cuenta debe ser de detalle.')){}
		else if(_err::iff($qAc['reqCard']=='Y' && _js::ise($L['cardId'],'','numeric>0'),$ln.'La cuenta requiere tercero.')){}
		else{
			$L[0]='i'; $L[1]='gfi_dac1';
			if($L['id']){ 
				$L['acId']=$L['id']; unset($L['id']);
				$L['_unik']='acId';
			}
			unset($L['cardName']);
		}
	}
	return $L;
}

static public function post($_J=array()){
	unset($_J['Vats']);
	self::revDoc($_J);
	if(_err::$err){}
	else{ $errs=0;
		$iAc=array(); $nl=0;
		$debBal=$creBal=0;
		foreach($_J['L'] as $n=>$L){ $nl++;
			$L=self::revLine($L,array('lineNum'=>$nl,'docDate'=>$_J['docDate']));
			if(_err::$err){ $errs++; break; }
			else if($L['debBal']){ $debBal+=$L['debBal']; }
			else if($L['creBal']){ $creBal+=$L['creBal']; }
			$iAc[]=$L;
		}
		if($errs==0 && _err::iff($debBal!=$creBal,'Los débitos y crédito deben ser iguales.')){ return false; }
		$_J['docTotal']=$debBal;
		$_J['docStatus']='C'; unset($_J['L']);
		a_sql::transaction(); $cmt=false;
		$_J=docSeries::nextNum($_J,$_J);
		if(_err::$err){ $errs++; }
		if($errs==0){
			$docEntry=a_sql::qInsert($_J,array('tbk'=>'gfi_odcc','qk'=>'ud'));
			if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
			else{
				a_sql::multiQuery($iAc,0,array('tt'=>self::$serie,'tr'=>$docEntry,'docEntry'=>$docEntry));
				if(_err::$err){ $errs++; }
			}
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			Doc::logPost(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		}
		a_sql::transaction($cmt);
	}
	return $js;
}
static public function put($_J=array()){
	if(_js::iseErr($_J['docEntry'],'Se debe definir Id del documento a editar.','numeric>0')){ return false; }
	unset($_J['Vats']);
	self::revDoc($_J);
	if(_err::$err){}
	else{ $errs=0;
		$iAc=array(); $nl=0;
		$debBal=$creBal=0;
		foreach($_J['L'] as $n=>$L){ $nl++;
			$L=self::revLine($L,array('lineNum'=>$nl,'docDate'=>$_J['docDate']));
			if(_err::$err){ $errs++; break; }
			else if($L['debBal'] && $L['delete']!='Y'){ $debBal+=$L['debBal']; }
			else if($L['creBal'] && $L['delete']!='Y'){ $creBal+=$L['creBal']; }
			$iAc[]=$L;
		}
		if($errs==0 && _err::iff($debBal!=$creBal,'Los débitos y crédito deben ser iguales.')){ return false; }
		$_J['docTotal']=$debBal;
		unset($_J['serieId'],$_J['docNum'],$_J['L']);
		a_sql::transaction(); $cmt=false;
		if(_err::$err){ $errs++; }
		if($errs==0){
			$docEntry=$_J['docEntry'];
			a_sql::uniRow($_J,array('tbk'=>'gfi_odcc','wh_change'=>' docEntry=\''.$docEntry.'\' LIMIT 1'));
			if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
			else{
				a_sql::multiQuery($iAc,0,array('tt'=>self::$serie,'tr'=>$docEntry,'docEntry'=>$docEntry));
				if(_err::$err){ $errs++; }
			}
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento actualizado correctamente.','"docEntry":"'.$docEntry.'"');
		}
		a_sql::transaction($cmt);
	}
	return $js;
}
static public function logGet($D=array()){
	return Doc::logGet(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$D['docEntry']));
}
}
?>