<?php
$met=$_SERVER['REQUEST_METHOD'];
if($met=='POST'){ require('uploadFile.php'); }
else if($met=='DELETE'){
 $_POST['filePath']=$_GET['file']; // /mnt/vo2/xasasa.pdf
 require('delete.php');
}
else{ require('downFile.php'); }
?>
