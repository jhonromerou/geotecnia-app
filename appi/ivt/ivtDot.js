$V.Mdls['ivtDot']={t:'Inventarios / Dotación',ico:'fa fa-wrench'};
$V.itmType.push({k:'AI',v:'Art. Interno'});
Ivt.Dot={};
$oB.push($V.docTT,[
{k:'ivtDotDoe',v:'Entrega Dotación'},{k:'ivtDotDoi',v:'Entrada Dotación'},{k:'ivtDotDos',v:'Salida Dotación'},,{k:'ivtDotDoa',v:'Ajuste Dotación'},
]);
$js.push($V.docSerieType,{
	'ivtDotDoe':{to:'ivtDotDoe',docT:'Entrega Dotac.',t:'Entrega Dotac.'},
	'ivtDotDoi':{to:'ivtDotDoi',docT:'Entrada Dotac.',t:'Entrada Dotac.'},
	'ivtDotDos':{to:'ivtDotDos',docT:'Salida Dotac.',t:'Salida Dotac.'},
	'ivtDotDoa':{to:'ivtDotDoa',docT:'Ajuste Dotac.',t:'Ajuste Dotac.'}
});

$M.kauAssg('ivt',[
{k:'ivtDotDoe',t:'Entregas Dotación'},{k:'ivtDotES',t:'Entradas /Salidas Dotación'},{k:'ivtDotDoa',t:'Ajustes Dotación'}
]);


_Fi['ivtDotDoe']=function(wrap,x){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Estado',I:{lTag:'select','class':jsV,name:'A.docStatus',opts:$V.docStatusOCN}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Fecha',I:{lTag:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Corte',I:{lTag:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Clase',I:{lTag:'select','class':jsV,name:'A.docClass',opts:$JsV.ivtDotDoeCls}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Almacen',I:{lTag:'select','class':jsV,name:'A.whsId',opts:$Tb.itmOwhs,kIf:{whsType:'AI'}}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Sede',I:{lTag:'select','class':jsV,name:'A.prp1',opts:$Tb.owsu}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Empleado',I:{lTag:'input','class':jsV,name:'C.cardName(E_like3)'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Ivt.Dot.Doe.get(); }},wrap);
};
_Fi['ivtDotDoi']=function(wrap,x){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Estado',I:{lTag:'select','class':jsV,name:'A.docStatus',opts:$V.docStatusOCN}},wrap);
	$1.T.divL({wxn:'wrapx4',L:'Empleado',I:{lTag:'input','class':jsV,name:'C.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Clase',I:{lTag:'select','class':jsV,name:'A.docClass',opts:$JsV.ivtDotDocCls}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha',I:{lTag:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Corte',I:{lTag:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Ivt.Dot.Doi.get(); }},wrap);
};
_Fi['ivtDotDos']=function(wrap,x){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Estado',I:{lTag:'select','class':jsV,name:'A.docStatus',opts:$V.docStatusOCN}},wrap);
	$1.T.divL({wxn:'wrapx4',L:'Empleado',I:{lTag:'input','class':jsV,name:'C.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Clase',I:{lTag:'select','class':jsV,name:'A.docClass',opts:$JsV.ivtDotDocCls}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha',I:{lTag:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Corte',I:{lTag:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Ivt.Dot.Dos.get(); }},wrap);
};
_Fi['ivtDotDoa']=function(wrap,x){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Estado',I:{lTag:'select','class':jsV,name:'A.docStatus',opts:$V.docStatusOCN}},wrap);
	$1.T.divL({wxn:'wrapx4',L:'Empleado',I:{lTag:'input','class':jsV,name:'C.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Clase',I:{lTag:'select','class':jsV,name:'A.docClass',opts:$JsV.ivtDotDocCls}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha',I:{lTag:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Corte',I:{lTag:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Ivt.Dot.Doa.get(); }},wrap);
};


Ivt.Dot.Doe={ /*Entregas */
OLg:function(L){
	var Li=[];
	Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $M.to('ivtDotDoe.view','docEntry:'+T.P.docEntry); } });
	Li.push({k:'logs',ico:'fa fa-history',textNode:' Logs', P:L, func:function(T){ $Doc.tb99({api:Api.Ivt.pr+'dotDoe/tb99',docEntry:T.P.docEntry}); } });
	if(L.canceled=='N'){
		Li.push({k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Ivt.pr+'dotDoe/statusCancel',text:'Se va anular el documento.'}); } });
	}
	return $Opts.add('ivtDotDoe',Li,L);;
},
opts:function(P,pare){
	Li={Li:Ivt.Dot.Doe.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Ivt.pr+'dotDoe',inputs:$1.G.filter(),
	fOpts:Ivt.Dot.Doe.opts,view:'Y',docBy:'userDate',
	tbSerie:'ivtDotDoe',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatusAll'},
		{H:'Fecha',k:'docDate'},
		{H:'Empleado',k:'cardName'},
		{H:'Almacen',k:'whsId',_gTb:'itmOwhs'},
		{H:'Clase',k:'docClass',_gTb:'ivtDotDoeCls'},
		{H:'Ref 1',k:'ref1'},
	],
	tbExport:{ext:'xlsx',fileName:'Entrega de Dotación'}
	},cont);
},
form:function(){
	var D={}; var Pa=$M.read();
	var topCont=$M.Ht.cont;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	$Api.get({f:Api.Ivt.pr+'dotDoe/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:topCont,func:function(Jr){
		if(Jr){ D=Jr; }
		if(!D.docDate){ D.docDate=$2d.today; }
		var rbCode=$Mdl.defCnf('ivtDotDoeBCode');
		if(rbCode){
			var tagCrd={lTag:'disabled',L:'Empleado',wxn:'wrapx3',req:'Y',I:{name:'cardId','class':'__crd'}};
			Nom.Crd.Bio.bCode(function(Da){
				var qt=$1.q('.__crd');
				qt.value=Da.cardName; qt.AJs={cardId:Da.cardId,cardName:Da.cardName};
			},{pare:topCont});
		}
		else{
			tagCrd={lTag:'card',L:'Empleado',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName'],cardType:'E'}};
		}
		var cont=$1.t('div',0,topCont); //separar
		$Doc.form({tbSerie:'ivtDotDoe',cont:cont,docEdit:Pa.docEntry,POST:Api.Ivt.pr+'dotDoe',func:D.func,
		HLs:[
			tagCrd,
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
			{lTag:'select',L:'Almacen',wxn:'wrapx8',req:'Y',I:{name:'whsId',opts:$Tb.itmOwhs,selected:D.whsId,kIf:{whsType:'AI'}}},
			{lTag:'select',L:'Clase',wxn:'wrapx8',req:'Y',aGo:'jsv.ivtDotDoeCls',I:{name:'docClass',opts:$JsV.ivtDotDoeCls,selected:D.docClass}},
			{lTag:'select',L:'Sede',wxn:'wrapx8',req:'Y',I:{name:'prp1',opts:$Tb.owsu,selected:D.prp1}},
			{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
			{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
		tbL:{xNum:'Y',xDel:'Y',uniqLine:'Y',L:D.L,itmSea:'ivt',itemType:'AI',bCode:'Y',
			RowsL:[
			['Codigo',{tag:'txt',kf:'itemCode',k:'itemCode',funcText:Itm.Txt.Code}],
			['Nombre',{tag:'txt',kf:'itemName',k:'itemName',funcText:Itm.Txt.name}],
			['Precio',{lTag:'$',kf:'price',k:'price',style:'width:6rem'}],
			[{textNode:'Cant.',style:'width:6rem;'},{lTag:'number',kf:'quantity',k:'quantity',min:0,style:'width:4rem'}],
			[{textNode:'Udm',_iHelp:'Unidad de Medida',style:'width:4rem;'},{tag:'span',kf:'udm',k:'udm',noCls:1}]
			]
		}
		});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Ivt.pr+'dotDoe/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'ivtDotDoe',D:Jr,
			btnsTop:{ks:'print,statusN,',icons:'Y',Li:Ivt.Dot.Doe.OLg},
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:7,ln:1},
				,{t:'Estado',k:'docStatus',_V:'docStatusAll'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{t:'Clase',k:'docClass',_g:$JsV.ivtDotDoeCls},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'prp1',_g:$Tb.owsu,ln:1,cs:2},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Total',k:'priceLine',format:'$'}
			]}
			],
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
}
}

Ivt.Dot.Doi={
OLg:function(L){
	var Li=[];
	Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $M.to('ivtDotDoi.view','docEntry:'+T.P.docEntry); } });
	Li.push({k:'logs',ico:'fa fa-history',textNode:' Logs', P:L, func:function(T){ $Doc.tb99({api:Api.Ivt.pr+'dotDoi/tb99',docEntry:T.P.docEntry}); } });
	if(L.canceled=='N'){
		Li.push({k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Ivt.pr+'dotDoi/statusCancel',text:'Se va anular el documento.'}); } });
	}
	return $Opts.add('ivtDotDoi',Li,L);;
},
opts:function(P,pare){
	Li={Li:Ivt.Dot.Doi.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Ivt.pr+'dotDoi',inputs:$1.G.filter(),
	fOpts:Ivt.Dot.Doi.opts,view:'Y',docBy:'userDate',
	tbSerie:'ivtDotDoi',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatusAll'},
		{H:'Fecha',k:'docDate'},
		{H:'Empleado',k:'cardName'},
		{H:'Almacen',k:'whsId',_gTb:'itmOwhs'},
		{H:'Clase',k:'docClass',_gTb:'ivtDotDocCls'},
		{H:'Ref 1',k:'ref1'},
	],
	tbExport:{ext:'xlsx',fileName:'Entradas de Dotación'}
	},cont);
},
form:function(){
	var D={}; var Pa=$M.read();
	var cont=$M.Ht.cont;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	$Api.get({f:Api.Ivt.pr+'dotDoi/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr){ D=Jr; }
		if(!D.docDate){ D.docDate=$2d.today; }
		$Doc.form({tbSerie:'ivtDotDoi',cont:cont,docEdit:Pa.docEntry,POST:Api.Ivt.pr+'dotDoi',func:D.func,
		HLs:[
			{lTag:'card',L:'Tercero',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName'],cardType:'E'}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
			{lTag:'select',L:'Almacen',wxn:'wrapx8',req:'Y',I:{name:'whsId',opts:$Tb.itmOwhs,selected:D.whsId,kIf:{whsType:'AI'}}},
			{lTag:'select',L:'Clase',wxn:'wrapx8',req:'Y',I:{name:'docClass',opts:$JsV.ivtDotDocCls,selected:D.docClass}},
			{lTag:'select',L:'Sede',wxn:'wrapx8',req:'Y',I:{name:'prp1',opts:$Tb.owsu,selected:D.prp1}},
			{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
			{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
		tbL:{xNum:'Y',xDel:'Y',uniqLine:'Y',L:D.L,itmSea:'ivt',itemType:'AI',bCode:'Y',
			RowsL:[
			['Codigo',{tag:'txt',kf:'itemCode',k:'itemCode',funcText:Itm.Txt.Code}],
			['Nombre',{tag:'txt',kf:'itemName',k:'itemName',funcText:Itm.Txt.name}],
			['Precio',{lTag:'$',kf:'price',k:'price',style:'width:6rem'}],
			[{textNode:'Cant.',style:'width:6rem;'},{lTag:'number',kf:'quantity',k:'quantity',min:0,style:'width:4rem'}],
			[{textNode:'Udm',style:'width:4rem;'},{tag:'span',kf:'udm',k:'udm',noCls:1}]
			]
		}
		});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Ivt.pr+'dotDoi/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'ivtDotDoi',D:Jr,
			btnsTop:{ks:'print,statusN,',icons:'Y',Li:Ivt.Dot.Doi.OLg},
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:7,ln:1},
				,{t:'Estado',k:'docStatus',_V:'docStatusAll'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{t:'Clase',k:'docClass',_g:$JsV.ivtDotDocCls},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'prp1',_g:$Tb.owsu,ln:1,cs:2},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Total',k:'priceLine',format:'$'}
			]}
			],
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
}
}

Ivt.Dot.Dos={
OLg:function(L){
	var Li=[];
	Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $M.to('ivtDotDos.view','docEntry:'+T.P.docEntry); } });
	Li.push({k:'logs',ico:'fa fa-history',textNode:' Logs', P:L, func:function(T){ $Doc.tb99({api:Api.Ivt.pr+'dotDos/tb99',docEntry:T.P.docEntry}); } });
	if(L.canceled=='N'){
		Li.push({k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Ivt.pr+'dotDos/statusCancel',text:'Se va anular el documento.'}); } });
	}
	return $Opts.add('ivtDotDos',Li,L);;
},
opts:function(P,pare){
	Li={Li:Ivt.Dot.Dos.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Ivt.pr+'dotDos',inputs:$1.G.filter(),
	fOpts:Ivt.Dot.Dos.opts,view:'Y',docBy:'userDate',
	tbSerie:'ivtDotDos',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatusAll'},
		{H:'Fecha',k:'docDate'},
		{H:'Empleado',k:'cardName'},
		{H:'Almacen',k:'whsId',_gTb:'itmOwhs'},
		{H:'Ref 1',k:'ref1'},
	],
	tbExport:{ext:'xlsx',fileName:'Salidas de Dotación'}
	},cont);
},
form:function(){
	var D={}; var Pa=$M.read();
	var cont=$M.Ht.cont;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	$Api.get({f:Api.Ivt.pr+'dotDos/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr){ D=Jr; }
		if(!D.docDate){ D.docDate=$2d.today; }
		$Doc.form({tbSerie:'ivtDotDos',cont:cont,docEdit:Pa.docEntry,POST:Api.Ivt.pr+'dotDos',func:D.func,
		HLs:[
			{lTag:'card',L:'Tercero',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName'],cardType:'E'}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
			{lTag:'select',L:'Almacen',wxn:'wrapx8',req:'Y',I:{name:'whsId',opts:$Tb.itmOwhs,selected:D.whsId,kIf:{whsType:'AI'}}},
			{lTag:'select',L:'Clase',wxn:'wrapx8',req:'Y',I:{name:'docClass',opts:$JsV.ivtDotDocCls,selected:D.docClass}},
			{lTag:'select',L:'Sede',wxn:'wrapx8',req:'Y',I:{name:'prp1',opts:$Tb.owsu,selected:D.prp1}},
			{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
			{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
		tbL:{xNum:'Y',xDel:'Y',uniqLine:'Y',L:D.L,itmSea:'ivt',itemType:'AI',bCode:'Y',
			RowsL:[
			['Codigo',{tag:'txt',kf:'itemCode',k:'itemCode',funcText:Itm.Txt.Code}],
			['Nombre',{tag:'txt',kf:'itemName',k:'itemName',funcText:Itm.Txt.name}],
			['Precio',{lTag:'$',kf:'price',k:'price',style:'width:6rem'}],
			[{textNode:'Cant.',style:'width:6rem;'},{lTag:'number',kf:'quantity',k:'quantity',min:0,style:'width:4rem'}],
			[{textNode:'Udm',style:'width:4rem;'},{tag:'span',kf:'udm',k:'udm',noCls:1}]
			]
		}
		});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Ivt.pr+'dotDos/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'ivtDotDos',D:Jr,
			btnsTop:{ks:'print,statusN,',icons:'Y',Li:Ivt.Dot.Dos.OLg},
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:7,ln:1},{t:'Estado',k:'docStatus',_V:'docStatusAll'},
				{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{t:'Clase',k:'docClass',_g:$JsV.ivtDotDocCls},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'prp1',_g:$Tb.owsu,ln:1,cs:2},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Precio',k:'price',format:'$'},
				{t:'Cant.',k:'quantity',format:'number'},
				{t:'Total',k:'priceLine',format:'$'}
			]}
			],
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
}
}

Ivt.Dot.Doa={
OLg:function(L){
	var Li=[];
	Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $M.to('ivtDotDos.view','docEntry:'+T.P.docEntry); } });
	Li.push({k:'logs',ico:'fa fa-history',textNode:' Logs', P:L, func:function(T){ $Doc.tb99({api:Api.Ivt.pr+'dotDoa/tb99',docEntry:T.P.docEntry}); } });
	if(L.canceled=='N'){
		Li.push({k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Ivt.pr+'dotDoa/statusCancel',text:'Se va anular el documento.'}); } });
	}
	return $Opts.add('ivtDotDos',Li,L);;
},
opts:function(P,pare){
	Li={Li:Ivt.Dot.Dos.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Ivt.pr+'dotDoa',inputs:$1.G.filter(),
	fOpts:Ivt.Dot.Doa.opts,view:'Y',docBy:'userDate',
	tbSerie:'ivtDotDoa',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatusAll'},
		{H:'Fecha',k:'docDate'},
		{H:'Empleado',k:'cardName'},
		{H:'Almacen',k:'whsId',_gTb:'itmOwhs'},
		{H:'Ref 1',k:'ref1'},
	],
	tbExport:{ext:'xlsx',fileName:'Ajustes de Dotación'}
	},cont);
},
form:function(){
	var D={}; var Pa=$M.read();
	var cont=$M.Ht.cont;
	var AJs={};
	var crdVal=(D.cardId)?D.cardName:'';
	$Api.get({f:Api.Ivt.pr+'dotDoa/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr){ D=Jr; }
		if(!D.docDate){ D.docDate=$2d.today; }
		$Doc.form({tbSerie:'ivtDotDoa',cont:cont,docEdit:Pa.docEntry,POST:Api.Ivt.pr+'dotDoa',func:D.func,
		HLs:[
			{lTag:'card',L:'Tercero',wxn:'wrapx3',req:'Y',I:{topPare:cont,D:D,AJsPut:['cardName'],cardType:'E'}},
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate}},
			{lTag:'select',L:'Almacen',wxn:'wrapx8',req:'Y',I:{name:'whsId',opts:$Tb.itmOwhs,selected:D.whsId,kIf:{whsType:'AI'}}},
			{lTag:'select',L:'Clase',wxn:'wrapx8',req:'Y',I:{name:'docClass',opts:$JsV.ivtDotDocCls,selected:D.docClass}},
			{lTag:'select',L:'Sede',wxn:'wrapx8',req:'Y',I:{name:'prp1',opts:$Tb.owsu,selected:D.prp1}},
			{divLine:1,lTag:'input',L:'Ref 1',wxn:'wrapx8',I:{name:'ref1',value:D.ref1}},
			{lTag:'input',L:'Ref 2',wxn:'wrapx8',I:{name:'ref2',value:D.ref2}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}}
		],
		tbL:{xNum:'Y',xDel:'Y',uniqLine:'Y',L:D.L,itmSea:'ivt',itemType:'AI',bCode:'Y',
			RowsL:[
			['Codigo',{tag:'txt',kf:'itemCode',k:'itemCode',funcText:Itm.Txt.Code}],
			['Nombre',{tag:'txt',kf:'itemName',k:'itemName',funcText:Itm.Txt.name}],
			['Precio',{lTag:'$',kf:'price',k:'price',style:'width:6rem'}],
			[{textNode:'Cant.',style:'width:6rem;'},{lTag:'number',kf:'quantity',k:'quantity',min:0,style:'width:4rem'}],
			[{textNode:'Udm',style:'width:4rem;'},{tag:'span',kf:'udm',k:'udm',noCls:1}]
			]
		}
		});
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Ivt.pr+'dotDoa/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'ivtDotDoa',D:Jr,
			btnsTop:{ks:'print,statusN,',icons:'Y',Li:Ivt.Dot.Doa.OLg},
			THs:[
				{sdocNum:1},{sdocTitle:1,cs:7,ln:1},{t:'Estado',k:'docStatus',_V:'docStatusAll'},
				{middleInfo:'Y'},{logo:'Y'},
				{t:'Fecha',k:'docDate'},
				{t:'Clase',k:'docClass',_g:$JsV.ivtDotDocCls},
				{k:'licTradType',_V:'licTradType'},{k:'licTradNum',ln:1},{k:'cardName',cs:4,ln:1},{k:'prp1',_g:$Tb.owsu,ln:1,cs:2},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',fieldset:'Lineas',TLs:[
				{t:'Código',k:'itemCode',fText:Itm.Txt.code},
				{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				{t:'Fisico',k:'quantity',format:'number'},
				{t:'Sistema',k:'handAt',format:'number'},
				{t:'Precio',k:'price',format:'$'},
				{t:'Desviación',k:'diffQty',format:'number'},
				{t:'Total',k:'price',fText:function(Lx){ return Lx.price*Lx.diffQty; },format:'$'},
			]}
			],
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
}
}

$M.liAdd('ivtDot',[
{_lineText:'Inventarios / Dotación'},
{k:'ivtDotDoe',t:'Entregas',d:'Entregas de Dotación', kau:'ivtDotDoe',ini:{btnGo:'ivtDotDoe.form',f:'ivtDotDoe',gyp:Ivt.Dot.Doe.get}},
{k:'ivtDotDoe.form',t:'Entrega Dotación (form)', kau:'ivtDotDoe',ini:{g:Ivt.Dot.Doe.form}},
{k:'ivtDotDoe.view',noTitle:'Y', kau:'ivtDotDoe',ini:{g:Ivt.Dot.Doe.view}},

{k:'ivtDotDoi',t:'Entradas',d:'Entradas de Mercancia Dotación', kau:'ivtDotES',ini:{btnGo:'ivtDotDoi.form',f:'ivtDotDoi',gyp:Ivt.Dot.Doi.get}},
{k:'ivtDotDoi.form',t:'Entrada Dotación (form)', kau:'ivtDotES',ini:{g:Ivt.Dot.Doi.form}},
{k:'ivtDotDoi.view',noTitle:'Y', kau:'ivtDotES',ini:{g:Ivt.Dot.Doi.view}},

{k:'ivtDotDos',t:'Salidas',d:'Salidas de Mercancia Dotación', kau:'ivtDotES',ini:{btnGo:'ivtDotDos.form',f:'ivtDotDos',gyp:Ivt.Dot.Dos.get}},
{k:'ivtDotDos.form',t:'Salida Dotación (form)', kau:'ivtDotES',ini:{g:Ivt.Dot.Dos.form}},
{k:'ivtDotDos.view',noTitle:'Y', kau:'ivtDotES',ini:{g:Ivt.Dot.Dos.view}},

{k:'ivtDotDoa',t:'Ajustes',d:'Ajustes del Inventario de Dotación', kau:'ivtDotDoa',ini:{btnGo:'ivtDotDoa.form',f:'ivtDotDoa',gyp:Ivt.Dot.Doa.get}},
{k:'ivtDotDoa.form',t:'Ajuste Dotación (form)', kau:'ivtDotDoa',ini:{g:Ivt.Dot.Doa.form}},
{k:'ivtDotDoa.view',noTitle:'Y', kau:'ivtDotDoa',ini:{g:Ivt.Dot.Doa.view}},
],{prp:{mdlActive:'ivtDot'}});

$M.liAdd('ivt',[{_lineText:'_JSV'}]);
$JsV._i({kMdl:'ivtDot',kObj:'ivtDotDoeCls',mdl:'itm',liTxtG:'Clases Entrega Dotación',liTxtF:'Clase Entrega Dotación (Form)'});
$JsV._i({kMdl:'ivtDot',kObj:'ivtDotDocCls',mdl:'itm',liTxtG:'Clases Docs. Dotación',liTxtF:'Clase Doc. Dotación (Form)'});