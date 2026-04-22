$c={
	V:{
		storBucket: 'https://stor1.admsistems.com/storage',
	},
	define:function(P,L){
		if(P=='H'){ for(var k in L){ $c.H[k]=L[k]; } }
		else{ for(var k in P){ $c.V[k]=P[k]; } }
	},
	H:{},
};
var $ys={}; //sistem
$y={
	ocardCode: '',
	apiURI:'',
	st2:'',
	sapi:'',
	timeJS:'20181224',
	Req:[],/* agregar para require */
	require:function(M,func,P){ P=(P)?P:{};
		var ocardtooken= '___ocardtooken='+localStorage.getItem('ocardtooken')+'&';
		for(var i in M){ var L=M[i];
			if(L.req!='N'){ M.splice(i,1);
				var fileSrc=L.src;
				if(L.type=='sys'){
					$y.loadingText('Librerias Dinámicas 0s');
					var fileSrc=$y.apiURI+'/sys/'+L.sys+'?'+ocardtooken;
				}
				else if(L.type=='http'){ $y.scrip(L.src); }
				else{ var fileSrc=$y.st2+'/'+L.src; }
				$y.scrip(fileSrc,{P:M, func:function(o){ $y.require(o.P); }});
					break;
			}
			else { $y.loadCom(L); }
		}
		if(func){//ini
			$y.onload(func,P);
		}
	},
	MF:[],//
	loader:false,
	S:[], n:0,
	mI:[],//usar en phpbase2
	jsIni:function(P){ //inicio actual unclicc
		var ocardtooken= '___ocardtooken='+localStorage.getItem('ocardtooken')+'&';
		var jsSoc=(P.jsSoc!='N')?'Y':'N';
		if(P.nocard){ /*omitir jsIni */
			$y.io(function(){
					$y.idom();
					if(P.func){ P.func(); }
					if(P.L){ $y.load(P.L); }
			});
		}
		else{
			var div=document.createElement('div');
			var stylBase='position:fixed; top:0; left:0; width:100%; height:100%; z-index:1; text-align:center; ';
			div.style=stylBase+'background-color:#FFF; ';
			var cols=['background:rgba(226,226,226,1); background:linear-gradient(to bottom, rgba(226,226,226,1) 0%, rgba(219,219,219,1) 50%, rgba(209,209,209,1) 51%, rgba(254,254,254,1) 100%);'
			];
			var intv=false; var n=0;
			var intv=setInterval(function(){
				if(div){
					div.style=stylBase+cols[n];
				}
				else{ intv=false; }
				n++;
				if(n>cols.length-1){ n=0; }
			},500);
			document.body.appendChild(div);
			var divTxt=document.createElement('div');
			divTxt.style='position:absolute; top:45%; left:40%;';
			div.appendChild(divTxt);
			var h4=document.createElement('h4');
			h4.appendChild(document.createTextNode('Cargando...'));
			divTxt.appendChild(h4);
			var img=document.createElement('img');
			img.setAttribute('src','loading1.gif'); divTxt.appendChild(img);
			var jsAct=document.createElement('p');
			jsAct.style='font-weight:bold;';
			divTxt.appendChild(jsAct);
			$y.scrip($y.apiURI+'/sys/jsIni?jsSoc='+jsSoc+'&'+ocardtooken,{func:function(){
				$y.io(function(){ /* 1 a 1 , luego cargar */
						$y.idom();
						if(P.func){ P.func(); }
						if(P.L){ $y.load(P.L); }
				},jsAct);
			}});
		}
	},
	idom:function(){ //iniciar dom
		$1.body = document.getElementById('bodyAjax');
		$y.logOutTime();
		$M.wrap = $1.q('#adms_dinamycWrap');
		$M.inid();
	},
	io:function(func,jsAct){ //cargar 1 x 1
		if($y.mI.length>0){ var X=$y.mI[0];
		if(X.lib=='chartjs'){
			$y.mI.splice(0,1);
			$y.mI.push({src:$y.st2+'/lib/chartjs/base.js'});
			$y.mI.push({src:$y.st2+'/lib/chartjs/utils.js'});
			$y.mI.push({src:$y.st2+'/lib/chartjs/my.js'});
			$y.io(func,jsAct);
		}
		else{ $y.addFile(X,{func:function(){ $y.io(func,jsAct); }},jsAct); }
			$y.mI.splice(0,1);
		}
		else if(func){
			if(jsAct){ document.body.removeChild(jsAct.parentNode.parentNode); }
			func();
		}
	},
	addFile:function(X,P,jsAct){ P=(P)?P:{}; //añade con  jsIni
		if(jsAct){
			var sep=(X.src.replace(/\?.*/,'')).split('/');
			jsAct.innerHTML =sep[sep.length-1];
		}
		if(typeof($ys)!='undefined'){
			if(X.src.match(/\?/)){ X.src +='&jsVersion='+$ys.jsVersion; }
			else{ X.src +='?jsVersion='+$ys.jsVersion; }
		}
		if(X.fType=='css'){
			var s = document.createElement('link');
			s.setAttribute('rel','stylesheet');
			s.setAttribute('href',X.src);
			s.setAttribute('charset','UTF-8');
			s.onload=function(){ if(P.func){ P.func(); } }
			document.head.appendChild(s);
		}
		else{
			var s = document.createElement('script');
			s.setAttribute('type','text/javascript');
			s.setAttribute('src',X.src);
			s.setAttribute('charset','UTF-8');
			s.onload=function(){ if(P.func){ P.func(); } }
			document.head.appendChild(s);
		}
	},
	scripAS:function(src,P){ P=(P)?P:{};
		var s = document.createElement('script');
		s.setAttribute('type','text/javascript');
		s.setAttribute('src',src);
		s.setAttribute('charset','UTF-8');
		s.onload=function(){ if(P.func){ P.func(); } }
		document.head.appendChild(s);
	},
	logOutTime:function(){
		var logOutTime=$Mdl.get('logOutTime'); //cerrar cada de x horas
		if(logOutTime){
			var lastIn=new Date().getTime();
			var lastOut=localStorage.getItem('lastOut');
			var hrsDif=(lastIn-lastOut)/(60*60*1000);
			if(lastOut && hrsDif>logOutTime){
				localStorage.clear();
				location.reload();
			}
			window.onbeforeunload =function(e){
				var lastOut=new Date().getTime();
				localStorage.setItem('lastOut',lastOut);
			}
		}
	},

	loadCom:function(L){
		if(L.type=='http'){
			$y.loadingText('Librerias '+L.src);
			$y.scrip($y.st2+L.src);
		}
		else if(L.type=='ahttp'){
			$y.loadingText('Librerias '+L.src);
			$y.scrip(L.src);
		}
		else if(L.type=='xls'){
			$y.loadingText('Librerias XLS');
			$y.scrip($y.st2+'/lib/js/xls_jszip.js');
			$y.scrip($y.st2+'/lib/js/xls_filesaver.js');
			$y.scrip($y.st2+'/lib/js/xls_myexcel.js');
			$y.scrip($y.st2+'/static/lib/$xls.js');//me
		}
		else if(L.type=='chartjs'){
			$y.loadingText('Librerias ChartJs');
			$y.scrip($y.st2+'/lib/chartjs/base.js');
			$y.scrip($y.st2+'/lib/chartjs/utils.js');
			$y.scrip($y.st2+'/lib/chartjs/my.js');//me
		}
		else if(L.type=='lib'){
			$y.loadingText('Librerias auxiliares');
			$y.scrip($y.st2+'/lib/'+L.src+'.js');
		}
		else if(L.type=='L'){
			$y.loadingText('Librerias Locales');
			$y.scrip(L.src+'.js');
		}
	},
	load:function(M,func,P){ P=(P)?P:{};
		var ocardtooken= '___ocardtooken='+localStorage.getItem('ocardtooken')+'&';
		$y.MF=M;
		for(var i in $y.MF){ var L=$y.MF[i];
			if(L.req=='Y'){ $y.MF.splice(i,1);
			var fileSrc=(L.cacheFile)?$y.st2+L.cacheFile:'';
			if(L.type=='sys'){
				$y.loadingText('Librerias Dinámicas 0s');
				var fileSrc=$y.apiURI+'/sys/'+L.sys+'?'+ocardtooken;
			}
			else if(L.type=='loadJs'){
				$y.loadingText('Librerias $Tb: '+L.src);
				var fileSrc=$y.apiURI+'/jsLoad?tbk='+L.src+'&'+ocardtooken;
			}
			else if(L.type=='ahttp'){
				$y.loadingText('Librerias ahttp');
				$y.scrip(L.src);
			}
			else if(L.type=='jsB'){
				$y.loadingText('Librerias '+L.src);
				var fileSrc=(L.cacheFile)? $y.st2+L.cacheFile:$y.st2+'/_js/load.php?read='+L.src;
			}
			else if(L.type=='ocl'){
				$y.loadingText('Librerias '+L.src);
				var fileSrc=$y.st2+'/ocl/'+L.src+'.js';
			}
			else if(L.type=='appDef'){
				$y.loadingText('Librerias de Configuración Aplicación');
				var fileSrc=$y.st2+'/appDefine/'+L.src+'.js';
			}
			else if(L.type=='0s'){
				$y.loadingText('Librerias Dinámicas 0s');
				var fileSrc=$y.apiURI+'/sys/0s?'+ocardtooken;
			}
			else{
				$y.loadingText('Librerias '+L.src);
				var fileSrc=(L.cacheFile)? $y.st2+L.cacheFile: $y.st2+'/'+L.src;
			}
			$y.scrip(fileSrc,{P:$y.MF, func:function(o){ $y.load(o.P); }});
				break;
			}
			else { $y.loadCom(L); }
		}
		if(func){//ini
			$y.onload(func,P);
		}
	},
	req:[],
	scrip:function(src,P){ P=(P)?P:{};
		var s = document.createElement('script');
		$y.S[$y.n]=s; s.n=$y.n;
		if(src.match(/\.js/is)){ src=src+'?'; }
		else{ src=src+'&'; }
		s.setAttribute('src',src+'timeJS='+$y.timeJS);
		s.setAttribute('charset','UTF-8');
		s.onerror=function(){ $y.S[this.n].isLoad='err'; }
		s.timeIni = new Date().getTime();
		s.onload=function(){
			$y.S[this.n].isLoad='Y'; var tend=new Date().getTime();
			if(typeof($0s)!='undefined'){
				$0s.console.put('$yLoad: '+((tend-this.timeIni)/1000)+'seg, '+this.src);
			}
			if(P.func){ P.func(P); }
		}
		$y.n++;
		document.head.appendChild(s);
	},
	sysScrip:function(L){
		var ocardtooken= '___ocardtooken='+localStorage.getItem('ocardtooken')+'&';
		for(var i in L){
			$y.scrip($y.apiURI+L[i].src+'?'+ocardtooken);
		}
	},
	i:false,
	loaded:-10000,
	funcExe:false,
	onload:function(func,P){ P=(P)?P:{};
		$y.loaded=$y.n; falta=0;
		for(var i in $y.S){
			if($y.S[i].isLoad=='Y'){ $y.loaded--; }
			else if($y.S[i].isLoad=='err'){ $y.loaded--; }
			else if($y.S[i].isLoad!='Y'){
				falta=1;
				$y.i=setTimeout(function(){ $y.onload(func,P); },1000);
			}
		}
		if(falta==0 && $y.loaded==0){
			clearTimeout($y.i); /* iniciar divs */
			$1.body = document.getElementById('bodyAjax');
			if(P.M!='N'){//no iniciar $M
				$M.wrap = $1.q('#adms_dinamycWrap');
				$M.inid();
			}
			if($y.loader){ $y.loader.parentNode.removeChild($y.loader); }
			if($y.funcExe==false){
				$y.Help.define();
				func();
			if($0s){ $0s.console.put('$yLoad: All loaded. func! '); }
			} $y.funcExe=true;
			if($0s){ $0s.console.put('$yLoad: All loaded... ('+$y.loaded+' / '+$y.n+') '); }
		}
	},
	loadingText:function(t){
		$y.loader=document.querySelector('.___jsLoader1');
		if($y.loader){ $y.loader.childNodes[0].innerHTML = t; }
	}
	}
$y.css=function(Src,func){
		var head=document.querySelector('head');
		Src=(typeof(Src)=='string')?[Src]:Src;
		var Ty={fa:'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'};
		for(var i in Src){ var ts=Src[i];
			if(ts=='fa'){ src=Ty.fa; }
			else if(ts.h=='sapi'){ src=$y.sapi+ts.src; }
			else{ src=$y.st2+ts.src; }
			link=document.createElement('link');
			link.setAttribute('rel','stylesheet');
			link.setAttribute('type','text/css');
			link.setAttribute('href',src);
			head.appendChild(link);
			link.onload=function(){ if(func){ func(); } }
			link.addEventListener('error', ()=>{ console.log('Error cargando css: '+ts.src); },false);
		}
	}
$y.sesion=function(Pd){
	if(Pd.remove){ localStorage.removeItem(Pd.remove); }
	else if(Pd.clear){ localStorage.clear(); }
	else if(typeof(Pd)=='object'){
		for(var k in Pd){ localStorage.setItem(k,Pd[k]); }
	}
	else { return localStorage.getItem(Pd); }
}
$y.Help={
	url:'http://api0.admsistems.com/help/',
	define:function(){
		var a=$1.q('#_wm_help a');
		if(a){ a.href=$y.Help.url+$0s.stor('ocardtooken'); }
	}
	}

	$SysEnt={ /* Visualización de Variables Sistema */
	L:[], /* listado, {k, v, V:[]} */
	view:function(){
		var cont=$M.Ht.cont;
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Variable',I:{tag:'select',sel:{'class':'_var'},opts:$SysEnt.L,P:'Y'}},cont);
		var sel=$1.q('._var',cont);
		sel.onchange=function(){
			var oS=sel.options[sel.selectedIndex];
			trH.childNodes[0].innerText='Clave--';
			trH.childNodes[1].innerText='Valor';
			tbF.childNodes[0].childNodes[1].innerText='Variables de Entorno - '+oS.innerText;
			ch(oS.P);
		}
		var tb=$1.T.table(['Clave','Valor']);
		var tbF=$1.T.tbExport(tb,{ext:'xlsx',fileName:'fromLegend'}); cont.appendChild(tbF);
		var trH=$1.q('thead tr',tb);
		var tBody=$1.t('tbody',0,tb);
		function ch(Lx){
			$1.clear(tBody);
			var ordBy=false;
			if(Lx.D){
				if(Lx.D.ordBy){ ordBy=Lx.D.ordBy; }
				if(Lx.D.k){ trH.childNodes[0].innerText=Lx.D.k; }
				if(Lx.D.v){ trH.childNodes[1].innerText=Lx.D.v; }
			}
			var V=(Lx.V)?Lx.V:Lx.k;
			var Lx= (typeof(V)=='string')?eval(V):V; delete(V);
			if(ordBy && Lx && Lx[0]){ Lx=$js.sortNum(Lx,{k:ordBy}); }
			for(var i in Lx){
				L= (typeof(Lx)!='object')?{}:Lx[i];
				var k=(L.k)?L.k:i;
				var v=(L.v)?L.v:L;
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:k},tr);
				$1.t('td',{textNode:v},tr);
			}
		}

	}
}
$SysEnt.L.push(
{k:'$V_Mmag',v:'Ciudades',D:{k:'ID Ciudad',v:'Ciudad',ordBy:'v'}},
{k:'$Tb.oslp',v:'Responsable Venta',D:{k:'ID Responsable',v:'Nombre Responsable',ordBy:'v'}},
{k:'$Tb.ousr',v:'Usuarios',D:{k:'ID usuario',v:'Nombre Usuario',ordBy:'v'}}
);
