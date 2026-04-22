<?php
$ADMS_Path_Relative = $_SERVER['DOCUMENT_ROOT'];
$rootPATH = $_SERVER['DOCUMENT_ROOT'];
$host = $_SERVER['HTTP_HOST'];
$_com = preg_match('/\.(com|co|net|es)$/is',$host);
$_dr = preg_match('/^(a-z)\:/is',$_SERVER['DOCUMENT_ROOT']);
$Host_localMode = ($_com || $_dr) ? 'N' : 'Y';
$ADMS_StaticPath = 'E:/svr/st3';
if(preg_match('/(st1)\.admsistems\.com/',$host,$mat)){ $ADMS_StaticPath = '/home/miventap/__static/'.$mat[1]; }
?>