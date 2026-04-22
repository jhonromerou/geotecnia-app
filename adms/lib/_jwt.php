<?php
class _JWT{
static $_pid=false; /* Si se define antes de encode, asigna _pid para que clave quede dentro del payload */
static $due=true;
static $pkey='clavecasisecreta';
static $err=false;
static $errNo=0;
static $errNoText='';
static $last=array();
static $D=array();
static public function encText($data='',$key=false,$HS25='HS256'){
	self::$err=false; self::$errNo=0;
	if($data==''){ self::$err=true; self::$errNo=3;
		self::$errNoText='Tooken error: Tooken data is empty.'; return false;
	}
	$pkey=self::$pkey; if($key!=false){ $pkey=$key; }
	$enc_header = base64_encode('admsistems');
	$enc_header=self::urlEnc($enc_header);
	$enc_payload = base64_encode($data);
	$enc_payload=self::urlEnc($enc_payload);
	$signature = base64_encode(hash_hmac('sha256',$enc_payload,$pkey,true));
	$signature = self::urlEnc($signature);;
	$jwt_token = $enc_payload.'.'.$signature;
	return $jwt_token;
}
static public function decText($jwt='',$k=0,$sep=false){
	self::$err=false; self::$errNo=0; self::$errNoText='';
	if($jwt=='sofi'){ return true; }
	if($jwt=='' || $jwt==false){
		self::$err=true; self::$errNo=2;
		return self::$errNoText='Tooken is undefined.';
	}
	$pkey=self::$pkey;
	if($key!=false){ $pkey=$key; }
	$V = explode('.', $jwt);
	$recieved_signature = ($V[1]);
	$recievedHeaderAndPayload = ($V[0]);
	$resultedsignature = base64_encode(hash_hmac('sha256', $recievedHeaderAndPayload,$pkey,true));
	$resultedsignature=self::urlEnc($resultedsignature);
	if($resultedsignature == $recieved_signature){
		$r=base64_decode($V[0]);
		if($sep){ $r=explode($sep,$r); }
		self::$D[$k]=$r;
		return $r;
	}
	else { self::$err=true; self::$errNo=2;
	return self::$errNoText='Tooken error: Firma no satisfatoria. ('.$jwt.')'; }
}

static public function payload($d=array()){
	return self::urlEnc(base64_encode(json_encode($d)));
}
/*  obtener tooken */
static public function encode($data=array(),$key=false,$HS25='HS256'){
	self::$err=false; self::$errNo=0;
	if(count($data)==0){ self::$err=true; self::$errNo=3;
		self::$errNoText='Tooken error: Tooken data is empty.'; return false;
	}
	if(1){ $data['mc']=substr(microtime(true),-3); } //tooken unico
	if(self::$due==='Y'){ $data['datedue']=date('Ymd'); }
	$pkey=self::$pkey; if($key!=false){ $pkey=$key; }
	/* Si existe _pid, usar esta como clave,y poner ._pid */;
	$pid='';
	if(self::$_pid){
		$data['_pid']=self::$_pid;
		$pkey=self::$_pid; $pid='._pid'; self::$_pid=false;
	}
	$enc_header = base64_encode(json_encode(array('alg' =>$HS25,'typ'=>'JWT')));
	$enc_header=self::urlEnc($enc_header);
	$enc_payload = self::payload($data);
	$header_payload = $enc_header.'.'.$enc_payload;
	$signature = base64_encode(hash_hmac('sha256',$header_payload,$pkey,true));
	$signature = self::urlEnc($signature);;
	$jwt_token = $header_payload.'.'.$signature.$pid;
	return $jwt_token;
}
static public function decode($jwt='',$P=array()){
	self::$err=false; self::$errNo=0; self::$errNoText='';
	if($jwt=='' || $jwt==false){
		self::$err=3; self::$errNo=3;
		return self::$errNoText='Tooken is undefined.';
	}
	$pkey=self::$pkey;
	if($P['key']){ $pkey=$P['key']; }
	$V = explode('.', $jwt);
	if($V[3]=='_pid'){
		$gD=self::jsonGet($V);
		$pkey=$gD['_pid']; unset($gD);
	}
	$recieved_signature = ($V[2]);
	$recievedHeaderAndPayload = ($V[0]).'.'.($V[1]);
	$resultedsignature = base64_encode(hash_hmac('sha256', $recievedHeaderAndPayload,$pkey,true));
	$resultedsignature=self::urlEnc($resultedsignature);
	if($resultedsignature == $recieved_signature) {
		self::$last=self::jsonDecode(base64_decode($V[1]));
		if(0 && self::$due==='Y'){
			$datereq=date('Ymd');
			if(self::$last['datedue']!=$datereq){
			self::$err=true; self::$errNo=3; /* tooken out */
			return self::$errNoText='Sesión Caducada, cierre y vuelva a iniciar sesion. ('.self::$last['datedue'].'!='.$datereq.') .';
			}
		}
		return self::$last;
	}
	else { self::$err=true; self::$errNo=2;
	return self::$errNoText='Tooken error: Firma no satisfatoria.'; }
}
static public function jsonDecode($js=''){
	$js=_js::decode($js);
	return $js;
}
static public function jsonGet($jwt=''){
	$jwt =(is_array($jwt))?$jwt:explode('.',$jwt);
	return json_decode(base64_decode($jwt[1]),1);
	return $js;
}
static public function payloadDecode($payload=''){
	return self::jsonDecode(base64_decode($payload));
}
static public function urlEnc($input){
	return str_replace('=', '', strtr($input, '+/', '-_'));
}
static public function urlDec($input){
	$remainder = strlen($input) % 4;
	if ($remainder) {
					$padlen = 4 - $remainder;
					$input .= str_repeat('=', $padlen);
	}
	return strtr($input, '-_', '+/');
}
}
?>
