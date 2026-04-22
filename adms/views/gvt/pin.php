<?php
JRoute::get('gvt/pin','get',['hashKey'=>'gvtPin']);
JRoute::get('gvt/pin/tb99','logGet',['hashKey'=>'gvtPin']);
JRoute::get('gvt/pin/{docEntry}','getOne',['hashKey'=>'gvtPin','_wh'=>['docEntry'=>'\d+']]);
JRoute::get('gvt/pin/{docEntry}/toDoc','getOne',['hashKey'=>'gvtPin.write','_wh'=>['docEntry'=>'\d+']]);

JRoute::post('gvt/pin','post');
JRoute::put('gvt/pin/statusCancel','putStatusCancel',['hashKey'=>'gvtPin.statusCancel']);
?>
