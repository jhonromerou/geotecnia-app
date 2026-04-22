<?php
/*proviene de /ac70/lib/cost.php julio 2019 */
class itmCost {
static public function qUpd($P=array()){
	$r=array();
	$cifPut=($P['cifPut'])
	?'IF(cifManual=\'Y\',cifCostManual,IF(cif!='.$P['cifPut'].','.$P['cifPut'].',cif))'
	:'IF(cifManual=\'Y\',cifCostManual,cif)';
	$r['cif']='+-+'.$P['cifPut'];
	if($P['moCost']){
		$r['cost']= '+-+(IF(mpManual=\'Y\',mpCostManual,mpCost)+IF(moManual=\'Y\',moCostManual,'.$P['moCost'].')+'.$cifPut.')';
	}
	else if($P['mpCost']){
		$r['cost']= '+-+(IF(mpManual=\'Y\',mpCostManual,'.$P['mpCost'].')+IF(moManual=\'Y\',moCostManual,moCost)+IF(cifManual=\'Y\',cifCostManual,cif))';
	}
	else if($P['mpCost_mpPrice']){//vari1
		$r['cost']= '+-+cost+(IF(mpManual=\'N\',(mpCost+'.$P['mpCost_mpPrice'].'),0))';
	}
	return $r;
}
static public function fieCost(){
	return '+-+(IF(mpManual=\'Y\',mpCostManual,costMP)+IF(moManual=\'Y\',moCostManual,costMO)+IF(maManual=\'Y\',maCostManual,costMA)+IF(cifManual=\'Y\',cifCostManual,cif))';
}
static public function fie2Upd($B=array(),$P=array()){
	$r=array();
	$cost=$P['cost'];
	foreach($P as $k=>$v){ $B[$k]=$v;}
	unset($B['cost']);
	$B['._.cost']=self::fieCost(); ;
	$B['cost']=$cost;
	if($P['mpCost_mpPrice']){//vari1
		$B['cost']= '+-+cost+(IF(mpManual=\'N\',(mpCost+'.$P['mpCost_mpPrice'].'),0))';
	}
	return $B;
}

static public function defineManual($D=array()){
	if($js=_js::ise($D['itemId'],'ID de artículo no definida.')){ return $js;}
	else if($js=_js::ise($D['itemSzId'],'ID de talla del artículo no definida.')){ return $js; }
	else if($D['mpManual']=='Y' && $js=_js::ise($D['mpCostManual'],'Se debe definir el costo manual para la materia prima.','numeric>0')){ return $js; }
	else if($D['moManual']=='Y' && $js=_js::ise($D['moCostManual'],'Se debe definir el costo manual para la mano de obra.','numeric>0')){ return $js; }
	else if($D['maManual']=='Y' && $js=_js::ise($D['maCostManual'],'Se debe definir el costo manual para la máquinaria.','numeric>0')){ return $js; }
	else if($D['cifManual']=='Y' && $js=_js::ise($D['cifCostManual'],'Se debe definir el costo manual para los CIF.','numeric>0')){ return $js; }
	else{
		$Di=array('itemId'=>$D['itemId'],'itemSzId'=>$D['itemSzId'],'mpManual'=>$D['mpManual'],'mpCostManual'=>$D['mpCostManual'],'moManual'=>$D['moManual'],'moCostManual'=>$D['moCostManual'],'maManual'=>$D['maManual'],'maCostManual'=>$D['maCostManual'],'cifManual'=>$D['cifManual'],'cifCostManual'=>$D['cifCostManual']);
		$Di['._.cost']=self::fieCost();;
		/* sin costo en matriz */
		$Di['cost'] =($D['moManual']=='Y')?$D['moCostManual']:0;
		$Di['cost'] +=($D['mpManual']=='Y')?$D['mpCostManual']:0;
		$Di['cost'] +=($D['cifManual']=='Y')?$D['cifCostManual']:0;
		$Di['cost'] +=($D['otherManual']=='Y')?$D['otherCostManual']:0;
		$Di['._.dateUpd']=date('Y-m-d H:i:s');
		$Di['dateUpd']=$Di['._.dateUpd'];
		$ins=a_sql::insert($Di,array('table'=>'itm_oipc','wh_change'=>'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(1,'Error definiendo costos: '.$ins['text'],$adJs); } 
		else{
			$upds +=$ins['affected_rows']+$ins['num_rowsi'];
			$js=_js::r('Guardado correctamente.',$adJs);
			if($upds>0){ _ADMS::_lb('itm'); _itm::log2_put(array('updateType'=>'defineCost','itemId'=>$D['itemId'],'itemSzId'=>$D['itemSzId'])); }
		}
	}
	return $js;
}
static public function defineModel($D=array()){
	$gb='IT.lineType,IT.itemSzId,IT.variType,IT.isVari';
	/* A=base para todas las tallas, 
	O=Costo de lo que no tiene talla, 
	T: +A
	1. Leer desde itt1
	2. Obtener tallas segun grsId[]
	3.
	*/
	$IT=array();
	$BS=array('cost'=>0,'costMP'=>0,'costMO'=>0,'costMA'=>0,'cif'=>0);
	$IT['A']=$BS;
	$IT['O']=$BS;
	$IT['T']=array();
	$q=a_sql::query('SELECT '.$gb.',SUM(IT.lineTotal) lineTotal FROM itm_itt1 IT WHERE itemId=\''.$D['itemId'].'\' GROUP BY '.$gb,array(1=>'Error obteniendo escandallos del producto ID '.$D['itemId'].': ','No existen componentes para el escandallo ID '.$D['itemId']));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	while($L=$q->fetch_assoc()){
		$k=$L['itemSzId'];
		$kType='cost'.$L['lineType'];//costMP,MO
		if($L['lineType']=='cif'){ $kType='cif'; }
		else if($L['lineType']=='SE'){ $kType='costMP'; }
		if($k!=0 && !array_key_exists($k,$IT)){ $IT['T'][$k]=$BS; }
		/*base para todas las tallas */
		if($L['variType']=='N' && $L['isVari']=='N'){
			$IT['A']['cost']+=$L['lineTotal'];
			$IT['A'][$kType]+=$L['lineTotal'];
		}
		if($k==0){
			$IT['O']['cost']+=$L['lineTotal'];
			$IT['O'][$kType]+=$L['lineTotal'];
		}
		else if($k!=0){
			$IT['T'][$k]['cost']+=$L['lineTotal'];
			$IT['T'][$k][$kType]+=$L['lineTotal'];
		}
	}
	/* extructurar todos */
	foreach($IT['T'] as $k=>$Lx){
		foreach($Lx as $k2=>$L2){ $IT['T'][$k][$k2]=$IT['A'][$k2]+$IT['T'][$k][$k2]; }
	}
	/* Obtener todas las tallas para actualizar */
	$whSize=(!_js::ise($D['itemSzId'],'','numeric>0'))?' AND itemSzId=\''.$D['itemSzId'].'\'':'';
	$ql=a_sql::query('SELECT itemSzId FROM itm_grs2 WHERE grsId=\''.$D['grsId'].'\''.$whSize.' LIMIT 50',array(1=>'Error obteniendo tallas del escandallo: ',2=>'El escandallo no tiene definida ninguna talla.'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$dateUpd=date('Y-m-d H:i:s');
	a_sql::transaction(); $errs=0; 
	while($L=$ql->fetch_assoc()){
		$k=$L['itemSzId'];
		$Di=array('itemId'=>$D['itemId'],'itemSzId'=>$k,'mpDateUpd'=>$dateUpd);
		if($IT['T'][$k]){ $Di=self::fie2Upd($Di,$IT['T'][$k]); }
		else { $Di=self::fie2Upd($Di,$IT['O']); }
		$ins3=a_sql::insert($Di,array('table'=>'itm_oipc','wh_change'=>'WHERE itemId=\''.$D['itemId'].'\' AND itemSzId=\''.$D['itemSzId'].'\' LIMIT 1'));
		print_r($ins3);
		if($ins3['err']){ $js=_js::e(3,'Error actualizando costo del artículo en la talla. ('.$D['itemId'].'-'.$k.'): '.$ins3['text']); $errs++; break; }
	}
	if($errs==0){
		//$qu=a_sql::query('UPDATE itm_log2 SET isExec=\'Y\', userExec=\''.a_ses::$userId.'\', dateExec=\''.$dateUpd.'\' WHERE id=\''.$D['id'].'\' LIMIT 1',array(1=>'Error cerrando log de modificación: '));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else{ $js=_js::r('Costos de Materia Prima actualizados para el artículo.'); }
	}
	a_sql::transaction('c');
	return $js;
}
static public function defineFromMP_updatePrice($D=array()){
	$gb='itt1.itemId';
	/* Aqui defino el nuevo precio directamente y no variacion */
	$q1=a_sql::query('UPDATE itm_itt1 SET buyPrice=('.$D['vari1'].'), lineTotal=(buyPrice*quantity) WHERE citemId=\''.$D['itemId'].'\' ',array(1=>'Error actualizando precio en matriz de materiales: '));
	if(a_sql::$err){ return a_sql::$errNoText; }
	a_sql::transaction();
	$qu=a_sql::query('UPDATE itm_log2 SET isExec=\'Y\', userExec=\''.a_ses::$userId.'\', dateExec=\''.date('Y-m-d H:i:s').'\' WHERE id=\''.$D['id'].'\' LIMIT 1',array(1=>'Error cerrando log de modificación: '));
	if(a_sql::$err){ a_sql::transaction('c'); return a_sql::$errNoText; }
	$q=a_sql::query('SELECT '.$gb.' FROM itm_itt1 itt1 WHERE itt1.citemId=\''.$D['itemId'].'\' GROUP BY itt1.itemId',array(1=>'Error obteniendo modelos relacionados con la materia prima:',2=>'No se encontraron modelos relacionados con la materia prima.'));
	if(a_sql::$err){ a_sql::transaction('c'); return a_sql::$errNoText; }
	else{
		$js=_js::r('Se actualizó el costo del material en las fichas, ejecute el log de cambio para aplicar la actualización en cada uno de los artículos.');
		while($L=$q->fetch_assoc()){
			_itm::log2_put(array('updateType'=>'model','itemId'=>$L['itemId']));
		}
	}
	a_sql::transaction('c');
	return $js;
}
}
?>