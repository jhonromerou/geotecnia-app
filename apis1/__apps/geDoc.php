<?php
$SOC_TbKeys = array(
'gtd_offc','gtd_ffc1','gtd_ffc2'
);
foreach($SOC_TbKeys as $n =>$k){ _0s::$Tb[$k]=$k; } unset($SOC_TbKeys);

//Obj::$sTy=array('geDoc'=>array('gid'=>'geDoc','otb'=>'gtd_offc','tb2'=>'gtd_ffc2'),);
class geDoc {
static $maxDepth=1000;
static $FOL=array(); //obtener todas las carpetas
static public function userShare(){
	$L=array(
	'left'=>'LEFT JOIN gtd_ffc2 B2 ON (B2.folId=A.folId AND B2.userId=\''.a_ses::$userId.'\') ',
	'wh__'=>' AND (A.userId=\''.a_ses::$userId.'\' OR (B2.userId=\''.a_ses::$userId.'\') )'
	);
	return $L;
}
static public function get($P=array()){
	$lW=self::userShare();
	$err1=($P['err1'])?$P['err1']:'Error obteniendo listado de carpetas: ';
	$err2=($P['err2'])?$P['err2']:'No se encontraron carpetas.';
	$wh=($P['wh'])?'AND '.$P['wh']:'';
	$q=a_sql::query('SELECT A.* FROM gtd_offc A '.$lW['left'].'
	WHERE A.fatherId=0 '.$wh.' '.$lW['wh'].' ',array(1=>$err1,2=>$err2));
	if(a_sql::$err){ return _js::dec(a_sql::$errNoText); }
	else{
		while($L=$q->fetch_assoc()){
			self::$FOL[]=$L;
			self::getChild($L['folId'],$P);
		}
		//$js= _js::enc(array('L'=>self::$FOL),'just'); self::$FOL=array();
		$js= self::$FOL; self::$FOL=array();
	}
	return $js;
}
static public function getoTy($P=array()){
	$err1=($P['err1'])?$P['err1']:'Error obteniendo listado de carpetas: ';
	$err2=($P['err2'])?$P['err2']:'No se encontraron carpetas.';
	$wh = 'AND A.oTy=\''.$P['oTy'].'\'';
	$wh .=($P['wh'])?'AND '.$P['wh']:'';
	$q=a_sql::query('SELECT A.* FROM gtd_offc A 
	WHERE A.fatherId=0 '.$wh.' ',array(1=>$err1,2=>$err2));
	if(a_sql::$err){ return _js::dec(a_sql::$errNoText); }
	else{
		while($L=$q->fetch_assoc()){
			self::$FOL[]=$L;
			self::getChild($L['folId'],$P);
		}
		//$js= _js::enc(array('L'=>self::$FOL),'just'); self::$FOL=array();
		$js= self::$FOL; self::$FOL=array();
	}
	return $js;
}

static $num=-1;
static public function getChild($fatherId=-1,$P=array()){
	if($fatherId<=0){ return true; }
	self::$num++;
	if(self::$num>self::$maxDepth){ die(_js::e(3,'Depth de carpetas excedido: '.self::$maxDepth.'.')); }
	$wh=($P['wh'])?'AND '.$P['wh']:'';
	$q=a_sql::query('SELECT A.* FROM gtd_offc A 
	WHERE A.fatherId=\''.$fatherId.'\''.$wh,array(1=>'Error obteniendo listado de carpetas hijas: '));
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			self::$FOL[]=$L;
			self::getChild($L['folId'],$P);
		}
	}
}

/* folder */
static $fatherDepth=0;
static public function folderPerms($M=array(),$P=array()){
	if(self::$fatherDepth>5){ _err::err(_js::e(3,'fatherDepth maximum exec.')); return false; }
	$M['parents'] .= '->'.$P['fatherId'];
	if($P['fatherId']>0){
		$M['topParentId']=$P['fatherId'];
		$fie=($P['fie'])?$P['fie'].',A.fatherId,A.folId,A.userId,A.privacity,B2.perms':'A.*,B2.perms';
		$Mpa=a_sql::fetch('SELECT '.$fie.' 
		FROM gtd_offc A 
		LEFT JOIN gtd_ffc2 B2 ON (B2.folId=A.folId AND B2.userId=\''.a_ses::$userId.'\')
		WHERE A.folId=\''.$P['fatherId'].'\' LIMIT 1
		',array(1=>'Error obteniendo información de permisos de carpeta :',2=>'La carpeta no existe para revisar los permisos.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
		else{
			/* se debe definir para poder revisar permisos de superarioes */
			$P['fatherId']=$Mpa['fatherId'];
			$M['userId']=$Mpa['userId'];
			$M['privacity']=$Mpa['privacity'];
			$M['perms']=$Mpa['perms'];
			if($Mpa['fatherId']>0){ return self::folderPerms($M,$P); }
		}
	}
	$permsOld=$M['perms']; unset($M['perms']);
	$M['folderPerms']='Y';
	$M['perms']=$permsOld;
	if($M['userId']==a_ses::$userId){
		$M['perms']='P'; $M['owner']='Y';
	}
	$pm=$P['perms'];
	$R=array('R'=>'Lectura','W'=>'Escritura','P'=>'Propietario');
	$permsAct=$R[$M['perms']]; $permsAct=($permsAct)?$permsAct:'Ninguno ('.$M['perms'].')';
	$txt=($P['permsText'])?$P['permsText']:'Se requiere permisos de '.$R[$pm].' para realizar la acción. Permisos actuales: '.$permsAct.'.'; $errs=0;
	if($pm=='P' && $M['perms']!='P'){ $errs++; }
	else if($pm=='W' && ($M['perms']!='W' && $M['perms']!='P')){ $errs++; }
	else if($pm=='R' && ($M['perms']!='R' && $M['perms']!='W' && $M['perms']!='P')){ $errs++; }
	if(!array_key_exists($pm,$R)){ $errs++; }
	if($errs>0){ _err::err(_js::e(3,$txt)); return false; }
	return $M;
}
static public function getFolder($P=array()){
	$wh=($P['WH'])?'AND '.$P['WH']:'AND A.folId=\''.$P['folId'].'\'';
	if(!$P['WH'] && $js=_js::ise($P['folId'],'Se debe definir el ID de la carpeta')){ _err::err($js); return false; }
	$lW=self::userShare();
	$fie=($P['fie'])?$P['fie'].',B2.perms':'A.*,B2.perms';
	$M=a_sql::fetch('SELECT '.$fie.'
	FROM gtd_offc A 
	'.$lW['left'].'
	WHERE 1 '.$wh.' '.$lW['wh'].' LIMIT 1',array(1=>'Error obteniendo información de carpeta',2=>'La carpeta no existe o no tiene permisos suficientes.'));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); return false; }
	$P['fatherId']=$M['fatherId']; //consulta parent
	if(!$M=self::folderPerms($M,$P)){ return false; }
	return $M;
}
}
?>