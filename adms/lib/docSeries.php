<?php
class docSeries{
static public function revi($P=array()){
	$ori= ' on[docSeries::revi()]';
	if(_js::iseErr($P['serieId'],'Se debe definir el Id de la serie.'.$ori,'numeric>0')){ return _err::$errText; }
	return false;
}
static public function nextNum($P=array(),$RD=false){
	$num=0; $ori= ' on[docSeries::nextNum()]';
	if($js=_js::ise($P['serieId'],'Se debe definir el Id de la serie.','numeric>0')){ _err::err($js); }
	else{
		$q=a_sql::fetch('SELECT nextNum,numAuto FROM doc_oser WHERE serieId=\''.$P['serieId'].'\' LIMIT 1',array(1=>'Error obteniendo consecutivo de serie.'.$ori,2=>'La serie no tiene definida información.'.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($q['numAuto']=='N' && $js=_js::ise($RD['docNum'],'El tipo de serie requiere que se defina un número para el documento.'.$ori,'numeric>0')){ _err::err($js); }
		else{
			if($q['nextNum']==0){ $num=1; }
			else{ $num=$q['nextNum']; }
			if($q['numAuto']=='N'){ $num=$RD['docNum']; }
			$q=a_sql::query('UPDATE doc_oser SET nextNum='.$num.'+1 WHERE serieId=\''.$P['serieId'].'\' LIMIT 1',array(1=>'Error actualizando consecutivo de serie.'.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		}
	}
	if(is_array($RD)){
		$RD['serieId']=$P['serieId'];
		$RD['docNum']=$num;
		return $RD;
	}
	return array('docNum'=>$num);
}
static public function form($D=array()){
	$num=0;
	if($js=_js::ise($D['serieId'],'Se debe definir el Id de la serie.','numeric>0')){ _err::err($js); }
	else{
		$q=a_sql::fetch('SELECT noteFix FROM doc_oser WHERE serieId=\''.$D['serieId'].'\' LIMIT 1',array(1=>'Error obteniendo consecutivo de serie.',2=>'La serie no tiene definida información.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		$D['doc_noteFix']=$q['noteFix'];
		return $D;
	}
}
}

?>