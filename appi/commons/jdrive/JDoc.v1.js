/* no use */

JDoc.Card={
	onOpen:function(P){
		var P=(P)?P:{};
		if(JDoc.openFunc=='uri'){
			var Pa=$M.read();
			$M.uriFunc=function(){ JDoc.Fi.view(); };
			$M.to('geDoc.card','cardId:'+Pa.cardId+',folId:'+Pa.folId+',fileId:'+P.fileId);
		}
		else if(JDoc.openFunc=='open'){ JDoc.Fi.view(P); }
	},
	getCards:function(){
		var Pa=$M.read();
		var cont=$M.Ht.cont;
		$Api.get({f:Api.JDoc.a+'cards',inputs:$1.G.filter(), loaderFull:'Y', loade:cont, func:function(Jr){
			if(Jr.errNo){ $Api.resp(cont,Jr); }
			else{
				var tb=$1.T.table(['','Código','Nombre']); cont.appendChild(tb);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',0,tBody);
					var td=$1.t('td',0,tr);
					var a=$1.t('a',{href:$M.to('geDoc.card','cardId:'+L.cardId,'r'),'class':'fa fa_folder',title:'Ver Carpeta'},td);
					$1.t('td',{textNode:L.cardCode},tr);
					$1.t('td',{textNode:L.cardName},tr);
				}
			}
		}});
	},
	get:function(){
		var contA=$M.Ht.cont;
		var Pa=$M.read();
		var vPost='cardId='+Pa.cardId;
		
		var cont=$1.t('div',{'class':JDoc.Cls.wrapper},contA);
		var lef=$1.t('div',{'class':JDoc.Cls.wrapFol},cont);
		var mid=$1.t('div',{'class':JDoc.Cls.wrapFiles},cont);
		var rig=$1.t('div',{'class':JDoc.Cls.wrapViewFile,textNode:'Vista'},cont);
		$1.t('div',{'class':'clear'},cont);
		$Api.get({f:Api.JDoc.a+'card',inputs:vPost, loaderFull:'Y', loade:lef, func:function(Jr){
			if(Jr.errNo){ $Api.resp(lef,Jr); }
			else{
				$1.I.before($1.t('h4',{textNode:Jr.cardName}),cont);
				if(Jr.L && Jr.L.errNo){ $Api.resp(lef,Jr.L); }
				else{
					Jr.L=$js.sortNum(Jr.L,{k:'lv'});
					var Li=[];
					for(var i in Jr.L){ var L=Jr.L[i];
						L.cardId=Pa.cardId;
						Li.push(L);
					}
					Uli.ini({Li:Li,
						mFunc:function(){ JDoc.Card.getFiles(); },
						mTo:function(L2){ $M.to('geDoc.card','cardId:'+Pa.cardId+',folId:'+L2.folId); }
					},lef);
				}
			}
		}});
		if(Pa.folId){ JDoc.Card.getFiles(); }
		if(Pa.fileId){ JDoc.Card.onOpen(Pa); }
	},
	getFiles:function(){
		var Pa=$M.read();
		var cont=$1.q('.'+JDoc.Cls.wrapFiles);
		var vPost='cardId='+Pa.cardId+'&folId='+Pa.folId;
		$Api.get({f:Api.JDoc.a+'card.open',inputs:vPost, loade:cont, func:function(Jr){
			if(Jr.errNo){ $Api.resp(cont,Jr); }
			else{
				$1.t('h5',{'class':'fa fa_folder',textNode:Jr.folName},cont);
				var tb=$1.T.table(['Tipo','Nombre Archivo...','Tamaño','Versión','Creado']);
				var tBody=$1.t('tbody',{'class':'geDoc_tableFiles'},tb); cont.appendChild(tb);
				if(Jr.L && !Jr.L.errNo){ JDoc.Ht.trFile(tBody,Jr.L,{view:'card'}); }
				var upd=$1.t('div',{id:'fileUpd'},cont);
				Attach.btnUp({func:function(Jr3){
					if(!Jr3.errNo){
						JDoc.fileUp({folId:Pa.folId,tt:'card',tr:Pa.cardId,L:Jr3}, function(Jrr,o){
							JDoc.Ht.trFile(tBody,o,{view:'card'});
						});
					}
				}},upd);
			}
		}});
	},
}
JDoc.Pwork={
	onOpen:function(P){
		var P=(P)?P:{};
		if(JDoc.openFunc=='uri'){
			var Pa=$M.read();
			$M.uriFunc=function(){ JDoc.Fi.view(); };
			$M.to('geDoc.pwork','folId:'+Pa.folId+',fileId:'+P.fileId);
		}
		else if(JDoc.openFunc=='open'){ JDoc.Fi.view(P); }
	},
	get:function(){
		var contA=$M.Ht.cont;
		var Pa=$M.read();
		var vPost='';
		var cont=$1.t('div',{'class':JDoc.Cls.wrapper},contA);
		var lef=$1.t('div',{'class':JDoc.Cls.wrapFol},cont);
		var mid=$1.t('div',{'class':JDoc.Cls.wrapFiles},cont);
		var rig=$1.t('div',{'class':JDoc.Cls.wrapViewFile,textNode:'Vista'},cont);
		$1.t('div',{'class':'clear'},cont);
		$Api.get({f:Api.JDoc.a+'pwork',inputs:vPost, loaderFull:'Y', loade:lef, func:function(Jr){
			if(Jr.errNo){ $Api.resp(lef,Jr); }
			else{
				//$1.I.before($1.t('h4',{textNode:Jr.cardName}),cont);
				if(Jr.L && Jr.L.errNo){ $Api.resp(lef,Jr.L); }
				else{
					Jr.L=$js.sortNum(Jr.L,{k:'lv'});
					var Li=[];
					for(var i in Jr.L){ var L=Jr.L[i];
						L.cardId=Pa.cardId;
						Li.push(L);
					}
					Uli.ini({Li:Li,
						mFunc:function(){ JDoc.Pwork.getFiles(); },
						mTo:function(L2){ $M.to('geDoc.pwork','folId:'+L2.folId); }
					},lef);
				}
			}
		}});
		if(Pa.folId){ JDoc.Pwork.getFiles(); }
		if(Pa.fileId){ JDoc.Pwork.onOpen(Pa); }
	},
	getFiles:function(){
		var Pa=$M.read();
		var cont=$1.q('.'+JDoc.Cls.wrapFiles);
		var vPost='folId='+Pa.folId;
		$Api.get({f:Api.JDoc.a+'pwork.open',inputs:vPost, loade:cont, func:function(Jr){
			if(Jr.errNo){ $Api.resp(cont,Jr); }
			else{
				$1.t('h5',{'class':'fa fa_folder',textNode:Jr.folName},cont);
				var tb=$1.T.table(['Tipo','Nombre Archivo','Tamaño','Versión','Creado']);
				var tBody=$1.t('tbody',{'class':'geDoc_tableFiles'},tb); cont.appendChild(tb);
				if(Jr.L && !Jr.L.errNo){ JDoc.Ht.trFile(tBody,Jr.L,{view:'pwork'}); }
				var upd=$1.t('div',{id:'fileUpd'},cont);
				if(JDoc.perms('W',Jr)){
					Attach.btnUp({func:function(Jr3){
						if(!Jr3.errNo){
							JDoc.fileUp({folId:Pa.folId,tt:'pwork',tr:1,L:Jr3.L}, function(Jrr,o){
								JDoc.Ht.trFile(tBody,o,{view:'pwork'});
							});
						}
					}},upd);
				}
			}
		}});
	},
}

JDoc.oTy={
	onOpen:function(P){
		var P=(P)?P:{};
		if(JDoc.openFunc=='uri'){
			var Pa=$M.read();
			$M.uriFunc=function(){ JDoc.Fi.view(); };
			$M.to('geDoc.oTy','listId:'+Pa.folId+',fileId:'+P.fileId);
		}
		else if(JDoc.openFunc=='open'){ JDoc.Fi.view(P); }
	},
	get:function(){
		var contA=$M.Ht.cont;
		var Pa=$M.read();
		var vPost='cardId='+Pa.cardId;
		var cont=$1.t('div',{'class':JDoc.Cls.wrapper},contA);
		var lef=$1.t('div',{'class':JDoc.Cls.wrapFol},cont);
		var mid=$1.t('div',{'class':JDoc.Cls.wrapFiles},cont);
		var rig=$1.t('div',{'class':JDoc.Cls.wrapViewFile,textNode:'Vista'},cont);
		var Jr={};
		Jr.L=($Mdl.JDoc_oTy)?$Mdl.JDoc_oTy:{errNo:3,text:'No hay definido ningun tipo.'};
		$1.t('div',{'class':'clear'},cont);
			if(Jr.errNo){ $Api.resp(lef,Jr); }
			else{
				if(Jr.L && Jr.L.errNo){ $Api.resp(lef,Jr.L); }
				else{
				Jr.L=$js.sortNum(Jr.L,{k:'lv'});
				var Li=[];
				for(var i in Jr.L){ var L=Jr.L[i];
					L.cardId=Pa.cardId;
					Li.push(L);
				}
				Uli.ini({Li:Li,
					mFunc:function(){ JDoc.oTy.getFiles(); },
					mTo:function(L2){ $M.to('geDoc.oTy','folId:'+L2.folId); }
				},lef);
				}
			}
		
		if(Pa.folId){ JDoc.oTy.getFiles(); }
		if(Pa.fileId){ JDoc.oTy.onOpen(Pa); }
	},
	getFiles:function(){
		var Pa=$M.read();
		var cont=$1.q('.'+JDoc.Cls.wrapFiles);
		var vPost='folId='+Pa.folId;
		$Api.get({f:Api.JDoc.a+'oTy.open',inputs:vPost, loade:cont, func:function(Jr){
			if(Jr.errNo){ $Api.resp(cont,Jr); }
			else{
				$1.t('h5',{'class':'fa fa_folder',textNode:Jr.folName},cont);
				var tb=$1.T.table(['Tipo','Nombre Archivo','Tamaño','Versión','Creado','Pedido']);
				var tBody=$1.t('tbody',{'class':'geDoc_tableFiles'},tb); cont.appendChild(tb);
				var tds=[];
				for(var i in Jr.L){
					Jr.L[i].folId='oTy';
					var td=$1.t('td');
					td.appendChild($Doc.href(Jr.L[i].tt,{docEntry:Jr.L[i].tr}));
					tds.push(td);
				}
				if(Jr.L && !Jr.L.errNo){ JDoc.Ht.trFile(tBody,Jr.L,{tds:tds,view:'oTy'}); }
			}
		}});
	},
}

JDoc.to=function(P,add){
	var add=(add)?','+add:'';
	var r=''; var r2='';
	if(P.tt=='card'){ r='geDoc.card'; r2='cardId:'+P.tr; }
	return $M.to(r,r2+add,'r');
}

JDoc.Rfi={/* Req Files */
oneLoad:function(P,pare){
	var ex=$1.q('._oneLoad',pare);
	if(!ex){
		var win=$1.t('div',{'class':'_oneLoad'},pare);
		JDoc.Rfi.get(P,pare);
	}
},
get:function(P,cont){
	var cont=(cont)?cont:$M.Ht.cont;
	var vPost='tt='+P.tt+'&tr='+P.tr;
	$Api.get({f:Api.JDoc.b+'rfi',inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['Documento','Tipo','Nombre Archivo..','Tamaño','Requerido',''],0,cont);
			tb.classList.add('_oneLoad');
			var tBody=$1.t('tbody',{'class':'geDoc_tableFiles'},tb);
			if(Jr.L && !Jr.L.errNo){ for(var i in Jr.L){ L=Jr.L[i];
				L.tt=P.tt; L.tr=P.tr;
				if(L.fileName){ JDoc.Rfi.inpTxt(L,tBody); }
				else{ JDoc.Rfi.inpUp(L,tBody); }
			}}
		}
	}});
},
inpUp:function(L,tBody){
	var tr=$1.t('tr',{'class':'_gtdRfiId_'+L.rfiId});
	var trOld=$1.q('._gtdRfiId_'+L.rfiId,tBody);
	if(trOld){ tBody.replaceChild(tr,trOld); }
	else{ tBody.appendChild(tr); }
	$1.t('td',{textNode:L.rfiName},tr);
	var td=$1.t('td',{colspan:3},tr);
	var inp=$1.t('input',{type:'file',name:'file','class':$Api.xFields},td);
	inp.AJs={rfiId:L.rfiId,tt:L.tt,tr:L.tr};
	inp.onchange=function(){ This=this.parentNode;
		$Api.post({f:Api.JDoc.b+'rfi',formData:This,winErr:true,func:function(Jr2,_o){
			JDoc.Rfi.inpTxt(_o,tBody);
		},upFiles:'Y'
		});
	}
	$1.t('td',{textNode:((L.isOpt=='N')?'Si':'No')},tr);
	$1.t('td',0,tr);
	return tr;
},
inpTxt:function(L,tBody){
	var tr=$1.t('tr',{'class':'_gtdRfiId_'+L.rfiId});
	var trOld=$1.q('._gtdRfiId_'+L.rfiId,tBody);
	if(trOld){ tBody.replaceChild(tr,trOld); }
	else{ tBody.appendChild(tr); }
	$1.t('td',{textNode:L.rfiName},tr);
	$1.t('td',{textNode:L.fileType},tr);
	var td=$1.t('td',0,tr);
	$1.t('span',{'class':'fa fa-eye',title:'Ver Archivo',L:L,textNode:L.fileName},td).onclick=function(){ Attach.view(this.L); }
	$1.t('td',{textNode:L.fileSizeText},tr);
	$1.t('td',{textNode:((L.isOpt=='N')?'Si':'No')},tr);
	var td=$1.t('td',0,tr);
	$1.T.btnFa({fa:'fa_close',title:'Eliminar',P:L,func:function(T){
		$Api.delete({f:Api.JDoc.b+'rfi',inputs:'id='+T.P.id,winErr:true,func:function(Jr2){ JDoc.Rfi.inpUp(L,tBody);
		}});
	}},td);
}
}

JDoc.Rfi.define=function(Px){
	//api,gData,tt,
	var gData='wh[tt]='+Px.tt+'&';
	if(Px.gData){ gData+=Px.gData+'&'; }
	$Filt.filtFunc=function(){ JDoc.Rfi.define(Px); }
	$Filt.form({cont:$M.Ht.filt,whs:'Y',active:'Y',Li:[
	{t:'Opcional',tag:'select',name:'isOpt',opts:$V.YN},
	{t:'Nombre del Requerido',tag:'input',name:'rfiName(E_like3)'}
	]});
	$Tb._Massi.form({api:Api.JDoc.b+'rfi/tt',vPost:gData+$Filt.get($M.Ht.filt),filter:'Y',
	L:[
	[{textNode:'Opcional'},{tag:'select',k:'isOpt',name:'isOpt',opts:$V.YN,noBlank:'Y',AJsBase:{tt:Px.tt},AJs:['rfiId']}],
	[{textNode:'Nombre del Requerido'},{tag:'input',k:'rfiName',name:'rfiName'}]
	]
	});
}


JDoc.Fix={/*archivos fijos */
get:function(P,cont){
	// to:geDoc.card, cardId, 
	//geDoc.card!!{cardId:1,folId:1,fileId:8}
	var cont=(cont)?cont:$M.Ht.cont;
	var vPost='tt='+P.tt+'&tr='+P.tr;
	$Api.get({f:Api.JDoc.b+'fix',inputs:vPost, loade:cont, func:function(Jr){
			if(P.divTop){
				cont.appendChild(P.divTop);
			}
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['Tipo','Nombre Archivo..','Tamaño','Directorio'],0,cont);
			tb.classList.add('_oneLoad');
			var tBody=$1.t('tbody',{'class':'geDoc_tableFiles'},tb);
			if(Jr.L && !Jr.L.errNo){ for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.fileType},tr);
				$1.t('td',{textNode:L.fileName},tr);
				$1.t('td',{textNode:L.fileSizeText},tr);
				var td=$1.t('td',0,tr);
				$1.t('a',{textNode:L.folName,'class':'fa fa-folder',href:JDoc.to(L,'folId:'+L.folId+',fileId:'+L.fileId)},td);
			}}
		}
	}});
},
}