<?php
require('com_svr.php');
if($_GET['file']==''){ die(_js::err(3,'File undefined')); }
/* privacity control only in api0 */
$filePath=c::$V['STOR_ROOT'].$mnt.$_GET['file'];//E:/svr o '' para /mnt
$fileName=($_GET['fileName'])?$_GET['fileName']:basename($_GET['file']);
$fileName=str_replace(',','%2C',$fileName);
$dispo=($_GET['embed']=='Y')?
"Content-Disposition: inline; filename=$fileName"
:"Content-Disposition: attachment; filename=$fileName";
$ext=substr($fileName,-4);
$mimeTy=($ext=='.pdf')?'application/pdf':'';
$mimeTy=($ext=='.xls' || $ext=='xlsx')?'application/vnd.ms-excel':$mimyTy;
if(!empty($filePath) && file_exists($filePath)){
	header("Cache-Control: public");
	header("Content-Description: File Transfer");
	header($dispo);
	header("Content-Type: ".$mimeTy);
	header('Content-Length: '.filesize($filePath));
	readfile($filePath);
	exit;
}else{
	echo 'The file does not exist: '.$filePath.'.';
}
?>
