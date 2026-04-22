<?php
class JRest {
var $met='GET';
var $upload=false;
var $json=false;
var $C;
function __construct($met='GET',$url='',$P=array()){
	$ch = curl_init();
	$this->met=$met;
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
	if($MET=='PUT'){
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
	}
	else if($met=='POST'){ curl_setopt($ch,CURLOPT_POST, 1); }
	if($P['json']){ $this->json=true; }
	return $this->C=$cn;
}
function headers($D){
	if($this->json){ $D[]='Content-Type: application/json;charset=utf-8'; }
	else if($this->upload){ $D[]='Content-Type: multipart/form-data'; }
	curl_setopt($this->C, CURLOPT_HTTPHEADER,$D);
}
function uid($P,$Type='uid'){
	if($Type=='uid'){
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, $P);
	}
}
function end(){
	if($this->met=='GET'){}
	else if($this->met=='POST'){

	}
}
}
?>
