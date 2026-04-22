
$oB.push($V.docTT,[
{k:'gvtPor',v:'Orden Compra'},{k:'gvtPdn',v:'Remision Compra'},{k:'gvtPrd',v:'Devolución Compra'},
{k:'gvtPin',v:'Factura Compra'},{k:'gvtPnc',v:'Nota Crédito Compra'},{k:'gvtPnd',v:'Nota Débito Compra'},
{k:'gvtRce',v:'Pagos Realizados'}
]);

$V.gfiPayTypeG=[{k:'F',v:'Pago Facturas',type:'N'},{k:'G',v:'Gastos Generales',type:'N'},{k:'E',v:'Especial'}];

$V.Mdls.gvtPur={t:'Compras',ico:'fa fa-shopping-cart'};

_Fi['gvtPor']=function(wrap){ $Doc.filtForm({func:Gvt.Por.get,docEntry:'N',tbSerie:'gvtPor'},wrap); };
_Fi['gvtPdn']=function(wrap){ $Doc.filtForm({func:Gvt.Pdn.get,docEntry:'N',tbSerie:'gvtPdn'},wrap); };
_Fi['gvtPin']=function(wrap){ $Doc.filtForm({func:Gvt.Pin.get,docEntry:'N',tbSerie:'gvtPin'},wrap); };
_Fi['gvtPrd']=function(wrap){ $Doc.filtForm({func:Gvt.Prd.get,docEntry:'N',tbSerie:'gvtPrd'},wrap); };
_Fi['gvtPnc']=function(wrap){ $Doc.filtForm({func:Gvt.Pnc.get,tbSerie:'gvtPnc'},wrap); };
_Fi['gvtPnd']=function(wrap){ $Doc.filtForm({func:Gvt.Pnd.get,tbSerie:'gvtPnd'},wrap); };
_Fi['gvtRce']=function(wrap){
	$Doc.filter({func:Gvt.Rce.get},
	[{k:'d1'},{k:'d2'},{tbSerie:'gvtRce'},{k:'docNum'},{k:'card',f:'C.cardName'}, {k:'docStatus'},{k:'ordBy'}
	],wrap);
};
_Fi['gvtRep.pin']=function(wrap){
	var jsV = 'jsFiltVars';
	opt1=[{k:'G',v:'General'},{k:'I',v:'Articulo'} ,
	{k:'C',v:'Por Tercero'} ,{k:'CD',v:'Tercero / Dia'},
	{k:'D',v:'Por Dia'},{k:'DO',v:'Por Documento'}
	];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV,name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	$1.viewRangFilter(divL,{selected:'M'});
	$1.T.divL({wxn:'wrapx4', L:'Tercero',I:{lTag:'input','class':jsV,name:'C.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Documentos',I:{lTag:'select','class':jsV,name:'docsView',opts:[{k:'FV',v:'Solo Facturas'},{k:'FN',v:'Facturas y Notas'}],noBlank:'Y'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Gvt.Rep.pin(); }},wrap);
};

Gvt.Por={
OLg:function(L){
	var Li=[];
	var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.js+'por',tbSerie:'gvtPor'});
	ab.add('v');
	ab.add('E',{canEdit:(L.docStatus=='D')});
	if(L.docStatus=='D'){
		Li.push({k:'statusO',ico:'fa fa-paper-plane-o',textNode:' Marcar como abierta', P:L, func:function(T){ $Doc.statusDefine({reqMemo:'N',docEntry:T.P.docEntry,api:Api.Gvt.js+'por/statusOpen',text:'La orden va a ser abierta.'}); } });
	}
	ab.add('copy',{plus:'Y',btnText:' Generar Entrega',copy:{to:'gvtPdn.form',f:Api.Gvt.js+'por/toCopy',inputs:'docEntry='+L.docEntry,AJs:[{k:'ott',v:'gvtPor'},{k:'otr',v:L.docEntry}]}});
	ab.add('C'); ab.add('N'); ab.add('R'); ab.add('L');
	return $Opts.add('gvtPor',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Por.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.js+'por',inputs:$1.G.filter(),
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
	var D=$Cche.d(0,{});
	var cont=$M.Ht.cont;
	var AJs={}; var Pa=$M.read();
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	$Api.get({f:Api.Gvt.js+'por/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr){ D=Jr; }
		if(!D.docDate){ D.docDate=$2d.today; }
		var crdVal=(D.cardId)?D.cardName:'';
		$Doc.form({tbSerie:'gvtPor',docEdit:Pa.docEntry,cont:cont,POST:Api.Gvt.js+'por',func:D.func,
		HLs:[
			{lTag:'card',L:'Cliente',wxn:'wrapx3',req:'Y',I:{cardType:'S',topPare:cont,D:D,fie:'pymId,rteIva,rteIca',AJsPut:['cardName']}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
			{lTag:'date',L:'Vencimiento',wxn:'wrapx8',req:'Y',I:{name:'dueDate',value:D.dueDate}},
			{lTag:'select',L:'Condic. Pago',req:'Y',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,'class':$Api.Sea.clsBox,k:'pymId'}},
			{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
		tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',uniqLine:'Y',L:D.L,itmSea:'buy',bCode:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
		kTb:'gvtItmL',AJs:[{k:'buyFactor',a:'numFactor'}],
		kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine'
		}
		});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.js+'por/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		var tP={tbSerie:'gvtPor',D:Jr,
			main:Gvt.Por.OLg,
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha Entrega',k:'dueDate'},
				{k:'pymId',_gTb:'gfiOpym',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'whsId',_gTb:'itmOwhs',ln:1,cs:2},
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
				{t:'Total',k:'priceLine',format:'$'}
			]}
			],
			docTotals:'Y'
		};
		$Doc.view(cont,tP);
	}});
},
}
Gvt.Pdn={
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtPdn','v',T.P,1); } }; n++;
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.js+'pdn/tb99',serieType:'gvtPdn',docEntry:T.P.docEntry}); } }; n++;
	if(L.docStatus!='N'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.js+'pdn/statusCancel',text:'Se va anular el documento. Las cantidades ingresadas en inventario serán reversadas.'}); } }; n++;
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
	$Doc.tbList({api:Api.Gvt.js+'pdn',inputs:$1.G.filter(),
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
	var D=$Cche.d(0,{});
	var cont=$M.Ht.cont;
	var jsF=$Api.JS.cls;
	var AJsL=(D.AJsL)?D.AJsL:[];
	AJsL.push({k:'lineTr',a:'lineTr'});
	AJsL.push({k:'buyFactor',a:'numFactor'});
	if(!D.docDate){ D.docDate=$2d.today; }
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	$Doc.form({ tbSerie:'gvtPdn',cont:cont,jsF:jsF,POST:Api.Gvt.js+'pdn',AJs:D.AJs,
	HLs:[
		{lTag:'card',L:'Cliente',wxn:'wrapx4',req:'Y',I:{cardType:'S',topPare:cont,D:D,fie:'pymId,rteIva,rteIca',AJsPut:['cardName']}},
		{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
		{lTag:'date',L:'Vencimiento',wxn:'wrapx8',req:'Y',I:{name:'dueDate',value:D.dueDate}},
		{lTag:'select',L:'Condic. Pago',req:'Y',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,'class':$Api.Sea.clsBox,k:'pymId'}},
		{lTag:'select',L:'Almacen',req:'Y',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
		//{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
		{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
	],
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'buyIvt',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
	kTb:'gvtItmL',AJs:AJsL,
	kFie:'itemCode,itemName,price,quantity,udm,priceLine'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.js+'pdn/'+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		var tP={tbSerie:'gvtPdn',D:Jr,
			btnsTop:{ks:'print,logs,statusN,viewDac,',icons:'Y',Li:Gvt.Pdn.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Vencimiento',k:'dueDate'},
				{k:'pymId',_gTb:'gfiOpym',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',ln:1,cs:4},{k:'whsId',_gTb:'itmOwhs',cs:2,ln:1},
				{k:'ref1'},{k:'ref2',ln:1},{v:'',cs:6,ln:1},
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
				{t:'Total',k:'priceLine',format:'$'}
			]}
			],
			docTotals:'Y'
		};
		$Doc.view(cont,tP);
	}});
},
}
Gvt.Pin={
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtPin','v',T.P,1); } }; n++;
	if(L.canceled=='N'){
		Li[n]={k:'pay',ico:'fa fa-money',textNode:' Registrar Pago', P:L, func:function(T){ $Doc.go('gvtRce','toInv',T.P,1); } }; n++;
	}
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.js+'pin/tb99',docEntry:T.P.docEntry}); } }; n++;
	if(L.docStatus!='N'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.js+'pin/statusCancel',text:'Se va anular el documento. Las cantidades ingresadas en inventario serán reversadas.'}); } }; n++;
	}
return $Opts.add('gvtPin',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Pin.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.js+'pin',inputs:$1.G.filter(),
	fOpts:Gvt.Pin.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtPin',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Fecha',k:'docDate'},
		{H:'Proveedor',k:'cardName'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Facturas de Compra'}
	},cont);
},
form:function(){
	// TODO: no carga desde aca librerias, deprecar llamado
	var D=$Cche.d(0,{});
	var cont=$M.Ht.cont;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	if(!D.docDate){ D.docDate=$2d.today; }
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	$Doc.form({tbSerie:'gvtPin',calcDue:'Y',cont:cont,POST:Api.Gvt.js+'pin',func:D.func,
	HLs:[
		{lTag:'card',L:'Cliente',wxn:'wrapx4',req:'Y',I:{cardType:'S',topPare:cont,D:D,fie:'pymId,rteIva,rteIca',AJsPut:['cardName']}},
		{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
		{lTag:'select',L:'Condic. Pago',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,'class':$Api.Sea.clsBox+' '+$Doc.Fx.clspymId,k:'pymId'}},
		{lTag:'date',L:'Vencimiento',wxn:'wrapx8',req:'Y',I:{name:'dueDate',value:D.dueDate,'class':$Doc.Fx.clsdueDate}},
		{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
		{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
		$V.tagFromDlv,
		{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
	],
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'buy',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
	kTb:'gvtItmL',AJs:[{k:'buyFactor',a:'numFactor'}],
	kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,lineText'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.js+'pin/'+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'gvtPin',D:Jr,
			btnsTop:{ks:'print,logs,statusN,pay,viewDac,',icons:'Y',Li:Gvt.Pin.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Vencimientos',k:'dueDate'},
				{k:'pymId',_gTb:'gfiOpym',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},
				{k:'whsId',_gTb:'itmOwhs',ln:1,cs:2},
				{k:'ref1',cs:2},{k:'ref2',ln:1,cs:2},{v:'',cs:4,ln:1},
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
			docTotals:'Y'
		};
		$Doc.view(cont,tP);
	}});
},
}
Gvt.Prd={
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtPrd','v',T.P,1); } }; n++;
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.js+'prd/tb99',serieType:'gvtPrd',docEntry:T.P.docEntry}); } }; n++;
	if(L.docStatus!='N'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.js+'prd/statusCancel',text:'Se va anular el documento. Las cantidades ingresadas en inventario serán reversadas.'}); } }; n++;
	}
return $Opts.add('gvtPrd',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Prd.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.js+'prd',inputs:$1.G.filter(),
	fOpts:Gvt.Prd.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtPrd',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Fecha',k:'docDate'},
		{H:'Proveedor',k:'cardName'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Devolución de Mercancia'}
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
	$Doc.form({ tbSerie:'gvtPrd',cont:cont,jsF:jsF,POST:Api.Gvt.js+'prd',func:D.func,
	HLs:[
		{lTag:'card',L:'Cliente',wxn:'wrapx4',req:'Y',I:{cardType:'S',topPare:cont,D:D,fie:'rteIva,rteIca',AJsPut:['cardName']}},
		{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
		{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
		{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
		{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
	],
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'buyIvt',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
	kTb:'gvtItmL',AJs:[{k:'buyFactor',a:'numFactor'}],
	kFie:'itemCode,itemName,price,quantity,udm,priceLine,lineText'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.js+'prd/'+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'gvtPrd',D:Jr,
			btnsTop:{ks:'print,logs,statusN,viewDac,',icons:'Y',Li:Gvt.Prd.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
				{v:' ',cs:2},
				{k:'whsId',_gTb:'itmOwhs',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',ln:4},
				{k:'ref1'},{k:'ref2',ln:1},{v:'',cs:6,ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Total',k:'priceLine',format:'$'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			docTotals:'Y'
		};
		$Doc.view(cont,tP);
	}});
},
}
Gvt.Pnc={
OLg:function(L){
	var Li=[]; var n=0;
	Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtPnc','v',T.P,1); } });
	Li.push({k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.js+'pnc/tb99',docEntry:T.P.docEntry}); } });
	if(L.canceled=='N-NO PERMITIDO'){
		Li.push({k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Gvt.js+'pnc/statusCancel',text:'Se va anular el documento.'}); } });
	}
	return $Opts.add('gvtPnc',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Pnc.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.js+'pnc',inputs:$1.G.filter(),
	fOpts:Gvt.Pnc.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtPnc',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Fecha',k:'docDate'},
		{H:'Proveedor',k:'cardName'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Nota Débito Proveedor'}
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
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	$Doc.form({ tbSerie:'gvtPnc',cont:cont,jsF:jsF,POST:Api.Gvt.js+'pnc',func:P.func,
	HLs:[
		{lTag:'card',L:'Cliente',wxn:'wrapx4',req:'Y',I:{cardType:'S',topPare:cont,D:D,fie:'pymId,rteIva,rteIca',AJsPut:['cardName']}},
		{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
		{lTag:'select',L:'Condic. Pago',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,'class':$Api.Sea.clsBox,k:'pymId'}},
		{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
		{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
		{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		$V.tagFromDlv,
		{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
	],
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'buy',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
	kTb:'gvtItmL',AJs:[{k:'buyFactor',a:'numFactor'}],
	kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,lineText'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.js+'pnc/'+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'gvtPnc',D:Jr,
			btnsTop:{ks:'print,logs,statusN,viewDac,',icons:'Y',Li:Gvt.Pnc.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
				{k:'pymId',_gTb:'gfiOpym',cs:2},
				{v:'.',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',ln:1,cs:4},{k:'whsId',_gTb:'itmOwhs',ln:1,cs:2},
				{k:'ref1',cs:2},{k:'ref2',ln:1,cs:2},{v:'',cs:4,ln:1},
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
			docTotals:'Y'
		};
		$Doc.view(cont,tP);
	}});
},
}
Gvt.Pnd={
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtPnd','v',T.P,1); } }; n++;
	Li[n]={k:'logs',ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.js+'pnd/tb99',serieType:'gvtPnd',docEntry:T.P.docEntry}); } }; n++;
	if(L.canceled=='N-NO PERMITIDO'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.js+'pnd/statusCancel',text:'Se va anular el documento. Las cantidades ingresadas en inventario serán reversadas.'}); } }; n++;
	}
return $Opts.add('gvtPnd',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gvt.Pnd.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gvt.js+'pnd',inputs:$1.G.filter(),
	fOpts:Gvt.Pnd.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtPnd',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Fecha',k:'docDate'},
		{H:'Proveedor',k:'cardName'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Nota Débito Proveedor'}
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
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	$Doc.form({ tbSerie:'gvtPnd',cont:cont,jsF:jsF,POST:Api.Gvt.js+'pnd',func:P.func,
	HLs:[
		{lTag:'card',L:'Cliente',wxn:'wrapx4',req:'Y',I:{cardType:'S',topPare:cont,D:D,fie:'pymId,rteIva,rteIca',AJsPut:['cardName']}},
		{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
		{lTag:'select',L:'Condic. Pago',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,'class':$Api.Sea.clsBox,k:'pymId'}},
		{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
		{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
		{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
		$V.tagFromDlv,
		{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
	],
	tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'buy',bCode:'Y',uniqLine:'Y',rteIva:D.rteIva,rteIca:D.rteIca,
	kTb:'gvtItmL',AJs:[{k:'buyFactor',a:'numFactor'}],
	kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,lineText'
	}
	});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.js+'pnd/'+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'gvtPnd',D:Jr,
			btnsTop:{ks:'print,logs,statusN,viewDac,',icons:'Y',Li:Gvt.Pnd.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
				{k:'pymId',_gTb:'gfiOpym',cs:2},
				{v:'.',cs:2},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',ln:1,cs:4},{k:'whsId',_gTb:'itmOwhs',ln:1,cs:2},
				{k:'ref1',cs:2},{k:'ref2',ln:1,cs:2},{v:'',cs:4,ln:1},
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
			docTotals:'Y'
		};
		$Doc.view(cont,tP);
	}});
},
}
Gvt.Rce={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.pr+'rce',tbSerie:'gvtRce'});
		ab.add('v'); ab.add('AC'); ab.add('L');
		ab.add('N',{addText:'Los saldos pendientes de las facturas se actualizaran.'});
		return $Opts.add('gvtRce',Li,L);;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Gvt.pr+'rce',inputs:$1.G.filter(),
		main:Gvt.Rce.OLg,view:'Y',docBy:'userDate',
		tbSerie:'gvtRce',
		TD:[
			{H:'Estado',k:'docStatus',_g:$V.dStatus},
			{H:'Fecha',k:'docDate',dateText:'mmm d'},
			{H:'Tipo',k:'payType',_g:$V.gfiPayTypeG},
			{H:'Valor',k:'bal',format:'$'},
			{H:'Tercero',k:'cardName'},
		]
		},cont);
	},
	form:function(){
		var D=$Cche.d(0,{});
		D.docDate=$2d.today;
		var cont =$M.Ht.cont; var Pa=$M.read();
		$Api.get({f:Api.Gvt.pr+'rce/form',loadVerif:!Pa.docEntry,inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			if(Jr.docEntry){ D=Jr; }
			var jsF=$Api.JS.cls;
			var card=$1.lTag({tag:'card','class':'_crd',cardType:'C,S',funcAll:function(){
				reLoa();
			}});
			function midContf (Jr,cont){ $1.t('div',{'class':'midCont'},cont); }
			$Api.form2({api:Api.Gvt.pr+'rce',AJs:D.AJs,PUTid:Pa.docEntry,JrD:D,vidn:'docEntry',to:'gvtRce.view',midCont:midContf,
			tbH:[
				{divLine:1,req:'Y',wxn:'wrapx8',L:'Serie',I:{xtag:'docSeries',tbSerie:'gvtRce',jsF:jsF}},
				{L:'Fecha',req:'Y',wxn:'wrapx8',I:{tag:'date','class':jsF,name:'docDate',value:D.docDate}},
				{L:'Tercero',req:'Y',wxn:'wrapx4',Inode:card},
				{L:'Tipo',wxn:'wrapx8',req:'Y',I:{lTag:'select','class':jsF+' _payType',name:'payType',opts:$V.gfiPayTypeG,selected:D.payType}},
				{wxn:'wrapx8',L:'Centro Costo',I:{lTag:'select',name:'cdcId',opts:$Tb.gfiOcdc,'class':jsF}},
				{divLine:1,wxn:'wrapx8',L:'Valor pagado',I:{lTag:'$',name:'bal','class':jsF+' _bal js_payment_total_amount'}},
				{wxn:'wrapx4',L:'Metodo Pago',req:'Y',I:{lTag:'select',name:'fpId',opts:$Tb.gfiOfdp,'class':jsF+' _banId'}},
				{L:'Detalles',wxn:'wrapx2',I:{lTag:'textarea','class':jsF,name:'lineMemo',value:D.lineMemo}},
			],
			reqFields:{
				D:[{k:'docDate',iMsg:'Fecha'},{k:'payType',iMsg:'Tipo Pago'},{k:'cardId',iMsg:'Tercero'}
				],
				L:[{k:'debBal',iMsg:'Valor'}]
			}
			},cont);
		}});
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
					var inpPrice=$1.lTag({tag:'$','class':jsFL+' _bals '+tbCal._cell,ncol:1,name:'debBal',style:'width:100px',min:0},$1.t('td',0,tr));
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
				var tb=$1.T.table(['','#','Documento','Vencimiento','Valor Total','Saldo Pendiente','Valor a Pagar']);
				$1.T.fieset({L:{textNode:'Facturas Pendiendes de Pagar'}},midCont,tb);
				var tBody=$1.t('tbody',{},tb);
				if(crd.AJs && crd.AJs.cardId){ Gvt.Rce.getInvs(crd.AJs,tBody, context); }
				else{ $Api.resp(tBody,{text:'Se debe definir un tercero'}); }
			}
			else if(tv=='G'){
				var jsFL=$Api.JS.clsLN;
				var tb=$1.T.table(['Categoria','Valor Pago','Detalles','']);
				$1.T.fieset({L:{textNode:'Lineas de Gastos'}},midCont,tb);
				var tBody=$1.t('tbody',{},tb);
				var trFoot=$1.t('tr',0,$1.t('tfoot',{},tb));
				var tdFoot=$1.t('td',0,trFoot);
				$1.t('td',{'class':tbCal._cell+'_1',format:'$'},trFoot);
				$1.t('td',0,trFoot);
				$1.T.btnFa({faBtn:'fa_plusCircle',textNode:'Añadir Nuevo',func:trA},tdFoot);
				function trA(){
					var tr=$1.t('tr',{'class':$Api.JS.clsL+' '+tbCal._row},tBody);
					$1.lTag({tag:'select','class':jsFL,name:'lineClass',opts:$Tb.gfiOtie,kIf:{vType:'E'},AJs:['accId'],style:'width:250px'},$1.t('td',0,tr));
					var inpPrice=$1.lTag({tag:'$','class':jsFL+' '+tbCal._cell,ncol:1,name:'debBal',style:'width:100px'},$1.t('td',0,tr));
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
				var inpPrice=$1.lTag({tag:'$','class':jsFL+' _debBal',name:'creBal',style:'width:100px',min:0},$1.t('td',0,tr));
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
		$Api.get({f:Api.Gvt.pr+'rce/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var midCont=$1.t('div');
			if(Jr.payType=='F'){
				var tb=$1.T.table(['Valor','Concepto','Medio Pago','Cuenta Egreso']);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:$Str.money(L.debBal)},tr);
					$1.t('td',{textNode:'Pago Factura #'+$Doc.docNumTr(L,null,true)},tr);
					$1.t('td',{textNode:_g(L.fpMethod,$V.gfiFdpMethod)},tr);
					$1.t('td',{textNode:$Acc.Txt.fName(L)},tr);
				}
			}
			else if(Jr.payType=='G'){
				var tb=$1.T.table(['Valor','Concepto','Medio Pago','Cuenta Egreso','Detalles']);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:$Str.money(L.debBal)},tr);
					$1.t('td',{textNode:_g(L.lineClass,$Tb.gfiOtie)},tr);
					$1.t('td',{textNode:_g(L.fpMethod,$V.gfiFdpMethod)},tr);
					$1.t('td',{textNode:$Acc.Txt.fName(L)},tr);
					$1.t('td',{textNode:L.lineMemo},tr);
				}
			}
			else if(Jr.payType=='E'){
				var tb=$1.T.table(['Cuenta','Valor','Medio Pago','Cuenta Egreso','Detalles']);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:$Acc.Txt.fName({accCode:L.saccCode,accName:L.saccName})},tr);
					$1.t('td',{textNode:$Str.money(L.debBal)},tr);
					$1.t('td',{textNode:_g(L.fpMethod,$V.gfiFdpMethod)},tr);
					$1.t('td',{textNode:$Acc.Txt.fName(L)},tr);
					$1.t('td',{textNode:L.lineMemo},tr);
				}
			}
			tb.classList.add('table_x100');
			$1.T.fieset({L:{textNode:'Lineas'}},midCont,tb);
			if(Jr.LR.errNo==1){ $Api.resp(midCont,Jr.LR); }
			else if(!Jr.LR.errNo){
				var tb=$1.T.table(['Retención','Base','%','Aplicado']);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.LR){ L=Jr.LR[i];
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:_g(L.vatId,$Tb.otaxR)},tr);
					$1.t('td',{textNode:$Str.money(L.vatBase)},tr);
					$1.t('td',{textNode:L.vatRate*1+'%'},tr);
					$1.t('td',{textNode:$Str.money(L.vatSum)},tr);
				}
				tb.classList.add('table_x100');
				$1.T.fieset({L:{textNode:'Retenciones'}},midCont,tb);
			}
			var tP={tbSerie:'gvtRce',D:Jr, main:Gvt.Rce.OLg,midCont:midCont,
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{k:'cdcId',_g:$Tb.gfiOcdc,ln:1,cs:2},
					{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
					{t:'Tipo',k:'payType',_g:$V.gfiPayTypeG},
					{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},
					{t:'Pagado a'},{k:'cardName',ln:1,cs:7},
					{t:'El valor de',k:'bal',cs:2,format:'$'},
					{k:'bal',format:'num2Text',ln:1,cs:5},
					{k:'lineMemo',cs:8,v:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1}
				]
			};
			$Doc.view(cont,tP);
		}});
	},
	getInvs:function(Px,tBody, context){ //tabla con facturas a pagar
		$Api.get({f:Api.Gvt.pr+'rce/invs',inputs:'cardId='+Px.cardId,loade:tBody,func:function(Jr){
			if(Jr.errNo){ $Api.resp($1.t('div',0,$1.t('td',{colspan:7},$1.t('tr',0,tBody))),Jr); }
			else{ var n=1;
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
					$1.t('td',{node:$Doc.docNumTr(L)},tr);
					$1.t('td',{textNode:L.dueDate},tr);
					$1.t('td',{textNode:$Str.money(L.creBal)},tr);
					$1.t('td',{textNode:$Str.money(L.creBalDue)},tr);
					var td=$1.t('td',0,tr);
					$1.lTag({
						tag: '$',
						'class': jsF + ' ' + tbCal._cell + ' val invoice_amount_due',
						ncol: 1,
						name: 'debBal',
						min: 0,
						max: L.creBalDue,
						placeholder: L.creBalDue * 1,
						amount_due: L.creBalDue * 1,
						AJs: {acId: L.acId},
						onkeychange: function () {
							tbCal.sumCells(tBody);
						}
					}, td);
				});
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{colspan:6,textNode:'Total'},tr); n++;
				$1.t('td',{'class':tbCal._cell+'_1',format:'$'},tr);

				new PaymentsInvoiceSubscription(context);
			}
		}});
	}
}

Gvt.Rep.pin=function(){
	$Api.Rep.base({f:Api.Gvt.pr+'rep/pin',inputs:$1.G.filter(),
		Totals:{t:'Totales',tn:2},
		V_G:[
			{f:'docNum',t:'#'},
			{f:'cardName',t:'Tercero'},
			{f:'docDate',t:'Fecha'},
			{f:'dueDate',t:'Vencimiento'},
			{f:'itemCode',t:'Código',fText:Itm.Txt.code},
			{f:'itemName',t:'Descripción',fText:Itm.Txt.name},
			{f:'price',t:'Precio',fType:'$'},
			{f:'quantity',t:'Cantidad',fType:'number',totals:'Y'},
			{f:'udm',t:'Udm',_g:Udm.O},
			{f:'priceLine',t:'Total',fType:'$',totals:'Y'}
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
		{f:'cardName',t:'Tercero'},
		{f:'docTotal',t:'Total',fType:'$',totals:'Y'},
		{t:'Por Pagar',f:'balDue',fType:'$',totals:'Y'}
		],
		V_CD:[
		{f:'docDate',t:'Fecha'},
		{f:'cardName',t:'Tercero'},
		{f:'docTotal',t:'Total',fType:'$',totals:'Y'},
		{t:'Por Pagar',f:'balDue',fType:'$',totals:'Y'}
		],
		V_I:[
		{f:'itemCode',t:'Código',fText:Itm.Txt.code},
		{f:'itemName',t:'Descripción',fText:Itm.Txt.name},
		{f:'quantity',t:'Cantidad',fType:'number',totals:'Y'},
		{f:'udm',t:'Udm',_g:Udm.O},
		{f:'priceLine',t:'Total',fType:'$',totals:'Y'},
		{f:'priceLine',t:'Promedio',fType:'$',fText:(L)=>{
			bal=L.priceLine/L.quantity;
			return bal;
		}}
		],
		V_DO:[
		{f:'lineType',t:'Tipo',_g:$V.gvtDocs},
		{f:'docNum',t:'#'},
		{f:'cardName',t:'Tercero'},
		{f:'docDate',t:'Fecha'},
		{f:'dueDate',t:'Vencimiento'},
		{f:'docTotal',t:'Total',fType:'$',totals:'Y'},
		{t:'Por Pagar',f:'balDue',fType:'$',totals:'Y'}
		],
	},$M.Ht.cont);
}

$M.kauAssg('gvtBuy',[
	{k:'gvtPor',t:'Orden de Compra'},
	{k:'gvtPin',t:'Factura de Compra'},
	{k:'gvtPdn',t:'Remision de Compra'},
	{k:'gvtPrd',t:'Devolución Compra'},
	{k:'gvtPnd',t:'Nota débito Compra'},
	{k:'gvtPnc',t:'Nota Crédtio Compra'},

	{k:'gvtRce',t:'Pagos Realizados'},
]);

$M.liAdd('gvtPur',[
	{_lineText:'Compras'},
	{k:'gvtPor',t:'Orden de Compras', kau:'gvtPor', mdlActive:'gvtPur',ini:{btnGo:'gvtPor.form',f:'gvtPor',gyp:Gvt.Por.get}},
	{k:'gvtPor.form',t:'Orden de Compra', kau:'gvtPor', mdlActive:'gvtPur',ini:{g:Gvt.Por.form}},
	{k:'gvtPor.view',noTitle:true, kau:'gvtPor', mdlActive:'gvtPur',ini:{g:Gvt.Por.view}},

	{k:'gvtPdn',t:'Remision de Compra', kau:'gvtPdn',mdlActive:'ivt',ini:{btnGo:'gvtPdn.form',f:'gvtPdn',gyp:Gvt.Pdn.get}},
	{k:'gvtPdn.form',t:'Remision Compra', kau:'gvtPdn',mdlActive:'ivt',ini:{g:Gvt.Pdn.form}},
	{k:'gvtPdn.view',noTitle:true,title:'Remision Compra (Doc)',kau:'gvtPdn',mdlActive:'ivt',ini:{g:Gvt.Pdn.view}},

	{k:'gvtPin',t:'Factura de Compra', kau:'gvtPin', mdlActive:'gvtPur',ini:{btnGo:'gvtPin.form',f:'gvtPin',gyp:Gvt.Pin.get}},
	{k:'gvtPin.form',t:'Factura de Compra', kau:'gvtPin', mdlActive:'gvtPur',ini:{g:Gvt.Pin.form}},
	{k:'gvtPin.view',noTitle:true, kau:'gvtPin', mdlActive:'gvtPur',ini:{g:Gvt.Pin.view}},

	{k:'gvtPrd',t:'Devoluciones Compra', kau:'gvtPrd',mdlActive:'ivt',ini:{btnGo:'gvtPrd.form',f:'gvtPrd',gyp:Gvt.Prd.get}},
	{k:'gvtPrd.form',t:'Devolución Compra', kau:'gvtPrd',mdlActive:'ivt',ini:{g:Gvt.Prd.form}},
	{k:'gvtPrd.view',noTitle:'Y',t:'Devolución Compra (Doc)', kau:'gvtPdn',mdlActive:'ivt',ini:{g:Gvt.Prd.view}},

	{k:'gvtPnc',t:'Nota Crédito Proveedor', kau:'gvtPnd', mdlActive:'gvtPur',ini:{btnGo:'gvtPnc.form',f:'gvtPnc',gyp:Gvt.Pnc.get}},
	{k:'gvtPnc.form',t:'Nota Crédito Proveedor', kau:'gvtPnc', mdlActive:'gvtPur',ini:{g:Gvt.Pnc.form}},
	{k:'gvtPnc.view',noTitle:true, kau:'gvtPnc', mdlActive:'gvtPur',ini:{g:Gvt.Pnc.view}},

	{k:'gvtPnd',t:'Nota Débito Proveedor', kau:'gvtPnd', mdlActive:'gvtPur',func:function(){
		$M.Ht.ini({btnGo:'gvtPnd.form',f:'gvtPnd',gyp:Gvt.Pnd.get}); }},
	{k:'gvtPnd.form',t:'Nota Débito Proveedor', kau:'gvtPnd', mdlActive:'gvtPur',ini:{g:Gvt.Pnd.form}},
	{k:'gvtPnd.view',t:'Nota débito proveedor',noTitle:true, kau:'gvtPnd', mdlActive:'gvtPur',ini:{g:Gvt.Pnd.view}},
	//Finanzas

	{k:'gvtRce',t:'Pagos Efectuados',kau:'gvtRce',mdlActive:'gvtPur',func:function(){
		$M.Ht.ini({btnGo:'gvtRce.form',f:'gvtRce',gyp:function(){ Gvt.Rce.get(); }});
	}},
	{k:'gvtRce.form',t:'Pago Efectuado',kau:'gvtRce',mdlActive:'gvtPur',ini:{g:Gvt.Rce.form }},
	{k:'gvtRce.view',noTitle:'Y',t:'Pago Efectuados (Doc)', kau:'gvtRce',mdlActive:'gvtPur',ini:{g:function(){ Gvt.Rce.view(); }}},
	{k:'gvtRce.invs',t:'Pago Efectuado',kau:'gvtRce',mdlActive:'gvtPur',ini:{g:Gvt.Rce.invs }},
],{prp:{mdlActive:'gvtPur'}});

_Fi['finRep.egr']=function(wrap){
	var jsV = 'jsFiltVars';
	opt1={C:'Consolidado',DAY:'Por Dia',
	CC:'Por Tercero',CDAY:'Tercero y Dia',
	LC:'Categoria',DOC:'Detallado'};
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV,name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Inicial',I:{tag:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Corte',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Tipo',I:{tag:'select','class':jsV,name:'A.payType',opts:$V.gfiPayTypeG}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Categoria',I:{tag:'select','class':jsV,name:'B.lineClass',opts:$Tb.gfiOtie,kIf:{vType:'E'}}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Tercero',Inode:$1.lTag({tag:'crd',jsF:jsV})},divL);
	$1.T.btnSend({textNode:'Actualizar', func:Gfi.Rep.egr},wrap);
};
_Fi['finRep.cxp']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Vence Despues',subText:'Fecha mayor a ',I:{tag:'date','class':jsV,name:'date1'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Vence Antes',I:{tag:'date','class':jsV,name:'date2',value:$2d.days7}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Listado Por',I:{tag:'select','class':jsV,name:'gby',opts:$V.gfiAccListView,optOmit:'cardId',noBlank:'Y'}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Tercero',Inode:$1.lTag({tag:'crd',jsF:jsV})},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.Rep.cxp});
	wrap.appendChild(btnSend);
};

$M.liRep('gvtPur',[
	{_lineText:'_REP'},
	{k:'gvtRep.pin',t:'Reporte Compras', kauAssg:'gvtRep.pin',ini:{f:'gvtRep.pin'}},
],{repM:['gvtPur']});
