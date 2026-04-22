<?php
JRoute::get('itm/profile',function($D){
	$D['from']='I.itemId,I.itemCode,I.itemName,I.status,I.webStatus,I.itemType,I.udm,I.itemGr,I.sellPrice,I.sellUdm,I.buyPrice,I.buyUdm,I.handInv,I.sellItem,I.buyItem,I.prdItem FROM itm_oitm I
	';
	return a_sql::rPaging($D,false,[1=>'Error obteniendo listado de artículo.',2=>'No se encontraron resultados.']);
});
JRoute::get('itm/profile/view',function($D){
	if($js=_js::ise($D['itemId'],'Se debe definir el ID del artículo.')){ die($js); }
	$q=a_sql::fetch('SELECT * FROM itm_oitm I WHERE itemId=\''.$D['itemId'].'\' LIMIT 1',array(1=>'Error obteniendo información de artículo.',2=>'No se encontró el artículo.'));
	if(a_sql::$errNoText!=''){ $js=a_sql::$errNoText; }
	else{
		$q['LG']=a_sql::fetch('SELECT * FROM itm_oitl WHERE itemId=\''.$_GET['itemId'].'\' LIMIT 1');
		$q2=a_sql::query('SELECT * FROM itm_itp1 WHERE itemId=\''.$_GET['itemId'].'\' ',array(1=>'Error obteniendo propiedades de artículo.'));
		$q['Prp']=array();
		if(a_sql::$err){ $q['Prp']=a_sql::$errNoText; }
		else if(a_sql::$errNo==-1){
			while($L=$q2->fetch_assoc()){
				unset($L['itemId'],$L['id']);
				foreach($L as $k=>$v){ $q['Prp'][$k]=$v; }
			}
		}
		$js =_js::enc2($q);
	}
	return $js;
});
?>