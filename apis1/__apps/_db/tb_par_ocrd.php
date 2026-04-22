<?php
_TB::$F['par_ocrd']=array(
'fid'=>'cardId',
'cardId'=>array('t'=>'Id Socio','tag'=>'vPost','req'=>'Y'),
'cardCode'=>array('t'=>'Código de socio','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>20),
'cardName'=>array('t'=>'Nombre de Socio','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>100),
'licTradType'=>array('t'=>'Tipo Doc.','tag'=>'select','opts'=>'$V.crdLicTradType'),
'licTradNum'=>array('t'=>'Número Documento','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>20)
);
?>