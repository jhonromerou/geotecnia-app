<?php
JRoute::get('gvt/sop','get');
JRoute::get('gvt/sop/view','getOne');
JRoute::get('gvt/sop/form','getOne');
JRoute::get('gvt/sop/tb99','logGet');
JRoute::get('gvt/sop/tbRel1','logRel1');
JRoute::get('gvt/sop/toCopy','getOne');

JRoute::post('gvt/sop','post');
JRoute::put('gvt/sop','put');
JRoute::put('gvt/sop/statusCancel','putStatusCancel');
JRoute::put('gvt/sop','putStatucClose');
?>
