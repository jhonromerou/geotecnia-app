<?php
if(_0s::$router=='GET ousp'){
	_ADMS::_lb('sql/filter');
	echo a_sql::queryL('SELECT A.*,B.users,B.slps,B.wsus,B.whss FROM a0_vs0_ousr A 
	LEFT JOIN a0_vs0_ousp B ON (B.userId=A.userId)
	WHERE 1 '.a_sql_filtByT($_GET['wh']).' '.a_sql::nextLimit());
}
else if(_0s::$router=='GET ousp/form'){
	_ADMS::_lb('sql/filter');
	//$_GET['wh']['user(E_noIgual)']='supersu';
	$R=a_sql::fetch('SELECT U.userId, A.* FROM a0_vs0_ousr U LEFT JOIN a0_vs0_ousp A ON (A.userId=U.userId) WHERE U.userId=\''.$_GET['userId'].'\' LIMIT 1',array(1=>'Error obteniendo permisos asignados.'));
	if(a_sql::$err){ echo a_sql::$errNoText; }
	else{ 
		$Rx=array('cards','slps','slpIds','users','userIds','wsuIds');
		foreach($Rx as $k){ if($R[$k]=='null' || !$R[$k]){ $R[$k]=''; } }
		echo _js::enc2($R);
	}
}
else if(_0s::$router=='PUT ousp'){
	if($js=_js::ise($_J['userId'],'Se debe definir el usuario a definir permisos.','numeric>0')){}
	//else if($js=_js::ise($_J['users'],'Se debe definir tipo de permisos sobre otros usuarios.')){}
	//else if($js=_js::ise($_J['slps'],'Se debe definir tipo de permisos sobre responsables de ventas.')){}
	else{
		$U=array();
		a_sql::transaction(); $c=false;
		if(is_array($_J['SU'])){
			$_J['wsuIds']=''; 
			foreach($_J['SU'] as $id=>$L){
				if($L['A']=='Y'){ $U[]=$L['vid']; }
			}
			$_J['wsuIds']=implode(',',$U);
		} unset($_J['SU']);
		if(is_array($_J['WH'])){
			$_J['whsIds']=''; 
			foreach($_J['WH'] as $id=>$L){
				if($L['A']=='Y'){ $U[]=$L['whsId']; }
			}
			$_J['whsIds']=implode(',',$U);
		} unset($_J['WH']);
		if(!_err::$err && $_J['users']=='ids'){
			$_J['userIds']=''; 
			if(is_array($_J['U'])){
				foreach($_J['U'] as $id=>$L){
					if($L['A']=='Y'){ $U[]=$L['userId']; }
				}
				$_J['userIds']=implode(',',$U);
			} unset($_J['U']);
		}
		if(!_err::$err && $_J['slps']=='ids'){
			$_J['slpIds']=''; $U=array();
			if(is_array($_J['S'])){
				foreach($_J['S'] as $id=>$L){
					if($L['A']=='Y'){ $U[]=$L['slpId']; }
				}
				$_J['slpIds']=implode(',',$U);
			}
		}
		unset($_J['U'],$_J['S'],$U);
		if(!$_J['users']){ $_J['users']='me'; }
		else if($_J['users']=='all'){ $_J['userIds']=''; }
		if(!$_J['slps']){ $_J['slps']='ids'; }
		else if($_J['slps']=='all'){ $_J['slpIds']=''; }
		if(!$_J['wsus']){ $_J['wsus']='ids'; }
		else if($_J['wsus']=='all'){ $_J['wsuIds']=''; }
		if(!$_J['whss']){ $_J['whss']='ids'; }
		else if($_J['whss']=='all'){ $_J['whsIds']=''; }
		if(!_err::$err){
			a_sql::uniRow($_J,array('tbk'=>'a0_vs0_ousp','wh_change'=>'userId=\''.$_J['userId'].'\' LIMIT 1'));
			if(a_sql::$err){ $js=_js::e(3,'Error asignando los permisos: '.a_sql::$errText); }
			else{ $c=true;
				$js=_js::r('Permisos asignados correctamente.');
			}
		}
		a_sql::transaction($c);
	}
	echo $js;
}

?>