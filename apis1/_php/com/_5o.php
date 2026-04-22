<?php
class _5o {
static $bussPartner = 'bussPartner';
static public function members_get($P=array()){
	$q = a_sql::query('SELECT oMB.*, U.user, U.userName FROM '._0s::$Tb['ap0_ombo'].' oMB INNER JOIN '._0s::$Tb['A0_vs0_ousr'].' U ON (U.userId = oMB.userMember) WHERE oMB.objType=\''.$P['objType'].'\' AND oMB.objRef=\''.$P['objRef'].'\' ');
	if(a_sql::$errNo == 1){ $js = _js::e(1,$q['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _js::e(2,'No se han encontrado miembros. ('.$P['objRef'].')'); }
	else{
		while($L=$q->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '{"DATA":['.substr($js,0,-1).'
]}';
	}
	echo $js;
}

static public function members_put($P=array()){
	$o = array(); $u = a_ses::$userId;
	if($P['objType'] == '' || $P['objRef'] == ''){ $js = _js::e(5,'No se ha definido el objeto.'); }
	else{ _ADMS::_lb('apps/tickan');
		if($P['objType'] == _o::$Ty['activity']){ $o = _5a::i_get($P['objRef']); }
		if($o['userId'] != $u && $o['userAssg'] != $u){ $js = _js::e(4,'Solo el usuario o responsable pueden definir los miembros.'); }
		else{
			$ins = a_sql::insert($P,array('table'=>_0s::$Tb['ap0_ombo'],'wh_change'=>'WHERE objType=\''.$P['objType'].'\' AND objRef=\''.$P['objRef'].'\' AND userMember=\''.$P['userMember'].'\' LIMIT 1'));
			if($ins['err']){ $js = _js::e(1,$ins['err']['error_sql']); }
			else{ 
				$Pb = array('objpType'=>$P['objType'],'objpRef'=>$P['objRef'],'f'=>'uMembers');
				$Pb['a'] = ($P['delete']) ? '--' : '++';
				_5o::tb_upd($Pb);
				$js = _ADMS::jsonResp('Se definió como miembro al usuario.');
			}
		}
	}
	return $js;
}

//revisar antes de enviar
static public function Rv_onPost($P=array()){//nuevo en _o::userPerms
	//permisos de comentarios en actividades
	//if($_COOKIE['ocardSocId'] != 2){ return 'Y'; }
	$uS = a_ses::$userId; $r = 'Y';
	$o = $P['objType']; $t = $P['targetType'];
	$oR = $P['objRef']; $tR = $P['targetRef'];
	if($t== _o::$Ty['activity']){
		$whUser = self::u_owAssg($t);
		$q1 = a_sql::fetch('SELECT ACT0.userId, ACT0.userAssg, MBO.* FROM '._0s::$Tb['ap1_oact'].' ACT0 LEFT JOIN '._0s::$Tb['ap0_ombo'].' MBO ON (MBO.objType=\''._o::$Ty['activity'].'\' AND MBO.objRef = ACT0.actId ) WHERE  ACT0.actId=\''.$P['targetRef'].'\' '.$whUser.' LIMIT 1');
		if(a_sql::$errNo == 1){
			return array('r'=>'N','js'=>_js::e(1,'Error MBO: '.$q1['error_sql']));
		}
		else if($q1['userId'] == $uS || $q1['userAssg'] == $uS){ $r = 'Y'; }
		else if($o == 'comment' && $q1['ocomment'] == 'Y'){ $r = 'Y'; }
		else if($o == 'fileUpd' && $q1['ofileUpd'] == 'Y'){ $r = 'Y'; }
		else{
			$q2 = a_sql::fetch('SELECT oWBO.userId userBoard ,WBO20.userId userMemberBoard FROM '._0s::$Tb['ap1_wbo10'].' WBO10 INNER JOIN '._0s::$Tb['ap1_wbo1'].' WBO1 ON (WBO1.wboListId = WBO10.wboListId) INNER JOIN '._0s::$Tb['ap1_owbo'].' oWBO ON (oWBO.wboId = WBO1.wboId) LEFT JOIN '._0s::$Tb['ap1_wbo20'].' WBO20 ON (WBO20.wboId = WBO1.wboId) WHERE WBO10.actId =\''.$tR.'\' AND (oWBO.userId=\''.$uS.'\' OR WBO20.userId=\''.$uS.'\') LIMIT 1');
			if(a_sql::$errNo == 1){
				return array('r'=>'N','js'=>_js::e(1,'Error WBO20: '.$q2['error_sql']));
			}
			else if($q2['userBoard'] == $uS || $q2['userMemberBoard'] == $uS){ $r = 'Y'; }
			else{ $r = 'N'; }
		}
	}
	if($r == 'N'){
		if($o == _o::$Ty['comment'] && $t == _o::$Ty['activity']){
			$r = array('r'=>$r,'js'=>_js::e(4,'No puedes realizar comentarios en esta tarjeta.'));
		}
		else if($o == _o::$Ty['fileUpd'] && $t == _o::$Ty['activity']){
			$r = array('r'=>$r,'js'=>_js::e(4,'No puedes añadir archivos en esta tarjeta.'));
		}
		else{
			$r = array('r'=>$r,'js'=>_js::e(4,'Not '.$o.' on '.$t.'.'));
		}
	}
	return $r;
}

static public function u_owAssg($o=''){//nuevo en _o ==
	$uS = a_ses::$userId;
	$whUser = '';
	if($o == _o::$Ty['activity']){
		$whUser = 'AND (ACT0.userId=\''.$uS.'\' OR ACT0.userAssg=\''.$uS.'\' OR MBO.userMember=\''.$uS.'\') ';
	}
	return $whUser;
}

static public function Au_byCode($P=array()){//AuTyCode
	/* code=bussPartnerData, u=userIdm, au=modify
	*/
	$resp;
	$o = $P['objType'];
	if($o==''){
		return array('errNo'=>5,'text'=>'objType no definido en _5o.Au_byCode.');
	}
	$globalUs = (a_ses::U_isType('suglobal'));
	if($globalUs){
		return array('ok'=>true,'su_perms'=>'suglobal','text'=>'Usuario Autorizado Globlamente.');
	}
	$c = $P['objRef'];
	$u = ($P['u']) ? $P['u'] : a_ses::$userId;
	$code = $P['code'];
	$pv = ($P['au']) ? $P['au'] : 'modify';
	$text = ($pv == 'modify') ? 'Modificar/Crear' : 'Ver';
	$q = a_sql::fetch('SELECT A.userId userOwn, A.userAssg, AUR.* FROM '._0s::$Tb['par_ocrd'].' A LEFT JOIN '._0s::$Tb['par_aut1'].' AUR ON (AUR.cardId=A.cardId AND AUR.userId=\''.$u.'\') WHERE A.cardId=\''.$c.'\' LIMIT 1');
	if(a_sql::$errNo == 1){ $resp = array('errNo'=>1,'text'=>$q['error_sql']); }
	else if(a_sql::$errNo == 2){ $resp = array('errNo'=>2,'text'=>'No se encontró el cliente '.$c.'.'); }
	else{
		$isU = ($q['userOwn'] == $u || $q['userAssg'] == $u || $q['userId'] == $u);
		$isSuP = (a_ses::$user == 'supersu');
		if($isSuP || ($isU && $q['auth'] == $pv)){ $resp = $q; }
		else{ $resp = array('errNo'=>3,'text'=>'No tiene permisos para '.$text.' esta información.'); }
	}
	return $resp;
}

static public function Au_wh($P=array()){
	return a_ses::soc_Au($P);
}

function tb_upd($D=array()){//actualizar members,comments
	$a = ($D['a'])? $D['a'] : '';
	if($D['objpType'] == _o::$Ty['activity']){
		switch($D['f']){
			case 'oSrc' : $uset = ' oSrc = oSrc'; break;
			case 'uMembers' : $uset = ' uMembers = uMembers'; break;
		}
		$uset = ($a == '++')? $uset.'+1' : $uset;
		$uset = ($a == '--')?$uset.'-1' : $uset;
		if($uset!=''){
			$wh = ($a=='--') ? 'AND '.$D['f'].'>0 ' : '';
			$qUpd = a_sql::query('UPDATE '._0s::$Tb['ap1_oact'].' SET '.$uset.' WHERE actId=\''.$D['objpRef'].'\' '.$wh.' LIMIT 1');
		}
	}
}

static function Se_get($P=array()){//usado en _rest/sea.php
	$o = $P['objType']; $text = $P['textSearch'];
	if(preg_match('/^bussPartner/',$o)){
		if($o=='bussPartnerGroups'){
		$sTe = a_sql::toSe($text);
		$qt = 'SELECT G0.groupId objRef, G0.groupName objText, G0.groupName lineText FROM '._0s::$Tb['par_ocgr'].' G0 
		WHERE 1  '.a_ses::get_owh('G0').' AND (G0.groupId=\''.$text.'\' OR G0.groupName '.$sTe.') LIMIT 10';
		}
		else{
		$cardType = ($o=='bussPartner_cust') ? 'C' : 'C';
		$cardType = ($o=='bussPartner_sup') ? 'S' : $cardType;
		$cardType = ($o=='bussPartner_emp') ? 'E' : $cardType;
		$o = 'bussPartner';
		$userRel = self::Au_wh(array('cardType'=>$cardType,'objType'=>_o::$Ty['bussPartner'],'whCode'=>'11-01'));
		$sTe = a_sql::toSe($text);
		$qt = 'SELECT A.cardId objRef, A.cardName objText, A.cardName lineText, A.cardCode FROM '._0s::$Tb['par_ocrd'].' A '.$userRel['inner'].' 
		WHERE A.cardType=\''.$cardType.'\' '.$userRel['wh'].' AND (A.addId=\''.$text.'\' OR A.cardCode '.$sTe.' OR A.cardName '.$sTe.' OR A.cardNameComer '.$sTe.') LIMIT 10';
		}
	}
	else if($o == 'userAssg'){
		$qt = 'SELECT A.userId objRef, A.userId objText, CONCAT(A.userName,\' (\',A.user,\')\') lineText FROM '._0s::$Tb['A0_vs0_ousr'].' A INNER JOIN '._0s::$Tb['A0_par_ousm'].' oUsm ON (oUsm.userId = A.userId) WHERE oUsm.ocardId=\''.a_ses::$ocardId.'\' AND (A.user '.a_sql::toSe($text).' OR A.userName '.a_sql::toSe($text).') LIMIT 10';
	}
	if($qt==''){ $js = _js::e(3,'No se realizó busquedad: o= '.$o.'.'); }
	else{
		$q = a_sql::query($qt);
		if(a_sql::$errNo==1){ $js = _js::e(1,$q['error_sql']); }
		else if(a_sql::$errNo==2){ $js = _js::e(2,'Sin coincidencias'); }
		else{
			while($L = $q->fetch_assoc()){
				$L['objType'] = $o;
				$js .= a_SQL::JSON($L).',';
			}
			$js = '{"DATA":['.substr($js,0,-1).']}';
		}
	}
	return $js;
}

static function src_get_v1($P=array()){
	$oPart = _o::$Ty['bussPartner'];
	$q = a_sql::query('SELECT O.*, A.cardName 
	FROM '._0s::$Tb['ap0_osrc'].' O 
	LEFT JOIN '._0s::$Tb['par_ocrd'].' A ON (O.objType=\''.$oPart.'\' AND A.cardId=O.objRef)
	WHERE O.objpType=\''.$P['objpType'].'\' AND O.objpRef=\''.$P['objpRef'].'\' ');
	if(a_sql::$errNo==1){ $js = _js::e(1,$q['error_sql']); }
	else if(a_sql::$errNo==2){ $js = _js::e(2,'No se encontraron relaciones.'); }
	else{
		while($L = $q->fetch_assoc()){
			$L['objText'] = ($L['objType']==$oPart) ? $L['cardName'] : $P['objType'];
			$js .= a_SQL::JSON($L).',';
		}
		$js = '{"DATA":['.substr($js,0,-1).']}';
	}
	return $js;
}

static function src_get($P=array()){
	$rels =$P['relations'];
	$fie = ''; $lefs = ''; 
	if(preg_match('/bussPartner/',$rels)){
		$fie = ',A.cardName objText';
		$lefs = 'LEFT JOIN '._0s::$Tb['par_ocrd'].' A ON (O.childType=\''._o::$Ty['bussPartner'].'\' AND A.cardId=O.childRef)';
	}
	$q = a_sql::query('SELECT O.*, O.childType objType, CONCAT(O.objType,\'-\',O.childType) objText '.$fie.'
	FROM '._0s::$Tb['ap0_obj2'].' O '.$lefs.'
	WHERE O.objType=\''.$P['objpType'].'\' AND O.objRef=\''.$P['objpRef'].'\' ');
	if(a_sql::$errNo==1){ $js = _js::e(1,$q['error_sql']); }
	else if(a_sql::$errNo==2){ $js = _js::e(2,'No se encontraron relaciones.'); }
	else{
		while($L = $q->fetch_assoc()){
			$js .= a_SQL::JSON($L).',';
		}
		$js = '{"DATA":['.substr($js,0,-1).']}';
	}
	return $js;
}

static function src_put($P=array()){
	//objpType, objType=child en ..se.form()
	$P['objType'] = preg_replace('/^bussPartner\_(cust|sup|emp)$/','bussPartner',$P['objType']);
	if(_js::ise($P['objpType']) || _js::ise($P['objType'])){ $js = _js::e(5,'objType relation undefined.'); }
	else{
		$wh = 'objType=\''.$P['objpType'].'\' AND objRef=\''.$P['objpRef'].'\' AND childType=\''.$P['objType'].'\' AND childRef=\''.$P['objRef'].'\' ';
		$P2 = array('objType'=>$P['objpType'],'objRef'=>$P['objpRef'],'childType'=>$P['objType'],'childRef'=>$P['objRef']);
		$ins = a_sql::insert($P2,array('u_dateC'=>1,'table'=>_0s::$Tb['ap0_obj2'],'wh_change'=>'WHERE '.$wh.' LIMIT 1'));
		if($ins['err']){ $js = _js::e(1,'Error realizando relación: '.$ins['err']['error_sql']); }
		else{ $P['f'] = 'oSrc'; $P['a'] = '++'; _5o::tb_upd($P);
			$js = _ADMS::jsonResp('Relación creada.');
		}
	}
	return $js;
}

static function src_delete($P=array()){
	if($js =_js::ise($P['osrcId'],array(5,'osrcId undefined.'))){}
	else{
		$P['delete'] = 'Y';
		$Pb = a_sql::fetch('SELECT * FROM '._0s::$Tb['ap0_obj2'].' WHERE osrcId=\''.$P['osrcId'].'\' LIMIT 1');
		$ins = a_sql::insert($P,array('table'=>_0s::$Tb['ap0_obj2'],'wh_change'=>'WHERE osrcId=\''.$P['osrcId'].'\' LIMIT 1'));
		if($ins['err']){ $js = _js::e(1,$ins['err']['error_sql']); }
		else{ $Pb['f'] = 'oSrc'; $Pb['a'] = '--'; _5o::tb_upd($Pb);
			$js = _ADMS::jsonResp('Relación eliminada correctamente.');
		}
	}
	return $js;
}

}

?>