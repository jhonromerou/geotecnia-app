<?php
class a_sql{
static $host = 'localhost';
static $define_host = '';
static $user = 'root';
static $pass = '';
static $dbase = '';
static $DB = '';
static $errNo = -1;
static $numRows = -1;
static $numCon=0;

static public function preconfig($C=array()){
	if($C['localMode']){}
	else{
	self::$host = $C['host'];
	self::$user = $C['user'];
	self::$pass = $C['pass'];
	self::$dbase = $C['dbase'];
	}
}

static function dbase($C=array()){
	if($C['h']){ self::$host = $C['h']; }
	if($C['u']){ self::$user = $C['u']; }
	if($C['p']){ self::$pass = $C['p']; }
	if($C['db']){ self::$dbase = $C['db']; }
	$INF = array('null'=>'null');
	@self::$DB = new mysqli(self::$host,self::$user,self::$pass);
	if(self::$DB->connect_errno > 0){
		$perr=self::$DB->connect_error;
		$INF['errNo'] = 1;
		$INF['error_sql']['errno'] = self::$DB->connect_errno;
		$text2= ': '.self::$DB->connect_error.' (FROM php)';
		$text='Error en conexión a la base de datos T1 ('.self::$DB->connect_errno.')... '.$text2;
		if($perr==2002){ $text= 'Error en conexión al servidor (2002)'.$text2; }
		$INF['error']=$INF['text']=$text;
		$err++;
	}
	else if(self::$DB->errno){
			$INF['errNo'] = 1;
		$INF['error_sql']['errno'] = self::$DB->error;
		$INF['error']=$INF['text']= 
		'Error en conexión a la base de datos T2 ('.self::$DB->errno.'): '.self::$DB->error.' (FROM php)';
		$err++;
	}
	else{
		$qdb=self::$DB->query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = \''.self::$dbase.'\' LIMIT 1');
		if($qdb->num_rows==0){
			$INF['error_sql']['errno'] = 1;
			$INF['errNo'] = 3;
			$INF['text'] = 'Err connect, database ('.self::$dbase.') no exists.';
			$err++;
		}
	}
	if($err>0){ return $INF; }
	mysqli_select_db(self::$DB,self::$dbase);
	self::$DB->query('SET NAMES \'utf8\'');
	self::$DB->query("SET SESSION sql_mode = 'ONLY_FULL_GROUP_BY,NO_ENGINE_SUBSTITUTION'");
	return self::$DB;
}

static public function host($D=array()){
	$url = $_SERVER['HTTP_HOST']; 
	self::$host = (self::$define_host != '') ? self::$define_host : self::$host;
}

static public function freeR($li){
	mysqli_free_result($li);
}

static public function query($query='',$PARS=array()){
	self::$errNo = -1;
	self::$numRows = -1;
	$INF['query'] = $query;
	if($query == ''){ self::$errNo = 1;
		$INF['error_sql'] = 'Consulta en blanco'; 
	}
	else{
		$Qu = self::$DB;
		$Query = $Qu->query($query);
		if($Qu->errno){
			self::$errNo = 1;
			$errText = '0q001 ('.$Qu->errno.') '.$Qu->error;
			$errText = ($Qu->errno == 1146) ? 'Table undefined. '.$errText : $errText;
			$errText = ($Qu->errno == 1064) ? 'SQL Struct. '.$errText : $errText;
			$INF['error_sql'] = $errText;
			$INF['errno'] = $Qu->errno;
			$INF['error'] = 'Error en consulta ('.$INF['errno'].')';
		}
		else{
			if(preg_match('/SELECT/',$query)){
				$INF['num_rows'] = self::$numRows = $Query->num_rows;
				if($INF['num_rows'] == 0){ self::$errNo = 2; $INF['error'] = 'No se encontraron resultados'; }
				else if($INF['num_rows'] > 0){ return $Query; }
			}
			else if(preg_match('/DELETE|UPDATE/',$query)){
				$INF['aff_rows'] = $Qu->affected_rows;
			}
			else{ return $Query; }
		}
	}
	return $INF;
}
static public function fetch($query='',$PARS=array()){
 $INF = array();
 $Qu = self::query($query);
 if(is_array($Qu) && $Qu['error']){ $INF = $Qu; }
 else{
  if($PARS['campo']) {
   $q_f = $Qu->fetch_assoc();
   return $q_f[$PARS['campo']];
  }
  if($PARS['byArray']){ #id para agrupar
   $id_g = ($PARS['byArray']);
   while($D = $Qu->fetch_assoc()){
	$INF[$D[$id_g]] = $D; 
   }
  }
  else{ return $Qu->fetch_assoc(); }
 }
 return $INF;
}

}

class _js{
static public function e($errNo=0,$text=''){
	return '{"error":"'.$errNo.'", "text":"'.$text.'"}';
}
static public function r($text=''){
	return '{"ok":true, "text":"'.$text.'"}';
}
}
?>