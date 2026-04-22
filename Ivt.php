<?php
class Ivt{
static $err=false;
static $tb_oitw='ivt_oitw';
static $tb_wtr1='ivt_wtr1';
static $errText='';
static $D=array();
static $canNegDef='N';
static public function clear2oitw($L){
	unset($L['inQty'],$L['outQty'],$L['quantity'],$L['numFactor'],$L['price'],$L['sbPrice'],$L['sbPriceLine']);
	return $L;
}
static public function getAvgPrice($D=array()){//no usando en ivtDoc
	$qty=$D['inQty']-$D['outQty'];
	$vtotal=$D['stockValue']+($D['price']*$qty);
	$ntotal=$D['onHand']*1+$qty;/* + o - */
	if($ntotal==0){ $avgP=0; $vtotal=0; }
	else if($ntotal<0){ $avgP=0; $vtotal=0; }
	else{ $avgP=$vtotal/$ntotal; }
	/* (stockValue + ($)entry) / onHand + (q)entry */
	$D['stockValue']=$vtotal;
	$D['avgPrice']=$avgP;
	return $D;
}
static public function getInf($L=array(),$P=array()){
	$ori=' on[Ivt::getInf()]';
	$revWhs=($P['revWhs']!='N');//revisar bodega
	$P=($P)?$P:array();
	$ln=$P['ln'];
	$fie='W1.id,I.itemCode,G1.itemSzId,G1.itemSize,W.whsId,W.whsCode,
	I.handInv,I.buyItem,I.costMet,I.invPrice,I.canNeg,
	W1.itemId, W1.onHand,W1.avgPrice,W1.stockValue';
	$leftWh = 'W1.whsId=\''.$L['whsId'].'\' AND W1.itemId=I.itemId AND W1.itemSzId=\''.$L['itemSzId'].'\'';
	$lefJ='';
	/* Requerir cuentas */
	$AccT=array('accIvt'=>'Inventarios','accCost'=>'Costo','accAwh'=>'Ajuste de Inventarios',
	'accBuyRem'=>'Remisión de Compra');
	if($P['reqAcc']){
		foreach($P['reqAcc'] as $ncc){ $fie .=',IC.'.$ncc; }
		$lefJ .= 'LEFT JOIN itm_oiac IC ON (IC.accgrId=I.accgrId)';
	}
	/*obtener datos de articulo y disponible */
	$qHand =a_sql::fetch('SELECT '.$fie.'
	FROM itm_oitm I
	'.$lefJ.'
	LEFT JOIN ivt_owhs W ON (W.whsId=\''.$L['whsId'].'\')
	LEFT JOIN ivt_oitw W1 ON ('.$leftWh.')
	LEFT JOIN itm_grs1 G1 ON (G1.itemSzId=\''.$L['itemSzId'].'\')
	WHERE I.itemId=\''.$L['itemId'].'\' AND G1.itemSzId=\''.$L['itemSzId'].'\' LIMIT 1',array(1=>$ln.'Error consultando información de inventario para el producto: '.$ori,2=>$ln.'El artículo no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if($revWhs && _js::iseErr($qHand['whsId'],$ln.'La bodega no existe'.$ori,'numeric>0')){ $errs=1; }
	else if(_js::iseErr($qHand['itemSzId'],$ln.'El subproducto no existe'.$ori,'numeric>0')){ $errs=1; }
	else{
		//existe, debe actualizarse
		if($qHand['id']>0){ $qHand['_upd']='Y'; }
		$errs=0;
		$ln = $ln.' '.$qHand['itemCode'].'-'.$qHand['itemSize'].') ';
		$mIvt=($qHand['handInv']=='Y');
		if($P['reqAcc']){
			foreach($P['reqAcc'] as $ncc){
				if(!$mIvt && ($ncc=='accIvt' || $ncc=='accCost' || $ncc=='accBuyRem')){}
				else if(_js::iseErr($qHand[$ncc],$ln.'El grupo del articulo no tiene definida cuenta de '.$AccT[$ncc].' ('.$ncc.')'.$ori,'numeric>0')){ $errs=1; break; }
			}
		}
		if($errs==0){
			if($qHand['avgPrice']<=0){ $qHand['avgPrice']=0; }
			if($qHand['stockValue']<=0){ $qHand['stockValue']=0; }
			$qHand['onHand']=($qHand['onHand']=='')?0:$qHand['onHand']*1;
			//Determinar Costo
			if($qHand['handInv']=='N' && $qHand['buyItem']=='Y'){ $qHand['cost']=$qHand['invPrice']; }
			else if($qHand['handInv']=='N' && $qHand['sellItem']=='Y'){ $qHand['cost']=$qHand['invPrice']; }
			else if($qHand['handInv']=='N'){ $qHand['cost']=0; }
			else if($qHand['costMet']=='PP'){ $qHand['cost']=$qHand['avgPrice']; }
			else if($qHand['costMet']=='CD'){ $qHand['cost']=$qHand['invPrice']; }
			if($P['docType']=='sell' && $L['numFactor']>0){
				$qHand['costLine']=$qHand['cost']*$L['quantity']*$L['numFactor']; //1venta tiene 4 und
			}
			else{ $qHand['costLine']=$qHand['cost']*$L['quantity']; }
		}
		return $qHand;
	}
}
static public function handRev($qHand=array(),$P2=array()){
	$_ori=' on[Ivt::handRev()]. (S:'.self::$canNegDef.', I:'.$qHand['canNeg'].')';
	/* si W1.item existe en ivt debe actualizarse */
	if($qHand['itemId']>0){ $qHand['_upd']='Y'; }
	if($P2['outQty']>0 && $qHand['onHand']<=0 && (self::$canNegDef=='N' || (self::$canNegDef=='item' && $qHand['canNeg']=='N'))){
		$itemName=$qHand['itemCode'].'-'.$qHand['itemSize'].') ';
		_err::err($itemName.'La cantidad ('.($P2['outQty']*1).') es mayor que la disponible ('.$qHand['onHand'].') en la bodega '.$qHand['whsCode'].$_ori,3);
	}
	else{ return $qHand; }
}
static public function onHand($L=array(),$P=array()){
	$qHand=self::getInf($L,$P);
	if(_err::$err){}
	else{
		if($qHand['handInv']=='N'){ return 'C'; }//continue
		/* si item existe en ivt debe actualizarse */
		if($qHand['itemId']>0){ $qHand['_upd']='Y'; }
		if($L['outQty']>0 && $qHand['onHand']<=0 && (self::$canNegDef=='N' || (self::$canNegDef=='item' && $qHand['canNeg']=='N'))){
			$itemName=$qHand['itemCode'].'-'.$qHand['itemSize'].') ';
			_err::err($itemName.'La cantidad digitada ('.($L['outQty']*1).') es mayor que la disponible ('.$qHand['onHand'].').'.$_ori,3);
		}
		else{ return $qHand; }
	}
}

static public function onHand_put($D=array(),$P=array()){
	$_ori=' on[Ivt::onHand_put()]';
	$_avgPrice=$_stockVal=$_reCal=0;
	if($P['upds']){
		if(preg_match('/avgPrice/',$P['upds'])){ $_avgPrice=true; }
	}
	$revItm=($P['revItm']!='N');
	/*Verificar origen */
	if(_js::iseErr($P['docDate'],'Se debe definir fecha para movimiento.'.$_ori.'.')){}
	else if(_js::iseErr($P['tt'],'TT debe estar definido para movimiento.'.$_ori.'.')){}
	else if(_js::iseErr($P['tr'],'TR debe estar definido para movimiento.'.$_ori.'.')){}
	else if(!is_array($D)){ _err::err('No se recibieron lineas para actualizar inventario.'.$ori,3); }
	else{
		self::$canNegDef=_Mdl::cnfGet('ivtCanNeg');
		if(_err::$err){}
		else{
		$qus=array();
		foreach($D as $n => $L){ /* Revision lineas */
			$qty=$inQty=$outQty=0;
			if($L['inQty']){ $qty=$inQty=$L['inQty']; }
			if($L['outQty']){ $qty=$outQty=$L['outQty']; }
			if($P['whsId']){ $L['whsId']=$P['whsId']; };
			$qtyLine=$qty+abs($L['isCommited'])+abs($L['onOrder']);
			if(_js::iseErr($L['whsId'],'La bodega debe estar definida.'.$_ori)){ break; }
			else if($revItm && _js::iseErr($L['itemId'],'Id artículo debe estar definido.'.$_ori)){ break; }
			else if($revItm && _js::iseErr($L['itemSzId'],'Id de subproducto debe estar definido.'.$_ori)){ break; }
			else if(_js::iseErr($qtyLine,'La cantidad debe estar definida y ser mayor a 0. ('.$qtyLine.').'.$_ori,'numeric>0')){  break; }
			else{
				$qHand=self::onHand($L);
				if(_err::$err){}
				else if($qHand=='N'){ continue; }
				else{
					$L['onHand']=$qHand['onHand'];
					$L['stockValue']=$qHand['stockValue'];
					/* promed o def */
					if($P['avgPriceFrom']!='price'){// sino paso el costo a usar then...
						if($qHand['costMet']=='CD'){
							$L['price']=$qHand['invPrice'];
						}
						else{// costMet==PP
							$L['price']=$qHand['avgPrice'];
						}
					}
					$L=self::getAvgPrice($L);
					$price=$L['price'];
					$numFactor=($L['numFactor'])?$L['numFactor']:1;
					$numFactor=($numFactor<=0)?1:$numFactor;
					$inQty=$inQty*$numFactor;
					$outQty=$outQty*$numFactor;
					if($L['isCommited']){ $L['isCommited'] = $L['isCommited']*$numFactor; }
					if($L['onOrder']){ $L['onOrder'] = $L['onOrder']*$numFactor; }
					$newHand=$qHand['onHand']+$inQty-$outQty;
					$Dm=$L;
					$Dm['docDate']=$P['docDate'];
					$Dm['serieId']=$P['serieId'];
					$Dm['docNum']=$P['docNum'];
					$Dm['tt']=$P['tt'];
					$Dm['tr']=$P['tr'];
					$Dm['cdcId']=$P['cdcId'];
					$Dm['cardId']=$P['cardId'];
					$Dm['quantity']=$qty;
					$Dm['price']=$price;
					$Dm['priceLine']=$price*$qty;
					$Dm['onHandAt']=$newHand;
					$datec=date('Y-m-d');
					$Dm['userId']=a_ses::$userId;
					$Dm['dateC']=$datec;
					unset($Dm['onHand'],$Dm['isCommited'],$Dm['onOrder']);
					$L=self::clear2oitw($L);
					$L['_err1']='Error actualización cantidad en inventario.'.$_ori;
					$L[1]='ivt_oitw';
					if($qHand['_upd']=='Y'){/* update */
						$L[0]='u';
						$L['_wh']='whsId=\''.$L['whsId'].'\' AND itemId=\''.$L['itemId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1';;
						if($qty>0){ $L['onHand']=$newHand; }
						if($L['isCommited']){
							$L['isCommited=']='isCommited+'.$L['isCommited']; unset($L['isCommited']);
						}
						if($L['onOrder']){
							$L['onOrder=']='onOrder+'.$L['onOrder']; unset($L['onOrder']);
						}
					}
					else{/*insert */
						$L[0]='i'; $L['onHand']=$inQty-$outQty; }
					$qus[]=$L;
					if($qty>0){//inQty+qty afecta solamente
						$Dm[0]='i'; $Dm[1]='ivt_wtr1'; $Dm['_err1']='Error registrando histórico.'.$_ori;
						$qus[]=$Dm;
					}
				}
			}
		}
		if(!_err::$err && count($qus)>0){/* Registras trans */
			a_sql::multiQuery($qus);
			if(_err::$err){}
		}
		}
	}
	return _err::$err;
}
static public function onHand_rever($P=array()){
	$js=false; $org=' on Ivt::onHand_rever().';
	if(_js::iseErr($P['tt'],'Se debe definir TT '.$org)){}
	else if(_js::iseErr($P['tr'],'Se debe definir TT'.$org)){}
	else if(_js::iseErr($P['docDate'],'Se debe definir la fecha de la reversión'.$org)){}
	else{
		$gB='whsId,itemId,itemSzId,price';
		$q=a_sql::query('SELECT '.$gB.',SUM(inQty) inQty,SUM(outQty) outQty FROM ivt_wtr1 WHERE tt=\''.$P['tt'].'\' AND tr=\''.$P['tr'].'\' GROUP BY '.$gB.' ORDER BY outQty DESC',array(1=>'Error obteniendo registros para revertir movimientos de inventario: '));
		$Liv=array();
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1){ $errs=0;
			while($L=$q->fetch_assoc()){
				if($L['inQty']>0 && $L['outQty']>0){
					$outQty=$L['outQty'];
					$L['outQty']=$L['inQty']; unset($L['inQty']);
					$Liv[]=$L;
					$L['inQty']=$outQty; unset($L['outQty']);
					$Liv[]=$L;
				}
				else{
					if($L['inQty']>0){
						$L['outQty']=$L['inQty']; unset($L['inQty']);
					}
					else if($L['outQty']>0){
						$L['inQty']=$L['outQty']; unset($L['outQty']);
					}
				$Liv[]=$L;
				}
			}
			if(!_err::$err){
				self::onHand_put($Liv,$P);
				if(_err::$err){ }
			}
		}
	}
}

static public function onOrderCommit($L=array(),$P=array()){
	$ori=' on[Ivt::onOrderCommit()]';
	$Liv=array();
	if(!is_array($L)){_err::err('No se recibieron datos para actualizar.',$ori); }
	else{
	$revItm=($P['revItm']!='N');
		foreach($L as $l =>$D){
			$numFactor=($D['numFactor'])?$D['numFactor']:$D['buyFactor'];
			$numFactor=($numFactor<=0)?1:$numFactor;
			$qty=$D['onOrder']+$D['isCommited'];
			unset($D['handInv'],$D['quantity'],$D['buyFactor'],$D['numFactor']);
			if($P['whsId']){ $D['whsId']=$P['whsId']; };
			if(_js::iseErr($D['whsId'],'La bodega debe estar definida.'.$ori,'numeric>0')){ break; }
			else if($revItm && _js::iseErr($D['itemId'],'El ID del artículo no ha sido definido.'.$ori)){  break; }
			else if($revItm && _js::iseErr($D['itemSzId'],'La talla del artículo no ha sido definida.'.$ori)){ break; }
			else if($qty==0){ _err::err('No se ha definido cantidad a actualizar.'.$ori,3); break; }
			else{
				$wh = 'itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
				$set1 = ' ';
				if($D['isCommited']){ $isCommited=$D['isCommited']*$numFactor;
					$D['isCommited=']='isCommited+'.$isCommited; unset($D['isCommited']);
					$D['isCommited']=$isCommited;
				}
				if($D['onOrder']){ $onOrder=$D['onOrder']*$numFactor;
					$D['onOrder=']='onOrder+'.$onOrder; unset($D['onOrder']);
					$D['onOrder']=$onOrder;
				}
				$D=self::clear2oitw($D);
				$r=a_sql::uniRow($D,array('tbk'=>'ivt_oitw','wh_change'=>$wh));
				if(a_sql::$err){ _err::err('Error actualizando comprometidos en tabla inventario: '.a_sql::$errText,3); break; }
			}
		}
	}
}
static public function putFromDoc($P=array(),$FIE=array()){
	//docEntry,tbk1,qtyFie,onOrder,isCommited,inQty,outQty, +-
	$ori=' on[Ivt::putFromDoc()]';
	$qtyFie=($P['qtyFie'])?$P['qtyFie']:'quantity';
	$row0=true; //poner datos solo 1 vez
	$P['tr']=$P['docEntry'];
	$gb ='A.serieId,A.docNum,A.cardId,A.cdcId,B.itemId,B.itemSzId,B.whsId,B.numFactor';
	$fie = $gb.',B.price sbPrice,B.priceLine sbPriceLine';
	$gb .=',B.price,B.priceLine';

	if(count($FIE)>0){
		$gb ='A.serieId,A.docNum,A.cardId,A.cdcId,B.itemId,B.itemSzId';
		$fie = $gb.',B.price sbPrice,B.priceLine sbPriceLine';
		$gb .=',B.price,B.priceLine';
		foreach($FIE as $k=>$v){ $fie .=',\''.$v.'\' as '.$k; }
	}
	$whGet=($P['whGet'])?$P['whGet']:'AND B.handInv=\'Y\' ';
	$fie .=($P['fie'])?','.$P['fie']:'';/* price,whsId  */
	$gb .=($P['fie'])?','.$P['fie']:'';/* price,whsId */
	$q=a_sql::query('SELECT '.$fie.',SUM(B.'.$qtyFie.') quantity
	FROM '.$P['tbk'].' A
	JOIN '.$P['tbk1'].' B ON (B.docEntry=A.docEntry)
	WHERE B.docEntry=\''.$P['docEntry'].'\' '.$whGet.' GROUP BY '.$gb,array(1=>'Error obteniendo lineas del documento.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){ /*Solo si tiene lineas inventario */
		$Liv=array(); $ordCom=false; $onHand=false;
		while($L=$q->fetch_assoc()){
			if($P['onOrder']){ $L['onOrder'] = ($P['onOrder']=='-')?$L['quantity']*-1:$L['quantity']; $ordCom=1; }
			if($P['isCommited']){ $ordCom=1;
				$L['isCommited'] = ($P['isCommited']=='-')?$L['quantity']*-1:$L['quantity']; 
			}
			if($P['+-']){//si es - o +
				if($L['quantity']>0){ $P['inQty']='+'; }
				else if($L['quantity']<0){ $P['outQty']='-'; $L['quantity']=$L['quantity']*-1; }
			}
			if($P['inQty']){ $L['inQty'] = $L['quantity']; $onHand=1; }
			if($P['outQty']){ $L['outQty'] = $L['quantity']; $onHand=1; }
			if($onHand && $row0){ $row0=false;
				$P['serieId']=$L['serieId'];
				$P['docNum']=$L['docNum'];
				$P['cardId']=$L['cardId'];
				$P['cdcId']=$L['cdcId'];
			}
			unset($L['serieId'],$L['docNum'],$L['cardId'],$L['cdcId']);
			$Liv[]=$L;
		}
		$P['revItm']='N'; unset($P['docEntry'],$P['tbk'],$P['tbk1'],$P['qtyFie']);
		if($onHand){
			self::onHand_put($Liv,$P);
		}
		else if($ordCom){ self::onOrderCommit($Liv,$P); }
		if(_err::$err){}
	}
}
}

class IvtDoc{
public $La=array(); //L actual
public $La2=array(); //L actual
public $Ls=array(); //L guardado
public $Livt=array();/* Lineas Inventario */
public $vats=false;/* Impuestos */
public $revHand='Y'; //Revisar inventario
public $revWhs='Y';
public $fromDlv=false;
public $handInv=false;
public $docType='';
public $qtyMov='inQty';
public $priceIsCost=false;//compras
public $priceFromCost=false;
public $sbPriceFromCost=false;
public $sbPriceFromLine=false;
public $priceLineFromAvg=false;
public $avgPriceFrom='N';
public $uniLine=false;
public $ori=false;
public $tt='';
public $L1=array();//Lineas revisadas y ok
public $Ld=array();//Definir asientos

function __construct($P=array()){
	$ori =' on [ivtDoc::__c()])';
	if(_js::iseErr($P['tt'],'Se debe definir tt.'.$ori)){}
	$this->tt=$P['tt']; //si handInv pedir
	$this->fromDlv=($P['fromDlv']=='Y'); //Basado en remision
	$this->vats=($P['vats']=='Y'); //
	$this->revHand=($P['revHand']!='N'); //Revisar tabla ivt
	$this->revWhs=($P['revWhs']!='N'); //si handInv pedir
	$this->revWhsFrom=($P['revWhsFrom']=='Y'); //si handInv pedir
	$this->priceIsCost=$P['priceIsCost'];
	$this->priceFromCost=$P['priceFromCost'];//price then PP o CD
	$this->sbPriceFromLine=$P['sbPriceFromLine'];//price then PP o CD
	$this->sbPriceFromCost=$P['sbPriceFromCost']; //avg o null
	$this->priceCan0=$P['priceCan0']; //precio puede ser 0, ing,egr
	$this->docType=($P['docType']);//sell,buy
	$this->qtyMov=($P['qtyMov']);//inQty, outQty
	$this->uniLine=($P['uniLine']=='Y');
	$this->handInv=($P['handInv']=='Y');//debe ser inventariable
	$this->tbk=$P['tbk'];
	$this->tbk1=$P['tbk1'];
	$this->tbk2=$P['tbk2'];
	Ivt::$canNegDef=_Mdl::cnfGet('ivtCanNeg');
	if($P['ori']){ $this->ori=$P['ori']; }
}

static public function getAvgPrice($D=array()){//no usado oct 2020
	$qty=$D['inQty']-$D['outQty'];
	$vtotal=$D['stockValue']+($D['cost']*$qty);
	$ntotal=$D['onHand']*1+$qty;/* + o - */
	if($ntotal==0){ $avgP=0; $vtotal=0; }
	else if($ntotal<0){ $avgP=0; $vtotal=0; }
	else{ $avgP=$vtotal/$ntotal; }
	/* (stockValue + ($)entry) / onHand + (q)entry */
	$D['stockValue']=$vtotal;
	$D['avgPrice']=$avgP;
	//die(print_r($D));
	return $D;
}
/* Generar Doc, Lineas y Tax */
public function post($_J=array(),$P2=array()){
	$Vats=$_J['Vats'];
	unset($_J['L'],$_J['Vats']);
	if($P2['docSeries']!='N'){ $_J=docSeries::nextNum($_J,$_J); }
	if(_err::$err){ $errs++; }
	else{
		$docEntry=a_sql::qInsert($_J,array('tbk'=>$this->tbk,'qk'=>'ud','qku'=>$P['qku']));
		$_J['docEntry']=$docEntry;
		$this->docEntry=$_J['docEntry'];
		$this->Doc=$_J;
		if(a_sql::$err){ _err::err('Error guardando documento: '.a_sql::$errText,3); $errs++; }
		else{
			if($this->vats && is_array($Vats)){
				foreach($Vats as $n=>$L){
					$L[0]='i'; $L[1]=$this->tbk2; $L['_err1']='Linea de impuestos.';
					$this->L1[]=$L;
				}
			}
			a_sql::multiQuery($this->L1,0,array('docEntry'=>$docEntry));
		}
	}
	return $_J;
}
/* PUT Doc y Lineas */
public function put($_J=array()){
	unset($_J['L'],$_J['Vats']);
	if(_err::$err){ $errs++; }
	else{
		a_sql::qUpdate($_J,array('tbk'=>$this->tbk,'wh_change'=>'docEntry=\''.$_J['docEntry'].'\' LIMIT 1'));
		$this->docEntry=$_J['docEntry'];
		$this->Doc=$_J;
		if(a_sql::$err){ _err::err('Error actualizando documento: '.a_sql::$errText,3); $errs++; }
		else{
			//antes no estaba, modifique con sor
			a_sql::multiQuery($this->L1,0,array('docEntry'=>$_J['docEntry']));
			if(_err::$err){ $errs++; }
		}
	}
}
//revisar articulo para obtener datos L
public function itmRev($L=array(),$P=array()){
	//nl, reqAcc{accIvt...}, revWhs
	$nl=$P['nl']; $js=false;
	$ln='Linea '.$nl.': ';
	$ori0=' on[ivtDoc::itmRev()]';
	$ori=($this->ori)?' on['.$this->ori.']':' on[ivtDoc::itmRev()]';
	$revWhs=($this->revWhs && $L['handInv']=='Y');
	$revWhsFrom=($this->revWhsFrom && $L['handInv']=='Y');
	$revHand=($this->revHand && $revWhs);
	$revHandFrom=($this->revHand && $revWhsFrom);
	$hOpenQty=(array_key_exists('openQty',$P));
	if(!$revWhs && !array_key_exists('revWhs',$P)){ $P['revWhs']='N'; }
	$qH=array();//
	if($js=_js::iseErr($L['itemId'],$ln.'Se debe definir el Id del artículo.'.$ori,'numeric>0')){}
	else if(_js::iseErr($L['itemSzId'],$ln.'Se debe definir el Id del subproducto.'.$ori,'numeric>0')){}
	else if($this->handInv && $L['handInv']!='Y'){ _err::err($ln.'El articulo debe ser inventariable.'.$ori,3); }
	else if(_js::iseErr($L['quantity'],$ln.'Se debe definir la cantidad.'.$ori,'numeric>0')){}
	else if($revWhsFrom && _js::iseErr($L['whsIdFrom'],$ln.'Se debe definir la bodega de origen.'.$ori,'numeric>0')){}
	else if($revWhs && _js::iseErr($L['whsId'],$ln.'Se debe definir la bodega'.$ori,'numeric>0')){}
	else if($revWhsFrom && $L['whsIdFrom']==$L['whsId']){ _err::err($ln.'Bodega de origen y de destino no pueden ser iguales.'.$ori,3); }
	else{
		//Revisar datos del articulo o no
		$Lr=array('itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'whsId'=>$L['whsId'],'price'=>$L['price'],'numFactor'=>$L['numFactor'],'quantity'=>$L['quantity']);
		$k=$Lr['whsId'].$Lr['itemId'].$Lr['itemSzId'];
		if($revHandFrom){//Consultar bodega origen
			$k=$L['whsIdFrom'].$Lr['itemId'].$Lr['itemSzId'];
			$Lr['whsId']=$L['whsIdFrom'];
			$this->La2=Ivt::getInf($Lr,$P);
			Ivt::handRev($this->La2,array('outQty'=>$L['quantity']));
			if(_err::$err){ return false; }
		}
		$Lr['whsId']=$L['whsId'];
		$P['docType']=$this->docType;
		$this->La=Ivt::getInf($Lr,$P);//bodega destino
		if(_err::$err){ return false; }
		if($revHand && $this->qtyMov=='outQty'){
			Ivt::handRev($this->La,array('outQty'=>$L['quantity']));
			if(_err::$err){ return false; }
		}
	}
	if(!_err::$err){
		if($this->uniLine){
			if(!array_key_exists($k,$this->Ls)){ $this->Ls[$k]=$L; }
			else{ _err::err($ln.'Ya existe una linea igual en el documento. Linea: '.$this->Ls[$k]['lineNum'].$ori,3); }
		}
	}
	return $L;
}
// ->Livt[] Asignar mov de inventario en
public function handSet($L=array(),$P=array(),$La2=false){
	if($L['handInv']=='N'){ return false; }
	if($this->fromDlv){ return false; }//Si esta basado en remision,omitir
	$_ori=' on[IvtDoc::handSet()]';
	$La=$this->La;
	if($La2){//Usa esta La para revise: usar cuando es whsIdFrom
		$this->La=$La2;
	}//onHand,stockValue,cost,_upd
	$Dm=array();
	$qus=array();
	$inQty=$outQty=0;
	$inQty=$outQty=0;
	if($P['whsId']){ $L['whsId']=$P['whsId']; }
	if($L['inQty']){ $qty=$inQty=$L['inQty']; }
	if($L['outQty']){ $qty=$outQty=$L['outQty']; }
	if($this->La['handInv']=='N'){}//Linea actual revisada
	else{
		$numFactor=$L['numFactor']*1;
		if($numFactor<=0){ $numFactor=1; }
		if($qty>0){//Solo hand if tiene mov
			$L['inQty']=$L['inQty']*$numFactor;
			$L['outQty']=$L['outQty']*$numFactor;
			$qty=$qty*$numFactor;
			$L['quantity']=$qty;
			$L['onHand']=$this->La['onHand'];
			$L['stockValue']=($this->La['stockValue'])?$this->La['stockValue']:0;
			/*Si viene desde La2, el costo debe entrar con el de salida de la otra bodega */
			if($P['costFromLa2']){ $cost=$this->La2['cost'];  }
			else{ $cost=$this->La['cost']; }
			$cost=($cost)?$cost:0;
			/* precio desde costo actual */
			if($this->sbPriceFromLine!='N'){// Valor de priceLine Leido
				$L['sbPrice']=$L['price'];
				$L['sbPriceLine']=$L['priceLine'];
			}
			if(!$this->priceIsCost && $this->priceFromCost!='N'){//price entry from cost
				$L['price']=$cost;
				$L['priceLine']=$cost*$qty;
			}
			if($this->sbPriceFromCost=='Y' && !$L['sbPrice']){// valor total es igual a inv entry
				$L['sbPrice']=$cost;
				$L['sbPriceLine']=$cost*$qty;
			}
			/* buyFactor, sellFactor Convertir precio segun factor compra o venta */
			if($this->docType=='sell'){ }
			else{ $L['price'] = $L['price']/$numFactor; }
			if($this->priceIsCost){//55mil /140 =392
				$cost=$L['price'];
			}
			//Obtener nuevo promedio de entrada/salida
			$L['cost']=$cost;
			$L=self::getAvgPrice($L); unset($L['cost']);
			$newHand=$this->La['onHand']+$L['inQty']-$L['outQty'];
		}
		$doUpd=($this->La['_upd']=='Y');
		//Definir Lineas
		if($qty>0){//Solo hand if tiene mov
			$Li=array('whsId'=>$L['whsId'],'itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'onHand'=>$newHand,'avgPrice'=>$L['avgPrice'],'stockValue'=>$L['stockValue']);
			if($L['lastBuyPrice']){ $Li['lastBuyPrice']=$L['lastBuyPrice']; }
			$Dm=array('whsId'=>$L['whsId'],'itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId'],'quantity'=>$qty,'inQty'=>$L['inQty'],'outQty'=>$L['outQty'],
		'price'=>$L['price'],'priceLine'=>$L['price']*$qty,
		'onHandAt'=>$newHand,'avgPrice'=>$L['avgPrice'],'stockValue'=>$L['stockValue'],
		'sbPrice'=>$L['sbPrice'],'sbPriceLine'=>$L['sbPriceLine']);
		}
		else{//solo isCommited
			$Li=array('whsId'=>$L['whsId'],'itemId'=>$L['itemId'],'itemSzId'=>$L['itemSzId']);
		}
		{//guardar para mover
			$Li['_err1']='Error actualización cantidad en inventario.'.$_ori;
			$Li[1]='ivt_oitw';
			if($doUpd){/* update */
				$Li[0]='u';
				$Li['_wh']='whsId=\''.$L['whsId'].'\' AND itemId=\''.$L['itemId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1';;
				if($L['isCommited']){
					$Li['isCommited=']='isCommited+'.$L['isCommited']*$numFactor; unset($L['isCommited']);
				}
				if($L['onOrder']){
					$Li['onOrder=']='onOrder+'.$L['onOrder']*$numFactor; unset($L['onOrder']);
				}
			}
			else{/*insert */ $Li[0]='i';  }
			$this->Livt[]=$Li;
			if($qty>0){//inQty+qty afecta solamente
				$Dm[0]='i'; $Dm[1]='ivt_wtr1'; $Dm['_err1']='Error registrando histórico.'.$_ori;
				$this->Livt[]=$Dm;
			}
		}
	}
	$this->La=$La; //volver  adefinir
	unset($Dm,$L);
}

public function handPost(){//->Livt on DB
	$datec=date('Y-m-d');
	foreach($this->Livt as $n=>$L){
		if($L[1]=='ivt_wtr1'){
			$L['tt']=$this->tt;
			$L['tr']=$this->Doc['docEntry'];
			$L['docDate']=$this->Doc['docDate'];
			$L['serieId']=$this->Doc['serieId'];
			$L['docNum']=$this->Doc['docNum'];
			$L['cardId']=$this->Doc['cardId'];
			$L['cdcId']=$this->Doc['cdcId'];
			$L['userId']=a_ses::$userId;
			$L['dateC']=$datec;
			$this->Livt[$n]=$L;
		}
	}
	//if(a_ses::$userId==1){ die(print_r($this->Livt)); }
	if(count($this->Livt)>0){/* Registras trans */
		a_sql::multiQuery($this->Livt);
	}
}
/* Obtener query para leer con itmRev */
public function fromDoc($P=array()){
	//docEntry,qtyFie
	$ori=' on[IvtDoc::fromDoc()]';
	$qtyFie=($P['qtyFie'])?'B.'.$P['qtyFie']:'B.quantity';
	$qtyFie=($P['qtyFieSet'])?$P['qtyFieSet']:$qtyFie;
	$row0=true; //poner datos solo 1 vez
	$this->Doc=a_sql::fetch('SELECT A.docEntry,A.serieId,A.docNum,A.cardId,A.cdcId FROM '.$this->tbk.' A WHERE A.docEntry=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error consultando información de documento.'.$ori,2=>'No se encontró información del documento.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	$gb ='B.itemId,B.itemSzId,B.whsId,B.handInv,B.numFactor,B.price';
	$fie = $gb.',B.price sbPrice,B.priceLine sbPriceLine';
	$fie .=($P['fie'])?','.$P['fie']:'';/* price,whsId */
	$gb .=',B.priceLine';
	$gb .=($P['fie'])?','.$P['fie']:'';/* price,whsId */
	$q=a_sql::query('SELECT '.$fie.',SUM('.$qtyFie.') quantity
	FROM '.$this->tbk1.' B
	WHERE B.docEntry=\''.$P['docEntry'].'\' GROUP BY '.$gb,array(1=>'Error obteniendo lineas del documento.'.$ori,2=>'El documento no tiene lineas registradas.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else{ return $q; }
}

static function rever($P=array()){
	$js=false; $org=' on [IvtDoc::rever()]';
	$nDoc=new ivtDoc(array('tt'=>$P['tt'],
	'revHand'=>'Y','revWhs'=>'Y','handInv'=>'N'));
	if(_err::$err){ return false; }
	$nDoc->tr=$P['tr'];
	$nDoc->docDate=$P['docDate'];
	$gB='tt,tr,serieId,docNum,docDate,itemId,itemSzId,whsId,price,quantity,inQty,outQty,priceLine,numFactor,cardId,cdcId,sbPrice,sbPriceLine';
	$q=a_sql::query('SELECT '.$gB.' FROM ivt_wtr1 WHERE tt=\''.$nDoc->tt.'\' AND tr=\''.$nDoc->tr.'\' ORDER BY outQty DESC',array(1=>'Error obteniendo registros para revertir movimientos de inventario: '));
	$Liv=array();
	$n0=0; $nl=1; $errs=0;
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){ $errs=0;
		while($L=$q->fetch_assoc()){
			if($n0==0){ $n0=1;
				$nDoc->Doc=array('docEntry'=>$nDoc->tr,'serieId'=>$L['serieId'],'docNum'=>$L['docNum'],'docDate'=>$nDoc->docDate,'cardId'=>$L['cardId'],'cdcId'=>$L['cdcId']);
			}
			$nDoc->itmRev($L,array('ln'=>'Linea '.$nl.': ')); $nl++;
			if(_err::$err){ $errs=1; break; }
			if($L['inQty']>0){ $L['outQty']=$L['inQty']; unset($L['inQty']); }
			else if($L['outQty']>0){ $L['inQty']=$L['outQty']; unset($L['outQty']); }
			$nDoc->handSet($L);
			if(_err::$err){ $errs=1; break; }
		}
		if($errs==0){/* Mover Inventario */
			$nDoc->handPost();
			if(_err::$err){ $errs++; }
		}
	}

}

}
?>