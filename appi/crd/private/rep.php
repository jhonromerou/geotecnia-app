<?php
JRoute::get('crd/rep/nov',function($D){
  if(_js::iseErr($D['A_docDate(E_mayIgual)'],'Fecha inicio debe estar definida')){}
  _err::errDie();
	_ADMS::lib('sql/filter');
	$vt=$D['viewType']; unset($D['viewType']);
	$whB='1'; //'A.canceled=\'N\'';
	if($vt=='C'){
		$gb='';
		$query='SELECT A.*,C.cardName
		FROM par_onov A
    LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE '.$whB.' '.a_sql_filter($D).' ';
  }
  else if($vt=='T'){
		$gb='';
		$query='SELECT A.*,C.cardName,
    T.completed,T.completAt,T.lineText,T.lineAssg,T.lineDue
		FROM par_onov A
    LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
    JOIN app_ckl1 T ON (T.tt=\'crdNov\' AND T.tr=A.docEntry)
		WHERE '.$whB.' '.a_sql_filter($D).' ';
	}
	return a_sql::fetchL($query,
	['k'=>'L','D'=>['_view'=>$vt]],true);
},[]);

JRoute::get('crd/rep/cards',function($D){
	_ADMS::lib('sql/filter');
	$vt=$D['viewType']; unset($D['viewType']);
	return a_sql::fetchL('SELECT C.* FROM par_ocrd C WHERE 1 '.a_sql_filtByT($D).' LIMIT 1000',
	['k'=>'L','D'=>['_view'=>$vt]],true);
},[]);