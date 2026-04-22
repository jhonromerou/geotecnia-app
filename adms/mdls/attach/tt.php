<?php
_ADMS::lib('AttachTt');
AttachTt::$rootPATH = c::$V['PATH_WEB'];
if(_0s::$router=='GET tt'){  echo AttachTt::get($_GET); }
else if(_0s::$router=='POST tt'){ echo AttachTt::post($___D); }
else if(_0s::$router=='DELETE tt') echo AttachTt::deleteSave($___D);
?>