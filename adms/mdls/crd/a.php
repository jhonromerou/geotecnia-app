<?php
$permWrit=($hk=='crd.c')?$hk.'.write':$hk.'.basic';
if(_0s::$router =='GET a'){ 
	$wh=''; _ADMS::_lb('sql/filter');
	if($_GET['textSearch']!=''){
		$se=a_sql::toSe($_GET['textSearch']); $wh='AND (A.cardName '.$se.' OR A.cardCode '.$se.')';
	} unset($_GET['textSearch']);
	if($hk=='crd.c'){ 
		$wh .= a_ses::ousp('slps',array('tbA'=>'A'));
	}
	$wh .= a_sql_filtByT($_GET);
	$q=a_sql::query('SELECT A.cardId,A.cardCode,A.licTradType,A.grId,A.slpId,A.licTradNum,A.cardName,phone1,phone2,email FROM par_ocrd A WHERE 1 '.$wh.' '.a_sql::nextLimit(),array(1=>'Error obteniendo listado de contactos: ',2=>'No se encontraron contactos.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{$M=array('L'=>array());
		while($L=$q->fetch_assoc()){ $M['L'][]=$L; }
		$js=_js::enc($M);
	}
	echo $js;
}
else if(_0s::$router =='GET a/form'){
	$q=a_sql::fetch('SELECT * FROM par_ocrd WHERE cardId=\''.$_GET['cardId'].'\' LIMIT 1',array(1=>'Error obteniendo información del contacto: ',2=>'El contacto no existe ID:'.$_GET['cardId']));
	if(($js=a_sql::$errNoText)!=''){}
	else{
		$q2=a_sql::fetch('SELECT W.canLogin FROM par_wac1 W WHERE W.cardId=\''.$_GET['cardId'].'\' LIMIT 1');
		if(a_sql::$errNo==-1){
			foreach($q2 as $k=>$v){ $q['WAC_'.$k]=$v; }
		}
		$q['cntAddr']=$q['cntPhone']=$q['cntEmail']=array();
		$qa=a_sql::query('SELECT lineNum,addrType,addrName,address,cityCode,zipCode,countyCode,country FROM '._0s::$Tb['cnt_addr'].' WHERE objType=\'card\' AND objRef=\''.$_GET['cardId'].'\' LIMIT 10');
		if(a_sql::$errNo==-1){ while($l=$qa->fetch_assoc()){ $q['cntAddr'][]=$l; } }
		$qa=a_sql::query('SELECT * FROM par_prp1 WHERE cardId=\''.$_GET['cardId'].'\' LIMIT 20');
		if(a_sql::$errNo==-1){ while($l=$qa->fetch_assoc()){
			unset($l['cardId']);
			foreach($l as $prpNum=>$val){ $q[$prpNum]=$val; }
		} }
		$js=_js::enc2($q);
	}
	echo $js;
}
else if(_0s::$router =='PUT a'){ 
	if($js=_js::ise($___D['cardType'],'No se ha definido el tipo de Contacto.')){}
	else if(!_js::textLimit($___D['cardCode'],20)){ $js=_js::e(3,'El código no puede exceder 20 caracteres.'); }
	else if($js=_js::ise($___D['cardName'],'El nombre debe estar definido.')){}
	else if(!_js::textLimit($___D['cardName'],100)){ $js=_js::e(3,'El nombre no puede exceder 100 caracteres.'); }
	else{
		$errs==0;
		$WAC_canLogin=$___D['WAC_canLogin']; unset($___D['WAC_canLogin']);
		if($___D['cardCode']!=''){
			$qCode = a_sql::fetch('SELECT cardCode FROM par_ocrd WHERE cardId!=\''.$___D['cardId'].'\' AND (cardCode=\''.$___D['cardCode'].'\' ) LIMIT 1',array(1=>'Error consultando códido de usuario al crear: '));
			if(a_sql::$err){ $js= a_sql::$errNoText; $errs++;}
			else if(a_sql::$errNo==-1){ $js=_js::e(3,'El código ('.$qCode['cardCode'].') ya está registrado para otro contacto.'); $errs++; }
		}
		if($errs==0){
			a_sql::transaction(); $cmt=false;
			$cardId=$___D['cardId']; unset($___D['cardId']);
			$Ad=$___D['_Addr']; $Ph=$___D['_Phone']; $Em=$___D['_Email'];
			$PRP=$___D['PRP'];
			unset($___D['_Addr'],$___D['_Phone'],$___D['_Email'],$___D['PRP']);
			$___D['RF_mmag']=$___D['cityCode'];
			$ins=a_sql::insert($___D,array('table'=>'par_ocrd','kui'=>'ud','wh_change'=>'WHERE cardId=\''.$cardId.'\' LIMIT 1'));
		if($ins['err']){ $js=_js::e($ins); $errs++; }
			else{
				$cardId=($ins['insertId'])?$ins['insertId']:$cardId;
				$jsAdd='"cardId":"'.$cardId.'"';
				if(is_array($Ad)) foreach($Ad as $n => $L2){
					$v=$L2['address'].$L2['cityCode'].$L2['countyCode'].$L2['country'];
					if($v=='' && $L2['delete']!='Y'){ continue; }
					$L2['objType']='card'; $L2['objRef']=$cardId; $L2['lineNum']=$n;
					$ins2=a_sql::insert($L2,array('table'=>'cnt_addr','wh_change'=>'WHERE objType=\'card\' AND objRef=\''.$cardId.'\' AND lineNum=\''.$n.'\' LIMIT 1'));
					if($ins2['err']){ $js=_js::e(3,'Error definiendo dirección: '.$ins2['text'],$jsAdd); $errs++; break; }
				} unset($Ad);
				//WAC_canLogin
				a_sql::uniRow(array('cardId'=>$cardId,'canLogin'=>$WAC_canLogin),array('tbk'=>'par_wac1','wh_change'=>'cardId=\''.$cardId.'\' LIMIT 1'));
				if(is_array($PRP)){
					$L2=array('cardId'=>$cardId);
					foreach($PRP as $prpNum => $val){
						$L2['prp'.$prpNum]=$val;
					}
					$ins2=a_sql::insert($L2,array('table'=>'par_prp1','wh_change'=>'WHERE cardId=\''.$cardId.'\' LIMIT 1'));
					if($ins2['err']){ $js=_js::e(3,'Error definiendo propiedades: '.$ins2['text'],$jsAdd); $errs++; }
				}unset($PRP);
			}
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Información guardada correctamente.',$jsAdd);
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}

?>