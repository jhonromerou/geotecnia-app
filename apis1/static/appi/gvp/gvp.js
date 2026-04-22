Api.Gvp={b:'/appi/private/gvp/',pr:'/appi/private/gvp/'};

$V.Mdls.gvp={t:'POS',ico:''};
$oB.pus('gvtSin',$Opts,[
{orden:1,k:'ticket',ico:'fa fa-ticket',textNode:' Tirilla POS',func:function(T){
	$1.downNow(Api.Tpd.a+'gvp/ticket?docEntry='+T.P.docEntry);
}}]);

_Fi['gvpCr']=function(wrap,x){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Código',I:{tag:'input',type:'text','class':jsV,name:'A.proCode'}},wrap);
	$1.T.divL({wxn:'wrapx4', L:'Nombre',I:{tag:'input',type:'text','class':jsV,name:'A.proName(E_like3)'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ Gvp.Cr.get(); }},wrap);
};
_Fi['gvpTurn']=function(wrap){
	$Doc.filter({func:Gvp.Turn.get},[
  {L:'Terminal',wxn:'wrapx8',I:{lTag:'select',name:'A.crId',opts:$Tb.gvpOcre}},
  {L:'Cajero',wxn:'wrapx8',I:{lTag:'select',name:'A.pcId',opts:$Tb.gvpOpca}},
  {L:'Estadp',wxn:'wrapx8',I:{lTag:'select',name:'A.docStatus',opts:$V.docStatusOCN}},
  {L:'Apertura >=',wxn:'wrapx8',I:{lTag:'$',name:'A.balOpen(E_mayIgual)'}},
  {L:'Descuadre >=',wxn:'wrapx8',I:{lTag:'$',name:'A.balDiff(E_mayIgual)'}},
	{k:'ordBy'}
	],wrap);
};

var Gvp={}; 

Gvp.Cr={
	Lg:function(L,men){
		var Li=[];
		if(men){
			$1.T.btnFa({faBtn:'fa-pencil',title:'Modificar',P:L,func:function(T){ $M.to('gvpCr.form','crId:'+T.P.crId); } },men);
			if(Li.length>0){ Li={Li:Li,PB:L};
			return $1.Menu.winLiRel(Li,men); }
		}
		return Li;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Api.get({f:Api.Gvp.b+'cr',inputs:$1.G.filter(),loade:cont,errWrap:cont,func:function(Jr){
			var tb=$1.T.table(['','Código','Nombre','Activa',''],0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				Gvp.Cr.Lg(L,td);
				$1.t('td',{textNode:L.crCode},tr);
				$1.t('td',{textNode:L.crName},tr);
				$1.t('td',{textNode:_g(L.active,$V.YN)},tr);
				$1.t('td',{textNode:L.docMemo},tr);
			}
		}});
	},
	form:function(){
		var Pa=$M.read();
		var api1=Api.Gvp.b+'cr';
		var jsF=$Api.JS.cls;
		var wrap=$M.Ht.cont;
		$Api.get({f:api1+'/form',loadVerif:!Pa.crId,inputs:'crId='+Pa.crId,loade:wrap,func:function(Jr){
			if(Pa.crId){ $Api.JS.addF({name:'crId',value:Pa.crId},wrap); }
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Codigo',req:'Y',I:{tag:'input',type:'text',name:'crCode','class':jsF,value:Jr.crCode}},wrap);
			$1.T.divL({wxn:'wrapx2',L:'Nombre',req:'Y',I:{tag:'input',type:'text',name:'crName','class':jsF,value:Jr.crName}},divL);
			$1.T.divL({wxn:'wrapx8',L:'Activa',req:'Y',I:{tag:'select',name:'active','class':jsF,opts:$V.YN,selected:Jr.active,noBlank:'Y'}},divL);
			$1.T.divLTitle('Númeración',wrap);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Facturación',req:'Y',I:{tag:'select',name:'docSin','class':jsF,opts:$Tb.docSerie['gvtSin'],selected:Jr.docSin}},wrap);
			$1.T.divL({wxn:'wrapx8',L:'Pagos',req:'Y',I:{tag:'select',name:'docRcv','class':jsF,opts:$Tb.docSerie['gvtRcv'],selected:Jr.docRcv}},divL);
			$1.T.divL({wxn:'wrapx8',L:'Almacen',req:'Y',I:{tag:'select',name:'whsId','class':jsF,opts:$Tb.itmOwhs,selected:Jr.whsId}},divL);
			$1.T.divLTitle('Medios de Pago - Cuentas',wrap);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx3',L:'Efectivo',req:'Y',I:{tag:'select',name:'fdpIdEFE','class':jsF,opts:$Tb.gfiOfdp,selected:Jr.fdpIdEFE}},wrap);
			$1.T.divL({wxn:'wrapx3',L:'Transferencia',req:'Y',I:{tag:'select',name:'fdpIdTIB','class':jsF,opts:$Tb.gfiOfdp,selected:Jr.fdpIdTIB}},divL);
			//$1.T.divL({wxn:'wrapx3',L:'Crédito',I:{tag:'select',name:'fdpIdCRE','class':jsF,opts:$Tb.gfiOfdp,selected:Jr.fdpIdCRE}},divL);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Tarj. Crédito',I:{tag:'select',name:'fdpIdTCR','class':jsF,opts:$Tb.gfiOfdp,selected:Jr.fdpIdTCR}},wrap);
			$1.T.divL({wxn:'wrapx8',L:'Tarj. Débito',I:{tag:'select',name:'fdpIdTDE','class':jsF,opts:$Tb.gfiOfdp,selected:Jr.fdpIdDE}},divL);
			$1.T.divL({divLine:1,wxn:'wrapx1',L:'Detalles',I:{tag:'textarea','class':jsF,name:'docMemo',value:Jr.docMemo}},wrap);
			var resp=$1.t('div',0,wrap);
			var Ps={PUT:api1,jsBody:wrap,loade:resp,func:function(Jr2,o){
				$Api.resp(resp,Jr2);
			}};
			$Api.send(Ps,wrap);
		}});
	}
}

Gvp.Pc={
	Lg:function(L,men){
		var Li=[];
		if(men){
			$1.T.btnFa({faBtn:'fa-pencil',title:'Modificar',P:L,func:function(T){ Gvp.Pc.form(T.P); } },men);
			if(Li.length>0){ Li={Li:Li,PB:L};
			return $1.Menu.winLiRel(Li,men); }
		}
		return Li;
	},
	get:function(){
		var cont=$M.Ht.cont;
		$Api.get({f:Api.Gvp.b+'pc',inputs:$1.G.filter(),loade:cont,errWrap:cont,func:function(Jr){
			var tb=$1.T.table(['','Código','Nombre'],0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				Gvp.Pc.Lg(L,td);
				$1.t('td',{textNode:L.pcCode},tr);
				$1.t('td',{textNode:L.pcName},tr);
			}
		}});
	},
	form:function(Pa){ Pa=(Pa)?Pa:{};
		var api1=Api.Gvp.b+'pc';
		var jsF=$Api.JS.cls;
		var wrap=$1.t('div');
		$Api.get({f:api1+'/form',loadVerif:!Pa.pcId,inputs:'pcId='+Pa.pcId,loade:wrap,func:function(Jr){
			if(Pa.pcId){ $Api.JS.addF({name:'pcId',value:Pa.pcId},wrap); }
			var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Codigo',req:'Y',I:{tag:'input',type:'text',name:'pcCode','class':jsF,value:Jr.pcCode}},wrap);
			$1.T.divL({wxn:'wrapx2',L:'Nombre',req:'Y',I:{tag:'input',type:'text',name:'pcName','class':jsF,value:Jr.pcName}},divL);
			$1.T.divL({wxn:'wrapx4',L:'Contraseña',req:'Y',I:{tag:'input',type:'password',name:'pcPass','class':jsF,value:Jr.pcPass}},divL);
			$1.T.divL({wxn:'wrapx4',L:'Confirmar',req:'Y',I:{tag:'input',type:'password',name:'pcPass2','class':jsF,value:Jr.pcPass}},divL);
			var resp=$1.t('div',0,wrap);
			var Ps={PUT:api1,jsBody:wrap,loade:resp,func:function(Jr2,o){
				$Api.resp(resp,Jr2);
			}};
			$Api.send(Ps,wrap);
		}});
		$1.Win.open(wrap,{winTitle:'Formulario Cajero',winSize:'medium'});
	},
}

Gvp.Turn={
	OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Gvp.pr+'turn',tbSerie:'gvpTurn'});
		ab.add('E',{canEdit:(L.docStatus=='O'),func:(T)=>{ 
			Gvp.Turn.form(T.P);
		}});
		if(L.docStatus=='O'){
		Li.push({k:'close',ico:'fa fa-lock',textNode:'Cerrar',P:L,func:(T)=>{
			wrap=$1.t('div');
			$1.Win.open(wrap,{winTitle:'Cerrar Turno',winSize:'medium'});
			$Api.get({f:Api.Gvp.pr+'turn/oneClose',inputs:'docEntry='+T.P.docEntry,loade:wrap,func:(Jr1)=>{
				wrap2=$1.t('div',0,wrap); resp=$1.t('div',0,wrap);
				Gvp.Turn.close(Jr1,resp,wrap2);
			}});
		}});
		}
		ab.add('N',{addText:'Se anulará el turno, no se puede revertir está acción.'});
		return $Opts.add('gvpTurn',Li,L);
	},
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[{H:'Estado',k:'docStatus',_g:$V.docStatusAll},
    {H:'Inicial',k:'balOpen',format:'$'},
    {H:'Ingresos',k:'balRcv',format:'$'},
    {H:'Egresos',k:'balRce',format:'$'},
    {H:'Cierre',k:'balClose',format:'$'},
		{H:'Diferencia',k:'balAjus',format:'$'},
    {H:'Cajero',k:'pcId',_g:$Tb.gvpOpca},
    {H:'Terminal',k:'crId',_g:$Tb.gvpOcre},
    {H:'Cuenta',k:'accName'},
    {H:'Apertura',k:'openDate'},
    {H:'Cierre',k:'closeDate'},
    ];
    $Doc.tbList({api:Api.Gvp.pr+'turn',inputs:$1.G.filter(),tbSerie:'gvpTurn',view:'Y',main:Gvp.Turn.OLg,docBy:'userDate',docUpd:'userDate', TD:Cols
    },cont);
  },
	audit:function(){
		cont=$M.Ht.cont;
		css='backgroundColor:#DDD;'
		$Api.get({f:Api.Gvp.pr+'turn/audit',inputs:'docEntry='+$M.Pa.docEntry,loade:cont,func:(Jr)=>{
			var divTop=$1.t('div',0,cont);
			Wins=$1.tabs([
				{textNode:'Ingresos y Egresos',winClass:'ie',active:'Y','class':'fa fa-money'},
				{textNode:'Facturas',winClass:'sin','class':'fa fa-file-o'}
			],cont);
			if(Jr.L.errNo){ $Api.resp(Wins.ie,Jr.L); }
			else{ L0=Jr.L[0];
			 var p=$1.t('p',{textNode:'Seguimiento de Turno de ',style:'marginBotom:5px; borderBottom:1px solid #CCC; fontSize:16px;'},divTop);
			 $1.t('b',{textNode:_g(L0.pcId,$Tb.gvpOpca)},p);
			 $1.t('span',{textNode:' en terminal '},p);
			 $1.t('b',{textNode:_g(L0.crId,$Tb.gvpOcre)},p);
			 $1.t('span',{textNode:' de la cuenta '},p);
			 $1.t('b',{textNode:L0.accName},p);
			var tb=$1.T.table(['Tipo','Ingresos','Egresos',{textNode:'Saldo',style:css},'Fecha','Doc','Tercero'],0,Wins.ie);
			tBody=$1.t('tbody',0,tb);
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:'Apertura'},tr);
			$1.t('td',{colspan:2,style:css},tr);
			$1.t('td',{textNode:$Str.money(L0.balOpen),style:css},tr);
			$1.t('td',{textNode:L0.openDate},tr);
			$1.t('td',{colspan:2},tr);
			balAt=L0.balOpen*1;
			$1.t('td',{textNode:'',colspan:2},tr);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				cls=(L.canceled=='Y')?'bf-danger':'';
				txt=(L.lineType=='RC')?'Ingreso':'Egreso';
				if(L.canceled=='Y'){ txt+=' (Anulado)'; balAtxt='N/A'; }
				else{
					balAt += (L.debBal*1)-(L.creBal*1);
					balAtxt=$Str.money(balAt);
				}
				css2=(balAt<0)?'backgroundColor:red; color:#FFF;':css;
				$1.t('td',{textNode:txt,'class':cls},tr);
				$1.t('td',{textNode:$Str.money(L.debBal),'class':cls},tr);
				$1.t('td',{textNode:$Str.money(L.creBal),'class':cls},tr);
				$1.t('td',{textNode:balAtxt,style:css2,'class':cls},tr);
				$1.t('td',{textNode:L.dateC,'class':cls},tr);
				td=$1.t('td',{'class':cls},tr);
				$Doc.href(L.tt,{docEntry:L.tr},{pare:td,format:'serie'});
				$1.t('td',{textNode:L.cardName,'class':cls},tr);
			}
			//ajuste y cierre
			deb=(L0.balAjus>0)?L0.balAjus:0;
			cre=(L0.balAjus<0)?L0.balAjus*-1:0;
			if(L0.docStatus=='C'){
				balAt += (L0.balAjus*1);
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:'Ajuste'},tr);
				$1.t('td',{textNode:$Str.money(deb)},tr);
				$1.t('td',{textNode:$Str.money(cre)},tr);
				$1.t('td',{textNode:$Str.money(balAt),style:css},tr);
				$1.t('td',{textNode:L0.closeDate},tr);
				$1.t('td',{textNode:L0.lineMemoClose,colspan:2},tr);
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:'Cierre'},tr);
				$1.t('td',{textNode:$Str.money(L0.balClose),colspan:3,style:'backgroundColor:#DDD;'},tr);
				$1.t('td',{textNode:L0.closeDate},tr);
				$1.t('td',{style:css,colspan:2},tr);
			}
			else{
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:'Turno Abierto',colspan:3,style:css},tr);
				$1.t('td',{textNode:$Str.money(balAt),style:css},tr);
				$1.t('td',{textNode:'',colspan:3},tr);
			}
			}
			// facturas
			if(Jr.I){
				if(Jr.I.errNo){ $Api.resp(Wins.sin,Jr.I); }
				else{
				var tb=$1.T.table(['Doc.','Facturado','Por Pagar','Fecha','Tercero'],0,Wins.sin);
				tBody=$1.t('tbody',0,tb);
				for(var i in Jr.I){ L=Jr.I[i];
					var tr=$1.t('tr',0,tBody);
					cls='';
					td=$1.t('td',{'class':cls},tr);
					$Doc.numSer(L,td);
					$1.t('td',{textNode:$Str.money(L.debBal),'class':cls},tr);
					$1.t('td',{textNode:$Str.money(L.debBalDue),'class':cls},tr);
					$1.t('td',{textNode:L.dateC,'class':cls},tr);
					$1.t('td',{textNode:L.cardName,'class':cls},tr);
				}
				}
			}
		}});
	},
	open:function(P,pare){
		var jsF=$Api.JS.cls;
		var txt='Iniciar...';
		var div=$1.t('div',{},pare);
		var tinp=$Api.JS.addF({name:'crId'},div);
		var R=$1.Sys.storAr(['posPcId','posCrId']);
		var btn=$1.T.btnFa({faBtn:'fa-user',textNode:txt,func:function(){
			var wrap=$1.t('div');
			var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Cajero',req:'Y',I:{lTag:'select',name:'pcId',opts:$Tb.gvpOpca,'class':jsF}},wrap);
			$1.T.divL({wxn:'wrapx4',L:'Contraseña',req:'Y',I:{lTag:'input',type:'password',name:'pcPass','class':jsF}},divL);
			var resp=$1.t('div',0,wrap);
			var wrap2=$1.t('div',0,wrap);
			btnSend=$Api.send({POST:Api.Gvp.pr+'turn/status',jsBody:wrap,errWrap:resp,loade:wrap2,func:function(Jr1){
				wrap2.innerHTML='';
				if(Jr1.open=='N'){
					Jr1.openDate=$2d.f('todayHI','Y-m-d H:i');
					Jr1.closeDate=$2d.f($2d.add(Jr1.openDate,'+8hours','Y-m-d H:i'),'Y-m-d H:i');
					fie=$1.T.fieset({L:{textNode:'Apertura de Turno'}},wrap2);
					var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Inicio turno',req:'Y',I:{lTag:'btnDate',time:'Y',value:Jr1.openDate,'class':jsF,name:'openDate'}},fie);
					$1.T.divL({wxn:'wrapx4',L:'Fin turno',req:'Y',I:{lTag:'btnDate',time:'Y',defValue:((Jr1.closeDate)?Jr1.closeData:''),value:Jr1.closeDate,'class':jsF,name:'closeDate'}},divL);
					$1.T.divL({wxn:'wrapx4',L:'Terminal',req:'Y',I:{lTag:'select','class':jsF,name:'crId',opts:$Tb.gvpOcre}},divL);
					$1.T.divL({wxn:'wrapx4',L:'Saldo Inicial',req:'Y',I:{lTag:'$','class':jsF,name:'balOpen'}},divL);
					$Api.send({PUT:Api.Gvp.pr+'turn/open',jsBody:wrap,loade:resp,func:function(Jr2,o){
						$Api.resp(resp,Jr2);
						if(o){ $1.Sys.stor({set:'posPcId',v:o.pcId});
							$1.Sys.stor({set:'posCrId',v:o.crId});
							tinp.value=o.crId;
							tinp.AJs={pcId:o.pcId};
							btn.innerText=_g(o.pcId,$Tb.gvpOpca)+' / '+_g(o.crId,$Tb.gvpOcre);
						}
					},textNode:'Abrir Turno'},fie);
				}
				else if(Jr1.open=='Y'){ Gvp.Turn.close(Jr1,wrap2,{tinp:tinp,btn:btn}); }
			},textNode:'Verificar Estado'});
			wrap.insertBefore(btnSend,wrap2);
			$1.Win.open(wrap,{winTitle:'Apertura / Cierre de Caja',winSize:'medium',winId:'gvpPcLogin'});
		}},div);
		if(R.posPcId>0){
			tinp.value=R.posCrId;
			tinp.AJs={pcId:R.posPcId};
			btn.innerText=_g(R.posPcId,$Tb.gvpOpca)+' / '+_g(R.posCrId,$Tb.gvpOcre);
		}
		return div;
	},
	form:function(Pa){
		var jsF=$Api.JS.cls;
		wrap=$1.t('div'); $1.Win.open(wrap,{winSize:'medium',winTitle:'Modificar Turno'});
		$Api.get({f:Api.Gvp.pr+'turn/one',inputs:'docEntry='+Pa.docEntry,loade:wrap,func:function(Jr1){
		$Api.JS.addF({AJs:{docEntry:Jr1.docEntry,balSin:Jr1.balSin,balRcv:Jr1.balRcv,balRce:Jr1.balRce}},wrap);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Apertura',req:'Y',I:{lTag:'btnDate',time:'Y',value:Jr1.openDate,'class':jsF,name:'openDate'}},wrap);
		$1.T.divL({wxn:'wrapx4',L:'Cierre',req:'Y',I:{lTag:'btnDate',time:'Y',defValue:((Jr1.closeDate)?Jr1.closeData:''),value:Jr1.closeDate,'class':jsF,name:'closeDate'}},divL);
		$1.T.divL({wxn:'wrapx4',L:'$ Inicial',req:'Y',I:{lTag:'$',value:Jr1.balOpen,'class':jsF,name:'balOpen'}},divL);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Cajero',req:'Y',I:{lTag:'input',disabled:'disabled',value:_g(Jr1.pcId,$Tb.gvpOpca)}},wrap);
		$1.T.divL({wxn:'wrapx4',L:'Contraseña',req:'Y',I:{lTag:'input',type:'password','class':jsF,name:'pcPass'}},divL);
		resp=$1.t('div',0,wrap);
		$Api.send({PUT:Api.Gvp.pr+'turn/one',jsBody:wrap,loade:resp,func:function(Jr2,o){
			$Api.resp(resp,Jr2);
		},textNode:'Actualizar Información'},wrap);
		}});
	},
	close:function(Jr1,wrap2,P){
		P=(P)?P:{}; jsF=$Api.JS.cls;
		$1.Sys.stor({set:'posPcId',v:Jr1.pcId});
		$1.Sys.stor({set:'posCrId',v:Jr1.crId});
		if(P.tinp){ P.tinp.value=Jr1.crId; 
			P.tinp.AJs={pcId:Jr1.pcId};
		}
		btn.innerText=_g(Jr1.pcId,$Tb.gvpOpca)+' / '+_g(Jr1.crId,$Tb.gvpOcre);
		fie=$1.T.fieset({L:{textNode:'Cierre de Turno'}},wrap2)
		$Api.JS.addF({AJs:{docEntry:Jr1.docEntry,pcId:Jr1.pcId,balOpen:Jr1.balOpen,balSin:Jr1.balSin,balRcv:Jr1.balRcv,balRce:Jr1.balRce}},fie);
		if(!P.tinp){
			var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Cajero',req:'Y',I:{lTag:'input',disabled:'disabled',value:_g(Jr1.pcId,$Tb.gvpOpca)}},fie);
			$1.T.divL({wxn:'wrapx4',L:'Contraseña',req:'Y',I:{lTag:'input',type:'password','class':jsF,name:'pcPass'}},divL);
		}
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'$ Inicial',req:'Y',I:{lTag:'$',value:Jr1.balOpen,disabled:'disabled'}},fie);
		$1.T.divL({wxn:'wrapx4',L:'Ingreso',_i:'Valor de pagos recibidos en efectivo en la cuenta',req:'Y',I:{lTag:'$',value:Jr1.balRcv,disabled:'disabled'}},divL);
		$1.T.divL({wxn:'wrapx4',L:'Egresos',_i:'Valor de pagos realizados en efectivo desde la cuenta',req:'Y',I:{lTag:'$',value:Jr1.balRce,disabled:'disabled'}},divL);
		$1.T.divL({wxn:'wrapx4',L:'Saldo Esperado',req:'Y',I:{lTag:'$',value:Jr1.balCloseCalc,disabled:'disabled'}},divL);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Saldo En Caja',req:'Y',I:{lTag:'$','class':jsF,name:'balClose'}},fie);
		$1.T.divL({wxn:'wrapx4',L:'Descuadre',_i:'Valor de otros ingresos/egresos para justificar el saldo final, puede usar valores positivos o negativos',req:'Y',I:{lTag:'$','class':jsF,name:'balAjus'}},divL);
		$1.T.divL({wxn:'wrapx2',L:'Detalles de cierre',I:{lTag:'textarea','class':jsF,name:'lineMemoClose'}},divL);
		resp=$1.t('div',0,fie);
		$Api.send({PUT:Api.Gvp.pr+'turn/close',jsBody:wrap2.parentNode,loade:resp,func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo){
				$1.Sys.stor({set:'posPcId',v:0});
				$1.Sys.stor({set:'posCrId',v:0});
				if(P.tinp){ P.tinp.value=''; tinp.AJs={}; }
				if(P.btn){ btn.innerText='Iniciar...'; }
			}
		},textNode:'Cerrar Turno'},fie);
	}
}

Gvp.Doc={
	form:function(D){
		D=(D)?D:{};
		var cont=$M.Ht.cont; var jsF=$Api.JS.cls;
		D.func=function(Jr2){
			if(Jr2.docEntry){
				cont.innerHTML='';
				$1.downNow(Api.Tpd.a+'gvp/ticket?docEntry='+Jr2.docEntry);
				var div=$1.t('div',{'class':'input_ok'});
				cont.insertBefore(div,cont.firstChild);
				$1.t('b',{textNode:'Factura generada correctamente'},div)
				$1.T.btnFa({textNode:' Imprimir tirilla',fa:'fa-print',P:Jr2,func:(T)=>{
					$1.downNow(Api.Tpd.a+'gvp/ticket?docEntry='+T.P.docEntry);
				}},div);
				$1.t('hr',0,cont);
				$1.T.btnFa({textNode:' Nueva Factura',faBtn:'fa-file-o',P:Jr2,func:(T)=>{
					$1.delet(T);
					Gvp.Doc.form({});
				}},cont);
			}
		}
		//var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Cliente',req:'Y',Inode:sea},cont);
		var botHtml=[];
		var term=Gvp.Turn.open({});
		botHtml[0]=Gfi.Fdp.formPos({topPare:cont});
		$Doc.form({tbSerie:'N',cont:cont,
		POST:Api.Gvp.b+'doc',func:D.func,AJs:D.AJs,
		HLs:[
		{divLine:1,L:'Cliente',wxn:'wrapx2',Inode:$crd.Sea.get({cardType:'C'},cont,D)},
		{L:'Terminal',wxn:'wrapx4',Inode:term}
		],
		tbL:{xNum:'Y',xDel:'Y',uniqLine:'Y',docTotal:'Y',L:D.L,itmSea:'sell',bCode:'Y',rteIva:'Y',rteIca:'Y',
		kTb:'gvtItmL',AJs:[{k:'sellFactor',a:'numFactor'}],
		kFie:'itemCode,itemName,price,quantity,udm,vatId,rteId,priceLine,lineText'
		},botHtml:botHtml
		});
	}
}

Gvp.Ticket={
	label1:function(Jr){
		$1.delet($1.q('#posTicket_1'));
		var nca=new Date().getTime();
		var iframe=$1.t('iframe',{id:'posTicket_1',src:'/ext/pos/pos.ticket1.html?time='+nca,style:'width:200px; height:100px; display:none'},document.body);
		iframe.onload=function(){
			Jr.ocardName=$Soc.ocardName;
			Jr.olicTradNum=_g($Soc.licTradType,$V.licTradType)+' '+$Soc.licTradNum;
			Jr.address=$Soc.address;
			Jr.phone=$Soc.pbx;
			Jr.pcName=_g(Jr.pcId,$Tb.gvpOpca);
			Jr.docEntry=$Doc.docNumSerie('gvtSin',Jr);
			Jr.address2=_g($Soc.cityCode,Addr.City)+', '+_g($Soc.countyCode,Addr.County);
			Jrx={ocardName:'ADM Sistems',olicTradNum:'NIT 1125082294',address:'',address2:'',phone:'',
			docEntry:'#',cardName:'',licTradNum:'',pcName:'',dateC:'',
			docTotal:13400,balGet:14000,balRet:600,
			L:[
			{itemName:'Pan Hamburguesa',quantity:2,priceLine:5900},
			{itemName:'Pan Perro',quantity:3,priceLine:7500}
			]
			};
			idom=iframe.contentDocument.body || iframe.contentWindow.document.body;
			for(var k in Jr){
				var id=$1.q('#'+k,idom);
				if(id){ id.innerHTML = Jr[k]; }
			}
			var docTable=$1.q('#docTable',idom);
			var tBody=$1.q('tbody',docTable);
			var totals=$1.q('#docTotals',idom);
			var balGetWrap=$1.q('#balGetWrap',idom);
			tBody.innerHTML=''; totals.innerHTML='';
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{'class':'quantity',textNode:L.quantity*1},tr);
				$1.t('td',{'class':'item',textNode:L.itemName},tr);
				$1.t('td',{'class':'price',textNode:$Str.money(L.priceLine)},tr);
			}
			// <div><b>Subtotal</b>&nbsp;&nbsp;&nbsp;<span id="baseAmnt">$1.157.600</span></div>
			d1=$1.t('div',0,totals); 
			d1.innerHTML +='<b>Subtotal</b>&nbsp;&nbsp;&nbsp;';
			$1.t('span',{textNode:$Str.money(Jr.baseAmnt*1)},d1);
			if(!Jr.Lt.errNo){ for(var i in Jr.Lt){ L=Jr.Lt[i];
				d1=$1.t('div',0,totals);
				var tbt=(L.lineType=='rte')?$Tb.otaxR:$Tb.otaxI;
				d1.innerHTML +='<b>'+_g(L.vatId,tbt)+'</b>&nbsp;&nbsp;&nbsp;';
				$1.t('span',{textNode:$Str.money(L.vatSum*1)},d1);
			}}
			d1=$1.t('div',0,totals);
			d1.innerHTML +='<b>Total</b>&nbsp;&nbsp;&nbsp;';
			$1.t('span',{textNode:$Str.money(Jr.docTotal*1)},d1);
			if(balGetWrap && Jr.balGet*1>0){ balGetWrap.style.display='block';
				balGetWrap.innerHTML='</hr><div><b>Efectivo</b>&nbsp;&nbsp;&nbsp;<span>'+$Str.money(Jr.balGet)+'</span></div>';
				balGetWrap.innerHTML +='<div><b>Cambio</b>&nbsp;&nbsp;&nbsp;<span>'+$Str.money(Jr.balRet)+'</span></div>';
			}
		}
		setTimeout(function(){ $1.delet(iframe); },2000);
	}
}
$M.kauAssg('gvp',[
	{k:'gvp',t:'POS'}
]);

$M.liAdd('gvp',[
	{k:'gvp.form',t:'Terminal POS',kau:'gvp',ini:{g:Gvp.Doc.form}},
	{k:'gvpTurn',t:'Turnos POS',kau:'gvp',ini:{f:'gvpTurn',gyp:Gvp.Turn.get}},
	{k:'gvpTurn.view',noTitle:'Y',t:'Auditoria de Turno',kau:'gvp',ini:{g:Gvp.Turn.audit}},
	{k:'gvpCr',t:'Terminales',kau:'sysd.suadmin',ini:{f:'gvpCr', btnGo:'gvpCr.form',gyp:()=>{ Gvp.Cr.get();} }},
	{k:'gvpCr.form',t:'Terminal',kau:'sysd.suadmin', ini:{g:()=>{ Gvp.Cr.form();} }},
	{k:'gvpPc',t:'Personal de Caja',kau:'sysd.suadmin', ini:{fNew:()=>{ Gvp.Pc.form() },gyp:()=>{ Gvp.Pc.get();} }},
	{k:'gvpPc.form',t:'Personal de Caja',kau:'sysd.suadmin',ini:{g:()=>{  Gvp.Pc.form();} }}
],{prp:{mActive:'gvp',type:'C'}});
