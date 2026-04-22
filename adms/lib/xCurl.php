<?php
class xCurl {
static $errno=0; static $errno_text='';
static $err=false;
static $errText='';
static $txt='';
static $attachV='N';
static public function err($msg='',$c=3){
	self::$err=true;
	if($c=='msg'){ self::$errText=$msg; }
	else{ self::$errText=_js::e(3,$msg); }
}
static public function get($url='',$P=array()){
	$ch = curl_init();
	if($P['h']){
		curl_setopt($ch, CURLOPT_HTTPHEADER,$P['h']);
	}
	if($P['uid']){
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, $P['uid']);
	}
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
	curl_setopt($ch,CURLOPT_TIMEOUT, 20);
	$response = curl_exec($ch);
	curl_close ($ch);
	if($P['json']!='N'){ return json_decode($response,true); }
	else{ return $response; }
}
static public function put($url='',$Pos=array(),$P=array()){
	$P['_PUT']=1;
	return self::post($url,$Pos,$P);
}
static public function post($url='',$Pos=array(),$P=array()){
	/*revisar attachs */
	$ori=' on[xCurl::post()]';
	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // On dev server only!
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
	curl_setopt($ch,CURLOPT_TIMEOUT, 20);
	if($P['_PUT']){ curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT'); unset($P['_PUT']);
		$ori=' on[xCurl::put()]';
	}
	else{ curl_setopt($ch,CURLOPT_POST, 1); }
	$htp=true; //datos planos
	if($Pos['__JSON']){
		$htp=false;
		if(!is_array($P['h'])){ $P['h']=array(); }
		$P['h'][]='Content-Type: application/json;charset=utf-8';
		if($P['utf8Plain']){
			curl_setopt($ch,CURLOPT_POSTFIELDS,stripslashes(json_encode($Pos['__JSON'],JSON_UNESCAPED_UNICODE)));
		}
		else{ curl_setopt($ch,CURLOPT_POSTFIELDS,stripslashes(json_encode($Pos['__JSON']))); }
		unset($Pos['__JSON'],$P['utf8Plain']);
	}
	$files=(is_array($Pos) && $Pos['_Fi']);
	if($files){
		$k=($Pos['_Fi']['k'])?$Pos['_Fi']['k']:'Fi';
		unset($Pos['_Fi']['k']);
		$Pos=self::attachs($Pos);
		if(!array_key_exists('h',$P)){ $P['h']=array(); }
		$P['h'][]='Content-Type: multipart/form-data';
	}
	if($files){ curl_setopt($ch,CURLOPT_POSTFIELDS,($Pos)); }
	else if($htp){ curl_setopt($ch,CURLOPT_POSTFIELDS,http_build_query($Pos)); }
	if($P['h']){
		curl_setopt($ch, CURLOPT_HTTPHEADER,$P['h']);
	}
	if($P['uid']){
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, $P['uid']);
	}
	self::$txt = curl_exec($ch);
	if (self::$txt === false) {
		self::$errno = 1;
		self::$errno_text = 'Error 404 on '.$url.' on[xCurl::post]';
		return $R = [
			'err' => 1,
			'errNo' => 3,
			'text' => self::$errno_text,
			'txt' => self::$errno_text,
		];
	}
	if($P['r']=='txt'){ return self::$txt; }
	if($errno=curl_errno($ch)){
		$cInf=curl_getinfo($ch);
		self::$errno_text=curl_strerror($errno);
		$R=array('err'=>1,'errNo'=>3,'text'=>'curl_err ('.$errno.'):\n '.self::$errno_text);
		self::$errno=$errno;
		self::err($R['text']);
	}
	else{
		if(self::$txt=='null'){
			$txt='Resultado no puede ser procesado: '.self::$txt.$ori;
			self::err($txt);
			return array('err'=>1,'errNo'=>3,'text'=>$txt,'txt'=>self::$txt);
		}
		$R=json_decode(self::$txt,true);
		if(!is_array($R)){
			$txt='No se obtuvo un JSON correcto: '.self::$txt.$ori;
			self::err($txt);
			$R= array('err'=>1,'errNo'=>3,'text'=>$txt,'txt'=>self::$txt);
		}
		else if($R['errNo']){
			self::err($R['text']);
		}
	}
	curl_close ($ch);
	return $R;
}

static public function attachs($Fi=array()){
	if(self::$attachV=='v3'){ return self::attachsv3($Fi); }
	if(is_array($Fi['_Fi'])){
		foreach($Fi['_Fi']['name'] as $n => $xs){
			//$FI['tmp_name'],$FI['type'],$FI['name']
			//$Fi['file[]']=curl_file_create($filex,@mime_content_type($filex),($filex));
			$kna='file['.$n.']';//enviar archivo con nombre, file_jsData
			if($Fi['_Fi']['_xfname'] && $Fi['_Fi']['_xfname'][$n]){
				$kna=$Fi['_Fi']['_xfname'][$n].'['.$n.']';
			}
			$Fi[$kna]=curl_file_create($Fi['_Fi']['tmp_name'][$n],$Fi['_Fi']['type'][$n],$Fi['_Fi']['name'][$n]);
		}
	}
	unset($Fi['_Fi']);
	return $Fi;
}
static public function attachsv3($Fi=array()){
	if(is_array($Fi['_Fi'])){
		foreach($Fi['_Fi'] as $n => $xs){ //tmp_name,type,name
			$kna='file['.$n.']';//enviar archivo con nombre, file_jsData
			if($xs['_xfname'] && $xs['_xfname']){
				$kna=$xs['_xfname'].'['.$n.']';
			}
			$Fi[$kna]=curl_file_create($xs['tmp_name'],$xs['type'],$xs['name']);
		}
	}
	unset($Fi['_Fi']);
	return $Fi;
}
}
?>
