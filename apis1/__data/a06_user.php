<?php
//from: tsy/6user
$rootPATH = realpath($_SERVER['DOCUMENT_ROOT']);
$ADMS_NOLOGIN = true;
$D = $_GET;$_POST;
if($ADMS_MET == 'POST'){
	if(_js::isse($D['userEmail'])){ $js = _ADMS::jsonError(3,'Se debe digitar el email para continuar...'); }
	else{
		$qf = a_sql::fetch('SELECT U.userEmail, U.user FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' U WHERE userEmail=\''.$D['userEmail'].'\' OR user=\''.$D['user'].'\' LIMIT 1');
		if(a_sql::$errNo == 1){ $js = _ADMS::jsonError(1,'Opps! esto es embarazoso... Hay un problema con la base de datos, intenta nuevamente... Si el problema persite intentalo después... Lo solucionaremos pronto.'); }
		else if($qf['userEmail'] == $D['userEmail']){ $js = _ADMS::jsonError(3,'El correo ya se encuentra registrado.'); }
		else if($qf['user'] == $D['user']){ $js = _ADMS::jsonError(3,'Ya existe un usuario registrado como '.$D['user'].'.'); }
		else{
			if(_js::isse($D['ocardName'])){ $js = _ADMS::jsonError(3,'Se debe definir el nombre de la empresa.'); }
			else if(_js::isse($D['pass'])){ $js = _ADMS::jsonError(3,'Se debe definir una contraseña para continuar.'); }
			else{
				$Dcard = array('ocardName'=>$D['ocardName']);
				unset($D['ocardName']);
				$D['password'] = $D['pass']; unset($D['pass']);
				$ins = a_sql::insert($D,array('POST'=>true,'table'=>_ADMS::$TBSoc['A0_vs0_ousr'],'wh_change'=>'WHERE userId=\'newS\' LIMIT 1'));
				$insCard = a_sql::insert($Dcard,array('POST'=>true,'table'=>_ADMS::$TBSoc['A0_par_ocrd'],'wh_change'=>'WHERE ocardId=\'newS\' LIMIT 1'));
				$DcardSoc = array('ocardId'=>$insCard['insertId'],'socName'=>$D['ocardName']);
				$insSoc = a_sql::insert($DcardSoc,array('POST'=>true,'table'=>_ADMS::$TBSoc['A0_par_crd1'],'wh_change'=>'WHERE ocardId=\'newS\' LIMIT 1'));
				if($ins['err']){ $js = _ADMS::jsonError(1,'Error creando Usuario: '.$ins['err']['error_sql']); }
				else if($insCard['err']){ $js = _ADMS::jsonError(1,'Error creando cliente: '.$insCard['err']['error_sql'].' '._ADMS::$TBSoc['A0_par_ocrd']);
						a_sql::query('DELETE FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' WHERE userId=\''.$ins['insertId'].'\' LIMIT 1');
				}
				else if($insSoc['err']){ $js = _ADMS::jsonError(1,'Error creando Sociedad: '.$insSoc['err']['error_sql']);
						a_sql::query('DELETE FROM '._ADMS::$TBSoc['A0_vs0_ousr'].' WHERE userId=\''.$ins['insertId'].'\' LIMIT 1');
						a_sql::query('DELETE FROM '._ADMS::$TBSoc['A0_par_ocrd'].' WHERE ocardId=\''.$insCard['insertId'].'\' LIMIT 1');
				}
				else{
					$js = _ADMS::jsonResp('El usuario puede continuar siendo creado...');
					$D2 = array('ocardId'=>$insCard['insertId'],'userId'=>$ins['insertId'],'type'=>'admin');
					$ins2 = a_sql::insert($D2,array('POST'=>true,'table'=>_ADMS::$TBSoc['A0_par_ousm'],'wh_change'=>'WHERE userId=\'newS\' LIMIT 1'));
					print_r($ins2);
				}
			}
		}
	}
	echo $js;
}
else{ echo '{"errNo":3, "text":"APPKey no Defined"}'; }
mysqli_close(a_sql::$DB);
?>