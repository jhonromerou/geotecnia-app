
$MdlStatus.put('DFE','Y');
Api.DFE={b:'/a/dfe/'};

$V.DfeDstatus=[{k:'P',v:'No Enviada'},{k:'E',v:'Aceptada'},{k:'R',v:'Rechazada'}];
$V.DfeEstatus=[{k:'P',v:'No Enviado'},{k:'E',v:'Enviado'}];

$M.add([
{liA:'gvt',folder:'Facturación Electronica',
	L:[
	{k:'dfeSin',t:'Facturas de Venta',P:['R']},
	]
}
]);

$M.liAdd('gvtSin',[
{_lineText:'Cotización de Venta'},
{k:'dfe.inv',t:'Facturas Electrónicas',kau:'dfeSin', func:function(){ $M.Ht.ini({fieldset:'Y',f:'dfeInv',gyp:DFE.Inv.get}); }}
]);

DFE={};
DFE.Inv={
OLg:function(L){
	var Li=[]; var n=0;
	Li[n]={ico:'fa fa-eye',textNode:' Visualizar', P:L, func:function(T){ $Doc.go('gvtInv','v',T.P,1); } }; n++;
	if(L.numberr){
		if(L.emailStatus=='P' || L.dianStatus=='P'){
			var jsF=$Api.JS.cls;
			Li[n]={ico:'iBg iBg_email',textNode:' Actualizar Factura Electrónica',P:L,func:function(T){
				var wr=$1.t('div');
				$1.t('h4',{textNode:'Actualizar Factura Electrónica: '+T.P.numberr},wr);
				$1.t('br',0,wr);
				$1.T.ckLabel({t:'Enviar Correo a Cliente',I:{'class':jsF,name:'sendEmail',AJs:{docEntry:T.P.docEntry}}},wr);
				$1.T.ckLabel({t:'Emitir a la DIAN',I:{'class':jsF,name:'sendDian'}},wr);
				var resp=$1.t('div',0,wr);
				$Api.send({PUT:Api.DFE.b+'inv',jsBody:wr,loade:resp,func:function(Jr2){
					$Api.resp(resp,Jr2);
				}},wr);
				$1.Win.open(wr,{winSize:'medium'});
			}}; n++;
		}
		Li[n]={ico:'iBg iBg_icopdf',textNode:' Pdf Electrónico', href:L.pdfUrl }; n++;
		Li[n]={ico:'iBg iBg_icoxls',textNode:' XML Electrónico', href:L.xmlUrl }; n++;
	}
	else{
		Li[n]={ico:'fa fa-flash',textNode:' Generar Factura Electrónica',P:L,func:function(T){
		$Api.post({f:Api.DFE.b+'inv',inputs:'docEntry='+T.P.docEntry,winErr:1,xConf:'Se generará una factura electrónica,no se puede anular está acción.',func:function(Jr){
			if(Jr.ok){ DFE.Inv.get(); }
		}});
		}}; n++;
	}
	return $Opts.add('gvtRcv',Li,L);;
},
opts:function(P,pare){
	Li={Li:DFE.Inv.OLg(P.L),PB:P.L,textNode:P.textNode};
	var mnu=$1.Menu.winLiRel(Li);
	if(pare){ pare.appendChild(mnu); }
	return mnu;
},
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.DFE.b+'inv', inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
		var tb=$1.T.table(['','Numero','Número DIAN','Estado DIAN','Email Cliente','Fecha','Cliente','Total','Realizado','Creación Electrónica']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				DFE.Inv.opts({L:L},td);
				var td=$1.t('td',{'class':$Xls.tdNo},tr);
				$1.t('a',{href:$M.to('gvtSin.view','docEntry:'+L.docEntry,'r'),'class':'fa fa_eye',textNode:' '+L.docNum},td);
				$1.t('td',{textNode:L.numberr},tr);
				$1.t('td',{textNode:_g(L.dianStatus,$V.DfeDstatus)},tr);
				$1.t('td',{textNode:_g(L.emailStatus,$V.DfeEstatus)},tr);
				$1.t('td',{textNode:$2d.f(L.docDate,'mmm d')},tr);
				$1.t('td',{textNode:L.cardName},tr);
				$1.t('td',{textNode:$Str.money(L.docTotal)},tr);
				$1.t('td',{textNode:$Doc.by('userDate',L)},tr);
				$1.t('td',{textNode:$Doc.by('userDate',{userId:L.DuserId,dateC:L.DdateC})},tr);
			}
			tb=$1.T.tbExport(tb,{print:'Y',ext:'xlsx',fileName:'Listado de Facturas Electrónicas'});
			cont.appendChild(tb);
		}
	}});
},
}