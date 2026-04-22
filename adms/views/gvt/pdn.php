<?php
JRoute::get('gvt/pdn','get',['hashKey'=>'gvtPdn']);
JRoute::get('gvt/pdn/tb99','logGet',['hashKey'=>'gvtPdn']);
JRoute::get('gvt/pdn/{docEntry}','getOne',['hashKey'=>'gvtPdn','_wh'=>['docEntry'=>'\d+']]);
JRoute::get('gvt/pdn/{docEntry}/toDoc','getOne',['hashKey'=>'gvtPdn.write','_wh'=>['docEntry'=>'\d+']]);

JRoute::post('gvt/pdn','post',['hashKey'=>'gvtPdn.write']);
JRoute::put('gvt/pdn/statusCancel','putStatusCancel',['hashKey'=>'gvtPdn.statusCancel']);
?>
