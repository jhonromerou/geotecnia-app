<?php
JRoute::get('gvt/prd','get',['hashKey'=>'gvtPrd']);
JRoute::get('gvt/prd/tb99','logGet',['hashKey'=>'gvtPrd']);
JRoute::get('gvt/prd/{docEntry}','getOne',['hashKey'=>'gvtPrd','_wh'=>['docEntry'=>'\d+']]);
JRoute::get('gvt/prd/{docEntry}/toDoc','getOne',['hashKey'=>'gvtPrd.write','_wh'=>['docEntry'=>'\d+']]);

JRoute::post('gvt/prd','post',['hashKey'=>'gvtPrd.write']);
JRoute::put('gvt/prd/statusCancel','putStatusCancel',['hashKey'=>'gvtPrd.statusCancel']);

?>
