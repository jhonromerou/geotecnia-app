<?php
JRoute::get('gvt/srd','get');
JRoute::get('gvt/srd/view','getOne');
JRoute::get('gvt/srd/tb99','logGet');
JRoute::get('gvt/srd/form','getOne');
JRoute::get('gvt/srd/tbRel1','logRel1');

JRoute::post('gvt/srd','post');
JRoute::put('gvt/srd','put');
JRoute::put('gvt/srd/statusSend','putStatusSend');
JRoute::put('gvt/srd/statusClose','putStatusClose');
JRoute::put('gvt/srd/statusCancel','putStatusCancel');
?>
