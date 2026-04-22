<?php
require(c::$V['PATH_LIB'].'_ADMS.php');
class _Mdl{
/*carga modulos jsv,jsFile */
static $uri_st1='http://static1.admsistems.com';
static $C=array(); /* constantes */
static $A=array(); /*activoss k */
static $jsTxtNum=201; /* inicia add */

static $kA=array(); /* Paramatrizar usar, gfiAcc=N */
static public function kA($k){
	$r=false;
	if(self::$kA[$k]!='N'){ $r=true; }
	return $r;
}

static $jsMdl=array(); /* redifinir en jsIni y añadir en jsv */
static $jsFileIni=array();
static $jsFile=array(
0=>array('type'=>'txt','txt'=>'')
);
static $jsFileLast=array(); /* al final */
static public function jsFileTxt($txt='',$ini=false){
	self::$jsFile[0]['txt'] .= $txt;
}
static public function jsFile($ty='L',$jsCont=''){
	self::$jsFileWrite=$ty;
	echo $jsCont;
	self::jsFileRow(self::$jsFileIni); self::$jsFileIni=[];
	self::jsFileRow(self::$jsFile); self::$jsFile=[];
	self::jsFileRow(self::$jsFileLast); self::$jsFileLast=[];
}
static public function jsFileRow($Li=array()){
	//$urlb=self::$uri_st1;
	$urlb=c::$V['URI_STATIC'];
	$ftemp='';
	foreach($Li as $n=>$L){
		$url=false;
		/* OJO, este deshabilita cache, cuidado con $a,$M */
		$fromCache=(self::$C['fileFromCache']!='N' && $L['fileCache']=='Y')?'Y':'N';
		$F['fType']='js'; $ext='js';
		if($L['css']){ $ext='css'; $L['fType']='css'; $L['src']=$L['css']; }
		$fileFrom=($L['cacheFile'])?$L['cacheFile']:$L['src'];
		$fileFrom="\n".'/*'.$fromCache.'= jsFile-cache: '.$fileFrom.', type:'.$L['type'].', from:'.$urlb.' */'."\n";
		/* llamar */
		if($L['type']=='txt' || $L['txt']){
			if(self::$jsFileWrite!='S'){ echo $fileFrom.$L['txt']; }
		}
		else if($L['type']=='sys'){ self::jsFileWrite($L['src'],$fileFrom,$L); }
		else if($L['xlib']){  self::jsFileWrite($L['xlib'],null,['fType'=>'xlib'],$fileFrom,$L); }
		else if($L['type']=='http'){ self::jsFileWrite($L['src'].'?'.$ftemp,$fileFrom.$ftemp,$L); }
		else if($fromCache=='Y'){ self::jsFileWrite($urlb.'/cache/'.$L['src'].'.'.$ext.'?'.$ftemp,$fileFrom,$L); }
		else if($L['type']=='jsB'){
			self::jsFileWrite($urlb.'/_js/load.php?read='.$L['src'],$fileFrom,$L);
		}
		else if($L['type']=='ocl'){
			self::jsFileWrite($urlb.'/ocl/'.$L['src'].'?'.$ftemp,$fileFrom,$L);
		}
		else if(self::$C['fileFromCache']=='N' && $L['lbDef']){
		self::jsFileWrite($urlb.'/lbDef.php?read='.$L['lbDef'].'&fopen=Ys',$fileFrom,$L);
		}
		else{
			self::jsFileWrite($urlb.'/'.$L['src'].'.'.$ext.'?'.$ftemp,$fileFrom,$L);
		}
	}
}
static $jsFileWrite='L'; //L o S
static public function jsFileWrite($url,$fileFrom,$L=array()){
	$Bs=array('json'=>'N');
	if(self::$jsFileWrite=='S'){
		if($url!=''){
			echo '$y.mI.push({req:\'Y\',fType:\''.$L['fType'].'\',type:\'ahttp\',src:\''.$url.$ftemp.'\'});'."\n";
		}
	}
	else if(self::$jsFileWrite!='YA'){ echo $fileFrom.xCurl::get($url.$ftemp,$Bs); }
	//else if(0){ echo $fileFrom.xCurl::get($url,$Bs); }
}
static public function pushJSFile($o2=array(),$lastt=false){
	if(is_array($o2)){ foreach($o2 as $k => $v){
		if($lastt=='ini'){ self::$jsFileIni[] = $v; }
		else if($lastt){ self::$jsFileLast[] = $v; }
		else{ self::$jsFile[] = $v; }
	}}
}


static $At=array(); /*save temp */
static public function A($sp='',$MAS=false){
	$sp=explode(',',$sp);
	foreach($sp as $k){
		if(!array_key_exists($k,self::$At)){
			self::$A[]=$k;
		}
	}
	if(is_array($MAS)){
		foreach($MAS as $k=>$X){ self::$A[]=$X; }
	}
}

static $JsV=array();
static $jsv=array();
static public function jsvReq($P=array()){ /* Añadir desde libreria modulo */
	foreach(self::$A as $nx=>$k){
		$filx=$filx2=false;
		if(is_array($k) && $k['jsv']){
			$filx=c::$V['PATH_APPI'].$k['jsv'].'/jsv.php';// nom/jsv
		}
		else{
			$filx=c::$V['PATH_MAPPS'].$k.'/jsv.php';
			$filx2=c::$V['PATH_controllers'].$k.'/jsv.php';
		}
		if(is_file($filx)){ require($filx); }
		else if(is_file($filx2)){ require($filx2); }
		else{
			echo '/* _Mdl.jsv not found ['.$filx.' , '.$filx2.']'." */ \n";
		}
	}
	
}
static public function JsVV($P=array()){ /* obtener datos jsv */
	$txt= ' /* JsVV-INI */ ';
	foreach(self::$JsV as $k=>$L){
		$kName='$JsV';
		if($L['otab']){
			$L['tbk']='a1_otab';
			$kName='$Tb';
		}
		$fie=($L['kObj'])?$L['kObj'].' kObj':'kObj';
		$fie .=',vid k,value v';;
		$fie .=($L['qf'])?','.$L['qf']:'';
		$txt .="\n".'    /* jsv:'.$L['mdl'].'-ini*/'."\n";
		$wh=($P['wh'])?'AND '.$P['wh']:'';
        $orderBy = ($L['order_by']) ? ' ORDER BY '. $L['order_by'] : '';
		$qry='SELECT '.$fie.' FROM '.$L['tbk'].' WHERE 1 '.$wh. $orderBy;
		$q=a_sql::query($qry,array(1=>1,2=>1));
		if(a_sql::$err){ $txt .= '/* error '.a_sql::$errNo.' ('.$fie.') */'; }
		else{
			$V=[];
			while($Lx=$q->fetch_assoc()){
				$k=$Lx['kObj']; unset($Lx['kObj']);
				$V[$k][]=$Lx;
			}
			foreach($V as $k=>$js){
				$txt .= $kName.'.'.$k.'='.json_encode($js).';'."\n";
			}
		}
		$txt .= '    /*jsv:'.$L['mdl'].'-end*/'."\n";
	}
		$txt.= ' /* JsVV-END */';
	return $txt;
}
static public function jsv($P=array()){ /* obtener datos jsv */
	$txt= ' /*_Mdl::jsv()-I */ ';
	foreach(self::$jsv as $k=>$L){
		$fie=($L['kObj'])?$L['kObj'].' kObj':'kObj';
		$fie .=',vid k,value v';;
		$fie .=($L['qf'])?','.$L['qf']:'';
		$txt .="\n".'/* module-jsv: '.$L['mdl'].' */'."\n";
		$wh=($P['wh'])?'AND '.$P['wh']:'';
		$qry='SELECT '.$fie.' FROM '.$L['tbk'].' WHERE 1 '.$wh;
		$q=a_sql::query($qry,array(1=>1,2=>1));
		if(a_sql::$err){ $txt .= '/* error '.a_sql::$errNo.' ('.$fie.') */'; }
		else{
			$V=[];
			while($L=$q->fetch_assoc()){
				$k=$L['kObj']; unset($L['kObj']);
				$V[$k][]=$L;
			}
			foreach($V as $k=>$js){
				$txt .= '$V.'.$k.'='.json_encode($js).';'."\n";
			}
		}
	}
		$txt.= ' /*_Mdl::jsv()-E */ ';
	return $txt;
}

static $fromTb=array();
static $fromTbU=array();
static public function fromTbU(){ return self::fromTb(self::$fromTbU); }
static public function fromTb($Mx=false){/* obtener con base a tabla
	{V, tbk, reqLib=file, txt=sol texto, txtVal,
	k, v
	wh, addFie,
	qSel: query select, join
	}
*/
	$txt=''; $br ="\n";
	$Mx=($Mx!==false)?$Mx:self::$fromTb;
	foreach($Mx as $tbVar => $K){
		$wh='';
		if($K['V']){ $tbVar=$K['V']; }
		else{ $tbVar ='$Tb.'.$tbVar; }
		$tbk=$K['tbk'];
		if($K['reqLib']){
			require_once($K['reqLib']);
			continue;
		}
		else if($K['txt']){ $txt .=$K['txt'].";\n"; continue;}
		else if($K['txtVal']){ $txt .= $tbVar.'='.$K['txtVal'].";\n"; continue;}
		$Mv=array();
		if($K['k_0']){ //0=ninguno
			$Mv[0]=array('k'=>'0','v'=>$K['k_0']);
		}
		if($K['wh']){ $wh .= ' AND '.$K['wh']; }
		$addFie=($K['addFie'])?','.$K['addFie']:'';
		if($K['qSel']){
			$q=a_sql::query('SELECT '.$K['qSel'].' WHERE 1 '.$wh.' LIMIT 1000');
		}
		else{
			$q=a_sql::query('SELECT '.$K['k'].' k,'.$K['v'].' v '.$addFie.' FROM '.$tbk.' '.$K['join'].' WHERE 1 '.$wh.' '.$K['qEnd'].' LIMIT 1000');
		}

		if(a_sql::$errNo==1){ $txt .= $tbVar.'={};'.'/* '.$tbk.' errNo 1: '.$q['error_sql'].' */'; }
		else if(a_sql::$errNo==2){ $txt .= $tbVar.'={};'.'/*  errNo 2  */'; }
		else{
			while($L=$q->fetch_assoc()){
				$k=$L['k']; $v=$L['v'];
				$As=array('k'=>$k,'v'=>$v);
				$kGr=$L['_kGr']; unset($L['k'],$L['v'],$L['_kGr']);
				foreach($L as $_k => $_v){ $As[$_k]=$_v; }
				if($kGr){
					if(!array_key_exists($kGr,$Mv)){ $Mv[$kGr]=array(); }
					$Mv[$kGr][]=$As;
				}
				else{ $Mv[]=$As; }
			}
			$txt .= $tbVar.'= '.json_encode($Mv).';'.$br;
		}
		$txt .= $br;
	}
	return $txt;
}


static public function cnfPar($accK='',$isE=false,$msg=false){
	return self::cnfGet($accK,$isE,$msg);
}
static public function cnfGets($D=[]){ //remplazada con get
	$ori=' on [_Mdl::cnfGets()]';
	$wh='';
	if($D[0]){ $wh .= 'AND accK IN '.a_sql::filters('IN',$D[0]); }
	$q=a_sql::query('SELECT accK,value FROM a0_mcnf WHERE 1 '.$wh.' LIMIT 50',array(1=>'Error revisando variable configuración.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==2){ _err::err('No se encontraron resultados.'.$ori,3); }
	else{
		c::$V['_cnf']='from a0_mcnf';
		while($L=$q->fetch_assoc()){ c::$V[$L['accK']]=$L['value']; }
	}
}
static public function cnfReq($D=[],$DV=[]){
	$ori=' on [_Mdl::cnfReq]';//usar Y-N nunc
	foreach($D as $k){
		if(!isset(c::$V[$k])){ _err::err('La variable de configuración {'.$k.'} no ha sido definida.'.$ori,3); break; }
	}
}

static public function cnfGet($accK='',$isE=false,$msg=false){ //remplazada con get
	$ori=' on [_Mdl::cnfGet()->'.$accK.']';
	$q=a_sql::fetch('SELECT value FROM a0_mcnf WHERE accK=\''.$accK.'\' LIMIT 1',array(1=>'Error revisando variable configuración.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	//else if($isE!='No.Req'){ return ''; }
	else if(a_sql::$errNo==2){ _err::err('La variable de configuración {'.$accK.'} no ha sido definida.'.$ori,3); }
	else if($isE && $q['value']!=$isE){
		if($msg){ _err::err($msg.$ori,3); }
		else{ _err::err('La variable de configuración no coincide.'); }
	}
	return $q['value'];
}
static public function cnfIs($accK='',$ev='=',$v=''){
	$ori=' on [_Mdl::cnfIs()]';
	$q=a_sql::fetch('SELECT value FROM a0_mcnf WHERE accK=\''.$accK.'\' LIMIT 1',array(1=>'Error revisando variable configuración.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); $r=false; }
	else if(a_sql::$errNo==2){ $r=false; }
	else{
		$tv=$q['value'];
		switch($ev){
			case '>' : $r=($tv>$v); break;
			case '<' : $r=($tv<$v); break;
			case '<=' : $r=($tv<=$v); break;
			case '>=' : $r=($tv>=$v); break;
			case '===' : $r=($tv===$v); break;
			case '!=' : $r=($tv!=$v); break;
			default : $r=($tv==$v); break;
		}
	}
	return $r;
}
	static $K=[];
	static public function g($k=''){
		return self::$K[$k];
	}
	static public function get($k='',$isE=null,$isReq=false){
		$ori=' on [_Mdl::get()->'.$k.']';
		$q=a_sql::fetch('SELECT value FROM a0_mcnf WHERE accK =\''.$k.'\' LIMIT 1',array(1=>'Error obteniendo variable de configuración.'.$ori));
		$ret=false;
		if(a_sql::$err){ _err::err(a_sql::$errNoText); $ret=false; }
		else if($isReq && a_sql::$errNo==2){ _err::err('{'.$k.'} La variable de configuración no ha sido definida.'.$ori,3); $ret=false; }
		else if(a_sql::$errNo==-1){
			self::$K[$k]=$q['value'];
			if($isE && $q['value']!=$isE){ $ret=false; }
			else{ $ret=$q['value']; }
		}
		return $ret;
	}
}

?>