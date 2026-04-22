<?php
class Cpr{
static $err=false;
static $errText='';
static public function get($P=array()){
	//if(self::$errText=_js::ise($P['tt'],'Se debe definir tt on Cpr::get()')){ self::$err=true; }
	if(self::$errText=_js::ise($P['tr'],'Se debe definir tr on Cpr::get()')){ self::$err=true; }
	else{
		$wh=($P['wh'])?' AND '.$P['wh']:'';
		$fie=($P['f'] && $P['f']!='')?$P['f']:'A.id,A.name';
		$q=a_sql::query('SELECT '.$fie.' FROM par_ocpr A WHERE A.cardId=\''.$P['tr'].'\' '.$wh,array(1=>'Error obteniendo lista de contacto '.$P['tt'].'-'.$P['tr'].' on Cpr::get(); ',2=>'No se encontraron contacto para '.$P['tt'].'-'.$P['tr'].' on Cpr::get(); '));
		if(a_sql::$err){ self::$err=true; self::$errText=a_sql::$errNoText; }
		else{
			if($P['r']=='query'){ return $q; }
			else{
				$M=array(); 
				while($L=$q->fetch_assoc()){
					if($P['k']){$M[$L[$P['k']]]=$L; }
					else{ $M[]=$L; }
				}
				return $M;
			}
		}
	}
}
}
?>