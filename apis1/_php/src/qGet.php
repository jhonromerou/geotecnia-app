<?php
class qGet{
static $D=array();
static public function onHand($k=false,$P=array()){
	Ctl::_r();
	$wh =' AND W.whsId=\''.$P['whsId'].'\'';
	$wh.=($P['itemSzId'])?' AND W.itemSzId=\''.$P['itemSzId'].'\'': '';
	$q=a_sql::fetch('SELECT W.onHand FROM '._0s::$Tb['itm_oitw'].' W WHERE W.itemId=\''.$k.'\''.$wh.' LIMIT 1',array(1=>$lnt.'Error obteniendo inventario del artículo: '));
	if(a_sql::$err){ Ctl::r(true,a_sql::$errNoText); }
	else if(a_sql::$errNo==2){ self::$D['onHand']=0; }
	else{ self::$D['onHand']=$q['onHand']; }
	return Ctl::$err;
}
static public function PeP_onHand($P=array(),$P2=array()){
	die(_js::e(3,'Migrado a wmaPep::onHand()'));
	$k=$P['itemId'];
	$wh ='';
	$wh.=($P['itemSzId'])?' AND W.itemSzId=\''.$P['itemSzId'].'\'': '';
	$wh .= ($P2['wfaClass'] && $P2['wfaClass']!='')?' AND WFA.wfaClass '.a_sql::toSe($P2['wfaClass'],'in') : ' AND WFA.wfaClass IN (\'N\',\'RC\')';
	$q=a_sql::fetch('SELECT SUM(W.onHand) onHand FROM pep_oitw W JOIN wma_owfa WFA ON (WFA.wfaId=W.wfaId) WHERE W.itemId=\''.$k.'\''.$wh.'',array(1=>$lnt.'Error obteniendo inventario del producto en proceso.'));
	if(a_sql::$err){ _err:err(a_sql::$errNoText); }
	else if(a_sql::$errNo==2){ self::$D['onHand']=0; }
	else if($q['onHand']==''){ self::$D['onHand']=0; }
	else{ self::$D=$q; }
	return self::$D;
}
}
?>
