Gvt.Sor={
OLg:function(L){
	var Li=[];
	if(L.docStatus=='S'){
		Li.push({k:'edit',ico:'fa fa-pencil',textNode:' Modificar', P:L, func:function(T){ $Doc.go('gvtSor','f',T.P,1); } });
	}
	Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtSor','v',T.P,1); } });
	if(L.canceled=='N'){
		Li.push({k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Gvt.pr+'sorBasic/statusCancel',text:'Se va anular el documento.'}); } });
	}
	if(L.docStatus=='O'){
		Li.push({k:'statusC',ico:'fa fa-lock',textNode:' Cerrar Orden', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Gvt.pr+'sorBasic/statusClose',text:''}); } });
		Li.push({k:'openQty',ico:'fa fa_doc',textNode:'Pendientes', P:L, func:function(T){ $Doc.go('gvtSor','openQty',T.P,1); } });
		Li.push({k:'edit',ico:'fa fa-files-o',textNode:' Facturar',P:L,func:function(T){
			$Api.copyFrom({to:'gvtSin.form',f:Api.Gvt.js+'sorBasic/'+T.P.docEntry+'/toSin',AJs:[{k:'ott',v:'gvtSor'},{k:'otr',v:T.P.docEntry}]});
		}});
		Li.push({k:'genSdn',ico:'fa fa-file-o',textNode:' Generar Entrega de Venta', P:L, func:function(T){ Gvt.Sor.genSdn(T.P); }});
	}
	if(L.docStatus=='S'){
		Li.push({k:'statusO',ico:'fa fa_listWin',textNode:' Abrir Orden', P:L, func:function(T){
			$Doc.statusDefine({reqMemo:'N',docEntry:T.P.docEntry,api:Api.Gvt.js+'sorBasic/statusOpen',text:'Marcar como abierto'});
		}});
	}
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
	$Doc.tbList({api:Api.Gvt.js+'sor',inputs:$1.G.filter(),
	fOpts:Gvt.Sor.opts,view:'Y',docBy:'userDate',
	tbSerie:'gvtSor',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatusSor'},
		{H:'Fecha',k:'docDate'},
		{H:'Cliente',k:'cardName'},
		{H:'Bodega',k:'whsId',_gTb:'itmOwhs'},
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
	var P=$M.T.d(0,{D:{}}); var Pa=$M.read();
	var D=P.D;
	var cont=$M.Ht.cont;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	$Api.get({f:Api.Gvt.js+'sor/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr){ D=Jr; }
		if(!D.docDate){ D.docDate=$2d.today; }
		if(!D.dueDate){ D.dueDate=$2d.today; }
		if(!D.rteIva){ D.rteIva='Y'; }
		if(!D.rteIca){ D.rteIca='Y'; }
		var Dire=Addr.basic(D,null,{nodes:'Y'});
		$Doc.form({tbSerie:'gvtSor',cont:cont,docEdit:Pa.docEntry,POST:Api.Gvt.js+'sor',func:P.func,
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
		kFie:'itemCode,itemName,price,quantity,descPrcCalc,udm,vatId,rteId,priceLine,lineText'
		}
		});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.js+'sor/'+Pa.docEntry,loade:cont,func:function(Jr){
		Jr.L=$js.sortBy('lineNum',Jr.L);
		var tP={tbSerie:'gvtSor',D:Jr,
			btnsTop:{ks:'print,edit,statusO,statusS,openQty,statusN,statusD,statusC,statusCartera,genSdn,logs,',icons:'Y',Li:Gvt.Sor.OLg},
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
	$Api.get({f:Api.Gvt.js+'sor/'+Pa.docEntry+'/openQty',loade:cont,func:function(Jr){
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
	$Api.copyFrom({to:'gvtSdn.form',AJs:[{k:'ott',value:'gvtSor'},{k:'otr',v:Pa.docEntry}],
	AJsL:[{k:'id',a:'lineTr'},'openQty'], f:Api.Gvt.js+'sor/genSdn',inputs:'docEntry='+Pa.docEntry,
	func:function(Jr){
		if(Jr.L && Jr.L.errNo==2){
			Jr.errNo=1; Jr.text='El documento no tiene lineas disponibles para generar un documento de entrega';
			return $Api.resp(cont,Jr);
		}
	}});
},
}
