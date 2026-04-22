$MdlStatus.put('ivt','Y');
$V.Mdls['ivt']={t:'Inventarios',ico:'fa fa-cubes'};
Api.Ivt={b:'/a/ivt/',pr:'/appi/private/ivt/'};
$V.ivtMetVal=[{k:'CD',v:'Estandar'},{k:'PP',v:'Promedio Ponderado'}];
$V.ivtWhsHand=[{k:'P',v:'Con Saldo'},{k:'N',v:'Solo Negativos'},{k:'0',v:'En Cero'},{k:'A',v:'Todos'}];
$oB.push($V.docTT,[
	{k:'ivtIng',v:'Ingreso Mercancía'},{k:'ivtEgr',v:'Salida Mercancía'},{k:'ivtWht',v:'Transferencia Mercancía'},{k:'ivtAwh',v:'Ajuste Inventario'},{k:'ivtRiv',v:'Revalorizar Inventario'}
]);

$M.add([//reemplazado cuando $M.liReset()->kauTable()
	{liA:'ivt',rootFolder:'Inventario'},
	{liA:'ivt',folder:'Documentos',L:[
		{k:'ivtIng',t:'Ingreso Inventario'},
		{k:'ivtEgr',t:'Salida Inventario'},
		{k:'ivtWht',t:'Transferencia Inventario'},
		{k:'ivtAwh',t:'Ajuste de Inventario'}
	]},
	{liA:'ivt',folder:'Reportes',L:[
		{k:'ivtStock.p',t:'Estado de Stock (Articulos)'},
		{k:'ivtStock.mp',t:'Estado de Stock (Materia Prima)'},
		{k:'ivtStock.history',t:'Histórico Movimientos'},
		{k:'ivtRep.ivtBal',t:'Inventario Valorizado'},
		{k:'ivtRep.kardex',t:'Kardex Inventario'}
	]},
	{liA:'ivt',folder:'Interfaces',L:[
		{k:'itfDT.ivtAwh',t:'Generar Doc. Ajuste Inventario'},
		{k:'itfDT.ivtItm',t:'Actualizar Información de Artículos'}
	]}
]);

_Fi['ivtIng']=function(wrap){
	var Fid={func:function(){ Ivt.Ing.get(); },rows:'N',docEntry:'N',lineMemo:'Y',docStatus:$V.docStatus2,
	adds:[{wxn:'wrapx8', L:'Clase',I:{tag:'select',name:'A.docClass',opts:$JsV.ivtDocClass}}]
	};
	$Doc.filtForm(Fid,wrap);
};
_Fi['ivtEgr']=function(wrap){
	var Fid={func:function(){ Ivt.Egr.get(); },rows:'N',docEntry:'N',lineMemo:'Y',docStatus:$V.docStatus2,
	adds:[{wxn:'wrapx8', L:'Clase',I:{tag:'select',name:'A.docClass',opts:$JsV.ivtDocClass}}]
	};
	$Doc.filtForm(Fid,wrap);
};
_Fi['ivtWht']=function(wrap){
	var Fid={func:function(){ Ivt.Wht.get(); },rows:'N',docEntry:'N',lineMemo:'Y',docStatus:$V.docStatus2,
	adds:[{wxn:'wrapx8', L:'Clase',I:{tag:'select',name:'A.docClass',opts:$JsV.ivtDocClass}},
	{wxn:'wrapx8', L:'Almacen Origen',I:{tag:'select',name:'A.whsIdFrom',opts:$Tb.itmOwhs}},
	{wxn:'wrapx8', L:'Almacen Dest.',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}}
	]
	};
	$Doc.filtForm(Fid,wrap);
};
_Fi['ivtAwh']=function(wrap){
	var Fid={func:function(){ Ivt.Awh.get(); },rows:'N',docEntry:'N',lineMemo:'Y',docStatus:$V.docStatus2,
	adds:[{wxn:'wrapx8', L:'Clase',I:{tag:'select',name:'A.docClass',opts:$JsV.ivtDocClass}},
	{wxn:'wrapx8', L:'Almacen',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}}
	]
	};
	$Doc.filtForm(Fid,wrap);
};
_Fi['ivtRiv']=function(wrap){
	var Fid={func:function(){ Ivt.Riv.get(); },rows:'N',docEntry:'N',lineMemo:'Y',docStatus:$V.docStatus2,
	adds:[,
	{wxn:'wrapx8', L:'Almacen',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}}
	]
	};
	$Doc.filtForm(Fid,wrap);
};


var Ivt={};
Ivt.Ing={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.pr+'ing',tbSerie:'ivtIng'});
		ab.add('v');
		if($Mdl.status('ivtGes')){
			ab.add('copy',{plus:'Y',btnText:'Apertura de Lotes',copy:{to:'ivtBitO.form',f:Api.Ivt.pr+'ing/toCopy',AJs:[{k:'ott',v:'ivtIng'},{k:'otr',v:L.docEntry}]}});
			ab.add('copy',{plus:'Y',btnText:'Entrada por Lotes',copy:{to:'ivtBitI.form',f:Api.Ivt.pr+'ing/toCopy',AJs:[{k:'ott',v:'ivtIng'},{k:'otr',v:L.docEntry}]}});
		}
		ab.add('N',{addText:'Las cantidades de inventario serán reversadas si aplica.'});
		ab.add('R'); ab.add('L'); 
		return $Opts.add('ivtIng',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Ivt.Ing.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Ivt.pr+'ing',inputs:$1.G.filter(),
		fOpts:Ivt.Ing.opts,view:'Y',docBy:'userDate',
		tbSerie:'ivtIng',
		TD:[
			{H:'Estado',k:'docStatus',_g:$V.docStatus},
			{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
			{H:'Clasificación',k:'docClass',_g:$JsV.ivtDocClass},
			{H:'Fecha',k:'docDate'},
			{H:'Detalles',k:'lineMemo'}
		]
		},cont);
	},
	form:function(){
		var D=$Cche.d(0,{});
		var cont=$M.Ht.cont;
		if(!D.docDate){ D.docDate=$2d.today; }
		$Doc.form({tbSerie:'ivtIng', cont:cont,POST:Api.Ivt.pr+'ing',func:D.func,AJs:D.AJs,
			HLs:[
				{lTag:'card',L:'Tercero',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName']}},
				{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
				{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs},noAdd:$MdlStatus.isY('ivt')},
				{lTag:'select',L:'Clase',wxn:'wrapx8',I:{name:'docClass',selected:D.docClass,opts:$JsV.ivtDocClass}},
				{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
				{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
				{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
			],
			tbL:{xNum:'Y',xDel:'Y',L:D.L,itmSea:'ivt',bCode:'Y',uniqLine:D.uniqLine,
				kTb:'gvtItmL',
				kFie:'itemCode,itemName,quantity,udm'
			},
		});
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:Api.Ivt.pr+'ing/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'ivtIng',D:Jr,
				main:Ivt.Ing.OLg,
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{k:'docClass',_g:$JsV.ivtDocClass,cs:2,ln:1},
					{t:'Estado',k:'docStatus',_g:$V.docStatus},{middleInfo:'Y'},{logo:'Y'},
					{t:'Fecha',k:'docDate'},
					{k:'whsId',_g:$Tb.itmOwhs,cs:2},
					{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'ref1',ln:1},{k:'ref2',ln:1},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
				],
				mTL:[
				{L:'L',fieldset:'Lineas',TLs:[
					{t:'Código',k:'itemCode',fText:Itm.Txt.code},
					{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
					{t:'Cant.',k:'quantity',format:'number'}
				]}
				]
			};
			$Doc.view(cont,tP);
		}});
	}
}

Ivt.Egr={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.pr+'egr',tbSerie:'ivtEgr'});
		ab.add('v');
		if($Mdl.status('ivtGes')){
			ab.add('copy',{plus:'Y',btnText:'Salida por Lotes',copy:{to:'ivtBitE.form',f:Api.Ivt.pr+'egr/toCopy',AJs:[{k:'ott',v:'ivtEgr'},{k:'otr',v:L.docEntry}]}});
		}
		ab.add('N',{addText:'Las cantidades de inventario serán reversadas si aplica.'});
		ab.add('R'); ab.add('L'); 
		return $Opts.add('ivtEgr',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Ivt.Egr.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Ivt.pr+'egr',inputs:$1.G.filter(),
		fOpts:Ivt.Egr.opts,view:'Y',docBy:'userDate',
		tbSerie:'ivtEgr',
		TD:[
			{H:'Estado',k:'docStatus',_g:$V.docStatus},
			{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
			{H:'Clasificación',k:'docClass',_g:$JsV.ivtDocClass},
			{H:'Fecha',k:'docDate'},
			{H:'Detalles',k:'lineMemo'}
		]
		},cont);
	},
	form:function(){
		var D=$Cche.d(0,{uniqLine:'Y'});
		var cont=$M.Ht.cont;
		if(!D.docDate){ D.docDate=$2d.today; }
		$Doc.form({tbSerie:'ivtEgr', cont:cont,POST:Api.Ivt.pr+'egr',func:D.func,AJs:D.AJs,
			HLs:[
				{lTag:'card',L:'Tercero',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName']}},
				{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
				{lTag:'select',L:'Almacen',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId,opts:$Tb.itmOwhs}},
				{lTag:'select',L:'Clase',wxn:'wrapx8',I:{name:'docClass',selected:D.docClass,opts:$JsV.ivtDocClass}},
				{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
				{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
				{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
			],
			tbL:{xNum:'Y',xDel:'Y',L:D.L,itmSea:'ivt',bCode:'Y',uniqLine:D.uniqLine,
				kTb:'gvtItmL',
				kFie:'itemCode,itemName,quantity,udm'
			},
		});
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:Api.Ivt.pr+'egr/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'ivtEgr',D:Jr,
				main:Ivt.Egr.OLg,
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{k:'docClass',_g:$JsV.ivtDocClass,cs:2,ln:1},
					{t:'Estado',k:'docStatus',_g:$V.docStatus},{middleInfo:'Y'},{logo:'Y'},
					{t:'Fecha',k:'docDate'},
					{k:'whsId',_g:$Tb.itmOwhs,cs:2},
					{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'ref1',ln:1},{k:'ref2',ln:1},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
				],
				mTL:[
				{L:'L',fieldset:'Lineas',TLs:[
					{t:'Código',k:'itemCode',fText:Itm.Txt.code},
					{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
					{t:'Cant.',k:'quantity',format:'number'}
				]}
				]
			};
			$Doc.view(cont,tP);
		}});
	}
}

Ivt.Wht=new iDoc({api:Api.Ivt.b+'wht',tbSerie:'ivtWht',
oLi:[
{k:'view'},{k:'statusC'},{k:'statusN',text:'Al anular el documento, se reversan los movimientos de inventario'},{k:'logs'},{k:'viewDac'}
],
G:{
tbExport:{ext:'xlsx',fileName:'Transferencias de Mercancias'}, TD:[
	{H:'Estado',k:'docStatus',_V:'docStatus'},
	{H:'Clasificación',k:'docClass',_JsV:'ivtDocClass'},
	{H:'Fecha',k:'docDate'},
	{H:'Origen',k:'whsIdFrom',_gTb:'itmOwhs'},
	{H:'Destino',k:'whsId',_gTb:'itmOwhs'},
	{H:'Detalles',k:'lineMemo'}
]
},
V:{btnsTop:{icons:'Y'},
	THs:[
		{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Cent. Costo',k:'cdcId',_gTb:'gfiOcdc',ln:1},
		,{t:'Estado',k:'docStatus',_V:'docStatus'},{middleInfo:'Y'},{logo:'Y'},
		{t:'Fecha',k:'docDate'},
		{t:'Clasificación',k:'docClass',_JsV:'ivtDocClass'},
		{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{t:'Ref. 1',k:'ref1',ln:1},
		{t:'Almacen Origen',k:'whsIdFrom',_gTb:'itmOwhs',cs:3},{t:'Almacen Dest.',k:'whsId',_gTb:'itmOwhs',ln:1,cs:3},
		{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
	],
	mTL:[
	{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
		{t:'Código',k:'itemCode',fText:Itm.Txt.code},
		{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
		{t:'Precio',k:'price',format:'$'},
		{t:'Cant.',k:'quantity',format:'number'},
		{t:'Total',k:'priceLine',format:'$'}
	]}
	],
	footTrs:{cs:2},
	TFs:null
},
});
Ivt.Wht.form=function(){
	Ivt.Wht.iForm({tbH:{
	L:[
	{lTag:'crd',wxn:'wrapx3',L:'Tercero'},
	{lTag:'date',wxn:'wrapx8',req:'Y',L:'Fecha',I:{name:'docDate'}},
	{k:'docClass',wxn:'wrapx8',L:'Clasificación',lTag:'select',I:{name:'docClass',opts:$JsV.ivtDocClass}},
	{divLine:1,lTag:'select',wxn:'wrapx8',L:'De Almacen',I:{name:'whsIdFrom',opts:$Tb.itmOwhs}},
	{lTag:'select',wxn:'wrapx8',L:'Almacen Dest.',I:{name:'whsId',opts:$Tb.itmOwhs}},
	{lTag:'select',wxn:'wrapx8',L:'Centro Costo',I:{name:'cdcId',opts:$Tb.gfiOcdc}},
	{lTag:'input',wxn:'wrapx8',L:'Referencia 1',I:{name:'ref1'}},
	{divLine:1,lTag:'textarea',wxn:'wrapx1',L:'Detalles',I:{name:'lineMemo'}}
	]},
	tbL:{xNum:'Y',xDel:'Y',itmSea:'ivt',
	RowsL:[
	['Codigo',{tag:'txt',kf:'itemCode',k:'itemCode',funcText:Itm.Txt.Code}],
	['Nombre',{tag:'txt',kf:'itemName',k:'itemName',funcText:Itm.Txt.name}],
	['Precio',{tag:'number',kf:'price',k:'price',type:'text',min:0,style:'width:6rem'}],
	[{textNode:'Cant.',style:'width:6rem;'},{tag:'input',kf:'quantity',k:'quantity',type:'number',inputmode:'numeric',min:0,style:'width:4rem'}],
	[{textNode:'Udm',_iHelp:'Unidad de Medida',style:'width:4rem;'},{tag:'span',kf:'udm',k:'udm',noCls:1}]
	]
	}},this);
}

Ivt.Awh={
OLg:function(L){
	var Li=[];
	var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.b+'awh',tbSerie:'ivtAwh'});
	ab.add('N'); ab.add('AC'); ab.add('L');
	Li=ab.Opts();
	return Li;
},
opts:function(P,pare){
	Li={Li:Ivt.Awh.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Ivt.b+'awh',inputs:$1.G.filter(),
	fOpts:Ivt.Awh.opts,view:'Y',docBy:'userDate',
	tbSerie:'ivtAwh',
	TD:[
	{H:'Estado',k:'docStatus',_V:'docStatus'},
	{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
	{H:'Fecha',k:'docDate'},
	{H:'Detalles',k:'lineMemo'}
	]
	},cont);
},
form:function(){
	var D=$Cche.d(0,{});
	var cont=$M.Ht.cont;
	var AJs={};
	{
		$Doc.form({tbSerie:'ivtAwh',cont:cont,POST:Api.Ivt.b+'awh',func:D.func,
		HLs:[
			{lTag:'card',L:'Cliente',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName']}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:$2d.today}},
			{lTag:'whsId',L:'Almacen',req:'Y',wxn:'wrapx8',I:{name:'whsId'}},
			{lTag:'input',L:'Ref. 1',wxn:'wrapx8',I:{name:'ref1'}},
			{lTag:'input',L:'Ref. 2',wxn:'wrapx8',I:{name:'ref2'}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo'}}
		],
		tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',uniqLine:'Y',itmSea:'ivt',bCode:'Y',
		kTb:'gvtItmL',AJs:[],
		kFie:'itemCode,itemName,quantity'
		}
		});
	};
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Ivt.b+'awh/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'ivtAwh',D:Jr,
			btnsTop:{ks:'print,statusN,logs,viewDac,',icons:'Y',Li:Ivt.Awh.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{k:'whsId',_g:$Tb.itmOwhs,cs:2},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},
				{k:'cardName',cs:4},{t:'Ref. 1',k:'ref1',ln:1},{t:'Ref. 2',k:'ref2',ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Fisico',k:'quantity',format:'number'},
				{t:'Sistema',k:'handAt',format:'number'},
				{t:'Precio',k:'price',format:'$'},
				{t:'Desviación',k:'diffQty',format:'number'},
				{t:'Total',k:'price',fText:function(Lx){ return Lx.price*Lx.diffQty; },format:'$'},
			]}
			]
		};
		$Doc.view(cont,tP);
	}});
},
}

Ivt.Riv={
OLg:function(L){
	var Li=[];
	var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.b+'riv',tbSerie:'ivtRiv'});
	ab.add('AC');
	Li=ab.Opts(Li);
	return Li;
},
opts:function(P,pare){
	Li={Li:Ivt.Riv.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Ivt.b+'riv',inputs:$1.G.filter(),
	fOpts:Ivt.Riv.opts,view:'Y',docBy:'userDate',
	tbSerie:'ivtRiv',
	TD:[
	{H:'Estado',k:'docStatus',_V:'docStatus'},
	{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
	{H:'Fecha',k:'docDate'},
	{H:'Detalles',k:'lineMemo'}
	]
	},cont);
},
form:function(){
	var D=$Cche.d(0,{});
	var cont=$M.Ht.cont;
	var AJs={};
	{
		$Doc.form({tbSerie:'ivtRiv',cont:cont,POST:Api.Ivt.b+'riv',func:D.func,
		HLs:[
			{lTag:'card',L:'Tercero',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName']}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:$2d.today}},
			{lTag:'whsId',L:'Almacen',req:'Y',wxn:'wrapx8',I:{name:'whsId'}},
			{lTag:'input',L:'Ref. 1',wxn:'wrapx8',I:{name:'ref1'}},
			{lTag:'input',L:'Ref. 2',wxn:'wrapx8',I:{name:'ref2'}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo'}}
		],
		tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',uniqLine:'Y',itmSea:'ivt',bCode:'Y',
			AJs:['itemId','itemSzId','handInv'],
			RowsL:[
				['Codigo',{tag:'span',funcText:function(L){ return Itm.Txt.code(L); } }],
				['Descripción',{tag:'span',funcText:function(L){ return Itm.Txt.name(L); } }],
				['Udm',{tag:'span',funcText:function(L){ return _g(L.udm,Udm.O); } }],
				['Cant. Total',{tag:'number',k:'quantity',kf:'quantity'}],
				['Valor Unitario',{tag:'$',kf:'priceLine'}]
			]
		}
		});
	};
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Ivt.b+'riv/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'ivtRiv',D:Jr,
			btnsTop:{ks:'print,statusN,logs,viewDac,',icons:'Y',Li:Ivt.Riv.OLg},
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Estado',k:'docStatus',_V:'docStatus',ln:1},
				{k:'whsId',_g:$Tb.itmOwhs,cs:2},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},
				{k:'cardName',cs:4},{t:'Ref. 1',k:'ref1',ln:1},{t:'Ref. 2',k:'ref2',ln:1},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Udm',k:'udm',_g:Udm.O},
				{t:'Cant. Definida',k:'quantity',format:'number'},
				{t:'Cant.Sistema',k:'handAt',format:'number'},
				{t:'Desviación',k:'diffQty',format:'number'},
				{t:'Costo Definido',k:'priceLine',format:'$'},
				{t:'Costo Sistema',k:'priceAt',format:'$'},
				{t:'Desviación',k:'diffPrice',format:'$'}
			]}
			]
		};
		$Doc.view(cont,tP);
	}});
},
}

/* por actualizar */
_Fi['ivtStock.history']=function(wrap,itemType){
	var jsV = 'jsFiltVars';
	var Tags=$Doc.filtForm({rows:'Y'});
	var Pa=$M.read('!');
	if(Pa=='ivtStock.pHistory'){ itemType='P'; }
	else if(Pa=='ivtStock.mpHistory'){ itemType='MP'; }
	var Pa=$M.read();
	var divL=$1.T.divL({divLine:1,wxn:'wrapx6',L:'Almacen',I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$Tb.itmOwhs,selected:Pa.whsId}},wrap);
	$1.T.divL({wxn:'wrapx8', subText:'Fecha Creado',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	if(Tags.rows){ divL.appendChild(Tags.rows); }
	$1.T.divL({wxn:'wrapx8', L:'No. Documento',I:{tag:'input',type:'number','class':jsV,name:'A.tr'}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Código /s'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_in)',placeholder:'401,501',value:Pa.itemCode}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Talla/s',I:{tag:'select',sel:{'class':jsV,name:'A.itemSzId(E_in)',multiple:'multiple',optNamer:'IN',style:'height:5rem;'},opts:$V.grs1,selected:Pa.itemSzId}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Descripción'},I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',O:{vPost___:'I.itemType(E_igual)='+itemType}}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Stock.history});
	wrap.appendChild(btnSend);
};
_Fi['ivtStock']=function(wrap){
	var jsV = 'jsFiltVars';
	var Pa=$M.read('!');
	if(Pa=='ivtStock.p'){ itemType='P'; }
	else if(Pa=='ivtStock.mp'){ itemType='MP,SE'; }
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Almacen',I:{tag:'select','class':jsV+' __whsId',name:'whs1.whsId(E_in)',opts:$Tb.itmOwhs}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Visualizar',I:{tag:'select','class':jsV,name:'viewType2',opts:$V.ivtWhsHand,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Reporte',I:{tag:'select','class':jsV,name:'reportLen',opts:$V.dbReportLen,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Tenga Solicitado',I:{tag:'select','class':jsV,name:'whs1.isCommited(E_mayIgual)',opts:[{k:'',v:'Ignorar'},{k:'1',v:'Si'}],noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Código de Barras',I:{tag:'select','class':jsV,name:'grTypeId',opts:$JsV.itmBcGr}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Código /s'},I:{tag:'input',type:'text','class':jsV,name:'itemCode',placeholder:'401,501'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:$TXT.itemSize,I:{tag:'select','class':jsV,name:'itemSzId',multiple:'multiple',optNamer:'IN',style:'height:5rem;',opts:$V.grs1}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Descripción'},I:{tag:'input',type:'text','class':jsV,name:'itemName',O:{vPost:'I.itemType(E_in)='+itemType}}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:Ivt.Stock.get},wrap);
};
_Fi['ivtStock.withPeP']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Almacen',I:{tag:'select','class':jsV+' __whsId',name:'whs1.whsId(E_in)',opts:$Tb.itmOwhs}},wrap);
	var vt2={'all':'Todos',negative:'Solo Negativos',positive:'Solo Positivos'};
	$1.T.divL({wxn:'wrapx8', L:'Visualizar',I:{tag:'select','class':jsV,name:'viewType2',opts:vt2,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Reporte',I:{tag:'select','class':jsV,name:'reportLen',opts:$V.dbReportLen,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Tenga Solicitado',I:{tag:'select','class':jsV,name:'whs1.isCommited(E_mayIgual)',opts:[{k:'',v:'Ignorar'},{k:'1',v:'Si'}],noBlank:1}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Código /s'},I:{tag:'input',type:'text','class':jsV,name:'itemCode',placeholder:'401,501'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:$TXT.itemSize,I:{tag:'select','class':jsV,name:'itemSzId',multiple:'multiple',optNamer:'IN',style:'height:5rem;',opts:$V.grs1}},divL);
	$1.T.divL({wxn:'wrapx4', L:'Descripción',I:{tag:'input',type:'text','class':jsV,name:'itemName'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:Ivt.Stock.withPeP},wrap);
};

$M.li['ivtStock.withPeP'] ={t:'Estado de Stock con PeP',kau:'ivtStock.p',mdlActive:'wma',func:function(){
	$M.Ht.ini({f:'ivtStock.withPeP',p:Ivt.Stock.withPeP});
}};


Ivt.Stock={//actualizar
get:function(cont){
	cont =$M.Ht.cont; var Pa=$M.read('!');
	$Api.get({f:Api.Ivt.b+'whs', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var whsIdDef=$1.q('.__whsId',$M.Ht.filt).value;
			var cs=3; var P=(P)?P:{};
			var tr1=['Código','Descripción',$TXT.itemSize,'Udm','Almacen',
			{textNode:'En Stock'},
			{textNode:'- Solicitado',_iHelp:'Cant. solicitada pedidos'},
			{textNode:'= Disponible',_iHelp:'Cant. disponible luego de entregar todo lo solicitado'},
			{textNode:'+ O.C',_iHelp:'Cantidad en Ordenes de Compra'},
			{textNode:'Min.',_iHelp:'Stock Minimo'},
			{textNode:'Max.',_iHelp:'Stock Maximo'},
			{textNode:'Reo.',_iHelp:'Punto de Reorden'},

			];
			var tb = $1.T.table(tr1);
			var tBody = $1.t('tbody',0,tb);
			var tr0=$1.q('thead tr',tb);
			$js.sortNum(Jr.L,{k:'itemCode'});
			for(var i in Jr.L){ L=Jr.L[i];
				L.whsId=(L.whsId)?L.whsId:whsIdDef;
				var tr = $1.t('tr',0,tBody);
				L.minStock *=1; L.maxStock *=1; L.reorder *=1;
				var disp=(L.onHand-L.isCommited)*1;
				var css1=(L.onHand<0)?'color:#E00; font-weight:bold;':'';
				var css2=(disp<0)?'color:#E00; font-weight:bold;':'';
				var tdi=$1.t('td',0,tr);
				ks='itemCode:'+L.itemCode+',itemSzId:'+L.itemSzId+',whsId:'+L.whsId;
				$1.t('a',{'class':'fa faBtn fa_eye',href:$M.to('ivtStock.pHistory',ks,'r'),title:'Visualizar Movimientos de Artículo'},tdi);
				$1.t('span',{textNode:' '+L.itemCode},tdi);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr);
				$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
				$1.t('td',{textNode:_g(L.whsId,$Tb.itmOwhs)},tr);
				$1.t('td',{textNode:L.onHand*1,style:css1,'class':tbSum.tbColNums,tbColNum:1},tr);
				$1.t('td',{textNode:L.isCommited*1,'class':tbSum.tbColNums,tbColNum:2},tr);
				$1.t('td',{textNode:disp,style:css2,'class':tbSum.tbColNums,tbColNum:3},tr);
				$1.t('td',{textNode:L.onOrder*1,'class':tbSum.tbColNums,tbColNum:4},tr);
				css1='';
				if(L.minStock){
					css1=(L.onHand<=L.minStock)?'backgroundColor:red':'';
					css1=(disp<=L.minStock)?'backgroundColor:orange':css1;
				}
				$1.t('td',{textNode:L.minStock*1,style:css1,'class':tbSum.tbColNums,tbColNum:5},tr);
				if(L.maxStock){
					css1=(L.onHand>=L.maxStock)?'backgroundColor:red':'';
					css1=(disp>=L.maxStock)?'backgroundColor:orange':css1;
				}
				$1.t('td',{textNode:L.maxStock*1,style:css1,'class':tbSum.tbColNums,tbColNum:6},tr);
				if(L.reorder){
					css1=(L.onHand<=L.reorder)?'backgroundColor:yellow':'';
					css1=(disp<=L.reorder)?'backgroundColor:yellow':css1;
				}
				$1.t('td',{textNode:L.reorder*1,style:css1},tr);
				var bc=(L.barCode)?L.barCode:'';
				$1.t('td',{textNode:bc},tr);
			}
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{colspan:4,textNode:'Total'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'1'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'2'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'3'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'4'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'5'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'6'},tr);
			tbSum.get(tb);
			tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Reporte de Inventario'});
			cont.appendChild(tb);
		};
	}
	});
},
history:function(){
	cont =$M.Ht.cont;
	$Api.get({f:Api.Ivt.b+'whs/history', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['Tipo','Número','Artículo','Descripción','Talla','Entradas','Salidas','Saldo','Fecha']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var css1=(L.onHandAt<0)?'color:#E00; font-weight:bold;':'';
				var td=$1.t('td',0,tr);
				L.inQty*=1; L.outQty*=1;
				var inQty=(L.inQty!=0)?L.inQty:'';
				var outQty=(L.outQty!=0)?L.outQty:'';
				$Doc.href(L.tt,{docEntry:L.tr},{pare:td,format:'serie'});
				$1.t('td',{textNode:$Doc.docNumSerie(L.tt,{serieId:L.serieId,docNum:L.docNum,docEntry:L.tr})},tr);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:_g(L.itemSzId*1,$V.grs1)},tr);
				$1.t('td',{textNode:inQty,style:css1},tr);
				$1.t('td',{textNode:outQty,style:css1},tr);
				$1.t('td',{textNode:L.onHandAt*1,style:css1},tr);
				$1.t('td',{textNode:L.docDate},tr);
			}
			tb=$1.T.tbExport(tb,{ico:'xlsx',fileName:'Reporte de Movimientos'});
			cont.appendChild(tb);
		}
	}});
},
withPeP:function(cont){
	cont =$M.Ht.cont; var Pa=$M.read('!');
	$Api.get({f:Api.Ivt.b+'whs/withPeP', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var cs=4; var P=(P)?P:{};
			var tr1=[];
			var tb = $1.T.table(tr1);
			var tBody = $1.t('tbody',0,tb);
			var tr0=$1.q('thead tr',tb);
			$js.sortBy('itemCode',Jr.L);
			$1.t('td',{textNode:'Código'},tr0);
			$1.t('td',{textNode:'Descripción'},tr0);
			$1.t('td',{textNode:$TXT.itemSize},tr0);
			$1.t('td',{textNode:'Almacen'},tr0);
			$1.t('td',{textNode:'En Stock'},tr0);
			$1.t('td',{textNode:'- Solicitado',_iHelp:'Cant. solicitada pedidos'},tr0);
			$1.t('td',{textNode:'= Disponible',_iHelp:'Cant. disponible luego de entregar todo lo solicitado'},tr0);
			$1.t('td',{textNode:'+ O.C',_iHelp:'Cantidad en Ordenes de Compra'},tr0);
			$1.t('td',0,tr0);
			forEach($Tb.itmOwhsPeP,function(x){
				$1.t('td',{textNode:x.v},tr0);
			},{});
			for(var i in Jr.L){ L=Jr.L[i];
				var tr = $1.t('tr',0,tBody);
				var disp=(L.onHand-L.isCommited)*1;
				var css1=(L.onHand<0)?'color:#E00; font-weight:bold;':'';
				var css2=(disp<0)?'color:#E00; font-weight:bold;':'';
				var cssSep='backgroundColor:#DDD;';
				var tdi=$1.t('td',0,tr);
				ks='itemCode:'+L.itemCode+',itemSzId:'+L.itemSzId+',whsId:'+L.whsId;
				$1.t('a',{'class':'fa faBtn fa_eye',href:$M.to('ivtStock.pHistory',ks,'r'),title:'Visualizar Movimientos de Artículo'},tdi);
				$1.t('span',{textNode:' '+L.itemCode},tdi);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr);
				$1.t('td',{textNode:_g(L.whsId,$Tb.itmOwhs)},tr);
				$1.t('td',{textNode:L.onHand*1,style:css1,'class':tbSum.tbColNums,tbColNum:1},tr);
				$1.t('td',{textNode:L.isCommited*1,'class':tbSum.tbColNums,tbColNum:2},tr);
				$1.t('td',{textNode:disp,style:css2,'class':tbSum.tbColNums,tbColNum:3},tr);
				var tdPeP=$1.t('td',{'class':tbSum.tbColNums,tbColNum:4,style:cssSep},tr);
				var bc=(L.barCode)?L.barCode:'';
				$1.t('td',{textNode:bc},tr);
				var tbColNum=5; var total=0;
				forEach($Tb.itmOwhsPeP,function(x,P){
					var val=''; 
					var tk1=P.L.itemId+'-'+P.L.itemSzId+'-'+x.k;
					if(P.L2[tk1]){
						val=P.L2[tk1].onHand*1;
						total +=val;
					}
					tdPeP.innerText=total;
					cssx=(tbColNum%2==0)?cssSep:'';
					$1.t('td',{textNode:val,'class':tbSum.tbColNums,tbColNum:tbColNum,style:cssx},tr);
					tbColNum++;
				},{},{L:L,L2:Jr.L2});
			}
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{colspan:cs,textNode:'Total'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'1'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'2'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'3'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'4'},tr);
			$1.t('td',0,tr);
			var tbColNum=5;
			forEach($Tb.itmOwhsPeP,function(x){
				$1.t('td',{'class':tbSum.tbColNumTotal+tbColNum},tr); tbColNum++;
			},{});
			tbSum.get(tb);
			tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Reporte de Inventario'});
			cont.appendChild(tb);
		};
	}
	});
},
}

Drw.whs_itemSize=function(Jr,P){
	var cs=3; var P=(P)?P:{};
	var tr1=['Código','Descripción',$TXT.itemSize,'Almacen'];
	if(Jr.viewType=='itemCode'){ cs=2; delete(tr1[2]); delete(tr1[3]); }
	else if(Jr.viewType!='whs'){ delete(tr1[3]); }
	if(Jr.viewType=='whs'){ cs=4; }
	var tb = $1.T.table(tr1);
	var tBody = $1.t('tbody',0,tb);
	var tr0=$1.q('thead tr',tb);
	$js.sortNum(Jr.L,{k:'itemCode'});
	$1.t('td',{textNode:'En Stock'},tr0);
	$1.t('td',{textNode:'- Solicitado',_iHelp:'Cant. solicitada pedidos'},tr0);
	$1.t('td',{textNode:'= Disponible',_iHelp:'Cant. disponible luego de entregar todo lo solicitado'},tr0);
	$1.t('td',{textNode:'+ O.C',_iHelp:'Cantidad en Ordenes de Compra'},tr0);
	for(var i in Jr.L){ L=Jr.L[i];
		var tr = $1.t('tr',0,tBody);
		var disp=(L.onHand-L.isCommited)*1;
		var css1=(L.onHand<0)?'color:#E00; font-weight:bold;':'';
		var css2=(disp<0)?'color:#E00; font-weight:bold;':'';
		var tdi=$1.t('td',0,tr);
		ks='itemCode:'+L.itemCode;
		ks+=(Jr.viewType!='itemCode')?',itemSzId:'+L.itemSzId:'';
		ks+=(L.whsId!='')?',whsId:'+L.whsId:'';
		$1.t('a',{'class':'fa faBtn fa_eye',href:$M.to('ivtStock.pHistory',ks,'r'),title:'Visualizar Movimientos de Artículo'},tdi);
		$1.t('span',{textNode:' '+L.itemCode},tdi);
		$1.t('td',{textNode:L.itemName},tr);
		if(Jr.viewType!='itemCode'){ $1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr); }
		if(Jr.viewType=='whs'){ $1.t('td',{textNode:_g(L.whsId,$Tb.itmOwhs)},tr);}
		$1.t('td',{textNode:L.onHand*1,style:css1,'class':tbSum.tbColNums,tbColNum:1},tr);
		$1.t('td',{textNode:L.isCommited*1,'class':tbSum.tbColNums,tbColNum:2},tr);
		$1.t('td',{textNode:disp,style:css2,'class':tbSum.tbColNums,tbColNum:3},tr);
		$1.t('td',{textNode:L.onOrder*1,'class':tbSum.tbColNums,tbColNum:4},tr);
		var bc=(L.barCode)?L.barCode:'';
		$1.t('td',{textNode:bc},tr);
	}
	var tr=$1.t('tr',0,tBody);
	$1.t('td',{colspan:cs,textNode:'Total'},tr);
	$1.t('td',{'class':tbSum.tbColNumTotal+'1'},tr);
	$1.t('td',{'class':tbSum.tbColNumTotal+'2'},tr);
	$1.t('td',{'class':tbSum.tbColNumTotal+'3'},tr);
	$1.t('td',{'class':tbSum.tbColNumTotal+'4'},tr);
	tbSum.get(tb);
	return tb;
},


/* Reportes */
_Fi['ivtRep.ivtBal']=function(wrap){
	var jsV = 'jsFiltVars';
	var gbb=[{k:'whsId',v:'Almacen'},{k:'itemId',v:'Articulo'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Agrupar',I:{tag:'select','class':jsV,name:'gby',opts:gbb,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Código',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode'}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Descripción',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Almacen',I:{tag:'select','class':jsV,name:'W.whsId',opts:$Tb.itmOwhs}},divL);
	$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Reporte'},I:{tag:'select',sel:{'class':jsV,name:'__dbReportLen'},opts:$V.dbReportLen,noBlank:1}},wrap);
	$1.T.btnSend({textNode:'Actualizar', func:Ivt.Rep.ivtBal},wrap);
};
_Fi['ivtRep.rota']=function(wrap){
	var jsV = 'jsFiltVars';
	var gbb=[{k:'whsId',v:'Almacen'},{k:'itemId',v:'Articulo'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Agrupar',I:{tag:'select','class':jsV,name:'gby',opts:gbb,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Inicio',I:{tag:'input',type:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Fin',I:{tag:'input',type:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Código',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode'}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Descripción',I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Grupo',I:{tag:'select','class':jsV,multiple:'Y',name:'I.itemGr(E_in)',opts:$JsV.itmGr}},divL);
	$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Reporte'},I:{tag:'select',sel:{'class':jsV,name:'__dbReportLen'},opts:$V.dbReportLen,noBlank:1}},wrap);
	$1.T.btnSend({textNode:'Actualizar', func:Ivt.Rep.rota},wrap);
};
_Fi['ivtRep.kardex']=function(wrap){
	var jsV = 'jsFiltVars';
	var gbb=[{k:'whsId',v:'Almacen'},{k:'itemId',v:'Articulo'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Agrupar',I:{tag:'select','class':jsV,name:'gby',opts:gbb,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Almacen',I:{tag:'select','class':jsV,name:'W.whsId',opts:$Tb.itmOwhs}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Inicio',I:{tag:'input',type:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Fin',I:{tag:'input',type:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Código',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode'}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Descripción',I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)'}},divL);
	$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Reporte'},I:{tag:'select',sel:{'class':jsV,name:'__dbReportLen'},opts:$V.dbReportLen,noBlank:1}},wrap);
	$1.T.btnSend({textNode:'Actualizar', func:Ivt.Rep.kardex},wrap);
};
_Fi['ivtStock.mmr']=function(wrap){
	var jsV = 'jsFiltVars';
	var gbb=[{k:'whsId',v:'Almacen'},{k:'itemId',v:'Articulo'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Almacen',I:{tag:'select','class':jsV,name:'whsId',opts:$Tb.itmOwhs}},wrap);
	$1.T.divL({wxn:'wrapx2',L:'Código /s',I:{tag:'input',type:'text','class':jsV,name:'itemCode'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:Ivt.Stock.mmr},wrap);
};

Ivt.Rep={
ivtBal:function(T){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Ivt.b+'rep/ivtBal',inputs:$Api.getFilter(),btnDisabled:T,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep={
		erType:['Almacen',{k:'whsId',_gTb:'itmOwhs'}],
		itemCode:['Código',{k:'itemCode',fText:Itm.Txt.code}],
		itemName:['Descripción',{k:'itemName',fText:Itm.Txt.name}],
		onHand:['Disponible',{k:'onHand',format:'number'}],
		avgPrice:['Costo Unitario',{k:'avgPrice',format:'$'}],
		stockValue:['Costo Total',{k:'stockValue',format:'$'}]
		};
		var TbD=$Doc.colsTable(Jr.L,Rep);
		var tbc=$1.t('div');
		var tb=$1.T.table(TbD.Tb,0,tbc);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			for(var k in Rep){ var Lk=Rep[k][1];
				var lTag={textNode:L[k]};
				if(Lk){ lTag=$1.setTag(Lk,L); }
				$1.t('td',lTag,tr);
			}
		}
		$1.t('h5',{textNode:$ys.softFromXls},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Inventario Valorizado'});
		cont.appendChild(tb)
	}});
},
rota:function(T){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Ivt.b+'rep/rota',inputs:$Api.getFilter(),btnDisabled:T,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep={
		erType:['Almacen',{k:'whsId',_gTb:'itmOwhs'}],
		itemCode:['Código',{k:'itemCode',fText:Itm.Txt.code}],
		itemName:['Descripción',{k:'itemName',fText:Itm.Txt.name}],
		sbPrice:['Venta Neta',{k:'sbPriceLine',format:'$'}],
		qtyMov:['Cantidad',{k:'qtyMov',format:'number'}],
		prom:['Promedio',{k:'qtyMov',format:'number',fText:function(L){
			if(L.qtyMov<=0){ return ''; }
			return $js.toFixed(L.qtyMov/Jr.days,2);
		}}],
		onHand:['Inv. Actual',{k:'onHand',format:'number'}],
		dias:['Días Proy.',{k:'onHand',format:'number',fText:function(L){
			if(L.onHand<=0){ return ''; }
			return $js.toFixed(L.onHand/(L.qtyMov/Jr.days));
		}}]
		};
		var TbD=$Doc.colsTable(Jr.L,Rep);
		var tbc=$1.t('div');
		var tb=$1.T.table(TbD.Tb,0,tbc);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			for(var k in Rep){ var Lk=Rep[k][1];
				var lTag={textNode:L[k]};
				if(Lk){ lTag=$1.setTag(Lk,L); }
				$1.t('td',lTag,tr);
			}
		}
		$1.t('h5',{textNode:$ys.softFromXls},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Inventario Valorizado'});
		cont.appendChild(tb)
	}});
},
kardex:function(T){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Ivt.b+'rep/kardex',inputs:$Api.getFilter(),btnDisabled:T,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep={
		erType:['Almacen',{k:'whsId',_gTb:'itmOwhs'}],
		itemCode:['Código',{k:'itemCode',fText:Itm.Txt.code}],
		itemName:['Descripción',{k:'itemName',fText:Itm.Txt.name}],
		iniQty:['Cantidad Inicial',{k:'iniQty',format:'number'}],
		iniCost:['Costo Total',{k:'priceLine',format:'$'}],
		inQty:['Entradas',{k:'inQty',format:'number'}],
		inCost:['Costo Total',{k:'inPriceLine',format:'$'}],
		outQty:['Salidas',{k:'outQty',format:'number'}],
		outCost:['Costo Total',{k:'outPriceLine',format:'$'}],
		atQty:['Cantidad Final',{k:'itemId',format:'number',fText:function(L){
			return L.iniQty*1+L.inQty*1-L.outQty*1;
		}}],
		atCost:['Costo Total',{k:'itemId',format:'$$',fText:function(L){
			return L.iniCost*1+L.inCost*1-L.outCost*1;
		}}],
		};
		var TbD=$Doc.colsTable(Jr.L,Rep);
		var tbc=$1.t('div');
		var tb=$1.T.table(TbD.Tb,0,tbc);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			for(var k in Rep){ var Lk=Rep[k][1];
				var lTag={textNode:L[k]};
				if(Lk){ lTag=$1.setTag(Lk,L); }
				$1.t('td',lTag,tr);
			}
		}
		$1.t('h5',{textNode:$ys.softFromXls},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Kardex Inventario'});
		cont.appendChild(tb)
	}});
}
}

Ivt.Stock.mmr=function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Ivt.pr+'stock/mmr',inputs:$1.G.filter(),loade:cont,errWrap:cont,func:function(Jr){
		var tb=$1.T.table(['Almacen','Código','Descripción','S/P','Stock','Minimo','Máximo','Reorden'],0,cont);
		var tBody=$1.t('tbody',0,tb);
		var jsF=$Api.JS.clsLN;
		for(var i in Jr.L){ L=Jr.L[i];
			var tr=$1.t('tr',{'class':$Api.JS.clsL},tBody);
			$1.t('td',{textNode:_g(L.whsId,$Tb.itmOwhs)},tr);
			$1.t('td',{textNode:L.itemCode},tr);
			$1.t('td',{textNode:L.itemName},tr);
			$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr);
			$1.t('td',{textNode:L.onHand*1},tr);
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'number','class':jsF,name:'minStock',value:L.minStock,style:'width:100px'},td).AJs={id:L.id,whsId:L.whsId,itemId:L.itemId,itemSzId:L.itemSzId};
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'number','class':jsF,name:'maxStock',value:L.maxStock,style:'width:100px',style:'width:100px'},td);
			var td=$1.t('td',0,tr);
			$1.t('input',{type:'number','class':jsF,name:'reorder',value:L.reorder,style:'width:100px'},td);
		}
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:Api.Ivt.pr+'stock/mmr',jsBody:cont,loade:resp,func:function(Jr2){ $Api.resp(resp,Jr2); }},cont);
	}});
}

$M.kauAssg('ivtHandle',[
	{k:'ivtIng',t:'Ingreso Inventario'},
	{k:'ivtEgr',t:'Salida Inventario'},
	{k:'ivtWht',t:'Transferencia Inventario'},
	{k:'ivtAwh',t:'Ajuste de Inventario'},
	{k:'ivtRiv',t:'Revalorizar Inventario'},
	
	{k:'ivtStock.p',t:'Estado de Stock (Articulos)'},
	{k:'ivtStock.mp',t:'Estado de Stock (Materia Prima)'},
	{k:'ivtStock.history',t:'Histórico Movimientos'},
	{k:'ivtRep.rota',t:'Rotación Inventario'},
	{k:'ivtRep.ivtBal',t:'Inventario Valorizado'},
	{k:'ivtRep.kardex',t:'Kardex Inventario'},

	{k:'itfDT.ivtAwh',t:'Generar Doc. Ajuste Inventario'},
]);
$M.liAdd('ivtHandle',[
	{k:'ivtStock.mmr',t:'Minimos y Maximos', kau:'sysd.sumaster', func:function(){
		$M.Ht.ini({f:'ivtStock.mmr'});
	}},
	{_lineText:'Operaciones de Stock'},
	{k:'ivtIng',t:'Entrada de Mercancias', kau:'ivtIng', func:function(){ $M.Ht.ini({fieldset:'Y',f:'ivtIng', btnGo:'ivtIng.form',gyp:function(){ Ivt.Ing.get(); } }); }},
	{k:'ivtIng.form',t:'Entrada Mercancias', kau:'ivtIng', func:function(){ $M.Ht.ini({g:function(){ Ivt.Ing.form(); } }); }},
	{k:'ivtIng.view',noTitle:'Y',t:'Entrada Mercancias (Doc)', kau:'ivtIng', func:function(){ $M.Ht.ini({g:function(){ Ivt.Ing.view(); } }); }},

	{k:'ivtEgr',t:'Salida de Mercancias', kau:'ivtEgr', func:function(){ $M.Ht.ini({fieldset:'Y',f:'ivtEgr', btnGo:'ivtEgr.form',gyp:function(){ Ivt.Egr.get(); } });
	}},
	{k:'ivtEgr.form',t:'Salida Mercancia', kau:'ivtEgr', func:function(){ $M.Ht.ini({g:function(){ Ivt.Egr.form(); } }); }},
	{k:'ivtEgr.view',noTitle:'Y',t:'Salida Mercancía (Doc)', kau:'ivtEgr', func:function(){ $M.Ht.ini({g:function(){ Ivt.Egr.view(); } }); }},

	{k:'ivtWht',t:'Transferencia de Mercancia', kau:'ivtWht', mdlActive:'ivtMWhs', func:function(){ $M.Ht.ini({fieldset:'Y',f:'ivtWht', btnGo:'ivtWht.form',gyp:function(){ Ivt.Wht.get(); } });
	}},
	{k:'ivtWht.form',t:'Transferencia Mercancia', kau:'ivtWht',mdlActive:'ivtMWhs', func:function(){ $M.Ht.ini({g:function(){ Ivt.Wht.form(); } }); }},
	{k:'ivtWht.view',noTitle:'Y',t:'Transferencia Mercancía (Doc)', kau:'ivtEgr', func:function(){ $M.Ht.ini({g:function(){ Ivt.Wht.view(); } }); }},

	{k:'ivtAwh',t:'Ajuste de Inventarios', kau:'ivtAwh', func:function(){ $M.Ht.ini({fieldset:'Y',f:'ivtAwh', btnGo:'ivtAwh.form',gyp:function(){ Ivt.Awh.get(); } });
	}},
	{k:'ivtAwh.form',t:'Ajuste Inventario', kau:'ivtAwh', func:function(){ $M.Ht.ini({g:function(){ Ivt.Awh.form(); } }); }},
	{k:'ivtAwh.view',noTitle:'Y',t:'Ajuste Inventario (Doc)', kau:'ivtAwh', func:function(){ $M.Ht.ini({g:function(){ Ivt.Awh.view(); } }); }},

	{k:'ivtRiv',t:'Revalorizar Inventario', kau:'ivtAwh', func:function(){ $M.Ht.ini({fieldset:'Y',f:'ivtRiv', btnGo:'ivtRiv.form',gyp:function(){ Ivt.Riv.get(); } });
	}},
	{k:'ivtRiv.form',t:'Revalorizar Inventario', kau:'ivtRiv', func:function(){ $M.Ht.ini({g:function(){ Ivt.Riv.form(); } }); }},
	{k:'ivtRiv.view',noTitle:'Y',t:'Revaloriza Inventario (Doc)', kau:'ivtRiv', func:function(){ $M.Ht.ini({g:function(){ Ivt.Riv.view(); } }); }},
],{prp:{mdlActive:'ivtHandle'}});

$M.liRep('ivtHandle',[
	{_lineText:'Reportes Inventario'},
	{k:'ivtStock.p',t:'Estado de Stock (Articulos)',kau:'ivtStock.p',ini:{f:'ivtStock',p:Ivt.Stock.get}},
	{k:'ivtStock.mp',t:'Estado de Stock (Materia Prima)',kau:'ivtStock.mp',ini:{f:'ivtStock', p:Ivt.Stock.get}},
	{k:'ivtStock.pHistory',t:'Histórico de Movimientos (Articulos)', kau:'ivtStock.history',ini:{f:'ivtStock.history',gyp:function(){}}},
	{k:'ivtStock.mpHistory',t:'Histórico de Movimientos (Materia Prima)', kau:'ivtStock.history',ini:{f:'ivtStock.history'}},
	{k:'ivtRep.ivtBal',t:'Inventario Valorizado', kau:'ivtRep.ivtBal', ini:{f:'ivtRep.ivtBal'}},
	{k:'ivtRep.rota',t:'Rotación Inventario', kau:'ivtRep.rota', ini:{f:'ivtRep.rota'}},
	{k:'ivtRep.kardex',t:'Kardex Inventario', kau:'ivtRep.kardex', ini:{f:'ivtRep.kardex'}},
	],{repM:['ivt'],prp:{mdlActive:'ivtHandle'}});

$M.liAdd('ivtHandle',[{_lineText:'_TB'}]);
$Tb._i({kObj:'itmOwhs',
	kMdl:'ivtHandle',liTxtG:'Almacenes',mdlActive:'ivtMWhs',liTxtF:'Almacen',
	Cols:[
	{t:'Código',k:'whsCode',divLine:1,wxn:'wrapx8',T:{tag:'input'}},
	{t:'Nombre',k:'whsName',wxn:'wrapx4',T:{tag:'input'}},
	{t:'Tipo',k:'whsType',wxn:'wrapx8',_V:'itmWhsType',T:{tag:'select',opts:$V.itmWhsType}},
	{t:'Externa',k:'external',wxn:'wrapx8',_V:'NY',T:{tag:'select',opts:$V.NY,noBlank:'Y'}},
	{t:'Dirección',k:'street',divLine:1,wxn:'wrapx1',T:{tag:'input'}}
	]
});
$M.liAdd('ivtHandle',[{_lineText:'_JSV'}]);
$JsV._i({kMdl:'ivtHandle',kObj:'ivtDocClass',mdl:'itm',liTxtG:'Clase - Documentos',liTxtF:'Clase Documento'});

$M.liAdd('ivtHandle',[ //Itf.DT
{k:'itfDT.ivtAwh',t:'Generar Doc. Ajuste Inventario', kau:'itfDT.ivtAwh',mdlActive:'itfImp', func:function(){
	$M.Ht.ini({g:function(){
		Itf.DT.form({text:'Documento Ajuste Inventario',api:Api.Ivt.b+'dt/ivtAwh',helpFie:'Y',fileName:'Plantilla Ajuste Inventario',descrip:'Se genera un nuevo documento de ajuste de inventario, y se actualizan las cantidades en el inventario solo de los articulos definidos para la bodega.',
		divL:[
		{divLine:1,L:'Almacen',req:'Y',wxn:'wrapx8',I:{tag:'select',name:'whsId',opts:$Tb.itmOwhs}},
		{L:'Serie',req:'Y',wxn:'wrapx8',I:{tag:'select',name:'serieId',opts:$Tb.docSerie['ivtAwh']}}
		],
		Li:[
			{t:'itemCode',d:'Código de Artículo',len:[1,20],req:'Y'},
			{t:'itemSzId',d:'Código S/P',req:'Y',opts:$V.grs1,optsTb:1},
			{t:'quantity',d:'Cantidad contada',req:'Y',xformat:'number'}
		]
		});
	}
	});
}},
{k:'itfDT.ivtRiv',t:'Generar Revalorización Inventario', kau:'itfDT.ivtRiv',mdlActive:'itfImp', func:function(){
	$M.Ht.ini({g:function(){
		var html=$1.t('div',{textNode:'Se genera un nuevo documento de revalorización de inventario, y se actualizan las cantidades en el inventario solo de los articulos definidos para la bodega.'});
		Itf.DT.form({text:'Documento Revalorización Inventario',api:Api.Ivt.b+'dt/ivtRiv',helpFie:'Y',fileName:'Plantilla Revalorización Inventario',html:html,
		divL:[
		{divLine:1,L:'Almacen',req:'Y',wxn:'wrapx8',I:{tag:'select',name:'whsId',opts:$Tb.itmOwhs}},
		{L:'Serie',req:'Y',wxn:'wrapx8',I:{tag:'select',name:'serieId',opts:$Tb.docSerie['ivtRiv']}}
		],
		Li:[
			{t:'itemCode',d:'Código de Artículo',len:[1,20],req:'Y'},
			{t:'itemSzId',d:'Código S/P',req:'Y',opts:$V.grs1,optsTb:1},
			{t:'quantity',d:'Cantidad contada',req:'Y',xformat:'number'},
			{t:'priceLine',d:'Valor Unitario del Producto',req:'Y',xformat:'number'},
		]
		});
	}
	});
}},
{k:'itfDT.itmBC',t:'Código de Barras', kau:'itfDT.itmBC',mdlActive:'itfImp', func:function(){
	$M.Ht.ini({g:function(){
		Itf.DT.form({api:Api.Ivt.b+'dt/itmBc',fileName:'Plantilla Creacion Articulo',helpFie:'Y',
		Li:[
				{trSep:'Datos Generales'},
			{t:'itemId',d:'Código de Articulo',xformat:'9z',len:[2,20],req:'Y'},
			{t:'itemSzId',d:'Subproducto',req:'Y',optsTb:1,opts:$V.grs1},
			{t:'grTypeId',d:'ID grupo codigo',req:'Y',optsTb:1,opts:$JsV.itmBcGr},
			{t:'barCode',d:'Codigo de barras',req:'Y',len:[1,20]}
		]
		});
	}
	});
}}
]);
