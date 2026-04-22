<?php
unset($___D['textSearch'],$___D['serieType']);
$oTy='crdDry';
if(_0s::$router =='GET dry'){ a_ses::hashKey('crdDry');
	$___D['fromA']='* FROM '._0s::$Tb['par_odry'].' A ';
	echo Doc::get($___D);
}
else if(_0s::$router =='GET dry/one'){ a_ses::hashKey('crdDry');
	$___D['fromA']='* FROM '._0s::$Tb['par_odry'].' A ';
	echo Doc::getOne($___D);
}
else if(_0s::$router=='POST dry'){ a_ses::hashKey('crdDry');
	_ADMS::_lb('com/_2d');
	if($js=_js::ise($___D['cardName'],'Se debe definir el socio de negocios.')){}
	else if($js=_js::ise($___D['docDate'],'La fecha del documento debe estar definida.','Y-m-d')){}
	else if($js=_js::ise($___D['dueDate'],'La fecha de vencimiento debe estar definida.','Y-m-d')){}
	else if($js=_js::ise($___D['docClass'],'Se debe definir la clase de registro.')){}
	else if($js=_js::textLen($___D['asunto'],200,'El asunto no puede exceder 200 caracteres.')){  }
	else{
		unset($___D['docEntry']);
		$ins=a_sql::insert($___D,array('kui'=>'uid_dateC','tbk'=>'par_odry','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(1,'Error guardando registro: '.$ins['text']); }
		else{
			$docEntry=($ins['insertId'])?$ins['insertId']:$___D['docEntry'];
			if($ins['insertId']){
				Doc::log_post(array('serieType'=>$oTy,'docEntry'=>$docEntry,'dateC'=>1));
			}
			$js=_js::r('Información guardada correctamente.','"docEntry":"'.$docEntry.'"');
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT dry'){ a_ses::hashKey('crdDry');
	_ADMS::_lb('com/_2d');
	$docEntry=$___D['docEntry'];
	if(0 && $js=Doc::status(array('serieType'=>$oTy,'docEntry'=>$docEntry))){}
	else if($js=_js::ise($___D['cardName'],'Se debe definir el socio de negocios.')){}
	else if($js=_js::ise($___D['docDate'],'La fecha del documento debe estar definida.','Y-m-d')){}
	else if($js=_js::ise($___D['dueDate'],'La fecha de vencimiento debe estar definida.','Y-m-d')){}
	else if($js=_js::ise($___D['docClass'],'Se debe definir la clase de registro.')){}
	else if($js=_js::textLen($___D['asunto'],200,'El asunto no puede exceder 200 caracteres.')){  }
	else{
		$ins=a_sql::insert($___D,array('kui'=>'uid_dateC','tbk'=>'par_odry','qDo'=>'update','wh_change'=>'WHERE docEntry=\''.$docEntry.'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(1,'Error actualizando registro: '.$ins['text']); }
		else{
			$js=_js::r('Información actualizada correctamente.','"docEntry":"'.$docEntry.'"');
		}
	}
	echo $js;
}

else if(_0s::$router==('PUT dry/statusCancel')){ a_ses::hashKey('crdDry');
	$___D['serieType']=$oTy;
	echo Doc::statusCancel($___D);
}
else if(_0s::$router==('PUT dry/statusHandClose')){ a_ses::hashKey('crdDry');
	$___D['serieType']=$oTy;
	echo Doc::statusClose($___D);
}

?>