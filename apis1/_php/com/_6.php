<?php
class _6{
static public function Obj_put($P=array(),$O=array()){
	$a = $P['a'];
	$objType = $P['objType'];
	//
	if($objType == 'activity'){
		switch($a){
			case 'create' : $D = array('action'=>'create','lineMemo'=>'Actividad Creada.'); break;
			case 'actType' : $D['lineMemo'] = 'Tipo Actividad Actualizado'; break;
			case 'actStatus' : $D['lineMemo'] = 'Estado Actualizado'; break;
			case 'actPriority' : $D['lineMemo'] = 'Prioridad Actualizada'; break;
			case 'archived' : 
				$D['lineMemo'] = ($O[$a] == 'Y') ? 'Desarchivada' : 'Archivada';
			break;
		}
	}
	;if($objType != ''){
		switch($P['targetType']){
			case 'comment' : $D = array('action'=>'create','lineMemo'=>$P['lineMemo']); break;
			case 'fileUpd' : $D = array('action'=>'create','lineMemo'=>$P['lineMemo']); break;
		}
	}
	if($D['lineMemo'] != ''){
		$D['v1'] = $O[$a]; $D['v2'] = $P[$a];
		if($D['action'] != 'create' && $D['v1'] == $D['v2']){ return ''; }
		$D['objType'] = $objType; $D['objRef'] = $P['objRef'];
		$D['targetType'] = $P['targetType']; $D['targetRef'] = $P['targetRef'];
		$D['dateC'] = date('Y-m-d H:i:s');
		$D['fieldName'] = $a;
		$ins = a_sql::insert($D,array('POST'=>true,'user'=>1,'table'=>ADMS::$TBSoc['ap99_oobj']));
	}
}

static public function ouFn($P=array(),$jsResp=array()){
	if($P['o'] == 'no'){} else{ self::o_put($P); }
	$o = $P['objType']; $t = $P['targetType']; $r1 = $P['ref1Type'];
	$objD = array();
	if($o=='activity'){ $objD = _5a::i_get($P['objRef']); }
	$objType = $P['objType'];
	$B = array('objType'=>$o,'objRef'=>$P['objRef'], 'targetType'=>$P['targetType'],'targetRef'=>$P['targetRef']);
	//notify Review insert
	$n = ($P['__notiVerif']) ? array('__notiVerif'=>$P['__notiVerif']) : false;
	if($o == 'activity' && $t =='wboList'){ $n['akey'] = 'activityOnwboList'; }
	if($P['ref1Type'] == 'fieldName' && $P['ref1'] =='actStatus' && $P['ref1Memo'] == 'completed'){
		$n['akey'] = 'activityCompleted';
	}
	if($P['ref1Type'] == 'fieldName' && $P['ref1'] =='archived' && $P['ref1Memo'] == 'Y'){
		$n['akey'] = 'activityArchived';
	}
	$uFp = ($o == 'comment' || $o=='fileUpd' ||
	($o == 'activity' && $t=='wboList') ||
	($P['ref1Type'] != '')
	);
	if(is_array($n)){
		$n = _js::push($B,$n);
		$r = self::n_put($n,$objD);
		$toNode = array('n'=>$r);
	}
	if($uFp){
		$uF = array('ref1Type'=>$P['ref1Type'],'ref1'=>$P['ref1'],'ref1Memo'=>$P['ref1Memo']);
		if($P['ref1'] == 'userAssg' && $P['ref1Memo'] == ''){ $uF['verb'] = 'delete'; }
		if($P['delete']){ $uF['verb'] = 'delete'; }
		$Di2 = _js::push($B,$uF);
		_6::uF_put($Di2);
	}
	//if($_COOKIE['ocardSocId']*1 == 2){ echo 'ALERTJSON'; }
	if($jsResp['text']){
		$toNode['add'] = $jsResp['add'];
		$js = _ADMS::jsonResp($jsResp['text'],$toNode);
		return $js;
	}
}

static public function o_put($P=array()){
	$insertEver = false;
	switch($P['objType']){
		case 'of1_drc1' : $insertEver = true; break;
	}
	$wh_insertEver = ($insertEver || $P['insertEver']) ? ' AND id=\'insert\' ' : '';
	$P['targetId'] = ($P['targetRef']) ? $P['targetRef'] : $P['targetId'];
	unset($P['targetRef']);
	$au = '/^(objType|objRef|targetType|targetId|targetRef|relType|relRef|cardId|cardName|contId|contName|oppId|oppName|lineMemo|lineTitle|userAssg|userAssgName|doDate|addData)$/';
	foreach($P as $k =>$v){
		if(!preg_match($au,$k)){ unset($P[$k]); }
	}
	$P['date1'] = date('Y-m-d H:i:s');
	if(!isset($P['doDate'])){ $P['doDate'] = $P['date1']; }
	$targetType = $P['targetType']; $targetId = $P['targetId'];
	$noUpd = ($targetType != 'activity') ? '' : '';
	$P['userId'] = a_ses::$userId;
	$P['userName'] = a_ses::$userName;
	$wh_upd = 'objType=\''.$P['objType'].'\' AND objRef=\''.$P['objRef'].'\'';
	$ins = a_sql::insert($P,array('table'=>_ADMS::$TBSoc['ap2_oobj'],'wh_change'=>'WHERE '.$wh_upd.' '.$wh_insertEver.' LIMIT 1','no_update'=>'date1'.$noUpd));
	self::o_counts($P,'++');
}

static public function uF_put($P=array()){
	/* Controla actualización a nivel de objecto
		verb:add,create..
		dateC:
		objType, objRef, targetType, targetRef
		ref1Type:{fieldName || ''}
		ref1: actType || ''
		ref1Memo: visit || ''
		ref2Type, ref2, ref2Memo
		userId, userName: Quien hace la acción
	*/
	//P = $B;
	$Di = $P;
	$o = $P['objType']; $t = $P['targetType']; $r1 = $P['ref1Type'];
	if($o == _o::$Ty['comment'] || $o == _o::$Ty['fileUpd']){
		if(!preg_match('/^'._o::$Ty['activity'].'$/',$t)){ return ''; }
	}
	switch($o){
		case _o::$Ty['activity']:{
			if($t == 'wboList'){ $Di['verb'] = 'add'; }
		break; }
	}
	switch($r1){
		case 'fieldName' : $Di['verb'] = 'update'; break;
	}
	if($P['verb'] == 'delete'){
		$Di['verb'] = 'delete';
		if($o == 'fileUpd'){
			$q = a_sql::query('DELETE FROM '._ADMS::$TBSoc['ap0_oufo'].' WHERE verb=\'create\' AND objType=\''.$o.'\' AND objRef=\''.$P['objRef'].'\' LIMIT 1');
		}
	}
	$Di['dateC'] = date('Y-m-d H:i:s');
	$Di['userId'] = a_ses::$userId;
	$Di['userName'] = a_ses::$userName;
	$ins = a_sql::insert($Di,array('POST'=>true,'table'=>_ADMS::$TBSoc['ap0_oufo']));
}

static public function n_put($P=array(),$objD=array()){
	//$objD = viene desde ouFn-> del objType
	$verif = $P['__notiVerif']; unset($P['__notiVerif']);
	$toNode = array();
	$o = $P['objType']; $t = $P['targetType'];
	$u = a_ses::$userId;
	$userAssg = $objD['userAssg'];
	$akey = $P['akey'];
	if($o == 'activity'){
		$Di = _js::push($P,array('noTypeApp'=>'activity','userFrom'=>$u));
	}
	$iso = ($objD['userId'] == $u && $objD['userAssg'] != $u);
	$isa = ($objD['userAssg'] == $u && $objD['userId'] != $u);
	switch($akey){
		case 'activityOnwboList':{
			$qBo = _5b::i_list($P['targetRef']);
			if($qBo['userId'] != $u){//notificar al usuario del tablero
				$Di['verb'] = 'add'; $Di['akey'] = $akey;
				$Di['userId'] = $qBo['userId'];
				$ins = a_sql::insert($Di,array('POST'=>true,'table'=>_ADMS::$TBSoc['ap2_onot']));
				$toNode[] = array('userRoom'=>$Di['userId'],'objType'=>_o::$Ty['workBoard'],'objRef'=>$qBo['wboId'],'lineMemo'=>'Actividad añadida a tablero.');
			}
		break;}
		case 'activityCompleted' :{
			$Di['userId'] = ($iso) ? $objD['userAssg'] : $objD['userId'];
			if($iso || $isa){
				$Di['verb'] = 'update'; $Di['akey'] = $akey;
				$ins = a_sql::insert($Di,array('POST'=>true,'table'=>_ADMS::$TBSoc['ap2_onot']));
				$toNode[] = array('userRoom'=>$Di['userId'],'objType'=>_o::$Ty['activity'],'objRef'=>$P['objRef'],'lineMemo'=>'Actividad marcada como completa.');
			}
		break;}
		case 'activityArchived' :{
			$Di['userId'] = ($iso) ? $objD['userAssg'] : $objD['userId'];
			if($iso || $isa){
				$Di['verb'] = 'update'; $Di['akey'] = $akey;
				$ins = a_sql::insert($Di,array('POST'=>true,'table'=>_ADMS::$TBSoc['ap2_onot']));
				$toNode[] = array('userRoom'=>$Di['userId'],'objType'=>_o::$Ty['activity'],'objRef'=>$P['objRef'],'lineMemo'=>'Actividad Archivada.');
			}
		break;}
	}
	if($verif == true){
		if($userAssg!= '' && $userAssg != $u){
			$Di['userId'] = $userAssg;
			$Di['verb'] = 'add'; $Di['akey'] = 'activityAssg';
			$Di['userId'] = $userAssg;
			$ins = a_sql::insert($Di,array('POST'=>true,'table'=>_ADMS::$TBSoc['ap2_onot']));
			$toNode[] = array('userRoom'=>$Di['userId'],'objType'=>_o::$Ty['activity'],'objRef'=>$P['objRef'],'lineMemo'=>'Te asignaron una actividad.');
		}
	}
	return $toNode;
}

static public function put($D=array()){//si
	/* Controla actualización a nivel de objecto
		verb:add,create..
		dateC:
		objType, objRef, targetType, targetRef
		ref1Type:{fieldName || ''}
		ref1: actType || ''
		ref1Memo: visit || ''
		ref2Type, ref2, ref2Memo
		userId, userName: Quien hace la acción
	*/
	$sameTarget = false;
	$verbDef = $D['verb'];
	//solo autorizadas
	if($D['objType'] == 'comment' || $D['objType'] == 'fileUpd'){
		if(!preg_match('/^activity$/',$D['targetType'])){ return ''; }
	}
	switch($D['k']){
		case 'activity_on_wboList' : 
			if($D['actId']){ $D['objRef'] = $D['actId']; }
			if($D['wboListId']){ $D['targetRef'] = $D['wboListId']; }
			$D = array('verb'=>'add','objType'=>'activity','objRef'=>$D['objRef'],'targetType'=>'wboList','targetRef'=>$D['targetRef']);
			if($verbDef!=''){ $D['verb'] = $verbDef; }
		break;
		case 'activity_fieldName':
			$D = array('verb'=>'update','objType'=>'activity','objRef'=>$D['objRef'],'ref1Type'=>'fieldName','ref1'=>$D['ref1'],'ref1Memo'=>$D['ref1Memo']);
		break;
	}
	unset($D['k']);
	if($D['verb'] == 'delete'){
		if($D['objType'] == 'fileUpd'){
			$q = a_sql::query('DELETE FROM '._ADMS::$TBSoc['ap0_oufo'].' WHERE verb=\'create\' AND objType=\''.$D['objType'].'\' AND objRef=\''.$D['objRef'].'\' LIMIT 1');
		}
	}
	$ins = a_sql::insert($D,array('u_dateC'=>1,'POST'=>true,'table'=>_ADMS::$TBSoc['ap0_oufo']));
}

static public function o_del($P=array()){//si
	$wh_del = (preg_match('/^(comment|fileUpd)$/i',$P['objType']))
	? 'objType=\''.$P['objType'].'\' AND objRef=\''.$P['objRef'].'\''
	: 'targetType=\''.$P['targetType'].'\' AND targetId=\''.$P['targetId'].'\'';
	$qObj = a_sql::fetch('SELECT objType, targetType,targetId targetRef FROM '._ADMS::$TBSoc['ap2_oobj'].' WHERE '.$wh_del.' LIMIT 1');
	_6::o_counts($qObj,'--');
	$cList = a_sql::query('DELETE FROM '._ADMS::$TBSoc['ap2_oobj'].' WHERE '.$wh_del.' LIMIT 1');
}

static public function o_counts($D=array(),$action=''){
	$o = $D['objType']; $t = $D['targetType'];
	$D['targetRef'] = ($D['targetId']) ? $D['targetId'] : $D['targetRef'];
	switch($t){
		case 'activity' :{
			if($o == 'comment'){
				$act = ($action == '++') ? 'commTotal+1' : 'commTotal';
				$act = ($action == '--') ? 'commTotal-1' : $act;
				$upd = a_sql::query('UPDATE '._ADMS::$TBSoc['ap1_oact'].' SET commTotal='.$act.' WHERE actId=\''.$D['targetRef'].'\' LIMIT 1');
			}
			else if($o == 'fileUpd'){
				$act = ($action == '++') ? 'fileTotal+1' : 'fileTotal';
				$act = ($action == '--') ? 'fileTotal-1' : $act;
				$upd = a_sql::query('UPDATE '._ADMS::$TBSoc['ap1_oact'].' SET fileTotal='.$act.' WHERE actId=\''.$D['targetRef'].'\' LIMIT 1');
			}
			else if($o == 'checkList'){
				$act = ($action == '++') ? 'ckTotal=ckTotal+1' : 'ckTotal=ckTotal,ckComplet=ckComplet';
				$act = ($action == '--') ? 'ckTotal=ckTotal-1' : $act;
				//elimnar activo
				$act = ($action == 'delComplet --') ? 'ckTotal=ckTotal-1,ckComplet=ckComplet-1' : $act;
				$act = ($action == 'complet ++') ? 'ckComplet=ckComplet+1' : $act;
				$act = ($action == 'complet --') ? 'ckComplet=ckComplet-1' : $act;
				$upd = a_sql::query('UPDATE '._ADMS::$TBSoc['ap1_oact'].' SET '.$act.' WHERE actId=\''.$D['targetRef'].'\' LIMIT 1');
			}
			else if($o == 'subtask'){
				$act = ($action == '++') ? 'ckTotal=ckTotal+1' : 'ckTotal=ckTotal,ckComplet=ckComplet';
				$act = ($action == '--') ? 'ckTotal=ckTotal-1' : $act;
				//elimnar activo
				$act = ($action == 'delComplet --') ? 'ckTotal=ckTotal-1,ckComplet=ckComplet-1' : $act;
				$act = ($action == 'complet ++') ? 'ckComplet=ckComplet+1' : $act;
				$act = ($action == 'complet --') ? 'ckComplet=ckComplet-1' : $act;
				$upd = a_sql::query('UPDATE '._ADMS::$TBSoc['ap1_oact'].' SET '.$act.' WHERE actId=\''.$D['targetRef'].'\' LIMIT 1');
			}
			break;}
	}
}

//new
static public function qu($D){
	if($D['objType'] == 'workBoard'){
		$objType = 'workBoard';;
		$objWh = 'wboList';
		_ADMS::_lb('sql/get');
		$wboIds = a_sql_get('SELECT wboListId FROM ap1_wbo1 WHERE wboId=\''.$D['objRef'].'\' ',array('f'=>'wboListId','g'=>','));
		$q = 'SELECT 
A.id id0, A.verb verb0, A.objType objType0, A.objRef objRef0,
A1.*, WB0.wboName, WB1.listName, ACT0.actAsunt, 
COM0.comment, 
FUP0.url fi_url, FUP0.fileName fi_fileName
FROM '._ADMS::$TBSoc['ap0_oufo'].' A
LEFT JOIN '._ADMS::$TBSoc['ap0_oufo'].' A1 ON 
(
	(A.objType=\'activity\' 
	AND (
	(A1.objType=\'activity\' AND A1.objRef = A.objRef AND A1.ref1Type IN (\'fieldName\') )
	OR
	(A1.targetRef = A.objRef AND A1.objType IN(\'activity\',\'comment\',\'fileUpd\') ) 
	)
	)
	OR
	(A1.id = A.id)
)
LEFT JOIN ap1_owbo WB0 ON (
	(A.targetType=\''.$objType.'\' AND WB0.wboId = A.targetRef) 
	OR 
	(A.objType=\''.$objType.'\' AND WB0.wboId = A.objRef)
)
LEFT JOIN ap1_wbo1 WB1 ON (
	(A.objType=\'wboList\' AND WB1.wboListId = A.objRef) 
	OR 
	(A1.targetType=\'wboList\' AND WB1.wboListId = A1.targetRef)
)
LEFT JOIN ap1_oact ACT0 ON (A.objType=\'activity\' AND ACT0.actId = A.objRef)
LEFT JOIN a10cr1 COM0 ON (A1.objType=\'comment\' AND COM0.id = A1.objRef)
LEFT JOIN a10fr1 FUP0 ON (A1.objType=\'fileUpd\' AND FUP0.id = A1.objRef)
WHERE 
(A.objType = \''.$objType.'\' AND A.objRef=\''.$wboId.'\')
OR
(A.objType = \''.$objWh.'\' AND A.objRef IN ('.$wboIds.') )
OR
(A.targetType=\''.$objWh.'\' AND A.targetRef IN ('.$wboIds.') )
GROUP BY A1.id 
ORDER BY A1.id DESC';
	}
	else if($D['objType'] == 'activity'){
		$objType = 'activity';;
		$objWh = 'activity';
		$wboIds = $D['objRef'];
		$q = 'SELECT 
A.id id0, A.verb verb0, A.objType objType0, A.objRef objRef0,
A1.*, WB0.wboName, WB1.listName, ACT0.actAsunt, 
COM0.comment, 
FUP0.url fi_url, FUP0.fileName fi_fileName
FROM '._ADMS::$TBSoc['ap0_oufo'].' A
LEFT JOIN '._ADMS::$TBSoc['ap0_oufo'].' A1 ON 
(
	(A1.targetRef=\'activity\' AND A1.targetRef=A.objRef)
	OR (A1.id = A.id)
)
LEFT JOIN ap1_owbo WB0 ON (
	(A.targetType=\''.$objType.'\' AND WB0.wboId = A.targetRef) 
	OR 
	(A.objType=\''.$objType.'\' AND WB0.wboId = A.objRef)
)
LEFT JOIN ap1_wbo1 WB1 ON (
	(A.objType=\'wboList\' AND WB1.wboListId = A.objRef) 
	OR 
	(A1.targetType=\'wboList\' AND WB1.wboListId = A1.targetRef)
)
LEFT JOIN ap1_oact ACT0 ON (
	(A.objType=\'activity\' AND ACT0.actId = A.objRef)
	OR (A.targetType=\'activity\' AND ACT0.actId = A.targetRef)
)
LEFT JOIN a10cr1 COM0 ON (A1.objType=\'comment\' AND COM0.id = A1.objRef)
LEFT JOIN a10fr1 FUP0 ON (A1.objType=\'fileUpd\' AND FUP0.id = A1.objRef)
WHERE 
(A.objType = \''.$objType.'\' AND A.objRef IN ('.$wboIds.') )
OR
(A.objType = \''.$objWh.'\' AND A.objRef IN ('.$wboIds.') )
OR
(A.targetType=\''.$objWh.'\' AND A.targetRef IN ('.$wboIds.') )
GROUP BY A1.id 
ORDER BY A1.id DESC';
	}
	
	return $q;
}

static public function Obj_get($D=array()){
	{//q 
	$q = a_sql::query(self::qu($D)); }
	if($D['get']== 'query'){ return $q; } 
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$q['error_sql']);}
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se encontraron resultados.'); }
	else{ 
		while($L = $q->fetch_assoc()){
			if($L['objType'] != 'comment'){ unset($L['comment']); }
			if($L['objType'] != 'fileUpd'){ unset($L['fi_url'],$L['fi_fileName']); }
			$js .= a_sql::JSON($L).',';
		}
		$js = '{
 "objType":"'.$D['objType'].'","objRef":"'.$D['objRef'].'",
 "DATA":['.substr($js,0,-1).'
]}';
	}
	return $js;
}
}
?>