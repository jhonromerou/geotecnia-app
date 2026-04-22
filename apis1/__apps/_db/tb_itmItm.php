<?php
_TB::$F['itm_oitm']=array(
'fid'=>'itemId',
'itemId'=>array('t'=>'Id Articulo','tag'=>'vPost','req'=>'Y'),
'idAdd'=>array('t'=>'Id Adicional','tag'=>'input','type'=>'text','maxlength'=>20),
'itemCode'=>array('t'=>'Código de Artículo','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>20),
'itemName'=>array('t'=>'Nombre de Artículo','tag'=>'input','type'=>'text','req'=>'Y','maxlength'=>100),
'status'=>array('t'=>'Estado Sistema','tag'=>'active'),
'webStatus'=>array('t'=>'Estado Web','tag'=>'active','_iHelp'=>'Relacionado con documentos de ventas'),
'grsId'=>array('t'=>'Grupo Tallas','tag'=>'select','opts'=>'$V.ogrs','disabled'=>'disabled'),
'itemGr'=>array('t'=>'Grupo Artículo','tag'=>'select','opts'=>'$V.itmGrs','aGo'=>'sysd.itmGroups'),
'accGrId'=>array('t'=>'Grupo Contable','tag'=>'select','opts'=>'$Tb.oiac','_iHelp'=>'Cuentas contables que se afecta','aGo'=>'acc.itmGr'),
/* inventario */
'handInv'=>array('t'=>'Inventariable','tag'=>'YN'),
'udm'=>array('t'=>'Unidad de Medida','tag'=>'select','opts'=>'Udm.O'),
'defWhs'=>array('t'=>'Bodega por Defecto','tag'=>'select','opts'=>'$V.whsCode','aGo'=>'sysd.itmWhs'),
'canNeg'=>array('t'=>'¿Permitir Negativos?','tag'=>'select','opts'=>'$V.NY'),
'invPrice'=>array('t'=>'Costo Udm Manual','tag'=>'input','type'=>'number','inputmode'=>'numeric','min'=>0,'_iHelp'=>'Utilizado para matrices, operación = precio compra/ factor compra'),
/* Compras */
'buyItem'=>array('t'=>'Articulo de Compra','tag'=>'select','opts'=>'$V.NY'),
'buyUdm'=>array('t'=>'Unidad de Compra','tag'=>'select','opts'=>'Udm.O'),
'buyVatPrc'=>array('t'=>'% IVA Compras','tag'=>'input','type'=>'number','inputmode'=>'numeric'),
'buyPrice'=>array('t'=>'Precio Compra','tag'=>'input','type'=>'number','inputmode'=>'numeric','min'=>0),
'buyFactor'=>array('t'=>'Cant. x Und. Compra','tag'=>'input','type'=>'number','inputmode'=>'numeric','min'=>0),
/* ventas */
'sellItem'=>array('t'=>'Articulo de Venta','tag'=>'select','opts'=>'$V.NY'),
'sellUdm'=>array('t'=>'Unidad de Venta','tag'=>'select','opts'=>'Udm.O'),
'vatPrc'=>array('t'=>'% IVA Venta','tag'=>'input','type'=>'number','inputmode'=>'numeric'),
'sellPrice'=>array('t'=>'Precio Venta','tag'=>'input','type'=>'number','inputmode'=>'numeric','min'=>0),
'sellFactor'=>array('t'=>'Cant. x Und. Venta','tag'=>'input','type'=>'number','inputmode'=>'numeric','min'=>0),
);
?>