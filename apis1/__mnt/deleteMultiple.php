<?php
require('com_svr.php');
if(!_Svr::ori()){ die(_Svr::$errText); }
$ok=false;
$fn=0; $fd=0;
if(is_array($_POST['L'])) foreach($_POST['L'] as $fileN){
	$filePath=c::$V['STOR_ROOT'].$fileN;
	if(!empty($filePath) && file_exists($filePath)){ $fd++; }
	@unlink($filePath); $fn++;
}
if($fn==0){ echo '{"errNo":3,"text":"No se recibieron archivos para eliminar"}'; }
else { echo '{"text":"Archivos eliminados correctamente ('.$fd.' de '.$fn.')"}'; }
?>