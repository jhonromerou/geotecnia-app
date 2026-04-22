
Api.Itf={b:'/a/itf/'};
$M.kauAssg('sgc',[
	{k:'itf.siigo.templates',t:'Siigo - Interfaces'},
]);
$V.itfSiigoO=[
{k:20,v:'Madera O-20'},{k:21,v:'Molduras O-21'},{k:22,v:'Terminados 0-22'},
{k:30,v:'Ajuste Costos L-30'},
];
$M.liAdd('itfSiigo',[
	{k:'itfST.siigo.o',t:'Notas de Produccion (Siigo)',kauAssg:'itf.siigo.o',ico:'fa_cubes', func:function(){
		$M.Ht.ini({g:function(){ 
			var cont=$M.Ht.cont; var jsF='jsFields';
			var divL=$1.T.divL({divLine:1,wxn:'wrapx8',req:'Y',L:'Origen',I:{lTag:'select','class':jsF+' _origin',name:'origin',opts:[{k:'pdp',v:'Plan Producción'},{k:'ddp',v:'Doc. Producción'},{k:'gvtSdn',v:'Entrega Venta'}]}},cont);
			$1.T.divL({wxn:'wrapx8',L:'Comprobante',req:'Y',I:{lTag:'select','class':jsF,name:'codiC',opts:$V.itfSiigoO}},divL);
			$1.T.divL({wxn:'wrapx8',L:'Prox. Comprobante',req:'Y',_i:'Definir el pŕoximo consecutivo del comprobante en siigo.',I:{lTag:'number','class':jsF,name:'docSiigo'}},divL);
			var divL2=$1.t('div',0,cont);
			$1.onchange('._origin',(val)=>{
				divL2.innerHTML='';
				if(val=='pdp'){
					divLx=$1.T.divL({divLine:1,wxn:'wrapx8',req:'Y',L:'No. Doc Origen',I:{lTag:'number','class':jsF,name:'docNum'}},divL2);
					$1.T.divL({wxn:'wrapx8',L:'Almacen MP',req:'Y',I:{lTag:'select','class':jsF,name:'whsMP',opts:$Tb.itmOwhs}},divLx);
					$1.T.divL({wxn:'wrapx8',L:'Almacen PT',req:'Y',I:{lTag:'select','class':jsF,name:'whsPT',opts:$Tb.itmOwhs}},divLx);
				}
				else if(val=='ddp'){
					divLx=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Documentos',I:{lTag:'input','class':jsF,name:'docNums',placeholder:'21,26,31'},_i:'Ejemplos:1,2,3 | 1-5 | 1-5,8-12 | 1-3,7-12,19,23'},divL2);
					$1.T.divL({wxn:'wrapx4',L:'Creados Desde',I:{lTag:'btnDate',time:'Y','class':jsF,name:'date1'}},divLx);
					$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{lTag:'btnDate',time:'Y','class':jsF,name:'date2'}},divLx);
				}
				else{
					divLx=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Documentos',I:{lTag:'input','class':jsF,name:'docNums',placeholder:'21,26,31'},_i:'Ejemplos:1,2,3 | 1-5 | 1-5,8-12 | 1-3,7-12,19,23'},divL2);
					$1.T.divL({wxn:'wrapx4',L:'Creados Desde',I:{lTag:'btnDate',time:'Y','class':jsF,name:'date1'}},divLx);
					$1.T.divL({wxn:'wrapx8',L:'Hasta',I:{lTag:'btnDate',time:'Y','class':jsF,name:'date2'}},divLx);
				}
			});
			var vPost='';
			var wList=$1.t('div');
			Itf.get({f:Api.Itf.b+'siigo.o',vPost:vPost},wList,cont);
			cont.appendChild(wList);
		}});
	}},
{k:'itfST.siigo.mpP',t:'Inventario a Siigo',kauAssg:'exp.invsiigo', func:function(){ 
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
}},
{k:'itfST.siigo.ingProd',t:'Doc. Ingreso Producción Siigo',kauAssg:'itf.siigo.templates',ico:'fa_cubes', func:function(){
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
}},
{k:'itfST.siigo.ivtEgr',t:'Doc. Salida Mercancia Siigo',kauAssg:'itf.siigo.templates',ico:'fa_cubes', func:function(){
	$M.Ht.ini({func_cont:function(){ 
		var cont=$M.Ht.cont; var jsF='jsFields';
		var divL=$1.T.divL({divLine:1,wxn:'wrapx8',req:'Y',L:'Serie',I:{tag:'select','class':jsF,name:'serieId',opts:$Tb.docSerie['ivtEgr']}},cont);
		$1.T.divL({wxn:'wrapx8',L:'N.° Doc /s.',req:'Y',I:{tag:'input',type:'text','class':jsF,name:'docNum'}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Doc. Siigo',req:'Y',I:{tag:'input',type:'number','class':jsF,name:'docSiigo'}},divL);
		$1.T.divL({wxn:'wrapx8',L:'Código de Barras',req:'Y',I:{tag:'select',sel:{'class':jsF,name:'grTypeId'},opts:$V.bar2,noBlank:'Y'}},divL);
		var resp=$1.t('div',0,cont);
		var vPost='';
		var wList=$1.t('div');
		Itf.get({f:Api.Itf.b+'siigo.ivtEgr',vPost:vPost},wList,cont);
		cont.appendChild(wList);
	}});
}},
{k:'itfST.siigo.dlv2Inv',t:'Factura desde Remisión Siigo',kauAssg:'itf.siigo.ingProd',ico:'fa_cubes', func:function(){
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
}},
{k:'itfST.siigo.notacred',t:'Nota Crédito',kauAssg:'itf.siigo.ingProd',ico:'fa_cubes', func:function(){
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
}},
]);
