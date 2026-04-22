<?php
JRoute::get('cnf/user/{userId}',function($D){
  print_r($D);
  echo 'Appi('.JRoute::$Appi.')';
  echo JRoute::$path;
  print_r(c::$URI);
},['_wh'=>['userId'=>'\d+']]);
?>