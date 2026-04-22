<?php
class xdp_Geo{
static $Cem=array();

static public function getCemento($P=array()){
	if($P['edad']<=28){
		if(array_key_exists($P['cemento'],self::$Cem)){
			if(self::$Cem[$P['cemento']][$P['edad']]){ 
				return self::$Cem[$P['cemento']][$P['edad']];
			}
		}
		else{
            _js::err('el cememento '. $P['cemento'].' no tiene configuración definidad', 3);
            _js::errDie();
        }
	}
	else{ return null;  }
}

static public function getLbs($D=array()){
	if($js=_js::ise($D['docEntry'],'Se debe definir el número de documento.','numeric<0')){  }
	else if($js=_js::ise($D['lineType'],'Se debe definir el tipo de Lb.')){}
	else{
		_ADMS::lib('iDoc');
		_ADMS::_lb('sql/filter');
		$D['whB']=array();
		$D['whB']['B.lineType']=$D['lineType'];
		if(1){
			$D['whB']['B.lineNum(E_mayIgual)']=$_GET['lineNum(E_mayIgual)'];
			$D['whB']['B.lineNum(E_menIgual)']=$_GET['lineNum(E_menIgual)'];
		}
		$docEntry=$D['docEntry'];
		unset($D['lineType']);
		$D['fromA']='* FROM xdp_orit A';
		$D['fromB']='* FROM xdp_oens B';
		$D['whB']=a_sql_filtByT($D['whB']);
		$js= iDoc::getOne($D);
	}
	return $js;
}

static public function put_lbs($Lx=array(),$D=array(),$ln=''){
	a_sql::query('UPDATE xdp_orit SET dateUpd=\''.date('Y-m-d H:i:s').'\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error actualizando fecha de remisión.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText);}
	else foreach($Lx as $n => $L){
		$qDo=($L['id'])?'update':'insert';
		if($L['delete']=='Y'){ $qDo='delete'; }
		else{
			switch($D['lineType']){
				case 'viguetas' : $L['D']=self::Lb_vigueta($L['D'],$L); break; 
				case 'cilindros' : $L['D']=self::Lb_cilindro($L['D'],$L); break; 
				case 'nucleos' : $L['D']=self::Lb_nucleo($L['D'],$L); break; 
				case 'densidadcampo' : $L['D']=self::Lb_densidad($L['D'],$L); break; 
			}
		}
		$qI=a_sql::fetch('SELECT itemId,sellPrice FROM itm_oitm WHERE itemCode=\''.$D['lineType'].'\' LIMIT 1',array(1=>$lnt.'Error obteniendo información del artículo lb.'.$ori,2=>$lnt.'El lb no tiene un artículo con código ['.$D['lineType'].'] en el maestro de artículos.'));
		if(a_sql::$err){ $js=_err::err(a_sql::$errNoText); return false; }
		$Di=array('docEntry'=>$D['docEntry'],'lineType'=>$D['lineType'],'lineStatus'=>$L['lineStatus'],'lineDate'=>$L['lineDate'],'lineNum'=>$L['lineNum'],'jsData'=>json_encode($L['D']),'lineMemo'=>$L['lineMemo']);
		$ins=a_sql::insert($Di,array('table'=>'xdp_oens','qDo'=>$qDo,'wh_change'=>'WHERE id=\''.$L['id'].'\' LIMIT 1'));
		if($ins['err']){ _err::err(_js::e(4,$ln.'Error guardando lb. '.$ins['text'])); $errs++; break; }
		else{
			$lineDate=$L['lineDate'];
			$ensId=($ins['insertId'])?$ins['insertId']:$L['id'];
			$L['delete']=(array_key_exists('delete',$L))?$L['delete']:'N';
			$Liv[]=array('docEntry'=>$D['docEntry'],'ensId'=>$ensId,'itemId'=>$qI['itemId'],
			'quantity'=>1,'delete'=>$L['delete'],'ensType'=>$D['lineType'],'lineNum'=>$L['lineNum'],'price'=>$qI['sellPrice'],'priceLine'=>$qI['sellPrice'],'lineDate'=>$lineDate);
		}
		if($errs==0){
			foreach($Liv as $n =>$L){
				self::ens2Remi($L,'No. Prueba '.$L['lineNum'].': ');
				if(_err::$err){ $js=_err::$errText; $errs++; break; }
			}
		}
	}
}
static public function ens2Remi($D=array(),$lnt=''){
	$ori=' on[xdp_Geo::ens2Remi()]';
	if($js=_js::ise($D['ensId'],$lnt.'Se debe definir el Id de Lb.'.$ori,'numeric>0')){ _err::err($js); }
	else if($js=_js::ise($D['ensType'],$lnt.'Se debe el tipo de lb.'.$ori)){ _err::err($js); }
	else{
		$q=a_sql::fetch('SELECT lineStatus FROM xdp_rit1 WHERE ensId=\''.$D['ensId'].'\' LIMIT 1',array(1=>$lnt.'Error revisando lb en remisión: '.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if(a_sql::$errNo == -1 && $q['lineStatus']=='C' && $D['delete']=='Y'){ _err::err($lnt.'El lb fue facturado y no se puede eliminar.',3); }
		else{
			unset($D['lineNum']);
			$ins=a_sql::insert($D,array('table'=>'xdp_rit1','kui'=>'dateC','wh_change'=>'WHERE ensId=\''.$D['ensId'].'\' LIMIT 1'));
			if($ins['err']){ _err::err($lnt.'Error guardando lb en remisión: '.$ins['text'],3); }
		}
	}
}

static public function itm2Remi($Lx=array(),$D=array(),$lnt=''){
	$ln=1; $ori=' on[geo:itm2Remi()]';
	if($js=_js::ise($D['docEntry'],'Se debe definir Id de documento.'.$ori,'numeric>0')){ _err::err($js); }
	else if(!is_array($Lx) || count($Lx)==0){ _err::err('No se enviaron lineas a guardar.'.$ori,3); }
	else foreach($Lx as $n =>$L){
		$lnt='Linea '.$ln.': '; $ln++;
		if($js=_js::ise($L['itemId'],$lnt.'Se debe definir Id de artículo.'.$ori,'numeric>0')){ _err::err($js); break; }
		else if($js=_js::ise($L['lineDate'],$lnt.'Se debe definir fecha registro.'.$ori)){ _err::err($js); break; }
		else if($js=_js::ise($L['price'],$lnt.'Se debe definir precio unitario.'.$ori)){ _err::err($js); break; }
		else if($js=_js::ise($L['quantity'],$lnt.'Se debe definir precio unitario.'.$ori,'numeric>0')){ _err::err($js); break; }
		else if($js=_js::textLen($L['lineMemo'],500,$lnt.'Los detalles no pueden exceder 500 caracteres.'.$ori)){ _err::err($js); break; }
		else{
			$qDo='insert'; $errs=0;
			if($L['id']){ $qDo='update';
				$q=a_sql::fetch('SELECT lineStatus FROM xdp_rit1 WHERE id=\''.$L['id'].'\' LIMIT 1',array(1=>$lnt.'Error revisando item en remisión: '.$ori));
				if(a_sql::$err){ $js=_err::err(a_sql::$errNoText); $errs++; break; }
				else if(a_sql::$errNo == -1 && $q['lineStatus']=='C' && $L['delete']=='Y'){ _err::err($lnt.'La linea fue facturado y no se puede eliminar.'.$ori,3); $errs++; break; }
			}
			if($errs==0){
				if($L['delete']=='Y'){ $qDo='delete'; }
				$L['docEntry']=$D['docEntry'];
				$L['priceLine']=$L['price']*$L['quantity'];
				$ins=a_sql::insert($L,array('table'=>'xdp_rit1','qDo'=>$qDo,'wh_change'=>'WHERE id=\''.$L['id'].'\' LIMIT 1'));
				if($ins['err']){ _err::err($lnt.'Error guardando articulo en remisión: '.$ins['text'].$ori,3); break; }
			}
		}
	}
}
static public function Lb_densidad($P=array(),$L=array()){
	@$P['pesoarena_usada'] =  $P['pesofrasco_inicial'] - $P['pesofrasco_final'];
	@$P['pesoarena_enhueco'] =  $P['pesoarena_usada'] - $P['pesoarena_encono'];
	@$P['volumen_hueco'] = $P['pesoarena_enhueco'] / $P['densidad_arena'];
	@$P['densidad_humeda'] = $P['pesomaterial_extraido'] / $P['volumen_hueco'];
	@$P['densidad_seca'] = $P['densidad_humeda'] / ( 1 + ($P['humedad_porc']/100) );
	@$P['compatacion_porc'] = round(($P['densidad_seca'] / $P['densidadmax_laboratorio']*100),1);
	@$P['volumen_hueco'] = round($P['volumen_hueco'],2);
	@$P['densidad_humeda'] = round($P['densidad_humeda'],2);
	@$P['densidad_seca'] = round($P['densidad_seca'],2);
	return $P;
}
static public function Lb_cilindro($P=array(),$L=array()){
	if(!array_key_exists('edad',$P)){
		$P['edad']=round((strtotime($L['lineDate'])-strtotime($P['fecha_vaciado']))/86400);
	}
	$P['cemento_res']=self::getCemento($P);
	$f_cm_2 = $P['f_cm'] *$P['f_cm'];
	@$res_afecha = round($P['carga_rotura'] / ( pi()* ( $f_cm_2/4 ) ));
	$P['resistencia_afecha'] = $res_afecha;
	$P['resistencia_observada'] =$res_afecha;
	$res_proyectada=0;
	if($P['edad'] <= 28 && $P['cemento_res']>0){
		$res_proyectada=round($res_afecha / $P['cemento_res']); 
	}
	//$P['cemento'] = ($P['cemento_text']) ? $P['cemento_text'] : $P['cemento'];
	if($P['edad']>=28){
		$P['res_txt']='OBSERVADA';
		$P['res_txtNum']=$res_afecha; /* igual */
	}
	else if($P['edad'] <28 && $res_proyectada == 0){
		$P['res_txt']='NO PROYECTADA';
		$P['res_txtNum']=null;
	}
	else{
		$P['res_txt']='PROYECTADA';
		$P['res_txtNum']=$res_proyectada; /* igual */
	}
	$P['porcentaje_fecha'] = (int) $P['resistencia_esperada'] == 0
        ? '' : round($res_afecha/$P['resistencia_esperada']*100).'%';
	return $P;
}
static public function Lb_vigueta($P=array(),$L=array()){
	if(!array_key_exists('edad',$P)){
		$P['edad']=round((strtotime($L['lineDate'])-strtotime($P['fecha_vaciado']))/86400);
	}
	$P['cemento_res']=self::getCemento($P);
	$res_afecha = round( (( $P['carga_rotura'] * $P['largo']) / ($P['ancho']*( $P['alto']*$P['alto'] ))) ,1) ;
	$P['resistencia_mpa'] = round($res_afecha,1);
	$res_proyectada=0;
	if($P['edad'] <= 28 && $P['cemento_res'] !=0) {
		@$res_proyectada=round($res_afecha / $P['cemento_res'],1);
	}
	//$P['cemento'] = ($P['cemento_text']) ? $P['cemento_text'] : $P['cemento'];
	if($P['edad']>=28){
		$P['res_txt']='OBSERVADA';
		$P['res_txtNum']=round($res_afecha,1); /* igual */
	}
	else{
		$P['res_txt']='PROYECTADA';
		$P['res_txtNum']=($res_proyectada==INF)?'err':$res_proyectada; /* igual */
	}
	//print_r($P);
	//die('--->'.json_encode($P));
	return $P;
}
static public function Lb_nucleo($P=array(),$L=array()){
	$P['area'] = ((M_PI)*($P['diametro']*$P['diametro'])/4);
	$P['volumen'] = @$P['altura'] * $P['area'];
	$P['densidad'] = ($P['volumen']) ? round($P['peso'] / $P['volumen'],3) : '';
	$P['relacion'] = ($P['diametro']) ? @round($P['altura']/$P['diametro'],2) : '';
	$resistencia_kgcm2_v = ($P['area']) ? round(($P['carga_rotura']/$P['area']),1) : 'Falta Area: '.$P['area'];
	$resistencia_kgcm2 = ($P['area']) ? round(($P['carga_rotura']/$P['area']),1) : 'Not F';
	$resistencia_kgcm2 = ($P['relacion'] <= 1.8) ? $resistencia_kgcm2*$P['castigado'] : $resistencia_kgcm2;
	$resistencia_kgcm2 = ($resistencia_kgcm2 <=0)
	?'A:'.$P['area'].', Cast:'.$P['castigo'].', Res: '.$resistencia_kgcm2.', Rel:'.$P['relacion']
	: $resistencia_kgcm2;
	$P['resistencia_kgcm2'] = $resistencia_kgcm2;
	$P['resistencia_psi'] = @round(($resistencia_kgcm2/0.07),0);
	$P['area'] = round($P['area'],3);
	$P['volumen'] = round($P['volumen'],3);
	return $P;
}

}
?>