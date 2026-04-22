<?php
JRoute::get('gvt/sin','get');
JRoute::get('gvt/sin/view','getOne');
JRoute::get('gvt/sin/tb99','logGet');
JRoute::get('gvt/sin/tbRel1','logRel1');

JRoute::post('gvt/sin',function($D){
	return gvtSin::post($D);
});
JRoute::put('gvt/sin/statusCancel','putStatusCancel');

#ni idea esto
JRoute::get('gvt/sin/sea2nc',function($D,$P){
	_ADMS::lib('iDoc');
	$D['fromA']='A.docEntry,A.serieId,A.docNum,A.cardId,A.cardName,A.pymId,A.slpId, CONCAT(D.srCode,\'-\',A.docNum,\' - \',A.cardName) lineText
	FROM gvt_oinv A
	LEFT JOIN doc_oser D ON (D.serieId=A.serieId)';
	$sep=explode('-',c::$T['textSearch']);
	$D['whA']='AND A.canceled=\'N\' ';
	if($sep[1]){
		if($sep[0]){ $D['whA'] .= ' AND D.srCode=\''.$sep[0].'\' '; }
		$D['whA'] .= ' AND A.docNum=\''.$sep[1].'\' ';
	}
	else{ $D['whA'] .=' AND A.cardName LIKE \'%'.c::$T['textSearch'].'%\' '; }
	return iDoc::get($D);
},[]);


?>
