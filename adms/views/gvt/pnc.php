<?php
JRoute::get('gvt/pnc','get',['hashKey'=>'gvtPnc']);
JRoute::get('gvt/pnc/tb99','logGet',['hashKey'=>'gvtPnc']);
JRoute::get('gvt/pnc/{docEntry}','getOne',['hashKey'=>'gvtPnc','_wh'=>['docEntry'=>'\d+']]);
JRoute::get('gvt/pnc/{docEntry}/toDoc','getOne',['hashKey'=>'gvtPnc.write','_wh'=>['docEntry'=>'\d+']]);

JRoute::post('gvt/pnc','post',['hashKey'=>'gvtPnc.write']);
JRoute::put('gvt/pnc/statusCancel','putStatusCancel',['hashKey'=>'gvtPnc.statusCancel']);
?>
