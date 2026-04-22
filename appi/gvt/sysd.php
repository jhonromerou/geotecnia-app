<?php
/* mdlk=wmaDef*/
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt','mdlk'=>'gvt','jsV'=>'$jSoc','k'=>'gvtPvt_dueDate','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'T', 'descrip'=>'Tipo de fecha de Entrega. M=Manual, T=Hoy, D=Con base a días', 'tag'=>'textarea'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt','mdlk'=>'gvt','jsV'=>'$jSoc','k'=>'gvtPvt_minDaysToDeliv','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Días mínimos para entrega', 'tag'=>'number'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtPvt_docDateDisabled','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Deshabilitar modificación fecha documento', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'NullRequestOpts_opvt','editable'=>'N', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Orden de Venta - Motivos de Anulación', 'tag'=>'textarea'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'opvt_showLastBuyPrice','editable'=>'Y', 'ini'=>'N', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Mostrar último precio de venta al añadir linea', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtPvt_requireOCAttachment','editable'=>'Y', 'ini'=>'N', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Anexar archivo obligatoriamente', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtDlv_showRefs','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Entrega Venta - Mostrar Refs de Documento', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtCvt_lineMemoLen','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Cotización Venta - Longuitud máxima texto de linea', 'tag'=>'number'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtCvt_requireCurr','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Cotización Venta - Requiere definir moneda', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$Soc','k'=>'gvtPvtPrepa','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Información pie pagina prepago', 'tag'=>'textarea'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtPvt_OCUnique','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Requiere OC única por pedido', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtPvt_templateLines','editable'=>'N', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orde de Venta - Head Doc', 'tag'=>'textarea'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$Tpt','k'=>'$Tpt.gvtCvt_template','editable'=>'N', 'ini'=>'N', 'type'=>'t', 'v'=>'', 'descrip'=>'Cotización Venta - Función pantilla', 'tag'=>'N'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtPvt_pymntGr','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Requiere condiciones de pago', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtCvt_handCard','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Cotización Venta - Socio de Negocios Manual', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtPvt_discPf','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Descuento Pie Factura activo', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtCvt_tptUse','editable'=>'N', 'ini'=>'N', 'type'=>'t', 'v'=>'', 'descrip'=>'Cotización Venta - Plantilla Definida', 'tag'=>'N'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'gvtPvt_maxDiscDef','editable'=>'Y', 'ini'=>'Y', 'type'=>'t', 'v'=>'', 'descrip'=>'Orden de Venta - Revisar y no permitir descuento mayor al autorizado para el cliente', 'tag'=>'YN'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'NullRequestOpts_gvtDlv','editable'=>'N', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Entrega de Venta - Motivos de Anulación', 'tag'=>'textarea'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$jSoc','k'=>'NullRequestOpts_gvtCvt','editable'=>'N', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Cotización de Venta - Motivos de Anulación', 'tag'=>'textarea'));
/* Colorimetria */
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'ColMt','k'=>'gvtCvtStatus','editable'=>'Y', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Cotización de Venta - Colorimetria Estado', 'tag'=>'colorMt'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'ColMt','k'=>'gvtPvtStatus','editable'=>'Y', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Orden de Venta - Colorimetria Estado', 'tag'=>'colorMt'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'ColMt','k'=>'gvtDlvStatus','editable'=>'Y', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Entrega de Venta - Colorimetria Estado', 'tag'=>'colorMt'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt','jsV'=>'ColMt','k'=>'gvtRdnStatus','editable'=>'Y', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Devolución de Venta - Colorimetria Estado', 'tag'=>'colorMt'));
/* Clasificaciones */
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$V','k'=>'gvtRdnClasif','editable'=>'Y', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Devolución Venta - Clasificacion Lineas Doc', 'tag'=>'textarea'));
__SysD::puse(array('gr'=>'gvtSell','mdlk'=>'gvt', 'jsV'=>'$V','k'=>'gvtRdnWarranty','editable'=>'Y', 'ini'=>'Y', 'type'=>'json', 'v'=>'', 'descrip'=>'Devolución Venta - Garantias Lineas Doc', 'tag'=>'textarea'));
/* agregar 
rdnClasif  gvtRdnClasif
rdnWarranty  
*/


?>
