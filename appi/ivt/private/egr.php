<?php
JRoute::get('ivt/egr','get');
JRoute::get('ivt/egr/view','getOne');
JRoute::get('ivt/egr/toCopy','toCopy');
JRoute::post('ivt/egr','post');
JRoute::get('ivt/egr/tb99','logGet');
JRoute::get('ivt/egr/tbRel1','logRel1');

JRoute::put('ivt/egr/statusCancel','putStatusCancel');
?>