<?php
class iPerms{
static public function ousp($pT='slps'){
	$ori =' on[iPerms::ousp()] ';
	$a=a_sql::fetch('SELECT slps,slpIds FROM a0_vs0_ousp WHERE userId=\''.a_ses::$userId.'\' LIMIT 1',array(1=>'Error obteniendo información de permisos para su usuario: '.$ori,2=>'El usuario no existe.'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	if($pT=='slps'){
		if($a['slps']=='all'){ $a['slpIds']=' IS NOT NULL '; }
		else if($a['slps']=='none'){ _err::err('Su usuario no tiene definido permisos para visualizar responsables de ventas.'.$ori,3); }
		else if($a['slps']=='ids'){
			$a['slpIds']=($a['slpIds']!='')?'IN ('.$a['slpIds'].') ': '=\'X\'';
		}
	}
	return $a;
}
static public function slp2Crd($cardId=0){
	$ori =' on[iPerms::slp2Crd()] ';
	$u=self::ousp();
	if(_err::$err){ }
	else if($u['slps']=='ids'){
		$q=a_sql::query('SELECT A.slpId,A.cardId
		FROM par_ocrd A
		WHERE A.cardId=\''.$cardId.'\' AND A.slpId '.$u['slpIds'].' LIMIT 1 ',array(1=>'Error obteniendo información de socio para revisión de permisos.'.$ori,2=>'El socio de negocios no existe o no tiene permisos para visualizarlo.'.$ori));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	}
}
}

class uPerms{
static $tbk7='mdl_xxx7';
static public function joinn($P=array()){
	return array(
	'fx'=>'IF(T7.lineType=\'T\',UT1.userId,T7.memId) mUserId',
	'wh'=>' ((T7.lineType=\'U\' AND T7.memId=\''.a_ses::$userId.'\') OR (T7.lineType=\'T\' AND UT1.userId=\''.a_ses::$userId.'\')) ',
	't7On'=>'JOIN '.$P['tbk7'].' T7 ON',
	't7'=>'JOIN '.$P['tbk7'].' T7 ON (T7.gid=\''.$P['gid'].'\')',
	't'=>'JOIN a0_ust1 UT1 ON (T7.lineType=\'T\' AND UT1.teamId=T7.memId AND UT1.userId=\''.a_ses::$userId.'\')'
	);
}
static public function verif($P=array()){
	//gid,memId.fieU
	//Revisa que usuario propietario, que sea usuario defino o usuario de equipo definido
	$ori =' on[uPerms::verif()] ';
	$rJ=self::joinn($P);
	$p1=($P[1])?$P[1].$ori:'Error consultando tabla de permisos'.$ori;
	$qf=a_sql::fetch('SELECT '.$rJ['fx'].',T7.perms,UT1.teamId
	FROM '.$P['tbk7'].' T7
	LEFT '.$rJ['t'].'
	WHERE T7.gid=\''.$P['gid'].'\' LIMIT 1',array(1=>$p1));
	if(a_sql::$err){ $js=_err::err(a_sql::$errNoText); }
	else{
		if($qf['mUserId']==0 && $qf['mTeamId']==0){ $qf['perms']='N'; }
	}
	if($P['perms'] && $P['perms']!=$qf['perms']){
		_err::err('No tiene permisos para realizar está información. Requiere perms('.$P['perms'].').'.$ori,3);
	}
	return $qf;
}
static public function put($gid,$Lx=array()){
	$ori=' on[uPerms::put()]';
	if(_js::iseErr($gid,'gid debe estar definido para realizar la acción.'.$ori,'numeric>0')){}
	else{
		$errs=0; //lineType,memType,memId,perms
		$qI=array();
		if(isset($Lx)) foreach($Lx as $n=>$L){
				if(_js::iseErr($L['memId'],'memId debe estar definido para realizar la acción.'.$ori,'numeric>0')){ $errs=1; break; }
				else if(_js::iseErr($L['perms'],'Se deben definir los permisos a otorgar.')){ $errs=1; break; }
				else{
					$L[0]='i'; $L[1]=self::$tbk7;
					$L['gid']=$gid;
					$L['_unik']='id';
					$qI[]=$L;
				}
		}
		if($errs==0 && count($qI)>0){
			a_sql::multiQuery($qI);
			if(_err::$err){}
		}
	}
}
}
?>
