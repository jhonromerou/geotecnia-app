<?php
class gvtBase{
	//Origenes
	static $TBs=[
	'gvtSop'=>['gvt_osop','gvt_sop1'],
	'gvtSdn'=>['gvt_osdn','gvt_sdn1'],
	'gvtSrd'=>['gvt_osrd','gvt_srd1'],
	'gvtSin'=>['gvt_oinv','gvt_inv1'],
	'gvtSnc'=>['gvt_osnc','gvt_snc1'],
	'gvtSnd'=>['gvt_osnd','gvt_snd1'],
	
	'gvtSor'=>['gvt_osor','gvt_sor1','openQty'=>'Y','doClose'=>'gvtSorCloseTt'],
	];
	static public function getTb($tbSerie){
		$R=self::$TBs[$tbSerie];
		if($R && $R[0]){ return $R; }
		else{ return []; }
	}
	static public function closeFromTt($tbSerie,$docEntry,$_J){ //actualizar openQty
	//ott,otr,serieId,docNum
		if(!($_J['ott'] && $_J['otr']>0)){ return true; }
		$ori=' on[gvtBase::openQty_put()]';
		#1) Donde se almacenan los datos - factura
		{
			$rTb=self::getTb($tbSerie);
			$tbkA=$rTb[0]; $tbk1B=$rTb[1]; //factura
			$rTb=[]; //origen
			$tbk=$tbk1=''; //orden de venta
			$gBy='A.ott,A.otr,B.itemId,B.itemSzId';
			$q=a_sql::query('SELECT '.$gBy.',SUM(B.quantity) quantity 
			FROM '.$tbkA.' A
			JOIN '.$tbk1B.' B ON (B.docEntry=A.docEntry)
			WHERE A.docEntry=\''.$docEntry.'\' GROUP BY '.$gBy,[1=>'Error obteniendo información de documento de origen'.$ori,2=>'El documento de origen no existe'.$ori]);
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			else{
				#2) Table de origen - orden de venta
					#obtener cantidad registradas para actualizar en origen
				$n=0; $qU=[]; 
				$otr=0;
				while($L=$q->fetch_assoc()){
					if($n==0){ $n=1;
						$otr=$L['otr'];
						$rTb=self::getTb($L['ott']);
						$tbk=$rTb[0]; $tbk1=$rTb[1];
					}
					$qty=$L['quantity']*1;
					$wh='docEntry=\''.$L['otr'].'\' AND itemId=\''.$L['itemId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1';
					$qU[]=['u',$tbk1,'openQty='=>'IF(openQty-'.$qty.'<0,0,openQty-'.$qty.')','_wh'=>$wh];
				}
				//die(print_r($qU));
				if($rTb['openQty']=='Y'){
					a_sql::multiQuery($qU);
				}
				#3) si doClose definido reviso que todas las unidades esten completas y cierro documento
				if(!_err::$err && $rTb['doClose']){
					if(!_Mdl::get($rTb['doClose'],'N',false)){
						$q=a_sql::fetch('SELECT SUM(openQty) openQty FROM '.$tbk1.' WHERE docEntry=\''.$otr.'\' ',[1=>'Error verificando proceso de cierre documento de origen.'.$ori,2=>'No se encontraron resultados para verificar cierre documento de origen.'.$ori]);
						if(a_sql::$err){ _err::err(a_sql::$errNoText); }
						else if($q['openQty']<=0){ 
							a_sql::query('UPDATE '.$tbk.' SET docStatus=\'C\' WHERE docEntry=\''.$otr.'\' LIMIT 1',[1=>'Error cerrando documento de origen']);
							if(a_sql::$err){ _err::err(a_sql::$errNoText); }
						}
					}
				}
			}
		}
		#4) registrar relacion en tabla
		if(!_err::$err){
			JLog::rel1(['ott'=>$_J['ott'],'otr'=>$_J['otr'],
			'tt'=>$tbSerie,'tr'=>$docEntry,'serieId'=>$_J['serieId'],'docNum'=>$_J['docNum']
			]);
		}
	}
	static public function cancelFromTt($tbSerie,$docEntry,$_J){ //actualizar openQty
	//ott,otr,serieId,docNum
		if(!($_J['ott'] && $_J['otr']>0)){ return true; }
		$ori=' on[gvtBase::cancelFromTt()]';
		#1) Donde se almacenan los datos - factura
		{
			$rTb=self::getTb($tbSerie);
			$tbkA=$rTb[0]; $tbk1B=$rTb[1]; //factura
			$rTb=[]; //origen
			$tbk=$tbk1=''; //orden de venta
			$gBy='A.ott,A.otr,B.itemId,B.itemSzId';
			$q=a_sql::query('SELECT '.$gBy.',SUM(B.quantity) quantity 
			FROM '.$tbkA.' A
			JOIN '.$tbk1B.' B ON (B.docEntry=A.docEntry)
			WHERE A.docEntry=\''.$docEntry.'\' GROUP BY '.$gBy,[1=>'Error obteniendo información de documento de origen'.$ori,2=>'El documento de origen no existe'.$ori]);
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			else{
				#2) Table de origen - orden de venta
					#obtener cantidad registradas para actualizar en origen
				$n=0; $qU=[]; 
				$otr=0;
				while($L=$q->fetch_assoc()){
					if($n==0){ $n=1;
						$otr=$L['otr'];
						$rTb=self::getTb($L['ott']);
						$tbk=$rTb[0]; $tbk1=$rTb[1];
					}
					$qty=$L['quantity']*1;
					$wh='docEntry=\''.$L['otr'].'\' AND itemId=\''.$L['itemId'].'\' AND itemSzId=\''.$L['itemSzId'].'\' LIMIT 1';
					$qU[]=['u',$tbk1,'openQty='=>'IF(openQty+'.$qty.'>=quantity,quantity,openQty+'.$qty.')','_wh'=>$wh];
				}
				//die(print_r($qU));
				if($rTb['openQty']=='Y'){
					a_sql::multiQuery($qU);
				}
				#3) si doClose reviso que todas las unidades esten completas y cierro documento
				if(!_err::$err && $rTb['doClose']){
					if(!_Mdl::get($rTb['doClose'],'N',false)){
						$q=a_sql::fetch('SELECT SUM(openQty) openQty FROM '.$tbk1.' WHERE docEntry=\''.$otr.'\' ',[1=>'Error verificando relación documento de origen.'.$ori,2=>'No se encontraron resultados para documento de origen.'.$ori]);
						if(a_sql::$err){ _err::err(a_sql::$errNoText); }
						else if($q['openQty']>0){ 
							a_sql::query('UPDATE '.$tbk.' SET docStatus=\'O\' WHERE docEntry=\''.$otr.'\' LIMIT 1',[1=>'Error actualizando documento de origen']);
							if(a_sql::$err){ _err::err(a_sql::$errNoText); }
						}
					}
				}
			}
		}
	}
}
?>
