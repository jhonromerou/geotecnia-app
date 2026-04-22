<?php
class ivtBit{
static $err=false;
static $errText='';
static $D=array();
static $canNegDef='N';
public $ori=false;
public $tt='';
public $docDate='';
public $La=[]; //dato actual
public $Lw=[]; //bitw y bwtr
public $Uni='Y'; //unicos
public $Uk=[]; //unicos
function __construct($P=array()){
	$this->tt=$P['tt'];
	$this->docDate=$P['docDate'];
	ivtBit::$canNegDef= 'Y';//_Mdl::cnfGet('ivtCanNeg');
	if($P['ori']){ $this->ori=$P['ori']; }
}

public function clear2oitw($L){
	unset($L['inQty'],$L['outQty'],$L['quantity'],$L['numFactor'],$L['price'],$L['sbPrice'],$L['sbPriceLine']);
	return $L;
}
public function getAvgPrice($D=array()){//no usando en ivtDoc
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
public function getInf($L=array(),$P=array()){ // (1)
	$ori=' on[ivtBit::getInf()]';
	$P=($P)?$P:array();
	$ln=$P['ln'];
	$k=$L['bId'].$L['whsId'];
	if($this->Uni=='Y'){
		if(array_key_exists($k,$this->Uk)){ return _err::err($ln.'No se puede repetir el lote'.$ori,3); }
		$this->Uk[$k]='Ya';
	}
	$fie='W1.id,BI.bId,BI.bStatus,I.itemCode,G1.itemSzId,G1.itemSize,W.whsId,W.whsCode,
	I.handInv,I.buyItem,I.costMet,I.invPrice,I.canNeg,
	W1.itemId, W1.onHand, W1.locked'; #,W1.avgPrice,W1.stockValue
	$lefJ='';
	/*obtener datos de articulo y disponible */
	$this->La =a_sql::fetch('SELECT '.$fie.'
	FROM ivt_obit BI
	JOIN itm_oitm I ON (I.itemId=BI.itemId)
	'.$lefJ.'
	LEFT JOIN ivt_owhs W ON (W.whsId=\''.$L['whsId'].'\')
	LEFT JOIN ivt_obiw W1 ON (W1.bId=BI.bId AND W1.whsId=W.whsId)
	LEFT JOIN itm_grs1 G1 ON (G1.itemSzId=BI.itemSzId)
	WHERE BI.bId=\''.$L['bId'].'\' LIMIT 1',array(1=>$ln.'Error consultando información de inventario del lote: '.$ori,2=>$ln.'El lote no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(_js::iseErr($this->La['whsId'],$ln.'La bodega no existe'.$ori,'numeric>0')){}
	else if(_js::iseErr($this->La['itemSzId'],$ln.'El subproducto no existe'.$ori,'numeric>0')){}
	else if($this->La['bStatus']=='L'){ _err::err($ln.'El lote #'.$L['bId'].' está bloqueado, no se pueden realizar operaciones con el.',3); }
	else if($this->La['locked']=='Y'){ _err::err($ln.'El lote #'.$L['bId'].' está bloqueado para su uso en está bodega.',3); }
	else{
		//existe, debe actualizarse
		if($this->La['id']>0){ $this->La['_upd']='Y'; }
		$ln = $ln.' '.$this->La['itemCode'].'-'.$this->La['itemSize'].') ';
		//if($this->La['avgPrice']<=0){ $this->La['avgPrice']=0; }
		//if($this->La['stockValue']<=0){ $this->La['stockValue']=0; }
		$this->La['onHand']=($this->La['onHand']=='')?0:$this->La['onHand']*1;
		//Determinar Costo
		/* if($this->La['costMet']=='PP'){ $this->La['cost']=$this->La['avgPrice']; }
		else if($this->La['costMet']=='CD'){ $this->La['cost']=$this->La['invPrice']; }
		if($P['docType']=='sell' && $L['numFactor']>0){
			$this->La['costLine']=$this->La['cost']*$L['quantity']*$L['numFactor']; //1venta tiene 4 und
		}
		else{ $this->La['costLine']=$this->La['cost']*$L['quantity']; }
		# */
		return $this->La;
	}
}
public function handRev($P2=array()){ // (2)
	$_ori=' on[ivtBit::handRev()]. (S:'.self::$canNegDef.', I:'.$this->La['canNeg'].')';
	/* si W1.item existe en ivt debe actualizarse */
	$newHand=($P2['outQty'])?$this->La['onHand']-$P2['outQty']:-1;
	if($P2['outQty']>0 && $newHand<0 && (self::$canNegDef=='N' || (self::$canNegDef=='item' && $this->La['canNeg']=='N'))){
		$itemName=$this->La['itemCode'].'-'.$this->La['itemSize'].') ';
		_err::err($itemName.'La cantidad ('.($P2['outQty']*1).') es mayor que el disponible ('.$this->La['onHand'].') para el lote en la bodega '.$this->La['whsCode'].$_ori,3);
	}
	else{ return $this->La; }
}
public function handSet($L=array(),$P=array()){ // (3)-asignar actualizar y 
	//$L => qHand
	if($this->La=='N'){ return false; }
	$_ori=' on[ivtBit::handSet()]';
	$inQty=$outQty=0;
	$inQty=$outQty=0;
	if($P['whsId']){ $this->La['whsId']=$P['whsId']; }
	if($L['inQty']){ $qty=$inQty=$L['inQty']; }
	if($L['outQty']){ $qty=$outQty=$L['outQty']; }
	if($qty>0){
		$numFactor=1;
		$doUpd=($this->La['_upd']=='Y');
		{
			$L['inQty']=$L['inQty']*$numFactor;
			$L['outQty']=$L['outQty']*$numFactor;
			$qty=$qty*$numFactor;
			//$L['stockValue']=($this->La['stockValue'])?$this->La['stockValue']:0;
			//$cost=($this->La['cost'])?$this->La['cost']:0;
			//$L=self::getAvgPrice($this->La); unset($L['cost']);
			$newHand=$this->La['onHand']+$L['inQty']-$L['outQty'];
			$Li=array('bId'=>$this->La['bId'],'whsId'=>$this->La['whsId'],'onHand'=>$newHand);
			$Li[0]='i'; $Li[1]='ivt_obiw'; $Li[2]='udU';
			$Li['_err1']='Error actualización cantidad en inventario.'.$_ori;
			if($doUpd){/* update */
				$Li[0]='u';
				$Li['_wh']='bId=\''.$this->La['bId'].'\' AND whsId=\''.$this->La['whsId'].'\'LIMIT 1';
			}
			$this->Lw[]=$Li; $Li=[];
			/* Historial */
			$this->Lw[]=array('i','ivt_bwtr','ud','bId'=>$this->La['bId'],'whsId'=>$this->La['whsId'],'quantity'=>$qty,'inQty'=>$L['inQty'],'outQty'=>$L['outQty'],'onHandAt'=>$newHand,
			'tt'=>$this->tt,'tr'=>$L['tr'],'docDate'=>$this->docDate,
			'_err1'=>'Error registrando histórico.'.$_ori);
		}
	}
}
public function handPost($addData=false){//->Livt on DB
	if(count($this->Lw)>0){ a_sql::multiQuery($this->Lw,0,$addData); }
}

static public function handRever($P=array()){
	$js=false; $org=' on Ivt::handRever().';
	if(_js::iseErr($P['tt'],'Se debe definir TT '.$org)){}
	else if(_js::iseErr($P['tr'],'Se debe definir TT'.$org)){}
	else if(_js::iseErr($P['docDate'],'Se debe definir la fecha de la reversión'.$org)){}
	else{
		$gB='bId,whsId';
		$ivDoc=new ivtBit(['tt'=>$P['tt'],'docDate'=>$P['docDate']]);
		$q=a_sql::query('SELECT '.$gB.',SUM(inQty) inQty,SUM(outQty) outQty FROM ivt_bwtr WHERE tt=\''.$P['tt'].'\' AND tr=\''.$P['tr'].'\' GROUP BY '.$gB.' ORDER BY outQty DESC',array(1=>'Error obteniendo registros para revertir movimientos de inventario: '));
		$Liv=array();
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo==-1){ $errs=0;
			while($L=$q->fetch_assoc()){
				$ivDoc->La=['bId'=>$L['bId'],'whsId'=>$L['whsId']];
				$ivDoc->getInf(['bId'=>$L['bId'],'whsId'=>$L['whsId']],array('ln'=>$ln));
				if(_err::$err){ break; }
				if($L['outQty']>0){
					$ivDoc->handSet(['tr'=>$P['tr'],'inQty'=>$L['outQty']]);
				}
				if($L['inQty']>0){
					$ivDoc->handRev(['outQty'=>$L['inQty']]);
					if(_err::$err){ break; }
					$ivDoc->handSet(['tr'=>$P['tr'],'outQty'=>$L['inQty']]);
				}
			}
			if(!_err::$err){ $ivDoc->handPost(); }
			if(!_err::$err){ $c=true;
				$js=_js::r('Documento anulado correctamente.','"docEntry":"'.$P['tr'].'"');
				JLog::post(array('tbk'=>'ivt_doc99','serieType'=>$P['tt'],'docEntry'=>$P['tr'],'docStatus'=>'N','lineMemo'=>$D['lineMemo']));
			}
		}
	}
}


/* sin adaptar */
static public function onHand($L=array(),$P=array()){
	$qHand=self::getInf($L,$P);
	if(_err::$err){}
	else{
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
?>