<?php
JRoute::get('ivt/stock/mmr',function($D){
  if(_js::iseErr($D['whsId'],'Se debe definir un almacen','numeric>0')){}
  else if(_js::iseErr($D['itemCode'],'Defina al menos un articulo')){}
  else{
    _ADMS::lib('sql/filter');
    $wh=a_sql_filter(['W.whsId'=>$D['whsId'],'I.itemCode(E_in)'=>$D['itemCode']]);

    return a_sql::fetchL('SELECT B.id,W.whsId,I.itemId,G2.itemSzId,B.onHand,B.minStock,B.maxStock,B.reorder,I.itemCode,I.itemName FROM itm_oitm I 
    JOIN itm_grs2 G2 ON (G2.grsId=I.grsId)
    JOIN ivt_owhs W ON (W.whsId=\''.$D['whsId'].'\')
    LEFT JOIN ivt_oitw B ON (B.itemId=I.itemId AND B.itemSzId=G2.itemSzId AND B.whsId=W.whsId)
    WHERE 1 '.$wh.'
    ',['k'=>'L'],true);
  }
  _err::errDie();
});
JRoute::put('ivt/stock/mmr',function($D){
  if(_js::isArray($D['L'],'No se enviaron datos a modificar')){}
  else{
    $n=1;
    a_sql::transaction(); $c=false;
    foreach($D['L'] as $x=>$L){
      $ln='Linea '.$n.': '; $n++;
      if(_js::iseErr($L['whsId'],$ln.'No se ha definido almacen.','numeric>0')){ break; }
      else if(_js::iseErr($L['itemId'],$ln.'No se ha definido articulo.','numeric>0')){ break; }
      else if(_js::iseErr($L['itemSzId'],$ln.'No se ha definido articulo (2).','numeric>0')){ break; }
      else{
        if($L['id']){
          $L=['u','minStock'=>$L['minStock'],'maxStock'=>$L['maxStock'],'reorder'=>$L['reorder'],'_wh'=>'id=\''.$L['id'].'\' LIMIT 1','_err1'=>$ln.'Error actualizando datos'];
        }
        else{ $L[0]='i'; }
        $L[1]='ivt_oitw';
        $L['_err1']=$ln.'Error actualizando datos';
        $D['L'][$x]=$L;
      }
    }
    if(!_err::$err){ a_sql::multiQuery($D['L']); }
    if(!_err::$err){ $c=true;
      $js=_js::r('Se actualizaron los articulos correctamente');
    }
    a_sql::transaction($c);
  }
  _err::errDie();
  echo $js;
});
?>