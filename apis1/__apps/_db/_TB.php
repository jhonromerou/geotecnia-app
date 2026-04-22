<?php
class _TB{
static $F=array();
static public function fNoExis($tbk){
	$ori=' on[_TB::$F[tbk]]';
	if(!array_key_exists($tbk,_TB::$F)){
		return _err::err($tbk.' no definido.'.$ori,3);
	}
}
static public function queryL($tbk='',$fies='',$P=array()){
	$ori=' on[_TB::queryL[tbk]]';
	if($js=self::fNoExis($tbk)){ return $js; }
	$fid=_TB::$F[$tbk]['fid'];
	if($js=_js::ise($fid,'fid no definido.'.$ori)){ return _err::err($js); }
	$fies=$fid.','.$fies;
	$err1=($P[1])?$P[1]:'Error realizando la consulta: '.$ori;
	$err2=($P[2])?$P[2]:'No se encontraron registros.'.$ori;
	unset(_TB::$F[$tbk]['fid'],$P[1],$P[2]);
	$Lx=array('F'=>array(),'L'=>array());
	$wh='';
	if($P['wh']){
		_ADMS::_lb('sql/filter'); $wh=a_sql_filtByT($P['wh']);
	}
	$ordBy=($P['ordBy'])?'ORDER BY '.$P['ordBy']:'';
	$q='SELECT '.$fies.' FROM '.$tbk.' WHERE 1 '.$wh.' '.$ordBy.' '.a_sql::nextLimit();
	$q=a_sql::query($q,array(1=>$err1,2=>$err2));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if(a_sql::$errNo==-1){
		$n=0;
		while($L=$q->fetch_assoc()){
			if($n==0) foreach($L as $kF=>$V){
				$Lx['F']['_o'][]=$kF;
				$Lx['F'][$kF]=(array_key_exists($kF,_TB::$F[$tbk]))?_TB::$F[$tbk][$kF]:array();
			} $n=1;
			$Lx['L'][]=$L;
		}
	}
	if($P['enc']!='N'){ $Lx=_js::enc2($Lx); }
	return $Lx;
}
static public function revF($tbk='',$D=array(),$P=array()){
	$ori=' on[_TB::revF[tbk]]';
	if($js=self::fNoExis($tbk)){ return $js; }
	$rows=(is_array($D['L']))?count($D['L']):0;
	$maxR=10;
	if($rows===0){ return _err::err('No se recibieron actualizaciones.'.$ori,3); }
	if($rows>$maxR){ return _err::err('Cantidad máxima de lineas a actualizar no puede ser mayor a '.$maxR.',  r:'.$rows.$ori,3); }
	if(!array_key_exists($tbk,_TB::$F)){
		return _err::err($tbk.' no definido.'.$ori,3);
	}
	$errs=0;
	$fid=(_TB::$F[$tbk]['fid'])?_TB::$F[$tbk]['fid']:'id';
	unset(_TB::$F[$tbk]['fid']);
	/*Revisar campos */
	$ln=0;
	foreach($D['L'] as $n =>$L){
		$ln++;
		foreach($L as $kF => $VX){
			$RE=_TB::$F[$tbk][$kF];
			$v=$L[$kF].'';
			$lnt='Linea #'.$ln.', Campo '.$kF.' ('.$RE['t'].'): ';
			if($RE['disabled']){ $js=_js::e(3,$lnt.'Campo no puede ser modificado.'); $errs++; break; }
			if($RE['req']=='Y'){ if(_js::ise($v,'-')){
				$js=_js::e(3,$lnt.'Debe estar definido. ::'.$v);
				$errs++; break;
			}}
			if($RE['maxlength'] && strlen($v)>$RE['maxlength']){ $js=_js::e(3,$lnt.'No puede ser mayor a '.$RE['maxlength'].' caracteres.'); }
			else if($RE['type']=='number' && $js=_js::ise($v,$lnt.'Debe ser un número.','numeric')){}
			else if($RE['type']=='number' && $RE['min']===0 && $js=_js::ise($v,$lnt.'Debe ser un número mayor a 0.','numeric>0')){}
			if($js){ $errs++; break; }
			
		}
	}
	/*actualizar tabla */
	if($errs){ return _err::err($js); }
	else{
		$ln=1;
		foreach($D['L'] as $n =>$L){
			$lnt='Linea '.$ln.': '; $ln++;
			$whC= 'WHERE '.$fid.'=\''.$L[$fid].'\' LIMIT 1';
			unset($L['delete'],$L[$fid]);
			$ins=a_sql::insert($L,array('table'=>$tbk,'qDo'=>'update','wh_change'=>$whC));
			if($ins['err']){ $js=_err::err($lnt.'Error actualizando información: '.$ins['text'],3);  $errs++; break; }
		}
	}
	if($errs==0 && $P['ok']){
		$js=_js::r($P['ok']);
	}
	return $js;
}
}

?>