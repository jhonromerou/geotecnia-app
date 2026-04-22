<?php
class text{
static $text = ''; 
static public function len($t_='',$maxL=20,$minL=0){
	self::$text = ($t_);
	$str_l = strlen(self::$text);
	self::$text = str_replace("ñ","+",self::$text); #ñ is 2chrs
	if($maxL == 'r'){ return strlen(self::$text); }
	else if($str_l > ($maxL+1)){ return true; }
	else if($str_l < $minL && $minL != 0){ return true; }
}

static public function limit($text='',$limit=''){
	if(strlen($text)>$limit){ $text = substr($text,0,$limit)."..."; }
	return $text;
}

static public function money($price=0,$decimales=2){
	$price_ = (preg_match('/^(A consultar|Negociable)$/is',$price)) ? $price : $price;
	$price_mil = (is_numeric($price) && $price > 0) ? '$ '.(number_format($price, $decimales, '.', ',')) : $price_;
	$price_mil = (is_numeric($price) && $price < 0) ? '($ '.(number_format($price*-1, $decimales, '.', ',')).')' : $price_mil;
	if($_GET['export']){ return $price; }
	return $price_mil;
}

static public function zerofill($num=0,$len=0){
	$lent = ($len >0) ? substr(pow(10,$len),1,$len) : ''; $pos = $len*-1;
	$tex = ($len >0) ? substr($lent.$num,$pos) : $num;
	return $tex;
}
}
?>