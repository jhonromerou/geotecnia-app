<?php
_TB::$F['par_ocrd']=array(
'fid'=>'cardId',
'cardId'=>array('t'=>'Id Socio','tag'=>'vPost','req'=>'Y'),
'cardCode'=>array('t'=>'Código de socio','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>20),
'cardName'=>array('t'=>'Nombre de Socio','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>100),
'licTradType'=>array('t'=>'Tipo Doc.','tag'=>'select','opts'=>'$V.crdLicTradType'),
'licTradNum'=>array('t'=>'Número Documento','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>20),
'slpId'=>array('t'=>'Resp. Ventas','tag'=>'slpAssg','aGo'=>'sysd.slp'),
'RF_tipEnt'=>array('t'=>'Tipo Entidad','tag'=>'select','opts'=>'$V.RF_tipEnt'),
'RF_regTrib'=>array('t'=>'Regimen','tag'=>'select','opts'=>'$V.RF_regTrib'),
'RF_mmag'=>array('t'=>'Municipio','tag'=>'select','opts'=>'$V_Mmag'),
'fdpId'=>array('t'=>'Forma de Pago','tag'=>'select','opts'=>'$Tb.gfiOfdp','aGo'=>'acc.fdp'),
'pymId'=>array('t'=>'Condición de Pago','tag'=>'select','opts'=>'$Tb.gfiOpym','aGo'=>'acc.pym'),
);
?>