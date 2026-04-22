
$Doc.a['owht']={a:'ivt.wht.view',docT:'Transferencia de Stock'};
$Doc.a['oing']={a:'ivt.ing.view',docT:'Ingreso de Stock'};
$Doc.a['oegr']={a:'ivt.egr.view',docT:'Salida de Stock'};
$Doc.a['ocat']={a:'ivt.cat.view',docT:'Documento de Inventario'};
$Doc.a['ocph']={a:'ivt.cph.view'};$Doc.a['ivtAwh']={a:'ivtAwh.view',docT:'Ajuste de Inventario'};
$Doc.a['ivtMov']={a:'ivt.mov.view',docT:'',docT:'Movimiento Inventario'};
$js.push($V.docSerieType,{owht:'Trans.-Stock',oing:'Ent-Inv',oegr:'Sal-Inv',ocat:'Tom-Inv',ocph:'Cambio Homol.',oinc:'Rec. Inv.',ivtAwh:'Ajust. Inv.',ivtMov:'Movim. Inv.'});
$V.ingDocClass={produccion:'Producción',devolucion:'Devolución',cambio:'Cambio',muestra:'Muestra',otros:'Otros',garantia:'Garantia',compras:'Compras'};
$V.egrDocClass={produccion:'Producción',cambio:'Cambio',muestra:'Muestra',otros:'Otros',garantia:'Garantia'};
$V.whtDocClass={produccion:'Producción',cambio:'Cambio',muestra:'Muestra',otros:'Otros',garantia:'Garantia'};
$V.ivt_docClassMov=[{k:'cambio',v:'Cambio'},{k:'otro',v:'Otros'}];
$V.ivt_lineType=[{k:'I',v:'Entrada'},{k:'O',v:'Salida'}];

$M.add([
{liA:'ivt',folder:'Especiales',L:[{k:'ivt.cat.basic',t:'Toma de Inventario'},{k:'ivt.whsTransfer.ocat',t:'Confirmar Ingreso desde documento de Toma de Inventario'},{k:'ivt.mov',t:'Doc. Movimiento de Inventario'},{k:'ivt.cph.basic',t:'Cambio Entre Productos'},{t:'Recuento de Inventario',k:'ivt.inc.basic'}]}

]);

_Fi['ivtCph']=function(wrap){
	var Fid={func:Ivt.Cph.get,rows:'N',docNum:'N',docStatus:$V.docStatus1,
	adds:[{wxn:'wrapx8', L:'Bodega',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}}]
	};
	$Doc.filtForm(Fid,wrap);};_Fi['ivtMov']=function(wrap){
	var Fid={func:Ivt.Mov.get,rows:'N',docNum:'N',docStatus:$V.dStatus,
	adds:[{wxn:'wrapx8', L:'Clase',I:{tag:'select',name:'A.docClass',opts:$V.ivt_docClassMov}}]
	};
	$Doc.filtForm(Fid,wrap);
};
_Fi['ivtCat']=function(wrap){
	var Fid={func:Ivt.Cat.get,rows:'N',docNum:'N',docStatus:$V.dStatus,
	adds:[{wxn:'wrapx8', L:'Clase',I:{tag:'select',name:'A.docClass',opts:$V.ingDocClass}},{wxn:'wrapx8', L:'Bodega',I:{tag:'select',name:'A.whsId',opts:$Tb.itmOwhs}}]
	};
	$Doc.filtForm(Fid,wrap);
};


$M.li['ivt.cat'] ={t:'Toma de Inventario', kau:'ivt.cat.basic', func:function(){
	$M.Ht.ini({fieldset:true,btnGo:'ivt.cat.form', f:'ivtCat',gyp:Ivt.Cat.get });}};$M.li['ivt.cat.view'] ={t:'-', kau:'ivt.cat.basic',func:function(){
	$M.Ht.ini({g:Ivt.Cat.view});
}};$M.li['ivt.cat.form'] = {t:'Documento de Toma de Inventario', kau:'ivt.cat.basic',func:function(){ $M.Ht.ini({g:Ivt.Cat.form});
}};$M.li['ivt.cat.digit']= {t:'Captura por Código de Barras', kau:'ivt.cat.basic', func:function(){ $M.Ht.ini({ g:Ivt.Cat.digit }); }};
$M.li['ivt.cat.lines'] = {t:'Modificar Lineas Documento', kau:'ivt.cat.basic', func:function(){ $M.Ht.ini({g:Ivt.Cat.lines});
}};
$M.li['ivt.mov'] = {t:'Movimientos Inventarios', kau:'ivt.mov', func:function(){
	$M.Ht.ini({f:'ivtMov', btnGo:'ivt.mov.form',gyp:Ivt.Mov.get });
}};
$M.li['ivt.mov.form'] = {t:'Movimiento Inventario',kau:'ivt.mov',func:function(){ $M.Ht.ini({g:Ivt.Mov.form}); }};
$M.li['ivt.mov.view'] ={t:'-', kau:'ivt.mov',func:function(){
	$M.Ht.ini({g:Ivt.Mov.view});
}};
$M.li['ivt.cph'] = {t:'Cambios Internos', kau:'ivt.cph.basic', func:function(){
	$M.Ht.ini({ f:'ivtCph', btnGo:'ivt.cph.form',gyp:Ivt.Cph.get });
}};$M.li['ivt.cph.form']={t:'Cambio por Producto Similar', kau:'ivt.cph.basic', func:function(){
	$M.Ht.ini({f:null, g:Ivt.Cph.form});
}, d:'El artículo original aumentará su cantidad en el inventario, el de cambio disminuirá.'};$M.li['ivt.cph.view'] ={t:'-', kau:'ivt.cph.basic', func:function(){	$M.Ht.ini({g:Ivt.Cph.view});}};
$M.li['sysd.mcnf.ivt'] ={t:'Definición Módulo Inventario', kau:'sysd.supersu', func:function(){
	$M.Ht.ini({g:function(){
		$Sysd.Mcnf.get({mdl:'ivt',
		Li:[
		{k:'ivtCanNeg',v:'Permitir Negativos',tag:'select',opts:{N:'No',Y:'Si',item:'Por Artículo'}}
		]
		});
	}
	});
}};
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
		Li[n]={ico:'fa fa_history',textNode:' Ingresar a Bodega', P:L, func:function(T){ $Doc.statusDefine({docEntry:T.P.docEntry,api:Api.Ivt.b+'cat/statusClose',node:node,winTitle:'Cierre de Documento',text:'El documento será cerrado, se cargarán las cantidades en la Bodega '+_g(T.P.whsId,$V.whsCode)+', y no se podrá modificar la información.',reqMemo:'N'}); } }; n++;
		Li[n]={ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Ivt.b+'cat/statusCancel',text:'Se va anular el documento. No se puede revertir esta acción.'}); } }; n++;
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
	POST:Api.Ivt.b+'cat', func:function(Jr2){
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
	$Api.get({f:Api.Ivt.b+'cat', inputs:$1.G.filter(), loade:cont, 
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
				$1.t('td',{textNode:_g(L.docStatus,$V.dStatus)},tr);
				var td=$1.t('td',0,tr);
				$1.t('td',{textNode:_g(L.docClass,$V.ingDocClass)},tr);
				var tdwhs=$1.t('td',{textNode:_g(L.whsId,$Tb.itmOwhs)},tr);
				if(L.invMov=='Y'){ $1.t('span',{textNode:'Si','class':'fa fa_history'},td);
					tdwhs.style.color='blue'; tdwhs.style.fontWeight='bold';
				}
				else{ $1.t('span',{textNode:'No'},td); }				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);			};		}	}});},digit:function(){	var contTop = $M.Ht.cont;	var cont = $1.t('div');	Che.L=[]; Che.T={}; Che.t=[];//temporal	Che.n = -1; $M.U.i();	var Pa=$M.read();	var fie=$1.T.fieldset(cont,{L:{textNode:'Documento No. '+Pa.docEntry}});	contTop.appendChild(fie);	cont.appendChild(Barc.input({func:function(Jr,boxNum){		Barc.Draw.tbDetail(Jr,boxNum);	}}));	$1.t('div',{id:'_tableWrap'},cont);	var resp = $1.t('div',0,cont);	$Api.send({textNode:'Guardar',POST:Api.Ivt.b+'cat/digit', getInputs:function(){		var d = Barc.getData(cont);		return 'docEntry='+Pa.docEntry+'&D='+JSON.stringify(d);	}, func:function(Jr2){		if(!Jr2.errNo){ $M.U.e(); $M.to('ivt.cat.view','docEntry:'+Pa.docEntry); }		$Api.resp(resp,Jr2);	}},cont);},view:function(){
	var Pa=$M.read(); cont=$M.Ht.cont;
	if(Pa.viewType=='packing'){ return Ivt.Cat.viewPacking(); }
	$Api.get({f:Api.Ivt.b+'cat/view',inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){		Jr.T={}; var Lo=Jr.L; Jr.L=[]; var kEx={}; var nu=1;		var wList=$1.t('div');		if(Lo.errNo){ $Api.resp(wList,Lo); }		else{		for(var nk in Lo){ var L=Lo[nk];			var ta=L.itemSzId;			var kr='_'+L.itemId*1;			if(!kEx[kr]){ kEx[kr]=nu; nu++; }			var k=kEx[kr]-1;			if(!Jr.L[k]){ Jr.L[k]=L; Jr.L[k].T={}; }			if(!Jr.L[k].T[ta]){ Jr.L[k].T[ta]={quantity:0,breads:0}; }			Jr.L[k].T[ta].quantity=L.quantity;			Jr.L[k].T[ta].breads=L.breads;			Jr.T[ta]=_g(ta,$V.grs1);		}
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
	$Api.get({f:Api.Ivt.b+'cat/viewPacking', errWrap:cont, inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){		Jr.T={}; var Lo=Jr.L; Jr.L=[]; var kEx={}; var nu=0;		for(var nk in Lo){ var L=Lo[nk];			var ta=L.itemSzId;			var kr=L.itemId+'_'+L.detail;			if(!kEx[kr]){ kEx[kr]=nu; nu++; }			var k=kEx[kr];			if(!Jr.L[k]){ Jr.L[k]=L; }			if(!Jr.L[k].T){ Jr.L[k].T={}; }			if(!Jr.L[k].T[ta]){ Jr.L[k].T[ta]={quantity:0,breads:0}; }			Jr.L[k].T[ta].quantity=L.quantity;			Jr.L[k].T[ta].breads=L.breads;			Jr.T[ta]=_g(ta,$V.grs1);		}		Jr.L=$js.sortNum(Jr.L,{k:'detail'});
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
	$Api.get({f:Api.Ivt.b+'cat/lines',inputs:vPost, loade:cont, func:function(Jr){
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
			$Api.send({textNode:'Actualizar Lineas',PUT:Api.Ivt.b+'cat/lines',getInputs:function(){ return vPost+'&'+$1.G.inputs(tb); }, loade:resp, func:function(Jr2){
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
},Ivt.Cph={transf:function(P){	$1.Win.confirm({text:'Se realizarán entradas para los artículos de origen y salidas para los artículos de cambio. Esta acción no se podrá reversar.',noClose:'Y', func:function(resp2){		$Api.put({f:Api.Ivt.b+'cph/close', inputs:'docEntry='+P.docEntry, loade:resp2, func:function(Jr3){ $ps_DB.response(resp2,Jr3); }});	}});},form:function(P){ P=(P)?P:{};	var cont=$M.Ht.cont;	var jsF='jsFields';	var n=1;	var tb=$1.T.table([{textNode:'#',style:'width:4rem;'},{textNode:'Tipo Doc.',style:'width:6rem;'},{textNode:'N°. Doc.',style:'width:6rem;'},'Artículo Original','Artículo para Cambio',{textNode:'Cantidad',style:'width:6rem;'}],{tbData:{'class':'table_zh table_x100'}});	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});	cont.appendChild(fie);	var tBody=$1.t('tbody',0,tb);	$Doc.formSerie({cont:cont, serieType:'ocph',jsF:jsF, middleCont:fie,	PUT:Api.Ivt.b+'cph', func:function(Jr2){		$M.to('ivt.cph.view','docEntry:'+Jr2.docEntry);	},	Li:[	{fType:'date',name:'docDate',req:'Y'},	{fType:'user'},	{wxn:'wrapx8',req:'Y',L:'Bodega',I:{tag:'select',sel:{'class':jsF,name:'whsId'},opts:$V.whsCode}},	{divLine:1,wxn:'wrapx1',L:'Observación',I:{tag:'textarea','class':jsF,name:'lineMemo',placeholder:'Detalles para documento.'}},	]});	var btn=$1.T.btnFa({fa:'fa fa_plusCircle', textNode:' Añadir Lineas',func:function(){		trA({},n); n++;	}},fie);	function trA(L,n){		var ln='L['+n+']';		var tr=$1.t('tr',0,tBody);		$1.t('td',{textNode:n},tr);		var td=$1.t('td',0,tr);		var sel=$1.T.sel({sel:{'class':jsF,name:ln+'[tt]',style:'width:6rem;'},opts:{opvt:'Pedido Venta'}});		sel.O={vPost:''};		td.appendChild(sel);		var td=$1.t('td',0,tr);		var trInp=$1.t('input',{type:'number','class':jsF,name:ln+'[tr]',style:'width:6rem;',O:{vPost:''}},td);		var td=$1.t('td',0,tr);		var sea=$Sea.input(td,{api:'itemData',inputs:'viewType=itemSize', fPars:{ln:ln,inpD:trInp}, func:function(Js,inp,fP){		fP.inpD.O.vPost=fP.ln+'[itemIdFrom]='+Js.itemId+'&'+fP.ln+'[itemSzIdFrom]='+Js.itemSzId;		}});		var td=$1.t('td',0,tr);		var sea=$Sea.input(td,{api:'itemData',inputs:'viewType=itemSize', fPars:{ln:ln,sel:sel}, func:function(Js,inp,fP){		fP.sel.O.vPost=fP.ln+'[itemIdTo]='+Js.itemId+'&'+fP.ln+'[itemSzIdTo]='+Js.itemSzId;		}});		var td=$1.t('td',0,tr);		$1.t('input',{type:'number','class':jsF,name:ln+'[quantity]',style:'width:6rem;'},td);	}	var n=1;	trA({},n); n++;},get:function(cont){	cont =$M.Ht.cont;	$Api.get({f:Api.Ivt.b+'cph', inputs:$1.G.filter(), loade:cont, 	func:function(Jr){		if(Jr.errNo){ $Api.resp(cont,Jr); }		else{			var tb = $1.T.table(['','No','Estado',{textNode:'Inv.',title:'¿Inventario Modificado?'},'Fecha','Bodega','Detalles','Realizado']); cont.appendChild(tb);			var tBody = $1.t('tbody',0,tb);			for(var i in Jr.L){ L=Jr.L[i];				var tr = $1.t('tr',0,tBody);				var tdB = $1.t('td',0,tr);				tdB.appendChild($1.Menu.winLiRel({Li:[					{ico:'fa fa_history',textNode:' Realizar Movimientos en Inventario', P:L, func:function(T){ 						Ivt.Cph.transf(T.P);					}}				]}));				var td = $1.t('td',0,tr);				$1.t('a',{href:$M.to('ivt.cph.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:L.docEntry},td);				$1.t('td',{textNode:_g(L.docStatus,$V.dStatus)},tr);				$1.t('td',{textNode:_g(L.invMov,$V.YN)},tr);				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);				$1.t('td',{textNode:_g(L.whsId,$Tb.itmOwhs)},tr);				$1.t('td',{textNode:L.lineMemo},tr);				$1.t('td',{textNode:'Por '+L.userName+', '+$2d.f(L.dateC,'mmm d H:iam')},tr);			};		}	}});},view:function(){	var Pa=$M.read(); var contPa=$M.Ht.cont; $1.clear(contPa);	var divTop=$1.t('div',{style:'marginBottom:0.5rem;'},contPa);	var cont=$1.t('div',0,contPa);	var btnPrint=$1.T.btnFa({fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(cont); }});	divTop.appendChild(btnPrint);	$1.t('span',{textNode:' | '},divTop);	$Api.get({f:Api.Ivt.b+'cph/view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		if(Jr.docStatus=='O'){
			$1.T.btnFa({fa:'fa_history',textNode:' Generar Movimientos', P:{docEntry:Pa.docEntry}, func:function(T){ Ivt.Cph.transf(T.P); }},divTop);
		}		sHt.ivtCphHead(Jr,cont);		var tb=$1.T.table([{textNode:'#',style:'width:3rem;'},{textNode:'Tipo Doc.',style:'width:4rem;'},{textNode:'N°. Doc.',style:'width:4rem;'},{textNode:'Artículo Original',colspan:2},{textNode:'Artículo de Cambio',colspan:2},{textNode:'Cant.',style:'width:6rem;'}]);		$1.t('p',0,cont);		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas del Pedido'}}); cont.appendChild(fie);		tb.classList.add('table_x100');		var tBody=$1.t('tbody',0,tb);		var tF=$1.t('tfoot',0,tb);		for(var i in Jr.L){ L=Jr.L[i];			var tr=$1.t('tr',0,tBody);			$1.t('td',{textNode:L.lineNum},tr);			$1.t('td',{textNode:L.tt},tr);			$1.t('td',{textNode:L.tr},tr);			$1.t('td',{textNode:Itm.Txt.code({itemCode:L.itemCodeFrom,itemSzId:L.itemSzIdFrom})},tr);			$1.t('td',{textNode:Itm.Txt.name({itemName:L.itemNameFrom,itemSzId:L.itemSzIdFrom})},tr);			$1.t('td',{textNode:Itm.Txt.code({itemCode:L.itemCodeTo,itemSzId:L.itemSzIdTo})},tr);			$1.t('td',{textNode:Itm.Txt.name({itemName:L.itemNameTo,itemSzId:L.itemSzIdTo})},tr);			$1.t('td',{textNode:L.quantity*1,'class':'__tbColNums','tbColNum':4},tr);		}		var tr=$1.t('tr',0,tF);		$1.t('td',{colspan:7,textNode:'Cantidad Total',style:'text-align:right;'},tr);		$1.t('td',{'class':'__tbColNumTotal4'},tr);		$Tol.tbSum(tb);	}});}}
$dTb.F['ivtMov']={
itemCode:{t:'Código'},itemName:{t:'Descripción'},udm:{t:'Unidad de Medida'},lineType:{t:'Tipo Linea'},whsId:{t:'Bodega'},quantity:{t:'Cant.'}
};
Ivt.Mov={
opts:function(P){
	var L=P.L; var Jr=P.Jr;
	var Li=[];
	Li.push({ico:'fa fa-eye',textNode:' Visualizar Documento', P:L, func:function(T){ $Doc.href('ivtMov',T.P); } });
	Li.push({ico:'fa fa_prio_high',textNode:' Anular Orden', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Ivt.b+'mov/statusCancel',text:'Se va anular el documento, se afectarán las cantidades en el inventario.'}); } });
	return Li={Li:Li,textNode:P.textNode};
},
get:function(cont){
	cont =$M.Ht.cont;
	$Api.get({f:Api.Ivt.b+'mov', inputs:$1.G.filter(), loade:cont, 
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
	$Doc.formSerie({cont:cont, jsF:jsF, middleCont:fie, serieType:'ivtMov',Jr:{}, POST:Api.Ivt.b+'mov',func:function(Jr2){ $Doc.href('ivtMov',Jr2,'to'); },
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
	$Api.get({f:Api.Ivt.b+'mov/view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
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
