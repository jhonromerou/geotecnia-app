<?php
JRoute::get('gvt/por','get');
JRoute::get('gvt/por/tb99','logGet');
JRoute::get('gvt/por/view','getOne');
JRoute::get('gvt/por/form','getOne');
JRoute::get('gvt/por/toCopy','toCopy');

JRoute::post('gvt/por','post');
JRoute::put('gvt/por','put');
JRoute::put('gvt/por/statusOpen','putStatusOpen');
JRoute::put('gvt/por/statusClose','putStatusClose');
JRoute::put('gvt/por/statusCancel','putStatusCancel');

?>
