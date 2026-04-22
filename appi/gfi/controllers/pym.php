<?php
class gfiPym{
  static public function get($D){
    $D['from']='A.*,AC.accName
    FROM gfi_opym A
    LEFT JOIN gfi_opdc AC ON (AC.accId=A.accId)';
    return a_sql::rPaging($D);
  }
  static public function getOne($D){
    $js=false;
    if(_js::iseErr($D['pymId'],'Se debe definir ID de la condición de pago.')){}
    else{
      $q=a_sql::fetch('SELECT P.*,AC.accName FROM gfi_opym P
      LEFT JOIN gfi_opdc AC ON (AC.accId=P.accId)
      WHERE P.pymId=\''.$D['pymId'].'\' LIMIT 1',[1=>'Error obteniendo condiciones de pago',2=>'Cóndicion de pago no existe.']);
      if(a_sql::$err){ _err::err(a_sql::$errNoText); }
      else{ $js=_js::enc2($q); }
    }
    _err::errDie();
    echo $js;
  }
  static public function put($D){
    $js=false;
    if(_js::iseErr($D['pymCode'],'Se debe definir el código.')){}
    else if(_js::iseErr($D['pymName'],'Se debe definir el nombre.')){}
    else if(_js::iseErr($D['extraDays'],'Se debe definir la cantidad de dias.','numeric')){}
    else if(_js::iseErr($D['accId'],'Se debe definir la cuenta.','numeric>0')){}
    else{
      a_sql::uniRow($D,['tbk'=>'gfi_opym','wh_change'=>'pymId=\''.$D['pymId'].'\' LIMIT 1']);
      if(a_sql::$err){ _err::err('Error guardando condición de pago: '.a_sql::$errText,3); }
      else{
        $D['pymId']=($ins['insertId'])?$ins['insertId']:$D['pymId'];
        $js=_js::r('Condición de pago guardada correctamente.',$D);
      }
    }
    _err::errDie();
    echo $js;
  }
}
?>