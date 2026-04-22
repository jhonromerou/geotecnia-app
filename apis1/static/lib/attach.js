Api.Stor='/a/attach/';
$MCnf.put('Attach',{
	maxSize:1
});
Api.Attach={pr:'/appi/private/attach/',
prA:'/appi/private/attach/a/', //usando en otras partes geDoc
}

$1.tabsExts['plugsFiles']={textNode:'Archivos','winClass':'files','class':'fa fa-file-o',func:(T)=>{
	Attach.form(T.P,T.win);
}};
var Attach={/* integrado con JSTOR,JFB */
	ni:1,
	wid:'winFileUpd_',
	jsD:function(P){
		try{ var JSD=$js.parse(P.value,{}); }
		catch(e){ JSD={}; }
		JSD=(JSD && JSD.purl)?JSD:{}; //fId, purl
		return JSD;
	},
	send:function(iFile,P,wResp){
		JStor.iFile(iFile,{func:function(Jq,JrL){
		/* Subir a ffc1, tt,tr */
		if(P.save=='Y'){ Attach.post(Jq,P,{cont:wResp}); }
		if(P.func){ P.func(Jq,JrL); }
	}});
	},
	tagFile:function(P,pare){
		var JSD=Attach.jsD(P); //fId, purl
		var cont=$1.t('div',{style:'display:inline-block; border:0.0625rem solid #000; border-radius:0.25rem; padding:0.15rem; position:relative;'});
		var divName=$1.t('div',{style:'display:none; verticalAlign:middle; cursor:pointer; padding:2px 5px;','class':'fa fa-paperclip'},cont);
		var divNameA=$1.t('a',{href:JSD.purl,textNode:'Ver Archivo',target:'_BLANK'},divName);
		var divUpd=$1.t('div',{style:'display:inline-block; verticalAlign:middle; cursor:pointer; padding:2px 5px;','class':'fa fa-paperclip'},cont);
		var jsF=(P['class'])?P['class']:$Api.JS.cls;
		var name=(P.name)?P.name:'updFile';
		var value=P.value;
		divUpd.innerText=(P.textNode)?P.textNode:'Seleccione';
		var inpSrc=$1.t('input',{type:'hidden','class':jsF,name:name,value:value,AJs:P.AJs},cont);
		var iFile = $1.t('input',{type:'file',style:'display:none'},cont);
		divUpd.onclick=function(){
			if(!P.tt || !P.tr){ $1.Win.message({errNo:3,text:'No se pueden cargar archivos, no se ha definido relación tt-tr. on[Attach.tagFile()'}); }
			else{ iFile.click(); }
		}
		new JStor.iFile(iFile,{path:P.path,func:function(L){
			P.func=function(o){
				if(o && o[0]){
					tsa={fileId:o[0].fileId,purl:o[0].purl};
					inpSrc.value=JSON.stringify(tsa);
					cambio(o[0].purl);
				}
			}
			Attach.post(L,P,{});
			//inpSrc.value=JSON.stringify(tsa);
		}});
		btnDel=$1.T.btnFa({fa:'fa_close',func:function(){
			var JSD=Attach.jsD(inpSrc);
			JSD.func=function(){
				cambio();
					inpSrc.value='';
			}
			Attach.delete(JSD);
		}},cont);
		if(pare){ pare.appendChild(cont); }
		cambio(JSD.purl);
		/* funcs */
		function cambio(src){
			if(src){
				divUpd.style.display='none';
				divName.style.display='inline-block';
				divNameA.setAttribute('href',src);
				btnDel.style.visibility='';
			}
			else{
				divUpd.style.display='inline-block';
				divName.style.display='none';
				divNameA.setAttribute('href','');
				btnDel.style.visibility='hidden';
			}
		}
		return cont;
	},

	btnUp:function(P,pare){P=(P)?P:{}; //nuevo con JStor,
		/*
		multiple=N: no permitir mas de 1
		open=Y: abrir automaticamente btn
		getList=Y: call files like tt-tr
		winTitle: mostrarlo en ventan
		fDraw: llamar Tt.drawL al recibir datos,
		save=guardar archivo en ffc1
		func:ejecutar funcion con L.files, no usar save para no duplicar
		*/
		P.wT=(P.wT)?P.wT:{};
		var tid=P.tt+'_'+P.tr;
		if($1.q('.plugsFiles_'+tid)){ return false; }
		if(P.fDraw=='Y'){//dibujar al subir
			P.func=function(o,P1){
				if(o){ for(var c in o){ Attach.drawL(o[c],P1.wList); } }
			}
		}
		var wid=Attach.wid+P.tt+'_'+P.tr;
		P.wT.id='__btnUpload';
		var wrap = $1.t('div',P.wT,pare);
		wrap.classList.add('plugsFiles_'+tid);
		var lid='fileBtn_'+Attach.ni; Attach.ni++;
		if(P.bntUp!='N'){
			var formu = $1.t('form',{name:'psUploadFileForm','style':'padding:5px 0;','server':$s.storage},wrap);
			var iFile = $1.t('input',{type:'file', id:lid, 'class':'psUFile psUFile_x32 _fileInput', name:'file'},formu);
			$1.t('label',{'for':lid,title:'Selección de Archivo'},formu);
			$1.t('span',{'class':'fa fa-info',style:'fontSize:10px; color:blue;',title:'Storage: '+$s.storage+', svr: '+Attach.svr},formu);
			if(P.multiple!='N'){ iFile.setAttribute('multiple',true); }
			var wResp = $1.t('div',{'class':'__fileUpdwrapResp'},wrap); 
			Attach.send(iFile,P,wResp);
		}
		else{ var wResp = $1.t('div',{'class':'__fileUpdwrapResp'},wrap); }
		var wList = $1.t('div',{id:wid,'class':'_5f_wrapList',style:'margin-top:15px;'},wrap);
		P.wList=wList;
		if(pare){ pare.P=P; } //usar para obtener
		if(P.open=='Y'){ iFile.click(); }
		/* obtener listado de archivos save tt-tr */
		if(P.getList=='Y'){ Attach.get(P); }
		if(P.winTitle){
			$1.delet(wid+'_');
			$1.Win.open(wrap,{winTitle:P.winTitle,onBody:1,winSize:'medium',winId:wid+'_'});
		}
		return wrap;
	},
	get:function(P,pare){
		var wList=(pare)?pare:P.wList;
		var vPost=(P.gP)?P.gP:'tt='+P.tt+'&tr='+P.tr;
		if(wList.classList.contains(Attach.wid+'opened')){ return false; }
		$Api.get({f:Api.Attach.pr+'a', inputs:vPost, loade:wList,
		func:function(Jq){
			wList.classList.add(Attach.wid+'opened');
			if(Jq.errNo){ $Api.resp(wList,Jq); }
			else{
				for(var c in Jq.L){ Attach.drawL(Jq.L[c],wList); }
			}
		}
		});
	},
	drawL:function(J,wList,P2){
		P2=(P2)?P2:{};
		var wrap = $1.t('div',{'class':'_oFile_'+J.fileId+' psUpdList_Item',style:'position:relative;'},wList);
		var fileName = $1.t('a',{'href':J.purl,'target':'_BLANK','class':'iName'},wrap);
		$1.t('span',{'class':'iBg iBg_ico'+J.fileType},fileName);
		$1.t('span',{textNode:J.fileName},fileName);
		$1.t('span',{textNode:'\u0020\u0020'},wrap);
		$1.T.btnFa({faBtn:'fa-eye',title:'Visualizar',P:J,func:function(T){
			Attach.view(T.P,null,{});
		}},wrap);
		$1.t('span',{textNode:'\u0020\u0020'},wrap);
		if(J.userId==$0s.userId){ btnDel = Attach.delete(J,null,'btn'); wrap.appendChild(btnDel) }
		var docInf= $1.t('div',{'class':'docInfo'},wrap);
		$1.t('span',{'class':'fa fa-user',textNode:_g(J.userId,$Tb.ousr)},docInf);
		$1.t('span',{'class':'fa fa-calendar',textNode:J.dateC},docInf);
		$1.t('span',{'class':'fa fa-hdd-o',textNode:J.fileSizeText},docInf);
		return wrap;
	},
	form:function(P,pare){
		if((P.tt && !P.tr) || (!P.tt && P.tr)){ 
			$Api.resp(pare,{errNo:3,text:((P.err3)?P.err3:'No se puede iniciar la carga de archivos. La relación no es posible: tt|tr is null')});
		}
		else{
			P.save='Y'; P.fDraw='Y';
			if(P.getList!='N'){ P.getList='Y'; }
			Attach.btnUp(P,pare);
		}
	},
	btnWin:function(P,pare){
		return Attach.openWin(P,pare,true);
	},
	openWin:function(P,pare,btn){
		function iope(P){
			P.winTitle=(P.title)?'Archivos Relacionados: '+P.title:'Archivos Relacionados: '+P.tt+'-'+P.tr;
			P.save='Y'; P.fDraw='Y';
			P.getList='Y';
			Attach.btnUp(P);
		}
		//agregar o abrir
		if(btn){ return $1.T.btnFa({fa:'fa-paperclip',style:'color:orange',func:function(){ iope(P); } },pare); }
		else if(pare){ $1.T.btnFa({fa:'fa-paperclip',style:'color:orange',func:function(){ iope(P); } },pare);  }
		else{ iope(P); }
	},
	putName:function(pare,func){
		var P=(P)?P:{}; //fileId,fileName
		$Api.send({PUT:Api.Attach.pr+'a/fileName',jsBody:pare,winErr:1,func:function(R){
			if(func){ func(R); }
			$1.delet(pare);
		}},pare);
	},
	view:function(P,pare,P2){
		P=(P)?P:{};
		P2=(P2)?P2:{};
		if(P.display && pare){ pare.style.display='block'; pare.innerHTML=''; }
		var wrap=$1.t('div',0,pare);
		tT={tt:'aFile',tr:P.fileId};
		var vPost='fileId='+P.fileId;
		$Api.get({f:Api.Attach.pr+'a/view',loade:wrap, inputs:vPost, func:function(Jr){
			if(P.display && pare){
				$1.T.btnFa({fa:'fa fa_close',title:'Cerrar',style:'position:absolute; right:0; top:0;', func:function(){ pare.style.display='none'; }},pare);
			}
			if(Jr.errNo){ $Api.resp(wrap,Jr); return false; }
			var topInfo=$1.t('div',0,wrap);
			var h3=$1.t('h3',0,topInfo);
			var spa=$1.t('span',{textNode:Jr.fileName},h3);
			$1.T.btnFa({fa:'fa-pencil',title:'Editar nombre',P:Jr,func:function(T){
				h3.style.display='none';
				var wEd=$1.t('div',0,topInfo);
				var inp=$1.t('input',{type:'text',name:'fileName',value:spa.innerText,'class':$Api.JS.cls,AJs:{fileId:T.P.fileId},},wEd);
				Attach.putName(wEd,function(){
					spa.innerText=inp.value; $1.delet(wEd); h3.style.display='';
				});
			}}
			,h3);
			var wrapMenu = $1.t('div',0,wrap);
			var Pm={w:{style:'margin-top:0.5rem;'},Li:[
			{textNode:'','class':'fa fa_info active',winClass:'winInfo' },
			{textNode:'','class':'fa fa_comment',winClass:'win5c', func:function(){ $5c.openOne(tT); } }
			]};
			var menu = $1.Menu.inLine(Pm,wrap);
			wrapMenu.appendChild(menu);
			var _inf=$1.t('div',{'class':'winMenuInLine winInfo'},wrapMenu);
			var _5c=$1.t('div',{'class':'winMenuInLine win5c',style:'display:none;'},wrapMenu);
			$5c.formLine(tT,_5c);
			var enlace=$1.t('div',0);
			$1.t('span',{'class':'fa fa-clipboard',title:'Copiar Enlace'},enlace).onclick=function(){ $js.copy(aa,'href'); }
			$1.t('input',{type:'text',readonly:'readonly',value:Jr.purl,style:'width:88%;'},enlace);
			aa=$1.t('a',{'class':'fa fa-paperclip',title:'Descargar Archivo',href:Jr.purl},enlace);
			var descrip=$1.t('div',{'class':'textarea',textNode:((Jr.descrip)?Jr.descrip:'')});
			$1.T.tbf([
			{line:1,wxn:'tbf_x4',t:'Tamaño',v:Jr.fileSizeText},
			{wxn:'tbf_x4',t:'Creada por',v:_g(Jr.userId,$Tb.ousr)},
			{wxn:'tbf_x2',t:'Creado',v:Jr.dateC},
			{line:1,wxn:'tbf_x1',t:'Enlace',node:enlace},
			{line:1,wxn:'tbf_x1',t:'Descripción',node:descrip},
			],_inf);
			if(P2.btnDelete!='N' && Jr.canDelete=='Y'){
				$1.T.btnFa({faBtn:'fa-trash',textNode:'Eliminar Archivo*',P:Jr,func:function(T){ Attach.delete(T.P); }},_inf);
			}
			Attach.preview(Jr,_inf);
		}});
		if(!pare){ $1.Win.open(wrap,{winSize:'medium',winTitle:'Visualización de Archivo'}); }
	},
	preview:function(L,pare){
		var ret=false;
		var div=$1.t('div',{style:'border:0.0625rem solid #EEE; padding:0.25rem; border-radius:0.25rem; margin-top:1rem;'});
		$1.t('h5',{textNode:'Vista Previa'},div);
		if(L.svr!='FB'){ L.purl +='&embed=Y'; }
		var gview='https://docs.google.com/gview?url=';
		if(L.fileType=='img'){ $1.t('img',{src:L.purl,alt:'Imagen',title:L.fileName},div); ret=true; }
		else if(L.fileType=='pdf'){ $1.t('embed',{src:L.purl,frameborder:0,style:'width:100%; height:100%;'},div); ret=true; }
		else if((''+L.fileType).match(/^(txt|csv|tsv)$/)){
			$1.t('embed',{src:L.purl,frameborder:0,style:'width:100%; height:100%;'},div); ret=true; 
		}
		if(ret && pare){ pare.appendChild(div); return div; }
	},
	post:function(JsL,P,P2){//saveJs
		P2=(P2)?P2:{};
		var jsAdd={tt:P.tt,tr:P.tr};
		jsAdd.L=JsL;
		$Api.post({f:Api.Attach.pr+'a',jsAdd:jsAdd,func:function(Jr,o){
			if(P2.cont){ $Api.resp(P2.cont,Jr); }
			if(P.func){ P.func(o,P); }
		}});
	},
	delete:function(P,objDel,btn){
		//req svr, purl
		if(btn){/* obtener boton */ 
			return $1.T.btnFa({faBtn:'fa-trash',title:'Eliminar Archivo (3)',func:function(T){
				Attach.delete(P,T.parentNode);
			}});
		}
		JStor.delete(P,function(){
			$Api.delete({f:Api.Attach.pr+'a',winErr:'Y',inputs:'fileId='+P.fileId, func:function(J2){ 
				if(!J2.errNo && objDel && objDel.tagName){ $1.delet(objDel);}
				if(P.func){ P.func(P); }
			}
			});
		});
	},

}