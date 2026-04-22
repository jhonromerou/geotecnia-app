<?php
class gfpMov{
static public function get($P){
 $ordBy=($P['ordBy']=='docDateASC')?'M.docDate ASC,M.mid ASC':'M.docDate DESC,M.mid DESC';
	unset($P['ordBy']);
	$wh='1';
	$jFie=''; $jLeft='';
	if($P['pid']>0){
		$jLeft='JOIN gfp_ctc1 C1 ON (M.docDate>=C1.openDate AND M.docDate<=C1.closeDate)';
		$wh .=' AND C1.pid=\''.$P['pid'].'\'';
	}
	unset($P['pid']);
	return a_sql::queryL('SELECT W.wallType,M.* 
	FROM gfp_omov M 
	JOIN gfp_owal W ON (W.wallId=M.wallId) '.$jLeft.'
	WHERE '.$wh.' '.a_sql_filtByT($P).' ORDER BY '.$ordBy.' '.a_sql::nextLimit(30));
}
static public function post($P=array()){
 	$qI=array();
 	a_sql::transaction(); $cmt=false;
 	foreach($P['L'] as $n =>$_J){
 		$isBol=($_J['wbId']>0);
 		$wbId=$_J['wbId']; $bal=$_J['bal'];
 		unset($_J['bal']);
 		if(!$isBol && _js::iseErr($_J['wallId'],'Se debe definir la billetera.','numeric>0')){ break; }
 		if($isBol && _js::iseErr($wbId,'Se debe definir el bolsillo.','numeric>0')){ break; }
 		else if(_js::iseErr($_J['mType'],'Se debe el tipo.')){ break; }
 		else if(_js::iseErr($_J['docDate'],'Se debe definir la fecha del movimiento')){ break; }
 		else if(_js::iseErr($bal,'Se debe definir valor de la transacción','numeric>0')){ break; }
 		else if(_js::iseErr($_J['categId'],'Se debe definir la categoria.')){ break; }
 		else{
 			$_J['debBal']=$_J['creBal']=0;
 			if($_J['mType']=='I' || $_J['mType']=='IS'){ $_J['debBal']=$bal; }
 			else{ $_J['creBal']=$bal; }
 			$_J['dateC']=date('Y-m-d H:i:s');
 			if($isBol){/* actualizar si es bolsillo */
 				$_J['movInterno']='N';
 				/* solo afectar cuenta si es ingreso o gasto */
 				if($_J['movInterno']=='N'){
 					$qW=a_sql::fetch('SELECT A.wallId
 					FROM gfp_obol B
 					LEFT JOIN gfp_owal A ON (A.wallId=B.wallId)
 					WHERE B.wbId=\''.$_J['wbId'].'\' LIMIT 1 ',array(1=>'Error revisando cuenta del bolsillo.',2=>'El bolsillo no existe.'));
 					if(a_sql::$err){ _err::err(a_sql::$errNoText); break; }
 					$_J['wallId']=$qW['wallId'];
 				}
 				gfpWal::putBal(array('qSet'=>'amount=amount+'.$_J['debBal'].'-'.$_J['creBal']),$_J);
 				if(_err::$err){ break; }
 			}
 			else{ gfpWal::putBal(array('qSet'=>'amount=amount+'.$_J['debBal'].'-'.$_J['creBal']),$_J); }
 			if(_err::$err){ break; }
 			$_J[0]='i'; $_J[1]='gfp_omov';
 			$qI[]=$_J;
 		}
 	}
 	if(!_err::$err){ a_sql::multiQuery($qI); }
  if(_err::$err){ return _err::$errText; }
 	else{ a_sql::transaction(true);
   return _js::r('Movimientos registrados correctamente');
 	}
 }
static public function delete($P){
 if($js=_js::ise($P['mid'],'Id de transación debe estar definido','numeric>0')){ return $js; }
	else{
		a_sql::transaction(); $cmt=false;
		$Da=a_sql::fetch('SELECT wallId,wbId,debBal,creBal FROM gfp_omov WHERE mid=\''.$P['mid'].'\'',array(1=>'Error obteniendo transación a eliminar.',2=>'La transación no existe o ya fue eliminada.'));
		if(a_sql::$err){ return a_sql::$errNoText; }
		$De=a_sql::query('DELETE FROM gfp_omov WHERE mid=\''.$P['mid'].'\'',array(1=>'Error eliminando transación'));
		if(a_sql::$err){ return a_sql::$errNoText; }
		gfpWal::putBal(array('qSet'=>'amount=amount-'.$Da['debBal'].'+'.$Da['creBal']),$Da);
		if(_err::$err){ return _err::$errText; }
		else{
			$js=_js::r('Movimiento eliminado correctamente.');
			a_sql::transaction(true);
		}
	}
	return $js;
}

static public function putOne($P){
 	$isBal=array_key_exists('bal',$P);
	$edit=(true); unset($P['edit']);
	if(_js::iseErr($P['mid'],'Id de transación debe estar definido','numeric>0')){}
	else if($isBal && _js::iseErr($P['bal'],'El valor debe ser mayor a 0.','numeric>0')){}
	else if($edit && _js::iseErr($P['docDate'],'Se debe definir la fecha del movimiento')){ }
 	else if($edit && _js::iseErr($P['categId'],'Se debe definir la categoria.')){}
	else{
		a_sql::transaction(); $cmt=false;
		$mid=$P['mid']; unset($P['mid']);
		$Da=a_sql::fetch('SELECT wallId,wbId,debBal,creBal FROM gfp_omov WHERE mid=\''.$mid.'\' LIMIT 1',array(1=>'Error obteniendo transación a modificar.',2=>'La transación no existe.'));
		if(a_sql::$err){ return a_sql::$errNoText; }
		$Di=array();
		if($isBal){
			if($Da['creBal']>0){ $bal=$Da['creBal']-$P['bal']; $P['creBal']=$P['bal']; }
			else if($Da['debBal']>0){ $bal=$P['bal']-$Da['debBal']; $P['debBal']=$P['bal'];}
			$Di['qSet']='amount=amount+'.$bal;
		}
		//die(print_r($P));
		unset($P['bal'],$P['wallId'],$P['mType']);
		a_sql::oneMulti($P,array('tbk'=>'gfp_omov','qDo'=>'update','wh_change'=>'mid=\''.$mid.'\' LIMIT 1'));
		if(a_sql::$err){ return _js::e(3,a_sql::$errText); }
		gfpWal::putBal($Di,$Da);
		if(_err::$err){ return (_err::$errText); }
		else{
			$js=_js::r('Movimiento modificado correctamente.');
			a_sql::transaction(true);
		}
	}
 if(_err::$errText){ return _err::$errText; }
	return $js;
}
static public function putOneField($P){//acctualizar campo cualquiera
 if(_js::iseErr($P['mid'],'Id de transación debe estar definido','numeric>0')){}
 else{
	 a_sql::transaction(); $cmt=false;
	 $mid=$P['mid']; unset($P['mid']);
	 $Da=a_sql::fetch('SELECT wallId,wbId,debBal,creBal FROM gfp_omov WHERE mid=\''.$mid.'\' LIMIT 1',array(1=>'Error obteniendo transación a modificar.',2=>'La transación no existe.'));
	 if(a_sql::$err){ return a_sql::$errNoText; }
	 //die(print_r($P));
	 unset($P['credBal'],$P['debBal'],$P['bal'],$P['wallId'],$P['mType']);
	 a_sql::oneMulti($P,array('tbk'=>'gfp_omov','qDo'=>'update','wh_change'=>'mid=\''.$mid.'\' LIMIT 1'));
	 if(a_sql::$err){ return _js::e(3,a_sql::$errText); }
	 if(_err::$err){ return (_err::$errText); }
	 else{
		 $js=_js::r('Movimiento modificado correctamente.');
		 a_sql::transaction(true);
	 }
 }
if(_err::$errText){ return _err::$errText; }
 return $js;
}

static public function quotesGet($P){
	 $M=[];
	 $M['L']=a_sql::fetchL('SELECT W.wallId,W.wallType,
	 IF(M.creBal>0,M.creBal,M.debBal) bal,M.docDate,M.credType,M.categId,M.credCuotas,M.lineMemo,M1.*
	 FROM gfp_omov M 
	 JOIN gfp_owal W ON (W.wallId=M.wallId)
	 LEFT JOIN gfp_mov1 M1 ON (M1.mid=M.mid)
	 WHERE M.mid=\''.$P['mid'].'\' ORDER BY M1.lineNum ASC LIMIT 240');
	 $M['Lc']=a_sql::fetchL('SELECT C1.pid k, concat(C1.openDate,\' a \',C1.closeDate) v
	 FROM gfp_ctc2 C2 
	 JOIN gfp_ctc1 C1 ON (C2.cId=C1.cId AND C1.openDate<=\''.date('Y-m-d').'\')
	 WHERE C2.wallId=\''.$M['L'][0]['wallId'].'\' ORDER BY C1.closeDate DESC LIMIT 24');
	 return _js::enc2($M);
 }
static public function quotesPut($P){
 if(_js::iseErr($P['mid'],'Id de transación debe estar definido','numeric>0')){}
 else{
	foreach($P['L'] as $n=>$L){
		$P['L'][$n][0]='i';
		$P['L'][$n]['_unik']='id';
		$P['L'][$n][1]='gfp_mov1';
		$P['L'][$n]['mid']=$P['mid'];
		if(_js::iseErr($L['lineNum'],'Debe definir el numero de la cuota','numeric>0')){ break; }
		//else if(_js::iseErr($L['lineDate'],'Debe definir la fecha')){ break; }
	}
 }
 if(!_err::$err){
	 a_sql::transaction(); $c=false;
	 a_sql::multiQuery($P['L']);
	 if(!_err::$err){
		 $js=_js::r('Información guardada correctamente'); $c=true;
	 }
	 a_sql::transaction($c);
 }
 _err::errdie();
 return $js;
}
}
?>
