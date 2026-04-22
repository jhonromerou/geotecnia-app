php
print_r(c::$V);
if($_GET['step1']){
_ADMS::lib('_File,Mailing,_2d,xCurl');
$Dte=array('eventName'=>$D['title']);
$Dte['eventDate']=_2d::dateLong($D['doDate'],$D['endDate']);
$Dte['eventLocation']=$D['wLocation'];
$Dte['ocardName']=a_ses::$ocardCode;
/* por arreglar */
$temp = _File::tempFile(Mailing::ics_create(array('date1'=>$D['doDate'],'date2'=>$D['endDate'],'title'=>$D['title'],'cn'=>'John Romero','mailto'=>'jromdev@gmail.com','location'=>$D['wLocation'])),'guardarencalendario'.a_ses::$userId.time().'.ics');
$uri='http://api0.admsistems.com/xl/pubapps/uploadFile';
$r=xCurl::post($uri,array('ocardCode'=>'admpruebas','_Fi'=>array($temp)),array('r'=>'txt'));
die('Resp: '.print_r($r,1));
}

?>