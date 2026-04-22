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
static public function post($_J=array()){
	self::revDoc($_J);
	if(_err::$err){}
	else{ $errs=0;
		$iAc=array();
		foreach($_J['L'] as $n=>$L){
			$balTotal=$L['debBal']+$L['creBal'];
			if(_js::iseErr($L['accId'],$ln.'Se debe definir la cuenta.','numeric>0')){ $errs++; break; }
			else if(_err::iff($balTotal==0,$ln.'Se debe definir valor para la cuenta')){ $errs++; break; }
			else if(_err::iff(($L['debBal']>0 && $L['creBal']>0),$ln.'No se puede registrar débito y crédito en una misma linea.')){ $errs++; break; }
			else{
				$qAc=a_sql::fetch('SELECT lvType,reqCard FROM gfi_opdc WHERE accId=\''.$L['accId'].'\' LIMIT 1',array(1=>$ln.'Error consultando cuenta.',2=>$ln.'La cuenta no existe.'));
				if(a_sql::$err){ _err::err(a_sql::$errNoText); $errs++; break; }
				else if(_err::iff($qAc['lvType']!='D',$ln.'La cuenta debe ser de detalle.')){ $errs++; break; }
				else if(_err::iff($qAc['reqCard']=='Y' && _js::ise($L['cardId'],'','numeric>0'),$ln.'La cuenta requiere tercero.')){ $errs++; break; }
				else{
					$iAc[]=$L;
				}
			}
		}
		$_J['docStatus']='C'; unset($_J['L']);
		a_sql::transaction(); $cmt=false;
		if($errs==0){
			$docEntry=a_sql::qInsert($_J,array('tbk'=>'gfi_dcc1','qk'=>'ud'));
			if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
			else{
				a_sql::multiQuery($iAc,0,array('docEntry'=>$docEntry));
				if(_err::$err){ $errs++; }
			}
		}
		if($errs==0){ /*Contabilizar */
			$nDac=new gfiDac(array('tbk'=>'gfi_odcc','tt'=>self::$serie,'tr'=>$docEntry,
	));
			$nDac->setDoc(); if(_err::$err){ return false; }
			$nDac->setLine($iAc);
			$nDac->setAll(); if(_err::$err){ return false; }
			$nDac->post(); if(_err::$err){ return false; }
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
			Doc::logPost(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
		}
		a_sql::transaction($cmt);
	}
	return $js;
}

}
?>