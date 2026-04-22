<?php
JRoute::get('ivt/ing','get');
JRoute::get('ivt/ing/view','getOne');
JRoute::get('ivt/ing/toCopy','toCopy');
JRoute::post('ivt/ing','post');
JRoute::get('ivt/ing/tb99','logGet');
JRoute::get('ivt/ing/tbRel1','logRel1');

JRoute::put('ivt/ing/statusCancel','putStatusCancel');
?>