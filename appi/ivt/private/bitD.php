<?php
JRoute::get('ivt/bitD','get');
JRoute::get('ivt/bitD/view','getOne');
JRoute::get('ivt/bitD/toCopy','toCopy');

JRoute::post('ivt/bitD','post');
JRoute::put('ivt/bitD/statusCancel','statusCancel');

JRoute::get('ivt/bitD/tb99','logGet');
JRoute::get('ivt/bitD/tbRel1','logRel1');
?>