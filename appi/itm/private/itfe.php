<?php
JRoute::get('itm/itfe/itm',function($D){
  unset($_GET['fie']);
  _ADMS::lib('sql/filter');
	return a_sql::fetchL('SELECT I.* 
  FROM itm_oitm I 
  WHERE 1 '.a_sql_filter($_GET),[1=>'Error obteniendo listado de artículo.',2=>'No se encontraron resultados.','k'=>'L'],true);
	return a_sql::fetchL('SELECT I.itemId,I.itemCode,I.itemName,I.status,I.webStatus,I.itemType,I.udm,I.itemGr,I.sellPrice,I.sellUdm,I.buyPrice,I.buyUdm,I.handInv,I.sellItem,I.buyItem,I.prdItem FROM itm_oitm I WHERE 1 ',[1=>'Error obteniendo listado de artículo.',2=>'No se encontraron resultados.','k'=>'L'],true);
});
?>