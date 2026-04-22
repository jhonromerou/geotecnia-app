<?php
preg_match('/massData\/(.*)/',_0s::$router,$cK);
$rFile='sysd.'.str_replace('/','.',$cK[1]);
_ADMS::_app('_db/_TB');
if($cK[0]=='massData/parCrd'){
	_ADMS::_app('_db/tb_parCrd');
	if(_0s::$router=='GET massData/parCrd'){ a_ses::hashKey('sysd.suadmin');
		echo _TB::queryL('par_ocrd','cardCode,cardName,licTradType,licTradNum,slpId,RF_tipEnt,RF_regTrib,RF_mmag,fdpId,pymId',
		array('wh'=>$___D['wh'],1=>'Error obteniendo listado',2=>'No se encontraron resultados.')
		);
	}
	else if(_0s::$router=='PUT massData/parCrd'){ a_ses::hashKey('sysd.suadmin');
		_TB::revF('par_ocrd',$___D);
		if(_err::$err){ $js=_err::$errText; }
		else{ $js=_js::r('Datos de cliente actualizados correctamente'); }
		echo $js;
	}
}

else if($cK[0]=='massData/oitm'){
	_ADMS::_app('_db/tb_itmItm');
	$___D['wh']['itemType(E_in)']='P,MP,SE';
	if(_0s::$router=='GET massData/oitm'){ a_ses::hashKey('sysd.suadmin');
		echo _TB::queryL('itm_oitm','itemCode,itemName,webStatus,idAdd,itemGr,accGrId,handInv,udm,invPrice,defWhs,canNeg,invPrice,
		buyItem,buyUdm,buyVatPrc,buyPrice,buyFactor,
		sellItem,sellUdm,sellPrice,sellFactor,grsId',
		array('wh'=>$___D['wh'],'ordBy'=>'itemCode ASC',1=>'Error obteniendo listado',2=>'No se encontraron resultados.')
		);
	}
	else if(_0s::$router=='PUT massData/oitm'){ a_ses::hashKey('sysd.suadmin');
		_TB::revF('itm_oitm',$___D);
		if(_err::$err){ $js=_err::$errText; }
		else{ $js=_js::r('Artículo actualizado correctamente'); }
		echo $js;
}
}

else if($cK[0]=='massData/parCpr'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_app('_db/tb_parCprs');
	if(_0s::$router=='GET massData/parCpr'){
		echo _TB::queryL('par_ocpr','name,position,gender,licTradType,licTradNum,tel1,tel2,cellular,email,birthDay',
		array('wh'=>$___D['wh'],1=>'Error obteniendo listado',2=>'No se encontraron resultados.')
		);
	}
	else if(_0s::$router=='PUT massData/parCpr'){ 
		echo _TB::revF('par_ocpr',$___D,array('ok'=>'Contactos Actualizados correctamente'));
	}
}

else if($cK[0]=='massData/wmaWfa'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_app('_db/tb_wmaWfa');
	if(_0s::$router=='GET massData/wmaWfa'){ 
		echo _TB::queryL('wma_owfa','wfaId,wfaCode,wfaName,descrip,sysF,limitFase,wfaClass',
		array('wh'=>$___D['wh'])
		);
	}
	else if(_0s::$router=='PUT massData/wmaWfa'){ 
		echo _TB::revF('wma_owfa',$___D,array('ok'=>'Fases Actualizados correctamente'));
	}
}

?>