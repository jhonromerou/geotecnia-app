<?php
class cnfUsers{
  static public function index($G){
    _ADMS::lib('sql/filter');
    $_GET['wh']['user(E_noIgual)']='supersu';
    echo a_sql::queryL('SELECT A.* FROM a0_vs0_ousr A WHERE 1 '.a_sql_filter($_GET['wh']).' '.a_sql::nextLimit());
  }
  static public function store($D){
    JxDoc::formRequire($D,[
      ['k'=>'user','req'=>'Y','regExp'=>'[\w|\.]+','minLen'=>1,'maxLen'=>20,'iMsg'=>'Usuario'],
      ['k'=>'userName','req'=>'Y','minLen'=>1,'maxLen'=>50,'iMsg'=>'Nombre del usuario'],
      ['k'=>'userEmail','maxLen'=>100,'iMsg'=>'Email'],
      ['k'=>'password','req'=>'Y','maxLen'=>50,'iMsg'=>'Contraseña'],
    ]);
    _err::errDie();
    if(!_err::$err){
      a_sql::transaction(); $c=false;
      $P=$D['perms'];
      $slps=$D['slps']; $S=$D['S'];
      unset($D['slps'],$D['S'],$D['perms']);
      $Dr=a_sql::uniRow($D,['tbk'=>'a0_vs0_ousr','wh_change'=>'userId=\''.$D['userId'].'\' LIMIT 1']);
      $userId=($Dr['insertId'])?$Dr['insertId']:$D['userId'];
      /* permisos sobre slps*/
      if(!_err::$err){
        $D2=array('userId'=>$userId,'slps'=>$slps,'slpIds'=>'');
        if(is_array($S) && $slps=='ids') foreach($S as $Lx){
          if($Lx['allow']=='Y'){ $D2['slpIds'].= $Lx['slpId'].','; }
        }
        $ins=a_sql::uniRow($D2,array('tbk'=>'a0_vs0_ousp','wh_change'=>'userId=\''.$D['userId'].'\' LIMIT 1'));
		    if(a_sql::$err){ _err::err('Error asignando permisos sobre responsables: '.a_sql::$errNoText,3); }
      }
      /* permisos acceso */
      if(!_err::$err && is_array($P) && count($P)>0){
        $D2=array('userId'=>$userId,'hashKey'=>'','perms'=>'');
        foreach($P as $k=>$v){
          if($v=='Y'){ $D2['perms'] .= '"'.$k.'":1,'; }
        }
		    $D2['perms'] = '{'.substr($D2['perms'],0,-1).'}';
		    $ins=a_sql::uniRow($D2,array('tbk'=>'a0_vs0_ousa','wh_change'=>'userId=\''.$D['userId'].'\' LIMIT 1'));
		    if(a_sql::$err){ _err::err('Error asignando permisos: '.a_sql::$errNoText,3); }
      }
      if(!_err::$err){ $c=true;
        $js=_js::r('Información de usuario guardada correctamente.',['userId'=>$userId,'userName'=>$D['userName']]);
      }
      a_sql::transaction($c); 
    }
    _err::errDie();
    echo $js;
  }
  static public function update($D){
    return self::store($D);
  }
  static public function show($id){
    $M=a_sql::fetch('SELECT A.* FROM a0_vs0_ousr A WHERE userId=\''.$_GET['userId'].'\' LIMIT 1',[1=>'Error obteniendo información del usuario',2=>'El usuario no existe']);
    if(a_sql::$err){ return _err::err(a_sql::$errNoText); }
    else{
      $p=a_sql::fetch('SELECT perms FROM a0_vs0_ousa WHERE userId=\''.$_GET['userId'].'\' LIMIT 1',array(1=>'Error obteniendo permisos para usuario: '));
      $M['perms']=$p['perms'];
      $p=a_sql::fetch('SELECT slps,slpIds FROM a0_vs0_ousp WHERE userId=\''.$_GET['userId'].'\' LIMIT 1',array(1=>'Error obteniendo permisos para usuario: '));
      $M['slps']=$p['slps']; $M['slpIds']=$p['slpIds'];
    }
    return _js::enc2($M);
  }
}
?>