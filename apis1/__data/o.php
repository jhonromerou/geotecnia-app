<?php
header('Content-Type: application/json');
$D = $_POST;
class o_userMembers{

static function isOwner($P=array(),$P2=array()){
	if(_js::isse($P['objType']) || _js::isse($P['objRef'])){ $jsA = array('errNo'=>1,'text'=>'No se encontró referencia a ningún objeto.'); }
	else{
		$qo = a_sql::fetch('SELECT O.userId, O1.userId userMember, O1.perms FROM '._0s::$Tb['ap0_oobj'].' O LEFT JOIN '._0s::$Tb['ap0_obj1'].' O1 ON (O1.objType = O.objType AND O1.objRef = O.objRef) WHERE O.objType=\''.$P['objType'].'\' AND O.objRef =\''.$P['objRef'].'\' AND (O.userId=\''.a_ses::$userId.'\' OR (O1.userId=\''.a_ses::$userId.'\') ) LIMIT 1');
		if(a_sql::$errNo==1){ $jsA = array('errNo'=>1,'text'=>'Error consultando propietarios: '.$qo['error_sql']); }
		else if(a_sql::$errNo==2){ $jsA = array('errNo'=>4,'text'=>'Su usuario no tiene permisos para realizar la acción.'); }
		else{
			if($qo['userId'] == a_ses::$userId){ $qo['owner'] = 'Y'; }
			if($qo['userMember']){
				$qo['ok'] = 1; $qo['text'] = 'El usuario miembro tiene permisos: '.$qo['userMember'].'.'.$qo['perms'];
			}
			if($P2['isOwner']){
				if($qo['owner'] != 'Y' && $qo['perms'] != 'coowner'){ return array('errNo'=>4,'text'=>'Solo el propietario o un co-propietario pueden modificar los miembros de la carpeta.'); }
			}
			$jsA = $qo;
		}
	}
	return $jsA;
}
}

if($ADMS_KEY == 'userMembers'){
if($ADMS_MET == 'GET'){
	$objType = $D['objType']; $objRef = $D['objRef'];
	if(_js::isse($objType) || _js::isse($objRef)){ $js = _ADMS::jsonError(3,'No se encontró referencia a ningún objeto.'); }
	else{
		$q = a_sql::query('SELECT obj1.*, Usr.userName FROM '._0s::$Tb['A0_vs0_ousr'].' Usr INNER JOIN '._0s::$Tb['ap0_obj1'].' obj1 ON (obj1.userId =Usr.userId) WHERE obj1.objType=\''.$objType.'\' AND obj1.objRef=\''.$objRef.'\' ',
		array('errNo'=>array(1=>'Error obtiendo miembros del elemento: ',2=>'No se encontraron miembros relacionados.'))
		);
		if(a_sql::$errNoText){ $js = a_sql::$errNoText; }
		else{
			while($L=$q->fetch_assoc()){
				$js .= a_sql::JSON($L).',';
			}
			$js = '{"L":['.substr($js,0,-1).']}';
		}
	}
	echo $js;
}
else if($ADMS_MET == 'PUT'){
	$Dr = $D; unset($D['userName']);
	if(_js::isse($D['objType']) || _js::isse($D['objRef'])){ $js = _ADMS::jsonError(3,'No se encontró referencia a ningún objeto.'); }
	else if(_js::isse($D['userId']) || _js::isse($D['perms'])){
		$js = _ADMS::jsonError(3,'Se debe definir el usuario y permiso.');
	}
	else{
		$isOw = o_userMembers::isOwner($D,array('isOwner'=>1));
		if($isOw['errNo']){ $js = _ADMS::jsonError($isOw); }
		else if($isOw['userId'] == $D['userId']){ $js = _ADMS::jsonError(3,'El usuario que intenta definir es el propietario del elemento.'); }
		else{
			$ins = a_sql::insert($D,array('table'=>_0s::$Tb['ap0_obj1'],'wh_change'=>'WHERE objType=\''.$D['objType'].'\' AND objRef=\''.$D['objRef'].'\' AND userId=\''.$D['userId'].'\' LIMIT 1'));
			if($ins['err']){ $js = _ADMS::jsonError(1,$ins['error_sql']); }
			else{
				$Dr['text'] = 'Usuario asignado correctamente';
				$js = json_encode($Dr);
			}
		}
	}
	echo $js;
}
else if($ADMS_MET == 'DELETE'){
	if(_js::isse($D['userId'])){ echo _ADMS::jsonError(3,'No se ha definido la ID del usuario.'); }
	else{
		$isOw = o_userMembers::isOwner($D,array('isOwner'=>1));
		if($isOw['errNo']){ $js = _ADMS::jsonError($isOw); }
		else{
			$qd = a_sql::query('DELETE FROM '._0s::$Tb['ap0_obj1'].' WHERE objType=\''.$D['objType'].'\' AND objRef=\''.$D['objRef'].'\' AND userId=\''.$D['userId'].'\' LIMIT 1');
			if(a_sql::$errNo==1){ $js = _ADMS::jsonError(1,'Error eliminando usuario: '.$qd['error_sql'].'.'); }
			else{ $js = _ADMS::jsonResp('Usuario eliminado correctamente.'); }
		}
	}
	echo $js;
}
}
mysqli_close(a_sql::$DB);
?>