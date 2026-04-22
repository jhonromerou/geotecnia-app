$V.Mdls['ivtGes']={t:'Gestión de Lotes',ico:'fa fa-leaf'};
$oB.push($V.docTT,[
{k:'ivtBitO',v:'Apertura Lotes'},{k:'ivtBitE',v:'Salida Por Lotes'},{k:'ivtBitI',v:'Entrada Por Lotes'},{k:'ivtBitD',v:'Baja de Lotes'}
]);
$V.ivtMetVal=[{k:'PP',v:'Promedio Ponderado'},{k:'CD',v:'Definido'}];
$V.ivtBitStatus=[{k:'O',v:'Abierto'},{k:'L',v:'Bloqueado'}];
$JsV.ivtBitETypes=[{k:1,v:'Despacho'},{k:2,v:'Remisión'},{k:3,v:'Rotura'},{k:3,v:'Otros'}];


$M.kauAssg('ivt',[
	{k:'ivtBitO',t:'Apertura de Lotes'},
	{k:'ivtBitE',t:'Salida por Lotes'},
	{k:'ivtBitI',t:'Entrada por Lotes'},
	{k:'ivtBitD',t:'Baja de Lotes'},
	{k:'ivtBit.stock',t:'Inventario por Lotes'},
]);

_Fi['ivtBitO']=function(wrap){
	$Doc.filter({func:Ivt.Bit.O.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{tbSerie:'ivtBitO'},{k:'docNum'},{k:'ordBy'},
	{k:'memo'},
	{wxn:'wrapx8',L:'Almacen',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}},{k:'rows',IFF:'Y'}
	],wrap);
};
_Fi['ivtBitL']=function(wrap){
	var jsV = 'jsFiltVars'
	$Doc.filter({func:Ivt.Bit.L.getList,docNum:'Y'},[
	{k:'d1',L:'Vencimiento >=',f:'BI.dueDate'},{k:'d2',f:'BI.dueDate',L:'Vencimiento <='},
	{wxn:'wrapx8',L:'Estado',I:{tag:'select',name:'BI.bStatus',opts:$V.ivtBitStatus}},
	{wxn:'wrapx8',L:'Almacen',I:{tag:'select',name:'BI.whsId',opts:$Tb.itmOwhs}},
	{wxn:'wrapx8',L:'Lote /s',I:{tag:'input',type:'number',min:0,'class':jsV,name:'A.bId(E_in)'}},
	{wxn:'wrapx8',L:'Código',I:{tag:'input','class':jsV,name:'I.itemCode'}},
	],wrap);
};
_Fi['ivtBitE']=function(wrap){
	$Doc.filter({func:Ivt.Bit.E.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{wxn:'wrapx8',L:'Almacen',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}},
	{tbSerie:'ivtBitE'},{k:'docNum'},{k:'ordBy'},
	{divLine:1,wxn:'wrapx8',L:'Tipo',I:{tag:'select',name:'A.docType',opts:$JsV.ivtBitETypes}},{k:'memo'},
	],wrap);
};
_Fi['ivtBitI']=function(wrap){
	$Doc.filter({func:Ivt.Bit.I.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{wxn:'wrapx8',L:'Almacen',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}},
	{tbSerie:'ivtBitE'},{k:'docNum'},{k:'ordBy'},{k:'memo'},
	],wrap);
};
_Fi['ivtBitD']=function(wrap){
	$Doc.filter({func:Ivt.Bit.D.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{wxn:'wrapx8',L:'Almacen',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}},
	{tbSerie:'ivtBitD'},{k:'docNum'},{k:'ordBy'},{k:'memo'},
	],wrap);
};
_Fi['ivtBit.stock']=function(wrap){
	var jsV = 'jsFiltVars';
	var vt2=[{k:'S',v:'Con Saldo'},{k:'Z',v:'En cero'},{k:'N',v:'Negativos'},{k:'A',v:'Todo'}];
	$Doc.filter({func:Ivt.Bit.Stock.get},[
	{wxn:'wrapx8',wxn:'wrapx8',L:'Almacen',I:{tag:'select',name:'whsId','class':jsV,opts:$Tb.itmOwhs}},
	{wxn:'wrapx8', L:'Visualizar',I:{tag:'select','class':jsV,name:'viewType2',opts:vt2,noBlank:1}},
	{wxn:'wrapx8',L:'Vencimiento >=',I:{tag:'date','class':jsV,name:'BI.dueDate(E_mayIgual)'}},
	{wxn:'wrapx8',L:'Vencimiento <=',I:{tag:'date','class':jsV,name:'BI.dueDate(E_menIgual)'}},
	{k:'rowsFull'},
	{divLine:1,wxn:'wrapx8', L:'Lote/s',I:{tag:'input',type:'text','class':jsV,name:'BI.bId(E_in)'}},
	{wxn:'wrapx8', L:'Código /s',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_in)',placeholder:'401,501'}},
	{wxn:'wrapx8', L:$TXT.itemSize,I:{tag:'select','class':jsV,name:'itemSzId',multiple:'multiple',optNamer:'IN',style:'height:5rem;',opts:$V.grs1}},
	{wxn:'wrapx4', L:{textNode:'Descripción'},I:{tag:'input',type:'text','class':jsV,name:'itemName'}}
	],wrap);
};
_Fi['ivtBit.stock.history']=function(wrap,itemType){
	var jsV = 'jsFiltVars';
	var Tags=$Doc.filtForm({rows:'Y'});
	var Pa=$M.read();
	var divL=$1.T.divL({divLine:1,wxn:'wrapx6',L:'Almacen',I:{tag:'select','class':jsV,name:'whsId',opts:$Tb.itmOwhs,selected:Pa.whsId}},wrap);
	$1.T.divL({wxn:'wrapx8', subText:'Fecha Inicial',subText:'Documento',L:'Fecha Inicio',I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Fecha Fin',I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	if(Tags.rows){ divL.appendChild(Tags.rows); }
	$1.T.divL({wxn:'wrapx8', L:'No. Documento',I:{tag:'input',type:'number','class':jsV,name:'A.tr'}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Lote/s',I:{tag:'input',type:'text','class':jsV,name:'BI.bId(E_in)',value:Pa.bId}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Código /s',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_in)',placeholder:'401,501',value:Pa.itemCode}},divL);
	$1.T.divL({wxn:'wrapx8', L:$TXT.itemSize,I:{tag:'select','class':jsV,name:'BI.itemSzId(E_in)',multiple:'multiple',optNamer:'IN',style:'height:5rem;',opts:$V.grs1,selected:Pa.itemSzId}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Descripción'},I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)'}},divL);
	btn=$1.T.btnSend({textNode:'Actualizar', func:Ivt.Bit.Stock.history},wrap);
	if(Pa.bId){ btn.click(); }
};

_Fi['ivtBitRep.down']=function(wrap){
	var jsV = 'jsFiltVars';
	opt1={GN:'General'};
	$Doc.filter({func:Ivt.Bit.Rep.down,docNum:'Y'},[
	{divLine:1,wxn:'wrapx8',L:'Tipo Reporte',I:{lTag:'select','class':jsV,name:'viewType',opts:opt1,noBlank:'Y'}},
	{k:'d1',value:$2d.add($2d.today,'-7days')},{k:'d2',value:$2d.today},
	{wxn:'wrapx8',L:'Tipo Baja',I:{lTag:'select','class':jsV,name:'B.lineType',opts:$JsV.ivtBitDType}},
	{wxn:'wrapx8',L:'Almacen',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}},
	{tbSerie:'ivtBitD'},{k:'docNum'},
	],wrap);
};


Ivt.Bit={};

Ivt.Bit.L={ //Lote pointer->O
	OLg:function(L){
		var Li=[];
		if(L.bStatus=='O'){
			Li.push({k:'public',ico:'fa fa-lock',textNode:' Bloquear Lote', P:L, func:function(T){ $Doc.statusDefine({reqMemo:'N',docEntry:T.P.bId,api:Api.Ivt.pr+'bitO/lock',text:'El lote será bloqueado en todas las bodegas'}); } });
		}
		else if(L.bStatus=='L'){
			Li.push({k:'public',ico:'fa fa-lock',textNode:' Desbloquear Lote', P:L, func:function(T){ $Doc.statusDefine({reqMemo:'N',docEntry:T.P.bId,api:Api.Ivt.pr+'bitO/lock',text:'El lote será desbloqueado en todas las bodegas'}); } });
		}
		return $Opts.add('ivtBitL',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Ivt.Bit.L.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	getList:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Ivt.pr+'bitO/getList',inputs:$1.G.filter(),
		fOpts:Ivt.Bit.L.opts,view:'N',tbSerie:'N',
		TD:[
			{H:'Bloqueado',k:'bStatus',_g:$V.ivtBitStatus},
			{H:'Lote',k:'bId'},
			{H:'Código',k:'itemCode',fText:Itm.Txt.code},
			{H:'Descripción',k:'itemName',fText:Itm.Txt.name},
			{H:'Inicial',k:'quantity',format:'number'},
			{H:'Stock',k:'onHand',format:'number'}
		]
		},cont);
	}
}

Ivt.Bit.O={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.pr+'bitO',tbSerie:'ivtBitO'});
		ab.add('v'); ab.add('N');
		ab.add('copy',{plus:'Y',btnText:'Entrada Mercancia',copy:{to:'ivtIng.form',f:Api.Ivt.pr+'bitO/toCopy',AJs:[{k:'ott',v:'ivtBitO'},{k:'otr',v:L.docEntry}]}});
		ab.add('R'); //ab.add('L');
		return $Opts.add('ivtBitO',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Ivt.Bit.O.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Ivt.pr+'bitO',inputs:$1.G.filter(),
		fOpts:Ivt.Bit.O.opts,view:'Y',docBy:'userDate',
		tbSerie:'ivtBitO',
		TD:[
			{H:'Estado',k:'docStatus',_V:'dStatus'},
			{H:'Fecha',k:'docDate',dateText:'mmm d'},
			{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
			{H:'Detalles',k:'lineMemo'}
		]
		},cont);
	},
	form:function(){
	var D=$Cche.d(0,{});
	var cont=$M.Ht.cont;
	var AJs={};
	var frm=$1.t('div');
	$Doc.form({tbSerie:'ivtBitO',AJs:D.AJs,cont:cont,midCont:frm,POST:Api.Ivt.pr+'bitO',func:D.func,
	reqFields:{
		D:[{k:'docDate',iMsg:'Fecha'},{k:'whsId',iMsg:'Almacen'}],
		L:['_req',{_t:'Lineas de Lotes'},{k:'quantity',iMsg:'Cantidad'},{k:'cardId',iMsg:'Fabricante'},{k:'manDate',iMsg:'Fecha fabricado'},{k:'dueDate',iMsg:'Fecha Vencimiento'}]
	},
	HLs:[
		{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:$2d.today}},
		{lTag:'whsId',L:'Almacen',req:'Y',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId}},
		{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo'}}
	]
	});
	var totalItems=0; //doc origen, sumar totales;
	var fromTt=(D.AJs && D.AJs.ott && D.AJs.otr);
	Itm.sea2Add({type:'ivtBit',bCode:'Y',func:function(Ds){
		for(var i in Ds){ trA(frm,Ds[i]); }
	}},frm);
	if(D.L){ for(var i in D.L){ trA(frm,D.L[i]); } }
	function trA(wrap,Lx){
		//se usa si viene desde origen cant total de articulo
		var addText=(fromTt)?' de '+Lx.quantity*1:'';
		if(fromTt){ totalItems += Lx.quantity*1; }
		var fie=$1.T.fieset({},wrap);
		var h4=$1.t('h4',{textNode:'Articulo: '+Itm.Txt.name(Lx)+' '+_g(Lx.udm,Udm.O)},fie);
		$1.t('span',{textNode:'\u0020\u0020'},h4);
		$1.T.btnFa({faBtn:'fa-close',textNode:'Eliminar Linea',func:function(){
			$1.delet(fie.parentNode);
		}},h4);
		var jsFL=$Api.JS.clsLN;
		var tb=$1.T.table(['Cant.','Fabricante','Código Fabric.','Fabricado','Vencimiento','Origen',''],0,fie);
		var tBody=$1.t('tbody',0,tb);
		var tFoot=$1.t('tfoot',0,tb);
		function trLine(L){
			L=(L)?L:{};
			var tr=$1.t('tr',{'class':$Api.JS.clsL},tBody);
			var td=$1.t('td',0,tr);
			$1.lTag({tag:'number','class':jsFL+' quantitys',name:'quantity', style:'width:120px',onkeychange:function(){
				tbCal.totalOf('.quantitys',fie,null,function(total){
					tdTotal.innerText = total+''+addText;
				});
				if(fromTt){ tbCal.totalOf('.quantitys',wrap,null,function(total){
					$Api.btnDisabled(total==totalItems,cont);
				}); }
			}},td);
			$Api.JS.addF({jsF:jsFL,AJs:{itemId:Lx.itemId,itemSzId:Lx.itemSzId}},td);
			var td=$1.t('td',0,tr);
			$1.lTag({tag:'card',jsF:jsFL,boxRep:'N',D:L},td);
			$1.lTag({tag:'input','class':jsFL,name:'manCode',maxLen:20,style:'width:120px'},$1.t('td',0,tr));
			$1.lTag({tag:'date','class':jsFL,name:'manDate',style:'width:120px'},$1.t('td',0,tr));
			$1.lTag({tag:'date','class':jsFL,name:'dueDate',style:'width:120px'},$1.t('td',0,tr));
			$1.lTag({tag:'input','class':jsFL,name:'lineMemo',maxLen:100,style:'width:120px'},$1.t('td',0,tr));
			$1.lineDel(L,null,$1.t('td',0,tr));
		}
		var tr=$1.t('tr',0,tFoot);
		var tdTotal=$1.t('td',0,tr);
		$1.t('td',{colspan:5},tr);
		trLine({});
		$1.T.btnFa({faBtn:'fa fa-plus',textNode:'Añadir Lote',func:trLine},fie);
	}
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:Api.Ivt.pr+'bitO/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'ivtBitO',D:Jr,
				main:Ivt.Bit.O.OLg,
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
					{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
					{t:'',cs:2},
					{k:'whsId',_g:$Tb.itmOwhs,cs:2},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
				],
				mTL:[
				{L:'L',fieldset:'Lineas',TLs:[
					{t:'Lote',k:'bId'},
					{t:'Código',k:'itemCode',fText:Itm.Txt.code},
					{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
					{t:'Cant.',k:'quantity',format:'number'},
					{t:'Fabricante',k:'cardName'},
					{t:'Origen',k:'lineMemo'},
					{t:'Fabricado',k:'manDate'},
					{t:'Vencimiento',k:'dueDate'}
				]}
				]
			};
			$Doc.view(cont,tP);
		}});
	},
}
Ivt.Bit.E={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.pr+'bitE',tbSerie:'ivtBitE'});
		ab.add('v'); ab.add('N');
		ab.add('copy',{plus:'Y',btnText:'Salida Mercancia',copy:{to:'ivtEgr.form',f:Api.Ivt.pr+'bitE/toCopy',AJs:[{k:'ott',v:'ivtBitE'},{k:'otr',v:L.docEntry}]}});
		ab.add('R'); ab.add('L');
		return $Opts.add('ivtBitE',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Ivt.Bit.E.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Ivt.pr+'bitE',inputs:$1.G.filter(),
		fOpts:Ivt.Bit.E.opts,view:'Y',docBy:'userDate',
		tbSerie:'ivtBitE',
		TD:[
			{H:'Estado',k:'docStatus',_V:'dStatus'},
			{H:'Fecha',k:'docDate',dateText:'mmm d'},
			{H:'Tipo',k:'docType',_g:$JsV.ivtBitETypes},
			{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
			{H:'Detalles',k:'lineMemo'}
		]
		},cont);
	},
	form:function(){
		var D=$Cche.d(0,{});
		var cont=$M.Ht.cont;
		var AJs={};
		var frm=$1.t('div');
		$Doc.form({tbSerie:'ivtBitE',AJs:D.AJs,cont:cont,midCont:frm,POST:Api.Ivt.pr+'bitE',func:D.func,
		HLs:[
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:$2d.today}},
			{lTag:'whsId',L:'Almacen',req:'Y',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId}},
			{lTag:'select',L:'Tipo',req:'Y',wxn:'wrapx8',I:{name:'docType',selected:D.docType,opts:$JsV.ivtBitETypes}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo'}}
		],
		reqFields:{
			D:[{k:'docDate',iMsg:'Fecha Doc'},{k:'whsId',iMsg:'Almacen',opts:D.whsId,},{k:'docType',iMsg:'Tipo Documento',opts:$JsV.ivtBitETypes}],
			L:['_req',{_t:'Se debe definir información en las lineas'},{k:'bId',iMsg:'Número de Lote'},{k:'quantity',iMsg:'Cantidad',_rev:['numeric>0']}]
		}
		});
		var P2={totalItems:0,
			fromTt:(D.AJs && D.AJs.ott && D.AJs.otr)
		};
		if(!P2.fromTt){
			Itm.sea2Add({type:'ivtBit',bCode:'Y',func:function(Ds){ 
			for(var i in Ds){ Ivt.Bit.Fx.ie(frm,Ds[i],P2); }
			}},frm);
		}
		if(D.L){ for(var i in D.L){ Ivt.Bit.Fx.ie(frm,D.L[i],P2); } }
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:Api.Ivt.pr+'bitE/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'ivtBitE',D:Jr,
				main:Ivt.Bit.E.OLg,
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
					{t:'Estado',k:'docStatus',_g:$V.docStatusAll},{middleInfo:'Y'},{logo:'Y'},
					{t:'Fecha',k:'docDate'},
					{k:'whsId',_g:$Tb.itmOwhs,cs:2},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
				],
				mTL:[
				{L:'L',fieldset:'Lineas',TLs:[
					{t:'Lote',k:'bId'},
					{t:'Cant.',k:'quantity',format:'number'},
					{t:'Código',k:'itemCode',fText:Itm.Txt.code},
					{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
					{t:'Fabricante',k:'cardName'},
					{t:'Origen',k:'lineMemo'}
				]}
				]
			};
			$Doc.view(cont,tP);
		}});
	},
}
Ivt.Bit.I={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.pr+'bitI',tbSerie:'ivtBitI'});
		ab.add('v');  ab.add('N'); 
		ab.add('copy',{plus:'Y',btnText:'Entrada de Mercancia',copy:{to:'ivtIng.form',f:Api.Ivt.pr+'ivtBitI/toCopy',AJs:[{k:'ott',v:'ivtBitO'},{k:'otr',v:L.docEntry}]}});
		ab.add('R'); ab.add('L');
		return $Opts.add('ivtBitI',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Ivt.Bit.I.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Ivt.pr+'bitI',inputs:$1.G.filter(),
		fOpts:Ivt.Bit.I.opts,view:'Y',docBy:'userDate',
		tbSerie:'ivtBitE',
		TD:[
			{H:'Estado',k:'docStatus',_V:'dStatus'},
			{H:'Fecha',k:'docDate',dateText:'mmm d'},
			{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
			{H:'Detalles',k:'lineMemo'}
		]
		},cont);
	},
	form:function(){
		var D=$Cche.d(0,{});
		var cont=$M.Ht.cont;
		var AJs={};
		var frm=$1.t('div');
		$Doc.form({tbSerie:'ivtBitI',AJs:D.AJs,cont:cont,midCont:frm,POST:Api.Ivt.pr+'bitI',func:D.func,
		HLs:[
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:$2d.today}},
			{lTag:'whsId',L:'Almacen',req:'Y',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo'}}
		],
		reqFields:{
			D:[{k:'docDate',iMsg:'Fecha Doc'},{k:'whsId',iMsg:'Almacen',opts:D.whsId}],
			L:['_req',{_t:'Se debe definir información en las lineas'},{k:'bId',iMsg:'Número de Lote'},{k:'quantity',iMsg:'Cantidad',_rev:['numeric>0']}]
		}
		});
		var P2={totalItems:0,
			fromTt:(D.AJs && D.AJs.ott && D.AJs.otr)
		};
		if(!P2.fromTt){
			Itm.sea2Add({type:'ivtBit',bCode:'Y',func:function(Ds){ 
			for(var i in Ds){ Ivt.Bit.Fx.ie(frm,Ds[i],P2); }
			}},frm);
		}
		if(D.L){ for(var i in D.L){ Ivt.Bit.Fx.ie(frm,D.L[i],P2); } }
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:Api.Ivt.pr+'bitI/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'ivtBitI',D:Jr,
				main:Ivt.Bit.I.OLg,
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
					{t:'Estado',k:'docStatus',_g:$V.docStatusAll},{middleInfo:'Y'},{logo:'Y'},
					{t:'Fecha',k:'docDate'},
					{k:'whsId',_g:$Tb.itmOwhs,cs:2},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
				],
				mTL:[
				{L:'L',fieldset:'Lineas',TLs:[
					{t:'Lote',k:'bId'},
					{t:'Código',k:'itemCode',fText:Itm.Txt.code},
					{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
					{t:'Cant.',k:'quantity',format:'number'},
					{t:'Fabricante',k:'cardName'}
				]}
				]
			};
			$Doc.view(cont,tP);
		}});
	},
}
Ivt.Bit.D={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Ivt.pr+'bitD',tbSerie:'ivtBitD'});
		ab.add('v'); ab.add('N');
		ab.add('copy',{plus:'Y',btnText:'Salida Mercancia',copy:{to:'ivtEgr.form',f:Api.Ivt.pr+'bitD/toCopy',AJs:[{k:'ott',v:'ivtBitD'},{k:'otr',v:L.docEntry}]}});
		ab.add('R'); ab.add('L');
		return $Opts.add('ivtBitD',Li,L);
	},
	opts:function(P,pare){
		Li={Li:Ivt.Bit.D.OLg(P.L),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Ivt.pr+'bitD',inputs:$1.G.filter(),
		fOpts:Ivt.Bit.D.opts,view:'Y',docBy:'userDate',
		tbSerie:'ivtBitD',
		TD:[
			{H:'Estado',k:'docStatus',_V:'dStatus'},
			{H:'Fecha',k:'docDate',dateText:'mmm d'},
			{H:'Almacen',k:'whsId',_g:$Tb.itmOwhs},
			{H:'Detalles',k:'lineMemo'}
		]
		},cont);
	},
	form:function(){
		var D=$Cche.d(0,{});
		var cont=$M.Ht.cont;
		var AJs={};
		var frm=$1.t('div');
		$Doc.form({tbSerie:'ivtBitD',AJs:D.AJs,cont:cont,midCont:frm,POST:Api.Ivt.pr+'bitD',func:D.func,
		HLs:[
			{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:$2d.today}},
			{lTag:'whsId',L:'Almacen',req:'Y',wxn:'wrapx8',I:{name:'whsId',selected:D.whsId}},
			{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo'}}
		],
		reqFields:{
			D:[{k:'docDate',iMsg:'Fecha Doc'},{k:'whsId',iMsg:'Almacen',opts:D.whsId,}],
			L:['_req',{_t:'Se debe definir información en las lineas'},{k:'bId',iMsg:'Número de Lote'},{k:'quantity',iMsg:'Cantidad',_rev:['numeric>0']}]
		}
		});
		var P2={totalItems:0,
			fromTt:(D.AJs && D.AJs.ott && D.AJs.otr),
			trLine:function(Px,tdPare){
				$1.lTag({tag:'select','class':Px.jsFL,name:'lineType',selected:Px.L.lineType,opts:$JsV.ivtBitDType},tdPare);
			}
		};
		if(!P2.fromTt){
			Itm.sea2Add({type:'ivtBit',bCode:'Y',func:function(Ds){ 
			for(var i in Ds){ Ivt.Bit.Fx.ie(frm,Ds[i],P2); }
			}},frm);
		}
		if(D.L){ for(var i in D.L){ Ivt.Bit.Fx.ie(frm,D.L[i],P2); } }
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:Api.Ivt.pr+'bitD/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'ivtBitD',D:Jr,
				main:Ivt.Bit.D.OLg,
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
					{t:'Estado',k:'docStatus',_g:$V.docStatusAll},{middleInfo:'Y'},{logo:'Y'},
					{t:'Fecha',k:'docDate'},
					{k:'whsId',_g:$Tb.itmOwhs,cs:2},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
				],
				mTL:[
				{L:'L',fieldset:'Lineas',TLs:[
					{t:'Lote',k:'bId'},
					{t:'Cant.',k:'quantity',format:'number'},
					{t:'Motivo Baja',k:'lineType',_g:$JsV.ivtBitDType},
					{t:'Código',k:'itemCode',fText:Itm.Txt.code},
					{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
				]}
				]
			};
			$Doc.view(cont,tP);
		}});
	},
}


Ivt.Bit.Stock={//actualizar
get:function(cont){
	cont =$M.Ht.cont; var Pa=$M.read('!');
	$Api.get({f:Api.Ivt.pr+'bitWhs', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var P=(P)?P:{};
			var tr1=['Lote','Código','Descripción',$TXT.itemSize,'Almacen','Stock','Vencimiento','% Fresc.',{textNode:'V.U.',_iHelp:'Dias vida util'},{textNode:'F.F',_iHelp:'Fecha de Frescura'},'Tercero','Lote Tercero'];
			var tb = $1.T.table(tr1);
			var tBody = $1.t('tbody',0,tb);
			var tr0=$1.q('thead tr',tb);
			$js.sortNum(Jr.L,{k:'itemCode'});
			$1.t('td',{textNode:''},tr0);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr = $1.t('tr',0,tBody);
				var css1=(L.onHand<0)?'color:#E00; font-weight:bold;':'';
				var xG=Ivt.Bit.Fx.batDays(L);
				vUtil=L.vUtil; pcUtil=L.pcUtil;
				var tdi=$1.t('td',0,tr);
				ks='bId:'+L.bId+',whsId:'+L.whsId+',itemCode:'+L.itemCode+',itemSzId:'+L.itemSzId;
				$1.t('a',{'class':'fa faBtn fa_eye',href:$M.to('ivtBit.stock.history',ks,'r'),title:'Visualizar Movimientos de Lote'},tdi);
				$1.t('span',{textNode:' '+L.bId},tdi);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:_g(L.itemSzId,$V.grs1,'')},tr);
				$1.t('td',{textNode:_g(L.whsId,$Tb.itmOwhs)},tr);
				$1.t('td',{textNode:L.onHand*1,style:css1,'class':tbSum.tbColNums,tbColNum:1},tr);
				$1.t('td',{textNode:L.dueDate},tr);
				$1.t('td',{textNode:pcUtil},tr);
				$1.t('td',{textNode:L.batDays*1},tr);
				$1.t('td',{textNode:vUtil},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:L.manCode},tr);
			}
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{colspan:5,textNode:'Total'},tr);
			$1.t('td',{'class':tbSum.tbColNumTotal+'1'},tr);
			$1.t('td',{colspan:3},tr);
			tbSum.get(tb);
			tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Reporte de Lotes'});
			cont.appendChild(tb);
		};
	}
	});
},
history:function(){
	cont =$M.Ht.cont;
	$Api.get({f:Api.Ivt.pr+'bitWhs/history', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['Origen','Doc.','Lote','Artículo','Descripción',$TXT.itemSize,'Entradas','Salidas','Saldo','Fecha']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var css1=(L.onHandAt<0)?'color:#E00; font-weight:bold;':'';
				var td=$1.t('td',0,tr);
				L.inQty*=1; L.outQty*=1;
				var inQty=(L.inQty!=0)?L.inQty:'';
				var outQty=(L.outQty!=0)?L.outQty:'';
				$Doc.href(L.tt,{docEntry:L.tr},{pare:td,format:'serie'});
				$1.t('td',{textNode:L.tr},tr);
				$1.t('td',{textNode:L.bId},tr);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:_g(L.itemSzId*1,$V.grs1)},tr);
				$1.t('td',{textNode:inQty,style:css1},tr);
				$1.t('td',{textNode:outQty,style:css1},tr);
				$1.t('td',{textNode:L.onHandAt*1,style:css1},tr);
				$1.t('td',{textNode:L.docDate},tr);
			}
			tb=$1.T.tbExport(tb,{ico:'xlsx',fileName:'Reporte de Movimientos de Lotes'});
			cont.appendChild(tb);
		}
	}});
},

}

Ivt.Bit.Rep={
	down:function(){
		$Api.Rep.base({f:Api.Ivt.pr+'bitRep/down',inputs:$1.G.filter(),
		V_GN:[{f:'bId',t:'Lote'},{f:'quantity',t:'Cantidad',fType:'number'}, {f:'lineType',t:'Motivo',_g:$JsV.ivtBitDType}, {f:'itemCode',t:'Código'},{f:'itemName',t:'Descripción'},{f:'itemSzId',t:'S',_g:$V.grs1},{f:'whsId',t:'Almacen',_g:$Tb.itmOwhs},{f:'docNum',t:'Documento'},
		],
		},$M.Ht.cont);
	},
}

Ivt.Bit.Fx={
	batDays:function(L){
		if(L.batDays>0){
			var vUtil=$2d.add(L.manDate,'+'+L.batDays+'days');
			var pcUtil=$2d.diff({date1:$2d.today,date2:vUtil},'d');
			pcUtil=Math.round(pcUtil/L.batDays*100)+'%';
		}
		else{
			vUtil=L.dueDate;
			var pcUtil=$2d.diff({date1:$2d.today,date2:L.dueDate},'d');
			pcUtil=Math.round(pcUtil/L.batDays*100)+'%';
		}
		return {vUtil:vUtil,pcUtil:pcUtil};
	},
	ie:function(wrap,Lx,P2){
		//se usa si viene desde origen cant total de articulo
		P2=(P2)?P2:{};
		fromTt=P2.fromTt;
		var addText=(fromTt)?' de '+Lx.quantity*1:'';
		if(fromTt){ P2.totalItems += Lx.quantity*1; }
		var fie=$1.T.fieset({},wrap);
		var h4=$1.t('h4',{textNode:'Articulo: '+Itm.Txt.name(Lx)+' '+_g(Lx.udm,Udm.O)},fie);
		$1.t('span',{textNode:'\u0020\u0020'},h4);
		$1.T.btnFa({faBtn:'fa-close',textNode:'Eliminar Linea',func:function(){
			$1.delet(fie.parentNode);
		}},h4);
		var jsFL=$Api.JS.clsLN;
		var tb=$1.T.table(['Lote','Cantidad','',''],0,fie);
		var tBody=$1.t('tbody',0,tb);
		var tFoot=$1.t('tfoot',0,tb);
		function trLine(L){
			L=(L)?L:{};
			var tr=$1.t('tr',{'class':$Api.JS.clsL},tBody);
			var td=$1.t('td',0,tr);
			$1.lTag({tag:'number','class':jsFL,name:'bId'},td);
			var td=$1.t('td',0,tr);
			$1.lTag({tag:'number','class':jsFL+' quantitys',name:'quantity',
			onkeychange:function(){
				tbCal.totalOf('.quantitys',fie,null,function(total){
					tdTotal.innerText = total+''+addText;
				});
				if(fromTt){ tbCal.totalOf('.quantitys',wrap,null,function(total){
					$Api.btnDisabled(total==P2.totalItems,cont);
				}); }
			}},td);
			if(P2.trLine){ 
				P2.trLine({jsFL:jsFL,L:L},$1.t('td',0,tr)); //añadir td
			}
			$1.lineDel(L,null,$1.t('td',0,tr));
		}
		var tr=$1.t('tr',0,tFoot);
		$1.t('td',0,tr);
		var tdTotal=$1.t('td',0,tr);
		tdTotal.innerText = 0+''+addText;
		$1.t('td',{colspan:2},tr);
		trLine({});
		$1.T.btnFa({faBtn:'fa fa-plus',textNode:'Añadir Lote',func:trLine},fie);
	}
};

$M.liAdd('ivtGes',[
	{_lineText:'Gestión de Lotes'},
	{k:'ivtBitL',t:'Gestión de Lotes', kau:'ivtBitO', ini:{f:'ivtBitL',gyp:function(){ Ivt.Bit.L.getList(); } }},
	{k:'ivtBitO',t:'Apertura Lotes', kau:'ivtBitO', ini:{f:'ivtBitO', btnGo:'ivtBitO.form',gyp:function(){ Ivt.Bit.O.get(); } }},
	{k:'ivtBitO.form',t:'Apertura Lotes (Form)', kau:'ivtBitO', ini:{g:function(){ Ivt.Bit.O.form(); } }},
	{k:'ivtBitO.view',noTitle:'Y',t:'Apertura Lotes (Doc)', kau:'ivtBitO', ini:{g:function(){ Ivt.Bit.O.view(); } }},
	
	{k:'ivtBitE',t:'Salida por Lotes', kau:'ivtBitE', ini:{f:'ivtBitE', btnGo:'ivtBitE.form',gyp:function(){ Ivt.Bit.E.get(); } }},
	{k:'ivtBitE.form',t:'Salida Por Lotes (Form)', kau:'ivtBitE', ini:{g:function(){ Ivt.Bit.E.form(); } }},
	{k:'ivtBitE.view',noTitle:'Y',t:'Salida Por Lotes (Doc)', kau:'ivtBitE', ini:{g:function(){ Ivt.Bit.E.view(); } }},
	
	{k:'ivtBitI',t:'Entrada por Lotes', kau:'ivtBitI', func:function(){
		$M.Ht.ini({f:'ivtBitI', btnGo:'ivtBitI.form',gyp:function(){ Ivt.Bit.I.get(); } });
	}},
	{k:'ivtBitI.form',t:'Entrada Por Lotes (Form)', kau:'ivtBitI', ini:{g:function(){ Ivt.Bit.I.form(); } }},
	{k:'ivtBitI.view',noTitle:'Y',t:'Entrada Por Lotes (Doc)', kau:'ivtBitI', ini:{g:function(){ Ivt.Bit.I.view(); } }},
	
	{k:'ivtBitD',t:'Baja de Lotes', kau:'ivtBitD', ini:{f:'ivtBitD', btnGo:'ivtBitD.form',gyp:function(){ Ivt.Bit.D.get(); } }},
	{k:'ivtBitD.form',t:'Baja de Lotes (Form)', kau:'ivtBitD', ini:{g:function(){ Ivt.Bit.D.form(); } }},
	{k:'ivtBitD.view',noTitle:'Y',t:'Baja de Lotes (Doc)', kau:'ivtBitD', ini:{g:function(){ Ivt.Bit.D.view(); } }}
],{prp:{mdlActive:'ivtGes'}});
$M.liRep('ivtGes',[
	{_lineText:'_REP'},
	{k:'ivtBit.stock',t:'Stock de Lotes', kau:'ivtBit.stock', ini:{f:'ivtBit.stock',gyp:function(){ Ivt.Bit.Stock.get(); } }},
	{k:'ivtBit.stock.history',t:'Histórico Movimientos de Lotes', kau:'ivtBit.stock', ini:{f:'ivtBit.stock.history',p:Ivt.Bit.Stock.history}},
	{k:'ivtBitRep.down',t:'Baja de Lotes', kau:'ivtBit.stock', ini:{f:'ivtBitRep.down'}},
],{repM:['ivtGes'],prp:{mdlActive:'ivtGes'}});
$M.liAdd('ivtGes',[{_lineText:'_JSV'}]);
$JsV._i({kMdl:'ivtGes',mdl:'itm',kObj:'ivtBitDType',liTxtG:'Lotes - Tipos de Baja',liTxtF:'Tipo de Baja (Form)'});
