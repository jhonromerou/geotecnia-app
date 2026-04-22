<?php
require('../_inicnf.php');
require('__0_aorigin.php');
header('Content-Type: application/json');
require 'phpbase2.php';
_ADMS::lib('_err,_js,a_sql,a_ses,JApp,JRoute,_jwt');
#JRoute::reqHeads('_c');
JRoute::$Appi=true;

c::setURI([
	'i'=>[1],
	'app'=>[2],
	'ctr'=>[3],
	'view'=>['>',1],
]);
JRoute::$path=c::$URI['view'];
$canCont = false;//true si tooken o cookie
if(c::$URI[0]=='tpd'){
	/* tpd/{ocardcode}/gvp/ticket -> /appi/gvp/tpd/ticket/... */
	//print_r(c::$URI);
	a_sql::dbase(c::$Sql2,'__appi -> tp');
	$q=a_sql::fetch('SELECT ocardCode,sqlh sql_h,sqldb sql_db,sqlp sql_p,sqlu sql_u,mailConf,pymCnf,cnfIni from ocard WHERE ocardCode=\''.c::$URI[1].'\' LIMIT 1',[1=>'Error get info from ocard',2=>'ocard not exist.']);
	if(a_sql::$err){ echo a_sql::$errNoText; }
	else{
		a_ses::$ocardCode=$q['ocardCode'];
		a_sql::dbase($q);
		_ADMS::lib('a_mdl');
		a_mdl::cnf2V($q,['mail'=>'Y','for'=>'cnfIni']);
		JRoute::$path=str_replace($q['ocardCode'].'/','',JRoute::$path);
		c::$URI['routeDefined']=c::$URI[2].'/tpd/'.c::$URI[3]; //gvp/ticket  appi/../tpd
		JRoute::$view=c::$URI['view'];
		c::$V['URI_TPD']=c::$V['URI_API'].'/tpd/'.a_ses::$ocardCode.'/';
		c::$V['tdocsTemp']=c::$V['URI_API'].'/static/tdocs';
		c::$V['softWaterBottom']='Generado con <a href="http://admsistems.com/unclicc">Sistema unClicc</a>, todo es más facil.';
		require(JRoute::render('defined'));
	}
}

else{
if(c::$URI['i']=='open'){
	JRoute::render('open');
}
else if(c::$URI['i']=='public'){ /* require ocardcode */
	a_sql::dbase(c::$Sql2,'__appi -> public');
	$q=a_sql::fetch('SELECT * from sel_ocrd WHERE ocardCode=\''.c::$H['ocardcode'].'\' LIMIT 1');
	a_ses::$ocardId=$q['ocardId'];
	JRoute::render('public');
}
else if(c::$URI['i']=='private'){//private, requeri user
	$jwt = a_ses::ocardcode(false,['D'=>'Y']);
	if(_err::$err){ die(_err::$errText); }
	if(c::$isProdScope){
		_ADMS::lib('a_mdl');
		//die('--> '.print_r($ocardcode,1));
		c::$Sql=a_mdl::login($jwt['ocardcode']);
	}
	a_sql::dbase(c::$Sql,'__appi--> private');
	a_ses::U_data($jwt);
	JRoute::render('private');
}
}
