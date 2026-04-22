<?php
JRoute::get('gvt/pnd','get',['hashKey'=>'gvtPnd']);
JRoute::get('gvt/pnd/tb99','logGet',['hashKey'=>'gvtPnd']);
JRoute::get('gvt/pnd/{docEntry}','getOne',['hashKey'=>'gvtPnd','_wh'=>['docEntry'=>'\d+']]);
JRoute::get('gvt/pnd/{docEntry}/toDoc','getOne',['hashKey'=>'gvtPnd.write','_wh'=>['docEntry'=>'\d+']]);

JRoute::post('gvt/pnd','post',['hashKey'=>'gvtPnd.write']);
JRoute::put('gvt/pnd/statusCancel','putStatusCancel',['hashKey'=>'gvtPnd.statusCancel']);
?>
