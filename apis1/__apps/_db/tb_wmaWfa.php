<?php
//wfaId,wfaCode,wfaName,descrip
// syF $V.NY, limitFase {I,E,N}, wfaClass{N,RC,NC}
$wfaL='[{k:"N","v":"Normal"},{k:"I","v":"Inicial"},{k:"E","v":"Final"}]';
$wfaC='[{k:"N","v":"Normal"},{k:"RC","v":"Reclasifación"},{k:"NC","v":"No Clasifica"}]';
_TB::$F['wma_owfa']=array(
'fid'=>'wfaId',
'wfaId'=>array('t'=>'Id Fase','tag'=>'vPost','req'=>'Y'),
'wfaCode'=>array('t'=>'Código de Fase','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>10),
'wfaName'=>array('t'=>'Nombre de Fase','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>20),
'descrip'=>array('t'=>'Descripción','tag'=>'input','type'=>'text','maxlength'=>100),
'sysF'=>array('t'=>'Fase Sistema','tag'=>'select','opts'=>'$V.NY','disabled'=>'disabled','req'=>'Y'),
'limitFase'=>array('t'=>'Limit Fase','tag'=>'select','optEval'=>'Y','opts'=>$wfaL,'disabled'=>'disabled'),
'wfaClass'=>array('t'=>'Class Fase','tag'=>'select','optEval'=>'Y','opts'=>$wfaC,'disabled'=>'disabled'),
);
?>