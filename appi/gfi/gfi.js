
Api.Acc={b:'/a/acc/'};
Api.Gfi={b:'/a/acc/',pr:'/appi/private/gfi/'};

$V.Mdls.gfi={t:'Finanzas',ico:'fa fa-bank'};

$TbV.gfiPdcBalType=[
{k:1,v:'Activo Corriente',P:'A',prp1:'A',prp2:'AC'},
{k:2,v:'Activo No Corriente',P:'A',prp1:'A',prp2:'ANC'},
{k:3,v:'Otros Activos',P:'A',prp1:'A',prp2:'OACT'},

{k:4,v:'Pasivo Corriente',P:'P',prp1:'PAS',prp2:'PC'},
{k:5,v:'Pasivo No Corriente',P:'P',prp1:'PAS',prp2:'PNC'},
{k:6,v:'Otros Pasivos',P:'P',prp1:'PAS',prp2:'OPAS'},

{k:7,v:'Capital Social',prp1:'PAT',prp2:'P'},
{k:7,v:'Utilidades',P:'C',prp1:'PAT',prp2:'P'}
];
$TbV.gfiPdcErType=[
{k:1,v:'Ventas'},{k:2,v:'- Devoluciones'},{k:3,v:'- Descuentos'},
{k:4,v:'- Costo de Ventas'},{k:5,v:'- Costo Producción'},
{k:11,v:'- Gastos Operacionales'},{k:6,v:'- Gastos Admón.'},{k:7,v:'- Gastos Ventas'},
{k:8,v:'- Gastos Financieros'},
{k:9,v:'+ Ingresos No Operacionales'},{k:10,v:'- Gastos No Operacionales'},
{k:10,v:'Otros'}
];

$V.gfiFdPType=[{k:"G","v":"General"},{k:"C",v:"Clientes"},{k:"P",v:"Proveedor"},{k:"O",v:"Otros"}];
$V.gfiNature=[{k:'D',v:'Débito'},{k:'C',v:'Crédito'}];
$V.gfiAccClass=[{k:'A',v:'Activo'},{k:'P',v:'Pasivo'},{k:'PT',v:'Patrimonio'},{k:'I',v:'Ingreos'},{k:'E',v:'Egresos'},{k:'O',v:'Otros'},];
$V.gfiAccCateg=[{k:'BG',v:'Situación Financiera'},{k:'ER',v:'Estado Resultados'},{k:'O',v:'Otros'}]
$V.gfiTaxType=[{k:'iva',v:'IVA'},{k:'rteIva',v:'Rte. IVA'},{k:'rte',v:'Rte. Fuente'},{k:'rteIca',v:'Rte. ICA'},{k:'ico',v:'Impo. Consumo'}];
$V.gfiAccLcType=[{k:'T',v:'Titulo'},{k:'D',v:'Detalle'}];
$V.gfiAccItmGr=[{k:'accSell',v:'Ventas'},{k:'accIvt',v:'Inventarios'},{k:'accCost',v:'Costos'},{k:'accRdn',v:'Devoluciones'},{k:'accBuyRem',v:'Remisión Compras'},{k:'accAwh',v:'Ajuste Inventario'}];
$V.gfiAccAfGr=[{k:'accBuy',v:'Valor Compra'},
{k:'accDep',v:'Depreciación'},{k:'accGasDep',v:'Gasto Depreciación'},
{k:'accDepNiif',v:'Depreciación NIIF'},{k:'accGasDepNiif',v:'Gasto Depreciación NIIF'}
];
$V.gfiAccSysCode={ivaVentas:'IVA Ventas',autoRenta23:'Autorenta 23',autoRenta13:'Autorenta 13',rteIvaVentas:'Rte. IVA Ventas'};
$V.gfiFdpMethod=[{k:'TIB',v:'Transferencia Interbancaria'},{k:'TBA',v:'Transferencia Bancaria'},
{k:'EFE',v:'Efectivo'},{k:'CHE',v:'Cheque'},
{k:'TDE',v:'T. Débito'},{k:'TCR',v:'T. Crédito'},{k:'CRE',v:'Crédito'},{k:'OTR',v:'Otros'},
/*{k:'PSE',v:'PSE'},{k:'PDP',v:'Pasarela Pagos'} */
];

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
///$V.accComp=$V.gfiPdcGr;
$V.gfiAccSysType=[
{k:'A',v:'Anticipo Clientes / Proveedores'},
{k:'B',v:'Cuentas por Cobrar / Pagar'},
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
{k:'cCompra',v:'Costos de Compras -62'},
];

_Fi['finRep.cxc']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Vence Despues',subText:'Fecha mayor a ',I:{tag:'date','class':jsV,name:'date1'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Vence Antes',I:{tag:'date','class':jsV,name:'date2',value:$2d.days7}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Listado Por',I:{tag:'select','class':jsV,name:'gby',opts:$V.gfiAccListView,optOmit:'cardId',noBlank:'Y'}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Tercero',Inode:$1.lTag({tag:'crd',jsF:jsV})},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.Rep.cxc});
	wrap.appendChild(btnSend);
};
_Fi['finRep.estadcuenta']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Saldo Inicial a',I:{tag:'date','class':jsV,name:'date1'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Saldo Final a',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Tercero',Inode:$1.lTag({tag:'crd',jsF:jsV})},divL);
	$1.T.btnSend({textNode:'Actualizar', func:Gfi.Rep.estadcuenta},wrap);
};
_Fi['gfiBan']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Corte',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},wrap);
	$1.T.btnSend({textNode:'Actualizar', func:Gfi.Ban.get},wrap)
};
_Fi['gfiBan.history']=function(wrap){
	var jsV = 'jsFiltVars'; Pa=$M.read();
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Cuenta',I:{tag:'select','class':jsV,name:'A.accId',opts:$Tb.gfiPdcBank,selected:Pa.accId}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Fecha',I:{tag:'date','class':jsV,name:'date1'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Fecha Corte',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:Gfi.Ban.history},wrap)
};

var Gfi={};
Gfi.Rep={
cxc:function(){
	var cont=$M.Ht.cont;
	var vPost='cardType=C&'+$Api.getFilter();
	$Api.get({f:Api.Gfi.b+'accRep/cxc',inputs:vPost,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep=[
		['Identificación',{k:'licTradNum'}],
		['Tercero',{k:'cardName'}],
		['Documento',{k:'docNum',_fNode:$Doc.docNumTr}],
		['Centro Costo',{k:'cdcId',_gTb:'gfiOcdc'}],
		['Facturado',{_A:1, k:'docTotal',format:'$'}],
		['Saldo',{_A:1, k:'balDue',format:'$'}],
		['Fecha',{k:'docDate'}],
		['Vencimiento',{k:'dueDate'}],
		['Dias',{k:'dueDate',fText:function(L){ return $2d.diff({date1:L.dueDate,date2:$2d.today}); }}]
		];
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
		$1.t('h5',{textNode:'Diseñado por ADM Sistems - Generado desde unClicc'},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Cartera'});
		cont.appendChild(tb)
	}});
},
cxp:function(){
	var cont=$M.Ht.cont;
	var vPost='cardType=S&'+$Api.getFilter();
	$Api.get({f:Api.Gfi.b+'accRep/cxc',inputs:vPost,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep=[
		['Identificación',{k:'licTradNum'}],
		['Tercero',{k:'cardName'}],
		['Documento',{k:'docNum',_fNode:$Doc.docNumTr}],
		['Centro Costo',{k:'cdcId',_gTb:'gfiOcdc'}],
		['Facturado',{_A:1, k:'docTotal',format:'$'}],
		['Saldo',{_A:1, k:'balDue',format:'$'}],
		['Fecha',{k:'docDate'}],
		['Vencimiento',{k:'dueDate'}],
		['Dias',{k:'dueDate',fText:function(L){ return $2d.diff({date1:L.dueDate,date2:$2d.today}); }}]
		];
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
		$1.t('h5',{textNode:'Diseñado por ADM Sistems - Generado desde unClicc'},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Cartera'});
		cont.appendChild(tb)
	}});
},
estadcuenta:function(){
	var cont=$M.Ht.cont;
	var vPost=$Api.getFilter();
	$Api.get({f:Api.Gfi.b+'accRep/estadcuenta',inputs:vPost,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep=[
		['Documento',{k:'docNum',_fNode:$Doc.docNumTr}],
		['Centro Costo',{k:'cdcId',_gTb:'gfiOcdc'}],
		['Fecha',{k:'docDate'}],
		['Vencimiento',{k:'dueDate'}],
		['Débito',{_A:1, k:'debBal',format:'$'}],
		['Crédito',{_A:1, k:'creBal',format:'$'}],
		['Saldo',{_A:1, k:'balAt',format:'$'}],
		['Saldo Pendiente',{_A:1, k:'balDue',format:'$'}],
		['Dias Venc.',{k:'dueDate',fText:function(L){
			if(L.balDue>0){ return $2d.diff({date1:L.dueDate,date2:$2d.today}); }
			else{ return ''; }
		}}]
		];
		var css1='backgroundColor:#DDD';
		var TbD=$Doc.colsTable(Jr.L,Rep);
		var tbc=$1.t('div');
		var tb=$1.T.table(TbD.Tb,0,tbc);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		var tr=$1.t('tr',0,tBody);
		var creditLine =Jr.creditLine *=1;
		var txt=(Jr.date1!='0000-00-00')?' al '+$2d.f(Jr.date1,'d mmm'):' (Sin Fecha)';
		$1.t('td',{textNode:'Cupo Autorizado',style:css1},tr);
		$1.t('td',{textNode:$Str.money(creditLine),style:css1},tr);
		$1.t('td',{textNode:'Saldo Inicial'+txt,colspan:4,style:css1},tr);
		$1.t('td',{textNode:$Str.money(Jr.balIni),style:css1},tr);
		$1.t('td',{colspan:2,style:css1},tr);
		var lastDate='';
		var balEnd=Jr.balIni*1;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			if(L.debBal){ balEnd+=L.debBal*1; creditLine -=L.debBal*1; }
			if(L.creBal){ balEnd -=L.creBal*1; creditLine +=L.creBal*1; }
			L.balAt=balEnd;

			for(var k in Rep){ var Lk=Rep[k][1];
				var lTag={textNode:L[k]};
				if(Lk){ lTag=$1.setTag(Lk,L); }
				$1.t('td',lTag,tr);
			}
		}
		var tr=$1.t('tr',0,tBody);
		var txt=(Jr.date2!='9999-12-31')?' al '+$2d.f(Jr.date2,'d mmm'):' (Todo)';
		$1.t('td',{textNode:'Cupo Disp.',style:css1},tr);
		$1.t('td',{textNode:$Str.money(((creditLine>Jr.creditLine)?Jr.creditLine:creditLine)),style:css1},tr);
		$1.t('td',{textNode:'Saldo Final'+txt,colspan:4,style:css1},tr);
		$1.t('td',{textNode:$Str.money(balEnd),title:balEnd,style:css1},tr);
		$1.t('td',{colspan:2,style:css1},tr);
		if($VH.softRepXLS){ tbc.appendChild($VH.softRepXLS); }
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Estado de Cuenta '+Jr.cardName});
		cont.appendChild(tb)
	}});
},
ing:function(){
	$Api.Rep.base({f:Api.Gfi.b+'accRep/ing',inputs:$1.G.filter(),
		Totals:{t:'Totales',tn:2},
		V_C:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeI},
		],
		V_DAY:[
			{f:'debBal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',k:'payType',_g:$V.gfiPayTypeI},
			{t:'Fecha',k:'docDate'},
		],
		V_CC:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeI},
			{t:'Tercero',f:'cardName'},
		],
		V_CDAY:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeI},
			{t:'Fecha',f:'docDate'},
			{t:'Tercero',f:'cardName'},
		],
		V_LC:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeI},
			{t:'Categoria',f:'lineClass',_g:$Tb.gfiOtie,_gDef:'NA'},
			],
		V_DOC:[
		{f:'bal',t:'Total',fType:'$',totals:'Y'},
		{t:'Tipo',f:'payType',_g:$V.gfiPayTypeI},
		{t:'Categoria',f:'lineClass',_g:$Tb.gfiOtie,_gDef:'NA'},
		{t:'Documento',f:'docEntry',fText:(L)=>{ L.tt='gvtRcv'; return $Doc.docNumTr(L); }},
		{t:'Tercero',f:'cardName'},
		{t:'Fecha',f:'docDate'}
		],
	});
},
egr:function(){
	$Api.Rep.base({f:Api.Gfi.b+'accRep/egr',inputs:$1.G.filter(),
		Totals:{t:'Totales',tn:2},
		V_C:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeG},
		],
		V_DAY:[
			{f:'debBal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',k:'payType',_g:$V.gfiPayTypeG},
			{t:'Fecha',k:'docDate'},
		],
		V_CC:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeG},
			{t:'Tercero',f:'cardName'},
		],
		V_CDAY:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeG},
			{t:'Fecha',f:'docDate'},
			{t:'Tercero',f:'cardName'},
		],
		V_LC:[
			{f:'bal',t:'Total',fType:'$',totals:'Y'},
			{t:'Tipo',f:'payType',_g:$V.gfiPayTypeG},
			{t:'Categoria',f:'lineClass',_g:$Tb.gfiOtie,_gDef:'NA'},
			],
		V_DOC:[
		{f:'bal',t:'Total',fType:'$',totals:'Y'},
		{t:'Tipo',f:'payType',_g:$V.gfiPayTypeG},
		{t:'Categoria',f:'lineClass',_g:$Tb.gfiOtie,_gDef:'NA'},
		{t:'Documento',f:'docEntry',fText:(L)=>{ L.tt='gvtRce'; return $Doc.docNumTr(L); }},
		{t:'Tercero',f:'cardName'},
		{t:'Fecha',f:'docDate'}
		],
	});
}
}
Gfi.Ban={
	OLg:function(L){
		var Li=[]; var n=0;
		var ab=new $Doc.liBtn(Li,L,{api:Api.Gvt.js+'sin',tbSerie:'gvtSin'});
		Li.push({ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtSin','v',T.P,1); } });
		return $Opts.add('gfiBan',Li,L);;
	},
	opts:function(P,pare){
		Li={Li:Gfi.Ban.OLg($js.clone(P.L)),PB:P.L,textNode:P.textNode};
		var mnu=$1.Menu.winLiRel(Li);
		if(pare){ pare.appendChild(mnu); }
		return mnu;
	},
	get:function(){
		var cont=$M.Ht.cont;
		var Cols=[
		{H:'Cuenta',k:'accName'},
		{H:'Saldo',k:'bal',kTy:'price'}
		];
		$Doc.tbList({api:Api.Acc.b+'ban',inputs:$1.G.filter(),
		docTo:(L)=>{
			return $M.to('gfiBan.history','accId:'+L.accId,'r');	
		},view:'N',tbSerie:'N',
		TD:Cols,
		tbExport:{ext:'xlsx',fileName:'Saldo Cuentas Bancarias'}
		},cont);
	},
	history:function(){
		var cont=$M.Ht.cont; Pa=$M.read();
		var Cols=[
		{H:'Fecha',k:'docDate'},
		{H:'Cuenta',k:'accId',_g:$Tb.gfiPdcBank},
		{H:'Origen',fTag:$Doc.docNumTr},
		{H:'Entrada',k:'debBal',kTy:'price'},
		{H:'Salida',k:'creBal',kTy:'price'},
		];
		$Doc.tbList({api:Api.Acc.b+'ban/history',inputs:$1.G.filter(),view:'N',tbSerie:'N',
		TD:Cols,
		tbExport:{ext:'xlsx',fileName:'Movimiento Cuenta Bancaria'}
		},cont);
	},
}
Gfi.ItmGr={/*Grupos Contables articulos */
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'itmGr', inputs:'itmGr=I&'+$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var Ax=$V.gfiAccItmGr;
			var Ths=['','ID','Nombre Grupo'];
			for(var i in Ax){
				var Lt={textNode:Ax[i].v};
				if(Ax[i].k=='accBuyRem'){
					Lt._iHelp='Usada para entrada de mercancia (CR) y devolución de mercancia (DB)';
				}
				else if(Ax[i].k=='accAwh'){
					Lt._iHelp='Usada para documentos de ajuste de inventario';
				}
				else if(Ax[i].k=='accPeP'){
					Lt._iHelp='Cuenta de trabajo en curso o en proceso';
				}
				Ths.push(Lt);
			}
			var tb=$1.T.table(Ths); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to('gfiItmGr.form','accgrId:'+L.accgrId,'r')},td);
				$1.t('td',{textNode:L.accgrId},tr);
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
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Nombre Grupo Contable',I:{tag:'input',type:'text',name:'accgrName',value:Jr.accgrName,'class':jsF +' __wid'}},cont);
		var wid=$1.q('.__wid',divL);
		if(Pa.accgrId){ $Api.JS.addAJs(wid,{accgrId:Pa.accgrId}); }
		$Api.JS.addAJs(wid,{itmGr:'I'});
		var tb=$1.T.table(['Cuenta','Número']); cont.appendChild(tb);
		var tBody=$1.t('tbody',0,tb);
		var Accs=$V.gfiAccItmGr;
		for(var i in Accs){ var L=Accs[i];
		var vid=Jr[L.k]; var vname=Jr[L.k+'Name'];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.v},tr);
			var td=$1.t('td',0,tr);
			var tD={};
			var tag=Gfi.Fx.inpSea({value:vname,D:{accId:vid,accName:vname},jsF:$Api.JS.clsL1},td);
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
Gfi.AfGr={/*Grupos Contables articulos */
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'itmGr', inputs:'itmGr=AF&'+$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var Ax=$V.gfiAccAfGr;
			var Ths=['','Nombre Grupo'];
			for(var i in Ax){ Ths.push(Ax[i].v); }
			var tb=$1.T.table(Ths); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to('gfiAfGr.form','accgrId:'+L.accgrId,'r')},td);
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
		var Accs=$V.gfiAccAfGr;
		for(var i in Accs){ var L=Accs[i];
		var vid=Jr[L.k]; var vname=Jr[L.k+'Name'];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:L.v},tr);
			var td=$1.t('td',0,tr);
			var tD={};
			var tag=Gfi.Fx.boxAcc({value:vname,D:{accId:vid,accName:vname},jsF:$Api.JS.clsL1});
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
Gfi.Pdc={
wList:'__accPdc_wList',
wEdit:'__accPdc_wEdit',
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'pdc', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var wList=$1.t('div',{'class':Gfi.Pdc.wList,style:'width:420px; overflow:auto; border-right:0.0625rem solid #000; display:table-cell; verticalAlign:top'},cont);
			var wEdit=$1.t('div',{'class':Gfi.Pdc.wEdit,style:'display:table-cell; verticalAlign:top; padding-left:0.25rem;'},cont);
			var Li=[];
			Jr.L=$js.sortNum(Jr.L,{k:'lvel'});
			for(var i in Jr.L){
				Li.push(Gfi.Pdc.addLv(Jr.L[i]));
			}
			Uli.ini({folIcon:'N',openText:'Y',Li:Li,liFunc:function(){  }},wList);
		}
		cont.appendChild($1.t('clear'));
	}});
},
addLv:function(L,aD){
	var wList=$1.q('.'+Gfi.Pdc.wList);
	var wEdit=$1.q('.'+Gfi.Pdc.wEdit);
	var lName=(L.accCode)?L.accCode+' ':''; lName += L.accName;
	var Inode=$1.t('span',0);
	if(L.lvel>0 && L.sysAcc!='Y'){
		$1.t('a',{'class':'fa fa-pencil',L:L,title:'ID: '+L.accId+', fatherId:'+L.fatherId},Inode).onclick=function(){ Gfi.Pdc.form(this.L,wEdit); }
		}
	if(L.lvType=='T'){
		var Ld={fatherAcc:L.accId,accClass:L.accClass,comp:L.comp,balType:L.balType,erType:L.erType,sysType:L.sysType};
		$1.t('a',{'class':'fa fa_plusCircle',title:'ID: '+L.accId+', fatherId:'+L.fatherId,L:Ld},Inode).onclick=function(){ Gfi.Pdc.form(this.L,wEdit); }
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
	if(Jr.fatherAcc){ Pa.fatherAcc=Jr.fatherAcc; }
		hid.AJs={fatherAcc:Pa.fatherAcc};
		if(Pa.fatherAcc){
			Jr.balType=Pa.balType;
			Jr.erType=Pa.erType;
			Jr.comp=Pa.comp;
		}
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Nivel',req:'Y',I:{tag:'select',name:'lvType','class':jsF,opts:$V.gfiAccLcType,selected:Jr.lvType}},cont);
		$1.T.divL({wxn:'wrapx2',L:'Grupo',I:{tag:'select',name:'comp','class':jsF,opts:$V['accGr'+Pa.accClass],selected:Jr.comp}},divL);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Código Cuenta',I:{tag:'input',type:'text',name:'accCode',value:Jr.accCode,'class':jsF}},cont);
		$1.T.divL({wxn:'wrapx4_1',L:'Nombre',req:'Y',I:{tag:'input',type:'text',name:'accName',value:Jr.accName,'class':jsF}},divL);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Situación Financiera',I:{tag:'select',name:'balType','class':jsF,opts:$TbV.gfiPdcBalType,selected:Jr.balType}},cont);
		$1.T.divL({wxn:'wrapx4',L:'Pérdidas y Ganancias',I:{tag:'select',name:'erType','class':jsF,opts:$TbV.gfiPdcErType,selected:Jr.erType}},divL);
		$1.T.divL({wxn:'wrapx4',L:'Categoria',I:{tag:'select',name:'sysType','class':jsF,opts:$V.gfiAccSysType,selected:Jr.sysType}},divL);
		resp=$1.t('div',0,cont);
		var Ds={POST:Api.Acc.b+'pdc/form',loade:resp,jsBody:cont, func:function(Jr2,o){
			if(o && o.accId){
				Gfi.Pdc.addLv(o,true);
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
Gfi.Pdc.format=function(L,df){
	var df=(df)?df:'N/D';
	var val=(L.accCode)?L.accCode+' '+L.accName:df;
	return val
}

Gfi.Fdp={
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
					$1.t('a',{'class':'fa fa-pencil',href:$M.to('gfiFdp.form','fpId:'+L.fpId,'r')},td);
					$1.t('td',{textNode:L.fpCode},tr);
					$1.t('td',{textNode:L.fpName},tr);
					$1.t('td',{textNode:_g(L.cType,$V.gfiFdPType)},tr);
					$1.t('td',{textNode:_g(L.fpMethod,$V.gfiFdpMethod)},tr);
					$1.t('td',{textNode:Gfi.Pdc.format(L)},tr);
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
			$1.T.divL({wxn:'wrapx8',L:'Medio de Pago',I:{tag:'select',name:'fpMethod','class':jsF+' __met',opts:$V.gfiFdpMethod,selected:Jr.fpMethod}},divL);
			$1.T.divL({wxn:'wrapx8',L:'Tipo',I:{tag:'select',name:'cType','class':jsF,opts:$V.gfiFdPType,selected:Jr.cType,noBlank:'Y'}},divL);
			var val=(Jr.accName)?Jr.accCode+' '+Jr.accName:'';
			var tag=Gfi.Fx.inpSea({value:val,D:Jr,jsF:jsF,vSea:'comp=bank'});
			tag=$1.lTag({tag:'select',name:'accId',selected:Jr.accId,'class':jsF,opts:$Tb.gfiPdcBank});
			$1.T.divL({wxn:'wrapx4',L:'Cuenta Contable',Inode:tag},divL);
			resp=$1.t('div',0,cont);
			var PS={POST:Api.Acc.b+'fdp/form',loade:resp,jsBody:cont, func:function(Jr2,o){
				$Api.resp(resp,Jr2);
				if(!Jr2.errNo && o.fpId){
					hid.value=o.fpId;
					$oB.upd({k:o.fpId,v:o.fpName},$Tb.gfiOfdp);
					$M.to('gfiFdp.form','fpId:'+o.fpId);
				}
			}};
			if(Pa.fpId){ PS.PUT=PS.POST; delete(PS.POST); }
			$Api.send(PS,cont);
		}});
	},
	addLine:function(P,pare){
		var fie=$1.T.fieset({L:{textNode:'Medios de Pago'}},pare);
		var jsF=$Api.JS.clsLN;
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Medio Pago',I:{tag:'select','class':' type',opts:$Tb.gfiOfdp}},fie);
		$1.T.btnFa({faBtn:'fa_plusCircle',textNode:' Añadir',func:function(T){
			var type=$1.q('.type',T.parentNode);
			var fpdId=type.value;
			var tr=$Htm.uniqLine(fpdId,T.parentNode,'ele');
			if(!tr){
				var tr=$1.t('tr',{'class':$Api.JS.clsL,jsk:'Lp'},tBody); $Htm.uniqCls(fpdId,tr);
				var td=$1.t('td',0,tr);
				$1.lTag({tag:'$',name:'value','class':jsF,AJS:{fdId:fdpId}},td);
				$1.t('td',{textNode:_g(fpdId,$Tb.gfiOfdp)},tr);
				var td=$1.t('td',0,tr);
				$1.lineDel({},null,td);
			}
		}},divL);
		var tb=$1.T.table(['Valor','Medio de Pago'],0,fie);
		var tBody=$1.t('tbody',0,tb);
		return fie;
	},
	formPos:function(P,L,pare){
		var jsF=$Api.JS.cls;
		var P=(P)?P:{};
		var L=(L)?L:{};
		var wrap=$1.T.fieset({L:{textNode:'Pagos'}},pare).parentNode;
		if(P.jsLine){ //Enviar pago en Linea Pay por ejemeplo
			wrap.classList.add($Api.JS.clsLName);
			wrap.setAttribute('jsk',P.jsLine);
			jsF=$Api.JS.clsLNames;
		}
		var divCre=$1.t('div',0,wrap);
		var divPays=$1.t('div',0,wrap);
		if(!P.topPare && !pare){ P.topPare=wrap; }
		else if(!P.topPare && pare){ P.topPare=pare; }
		$1.lTag({tag:'ckLabel',t:'Venta a Crédito',I:{name:'noPays','class':jsF},func:function(ck){
			$1.delet($1.q('._txtCred',divCre));
			if(ck=='Y'){ divPays.style.display='none';
				var divTempo=$1.t('div',{'class':'_txtCred',textNode:'Si no se selecciona ninguna, se utiliza la predeterminada para el cliente.'},divCre);
				$1.T.divL({divLine:1,wxn:'wrapx4',L:'Condiciones de Pago',I:{lTag:'select',name:'','class':jsF,name:'pymId',opts:$Tb.gfiOpym}},divTempo);
			}
			else{ divPays.style.display='block'; }
		}},divCre);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Valor Recibido',I:{lTag:'$',name:'balGet','class':jsF+' _balGet',onkeychange:updPrices}},divPays);
		$1.T.divL({wxn:'wrapx4',L:'Cambio',I:{lTag:'disabled','class':'_balRet'}},divL);
		var tb=$1.T.table(['Valor','Medio Pago'],0,divPays);
		var tBody=$1.t('tbody',0,tb);
		var Opts=[{k:'TIB',v:'Transferencia'},{k:'TCR',v:'Tarj. Crédito'},{k:'TDE',v:'Tarj. Débito'}];
		var tr=$1.t('tr',0,tBody);
		var td=$1.t('td',0,tr);
		$1.lTag({tag:'disabled','class':' _balEFE',value:L.priceLineEFE},td);
		$1.t('td',{textNode:'Efectivo'},tr);
		for(var k in Opts){
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',0,tr);
			$1.lTag({tag:'$',name:Opts[k].k,'class':jsF+' _bal'+Opts[k].k,value:L['priceLine'+k],onkeychange:updPrices},td);
			$1.t('td',{textNode:Opts[k].v},tr);
		}
		function updPrices(T){
			var T=$1.q('._balGet',P.topPare);
			var dTotal=$1.q('.'+tbCal.tbTotal,P.topPare);
			var efe=$1.q('._balEFE',wrap);
			var balTIB=$1.q('._balTIB',wrap);
			var balTCR=$1.q('._balTCR',wrap);
			var balTDB=$1.q('._balTDB',wrap);
			if(balTIB){ balTIB=$Str.toNumber(balTIB.value); }
			if(balTCR){ balTCR=$Str.toNumber(balTCR.value); }
			if(balTDB){ balTDB=$Str.toNumber(balTDB.value); }
			var balGet=$Str.toNumber(T.value)*1;
			var balTotal=balGet;
			var balRet=$1.q('._balRet',wrap);
			var devue=0;
			var valTotal=0;
			if(dTotal){ valTotal=$Str.toNumber(dTotal.innerText); }
			if(balTIB>0){ balTotal += balTIB*1; }
			if(balTCR>0){ balTotal += balTCR*1; }
			if(balTDB>0){ balTotal += balTDB*1; }
			devue = balTotal-valTotal;
			var enEfe=balGet-devue; if(enEfe<0){ enEfe=''; }//dado-devuelvo es el efectivo
			efe.value=0; balRet.value=0;
			if(devue>=0){ efe.value=enEfe; balRet.value=$Str.money(devue); }//entregan 100, son 90, efe=90, dev=10
			else if(devue<0){  efe.value=balGet; balRet.value=0; }//entrega 80, son 90, efe=80, dev=0
			T.AJs={
				balRet:(devue>0)?devue:0, EFE:efe.value
			};
		}
		return wrap;
	},
}
$V.gfiTieType=[{k:'E',v:'Gastos'},{k:'I',v:'Ingresos'}];
Gfi.Tie={
	get:function(){
		var cont=$M.Ht.cont;
		$Api.get({f:Api.Acc.b+'tie', inputs:$1.G.filter(), loade:cont, func:function(Jr){
			if(Jr.errNo){ $Api.resp(cont,Jr); }
			else{
				var tb=$1.T.table(['','Tipo','Concepto','Cuenta Contable'],0,cont);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					var td=$1.t('td',0,tr);
					$1.t('a',{'class':'fa fa-pencil',href:$M.to('gfiTie.form','vid:'+L.fpvidId,'r')},td);
					$1.t('td',{textNode:_g(L.vType,$V.gfiTieType)},tr);
					$1.t('td',{textNode:L.value},tr);
					$1.t('td',{textNode:Gfi.Pdc.format(L)},tr);
				}
			}
		}});
	},
	form:function(){
		var cont=$M.Ht.cont; Pa=$M.read();
		var vPost=(Pa.vid)?'vid='+Pa.vid:'';
		$Api.get({f:Api.Acc.b+'tie/form',loadVerif:!Pa.vid, inputs:vPost,loade:cont,func:function(Jr){
			var jsF=$Api.Cls.a;
			var hid=$1.t('input',{type:'hidden','class':jsF,name:'vid'},cont);
			if(Pa.vid){ hid.value=Pa.vid; }
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Tipo',I:{lTag:'select',name:'vType',value:Jr.vType,'class':jsF,opts:$V.gfiTieType}},cont);
			$1.T.divL({wxn:'wrapx4',L:'Nombre',I:{tag:'input',type:'text',name:'value',value:Jr.value,'class':jsF}},divL);
			var val=(Jr.accName)?Jr.accCode+' '+Jr.accName:'';
			var tag=Gfi.Fx.inpSea({value:val,D:Jr,jsF:jsF});
			$1.T.divL({wxn:'wrapx4',L:'Cuenta Contable',Inode:tag},divL);
			resp=$1.t('div',0,cont);
			var PS={POST:Api.Acc.b+'tie/form',loade:resp,jsBody:cont, func:function(Jr2,o){
				$Api.resp(resp,Jr2);
				if(!Jr2.errNo && o.vid){
					hid.value=o.vid;
					$oB.upd({k:o.vid,v:o.fpName},$Tb.gfiOfdp);
					$M.to('gfiTie.form','vid:'+o.vid);
				}
			}};
			if(Pa.vid){ PS.PUT=PS.POST; delete(PS.POST); }
			$Api.send(PS,cont);
		}});
	}
}

Gfi.Pym={
	get:function(){
		var cont=$M.Ht.cont;
		$Api.get({f:Api.Gfi.pr+'pym', inputs:$1.G.filter(), loade:cont, func:function(Jr){
			if(Jr.errNo){ $Api.resp(cont,Jr); }
			else{
				var tb=$1.T.table(['','Código','Nombre','Plazo','Cuenta','Detalles']); cont.appendChild(tb);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					var td=$1.t('td',0,tr);
					$1.t('a',{'class':'fa fa-pencil',href:$M.to('gfiPym.form','pymId:'+L.pymId,'r')},td);
					$1.t('td',{textNode:L.pymCode},tr);
					$1.t('td',{textNode:L.pymName},tr);
					$1.t('td',{textNode:L.extraDays},tr);
					$1.t('td',{textNode:L.accName},tr);
					$1.t('td',{textNode:L.lineMemo},tr);
				}
			}
		}});
	},
	form:function(){
		var cont=$M.Ht.cont; Pa=$M.read();
		var vPost=(Pa.pymId)?'pymId='+Pa.pymId:'';
		$Api.get({f:Api.Gfi.pr+'pym/form',loadVerif:!Pa.pymId, inputs:vPost,loade:cont,func:function(Jr){
			var jsF=$Api.Cls.a;
			var hid=$Api.JS.addF({name:'pymId',value:Pa.pymId},cont);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Código',I:{tag:'input',type:'text',name:'pymCode',value:Jr.pymCode,'class':jsF}},cont);
			$1.T.divL({wxn:'wrapx4',L:'Nombre',I:{tag:'input',type:'text',name:'pymName',value:Jr.pymName,'class':jsF}},divL);
			$1.T.divL({wxn:'wrapx8',L:'Plazo dias',I:{tag:'input',type:'text',name:'extraDays',value:Jr.extraDays,'class':jsF}},divL);
			var val=(Jr.accName)?Jr.accName:'';
			var tag=Gfi.Fx.inpSea({value:val,D:Jr,jsF:jsF});
			$1.T.divL({wxn:'wrapx4',L:'Cuenta Contable',Inode:tag},divL);
			resp=$1.t('div',0,cont);
			var PS={POST:Api.Gfi.pr+'pym',loade:resp,jsBody:cont, func:function(Jr2,o){
				$Api.resp(resp,Jr2);
				if(!Jr2.errNo && o.pymId){
					hid.value=o.pymId;
					$oB.upd({k:o.pymId,v:o.pymName},$Tb.gfiOpym);
					$M.to('gfiPym.form','pymId:'+o.pymId);
				}
			}};
			if(Pa.pymId){ PS.PUT=PS.POST; delete(PS.POST); }
			$Api.send(PS,cont);
		}});
	},
}

Gfi.Tax={
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Acc.b+'tax', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','ID','Código','Nombre','Tipo','Tarifa Numero','C. Ventas','C. Compras']); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to('gfiTax.form','vatId:'+L.vatId,'r')},td);
				$1.t('td',{textNode:L.vatId,style:'backgroundColor:#CCC;'},tr);
				$1.t('td',{textNode:L.taxCode},tr);
				$1.t('td',{textNode:L.taxName},tr);
				$1.t('td',{textNode:_g(L.taxType,$V.gfiTaxType)},tr);
				$1.t('td',{textNode:L.rate*1},tr);
				$1.t('td',{textNode:Gfi.Pdc.format({accCode:L.sellCode,accName:L.sellName})},tr);
				$1.t('td',{textNode:Gfi.Pdc.format({accCode:L.buyCode,accName:L.buyName})},tr);
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
		var tag=Gfi.Fx.inpSea({value:val,D:{accId:Jr.sellAcc,accCode:Jr.sellCode,accName:Jr.sellName},jsF:$Api.JS.clsL1});
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Cuenta Ventas',Inode:tag},cont);
		var val=(Jr.buyName)?Jr.buyCode+' '+Jr.buyName:'';
		var tag=Gfi.Fx.inpSea({value:val,D:{accId:Jr.buyAcc,accCode:Jr.buyCode,accName:Jr.buyName},jsF:$Api.JS.clsL1});
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
	var fis=$1.q('.'+Gfi.Pym.cls,cont,'all');
	for(var i=0; i<fis.length; i++){
	}
}
}

Gfi.Txt={
fName:function(L){
	var t=(L.accCode)?L.accCode+' ':'';;
	t +=(L.accName)?L.accName:'';
	return t;
}
};
Gfi.Fx={
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
},
inpSea:function(P,pare){
	P.lTag='apiSeaBox';
	P.api=Api.Acc.b+'sea/pdc';
	P.vSea=(P.vSea)?'lvType=D&'+P.vSea:'lvType=D';
	P.lineText=['accCode',' ','accName'];
	if(!P.AJsPut){ P.AJsPut=['accId']; }
	return $Api.Sea.box(P,pare);
},
trDcc:function(P,pare){
	//añadir lineas de asiento
	var jsFL=$Api.JS.clsLN;
	var tds=['','Cuenta','Tercero','Centro Costo','Débito','Crédito','Detalles',''];
	if(P.creBal=='N'){ tds.splice(5,1); }
	var tb=$1.T.table(tds);
	$1.T.fieset({L:{textNode:'Lineas'}},pare,tb);
	var tBody=$1.t('tbody',{},tb);
	var trFoot=$1.t('tr',0,$1.t('tfoot',{},tb));
	var tdFoot=$1.t('td',{colspan:4},trFoot);
	$1.t('td',{'class':tbCal._cell+'_1',format:'$'},trFoot);
	$1.t('td',{'class':tbCal._cell+'_2',format:'$'},trFoot);
	$1.t('td',0,trFoot);
	$1.T.btnFa({faBtn:'fa_plusCircle',textNode:'Añadir Nuevo',func:trA},tdFoot);
	function trA(L){
		var tr=$1.t('tr',{'class':$Api.JS.clsL+' '+tbCal._row},tBody);
		var td=$1.t('td',0,tr);
		$1.Move.btns({},td);
		Gfi.Fx.inpSea({jsF:jsFL},$1.t('td',0,tr));
		$1.lTag({tag:'card',jsF:jsFL},$1.t('td',0,tr));
		$1.lTag({tag:'select','class':jsFL,name:'cdcId',opts:$Tb.gfiOcdc},$1.t('td',0,tr));
		var inpPrice=$1.lTag({tag:'$','class':jsFL+' _bals '+tbCal._cell,ncol:1,name:'debBal',style:'width:100px',min:0},$1.t('td',0,tr));
		inpPrice.keyChange((T)=>{ tbCal.sumCells(tb,isOk); disInp('D',T); });
		if(P.creBal!='N'){
			var inpPrice=$1.lTag({tag:'$','class':jsFL+' _bals '+tbCal._cell,ncol:2,name:'creBal',style:'width:100px',min:0},$1.t('td',0,tr));
			inpPrice.keyChange((T)=>{ tbCal.sumCells(tb,isOk); disInp('C',T); });
		}
		$1.lTag({tag:'input','class':jsFL,name:'lineText',maxLen:200,style:'width:250px'},$1.t('td',0,tr));
		$1.lineDel(L,{},$1.t('td',0,tr));
	}
	trA({});
	function disInp(type,T){
		tr=T.parentNode.parentNode;
		inpts=$1.q('._bals',tr,'all');
		if(inpts[0]){
			inpts[0].removeAttribute('disabled');
			if(type=='C'){ inpts[0].setAttribute('disabled','disabled');}
		}
		if(inpts[1]){
			inpts[1].removeAttribute('disabled');
			if(type=='D'){ inpts[1].setAttribute('disabled','disabled');}
		}
	}
	function isOk(CLS){
		if(CLS[1] && CLS[1].tag){
			CLS[1].tag.style.color='green'; CLS[1].tag.style.fontWeight='bold';
		}
		if(CLS[2] && CLS[2].tag){
			CLS[2].tag.style.color='green'; CLS[2].tag.style.fontWeight='bold';
		}
		if(CLS[1] && CLS[2] && CLS[1].v!=CLS[2].v){
			if(CLS[1].tag && CLS[2].tag){
				CLS[1].tag.style.color='red'; CLS[1].tag.style.fontWeight='bold';
				CLS[2].tag.style.color='red'; CLS[2].tag.style.fontWeight='bold';
			}
		}
	}
}
};

$Acc={};
$Acc.Txt=Gfi.Txt;
$Acc.Fx=Gfi.Fx;
$M.kauAssg('gfiAcc',[
	{k:'gfi.suadmin',t:'Administrador Módulo Finanzas'},
	{k:'gfiBan',t:'Cuentas Bancarias'},
	{k:'gfiTba',t:'Transferencias Bancarias'},
]);
$M.liAdd('gfi',[
	{_lineText:'Finanzas'},
	{_lineText:'Tesoreria'},
	{k:'gfiBan',t:'Cuentas Bancarias', kau:'gfiBan',mdlActive:'gfi',ini:{f:'gfiBan',gyp:function(){ Gfi.Ban.get(); } }},
	{_lineText:'_TB'},
	{k:'gfiItmGr',t:'Grupo de Artículos - Contables',kau:'gfi.suadmin',ini:{btnGo:'gfiItmGr.form',f:'gfi.itmGr',gyp:Gfi.ItmGr.get}},
	{k:'gfiItmGr.form',t:'Grupo de Artículo - Contable',kau:'gfi.suadmin',ini:{g:Gfi.ItmGr.form}},
	{k:'gfiAfGr',t:'Grupos de Activos',kau:'gfi.suadmin',mdlActive:'itmAf',ini:{btnGo:'gfiAfGr.form',f:'accAfGr',gyp:Gfi.AfGr.get}},
	{k:'gfiAfGr.form',t:'Grupo de Activo',kau:'gfi.suadmin',mdlActive:'itmAf',ini:{g:Gfi.AfGr.form}},

	{k:'gfiFdp',t:'Formas de pago',kau:'gfi.suadmin',ini:{btnGo:'gfiFdp.form',f:'gfi.suadmin',gyp:Gfi.Fdp.get}},
	{k:'gfiFdp.form',t:'Forma de Pago',kau:'gfi.suadmin',ini:{g:Gfi.Fdp.form}},

	{k:'gfiTie',t:'Conceptos de pago',kau:'gfi.suadmin',ini:{btnGo:'gfiTie.form',f:'gfi.suadmin',gyp:Gfi.Tie.get}},
	{k:'gfiTie.form',t:'Concepto de Pago',kau:'gfi.suadmin',ini:{g:Gfi.Tie.form}},
	
	{k:'gfiPym',t:'Condiciones de pago',kau:'gfi.suadmin',ini:{btnGo:'gfiPym.form',gyp:Gfi.Pym.get}},
	{k:'gfiPym.form',t:'Condición de Pago',kau:'gfi.suadmin',ini:{g:Gfi.Pym.form}},
	{k:'gfiTax',t:'Impuestos',kau:'sysd.suadmin',ini:{btnGo:'gfiTax.form',f:'gfi.tax',gyp:Gfi.Tax.get}},
	{k:'gfiTax.form',t:'Impuesto',kau:'sysd.suadmin',ini:{g:Gfi.Tax.form}},

	{k:'gfiPdc',t:'Plan de Cuentas',kau:'gfi.suadmin',ini:{g:Gfi.Pdc.get}},
	{k:'gfiPdc.form',t:'Definir Cuenta Contable',kau:'gfi.suadmin',ini:{g:Gfi.Pdc.form}},
],{prp:{mdlActive:'gfi'}});

$M.liRep('fin',[
	{_lineText:'_REP'},
	{k:'finRep.cxc',t:'Cuentas por Cobrar', kau:'finRep.cxc',mdlActive:'gvtSell',ini:{f:'finRep.cxc' }},
	{k:'finRep.estadcuenta',t:'Estado de Cuenta', kau:'finRep.estadcuenta',mdlActive:'gvtSell',ini:{f:'finRep.estadcuenta' }},
	{k:'finRep.ing',t:'Ingresos / Pagos', kau:'finRep.ingegr',mdlActive:'gvtSell',ini:{f:'finRep.ing' }},
	{k:'gfiBan.history',t:'Historial Movimientos Cuentas Bancarias', kau:'gfiBan',mdlActive:'gfi',ini:{f:'gfiBan.history',gyp:function(){ Gfi.Ban.history(); } }},
	{k:'finRep.cxp',t:'Cuentas por Pagar', kauAssg:'finRep.cxp',mdlActive:'gvtPur',ini:{f:'finRep.cxp' }},
	{k:'finRep.egr',t:'Gastos / Egresos', kauAssg:'finRep.egr',mdlActive:'gvtSell',ini:{f:'finRep.egr' }},
	],{repM:['gfi']});

$M.liAdd('gfi',[{_lineText:'_TB'}]);
$Tb._i({kMdl:'gfi',kObj:'gfiOcdc',kau:'gfi.suadmin',liTxtG:'Centros de Costo',liTxtF:'Centro de Costo (Form)',Cols:[
{t:'Código',k:'cdcCode',divLine:1,wxn:'wrapx8',T:{tag:'input'}},
{t:'Nombre',k:'cdcName',wxn:'wrapx4',T:{tag:'input'}}
]
});