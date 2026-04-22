<?php
class Invt{
static $err=false;
static $errText='';
static $D=array();
static public function _reset(){
	self::$err=false; self::$errText='';
}
static public function onHand_ttFie($tt=array(),$L=array()){
	self::$err=false; self::$errText='';
	$onOrder=false;
	if($tt=='ocph'){
		$L['onHandAt'] = $L['onHand']+$L['quantity'];
		$L['onHand'] = $L['onHand']+$L['quantity'];
	}
	else if($tt=='owht'){//pasar quantity + o -
		$L['onHandAt'] = $L['onHand']+$L['quantity'];
		$L['onHand'] = $L['onHand']+$L['quantity'];
	}
	else if(preg_match('/^(oing|ocat|ordn|opor)$/',$tt)){
		$L['onHandAt'] = $L['onHand']+$L['quantity'];
		$L['onHand'] = $L['onHand']+$L['quantity'];
	}
	else if(preg_match('/^(oegr|odlv)$/',$tt)){
		if($tt=='odlv'){ $onOrder=true; 
			$L['onOrder']=$L['onOrder']-$L['quantity'];
		}
		$L['quantity']*=-1;//wtr1
		$L['onHandAt'] = $L['onHand']+$L['quantity'];
		$L['onHand'] = $L['onHand']+$L['quantity'];
	}
	if($onOrder==false){ unset($L['onOrder']); }
	return $L;
}

static public function onHand_p($L=array(),$P=array()){
	//itemId,itemSzId,whsId,..onHand
	$R=array(); $n=0;
	foreach($L as $l =>$D){
		$D1=$D;
		$D['tt']=$P['tt']; $D['tr']=$P['tr'];
		$wh1 = 'WHERE IV.itemId=\''.$D['itemId'].'\' AND IV.itemSzId=\''.$D['itemSzId'].'\' AND IV.whsId=\''.$D['whsId'].'\' LIMIT 1';
		$wh = 'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
		$qHand =a_sql::fetch('SELECT I.itemName,IV.onHand, (IV.onHand+'.$D['quantity'].') onHandAt,IV.onOrder FROM ivt_oitw IV JOIN itm_oitm I ON (I.itemId=IV.itemId) '.$wh1,array(1=>'Error consultando inventario para el producto: '));
		$qDo_whs1='insert';
		if(a_sql::$err){  return a_sql::$errNoText; }
		if(_0s::$eSoc['inventoryNegative']=='N'){
			if(a_sql::$errNo==2 || (a_sql::$errNo==-1 && ($qHand['onHandAt']*1)<=0)){
				a_sql::$err=true;
				return a_sql::$errNoText = _js::e(2,'No se pueden manejar unidades negativas para: '.$qHand['itemName'].'.');
			}
		}
		if(a_sql::$errNo==-1){ $qDo_whs1='update';
			$onHa=self::onHand_ttFie($D['tt'],array('onHand'=>$qHand['onHand'],'onOrder'=>$qHand['onOrder'],'quantity'=>$D['quantity']));
			$D['onHandAt'] = $onHa['onHandAt'];
		}
		else{
			$onHa=self::onHand_ttFie($D['tt'],array('onHand'=>0,'quantity'=>$D['quantity'],'onOrder'=>0));
			$D['onHandAt'] =$onHa['quantity'];
		}
		foreach($onHa as $k => $v){ $D1[$k]=$v; }/* rescribir variables */
		$D['quantity']=$onHa['quantity'];
		$D['docDate']=$D1['docDate'];
		unset($D1['quantity'],$D1['onHandAt'],$D1['docDate']);
		$ins2=a_sql::insert($D,array('qDo'=>'insert','table'=>'ivt_wtr1'));
		if(a_sql::$err){ return a_sql::$errNoText = _js::e(1,'Error guardando lineas de transferencia: '.$ins2['text']); }
		else{
			$ins1=a_sql::insert($D1,array('table'=>'ivt_oitw','qDo'=>$qDo_whs1,'wh_change'=>$wh));
			if(a_sql::$err){
				return a_sql::$errNoText = _js::e(1,'Error actualizando cantidades del Inventario: '.$ins1['text']);
			}
		}
		$n++;
	}
	return $R;
}


static public function onOrder_p($L=array(),$P=array()){
	//itemId,itemSzId,whsId,..onHand --> update isCommited and onOrder
	$R=array();
	foreach($L as $l =>$D){
		$D1=$D;
		$quantity=$D1['quantity']; unset($D1['quantity']);
		$D['tt']=$P['tt']; $D['tr']=$P['tr'];
		$wh = 'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
		$qHand =a_sql::fetch('SELECT isCommited,onOrder FROM ivt_oitw '.$wh);
		if(a_sql::$errNo==-1){
			$onOrder = $qHand['onOrder']+$quantity;
			$ins1=a_sql::query('UPDATE ivt_oitw SET onOrder='.$onOrder.' '.$wh);
		}
		else{
			$D1['onOrder'] = $quantity;
			$ins1=a_sql::insert($D1,array('table'=>'ivt_oitw','qDo'=>'insert'));
		}
		if(a_sql::$err){ return a_sql::$errNoText = _js::e(1,'Error actualizando cantidades en Pedido: '.$ins1['text']); }
		else{
			$R[]= _js::r('Inventario y lineas actualizadas correctamente ('.$D1['itemId'].'_'.$D['itemSzId'].')');
		}
	}
	return $R;
}

/* anterior a este, esta tambien en Whs*/
static public function isCommited_put($L=array()){
	$R=array(); self::$err=false; self::$errText='';
	$ln=1; $errs=0;
	if(!is_array($L)){ self::$err=true; self::$errText=_js::e(3,'No se recibieron lineas para actualizar el comprometido.'); return true; }
	foreach($L as $l =>$D){ $lnt='Linea '.$ln.' :'; $ln++;
		if(self::$errText=_js::ise($D['whsId'],$lnt.'Se debe definir la bodega para definir los comprometidos.')){ $errs++; break;; }
		$D1=$D;
		$quantity=$D1['quantity']; unset($D1['quantity']);
		$wh = 'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
		$qHand =a_sql::fetch('SELECT isCommited,onOrder FROM ivt_oitw '.$wh,array(1=>'Error obteniendo comprometidos en inventario: '));
		if(a_sql::$err){ self::$errText=a_sql::$errNoText; $errs++; break; }
		if(a_sql::$errNo==-1){
			$onOrder = $qHand['onOrder']+$quantity;
			$ins1=a_sql::query('UPDATE ivt_oitw SET onOrder='.$onOrder.' '.$wh,array(1=>'Error actualizando comprometidos en inventario: '));
			if(a_sql::$err){ self::$errText=a_sql::$errNoText; $errs++; break; }
		}
		else{
			$D1['onOrder'] = $quantity;
			$ins1=a_sql::insert($D1,array('table'=>'ivt_oitw','qDo'=>'insert'));
			if($ins1['err']){ self::$errText= _js::e(3,'Error defininiendo comprometidos en inventario: '.$ins1['text']); $errs++; break; }
		}
	}
	if($errs>0){ self::$err=true; }
	return self::$err;
}
static public function onHand_put1($L=array()){ /* OBSOLOTE */
	$R=array(); self::$err=false; self::$errText='';
	$ln=1; $errs=0;
	if(!is_array($L)){ self::$err=true; self::$errText=_js::e(3,'No se recibieron lineas para actualizar el inventario.'); return true; }
	foreach($L as $l =>$D){ $lnt='Linea '.$ln.' :'; $ln++;
		if(self::$errText=_js::ise($D['whsId'],$lnt.'Se debe definir la bodega para definir el disponible.')){ $errs++; break;; }
		$D1=$D;
		$onHand=$D1['quantity'];
		$quantity=$D1['quantity']; unset($D1['quantity']);
		$wh1 = 'WHERE W.itemId=\''.$D['itemId'].'\' AND W.itemSzId=\''.$D['itemSzId'].'\' AND W.whsId=\''.$D['whsId'].'\' LIMIT 1';
		$wh = 'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
		$qHand =a_sql::fetch('SELECT W.onHand FROM ivt_oitw W'.$wh1,array(1=>'Error obteniendo información de inventario del artículo: '));
		if(a_sql::$err){ self::$errText=a_sql::$errNoText; $errs++; break; }
		if(a_sql::$errNo==-1){
			$onHand = $qHand['onHand']+$quantity;
			if(0 && $onHand<0){
				self::$errText=_js::e(3,'El artículo no permite manejar negativos.'); $errs++; break;
			}
			else{
				$ins1=a_sql::query('UPDATE ivt_oitw SET onHand='.$onHand.' '.$wh,array(1=>'Error actualizando disponible en inventario: '));
				if(a_sql::$err){ self::$errText=a_sql::$errNoText; $errs++; break; }
			}
		}
		else{
			$D1['onHand'] = $quantity;#+ o -
			$ins1=a_sql::insert($D1,array('table'=>'ivt_oitw','qDo'=>'insert'));
			if($ins1['err']){ self::$errText= _js::e(3,'Error defininiendo disponible en inventario: '.$ins1['text']); $errs++; break; }
		}
	}
	if($errs>0){ self::$err=true; }
	return self::$err;
}

static public function getD($L=array()){
	$L=array(
	'u'=>array('onHand=onHand+'.$L['quantity'].',onOrder=onOrder+'.$L['onOrder'].',isCommited=isCommited+'.$L['isCommited']),
	'i'=>array('onHand='.$L['quantity'].',onOrder='.$L['onOrder'].',isCommited='.$L['isCommited']),
	);
	return $L;
}

static public function onHandCommited_put($L=array()){
	$R=array(); self::$err=false; self::$errText='';
	$ln=1; $errs=0;
	if(!is_array($L)){ self::$err=true; self::$errText=_js::e(3,'No se recibieron lineas para actualizar el inventario.'); return true; }
	foreach($L as $l =>$D){ $lnt='Linea '.$ln.' :'; $ln++;
		if(self::$errText=_js::ise($D['whsId'],$lnt.'Se debe definir la bodega para definir el disponible.')){ $errs++; break;; }
		$D1=$D;
		$onHand=$D1['quantity'];
		$quantity=$D1['quantity']; unset($D1['quantity']);
		$wh1 = 'WHERE W.itemId=\''.$D['itemId'].'\' AND W.itemSzId=\''.$D['itemSzId'].'\' AND W.whsId=\''.$D['whsId'].'\' LIMIT 1';
		$wh = 'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
		$qHand =a_sql::fetch('SELECT W.onHand,W.onOrder FROM ivt_oitw W '.$wh1,array(1=>'Error obteniendo información de inventario del artículo (2): '));
		if(a_sql::$err){ self::$errText=a_sql::$errNoText; $errs++; break; }
		if(a_sql::$errNo==-1){
			$onHand = $qHand['onHand']+$quantity;
			$onOrder = $qHand['onOrder']+$quantity;
			if(0 && $onHand<0){
				self::$errText=_js::e(3,'El artículo no permite manejar negativos.'); $errs++; break;
			}
			else{
				$ins1=a_sql::query('UPDATE ivt_oitw SET onHand='.$onHand.',onOrder='.$onOrder.' '.$wh,array(1=>'Error actualizando disponible en inventario (2): '));
				if(a_sql::$err){ self::$errText=a_sql::$errNoText; $errs++; break; }
			}
		}
		else{
			$D1['onHand'] = $quantity;#+ o -
			$D1['onOrder']=$quantity;
			$ins1=a_sql::insert($D1,array('table'=>'ivt_oitw','qDo'=>'insert'));
			if($ins1['err']){ self::$errText= _js::e(3,'Error defininiendo disponible en inventario: '.$ins1['text']); $errs++; break; }
		}
	}
	if($errs>0){ self::$err=true; }
	return self::$err;
}

/* new*/
static public function getAvgPrice($D=array()){
	if($D['price']){
		$D['quantity']=$qty=$D['inQty']-$D['outQty'];
		$vtotal=$D['stockValue']+($D['price']*$qty);
		$ntotal=$D['onHand']*1+$qty;/* + o - */
		if($ntotal==0){ $avgP=0; }
		else if($ntotal<0){ $avgP=abs($vtotal/$ntotal); }
		else{ $avgP=$vtotal/$ntotal; }
		/* (stockValue + ($)entry) / onHand + (q)entry */
		$D['stockValue']=$vtotal;
		$D['avgPrice']=$avgP;
	}
	unset($D['price'],$D['quantity']);
	return $D;
}
static public function avgPrice($D=array()){
	$vtotal=$D['stockValue']+($D['price']*$D['quantity']);
	$ntotal=$D['onHand']+$D['quantity'];/* + o - */
	if($ntotal==0){ $avgP=$D['avgPrice']; }
	else if($ntotal<0){ $avgP=abs($vtotal/$ntotal); }
	else{ $avgP=$vtotal/$ntotal; }
	/* (stockValue + ($)entry) / onHand + (q)entry */
	$R=array('stockValue'=>$vtotal,'avgPrice'=>$avgP);
}
static public function onHand($D=array(),$P=array()){
	$lnt=$P['lnt']; self::_reset();
	$revI=($P['revD']);
	/* Revisión de variables necesarias si no se hizo antes */
	if(!array_key_exists('itemSzId',$D)){ $D['itemSzId']=0; }
	if($revI){ $ert=$lnt.'Error en consulta inventario en proceso. ';
		if($js=_js::ise($D['itemId'],$ert.'Se debe definir el artículo.')){
			self::$err=true; self::$errText=$js; return self::$err;
		}
		else if($js=_js::ise($D['itemSzId'],$ert.'Se debe definir la talla.')){
			self::$err=true; self::$errText=$js; return self::$err;
		}
		else if($js=_js::ise($P['whsId'],$ert.'Se debe definir la bodega.')){
			self::$err=true; self::$errText=$js; return self::$err;
		}
	}
	$fie ='I.handInv,I.canNeg,W.onHand';
	$fie .=($P['fie'])? ','.$P['fie']:'';
	$canNeg='Y'; /*Manejar negativos */
	/* Obtener variables y disponible */
	$qS = a_sql::fetch('SELECT '.$fie.'
	FROM itm_oitm I 
	LEFT JOIN ivt_oitw W ON (I.itemId=W.itemId AND W.whsId=\''.$P['whsId'].'\' AND W.itemSzId=\''.$P['itemSzId'].'\')
	WHERE I.itemId=\''.$D['itemId'].'\' LIMIT 1',array(1=>'Error obteniendo inventario del artículo: '));
	if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
	else if(a_sql::$errNo==2){ self::$err=true;
		self::$errText= _js::e(3,$lnt.'El artículo no existe para consultar inventario.'); 
	}
	else if($qS['handInv']=='N'){ self::$errText= _js::e(3,$lnt.'El artículo no es inventariable.'); self::$err=true; }
	else if($P['itemType'] && $P['itemType']!=$qS['itemType']){ self::$errText= _js::e(3,$lnt.'El tipo de artículo no es válido para realizar esta transacción.'); self::$err=true; }
	else{
		$canNeg=(a_ses::$userId==100000)?$qS['canNeg']:'Y';
		$diff=$qs['onHand']-$D['quantity'];
		if($canNeg=='N' && $diff<0){ self::$errText= _js::e(3,$lnt.'La cantidad a transferir del almacen ('.$D['quantity'].') es mayor a la disponible ('.($qS['onHand']*1).'). Dif.: '.$diff); self::$err=true; }
	}
	if($P['D']=='Y'){ self::$D=$qS; }
	return self::$err;
}
static public function onHand_Def($L=array(),$P=array()){
	$R=array(); $n=0;
	/*newOnHand, $onHandBef qtyDiff, */
	foreach($L as $l =>$D){
		$D1=array('tt'=>$P['tt'],'tr'=>$P['tr'],'itemId'=>$D['itemId'],'itemSzId'=>$D['itemSzId'],'whsId'=>$D['whsId'],'quantity'=>$D['qtyDiff'],'onHandAt'=>$D['onHandBef'],'docDate'=>$P['docDate']);
		$D2=array('itemId'=>$D['itemId'],'itemSzId'=>$D['itemSzId'],'whsId'=>$D['whsId'],'onHand'=>$D['quantity']);
		$wh = 'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
		$ins2=a_sql::insert($D1,array('qDo'=>'insert','table'=>'ivt_wtr1'));
		if(a_sql::$err){ return a_sql::$errNoText = _js::e(1,'Error guardando lineas de transferencia: '.$ins2['text']); }
		else{
			$ins1=a_sql::insert($D2,array('table'=>'ivt_oitw','qDo'=>'update','wh_change'=>$wh));
			if(a_sql::$err){
				return a_sql::$errNoText = _js::e(1,'Error actualizando cantidades del Inventario: '.$ins1['text']);
			}
		}
		$n++;
	}
	return $R;
}


static public function onHand_put($D=array(),$P=array()){
	self::_reset();
	$siVerif=($P['lineVerify']=='N');
	$_ori=' on[Invt::onHand_put()]';
	$isPur=($P['isPurc'])?true:false;/*es compra para conversion */
	$_avgPrice=$_stockVal=$_reCal=0;
	$canNegDef=_Mdl::cnfPar('ivtCanNeg');
	if(_err::$err){ self::$err=true; return self::$errText=_err::$errText; }
	if($P['upds']){
		if(preg_match('/avgPrice/',$P['upds'])){ $_avgPrice=true; }
	}
	/*Verificar origen */
	if(self::$errText=_js::ise($P['docDate'],'Se debe definir fecha para movimiento en '.$_ori.'.')){ self::$err=true; }
	else if(self::$errText=_js::ise($P['tt'],'TT debe estar definido para movimiento en '.$_ori.'.')){ self::$err=true; }
		else if(self::$errText=_js::ise($P['tr'],'TR debe estar definido para movimiento en '.$_ori.'.')){ self::$err=true; }
	else if(!is_array($D)){ self::$err=true; self::$errText=_js::e(3,'No se recibieron cantidades para actualizar inventario en .$_ori.$_ori.'); }
	else{
		$fie='I.itemCode,I.handInv,I.canNeg,W1.itemSzId, W1.onHand,W1.avgPrice,W1.stockValue';
		if($isPur){ $fie .=',I.buyFactor,I.invPrice'; }
		$qus=array();
		foreach($D as $n => $L){
			$inQty=$outQty=0;
			if($L['inQty']){ $qty=$inQty=$L['inQty']; }
			if($L['outQty']){ $qty=$outQty=$L['outQty']; }
			$revQty=($L['isCommited'])?false:true;
			if($siVerif && self::$errText=_js::ise($L['whsId'],'La bodega debe estar definida.'.$_ori)){ self::$err=true; break; }
			else if($siVerif && self::$errText=_js::ise($L['itemId'],'ID artículo debe estar definido.'.$_ori)){ self::$err=true; break; }
			else if($siVerif && self::$errText=_js::ise($L['itemSzId'],'ID talla de artículo debe estar definido.'.$_ori)){ self::$err=true; break; }
			else if($revQty && _js::iseErr($qty,'La cantidad debe estar definida y ser mayor a 0. ('.$qty.').'.$_ori,'numeric>0')){ break; }
			else{
				$qDo_whs1='insert';
				$leftWh = 'W1.itemId=I.itemId AND W1.whsId=\''.$L['whsId'].'\' AND W1.itemSzId=\''.$L['itemSzId'].'\'';
				$wh1 = 'whsId=\''.$L['whsId'].'\' AND itemId=\''.$L['itemId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1';
				/*obtener datos de articulo y disponible */
				$qHand =a_sql::fetch('SELECT '.$fie.' FROM 
				itm_oitm I 
				LEFT JOIN ivt_oitw W1 ON ('.$leftWh.') 
				WHERE I.itemId=\''.$L['itemId'].'\' LIMIT 1',array(1=>'Error consultando inventario para el producto: '.$_ori,2=>'El artículo no existe.'.$_ori));
				if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; break; }
				if($qHand['handInv']=='N'){ continue; }
				$itemName=$qHand['itemCode'].'-'.$L['itemSzId'].') ';
				$onHand=($qHand['onHand']=='')?0:$qHand['onHand']*1;
				$canNeg=$qHand['canNeg'];
				if(($canNegDef=='N' || ($canNegDef=='item' && $canNeg=='N')) && $onHand<=0 && $outQty>0){ self::$err=true; self::$errText=_js::e(3,$itemName.'La cantidad digitada ('.($qty*1).') es mayor que la disponible ('.$onHand.').'.$_ori); break; }
				else{
					if($qHand['avgPrice']<=0){ $qHand['avgPrice']=0; }
					/* requerido solo aqui avg */
					$L['onHand']=$onHand;
					$L['price']=($L['price'])?$L['price']:$qHand['avgPrice'];//usar promedio
					$L['stockValue']=($qHand['stockValue'])?$qHand['stockValue']:0; 
					$L['quantity']=$qty;
					$price=$L['price'];
					$L=self::getAvgPrice($L);
					unset($L['inQty'],$L['outQty'],$L['quantity'],$L['onHand']);
					$numFactor=($L['numFactor'])?$L['numFactor']:1;
					if($isPur){ /*conversión */
						$numFactor=$qHand['buyFactor'];
					}
					$numFactor=($numFactor<=0)?1:$numFactor;
					$inQty=$inQty*$numFactor;
					$outQty=$outQty*$numFactor;
					unset($L['numFactor']);
					$Dm = array('docDate'=>$P['docDate'],'tt'=>$P['tt'],'tr'=>$P['tr'],'whsId'=>$L['whsId'],'itemId'=>$L['itemId'], 'itemSzId'=>$L['itemSzId'],'quantity'=>$qty,'inQty'=>$inQty,'outQty'=>$outQty,'price'=>$price);
					$Dm['onHandAt']=$inQty-$outQty;
					$L['_err1']='Error actualización cantidad en inventario.'.$_ori;
					/* update */
					$L[1]='ivt_oitw';
					if($qHand['onHand']!=''){
						$L[0]='u';  $L['_wh']=$wh1;
						$Dm['onHandAt']=$qHand['onHand']+$inQty-$outQty; unset($L['onHand']);
						$L['onHand=']='onHand+'.$inQty.'-'.$outQty;
						$isCommited=$L['isCommited']; unset($L['isCommited']); 
						if($isCommited){
							$L['isCommited=']='isCommited+'.$isCommited;
						}
						$onOrder=$L['onOrder']*$numFactor; unset($L['onOrder']); 
						if($onOrder){
							$L['onOrder=']='onOrder+'.$onOrder;
						}
					} /*insert */
					else{ $L[0]='i'; $L['onHand']=$inQty-$outQty; }
					$qus[]=$L;
					if($qty>0){
						$Dm[0]='i'; $Dm[1]='ivt_wtr1'; $Dm['_err1']='Error registrando histórico.'.$_ori;
						$qus[]=$Dm;
					}
				}
			}
		}
		if(!self::$err && count($qus)>0){
			a_sql::multiQuery($qus);
			if(_err::$err){ self::$err=true; self::$errText=_err::$errText; }
		}
	}
	return self::$err;
}
static public function onOrderCommi_put($L=array(),$P=array()){
	self::_reset();
	$isPurc=($P['isPurc']=='Y');
	if(!is_array($L)){ self::$err=true; self::$errText=_js::e(3,'No se recibieron datos para actualizar tabla de inventario Invt::onOrderCommi_put.'); }
	else foreach($L as $l =>$D){
		$numFactor=($D['numFactor'])?$D['numFactor']:$D['buyFactor'];
		unset($D['numFactor']);
		$numFactor=($numFactor<=0)?1:$numFactor;
	unset($D['buyFactor']);
	$qty=$D['onOrder']+$D['isCommited'];
	$isCommited=$D['isCommited']; $onOrder=$D['onOrder'];
	$erf=' on[Invt::onOrderCommi_put()]';
	if($P['whsId']){ $D['whsId']=$P['whsId']; };
	if(self::$errText=_js::ise($D['whsId'],'La bodega debe estar definida.'.$erf)){ self::$err=true; break; }
	else if(self::$errText=_js::ise($D['itemId'],'El ID del artículo no ha sido definido.'.$erf)){ self::$err=true; break; }
	else if(self::$errText=_js::ise($D['itemSzId'],'La talla del artículo no ha sido definida.'.$erf)){ self::$err=true; break; }
	else if($qty==0){ self::$err=true; self::$errText=_js::e(3,'No se ha definido cantidad a actualizar.'.$erf); break; }
	else{
		$wh = 'itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' AND whsId=\''.$D['whsId'].'\' LIMIT 1';
		$set1 = ' ';
		if($isPurc && $D['onOrder']){ $onOrder=$onOrder*$numFactor; }
		if($D['isCommited']){ 
			$D['isCommited=']='isCommited+'.$isCommited; unset($D['isCommited']);
			$D['isCommited']=$isCommited;
		}
		if($D['onOrder']){
			$D['onOrder=']='onOrder+'.$onOrder; unset($D['onOrder']);
			$D['onOrder']=$onOrder;
		}
		if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; break; }
		$r=a_sql::oneMulti($D,array('tbk'=>'ivt_oitw','qDo'=>'uniRow','wh_change'=>$wh));
		if(a_sql::$err){ self::$err=true; self::$errText=_js::e(1,'Error actualizando comprometidos en tabla inventario: '.a_sql::$errText); break; }
	}
	}
	if(self::$err){ _err::err(self::$errText); }
	return self::$err;
}
static public function onHand_rever($P=array()){
	$js=false; $org=' on Ivt::onHand_rever().';
	if($js=_js::ise($P['tt'],'Se debe definir TT '.$org)){}
	else if($js=_js::ise($P['tr'],'Se debe definir TT'.$org)){}
	else if($js=_js::ise($P['docDate'],'Se debe definir la fecha de la reversión'.$org)){}
	else{
		$gB='whsId,itemId,itemSzId,price';
		$q=a_sql::query('SELECT '.$gB.',SUM(inQty) inQty,SUM(outQty) outQty FROM ivt_wtr1 WHERE tt=\''.$P['tt'].'\' AND tr=\''.$P['tr'].'\' GROUP BY '.$gB.' ORDER BY outQty DESC',array(1=>'Error obteniendo registros para revertir movimientos de inventario: '));
		$Liv=array();
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else if(a_sql::$errNo==-1){ $errs=0;
			while($L=$q->fetch_assoc()){
				if($L['inQty']>0){
					$L['outQty']=$L['inQty']; unset($L['inQty']);
					$L['quantity']=$L['outQty'];
					self::onHand($L);
					if(self::$err){ $js=self::$errText;  $errs++; break;}
				}
				else if($L['outQty']>0){
					$L['inQty']=$L['outQty']; unset($L['outQty']);
				}
				$Liv[]=$L;
			}
			if($errs==0){
				self::onHand_put($Liv,$P);
				if(self::$err){ $js=self::$errText; }
			}
		}
	}
	if($js){ self::$err=true; self::$errText=$js; _err::err($js); return false; }
}

}
?>