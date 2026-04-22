<?php
class a_sqls{
static $DB;
static $disableSAP = false;
static $disableSAP_Error = false;
static $onDB = false;
static $errNo = -1;

static public function dbase($dbase=''){
	$serverName = '192.168.0.101';
	$connectionInfo = array('Database'=>'ALPACA','UID'=>'sa','PWD'=>'sapserver*0532');
	$INF = array();
	sqlsrv_configure ( "WarningsReturnAsErrors" , 0 ); //OFF
	sqlsrv_configure ( "LogSeverity" , 1 ); //SQLSRV_LOG_SEVERITY_ERROR
	self::$DB = sqlsrv_connect( $serverName, $connectionInfo);
	$err = sqlsrv_errors();
	if($err[0]['SQLSTATE'] && $err[0]['SQLSTATE'] != '01000'){
		$INF['error'] = 'Error en conexión a la base de datos.';
		$INF['error_sql'] = $err; 
		echo '<pre>'.print_r($INF,1).'</pre>';
		return $INF;
	}
	self::$onDB =  true;
	return self::$DB;
}

static public function close(){
	sqlsrv_close(self::$DB);
}

static public function query($query='',$PARS=array()){
		if(self::$disableSAP == true){ return _js::e(3,'SAP Inactivo'); }
		else if(self::$disableSAP_Error){ return _js::e(3,'SAP Inactivo en estos momentos.'); }
	if(self::$onDB == false){ self::dbase(); }
	self::$errNo = -1;
	self::$onDB =  true;
	$qu = sqlsrv_query(self::$DB,$query,array(),array('Scrollable'=> 'static' ));
	$nR = @sqlsrv_num_rows($qu);
	if($nR==0){
	self::$errNo = 2; 
	$INF['query'] = $query;
	$INF['num_rows'] = $nR;
	$INF['error'] = 'No se encontraron resultados.';
	return $INF; }
	else{ return $qu; }
}

static public function fetch($query=''){
		if(self::$disableSAP == true){ return array('text'=>'SAP Inactivo'); }
		else if(self::$disableSAP_Error){ return array('error'=>'SAP Inactivo en estos momentos.'); }
		if(self::$onDB == false){ self::dbase(); }
	self::$onDB =  true;
	$qu = sqlsrv_query(self::$DB,$query, array(), array( 'Scrollable' => 'static' ));
	$nR = @sqlsrv_num_rows($qu);
	if($nR == 0){ self::$errNo = 2;
		return _js::e(2,'No se encontraron resultados');
	}
	return sqlsrv_fetch_array($qu,SQLSRV_FETCH_ASSOC);;
}
}
?>