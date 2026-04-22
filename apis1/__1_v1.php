<?php
require('../_inicnf.php');
require('__0_aorigin.php');

if($APP_REST){ c_define('APP_REST',$APP_REST); }
if($ADMS_restCall!='N'){  header('Content-Type: application/json'); }

c_define('ADMS_SES_TOOKENDUEDATE_OMIT','N',1);
$isJs=(preg_match('/^\/?js\//',$_SERVER['REQUEST_URI']) || preg_match('/^\/?jsx\//',$_SERVER['REQUEST_URI']));
if($isJs){ /*todo muere aqui */
	require 'phpbase2.php';
	_ADMS::lib('_err,_js,a_sql,a_ses,JApp,JRoute,_jwt');
    require(c::$V['REQUEST_VALIDATION_FILE']);
    if(c::$isProdScope){
        _ADMS::lib('a_mdl');
        //die('--> '.print_r($ocardcode,1));
        c::$Sql=a_mdl::login($ocardcode);
    }
	a_sql::dbase(c::$Sql);
	$canCont = false;//true si tooken o cookie
	if(preg_match('/^\/?jsx\//',$_SERVER['REQUEST_URI'])){}
	else{
        $tok=a_ses::byJWT(array('U_api'=>'Y'));
		if(_err::$err){ die(_err::$errText); }
	}
	JRoute::renderJS();
	die();
}
else{ /* ver uriMld(); */
	require '_C.php'; 
	require 'phpbase2.php';
	_ADMS::lib('_err,_js,a_sql,a_ses,JRoute');
	require '_0s.php';
	_0s::uri(); 
	_0s::$Path_static=c::$V['PATH_API'];
	_0s::$svrPath=c::$V['PATH_TOP'];
	_ADMS::_lb('_To,Doc'); 
}


/* era __rest2 */
/* anters era  //inidb_wser -> adms_login */
if(_0s::$uri[0]=='sys'){
    c::$V['mdlLogin']['apiReq']=false;
    require(c::$V['LOAD_MODULES_FILE']);
} else {
    require(c::$V['REQUEST_VALIDATION_FILE']);
}

if(c::$isProdScope){
	_ADMS::lib('a_mdl');
	//die('--> '.print_r($ocardcode,1));
	c::$Sql=a_mdl::login($ocardcode);
}
c::setMaxTime(300); 
a_sql::dbase(c::$Sql); 
_ADMS::lib('_jwt');

$canCont = false;//true si tooken o cookie
$tok=a_ses::byJWT(array('U_api'=>'Y'));
if(_JWT::$err){ die($tok); }
else if(is_array($tok)){
	//reqFile(_0s::$socL['req'],c_g('PATH_API'));
	$canCont=true;
}
/* era _rest_2 */

$D = $_POST;
if(!$canCont){ die(_js::e(4,'Not auth, tooken or session not found. (__1_rest)')); }
if(!c_is('APP_REST','N')){
	$isV=(_0s::$uri[0]=='v1' || _0s::$uri[0]=='1');
	$rest = '_rest/';

	if($tok['cardId']){/* Ingresando como cliente */
		if(_0s::$uri[0]=='1c'){ require('_restcards/'._0s::$uri['app'].'.php'); }
		else{ require('_restcard/'._0s::$uri['app'].'.php'); }
	}
	else if(_0s::$uri[0]=='a'){ require(_0s::uriMdl());; }
	else if(_0s::$uri[0]=='sys'){ require 'sys/'._0s::$uri['app'].'.php'; }
	else if(_0s::$uri[0]=='1c'){
		require('_restcards/'._0s::$uri['app'].'.php');
	}
	else if(_0s::$uri['app']=='pruebas'){ require(_0s::$uri['mdl'].'.php');}
	else if( _0s::$uri['app']=='_crons'){ require('_systema/crontabs/'._0s::$uri['mdl'].'.php');}
	else if(_0s::$uri['app']=='jcrons'){
		echo 'jcrons';
		print_r(c::$V);
		require(c::$V['PATH_ROOT'].'cronss/script/'._0s::$uri['mdl'].'.php');
	}
	else if($isV){ require($rest._0s::$uri['app'].'.php'); }
	else if(_0s::$uri[0]=='sr'){ require($rest.'__rep/'._0s::$uri['app'].'.php');}
	else if( _0s::$uri['app']!='data' &&  _0s::$uri['app']!='tuto' &&  _0s::$uri['app']!=''){ require $rest.  _0s::$uri['app'].'.php'; }
	else if( _0s::$uri['app']){ require $rest.  _0s::$uri['app'].'.php'; }
}

?>