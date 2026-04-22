Api.Cnf={b:'/a/cnf/',pr:'/appi/private/cnf/'};

$V.cnfPerms=[{k:'all',v:'Todo'},{k:'ids',v:'Definido'}];
$V.cnfUspSlps=[{k:'all',v:'Todos'},{k:'ids',v:'Definidos'}];
$V.cnfUspUsers=[{k:'me',v:'Solo Yo'},{k:'A',v:'Todos'},{k:'ids',v:'Definidos'}];

_Fi['cnf.docserie']=function(wrap,itemType){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Tipo Comp.',I:{tag:'select','class':jsV,name:'wh[A.tt]',opts:$V.docTT}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Auto',I:{tag:'select','class':jsV,name:'wh[A.numAuto]',opts:$V.YN}},divL);
	$1.T.divL({wxn:'wrapx4', L:'Titulo',I:{tag:'input',type:'text','class':jsV,name:'wh[A.srTitle(E_like3)]'}},divL);
	$1.T.btnSend({textNode:'Actualizar', func:$Cnf.Docserie.get},wrap);
};

$Cnf={
repAssg:function(){
	var cont=$M.Ht.cont;
	var div=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Usuario',I:{tag:'select',sel:{'class':jsF+' __userId',name:'userId'},opts:$Tb.ousr}},cont);
	var resp=$1.t('div',0,cont); var jsF='jsFields';
	$1.q('.__userId',cont).onchange=function(){
		var vPostC='userId='+this.value+'&';
		var vPost=vPostC+'wh[type]=sql';
		$Api.get({f:Api.Cnf.b+'rep/assg',inputs:vPost, loade:resp,func:function(Jr){
				if(Jr.errNo){ $Api.resp(resp,Jr); }
				else{
					var cssNv='backgroundColor:#EE0;';
					var cssDpt='backgroundColor:#DDD;';
					var lastNv=''; var lastDpt=''; var nv='';
					var tb=$1.T.table(['','Id','Dpto','Nivel','Nombre']); resp.appendChild(tb);
					var tBody=$1.t('tbody',0,tb);
					for(var i in Jr.L){ L=Jr.L[i];
						if(lastDpt!=L.dpt){
							$1.t('td',{colspan:5,textNode:L.dpt,'style':cssDpt},$1.t('tr',0,tBody));
						}
						var tr=$1.t('tr',0,tBody);
						var td=$1.t('td',0,tr); var ln='L['+L.reportId+']';
						var ele={'class':jsF,name:ln};
						if(L.checked=='Y'){ ele.checked='checked'; }
						$1.T.ckLabel({I:ele},td);
						$1.t('td',{textNode:L.reportId},tr);
						$1.t('td',{textNode:L.dpt},tr);
						var nv=L.m1;
						nv +=(L.m2!='')?+' -> '+L.m2:'';
						nv +=(L.m3!='')?+' --> '+L.m3:'';
						var cssNvL=(lastNv!=nv)?cssNv:'';
						$1.t('td',{textNode:nv,style:cssNvL},tr);
						$1.t('td',{textNode:L.text},tr);
						lastNv=nv; lastDpt=L.dpt;
					}
					$Dch.ck(tBody);
					var resp2=$1.t('div',0,resp);
					$Api.send({t:'Actualizar Permisos',PUT:Api.Cnf.b+'rep/assg',getInputs:function(){ return vPostC+$Dch.ck_vPost; },loade:resp2, func:function(Jr2){
						$Api.resp(resp2,Jr2);
						if(!Jr.errNo){ $Dch.ck(tBody); }
					} },resp);
				}
		}});
	}
},
mecrd:function(P){ var P=(P)?P:{};
	P.id=1;//Siempre 1
	$Api.form2({uid:{k:'id',v:P.id},f:Api.Cnf.b+'mecrd',jsF:'Y',
	tbH:[
	{L:'Tipo Doc.',req:'Y',wxn:'wrapx8',I:{lTag:'select',name:'licTradType',opts:$V.crdLicTradType}},
	{L:'No. Doc',req:'Y',wxn:'wrapx8',I:{lTag:'input',name:'licTradNum'}},
	{L:'Tipo Entidad',req:'Y',wxn:'wrapx8',I:{lTag:'select',name:'tipEnt',opts:$V.RF_tipEnt}},
	{L:'Nombre/Razon Social',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'ocardName'}},
	{L:'Regimen',req:'Y',wxn:'wrapx8',I:{lTag:'select',name:'regTrib',opts:$V.RF_regTrib}},
	{L:'Teléfono',divLine:1,req:'Y',wxn:'wrapx8',I:{lTag:'input',name:'pbx'}},
	{L:'Correo',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'mail'}},
	{L:'Web',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'web'}},
	{L:'',wxn:'wrapx4',I:{lTag:'imgUpd',sameName:'Y',name:'logo',title:'Logo Empresa',fileName:$0s.ocardcode}},
	{L:'Departamento',divLine:1,req:'Y',wxn:'wrapx8',I:{lTag:'select',opts:$V.AddrCounty,name:'countyCode'}},
	{L:'Ciudad',req:'Y',wxn:'wrapx8',I:{lTag:'select',name:'cityCode',opts:$V.AddrCity}},
	{L:'address',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'address'}}
	],
	func:function(Jr,o){
		for(var i in o){ $Soc[i]=o[i]; }
	}},$M.Ht.cont);
},
meusr:function(P){ var P=(P)?P:{};
	var fP={
	vidn:'userId',userId:$0s.userId,jsAdd:{},api:Api.Cnf.b+'meusr',
	Cols:[
	['Usuario',{k:'user',T:{divLine:1,req:'Y',wxn:'wrapx8',tag:'input'}}],
	['Email',{k:'userEmail',T:{req:'Y',wxn:'wrapx4',tag:'input'}}],
	['Contraseña',{k:'password',T:{req:'Y',wxn:'wrapx4',tag:'input'}}],
	['Nombre del Usuario',{k:'userName',T:{req:'Y',wxn:'wrapx4',tag:'input'}}]
	],
	oFunc:function(o){
		for(var i in o){ $0s[i]=o[i]; }
	}}
	$Api.form(fP);
},
ousp:function(P){ var P=(P)?P:{};
	var cont=$M.Ht.cont;
	var pDef=$Mdl.get('cnfUsp','SL');//A=todos
	var vSU=pDef.match(/(SU)/);
	var vWH=pDef.match(/(WH)/);
	var vSL=pDef.match(/(SL)/);
	var vUS=pDef.match(/(US)/);
	$Api.get({f:Api.Cnf.b+'ousp',loade:cont,func:function(Jr){
		var tbf=['','Usuario','Nombre'];
		if(vUS){ tbf.push('Usuarios'); }
		if(vSL){ tbf.push('Resp. Venta'); }
		if(vSU){ tbf.push('Sedes'); }
		if(vWH){ tbf.push('Bodegas'); }
		var tb=$1.T.table(tbf,0,cont);
		var tB=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tB);
			var td=$1.t('td',0,tr);
			$1.T.btnFa({fa:'fa-pencil',P:L,func:function(T){
				wOpe(T.P);
			}},td);
			$1.t('td',{textNode:L.user},tr);
			$1.t('td',{textNode:L.userName},tr);
			if(vUS){ $1.t('td',{textNode:_g(L.users,$V.cnfUspUsers)},tr); }
			if(vSL){ $1.t('td',{textNode:_g(L.slps,$V.cnfPerms)},tr); }
			if(vSU){ $1.t('td',{textNode:_g(L.wsus,$V.cnfPerms)},tr); }
			if(vWH){ $1.t('td',{textNode:_g(L.whss,$V.cnfPerms)},tr); }
		}
	}
	});
	function wOpe(P){
		var wcWsu='__cnfouspWsu';
		var wcWhs='__cnfouspWhs';
		var wcUser='__cnfouspUsers';
		var wcSlp='__cnfouspSlp';
		var fP={Win:{title:'Definir Permisos: '+P.user,winSize:'medium'},
		api:Api.Cnf.b+'ousp',vidn:'userId',userId:P.userId,jsAdd:{},
		Cols:[
		['Usuarios',{k:'users',T:{divLine:1,req:'Y',wxn:'wrapx4',tag:'select',opts:$V.cnfUspUsers,noBlank:'Y','class':'_wcUser'}}],
		['Resp. Venta',{k:'slps',T:{req:'Y',wxn:'wrapx4',tag:'select',opts:$V.cnfPerms,noBlank:'Y','class':'_wcSlp'}}],
		['Sedes',{k:'wsus',T:{req:'Y',wxn:'wrapx4',tag:'select',opts:$V.cnfPerms,noBlank:'Y','class':'_wcWsu'}}],
		['Bodegas',{k:'whss',T:{req:'Y',wxn:'wrapx4',tag:'select',opts:$V.cnfPerms,noBlank:'Y','class':'_wcWhs'}}],
		], fCont:function(Jr,pare){
			if(!pDef){ pDef=''; }
			var permsAll=(pDef=='A');
			/* sedes */
			var i1=$1.q('._wcWsu');
			if(vSU || permsAll){
				var tb=$1.T.fieset({L:'Sedes',F:{'class':wcWsu}},pare);
				var Usx=(Jr.wsuIds)?Jr.wsuIds.split(','):[]; var Us={};
				for(var i in Usx){ Us[Usx[i]]=Usx[i]; }
				for(var i in $Tb.owsu){ var L=$Tb.owsu[i];
					var selt=(Us && Us[L.k]==L.k);
					var tag=$1.T.ckLabel({t:L.v,I:{'class':$Api.JS.clsLN,name:'A',AJs:{vid:L.k},checked:selt}},tb);
					tag.classList.add($Api.JS.clsL);
					tag.setAttribute('jsk','SU');
				}
				var w1=$1.q('.'+wcWsu);
				i1.onchange=function(){ cambio(i1,w1); }
				cambio(i1,w1);
			}else{ $1.delet(i1.parentNode); }
			/* bodegas */
			var i2=$1.q('._wcWhs');
			if(vWH || permsAll){
				var tb=$1.T.fieset({L:'Bodegas',F:{'class':wcWhs}},pare);
				var Usx=(Jr.whsIds)?Jr.whsIds.split(','):[]; var Us={};
				for(var i in Usx){ Us[Usx[i]]=Usx[i]; }
				for(var i in $Tb.itmOwhs){ var L=$Tb.itmOwhs[i];
					var wTy1=$1.q('._whsType_'+L.whsType,tb);
					if(!wTy1){ wTy1=$1.t('div',{'class':'_whsType_'+L.whsType},tb);
						$1.t('h5',{textNode:_g(L.whsType,$V.itmWhsType)},wTy1);
					}
					var selt=(Us && Us[L.k]==L.k);
					var tag=$1.T.ckLabel({t:L.v,I:{'class':$Api.JS.clsLN,name:'A',AJs:{whsId:L.k},checked:selt}},wTy1);
					tag.classList.add($Api.JS.clsL);
					tag.setAttribute('jsk','WH');
				}
				var w2=$1.q('.'+wcWhs);
				i2.onchange=function(){ cambio(i2,w2); }
				cambio(i2,w2);
			}else{ $1.delet(i2.parentNode); }
			/* usuarios */
			var i3=$1.q('._wcUser');
			if(vUS || permsAll){
			var tb=$1.T.fieset({L:'Usuarios',F:{'class':wcUser}},pare);
			var Usx=Jr.userIds.split(','); var Us={};
			for(var i in Usx){ Us[Usx[i]]=Usx[i]; }
			for(var i in $Tb.ousr){ var L=$Tb.ousr[i];
				var selt=(Us && Us[L.k]==L.k);
				var tag=$1.T.ckLabel({t:L.v,I:{'class':$Api.JS.clsLN,name:'A',AJs:{userId:L.k},checked:selt}},tb);
				tag.classList.add($Api.JS.clsL);
				tag.setAttribute('jsk','U');
			}
				var w3=$1.q('.'+wcUser);
				i3.onchange=function(){ cambio(i3,w3); }
				cambio(i3,w3);
			}else{ $1.delet(i3.parentNode); }
			/* resp. venta */
			var i4=$1.q('._wcSlp');
			if(vSL || permsAll){
			var tb=$1.T.fieset({L:'Resp. Venta',F:{'class':wcSlp}},pare);
			var Usx=Jr.slpIds.split(','); var Us={};
			for(var i in Usx){ Us[Usx[i]]=Usx[i]; }
			for(var i in $Tb.oslp){ var L=$Tb.oslp[i];
				var selt=(Us && Us[L.k]==L.k);
				var tag=$1.T.ckLabel({t:L.v,I:{'class':$Api.JS.clsLN,name:'A',AJs:{slpId:L.k},checked:selt}},tb);
				tag.classList.add($Api.JS.clsL);
				tag.setAttribute('jsk','S');
			}
				var w4=$1.q('.'+wcSlp);
				i4.onchange=function(){ cambio(i4,w4); }
				cambio(i4,w4);
			}else{ $1.delet(i4.parentNode); }
			
			function cambio(T,wrap){
				if(T && T.value){
					if(T.value=='ids'){ wrap.style.display=''; }
					else{ wrap.style.display='none'; }
				}
			}
		}}
		$Api.form(fP);
	}
},
}

$Cnf.Users={
 get:function(P){ P=(P)?P:{};
		var cont=$M.Ht.cont;
		$Doc.tbList({api:Api.Cnf.pr+'users',inputs:$1.G.filter(),view:'N',_fEdit:$Cnf.Users.form,
		TD:[
			{H:'UID',k:'userId'},
			{H:'Usuario',k:'user'},
			{H:'Nombre',k:'userName'},
			{H:'Correo',k:'userEmail'},
		]},cont);
		return false;
		$Filt.filtFunc=function(){ P.filter='N'; $Cnf.ousr(P); }
		if(P.filter!='N'){
			$Filt.form({cont:$M.Ht.filt,whs:'Y',active:'Y',Li:[
			{t:'Usuario',tag:'input',type:'text',name:'user(E_like3)'},
			{t:'Nombre',tag:'input',type:'text',name:'userName(E_like3)'},
			{t:'Correo',tag:'input',type:'text',name:'userEmail(E_like3)'}
			]});
		}
		$Tb._Massi.form({api:Api.Cnf.b+'ousr',vPost:$Filt.get($M.Ht.filt),
		L:[
		[{textNode:'Nombre y Apellido'},{tag:'input',k:'userName',name:'userName',AJs:['userId']}],
		[{textNode:'Usuario'},{tag:'input',k:'user',name:'user'}],
		[{textNode:'Correo'},{tag:'input',k:'userEmail',name:'userEmail'}],
		[{textNode:'Contraseña'},{tag:'input',k:'password',name:'password'}]
		]
		});
	},
 form:function(P){
	 P=(P)?P:{};
	$Api.form2({uid:{k:'userId',v:P.userId},uri:Api.Cnf.pr+'users',fo:'Y',jsF:'Y',
	Win:{winSize:'medium',winTitle:'Perfil de Usuario'},
	tbH:[
	{L:'Usuario',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'user'}},
	{L:'Nombre de la persona',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'userName'}},
	{L:'Contraseña',req:'Y',wxn:'wrapx4',I:{lTag:'input',type:'password',name:'password'}},
	{L:'Correo',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'userEmail'}},
	],
	Tabs:[
		{textNode:'Resp. Ventas',justOne:'Y',winClass:'slps',active:'Y','class':'fa fa-users',func:(T)=>{
			$Cnf.Users.permSlp(T.P,T.win);
		}},
		{textNode:'Permisos Acceso',justOne:'Y',winClass:'perms','class':'fa fa-shield',func:(T)=>{
			$Cnf.Users.perms(T.P,T.win);
		}}
	],
	func:function(Jr,o){
		
	}},$M.Ht.cont);
 },
 perms:function(Jr,cont){
	$1.clear(cont); $M.uAD={};
	if($0s.useHashKey=='N'){
	 return $Api.resp(cont,{errNo:3,text:'Los permisos por usuarios no están habilitados'});
	}
	if(Jr.errNo==1){ return $Api.resp(cont,Jr); }
	var div = $1.t('div',{'class':'ulWrapLevel',style:'display:block;'},cont);
	var ul = $1.t('ul'); div.appendChild(ul);
	$M.uAD=$js.parse(Jr.perms);
	reL($M.liA,ul);
	function reL(Li,ulTop){
		$1.ulLvl(Li,ulTop,{liF:function(L){
			var k=L.k;
			var tK=($M.liA[k])?$M.liA[k]:L.L;
			var cke= ($M.uAD && $M.uAD[k]!=undefined);
				var tex=(tK.tau)?tK.tau:tK.t;
				if(tK.P){
					var li0=false; var liB=L.li.cloneNode(1);
					var uTop=L.li.parentNode;
					for(var z in tK.P){ var ty=tK.P[z];
						var ltex=tex; var lk=k;
						if(ty=='R'){ ltex +=' (Lectura)'; lk=k; }
						else if(ty=='G'){ ltex +=' (Global)'; lk=k; }
						else if(ty=='A'){ ltex +=' (Todos)'; lk=k+'.A'; }
						else if(ty=='W'){ ltex +=' (Crear/Modificar)'; lk=k+'.write'; }
						else if(ty=='W+'){ ltex +=' (Modificar)'; lk=k+'.write'; }
						else if(ty=='N'){ ltex +=' (Anular)'; lk=k+'.statusCancel'; }
						else if(ty=='O'){ ltex +=' (Abrir)'; lk=k+'.statusOpen'; }
						else if(ty=='C'){ ltex +=' (Cerrar)'; lk=k+'.statusClose'; }
						else if(ty=='D'){ ltex +=' (Borrador)'; lk=k+'.statusDraw'; }
						else if(ty.t && ty.k){ ltex += ' ('+ty.t+')'; lk=k+'.'+ty.k; }
						else if(ty.t){ ltex += ' ('+ty.t+')'; }
						var cke= ($M.uAD && $M.uAD[lk]!=undefined);
						var li0=(li0==false)?liB:liB.cloneNode();
						uTop.appendChild(li0);
						$1.T.ckLabel({L:{textNode:ltex},I:{'class':$Api.JS.clsOnK,jsk:'perms',jstype:'D',name:lk,checked:cke}},li0);

					}
				}
				else{
					$1.T.ckLabel({L:{textNode:tex},I:{'class':$Api.JS.clsOnK,jsk:'perms',jstype:'D',name:k,checked:cke}},L.li);
				}

		}});
	}
},
 permSlp:function(Jr,pare){
	divL=$1.T.divL({divLine:1,L:'Permisos Sobre',wxn:'wrapx2',req:'Y',I:{lTag:'select',opts:$V.cnfPerms,'class':'_wcSlp '+$Api.JS.cls,name:'slps',value:Jr.slps,noBlank:'Y'}},pare);
	var wList=$1.t('div',0,pare);
	var Us={}; Usx=[];
	if(Jr.slpIds){ var Usx=Jr.slpIds.split(',');  }
	for(var i in Usx){ Us[Usx[i]]=Usx[i]; }
	$1.onchange('._wcSlp',function(val){ cambio(val); });
	function cambio(val){
		wList.innerHTML='';
		if(val=='ids'){
			for(var i in $Tb.oslp){ var L=$Tb.oslp[i];
				var selt=(Us && Us[L.k]==L.k);
				$1.T.ckLabel({t:L.v,I:{'class':$Api.JS.clsOnK,jsk:'S',jstype:'A',name:'allow',AJs:{slpId:L.k},checked:selt}},wList);
			}
		}
	}
	cambio(Jr.slps);
 }
}
$Cnf.Docserie={
get:function(){
	var cont=$M.Ht.cont;
	$Api.get({f:Api.Cnf.b+'docserie',inputs:$1.G.filter(),loade:cont,func:function(Jr){
		var tb=$1.T.table(['','Tipo Comprobante','Código','Autom.','Prox. Núm.','Titulo'],0,cont);
		$Doc.IDtd({tb:tb});
		var tB=$1.t('tbody',0,tb);
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tB);
			var td=$1.t('td',0,tr);
			$1.T.btnFa({fa:'fa-pencil',P:L,func:function(T){
				$M.to('cnf.docserie.form','serieId:'+T.P.serieId);
			}},td);
			$1.t('td',{textNode:_g(L.tt,$V.docTT)},tr);
			$1.t('td',{textNode:L.srCode},tr);
			$1.t('td',{textNode:_g(L.numAuto,$V.YN)},tr);
			$1.t('td',{textNode:L.nextNum},tr);
			$1.t('td',{textNode:L.srTitle},tr);
			$Doc.IDtd({tr:tr},L.serieId);
		}
	}
	});
},
form:function(){
	var Pa=$M.read();
	var fP={
	vidn:'serieId',serieId:Pa.serieId,jsAdd:{},api:Api.Cnf.b+'docserie',
	Cols:[
	['Tipo Comp.',{k:'tt',T:{divLine:1,wxn:'wrapx8',req:'Y',tag:'select',name:'tt',opts:$V.docTT}}],
	[{textNode:'Autonúmerado'},{k:'numAuto',T:{req:'Y',wxn:'wrapx8',tag:'select',name:'numAuto',opts:$V.YN,noBlank:'Y'}}],
	[{textNode:'Inicio'},{k:'srCode',T:{req:'Y',wxn:'wrapx8',tag:'input',name:'srCode',maxlength:4}}],
	[{textNode:'Próx. Número'},{k:'nextNum',T:{wxn:'wrapx8',tag:'number',name:'nextNum',min:0,step:1}}],
	[{textNode:'Titulo'},{k:'srTitle',T:{divLine:1,wxn:'wrapx2',tag:'input',name:'srTitle'}}],
	[{textNode:'Pie Pagina'},{k:'noteFix',T:{divLine:1,wxn:'wrapx1',tag:'textarea',name:'noteFix',style:'height:200px'}}]
	],
	oFunc:function(o){
		$oB.upd(o,$Tb.docSerie[o.tt]);
	}
	}
	$Api.form(fP);
}
}
Api.Pctrl={pr:'/appi/private/pctrl/'};
$M.liAdd('sys',[
{k:'sys.usage',t:'sys.usage',kau:'sysd.supersu',func:function(){
	$M.Ht.ini({g:$Cnf.pCtrl.get});
}}
]);

//consumo y parametrizacion activa de modulos
$Cnf.pCtrl={
	get:function(){
		var cont=$M.Ht.cont;
		$Api.get({f:Api.Pctrl.pr+'unclicc',loade:cont,func:function(Jr){
			var div1=$1.t('div',0,cont);
			function kData(k){ return (Jr.V[k])?Jr.V[k]:{}; }
			$1.T.divLTitle('Usos del Mes',div1);
			var tb=$1.T.table(['Usado','Limite','%','Concepto'],0,div1);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.M){ var L=Jr.M[i];
				var V=kData(L.k,Jr.V);
				var tr=$1.t('tr',0,tBody);
				var prc=(L.usaged && L.maxUse>0)?$js.toFixed(L.usaged*1/L.maxUse*1*100)+'%':'';
				$1.t('td',{textNode:L.usaged*1},tr);
				$1.t('td',{textNode:L.maxUse*1},tr);
				$1.t('td',{textNode:prc},tr);
				$1.t('td',{textNode:V.kDesc},tr);
			}
			var div2=$1.t('div',0,cont);
			$1.T.divLTitle('Caracteristicas',div2);
			var tb=$1.T.table(['','Concepto'],0,div2);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.F){ var L=Jr.F[i];
				var V=kData(L.k,Jr.V);
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.vUsaged*1+' de ' +L.maxUse*1},tr);
				$1.t('td',{textNode:V.kDesc},tr);
			}
			var div2=$1.t('div',0,cont);
			$1.T.divLTitle('Parametrización',div2);
			var tb=$1.T.table(['Valor','Detalle'],0,div2);
			var tBody=$1.t('tbody',0,tb);
			for(var k in Jr.VD){ var v=Jr.VD[k];
				var V=kData(k,Jr.V);
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:v},tr);
				$1.t('td',{textNode:V.kDesc},tr);
			}
		}});
	}
}

$M.liAdd('cnf',[
{_lineText:'Configuración'},
{k:'cnf.meusr',t:'Mi Usuario',kau:'sysd.user', ini:{g:$Cnf.meusr} },
{k:'cnf.mecrd',t:'Datos Empresa',ini:{g:$Cnf.mecrd} },

{k:'cnf.users',t:'Usuarios',ini:{fNew:$Cnf.Users.form,gyp:function(){ $Cnf.Users.get(); } }},

{k:'cnf.ousp',t:'Permisos Especiales',ini:{gyp:function(){ $Cnf.ousp(); } }},

{k:'cnf.repAssg',t:'Asignar Visualización Reportes',ini:{g:$Cnf.repAssg} },
{k:'cnf.docserie',t:'Documentos Series',ini:{f:'cnf.docserie',gyp:$Cnf.Docserie.get,btnGo:'cnf.docserie.form'} },
{k:'cnf.docserie.form',t:'Documentos Series',ini:{g:$Cnf.Docserie.form} }
],{prp:{kMdl:'cnf',kau:'sysd.supersu'}});

$M.kauAssg('admin',[
	{k:'sysd.supersu',t:'Perfil de SuperAdmin'},
	{k:'sysd.suadmin',t:'Permisos de Admin'},
	{k:'sysd.sumaster',t:'Definir Catalogos'},
	{k:'admin.sysEnt',t:'Variables de Entorno'},
	{k:'admin.reports',t:'Acceso a Reportes Especiales'}
]);
$M.kKauTable['cnf']={fatherId:'adm',rootFolder:'Administración',
L:['sysd.supersu','sysd.sumaster','sysd.suadmin']
};
$M.kLiTable['cnf']={MLis:['cnf.mecrd','cnf.meusr'],_F:[
	{mdlActive:'sysUsers',folId:'Users',folName:'Usuarios',MLis:['cnf.users','cnf.repAssg']}
]};
