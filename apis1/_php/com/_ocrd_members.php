<?php
//must call _ocrd
class _ocrd_members{
static function put($D=array()){
	$au = (_js::isse($D['cardId'])) ? '' : _ocrd::userAuth($D['cardId']);
	
	if($au == ''){ $js = _ADMS::jsonError(3,'No se ha definido el socio de negocios. ('.$D['cardId'].')'); }
	else if(!$au){ $js = _ADMS::jsonError(4,'Solo el propietario o responsable pueden modificar los colaboradores.'); }
	else if(count($D['AUTY'])==0){ $js = _ADMS::jsonResp(''); }
	else{
		$err = 0;
		foreach($D['AUTY'] as $ln => $D1){
			$line = 'Linea '.$ln.' : ';
			if($au['userId'] == $D1['userId'] || $au['userAssg'] == $D1['userId']){
				unset($D['AUTY'][$ln]); continue;
			}
			if(_js::isse($D1['userId'])){ $js = _ADMS::jsonError(3,$line.'No se ha definido el usuario.'); $err++; break; }
		}
		if($err == 0){
			foreach($D['AUTY'] as $ln => $D1){
			$D1['cardId'] = $D['cardId'];
			$line = 'Linea '.$ln.' : ';
			$D1['userCreat'] = a_ses::$userId; $D1['dateC'] = date('Y-m-d H:i:s');
			$ins = a_sql::insert($D1,array('table'=>_ADMS::$TBSoc['par_aut1'],'wh_change'=>'WHERE cardId=\''.$D['cardId'].'\' AND userId=\''.$D1['userId'].'\' LIMIT 1'));
			if($ins['err']){ $js .= _ADMS::jsonError(1,$line.$ins['err']['error_sql']).','; }
			else{ $js .= _ADMS::jsonResp($line.'Guardada correctamente.').','; }
			}
			$js = '{"respChild":['.substr($js,0,-1).']} ';
		}
	}
	return $js;
}

static function get($D=array()){
	$qu = a_sql::query('SELECT AUR.*, U.userName,Uc.userName userCreatName FROM '._ADMS::$TBSoc['par_aut1'].' AUR INNER JOIN '._ADMS::$TBSoc['A0_vs0_ousr'].' U ON (U.userId = AUR.userId) INNER JOIN '._ADMS::$TBSoc['A0_vs0_ousr'].' Uc ON (Uc.userId = AUR.userCreat) WHERE AUR.cardId = \''.$D['cardId'].'\' ORDER BY U.userName ASC ');
	if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,$qu['error_sql']); }
	else if(a_sql::$errNo == 2){ $js = _ADMS::jsonError(2,'No se han definido colaboradores.'); }
	else{
		while($L = $qu->fetch_assoc()){ $js .= a_sql::JSON($L).','; }
		$js = '{"DATA":['.substr($js,0,-1).'
]}';
	}
	return $js;
}
}

?>