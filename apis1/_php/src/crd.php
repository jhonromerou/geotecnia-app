<?php
class Cpr{
static $err=false;
static $errText='';
static public function get($P=array()){
	if(self::$errText=_js::ise($P['tt'],'Se debe definir tt on Cpr::get()')){ self::$err=true; }
	else if(self::$errText=_js::ise($P['tr'],'Se debe definir tr on Cpr::get()')){ self::$err=true; }
	else{
		$q=a_sql::query('SELECT A.* FROM '._0s::$Tb['par_ocpr'].' A JOIN '._0s::$Tb['par_cpr1'].' B ON (B.cprId=A.id) WHERE B.tt=\''.$P['tt'].'\' AND B.tr=\''.$B['tr'].'\' ',array(1=>'Error obteniendo lista de contacto '.$P['tt'].'-'.$P['tr'].' on Cpr::get(); ',2=>'No se encontraron contacto para '.$P['tt'].'-'.$P['tr'].' on Cpr::get(); '));
		if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
		else{
			if($P['r']=='query'){ return $q; }
			else{
				$M=array();
				while($L=$q->fetch_assoc()){
					$M[]=$L;
				}
				return $M;
			}
		}
	}
}
}
?>