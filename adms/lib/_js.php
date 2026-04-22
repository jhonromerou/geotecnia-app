<?php
class _js{
static $dieResp = 'php'; //json
static $mdlOn=false;
static $errOrigin='';
static public function o($ori=false){
	self::$errOrigin=$ori;
}
static public function encode($js=''){
	//c::getMemory('end');
	$js = json_encode($js,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
	$txt=self::handErr();
	if($txt!=false){ return $txt; }
	return $js;
}
static public function decode($js=''){
	$js = json_decode($js,1);
	$txt=self::handErr();
	if($txt!=false){ return $txt; }
	return $js;
}
static public function handErr(){
	$txt=false;
	switch(json_last_error()){
		case JSON_ERROR_NONE: break;
		case JSON_ERROR_DEPTH: $txt='JSON error: Depth excedida'; break;
		case JSON_ERROR_STATE_MISMATCH: $txt='JSON error: Desbordamiento de buffer o los modos no coinciden'; break;
		case JSON_ERROR_CTRL_CHAR: $txt='JSON error: Encontrado carácter de control no esperado'; break;
		case JSON_ERROR_SYNTAX: $txt='JSON error: Error de sintaxis, JSON mal formado'; break;
		case JSON_ERROR_UTF8: $txt='JSON error: Caracteres UTF-8 malformados, posiblemente codificados de forma incorrecta'; break;
		default: $txt='JSON error: Error desconocido'; break;
	}
	if($txt){ return '{"errNo":3, "text":"'.$txt.'"}'; }
	else{ return false; }
}
static public function iseErr($t='',$errT='',$f=false){
	if($js=self::ise($t,$errT,$f)){ _err::err($js); return true; }
	return false;
}
static public function ise($t='',$errT='',$f=false,$jsAdd=''){
	$flags = $f;
	$r = false;
	if($t=='undefined' || $t=='null' || $t==''){ $r= true; }
	else if($f!=''){
		if(preg_match('/^\//',$f) && !preg_match($f,$t)){ $r=true; }
		else if($f=='array' && !is_array($t)){ $r=true; }
		else{
			$flags = ($f)?explode('|',$f):array();
			$l = count($flags);
			if($l>0){
				$F=array();
				foreach($flags as $k => $v){ $F[$v] =$v; }
				//calls _2d on scripts
				if($F['numeric>0'] && (!is_numeric($t) || $t<=0)){ $r= true; }
				else if($F['numeric>=0'] && (!is_numeric($t) || $t<0)){ $r= true; }
				else if($F['numeric'] && !is_numeric($t)){ $r= true; }
				else if($F['hour'] && !_2d::verif($t,'hour')){ $r=true; }
				else if($F['>today'] && $t>date('Y-m-d')){ $r=true; }
				else if($F['Y-m-d'] && !_2d::verif($t,'Y-m-d')){ $r=true; }
				unset($F);
			}
		}
	}
	else{ $r = false; }
	if($r && $errT){
		if(is_array($errT)){ return self::e($errT[0],$errT[1],$jsAdd); }
		else{ return self::e(3,$errT,$jsAdd); }
	}
	return $r;
}
static public function push($o1=array(),$o2=array()){
	if(is_array($o2)){ foreach($o2 as $k => $v){ $o1[$k] = $v; } }
	return $o1;
}
static public function maxLen($t,$limit=255,$err=''){/*new */
	if($limit===false || !$limit){ $limit=255; }
	$len = strlen($t);
	$er=($len>$limit);
	$errText=$err.' No puede ser exceder los '.$limit.' caracteres.';
	if($er){
		if($err!=''){ return _err::err($errText,3); }
		else{ return $errText; }
	}
	return false;
}
static public function textMax($t,$limit=255,$err=false){
	$err=$err.' El texto no puede ser mayor a '.$limit.' caracteres.';
	return self::textLen($t,$limit,$err);
}
static public function textLen($t,$limit=255,$err=false){/*new */
	if($limit===false || !$limit){ $limit=255; }
	$len = strlen($t);
	$er=($len>$limit);
	if($er){
		if(is_array($err)){
			if(!array_key_exists('errNo',$err)){ $err['errNo']=3; }
			return _js::e($err);
		}
		else if($err){ return _js::e(3,$err); }
		else{ return true; }
	}
	return false;
}
static public function textLimit($t='',$limit=255,$text=false){
	$len = strlen($t);
	if($limit===false){ $limit=255; }
	if($len<=$limit){ return true; }
	else{
		if($text){ return _js::e(3,$text); }
		return false;
	}
}
static public function e($code='',$text='',$addObj=''){
	//c::getMemory('end');
	$mldOn=(_js::$mdlOn)?',"mdlOn":"'._js::$mdlOn.'"':'';
	_js::$mdlOn=false;
	if(is_array($code)){ $text = $code['text']; $code = $code['errNo']; }
	if(is_array($addObj)){ $P = $addObj; $addObj = ''; }
	$aler=(preg_match('/^[0-9]+\_a/',$code))?'"alert":"Y",':'';
	$addObj = ($addObj!='')?$aler.$addObj.',':$aler.$addObj;
	$js= '"errNo":'.$code.'';
	if($code === 1){ $js .= ',"error_sql":true, "title":"Error en Base de Datos", '.$addObj.' "text":"'.a_sql::JSONText(($text)).'"'; }
	else if($code === 2){ $js .= ', "error":true,'.$mldOn.' "title":"Sin resultados", '.$addObj.' "text":"'.$text.'", "rows":0, "_pnext":"'.a_sql::$lastPage.'"'; }
	else if($code === 3){ $js .= ', "error":true,'.$mldOn.' "title":"Error General", '.$addObj.' "text":"'.$text.'"'; }
	else if($code === 4){ $js .= ', "error_auth":true,'.$mldOn.' "title":"Error de Autorización", '.$addObj.' "text":"'.$text.'"'; }
	else{ $js .= ', "error":true, '.$mldOn.' "errNo2":"'.$code.'", "title":"'.$t.'", '.$addObj.' "text":"'.$text.'"'; }
	if(self::$errOrigin){ $js .= ', "Msg":[{"tag":"errOrigin","text":"'.self::$errOrigin.'"}]'; }
	return '{'.$js.'}';
}
static public function r($text='',$add=''){
	//c::getMemory('end');
	if(is_array($add)){ $add='"_o":'.json_encode($add); }
	$add = ($add!='')
	? '"limitDef":"'.a_sql::$limitDef.'",'.$add
	:'"limitDef":"'.a_sql::$limitDef.'"';
	$mldOn=(_js::$mdlOn)?' ,"mdlOn":"'._js::$mdlOn.'"':'';
	_js::$mdlOn=false;
	if(is_array($text)){ $text = $text['text']; }
	if(is_array($add) && $add['n']){ $njs = $add['n'];
		$Ls = '';
		if(is_array($njs)){
			foreach($njs as $n => $L){
			$rid = self::$ocardSocId.'_'.$L['userRoom']*1;
			$Ls .= '{"rid":"'.$rid.'","objType":"'.$L['objType'].'", "objRef":"'.$L['objRef'].'", "lineMemo":"'.$L['lineMemo'].'"},';
		}
		$anode = ',"__toNode":['.substr($Ls,0,-1).']';
		}
	}
	$adds = (is_string($add) && $add != '') ? ','.$add : '';
	if(is_array($add) && array_key_exists('add',$add) && $add['add'] != ''){
		$adds = ','.$add['add'];
	}
	$adds .= ($adds != '' && $anode != '') ? $anode : $anode;
	$js = '{"ok":true'.$mldOn.', "text":"'.$text.'" '.$adds.'}';
	return $js;

}
static public function enc2($js=array(),$P=array()){
	//c::getMemory('end');
	return self::encode($js);
}
static public function enc($js=array(),$P=array()){
	if(!is_array($P)){ $P=array(); }
	if($P=='NO_PAGER' || $P=='just'){}
	else{
		$js['__limitDef'] = a_sql::$limitDef;
		$js['__lastPage'] = a_sql::$lastPage*1;
		$js['__rows'] =  a_sql::$numRows*1;
		if(a_sql::$limitDef=='N' || $js['__rows']<a_sql::$limitDef){ $js['__nextPager'] = 'N';  }
		else if($js['__rows']==a_sql::$limitDef || $P['lastPage']>0){ $js['__nextPager'] = 'Y';  }
		//en nextLimit, añado 1
		//if(($P['rows']+1)>a_sql::$limitDef && a_sql::$limitDef>0){ $js['__nextPager'] = 'Y';  }
		foreach($P as $k=>$v){ $js['__'.$k] = $v; }
	}
	return self::encode($js);
}
static public function dec($js=array()){
	return self::decode($js);
}
static public function numRang($num=0,$min=0,$max=0){
	if($num>=$min && $num<=$max){ return true; }
	else{ return false; }
}

static public function isArray($D=array(),$txt=false,$minLen=1){
	$r=false;
	if(!is_array($D)){ $r= true; }
	else if(count($D)<$minLen){ $r= true; }
	if($r==true && $txt){ _err::err($txt,3); }
	return $r;
}
static public function numAlet($longitud=4,$type=false) {
	$key = '';
	$letras='abcdefghijklmnopqrstuvwxyz';
	switch($type){
		case '1z' : $pattern = '1234567890'.$letras; break;
		case '1Z' : $pattern = '1234567890'.$letras.strtoupper($letras); break;
		case 'az' : $pattern = $letras; break;
		case 'aZ' : $pattern = $letras.strtoupper($letras); break;
		default  : $pattern = '1234567890'; break;
	}
	$max = strlen($pattern)-1;
	for($i=0;$i < $longitud;$i++){ 
		$key .= $pattern[mt_rand(0,$max)];
	}
	return $key;
}

static public function money($num=0){
	return '$ '.number_format($num*1);
}
}
?>
