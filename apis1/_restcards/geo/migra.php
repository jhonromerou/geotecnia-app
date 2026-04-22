<?php
require('geo.php');
_ADMS::lib('reGet');

if(_0s::$router=='GET migra/ensayos'){
	die('Ya realizado..');
	require('cementos.php');
	//num 29678s
	a_sql::$maxQuerys=2000;
	//print_r($_GET);
	$recall=($_GET['recall'])?$_GET['recall']:0;
	if($recall==15){ die('Max recalls: '.$recall); }
	$n=($_GET['page'])?$_GET['page']:0;
	$maxP=a_sql::$maxQuerys;
	$ini=$n*$maxP;
	$recall++; $n++;
	//a_sql::query('TRUNCATE table xdp_oens');
	$q=a_sql::query('SELECT * FROM geot_sistema.ens_lista WHERE 1 LIMIT '.$ini.','.$maxP);
	echo 'ens_lista to xdp_oens '.print_r($q,1).'----'."\n";
	$R=array();
	while($L=$q->fetch_assoc()){
		$P=unserialize($L['pars']);
		$ensType=$L['type'];
		$LP=array('lineDate'=>$L['datecont']);
		switch($ensType){
			case 'viguetas' : $P=xdp_Geo::Lb_vigueta($P,$LP); break; 
			case 'cilindros' : $P=xdp_Geo::Lb_cilindro($P,$LP); break; 
			case 'nucleos' : $P=xdp_Geo::Lb_nucleo($P,$LP); break; 
			case 'densidadcampo' : $P=xdp_Geo::Lb_densidad($P,$LP); break; 
		}
		$R[]=array('i','xdp_oens','id'=>$L['id']*1,'docEntry'=>$L['remi_id'],'lineStatus'=>$L['status'],'lineDate'=>$L['datecont'],'lineNum'=>$L['orden'],'lineType'=>$ensType,'jsData'=>json_encode($P,JSON_UNESCAPED_UNICODE),'result_tab'=>$L['result_tab']);
	}
	$R=a_sql::multiQuery($R);
	$txt = $_GET['txt'].'['.$ini.','.$maxP.'= '.$R['qus'].'],';
	sleep(1);
	header('Location: http://api0.admsistems.com'.$_SERVER['REDIRECT_URL'].'?page='.$n.'&recall='.$recall.'&___ocardtooken='.$_GET['___ocardtooken'].'&txt='.$txt);
}

else if(_0s::$router=='GET migra/ens2Remi'){
	die('Ya realizado..');
	//34124
	a_sql::$maxQuerys=2000;
	reGet::$lenLimit=2000;
	reGet::rev(20);
	$txtIni=reGet::$txtLimit.'... ';
	$R=array(); $x100=0; $k=-1;
	$fie='R1.id,R1.itemtype,R1.remi_id docEntry,R1.itemId,R1.price,R1.datecont lineDate, R1.datecont dateC, R1.status lineStatus,R1.comment lineMemo, I.sellPrice, I.itemId itemIdEns,I.itemCode';
	$q=a_sql::query('SELECT '.$fie.',R1.cant quantity
	FROM geot_sistema.remi_items R1 
	LEFT JOIN xdp_oens E ON (R1.itemtype=\'ensayo\' AND E.id=R1.itemId)
	LEFT JOIN itm_oitm I ON (R1.itemtype=\'ensayo\' AND I.itemCode=E.lineType)
	WHERE 1 LIMIT '.reGet::$txtLimit,array(1=>$txtIni.'Error obteniendo datos.',2=>$txtIni.'No se encontraron resultados.'));
	$lineNum=1; $docEntry='';
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else{
		while($L=$q->fetch_assoc()){
			$L['ensType']='N';
			if($L['itemtype']=='ensayo'){
				$L['ensId']=$L['itemId'];
				$L['itemId']=$L['itemIdEns'];
				$L['price']=$L['sellPrice'];
				$L['ensType']=$L['itemCode'];
			}
			$L['lineStatus']=($L['lineStatus']=='facturado')?'C':'O';
			unset($L['itemtype'],$L['sellPrice'],$L['itemIdEns'],$L['itemCode']);
			$L['priceLine']=$L['price']*$L['quantity'];
			$L[0]='i';
			$L[1]='xdp_rit1';
			$R[]=$L;
		}
		$R=a_sql::multiQuery($R);
		if(_err::$err){ die(_err::$errText); }
		$txt = $_GET['txt'].'['.reGet::$txtLimit.'= '.$R['qus'].'],';
		reGet::reply('txt='.$txt);
	}
}

else if(_0s::$router=='GET migra/invoice'){
	die('Ya realizado..');
	//11564
	a_sql::$maxQuerys=2000;
	reGet::$lenLimit=2000;
	reGet::rev(6);
	$txtIni=reGet::$txtLimit.'... ';
	$R=array(); $x100=0; $k=-1; $Ca=array();
	$fie='A.id,A.nit,A.status,A.remi_id, A.date, A.iva,A.subTotal,A.ivaBal';
	$gb='A.id,A.nit,A.status,A.remi_id, A.date, A.iva,A.subTotal,A.ivaBal';
	$qt='SELECT '.$fie.'
	,SUM(B.cant*B.price) baseAmnt
	FROM geot_sistema.fact_control A
	JOIN geot_sistema.fact_items B ON (B.fact_id=A.id)
	WHERE 1 
	GROUP BY '.$gb.' LIMIT '.reGet::$txtLimit;
	$q=a_sql::query($qt,array(1=>$txtIni.'Error obteniendo facturas.',2=>$txtIni.'No se encontraron resultados de facturas.'));
	$lineNum=1; $docEntry='';
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else{
		while($L=$q->fetch_assoc()){
			$k=$L['nit'];
			if(!array_key_exists($k,$Ca)){
				$Ca[$k]=a_sql::fetch('SELECT cardId,cardName FROM par_ocrd WHERE licTradNum=\''.$k.'\' LIMIT 1');
			}
			$Lx=array('serieId'=>1,'docEntry'=>$L['id'],'cardId'=>$Ca[$k]['cardId'],'cardName'=>$Ca[$k]['cardName'],
			'projectId'=>$L['remi_id'],'docNum'=>$L['id'],
			'dateC'=>$L['date'],'docDate'=>$L['date'],'dueDate'=>$L['date'],
			'baseAmnt'=>$L['baseAmnt']);
			if($L['subTotal']>0){ $Lx['baseAmnt']=$L['subTotal']; }
			$Lx['baseAmntList']=$Lx['baseAmnt'];
			if($L['ivaBal']>0){ $Lx['vatSum']=$L['ivaVal']; }
			else{ $Lx['vatSum']=$Lx['baseAmnt']*$L['iva']/100; }
			$Lx['docTotal']=$Lx['baseAmnt']+$Lx['vatSum'];
			if($L['status']=='anulada'){ 
				$Lx['docStatus']='N'; $Lx['canceled']='Y';
			}
			if($L['status']=='pagada'){
				$Lx['balDue']=0;
			}
			else{ $Lx['balDue']=$Lx['docTotal']; }
			$Lx[0]='i';
			$Lx[1]='gvt_oinv';
			$R[]=$Lx;
		}
	
		$R=a_sql::multiQuery($R);
		if(_err::$err){ die(_err::$errText); }
		$txt = $_GET['txt'].'['.reGet::$txtLimit.'= '.$R['qus'].'],';
		reGet::reply('txt='.$txt);
	}
}

else if(_0s::$router=='GET migra/invoiceLines'){
	die('Ya realizado..');
	//33395
	a_sql::$maxQuerys=2000;
	reGet::$lenLimit=1000;
	reGet::rev(17);
	// , Alquiler,Documento,Laboratorio,Servicios,Transporte,
	//cbr,ci,cilindros,densidadcampo,nucleos,viguetas
	$txtIni=reGet::$txtLimit.'... ';
	$R=array(); $x100=0; $k=-1; $Ca=array();
	$fie='B.fact_id,I.id,R.itemtype,B.price,B.comment';
	$gb='B.fact_id,I.id,R.itemtype,B.price,B.comment';
	$qt='SELECT '.$fie.',SUM(B.cant) cant,SUM(B.cant*B.price) priceLine
	FROM geot_sistema.fact_items B
	JOIN geot_sistema.remi_items R ON (R.id=B.ritem_id)
	LEFT JOIN geot_sistema.items_list I ON (I.id=R.itemid)
	where R.itemtype=\'item\'
	GROUP BY '.$gb.' LIMIT '.reGet::$txtLimit;
	$q=a_sql::query($qt,array(1=>$txtIni.'Error obteniendo facturas.'));
	$lineNum=1; $docEntry='';
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			$Lx=array('docEntry'=>$L['fact_id'],'itemId'=>$L['id'],'price'=>$L['price'],'quantity'=>$L['cant'],'priceline'=>$L['priceLine'],'lineTotal'=>$L['priceLine'],'lineText'=>$L['comment']);
			$Lx[0]='i';
			$Lx[1]='gvt_inv1';
			$R[]=$Lx;
		}
	}
	$fie='B.fact_id,I.id,B.price,B.comment';
	$gb= $fie;//'B.fact_id,I.id,B.price,B.comment';
	$qt='SELECT 
	'.$fie.',SUM(B.cant) cant,SUM(B.cant*B.price) priceLine
	FROM geot_sistema.fact_items B
	JOIN geot_sistema.remi_items R ON (R.id=B.ritem_id)
	LEFT JOIN geot_sistema.ens_lista E ON (E.id=R.itemid)
	LEFT JOIN geot_sistema.items_list I ON (I.access=E.type)
	where R.itemtype=\'ensayo\'
	GROUP BY '.$gb.' LIMIT '.reGet::$txtLimit;
	$q=a_sql::query($qt,array(1=>$txtIni.'Error obteniendo facturas.'));
	$lineNum=1; $docEntry='';
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			$Lx=array('docEntry'=>$L['fact_id'],'itemId'=>$L['id'],'price'=>$L['price'],'quantity'=>$L['cant'],'priceline'=>$L['priceLine'],'lineTotal'=>$L['priceLine'],'lineText'=>$L['comment']);
			$Lx[0]='i';
			$Lx[1]='gvt_inv1';
			$R[]=$Lx;
		}
	}
	if(count($R)===0){ die(); }
	//die(print_r($R));
	$R=a_sql::multiQuery($R);
	print_r($R);
	if(_err::$err){ die(_err::_err($txtIni.'No se encontraron más resultados',3)); }
	$txt = $_GET['txt'].'['.reGet::$txtLimit.'= '.$R['qus'].'],';
	reGet::reply('txt='.$txt);
	
}

else if(_0s::$router=='GET migra/invoiceLineClose'){
	die('Ya realizado..');
	//33395
	a_sql::$maxQuerys=2000;
	reGet::$lenLimit=34000;
	reGet::rev(2);
	// , Alquiler,Documento,Laboratorio,Servicios,Transporte,
	//cbr,ci,cilindros,densidadcampo,nucleos,viguetas
	$txtIni=reGet::$txtLimit.'... ';
	$R=array(); $x100=0; $k=-1; $Ca=array();
	$qt='SELECT A.remi_id,B.fact_id,B.ritem_id,A.date
	FROM 
	geot_sistema.fact_control A
	JOIN geot_sistema.fact_items B ON (B.fact_id=A.id)
	where 1
	LIMIT '.reGet::$txtLimit;
	$q=a_sql::query($qt,array(1=>$txtIni.'Error obteniendo facturas.'));
	$lineNum=1; $docEntry=''; $k=$kOld='';
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			$k=$L['remi_id'].'_'.$L['fact_id'];
			if(!array_key_exists($k,$R)){
				$R[$k]=array('remiId'=>$L['remi_id'],'dateC'=>$L['date'],'docDate'=>$L['date'],'invId'=>$L['fact_id'],'ids'=>'',0=>'i',1=>'xdp_ocrp');
			}
			$R[$k]['ids'] .='\''.($L['ritem_id']*1).'\',';
			if($kOld!='' && $k!=$kOld){
				$R[$kOld]['ids'] =substr($R[$kOld]['ids'],0,-1);
			}
			$kOld=$k;
		}
	}
	if(count($R)===0){ die(); }
	
	$R=a_sql::multiQuery($R);
	(print_r($R));
	if(a_sql::$err){ die(_err::err($txtIni.a_sql::$errText,3)); }
	$txt = $_GET['txt'].'['.reGet::$txtLimit.'= '.$R['qus'].'],';
	reGet::reply('txt='.$txt);
	
}


else if(_0s::$router=='GET migra/cementos'){
	$q=a_sql::query('SELECT * FROM geot_sistema.var_cementos WHERE 1');
	$R=array();
	while($L=$q->fetch_assoc()){
		$k=$L['cemento'];
		if(!array_key_exists($k,$R)){ $R[$k]=array(); }
		$R[$k][$L['dias']]=$L['valor'];
	}
	$cmt ='';
	foreach($R as $c=>$L){
		$cmt .= 'geoCemento::$V[\''.$c.'\']=array(';
		foreach($L as $d=>$v){ $cmt .='\''.$d.'\'=>\''.($v*1).'\','; }
		$cmt = substr($cmt,0,-1).');'."\n";
	}
	echo $cmt;
}

?>