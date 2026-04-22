// package: unclicc.com.fe
Api.Gvt={b:'/a/gvt/',js:'/js/gvt/',pr:'/appi/private/gvt/'};

// modules
CNF.MDL.GVT_SELL = {id:'gvtSell', t: 'Ventas'}
CNF.MDL.GVT_SELL_PAYMENT = {id:'gvtSellPayment', t: 'Ventas - Pagos'}


// access group
CNF.AG.GVT_REP_GEN = {id: 'gvtRep', t: 'Reportes - Ventas'}
CNF.AG.GVT_SOP = {id: 'gvtSop', t: 'Cotización de Venta', mode: CNF.AG_MODE_RW}
CNF.AG.GVT_SOR = {id: 'gvtSor', t: 'Orden de Venta', mode: CNF.AG_MODE_RW}
CNF.AG.GVT_SDN = {id: 'gvtSdn', t: 'Entregas de Venta', mode: CNF.AG_MODE_RW}


CNF.AG.GVT_SNC = {id: 'gvtSnc', t: 'Nota Crédito Venta', mode: CNF.AG_MODE_RW}
CNF.AG.GVT_SND = {id: 'gvtSnd', t: 'Nota Débito Venta', mode: CNF.AG_MODE_RW}
CNF.AG.GVT_RCE = {id: 'gvtRce', t: 'Pagos Realizados', mode: CNF.AG_MODE_RW}

$M.registerAG([
	CNF.AG.GVT_SOP, CNF.AG.GVT_SOR, CNF.AG.GVT_SDN,
	CNF.AG.GVT_SNC, CNF.AG.GVT_SND,
	CNF.AG.GVT_RCE, CNF.AG.GVT_REP_GEN
]);

// urls
CNF.URL.GVT_SOP = {id: 'gvtSop', ac: CNF.AG.GVT_SOP, t: 'Cotización de Venta', type: 'list'}
CNF.URL.GVT_SOP_FORM = {id: 'gvtSop.form', ac: CNF.AG.GVT_SOP, t: 'Cotización de Venta', type: 'form'}
CNF.URL.GVT_SOP_VIEW = {id: 'gvtSop.view', ac: CNF.AG.GVT_SOP, t: 'Cotización de Venta', type: 'doc'}

CNF.URL.GVT_SOR = {id: 'gvtSor', ac: CNF.AG.GVT_SOR, t: 'Orden de Venta', type: 'list'}
CNF.URL.GVT_SOR_FORM = {id: 'gvtSor.form', ac: CNF.AG.GVT_SOR, t: 'Orden de Venta', type: 'form'}
CNF.URL.GVT_SOR_VIEW = {id: 'gvtSor.view', ac: CNF.AG.GVT_SOR, t: 'Orden de Venta', type: 'doc'}
CNF.URL.GVT_SOR_VIEW_OPEN = {id: 'gvtSor.openQty', ac: CNF.AG.GVT_SOR, hidden_title:'Orden de Venta - Doc. Pendientes',
	type: 'doc'}

CNF.URL.GVT_SDN = {id: 'gvtSdn', ac: CNF.AG.GVT_SDN, t: 'Entregas de Venta', type: 'list'}
CNF.URL.GVT_SDN_FORM = {id: 'gvtSdn.form', ac: CNF.AG.GVT_SDN, t: 'Entrega de Venta', type: 'form'}
CNF.URL.GVT_SDN_VIEW = {id: 'gvtSdn.view', ac: CNF.AG.GVT_SDN, t: 'Entrega de Venta', type: 'doc'}



CNF.URL.GVT_SNC = {id:'gvtSnc', ac:CNF.AG.GVT_SNC, t:'Nota Crédito Venta', type: 'list'}
CNF.URL.GVT_SNC_FORM = {id:'gvtSnc.form', ac:CNF.AG.GVT_SNC, t:'Nota Crédito Venta', type: 'form'}
CNF.URL.GVT_SNC_VIEW = {id:'gvtSnc.view', ac:CNF.AG.GVT_SNC, t:'Nota Crédito Venta', type: 'doc'}

CNF.URL.GVT_SND = {id:'gvtSnd', ac:CNF.AG.GVT_SND, t:'Nota Débito Venta', type: 'list'}
CNF.URL.GVT_SND_FORM = {id:'gvtSnd.form', ac:CNF.AG.GVT_SNC, t:'Nota Débito Venta', type: 'form'}
CNF.URL.GVT_SND_VIEW = {id:'gvtSnd.view', ac:CNF.AG.GVT_SNC, t:'Nota Débito Venta', type: 'doc'}

CNF.URL.GVT_RCV = {id: 'gvtRcv', ac: CNF.AG.GVT_RCE, t: 'Pagos Recibidos', type: 'list'}
CNF.URL.GVT_RCV_FORM = {id: 'gvtRcv.form', ac: CNF.AG.GVT_RCE, t: 'Pago Recibido', type: 'form'}
CNF.URL.GVT_RCV_VIEW = {id: 'gvtRcv.view', ac: CNF.AG.GVT_RCE, hidden_title: 'Pago Recibido', type: 'doc'}

CNF.URL.GVT_REP_RENTA = {id: 'gvtRep.renta', ac: CNF.AG.GVT_REP_GEN,  t: 'Rentabilidad Bruta'}
CNF.URL.GVT_REP_SIN = {id: 'gvtRep.sin', ac: CNF.AG.GVT_REP_GEN, t: 'Reporte Ventas'}
CNF.URL.GVT_REP_SOR = {id: 'gvtRep.sor', ac: CNF.AG.GVT_REP_GEN, t: 'Reporte Orden de venta'}
CNF.URL.GVT_REP_GEREN = {id: 'gvtRep.gerence', ac: CNF.AG.GVT_REP_GEN, t: 'Ventas, Ingreso y Gastos'}

$M.addEndpoint({url: '/appi/private/gvt', name: 'gvt base'})


$oB.push($V.docTT,[
	{k:'gvtSin', v:'Factura Ventas'},
	{k:'gvtSop',v:'Cotización Venta'},
	{k:'gvtSor',v:'Orden Venta'},
	{k:'gvtSdn',v:'Entrega Venta'},
	{k:'gvtSrd', v:'Devolución Venta'},
	{k:'gvtSnc',v:'Nota Crédito Venta'},
	{k:'gvtSnd',v:'Nota Débito Venta'},
	{k:'gvtRcv',v:'Pagos Recibidos'}
]);
$V.Mdls.gvtSell={t:'Ventas',ico:'fa fa-tags'};
$V.gvtDocs=[
{k:'FV',v:'Factura'},{k:'NC',v:'Nota Credito'},{k:'ND',v:'Nota Debito'},
{k:'gvtSin',v:'Factura'},{k:'gvtSnc',v:'Nota Credito'},{k:'gvtSnd',v:'Nota Debito'},
{k:'FC',v:'Factura Compra'},
{k:'gvtPin',v:'Factura'},{k:'gvtPnc',v:'Nota Credito'},{k:'gvtPnd',v:'Nota Debito'}
];

$V.docStatusSor=[{k:'S',v:'Pendiente'},{k:'O',v:'En Proceso'},{k:'C',v:'Cerrado'},{k:'N',v:'Anulado'}];
$V.gvt=[{k:'D',v:'Borrador'},{k:'S',v:'Enviado'},{k:'O',v:'Abierto'},{k:'C',v:'Cerrado'},{k:'N',v:'Anulado'}];
$V.gvtSorDlvStatus=[{k:'P',v:'Pendiente'},{k:'EP',v:'Entrega Parcial'},{k:'C',v:'Cerrado'}];
$V.gvtSorFinanceStatus=[{k:'P',v:'No revisado'},{k:'L',v:'Bloqueado'},{k:'O',v:'Autorizado'},{k:'R',v:'Revisión'},{k:'V',v:'Solicitar Detalles'}];

$V.gvtSncClass=[
	{k:1,k2:'DM',v:'Devolución de parte de los bienes'},
	{k:2,k2:'FE',v:'Anulación Factura Electrónica'},
	{k:3,k2:'DT',v:'Rebaja Total Aplicada'},
	{k:4,k2:'DA',v:'Descuento Aplicado'},
	{k:5,k2:'NU',v:'Rescisión: Nulidad por falta de requisitos'},
	{k:6,k2:'OT',v:'Otros'}
];

$V.tagFromDlv={};
if($Mdl.status('ivt')){
	$V.tagFromDlv={nL:1,I:{lTag:'ckLabel',t:'Basado en Entrega',I:{name:'fromDlv',_iHelp:'Si se selecciona, no se realizan movimientos en inventario.'}}};
}
$DocTb.kTbAssg('gvtItmL',{
itemCode:['Codigo',{tag:'txt',kf:'itemCode',k:'itemCode',funcText:Itm.Txt.Code}],
itemName:['Nombre',{tag:'txt',kf:'itemName',k:'itemName',funcText:Itm.Txt.name}],
price:['Precio',{tag:'number',kf:'price',k:'price',type:'text',min:0,style:'width:6rem'}],
quantity:[{textNode:'Cant.',style:'width:6rem;'},{tag:'input',kf:'quantity',k:'quantity',type:'number',inputmode:'numeric',min:0,style:'width:4rem'}],
openQty:[{textNode:'Pend.',style:'width:6rem;'},{tag:'span',kf:'openQty',k:'openQty',noCls:1,format:'number'}],
qty2Open:[{textNode:'Cant.',style:'width:6rem;'},{tag:'input',kf:'openQty',k:'openQty',inputmode:'numeric',min:0,style:'width:4rem'}],
udm:[{textNode:'Udm',_iHelp:'Unidad de Medida',style:'width:4rem;'},{tag:'span',kf:'udm',k:'udm',noCls:1}],
vatId:[{textNode:'Imp.',_iHelp:'Impuesto',style:'width:4rem'},{tag:'select',kf:'vatId',k:'vatId',opts:$Tb.otaxI}],
rteId:[{textNode:'Rte.',_iHelp:'Retención, si aplica',style:'width:4rem'},{tag:'select',kf:'rteId',k:'rteId',opts:$Tb.otaxR}],
priceLine:[{textNode:'Total',style:'width:6rem;'},{tag:'span',k:'priceLine'}],
whsId:[{textNode:'Almacen',style:'width:4rem'},{k:'whsId',tag:'select',kf:'whsId',opts:$Tb.itmOwhs}],
whsIdFrom:[{textNode:'Almacen Origen',style:'width:4rem'},{k:'whsIdFrom',tag:'select',kf:'whsIdFrom',opts:$Tb.itmOwhs}],
lineText:[{textNode:'Descripción'},{k:'lineText',kf:'lineText',tag:'input',type:'text',name:'lineText'}],
descPrc:[{textNode:'% Desc.'},{k:'discPrc',kf:'disc',tag:'number',style:'width:3rem'}],
descPrcCalc:[{textNode:'% Desc.'},{k:'discPrcCalc',kf:'disc',tag:'number',style:'width:3rem'}],
});

$DocTb.kTbAssg('gvtHf',{
	crdTxt:{lTag:'input',wxn:'wrapx3',L:'Cliente',I:{disabled:'disabled'}},
	crdWrite:{lTag:'input',wxn:'wrapx3',L:'Cliente',I:{name:'cardName'}},
	crd:{lTag:'crd',wxn:'wrapx3',L:'Cliente',I:{fie:'slpId,fdpId,pymId,rteIva,rteIca','class':$Api.Sea.clsBox}},
	fdpId:{lTag:'select',wxn:'wrapx8',L:'Forma pago',I:{name:'fdpId','class':$Api.Sea.clsBox,k:'fdpId',opts:$Tb.gfiOfdp}},
	fdpIdSell:{lTag:'select',wxn:'wrapx8',L:'Forma pago',I:{name:'fdpId','class':$Api.Sea.clsBox,k:'fdpId',opts:$Tb.gfiOfdp}},
	fdpIdBuy:{lTag:'select',wxn:'wrapx8',L:'Forma pago',I:{name:'fdpId','class':$Api.Sea.clsBox,k:'fdpId',opts:$Tb.gfiOfdp}},
	cdcId:{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
	payTypeG:{lTag:'select',wxn:'wrapx8',L:'Tipo',I:{k:'payType',name:'payType',opts:$V.gfiPayTypeG}},
	payTypeI:{lTag:'select',wxn:'wrapx8',L:'Tipo',I:{k:'payType',name:'payType',opts:$V.gfiPayTypeI}},

	slpId:{lTag:'select',wxn:'wrapx8',L:'Resp. Ventas',I:{'class':$Api.Sea.clsBox,k:'slpId',name:'slpId',opts:$Tb.oslp}},
	docDate:{divLine:1,lTag:'date',wxn:'wrapx8',req:'Y',L:'Fecha',I:{'class':$Doc.Fx.clsdocDate,name:'docDate'}},
	pymId:{lTag:'select',wxn:'wrapx8',req:'Y',L:'Condicion Pago',I:{'class':($Api.Sea.clsBox+' '+$Doc.Fx.clspymId),k:'pymId',name:'pymId',opts:$Tb.gfiOpym}},
	dueDate:{lTag:'date',wxn:'wrapx8',L:'Vencimiento',req:'Y',I:{'class':$Doc.Fx.clsdueDate,name:'dueDate'}},
	ref1:{lTag:'input',wxn:'wrapx8',L:'Referencia 1',I:{name:'ref1'}},
	ref2:{lTag:'input',wxn:'wrapx8',L:'Referencia 2',I:{name:'ref2'}},
	fromDlv:{nL:1,lt:'D',lTag:'ckLabel',I:{t:'Basado en Doc. de Inventario',I:{name:'fromDlv',_iHelp:'Si se define, se realizan la contabilización omitiendo las de inventario y utilizando posibles auxiliares.'}}},
	lineMemo:{divLine:1,lTag:'textarea',wxn:'wrapx1',L:'Detalles',I:{name:'lineMemo'}},
	//gvtRcv1
	payGrText:{lTag:'input',wxn:'wrapx4',req:'Y',L:'Condiciones de Pago',I:{name:'payGrText'}},
	banId:{lTag:'select',wxn:'wrapx4',L:'Cuenta Ingreso',I:{name:'banId',opts:$Tb.gfiOban}},
	banIdEgr:{lTag:'select',wxn:'wrapx4',L:'Cuenta Gasto',I:{name:'banId',opts:$Tb.gfiOban}},
	bal:{lTag:'$',wxn:'wrapx8',L:'Valor Recibido',I:{name:'bal'}},
	antAccId:{lTag:'select',wxn:'wrapx4',L:'Cuenta Anticipo',I:{name:'antAccId',opts:$Tb.gfiPdcAntCxc}},
	antCxp:{lTag:'select',wxn:'wrapx4',L:'Cuenta Anticipo',I:{name:'antAccId',opts:$Tb.gfiPdcAntCxp}},
	/* sop*/
	prsCnt:{divLine:1,lTag:'input',wxn:'wrapx6',req:'Y',L:'Persona de Contacto',I:{ype:'text',name:'prsCnt'}},
	condicGen:{divLine:1,lTag:'textarea',wxn:'wrapx1',L:'Condiciones Generales',I:{name:'condicGen'}},
	/*ovt*/
	ovtType:{lTag:'select',wxn:'wrapx8',L:'Tipo Documento',req:'Y',I:{name:'docType',opts:$V.gvtOvtType}},
	countyMerch:{divLine:1,lTag:'select',wxn:'wrapx8',L:'Dpto. Entrega',I:{name:'countyMerch',opts:$V.AddrCounty,'class':$Api.Sea.clsBox,k:'countyMerch'}},
	cityMerch:{lTag:'select',wxn:'wrapx8',L:'Ciudad entrega',I:{name:'cityMerch','class':$Api.Sea.clsBox,k:'cityMerch',opts:$V.AddrCity}},
	addrMerch:{lTag:'input',wxn:'wrapx4',L:'Dirección entrega',I:{name:'addrMerch','class':$Api.Sea.clsBox,k:'addrMerch'}},
	countyCode:{divLine:1,lTag:'select',wxn:'wrapx8',L:'Departamento',I:{name:'countyCode',opts:$V.AddrCounty,'class':$Api.Sea.clsBox,k:'countyCode'}},
	cityCode:{lTag:'select',wxn:'wrapx8',L:'Ciudad',I:{name:'cityCode','class':$Api.Sea.clsBox,k:'cityCode',opts:$V.AddrCity}},
	address:{lTag:'input',wxn:'wrapx4',L:'Dirección',I:{name:'address','class':$Api.Sea.clsBox,k:'address'}},

	phone1:{lTag:'input',wxn:'wrapx8',L:'Teléfono',I:{name:'phone1','class':$Api.Sea.clsBox,k:'phone1'}},
	email:{lTag:'input',wxn:'wrapx4',L:'Email',I:{name:'email','class':$Api.Sea.clsBox,k:'email'}},
	/*ivt*/
	whsId:{lTag:'select',wxn:'wrapx8',L:'Almacen',I:{name:'whsId',opts:$Tb.itmOwhs}},
	whsIdSep:{lTag:'select',wxn:'wrapx8',L:'Almacen Separado',I:{name:'whsIdSep',opts:$Tb.itmOwhs,_iHelp:'Si se define la mercancía se transfiere a está bodega, al cerrar la entrega se da salida a la mercancia de está bodega.'}},
});


// filters definition
_Fi['gvtSop']=function(wrap){
	$Doc.filter({func:Gvt.Cvt.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{k:'docStatus'},{tbSerie:'gvtSop'},{k:'docNum'},{k:'card'},{k:'ordBy'}
	],wrap);
};
_Fi['gvtSor']=function(wrap){
	$Doc.filter({func:Gvt.Sor.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{k:'docStatus',opts:$V.docStatusSor},{tbSerie:'gvtSor'},{k:'docNum'},{k:'card'},{k:'ordBy'}
	],wrap);
};
_Fi['gvtSdn']=function(wrap){
	$Doc.filter({func:Gvt.Sdn.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{k:'docStatus'},{tbSerie:'gvtSdn'},{k:'docNum'},{k:'card'},{k:'ordBy'}
	],wrap);
};


_Fi['gvtCxc']=function(wrap){
	var Bal=[{wxn:'wrapx8',L:'Saldo Pendiente >=',I:{tag:'input',type:'number',inputmode:'numeric',min:0,name:'A.balDue(E_mayIgual)'}}];
	$Doc.filtForm({func:Gvt.Cxc.get,adds:Bal},wrap);
};
_Fi['gvtSnc']=function(wrap){
	$Doc.filter({func:Gvt.Snc.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{k:'docStatus'},{tbSerie:'gvtSnc'},{k:'docNum'},{k:'card'},{k:'ordBy'}
	],wrap);
};
_Fi['gvtSnd']=function(wrap){
	$Doc.filter({func:Gvt.Snd.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{k:'docStatus'},{tbSerie:'gvtSnd'},{k:'docNum'},{k:'card'},{k:'ordBy'}
	],wrap);
};
_Fi['gvtRcv']=function(wrap){
	$Doc.filter({func:Gvt.Rcv.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{k:'docStatus'},{tbSerie:'gvtRcv'},{k:'docNum'},{k:'card'},{k:'ordBy'}
	],wrap);
};

_Fi['gvtRep.sor']=function(wrap,x){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	opt1={CC:'Por Cliente',C:'Por Articulo',DO:'Por Documento'};
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV,name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
$1.T.divL({wxn:'wrapx8',L:'Estado',I:{lTag:'select','class':jsV,name:'A.docStatus',opts:$V.docStatusSor,noBlank:'Y'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha',I:{lTag:'date','class':jsV,name:'A.docDate(E_mayIgual)',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Fin',I:{lTag:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx4', L:'Cliente',I:{lTag:'input','class':jsV,name:'A.cardName(E_like3)'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Gvt.Rep.sor(); }},wrap);
};
_Fi['gvtRep.sin']=function(wrap,x){
	var jsV = 'jsFiltVars';
	opt1={DO:'Documento',G:'Consolidado',
	D:'Por Dia',C:'Por Cliente',CD:'Cliente y Dia', I:'Articulo',IC:'Articulo / Cliente'};
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV,name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	$1.viewRangFilter(divL,{selected:'D'});
	$1.T.divL({wxn:'wrapx4', L:'Cliente',I:{lTag:'card',topPare:wrap,'class':jsV,name:'C.cardName'}},divL);
	//$1.T.divL({wxn:'wrapx8',L:'Documentos',I:{lTag:'select','class':jsV,name:'docsView',opts:[{k:'FV',v:'Solo Facturas'},{k:'FN',v:'Facturas y Notas'}],noBlank:'Y'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Cond. Pago',I:{lTag:'select','class':jsV,name:'docsView',opts:
	$Tb.gfiOpym,name:'wh[A.pymId]'}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Articulo',I:{lTag:'input','class':jsV,name:'wh[I.itemName(E_like3)]'}},wrap);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Gvt.Rep.sin(); }},wrap);
};
_Fi['gvtRep.renta']= function(wrap){
	var jsV = 'jsFiltVars';
	opt1=[{k:'G',v:'General'},{k:'C',v:'Por Cliente'},{k:'I',v:'Por Articulo'},{k:'V',v:'Por Vendedor'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV+' viewType',name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	$1.viewRangFilter(divL);
	$1.T.divL({wxn:'wrapx4', L:'Cliente',I:{lTag:'card',topPare:wrap,'class':jsV,name:'C.cardName'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Gvt.Rep.renta(); }},wrap);
};
_Fi['gvtRep.gerence']=function(wrap,x){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	opt1=[{k:'G',v:'General'},{k:'M',v:'Meses'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV+' viewType',name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	var Tagsc=[];
	date1=$1.T.divL({wxn:'wrapx8',L:'Fecha',I:{tag:'input',type:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	month1=$1.T.divL({wxn:'wrapx8',L:'Desde',I:{lTag:'month','class':jsV,name:'month1'}},divL);
	month2=$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{lTag:'month','class':jsV,name:'month2'}},divL);
	year2=$1.T.divL({wxn:'wrapx8',L:'Año Corte',I:{lTag:'number','class':jsV,name:'year2',value:$2d.today.substr(0,4)}},divL);
	date2=$1.T.divL({wxn:'wrapx8',L:'Fecha Fin',I:{tag:'input',type:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx4', L:'Cliente',I:{lTag:'card',topPare:wrap,'class':jsV,name:'C.cardName'}},divL);
	Tagsc.push(date1,month1,date2,year2,date2,month2);
	$1.q('.viewType',wrap).onchange=function(){
		if(this.value=='M'){ $1.replaces('hi1',Tagsc); }
	  else{ $1.replaces('hi2',Tagsc); }
	}
	$1.replaces('hi2',Tagsc);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Gvt.Rep.gerence(); }},wrap);
};

var Gvt={}; //Module gvt
Gvt.fCall={}; /*reemplazan funciones */
/* Ventas */
Gvt.Cvt={
OLg:function(L){
	var Li=[]; var n=0;
	var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.pr+'sop',tbSerie:'gvtSop'});
	ab.add('v');
	ab.add('E',{canEdit:(L.docStatus=='O')});
	ab.add('down',{k:'pdf',textNode:'PDF',ico:'fa fa-file-pdf-o',href:Api.Tpd.a+'gvt/sop?docEntry='+L.docEntry});
	ab.add('copy',{plus:'Y',btnText:'Duplicar',copy:{to:CNF.URL.GVT_SOP_FORM.id,f:Api.Gvt.pr+'sop/toCopy',inputs:'docEntry='+L.docEntry}});
	ab.add('copy',{plus:'Y',btnText:'Orden de Venta',copy:{to:CNF.URL.GVT_SOR_FORM.id,f:Api.Gvt.pr+'sop/toCopy',inputs:'docEntry='+L.docEntry,AJs:[{k:'ott',v:'gvtSop'},{k:'otr',v:L.docEntry}]}});
	ab.add('copy',{plus:'Y',btnText:'Entrega de Venta',copy:{to:CNF.URL.GVT_SDN_FORM.id,f:Api.Gvt.pr+'sop/toCopy',inputs:'docEntry='+L.docEntry,AJs:[{k:'ott',v:'gvtSop'},{k:'otr',v:L.docEntry}]}});
	ab.add('copy',{plus:'Y',btnText:'Factura de Venta',copy:{to:CNF.URL.GVT_SIN_FORM.id,f:Api.Gvt.pr+'sop/toCopy',inputs:'docEntry='+L.docEntry,AJs:[{k:'ott',v:'gvtSop'},{k:'otr',v:L.docEntry}]}});
	ab.add('C'); ab.add('N'); ab.add('R'); ab.add('L');
	return $Opts.add('gvtSop',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Cvt.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.pr+'sop',inputs:$1.G.filter(),
	fOpts:Gvt.Cvt.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtSop',
	TD:[
		{H:'Estado',k:'docStatus',_V:'dStatus'},
		{H:'Fecha',k:'docDate',dateText:'mmm d'},
		{H:'Cliente',k:'cardName'},{H:'Validez',k:'dueDate',dateText:'mmm d'},
		{H:'Total',k:'docTotal',kTy:'price'},
		{H:'Responsable',k:'slpId',_gTb:'oslp'}
	],
	tbExport:{ext:'xlsx',fileName:'Listado de Cotizaciones'}
	},cont);
},
form:function(){
	var D=$Cche.d(0,{});
	var Pa=$M.read();
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	D.condicGen=(D.condicGen!=null)?D.condicGen:$V.gvtSopCondicDef;
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api.Gvt.pr+'sop/form',loadVerif:!Pa.docEntry,inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr.docEntry){ D=Jr; }
		var crdVal=(D.cardId)?D.cardName:'';
		if(!D.docDate){ D.docDate=$2d.today; }
		if(Pa.docEntry){ $Api.JS.addF({name:'docEntry',value:Pa.docEntry},cont); }
		var tP={tbSerie:'gvtSop', cont:cont,docEdit:Pa.docEntry, POST:Api.Gvt.pr+'sop',
		HLs:[
			{lTag:'input',L:'Cliente',wxn:'wrapx3',req:'Y',I:{name:'cardName',value:D.cardName}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
			{lTag:'date',L:'Valida hasta',wxn:'wrapx8',req:'Y',I:{name:'dueDate',value:D.dueDate}},
			{lTag:'select',L:'Condic. Pago',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,k:'pymId'}},
			{lTag:'slp',L:'Resp. Venta',wxn:'wrapx8',I:{name:'slpId',selected:D.slpId}},
			{divLine:1,lTag:'input',L:'Persona Contacto',wxn:'wrapx6',I:{name:'prsCnt',value:D.prsCnt}},
			{lTag:'input',L:'Email',wxn:'wrapx4',I:{name:'email',value:D.email,'class':$Api.Sea.clsBox,k:'email'}},
			{lTag:'input',L:'Telefono',wxn:'wrapx8',I:{name:'phone1',value:D.phone1}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}},
			{divLine:1,lTag:'textarea',L:'Terminos y Condiciones',wxn:'wrapx1',I:{name:'condicGen',textNode:D.condicGen,style:'height:200px'}}
		],
		tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'sell',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
		kTb:'gvtItmL',AJs:[{k:'sellFactor',a:'numFactor'}],
		kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,lineText'
		},
		};
		$Doc.form(tP);
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.pr+'sop/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'gvtSop',D:Jr,
			main:Gvt.Cvt.OLg,print:'Y',
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
				{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Vencimiento',k:'dueDate'},
				{k:'pymId',_gTb:'gfiOpym',cs:2},
				{t:'Cliente',k:'cardName',cs:5},{k:'slpId',_gTb:'oslp',cs:2,ln:1},
				{t:'Contacto',k:'prsCnt',cs:2},{k:'phone1',ln:1},{t:'Correo',k:'email',ln:1,cs:3},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}}
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Imp.',k:'vatId',_gTb:'otaxI'},
				{t:'Rte.',k:'rteId',_gTb:'otaxR'},
				{t:'Total',k:'priceLine',format:'$'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			docTotals:'Y',
			bottomAdd:[$1.t('div',{'class':'pre',textNode:Jr.condicGen})]
		};
		$Doc.view(cont,tP);
	}});
},
}
Gvt.Sor={
OLg:function(L){
	var Li=[];
	var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.pr+'sor',tbSerie:'gvtSor'});
	ab.add('E',{canEdit:(L.docStatus=='S')});
	if(L.docStatus=='D'){
		Li.push({k:'statusS',ico:'fa fa-paper-plane-o',textNode:' Enviar Documento', P:L, func:function(T){ $Doc.statusDefine({reqMemo:'N',docEntry:T.P.docEntry,api:Api.Gvt.pr+'sor/statusSend',text:'La orden será enviada para su aprobación.'}); } });
	}
	if(L.docStatus=='S'){
		Li.push({k:'statusO',ico:'fa fa_listWin',textNode:' Orden en Proceso', P:L, func:function(T){
			var divL=$1.T.divL({divLine:1,wxn:'wrapx1',L:'Asignar Almacen',subText:'Opcional. Los articulos inventariables aumentarán el solicitado en la bodega',I:{tag:'select','class':'jsFields',name:'whsId',opts:$Tb.itmOwhs}});
			$Doc.statusDefine({reqMemo:'N',InodeBot:divL,docEntry:T.P.docEntry,api:Api.Gvt.pr+'sor/statusOpen',text:'Marcar orden como en proceso.'});
		}});
	}
	ab.add('C');
	Li.push({k:'openQty',ico:'fa fa_doc',textNode:'Pendientes', P:L, func:function(T){ $Doc.go('gvtSor','openQty',T.P,1); } });
	if(L.docStatus=='O' && L.whsId==0){
		Li.push({k:'statusO',ico:'fa fa_listWin',textNode:' Asignar Almacen', P:L, func:function(T){
			var divL=$1.T.divL({divLine:1,wxn:'wrapx1',req:'Y',L:'Asignar Almacen',subText:'Los articulos inventariables aumentarán el solicitado en la bodega',I:{tag:'select','class':'jsFields',name:'whsId',opts:$Tb.itmOwhs}});
			$Doc.statusDefine({reqMemo:'N',InodeBot:divL,docEntry:T.P.docEntry,api:Api.Gvt.pr+'sor/whsAssg',text:'Asignar bodega.'});
		}});
	}
	if(L.canceled=='N'){
		ab.add('copy',{plus:'Y',btnText:'Generar Factura',copy:{to:CNF.URL.GVT_SIN_FORM.id,f:Api.Gvt.pr+'sor/toCopy',AJs:[{k:'ott',v:'gvtSor'},{k:'otr',v:L.docEntry}]}});
		Li.push({plus:'Y',k:'genSdn',ico:'fa fa-file-o',textNode:' Generar Entrega', P:L, func:function(T){ Gvt.Sor.genSdn(T.P); }});
	}
	ab.add('N'); ab.add('R'); ab.add('L');
	return $Opts.add('gvtSor',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Sor.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.pr+'sor',inputs:$1.G.filter(),
	fOpts:Gvt.Sor.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtSor',
	TD:[
		{H:'Estado',k:'docStatus',_g:$V.docStatusSor},
		{H:'Fecha',k:'docDate'},
		{H:'Cliente',k:'cardName'},
		{H:'Almacen',k:'whsId',_gTb:'itmOwhs'},
		{H:'O.C',k:'ref1'},
		{H:'Fecha Entrega',k:'dueDate'},
		{H:'Resp. Ventas',k:'slpId',_gTb:'oslp'},
		{H:'Total',k:'docTotal',format:'$'},
		{H:'Estado Entrega',k:'dlvStatus',_V:'gvtSorDlvStatus'},
		{H:'Estado Cartera',k:'financeStatus',_V:'gvtSorFinanceStatus'}
	],
	tbExport:{ext:'xlsx',fileName:'Ordenes de Venta'}
	},cont);
},
form:function(){
	var D=$Cche.d(0,{}); var Pa=$M.read();
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.pr+'sor/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr.docEntry){ D=Jr; }
		if(!D.docDate){ D.docDate=$2d.today; }
		if(!D.dueDate){ D.dueDate=$2d.today; }
		if(!D.rteIva){ D.rteIva='Y'; }
		if(!D.rteIca){ D.rteIca='Y'; }
		var Dire=Addr.basic(D,null,{nodes:'Y'});
		$Doc.form({tbSerie:'gvtSor',cont:cont,docEdit:Pa.docEntry,POST:Api.Gvt.pr+'sor',AJs:D.AJs,func:D.func,
		HLs:[
			{lTag:'card',L:'Cliente',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,fie:'slpId,fdpId,pymId,countyCode,cityCode,address,rteIva,rteIca',AJsPut:['cardName']}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
			{lTag:'date',L:'Vencimiento',wxn:'wrapx8',req:'Y',I:{name:'dueDate',value:D.dueDate}},
			{lTag:'input',L:'Orden de Compra',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
			{lTag:'slp',L:'Resp. Venta',wxn:'wrapx8',I:{name:'slpId',selected:D.slpId}},
			{divLine:1,L:'Departamento',wxn:'wrapx4',Inode:Dire[1]},
			{L:'Ciudad',wxn:'wrapx4',Inode:Dire[2]},
			{L:'Dirección',wxn:'wrapx2',Inode:Dire[3]},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
		tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',uniqLine:'Y',L:D.L,itmSea:'sell',bCode:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
		kTb:'gvtItmL',AJs:[{k:'sellFactor',a:'numFactor'}],
		kFie:'itemCode,itemName,price,quantity,descPrc,udm,vatId,rteId,priceLine,lineText'
		}
		});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.pr+'sor/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		var tP={tbSerie:'gvtSor',D:Jr,
			main:Gvt.Sor.OLg,
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:7,ln:1},
				,{t:'Estado',k:'docStatus',_V:'docStatusSor'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{t:'Fecha Entrega',k:'dueDate'},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'slpId',_gTb:'oslp',cs:2,ln:1},
				{t:'Orden Compra',k:'ref1'},{t:'Dirección',k:'countyCode',_V:'AddrCounty',ln:1},{k:'cityCode',_V:'AddrCity',ln:1},{k:'address',cs:3,ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:12px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Imp.',k:'vatId',_gTb:'otaxI'},
				{t:'Rte.',k:'rteId',_gTb:'otaxR'},
				{t:'Total',k:'priceLine',format:'$'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			docTotals:'Y',
		};
		$Doc.view(cont,tP);
	}});
},
openQty:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.pr+'sor/openQty',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		Jr._txt='Pendientes de Entrega';
		var tP={tbSerie:'gvtSor',D:Jr,
			btnsTop:{ks:'print,genSdn,logs,',icons:'Y',Li:Gvt.Sor.OLg},
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:4,ln:1},{k:'_txt',cs:3,ln:1}
				,{t:'Estado',k:'docStatus',_V:'docStatusAll'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{t:'Fecha Entrega',k:'dueDate'},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'slpId',_gTb:'oslp',cs:2,ln:1},
				{t:'Orden Compra',k:'ref1'},{t:'Dirección',k:'countyCode',_V:'AddrCounty',ln:1},{k:'cityCode',_V:'AddrCity',ln:1},{k:'address',cs:3,ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:12px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Total',k:'quantity',format:'number'},
				{t:'Pend.',k:'openQty',format:'number'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			footTrs:null,
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
},
genSdn:function(Pa){
	$Api.copyFrom({to:CNF.URL.GVT_SDN_FORM.id,AJs:[{k:'ott',v:'gvtSor'},{k:'otr',v:Pa.docEntry}],
	AJsL:[{k:'id',a:'lineTr'},'openQty'], f:Api.Gvt.pr+'sor/toCopy',inputs:'docEntry='+Pa.docEntry,
	func:function(Jr){
		if(Jr.L && Jr.L.errNo==2){
			Jr.errNo=1; Jr.text='El documento no tiene lineas disponibles para generar un documento de entrega';
			return $Api.resp(cont,Jr);
		}
	}});
},
}
Gvt.Sdn={
OLg:function(L){
	var Li=[]; var n=0;
	var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.pr+'sdn',tbSerie:'gvtSdn'});
	ab.add('v');
	ab.add('E',{canEdit:(L.docSatus=='O')});
	ab.add('C');
	ab.add('copy',{plus:'Y',btnText:'Generar Devolución',copy:{to:CNF.URL.GVT_SRD_FORM.id,f:Api.Gvt.pr+'sdn/'+L.docEntry+'/toSin',AJs:[{k:'ott',v:'gvtSdn'},{k:'otr',v:L.docEntry}]}});
	ab.add('copy',{plus:'Y',btnText:'Generar Factura',copy:{to:CNF.URL.GVT_SIN_FORM.id,f:Api.Gvt.pr+'sdn/'+L.docEntry+'/toSin',AJs:[{k:'ott',v:'gvtSdn'},{k:'otr',v:L.docEntry}]}});
	if(L.docStatus!='N'){
		Li.push({plus:'Y',k:'viewPacking',ico:'fa fa-file-text-o',textNode:' Lista de Empaque', P:L, func:function(T){ $Doc.go('gvtSdn','viewPacking',T.P,1);; } });
		Li.push({plus:'Y',k:'packing',ico:'fa fa-cubes',textNode:' Definir Lista de Empaque', P:L, func:function(T){ $Doc.go('gvtSdn','packing',T.P,1);; } });
	}
	ab.add('AC');
	ab.add('N',{addText:'Las cantidades ingresadas en inventario serán reversadas.'});
	ab.add('R'); ab.add('L');
return $Opts.add('gvtSdn',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Sdn.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.pr+'sdn',inputs:$1.G.filter(),
	fOpts:Gvt.Sdn.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtSdn',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Fecha',k:'docDate'},
		{H:'Proveedor',k:'cardName'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Entregas de Mercancia'}
	},cont);
},
form:function(){
	var D=$Cche.d(0,{});
	var Pa=$M.read();
	var cont=$M.Ht.cont;
	var AJsL=(D.AJsL)?D.AJsL:[]; AJsL.push('numFactor');
	if(!D.docDate){ D.docDate=$2d.today; }
	$Api.get({f:Api.Gvt.pr+'sdn/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr.docEntry){ D=Jr; }
		var crdVal=(D.cardId)?D.cardName:'';
		var Dire=Addr.basic(D,null,{nodes:'Y'});
		$Doc.form({tbSerie:'gvtSdn', AJs:D.AJs,docEdit:Pa.docEntry, cont:cont,POST:Api.Gvt.pr+'sdn',
		HLs:[
			{lTag:'card',L:'Cliente',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,fie:'slpId,pymId,countyCode,cityCode,address,rteIva,rteIca',AJsPut:['cardName']}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
			{lTag:'select',L:'Condic. Pago',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym}},
			{lTag:'slp',L:'Resp. Venta',wxn:'wrapx8',I:{name:'slpId',selected:D.slpId}},
			{divLine:1,L:'Departamento',wxn:'wrapx4',Inode:Dire[1]},
			{L:'Ciudad',wxn:'wrapx4',Inode:Dire[2]},
			{L:'Dirección',wxn:'wrapx2',Inode:Dire[3]},
			{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
			{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
			{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
			tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',uniqLine:'Y',bCode:'Y',L:D.L,itmSea:'sellIvt',rteIva:D.rteIva,rteIca:D.rteIca,
			AJs:AJsL,
			kTb:'gvtItmL',
			kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,lineText'
			}
			});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.pr+'sdn/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		var tP={tbSerie:'gvtSdn',D:Jr,
			main:Gvt.Sdn.OLg,
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
				,{t:'Estado',k:'docStatus',_V:'docStatus'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},
				{k:'cardName',cs:4,ln:1},{k:'slpId',_gTb:'oslp',cs:2,ln:1},
				{t:'Cond. Pago',k:'pymId',_gTb:'gfiOpym'},{t:'Ref. 1',k:'ref1',ln:1},{t:'Ref. 2',k:'ref2',ln:1},{k:'whsId',_gTb:'itmOwhs',cs:2,ln:1},
				{t:'Direcciónn',k:'countyCode',_V:'AddrCounty'},{k:'cityCode',_V:'AddrCity',ln:1},{k:'address',cs:5,ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Imp.',k:'vatId',_gTb:'otaxI'},
				{t:'Rte.',k:'rteId',_gTb:'otaxR'},
				{t:'Total',k:'priceLine',format:'$'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			footTrs:{cs:5},
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
},
packing:function(){
	var Pa=$M.read();
	$Packi.formBC({tbBase:'Y',api:Api.Gvt.pr+'sdn/packingSet',docEntry:Pa.docEntry,btnPut:'Y'},$M.Ht.cont);
},
viewPacking:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.pr+'sdn/'+Pa.docEntry+'/packing',loade:cont,func:function(Jr){
		if(!Jr.L.errNo){ Jr.L=$js.sortBy('lineNum',Jr.L); }
		Jr.txtTop='Lista Empaque';
		var tP={tbSerie:'gvtSdn',D:Jr,
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:6,ln:1},{k:'txtTop',ln:1}
				,{t:'Estado',k:'docStatus',_V:'docStatus'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},{t:'Forma Pago',k:'fdpId',_gTb:'gfiOfdp'},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'slpId',_gTb:'oslp',cs:2,ln:1},
				{t:'Cond. Pago',k:'pymId',_gTb:'gfiOpym'},{t:'Ref. 1',k:'ref1',ln:1},{t:'Ref. 2',k:'ref2',ln:1},{t:'',cs:2,ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Caja',k:'boxNum'},
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Cant.',k:'quantity',format:'number'},
			]}
			],
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
},
}

Gvt.Snc = {
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.pr+'snc',tbSerie:'gvtSnc'});
		ab.add('v'); ab.add('AC');
		ab.add('N',{addText:'Las cantidades de inventario serán reversadas si aplica.'});
		ab.add('R'); ab.add('L');
		return $Opts.add('gvtSnc',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Gvt.Snc.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Gvt.pr+'snc',inputs:$1.G.filter(),
		fOpts:Gvt.Snc.opts,view:'Y',docBy:'userDate',
		tbSerie:'gvtSnc',
		TD:[
			{H:'Estado',k:'docStatus',_V:'dStatus'},
			{H:'Fecha',k:'docDate',dateText:'mmm d'},
			{H:'Cliente',k:'cardName'},
			{H:'Total',k:'docTotal',kTy:'price'},
			{H:'Resp. Venta',k:'slpId',_gTb:'oslp'}
		],
		tbExport:{ext:'xlsx',fileName:'Listado de Cotizaciones'}
		},cont);
	},
	form:function(){
		var D={};
		var cont=$M.Ht.cont;
		var jsF=$Api.JS.cls;
		var AJs={};
		var crdVal=(D.cardId)?D.cardName:'';
		if(!D.docDate){ D.docDate=$2d.today; }
		if(!D.rteIva){ D.rteIva='Y'; }
		if(!D.rteIca){ D.rteIca='Y'; }
		$Doc.form({tbSerie:'gvtSnc',cont:cont,jsF:jsF,POST:Api.Gvt.pr+'snc',AJs:D.AJs,func:D.func,
		HLs:[
		{lTag:'apiSeaBox',L:'Factura de Cliente',req:'Y',wxn:'wrapx3',I:{api:Api.Gvt.js+'sin/sea2nc',fieDefAt:cont,AJsPut:[{k:'docEntry',a:'otr'},'cardId','cardName']}},
		{lTag:'select',L:'Condic. Pago',req:'Y',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,'class':$Api.Sea.clsBox+' '+$Doc.Fx.clspymId,k:'pymId'}},
		{lTag:'date',L:'Fecha',req:'Y',wxn:'wrapx8',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
		{lTag:'select',L:'Motivo',req:'Y',wxn:'wrapx8',I:{opts:$V.gvtSncClass,name:'docClass'}},
		{lTag:'slp',L:'Resp. Venta',wxn:'wrapx8',I:{name:'slpId',selected:D.slpId,'class':$Api.Sea.clsBox,k:'slpId'}},
		{divLine:1,lTag:'select',L:'Cent. Costo',wxn:'wrapx8',I:{opts:$Tb.gfiOcdc,name:'cdcId',value:D.cdcId}},
		{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
		{lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
		$V.tagFromDlv,
		{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
		tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'sell',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
		kTb:'gvtItmL',AJs:[{k:'sellFactor',a:'numFactor'}],
		kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,lineText'
		}
		});
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:Api.Gvt.pr+'snc/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'gvtSnc',D:Jr,
				btnsTop:{ks:'print,logs,statusN,viewDac,',icons:'Y',Li:Gvt.Snc.OLg},
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatusAll',ln:1},
					{t:'Fecha',k:'docDate'},
					{middleInfo:'Y'},{logo:'Y'},
					{k:'pymId',_gTb:'gfiOpym',cs:2},
					{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},
					{k:'cardName',cs:5},{t:'Motivo',k:'docClass',_V:'gvtSncClass',cs:2,ln:1},
					{k:'slpId',_gTb:'oslp',cs:2},{k:'whsId',_gTb:'itmOwhs',ln:1,cs:2},{t:'Ref. 1 ',k:'ref1',ln:1},{t:'Ref. 2 ',k:'ref2',ln:1},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
				],
				mTL:[
				{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
					{t:'Código',k:'itemCode',fText:Itm.Txt.code},
					{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
					{t:'Precio',k:'price',format:'$'},
					{t:'Cant.',k:'quantity',format:'number'},
					{t:'Imp.',k:'vatId',_gTb:'otaxI'},
					{t:'Rte.',k:'rteId',_gTb:'otaxR'},
					{t:'Total',k:'priceLine',format:'$'},
					{t:'Detalles',k:'lineText'}
				]}
				],
				footTotal:{cs1:3,cs2:7},
				TFs:null
			};
			$Doc.view(cont,tP);
		}});
	},
}
Gvt.Snd={
OLg:function(L){
	var Li=[];
	var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.pr+'snd',tbSerie:'gvtSnd'});
	ab.add('v'); ab.add('AC');
	ab.add('N',{addText:'Las cantidades de inventario serán reversadas si aplica.'});
	ab.add('R'); ab.add('L');
	return $Opts.add('gvtSnc',Li,L);
},
opts:function(P,pare){
	Li={Li:Gvt.Snd.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.pr+'snd',inputs:$1.G.filter(),
	fOpts:Gvt.Snd.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtSnd',
	TD:[
		{H:'Estado',k:'docStatus',_V:'dStatus'},
		{H:'Fecha',k:'docDate',dateText:'mmm d'},
		{H:'Cliente',k:'cardName'},
		{H:'Total',k:'docTotal',kTy:'price'},
		{H:'Resp. Venta',k:'slpId',_gTb:'oslp'},
		{H:'Centro Costo',k:'cdcId',_gTb:'$Tb.gfiOcdc'}
	],
	tbExport:{ext:'xlsx',fileName:'Notas Débito Cliente'}
	},cont);
},
form:function(){
	var D=$Cche.d(0,{});
	var cont=$M.Ht.cont;
	var jsF=$Api.JS.cls;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	if(!D.docDate){ D.docDate=$2d.today; }
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	$Doc.form({tbSerie:'gvtSnd',cont:cont,jsF:jsF,POST:Api.Gvt.pr+'snd',func:D.func,
	HLs:[
	{lTag:'apiSeaBox',L:'Factura de Cliente',req:'Y',wxn:'wrapx3',I:{api:Api.Gvt.js+'sin/sea2nc',fieDefAt:cont,AJsPut:[{k:'docEntry',a:'otr'},'cardId','cardName']}},
	{lTag:'select',L:'Condic. Pago',req:'Y',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,'class':$Api.Sea.clsBox+' '+$Doc.Fx.clspymId,k:'pymId'}},
	{lTag:'date',L:'Fecha',req:'Y',wxn:'wrapx8',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
	{lTag:'slp',L:'Resp. Venta',wxn:'wrapx8',I:{name:'slpId',selected:D.slpId,'class':$Api.Sea.clsBox,k:'slpId'}},
	{divLine:1,lTag:'select',L:'Cent. Costo',wxn:'wrapx8',I:{opts:$Tb.gfiOcdc,name:'cdcId',value:D.cdcId}},
	{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
	{lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
	{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
	$V.tagFromDlv,
	{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
	],
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'sell',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
	kTb:'gvtItmL',AJs:[{k:'sellFactor',a:'numFactor'}],
	kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.pr+'snd/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'gvtSnd',D:Jr,
			btnsTop:{ks:'print,logs,statusN,viewDac,',icons:'Y',Li:Gvt.Snd.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatusAll',ln:1},
				{t:'Fecha',k:'docDate'},
				{middleInfo:'Y'},{logo:'Y'},
				{k:'pymId',_gTb:'gfiOpym',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},
				{k:'cardName',cs:8},
				{k:'slpId',_gTb:'oslp',cs:2},{k:'whsId',_gTb:'itmOwhs',ln:1,cs:2},{t:'Ref. 1 ',k:'ref1',ln:1},{t:'Ref. 2 ',k:'ref2',ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Imp.',k:'vatId',_gTb:'otaxI'},
				{t:'Rte.',k:'rteId',_gTb:'otaxR'},
				{t:'Total',k:'priceLine',format:'$'},
			]}
			],
			footTotal:{cs1:3,cs2:7},
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
}
}
/* Reportes */
Gvt.Rep={
	sor:function(){
		$Api.Rep.base({f:Api.Gvt.pr+'rep/sor',inputs:$1.G.filter(),
		V_C:[{f:'itemCode',t:'Código'},{f:'itemName',t:'Descripción'},{f:'itemSzId',t:'S',_g:$V.grs1},{f:'quantity',t:'Cantidad',fType:'number'},{f:'openQty',t:'Pendiente',fType:'number'},{f:'whsId',t:'Almacen',_g:$Tb.itmOwhs}
		],
		V_CC:[{f:'cardName',t:'Cliente'},{f:'itemCode',t:'Código'},{f:'itemName',t:'Descripción'},{f:'itemSzId',t:'S',_g:$V.grs1},{f:'quantity',t:'Cantidad',fType:'number'},{f:'openQty',t:'Pendiente',fType:'number'},{f:'whsId',t:'Almacen',_g:$Tb.itmOwhs}
		],
		V_DO:[{f:'docEntry',t:'# Orden'},{f:'cardName',t:'Cliente'},{f:'docDate',t:'Fecha'},{f:'dueDate',t:'Fecha Entrega'},{f:'itemCode',t:'Código'},{f:'itemName',t:'Descripción'},{f:'itemSzId',t:'S',_g:$V.grs1},{f:'quantity',t:'Cantidad',fType:'number'},{f:'openQty',t:'Pendiente',fType:'number'},{f:'whsId',t:'Almacen',_g:$Tb.itmOwhs}
		],
		},$M.Ht.cont);
	},
	sin:function(){
		$Api.Rep.base({f:Api.Gvt.pr+'rep/sin',inputs:$1.G.filter(),
		Totals:{t:'Totales',tn:2},
		V_G:[
		{f:'docTotal',t:'Total',fType:'$',totals:'Y'},
		{t:'Pendiente',f:'balDue',fType:'$',totals:'Y'}
		],
		V_D:[
		{CHARS:[
			{_title:'Facturado por dia',_labels:'docDate',_yformat:'$',_data:['docTotal','docTotal'],
			type:'bar',data:{
				legend:false,
				datasets:[
					{label:'Top',type:'line',fill:false,borderWidth:0},
					{label:'Valores',backgroundColor:'#56d798'},
				],
			}}
			],
		},
		{f:'docDate',t:'Fecha'},
		{f:'docTotal',t:'Total',fType:'$',totals:'Y'},
		{t:'Pendiente',f:'balDue',fType:'$',totals:'Y'}
		],
		V_C:[
		{f:'cardName',t:'Cliente'},
		{f:'docTotal',t:'Total',fType:'$',totals:'Y'},
		{t:'Pendiente',f:'balDue',fType:'$',totals:'Y'}
		],
		V_CD:[
		{f:'docDate',t:'Fecha'},
		{f:'cardName',t:'Cliente'},
		{f:'docTotal',t:'Total',fType:'$',totals:'Y'},
		{t:'Pendiente',f:'balDue',fType:'$',totals:'Y'}
		],
		V_I:[
		{CHARS:[
			{_title:'Facturado por Articulo',_labels:function(L){ return Itm.Txt.name(L); },_yformat:'$',_xhidden:'Y',_data:['priceLine'],
			type:'bar',data:{
				legend:false,
				datasets:[
					{label:'Valores',fill:'start',backgroundColor:'#56d798'}
				],
			}}
			],
		},
		{f:'itemCode',t:'Código',fText:Itm.Txt.code},
		{f:'itemName',t:'Descripción',fText:Itm.Txt.name},
		{f:'quantity',t:'Cantidad',fType:'number',totals:'Y'},
		{f:'priceLine',t:'Precio',fType:'$',totals:'Y'}
		],
		V_IC:[
		{f:'cardName',t:'Cliente'},
		{f:'itemCode',t:'Código',fText:Itm.Txt.code},
		{f:'itemName',t:'Descripción',fText:Itm.Txt.name},
		{f:'quantity',t:'Cantidad',fType:'number',totals:'Y'},
		{f:'priceLine',t:'Precio',fType:'$',totals:'Y'}
		],
		V_DO:[
		{f:'docNum',t:'# Doc'},
		{f:'docDate',t:'Fecha'},
		{f:'dueDate',t:'Vencimiento'},
		{f:'licTradNum',t:'Ident.'},
		{f:'cardName',t:'Cliente'},
		{f:'slpId',t:'Resp. Ventas',_g:$Tb.oslp},
		{f:'docTotal',t:'Total',fType:'$'},
		{t:'Pendiente',f:'balDue',fType:'$'},
		{f:'pymId',t:'Condic. Pago',_g:$Tb.gfiOpym},
		{f:'itemCode',t:'Código',},
		{f:'itemName',t:'Descripción'},
		{f:'itemSzId',t:'S/P',_g:$Tb.itmGrs1},
		{f:'price',t:'Precio',format:'$'},
		{f:'quantity',t:'Cant.',format:'number',totals:'Y'},
		{f:'udm',t:'Udm',_g:Udm.O},
		{f:'priceLine',t:'Total',format:'$',totals:'Y'},
		{f:"lineText",t:"Detalle Linea"},
		{f:"priceList",t:"Precio Base",format:'$'},
		{f:"disc",t:"Desc. %",format:'number'},
		{f:"discSum.",t:"Descuento",format:'$'},
		{f:"grossTotal",t:"Ganancia",format:'$'},
		{f:"address",t:"Direccion"},
		{f:"countyCode",t:'Departamento',_g:Addr.County},
		{f:"cityCode",t:"Ciudad",_g:Addr.City},
		{f:"phone1",t:"Telefono"},
		{f:'email',t:'Email'},
		{f:'lineMemo',t:'Detalles Documento'},
		],
		},$M.Ht.cont);
	},
	renta:function(){
		$Api.Rep.base({f:Api.Gvt.pr+'rep/renta',inputs:$1.G.filter(),
		V_G:function(Jr,cont){
			var w1=$1.t('div',0,cont);
			var w2=$1.T.tbExport(null,{down:'Y',print:'Y'},cont);
			var tBody=$1.T.table(['','Facturado','-Impuestos','\'=Base','Rentab. Bruta','%'],{rBody:true},w2);
			var cLabels=[]; var cData=[[],[]];
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				if(Jr._viewRang=='D'){ tLabel=L.docDate; }
				else if(Jr._viewRang=='M'){ tLabel=$2d.txtMonth(L.period); }
				$1.t('td',{textNode:tLabel},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
				$1.t('td',{textNode:$Str.money(L.vatSum-L.rteSum)},tr);
				$1.t('td',{textNode:$Str.money(L.baseAmnt)},tr);
				$1.t('td',{textNode:$Str.money(L.grossTotal)},tr);
				$1.t('td',{textNode:$js.perc(L.grossTotal,L.baseAmnt)},tr);
				cLabels.push(tLabel);
				cData[0].push(L.baseAmnt);
				cData[1].push(L.grossTotal);
			}
			$myChart.CHARS(w1,{type:'bar',_yformat:'$',_title:'Rentabilidad',data:{
				labels:cLabels,
				datasets:[
					{data:cData[1],type:'line',label:'Rentabilidad',borderColor:$bgColor.blue,backgroundColor:$bgColor.blue,fill:false},
					{data:cData[0],type:'bar',label:'Base',backgroundColor:$bgColor.yellow2}
				]
			}});
		},
		V_C:function(Jr,cont){
			var w1=$1.t('div',0,cont);
			var w2=$1.T.tbExport(null,{down:'Y',print:'Y'},cont);
			var tBody=$1.T.table(['Cliente','Facturado','-Impuestos','\'=Base','Rentab. Bruta','%'],{rBody:true},w2);
			var cLabels=[]; var cData=[[],[]];
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				tLabel=L.cardName;
				$1.t('td',{textNode:tLabel},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
				$1.t('td',{textNode:$Str.money(L.vatSum-L.rteSum)},tr);
				$1.t('td',{textNode:$Str.money(L.baseAmnt)},tr);
				$1.t('td',{textNode:$Str.money(L.grossTotal)},tr);
				$1.t('td',{textNode:$js.perc(L.grossTotal,L.baseAmnt)},tr);
				cLabels.push(tLabel);
				cData[0].push(L.baseAmnt);
				cData[1].push(L.grossTotal);
			}
			$myChart.CHARS(w1,{type:'bar',_yformat:'$',_title:'Rentabilidad',data:{
				labels:cLabels,
				datasets:[
					{data:cData[1],type:'line',label:'Rentabilidad',borderColor:$bgColor.blue,backgroundColor:$bgColor.blue,fill:false},
					{data:cData[0],type:'bar',label:'Base',backgroundColor:$bgColor.yellow2}
				]
			}});
		},
		V_V:function(Jr,cont){
			var w1=$1.t('div',0,cont);
			var w2=$1.T.tbExport(null,{down:'Y',print:'Y'},cont);
			var tBody=$1.T.table(['Vendedor','Facturado','-Impuestos','\'=Base','Rentab. Bruta','%'],{rBody:true},w2);
			var cLabels=[]; var cData=[[],[]];
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				tLabel=_g(L.slpId,$Tb.oslp,'No Asignado');
				$1.t('td',{textNode:tLabel},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
				$1.t('td',{textNode:$Str.money(L.vatSum-L.rteSum)},tr);
				$1.t('td',{textNode:$Str.money(L.baseAmnt)},tr);
				$1.t('td',{textNode:$Str.money(L.grossTotal)},tr);
				$1.t('td',{textNode:$js.perc(L.grossTotal,L.baseAmnt)},tr);
				cLabels.push(tLabel);
				cData[0].push(L.baseAmnt);
				cData[1].push(L.grossTotal);
			}
			$myChart.CHARS(w1,{type:'bar',_yformat:'$',_title:'Rentabilidad',data:{
				labels:cLabels,
				datasets:[
					{data:cData[1],type:'line',label:'Rentabilidad',borderColor:$bgColor.blue,backgroundColor:$bgColor.blue,fill:false},
					{data:cData[0],type:'bar',label:'Base',backgroundColor:$bgColor.yellow2}
				]
			}});
		},
		V_I:function(Jr,cont){
			var w1=$1.t('div',0,cont);
			var w2=$1.T.tbExport(null,{down:'Y',print:'Y'},cont);
			var tBody=$1.T.table(['Articulo','\'=Base','Rentab. Bruta','%'],{rBody:true},w2);
			var cLabels=[]; var cData=[[],[]];
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				tLabel=Itm.Txt.name(L);
				$1.t('td',{textNode:tLabel},tr);
				$1.t('td',{textNode:$Str.money(L.baseAmnt)},tr);
				$1.t('td',{textNode:$Str.money(L.grossTotal)},tr);
				$1.t('td',{textNode:$js.perc(L.grossTotal,L.baseAmnt)},tr);
				cLabels.push(tLabel);
				cData[0].push(L.baseAmnt);
				cData[1].push(L.grossTotal);
			}
			$myChart.CHARS(w1,{type:'bar',_yformat:'$',_title:'Rentabilidad',data:{
				labels:cLabels,
				datasets:[
					{data:cData[1],type:'line',label:'Rentabilidad',borderColor:$bgColor.blue,backgroundColor:$bgColor.blue,fill:false},
					{data:cData[0],type:'bar',label:'Base',backgroundColor:$bgColor.yellow2}
				]
			}});
		},
	},$M.Ht.cont);
	},
	gerence:function(){
		$Api.Rep.base({f:Api.Gvt.pr+'rep/gerence',inputs:$1.G.filter(),
		V_G:function(Jr,cont){
			var w1=$1.T.tbExport(null,{down:'N',print:'Y'},cont);
			var tb=$1.t('table',{'class':'table_zh'},w1);
			tr=$1.t('tr',0,tb);
			$1.t('th',{textNode:'Facturado'},tr);
			$1.t('td',{textNode:$Str.money(Jr.inv.docTotal)},tr);
			var tdChart=$1.t('td',{rowspan:4},tr);
			tr=$1.t('tr',0,tb);
			perc='('+$js.perc(Jr.inv.grossTotal,Jr.inv.baseAmnt,0)+')';
			$1.t('th',{textNode:'- Impuestos'},tr);
			$1.t('td',{textNode:$Str.money(Jr.inv.vatSum-Jr.inv.rteSum)},tr);
			tr=$1.t('tr',0,tb);
			$1.t('th',{textNode:'\'= Base facturacion'},tr);
			$1.t('td',{textNode:$Str.money(Jr.inv.baseAmnt)},tr);
			tr=$1.t('tr',0,tb);
			$1.t('th',{textNode:'Utilidad Bruta'},tr);
			$1.t('td',{textNode:$Str.money(Jr.inv.grossTotal)+'\n'+perc,'class':'pre'},tr);
			$myChart.CHARS(tdChart,{type:'pie',_title:'Base Facturacion',data:{
				labels:['Costo','Utilidad'],
				datasets:[{data:[(Jr.inv.baseAmnt-Jr.inv.grossTotal),Jr.inv.grossTotal],
					backgroundColor:['#FF0','#0F0']
				}]
			}});

			$1.t('h3',{textNode:'Condiciones de Pago','class':'divLineTitleSection'},cont);
			var tb=$1.t('table',{'class':'table_zh'},cont);
			for(var i in Jr.inv.L){ var L=Jr.inv.L[i];
				tr=$1.t('tr',0,tb);
				$1.t('td',{textNode:_g(L.pymId,$Tb.gfiOpym)},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
			}
			$1.t('h3',{textNode:'Ingresos y Gastos','class':'divLineTitleSection'},cont);
			var tb=$1.T.table(['','Ingreso','Gasto','Diferencia'],0,cont);
			tBody=$1.t('tbody',0,tb);
			tr=$1.t('tr',0,tb);
			$1.t('th',{textNode:'Total'},tr);
			$1.t('td',{textNode:$Str.money(Jr.ing),'class':'bf-success',style:'minWidth:120px'},tr);
			$1.t('td',{textNode:$Str.money(Jr.egr),'class':'bf-danger',style:'minWidth:120px'},tr);
			$1.t('td',{textNode:$Str.money(Jr.ing-Jr.egr)},tr);
			tr=$1.t('tr',{style:'backgroundColor:#CCC'},tb);
			$1.t('th',{textNode:'Cuenta'},tr);
			$1.t('th',{textNode:' ',colspan:3},tr);
			for(var i in Jr.accL){ var L=Jr.accL[i];
				tr=$1.t('tr',0,tb);
				$1.t('td',{textNode:L.accName},tr);
				$1.t('td',{textNode:$Str.money(L.creBal)},tr);
				$1.t('td',{textNode:$Str.money(L.debBal)},tr);
				$1.t('td',{textNode:$Str.money(L.creBal-L.debBal)},tr);
			}
		},
		V_M:function(Jr,cont){
			var w1=$1.T.tbExport(null,{down:'Y',print:'Y'},cont);
			var tBody=$1.T.table(['Periodo','Facturado','-Impuestos','\'=Base','Util. Bruta','%'],{rBody:true},w1);
			var cLabels=[]; var cData=[[],[]];
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.period},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
				$1.t('td',{textNode:$Str.money(L.vatSum-L.rteSum)},tr);
				$1.t('td',{textNode:$Str.money(L.baseAmnt)},tr);
				$1.t('td',{textNode:$Str.money(L.grossTotal)},tr);
				$1.t('td',{textNode:$js.perc(L.grossTotal,L.baseAmnt)},tr);
				cLabels.push(L.period);
				cData[0].push(L.baseAmnt);
				cData[1].push(L.grossTotal);
			}
			$myChart.CHARS(cont,{type:'bar',_yformat:'$',_xformat:'mmm y',_title:'Facturación por Mes',data:{
				labels:cLabels,
				datasets:[
					{data:cData[1],type:'line',label:'Utilidad',borderColor:'green',fill:false},
					{data:cData[0],type:'bar',label:'Base'}
				]
			}});
		}
	},$M.Ht.cont);
	}
}

/* Finanzas */
$V.gfiAccListView=[{k:'sep',v:'Toda la Información'},{k:'doc',v:'Documento'},{k:'cdcId',v:'Centro Costo'},{k:'cardId',v:'Tercero'}];
$V.gfiPayTypeI=[{k:'F',v:'Pago Facturas',type:'N'},{k:'G',v:'Otros Ingresos',type:'N'},{k:'E',v:'Especial'}];

_Fi['finRep.ing']=function(wrap){
	var jsV = 'jsFiltVars';
	opt1={C:'Consolidado',DAY:'Por Dia',
	CC:'Por Tercero',CDAY:'Tercero y Dia',
	LC:'Categoria',DOC:'Detallado'};
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV,name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Inicial',I:{tag:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Corte',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Tipo',I:{tag:'select','class':jsV,name:'A.payType',opts:$V.gfiPayTypeI}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Categoria',I:{tag:'select','class':jsV,name:'B.lineClass',opts:$Tb.gfiOtie,kIf:{vType:'I'}}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Tercero',Inode:$1.lTag({tag:'crd',jsF:jsV})},divL);
	$1.T.btnSend({textNode:'Actualizar', func:Gfi.Rep.ing},wrap);
};

Gvt.Rcv={
OLg:function(L){
	var Li=[];
	var Li=[];
	var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.b+'rcv',tbSerie:'gvtRcv'});
	ab.add('v');
	ab.add('AC'); ab.add('L');
	ab.add('N',{addText:'Los saldos pendientes de las facturas se actualizaran.'});
	return $Opts.add('gvtRcv',Li,L);
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.b+'rcv',inputs:$1.G.filter(),
	main:Gvt.Rcv.OLg,view:'Y',docBy:'userDate',
	tbSerie:'gvtRcv',
	TD:[
	{H:'Estado',k:'docStatus',_g:$V.docStatus},
	{H:'Tipo',k:'payType',_g:$V.gfiPayTypeI},
	{H:'Fecha',k:'docDate',dateText:'mmm d'},
	{H:'Valor Pago',k:'bal',format:'$'},
	{H:'Tercero',k:'cardName'},
	{H:'Detalles',k:'lineMemo'}
	]
	},cont);
},
form:function(){
	var cont=$M.Ht.cont; var jsF=$Api.JS.cls;
	var Pa=$M.read();
	var D={};
	var card=$1.lTag({tag:'card','class':'_crd',cardType:'C',funcAll:function(){
		reLoa();
	}});
	function midContf (Jr,cont){ $1.t('div',{'class':'midCont'},cont); }
	$Api.form2({api:Api.Gvt.b+'rcv/invs',AJs:D.AJs,PUTid:Pa.docEntry,JrD:D,vidn:'docEntry',to:'gvtRcv.view',midCont:midContf,
		tbH:[
		{divLine:1,req:'Y',wxn:'wrapx8',L:'Serie',I:{xtag:'docSeries',tbSerie:'gvtRcv',jsF:jsF}},
		{L:'Fecha',req:'Y',wxn:'wrapx8',I:{tag:'date','class':jsF,name:'docDate',value:D.docDate}},
		{L:'Tercero',req:'Y',wxn:'wrapx4',Inode:card},
		{L:'Tipo',wxn:'wrapx8',req:'Y',I:{lTag:'select','class':jsF+' _payType',name:'payType',opts:$V.gfiPayTypeI,selected:D.payType}},
		{wxn:'wrapx8',L:'Centro Costo',I:{lTag:'select',name:'cdcId',opts:$Tb.gfiOcdc,'class':jsF}},
		{divLine:1,wxn:'wrapx8',L:'Valor pagado',I:{lTag:'$',name:'bal', class:jsF+' _bal js_payment_total_amount'}},
		{wxn:'wrapx4',L:'Metodo Pago',req:'Y',I:{lTag:'select',name:'fpId',opts:$Tb.gfiOfdp,'class':jsF+' _banId'}},
		{L:'Detalles',wxn:'wrapx2',I:{lTag:'textarea','class':jsF,name:'lineMemo',value:D.lineMemo}},
		],
		reqFields:{
			D:[{k:'docDate',iMsg:'Fecha'},{k:'payType',iMsg:'Tipo Pago'},{k:'cardId',iMsg:'Tercero'}
			],
			L:[{k:'creBal',iMsg:'Valor'}]
		},
	},cont);
	let midCont= DomUtils.getElement('.midCont', cont);
	var crd=$1.q('._crd');
	var payType=$1.q('._payType');
	payType.onchange=function(){
		var tv=$1.G.sel(payType).value;
		reLoa(tv, cont);
	}
	function reLoa(tv, context){
		midCont.innerHTML='';
		if(tv=='E'){
			function trA(){
				var tr=$1.t('tr',{'class':$Api.JS.clsL+' '+tbCal._row},tBody);
				var td=$1.t('td',0,tr);
				$1.Move.btns({},td);
				Gfi.Fx.inpSea({jsF:jsFL},$1.t('td',0,tr));
				var inpPrice=$1.lTag({tag:'$','class':jsFL+' _bals '+tbCal._cell,ncol:1,name:'creBal',style:'width:100px',min:0},$1.t('td',0,tr));
				inpPrice.keyChange((T)=>{ tbCal.sumCells(tb) });
				$1.lTag({tag:'input','class':jsFL,name:'lineMemo',maxLen:200,style:'width:250px'},$1.t('td',0,tr));
				$1.lineDel(L,{},$1.t('td',0,tr));
			}
			var jsFL=$Api.JS.clsLN;
			var tds=['','Cuenta','Valor','Detalles',''];
			var tb=$1.T.table(tds);
			$1.T.fieset({L:{textNode:'Lineas'}},midCont,tb);
			var tBody=$1.t('tbody',{},tb);
			var trFoot=$1.t('tr',0,$1.t('tfoot',{},tb));
			var tdFoot=$1.t('td',{colspan:2},trFoot);
			$1.t('td',{'class':tbCal._cell+'_1',format:'$'},trFoot);
			$1.t('td',0,trFoot);
			$1.T.btnFa({faBtn:'fa_plusCircle',textNode:'Añadir Nuevo',func:trA},tdFoot);
			trA();
		}
		else if(tv=='F'){
			var tb=$1.T.table(['','#','Documento','Vencimiento','Valor Total','Saldo Pendiente','Valor a Pagar',{textNode:'F.E',_i:'Factura Electronica'}]);
			$1.T.fieset({L:{textNode:'Facturas Pendiendes de Pagar'}},midCont,tb);
			var tBody=$1.t('tbody',{},tb);
			if(crd.AJs && crd.AJs.cardId){ Gvt.Rcv.getInvs(crd.AJs,tBody, context); }
			else{ $Api.resp(tBody,{text:'Se debe definir un tercero'}); }
		}
		else if(tv=='G'){
			var jsFL=$Api.JS.clsLN;
			var tb=$1.T.table(['Categoria','Valor Pago','Detalles','']);
			$1.T.fieset({L:{textNode:'Lineas de Ingresos'}},midCont,tb);
			var tBody=$1.t('tbody',{},tb);
			var trFoot=$1.t('tr',0,$1.t('tfoot',{},tb));
			var tdFoot=$1.t('td',0,trFoot);
			$1.t('td',{'class':tbCal._cell+'_1',format:'$'},trFoot);
			$1.t('td',0,trFoot);
			$1.T.btnFa({faBtn:'fa_plusCircle',textNode:'Añadir Nuevo',func:trA},tdFoot);
			function trA(){
				var tr=$1.t('tr',{'class':$Api.JS.clsL+' '+tbCal._row},tBody);
				$1.lTag({tag:'select','class':jsFL,name:'lineClass',opts:$Tb.gfiOtie,kIf:{vType:'I'},AJs:['accId'],style:'width:250px'},$1.t('td',0,tr));
				var inpPrice=$1.lTag({tag:'$','class':jsFL+' '+tbCal._cell,ncol:1,name:'creBal',style:'width:100px'},$1.t('td',0,tr));
				inpPrice.keyChange(()=>{ tbCal.sumCells(tb) });
				$1.lTag({tag:'input','class':jsFL,name:'lineMemo',maxLen:200,style:'width:250px'},$1.t('td',0,tr));
				$1.lineDel({},{},$1.t('td',0,tr));
			}
			trA();
		}
		//retenciones
		function trARte(){
			var jsFL=$Api.JS.clsLN;
			var tr=$1.t('tr',{'class':$Api.JS.clsL+' '+tbCal._row,jsk:'LR'},tBody2);
			var td=$1.t('td',0,tr);
			$1.Move.btns({},td);
			$1.lTag({tag:'select','class':jsFL,name:'rteId',opts:$Tb.otaxR,AJs:['rate']},$1.t('td',0,tr)).onchange=function(){ cambio(tr); };
			var inpPrice=$1.lTag({tag:'$','class':jsFL+' _debBal',name:'debBal',style:'width:100px',min:0},$1.t('td',0,tr));
			inpPrice.keyChange((T)=>{ cambio(tr); });
			$1.t('td',{'class':'_balApply '+tbCal._cell,ncol:1},tr);
			$1.lineDel(L,{},$1.t('td',0,tr));
			function cambio(tr){
				var val=$1.G.sel($1.q('select',tr)).value;
				rate=_gO(val,$Tb.otaxR);
				rate=(rate && rate.rate)?rate.rate*1/100:0;
				$1.q('._balApply',tr).innerText=$1.q('._debBal').value*rate;
				tbCal.sumCells(tb)
			}
		}
		$1.t('h4',{textNode:'Registrar Retenciones'},midCont);
		var tds=['','Concepto','Base','Valor Retenido',''];
		var tb=$1.T.table(tds);
		$1.T.fieset({L:{textNode:'Retenciones'}},midCont,tb);
		var tBody2=$1.t('tbody',{},tb);
		var trFoot2=$1.t('tr',0,$1.t('tfoot',{},tb));
		var tdFoot2=$1.t('td',{colspan:3},trFoot2);
		$1.t('td',{'class':tbCal._cell+'_1',format:'$'},trFoot2);
		$1.t('td',0,trFoot2);
		$1.T.btnFa({faBtn:'fa_plusCircle',textNode:'Añadir Nueva',func:trARte},tdFoot2);
	}
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.b+'rcv/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var midCont=$1.t('div');
			if(Jr.payType=='F'){
				var tb=$1.T.table(['Valor','Concepto','Medio Pago','Cuenta']);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:$Str.money(L.creBal)},tr);
					$1.t('td',{textNode:'Pago Factura #'+$Doc.docNumTr(L,null,true)},tr);
					$1.t('td',{textNode:_g(L.fpMethod,$V.gfiFdpMethod)},tr);
					$1.t('td',{textNode:$Acc.Txt.fName(L)},tr);
				}
			}
			else if(Jr.payType=='G'){
				var tb=$1.T.table(['Valor','Concepto','Método Pago','Cuenta','Detalles']);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:$Str.money(L.creBal)},tr);
					$1.t('td',{textNode:_g(L.lineClass,$Tb.gfiOtie)},tr);
					$1.t('td',{textNode:_g(L.fpMethod,$V.gfiFdpMethod)},tr);
					$1.t('td',{textNode:$Acc.Txt.fName(L)},tr);
					$1.t('td',{textNode:L.lineMemo},tr);
				}
			}
			else if(Jr.payType=='E'){
				var tb=$1.T.table(['Cuenta','Valor','Medio Pago','Cuenta','Detalles']);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:$Acc.Txt.fName({accCode:L.saccCode,accName:L.saccName})},tr);
					$1.t('td',{textNode:$Str.money(L.creBal)},tr);
					$1.t('td',{textNode:_g(L.fpMethod,$V.gfiFdpMethod)},tr);
					$1.t('td',{textNode:$Acc.Txt.fName(L)},tr);
					$1.t('td',{textNode:L.lineMemo},tr);
				}
			}
			tb.classList.add('table_x100');
			$1.T.fieset({L:{textNode:'Lineas'}},midCont,tb);


		var tP={tbSerie:'gvtRcv',D:Jr, main:Gvt.Rcv.OLg,midCont:midCont,
		THs:[
			{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{k:'cdcId',_g:$Tb.gfiOcdc,ln:1,cs:2},
			{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
			{t:'Tipo',k:'payType',_g:$V.gfiPayTypeI},
			{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},
			{t:'Pagado por'},{k:'cardName',ln:1,cs:7},
			{t:'El valor de',k:'bal',cs:2,format:'$'},
			{k:'bal',format:'num2Text',ln:1,cs:5},
			{k:'lineMemo',cs:8,v:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1}
		]
		};
		$Doc.view(cont,tP);
	}});
}
}

Gvt.Rcv.getInvs=function(Px, tBody, context){
	$Api.get({f:Api.Gvt.b+'rcv/invs',inputs:'cardId='+Px.cardId,loade:tBody,func:function(Jr){
		{ var n=1;
			var jsF=$Api.JS.clsLN;
			$Api.foreach(Jr.L,function(L){
				let tr = DomElement.create('tr',{'class': [$Api.JS.clsL, tbCal._row]})
				tBody.appendChild(tr)
				let payCheck = DomElement.create('checkbox', {
					'class': [jsF, 'js_payment_check'],
					name: 'payTo'
				})
				$1.t('td', 0, tr).appendChild(payCheck)
				$1.t('td',{textNode:n},tr); n++;
				var docNum=(L.dfeNumber)?{textNode:L.dfeNumber}:{node:$Doc.docNumTr(L)};
				$1.t('td',docNum,tr);
				$1.t('td',{textNode:L.dueDate},tr);
				$1.t('td',{textNode:$Str.money(L.debBal)},tr);
				$1.t('td',{textNode:$Str.money(L.debBalDue)},tr);
				var td=$1.t('td',0,tr);
                $1.lTag({
                    tag: '$',
                    'class': jsF + ' ' + tbCal._cell + ' val js_payment_amount',
                    ncol: 1,
                    name: 'creBal',
                    min: 0,
                    max: L.debBalDue,
                    placeholder: L.debBalDue * 1,
                    amount_due: L.debBalDue * 1,
                    AJs: {acId: L.acId},
                    onkeychange: function () {
                        tbCal.sumCells(tBody);
                    }
                }, td);
				$1.t('td',{textNode:L.dfeNumber},tr);
			});
			var tr=$1.t('tr',0,tBody);
			let tdTotal = $1.t('td',{colspan:6,textNode:'Total'},tr);
			tdTotal.appendChild(DomElement.create('span', {'class': ['js_payment_balance_amount']}));
			n++;
			$1.t('td',{'class':tbCal._cell+'_1',format:'$'},tr);
			new PaymentsInvoiceSubscription(context);
		}
	}});
}


$M.registerUrls({module: CNF.MDL.GVT_SELL}, [
	{_lineText: 'Ventas'},
	{MKEY: CNF.URL.GVT_REP_RENTA, ini: {f: 'gvtRep.renta'}},
	{MKEY: CNF.URL.GVT_REP_SIN, ini: {f: 'gvtRep.sin'}},
	{MKEY: CNF.URL.GVT_REP_SOR, ini: {f: 'gvtRep.sor'}},
	{MKEY: CNF.URL.GVT_REP_GEREN, ini: {f: 'gvtRep.gerence'}},

	{MKEY: CNF.URL.GVT_SOP, ini: {f: 'gvtSop', btnGo: CNF.URL.GVT_SOP_FORM.id, gyp: Gvt.Cvt.get}},
	{MKEY: CNF.URL.GVT_SOP_FORM, ini: {g: Gvt.Cvt.form}},
	{MKEY: CNF.URL.GVT_SOP_VIEW, ini: {g: Gvt.Cvt.view}},

	{MKEY: CNF.URL.GVT_SOR, ini: {f: 'gvtSor', btnGo: CNF.URL.GVT_SOR_FORM.id, gyp: Gvt.Sor.get}},
	{MKEY: CNF.URL.GVT_SOR_FORM, ini: {g: Gvt.Sor.form}},
	{MKEY: CNF.URL.GVT_SOR_VIEW, ini: {g: Gvt.Sor.view} },
	{MKEY: CNF.URL.GVT_SOR_VIEW_OPEN, ini: {g: Gvt.Sor.openQty}},

	{MKEY: CNF.URL.GVT_SDN, ini: {f: 'gvtSdn', btnGo: CNF.URL.GVT_SDN_FORM.id, gyp: Gvt.Sdn.get}},
	{MKEY: CNF.URL.GVT_SDN_FORM, ini: {g: Gvt.Sdn.form}},
	{MKEY: CNF.URL.GVT_SDN_VIEW, ini:{g:Gvt.Sdn.view}},

	{MKEY: CNF.URL.GVT_SNC, ini:{f:'gvtSnc', btnGo: CNF.URL.GVT_SNC_FORM.id, gyp:Gvt.Snc.get}},
	{MKEY: CNF.URL.GVT_SNC_FORM, ini:{g:Gvt.Snc.form}},
	{MKEY: CNF.URL.GVT_SNC_VIEW, ini:{g:Gvt.Snc.view}},

	{MKEY: CNF.URL.GVT_SND, ini:{f:'gvtSnd',btnGo: CNF.URL.GVT_SND_FORM.id, gyp:Gvt.Snd.get}},
	{MKEY: CNF.URL.GVT_SND_FORM, ini:{g:Gvt.Snd.form}},
	{MKEY: CNF.URL.GVT_SND_VIEW, ini: {g:Gvt.Snd.view}},
]);

$M.registerUrls({module: CNF.MDL.GVT_SELL_PAYMENT}, [
	{_lineText:'Pagos Recibidos'},
	{MKEY: CNF.URL.GVT_RCV, ini: {btnGo: CNF.URL.GVT_RCV_FORM.id, f:'gvtRcv', gyp:function(){ Gvt.Rcv.get()}}},
	{MKEY: CNF.URL.GVT_RCV_VIEW, ini:{g:function(){ Gvt.Rcv.view(); } }},
	{MKEY: CNF.URL.GVT_RCV_FORM, ini:{g:function(){ Gvt.Rcv.form(); }}}
])
