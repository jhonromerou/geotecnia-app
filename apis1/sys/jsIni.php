<?php
header('Content-Type: text/javascript');
/* Necesario aqui para obtener libreria al cargar */
if(c::$V['jsLibType']!='O'){
	if(c::$V['jsLoad']['app']){
		$app=c::$V['jsLoad']['app'];
		unset(c::$V['jsLoad']['app']);
		$filx=c::$V['PATH_APPI'].$app.'.php'; $fileok='N';
		if(is_file($filx)){ $fileok='Y'; require($filx); }
		echo '/*jsv load libraries: '.$app.' exists=('.$fileok.') -'.$filx.' */'."\n";
	}
	$ftemp = '?version=1.2.3';

	if(is_array(c::$V['jsLoad'])) foreach(c::$V['jsLoad'] as $x => $Lj){
	 if($Lj['type'] == 'admsistems'){ //directo
			echo '$y.mI.push({req:"Y","type":"ahttp", src:"https://jslibraries.admsistems.com'.$Lj['src'].'"});'."\n";
		}
		else if($Lj['type']=='js'){
			$src=($Lj['h']=='api1')?c::$V['URI_SAPI']:c::$V['URI_STATIC'];
			echo '$y.mI.push({req:\'Y\',fType:\''.$Lj['fType'].'\',type:\'ahttp\',src:\''.$src.'/'.$Lj['src'].'.js'.$ftemp.'\'});'."\n";
		}
		else if($Lj['type']=='jsv'){
			_Mdl::$jsMdl=[];//reset
			$filx=c::$V['PATH_APPI'].$Lj['src'].'.php'; $fileok='N';
			if(is_file($filx)){ $fileok='Y'; require($filx); }
			echo '/*jsv: '.$Lj['src'].' file_exists='.$fileok.'*/'."\n";
			foreach(_Mdl::$jsMdl as $x2=> $L2){
				$src=($L2['h']=='api1')?c::$V['URI_SAPI']:c::$V['URI_STATIC'];
				$version = $L2['v'] ? '?version='.$L2['v'] : $ftemp;
				echo '	$y.mI.push({req:\'Y\',fType:\''.$L2['fType'].'\',type:\'ahttp\',src:\''.$src.'/'.$L2['src'].'.js'.$version.'\'});'."\n";
			}
		}
		else if(0 && $Lj['type']=='jsSoc'){
			echo '$y.mI.push({req:\'Y\',fType:\'\',type:\'ahttp\',src:\''.c::$V['URI_API'].'/jsSocTemp.js\'});'."\n";
		}
		else if($Lj['type']=='jsSoc'){
			echo '$y.mI.push({req:\'Y\',fType:\'sys\',src:\''.c::$V['URI_API'].'/sys/jsSoc?___ocardtooken='.$_GET['___ocardtooken'].'\'});'."\n";
		}
		else if($Lj['lib']){ //directo
			echo '	$y.mI.push({req:\'Y\',"lib":"'.$Lj['lib'].'"});'."\n";
		}
	}
	_Mdl::$jsMdl=[];
}
else{
	_Mdl::pushJSFile([
	array('src'=>'_js/$a'),
	array('src'=>'_js/$M'),
	array('src'=>'_js/$Api'),
	array('src'=>'_js/$Doc'),
	array('src'=>'lib/ubl/measures'),
	array('src'=>'lib/dian/mmag'),
	array('src'=>'lib/num2text')
	],'ini');
	if($_GET['jsSoc']=='Y'){
		_Mdl::pushJSFile([
	array('type'=>'sys','src'=>c::$V['URI_API'].'/sys/jsSoc?___ocardtooken='.$_GET['___ocardtooken']),
	array('src'=>'apps/5c'),
	array('src'=>'apps/attach'),
	],'ini');
	}
	_Mdl::jsvReq();
	_Mdl::jsFile('S');
}
mysqli_close(a_sql::$DB);
c::getMemory('end');
?>
