// package: unclicc.com.fe
$V.Mdls.itm={t:'Articulos',ico:''};
Api.Itm = {b:'/a/oitm/',pr:'/appi/private/itm/'};

Api.Barc={a:'/sa/c70/barcode/'};

$V.active={active:'Activo',inactive:'Inactivo'};
$V.itemType = {'P':'Modelo','MP':'Materia Prima','SE':'Semi Elaborado'};
$V.itmType=[{k:'P',v:'Articulo'},{k:'MP',v:'Materia Prima'},{k:'SE',v:'Semielaborado'}];
$V.ivtGes=[{k:'N',v:'Ninguno'},{k:'B',v:'Lotes'}];
$TXT.itemSize='S/P';
$V.itmWhsType=[{k:'P',v:'Producto Terminado'},{k:'MP',v:'Materia Prima'},{k:'PeP',v:'Prod. en Proceso'}];
$V.itmWhsClass=[{k:'N',v:'Normal'},{k:'R',v:'Reproceso'},{k:'D',v:'Desperdicio'}];

_Fi['itmPget']=function(wrap) {
	var jsV = 'jsFiltVars';
	var Pa=$M.read('!');
	func=Itm.get; var sep=Pa.split('.');
	gType=(sep[1])?sep[1].toUpperCase():'';
	opts=[{k:'active',v:'Activos'},{k:'inactive',v:'Inactivos'},{k:'',v:'Todos'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Estado',I:{tag:'select','class':jsV,name:'I.webStatus',opts:$V.active,optAll:1}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Código',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)',placeholder:'101,400'}},divL);
	$1.T.divL({wxn:'wrapx6', L:'Nombre',I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Grupo',I:{tag:'select','class':jsV,name:'I.itemGr(E_igual)',opts:$JsV.itmGr,kIf:{prp1:gType}}},divL);
	opts=[{k:'code',v:'Codigo'},{k:'name',v:'Nombre'},{k:'itemGr',v:'Grupo'}];
	$1.T.divL({wxn:'wrapx8', L:'Ordenar por',I:{tag:'select','class':jsV,name:'orderBy',opts:opts}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar Listado', func:func});
	wrap.appendChild(btnSend);
};
_Fi['itmProfile']=function(wrap){
	var jsV = 'jsFiltVars';
	var Pa=$M.read('!');
	func=Itm.Profile.get; var sep=Pa.split('.');
	gType=(sep[1])?sep[1].toUpperCase():'';
	opts=[{k:'active',v:'Activos'},{k:'inactive',v:'Inactivos'},{k:'',v:'Todos'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Estado',I:{tag:'select','class':jsV,name:'I.webStatus',opts:$V.active,optAll:1}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Tipo',I:{tag:'select','class':jsV,name:'I.itemType',opts:$V.itmType,noBlank:'Y'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Código',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)',placeholder:'101,400'}},divL);
	$1.T.divL({wxn:'wrapx6', L:'Nombre',I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Grupo',I:{tag:'select','class':jsV,name:'I.itemGr(E_igual)',opts:$JsV.itmGr}},divL);
	opts=[{k:'code',v:'Codigo'},{k:'name',v:'Nombre'},{k:'itemGr',v:'Grupo'}];
	$1.T.divL({wxn:'wrapx8', L:'Ordenar por',I:{tag:'select','class':jsV,name:'orderBy',opts:opts}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar Listado', func:func});
	wrap.appendChild(btnSend);
};


_Fi['itmCostmpDiff']=function(wrap){
	var jsV = 'jsFiltVars';
	var Pa=$M.read('!');
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:'Código',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)',placeholder:'101,400'}},wrap);
	$1.T.divL({wxn:'wrapx6', L:'Nombre',I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:'Código Hijo',I:{tag:'input',type:'text','class':jsV,name:'I2.itemCode(E_like3)',placeholder:'101,400'}},wrap);
	$1.T.divL({wxn:'wrapx6', L:'Nombre',I:{tag:'input',type:'text','class':jsV,name:'I2.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Itm.Cost.mpDiff});
	wrap.appendChild(btnSend);
};
_Fi['itmCostLog2']=function(wrap){
	var jsV = 'jsFiltVars';
	var Pa=$M.read('!');
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)',placeholder:'101,400'}},wrap);
	$1.T.divL({wxn:'wrapx6', L:{textNode:'Nombre'},I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Aplicado'},I:{tag:'select',sel:{'class':jsV,name:'A.isExec(E_igual)'},opts:$V.NY,noBlank:1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Itm.Cost.log2});
	wrap.appendChild(btnSend);
};
_Fi['itmAll']=function(wrap){
	var jsV = 'jsFiltVars';
	var Pa=$M.read();
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)',placeholder:'101,400'}},wrap);
	$1.T.divL({wxn:'wrapx6', L:{textNode:'Nombre'},I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Tipo'},I:{tag:'select','class':jsV,name:'I.itemType',opts:$V.itemType}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Wma.Bom.get});
	wrap.appendChild(btnSend);
};
_Fi['itm.cost']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_in)',placeholder:'101,400'}},wrap);
	$1.T.divL({wxn:'wrapx6', L:{textNode:'Nombre'},I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'S/P',I:{tag:'select','class':jsV,name:'grs2.itemSzId',opts:$V.grs1}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Itm.Cost.get});
	wrap.appendChild(btnSend);
};
_Fi['itmSub']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx4', L:'Subproducto',I:{tag:'input',type:'text','class':jsV,name:'itemSize',placeholder:'38,40,Azul,X,L'}},wrap);
	$1.T.btnSend({textNode:'Actualizar Listado', func:function(){ Itm.Sub.get(); }},wrap);
};

/* new 2020 */
var Itm={
uriType:function(){
	var r=$M.read('!');
	var R={};
	if(r.match(/^itm\.mp/)){ R.type='MP'; R.isMP=true; }
	else if(r.match(/^itm\.se/)){ R.type='SE'; R.isSE=true;}
	else if(r.match(/^itm\.ai/)){ R.type='AI'; R.isAI=true;}
	else{ R.type='P'; R.isP=true; }
	R.url='itm.'+(R.type).toLowerCase();
	return R;
},
get:function(){
	var R=Itm.uriType();
	var p=R.type;
	cont =$M.Ht.cont;
	var vPost='itemType='+p+'&'+$1.G.filter();
	$Api.get({f:Api.Itm.pr+'a', inputs:vPost, loade:cont, errWrap:cont,
	func:function(Jr){
		var tdf=['','Código','Nombre','UdM','Grupo','Tipos'];
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			if(R.isMP){ tdf.push('$ Compra','Udm'); }
			else{ tdf.push('$ Venta','Udm'); }
			var tb = $1.T.table(tdf); cont.appendChild(tb);
			var tBody = $1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr = $1.t('tr',0,tBody);
				var td = $1.t('td',0,tr);
				var menu=$1.Menu.winLiRel({Li:[
					{ico:'fa fa-pencil',textNode:' Modificar', P:L, href:$M.to(R.url+'.form','itemId:'+L.itemId,'r') },
					{ico:'fa fa-barcode',textNode:' Códigos de Barras',href:$M.to('itm.BC.form','itemId:'+L.itemId,'r')}
				]});
				td.appendChild(menu);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
				$1.t('td',{textNode:_g(L.itemGr,$JsV.itmGr)},tr);
				var td=$1.t('td',0,tr);
				if(L.handInv=='Y'){ $1.t('span',{'class':'fa fa-truck',title:'Articulo maneja inventario'},td); }
				if(L.prdItem=='Y'){ $1.t('span',{'class':'iBg iBg_produccion',title:'Articulo de Producción'},td); }
				if(L.sellItem=='Y'){ $1.t('span',{'class':'fa fa-tags',title:'Articulo de Venta'},td); }
				if(L.buyItem=='Y'){ $1.t('span',{'class':'fa fa-shopping-cart',title:'Articulo de Compra'},td); }
				if(R.isMP){
					$1.t('td',{textNode:$Str.money(L.buyPrice)},tr);
					$1.t('td',{textNode:_g(L.buyUdm,Udm.O)},tr);
				}
				else{
					$1.t('td',{textNode:$Str.money(L.sellPrice)},tr);
					$1.t('td',{textNode:_g(L.sellUdm,Udm.O)},tr);
				}
			};
		}
	}});
},
form:function(){ //falta put
	R=Itm.uriType();
	var itemType=R.type;
	cont=$M.Ht.cont; Pa=$M.read();
	$Api.get({f:Api.Itm.pr+'a/form',loade:cont, loadVerif:!Pa.itemId,errWrap:cont, inputs:'itemId='+Pa.itemId, func:function(Jr){
		Jr=(Jr)?Jr:{};
		var vid=$Api.JS.addF({name:'itemId',value:Pa.itemId},cont);
		$Api.JS.addF({name:'itemType',value:itemType},cont);
		Jr.buyFactor=(Jr.buyFactor)?Jr.buyFactor:1;
		Jr.sellFactor=(Jr.sellFactor)?Jr.sellFactor:1;
		Itm.Ht.formComm(cont,Jr,{itemType:itemType});
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:Api.Itm.pr+'a/form', jsBody:cont, loade:resp, func:function(Jr2){
			if(!Jr2.errNo){ vid.value=Jr2.itemId; }
			$Api.resp(resp,Jr2);
		}},cont);
	}});
}
};


/* end 2020 */

Itm.Cost={
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Itm.b+'cost', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','Código','Descripción',{textNode:'P.V',_iHelp:'Precio Venta'},{textNode:'PC',_iHelp:'Precio Compra'},{textNode:'P.I',_iHelp:'Precio Unidad Inventario'},'Costo','M.P','M.O',{textNode:'SV',_iHelp:'Servicios'},'M.A','CIF','Actualizado']);
			var tBody=$1.t('tbody',0,tb);
			Jr.L=$js.sortNum(Jr.L,{k:'itemCode'});
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				btnA=$1.T.btnFa({fa:'fa-sitemap',textNode:' Ficha Costos', P:L, func:function(T){ $M.to('ipc.form','itemId:'+T.P.itemId+',itemSzId:'+T.P.itemSzId); }},td);
				$1.t('td',{textNode:Itm.Txt.code(L)},tr);
				$1.t('td',{textNode:Itm.Txt.name(L)},tr);
				$1.t('td',{textNode:$Str.money(L.sellPrice),style:'backgroundColor:#DDD'},tr);
				$1.t('td',{textNode:$Str.money(L.buyPrice)},tr);
				$1.t('td',{textNode:$Str.money(L.invPrice)},tr);
				$1.t('td',{textNode:$Str.money(L.cost),style:'backgroundColor:#DDD'},tr);
				var mpCost=L.costMP;
				var moCost=L.costMO;
				var maCost=L.costMA;
				var cif=L.cif;
				var css=(L.mpManual=='Y')?'backgroundColor:#FF0;':'';
				$1.t('td',{textNode:$Str.money(mpCost),xls:{t:mpCost},style:css},tr);
				$1.t('td',{textNode:$Str.money(moCost),xls:{t:moCost},style:css},tr);
				$1.t('td',{textNode:$Str.money(L.costSV),xls:{t:L.costSV},style:css},tr);
				$1.t('td',{textNode:$Str.money(maCost),xls:{t:maCost},style:css},tr);
				$1.t('td',{textNode:$Str.money(cif),xls:{t:cif},style:css},tr);
				$1.t('td',{textNode:$2d.f(L.dateUpd,'mmm d H:iam')},tr);
			}
			tb=$1.T.tbExport(tb,{print:1,fileName:'Listado de Costes Articulos'});
			cont.appendChild(tb);
		}
	}});
},
form:function(){
	var cont=$M.Ht.cont; Pa=$M.read(); var jsF='jsFields';
	var vPost='itemId='+Pa.itemId+'&itemSzId='+Pa.itemSzId;
	$Api.get({f:Api.Itm.b+'cost/item', loade:cont, inputs:vPost, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var L1=(Jr.L && Jr.L[0])?Jr.L[0]:{};
			lt=Itm.Sea.sub({vSea:'I.prdItem=Y',value:L1.itemName,func:function(R){
				$M.sett('ipc.form',{itemId:R.itemId,itemSzId:R.itemSzId},Itm.Cost.form);
			}});
			divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Cambiar a Articulo...',Inode:lt,},cont);
			var tb=$1.T.table(['','Total','MP','MO','SV','MA','CIF','','%','% MP','% MO','% SV','% MA','% CIF']);
			var tBody=$1.t('tbody',0,tb);
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L1.wfaName},tr);
			$1.t('td',{textNode:$Str.money(L1.cost)},tr);
			$1.t('td',{textNode:$Str.money(L1.costMP)},tr);
			$1.t('td',{textNode:$Str.money(L1.costMO)},tr);
			$1.t('td',{textNode:$Str.money(L1.costSV)},tr);
			$1.t('td',{textNode:$Str.money(L1.costMA)},tr);
			$1.t('td',{textNode:$Str.money(L1.cif)},tr);
			$1.t('td',{colspan:6},tr);
			delete(Jr.L[0]);
			function valp(v,t){
				if(t>0){ return $js.toFixed(v/t*100)+'%'; }
				return '';
			}
			for(var i in Jr.L){ var L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.wfaName},tr);
				$1.t('td',{textNode:$Str.money(L.cost)},tr);
				$1.t('td',{textNode:$Str.money(L.costMP)},tr);
				$1.t('td',{textNode:$Str.money(L.costMO)},tr);
				$1.t('td',{textNode:$Str.money(L.costSV)},tr);
				$1.t('td',{textNode:$Str.money(L.costMA)},tr);
				$1.t('td',{textNode:$Str.money(L.cif)},tr);
				$1.t('td',{style:'backgroundColor:#CCC'},tr);
				$1.t('td',{textNode:valp(L.cost,L1.cost)},tr);
				$1.t('td',{textNode:valp(L.costMP,L1.costMP)},tr);
				$1.t('td',{textNode:valp(L.costMO,L1.costMO)},tr);
				$1.t('td',{textNode:valp(L.costSV,L1.costSV)},tr);
				$1.t('td',{textNode:valp(L.costMA,L1.costMA)},tr);
				$1.t('td',{textNode:valp(L.cif,L1.cif)},tr);
			}
			tb=$1.T.tbExport(tb,{ext:'xlsx',L:'Ficha de Costos',fileName:'Ficha Costos '+Itm.Txt.code(L1),print:'Y'});
			cont.appendChild(tb);
			//Materiales
			tbL=$1.t('div');
			p=$1.t('p',{textNode:'Ficha Costos de '},tbL);
			$1.t('b',{textNode:Itm.Txt.name(L1)},p);
			var tb=$1.T.table(['Código','Descripción','Costo','Cant. Req','Udm','Total'],0,tbL);
			var tBody=$1.t('tbody',0,tb); var wfal=-1;
			if(Jr.LM){ Jr.LM=$js.sortByKeys(Jr.LM,['lineNum.0-9']); }
			for(var i in Jr.LM){ var L=Jr.LM[i];
				if(wfal!=L.wfaId){
					var tr=$1.t('tr',0,tBody);
					$1.t('td',{textNode:'Fase: '+_g(L.wfaId,$Tb.owfa),colspan:6,style:'backgroundColor:#EEE;'},tr);
				} wfal=L.wfaId;
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:Itm.Txt.code(L)},tr);
				$1.t('td',{textNode:Itm.Txt.name(L)},tr);
				$1.t('td',{textNode:$Str.money(L.price)},tr);
				$1.t('td',{textNode:L.reqQty},tr);
				$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
				$1.t('td',{textNode:$Str.money(L.price*L.reqQty)},tr);
			}
			tb=$1.T.tbExport(tbL,{ext:'xlsx',L:'Lista Materiales',fileName:'Lista Materiales '+Itm.Txt.code(L1),print:'Y'});
			cont.appendChild(tb);
		}
	}});
},
mpDiff:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Itm.b+'cost/mpDiff', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','Código','Descripción','Articulos Diferentes',{textNode:'Diferencia en Costo',_iHelp:'Costo Negativo: los costo de la ficha son menores a los costos definidos de cada producto.'}]);
			var tBody=$1.t('tbody',0,tb); cont.appendChild(tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var tExec=(L.isExec=='Y')?$Doc.by('userDate',L):'Pendiente';
				$Api.send({fa:'fa fa_history',textNode:' Actualizar', PUT:Api.Itm.b+'cost/mpDiff',inputs:'itemId='+L.itemId+'&citemId='+L.citemId+'&invPrice='+L.invPrice*1, func:function(Jr2){ $1.Win.message(Jr2); }},td);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:L.items*1},tr);
				$1.t('td',{textNode:$Str.money(L.costDiff)},tr);
			}
		}
	}});
},

log2:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Itm.b+'cost/log2', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['Ejecución','Tipo','Código','Descripción','Solicitado','Ejecutado Por']);
			var tBody=$1.t('tbody',0,tb); cont.appendChild(tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var tExec=(L.isExec=='Y')?$Doc.by('userDate',L):'Pendiente';
				if(L.isExec=='Y'){
					$1.t('span',{'class':'fa fa_history',style:'color:#0F0;',textNode:' Realizada'},td);
				}
				else{
				$Api.send({fa:'fa fa_history',textNode:' Pendiente', PUT:Api.Itm.b+'cost/log2',inputs:'id='+L.id, func:function(Jr2){ $1.Win.message(Jr2); }},td);
				}
				$1.t('td',{textNode:_g(L.updateType,$V.itmLog2Type)},tr);
				var text=(L.itemSzId && L.itemSzId!=0)?' (T:  '+_g(L.itemSzId,$V.grs1)+')':' (Todas)';
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName+text},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
				$1.t('td',{textNode:tExec},tr);
			}
		}
	}});
},
};

Itm.Sysd={};

Itm.Sysd.massDataItm=function(P){ P=(P)?P:{};
	$Filt.filtFunc=function(){ P.filter='N'; Itm.Sysd.massDataItm(P); }
	if(P.filter!='N'){
		$Filt.form({cont:$M.Ht.filt,whs:'Y',active:'Y',Li:[
		{t:'Grupo',tag:'select',name:'itemGr',opts:$V.itmGrs,opt1:{k:0,v:'Ninguno'}},
		{t:'Código',tag:'input',type:'text',name:'itemCode(E_like3)'},
		{t:'Nombre',tag:'input',type:'text',name:'itemName(E_like3)'},
		{t:'Estado Web',tag:'select',name:'webStatus',opts:$V.activeOpt},
		]});
	}
	$Sysd.MassData.form({vPost:$Filt.get($M.Ht.filt),filter:'Y',k:'oitm'});
}

Itm.Ht={
formComm:function(cont,Jr,P){
	jsF=(P.jsF)?P.jsF:$Api.JS.cls;
	var divL=$1.T.divL({divLine:1, wxn:'wrapx3',req:'Y',L:'Nombre',I:{tag:'input',type:'text','class':jsF,name:'itemName',value:Jr.itemName}},cont);
	$1.T.divL({wxn:'wrapx10',L:'Código',I:{tag:'input',type:'text','class':jsF+' _itemCode',name:'itemCode',value:Jr.itemCode}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Grupo',aGo:'jsv.itmGr',I:{tag:'select','class':jsF,name:'itemGr',opts:$JsV.itmGr,kIf:{prp1:P.itemType},selected:Jr.itemGr}},divL);
	$1.T.divL({wxn:'wrapx10',req:'Y',L:'UdM',I:{tag:'select','class':jsF,name:'udm',opts:Udm.O,selected:Jr.udm}},divL);
	var dv=$1.T.divL({wxn:'wrapx10',L:'Subproductos',aGo:'itmSub.gr',I:{tag:'select','class':jsF+' __grsId',name:'grsId',opts:$V.ogrs,selected:Jr.grsId,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx10',req:'Y',L:'Estado',I:{tag:'select','class':jsF,name:'webStatus',opts:{active:'Activo',inactive:'Inactivo'},selected:Jr.webStatus,noBlank:1}},divL);
	if(!$Mdl.status('ivtSubItems','Y')){ dv.style.display='none'; }
	var div=$1.t('div',{style:'padding:0.5rem 0;'},cont);
	$1.t('div',{style:'display:table-cell; margin-right:4px',textNode:'Articulo de: '},div);
	if($Mdl.status('gvtPur')){
		$1.T.ckLabel({t:'Compra',I:{'class':jsF,name:'buyItem',checked:(Jr.buyItem=='Y')}},div).style.display='table-cell';
	}
	$1.T.ckLabel({t:'Venta',I:{'class':jsF,name:'sellItem',checked:(Jr.sellItem=='Y')}},div).style.display='table-cell';
	if($Mdl.status('ivt')){
		$1.T.ckLabel({t:'Inventario',I:{'class':jsF,name:'handInv',checked:(Jr.handInv=='Y')}},div).style.display='table-cell';
	}
	if($Mdl.status('wma') && (P.itemType=='P' || P.itemType=='SE')){
		$1.T.ckLabel({t:'Producción',I:{'class':jsF,name:'prdItem',checked:(Jr.prdItem=='Y')}},div).style.display='table-cell';
	}
	Wins=$1.tabs([
		{textNode:'General',active:'Y',winClass:'gen','class':'fa'},
		//@deprecated {textNode:'Compras',winClass:'purc','class':'fa fa-shopping-cart',mdlActive:'gvtPur'},
		{textNode:'Ventas',winClass:'sell','class':'fa fa-tags'},
		{textNode:'Inventario',winClass:'ivt','class':'fa fa-cubes',mdlActive:'ivt'},
		{textNode:'Logistica',winClass:'log','class':'fa fa-truck',mdlActive:'itmLog'},
		{mdlActive:'itmSrc',k:'plugsFiles',P:{tt:'itm',tr:Pa.itemId,err3:'Primero debe crear al articulo para realizar esta acción'}},
		{textNode:'Caracteristicas',winClass:'prp','class':'fa fa-bookmark',mdlActive:'itmItp'}
	],cont);

	if($Mdl.status('gvtPur')) {
        let puyBasic = $1.T.divL({
                divLine: 1,
                wxn: 'wrapx8',
                L: 'Precio Compra',
                I: {
                    tag: 'input',
                    type: 'text',
                    min: 0,
                    inputmode: 'numeric',
                    numberformat: 'mil',
                    'class': jsF + ' ffie_buyPrice',
                    name: 'buyPrice',
                    value: Jr.buyPrice
                }
            },
            Wins.gen);
		$1.T.divL({wxn:'wrapx8',L:'Und de Compra',I:{tag:'select','class':jsF,name:'buyUdm',opts:Udm.O,selected:Jr.buyUdm}}, puyBasic);
		$1.T.divL({wxn:'wrapx10',L:'Cant. x Und.',_i:'cantidad que trae cada unidad de compra. 1 caja = <b>8</b> lapiceros',
			I:{tag:'input',type:'number',min:1,inputmode:'numeric','class':jsF+' ffie_buyFactor',name:'buyFactor',value:Jr.buyFactor}}
			, puyBasic);
	}
	let ivtBasic = $1.T.divL({
			divLine: 1, wxn: 'wrapx8', L: 'Costo Unitario',
			I: {
				tag: 'input',
				type: 'text',
				min: 0,
				inputmode: 'numeric',
				numberformat: 'mil',
				'class': jsF + ' ffie_invPrice',
				name: 'invPrice',
				value: Jr.invPrice
			},
			_i: 'El costo en la unidad de medida del articulo.<br/>Si es un articulo de compra en una unidad diferente, se debe convertir el valor.<br/><b>Ejemplo:</b>- Se Compra 1 caja a $12.000 que trae 8 lapiceros<br/>- Cada lapicero tiene un costo de <b>$1500</b>. Resultado de $12.000/8.'
		},
		Wins.gen);
	$1.T.divL({
		wxn: 'wrapx8',
		L: 'Margen %',
		I: {
			tag: 'input',
			type: 'number',
			min: 0, max:100,
			inputmode: 'numeric',
			'class': jsF +' itm_field_sell_percent',
			name: 'sell_percent',
			value: Jr.sell_percent ? Jr.sell_percent * 1 : 10
		}
	}, ivtBasic);

	let sellBasic = $1.T.divL({
			divLine: 1,
			wxn: 'wrapx8',
			L: 'Precio Venta',
			I: {
				tag: 'input',
				type: 'text',
				min: 0,
				inputmode: 'numeric',
				numberformat: 'mil',
				'class': jsF,
				id: 'itm_field_sell_price',
				name: 'sellPrice',
				value: Jr.sellPrice
			}
		},
		Wins.gen);
	$1.T.divL({wxn:'wrapx8',L:'Unidad de Venta',I:{tag:'select','class':jsF,name:'sellUdm',opts:Udm.O,selected:Jr.sellUdm}}, sellBasic);
	$1.T.divL({wxn:'wrapx8',L:'Cant. x Venta',_i:'itmSellFactor',I:{tag:'input',type:'number',min:1,inputmode:'numeric','class':jsF,name:'sellFactor',value:Jr.sellFactor}}, sellBasic);


	var wGen=[
		{t:'ID Adicional',node:$1.t('input',{type:'text','class':jsF,name:'idAdd',value:Jr.idAdd})},
		{t:'Grupo Contable',node:$1.T.sel({'class':jsF,name:'accgrId',opts:$Tb.oiac,selected:Jr.accgrId}),aGo:'gfiItmGr'},
		{t:'Impuesto',node:$1.T.sel({'class':jsF,name:'vatId',opts:$Tb.otaxI,selected:Jr.vatId}),aGo:'gfiTax'},
		{t:'Retención',node:$1.T.sel({'class':jsF,name:'rteId',opts:$Tb.otaxR,selected:Jr.rteId}),aGo:'gfiTax'},
		{t:'Descripción',node:$1.t('textarea',{'class':jsF,name:'description',style:'width:100%;',textNode:Jr.description,maxlength:200,style:'minWidth:400px'})}
	];
	if($Mdl.status('itmSrc')){
		wGen.push({t:'',node:$1.T.imgUpd({name:'src1',jsF:jsF,value:Jr.src1})});
	}
	$1.Tb.trsI(wGen,Wins.gen);
	//compras @deprecated
	if(0 && $Mdl.status('gvtPur')){
		var sup=$1.lTag({tag:'card',value:Jr.cardName,D:Jr});
		$1.Tb.trsI([
		{t:'Proveedor Predeterminado',node:sup},
		{t:'Cant. Pedido Mínimo',node:$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'minBuyOrd',min:0,value:Jr.minBuyOrd})},
		{t:'Tiempo de entrega',node:$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'leadTime',min:0,value:Jr.leadTime})},
		],Wins.purc);
	}
		//ventas
		$1.Tb.trsI([
		{t:'Pedido Mínimo',node:$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'sellMinOrder',min:0,value:Jr.sellMinOrder})},
		{t:'Tiempo de entrega',node:$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'sellLeadTime',min:0,value:Jr.sellLeadTime})},
		],Wins.sell);

		if($Mdl.status('ivt')){
			var fis=[
			{t:'Método Valorización',node:$1.T.sel({'class':jsF,name:'costMet',opts:$V.ivtMetVal,selected:Jr.costMet,noBlank:'Y'})}];
			fis.push({t:'Coste Estandar',node:$1.lTag({tag:'$','class':jsF,name:'standPrice',value:Jr.standPrice}),tP:{_i:'NO SE UTILIZA EN LOS PROCESOS DE COSTEO. Coste Estandar en unidad de inventario. Se define manualmente y tiene un fin comparativo para reportes de auditoria.'}});
			fis.push({t:'Almacen por Defecto',node:$1.T.sel({'class':jsF,name:'defWhs',opts:$Tb.itmOwhs,selected:Jr.defWhs}),aGo:'tb.itmOwhs'});
			fis.push({t:'Permitir Negativos',_i:'Puede permitir manejar negativos a algunos articulos cuyo consumo no pueda llevarse de manera precisa o no le interese controlar las existencias',node:$1.T.sel({'class':jsF,name:'canNeg',opts:$V.NY,selected:Jr.canNeg,noBlank:1})});
			$1.Tb.trsI(fis,Wins.ivt);
			//deprecated: Itm.Fx.udmConverts(Jr,Wins.ivt);
		}
		//logistica
		if($Mdl.status('itmLog') && (P.itemType=='P' || P.itemType=='MP')){
			log=Wins.log;
			log.classList.add($Api.JS.clsL);
			log.setAttribute('jsk','LG');
			Lg=(Jr.LG)?Jr.LG:{};
			var jsFLN=$Api.JS.clsLk;
			var R=[
				{t:'Datos Inventario',k:'i'},
				{t:'Datos Venta',k:'s'},
				{t:'Datos Compra',k:'p'},
			];
			trsI=[];
			for(var i2 in R){ var L2=R[i2];
				trsI.push({tds:[
					{textNode:L2.t,style:'fontWeight:bold',colspan:2},
					{textNode:'Udm'}
				]});
				trsI.push({tds:[
					{textNode:'Peso'},
					$1.lTag({tag:'number','class':jsFLN,name:L2.k+'Weight',value:Lg[L2.k+'Weight'],style:'width:80px'}),
					$1.lTag({tag:'select','class':jsFLN,name:L2.k+'WeightUdm',opts:Udm.O,value:Lg[L2.k+'WeightUdm'],style:'width:70px'})
				]});
				trsI.push({tds:[
					{textNode:'Volumen'},
					$1.lTag({tag:'number','class':jsFLN,name:L2.k+'Volume',value:Lg[L2.k+'Volume'],style:'width:80px'}),
					$1.lTag({tag:'select','class':jsFLN,name:L2.k+'VolumeUdm',opts:Udm.O,value:Lg[L2.k+'VolumeUdm'],style:'width:70px'})
				]});
				trsI.push({tds:[
					{textNode:'Ancho'},
					$1.lTag({tag:'number','class':jsFLN,name:L2.k+'Width',value:Lg[L2.k+'Width'],style:'width:80px'}),
					$1.lTag({tag:'select','class':jsFLN,name:L2.k+'WidthUdm',opts:Udm.O,value:Lg[L2.k+'WidthUdm'],style:'width:70px'})
				]});
				trsI.push({tds:[
					{textNode:'Alto'},
					$1.lTag({tag:'number','class':jsFLN,name:L2.k+'Height',value:Lg[L2.k+'Height'],style:'width:80px'}),
					$1.lTag({tag:'select','class':jsFLN,name:L2.k+'HeightUdm',opts:Udm.O,value:Lg[L2.k+'HeightUdm'],style:'width:70px'})
				]});
				trsI.push({tds:[
					{textNode:'Largo'},
					$1.lTag({tag:'number','class':jsFLN,name:L2.k+'Length',value:Lg[L2.k+'Length'],style:'width:80px'}),
					$1.lTag({tag:'select','class':jsFLN,name:L2.k+'LengthUdm',opts:Udm.O,value:Lg[L2.k+'LengthUdm'],style:'width:70px'})
				]});
			}
			$1.Tb.trsI(trsI,log);
		}
		//prp
		var Lpr=[]; var jrPrp=(Jr.Prp && !Jr.errNo)?Jr.Prp:{};
		if($Mdl.status('itmItp')){
			Lpr.push({tds:[{textNode:'Propiedad'},{textNode:'Valor Propiedad',aGo:'tb.itmOitp'}]});
			for(var i in $Tb.itmOitp){ var k='prp'+$Tb.itmOitp[i].k;
				var tag=$1.t('input',{type:'text','class':$Api.JS.clsLN,AJs:{k:k},name:'value',value:jrPrp[k]});
				if($Tb.itmOitp_opts && $Tb.itmOitp_opts[i]){
					var tp=$Tb.itmOitp_opts[i];
					if(tp.tag=='select'){ tag=$1.T.sel({'class':$Api.JS.clsLN,AJs:{k:k},name:'value',opts:tp.opts,selected:jrPrp[k]}); }
				}
				Lpr.push({tr:{'class':$Api.JS.clsL,jsk:'PrP'},tds:[{textNode:$Tb.itmOitp[i].v},{node:tag}]});
			}
			$1.Tb.trsI(Lpr,Wins.prp);
		}
		/* finales */

	let eBuyPrice = $1.q('.ffie_buyPrice')
	let eBuyFactor = $1.q('.ffie_buyFactor')
	let eInventoryPrice = $1.q('.ffie_invPrice');
	let eSellPercent = $1.q('.itm_field_sell_percent')
	let eSellPrice = $1.q('#itm_field_sell_price')
	function updatePercent(target) {
		let buyPrice = $Str.toNumber(eBuyPrice && eBuyPrice.value ? eBuyPrice.value : 0);
		let buyFactor = (eBuyFactor && eBuyFactor.value) ? $Str.toNumber(eBuyFactor.value) : 1;
		let invPriceValue = $Str.toNumber(eInventoryPrice && eInventoryPrice.value ? eInventoryPrice.value : 0)
		let sellPrice = $Str.toNumber(eSellPrice && eSellPrice.value ? eSellPrice.value : 0)
		sellPrice = sellPrice > 0 ? sellPrice : 0

		let sellPercentValue = eSellPercent && eSellPercent.value > 0 ? eSellPercent.value : 0;
		sellPercentValue = 1 - (sellPercentValue / 100);
		sellPercentValue = sellPercentValue === 0 ? 1 : sellPercentValue

		// 125 = 100k / (1-20%) revert -> 0.8 = 100/125
		switch (target) {
			case 'buy':
				invPriceValue = $Str.round(buyPrice * 1 / buyFactor, 2)
				eInventoryPrice.value = $Str.money(invPriceValue)
				eSellPrice.value = $Str.money(invPriceValue / sellPercentValue)
				break
			case 'ivt':
				console.log(invPriceValue, eInventoryPrice)
				eSellPrice.value = $Str.money(invPriceValue / sellPercentValue)
				break
			case 'sell':
				eSellPercent.value = sellPrice > 0 ? $Str.round(1 - invPriceValue / sellPrice, 2)*100 : 0
				break
		}
	}
	$1.onchange('.ffie_buyPrice', () => updatePercent('buy'));
	$1.onchange('.ffie_buyFactor', () => updatePercent('buy'));
	$1.onchange('.ffie_invPrice', () => updatePercent('ivt'));
	$1.onchange('.itm_field_sell_percent', () => updatePercent('ivt'));
	$1.onchange('#itm_field_sell_price', () => updatePercent('sell'));
},
}
Itm.Profile={
	get:function(){
		var cont=$M.Ht.cont;
    var Cols=[
		{H:'Código',k:'itemCode',fText:Itm.Txt.code},
		{H:'Descripcion',k:'itemName',fText:Itm.Txt.name},
    {H:'Grupo',k:'itemGr',_g:$JsV.itmGr},
    {H:'Tipos',k:'itemId',fTag:function(L){
			td=$1.t('div');
      if(L.handInv=='Y'){ $1.t('span',{'class':'fa fa-truck',title:'Articulo maneja inventario'},td); }
			if(L.prdItem=='Y'){ $1.t('span',{'class':'iBg iBg_produccion',title:'Articulo de Producción'},td); }
			if(L.sellItem=='Y'){ $1.t('span',{'class':'fa fa-tags',title:'Articulo de Venta'},td); }
			if(L.buyItem=='Y'){ $1.t('span',{'class':'fa fa-shopping-cart',title:'Articulo de Compra'},td); }
			return td;
    }},
    ];
    $Doc.tbList({api:Api.Itm.pr+'profile',inputs:$1.G.filter(),view:'N',
    _fView:(L,td)=>{
      $1.t('a',{href:$M.to('itmProfile.view','itemId:'+L.itemId,'r'),textNode:'','class':'fa fa-eye'},td);
    },
    TD:Cols,
    tbExport:{ext:'xlsx'}
    },cont);
	},
	view:function(){
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
    $Api.get({f:Api.Itm.pr+'profile/view',inputs:'itemId='+Pa.itemId,loade:cont,func:function(L){
			$1.t('h3',{textNode:L.itemCode+': '+L.itemName},cont);
			var div=$1.t('div',0,cont);
			$1.t('img',{src:L.src1,style:'maxHeight:120px;'},div);
			Wins=$1.tabs([
				{textNode:'General',active:'Y',winClass:'gen','class':'fa fa-info'},
				{textNode:'Caracteristicas',winClass:'prp','class':'fa fa-bookmark'},
				{k:'plugsFiles',P:{tt:'itm',tr:Pa.itemId,bntUp:'N'}}
			],cont);
			LG=(L.LG)?L.LG:{};
			trsI=[
				{tds:[{textNode:''},{textNode:'Inventario'},{textNode:'Ventas'},{textNode:'Compras'}]},
				{tds:[{textNode:'Udm'},
					{textNode:_g(L.udm,Udm.O)},
					{textNode:_g(L.sellUdm,Udm.O)},
					{textNode:_g(L.buyUdm,Udm.O)}
				]},
				{tds:[{textNode:'Conversión'},
					{textNode:1+' '+_g(L.udm,Udm.O)},
					{textNode:(L.sellFactor*1)+' '+_g(L.udm,Udm.O)},
					{textNode:(L.buyFactor*1)+' '+_g(L.udm,Udm.O)}
				]},
			];
			longi=[{t:'Peso',k:'Weight'},{t:'Volumen',k:'Volume'},{t:'Ancho',k:'Width'},{t:'Alto',k:'Height'},{t:'Largo',k:'Length'}];
			for(var i in longi){ Lx=longi[i];
				trsI.push({tds:[{textNode:Lx.t},
					{textNode:(LG['i'+Lx.k]*1)+' '+_g(LG['i'+Lx.k+'Udm'],Udm.O,' ')},
					{textNode:(LG['s'+Lx.k]*1)+' '+_g(LG['s'+Lx.k+'Udm'],Udm.O,' ')},
					{textNode:(LG['p'+Lx.k]*1)+' '+_g(LG['p'+Lx.k+'Udm'],Udm.O,' ')},
				]});
			}
			$1.Tb.trsI(trsI,Wins.gen);
			trsI=[];
			if(L.Prp && !L.Prp.errNo){
				for(var k in $Tb.itmOitp){
					var LK=$Tb.itmOitp[k];
					trsI.push({tds:[
						{textNode:LK.v},
						{textNode:((L.Prp['prp'+LK.k])?L.Prp['prp'+LK.k]:'')}
					]});
				}
			}
			$1.Tb.trsI(trsI,Wins.prp);
		}});
	}
}
Itm.BC={
form:function(){
	cont =$M.Ht.cont; Pa=$M.read();
	var vPost='itemId='+Pa.itemId+'&';
	var h5=$1.t('h4',0,cont); var jsF='jsFields';
	var grC=$1.T.sel({opts:$JsV.itmBcGr,noBlank:1,sel:{'class':jsF,name:'grTypeId'}}); cont.appendChild(grC);
	grC.onchange=function(){ w(); }
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Grupo Códigos',aGo:'jsv.itmBcGr',Inode:grC},cont);
	var wTb=$1.t('div',0,cont);
	w();
	function w(){
		$Api.get({f:Api.Itm.b+'bc', loadVerif:!Pa.itemId, loade:wTb, inputs:vPost+$1.G.inputs(divL,jsF),
		func:function(Jr){
			h5.innerText=Jr.itemCode+') '+Jr.itemName;
			Jr.L=$js.sortNum(Jr.L,{k:'itemSize'});
			var tb=$1.T.table(['Talla','Código']); wTb.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i]; var k=L.itemSzId;
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.itemSize},tr);
				var td=$1.t('td',0,tr);
				$1.t('input',{type:'text','class':jsF,name:'TA['+k+']',value:L.barCode},td);
			}
		}});
	}
	var resp=$1.t('div',0,cont);
	var btnSend=$Api.send({PUT:Api.Itm.b+'bc', getInputs:function(){ return vPost+$1.G.inputs(cont,jsF); }, loade:resp, func:function(Jr2){
		$ps_DB.response(resp,Jr2);
	}});
	cont.appendChild(btnSend);
}
}

Itm.Txt={
line:function(tr,L,f){
	var code=(P.itemCode)?P.itemCode: ' Code N/D';
	if(L.itemSzId==0){ L.itemSzId=$V.uniqSize; }
	if(L.itemCode){
		var t=L.itemCode;
		var ta =(L.itemSzId && L.itemSzId!=$V.uniqSize)?'-'+_g(L.itemSzId,$V.grs1):'';
		t +=ta;
		T1=(L.itemCode.tagName)?L.itemCode:{textNode:t};
		var t1=$1.t('td',T1);
	}
	if(L.itemName){
		var t=L.itemName;
		var tta=(L.itemSzId && L.itemSzId!=$V.uniqSize)?' :'+_g(L.itemSzId,$V.grs1):'';
		t += tta;
		T1=(L.itemName.tagName)?L.itemName:{textNode:t};
		var t2=$1.t('td',T1);
	}
	else if(f=='tdTalla'){
		var t=(L.itemSzId && L.itemSzId!=$V.uniqSize)?_g(L.itemSzId,$V.grs1):'';
		T1={textNode:t};
		var t3=$1.t('td',T1);
	}
	switch(f){
		case 'tdTalla': tr.appendChild(t1); tr.appendChild(t2); tr.appendChild(t3); break;
		default: tr.appendChild(t1); tr.appendChild(t2); break;
	}
},
codeName:function(P){
	return Itm.Txt.code(P)+' '+Itm.Txt.name(P);
},
code:function(P){
	if(P.itemSzId==0){ P.itemSzId=$V.uniqSize; }
	var t=(P.itemCode)?P.itemCode: '';
	t +=(P.itemSzId && P.itemSzId!=$V.uniqSize)?'-'+_g(P.itemSzId,$V.grs1):'';
	return t;
},
name:function(P){
	if(P.itemSzId==0){ P.itemSzId=$V.uniqSize; }
	var t=(P.itemName)?P.itemName: '';
	t +=(P.itemSzId && P.itemSzId!=$V.uniqSize)?' :'+_g(P.itemSzId,$V.grs1,''):'';
	return t;

},
size:function(P){
	var k=(typeof(P)=='object')?P.itemSzId:P;
	if(k==0){ k=$V.uniqSize; }
	var t =_g(k,$V.grs1);
	return t;
},
imgSrc:function(P,P2){ var P2=(P2)?P2:{};
	var img=(P.src1)?P.src1:$V.itmImageUndefined;
	if(P2.srcType){ img = P[P2.srcType];/* srcA */ }
	if(img==null || img==undefined){ img ='http://static1.admsistems.com/_img/itmImgNot.jpg'; }
	return img;
}
}

Itm.Sub={ /* subproductos */
	get:function(){
		var cont=$M.Ht.cont;
		$Api.get({f:Api.Itm.b+'sub',inputs:$1.G.filter(),loade:cont,func:function(Jr){
			var tb=$1.T.table(['','Id','Subproducto'],0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ var L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.T.btnFa({fa:'fa-pencil',title:'Modificar',P:L,func:function(T){ Itm.Sub.form(T.P) }},td);
				$1.t('td',{textNode:L.itemSzId},tr);
				$1.t('td',{textNode:L.itemSize},tr);
			}
		}});
	},
	form:function(P){
		var P=(P)?P:{};
		var wrap=$1.t('div');
		var jsF=$Api.JS.cls;
		$Api.get({f:Api.Itm.b+'sub/form',inputs:'itemSzId='+P.itemSzId,loadVerif:!P.itemSzId, loade:wrap,func:function(Jr){
			var divL=$1.T.divL({divLine:1,wxn:'wrapx1',L:'Subproducto',I:{tag:'input',type:'text','class':jsF,name:'itemSize',placeholder:'38,40,M,XL,Azul...',value:Jr.itemSize}},wrap);
			var hid=$1.t('input',{type:'hidden',name:'itemSzId','class':jsF},wrap);
			var resp=$1.t('div',0,wrap);
			var tS={PUT:Api.Itm.b+'sub',jsBody:wrap,func:function(Jr2,o){
				$Api.resp(resp,Jr2);
				if(o && o.k){ hid.value=o.k;
					$js._upd(o,$V.grs1,'v');
				}
			}};
			if(P.itemSzId){
				hid.value=itemSzId=P.itemSzId;
			}
			$Api.send(tS,wrap);
		}});
		$1.Win.open(wrap,{winTitle:'Subproducto'});
	}
}
Itm.Sub.Gr={ /* subproductos */
	get:function(){
		var cont=$M.Ht.cont;
		$Api.get({f:Api.Itm.b+'sub/gr',inputs:$1.G.filter(),loade:cont,func:function(Jr){
			var tb=$1.T.table(['','ID','Nombre Grupo'],0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ var L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.T.btnFa({fa:'fa-pencil',title:'Modificar',P:L,func:function(T){ Itm.Sub.Gr.form(T.P) }},td);
				$1.t('td',{textNode:L.grsId},tr);
				$1.t('td',{textNode:L.grsName},tr);
			}
		}});
	},
	form:function(P){
		var P=(P)?P:{};
		var wrap=$1.t('div');
		var jsF=$Api.JS.cls;
		$Api.get({f:Api.Itm.b+'sub/gr/form',inputs:'grsId='+P.grsId,loadVerif:!P.grsId, loade:wrap,func:function(Jr){
			var divL=$1.T.divL({divLine:1,wxn:'wrapx1',L:'Nombre',I:{tag:'input',type:'text','class':jsF,name:'grsName',placeholder:'36-43, S-XL.',value:Jr.grsName}},wrap);
			var hid=$1.t('input',{type:'hidden',name:'grsId','class':jsF},wrap);
			var resp=$1.t('div',0,wrap);
			var tb=$1.T.table(['Subproducto'],0,wrap);
			var tbody=$1.t('tbody',0,tb);
			for(var i in $V.grs1){
				if(i==$V.uniqSize){ continue; }
				var L=(Jr && Jr.L && Jr.L[i])?Jr.L[i]:false;
				var tr=$1.t('tr',{'class':$Api.JS.clsL},tbody);
				var td=$1.t('td',0,tr);
				$1.T.check({t:_g(i,$V.grs1),'class':$Api.JS.clsLN,name:'assig',AJs:{itemSzId:i},checked:(L)},td);
			}
			var tS={PUT:Api.Itm.b+'sub/gr',jsBody:wrap,func:function(Jr2,o){
				$Api.resp(resp,Jr2);
				if(o && o.k){ hid.value=o.k;
					$js._upd(o,$V.ogrs,'v');
				}
			}};
			if(P.grsId){
				hid.value=P.grsId;
			}
			$Api.send(tS,wrap);
		}});
		$1.Win.open(wrap,{winTitle:'Grupo subproductos'});
	}
}

var Che={};
var Drw ={
docLineItemSz:function(tBody,P){//addLine on Order
	/*
	handSize=Y, debe venir con grsId para obtener tallas
	itemSz=Y, se obtiene cuando se lee por tallas
	*/
	var JrS=P.JrS;
	var itemSz=(P.JrS.itemSz=='Y');//leyendo desde getSizes->
	var NohandSize=(P.JrS.handSize=='N');
	if(NohandSize){ P.Ds={T:{}}; P.Ds.T[$V.uniqSize]=1; }//sin talla, cargar unique
	else if(itemSz){ P.Ds={T:{}}; P.Ds.T[P.JrS.itemSzId]=1; } //talla simple
	if(P.winOpen!='N'){
		if(NohandSize || itemSz){
			P=mkL(P);
			if(P.func){ P.func(P,tBody); }
			else if(P.trLine=='table'){ Drw.itemSzTb(tBody,P); }
			else{ Drw.itemSzTr(tBody,P); }
		}
		else{ Itm.winAdd({func:function(Ds){
			P.Ds=Ds; P=mkL(P);
			if(P.func){ P.func(P,tBody); }
			else if(P.trLine=='table'){ Drw.itemSzTb(tBody,P) }
			else{ Drw.itemSzTr(tBody,P) }
		}},P.JrS);
		}
	}
	else{
		if(P.func){ P.func(P,tBody); }
		else if(P.trLine=='table'){ Drw.itemSzTb(tBody,P) }
		else{ Drw.itemSzTr(tBody,P); }
	}
	var n=0; P.L=[];
	function mkL(P){
		var Ds=P.Ds;
		if(!P.L){ P.L=[]; } if(!n){ n=0; }
		for(var ta in Ds.T){ P.L[n]={};
			for(var i in JrS){ P.L[n][i]= JrS[i]; }
			if(Ds.T[ta].quantity){ P.L[n].quantity = Ds.T[ta].quantity; }
			else if(Ds.T[ta]){ P.L[n].quantity = Ds.T[ta]; }
			else{ P.L[n].quantity=1; }
			P.L[n].itemSzId=ta;
			P.L[n].itemSize=_g(ta,$V.grs1);
			n++;
		}
		P.Ds=Ds;
		return P;
	}
},
itemReader:function(P1,P){
	var tBody=P1.tBody; var cont=P1.cont;
	if(P.func=='default'){
		P.func=Drw.docLineItemSz;
		for(var i in P.funcPars){ P[i]=P.funcPars[i]; }
	}
	var oB={item:'Producto',itemSize:'Talla',barCode:'Código de Barras'};
	if(P1.noSelBy){
		if(P1.noSelBy.match(/itemCode/)){ delete(oB.item); }
		if(P1.noSelBy.match(/itemSize/)){ delete(oB.itemSize); }
		if(P1.noSelBy.match(/barCode/)){ delete(oB.itemSize); }
	}
	var divL =$1.T.divL({divLine:1, wxn:'wrapx8',supText:'Por',I:{tag:'select',sel:{'class':'__sel'},opts:oB,noBlank:1}},cont);
	var sel=$1.q('.__sel',cont);
	sel.onchange = function(){$Sea.addInputs='';
		if(this.value=='barCode'){ sea.style.display='none'; bc.style.display='block'; }
		else{ sea.style.display='block'; bc.style.display='none';
			if(this.value=='itemSize'){ $Sea.addInputs='viewType=itemSize'; }
		}
	}
	if(sel.value=='itemSize'){ $Sea.addInputs='viewType=itemSize'; }
	var inputs='fields=I.sellPrice,I.grsId,I.sellUdm';
	inputs +=(P1.fields)?','+P1.fields:'';
	inputs +=(P1.wh)?'&'+P1.wh:'';
	var sea=$Sea.input(cont,{api:'itemData',subText:'Busque para agregar un producto...',inputs:inputs,inpBlank:true, funcAddInputs:P.funcAddInputs, func:function(Jr,inp){
			P.JrS=Jr;//trSize,jsF,noFields{}
			P.func(tBody,P);
			//Drw.docLineItemSz(tBody,{trSize:'Y',jsF:jsF,n:P.n,JrS:Jr, noFields:{price:'N',priceList:'N'}});
	}});
	var bc=Barc.input({box:'N', func:function(Jr,boxNum){
		P.JrS=Jr;
		P.func(tBody,P);
	}});
	bc.style.display='none';
	$1.T.divL({wxn:'wrapx8_1',Inode:sea},divL);
	$1.T.divL({wxn:'wrapx8_1',Inode:bc},divL);
},
itemSzTr:function(tBody,P){//tr para cada itemSize
		//#,itemCode, itemName, itemSz q, udm, btns
	L=P.JrS; Ds=P.Ds;
	var noFields=(P.noFields)?P.noFields:{};
	var Fields=(P.Fields)?P.Fields:{};
	var Dsb=(P.Disabled)?P.Disabled:{};
	var tbPare=tBody.parentNode;
	var jsF= (P.jsF)?P.jsF:'jsFields';
	if(L.T && !Ds){ Ds= {T:L.T}; }
	else if(L && !Ds){ Ds={T:{}};
		Ds.T[L.itemSzId]=L;
	}
	if(!Ds){ Ds={T:{}}; }
	var n=1;
	for(var ta in Ds.T){
		var ln= 'L['+P.n+'_'+n+']'; n++;
		var vPost ='&'+ln+'[itemSzId]='+ta;
		var quantity=(Ds.T[ta])?Ds.T[ta]:L.quantity;
		quantity=(Ds.T[ta] && Ds.T[ta].quantity)?Ds.T[ta].quantity:quantity;
		var tr=$1.t('tr',{'class':'__tdNumGroup'},tBody);
		$1.t('td',{textNode:P.n,'class':'_noHidden'},tr);
		var td=$1.t('td',{'class':'_noHidden',textNode:L.itemCode},tr);
		var td=$1.t('td',{textNode:L.itemName},tr);
		var td=$1.t('td',{textNode:_g(ta,$V.grs1)},tr);
		var tdt=$1.t('td',0,tr);
		var inp=$1.t('input',{type:'number',inputmode:'numeric',min:0,value:quantity,style:'width:3.25rem; font-size:0.8rem;','class':jsF+' __tdNum',name:ln+'[quantity]'},tdt);
		inp.onkeyup=function(){ $Tol.tbSum(tbPare); }
		inp.onchange=function(){ $Tol.tbSum(tbPare); }
		var val=(L.sellPrice)?L.sellPrice:L.price;
		var priceList=(L.sellPrice)?L.sellPrice:L.priceList;
		//cols
		if(!noFields.udm){
			var udm=(L.sellUdm)?L.sellUdm:((L.udm)?L.udm:'?');
			$1.t('td',{textNode:udm},tr);
		}
		if(!noFields.price){
			var kv='price';
			if(L.curr && L.curr!=$0s.currDefault){ val=L.priceME; kv='priceME'; }
			var td=$1.t('td',{style:'width:5rem;'},tr);
			var inp=$1.t('input',{type:'text','class':jsF+' __tdNum2',numberformat:'mil',style:'width:90%;',name:ln+'[price]',value:val, onkeychange:function(){ $Tol.tbSum(tbPare); }},td);
			if(Dsb.price=='Y'){ inp.setAttribute('disabled','disabled'); }
		}
		if(Fields.disc){
			var td=$1.t('td',{style:'width:5rem;'},tr);
			var inp=$1.t('input',{type:'number',inputmode:'numeric',min:0,max:100,'class':jsF+' __tdNumDiscVar',name:ln+'[disc]',value:L.disc, onkeychange:function(){ $Tol.tbSum(tbPare); }},td);
		}

		if(!noFields.price){
			var tdTotal=$1.t('td',{'class':'__tdTotal',vformat:'money'},tr);
		}
		var td=$1.t('td',{style:'width:3rem;','class':'_noHidden'},tr);
		td.visible='Y';
		var btn=$1.T.btnFa({fa:'fa_close',textNode:' Quitar', name:ln, func:function(T){
			var tr=T.parentNode.parentNode;
			var tds=$1.q('td',tr,'all');
			var ttd=T.parentNode;//td
			for(var i3=0; i3<tds.length;i3++){
				if(ttd.visible=='Y' && !(tds[i3].classList.contains('_noHidden'))){ tds[i3].style.visibility='hidden'; }
				else{ tds[i3].style.visibility=''; }
			}
			if(ttd.visible=='Y'){
				if(tdTotal){ tdTotal.classList.add('__tdTotalNoCount'); }
				T.innerText= ' Restablecer';
				T.classList.replace('fa_close','fa_arrowBack');
				ttd.visible='N';
				$1.t('input',{type:'hidden',value:'Y',name:T.name+'[delete]','class':jsF+' _inputDelete'},T.parentNode);
			}
			else{
				ttd.visible='Y';
				T.innerText=' Quitar';
				T.classList.replace('fa_arrowBack','fa_close');
				if(tdTotal){ tdTotal.classList.remove('__tdTotalNoCount'); }
				$1.delet($1.q('._inputDelete',ttd));
			}
				$Tol.tbSum(tbPare);
			}
		},td);
		if(!noFields.priceList){ vPost += '&'+ln+'[priceList]='+priceList; }
		var inp=$1.t('input',{type:'hidden','class':jsF,name:ln+'[itemId]',value:L.itemId,O:{vPost:vPost}},td);
	}
	$Tol.tbSum(tbPare);
},
itemSzTb(tBody,P){
	L=P.JrS; Ds=P.Ds;
	var noFields=(P.noFields)?P.noFields:{};
	var Fields=(P.Fields)?P.Fields:{};
	var Dsb=(P.Disabled)?P.Disabled:{};
	var tbPare=tBody.parentNode;
	var tr=$1.t('tr',{'class':'__tdNumGroup'},tBody);
	var jsF= (P.jsF)?P.jsF:'jsFields';
	$1.t('td',{textNode:P.n,'class':'_noHidden'},tr);
	var td=$1.t('td',{'class':'_noHidden'},tr);
	$1.t('b',{textNode:L.itemCode+') '},td);
	$1.t('span',{textNode:L.itemName},td);
	var tb=$1.t('table',{'class':'tableSizes'},td);
	var tH=$1.t('thead',0,tb); var tr0=$1.t('tr',0,tH);
	var tB=$1.t('tbody',0,tb); var tr1=$1.t('tr',0,tB);
	if(L.T && !Ds){ Ds= {T:L.T}; }
	if(!Ds){ Ds={T:{}}; }
	var total=0;
	var val=(L.sellPrice)?L.sellPrice:L.price;
	var priceList=(L.sellPrice)?L.sellPrice:L.priceList;
	var ln='L['+P.n+']';//L{price, T:{itemId,priceList,itemSzId,qua }
	for(var ta in Ds.T){
		var lnt= ln+'[T]['+ta+']';
		$1.t('td',{textNode:_g(ta,$V.grs1)},tr0);
		var tdt=$1.t('td',0,tr1);
		var vPost=lnt+'[itemId]='+L.itemId+'&'+lnt+'[itemSzId]='+ta;
		if(!noFields.priceList){ vPost += '&'+lnt+'[priceList]='+priceList; }
		var inp=$1.t('input',{type:'number',inputmode:'numeric',min:0,value:Ds.T[ta],style:'width:3.25rem; font-size:0.8rem;','class':jsF+' __tdNum',name:lnt+'[quantity]',O:{vPost:vPost}},tdt);
		total+=Ds.T[ta]*1;
		inp.onkeyup=function(){ $Tol.tbSum(tbPare); }
		inp.onchange=function(){ $Tol.tbSum(tbPare); }
	}
	//cols
	if(!noFields.udm){
		var udm=(L.sellUdm)?L.sellUdm:((L.udm)?L.udm:'?');
		$1.t('td',{textNode:udm},tr);
	}
	if(!noFields.price){
		var kv='price';
		if(L.curr && L.curr!=$0s.currDefault){ val=L.priceME; kv='priceME'; }
		var valto=val*total;
		var td=$1.t('td',{style:'width:5rem;'},tr);
		var inp=$1.t('input',{type:'text','class':jsF+' __tdNum2',numberformat:'mil',style:'width:90%;',name:ln+'[price]',value:val, onkeychange:function(){ $Tol.tbSum(tbPare); }},td);
		if(Dsb.price=='Y'){ inp.setAttribute('disabled','disabled'); }
		inp.onchange=function(){ $Tol.tbSum(tbPare); }
	}
	if(Fields.disc){
		var valto=val*total;
		var td=$1.t('td',{style:'width:5rem;'},tr);
		var inp=$1.t('input',{type:'number',inputmode:'numeric',min:0,max:100,'class':jsF+' __tdNumDiscVar',name:ln+'[disc]',value:L.disc, onkeychange:function(){ $Tol.tbSum(tbPare); }},td);
	}
	$1.t('td',{textNode:total,'class':'__tdTotalNum'},tr);
	if(!noFields.price){
		var tdTotal=$1.t('td',{textNode:$Str.money({value:valto,curr:L.curr}),'class':'__tdTotal',vformat:'money'},tr);
	}
	var td=$1.t('td',{style:'width:3rem;','class':'_noHidden'},tr);
	td.visible='Y';
	var btn=$1.T.btnFa({fa:'fa_close',textNode:' Quitar', func:function(T){
		var tds=$1.q('td',tr,'all');
		var ttd=T.parentNode;//td
		for(var i3=0; i3<tds.length;i3++){
			if(ttd.visible=='Y' && !(tds[i3].classList.contains('_noHidden'))){ tds[i3].style.visibility='hidden'; }
			else{ tds[i3].style.visibility=''; }
		}
		if(ttd.visible=='Y'){
			if(tdTotal){ tdTotal.classList.add('__tdTotalNoCount'); }
			T.innerText= ' Restablecer';
			T.classList.replace('fa_close','fa_arrowBack');
			ttd.visible='N';
			$1.t('input',{type:'hidden',value:'Y',name:ln+'[delete]','class':jsF+' _inputDelete'},T.parentNode);
		}
		else{
			ttd.visible='Y';
			T.innerText=' Quitar';
			T.classList.replace('fa_arrowBack','fa_close');
			if(tdTotal){ tdTotal.classList.remove('__tdTotalNoCount'); }
			$1.delet($1.q('._inputDelete',ttd));
		}
			$Tol.tbSum(tbPare);
		}
	},td);
		$Tol.tbSum(tbPare);
}
}

Itm.winAdd=function(P,L){ L=(L)?L:{};
	var wrap=$1.t('div'); var jsF='jsFields';
	var Ta=(L.grsId)?$V.grs2[L.grsId]:{};
	var tb=$1.T.table(['Talla','Cant.','Talla','Cant.','Talla','Cant.']); wrap.appendChild(tb);
	var tBody=$1.t('tbody',0,tb);
	var tds=0;
	for(var ta in Ta){
		if(tds==0 || tds%3==0){ var tr=$1.t('tr',0,tBody); } tds++;
		$1.t('td',{textNode:Ta[ta],style:'backgroundColor:#EEE;'},tr);
		var td=$1.t('td',0,tr);
		var inp=$1.t('input',{type:'number',inputmode:'numeric','class':jsF+' _tdTa __tbColNums','tbColNum':1,name:'',style:'width:4rem;',onkeychange:function(){ $Tol.tbSum(tb); }},td);
		inp.ta=ta;
	}
	var reqPrice=(P.priceDefiner!='N');
	if(reqPrice){
	var tr=$1.t('tr',0,tBody);
	$1.t('td',{colspan:2,textNode:'Cant. total'},tr);
	$1.t('td',{colspan:4,'class':'__tbColNumTotal1'},tr);
	var tr=$1.t('tr',0,tBody);
	$1.t('td',{colspan:2,textNode:'Precio'},tr);
	var td=$1.t('td',{colspan:4},tr);
	var price=(L.sellPrice)?L.sellPrice:L.buyPrice;
	$1.t('input',{type:'text','class':'inputPrice divLine',value:price,numberformat:'mil'},td);
		var tr=$1.t('tr',0,tBody);
	$1.t('td',{colspan:2,textNode:'Histórico',expTitle:'Último precio de venta relacionado al cliente.'},tr);
	var val=(L.lastSellPriceCard==-1)?'Error':$Str.money(L.lastSellPriceCard);
	val=(L.lastSellPriceCard==0)?'Primera Vez':val;
	var td=$1.t('td',{colspan:4,textNode:val},tr);
	}
	var resp=$1.t('p',0,wrap);
	var btn=$1.T.btnSend({textNode:'Añadir Lineas',func:function(){
		$1.clear(resp);
		var err=false; var errText='';
		var Ds={total:0,T:{}};
		var tas=$1.q('._tdTa',tb,'all');
		for(var i=0; i<tas.length;i++){
			if(tas[i].value!=''){ var nv=tas[i].value*1;
				Ds.T[tas[i].ta] = nv; Ds.total +=nv;
			}
		}
		var price=$1.q('.inputPrice',wrap);
		price=(price && price.value)?$Str.toNumber(price.value):0;
		if(Ds.total==0 && P.can0!='Y'){ $Api.resp(resp,{errNo:3,text:'No se han definido cantidades por Talla. ['+P.can0+' | '+Ds.total+']'}); }
		else if(reqPrice && price<=0){ $Api.resp(resp,{errNo:3,text:'Defina un precio para continuar'}); }
		else{
			L.priceDefine=price;
			if(P.func){ P.func(Ds,L); }
			$1.delet(wrapBk);
		}
	}}); wrap.appendChild(btn);
	var wrapBk=$1.Win.open(wrap,{winSize:'full',onBody:1,winTitle:'Definir Cantidad por Tallas (2)'});
}

Itm.winSizes=function(L,P){ Itm.Fx.winSizes(); }

var $BRead={
c:{},
ex:function(v){
	if($BRead.c[v]){ return {errNo:1,text:'El código ['+v+'] ya ha sido capturado.'}; }
	else{ $BRead.c[v]=v; return false; }
},
inp:function(func,P,pare){
	var P=(P)?P:{};
	$BRead.c={};
	var divL=$1.T.divL({divLine:1,wxn:'wrapx2',I:{tag:'input',type:'text',placeholder:'Digite el código y presione enter...'}},pare);
	inp=$1.q('input',divL);
	inp.onkeypress = function(ev){ This=this;
		$js.isKey(ev,'enter',{func:function(){//onRead
			var R={};
			if(P.ex){ R.ex=$BRead.ex(This.value); }
			func(This.value,R); This.value='';
		}});
	}
}
}

var Barc={
input:function(P){
	var box=$1.t('input',{type:'text',id:'__invInpBoxData','class':'iBg iBg_recibir',placeholder:'1,A4'});
var liner=$1.t('input',{type:'text','class':'iBg iBg_barcode',id:'__invInpBarCode',placeholder:'Lea o digité el código'});
	if(P.box!='N'){
		var divL= $1.T.divL({divLine:1,wxn:'wrapxauto',wxT:{style:'width:5rem;'},Inode:box});
		$1.T.divL({wxn:'wrapxauto',wxT:{style:'min-width:70%;'},Inode:liner},divL);
	}
	else{
		var divL= $1.T.divL({divLine:1, supText:'Código de Barras...',wxn:'wrapx1',Inode:liner});
	}
	inp= $1.q('#__invInpBarCode',divL);
	inp.onkeyup = function(ev){ This=this;
		$js.isKey(ev,'enter',{func:function(){//onRead
			Barc.get(This.value,P); This.value='';
		}});
	}
	return divL;
},
get:function(barCode,P){ P=(P)?P:{};
	boxNum='';
	var boxN=$1.q('#__invInpBoxData'); if(boxN){ boxNum=boxN.value; }
	if(!$Tb.itm_bar1){ $Tb.itm_bar1 ={}; }
	if($Tb.itm_bar1[barCode]){
		if(P.func){ P.func($Tb.itm_bar1[barCode],boxNum); }
	}
	else{
	$Api.get({f:Api.Itm.b+'bc/one', inputs:'barCode='+barCode, func:function(Jr){
		if(Jr.errNo){ $1.Win.message(Jr); }
		else{
			$Tb.itm_bar1[barCode] = Jr;
			if(P.func){ P.func($Tb.itm_bar1[barCode],boxNum); }
		}
	}});
	}
},
getData:function(cont){
	var l=$1.q('._bcLine',cont,'all'); var d=[];
	for(var i=0; i<l.length; i++){
		var L2=l[i].js;
		L2.quantity=l[i].value;
		d[i]=L2;
	}
	return d;
}
}

Barc.stickFromDoc = function(P){
	$Api.get({f:Api.Barc.a+'stickFromDoc', inputs:'docType='+P.docType+'&docEntry='+P.docEntry, func:function(Jr){
		var wrap = $1.t('div');
		var tb=$1.T.table(['barcode','itemCode','itemName','itemSize','quantity']);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.barCode},tr);
			$1.t('td',{textNode:L.itemCode},tr);
			$1.t('td',{textNode:L.itemName},tr);
			$1.t('td',{textNode:L.itemSize},tr);
			$1.t('td',{textNode:L.quantity},tr);
		}
		tb=$1.T.tbExport(tb,{print:1,fileName:'barcodes.txt'});
		wrap.appendChild(tb);
		var win=$1.Win.open(wrap,{winTitle:'Matriz de códigos del documento',onBody:1});
	}});
}

Barc.Draw = {
tbDetail:function(O,boxNum,P){//genera tabla item,itemSize...
	var k ='_'+O.itemCode;
	P=(P)?P:{};
	if(boxNum){

		if(!isNaN(boxNum)){ boxNum = boxNum*1; }

		var k =boxNum+'_'+O.itemCode;

	}
	var ta = O.itemSzId;
	Che.T[ta] = O.itemSize;
	if(!Che.t[k]){ Che.t[k] = k; Che.n++; n = Che.n;

		n=k;

		Che.L[n] = {}; for(var ik in O){ Che.L[n][ik] = O[ik]; }

		Che.L[n].detail = boxNum;

		Che.L[n]['T'] = {};

	}
	n = Che.n; n=k;
	if(!Che.L[n]['T'][ta]){Che.L[n]['T'][ta] = {quantity:0, reads:0 }; }
	Che.L[n]['T'][ta].quantity = Che.L[n]['T'][ta].quantity*1+1;
	Che.L[n]['T'][ta].reads += 1;
	(Che.L).sort(function(a,b){

		if(!isNaN(a.detail) && !isNaN(b.detail)){

			if(a.detail*1<b.detail*1){ return -1; }

			if(a.detail*1>b.detail*1){ return 1; }

		}

	});
	var cont = $1.q('#_tableWrap',$M.Ht.cont); $1.clear(cont);
	var tb=$1.t('table',{'class':'table_zh'},cont);
	var tHead =$1.t('thead',0,tb);
	var tr=$1.t('tr',0,tHead);
	$1.t('td',{textNode:'Det.'},tr);
	$1.t('td',{textNode:'Código'},tr);
	$1.t('td',{textNode:'Nombre'},tr);
	for(var t in Che.T){ $1.t('td',{textNode:Che.T[t]},tr); }
	$1.t('td',{textNode:'Total'},tr);
	var tBody =$1.t('tbody',0,tb);
	for(var i in Che.L){ var L=Che.L[i];
		var tr=$1.t('tr',0,tBody);
		$1.t('td',{textNode:L.detail},tr);
		$1.t('td',{textNode:L.itemCode},tr);
		$1.t('td',{textNode:L.itemName},tr);
		var total=0;
		for(var t in Che.T){
			var ttext=(L.T[t])?L.T[t].quantity*1:'';
			var reads=(L.T[t])?L.T[t].reads:'';
			var tsi=t;
			var _i=L.itemId; var _i2=t;
			total += ttext*1;
			var td= $1.t('td',0,tr);
			if(ttext!=''){
			var inp=$1.t('input',{type:'number',inputmode:'numeric',min:0,'class':'_bcLine __trLine __itemTd',style:'width:3rem;',value:ttext, L:{i:i,ta:tsi,t:t} });
			inp.js={detail:L.detail,itemId:L.itemId,itemSzId:t,reads:reads};
			inp.D={itemCode:L.itemCode,itemName:L.itemName};
			inp.onkeyup = function(){ trUpd(this); if(P.inpChange){ P.inpChange(this); } }
			inp.onchange = function(){ trUpd(this); if(P.inpChange){ P.inpChange(this); } }
			td.appendChild(inp);
			var del=$1.t('button',{'class':'fa faBtn fa_close',title:'Eliminar cantidades',tabindex:'-1'},td);
			del.onclick=function(){ tdPare=this.parentNode; inpT=$1.q('input',tdPare);
					$1.Win.confirm({text:'Se eliminar las cantidades, no se puede recuperar esta información', func:function(){
					var i3=inpT.L.i; var i4=inpT.L.t; inpT.value=0;
					inpT.noReadAndDelete='Y';//usar para no sumar y luego eliminar
					Che.L[i3].T[i4].quantity=0;
					if(P.inpChange){ P.inpChange(this); }
					}}); }
			}
		}
		$1.t('td',{textNode:total,'class':'__trTotal'},tr);
	}
	function trUpd(T){

		var i =T.L.i; var ta=T.L.ta;

		Che.L[i]['T'][ta].quantity = T.value*1;

		$Tol.sumTotal('.__trLine','.__trTotal',T.parentNode.parentNode);

	}
}
}

$M.li['barcode.stickers'] = {t:'Generar Etiquetas de Producto',kau:'public', func:function(){
	Che.L=[]; Che.T=[];
	var tb=$1.T.table(['Código','Grupo Código']);
	var tr0=$1.q('thead tr',tb);
	var tBody=$1.t('tbody',0,tb);
	var jsF='jsFields'; var n=0;
	$M.Ht.ini({fOpen:'Y',
	f:function(wrap){
		var inpSea = $Sea.input(null,{api:'itemData',inputs:'fields=I.grsId',placeholder:'Nombre o código de artículo...',func:function(Jq){
			var id1 ='__trTaStickers';
			var grs2=$V.grs2[Jq.grsId];//tallas
			for(var i in grs2){ Che.T[i] = grs2[i]; }
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:Jq.itemCode},tr);
			var td=$1.t('td',0,tr); var ln='LN['+n+']'; n++;
			var sel=$1.T.sel({opts:$V.bar2,noBlank:1,sel:{'class':jsF,name:ln+'[grTypeId]',O:{vPost:ln+'[itemId]='+Jq.itemId}}});
			td.appendChild(sel);
			for(var i in Che.T){
				var td=$1.t('td',0,tr);
				if(grs2[i]){
				$1.t('div',{textNode:Che.T[i]},td);
				$1.t('input',{type:'number',min:0,inputmode:'numeric','class':jsF,name:ln+'['+i+']',style:'width:3rem;'},td);
				}
			}
	}});
	var divL=$1.T.divL({divLine:1, wxn:'wrapx1',L:{textNode:'Buscar...'},Inode:inpSea},wrap);
	},
	g:function(cont){
		cont.appendChild(tb);
		var wList=$1.t('div',{id:'__wList'},cont);
		$Api.send({textNode:'Generar Etiquetas',POST:Api.Itm.b+'bc/labels', getInputs:function(){ return $1.G.inputs(tb,jsF); },loade:wList, errWrap:wList, func:function(Jr2){
			var tb=$1.T.table(['barcode','itemCode','itemName','itemSize','quantity']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr2){ var L=Jr2[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.barCode},tr);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:L.itemSize},tr);
				$1.t('td',{textNode:L.quantity},tr);
			}
			tb=$1.T.tbExport(tb,{print:false,fileName:'barcodes',ext:'txt'});
			wList.appendChild(tb);
		}
		},cont);
	}});
}};

$M.kauAssg('itm',[
	{k:'itm.p',t:'Articulos'},
	{k:'itm.mp',t:'Materia Prima'},
	{k:'itm.se',t:'Semielaborados'},
	{k:'itm.chr.basic',t:'Características de Artículo'},
	{k:'itfDT.ivtItm',t:'Actualizar Información de Artículos'},
	//costes
	{k:'ipc',t:'Costes de Articulos'},
	{k:'ipc.mpDiff',t:'Actualizar Costes en Ficha de Producto'}
]);

$M.liAdd('itm',[
	{_lineText:'Articulos'},
	{k:'itmProfile',t:'Info Productos', kau:'public',ini:{f:'itmProfile',gyp:Itm.Profile.get }},
	{k:'itmProfile.view',noTitle:'Y',t:'Info Producto', kau:'public',ini:{g:Itm.Profile.view }},

	{k:'itm.p',t:'Productos', kau:'itm.p',ini:{f:'itmPget', btnGo:'itm.p.form',gyp:Itm.get }},
	{k:'itm.p.form',t:'Formulario de Producto', kau:'itm.p',ini:{g:Itm.form}},
	{k:'itm.mp',t:'Materia Prima', kau:'itm.mp',mdlActive:'wma',ini:{f:'itmPget', btnGo:'itm.mp.form',gyp:Itm.get }},
	{k:'itm.mp.form',t:'Formulario de Materia Prima', kau:'itm.mp',mdlActive:'wma',ini:{g:Itm.form}},
	{k:'itm.se',t:'Semielaborados', kau:'itm.se',mdlActive:'wma',ini:{f:'itmPget', btnGo:'itm.se.form', gyp:Itm.get }},
	{k:'itm.se.form',t:'Formulario de Semielaborado', kau:'itm.se',mdlActive:'wma',ini:{g:Itm.form}},
	{k:'itm.BC.form',t:'Códigos de Barras del Producto', kau:'itm.p', mdlActive:'ivt',ini:{g:Itm.BC.form}},

	{_lineText:'Subproductos'},
	{k:'itmSub',t:'Subproductos', kau:'itm.p',mdlActive:'ivtSubItems',ini:{f:'itmSub', fNew: Itm.Sub.form,gyp:function(){ Itm.Sub.get(); } }},
	{k:'itmSub.gr',t:'Grupo Subproductos',kau:'itm.p',mdlActive:'ivtSubItems',ini:{fNew:Itm.Sub.Gr.form,gyp:function(){ Itm.Sub.Gr.get(); } }},
	{_lineText:'Costos'},

	{k:'ipc',t:'Ficha de Costos',kau:'ipc',mdlActive:'wma',func:function(){ $M.Ht.ini({f:'itm.cost', gyp:function(){ Itm.Cost.get(); }}); }},
	{k:'ipc.form',t:'Coste de Articulo (Ficha)',kau:'ipc',mdlActive:'wma',ini:{g:Itm.Cost.form}},
	{k:'ipc.mpDiff',t:'Actualizar Diferencias Costo Componentes',kau:'ipc.mpDiff',mdlActive:'wma',ini:{f:'itmCostmpDiff',gyp:function(){ Itm.Cost.mpDiff(); }}},
	{k:'ipc.log2',t:'Log de Modificacines',kau:'ipc',mdlActive:'wma',ini:{f:'itmCostLog2',gyp:function(){ Itm.Cost.log2(); }}}
],{});

$M.liAdd('itm',[{_lineText:'_TB'}]);
$Tb._i({kMdl:'itm',kObj:'itmOitp',mdlActive:'itmItp',
liTxtG:'Propiedades Articulos',liTxtF:'Propiedad Articulo (Form)',Cols:[
{t:'Nombre',k:'name',divLine:1,wxn:'wrapx4',T:{tag:'input'}}
]});
$M.liAdd('itm',[{_lineText:'_JSV'}]);
$JsV._i({kMdl:'itm',mdl:'itm',kObj:'itmGr',liTxtG:'Grupo Articulos',liTxtF:'Grupo de Articulo (Form)',Cols:[
{t:'Nombre',k:'value',T:{tag:'input'}},
{t:'Tipo Articulo',k:'prp1',_V:'itmType',T:{tag:'select',opts:$V.itmType}}
]});
$JsV._i({kMdl:'itm',kObj:'itmBcGr',mdl:'itm',liTxtG:'Grupo Código Barras',liTxtF:'Grupo Código Barras (Form)',Cols:[
{t:'Nombre',k:'value',T:{tag:'input'}}
]});

$M.liAdd('ivt',[
{k:'itfDT.ivtItm',t:'Actualizar Articulos', kau:'itfDT.ivtItm',mdlActive:'itfImp', func:function(){
	$M.Ht.ini({g:function(){
		Itf.DT.form({api:Api.Ivt.b+'dt/ivtItm',helpFie:'Y',fileName:'Definir Articulos',
		Fie:[
			{t:'itemCode',d:'Código de Artículo',b:'Y',req:'Y',len:[1,20]},
			{t:'itemType',d:'Tipo Articulo',opts:$V.itmType,optsCsv:1},
			{t:'buyItem',d:'Articulo de Compra.',opts:$V.YN,optsCsv:1},
			{t:'sellItem',d:'Articulo de Venta.',opts:$V.YN,optsCsv:1},
			{t:'handInv',d:'Maneja Inventario.',opts:$V.YN,optsCsv:1},
			{t:'buyPrice',d:'Precio de Compra',xformat:'number'},
			{t:'buyFactor',d:'Cant. x Und Compra',xformat:'number'},
			{t:'invPrice',d:'Costo und medida (precio compra/cant)',xformat:'number'},
			{t:'itemName',d:'Nombre de Articulo',len:[1,100]},
		]
		});
	}
	});
}},
//Exportacion
{k:'itfE.itm',t:'Maestro Articulos',d:'Exportar maestro de articulos',mdlActives:'itfE', func:function(){
	$M.Ht.ini({g:function(){
		Itf.E.form({api:Api.Itm.pr+'itfe/itm',fileName:'maestroarticulos',
		Fie:[
			{k:'itemCode',d:'Código de Artículo',b:'Y'},
			{k:'itemType',d:'Tipo Articulo',_Fi:{I:{lTag:'select',opts:$V.itmType}}},
			{k:'itemName',d:'Nombre de Articulo',b:'Y'},
			{k:'buyItem',d:'Articulo de Compra.',b:'Y',_Fi:{I:{lTag:'select',opts:$V.YN}}},
			{k:'sellItem',d:'Articulo de Venta.',b:'Y',_Fi:{I:{lTag:'select',opts:$V.YN}}},
			{k:'handInv',d:'Maneja Inventario.',b:'Y',_Fi:{I:{lTag:'select',opts:$V.YN}}},
			{k:'prdItem',d:'Articulo Produccion',_Fi:{I:{lTag:'select',opts:$V.YN}}},

			{k:'udm',d:'UDM',b:'Y'},
			{k:'invPrice',d:'Costo UDM (precio compra/factor)',format:'number',b:'Y'},
			{k:'itemGr',d:'Grupo',b:'Y',_Fi:{I:{lTag:'select',opts:$JsV.itmGr}}},
			{k:'accgrId',d:'Grupo Contable',b:'Y',_Fi:{I:{lTag:'select',opts:$Tb.oiac}}},
			{k:'vatId',d:'Impuesto'},
			{k:'rteId',d:'Retencion'},
			{k:'description',d:'Descripción'},

			{k:'buyUdm',d:'UDM Compra',opts:Udm.O},
			{k:'buyPrice',d:'Precio de Compra',format:'number',b:'Y'},
			{k:'buyFactor',d:'Factor Compra',format:'number',b:'Y'},

			{k:'sellUdm',d:'UDM Venta',b:'Y'},
			{k:'sellPrice',d:'Precio Venta',format:'number',b:'Y'},
			{k:'sellFactor',d:'Factor Venta',format:'number',b:'Y'},
		]
		});
	}
	});
}},
]);

/* Extensions */
Itm.sea2Add=function(P,cont){ /* lTag:itmSea */
	cont=$1.t('div',{'class':'itmSea2Add',style:'backgroundColor:#ffffb9'},cont);
	var vPost='fie=I.grsId'; /*pasar fie antes de todo para vPost */
	if(P.fie){ vPost ='&fie='+P.fie; }
	var vPost='fie=I.grsId,I.defWhs,I.handInv,I.vatId,I.rteId,I.itemGr';
	if(P.type){
		if(P.type=='ivtBit'){ vPost += ',I.udm,I.invPrice&wh[I.handInv]=Y&wh[I.ivtGes]=B'; }
		else if(P.type=='ivt'){ vPost += ',I.udm,I.invPrice&wh[I.handInv]=Y'; }
		else if(P.type=='buy'){ vPost += ',I.udm,I.buyPrice,I.buyFactor&wh[I.buyItem]=Y'; }
		else if(P.type=='buyIvt'){ vPost += ',I.udm,I.buyPrice,I.buyFactor&wh[I.buyItem]=Y&wh[I.handInv]=Y'; }
		else if(P.type=='sellIvt'){ vPost += ',I.udm,I.sellPrice,I.sellFactor&wh[I.sellItem]=Y&wh[I.handInv]=Y'; }
		else if(P.type=='prdItem'){ vPost += ',I.udm&wh[I.prdItem]=Y&wh[I.handInv]=Y'; }
		else{ vPost += ',I.udm,I.sellPrice,I.sellFactor&wh[I.sellItem]=Y'; }
	}
	if(P.vPost){ vPost += '&'+P.vPost; }
	if(P.itemType){ vPost += '&I.itemType='+P.itemType; }
	if(P.getBC){ vPost += '&getBC='+P.getBC; }//id del grupo
	if(!P.noBtn){
		var btn=$1.T.btnFa({fa:'faBtn faBtnCt fa_search',textNode:'Añadir Artículo', func:function(){
			$Api.tbSea({oneRow:'Y',get:Api.Itm.b+'sea/item', vPost:vPost, Wi:{winTitle:'Buscar Artículos...'},
			Trs:[
			{k:'itemCode',t:'Código',n:'wh[I.itemCode(E_like3)]'},
			{k:'itemName',t:'Descripción',n:'wh[I.itemName(E_like3)]'},
			{k:'itemGr',t:'Grupo',opts:$JsV.itmGr,n:'wh[I.itemGr]'},
			{k:'udm',t:'UdM',disabled:'Y',opts:Udm.O,n:'wh[I.udm]'}],
			func:function(Ds){
				if(!Ds.quantity){ Ds.quantity=1; }
				if(Ds.grsId==0 || Ds.grsId==$V.uniqGrId){
					Ds.itemSzId=$V.uniqSize;
					if(P.func){ P.func([Ds]); }
				}
				else if(Ds.itemSzId>0){ if(P.func){ P.func([Ds]); } }
				else{ Itm.Fx.winSizes(Ds,{func:P.func}); }//paso 2
			}
			});
		}},cont);
	}
	if(P.bCode=='Y' || P.noBtn){
		var divL=$1.t('div',{style:'position:relative; padding:2px 0;margin-left:4px; display:inline-block'},cont);
		var bc=$1.lTag({tag:'input',placeholder:'Leer o digitar código...',name:'barCode',style:'fontSize:20px; width:100%; padding-left:20px; height:34px'},divL);
		$1.t('span',{'class':'fa fa-barcode',style:'position:absolute; left:3px; top:7px;'},divL);
		TCODE={};
		bc.keyPresi('enter',function(Tv){
			var val=Tv.value; Tv.value='';
			if(TCODE[val]){ P.func([TCODE[val]]); }
			else{
				$Api.get({f:Api.Itm.b+'sea/barcode',inputs:'barCode='+val+'&'+vPost,jsBody:cont,func:function(Ds,o){
					if(!Ds.quantity){ Ds.quantity=1; }
					if(Ds.grsId==0 || Ds.grsId==$V.uniqGrId){
						if(P.func){ P.func([Ds]); }
					}
					else if(Ds.itemId>0){ if(P.func){ P.func([Ds]); } }
					if(Ds.itemId>0){ TCODE[val]=Ds; }
					else{ delete(TCODE[val]); }
				}});
			}
		});
	}
return cont;
}
Itm.Sea={//lTag=itmSea
	get:function(P,cont,D){
		if(P.D){ D=P.D; }
		func=P.func; delete(P.func);
		if(!P.vSea){ P.vSea=''; }
		if(!P.AJsPut){ P.AJsPut=[]; }
		P.AJsPut.push('itemId');
		if(P.itemType){ P.vSea +='&I.itemType(E_in)='+P.itemType; }
		P.fieDefAt=cont;
		if(!P.value){ P.value=(D)?D.itemName:''; }
		P.api=Api.Itm.b+'sea/itm';
		P.D=D;
		if(P['class']){ P['class'] = ' '+P['class']; }
		else{ P['class']=''; }
		//P['class'] =(P.jsF)?P.jsF+P['class']:$Api.JS.cls+P['class'];
		P.jsF=(P.jsF)?P.jsF:$Api.JS.cls;
		P.func=function(R,inp){
			if(P.boxRep!='N'){
				divRel=(P.topPare)?P.topPare:inp.parentNode.parentNode;
				$Api.Sea.boxRep(R,divRel);
			}
			if(func){ func(R,inp); }
		};
		P.tag='apiSeaBox';
		return $1.lTag(P,cont);
	}
}
Itm.Fx={
item:function(P,cont){
	$Api.Sea.input({api:Api.Itm.b+'sea/item',vSea:'I.prdItem(E_igual)=Y&fie=I.udm,I.grsId',lineTfunc:Itm.Txt.name,value:P.lineText,func:function(R,inp){
		inp.value =Itm.Txt.name(R);
		Itm.Fx.winSizes(R,{func:P.func});
	}},cont);
},
tbSea:function(P,cont){
	var t='';
	var Trs=[{k:'itemCode',n:'I.itemCode(E_like3)',t:'Código'},{k:'itemName',n:'I.itemName(E_like3)',t:'Descripción'}];
	var vPost='I.sellItem=Y&fie=I.udm,I.sellPrice';
	if(P.buyItem){
		vPost='I.buyItem=Y&fie=I.buyUdm,I.buyPrice';
			Trs.push({k:'buyUdm',t:'UdM'});
			Trs.push({k:'buyPrice',t:'Precio'});
	}
	else{
		Trs.push({k:'udm',t:'UdM'});
		Trs.push({k:'sellPrice',t:'Precio'});
	}
	return $1.T.btnFa({fa:'faBtnCt fa-search',textNode:'Añadir Artículo', func:function(){
		$Api.tbSea({get:Api.Itm.b+'sea/item', vPost:vPost, Wi:{winTitle:'Artículos '},
		Trs:Trs,
		func:function(Ds){
			P.func(Ds);
		}
		});
	}},cont);
},
sea:function(P,cont){
	return $1.T.btnFa({fa:'faBtn faBtnCt fa_search',textNode:'Añadir Artículo', func:function(){
		var vSea='';
		if(P.itemType){ vSea += 'itemType='+P.itemType; }
		if(P.vPost){ vSea += '&'+P.vPost; }
		if(P.vSea){ vSea += '&'+P.vSea; }
		$Api.tbSea({get:Api.Itm.b+'sea/item', vSea:vSea, Wi:{winTitle:'Listado de Artículos'},
		Trs:[{k:'itemCode',t:'Código',n:'I.itemCode(E_like3)'},{k:'itemName',n:'I.itemName(E_like3)',t:'Descripción'},{k:'udm',t:'UdM'}],
		func:function(Ds){
			P.func(Ds);
		}
		});
	}},cont);
},
seaItem:function(P,cont){ return Itm.Fx.sea2Size(P,cont); },
sea2Size:function(P,cont){
	return $1.T.btnFa({fa:'faBtn faBtnCt fa_search',textNode:'Añadir Artículo', func:function(){
		var vPost='fie=I.grsId'; /*pasar fie antes de todo para vPost */
		if(P.vPost){ vPost += '&'+P.vPost; }
		if(P.itemType){ vPost += '&itemType='+P.itemType; }
		$Api.tbSea({oneRow:'Y',get:Api.Itm.b+'sea/item', vPost:vPost, Wi:{winTitle:'Listado de Artículos'},
		Trs:[{k:'itemCode',t:'Código',n:'I.itemCode(E_like3)'},{k:'itemName',n:'I.itemName(E_like3)',t:'Descripción'},{k:'udm',t:'UdM',disabled:'Y'}],
		func:function(Ds){
			if(Ds.grsId==0 || Ds.grsId==$V.uniqSize){
				Ds.itemSzId=$V.uniqSize;
				if(P.func){ P.func([Ds]); }
			}
			else{ Itm.Fx.winSizes(Ds,{func:P.func}); }//paso 2
		}
		});
	}},cont);
},
winSizes:function(L,P){/* new */
	L=(L)?L:{}; P=(P)?P:{};
	var wrap=$1.t('div'); var jsF='jsFields';
	var Ta=(L.grsId)?$V.grs2[L.grsId]:{};
	$1.t('h4',{textNode:'Articulo: '+L.itemName},wrap);
	var tb=$1.T.table(['Talla','Cant.','Talla','Cant.','Talla','Cant.']); wrap.appendChild(tb);
	var tBody=$1.t('tbody',0,tb);
	var tds=0; var reqPrice=(P.reqPrice=='Y');
	for(var ta in Ta){
		if(tds==0 || tds%3==0){ var tr=$1.t('tr',0,tBody); } tds++;
		$1.t('td',{textNode:Ta[ta],style:'backgroundColor:#EEE;'},tr);
		var td=$1.t('td',0,tr);
		var inp=$1.t('input',{type:'number',inputmode:'numeric','class':jsF+' _tdTa __tbColNums','tbColNum':1,name:'',style:'width:4rem;',onkeychange:function(){ $Tol.tbSum(tb); }},td);
		inp.ta=ta;
	}
	var resp=$1.t('p',0,wrap);
	/* añadir a html */
	var btn=$1.T.btnSend({textNode:'Añadir Lineas',func:function(){
		$1.clear(resp);
		var err=false; var errText='';
		var Ds=[]; var total=0; var nr=0;
		var tas=$1.q('._tdTa',tb,'all');
		for(var i=0; i<tas.length;i++){
			if(tas[i].value!=''){ var nv=tas[i].value*1;
				Ds.push({});
				for(var ix in L){ Ds[nr][ix]=L[ix]; }
				Ds[nr].itemSzId=tas[i].ta; /* añadir talla-cantidad */
				Ds[nr].quantity=nv; total = total+nv;
				nr++;
			}
		}
		var price=$1.q('.inputPrice',wrap);
		price=(price && price.value)?$Str.toNumber(price.value):0;
		if(total==0){ $Api.resp(resp,{errNo:3,text:'No se han definido cantidades por Talla'}); }
		else if(reqPrice && price<=0){ $Api.resp(resp,{errNo:3,text:'Defina un precio para continuar'}); }
		else{
			L.priceDefine=price;
			if(P.func){ P.func(Ds); }
			$1.delet(wrapBk);
		}
	}}); wrap.appendChild(btn);
	var wrapBk=$1.Win.open(wrap,{winSize:'full',onBody:1,winTitle:'Definir Cantidad por Tallas (1)'});
},
winBcode:function(P,cont){
	btn=$1.T.btnFa({fa:'faBtn faBtnCt fa-magic',textNode:'Añadir por Código de Barras', func:function(){
	var wrap=$1.t('div');
	var tb=$1.T.table(['Código','Descripción','Cant.','']);
	var tBody=$1.t('tbody',0,tb);
	var divL=$1.t('div',{'class':'divLine'},wrap);
	var dx=$1.t('div',{'class':'wrapx1'},divL);
	var inp=$1.t('input',{type:'text','class':'iBg',placeholder:'Lea o digite el código',autocomplete:'off'},dx);
	wrap.appendChild(tb);
	var SV={};
	inp.onkeyup = function(ev){ This=this;
		$js.isKey(ev,'enter',{func:function(){
			var bc=This.value;
			if(SV[bc]){ trA(SV[bc]); }
			else{
				var vPost='barcode='+This.value;
				vPost+=(P.vPost)?'&'+P.vPost:'';
				$Api.get({f:Api.Itm.b+'sea/barcode',inputs:vPost,func:function(Jr){ var nbc=Jr.barCode;
					if(Jr.errNo){ Jr.itemId=bc; Jr.itemSzId='NA'; }
					SV[nbc]=Jr; trA(SV[nbc],bc);
				}});
			}
			This.value='';
		}});
	}
	var add=$1.T.btnFa({fa:'fa_plusCircle',textNode:'Añadir esta información',func:function(){
		var Rt=[];
		for(var i in SV){ var L=SV[i];
			var qty=$1.q('.__bCodeId_'+L.itemId+'_'+L.itemSzId,tBody);
			if(qty && qty.value){
				L.quantity =qty.value*1;
				Rt.push(L);
			}
		}
		P.func(Rt);
		$1.delet(wrapBk);
	}},wrap);
	function trA(L,tco){
		var k='__bCodeId_'+L.itemId+'_'+L.itemSzId;
		var tinp=$1.q('.'+k,tBody);
		if(tinp && tinp.value){ tinp.value=tinp.value*1+1; }
		else if(L.errNo && tinp){/* no hacer nada */}
		else{
			var tr=$1.t('tr',{},tBody);
			if(L.errNo){
				var td=$1.t('td',{colspan:3,'class':k},tr);
				$Api.resp(td,{errNo:3,text:'Error ('+L.errNo+'), en código de barras: '+tco});
			}
			else{
				$1.t('td',{textNode:Itm.Txt.code(L)},tr);
				$1.t('td',{textNode:Itm.Txt.name(L)},tr);
				$1.t('input',{'class':k,type:'number',inputmode:'numeric',min:0,value:1},$1.t('td',0,tr));
			}
			var td=$1.t('td',0,tr);
			$1.T.btnFa({fa:'fa_close',textNode:'Quitar',func:function(T){ $1.delet(T.parentNode.parentNode); }},td);
		}
	}
	var wrapBk=$1.Win.open(wrap,{winTitle:'Añadir por Código de Barras',winSize:'medium',onBody:1});
	}},cont);
	return btn;
}
}

Itm.Fx.udmConverts=function(LD,pare){
	var tb=$1.T.table(['','Descripción Conversión']);
	var tBody=$1.t('tbody',0,tb);
	dFie=$1.T.fieset({L:{textNode:'Factores de Conversión'}},pare,tb);
	dFie.classList.add($Api.JS.cls);
	function trA(L){
		var tr=$1.t('tr',{'class':'_linea'},tBody);
		var td=$1.t('td',0,tr);
		$1.T.sel({'class':'_oper',opts:[{k:'x',v:'Contenido'},{k:'/',v:'Capacidad'}],selected:L[0]},td).onchange=function(){ cambiar([this.value],td2); }
		var td2=$1.t('td',{'class':'_desc'},tr);
		cambiar(L,td2);
	}
	if(LD.udmConverts){
		LD.udmConverts=$js.parse(LD.udmConverts);
		console.log(LD.udmConverts);
		if(LD.udmConverts && LD.udmConverts[0]){
			for(var i in LD.udmConverts){
				trA(LD.udmConverts[i]);
			}
		}
		else{ trA([]); trA([]); }
	}
	else{ trA([]); trA([]); }
	function redefinir(){
		var JS=[];
		var linea=$1.q('._linea',tb,'all');
		for(var i=0; i<linea.length; i++){
			oper=$1.q('._oper',linea[i]).value;
			udm=$1.q('._udm',linea[i]);
			factor=$1.q('._factor',linea[i]);
			if(!udm || !factor){ continue; }
			JS.push([oper,factor.value,udm.value]); // '/',40,'estibas' o 'x',30,'und'
		}
		dFie.AJs={udmConverts:JSON.stringify(JS)};
	}
	function cambiar(L,td2){
		td2.innerHTML='';
		if(L[0]=='x'){
			// 1 caja tiene [30] x [und]
			$1.t('span',{textNode:'1 UDM tiene '},td2);
			$1.t('input',{type:'number','class':'_factor',min:0,style:'width:60px;',value:L[1],onkeychange:redefinir,placeholder:'10'},td2);
			$1.t('span',{textNode:' '},td2);
			$1.t('input',{type:'text','class':'_udm',style:'width:100px;',maxLen:10,value:L[2],onkeychange:redefinir,placeholder:'lapiceros,unidades'},td2);
		}
		else if(L[0]=='/'){
			//1 [estiba] tiene [40] cajas
			$1.t('span',{textNode:'1 '},td2);
			$1.t('input',{type:'text','class':'_udm',style:'width:100px;',maxLen:10,value:L[2],onkeychange:redefinir,placeholder:'paquete,estiba...'},td2);
			$1.t('span',{textNode:' tiene '},td2);
			$1.t('input',{type:'number','class':'_factor',min:0,style:'width:60px;',value:L[1],onkeychange:redefinir,placeholder:'20'},td2);
			$1.t('span',{textNode:' UDM'},td2);
		}
		redefinir();
	}
	return dFie;
}

$1.xTag['itmSub']=function(P,cont,D){
	if(P.D){ D=P.D; }
	func=P.func; delete(P.func);
	if(!P.vSea){ P.vSea=''; }
	if(!P.AJsPut){ P.AJsPut=[]; }
	if(P.AJsBlank!='Y'){
		P.AJsPut.push('itemId');
		P.AJsPut.push('itemSzId');
	}
	if(P.itemType){ P.vSea +='&I.itemType(E_in)='+P.itemType; }
	P.tag='apiSeaBox'; P.fieDefAt=cont;
	P.api=Api.Itm.pr+'sea/sub';
	P.D=D;
	if(P['class']){ P['class'] = ' '+P['class']; }
	else{ P['class']=''; }
	P['class'] =(P.jsF)?P.jsF+P['class']:$Api.JS.cls+P['class'];
	P.lineTfunc=Itm.Txt.name;
	if(!P.value){ P.value=(D)?Itm.Txt.name(D):''; }
	P.rone='itmSeaSub';
	if(P.funcSet){ P.func=P.funcSet; P.funcSet=false; }
	else{
		P.func=function(R,inp,Ttr){
			if(P.boxRep!='N'){
				divRel=(P.topPare)?P.topPare:Ttr;
				$Api.Sea.boxRep(R,divRel);
			}
			if(func){ func(R,inp,Ttr); }
		};
	}
	return $1.lTag(P,cont);
}
Itm.Sea={
	tags:1,
	get:function(P,cont,D){
		if(P.D){ D=P.D; }
		func=P.func; delete(P.func);
		if(!P.vSea){ P.vSea=''; }
		if(!P.AJsPut){ P.AJsPut=[]; }
		if(P.AJsBlank!='Y'){ P.AJsPut.push('itemId'); }
		if(P.itemType){ P.vSea +='&I.itemType(E_in)='+P.itemType; }
		P.tag='apiSeaBox'; P.fieDefAt=cont;
		P.value=(D)?D.itemName:'';
		P.api=Api.Itm.pr+'sea/items';
		P.D=D;
		if(P['class']){ P['class'] = ' '+P['class']; }
		else{ P['class']=''; }
		P['class'] =(P.jsF)?P.jsF+P['class']:$Api.JS.cls+P['class'];
		if(P.subItems){
			P.AJsPut.push('itemSzId');
			P.lineTfunc=Itm.Txt.name;
			P.value=(D)?Itm.Txt.name(D):'';
		}
		P.func=function(R,inp){
			divRel=(P.topPare)?P.topPare:inp.parentNode.parentNode;
			$Api.Sea.boxRep(R,divRel);
			if(func){ func(R,inp); }
		};
		return $1.lTag(P,cont);
	},
	sub:function(P,pare,D){
		return $1.xTag['itmSub'](P,pare,D);
	}
}

_Fi['report/products']=function(wrap){
	var jsV = 'jsFiltVars';
	opt1=[{k:'G',v:'General'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV+' viewType',name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Tipo',I:{lTag:'select','class':jsV,name:'item_type' ,opts:$V.itmType,selected:'C', noBlank:'Y'}}, divL);
	$1.T.divL({wxn:'wrapx8', L:'Estado',I:{lTag:'select','class':jsV,name:'webStatus',opts:$V.active, noBlank:'Y'}}, divL);
	$1.T.divL({wxn:'wrapx8', L:'Grupo',I:{lTag:'select','class':jsV,name:'group_id',opts:$JsV.itmGr}}, divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ ProductReports.general(); }},wrap);
	$1.t('p', {textNode: 'Se mostraran máximo 1000 resultados'}, wrap)
};


$M.liRep('itm',[
	{k:'report/products',t:'Productos', kauAssg:'itm.p',ini:{f:'report/products'}}
],{repM:['crd']});


let ProductReports = {}
ProductReports.general = () => {
	$Api.Rep.base({f:Api.private+'/itm/report',inputs:$1.G.filter(),
		V_G:[
			{f:'itemCode',t:'Codigo'},
			{f:'itemName',t:'Nombre'},
			{f:'itemGr',t:'Grupo',_g:$JsV.itmGr},
			{f:'udm', t:'UDM',_g:Udm.O},
			{f:'invPrice', t: 'Costo unitario', format: '$'},
			{f:'sellItem', t: 'Es de venta', _g:$V.YN},
			{f:'sell_percent', t: 'Margen %', format: 'number'},
			{f:'sellPrice', t: 'Precio venta', format: '$'},
			{f:'sellUdm', t: 'UDM venta', _g:Udm.O},
			{f:'buyItem', t: 'Es de compra', _g:$V.YN},
			{f:'buyPrice', t: 'Precio compra', format: '$'},
			{f:'buyUdm', t: 'UDM compra', _g:Udm.O},
			{f:'handInv', t: 'Maneja inventario', _g:$V.YN},
			{f:'description', t: 'Descripcion'},

		],
	},$M.Ht.cont);
}