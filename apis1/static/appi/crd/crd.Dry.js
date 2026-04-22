
$Doc.a['crdDry'] ={a:'crdDry.view',docT:'Diario de Cliente'};
$V.docSerieType['crdDry']='Diario de Cliente';
/*
$M.sAdd([
{fatherId:'crd',L:[{folId:'crdDry',folName:'Diario'}]},
{fatherId:'crdDry',MLis:['crdDry']}
]); */
$M.liA['crdDry']={t:'Diario de Socio',L:[{k:'crdDry',t:'Registro en Diario'}]};
_Fi['crdDry']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:{textNode:'Número'},I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'A.docEntry'}},wrap);
	$1.T.divL({wxn:'wrapx8',subText:'Fecha',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_mayIgual)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Fecha Fin'},I:{tag:'input',type:'date','class':jsV,name:'A.docDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx10', L:{textNode:'Estado'},I:{tag:'select',sel:{'class':jsV,name:'A.docStatus(E_igual)'},opts:$V.dStatus}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Cliente'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre del contacto...',name:'A.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Reporte',I:{tag:'select','class':jsV,name:'__dbReportLen',opts:$Doc.repLen,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Orden Listado'},I:{tag:'select',sel:{'class':jsV,name:'orderBy'},opts:$Doc.ordBy,noBlank:1}},divL);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8',subText:'Fecha',L:'Vencimiento',I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Fecha Fin',I:{tag:'input',type:'date','class':jsV,name:'A.dueDate(E_menIgual)'}},divL);
	$1.T.divL({wxn:'wrapx4', L:'Responsable',I:{tag:'select','class':jsV,name:'C.slpId',opts:$Tb.oslp}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:$crd.Dry.get});
	wrap.appendChild(btnSend);
};


$M.li['crdDry']={t:'Diario Clientes', kau:'crdDry', func:function(){ 
	btn=$1.T.btnFa({faBtn:'fa_doc',textNode:'Nuevo Registro',func:function(){ $M.to('crdDry.form'); }});
	$M.Ht.ini({btnNew:btn, fieldset:'Y',func_filt:'crdDry', func_pageAndCont:$crd.Dry.get}); }
};
$M.li['crdDry.form']={t:'Registro en Diario', kau:'crdDry', func:function(){ $M.Ht.ini({func_cont:function(){ $crd.Dry.form(); }}); }};
$M.li['crdDry.view']={noTitle:'Y', kau:'crdDry', func:function(){ $M.Ht.ini({func_cont:$crd.Dry.view }); }}

$crd.Dry={
opts:function(P,e){
	var L=P.L; var Jr=P.Jr;
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa_pencil',textNode:' Modificar Documento', P:L, func:function(T){ $M.to('crdDry.form','docEntry:'+T.P.docEntry); } }; n++;
	Li[n]={ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.cancel({serieType:'ocvt',docEntry:T.P.docEntry,api:Api.Crd.dry+'statusCancel',text:'Se va anular el documento, no se puede reversar está acción.'}); } }; n++;
	Li[n]={ico:'iBg iBg_candado',textNode:'Cerrar Documento', P:L, func:function(T){ $Doc.close({docEntry:T.P.docEntry,api:Api.Crd.dry+'statusHandClose',text:'Se va a cerrar el Documento, no se puede reversar está acción.'}); } }; n++; 
	return Li={Li:Li,textNode:P.textNode};
},
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Crd.dry, inputs:$1.G.filter(), loade:cont, func:function(Jr){ 
		if(Jr.errNo){ $ps_DB.response(cont,Jr); }
		else{
			var tb=$1.T.table([{'class':$Xls.tdNo},'N°-','Cliente','Estado','Fecha','Venc.','Prioridad','Clase','Asunto',{'class':$Xls.tdNo}]);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				if(i==2){ tr.classList.add($Xls.trNo); }
				var td=$1.t('td',0,tr);
				var menu=$1.Menu.winLiRel($crd.Dry.opts({L:L}),td);
				var td=$1.t('td',0,tr);
				$1.t('a',{href:$Doc.href('crdDry',L,'r'),'class':'fa fa_eye',textNode:' '+L.docEntry},td);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:$V.docStatus[L.docStatus],style:ColMt.get('crdDry',L.docStatus)},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d'),xls:{t:L.docDate,style:{format:'dd-mm-yyyy'}}},tr);
				$1.t('td',{textNode:$2d.f(L.dueDate,'mmm d'),xls:{t:L.dueDate}},tr);
				$1.t('td',{textNode:$TbV._g('crdDtyPrio',L.priority)},tr);
				$1.t('td',{textNode:$TbV._g('crdDtyClass',L.docClass)},tr);
				$1.t('td',{textNode:L.asunt},tr);
				var td=$1.t('td',0,tr); 
				$1.T.btnFa({fa:'fa_comment',L:L,func:function(T){ $5c.form({tt:'crdDry',tr:T.L.docEntry, getList:'Y',winTitle:'Diaro Cliente: '+T.L.docEntry}); } },td); 
				$1.T.btnFa({fa:'fa_attach',L:L,func:function(T){ $5fi.btnOnTb({tt:'crdDry',tr:T.L.docEntry, getList:'Y',winTitle:'Cotizacion de Venta: '+T.L.docEntry}); } },td); 
			}
			tb=$1.T.tbExport(tb,{fileName:'Listado de Pedidos'});
			cont.appendChild(tb);
		}
	}});
},
form:function(){
	var cont=$M.Ht.cont; var Pa=$M.read(); var jsF='jsFields';
	$Api.get({f:Api.Crd.dry+'one', loadVerif:!Pa.docEntry, inputs:'docEntry='+Pa.docEntry, loade:cont, func:function(Jr){
		var sea=$crd.sea({jsF:jsF,cardId:Jr.cardId,cardName:Jr.cardName},cont);
		var Fs=[
		{wxn:'wrapx2',req:'Y',L:'Cliente',Inode:sea},
		{fType:'date',wxn:'wrapx8',req:'Y',name:'docDate',value:Jr.docDate},
		{fType:'date',wxn:'wrapx8',req:'Y',L:'Fecha Venc.',name:'dueDate',value:Jr.dueDate,_i:{t:'Fecha máxima en la que se debe dar respuesta del registro.'}},
		{divLine:1,wxn:'wrapx8',req:'Y',L:'Clase Registro',I:{tag:'select',sel:{'class':jsF,name:'docClass'},selected:Jr.docClass,opts:$TbV['crdDtyClass']}},
		{wxn:'wrapx4_1',req:'Y',L:'Asunto',I:{tag:'input',type:'text','class':jsF,name:'asunt',value:Jr.asunt}},
		{wxn:'wrapx8',req:'Y',L:'Prioridad',I:{tag:'select',sel:{'class':jsF,name:'priority'},opts:$TbV['crdDtyPrio'],selected:Jr.priority,noBlank:1}},
		{divLine:1,wxn:'wrapx1',req:'Y',L:'Cuerpo del Registro',_i:{t:'Información detallada para el registro.'},I:{tag:'textarea','class':jsF,name:'content',textNode:Jr.content}},
		{divLine:1,wxn:'wrapx1',subText:'Internas, no visible en impresión',L:'Observaciones',I:{tag:'textarea','class':jsF,name:'observations',textNode:Jr.observations}},
		];
		var Pd={cont:cont,serieType:'crdDry',docEntry:Pa.docEntry,jsF:jsF,Jr:{}, POST:Api.Crd.dry, func:function(Jr2){
			$M.to('crdHry.view','docEntry:'+Jr2.docEntry);
			},
			Li:Fs};
		if(Pa.docEntry){ Pd.PUT=Pd.POST; delete(Pd.POST); }
		$Doc.formSerie(Pd);
		}});
},
view:function(){ 
	var Pa=$M.read(); var cont=$M.Ht.cont;
	$Api.get({f:Api.Crd.dry+'one', inputs:'docEntry='+Pa.docEntry,loade:cont, func:function(Jr){
		var Trs=[];
		if(Jr.L.errNo){ Trs[0]={colspan:6,textNode:Jr.L.text}; }
		$Tpt.use('crdDry',cont,{Jr:Jr,Trs:Trs});
		$Str.useCurr=false;
	}});
},
};

$Tpt.T['crdDry']=function(cont,P){
	var td=$1.t('div'); $1.t('b',{textNode:'Cuerpo de Registro'},td); $1.t('pre',{textNode:P.Jr.content},td);;
		var td2=$1.t('div'); $1.t('b',{textNode:'Observaciones'},td2); $1.t('pre',{textNode:P.Jr.observations},td2);
		var Ls=[
		{t:'Estado',v:$V.docStatus[P.Jr.docStatus]},{middleInfo:'Y'},{logoRight:'Y'},
		{tag:'docDate'},
		{t:'Validez',v:P.Jr.dueDate},
		{tag:'cliente',cs:3},{t:'Clase',v:$TbV._g('crdDtyClass',P.Jr.docClass),ln:1},{t:'Prioridad',v:$TbV._g('crdDtyPrio',P.Jr.priority),ln:1},
		{t:'Asunto',v:P.Jr.asunt,cs:7},
		];
		Ls.push({v:td,cs:8});
		Ls.push({v:td2,cs:8,Tag:{'class':'no-print'}});
	$Tpt.draw(cont,{D:P.Jr,serieType:'crdDry',print:'Y',
		Ls:Ls,
		Trs:P.Trs,softFrom:'Y',
	});
}