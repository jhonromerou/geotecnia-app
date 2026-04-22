<?php
//todo lo relacionado con actualizaciones
function a_sql_updFieLine($bef=array(),$nue=array(),$t=array()){
	$t1 = ($t['t1'])?$t['t1']:'Actualizado';
	$de = ($t['de'])?$t['de']:'de';
	$a = ($t['a'])?$t['a']:'a';
	$keys = ($t['keys'])?$t['keys'] : array();//mo = mano de obra
	$r = '';
	foreach($bef as $k =>$v){
		if($v != $nue[$k]){
			$kk = ($keys[$k])?$keys[$k] : $k;
			$v = (is_numeric($v))?$v*1 :$v;
			$r .= $kk.' '.$de.' ('.$v.') '.$a.' ('.$nue[$k].'), ';
		}
	}
	$r = ($r!='')? $t1.' '.$r : '';
	return $r;
}
?>