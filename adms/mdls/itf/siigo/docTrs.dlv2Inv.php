<?php
{$tr=array(
'tipoC'=>array('t'=>'TIPO DE COMPROBANTE (OBLIGATORIO)','d'=>'F'),
'codiC'=>array('t'=>'CÓDIGO COMPROBANTE ~(OBLIGATORIO)','d'=>'25'),
'noC'=>array('t'=>'NÚMERO DE DOCUMENTO','d'=>$D['docSiigo']),
'accCode'=>array('t'=>'CUENTA CONTABLE ~~(OBLIGATORIO)','d'=>1430050100
), 
'debCred'=>array('t'=>'DÉBITO O CRÉDITO (OBLIGATORIO)','d'=>'D'),
'valorSec'=>array('t'=>'VALOR DE LA SECUENCIA ~~(OBLIGATORIO)'),
'year'=>array('t'=>'AÑO DEL DOCUMENTO'),
'month'=>array('t'=>'MES DEL DOCUMENTO'),
'day'=>array('t'=>'DÍA DEL DOCUMENTO'),
'slpCode'=>array('t'=>'CÓDIGO DEL VENDEDOR','d'=>0),
'codeCity'=>array('t'=>'CÓDIGO DE LA CIUDAD'),
'codeZone'=>array('t'=>'CÓDIGO DE LA ZONA','d'=>1),
'lineNum'=>array('t'=>'SECUENCIA'),
'ccosto'=>array('t'=>'CENTRO DE COSTO','d'=>0),
'subccosto'=>array('t'=>'SUBCENTRO DE COSTO','d'=>''),
'nit'=>array('t'=>'NIT','d'=>1125082000),//cliente
'sucursal'=>array('t'=>'SUCURSAL','d'=>0),
'lineText'=>array('t'=>'DESCRIPCIÓN DE LA SECUENCIA'),
'noCheq'=>array('t'=>'NÚMERO DE CHEQUE','d'=>''),
'compAnulado'=>array('t'=>'COMPROBANTE ANULADO','d'=>'N'),
'codMotDev'=>array('t'=>'CÓDIGO DEL MOTIVO DE DEVOLUCIÓN','d'=>''),
'fpCode'=>array('t'=>'FORMA DE PAGO','d'=>''),//cod met pago

'valCargoSec1'=>array('t'=>'VALOR DEL CARGO 1 DE LA SECUENCIA','d'=>0),
'valCargoSec2'=>array('t'=>'VALOR DEL CARGO 2 DE LA SECUENCIA','d'=>0),
'valDescSec1'=>array('t'=>'VALOR DEL DESCUENTO 1 DE LA SECUENCIA','d'=>0),
'valDescSec2'=>array('t'=>'VALOR DEL DESCUENTO 2 DE LA SECUENCIA','d'=>0),
'curr'=>array('t'=>'TIPO MONEDA DE ELABORACIÓN','d'=>0),
'vatPrc'=>array('t'=>'PORCENTAJE DEL IVA DE LA SECUENCIA','d'=>19),//get- B.vatPrc
'vatSum'=>array('t'=>'VALOR DE IVA DE LA SECUENCIA','d'=>''),//get- B.vatSum
/* baseAmnt solo para autoretencion */
'baseRte'=>array('t'=>'BASE DE RETENCIÓN','d'=>''),
'baseCtaRteIva'=>array('t'=>'BASE PARA CUENTAS MARCADAS COMO RETEIVA','d'=>''),
'secGravada'=>array('t'=>'SECUENCIA GRAVADA O EXCENTA','d'=>''),//S solocuenta 41
'aiuPerc'=>array('t'=>'PORCENTAJE AIU','d'=>''),
'aiuBaseIva'=>array('t'=>'BASE IVA AIU','d'=>''),
'itemLine'=>array('t'=>'LÍNEA PRODUCTO'),
'itemGr'=>array('t'=>'GRUPO PRODUCTO'),
'itemId'=>array('t'=>'CÓDIGO PRODUCTO'),
'quantity'=>array('t'=>'CANTIDAD'),
'quantity2'=>array('t'=>'CANTIDAD DOS','d'=>''),
'whsCode'=>array('t'=>'CÓDIGO DE LA BODEGA'),//codigo bodega

'codeUbi'=>array('t'=>'CÓDIGO DE LA UBICACIÓN','d'=>''),
'factorQuantity'=>array('t'=>'CANTIDAD DE FACTOR DE CONVERSIÓN','d'=>''),
'factorOper'=>array('t'=>'OPERADOR DE FACTOR DE CONVERSIÓN','d'=>''),
'factorValue'=>array('t'=>'VALOR DEL FACTOR DE CONVERSIÓN','d'=>''),

'pvtType'=>array('t'=>'TIPO DOCUMENTO DE PEDIDO','d'=>''),
'pvtcomp'=>array('t'=>'CÓDIGO COMPROBANTE DE PEDIDO','d'=>''),
'pvtNum'=>array('t'=>'NÚMERO DE COMPROBANTE PEDIDO','d'=>''),
'pvtLineNum'=>array('t'=>'SECUENCIA DE PEDIDO','d'=>''),

'cruceTipo'=>array('t'=>'TIPO Y COMPROBANTE CRUCE','d'=>'F-025'),
'cruceNum'=>array('t'=>'NÚMERO DE DOCUMENTO CRUCE','d'=>''),//mismo que inicial
'cruceNumVen'=>array('t'=>'NÚMERO DE VENCIMIENTO','d'=>1),
'cruceYearDue'=>array('t'=>'AÑO VENCIMIENTO DE DOCUMENTO CRUCE','d'=>''),
'cruceMonthDue'=>array('t'=>'MES VENCIMIENTO DE DOCUMENTO CRUCE','d'=>''),
'cruceDayDue'=>array('t'=>'DÍA VENCIMIENTO DE DOCUMENTO CRUCE','d'=>''),

//finales
'_condiPago'=>array('t'=>'08000-CONDICIONES DE PAGO'),
'_lineMemo'=>array('t'=>'08001-OBSERVACIONES'),
'_oc'=>array('t'=>'08002-ORDEN DE COMPRA'),
'_op'=>array('t'=>'08003-ORDEN DE PEDIDO'),
'_makeBy'=>array('t'=>'08004-ELABORADO POR'),
'_lineMemo2'=>array('t'=>'08005-OBSERVACION'),
'_lineMemo3'=>array('t'=>'08006-OBSERVACION'),
'_lineMemo4'=>array('t'=>'08006-OBSERVACION')
);}

?>