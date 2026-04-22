<?php
class _5a2{
static public function post($P=array()){
	if(_js::isse($P['targetType']) || _js::isse($P['targetRef'])){ $js = _ADMS::jsonError(5,'No se ha encontrado el target.'); }
	else if(_js::isse($P['sactAsunt'])){ $js = _ADMS::jsonError(3,'Se debe definir el Asunto.'); }
	else{
		_ADMS::_lb('com/_5o');
		o1::plan_get(_o::$Ty['checkList']);
		$P['dateC'] = date('Y-m-d H:i:s');
		$ins = a_sql::insert($P,array('POST'=>true,'user'=>true,'table'=>_0s::$Tb['ap1_act2']));
		if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$ins['error_sql']); }
		else{
			_ADMS::_lb('com/_6');
			$jso = o1::plan_put(_o::$Ty['checkList']);
			$js = _ADMS::jsonResp('Guardada Correctamente.');
			$P['sactId'] = ($ins['insertId']) ? $ins['insertId'] : $ckId;
			//$P['targetType'] = _o::$Ty['activity'];
			$P['objType'] = _o::$Ty['checkList'];
			$P['objRef'] = $P['sactId'];
			$P['lineMemo'] = $P['sactAsunt'];
			_6::o_counts($P,'++');
		}
	}
	return $js;
}

static public function markPut($D=array()){
	if($D['targetType'] == '' || $D['targetRef'] == ''){ $js = _ADMS::jsonError(4,'No se encontró targetRef.'); }
		else if($D['sactId'] == ''){ $js = _ADMS::jsonError(4,'No se encontró Id para eliminar.'); }
		else{
			$upFi = ($D['isCompleted'] == 'Y') 
			? 'isCompleted=\'Y\', dateComp=\''.date('Y-m-d H:i:s').'\' '
			: 'isCompleted=\'N\', dateComp=\'0000-00-00 00:00:00\' ';
			$q = a_sql::query('UPDATE '._0s::$Tb['ap1_act2'].' SET '.$upFi.' WHERE sactId=\''.$D['sactId'].'\' AND isCompleted!=\''.$D['isCompleted'].'\' LIMIT 1');
			if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$upd['error_sql']); }
			else if($q['aff_rows']>0){
				_ADMS::_lb('com/_6');
				$actComp = ($D['isCompleted'] == 'Y') ? 'complet ++' : 'complet --';
				$D['targetType'] = _o::$Ty['activity'];
				$D['objType'] = _o::$Ty['checkList'];
				_6::o_counts($D,$actComp);
			}
			$js = _ADMS::jsonResp('Subtarea Cambio de estado.');
		}
		return $js;
}

static public function delet($D=array()){
	if(_js::isse($D['targetType'])|| _js::isse($D['targetRef'])){ $js = _ADMS::jsonError(5,'No se encontró targetRef.'); }
	else if(_js::isse($D['sactId'])){ $js = _ADMS::jsonError(5,'No se encontró Id para eliminar.'); }
	else{
		$qSel = a_sql::fetch('SELECT isCompleted FROM '._0s::$Tb['ap1_act2'].' WHERE sactId=\''.$D['sactId'].'\' LIMIT 1');
		$q = a_sql::query('DELETE FROM '._0s::$Tb['ap1_act2'].' WHERE sactId=\''.$D['sactId'].'\' LIMIT 1');
		if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,'Error eliminando checkList: '.$upd['error_sql']); }
		else if($q['aff_rows']>0){
			_ADMS::_lb('com/_6');
			$D['targetType'] = _o::$Ty['activity'];
			$D['objType'] = _o::$Ty['checkList'];
			$act = ($qSel['isCompleted'] == 'Y') ? 'delComplet --' : '--';
			_6::o_counts($D,$act);
		}
		$js = _ADMS::jsonResp('Actividad Eliminada');
	}
	return $js;
}

static public function get($P=array()){
	_ADMS::_lb('sql/filter');
	$wh = a_sql_filtByT($P);
	$q = a_sql::query('SELECT * FROM '._0s::$Tb['ap1_act2'].' WHERE 1 '.$wh.' ORDER BY posic ASC, sactAsunt ASC ');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$q['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron subtareas.'); }
	else{
		while($L = $q->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '{"DATA":['.substr($js,0,-1).'
]}';
	}
	echo $js;
}

static public function S2_copy($o=array()){
	$errNo = 0;
	if($o['targetType'] == '' || $o['targetRef'] == '' || $o['old_targetRef'] ==''){
		$errNo=5; $js = _ADMS::jsonError(5,'No se ha definido targetRef{} para copy checklist.');
	}
	$fC = 'posic,doDate,sactAsunt,userAssg,userAssgName';
	$q = a_sql::query('SELECT '.$fC.' FROM '._0s::$Tb['ap1_act2'].' WHERE targetType=\''.$o['targetType'].'\' AND targetRef=\''.$o['old_targetRef'].'\' ');
	if(a_sql::$errNo == 1){ $errNo=1; $js = _ADMS::jsonError(1,$q['error_sql']); }
	else if(a_sql::$errNo == -1){
		while($c = $q->fetch_assoc()){
			$c['targetType'] = $o['targetType']; $c['targetRef'] = $o['targetRef'];
			$ins = a_sql::insert($c,array('POST'=>true,'u_dateC'=>1,'table'=>_0s::$Tb['ap1_act2']));
		}
	}
	if($err>0){ return array('errNo'=>$errNo,'js'=>$js); }
	return $js;
}
}
?>