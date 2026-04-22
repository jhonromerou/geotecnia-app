// package: unclicc.com.fe
$V.Mdls['par']={t:'Terceros',ico:'fa fa-users'};
$V.RF_tipEnt=[{k:'PN',v:'Persona Natural'},{k:'PJ',v:'Persona Jurídica'}];
$V.RF_regTrib=[{k:'RS',v:'No Responsable IVA'},{k:'RC',v:'Responsable IVA'}];
$V.crdRespFisc=[{k:'NR',v:'No Responsable'},{k:'RS',v:'Regimen Simple'},{k:'GC',v:'Gran Contribuyente'},{k:'AU',v:'Autorretenedor'},{k:'RE',v:'Regimen Extranjero'},{}];
$V.crdLicTradType=[
	{k:'nit',v:'NIT'},{k:'dni',v:'Cédula Ciudadania'},
	{k:'ted',v:'Tarjeta Identidad'},
	{k:'dne',v:'Cédula Extranjeria'},
	{k:'nex',v:'NIT Extranjero'},{k:'dex',v:'Doc. Extranjero'},{k:'pp',v:'Pasaporte'}];
	$V.licTradType=$V.crdLicTradType;
$V.gender={N:'N/A',M:'Masculino',F:'Femenino'};
$V.crdType=[{k:'C',v:'Cliente'},{k:'S',v:'Proveedor'},{k:'L',v:'Lead'}];
$V.crdTypeSell={C:'Cliente',L:'Lead'};
$V.Mdls.crd={t:'Terceros',ico:'fa fa-handshake-o'};


Api.Crd={b:'/a/crd/',pr:'/appi/private/crd/'};
$Doc.a['crd']={a:'crd.card',kl:'cardId',kt:'cardName'};

URLS.Customers = {
	list: '/a/crd',
	create: '/a/crd'
}

$Mdl.Cnf.crdReqCode='N';
$Mdl.Cnf.crdFichaProf=[];


_Fi['ocrd']=function(wrap,func){
	var Pa=$M.read('!');
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8',L:{textNode:'Código'},I:{tag:'input',type:'text','class':jsV,name:'A.cardCode(E_like3)'}},wrap);
	$1.T.divL({wxn:'wrapx4',L:{textNode:'Nombre'},I:{tag:'input',type:'text','class':jsV,name:'A.cardName(E_like3)'}},divL);
	$1.T.divL({wxn:'wrapx8',L:{textNode:'Identificacion'},I:{tag:'input',type:'text','class':jsV,name:'A.licTradNum(E_like3)'}},divL);
	if(Pa=='crd.c' || Pa=='crd.l' ){
	$1.T.divL({wxn:'wrapx8', L:{textNode:'Responsable Venta'},I:{tag:'select',sel:{'class':jsV,name:'A.slpId(E_igual)'},opts:$Tb.oslp}},divL);
	}
	$1.T.divL({wxn:'wrapx8', L:'Grupo',I:{tag:'select','class':jsV,name:'A.grId(E_igual)',opts:$JsV.parGrC}},divL);
	if(!func){ func=$crd.get; }
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:func});
	wrap.appendChild(btnSend);
};
_Fi['cpr']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx4',L:'Nombre',I:{tag:'input',type:'text',name:'P.name(E_like3)','class':jsV}},wrap);
	if($V.crdCprPosi){
		$1.T.divL({wxn:'wrapx8',L:'Cargo',I:{tag:'select','class':jsV,name:'P.position',opts:$V.crdCprPosi}},divL);
	}
	$1.T.divL({wxn:'wrapx8',L:'Cargo',I:{tag:'select','class':jsV,name:'P.positionId',opts:$JsV.parCprPos}},divL);
	$1.T.divL({wxn:'wrapx4', L:{textNode:'Empresa'},I:{tag:'input',type:'text','class':jsV,placeholder:'Nombre...',name:'A.cardName(E_like3)'}},divL);
	var btnSend = $1.T.btnSend({textNode:'Actualizar', func:$crd.prsCnt.get});
	wrap.appendChild(btnSend);
};
_Fi['crdRep.cards']=function(wrap){
	var jsV = 'jsFiltVars';
	opt1=[{k:'G',v:'General'}];
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Reporte',I:{lTag:'select','class':jsV+' viewType',name:'viewType',opts:opt1,noBlank:'Y'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Activo',I:{lTag:'select','class':jsV,name:'C.actived',opts:$V.YN,noBlank:'Y'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Tipo',I:{lTag:'select','class':jsV,name:'C.cardType',opts:$V.crdType,selected:'C'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Grupo',I:{lTag:'select','class':jsV,name:'C.grId',opts:$JsV.parGrC}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Responsable',I:{lTag:'select','class':jsV,name:'C.slpId',opts:$Tb.oslp}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:()=>{ $crd.Rep.cards(); }},wrap);
    $1.t('p', {textNode: 'Se mostraran máximo 1000 resultados'}, wrap)
};

/* crd */
$oB.push($Mdl.Cnf.crdFichaProf,[{textNode:'',active:1,'class':'fa fa fa-handshake-o',winClass:'_winCpr',textNode:'Contactos',func:function(T){
	if(!$1.q('._oneLoad',T.win)){
		var tbPrs=$1.T.table(['Cargo','Nombre','Teléfono 1','Celular','Email']);
		tbPrs.classList.add('_oneLoad');
		var tBody=$1.t('tbody',0,tbPrs);
		for(var i in T.P){ var L=T.P[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:_g(L.position,$V.crdCprPosi)},tr);
			$1.t('td',{textNode:L.name},tr);
			$1.t('td',{textNode:L.tel1},tr);
			$1.t('td',{textNode:L.cellular},tr);
			$1.t('td',{textNode:L.email},tr);
		}
		T.win.appendChild(tbPrs);
	}
}}]);
var $crd={
opts:function(P,pare,Pa){
	var L=P.L;
	var Li=[];
	$1.T.btnFa({fa:'fa-pencil',title:'Modificar Tercero',P:L,func:function(T){
		$M.to(Pa+'.form','cardId:'+T.P.cardId);
	}},pare);
	Li=$Opts.add('crd',Li,L);
	if(Li.length>0){ $1.Menu.winLiRel({Li:Li,textNode:P.textNode},pare); }
	$Mdl.itemLiD('crd',pare,L);
},
form:function(P,cont){
	var jsF='jsFields'; var cont=$M.Ht.cont;
	var Pa=$M.read(); var Pac=$M.read('!');
	var cardType=(Pac=='crd.s.form')?'S':'C';
	cardType=(Pac=='crd.l.form')?'L':cardType;
	isC = (Pac=='crd.c.form');
	$Api.get({f:Api.Crd.b+'a/form', loadVerif:!Pa.cardId, inputs:'cardId='+Pa.cardId, loade:cont, func:function(Jr){
	Jr.cardType=(Jr.cardType)?Jr.cardType:cardType;
	//$1.t('input',{type:'hidden','class':jsF,name:'cardType', value:((Jr.cardType)?Jr.cardType:P.cardType)},cont);
	var cardId=(Jr.cardId)?Jr.cardId:Pa.cardId;
	var inpId=$1.t('input',{type:'hidden','class':jsF,name:'cardId',value:cardId},cont);
	var divL=$1.T.divL({divLine:1, wxn:'wrapx10',L:'Tipo Documento',I:{tag:'select','class':jsF,name:'licTradType',opts:$V.crdLicTradType,selected:Jr.licTradType}},cont);
	$1.T.divL({wxn:'wrapx8',L:{textNode:'No. Documento'},I:{tag:'input',type:'text','class':jsF,name:'licTradNum',value:Jr.licTradNum}},divL);
	$1.T.divL({wxn:'wrapx4',req:'Y',L:{textNode:'Nombre'},I:{tag:'input',type:'text','class':jsF+' __cardName',name:'cardName',value:Jr.cardName}},divL);
	$1.T.divL({wxn:'wrapx4',L:{textNode:'Nombre Comercial'},I:{tag:'input',type:'text','class':jsF,name:'cardNameC',value:Jr.cardNameC}},divL);
	$1.T.divL({wxn:'wrapx8',req:$Mdl.Cnf.crdReqCode,L:'Código',I:{tag:'input',type:'text','class':jsF,name:'cardCode',value:Jr.cardCode},_i:'Utilice este campo si quiere identificar los terceros con su propia codificación. Ejemplos de códificación<ul><li><b>CN99485</b>: Cliente Nacional + documento</li><li><b>PN9834</b>: Proveedor Nacional + documento</b> <li><b>CN99485-2</b> Sucursal 2 del cliente</li></ul>'},divL);
	$1.q('.__cardName',divL).keyChange(function(T){
		$1.q('#__wrapTitle').innerText = 'Formulario de: '+T.value;
	});
	$1.T.divL({wxn:'wrapx8',L:'Responsable', aGo:'tb.oslp',I:{tag:'select','class':jsF,name:'slpId', opts:$Tb.oslp,selected:Jr.slpId}},divL);
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Grupo',aGo:'jsv.parGrC',I:{tag:'select','class':jsF,name:'grId',opts:$JsV.parGrC,noBlank:1,selected:Jr.grId}},cont);
	$1.T.divL({wxn:'wrapx8',L:{textNode:'Tipo Entidad'},I:{tag:'select',sel:{'class':jsF,name:'RF_tipEnt'},opts:$V.RF_tipEnt,selected:Jr.RF_tipEnt}},divL);
	$1.T.divL({wxn:'wrapx8',L:{textNode:'Resp. IVA'},I:{tag:'select',sel:{'class':jsF,name:'RF_regTrib'},opts:$V.RF_regTrib,selected:Jr.RF_regTrib,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8',L:{textNode:'Resp. Fiscal'},I:{tag:'select',sel:{'class':jsF,name:'regimen'},opts:$V.crdRespFisc,selected:Jr.regimen,noBlank:1}},divL);
	$1.T.divL({wxn:'wrapx8',L:{textNode:'Activo'},I:{tag:'select',sel:{'class':jsF,name:'actived'},opts:$V.YN,noBlank:1,selected:Jr.actived}},divL);
	var winAddr=($V.crdAddrWin=='Y');
	let crdFichaPut=[
		{textNode:'General','class':'active',winClass:'_general'},
		//{textNode:'Direcciones', winClass:'_address'},
		{textNode:'Tributario', winClass:'_location'},
		{textNode:'Financiero', winClass:'_financiero'},
	];
	if ($MdlStatus.isActive('crdPrp')) {
		crdFichaPut.push({textNode:'Propiedades', winClass:'_wincrdprp'})
	}
	var winM = $1.Menu.inLine(crdFichaPut,{winCont:1});
	cont.appendChild(winM);
	$Cnt.reset();
	$V_Mmag=$js.sortNum($V_Mmag,{k:'v'});
	var gen=$1.t('div',{'class':'winMenuInLine _general'},winM);
	var Dires=Addr.basic(Jr,null,{nodes:'Y',jsF:jsF,kAddress:'address'},gen);
	var lisGen=[
		{t:'Tipo Socio',node:$1.T.sel({sel:{'class':jsF,name:'cardType'},opts:$V.crdType,selected:Jr.cardType,noBlank:'Y'})},
		{t:'Inicio Relación Comercial',node:$1.t('input',{type:'date','class':jsF,name:'openCard',value:Jr.openCard})},
		{t:'Condiciones de Pago',node:$1.T.sel({'class':jsF,name:'pymId',opts:$Tb.gfiOpym,selected:Jr.pymId}),aGo:'gfiPym'},
		{t:'Departamento',node:Dires[1]},
		{t:'Municipio',node:Dires[2]},
		{t:'Dirección',node:Dires[3]},
		{t:'Teléfono 1',node:$1.t('input',{type:'text','class':jsF,name:'phone1',value:Jr.phone1})},
		{t:'Teléfono 2',node:$1.t('input',{type:'text','class':jsF,name:'phone2',value:Jr.phone2})},
		{t:'Tel. Movil',node:$1.t('input',{type:'text','class':jsF,name:'cellular',value:Jr.cellular})},
		{t:'Email RUT',node:$1.t('input',{type:'text','class':jsF,name:'email2',value:Jr.email2})},
		{t:'Email F.E',node:$1.t('input',{type:'text','class':jsF,name:'email',value:Jr.email})},
		{t:'Referido por',node:$1.t('input',{type:'text','class':jsF,name:'referFrom',value:Jr.referFrom})},
		{t:'ID Adicional',node:$1.t('input',{type:'text','class':jsF,name:'addId',value:Jr.addId})}
		];
		if($MdlStatus.isY('parWac')){//Acceso Web
			lisGen.push({t:'Acceso Web',node:$1.T.sel({'class':jsF,name:'WAC_canLogin',opts:$V.NY,selected:Jr.WAC_canLogin})});
		}
		$1.Tb.trsI(lisGen,gen);

		var lct=$1.t('div',{'class':'winMenuInLine _location',style:'display:none'},winM);
	$1.Tb.trsI([
		{t:'Retención IVA',node:$1.T.sel({sel:{'class':jsF,name:'rteIva'},opts:$Tb.gfiTaxRiva,selected:Jr.rteIva})},
		{t:'Retención ICA',node:$1.T.sel({sel:{'class':jsF,name:'rteIca'},opts:$Tb.gfiTaxIca,selected:Jr.rteIca})},
		{t:'¿Autoretenedor',node:$1.T.sel({sel:{'class':jsF,name:'RF_autoRet'},opts:$V.NY,selected:Jr.RF_autoRet,noBlank:1})},
		{t:'Act. Económica (ciiu)',node:$1.t('input',{type:'text','class':jsF,name:'RF_actEco',value:Jr.RF_actEco})},
		{t:'Primer Nombre (PN)',node:$1.t('input',{type:'text','class':jsF,name:'RF_firstName',value:Jr.RF_firstName})},
		{t:'Segundo Nombre (PN)',node:$1.t('input',{type:'text','class':jsF,name:'RF_firstName2',value:Jr.RF_firstName2})},
		{t:'Primer Apellido (PN)',node:$1.t('input',{type:'text','class':jsF,name:'RF_lastName',value:Jr.RF_lastName})},
		{t:'Segundo Apellido (PN)',node:$1.t('input',{type:'text','class':jsF,name:'RF_lastName2',value:Jr.RF_lastName2})}
		],lct);
	// /*
	if(winAddr){
		var cnto=$1.t('div',{'class':'winMenuInLine _address',style:'display:none'},winM);
		for(var c in Jr.cntAddr){ $Cnt.addr({cont:cnto},Jr.cntAddr[c]); }
		if(!Jr.cntAddr || (Jr.cntAddr).length==0){ $Cnt.addr({cont:cnto}); }
	}
	// */
	var fro=$1.t('div',{'class':'winMenuInLine _financiero',style:'display:none'},winM);
	$1.Tb.trsI([
		{t:'Cupo de Crédito',node:$1.t('input',{type:'text', numberformat:'mil','class':jsF,name:'creditLine',value:Jr.creditLine})},
		{t:'Dia Cierre Facturación',node:$1.t('input',{type:'number',inputmode:'numeric','class':jsF,name:'invDayClose',value:Jr.invDayClose,min:1,max:31})},
		],fro);
	// Properties
	if($MdlStatus.isY('crdPrp')){
		var prp=$1.t('div',{'class':'winMenuInLine _wincrdprp',style:'display:none'},winM);
		var Lis=[];
		for(var e in $Tb.parPrPC){ var L=$Tb.parPrPC[e];
			var lT={tag:'input',type:'text'};
			if(L.jsD && typeof(L.jsD)=='string'){ L.jsD=$js.parse(L.jsD); }
			if(L.jsD && L.jsD.tag){ lT=L.jsD; }
			lT['class']=jsF;
			lT.name='PRP['+L.k+']';
			lT.value=Jr['prp'+L.k];
			Lis.push({t:L.v,node:$1.lTag(lT)});
		}
		$1.Tb.trsI(Lis,prp);
	}else{ $1.delet($1.q('._wincrdprp',winM)); }
	// end proper
	var resp=$1.t('div',0,cont);
	var btnSend=$Api.send({PUT:Api.Crd.b+'a', getInputs:function(){ return $1.G.inputs(cont,jsF); }, loade:resp, func:function(Jr2){
		if(Jr2.cardId){ inpId.value = Jr2.cardId; }
		$ps_DB.response(resp,Jr2);
	}}); cont.appendChild(btnSend);
	}});
},
get:function(P){
	var P=(P)?P:{};
	var cont=(cont)?cont:$M.Ht.cont;
	var vPost='';
	var Pa=$M.read('!');
	if(Pa=='crd.c'){ vPost='cardType=C'; }
	else if(Pa=='crd.s'){ vPost='cardType=S'; }
	else if(Pa=='crd.l'){ vPost='cardType=L'; }
	else if(Pa=='crd.e'){ vPost='cardType=E'; }
	if(P.vPost){ vPost += '&'+P.vPost; }
	vPost+='&'+$1.G.filter()
	$Api.get({f:Api.Crd.b+'a',inputs:vPost, loade:cont, func:function(Jr){
		if(P.func){ P.func(Jr); return true; }
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		cols=['','Código','Nombre','Grupo','Resp. Ventas'];
		if(Pa=='crd.c' || Pa=='crd.l'){ cols.push('Resp. Ventas'); }
		cols.push('Tel. 1','Tel. 2','Email');
		var tb=$1.T.table(cols);
		cont.appendChild(tb);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',0,tr);
			$crd.opts({L:L},td,Pa);
			$1.t('td',{textNode:L.cardCode},tr);
			var td=$1.t('td',{textNode:L.cardName},tr);
			$1.t('td',{textNode:_g(L.grId,$JsV.parGrC)},tr);
			if(Pa=='crd.c' || Pa=='crd.l'){  $1.t('td',{textNode:_g(L.slpId,$Tb.oslp)},tr); }
			$1.t('a',{textNode:L.phone1,href:'tel:+'+L.phone1},$1.t('td',0,tr));
			$1.t('a',{textNode:L.phone2,href:'tel:+'+L.phone2},$1.t('td',0,tr));
			$1.t('a',{textNode:L.email,href:'mailto:'+L.email},$1.t('td',0,tr));
		}
	}});
}
}
$crd.Rep={};
var Crd=$crd;
$crd.prsCnt={
opts:function(P,pare){
	var L=P.L;
	var Li=[];
	Li.push({ico:'fa fa_pencil',textNode:' Modificar',P:L,href:$M.to('cpr.form','prsId:'+L.prsId,'r') });
	Li=$Opts.add('cpr',Li,L);
	$1.Menu.winLiRel({Li:Li,textNode:P.textNode},pare);
	$Mdl.itemLiD('cpr',pare,L);
},
at:function(cont){
	var Pa=$M.read();
	var cont=(cont)?cont:$M.Ht.cont;
	var vPost=(Pa.cardId)?'tt=card&tr='+Pa.cardId:'';
	var jsF='jsFields'; var tBody=$1.t('tbody');
	$Api.get({f:Api.Crd.b+'cpr/at', inputs:vPost,loade:cont, func:function(Jr){
		if(Jr.errNo){ $ps_DB.response(cont,Jr); }
		else{ $M.Ht.title.innerHTML =Jr.cardName+' - '+Jr.licTradNum; }
		var cs=8; var ni=1;
		var tb=$1.T.table(['#','Nombre Contacto','Celular','Teléfono 1','Teléfono 2','Email','Cargo','Tipo Doc','N°. Doc.','']); cont.appendChild(tb);
		tb.appendChild(tBody);
		var n=1;
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:n},tr); n++;
			$1.t('td',{textNode:L.name},tr);
			$1.t('td',{textNode:L.cellular},tr);
			$1.t('td',{textNode:L.tel1},tr);
			$1.t('td',{textNode:L.tel2},tr);
			$1.t('td',{textNode:L.email},tr);
			$1.t('td',{textNode:_g(L.position,$V.crdCprPosi)},tr);
			$1.t('td',{textNode:_g(L.licTradType,$V.crdLicTradType)},tr);
			$1.t('td',{textNode:L.licTradNum},tr);
		}
	}});
},
formLine:function(){
	var Pa=$M.read(); var cont=$M.Ht.cont;
	var vPost='cardId='+Pa.cardId;
	var jsF='jsFields'; var tBody=$1.t('tbody');
	$Api.get({f:Api.Crd.b+'prsCnt', inputs:vPost,loade:cont, func:function(Jr){
		if(Jr.errNo){ $ps_DB.response(cont,Jr); }
		else{ $M.Ht.title.innerHTML =Jr.cardName+' - '+Jr.licTradNum; }
		var cs=8; var ni=1;
		var tb=$1.T.table(['#','Nombre Contacto','Teléfono 1','Teléfono 2','Email','Cargo','Tipo Doc','N°. Doc.','']); cont.appendChild(tb);
		tb.appendChild(tBody);
		var tdAdd=$1.t('td',{colspan:cs},($1.t('tr',0,$1.t('tfoot',0,tb))));
		var btnAdd=$1.T.btnFa({faBtn:'fa_plusCircle',textNode:'Añadir Linea', func:function(){ trA(ni); ni++; }});
		tdAdd.appendChild(btnAdd);
		if(Jr.L && Jr.L.errNo){ $1.t('td',{textNode:Jr.L.text,colspan:cs},$1.t('tr',0,tBody)); }
		else{
			for(var n in Jr.L){ var ni=Jr.L[n].lineNum; trA(ni,Jr.L[n]); ni++; }
		}
		trA(ni); ni++;
		var resp=$1.t('div',0,cont);
		var btn=$Api.send({PUT:Api.Crd.b+'prsCnt', loade:resp, getInputs:function(){ return vPost+'&'+$1.G.inputs(cont); },func:function(Jr2){
			$ps_DB.response(resp,Jr2);
		}},cont);
	}});
	function trA(ni,L){ L=(L)?L:{};
	if(L && L.lineNum){ ni=L.lineNum; }
		var ln='L['+ni+']';
		var tr=$1.t('tr',0,tBody);
		var td=$1.t('td',{textNode:ni},tr);
		var td=$1.t('td',0,tr);
		$1.t('input',{type:'text',name:ln+'[name]','class':jsF,value:L.name},td);
		var td=$1.t('td',0,tr);
		$1.t('input',{type:'text',name:ln+'[tel1]','class':jsF,value:L.tel1,style:'width:8rem;'},td);
		var td=$1.t('td',0,tr);
		$1.t('input',{type:'text',name:ln+'[tel2]','class':jsF,value:L.tel2,style:'width:8rem;'},td);
		var td=$1.t('td',0,tr);
		$1.t('input',{type:'text',name:ln+'[email]','class':jsF,value:L.email,style:'width:10rem;'},td);
		var td=$1.t('td',0,tr);
		if($V.crdCprPosi){
			$1.T.divSelect({sel:{'class':jsF,name:ln+'[position]'},opts:$V.crdCprPosi,selected:L.position,width:7},td);
		}
		else{
			$1.t('input',{type:'text',name:ln+'[position]','class':jsF,value:L.position,style:'width:8rem;'},td);
		}
		var td=$1.t('td',0,tr);
		$1.T.sel({sel:{name:ln+'[licTradType]','class':jsF},opts:$V.crdLicTradType,selected:L.licTradType},td);
		var td=$1.t('td',0,tr);
		$1.t('input',{type:'text',name:ln+'[licTradNum]','class':jsF,value:L.licTradNum,style:'width:10rem;'},td);
		var td=$1.t('td',0,tr);
		var ck=$1.T.ckLabel({t:'Eliminar',I:{'class':jsF+' checkSel_trash',name:ln+'[delete]'}},td);
	}
},
get:function(){
	cont=$M.Ht.cont;
	$Api.get({f:Api.Crd.b+'cpr',inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		var tbl=['','Nombre','Cargo','Celular','Tel. 1','Tel. 2','Email','Empresa'];
		if($V.crdCprPosi){ tbl.splice(2,0,'Cargo'); tbl[3]='Cargo Esp.'; }
		var tb=$1.T.table(tbl);
		cont.appendChild(tb);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',{'class':'__mdlCrd_itemLi',L:L},tr);
			$crd.prsCnt.opts({L:L},td);
			var td=$1.t('td',{textNode:L.name},tr);
			//$1.t('a',{href:$Doc.href('cpr',L,'r'), textNode:L.name,'class':'fa fa_eye'},td);
			if($V.crdCprPosi){ $1.t('td',{textNode:_g(L.position,$V.crdCprPosi,'')},tr); }
			$1.t('td',{textNode:_g(L.positionId,$JsV.parCprPos)},tr);
			$1.t('td',{textNode:L.cellular},tr);
			$1.t('td',{textNode:L.tel1},tr);
			$1.t('td',{textNode:L.tel2},tr);
			$1.t('td',{textNode:L.email},tr);
			$1.t('td',{node:$Doc.href('crd',L)},tr);
		}
	}});
},
form:function(){
	var Pa=$M.read(); var cont=$M.Ht.cont;
	var jsF=$Api.JS.cls; var tBody=$1.t('tbody');
	$Api.get({f:Api.Crd.b+'cpr/form', loadVerif:!Pa.prsId, inputs:'prsId='+Pa.prsId,loade:cont, func:function(Jr){
		if(Jr.errNo){ $ps_DB.response(cont,Jr); }
		else{ $M.Ht.title.innerHTML =Jr.name;
			L=Jr;
			var wid=$1.t('input',{type:'hidden','class':jsF,name:'prsId',value:Pa.prsId},cont);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx4',req:'Y',L:'Nombre Completo',placeholder:'Nombre Apellido',I:{tag:'input',type:'text','class':jsF,name:'name',value:L.name}},cont);
			if($V.crdCprPosi){
				$1.T.divL({wxn:'wrapx8',req:'Y',L:'Cargo Sistema',_i:'Este campo se utiliza para ciertos reportes del sistema',I:{tag:'divSelect',sel:{'class':jsF,name:'position'},opts:$V.crdCprPosi,selected:L.position}},divL);
			}
			$1.T.divL({wxn:'wrapx8',L:'Cargo',aGo:'jsv.parCprPos',I:{tag:'select','class':jsF,name:'positionId',opts:$JsV.parCprPos,selected:L.positionId}},divL);
			var valCrd=(Jr.cardId)?Jr.cardName:'';
			var sea=$1.lTag({tag:'crd','class':jsF,value:valCrd,D:Jr});
			$1.T.divL({wxn:'wrapx4',L:'Empresa',I:{node:sea}},divL);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',req:'Y',L:'Genero',I:{tag:'divSelect',sel:{'class':jsF,name:'gender'},opts:$V.gender,selected:L.gender}},cont);
		$1.T.divL({wxn:'wrapx4',L:'Profesión',I:{tag:'input',type:'text','class':jsF,name:'title',value:L.title}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Tipo Documento',I:{tag:'select',sel:{'class':jsF,name:'licTradNum'},opts:$V.crdLicTradType,selected:Jr.licTradType}},divL);
			$1.T.divL({wxn:'wrapx8',L:'N°. Documento',I:{tag:'input',type:'text','class':jsF,name:'licTradNum',value:L.licTradNum}},divL);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Teléfono 1',I:{tag:'input',type:'text','class':jsF,name:'tel1',value:Jr.tel1}},cont);
			$1.T.divL({wxn:'wrapx8',L:'Teléfono 2',I:{tag:'input',type:'text','class':jsF,name:'tel2',value:Jr.tel2}},divL);
			$1.T.divL({wxn:'wrapx8',L:'Celular',I:{tag:'input',type:'text','class':jsF,name:'cellular',value:Jr.cellular}},divL);
			$1.T.divL({wxn:'wrapx4',L:'Email',I:{tag:'input',type:'text','class':jsF,name:'email',value:Jr.email}},divL);
			$1.T.divL({wxn:'wrapx8',L:'Cumpleaños',I:{tag:'input',type:'date','class':jsF,name:'birthDay',value:Jr.birthDay}},divL);
			$1.t('h4',{textNode:'Direcciónes','class':'divLineTitleSection'},cont);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Dirección Principal',placeholder:'Cr 29-10 #33B',I:{tag:'input',type:'text','class':jsF,name:'address',value:Jr.address}},cont);
			$1.T.divL({wxn:'wrapx8',L:'Ciudad Principal',I:{tag:'input',type:'text','class':jsF,name:'city',value:Jr.city}},divL);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Dirección Secundaria',placeholder:'Cr 29-10 #33B',I:{tag:'input',type:'text','class':jsF,name:'address2',value:Jr.address2}},cont);
			$1.T.divL({wxn:'wrapx8',L:'Ciudad Secundaria',I:{tag:'input',type:'text','class':jsF,name:'city2',value:Jr.city2}},divL);
			var divL=$1.T.divL({divLine:1,wxn:'wrapx1',L:'Notas',I:{tag:'textarea','class':jsF,name:'notes',textNode:Jr.notes}},cont);
		}
		var resp=$1.t('div',0,cont);
		var btn=$Api.send({PUT:Api.Crd.b+'cpr', loade:resp,jsBody:cont,func:function(Jr2){
			$Api.resp(resp,Jr2);
			if(Jr2.prsId){ wid.value=Jr2.prsId; }
		}},cont);
	}});
}
}

$crd.Sea={//lTag=card
	get:function(P,cont,D){
		if(P.D){ D=P.D; }
		func=P.func; delete(P.func);
		if(!P.vSea){ P.vSea=''; }
		if(!P.AJsPut){ P.AJsPut=[]; }
		P.AJsPut.push('cardId');
		if(P.cardType){ P.vSea +='&C.cardType(E_in)='+P.cardType; }
		P.fieDefAt=cont;
		P.value=(D)?D.cardName:'';
		P.api=Api.Crd.b+'sea/crd';
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
$crd.sea=function(P,cont){
	//inputs,k, jsF, cardId,cardName
	var api=(P.k=='S')?'crd.s':'crd.c';
	api=(P.k=='c-l')?'crd.cl':api;
	var jsF=(P.jsF)?P.jsF:'jsFields';
	var inputs=P.inputs; //fields=&_otD[]&wh=
	var vS=(P.cardId)?{cardId:P.cardId}:null;
	var vP=(P.vP)?P.vP:{}; //campos adicionales obteniedos ..discPef
	var vPg=(P.vPg)?P.vPg:{}; //campos a obtener al seleccionar
	var vP0=(P.vP0)?P.vP0:{}; //Campos a obtener al crear
	for(var e in vPg){ vPg[e]=vP0[vPg[e]]; }
	vP0.cardId=P.cardId; vP0.cardName=P.cardName;
	var vPost0=$js.encUri(vP0);
	var sea=$Sea.input(null,{api:api,classKey:'___cardId', 'class':jsF,req:P.req, inputs:inputs, vS:vS, vPost:vPost0, defLineText:P.cardName, func:function(L,inp){
		vPg.cardId=L.cardId; vPg.cardName=L.cardName;
		for(var kc in vPg){
			if(L[kc]){ vP0[kc]=L[kc]; }
		}//discDef:discPf
		vPost=$js.encUri(vP0);
		for(var k in vP){ vPost += '&'+k+'='+vP[k]; }
		inp.O={vPost:vPost};
		if(P.replaceData=='Y'){ $Sea.replaceData(L,cont); }
		if(P.tbSum=='Y'){ tbSum.get(cont);}
		if(P.func){ P.func(L,inp); }
	}});
	return sea;
}

$crd.Fx={
inpSeaPrs:function(P,cont,divRel){
	P.api=Api.Crd.b+'sea/prs';
	if(P.func){ }
	else{
		P.func=function(R,inp,divRel){
			inp.vPost='prsId='+R.prsId;
			inp._jsV={prsId:R.prsId,prsName:R.name};
			divRel=(divRel)?divRel:inp.parentNode.parentNode;
			$Sea.replaceData(R,divRel);
		};
		P.vPostClear='prsId=0';
	}
	return $Api.Sea.input(P,cont);
},
inpSeaCrd:function(P,cont,divRel){
	P.api=Api.Crd.b+'sea/crd';
	P.func=function(R,inp){
		inp.vPost='cardId='+R.cardId;
		inp._jsV={};
		if(P._jsV){
			for(var x1 in P._jsV){ inp._jsV[x1]=R[x1]; }
		}
		else{ inp._jsV={cardId:R.cardId,cardName:R.cardName}; }
		divRel=(divRel)?divRel:inp.parentNode.parentNode;
		$Sea.replaceData(R,divRel);
	};
	P.vPostClear='cardId=0';
	return $Api.Sea.input(P,cont);
},
boxCrd:function(P,cont){
	P.api=Api.Crd.b+'sea/crd';
	P.jsVB=['cardId','cardName'];
	P.func=function(R,inp){
		divRel=(P.topPare)?P.topPare:inp.parentNode.parentNode;
		$Api.Sea.boxRep(R,divRel);
	};
	return $Api.Sea.box(P,cont);
},
boxCpr:function(P,cont,divRel){
	P.api=Api.Crd.b+'sea/prs';
	P.jsVB=['prsId','name'];
	P.func=function(R,inp){
		divRel=(P.topPare)?P.topPare:inp.parentNode.parentNode;
		$Sea.replaceData(R,divRel);
	};
	return $Api.Sea.box(P,cont);
}
}

$crd.Slp={
	info:function(L,D){
		var xS=_gO(L.slpId,$Tb.oslp);
		console.log(xS);
		var ts=xS.v;
		for(var i in D){ //' ',phone1
			var val=xS[D[i].replace(/\:\:/,'')];
			val=(val)?val:'';
			ts +=(D[i].match(/^\:\:/))?val:D[i];
		}
		return ts;
	}
}
$crd.Lgc={
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[
      {H:'Nombre',k:'name'},
      {H:'Identificación',k:'licTradNum'},
      {H:'Teléfono',k:'phone1'},
      {H:'Email',k:'email'},
      {H:'Dirección',k:'address'},
    ];
    $Doc.tbList({api:Api.Crd.pr+'lgc',inputs:$1.G.filter(),tbSerie:'crdLgc',uidn:'uid',edit:'Y',view:'N',viewUid:'Y', TD:Cols,
    },cont);
  },
  form:function(){
    var cont=$M.Ht.cont; var D={};
		$Api.form2({api:Api.Crd.pr+'lgc',uidn:'uid',canEdit:'Y',AJs:D.AJs,JrD:D,jsF:'Y',
		TbUpd:'crdLgc',
    tbH:[
      {L:'Nombre',wxn:'wrapx4',I:{lTag:'input',name:'name'}},
      {L:'Identificación',wxn:'wrapx8',I:{lTag:'input',name:'licTradNum'}},
      {L:'Teléfono',wxn:'wrapx8',I:{lTag:'input',name:'phone1'}},
      {L:'Email',wxn:'wrapx8',I:{lTag:'input',name:'email'}},
      {divLine:1,L:'Dirección',wxn:'wrapx4',I:{lTag:'input',name:'address'}},
      ],
    },cont);
  },
}

$crd.Dry={};
$V.cntWorkerType={1:'Otros',2:'Gerente',3:'Contador',4:'Auxiliar',5:' Gestión Humana',6:'Compras',7:'Ventas'};
$V.cntAddrType={merch:'Destino',inv:'Facturación',other:'Otros'};
$V.cntNumType={work:'Laboral',personal:'Personal',whatsapp:'Whatsapp'};
$V.cntEmailType={work:'Laboral',personal:'Personal',inv:'Facturación'};
$Cnt ={
n:{a:1,p:1,e:1,prs:1},
reset:function(){ $Cnt.n.a=$Cnt.n.p=$Cnt.n.e=$Cnt.n.prs=1; },
addr:function(P,L){
	var L=(L)?L:{}; P=(P)?P:{};
	jsF=(P.jsF)?P.jsF:'jsFields'; var n=$Cnt.n.a; $Cnt.n.a++;
	var cont=$1.q('.__wrapCntAddr',P.cont);
	bg='#36de89';
	if(!cont){ cont=$1.t('fieldset',{'class':'__wrapCntAddr',style:'border-top:0.25rem solid '+bg+'; margin-bottom:0.5rem;'},P.cont); }
	if(n==1){
		$1.t('legend',{textNode:'Direcciones'},cont);
	}
	var ln='_Addr['+n+']';
	var Dires=Addr.basic(L,null,{nodes:'Y',jsF:jsF});
	Dires[1].setAttribute('name',ln+'[countyCode]');
	Dires[2].setAttribute('name',ln+'[cityCode]');
	var divL=$1.T.divL({divLine:1,wxn:'wrapx10',I:{tag:'select',sel:{'class':jsF,name:ln+'[addrType]'},opts:$V.cntAddrType,selected:L.addrType}});
	$1.T.divL({wxn:'wrapx10',I:{tag:'input',type:'text','class':jsF,name:ln+'[addrName]',placeholder:'Nombre Desc...',value:L.addrName}},divL);
	$1.T.divL({wxn:'wrapx5',I:{tag:'input',type:'text','class':jsF,name:ln+'[address]',placeholder:'Dirección: Calle 33 #10-21',value:L.address}},divL);
	$1.T.divL({wxn:'wrapx8',Inode:Dires[1]},divL);
	$1.T.divL({wxn:'wrapx8',Inode:Dires[2]},divL);
	//$1.T.divL({wxn:'wrapx10',I:{tag:'input',type:'text','class':jsF,name:ln+'[city]',placeholder:'Ciudad...',value:L.city}},divL);
	//$1.T.divL({wxn:'wrapx10',I:{tag:'input',type:'text','class':jsF,name:ln+'[county]',placeholder:'Departamento / Region...',value:L.county}},divL);
	$1.T.divL({wxn:'wrapx10',I:{tag:'input',type:'text','class':jsF,name:ln+'[country]',placeholder:'Pais...',value:L.country}},divL);
	$1.T.divL({wxn:'wrapx10',I:{tag:'input',type:'text','class':jsF,name:ln+'[zipCode]',placeholder:'Código Postal...',value:L.zipCode}},divL);
	if(1){
		var ck=$1.T.ckLabel({t:'Eliminar',I:{'class':jsF,name:ln+'[delete]'}},divL);
	}
	//else{ divL.appendChild($1.T.btnFa({fa:'fa_close',textNode:'Quitar',func:function(){ $1.delet(divL); }})); }
	if(n==1){
		var btnA=$1.T.btnFa({fa:'fa_plusCircle',textNode:'Añadir otra dirección', func:function(){$Cnt.addr(P); }}); cont.appendChild(btnA);
		btnA.style.color=bg;
	}
	$1.I.before(divL,cont.lastChild);
},
phone:function(P,L){
	var L=(L)?L:{}; P=(P)?P:{};
	jsF=(P.jsF)?P.jsF:'jsFields'; var n=$Cnt.n.p; $Cnt.n.p++;
	var cont=$1.q('.__wrapCntPhone',P.cont);
	bg='#DE8B36';
	if(!cont){ cont=$1.t('fieldset',{'class':'__wrapCntPhone',style:'border-top:0.25rem solid '+bg+'; margin-bottom:0.5rem;'},P.cont); }
	subText=''; stext2='.';
	if(n==1){
		$1.t('legend',{textNode:'Teléfono/s'},cont);
		subText='Persona';
	}
	var ln='_Phone['+n+']';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',subText:subText,I:{tag:'input',type:'text','class':jsF,name:ln+'[peoName]',value:L.peoName}});
	$1.T.divL({wxn:'wrapx8',subText:stext2,I:{tag:'select',sel:{'class':jsF,name:ln+'[numType]'},opts:$V.cntNumType,selected:L.numType}},divL);
	$1.T.divL({wxn:'wrapx4',I:{tag:'input',type:'text','class':jsF,name:ln+'[number]',placeholder:'329 367 8510',value:L.number}},divL);
	$1.T.divL({wxn:'wrapx8',I:{tag:'input',type:'text','class':jsF,name:ln+'[numExt]',placeholder:'Extensión...',value:L.numExt}},divL);
	$1.T.divL({wxn:'wrapx8',I:{tag:'input',type:'text','class':jsF,name:ln+'[numHorary]',placeholder:'Atención: 7 a 12, 1 a 5',value:L.numHorary}},divL);
	if(1){
		var ck=$1.T.ckLabel({t:'Eliminar',I:{'class':jsF,name:ln+'[delete]'}},divL);
	}else{ divL.appendChild($1.T.btnFa({fa:'fa_close',textNode:'Quitar',func:function(){ $1.delet(divL); }})); }
	if(n==1){
		var btnA=$1.T.btnFa({fa:'fa_plusCircle',textNode:'Añadir otro número', func:function(){$Cnt.phone(P); }}); cont.appendChild(btnA);
		btnA.style.color=bg;
	}
	$1.I.before(divL,cont.lastChild);
},
email:function(P,L){
	var L=(L)?L:{}; P=(P)?P:{};
	jsF=(P.jsF)?P.jsF:'jsFields'; var n=$Cnt.n.e; $Cnt.n.e++;
	var cont=$1.q('.__wrapCntMail',P.cont);
	bg='#36A8DE';
	if(!cont){ cont=$1.t('fieldset',{'class':'__wrapCntMail',style:'border-top:0.25rem solid '+bg+'; margin-bottom:0.5rem;'},P.cont); }
	var subText=''; var stext2=' ';
	if(n==1){
		$1.t('legend',{textNode:'Email'},cont);
		subText='Persona'; stext2='.';
	}
	var ln='_Email['+n+']';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8',subText:subText,I:{tag:'input',type:'text','class':jsF,name:ln+'[peoName]',value:L.peoName}});
	$1.T.divL({wxn:'wrapx8',subText:stext2,I:{tag:'select',sel:{'class':jsF,name:ln+'[emailType]'},opts:$V.cntEmailType,selected:L.emailType}},divL);
	$1.T.divL({wxn:'wrapx4',subText:stext2,I:{tag:'input',type:'text','class':jsF,name:ln+'[email]',placeholder:'info@empresa.com',value:L.email}},divL);
	if(1){
		var ck=$1.T.ckLabel({t:'Eliminar',I:{'class':jsF,name:ln+'[delete]'}},divL);
	}else{ divL.appendChild($1.T.btnFa({fa:'fa_close',textNode:'Quitar',func:function(){ $1.delet(divL); }})); }
	if(n==1){
		var btnA=$1.T.btnFa({fa:'fa_plusCircle',textNode:'Añadir otro Email', func:function(){ $Cnt.email(P); }}); cont.appendChild(btnA);
		btnA.style.color=bg;
	}
	$1.I.before(divL,cont.lastChild);
}
};
$crd.W={
addr:function(){

}
}

$crd.Card={
open:function(){
	var Pa=$M.read(); var cont=$M.Ht.cont;
	$Api.get({f:Api.Crd.b+'card', inputs:'cardId='+Pa.cardId, func:function(Jq){
		if(Jq.errNo){ $Api.resp(cont,Jq); }
		else{ d(Jq); }
	}});
	function d(P){
		var licT=_g(P.licTradType,$V.licTradType);
		$1.T.tbf([
		{line:1,wxn:'tbf_x8',t:licT,v:P.licTradNum},
		{wxn:'tbf_x2',t:'Nombre Cliente',v:P.cardName},
		{wxn:'tbf_x8',t:'Responsable',v:_g(P.slpId,$Tb.oslp)},
		{wxn:'tbf_x8',t:'Grupo',v:_g(P.grId,$JsV.parGrC)},
		{line:1,wxn:'tbf_x4',t:'Regimen',v:_g(P.RF_regTrib,$V.RF_regTrib)},
		{wxn:'tbf_x4',t:'Tipo Entidad',v:_g(P.RF_tipEnt,$V.RF_tipEnt)},
		{wxn:'tbf_x2',t:'Email',v:P.email},
		{line:1,wxn:'tbf_x4',t:'Municipio',v:_g(P.RF_mmag,$V_Mmag)},
		{wxn:'tbf_x4',t:'Dirección RUT',v:P.address},
		{wxn:'tbf_x8',t:'Teléfono',v:P.phone1},
		{wxn:'tbf_x8',t:'Teléfono 2',v:P.phone2},
		{line:1,wxn:'tbf_x2',t:'Dirección Facturación',v:$1.addrLine(P.dL.inv,'plain')},
		{wxn:'tbf_x2',t:'Dirección Logistica',v:$1.addrLine(P.dL.merch,'plain')},
		],cont);
		var Wi=$1M.tabs($Mdl.Cnf.crdFichaProf,cont,{P:P.cprL});
		//$crd.Card.opts(P,cont);
	}
},
info:function(P,pare){
	var wrap = $1.t('div',{'class':'winMenuInLine contactInfo'},pare);
	wrap.appendChild($1.t('br'));
	$1.t('h4',{'class':'head1',textNode:'Personas de Contacto'},wrap);
	$crd.prsCnt.at(pare);
	return wrap;
},
opts:function(P,pare){
	var wrap = $1.t('div',0,pare);
	var tT={tt:'bussParnerProfile',tr:P.cardId};
	var wrapMenu = $1.t('div',0,wrap);
	var Li = [
		{li:{textNode:'','class':'fa fa_info active',winClass:'winInfo' }},
		{li:{textNode:'','class':'fa fa_comment',winClass:'win5c', func:function(){ $5c.openOne(tT)} }},
		{li:{textNode:'','class':'fa fa_fileUpd',winClass:'win5f',func:function(){ $5fi.openOne(tT)}}}
	];
	if($Mdl.lisTask=='Y'){
		Li.push({li:{textNode:'','class':'fa fa_ulList',title:'Actividades',winClass:'winTask', func:function(){ Task.relAt(lef,{vP:{trMemo:P.cardName}}); }}});
	}
	var menu = $1.Menu.inLine(Li,wrap);
	wrapMenu.appendChild(menu);
	var info=$1.t('div',{'class':'winMenuInLine winInfo'},wrapMenu);
	var _5c=$1.t('div',{'class':'winMenuInLine win5c',style:'display:none;'},wrapMenu);
	var _5f=$1.t('div',{'class':'winMenuInLine win5f',style:'display:none;'},wrapMenu);
	$crd.Card.info(P,info);
	tT.wT={'class':'win5c'};
	$5c.formLine(tT,_5c);
	tT.wT={'class':'win5f'};
	$5fi.formLine(tT,_5f);
	if($Mdl.lisTask=='Y'){
		var task = $1.t('div',{'class':'winMenuInLine winTask',style:'display:none;'},wrapMenu);
		var lef=$1.t('div',{'class':Task.Cls.wrapper},task);
		var rig=$1.t('div',{'class':Task.Cls.wrapView},task);
		Task.Ht.iniWrap({listName:'Tareas Relacionadas'});
	}
	return wrap;
}
}

$crd.Rep ={
	cards:function(){
		$Api.Rep.base({f:Api.private+'/crd/rep/cards',inputs:$1.G.filter(),
		V_G:[
            {f:'licTradNum',t:'No. Doc'},
            {f:'licTradType',t:'Tipo Doc'},
            {f:'cardName',t:'Nombre'},
            {f:'cardCode',t:'Codigo'},
			{f:'grId',t:'Grupo',_g:$JsV.parGrC},
			{f:'slpId',t:'Responsable',_g:$Tb.oslp},
			{f:'RF_tipEnt',t:'Tipo Entidad',_g:$V.RF_tipEnt},
			{f:'RF_regTrib',t:'Resp. IVA',_g:$V.RF_regTrib},
			{f:'regimen',t:'Resp. Fiscal',_g:$V.crdRespFisc},
			{f:'pymId',t:'Cond. Pago',_g:$Tb.gfiOpym},
			{f:'address',t:'Direccion'},
			{f:'cityCode',t:'Ciudad',_g:Addr.City},
			{f:'countyCode',t:'Departamento',_g:Addr.County},
			{f:'phone1',t:'Telefono'},
			{f:'phone2',t:'Telefono 2'},
			{f:'cellular',t:'Celular'},
			{f:'email2',t:'Email RUT'},
			{f:'email',t:'Email F.E'},
			{f:'creditLine',t:'Cupo de crédito',format:'$'},
			{f:'openCard',t:'Inicio Relación Comercial'},
		],
	},$M.Ht.cont);
	}
}

$crd.massData={};
$crd.massData.parCrd=function(P){ P=(P)?P:{};
	$Filt.filtFunc=function(){ P.filter='N'; $crd.massData.parCrd(P); }
	if(P.filter!='N'){
		$Filt.form({cont:$M.Ht.filt,whs:'Y',active:'Y',Li:[
		{t:'Forma Pago',tag:'select',name:'fdpId',opts:$Tb.gfiOfdp,opt1:{k:0,v:'Sin Definir'}},
		{t:'Cond. Pago',tag:'select',name:'pymId',opts:$Tb.gfiOpym,opt1:{k:0,v:'Sin Definir'}}
		]});
	}
	$Sysd.MassData.form({vPost:$Filt.get($M.Ht.filt),filter:'Y',k:'parCrd'});
}
$M.kauAssg('crd',[
	{k:'crd.c',t:'Clientes'},{k:'crd.s',t:'Proveedores'},{k:'crd.l',t:'Leads'},
	{k:'cpr',t:'Personas Contacto'},
	{k:'itfDT.crdF',t:'Interfaces de Socios'}
]);

$M.li['crd.card']={noTitle:'Y', kau:'crd.c', func:function(){
	$M.Ht.ini({g:$crd.Card.open }); }};

$M.liAdd('crd',[{_lineText:'Terceros'},
	{k:'crd.c',t:'Clientes', kau:'crd.c',ini:{btnGo:'crd.c.form', f:'ocrd', gyp:$crd.get}},
	{k:'crd.c.form',t:'Cliente', kau:'crd.c', ini:{g:function(){ $crd.form({cardType:'C'}); }}},
	{k:'crd.s',t:'Proveedores', kau:'crd.s',ini:{btnGo:'crd.s.form', f:'ocrd', gyp:$crd.get }},
	{k:'crd.s.form',t:'Proveedor', kau:'crd.s',ini:{g:function(){ $crd.form({cardType:'S'}); }}},
	{k:'crd.l',t:'Leads', kau:'crd.l',ini:{btnGo:'crd.l.form', f:'ocrd', gyp:$crd.get}},
	{k:'crd.l.form',t:'Lead', kau:'crd.l', ini:{g:function(){ $crd.form({cardType:'L'}); }}},
	{k:'cpr',t:'Personas de Contacto', kau:'cpr', ico:'fa fa-institution',ini:{f:'cpr',btnGo:'cpr.form', gyp:$crd.prsCnt.get }},
	{k:'cpr.form',t:'Persona de Contacto', kau:'cpr', ini:{g:function(){ $crd.prsCnt.form(); }}}
]);
$M.liAdd('crd',[{_lineText:'_TB'},
{k:'crdLgc',t:'Cobradores', kau:'sysd.suadmin',ini:{btnGo:'crdLgc.form', gyp:$crd.Lgc.get}},
{k:'crdLgc.form',t:'Cobrador', kau:'susd.suadmin', ini:{g:$crd.Lgc.form}},
]);

let systemOslp = new $Tb._c({
	kObj: 'oslp',
	Cols:[
		{t:'Código',k:'slpCode',divLine:1,wxn:'wrapx8',T:{tag:'input'}},
		{t:'Nombre',k:'slpName',wxn:'wrapx4',T:{tag:'input'}},
		{t:'Activo',k:'active',wxn:'wrapx8',T:{tag:'select',opts:$V.YN}},
		{t:'Teléfono',k:'phone1',wxn:'wrapx8',T:{tag:'input'}},
		{t:'Email',k:'slpEmail',wxn:'wrapx8',T:{tag:'input'}}
	]
}, true);

$M.liAdd('system', [
	{url: 'tb.oslp', ac: 'system.admin', t: 'Responsables de  Venta',
		ini:{btnGo:'tb.oslp.form', gyp:function(){ systemOslp.get(); } }},
	{url: 'tb.oslp.form', ac: 'system.admin', t: 'Responsable Venta',
		ini:{g: () => systemOslp.form() }},
])

$M.liAdd('crd',[{_lineText:'_JSV'}]);
$JsV._i({kMdl:'crd',kObj:'parGrC',mdl:'par',liTxtG:'Grupos de Cliente',liTxtF:'Grupo de Cliente'});
$JsV._i({kMdl:'crd',kObj:'parCprPos',mdl:'a1',liTxtG:'Cargo de Persona Contacto',liTxtF:'Cargo de Persona Contacto'});
$JsV._i({kMdl:'gvt',kObj:'parDpto',mdl:'a1',mdlActive:'sgc',liTxtG:'Departamentos',liTxtF:'Departamento'});

$M.liAdd('crd',[
	{_lineText:'_ITF'},
	{k:'itfDT.crdF',t:'Actualizar Información de Clientes', kau:'itfDT.crdF', ini:{g:function(){
		Itf.DT.form({api:Api.Crd.pr+'dt/crdF',limitEnd:2000,btnGet:'Y',Fie0:[
			{t:'cardCode',d:'Código de Cliente',b:'Y'},
		],
		descrip:'Máximo 2000 lineas por archivo.',
		Fie:[
			{t:'cardName',d:'Nombre Cliente'},
			{t:'creditLine',d:'Cupo de crédito',format:'number'}
		]
		}); } }
	},
	{k:'itfDT.cards',t:'Creación de Terceros',kau:'itfDT.crdF', ini:{g:function(){
		Itf.DT.form({api:Api.Crd.pr+'dt/cards',btnGet:'Y',fileName:'Plantilla Creacion Terceros',helpFie:'Y',
		Li:[
				{trSep:'Datos Generales'},
			{t:'cardType',d:'Tipo de Tercero',optsCsv:1,opts:$V.crdType,req:'Y'},
			{t:'cardCode',d:'Código Tercero',xformat:'9z',len:[1,20],req:'Y'},
			{t:'sucursal',d:'Sucursal/Sede',xformat:'9',len:[1,2]},
			{t:'cardName',d:'Nombre / Razon social',len:[1,100],req:'Y'},
			{t:'slpId',d:'Responsable',optsTb:1,opts:$Tb.oslp},
			{t:'grId',d:'Grupo',optsTb:1,opts:$JsV.parGrC},
			{t:'licTradType',d:'Tipo Documento',optsCsv:1,opts:$V.crdLicTradType,req:'Y'},
			{t:'licTradNum',d:'Numero Documento',xformat:'9z'},
			{t:'RF_tipEnt',d:'Tipo Entidad',optsCsv:1,opts:$V.RF_tipEnt},
			{t:'RF_regTrib',d:'Regimen',optsCsv:1,opts:$V.RF_regTrib},
			{t:'pymId',d:'Condiciones de Pago',optsTb:1,opts:$Tb.gfiOpym},
			{t:'cityCode',d:'Municipio',optsTb:1,opts:$V.AddrCity},
			{t:'countyCode',d:'Departamento',optsTb:1,opts:$V.AddrCounty},
			{t:'address',d:'Dirección',xformat:'9z'},
			{t:'phone1',d:'Telefono 1',xformat:'9z'},
			{t:'cellular',d:'Celular',xformat:'9z'},
			{t:'email2',d:'Email de RUT',xformat:'9z'},
			{t:'email',d:'Email Fact. Electronica',xformat:'9z'},
		]
		});}}
	}
],{prp:{mdlActive:'itf.cards'}});

$M.liRep('crd',[
	{_lineText:'_REP'},
	{k:'crdRep.cards',t:'Terceros', kauAssg:'crd.c',ini:{f:'crdRep.cards'}}
],{repM:['crd']});


$M.li['sysd.massData.parCrd']={t:'Socios de Negocios',t2:'Socios de Negocios (Maestro)',kau:'sysd.suadmin', ini:{gyp:$crd.massData.parCrd}};