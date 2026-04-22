<?php
function a_sql_filtByT ($CAMPOS='',$CONF=array()){
	$where = '';
	unset($CAMPOS['___ocardtooken'],$CAMPOS['_fie']);
	$whExt = array();//Almacen en whExt[n], FIE_EXT = array(fie_n=>n)
	$FIE_EXT = ($CONF['FIE_EXT'])?$CONF['FIE_EXT']:array();
	if(!is_array($CAMPOS)) {return ''; }
	$begi = ($CONF['begi']) ? $CONF['begi'].' ' : '';
	if($CAMPOS['filterKey']){
		$fKey = $CAMPOS['filterKey'];
		$field = $CAMPOS['fieldName']; $field2 = ($CAMPOS['fieldName2']) ? $CAMPOS['fieldName2'] : 'userId';
		$todayIni = date('Y-m-d 00:00:00');
		$todayEnd = date('Y-m-d 23:59:59');
		switch($fKey){
			case 'withOut' : $where = ''; break; #sin filtros/todos
			case 'updateLast24Hours' : $last24 = strtotime('-24hours');
			$where = $field.' <= \''.date('Y-m-d H:00:00',$last24).'\' ';
			break;
			case 'updateLast7Days' : $day7Before = strtotime(date('Y-m-d'))-604800;
			$where = $field.' BETWEEN \''.date('Y-m-d H:00:00',$day7Before).'\' AND \''.$todayEnd.' 23:59:59\' ';
			break;
			case 'last24Hours' : $last24 = strtotime('-24hours');
			$where = $field.'>= \''.date('Y-m-d H:00:00',$last24).'\'';
			break;
			case 'yesterdayToday' : $dayBefore = strtotime(date('Y-m-d'))-86400; #-1 dia
			$where = $field.' >= \''.date('Y-m-d',$dayBefore).' 00:00:00\'';
			break;
			case 'last7days' : $dayBefore = strtotime(date('Y-m-d'))-604800; #-1 dia
			$where = $field.' >= \''.date('Y-m-d',$dayBefore).' 00:00:00\'';
			break;
			case 'next7days' : $day7Next = strtotime(date('Y-m-d'))+604800; #-1 dia
			$where = $field.' BETWEEN \''.$todayIni.'\' AND \''.date('Y-m-d',$day7Next).' 23:59:00\'';
			break;
			case 'assgToMe' : $dayBefore = strtotime(date('Y-m-d'))-604800; #-1 dia
		$where = '( '.$field.'= \''.a_ses::$userId.'\' )';
			break;
			case 'byFieldName' : #para fieldName = fieldValue
			$where = '( '.$field.'= \''.$CAMPOS['fieldValue'].'\' )';
			break;
		}
		if($where == ''){ return ''; }
		$begi = ($begi == '') ? 'AND' : $begi;
		return $begi.' ('.$where.')';
	}
	if(array_key_exists('tbAlias',$CAMPOS) || $CONF['tbAlias'] == true) { $tbAlias = 1;}
	if(array_key_exists('BY_LIKE',$CAMPOS) || $CONF['BY_LIKE'] == true) { $BYLIKE = 1;}
	$GPAGER = $CAMPOS['GPAGER'];
	unset($CAMPOS['GPAGER'],$CAMPOS['BLANKS'],$CAMPOS['EXACTO'],$CAMPOS['BY_LIKE'],$CAMPOS['tbAlias'],$CAMPOS['ordBy'],$CAMPOS['getFields'],$CAMPOS['FILCONF'],$CAMPOS['noUserAssg']);
	$FIE = ($CAMPOS['FIE']) ? $CAMPOS['FIE'] : array(0=>$CAMPOS);
	if(!is_array($CAMPOS)){ return $where; }
	$blanks = 0;
	$nW = 0;
	foreach($FIE as $fie_n => $V){// [0] [cardName] = x
	if(is_array($V)) foreach($V as $ka => $v){
		$where1 = '';
		$ka = preg_replace('/^([a-z0-9]{0,10})(\_|\-)/is','$1.',$ka);
		if(preg_match('/.*\(/',$ka)){
			$k = preg_replace('/([\w\_]+)(\(.*)?/i','$1',($ka));
			preg_match('/\(W\_(1|2)\)/s',$ka, $condi); $condi =  $condi[1];#1=AND, 2=OR
			preg_match('/\(T\_(\w+)\)/s',$ka, $typeFi); $typeFi =  $typeFi[1];#1type
			preg_match('/\(E\_(\w+)\)\(?/s',$ka,$equal); $equal = $equal[1]; #igual = = 
		}
		else{ $k = $ka; $condi = 1; $typeFI = ''; $equal = ''; }
		$equal = ($BYLIKE) ? 'like3' : $equal;
		$AND_OR = ($condi == 1) ? 'AND' : 'AND';
		$AND_OR = ($condi == 2) ? 'OR' : $AND_OR;
		$AND_OR = ($nW>0) ? $AND_OR : ''; $nW++;
		if(is_array($v)){
			if($v[0] == '' && $v[1] == ''){ $nW--; continue; }
			$k = preg_replace('/^([a-z0-9]{0,4})\_/i','$1.',$k);
			$v1 = $v[0]; $v2 = $v[1];
			if($typeFi == 'time'){ $v1 = $v1.' 00:00:00'; $v2 = $v2.' 23:59:59'; }
			$where1 = $AND_OR.' ('.$k.' BETWEEN \''.$v1.'\' AND \''.$v2.'\') '; 
		}
		else if($v !='' || $blanks || $equal == 'BLANK'){
			if($equal=='igualOrNull'){ $equal='IoN'; }
			else if($equal=='IsN'){ $equal='IS_NULL'; }
			$equNull = preg_match('/^IS\_NULL.*?/',$v);
			$equal = ($equNull)?'IS_NULL':$equal;
			$v2 = preg_replace('/^IS\_NULL\_/','',$v);
			$v = str_replace('*','%',$v);
			if(preg_match('/^BLANK\_(Y|N)(\(.*\))?$/',$v,$r)){
				if($r[2] == '(date)'){ $equal = 'BLANK_YN(date)';}
				else{ $equal = 'BLANK_YN'; }
			}
			$typeFi = ($typeFi == 'date') ? 'time' : $typeFi;
			$v = ($typeFi == 'time' && $equal == 'menIgual') ? $v.' 23:59:59' : $v;
			$v = ($typeFi == 'time' && $equal == 'mayIgual') ? $v.' 00:00:00' : $v;
			$v = ($typeFi == 'time1') ? $v.' 00:00:00' : $v;
			$v = ($typeFi == 'time2') ? $v.' 23:59:59' : $v;
			$vNum = (is_numeric($v)) ? $v : '\''.$v.'\'';
			$vNum = (preg_match('/^0[0-9]/',$v)) ? '\''.$v.'\'' : $vNum;
			switch($equal){
				case 'IoN': // igualOrNull
					$where1 = $AND_OR.' ('.$k.' = \''.$v.'\' OR '.$k.' IS NULL) ';
				break;
				case 'IsNN': // IsNoNull
					$where1 = $AND_OR.' ('.$k.' IS NOT NULL) ';
				break;
				case 'IS_NULL': //_IsN
					$wh2 = ($v2!='')?' OR '.$k.' = \''.$v2.'\' ':'';
					$where1 = $AND_OR.' ('.$k.' IS NULL'.$wh2.') '; 
				break;
				case 'in': $ins = '';
					$sep = explode(',',$v); 
					foreach($sep as $va){ $ins .= '\''.$va.'\','; }
					$ins = substr($ins,0,-1);
					$where1 = $AND_OR.' '.$k.' IN ('.$ins.') '; 
				break;
				case 'noIn': $ins = '';
					$sep = explode(',',$v); 
					foreach($sep as $va){ $ins .= '\''.$va.'\','; }
					$ins = substr($ins,0,-1);
					$where1 = $AND_OR.' '.$k.' NOT IN ('.$ins.') '; 
				break;
				case 'set': $ins = '';
					$where1 = $AND_OR.' FIND_IN_SET (\''.$v.'\','.$k.') '; 
				break;
				case 'igual': $where1 = $AND_OR.' '.$k.' = '.$vNum.' '; break;
				case 'men': $where1 = $AND_OR.' '.$k.' < '.$vNum.' '; break;
				case 'may': $where1 = $AND_OR.' '.$k.' > '.$vNum.' '; break;
				case 'menIgual': $where1 = $AND_OR.' '.$k.' <= '.$vNum.' '; break;
				case 'mayIgual': $where1 = $AND_OR.' '.$k.' >= '.$vNum.' '; break;
				case 'noIgual': $where1 = $AND_OR.' '.$k.' != '.$vNum.' '; break;
				case 'like1': $where1 = $AND_OR.' '.$k.' LIKE \'%'.$v.'\' '; break;
				case 'like2': $where1 = $AND_OR.' '.$k.' LIKE \''.$v.'%\' '; break;
				case 'like3': $where1 = $AND_OR.' '.$k.' LIKE \'%'.$v.'%\' '; break;
				case 'notLike1': $where1 = $AND_OR.' '.$k.' NOT LIKE \'%'.$v.'\' '; break;
				case 'notLike2': $where1 = $AND_OR.' '.$k.' NOT LIKE \''.$v.'%\' '; break;
				case 'notLike3': $where1 = $AND_OR.' '.$k.' NOT LIKE \'%'.$v.'%\' '; break;
				case 'BLANK': $where1 = $AND_OR.' '.$k.' =\'\' '; break;
				case 'BLANK_YN' : //(Y) f != '' es decir ingresado algo
					if($v == 'BLANK_Y'){ $where1 = $AND_OR.' '.$k.' != \'\' '; }
					else{ $where1 = $AND_OR.' '.$k.' = \'\' '; }
				break;
				case 'BLANK_YN(date)' : //(Y) f != '' es decir ingresado algo
					if($v == 'BLANK_Y(date)'){ $where1 = $AND_OR.' '.$k.' NOT LIKE \'0000-00-00%\' '; }
					else{ $where1 = $AND_OR.' '.$k.' LIKE \'0000-00-00%\' '; }
				break;
				default : $where1 = $AND_OR.' '.$k.' = '.$vNum.' '; break;
			}
		}
		else{ $nW--; }
		if($FIE_EXT[$fie_n]){ $whExt[$FIE_EXT[$fie_n]] .= $where1; }
		else{ $where .= $where1; }
	}
	}
	//if(a_ses::$user == 'supersu'){ print_r($where); }
	$where = ($where != '') ? substr($where,0,-1) : $where;
	if($where == ''){ return ''; }
	$begi = ($begi == '') ? 'AND' : $begi;
	$where = ($nW>1) ? $begi.' ('.$where.')' : $begi.' '.$where;
	if(array_key_exists('FIE_EXT',$CONF)){
		$whExt['wh'] = $where;
		return $whExt;
	}
	else{ return $where; }
}

function a_sql_filter($FIE='',$CONF=array()){
	$where = '';
	unset($FIE['___ocardtooken'],$FIE['_fie']);
	unset($FIE['ordBy'],$FIE['getFields'],$FIE['FILCONF'],$FIE['noUserAssg']);
	if(!is_array($FIE)){ return $where; }
	$blanks = 0;
	$nW = 0;
	foreach($FIE as $ka => $v){// [cardName] = x
		$where1 = '';
		$ka = preg_replace('/^([a-z0-9]{0,10})(\_|\-)/is','$1.',$ka);
		if(preg_match('/.*\(/',$ka)){
			$k = preg_replace('/([\w\_]+)(\(.*)?/i','$1',($ka));
			preg_match('/\(W\_(1|2)\)/s',$ka, $condi); $condi =  $condi[1];#1=AND, 2=OR
			preg_match('/\(T\_(\w+)\)/s',$ka, $typeFi); $typeFi =  $typeFi[1];#1type
			preg_match('/\(E\_(\w+)\)\(?/s',$ka,$equal); $equal = $equal[1]; #igual = = 
		}
		else{ $k = $ka; $condi = 1; $typeFI = ''; $equal = ''; }
		$equal = ($BYLIKE) ? 'like3' : $equal;
		$AND_OR = ($condi == 1) ? 'AND' : 'AND';
		$AND_OR = ($condi == 2) ? 'OR' : $AND_OR;
		$AND_OR = ($nW>0) ? $AND_OR : ''; $nW++;
		if($v !='' || $blanks || $equal == 'BLANK'){
			if($equal=='igualOrNull'){ $equal='IoN'; }
			else if($equal=='IS_NULL'){ $equal='IsN'; }
			$v2 = preg_replace('/^IS\_NULL\_/','',$v);
			$v = str_replace('*','%',$v);
			if(preg_match('/^BLANK\_(Y|N)(\(.*\))?$/',$v,$r)){
				if($r[2] == '(date)'){ $equal = 'BLANK_YN(date)';}
				else{ $equal = 'BLANK_YN'; }
			}
			$typeFi = ($typeFi == 'date') ? 'time' : $typeFi;
			$v = ($typeFi == 'time' && $equal == 'menIgual') ? $v.' 23:59:59' : $v;
			$v = ($typeFi == 'time' && $equal == 'mayIgual') ? $v.' 00:00:00' : $v;
			$v = ($typeFi == 'time1') ? $v.' 00:00:00' : $v;
			$v = ($typeFi == 'time2') ? $v.' 23:59:59' : $v;
			$vNum = (is_numeric($v)) ? $v : '\''.$v.'\'';
			$vNum = (preg_match('/^0[0-9]/',$v)) ? '\''.$v.'\'' : $vNum;
			switch($equal){
				case 'IoN': // igualOrNull
					$where1 = $AND_OR.' ('.$k.' = \''.$v.'\' OR '.$k.' IS NULL) ';
				break;
				case 'IsNN': // IsNoNull
					$where1 = $AND_OR.' ('.$k.' IS NOT NULL) ';
				break;
				case 'IsN': //_IsN
					$wh2 = ($v2!='')?' OR '.$k.' = \''.$v2.'\' ':'';
					$where1 = $AND_OR.' ('.$k.' IS NULL'.$wh2.') '; 
				break;
				case 'in': $ins = '';
					$sep = explode(',',$v); 
					foreach($sep as $va){ $ins .= '\''.$va.'\','; }
					$ins = substr($ins,0,-1);
					$where1 = $AND_OR.' '.$k.' IN ('.$ins.') '; 
				break;
				case 'noIn': $ins = '';
					$sep = explode(',',$v); 
					foreach($sep as $va){ $ins .= '\''.$va.'\','; }
					$ins = substr($ins,0,-1);
					$where1 = $AND_OR.' '.$k.' NOT IN ('.$ins.') '; 
				break;
				case 'set': $ins = '';
					$where1 = $AND_OR.' FIND_IN_SET (\''.$v.'\','.$k.') '; 
				break;
				case 'men': $where1 = $AND_OR.' '.$k.' < '.$vNum.' '; break;
				case 'may': $where1 = $AND_OR.' '.$k.' > '.$vNum.' '; break;
				case 'menIgual': $where1 = $AND_OR.' '.$k.' <= '.$vNum.' '; break;
				case 'mayIgual': $where1 = $AND_OR.' '.$k.' >= '.$vNum.' '; break;
				case 'noIgual': $where1 = $AND_OR.' '.$k.' != '.$vNum.' '; break;
				case 'like1': $where1 = $AND_OR.' '.$k.' LIKE \'%'.$v.'\' '; break;
				case 'like2': $where1 = $AND_OR.' '.$k.' LIKE \''.$v.'%\' '; break;
				case 'like3': $where1 = $AND_OR.' '.$k.' LIKE \'%'.$v.'%\' '; break;
				case 'notLike1': $where1 = $AND_OR.' '.$k.' NOT LIKE \'%'.$v.'\' '; break;
				case 'notLike2': $where1 = $AND_OR.' '.$k.' NOT LIKE \''.$v.'%\' '; break;
				case 'notLike3': $where1 = $AND_OR.' '.$k.' NOT LIKE \'%'.$v.'%\' '; break;
				case 'rang': $ins = '';
					$sep = explode('-',$v);
					$wh11=($sep[0] || $sep[1])?' '.$AND_OR.' (':'';
					if($sep[0]){ $wh11 .= $k.' >=\''.$sep[0].'\' '; }
					if($sep[1] && $sep[0]){ $wh11 .= ' AND '.$k.' <=\''.$sep[1].'\' '; }
					else if($sep[1]){ $wh11 .= $k.' <=\''.$sep[1].'\' '; }
					$wh11 .=($sep[0] || $sep[1])?') ':'';
					$where1= $wh11;
				break;
				case 'BLANK': $where1 = $AND_OR.' '.$k.' =\'\' '; break;
				case 'date0' : //(Y) f != '' es decir ingresado algo
					$where1 = $AND_OR.' '.$k.' LIKE \'0000-00-00%\' ';
				break;
				default : $where1 = $AND_OR.' '.$k.' = '.$vNum.' '; break;
			}
		}
		else{ $nW--; }
		$where .= $where1;
	}
	$where = ($where != '') ? substr($where,0,-1) : $where;
	if($where == ''){ return ''; }
	$begi = ($begi == '') ? 'AND' : $begi;
	$where = ($nW>1) ? $begi.' ('.$where.')' : $begi.' '.$where;
	return $where;
}
?>