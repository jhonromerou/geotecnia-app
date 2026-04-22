<?php
class a_cnf{
static $sql=array();
}
class a_mdl{
static public function ctrl($P=array()){
	_js::$mdlOn='a_mdl::ctrl';
	if(!$P['period']){ $P['period']=date('Y-m'); }
	if(!$P['qty']){ $P['qty']=1; }
	$Di=array('ocardId'=>$P['ocardId'],'mdl'=>$P['mdl'],'variName'=>$P['variName'],'period'=>$P['period']);
	$Di['._.qty']='+-+qty+'.$P['qty'];
	$Di['qty']=$P['qty'];
	$qi=a_sql::insert($Di,array('table'=>'mdl_ctrl','wh_change'=>'WHERE ocardId=\''.$P['ocardId'].'\' AND variName=\''.$P['variName'].'\' AND period=\''.$P['period'].'\' LIMIT 1'));
	if($qi['err']){ return _js::e(3,$qi['text']); }
	else{ return _js::r($P['variName'].': actualizada correctamente para periodo.'); }
}
static public function oaut($P=array()){
	$ori=' on[a_mdl::oaut]';
	if($js=_js::ise($P['ocardCode'],'Código de Cliente no definido.'.$ori)){ die($js); }
	else if($js=_js::ise($P['accK'],'accK no definido para revisión de permiso.'.$ori)){ die($js); }
	$q0=a_sql::fetch('SELECT C.ocardId,C.ocardName,M.actived,M.accK,M.jsPars
FROM ocard C
LEFT JOIN mdl_oaut M ON (M.ocardId=C.ocardId AND M.accK=\''.$P['accK'].'\')
WHERE C.ocardCode=\''.$P['ocardCode'].'\' LIMIT 1',array(1=>'Error obteniendo información de autorización para ocard.'.$ori,2=>'El ocard '.$P['ocardCode'].' no está registrado.'.$ori));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if(!$q0['accK']){ die(_js::e(3,$P['ocardCode'].': Permiso no definido para esta acción: '.$P['accK'].$ori)); }
	if($q0['actived']=='N'){ die(_js::e(3,'Permiso no autorizado para esta acción: '.$P['accK'].$ori)); }
	return $q0;
}
static public function autByCode($P=array()){
	$ori=' on[a_mdl::autByCode()]';
	$ocardcode=JRoute::reqHeads('ocardcode');
	if(!isset($ocardcode)){ die(_js::e(3,'Tooken de cliente no definido: '.$P['accK'].$ori)); }
	$P['accK']=JRoute::reqHeads('acck');
	if($js=_js::ise($P['accK'],'accK no definido para revisión de permiso.'.$ori)){ die($js); }
	$q0=a_sql::fetch('SELECT C.ocardId,C.ocardName,M.actived,M.accK,M.jsPars
FROM ocard C
LEFT JOIN mdl_oaut M ON (M.ocardId=C.ocardId AND M.accK=\''.$P['accK'].'\')
WHERE C.ocardCode=\''.$ocardcode.'\' LIMIT 1',array(1=>'Error obteniendo información de autorización para ocard.'.$ori,2=>'El código no está registrado ('.$ocardcode.').'.$ori));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if(!$q0['accK']){ die(_js::e(3,$ocardcode.': Permiso no definido para esta acción: '.$P['accK'].$ori)); }
	if($q0['actived']=='N'){ die(_js::e(3,'Permiso no autorizado para esta acción: '.$P['accK'].$ori)); }
	$q0['J']=json_decode($q0['jsPars'],1);
	if(!is_array($q0['J'])){ $q0['J']=array(); }
	return $q0;
}
static public function stor($P=array(),$P2=array()){
	$ori=' on[a_mdl::stor]';
	if($js=_js::ise($P['ocardCode'],'Código de Cliente no definido.'.$ori)){ die($js); }
	$q0=a_sql::fetch('SELECT C.ocardId,C.ocardName,P.tpath,P.storMnt,P.storOpen,P.storUsaged,P.fileMaxSize,P.httpAu
FROM ocard C
LEFT JOIN mdl_stor P ON (P.ocardId=C.ocardId )
WHERE C.ocardCode=\''.$P['ocardCode'].'\' LIMIT 1',array(1=>'Error obteniendo información de almacenamiento para ocard.'.$ori,2=>'El ocard '.$P['ocardCode'].' no está registrado.'.$ori));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$storOpen=$q0['storOpen']*1;
	$storMnt=$q0['storMnt']*1;
	if($q0['httpAu']!='*'){
		$sep=explode(' ',$q0['httpAu']);
		$ok=0; $origen=$_SERVER['HTTP_ORIGIN'];
		foreach($sep as $n=>$h){
			$re=preg_quote($h,'/');
			if(preg_match('/\.?'.$re.'$/i',$origen)){ $ok=true; break; }
		}
		if($ok==0){ die(_js::e(3,'No tiene permisos para subir este archivo (err_0x001)'.$ori)); }
	}
	if($storOpen<=0){ die(_js::e(3,'No tiene espacio libre en el disco. '.$storOpen.' de '.$storMnt.' Mb'.$ori)); }
	if($UpI=$P2['upI']){
		if($UpI['t']>$storOpen){ die(_js::e(3,'El tamaño de los archivos a subir ('.($UpI['t']*1).') superan el espacio disponible ('.$storOpen.') en Mb.'.$ori)); }
		else if($UpI['max']>$q0['fileMaxSize']){ die(_js::e(3,'El archivo '.$UpI['maxName'].', supera el tamaño por archivo a subir ('.($q0['fileMaxSize']*1).') en Mb.'.$ori)); }
		else{
			self::storPut(array('ocardId'=>$q0['ocardId'],'qty'=>$UpI['t']));
			if(_err::$err){ die(_err::$errText); }
		}
	}
	return $q0;
}
static public function storGet($P=array(),$revi=true){
	//ocardcode,upTotal,maxFile
	$ori=' on[a_mdl::stor]-'.$P['ocardCode'];
	if($js=_js::ise($P['ocardCode'],'Código de Cliente no definido.'.$ori)){ die($js); }
	$q0=a_sql::fetch('SELECT C.ocardId,P.svr,C.filePath,P.storMnt,P.storOpen,P.storUsaged,P.fileMaxSize,P.httpAu
FROM ocard C
LEFT JOIN mdl_stor P ON (P.ocardId=C.ocardId )
WHERE C.ocardCode=\''.$P['ocardCode'].'\' LIMIT 1',array(1=>'Error obteniendo información de almacenamiento para ocard. '.$ori.': ',2=>'El ocard '.$P['ocardCode'].' no está registrado.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
	if($revi==true){ self::storRev($q0,$P); }
	return array('ocardId'=>$q0['ocardId'],'filePath'=>$q0['filePath'],'svr'=>$q0['svr']);
}
static public function storPut($P=array()){
	$ori=' on[a_mdl::storPut]';
	if(!$P['qty']){ $P['qty']=0.01; }
	$Di=array('ocardId'=>$P['ocardId']);
	$Di['storOpen=']='storOpen-'.$P['qty']; //poner +-
	$Di['storUsaged=']='storUsaged+'.$P['qty'];
	$qi=a_sql::qUpdate($Di,array('tbk'=>'mdl_stor','wh_change'=>'ocardId=\''.$P['ocardId'].'\' LIMIT 1'));
	if(a_sql::$err){ _err::err(3,a_sql::$errText.$ori); }
}
static public function storRev($q0=array(),$P=array()){
	$ori=' on[a_mdl::storRev]-'.$P['ocardCode'];
	if($q0['httpAu']!='*'){
		$sep=explode(' ',$q0['httpAu']);
		$ok=0; $origen=$_SERVER['HTTP_ORIGIN'];
		foreach($sep as $n=>$h){
			$re=preg_quote($h,'/');
			if(preg_match('/\.?'.$re.'$/i',$origen)){ $ok=true; break; }
		}
		if($ok==0){ _err::err('No tiene permisos para subir este archivo (err-S001)'.$ori,3); return false; }
	}
	if($q0['storOpen']<=0){
		_err::err('Alcanzó el máximo de almacenamiento permitido '.($q0['storMnt']*1).' Mb (err-S002).'.$ori,3);
	}
	else if($P['upTotal']>$q0['storOpen']){ _err::err('No hay espacio suficiente para subir la información. Disponible: '.($q0['storOpen']*1).' Mb. (err-S003)'.$ori,3); }
	else if($P['maxFile']>$q0['fileMaxSize']){ _err::err('No se permiten subir archivos que pesen más de '.($q0['fileMaxSize']*1).' Mb. (err-S004)'.$ori,3); }
}

static public function clogs($P=array()){
	_js::$mdlOn='a_mdl::clogs';
	$Di=array('tt'=>$P['tt'],'lineMemo'=>$P['lineMemo']);
	$qi=a_sql::insert($Di,array('table'=>'mdl_clogs','qDo'=>'insert'));
	if($qi['err']){ return _js::e(3,$qi['text']); }
	else{ return _js::r($P['tt'].': Log registrado'); }
}
static public function cnf2V($q=[],$P=[]){
	if($P['mail']){ c::$EmailSvr=json_decode($q['mailConf'],1); }
	if($P['for'] && $q[$P['for']]){
		$cv=json_decode($q[$P['for']],1);
		if($cv){ foreach($cv as $k =>$v){
			c::$V['.'.$k]=$v;
		}}
		
	}
	if($P['pymCnf']){ return json_decode($q['pymCnf'],1);  }
}
static public function login($ocardcode='',$P=array()){
	//Siempre se usa este en el REST, usado en emailSend para EmailSvr
	$ori =' on[a_mdl::login()]';
    // TODO: aca se define la resolucion para dataico
	c::$Enviroment = json_decode(<<<EOD
{
    "dataico": {
        "env": "PRODUCCION",
        "aid": "6bfa9eb7-c878-4607-83db-06392775cf2f",
        "token": "29b48e0f1a3c2aced43e4e1f2803b350",
        "sendDian": "N",
        "sendEmail": "N",
        "invoice_resolution_number": "18764099323979",
        "invoice_prefix": "GEO",
        "invoice_flexible": true
    }
}
EOD, 1);
	$Cnf=c::$V['mdlLogin'];
	if($Cnf['mdlLoad']=='Y' || $P['mdlLoad']=='Y'){//en __1_v1
        $mdlConfig = '{"dfe":"Y","gvtSell":"Y","gvtSellPayment":"Y","gfiAcc":"Y","gfi":"Y","rowsFull":"Y","itf":"Y","crd":"Y"}';
        c::$Modules = json_decode($mdlConfig, 1);
        _Mdl::jsFileTxt('/* a_mdl::login */
$0s.ocardId=6;
$0s.ocardcode=\'geotecnia\';
$0s.ocardName=\'Geotecnia Ingenieria\';
$MdlK='.$mdlConfig.';
/* end a_mdl::login */
');
        c::$V['jsLibType']= 'D';
        c::$V['jsLoad']=json_decode('{"app":"0cnf/unclicc.geo"}',1);;
	}
    // TODO: warning credenciales
	return array('sql_h'=>'143.198.181.193','sql_db'=>'geo_app','sql_u'=>'root','sql_p'=>'Pepa1992--');
}
}
?>