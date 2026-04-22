<?php
function a_sql_getPager($qu='',$P=array()){
	$_GET = ($_POST['GPAGER']) ? $_POST['GPAGER'] : $_GET;
	$nR = ($P['rowsxPage']>0) ? $P['rowsxPage'] : 7;
	$addT = ($P['addT']) ? $P['addT'] : ' ';
	$addTi = substr($addT,0,-1);
	$nR = ($_GET['numRowsxPage']>0) ? $_GET['numRowsxPage'] : $nR;
	$numPage = ($_GET['numPage']) ? $_GET['numPage'] : 1;
	$startOn = ($nR*($numPage-1));
	$limit = ($_GET['numPage']>0) ? 'LIMIT '.$startOn.','.$nR : ' LIMIT '.$nR;
	$qRec = a_sql::query($qu);
	$nRows = a_sql::$numRows;
	$tPages = ceil($nRows/$nR);
	return array('limit'=>$limit,
	'js'=>'"Pager":{"numPage":'.$numPage.', "numRows":"'.$nRows.'", "numRowsxPage":"'.$nR.'", "tPages":'.$tPages.'}',
 'JS'=>' '.$addTi.'"Pagination":{
 '.$addT.'"start":"'.$startOn.'", "limit":"'.$nR.'",
 '.$addT.'"numPage":'.$numPage.', "tPages":'.$tPages.',
 '.$addT.'"numRows":"'.$nRows.'", '.$addT.'"numRowsxPage":"'.$nR.'"
 '.$addTi.'}');
}
?>