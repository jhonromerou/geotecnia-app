<?php
class JApp{
static $app;
static $mdl;
static $ctrl='';
static public function init(){
 $uri = preg_replace('/^\//','',$_SERVER['REQUEST_URI']);
 $uri = preg_replace('/\?.*$/','',$uri);;
 $uri1 = preg_replace('/\/$/','',$uri);;
 $uri = explode('/',$uri1);//js/mpa/tas
 self::$app=$uri[1]; self::$mdl=$uri[2];
 self::$ctrl=self::$app.'/'.self::$mdl;
 $fController=c::$V['PATH_controllers'].self::$ctrl.'.php';
 if(file_exists($fController)){
  require($fController);
  $xApp=preg_replace_callback('/\/(\w{1})/',function($mx){ return strtoupper($mx[1]); },self::$ctrl);
  $gController=new $xApp;
  return $gController;
 }
 else{
  //die(_js::e(3,'Error cargando controller {'.$fController.'}'));
 }
}
}
 ?>
