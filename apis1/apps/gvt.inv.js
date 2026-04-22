
$M.li['gvtInv.form']={t:'Factura Deudor', kau:'gvtInv',func:function(){ $M.Ht.ini({func_cont:Gvt.Inv.form}); }};
Gvt.Inv={
opts:function(P){
	var L=P.L; var Jr=P.Jr;
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.to('gvtPor','.view',T.P); } }; n++;
	Li[n]={ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99({api:Api.Gvt.aa+'por/tb99',serieType:'gvtPor',docEntry:T.P.docEntry}); } }; n++;
	if(L.docStatus=='D'){
		Li[n]={ico:'fa fa_prio_low',textNode:' Abrir Documento', P:L, func:function(T){ $Doc.statusDefine({reqMemo:'N',docEntry:T.P.docEntry,api:Api.Gvt.aa+'por/statusOpen',text:'Se va abrir la orden de compra, las cantidades ordenadas serán actualizadas en la tabla de inventario.'}); } }; n++;
	}
	if(L.docStatus!='N'){
		Li[n]={ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({docEntry:T.P.docEntry,api:Api.Gvt.aa+'por/statusCancel',text:'Se va anular el documento.'}); } }; n++;
	}
	return Li={Li:Li,textNode:P.textNode};
},
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.aa+'por', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','N°.','Estado','Fecha Doc.','Proveedor','Clasificación','Total','Realizado']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var menu=$1.Menu.winLiRel(Gvt.Por.opts({L:L})); td.appendChild(menu);
				var td=$1.t('td',{'class':$Xls.tdNo},tr);
				$1.t('a',{href:$M.to('gvtPor.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:' '+L.docEntry},td);
				$1.t('td',{textNode:_g(L.docStatus,$V.docStatus)},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:_g(L.docClass,$V.gvtPdnClass)},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
			}
			tb=$1.T.tbExport(tb,{print:'Y',ext:'xlsx',fileName:'Entradas Mercancia - Compras'});
			cont.appendChild(tb);
		}
	}});
},
form:function(P){ P=(P)?P:{};
	var cont=$M.Ht.cont;
	var jsF='jsFields';
	var n=1;
var tb=$1.T.table([{textNode:'#',style:'width:2.5rem;'},'Descripción','Bodega',{textNode:'Precio'},{textNode:'Cant.',style:'width:6rem;'},{textNode:'Udm',_i:{ititle:'Unidad de Medida'},style:'width:4rem;'},{textNode:'Total',style:'width:6rem;'}]);
	var fie=$1.T.fieldset(tb,{L:{textNode:'Líneas del Documento'}});
	cont.appendChild(fie);
	var tBody=$1.t('tbody',0,tb);
	Itm.Fx.sea2Size({vPost:'fie=I.grsId,I.udm,I.sellPrice,I.udm,I.defWhs&wh[I.sellItem]=Y',func:function(Ds){
		for(var i in Ds){ trA(Ds[i]); }
	}},fie);
	$Doc.formSerie({cont:cont, serieType:'gvtBillInv',jsF:jsF,
	middleCont:fie,POST:Api.GvtBill.b+'inv', func:function(Jr2){
		$Doc.to('gvtInv','.view',Jr2);
	},
	Li:[
	{fType:'date',name:'docDate',req:'Y'},
	{fType:'crd',wxn:'wrapx3',L:'Socio de Negocio',req:'Y'},
	{fType:'user'},
	{wxn:'wrapx4',L:'Fecha',I:{tag:'input',type:'date','class':jsF,name:'docDate'}},
	{wxn:'wrapx4',L:'Vencimiento',I:{tag:'input',type:'date','class':jsF,name:'dueDate'}},
	{divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'textarea','class':jsF,name:'lineMemo'}}
	]
	});
	var Fie=[{kty:'data-vPost'},{k:'itemCode',funcText:Itm.Txt.code},{k:'itemName',funcText:Itm.Txt.name},{k:'whsId',kd:'defWhs',kty:'select',opts:$V.whsCode},{k:'buyPrice',kn:'price',kty:'price'},{k:'quantity',kty:'quantity',vPost:['itemId','itemSzId']},{k:'udm'},{k:'priceLine',kty:'priceLine'}];
	function trA(D){
		var ln ='L['+n+']';
	Fie[0].vPost=['itemId','itemSzId'];
		$DocF.line(D,{lineName:ln,F:Fie},tb);
		n++;
	}
	}
},
view:function(){ 
	var Pa=$M.read(); var cont=$M.Ht.cont;
	$Api.get({f:Api.Gvt.aa+'por/view', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		var Trs=[];
		if(Jr.L.errNo){ Trs[0]={colspan:6,textNode:Jr.L.text}; }
		else{
			var va='vertical-align:middle';
			var ni=0;
			for(var i in Jr.L){ var L=Jr.L[i]; Trs[ni]=[];
				Trs[ni].push({textNode:Itm.Txt.code(L),style:va});
				Trs[ni].push({textNode:Itm.Txt.name(L),style:va});
				Trs[ni].push({textNode:_g(L.whsId,$V.whsCode),style:va});
				Trs[ni].push({textNode:$Str.money(L),style:va});
				Trs[ni].push({textNode:L.quantity*1,style:va,'class':tbCal.trQty});
				Trs[ni].push({textNode:$Str.money(L.priceLine),style:va});
				Trs[ni].push({style:va,textNode:L.buyFactor*1});
				ni++;
			}
		}
		if(Jr.DocTemp){ $Tpt.use(Jr.DocTemp,cont,{Jr:Jr,Trs:Trs}); }
		else{ $Tpt.use('gvtPor',cont,{Jr:Jr,Trs:Trs}); }
		$Str.useCurr=false;
		tbCal.docTotal(cont,{trsCont:true});
	}});
},
}