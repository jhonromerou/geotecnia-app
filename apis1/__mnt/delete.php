<?php
require('com_svr.php');
if(!isset($_POST['filePath'])){ echo '{"errNo":3,"text":"Ruta de archivo no recibida on[st::__mnt/delete]."}'; }
else{
	$r=@unlink(c::$V['STOR_ROOT'].$_POST['filePath']);
	$r=@unlink($_POST['filePath']);
	if($r){ echo '{"ok":1,"text":"Archivo eliminado correctamente"}'; }
	else{ echo '{"ok":1,"text":"Archivo eliminado correctamente (2)"}'; }
}
?>
