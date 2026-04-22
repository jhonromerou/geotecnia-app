<?php
$a_sql_tooken_try = 0;
function a_sql_tooken($PARS=array()){
	#a_sql_tooken(array('len'=>'0-20','table'=>,'fieldTook'=>'postCode'));
	$tryLimits = 10;
	$letras = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
	$letras .= ',0,1,2,3,4,5,6,7,8,9,'.strtoupper($letras); #65 car
	$codes = explode(",",$letras);
	$fieldTook = ($PARS['fieldTook'] != '') ? $PARS['fieldTook'] : 'tooken';
	$tokens = '';
	$token = '';
	$nIni = 1;
	$nLen = ($PARS['len']) ? $PARS['len'] : 4;
	#entre x y z
	if($PARS['len'] != '' && !is_numeric($PARS['len'])){
		$sp = explode('-',$PARS['len']);
		$nIni =($sp[0]>0) ? $sp[0] : 1;
		$nLenMax = ($sp[1]>1) ? $sp[1] : 4;
		$nLen = mt_rand(1,$nLenMax);
	}
	foreach($codes as $k => $v){ $tokens[] = $v; }
	$t_len = (count($tokens)-1);
	$t = $tokens;
	for($n=$nIni; $n<=$nLen; $n++){
		$r_n = mt_rand(0,$t_len);
		$token .= $t[$r_n];
	}
	if($PARS['table']){
		$exist_q = a_sql::query('SELECT '.$fieldTook.' FROM '.$PARS['table'].' WHERE '.$fieldTook.'= BINARY \''.$token.'\' LIMIT 1');
		if(a_sql::$errNo == 1){ return array('errNo'=>1,'text'=>'Tooken: '.$exist_q['error_sql']); }
		else if($exist_q->num_rows >0){
			if($a_sql_tooken_try >$tryLimits){
				$code = array('errNo'=>2,'text'=>'Se intentó crea un código único '.$a_sql_tooken_try.' veces en '.$PARS['table'].'.');
				return $code;
			}
			else{ $a_sql_tooken_try++; 
				return a_sql_tooken($PARS);
			}
		}
		else { return $token; }
	}
	return $token;
}
?>