<?php
a_sql::dbase(c::$Sql2);
_ADMS::lib('a_mdl');
$q0=a_mdl::autByCode();
if($_GET['k']=='invPost'){
	_ADMS::libx('dataico');
	_ADMS::lib('xCurl');
	__dataIco::$D=$q0['J']['D'];
	if($q0['J']['notes']){ $_POST['notes']=$q0['J']['notes']; }
	echo __dataIco::invPost($_POST);
}
else if($_GET['k']=='invPut'){
	_ADMS::libx('dataico');
	_ADMS::lib('xCurl');
		__dataIco::$D=$q0['J']['D'];
	echo __dataIco::invPut($_POST);
}
else{ echo _js::e(3,'Ningun acción definida'); }
?>
