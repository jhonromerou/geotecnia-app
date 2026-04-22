<?php
class docSeries{
static public function revi($P=array()){
	$ori=' on[docSeries::revi()]';
	if($js=_js::ise($P['serieId'],'Se debe definir el Id de la serie.'.$ori,'numeric>0')){ return $js; }
	return false;
}
static public function nextNum($P=array(),$RD=false){
	$num=0; $ori=' on[docSeries::nextNum()]';
	if($js=_js::ise($P['serieId'],'Se debe definir el Id de la serie.'.$ori,'numeric>0')){ _err::err($js); }
	else{
		$q=a_sql::fetch('SELECT nextNum FROM doc_oser WHERE serieId=\''.$P['serieId'].'\' LIMIT 1',array(1=>'Error obteniendo consecutivo de serie.',2=>'La serie no tiene definida información.'.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			if($q['nextNum']==0){ $num=1; }
			else{ $num=$q['nextNum']; }
			$q=a_sql::query('UPDATE doc_oser SET nextNum=nextNum+1 WHERE serieId=\''.$P['serieId'].'\' LIMIT 1',array(1=>'Error actualizando consecutivo de serie.'));
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
static public function form($P=array()){
	$num=0; $ori=' on[docSeries::form()]';
	if($js=_js::ise($P['serieId'],'Se debe definir el Id de la serie.'.$ori,'numeric>0')){ _err::err($js); }
	else{
		$q=a_sql::fetch('SELECT THs,TLs FROM doc_oser WHERE serieId=\''.$P['serieId'].'\' LIMIT 1',array(1=>'Error obteniendo consecutivo de serie.',2=>'La serie no tiene definida información.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		$P['THs']=$q['THs'];
		$P['TLs']=$q['TLs'];
		return $P;
	}
}
}

?>