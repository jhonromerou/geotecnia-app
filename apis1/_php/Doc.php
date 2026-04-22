<?php
class Doc{
static $owh=true; /* usar ocardId */
static $ok=false; // Determina respuesta de script
static $wtr=false;//true to whsFrom-whsTo
static $serieTy=array();//odlv
static $sTy=array();
static $D=array(); /* save data temp */
static public function tb99($serieType='',$P=array()){
	$otb=self::$sTy[$serieType]['otb'];
	$tb99=self::$sTy[$serieType]['tb99'];
	return self::getOne(array('fromA'=>'A.docDate FROM '.$otb.' A','fromB'=>'* FROM '.$tb99.' B','whB'=>'AND B.serieType=\''.$serieType.'\' ','docEntry'=>$P['docEntry']));
}
static public function log_post($D=array(),$r=false){
	$datec=date('Y-m-d H:i:s');
	$serieType=$D['serieType'];
	$tbk=self::$serieTy[$serieType]['tb99'];
	if(self::$sTy[$serieType] && self::$sTy[$serieType]['tb99']){
			$tbk=self::$sTy[$serieType]['tb99'];
	};
	if($r=='PRINT'){ echo $tbk; print_r($D); }
	$docEntry=$D['docEntry']; $lineMemo=$D['lineMemo'];
	unset($D['docEntry'],$D['serieType'],$D['lineMemo']);
	foreach($D as $f =>$v){
		if($f=='dateC'){ $v=$datec; }
		$Di=array('serieType'=>$serieType,'docEntry'=>$docEntry,'fiek'=>$f,'fiev'=>$v,'lineMemo'=>$lineMemo,'userId'=>a_ses::$userId,'dateC'=>$datec);
		$i1=a_sql::insert($Di,array('tbk'=>$tbk,'qDo'=>'insert'));
		if($r){ print_r($i1); }
	}
}
static public function bySlp($P2=array()){//iDoc
	$slps=array();
	if(array_key_exists('slps',$P2)){
		$slpA=($P2['slpAlias'])?$P2['slpAlias'].'.':'A.';
		if($P2['slps']=='Y'){ $slps=a_ses::U_slpIds(array('f'=>$slpA.'slpId','r'=>'a','tbA'=>$P2['slpAlias'])); }
		else { $slps=array('join'=>'LEFT JOIN par_oslp S ON (S.slpId='.$slpA.'slpId) '); }
	}
	return $slps;
}
static public function view($D=array()){
	if($D['fromA']){ $D['sel_otb']=$D['fromA']; }
	if($D['fromB']){ $D['sel_tb1']=$D['fromB']; }
	if($js=_js::ise($D['docEntry'],'Se debe definir el número de documento')){ return $js; }
	else{
		$qo=a_sql::fetch('SELECT docEntry,'.$D['sel_otb'].' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información del documento: ',2=>'No se encontró el documento '.$D['docEntry']));
		if(a_sql::$err){ return a_sql::$errNoText; }
		else if($D['sel_tb1']){
			$q=a_sql::query('SELECT '.$D['sel_tb1'].'  WHERE B.docEntry=\''.$D['docEntry'].'\' ',array(1=>'Error obteniendo lineas del documento: ',2=>'El documento no tiene información guardada.'));
			if(a_sql::$err){ return a_sql::$errNoText; }
			else{
				$Mx=$qd; $Mx['L']=array(); $ln=0;
				while($L=$q->fetch_assoc()){
					if($L['lineNum']){ $ln=$L['lineNum']; } else{ $ln++; }
					$Mx[$ln]=$L;
				}
				$js=_js::enc($Mx,'NO_PAGER');
			}
		}
		else{ return $qo; }
	}
	return $js;
}
static public function getTb($P=array()){
	$serieType=$docType=$P['serieType'];
	$otb=$tb1=$tb2=''; self::$wtr=false; $join2=true;
	if(array_key_exists($serieType,self::$sTy)){
		$A=self::$sTy[$serieType];
		$otb=$A['otb']; $tb1=$A['tb1']; $tb2=$A['tb2']; $invMov=$A['invMov'];
		$TbF=$A['TbF']; $join2=$A['join2']; $oFie=$A['oFie'];
	}
	else if($docType!=''){ return array('errNo'=>3,'text'=>'El tipo de documento {{'.$docType.'}} no tiene acciones definidas.'); }
	else{ return array('errNo'=>3,'text'=>'No se ha definido tipo de documento para realizar acciones ('.$P['serieType'].'). Doc::getTb'); }
	$join2=($join2)?'JOIN '.$tb2.' A2 ON (B.catEntry=A2.catEntry)':'';
	if($P['tbAlias']=='Y'){ $otbA=' '.$otbA; } else{ $otbA=''; }
	$R=array('otb'=>$otb.$otbA,'oFie'=>$oFie,
	'tb1'=>$tb1,
	'tb2'=>$tb2,
	'join2'=>$join2,
	'wtr'=>self::$wtr,
	'docType'=>$docType,'serieType'=>$docType,'tt'=>$docType,'TbF'=>$TbF,);
	if($A['addD']){//add Data with array: example: daysToClose=Y
		foreach($A['addD'] as $k =>$v){ $R[$k]=$v; }
	}
	if($invMov){ $R['invMov']='Y'; }
	return $R;
}
/* new */
static $revLineIvt='Y';
static public function vStatus($P=array()){//iDoc
	//docEntry,tbk,docEntryAlias,cancelOmit=Y,closeOmit=Y, isStatus, fie
	$ori=' on[Doc::vStatus()]';
	$js=false;
	if($js=_js::ise($P['docEntry'],'Se debe definir el número de documento.'.$ori)){ return $js;}
	else if($js=_js::ise($P['tbk'],'Se debe la tabla.'.$ori)){ return $js;}
	$fie='docStatus';
	if($P['fie']){ $fie .=','.$P['fie']; }
	$whDoc=($P['docEntryAlias'])?$P['docEntryAlias']:'docEntry';
	$q=a_sql::fetch('SELECT '.$fie.' FROM '.$P['tbk'].' WHERE '.$whDoc.'=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo estado el documento. '.$ori.': ',2=>'No se encontro el documento, no se obtuvo el estado.'.$ori));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if($P['invMov'] && $q['invMov']=='Y'){ $js=_js::e(3,'Los movimientos de inventario ya fueron realizados para este documento.'.$ori); }
	else if($P['isStatus'] && $q['docStatus']==$P['isStatus']){ $js= _js::e(3,$P['isStatus_text'].$ori); }
	else if($P['cancelOmit']!='Y' && ($q['docStatus']=='N' || $q['canceled']=='Y')){ $js=_js::e(3,'El documento se encuentra anulado y no se puede modificar ('.$P['cancelOmit'].').'.$ori); }
	else if($q['docStatus']=='C' && $P['closeOmit']!='Y'){ $js=_js::e(3,'El documento se encuentra cerrado y no se puede modificar.'.$ori); }
	else if($P['verify_open']=='Y' && $q['docStatus']=='O'){ $js=_js::e(3,'Documento abierto: No se puede modificar este documento.'.$ori); }
	else if($P['Fi']){//[status, N, mensaje error }]
		foreach($P['Fi'] as $n => $L){
			$text=($L[2])?$L[2]:'Error revisando campo en estado.'; 
			if($q[$L[0]] && $q[$L[0]]==$L[1]){ $js= _js::e(3,$text.$ori); break; }
		}
	}
	if($js==false){
		if($P['D']=='Y'){ self::$D=$q; }
	}
	return $js;
}
static public function logPost($D=array(),$r=false){
	$datec=date('Y-m-d H:i:s');
	$tbk=$D['tbk'];
	if($r=='PRINT'){ echo $tbk; print_r($D); }
	$docEntry=$D['docEntry']; $lineMemo=$D['lineMemo'];
	$serieType=$D['serieType'];
	unset($D['tbk'],$D['docEntry'],$D['lineMemo'],$D['serieType']);
	foreach($D as $f =>$v){
		if($f=='dateC'){ $v=$datec; }
		$Di=array('serieType'=>$serieType,'docEntry'=>$docEntry,'fiek'=>$f,'fiev'=>$v,'lineMemo'=>$lineMemo,'userId'=>a_ses::$userId,'dateC'=>$datec);
		$i1=a_sql::qInsert($Di,array('tbk'=>$tbk,'qDo'=>'insert'));
		if($r){ print_r($i1); }
	}
}
static public function logGet($P=array()){
	return a_sql::queryL('SELECT dateC,userId,fiek,fiev,lineMemo FROM '.$P['tbk'].' WHERE  serieType=\''.$P['serieType'].'\' AND docEntry=\''.$P['docEntry'].'\' LIMIT 50');
}
static public function putStatus($P=array()){//iDoc
	if($js=_js::ise($P['t'],'Debe definir tipo de actualización estado documento.')){ _err::err($js); }
	else if($js=self::vStatus($P)){ return _err::err($js); }
	else if($P['reqMemo'] && $js=_js::ise($P['lineMemo'],'Debe definir el motivo del cambio de estado.')){ _err::err($js); }
	else if($P['reqMemo'] && !_js::textLimit($P['lineMemo'],100)){ _err::err('Los detalles no puede exceder los 100 caracteres.',3); }
	else{
		$setA='';
		switch($P['t']){
			case 'N': $setA='docStatus=\'N\', canceled=\'Y\',cancelDate=\''.date('Y-m-d').'\' '; break;
			case 'C': $setA='docStatus=\'C\''; break;
			case 'D': $setA='docStatus=\'D\''; break;
			default: $setA=$P['t']; break;
		}
		$setA=($P['set'])?','.$P['set']:$setA;
		$u=a_sql::query('UPDATE '.$P['tbk'].' SET '.$setA.' WHERE docEntry=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error actualizando estado documento'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			if($P['log'] && $u['aff_rows']>0){ self::logPost(array('docEntry'=>$P['docEntry'],'lineMemo'=>$P['lineMemo'],'docStatus'=>$P['t'],'serieType'=>$P['serieType'],'tbk'=>$P['log'])); }
			$js = _js::r('Estado de documento actualizado correctamente.');
		}
	}
	return $js;
}
static public function setStatus($P=array()){
	if($js=self::vStatus($P)){ return _err::err($js); }
	else if($P['reqMemo'] && $js=_js::ise($P['lineMemo'],'Debe definir el motivo de anulación')){ _err::err($js); }
	else if($P['reqMemo'] && !_js::textLimit($P['lineMemo'],100)){ _err::err('Los detalles no puede exceder los 100 caracteres.',3); }
	else{
		$setA=($P['set'])?','.$P['set']:'';
		$u=a_sql::query('UPDATE '.$P['tbk'].' SET docStatus=\'N\', canceled=\'Y\''.$setA.' WHERE docEntry=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error anulando documento'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			if($P['log'] && $u['aff_rows']>0){ self::logPost(array('docEntry'=>$P['docEntry'],'lineMemo'=>$P['lineMemo'],'docStatus'=>'N')); }
			$js = _js::r('Documento anulado correctamente.');
		}
	}
	return $js;
}

static public function revItmLine($L=array(),$P=array()){
	$ln=$P['ln']; $js=false; $ori=' on[Doc::()]';
	$handInv=(self::$revLineIvt=='Y' && $L['handInv']=='Y');
	$hOpenQty=(array_key_exists('openQty',$P));
	if($js=_err::iff(($hOpenQty && $P['openQty']<=0),$ln.'No hay cantidades pendientes por recibir en la orden de compra.'.$ori)){}
	else if($hOpenQty && $js=_err::iff($L['quantity']>$P['openQty'],$ln.'La cantidad a recibir es mayor a la pendiente.')){}
	else if($js=_js::ise($L['itemId'],$ln.'Se debe definir el ID del artículo.'.$ori,'numeric>0')){}
	//else if($js=_js::ise($L['itemSzId'],$ln.'Se debe definir el ID de la talla del artículo.'.$ori,'numeric>0')){}
	else if($handInv && $js=_js::ise($L['whsId'],$ln.'Se debe definir la bodega de ingreso.'.$ori,'numeric>0')){ }
	else if($js=_js::ise($L['price'],$ln.'Se debe definir el precio del artículo.'.$ori,'numeric>0')){ }
	else if($js=_js::ise($L['quantity'],$ln.'Se debe definir la cantidad.'.$ori,'numeric>0')){}
	else if($js=_js::ise($L['priceLine'],$ln.'El valor de la linea no ha sido definido correctamente.'.$ori,'numeric>0')){ }
	return $js;
}

static public function get($P=array(),$P2=array()){//iDoc
	$Mx=array();
	if($P2['Mx']){ $Mx=$P2['Mx']; unset($P2['Mx']); }
	$ordBy='';
	$ordBy='ORDER BY A.docDate DESC,A.docEntry DESC';
	if(array_key_exists('orderBy',$P) && $P['orderBy']==false){
		$ordBy='';
	}
	if($P['orderByDef']){ 
		$ordBy='ORDER BY '.$P['orderByDef'];
	}
	else if($P['orderBy']){
		switch($P['orderBy']){
			case 'docDateAsc' : $ordBy='ORDER BY A.docDate ASC, A.docEntry ASC'; break;
			case 'dateCAsc' : $ordBy='ORDER BY A.dateC ASC'; break;
			case 'dateCDesc' : $ordBy='ORDER BY A.dateC DESC'; break;
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
	if($P['__dfeNumber']){ $wh = 'AND A.dfeNumber=\''.$P['__dfeNumber'].'\' '; unset($P['__dfeNumber']); $omitFilt=true; }
	if($P['__docEntry']){ $wh = 'AND A.docEntry=\''.$P['__docEntry'].'\' '; unset($P['__docEntry']); $omitFilt=true; }
	if($P['__docNum']){ $wh = 'AND A.docNum=\''.$P['__docNum'].'\' '; unset($P['__docNum']); $omitFilt=true; }
	$whA =($P['whA'])?$P['whA']:'';;
	unset($P['fie'],$P['orderBy'],$P['orderByDef'],$P['__dbReportLen'],$P['fromA'],$P['whA'],$P['get_owh'],$P['owh']);
	_ADMS::_lb('sql/filter');
	/* v. 2020, control por slpId */
	if($P2['perms']=='slps'){ $wh .=a_ses::ousp('slps',array('tbA'=>'A')); }
	else{ $slps=self::bySlp($P2); }
	if(!is_array($slps)){ $slps=array(); }
	if(!$omitFilt){ $wh.=a_sql_filtByT($P).' '; }
	$wh .=$whA;
	//echo $wh;
	$q=a_sql::query('SELECT '.$fromA.' '.$slps['join'].' WHERE 1 '.$slps['wh'].' '.$wh.' '.$ordBy.' '.a_sql::nextLimit($limit),array(1=>'Error obteniendo listado de documentos: ',2=>'No se encontraron resultados.'));
	if(a_sql::$err &&$P2['err']){ print_r($q); }
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
static public function getOne($D=array(),$P2=array()){//iDoc
	$ori=' on[Doc::getOne()]';
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.'.$ori,'numeric>0')){  _err::err($js); return $js; }
	$isq=($D['r']=='query');
	$slps=self::bySlp($P2);
	$q=a_sql::fetch('SELECT '.$D['fromA'].' '.$slps['join'].' WHERE A.docEntry=\''.$D['docEntry'].'\' '.$wh.' '.$slps['wh'].' LIMIT 1',array(1=>'Error obteniendo documento: '.$ori,2=>'No se encontró el documento '.$D['docEntry'].'.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return a_sql::$errNoText; }
	else{ $Mx=$q;  }
	if($D['fromB']){ $Mx['L'];
		/*extends, añadir variables */
		if(is_array($D['_EXT'])){
			foreach($D['_EXT'] as $k => $v){ $Mx['_'.$k]=$v; }
		}
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


static public function copyy($P=array()){
	$ori=' on[Doc::copyy()]';
	if(_js::iseErr($P['docEntry'],'El docEntry debe estar definido.'.$ori,'numeric>0')){}
	else if(_js::iseErr($P['tbk'],'tbk debe estar definido.'.$ori)){}
	else{
		$q0=a_sql::fetch('SELECT * FROM '.$P['tbk'].' WHERE docEntry=\''.$P['docEntry'].'\' LIMIT 1 ',array(1=>'Error obteniendo documento de origen [o].'.$ori,2=>'El documento de origen no existe [o].'.$ori));
		if(_err::errIf(a_sql::$err,a_sql::$errNoText)){}
		else{ $qI=array();
			if($P['tbk1']){
				$q=a_sql::query('SELECT * FROM '.$P['tbk1'].' WHERE docEntry=\''.$P['docEntry'].'\' ',array(1=>'Error obteniendo lineas documento de origen [1].'.$ori));
				if(_err::errIf(a_sql::$err,a_sql::$errNoText)){}
				else if(a_sql::$errNo==-1){
					while($L=$q->fetch_assoc()){
						unset($L['id'],$L['docEntry']);
						$L[0]='i'; $L[1]=$P['tbk1'];
						$qI[]=$L;
					}
				}
			}
			if($P['tbk2']){
				$q=a_sql::query('SELECT * FROM '.$P['tbk2'].' WHERE docEntry=\''.$P['docEntry'].'\' ',array(1=>'Error obteniendo lineas documento de origen [2].'.$ori));
				if(_err::errIf(a_sql::$err,a_sql::$errNoText)){}
				else if(a_sql::$errNo==-1){
					while($L=$q->fetch_assoc()){
						unset($L['id'],$L['docEntry']);
						$L[0]='i'; $L[1]=$P['tbk2'];
						$qI[]=$L;
					}
				}
			}
			if(!_err::$err){
				unset($q0['docEntry'],$q0['docStatus'],$q0['canceled'],$q0['cancelDate'],$q0['lineMemo'],$q0['lineMemoIn']);
				$q0['selfDoc']='Y';
				if(is_array($P['io'])){ foreach($P['io'] as $k=>$v){ $q0[$k]=$v; } }
				
				if($q0['serieId']){
					_ADMS::lib('docSeries');
					$q0=docSeries::nextNum($q0,$q0);
				}
				$docEntry=a_sql::qInsert($q0,array('tbk'=>$P['tbk']));
				if(_err::errIf(a_sql::$err,'Error duplicando documento.'.$ori.' :'.a_sql::$errText,3)){}
				else if(count($qI)>0){
					a_sql::multiQuery($qI,0,array('docEntry'=>$docEntry));
					if(!_err::$err){ return array('docEntry'=>$docEntry); }
				}
			}
		}
	}
}
/* end new */

static public function status($P=array(),$P2=array()){
	//devuelve false i todo ok
	if($js=_js::ise($P['docEntry'],'Se debe definir el número de documento. Doc::status')){ return $js;}
	$A=self::getTb($P);;
		if($A['errNo']){ return _js::e($A); }
	$fie='docStatus';
	$invMov=(isset($A['invMov']));
	$fie .=($A['oFie'])?','.$A['oFie']:'';
	$fie .=($invMov)?',invMov':'';
	$fie .=($P2['fie'])? ','.$P2['fie']:'';
	if($P2['Fi'] && $P2['Fi']['f']){
		$fie .= ','.$P2['Fi']['f']; /* añade campos para revisión */
		unset($P2['Fi']['f']);
	}
	$whDoc=($P['docEntryAlias'])?$P['docEntryAlias']:'docEntry';
	$q=a_sql::fetch('SELECT '.$fie.' FROM '.$A['otb'].' WHERE '.$whDoc.'=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo estado el documento.',2=>'No se encontro el documento, no se obtuvo el estado.'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if($invMov==true && $q['invMov']=='Y'){ $js=_js::e(3,'Los movimientos de inventario ya fueron realizados para este documento.'); }
	else if($P2['isStatus'] && $q['docStatus']==$P2['isStatus']){ $js= _js::e(3,$P2['isStatus_text']); }
	else if($P['cancelOmit']!='Y' && ($q['docStatus']=='N' || $q['canceled']=='Y')){ $js=_js::e(3,'El documento se encuentra anulado y no se puede modificar.'); }
	else if($q['docStatus']=='C' && $P['closeOmit']!='Y'){ $js=_js::e(3,'El documento se encuentra cerrado y no se puede modificar.'); }
	else if($P['verify_open']=='Y' && $q['docStatus']=='O'){ $js=_js::e(3,'Documento abierto: No se puede modificar este documento.'); }
	else if($P2['Fi']){
		foreach($P2['Fi'] as $n => $L){
			$text=($L[2])?$L[2]:'Error revisando campo en estado.'; 
			if($q[$L[0]] && $q[$L[0]]==$L[1]){ $js= _js::e(3,$text); break; }
		}
	}
	else{ $js= false;
		if($P2['D']=='Y'){ self::$D=$q; }
	}
	return $js;
}
static public function getStatus($P=array(),$P2=array()){
	//devuelve false i todo ok
	$js=false;
	if($js=_js::ise($P['docEntry'],'Se debe definir el número de documento. Doc::status')){ return $js; }
	$fie='docStatus';
	$fie .=($P2['fie'])? ','.$P2['fie']:'';
	if($P2['Fi'] && $P2['Fi']['f']){
		$fie .= ','.$P2['Fi']['f']; /* añade campos para revisión */
		unset($P2['Fi']['f']);
	}
	$from=($P['tbk'])? _0s::$Tb[$P['tbk']]: $P['from']; $errs=0;
	$whDoc=($P['docEntryAlias'])?$P['docEntryAlias']:'docEntry';
	$q=a_sql::fetch('SELECT '.$fie.' FROM '.$from.' WHERE '.$whDoc.'=\''.$P['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo estado el documento.',2=>'No se encontro el documento, no se obtuvo el estado.'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if($invMov==true && $q['invMov']=='Y'){ $js=_js::e(3,'Los movimientos de inventario ya fueron realizados para este documento.'); }
	else if($P2['isStatus'] && $q['docStatus']==$P2['isStatus']){ $js= _js::e(3,$P2['isStatus_text']); }
	else if($q['docStatus']=='N' || $q['canceled']=='Y'){ $js=_js::e(3,'El documento se encuentra anulado y no se puede modificar.'); }
	else if($q['docStatus']=='C'){ $js=_js::e(3,'El documento se encuentra cerrado y no se puede modificar.'); }
	else if($P['verify_open']=='Y' && $q['docStatus']=='O'){ $js=_js::e(3,'Documento abierto: No se puede modificar este documento.'); }
	else{
		if($P2['Fi']){
			foreach($P2['Fi'] as $n => $L){
				$text=($L[2])?$L[2]:'Error revisando campo en estado.'; 
				if($q[$L[0]] && $q[$L[0]]==$L[1]){ $errs++; $js= _js::e(3,$text); break; }
			}
		}
	}
	if(!$js){ $js= false;
		if($P2['D']=='Y'){ self::$D=$q; }
	}
	return $js;
}

static public function g($P=array(),$P2=array()){
	if(!$P['owh']){ $P['owh']='N'; }
	return self::get($P,$P2);
}
static public function statusCancel($D=array(),$P=array()){
	$A=self::getTb($D); self::$ok=false; $js=false;
	if($A['errNo']){ return _js::e($A); }
	if($js=_js::ise($D['docEntry'],'ID de documento no definido.','numeric>0')){ return $js; }
	else if($js=_js::ise($D['lineMemo'],'Debe definir el motivo de anulación')){ return $js; }
	else if(!_js::textLimit($D['lineMemo'],100)){ return _js::e(3,'Los detalles no puede exceder los 100 caracteres.'); }
	else if($P['omitSel']!='Y' && $js=Doc::status(array('serieType'=>$D['serieType'],'docEntry'=>$D['docEntry'],'closeOmit'=>$D['closeOmit']),$P)){ return $js;}
		$u=a_sql::query('UPDATE '.$A['otb'].' SET docStatus=\'N\', canceled=\'Y\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error anulando documento ('.$D['serieType'].')'));
		if(a_sql::$err){ return a_sql::$errNoText; }
		else{
			if($u['aff_rows']>0){ self::log_post(array('serieType'=>$D['serieType'],'docEntry'=>$D['docEntry'],'lineMemo'=>$D['lineMemo'],'docStatus'=>'N')); }
			$js = _js::r('Documento anulado correctamente.');
			self::$ok=true;
		}
	return $js;
}
static public function statusClose($D=array()){
	self::$ok=false;
	if($js=_js::ise($D['docEntry'],'ID de documento no definido.','numeric>0')){ return $js; }
	else if($js=_js::ise($D['lineMemo'],'Debe definir el motivo de cierre.')){ return $js;}
	else if(!_js::textLimit($D['lineMemo'],100)){ return _js::e(3,'Los detalles no puede exceder los 100 caracteres.'); }
	else if($js=Doc::status(array('serieType'=>$D['serieType'],'docEntry'=>$D['docEntry']))){ return $js;}
	$A=self::getTb($D);
	if($A['errNo']){ return _js::e($A); }
	$defStatus=($D['reOpen']=='Y')?'O':'C';
	$updSet='SET docStatus=\''.$defStatus.'\'';
	if($defStatus=='C' && $A['daysToClose']=='Y'){
		$dateClose=date('Y-m-d');
		$updSet='SET docStatus=\'C\',dateClose=\''.$dateClose.'\' , daysToClose=DATEDIFF(\''.$dateClose.'\',docDate)';
	}
	$u=a_sql::query('UPDATE '.$A['otb'].' '.$updSet.' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',array(1=>'Error cerrando documento ('.$D['serieType'].')'));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{
		if($u['aff_rows']>0){ self::log_post(array('serieType'=>$D['serieType'],'docEntry'=>$D['docEntry'],'lineMemo'=>$D['lineMemo'],'docStatus'=>$defStatus)); }
		self::$ok=true;
		return _js::r('Documento cerrado correctamente.');
	}
}

static public function lineGet($D=array()){
	$ql=a_sql::query('SELECT '.$D['fromB'].' WHERE B.docEntry=\''.$D['docEntry'].'\' '.$D['whB'],array(1=>'Error obteniendo lineas del documento.',2=>'El documento no contiene lineas.'));
	if(a_sql::$err){ $js= json_decode(a_sql::$errNoText,1); }
	else if($D['r']=='query'){ return $ql; }
	else{ $Mx=array();
		while($L=$ql->fetch_assoc()){
			if(0 && a_ses::$userId==1){ 
				$Mx[]=$L['lineNum'].' || '.$L['itemId'].'-'.$L['itemSzId'].'----'.$L['itemCode'];
			}
			else{ $Mx[]=$L; }
		}
		$js=$Mx; unset($Mx);
	}
	return $js;
}
static public function reval_docTotal($D=array()){
	$R=self::calc_docTotal($D,array('A'=>'Y')); $A=$R['A']; 
	unset($R['A'],$R['docTotalList']);
	if(_err::$err){ return _err::$errText;}
	else{
		$ins=a_sql::insert($R,array('tbk'=>$A['otb'],'qDo'=>'update','wh_change'=>'WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1'));
			if($ins['err']){ _err::err('Error actualizando totales del documento.'); }
			else{ $js=false; }
	}
	return $js;
}

static public function docTotal($D=array(),$P=array()){
	/*req: docTotalLine, docTotalList, discPf, rate */
	if($P['discPf']){ $D['discPf']=$P['discPf']; }
	$discPf=(is_numeric($D['discPf']))?$D['discPf']/100:0;
	$brte=0.15;
	#$D['docTotalLine'] trae precio de lineas, sin discPF
	$docTotalLine=$D['docTotalLine']-$D['docTotalLine']*$discPf;
	$D['baseAmnt'] = $docTotalLine-$D['discSum'];;
	$D['discTotal'] = _0s::disc($D['baseAmnt'],$D['docTotalList']);
	$D['discSum']=$D['docTotalList']-$D['baseAmnt'];
	unset($D['docTotalList']);
	$D['docTotal']=$D['baseAmnt'];
	$D['docTotalME']=0;
	if(_0s::$currDefault!='$'){
		$D['docTotalME']=$D['docTotal']*$D['rate'];
	}
	
	return $D;
}
/*nuevos cal */
static public function calc_docTotal($D=array(),$P2=array()){
	/*Leer lineas y calcular doctotal  */
	$R=array('A'=>array(),/*eliminar siempre */
	'docTotalLine'=>0,'discPf'=>0,'discTotal'=>0,'discSum'=>0,'docTotalList'=>0,'baseAmnt'=>0,'docTotal'=>0,'docTotalME'=>0);
	if($js=Doc::status(array('serieType'=>$D['serieType'],'docEntry'=>$D['docEntry']))){ _err::err($js); return false; }
	$A=self::getTb($D);
	if($A['errNo']){ _err::err(_js::e($A)); return false; }
	else{
		$gb='A.curr,A.discPf,';
		$qs=a_sql::query('SELECT A.curr,A.discPf,B.price,B.quantity,B.priceList FROM '.$A['tb1'].' B 
		JOIN '.$A['otb'].' A ON (A.docEntry=B.docEntry) 
		WHERE A.docEntry=\''.$D['docEntry'].'\' ',array(1=>'Error obteniendo información del documento on Doc::reval_docTotal(): '));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); return array(); }
		else if(a_sql::$errNo==2){
			$R['discTotal']=$R['discSum']=$R['docTotalLine']=$R['docTotal']=0;
		}
		else{
			if($D['L']=='Y'){ $R['L']=array(); }
			while($L=$qs->fetch_assoc()){ 
				$Di=Doc::lineTotal($L,$L);
				if($D['L']=='Y'){ $R['L'][]=$Di; }
				$R['docTotalList']+=$Di['lineTotalList'];
				$R['docTotalLine']+=$Di['priceLine'];/* total sin desc pie factura*/
				$R['baseAmnt']+=$Di['lineTotal'];;
				$R['discPf']=$L['discPf'];
			}
			$R['discSum']=$R['docTotalList']-$R['baseAmnt'];
			$R['discTotal']=round(($R['discSum']/$R['docTotalList']*100),2);
			$taxAmnt=0;
			if($D['tax']){ /* consultar tabla de impuestos y otros costes */
				
			}
			$R['docTotal'] = $R['baseAmnt']+$taxAmnt;
			if($P2['A']=='Y'){ $R['A']=$A; }else{ unset ($R['A']); }
		}
	}
	return $R;
}
static public function lineTotal($D=array(),$A=array()){
	/*req: quantity,priceList,price, A--[discPf]
	calc: priceLine,lineTotal,lineTotalList, discSum,
 docTotalLine, docTotalList, discPf, rate 
	omite descuento, xk ya viene en el precio
	calcular desc linea y discPf 
	*/
	$trm=3100;
	if(!is_numeric($D['priceList']) || $D['priceList']==0){ $D['priceList']=$D['price']; }
	$discPf=(is_numeric($A['discPf']))?(1-($A['discPf']/100)):1; #0.20
	$lineTotalList=$D['priceList']*$D['quantity'];
	$D['priceLine']=$D['price']*$D['quantity'];
	$D['lineTotal']= $D['priceLine']*$discPf;
	$D['lineTotalList']=$lineTotalList;
	$D['discSum']=$D['lineTotalList']-$D['lineTotal'];
	//$D['disc']=($D['disc'])?$D['disc']:round(($D['discSum']/$D['lineTotalList']*100),2);
	if($A['curr'] && $A['curr'] !='$'){
		$D['priceME']=$D['price']; /* corregir esto, cuando funcione priceME */
		$lineTotalME=$D['priceME']*$D['quantity']*$trm;
		$D['discSum']=$D['lineTotalList']-$lineTotalME;
	}
	if($A['upds']){
		$D['._.priceLine']='price*quantity';
		$D['._.lineTotal']='priceLine*'.$discPf;
		$D['._.lineTotalList']='priceList*quantity';
		$D['._.discSum']='lineTotalList-lineTotal';
	}
	unset($D['discPf']); //borrar para evitar error
	return $D;
}
}

class Doc2{//enviado a iDocR
public $L=array();
public $revWhs='Y';
public $handInv=false;
public $uniLine=false;
public $ori=false;
function __construct($P=array(),$Doc=array()){
	$this->revWhs=($P['revWhs']!='N');
	$this->uniLine=($P['uniLine']=='Y');
	$this->saveL=($P['saveL']=='Y');
	$this->handInv=($P['handInv']=='Y');
	if($P['ori']){ $this->ori=$P['ori']; }
}

public function revItmLine($L=array(),$P=array()){
	$ln=$P['ln']; $js=false;
	$ori=($this->ori)?' on['.$this->ori.']':' on[Doc2::revItmLine()]';
	$revWhs=($this->revWhs && $L['handInv']=='Y');
	$hOpenQty=(array_key_exists('openQty',$P));
	if($this->handInv && $L['handInv']!='Y'){ $js=_js::e(3,$ln.'El articulo debe ser inventariable.'.$ori); }
	else if($js=_err::iff(($hOpenQty && $P['openQty']<=0),$ln.'No hay cantidades pendientes por recibir en la orden de compra.'.$ori)){}
	else if($hOpenQty && $js=_err::iff($L['quantity']>$P['openQty'],$ln.'La cantidad a recibir es mayor a la pendiente.'.$ori)){}
	else if($js=_js::ise($L['itemId'],$ln.'Se debe definir el ID del artículo.'.$ori,'numeric>0')){}
	else if($js=_js::ise($L['itemSzId'],$ln.'Se debe definir el ID de la talla del artículo.'.$ori,'numeric>0')){}
	else if($revWhs && $js=_js::ise($L['whsId'],$ln.'Se debe definir la bodega de ingreso.'.$ori,'numeric>0')){ }
	else if($js=_js::ise($L['price'],$ln.'Se debe definir el precio del artículo.'.$ori,'numeric>0')){ }
	else if($js=_js::ise($L['quantity'],$ln.'Se debe definir la cantidad.'.$ori,'numeric>0')){}
	else if($js=_js::ise($L['priceLine'],$ln.'El valor de la linea no ha sido definido correctamente.'.$ori,'numeric>0')){}
	else{
		if($this->saveL){
			$k=$P['k'];
			$this->L[$k]=$L;
		}
		else if($this->uniLine){
			$k=$P['k'];
			if(!array_key_exists($k,$this->L)){ $this->L[$k]=$L; }
			else{ $js=_js::e(3,$ln.'Ya existe una linea igual en el documento. Linea: '.$this->L[$k]['lineNum'].$ori); }
		}
	}
	return $js;
}
}

?>