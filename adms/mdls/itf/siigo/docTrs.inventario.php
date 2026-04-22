<?php
{$tr=array(
'tipoC'=>array('t'=>'TIPO DE COMPROBANTE (OBLIGATORIO)','d'=>'O'),//O=Inventario,  F=FV, G=Egreso, P=Compra
'codiC'=>array('t'=>'CÓDIGO COMPROBANTE ~(OBLIGATORIO)','d'=>'45'),//45
'noC'=>array('t'=>'NÚMERO DE DOCUMENTO (OBLIGATORIO)','d'=>$D['docSiigo']),
'debAcc'=>array('t'=>'CUENTA CONTABLE ~~(OBLIGATORIO)','d'=>1430050100
), //Todos=1430050100
'debCred'=>array('t'=>'DÉBITO O CRÉDITO (OBLIGATORIO)','d'=>'D'),//1430..= D, 141098...=C
'valorSec'=>array('t'=>'VALOR DE LA SECUENCIA ~~(OBLIGATORIO)'),//cant x costo unitario
'year'=>array('t'=>'AÑO DEL DOCUMENTO'),
'month'=>array('t'=>'MES DEL DOCUMENTO'),
'day'=>array('t'=>'DÍA DEL DOCUMENTO'),
'slpCode'=>array('t'=>'CÓDIGO DEL VENDEDOR','d'=>0),//1
'codeCity'=>array('t'=>'CÓDIGO DE LA CIUDAD','d'=>111),//560
'codeZone'=>array('t'=>'CÓDIGO DE LA ZONA','d'=>1),//0
'lineNum'=>array('t'=>'SECUENCIA'),//1,2 numero de linea
'ccosto'=>array('t'=>'CENTRO DE COSTO','d'=>200),//0
'subccosto'=>array('t'=>'SUBCENTRO DE COSTO','d'=>''),//0
'nit'=>array('t'=>'NIT','d'=>1125082000),//890.904.603=fc70, 891400726=alp
'SUCURSAL'=>array('t'=>'SUCURSAL','d'=>0),//0
'itemName'=>array('t'=>'DESCRIPCIÓN DE LA SECUENCIA'),//Bota Piel Amarilla DE # 39
'noCheq'=>array('t'=>'NÚMERO DE CHEQUE','d'=>''),//0
'compAnulado'=>array('t'=>'COMPROBANTE ANULADO','d'=>'N'),//N
'codMotDev'=>array('t'=>'CÓDIGO DEL MOTIVO DE DEVOLUCIÓN','d'=>''),//0
'payMethod'=>array('t'=>'FORMA DE PAGO','d'=>''),//0

'valCargoSec1'=>array('t'=>'VALOR DEL CARGO 1 DE LA SECUENCIA','d'=>''),//0
'valCargoSec2'=>array('t'=>'VALOR DEL CARGO 2 DE LA SECUENCIA','d'=>''),//0
'valDescSec1'=>array('t'=>'VALOR DEL DESCUENTO 1 DE LA SECUENCIA','d'=>''),//0
'valDescSec2'=>array('t'=>'VALOR DEL DESCUENTO 2 DE LA SECUENCIA','d'=>''),//0
'ivaPerc'=>array('t'=>'PORCENTAJE DEL IVA DE LA SECUENCIA','d'=>''),//0
'ivaTax'=>array('t'=>'VALOR DE IVA DE LA SECUENCIA','d'=>''),//0
'baseRte'=>array('t'=>'BASE DE RETENCIÓN','d'=>''),//0
'baseCtaRteIva'=>array('t'=>'BASE PARA CUENTAS MARCADAS COMO RETEIVA','d'=>''),//0
'secGravada'=>array('t'=>'SECUENCIA GRAVADA O EXCENTA','d'=>''),//si o no
'aiuPerc'=>array('t'=>'PORCENTAJE AIU','d'=>''),
'aiuBaseIva'=>array('t'=>'BASE IVA AIU','d'=>''),

'_itemLine'=>array('t'=>'LÍNEA PRODUCTO'),//199,999,302
'_itemGr'=>array('t'=>'GRUPO PRODUCTO'),//1,3234
'itemIdSiigo'=>array('t'=>'CÓDIGO PRODUCTO'),//1,3234
'quantity'=>array('t'=>'CANTIDAD'),
'quantity2'=>array('t'=>'CANTIDAD DOS','d'=>''),//0
'whsCode'=>array('t'=>'CÓDIGO DE LA BODEGA'),//100=C70, 200=Centro Log, 300=Bogota

'codeUbi'=>array('t'=>'CÓDIGO DE LA UBICACIÓN','d'=>''),//0
'factorQuantity'=>array('t'=>'CANTIDAD DE FACTOR DE CONVERSIÓN','d'=>''),//misma que quantity
'factorOper'=>array('t'=>'OPERADOR DE FACTOR DE CONVERSIÓN','d'=>''),//0
'factorValue'=>array('t'=>'VALOR DEL FACTOR DE CONVERSIÓN','d'=>''),//0

'grActivos'=>array('t'=>'GRUPO ACTIVOS','d'=>''),
'codeActivo'=>array('t'=>'CÓDIGO ACTIVO','d'=>''),
'adicMejora'=>array('t'=>'ADICIÓN O MEJORA','d'=>''),
'vecesADeprec'=>array('t'=>'VECES ADICIONALES A DEPRECIAR POR ADICIÓN O MEJORA','d'=>''),
'vecesADeprecNIIF'=>array('t'=>'VECES A DEPRECIAR NIIF','d'=>''),

'suppCardId'=>array('t'=>'NÚMERO DEL DOCUMENTO DEL PROVEEDOR','d'=>''),//0
'suppPrefix'=>array('t'=>'PREFIJO DEL DOCUMENTO DEL PROVEEDOR','d'=>''),//0
'suppYear'=>array('t'=>'AÑO DOCUMENTO DEL PROVEEDOR','d'=>''),//0
'suppMonth'=>array('t'=>'MES DOCUMENTO DEL PROVEEDOR','d'=>''),//0
'suppDay'=>array('t'=>'DÍA DOCUMENTO DEL PROVEEDOR','d'=>''),//0
'tipCruce'=>array('t'=>'TIPO DOCUMENTO DE PEDIDO','d'=>''),//0

'codeCompPedido'=>array('t'=>'CÓDIGO COMPROBANTE DE PEDIDO','d'=>''),//0
'numCompPedido'=>array('t'=>'NÚMERO DE COMPROBANTE PEDIDO','d'=>''),//0
'secPedido'=>array('t'=>'SECUENCIA DE PEDIDO','d'=>''),//0
'tipoCompCruce'=>array('t'=>'TIPO Y COMPROBANTE CRUCE','d'=>''),//0

'numCruce'=>array('t'=>'NÚMERO DE DOCUMENTO CRUCE','d'=>''),//0
'numDue'=>array('t'=>'NÚMERO DE VENCIMIENTO','d'=>''),//0
'yearDue'=>array('t'=>'AÑO VENCIMIENTO DE DOCUMENTO CRUCE','d'=>''),//0
'monthDue'=>array('t'=>'MES VENCIMIENTO DE DOCUMENTO CRUCE','d'=>''),//0
'dayDue'=>array('t'=>'DÍA VENCIMIENTO DE DOCUMENTO CRUCE','d'=>''),//0
/* nuevps */
'cajaComp'=>array('t'=>'NÚMERO DE CAJA ASOCIADA AL COMPROBANTE','d'=>''),
'concepNom'=>array('t'=>'CONCEPTO DE NÓMINA','d'=>''),
'dias'=>array('t'=>'CANTIDAD (DÍAS /HORAS. ETC)','d'=>''),
'tipoPago'=>array('t'=>'TIPO DE PAGO','d'=>''),

'concepFac'=>array('t'=>'CONCEPTO DE FACTURACIÓN','d'=>''),
'grInm'=>array('t'=>'GRUPO DEL INMUEBLE','d'=>''),
'subGrInm'=>array('t'=>'SUBGRUPO DEL INMUEBLE','d'=>''),
'numInm'=>array('t'=>'NÚMERO DEL INMUEBLE','d'=>'')
);}
?>