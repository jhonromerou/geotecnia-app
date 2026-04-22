
$M.liA['itf']={t:'Interfaces',L:[]};
Api.Itf={b:'/a/itf/'};

var Itf={
get:function(P,wList,cont){
	var jsF='jsFields'; P=(P)?P:{};
	var vPost=(P.vPost)?P.vPost:'';
	P.textNode='Generar Plantilla';
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
		tb=$1.T.tbExport(tb,{ext:'xlsx',fileName:Jr.fileName,xls_spaces:/\~/g});/* ext, fileName */
		wList.appendChild(tb);
		}
	}
	return $Api.send(P,cont);
},
fieSel:function(D,P,pare){
	P=(P)?P:{};
	var tb = $1.T.table(['','','Campo','Descripción de campo'],0,pare);
	var tBody = $1.t('tbody',0,tb);
	for(var i in D.Fie){ var LF=D.Fie[i];
		var tr=$1.t('tr',0,tBody);
		var td=$1.t('td',0,tr);
		$1.Move.btns({},td);
		var td=$1.t('td',0,tr);
		if(LF.b=='Y'){ $1.t('input',{type:'checkbox',D:D.Fie[i],checked:'checked',disabled:'disabled'},td); }
		else{ $1.t('input',{type:'checkbox',D:D.Fie[i]},td); }
		$1.t('td',{textNode:LF.t},tr);
		var td=$1.t('td',{textNode:LF.d},tr);
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
	if(P.fUpd){
		$1.T.btnFa({fa:'faBtnCt', textNode:'Actualizar Plantilla',P:tBody,func:function(T){
			var tG=getFields(T.P);
			D.Li=tG.Li;
			P.fUpd(D);
		}},pare);
	}
	xTags={};
	if(P.fGet){
		xTags.fGet=$1.T.btnFa({fa:'faBtnCt', textNode:'Obtener Datos',P:tBody,func:function(T){
			var tG=getFields(T.P);
			D.Li=tG.Li; P.fGet(D);
		}});
	}
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
	return xTags;
}
}
Itf.E={
	form:function(D){
		var wrap = $M.Ht.cont; wrap.innerHTML='';
		var wrap=$1.t('div',0,wrap);
		if(D.descrip){
			$1.t('div',{'class':'textarea',style:'min-height:0;',textNode:D.descrip},wrap);
		}
		if(D.html){ $1.t('div',{'class':'textarea',style:'min-height:0;'},wrap).appendChild(D.html); }
		if(D.ihtml){ $1.t('div',{style:'padding:6px 0 16px 0'},wrap).innerHTML =D.ihtml; }
		var lw={L:[
			{textNode:'Selección',actived:'Y',winClass:'winFie' },
			{textNode:'Datos',winClass:'winTemplate' }
			]};
		var rTab=$1.Menu.tabs(lw); wrap.appendChild(rTab._top);
		if(!D.Li){ D.Li=[]; }
		Filt=[];
		for(var i in D.Fie){
			if(D.Fie[i].k && !D.Fie[i].t){
				D.Fie[i].t=D.Fie[i].k;
			}
			if(D.Fie[i].b=='Y'){ D.Li.push(D.Fie[i]); }
			if(D.Fie[i]._Fi){ LF=D.Fie[i]._Fi;
				if(!LF.wxn){ LF.wxn='wrapx8'; }
				if(!LF.L){ LF.L=D.Fie[i].d; }
				if(!LF.I.name){ LF.I.name=D.Fie[i].k; }
				Filt.push(LF);
			}
		}
		if(Filt){
			$1.T.divLTitle('Filtrar Resultados',rTab.winFie);
			$1.multiDivL(Filt,rTab.winFie,{jsF:'jsFiltVars'});
		}
		$1.T.divLTitle('Campos a obtener',rTab.winFie);
		xTags=Itf.fieSel(D,{fGet:(Dx)=>{
			$Api.get({f:D.api,inputs:'fie='+Dx.f+'&'+$1.G.filter(rTab.winFie),func:function(Jr){
				D.L=Jr.L; rTab.li_winTemplate.click();
				D.fileExt='txt';
				Itf.DT.tbStru(D,rTab.winTemplate);
			}});
		}},rTab.winFie);
		rTab.winFie.appendChild(xTags.fGet);
		wrap.appendChild($1.t('clear'));
		$1.t('p',{style:'fontSize:0.75rem; fontStyle:italic;',textNode:'Data Transfer v.3'},wrap);
	},
}
Itf.DT = {
lenLn:{},// lenLn[itfDT.ivtRiv]=10, solo 10 lineas, sino 500 por defecto
form:function(D){
	if(D.limitLen){ D.limitEnd=D.limitLen; }
	var wrap = $M.Ht.cont; wrap.innerHTML='';
	var wrap=$1.t('div',0,wrap);
	// permitir definir en lado cliente, maximo
	if(Itf.DT.lenLn[D.k]){ D.limitEnd=Itf.DT.lenLn[D.k]; }
	if(D.lnLimit){ D.limitEnd=D.lnLimit; }
	D.limitEnd=(D.limitEnd)?D.limitEnd:500;
	$1.T.divLTitle('1) Descargar y completar la plantilla',wrap);
	if(D.descrip){
		$1.t('div',{'class':'textarea',style:'min-height:0;',textNode:D.descrip},wrap);
	}
	if(D.html){ $1.t('div',{'class':'textarea',style:'min-height:0;'},wrap).appendChild(D.html); }
	if(D.ihtml){ $1.t('div',{style:'padding:6px 0 16px 0'},wrap).innerHTML =D.ihtml; }
	
	var lw={L:[
		{textNode:'Plantilla',actived:'Y',winClass:'winTemplate' }
		]};
	if(!D.Li){ D.Li=[]; }
	if(D.Fie){
		lw.L.push({textNode:'Selección Campos',winClass:'winFie' });
		for(var i in D.Fie){
			if(D.Fie[i].b=='Y'){ D.Li.push(D.Fie[i]); }
		}
	}
	var rTab=$1.Menu.tabs(lw); wrap.appendChild(rTab._top);
	Itf.DT.tbStru(D,rTab.winTemplate);
	if(D.Fie){ 
		Itf.fieSel(D,{fUpd:(Dx)=>{
			rTab.li_winTemplate.click();
			Itf.DT.tbStru(Dx,rTab.winTemplate);
		}},rTab.winFie);
	}
	
	$1.T.divLTitle('2) Definición de campos de plantilla',wrap);
	Itf.DT.helpFie(D,wrap);
	
	$1.T.divLTitle('3) Ejecutar Proceso',wrap);
	$1.t('div',{style:'fontWeight:bold',textNode:'Seleccione el archivo. Puede ser de '+D.limitEnd+' lineas como máximo'},wrap);
	var formu = $1.t('form',{name:'_admsDataTransferForm','style':'padding:0.025rem 0;'},wrap);
	var fid = 'fileIdw_'+$js.srand();
	var iFile = $1.t('input',{type:'file', id:fid, 'class':$Api.xFields+' psUFile psUFile_x32 _5f_fileWrap', name:'file'},formu);
	var iLabel = $1.t('label',{'for':fid,textNode:'Selección de Archivo'},formu);
	$1.t('div',{'class':'_wrapResp'},wrap);
	iFile.onchange=function(){
		Itf.DT.review(this,D,wrap);
	}
	//$1.T.btnFa({faBtn:'fa-bolt',textNode:'Revisón de Archivo',func:function(){ Itf.DT.review(iFile,D,wrap); }},wrap);
	wrap.appendChild($1.t('clear')); wrap.appendChild($1.t('clear'));
	$1.t('p',{style:'fontSize:0.75rem; fontStyle:italic;',textNode:'Data Transfer v.3'},wrap);
},
tbStru:function(P,wList){
	wList.innerHTML='';
	var tb = $1.t('table',{'class':'table_zh _itfTbBase'});
	var tHead = $1.t('thead',0,tb);
	var tr0 = $1.t('tr',0,tHead);
	var tBody = $1.t('tbody',0,tb);
	var tr1 = $1.t('tr',0,tBody);
	for(var k in P.Li){ L = P.Li[k];//k=fie, title, descrip
		if(L.trSep){ continue; }
		L.d = (L.d)?L.d:'';
		$1.t('td',{textNode:L.t},tr0);
		var td=$1.t('td',{textNode:L.d},tr1);
	}
	if(P.L){
		for(var i in P.L){
			var tr=$1.t('tr',0,tBody);
			for(var k in P.Li){ var Lk=P.Li[k];
				if(Lk.trSep){ continue; }
				tk=(Lk.k)?Lk.k:Lk.t;
				var te=P.L[i][tk];
				switch(Lk.format){
					case '$': te=$Str.money(te); break;
					case 'number': te=te*1; break;
				}
				$1.t('td',{textNode:te},tr);
			}
		}
	}
	fileName=(P.fileName)?P.fileName:'Plantilla DT';
	fileExt=(P.fileExt)?P.fileExt:'txt';
	tb = $1.T.tbExport(tb,{fileName:fileName,ext:fileExt,legend:' Descargar Plantilla'});
	wList.appendChild(tb);
},
helpFie:function(P,wList){
	function optsTb(opts,pare){
		var tb=$1.T.table(['ID','Descripción'],0,pare);
		var tBody=$1.t('tbody',0,tb);
		for(var i in opts){ var L=opts[i];
			var k=(L.k)?L.k:i;
			var v=(L.v)?L.v:L;
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:k,style:'backgroundColor:#CCC'},tr);
			$1.t('td',{textNode:v},tr);
		}
		return $1.T.tbExport(tb,{});
	}
	function optsTbv(opts,pare){
		var tb=$1.T.table(['Valor'],0,pare);
		var tBody=$1.t('tbody',0,tb);
		for(var i in opts){ var L=opts[i];
			var v=(L.v)?L.v:L;
			var tr=$1.t('tr',0,tBody);
			$1.t('td',{textNode:v,style:'backgroundColor:#CCC'},tr);
		}
		return $1.T.tbExport(tb,{});
	}
	function optsCsv(opts,pare){
		var tb=$1.t('span',{textNode:' Opciones: '},pare);
		for(var i in opts){ var L=opts[i];
			$1.t('b',{textNode:L.k+'='},tb);
			$1.t('i',{textNode:L.v+' '},tb);
		}
	}
	
	if(P.helpFie){
		var tb=$1.T.table(['Columna','Campo','Descripción','¿Cómo Definirlo?',''],0,wList);
		var tBody=$1.t('tbody',0,tb);
		var num=0; var num2=-1; var cols=0; var br=false;
		var Lts='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		var len=Lts.length-1;
		for(var i in P.Li){ var L=P.Li[i];
			var tr=$1.t('tr',0,tBody);
			if(L.trSep){
				$1.t('td',{textNode:L.trSep,style:'backgroundColor:#CC0',colspan:5},tr);
				continue;
			}
			var col='?';
			if(cols>len){ col=Lts[num2]+''+Lts[num];}
			else{ col=Lts[num]; }
			cols++; num++;
			if(num>len){ num=0;
				if(cols>=len){ num2++; }
			}
			$1.t('td',{textNode:col},tr);
			$1.t('td',{textNode:L.t},tr);
			$1.t('td',{textNode:L.d},tr);
			var td=$1.t('td',0,tr); var n=1;
			if(L.xformat=='9z'){ $1.t('div',{textNode:'Letra A-Z y/o Número 0-9'},td); }
			if(L.len){ $1.t('div',{textNode:'Entre '+L.len[0]+' y '+L.len[1]+' caracteres'},td); }
			if(L.lik){
				_Mli=$M.Li[L.lik];
				$1.t('a',{href:$M.to(_Mli.k,null,r),'class':'fa fa_arrowCircleR'},td);
				$1.t('span',{textNode:' '+_Mli.t},td);
			}
			else if(L.optsTb){ $1.T.iHelp(optsTb(L.opts),td,{onDiv:true,textNode:'Usar ID de la tabla, Clic para ver listado'}); }
			else if(L.optsTbv){ $1.T.iHelp(optsTbv(L.opts),td,{onDiv:true,textNode:'Clic para ver listado'}); }
			else if(L.optsCsv){ optsCsv(L.opts,td); }
			if(L.xformat=='$' || L.xformat=='number'){
				$1.t('div',{textNode:'(.) para decimales, sin separado de miles'},td);
			}
			var td=$1.t('td',0,tr);
			if(L.desc){ td.innerHTML=L.desc; }
		}
	}
}
}
Itf.DT.review=function(iFile,D,wrap){
	//D.Li campos
	var win=$1.t('div');
	JFread.tsv(iFile,function(Ln){
		if(Ln.length>D.limitEnd){
			return $Api.resp(win,{errNo:3,text:'El archivo supera las '+D.limitEnd+' lineas permitidas, archivo tiene '+Ln.length});
		}
		var ln=1; var errs=0;
		//Verificar campos
		var LD=[];
		for(var i in Ln){
			var nf=0; // numero de campo, usar xk trSep genera saltos
			var LD1={};
			for(var i2 in D.Li){ var LF=D.Li[i2];
				if(LF.trSep){ continue; }
				var valbase=Ln[i][nf]; var xS='-';
				var valr=valbase; var xS='-';
				var err=false; valND=false;
				if(LF.opts){ valr=_g(valbase,LF.opts,'_ERR_') }
				if(valr=='_ERR_' && LF.opts){ //cambiar val por el k
					valbase=valr=_gK(valbase,LF.opts,'_ERR_');
				}
				if($js.isNull(valr) || valr=='_ERR_'){ valND=true; }
				var lenTxt=(valr)?valr.length:-1;
				if(valND && LF.req=='Y'){ err='Campo requerido, verifique que el valor sea valido. ('+Ln[i][nf]+')'; }
				else if(LF.len && (lenTxt<LF.len[0] || lenTxt>LF.len[1])){ err='El campo solo permite una longitud de caracteres entre '+LF.len[0]+' y '+LF.len[1]; }
				if(err){ errs++;
					iFile.value=null; //resetear campo
					$1.t('div',{textNode:'Linea '+ln+', Campo '+LF.t+': '+err,'class':'input_warning'},win);
				}
				LD1[LF.t]=valbase; 
				nf++;
			}
			LD.push(LD1);
			ln++;
		}
		console.log(LD);
		//Todo ok, enviar
		if(errs==0){
			$1.t('div',{'class':'input_ok',textNode:'Todos los campos están correctamente definidos, puede realizar el proceso'},win);
			var nFile=iFile.cloneNode(1);
			win.appendChild(nFile);
			var jsF=$Api.JS.cls;
			$1.t('input',{type:'hidden','class':jsF,AJs:{L:LD}},win);
			if(D.divL){
				var n=0;
				for(var i in D.divL){ var dL=D.divL[i];
					dL.I['class']=jsF; 
					if(dL.divLine){
						var pare=$1.T.divL(dL,win);
					}
					else{ $1.T.divL(dL,pare); }
				}
			}
			var resp=$1.t('div',0,win);
			$Api.send({POST:D.api+'?limitEnd='+D.limitEnd,textNode:' Definir Plantilla',faBtn:'fa_fileUpd',Conf:{text:'Toda la información será ingresada a la base de datos y no se podrá revertir el proceso'},jsBody:win,func:function(Jr){
				$Api.resp(resp,Jr); 
				iFile.value=null;
			}},win);
		}
	});
	$1.Win.open(win,{winTitle:'Verificación de Campos',winSize:'medium'});
}
Itf.DT.preview=function(e,D,wrap){
	//D.Li campos
	var win=$1.t('div');
	var tb=$1.q('._itfTbBase',wrap).cloneNode(1);
	win.appendChild(tb);
	var tBody=$1.q('tbody',tb);
	JFread.tsv(e,function(Ln){
		for(var i in Ln){
		var tr=$1.t('tr',0,tBody);
		var nf=0; // numero de campo, usar xk trSep genera saltos
		for(var i2 in D.Li){ var LF=D.Li[i2];
			if(LF.trSep){ continue; }
			var val=(Ln[i][nf])?Ln[i][nf]:'';
			var valr=Ln[i][nf];
			var css1='';
			if(LF.opts){ val=_g(valr,LF.opts) }
			if($js.isNull(valr)){ css1='backgroundColor:purple'; }
			$1.t('td',{textNode:val,style:css1},tr);
			/* con inputs
			var td=$1.t('td',0,tr);
			if(LF.opts){ $1.T.sel({name:LF.t,opts:LF.opts,selected:val},td); }
			else{ $1.t('input',{type:'text',name:LF.t,value:val},td); }
			*/
			nf++;
		}
		}
	$1.Win.open(win,{winTitle:'Paso 2: Vista Previa de Datos',winSize:'full'});
	});
}

JFread={
	get:function(e,func){
		var archivo = e.files[0];
		if(!archivo){ return; }
		var lector = new FileReader();
		lector.onload = function(e) {
				var contenido = e.target.result;
				func(contenido);
		};
		lector.readAsText(archivo);
	},
	tsv:function(e,func,P){
		var P=(P)?P:{};
		var lineIni=(P.lineIni)?P.lineIni:3;
		JFread.get(e,function(Txt){
			var Data=[];
			var Ln=Txt.split('\n'); var ln=1;
			for(var i in Ln){
				if(Ln[i]==''){ continue; } //linea final en blanco
				if(ln<lineIni){ }
				else{
					var Fn=Ln[i].split('\t');
					var XL=[];
					for(var i2 in Fn){
						XL[i2]=Fn[i2]; // 0 =itemCode
					}
					Data.push(XL);
				}
				ln++;
			}
			func(Data,e);
		});
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