<?php
class ivtEgr{
	static $serie='ivtEgr';
	static $AI='docEntry';
	static $tbk='ivt_oegr';
	static $tbk1='ivt_egr1';
	static $tbk99='ivt_doc99';
	static $doAcc='Y'; //contabilizar
	static public function setTbk($P=array()){
		self::$serie=$P['serie'];
		self::$tbk=$P['tbk'];
		self::$tbk1=$P['tbk1'];
		if($P['tbk99']){ self::$tbk99=$P['tbk99']; }
		if($P['doAcc']){ self::$tbk99=$P['doAcc']; }
	}
	static public function revDoc($_J=array()){
		if(_js::iseErr($_J['cardId'],'Se debe definir un contacto.','numeric>0')){}
		else if(_js::iseErr($_J['cardName'],'Se debe definir un contacto (2).')){}
		else if(_js::iseErr($_J['docDate'],'La fecha del documento debe estar definida.')){}
		else if($js=_js::textMax($_J['ref1'],20,'Ref. 1: ')){ _err::err($js); }
		else if($js=_js::textMax($_J['ref2'],20,'Ref. 2: ')){ _err::err($js); }
		else if($js=_js::textMax($_J['lineMemo'],200,'Detalles ')){ _err::err($js); }
		else if(!is_array($_J['L'])){ _err::err('No se han enviado lineas para el documento.',3); }
	}
	static public function get($D){
		_ADMS::lib('iDoc');
		$D['fromA']='A.docEntry,A.serieId,A.docNum,A.docDate,A.docStatus,A.canceled,A.docClass,A.whsId,A.lineMemo,A.userId,A.dateC,A.docType FROM '.self::$tbk.' A';
		return iDoc::get($D);
	}
	static public function getOne($D=array()){
		_ADMS::lib('docSeries,iDoc');
		$D['fromA']='C.licTradType,C.licTradNum,A.* FROM '.self::$tbk.' A LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
		$D['fromB']='I.itemCode, I.itemName,I.udm, B.* FROM '.self::$tbk1.' B 
		LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)';
		return iDoc::getOne($D);
	}
	static public function toCopy($D=array()){
		return self::getOne($D);
	}
	static public function post($_J=array()){
		self::revDoc($_J);
		a_sql::transaction(); $cmt=false;
		if(!_err::$err){ $docEntry=a_sql::nextID(self::$tbk,['AI'=>self::$AI]); $_J['docEntry']=$docEntry; }
		if(!_err::$err){
			$_J['docStatus']='C'; $errs=0;
			_ADMS::lib('JLog,docSeries');
			_ADMS::mApps('ivt/Ivt');
			$nDoc=new ivtDoc(array('tt'=>self::$serie,
			'tbk'=>self::$tbk,'tbk1'=>self::$tbk1,
			'qtyMov'=>'outQty','revWhs'=>'Y','handInv'=>'Y',
			'sbPriceFromCost'=>'Y',
			'ori'=>'ivtEgr::post()'));
			$nl=1; $reqAcc=array('accIvt','accCost');
			foreach($_J['L'] as $nx=>$L){
				$L['handInv']='Y';
				if($_J['whsId']>0){ $L['whsId']=$_J['whsId']; }
				$nDoc->itmRev($L,array('reqAcc'=>$reqAcc,'ln'=>'Linea '.$nl.': ')); $nl++;
				if(_err::$err){ break; }
				$L['outQty']=$L['quantity'];
				$nDoc->handSet($L,array('whsId'=>$L['whsId']));
				unset($L['outQty']);
				$L['price']=$nDoc->La['cost'];
				$L['priceLine']=$nDoc->La['costLine'];
				//L1 Doc
				$L[0]='i'; $L[1]=self::$tbk1; $L['docEntry']=$docEntry;
				$nDoc->L1[]=$L;
				$costT=$nDoc->La['cost']*$L['quantity'];
				//L1 Dac
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accIvt'],'creBal'=>$costT,'accCode'=>'14xx');
				$nDoc->Ld[]=array('accId'=>$nDoc->La['accCost'],'debBal'=>$costT,'accCode'=>'61xx');
			}
			if(!_err::$err){ $nDoc->post($_J); }
			if(_err::$err){ $errs++;  }
			if($errs==0){/* Contabilizar */
				self::dacPost($nDoc);
				if(_err::$err){ $errs++; }
			}
			if($errs==0){/* Mover Inventario */
				$nDoc->handPost();
				if(_err::$err){ $errs++; }
			}
			if($errs==0){ $cmt=true; //Log
				$js=_js::r('Documento guardado correctamente.','"docEntry":"'.$docEntry.'"');
				_ADMS::lib('JLog');
				JLog::post(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$docEntry,'dateC'=>1));
				JLog::rel1(['ott'=>$_J['ott'],'otr'=>$_J['otr'],
				'tt'=>self::$serie,'tr'=>$docEntry,'serieId'=>$_J['serieId'],'docNum'=>$_J['docNum']
				]);
			}
		}
		a_sql::transaction($cmt);
		_err::errDie();
		return $js;
	}

	static public function putStatusCancel($D=array()){
		a_sql::transaction(); $cmt=false;
		_ADMS::lib('iDoc');
		$ori=' on[ivtEgr::putCancel()]';
		iDoc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'serieType'=>self::$serie,'log'=>self::$tbk99,'reqMemo'=>'Y','lineMemo'=>$D['lineMemo']));
		if(_err::$err){ $js=_err::$errText; }
		else{ $errs=0;
			_ADMS::mApps('gfi/Dac');
			gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$D['docEntry']));
			if(_err::$err){ $js=_err::$errText; }
			else{
				_ADMS::mApps('ivt/Ivt'); 
				IvtDoc::rever(array('tt'=>self::$serie,'tr'=>$D['docEntry'],'docDate'=>date('Y-m-d')));
				if(_err::$err){ $js=_err::$errText;}
				else{ $cmt=true;
					$js=_js::r('Documento anulado correctamente.');
				}
			}
		}
		a_sql::transaction($cmt);
		return $js;
	}

	static public function dacPost($nDoc){
		if(self::$doAcc=='Y'){
			$ori =' on[ivtEgr::dacPost()]';
			if($js=_js::ise($nDoc->Doc['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){ _err::err($js); return array(); }
			$n=0; $errs=0;
			_ADMS::mApps('gfi/Dac');
			$nDac=new gfiDac(array('tt'=>self::$serie,'tr'=>$nDoc->Doc['docEntry']));
			$nDac->Doc=$nDoc->Doc;
			$nDac->setLine($nDoc->Ld); if(_err::$err){ return false; }
			$nDac->post(); if(_err::$err){ return false; }
		}
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