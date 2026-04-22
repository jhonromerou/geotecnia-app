<?php
require('com_svr.php');
if(!_Svr::ori()){ die(_Svr::$errText); }
if(!$_POST['filePath']){
	die(_js::err(3,'Se debe definir el directorio. on[__mnt/uploadFile]'));
}
require('com_Attach.min.php');
echo AttachMin::multiLoad($_FILES['file'],$_POST);
//if($_POST['postMultiple']=='Y'){ echo AttachMin::multiLoad($_FILES['file'],$_POST); }
//else{ echo AttachMin::load($_FILES['file'],$_POST); }
?>
