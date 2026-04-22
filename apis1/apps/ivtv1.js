
$MdlStatus.put('ivt','Y');
Api.Ivt = {a:'/sa/c70/ivt/',b:'/sa/c70/ivt/barcode'};Api.Ivt.wht = '/1/ivt/wht/';Api.Ivt.ing = '/1/ivt/ing/';Api.Ivt.egr = '/1/ivt/egr/';Api.Ivt.whs='/1/ivt/whs/';Api.Ivt.aa='/1/ivt/';
$Doc.a['owht']={a:'ivt.wht.view',docT:'Transferencia de Stock'};
$Doc.a['oing']={a:'ivt.ing.view',docT:'Ingreso de Stock'};
$Doc.a['oegr']={a:'ivt.egr.view',docT:'Salida de Stock'};
$Doc.a['ocat']={a:'ivt.cat.view',docT:'Documento de Inventario'};
$Doc.a['ocph']={a:'ivt.cph.view'};
$Doc.a['oinc']={a:'ivt.inc.view',docT:'Recuento de Inventario'};$Doc.a['ivtAwh']={a:'ivtAwh.view',docT:'Ajuste de Inventario'};
$Doc.a['ivtMov']={a:'ivt.mov.view',docT:'',docT:'Movimiento Inventario'};
$js.push($V.docSerieType,{owht:'Trans.-Stock',oing:'Ent-Inv',oegr:'Sal-Inv',ocat:'Tom-Inv',ocph:'Cambio Homol.',oinc:'Rec. Inv.',ivtAwh:'Ajust. Inv.',ivtMov:'Movim. Inv.'});
$V.ingDocClass={produccion:'Producción',devolucion:'Devolución',cambio:'Cambio',muestra:'Muestra',otros:'Otros',garantia:'Garantia',compras:'Compras'};
$V.egrDocClass={produccion:'Producción',cambio:'Cambio',muestra:'Muestra',otros:'Otros',garantia:'Garantia'};
$V.whtDocClass={produccion:'Producción',cambio:'Cambio',muestra:'Muestra',otros:'Otros',garantia:'Garantia'};
$V.ivt_docClassMov=[{k:'cambio',v:'Cambio'},{k:'otro',v:'Otros'}];
$V.ivt_lineType=[{k:'I',v:'Entrada'},{k:'O',v:'Salida'}];

$M.sAdd([
{fatherId:'ivt',MLis:['ivt.stock.p','ivt.stock.mp','ivt.stock.pHistory']},
{fatherId:'ivt',L:[{folId:'ivtDocs',folName:'Operaciones de Stock'}]},
{fatherId:'ivtDocs',MLis:['ivt.wht','ivt.ing','ivt.egr','ivt.cat','ivt.mov','ivt.cph','ivt.inc','ivt.awh']},
{fatherId:'mastersItm',MLis:['sysd.itmWhs','sysd.mcnf.ivt']},

{fatherId:'itfDT',L:[{folId:'itfDTIvt',folName:'Inventario'}]},
{fatherId:'itfDTIvt',MLis:['itfDT.ivtAwh','itfDT.ivtItm',]}
]);
$M.liA['ivt']={t:'Inventario',
L:[{k:'ivt.stock.p',t:'Estado de Stock (Modelos)'}, {k:'ivt.stock.mp',t:'Estado de Stock (Materia Prima)'},{k:'ivt.stock.history',t:'Histórico Movimientos (Modelos)'},
	{t:'Operaciones de Stock', L:[{k:'ivt.wht.basic',t:'Transferencia de Stock'},{k:'ivt.ing.basic',t:'Ingreso de Artículos'},,{k:'ivt.egr.basic',t:'Salida de Artículos'},{k:'ivt.cat.basic',t:'Toma de Inventario'},{k:'ivt.whsTransfer.ocat',t:'Confirmar Ingreso desde documento de Toma de Inventario'},{k:'ivt.mov',t:'Doc. Movimiento de Inventario'},{k:'ivt.cph.basic',t:'Cambio Entre Productos'},{t:'Recuento de Inventario',k:'ivt.inc.basic'},{t:'Ajuste de Inventario',k:'ivt.awh.basic'}]},
	{t:'Interfaces',L:[
		{k:'itfDT.ivtAwh',t:'Generar Doc. Ajuste Inventario'},
		{k:'itfDT.ivtItm',t:'Actualizar Información de Artículos'}
	]}
]
};

_Fi['Ivt.whs.history']=function(wrap,itemType){
	var jsV = 'jsFiltVars';
	var Pa=$M.read();
	var divL=$1.T.divL({divLine:1,wxn:'wrapx6',L:'Bodega',I:{tag:'select',sel:{'class':jsV,name:'W1.whsId(E_igual)'},opts:$V.whsCode,selected:Pa.whsId}},wrap);
	$1.T.divL({wxn:'wrapx8', subText:'Fecha Creado',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'W1.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'W1.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Reporte'},I:{tag:'select',sel:{'class':jsV,name:'reportLen'},opts:$V.dbReportLen,noBlank:1}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Código /s'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_in)',placeholder:'401,501',value:Pa.itemCode}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Talla/s'},I:{tag:'select',sel:{'class':jsV,name:'W1.itemSzId(E_in)',multiple:'multiple',optNamer:'IN',style:'height:5rem;'},opts:$V.grs1,selected:Pa.itemSzId}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Descripción'},I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',O:{vPost___:'I.itemType(E_igual)='+itemType}}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Whs.history});
	wrap.appendChild(btnSend);
};_Fi['Ivt.whs']=function(wrap,itemType){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Agrupado Por'},I:{tag:'select',sel:{'class':jsV,name:'viewType'},opts:{general:'Artículo-Talla',itemCode:'Solo Artículo',whs:'Bodega'},noBlank:1}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV+' __whsId',name:'whs1.whsId(E_in)'},opts:$V.whsCode}},divL);
	var vt2={'all':'Todos',negative:'Solo Negativos',positive:'Solo Positivos'};
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Visualizar'},I:{tag:'select',sel:{'class':jsV,name:'viewType2'},opts:vt2,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Reporte'},I:{tag:'select',sel:{'class':jsV,name:'reportLen'},opts:$V.dbReportLen,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Tenga Solicitado',I:{tag:'select',sel:{'class':jsV,name:'whs1.isCommited(E_mayIgual)'},opts:[{k:'',v:'Ignorar'},{k:'1',v:'Si'}],noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Código de Barras'},I:{tag:'select',sel:{'class':jsV,name:'grTypeId'},opts:$V.bar2}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:{textNode:'Código /s'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_in)',placeholder:'401,501'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Talla/s'},I:{tag:'select',sel:{'class':jsV,name:'whs1.itemSzId(E_in)',multiple:'multiple',optNamer:'IN',style:'height:5rem;'},opts:$V.grs1}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Descripción'},I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',O:{vPost:'I.itemType(E_in)='+itemType}}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Whs.get});
	wrap.appendChild(btnSend);
};_Fi['ivtCph']=function(wrap){	var jsV = 'jsFiltVars';	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);	$1.T.divL({wxn:'wrapx8',subText:'Fecha Doc',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);	$1.T.divL({wxn:'wrapx10', L:{textNode:'Estado'},I:{tag:'select',sel:{'class':jsV,name:'A.docStatus(E_igual)'},opts:$V.dStatus}},divL);	$1.T.divL({wxn:'wrapx10', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);	var divL=$1.T.divL({divLine:1, wxn:'wrapx8',subText:'Fecha Creación',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.dateC(E_mayIgual)(T_time)'}},wrap);	$1.T.divL({wxn:'wrapx8',L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.dateC(E_menIgual)(T_time)'}},divL);	$1.T.divL({wxn:'wrapx8', L:'Reporte',I:{tag:'select',sel:{'class':jsV,name:'__dbReportLen'},opts:$V.dbReportLen,noBlank:1}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:{dateCDesc:'Fecha Creado DESC',dateCAsc:'Fecha Creado ASC',docDateDesc:'Fecha Doc. DESC',docTotalDesc:'Número Desc.',docTotalAsc:'Número Asc.',docDateAsc:'Fecha Doc. ASC'},noBlank:1}},divL);	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Cph.get});	wrap.appendChild(btnSend);};_Fi['ivtIng']=function(wrap){	var jsV = 'jsFiltVars';	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);	$1.T.divL({wxn:'wrapx8',subText:'Fecha Doc',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:'Clase',I:{tag:'select',sel:{'class':jsV,name:'A.docClass'},opts:$V.ingDocClass}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:$Doc.ordBy,noBlank:1}},divL);	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Ing.get});	wrap.appendChild(btnSend);};_Fi['ivtMov']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);
	$1.T.divL({wxn:'wrapx8',subText:'Fecha Doc',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Estado',I:{tag:'select',sel:{'class':jsV,name:'A.docStatus'},opts:$V.docStatus}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Clase',I:{tag:'select',sel:{'class':jsV,name:'A.docClass'},opts:$V.ivt_docClassMov}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:$Doc.ordBy,noBlank:1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Mov.get});
	wrap.appendChild(btnSend);
};

_Fi['ivtEgr']=function(wrap){	var jsV = 'jsFiltVars';	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);	$1.T.divL({wxn:'wrapx8',subText:'Fecha Doc',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:'Clase',I:{tag:'select',sel:{'class':jsV,name:'A.docClass'},opts:$V.egrDocClass}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:$Doc.ordBy,noBlank:1}},divL);	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Egr.get});	wrap.appendChild(btnSend);};_Fi['ivtCat']=function(wrap){	var jsV = 'jsFiltVars';	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);	$1.T.divL({wxn:'wrapx8',subText:'Fecha Doc',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);	$1.T.divL({wxn:'wrapx10', L:{textNode:'Estado'},I:{tag:'select',sel:{'class':jsV,name:'A.docStatus(E_igual)'},opts:$V.dStatus}},divL);	$1.T.divL({wxn:'wrapx10', L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':jsV,name:'A.whsId(E_igual)'},opts:$V.whsCode}},divL);	$1.T.divL({wxn:'wrapx8', L:'Clase',I:{tag:'select',sel:{'class':jsV,name:'A.docClass'},opts:$V.ingDocClass}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:$Doc.ordBy,noBlank:1}},divL);	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Cat.get});	wrap.appendChild(btnSend);};_Fi['ivtWht']=function(wrap){	var jsV = 'jsFiltVars';	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);	$1.T.divL({wxn:'wrapx8',subText:'Fecha Doc',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);	$1.T.divL({wxn:'wrapx8', L:'Clase',I:{tag:'select',sel:{'class':jsV,name:'A.docClass'},opts:$V.whtDocClass}},divL);	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:$Doc.ordBy,noBlank:1}},divL);	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Ivt.Wht.get});	wrap.appendChild(btnSend);};
$M.li['ivt.cat'] ={t:'Toma de Inventario', kau:'ivt.cat.basic', func:function(){
	var btn = $1.T.btnFa({fa:'fa_doc',textNode:' Nuevo Documento de Inventario', func:function(){  $M.to('ivt.cat.form'); }});
	$M.Ht.ini({fieldset:true, func_filt:'ivtCat', btnNew:btn,
	func_pageAndCont:Ivt.Cat.get });
	}};$M.li['ivt.cat.view'] ={t:'-', kau:'ivt.cat.basic',func:function(){
	$M.Ht.ini({func_cont:Ivt.Cat.view});
}};$M.li['ivt.cat.form'] = {t:'Documento de Toma de Inventario', kau:'ivt.cat.basic',func:function(){ $M.Ht.ini({func_cont:Ivt.Cat.form});
}};$M.li['ivt.cat.digit']= {t:'Captura por Código de Barras', kau:'ivt.cat.basic', func:function(){ $M.Ht.ini({ func_cont:Ivt.Cat.digit }); }};
$M.li['ivt.cat.lines'] = {t:'Modificar Lineas Documento', kau:'ivt.cat.basic', func:function(){ $M.Ht.ini({func_cont:Ivt.Cat.lines});
}};
$M.li['ivt.ing'] ={t:'Ingreso de Producto', kau:'ivt.ing.basic',func:function(){
	var btn = $1.T.btnFa({fa:'fa_doc',textNode:' Nuevo Documento de Ingreso', func:function(){ $M.to('ivt.ing.form'); }});
	$M.Ht.ini({fieldset:true, func_filt:'ivtIng', btnNew:btn,
	func_pageAndCont:Ivt.Ing.get });
}};
$M.li['ivt.ing.form'] = {t:'Documento de Ingreso',kau:'ivt.ing.basic', func:function(){ $M.Ht.ini({func_cont:Ivt.Ing.form});
}};
$M.li['ivt.ing.digit'] = {t:'Captura por Código de Barras', kau:'ivt.ing.basic', func:function(){ $M.Ht.ini({ func_cont:Ivt.Ing.digit });
}};
$M.li['ivt.ing.view'] ={t:'-', kau:'ivt.ing.basic',func:function(){
	$M.Ht.ini({func_cont:Ivt.Ing.view});
}};$M.li['ivt.egr'] ={t:'Salida de Producto', kau:'ivt.egr.basic', func:function(){
	var btn = $1.T.btnFa({fa:'fa_doc',textNode:' Nuevo Documento de Salida', func:function(){  $M.to('ivt.egr.form'); }});
	$M.Ht.ini({fieldset:true,func_filt:'ivtEgr', btnNew:btn,
	func_pageAndCont:Ivt.Egr.get });
}};$M.li['ivt.egr.form'] = {t:'Documento de Salida', kau:'ivt.egr.basic',func:function(){ $M.Ht.ini({func_cont:Ivt.Egr.form});
}};$M.li['ivt.egr.digit'] = {t:'Captura por Código de Barras', kau:'ivt.egr.basic', func:function(){ $M.Ht.ini({ func_cont:Ivt.Egr.digit });
}};
$M.li['ivt.egr.view'] ={t:'-', kau:'ivt.egr.basic', func:function(){
	$M.Ht.ini({func_cont:Ivt.Egr.view});
}};$M.li['ivt.wht'] = {t:'Transferencia de Stock', kau:'ivt.wht.basic', func:function(){
	var btn = $1.T.btnFa({fa:'fa_doc',textNode:' Nuevo Documento', func:function(){  $M.to('ivt.wht.form'); }});
	$M.Ht.ini({fieldset:true, func_filt:'ivtWht', btnNew:btn,
	func_pageAndCont:Ivt.Wht.get });
}};$M.li['ivt.wht.view'] ={noTitle:'Y', kau:'ivt.wht.basic',func:function(){
	$M.Ht.ini({func_cont:Ivt.Wht.view});
}};$M.li['ivt.wht.form'] = {t:'Transferencia de Stock', kau:'ivt.wht.basic',func:function(){ $M.Ht.ini({func_cont:Ivt.Wht.form});
}};$M.li['ivt.inc'] = {t:'Recuento de Inventario.',kau:'ivt.inc.basic', func:function(){	btnA=$1.T.btnFa({faBtn:'fa_doc',textNode:'Nuevo Documento',func:function(){ $M.to('ivt.inc.form'); }});	$M.Ht.ini({btnNew:btnA,func_cont:Ivt.Inc.get});}};$M.li['ivt.inc.form'] = {t:'Recuento de Inventario',kau:'ivt.ing.basic', func:function(){ $M.Ht.ini({func_cont:Ivt.Inc.form});
	}};$M.li['ivt.inc.view'] ={t:'-', kau:'ivt.inc.basic', func:function(){
	$M.Ht.ini({func_cont:Ivt.Inc.view});
}};$M.li['ivt.awh'] = {t:'Ajuste de Inventario',kau:'ivt.awh.basic', func:function(){	btnA=$1.T.btnFa({faBtn:'fa_doc',textNode:'Nuevo Documento',func:function(){ $M.to('ivt.awh.form'); }});	$M.Ht.ini({btnNew:btnA,func_cont:Ivt.Awh.get});}};$M.li['ivt.awh.form'] = {t:'Ajuste de Inventario',kau:'ivt.awh.basic', func:function(){ $M.Ht.ini({func_cont:Ivt.Awh.form}); }};
$M.li['ivt.mov'] = {t:'Movimientos Inventarios', kau:'ivt.mov', func:function(){
	var btn = $1.T.btnFa({faBtn:'fa_doc',textNode:' Nuevo Documento', func:function(){  $M.to('ivt.mov.form'); }});
	$M.Ht.ini({fieldset:true, fieldDisplay:'Y', func_filt:'ivtMov', btnNew:btn,func_pageAndCont:Ivt.Mov.get });
}};
$M.li['ivt.mov.form'] = {t:'Movimiento Inventario',kau:'ivt.mov',func:function(){ $M.Ht.ini({func_cont:Ivt.Mov.form}); }};
$M.li['ivt.mov.view'] ={t:'-', kau:'ivt.mov',func:function(){
	$M.Ht.ini({func_cont:Ivt.Mov.view});
}};$M.li['ivtAwh.view'] ={t:'-', kau:'ivt.awh.basic', func:function(){	$M.Ht.ini({func_cont:Ivt.Awh.view});}};$M.li['ivt.stock.p'] ={t:'Estado de Stock (Modelos)',kau:'ivt.stock.p',func:function(){
	$M.Ht.ini({func_filt:function(wf){ _Fi['Ivt.whs'](wf,'P'); }, func_pager:Ivt.Whs.get});
}};$M.li['ivt.stock.mp'] ={t:'Estado de Stock (Materia Prima)',kau:'ivt.stock.mp', func:function(){	$M.Ht.ini({func_filt:function(wf){ _Fi['Ivt.whs'](wf,'MP,SE'); }, func_pager:Ivt.Whs.get});}};$M.li['ivt.stock.pHistory'] ={t:'Histórico de Movimientos (Modelos)', kau:'ivt.stock.history', func:function(){
	$M.Ht.ini({func_filt:function(wf){ _Fi['Ivt.whs.history'](wf,'P'); }, func_pager:Ivt.Whs.history, func_cont:function(){
		var Pa=JSON.stringify($M.read());
		if(Pa!='{}'){ Ivt.Whs.history(); }
	}});
}};$M.li['ivt.stock.mpHistory'] ={t:'Histórico de Movimientos (Materia Prima)', kau:'ivt.stock.history', func:function(){
	$M.Ht.ini({func_filt:function(wf){ _Fi['Ivt.whs.history'](wf,'MP'); }, func_pageAndCont:Ivt.Whs.history});
}};$M.li['ivt.cph'] = {t:'Cambios Internos', kau:'ivt.cph.basic', func:function(){
	var btn = $1.T.btnFa({faBtn:'fa_doc',textNode:' Nuevo Documento', func:function(){  $M.to('ivt.cph.form'); }});
	$M.Ht.ini({fieldset:true, fieldDisplay:'Y', func_filt:'ivtCph', btnNew:btn,func_pageAndCont:Ivt.Cph.get });
}};$M.li['ivt.cph.form']={t:'Cambio por Producto Similar', kau:'ivt.cph.basic', func:function(){
	$M.Ht.ini({func_filt:null, func_cont:Ivt.Cph.form});
}, descrip:'El artículo original aumentará su cantidad en el inventario, el de cambio disminuirá.'};$M.li['ivt.cph.view'] ={t:'-', kau:'ivt.cph.basic', func:function(){	$M.Ht.ini({func_cont:Ivt.Cph.view});}};
$M.li['sysd.mcnf.ivt'] ={t:'Definición Módulo Inventario', kau:'sysd.supersu', func:function(){
	$M.Ht.ini({func_cont:function(){
		$Sysd.Mcnf.get({mdl:'ivt',
		Li:[
		{k:'ivtCanNeg',v:'Permitir Negativos',tag:'select',opts:{N:'No',Y:'Si',item:'Por Artículo'}}
		]
		});
	}
	});
}};
var Ivt= {	whsPut:function(P){//cargar a bodega	var nod=$1.t('div',0); var divLine=true; var cont=nod;	if(P.fie_docDate){		var divL=$1.T.divL({divLine:divLine,wxn:'wrapx2',L:{textNode:'Fecha Recibido'},I:{tag:'input',type:'date','class':'jsFields',name:'docDate',value:P.fie_docDate}},cont);		divLine=false; cont=divL;	}	if(P.fie_whsId){		$1.T.divL({divLine:divLine,wxn:'wrapx2',subText:'Defina a que Bodega ingresa la devolución.',L:{textNode:'Bodega'},I:{tag:'select',sel:{'class':'jsFields',name:'whsId'},opts:$V.whsCode}},cont);	}	$1.Win.confirm({text:'El documento será cerrado, se cargarán las cantidades en la Bodega '+_g(P.whsId,$V.whsCode)+', y no se podrá modificar la información.',Inode:nod, noClose:1, func:function(resp,wrapC,btn){
		$ps_DB.get({f:'PUT '+Api.Ivt.a+'whsTransfer.'+P.serieType,btnDisabled:btn,inputs:'docEntry='+P.docEntry+'&'+$1.G.inputs(nod), loade:resp, func:function(Jr){
			$ps_DB.response(resp,Jr);
		}});
	}});}
}
Ivt.btnTransfer = function(P,btn){
	P.serieType=(P.docType)?P.docType:P.serieType;
	function send(){
		$1.Win.confirm({text:'Se realizán los movimientos en la bodega '+_g(P.whsId,$V.whsCode)+'. No se podrá reversar la acción', noClose:true,func:function(resp){
			$ps_DB.get({f:'POST '+Api.Ivt.a+'whsTransfer.'+P.serieType, inputs:'docEntry='+P.docEntry,func:function(Jr2){
				$ps_DB.response(resp,Jr2);
			}});
		}});
	}
	if(btn=='func'){ return send; }
	if(!btn){ var btn=$1.T.btnNew({fa:'fa_move',textNode:'Generar movimiento en Bodega'}); }
	btn.onclick= send;
	return btn;
}
Ivt.Cat = {
OLi:[],
OLg:function(L){
	var Li=[]; var n=0;
	if(L.docStatus=='O'){
		Li[n]={ico:'iBg iBg_barcode',textNode:' Capturar', P:L, func:function(T){ $M.to('ivt.cat.digit','docEntry:'+T.P.docEntry); } }; n++;
		Li[n]={ico:'fa fa-pencil',textNode:' Modificar Capturas', P:L, func:function(T){ $M.to('ivt.cat.lines','docEntry:'+T.P.docEntry); } }; n++;
	}
	Li[n]={ico:'fa fa_eye',textNode:' Ver Packing', P:L, func:function(T){ $M.to('ivt.cat.view','viewType:packing,docEntry:'+T.P.docEntry); } }; n++;
	if(L.docStatus=='O'){
		var node=$1.T.divL({divLine:1,wxn:'wrapx3',L:'Fecha Ingreso',I:{tag:'input',type:'date','class':'jsFields',name:'docDate',value:$2d.today}});
		Li[n]={ico:'fa fa_history',textNode:' Ingresar a Bodega', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Ivt.aa+'cat/statusClose',node:node,winTitle:'Cierre de Documento',text:'El documento será cerrado, se cargarán las cantidades en la Bodega '+_g(T.P.whsId,$V.whsCode)+', y no se podrá modificar la información.',reqMemo:'N'}); } }; n++;
		Li[n]={ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Ivt.aa+'cat/statusCancel',text:'Se va anular el documento. No se puede revertir esta acción.'}); } }; n++;
	}
	return $Opts.add('ivtCat',Li,L);;
},
opts:function(P,pare){
	Li={Li:Ivt.Cat.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
form:function(P){ P=(P)?P:{};
	var cont=$M.Ht.cont;
	var jsF='jsFields';
	$Doc.formSerie({cont:cont, serieType:'ocat',jsF:jsF,
	POST:Api.Ivt.aa+'cat', func:function(Jr2){
		$M.to('ivt.cat.view','docEntry:'+Jr2.docEntry);
	},
	Li:[
	{fType:'date',name:'docDate'},
	{fType:'crd',wxn:'wrapx3',L:'Socio de Negocio'},
	{fType:'user'},
	{divLine:1,wxn:'wrapx8',L:'Clasificación',I:{tag:'select',sel:{'class':jsF,name:'docClass'},opts:$V.ingDocClass}},
	{wxn:'wrapx8',L:'Bodega',I:{tag:'select',sel:{'class':jsF,name:'whsId'},opts:$V.whsCode}},
	{divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'textarea','class':jsF,name:'lineMemo'}}
	]
	});
},get:function(cont){
	cont =$M.Ht.cont;
	$Api.get({f:Api.Ivt.aa+'cat', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb = $1.T.table(['','No.','Estado',{textNode:'Ing.',title:'¿Se generó Ingreso a la Bodega?'},'Clasificación','Bodega','Fecha','Detalles','Creado']); cont.appendChild(tb);
			var tBody = $1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr = $1.t('tr',0,tBody);
				var tdB = $1.t('td',0,tr);
				Ivt.Cat.opts({L:L},tdB);
				var td = $1.t('td',0,tr);
				$1.t('a',{textNode:L.docEntry,'class':'fa fa_eye',href:$M.to('ivt.cat.view','docEntry:'+L.docEntry,'r')},td);
				$1.t('td',{textNode:$V._g('dStatus',L.docStatus)},tr);
				var td=$1.t('td',0,tr);
				$1.t('td',{textNode:$V._g('ingDocClass',L.docClass)},tr);
				var tdwhs=$1.t('td',{textNode:$V._g('whsCode',L.whsId)},tr);
				if(L.invMov=='Y'){ $1.t('span',{textNode:'Si','class':'fa fa_history'},td);
					tdwhs.style.color='blue'; tdwhs.style.fontWeight='bold';
				}
				else{ $1.t('span',{textNode:'No'},td); }				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);			};		}	}});},digit:function(){	var contTop = $M.Ht.cont;	var cont = $1.t('div');	Che.L=[]; Che.T={}; Che.t=[];//temporal	Che.n = -1; $M.U.i();	var Pa=$M.read();	var fie=$1.T.fieldset(cont,{L:{textNode:'Documento No. '+Pa.docEntry}});	contTop.appendChild(fie);	cont.appendChild(Barc.input({func:function(Jr,boxNum){		Barc.Draw.tbDetail(Jr,boxNum);	}}));	$1.t('div',{id:'_tableWrap'},cont);	var resp = $1.t('div',0,cont);	var btn=$1.T.btnSend({textNode:'Guardar'},{f:'POST '+Api.Ivt.b+'.ocat', getInputs:function(){		var d = Barc.getData(cont);		return 'docEntry='+Pa.docEntry+'&D='+JSON.stringify(d);	}, func:function(Jr2){		if(!Jr2.errNo){ $M.U.e(); $M.to('ivt.cat.view','docEntry:'+Pa.docEntry); }		$ps_DB.response(resp,Jr2);	}}); cont.appendChild(btn);},view:function(){
	var Pa=$M.read(); cont=$M.Ht.cont;
	if(Pa.viewType=='packing'){ return Ivt.Cat.viewPacking(); }
	$Api.get({f:Api.Ivt.aa+'cat/view',inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){		Jr.T={}; var Lo=Jr.L; Jr.L=[]; var kEx={}; var nu=1;		var wList=$1.t('div');		if(Lo.errNo){ $Api.resp(wList,Lo); }		else{		for(var nk in Lo){ var L=Lo[nk];			var ta=L.itemSzId;			var kr='_'+L.itemId*1;			if(!kEx[kr]){ kEx[kr]=nu; nu++; }			var k=kEx[kr]-1;			if(!Jr.L[k]){ Jr.L[k]=L; Jr.L[k].T={}; }			if(!Jr.L[k].T[ta]){ Jr.L[k].T[ta]={quantity:0,breads:0}; }			Jr.L[k].T[ta].quantity=L.quantity;			Jr.L[k].T[ta].breads=L.breads;			Jr.T[ta]=_g(ta,$V.grs1);		}
		}		var printt= $1.T.btnFa({fa:'fa_print',textNode:' Imprimir',func:function(){ $1.Win.print(cont); }}); cont.parentNode.insertBefore(printt,cont);
		var top=$1.t('div',{'class':'ffLineNoBd'});
		var fie=$1.T.fieldset(top,{L:{textNode:'Documento de Inventario'}});
		cont.appendChild(fie);
		var ffL=$1.T.ffLine({ffLine:1, w:'ffx4', t:'No.', v:Pa.docEntry},top);
		$1.T.ffLine({w:'ffx4', t:'Fecha', v:Jr.docDate},ffL);
		$1.T.ffLine({w:'ffx4', t:'Bodega', v:_g(Jr.whsId,$V.whsCode)},ffL);
		$1.t('div',{'class':'textarea',textNode:Jr.lineMemo},top);		cont.appendChild(wList);
		var tb= $1.T.table(['#','Código','Descripción']); wList.appendChild(tb);
		var trH=$1.q('thead tr',tb);
		var ToT={total:0};
		Jr.L=$js.sortNum(Jr.L,{k:'itemCode'});
		for(var ta in Jr.T){ $1.t('td',{textNode:Jr.T[ta]},trH); }
		$1.t('td',{textNode:'Total'},trH);
		var tBody=$1.t('tbody',0,tb);
		var n=1;
		
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:n},tr); n++;
			$1.t('td',{textNode:L.itemCode},tr);
			$1.t('td',{textNode:L.itemName},tr);
			var total=0;
			for(var ta in Jr.T){
				var Lta=L.T[ta];
				if(!Lta){ td=$1.t('td',0,tr); }
				else{
					tta=Lta.quantity*1; total +=tta;
					if(!ToT[ta]){ ToT[ta] = 0; }
					ToT[ta] +=tta; ToT.total += tta;
					sty=titl='';
					if(tta!=Lta.breads){
						sty='backgroundColor:#FF0; cursor:pointer;'; titl='La cantidad ('+tta+') no coincide con las lecturas ('+Lta.breads+')'; }
					var td=$1.t('td',{textNode:tta,style:sty,title:titl,},tr);
					if(sty!=''){ td.onclick=function(){ $1.Win.message({text:this.title}); } }
				}
			}
			$1.t('td',{textNode:total},tr);
		}
		var tr=$1.t('tr',0,tBody);
		$1.t('td',{textNode:'Totales',colspan:3},tr);
		for(var ta in Jr.T){
			var tta=(ToT[ta])?ToT[ta]:'';
			$1.t('td',{textNode:tta},tr);
		}
		$1.t('td',{textNode:ToT.total},tr);
	}});
},viewPacking:function(){
	var Pa=$M.read(); cont=$M.Ht.cont;
	$Api.get({f:Api.Ivt.aa+'cat/viewPacking', errWrap:cont, inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){		Jr.T={}; var Lo=Jr.L; Jr.L=[]; var kEx={}; var nu=0;		for(var nk in Lo){ var L=Lo[nk];			var ta=L.itemSzId;			var kr=L.itemId+'_'+L.detail;			if(!kEx[kr]){ kEx[kr]=nu; nu++; }			var k=kEx[kr];			if(!Jr.L[k]){ Jr.L[k]=L; }			if(!Jr.L[k].T){ Jr.L[k].T={}; }			if(!Jr.L[k].T[ta]){ Jr.L[k].T[ta]={quantity:0,breads:0}; }			Jr.L[k].T[ta].quantity=L.quantity;			Jr.L[k].T[ta].breads=L.breads;			Jr.T[ta]=_g(ta,$V.grs1);		}		Jr.L=$js.sortNum(Jr.L,{k:'detail'});
		var printt= $1.T.btnFa({fa:'fa_print',textNode:' Imprimir',func:function(){ $1.Win.print(cont); }}); cont.parentNode.insertBefore(printt,cont);
		var top=$1.t('div',{'class':'ffLineNoBd'});
		var fie=$1.T.fieldset(top,{L:{textNode:'Documento de Inventario / Lista Empaque'}});
		cont.appendChild(fie);
		var ffL=$1.T.ffLine({ffLine:1, w:'ffx4', t:'No.', v:Pa.docEntry},top);
		$1.T.ffLine({w:'ffx4', t:'Fecha', v:Jr.docDate},ffL);
		$1.T.ffLine({w:'ffx4', t:'Bodega', v:_g(Jr.whsId,$V.whsCode)},ffL);
		$1.t('div',{'class':'textarea',textNode:Jr.lineMemo},top);
		var tb= $1.T.table(['#','Código','Descripción']); cont.appendChild(tb);
		var trH=$1.q('thead tr',tb);
		for(var ta in Jr.T){ $1.t('td',{textNode:ta},trH); }
		$1.t('td',{textNode:'Total'},trH);
		var tBody=$1.t('tbody',0,tb);
		var n=1;
		var ToT={total:0};
		Jr.L=$js.sortNum(Jr.L,{k:'detail'});
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.detail},tr); n++;			$1.t('td',{textNode:L.itemCode},tr);			$1.t('td',{textNode:L.itemName},tr);			var total=0;			for(var ta in Jr.T){				var Lta=L.T[ta];				if(!Lta){ td=$1.t('td',0,tr); }				else{					tta=Lta.quantity*1; total +=tta;					if(!ToT[ta]){ ToT[ta] = 0; }					ToT[ta] +=tta; ToT.total += tta;					sty=titl='';					if(tta!=Lta.breads){					sty='backgroundColor:#FF0; cursor:pointer;'; titl='La cantidad ('+tta+') no coincide con las lecturas ('+Lta.breads+')'; }					var td=$1.t('td',{textNode:tta,style:sty,title:titl,},tr);					if(sty!=''){ td.onclick=function(){ $1.Win.message({text:this.title}); } }				}			}			$1.t('td',{textNode:total},tr);		}		var tr=$1.t('tr',0,tBody);		$1.t('td',{textNode:'Totales',colspan:3},tr);		for(var ta in Jr.T){			var tta=(ToT[ta])?ToT[ta]:'';			$1.t('td',{textNode:tta},tr);		}		$1.t('td',{textNode:ToT.total},tr);	}});}}
Ivt.Cat.lines=function(){
	cont=$M.Ht.cont; var jsF='jsFields'; Pa=$M.read();
	var vPost='docEntry='+Pa.docEntry;
	$Api.get({f:Api.Ivt.aa+'cat/lines',inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var ffL=$1.T.ffLine({ffLine:1, w:'ffx4', t:'Número',v:Jr.docEntry},cont);
			$1.T.ffLine({w:'ffx2', t:'Socio:',v:Jr.cardName},ffL);
			$1.T.ffLine({w:'ffx4', t:'Bodega',v:_g(Jr.whsId,$V.whsPeP)},ffL);
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
				var td=$1.t('td',{textNode:Itm.Txt.name(L)},tr);
				var td=$1.t('td',0,tr);
				$1.t('input',{type:'number',min:0,inputmode:'numeric','class':'jsFields',name:ln+'[quantity]',value:L.quantity*1},td);
				var td=$1.t('td',0,tr);
				$1.T.ckLabel({t:'Eliminar',I:{'class':'jsFields',name:ln+'[delete]'}},td);
			}
			var resp=$1.t('div',0,cont);
			$Api.send({textNode:'Actualizar Lineas',PUT:Api.Ivt.aa+'cat/lines',getInputs:function(){ return vPost+'&'+$1.G.inputs(tb); }, loade:resp, func:function(Jr2){
				$Api.resp(resp,Jr2);
			}},cont);
		}
	}});
}
Ivt.opts=function(P,e){ e=(e)?e:'';
	var L=P.L; var Jr=P.Jr;
	var Li=[]; var n=0;
	var basic=true;
	var winTi=(P.serieType=='oing')?'Documento de Ingreso':'Documento Inventario';
	winTi=(P.serieType=='oegr')?'Documento de Salida':winTi;
	if(basic){
		Li[n]={ico:'fa fa_comment',textNode:'Comentarios',L:L,func:function(T){ $5c.form({tt:P.serieType,tr:L.docEntry, getList:'Y',winTitle:winTi+': '+L.docEntry}); } }; n++;
		Li[n]={ico:'fa fa_attach',textNode:'Archivos',L:L,func:function(T){ $5fi.btnOnTb({tt:P.serieType,tr:L.docEntry, getList:'Y',winTitle:winTi+': '+L.docEntry}); } }; n++;
	}
	return Li={Li:Li,textNode:P.textNode};
},
Ivt.fromWhs=function(D,P){
	var vPost='itemId='+D.itemId+'&itemSzId='+D.itemSzId+'&whsId='+D.whsId;
	$ps_DB.get({f:'GET '+Api.Ivt.a+'fromWhs',inputs:vPost, loaderFull:1, func:function(Jr){
		if(Jr.errNo){ $1.Win.message(Jr); }
		else{ P.func(Jr); }
	}
	});
}
Ivt.Inc={
opts:function(P){
	var L=P.L; var Jr=P.Jr;
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa_pencil',textNode:' Modificar Documento', P:L, func:function(T){ $M.to('ivt.inc.form','docEntry:'+T.P.docEntry); } }; n++;
	Li[n]={ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({serieType:'oinc',docEntry:T.P.docEntry,api:Api.Ivt.a+'oinc.statusCancel',text:'Se va anular el documento, no se puede reversar está acción.'}); } }; n++;
	Li[n]={ico:'iBg iBg_candado',textNode:'Cerrar Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Ivt.a+'oinc.statusHandClose',text:'Se va a cerrar el Documento, no se puede reversar está acción.'}); } }; n++;
	return Li={Li:Li,textNode:P.textNode};
},get:function(cont){
	cont =$M.Ht.cont;
	$ps_DB.get({f:'GET '+Api.Ivt.a+'oinc', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $ps_DB.response(cont,Jr); }
		else{
			var tb = $1.T.table(['','No.','Estado','Fecha','Detalles','Realizado']); cont.appendChild(tb);
			var tBody = $1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr = $1.t('tr',0,tBody);
				var td = $1.t('td',0,tr);
				var menu=$1.Menu.winLiRel(Ivt.Inc.opts({L:L})); td.appendChild(menu);
				var td = $1.t('td',0,tr);
				$1.t('a',{textNode:L.docEntry,'class':'fa fa_eye',href:$Doc.href('oinc',L,'r')},td);
				$1.t('td',{textNode:_g(L.docStatus,$V.dStatus)},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
				$1.t('td',{textNode:'Por '+L.userName+', '+$2d.f(L.dateC,'mmm d H:iam')},tr);
			};
		}
	}});
},form:function(P){ P=(P)?P:{};	var cont=$M.Ht.cont; var jsF='jsFields'; var n=1;	var Pa=$M.read();	$ps_DB.get({f:'GET '+Api.Ivt.a+'oinc.form', loadVerif:!Pa.docEntry, inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){	var tb=$1.T.table([{textNode:'Código'},{textNode:'Descripción'},'Almacen',{textNode:'Sistema',style:'width:6rem;'},{textNode:'Físico'},'Desviación','']);	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});	cont.appendChild(fie);	var tBody= $1.t('tbody',0,tb);	$Doc.L.itmWinSz(tBody,{priceDefiner:'N',cont:fie,fields:'I.grsId&wh[I.handInv]=Y',func:function(T,L){		trA(tBody,T,L);	}}); 	$Doc.formSerie({cont:cont, middleCont:fie, serieType:'oinc',docEntry:Pa.docEntry,jsF:jsF,Jr:{}, api:'PUT '+Api.Ivt.a+'oinc.form', func:function(Jr2){			$Doc.href('oinc',Jr2,'to');	},	Li:[	{wxn:'wrapx8',fType:'date',name:'docDate',value:Jr.docDate,req:'Y'},	{divLine:1,wxn:'wrapx2',L:'Detalles',I:{tag:'textarea',name:'lineMemo',textNode:Jr.lineMemo,'class':jsF}}	]});	var n=1;	function trA(tBody,T,D){		for(var i in T){		var ln='L['+n+']'; n++;		var tr=$1.t('tr',0,tBody);		$1.t('td',{textNode:D.itemCode},tr);		$1.t('td',{textNode:D.itemName},tr);		var td=$1.t('td',0,tr);		var sel=$1.T.sel({sel:{'class':jsF,name:ln+'[whsId]'},opts:$V.whsCode,selected:D.whsId});		sel.D={itemId:D.itemId,itemSzId:i};		sel.onchange=function(){			var pare=this.parentNode.parentNode;			var Tw={itemId:this.D.itemId,itemSzId:this.D.itemSzId,whsId:this.value};			Ivt.fromWhs(Tw,{func:function(D2){				var osys=$1.q('.__inWhsQty',pare);				osys.value=D2.onHand*1;				updDiff(pare);			}})		}		td.appendChild(sel);		var td=$1.t('td',0,tr);		$1.t('input',{type:'number',inputmode:'numeric',min:0,'class':jsF+' __inWhsQty',name:ln+'[inWhsQty]',disabled:'disabled',readonly:'readonly',style:'width:7rem;',value:D.inWhsQty},td);		var td=$1.t('td',0,tr);		$1.t('input',{type:'number',inputmode:'numeric',min:0,'class':jsF+' __qtyCount',name:ln+'[qtyCount]',value:T[i],O:{vPost:ln+'[itemId]='+D.itemId+'&'+ln+'[itemSzId]='+i},style:'width:6rem;',D:D,onkeychange:function(T){			updDiff(T.parentNode.parentNode);		}},td);		var td=$1.t('td',{'class':'__diff',textNode:((D.diff)?D.diff*1:'')},tr);		var td=$1.t('td',0,tr);		var btnFa=$1.T.btnFa({fa:'fa fa_close',textNode:' Eliminar',func:function(T){ $1.delet(T.parentNode.parentNode); }},td);		}	}	function updDiff(pare){		var osys=$1.q('.__inWhsQty',pare).value*1;		var qty=$1.q('.__qtyCount',pare).value*1;		var diff=$1.q('.__diff',pare);		diff.innerText='';		if(osys!=qty){ diff.innerText= qty-osys; }	}
	if(Jr.L && !Jr.L.errNo){		for(var i in Jr.L){			var T={}; T[Jr.L[i].itemSzId]=Jr.L[i].qtyCount;			trA(tBody,T,Jr.L[i]);		}	}	}});},view:function(){ 	var Pa=$M.read(); var cont=$M.Ht.cont;	$ps_DB.get({f:'GET '+Api.Ivt.a+'oinc.view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){		var td=$1.t('div'); $1.t('pre',{textNode:Jr.lineMemo},td);;		$DocT.B.h({docEntry:Pa.docEntry,dateC:Jr.dateC,serieType:'oinc',print:'Y', styDef:'width:6rem;',styT:'font-weight:bold;',			Ls:[{t:'Estado',v:_g(Jr.docStatus,$V.docStatus)},{middleInfo:'Y'},{logoRight:'Y'},			{t:'Fecha', v:Jr.docDate},{t:'',v:''},			{t:'Detalles',v:Jr.lineMemo,cs:7}			]		},cont);		var tb=$1.T.table(['Código',{textNode:'Descripción'},{textNode:'Bodega',style:'width:5rem;'},{textNode:'Cant. Sistema',style:'width:5rem;'},{textNode:'Cant. Físico',style:'width:5rem;'},{textNode:'Desviación',style:'width:5rem;'}]);		$1.t('p',0,cont);		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del documento'}}); cont.appendChild(fie);		tb.classList.add('table_x100');		var tBody=$1.t('tbody',0,tb);		if(Jr.L.errNo){			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));		}else{		var va='vertical-align:middle';		for(var i in Jr.L){ var L=Jr.L[i];			var tr=$1.t('tr',0,tBody);			$1.t('td',{textNode:Itm.Txt.code(L)},tr);			$1.t('td',{textNode:Itm.Txt.name(L)},tr);			$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr);			$1.t('td',{textNode:L.inWhsQty*1},tr);			$1.t('td',{textNode:L.qtyCount*1},tr);			$1.t('td',{textNode:L.diff*1},tr);		}		}		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);	}});},}Ivt.Awh={opts:function(P){	var L=P.L; var Jr=P.Jr;	var Li=[]; var n=0;	return Li={Li:Li,textNode:P.textNode};},get:function(cont){	cont =$M.Ht.cont;	$Api.get({f:Api.Ivt.aa+'awh', inputs:$1.G.filter(), loade:cont, 	func:function(Jr){		if(Jr.errNo){ $ps_DB.response(cont,Jr); }		else{			var tb = $1.T.table(['','No.','Estado','Fecha','Detalles','Realizado']); cont.appendChild(tb);			var tBody = $1.t('tbody',0,tb);			for(var i in Jr.L){ L=Jr.L[i];				var tr = $1.t('tr',0,tBody);				var td = $1.t('td',0,tr);				//var menu=$1.Menu.winLiRel(Ivt.Awh.opts({L:L})); td.appendChild(menu);				var td = $1.t('td',0,tr);				$1.t('a',{textNode:L.docEntry,'class':'fa fa_eye',href:$Doc.href('ivtAwh',L,'r')},td);				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);				$1.t('td',{textNode:L.lineMemo},tr);				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);			};		}	}});},form:function(P){ P=(P)?P:{};	var cont=$M.Ht.cont; var jsF='jsFields'; var n=1;	var Pa=$M.read();	var Jr={};	var tb=$1.T.table([{textNode:'Código'},{textNode:'Descripción'},'Almacen',{textNode:'Cant. Contada'},'']);	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});	cont.appendChild(fie);	var tBody= $1.t('tbody',0,tb);	$Doc.L.itmWinSz(tBody,{priceDefiner:'N',cont:fie,fields:'I.grsId&wh[I.handInv]=Y',func:function(T,L){		trA(tBody,T,L);	}});	var bodega=$1.T.sel({sel:{'class':'__bodegaDef'},opts:$V.whsCode});	$Doc.formSerie({cont:cont, middleCont:fie, serieType:'ivtAwh',docEntry:Pa.docEntry,jsF:jsF,Jr:{}, POST:Api.Ivt.aa+'awh', func:function(Jr2){			$Doc.href('ivtAwh',Jr2,'to');	},	Li:[	{wxn:'wrapx8',fType:'date',name:'docDate',value:Jr.docDate,req:'Y'},	{divLine:1,wxn:'wrapx2',L:'Detalles',I:{tag:'textarea',name:'lineMemo',textNode:Jr.lineMemo,'class':jsF}},	{divLine:1,wxn:'wrapx8',L:'Bodega',subText:'No se guarda',Inode:bodega},	]});	var n=1;	function trA(tBody,T,D){		for(var i in T){		var ln='L['+n+']'; n++;		var tr=$1.t('tr',0,tBody);		$1.t('td',{textNode:D.itemCode},tr);		$1.t('td',{textNode:D.itemName},tr);		var td=$1.t('td',0,tr);		var sel=$1.T.sel({sel:{'class':jsF,name:ln+'[whsId]'},opts:$V.whsCode,selected:bodega.value},td);		var td=$1.t('td',0,tr);		$1.t('input',{type:'number',inputmode:'numeric',min:0,'class':jsF+' __inWhsQty',name:ln+'[qtyCount]',style:'width:7rem;',value:T[i],O:{vPost:ln+'[itemId]='+D.itemId+'&'+ln+'[itemSzId]='+i}},td);		var td=$1.t('td',0,tr);		var btnFa=$1.T.btnFa({fa:'fa fa_close',textNode:' Eliminar',func:function(T){ $1.delet(T.parentNode.parentNode); }},td);		}	}},view:function(){ 	var Pa=$M.read(); var cont=$M.Ht.cont;	$Api.get({f:Api.Ivt.aa+'awh/view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){		var td=$1.t('div'); $1.t('pre',{textNode:Jr.lineMemo},td);;		$DocT.B.h({docEntry:Pa.docEntry,dateC:Jr.dateC,serieType:'ivtAwh',print:'Y', styDef:'width:6rem;',styT:'font-weight:bold;',			Ls:[{t:' ',v:' '},{middleInfo:'Y'},{logoRight:2},			{t:'Fecha', v:Jr.docDate},{t:' ',v:' '},			{t:'Detalles',v:Jr.lineMemo,cs:7}			]		},cont);		var tb=$1.T.table(['Código',{textNode:'Descripción'},{textNode:'Bodega',style:'width:5rem;'},{textNode:'Cant. Sistema',style:'width:5rem;'},{textNode:'Cant. Físico',style:'width:5rem;'},{textNode:'Desviación',style:'width:5rem;'}]);		$1.t('p',0,cont);		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del documento'}}); cont.appendChild(fie);		tb.classList.add('table_x100');		var tBody=$1.t('tbody',0,tb);		if(Jr.L.errNo){			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));		}else{		var va='vertical-align:middle';		for(var i in Jr.L){ var L=Jr.L[i];			var tr=$1.t('tr',0,tBody);			$1.t('td',{textNode:Itm.Txt.code(L)},tr);			$1.t('td',{textNode:Itm.Txt.name(L)},tr);			$1.t('td',{textNode:$V._g('whsCode',L.whsId)},tr);			$1.t('td',{textNode:L.inWhsQty*1},tr);			$1.t('td',{textNode:L.qtyCount*1},tr);			$1.t('td',{textNode:L.diff*1},tr);		}		}		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);	}});},}Ivt.Cph={transf:function(P){	$1.Win.confirm({text:'Se realizarán entradas para los artículos de origen y salidas para los artículos de cambio. Esta acción no se podrá reversar.',noClose:'Y', func:function(resp2){		$ps_DB.get({f:'PUT '+Api.Ivt.a+'ocph.transfer', inputs:'docEntry='+P.docEntry, loade:resp2, func:function(Jr3){ $ps_DB.response(resp2,Jr3); }});	}});},form:function(P){ P=(P)?P:{};	var cont=$M.Ht.cont;	var jsF='jsFields';	var n=1;	var tb=$1.T.table([{textNode:'#',style:'width:4rem;'},{textNode:'Tipo Doc.',style:'width:6rem;'},{textNode:'N°. Doc.',style:'width:6rem;'},'Artículo Original','Artículo para Cambio',{textNode:'Cantidad',style:'width:6rem;'}],{tbData:{'class':'table_zh table_x100'}});	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});	cont.appendChild(fie);	var tBody=$1.t('tbody',0,tb);	$Doc.formSerie({cont:cont, serieType:'ocph',jsF:jsF, middleCont:fie,	api:'PUT '+Api.Ivt.a+'cph', func:function(Jr2){		$M.to('ivt.cph.view','docEntry:'+Jr2.docEntry);	},	Li:[	{fType:'date',name:'docDate',req:'Y'},	{fType:'user'},	{wxn:'wrapx8',req:'Y',L:'Bodega',I:{tag:'select',sel:{'class':jsF,name:'whsId'},opts:$V.whsCode}},	{divLine:1,wxn:'wrapx1',L:'Observación',I:{tag:'textarea','class':jsF,name:'lineMemo',placeholder:'Detalles para documento.'}},	]});	var btn=$1.T.btnFa({fa:'fa fa_plusCircle', textNode:' Añadir Lineas',func:function(){		trA({},n); n++;	}},fie);	function trA(L,n){		var ln='L['+n+']';		var tr=$1.t('tr',0,tBody);		$1.t('td',{textNode:n},tr);		var td=$1.t('td',0,tr);		var sel=$1.T.sel({sel:{'class':jsF,name:ln+'[tt]',style:'width:6rem;'},opts:{opvt:'Pedido Venta'}});		sel.O={vPost:''};		td.appendChild(sel);		var td=$1.t('td',0,tr);		var trInp=$1.t('input',{type:'number','class':jsF,name:ln+'[tr]',style:'width:6rem;',O:{vPost:''}},td);		var td=$1.t('td',0,tr);		var sea=$Sea.input(td,{api:'itemData',inputs:'viewType=itemSize', fPars:{ln:ln,inpD:trInp}, func:function(Js,inp,fP){		fP.inpD.O.vPost=fP.ln+'[itemIdFrom]='+Js.itemId+'&'+fP.ln+'[itemSzIdFrom]='+Js.itemSzId;		}});		var td=$1.t('td',0,tr);		var sea=$Sea.input(td,{api:'itemData',inputs:'viewType=itemSize', fPars:{ln:ln,sel:sel}, func:function(Js,inp,fP){		fP.sel.O.vPost=fP.ln+'[itemIdTo]='+Js.itemId+'&'+fP.ln+'[itemSzIdTo]='+Js.itemSzId;		}});		var td=$1.t('td',0,tr);		$1.t('input',{type:'number','class':jsF,name:ln+'[quantity]',style:'width:6rem;'},td);	}	var n=1;	trA({},n); n++;},get:function(cont){	cont =$M.Ht.cont;	$ps_DB.get({f:'GET '+Api.Ivt.a+'ocph', inputs:$1.G.filter(), loade:cont, 	func:function(Jr){		if(Jr.errNo){ $ps_DB.response(cont,Jr); }		else{			var tb = $1.T.table(['','No','Estado',{textNode:'Inv.',title:'¿Inventario Modificado?'},'Fecha','Bodega','Detalles','Realizado']); cont.appendChild(tb);			var tBody = $1.t('tbody',0,tb);			for(var i in Jr.L){ L=Jr.L[i];				var tr = $1.t('tr',0,tBody);				var tdB = $1.t('td',0,tr);				tdB.appendChild($1.Menu.winLiRel({Li:[					{ico:'fa fa_history',textNode:' Realizar Movimientos en Inventario', P:L, func:function(T){ 						Ivt.Cph.transf(T.P);					}}				]}));				var td = $1.t('td',0,tr);				$1.t('a',{href:$M.to('ivt.cph.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:L.docEntry},td);				$1.t('td',{textNode:_g(L.docStatus,$V.dStatus)},tr);				$1.t('td',{textNode:_g(L.invMov,$V.YN)},tr);				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);				$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr);				$1.t('td',{textNode:L.lineMemo},tr);				$1.t('td',{textNode:'Por '+L.userName+', '+$2d.f(L.dateC,'mmm d H:iam')},tr);							};		}	}});},view:function(){	var Pa=$M.read(); var contPa=$M.Ht.cont; $1.clear(contPa);	var divTop=$1.t('div',{style:'marginBottom:0.5rem;'},contPa);	var cont=$1.t('div',0,contPa);	var btnPrint=$1.T.btnFa({fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(cont); }});	divTop.appendChild(btnPrint);	$1.t('span',{textNode:' | '},divTop);	var btnT=$1.T.btnFa({fa:'fa_history',textNode:' Generar Movimientos', P:{docEntry:Pa.docEntry}, func:function(T){ Ivt.Cph.transf(T.P); }});	divTop.appendChild(btnT);	$ps_DB.get({f:'GET '+Api.Ivt.a+'ocph.view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){		sHt.ivtCphHead(Jr,cont);		var tb=$1.T.table([{textNode:'#',style:'width:3rem;'},{textNode:'Tipo Doc.',style:'width:4rem;'},{textNode:'N°. Doc.',style:'width:4rem;'},{textNode:'Artículo Original',colspan:2},{textNode:'Artículo de Cambio',colspan:2},{textNode:'Cant.',style:'width:6rem;'}]);		$1.t('p',0,cont);		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Pedido'}}); cont.appendChild(fie);		tb.classList.add('table_x100');		var tBody=$1.t('tbody',0,tb);		var tF=$1.t('tfoot',0,tb);		for(var i in Jr.L){ L=Jr.L[i];			var tr=$1.t('tr',0,tBody);			$1.t('td',{textNode:L.lineNum},tr);			$1.t('td',{textNode:L.tt},tr);			$1.t('td',{textNode:L.tr},tr);			$1.t('td',{textNode:Itm.Txt.code({itemCode:L.itemCodeFrom,itemSzId:L.itemSzIdFrom})},tr);			$1.t('td',{textNode:Itm.Txt.name({itemName:L.itemNameFrom,itemSzId:L.itemSzIdFrom})},tr);			$1.t('td',{textNode:Itm.Txt.code({itemCode:L.itemCodeTo,itemSzId:L.itemSzIdTo})},tr);			$1.t('td',{textNode:Itm.Txt.name({itemName:L.itemNameTo,itemSzId:L.itemSzIdTo})},tr);			$1.t('td',{textNode:L.quantity*1,'class':'__tbColNums','tbColNum':4},tr);		}		var tr=$1.t('tr',0,tF);		$1.t('td',{colspan:7,textNode:'Cantidad Total',style:'text-align:right;'},tr);		$1.t('td',{'class':'__tbColNumTotal4'},tr);		$Tol.tbSum(tb);	}});}}//ok
Ivt.Ing = {form:function(P){ P=(P)?P:{};	var cont=$M.Ht.cont;	var jsF='jsFields';	var n=1;	var tb=$1.T.table([{textNode:'#',style:'width:2.5rem;'},'Descripción',{textNode:'UdM',style:'width:3rem;'},{textNode:'Almacen',style:'width:6rem;'},{textNode:'Cant.',style:'width:6rem;'}]);	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});	cont.appendChild(fie);	var tBody=$1.t('tbody',0,tb);
	$Doc.L.winItem(tBody,{priceDefiner:'N',cont:fie,fields:'I.grsId,I.udm&wh[I.handInv]=Y',func:function(L){ trA(L); }	});
	Itm.Fx.winBcode({vPost:'_fie=I.udm&wh[I.handInv]=Y',func:function(Rt){
		for(var i in Rt){ trA(Rt[i]); }
	}},fie);	$Doc.formSerie({cont:cont, serieType:'oing',jsF:jsF,	middleCont:fie,POST:Api.Ivt.ing, func:function(Jr2){		$M.to('ivt.ing.view','docEntry:'+Jr2.docEntry);	},	Li:[	{fType:'date',name:'docDate',req:'Y'},	{fType:'crd',wxn:'wrapx3',L:'Socio de Negocio',req:'Y'},	{fType:'user'},	{wxn:'wrapx8',L:'Clasificación',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'docClass'},opts:$V.ingDocClass}},	{divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'textarea','class':jsF,name:'lineMemo'}},
	{divLine:1,wxn:'wrapx8',L:'Almacen Por Defecto',I:{tag:'select',sel:{'class':'whsId'},opts:$V.whsCode}}	]	});	var Fie=[{k:'itemCode',funcText:Itm.Txt.code},{k:'itemName',funcText:Itm.Txt.name},{k:'udm'},{k:'whsId',kty:'whsId',kty:'select',opts:$V.whsCode},{k:'quantity',kty:'quantity'}];	function trA(D){		var ln ='L['+n+']';		Fie[4].O={O:{vPost:ln+'[itemId]='+D.itemId+'&'+ln+'[itemSzId]='+D.itemSzId}};
		var whsId=$1.q('.whsId',cont);
		D.whsId=whsId.value;		tBody.appendChild($DocF.line(D,{lineName:ln,F:Fie}));		n++;	}},get:function(cont){
	cont =$M.Ht.cont;	$Api.get({f:Api.Ivt.ing, inputs:$1.G.filter(), loade:cont, 	func:function(Jr){		if(Jr.errNo){ $Api.resp(cont,Jr); }		else{			var tb = $1.T.table(['','No.','Clasificación','Fecha','Detalles','Creado']); cont.appendChild(tb);			var tBody = $1.t('tbody',0,tb);			for(var i in Jr.L){ L=Jr.L[i];				var tr = $1.t('tr',0,tBody);				var tdB = $1.t('td',0,tr);				tdB.appendChild($1.Menu.winLiRel(Ivt.opts({L:L,serieType:'oing'})));				var td = $1.t('td',0,tr);				$1.t('a',{href:$M.to('ivt.ing.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:L.docEntry},td);				$1.t('td',{textNode:_g(L.docClass,$V.ingDocClass)},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);				$1.t('td',{textNode:L.lineMemo},tr);				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
				
			};
		}
	}});},view:function(){ 	var Pa=$M.read(); var cont=$M.Ht.cont;	$Api.get({f:Api.Ivt.ing+'view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }		$DocT.B.h({docEntry:Pa.docEntry,dateC:Jr.dateC,serieType:'oing',print:'Y', styDef:'width:6rem;',styT:'font-weight:bold;',		Ls:[{t:'Estado',v:_g(Jr.docStatus,$V.docStatus)},{middleInfo:'Y'},{logoRight:'Y'},			{t:'Fecha', v:Jr.docDate},{t:'Clasificación',v:_g(Jr.docClass,$V.whtDocClass)},			{t:'Detalles',v:Jr.lineMemo,cs:7}		]		},cont);		var tb=$1.T.table(['#','Código',{textNode:'Descripción'},{textNode:'Bodega',style:'width:5rem;'},{textNode:'Cant.',style:'width:5rem;'}]);		$1.t('p',0,cont);		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del documento'}}); cont.appendChild(fie);		tb.classList.add('table_x100');		var tBody=$1.t('tbody',0,tb);		Jr.L= $js.sortNum(Jr.L,{k:'itemCode'});		if(Jr.L && Jr.L.errNo){			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));		}else{		var va='vertical-align:middle';		var n=1;		for(var i in Jr.L){ var L=Jr.L[i];			var tr=$1.t('tr',0,tBody);			$1.t('td',{textNode:n},tr); n++;			$1.t('td',{textNode:Itm.Txt.code(L)},tr);			$1.t('td',{textNode:Itm.Txt.name(L)},tr);			$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr);			$1.t('td',{textNode:L.quantity*1,'class':tbSum.tbColNums,tbColNum:6},tr);		}		}		var tr=$1.t('tr',0,tBody);		$1.t('td',{colspan:4,style:'text-align:right;',textNode:'Total'},tr);		$1.t('td',{'class':tbSum.tbColNumTotal+'6'},tr);		tbSum.get(tb);		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);	}});}}Ivt.Egr={form:function(P){ P=(P)?P:{};	var cont=$M.Ht.cont;	var jsF='jsFields';	var n=1;	var tb=$1.T.table([{textNode:'#',style:'width:2.5rem;'},'Descripción',{textNode:'UdM',style:'width:3rem;'},{textNode:'Almacen',style:'width:6rem;'},{textNode:'Cant.',style:'width:6rem;'}]);	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});	cont.appendChild(fie);	var tBody=$1.t('tbody',0,tb);	$Doc.L.winItem(tBody,{priceDefiner:'N',cont:fie,fields:'I.grsId,I.udm&wh[I.handInv]=Y',func:function(L){ trA(L); }	});	$Doc.formSerie({cont:cont, serieType:'oegr',jsF:jsF,	middleCont:fie,POST:Api.Ivt.egr, func:function(Jr2){		$M.to('ivt.egr.view','docEntry:'+Jr2.docEntry);	},	Li:[	{fType:'date',name:'docDate',req:'Y'},	{fType:'crd',wxn:'wrapx3',L:'Socio de Negocio',req:'Y'},	{fType:'user'},	{wxn:'wrapx8',L:'Clasificación',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'docClass'},opts:$V.egrDocClass}},	{divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'textarea','class':jsF,name:'lineMemo'}},
	{divLine:1,wxn:'wrapx8',L:'Almacen Por Defecto',I:{tag:'select',sel:{'class':'whsId'},opts:$V.whsCode}}	]	});	var Fie=[{k:'itemCode',funcText:Itm.Txt.code},{k:'itemName',funcText:Itm.Txt.name},{k:'udm'},{k:'whsId',kty:'whsId',kty:'select',opts:$V.whsCode},{k:'quantity',kty:'quantity'}];	function trA(D){		var ln ='L['+n+']';
		var whsId=$1.q('.whsId',cont);
		D.whsId=whsId.value;		Fie[4].O={O:{vPost:ln+'[itemId]='+D.itemId+'&'+ln+'[itemSzId]='+D.itemSzId}};		tBody.appendChild($DocF.line(D,{lineName:ln,F:Fie}));		n++;	}},get:function(cont){	cont =$M.Ht.cont;	$Api.get({f:Api.Ivt.egr, inputs:$1.G.filter(), loade:cont, 	func:function(Jr){		if(Jr.errNo){ $Api.resp(cont,Jr); }		else{			var tb = $1.T.table(['','No.','Clasificación','Fecha','Detalles','Creado']); cont.appendChild(tb);			var tBody = $1.t('tbody',0,tb);			for(var i in Jr.L){ L=Jr.L[i];				var tr = $1.t('tr',0,tBody);				var tdB = $1.t('td',0,tr);				tdB.appendChild($1.Menu.winLiRel(Ivt.opts({L:L,serieType:'oegr'})));				var td = $1.t('td',0,tr);				$1.t('a',{href:$M.to('ivt.egr.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:L.docEntry},td);				$1.t('td',{textNode:_g(L.docClass,$V.egrDocClass)},tr);				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);				$1.t('td',{textNode:L.lineMemo},tr);				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);			};		}	}});},view:function(){ 	var Pa=$M.read(); var cont=$M.Ht.cont;	$Api.get({f:Api.Ivt.egr+'view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }		$DocT.B.h({docEntry:Pa.docEntry,dateC:Jr.dateC,serieType:'oegr',print:'Y', styDef:'width:6rem;',styT:'font-weight:bold;',		Ls:[{t:'Estado',v:_g(Jr.docStatus,$V.docStatus)},{middleInfo:'Y'},{logoRight:'Y'},			{t:'Fecha', v:Jr.docDate},{t:'Clasificación',v:_g(Jr.docClass,$V.whtDocClass)},			{t:'Detalles',v:Jr.lineMemo,cs:7}		]		},cont);		var tb=$1.T.table(['#','Código',{textNode:'Descripción'},{textNode:'Bodega',style:'width:5rem;'},{textNode:'Cant.',style:'width:5rem;'}]);		$1.t('p',0,cont);		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del documento'}}); cont.appendChild(fie);		tb.classList.add('table_x100');		var tBody=$1.t('tbody',0,tb);		if(Jr.L && Jr.L.errNo){			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));		}else{		var va='vertical-align:middle';		var n=1;		for(var i in Jr.L){ var L=Jr.L[i];			var tr=$1.t('tr',0,tBody);			$1.t('td',{textNode:n},tr); n++;			$1.t('td',{textNode:Itm.Txt.code(L)},tr);			$1.t('td',{textNode:Itm.Txt.name(L)},tr);			$1.t('td',{textNode:_g(L.whsId,$V.whsCode)},tr);			$1.t('td',{textNode:L.quantity*1,'class':tbSum.tbColNums,tbColNum:6},tr);		}		}		var tr=$1.t('tr',0,tBody);		$1.t('td',{colspan:4,style:'text-align:right;',textNode:'Total'},tr);		$1.t('td',{'class':tbSum.tbColNumTotal+'6'},tr);		tbSum.get(tb);		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);	}});}}Ivt.Wht={
get:function(cont){	cont =$M.Ht.cont;	$Api.get({f:Api.Ivt.wht, inputs:$1.G.filter(), loade:cont, 	func:function(Jr){		if(Jr.errNo){ $Api.resp(cont,Jr); }		else{			var tb = $1.T.table(['No.','Clasificación','Fecha','Detalles','Creado']); cont.appendChild(tb);			var tBody = $1.t('tbody',0,tb);			for(var i in Jr.L){ L=Jr.L[i];				var tr = $1.t('tr',0,tBody);				var td = $1.t('td',0,tr);				$1.t('a',{href:$M.to('ivt.wht.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:L.docEntry},td);			$1.t('td',{textNode:_g(L.docClass,$V.whtDocClass),title:L.docClass},tr);				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);				$1.t('td',{textNode:L.lineMemo},tr);				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);			};		}	}});},form:function(P){ P=(P)?P:{};	var cont=$M.Ht.cont;	var jsF='jsFields';	var n=1;	var tb=$1.T.table([{textNode:'#',style:'width:2.5rem;'},'Descripción','UdM',{textNode:'De Almacen',style:'width:6rem;'},{textNode:'Alm. Destino',style:'width:6rem;'},{textNode:'Cant.',style:'width:6rem;'}]);	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});	cont.appendChild(fie);	var tBody= $1.t('tbody',0,tb);	$Doc.L.winItem(tBody,{priceDefiner:'N',cont:fie,fields:'I.grsId,I.udm&wh[I.handInv]=Y',func:function(L){ trA(L); }	});	$Doc.formSerie({cont:cont, serieType:'owht',jsF:jsF, middleCont:fie,	POST:Api.Ivt.wht, func:function(Jr2){		$Doc.href('owht',Jr2,'to');	},	Li:[	{fType:'date',name:'docDate',req:'Y'},	{fType:'user'},	{wxn:'wrapx8',L:'Clasificación',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'docClass'},opts:$V.whtDocClass}},	{divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'textarea','class':jsF,name:'lineMemo'}},
	{divLine:1,wxn:'wrapx2',L:'Alm. Salida Defecto',I:{tag:'select',sel:{'class':'whsIdFrom'},opts:$V.whsCode}},
	{wxn:'wrapx2',L:'Alm. Ingreso Defecto',I:{tag:'select',sel:{'class':'whsIdTo'},opts:$V.whsCode}}	]	});	var Fie=[{k:'itemCode',funcText:Itm.Txt.code},{k:'itemName',funcText:Itm.Txt.name},{k:'udm'},{k:'whsIdFrom',kty:'whsId',kty:'select',opts:$V.whsCode},{k:'whsIdTo',kty:'select',opts:$V.whsCode},{k:'quantity',kty:'quantity'}];	function trA(D){		var ln ='L['+n+']';		Fie[5].O={O:{vPost:ln+'[itemId]='+D.itemId+'&'+ln+'[itemSzId]='+D.itemSzId}};
		D.whsIdFrom=$1.q('.whsIdFrom',cont).value;
		D.whsIdTo=$1.q('.whsIdTo',cont).value;		tBody.appendChild($DocF.line(D,{lineName:ln,F:Fie}));		n++;	}},view:function(){ 	var Pa=$M.read(); var cont=$M.Ht.cont;	$Api.get({f:Api.Ivt.wht+'view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }		$DocT.B.h({docEntry:Pa.docEntry,dateC:Jr.dateC,serieType:'owht',print:'Y', styDef:'width:6rem;',styT:'font-weight:bold;',		Ls:[{t:'Estado',v:_g(Jr.docStatus,$V.docStatus)},{middleInfo:'Y'},{logoRight:'Y'},			{t:'Fecha', v:Jr.docDate},{t:'Clasificación',v:_g(Jr.docClass,$V.whtDocClass)},			{t:'Detalles',v:Jr.lineMemo,cs:7}		]		},cont);		var tb=$1.T.table(['#','Código',{textNode:'Descripción'},{textNode:'De almacen',style:'width:5rem;'},{textNode:'Alm. Destino',style:'width:5rem;'},{textNode:'Cant.',style:'width:5rem;'}]);		$1.t('p',0,cont);		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del documento'}}); cont.appendChild(fie);		tb.classList.add('table_x100');		var tBody=$1.t('tbody',0,tb);		if(Jr.L && Jr.L.errNo){			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));		}else{		var va='vertical-align:middle';		var n=1;		for(var i in Jr.L){ var L=Jr.L[i];			var tr=$1.t('tr',0,tBody);			$1.t('td',{textNode:n},tr); n++;			$1.t('td',{textNode:Itm.Txt.code(L)},tr);			$1.t('td',{textNode:Itm.Txt.name(L)},tr);			$1.t('td',{textNode:_g(L.whsIdFrom,$V.whsCode)},tr);			$1.t('td',{textNode:_g(L.whsIdTo,$V.whsCode)},tr);			$1.t('td',{textNode:L.quantity*1,'class':tbSum.tbColNums,tbColNum:6},tr);		}		}		var tr=$1.t('tr',0,tBody);		$1.t('td',{colspan:5,style:'text-align:right;',textNode:'Total'},tr);		$1.t('td',{'class':tbSum.tbColNumTotal+'6'},tr);		tbSum.get(tb);		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);	}});}}Ivt.Whs={
get:function(cont){
	var whsId=$1.q('.__whsId',$M.Ht.filt).value;
	cont =$M.Ht.cont; var Pa=$M.read('!');
	$Api.get({f:Api.Ivt.whs, inputs:$1.G.filter(), loade:cont, 	func:function(Jr){		if(Jr.errNo){ $ps_DB.response(cont,Jr); }		else{			var tb = Drw.whs_itemSize(Jr,{whsId:whsId});			tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Reporte de Inventario'});			cont.appendChild(tb);		};	}	});},
history:function(){
	cont =$M.Ht.cont;
	$Api.get({f:Api.Ivt.whs+'history', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['Tipo','Número','Artículo','Descripción','Talla','Entradas','Salidas','Saldo','Fecha']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var css1=(L.onHandAt<0)?'color:#E00; font-weight:bold;':'';
				var td=$1.t('td',0,tr);				L.inQty*=1; L.outQty*=1;				var inQty=(L.inQty!=0)?L.inQty:'';				var outQty=(L.outQty!=0)?L.outQty:'';
				$Doc.href(L.tt,{docEntry:L.tr},{pare:td,format:'serie'});
				$1.t('td',{textNode:L.tr},tr);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:_g(L.itemSzId,$V.grs1)},tr);
				$1.t('td',{textNode:inQty,style:css1},tr);				$1.t('td',{textNode:outQty,style:css1},tr);
				$1.t('td',{textNode:L.onHandAt,style:css1},tr);
				$1.t('td',{textNode:L.docDate},tr);
			}
			tb=$1.T.tbExport(tb,{ico:'xlsx',fileName:'Reporte de Movimientos'});
			cont.appendChild(tb);
		}
	}});
}
}

$dTb.F['ivtMov']={
itemCode:{t:'Código'},itemName:{t:'Descripción'},udm:{t:'Unidad de Medida'},lineType:{t:'Tipo Linea'},whsId:{t:'Bodega'},quantity:{t:'Cant.'}
};
Ivt.Mov={
opts:function(P){
	var L=P.L; var Jr=P.Jr;
	var Li=[];
	Li.push({ico:'fa fa-eye',textNode:' Visualizar Documento', P:L, func:function(T){ $Doc.href('ivtMov',T.P); } });
	Li.push({ico:'fa fa_prio_high',textNode:' Anular Orden', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Ivt.aa+'mov/statusCancel',text:'Se va anular el documento, se afectarán las cantidades en el inventario.'}); } });
	return Li={Li:Li,textNode:P.textNode};
},
get:function(cont){
	cont =$M.Ht.cont;
	$Api.get({f:Api.Ivt.aa+'mov', inputs:$1.G.filter(), loade:cont, 
	func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb = $1.T.table(['','No.','Estado','Clasificación','Fecha','Detalles','Creado']); cont.appendChild(tb);
			var tBody = $1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr = $1.t('tr',0,tBody);
				var tdB = $1.t('td',0,tr);
				tdB.appendChild($1.Menu.winLiRel(Ivt.Mov.opts({L:L})));
				var td = $1.t('td',0,tr);
				$1.t('a',{href:$Doc.href('ivtMov',L,'r'),'class':'fa fa_eye',textNode:L.docEntry},td);
				$1.t('td',{textNode:_g(L.docStatus,$V.docStatus)},tr);
				$1.t('td',{textNode:_g(L.docClass,$V.ivt_docClassMov)},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
			}
		}
	}});
},
form:function(){
	var cont=$M.Ht.cont; jsF='jsFields';
	var tb=$1.T.table([]);cont.appendChild(tb);
	var tBody=$1.t('tbody',0,tb);
	var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Documento'}});
	cont.appendChild(fie);
	$Doc.formSerie({cont:cont, jsF:jsF, middleCont:fie, serieType:'ivtMov',Jr:{}, POST:Api.Ivt.aa+'mov',func:function(Jr2){ $Doc.href('ivtMov',Jr2,'to'); },
	Li:[
	{fType:'user'},
	{wxn:'wrapx8',fType:'date',req:'Y',name:'docDate',value:$2d.today},
	{wxn:'wrapx8',L:'Clasificación',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'docClass'},opts:$V.ivt_docClassMov}},
	{fType:'crd',wxn:'wrapx4',L:'Tercero',req:'Y'},
	{divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'input',type:'text',name:'lineMemo','class':jsF}},
	{divLine:1,wxn:'wrapx8',L:'Almacen Por Defecto',I:{tag:'select',sel:{'class':'whsId'},opts:$V.whsCode}},
	{wxn:'wrapx8',L:'Tipo',I:{tag:'select',sel:{'class':'typer'},opts:$V.ivt_lineType,noBlank:1}}
	]});
	Itm.Fx.winBcode({vPost:'_fie=I.udm&wh[I.handInv]=Y',func:function(Rt){
		trA(Rt,tBody);
	}},fie);
	Itm.Fx.sea2Size({vPost:'fie=I.udm&wh[I.handInv]=Y',func:function(Ds){
		trA(Ds,tBody);
	}},fie);
	var n=1;
	var bse={tHead:$1.q('thead',tb),tBody:tBody,k:'ivtMov',
	tHs:{'#':1,itemCode:1,itemName:1,lineType:1,whsId:1,quantity:1,'__quit':'Y'}};
	$dTb.line(bse); delete(bse.tHead);
	function trA(Ld){
		var whsId=$1.q('.whsId',cont);
		var typer=$1.q('.typer',cont);
		whsId=(whsId)?whsId.value:'';
		for(var i in Ld){ L=L=$js.clone(Ld[i]);
			var ln='L['+n+']'; L['#']=n;  n++;
			L.itemCode=Itm.Txt.code(L);
			L.itemName=Itm.Txt.name(L);
			var vPost=ln+'[itemId]='+L.itemId+'&'+ln+'[itemSzId]='+L.itemSzId
			L.lineType={tag:'select',T:{sel:{'class':jsF,name:ln+'[lineType]'},opts:$V.ivt_lineType,noBlank:'Y',selected:typer.value}};
			L.whsId={tag:'select',T:{sel:{'class':jsF,name:ln+'[whsId]'},opts:$V.whsCode,selected:whsId}};
			L.quantity={tag:'number',T:{'class':jsF,name:ln+'[quantity]','data-vPost':'Y',vPost:vPost,value:L.quantity}};
			$dTb.line(bse,L);
		}
	}
},
view:function(){ 
	var Pa=$M.read(); var cont=$M.Ht.cont;
	$Api.get({f:Api.Ivt.aa+'mov/view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		$DocT.B.h({docEntry:Pa.docEntry,dateC:Jr.dateC,serieType:'ivtMov',print:'Y', styDef:'width:6rem;',styT:'font-weight:bold;',
		Ls:[{t:'Estado',v:_g(Jr.docStatus,$V.docStatus)},{middleInfo:'Y'},{logoRight:'Y'},
			{t:'Fecha', v:Jr.docDate},{t:'Clasificación',v:_g(Jr.docClass,$V.ivt_docClassMov)},
			{t:'Detalles',v:Jr.lineMemo,cs:7}
		]
		},cont);
		var tb=$1.T.table([]);
		var tBody=$1.t('tbody',0,tb);
		var bse={tHead:$1.q('thead',tb),tBody:tBody,k:'ivtMov',
		tHs:{'#':1,itemCode:1,itemName:1,lineType:1,whsId:1,quantity:1}
		};
		$dTb.line(bse); delete(bse.tHead);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del documento'}}); cont.appendChild(fie);
		tb.classList.add('table_x100');
		if(Jr.L && Jr.L.errNo){
			$1.t('td',{colspan:6,textNode:Jr.L.text},$1.t('tr',0,tBody));
		}else{
			var n=1;
			for(var i in Jr.L){ var L=$js.clone(Jr.L[i]);
				L['#']=n; n++;
				L.itemCode=Itm.Txt.code(L);
				L.itemName=Itm.Txt.name(L);
				L.lineType=_g(L.lineType,$V.ivt_lineType);
				L.whsId=_g(L.whsId,$V.whsCode);
				L.quantity=L.quantity*1;
				$dTb.line(bse,L);
			}
		}
	}});
}
}

/* Importaciones */
$M.li['itfDT.ivtAwh']={t:'Generar Doc. Ajuste Inventario', kau:'itfDT.ivtAwh', func:function(){
	$M.Ht.ini({func_cont:function(){
		Itf.DT.form({text:'Documento Ajuste Inventario',api:Api.Ivt.aa+'dt/ivtAwh',Li:[
			{t:'Id Documento',d:'Consecutivo Siguiente'},
			{t:'Código Articulo',d:'Código de Artículo'},
			{t:'Código Talla',d:'Código de Talla'},
			{t:'Bodega',d:'Código de Bodega'},
			{t:'Cant.',d:'Cantidad contada'},
		],
		descrip:'Máximo 500 lineas por archivo.'
		});
	}
	});
}};
$M.li['itfDT.ivtItm']={t:'Actualizar Información de Articulo', kau:'itfDT.ivtItm', func:function(){
	$M.Ht.ini({func_cont:function(){
		Itf.DT.form({api:Api.Ivt.aa+'dt/ivtItm',Fie0:[
			{t:'itemCode',d:'Código de Artículo',b:'Y'},
		],
		descrip:'Máximo 500 lineas por archivo.',
		Fie:[
			{t:'sellPrice',d:'Precio de Venta'},
			{t:'buyPrice',d:'Precio de Compra'},
			{t:'buyFactor',d:'Cant. x Und Compra'},
			{t:'buyItem',d:'Articulo de Compra. Y o N'},
			{t:'sellItem',d:'Articulo de Venta. Y o N'},
			{t:'handInv',d:'Maneja Inventario. Y o N'},
			{t:'canNeg',d:'Permitir Negativos. Y o N'},
			{t:'invPrice',d:'Coste Promedio Manual (El sistema calcula en otro campo el promedio siempre)'},
			{t:'itemName',d:'Nombre de Articulo'},
		]
		});
	}
	});
}};

Ivt.Fx={
whsSel:function(P,cont){
	var cls=(P.cls)?P.cls:'';
	var namer=(P.name)?P.name:'';
	var opts=(P.type && P.type=='pep')?$Tb.whsPeP:$V.whsCode;
	var opt=$1.T.sel({sel:{'class':cls+' __ivtWhsSel',name:namer},opts:opts,selected:P.selected});
	if(cont){ cont.appendChild(opt); }
	return opt;
}
}