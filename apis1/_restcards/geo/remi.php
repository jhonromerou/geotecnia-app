<?php
require('geo.php');
unset($_J['serieId'],$_J['slpId']);
function maxLb(){
	$maxLb=100;
	$maxN=(array_key_exists('lineNum(E_menIgual)',$_GET))?$_GET['lineNum(E_menIgual)']:'';
	$minN=(array_key_exists('lineNum(E_mayIgual)',$_GET))?$_GET['lineNum(E_mayIgual)']:'';
	$diffEns=($maxN-$minN);
	if($minN==='' || $maxN===''){ die(_js::e(3,'Se debe definir el número de inicio y de fin de la prueba.')); }
	if($minN>$maxN){ die(_js::e(3,'El numero de prueba inicial no puede ser mayor al final.')); }
	if($diffEns>$maxLb){ die(_js::e(3,'No se puede mostrar más de '.$maxLb.' por una consulta: '.$diffEns)); }
}
function maxLbPut($L=array()){
	$maxLb=30;
	if(!is_array($L) || count($L)==0){ return _js::e(3,'No se enviaron lineas.'); }
	if(count($L)>$maxLb){ return _js::e(3,'No puede modificar más de '.$maxLb.' lineas a la vez'); }
}
if(_0s::$router=='GET remi'){ //a_ses::hashKey('geo.remi.read');
	_ADMS::_lb('sql/filter');
	$_GET['fromA']='* FROM xdp_orit A';
	$_GET['orderByDef']='A.dateUpd DESC';
 echo Doc::get($_GET);
}
else if(_0s::$router=='POST remi'){ //a_ses::hashKey('geo.remi.write');
	$isTrans=($_J['mType']=='T');
	if($js=_js::ise($_J['cardId'],'Se debe el cliente','numeric>0')){}
	else if($js=_js::ise($_J['cardName'],'Se debe el nombre de cliente')){}
	else if($js=_js::ise($_J['proyect'],'Se debe el nombre de la obra.')){}
	else{
		$_J['dateUpd']=date('Y-m-d H:i:s');
		$ins=a_sql::insert($_J,array('table'=>'xdp_orit','kui'=>'ud','qDo'=>'insert'));
		if($ins['err']){ $js=_js::e(3,'Error generando remisión de proyecto: '.$ins['text']); }
		else{
			$_J['docEntry']=$ins['insertId'];
			$js=_js::r('Remisión generada correctamente.','"docEntry":"'.$_J['docEntry'].'"');
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT remi'){ //a_ses::hashKey('geo.remi.write');
	if($js=_js::ise($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){}
	else if($js=_js::ise($_J['cardId'],'Se debe el cliente','numeric>0')){}
	else if($js=_js::ise($_J['cardName'],'Se debe el nombre de cliente')){}
	else if($js=_js::ise($_J['proyect'],'Se debe el nombre de la obra.')){}
	else{
		$_J['dateUpd']=date('Y-m-d H:i:s');
		$ins=a_sql::insert($_J,array('table'=>'xdp_orit','qDo'=>'update','wh_change'=>'WHERE docEntry=\''.$_J['docEntry'].'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e(3,'Error generando remisión de proyecto: '.$ins['text']); }
		else{
			$js=_js::r('Remisión actualizada correctamente.','"docEntry":"'.$_J['docEntry'].'"');
		}
	}
	echo $js;
}
else if(_0s::$router=='GET remi/form'){ //a_ses::hashKey('geo.remi.read');
 echo Doc::getOne(array('docEntry'=>$_GET['docEntry'],
	'fromA'=>'* FROM xdp_orit A'));
}
else if(_0s::$router=='GET remi/profile'){ //a_ses::hashKey('geo.remi.read');
	$M=a_sql::fetch('SELECT * FROM xdp_orit A WHERE docEntry=\''.$_GET['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de documento',2=>'El documento no existe.'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	$M['L']=array();
	$gb='B.id,B.itemId,B.ensType,I.itemCode,I.udm,I.itemName,B.lineDate,B.lineStatus,B.lineMemo,B.price,B.quantity,B.priceLine';
	$ql=a_sql::query('SELECT '.$gb.' 
	FROM xdp_rit1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)
	WHERE docEntry=\''.$_GET['docEntry'].'\' AND B.ensType=\'N\' ',array(1=>'Error obteniendo lineas items de documento'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if(a_sql::$errNo==-1){ while($L=$ql->fetch_assoc()){ $M['L'][]=$L; } }
	$gb='B.ensType,I.itemCode,I.udm,I.itemName,B.lineStatus,B.price,B.lineMemo';
	$ql=a_sql::query('SELECT '.$gb.',SUM(B.quantity) quantity,SUM(B.priceLine) priceLine 
	FROM xdp_rit1 B 
	LEFT JOIN itm_oitm I ON (I.itemId=B.itemId)
	WHERE docEntry=\''.$_GET['docEntry'].'\' AND B.ensType!=\'N\'
	GROUP BY '.$gb,array(1=>'Error obteniendo lineas lb información de documento'));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	if(a_sql::$errNo==-1){ while($L=$ql->fetch_assoc()){ $M['L'][]=$L; } }
	echo _js::enc2($M);
}

else if(_0s::$router=='GET remi/one'){ //a_ses::hashKey('geo.remi.read');
 $gbB='docEntry,remi_id,dateCont,status,itemType,price';
	echo Doc::getOne(array('docEntry'=>$_GET['docEntry'],
	'fromA'=>'* FROM xdp_orit A',
	'fromB'=>$gbB.',SUM(cant) cant FROM xdp_rit1 B','whB'=>'GROUP BY '.$gbB));
}
else if(_0s::$router=='GET remi/update'){ //a_ses::hashKey('geo.remi.read');
 $q=a_sql::query('SELECT id,dateupd FROM remis10 ');
	while($L=$q->fetch_assoc()){
		a_sql::query('UPDATE xdp_orit SET dateupd=\''.$L['dateupd'].'\' WHERE id=\''.$L['id'].'\' LIMIT 1 ');
	}
}

else if(_0s::$router=='GET remi/viguetas'){ //a_ses::hashKey('geo.remi.read');
	maxLb();
	$___D['lineType']='viguetas';
	echo xdp_Geo::getLbs($___D);
}
else if(_0s::$router=='PUT remi/viguetas'){ //a_ses::hashKey('geo.remi.read');
	$lineType='viguetas'; require('cementos.php');
	if($js=_js::ise($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){}
	else{
		a_sql::transaction(); $cmt=false;
		xdp_Geo::put_lbs($_J['L'],array('docEntry'=>$_J['docEntry'],'lineType'=>$lineType));
		if(_err::$err){ $js=_err::$errText; $errs++; }
		if($errs==0){ $cmt=true;
			$js=_js::r('Registros guardado correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}

else if(_0s::$router=='GET remi/cilindros'){ //a_ses::hashKey('geo.remi.read');
	maxLb();
	$___D['lineType']='cilindros';
	echo xdp_Geo::getLbs($___D);
}
else if(_0s::$router=='PUT remi/cilindros'){ //a_ses::hashKey('geo.remi.read');
	$lineType='cilindros'; require('cementos.php');
	if($js=_js::ise($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){}
	else if($js=maxLbPut($_J['L'])){}
	else{
		a_sql::transaction(); $cmt=false;
		xdp_Geo::put_lbs($_J['L'],array('docEntry'=>$_J['docEntry'],'lineType'=>$lineType));
		if(_err::$err){ $js=_err::$errText; $errs++; }
		if($errs==0){ $cmt=true;
			$js=_js::r('Registros guardado correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}

else if(_0s::$router=='GET remi/densidad'){ //a_ses::hashKey('geo.remi.read');
	maxLb();
	$___D['lineType']='densidadcampo';
	echo xdp_Geo::getLbs($___D);
}
else if(_0s::$router=='PUT remi/densidad'){ //a_ses::hashKey('geo.remi.read');
	$lineType='densidadcampo';
	if($js=_js::ise($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){}
	else{
		a_sql::transaction(); $cmt=false;
		xdp_Geo::put_lbs($_J['L'],array('docEntry'=>$_J['docEntry'],'lineType'=>$lineType));
		if(_err::$err){ $js=_err::$errText; $errs++; }
		if($errs==0){ $cmt=true;
			$js=_js::r('Registros guardado correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}/* nucleos */

else if(_0s::$router=='GET remi/nucleos'){ //a_ses::hashKey('geo.remi.read');
	maxLb();
	$___D['lineType']='nucleos';
	echo xdp_Geo::getLbs($___D);
}
else if(_0s::$router=='PUT remi/nucleos'){ //a_ses::hashKey('geo.remi.read');
	$lineType='nucleos';
	if($js=_js::ise($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){}
	else{
		a_sql::transaction(); $cmt=false;
		xdp_Geo::put_lbs($_J['L'],array('docEntry'=>$_J['docEntry'],'lineType'=>$lineType));
		if(_err::$err){ $js=_err::$errText; $errs++; }
		if($errs==0){ $cmt=true;
			$js=_js::r('Registros guardado correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}

else if(_0s::$router=='PUT remi/line'){ //a_ses::hashKey('geo.remi.read');
	if($js=_js::ise($_J['docEntry'],'Se debe definir el número de documento','numeric>0')){}
	else{
		a_sql::transaction(); $cmt=false;
		xdp_Geo::itm2Remi($_J['L'],array('docEntry'=>$_J['docEntry']));
		if(_err::$err){ $js=_err::$errText; $errs++; }
		else{ $cmt=true;
			$js=_js::r('Registros guardado correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}


?>