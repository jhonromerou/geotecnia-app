<?php
//llamado desde __1_rest_2
c_define('ADMS_SES_TOOKENDUEDATE_OMIT','Y',1);
if($ADMS_viewHTML == 'Y'){ reqFile(_0s::$socL['req'],c_g('PATH_API')); }
if($_GET['objByTooken']=='Y'){
	_ADMS::_lb('_jwt');
	$sep=_JWT::decText($_GET['svrTooken'],'fileTooken','.');
	$ocardcode=$sep[0];
}
else if($_GET['ADMS_ocardcode']){ $ocardcode=$_GET['ADMS_ocardcode']; }
else{ $ocardcode = a_ses::ocardcode(); }

if(!$ocardcode){
	die(_js::e(3,'cardcode from Tooken undefined on __1_rest_2'));
}

_ADMS::lib('a_mdl');
$newSql = a_mdl::login($ocardcode,array('mdlLoad'=>'Y'));
if (c::$isProdScope) {
    c::$Sql = $newSql;
}
c::setMaxTime(300);
