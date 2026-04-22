<?php
	unset($___D['textSearch'],$___D['cardName']);
if(_0s::$router =='GET cpr/at'){ 
	$M=array();
	/*if($js=_js::ise($___D['tt'],'Se debe definir tt para obtener personas de contacto.')){ die($js); }
	//if($js=_js::ise($___D['tr'],'Se debe definir tr para obtener personas de contacto.')){ die($js); }
	switch($___D['tt']){
		case 'card': $M=a_sql::fetch('SELECT cardName,licTradNum FROM par_ocrd WHERE cardId=\''.$___D['tr'].'\' LIMIT 1'); break;
	}*/
	$q=a_sql::query('SELECT A.* FROM par_ocpr A WHERE A.cardId=\''.$___D['tr'].'\' LIMIT 1200',array(1=>'Error obteniendo listado de personas de contacto: ',2=>'No hay personas de contacto relacionadas.'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{
		$M['L']=array();
		while($L=$q->fetch_assoc()){ $M['L'][]=$L; }
		$js=_js::enc($M,'just');
	}
	echo $js;
}
else if(_0s::$router =='GET cpr'){
	$___D['from']='P.*, A.cardName FROM par_ocpr P LEFT JOIN par_ocrd A ON (A.cardId=P.cardId)';
	echo a_sql::getL($___D,array('slps'=>'Y',1=>'Error obteniendo listado de personas de contacto: ',2=>'No hay personas de contacto registradas.'));
}

else if(_0s::$router =='GET cpr/form'){
	$q=a_sql::fetch('SELECT A.*, C.cardName FROM par_ocpr A LEFT JOIN par_ocrd C ON (C.cardId=A.cardId) WHERE A.prsId=\''.$___D['prsId'].'\' LIMIT 1',array(1=>'Error obteniendo información de contacto: ',2=>'El contacto no existe'));
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $js=_js::enc2($q); }
	echo $js;
}

else if(_0s::$router =='PUT cpr'){
	$prsId=$_J['prsId']; unset($_J['prsId']);
	$_J['prsId']=$prsId;
	if($js=a_sql::$err){ $js=a_sql::$errNoText; }
	else if($js=_js::ise($_J['name'],'Se debe definir el nombre del contacto.')){}
	else if($js=_js::ise($_J['gender'],'Se debe definir el género.')){}
	//else if($js=_js::ise($_J['position'],'Se debe definir el cargo del contacto.')){}
	//else if($js=_js::ise($_J['tel1'],'Se debe definir el teléfono 1.')){}
//	else if($js=_js::ise($_J['email'],'Se debe definir correo electrónico.')){}
	else if($js=_js::textLen($_J['address'],100,'La dirección no puede exceder 100 caracteres.')){}
	else if($js=_js::textMax($_J['notes'],200,'Notas: ')){}
	else{
		unset($_J['cardName']);
		$ins2=a_sql::uniRow($_J,array('tbk'=>'par_ocpr','wh_change'=>'prsId=\''.$prsId.'\' LIMIT 1'));
		$prsId=($ins2['insertId'])?$ins2['insertId']:$prsId;
			if(a_sql::$err){ $js=_js::e(3,$ln.'Error definiendo persona de contacto: '.a_sql::$errText,$jsAdd); $errs++; }
		else{ $js=_js::r('Se guardó la información correctamente.','"prsId":"'.$prsId.'"'); }
	}
	echo $js;
}

?>