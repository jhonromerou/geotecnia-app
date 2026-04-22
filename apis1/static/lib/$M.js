
let ADMS_CACHE = {
	/**
	 * @type {{_key_: [{k:string, value: string}]}}
	 */
	TB: {}
}

var $M = {
waiting:300,
uriFunc:false, /*funcion a ejecutar si cambia parte #xxx!! */
back:null, next:null,
p:{},// !!{id:texto}
q:{},
k:'',//Tick.open, k del li abierto para actualizar o no
wrap:false,//top wrap
liA:{},uA:{},
s:{},//estructura
/* new 04-2018*/
pars:function(Ps,D){ //[]
	var pars=''; var D=(D)?D:{};
	for(var i in Ps){
		pars += Ps[i]+':'+D[Ps[i]]+',';
	}
	pars=pars.replace(/\,+$/,'');
	return pars;
},
docEntry:function(href,docEntry,r,P){
	P=(P)?P:{};
	P.docEntry=docEntry;
	return $M.to(href,P,r);
},
sett:function(href,Pars,func){//ir a
	if(typeof(Pars)=='object'){
		pars='{';
		for(var i in Pars){ pars += i+':'+Pars[i]+','; }
		pars +='}';
	}
	else{ pars=Pars; }
	hash = '#'+href+'!!'+pars;
	location.hash = hash;
	if(func){ setTimeout(func,$M.waiting+50); }//300 espera hash
},
to:function(href,Pars,r,fCall){//ir a
	if(typeof(Pars)=='object'){
		pars='';
		for(var i in Pars){ pars += i+':'+Pars[i]+','; }
	}
	else{ pars=Pars; }
	pars = (pars)?'{'+pars+'}':'';
	hash = '#'+href+'!!'+pars;
	if(fCall){
		var actua=$M.read('!!')
		if(actua==hash){ return fCall(); }
	}
	hash = '#'+href+'!!'+pars;
	if(r){ return hash; }
	else{ location.hash = hash; }
},
/* end new 04-2018*/
getK:function(){
	var h = (location.hash).replace(/^\#/,'');
	var hk = h.match(/^(.*)\!\!(.*)?/);
	var k = (hk&&hk[1])?hk[1]:false;
	var k2 = (hk&&hk[2])?hk[2]:false;
	return {k:k,k2:k2}
},
reload:'Y',//configurar en hash2 para evitar recarga
onload:function(){
	var lastk = '';
	var newh = '';
	var oldh = (location.hash).replace
	var uriOld=uriNew=$M.read('!');
	function ch(){
		$M.tmpFiles.clear();
		var K = $M.getK(); k= K.k; k2 =K.k2;
		lastk = k;
		var LI = $M.li[k];
		if(!LI){ return false; }
		if(k){
			if($M.U.s){//Evitar cerrar form
				if(newh!=oldh){
					if(confirm('La información se perderá, ¿Está seguro?')){
						$M.U.e();
						location.hash = newh;
						ch();
					}
					return true;
				}
			}
			$1.delet($1.q('#__wrapTitleAll'));
			var div=$1.t('div',{id:'__wrapTitleAll'});
			if(LI.tmpFiles){
				for(var i in LI.tmpFiles){ $M.tmpFiles.add($1.headTags(LI.tmpFiles[i])); }
			}
			if(LI.ini){ LI.func=function(){ $M.Ht.ini(LI.ini, LI); } }
			if(!LI.kau){ LI.kau=k; }
			if(LI.mdlAut=='N'){
				$1.clear($M.wrap);
				$1.t('h3',{id:'__wrapTitle','class':'fa fa-lock fc-danger',textNode:'Acceso no Autorizado'},$M.wrap);
				var err=$1.t('p',{'class':'input_error',style:'fontSize:16px'},$M.wrap)
				err.innerHTML='No tiene permisos para acceder a esta página.<br/>La caracteristica del módulo no está habilitada.<br/>';
				$1.t('img',{src:'https://img.freepik.com/vector-gratis/ilustracion-concepto-datos-seguros_114360-483.jpg?size=338&ext=jpg&ga=GA1.2.1462327182.1608492209',alt:'Imagen prohibido',style:'maxWidth:200px'},err);
				err.innerHTML +='<br/>requireModule('+LI.mdlActive+')';
			}
			else if(!$M.perms(LI.kau)){
				$1.clear($M.wrap);
				$1.t('h3',{id:'__wrapTitle',textNode:LI.t,'class':'fa fa-lock fc-danger'},$M.wrap);
				perr=($M.LikauAssg[LI.kau])?$M.LikauAssg[LI.kau].t:LI.kau;
				var err=$1.t('p',{'class':'input_error'},$M.wrap)
				err.innerHTML='Su usuario no tiene permisos para acceder a esta página.';
				err.innerHTML +='<br/>Solicite al administrador del sistema que le habilite el permiso: <u>'+perr+'</u><br/>';
				$1.t('img',{src:'https://img.freepik.com/vector-gratis/ilustracion-concepto-datos-seguros_114360-483.jpg?size=338&ext=jpg&ga=GA1.2.1462327182.1608492209',alt:'Imagen prohibido',style:'maxWidth:200px'},err);
				err.innerHTML += '<br/>requirePerm('+LI.kau+')';
			}
			else if(LI.func){
				document.title = (LI.t)?LI.t:$0s.Soc.socName;
				if(!LI.noTitle){
					$M.wrap.insertBefore(div,$M.wrap.firstChild);
					$1.t('h3',{id:'__wrapTitle','class':'fc-blue',textNode:LI.t},div);
					if(LI.descrip){ Li.d=LI.descrip; }
					if(LI.d){
						$1.t('p',{textNode:LI.d,style:'font-size:0.9rem;'},div);
					}
				}
				LI.func();
			}
		}
		oldh = (location.hash).replace(/^\#/,'');
	}
	ch();
	interv=false;
	window.onhashchange=function(Px){
		clearTimeout(interv);
		if(Px.oldURL!=Px.newURL){
			var newURL=new URL(Px.newURL);
			interv = setTimeout(function(){
			newh = (newURL.hash).replace(/^\#/,'');
			var K = $M.getK(); nk= K.k;
			var uriNew=$M.read('!');
			/* en $M.li,[r=func] */
			$M.read();
			if(oldh!=newh && uriOld!=uriNew){  }
			if($M.reloading && oldh!=newh){
				$M.reloading();
				oldh = newh;
				uriOld=uriNew;
			}
			else if(oldh!=newh && uriOld!=uriNew){
				if($M.reload=='N'){ $M.reload = 'Y'; }//en hash2 if(func) pasa =N
				else{ ch(); }
				oldh = newh;
				uriOld=uriNew;
			}
			else if(uriOld==uriNew && $M.uriFunc){
				$M.uriFunc();
				$0s.console.put('#($M.reload='+$M.reload+') uriFunc() ');
			}
			$M.uriFunc=false;
		},$M.waiting);
	}
	}
}
,
go:function(href,Pd){Pd=(Pd)?Pd:{};
	var oh = location.hash;
	if(href.isBlank){ 
		if(oh=='' || oh=='#no.index!!'){ location.hash = '#'+href.isBlank+'!!'; }
	}
	else if(href.ini){
		if(oh=='' || oh=='#'){ location.hash = '#'+href.ini+'!!'; }
	}
	else{
		location.hash = '#'+href+'!!';
		if(Pd.noClear){}
		else if(oh!=location.hash){
			$M.Ht.ini({});
		}
	}
}
,
hash:function(href,P){P=(P)?P:{};
	pars = (P.p)?'{'+P.p+'}':'';
	return '#'+href+'!!'+pars;
},
hash2:function(P){
	var url = location.hash; url=(url)?url:'';
	var ini = url.replace(/(\!\!).*/,'');
	var pars = '';
	$M.read(); func = P.func; delete(P.func);
	for(var p in P){
		if(!$M.p[p]){ $M.p[p] = P[p]; }
	}
	for(var p in $M.p){
		if(P[p]){ $M.p[p] = P[p]; }
		pars += p+':'+$M.p[p]+',';
	}
	pars = (pars!='')?'{'+(pars.substr(0,pars.length-1))+'}':'';
	$M.reload = 'N';
	location.hash = ini+'!!'+pars;
	if(func){ func(); }
}
}

/**
 * @typedef {Object} MenuItem
 * @property {string} url - string key url hash
 * @property {AccessGroupItem} ac - key de access group
 * @property {string} t - title to item
 * @property {LiMenuItem=} MKEY
 */
/**
 * @typedef {Object} LiMenuItem
 * @property {string} id - unique index to data
 * @property {string} t - short description
 * @property {AccessGroupItem} ac
 */

/**
 * @typedef {Object} AccessGroupItem
 * @property {string} id
 * @property {string} t
 */

/**
 * @type {LiMenuItem[]}
 * url definition item
 */
const MKEY = []

const CNF = {
	AG_MODE_R: 'R',
	AG_MODE_W: 'W',
	AG_MODE_RW: 'RW',
	/**
	 * @type {{id: string, t: string, ac: AG}}
	 */
	URL: {},
	/**
	 * @type {{id: string, t: string, mode: string}}
	 */
	AG: {},
	SERIE: {},
	MDL: {}
}

/**
 * @type {AccessGroupItem[]}
 */
const AC_KEY = []

$M['endpoint'] = {};
/**
 * @param {{url: string, name: string}} cnf
 */
$M.addEndpoint = (cnf) => {
	$M['endpoint'] = {url: cnf.url, name: cnf.name}
}

$M.li={};//listado de opciones del menu
$M._nli=0;
$M.kLiTable={}; //gfp={} datos para dibujar menu
$M.kKauTable={}; //gfp={} datos de permisos
$M.liRep=[]; // [li] con solo reportes que tenga definido repM[gvtSell,gvtSin]
$M.repM=[];
$M.repMS={}; //guardar n
$M.liRep=function(kMdl,Lis,P2){
	if(!P2){ P2={}; }
	if(!P2.prp){ P2.prp={}; }
	if(!P2.prp.type){ P2.prp.type='R'; }
	$M.liAdd(kMdl,Lis,P2);
}
$V.MTypes=[{k:'F',v:'Formulario'},{k:'V',v:'Vista'},{k:'JSV',v:'Personalizacion'},{k:'TB',v:'Definicion'},{k:'R',v:'Reportes'},{k:'L',v:'Listado'},{k:'C',v:'Configuración'},
{k:'I',v:'Interfaces'}
];
$V.MrepM={};


/**
 * @param {array<MenuItem>} urls
 * @param {{module: string}} cnf
 */
$M.registerUrls = ( cnf, urls) => {
	$M.liAdd(cnf.module, urls, {mdlActive: cnf.module.id})
}

/**
 * @param kMdl
 * @param {MenuItem[]} Lis
 * @param P2
 */
$M.liAdd=function(kMdl,Lis,P2){
	P2=(P2)?P2:{};
	for(var i in Lis){
		var TL=Lis[i];
		if (TL.MKEY) {
			TL.k = TL.MKEY.id
			TL.kau = TL.MKEY.ac.id
			TL.t = TL.MKEY.t
			if (TL.MKEY.drawFilter) {
				TL.drawFilter = TL.MKEY.drawFilter
			}
		}
		if (TL.url) {
			TL.k = TL.url
			TL.kau = TL.ac
		}
		if (TL['hidden_title']) {
			TL.noTitle = 'Y'
			TL['t'] = TL['hidden_title']
		}
		var k=TL.k;
		if(TL._lineText){
			if(TL._lineText=='_TB'){ TL._lineText='Definicion'; }
			else if(TL._lineText=='_REP'){ TL._lineText='Reportes'; }
			else if(TL._lineText=='_JSV'){ TL._lineText='Personalizacion'; }
			else if(TL._lineText=='_ITF'){ TL._lineText='Interfaces'; }
			else if(TL._lineText=='_REP'){ TL._lineText='Reportes'; }
			else if(TL._lineText=='_SYSD'){ TL._lineText='Sistema'; }
			k='___a'+$M._nli;
		}
		$M.li[k]=TL;
		$M.li[k]._nli=$M._nli;
		//generar kau dinamico del permiso
		if(TL.kauAssg){ TL.kau=TL.kauAssg;
			$M.kauAssg(kMdl,[{k:TL.kau,t:'Reporte: '+TL.t,_dynamic:'Y'}]);
		}
		if(kMdl){ $M.li[k].kMdl=kMdl; }
		if(P2.prp){//add properties likes kMdl, mdlActive
			for(var k2 in P2.prp){ 
				if(!$M.li[k][k2]){ $M.li[k][k2]=P2.prp[k2]; }
			}
		}
		//modulo activo o no
		mdlActive=(TL.mdlActive && !$Mdl.status(TL.mdlActive));
		if(mdlActive){ $M.li[k].mdlAut='N'; }
		else{ $M.li[k].mdlAut='Y'; }
		$M._nli++;
		if(TL._lineText){ continue; }
		if(!TL.type && k){
			if(k.match(/^tb\./)){ TL.type='C'; }
			else if(k.match(/^cnf\./)){ TL.type='C'; }
			else if(k.match(/^jsv\./)){ TL.type='C'; }
			else if(k.match(/\.form/)){ TL.type='F'; }
			else if(k.match(/\.view/)){ TL.type='V'; }
			else if(k.match(/^(itfST|itfDT)\./)){ TL.type='I'; }
			else{ TL.type='L'; }
		}
		//Reportes
		if(P2.repM && !mdlActive){ //$M.liRep.push(TL);
			var lastItem=false;
			for(var i2 in P2.repM){ var L2=P2.repM[i2];
				lastItem=(L2.k)?L2.k:L2; 
				if(typeof(L2)=='string'){ L2={}; }
				if(!$M.repMS[lastItem]){
					tC=$V.Mdls[lastItem];
					L2.folId=lastItem;
					if(tC && tC.t){ L2.folName=tC.t; L2.ico=tC.ico; }
					$M.repM.push(L2);
					$M.repMS[lastItem]=$M.repM.length-1;
				}
			}
			var kAct=$M.repMS[lastItem];
			if(!$M.repM[kAct]){ $M.repM[kAct]={fatherId:lastItem,MLis:[]};}
			if(!$M.repM[kAct].MLis){ $M.repM[kAct].MLis=[]; }
			$M.repM[kAct].MLis.push(k);
		}
	}
}
$M.liAdd2=function(Lis){
	//{k:gvtSor, K:[{k:get}, {k:form}]
	for(var i in Lis){ var Lx=Lis[i];
		var tk=Lx.k;
		for(var i2 in Lx.K){ var L=Lx.K[i2];
			var k=(L.k=='get')?'':'.'+L.k;
			k=tk+k;//gvtSor.form
			L._nli=$M._nli;
			L.func=function(){ $M.Ht.ini(this.i); }
			$M.li[k]=L;
			$M._nli++;
		}
	}
}

$M.T={//Pasar datos a func
D:null,
d:function(D,Def){
	if(D){ $M.T.D=D; }
	else{
		Def=($M.T.D)?$M.T.D:Def;
		$M.T.D=null;
		return Def;
	}
}
};
$M._Ch=false;
$M.Cch=function(D,Def){/* temporales */
	var r=false;
	if(D){ $M._Ch=D; }
	else{ r=$M._Ch;
		$M._Ch=false;
		if(Def && !r){ r=Def; }
	}
	return r;
}

$M.add=function(A){
	for(var i in A){ var P=A[i];
		if(P.liA){
			var o =(typeof(P.liA)=='object')?P.liA:$M.liA[P.liA];
			if(!$M.liA[P.liA]){ o=$M.liA[P.liA]={L:[]}; }
			var nl=false;
			if(P.after){
				for(var i in o.L){
					var tk=o.L[i];
					if(tk.kdata && tk.kdata==P.after){ nl=i+1; break; }
				}
			}
			if(P.rootFolder){ o.t=P.rootFolder; }
			if(P.folder){
				if(nl!==false){ o.L[nl].push({t:P.folder,ico:P.ico,L:[]}); }
				else{ o.L.push({t:P.folder,ico:P.ico,L:[]}); }
			}
			if(P.L){
				var nl=(nl!=false)?nl:$js.length(o.L)-1; //k=wma
				if(nl<0 && !P.rootFolder){ nl=0; o.L[nl]={L:[]}; }
				for(var i2 in P.L){
					if(P.topFolder=='Y'){ o.L.push(P.L[i2]); }
					else if(P.rootFolder){ o.L.push(P.L[i2]); }
					else if(!o.L[nl]){ alert('Error append on liA: L not define ('+nl+')'); continue; }
					else{ o.L[nl].L.push(P.L[i2]); }
				}
			}
		}//onliA
		else if(P.s){
			var isO=(typeof(P.s)=='object');
			var o =(isO)?P.s:$M.s[P.s];
			/*Crear si no existe base */
			if(!isO && !$M.s[P.s]){ o=$M.s[P.s]={L:[]}; }
			if(P.kidFol){ /*buscar en todos hasta hallar k */
				for(var x in o.L){
					if(o.L[x].kid == P.kidFol){ o=o.L[x]; break; }
				}
			}
			if(!o.L){ o.L=[]; }
			if(P.rootFolder){ o.t=P.rootFolder; }
			if(P.folder){
				var aL={t:P.folder,L:[]};
				if(P.ico){ aL.ico=P.ico; }
				o.L.push(aL);
			}
			else if(P.ico){ o.ico=P.ico; }
			if(P.L){
				var nl=$js.length(o.L)-1; //k=wma
				if(nl<0){ nl=0; }
				for(var i2 in P.L){
					if(P.topFolder=='Y'){ o.L.push(P.L[i2]); }
					else if(P.rootFolder){ o.L.push(P.L[i2]); }
					else{ o.L[nl].L.push(P.L[i2]); }
				}
			}
		}//onliA
	}
}
$M.uK={}; //extends soc define hashKeys


// version 2023.1

$M.render = (func) => {
	$M.Ht.ini({g: func})
}

$M.Ht = {
head:'',body:'', bodyAjax:'',
filt:'', cont:'-', title:'-',
ini:function(P, Li){
	$M.read();
	if(P.func_cont){ P.g=P.func_cont; }
	if(P.func_pageAndCont){ P.gyp=P.func_pageAndCont; }
	if(P.func_pager){ P.p=P.func_pager; }
	if(P.func_filt){ P.f=P.func_filt; }
	if(P.gyp){ P.g=P.gyp; P.p=P.gyp; }
	$M.reloading=P.r; //si=Y, siempre hace el proceso
	function ini2(){
	var f = '__wrapFiltForm';
	var c = '__wrapList';
	$load.close();
	var cont = $M.wrap;
	var wrapTitleAll=$1.q('#__wrapTitleAll');
	var clon=(wrapTitleAll)? wrapTitleAll.cloneNode(true):false;
	if(P.clear!='N'){ $1.clear(cont); }
	if(clon){ cont.appendChild(clon); }
	/* new style */
	var divTop=$1.t('div',{'class':'MbtnsTop'},cont);
	var filtfWrap = $1.t('div',{id:f,'class':'pAbsolute--'});
	$M.Ht.filt = filtfWrap;
	$M.Ht.cont=$1.t('div',{id:c},cont);
	filtfWrap.classList.add('noDisplay');
	let hasDrawFilter = Li && Li.drawFilter
	if(P.f || hasDrawFilter){
		var btn=$1.t('button',{title:'Actualizar','class':'fa fa-refresh btnB btn-drop'},divTop);
		var btnFilt=$1.t('button',{textNode:'Filtros','class':'fa fa-filter btnB btn-drop toggle-dropdown'},divTop);
		btnFilt.onclick=function(){
		$M.Ht.filt.classList.toggle('noDisplay');
		this.classList.toggle('toggle-dropdown');
		this.classList.toggle('toggle-dropright');
		this.classList.toggle('btn-actived');
		};
		if(P.fOpen){ $M.Ht.filt.classList.remove('noDisplay'); }
		if(hasDrawFilter) {
			if (Li.filter_generate === undefined) {
				Li.filter_generate = Li.drawFilter({wrapper: $M.Ht.filt});
			} else {
				$M.Ht.filt.classList.remove('noDisplay')
			}
			$M.Ht.filt.appendChild(Li.filter_generate)
		}
		else if(_Fi && _Fi[P.f]){ _Fi[P.f]($M.Ht.filt,P.func_filtCall); }
		else if(typeof(P.f) == 'string'){ $Api.resp($M.Ht.filt,{errNo:3,text:'No se han podido iniciar los filtros. {'+P.f+'} no definido.'}); }
		else { P.f($M.Ht.filt); }
		var btnUpd=$1.q('button.ui_button',$M.Ht.filt);
		if(btnUpd){ 
			btnUpd.classList.add('__btnAjaxFilter'); btnUpd.innerText='Buscar...';
			btn.onclick=function(){  btnUpd.click(); }
		}
	}
	if(typeof(P.btnNew)=='string'){ P.btnGo=P.btnNew; P.btnNew=null; }
	if(P.btnGo){
		$1.t('button',{textNode:'Nuevo','class':'btnB btn-drop fa fa_plusCircle'},divTop).onclick=function(){ $M.to(P.btnGo); }
	}
	if(P.fNew){
		$1.t('button',{textNode:'Nuevo','class':'btnB btn-drop fa fa_plusCircle'},divTop).onclick=function(){ P.fNew(); }
	}
	if(P.f && !P.g){//Mostrar filtros si no tiene funcion
		btnFilt.click();
		$M.Ht.filt.classList.toggle('pAbsolute--');
	}
	var divWins=$1.t('div',0,divTop);

	if(P.topCont){ var topCont = $1.t('div',{'class':'__wrapTopContent',style:'margin:0.25rem 0;'},cont);
		topCont.appendChild(P.topCont);
	}
	//Filters  o fieldset +filter
	if(0 && P.f && P.fieldset!='N'){
		if(P.fieldset=='Y-none'){ P.fieldDisplay='none'; }
		if(typeof(P.fieldset)=='string' && P.fieldset!='Y' && P.fieldset!='Y-none'){ P.f=P.fieldset; }
		var filtf = $1.T.fieldset(filtfWrap,{display:P.fieldDisplay, L:{'class':'fa fa-filter',textNode:'Filtros de Busqueda'}});
		divWins.appendChild(filtf);
	}
	else{ divWins.appendChild(filtfWrap); }
	$M.Ht.title = $1.q('#__wrapTitle');
	/* Añadir botones en top filt */
	if(P.fiBtns){ for(var i in P.fiBtns){
		$1.T.btnFa(P.fiBtns[i],$M.Ht.filt);
	}}
	if(P.btnNew){ cont.appendChild(P.btnNew); }
	if(P.bNew){ $1.T.btnFa(P.bNew,cont); }
	if(P.mediumCont){ cont.appendChild(P.mediumCont); }
	if(P.g){ P.g($M.Ht.cont); }
	if(P.p){ $1.Pager.form(cont,{func:P.p}); }
	}//ini2
	if(P.jsLib){ $load.open(); $js.load(P.jsLib,ini2); }
	else{ ini2(); }
},
a:function(P){
	p = {textNode:P.textNode};
	switch(P.objType){
		case 'bussPartner': p = {href:'#bussPartnerProfile!!'+P.objRef, title:P.textNode, textNode:$js.textLimit(P.textNode,20) }; break;
	}
	var a = $1.t('a',p);
	return a;
}

}

$M.Put={
i1:false, c1:0,
title:function(t){
	clearInterval($M.Put.i1);
	if($M.Put.c1==5){ return false; }
	if($M.Ht.title && $M.Ht.title.tagName){
		$M.Ht.title=t;
	}else{ $M.Put.i1=setInterval(function(){ $M.Put.title(t); },500); $M.Put.c1++; }
}
}

$M.U={
s:false,
i:function(){ $M.U.s=true; },
e:function(){ $M.U.s=false; }
}
window.onbeforeunload = function(){
	if($M.U.s){ return 'La información no ha sido guardada, ¿desea realmente salir?'; }
}

$M.ttK = {};//templates de hash, {a:'items', p:{tt:docNum}}
$M.ttHash=function(P,u){
	var a='#nulle';
	var E=$M.ttK[P.tt];
	if(E){ delete(P.tt);pars='';
		len = $js.length(P);
		var n=0;
		for(var i in P){
			if(E.p[i]){ pars += E.p[i]+':'+P[i]; n++; }
			if(n<len){ pars+=','; }
		}
		a = $M.to(E.a,pars,'r');
	}
	if(u){ location.href = a; }
	return a;
}

$M.f = {
delet:function(o){ o = ''+o;
	var o = o.split(',');
	for(var k1 in o){ k = o[k1];
		if($M.li[k]){
			delete($M.li[k]);
		}
	}
}
}

$M.s = {};  $M.li = {};
$M.F = {};//Filters para invocate

$M.noAllowKeys = function(keys){
	var e = (keys).split(',');
	for(var i in e){ delete($M.li[e[i]]); }
}

$M.href = function(P){
	var href = '#'+P.href+'!!';
	if(P['!!']){ href +=P['!!']; }
	if(P.r){ return href; }
	var o = {href:href ,textNode:P.textNode,P:P.P};
	if(P['class']){ o['class'] = P['class']; }
	var a = $1.t('a',o);
	if(P.func){ a.onclick = function(){ P.func(this); } }
	return a;
}
$M.hrefTo=function(Hx,P,P2){ P2=(P2)?P2:{};
	var r='';
	if(Hx){//como tag a
		var pars='';
		for(var z1 in Hx){ var tk1=Hx[z1];
			if(z1==0){ continue; }
			if(P && P[tk1]){ pars += tk1+':'+P[tk1]+','; }
		}
		if(P2=='to'){ return $M.to(Hx[0],pars); }
		else{ return $M.to(Hx[0],pars,'r'); }
	}
	return r;
}
$M.h=''; //in itm.bc!!{itemId:1} is itm.bc
$M.Pa={};/**/
$M.uriD={};
$M.uriGet= function(t){
	var url = document.location;
	var rs={l:null,p:{},path:'',vGet:''};
	var v=(url.hash).replace(/\#/,'');
	if(url.hash){
		sep=v.split('!!');
		rs.path=sep[0];
		var sepX=sep[0].split('.'); //JDrive.i.[cardE]=l
		var l=0;
		for(var i=0; i<sepX.length; i++){
			rs[i]=sepX[i]; l=i;
		}
		rs['l']=rs[l];
		if(sep[1]){
			var ks = (sep[1].replace(/\{(.*)\}/,'$1')).split(',');
			for(var i=0; i<ks.length; i++){
				var s = (ks[i]).split(':');
				if(s[1]=='' || s[1]=='undefined' || s[1]=='null'){ continue; }
				rs.p[s[0]]=s[1];
				rs.vGet += [s[0]]+'='+s[1]+'&';
			}
		}
	}
	rs.vGet=rs.vGet.substr(0,rs.vGet.length-1);
	$M.uriD=rs;
	if(t=='!'){ return rs.p; }
	if(t=='!!'){ return url.hash; }
	return rs;
}
$M.uriSet=function(Pk,func){
	$M.uriGet();
	var PkDel=(Pk._del)?Pk._del:null;
	delete(Pk._del);
	$M.uriD.vGet='';
	var R=[$M.uriD.path,'']; //JDrive.i.cardE
	var Pks={};
	for(var k in $M.uriD.p){ Pks[k]=$M.uriD.p[k]; }
	if(Pk){ for(var k in Pk){ Pks[k]=Pk[k]; } }
	//si paso, quito estas
	if(PkDel){ for(var n in PkDel){ delete(Pks[n]) } }
	for(var k in Pks){
		var tv=Pks[k];
		if(tv=='' || tv==undefined || tv==null){ continue; }
		$M.uriD.vGet += k+'='+tv+'&';
		R[1] += k+':'+tv+',';
	}
	if(R[1]!=''){ 
		R[1]=R[1].substr(0,R[1].length-1);
		$M.uriD.vGet=$M.uriD.vGet.substr(0,$M.uriD.vGet.length-1);
	}
	$M.to(R[0],R[1]);
	if(func){ func(Pks); }
	return R;
}
$M.getUrl = function() {
	return $M.read('!');
}
$M.read= function(t){
	var url = document.location; $M.h='';
	$4.p = $4.q = '';  $M.p = $M.q = '';
	if(url.hash){
		if(t=='!'){ return (url.hash).replace(/\#(.*)\!\!.*/,'$1'); }
		else if(t=='!!'){ return url.hash; }
		$M.h=(url.hash).replace(/\#(.*)\!\!.*/,'$1')
		var v = (url.hash).replace(/.*(\!\!)/,'');
		v = v.match(/^\{(.*)\}/);
		var js = {};
		if(v && v[1]){ delete(v[0]);
			var ks = v[1].split(',');
			for(var i=0; i<ks.length; i++){
				var s = (ks[i]).split(':');
				if(s[1]==''){ continue; }
				js[s[0]] = s[1];
			}
		}
		$4.p = js;  $M.p = js;
	}
	$M.Pa=$M.p;
	if(t=='pars'){
		var v='';
		if(typeof $M.p == 'object'){
			for(var k in $M.p){ v +=k+'='+$M.p[k]+'&'; }
			v=v.replace(/\&$/,'');
		}
		return v;
	}
	return $M.p;
}

$M.sNuse='Y'; /* Usar nuevo $M.s */
$M.sN=[];
$M.liReset=function(perms){
	$M.sN=[];
	if(perms){ $M.liA={}; }
	console.log('$M is reseted && perms='+perms+'!!');
}
$M.sAdd=function(Li){
	/*[{fatherId:all,
	L:[{fatherId,folId,folName,ico}
	]
	}] */
	for(var i in Li){
		var fId=(Li[i].fatherId)?Li[i].fatherId:0;
		if(Li[i].mdlActive && !$Mdl.status(Li[i].mdlActive)){ continue; }
		if(Li[i].topFolder){ Li[i].L=[Li[i].topFolder]; }
		if(!Li[i].L && Li[i].MLis){
			Li[i].L=[{MLis:Li[i].MLis}];
		}
		for(var i2 in Li[i].L){
			if(Li[i].L[i2].mdlActive && !$Mdl.status(Li[i].L[i2].mdlActive)){ continue; }
			if(!Li[i].L[i2].fatherId){ Li[i].L[i2].fatherId =fId; }
			$M.sN.push(Li[i].L[i2]);
		}
	}
}
$M.liTable=function(allLi, grouper){
	let Li = []
	if (grouper) {
		Li = [] // consolidar en 1 solo
		for (var i in allLi) {
			Li.push(allLi[i]);
		}
	} else {
		Li = allLi
	}
	var tn=[]; var nx=0;
	for(var i in Li){var Lx=Li[i];
		if(Lx.kLiTable){
			if($M.kLiTable[Lx.kLiTable]){
				var cpy={}; for(var i2 in Lx){ cpy[i2]=Lx[i2]; } //folId,folName,ico, etc
				Lx=$M.kLiTable[Lx.kLiTable];
				for(var i2 in cpy){ Lx[i2]=cpy[i2]; }
			}
			else{ console.log('kLiTable: '+Lx.kLiTable+' not defined on $M'); continue; }
		}
		if(Lx.mdlActive && !$Mdl.status(Lx.mdlActive)){
			continue;
		}
		if(Lx.fatherId && !Lx.folId && Lx.MLis){
			tn.push({fatherId:Lx.fatherId,MLis:Lx.MLis});
			continue;
		}
		if(Lx.folId){
			var tD={folId:Lx.folId,folName:Lx.folName, ico:Lx.ico,folColor:Lx.folColor};
			tn.push({fatherId:Lx.fatherId,L:[tD]}); var tfa=Lx.folId;
		}
		else{ var tfa=Lx.fatherId; }
		var tA=[]; var tAa=false;
		if(Lx.MLis){
			tn.push({fatherId:tfa,MLis:Lx.MLis});
			//continue;
		}
		if(Lx.doc){ tA.push({doc:Lx.doc}); tAa=1; }
		if(Lx.mas){ tA.push({mas:Lx.mas}); tAa=1; }
		if(Lx.frm){ tA.push({frm:Lx.frm}); tAa=1; }
		if(Lx.rep){ tA.push({rep:Lx.rep}); tAa=1; }
		if(tA && !Lx._F){ Lx._F=tA; }
		if(Lx._F){
			var a21={fatherId:tfa,L:[]}; a22=[];
			for(var i2 in Lx._F){//subfolders, se añade tfa+folId,
				var L2=Lx._F[i2];
				if(L2.mdlActive && !$Mdl.status(L2.mdlActive)){ continue; }
				if(L2.doc){
					var t='Documentos';
					if(L2.doc.t){ t=L2.doc.t; L2.doc=L2.doc.l; }
					a21.L.push({folId:tfa+'doc',folName:t,ico:'fa fa-file-o'});
					a22.push({fatherId:tfa+'doc',MLis:L2.doc});
				}
				else if(L2.mas){
					a21.L.push({folId:tfa+'mas',folName:'Catalogos',ico:'fa fa-key'});
					a22.push({fatherId:tfa+'mas',MLis:L2.mas})
				}
				else if(L2.frm){
					a21.L.push({folId:tfa+'frm',folName:'Formularios',ico:'fa fa-paste'});
					a22.push({fatherId:tfa+'frm',MLis:L2.frm})
				}
				else if(L2.rep){
					a21.L.push({folId:tfa+'rep',folName:'Reportes',ico:'fa fa-bolt'});
					a22.push({fatherId:tfa+'rep',MLis:L2.rep})
				}
				else{
					L2.folId=tfa+L2.folId;
					var tfa2=L2.folId;
					if(L2.MLis){ a22.push({fatherId:tfa2,MLis:L2.MLis}); delete(L2.MLis); }
					a21.L.push(L2);
				}
			}
			tn.push(a21);
			for(var i3 in a22){ tn.push(a22[i3]); }
		}
	}
	$M.sAdd(tn);
}

$M.liEdit=function(A){
	for(var i in A){ k=A[i].k;
		if($M.li[k]){
			for(var i2 in A[i]){ $M.li[k][i2]=A[i][i2]; }
		}
	}
}
/* kauAssg para saber cuales existen */
$M.LikauAssg={};
$M.kauAssg=function(kp,A,onTb){
	if(!$M.LikauAssg){ $M.LikauAssg={}; }
	for(var i in A){
		A[i].fatherId=kp;
		$M.LikauAssg[A[i].k]=A[i];//k={k, t}
	}
}
$M.registerAG = (AGs) => {
	for(let i in AGs){
		let AG = AGs[i]
		$M.LikauAssg[AG.id] = {k: AG.id, t: AG.t, mode: AG.mode}
	}
}

$M.kauTable=function(A){
	for(var i in A){ var P=A[i];
		if(P.kKauTable && $M.kKauTable[P.kKauTable]){
			var cpy={}; for(var i2 in P){ cpy[i2]=P[i2]; } //folId,folName,ico, etc
			P=$M.kKauTable[P.kKauTable];
			for(var i2 in cpy){ P[i2]=cpy[i2]; }
		}
		var nl=0;
		if(!$M.liA[P.fatherId]){ o=$M.liA[P.fatherId]={}; }
		else{ var o =$M.liA[P.fatherId]; }
		var o2=o;
		if(!o.L){ o.L=[]; }
		if(P.rootFolder){ o.t=P.rootFolder; }
		if(P.folder){
			o.L.push({t:P.folder,ico:P.ico,L:[]});
			nl=$js.length(o.L)-1;
		}
		if(P.L){
			if(P.folder && !o.L[nl]){ o.L[nl]={L:[]}; }
			for(var i2 in P.L){ var tka=P.L[i2];
				if($M.LikauAssg[tka]){
					if(P.folder){
						o.L[nl].L.push($M.LikauAssg[tka]);
					}
					else{ o.L.push($M.LikauAssg[tka]); }
				}
			}
		}
		if(P.F){
			var adds=[];
			for(var i2 in P.F){
				P.F[i2].fatherId=P.fatherId; 
				adds.push(P.F[i2]); //folder,L[]
			}
			$M.kauTable(adds);
		}
	}
}

$M.iniYa=false;//evitar duplicar menu
// dibujar menu
$M.draw = function(wrapC,div){
	var btnTxt=($M.iniSet.menu=='L')?'':''; // menu - cerrar
	var btnOpen = $1.t('button',{'class':'fa faBtn fa_menu',textNode:btnTxt},wrapC);
	//btn menu left
	btnOpen.onclick = function(){
		var vd = div.style.display;
		if(vd=='' || vd=='none'){ div.style.display = 'block'; btnOpen.innerText=''; }
		else if(vd=='block'){ div.style.display = 'none'; btnOpen.innerText=' Menú'; }
		if($M.iniSet.menu=='L'){
			if(vd=='block'){
				$M.Ht.bodyAjax.classList.remove('wbo_contentWi');
			}
			else{
				$M.Ht.bodyAjax.classList.add('wbo_contentWi');
			}
		}
	}
	function onCl(k){//oncultar div o no
		if($M.iniSet.menu=='L'){ }
		else{ div.style.display = 'none'; }
	}
	//añadir reportes y cierre session
	$M.sAdd([
		{L:[
			{folId:'signOut',folName:'Cerrar Sesión',ico:'fa fa_close',func:function(){ localStorage.clear(); location.href = '/login?out=1' }},
		]}
	]);
	console.log('$M.draw');
	if($MdlK && typeof($MdlK['noLis'])){
		console.log('$M.draw->noLis !!');
		for(var i in $MdlK.noLis){ delete($M.li[$MdlK.noLis[i]]); }
	}
	if($M.sNuse=='Y'){
		for(var z in $M.sN){
			for(var z2 in $M.sN[z].MLis){
				var kli=$M.sN[z].MLis[z2];
				if (typeof kli == 'object') {
					kli = kli.url
					$M.sN[z].MLis[z2] = kli
				}

				var tK = $M.li[kli]; 
				kau=false;
				if(!tK){ continue; }
				if(tK._lineText){ continue; }
				//quitar si no autorizado
				if(tK.mdlAut=='N'){ delete($M.sN[z].MLis[z2]); }
				//permisos por usuario
				if($0s.useHashKey=='Y'){
					kau=(tK && tK.kau)?tK.kau:kau;
					if(kau=='sysd.user' || kau=='public'){ continue; }
					if($M.uA && !$M.uA[kau]){ 
					delete($M.sN[z].MLis[z2]); }
				}
			}
		}
		Uli.ini({folColor:'#000',openText:'Y', Li:$M.sN,liFunc:function(){ onCl(); }},div);
		Uli.clearBtn({});
		return false;
}

	//no usado ya
	var ul = $1.t('ul',0,div);
	/* Generar bar menu */
	function doLev(L,ulTop,_i){
		for(var i in L){
			var li = $1.t('li');
			var kIs = false; var inUl=false;
			if(L[i].k || !L[i].L){ inUl=true;
				var k = (L[i].k)?L[i].k : L[i]; kIs = k;//definido k directo
				var tK = $M.li[k]; kau=false;
				if(!tK){ continue; }
				kau=(tK && tK.kau)?tK.kau:k;
				//if(!tK || !tK.kau){ tK.kau=k; }
				if($0s.useHashKey=='Y' && !$M.uA[kau]){ continue; }
				if(tK.nm && tK.nm=='Y'){ continue; }//no menu.. sendForm
					var ico=(tK.ico)?tK.ico:'fa_arrowCircleR';
					var sty=(tK.sty)?tK.sty:'';
					var btn = $1.t('a',{href:$M.hash(k),id:'wid_'+k,'class':'_link',title:'k: '+k});
					$1.t('span',{'class':'fa '+ico,style:sty},btn);
					$1.t('span',{textNode:tK.t},btn);
				btn.k = k;
				btn.onclick = function(){ onCl(this.k);
				}
			}
			else if(i!='_i'){ inUl=true;//folder _i es top
				var ico=(L[i].ico)?L[i].ico:'fa_folderOpen';
				var sty=(L[i].sty)?L[i].sty:'';
				var btn = $1.t('button',{'class':'__mainBtnList'});
				$1.t('span',{'class':'fa '+ico,style:sty},btn);
				$1.t('span',{textNode:L[i].t,title:'$M.k: '+i},btn);
				btn.L = (L[i].L)? L[i].L : L[i];
				btn.onclick = function(){
					var ule = $1.q('ul',this.parentNode);
					if(ule){
						if(ule.style.display=='' || ule.style.display=='none'){ ule.style.display = 'block'; }
						else if(ule.style.display=='block'){ ule.style.display = 'none'; }
					}
					else{
						var ulC = $1.t('ul',{'class':'__ulMenu'});
						this.parentNode.appendChild(ulC);
						doLev(this.L,ulC);
					}
				}
			}
			if(inUl){
				ulTop.appendChild(li);
				li.appendChild(btn);
			}
		}
		/*st=setTimeout(function(){
		var ab=$1.q('.__mainBtnList',null,'all');
		for(var i=0; i<ab.length; i++){
			var ch=$1.q('_link',ab[i].parentNode,'all'); //btn ->li
			if(!ch || ch.length==0){ $1.delet(ab[i].parentNode); }
		}
		},1000); */
	}
	if($M.s['_i']){  doLev($M.s['_i'],ul,true); }
	doLev($M.s,ul);
} /* draw*/ 
$M.perms=function(kau){
	if(kau=='sysd.user' || kau=='public' || $0s.useHashKey == 'N') {
		return true;
	}
	if ($M.uA && $M.uA[kau]) {
		return true;
	}
	console.error("forbidden access to: " + kau)
	return true
}
$M.iniSet={
nty:'Y',
help:'N',
menu:'W',//W-in,L-eft
mliDel:[]//sysreports para eliminar
}
$M.liTag=function(L2,LT,pare,CH){
	var tg=$1.t('div',{'class':'cPointer'},pare);
	tg._href=$M.to(L2.k,'','r');
	if(!LT.textNode){ LT.textNode=L2.t; }
	if(LT.href!='N'){ LT.href=tg._href; } else {delete(LT.href); }
	if(CH && CH[0]){ for(var i in CH[0]){ tg.appendChild(CH[0][i]); }}
	var a=$1.t('a',LT,tg);
	a.href=$M.to(L2.k,'','r');
	if(LT.func){ a.onclick=function(){ return LT.func(this); } ; }
	a.classList.add('fa','fa_arrowCircleR');
	return tg;
}
$M.inid=function(){
	Api.Tpd={a:$y.apiURI+'/tpd/'+$0s.ocardcode+'/'};
	if($M.iniYa){ return false; }
	$M.iniYa=true;
	var whead=$1.q('#wbo_header');
	if(whead){ whead.innerHTML=''; }
	var menud=$1.t('div',{id:'__menuList'},whead);
	var liSea=$1.t('div',{'class':'mLisea',style:'display:inline-block; position:relative'},whead);
	tTypes_L=$1.t('span',{'class':'fa fa-list',title:'Listados',style:'color:blue'});
	tTypes_F=$1.t('span',{'class':'fa fa-file-o',title:'Formularios para crear/actualizar información',style:'color:red'});
	tTypes_R=$1.t('span',{'class':'fa fa-bolt',title:'Reportes',style:'color:green'});
	tTypes_C=$1.t('span',{'class':'fa fa fa-cog',title:'Configuraciones',style:'color:purple'});
	tTypes_I=$1.t('span',{'class':'fa fa fa-plug fc-blue',title:'Interfaces'});
	tTypes_C=$1.t('span',{'class':'fa fa fa-cog',title:'Configuraciones',style:'color:purple'});
	$1.t('span',{'class':'fa fa-search',title:'Buscar en menu'},liSea);
	var sea=$1.lTag({tag:'input',placeholder:'Buscar en menu...','class':'mLiSea_input'},liSea);
	$i.t('<h3>Busca rápida en el menu</h3><ul class="ulBase"><li><b>Por titulo</b>: cliente,factura</li><li>Por tipo y titulo.<ul class="ulBase"><li>'+tTypes_L.outerHTML+'<b>L:Listados</b>. L:cliente</li><li>'+tTypes_F.outerHTML+'<b>F</b>:Formularios. F:entrada</li><li>'+tTypes_R.outerHTML+'<b>R</b>:Reportes. R:stock</li> </li><li>'+tTypes_C.outerHTML+'<b>C</b>:Configuracion. R:cuentas</li><li>'+tTypes_I.outerHTML+'<b>I</b>:Interfaces</b> I:inventario</li> </li></ul></ul><span class="badge bf-danger">Versión beta, algunas opciones pueden no aparecer</span>',liSea,'N');
	sea.keyChange(function(T){
		seaRows.classList.remove('hidden');
		seaRows.innerHTML=''; seaRows.classList.add('hidden');
		var tval=T.value;
		if(tval.length<3){ return false; }
		sep=tval.split(/(R|F|C|L|I)\s?\:\s?(.*)\s?/);
		if(sep[2]){ tval=sep[2]; }
		seaRows.classList.remove('hidden');
		var Rows=[]; var rows=0;
		for(var i in $M.li){ L=$M.li[i];
			if(L.type=='V' || L.k==undefined || L.mdlAut=='N'){ continue; }
			var txt=new RegExp(tval,'is');
			var cond1=(sep[2] && L.type==sep[1]);
			var cond2=false;
			if(L.t && L.t.match(txt)){ cond2=true;  }
			else if(L.k && L.k.match(txt)){ cond2=true; }
			if(sep[2]){  if(cond1 && cond2){ Rows.push(L); rows++; } }
			else if(cond2){ Rows.push(L); rows++; }
			if(rows>10){ break; }
		}
		if(Rows.length==0){ $1.t('div',{'class':'bf-danger',textNode:'No se encontraron opciones en el menu'},seaRows)}
		for(var i in Rows){
			tChild=[[]];
			if(Rows[i].type=='L'){ tChild[0].push(tTypes_L.cloneNode(1)); }
			if(Rows[i].type=='F'){ tChild[0].push(tTypes_F.cloneNode(1)); }
			else if(Rows[i].type=='R'){ tChild[0].push(tTypes_R.cloneNode(1)); }
			else if(Rows[i].type=='C'){ tChild[0].push(tTypes_C.cloneNode(1)); }
			else if(Rows[i].type=='I'){ tChild[0].push(tTypes_I.cloneNode(1)); }
			var t=$M.liTag(Rows[i],{style:'padding:8px; border-bottom:1px solid #CCC; margin-bottom:6px;', func:function(T){ seaRows.classList.add('hidden'); document.location.href=T.href; return true; }},
			seaRows,tChild);
			t.classList.add('nowrap');
		}
	});
	seaRows=$1.t('div',{'class':'mLiSea_rows hidden',style:'position:absolute; top:100%; left:0; width:300px; background-color:#FFF; border:1px solid #CCC; padding:16px;'},liSea);
	var menuAdd=$1.t('div',{id:'__menuAddit',style:'display:inline-block'},whead);
	var help=$1.t('div',{id:'__m_user',style:'float:right'},whead);
		$1.t('span',{'class':'fa fa-user',textNode:' '+$0s.user},help);
	if($M.iniSet.help!='N'){
		var help=$1.t('div',{style:'float:right'},whead);
		$1.t('a',{href:'/help/tuto',target:'_BLANK',textNode:' Ayuda','class':'fa fa_info'},help);
	}
	if($M.iniSet.nty!='N'){
		var nty=$1.t('div',{'class':'wbo_notify'},whead);
		$1.t('span',{'class':'notifyCount fa fa-bell'},nty).onclick=function(){ $5n.get({},this.parentNode); }
	}
	var bott=$1.q('#_wrapBottomSocInfo');
	if(bott){ bott.style.display='none'; }
	$M.Ht.head=whead;
	$M.Ht.body=document.body;
	$M.Ht.bodyAjax=$1.q('#bodyAjax');
	$M.Ht.bodyAjax.classList.add('wbo_content');
	var divmenu = $1.t('aside',{id:'wbo_aside','class':'no-print'});
	if($M.iniSet.menu!='L'){
		menud.appendChild(divmenu);
		divmenu.style['display']='none';
		divmenu.style['top']='32px';
		divmenu.classList.add('__menuListWrap');
	}
	else if($M.iniSet.menu=='L'){
		$M.Ht.body.insertBefore(divmenu,$M.Ht.bodyAjax);
		$M.Ht.bodyAjax.classList.add('wbo_contentWi');
	}
	$M.draw(menud,divmenu);
	for(var i in $M.iniSet.mliDel){
		$1.delet($1.q('#mli_'+($M.iniSet.mliDel[i]+'').replace('.','')));
	}
	if($MdlK && typeof($MdlK['noLis'])){
		console.log('$M.inid->noLis !!');
		for(var i in $MdlK.noLis){ $1.delet($1.q('#mli_'+($MdlK.noLis[i]+'').replace('.',''))); }
	}
}
$M.tmpFiles={
	K:[],
	add:function(rTag){  $M.tmpFiles.K.push(rTag); },
	clear:function(){
		for(var i in $M.tmpFiles.K){ $1.delet($M.tmpFiles.K[i]) }
		$M.tmpFiles.K=[];
	}
}

$M.li['admin.perms']={t:'Permisos Asignados',kau:'admin.perms', func:function(){
	$M.Ht.ini({func_filt:function(wFilt){
		var dv=$1.T.divL({divLine:1,wxn:'wrapx4',L:'Usuario',I:{tag:'select',sel:{'class':'jsFiltVars __userId',name:'userId'},opts:$Tb.ousr,selected:$0s.userId, kR:true}},wFilt);
		var ui=$1.q('.__userId',wFilt);
		ui.onchange=function(){ $M.permsList(); }
	},func_cont:$M.permsList
});
}};
$M.li['admin.sysEnt']={t:'Variables de Entorno',kau:'admin.sysEnt', func:function(){
	$M.Ht.ini({func_cont:$SysEnt.view});
}};
