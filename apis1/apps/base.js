
$ys.softFromXls='Generado en Software unClicc';
var jsFi={'extends':'/com1/js/extends.php'};
$V.dbReportLen={parcial:'Parcial','full':'Completo'};
$V.wopType={I:'Interna',E:'Externa'};
$V.docSerieType={};
$V.YN=[{k:'Y',v:'Si'},{k:'N',v:'No'}];
$oTy.odlv='odlv';$oTy.opvt='opvt';
$V.crdInfoOn='N'; //no mostrar info en cliente
Api.Exp = {a:'/sa/c70/exp/'};
$VH.softRepXLS=$1.t('h5',{textNode:'Diseñado por ADM Sistems - Generado desde unClicc'});
$V.statusOC=[{k:'O',v:'Abierto'},{k:'C',v:'Cerrado'}];
$V.bar2 = {'1':'Contables'};
$V.mathOper={'=':'= Igual','x':'x Mult.', '/':'/ Dividir','%':'% Resto'};
$V.active={'active':'Activo',inactive:'Inactivo'};
$V.activeOpt=[{k:'active',v:'Activo'},{k:'inactive',v:'Inactivo'}];
$V.lineStatus={O:'Abierta',C:'Cerrada'};
$V.workOperat={'1':'Troquelado','2':'Guarnecida'};

$V.tipoPuntera={sp:'Sin Puntera',pa:'Puntera Acero',pc:'Puntera Composite'};
$V.tipoLinea={iny:'Inyección',vulc:'Vulcanizado',otro:'Otros'};
$V.ordTypePE={A:'Primeras',B:'Segundas'};
$M.ttK['FV']={a:'sell.envoiceView',p:{tr:'handNum'}};
$M.ttK['FC']={a:'buy.envoiceView',p:{tr:'handNum'}};
$M.ttK['WTD']={a:'items.WTD.view',p:{tr:'handNum'}};

$M.s={};

var _Frm={
n:{i:1},
itm:function(P,tBody){
	var difCurr=(P.curr!=$0s.currDefault);
	var P2=(P.JrS)?P.JrS:P;
	var Ta=(P.Ds)?P.Ds.T:{}; var jsF=P.jsF;
	var Fie=(P.Fie)?P.Fie:{};
	var basic=(Fie && Fie.formFields=='basic')?true:false;//itemCode,itemName,q,udm
	for(var i in P.L){ P2=P.L[i];
		var ln='L['+_Frm.n.i+']';
		var itnc=P2.itemCode;
		var itn=P2.itemName;
		P2.itemSize=_g(P2.itemSzId,$V.grs1);
		if(P2.itemSzId!=$V.uniqSize){
			var itnc=Itm.Txt.code(P2);
			var itn=Itm.Txt.name(P2);
		}
		var itmUnique='_itmUniqueLine_'+P2.itemId+'_'+P2.itemSzId
		if($1.q('.'+itmUnique,tBody)){
			$1.Win.message({winId:'rand',errNo:3,text:'No se puede relacionar un artículo más de 1 vez, la linea para '+itnc+', cant. '+P2.quantity+' no fue agregada'});
			continue;
		}
		var vPost='';
		if(P2.id){ vPost +=ln+'[id]='+P2.id+'&'; }
		vPost += ln+'[itemId]='+P2.itemId+'&'+ln+'[itemSzId]='+P2.itemSzId+'&';
		var pricDisab=(Fie.price && Fie.price.disabled=='Y');
		var discDisab=(Fie.disc && Fie.disc.disabled=='Y');
		var tr=$1.t('tr',{'data-vPost':'Y'},tBody);
		$1.t('td',{textNode:_Frm.n.i},tr); _Frm.n.i++;
		var priceBase=0;
		var td=$1.t('td',{textNode:itnc,'class':'_noHidden '+itmUnique},tr);
		if(!P2.itemSize){ P2.itemSize=_g(P2.itemSzId,$V.grs1); }
		$1.t('td',{textNode:itn},tr);
		var td=$1.t('td',{style:'width:4.25rem;'},tr);
		var qua=$1.t('input',{type:'number',inputmode:'numeric',min:0,'class':jsF+' __tdNum2 __tbColNums', tbColNum:2, value:P2.quantity,name:ln+'[quantity]',onkeychange:function(){ $Tol.tbSum(tBody.parentNode); },style:'width:4rem;'},td);
		udm=(P.formType=='compra')?P2.buyUdm:((P2.sellUdm)?P2.sellUdm:'?');
		$1.t('td',{textNode:udm},tr);
		if(!basic){
		if(P.formType=='compra'){
			var price=(P2.buyPrice)?P2.buyPrice:P2.price;
		price=(P2.priceDefine)?P2.priceDefine:price;//definir antes
			var tdPrice=$1.t('td',{style:'width:7rem;'},tr);
			var cost=(P2.buyPrice)?P2.buyPrice:((P2.price)?P2.price:P2.cost);
			priceBase=(P2.priceList)?P2.priceList:cost;
			vPost+= (P2.priceList)?ln+'[priceList]='+P2.priceList+'&':ln+'[priceList]='+cost+'&';
			var inpPrice=$1.t('input',{type:'text',numberformat:'mil', value:cost,'class':jsF+' __tdNum',onkeychange:function(){ $Tol.tbSum(tBody.parentNode); },name:ln+'[price]',kn:'buyPrice',style:'width:7rem;'},tdPrice);
			inpPrice.numBase = priceBase;
		}
		else{//venta
			var price=(P2.sellPrice)?P2.sellPrice:P2.price;
			price=(P2.priceDefine)?P2.priceDefine:price;//definir antes
			priceBase=(P2.priceList)?P2.priceList:P2.sellPrice;
			vPost+=(P2.priceList)?ln+'[priceList]='+P2.priceList+'&':ln+'[priceList]='+P2.sellPrice+'&';
			var tdPrice=$1.t('td',{style:'width:7rem;'},tr);
			var inpPrice=$1.t('input',{type:'text',numberformat:'mil', value:price,'class':jsF+' __tdNum',onkeychange:function(){ $Tol.tbSum(tBody.parentNode); },name:ln+'[price]',kn:'sellPrice',title:'sellPrice',style:'width:7rem;'},tdPrice);
			inpPrice.numBase = priceBase;
		}
		if(pricDisab){ inpPrice.setAttribute('disabled','disabled'); }
		if(difCurr){ pric=P2.priceME; }
		if(Fie.disc && Fie.disc!='N'){
			var td=$1.t('td',{style:'width:4.5rem;'},tr);
			var discI=$1.t('input',{type:'number',inputmode:'numeric',min:0,max:100,'class':jsF+' __tdNumDiscVar', value:P2.disc,name:ln+'[disc]',onkeychange:function(){ $Tol.tbSum(tBody.parentNode); },style:'width:3rem;'},td);
			td.appendChild($1.t('textNode','%'));
			if(discDisab){ discI.setAttribute('disabled','disabled'); }
		}
		td=$1.t('td',{'class':'__tdTotal',vformat:'money'},tr);
		}
		//qua.O={vPost:vPost};
		tr.vPost=vPost;
		td=$1.t('td',0,tr);
		_Frm.tdBtnDel({td:td,ln:ln});
	}
	$Tol.tbSum(tBody.parentNode);
},
tdBtnDel:function(P){
	var td=P.td; var tr=P.tr; var ln=P.ln;
	if(!td.classList.contains('_noHidden')){ td.classList.add('_noHidden'); }
	var tr=(P.tr)?P.tr:td.parentNode;
	var tbPare=(P.tbPare)?P.tbPare:tr.parentNode.parentNode;//tbody->table
	var btn=$1.T.btnFa({fa:'fa_close',textNode:' Quitar', func:function(T){
		var tds=$1.q('td',tr,'all');//tr
		var ttd=T.parentNode;//td
		var tdTotal=$1.q('.__tdTotal',tr);
		for(var i3=0; i3<tds.length;i3++){
			if(ttd.visible=='Y' && !(tds[i3].classList.contains('_noHidden'))){ tds[i3].style.visibility='hidden'; }
			else{ tds[i3].style.visibility=''; }
		}
		if(ttd.visible=='Y'){
			if(tdTotal){ tdTotal.classList.add('__tdTotalNoCount'); }
			T.innerText= ' Restablecer';
			T.classList.replace('fa_close','fa_arrowBack');
			ttd.visible='N';
			$1.t('input',{type:'hidden',value:'Y',name:ln+'[delete]','class':jsF+' _inputDelete'},T.parentNode);
		}
		else{
			ttd.visible='Y';
			T.innerText=' Quitar';
			T.classList.replace('fa_arrowBack','fa_close');
			if(tdTotal){ tdTotal.classList.remove('__tdTotalNoCount'); }
			$1.delet($1.q('._inputDelete',ttd));
		}
			$Tol.tbSum(tbPare);
		}
	},td);
	return btn;
}
}

$M.go({ini:'no.index'});

$M.liAdd('sys',[
	{k:'sys.ventor',t:'Variables de Entorno',kau:'admin.sysEnt',ini:{g:$SysEnt.view}},
	{_lineText:'_REP'},
	{k:'sys.reportss',t:'Reportes Generales',kau:'public',ini:{g:function(){
		cont=$1.t('div',{'class':'ulWrapLevel'},$M.Ht.cont);
		for(var k in $M.repM){ var L=$M.repM[k];
			tp=false;
			k1=(L.fatherId)?L.fatherId:L.folId;
			tp=$1.q('.mrep_'+k1,cont);
			tEle={textNode:L.folName};
			if(L.ico){ tEle['class']=L.ico; }
			if(!tp){
				tp=$1.t('ul',{'class':'mrep_'+k1},cont);
				$1.t('h3',tEle,tp)
			}
			if(L.MLis){
				k2=L.folId;
				tp2=$1.q('.mrep_'+k2,cont);
				if(!tp2){
					tp2=$1.t('ul',{'class':'mrep_'+k2},$1.t('li',0,tp));
					$1.t('h4',tEle,tp2)
				}
				for(var i2 in L.MLis){ var kli=L.MLis[i2];
					L2=($M.li[L.MLis[i2]])?$M.li[L.MLis[i2]]:{t:'_ERROR_'};
					$1.t('a',{textNode:' - '+L2.t,href:$M.to(kli,'','r'),'class':'fa fa_arrowCircle',style:'padding: 0.25rem; text-decoration: none; display: block;'},$1.t('li',0,tp2));
				}
			}
		}
	}}}
],{});

$M.liAdd('crd',[
	{_lineText:'Especiales de Tercero'},
	{k:'o.reports',t:'Reportes',kau:'public',mdlActive:'sysRep', ico:'fa fa_doc',ini:{f:null, g:$0s.Report.get }}
]);

$M.li['_showMLi']={t:'Visualización de MLis',kau:'public',func:function(){
	$M.Ht.ini({func_cont:function(){
	var cont=$M.Ht.cont;
	var tb=$1.T.table(['Mdl','SubT','Tipo','uri','Titulo','Permiso (kau)','mdl Req.']);
	var tBody=$1.t('tbody',0,tb); var lastMdl='';
	var TBs={};
	var mdlTxt='';
	for(var k in $M.li){ var Lm=$M.li[k];
		var qid='_Mnli_'+Lm._nli;
		Lm.kMdl=(Lm.kMdl)?Lm.kMdl:'Sin Definir';
		if(!TBs[Lm.kMdl]){
			//var tbN=tb.cloneNode(1); TBs[Lm.kMdl]=tbN.childNodes[1]; cont.appendChild(tbN);
			mdlTxt=Lm._lineText;
			var tr=$1.t('tr',{id:qid},tBody);
			$1.t('td',{textNode:Lm.kMdl,style:'backgroundColor:#DDD;'},tr);
			$1.t('td',{textNode:mdlTxt,style:'backgroundColor:#DDD;'},tr);
			$1.t('td',{colspan:5,style:'backgroundColor:#DDD;'},tr);
		}
		TBs[Lm.kMdl]=1;
		if(Lm._lineText){
			mdlTxt=Lm._lineText;
			var tr=$1.t('tr',{id:qid},tBody);
			$1.t('td',{textNode:Lm.kMdl},tr);
			$1.t('td',{colspan:5,textNode:Lm._lineText,style:'backgroundColor:#CCD;'},tr);
			continue;
		}
		var trLast=$1.q('#'+qid,tBody);
		if(!trLast){ var trLast=$1.t('tr',{id:qid},tBody); }
		var tr=$1.t('tr');
		var val=(Lm.type)?_g(Lm.type,$V.MTypes):'N/D'
		$1.t('td',{textNode:Lm.kMdl},tr);
		$1.t('td',{textNode:mdlTxt},tr);
		$1.t('td',{textNode:val},tr);
		$1.t('td',{textNode:Lm.k},tr);
		$1.t('td',{textNode:Lm.t},tr);
		$1.t('td',{textNode:Lm.kau},tr);
		var val=(Lm.mdlActive)?Lm.mdlActive:'N'
		var val2=(Lm.mdlAut)?Lm.mdlAut:'ND';
		$1.t('td',{textNode:val+' / '+val2},tr);
		$1.I.after(tr,trLast);
	}
	$1.T.tbExport(tb,0,cont)
	}});
}};


/* $Sistem Define */
Api.Sys={a:'/v/sysd/'};

$M.li['sysd.a0crd2']={t:'Parametrización de Campo',kau:'sysd.sumaster', func:function(){
$M.Ht.ini({func_cont:$Sysd.a0crd2.form}); } }

$Sysd={};
$Sysd.V={ /*Define todo en $V[kn] */
get:function(kn,P){
	/* $oB.upd */
	var rel=true;
	/* no volver a cargar */
	if(P.noReload && ($V[kn] && $V[kn].length>0)){
		if(P.func){ P.func(); }
		return true
	}
	$Api.get({f:Api.Sys.a+'v',loadVerif:!rel, inputs:'kname='+kn,func:function(Jr){
		if(Jr.errNo){ $V[kn]=[]; $1.Win.message(Jr); }
		else{ $V[kn]=eval(Jr); }
		if(P.func){ P.func(); }
	}});
}
}
$Sysd.a0crd2={
get:function(Pa){
	var cont=$M.Ht.cont;
	var vPost=''; for(var i in Pa){ vPost +=i+'='+Pa[i]+'&'; }
	$Api.get({f:Api.Sys.a+'a0crd2', inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','Descrip','Valor','tag','Key','ini','type']); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var css='';
				if(L.editable=='N'){ css='color:red;'; }
				var h=$1.t('a',{'class':'fa fa-pencil',title:$M.to('sysd.a0crd2','id:'+L.idk,'r'),style:css},td);
				L.mdlk=Pa.mdlk;
				h.L=L;
				h.onclick=function(){ $Sysd.a0crd2.form(this.L,'win'); }
				$1.t('td',{textNode:L.descrip},tr);
					$1.t('td',{textNode:$js.textLimit(L.v,10)},tr);
				$1.t('td',{textNode:L.tag},tr);
				$1.t('td',{textNode:L.jsV+'.'+L.k},tr);
				$1.t('td',{textNode:L.ini},tr);
				$1.t('td',{textNode:L.type},tr);
			}
		}
	}});
},
form:function(Pa,cont){
	if(cont=='win'){
		var cont=$1.t('div',0);
		$1.Win.open(cont,{winTitle:'Definir Variable',winSize:'medium',onBody:1});
	}
	var cont=(cont)?cont:$M.Ht.cont;
	Pa=(Pa)?Pa:$M.read();
	var vPost='mdlk='+Pa.mdlk;
	vPost +=(Pa.idk)?'&idk='+Pa.idk:'';
	var vPostS=vPost;
	$Api.get({f:Api.Sys.a+'a0crd2/form',inputs:vPost,loade:cont,func:function(Jr){
		var jsF='jsFields';
		$1.t('div',{style:'padding:0.5rem; border:0.0625rem solid #000;',textNode:Jr.descrip},cont);
		var Ex=(Jr.exte)?Jr.exte:{};
		switch(Jr.tag){
			case 'YN': $1.T.divL({divLine:1,wxn:'wrapx1',L:'Valor',I:{tag:'select',sel:{name:'v','class':jsF},opts:$V.NY,selected:Jr.v}},cont); break;
			case 'number': $1.T.divL({divLine:1,wxn:'wrapx1',L:'Valor',I:{tag:'input',type:'number',inputmode:'numeric',name:'v',value:Jr.v,'class':jsF}},cont); break;
			case 'textarea': $1.T.divL({divLine:1,wxn:'wrapx1',L:'Valor',I:{tag:'textarea',name:'v',textNode:Jr.v,'class':jsF}},cont); break;
			case 'colorMt':{
				var vJ=eval(Jr.v);
				var tS=($V[Jr.k])?$V[Jr.k]:[]; /* k=gvtPvtStatus */
				for(var i in tS){ var k=tS[i].k;
				var inpC=$1.t('input',{type:'color',name:k,'class':'__color',value:_g(k,vJ)});
					$1.T.divL({divLine:1,wxn:'wrapx4',L:tS[i].v,Inode:inpC},cont);
					inpC.onchange=function(){ __colMt(); }
				}
				$1.T.divL({divLine:1,wxn:'wrapx1',L:'Valor',I:{tag:'textarea',name:'v',textNode:Jr.v,'class':jsF+' __tosend'}},cont); break;
			break;}
			default: $1.T.divL({divLine:1,wxn:'wrapx1',L:'Valor',I:{tag:'input',type:'text',name:'v',value:Jr.v,'class':jsF}},cont); break;
		}
		function __colMt(){
			var tgs=$1.q('.__color',cont,'all');
			tea='[';
			for(var i=0; i<tgs.length; i++){
				tea += '{"k":"'+tgs[i].name+'","v":"'+tgs[i].value+'"},';
			}
			tea += ']';
			$1.q('.__tosend',cont).innerText=tea;
		}
		if(1){
			resp=$1.t('div',0,cont);
			$Api.send({PUT:Api.Sys.a+'a0crd2/form',loade:resp,getInputs:function(){
				return vPostS+'&'+$1.G.inputs(cont);
			}, func:function(Jr2,o){
				$Api.resp(resp,Jr2);
				if(!Jr2.errNo && o){
					if(o.vUpd){ eval((o.vUpd)); } /* o.vUpd= ColMt[gvPVt]=[] */
				}
			}},cont);
		}
	}});
}
}
$Sysd.MassData={
form:function(Pa){ Pa=(Pa)?Pa:{};
	var cont=$M.Ht.cont; var jsF='jsFields';
	var fil=(Pa.filter);
	var apiR=Api.Sys.a+'massData/'+Pa.k;
	var vPost=(Pa.vPost)?Pa.vPost:$1.G.filter();
	$Api.get({f:apiR, inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var wList=$1.t('div',0,cont);
			var tb=$1.T.table(['']); wList.appendChild(tb);
			var trH=$1.q('thead tr',tb);
			var tF=[''];
			var _F=Jr.F;
			/* tbHeads */
			for(var i in _F._o){ var kF=_F._o[i];
				var LD=_F[kF];
				if(LD && LD.tag=='vPost'){ continue; }
				var te=(LD && LD.t)?LD.t:k;
				if(LD.optEval){ eval('LD.opts='+LD.opts); }
				else{ LD.opts=eval(LD.opts);}
				var tD={textNode:te};
				if(LD._iHelp){ tD._iHelp=LD._iHelp; }
				var tdx=$1.t('td',tD,trH);
				if(LD.aGo){ tdx.insertBefore($1.aGo(LD.aGo,null),tdx.firstChild); }
			}
			delete(_F._o);
			var tBody=$1.t('tbody',0,tb);
			var td0Css='background-color:#0F0';
			for(var i in Jr.L){ var L=Jr.L[i];
				var tr=$1.t('tr',{'class':'lineData'},tBody);
				tr.omit='Y';
				var td0=$1.t('td',{'class':'jsF','data-vPost':'Y'},tr);
				td0.style=td0Css;
				td0.vPost='';
				/* tds con campos */
				for(var kF in _F){ var LD=$js.clone(_F[kF]);
					var tag=LD.tag; var lname='L['+i+']['+kF+']';;
					if(tag=='vPost'){ td0.vPost += lname+'='+L[kF]+'&'; continue; }
					var td=$1.t('td',{kF:kF},tr);
					if(!LD.disabled){
						LD.name=lname
						LD['class']=jsF;
					}
					LD.value=L[kF];
					var tagN=$1.lTag(LD,td);
					var oldVal=LD.value;

					if(!LD.disabled){
						tagN.keyChange(trOmit,{P:{oldVal:oldVal,td:td0,tr:tr}});
					}
				}
			}
			/*save*/
			function trOmit(T){
				T.P.tr.omit='Y';
				if(T.P.oldVal!=T.value){ T.P.tr.omit='N';
					T.P.td.style='background-color:#FF0';
				}
				else{ T.P.td.style=td0Css; }
			}
			var resp=$1.t('div',0,cont);
			$Api.send({PUT:apiR,'class':'fa fa_save',title:'Guardar',getInputs:function(T){
				var vPost='';
				var trs=$1.q('tr.lineData',cont,'all');
				for(var il=0; il<trs.length; il++){
					if(trs[il].omit=='N'){ vPost += $1.G.inputs(trs[il]); }
				}
				return vPost;
			}, loade:resp, func:function(Jr2){
					$Api.resp(resp,Jr2);
					if(!Jr2.errNo){ $Sysd.MassData.form(Pa); }
				}
				},cont);
		}
	}});
}
}

$JsV._o={};
$JsV.liAdd=function(Li,P2){
	for(var i in Li){
		if(P2){ for(var i2 in P2){ 
			if(!Li[i][i2]){ Li[i][i2]=P2[i2]; } //no redefinir
		}}
		$JsV._i(Li[i]);
	}
}
$JsV._i=function(P){
	var kLix=P.kObj;
	P.Cols=(P.Cols)
	?P.Cols
	:[{t:'Nombre',k:'value',T:{tag:'input'}}];
	var kLi='jsv.'+P.kObj;
	_Fi[kLi]=function(w){
		var oneCols=$js.clone(P.Cols);
		var P0=oneCols[0]; jsF='jsFiltVars';
		var divL=$1.T.divL({divLine:1,L:P0.t,wxn:'wrapx4',I:{lTag:P0.T.tag,'class':jsF,name:'value(E_like3)'}},w);
		if(0){ for(var i in oneCols){
			if(i==0){ continue; }
			var TP=oneCols[i].T; TP['class']=jsF; TP.name=oneCols[i].k;
			$1.T.divL({L:oneCols[i].t,wxn:'wrapx4',I:TP},divL);
		}}
		$1.T.btnSend({textNode:'Actualizar',func:()=>{ $JsV._o[kLix].get(); }},w);
	}
	var kau=(P.kau)?P.kau:'sysd.sumaster';
	if(P.liK){ P.kMdl=P.liK; }
	$M.liAdd(P.kMdl,[
	{k:kLi,t:P.liTxtG, mdlActive:P.mdlActive, kau:kau, func:function(){
		$M.Ht.ini({fieldset:'Y',f:kLi,btnGo:kLi+'.form',gyp:function(){ $JsV._o[kLix].get(); } });
	}},
	{k:kLi+'.form',t:P.liTxtF, kau:kau, func:function(){ $M.Ht.ini({g:function(){ $JsV._o[kLix].form(); } }); }},
	]);
	delete(P.liK); delete(P.liTxtG); delete(P.liTxtF);
	$JsV._o[kLix]=new $JsV._c(P,true);
}
$JsV._c=function(P){
	/*mdl=par, kObj, Cols:[{t,k,T:{}]
	/#jsv.parGrC!!{vid}
	*/
	this.kMdl=P.kMdl;//gvt
	this.kObj=P.kObj;//parGrC
	var Hash='jsv.'+P.kObj+'.form';
	this.Hash=Hash;
	this.Cols=P.Cols;
	this.vPost='mdl='+P.mdl+'&kObj='+P.kObj+'&';
}
$JsV._c.prototype.get=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var vPost=this.vPost+$1.G.filter();
	$Api.get({f:'/1/sysd/jsv', inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var TB=[];
			for(var i in ThiS.Cols){
				TB.push({textNode:ThiS.Cols[i].t});
			}
			TB.unshift({textNode:''});
			TB.push({textNode:'ID'});
			var tb=$1.T.table(TB,0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to(ThiS.Hash,'vid:'+L.vid,'r')},td);
				for(var i in ThiS.Cols){
					var val=$1.setTag(ThiS.Cols[i],L);
					$1.t('td',val,tr);
				}
				$1.t('td',{textNode:L.vid},tr);
			}
		}
	}});
}
$JsV._c.prototype.form=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var Pa=$M.read();
	var vPost=(Pa.vid)?'vid='+Pa.vid:'';
	$Api.get({f:'/1/sysd/jsv/form',addGet:ThiS.vPost,loadVerif:!Pa.vid, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'vid'},cont);
		if(Pa.vid){ hid.value=Pa.vid; }
		hid.AJs={kMdl:ThiS.kMdl,kObj:ThiS.kObj};
		var pare=false; var ln0=true;
		for(var i in ThiS.Cols){
			var dL=(ThiS.Cols[i].T);
			dL.name=ThiS.Cols[i].k;
			dL.value=Jr[ThiS.Cols[i].k];
			dL['class']=jsF;
			if(ln0){ ln0=false;
				pare=$1.T.divL({divLine:1,wxn:'wrapx1',L:ThiS.Cols[i].t,Inode:$1.lTag(dL)},cont);
			}
			else{ $1.T.divL({wxn:'wrapx1',L:ThiS.Cols[i].t,Inode:$1.lTag(dL)},pare); }
		}
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:'/1/sysd/jsv',addGet:ThiS.vPost,loade:resp, jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && o.vid){
				hid.value =o.vid; //prp1,prp2
				o.k=o.vid; o.v=o.value;
				delete(o.vid); delete(o.value); delete(o.kObj);
				$JsV._upd(o,ThiS.kObj);
			}
		}},cont);
	}});
}
$JsV._upd=function(N,k){
	/* actualiza objeto, si N.k existe, sino definir rk */
	var tk=N.k; var e=0;
	if(!$JsV[k]){ $JsV[k]=[]; e++; }
	for(var i in $JsV[k]){
		if($JsV[k][i].k){
			if($JsV[k][i].k==tk){ $JsV[k][i]=N; e=0; break; }
			else{ e++;}
		}
		else if(i==tk){ $JsV[k][i]=N; e=0; break }
		else{ e++; }
	}
	if(e){ $JsV[k].push(N);}
}

$Tc={};
$Tc._o={};
$Tc._i=function(P){
	var kLix=P.kObj;
	var kau=(P.kau)?P.kau:'sysd.sumaster';
	$M.liAdd(P.liK,[
	{k:'tb.'+P.kObj,t:P.liTxtG, kau:kau,mdlActive:P.mdlActive, func:function(){
		var btnA=$1.T.btnFa({fa:'faBtnCt fa_plusCircle',textNode:'Nuevo',func:function(){ $M.to('tb.'+P.kObj+'.form'); }});
		$M.Ht.ini({fieldset:'Y',btnNew:btnA,func_pageAndCont:function(){ $Tc._o[kLix].get(); } });
	}},
	{k:'tb.'+P.kObj+'.form',t:P.liTxtF, kau:kau, func:function(){ $M.Ht.ini({func_cont:function(){ $Tc._o[kLix].form(); } }); }},
	]);
	delete(P.liK); delete(P.liTxtG); delete(P.liTxtF);
	$Tc._o[kLix]=new $Tc._c(P,true);
}
$Tc._c=function(P){
	/*api,Cols:[{t,k,T:{}]
	/#jsv.parGrC!!{vid}
	*/
	this.kObj=P.kObj;//itmWhs
	var Hash='tb.'+P.kObj+'.form';
	this.Hash=Hash;
	this.Cols=(P.Cols)?P.Cols:[];
	this.api=(P.api)?P.api:'/1/sysd/tc';
	this.vid=P.vid;//whsId,itemId,
	this.gSend='kObj='+P.kObj;
}
$Tc._c.prototype.get=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var vPost=$1.G.filter();
	$Api.get({f:ThiS.api,addGet:ThiS.gSend, inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var TB=[];
			for(var i in ThiS.Cols){
				TB.push({textNode:ThiS.Cols[i].t});
			}
			TB.unshift({textNode:''});
			var tb=$1.T.table(TB,0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var vid='vid:'+L.vid;
				$1.t('a',{'class':'fa fa-pencil',href:$M.to(ThiS.Hash,vid,'r')},td);
				for(var i in ThiS.Cols){
					var val=$1.setTag(ThiS.Cols[i],L);
					$1.t('td',val,tr);
				}
			}
		}
	}});
}
$Tc._c.prototype.form=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var Pa=$M.read();
	var vPost=(Pa.vid)?'vid='+Pa.vid:'';
	$Api.get({f:ThiS.api+'/form',addGet:ThiS.gSend,loadVerif:!Pa.vid, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'vid'},cont);
		if(Pa.vid){ hid.value=Pa.vid; }
		var pare=cont; var ln0=true;
		for(var i in ThiS.Cols){
			var taL=ThiS.Cols[i];
			var dL=(taL.T);
			dL.name=taL.k;
			dL.value=Jr[taL.k];
			wxn=(taL.wxn)?taL.wxn:'wrapx1';
			dL['class']=jsF;
			if(dL.fInode){ inode=dL.fInode(Jr); }
			else{ var inode=$1.lTag(dL); }
			if(taL.divLine){
				pare=$1.T.divL({divLine:1,wxn:wxn,L:taL.t,Inode:inode},cont);
			}
			else{ $1.T.divL({wxn:wxn,L:taL.t,Inode:inode},pare); }
		}
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:ThiS.api,addGet:ThiS.gSend,loade:resp, jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && o.vid){
				o.k=o.vid; o.v=o.value;
				hid.value =o.vid;
				delete(o.vid); delete(o.value);
				$Tc._upd(o,ThiS.kObj);
			}
		}},cont);
	}});
}
$Tc._upd=function(N,k){
	/* actualiza objeto, si N.k existe, sino definir rk */
	if(N.vid){ N.k=N.vid; }
	var tk=N.k; var e=0;
	if(!$Tb[k]){ $Tb[k]=[]; e++; }
	for(var i in $Tb[k]){
		if($Tb[k][i].k){
			if($Tb[k][i].k==tk){ $Tb[k][i]=N; e=0; break; }
			else{ e++;}
		}
		else if(i==tk){ $Tb[k][i]=N; e=0; break }
		else{ e++; }
	}
	if(e){ $Tb[k].push(N);}
}

/* Actualización de tables de datos */
$Tb._o={};
$Tb._i=function(P){
	var kLix=P.kObj;
	var kau=(P.kau)?P.kau:'sysd.sumaster';
	if(P.liK){ P.kMdl=P.liK; }
	$M.liAdd(P.kMdl,[
	{k:'tb.'+P.kObj,t:P.liTxtG, kau:kau,mdlActive:P.mdlActive, ini:{btnGo:'tb.'+P.kObj+'.form', gyp:function(){ $Tb._o[kLix].get(); } }
	},
	{k:'tb.'+P.kObj+'.form',t:P.liTxtF, kau:kau, ini:{g:function(){ $Tb._o[kLix].form(); }}},
	]);
	delete(P.liK); delete(P.liTxtG); delete(P.liTxtF);
	$Tb._o[kLix]=new $Tb._c(P,true);
}
$Tb._c=function(P){
	/*api,Cols:[{t,k,T:{}]
	/#jsv.parGrC!!{vid}
	*/
	this.kObj=P.kObj;//itmWhs
	var Hash='tb.'+P.kObj+'.form';
	this.Hash=Hash;
	this.Cols=(P.Cols)?P.Cols:[];
	this.api=(P.api)?P.api:'/1/sysd/tb';
	this.vid=P.vid;//whsId,itemId,
	this.gSend='kObj='+P.kObj;
}
$Tb._c.prototype.get=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var vPost=$1.G.filter();
	$Api.get({f:ThiS.api,addGet:ThiS.gSend, inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var TB=[];
			for(var i in ThiS.Cols){
				TB.push({textNode:ThiS.Cols[i].t});
			}
			TB.unshift({textNode:''});
			var tb=$1.T.table(TB,0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var vid='vid:'+L.vid;
				$1.t('a',{'class':'fa fa-pencil',href:$M.to(ThiS.Hash,vid,'r')},td);
				for(var i in ThiS.Cols){
					var val=$1.setTag(ThiS.Cols[i],L);
					$1.t('td',val,tr);
				}
			}
		}
	}});
}
$Tb._c.prototype.form=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var Pa=$M.read();
	var vPost=(Pa.vid)?'vid='+Pa.vid:'';
	$Api.get({f:ThiS.api+'/form',addGet:ThiS.gSend,loadVerif:!Pa.vid, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'vid'},cont);
		if(Pa.vid){ hid.value=Pa.vid; }
		var pare=cont; var ln0=true;
		for(var i in ThiS.Cols){
			var taL=ThiS.Cols[i];
			var dL=(taL.T);
			dL.name=taL.k;
			dL.value=Jr[taL.k];
			wxn=(taL.wxn)?taL.wxn:'wrapx1';
			dL['class']=jsF;
			if(dL.fInode){ inode=dL.fInode(Jr); }
			else{ var inode=$1.lTag(dL); }
			if(taL.divLine){
				pare=$1.T.divL({divLine:1,wxn:wxn,L:taL.t,Inode:inode},cont);
			}
			else{ $1.T.divL({wxn:wxn,L:taL.t,Inode:inode},pare); }
		}
		var resp=$1.t('div',0,cont);
		$Api.send({PUT:ThiS.api,addGet:ThiS.gSend,loade:resp, jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && o.vid){
				hid.value =o.vid; delete(o.vid);
				$Tb._upd(o,ThiS.kObj);
			}
		}},cont);
	}});
}
$Tb._upd=function(N,k){
	/* actualiza objeto, si N.k existe, sino definir rk */
	var tk=N.k; var e=0;
	if(!$Tb[k]){ $Tb[k]=[]; e++; }
	for(var i in $Tb[k]){
		if($Tb[k][i].k){
			if($Tb[k][i].k==tk){ $Tb[k][i]=N; e=0; break; }
			else{ e++;}
		}
		else if(i==tk){ $Tb[k][i]=N; e=0; break }
		else{ e++; }
	}
	if(e){ $Tb[k].push(N);}
}

/* Datos Sin Relación */
$Tb._iF=function(P){
	var kLix=P.kObj;
	$M.liAdd(P.liK,[
	{k:'tb.'+P.kObj,t:P.liTxtG, kau:P.kau, func:function(){
		$M.Ht.ini({fieldset:'Y',btnGo:'tb.'+P.kObj+'.form',func_pageAndCont:function(){ $Tb._o[kLix].get(); } });
	}},
	{k:'tb.'+P.kObj+'.form',t:P.liTxtF, kau:P.kau+'.write', func:function(){ $M.Ht.ini({func_cont:function(){ $Tb._o[kLix].form(); } }); }},
	]);
	delete(P.liK); delete(P.liTxtG); delete(P.liTxtF);
	$Tb._o[kLix]=new $Tb._cF(P,true);
}
$Tb._cF=function(P){
	this.kObj=P.kObj;//itmWhs
	var Hash='tb.'+P.kObj+'.form';
	this.Hash=Hash;
	this.Cols=(P.Cols)?P.Cols:[];
	this.api=P.api;
	this.vid=P.vid;//whsId,itemId,
	this.gSend='kObj='+P.kObj;
	this.EXP=(P.EXT)?P.EXT:{fileName:'Archivo'};
}

$Tb._cF.prototype.get=function(T){
	var cont=$M.Ht.cont; ThiS=this;
	$Api.get({f:ThiS.api,inputs:$Api.getFilter(),btnDisabled:T,loade:cont,func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); return false; }
		if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); return false; }
		var Rep={banCode:['Código',{k:'banCode'}]};
		Rep=ThiS.Cols;
		var TbD=$Doc.setCols(Jr.L,ThiS.Cols);
		var tbc=$1.t('div');
		TbD.Tb.unshift('');
		var tb=$1.T.table(TbD.Tb,0,tbc);
		var tBody=$1.t('tbody',0,tb);
		var lastR='';var ln=0;
		for(var i in Jr.L){ var L=Jr.L[i];
			if(ThiS.vid){ L.vid=L[ThiS.vid]; }
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',0,tr);
			var vid='vid:'+L.vid;
			$1.t('a',{'class':'fa fa-pencil',href:$M.to(ThiS.Hash,vid,'r')},td);
			for(var k in Rep){
				if(Rep[k]._tdNone){ continue; }
				var Lk=Rep[k][1];
				var lTag={textNode:L[k]};
				if(Lk){ lTag=$1.setTag(Lk,L); }
				$1.t('td',lTag,tr);
			}
		}
		if(!ThiS.EXP.ext){ ThiS.EXP.ext='xlsx'; }
		if(!ThiS.EXP.print){ ThiS.EXP.print='Y'; }
		var tb=$1.T.tbExport(tbc,ThiS.EXP);
		cont.appendChild(tb)
	}});
}
$Tb._cF.prototype.form=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var Pa=$M.read();
	var vPost=(Pa.vid)?'vid='+Pa.vid:'';
	$Api.get({f:ThiS.api+'/form',addGet:ThiS.gSend,loadVerif:!Pa.vid, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'vid'},cont);
		if(Pa.vid){ hid.value=Pa.vid; }
		var pare=cont; var ln0=true;
		for(var i in ThiS.Cols){
			var taL=ThiS.Cols[i][1];
			if(taL.TNO){ continue; }
			if(!taL.t){ taL.t=(ThiS.Cols[i][0].textNode)?ThiS.Cols[i][0].textNode:ThiS.Cols[i][0]; }
			var dL=(taL.T);
			dL.name=taL.k;
			dL.value=Jr[taL.k];
			wxn=(dL.wxn)?dL.wxn:'wrapx1';
			dL['class']=jsF;
			if(dL.divLine){
				pare=$1.T.divL({divLine:1,wxn:wxn,L:taL.t,Inode:$1.lTag(dL,0,Jr)},cont);
			}
			else{ $1.T.divL({wxn:wxn,L:taL.t,Inode:$1.lTag(dL,0,Jr)},pare); }
		}
		var resp=$1.t('div',0,cont);
		var tP={POST:ThiS.api,addGet:ThiS.gSend,loade:resp, jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && o.vid){
				hid.value =o.vid; delete(o.vid);
				$Tb._upd(o,ThiS.kObj);
			}
		}};
		if(Pa.vid){ tP.PUT=tP.POST; delete(tP.POST); }
		$Api.send(tP,cont);
	}});
}

$Tb._Massi={//Actualizar campos desde lista
form:function(Pa){ Pa=(Pa)?Pa:{};
	var cont=$M.Ht.cont;
	var jsF=$Api.Cls.LN;
	var fil=(Pa.filter);
	var apiR=Pa.api;
	var vPost=(Pa.vPost)?Pa.vPost:$1.G.filter();
	$Api.get({f:apiR, inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo==1){ $Api.resp(cont,Jr); }
		else{
			if(Jr.errNo==2){ Jr.L=[]; }
			var wList=$1.t('div',0,cont);
			var tb=$1.T.table([''],0,wList);
			var trH=$1.q('thead tr',tb);
			var tF=[''];
			var _F=Jr.F;
			/* tbHeads */
			for(var i in Pa.L){
				var LD=Pa.L[i][0];
				var tdx=$1.t('td',LD,trH);
			}
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){
				$Tb._Massi.addTr(Pa,Jr.L[i],tBody);
			}
			if(Pa.addLine!='N'){
				$1.T.btnFa({faBtn:'fa-plusCircle',textNode:'Añadir Nuevo',func:function(){
					$Tb._Massi.addTr(Pa,{},tBody);
				}},cont);
			}
			var resp=$1.t('p',0,cont);
			$Api.send({PUT:apiR,'class':'fa fa_save',jsBody:cont,title:'Guardar', loade:resp, func:function(Jr2){
					$Api.resp(resp,Jr2);
					if(!Jr2.errNo){ $Tb._Massi.form(Pa); }
				}
				},cont);
		}
	}});
},
addTr:function(Pa,L,tBody){
	var tr=$1.t('tr',{'class':'lineData '},tBody);
	tr.omit='Y';
	var td0=$1.t('td',{'class':'jsF'},tr);
	var td0Css='background-color:#0F0';
	td0.style=td0Css;
	/* tds con campos */
	for(var i2 in Pa.L){ var LD=$js.clone(Pa.L[i2][1]);
		var noEdit=(L.noEdit=='Y');
		var td=$1.t('td',{},tr);
		if(!noEdit){
			LD['class']=$Api.JS.clsLN;
		}
		LD.value=L[LD.k];
		var tagN=$1.lTag(LD,td);
		tagN.classList.add('_tbMassFie');
		tagN.AJs=(LD.AJsBase)?LD.AJsBase:{};
		if(LD.AJs){//Asignar
			for(var k in LD.AJs){
				var tk=(LD.AJs[k].k)?LD.AJs[k].k:LD.AJs[k];
				tagN.AJs[tk]=L[tk];
			}
		}
		var oldVal=LD.value;
		if(!noEdit){
			tagN.keyChange($Tb._Massi.trOmit,{P:{oldVal:oldVal,td:td0,tr:tr,fx:LD.fx}});
		}
	}
},
trOmit:function(T){
	T.P.tr.omit='Y';
	var td0Css='background-color:#0F0';
	if(T.P.oldVal!=T.value){ T.P.tr.omit='N';
		T.P.td.style='background-color:#FF0';
		T.P.tr.classList.add($Api.JS.clsL);
	}
	else{ T.P.td.style=td0Css; T.P.tr.classList.remove($Api.JS.clsL); }
	if(T.P.fx){

		T.P.fx({tr:T.P.tr,inps:$1.q('._tbMassFie',T.P.tr,'all')});
	}
}
}

/* tablas sistema */
$Sysd.Tb={};
$Sysd.Tbo={};
$Sysd.Tb._i=function(P){
	var kLix=P.kObj;
	var kau=(P.kau)?P.kau:'sysd.sumaster';
	if(P.liK){ P.kMdl=P.liK; }
	$M.liAdd(P.kMdl,[
	{k:'tb.'+P.kObj,t:P.liTxtG, kau:kau,mdlActive:P.mdlActive, ini:{btnGo:'tb.'+P.kObj+'.form', gyp:function(){ $Sysd.Tbo[kLix].get(); } }
	},
	{k:'tb.'+P.kObj+'.form',t:P.liTxtF, kau:kau, ini:{g:function(){ $Sysd.Tbo[kLix].form(); }}},
	]);
	delete(P.liK); delete(P.liTxtG); delete(P.liTxtF);
	$Sysd.Tbo[kLix]=new $Sysd.Tb_c(P,true);
}
$Sysd.Tb_c=function(P){
	/*api,Cols:[{t,k,T:{}]
	/#jsv.parGrC!!{vid}
	*/
	this.kMdl=P.kMdl;//ivt
	this.kObj=P.kObj;//ivtClass
	var Hash='tb.'+P.kObj+'.form';
	this.Hash=Hash;
	this.Cols=(P.Cols)?P.Cols:[];
	this.api=(P.api)?P.api:'/appi/private/sys/tb';
	this.vid=P.vid;//whsId,itemId,
	this.gSend='kMdl='+P.kMdl+'&kObj='+P.kObj;
	this.tbH=P.tbH; this.reqFields=P.reqFields;
	this.tdCols=P.tdCols; //td list
}
$Sysd.Tb_c.prototype.get=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var vPost=$1.G.filter();
	$Api.get({f:ThiS.api,addGet:ThiS.gSend, inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var TB=[];
			for(var i in ThiS.tdCols){
				TB.push(ThiS.tdCols[i].t);
			}
			TB.unshift({textNode:''});
			var tb=$1.T.table(TB,0,cont);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				var vid='vid:'+L.vid;
				L=$js.parse(L.jsd,{},L);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to(ThiS.Hash,vid,'r')},td);
				for(var i in ThiS.tdCols){
					var val=$1.setTag(ThiS.tdCols[i],L);
					$1.t('td',val,tr);
				}
			}
		}
	}});
}
$Sysd.Tb_c.prototype.form=function(P){
	var cont=$M.Ht.cont; var ThiS=this;
	var Pa=$M.read();
	var vPost=(Pa.vid)?'vid='+Pa.vid:'';
	$Api.get({f:ThiS.api+'/form',loadVerif:!Pa.vid, inputs:vPost,loade:cont,func:function(Jr){
		Jr=$js.parse(Jr.jsd,{},Jr);
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'vid'},cont);
		$Api.JS.addF({AJs:{kMdl:ThiS.kMdl,kObj:ThiS.kObj}},cont);
		if(Pa.vid){ hid.value=Pa.vid; }
		ThiS.tbH.unshift({L:'Nombre',wxn:'wrapx4',req:'Y',I:{lTag:'input',name:'value'}});
		ThiS.tbH.unshift({divLine:1,L:'Activo',wxn:'wrapx8',I:{lTag:'select',name:'actived',opts:$V.YN,noBlank:'Y'}});
		$Api.form2({api:ThiS.api,AJs:{},PUTid:Pa.vid,JrD:Jr,vidn:'vid',midTag:'Y',
		tbH:ThiS.tbH, jsF:'Y', reqFields:ThiS.reqFields,func:function(Jr2,o){
			if(!Jr2.errNo && o.vid){
				hid.value =o.vid; delete(o.vid);
				$Sysd.Tb_upd(o,ThiS.kObj);
			}
		}},cont);
	}});
}
$Sysd.TbUpd=function(k,O){
	if(O && O.uid){ O.k=O.uid; delete(O.uid); }
	return $Sysd.Tb_upd(O,k);
}
$Sysd.Tb_upd=function(N,k){
	/* actualiza objeto, si N.k existe, sino definir rk */
	var tk=N.k; var e=0;
	if(!$Tb[k]){ $Tb[k]=[]; e++; }
	for(var i in $Tb[k]){
		if($Tb[k][i].k){
			if($Tb[k][i].k==tk){ $Tb[k][i]=N; e=0; break; }
			else{ e++;}
		}
		else if(i==tk){ $Tb[k][i]=N; e=0; break }
		else{ e++; }
	}
	if(e){ $Tb[k].push(N);}
}

$Sysd.Jsv={
get:function(P){
	var cont=$M.Ht.cont;
	$Api.get({f:P.get, inputs:$1.G.filter(), loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else{
			var tb=$1.T.table(['','Nombre']); cont.appendChild(tb);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				var td=$1.t('td',0,tr);
				$1.t('a',{'class':'fa fa-pencil',href:$M.to(P.toEdit,'vid:'+L.vid,'r')},td);
				$1.t('td',{textNode:L.value},tr);
			}
		}
	}});
},
form:function(P){
	//form, put, V=variable que actualiza
	var cont=$M.Ht.cont; Pa=$M.read();
	var vPost=(Pa.vid)?'vid='+Pa.vid:'';
	$Api.get({f:P.form,loadVerif:!Pa.vid, inputs:vPost,loade:cont,func:function(Jr){
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:'vid'},cont);
		if(Pa.vid){ hid.value=Pa.vid; }
		var divL=$1.T.divL({divLine:1,wxn:'wrapx2',L:'Nombre',I:{tag:'input',type:'text',name:'value',value:Jr.value,'class':jsF}},cont);
		resp=$1.t('div',0,cont);
		$Api.send({PUT:P.put,loade:resp, jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && o.vid){
				hid.value =o.vid;
				$oB.upd({k:o.vid,v:o.value},P.V);
			}

		}},cont);
	}});
}
}


$Sysd.Mcnf={
get:function(Pa){
	var cont=$M.Ht.cont;
	$Api.get({f:'/1/sysd/mcnf',inputs:'mdl='+Pa.mdl,loade:cont,func:function(Jr){
		if(Jr.errNo){ return $Api.resp(cont,Jr); }
		var tb=$1.T.table(['Valor','Variable'],0,cont);
		var tBody=$1.t('tbody',0,tb);
		for(var i in Pa.Li){
			var O=Pa.Li[i];
			if(O.h1){
				$1.t('td',{textNode:O.h1,colspan:2,style:'backgroundColor:#DDD; fontWeight:bold;'},$1.t('tr',0,tBody));
				continue;
			}
			var tr=$1.t('tr',{'class':$Api.JS.clsL},tBody);
			var td=$1.t('td',0,tr);
			O['class']=$Api.JS.clsLN+' __acck'; O.name='value';
			O.value=Jr[O.k];
			var _k=O.k;
			O.AJs={accK:_k};
			$1.t('td',{textNode:O.v},tr);
			delete(O.k); delete(O.v);
			var tag=$1.lTag(O,td);
			tag.accK=_k;
		}
		$Api.send({PUT:'/1/sysd/mcnf',jsBody:tb,winErr:1,func:function(Jr){
			if(!Jr.errNo){
				var td=$1.q('.__acck',tb,'all');
				for(var i=0; i<td.length; i++){
					$Mdl.McnfDef(td[i].accK,td[i].value);
				}
			}
		}},cont);
	}});
}
}

var $_TB={
F:{},
o:function(tbk){
	if($_TB.F[tbk]){ return $_TB.F[tbk]; }
	else{ return {}; }
}
};

$1.xtag=function(tag,P,pare){
	L['x-tags']=tag; delete(L.xtag);
	return $1.xTag[tag](P,pare);
}
$1.xTag={}; //añadir itmSub=function()
$1.xTag.get=function(k,pare,n){
	tags=$1.q('[x-tags="'+k+'"]',pare,n);
	if(n=='all'){ return tags[n]; }
	else{ return tags; }
}
$1.xTag['docSeries']=function(P,pare){
	var divL=$1.T.sel({'class':P.jsF+' serieRow',name:'serieId',opts:$Tb.docSerie[P.tbSerie],noBlank:1},pare);
	var qSerie=$1.q('.serieRow',pare);
	if(qSerie){ qSerie.onchange=function(){ handNum(this); } }
	function handNum(qSerie){
		if(qSerie){
			var o=_gO(qSerie.value,$Tb.docSerie[P.tbSerie]);
			var div0=qSerie.parentNode;
			var clS='_serieHandNum';
			$1.delet($1.q('.'+clS,pare));
			if(o && o.numAuto=='N'){
				$1.T.divL({wxn:'wrapx10',L:'N°.',I:{tag:'input',type:'text','class':jsF+' '+clS,name:'docNum',value:P2.docNum}});
				$1.I.after(div,div0);
			}
		}
	}
	return divL;
}

$1.lTag=function(L,td,PDx){
	var PD=(PDx)?PDx:{};
	if($1.xTag[L.xtag]){/* definirlas donde apliquen */
		return $1.xtag(L.xtag,L,td);
	}
	if(PDx){
		if(PDx.func){ PD.func=PDx.func; }
		if(PDx.funcTag){ PD.funcTag=PDx.func; }
		delete(PDx.func); delete(PDx.funcTag);
		L.D=PDx
	}
	if(L.fText){ L=$1.setTag(L,PD,L); }
	var func=tdClick=null;
	if(L.func){ func=L.func; }
	if(L.tdClick){ tdClick=L.tdClick; }
	if(L.clone!='N'){ L=$js.clone(L); }
	L.func=func;
	if(tdClick){ L.tdClick=tdClick; }
	switch(L.format){
		case '$':
			if(L.value){ L.value=$Str.money(L.value); }
			if(L.textNode){ L.textNode=$Str.money(L.textNode); }
		break;
		case 'number':
			if(L.value){ L.value *=1; }
			if(L.textNode){ L.textNode *=1; }
		break;
	}
	delete(L.clone);
	var tag=L.tag; delete(L.tag);
	L.lTag='Y';
	if(L.selected){}
	else if((tag+'').match(/^(select|active)$/)){ L.selected=L.value; delete(L.value); }
	;
	if(tag=='funcTag' && typeof(L.funcTag)=='function'){ var tTag=L.funcTag(L,td); }
	else if(tag=='number'){ L.type='number'; L.inputmode='numeric'; var tTag=$1.t('input',L,td); }
	else if(tag=='month'){ L.opts=$V.dateMonths;
	L.selected=($2d.today.substr(5,2)); 
	var tTag=$1.T.sel(L,td); }
	else if(tag=='color'){ L.type='color';  var tTag=$1.t('input',L,td); }
	else if(tag=='$'){ L.type='text'; L.numberformat='mil'; var tTag=$1.t('input',L,td); }
	else if(tag=='date'){ L.type='date'; var tTag=$1.t('input',L,td); }
	else if(tag=='time'){ L.type='time'; L.placeholder='hh:mm';
		if(L.value){ L.value=L.value.substr(11,5); }
		var tTag=$1.t('input',L,td);
	}
	else if(tag=='check'){ var tTag=$1.T.check(L,td); }
	else if(tag=='attach'){ var tTag=Attach.tagFile(L,td); }
	else if(tag=='updFile'){ var tTag=$1.T.updFile(L,td); }
	else if(tag=='imgUpd'){ tTag=$1.T.imgUpd(L,td) }
	else if(tag=='disabled'){ L.type='text'; L.disabled='disabled'; L.readonly='readonly';
		var tTag=$1.t('input',L,td);
	}
	else if(tag=='YN'){ L.opts=[{k:'Y',v:'Si'},{k:'N',v:'No'}]; L.noBlank='Y'; var tTag=$1.T.sel(L,td); }
	else if(tag=='active'){ L.opts=[{k:'active',v:'Activo'},{k:'inactive',v:'Inactivo'}]; L.noBlank='Y'; var tTag=$1.T.sel(L,td);  }
	else if(tag=='select'){
		if(L.optEval && typeof(L.opts)=='string'){ eval('L.opts='+L.opts); }
		else if(typeof(L.opts)!='object'){ L.opts=eval(L.opts);}
		var tTag=$1.T.sel(L,td);
	}
	else if(tag=='apiSeaBox'){ var tTag=$Api.Sea.box(L,td); }
	else if(tag=='docNum'){ var tTag=$Doc.docNum(L,td); }
		else if(tag=='card'){ var tTag=$crd.Sea.get(L,td,PDx); }
	else if(tag=='userAssg'){
		L.opts=$Tb.ousr;  L.selected=L.value; delete(L.value);
		var tTag=$1.T.sel(L,td);
	}
	else if(tag=='cpr0'){
		var tTag=$crd.Fx.inpSeaPrs({_jsV:L._jsV,value:L.value,vPost:L.vPost,jsF:L.jsF},null,td);
	}
	else if(tag=='cpr'){ var tTag=$crd.Fx.boxCpr(L,td); }
	else if(tag=='crd'){ var tTag=$crd.Fx.boxCrd(L,td); }
	else if(tag=='slpAssg' || tag=='slp'){
		L.opts=$Tb.oslp; delete(L.value);
		var tTag=$1.T.sel(L,td);
	}
	else if(tag=='whsId'){
		L.opts=$Tb.itmOwhs; delete(L.value);
		var tTag=$1.T.sel(L,td);
	}
	else if(tag=='workSede'){
		L.opts=$Tb.owsu; delete(L.value);
		var tTag=$1.T.sel(L,td);
	}
	else if(tag=='gfiFdp'){
		L.opts=$Tb.gfiOfdp;  delete(L.value);
		var tTag=$1.T.sel(L,td);
	}
	else if(tag=='input' && !L.type){ L.type='text'; var tTag=$1.t('input',L,td); }
	else if(tag=='boxText'){
		L.type='text'; L.readonly='readonly';
		var tTag=$1.t('input',L,td);
		tTag.onclick=function(){ PD.func(this,td); }
	}
	else if(tag=='span'){ var tTag=$1.t('span',L,td); }
	else if(tag=='ckLabel'){ var tTag=$1.T.ckLabel(L,td); }
	else if(tag=='txt'){ var tTag=$1.t('textNode',L.textNode,td); }
	else if(tag=='btnDate'){
		var Ll={};
		if(!L.f){ L.f='mmm d'; }
		if(L.time){ L.f='mmm d H:i'; Ll.time='Y'; }
		L.divBlock='Y';//name,f=mmm d,
		if(!L.I){ L.I={}; }
		L.I.style='width:100%';
		var tTag=$2dW.btn(L,0,Ll);
	}
	else if(PDx && PDx.funcTag){
		var tTag=PDx.funcTag(L,PD);
	}
	else{ var tTag=$1.t(tag,L,td); }
	return tTag;
}
$1.setTag=function(L2,LD,nD){
	var nD=(nD)?nD:{};
	var kF=L2.k;
	var kTxt=(L2.kTxt)?L2.kTxt:'textNode'; /* v */
	var format=(L2.kTy)?L2.kTy:kF;
	if(L2.format){ format=L2.format; }
	var txt=LD[kF]; var textIf=false;
	if(L2._def && $js.isNull(txt,'')){ txt=L2._def; }
	if(L2.textIf && LD){ nText=L2.textIf(LD,L2);
		if(nText!=undefined){ textIf=true; }
	}
	if(textIf==true){ txt=nText; }
	else if(L2.fText){ txt=L2.fText(LD); }
	else if(L2._fText){ txt=L2._fText(LD); }
	else if(L2.dateText){
		if(L2.dateText!='Y'){ L2.dateText='mmm d'; }
		txt=$2d.f(txt,L2.dateText);
	}
	else if(L2.docBy){ txt=$Doc.by(L2.docBy,LD); }
	else if(L2.docByUpd){ txt=$Doc.by(L2.docByUpd,LD,'update'); }
	else if(L2._docNum){ txt=$Doc.docNum(LD,0,1); }
	else if(L2._gD){ txt=_g(txt,L2._gD,''); }
	else if(L2._gTb){ txt=_g(txt,$Tb[L2._gTb],''); }
	else if(L2._gTbV){ txt=_g(txt,$TbV[L2._gTbV],''); }
	else if(L2._JsV){ txt=_g(txt,$JsV[L2._JsV],''); }
	else if(L2._V){ txt=_g(txt,$V[L2._V],''); }
	else if(L2._g){
		if(typeof(L2._g)=='string'){ L2._g=eval(L2._g); }
		txt=_g(txt,L2._g,'');
	}
	else if(L2._gV){
		if(typeof(L2._gV)=='string'){ L2._gV=eval(L2._gV); }
		txt=_gO(txt,L2._gV,'v',' ');
	}
	if(L2.numAbs=='Y'){ txt=Math.abs(txt*1); }
	nD[kTxt]=txt;
	if(format=='$$'){ format='$'; txt=(txt==0)?0:txt; }

	if(format=='price' || format=='$'){ nD[kTxt]=$Str.money(txt*1); }
	else if(format=='num2Text'){ nD[kTxt]=$js.num2Text(txt*1);; }
	else if(format=='quantity' || format=='number'){ nD[kTxt]=txt*1;; }
	else if(format=='udm'){ nD[kTxt]=_g(txt,Udm.O,''); }
	if(L2.Tag){ for(var i in L2.Tag){ nD[i]=L2.Tag[i]; } }
	if(L2._btnGo){ L2._btnFo.P=LD; nD={node:$1.T.btnFa(L2._btnGo)}; }
	if(L2.fTag){ nD={node:L2.fTag(LD)}; } //fTag
	if(L2._fNode){ nD={node:L2._fNode(LD)}; } //fTag
	return nD;
}
$js.get0=function(L,def){
	var L0=(def)?def:{};
	for(var i in L){ L0=L[i]; break; }
	return L0;
}
$1.qParentTo=function(q,tag){/* Obtener padre superior */
	if(!tag.parentNode){ return tag; }
	var rt=$1.q(q,tag.parentNode);
	if(rt){ return rt; }
	else if(tag.parentNode && tag.parentNode.parentNode){ return $1.qParentTo(q,tag.parentNode.parentNode); }
}
$1.uniNode=function(div,pare){
	var ide=div.getAttribute('id');
	var old=$1.q('#'+ide)
	if(!pare && old){ pare=old.parentNode; }
	if(pare){
		if(old){ pare.replaceChild(div,old); }
		else{ pare.appendChild(div); }
	}
	return div;
}
$1.addBtnFas=function(Lx,pare,LD){
	for(var i in Lx){
		$1.T.btnFa(Lx[i],pare);
	}
}

$1.addrLine=function(L,ty){
	if(!L){ return ''; }
	var l='';
	var city=(ty=='plain')?L.city:_g(L.city,$V_Mmag,'');
	var dpto=(ty=='plain')?L.county:false;
	if(L.address){ l += L.address; }
	if(city){ l += ', '+city; }
	if(dpto){ l += ', '+dpto; }
	return l;
}

$1.dateMov={
cls:'_1dateMov',
line:function(P,pare){
	var intr=false;
	var cont=$1.t('div',{'class':$1.dateMov.cls+'_wrap'},pare);
		var a=$1.T.btnFa({fa:'fa-chevron-left',title:'Anterior',func:function(T){
			upDat(det,'-6days');
		}},cont);
		var det=$1.t('span',{'class':'fa fa-calendar '+$1.dateMov.cls},cont);
		det.value=$2d.today; det.vPost='';
		upDat(det);
		var b=$1.T.btnFa({fa:'fa-chevron-right',title:'Siguiente',func:function(T){
			upDat(det,'+8days');
		}},cont);
		//func actualiza
	function upDat(dTag,mov){
		var nDate=(mov)?$2d.add(dTag.value,mov):dTag.value;
		dTag.value=$2d.weekB(nDate);
		dTag.d1=dTag.value;
		dTag.d2=$2d.weekE(dTag.value);
		dTag.gData='date1='+dTag.d1+'&date2='+dTag.d2;
		dTag.innerText =$2d.f(dTag.value,'mmm d')+' a '+$2d.f(dTag.d2,'mmm d');
		if(mov){
		clearInterval(intr);
		intr=setInterval(function(){ clearInterval(intr);
			if(P.func){ P.func(dTag); }
		},500);
		}
	}
	return cont;
}
}

$Filt={
cls:'__Filt_',
clsBtn:'__Filt_btn',
clswList:'__Filt_wList',
h1:0, main:0, mid:0, btnAdd:0, wList:0,
filtL:[],filtFunc:{},
func:false,
ini:function(P,cont){
	var cont=(cont)?cont:$M.Ht.cont;
	$Filt.h1=$Filt.main=$Filt.btnAdd=$Filt.wList=$Filt.mid=0;
	if(P.h1){ $Filt.h1=$1.t('h4',{textNode:P.h1,'class':'__1WP_h1 head1'},cont) }
	if(P.main){
		$Filt.main=$1.t('div',{'class':'__1WP_main'},cont);
		if(P.main.tagName){ $Filt.main.appendChild(P.main); }
	}
	$Filt.mid=$1.t('div',{'class':'__1WP_mid',style:'padding:0.5rem 0; position:relative;'},cont);
	$Filt.wList=$1.t('div',{'class':'__1WP_wList'},cont);
},
btnFa:function(P,pare){
	var pare=(pare)?pare:$Filt.mid;
	var div=$1.q('.__1WP_btnAdd',pare);
	if(!div){ var div=$1.t('div',{style:'display:inline-block','class':'__1WP_btnAdd'},pare); }
	$1.clear(div);
	$1.T.btnFa(P,div);
},
hider:function(pare){
	var fls=$1.q('.'+$Filt.clswList,pare);
	if(fls){ fls.classList.toggle('noDisplay'); }
},
form:function(P){ var cls='__1WP_filter';
	var realCont=(P.cont)?P.cont:$Filt.mid;
	var div=$1.q('.'+cls,realCont);
	if(P.clear){ $1.delet(div); return true; }
	if(P.reset){ $1.delet(div); }
	if(!div){
		div=$1.t('div',{style:'display:inline-block; position:relative;','class':cls},realCont);
		var btnFa=$1.t('div',{'style':'display:inline-block','class':'__1WP_btnAdd'},div);
		if(P.btnNew){ $Filt.btnFa(P.btnNew,div); }
		var btn=$1.t('span',{'class':'faBtn fa fa-filter '+$Filt.clsBtn,textNode:'Filtros'},div);
		btn.onclick=function(){ $Filt.hider(div); }
		if(P.active){ btn.style.color='#0F0'; }
		var fls=$1.t('div',{'class':'noDisplay '+$Filt.clswList,style:'position:absolute; left:0; top:100%; z-index:1; background-color:#FFF; border:0.0625rem solid #000; padding:0.25rem;'},div);
		$Filt.v1(P.Li,{wh:P.wh,one:1,func:$Filt.filtFunc},fls);
	}
},
get:function(pare){
	return $1.G.inputs(pare,'jsFiltVars2');
},
v1:function(F,P,pare){ var clsId='__1Filt_v1';
	var P=(P)?P:{}; var jsF=(P.jsF)?P.jsF:'jsFiltVars2';
	if(P.one){
		if($1.q('.'+clsId,pare)){ return true; }
	}
	var wx=$1.t('div',{'class':clsId},pare);
	var tb=$1.T.table(['Campo','Valor Buscado']); wx.appendChild(tb);
	var tBody=$1.t('tbody',0,tb);
	for(var i in F){ var L=F[i];
		var tr=$1.t('tr',0,tBody);
		var t1=(L.t && L.t.tagName)?{node:L.t}:{textNode:L.t};
		$1.t('td',t1,tr);
		var td2=$1.t('td',{},tr);
		tdA(L,td2);
	}
	$1.T.btnFa({fa:'faBtnCt fa-search',textNode:'Actualizar',func:function(Pd){
		$Filt.hider(pare.parentNode);
		if(P.func){ P.func(Pd); }
	}},wx);
	$1.T.btnFa({fa:'faBtnCt fa-close',textNode:'Borrar',func:function(){ $1.clearInps(wx); }},wx);
	function tdA(Lx,td){
		if(Lx.tag){ Lx=[Lx]; }
		else{ Lx=Lx.TA; }
		for(var i in Lx){ L=Lx[i];
			if(P.wh!='N'){ L.name='wh['+L.name+']'; }
			if(L['class']){ L['class']=L['class']+' '+jsF; }
			else { L['class']=jsF; }
			$1.lTag(L,td);
		}
	}
	return tb;
},
vTb:function(P,pare){ var clsId='__1Filt_v1';
	var P=(P)?P:{}; var jsF=(P.jsF)?P.jsF:'jsFiltVars2';
	if(P.one){
		if($1.q('.'+clsId,pare)){ return true; }
	}
	var wx=$1.t('div',{'class':clsId},pare);
	var tb=$1.T.table(['Campo','Valor Buscado']); wx.appendChild(tb);
	var tBody=$1.t('tbody',0,tb);
	var _TBF=$_TB.o(P.tbk);
	var F=[];
	for(var kF in _TBF){ F.push({k:kF,v:_TBF.t}); }
	$1.T.btnFa({fa:'fa_plusCircle',textNode:'Añadir Linea',func:function(){
		trA(F);
	}},wx);
	$1.T.btnFa({fa:'faBtnCt fa-search',textNode:'Actualizar',func:P.func},wx);
	$1.T.btnFa({fa:'faBtnCt fa-close',textNode:'Borrar',func:function(){ $1.clearInps(wx); }},wx);
	function trA(L){
		var tr=$1.t('tr',0,tBody);
		var td=$1.t('td',0,tr);
		var sel=$1.T.sel({opts:F,noBlank:1},td);
		sel.onchange=function(){ tdA(_TBF,td2); }
		var td2=$1.t('td',{},tr);
	}
	function tdA(Lx,td){
		if(Lx.tag){ Lx=[Lx]; }
		else{ Lx=Lx.TA; }
		for(var i in Lx){ L=Lx[i];
			if(P.wh!='N'){ L.name='wh['+L.name+']'; }
			if(L['class']){ L['class']=L['class']+' '+jsF; }
			else { L['class']=jsF; }
			$1.lTag(L,td);
		}
	}
	return tb;
}
}

$Report={
form:function(Dx){
	var wrap = $1.t('div');
	var wrapList = $1.t('div',0,wrap);
	var n = 0;
	$Api.get({f:'/sys/repv2/form', inputs:'reportId='+Dx.reportId, loade:wrapList, func:function(Jr){
		if(Jr.descrip !=''){ $1.t('div',{'class':'pre',textNode:Jr.descrip,style:'padding:0.25rem; border:0.0625rem solid #CCC;'},wrapList); }
		var GETq = '/sys/repv2/query';
		var Fi = {};
		if(Jr.jsF){ Fi = JSON.parse(Jr.jsF); }
		var Fik={};
		var nL = 0;
		var wFilt=$1.t('div',{id:'_sysReportFilt'});
		var wFilt=$1.T.fieldset(wFilt); wrapList.appendChild(wFilt);
		var lw={L:[
		{textNode:'Resultados',actived:'Y',winClass:'winResults' },
		{textNode:'Campos',winClass:'winFields' }
		]};
		var rTab=$1.Menu.tabs(lw);
		var wFields=rTab.winFields;
		$1.t('h6',{textNode:'Selección de campos'},wFields);
		var tbWf=$1.T.table(['','Campo','Inf']); wFields.appendChild(tbWf);
		var tBody=$1.t('tbody',0,tbWf);
		var tbFie=[]; var jsF='jsFields';
		/* Dibujar Filtros y encabezado tabla */
		for(var i in Fi){
			var tConf = {}; L=Fi[i];
			if(!L.txt){ L.txt=L.k; }
			if(!L.f || L.f=='L'){
				Fik[L.k]=L;
				var tr=$1.t('tr',0,tBody);
				$1.T.ckLabel({checked:(L.visible),I:{'class':jsF,name:'cv'+L.k}},$1.t('td',0,tr));
				$1.t('td',{textNode:L.txt},tr);
				var ftl=(L.FT=='f')
				?L.qk.replace(/\((.*)$/,'')
				:L.qk.replace(/\.(.*)$/,'');
				$1.t('td',{textNode:ftl},tr);
			}
			if(L.fText){ L.fText=new Function('D','return '+L.fText+'(D)'); }
			if(L._g){
				L._g = (typeof(L._g)== 'string')?eval(L._g):L._g;
			}
			if(L.opts){
				L.opts = (typeof(L.opts) == 'string')?eval(L.opts):L.opts;
			}
			if(!L.f){ continue; }
			var req=(L.req=='Y')?'Y':false;
			var fName=(L.fn)?L.fn:L.qk;
			if(L.tag == 'select'){
				L.opts = (typeof(L.opts) == 'string')?eval(L.opts):L.opts;
				tConf = {wxn:'wrapx2',req:req,L:L.txt,I:{tag:L.tag,'class':'jsFields',name:'FIE['+fName+']',opts:L.opts,noBlank:L.noBlank,selected:L.value} };
			}
			else{
				tConf = {wxn:'wrapx2',req:req,L:L.txt,I:{tag:L.tag,type:L.type,'class':'jsFields',name:'FIE['+fName+']',placeholder:((L.placeholder)?L.placeholder:''),value:L.value}};
			}
			if(n==0 || n%2==0){ tConf.divLine = true;
				var divLine = $1.T.divL(tConf,wFilt);
			}
			else{ $1.T.divLinewx(tConf,divLine); }
			n++;
		}
		/* Obtener Reporte */
		var resp = rTab.winResults;
		var iSend = $Api.send({textNode:'Generar Reporte',POST:GETq, getInputs:function(){ return 'reportId='+Dx.reportId+'&'+$1.G.inputs(wrap); }, loade:resp, func:function(Jq2){
			rTab.li_winResults.click();
			var wrapAll=$1.t('div',0);
			if(Jq2.errNo){ $Api.resp(resp,Jq2); }
			else{
				var fileName = (Jq2.fileName)?Jq2.fileName:'Archivo de Reporte';
				n=0;
				var dH=(typeof(Jq2.jsH)=='string')?eval(Jq2.jsH):false;
				if(dH){
					$1.Tb.trCols(dH,{cols:8},wrapAll);
				}
				var tb = $1.T.table([]); wrapAll.appendChild(tb);
				var tr0 = $1.q('thead tr',tb);
				tr0.innerText='';
				var tBody = $1.t('tbody',0,tb);
				var n=1; var tdn=1; var ini=0;
				if(Jq2.kOrder){ Jq2.L=$js.sortNum(Jq2.L,{k:Jq2.kOrder}); }
				for(var n1 in Jq2.L){
					var tr = $1.t('tr',0,tBody); var Le=Jq2.L[n1];
					for(var n2 in Le){ var FK=Fik[n2];
						if(FK.f=='Y'){ continue; }
						if(ini==0){
							$1.t('td',{textNode:FK.txt},tr0);
						}
						var te=Le[n2];
						switch(FK.format){
							case '$': te=$Str.money(te); break;
							case 'number': te=te*1; break;
						}
						if(FK.opts){ te=_g(te,FK.opts); }
						if(FK._g){ te=_g(te,FK._g); }
						if(FK.fText){ te= FK.fText(Le); }
						$1.t('td',{textNode:te,'class':tbCal.tbCell,ncol:tdn},tr);
					} ini=1;
					tdn++;
				}
				wrapAll = $1.T.tbExport(wrapAll,{tbXls:tb,ext:'xlsx',print:true,fileName:fileName});
				resp.appendChild(wrapAll);
				if($Soc && $Soc.softFrom){
					$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; padding:1rem 0;'},wrapAll);
				}
			}
		}},wrap);
		wrap.appendChild(rTab._top);
	}
	});
	$1.Win.open(wrap,{winTitle:Dx.text,onBody:true,winId:'reportWinSys'});
}
}

$V.dateRepRang =[{k:'N',v:'No Repetir'},
{k:'daily',v:'Dia'},{k:'weekly',v:'Semana'},
{k:'monthly',v:'Mes'},{k:'monthlyDay',v:'Mes el dia'},
{k:'yearly',v:'Año'},{k:'yearlyDay',v:'Año el día'},
];
$V.dateRepOrdi=[{k:'1',v:'Primer/a'},{k:'2',v:'Segundo/a'},{k:'3',v:'Tercer/a'},{k:'4',v:'Cuarto/a'},{k:'l',v:'Último/a'}];
$V.dateRepDays=[{k:'l',v:'Lunes'},{k:'m',v:'Martes'},{k:'x',v:'Miercoles'},{k:'j',v:'Jueves'},{k:'v',v:'Viernes'},{k:'s',v:'Sabado'},{k:'d',v:'Domingo'}];
$V.dateRepSel=[{k:'l',v:'Lunes'},{k:'m',v:'Martes'},{k:'x',v:'Miercoles'},{k:'j',v:'Jueves'},{k:'v',v:'Viernes'},{k:'s',v:'Sabado'},{k:'d',v:'Domingo'},{k:'week',v:'Semana'}];
$DateRep={
readTxt:function(rep){
	var sep=(rep)?(rep+'').split('.'):[];
	var t=rep;
	if(sep[0]){
		switch(sep[0]){
			case 'daily': t='Diariamente '; break;
			case 'weekly': t='Semanalmente cada '+_g(sep[1],$V.dateRepDays); break;
			case 'monthlyDay': t='El dia '+sep[1]+' de cada mes.'; break;
			case 'monthly': t='El '+_g(sep[1],$V.dateRepOrdi)+' '+_g(sep[2],$V.dateRepSel)+' de cada mes'; break;
			case 'yearlyDay': t='El '+sep[1]+' dia de cada año'; break;
			case 'yearly': t='Anualmente '+_g(sep[1],$V.dateRepOrdi)+' '+_g(sep[2],$V.dateRepSel); break;
		}
	}
	return t;
},
change:function toCh(P,wrap){
	var sels=$1.q('.dateRepTag',wrap,'all');
	tk='';
	if(sels){
		var tk=$1.gVal(sels[0]);
		tk += (sels[1])?'.'+$1.gVal(sels[1]):'';
		tk += (sels[2])?'.'+$1.gVal(sels[2]):'';
		if(P.func){ P.func(tk); }
	}
	return tk;
},
form:function(P,cont){
	var sep=(P.repeatKey)?P.repeatKey.split('.'):[];
	if(P.inpRep){ P.inpRep.value=P.repeatKey; }
	var wrap=$1.t('fieldset',{},cont);
	$1.t('legend',{textNode:'Repetir'},wrap);
	var div0=$1.t('div',{style:'display:inline-block;'},wrap);
	$1.t('b',{textNode:'Cada',style:'display:block'},div0);
	var sel=$1.T.sel({opts:$V.dateRepRang,selected:sep[0],'class':'dateRepTag'},div0);
	sel.onchange=function(){
		$DateRep.draw(this.value,P,lis);
		$DateRep.change(P,wrap);
	}
	var lis=$1.t('div',{style:'display:inline-block;'},wrap);
	$DateRep.draw(sel.value,P,lis);
	return wrap;
},
draw:function(k,P,cont){
	P=(P)?P:{};
	cont.innerHTML='';
	var sep=(P.repeatKey)?P.repeatKey.split('.'):[];
	P.s2=sep[1];
	P.s3=sep[2];
	var wrape=$1.t('div',{style:'display:inline-block; marginLeft:0.5rem'},cont);
	if(k=='daily'){}
	else if(k=='weekly'){
		var div0=$1.t('div',{style:'display:inline-block;'},wrape);
		$1.t('b',{textNode:'Dia',style:'display:block'},div0);
		var sel=$1.T.sel({opts:$V.dateRepDays,selected:P.s2,'class':'dateRepTag',noBlank:'Y'},div0);
		sel.onchange=function(){ $DateRep.change(P,cont.parentNode); }
	}
	else if(k=='monthlyDay'){
		var opts=[];
		for(var i=1; i<=31; i++){ opts.push({k:i,v:i}); }
		var div0=$1.t('div',{style:'display:block;'},wrape);
		var sel=$1.T.sel({opts:opts,noBlank:'Y',selected:P.s3,'class':'dateRepTag'},div0);
		sel.onchange=function(){ $DateRep.change(P,cont.parentNode); }
	}
	else if(k=='monthly'){
		var div0=$1.t('div',{style:'display:inline-block;'},wrape);
		$1.t('b',{textNode:'El/La',style:'display:block'},div0);
		var sel=$1.T.sel({noBlank:'Y',opts:$V.dateRepOrdi,selected:P.s2,'class':'dateRepTag'},div0);
		sel.onchange=function(){ $DateRep.change(P,cont.parentNode); }
		var sel=$1.T.sel({noBlank:'Y',opts:$V.dateRepSel,selected:P.s3,style:'marginLeft:0.5rem','class':'dateRepTag'},div0);
		sel.onchange=function(){ $DateRep.change(P,cont.parentNode); }
	}
	else if(k=='yearlyDay'){
		var opts=[];
		for(var i=1; i<=31; i++){ opts.push({k:'.'+i,v:i}); }
		var div0=$1.t('div',{style:'display:block;'},wrape);
		$1.t('b',{textNode:'N°.',style:'display:block'},div0);
		var sel=$1.t('input',{type:'number',inputmode:'numeric',min:1,max:366,value:P.s3,'class':'dateRepTag'},div0);
		sel.keyChange(function(){ $DateRep.change(P,cont.parentNode); })
	}
	else if(k=='yearly'){
		var div0=$1.t('div',{style:'display:inline-block;'},wrape);
		$1.t('b',{textNode:'El/La',style:'display:block'},div0);
		var sel=$1.T.sel({noBlank:'Y',opts:$V.dateRepOrdi,selected:P.s2,'class':'dateRepTag'},div0);
		sel.onchange=function(){ $DateRep.change(P,cont.parentNode); }
		var sel=$1.T.sel({noBlank:'Y',opts:$V.dateRepSel,selected:P.s3,style:'marginLeft:0.5rem','class':'dateRepTag'},div0);
		sel.onchange=function(){ $DateRep.change(P,cont.parentNode); }
	}
	return wrape;
}
}
