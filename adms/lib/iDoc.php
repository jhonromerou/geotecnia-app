<?php
class iDoc{
public $L1=array();
public $revWhs='Y';
public $handInv=false;
public $qtyMov='inQty';
public $priceFromAvg=false;
public $uniLine=false;
public $ori=false;
static $D=array();
public $Doc=array();
public $docEntry=0;
public $serieId=0;
public $docNum=0;
public $tbk='';
public $tbk1='';
public $tbk2='';

function __construct($P=array(),$Doc=array()){
	$this->revWhs=($P['revWhs']!='N'); //si handInv pedir
	$this->revWhsFrom=($P['revWhsFrom']=='Y'); //si handInv pedir
	$this->priceFromAvg=($P['priceFromAvg']=='Y');
	$this->qtyMov=($P['qtyMov']);//inQty, outQty
	$this->uniLine=($P['uniLine']=='Y');
	$this->saveL=($P['saveL']=='Y');
	$this->handInv=($P['handInv']=='Y');//debe ser inventariable
	$this->tbk=$P['tbk'];
	$this->tbk1=$P['tbk1'];
	$this->tbk2=$P['tbk2'];
	if($P['ori']){ $this->ori=$P['ori']; }
}
public function revL1($L=array(),$P=array(),$P2=array()){
	$ln=$P['ln']; $js=false;
	$ori=($this->ori)?' on['.$this->ori.']':' on[iDoc::revL1()]';
	$revWhs=($this->revWhs && $L['handInv']=='Y');
	$revWhsFrom=($this->revWhsFrom && $L['handInv']=='Y');
	$hOpenQty=(array_key_exists('openQty',$P));
	if($this->handInv && $L['handInv']!='Y'){ $js=_js::e(3,$ln.'El articulo debe ser inventariable.'.$ori); }
	else if($js=_err::iff(($hOpenQty && $P['openQty']<=0),$ln.'No hay cantidades pendientes por recibir en la orden de compra.'.$ori)){}
	else if($hOpenQty && $js=_err::iff($L['quantity']>$P['openQty'],$ln.'La cantidad a recibir es mayor a la pendiente.'.$ori)){}
	else if($js=_js::ise($L['itemId'],$ln.'Se debe definir el ID del artículo.'.$ori,'numeric>0')){}
	else if($js=_js::ise($L['itemSzId'],$ln.'Se debe definir el ID de la talla del artículo.'.$ori,'numeric>0')){}
	else if($js=_js::ise($L['quantity'],$ln.'Se debe definir la cantidad.'.$ori,'numeric>0')){}
	else if($revWhs && $js=_js::ise($L['whsId'],$ln.'Se debe definir la bodega'.$ori,'numeric>0')){ }
	else if($revWhsFrom && $js=_js::ise($L['whsIdFrom'],$ln.'Se debe definir la bodega de origen.'.$ori,'numeric>0')){ }
	else if($revWhsFrom && $L['whsIdFrom']==$L['whsId']){ $js=_js::e(3,$ln.'Bodega de origen y de destino no pueden ser iguales.'.$ori); }
	else{
		if($revWhs){//consultar inventario y definir Lineas
			$Lr=array('itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'whsId'=>$L['whsId'],'price'=>$L['price'],
			'numFactor'=>$L['numFactor']);
			$Lr[$this->qtyMov]=$L['quantity'];
			$tL=Ivt::iHandSet($Lr);
			if(_err::$err){ $js=_err::$errText; }
			else if($this->priceFromAvg){ /* Usar precio costo */
				$L['price']=$tL['sbPrice'];
				$L['priceLine']=$tL['sbPriceLine'];
			}
		}
	}
	//
	if($js==false){
		if($js=_js::ise($L['price'],$ln.'Se debe definir el precio del artículo.'.$ori,'numeric>0')){ }
		else if($js=_js::ise($L['priceLine'],$ln.'El valor de la linea no ha sido definido correctamente.'.$ori,'numeric>0')){}
		else{
			if($P2['setOpenQty']){ $L['openQty']=$L['quantity']; }
			$k=$P['k'];
			if($this->saveL){
				$this->L1[$k]=$L;
			}
			else if($this->uniLine){
				if(!array_key_exists($k,$this->L1)){ $this->L1[$k]=$L; }
				else{ $js=_js::e(3,$ln.'Ya existe una linea igual en el documento. Linea: '.$this->L1[$k]['lineNum'].$ori); }
			}
		}
	}
	return $js;
}
public function post($_J=array(),$P2=array()){
	if(_err::$err){}
	else{
		$Ld=$_J['L']; $Vats=$_J['Vats'];
		unset($_J['L'],$_J['Vats']);
		$errs=0; $nl=0; $qA=array();
		/* Revisar Lineas */
		foreach($Ld as $kn=>$L){ $nl++; $ln ='Linea '.$nl.': ';
			if($js=$this->revL1($L,array('ln'=>$ln,'k'=>$kn),$P2)){ _err::err($js); $errs++; break; }
			else{
				$this->L1[$kn]['lineNum']=$nl;
				$this->L1[$kn][0]='i'; $this->L1[$kn][1]=$this->tbk1;
			}
		}
		if($errs==0 && is_array($Vats)) foreach($Vats as $n=>$L){ /* Tax */
			$L[0]='i'; $L[1]=$this->tbk2; $L['_err1']='Linea de impuestos.';
			$this->L1[]=$L;
		}
		if($errs==0){/* Generar Doc, L1 y L2 */
			a_sql::transaction(); $cmt=false;
			$_J=docSeries::nextNum($_J,$_J);
			if(_err::$err){ $errs++; }
			else{
				$docEntry=a_sql::qInsert($_J,array('tbk'=>$this->tbk,'qk'=>'ud'));
				$_J['docEntry']=$docEntry;
				$this->docEntry=$_J['docEntry'];
				$this->serieId=$_J['serieId'];
				$this->docNum=$_J['docNum'];
				$this->Doc=$_J;
				if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
				else{
					a_sql::multiQuery($this->L1,0,array('docEntry'=>$docEntry));
					if(_err::$err){ $errs++; }
				}
			}
		}
		/* Contabilizar */
		/* Mover Inventario */
		/* Log */
	}
}

//Articulos
public function itm_post($_J=array(),$P2=array()){
	unset($_J['L'],$_J['Vats']);
	$_J=docSeries::nextNum($_J,$_J);
	if(_err::$err){ $errs++; }
	else{
		$docEntry=a_sql::qInsert($_J,array('tbk'=>$this->tbk,'qk'=>'ud'));
		$_J['docEntry']=$docEntry;
		$this->docEntry=$_J['docEntry'];
		$this->Doc=$_J;
		if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
		else{
			a_sql::multiQuery($this->L1,0,array('docEntry'=>$docEntry));
			if(_err::$err){ $errs++; }
		}
	}
}
public function itm_L($Lx=array(),$P=array(),$P2=array()){
	$nl=1;
	foreach($Lx as $n=> $L){
		$P['nl']=$nl; $nl++;
		$this->itm_Lrev($L,$P,$P2);
		if(_err::$err){ break; }
	}
}
public function itm_Lrev($L=array(),$P=array(),$P2=array()){
	$nl=$P['nl']; $js=false;
	$ln='Linea '.$nl.': ';
	$ori0=' on[iDoc::itm_Lrev()]';
	$ori=($this->ori)?' on['.$this->ori.']':' on[iDoc::itm_L()]';
	$revWhs=($this->revWhs && $L['handInv']=='Y');
	$revWhsFrom=($this->revWhsFrom && $L['handInv']=='Y');
	$hOpenQty=(array_key_exists('openQty',$P));
	if($this->handInv && $L['handInv']!='Y'){ $js=_js::e(3,$ln.'El articulo debe ser inventariable.'.$ori); }
	else if($js=_err::iff(($hOpenQty && $P['openQty']<=0),$ln.'No hay cantidades pendientes por recibir en la orden de compra.'.$ori)){}
	else if($hOpenQty && $js=_err::iff($L['quantity']>$P['openQty'],$ln.'La cantidad a recibir es mayor a la pendiente.'.$ori)){}
	else if($js=_js::ise($L['itemId'],$ln.'Se debe definir el ID del artículo.'.$ori,'numeric>0')){}
	else if($js=_js::ise($L['itemSzId'],$ln.'Se debe definir el ID de la talla del artículo.'.$ori,'numeric>0')){}
	else if($js=_js::ise($L['quantity'],$ln.'Se debe definir la cantidad.'.$ori,'numeric>0')){}
	else if($revWhs && $js=_js::ise($L['whsId'],$ln.'Se debe definir la bodega'.$ori,'numeric>0')){ }
	else if($revWhsFrom && $js=_js::ise($L['whsIdFrom'],$ln.'Se debe definir la bodega de origen.'.$ori,'numeric>0')){ }
	else if($revWhsFrom && $L['whsIdFrom']==$L['whsId']){ $js=_js::e(3,$ln.'Bodega de origen y de destino no pueden ser iguales.'.$ori); }
	else{
		if($revWhs){//consultar inventario y definir Lineas
			$Lr=array('itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'whsId'=>$L['whsId'],'price'=>$L['price'],
			'numFactor'=>$L['numFactor']);
			$Lr[$this->qtyMov]=$L['quantity'];
			$tL=Ivt::iHandSet($Lr);
			if(_err::$err){ $js=_err::$errText; }
			else if($this->priceFromAvg){ /* Usar precio costo */
				$L['price']=$tL['price'];
				$L['priceLine']=$tL['price']*$L['quantity'];
			}
		}
	}
	//
	if($js==false){
		if($js=_js::ise($L['price'],$ln.'Se debe definir el precio del artículo.'.$ori.$ori0,'numeric>0')){ }
		else if($js=_js::ise($L['priceLine'],$ln.'El valor de la linea no ha sido definido correctamente.'.$ori.$ori0,'numeric>0')){}
		else{
			if($P2['setOpenQty']){ $L['openQty']=$L['quantity']; }
			$k=$P['k'];
			$this->L1[$kn]['lineNum']=$nl;
			$L[0]='i'; $L[1]=$this->tbk1;
			if($this->saveL){
				$this->L1[$k]=$L;
			}
			else if($this->uniLine){
				if(!array_key_exists($k,$this->L1)){ $this->L1[$k]=$L; }
				else{ $js=_js::e(3,$ln.'Ya existe una linea igual en el documento. Linea: '.$this->L1[$k]['lineNum'].$ori); }
			}
		}
	}
	if($js){ _err::err($js); }
}
public function itm_vat($Vats){
	if(is_array($Vats)) foreach($Vats as $n=>$L){
		$L[0]='i'; $L[1]=$this->tbk2; $L['_err1']='Linea de impuestos.';
		$this->L1[]=$L;
	}
}
static public function bySlp($P2=array()){
	$slpA=($P2['slpAlias'])?$P2['slpAlias'].'.':'A.';
	$slps=a_ses::U_slpIds(array('f'=>$slpA.'slpId','r'=>'a','tbA'=>$P2['slpAlias']));
	return $slps;
}
static public function get($P=array(),$P2=array()){
	$Mx=array();
	if($P2['Mx']){ $Mx=$P2['Mx']; unset($P2['Mx']); }
	$ordBy='';
	$ordBy='ORDER BY A.docDate DESC';
	if(array_key_exists('orderBy',$P) && $P['orderBy']==false){ $ordBy=''; }
	if($P['orderByDef']){ $ordBy='ORDER BY '.$P['orderByDef']; }
	else if($P['orderBy']){
		switch($P['orderBy']){
			case 'docDateAsc' : $ordBy='ORDER BY A.docDate ASC, A.docEntry ASC'; break;
			case 'docDateDesc' : $ordBy='ORDER BY A.docDate DESC'; break;
			case 'oldest' : $ordBy='ORDER BY A.dateC ASC'; break;
			case 'dateCAsc' : $ordBy='ORDER BY A.dateC ASC'; break;
			case 'newest' : $ordBy='ORDER BY A.dateC DESC'; break;
			case 'dateCDesc' : $ordBy='ORDER BY A.dateC DESC'; break;
			case 'dateUpdAsc' : $ordBy='ORDER BY A.dateUpd ASC'; break;
			case 'dateUpdDesc' : $ordBy='ORDER BY A.dateUpd DESC'; break;
			case 'docTotalAsc' : $ordBy='ORDER BY A.docTotal ASC'; break;
			case 'docTotalDesc' : $ordBy='ORDER BY A.docTotal DESC'; break;
			case 'docEntryAsc' : $ordBy='ORDER BY A.docEntry ASC'; break;
			case 'docEntryDesc' : $ordBy='ORDER BY A.docEntry DESC'; break;
			case 'system' : $ordBy=''; break;
		}
	}

	if($P['__dbReportLen']=='full'){ $limit='null'; }
	if($P['__dbReportLen'] && preg_match('/^max[0-9]+$/',$P['__dbReportLen'])){
		$limit=str_replace('max','',$P['__dbReportLen']);
	}
	$fromA=$P['fromA'];
	$wh='';
	$omitFilt=false;
	if($P['__docEntry']){ $wh = 'AND A.docEntry=\''.$P['__docEntry'].'\' '; unset($P['__docEntry']); $omitFilt=true; }
	if($P['__docNum']){ $wh = 'AND A.docNum=\''.$P['__docNum'].'\' '; unset($P['__docNum']); $omitFilt=true; }
	$whA =($P['whA'])?$P['whA']:'';;
	unset($P['fie'],$P['orderBy'],$P['orderByDef'],$P['__dbReportLen'],$P['fromA'],$P['whA'],$P['get_owh'],$P['owh']);
	_ADMS::_lb('sql/filter');
	/* v. 2020, control por slpId */
	if($P2['permsBy']=='slps'){ $wh .=a_ses::ousp('slps',array('tbA'=>'A')); }
	if(!$omitFilt){ $wh.=a_sql_filtByT($P).' '; }
	$wh .=$whA;
	//echo $wh;
	$q=a_sql::query('SELECT '.$fromA.' WHERE 1 '.$wh.' '.$ordBy.' '.a_sql::nextLimit($limit),array(1=>'Error obteniendo listado de documentos: ',2=>'No se encontraron resultados.'));
	if(a_sql::$err && $P2['err']){ print_r($q); }
	$js=false;
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $Mx['L']=array();
		while($L=$q->fetch_assoc()){
			$Mx['L'][]=$L;
		}
		$js=_js::enc($Mx);
	}
	return $js;
}
static public function getOne($D=array(),$P2=array()){
	//fromA,fromB,docEntry
	$ori=' on[iDoc::getOne()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){  _err::err($js); return $js; }
	$isq=($D['r']=='query');
	$slps=array();
	$wh =($P['whA'])?'AND '.$P['whA'].' ':'';
	if($P2['permsBy']=='slps'){ $wh .=a_ses::ousp('slps',array('tbA'=>'A')); }
	$q=a_sql::fetch('SELECT '.$D['fromA'].' WHERE A.docEntry=\''.$D['docEntry'].'\' '.$wh.' LIMIT 1',array(1=>'Error obteniendo documento: '.$ori,2=>'No se encontró el documento '.$D['docEntry'].'.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return a_sql::$errNoText; }
	else{ $Mx=$q;  }
	if($D['fromB']){ $Mx['L'];
		$whB_all=($D['whBAll'])?$D['whBAll']:'B.docEntry=\''.$D['docEntry'].'\'';
		$q2=a_sql::query('SELECT '.$D['fromB'].' WHERE '.$whB_all.' '.$D['whB'].' ',array(1=>'Error obteniendo lineas del documento: '.$ori,2=>'El documento no tiene lineas guardadas.'.$ori));
		if($isq){
			if(a_sql::$err){  _err::err(a_sql::$errNoText); return a_sql::$errNoText; }
			$q['qL']=$q2;
			return $q;
		}
		else if(a_sql::$err){ $Mx['L']=json_decode(a_sql::$errNoText,1); }
		else{
			while($L=$q2->fetch_assoc()){
				$Mx['L'][]=$L;
			}
		}
	}
	if($D['r']=='Mx'){ return $Mx; }
	else{ echo _js::enc($Mx,'NO_PAGER'); }
}
static public function vStatus($P=array()){
	//docEntry,tbk,docEntryAlias,cancelOmit=Y,closeOmit=Y, isStatus, fie
	$ori=' on[iDoc::vStatus()]';
	$errs=false;
	if(_js::iseErr($P['docEntry'],'Se debe definir el número de documento.'.$ori)){ return true; }
	else if(_js::iseErr($P['tbk'],'Se debe definir la tbk.'.$ori)){ return true;}
	else if($P['reqMemo'] && $js=_js::ise($P['lineMemo'],'Debe definir el motivo del cambio de estado.')){ _err::err($js); return true; }
	else if($P['reqMemo'] && !_js::textLimit($P['lineMemo'],100)){ _err::err('Los detalles no puede exceder los 100 caracteres.',3); return true; }
	$fie='docStatus';
	if($P['fie']){ $fie .=','.$P['fie']; }
	$whDoc=($P['docEntryAlias'])?$P['docEntryAlias']:'docEntry';
	$q=a_sql::fetch('SELECT '.$fie.' FROM '.$P['tbk'].' WHERE '.$whDoc.'=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo estado el documento. '.$ori.': ',2=>'No se encontro el documento, no se obtuvo el estado.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); $errs=true; }
	else if($P['isOpen']=='Y' && $q['docStatus']=='O'){ _err::err('No se puede modificar un documento abierto.'.$ori,3); $errs=true; }
	else if($P['isStatus'] && $q['docStatus']==$P['isStatus']){ _err::err($P['isStatusText'].$ori,3); $errs=true; }
	else if($P['nisStatus'] && $q['docStatus']==$P['nisStatus']){ _err::err($P['nisStatusText'].$ori,3); $errs=true; }
	else if($P['cancelOmit']!='Y' && ($q['docStatus']=='N' || $q['canceled']=='Y')){ _err::err('El documento se encuentra anulado y no se puede modificar ('.$P['cancelOmit'].').'.$ori,3); $errs=true; }
	else if($q['docStatus']=='C' && $P['closeOmit']!='Y'){ _err::err('El documento se encuentra cerrado y no se puede modificar.'.$ori,3); $errs=true; }
	if($errs==false){
		$q['errs']=$errs;
		if($P['D']=='Y'){ self::$D=$q; }
		if($P['setLog']){
			$P['setLog']['docEntry']=$P['docEntry']; //tbk,lineMemo,campos=>valor
			self::logPost($P['setLog']);
		}
	}
	return $errs;
}
static public function putStatus($P=array()){
	//t,reqMemo=Y,log=doc99,docEntry,tbk
	$ori=' on[iDoc::putStatus()]';
	if($js=_js::ise($P['t'],'Debe definir tipo de actualización estado documento.')){ return _err::err($js); }
	else if(self::vStatus($P)){ return _err::$errText; }
	else{
		$setA='';
		switch($P['t']){
			case 'N': $setA='docStatus=\'N\', canceled=\'Y\',cancelDate=\''.date('Y-m-d').'\' '; break;
			case 'C': $setA='docStatus=\'C\''; break;
			case 'D': $setA='docStatus=\'D\''; break;
			case 'O': $setA='docStatus=\'O\''; break;
			default: $setA=$P['t']; break;
		}
		$setA=($P['set'])?','.$P['set']:$setA;
		if($P['qku']=='ud'){ $setA .=',userUpd=\''.a_ses::$userId.'\',dateUpd=\''.date('Y-m-d H:i:s').'\''; }
		$whDoc=($P['docEntryAlias'])?$P['docEntryAlias']:'docEntry';
		$u=a_sql::query('UPDATE '.$P['tbk'].' SET '.$setA.' WHERE '.$whDoc.'=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error actualizando estado documento. '.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			if($P['log'] && $u['aff_rows']>0){ self::logPost(array('docEntry'=>$P['docEntry'],'lineMemo'=>$P['lineMemo'],'docStatus'=>$P['t'],'serieType'=>$P['serieType'],'tbk'=>$P['log'])); }
			$js = _js::r('Estado de documento actualizado correctamente.');
		}
	}
	if(_err::$err){ return _err::$errText; }
	return $js;
}

static public function logPost($D=array(),$r=false){
	$datec=date('Y-m-d H:i:s');
	$tbk=$D['tbk'];
	$docEntry=$D['docEntry']; $lineMemo=$D['lineMemo'];
	$serieType=$D['serieType'];
	unset($D['tbk'],$D['docEntry'],$D['lineMemo'],$D['serieType']);
	foreach($D as $f =>$v){
		if($f=='dateC' || $f=='dateUpd'){ $v=$datec; }
		$Di=array('serieType'=>$serieType,'docEntry'=>$docEntry,'fiek'=>$f,'fiev'=>$v,'lineMemo'=>$lineMemo,'userId'=>a_ses::$userId,'dateC'=>$datec);
		$i1=a_sql::qInsert($Di,array('tbk'=>$tbk,'qDo'=>'insert'));
		if($r){ print_r($i1); }
	}
}

static public function tra1($D=array()){ //trans
	$D['dateC']=date('Y-m-d H:i:s');
	$i1=a_sql::qInsert($D,array('tbk'=>'doc_tra1'));
}
static public function tra1Get($D=array()){ //trans
	$ori=' on[iDoc::tra1Get()]';
	if(_js::iseErr($D['tt'],'No se ha definido tt.'.$ori)){ return false; }
	else if(_js::iseErr($D['tr'],'No se ha definido tr.'.$ori,'numeric>0')){ return false; }
	$wh=($D['wh'])?'AND '.$D['wh']:'';
	$q=a_sql::fetch('SELECT tt,tStatus,dtt,dStatus FROM doc_tra1 WHERE tt=\''.$D['tt'].'\' AND tr=\''.$D['tr'].'\' AND dStatus!=\'N\' '.$wh.' LIMIT 1',array(1=>'Error consultando relación.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else{ return $q; }
}
}
?>