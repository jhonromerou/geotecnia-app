
$V.Mdls['gfiAcc']={t:'Contabilidad',ico:'fa fa-balance-scale'};

$V.gfiBanType=[{k:'CJ',v:'Caja'},{k:'CA',v:'Cuenta Ahorros'},{k:'CC',v:'Cuenta Corriente'},{k:'TC',v:'Tarjeta Crédito'}];

$oB.push($V.docTT,[
{k:'gfiDcc',v:'Comprobante Contable'},
]);

$DocTb.kTbAssg('gfiDccL',{
accSea:['Cuenta',{lTag:'apiSeaBox',api:Api.Acc.b+'sea/pdc',vSea:'lvType=D',lineText:['accCode',' ','accName'],jsVB:['accId'],k:'accName'}],
crd:['Tercero',{lTag:'crd','class':$Api.JS.clsN,k:'cardName'}],
cdcId:['C. Costo',{lTag:'select',name:'cdcId',opts:$Tb.gfiOcdc,k:'cdcId',kf:'cdcId'}],
debBal:[{textNode:'Débito',style:'width:6rem;'},{lTag:'$',kf:'debBal',k:'debBal',min:0,style:'width:6rem'}],
creBal:[{textNode:'Crédito',style:'width:6rem;'},{lTag:'$',kf:'creBal',k:'creBal',min:0,style:'width:6rem'}],
lineText:[{textNode:'Detalles',style:'width:10rem;'},{lTag:'input',k:'lineText',kf:'lineText',style:'width:10rem'}],
});


$oB.pus('gvtPdn',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPdn',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPin',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPin',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPrd',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPrd',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPnd',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPnd',tr:T.P.docEntry}); }}]);
$oB.pus('gvtPnc',$Opts,[
{k:'viewDac',ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:'gvtPnc',tr:T.P.docEntry}); }}]);

$V.gfiPdcLvel=[{k:'',v:'Omitir'},{k:'1',v:'1'},{k:'2',v:'2'},{k:'3',v:'3'},{k:'4',v:'4'},{k:'5',v:'5'}];

_Fi['gfiDcc']=function(wrap){
	$Doc.filter({func:Gfi.Dcc.get,docNum:'Y'},[
	{k:'d1'},{k:'d2'},{k:'docStatus'},{tbSerie:'gfiDcc'},{k:'docNum'},{k:'card'},{k:'ordBy'},
	{divLine:1,wxn:'wrapx8',L:'Saldo >=',I:{tag:'input',type:'number',inputmode:'numeric',min:0,name:'A.docTotal(E_mayIgual)'}},
	{k:'rows',IFF:'Y'}
	],wrap);
};
_Fi['gfiAccRep.daily']=function(wrap){
	var jsV = 'jsFiltVars';
	var AB=[{k:'',v:'Omitir'},{k:'1',v:'1'},{k:'2',v:'2'},{k:'3',v:'3'},{k:'4',v:'4'},{k:'5',v:'5'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Nivel',I:{tag:'select','class':jsV,name:'lvel',opts:AB}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Desde',I:{tag:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.AccRep.daily});
	wrap.appendChild(btnSend);
};
_Fi['gfiAccRep.major']=function(wrap){
	var jsV = 'jsFiltVars';
	var AB=[{k:'accId',v:'Cuenta'},{k:'cardId',v:'Tercero'},{k:'cdcId',v:'Centro Costo'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Visualizar por',I:{tag:'select','class':jsV,name:'gby',opts:AB,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Cuenta Inicio',I:{tag:'input',type:'text','class':jsV,name:'acc1'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Cuenta Fin',I:{tag:'input',type:'text','class':jsV,name:'acc2'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Desde',I:{tag:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({divLine:1,wxn:'wrapx8',L:'Nivel',I:{tag:'select','class':jsV,name:'lvel',opts:$V.gfiPdcLvel,noBlank:'Y'}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.AccRep.major});
	wrap.appendChild(btnSend);
};
_Fi['gfiAccRep.auxAcc']=function(wrap){
	var jsV = 'jsFiltVars';
	var AB=[{k:'C',v:'Por Cuenta'},{k:'CC',v:'Por Tercero'},{k:'DOC',v:'Detallado'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{tag:'select','class':jsV,name:'viewType',opts:AB,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Cuenta Inicio',I:{tag:'input',type:'text','class':jsV,name:'acc1'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Cuenta Fin',I:{tag:'input',type:'text','class':jsV,name:'acc2'}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Desde',I:{tag:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	var lTag=$1.lTag({tag:'crd',jsF:jsV});
	var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Tercero',Inode:lTag},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Centro Costo',I:{tag:'select','class':jsV,name:'cdcId',opts:$Tb.gfiOcdc}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.AccRep.auxAcc});
	wrap.appendChild(btnSend);
};
_Fi['gfiAccRep.taxes']=function(wrap){
	var jsV = 'jsFiltVars';
		var AB=[{k:'sell',v:'Ventas'},{k:'pur',v:'Compras'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Visualizar',I:{tag:'select','class':jsV,name:'taxBy',opts:AB,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Desde',I:{tag:'date','class':jsV,name:'date1',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Listado Por',I:{tag:'select','class':jsV,name:'gby',opts:$V.gfiAccListView}},divL);
	$1.T.divL({wxn:'wrapx8',L:'Tipo Impuestos',I:{tag:'select','class':jsV,name:'taxType',opts:$V.gfiTaxType}},divL);
	//var lTag=$1.lTag({tag:'crd',jsF:jsV});
	//var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Tercero',Inode:lTag},wrap);
	//$1.T.divL({wxn:'wrapx8',L:'Centro Costo',I:{tag:'select','class':jsV,name:'cdcId',opts:$Tb.gfiOcdc}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.AccRep.taxes});
	wrap.appendChild(btnSend);
};
_Fi['gfiAccRep.sf']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Nivel',I:{tag:'select','class':jsV,name:'lvel',opts:$V.gfiPdcLvel,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Corte',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.AccRep.sf});
	wrap.appendChild(btnSend);
};
_Fi['gfiAccRep.er']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Nivel',I:{tag:'select','class':jsV,name:'lvel',opts:$V.gfiPdcLvel,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Corte',I:{tag:'date','class':jsV,name:'date2',value:$2d.today}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:Gfi.AccRep.er});
	wrap.appendChild(btnSend);
};

Gfi.Dcc={
OLg:function(L){
	var Li=[];
	var ab=new $Doc.liBtn(Li,L,{api:Api.Gfi.b+'dcc',tbSerie:'gfiDcc'});
	ab.add('E',{canEdit:(L.canceled=='NN')});
	ab.add('AC');
	ab.add('N',{addText:'Se va anular el asiento'});
	ab.add('L');
	return $Opts.add('gfiDcc',Li,L);;
},
opts:function(P,pare){
	Li={Li:Gfi.Dcc.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api.Gfi.b+'dcc',inputs:$1.G.filter(),
	fOpts:Gfi.Dcc.opts,view:'Y',docBy:'userDate',
	tbSerie:'gfiDcc',
	TD:[
		{H:'Estado',k:'docStatus',_V:'docStatus'},
		{H:'Tipo',k:'docDate'},
		{H:'Fecha',k:'docDate'},
		{H:'Total',k:'docTotal',format:'$'}
	],
	tbExport:{ext:'xlsx',fileName:'Asiento Contable'}
	},cont);
},
form:function(){
	var P=$M.T.d(0,{D:{}});
	var D=P.D;
	var cont=$M.Ht.cont; var Pa=$M.read();
	if(!D.docDate){ D.docDate=$2d.today; }
	$Api.get({f:Api.Gfi.b+'dcc/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		if(Jr){ D=Jr; }
		var jsF=$Api.JS.cls;
		function midContf (Jr,cont){ $1.t('div',{'class':'midCont'},cont); }
		$Api.form2({api:Api.Gfi.b+'dcc',AJs:D.AJs,PUTid:Pa.docEntry,JrD:D,vidn:'docEntry',to:'gfiDcc.view',cont:cont,midCont:midContf,func:P.func,
		tbH:[
			{divLine:1,req:'Y',wxn:'wrapx8',L:'Serie',I:{xtag:'docSeries',tbSerie:'gfiDcc',jsF:jsF}},
			{L:'Fecha',req:'Y',wxn:'wrapx8',I:{lTag:'date','class':jsF,name:'docDate',value:D.docDate}},
			{L:'Referencia 1',wxn:'wrapx8',I:{lTag:'input','class':jsF,name:'ref1',value:D.ref1}},
			{L:'Referencia 2',wxn:'wrapx8',I:{lTag:'input','class':jsF,name:'ref2',value:D.ref2}},
			{divLine:1,L:'Detalles',wxn:'wrapx1',I:{lTag:'textarea','class':jsF,name:'lineMemo',textNode:D.lineMemo}},
		]});
		var midCont=$1.q('.midCont',cont);
		Gfi.Fx.trDcc(Jr,midCont);
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gfi.b+'dcc/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={tbSerie:'gfiDcc',D:Jr,
			main:Gfi.Dcc.OLg,
			THs:[
				{sdocNum:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Fecha',k:'docDate',ln:1},
				{t:'Estado',k:'docStatus',_V:'docStatus'},{middleInfo:'Y'},{logo:'Y'},
				{t:'Ref. 1',k:'ref1'},{t:'Ref. 2',k:'ref2'},
				{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}},
			],
			mTL:[
			{L:'L',ksort:'lineNum',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
				{t:'Código',k:'accCode'},
				{t:'Cuenta',k:'accName'},
				{t:'Tercero',k:'cardName'},
				{t:'C.C',k:'cdcId',_gTb:'gfiOcdc'},
				{t:'Débito',k:'debBal',format:'$$'},
				{t:'Crédito',k:'creBal',format:'$$'},
				{t:'Detalles',k:'lineText'}
			]}
			],
			footTrs:{cs:4},
			TFs:null
		};
		$Doc.view(cont,tP);
	}});
},
}
Gfi.Dcc.quickView=function(Pa){
	var cont=$1.t('div');;
	$Doc.tbList({api:Api.Gfi.b+'dac/view',inputs:'tt='+Pa.tt+'&tr='+Pa.tr,
	view:'N',
	TD:[
		{H:'Código',k:'accCode'},
		{H:'Cuenta',k:'accName'},
		{H:'Fecha',k:'docDate'},
		{H:'Débito',k:'debBal',format:'$'},
		{H:'Crédito',k:'creBal',format:'$'},
		{H:'Tercero',k:'cardName',textIf:function(L){ if(L.cardName==null){ return 'N/A'; } }},
	],
	trSum:{debBal:{f:'$'},creBal:{f:'$'}},
	trSep:{r:1,func:function(L){
		if(L.isRever=='Y'){ return {textNode:'Asiento Reversado'}; }
		if(L.canceled=='Y'){ return {textNode:'Asiento Anulado'}; }
		return false;
	}},
	tbExport:{ext:'xlsx',fileName:'Asiento contable '+Pa.tt+'-'+Pa.tr}
	},cont);
	$1.Win.open(cont,{winTitle:'Asiento Contable',winSize:'medium'});
}

Gfi.AccRep={
daily:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gfi.b+'accRep/daily',inputs:$1.G.filter(),loade:cont,func:function(Jr){
		var tb=$1.T.table(['Linea','Fecha','Cód. Cuenta','Nombre Cuenta','Débito','Crédito']);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		for(var i in Jr.L){ var L=Jr.L[i];
			var trx=$Doc.docNumTr(L,0,1);
			if(lastR!=trx){ var ln=0;
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:trx,colspan:6,style:'backgroundColor:#DDD;'},tr);
			} lastR=trx;
			ln++;
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:ln},tr);
			$1.t('td',{textNode:L.docDate},tr);
			$1.t('td',{textNode:L.accCode},tr);
			$1.t('td',{textNode:L.accName},tr);
			$1.t('td',{textNode:$Str.money(L.debBal)},tr);
			$1.t('td',{textNode:$Str.money(L.creBal)},tr);
		}
		var tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:'Libro Diario'});
		cont.appendChild(tb)
	}});
},
major:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gfi.b+'accRep/major',inputs:$Api.getFilter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep={
		cardName:['Tercero',{k:'cardName'}],
		cdcId:['Centro de Costo',{k:'cdcId',_gTb:'gfiOcdc'}],
		accCode:['Cód. Cuenta'],
		accName:['Nombre Cuenta'],
		balOpen:['Saldo Inicial',{k:'balOpen',format:'$'}],
		debBal:['Débito',{k:'debBal',format:'$'}],
		creBal:['Crédito',{k:'creBal',format:'$'}],
		balEnd:['Saldo Final',{k:'balEnd',format:'$'}],
		};
		var Tbs=[];
		var L0={}; for(var i in Jr.L){ L0=Jr.L[i]; break; }
		if(!L0.balEnd){ L0.balEnd=0; }
		for(var k in Rep){
			if(typeof(L0[k])!='undefined'){ Tbs.push(Rep[k][0]); }
			else{ delete(Rep[k]); }
		}
		var tbc=$1.t('div');
		var tb=$1.T.table(Tbs,0,tbc);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			L.balEnd=0;
			if(L.balOpen){ L.balEnd +=L.balOpen*1; }
			if(L.debBal){ L.balEnd +=L.debBal*1; }
			if(L.creBal){ L.balEnd -=L.creBal*1; }
			for(var k in Rep){ var Lk=Rep[k][1];
				var lTag={textNode:L[k]};
				if(Lk){ lTag=$1.setTag(Lk,L); }
				$1.t('td',lTag,tr);
			}
		}
		$1.t('h5',{textNode:'Diseñado por ADM Sistems - Generado desde ModulApp One'},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Libro Mayor'});
		cont.appendChild(tb)
	}});
},
auxAcc:function(){
	$Api.Rep.base({f:Api.Gfi.b+'accRep/auxAcc',inputs:$1.G.filter(),
		Totals:{t:'Totales',tn:2},
		V_C:[
		{f:'accCode',t:'Codigo Cuenta'},
		{f:'accName',t:'Cuenta Contable'},
		{f:'debBal',t:'Débito',fType:'$',totals:'Y'},
		{f:'creBal',t:'Crédito',fType:'$',totals:'Y'},
		],
		V_CC:[
		{f:'accCode',t:'Codigo Cuenta'},
		{f:'accName',t:'Cuenta Contable'},
		{t:'Tercero',f:'cardName'},
		{f:'debBal',t:'Débito',fType:'$',totals:'Y'},
		{f:'creBal',t:'Crédito',fType:'$',totals:'Y'},
		],
		V_DOC:[
		{f:'accCode',t:'Codigo Cuenta'},
		{f:'accName',t:'Cuenta Contable'},
		{t:'Documento',f:'tr',fText:$Doc.docNumTr},
		{t:'Fecha',f:'docDate'},
		{t:'Tercero',f:'cardName'},
		{f:'debBal',t:'Débito',fType:'$',totals:'Y'},
		{f:'creBal',t:'Crédito',fType:'$',totals:'Y'},
		],
	});
},
taxes:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gfi.b+'accRep/taxes',inputs:$Api.getFilter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep={
		taxType:['Tipo',{k:'taxType',_V:'gfiTaxType'}],
		taxCode:['Cod. Impuesto',{k:'taxCode'}],
		taxName:['Impuesto',{k:'taxName'}],
		docNum:['Documento',{k:'docNum',fText:function(L){ return $Doc.docNumTr(L,0,1); }}],
		cdcId:['Centro de Costo',{k:'cdcId',_gTb:'gfiOcdc'}],
		cardName:['Tercero',{k:'cardName'}],
		accCode:['Cód. Cuenta'],
		accName:['Nombre Cuenta'],
		baseAmnt:['Base',{k:'baseAmnt',format:'$'}],
		debBal:['Débito',{k:'debBal',format:'$'}],
		creBal:['Crédito',{k:'creBal',format:'$'}]
		};
		var Tbs=[];
		var L0={}; for(var i in Jr.L){ L0=Jr.L[i]; break; }
		for(var k in Rep){
			if(typeof(L0[k])!='undefined'){ Tbs.push(Rep[k][0]); }
			else{ delete(Rep[k]); }
		}
		var tbc=$1.t('div');
		var tb=$1.T.table(Tbs,0,tbc);
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
		$1.t('h5',{textNode:'Diseñado por ADM Sistems - Generado desde ModulApp One'},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Reporte Impuestos'});
		cont.appendChild(tb)
	}});
},
sf:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gfi.b+'accRep/sf',inputs:$Api.getFilter(),loadVerif:0,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var tbc=$1.T.table([]);
		var tBody=$1.t('tBody',0,tbc);
		var tC={}; var tCx={};
		for(var i in Jr.L){ var L=Jr.L[i];
			var k=L.balType;
			if(!tC[k]){ tC[k]={balTo:0,C:[]}; }
			tC[k].balTo += L.balTo*1;
			tC[k].C.push(L);
		}
		var lasx=''; var totalL=0;
		var css1='backgroundColor:#DDD;';
		var css2='backgroundColor:#DDD; fontWeight:bold;';
		var css3='fontWeight:bold;';
		for(var i in $TbV.gfiPdcBalType){ var TR=$TbV.gfiPdcBalType[i];
			var Ls=(tC[TR.k])?tC[TR.k]:{};
			//Total de A,P,PAT
			if(lasx!='' && lasx!=TR.prp1){
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:'Total',style:css2},tr);
				$1.t('td',{textNode:'',style:css2},tr);
				$1.t('td',{textNode:$Str.money(totalL),style:css2},tr);
				$1.t('td',{colspan:2,style:css2},tr);
				totalL=0;
			}
			//Encabezado
			if(lasx!=TR.prp1){
				var tr=$1.t('tr',0,tBody);
				txt=(TR.prp1=='A')?'Activo':'Pasivo';
				if(TR.prp1=='PAT'){ txt='Patrimonio'; }
				$1.t('td',{textNode:txt,colspan:5,style:css1},tr);
			}
			lasx=TR.prp1;
			//Corriente,No Cor
			var tr=$1.t('tr',{'class':'__balType_'+TR.k},tBody);
			var Tt={textNode:TR.v,style:css3};
			var val=(Ls.balTo)?Ls.balTo:0;
			totalL += val*1;
			$1.t('td',0,tr);
			$1.t('td',Tt,tr);
			$1.t('td',{textNode:$Str.money(val),style:css3},tr);
			$1.t('td',{colspan:2},tr);
			//subcuentas
			for(var i in Ls.C){
				var tr=$1.t('tr',0,tBody);
				$1.t('td',0,tr);
				$1.t('td',0,tr);
				$1.t('td',{textNode:$Str.money(Ls.C[i].balTo)},tr);
				$1.t('td',{textNode:Ls.C[i].accCode},tr);
				$1.t('td',{textNode:Ls.C[i].accName},tr);
			}
		}
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Estado Situación Financiera'});
		cont.appendChild(tb)
	}});
},
er:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gfi.b+'accRep/er',inputs:$Api.getFilter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep={
		erType:['Tipo',{k:'erType',_gTbV:'gfiPdcErType'}],
		accGr:['Grupo',{k:'accGr',_V:'gfiPdcGr'}],
		accCode:['Cód. Cuenta'],
		accName:['Nombre Cuenta'],
		balTo:['',{k:'balTo',numAbs:'Y',format:'$'}]
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
		$1.t('h5',{textNode:'Diseñado por ADM Sistems - Generado desde ModulApp One'},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Estado Resultados'});
		cont.appendChild(tb)
	}});
},
sfv1:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Gfi.b+'accRep/sf',inputs:$Api.getFilter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep=[
		['Tipo',{k:'balType',_gTbV:'gfiPdcBalType'}],
		['Grupo',{k:'accGr',_V:'gfiPdcGr'}],
		['Cód. Cuenta',{k:'accCode'}],
		['Nombre Cuenta',{k:'accName'}],
		['',{k:'balTo',format:'$','class':tbCal._cell,ncol:1}]
		];
		var TbD=$Doc.colsTable(Jr.L,Rep);
		var tbc=$1.t('div');
		var tb=$1.T.table(TbD.Tb,0,tbc);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		var tFs=[];
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			for(var k in Rep){ var Lk=Rep[k][1];
				var lTag={textNode:L[k]};
				if(Lk){ lTag=$1.setTag(Lk,L,Lk); }
				lTag.coper='+';
				if(L.balTo>0){ lTag.coper='-'; }
				$1.t('td',lTag,tr);
				if(ln==0){ tFs.push({}); }
			}
			ln=1;
		}
			var trF=$1.t('tr',0,$1.t('tbody',0,tb));
		for(var i in tFs){
			var lastTd=$1.t('td',{},trF);
		}
		lastTd.setAttribute('format','$');
		lastTd.classList.add(tbCal._cell+'_1');
		tbCal.sumCells(tb);
		$1.t('h5',{textNode:'Diseñado por ADM Sistems - Generado desde ModulApp One'},tbc);
		var tb=$1.T.tbExport(tbc,{print:'Y',ext:'xlsx',fileName:'Estado Situación Financiera'});
		cont.appendChild(tb)
	}});
},

}

var GfiTes={};

$M.kauAssg('gfiAcc',[
	{k:'gfiAcc',t:'Contabilidad Basico'},
	{k:'gfiDcc',t:'Documento Contable'},
	{k:'gfiAccRep',t:'Reportes Contables'},
]);

$M.liAdd('gfiDcc',[
{_lineText:'Documento Contable'},
	{k:'gfiDcc',t:'Documento Contable', kau:'gfiDcc',ini:{f:'gfiDcc', btnGo:'gfiDcc.form',gyp:Gfi.Dcc.get }},
	{k:'gfiDcc.form',t:'Documento Contable', kau:'gfiDcc',ini:{g:Gfi.Dcc.form }},
	{k:'gfiDcc.view',noTitle:'Y',t:'Documento Contable (Doc)', kau:'gfiDcc', ini:{g:Gfi.Dcc.view }},
],{prp:{mdlActive:'gfiAcc'}});
$M.liRep('gfiAcc',[
	{_lineText:'Reportes'},
	{k:'gfiAccRep.daily',t:'Libro Diario', kau:'gfiAccRep',ini:{f:'gfiAccRep.daily'}},
	{k:'gfiAccRep.major',t:'Libro Mayor', kau:'gfiAccRep',ini:{f:'gfiAccRep.major' }},
	{k:'gfiAccRep.auxAcc',t:'Auxiliar Cuenta', kau:'gfiAccRep',ini:{f:'gfiAccRep.auxAcc' }},
	{k:'gfiAccRep.taxes',t:'Impuestos y Retenciones', kau:'gfiAccRep',ini:{f:'gfiAccRep.taxes' }},
	{k:'gfiAccRep.sf',t:'Situación Financiera', kau:'gfiAccRep',ini:{f:'gfiAccRep.sf' }},
	{k:'gfiAccRep.er',t:'Estado Resultados', kau:'gfiAccRep',ini:{f:'gfiAccRep.er' }},
],{repM:['gfiAcc'],prp:{mdlActive:'gfiAcc'}});
$M.liAdd('gfi',[{_lineText:'_TB'}]);
$Tb._iF({kMdl:'gfi',kObj:'gfiOban',kau:'gfiBan',api:Api.Gfi.b+'ban',vid:'banId',liTxtG:'Cuentas',liTxtF:'Cuenta', Cols:[
['Código',{k:'banCode',T:{divLine:1,tag:'input',divLine:1,wxn:'wrapx8'}}],
['Nombre',{k:'banName',T:{tag:'input',wxn:'wrapx4'}}],
['Tipo',{k:'banType',_V:'gfiBanType',T:{tag:'select',opts:$V.gfiBanType,wxn:'wrapx8'}}],
['Cuenta Contable',{k:'accName',T:{tag:'apiSeaBox',api:Api.Acc.b+'sea/pdc',vSea:'lvType=D&comp=bank',AJsPut:['accId'],wxn:'wrapx4'}}],
['Número',{k:'banNumber',T:{tag:'input',divLine:1,wxn:'wrapx8'}}],
['Cupo',{k:'tcBal',format:'$',T:{tag:'$',wxn:'wrapx8'}}],
['Saldo',{k:'bal',format:'$',TNO:1}],
]
});
