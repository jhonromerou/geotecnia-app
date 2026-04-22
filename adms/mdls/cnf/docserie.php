<?php
if(_0s::$router=='GET docserie'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	echo a_sql::queryL('SELECT A.serieId,A.tt,A.srCode,A.srTitle,A.numAuto,A.nextNum FROM doc_oser A 
	WHERE 1 '.a_sql_filtByT($_GET['wh']).' '.a_sql::nextLimit());
}
else if(_0s::$router=='GET docserie/form'){ a_ses::hashKey('sysd.suadmin');
	_ADMS::_lb('sql/filter');
	$R=a_sql::fetch('SELECT * FROM doc_oser A WHERE A.serieId=\''.$_GET['serieId'].'\' LIMIT 1',array(1=>'Error obteniendo documento.'));
	if(a_sql::$err){ echo a_sql::$errNoText; }
	else if(a_sql::$errNo==2){ echo '{}'; }
	else{ echo _js::enc2($R); }
}
else if(_0s::$router=='PUT docserie' || _0s::$router=='POST docserie'){ a_ses::hashKey('sysd.suadmin');
	if($js=_js::ise($_J['tt'],'Se debe definir el tipo de comprobante.')){}
	else if($js=_js::ise($_J['numAuto'],'Se debe definir si es autonumerado.')){}
	else if($js=_js::textMax($_J['srCode'],4,'Inicio:')){}
	else if($js=_js::ise($_J['nextNum'],'Defina el próximo número a utilizar.','numeric>0')){}
	else if($js=_js::textMax($_J['srTitle'],50,'Titulo:')){}
	else if($js=_js::textMax($_J['noteFix'],1000,'Notas:')){}
	else{
		$R=a_sql::uniRow($_J,array('tbk'=>'doc_oser','wh_change'=>'serieId=\''.$_J['serieId'].'\' LIMIT 1'));
		if(a_sql::$err){ $js=_js::e(3,'Error definiendo documento: '.a_sql::$errText); }
		else{
			if($R['insertId']){ $_J['serieId']=$R['insertId']; }
			$_J['k']=$_J['serieId'];
			$_J['v']=$_J['srTitle'];
			$js=_js::r('Información guardada correctamente.',$_J);
		}
	}
	echo $js;
}

?>