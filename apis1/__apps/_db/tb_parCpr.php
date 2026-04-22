<?php
//name,position,gender,title,licTradType,licTradNum,tel1,tel2,cellular,email,birthDay
_TB::$F['par_ocpr']=array(
'fid'=>'prsId',
'prsId'=>array('t'=>'Id Persona','tag'=>'vPost','req'=>'Y'),
'name'=>array('t'=>'Nombre Completo','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>100),
'position'=>array('t'=>'Cargo','tag'=>'select','opts'=>'$V.crdPrsPosition'),
'gender'=>array('t'=>'Genero','tag'=>'select','opts'=>'$V.gender'),
'licTradType'=>array('t'=>'Tipo Doc.','tag'=>'select','opts'=>'$V.crdLicTradType'),
'licTradNum'=>array('t'=>'Número Documento','tag'=>'input','type'=>'text','maxlength'=>20),
'tel1'=>array('t'=>'Teléfono 1','tag'=>'input','type'=>'text','maxlength'=>20),
'tel2'=>array('t'=>'Teléfono 2','tag'=>'input','type'=>'text','maxlength'=>20),
'cellular'=>array('t'=>'Celular','tag'=>'input','type'=>'text','maxlength'=>20),
'email'=>array('t'=>'Email','tag'=>'input','type'=>'text','maxlength'=>100),
'birthDay'=>array('t'=>'Fecha Nacimiento','tag'=>'input','type'=>'date')
);
?>