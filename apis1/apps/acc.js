/* Conta */
$M.sAdd([
{fatherId:'masters',L:[{folId:'mastConta',folName:'Contabilidad'}]},
{fatherId:'mastConta',MLis:['acc.itmGr','accAfGr','acc.pdc','acc.fdp','tb.gfiOpym','acc.tax','tb.gfiOcdc']}
]);
$M.add([
{liA:'su',rootFolder:'Globales',L:[{k:'sysd.suadmin',t:'Definición de Administrador'}]},
{liA:'define',rootFolder:'Definición - Contabilidad',L:[{k:'acc.itmGr',t:'Grupo Artículos - Contables'},{k:'acc.pdc',t:'Plan de Cuentas (Contabilidad)'},{k:'acc.fdp',t:'Formas de Pago'}]}
]);

Api.Acc={b:'/v/acc/'};
Api.Gfi={b:'/v/acc/'};
$TbV.gfiPdcBalType=[
{k:1,v:'Activo Corriente',P:'A'},{k:2,v:'Activo No Corriente',P:'A'},{k:3,v:'Otros Activos',P:'A'},
{k:4,v:'Pasivo Corriente',P:'P'},{k:5,v:'Pasivo No Corriente',P:'P'},{k:6,v:'Otros Pasivos',P:'P'},
{k:7,v:'Capital Social'},{k:7,v:'Utilidades',P:'C'}];
$TbV.gfiPdcErType=[
{k:1,v:'Ventas'},{k:2,v:'- Devoluciones'},{k:3,v:'- Descuentos'},
{k:4,v:'- Costo de Ventas'},{k:5,v:'- Costo Producción'},
{k:11,v:'- Gastos Operacionales'},{k:6,v:'- Gastos Admón.'},{k:7,v:'- Gastos Ventas'},
{k:8,v:'- Gastos Financieros'},
{k:9,v:'+ Ingresos No Operacionales'},{k:10,v:'- Gastos No Operacionales'},
{k:10,v:'Otros'}
];

$V.gfiFdPType=[{k:"G","v":"General"},{k:"C",v:"Clientes"},{k:"P",v:"Proveedor"},{k:"O",v:"Otros"}];
$V.accNature=[{k:'D',v:'Débito'},{k:'C',v:'Crédito'}];
$V.accClass=[{k:'A',v:'Activo'},{k:'P',v:'Pasivo'},{k:'PT',v:'Patrimonio'},{k:'I',v:'Ingreos'},{k:'E',v:'Egresos'},{k:'O',v:'Otros'},];
$V.accCateg=[{k:'BG',v:'Situación Financiera'},{k:'ER',v:'Estado Resultados'},{k:'O',v:'Otros'}]
$V.gfiTaxType=[{k:'iva',v:'IVA'},{k:'rteIva',v:'Rte. IVA'},{k:'rte',v:'Rte. Fuente'},{k:'rteIca',v:'Rte. ICA'},{k:'ico',v:'Impo. Consumo'}];
$V.accLvType=[{k:'T',v:'Titulo'},{k:'D',v:'Detalle'}];
$V.accItmGr=[{k:'accSell',v:'Ventas'},{k:'accIvt',v:'Inventarios'},{k:'accCost',v:'Costos'},{k:'accRdn',v:'Devoluciones'},{k:'accBuyRem',v:'Remisión Compras'},{k:'accAwh',v:'Ajuste Inventario'}];
$V.accAfGr=[{k:'accBuy',v:'Valor Compra'},
{k:'accDep',v:'Depreciación'},{k:'accGasDep',v:'Gasto Depreciación'},
{k:'accDepNiif',v:'Depreciación NIIF'},{k:'accGasDepNiif',v:'Gasto Depreciación NIIF'}
];
$V.AccSysCode={ivaVentas:'IVA Ventas',autoRenta23:'Autorenta 23',autoRenta13:'Autorenta 13',rteIvaVentas:'Rte. IVA Ventas'};
$V.AccFpMethod=[{k:'TIB',v:'Transferencia Interbancaria'},{k:'TBA',v:'Transferencia Bancaria'},
{k:'EFE',v:'Efectivo'},{k:'CHE',v:'Cheque'},
{k:'TDE',v:'T. Débito'},{k:'TCR',v:'T. Crédito'},{k:'CRE',v:'Crédito'},{k:'OTR',v:'Otros'}];
//dataico "CREDIT_ACH", "DEBIT_ACH", "CASH", "CREDIT_AHORRO", "DEBIT_AHORRO", "CHEQUE", "CREDIT_TRANSFER", "DEBIT_TRANSFER", "BANK_TRANSFER", "CREDIT_BANK_TRANSFER", "DEBIT_INTERBANK_TRANSFER", "DEBIT_BANK_TRANSFER", "CREDIT_CARD", "DEBIT_CARD"

$V.gfiPdcGr=[
{k:'11',v:'Efectivo y Equivalente -11'},
{k:'12',v:'Inversiones -12'},
{k:'13',v:'Cuentas por Cobrar -13'},
{k:'14',v:'Inventarios -14'},
{k:'15',v:'Planta y Equipo -15'},
{k:'16',v:'Intagibles -16'},
{k:'17',v:'Otros Activos no Financieros -17'},
{k:'18',v:'Impuestos a las Ganancias -18'},
{k:'19',v:'Otros Activos Financieros -19'},

{k:'21',v:'Pasivos Financieros -21'},
{k:'22',v:'Proveedores -22'},
{k:'23',v:'Acreedores Comerciales -23'},
{k:'24',v:'Pasivos por Impuestos -24'},
{k:'25',v:'Beneficios a Empleados -25'},
{k:'26',v:'Pasivos Estimados -26'},
{k:'27',v:'Diferidos -27'},
{k:'28',v:'Pasivos No Financieros -28'},
{k:'29',v:'Bonos y papeles comerciales -29'},

{k:'31',v:'Capital social -31'},
{k:'32',v:'Superávit de capital -32'},
{k:'33',v:'Reservas -33'},
{k:'34',v:'Revalorización del patrimonio -34'},
{k:'35',v:'Dividendos -35'},
{k:'36',v:'Resultado Ejercicio -36'},
{k:'37',v:'Resultado Ejercicios Anteriores -37'},
{k:'38',v:'Superávit por valorizaciones -38'},
{k:'39',v:'Afectaciones fiscales de ingresos y gastos -39'},

{k:'41',v:'Ingresos Operacionales -41'},
{k:'42',v:'Ingresos NO Operacionales -42'},
{k:'43',v:'Ganancias -43'},
{k:'44',v:'Ingresos Fiscales -44'},

{k:'51',v:'Gastos Administrativos -51'},
{k:'52',v:'Gastis de Ventas -52'},
{k:'53',v:'Otros Gastos-53'},
{k:'54',v:'Impuesto de Renta y Complementario -54'},

{k:'61',v:'Costos de Venta y Servicios -61'},
{k:'62',v:'Costos de Venta y Servicios -62'},
];
$V.accComp=$V.gfiPdcGr;
$V.accSysType=[
{k:'A',v:'Anticipo Clientes / Proveedores'},
{k:'B',v:'Cuentas por Cobrar / Pagar'}
];

$V.accCls=[
{k:'A',v:'Activo'},
{k:'P',v:'Pasivo'},
{k:'PT',v:'Patrimonio'},
{k:'I',v:'Ingresos'},
{k:'G',v:'Gastos'},
{k:'C',v:'Costos'},
{k:'O',v:'Otros'}
];
$V.accGrA=[
{k:'bank',v:'Efectivo y Equivalente -11'},
{k:'inver',v:'Inversiones -12'},
{k:'cxc',v:'Cuentas por Cobrar -13'},
{k:'ivt',v:'Inventarios -14'},
{k:'activos',v:'Planta y Equipo -15'},
{k:'intangible',v:'Intagibles -16'},
{k:'actNOFIN',v:'Otros Activos no Financieros -17'},
{k:'impGAN',v:'Impuestos a las Ganancias -18'},
{k:'actFIN',v:'Otros Activos Financieros -19'}
];
$V.accGrP=[
{k:'pasFIN',v:'Pasivos Financieros -21'},
{k:'cxp',v:'Proveedores -22'},
{k:'cxpAcre',v:'Acreedores Comerciales -23'},
{k:'imp',v:'Pasivos por Impuestos -24'},
{k:'empBen',v:'Beneficios a Empleados -25'},
{k:'provision',v:'Pasivos Estimados -26'},
{k:'pasDif',v:'Diferidos -27'},
{k:'pasNOFIN',v:'Pasivos No Financieros -28'},
{k:'pasBonos',v:'Bonos y papeles comerciales -29'}
];
$V.accGrPT=[
{k:'capital',v:'Capital social -31'},
{k:'capAvit',v:'Superávit de capital -32'},
{k:'capRes',v:'Reservas -33'},
{k:'capRevPat',v:'Revalorización del patrimonio -34'},
{k:'capDiv',v:'Dividendos -35'},
{k:'capEje',v:'Resultado Ejercicio -36'},
{k:'capEjeAnt',v:'Resultado Ejercicios Anteriores -37'},
{k:'capValor',v:'Superávit por valorizaciones -38'},
{k:'capFiscal',v:'Afectaciones fiscales de ingresos y gastos -39'}
];
$V.accGrI=[
{k:'ing',v:'Ingresos Operacionales -41'},
{k:'ingNOP',v:'Ingresos NO Operacionales -42'},
{k:'ingGAN',v:'Ganancias -43'},
{k:'ingFIS',v:'Ingresos Fiscales -44'},
];
$V.accGrE=[
{k:'gAdmon',v:'Gastos Administrativos -51'},
{k:'gVenta',v:'Gastis de Ventas -52'},
{k:'gOtros',v:'Otros Gastos-53'},
{k:'gRenta',v:'Impuesto de Renta y Complementario -54'}
];
$V.accGrC=[
{k:'cVenta',v:'Costos de Venta y Servicios -61'},
];

$oB.pus('gvtSdn',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtSdn',tr:T.P.docEntry}); }}]);
$oB.pus('gvtSin',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtSin',tr:T.P.docEntry}); }}]);
$oB.pus('gvtSrd',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtSrd',tr:T.P.docEntry}); }}]);
$oB.pus('gvtSnc',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtSnc',tr:T.P.docEntry}); }}]);
$oB.pus('gvtSnd',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtSnd',tr:T.P.docEntry}); }}]);


$oB.pus('gvtRcv',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtRcv',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPdn',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPdn',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPin',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPin',tr:T.P.docEntry}); }}]);
$oB.pus('gvtRce',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtRce',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPrd',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPrd',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPnd',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPnd',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPnc',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPnc',tr:T.P.docEntry}); }}]);



$M.li['acc.itmGr']={t:'Grupo de Artículos - Contables',kau:'sysd.suadmin', func:function(){ 
	btn=$1.T.btnFa({fa:'faBtnCt fa_plusCircle',textNode:'Nuevo Grupo',func:function(){ $M.to('acc.itmGr.form'); }})
	$M.Ht.ini({btnNew:btn,func_filt:'acc.itmGr',func_pageAndCont:$Acc.ItmGr.get}); 
}};
$M.li['acc.itmGr.form']={t:'Grupo de Artículo - Contable',kau:'sysd.suadmin', func:function(){ $M.Ht.ini({func_cont:$Acc.ItmGr.form}); }};
$M.li['accAfGr']={t:'Grupos de Activos',kau:'sysd.suadmin', func:function(){ 
	btn=$1.T.btnFa({fa:'faBtnCt fa_plusCircle',textNode:'Nuevo Grupo',func:function(){ $M.to('accAfGr.form'); }});
	$M.Ht.ini({btnNew:btn,func_filt:'accAfGr',func_pageAndCont:$Acc.AfGr.get}); 
}};
$M.li['accAfGr.form']={t:'Grupo de Activo',kau:'sysd.suadmin', func:function(){ $M.Ht.ini({func_cont:$Acc.AfGr.form}); }};

$M.li['acc.pdc']={t:'Plan de Cuentas',kau:'acc.pdc', func:function(){ 
	$M.Ht.ini({func_cont:$Acc.Pdc.get}); }};
$M.li['acc.pdc.form']={t:'Formulario de Cuenta',kau:'acc.pdc', func:function(){ $M.Ht.ini({func_cont:$Acc.Pdc.form}); }};
$M.li['acc.fdp']={t:'Formas de pago',kau:'sysd.suadmin', func:function(){ 
	btn=$1.T.btnFa({fa:'faBtnCt fa_plusCircle',textNode:'Nueva',func:function(){ $M.to('acc.fdp.form'); }})
	$M.Ht.ini({btnNew:btn,func_filt:'acc.fdp',func_pageAndCont:$Acc.Fdp.get}); }};
$M.li['acc.fdp.form']={t:'Forma de Pago',kau:'sysd.suadmin', func:function(){ $M.Ht.ini({func_cont:$Acc.Fdp.form}); }};

$M.li['acc.pym']={t:'Condiciones de pago',kau:'sysd.suadmin', func:function(){ 
	btn=$1.T.btnFa({fa:'faBtnCt fa_plusCircle',textNode:'Nueva',func:function(){ $M.to('acc.pym.form'); }});
	$M.Ht.ini({btnNew:btn,func_filt:'acc.ptm',func_pageAndCont:$Acc.Pym.get}); }
};
$M.li['acc.pym.form']={t:'Forma de Pago',kau:'sysd.suadmin', func:function(){ $M.Ht.ini({func_cont:$Acc.Pym.form}); }};

$M.li['acc.tax']={t:'Impuestos',kau:'sysd.suadmin', func:function(){ 
	btn=$1.T.btnFa({fa:'faBtnCt fa_plusCircle',textNode:'Nuevo',func:function(){ $M.to('acc.tax.form'); }});
	$M.Ht.ini({btnNew:btn,func_filt:'acc.tax',func_pageAndCont:$Acc.Tax.get}); }
};
$M.li['acc.tax.form']={t:'Impuesto',kau:'sysd.suadmin', func:function(){ $M.Ht.ini({func_cont:$Acc.Tax.form}); }};
//Todo enviado a gfi.js, omitir aqui
var $Acc={};
$Acc.ItmGr={/*Grupos Contables articulos */
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'itmGr', inputs:'itmGr=I&'+$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var Ax=$V.accItmGr;
			var Ths=['','Nombre Grupo'];
			for(var i in Ax){
				var Lt={textNode:Ax[i].v};
				if(Ax[i].k=='accBuyRem'){
					Lt._iHelp='Usada para entrada de mercancia (CR) y devolución de mercancia (DB)';
				}
				else if(Ax[i].k=='accAwh'){
					Lt._iHelp='Usada para documentos de ajuste de inventario';
				}
				Ths.push(Lt);
			}
			var tb=$1.T.table(Ths); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to('acc.itmGr.form','accgrId:'+L.accgrId,'r')},td);
				var td=$1.t('td',{textNode:L.accgrName},tr);
				for(var i in Ax){ var ka=Ax[i].k;
					var val=(L[ka+'Code'])?L[ka+'Code']+' '+L[ka+'Name']:'';
					$1.t('td',{textNode:val},tr);
				}
			}
		}
	}});
},
form:function(){
	var cont=$M.Ht.cont; Pa=$M.read();
	var vPost=(Pa.accgrId)?'accgrId='+Pa.accgrId:'';
	$Api.get({f:Api.Acc.b+'itmGr/form',loadVerif:!Pa.accgrId, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Nombre Grupo Artículos',I:{tag:'input',type:'text',name:'accgrName',value:Jr.accgrName,'class':jsF +' __wid'}},cont);
		var wid=$1.q('.__wid',divL);
		if(Pa.accgrId){ $Api.JS.addAJs(wid,{accgrId:Pa.accgrId}); }
		$Api.JS.addAJs(wid,{itmGr:'I'});
		var tb=$1.T.table(['Cuenta','Número']); cont.appendChild(tb);
		var tBody=$1.t('tbody',0,tb);
		var Accs=$V.accItmGr;
		for(var i in Accs){ var L=Accs[i];
		var vid=Jr[L.k]; var vname=Jr[L.k+'Name'];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.v},tr);
			var td=$1.t('td',0,tr);
			var tD={};
			var tag=$Acc.Fx.boxAcc({value:vname,D:{accId:vid,accName:vname},jsF:$Api.JS.clsL1});
			td.appendChild(tag);
		}
		resp=$1.t('div',0,cont);
		$Api.send({PUT:Api.Acc.b+'itmGr/form',loade:resp,jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(o && o.accGrId){
				$Api.JS.defAJs(wid,{accgrId:o.accgrId});
				$oB.upd({k:o.accgrId,v:o.accgrName},$Tb.oiac);
			}
		}},cont);
	}});
}
}
$Acc.AfGr={/*Grupos Contables articulos */
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'itmGr', inputs:'itmGr=AF&'+$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var Ax=$V.accAfGr;
			var Ths=['','Nombre Grupo'];
			for(var i in Ax){ Ths.push(Ax[i].v); }
			var tb=$1.T.table(Ths); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to('accAfGr.form','accgrId:'+L.accgrId,'r')},td);
				var td=$1.t('td',{textNode:L.accgrName},tr);
				for(var i in Ax){ var ka=Ax[i].k;
					var val=(L[ka+'Code'])?L[ka+'Code']+' '+L[ka+'Name']:'';
					$1.t('td',{textNode:val},tr);
				}
			}
		}
	}});
},
form:function(){
	var cont=$M.Ht.cont; Pa=$M.read();
	var vPost=(Pa.accgrId)?'accgrId='+Pa.accgrId:'';
	$Api.get({f:Api.Acc.b+'itmGr/form',loadVerif:!Pa.accgrId, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Nombre Grupo Artículos',I:{tag:'input',type:'text',name:'accgrName',value:Jr.accgrName,'class':jsF +' __wid'}},cont);
		var wid=$1.q('.__wid',divL);
		if(Pa.accgrId){ $Api.JS.addAJs(wid,{accgrId:Pa.accgrId}); }
		$Api.JS.addAJs(wid,{itmGr:'AF'});
		var tb=$1.T.table(['Cuenta','Número']); cont.appendChild(tb);
		var tBody=$1.t('tbody',0,tb);
		var Accs=$V.accAfGr;
		for(var i in Accs){ var L=Accs[i];
		var vid=Jr[L.k]; var vname=Jr[L.k+'Name'];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.v},tr);
			var td=$1.t('td',0,tr);
			var tD={};
			var tag=$Acc.Fx.boxAcc({value:vname,D:{accId:vid,accName:vname},jsF:$Api.JS.clsL1});
			td.appendChild(tag);
		}
		resp=$1.t('div',0,cont);
		$Api.send({PUT:Api.Acc.b+'itmGr/form',loade:resp,jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(o && o.accGrId){
				$Api.JS.defAJs(wid,{accgrId:o.accgrId});
				$oB.upd({k:o.accgrId,v:o.accgrName},$Tb.oiac);
			}
		}},cont);
	}});
}
}
$Acc.Pdc={
wList:'__accPdc_wList',
wEdit:'__accPdc_wEdit',
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'pdc', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var wList=$1.t('div',{'class':$Acc.Pdc.wList,style:'width:420px; overflow:auto; border-right:0.0625rem solid #000; float:left;'},cont);
			var wEdit=$1.t('div',{'class':$Acc.Pdc.wEdit,style:'float:left; display:table-cell; padding-left:0.25rem;'},cont);
			var Li=[];
			for(var i in Jr.L){
				Li.push($Acc.Pdc.addLv(Jr.L[i]));
			}
			Uli.ini({folIcon:'N',openText:'Y',Li:Li,liFunc:function(){  }},wList);
		}
		cont.appendChild($1.t('clear'));
	}});
},
addLv:function(L,aD){
	var wList=$1.q('.'+$Acc.Pdc.wList);
	var wEdit=$1.q('.'+$Acc.Pdc.wEdit);
	var lName=(L.accCode)?L.accCode+' ':''; lName += L.accName;
	var Inode=$1.t('span',0);
	if(L.lvel>0 && L.sysAcc!='Y'){
		$1.t('a',{'class':'fa fa-pencil',L:L},Inode).onclick=function(){ $Acc.Pdc.form(this.L,wEdit); }
		}
	if(L.lvType=='T'){
		var Ld={fatherAcc:L.accId,accClass:L.accClass};
		$1.t('a',{'class':'fa fa_plusCircle',L:Ld},Inode).onclick=function(){ $Acc.Pdc.form(this.L,wEdit); }
	}
	Li={folId:L.accId,fatherId:L.fatherAcc,folName:lName,InodeAft:Inode};
	if(aD){
		Li.liOpen='Y'; /*abrir el nuevo */
		Li.btnPlus='N';
		Li.liReplace='Y';
		Uli.addFol({folIcon:'N',openText:'Y',Li:[Li],liFunc:function(){  }},wList);
	}
	else{ return Li; }
},
liAdd:function(L,cont){
	var wList=$1.q('.__accPdp_wList',cont);
	Li={folId:L.accId,fatherId:L.fatherAcc,folName:L.accName,InodeAft:false};
	Uli.fold({folIcon:'N',open:'Y',openText:'Y',Li:Li,liFunc:function(){  }},wList);
},
form:function(Pa,cont){
	var cont=(cont)?cont:$M.Ht.cont; $1.clear(cont);
	var Pa=(Pa)?Pa:$M.read();
	var vPost=(Pa.accId)?'accId='+Pa.accId:'';
	$Api.get({f:Api.Acc.b+'pdc/form',loadVerif:!Pa.accId, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		if(Jr.accId){ Pa=Jr; }
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'accId'},cont);
		if(Pa.accId){ hid.value=Pa.accId; }
		hid.AJs={fatherAcc:Pa.fatherAcc};
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Nivel',req:'Y',I:{tag:'select',name:'lvType','class':jsF,opts:$V.accLvType,selected:Jr.lvType}},cont);
		$1.T.divL({wxn:'wrapx2',L:'Grupo',I:{tag:'select',name:'comp','class':jsF,opts:$V['accGr'+Pa.accClass],selected:Jr.comp}},divL);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx1',L:'Nombre',req:'Y',I:{tag:'input',type:'text',name:'accName',value:Jr.accName,'class':jsF}},cont);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Código Cuenta',I:{tag:'input',type:'text',name:'accCode',value:Jr.accCode,'class':jsF}},cont);
		$1.T.divL({wxn:'wrapx2',L:'Categoria',I:{tag:'select',name:'sysType','class':jsF,opts:$V.accSysType,selected:Jr.sysType}},divL);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Situación Financiera',I:{tag:'select',name:'balType','class':jsF,opts:$TbV.gfiPdcBalType,selected:Jr.balType}},cont);
		$1.T.divL({wxn:'wrapx4',L:'Pérdidas y Ganancias',I:{tag:'select',name:'erType','class':jsF,opts:$TbV.gfiPdcErType,selected:Jr.erType}},divL);
		resp=$1.t('div',0,cont);
		var Ds={POST:Api.Acc.b+'pdc/form',loade:resp,jsBody:cont, func:function(Jr2,o){
			if(o && o.accId){
				$Acc.Pdc.addLv(o,true);
			}
			$Api.resp(resp,Jr2);
		}};
		if(Pa.accId){ Ds.PUT=Ds.POST; delete(Ds.POST); }
		$Api.send(Ds,cont);
	}});
},
viewSel:function(P,pare){
	var winId='accPdcViewSelId';
	var cont=$1.t('div',0,pare);
	$Api.get({f:Api.Acc.b+'pdc', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var Li=[];
			for(var i in Jr.L){ L=Jr.L[i];
			var lName=(L.accCode)?L.accCode+' ':''; lName += L.accName;
			var Inode=$1.t('span',0);
				Li.push({folId:L.accId,fatherId:L.fatherAcc,folName:lName,InodeAft:Inode});
			}
			
			Uli.ini({folIcon:'N',openText:'Y',Li:Li,func:P.func},cont);
		}
	}});
	if(!pare){ pare=$1.Win.open(cont,{winId:winId,winTitle:'Seleccione Cuenta',onBody:1,winSize:'medium'}); }
	else{ cont.setAttribute('id',winId); }
},
}
$Acc.Pdc.format=function(L,df){
	var df=(df)?df:'N/D';
	var val=(L.accCode)?L.accCode+' '+L.accName:df;
	return val
}

$Acc.Fdp={
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'fdp', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','Código','Nombre','Tipo','Medio Pago','Cuenta']); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to('acc.fdp.form','fpId:'+L.fpId,'r')},td);
				$1.t('td',{textNode:L.fpCode},tr);
				$1.t('td',{textNode:L.fpName},tr);
				$1.t('td',{textNode:_g(L.cType,$V.gfiFdPType)},tr);
				$1.t('td',{textNode:_g(L.fpMethod,$V.AccFpMethod)},tr);
				$1.t('td',{textNode:$Acc.Pdc.format(L)},tr);
			}
		}
	}});
},
form:function(){
	var cont=$M.Ht.cont; Pa=$M.read();
	var vPost=(Pa.fpId)?'fpId='+Pa.fpId:'';
	$Api.get({f:Api.Acc.b+'fdp/form',loadVerif:!Pa.fpId, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.Cls.a;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'fpId'},cont);
		if(Pa.fpId){ hid.value=Pa.fpId; }
		var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Código',I:{tag:'input',type:'text',name:'fpCode',value:Jr.fpCode,'class':jsF}},cont);
		$1.T.divL({wxn:'wrapx4',L:'Nombre',I:{tag:'input',type:'text',name:'fpName',value:Jr.fpName,'class':jsF}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Medio de Pago',I:{tag:'select',name:'fpMethod','class':jsF+' __met',opts:$V.AccFpMethod,selected:Jr.fpMethod}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Tipo',I:{tag:'select',name:'cType','class':jsF,opts:$V.gfiFdPType,selected:Jr.cType}},divL);
		var val=(Jr.accName)?Jr.accCode+' '+Jr.accName:'';
		var tag=$Acc.Fx.boxAcc({value:val,D:Jr,jsF:jsF});
		$1.T.divL({wxn:'wrapx4',L:'Cuenta Contable',Inode:tag},divL);
		resp=$1.t('div',0,cont);
		var PS={POST:Api.Acc.b+'fdp/form',loade:resp,jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && o.fpId){
				hid.value=o.fpId;
				$oB.upd({k:o.fpId,v:o.fpName},$Tb.gfiOfdp);
				$M.to('acc.fdp.form','fpId:'+o.fpId);
			}
		}};
		if(Pa.fpId){ PS.PUT=PS.POST; delete(PS.POST); }
		$Api.send(PS,cont);
	}});
}
}

$Acc.Tax={
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'tax', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','Código','Nombre','Tipo','Tarifa Numero','C. Ventas','C. Compras']); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to('acc.tax.form','vatId:'+L.vatId,'r')},td);
				$1.t('td',{textNode:L.taxCode},tr);
				$1.t('td',{textNode:L.taxName},tr);
				$1.t('td',{textNode:_g(L.taxType,$V.gfiTaxType)},tr);
				$1.t('td',{textNode:L.rate*1},tr);
				$1.t('td',{textNode:$Acc.Pdc.format({accCode:L.sellCode,accName:L.sellName})},tr);
				$1.t('td',{textNode:$Acc.Pdc.format({accCode:L.buyCode,accName:L.buyName})},tr);
			}
		}
	}});
},
form:function(){
	var cont=$M.Ht.cont; Pa=$M.read();
	$Api.get({f:Api.Acc.b+'tax/form',loadVerif:!Pa.vatId, inputs:'vatId='+Pa.vatId,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'vatId'},cont);
		if(Pa.vatId){ hid.value=Pa.vatId; }
		var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Código',I:{tag:'input',type:'text',name:'taxCode',value:Jr.taxCode,'class':jsF}},cont);
		$1.T.divL({wxn:'wrapx8',L:'Nombre',I:{tag:'input',type:'text',name:'taxName',value:Jr.taxName,'class':jsF}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Tasa número',I:{tag:'input',type:'number',inputmode:'numeric','class':jsF,name:'rate',value:Jr.rate,jsF,min:0,placeholder:'0.004'}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Tipo',I:{tag:'select',opts:$V.gfiTaxType,selected:Jr.taxType,name:'taxType',value:Jr.taxType,'class':jsF}},divL);
		var val=(Jr.sellName)?Jr.sellCode+' '+Jr.sellName:'';
		var tag=$Acc.Fx.boxAcc({value:val,D:{accId:Jr.sellAcc,accCode:Jr.sellCode,accName:Jr.sellName},jsF:$Api.JS.clsL1});
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Cuenta Ventas',Inode:tag},cont);
		var val=(Jr.buyName)?Jr.buyCode+' '+Jr.buyName:'';
		var tag=$Acc.Fx.boxAcc({value:val,D:{accId:Jr.buyAcc,accCode:Jr.buyCode,accName:Jr.buyName},jsF:$Api.JS.clsL1});
		$1.T.divL({wxn:'wrapx4',L:'Cuenta Compras',Inode:tag},divL);
		resp=$1.t('div',0,cont);
		var sD={POST:Api.Acc.b+'tax/form',loade:resp,jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(o && o.vatId){
				hid.value =o.vatId;
				if(o.taxType=='rte'){
					$oB.upd({k:o.vatId,v:o.taxName},$Tb.otaxR);
				}
				else if(o.taxType=='iva'){
					$oB.upd({k:o.vatId,v:o.taxName},$Tb.otaxI);
				}
				else if(o.taxType=='rteIva'){
					$oB.upd({k:o.vatId,v:o.taxName},$Tb.gfiTaxRiva);
				}
				else if(o.taxType=='rteIca'){
					$oB.upd({k:o.vatId,v:o.taxName},$Tb.gfiTaxIca);
				}
			}
		}};
		if(Pa.vatId){ sD.PUT=sD.POST; delete(sD.POST); }
		$Api.send(sD,cont);
	}});
},
sel:function(pymId,q){
	var tv=$oB.get(pymId,$Tb.gfiOpym,{});
	var fis=$1.q('.'+$Acc.Pym.cls,cont,'all');
	for(var i=0; i<fis.length; i++){
	}
}
}

$Tb._i({kObj:'gfiOcdc',
liK:'itmTb',liTxtG:'Centros de Costo',liTxtF:'Centro de Costo (Form)',
Cols:[
{t:'Código',k:'cdcCode',divLine:1,wxn:'wrapx8',T:{tag:'input'}},
{t:'Nombre',k:'cdcName',wxn:'wrapx4',T:{tag:'input'}}
]
});
$Tb._i({kObj:'gfiOpym',
liK:'itmTb',liTxtG:'Condiciones de Pago',liTxtF:'Condición de Paga (Form)',
Cols:[
{t:'Código',k:'pymCode',divLine:1,wxn:'wrapx8',T:{tag:'input'}},
{t:'Nombre',k:'pymName',wxn:'wrapx4',T:{tag:'input'}},
{t:'Plazo Dias',k:'extraDays',wxn:'wrapx8',T:{tag:'number'}},
{t:'% Desc. pronto pago',k:'payBefDisc',wxn:'wrapx8',T:{tag:'number'}},
{t:'Detalles Pronto Pago',k:'payBefMemo',divLine:1,wxn:'wrapx1',T:{tag:'input'}},
]
});


$M.li['xl.uploadFile']={t:'XL - uploadFile',kau:'sysd.suadmin', func:function(){ 
	$M.Ht.ini({func_cont:function(){
	var cont=$M.Ht.cont; var jsF='jsFields';
	$Stor.svr='http://api0.admsistems.com/xl/pubapps/uploadFile';
	$Stor.btn({func:function(Jr){
		var wc=$Stor.Dw.html(Jr,cont);
		$Stor.Dw.conv(wc);
	}},cont);
	}});
}};
$Acc={};
$Acc.Txt={
fName:function(L){
	var t=(L.accCode)?L.accCode+' ':'';;
	t +=(L.accName)?L.accName:'';
	return t;
}
};
$Acc.Fx={
boxAcc:function(P,cont){
	P.jsVB=(P.jsVB)?P.jsVB:['accId','accName'];
	var tag=$1.lTag(P,null,{funcTag:function(Px){
		if(!P.vSea){ P.vSea='lvType=D'; }
		else{ P.vSea='lvType=D&'+P.vSea; }
		P.api=Api.Acc.b+'sea/pdc';
		P.D=Px.D;
		P['class']=P.jsF;
		P.func=function(R,inp){
			inp.value = R.accCode+' '+R.accName;
		};
		return $Api.Sea.box(P,cont);
	}});
	return tag;
}
};