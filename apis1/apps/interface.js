
$M.liA['itf']={t:'Interfaces',L:[]};
$M.add([
{liA:'itf',rootFolder:'Interfaces',L:[{k:'itf.siigo.ingProd',t:'Doc. Ingreso Producción'},{k:'exp.invsiigo',t:'Siigo MP (En Pruebas)'}]}
]);
Api.Itf={b:'/a/itf/'};

$M.li['itf.siigo.mpP']={t:'Inventario a Siigo',kau:'exp.invsiigo', func:function(){ 
	$M.Ht.ini({topCont:$1.t('p',{textNode:'Genera la plantilla para cargar cantidades a SIIGO.'}), fieldset:true, func_filt:function(filt){
		var jsV='jsFiltVars';
		var divL=$1.T.divL({divLine:1, wxn:'wrapx8',req:'Y',L:{textNode:'Basado en'},I:{tag:'select',sel:{'class':jsV,name:'tempBy'},opts:{doc:'Documento',date:'Fechas'}}},filt);
		$1.T.divL({wxn:'wrapx8',req:'Y',L:{textNode:'Tipo Documento'},I:{tag:'select',sel:{'class':jsV,name:'docType'},opts:{oing:'Ingresos',oegr:'Salidas','ocat':'Inventario',otmp:'Trans. MP'}}},divL);
		$1.T.divL({wxn:'wrapx8',req:'Y',L:{textNode:'No. Documento'},I:{tag:'input',type:'text',inputmode:'numeric','class':jsV,name:'docEntry'}},divL)
		$1.T.divL({wxn:'wrapx8',L:{textNode:'Fecha Inicio'},I:{tag:'input',type:'date','class':jsV,name:'date1'}},divL)
		$1.T.divL({wxn:'wrapx8',L:{textNode:'Fecha Corte'},I:{tag:'input',type:'date','class':jsV,name:'date2'}},divL)
		var divL=$1.T.divL({divLine:1, wxn:'wrapx8',req:'Y',supText:'Próximo Documento en Siigo',L:{textNode:'No. Documento'},I:{tag:'input',type:'text',inputmode:'numeric','class':jsV,name:'docSiigo'}},filt);
		var btn=$1.T.btnSend({textNode:'Obtener Plantilla', func:getPlantilla});
		filt.appendChild(btn);
	}, func_cont:null }); function getPlantilla(){
		var cont=$M.Ht.cont;
		$ps_DB.get({f:'GET '+Api.Itf.b+'invsiigo', loade:cont, errWrap:cont, inputs:$1.G.filter(), func:function(Jr){
			var tb=$1.T.table(Jr.TH); 
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i]; 
				var tr=$1.t('tr',0,tBody);
				for(var f in Jr.TH){
					var css=(L[f]==='' || L[f]==null)?'backgroundColor:#FF0;':'';
					$1.t('td',{textNode:L[f],style:css},tr);
				}
			}
			tb=$1.T.tbExport(tb,{fileName:Jr.fileName,ext:'xlsx'});
			cont.appendChild(tb);
		}});
	}
}};

$M.li['itf.siigo.ingProd']={t:'Doc. Ingreso Producción',kau:'itf.siigo.ingProd',ico:'fa_cubes', func:function(){
	$M.Ht.ini({func_cont:function(){ 
		var cont=$M.Ht.cont; var jsF='jsFields';
		var typ={ivtCat:'Toma Inventario',ivtIng:'Ingresos',ivtEgr:'Egresos'};
		var divL=$1.T.divL({divLine:1,wxn:'wrapx8',req:'Y',L:'Doc. Base',I:{tag:'select',sel:{'class':jsF,name:'docType'},opts:typ}},cont);
		$1.T.divL({wxn:'wrapx8',L:'N.° Doc.',req:'Y',I:{tag:'input',type:'number',inputmode:'numeric','class':jsF,name:'docEntry'}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Doc. Siigo',req:'Y',I:{tag:'input',type:'number','class':jsF,name:'docSiigo'}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Código de Barras',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'grTypeId'},opts:$V.bar2,noBlank:'Y'}},divL);
		var resp=$1.t('div',0,cont);
		var vPost='';
		var wList=$1.t('div');
		Itf.get({f:Api.Itf.b+'siigo.ingProd',vPost:vPost},wList,cont);
		cont.appendChild(wList);
	}});
}};
$M.li['itf.siigo.dlv2Inv']={t:'Factura desde Remisión',kau:'itf.siigo.ingProd',ico:'fa_cubes', func:function(){
	$M.Ht.ini({func_cont:function(){ 
		var cont=$M.Ht.cont; var jsF='jsFields';
		var typ={ivtCat:'Toma Inventario',ivtIng:'Ingresos',ivtEgr:'Egresos'};
		var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'N.° Doc.',req:'Y',I:{tag:'input',type:'number',inputmode:'numeric','class':jsF,name:'docEntry'}},cont);
		$1.T.divL({wxn:'wrapx8',L:'Doc. Siigo',req:'Y',I:{tag:'input',type:'number','class':jsF,name:'docSiigo'}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Código de Barras',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'grTypeId'},opts:$V.bar2,noBlank:'Y'}},divL);
		var resp=$1.t('div',0,cont);
		var vPost='';
		var wList=$1.t('div');
		Itf.get({f:Api.Itf.b+'siigo.dlv2Inv',vPost:vPost},wList,cont);
		cont.appendChild(wList);
	}});
}};
$M.li['itf.siigo.notacred']={t:'Nota Crédito',kau:'itf.siigo.ingProd',ico:'fa_cubes', func:function(){
	$M.Ht.ini({func_cont:function(){ 
		var cont=$M.Ht.cont; var jsF='jsFields';
		$1.t('h5',{textNode:'Modulo en Pruebas...'},cont);
		var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'N.° Doc.',req:'Y',I:{tag:'input',type:'number',inputmode:'numeric','class':jsF,name:'docEntry'}},cont);
		$1.T.divL({wxn:'wrapx8',L:'Doc. Siigo',req:'Y',I:{tag:'input',type:'number','class':jsF,name:'docSiigo'}},divL);
		$1.T.divL({wxn:'wrapx4',L:'Código de Barras',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'grTypeId'},opts:$V.bar2,noBlank:'Y'}},divL);
		var resp=$1.t('div',0,cont);
		var vPost='';
		var wList=$1.t('div');
		Itf.get({f:Api.Itf.b+'siigo.notaCred',vPost:vPost},wList,cont);
		cont.appendChild(wList);
	}});
}};

var Itf={
get:function(P,wList,cont){
	var jsF='jsFields'; P=(P)?P:{};
	var vPost=(P.vPost)?P.vPost:'';
	P.textNode='Generar Plantilla';
	$Xls_spaces=/\~/g;
	P.getInputs=function(){ return vPost+$1.G.inputs(cont,jsF); };
	P.func=function(Jr){
		if(Jr.errNo){ $Api.resp(wList,Jr); }
		else{
		wList.innerHTML='';
		var tb=$1.T.table([]); var maxTds=[]; tb.innerHTML='';
		var tBody=$1.t('tbody',0,tb); var r0=0;
		for(var i in Jr.L){
			var cO=(r0==0)?{'class':'__td0'}:0; r0=1;
			var tr=$1.t('tr',cO,tBody); 
			var tdsN=1;
			for(var f in Jr.L[i]){ tdsN++; var tE=Jr.L[i][f];
				var txt=(tE && tE.t)?tE.t:tE;
				$1.t('td',{textNode:txt},tr);
			}
			maxTds.push(tdsN); /*tds todales en tr */
			r0++;
		}
		tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:Jr.fileName});/* ext, fileName */
		wList.appendChild(tb);
		}
	}
	return $Api.send(P,cont);
}
}
Itf.DT = {
form:function(D){
	// version 2023.1
	if (D.req) {
		D.api = D.req.path
	}

	var wrap = $M.Ht.cont; wrap.innerHTML='';
	var wrap=$1.t('div',0,wrap);
	if(D.descrip){
		wrap.appendChild($1.t('div',{'class':'textarea',style:'min-height:0;',textNode:D.descrip}));
	}
	var formu = $1.t('form',{name:'_admsDataTransferForm','style':'padding:0.025rem 0;'},wrap);
	var fid = 'fileIdw_'+$js.srand();
	var iFile = $1.t('input',{type:'file', id:fid, 'class':$Api.xFields+' psUFile psUFile_x32 _5f_fileWrap', name:'file'},formu);
	var iLabel = $1.t('label',{'for':fid,textNode:'Selección de Archivo'},formu);
	$1.t('div',{'class':'_wrapResp'},wrap);
	var resp=$1.t('div',0,wrap);
	D.limitEnd=(D.limitEnd)?D.limitEnd:500;
	$Api.send({POST:D.api+'?limitEnd='+D.limitEnd,textNode:' Definir Plantilla',faBtn:'fa_fileUpd',Conf:{text:'Toda la información será ingresada a la base de datos y no se podrá revertir el proceso'},formData:wrap,func:function(Jr){
		$Api.resp(resp,Jr); iFile.value=null;
	}},wrap);
	wrap.appendChild($1.t('clear')); wrap.appendChild($1.t('clear'));
	var lw={L:[
		{textNode:'Plantilla',actived:'Y',winClass:'winTemplate' }
		]};
		if(D.Fie){
			lw.L.push({textNode:'Selección Campos',winClass:'winFie' });
		}
		var rTab=$1.Menu.tabs(lw); wrap.appendChild(rTab._top);
	if(!D.Li){ D.Li=[]; }
	Itf.DT.tbStru(D,rTab.winTemplate);
	if(D.Fie){
		if(D.Fie0){
			for(var i in D.Fie0){ D.Fie.unshift(D.Fie0[i]); }
		}
		var tb = $1.T.table(['','Campo','Descripción'],0,rTab.winFie);
		var tBody = $1.t('tbody',0,tb);
		for(var i in D.Fie){
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',0,tr);
			if(D.Fie[i].b!='Y'){ $1.t('input',{type:'checkbox',D:D.Fie[i]},td); }
			$1.t('td',{textNode:D.Fie[i].t},tr);
			$1.t('td',{textNode:D.Fie[i].d},tr);
		}
		function getFields(tBody){
			var w=$1.q('input',tBody,'all');
			var tD={f:[],Li:[]};
			for(var i=0; i<w.length; i++){
				if(w[i].checked){
					tD.Li.push(w[i].D);
					tD.f.push(w[i].D.t);
				}
			}
			tD.f=tD.f.join();
			return tD;
		}
		$1.T.btnFa({fa:'faBtnCt', textNode:'Volver a Definir Plantilla',P:tBody,func:function(T){
			var tG=getFields(T.P);
			D.Li=tG.Li;
			rTab.li_winTemplate.click();
			Itf.DT.tbStru(D,rTab.winTemplate);
		}},rTab.winFie);
		if(D.btnGet){
			$1.T.btnFa({fa:'faBtnCt', textNode:'Obtener Plantilla con Datos',P:tBody,func:function(T){
				var tG=getFields(T.P);
				D.Li=tG.Li;
				$Api.get({f:D.api,inputs:'fie='+tG.f,func:function(Jr){
					D.L=Jr.L; rTab.li_winTemplate.click();
					Itf.DT.tbStru(D,rTab.winTemplate);
				}});
			}},rTab.winFie);
		}
	}
	$1.t('p',{style:'fontSize:0.75rem; fontStyle:italic;',textNode:'Data Transfer v.3'},wrap);
},
tbStru:function(P,wList){
	wList.innerHTML='';
	var tb = $1.t('table',{'class':'table_zh'});
	var tHead = $1.t('thead',0,tb);
	var tr0 = $1.t('tr',0,tHead);
	var tBody = $1.t('tbody',0,tb);
	var tr1 = $1.t('tr',0,tBody);
	if(P.Fie0){
		for(var i in P.Fie0){
			P.Li.unshift(P.Fie0[i]);
		}
	}
	for(var k in P.Li){ L = P.Li[k];//k=fie, title, descrip
		L.d = (L.d)?L.d:'';
		$1.t('td',{textNode:L.t},tr0);
		$1.t('td',{textNode:L.d},tr1);
	}
	if(P.L){
		for(var i in P.L){
			var tr=$1.t('tr',0,tBody);
			for(var k in P.Li){ var Lk=P.Li[k];
			var te=P.L[i][Lk.t];
			switch(Lk.format){
				case '$': te=$Str.money(te); break;
				case 'number': te=te*1; break;
			}
				$1.t('td',{textNode:te},tr);
			}
		}
	}
	tb = $1.T.tbExport(tb,{fileName:'Plantilla.txt',ext:'txt'});
	wList.appendChild(tb);
}
}

var hidVie={
cls:'_hidVieRow_',
clsE:'_hidVieRow_ _hidVieRow_',
clsA:'_hidVieRow_active',
upd:function(ver,pare){
	var a=$1.q('.'+hidVie.cls,pare,'all'); 
	for(var i=0; i<a.length; i++){
		a[i].style.display= 'none';
		if(a[i].classList.contains(hidVie.cls+ver)){ a[i].style.display= ''; }
	}
}
}