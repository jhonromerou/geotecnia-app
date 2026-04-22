<?php
JRoute::get('gvt/sdn','get');
JRoute::get('gvt/sdn/view','getOne');
JRoute::get('gvt/sdn/form','getOne');
JRoute::get('gvt/sdn/tb99','logGet');
JRoute::get('gvt/sdn/tbRel1','logRel1');

JRoute::post('gvt/sdn','post');
JRoute::put('gvt/sdn','put');
JRoute::put('gvt/sdn/statusCancel','putStatusCancel');
JRoute::put('gvt/sdn/statusClose','putStatusClose');

JRoute::get('gvt/sdn/{docEntry}/packing','getPacking',['_wh'=>['docEntry'=>'\d+']]);
JRoute::get('gvt/sdn/packingSet','packingSet');
JRoute::put('gvt/sdn/packingSet','putPackingSet');
?>
