<?php
class Whs{
static $err=false;
static $errText='';
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
		$qHand =a_sql::fetch('SELECT I.itemName,IV.onHand, (IV.onHand+'.$D['quantity'].') onHandAt,IV.onOrder FROM '._0s::$Tb['itm_whs1'].' IV JOIN '._0s::$Tb['itm_oitm'].' I ON (I.itemId=IV.itemId) '.$wh1,array(1=>'Error consultando inventario para el producto: '));
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
		$ins2=a_sql::insert($D,array('qDo'=>'insert','tbk'=>'itm_wtr1'));
		if(a_sql::$err){ return a_sql::$errNoText = _js::e(1,'Error guardando lineas de transferencia: '.$ins2['text']); }
		else{
			$ins1=a_sql::insert($D1,array('tbk'=>'itm_whs1','qDo'=>$qDo_whs1,'wh_change'=>$wh));
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
		$qHand =a_sql::fetch('SELECT isCommited,onOrder FROM '._0s::$Tb['itm_whs1'].' '.$wh);
		if(a_sql::$errNo==-1){
			$onOrder = $qHand['onOrder']+$quantity;
			$ins1=a_sql::query('UPDATE '._0s::$Tb['itm_whs1'].' SET onOrder='.$onOrder.' '.$wh);
		}
		else{
			$D1['onOrder'] = $quantity;
			$ins1=a_sql::insert($D1,array('tbk'=>'itm_whs1','qDo'=>'insert'));
		}
		if(a_sql::$err){ return a_sql::$errNoText = _js::e(1,'Error actualizando cantidades en Pedido: '.$ins1['text']); }
		else{
			$R[]= _js::r('Inventario y lineas actualizadas correctamente ('.$D1['itemId'].'_'.$D['itemSzId'].')');
		}
	}
	return $R;
}


}
?>