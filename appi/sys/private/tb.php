<?php
JRoute::get('sys/tb',function($D){
  //kMdl,kObj
  $D['from']='vid,kObj,value,jsd FROM a1_otab ';
	return a_sql::rPaging($D);
});
JRoute::get('sys/tb/form',function($D){
	$q= a_sql::fetch('SELECT * FROM a1_otab WHERE vid=\''.$D['vid'].'\' LIMIT 1',array(1=>'Error obteniendo variable'.$kv,2=>'La información a actualizar no existe'));
	if(a_sql::$err){ echo a_sql::$errNoText; }
	else{
    echo _js::enc2($q); 
  }
});
JRoute::post('sys/tb',function($D){
	if(_js::iseErr($D['kMdl'],'kMdl de estar definido')){}
	else if(_js::iseErr($D['kObj'],'kObj de estar definido')){}
	else if(_js::iseErr($D['value'],'Complete los campos requeridos')){}
	else{
		$vid=$D['vid'];
		$Dx=[];
		foreach($D as $k=>$v){
			if(preg_match('/^(vid|kMdl|kObj|actived|value)$/',$k)){ continue; }
			$Dx[$k]=$v; unset($D[$k]);
		}
		$D['jsd']=json_encode($Dx);
		$ins=a_sql::uniRow($D,array('tbk'=>'a1_otab','wh_change'=>'vid=\''.$vid.'\' LIMIT 1'));
		if(a_sql::$err){ _err::err('Error guardando información: '.a_sql::$errText,3); }
		else{
			$D['vid']=($ins['insertId'])?$ins['insertId']:$vid;
			$o=array('vid'=>$D['vid'],'value'=>$D['value']);
			$js=_js::r('Información guardada correctamente.',$o);
		}
  }
  _err::errDie();
	echo $js;
});
JRoute::put('sys/tb',function($D){
	if(_js::iseErr($D['vid'],'ID no definido para modificar')){}
	else if(_js::iseErr($D['kMdl'],'kMdl de estar definido')){}
	else if(_js::iseErr($D['kObj'],'kObj de estar definido')){}
	else if(_js::iseErr($D['value'],'Complete los campos requeridos')){}
	else{
		$vid=$D['vid'];
		$Dx=[];
		foreach($D as $k=>$v){
			if(preg_match('/^(vid|kMdl|kObj|actived|value)$/',$k)){ continue; }
			$Dx[$k]=$v; unset($D[$k]);
		}
		$D['jsd']=json_encode($Dx);
		$ins=a_sql::uniRow($D,array('tbk'=>'a1_otab','wh_change'=>'vid=\''.$vid.'\' LIMIT 1'));
		if(a_sql::$err){ _err::err('Error guardando información: '.a_sql::$errText,3); }
		else{
			$D['vid']=($ins['insertId'])?$ins['insertId']:$vid;
			$o=array('vid'=>$D['vid'],'value'=>$D['value']);
			$js=_js::r('Información guardada correctamente.',$o);
		}
  }
  _err::errDie();
	echo $js;
});
?>