Api._geo='/1c/geo/';
$Xls_extDef='xlsx';
$MdlStatus.put('parWac','Y');
/* Reset Mlds */
$M.liReset();
$M.iniSet={
nty:'N',
help:'N',
menu:'L',
mliDel:['sysreports']
}
$M.li['itm.p'].t='Items';
/* end reset */

$Doc.a['geo.remi'] ={a:'geo.remi',docT:'Proyecto de Obra'};
$Doc.a['geoCrp'] ={a:'geoCrp',docT:'Doc. Cierre Parcial Proyecto'};
//Al final mas largas
$V.JDriveSysCode=[{k:'sgc',v:'Gestión Calidad'}];
$V.geoLineStatus=[{k:'C',v:'Facturado'},{k:'O',v:'Pendiente'}];
$V.geoStatusEns=[{k:'P',v:'Pendiente'},{k:'R',v:'Revisar'},{k:'C',v:'Revisado'}];
$V.geoCilTipoFalla=[{k:'falla_cono',v:'Cono'},{k:'falla_conoycorte',v:'Cono y Corte'},{k:'falla_conoyhendidura',v:'Cono y Hendidura'},{k:'falla_corte',v:'Corte'},{k:'falla_fracturaesquina',v:'Fractura Esquina'},{k:'falla_grietasverticales',v:'Grietas Verticales'},{k:'falla_verticalcolumnar',v:'Vertical Columnar'},{k:'falla_columar',v:'Columnar'}];
$V.geoCementos=[{k:'ARGOS',v:'ARGOS'},{k:'CAIRO',v:'CAIRO'},{k:'CALDAS',v:'CALDAS'},{k:'CARIBE',v:'CARIBE'},{k:'CEMEX',v:'CEMEX'},{k:'HOLCIM-BOYACA',v:'HOLCIM-BOYACA'},{k:'NARE',v:'NARE'},{k:'PAZ DEL RIO',v:'PAZ DEL RIO'},{k:'RIO CLARO',v:'RIO CLARO'},{k:'SAN MARCOS',v:'SAN MARCOS'},{k:'Ultracem',v:'Ultracem'},{k:'UNO A',v:'UNO A'},{k:'VALLE',v:'VALLE'}];
$V.geoDensLeyD={
base:'Base',subbase:'SubBase',afirmado:'Afirmado'
};
$V.geoDensLey={
base:'Según las especificaciones generales de construcción de carreteras, Artículo 330-07 Numerales 330.5.2.2; el porcentaje de compactación de los materiales de base debe ser como mínimo Dm - (k*s) >= De , según relación de densidad de campo contra densidad máxima de laboratorio obtenida por medio del ensayo de proctor modificado (I.N.V E - 142 - 07)',
subbase:'Según las especificaciones generales de construcción de carreteras, Artículo 320-07 Numerales 320.5.2.2; el porcentaje de compactación de los materiales de Sub-base debe ser como mínimo Dm - (k*s) >= 0,95 De , según relación de densidad de campo contra densidad máxima de laboratorio obtenida por medio del ensayo de proctor modificado (I.N.V E - 142 - 07)',
afirmado:'Según las especificaciones generales de construcción de carreteras, Artículo 311-07 Numerales 311.5.2.2; el porcentaje de compactación de los materiales de afirmado debe ser como mínimo Dm - (k*s) >= 0,95 De , según relación de densidad de campo contra densidad máxima de laboratorio obtenida por medio del ensayo de proctor modificado (I.N.V E - 142 - 07)'
};

$M.sAdd([
{L:[
{folId:'geoRemi',MLis:['geo.remi']},
{folId:'geoFact',folName:'Facturación',ico:'fa fa-money',folColor:'#0F0'},
{folId:'geoCartera',folName:'Cartera',ico:'fa fa-handshake-o'},
{folId:'geoGer',folName:'Gerencia',ico:'fa fa-shield',folColor:'#1fa67a'},
{folId:'geoDoc',folName:'Nube',ico:'fa fa-cloud',folColor:'#4285f4'},
{MLis:['geoAf','gvtSop','geoTask','crd.c','cpr','itm.p']},
{folId:'cnf',folName:'Configuración',ico:'fa fa-cog'}
]},
{fatherId:'geoGer',MLis:['geoGer.xfac','geoGer.actu','geoGer.factu','geoGer.cliente','geoGer.pagado','geoGer.iva']},
{fatherId:'geoFact',MLis:['geo.inv.remiOpen','geoCrp','gvtSin','dfe.inv']},
{fatherId:'geoCartera',MLis:['gvtRcv','finRep.cxc']},
{fatherId:'cnf',MLis:['cnf.meusr','cnf.mecrd']},
{fatherId:'cnf',L:[{folId:'cnfUser',folName:'Usuarios'}]},
{fatherId:'cnfUser',MLis:['cnf.users']},
{fatherId:'cnf',MLis:['cnf.docserie']},
]);

$M.add([
{liA:'_geo',rootFolder:'Geotecnia',
	L:[
	{k:'geo.public',t:'Permisos Generales',P:[{t:'Varios'}]},
	{k:'geoRemi',t:'Proyectos',P:['R','W']},
	{k:'geo.inv.remiOpen',t:'Proyectos por Facturas'},{k:'geoCrp',t:'Cierre Parcial Proyecto',P:['R','W']},
	{k:'geoTask',t:'Tareas'},{k:'geoAf',t:'Alquiler Formaletas'},{k:'geoGer',t:'Reportes de Gerencia'}
	]
}]);

_Fi['geoEnsFilt']=function(wrap,Pad){
	var Pa=$M.read();
	var jsF='jsFiltVars';
	var div=$1.t('div',0,wrap);
	$1.t('span',{textNode:'Ensayos del No. de Prueba '},wrap);
	$1.t('input',{type:'hidden',name:'docEntry','class':jsF,value:Pa.docEntry},wrap);
	$1.t('input',{type:'number',inputmode:'number',min:0,name:'lineNum(E_mayIgual)',style:'width:4rem','class':jsF},wrap);
	$1.t('span',{textNode:' al  '},wrap);
	$1.t('input',{type:'number',inputmode:'number',min:0,name:'lineNum(E_menIgual)',style:'width:4rem','class':jsF},wrap);
	var Pa=$M.read('!');
		if(Pad){ Pa=Pad; }
	if(Pa.match(/geoLb\.dens\.view/)){
		var div=$1.t('div',0,wrap);
		$1.t('span',{textNode:'Leyenda: '},div);
		$1.T.sel({id:'__geoDensLey',opts:$V.geoDensLeyD,style:'width:100px'},div);
	}
	var div=$1.t('div',0,wrap);
	$1.t('span',{textNode:'Estado: '},div);
	$1.T.sel({name:'lineStatus','class':jsF,opts:$V.geoStatusEns},div);

	if(Pa.match(/geoLb\.nuc\.form/)){ func=$_GeoLb.Nuc.form; }
	else if(Pa.match(/geoLb\.nuc\.view/)){ func=$_GeoLb.Nuc.view; }
	else if(Pa.match(/geoLb\.vig\.view/)){ func=$_GeoLb.Vig.view; }
	else if(Pa.match(/geoLb\.vig\.form/)){ func=$_GeoLb.Vig.form; }
	else if(Pa.match(/geoLb\.cil\.view/)){ func=$_GeoLb.Cil.view; }
	else if(Pa.match(/geoLb\.cil\.form/)){ func=$_GeoLb.Cil.form; }
	else if(Pa.match(/geoLb\.dens\.view/)){ func=$_GeoLb.Dens.view; }
	else if(Pa.match(/geoLb\.dens\.form/)){ func=$_GeoLb.Dens.form; }
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:func},wrap);
}
_Fi['geoInvRemiOpen']=function(wrap){
	var jsF='jsFiltVars';
	var Bal=[{wxn:'wrapx8',L:'Actualizada Hasta:',I:{tag:'input',type:'date',name:'A.dateUpd(E_menIgual)(T_time)','class':' __geoLineDate',value:$2d.today}}];
	$Doc.filtForm({func:$_Geo.Inv.remiOpen,adds:Bal,docNum:'N',rows:'Y'},wrap);
}
_Fi['geoCrp']=function(wrap){
	var jsF='jsFiltVars';
	var Bal=[{wxn:'wrapx8',L:'Número Factura Sistema',I:{tag:'input',type:'text',name:'A.invId','class':jsF}},{wxn:'wrapx8',L:'Número Proyecto',I:{tag:'input',type:'text',name:'A.remiId','class':jsF}}];
	$Doc.filtForm({func:$_Geo.Crp.get,adds:Bal,docStatus:$V.dStatus,docNum:'N',rows:'N',card:'N',orderBy:'dateCDesc'},wrap);
}
_Fi['geo.remi']=function(wrap){
	var jsF='jsFiltVars';
	var Bal=[{wxn:'wrapx8',L:'Número Proyecto',I:{tag:'input',type:'text',name:'A.docEntry','class':jsF}}];
	$Doc.filtForm({func:$_Geo.Remi.get,adds:Bal,docEntry:'N',docNum:'N',rows:'N',orderBy:'docDateDesc'},wrap);
}
_Fi['geoTask']=function(wrap){
	var jsF='jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Fecha:',I:{tag:'input',type:'date',name:'date','class':jsF+' __geoTaskDate',value:$2d.today}},wrap);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:$_Geo.Task.form},wrap);
}
_Fi['geoAf']=function(wrap){
	var jsF='jsFiltVars';
	var Bal=[];
	$Doc.filtForm({func:$_GeoAf.get,adds:Bal,docEntry:'Y',docNum:'N',rows:'Y',orderBy:'docDateDesc'},wrap);
}


$M.li['geo.remi']={t:'Proyectos',kau:'geoRemi',func:function(){
	var btn = $1.T.btnFa({faBtn:'fa_doc',textNode:'Nuevo Proyecto', func:function(){ $M.to('geo.remi.form'); }});
	$M.Ht.ini({btnNew:btn,func_filt:'geo.remi',gyp:$_Geo.Remi.get}); }
}
$M.li['geo.remi.form']={t:'Formulario Proyecto',kau:'geoRemi.write',func:function(){
	$M.Ht.ini({func_cont:$_Geo.Remi.form}); }
}
$M.li['geo.remi.view']={t:'Perfil de Proyecto',kau:'geoRemi',func:function(){ $M.Ht.ini({func_cont:$_Geo.Remi.view}); } }

$M.li['geo.inv.remiOpen']={t:'Proyectos por Facturar',kau:'geo.public',func:function(){ $M.Ht.ini({func_filt:'geoInvRemiOpen',gyp:$_Geo.Inv.remiOpen}); } };
$M.li['geo.inv.statuse']={t:'Estado Cuenta Proyecto',kau:'geo.public',func:function(){ $M.Ht.ini({func_cont:$_Geo.Inv.statuse}); } };
$M.li['geoCrp']={t:'Cierres Parciales Proyectos',kau:'geoCrp',func:function(){ $M.Ht.ini({func_filt:'geoCrp',gyp:$_Geo.Crp.get}); } };
$M.li['geoCrp.form']={t:'Cierre Parcial',kau:'geoCrp.write',func:function(){ $M.Ht.ini({func_cont:$_Geo.Crp.form}); } };
$M.li['geoCrp.view']={noTitle:'Y',kau:'geoCrp',func:function(){ $M.Ht.ini({func_cont:$_Geo.Crp.view}); } };
$M.li['geoCrp.viewFac']={noTitle:'Y',kau:'geoCrp',func:function(){ $M.Ht.ini({func_cont:$_Geo.Crp.viewFac}); } };
$M.li['geoTask']={t:'Tareas',kau:'geoTask',func:function(){ $M.Ht.ini({func_filt:'geoTask',func_cont:$_Geo.Task.form}); } };


$M.li['geoLb.cil.form']={t:'Formulario Cilindros',kau:'geoRemi.write',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt',func_cont:function(){ $_GeoLb.Cil.form({n:1}); } }); } }
$M.li['geoLb.cil.view']={t:'Formato Cilindros',kau:'geoRemi',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt'}); } }

$M.li['geoLb.vig.form']={t:'Formulario Viguetas',kau:'geoRemi.write',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt',func_cont:function(){ $_GeoLb.Vig.form({n:1}); } }); } }
$M.li['geoLb.vig.view']={noTitle:'Y',kau:'geoRemi',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt'}); } }

$M.li['geoLb.dens.form']={t:'Formulario Densidad',kau:'geoRemi.write',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt',func_cont:function(){ $_GeoLb.Dens.form({n:1}); } }); } }
$M.li['geoLb.dens.view']={noTitle:'Y',kau:'geoRemi',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt'}); } }

$M.li['geoLb.nuc.form']={t:'Formulario Núcleos',kau:'geoRemi.write',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt',func_cont:function(){ $_GeoLb.Nuc.form({n:1}); } }); } }
$M.li['geoLb.nuc.view']={noTitle:'Y',kau:'geoRemi',func:function(){ $M.Ht.ini({func_filt:'geoEnsFilt'}); } }

$_Geo={};
$_Geo.Remi={
opts:function(P,pare){
	var L=P.L;
	var Li=[];
	Li.push({ico:'fa fa_pencil',textNode:' Modificar',P:L,func:function(P){ $M.to('geo.remi.form','docEntry:'+P.P.docEntry); }});
	Li=$Opts.add('geoRemi',Li,L);
	console.log(Li);
	$1.Menu.winLiRel({Li:Li,textNode:P.textNode},pare);
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api._geo+'remi',inputs:$1.G.filter(),
	fOpts:$_Geo.Remi.opts,view:'Y',btns:'edit',docBy:'userDate',
	tt:'geo.remi',
	TD:[
		{H:'Actualizado',k:'dateUpd'},
		{H:'Cliente',k:'cardName'},
		{H:'Proyecto',k:'proyect'},
		{H:'Descripción.',k:'lineMemo'},
	],
	tbExport:{ext:'xlsx',fileName:'Proyectos'}
	},cont);
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/profile',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var f1=$1.t('fieldset',{'class':'fieldset'},cont);
		$1.t('legend',{textNode:'Proyecto No. '+Pa.docEntry},f1);
		var d1=$1.t('div',{'class':'if_wrapx1'},f1);
		$1.t('label',{'class':'label',textNode:'Cliente: '},d1);
		$1.t('span',{textNode:Jr.cardName},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},f1);
		$1.t('label',{'class':'label',textNode:'Proyecto: '},d1);
		$1.t('span',{textNode:Jr.proyect},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},f1);
		$1.t('label',{'class':'label',textNode:'Creado: '},d1);
		$1.t('span',{textNode:Jr.dateC},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},f1);
		$1.t('label',{'class':'label',textNode:'Actualizado: '},d1);
		$1.t('span',{textNode:Jr.dateUpd},d1);
		var lb=[{t:'Cilindros',a:'geoLb.cil'},{t:'Densidad de Campo',a:'geoLb.dens'},{t:'Viguetas',a:'geoLb.vig'},{t:'Núcleos',a:'geoLb.nuc'},{t:'Bloques',a:'geoLb.blo'},
		/* {t:'C.B.R',a:'geoLb.cbr'},{t:'C.I.',a:'geoLb.ci'},{t:'Marshall',a:'geoLb.mar'} */
		];
		for(var i in lb){
			var dx=$1.t('div',{style:'borderRight:1px solid #CCC; padding:3px; display:inline-block; margin-right:4px;'},f1);
			$1.t('a',{href:$M.to(lb[i].a+'.form','docEntry:'+Pa.docEntry,'r'),title:'Formulario','class':'fa fa-pencil'},dx);
			$1.t('span',{textNode:'\u0020\u0020\u0020'},dx);
			$1.t('a',{href:$M.to(lb[i].a+'.view','docEntry:'+Pa.docEntry,'r'),title:'Visualizar',textNode:lb[i].t},dx);
		}
	{/* añadir items */
		var f1=$1.t('fieldset',{'class':'fieldset'},cont);
		$1.t('legend',{textNode:'Registrar Articulos'},f1);
		var fx=$1.t('fieldset',{'class':'fieldset'},cont);
		$1.t('legend',{textNode:'Listado de Items'},fx);
		$Api.JS.addF({name:'docEntry',value:Pa.docEntry},fx);
		Itm.Fx.tbSea({func:function(Dr){
			for(var i in Dr){
				var trn=$1.t('tr',0,trI);
				$1.I.after(trn,trI);
				Dr[i].lineDate=$2d.today;
				trA(Dr[i],trn);
			}
		}},f1);
		var resp=$1.t('div',0,f1);
		$Api.send({PUT:Api._geo+'remi/line',jsBody:fx,loade:resp,func:function(Jr){
			$Api.resp(resp,Jr);
			if(!Jr.errNo){ $_Geo.Remi.profile(); }
		}},f1);
	}
	{//listar items
		var tb=$1.T.table(['','Fecha','Estado','Cant','UdM','Precio Unit.','Total','Código','Descripción','Observación'],0,fx);
		var tBody=$1.t('tbody',0,tb);
		var trI=$1.t('tr',0,tBody);
		$1.t('td',{textNode:'Items',colspan:10},trI);
		var trLb=$1.t('tr',0,tBody);
		$1.t('td',{textNode:'Ensayos de Laboratorio',colspan:10},trLb);
		var jsL=$Api.JS.clsLN;
		for(var i in Jr.L){ L=Jr.L[i];
			var tr=$1.t('tr'); tr.classList.add(tbCal._row);
			if(L.ensType!='N'){
				$1.I.after(tr,trLb);
				$1.t('td',{colspan:2},tr);
				$1.t('td',{textNode:_g(L.lineStatus,$V.geoLineStatus)},tr);
				$1.t('td',{textNode:L.quantity*1},tr);
				$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
				$1.t('td',{textNode:$Str.money(L.price)},tr);
				$1.t('td',{textNode:$Str.money(L.priceLine),'class':tbCal._cell,ncol:1},tr);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
			}
			else{ $1.I.after(tr,trI); trA(L,tr); }

		}
		var tr=$1.t('tr',0,tBody);
		$1.t('td',{colspan:6,textNode:'Total'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+1,format:'$'},tr);
		$1.t('td',{colspan:3},tr);
		tbCal.sumCells(tb);
	}
	function tbTotl(tb,x){
		tbCal.get(tb,x);
		tbCal.sumCells(tb);
	}
	function trA(L,tr){
			tr.classList.add(tbCal._row);
			var jsL=$Api.JS.clsLN;
			var qty=(L.quantity)?L.quantity:1;
			var price=(L.sellPrice)?L.sellPrice:L.price;
			var td0=$1.t('td',0,tr);
			if(L.lineStatus=='facturado' || L.lineStatus=='C'){
				$1.t('td',{textNode:L.lineDate},tr);
				$1.t('td',{textNode:_g(L.lineStatus,$V.geoLineStatus)},tr);
				$1.t('td',{textNode:L.quantity*1},tr);
				$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
				$1.t('td',{textNode:$Str.money(L.price)},tr);
				$1.t('td',{textNode:$Str.money(L.priceLine),'class':tbCal._cell,ncol:1},tr);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
			}
			else{
				tr.classList.add($Api.JS.clsL);
				$Api.JS.addF({jsF:jsL,name:'itemId',value:L.itemId},tr);
				if(L.id){
					$Api.JS.addF({jsF:jsL,name:'id',value:L.id},tr);
					$1.T.ckLabel({id:'ide'+L.id,I:{'class':jsL,name:'delete'}},td0);
				}else{
					$1.T.btnFa({fa:'fa_close',textNode:'Eliminar',P:tr,func:function(T){ $1.delet(T.P); }},$1.t('td',0,td0));
				}
				$1.lTag({tag:'date','class':jsL,name:'lineDate',value:L.lineDate},$1.t('td',0,tr));
				$1.t('td',0,tr);
				var td=$1.t('td',0,tr);
				$1.lTag({tag:'number','class':jsL+' '+tbCal._cell,cn:1,name:'quantity',value:qty,style:'width:64px'},td).keyChange(function(T){ tbTotl(T.parentNode.parentNode.parentNode,['cn1','x','cn2']); });;
				$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
				$1.lTag({tag:'$','class':jsL+' '+tbCal._cell,cn:2,name:'price',value:price,style:'width:100px'},$1.t('td',0,tr)).keyChange(function(T){ tbTotl(T.parentNode.parentNode.parentNode,['cn1','x','cn2']); });
				$1.t('td',{'class':tbCal._cell,cn:'nT',format:'$',ncol:1},tr);
				$1.t('td',{textNode:L.itemCode},tr);
				$1.t('td',{textNode:L.itemName},tr);
				$1.lTag({tag:'input','class':jsL,name:'lineMemo',value:L.lineMemo},$1.t('td',0,tr));
				tbTotl(tr.parentNode,['cn1','x','cn2']);
			}
		}
	}});
},
form:function(Pa){
	var Pa=$M.read();
	var Pa=(Pa)?Pa:{};
	var cont=$M.Ht.cont; var jsF=$Api.JS.cls;
	$Api.get({f:Api._geo+'remi/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
		var Ds={cont:cont, docEntry:Pa.docEntry, serieOpts:$Tb.docOser_F,jsF:jsF,
		tbLines:null,POST:Api._geo+'remi', func:function(Jr2){
			$Doc.to('geo.remi','.view',Jr2);
		},
		Li:[
		{fType:'lTag',tag:'crd',wxn:'wrapx4',L:'Cliente',req:'Y',I:{'class':jsF,fie:'',jsVB:['cardId','cardName'],topPare:cont,D:Jr}},
		{wxn:'wrapx8',L:'Fecha',I:{tag:'input',type:'date','class':jsF,name:'docDate',value:Jr.docDate}},
		{divLine:1,wxn:'wrapx1',L:'Proyecto',I:{tag:'input',type:'text','class':jsF,name:'proyect',value:Jr.proyect}},
		{divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'textarea','class':jsF,name:'lineMemo',textNode:Jr.lineMemo}}
		]
		};
		if(Pa.docEntry){
			Ds.PUT=Ds.POST; delete(Ds.POST);
		}
		$Doc.form(Ds);
	}
	});
}
}

$_Geo.Inv={
optsRemiOpen:function(P,pare){
	var L=P.L;
	var Li=[];
	Li.push({ico:'fa fa_pencil',textNode:' Modificar',P:L,href:$M.to('geo.remi.profile','docEntry:'+L.docEntry,'r') });
	Li.push({ico:'fa fa-book',textNode:' Estado de Cuenta',P:L,href:$M.to('geo.inv.statuse','docEntry:'+L.docEntry+',lineDate:'+L.lineDate,'r') });
	Li.push({ico:'fa fa-file-o',textNode:' Cierre Parcial',P:L,href:$M.to('geoCrp.form','docEntry:'+L.docEntry+',lineDate:'+L.lineDate,'r') });
	//Li.push({ico:'fa fa-file-o',textNode:' Plantilla Factura',P:L,func:function(T){ $_Geo.Inv.toInv(T.P); } });
	$1.Menu.winLiRel({Li:Li,textNode:P.textNode},pare);
},
remiOpen:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api._geo+'inv/remiOpen',inputs:$1.G.filter(),loade:cont,func:function(Jr){
		var tb=$1.T.table(['','No. Proyecto','Cliente','Creada','Actualizada','Proyecto','Valor sin IVA']);
		var tBody=$1.t('tbody',0,tb);
		var lineDate=$1.q('.__geoLineDate');
		lineDate=(lineDate)?lineDate.value:'null';
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',0,tr); L.lineDate=lineDate;
			$_Geo.Inv.optsRemiOpen({L:L},td);
			$1.t('td',{textNode:L.docEntry},tr);
			$1.t('td',{textNode:L.cardName},tr);
			$1.t('td',{textNode:L.dateC},tr);
			$1.t('td',{textNode:L.dateUpd},tr);
			$1.t('td',{textNode:L.proyect},tr);
			$1.t('td',{textNode:$Str.money(L.docTotalxInv)},tr);
		}
		cont.appendChild($1.T.tbExport(tb,{ext:'xlsx',name:'Proyectos sin Facturar',print:'Y'}));
	}});
},
statuse:function(){
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'inv/statuse',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var fi=$1.t('fieldset',{'class':'fieldset'},cont);
		$1.t('legend',{textNode:'Estado de cuenta según Proyecto'},fi);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'No. Proyecto: ' },d1);
		$1.t('span',{textNode:Pa.docEntry},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'N.I.T. / C.C.: ' },d1);
		$1.t('span',{textNode:Jr.licTradNum},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'Cliente: ' },d1);
		$1.t('span',{textNode:Jr.cardName},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'Proyecto: ' },d1);
		$1.t('span',{textNode:Jr.proyect},d1);
		var d1=$1.t('div',{'class':'if_wrapx0'},fi);
		$1.t('label',{'class':'label',textNode:'Fecha Creación:' },d1);
		$1.t('span',{textNode:$2d.f(Jr.dateC,'d-mmm-Y')},d1);
		var d1=$1.t('div',{'class':'if_wrapx0'},fi);
		$1.t('label',{'class':'label',textNode:'Fecha Consulta:' },d1);
		$1.t('span',{textNode:$2d.f($2d.today,'d-mmm-Y')},d1);
		var tb=$1.T.table(['','Estado','Cant.','UDM','Precio Unit.','Total','Nombre'],{'class':'table_cl table_x100'},cont);
		var tBody=$1.t('tbody',0,tb);
		var Dt={total:0,totalFac:0,balDue:0};
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',0,tr);
			var priceLine=L.priceLine*1;
			$1.t('td',{textNode:_g(L.lineStatus,$V.geoLineStatus)},tr);
			$1.t('td',{textNode:L.quantity},tr);
			$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
			$1.t('td',{textNode:$Str.money(L.price)},tr);
			$1.t('td',{textNode:$Str.money(priceLine)},tr);
			$1.t('td',{textNode:L.itemName},tr);
			Dt.total +=priceLine;
			if(L.lineStatus=='C'){ Dt.totalFac += priceLine; }
			else{ Dt.balDue += priceLine; }
		}
		var tr=$1.t('tr',{style:'font-size:18px;'},tBody);
		$1.t('td',{colspan:5,'class':'tdh1',textNode:'Total'},tr);
		$1.t('td',{colspan:2,'class':'tdh1',textNode:$Str.money(Dt.total)},tr);
		var tr=$1.t('tr',0,tBody);
		$1.t('td',{colspan:5,textNode:'Ya Facturado'},tr);
		$1.t('td',{colspan:2,textNode:$Str.money(Dt.totalFac)},tr);
		var tr=$1.t('tr',0,tBody);
		$1.t('td',{colspan:5,'class':'tdh1',textNode:'Saldo'},tr);
		$1.t('td',{colspan:2,'class':'tdh1',textNode:$Str.money(Dt.balDue)},tr);

	}});
},
}
$_Geo.Crp={
OLi:[],
OLg:function(L){
	var Li=[]; var n=0;
		Li[n]={k:'view',ico:'fa fa-eye',textNode:' Visualizar', href:$Doc.go('geoCrp','v',L) }; n++;
		Li[n]={k:'view',ico:'fa fa_money',textNode:' Valores Actuales', href:$Doc.go('geoCrp','viewFac',L) }; n++;
	if(L.canceled=='N'){
		Li[n]={k:'statusN',ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({reqMemo:'N',docEntry:T.P.docEntry,api:Api._geo+'crp/statusCancel',text:'Se va anular el documento. Los lineas facturadas del proyecto, quedaran libres de nuevo. No se puede reversar está acción.'}); } }; n++;
	}
	if(L.docStatus=='O'){
		Li[n]={k:'statusC',ico:'fa fa-money',textNode:'Generar Factura', P:L, func:function(T){
			$Api.get({f:Api._geo+'crp/inv',inputs:'docEntry='+T.P.docEntry,winErr:1,func:function(Jr3){
					$_Geo.Crp.inv(Jr3,T.P);
				}});
		} }; n++;
	}
	return $Opts.add('geoCrp',Li,L);;
},
opts:function(P,pare){
	Li={Li:$_Geo.Crp.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api._geo+'crp',inputs:$1.G.filter(),
	fOpts:$_Geo.Crp.opts,view:'Y',docBy:'userDate',
	tt:'geoCrp',
	TD:[
		{H:'Estado',k:'docStatus',_V:'dStatus'},
		{H:'Proyecto',k:'remiId'},
		{H:'Factura',k:'invId'},
		{H:'Nombre Proyecto',k:'proyect'},
		{H:'Total',k:'docTotal',kTy:'price'},
		{H:'Cliente',k:'cardName'},
	],
	tbExport:{ext:'xlsx',fileName:'Documentos de Cierre Parcial'}
	},cont);
},
form:function(){
	var wPare=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'crp/form',inputs:'docEntry='+Pa.docEntry+'&lineDate='+Pa.lineDate,loade:wPare,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		var pare=$1.T.btnFa({faBtn:'fa-print',func:function(){
			$1.Win.print(cont);
		}
		},wPare);
		var cont=$1.t('div',0,wPare);
		var fi=$1.t('fieldset',{'class':'fieldset'},cont);
		$1.t('legend',{textNode:'Documento'},fi);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'No. Proyecto: ' },d1);
		$1.t('span',{textNode:Pa.docEntry},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'N.I.T. / C.C.: ' },d1);
		$1.t('span',{textNode:Jr.licTradNum},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'Cliente: ' },d1);
		$1.t('span',{textNode:Jr.cardName},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fi);
		$1.t('label',{'class':'label',textNode:'Proyecto: ' },d1);
		$1.t('span',{textNode:Jr.proyect},d1);
		var d1=$1.t('div',{'class':'if_wrapx0'},fi);
		$1.t('label',{'class':'label',textNode:'Fecha Creación:' },d1);
		$1.t('span',{textNode:$2d.f(Jr.dateC,'d-mmm-Y')},d1);
		var d1=$1.t('div',{'class':'if_wrapx0'},fi);
		$1.t('label',{'class':'label',textNode:'Fecha Corte:' },d1);
		$1.t('span',{textNode:$2d.f(Pa.lineDate,'d-mmm-Y')},d1);
		$1.t('p',{textNode:'La presente información es una vista previa de lo que sería su factura a la fecha.'},cont);
		if(Jr.L && Jr.L.errNo){ $Api.resp($1.t('div',0,cont),Jr.L); }
		else{
			var tb=$1.T.table(['Cant.','UDM','Precio Unit.','Imp.','Rte.','Total','Nombre'],{'class':'table_cl table_x100'},cont);
			var tBody=$1.t('tbody',0,tb);
			var Dt={total:0,totalFac:0,balDue:0};
			for(var i in Jr.L){ var L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var priceBase=L.priceLine*1;
				var priceLine=priceBase;
				if(L.ivaRate){ priceLine =priceLine + (priceBase*((L.ivaRate/100))); }
				if(L.rteRate){ priceLine =priceLine - (priceBase*((L.rteRate/100))); }
				$1.t('td',{textNode:L.quantity*1},tr);
				$1.t('td',{textNode:_g(L.udm,Udm.O)},tr);
				$1.t('td',{textNode:$Str.money(L.price)},tr);
				$1.t('td',{textNode:_g(L.vatId,$Tb.otaxI)},tr);
				$1.t('td',{textNode:_g(L.rteId,$Tb.otaxR)},tr);
				$1.t('td',{textNode:$Str.money(priceLine)},tr);
				$1.t('td',{textNode:L.itemName},tr);
				Dt.total +=priceLine;
				if(L.lineStatus=='facturado'){ Dt.totalFac += priceLine; }
				else{ Dt.balDue += priceLine; }
			}
			var tr=$1.t('tr',{style:'font-size:18px;'},tBody);
			$1.t('td',{colspan:6,'class':'tdh1',textNode:'Total'},tr);
			$1.t('td',{colspan:2,'class':'tdh1',textNode:$Str.money(Dt.total)},tr);
			var resp=$1.t('div',0,cont);
			$Api.send({POST:Api._geo+'crp',jsAdd:{remiId:Pa.docEntry,docDate:Pa.lineDate,ids:Jr.ids},loade:resp,func:function(Jr2){
				$Api.resp(resp,Jr2);
				if(!Jr.errNo){ $Doc.go('geoCrp','v',Jr2);  }
			},textNode:'Generar Documento Cierre'},wPare);
		}
	}});
},
inv:function(Jr,Jr2){
	for(var i in Jr.L){ Jr.L[i].itemSzId=$V.uniqSize; }/*definir talla unica */
	Jr.func=function(Jr3){
		$Api.put({f:Api._geo+'crp',jsAdd:{docEntry:Jr2.docEntry,invId:Jr3.docEntry},winErrr:1});
	}
	Jr.uniqLine='N'; //pueden agregarse varios
	$Cche.d(Jr);
	$M.to('gvtSin.form');
},
view:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont;
	$Api.get({f:Api._geo+'crp/view', inputs:'docEntry='+Pa.docEntry,loade:contPa, func:function(Jr){
		var cont=$1.t('div',0,contPa);
		$Doc.btnsTop('print,statusN,statusC,',{iconss:'Ys',Li:$_Geo.Crp.OLg(Jr),contPrint:cont},contPa);
		if(Jr.L && !Jr.L.errNo){
			for(var i in Jr.L){
				if(Jr.L[i].ensNum){
					var tmin=eval('Math.min('+Jr.L[i].ensNum+')');
					var tmax=eval('Math.max('+Jr.L[i].ensNum+')');
					Jr.L[i].detalle = 'De '+tmin+' A '+tmax;
				}
			}
		}
		$Doc.view(cont,{D:Jr,
			THs:[{docEntry:'Y'},{docTitle:'Doc. Cierre Parcial Proyecto',cs:5,ln:1},{k:'dateC',cs:2,ln:1}
			,{k:'docDate',t:'Fecha'},{middleInfo:'Y'},{logo:'Y'}
			,{k:'remiId',t:'Proyecto'},{k:'invId',t:'Factura'}
			,{k:'cardName',t:'Cliente',cs:2},{k:'proyect',t:'Proyecto',cs:4,ln:1}
			],
			TLs:[{k:'itemCode',textNode:'Código'},{k:'itemName',textNode:'Descripción'},{k:'quantity',textNode:'Cant.'},{k:'detalle',textNode:'Detalles'}],
			});
	}});
},
viewFac:function(){
	var Pa=$M.read(); var contPa=$M.Ht.cont;
	$Api.get({f:Api._geo+'crp/view', inputs:'docEntry='+Pa.docEntry,loade:contPa, func:function(Jr){
		var cont=$1.t('div',0,contPa);
		$Doc.btnsTop('print,statusN,statusC,',{iconss:'Ys',Li:$_Geo.Crp.OLg(Jr),contPrint:cont},contPa);
		var Dt={total:0,totalFac:0,balDue:0};
		if(Jr.L && !Jr.L.errNo){
			for(var i in Jr.L){ L=Jr.L[i];
			 var lt=(L.priceLine*(1+(L.ivaRate/100)))-(L.priceLine*L.rteRate/100);
				Jr.L[i].priceLine = $Str.money(lt);
				Dt.total += lt;
			}
		}
		$Doc.view(cont,{D:Jr,
			THs:[{docEntry:'Y'},{docTitle:'Doc. Cierre Parcial Proyecto',cs:5,ln:1},{k:'dateC',cs:2,ln:1}
			,{k:'docDate',t:'Fecha'},{middleInfo:'Y'},{logo:'Y'}
			,{k:'remiId',t:'Proyecto'},{k:'invId',t:'Factura'}
			,{k:'cardName',t:'Cliente',cs:2},{k:'proyect',t:'Proyecto',cs:4,ln:1}
			],
			TLs:[{k:'itemCode',textNode:'Código'},{k:'itemName',textNode:'Descripción'},{k:'price',textNode:'Precio',format:'$'},{k:'quantity',textNode:'Cant.',format:'number'},{k:'vatId',textNode:'Imp.',_gTb:'otaxI'},{k:'rteId',textNode:'Rte.',_gTb:'otaxR'},{k:'priceLine',textNode:'Total',format:'$'}],
			TFs:[
			[{textNode:'Total',colspan:6},{textNode:$Str.money(Dt.total)}]
			],
			});
	}});
},
}

$_Geo.Task={
form:function(){
	var cont=$M.Ht.cont;
	var tDate=$1.q('.__geoTaskDate').value;
	$Api.get({f:Api._geo+'task', inputs:'docDate='+tDate, loadVerif:!tDate, loade:cont,func:function(Jr){
		var tb=$1.T.table(['Programado','Ejecutado'],{'class':'table_cl table_x100'},cont);
		var tBody=$1.t('tbody',0,tb);
		var jsF=$Api.JS.cls;
		if(Jr.docDate){
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',{colspan:2},tr);
			$1.T.ckLabel({t:'Seleccionar para eliminar',I:{name:'delete','class':jsF}},td);
		}
		var tr=$1.t('tr',0,tBody);
		var td=$1.t('td',0,tr);
		$1.t('textarea',{'class':jsF,name:'programado',style:'width:95%; height:250px;',textNode:Jr.programado,AJs:{docDate:tDate}},td);
		var td=$1.t('td',0,tr);
		$1.t('textarea',{'class':jsF,name:'ejecutado',style:'width:95%; height:250px;',textNode:Jr.ejecutado},td);
		var resp=$1.t('div',0,cont);
		$Api.send({POST:Api._geo+'task', jsBody:tb,loade:resp,func:function(Jr){
			$Api.resp(resp,Jr);
		}},cont);
	}});
}
}
$_GeoLb={
ini:function(){

}
};
/* Laboratorio */
$_GeoPrint={
copyNC:false,//copy no controlada
page:1,
topLb:function(P,pare){
	pare.classList.add('pageBreak');
	var divTop=$1.t('div',{'class':'divTb'});
	var dl=$1.t('div',{'class':'divTd tdMiddle',style:'width:220px;'},divTop);
	$1.t('img',{src:'http://s1.geotecniaingenieria.co/img/logo.png'},dl);
	var dm=$1.t('div',{'class':'divTd tdMiddle'},divTop);
	for(var i in P.M){ dm.appendChild(P.M[i]); }
	if($_GeoPrint.copyNC){ dm.appendChild($1.t('b',{textNode:'COPIA NO CONTROLADA'})); }
	var dr=$1.t('div',{'class':'divTd tdMiddle',style:'width:180px;'},divTop);
	$1.t('div',{textNode:P.code},dr);
	$1.t('div',{textNode:P.v},dr);
	pare.appendChild(divTop);
},
bot:function(P,pare){
	var div=$1.t('div',{'class':'bottomPrint docBottomGeo'},pare);
	if(P.befCont){
		div.appendChild(P.befCont);
	}
	$1.t('div',{textNode:'Geotecnia Ingenieria S.A.S',style:'float:left; padding:5px;'},div);
	$1.t('div',{textNode:'Página '+P.page+' de '+P.pageTotal,style:'float:right; padding:5px;'},div);
	$1.t('div',{'class':'clear'},div);
	notes = {
		'geoLb.nuc.view': 'El equipo de ensayo es automático y con control de velocidad de aplicación de la carga a una tasa de 0.25 MPa/seg.'
	}
	let noteKey = notes[$M.getUrl()]
	let addNote = noteKey != null ? '\n' + noteKey : '';
	$1.t('div',{'textNode':'En caso de que estos resultados sean usados para respaldar la calidad de los elementos frente a un tercero, se requiere firma autorizada.' + addNote, 'class':'pre100', style:'fontSize:9pt'},div);
	//$1.t('div',{'class':'pageBreak'},div);
	return div;
}
}

$_GeoLb.Cil={
form:function(P){ var P=(P)?P:{};
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/cilindros',inputs:$1.G.filter(),loadVerif:P.n, loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		$Api.JS.addF({name:'docEntry',value:Pa.docEntry},cont);
		var tb=$1.T.table(['','Estado','Fecha Prueba','No. Prueba','No. del Elemento','Fecha Vaciado','Elemento Vaciado','Asentamiento (Pulg)','Resistencia Esperada','Ø (cm)|','Carga Rotura (Kgf)','Tipo Falla','Cemento','Cemento **','Nota'],0,cont);
		$1.T.btnFa({faBtn:'fa_plusSquare',textNode:'Añadir Cilindro',func:function(){
			$_GeoLb.Cil.trA({},tBody);
		}},cont);
		var tBody=$1.t('tbody',0,tb);
		if(Jr && Jr.L && !Jr.L.errNo){ for(var i in Jr.L){ $_GeoLb.Cil.trA(Jr.L[i],tBody); } }

		var resp=$1.t('div',0,cont);
		$Api.send({PUT:Api._geo+'remi/cilindros',jsBody:cont,loade:resp,func:function(Jr){
			$Api.resp(resp,Jr);
			if(!Jr.errNo){ $_GeoLb.Cil.form(); }
		}},cont);
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/cilindros',inputs:$1.G.filter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		else if(Jr.L.errNo){ return $Api.resp(cont,Jr.L); }
		$1.T.btnPrint(cont);
		var divHead=$1.t('div');
		$_GeoPrint.topLb({code:'CÓDIGO: LB-FT-37',v:'VERSIÓN: 04',M:[
			$1.t('div',{textNode:'LABORATORIO  DE  MATERIALES Y CONCRETO'}),
			$1.t('div',{textNode:'RESISTENCIA A LA COMPRESIÓN DE CILINDROS DE CONCRETO'}),
			$1.t('div',{textNode:'I.N.V. E - 410 - 13'})
		]},divHead);
		var fie=$1.t('fieldset',{style:'margin:0 0;'},divHead);
		$1.t('legend',{textNode:'Proyecto No. '+Jr.docEntry},fie);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Cliente:','class':'label'},d1);
		$1.t('span',{textNode:Jr.cardName},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Proyecto:','class':'label'},d1);
		$1.t('span',{textNode:Jr.proyect},d1);
		//Lineas
		var tb=$1.T.table(['Elemento','Fechas','Variables','','','Tipo Falla'],{style:'width:100%; font-size:10px;'},divHead);
		var tBody=$1.t('tbody',0,tb);
		var trs=0; var page=0;
		var numxPage=5;
		var pageTotal= $js.toRound(Jr.L.length/numxPage);
		for(var i in Jr.L){ var L=Jr.L[i];
			if(trs%numxPage==0){ /* Paginar */
				var divR=divHead.cloneNode(1); page++;
				$1.delet($1.q('.docBottomGeo',divR)); /* borrar el primero */
				$_GeoPrint.bot({page:page,pageTotal:pageTotal},divR);

				cont.appendChild(divR);
				tBody=$1.q('tbody',divR);
			} trs++;
			var Le=(L.jsData)?$js.parse(L.jsData):{};
			var res_txt=Le.res_txt;
			var res_txtNum=Le.res_txtNum;
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',{style:'width:180px; height:70px;'},tr);//td1
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:L.lineNum},d1);
			$1.t('span',{textNode:'No. Prueba'},d1);
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.no_obra},d1);
			$1.t('span',{textNode:'No. Elemento'},d1);
			var d1=$1.t('div',{textNode:Le.elemento_vaciado},td);
			var td=$1.t('td',{style:'width:170px;'},tr);//td2
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:L.lineDate},d1);
			$1.t('span',{textNode:'Fecha Prueba'},d1);
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.fecha_vaciado},d1);
			$1.t('span',{textNode:'Fecha Vaciado'},d1);
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.edad},d1);
			$1.t('span',{textNode:'Edad'},d1);
			var td=$1.t('td',{style:'width:170px;'},tr);//td3
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.asentamiento},d1);
			$1.t('span',{textNode:'Asentamiento (Pulg.)'},d1);
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.resistencia_esperada},d1);
			$1.t('span',{textNode:'Resistencia Esperada ( Kgf/cm2)'},d1);
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.f_cm},d1);
			$1.t('span',{textNode:' Ø (cm)'},d1);
			var td=$1.t('td',{style:'width:180px; height:70px;'},tr);//td4
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.carga_rotura},d1);
			$1.t('span',{textNode:'Carga Rotura (Kgf)'},d1);
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.resistencia_afecha},d1);
			$1.t('span',{textNode:'Resistencia A la Fecha (Kgf/cm2)'},d1);
			var d1=$1.t('div',0,td);
			$1.t('b',{textNode:res_txt},d1);
			$1.t('span',{textNode:res_txtNum},d1);
			var td=$1.t('td',{style:'width:180px; height:70px;'},tr);//td5
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:((Le.cemento_text)?Le.cemento_text:Le.cemento)},d1);
			$1.t('span',{textNode:''},d1);
			var d1=$1.t('div',0,td);
			$1.t('span',{'class':'elemento',textNode:Le.porcentaje_fecha},d1);
			$1.t('span',{textNode:'Porcentaje a la Fecha'},d1);
			var td=$1.t('td',0,tr);//td6
			var d1=$1.t('div',0,td);
			$1.t('img',{src:'http://s1.geotecniaingenieria.co/img/'+Le.tipo_falla+'.jpg'},td);
			$1.t('div',{textNode:_g(Le.tipo_falla,$V.geoCilTipoFalla)},td);
		}
	}});
},
trA:function(L,tBody){
	if($Doc.maxTr(tBody,30)){ return false; }
	var jsF=$Api.JS.clsLN;
	var tr=$1.t('tr',{'class':$Doc.Cls.trL+' '+$Api.JS.clsL},tBody);
	var td=$1.t('td',0,tr);
	if(L.id){
		$1.T.ckLabel({I:{'class':jsF+' checkSel checkSel_trash',name:'delete'},L:{textNode:'Eliminar'}},td);
	}
	else{ $1.T.btnFa({fa:'fa-close',textNode:'Quitar',P:tr,func:function(T){ $1.delet(T.P); }},td); }
	var td=$1.t('td',0,tr);
	$1.T.sel({'class':jsF,name:'lineStatus',opts:$V.geoStatusEns,noBlank:'Y',selected:L.lineStatus},td);
	var td=$1.t('td',0,tr);
	var AJs=(L.id)?{id:L.id}:null;
	var inp=$1.t('input',{type:'date','class':jsF,name:'lineDate',value:L.lineDate,AJs:AJs},td);
	var td=$1.t('td',0,tr);
	$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'lineNum',value:L.lineNum,style:'width:4rem'},td);
	var Le=(L.jsData)?$js.parse(L.jsData):{};
	$1.t('input',{type:'text','class':jsF,name:'no_obra',jsOn:'D',value:Le.no_obra,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'date','class':jsF,name:'fecha_vaciado',jsOn:'D',value:Le.fecha_vaciado},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'elemento_vaciado',jsOn:'D',value:Le.elemento_vaciado,style:'width:5rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'asentamiento',jsOn:'D',value:Le.asentamiento,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'resistencia_esperada',jsOn:'D',value:Le.resistencia_esperada,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'f_cm',jsOn:'D',value:Le.f_cm,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'carga_rotura',jsOn:'D',value:Le.carga_rotura,style:'width:4rem'},$1.t('td',0,tr));
	$1.T.sel({'class':jsF,name:'tipo_falla',jsOn:'D',opts:$V.geoCilTipoFalla,selected:Le.tipo_falla,style:'width:4rem'},$1.t('td',0,tr));
	$1.T.sel({'class':jsF,name:'cemento',jsOn:'D',opts:$V.geoCementos,selected:Le.cemento,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'cemento_text',jsOn:'D',value:Le.cemento_text,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'limeMemo',value:L.limeMemo,style:'width:5rem'},$1.t('td',0,tr));
}
}
$_GeoLb.Dens={
form:function(P){ var P=(P)?P:{};
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/densidad',inputs:$1.G.filter(),loadVerif:P.n,loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		$Api.JS.addF({name:'docEntry',value:Pa.docEntry},cont);
		var tb=$1.T.table(['','No. Prueba','Fecha Cont.','Estado','Descrip','Abscisa','Peso frasco arena inicial (grs.)','Peso frasco arena final (grs.)','Peso arena en el cono (grs.)','Densidad de la arena ( gr/cc)','Peso material extraído (grs.)','Humedad ( % )','Densidad máxima laboratorio (g/cm3)'],0,cont);
		var tBody=$1.t('tbody',0,tb);
		if(Jr && Jr.L && !Jr.L.errNo){ for(var i in Jr.L){ $_GeoLb.Dens.trA(Jr.L[i],tBody); } }
		$1.T.btnFa({faBtn:'fa_plusSquare',textNode:'Añadir Densidad',func:function(){
			$_GeoLb.Dens.trA({},tBody);
		}},cont);
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:Api._geo+'remi/densidad',jsBody:cont,loade:resp,func:function(Jr){
			$Api.resp(resp,Jr);
			if(!Jr.errNo){ $_GeoLb.Vig.form(); }
		}},cont);
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/densidad',inputs:$1.G.filter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		else if(Jr.L.errNo){ return $Api.resp(cont,Jr.L); }
		$1.T.btnPrint(cont);
		var divHead=$1.t('div');
			$_GeoPrint.topLb({code:'CÓDIGO: LB-FT-12',v:'VERSIÓN: 03',M:[
			$1.t('div',{textNode:'LABORATORIO DE PAVIMENTOS'}),
			$1.t('div',{textNode:'DENSIDAD Y PESO UNITARIO DEL SUELO EN EL TERRENO POR EL MÉTODO DEL CONO Y ARENA DETERMINACIÓN DE LA HUMEDAD DE SUELOS EMPLEANDO UN PROBADOR CON CARBURO DE CALCIO'}),
			$1.t('div',{textNode:'I.N.V. E - 161 - 13 I.N.V. E - 150 - 13'})
		]},divHead);
		var fie=$1.t('fieldset',{style:'margin:0 0;'},divHead);
		$1.t('legend',{textNode:'Proyecto No. '+Jr.docEntry},fie);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Cliente:','class':'label'},d1);
		$1.t('span',{textNode:Jr.cardName},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Proyecto:','class':'label'},d1);
		$1.t('span',{textNode:Jr.proyect},d1);
		//Lineas
		var tb=$1.t('table',{'class':'table_cl'});
		tb.style='font-size:12px;';
		divHead.appendChild(tb);
		var tBody=$1.t('tbody',0,tb);
		var E=[{a:'lineNum',t:'No. Prueba'},
		{a:'lineDate',t:'Fecha'},{k:'text',t:'Descripción'},
		{k:'abscisa',t:'Abscisa'},
		{k:'pesofrasco_inicial',t:'Peso frasco arena inicial (grs.)'},
		{k:'pesofrasco_final',t:'Peso frasco arena final (grs.)'},
		{k:'pesoarena_usada',t:'Peso arena usada (grs.)'},
		{k:'pesoarena_encono',t:'Peso arena en el cono (grs.)'},
		{k:'pesoarena_enhueco',t:'Peso arena en el hueco (grs.)'},
		{k:'densidad_arena',t:'Densidad de la arena ( gr/cc)'},
		{k:'pesomaterial_extraido',t:'Peso material extraído (grs.)'},
		{k:'volumen_hueco',t:'Volumen del hueco ( cc )'},
		{k:'densidad_humeda',t:'Densidad húmeda ( gr/cm 3 )'},
		{k:'humedad_porc',t:'Humedad ( % )'},
		{k:'densidad_seca',t:'Densidad seca ( gr/cm 3 )'},
		{k:'densidadmax_laboratorio',t:'Densidad máxima laboratorio (g/cm3)'},
		{k:'compatacion_porc',t:'% Compactación en el terreno'}];
		for(var t in E){ $1.t('td',{textNode:E[t].t},$1.t('tr',0,tBody)); }

		var trs=0; var page=0;
		var numxPage=3;
		var pageTotal= $js.toRound(Jr.L.length/numxPage);
		for(var i in Jr.L){ var L=Jr.L[i];
			if(trs%numxPage==0){ /* Paginar */
				var divR=divHead.cloneNode(1); page++;
				$1.delet($1.q('.docBottomGeo',divR)); /* borrar el primero */
				$_GeoPrint.bot({page:page,pageTotal:pageTotal,befCont:$1.t('div',{style:'font-size:13px;','class':'_geoDensLey'})},divR);
				cont.appendChild(divR);
				tBody=$1.q('tbody',divR);
				var TRL=$1.q('tr',tBody,'all');
			} trs++;
			var Le=(L.jsData)?$js.parse(L.jsData):{};
			var nn=0;
			for(var t in E){
				var tk=(E[t].a)?E[t].a:E[t].k;
				var val=(E[t].a && L[tk])?L[tk]:tk;
				val=(E[t].k && Le[tk])?Le[tk]:val;
				$1.t('td',{textNode:val},TRL[t]);
			}
		}
		$_GeoLb.Dens.repLey($1.q('#__geoDensLey').value,cont);
	}});
},
trA:function(L,tBody){
	if($Doc.maxTr(tBody,30)){ return false; }
	var jsF=$Api.JS.clsLN;
	var tr=$1.t('tr',{'class':$Doc.Cls.trL+' '+$Api.JS.clsL},tBody);
	var td=$1.t('td',0,tr);
	if(L.id){
		$1.T.ckLabel({I:{'class':jsF+' checkSel checkSel_trash',name:'delete'},L:{textNode:'Eliminar'}},td);
	}
	else{ $1.T.btnFa({fa:'fa-close',textNode:'Quitar',P:tr,func:function(T){ $1.delet(T.P); }},td); }
	$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'lineNum',value:L.lineNum,style:'width:4rem'},$1.t('td',0,tr));
	var AJs=(L.id)?{id:L.id}:null;
	$1.t('input',{type:'date','class':jsF,name:'lineDate',value:L.lineDate,AJs:AJs},$1.t('td',0,tr));
	$1.T.sel({'class':jsF,name:'lineStatus',opts:$V.geoStatusEns,noBlank:'Y',selected:L.lineStatus},$1.t('td',0,tr));
	var Le=(L.jsData)?$js.parse(L.jsData):{};
	$1.t('input',{type:'text','class':jsF,name:'text',jsOn:'D',value:Le.text,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'abscisa',jsOn:'D',value:Le.abscisa,style:'width:5rem'},$1.t('td',0,tr));
	$1.t('input',{type:'number','class':jsF,name:'pesofrasco_inicial',jsOn:'D',value:Le.pesofrasco_inicial,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'number','class':jsF,name:'pesofrasco_final',jsOn:'D',value:Le.pesofrasco_final,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'number','class':jsF,name:'pesoarena_encono',jsOn:'D',value:Le.pesoarena_encono,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'number','class':jsF,name:'densidad_arena',jsOn:'D',value:Le.densidad_arena,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'number','class':jsF,name:'pesomaterial_extraido',jsOn:'D',value:Le.pesomaterial_extraido,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'number','class':jsF,name:'humedad_porc',jsOn:'D',value:Le.humedad_porc,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'number','class':jsF,name:'densidadmax_laboratorio',jsOn:'D',value:Le.densidadmax_laboratorio,style:'width:4rem'},$1.t('td',0,tr));

}
,
repLey:function(k,pare){
	var l=$1.q('._geoDensLey',pare,'all');
	for(var i=0; i<l.length; i++){
		l[i].innerText= $V.geoDensLey[k];
	}
}
}
$_GeoLb.Vig={
form:function(P){ var P=(P)?P:{};
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/viguetas',inputs:$1.G.filter(),loadVerif:P.n,loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		$Api.JS.addF({name:'docEntry',value:Pa.docEntry},cont);
		var tb=$1.T.table(['','Estado','Fecha Prueba','No. Prueba','No. Obra','Fecha Vaciado','Elemento Fundido','Asentamiento (Pulg)','Ancho','Altura','Largo','Resistencia Esperada MPa','Carga Rotura (N)','Cemento','Cemento**'],0,cont)
		var tBody=$1.t('tbody',0,tb);
		if(Jr && Jr.L && !Jr.L.errNo){
			for(var i in Jr.L){ $_GeoLb.Vig.trA(Jr.L[i],tBody); }
		}
		$1.T.btnFa({faBtn:'fa_plusSquare',textNode:'Añadir Vigueta',func:function(){
			$_GeoLb.Vig.trA({},tBody);
		}},cont);
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:Api._geo+'remi/viguetas',jsBody:cont,loade:resp,func:function(Jr){
			$Api.resp(resp,Jr);
			if(!Jr.errNo){ $_GeoLb.Vig.form(); }
		}},cont);
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/viguetas',inputs:$1.G.filter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		else if(Jr.L.errNo){ return $Api.resp(cont,Jr.L); }
		$1.T.btnPrint(cont);
		var divHead=$1.t('div');
		$_GeoPrint.topLb({code:'CÓDIGO: LB-FT-36',v:'VERSIÓN: 04',M:[
			$1.t('div',{textNode:'LABORATORIO DE MATERIALES Y CONCRETO'}),
			$1.t('div',{textNode:'RESISTENCIA A LA FLEXIÓN DEL CONCRETO USANDO UNA VIGA SIMPLEMENTE APOYADA Y CARGADA EN LOS TERCIOS DE LA LUZ LIBRE'}),
			$1.t('div',{textNode:'I.N.V. E - 414 - 13'})
		]},divHead);
		var fie=$1.t('fieldset',{style:'margin:0 0;'},divHead);
		$1.t('legend',{textNode:'Proyecto No. '+Jr.docEntry},fie);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Cliente:','class':'label'},d1);
		$1.t('span',{textNode:Jr.cardName},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Proyecto:','class':'label'},d1);
		$1.t('span',{textNode:Jr.proyect},d1);
		//Lineas
		var tb=$1.T.table(['Fecha Prueba','No. Prueba','No. Obra','Fecha Vaciado','Elemento Fundido','Asentamiento (Pulg)','Edad','Ancho','Altura','Largo','Resistencia Esperada MPa','Carga Rotura (N)','Resistencia a la Fecha en MPa','28 Días','Cemento']);
		tb.style='font-size:10px; width:99%';
		divHead.appendChild(tb);
		var tBody=$1.t('tbody',0,tb);
		var trs=0; var page=0;
		var numxPage=12;
		var pageTotal= $js.toRound(Jr.L.length/numxPage);
		for(var i in Jr.L){ var L=Jr.L[i];
			if(trs%numxPage==0){ /* Paginar */
				var divR=divHead.cloneNode(1); page++;
				$1.delet($1.q('.docBottomGeo',divR)); /* borrar el primero */
				$_GeoPrint.bot({page:page,pageTotal:pageTotal},divR);

				cont.appendChild(divR);
				tBody=$1.q('tbody',divR);
			} trs++;
			var Le=(L.jsData)?$js.parse(L.jsData):{};
			var tr=$1.t('tr',0,tBody);
			var cemento=(Le.cemento_text)?Le.cemento_text:Le.cemento;
			$1.t('td',{textNode:L.lineDate},tr);
			$1.t('td',{textNode:L.lineNum},tr);
			$1.t('td',{textNode:Le.no_obra},tr);
			$1.t('td',{textNode:Le.fecha_vaciado},tr);
			$1.t('td',{textNode:Le.elemento_fundido},tr);
			$1.t('td',{textNode:Le.asentamiento},tr);
			$1.t('td',{textNode:Le.edad},tr);
			$1.t('td',{textNode:Le.ancho},tr);
			$1.t('td',{textNode:Le.alto},tr);
			$1.t('td',{textNode:Le.largo},tr);
			$1.t('td',{textNode:Le.resistencia_esperada},tr);
			$1.t('td',{textNode:Le.carga_rotura},tr);
			$1.t('td',{textNode:Le.resistencia_mpa},tr);
			var td=$1.t('td',0,tr);
			$1.t('b',{textNode:Le.res_txt+': '},td);
			$1.t('span',{textNode:Le.res_txtNum},td);
			$1.t('td',{textNode:cemento},tr);
		}
	}});
},
trA:function(L,tBody){
	if($Doc.maxTr(tBody,30)){ return false; }
	var jsF=$Api.JS.clsLN;
	var tr=$1.t('tr',{'class':$Doc.Cls.trL+' '+$Api.JS.clsL},tBody);
	var td=$1.t('td',0,tr);
	if(L.id){
		$1.T.ckLabel({id:'ensId'+L.id,I:{'class':jsF+' checkSel checkSel_trash',name:'delete'},L:{textNode:'Eliminar'}},td);
	}
	else{ $1.T.btnFa({fa:'fa_close',textNode:'Quitar',P:tr,func:function(T){ $1.delet(T.P); }},td); }
	var td=$1.t('td',0,tr);
	$1.T.sel({'class':jsF,name:'lineStatus',opts:$V.geoStatusEns,noBlank:'Y',selected:L.lineStatus},td);
	var td=$1.t('td',0,tr);
	var AJs=(L.id)?{id:L.id}:null;
	var inp=$1.t('input',{type:'date','class':jsF,name:'lineDate',value:L.lineDate,AJs:AJs},td);
	var td=$1.t('td',0,tr);
	$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'lineNum',value:L.lineNum,style:'width:4rem'},td);
	var Le=(L.jsData)?$js.parse(L.jsData):{};
	$1.t('input',{type:'text','class':jsF,name:'no_obra',jsOn:'D',value:Le.no_obra,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'date','class':jsF,name:'fecha_vaciado',jsOn:'D',value:Le.fecha_vaciado},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'elemento_fundido',jsOn:'D',value:Le.elemento_fundido,style:'width:5rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'asentamiento',jsOn:'D',value:Le.asentamiento,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'ancho',jsOn:'D',value:Le.ancho,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'alto',jsOn:'D',value:Le.alto,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'largo',jsOn:'D',value:Le.largo,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'resistencia_esperada',jsOn:'D',value:Le.resistencia_esperada,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'carga_rotura',jsOn:'D',value:Le.carga_rotura,style:'width:4rem'},$1.t('td',0,tr));
	$1.T.sel({'class':jsF,name:'cemento',jsOn:'D',opts:$V.geoCementos,selected:Le.cemento,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'cemento_text',jsOn:'D',value:Le.cemento_text,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'limeMemo',value:L.limeMemo,style:'width:5rem'},$1.t('td',0,tr));
}
}
$_GeoLb.Nuc={
form:function(P){ var P=(P)?P:{};
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/nucleos',inputs:$1.G.filter(),loadVerif:P.n,loade:cont,func:function(Jr){
		var wList=$1.t('div',0,cont);
		$Api.JS.addF({name:'docEntry',value:Pa.docEntry},cont);
		if(Jr.errNo){ return $Api.resp(cont,Jr.errNo); }
		if(Jr && Jr.L && !Jr.L.errNo){
			for(var i in Jr.L){ $_GeoLb.Nuc.trA(Jr.L[i],wList); }
		}
		$1.t('clear',0,cont);
		$1.T.btnFa({faBtn:'fa_plusSquare',textNode:'Añadir Nucleo',func:function(){
			$_GeoLb.Nuc.trA({},wList);
		}},cont);
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:Api._geo+'remi/nucleos',jsBody:cont,loade:resp,func:function(Jr){
			$Api.resp(resp,Jr);
			if(!Jr.errNo){ $_GeoLb.Nuc.form(); }
		}},cont);
	}});
},
view:function(){
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api._geo+'remi/nucleos',inputs:$1.G.filter(),loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		if(Jr.L.errNo){ return $Api.resp(cont,Jr.L); }
		$1.T.btnPrint(cont);
		var divHead=$1.t('div');
		$_GeoPrint.topLb({code:'CÓDIGO: LB-FT-33',v:'VERSIÓN: 04',M:[
			$1.t('div',{textNode:'LABORATORIO DE MATERIALES Y CONCRETO'}),
			$1.t('div',{textNode:'RESISTENCIA A LA COMPRESIÓN DE CILINDROS DE CONCRETO OBTENCIÓN Y ENSAYO DE NÚCLEOS DE CONCRETO ENDURECIDO'}),
			$1.t('div',{textNode:'I.N.V. E - 410 - 13 I.N.V. E - 418 - 13'})
		]},divHead);
		var fie=$1.t('fieldset',{style:'margin:0 0;'},divHead);
		$1.t('legend',{textNode:'Proyecto No. '+Jr.docEntry},fie);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Cliente:','class':'label'},d1);
		$1.t('span',{textNode:Jr.cardName},d1);
		var d1=$1.t('div',{'class':'if_wrapx1'},fie);
		$1.t('label',{textNode:'Proyecto:','class':'label'},d1);
		$1.t('span',{textNode:Jr.proyect},d1);
		//Lineas
		var trs=0; var page=0;
		var numxPage=2; var nucNum=1;
		var pageTotal= $js.toRound(Jr.L.length/numxPage);
		for(var i in Jr.L){ var L=Jr.L[i];
			if(trs%numxPage==0){ /* Paginar */
				if(divTbs){ $1.t('clear',0,divTbs); }
				var divR=divHead.cloneNode(1); page++;
				var divTbs=$1.t('div',0,divR);
				$1.delet($1.q('.docBottomGeo',divR)); /* borrar el primero */
				$_GeoPrint.bot({page:page,pageTotal:pageTotal},divR);
				cont.appendChild(divR);
			} trs++;
			var divNuc=$1.t('div',{'class':'nucleos'},divTbs);
			$1.t('h3',{textNode:'Núcleo N° '+nucNum},divNuc); nucNum++;
			$1.t('clear',0,divNuc);
			var tb1=$1.T.table(['Fecha Prueba','No. Prueba','Carga Rotura (Kgf)','Resistencia al dia (Kg/cm2)','Resistencia al dia en PSI'],{'class':'table_cl',tBody:1},divNuc);
			var tb2=$1.t('table',{style:'width:99%;','class':'table_zh'},divNuc);
			var Le=(L.jsData)?$js.parse(L.jsData):{};
			var tr=$1.t('tr',0,tb1);
			var cemento=(Le.cemento_text)?Le.cemento_text:Le.cemento;
			$1.t('td',{textNode:L.lineDate},tr);
			$1.t('td',{textNode:L.lineNum},tr);
			$1.t('td',{textNode:Le.carga_rotura},tr);
			$1.t('td',{textNode:$js.round(Le.resistencia_kgcm2,2)},tr);
			$1.t('td',{textNode:$js.round(Le.resistencia_psi,2)},tr);
			var tr=$1.t('tr',0,tb2);
			var td=$1.t('td',{rowspan:6},tr);
			$1.t('span',{textNode:_g(Le.tipo_falla,$V.geoCilTipoFalla)},td);
			$1.t('br',0,td);
			$1.t('img',{src:'http://s1.geotecniaingenieria.co/img/'+Le.tipo_falla+'.jpg'},td);
			$1.t('td',{textNode:'Peso'},tr);
			$1.t('td',{textNode:'g'},tr);
			$1.t('td',{textNode:$js.round(Le.peso,2)},tr);
			var tr=$1.t('tr',0,tb2);
			$1.t('td',{textNode:'Diámetro'},tr);
			$1.t('td',{textNode:'cm'},tr);
			$1.t('td',{textNode:$js.round(Le.diametro,2)},tr);
			var tr=$1.t('tr',0,tb2);
			$1.t('td',{textNode:'Altura'},tr);
			$1.t('td',{textNode:'cm'},tr);
			$1.t('td',{textNode:$js.round(Le.altura,2)},tr);
			var tr=$1.t('tr',0,tb2);
			$1.t('td',{textNode:'Área'},tr);
			$1.t('td',{textNode:'cm2'},tr);
			$1.t('td',{textNode:$js.round(Le.area,2)},tr);
			var tr=$1.t('tr',0,tb2);
			$1.t('td',{textNode:'Volumen'},tr);
			$1.t('td',{textNode:'cm3'},tr);
			$1.t('td',{textNode:$js.round(Le.volumen,2)},tr);
			var tr=$1.t('tr',0,tb2);
			$1.t('td',{textNode:'Densidad'},tr);
			$1.t('td',{textNode:'g/cm3'},tr);
			$1.t('td',{textNode:$js.round(Le.densidad,2)},tr);
			var tr=$1.t('tr',0,tb2);
			$1.t('td',{textNode:'Observaciones'},tr);
			$1.t('td',{colspan:3,textNode:L.lineMemo},tr);
			var tr=$1.t('tr',0,tb2);
			$1.t('td',{textNode:'Relación altura/diametro'},tr);
			$1.t('td',{colspan:2},tr);
			$1.t('td',{textNode:$js.round(Le.relacion,2)},tr);
		}
		if(divTbs){ $1.t('clear',0,divTbs); }
	}});
},
trA:function(L,tBody){
	if($Doc.maxTr(tBody,30)){ return false; }
	var jsF=$Api.JS.clsLN;
	var tBody=$1.t('div',{'class':$Doc.Cls.trL+' '+$Api.JS.clsL+' nucleos'},tBody);
	var td=$1.t('div',0,tBody);
	$1.t('span',{textNode:'Estado: '},td);
	$1.T.sel({'class':jsF,name:'lineStatus',opts:$V.geoStatusEns,noBlank:'Y',selected:L.lineStatus},td);
	if(L.id){
		$1.T.ckLabel({I:{'class':jsF+' checkSel checkSel_trash',name:'delete'},L:{textNode:'Eliminar'}},td);
	}
	else{ $1.T.btnFa({fa:'fa-close',textNode:'Quitar',P:tBody,func:function(T){ $1.delet(T.P); }},td); }
	var tb1=$1.T.table(['Fecha Ensayo','No. Prueba','Carga Rotura (kgf)','Castigado**'],{'class':'table_cl',tBody:1},tBody);
	var tr=$1.t('tr',0,$1.q('tbody',tb1));
	var AJs=(L.id)?{id:L.id}:null;
	var inp=$1.t('input',{type:'date','class':jsF,name:'lineDate',value:L.lineDate,AJs:AJs},$1.t('td',0,tr));
	$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'lineNum',value:L.lineNum,style:'width:4rem'},$1.t('td',0,tr));
	var Le=(L.jsData)?$js.parse(L.jsData):{};
	$1.t('input',{type:'text','class':jsF,name:'carga_rotura',jsOn:'D',value:Le.carga_rotura,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('input',{type:'text','class':jsF,name:'castigado',jsOn:'D',value:Le.castigado,style:'width:4rem'},$1.t('td',0,tr));
	$1.t('br',0,tBody); $1.t('br',0,tBody);
	var tbo=$1.t('tbody',0,$1.t('table',{'class':'table_cl'},tBody));
	var tr=$1.t('tr',0,tbo);
	$1.t('td',{textNode:'falla'},tr);
	$1.t('td',0,tr);
	$1.T.sel({'class':jsF,name:'tipo_falla',jsOn:'D',opts:$V.geoCilTipoFalla,selected:Le.tipo_falla,style:'width:4rem'},$1.t('td',0,tr));
	var tr=$1.t('tr',0,tbo);
	$1.t('td',{textNode:'Peso'},tr);
	$1.t('td',{textNode:'Gr'},tr);
	$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'peso',jsOn:'D',value:Le.peso,style:'width:4rem'},$1.t('td',0,tr));
	var tr=$1.t('tr',0,tbo);
	$1.t('td',{textNode:'Diámetro'},tr);
	$1.t('td',{textNode:'cm'},tr);
	$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'diametro',jsOn:'D',value:Le.diametro,style:'width:4rem'},$1.t('td',0,tr));
	var tr=$1.t('tr',0,tbo);
	$1.t('td',{textNode:'Altura'},tr);
	$1.t('td',{textNode:'cm'},tr);
	$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'altura',jsOn:'D',value:Le.altura,style:'width:4rem'},$1.t('td',0,tr));
	var tr=$1.t('tr',0,tbo);
	$1.t('td',{textNode:'Observaciones'},tr);
	$1.t('textarea',{'class':jsF,name:'lineMemo',value:L.lineMemo,style:'width:4rem'},$1.t('td',0,tr));
}
}

/* alquiler */
$M.li['geoAf']={t:'Control de Alquiler',kau:'geoAf',func:function(){ $M.Ht.ini({func_filt:'geoAf',btnGo:'geoAf.form',gyp:function(){ $_GeoAf.get({}); } }); } }
$M.li['geoAf.form']={t:'Control de Alquiler (Form)',kau:'geoAf',func:function(){ $M.Ht.ini({func_cont:function(){ $_GeoAf.form({}); } }); } }

$_GeoAfLi={
lineDate:['Fecha Entrega',{tag:'date',kf:'lineDate',k:'lineDate',style:'width:9rem','class':'__lineDate',tdClick:function(T){ $_GeoAf.calcDays($1.qParentTo('tr.'+$Doc.Cls.trL,T.parentNode)); } }],
lineDue:['Fecha Recibido',{tag:'date',kf:'lineDue',k:'lineDue','class':'__lineDue',style:'width:9rem',tdClick:function(T){ $_GeoAf.calcDays($1.qParentTo('tr.'+$Doc.Cls.trL,T.parentNode)); } }],
quantity:['Cant.',{tag:'number',kf:'quantity',k:'quantity','class':'__qty',style:'width:6rem',keyChange:function(T){ $_GeoAf.calcDays(T.parentNode.parentNode); }}],
lineMemo:['Detalles',{tag:'input',kf:'lineMemo',k:'lineMemo'}],
daysTxt:['Días a hoy',{tag:'span',k:'days','class':'__daysToday',funcText:function(L){
	var va='';
	L.dueDate=(L.dueDate)?L.dueDate:false;
	if(L.lineDate){ va=$2d.diff({docDate:L.lineDate,dueDate:L.dueDate})*L.quantity*1; }
	return va;
}}]
};
$_GeoAf={
calcDays:function(tr){
	var s=$1.q('.__daysToday',tr);
	var lineDate=$1.q('.__lineDate',tr).value;
	var lineDue=$1.q('.__lineDue',tr).value;
	var qty=$1.q('.__qty',tr).value*1;
	var va='';
	console.log(lineDate); console.log(lineDue); console.log(qty);
	if(lineDate){ va=$2d.diff({docDate:lineDate,dueDate:lineDue})*qty; }
	s.innerText=va;
},
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:Api._geo+'alq',inputs:$1.G.filter(),
	fOpts:false,btns:'edit',docBy:'userDate',
	tt:'geoAf',
	TD:[
		{H:'Fecha',k:'docDate'},
		{H:'Cliente',k:'cardName'},
		{H:'Descripción',k:'lineMemo'}
	],
	tbExport:{ext:'xlsx',fileName:'Alquiler'}
	},cont);
},
form:function(P){
	var api=Api._geo+'alq';
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:api+'/form',loadVerif:!Pa.docEntry,inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
		var tP={go:P.go,docEntry:Pa.docEntry, cont:cont, Series:'N', jsF:jsF,POST:api,
		func:null,
		tbHead:[
		{lTag:'crd',wxn:'wrapx4',L:'Cliente',I:{'class':jsF,D:Jr,value:Jr.cardName}},
		{lTag:'date',wxn:'wrapx8',L:'Fecha',I:{'class':jsF,name:'docDate',value:Jr.docDate}},
		{divLine:1,lTag:'textarea',wxn:'wrapx1',L:'Detalles',I:{'class':jsF,name:'lineMemo',textNode:Jr.lineMemo,style:'resize:vertical'}}
		]
		};
		if(Pa.docEntry){ tP.PUT=tP.POST; delete(tP.POST); }
		tP.midCont=$1.t('div');
		$Doc.form(tP);
		//Jr.L=[{docDate:'2020-02-01',lineMemo:'Ejemplo',quantity:3}];
		$_GeoAf.alq({Jr:Jr},tP.midCont);
	}});
},
alq:function(P,pare){
	var cont=pare;
	var Jr=P.Jr;
	if(Jr.errNo){ return $Api.resp(cont,Jr); }
	if(Jr.L && Jr.L.errNo==1){ $Api.resp(wAdd,Jr.L); }
	var wAdd=$1.t('div',0,cont);
	if(Jr.L && Jr.L.errNo){ Jr.L=[]; }
	Jr.L=$js.sortNum(Jr.L,{k:'lineNum'});
	kFie='docDate,quantity,lineMemo,days';
	var Rd=$DocTb.ini({xMov:'Y',xNum:'N',xDel:'Y',itmAdd:'N',L:Jr.L,kTb:'_geoAfL',
	btnAddL:'Y',fieldset:'Registro de Alquiler',
	RowsL:$_GeoAfLi
	});
	wAdd.appendChild(Rd.fieldset);
}
}
$fCall['gvtCvtView__']=function(Jr,cont){
	var div=$1.t('div',{id:'header_coti'},cont);
	var dl=$1.t('div',{style:'float:left; width:22%;'},div);
	$1.t('img',{src:$Soc.logo},dl);
	var dr=$1.t('div',{style:'float:left; width:60%; margin-left:20px; padding-top:10px; text-align:center;'},div);
	$1.t('h3',{textNode:'GEOTECNIA INGENIERIA SAS'},dr);
	$1.t('b',{'class':'pre',textNode:'NIT. 816.003.584-3\nCRA 10 No 48-176 MARAYA\n+57 313 630 30 98\n+57 (6) 336 3439'},dr);
	var div=$1.t('div',{id:'coti_ver'},cont);
	var d1=$1.t('div',0,div);
	$1.t('label',{textNode:'No. Cotización:'},d1);
	$1.t('b',{textNode:Jr.docEntry},d1);
	var d1=$1.t('div',0,div);
	$1.t('label',{textNode:'No. Cotización:'},d1);
	$1.t('b',{textNode:Jr.docEntry},d1);
}

/* Gerancia */
_Fi['geoGer.xfac']=function(wrap){
	var jsF='jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Desde',I:{tag:'input',type:'date',value:$2d.today,name:'date1','class':jsF}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'input',type:'date',value:$2d.today,name:'date2','class':jsF}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:$_GeoG.xFac},wrap);
}
_Fi['geoGer.actu']=function(wrap){
	var jsF='jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Desde',I:{tag:'input',type:'date',value:$2d.today,name:'date1','class':jsF}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'input',type:'date',value:$2d.today,name:'date2','class':jsF}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:$_GeoG.actu},wrap);
}
_Fi['geoGer.factu']=function(wrap){
	var jsF='jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Desde',I:{tag:'input',type:'date',value:$2d.today,name:'date1','class':jsF}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'input',type:'date',value:$2d.today,name:'date2','class':jsF}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:$_GeoG.factu},wrap);
}
_Fi['geoGer.cliente']=function(wrap){
	var jsF='jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Desde',I:{tag:'input',type:'date',value:$2d.today,name:'date1','class':jsF}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'input',type:'date',value:$2d.today,name:'date2','class':jsF}},divL);
	$1.T.divL({wxn:'wrapx4',L:'Cliente',I:{tag:'input',type:'text',placeholder:'Nombre cliente...',name:'A.cardName(E_like3)','class':jsF}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:$_GeoG.cliente},wrap);
}
_Fi['geoGer.pagado']=function(wrap){
	var jsF='jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Desde',I:{tag:'input',type:'date',value:$2d.today,name:'date1','class':jsF}},wrap);
	$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{tag:'input',type:'date',value:$2d.today,name:'date2','class':jsF}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:$_GeoG.pagado},wrap);
}
_Fi['geoGer.iva']=function(wrap){
	var jsF='jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Año',I:{tag:'input',type:'number',value:$2d.today.substr(0,4),min:2020,step:1,inputmode:'numeric',name:'year','class':jsF}},wrap);
	$1.T.btnSend({textNode:'Actualizar', func:$_GeoG.iva},wrap);
}


$M.li['geoGer.xfac']={t:'Por Facturar',kau:'geoGer',func:function(){ $M.Ht.ini({f:'geoGer.xfac' }); },d:'Generar reporte de lo pendiente por facturar según el tiempo establecido con base a la fecha de creación de cada registro en la remisión'};
$M.li['geoGer.actu']={t:'Actualización',kau:'geoGer',func:function(){ $M.Ht.ini({f:'geoGer.actu' }); },d:'Generar reporte de lo pendiente por facturar según el tiempo establecido, teniendo como base la fecha de la última actualización realizada en la remisión'};
$M.li['geoGer.factu']={t:'Facturado',kau:'geoGer',func:function(){ $M.Ht.ini({f:'geoGer.factu' }); },d:'Generar informe de lo facturado'};
$M.li['geoGer.cliente']={t:'Por Cliente',kau:'geoGer',func:function(){ $M.Ht.ini({f:'geoGer.cliente'}); },d:'Generar informe de lo facturado'};
$M.li['geoGer.pagado']={t:'Pagado',kau:'geoGer',func:function(){ $M.Ht.ini({f:'geoGer.cliente'}); },d:'Generar informe de lo facturado y Pagado.'};
$M.li['geoGer.iva']={t:'IVA',kau:'geoGer',func:function(){ $M.Ht.ini({f:'geoGer.iva'}); },d:'Proyección de IVA.'};

$_GeoG={
xFac:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api._geo+'ger/xfac',loade:cont,inputs:$1.G.filter(),func:function(Jr){
		var tb=$1.T.table(['Periodo','Valor Sin IVA']);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			$1.t('td',{textNode:L.lineDate},tr);
			$1.t('td',{textNode:$Str.money(L.priceLine),'class':tbCal._cell,ncol:1},tr);
		}
		var tr=$1.t('tr',{'class':tbCal._row},tBody);
		$1.t('td',{textNode:'Total'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+1,format:'$'},tr);
		tbCal.sumCells(tb);
		var tb=$1.T.tbExport(tb,{ext:'xlxx',print:'N'});
		cont.appendChild(tb);
	}});
},
actu:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api._geo+'ger/actu',loade:cont,inputs:$1.G.filter(),func:function(Jr){
		var tb=$1.T.table(['Periodo','Valor Sin IVA']);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			$1.t('td',{textNode:L.lineDate},tr);
			$1.t('td',{textNode:$Str.money(L.priceLine),'class':tbCal._cell,ncol:1},tr);
		}
		var tr=$1.t('tr',{'class':tbCal._row},tBody);
		$1.t('td',{textNode:'Total'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+1,format:'$'},tr);
		tbCal.sumCells(tb);
		var tb=$1.T.tbExport(tb,{ext:'xlxx',print:'N'});
		cont.appendChild(tb);
	}});
},
factu:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api._geo+'ger/factu',loade:cont,inputs:$1.G.filter(),func:function(Jr){
		var tb=$1.T.table(['Periodo','Valor','+Impuestos','-Retención','\'=Total']);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			$1.t('td',{textNode:L.docDate},tr);
			$1.t('td',{textNode:$Str.money(L.baseAmnt),'class':tbCal._cell,ncol:1},tr);
			$1.t('td',{textNode:$Str.money(L.vatSum),'class':tbCal._cell,ncol:2},tr);
			$1.t('td',{textNode:$Str.money(L.rteSum),'class':tbCal._cell,ncol:3},tr);
			$1.t('td',{textNode:$Str.money(L.docTotal),'class':tbCal._cell,ncol:4},tr);
		}
		var tr=$1.t('tr',{'class':tbCal._row},tBody);
		$1.t('td',{textNode:'Total'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+1,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+2,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+3,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+4,format:'$'},tr);
		tbCal.sumCells(tb);
		var tb=$1.T.tbExport(tb,{ext:'xlxx',print:'N'});
		cont.appendChild(tb);
	}});
},
cliente:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api._geo+'ger/cliente',loade:cont,inputs:$1.G.filter(),func:function(Jr){
		var tb=$1.T.table(['Cliente','Proyecto','Facturado','Pagado','Pendiente']);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			$1.t('td',{textNode:L.cardName},tr);
			$1.t('td',{textNode:L.proyect},tr);
			$1.t('td',{textNode:$Str.money(L.docTotal),'class':tbCal._cell,ncol:1},tr);
			$1.t('td',{textNode:$Str.money(L.balPay),'class':tbCal._cell,ncol:2},tr);
			$1.t('td',{textNode:$Str.money(L.balDue),'class':tbCal._cell,ncol:3},tr);
		}
		var tr=$1.t('tr',{'class':tbCal._row},tBody);
		$1.t('td',{textNode:'Total'},tr);
		$1.t('td',0,tr);
		$1.t('td',{'class':tbCal._cell+'_'+1,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+2,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+3,format:'$'},tr);
		tbCal.sumCells(tb);
		var tb=$1.T.tbExport(tb,{ext:'xlxx',print:'N'});
		cont.appendChild(tb);
	}});
},
pagado:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api._geo+'ger/pagado',loade:cont,inputs:$1.G.filter(),func:function(Jr){
		var tb=$1.T.table(['Periodo','Facturado','Pagado','%','Pendiente']);
		var tBody=$1.t('tbody',0,tb);
		var totalPay=0; var total=0;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			$1.t('td',{textNode:L.period},tr);
			$1.t('td',{textNode:$Str.money(L.docTotal),'class':tbCal._cell,ncol:1},tr);
			$1.t('td',{textNode:$Str.money(L.balPay),'class':tbCal._cell,ncol:2},tr);
			$1.t('td',{textNode:$js.toFixed(L.balPay/L.docDotal,0)+'%'},tr);
			$1.t('td',{textNode:$Str.money(L.balDue),'class':tbCal._cell,ncol:3},tr);
			totalPay +=L.balPay*1;
			total +=L.docTotal*1;
		}
		var tr=$1.t('tr',{'class':tbCal._row},tBody);
		$1.t('td',{textNode:'Total'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+1,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+2,format:'$'},tr);
		$1.t('td',{textNode:$js.toFixed(totalPay/total,0)+'%'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+3,format:'$'},tr);
		tbCal.sumCells(tb);
		var tb=$1.T.tbExport(tb,{ext:'xlxx',print:'N'});
		cont.appendChild(tb);
	}});
},
iva:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api._geo+'ger/iva',loade:cont,inputs:$1.G.filter(),func:function(Jr){
		var tb=$1.T.table(['Periodo','Facturación Sin Imp.','IVA','Retenciones']);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',{'class':tbCal._row},tBody);
			$1.t('td',{textNode:L.periodo},tr);
			$1.t('td',{textNode:$Str.money(L.baseAmnt),'class':tbCal._cell,ncol:1},tr);
			$1.t('td',{textNode:$Str.money(L.vatSum),'class':tbCal._cell,ncol:2},tr);
			$1.t('td',{textNode:$Str.money(L.rteSum),'class':tbCal._cell,ncol:3},tr);
		}
		var tr=$1.t('tr',{'class':tbCal._row},tBody);
		$1.t('td',{textNode:'Total'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+1,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+2,format:'$'},tr);
		$1.t('td',{'class':tbCal._cell+'_'+3,format:'$'},tr);
		tbCal.sumCells(tb);
		var tb=$1.T.tbExport(tb,{ext:'xlxx',print:'N'});
		cont.appendChild(tb);
	}});
},
}

/* Cards */
$M.li['geoCard.pro']={t:'Clientes',kau:'sysd.user',func:function(){ $M.Ht.ini({f:'geoCard.proj' }); }};
_Fi['geoCard.proj']=function(wrap){
	var jsF='jsFiltVars';
	var Bal=[{wxn:'wrapx8',L:'Número Proyecto',I:{tag:'input',type:'text',name:'A.docEntry','class':jsF}}];
	$Doc.filtForm({func:$_GeoCard.Proj.get,adds:Bal,card:'N',docEntry:'N',docNum:'N',rows:'N',orderBy:'docDateDesc'},wrap);
}

$_Geo.callEns=function(wrap){
	var Pa=$M.read();
	$Api.get({f:'/1/geoCard/remi/view',inputs:'docEntry='+Pa.docEntry,loade:wrap,func:function(Jr){
	$V.ensTypess=[
	{k:'nuc',v:'Nucleos'},
	{k:'vig',v:'Viguetas'},
	{k:'cil',v:'Cilindros'},
	{k:'dens',v:'Densidades'}
	];
	var jsF='jsFiltVars';
	$1.t('h5',{textNode:'Proyecto: '+Jr.docEntry},wrap);
	$1.t('p',{textNode:'Proyecto: '+Jr.proyect},wrap);
	$1.t('p',{textNode:Jr.lineMemo},wrap);
	 divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Tipo',I:{tag:'select',opts:$V.ensTypess,'class':'_ensType'}},wrap);
	var div=$1.t('div',0,wrap);
	$1.T.btnFa({faBtn:'fa-arrow-left',textNode:'- 30',func:function(){ pagee('-'); }},div);
	$1.T.divL({wxn:'wrapx8',subText:'N°. Prueba Del',I:{tag:'input',type:'number',inputmode:'number',min:0,name:'lineNum(E_mayIgual)','class':jsF+' __page1',placeholder:1,value:1}},div);
	$1.T.divL({wxn:'wrapx8',subText:'Al N°.',I:{tag:'input',type:'number',inputmode:'number',min:0,name:'lineNum(E_menIgual)','class':jsF+' __page2',placeholder:5,value:30}},div);
	$1.T.btnFa({faBtn:'fa-arrow-right',textNode:'+ 30',func:function(){ pagee('+'); }},div);
	$1.t('input',{type:'hidden',name:'docEntry','class':jsF,value:Pa.docEntry},wrap);
	var btnC=$1.T.btnSend({textNode:'Actualizar', func:function(){
			var cs=$1.q('._ensType',wrap).value;
			if(cs=='nuc'){ $_GeoLb.Nuc.view(); }
			else if(cs=='vig'){ $_GeoLb.Vig.view(); }
			else if(cs=='cil'){ $_GeoLb.Cil.view(); }
			else if(cs=='dens'){ $_GeoLb.Dens.view(); }
	}},wrap);
	function pagee(act){
		var page1=$1.q('.__page1',wrap);
		var page2=$1.q('.__page2',wrap);
		var n1=page1.value*1; var n1o=n1;
		var n2=page2.value*1; var n2o=n2;
		if(act=='-'){ n1=n1-30; n2=n2-30; }
		else if(act=='+'){ n1=n1+30; n2=n2+30; }
		if(n1<1){ page1.value=1; } else{ page1.value=n1; }
		if(n2<30){ page2.value=30; } else{ page2.value=n2; }
		btnC.click();
	}
}});
}
$_GeoCard={};
$_GeoCard.Proj={
get:function(){
	var cont=$M.Ht.cont;
	$Doc.tbList({api:'/1/geoCard/remi',inputs:$1.G.filter(),
	fOpts:false,view:'Y',
	tt:'geoCard.proj',
	TD:[
		{H:'Fecha',k:'docDate',dateText:'mmm d'},
		{H:'Actualizado',k:'dateUpd',dateText:'mmm d'},
		{H:'Proyecto',k:'proyect'},
		{H:'Detalles',k:'lineMemo'}
	],
	tbExport:{ext:'xlsx',fileName:'Listado de Pagos'}
	},cont);
},
};

$V.gvtSopCondicDef='NOTA 1: Según la altura de las edificaciones la categoria de la unidad de construcción es BAJA (tabla H.3.1-1 NSR-10), por lo cual se requiere hacer 3 perforaciones, por unidad de construcción,  de 6 m de profundidad cada una (tabla H.3.2-1 NSR-10). Se propone hacer dos perforaciones de 6m cada una y una perforación de 2m, distribuidas en el lote.\n\nNOTA 2: Se propone como forma de pago un anticipo correspondiente al 50% del valor total de la propuesta, requisito previo al inicio de las labores de campo.\n\nNOTA 3: El plazo para la ejecución de los trabajos se estima en 20 dias calendario.\n\nNOTA 4: No se contemplan la realización de espectros de respuesta del sitio, no se considera la realización de ensayos dinámicos.\n\nNOTA 5: Para elaborar la cotización se contempló que el material a perforar corresponde a suelos finos y no se encuentran suelos granulares.\n\nNOTA 6: Es importante que se tenga en cuenta que el movimiento de tierras final que se plateé para el lote podría afectar las profundidades de exploración propuestas, en caso de que este sea significativo, específicamente con respecto a los niveles de corte, se recomienda revisar las profundidades propuestas.\n\nNOTA 7: El alcance de este informe corresponde a ESTUDIO DE SUELOS PARA PROPÓSITOS DE CIMENTACION. Por lo tanto, no incluye evaluaciones complementarias sobre estabilidad de taludes o diseño de pavimentos o de áreas por fuera del estudio. El informe incluirá recomendación de parámetros para cimentación y estructuras de contención.\n\nNOTA 8. Se propone como forma de pago un anticipo correspondiente al 50% del valor total de la propuesta, requisito previo al inicio de las labores de campo.\n\nNOTA 9: El plazo para la ejecución de los trabajos se estima en 70 dias calendario.\n\nAtentamente,\nALVARO DANIEL GARCIA M.\nGERENTE';


// customer_custom_design

Gvt.Cvt.formGeo = () => {
	var D=$Cche.d(0,{});
	var Pa=$M.read();
	if(!D.rteIva){ D.rteIva='Y'; }
	if(!D.rteIca){ D.rteIca='Y'; }
	D.condicGen=(D.condicGen!=null)?D.condicGen:$V.gvtSopCondicDef;
	var cont=$M.Ht.cont; var Pa=$M.read();
	$Api.get({f:Api.Gvt.pr+'sop/form',loadVerif:!Pa.docEntry,inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			if(Jr.docEntry){ D=Jr; }
			var crdVal=(D.cardId)?D.cardName:'';
			if(!D.docDate){ D.docDate=$2d.today; }
			if(Pa.docEntry){ $Api.JS.addF({name:'docEntry',value:Pa.docEntry},cont); }
			var tP={tbSerie:'gvtSop', cont:cont,docEdit:Pa.docEntry, POST:Api.Gvt.pr+'sop',
				HLs:[
					{lTag:'input',L:'Cliente',wxn:'wrapx3',req:'Y',I:{name:'cardName',value:D.cardName}},
					{lTag:'date',L:'Fecha',wxn:'wrapx8',req:'Y',I:{name:'docDate',value:D.docDate,'class':$Doc.Fx.clsdocDate}},
					{lTag:'date',L:'Valida hasta',wxn:'wrapx8',req:'Y',I:{name:'dueDate',value:D.dueDate}},
					{lTag:'select',L:'Condic. Pago',wxn:'wrapx8',I:{name:'pymId',selected:D.pymId,opts:$Tb.gfiOpym,k:'pymId'}},
					{lTag:'slp',L:'Resp. Venta',wxn:'wrapx8',I:{name:'slpId',selected:D.slpId}},
					{divLine:1,lTag:'input',L:'Persona Contacto',wxn:'wrapx6',I:{name:'prsCnt',value:D.prsCnt}},
					{lTag:'input',L:'Email',wxn:'wrapx4',I:{name:'email',value:D.email,'class':$Api.Sea.clsBox,k:'email'}},
					{lTag:'input',L:'Telefono',wxn:'wrapx8',I:{name:'phone1',value:D.phone1}},
					{divLine:1,lTag:'textarea',L:'Detalles',wxn:'wrapx1',I:{name:'lineMemo',textNode:D.lineMemo}},
					{divLine:1,lTag:'textarea',L:'Terminos y Condiciones',wxn:'wrapx1',I:{name:'condicGen',textNode:D.condicGen,style:'height:200px'}}
				],
				tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'sell',bCode:'Y',uniqLine:'Y',
					kTb:'gvtItmL',AJs:[{k:'sellFactor',a:'numFactor'}],
					kFie:'itemCode,itemName,price,quantity,udm,vatId,priceLine,lineText'
				},
			};
			$Doc.form(tP);
		}});
}

Gvt.Cvt.viewGeo = () => {
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
	$Api.get({f:Api.Gvt.pr+'sop/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			var tP={tbSerie:'gvtSop',D:Jr,
				main:Gvt.Cvt.OLg,print:'Y',
				THs:[
					{sdocNum:'Y'},{sdocTitle:'Y',cs:7,ln:1},
					{t:'Fecha',k:'docDate'},{middleInfo:'Y'},{logo:'Y'},
					{t:'Vencimiento',k:'dueDate'},
					{k:'pymId',_gTb:'gfiOpym',cs:2},
					{t:'Cliente',k:'cardName',cs:5},{k:'slpId',_gTb:'oslp',cs:2,ln:1},
					{t:'Contacto',k:'prsCnt',cs:2},{k:'phone1',ln:1},{t:'Correo',k:'email',ln:1,cs:3},
					{k:'lineMemo',cs:8,addB:$1.t('b',{textNode:'Detalles:\u0020'}),HTML:1,Tag:{'class':'pre'}}
				],
				mTL:[
					{L:'L',fieldset:'Lineas',tb:{style:'fontSize:14px'},TLs:[
							{t:'Código',k:'itemCode',fText:Itm.Txt.code},
							{t:'Descripción',k:'itemName',fText:Itm.Txt.name},
							{t:'Precio',k:'price',format:'$'},
							{t:'Cant.',k:'quantity',format:'number'},
							{t:'Imp.',k:'vatId',_gTb:'otaxI'},
							{t:'Total',k:'priceLine',format:'$'},
							{t:'Detalles',k:'lineText'}
						]}
				],
				docTotals:'Y',
				bottomAdd:[$1.t('div',{'class':'pre',textNode:Jr.condicGen})]
			};
			$Doc.view(cont,tP);
		}});
}

$M.liAdd('gvtSell', [
	{k: 'gvtSop.form', t:'Cotización de Venta', kau:'gvtSop',ini:{g:Gvt.Cvt.formGeo}},
	{k: 'gvtSop.view', noTitle: 'Y', t: 'Cotización Venta (Doc)', kau: 'gvtSop', ini: {g: Gvt.Cvt.viewGeo}},
]);