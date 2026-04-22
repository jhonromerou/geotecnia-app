if(!Api.Gvt){ Api.Gvt={}; }
Api.Gvt.b70='/v/gvt2fc70/';
ColMt['gvtPvtCartStatus']={L:'red',O:'green',R:'orange',V:'orange',P:'purple'};

$js.push($V.docSerieType,{opvt:'Ped. Venta',gvtRdn:'Dev. Venta',ocvt:'Cot. Venta',odlv:'Desp. Venta',
gvtPor:'Ord. Compra',gvtPdn:'Rem. Compra'}
);
$js.push($i,{
gvtPvtOpenQty:{t:'Cantidad pendiente del pedido'},
gvtPvtisCommited:{t:'Es la cantidad total solicitada del producto, unificando todos los pedidos de venta.'},
gvtCardDayClose:{t:'Dia de cierre de facturación del cliente'}
});
$Doc.a['gvtPvtPrep'] ={a:'gvtPvtPrep',docT:'Liquidación de Anticipo'};
$Doc.a['ocvt'] ={a:'gvtOcvt.view',docT:'Cotización de Venta'};
$Doc.a['opvt']={a:'sellOrd.view',docT:'Orden de Venta'};
$Doc.a['odlv']={a:'sellDlv.view',docT:'Entrega de Venta'};
$Doc.a['gvtRdn']={a:'gvtRdn.view',docT:'Devolución de Venta'};
$Doc.a['octv']={a:'sellCtv.view',docT:'Cotización de Venta'};
$Doc.a['gvtPdn']={a:'gvtPdn.view',docT:'Entrada Mercancía / Compras'};
$Doc.a['gvtPor']={a:'gvtPor.view',docT:'Orden de compra'};

$DocTb.kTbAssg('gvtItmL',{
itemCode:['Codigo',{tag:'txt',kf:'itemCode',k:'itemCode',funcText:Itm.Txt.Code}],
itemName:['Nombre',{tag:'txt',kf:'itemName',k:'itemName',funcText:Itm.Txt.name}],
price:['Precio',{tag:'input',kf:'price',k:'price',type:'text',numberfomat:'mil',min:0,style:'width:4rem'}],
quantity:[{textNode:'Cant.',style:'width:6rem;'},{tag:'input',kf:'quantity',k:'quantity',type:'number',inputmode:'numeric',min:0,style:'width:4rem'}],
openQty:[{textNode:'Pend.',style:'width:6rem;'},{tag:'span',kf:'openQty',k:'openQty',noCls:1,format:'number'}],
udm:[{textNode:'Udm',_iHelp:'Unidad de Medida',style:'width:4rem;'},{tag:'span',kf:'udm',k:'udm',noCls:1}],
vatId:[{textNode:'Imp.',_iHelp:'Impuesto',style:'width:4rem'},{tag:'select',kf:'vatId',k:'vatId',opts:$Tb.otaxI}],
rteId:[{textNode:'Rte.',_iHelp:'Retención, si aplica',style:'width:4rem'},{tag:'select',kf:'rteId',k:'rteId',opts:$Tb.otaxR}],
priceLine:[{textNode:'Total',style:'width:6rem;'},{tag:'span',k:'priceLine'}],
whsId:[{textNode:'Bodega',style:'width:4rem'},{k:'whsId',tag:'select',kf:'whsId',opts:$V.whsCode}],
lineText:[{textNode:'Descripción'},{k:'lineText',kf:'lineText',tag:'input',type:'text',name:'lineText'}],
descPrc:[{textNode:'% Desc.'},{k:'discPrc',kf:'disc',tag:'number',style:'width:3rem'}],
descPrcCalc:[{textNode:'% Desc.'},{k:'discPrcCalc',kf:'disc',tag:'number',style:'width:3rem'}],
});

$DocTb.kTbAssg('gvtHf',{
crdTxt:{lTag:'input',wxn:'wrapx3',L:'Cliente',I:{disabled:'disabled'}},
crdWrite:{lTag:'input',wxn:'wrapx3',L:'Cliente',I:{name:'cardName'}},
crd:{lTag:'crd',wxn:'wrapx3',L:'Cliente',I:{fie:'slpId,fdpId,pymId,rteIva,rteIca'}},
fdpId:{lTag:'select',wxn:'wrapx8',L:'Forma pago',I:{name:'fdpId','class':$Api.Sea.clsBox,k:'fdpId',AiJs:['countyCode','cityCode','address','phone1'],opts:$Tb.gfiOfdp}},
cdcId:{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
slpId:{lTag:'select',wxn:'wrapx8',L:'Resp. Ventas',I:{'class':$Api.Sea.clsBox,k:'slpId',name:'slpId',opts:$Tb.oslp}},
docDate:{divLine:1,lTag:'date',wxn:'wrapx8',req:'Y',L:'Fecha',I:{'class':$Doc.Fx.clsdocDate,name:'docDate'}},
pymId:{lTag:'select',wxn:'wrapx8',req:'Y',L:'Condicion Pago',I:{'class':($Api.Sea.clsBox+' '+$Doc.Fx.clspymId),k:'pymId',name:'pymId',opts:$Tb.gfiOpym}},
dueDate:{lTag:'date',wxn:'wrapx8',L:'Vencimiento',req:'Y',I:{'class':$Doc.Fx.clsdueDate,name:'dueDate'}},
ref1:{lTag:'input',wxn:'wrapx8',L:'Referencia 1',I:{name:'ref1'}},
ref2:{lTag:'input',wxn:'wrapx8',L:'Referencia 2',I:{name:'ref2'}},
fromDlv:{nL:1,lt:'D',lTag:'ckLabel',I:{t:'Basada en Entrada de Mercancia',I:{name:'fromDlv',_iHelp:'Si se define, se realizan la contabilización con la cuenta de remisión y se omite la de inventario.'}}},
lineMemo:{divLine:1,lTag:'textarea',wxn:'wrapx1',L:'Detalles',I:{name:'lineMemo'}},
//gvtRcv
payGrText:{lTag:'input',wxn:'wrapx4',req:'Y',L:'Condiciones de Pago',I:{name:'payGrText'}},
accId:{lTag:'select',wxn:'wrapx4',L:'Cuenta Ingreso',I:{name:'accId',opts:$Tb.gfiPdcBank}},
accIdEgr:{lTag:'select',wxn:'wrapx4',L:'Cuenta Gasto',I:{name:'accId',opts:$Tb.gfiPdcBank}},
bal:{lTag:'$',wxn:'wrapx8',L:'Valor Recibido',I:{name:'bal'}},
antAccId:{lTag:'select',wxn:'wrapx4',L:'Cuenta Anticipo',I:{name:'antAccId',opts:$Tb.gfiPdcAntCxc}},
antCxp:{lTag:'select',wxn:'wrapx4',L:'Cuenta Anticipo',I:{name:'antAccId',opts:$Tb.gfiPdcAntCxp}},
/* cvt*/
prsCnt:{divLine:1,lTag:'input',wxn:'wrapx6',req:'Y',L:'Persona de Contacto',I:{ype:'text',name:'prsCnt'}},
email:{lTag:'input',wxn:'wrapx4',L:'Correo',I:{name:'email'}},
phone1:{lTag:'input',wxn:'wrapx8',L:'Teléfono',I:{name:'phone1'}},
address:{lTag:'input',wxn:'wrapx3',L:'Dirección',I:{name:'address'}},
condicGen:{divLine:1,lTag:'textarea',wxn:'wrapx1',L:'Condiciones Generales',I:{name:'condicGen'}},
/*ovt*/
ovtType:{lTag:'select',wxn:'wrapx8',L:'Tipo Documento',req:'Y',I:{name:'docType',opts:$V.gvtOvtType}},
cityMerch:{divLine:1,lTag:'select',wxn:'wrapx8',L:'Ciudad entrega',I:{name:'cityMerch','class':$Api.Sea.clsBox,k:'cityMerch',opts:$V.AddrCity}},
addrMerch:{lTag:'input',wxn:'wrapx3',L:'Dirección entrega',I:{name:'addrMerch','class':$Api.Sea.clsBox,k:'addrMerch'}},
cityInv:{lTag:'select',wxn:'wrapx8',L:'Ciudad Factura',I:{name:'cityInv','class':$Api.Sea.clsBox,k:'cityInv',opts:$V.AddrCity}},
addrInv:{lTag:'input',wxn:'wrapx3',L:'Dirección Factura',I:{name:'addrInv','class':$Api.Sea.clsBox,k:'addrInv'}},
whsId:{lTag:'select',wxn:'wrapx8',L:'Bodega',I:{name:'whsId',opts:$Tb.itmOwhs}},
whsIdSep:{lTag:'select',wxn:'wrapx8',L:'Bodega Separado',I:{name:'whsIdSep',opts:$Tb.itmOwhs,_iHelp:'Si se define la mercancía se transfiere a está bodega, al cerrar la entrega se da salida a la mercancia de está bodega.'}},
});

var Gvt={}; //Module gvt
$V.gvtCvtStatus=[{k:'O',v:'Abierto'},{k:'C',v:'Cerrado'},{k:'N',v:'Anulado'}];
$V.gvtPvtStatus=[{k:'D',v:'Borrador'},{k:'S',v:'Enviado'},{k:'O',v:'Abierto'},{k:'C',v:'Cerrado'},{k:'N',v:'Anulado'}];
$V.gvtRdnStatus=[{k:'D',v:'Borrador'},{k:'O',v:'Abierto'},{k:'C',v:'Cerrado'},{k:'N',v:'Anulado'}];
$V.gvtDlvStatus=$V.gvtCvtStatus;
$V.ordStatus ={D:'Borrador',O:'Abierto',C:'Cerrado',N:'Anulado',S:'Enviado'};
$V.rdnStatus ={D:'Borrador',O:'Abierto',C:'Cerrado',N:'Anulado'};
$V.gvtDlv_docStage=[{k:'ND',v:'Sin Definir'},{k:'RM',v:'Remisionado'},{k:'FV',v:'Facturado'}];
$V.gvtPvtCartStatus=[{k:'P',v:'No revisado'},{k:'L',v:'Bloqueado'},{k:'O',v:'Autorizado'},{k:'R',v:'Revisión'},{k:'V',v:'Solicitar Detalles'}];
$V.gvtPvtDlvStatus=[{k:'pendiente',v:'Pendiente'},{k:'despachado',v:'Despachado'},{k:'despacho parcial',v:'Despacho Parcial'}];

$M.liAdd('gvtInv',[
{_lineText:'Ordenes de Compra'},
{k:'gvtPor',t:'Ordenes de Compra', kau:'gvtPor',func:function(){
	var btn=$1.T.btnFa({faBtn:'fa_doc',textNode:'Nueva Orden de Compra',func:function(){ $Doc.to('gvtPor','.form'); }});
	$M.Ht.ini({btnNew:btn,f:'gvtPor',gyp:Gvt.Por.get}); }
},
{k:'gvtPor.form',t:'Orden de Compra', kau:'gvtPor.write',func:function(){ $M.Ht.ini({g:Gvt.Por.form}); }},
{k:'gvtPor.view',noTitle:true, kau:'gvtPor',func:function(){ $M.Ht.ini({g:Gvt.Por.view}); }},
{k:'gvtPor.genPdn',t:'Generar Doc. Entrada Compra', kau:'gvtPor.write',func:function(){ $M.Ht.ini({g:Gvt.Por.genPdn}); }},
{_lineText:'Entrada Mercancia - Compras'},
{k:'gvtPdn',t:'Entradas de Compra', kau:'gvtPdn',func:function(){
	var btn=$1.T.btnFa({faBtn:'fa_doc',textNode:'Nueva Entrada de Compra',func:function(){ $Doc.to('gvtPdn','.form'); }});
	$M.Ht.ini({btnNew:btn,f:'gvtPdn',gyp:Gvt.Pdn.get}); }},
{k:'gvtPdn.form',t:'Entrada de Compra', kau:'gvtPdn',func:function(){ $M.Ht.ini({g:Gvt.Pdn.form}); }},
{k:'gvtPdn.view',noTitle:true, kau:'gvtPdn',func:function(){ $M.Ht.ini({g:Gvt.Pdn.view}); }}
]);

$M.liA['sell']={t:'Ventas',kdata:'gvt_folder',
	L:[
		{t:'Pedido de Venta',
		L:[
		{k:'sellOrd.basic',t:'Ver Pedidos'},{k:'sellOrd.edit',t:'Modificar Pedidos'},
		{k:'sellOrd.formLib',t:'Pedido Libre'},
		{k:'sellOrd.openQty',t:'Ver Pedidos Pendientes'},{k:'sellOrd.status.receive',t:'Recibir Pedidos'},{k:'sellOrd.status.handClose',t:'Cerrar Pedidos'},{k:'sellOrd.status.cancel',t:'Anular Pedidos'},
		{k:'sellOrd.status.openToDraw',t:'Volver a Borrador un Pedido Recibido'},
		{k:'sellOrd.status.cartStatus',t:'Definir estado en Cartera'}
		]
		},
		{t:'Cotizaciones',
		L:[{k:'gvtOcvt.basic',t:'Ver Cotización de Venta'},{k:'gvtOcvt.edit',t:'Modificar Cotización de Venta'}]},
		{t:'Devoluciones',
		L:[{k:'gvtRdn', t:'Ver / Modificar Devoluciones'},{k:'gvtRdn.statusReceive',t:'Recibir Devoluciones'},{k:'gvtRdn.form2',t:'Clasificación de Devoluciones'}
		]},
		{t:'Entregas / Despachos',L:[{k:'sellDlv.basic',t:'Visualizar'},{k:'sellDlv.write',t:'Modificación'}]
		},
		{t:'Reportes', L:[{k:'gvtPvt.repOpenQty',t:'Reporte de Pendientes'},{k:'gvtPvt.repScheduleWeek',t:'Programación Entregas'},{k:'gvtPvt.repItemCanceled',t:'Revisión de Anulación de Pedido por Artículo'},{k:'gvtRdn.repStatus',t:'Reporte de Devoluciones'}]}
	]
};
$M.liA['buy']={t:'Compras',
L:[
	{t:'Orden de Compra', L:[{k:'gvtPor',t:'Ver / Modificar ordenes de compra'},{k:'gvtPdn',t:'Ver / Modificar Entrega por Compra'}]}
]
}


_Fi['sellDlv.get']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);
	$1.T.divL({wxn:'wrapx10',L:{textNode:'Ref. Base'},I:{tag:'input',type:'text','class':jsV,name:'A.tr',placeholder:'No Pedido'}},divL);
	$1.T.divL({wxn:'wrapx8',subText:'Fecha Despacho',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);
		$1.T.divL({wxn:'wrapx10', L:{textNode:'Estado'},I:{tag:'select',sel:{'class':jsV,name:'A.docStatus(E_igual)'},opts:$V.dStatus}},divL);
		$1.T.divL({wxn:'wrapx10', L:{textNode:'Gestión Doc.'},I:{tag:'select',sel:{'class':jsV,name:'A.docStage(E_igual)'},opts:$V.gvtDlv_docStage}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8',subText:'Fecha Creación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.dateC(E_mayIgual)(T_time)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.dateC(E_menIgual)(T_time)'}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Contacto'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'A.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Reporte',I:{tag:'select',sel:{'class':jsV,name:'__dbReportLen'},opts:$V.dbReportLen,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:{dateCDesc:'Fecha Creado DESC',dateCAsc:'Fecha Creado ASC',docDateDesc:'Fecha Doc. DESC',docTotalDesc:'Número Desc.',docTotalAsc:'Número Asc.',docDateAsc:'Fecha Doc. ASC'},noBlank:1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Dlv.get});
	wrap.appendChild(btnSend);
};
_Fi['gvtPvt.get']=function(wrap){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:{textNode:'No Documento'},I:{tag:'input',type:'text','class':jsV,name:'A.docEntry(E_igual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden de Compra'},I:{tag:'input',type:'text','class':jsV,name:'ref1'}},divL);
	$1.T.divL({wxn:'wrapx8', subText:'Fecha Creación',L:'Fecha Inicio',I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Fecha Fin',I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:'Estado',I:{tag:'select',sel:{'class':jsV,name:'A.docStatus(E_igual)'},opts:$V.gvtPvtStatus}},divL);
	$1.T.divL({wxn:'wrapx10', L:'Estado Despacho',I:{tag:'select',sel:{'class':jsV,name:'A.dlvStatus(E_igual)'},opts:$V.gvtPvtDlvStatus}},divL);
	$1.T.divL({wxn:'wrapx10', L:'Estado Cartera',I:{tag:'select',sel:{'class':jsV,name:'A.cartStatus(E_igual)'},opts:$V.gvtPvtCartStatus}},divL);
	if(Pa=='sellOrd.p'){
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);
	}
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', subText:'Fecha Entrega',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx2', L:{textNode:'Contacto'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'A.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Reporte',I:{tag:'select',sel:{'class':jsV,name:'__dbReportLen'},opts:$V.dbReportLen,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:{docEntryDesc:'Número Doc Desc.',dateCDesc:'Fecha Creado DESC',dateCAsc:'Fecha Creado ASC',docDateDesc:'Fecha Pedido DESC',docDateAsc:'Fecha Pedido ASC',docTotalDesc:'Valor Total DESC',docTotalAsc:'Valor Total ASC'},noBlank:1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Pvt.get});
	wrap.appendChild(btnSend);
};

_Fi['gvtPvt.opens']=function(wrap){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8',L:{textNode:'Número'},I:{tag:'input',type:'text','class':jsV,name:'A.docEntry(E_igual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', subText:'Fecha Creación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	if(Pa=='sellOrd.p'){
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);
	}
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', subText:'Fecha Entrega',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx2', L:{textNode:'Contacto'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'A.cardName(E_like3)'}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Pvt.opens});
	wrap.appendChild(btnSend);
};
_Fi['gvtRdn']=function(wrap){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:{textNode:'No Documento'},I:{tag:'input',type:'text','class':jsV,name:'A.docEntry(E_igual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', subText:'Fecha Creación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Estado'},I:{tag:'select',sel:{'class':jsV,name:'A.docStatus(E_igual)'},opts:$V.gvtPvtStatus}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Contacto'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'BC.cardName(E_like3)'}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Rdn.get});
	wrap.appendChild(btnSend);
};
_Fi['gvtPvt.repOpenQty']=function(wrap){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Agrupado Por'},I:{tag:'select',sel:{'class':jsV+' __viewType',name:'viewType'},opts:{doc:'Pedido',card:'Cliente'}}},wrap);
	$1.T.divL({wxn:'wrapx8', subText:'Fecha Creación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Bodega',I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);
	$1.T.divL({wxn:'wrapx4', L:'Cliente',I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre cliente',name:'A.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Cartera',I:{tag:'select','class':jsV,opts:$V.gvtPvtCartStatus,name:'A.cartStatus'}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Responsable'},I:{tag:'select',sel:{'class':jsV,name:'A.slpId(E_igual)'},opts:$Tb.oslp}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Grupo'},I:{tag:'select',sel:{'class':jsV,name:'C.grId(E_igual)'},opts:$V.crdGroup}},divL);
	$1.T.divL({wxn:'wrapx8', subText:'Dia máximo',L:{textNode:'Dia Cierre'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,max:31,'class':jsV,name:'C.invDayClose(E_menIgual)'}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', subText:'Fecha Entrega',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Talla'},I:{tag:'select',sel:{'class':jsV,name:'B.itemSzId'},opts:$V.grs1}},divL);
	var st1=[{k:'',v:'Abiertos'},{k:'C',v:'Cerrados'},{k:'A',v:'Abiertos y Cerrados'},{k:'S',v:'Enviados'}]
	$1.T.divL({wxn:'wrapx10', L:'Estado.',I:{tag:'select',sel:{'class':jsV,name:'tipoEstado'},opts:st1,noBlank:'Y'}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Pvt.Rep.openQty});
	wrap.appendChild(btnSend);
};
_Fi['gvtPvt.repItemCanceled']=function(wrap){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var last7 = $2d.add($2d.today,'-7days','Y-m-d');
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', subText:'Fecha Anulación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'D99.dateC(E_mayIgual)(T_time)',value:last7}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'D99.dateC(E_menIgual)(T_time)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);
	$1.T.divL({wxn:'wrapx2', L:{textNode:'Contacto'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'A.cardName(E_like3)'}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', subText:'Fecha Creación Doc.',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Talla'},I:{tag:'select',sel:{'class':jsV,name:'B.itemSzId'},opts:$V.grs1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Pvt.Rep.itemCanceled});
	wrap.appendChild(btnSend);
};
_Fi['gvtPvt.repStockPeP']=function(wrap){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', subText:'Fecha Creación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8',req:'Y',L:'Bodega',I:{tag:'select',sel:{'class':jsV,name:'whsId'},opts:$V.whsCode,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx4', L:'Cliente',I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre cliente',name:'A.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Cartera',I:{tag:'select','class':jsV,opts:$V.gvtPvtCartStatus,name:'A.cartStatus'}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Responsable'},I:{tag:'select',sel:{'class':jsV,name:'A.slpId(E_igual)'},opts:$Tb.oslp}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Grupo'},I:{tag:'select',sel:{'class':jsV,name:'C.grId(E_igual)'},opts:$V.crdGroup}},divL);
	$1.T.divL({wxn:'wrapx8', subText:'Dia máximo',L:{textNode:'Dia Cierre'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,max:31,'class':jsV,name:'C.invDayClose(E_menIgual)'}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', subText:'Fecha Entrega',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Talla'},I:{tag:'select',sel:{'class':jsV,name:'B.itemSzId'},opts:$V.grs1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Pvt.Rep.stockPeP});
	wrap.appendChild(btnSend);
};


_Fi['gvtRdn.repStatus']=function(wrap){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var last7 = $2d.add($2d.today,'-7days','Y-m-d');
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', subText:'Fecha Creación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)',value:last7}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);
	$1.T.divL({wxn:'wrapx2', L:{textNode:'Contacto'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'A.cardName(E_like3)'}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', subText:'Fecha Despacho',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.delivDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.delivate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Talla'},I:{tag:'select',sel:{'class':jsV,name:'B.itemSzId'},opts:$V.grs1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Rdn.Rep.status});
	wrap.appendChild(btnSend);
};
_Fi['gvtOcvt.get']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);
	$1.T.divL({wxn:'wrapx8',subText:'Fecha Definida',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Estado'},I:{tag:'select',sel:{'class':jsV,name:'A.docStatus(E_igual)'},opts:$V.dStatus}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8',subText:'Fecha Sistema',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.dateC(E_mayIgual)(T_time)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.dateC(E_menIgual)(T_time)'}},divL);
		$1.T.divL({wxn:'wrapx4', L:{textNode:'Contacto'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'A.cardName(E_like3)'}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gvt.Ocvt.get});
	wrap.appendChild(btnSend);
};
_Fi['sellDlv.labelPacking']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx2',L:'Número Docs',I:{tag:'input',type:'text','class':jsV,name:'docEntrys',placeholder:'340,346,3740'}},wrap);
	var btnSend = $1.T.btnSend({textNode:'Obtener Datos', func:Gvt.Dlv.labelPacking});
	wrap.appendChild(btnSend);
};
_Fi['gvtPor']=function(wrap){ $Doc.filtForm({func:Gvt.Por.get,docEntry:'N',tbSerie:'gvtPor'},wrap); };
_Fi['gvtPdn']=function(wrap){ $Doc.filtForm({func:Gvt.Pdn.get,docEntry:'N',tbSerie:'gvtPdn'},wrap); };

Gvt.Ocvt={
opts:function(P,e){
	var L=P.L; var Jr=P.Jr;
	var Li=[]; var n=0;
	var basic=e.match(/basic,?/);
	if(basic){
		Li[n]={ico:'fa fa_pencil',textNode:' Modificar Documento', P:L, func:function(T){ $M.to('gvtOcvt.form','docEntry:'+T.P.docEntry); } }; n++;
	}
	Li[n]={ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({serieType:'gvtCvt',docEntry:T.P.docEntry,api:Api.Gvt.b70+'cvt/statusCancel',text:'Se va anular el documento, no se puede reversar está acción.'}); } }; n++;
	Li[n]={ico:'iBg iBg_candado',textNode:'Cerrar Documento', P:L, func:function(T){ $Doc.close({docEntry:T.P.docEntry,api:Api.Gvt.b70+'cvt/statusClose',text:'Se va a cerrar el Documento, no se puede reversar está acción.'}); } }; n++;
	return Li={Li:Li,textNode:P.textNode};
},
form:function(P){ P=(P)?P:{};
	var cont=$M.Ht.cont; var jsF='jsFields'; var n=1;
	var Pa=$M.read();
	$Api.get({f:Api.Gvt.b70+'cvt/form', loadVerif:!Pa.docEntry, inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){
	var tb=$1.T.table([{textNode:'Imagen Ref.',style:'width:10rem;'},{textNode:'Código'},{textNode:'Descripción'},{textNode:'Precio',style:'width:6rem;'},{textNode:'Cant.',style:'width:6rem;'},{textNode:'Desc.',style:'cccc'},{textNode:'Total',style:'width:10rem;'},{textNode:'Detalles'},'']);
	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});
	cont.appendChild(fie);
	var tBody= $1.t('tbody',0,tb);
	var tFoot= $1.t('tfoot',0,tb);
	var trF= $1.t('tr',0,tFoot);
	$1.t('td',{colspan:4,textNode:'Total',style:'text-align:right;'},trF);
	$1.t('td',{'class':tbCal.tbQty},trF);
	$1.t('td',{'class':tbCal.tbDiscTotal},trF);
	$1.t('td',{'class':tbCal.tbTotal+' '+tbCal.tbVPost,'data-vPost':'Y'},trF);
	$1.t('td',0,trF);
	$Doc.L.itmWinSz(tBody,{priceDefiner:'N',cont:fie,fields:'I.grsId,I.src1&wh[I.sellItem]=Y&wh[I.webStatus]=active', noWin:'Y',func:function(T,L){
		L.quantity=1;
		L.disc=0;
		trA(tBody,L);
	}});
	var Fs=[
	{wxn:'wrapx4',req:'Y',L:'Socio de Negocios',I:{tag:'input',type:'text','class':jsF,name:'cardName',value:Jr.cardName}},
	{wxn:'wrapx4',req:'Y',L:{textNode:'Empleado Ventas'},I:{tag:'select',sel:{'class':jsF,name:'slpId'},opts:$Tb.oslp,selected:Jr.slpId}},
	{divLine:1,wxn:'wrapx4',req:'Y',L:'Condiciones de Pago',I:{tag:'input',type:'text',name:'payGrText','class':jsF,value:((Jr.payGrText)?Jr.payGrText:$V.cvtDefPayGrText)}},
	{wxn:'wrapx8',fType:'date',name:'docDate',value:Jr.docDate,req:'Y'},
	{wxn:'wrapx8',fType:'date',textNode:'Valido Hasta',name:'dueDate',value:Jr.dueDate,req:'Y'},
	{divLine:1,wxn:'wrapx2',L:'Detalles',I:{tag:'textarea',name:'lineMemo',textNode:Jr.lineMemo,'class':jsF}},
	{wxn:'wrapx2',L:'Condiciones Generales',I:{tag:'textarea',name:'condicGen',textNode:((Jr.condicGen!=null)?Jr.condicGen:$V.cvtCondicGen),'class':jsF}}
	];
	if($jSoc.gvtCvt_handCard=='N'){
		Fs[0]={wxn:'wrapx4',fType:'crd',req:'Y',L:'Socio Negocios',inputs:'fields=A.slpId&wh[A.cardType(E_in)]=C,L',cardId:Jr.cardId,cardName:Jr.cardName,replaceData:'Y'};
	Fs[1]={wxn:'wrapx4',req:'Y',L:{textNode:'Empleado Ventas'},I:{tag:'select',sel:{'class':jsF+' '+$Sea.clsName,name:'slpId',k:'slpId',disabled:'disabled'},opts:$Tb.oslp,selected:Jr.slpId}};
	}
	if(1){
		Fs.push({divLine:1,wxn:'wrapx6',req:'Y',L:'Persona de Contacto',I:{tag:'input',type:'text','class':jsF,name:'prsCnt',value:Jr.prsCnt}});
		Fs.push({wxn:'wrapx4',req:'Y',L:'Correo',I:{tag:'input',type:'text','class':jsF,name:'email',value:Jr.email}});
		Fs.push({wxn:'wrapx8',req:'Y',L:'Teléfono',I:{tag:'input',type:'text','class':jsF,name:'phone',value:Jr.phone}});
		Fs.push({wxn:'wrapx3',L:'Dirección',I:{tag:'input',type:'text','class':jsF,name:'address',value:Jr.address}});
	}
	$Doc.formSerie({cont:cont, middleCont:fie, serieType:'ocvt',docEntry:Pa.docEntry,jsF:jsF,Jr:{}, PUT:Api.Gvt.b70+'cvt/form', func:function(Jr2){
			$M.to('gvtOcvt.view','docEntry:'+Jr2.docEntry);
		},
	Li:Fs});
	var n=1;
	function trA(tBody,D){
		var ln='L['+n+']'; n++;
		var tr=$1.t('tr',{'class':tbCal.trLine},tBody);
		tr.ln=ln;
		var td=$1.t('td',0,tr);
		$1.t('img',{src:Itm.Txt.imgSrc(D),title:'Imagen del Producto',style:'max-width:10rem;'},td);
		$1.t('td',{textNode:D.itemCode,style:'vertical-align:middle;'},tr);
		$1.t('td',{textNode:D.itemName,style:'vertical-align:middle;'},tr);
		var price=(D.price)?D.price:D.sellPrice;
		if(D.curr && D.curr!=$0s.currDefault){ price=D.priceME; }
		var priceList=(D.priceList)?D.priceList:D.sellPrice;
		var td=$1.t('td',{style:'vertical-align:middle;'},tr);
		if($jSoc.gvtCvt_requireCurr=='Y'){
			$1.T.curr({name:ln+'[curr]',curr:D.curr},td);
			$1.t('br',0,td);
		}
		var pr=$1.t('input',{type:'text',numberformat:'mil',min:0,'class':jsF+' '+tbCal.trPrice,name:ln+'[price]',value:price,O:{vPost:ln+'[itemId]='+D.itemId+'&'+ln+'[priceList]='+priceList},style:'width:6rem;'},td);
		pr.priceList=priceList;
		pr.keyChange(function(T){ tbCal.docTotal(tb,{manual:'Y'}); });
		var td=$1.t('td',{style:'vertical-align:middle;'},tr);
		var qty=$1.t('input',{type:'number',inputmode:'numeric',min:0,'class':jsF+' '+tbCal.trQty,name:ln+'[quantity]',style:'width:6rem;',value:D.quantity},td);
		qty.keyChange(function(T){ tbCal.docTotal(tb,{manual:'Y'}); });
		var td=$1.t('td',{style:'vertical-align:middle;'},tr);
		var discA=$1.t('input',{type:'number',inputmode:'numeric',min:0,max:200,'class':jsF+' '+tbCal.trDisc,name:ln+'[disc]',style:'width:6rem;',value:D.disc},td);
		discA.keyChange(function(T){ tbCal.docTotal(tb,{manual:'Y'}); })
		var td=$1.t('td',{style:'vertical-align:middle;','class':tbCal.trTotal,'data-vPost':'Y'},tr);
		var td=$1.t('td',0,tr);
		$1.t('textarea',{'class':jsF,name:ln+'[lineMemo]',textNode:D.lineMemo,style:'width:14rem;'},td);
		var td=$1.t('td',0,tr);
		var ckL=$1.T.ckLabel({t:'Quitar',I:{'class':'jsFields',name:ln+'[delete]'}},td);
	}
	if(Jr && Jr.L && !Jr.L.errNo){ for(var i in Jr.L){ trA(tBody,Jr.L[i]); } }

	}});
},
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'cvt', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $ps_DB.response(cont,Jr); }
		else{
			var tb=$1.T.table([{'class':$Xls.tdNo},'N°-','Estado','Fecha Doc.','Cliente','Validez','Vendedor','Realizado',{'class':$Xls.tdNo}]);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				if(i==2){ tr.classList.add($Xls.trNo); }
				var td=$1.t('td',0,tr);
				var menu=$1.Menu.winLiRel(Gvt.Ocvt.opts({L:L},'basic')); td.appendChild(menu);
				var td=$1.t('td',0,tr);
				$1.t('a',{href:$Doc.href('ocvt',L,'r'),'class':'fa fa_eye',textNode:' '+L.docEntry},td);
				$1.t('td',ColMt._g(L.docStatus,'gvtCvtStatus',{textNode:_g(L.docStatus,$V.dStatus)}),tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d'),xls:{t:L.docDate,style:{format:'dd-mm-yyyy'}}},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:$2d.f(L.dueDate,'mmm d'),xls:{t:L.dueDate}},tr);
				$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
				var td=$1.t('td',0,tr);
				$1.T.btnFa({fa:'fa_comment',L:L,func:function(T){ $5c.form({tt:'ocvt',tr:T.L.docEntry, getList:'Y',winTitle:'Cotizacion de Venta: '+T.L.docEntry}); } },td);
				Attach.btnWin({tt:'ocvt',tr:L.docEntry, title:'Cotización de Venta: '+L.docEntry},td);
			}
			tb=$1.T.tbExport(tb,{fileName:'Listado de Pedidos'});
			cont.appendChild(tb);
		}
	}});
},
view:function(){
	var Pa=$M.read(); var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'cvt/view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		var Trs=[];
		Jr.lineMemo =Jr.lineMemo+'\n\nLos Valores Ofertados son antes de IVA\n';
		if(Jr.L.errNo){ Trs[0]={colspan:6,textNode:Jr.L.text}; }
		else if(Jr._docTemplate && $Tpt.T[Jr._docTemplate]){
			var pWraps=$Tpt.T[Jr._docTemplate](Jr,cont);
			pCont=pWraps.bott;
			var bott=$1.t('div',{style:'border:1px solid #EEE;'},pCont);
			var leef=$1.t('div',{style:'float:left; width:48%;'},bott);
			var div=$1.t('div',{style:'padding:2px 0'},leef);
			$1.t('b',{textNode:'Condiciones de Pago:'},div);
			$1.t('span',{textNode:Jr.payGrText},div);
			var div=$1.t('div',{style:'padding:2px 0'},leef);
			$1.t('b',{textNode:'Valida hasta: '},div);
			$1.t('span',{textNode:$2d.f(Jr.dueDate,'mmm d')},div);
			var div=$1.t('div',{style:'padding:2px 0'},leef);
			$1.t('b',{textNode:'Resp. de Ventas'},div);
			$1.t('span',{textNode:$crd.Slp.info(Jr,[' - ','::phone1'])},div);
			var riig=$1.t('div',{style:'float:left; paddingLeft:4px; borderLeft:1px solid #EEE;'},bott);
			var div=$1.t('div',{style:'padding:2px 0'},riig);
			$1.t('b',{textNode:'Condiciones Generales'},div);
			$1.t('div',{textNode:Jr.condicGen,'class':'pre'},div);
			pCont.appendChild($1.t('clear'));
			$1.t('div',{textNode:Jr.lineMemo,'class':'pre'},pCont);
		}
		else if($jSoc.gvtCvt_tptUse){
			$Tpt.use($jSoc.gvtCvt_tptUse,cont,{Jr:Jr});
		}
		else{
			var va='vertical-align:middle';
			var ni=0;
			for(var i in Jr.L){ var L=Jr.L[i]; Trs[ni]=[];
				Trs[ni].push({style:'width:8rem;',node:$1.t('img',{src:Itm.Txt.imgSrc(L),ttitle:L.src1,style:'max-width:8rem;'})});
				Trs[ni].push({textNode:Itm.Txt.code(L),style:va});
				Trs[ni].push({textNode:Itm.Txt.name(L),style:va});
				Trs[ni].push({textNode:$Str.money(L.price),style:va});
				Trs[ni].push({textNode:L.quantity*1,style:va,'class':tbCal.trQty});
				//Trs[ni].push({textNode:L.disc*1+'%',style:va});
				Trs[ni].push({textNode:$Str.money(L.priceLine),style:va});
				Trs[ni].push({style:va,'class':'pre',node:$1.t('div',{textNode:L.lineMemo})});
				ni++;
			}
			$Tpt.use('ocvtBase',cont,{Jr:Jr,Trs:Trs});
			$Str.useCurr=false;
			tbCal.docTotal(cont,{trsCont:true});
		}
	}});
},
}
Gvt.Rep={};
Gvt.Pvt={
OLi:[],
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={k:'modify',ico:'fa fa_pencil',textNode:' Modificar Orden', P:L, func:function(T){ $M.to('sellOrd.form','docEntry:'+T.P.docEntry); } }; n++;
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.b70+'pvt/tb99',serieType:'opvt',docEntry:T.P.docEntry}); } }; n++;
	Li[n]={k:'info',ico:'fa fa_info',textNode:' Información de Documento', P:L, func:function(T){ Gvt.Pvt.info(T.P); } }; n++;
	Li[n]={k:'openQty',ico:'fa fa_doc',textNode:'Documento Pendientes', P:L, func:function(T){ $M.to('sellOrd.openQty','docEntry:'+T.P.docEntry); } }; n++;
	Li[n]={k:'statusCartera',ico:'fa fa-money',textNode:'Estado en Cartera',P:L,func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Gvt.b70+'pvt/cartStatus',text:'Se va a definir el siguiente estado en cartera.',Opts:$V.gvtPvtCartStatus,selected:T.P.cartStatus}); } }; n++;
	if(L.docStatus=='D'){
		Li[n]={k:'statusS',ico:'fa fa_listWin',textNode:' Enviar Pedido', func:function(){ Ord.mark2Send({docEntry:L.docEntry,odocType:'opvt'}); }}; n++;;
	}
	if(L.docStatus=='S'){
		Li[n]={k:'statusO',ico:'fa fa_listWin',textNode:' Recibir Pedido', P:L, func:function(T){
			var divL=$1.T.divL({divLine:1,wxn:'wrapx1',supText:'Defina Bodega',L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':'jsFields',name:'whsId',O:{vPost:'docEntry='+T.P.docEntry}},opts:$V.whsCode}});
			$1.Win.confirm({text:'El documento será marcado como recibido, las cantidades serán marcadas como solicitadas y no podrá modificarse.', noClose:1, Inode:divL, apiSend:{PUT:Api.Gvt.b70+'pvt/statusOpen'}, func:function(Jr){
				if(!Jr.errNo){ $1.delet('.__btnSellOrdReceive'); }
			}});
		}}; n++;;
	}
	if(L.docStatus=='D' || L.docStatus=='S' || L.docStatus=='O'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({serieType:'opvt',docEntry:T.P.docEntry,api:Api.Gvt.b70+'pvt/statusCancel',text:'Se va anular el documento, no se puede reversar está acción.'}); } }; n++;
	}
	if(L.docStatus=='O'){
		Li[n]={k:'statusC',ico:'iBg iBg_candado',textNode:'Cerrar Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.b70+'pvt/statusClose',text:'Se va a cerrar el Documento, no se puede reversar está acción.'}); } }; n++;
		Li[n]={k:'statusD',ico:'fa fa_pencil',textNode:' Volver a Borrador', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Gvt.b70+'pvt/statusDraw',text:'El documento será marcado como borrador para modificarlo. Recuerde que debe ser enviado y recibido nuevamente.'}); } }; n++;
	}
	Li[n]={k:'attach',ico:'fa fa_attach',textNode:'Archivos',P:L,func:function(T){ Attach.openWin({tt:'opvt',tr:T.P.docEntry, title:'Orden de Venta: '+T.P.docEntry},); } }; n++;
	Li[n]={k:'comments',ico:'fa fa_comment',textNode:'Comentarios',P:L,func:function(T){ $5c.form({tt:'opvt',tr:T.P.docEntry, getList:'Y',winTitle:'Orden de Venta: '+T.P.docEntry}); } }; n++;
	return $Opts.add('gvtPvt',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Pvt.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'pvt', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table([{'class':$Xls.tdNo},'N°-','Estado','Fecha Doc.','Cliente','Tipo','Bodega','O.C','Fecha Entrega','Vendedor',{textNode:'M',title:'Moneda'},'Valor','Estado Despacho','Estado Cartera','Realizado',{'class':$Xls.tdNo}]);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var docTotal=L.docTotal;
				var bodega=(!L.whsId || L.whsId==0)?'Sin Definir':_g(L.whsId,$V.whsCode);
				var td=$1.t('td',0,tr);
				Gvt.Pvt.opts({L:L},td);
				var td=$1.t('td',0,tr);
				$1.t('a',{href:$M.to('sellOrd.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:' '+L.docEntry},td);
				$1.t('td',{textNode:_g(L.docStatus,$V.gvtPvtStatus),style:ColMt._g(L.docStatus,'gvtPvtStatus')},tr);
				$1.t('td',{textNode:L.docDate,xls:{t:L.docDate,style:{format:'dd-mm-yyyy'}}},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:$V.ordTypePE[L.docType]},tr);
				$1.t('td',{textNode:bodega},tr);
				$1.t('td',{textNode:L.ref1},tr);
				$1.t('td',{textNode:L.dueDate,xls:{t:L.dueDate}},tr);
				$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr);
				$1.t('td',{textNode:L.curr},tr);
				$1.t('td',{textNode:$Str.money({curr:L.curr,value:docTotal}),xls:{t:docTotal}},tr);
				$1.t('td',{textNode:L.dlvStatus},tr);
				$1.t('td',{textNode:_g(L.cartStatus,$V.gvtPvtCartStatus),style:ColMt.get('gvtPvtCartStatus',L.cartStatus)},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
				var td=$1.t('td',0,tr);
				$1.T.btnFa({fa:'fa_comment',L:L,func:function(T){ $5c.form({tt:'opvt',tr:T.L.docEntry, getList:'Y',winTitle:'Pedido de Venta: '+T.L.docEntry}); } },td);
				Attach.btnWin({tt:'opvt',tr:L.docEntry, title:'Orden de Venta: '+L.docEntry},td);
			}
			tb=$1.T.tbExport(tb,{fileName:'Listado de Pedidos'});
			cont.appendChild(tb);
		}
	}});
},
view:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont; $1.clear(contPa);
	$Api.get({f:Api.Gvt.b70+'pvt/view', inputs:'docEntry='+Pa.docEntry,loade:contPa, func:function(Jr){
		var cont=$1.t('div',0,contPa);
		$Doc.btnsTop('print,modify,logs,info,statusCartera,statusS,openQty,statusO,statusN,statusD,statusC,attach,comments,',{icons:'Y',Li:Gvt.Pvt.OLg(Jr),contPrint:cont},contPa);
		sHt.sellOrdHead(Jr,cont);
		var tb=$1.T.table([{textNode:'#'},{textNode:'Código'},{textNode:'Descripcón'},{textNode:'Cant.'},{textNode:'UdM'},{textNode:'Precio'},{textNode:'Desc.'},{textNode:'Total'}]);
		$1.t('p',0,cont);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Pedido'}}); cont.appendChild(fie);
		tb.classList.add('table_x100');
		var tBody=$1.t('tbody',0,tb);
		var tFo=$1.t('tfoot',0,tb); var cs=7;
		var tr=$1.t('tr',0,tFo);
		$Str.useCurr=Jr.curr;
		var totalLineVal=Jr.docTotalLine;
		var totalVal=Jr.docTotal;
		var discSum=Jr.discSum;
		$1.t('td',{textNode:'Total Pares',colspan:3,style:'text-align:right;'},tr);
		$1.t('td',{'class':tbSum.tbColNumTotal+'1'},tr);
		$1.t('td',{textNode:'Total Lineas',colspan:cs-4,style:'text-align:right;'},tr);
		$1.t('td',{textNode:$Str.money(totalLineVal)},tr);
		var tr=$1.t('tr',0,tFo);
		$1.t('td',{textNode:'Desc. Total ('+(Jr.discTotal*1)+'%)',colspan:cs,style:'text-align:right;'},tr);
		$1.t('td',{textNode:$Str.money(discSum)},tr);
		var tr=$1.t('tr',0,tFo);
		$1.t('td',{textNode:'Total',colspan:cs,style:'text-align:right;'},tr);
		$1.t('td',{textNode:$Str.money(totalVal)},tr);
		var currD=(Jr.curr!=$0s.currDefault);
		if(Jr.L.errNo){
			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));
		}else{
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.lineNum},tr);
			var val=(currD)?L.priceME:L.price;
			var priceLine=(currD)?L.priceME*L.quantity:L.priceLine;
			$1.t('td',{textNode:Itm.Txt.code(L)},tr);
			$1.t('td',{textNode:Itm.Txt.name(L)},tr);
			$1.t('td',{textNode:L.quantity*1,'class':tbSum.tbColNums,tbColNum:1},tr);
			$1.t('td',{textNode:L.sellUdm},tr);
			$1.t('td',{textNode:$Str.money(val)},tr);
			$1.t('td',{textNode:(L.disc*1)+'%'},tr);
			$1.t('td',{textNode:$Str.money(priceLine)},tr);
		}
		}
		tbSum.get(tb);
		$Str.useCurr=false;
		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);
	}});
},
form:function(){
	var n=1;
	var cont=$M.Ht.cont; var jsF='jsFields'; var Pa=$M.read();
	$Api.get({f:Api.Gvt.b70+'pvt/form', loadVerif:!Pa.docEntry, loade:cont, inputs:'docEntry='+Pa.docEntry, func:function(Jr){
		var n=1;
		var vS=(Jr.cardId)?{cardId:Jr.cardId}:null;
		if(Jr.docType=='LB'){
			$M.to('sellOrd.formLib','docEntry:'+Pa.docEntry);
		}
		var inputs='fields=A.slpId,A.discPf&_otD[addr][addrType(E_in)]=merch,inv';
		// /*
		var sea=$Sea.input(null,{api:'crd.c',classKey:'___cardId', 'class':jsF,req:'Y', inputs:inputs, vS:vS, vPost:'cardId='+(Jr.cardId)+'&cardName='+encodeURIComponent(Jr.cardName)+'&discDef='+Jr.discDef, defLineText:Jr.cardName, func:function(L,inp){
			inp.O={vPost:'cardId='+L.cardId+'&cardName='+encodeURIComponent(L.cardName)+'&discDef='+L.discPf};
			$Sea.replaceData(L,cont);
			$Tol.tbSum(cont);
		}});
		var fFie={price:{disabled:'N'},disc:{disabled:'Y'}};
		{//fie table
			var tb=$1.T.table([{textNode:'#',style:'width:2rem;'},{textNode:'Código',style:'width:5rem;'},{textNode:'Descripción',style:'width:22rem;'},'Cant.','UdM','Precio','Desc.',{textNode:'Total',style:'width:8rem;'},{textNode:''}]);
		tb.classList.add('table_x100');
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Documento'}});
		cont.appendChild(fie);
		var tBody= $1.t('tbody',0,tb);
		var tFo= $1.t('tfoot',0,tb);
		var trF=$1.t('tr',0,tFo); var cs=8;
		var td=$1.t('td',{colspan:3,textNode:'Total Pares: ',style:'text-align:right;'},trF);
		var td=$1.t('td',{'class':'__tbColNumTotal2'},trF);
		var td=$1.t('td',{colspan:cs-4,textNode:'Moneda: ',style:'text-align:right;'},trF);
		var td=$1.t('td',{colspan:2},trF);
		var sel=$1.T.sel({sel:{'class':jsF+' __tbCurr',name:'curr'},opts:$0s.Curr,noBlank:1,selected:Jr.curr}); td.appendChild(sel);
		sel.onchange=function(){ $Tol.tbSum(cont); }
		var trF=$1.t('tr',0,tFo);
		$1.t('td',{colspan:cs,textNode:'Total Lineas',style:'text-align:right;'},trF);
		var td=$1.t('td',{colspan:2,'class':'__tbTotal',vformat:'money',style:'width:4rem;'},trF);
		var trF=$1.t('tr',0,tFo);
		/*ojo: quito descuento  k:discPf*/
		if($jSoc.gvtPvt_discPf=='Y'){
				var disc=$1.t('td',{colspan:cs,textNode:'Descuento: ',style:'text-align:right;'},trF);
			var inpd=$1.t('input',{type:'number',inputmode:'numeric',min:0,style:'width:4rem;','class':jsF+' __tbDisc '+$Sea.clsName,k:'discPf',name:'discPf',value:(Jr.discPf*1)},disc);
		}
		else{
				var disc=$1.t('td',{colspan:cs,textNode:'Descuento: ',style:'text-align:right; visibility:hidden;'},trF);
			var inpd=$1.t('input',{type:'number',inputmode:'numeric',min:0,style:'width:4rem; visibility:hidden;','class':jsF+' __tbDisc '+$Sea.clsName,k:'discPf__',name:'discPf',value:(Jr.discPf*1)},disc);
		}
		inpd.onkeyup=function(){ $Tol.tbSum(tb); }
		inpd.onchange=function(){ $Tol.tbSum(tb); }
		var td=$1.t('td',{colspan:2,'class':'__tbDiscText',vformat:'money',style:'width:4rem;'},trF);
		var trF=$1.t('tr',0,tFo);
		var disc=$1.t('td',{colspan:cs,textNode:'Total',style:'text-align:right;'},trF);
		var td=$1.t('td',{colspan:2,'class':'__tbTotal2',vformat:'money',style:'width:4rem;'},trF);
		Drw.itemReader({cont:fie,tBody:tBody,fields:'I.sellPrice,I.grsId,I.sellUdm&wh[I.sellItem]=Y&wh[I.webStatus]=active'},{funcAddInputs:function(){
			var gc=$1.q('.___cardId'); var v='';
			if(gc && gc.vS){ v=gc.vS.cardId; }
			return 'wh[lastSellPriceCardId]='+v;
		}, func:function(tBody,P){
		Drw.docLineItemSz(tBody,{trLine:'tr',jsF:jsF,JrS:P.JrS, n:n,Fie:fFie, func:function(P,tBody){
				P.formType='venta';
				_Frm.itm(P,tBody);
			}}); n++;
	}});
		}
		dateDisab=($jSoc.gvtPvt_docDateDisabled=='Y')?'disabled':null;
		Jr.docDate=(Jr.docDate)?Jr.docDate:$2d.today;
		if(!Jr.dueDate){
			if($jSoc.gvtPvt_dueDate=='M'){ Jr.dueDate='0000-00-00'; }
			else if($jSoc.gvtPvt_dueDate=='T'){ Jr.dueDate=$2d.today; }
			else if($jSoc.gvtPvt_minDaysToDeliv){
				if($jSoc.gvtPvt_dueDate=='D'){
					 Jr.dueDate=$2d.add($2d.today,'+'+$jSoc.gvtPvt_minDaysToDeliv+'days','Y-m-d')
				}
				else{ Jr.dueDate=$2d.add($2d.today,'+'+$jSoc.gvtPvt_minDaysToDeliv+'days','Y-m-d'); }
			}
		}
		var Dires=Addr.basic(Jr,null,{nodes:'Y',jsF:jsF,kAddress:'addrMerch',clsBox:$Sea.clsName});
		var Lif=[
		{wxn:'wrapx8',L:'Tipo Documento',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'docType'},opts:$V.ordTypePE,selected:Jr.docType}},
		{fType:'user'},
		{wxn:'wrapx8',L:'Estado',I:{tag:'select',sel:{disabled:'disabled',title:Jr.docStatus},opts:$V.gvtPvtStatus,selected:Jr.docStatus,noBlank:1}},
		{fType:'date',name:'docDate',req:'Y',value:Jr.docDate,I:{'disabled':dateDisab}},
		{fType:'date',name:'dueDate',req:'Y',value:Jr.dueDate,textNode:'Fecha Entrega'},
		{divLine:1,wxn:'wrapx8',L:{textNode:'Orden de Compra',style:'color:#F00;'},req:'Y',I:{tag:'input',type:'text','class':jsF,name:'ref1',value:((Jr.ref1)?Jr.ref1:'')}},
		{wxn:'wrapx3',req:'Y',L:'Cliente',Inode:sea},
		{wxn:'wrapx4',req:'Y',L:{textNode:'Empleado Ventas'},I:{tag:'select',sel:{'class':jsF+' '+$Sea.clsName,name:'slpId',k:'slpId',disabled:'disabled'},opts:$Tb.oslp,selected:Jr.slpId}},
		{divLine:1,wxn:'wrapx8',req:'Y',L:'Departamento',Inode:Dires[1]},
		{wxn:'wrapx8',req:'Y',L:'Ciudad',Inode:Dires[2]},
		{wxn:'wrapx2',req:'Y',L:'Dirección Entrega',Inode:Dires[3]},
		//{divLine:1,wxn:'wrapx2',req:'Y',L:'Dirección para mercancías',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,name:'addrMerch',k:'_addr_merch',value:Jr.addrMerch}},
		//{wxn:'wrapx2',req:'Y',L:'Dirección para facturación',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,name:'addrInv',k:'_addr_inv',value:Jr.addrInv}},
		{divLine:1,wxn:'wrapx1',L:{textNode:'Detalles/Observaciones'},I:{tag:'textarea','class':jsF,name:'lineMemo',textNode:Jr.lineMemo}}
		];
		if($jSoc.gvtPvt_pymntGr=='Y'){
			Lif.push({divLine:1,wxn:'wrapx8',req:'Y',L:'Condiciones Pago',I:{tag:'select',sel:{'class':jsF,name:'pymntGr'},opts:$Tb.gfiOpym,selected:Jr.pymntGr}});
		}
		$Doc.formSerie({cont:cont,serieType:'opvt', docEntry:Pa.docEntry, jsF:jsF,
		PUT:Api.Gvt.b70+'pvt/form', func:function(Jr2){
			$M.to('sellOrd.view','docEntry:'+Jr2.docEntry);
		},
		middleCont:fie,
		Li:Lif
		});
		//for(var i in Addr.City){ $1.t('input',{'class':jsF,type:'hidden',name:'City['+Addr.City[i].k+']',value:Addr.City[i].v},cont); }
		if(Jr.L && Jr.L.errNo){ $ps_DB.response(tBody,Jr.L); }
		else{
			Jr.jsF=jsF; Jr.formType='venta'; Jr.Fie=fFie;
			_Frm.itm(Jr,tBody);
		}
	}
	});
},
info:function(P){
	var wrap=$1.t('div');
	$Api.get({f:Api.Gvt.b70+'pvt/info', inputs:'docEntry='+P.docEntry,loaderFull:true, func:function(Jr){
		$1.Tb.trFieVal({L:$Doc.TBs.rep(Jr,'gvtPvt.info')});
	}});
},
openQty:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont; $1.clear(contPa);
	var divTop=$1.t('div',{style:'marginBottom:0.5rem;','class':'no-print'},contPa);
	var cont=$1.t('div',0,contPa);
	var btnPrint=$1.T.btnFa({fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(cont); }});
	divTop.appendChild(btnPrint);
	$Api.get({f:Api.Gvt.b70+'pvt/openQty', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		sHt.sellOrdHead(Jr,cont);
		$1.t('div',{textNode:'Solo se visualizan las lineas que tengan cantidades pendientes.',style:'font-weight:bold; padding:0.25rem;'},cont);
		var tb=$1.T.table([{textNode:'#',style:'width:3rem;'},{textNode:'Código',style:'width:3rem;'},{textNode:'Descripcón'},{textNode:'UdM',style:'width:3rem;'},{textNode:'Precio',style:'width:5rem;'},{textNode:'Pendiente',style:'width:5rem;'}]);
		$1.t('p',0,cont);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Pedido'}}); cont.appendChild(fie);
		tb.classList.add('table_x100');
		var tBody=$1.t('tbody',0,tb);
		var tFo=$1.t('tfoot',0,tb); var cs=7;
		var tr=$1.t('tr',0,tFo);
		$Str.useCurr=Jr.curr;
		$1.t('td',{textNode:'Total Pares',colspan:4,style:'text-align:right;'},tr);
		$1.t('td',{'class':'__tbColNumTotal1'},tr);
		$1.t('td',{'class':'__tbColNumTotal2'},tr);
		$1.t('td',{colspan:4,style:'text-align:right;'},tr);
		var currD=(Jr.curr!=$0s.currDefault);
		if(Jr.L.errNo){
			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));
		}else{
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			if(L.openQty<=0){ continue; }
			$1.t('td',{textNode:L.lineNum},tr);
			var val=(currD)?L.priceME:L.price;
			$1.t('td',{textNode:Itm.Txt.code(L)},tr);
			$1.t('td',{textNode:Itm.Txt.name(L)},tr);
			$1.t('td',{textNode:L.sellUdm},tr);
			$1.t('td',{textNode:$Str.money(val*1)},tr);
			$1.t('td',{textNode:L.openQty*1,'class':'__tdNum __tbColNums',tbColNum:2},tr);

		}
		}
		$Str.useCurr=false;
		tbSum.get(tb);
		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);
	}});
},
formLib:function(){
	var cont=$M.Ht.cont; var jsF='jsFields'; var Pa=$M.read();
	$Api.get({f:Api.Gvt.b70+'pvt/form', loadVerif:!Pa.docEntry, loade:cont, inputs:'docEntry='+Pa.docEntry, func:function(Jr){
		var vS=(Jr.cardId)?{cardId:Jr.cardId}:null;
		var inputs='fields=A.slpId,A.discPf&_otD[addr][addrType(E_in)]=merch,inv';
		// /*
		var Dires=Addr.basic(Jr,null,{nodes:'Y',jsF:jsF,kAddress:'addrMerch',clsBox:$Sea.clsName});
		var sea=$1.t('input',{type:'text','class':jsF,name:'cardName',value:Jr.cardName,placeholder:'Digita el nombre del cliente'});
		var fFie={price:{disabled:'N'},disc:{disabled:'Y'}};
		{//fie table
			var tb=$1.T.table([{textNode:'#',style:'width:2rem;'},{textNode:'Código',style:'width:5rem;'},{textNode:'Descripción',style:'width:22rem;'},'Cant.','UdM','Precio','Desc.',{textNode:'Total',style:'width:8rem;'},{textNode:''}]);
		tb.classList.add('table_x100');
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Documento'}});
		cont.appendChild(fie);
		var tBody= $1.t('tbody',0,tb);
		var tFo= $1.t('tfoot',0,tb);
		var n=1;
		var trF=$1.t('tr',0,tFo); var cs=8;
		var td=$1.t('td',{colspan:3,textNode:'Total Pares: ',style:'text-align:right;'},trF);
		var td=$1.t('td',{'class':'__tbColNumTotal2'},trF);
		var td=$1.t('td',{colspan:cs-4,textNode:'Moneda: ',style:'text-align:right;'},trF);
		var td=$1.t('td',{colspan:2},trF);
		var sel=$1.T.sel({sel:{'class':jsF+' __tbCurr',name:'curr'},opts:$0s.Curr,noBlank:1,selected:Jr.curr}); td.appendChild(sel);
		sel.onchange=function(){ $Tol.tbSum(cont); }
		var trF=$1.t('tr',0,tFo);
		$1.t('td',{colspan:cs,textNode:'Total Lineas',style:'text-align:right;'},trF);
		var td=$1.t('td',{colspan:2,'class':'__tbTotal',vformat:'money',style:'width:4rem;'},trF);
		var trF=$1.t('tr',0,tFo);
		/*ojo: quito descuento  k:discPf*/
		if($jSoc.gvtPvt_discPf=='Y'){
				var disc=$1.t('td',{colspan:cs,textNode:'Descuento: ',style:'text-align:right;'},trF);
			var inpd=$1.t('input',{type:'number',inputmode:'numeric',min:0,style:'width:4rem;','class':jsF+' __tbDisc '+$Sea.clsName,k:'discPf',name:'discPf',value:(Jr.discPf*1)},disc);
		}
		else{
				var disc=$1.t('td',{colspan:cs,textNode:'Descuento: ',style:'text-align:right; visibility:hidden;'},trF);
			var inpd=$1.t('input',{type:'number',inputmode:'numeric',min:0,style:'width:4rem; visibility:hidden;','class':jsF+' __tbDisc '+$Sea.clsName,k:'discPf__',name:'discPf',value:(Jr.discPf*1)},disc);
		}
		inpd.onkeyup=function(){ $Tol.tbSum(tb); }
		inpd.onchange=function(){ $Tol.tbSum(tb); }
		var td=$1.t('td',{colspan:2,'class':'__tbDiscText',vformat:'money',style:'width:4rem;'},trF);
		var trF=$1.t('tr',0,tFo);
		var disc=$1.t('td',{colspan:cs,textNode:'Total',style:'text-align:right;'},trF);
		var td=$1.t('td',{colspan:2,'class':'__tbTotal2',vformat:'money',style:'width:4rem;'},trF);
		Drw.itemReader({cont:fie,tBody:tBody,fields:'I.sellPrice,I.grsId,I.sellUdm&wh[I.sellItem]=Y&wh[I.webStatus]=active'},{func:function(tBody,P){
		Drw.docLineItemSz(tBody,{trLine:'tr',jsF:jsF,JrS:P.JrS, n:n,Fie:fFie, func:function(P,tBody){
				P.formType='venta';
				_Frm.itm(P,tBody);
			}}); n++;
	}});
		}
		dateDisab=($jSoc.gvtPvt_docDateDisabled=='Y')?'disabled':null;
		Jr.docDate=(Jr.docDate)?Jr.docDate:$2d.today;
		if($jSoc.gvtPvt_minDaysToDeliv && !Jr.dueDate){
			Jr.dueDate=$2d.add($2d.today,'+'+$jSoc.gvtPvt_minDaysToDeliv+'days','Y-m-d');
		}
		Jr.dueDate=(Jr.dueDate)?Jr.dueDate:$2d.today;
		var Lif=[
		{wxn:'wrapx8',L:'Tipo Documento',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'docType',disabled:'disabled'},opts:$V.ordTypePE,selected:'LB'}},
		{fType:'user'},
		{wxn:'wrapx8',L:'Estado',I:{tag:'select',sel:{disabled:'disabled',title:Jr.docStatus},opts:$V.gvtPvtStatus,selected:Jr.docStatus,noBlank:1}},
		{fType:'date',name:'docDate',req:'Y',value:Jr.docDate,I:{'disabled':dateDisab}},
		{fType:'date',name:'dueDate',req:'Y',value:Jr.dueDate,textNode:'Fecha Entrega'},
		{divLine:1,wxn:'wrapx3',req:'Y',L:'Cliente',Inode:sea},
		{wxn:'wrapx4',req:'Y',L:{textNode:'Empleado Ventas'},I:{tag:'select',sel:{'class':jsF+' '+$Sea.clsName,name:'slpId',k:'slpId'},opts:$Tb.oslp,selected:Jr.slpId}},
		{divLine:1,wxn:'wrapx8',req:'Y',L:'Departamento',Inode:Dires[1]},
		{wxn:'wrapx8',req:'Y',L:'Ciudad',Inode:Dires[2]},
		{wxn:'wrapx2',req:'Y',L:'Dirección Entrega',Inode:Dires[3]},
		//{divLine:1,wxn:'wrapx2',req:'Y',L:'Dirección para mercancías',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,name:'addrMerch',k:'_addr_merch',value:Jr.addrMerch}},
		//{wxn:'wrapx2',req:'Y',L:'Dirección para facturación',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,name:'addrInv',k:'_addr_inv',value:Jr.addrInv}},
		{divLine:1,wxn:'wrapx1',L:{textNode:'Detalles/Observaciones'},I:{tag:'textarea','class':jsF,name:'lineMemo',textNode:Jr.lineMemo}}
		];
		if($jSoc.gvtPvt_pymntGr=='Y'){
			Lif.push({divLine:1,wxn:'wrapx8',req:'Y',L:'Condiciones Pago',I:{tag:'divSelect',sel:{'class':jsF,name:'pymntGr'},opts:$Tb.gfiOpym,selected:Jr.pymntGr}});
		}
		$Doc.formSerie({cont:cont,serieType:'opvt', docEntry:Pa.docEntry, jsF:jsF,
		PUT:Api.Gvt.b70+'pvt/form', func:function(Jr2){
			$M.to('sellOrd.view','docEntry:'+Jr2.docEntry);
		},
		middleCont:fie,
		Li:Lif
		});
		if(Jr.L && Jr.L.errNo){ $Api.resp(tBody,Jr.L); }
		else{
			Jr.jsF=jsF; Jr.formType='venta'; Jr.Fie=fFie;
			_Frm.itm(Jr,tBody);
		}
	}
	});
},
}
Gvt.Pvt.opens=function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'pvt/opens', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var div=$1.t('div',{style:'text-align:right;'},cont);
			var resp=$1.t('div');
			div.appendChild(resp);
			var tb=$1.T.table(['','N°','Fecha Doc.','Bodega','Cliente','Tipo','Fecha Entrega','Vendedor','Valor','Realizado']); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var dlvBtn=$1.T.btnFa({fa:'iBg iBg_wareDisponible',textNode:' Despacho', L:L, func:function(T){ $M.Ht.ini({g:function(){ Gvt.Dlv.form(T.L); } });; }});
				td.appendChild(dlvBtn);
				var menu=$1.Menu.winLiRel({Li:[
					{}
				]}); //td.appendChild(menu);
				var td=$1.t('td',0,tr);
				$1.t('a',{href:$M.to('sellOrd.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:' '+L.docEntry},td);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:_g(L.docType,$V.ordTypePE)},tr);
				$1.t('td',{textNode:$2d.f(L.dueDate,'mmm d')},tr);
				$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr);
				$1.t('td',{textNode:$Str.money({curr:L.curr,value:L.docTotal})},tr);
				$1.t('td',{textNode:$Doc.by('userName',L)},tr);
			}
		}
	}});
};
var Ord={
mark2Send:function(P){
	var wrap=$1.t('div',0);
	$1.t('p',{textNode:'El documento será marcado como ENVIADO, ya no podrás modificarlo.'},wrap);
	var resp=$1.t('div',0,wrap);
	var c=$Api.send({textNode:'Marcar como Enviado',PUT:Api.Gvt.b70+'pvt/statusSend',getInputs:function(){ return 'docEntry='+P.docEntry+'&odocType='+P.odocType; }, loade:resp, func:function(Jr){
		$ps_DB.response(resp,Jr);
		if(!Jr.errNo){ $1.delet('.__btnSellOrdSend'); }
	}});
	wrap.appendChild(c);
	$1.Win.open(wrap,{winTitle:'Marcar como Enviado',onBody:1,winSize:'medium'});
},
}
Gvt.Pvt.Rep={
openQty:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'pvt/rep/openQty', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var viewType=$1.q('.__viewType',cont.parentNode).value;
			var _v_lineMemo=(Jr && viewType=='doc');
			var _v_barCode=(Jr && Jr.pvt_barCode);
			var Tds=['Código','Descripción',{textNode:'Talla'},'UdM','Pedido',{style:'background-color:#EEE;',textNode:'Pendiente',_i:'gvtPvtOpenQty'},'Bodega','Total Bodega',{textNode:'Solicitado',_i:'gvtPvtisCommited'},{textNode:'Ok',title:'¿Las cantidades disponibles cubren los pendientes Totales'}];
			if(viewType=='card'){
				Tds.push('Cliente'); Tds.push('Resp. Ventas'); Tds.push('Grupo Cliente');
				Tds.push({textNode:'Cierre Fact.',_i:'gvtCardDayClose'});
			}
			if(viewType=='doc'){
				Tds.push('No. Pedido'); Tds.push('Fecha Entrega');
				Tds.push('O.C');
				Tds.push('Cliente'); Tds.push('Resp. Ventas'); Tds.push('Grupo Cliente');
				Tds.push('Creado');
				Tds.push({textNode:'Cierre Fact.',_i:'gvtCardDayClose'});
			}
			if(_v_lineMemo){ Tds.push('Detalles'); }
			if(_v_barCode){ Tds.push('Código Barras'); }
			var tb=$1.T.table(Tds);
			var tBody=$1.t('tbody',0,tb);
			Jr.L=$js.sortNum(Jr.L,{k:'itemCode'});
			for(var i in Jr.L){ var L=Jr.L[i];
				var tr1=$1.t('tr',0,tBody);
				var v1=(L.openQty)?L.openQty*1:'';
				var isCo=(L.isCommited)?L.isCommited*1:'';
				var v2=(L.onHand)?L.onHand*1:'';
				var css3=(isCo!=v1)?'backgroundColor:orange;':'';
				$1.t('td',{textNode:L.itemCode},tr1);
				$1.t('td',{textNode:L.itemName},tr1);
				$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr1);
				$1.t('td',{textNode:L.udm},tr1);
				$1.t('td',{textNode:(L.quantity*1),'class':'__tbColNums',tbColNum:1},tr1);
				$1.t('td',{textNode:v1,style:'background-color:#EEE;','class':'__tbColNums',tbColNum:2},tr1);
				$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr1);
				$1.t('td',{textNode:v2,'class':'__tbColNums',tbColNum:3},tr1);
				$1.t('td',{textNode:isCo,'class':'__tbColNums',tbColNum:4,style:css3},tr1);
				var ok='No'; var okcss='backgroundColor:#F00;';
				if(L.isCommited*1<=L.onHand*1){ ok='Si'; okcss='backgroundColor:#0F0;'; }
				$1.t('td',{textNode:ok,style:okcss},tr1);
				if(viewType=='doc'){
					var td=$1.t('td',0,tr1);
					$1.t('a',{href:$M.to('sellOrd.openQty','docEntry:'+L.docEntry,'r'),textNode:L.docEntry},td);
					$1.t('td',{textNode:L.dueDate},tr1);
					$1.t('td',{textNode:L.ref1},tr1);
					$1.t('td',{textNode:L.cardName},tr1);
					$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr1);
					$1.t('td',{textNode:_g(L.grId,$V.crdGroup)},tr1);
					$1.t('td',{textNode:L.docDate},tr1);
					$1.t('td',{textNode:L.invDayClose},tr1);
					if(_v_lineMemo){ $1.t('td',{textNode:L.lineMemo},tr1); }
				}
				if(viewType=='card'){
					$1.t('td',{textNode:L.cardName},tr1);
					$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr1);
					$1.t('td',{textNode:_g(L.grId,$V.crdGroup)},tr1);
					$1.t('td',{textNode:L.invDayClose},tr1);
				}
				if(_v_barCode){ $1.t('td',{textNode:L.barCode},tr1); }
			}
			var tr=$1.t('tr',0,tBody);
			var tbCol3=(viewType!='')?'':'__tbColNumTotal3';
			var tbCol4=(viewType!='')?'':'__tbColNumTotal4';
			$1.t('td',0,tr);
			$1.t('td',{textNode:'Total'},tr);
			$1.t('td',0,tr); $1.t('td',0,tr);
			$1.t('td',{'class':'__tbColNumTotal1'},tr);
			$1.t('td',{'class':'__tbColNumTotal2'},tr);
			$1.t('td',0,tr);
			$1.t('td',{'class':tbCol3},tr);
			$1.t('td',{'class':tbCol4},tr);
			$1.t('td',0,tr); $Tol.tbSum(tb);
			var gb=(viewType=='doc')?' agrupado por Pedido':'';
			gb=(viewType=='card')?' agrupado por Cliente':gb;
			tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Pendientes Totales'+gb});  cont.appendChild(tb);
		}
	}});
},
itemCanceled:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'pvt/rep/itemCanceled', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		var tb=$1.T.table(['Número','Creado','Fecha','Fecha Entrega','Socio de Negocios','Fecha de Anulación',{textNode:'Días',title:'Días entre creación y anulación'},'Usuario','Detalle Anulación']);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',0,tr).appendChild($Doc.href('opvt',L,{format:'id'}));
			$1.t('td',{textNode:L.dateC},tr);
			$1.t('td',{textNode:L.docDate},tr);
			$1.t('td',{textNode:L.dueDate},tr);
			$1.t('td',{textNode:L.cardName},tr);
			$1.t('td',{textNode:L.dateCNull},tr);
			$1.t('td',{textNode:$2d.diff({date1:L.dateC,date2:L.dateCNull,round:'Y'})},tr);
			$1.t('td',{textNode:_g(L.userId,$Tb.ousr)},tr);
			$1.t('td',{textNode:L.lineMemo},tr);
		}
		tb=$1.T.tbExport(tb,{ext:'xlsx'});
		cont.appendChild(tb);
	}});
},
stockPeP:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'pvt/rep/stockPeP', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		var tb=$1.T.table(['Rev','Documento','Código','Talla','Descripción','Cant. en Doc','Accion','Faltan','de Proceso','a Planif.','Stock Libre','PeP Libre','Total Stock','Solicitado','Proceso','Fecha','Fecha Entrega','Cliente','Asesor','Cartera']);
		var tBody=$1.t('tbody',0,tb);
		var x_ok='green'; x_I='red'; x_Proc='orange';
		var OVs={}; var itw={}; //onHand, onHandAt, pep, pepAt 
		var css1='backgroundColor:#CCC;';
		//Jr.L[0].onHand=7;  Jr.L[0].onOrder=2; 
		for(var i in Jr.L){ var L=Jr.L[i];
			var lk=L.docEntry; var ita=L.itemId+'_'+L.itemSzId;
			L.openQty=L.openQty*1; L.onHand=L.onHand*1; L.isCommited =L.isCommited*1; L.onOrder =L.onOrder*1;
			if(!itw[ita]){ 
				itw[ita]={onHand:L.onHand,onHandAt:L.onHand,pep:L.onOrder,pepAt:L.onOrder};
			}
			var Lx=itw[ita];
			var reqQty=L.openQty; //25
			var tr=$1.t('tr',{'class':'gvtStockPeP_'+lk},tBody);
			var isOk=(L.onHand>=L.isCommited)?true:false;
			var isOkTxt=''; var isOkQty=0;
			var restoPeP=0; /* lo que me sirve en proceso */
			var faltaPeP=0;
			var reqIvt=reqQty; reqPeP=0;
			if(Lx.onHandAt>0){
				var faltaIvt=Lx.onHandAt-reqQty; // 10-25, me faltan -15 en bodega, pero sobran 10
				if(faltaIvt>0){// todo en bodega
					Lx.onHandAt -= reqQty;
					reqQty=0;  reqIvt=0;
				}
				else{//faltan pedido - inventario
					if(Lx.onHandAt>0){ reqQty -= Lx.onHandAt;  }/* faltan 15 requeridas */
					reqIvt = Math.abs(faltaIvt); /* 15 en bodega */
					Lx.onHandAt=0;
				}
			}
			/* revisar pep si faltan en inventario */
			if(reqIvt>0){
				var faltaPeP=Lx.pepAt-reqIvt; // 8-15, me faltan -7 , solo tengo 8 en proceso, pero debo usar esas 8
				if(faltaPeP>0){// todo en proceso
					Lx.pepAt -= reqIvt; reqQty=0; reqPeP=0; restoPeP=reqIvt;
				}
				else{
					if(Lx.pepAt>0){ reqQty -= Lx.pepAt;  restoPeP =Lx.pepAt; }/* faltan 7 requeridas */
					reqPeP = Math.abs(faltaPeP); /* 15 en bodega */
					Lx.pepAt = 0;
				}
			}
			reqTotal=reqIvt+reqPeP;
			if(!OVs[lk]){ OVs[lk]={ok:0,pep:0,plan:0}; }
			var x_css='';
			if(reqIvt<=0){ isOkTxt='Ok'; x_css=x_ok; } 
			else if(reqPeP<=0){ x_css=x_Proc;
				isOkTxt='B'; OVs[lk].pep+=1;
			}
			else{ isOkTxt='C'; OVs[lk].plan+=1;  x_css=x_I; }
			tr.L=L;
			tr.ok=isOk;
			$1.t('td',{textNode:'.'},tr);
			$1.t('td',{textNode:L.docEntry},tr);
			$1.t('td',{textNode:L.itemCode},tr);
			$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr);
			$1.t('td',{textNode:L.itemName},tr);
			$1.t('td',{textNode:L.openQty},tr);
			$1.t('td',{textNode:isOkTxt,style:'backgroundColor:'+x_css},tr);
			$1.t('td',{textNode:reqIvt,style:css1},tr);
			$1.t('td',{textNode:restoPeP,style:css1},tr);
			$1.t('td',{textNode:reqPeP,style:css1},tr);
			$1.t('td',{textNode:Lx.onHandAt},tr);
			$1.t('td',{textNode:Lx.pepAt},tr);
			$1.t('td',{textNode:L.onHand,style:css1},tr);
			$1.t('td',{textNode:L.isCommited},tr);
			$1.t('td',{textNode:L.onOrder},tr);
			$1.t('td',{textNode:L.docDate},tr);
			$1.t('td',{textNode:L.dueDate},tr);
			$1.t('td',{textNode:L.cardName},tr);
			$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr);
			$1.t('td',{textNode:_g(L.cartStatus,$V.gvtPvtCartStatus)},tr);
		}
		var c1=0; var csi=8;  var cta=4;
		var cOk=7; var cProc=8; var cPlan=9;
		/* Revisar y crear datos */
		var tDa={};/* para grafificar tablas */
		for(var lk in OVs){
			var als=$1.q('.gvtStockPeP_'+lk,tBody,'all'); var nl=0;
			for(var i=0; i<als.length; i++){
				var L=als[i].L;
				if(nl==0){ /* Primera Linea Pedido */
					als[i].childNodes[c1+1].style.backgroundColor='#ffd43b'; nl=1;
					als[i].childNodes[cta].style.backgroundColor='#ffd43b'; nl=1;
					als[i].childNodes[cta+1].style.backgroundColor='#ffd43b'; nl=1;
				}
				var itk=L.itemId+'_'+L.itemSzId;
				if(!tDa[itk]){ L.ok=L.pep=L.plan=0; tDa[itk]=L; }
				tDa[itk].plan +=als[i].childNodes[cPlan].innerText*1;
				tDa[itk].pep +=als[i].childNodes[cProc].innerText*1;
				if(OVs[lk].plan>0){ /* Se debe planificar */
					als[i].childNodes[c1].innerText='I';
					als[i].childNodes[c1].style.backgroundColor=x_I;
				}
				else if(OVs[lk].pep>0){ /* Viene en proceso */
					als[i].childNodes[c1].innerText='Proc.';
					als[i].childNodes[c1].style.backgroundColor=x_Proc;
				}
				else{
					als[i].childNodes[c1].innerText='Ok';
					als[i].childNodes[c1].style.backgroundColor=x_ok;
					tDa[itk].ok +=L.openQty;
				}
			}
		}
		tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Reporte'});
		var Pm=[
		{textNode:'Datos',winClass:'winData','class':'fa fa-database'},
		{textNode:'Rep 1',winClass:'winInfo','class':'fa fa-thumbs-o-up'}
		];
		var Wins = $1M.tabs(Pm,cont,{w:{style:'margin-top:0.5rem;'}});
		Wins._winData.click();
		Wins.winData.appendChild(tb);
		var hlp=$1.t('div',0,Wins.winData);
		$1.t('h5',{textNode:'Interpretación del Reporte'},hlp);
		var u1=$1.t('ul',{'class':'ulBase'},hlp);
		var u2=$1.t('ul',0,$1.t('li',{textNode:'Si columna [Rev] es igual a '},u1));
		$1.t('li',{textNode:'Ok: La orden de venta está completa'},u2);
		$1.t('li',{textNode:'Proc: La orden debe completarse con el producto en proceso.'},u2);
		$1.t('li',{textNode:'I: La orden requiere que se planifique producción y complete el proceso.'},u2);
		var u2=$1.t('ul',0,$1.t('li',{textNode:'Si columna [acción] es igual a '},u1));
		$1.t('li',{textNode:'Ok: La cantidad de inventario alcanza para este articulo'},u2);
		$1.t('li',{textNode:'B: Se debe agilizar la producción para completar el articulo.'},u2);
		$1.t('li',{textNode:'C: Se debe planificar y agilizar la producción.'},u2);
		$1.t('li',{textNode:'Faltan: Es la cantidad que falta en inventario para completar el articulo.'},u1);
		$1.t('li',{textNode:'De proceso: De lo que falta, esta cantidad se puede obtener del producto en proceso.'},u1);
		$1.t('li',{textNode:'a Planif.: De lo que falta y de lo que está en proceso, esta cantidad se debe planificar.'},u1);
		$1.t('li',{textNode:'Stock Libre.: Stock disponible hasta la linea actual para el articulo. Se va restando lo ya usado'},u1);
		$1.t('li',{textNode:'PeP Libre.: Stock de producto en proceso disponible hasta la linea actual para el articulo. Se va restando lo ya usado'},u1);
		/* tabla 2 */
		$1.t('p',{textNode:'Consolidado de Información'},Wins.winInfo);
		var tb2=$1.T.table(['Código','Descripción','Talla','Pedido','Completo','Agilizar PeP','Planificar','Stock','PeP']);
		var tBody=$1.t('tbody',0,tb2);
		tb2=$1.T.tbExport(tb2,{ext:'xlsx',fileName:'Reporte'});
		Wins.winInfo.appendChild(tb2);
		for(var i in tDa){ var L=tDa[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			$1.t('td',{textNode:L.itemCode},tr);
			$1.t('td',{textNode:L.itemName},tr);
			$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr);
			$1.t('td',{textNode:L.isCommited,'class':tbCal._cell,ncol:1},tr);
			$1.t('td',{textNode:L.ok,'class':tbCal._cell,ncol:2},tr);
			$1.t('td',{textNode:L.pep,'class':tbCal._cell,ncol:3},tr);
			$1.t('td',{textNode:L.plan,'class':tbCal._cell,ncol:4},tr);
			$1.t('td',{textNode:L.onHand,style:css1,'class':tbCal._cell,ncol:5},tr);
			$1.t('td',{textNode:L.onOrder,'class':tbCal._cell,ncol:6},tr);
		}
		var tr=$1.t('tr',0,tBody);
		$1.t('td',{textNode:''},tr);
		$1.t('td',{textNode:'Total'},tr);
		$1.t('td',{textNode:''},tr);
		$1.t('td',{textNode:L.isCommited,'class':tbCal._cell+'_1'},tr);
		$1.t('td',{textNode:L.ok,'class':tbCal._cell+'_2'},tr);
		$1.t('td',{textNode:L.pep,'class':tbCal._cell+'_3'},tr);
		$1.t('td',{textNode:L.plan,'class':tbCal._cell+'_4'},tr);
		$1.t('td',{textNode:L.onHand,style:css1,'class':tbCal._cell+'_5'},tr);
		$1.t('td',{textNode:L.onOrder,'class':tbCal._cell+'_6'},tr);
		tbCal.sumCells(tb2);
	}});
}
}

Gvt.Pvt.Liq={
view:function(){
	var Pa=$M.read(); var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'pvt/liq', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		var Trs=[]; var n=0; var iva=0; var total=0;
		for(var i in Jr.L){ var L=Jr.L[i]; Trs[n]=[];
			var valu=$js.toFixed(L.lineTotal/L.quantity,0);
			iva += L.lineTotal*0.19;
			total += L.lineTotal*1;
			Trs[n].push({textNode:L.itemCode});
			Trs[n].push({textNode:L.itemName});
			Trs[n].push({textNode:L.quantity*1,'class':tbSum.tbColNums,tbColNum:1});
			Trs[n].push({textNode:$Str.money(valu)});
			Trs[n].push({textNode:$Str.money(L.lineTotal*1),'class':tbSum.tbColNums,tbColNum:2});
			n++;
		}
		Trs[n]=[];
		var bg='backgroundColor:#DDD; font-weight:bold;';
		Trs[n].push({style:bg});
		Trs[n].push({textNode:'Totales',style:bg});
		Trs[n].push({'class':tbSum.tbColNumTotal+'1',style:bg});
		Trs[n].push({style:bg});
		Trs[n].push({'class':tbSum.tbColNumTotal+'2',vformat:'money',style:bg}); n++;
		Trs[n]=[];
		Trs[n].push({});
		Trs[n].push({textNode:'Inpuestos (IVA)'});
		Trs[n].push({});
		Trs[n].push({});
		Trs[n].push({textNode:$Str.money(iva)}); n++;
		Trs[n]=[];
		Trs[n].push({style:bg});
		Trs[n].push({textNode:'Valor a Cancelar',style:bg});
		Trs[n].push({style:bg});
		Trs[n].push({style:bg});
		var total2=total*1+iva*1;
		Trs[n].push({textNode:$Str.money(total2),style:bg});
		var bot1=$1.t('div',{style:'text-align:center;','class':'pre',textNode:$Soc.pymInfo});
		var bot2=$1.t('div',{style:'text-align:center;','class':'pre',textNode:$Soc.gvtPvtPrepa});
		$Tpt.draw(cont,{serieType:'gvtPvtPrep',D:Jr,
		Ls:[{t:'Estado',v:$V.docStatus[Jr.docStatus]},{middleInfo:'Y'},{logoRight:'Y'},
		{tag:'docDate'},
		{t:'Entrega',v:Jr.dueDate},
		{tag:'cliente',cs:4},{t:'Asesor',v:_g(Jr.slpId,$Tb.oslp),cs:2,ln:1}],
		Tb:['Código','Descripción',{textNode:'Cant.',style:'width:6rem;'},{textNode:'Valor Unit.',style:'width:6rem;'},{textNode:'Valor Total'}],
		Trs:Trs,
		Foot:[
		[{colspan:8,node:bot1,style:'border:0.0625rem solid #DDD;'}],
		[{colspan:8,node:bot2,style:'border:0.0625rem solid #DDD;'}]
		]
		});
		tbSum.get(cont);
	}
	});
}
}


Gvt.Dlv={
OLi:[],
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.b70+'dlv/tb99',serieType:'odlv',docEntry:T.P.docEntry}); } }; n++;
	Li[n]={k:'modify',ico:'fa fa_pencil',textNode:' Modificar Documento', P:L, func:function(T){ $M.to('sellDlv.form','docEntry:'+T.P.docEntry); } }; n++;
	Li[n]={k:'digit',ico:'fa fa_plusCircle',textNode:' Añadir Cantidades', P:L, func:function(T){ $M.to('sellDlv.digit','docEntry:'+T.P.docEntry); } }; n++;
	Li[n]={k:'docPacking',ico:'fa fa_cells',textNode:' Lista de Empaque', P:L, func:function(T){ $M.to('sellDlv.packing','docEntry:'+T.P.docEntry); } }, n++;
	Li[n]={k:'docRotul',ico:'fa fa_cells',textNode:' Rótulo Empaque', P:L, func:function(T){ $M.to('sellDlv.packingRol','docEntry:'+T.P.docEntry); } }, n++;
	Li[n]={k:'modifyLines',ico:'fa fa_pencil',textNode:' Modificar Lineas', P:L, func:function(T){ $M.to('sellDlv.lines','docEntry:'+T.P.docEntry); } }, n++;
	if(L.docStatus=='O'){
		Li[n]={k:'statusC',ico:'fa fa_history',textNode:' Cerrar Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Gvt.b70+'dlv/statusClose',reqMemo:'N',text:'Se va a cerrar el documento. No se puede revertir esta acción. Se realizaran movimientos en el inventario de los artículos del documento.'}); } }; n++;
	}
	if(L.docStatus!='N'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({serieType:'gvtDlv',docEntry:T.P.docEntry,api:Api.Gvt.b70+'dlv/statusCancel',text:'Se va anular el documento. Las cantidades pendientes del pedido de origen volverán a definirse a los valores que tenian antes de la creación de este documento.'}); } }; n++;
	}
	Li[n]={k:'logs',ico:'fa fa-id-badge',textNode:' Documento Remisión', P:L, func:function(T){ $M.to('sellDlv.viewFirma','docEntry:'+T.P.docEntry); } }; n++;
	Li[n]={k:'invDefine',ico:'fa fa-info',textNode:' Parámetros Facturación', P:L, func:function(T){ Gvt.Dlv.invDefine(T.P); } }; n++;
	return $Opts.add('gvtDlv',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Dlv.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'dlv', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table([{'class':$Xls.tdNo},'N°.','Estado','Fecha Doc.','Bodega','Cliente','Resp. Ventas','Pedido','Ref. 2','Gestión Doc.','Ref. 2','Total','Realizado']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',{'class':$Xls.tdNo},tr);
				Gvt.Dlv.opts({L:L},td);
				var td=$1.t('td',0,tr);
				$1.t('a',{href:$M.to('sellDlv.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:' '+L.docEntry},td);
				$1.t('td',{textNode:_g(L.docStatus,$V.dStatus),style:ColMt._g(L.docStatus,'gvtDlvStatus')},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr);
				$1.t('td',{textNode:L.tr,title:'Número de Pedido'},tr);
				$1.t('td',{textNode:L.delivRef1,title:'Número de despacho'},tr);
				$1.t('td',{textNode:_g(L.docStage,$V.gvtDlv_docStage)},tr);
				$1.t('td',{textNode:L.delivRef2,title:'Número de Factura o equivalente'},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
			}
			tb=$1.T.tbExport(tb,{print:'Y',ext:'xlsx',fileName:'Reporte de Entrega Pedido'});
			cont.appendChild(tb);
		}
	}});
},
form:function(P){
	cont=$M.Ht.cont; var jsF='jsFields'; Pa=$M.read();
	var isEdit=Pa.docEntry;
	$Api.get({f:Api.Gvt.b70+'dlv/form',loadVerif:!isEdit, inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false;}
		if(!Jr.docDate){ Jr.docDate=$2d.today; }
		var lTag={tag:'input',type:'date','class':jsF,name:'docDate',value:Jr.docDate};
		if(isEdit){ lTag.disabled='disabled'; lTag.type='text'; }
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',req:'Y',L:'Fecha',I:lTag},cont);
	var vTT='cardId='+Jr.cardId+'&tt='+Jr.tt+'&tr='+Jr.tr;
	if(!Jr.whsId && P.whsId){ Jr.whsId=P.whsId; }
	var selTag={tag:'select','class':jsF,name:'whsId',opts:$V.whsCode,selected:Jr.whsId};
	var selTag2={tag:'select','class':jsF,name:'whsIdSep',opts:$V.whsCode,selected:Jr.whsIdSep};
	if(isEdit){
		selTag['disabled']='disabled'; delete(selTag['class']); delete(selTag.name);
		selTag2['disabled']='disabled'; delete(selTag2['class']); delete(selTag2.name);
	}
	Jr=(Jr.docEntry)?Jr:P;
	if(!Pa.docEntry){ Jr.tr=Jr.docEntry;
		Jr.lineMemoOrd=Jr.lineMemo; Jr.lineMemo='';
		var vTT='cardId='+Jr.cardId+'&tt='+$oTy.opvt+'&tr='+Jr.tr;
	}
	$1.T.divL({wxn:'wrapx8',subText:'De salida de mercancía',req:'Y',L:'Bodega',I:selTag},divL);
	if($Mdl.Mcnf('gvtDlvWhsSep','Y')){
		$1.T.divL({wxn:'wrapx8',subText:'Separar capturas',L:'Bodega Separado',I:selTag2,_i:{t:'Si se define, la mercancía ingresará a está bodega. Al cerrar el documento, se realiza la salida.'}},divL);
	}
	$1.T.divL({wxn:'wrapx8',subText:'logística...',L:'Guia Despacho',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,name:'delivRef1',value:Jr.delivRef1}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Gestión Doc.',I:{tag:'select','class':jsF,name:'docStage',opts:$V.gvtDlv_docStage,selected:Jr.docStage}},divL);
		$1.T.divL({wxn:'wrapx8',subText:'factura',L:'No. Referencia',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,name:'delivRef2',value:Jr.delivRef2}},divL);
	if(1 || P.docEntry){
		var sea=$1.t('input',{type:'text','class':jsF,name:'cardName',value:Jr.cardName,O:{vPost:vTT},disabled:'disabled'});
	}
	else{
	var inputs='&_otD[addr][addrType(E_in)]=merch,inv';
	var sea=$Sea.input(cont,{api:'crd.c','class':jsF, inputs:inputs, vPost:'cardId='+Jr.cardId+'&cardName='+Jr.cardName, defLineText:Jr.cardName, func:function(L,inp){
			inp.O={vPost:'cardId='+L.cardId+'&cardName='+L.cardName};
			$Sea.replaceData(L,cont);
		}});
	}
	$1.T.divL({divLine:1,wxn:'wrapx1',req:'Y',L:{textNode:'Cliente'},Inode:sea},cont);
	var Dires=Addr.basic(Jr,null,{nodes:'Y',jsF:jsF,kAddress:'addrMerch'});
	//var divL=$1.T.divL({divLine:1,wxn:'wrapx2',req:'Y',L:'Dirección Envio',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,k:'_addr_merch',name:'addrMerch',value:Jr.addrMerch}},cont);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',req:'Y',L:'Departamento',Inode:Dires[1]},cont);
	$1.T.divL({wxn:'wrapx8',req:'Y',L:'Ciudad',Inode:Dires[2]},divL);
	$1.T.divL({wxn:'wrapx2',req:'Y',L:'Dirección Entrega',Inode:Dires[3]},divL);
	//$1.T.divL({wxn:'wrapx2',req:'Y',L:'Dirección Facturación',I:{tag:'input',type:'text','class':jsF+' '+$Sea.clsName,k:'_addr_inv',name:'addrInv',value:Jr.addrInv}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Detalles de Pedido',I:{tag:'textarea','class':jsF,name:'lineMemoOrd',textNode:Jr.lineMemoOrd}},cont);
	$1.T.divL({wxn:'wrapx2',L:'Detalles / Novedad',I:{tag:'textarea','class':jsF,name:'lineMemo',textNode:Jr.lineMemo}},divL);
	var resp=$1.t('div',0,cont);
	var fS={POST:Api.Gvt.b70+'dlv/form', getInputs:function(){ return 'docEntry='+Pa.docEntry+'&'+$1.G.inputs(cont,jsF); }, loade:resp, respDiv:resp, func:function(Jr2){ $Api.resp(resp,Jr2);
		if(Jr2.docEntry){ $M.to('sellDlv.digit','docEntry:'+Jr2.docEntry); }
	}};
	if(isEdit){ fS.PUT=fS.POST; delete(fS.POST); }
	$Api.send(fS,cont);
	}});
},
digit:function(){
	cont=$M.Ht.cont; Pa=$M.read();
	$Api.get({f:Api.Gvt.b70+'dlv/digit',inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){
		sHt.sellDlvFormHead(Jr,cont);
		var wList=$1.t('div',0,cont);
		if(Jr.errNo){ $Api.resp(wList,Jr); return false;}
		if(Jr.O && Jr.O.errNo){
			$M.U.e();
			$ps_DB.response(wList,Jr.O); return false;
		}
		//barcode
		Che.tt=Jr.tt;
		Che.Ai={};
		Che.L=[]; Che.T={}; Che.t=[];//temporal
		var Op=(Jr.O && Jr.O.L)?Jr.O.L:{};
		Che.AiT=(Jr.O && Jr.O.T)?Jr.O.T:{};
		for(var i in Op){ L=Op[i];
			var ik=L.itemId;
			if(!Che.Ai[ik]){ Che.Ai[ik]={itemId:L.itemId,itemCode:L.itemCode,itemName:L.itemName,T:{}}; }
			for(var t in L.T){
				if(!Che.Ai[ik].T[t]){ Che.Ai[ik].T[t]={o:L.T[t].o,c:0}; }
			}
		}
		Che.n = -1; $M.U.i();
		cont.appendChild(Barc.input({func:function(Jr,boxNum){
			Barc.Draw.tbDetail(Jr,boxNum,{inpChange:function(){ updPend(wrapCons); }}); updPend(wrapCons);
		}}));
		var wrapCons=$1.t('div',{id:'_tableConsol'},cont);
		$1.t('div',{id:'_tableWrap'},cont);
		var resp = $1.t('div',0,cont);
		$Api.send({loadVerif:false, POST:Api.Gvt.b70+'dlv/digit', getInputs:function(){
			var d = JSON.stringify(Barc.getData(cont));
			return 'docEntry='+Pa.docEntry+'&tt='+Jr.tt+'&tr='+Jr.tr+'&discPf='+Jr.discPf+'&D='+d;
		}, func:function(Jr2){
			if(!Jr2.errNo){ $M.U.e(); $M.to('sellDlv.view','docEntry:'+Pa.docEntry); }
			$ps_DB.response(resp,Jr2);
		}},cont);
		updPend(wrapCons);
	}
	});
	function updPend(cont){
		//read inputs form barcodes
		$1.clear(cont);
		var tds=$1.q('.__itemTd',cont.parentNode,'all');
		for(var i=0; i<tds.length; i++){//reset to 2
			var js=tds[i].js;
			var Djs=tds[i].D;
			var _i=js.itemId;
			var _i2=js.itemSzId;
			if(Che.Ai){
				if(!Che.Ai[_i]){ Che.Ai[_i] ={itemCode:Djs.itemCode,itemName:Djs.itemName,T:{}}; }
				if(!Che.Ai[_i].T[_i2]){ Che.Ai[_i].T[_i2] ={o:0,c:0}; }
				Che.Ai[_i].T[_i2].c = 0;
			}
			if(tds[i].noReadAndDelete=='Y'){
				if(Che.Ai[_i] && Che.Ai[_i].T[_i2]){
					if(!Che.Ai[_i].T[_i2].o){ delete(Che.AiT[_i2]); }
				}
				continue;
			}
			if(Che.AiT){
				if(!Che.AiT[_i2]){ Che.AiT[_i2]=$V.grs1[_i2]; }
			}
		}
		for(var i=0; i<tds.length; i++){//put quantity
			var js=tds[i].js;
			var _i=js.itemId;
			var _i2=js.itemSzId;
			if(tds[i].noReadAndDelete=='Y'){ $1.clear(tds[i].parentNode); continue;}
			if(!Che.AiT[_i2]){ Che.AiT[_i2]=$V.grs1[_i2]; }
			Che.Ai[_i].T[_i2].c += tds[i].value*1;
		}
		var isOrd=(Che.tt!='');
		var tb=$1.T.table(['Código','Descripción','']);
		$1.delet($1.q('#_tbPend')); tb.setAttribute('id','_tbPend');
		var fie=$1.T.fieldset(tb,{L:{textNode:'Consolidado Pendientes / Despacho'}});cont.appendChild(fie);
		var trH=$1.q('thead tr',tb);
		for(var t in Che.AiT){ $1.t('td',{textNode:Che.AiT[t]},trH); }
		$1.t('td',{textNode:'Total'},trH);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Che.Ai){ L=Che.Ai[i]; var total=total2=0;
			var itemId=L.itemId;
			var trO=$1.t('tr',0,tBody);
			var rs=(isOrd)?2:1;
			if(isOrd){ var trC=$1.t('tr',0,tBody); }
			else{ var trC=trO; }
			$1.t('td',{textNode:L.itemCode,rowspan:rs},trO);
			$1.t('td',{textNode:L.itemName,rowspan:rs},trO);
			if(isOrd){ $1.t('td',{textNode:'Pendiente'},trO); }
			$1.t('td',{textNode:'Documento'},trC);
			btnSave=$1.q('.apiSendBtn');
			btnSave.removeAttribute('disabled');
			for(var t in Che.AiT){
				var val=val2=''; css='';
				if(L.T && L.T[t] && L.T[t].o){val=L.T[t].o*1; total+=val; }
				if(L.T && L.T[t] && L.T[t].c){val2=L.T[t].c*1; total2+=val2; }
				if(isOrd && L.T[t]){
				if(L.T[t].c && !L.T[t].o){ var css='backgroundColor:#E00;'; }//no hay relacion
				else if(L.T[t].o<L.T[t].c){ var css='backgroundColor:red;';
					btnSave.setAttribute('disabled','disabled');
				}//hay demas
				else if(L.T[t].o ==L.T[t].c){ var css='backgroundColor:#0E0;'; }//hay y completo
				else if(L.T[t].o && L.T[t].c>0){ var css='backgroundColor:ff5700;'; }//hay, se digito pero no esta completo (naranja)
				else if(L.T[t].o!=L.T[t].c){ var css='backgroundColor:#EE0;'; }//hay pero no digitado
				}
				if(isOrd){ $1.t('td',{textNode:val,style:css},trO); }
				$1.t('td',{textNode:val2,style:css,kdate:itemId+'_'+t},trC);
			}
			if(isOrd){ $1.t('td',{textNode:total},trO); }
			$1.t('td',{textNode:total2},trC);
		}

	}
},
view:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'dlv/view', inputs:'docEntry='+Pa.docEntry,loade:contPa, func:function(Jr){
		var cont=$1.t('div',0,contPa);
		$Doc.btnsTop('print,modify,logs,digit,docPacking,docRotul,modifyLines,statusN,statusC,invDefine',{icons:'Y',Li:Gvt.Dlv.OLg(Jr),contPrint:cont},contPa);
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		sHt.sellDlvHead(Jr,cont);
		var tb=$1.T.table([{textNode:'#'},{textNode:'Código'},{textNode:'Descripción'},{textNode:'Cant.'},{textNode:'UdM'},{textNode:'Precio'},{textNode:'Desc.'},{textNode:'Total'}]);
		$1.t('p',0,cont);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas de Documento'}}); cont.appendChild(fie);
		tb.classList.add('table_x100');
		var tBody=$1.t('tbody',0,tb);
		var tFo=$1.t('tfoot',0,tb); var cs=7;
		var tr=$1.t('tr',0,tFo);
		$Str.useCurr=Jr.curr;
		var totalLineVal=Jr.docTotalLine;
		var totalVal=Jr.docTotal;
		var discSum=Jr.discSum;
		$1.t('td',{textNode:'Cantidad Total',colspan:3,style:'text-align:right;'},tr);
		$1.t('td',{'class':tbSum.tbColNumTotal+'1'},tr);
		$1.t('td',{textNode:'Total Lineas',colspan:cs-4,style:'text-align:right;'},tr);
		$1.t('td',{textNode:$Str.money(Jr.docTotalLine)},tr);
		var tr=$1.t('tr',0,tFo);
		$1.t('td',{textNode:'Desc. Total ('+(Jr.discTotal*1)+'%)',colspan:cs,style:'text-align:right;'},tr);
		$1.t('td',{textNode:$Str.money(discSum)},tr);
		var tr=$1.t('tr',0,tFo);
		$1.t('td',{textNode:'Total',colspan:cs,style:'text-align:right;'},tr);
		$1.t('td',{textNode:$Str.money(totalVal)},tr);
		var currD=(Jr.curr!=$0s.currDefault);
		if(Jr.L.errNo){
			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));
		}else{ var n=1;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:n},tr); n++;
			var val=(currD)?L.priceME:L.price;
			$1.t('td',{textNode:Itm.Txt.code(L)},tr);
			$1.t('td',{textNode:Itm.Txt.name(L)},tr);
			$1.t('td',{textNode:L.quantity*1,'class':'__tbColNums',tbColNum:1},tr);
			$1.t('td',{textNode:L.sellUdm},tr);
			$1.t('td',{textNode:$Str.money(val)},tr);
			$1.t('td',{textNode:(L.disc*1)+'%'},tr);
			$1.t('td',{textNode:$Str.money(val*L.quantity)},tr);
		}
		}
		$Tol.tbSum(tb);
		$Str.useCurr=false;
		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);
	}});
},
viewFirma:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'dlv/view', inputs:'docEntry='+Pa.docEntry,loade:contPa, func:function(Jr){
		var cont=$1.t('div',0,contPa);
		cont.classList.add('pageyFooter_wrap');
		$Doc.btnsTop('print,modify,logs,digit,docPacking,docRotul,modifyLines,statusN,statusC,invDefine',{icons:'Y',Li:Gvt.Dlv.OLg(Jr),contPrint:cont},contPa);
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		sHt.sellDlvHead(Jr,cont);
		var tb=$1.T.table([{textNode:'#'},{textNode:'Código'},{textNode:'Descripción'},{textNode:'Cant.'}]);
		$1.t('p',0,cont);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas de Documento'}}); cont.appendChild(fie);
		fie.classList.add('pageyFooter_content');
		tb.classList.add('table_x100');
		var tBody=$1.t('tbody',0,tb);
		var tFo=$1.t('tfoot',0,tb); var cs=7;
		var tr=$1.t('tr',0,tFo);
		$Str.useCurr=Jr.curr;
		var totalLineVal=Jr.docTotalLine;
		var totalVal=Jr.docTotal;
		var discSum=Jr.discSum;
		$1.t('td',{textNode:'Cantidad Total',colspan:3,style:'text-align:right;'},tr);
		$1.t('td',{'class':tbSum.tbColNumTotal+'1'},tr);
		$1.t('td',{},tr);
		var currD=(Jr.curr!=$0s.currDefault);
		if(Jr.L.errNo){
			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));
		}
		else{ var n=1;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:n},tr); n++;
			var val=(currD)?L.priceME:L.price;
			$1.t('td',{textNode:Itm.Txt.code(L)},tr);
			$1.t('td',{textNode:Itm.Txt.name(L)},tr);
			$1.t('td',{textNode:L.quantity*1,'class':'__tbColNums',tbColNum:1},tr);
		}
		}
		$Tol.tbSum(tb);
		$Str.useCurr=false;
		var dv=$1.t('div',{style:'padding:0.25rem;'},cont);
		dv.classList.add('pageyFooter_footer');
		$1.t('div',{style:'float:left; width:300px; borderTop:1px solid #000; fontWeight:bold; marginTop:35px;',textNode:'Elaborado por '+_g(Jr.userId,$Tb.ousr)},dv);
		var divt=	$1.t('div',{style:'float:right; width:300px; borderTop:1px solid #000; marginTop:35px; fontWeight:bold;'},dv);
		divt.innerHTML='Aceptada<br/>Nombre Legible y Sello<br/><br/>';
		$1.t('div',{'class':'clear'},dv);
		$1.t('div',{textNode:'Nota: No se aceptan reclamaciones por faltantes de mercancía si al momento de la entrega no se verifica el total de unidades recibidas en presencia del transportador.',style:'fontSize:13px;'},dv);
	}});
},

packing:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont;
	var divTop=$1.t('div',{style:'marginBottom:0.5rem;'},contPa);
	var cont=$1.t('div',0,contPa);
	var btnPrint=$1.T.btnFa({fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(cont); }});
	divTop.appendChild(btnPrint);
	var TA={};
	$Api.get({f:Api.Gvt.b70+'dlv/packing', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		sHt.sellDlvHead(Jr,cont);
		var tb=$1.T.table([{textNode:'#',style:'width:2rem;'},{textNode:'Código',style:'width:4.5rem;'},'Descripción']);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lista de Empaque'}}); cont.appendChild(fie);
		tb.classList.add('table_x100');
		if(Jr.errNo){ $Api.resp($1.t('div',0,fie),Jr.L0);  }
		else{
		var tBody=$1.t('tbody',0,tb);
		var total=0;
		var trH=$1.q('thead tr',tb);
		$1.t('td',{textNode:'Total'},trH);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.detail,style:'width:2rem;'},tr);
			$1.t('td',{textNode:Itm.Txt.code(L)},tr);
			$1.t('td',{textNode:Itm.Txt.name(L)},tr);
			$1.t('td',{textNode:L.quantity*1},tr);
			total+=L.quantity*1;
		}
		var tr=$1.t('tr',0,tBody);
		$1.t('td',{textNode:'Total',colspan:3},tr);
		$1.t('td',{textNode:total},tr);
		}
		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);
		}
	});
},
packingRol:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont;
	var divTop=$1.t('div',{style:'marginBottom:0.5rem;'},contPa);
	var cont=$1.t('div',0,contPa);
	var btnPrint=$1.T.btnFa({fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(cont); }});
	divTop.appendChild(btnPrint);
	var TA={}; var n=1;
	$Api.get({f:Api.Gvt.b70+'dlv/packingRol', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		for(var i in Jr.L){
			var L=Jr.L[i];
			var div=$1.t('div',{'class':'rotulWrap',style:'width:45%; margin-bottom:3rem; border:0.0625rem solid #000; padding:0.5rem; margin-left:0.5rem; float:left;'},cont);
			var tb=$1.t('table',{'class':'table_zh',style:'width:100%;'},div);
			var tBody=$1.t('tbody',0,tb);
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:'No. Documento'},tr);
			$1.t('td',{textNode:Jr.licTradNum},tr);
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:'Cliente'},tr); $1.t('td',{textNode:Jr.cardName},tr);
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:'Dirección'},tr); $1.t('td',{textNode:Jr.addrMerch},tr);
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:'Caja: '+L.detail},tr); $1.t('td',{textNode:'Caja '+n+' de '+Jr.numBox},tr);
			//items
			n++;
			$1.t('div',{textNode:'DM: '+Jr.docEntry,style:'padding:0.25rem; font-size:0.9rem;'},div);
			var tb=$1.T.table(['Código','Descripción']); var trh=$1.q('tr',tb);
			tb.style.width='100%';
			div.appendChild(tb);
			for(var ta in L.T){ $1.t('td',{textNode:L.T[ta]},trh); }
			$1.t('td',{textNode:'Total'},trh);
			var tBody=$1.t('tbody',0,tb);
			for(var ite in L.i){ var L2=L.i[ite];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L2.itemCode},tr);
				$1.t('td',{textNode:L2.itemName},tr); var total=0;
				for(var ta in L.T){
					var val=(L2.T[ta])?L2.T[ta]*1:'';
					total+=val*1;
					$1.t('td',{textNode:val},tr);
				}
				$1.t('td',{textNode:total},tr);
			}
			//addr
				var divb=$1.t('div',{style:'margin-top:0.75rem; line-height:1.2;'},div);
				var dle=$1.t('div',{style:'float:left; width:48%;'},divb);
				$1.t('div',{textNode:$Soc.address},dle);
				$1.t('div',{textNode:$Soc.pbx},dle);
				$1.t('div',{textNode:$Soc.web+'\u00A0\u00A0\u00A0 Email: '+$Soc.mail},dle);
				var drig=$1.t('div',{style:'float:left; width:48%;'},divb);
				$1.t('img',{src:$Soc.logo,style:'float:right; width:18.75rem;'},drig);
				$1.t('div',{'class':'clear'},divb);
		}
	}
	});
}
}
Gvt.Dlv.lines=function(){
	cont=$M.Ht.cont; var jsF='jsFields'; Pa=$M.read();
	var vPost='docEntry='+Pa.docEntry;
	$Api.get({f:Api.Gvt.b70+'dlv/lines',inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var ffL=$1.T.ffLine({ffLine:1, w:'ffxauto', t:'Número',v:Jr.docEntry},cont);
			$1.T.ffLine({w:'ffx2', t:'Cliente:',v:Jr.cardName},ffL);
			var tb=$1.T.table([{textNode:'Detalle',style:'width:2rem;'},{textNode:'Código',style:'width:4.5rem;'},'Descripción',{textNode:'Cant.',style:'width:2rem;'},'']);
			cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			Jr.L=$js.sortNum(Jr.L,{k:'detail'});
			var n=0;
			for(var i in Jr.L){ L=Jr.L[i]; var ln='L['+n+']'; n++;
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('input',{type:'text','class':jsF,name:ln+'[detail]',value:L.detail,style:'width:3rem;',O:{vPost:ln+'[id]='+L.id}},td);
				$1.t('td',{textNode:Itm.Txt.code(L)},tr);
				$1.t('td',{textNode:Itm.Txt.name(L)},tr);
				$1.t('td',{textNode:L.quantity*1},tr);
				var td=$1.t('td',0,tr);
				$1.T.ckLabel({t:'Eliminar',I:{'class':'jsFields',name:ln+'[delete]'}},td);
			}
			var resp=$1.t('div',0,cont);
			$Api.send({textNode:'Actualizar Lineas',PUT:Api.Gvt.b70+'dlv/lines',getInputs:function(){ return vPost+'&'+$1.G.inputs(tb); }, loade:resp, func:function(Jr2){
				$Api.resp(resp,Jr2);
			}},cont);
		}
	}});
}
Gvt.Dlv.invDefine=function(P){
	var cont=$1.t('div'); var jsF='jsFields';
	$Api.get({f:Api.Gvt.b70+'dlv/invDefine',inputs:'docEntry='+P.docEntry, loade:cont, func:function(Jr){
		var rte=(Jr.rteIva==null || Jr.rteIva==undefined)?15:Jr.rteIva*1;
	var divL=$1.T.divL({divLine:1,wxn:'wrapx4',req:'Y',L:'Forma de Pago',I:{tag:'select','class':jsF,name:'fdpId',opts:$Tb.gfiOfdp,selected:Jr.fdpId}},cont);
	$1.T.divL({wxn:'wrapx4',req:'Y',L:'Vencimiento',I:{tag:'input',type:'date','class':jsF,name:'dueDate',value:Jr.dueDate}},divL);
	$1.T.divL({wxn:'wrapx4',req:'Y',L:'Ciudad',I:{tag:'select','class':jsF,name:'cityCode',opts:$V_Mmag,selected:Jr.cityCode}},divL);
	$1.T.divL({wxn:'wrapx4',subText:'15% valor de IVA',req:'Y',L:'Rte. IVA',I:{tag:'input',type:'number',min:0,max:100,step:0.1,'class':jsF,name:'rteIva',value:rte}},divL);
	var resp=$1.t('div',0,cont);
	var fS={PUT:Api.Gvt.b70+'dlv/invDefine', getInputs:function(){ return 'docEntry='+P.docEntry+'&'+$1.G.inputs(cont,jsF); }, loade:resp, respDiv:resp, func:function(Jr2){ $Api.resp(resp,Jr2);
	}};
	$Api.send(fS,cont);
	}});
	$1.Win.open(cont,{winId:'gvtDlvInvDefine',winSize:'medium',winTitle:'Definir Parámetros Entrega #'+P.docEntry,onBody:1});
},

Gvt.Rdn={
OLi:[],
OLg:function(L){
	var Li=[]; var n=0;
	if(L.docStatus=='D'){
		Li[n]={k:'modify',ico:'fa fa_pencil',textNode:' Modificar', P:L, func:function(T){ $Doc.to('gvtRdn','.form',T.P); } }; n++;
	}
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.b70+'rdn/tb99',serieType:'opvt',docEntry:T.P.docEntry}); } }; n++;
	if(L.docStatus=='D'){
		Li[n]={k:'statusReceive',ico:'fa fa_bolt',textNode:' Recibir Devolución', P:L, func:function(T){
			var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Fecha Recibido',I:{tag:'input',type:'date','class':'jsFields',name:'dateGet'}});
			$1.T.divL({wxn:'wrapx2',subText:'Defina a que Bodega ingresa la devolución.',L:'Bodega',I:{tag:'select',sel:{'class':'jsFields',name:'whsId',O:{vPost:'docEntry='+T.P.docEntry}},opts:$V.whsCode}},divL);
			$1.Win.confirm({text:'El documento será marcado como recibido, se cargarán las cantidades en la Bodega y no se podrá modificar la información.', noClose:1, Inode:divL, apiSend:{PUT:Api.Gvt.b70+'rdn/statusReceive'}, func:function(Jr){}});
		}}; n++;
	}
	if(L.docStatus=='O'){
		Li[n]={k:'clasificar',ico:'fa fa-list',textNode:' Clasificar Devolución', P:L, func:function(T){ $Doc.to('gvtRdn','.form2',T.P); } }; n++;
	}
	if(L.docStatus!='N'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.b70+'rdn/statusCancel',text:'Se va anular el documento.'}); } }; n++;
	}
	if(L.docStatus=='O'){
		Li[n]={k:'statusC',ico:'fa fa-lock',textNode:' Cerrar Documento', P:L, func:function(T){ $Doc.close({docEntry:T.P.docEntry,api:Api.Gvt.b70+'rdn/statusClose',text:'Se va cerrar el documento.'}); } }; n++;
	}
	return $Opts.add('gvtRdn',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Rdn.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'rdn', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','N°.','Estado','Fecha Doc.','Bodega','Cliente','Resp. Ventas','Realizado']); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var Li=[];
					Gvt.Rdn.opts({L:L},td);
				var td=$1.t('td',0,tr);
				$1.t('a',{href:$M.to('gvtRdn.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:' '+L.docEntry},td);
				$1.t('td',{textNode:_g(L.docStatus,$V.docStatus),style:ColMt._g(L.docStatus,'gvtRdnStatus')},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
			}
		}
	}});
},
form:function(P){ P=(P)?P:{};
	var cont=$M.Ht.cont; Pa=$M.read(); var n=1;
	var jsF='jsFields'; var n=1;
	$Api.get({f:Api.Gvt.b70+'rdn/form', loadVerif:!Pa.docEntry, inputs:'docEntry='+Pa.docEntry, func:function(Jr){
	if(Jr.errNo){ $Api.resp(cont,Jr); }
	var tb=$1.T.table([{textNode:'#',style:'width:2.5rem;'},'Código','Descripción',{textNode:'Cant.',style:'width:6rem;'},{textNode:'Motivo',style:'width:8rem;'}]);
	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});
	cont.appendChild(fie);
	var tBody=$1.t('tbody',0,tb);
	Drw.itemReader({cont:fie,tBody:tBody, noSelBy:'iss',fields:'I.itemId&wh[I.sellItem]=Y'},{func:function(tBody,P){
		Drw.docLineItemSz(tBody,{jsF:jsF,JrS:P.JrS, n:n,noFields:{price:'N',priceList:'N'}, func:function(P,tBody){ trA(P); } });
	}});
	$Doc.formSerie({cont:cont, serieType:'gvtRdn',jsF:jsF, middleCont:fie, docEntry:Pa.docEntry,
	PUT:Api.Gvt.b70+'rdn/form', func:function(Jr2){
		$Doc.to('gvtRdn','.view',Jr);
	},
	Li:[
	{fType:'date',req:'Y',name:'docDate',value:Jr.docDate},
	{fType:'crd',wxn:'wrapx3',L:'Socio de Negocios',req:'Y',cardId:Jr.cardId,cardName:Jr.cardName, replaceData:'Y',inputs:'fields=A.slpId'},
	{wxn:'wrapx8',L:'Resp. de Ventas',req:'Y',I:{tag:'select',sel:{'class':jsF+' '+$Sea.clsName,name:'slpId',k:'slpId'},opts:$Tb.oslp,selected:Jr.slpId}},
	{fType:'user'},
	{divLine:1,wxn:'wrapx2',req:'Y',L:'Acción Propuesta',I:{tag:'textarea','class':jsF,name:'doAction',placeholder:'Dar garantia por mal despacho...',textNode:Jr.doAction}},
	{wxn:'wrapx2',L:'Detalles',I:{tag:'textarea','class':jsF,name:'lineMemo',textNode:Jr.lineMemo,disabled:'disabled'}}
	]
	});

	if(Jr.L){
		$js.sortNum(Jr.L,{k:'lineNum'});
		for(var i in Jr.L){ n=Jr.L[i].lineNum; trA(Jr.L[i],n); }
	}
	function trA(Pr){
		var P2=(Pr.JrS)?Pr.JrS:Pr;
		var Ta=(Pr.Ds)?Pr.Ds.T:{};
		if(P2.itemSzId){ Ta[P2.itemSzId]=P2.quantity; }
		for(var ta in Ta){
			var ln='L['+n+']';
			var tr=$1.t('tr',0,tBody);
			var td0=$1.t('td',{textNode:n,'data-vPost':'Y'},tr); n++;
			td0.vPost=(P2.id)?ln+'[id]='+P2.id+'&':'';
			td0.vPost +=ln+'[itemId]='+P2.itemId+'&'+ln+'[itemSzId]='+ta;
			$1.t('td',{textNode:Itm.Txt.code(P2)},tr);
			$1.t('td',{textNode:Itm.Txt.name(P2)},tr);
			var qua=(Ta[ta])?Ta[ta]:1;
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'number',inputmode:'numeric',value:qua,'class':jsF,name:ln+'[quantity]',style:'width:5rem;'},td);
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'text',value:((P2.reason)?P2.reason:''),'class':jsF,name:ln+'[reason]',style:'width:10rem;'},td);
		}
	}
	}});
},
view:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont; $1.clear(contPa);
	var divTop=$1.t('div',{style:'marginBottom:0.5rem;'},contPa);
	$Api.get({f:Api.Gvt.b70+'rdn/view', inputs:'docEntry='+Pa.docEntry,loade:contPa, func:function(Jr){
		if(Jr.errNo){ return $Api.resp(contPa,Jr);}
		var cont=$1.t('div',0,contPa);
		$Doc.btnsTop('print,logs,modify,statusReceive,clasificar,statusC,statusN,',{icons:'Y',Li:Gvt.Rdn.OLg(Jr),contPrint:cont},contPa);
		sHt.gvtRdnHead(Jr,cont);
		var tb=$1.T.table([{textNode:'#',style:'width:3rem;'},{textNode:'Código',style:'width:6rem;'},'Descripción',{textNode:'Cant.',style:'width:6rem;'},{textNode:'Motivo',style:'width:8rem;'},{textNode:'Ref. 1'},{textNode:'Clasificación',style:'width:6rem;'},{textNode:'Garantía'},{textNode:'N°. Guia',style:'width:4rem;'},{textNode:'Despachado',style:'width:4rem;'}]);
		$1.t('p',0,cont);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Pedido'}}); cont.appendChild(fie);
		tb.classList.add('table_x100');
		var tBody=$1.t('tbody',0,tb);
		if(Jr.L.errNo){
			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));
		}else{
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.lineNum},tr);
			$1.t('td',{textNode:Itm.Txt.code(L)},tr);
			$1.t('td',{textNode:Itm.Txt.name(L)},tr);
			$1.t('td',{textNode:L.quantity*1},tr);
			$1.t('td',{textNode:L.reason},tr);
			$1.t('td',{textNode:L.ref1},tr);
			$1.t('td',{textNode:_g(L.ref2,$V.gvtRdnClasif)},tr);
			$1.t('td',{textNode:_g(L.ref3,$V.gvtRdnWarranty)},tr);
			$1.t('td',{textNode:L.delivRef},tr);
			$1.t('td',{textNode:L.delivDate},tr);
		}
		}
		$Str.useCurr=false;
		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);
	}});
},
form2:function(P){ P=(P)?P:{};
	var cont=$M.Ht.cont; Pa=$M.read();
	var jsF='jsFields'; var n=1;
	$Api.get({f:Api.Gvt.b70+'rdn/form2', loadVerif:!Pa.docEntry, inputs:'docEntry='+Pa.docEntry, func:function(Jr){
	if(Jr.errNo){ $Api.resp(cont,Jr); }
	var tb=$1.T.table([{textNode:'#',style:'width:2.5rem;'},'Código','Descripción',{textNode:'UdM',style:'width:3rem;'},{textNode:'Cant.',style:'width:6rem;'},{textNode:'Motivo',style:'width:8rem;'},{textNode:'Clasificación',style:'width:4rem;'},{textNode:'Garantia',style:'width:4rem;'},{textNode:'Ref. 1',style:'width:4rem;'},{textNode:'Ref. 2 (Desp.)',style:'width:4rem;'},{textNode:'Fecha. Desp.',style:'width:4rem;'}]);
	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});
	cont.appendChild(fie);
	var tBody=$1.t('tbody',0,tb);

	$Doc.formSerie({cont:cont, serieType:'gvtRdn',jsF:jsF, middleCont:fie, docEntry:Pa.docEntry,
	PUT:Api.Gvt.b70+'rdn/form2', func:function(Jr2){
	},
	Li:[
	{wxn:'wrapx10',L:'Fecha',I:{tag:'input',type:'text',value:Jr.docDate,disabled:'disabled'}},
	{wxn:'wrapx4',L:'Socio Negocios',I:{tag:'input',type:'text',value:Jr.cardName,disabled:'disabled'}},
	{wxn:'wrapx6',L:{textNode:'Empleado Ventas'},I:{tag:'input',type:'text',value:_g(Jr.slpId,$Tb.oslp),disabled:'disabled'}},
	{divLine:1,wxn:'wrapx2',L:'Acción Propuesta',I:{tag:'textarea',disabled:'disabled',placeholder:'Dar garantia por mal despacho...',textNode:Jr.doAction}},
	{wxn:'wrapx2',L:'Detalles',I:{tag:'textarea',textNode:Jr.lineMemo,name:'lineMemo','class':jsF}}
	]
	});
	var n=1;
	if(Jr.L){
		$js.sortNum(Jr.L,{k:'lineNum'});
		for(var i in Jr.L){ n=Jr.L[i].lineNum; trA(Jr.L[i]); }
	}
	function trA(Pr){
		var P2=(Pr.JrS)?Pr.JrS:Pr;
		var ln='L['+n+']';
		var Ta=(Pr.Ds)?Pr.Ds.T:{};
		if(P2.itemSzId){ Ta[P2.itemSzId]=P2.quantity; }
		for(var ta in Ta){
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:n},tr); n++;
			$1.t('td',{textNode:Itm.Txt.code(P2)},tr);
			$1.t('td',{textNode:Itm.Txt.name(P2)},tr);
			$1.t('td',{textNode:_g(P2.udm,Udm.O)},tr);
			var td=$1.t('td',{textNode:P2.quantity},tr);
			var vPost =ln+'[itemId]='+P2.itemId+'&'+ln+'[itemSzId]='+ta;
			var td=$1.t('td',{textNode:P2.reason},tr);
			var td=$1.t('td',0,tr);
			td.appendChild($1.T.sel({sel:{'class':jsF,name:ln+'[ref2]'},opts:$V.gvtRdnClasif,selected:P2.ref2}));
			var td=$1.t('td',0,tr);
			td.appendChild($1.T.sel({sel:{'class':jsF,name:ln+'[ref3]'},opts:$V.gvtRdnWarranty,selected:P2.ref3}));
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'text','class':jsF,name:ln+'[ref1]',value:P2.ref1,style:'width:8rem;'},td);
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'text','class':jsF,name:ln+'[delivRef]',value:P2.delivRef,style:'width:8rem;'},td);
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'date','class':jsF,name:ln+'[delivDate]',value:P2.delivDate,style:'width:8rem;'},td);
		}
	}
	}});
},
}
Gvt.Rdn.Rep={
status:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'rdn/rep/status', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var Tds=['#','Estado','Fecha','Socio de Negocios','Fecha Recibido','Bodega','Código','Descripción','Talla','Cant','Motivo','Ref. 1','Clasificación','Garantía','N° Guia','Despachado',{textNode:'Días',title:'Dias transcurridos entre la fecha del documento y la fecha de despacho'}];
			var tb=$1.T.table(Tds);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ var L=Jr.L[i];
				var tr1=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.docEntry},tr1);
				$1.t('td',{textNode:_g(L.docStatus,$V.docStatus)},tr1);
				$1.t('td',{textNode:L.docDate},tr1);
				$1.t('td',{textNode:L.cardName},tr1);
				$1.t('td',{textNode:L.dateGet},tr1);
				$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr1);
				$1.t('td',{textNode:Itm.Txt.code(L)},tr1);
				$1.t('td',{textNode:Itm.Txt.name(L)},tr1);
				$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr1);
				$1.t('td',{textNode:(L.quantity*1)},tr1);
				$1.t('td',{textNode:L.reason},tr1);
				$1.t('td',{textNode:L.ref1},tr1);
				$1.t('td',{textNode:_g(L.ref2,$V.gvtRdnClasif)},tr1);
				$1.t('td',{textNode:_g(L.ref3,$V.gvtRdnWarranty)},tr1);
				$1.t('td',{textNode:L.delivRef},tr1);
				$1.t('td',{textNode:L.delivDate},tr1);
				var daysToDeliv=($2d.is0(L.delivDate))?'Pendiente':L.daysToDeliv;
				$1.t('td',{textNode:daysToDeliv},tr1);
			}
			tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Reporte Devoluciones',print:1});
			cont.appendChild(tb);
		}
	}});
},
}


/* newF */
Gvt.Por={
OLg:function(L){
	var Li=[];
	Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtPor','v',T.P,1); } });
	Li.push({k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.b70+'por/tb99',serieType:'gvtPor',docEntry:T.P.docEntry}); } });
	if(L.docStatus=='O'){
		Li.push({k:'statusC',ico:'fa fa_prio_medium',textNode:' Cerrar Documento', P:L, func:function(T){ $Doc.statusDefine({reqMemo:'N',docEntry:T.P.docEntry,api:Api.Gvt.b70+'por/statusClose',text:'Se va cerrar el documento. las cantidades pendientes de recibir disminuiran lo ordenado.'}); } });
	}
	if(L.canceled=='N'){
		Li.push({k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Gvt.b70+'por/statusCancel',text:'Se va anular el documento.'}); } });
	}
	if(L.docStatus=='O'){
		Li.push({k:'genPdn',ico:'fa fa-file-o',textNode:' Generar Doc. Entrada', P:L, func:function(T){ $Doc.go('gvtPor','genPdn',T.P,1); }});
	}
	return $Opts.add('gvt.por',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Por.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.b70+'por',inputs:$1.G.filter(),
	fOpts:Gvt.Por.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtPor',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Fecha',k:'docDate'},
		{H:'Fecha Entrega',k:'dueDate'},
		{H:'Proveedor',k:'cardName'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Ordenes de Compra'}
	},cont);
},
form:function(){
	var P=$M.T.d(0,{D:{}});
	var D=P.D;
	var cont=$M.Ht.cont;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	if(!D.docDate){ D.docDate=$2d.today; }
	$Doc.form({tbSerie:'gvtPor',calcDue:'Y',cont:cont,POST:Api.Gvt.b70+'por',func:P.func,
	tbH:{kTb:'gvtHf',
		L:[
	{k:'crd',I:{value:crdVal,topPare:cont,D:D}},
	{k:'fdpId',I:{AiJs:[],AJs:AJs,selected:D.fdpId}},
	{k:'cdcId',I:{selected:D.cdcId}},
	{k:'docDate',I:{value:D.docDate}},
	{k:'pymId',I:{selected:D.pymId}},
	{k:'dueDate',I:{alue:D.dueDate}},
	{k:'lineMemo',I:{textNode:D.lineMemo}}
	]},
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'buy',rteIva:'Y',rteIca:'Y',
	kTb:'gvtItmL',AJs:[{k:'buyFactor',a:'numFactor'}],
	kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,whsId,lineText'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.b70+'por/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		var tP={tbSerie:'gvtPor',D:Jr,
			btnsTop:{ks:'print,edit,statusN,genPdn,logs,',icons:'Y',Li:Gvt.Por.OLg},
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:7,ln:1},
				,{t:'Estado',k:'docStatus',_V:'docStatus'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{t:'Fecha Entrega',k:'dueDate'},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',ln:4},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.name},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Bodega',k:'whsId',_V:'whsCode'},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Imp.',k:'vatId',_gTb:'otaxI'},
				{t:'Rte.',k:'rteId',_gTb:'otaxR'},
				{t:'Total',k:'priceLine',format:'$'},
				{t:'Factor',k:'numFactor',format:'number'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			footTrs:{cs:6},
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
},
genPdn:function(){
	var cont=$M.Ht.cont; var Pa=$M.read();
	var jsF=$Api.JS.cls; var api=Api.Gvt.b70+'por/genPdn';
	$Api.get({f:api,inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var AJs={cardId:Jr.cardId,cardName:Jr.cardName,ott:'gvtPor',otr:Pa.docEntry};
		$Doc.form({tbSerie:'gvtPdn', cont:cont, jsF:jsF,POST:api,
		tbH:{kTb:'gvtHf',
		L:[
		{k:'crdTxt',I:{value:Jr.cardName,AJs:AJs}},
		{k:'docDate',I:{value:$2d.today}},
		{k:'cdcId',I:{value:Jr.cdcId}},
		{k:'lineMemo'}
		]},
		tbL:{xNum:'Y',xDel:'x',docTotal:'Y',L:Jr.L,rteIva:'N',rteIca:'N',
		AJs:['numFactor',{k:'id',a:'lineTr'},'openQty'],
		kTb:'gvtItmL',
		kFie:'itemCode,itemName,price,openQty,quantity,udm,priceLine,whsId,lineText'
		}
		});
	}});
},
}
Gvt.Pdn={
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtPdn','v',T.P,1); } }; n++;
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.b70+'pdn/tb99',serieType:'gvtPdn',docEntry:T.P.docEntry}); } }; n++;
	if(L.docStatus!='N'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.b70+'pdn/statusCancel',text:'Se va anular el documento. Las cantidades ingresadas en inventario serán reversadas.'}); } }; n++;
	}
return $Opts.add('gvtPdn',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Pdn.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.b70+'pdn',inputs:$1.G.filter(),
	fOpts:Gvt.Pdn.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtPdn',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Fecha',k:'docDate'},
		{H:'Proveedor',k:'cardName'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Entradas de Mercancia'}
	},cont);
},
form:function(){
	var P=$M.T.d(0,{D:{}});
	var D=P.D;
	var cont=$M.Ht.cont;
	var jsF=$Api.JS.cls;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	if(!D.docDate){ D.docDate=$2d.today; }
	$Doc.form({ tbSerie:'gvtPdn',cont:cont,jsF:jsF,POST:Api.Gvt.b70+'pdn',func:P.func,
	tbH:{kTb:'gvtHf',
		L:[
	{k:'crd',I:{value:crdVal,topPare:cont,D:D}},
	{k:'fdpId',I:{AiJs:[],AJs:AJs,selected:D.fdpId}},
	{k:'cdcId',I:{selected:D.cdcId}},
	{k:'docDate',I:{value:D.docDate}},
	{k:'ref1',I:{value:D.ref1}},
	{k:'ref2',I:{value:D.ref2}},
	{k:'lineMemo',I:{textNode:D.lineMemo}}
	]},
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'buyIvt',rteIva:'Y',rteIca:'Y',
	kTb:'gvtItmL',AJs:[{k:'buyFactor',a:'numFactor'}],
	kFie:'itemCode,itemName,price,quantity,udm,priceLine,whsId,lineText'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.b70+'pdn/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		var tP={tbSerie:'gvtPdn',D:Jr,
			btnsTop:{ks:'print,logs,statusN,viewDac,',icons:'Y',Li:Gvt.Pdn.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
				,{t:'Estado',k:'docStatus',_V:'docStatus'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},{t:'',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',ln:4},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.name},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Imp.',k:'vatId',_gTb:'otaxI'},
				{t:'Rte.',k:'rteId',_gTb:'otaxR'},
				{t:'Total',k:'priceLine',format:'$'},
				{t:'Bodega',k:'whsId',_V:'whsCode'},
				{t:'Factor',k:'numFactor',format:'number'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			footTrs:{cs:6},
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
},
}
/* end newF */

/*Sysd app actualizado hasta 31ene2019*/
$M.liAdd('gvtInv',[
{_lineText:'Catalogos'},
{k:'sysd.mcnf.gvt',t:'Definición Módulo Ventas', kau:'sysd.supersu', func:function(){
	$M.Ht.ini({g:function(){
		$Sysd.Mcnf.get({mdl:'gvt',
		Li:[
		{h1:'Orden de Ventas'},
		{k:'gvtOvtReqOCAttach',v:'Obligatorio subir Archivo Orden de compra de cliente',tag:'select',opts:{N:'No',Y:'Si'}},
		{h1:'Entrega de Ventas'},
		{k:'gvtDlvWhsSep',v:'Usar Bodega Separado en Despacho',tag:'select',opts:{N:'No',Y:'Si'}}
		]
		});
	}
	});
}}
]);

$M.li['sysd.gvtSell']={t:'Parametros de Venta',kau:'sysd.suadmin', func:function(){ $M.Ht.ini({gyp:function(){
	$Sysd.a0crd2.get({mdlk:'gvt',gr:'gvtSell'});
}}); }};

Gvt.Dlv.labelPacking=function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.b70+'dlv/labelFile', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['pvt_docEntry','cardName','boxText','refsLine']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.pvt_docEntry},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:L.boxText},tr);
				$1.t('td',{textNode:(L.refsLine+'').replace(/\,(\s+)?$/,'')},tr);
			}
			tb=$1.T.tbExport(tb,{fileName:'labelFile',ext:'txt'});
			cont.appendChild(tb);
		}
	}});
}


sHt.sellOrdHead=function(Jr,cont){
	var td=$1.t('div');
	$1.t('div',{textNode:$Soc.address},td);
	$1.t('div',{textNode:'PBX: '+$Soc.pbx},td);
	$1.t('div',{textNode:$Soc.mail},td);
	$1.t('div',{textNode:$Soc.web},td);
	var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo});
	if($jSoc.gvtPvt_templateHead){ Jr.td=td; Jr.logo=logo;
		Ls=$jSoc_iniv('gvtPvt_templateHead',Jr);
	}
	else{
	var Ls=[
	{v:'Estado: '+_g(Jr.docStatus,$V.gvtPvtStatus)},{v:'Pedido de Venta',vSty:'text-align:center; font-weight:bold;',ln:1,cs:7},
	{t:'Número',v:Jr.docEntry},
		{v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:4,rs:3},
		{v:logo,vSty:'width:20rem;text-align:right;',ln:1,cs:2,rs:3},
	{t:'Fecha Pedido',v:Jr.docDate,vSty:'width:7rem;'},
	{t:'Fecha Entrega',v:Jr.dueDate},
	{t:Jr.licTradType, v:Jr.licTradNum},{t:'Cliente',v:Jr.cardName,ln:1,cs:6},
	{t:'Orden Compra',v:Jr.ref1},{t:'Vendedor',v:_g(Jr.slpId,$Tb.oslp),ln:1,cs:4},{v:'Tipo: '+$V.ordTypePE[Jr.docType],ln:1},
	{t:'Dirección Envio',v:Addr.draw(Jr),cs:6},
	//{t:'Dirección Facturación',v:Jr.addrInv,ln:1,cs:3},
		{t:'Contacto',v:Jr.phone1},{t:'Día Cierre',v:Jr.invDayClose,cs:5}
	];
	}
	if($jSoc.gvtPvt_pymntGr=='Y'){
		Ls.push({t:'Condiciones Pago',v:_g(Jr.pymntGr,$Tb.gfiOpym),cs:7});
	}
	Ls.push({t:'Notas',v:Jr.lineMemo,cs:7,vSty:''});
	var tb=$1.Tb.trCols(Ls,{cols:8,styT:'width:7rem; font-weight:bold;'},cont);
}
sHt.sellDlvHead=function(Jr,cont){
	var td=$1.t('div');
	$1.t('div',{textNode:$Soc.address},td);
	$1.t('div',{textNode:'PBX: '+$Soc.pbx},td);
	$1.t('div',{textNode:$Soc.mail},td);
	$1.t('div',{textNode:$Soc.web},td);
	var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo},td);
	var Ls=[
	{v:'Estado: '+_g(Jr.docStatus,$V.dStatus)},{v:'Remisión de Mercancía',vSty:'text-align:center; font-weight:bold;',ln:1,cs:7},
	{t:'Número',v:Jr.docEntry,vSty:'width:7rem;'},
		{v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:4,rs:3},
		{v:logo,vSty:'width:20rem;text-align:right;',ln:1,cs:2,rs:3},
	{t:'Fecha Documento',v:Jr.docDate},
	{t:'Pedido',v:((Jr.tr)?Jr.tr:'N/A')},
	{t:Jr.licTradType, v:Jr.licTradNum},{t:'Cliente',v:Jr.cardName,ln:1,cs:6},
	{t:'Bodega',v:_g(Jr.whsId,$V.whsCode),cs:2},{t:'Vendedor',v:_g(Jr.slpId,$Tb.oslp),ln:1,cs:4},
	{t:'Dirección Envio',v:Addr.draw({address:Jr.addrMerch,cityCode:Jr.cityCode,countyCode:Jr.countyCode}),cs:7},
	//{t:'Dirección Facturación',v:Jr.addrInv,ln:1,cs:3},
	{t:'Observación de Pedido',v:Jr.lineMemoOrd,cs:7},
	{t:'Observación',v:Jr.lineMemo,cs:7}
	];
	if($jSoc.gvtDlv_showRefs=='Y'){
		Ls.push({t:'No. Guia',v:Jr.delivRef1,cs:2});
		Ls.push({t:'No. Referencia',v:Jr.delivRef2,cs:2,ln:1});
		Ls.push({v:'O.C: '+Jr.ref1,cs:2,ln:1});
	}
	$1.Tb.trCols(Ls,{cols:8,styT:'width:7rem; font-weight:bold;'},cont);
}
sHt.sellDlvFormHead=function(Jr,cont){
	var Ls=[
	{v:'Estado: '+_g(Jr.docStatus,$V.dStatus)},{v:'Remisión de Mercancía',ln:1,cs:7,vSty:'font-weight:bold; text-align:center;'},
	{t:'Número',v:Jr.docEntry},{t:'Fecha Documento',v:Jr.docDate,ln:1},{t:'Bodega',v:_g(Jr.whsId,$V.whsCode),ln:1},{t:'Cliente',v:Jr.cardName,ln:1},
	{t:'Ref.',v:((Jr.tr)?Jr.tr:'N/A')},{t:'Desc.',v:Jr.discPf+'%',ln:1},{t:Jr.licTradType, v:Jr.licTradNum,ln:1},{t:'Vendedor',v:_g(Jr.slpId,$Tb.oslp),ln:1,cs:1}
	];
	$1.Tb.trCols(Ls,{cols:8,styT:'width:7rem; font-weight:bold;'},cont);
}
sHt.gvtRdnHead=function(Jr,cont){
	var td=$1.t('div');
	$1.t('div',{textNode:$Soc.address},td);
	$1.t('div',{textNode:'PBX: '+$Soc.pbx},td);
	$1.t('div',{textNode:$Soc.mail},td);
	$1.t('div',{textNode:$Soc.web},td);
	var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo});
	var Ls=[
	{v:'Estado: '+$V.rdnStatus[Jr.docStatus]},{v:'Devolución de Venta',vSty:'text-align:center; font-weight:bold;',ln:1,cs:7},
	{t:'Número',v:Jr.docEntry},
		{v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:5,rs:3},
		{v:logo,vSty:'width:20rem;text-align:right;',ln:1,rs:3},
	{t:'Fecha Documento',v:Jr.docDate,vSty:'width:7rem;'},
	{t:'Fecha Recibido',v:Jr.dateGet},
	{t:'Bodega:',v:_g(Jr.whsId,$V.whsCode)},{t:'Cliente',v:Jr.cardName,cs:5,ln:1},
	{t:'Acción Propuesta',v:Jr.doAction,cs:3},
	{t:'Detalles',v:Jr.lineMemo,cs:3,ln:1},
	];
	var tb=$1.Tb.trCols(Ls,{cols:8,styT:'width:7rem; font-weight:bold;'},cont);
}
sHt.ivtCphHead=function(Jr,cont){
	var td=$1.t('div');
	$1.t('div',{textNode:$Soc.address},td);
	$1.t('div',{textNode:'PBX: '+$Soc.pbx},td);
	$1.t('div',{textNode:$Soc.mail},td);
	$1.t('div',{textNode:$Soc.web},td);
	var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo});
	var Ls=[
	{v:'Estado: '+_g(Jr.docStatus,$V.dStatus)},{v:'Cambio Producto Similares',vSty:'text-align:center; font-weight:bold;',ln:1,cs:7},
	{t:'Número',v:Jr.docEntry},
		{v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:5,rs:3},
		{v:logo,vSty:'width:20rem;text-align:right;',ln:1,rs:3},
	{t:'Fecha Documento',v:Jr.docDate,vSty:'width:7rem;'},
	{t:'Bodega',v:_g(Jr.whsId,$V.whsCode)},
	{t:'Notas',v:Jr.lineMemo,cs:7}
	];
	var tb=$1.Tb.trCols(Ls,{cols:8,styT:'width:7rem; font-weight:bold;'},cont);
}

$Doc.TBs['gvtPvt.info']=[
{k:'userName',t:'Creado Por'},
{k:'dateC',t:'Fecha Creación'},
{k:'slpId',t:'Responsable de Ventas', type:'object', O:'$Tb.oslp'},
{k:'docStatus',t:'Estado de Documento',type:'object',O:'$V.gvtPvtStatus'},
{k:'docDate',t:'Fecha Documento'},
{k:'cardName',t:'Nombre del Cliente'},
{k:'dueDate',t:'Fecha de Entrega o Vencimiento'},
{k:'addrMerch',t:'Dirección entrega Mercancía'},
{k:'addrInv',t:'Dirección Facturación'},
{k:'discDef',t:'Descuento Autorizado'},
{k:'discPf',t:'Descuento Pie Factura'},
{k:'discSum',t:'Sumatoria de Desc.',format:'money'},
{k:'discTotal',t:'Descuento Total'},
{k:'docTotalLine',t:'Total Lineas',format:'money'},
{k:'docTotal',t:'Total con descuento',format:'money'},
{k:'rate',t:'Tasa a la Fecha',format:'money'},
{k:'curr',t:'Moneda Documento'},
{k:'docTotalME',t:'Total ME',format:'mil'}
];

$Tpt.T['ocvtBase']=function(cont,P){
	var td=$1.t('div'); $1.t('b',{textNode:'Detalles'},td);
	$1.t('pre',{textNode:P.Jr.lineMemo,'class':'pre100'},td);;
		var td2=$1.t('div'); $1.t('b',{textNode:'Condiciones'},td2);
		$1.t('pre',{textNode:P.Jr.condicGen,'class':'pre100'},td2);
		var Ls=[
		{t:'Estado',v:$V.docStatus[P.Jr.docStatus]},{middleInfo:'Y'},{logoRight:'Y'},
		{tag:'docDate'},
		{t:'Validez',v:P.Jr.dueDate},
		{t:'Condic. Pago',v:P.Jr.payGrText},{tag:'cliente',cs:3,ln:1},{t:'Asesor',v:$Tb.oslp[P.Jr.slpId],ln:1}
		];

			var div=$1.t('pre');
			$1.t('b',{textNode:'Persona: '},div);
			$1.t('span',{textNode:P.Jr.prsCnt+'\t\t'},div);
			$1.t('b',{textNode:'Teléfono: '},div);
			$1.t('span',{textNode:P.Jr.phone+"\n"},div);
			$1.t('b',{textNode:'Correo: '},div);
			$1.t('span',{textNode:P.Jr.email+"\n"},div);
			$1.t('b',{textNode:'Dirección: '},div);
			$1.t('span',{textNode:P.Jr.address},div);
			Ls.push({v:div,cs:8});

		Ls.push({v:td,cs:4}); Ls.push({v:td2,cs:4,ln:1});
	$Tpt.draw(cont,{trPrp:{'class':tbCal._row},
		D:P.Jr,Trs:P.Trs,serieType:'ocvt',print:'Y',
		Ls:Ls,
		bottomCont:$1.t('div',{textNode:'Precios antes de IVA',style:'font-size:1rem; text-align:center;'}),
		fieldset:'Artículos Cotizados',
		Tb:['Imagen Ref.',{textNode:'Código',style:'width:3rem;'},{textNode:'Descripción'},{textNode:'Precio',style:'width:5rem;'},{textNode:'Cant.',style:'width:5rem;'},{textNode:'Total',style:'width:10rem;'},{textNode:'Detalles',style:'width:14rem;'}],
		Foot:[[{textNode:'Total',colspan:4},{'class':tbCal.tbQty},{textNode:$Str.money(P.Jr.docTotal)},{textNode:''}
		]],
		softFrom:'Y',
	});
}
$Tpt.T['gvtPdn']=function(cont,P){
	var Jr=(P.Jr)?P.Jr:{};
	var td=$1.t('div'); $1.t('b',{textNode:'Detalles'},td);
	$1.t('pre',{textNode:Jr.lineMemo,'class':'pre100'},td);
		var Ls=[
		{t:'Estado',v:$V.docStatus[Jr.docStatus]},{middleInfo:'Y'},{logoRight:'Y'},
		{tag:'docDate'},
		{t:' ',v:'.'},
		{t:Jr.licTradType, v:Jr.licTradNum},{t:'Cliente',v:Jr.cardName,ln:1,cs:6},
		];
		Ls.push({v:td,cs:8});
	$Tpt.draw(cont,{trPrp:{'class':tbCal._row},
		D:Jr,Trs:P.Trs,serieType:'gvtPdn',print:'Y',
		Ls:Ls,
		bottomCont:false,
		fieldset:'Lineas',
		Tb:[{textNode:'Código',style:'width:3rem;'},{textNode:'Descripción'},{textNode:'Bodega',style:'width:5rem;'},{textNode:'Precio',style:'width:5rem;'},{textNode:'Cant.',style:'width:5rem;'},{textNode:'Total',style:'width:10rem;'},{textNode:'Factor',style:'width:14rem;'}],
		Foot:[[
		{textNode:'Total',colspan:4},{'class':tbCal.tbQty},
		{textNode:$Str.money(Jr.docTotalLine)},''
		],
		[{colspan:3},{colspan:2,textNode:Jr.discTotal*1+"% Desc.\n"+$Str.money(P.Jr.discSum),'class':'pre'},{textNode:$Str.money(Jr.docTotal)},{textNode:''}]
		],
		softFrom:'Y',
	});
}
$Tpt.T['gvtPor']=function(cont,P){
	var Jr=(P.Jr)?P.Jr:{};
	var td=$1.t('div'); $1.t('b',{textNode:'Detalles'},td);
	$1.t('pre',{textNode:Jr.lineMemo,'class':'pre100'},td);
		var Ls=[
		{t:'Estado',v:$V.docStatus[Jr.docStatus]},{middleInfo:'Y'},{logoRight:'Y'},
		{tag:'docDate'},
		{t:' ',v:'.'},
		{t:Jr.licTradType, v:Jr.licTradNum},{t:'Proveedor',v:Jr.cardName,ln:1,cs:6},
		];
		Ls.push({v:td,cs:8});
	$Tpt.draw(cont,{trPrp:{'class':tbCal._row},
		D:Jr,Trs:P.Trs,serieType:'gvtPor',print:'Y',
		Ls:Ls,
		bottomCont:false,
		fieldset:'Lineas',
		Tb:[{textNode:'Código',style:'width:3rem;'},{textNode:'Descripción'},{textNode:'Bodega',style:'width:5rem;'},{textNode:'Precio',style:'width:5rem;'},{textNode:'Cant.',style:'width:5rem;'},{textNode:'Total',style:'width:10rem;'},{textNode:'Factor',style:'width:14rem;'}],
		Foot:[[
		{textNode:'Total',colspan:4},{'class':tbCal.tbQty},
		{textNode:$Str.money(Jr.docTotalLine)},''
		],
		[{colspan:3},{colspan:2,textNode:Jr.discTotal*1+"% Desc.\n"+$Str.money(P.Jr.discSum),'class':'pre'},{textNode:$Str.money(Jr.docTotal)},{textNode:''}]
		],
		softFrom:'Y',
	});
}


$M.liAdd('gvtFC70',[
{k:'gvtOcvt',t:'Cotización de Venta', kau:'gvtOcvt.basic', ini:{f:'gvtOcvt.get', btnGo:'gvtOcvt.form',gyp:Gvt.Ocvt.get }},
{k:'gvtOcvt.form',t:'Cotización de Venta (Formulario)', kau:'gvtOcvt.basic', func:function(){
	$M.Ht.ini({g:Gvt.Ocvt.form });
}},
{k:'gvtOcvt.view',noTitle:1, kau:'gvtOcvt.basic',ini:{g:Gvt.Ocvt.view }},
{k:'sellOrd.get',t:'Pedidos de Venta',kau:'sellOrd.basic',ini:{f:'gvtPvt.get', btnGo:'sellOrd.form', gyp:Gvt.Pvt.get} },
{k:'sellOrd.view',noTitle:true,kau:'sellOrd.basic', func:function(){ $M.Ht.ini({g:Gvt.Pvt.view}); }},
{k:'sellOrd.openQty',t:'Pendientes de Pedido', kau:'sellOrd.basic', func:function(){ $M.Ht.ini({g:Gvt.Pvt.openQty}); }},
{k:'sellOrd.form',t:'Pedido de Venta',kau:'sellOrd.basic', func:function(){ $M.Ht.ini({g:Gvt.Pvt.form}); }},
{k:'sellOrd.formLib',t:'Pedido de Venta (Libre)',kau:'sellOrd.formLib', func:function(){ $M.Ht.ini({g:Gvt.Pvt.formLib}); }},

{k:'gvtPvt.liq',t:'Liquidador de Orden de Venta',kau:'sellOrd.basic', func:function(){ $M.Ht.ini({g:Gvt.Pvt.Liq.view}); }},

{k:'sellOrd.p',t:'Pedidos Pendientes (Para Despacho)',kau:'sellDlv.basic', func:function(){ $M.Ht.ini({fieldset:'Y', f:'gvtPvt.opens',gyp:Gvt.Pvt.opens}); }},
{k:'sellDlv.get',t:'Despachos (Entrega)', kau:'sellDlv.basic', func:function(){ $M.Ht.ini({f:'sellDlv.get', gyp:Gvt.Dlv.get}); }},
{k:'sellDlv.view',noTitle:true, kau:'sellDlv.basic',func:function(){ $M.Ht.ini({g:Gvt.Dlv.view}); }},
{k:'sellDlv.viewFirma',noTitle:true, kau:'sellDlv.basic',func:function(){ $M.Ht.ini({g:Gvt.Dlv.viewFirma}); }},
{k:'sellDlv.packing',noTitle:true, kau:'sellDlv.basic', func:function(){ $M.Ht.ini({g:Gvt.Dlv.packing}); }},
{k:'sellDlv.lines',t:'Modificar Captura de despacho',kau:'sellDlv.write', func:function(){ $M.Ht.ini({g:Gvt.Dlv.lines}); }},
{k:'sellDlv.packingRol',noTitle:true, kau:'sellDlv.basic', func:function(){ $M.Ht.ini({g:Gvt.Dlv.packingRol}); }},

{k:'sellDlv.form',t:'Despacho de Pedido', kau:'sellDlv.write', func:function(){ $M.Ht.ini({g:Gvt.Dlv.form}); }},
{k:'sellDlv.digit',t:'Despacho de Pedido', kau:'sellDlv.write', func:function(){ $M.Ht.ini({g:Gvt.Dlv.digit}); }},
{k:'sellDlv.labelPacking',t:'Etiquetas Packing (Despachos)',kau:'sellDlv.basic',func:function(){
	$M.Ht.ini({f:'sellDlv.labelPacking'});
}},

{k:'gvtRdn.get',t:'Devoluciones de Venta', kau:'gvtRdn', func:function(){ $M.Ht.ini({f:'gvtRdn', btnGo:'gvtRdn.form', gyp:Gvt.Rdn.get}); }},
{k:'gvtRdn.form',t:'Devoluciones', kau:'gvtRdn', func:function(){ $M.Ht.ini({g:Gvt.Rdn.form}); }},
{k:'gvtRdn.form2',t:'Clasificar Devolución', kau:'gvtRdn.form2', func:function(){ $M.Ht.ini({g:Gvt.Rdn.form2}); }},
{k:'gvtRdn.view',noTitle:true, kau:'gvtRdn', func:function(){ $M.Ht.ini({g:Gvt.Rdn.view}); }}
]);

$M.liRep('gvtFC70',[
{k:'gvtPvt.repOpenQty',t:'Pedidos Pendientes',kau:'gvtPvt.repOpenQty', func:function(){ $M.Ht.ini({fieldset:'Y', f:'gvtPvt.repOpenQty'}); }},
{k:'gvtPvt.repItemCanceled',t:'Revisión de Pedidos Anulados Artículo', kau:'gvtPvt.repItemCanceled', func:function(){ $M.Ht.ini({fieldset:'Y', f:'gvtPvt.repItemCanceled', gyp:Gvt.Rdn.Rep.itemCanceled}); }},
{k:'gvtPvt.repStockPeP',t:'Pedidos-Stock-Proceso',kau:'gvtPvt.repOpenQty', func:function(){ $M.Ht.ini({fieldset:'Y', f:'gvtPvt.repStockPeP'}); }},

{k:'gvtRdn.repStatus',t:'Estado de Devoluciones', kau:'gvtRdn.repStatus', func:function(){ $M.Ht.ini({fieldset:'Y', f:'gvtRdn.repStatus', g:Gvt.Rdn.Rep.status}); }},
],{repM:['gvtFC70']});

$M.li['itfDT.c70.pvtCreate']={t:'Orden de Venta - Masivo', kau:'sysd.supersu', func:function(){
	$M.Ht.ini({g:function(){
		Itf.DT.form({text:'Orden de Venta - Masivo',api:Api.Gvt.b70+'dtransfer/gvt.pvtCreate',helpFie:'Y',limitLen:1500,fileName:'masivo-ventas',
		ihtml:'Puede utilizar <a target="_BLANK" href="https://docs.google.com/spreadsheets/d/1hkzEE2sAovabZ2-t2NsDWgC7XgSa-zBduIQHowIDasg/edit#gid=0">La Plantilla de google drive</a>',
		Li:[
			{t:'docEntry',d:'Numero de Pedido',req:'Y'},
			{t:'slpId',d:'Id de Vendedor',req:'Y',opts:$Tb.oslp,optsTb:1},
			{t:'docType',d:'Tipo documento. A=Primeras, B=segundas',req:'Y'},
			{t:'ref1',d:'Orden de Compra'},
			{t:'whsId',d:'Id de bodega',req:'Y',opts:$Tb.itmOwhs,optsTb:1},
			{t:'cardId',d:'Codigo Cliente',req:'Y'},
			{t:'cardName',d:'Nombre del Cliente',req:'Y'},
			{t:'docDate',d:'Fecha Documento AAAA-mm-dd',req:'Y'},
			{t:'dueDate',d:'Fecha Entrega AAAA-mm-dd',req:'Y'},
			{t:'cityCode',d:'Codigo ciudad',req:'Y',opts:$V.AddrCity,optsTb:1},
			{t:'countyCode',d:'Codigo departamento',req:'Y',opts:$V.AddrCounty,optsTb:1},
			{t:'addrMerch',d:'Direccion',req:'Y'},
			{t:'discDef',d:'Descuento Autorizado para el cliente al montar el pedido.'},
			{t:'lineMemo',d:'Observación Pedido'},
			
			{t:'lineNum',d:'Numero de linea',req:'Y',xformat:'number'},
			{t:'itemId',d:'Código de articulo',req:'Y'},
			{t:'itemSzId',d:'Código Talla',req:'Y',opts:$V.grs1,optsTb:1,xformat:'number'},
			{t:'price',d:'Precio unitario (Valor visible en Documento)',req:'Y',xformat:'number'},
			{t:'quantity',d:'Cant. Solicitada en unidad de medida (Valor visible en Documento)',req:'Y',xformat:'number'},
			{t:'priceList',d:'Precio de Lista (Precio Base Unitario)',req:'Y',xformat:'number'},
		]
		});
	}
	});
}};