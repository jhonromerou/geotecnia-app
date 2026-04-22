// package: unclicc.com.fe
$V.comun = {Y:'Sí',N:'No'};
$V.repLen=[{k:'parcial',v:'Parcial'},{k:'full',v:'Completo'}];
$V.docTT=[];//k:gvtSin,v:Facturas,prp1:gvt

$Doc={
tT:{tt:{b:'tt.view',t:'TT Doc'}},
ttAdd:function(O){
	for(var k in O){ $Doc.tT[k]=O[k]; }
},
ttGo:function(tt,P,pare,ke){
	var td=($Doc.tT[tt])?$Doc.tT[tt]:false;
	if(ke){  a = td.b+'.'+ke; }
	else{  a = td.b+'.view'; }
	var pr='';
	pr+=(P.docEntry)?'docEntry:'+P.docEntry:'';
	var ta=$1.t('a',{href:$M.to(a,pr,'r'),textNode:P.docEntry,title:td.t},pare);
	return ta;
},
Serie:{},
go:function(serie,ke,P,r){
	P=(P)?P:{};
	var a=($Doc.a[serie] && $Doc.a[serie].b)?$Doc.a[serie].b:serie;
	var pr='';
	pr+=(P.docEntry)?'docEntry:'+P.docEntry:'';
	switch(ke){
		case 'f' : a +='.form'; break;
		case 'v' : a +='.view'; break;
		default :
		 if(ke){ a +='.'+ke; }
		break;
	}
	if(r){ $M.to(a,pr); }
	else{ return $M.to(a,pr,'r'); }
},
gt:function(serie,ke,P,r){ return $Doc.go(serie,ke,P,'r'); },
to:function(serie,add,P,r){
	P=(P)?P:{};
	var a=($Doc.a[serie] && $Doc.a[serie].b)?$Doc.a[serie].b:serie;
	var pr='';
	pr+=(P.docEntry)?'docEntry:'+P.docEntry:'';
if(add){ a+=add; }/* .form */
	return $M.to(a,pr,r);
},
to:function(serie,add,P,r){
	P=(P)?P:{};
	var a=($Doc.a[serie] && $Doc.a[serie].b)?$Doc.a[serie].b:serie;
	var pr='';
	pr+=(P.docEntry)?'docEntry:'+P.docEntry:'';
if(add){ a+=add; }/* .form */
	return $M.to(a,pr,r);
},
vPName:function(P,D,ln){
	var r='';
	var ln=(ln)?ln:false;
	delete(P.ln);
	for(var k in P){//[priceList], [{k:priceList,kv:price}]
		var kd=P[k]; var kv=P[k];
		if(typeof(P[k])=='object'){
			kd=(P[k].k)?P[k].k:kd;
			kv=(P[k].kv)?P[k].kv:kd;
		}
		var vd=(D && D[kv])?D[kv]:'';
		r += (ln)?ln+'['+kd+']='+vd+'&':kd+'='+vd+'&';
	}
	r=r.substr(0,r.length-1);
	return r;
},
by:function(f,L,upd){
	if(upd){ L.userId=L.userUpd; L.dateC=L.dateUpd; }
	if(!L){ L=f; }
	var t='Por '+_g(L.userId,$Tb.ousr);
	var uText=(L.userId==$0s.userId)?'Por mi':'Por '+_g(L.userId,$Tb.ousr);
	switch(f){
		default : t=uText+', '+$2d.f(L.dateC,'mmm d H:iam'); break;
		case 'd': t=$2d.f(L.dateC,'mmm d H:iam'); break;
		case 'userDateUpd': t=uText+', '+$2d.f(L.dateUpd,'mmm d H:iam'); break;
		case 'userName': t=_g(L.userId,$Tb.ousr); break;
	}
	return t;
},
NullRequest:{},//Y-N
a:{
ocrd:{a:'crd.view',kl:'cardId'},
},
o:function(k,L,P){

},
href:function(k,L,P){
	var pare=P; var P=(P)?P:{};
	var r='nulle'; var t='?';
	var format=''; var id='??';
	if(P.pare){ pare = P.pare;}
	var serieText=$V.docSerieType[k];
	var onDoc=_gO(k,$V.docTT,null);
	if(onDoc){
		$Doc.a[k]=onDoc;
		if(!onDoc.to){ $Doc.a[k].to=k; }
		if(!onDoc.t){ $Doc.a[k].t=onDoc.v; }
		serieText=$Doc.a[k].t;
	}
	else if($V.docSerieType[k] && $V.docSerieType[k].t){//new 4sep2020
		if(!$V.docSerieType[k].to){ $V.docSerieType[k].to=k; }
		$Doc.a[k]=$V.docSerieType[k];
		serieText=$V.docSerieType[k].t;
	}
	if($Doc.a[k]){ var E=$Doc.a[k];
		if(E.to){ E.a=E.to+'.view'; }
		var id=L.docEntry;
		var pars='';
		if(E.kt && L[E.kt]){ text=L[E.kt]; format='kt'; }
		// pars!!{c:val}
		if(E.kl){
			if(P.kl){ pars = E.kl+':'+L[P.kl]; id=L[P.kl]; }
			else{ pars = E.kl+':'+L[E.kl]; id=L[E.kl]; }
		}
		else if(P.A){
			for(var e in A){ pars += A[e]+':'+L[A[e]]+','; }
			pars = pars.replace(/\,$/,'');
		}
		else{ pars = 'docEntry:'+L.docEntry; }
		if(P.pars){ pars += ','+P.pars; }
		r =$M.to(E.a,pars,'r');
	}
	if(P=='to'){ document.location.href = r; }
	/* format */
	if(P.format){ format=P.format; }
	switch(format){
		case 'serie': text=serieText; break;
		case 'kt': break;
		default : text = id;
	}
	if(P.hrefText){ text=P.hrefText; }
	if(L.hrefText){ text=L.hrefText; }
	var title=serieText+' ('+k+')';
	if(pare=='r' || P.r){ return r; }
	if(pare=='to'){ document.location=r; return r; }
	if(r=='nulle'){
		var t=$1.t('a',{textNode:' '+text,serieType:k,title:title,'class':'fa fa_arrowNext'});
	}
	else{
		var t=$1.t('a',{href:r,textNode:' '+text,title:title,serieType:k,'class':'fa fa_arrowNext'});
	}
	if(pare && pare.appendChild){ pare.appendChild(t); }
	return t;
},
cancel:function(P){
	var jsF=(P.jsF)?P.jsF:'jsFields';
	var nullR=$jSoc['NullRequestOpts_'+P.serieType];
	if(nullR && typeof(nullR)=='object' && nullR.length>0){
		var divL=$1.T.divL({divLine:1, wxn:'wrapx1',L:{textNode:'Motivo de Anulación'},I:{tag:'select',kIsV:'Y',sel:{'class':jsF,name:'lineMemo'},opts:nullR}});
	}
	else if(P.reqMemo!='N'){
		var divL=$1.T.divL({divLine:1, wxn:'wrapx1',L:{textNode:'Detalles'},I:{tag:'textarea','class':jsF,name:'lineMemo',placeholder:'Motivó de Anulación'}});
	}
	var winTitle=(P.winTitle)?P.winTitle:'Anular Documento (v.1)';
	var text=(P.text)?P.text:'Se va anular el documento';
	$1.Win.confirm({noClose:1, btnText:'Anular *', winTitle:winTitle,text:text, Inode:divL, func:function(resp,wrapC,btn){
		$Api.put({f:P.api,btnDisabled:btn,loade:resp, inputs:'docEntry='+P.docEntry+'&'+$1.G.inputs(wrapC,jsF), func:function(Jr){ $Api.resp(resp,Jr); } });
	}});
},
close:function(P){
	var jsF=(P.jsF)?P.jsF:'jsFields';
	if(P.reqMemo!='N'){
		var divL=$1.T.divL({divLine:1, wxn:'wrapx1',L:{textNode:'Detalles'},I:{tag:'textarea','class':jsF,name:'lineMemo',placeholder:'Motivo de Cierre'}});
	}
	var winTitle=(P.winTitle)?P.winTitle:'Cerrar Documento';
	var text=(P.text)?P.text:'Se va a cerrar el documento';
	$1.Win.confirm({noClose:1,btnText:'cerrar *', winTitle:winTitle,text:text, Inode:divL, func:function(resp,wrapC,btn){
		$Api.put({f:P.api,btnDisabled:btn,loade:resp,inputs:'docEntry='+P.docEntry+'&'+$1.G.inputs(wrapC,jsF), func:function(Jr){ $Api.resp(resp,Jr); } });
	}});
},
statusDefine:function(P){
		var jsF=(P.jsF)?P.jsF:'jsFields';
		P.jsF=jsF;
		var divW=$1.t('div');
	if(P.Opts){
		$1.T.divL({divLine:1, wxn:'wrapx1',L:{textNode:'Seleccione'},I:{tag:'select',sel:{'class':jsF,name:'fieK'},opts:P.Opts,selected:P.selected}},divW);
	}
	if(P.node){ divW.appendChild(P.node); }
	if(P.fTag){ P.fTag(divW,P); }
	else if(P.reqMemo!='N'){
		$1.T.divL({divLine:1, wxn:'wrapx1',L:{textNode:'Detalles'},I:{tag:'textarea','class':jsF,name:'lineMemo'}},divW);
	}
	var winTitle=(P.winTitle)?P.winTitle:'Definir Estado Documento';
	var text=(P.text)?P.text:'Se van a definir estos datos';
	$1.Win.confirm({noClose:1,btnText:'Aceptar *', winTitle:winTitle,text:text, Inode:divW, InodeBot:P.InodeBot, func:function(resp,wrapC,btn){
		$Api.put({f:P.api,btnDisabled:btn,loade:resp, inputs:'docEntry='+P.docEntry+'&'+$1.G.inputs(wrapC,jsF), func:function(Jr){ $Api.resp(resp,Jr); } });
	}});
},
formSerie:function(P2){P2=(P2)?P2:{};
	cont=(P2.cont)?P2.cont:$M.Ht.cont;
	var contData=(P2.contData)?P2.contData:cont;
	if($V.docSerieType == undefined || !$V.docSerieType[P2.serieType]){
		$Api.resp(cont,{errNo:3,text:'El tipo de serie no está definido para generar el formulario: '+P2.serieType});
		return true;
	}
	jsF=(P2.jsF)?P2.jsF:'jsFields3';
	var nr=0; var Jr=P2.Jr;
	opts=P2.serieType;
	if(typeof(opts)=='string'){ opts={}; opts[P2.serieType]= $V.docSerieType[P2.serieType]; }
	var divL=$1.T.divL({divLine:1,wxn:'wrapx10',L:'Serie',I:{tag:'select',sel:{'class':jsF,name:'serieType'},opts:opts,noBlank:1}},cont);
		var inpDoc=$1.t('input',{type:'text','class':jsF,name:'docEntry',value:P2.docEntry,disabled:'disabled'});
	var tCont=divL;
	$1.T.divL({wxn:'wrapx10',L:{textNode:'N°.'},Inode:inpDoc},divL);
	for(var l in P2.Li){ dL=P2.Li[l];//fType, divL,
		if(dL.divLine){ tCont=cont; }//agrega cont
		var fType=(dL.fType)?dL.fType:'divL'; delete(dL.fType);
		switch(fType){
			case 'user':{
				divL=$1.T.divL({wxn:'wrapx10',L:'Usuario',I:{tag:'input',type:'text',value:$0s.userName,disabled:'disabled'}},tCont);
			break; }
			case 'date':{
				dL.wxn=(dL.wxn)?dL.wxn:'wrapx8';
				if(!dL.L){ dL.L='Fecha'; }
				var def={tag:'input','class':jsF,name:dL.name,type:'date',value:dL.value};
				if(!dL.I){ dL.I={}; }
				for(var id in def){ dL.I[id]=def[id]; }
				divL=$1.T.divL(dL,tCont);
			break;}
			case 'crd':{
			var sea=$Sea.input(null,{api:((dL.api)?dL.api:'crd.all'),'class':jsF,req:dL.req, vPost:{cardId:dL.cardId,cardName:dL.cardName}, defLineText:dL.cardName, inputs:dL.inputs, fPars:dL, func:function(L,inp,fPars){
				inp.O={vPost:$js.encUri({cardId:L.cardId,cardName:L.cardName})};
			if(fPars.replaceData=='Y'){ $Sea.replaceData(L,cont); }
			}});
			divL=$1.T.divL({divLine:dL.divLine,wxn:dL.wxn,L:dL.L,Inode:sea},tCont);
			break;}
			default:{//divL
				divL=$1.T.divL(dL,tCont);
			break;}
		}
		if(dL.divLine){ tCont=divL; }//agrega siguientes en divL
	}
	if(P2.middleCont){
		cont.appendChild(P2.middleCont);//table
	}
	var resp=$1.t('div',0,cont);
	var api=(P2.api)?P2.api:'';
	var addInp=(P2.addInputs)?'&'+P2.addInputs:'';
	if(P2.POST || P2.GET || P2.PUT || P2.DELETE){
		Prs={jsBody:P2.jsBody,/* send to JSON */
			getInputs:function(){
			if(P2.apiInputs){ return $Api.inputs(cont,jsF)+addInp; }
			else{ return $1.G.inputs(cont,jsF)+addInp; }
		}, loade:resp, respDiv:resp, func:function(Jr2){
			if(Jr2.docEntry){ inpDoc.value=Jr2.docEntry; }
			$ps_DB.response(resp,Jr2);
			if(!Jr2.errNo){ if(P2.func){ P2.func(Jr2); } }
		}};
		if(P2.PUT){ Prs.PUT=P2.PUT; }
		else if(P2.DELETE){ Prs.DELETE=P2.DELETE; }
		else if(P2.POST){ Prs.POST=P2.POST; }
		$Api.send(Prs,cont);
	}
	else{
		Prs={f:api, getInputs:function(){ return 'docEntry='+P2.docEntry+'&'+$1.G.inputs(contData,jsF)+addInp; }, loade:resp, respDiv:resp, func:function(Jr2){
			if(Jr2.docEntry){ inpDoc.value=Jr2.docEntry; }
			$ps_DB.response(resp,Jr2);
			if(!Jr2.errNo){ if(P2.func){ P2.func(Jr2); } }
		}};
		var btnSend=$1.T.btnSend({textNode:'Guardar Documento'},Prs);
	cont.appendChild(btnSend);
	}
},
abrr:function(k,L){/*Abreviar */
	if($Doc.a[k]){ var E=$Doc.a[k];
	}
	return k;
},
};
/* Doc.v3 */
$Doc.IDtd=function(P,id){ //´poner id
	//tb o tr, p=posic columna, id=val
	css1='backgroundColor:#CCC;';
	if(P.tb){
		var tr=$1.q('thead tr',P.tb);
		var td=$1.t('th',{textNode:'ID',style:css1});
	}
	else if(P.tr){
		var tr=P.tr;
		var td=$1.t('td',{textNode:id,style:css1});
	}
	if(P.p>0){
		P.p=P.p-1;
		tr.insertBefore(td,tr.childNodes[P.p]);
	}
	else{ tr.appendChild(td); }
	return td;
}
$Doc.Cls={
trL:'_docTrL',
trLnum:'_docTrLnum'
}
$Doc.maxTr=function(tb,maxi,P){
	var P=(P)?P:{};
	var len=$1.q('.'+$Doc.Cls.trL,tb,'all');
	var ok=false;
	P.text=(P.text)?P.text:'No se puede añadir más lineas. Máximo '+maxi+'.';
	if(len && len.length>=maxi){ ok=true; $1.Win.message({errNo:3,text:P.text}); }
	return ok;
}
$Doc.colsTable=function(L0,Rep,k1){
	var k1=(typeof(k1)!='undefined')?k1:1;
	/* var Rep={erType:['Tipo',{k:'erType',_gTbV:'gfiPdcErType'
		_A:1, siempre asi no exista
	*/
	var Tb=[];
	L0=$js.get0(L0);
	for(var n in Rep){
		var L1=(Rep[n][k1])?Rep[n][k1]:{};
		var k=L1.k;
		if(L1._A || typeof(L0[k])!='undefined'){ Tb.push(Rep[n][0]); }
		else{ delete(Rep[n]); }
	}
	return {Tb:Tb};
}
$Doc.setCols=function(L0,Cols,P){
	var P=(P)?P:{};
	var k1=(typeof(P.k1)!='undefined')?P.k1:1;
	var Tb=[];
	L0=$js.get0(L0);
	for(var n in Cols){
		var L1=(Cols[n][k1])?Cols[n][k1]:{};
		var k=L1.k;
		delete(Cols[n]._tdNone);
		if(L1._A || typeof(L0[k])!='undefined'){ Tb.push(Cols[n][0]); }
		else{ Cols[n]._tdNone='Y'; }
	}
	return {Tb:Tb};
}
$Doc.ttCnf={};/*
btnsTop:{ks:'print,logs,statusN,',icons:'Y',Li:Gvt.Pdn.OLg},

*/
$Doc.docNumTr=function(L,pare,txt){
	L.docEntry=L.tr;
	return $Doc.docNum(L,pare,txt);
}
$Doc.docNum=function(L,pare,txt){
	var tbk=(L.tt)?L.tt:null;
	var tbSerie=$Doc.TbSerie.get(tbk,L.serieId);
	if(tbSerie){
		var v=$Doc.TbSerie.txtNum(tbSerie,L);
		var t=$1.t('a',{href:$Doc.go(tbk,'v',L),'class':'fa fa_eye',textNode:v},pare);
	}
	else{
		t=$1.t('a',{href:$Doc.go(tbk,'v',L),'class':'fa fa_eye',textNode:' '+L.docEntry},pare);
	}
	//devolver texto
	if(txt){ t=t.innerText; }
	return t;
};
$Doc.TbSerie={
/*gvtInv:{go:gvtInv, abbr:'Fact. Venta'} */
a:function(P,L,pare){
	var tbSerie=$Doc.TbSerie.get(P.tbSerie,L.serieId);
	if(tbSerie){
		var v=$Doc.TbSerie.txtNum(tbSerie,L);
		var t=$1.t('a',{href:$Doc.go(P.tbSerie,'v',L),'class':'fa fa_eye',textNode:v},pare);
	}
	else{
		var t=$1.t('a',{href:$Doc.go(P.tbSerie,'v',L),'class':'fa fa_eye',textNode:' '+L.docEntry},pare);
	}
	return t;
},
txtNum:function(Ser,L,def){
	if(Ser){
		var v=(Ser.srCode)?Ser.srCode+'-':'-';
		v +=(Ser.resBef)?Ser.resBef:'';
		v +=L.docNum;
		v +=(Ser.resAfter)?Ser.resAfter:'';
	}
	else{ v=(def)?def:'?'; }
	return v;
},
get:function(tt,serieId){
	var Sr=false;
	if($Tb.docSerie[tt]){
		Sr=_gO(serieId,$Tb.docSerie[tt]);
	}
	return Sr;
}
};
$Doc.setSerie=function(){

}
$Doc.getTbSerie=function(tt,serieId){
	return $Doc.TbSerie.get(tt,serieId);
}

$Doc.tb99=function(P){
	var wrap=$1.t('div');
	var vPost='serieType='+P.serieType+'&docEntry='+P.docEntry;
	if(P.vPost){ vPost='&'+P.vPost; }
	$Api.get({f:P.api,inputs:vPost,loade:wrap,func:function(Jr){
		if(Jr.errNo){ $Api.resp(wrap,Jr); }
		else if(Jr.L && Jr.L.errNo){ $Api.resp(wrap,Jr.L); }
		else{
			function sText(X){
				var t='';
				switch(X.fiek){
					case 'docStatus' : t='Estado actualizado a '+_g(X.fiev,$V.docStatusAll); break;
					case 'dateC' : t='Creado'; break;
					case 'dateUpd' : t='Actualizado'; break;
					case 'update' : t='Actualizado'; break;
				}
				return t;
			}
			var wTi=$1.t('div',{'class':'vTimeLine'},wrap);
			for(var i in Jr.L){ L=Jr.L[i];
				var cssCol='';
				if(L.fiek=='docStatus' && L.fiev=='N'){ cssCol=' bf-danger'; }
				else if(L.fiek=='update'){ cssCol=' bf-warning'; }
				var w1=$1.t('div',{'class':'vTimeLine-item'},wTi);
				$1.t('span',{'class':'vTimeLine-item-ico dot'+cssCol},w1);
				var w1c=$1.t('div',{'class':'vTimeLine-item-content'},w1);
				$1.t('div',{textNode:sText(L)},w1c);
				var ti=$1.t('div',0,w1c);
				$1.t('i',{'class':'fa fa-clock-o',textNode:L.dateC},ti);
				$1.t('span',{textNode:'\u0020\u0020'},ti);
				$1.t('i',{'class':'fa fa-user',textNode:_g(L.userId,$Tb.ousr)},ti);
				if(L.lineMemo){ $1.t('div',{'class':'tfItalic',textNode:L.lineMemo},w1c); }
			}
			return wTi;

			var tb=$1.T.table(['Fecha','Usuario','Campo','Valor','Detalles']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.dateC},tr);
				$1.t('td',{textNode:_g(L.userId,$Tb.ousr)},tr);
				$1.t('td',{textNode:L.fiek},tr);
				$1.t('td',{textNode:L.fiev},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
			}
			tb=$1.T.tbExport(tb,{ext:'xlxs',fileName:'Logs de Documento'});
			wrap.appendChild(tb);
		}
	}});
	$1.Win.open(wrap,{winTitle:'Logs de Documento',winSize:'medium',onBody:1});
}
$Doc.tbRel1=function(P){
	var wrap=$1.t('div');
	var vPost='ott='+P.tbSerie+'&docEntry='+P.docEntry;
	if(P.vPost){ vPost='&'+P.vPost; }
	$Api.get({f:P.api,inputs:vPost,loade:wrap,func:function(Jr){
		if(Jr.errNo){ $Api.resp(wrap,Jr); }
		else if(Jr.L && Jr.L.errNo){ $Api.resp(wrap,Jr.L); }
		else{
			function sText(X){
				var t='';
				if(L.otr==P.tbSerie){ t='Basado en '; }
				else if(L.otr==P.tbSerie){ t='Basado en '; }
				return t;
			}
			var wTi=$1.t('div',{'class':'vTimeLine'},wrap);
			for(var i in Jr.L){ L=Jr.L[i];
				var cssCol='';
				var w1=$1.t('div',{'class':'vTimeLine-item'},wTi);
				$1.t('span',{'class':'vTimeLine-item-ico dot'+cssCol},w1);
				var w1c=$1.t('div',{'class':'vTimeLine-item-content'},w1);
				if(L.tt==P.tbSerie){
					var dtd=$1.t('div',{textNode:'Origen '},w1c);
					$Doc.href(L.ott,{docEntry:L.otr},{pare:dtd,format:'serie'});
				}
				else{
					var dtd=$1.t('div',{textNode:'Destino '},w1c);
					$Doc.href(L.tt,{docEntry:L.tr},{pare:dtd,format:'serie'});
				}
				var ti=$1.t('div',0,w1c);
				$1.t('i',{'class':'fa fa-clock-o',textNode:L.dateC},ti);
				$1.t('span',{textNode:'\u0020\u0020'},ti);
				$1.t('i',{'class':'fa fa-user',textNode:_g(L.userId,$Tb.ousr)},ti);
				if(L.lineMemo){ $1.t('div',{'class':'tfItalic',textNode:L.lineMemo},w1c); }
			}
			return wTi;

			var tb=$1.T.table(['Fecha','Usuario','Campo','Valor','Detalles']);
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ L=Jr.L[i];
				var tr=$1.t('tr',0,tBody);
				$1.t('td',{textNode:L.dateC},tr);
				$1.t('td',{textNode:_g(L.userId,$Tb.ousr)},tr);
				$1.t('td',{textNode:L.fiek},tr);
				$1.t('td',{textNode:L.fiev},tr);
				$1.t('td',{textNode:L.lineMemo},tr);
			}
			tb=$1.T.tbExport(tb,{ext:'xlxs',fileName:'Relación a Documento'});
			wrap.appendChild(tb);
		}
	}});
	$1.Win.open(wrap,{winTitle:'Logs de Documento',winSize:'medium',onBody:1});
}

$Doc.form=function(P2){ P2=(P2)?P2:{};
	if(!P2.tbSerie){ return $Doc.formv0(P2); }
	if(P2.tbLines && P2.tbLines.tagName){ return $Doc.form0(P2); }
	cont=(P2.cont)?P2.cont:$M.Ht.cont;
	var contData=(P2.contData)?P2.contData:cont;
	jsF=(P2.jsF)?P2.jsF:$Api.JS.cls;
	var nr=0; var Jr=P2.Jr;
	var handNum=false;
	if(P2.go){ } //m
	else if(P2.tbSerie!='N'){
		P2.go=P2.tbSerie;
		P2.serieOpts=$Tb.docSerie[P2.tbSerie];
		var divL=$1.T.divL({divLine:1,wxn:'wrapx10',L:'Serie',I:{tag:'select','class':jsF+' serieRow',name:'serieId',opts:P2.serieOpts,noBlank:1}},cont);
		var qSerie=$1.q('.serieRow',cont);
		if(qSerie){ qSerie.onchange=function(){ handNum(); } }
	}
	if(P2.tbSerie=='N'){ $1.delet(divL); }
	if(P2.docEdit && P2.POST){
		P2.PUT=P2.POST; delete(P2.POST);
		$Api.JS.addF({name:'docEntry',value:P2.docEdit},cont);
		if(qSerie){
			qSerie.setAttribute('disabled','disabled');
			qSerie.name='';
			qSerie.classList.remove(jsF);
		}
	}
	if(P2.AJs){ for(var k in P2.AJs){
		$Api.JS.addF({name:k,value:P2.AJs[k]},cont);
	}}
	var tCont=divL; //serieId
	handNum=function(){
		if(qSerie){
			var o=_gO(qSerie.value,$Tb.docSerie[P2.tbSerie]);
			var div0=qSerie.parentNode;
			var clS='_serieHandNum';
			var antEx=$1.q('.'+clS,cont);
			if(antEx){ $1.delet(antEx.parentNode); }
			if(o && o.numAuto=='N'){
				var div=$1.T.divL({wxn:'wrapx10',L:'N°.',I:{tag:'input',type:'text','class':jsF+' '+clS,name:'docNum',value:P2.docNum}});
				$1.I.after(div,div0);
			}
		}
	}
	handNum();
	if(P2.HLs){ P2.tbH={L:P2.HLs}; }
	if(P2.tbH){// L{ creados con lTag }
		var manual=false;
		if(P2.tbH.kTb=='N' || !P2.tbH.kTb){ manual=true; }
		if(!manual && !$DocTb.kTb[P2.tbH.kTb]){ $1.Win.message({text:'kTb no ha sido definido en la matriz para usar $Doc.form()-tbH. (M:'+manual+')'}); }
		else{
			if(!manual){ var nFo=$js.clone($DocTb.kTb[P2.tbH.kTb]); }
			for(var l in P2.tbH.L){ var Ld=P2.tbH.L[l];
				if(Ld.noAdd===false){ continue; }/* omitir si no debe añadirse, ejemplo bodega si mdl ivt */
				delete(Ld.noAdd);
				var dL=(Ld.manual=='Y' || manual)?Ld:nFo[Ld.k];//fType, divL,
				delete(Ld.manual);
				if(!dL.I){ dL.I={}; }
				for(var i3 in Ld.I){ dL.I[i3]=Ld.I[i3]; }
				for(var i2 in Ld){
					if(i2!=='I'){dL[i2]=Ld[i2]; }
				}
				var newLine=(dL.divLine || dL.nL);
				if(newLine){ tCont=cont; }//agrega cont
				if(dL.lTag){  dL.I.tag=dL.lTag; }
				if(dL.I.lTag){  dL.I.tag=dL.I.lTag; }
				if(dL.I['class']){ dL.I['class']=jsF+' '+dL.I['class']; }
				if(!dL.I['class']){ dL.I['class']=jsF; }
				if((dL.I.tag=='ckLabel') && dL.I.I){ dL.I.I['class']=jsF; }
				if(dL.lTag){ delete(dL.lTag);
					dL.Inode=$1.lTag(dL.I); delete(dL.I);
				}
				//add
				if(dL.lt=='D'){
					if(newLine){ divT2=$1.t('div',0,cont); }
					$1.lTag(dL.I,divT2);
				}
				else if(dL.Inode){ divL=$1.T.divL(dL,tCont); }
				else{ divL=$1.T.divL(dL,tCont); }
				if(newLine){ tCont=divL; }//agrega siguientes en divL
			}
		}
	}
	if(P2.Ls){ /* Lineas definidas */
		if(P2.Ls.D && P2.Ls.D.errNo==1){
			$Api.resp($1.t('div',{'class':'docLines1'}),P2.Ls.D);
		}
		else{
			var tb=$1.T.table($Doc.Ln.ths(P2.Ls));
			var tBody=$1.t('tbody',0,tb);
			if(P2.Ls.D && !P2.Ls.D.errNo){ for(var i in P2.Ls.D){//P2.D=Jr.L
				$Doc.Ln.tds(P2.Ls.D[i],P2.Ls,tBody);
			}}
			var tb=$1.T.fieldset(tb,{L:'Lineas'});
			cont.appendChild(tb);
			$1.T.btnFa({btnFa:'fa_plusCircle',textNode:'Añadir Linea',func:function(){
				$Doc.Ln.tds({},P2.Ls,tBody);
			}},tb);
		}
	}
	if(P2.midCont){ cont.appendChild(P2.midCont); }
	if(P2.addHtml){ for(var i in P2.addHtml){ cont.appendChild(P2.addHtml[i]); } }
	if(P2.tbL){ //Lineas Form 
		P2.tbL.jsF=jsF;
		P2.tbL.itmAdd='N';
		var Rd=$DocTb.ini(P2.tbL);
		cont.appendChild(Rd.fieldset);
	}
	if(P2.botHtml){ for(var i in P2.botHtml){ cont.appendChild(P2.botHtml[i]); } }
	var resp=$1.t('div',0,cont);
	var api=(P2.api)?P2.api:'';
	var addInp=(P2.addInputs)?'&'+P2.addInputs:'';
	if(P2.Forms){ // Lineas adicionales con divLine
		var dForms=$1.t('div',{'class':'DocForm_forms'},cont);
		for(var i in P2.Forms){
			var div=$1.t('div',{'class':'docFormsN_'+i},dForms);
			if(P2.Forms[i].divL){
				for(var i2 in P2.Forms[i].divL){
					var Lx=P2.Forms[i].divL[i2];
					Lx.Inode=$1.lTag(Lx.I);
					var divL2=$1.T.divL(Lx);
					if(Lx.divLine){ div.appendChild(divL2); tCont=divL2; }
					else{ tCont.appendChild(divL2); }

				}
			}
			else{
				var Lx=P2.Forms[i];
				if(Lx.L && Lx.L.errNo==1){ $Api.resp(div,Lx.L); }
				if(Lx.L && Lx.L.errNo){ Lx.L=[]; }
				if(Lx.sortBy){ Lx.L=$js.sorBy(Lx.sortBy,Lx.L); }
				var Rd=$DocTb.ini(Lx);
				div.appendChild(Rd.fieldset);
			}
		}
	}
	//Send Info
	if(P2.POST || P2.GET || P2.PUT || P2.DELETE){
		Prs={jsBody:cont, reqFields:P2.reqFields,
			loade:resp, respDiv:resp, errWrap:resp, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			$1.T.msgs(Jr2,resp);
			if(!Jr2.errNo){
				var vto='v';
				if(P2.goV){ vto=P2.goV; }
				if(P2.go && P2.func){ P2.funcx=function(){ $Doc.go(P2.go,vto,Jr2,1); P2.func(Jr2,P2,o); } }
				else if(P2.go){ P2.funcx=function(){ $Doc.go(P2.go,vto,Jr2,1);} }
				if(P2.funcx){ P2.funcx(Jr2,P2,o); }
				else if(P2.func){ P2.func(Jr2,P2,o); }
			}
		}};
		if(P2.PUT){ Prs.PUT=P2.PUT; }
		else if(P2.DELETE){ Prs.DELETE=P2.DELETE; }
		else if(P2.POST){ Prs.POST=P2.POST; }
		$Api.send(Prs,cont);
		if(P2.funcAdd){
			P2.funcAdd(cont,P2);
		}
	}

	$1.t('div',{style:'fontSize:9px;',textNode:'versión 2.0'},cont);
	if(P2.calcDue=='Y'){ $Doc.Fx.calcDue(cont,true); }
},
$Doc.Ln={
	//jsF,xMov,xNum=N,AJs,xDel=N
	ths:function(R){
		var Tbs=[];
		if(R.xMov){ Tbs.push(''); }
		if(R.xNum!='N'){ Tbs.push(''); }
		for(var n in R.L){
			Tbs.push(R.L[n].th);
		}
		if(R.xDel!='N'){ Tbs.push(''); }
		return Tbs;
	},
	tds:function(L,R,tBody){
		var jsF=(R.jsF)?R.jsF:$Api.JS.cls;
		if(R.uniqLine){
			unk='';
			for(var k in R.uniqLine){ unk +=L[R.uniqLine[k]]+'_'; }
			var tr=$Htm.uniqLine(unk,tBody,'ele');
			if(tr){
				qty=$1.q('.'+tbCal.trQty,tr);
				if(qty){ qty.value=qty.value*1+1; }
				$DocTb.docTotal(R);
				return false;
			}
		}
		var tr=$1.t('tr',{'class':$Doc.Cls.trL+' '+jsF+'-L '+tbCal.trLine},tBody);
		if(R.uniqLine){ $Htm.uniqCls(unk,tr); }
		if(R.xMov){
			var td=$1.t('td',0,tr);
			$1.T.btnFa({fa:'fa-caret-up',title:'Mover Arriba',func:function(T){
				$1.Move.to('before',T.parentNode.parentNode,{rev:'Y'});
			}},td);
			$1.T.btnFa({fa:'fa-caret-down',title:'Mover Abajo',func:function(T){
				$1.Move.to('next',T.parentNode.parentNode,{rev:'Y'});
			}},td);
		}
		if(R.xNum!='N'){
			var nn=($DocTb[R.xNum])?$DocTb[R.xNum]:$DocTb.n;
			$1.lTag({textNode:nn},$1.t('td',{'class':$Doc.Cls.trLnum},tr));
		}
		var jsN=jsF+'-N';
		if(R.AJs){ /* Datos adicionales  {a:tr, k:docEntry} */
			var nA={};
			for(var i9 in R.AJs){ k9=R.AJs[i9];
			var kn=(k9.a)?k9.a:k9;
			var kl=(k9.k)?k9.k:k9;
				if(L[kl]){
					nA[kn]=L[kl];
				}
			}
			$1.t('input',{type:'hidden','class':jsN,AJs:nA},tr);
		}
		for(var n in R.L){
			var PD=R.L[n];
			var kf=PD.k; var kTy=PD.kTy;
			var tF=$js.clone(PD); delete(tF.th);//ths
			if(PD.funcText && L[kf]){ L[kf]= PD.funcText(L); }
			else if(PD.funcText){ L[kf]= PD.funcText(L); };
			if(tF.lTag=='span' || tF.lTag=='txt'){ tF.textNode= L[kf]; }
			else{ tF.value=L[kf];}
			var td=$1.t('td',0,tr);
				tF.name=(tF.name)?tF.name:tF.k;
			/* Solo obtener valores de campo para estos */
			var addCls=jsN;
			tF['class']=(tF['class'])?tF['class']+' '+addCls:addCls;
			tF.tag=tF.lTag;
			var tag=$1.lTag(tF,td);
			if(PD.setData){ PD.setData(tag,L); }
			if(PD.keyChange){ tag.keyChange(PD.keyChange); }
			if(tF.noCls && tag.classList){ tag.classList.remove(jsN); }
		}
		if(R.xDel!='N'){
			var td=$1.t('td',0,tr);
			if(L.id && R.xDel!='x'){
				$1.T.ckLabel({t:'Eliminar',I:{'class':jsN,name:'delete',AJs:{id:L.id}},P:tr,func:function(ck,T){
					if(ck=='Y'){ T.P.classList.remove(tbCal.trLine); }
					else if(ck=='N'){  T.P.classList.add(tbCal.trLine); }
					$DocTb.docTotal(R);
				}},td);
			}
			else{
				$1.T.btnFa({fa:'fa_close',title:'Eliminar Linea',P:{tr:tr,L:L},func:function(T){
					if(typeof(R.xDel)=='function'){ R.xDel(T.P.L); }
					$1.delet(T.P.tr);
					$DocTb.docTotal(R);
				}},td);
			}
		}
		return tr;
	}
}
$Doc.liBtn=function(Li,L,D){
	this.add=function(k,P2){
		P2=(P2)?P2:{};
		if(P2.perms && !$M.perms(P2.perms)){ return false; }
		var nD=$js.clone(D);
		nD.docEntry=L.docEntry;
		if(P2.text){ nD.text =nD.text; }
		if(P2.addText && nD.text){ nD.text +=' '+nD.addText; }
		else if(P2.addText){ nD.text =' '+nD.addText; }
		if(k=='N' && L.canceled=='N'){
			nD.api=D.api+'/statusCancel';
			if(!nD.text){ nD.text='Se va anular el documento'; }
			Li.push({k:'statusN',plus:P2.plus,ico:'fa fa_prio_high',textNode:' Anular Documento', P:L, func:function(T){ $Doc.statusDefine(nD); } });
		}
		else if(k=='del'){
			P2.L=L; P2.k='statusN'; P2.ico='fa fa_prio_high';
			P2.textNode=' Eliminar Documento';
			Li.push(P2);
		}
		else if(k=='C' && L.canceled=='N' && L.docStatus!='C'){
			nD.api=D.api+'/statusClose';
			if(!nD.text){ nD.text='Se va cerrar el documento'; }
			Li.push({k:'statusC',plus:P2.plus,ico:'fa fa-lock',textNode:' Cerrar Documento', P:L, func:function(T){ $Doc.statusDefine(nD); } });
		}
		else if(k=='E' && P2.canEdit){
			if(P2.func){ Li.push({k:'edit',plus:P2.plus,ico:'fa fa-pencil',textNode:' Modificar', P:L, func:P2.func})}
			else{ Li.push({k:'edit',plus:P2.plus,ico:'fa fa-pencil',textNode:' Modificar', P:L, func:function(T){ $Doc.go(nD.tbSerie,'f',T.P,1); } }); }
		}
		else if(k=='L'){
			nD.api=D.api+'/tb99';
			nD.serieType=D.tbSerie;
			Li.push({k:'logs',plus:P2.plus,ico:'fa fa-history',textNode:' Logs de Documento', P:L, func:function(T){ $Doc.tb99(nD); } });
		}
		else if(k=='R'){
			nD.api=D.api+'/tbRel1';
			nD.tbSerie=D.tbSerie;
			Li.push({k:'logs',plus:P2.plus,ico:'fa fa-chain',textNode:' Relaciones', P:L, func:function(T){ $Doc.tbRel1(nD); } });
		}
		else if(k=='AC' && $Mdl.status('gfiAcc')){
			Li.push({k:'viewDac',plus:P2.plus,ico:'fa fa-file-o',textNode:' Contabilización',func:function(T){ Gfi.Dcc.quickView({tt:nD.tbSerie,tr:nD.docEntry}); }});
		}
		else if(k=='v'){
			Li.push({ico:'fa fa-eye',textNode:' Ver', P:L, func:function(T){ $Doc.go(nD.tbSerie,'v',T.P,1); } });
		}
		else if(k=='href'){
			Li.push({k:P2.k,ico:P2.ico,textNode:P2.textNode,P:L, func:function(T){
				a=$1.t('a',{href:P2.href,target:'_BLANK'});
				a.click();
			}});
		}
		else if(k=='down'){
			Li.push({k:P2.k,ico:P2.ico,textNode:P2.textNode,P:L, func:function(T){
				$1.downNow(P2.href);
			}});
		}
		else if(k=='mail'){
			Li.push({ico:'fa fa-envelope',k:'mail',textNode:' Enviar',P:{L:L},func:function(T){
			}});
		}
		else if(k=='copy'){
			Li.push({k:'logs',plus:P2.plus,ico:'fa fa-files-o',textNode:P2.btnText, P:L, func:function(T){
				P2.copy.inputs='docEntry='+nD.docEntry;
				$Api.copyFrom(P2.copy); }});
		}
		else if(k=='win'){
			P2.W.api=nD.api+'/'+P2.W.api;
			Li.push({k:k,plus:P2.plus,ico:P2.ico,textNode:P2.textNode,func:function(T){ 
				$Api.formWin(P2.W,nD); } });
		}
		else if(k=='man'){ Li.push(P2); }
	}
	this.Opts=function(){
		return $Opts.add(D.tbSerie,Li,L);;
	}
}

$Doc.docNumSerie=function(tt,D){
	var Ser=$Doc.TbSerie.get(tt,D.serieId);
	var v=(Ser && Ser.srCode)?Ser.srCode+'-':'';
	if(Ser && Ser.srCode){ v +=(Ser.resBef)?Ser.resBef:''; }
	v += (D.docNum>0)?D.docNum:D.docEntry;
	if(Ser && Ser.srCode){ v +=(Ser.resAfter)?Ser.resAfter:''; }
	return v;
}

$Doc.view=function(cont,P){
	P=(P)?P:{};
	if(P.D & P.D.errNo){  return $Api.resp(cont,P.D); }
	pareCont=cont;
	if(P.main){
		var cont=$Doc.topBtns({OLg:P.main,D:P.D,print:P.print},cont);
	}
	else if(P.topBtns){ var cont=$Doc.topBtns(P.topBtns,cont); }
	else if(P.btnsTop){ //ks:pirnt, icons:Y, Li:Gvt
		var contPa=cont;
		var cont=$1.t('div',0,contPa);
		P.btnsTop.contPrint=cont;
		if(P.btnsTop.Li){ P.btnsTop.Li=P.btnsTop.Li(P.D); }
		$Doc.btnsTop(P.btnsTop.ks,P.btnsTop,contPa);
	}
	var D=(P.D)?P.D:{}; /* docNum, L:[] */
	P.cols=(P.cols)?P.cols:8;
	/* L:[]Contenido de Lineas
	THs: Encabezado Doc,
	Define
	Tbs,
	*/
	var no=$1.t('div',0); $1.t('b',{textNode:'N°.: '},no);
	$1.t('span',{textNode:D.docNum},no);
	var ct=$1.t('div',0); $1.t('b',{textNode:'Creado: '},ct); $1.t('span',{textNode:D.dateC},ct);
	var THs=[];
	if(typeof(P.THs)=='string'){ P.THs=eval(P.THs); }
	if(typeof(P.TLs)=='string'){ P.TLs=eval(P.TLs); }
	if(P.tbSerie){ Ser=$Doc.getTbSerie(P.tbSerie,D.serieId);
		var v=(Ser.srCode)?Ser.srCode+'-':'-';
		v +=(Ser.resBef)?Ser.resBef:'';
		v +=D.docNum;
		v +=(Ser.resAfter)?Ser.resAfter:'';
		var sno=v;
	}
	for(var i in P.THs){ var L2=P.THs[i];
		if(L2.k){ L2.kTxt='v';
		if($js.isNull(D[L2.k])){ D[L2.k]=''; }
			L2=$1.setTag(L2,D,L2);
		}
		else if(L2.sdocNum){ L2.v=sno; }
		else if(L2.sdocTitle){ 
			L2.v=(P.tbSerie && Ser)?Ser.srTitle:'Doc is Undefined';
		}
		else if(L2.docTitle){ L2.v=L2.docTitle; L2.vSty='textAlign:center;'; }
		else if(L2.docNum){ L2={v:no}; }
		else if(L2.docEntry){
				var no=$1.t('div',0); $1.t('b',{textNode:'N°.: '},no);
				$1.t('span',{textNode:D.docEntry},no);
				L2={v:no};
			}
		else if(L2.dateC){ L2={v:ct,cs:2,ln:1}; }
		else if(L2.middleInfo){
			var tmdcols=(L2.middleInfo!='Y' && L2.middleInfo>0)?L2.middleInfo:4;
			var tmrs=(L2.rs)?L2.rs:3;
			var td=$1.t('div');
			$1.t('div',{textNode:$Soc.licTradType+':\u0020'+$Soc.licTradNum},td);
			$1.t('div',{textNode:$Soc.address},td);
			$1.t('div',{textNode:$Soc.pbx},td);
			$1.t('div',{textNode:$Soc.mail},td);
			$1.t('div',{textNode:$Soc.web},td);
			L2={v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:tmdcols,rs:tmrs};
		}
		else if(L2.logo){
			var tmrs=(L2.rs)?L2.rs:3;
			var logo=$1.t('img',{style:'maxWidth:20rem; maxHeight:6.25rem',src:$Soc.logo});
			L2={v:logo,vSty:'textAlign:right;',ln:(L2.ln!='N'),rs:tmrs,cs:2};
		}
		//else{ L2.v=''; }
		THs.push(L2);
	}
	/* Head Lineas */
	$1.Tb.trCols(THs,{cols:P.cols,styT:P.styT,styDef:P.styDef},cont);
	if(P.midCont){ cont.appendChild(P.midCont); }
	if(P.middleCont){ $1.t('div',{style:'margin:0.5rem 0; padding:0.5rem;',node:P.middleCont},cont); }
	else{ $1.t('p',0,cont); }
	/* Lineas de Documento: TLs[{t, k, _g}], tb, fieldset,  */
	var PTLM=P.mTL; /* multiples lineas */
	if(!PTLM && P.TLs){ PTLM=[{TLs:P.TLs,tb:P.tbTLs,fieldset:P.fieldset,trPrP:P.trPrp,TFTo:P.TFTo,L:'L'}]; }
	if(PTLM){ for(var i in PTLM){ PTb=PTLM[i];
		PTb.L=(typeof(PTb.L)=='string')?D[PTb.L]:D.L;//Usar L por defecto
		if(!PTb.L){ $Api.resp($1.t('div',0,cont),{errNo:3,text:'['+PTb.L+'] no encontrado en matriz de respuesta.'}); }
		else if(PTb.L.errNo){ $Api.resp($1.t('div',0,cont),PTb.L); continue; }
		else{
			if(!PTb.sortBy){ PTb.sortBy='lineNum'; }
			PTb.sortBy=(PTb.sortBy=='N')?false:PTb.sortBy;
			if(PTb.sortBy){ PTb.L=$js.sortBy(PTb.sortBy,PTb.L); }
			var Tb=[]; var n=0;
			for(var f in PTb.TLs){ var L=PTb.TLs[f];
				if(L.t){ L.textNode=L.t; } Tb.push(L);
			}
			var tb=$1.T.table(Tb,PTb.tb);
			var tBody=$1.t('tbody',0,tb);
			if(PTb.fieldset){
				var fie=$1.T.fieldset(tb,{L:PTb.fieldset}); cont.appendChild(fie);
			}else{ cont.appendChild(tb); }
			tb.classList.add('table_x100');
			/* Lineas L[] */
			for(var i in PTb.L){ var L=PTb.L[i];
				var tR=(PTb.L.tr)?PTb.L.tr:0;
				if(PTb.trPrp){ tR=PTb.trPrp; }
				var tr=$1.t('tr',tR,tBody);
				var ncol=1;
				for(var f in PTb.TLs){ var L2=PTb.TLs[f]; kF=L2.k;
					if(L[kF]){ nD=$1.setTag(L2,L); }// $1.dTag(L2,L);
					else{ nD={textNode:''}; }
					var td=$1.t('td',nD);
					/*añadir cells to sum */
					if(PTb.TFTo && PTb.TFTo[kF]){
						if(ncol==1){ tr.classList.add(tbCal._row); }
						td.classList.add(tbCal._cell);
						td.setAttribute('ncol',ncol); ncol++;
					}
					tr.appendChild(td);
				}
			}
			if(PTb.TFTo){//totales tfoo
				var tr=$1.t('tr',tR,tBody); var ncol=1;
				for(var f in PTb.TLs){ var L2=PTb.TLs[f]; kF=L2.k;
					var td=$1.t('td',PTb.TFTo[kF],tr);
					if(PTb.TFTo && PTb.TFTo[kF]){
						td.classList.add(tbCal._cell+'_'+ncol); ncol++;
					}
				}
				tbCal.sumCells(tb);
			}
			if(PTb.trBot){//añadir tr en botto
				for(var z1 in PTb.trBot){
					var ttr={};
					if(PTb.trBot[z1].tr){
						ttr=PTb.trBot[z1].tr;
						delete(PTb.trBot[z1].tr);
					}
					var tr=$1.t('tr',ttr,tBody);
					for(var z2 in PTb.trBot[z1]){
						$1.t('td',PTb.trBot[z1][z2],tr);
					}
				}
			}
		}
	}}
	/* total */
	if(P.TFTo){
		var tr=$1.t('tr',tR,tBody); var ncol=1;
		for(var f in fL){ var L2=fL[f]; kF=L2.k;
			var td=$1.t('td',0,tr);
			if(P.TFTo[kF]){
				td.classList.add(tbCal._cell+'_'+ncol); ncol++;
			}
		}
	}
	if(P.bottomCont){ $1.t('div',{style:'font-size:0.75rem; text-align:center;',node:P.bottomCont},cont); }
	if(P.softFrom=='Y'){
		if($Soc.softFrom==undefined){
			$Soc.softFrom = 'Realizado por ModulApp para  '+$0s.Soc.ocardName;
		}
		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);
	}
	if(P.docTotals=='Y' || P.footTotal){/* notes y total */
		var divFo=$1.t('div',0,cont);
		var td=$1.t('div',{style:'margin-left:55%;'},divFo);
		var Adsx=[];
		if(D.discSum>0 && $Mdl.status('gvtShowDisc')){ rs++;
			var discTotal=(D.discTotal)?' ('+(D.discTotal*1)+')%':'';
			Adsx.push([{textNode:'SubTotal'},{textNode:$Str.money(D.baseAmntList)}]);
			Adsx.push([{textNode:'- Descuentos'},{textNode:$Str.money(D.discSum)+discTotal}]);
			Adsx.push([{textNode:'SubTotal'},{textNode:$Str.money(D.baseAmnt)}]);
		}
		else{
			Adsx.push([{textNode:'SubTotal'},{textNode:$Str.money(D.baseAmnt)}]);
		}
		if(D.vatSum>0){ rs++;
			Adsx.push([{textNode:'Impuestos'},{textNode:$Str.money(D.vatSum)}]);
		}
		if(D.rteIvaSum>0){ rs++;
				Adsx.push([{textNode:'Rte. IVA'},{textNode:$Str.money(-D.rteIvaSum)}]);
		}
		if(D.rteIcaSum>0){ Adsx.push([{textNode:'Rte. ICA'},{textNode:$Str.money(D.rteIcaSum*-1)}]); }
		if(D.rteSum>0){ Adsx.push([{textNode:'Retenciones'},{textNode:$Str.money(D.rteSum*-1)}]); }
		Adsx.push([{textNode:'Total'},{textNode:$Str.money(D.docTotal)}]);
		for(var i9 in Adsx){
			var div1=$1.t('div',{style:'paddingBottom:12px;'},td);
			Adsx[i9][0].style='display:inline-block; width:120px;';
			$1.t('b',Adsx[i9][0],div1);
			$1.t('span',Adsx[i9][1],div1);
		}
		var td=$1.t('div',{style:'textAlign:left; fontWeight:normal;'},divFo);
		var ltxt=(D.doc_noteFix)?D.doc_noteFix:'';
		var dv=$1.t('div',{style:'fontSize:12px;'},td); dv.innerHTML=ltxt;
	}
	if(P.footTrs){
		TFs=P.TFs;
		if(!P.TFs){ P.TFs=[]; }
		var cspan=(P.footTrs.cs)?1:P.footTrs.cs;
		var rs=2;
		P.TFs.push([{textNode:'SubTotal',colspan:cspan},{textNode:$Str.money(D.baseAmnt)}]);
		if(D.discSum>0){ rs++;
			P.TFs.push([{textNode:'Descuentos',colspan:cspan},{textNode:$Str.money(D.discSum)}]);
		}
		if(D.vatSum>0){ rs++;
			P.TFs.push([{textNode:'Impuestos',colspan:cspan},{textNode:$Str.money(D.vatSum)}]);
		}
		if(D.rteIvaSum>0){ rs++;
			P.TFs.push([{textNode:'Rte. IVA',colspan:cspan},{textNode:$Str.money(-D.rteIvaSum)}]);
		}
		if(D.rteIcaSum>0){ rs++; P.TFs.push([{textNode:'Rte. ICA',colspan:cspan},{textNode:$Str.money(D.rteIcaSum*-1)}]); }
		if(D.rteSum>0){ rs++; P.TFs.push([{textNode:'Retenciones',colspan:cspan},{textNode:$Str.money(D.rteSum*-1)}]); }
		P.TFs.push([{textNode:'Total',colspan:cspan},{textNode:$Str.money(D.docTotal)}]);
		if(P.footTrs.cs){
			var ltxt=(D.doc_noteFix)?D.doc_noteFix:'';
			var dv=$1.t('div',{class:'bottomPageInfoSeries',style:'fontSize:12px;'}); dv.innerHTML=ltxt;
			P.TFs[0].unshift({node:dv,colspan:P.footTrs.cs,rowspan:rs,style:'textAlign:left; fontWeight:normal;'});
		}
		if(TFs){ for(var ix in TFs){ P.TFs.push(TFs[ix]); } }
	}
	if(P.TFs){
		var tFo=$1.t('tfoot',0,tb);
		for(var i in P.TFs){
			var tr=$1.t('tr',0,tFo);
			for(var i2 in P.TFs[i]){
				var L=P.TFs[i][i2];
				L.style=(L.style)?'text-align:right; '+L.style:'text-align:right;';
				$1.t('td',L,tr);
			}
		}
	}
	/* Bottom */
	if(P.bottomAdd){
		for(var i in P.bottomAdd){ cont.appendChild(P.bottomAdd[i]); }
	}
	if(P.Tabs){ $1.tabs(P.Tabs,pareCont); }
}
$Doc.topBtns=function(P,cont){
	var pare=$1.t('div',{style:'padding:0.25rem; borderBottom:0.0625rem solid #000;'});
	var plus=$1.t('div',{style:'position:relative; display:inline-block;'});
	$1.T.btnFa({fa:'fa fa-plus',textNode:'opciones',title:'Más Opciones',func:function(){
		var dis=divPlus.style.display;
		if(dis=='' || dis=='block'){ divPlus.style.display='none'; }
		else{ divPlus.style.display='block'; }
	}},plus);
	var divPlus=$1.t('div',{style:'position:absolute; top:100%; left:0; padding:5px; width:200px; maxHeight:300px; display:none; backgroundColor:#FFF; border:1px solid #000'},plus);
	var dWrap=$1.t('div',{'class':'docTopBtns_wrap'});
	cont.insertBefore(dWrap,cont.firstChild);
	cont.insertBefore(pare,cont.firstChild);
	if(P.OLg){ P.OLg=P.OLg(P.D); }
	if(!P.OLg){ P.OLg=[]; } //OLg
	if(P.print!='N'){
		if(!P.contPrint){ P.contPrint=dWrap; }
		P.OLg.unshift({k:'print',fa:'fa_print',title:'Imprimir', func:function(){ $1.Win.print(P.contPrint); }});
	}
	var tienePlus=false;
	for(var i in P.OLg){ var L=P.OLg[i];
		if(L.ico){ L.fa=L.ico; }
		if(L.plus=='Y'){ tienePlus=1;
			$1.T.btnFa(L,divPlus).style.padding='5px';
		}
		else if(L.k){ //si tiene k mostrar
			if(L.ico){ L.title=L.textNode; L.textNode=''; }
			$1.T.btnFa(L,pare);
			$1.t('span',{'textNode':' '},pare);
		}
	}
	if(tienePlus){ pare.appendChild(plus); }
	return dWrap;
};
	$V.docOrders=[{k:'dateCDesc',v:'Más Nuevos'},{k:'dateCAsc',v:'Más Antiguos'},{k:'docDateDesc',v:'Fecha Doc. Desc.'},{k:'docDateAsc',v:'Fecha Doc. Asc.'}];


	$Doc.filter=function(P,Li,wrap){
	var ordBys=[{k:'newest',v:'Más Nuevos'},{k:'oldest',v:'Más Antiguos'}];
	var jsV = 'jsFiltVars';
	if(P.hids){
		for(var i in P.hids){ L=P.hids[i];
			$1.t('input',{type:'hidden',name:L.name,value:L.value,'class':jsV},wrap);
		}
	}
	if(P.docUpd=='Y'){
		ordBys.push({k:'unewest',v:'Modif. Reciente'});
		ordBys.push({k:'uoldest',v:'Modif. Antigüa'});
	}
	if(P.docDate!='N'){
		ordBys.push({k:'docDateDesc',v:'Fecha Doc. Desc.'});
		ordBys.push({k:'docDateAsc',v:'Fecha Doc. Asc.'});
	}
	if(P.docNum=='Y'){
		ordBys.push({k:'docNumDesc',v:'Número 9-1'});
		ordBys.push({k:'docNumAsc',v:'Número 1-9'});
	}
	if(P.dfeNumber=='Y' && $MdlStatus.isY('DFE')){
		ordBys.push({k:'dfeNumberDesc',k:'Número Electrónico Desc.'});
		ordBys.push({k:'dfeNumberAsc',k:'Número Electrónico Asc.'});
	}
	var divL=wrap; var n0=0;
	for(var i in Li){ L=Li[i];
		if(n0==0){ L.divLine=1; n0=1 }
		if(!L.I){ L.I={}; }
		if(L.k=='rep'){
			L.L='Vista'; L.wxn='wrapx8';
			L.I={lTag:'select',name:'viewType',opts:L.opts,selected:L.selected,noBlank:'Y'};
		}
		if(L.k=='d1'){
			if(!L.L){ L.L='Fecha Inicio'; }
			L.wxn='wrapx8';
			L.I.tag='date';
			L.I.name=(L.f)?L.f+'(E_mayIgual)':'A.docDate(E_mayIgual)';
			if(L.value){ L.I.value=L.value; }
		}
		else if(L.k=='d2'){
			if(!L.L){ L.L='Fecha Fin'; }
			L.wxn='wrapx8';
			L.I.tag='date';
			L.I.name=(L.f)?L.f+'(E_menIgual)':'A.docDate(E_menIgual)';
			if(L.value){ L.I.value=L.value; }
		}
		else if(L.k=='card'){
			L.L='Tercero'; L.wxn='wrapx4';
			L.I.tag='input'; L.I.type='text';
			L.I.name=(L.f)?L.f+'(E_like3)':'A.cardName(E_like3)';
		}
		else if(L.k=='docStatus'){
			L.L='Estado'; L.wxn='wrapx8';
			L.I.tag='select'; L.I.opts=(L.opts)?L.opts:$V.dStatus;//O,C,N
			L.I.selected=L.selected;
			L.I.name=(L.f)?L.f:'A.docStatus';
		}
		else if(L.k=='ordBy'){
			L.L='Ordenar'; L.wxn='wrapx8';
			L.I.tag='select'; L.I.opts=ordBys; L.I.noBlank=1;
			L.I.selected=L.default;
			L.I.name=(L.f)?L.f:'orderBy';
		}
		else if(L.k=='rowsFull' || (L.k=='rows' && $Mdl.status('rowsFull'))){
			L.L='Resultado'; L.wxn='wrapx8';
			L.I.tag='select'; L.I.opts=$V.repLen; L.I.noBlank=1;
			L.I.selected=L.default;
			L.I.name='__dbReportLen';
		}
		else if(L.tbSerie){
			L.L='Serie'; L.wxn='wrapx8';
			L.I.tag='select'; L.I.opts=$Tb.docSerie[L.tbSerie];
			L.I.selected=L.default;
			L.I.name=(L.f)?L.f:'A.serieId';
		}
		else if(L.k=='docNum'){
			L.L='Número'; L.wxn='wrapx8';
			L.I.tag='input'; L.I.type='number';
			L.I.name=(L.f)?L.f:'A.docNum';
		}
		else if(L.k=='dfeNumber' && $MdlStatus.isY('DFE')){
			L.L='Num. Elect.'; L.wxn='wrapx8';
			L.subText='Doc. Electronico';
			L.I.tag='input'; L.I.type='text';
			L.I.name=(L.f)?L.f:'__dfeNumber';
		}
		else if(L.k=='memo'){
			L.L='Detalles'; L.wxn='wrapx4';
			L.I.tag='input'; L.I.type='text';
			L.I.name=(L.f)?L.f+'(E_like3)':'A.lineMemo(E_like3)';
		}
		else if(L.k=='dateSelRang'){
			L.L='Rango'; L.wxn='wrapx8';
			L.I.node=$1.dateSelRang(wrap);
		}
		if(L.k){ }
		L.I['class']=(L.I['class'])?L.I['class']+' '+jsV:jsV;
		if(L.divLine){ var divL=$1.T.divL(L,wrap); }
		else{ 
			if(L.viewRang && divL){//solo sirve posterior
				$1.viewRangFilter(divL,{selected:L.viewRang}); //D,M
			}
			else{ $1.T.divL(L,divL); }
		}
	}
	$1.T.btnSend({textNode:'Actualizar', func:P.func},wrap);
}


$Doc.F={
	ordBy:function(P,pare){
		var jsV = 'jsFiltVars';
		var ordBys={dateCDesc:'Fecha Creado DESC',dateCAsc:'Fecha Creado ASC',docDateDesc:'Fecha Doc. DESC',docDateAsc:'Fecha Doc. ASC'};
		if(P.dateUpd){
			ordBys['dateUpdDesc']='Fecha Actualizado DESC';
			ordBys['dateUpdAsc']='Fecha Actualizado ASC';
		}
		return $1.T.divL({divLine:P.divLine,wxn:'wrapx8', L:'Orden Listado',I:{tag:'select','class':jsV,name:'orderBy',opts:ordBys,selected:P.orderBy,noBlank:1}},pare);
	},
	rows:function(P,pare){
		var jsV = 'jsFiltVars';
		return $1.T.divL({divLine:P.divLine,wxn:'wrapx8', L:'Reporte',I:{tag:'select','class':jsV,name:'__dbReportLen',opts:$V.dbReportLen,noBlank:1}},pare);
	},
}

$Doc.filtForm=function(P,wrap){
	var Tags={};
	var ordBys={dateCDesc:'Fecha Creado DESC',dateCAsc:'Fecha Creado ASC',docDateDesc:'Fecha Doc. DESC',docDateAsc:'Fecha Doc. ASC'};
	var jsV = 'jsFiltVars';
	var docFie=(P.docFie)?P.docFie:'A.docDate';
	if(P.docDate){ docFie=P.docDate; }
		var divL=$1.T.divL({divLine:1,wxn:'wrapx8',L:'Fecha Inicio',I:{tag:'input',type:'date','class':jsV,name:docFie+'(E_mayIgual)'}},wrap);
	$1.T.divL({wxn:'wrapx8', L:'Fecha Fin',I:{tag:'input',type:'date','class':jsV,name:docFie+'(E_menIgual)'}},divL);
	if(P.docStatus){
		$1.T.divL({wxn:'wrapx10',L:'Estado',I:{tag:'select','class':jsV,name:'A.docStatus',opts:((P.docStatus=='Y')?$V.dStatus:P.docStatus)}},divL);
	}
	if(P.docNum!='N'){
		ordBys['docNumDesc']='Número Desc.';
		ordBys['docNumAsc']='Número Asc.';
		if(P.tbSerie){
			$1.T.divL({wxn:'wrapx8', L:'Serie',subText:'Número Doc',I:{tag:'select','class':jsV,name:'__dbReportLen',opts:$Tb.docSerie[P.tbSerie]}},divL);
		}
		$1.T.divL({wxn:'wrapx10',L:'Número',I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'__docNum'}},divL);
	}
	if(P.dfeNumber=='Y' && $MdlStatus.isY('DFE')){
		ordBys['dfeNumberDesc']='Número Electrónico Desc.';
		ordBys['dfeNumberAsc']='Número Electrónico Asc.';
		$1.T.divL({wxn:'wrapx8',L:'Num. Elect.',subText:'Número F. Electronica',_iHelp:'Número de facturación electronica generado',I:{tag:'input',type:'text','class':jsV,name:'__dfeNumber'}},divL);
	}
	if(P.docEntry!='N'){
		ordBys['docEntryDesc']='Número Sistema Desc.';
		ordBys['docEntryAsc']='Número Sistema Asc.';
		$1.T.divL({wxn:'wrapx10',L:'Número',subText:'Número Sistema',_iHelp:'Número interno del sistema, varia del número debido a que se pueden manejar series de documentos diferentes.\n Ejemplo: (FVA)-134, FVB-134',I:{tag:'input',type:'number',inputmode:'numeric',min:1,'class':jsV,name:'__docEntry'}},divL);
	}
		if(P.card!='N'){
		$1.T.divL({wxn:'wrapx4',L:'Tercero',I:{tag:'input',type:'text','class':jsV,name:'A.cardName(E_like3)'}},divL);
	}
	var divL=$1.T.divL({divLine:1,wxn:'wrapx8', L:'Orden Listado',I:{tag:'select','class':jsV,name:'orderBy',opts:ordBys,selected:P.orderBy,noBlank:1}},wrap);
	Tags.orderBy=divL;
	if(P.rows=='Y' || (P.rows && P.rows!='N')){
		Tags.rows=$Doc.F.rows({},divL);
	}
	if(P.lineMemo=='Y'){
		$1.T.divL({wxn:'wrapx4',L:'Detalles',I:{tag:'input',type:'text','class':jsV,name:'A.lineMemo(E_like3)'}},divL);
	}
	if(P.adds){ for(var i in P.adds){
		if(!P.adds[i].I['class']){ P.adds[i].I['class']=jsV; }
		else{ P.adds[i].I['class'] += ' '+jsV; }
		$1.T.divL(P.adds[i],divL);
	}}
	$1.T.btnSend({textNode:'Actualizar', func:P.func},wrap);
	return Tags;
}


$Doc.lineTag=function(L2,L,nD){
	var nD=(nD)?nD:L2;
	var kF=L2.k;
	var kTxt=(L2.kTxt)?L2.kTxt:'textNode'; /* v */
	var kTy=(L2.kTy)?L2.kTy:kF;
	if(L2.fText){ nD[kTxt]=L2.fText(L); }
	else if(L2._gTb){ nD[kTxt]=_g(L[kF],$Tb[L2._gTb]); }
	else if(L2._V){
		nD[kTxt]=_g(L[kF],$V[L2._V]);
	}
	else if(L2._g){
		if(typeof(L2._g)=='string'){ L2._g=eval(L2._g); }
		nD[kTxt]=_g(L[kF],L2._g);
	}
	else if(L2._gV){
		if(typeof(L2._gV)=='string'){ L2._g=eval(L2._gV); }
		nD[kTxt]=_gO(L[kF],L2._g,'v');
	}
	else{ nD[kTxt]=L[kF]; }
	if(kTy=='price'){ nD[kTxt]=$Str.money(L[kF]); }
	else if(kTy=='quantity'){ nD[kTxt]=L[kF]*1;; }
	else if(kTy=='udm'){ nD[kTxt]=_g(L[kF],Udm.O); }
	return nD;
}
$Doc.lineText=function(L2,nD){
	return $1.setTag(L2,nD);
}

var $DocTb={ /* Orientado a itm */
n:1,
kTb:{},//campos en databllas
kTbAssg:function(k,D){
	$DocTb.kTb[k]=D;
},
Fx:{},//[{tagInfo}, {tagInfo,k,kf,funcText}]
rL:function(P){/* añadir */
	var tD={};
	var R={Cols:[],Fie:[]};
	if(P.RowsL){
		for(var i in P.RowsL){ TK=P.RowsL[i];
			var k=(TK.k)?TK.k:TK;
			if(TK[0]){ R.Cols.push(TK[0]); }
			if(TK[1]){ R.Fie.push(TK[1]); }
		}
		return R;
	}
	var ks=P.kFie;
	if(P.kTb && $DocTb.kTb[P.kTb]){ tD=$DocTb.kTb[P.kTb]; }
	else{ tD=$DocTb.Fx; }
	if(P.jsFie){
		for(var i in P.jsFie){ TK=P.jsFie[i];
			var k=(TK.k)?TK.k:TK;
			if(tD[k]){
				if(tD[k][0]){ R.Cols.push(tD[k][0]); }
				if(tD[k][1]){
					if(TK.k){ for(var i9 in TK){ tD[k][1][i9]=TK[i9]; } }
					R.Fie.push(tD[k][1]);
				}
			}
		}
	}
	else if(typeof(ks)=='object'){
		for(var i in ks){
			if(ks[i][0]){ R.Cols.push(ks[i][0]); }
			if(ks[i][1]){ R.Fie.push(ks[i][1]); }
		}
	}
	else{
		var S=ks.split(',');
		for(var i in S){ k=S[i];
			if(tD[k]){
				if(tD[k][0]){ R.Cols.push(tD[k][0]); }
				if(tD[k][1]){ R.Fie.push(tD[k][1]); }
			}
		}
	}
	return R;
},
ini:function(P){//
	var R={docTotal:P.docTotal};
	R.jsF=(R.jsF)?R.jsF:$Api.JS.cls;
	var Rd=$DocTb.rL(P); //RowsL{}
	R.Fie=Rd.Fie;
	R.xMov=P.xMov; R.xNum=P.xNum; R.xDel=P.xDel;
	R.uniqLine=P.uniqLine;
	if(P.xNum!='N'){ Rd.Cols.unshift('#'); }
	if(P.xMov){ Rd.Cols.unshift('');  }
	if(P.xDel!='N'){ Rd.Cols.push(''); }
	R.AJs=P.AJs;
	R.tb=$1.T.table(Rd.Cols);
	R.tBody=$1.t('tbody',0,R.tb);
	/* Foot */
	R.tFoot=$1.t('tfoot',0,R.tb);
	var trF=$1.t('tr',0,R.tFoot);
	var td=$1.t('td',{colspan:6},trF);
	if(P.rteIva && P.rteIva!='N'){
		$1.t('b',{textNode:'Rte. IVA '},td);
		$1.T.sel({'class':R.jsF+' '+tbCal.tbRteIva+' '+$Api.Sea.clsBox,k:'rteIva',opts:$Tb.gfiTaxRiva,name:'rteIva',selected:P.rteIva},td).onchange=function(){ $DocTb.docTotal(R); };
		$1.t('br',0,td);
	}
	if(P.rteIca && P.rteIca!='N'){
		$1.t('b',{textNode:'Rte. ICA '},td);
		$1.T.sel({'class':R.jsF+' '+tbCal.tbRteIca+' '+$Api.Sea.clsBox,k:'rteIca',opts:$Tb.gfiTaxIca,name:'rteIca',selected:P.rteIca},td).onchange=function(){ $DocTb.docTotal(R); };
	}
	$1.t('td',{colspan:3,'class':R.jsF+' '+tbCal.tbTotalDivs},trF);
	$1.t('td',{},trF);
	if(P.fieldset!='N'){
		P.fieldset=(P.fieldset && P.fieldset!='Y')?P.fieldset:'Líneas del Documento';
		R.fieldset=$1.T.fieldset(R.tb,{L:{textNode:P.fieldset}});
	}
	else{ R.fieldset=$1.t('div'); R.fieldset.appendChild(R.tb); }
	if(P.btnAddL=='Y'){
		$1.T.btnFa({faBtn:'fa_plusCircle',textNode:'Añadir Linea',func:function(){
			$DocTb.addLine({},R,P);
		}},R.fieldset);
	}
	if(P.itmSea){ //new use oct 2020
		Itm.sea2Add({type:P.itmSea,itemType:P.itemType,vPost:P.vPost,bCode:P.bCode,func:function(Ds){
			for(var i in Ds){
				$DocTb.addLine(Ds[i],R,P);
			}
		}},R.fieldset);
	}
	if(!P.itmSea && P.itmAdd!='N'){
		Itm.sea2Add({vPost:'fie=I.grsId,I.udm,I.sellPrice,I.udm,I.defWhs,I.handInv,I.vatId&wh[I.sellItem]=Y',func:function(Ds){
			for(var i in Ds){
				$DocTb.addLine(Ds[i],R,P);
			}
		}},R.fieldset);
	}
	if(P.btnsAdd){
		for(var ib in P.btnsAdd){
			P.btnsAdd[ib].tBody=R.tBody;
			P.btnsAdd[ib].jsL=R.jsF+'-L';
			P.btnsAdd[ib].jsN=R.jsF+'-N';
			R.fieldset.appendChild(P.btnsAdd[ib]);
		}
	}
	if(P.L){
		if(P.L.errNo==1){ $Api.resp(R.tb,P.L); }
		else if(!P.L.errNo){ for(var i in P.L){ $DocTb.addLine(P.L[i],R); } }
	}
	$DocTb.docTotal(R.tb);
	return R;
},
addLine:function(L,R){
	/*
	L-> {datos...},
	R->xMov,xNum,xDel(N,x), jsF
		tb:html, AJs:{}
		Fie:{k (en L), kf (name),funcText}
	*/
	var ln ='L['+$DocTb.n+']';
	if(L.sellPrice){ L.price=L.sellPrice; }
	else if(L.buyPrice){ L.price=L.buyPrice; }
	else if(L.invPrice){ L.price=L.invPrice; }
	if(L.defWhs){ L.whsId=L.defWhs; }
	var F=R.Fie;
	var tBody=(R.tBody)?R.tBody:$1.q('tbody',R.tb);
	var jsF=(R.jsF)?R.jsF:'jsFields';
	var unk=L.itemId+'_'+L.itemSzId;
	var tr=$Htm.uniqLine(unk,tBody,'ele');
	if(R.uniqLine=='Y' && tr){
		qty=$1.q('.'+tbCal.trQty,tr);
		if(qty){ qty.value=qty.value*1+1; }
		$DocTb.docTotal(R);
		return false;
	}
	var tr=$1.t('tr',{'class':$Doc.Cls.trL+' '+jsF+'-L '+tbCal.trLine},tBody);
	if(R.uniqLine=='Y'){ $Htm.uniqCls(unk,tr); }
	if(R.xMov){
		var td=$1.t('td',0,tr);
		$1.T.btnFa({fa:'fa-caret-up',title:'Mover Arriba',func:function(T){
			$1.Move.to('before',T.parentNode.parentNode,{rev:'Y'});
		}},td);
		$1.T.btnFa({fa:'fa-caret-down',title:'Mover Abajo',func:function(T){
			$1.Move.to('next',T.parentNode.parentNode,{rev:'Y'});
		}},td);
	}
	if(R.xNum!='N'){
		var nn=($DocTb[R.xNum])?$DocTb[R.xNum]:$DocTb.n;
		$1.lTag({textNode:nn},$1.t('td',{'class':$Doc.Cls.trLnum},tr));
	}
	var jsN=jsF+'-N';
	if(R.AJs){
			var nA={};
			for(var i9 in R.AJs){ k9=R.AJs[i9];
			var kn=(k9.a)?k9.a:k9; //a es alias -- a:tr, k:docEntry
			var kl=(k9.k)?k9.k:k9; //k es real en L 
				if(L[kl]){
					nA[kn]=L[kl];
				}
			}
			$1.t('input',{type:'hidden','class':jsN,AJs:nA},tr);
		}
	for(var n in R.Fie){
		var PD=R.Fie[n]; var kf=PD.k;
		var tF=$js.clone(PD);
		if(tF.lTag){ tF.tag=tF.lTag; delete(tF.lTag); }
		var tagN=tF.tag;
		if(PD.funcText && L[kf]){ L[kf]= PD.funcText(L); }
		else if(PD.funcText){ L[kf]= PD.funcText(L); };
		if(tagN=='span' || tagN=='txt'){ tF.textNode= L[kf];}
		else{ tF.value=L[kf];}
		var td=$1.t('td',0,tr);
		if(kf=='whsId' && L.handInv!='Y'){ continue; }
			tF.name=tF.kf;
		/* Solo obtener valores de campo para estos */
		var addCls=jsN;
		if((kf+'').match(/^(price|quantity|whsId|lineText)$/)){ addCls=jsN; }
		tF['class']=(tF['class'])?tF['class']+' '+addCls:addCls;
		if(tagN=='select' && tF._Vopts){
			tF.opts=$V[tF._Vopts];
		}
		var tag=$1.lTag(tF,td);
		if(PD.setData){ PD.setData(tag,L); }
		tF.tag=tagN;
		/* Asignar ++ a tag */
		priceList=null;
		if(L.price || L.priceList){
			priceList=(L.priceList)?L.priceList*1:L.price*1;
		}
		if(kf=='pricex1'){ tag.classList.add(tbCal.trPrice); }
		else if(kf=='price'){ tag.classList.add(tbCal.trPrice);
			tag.priceList=(L.priceList)?L.priceList*1:L.price*1;
		}
		else if(kf=='quantity'){ tag.classList.add(tbCal.trQty);
			tag.AJs={itemId:L.itemId,itemSzId:L.itemSzId,handInv:L.handInv,priceList:priceList};
		}
		else if(kf=='priceLine'){ tag.classList.add(tbCal.trTotal); }
		else if(kf=='discPrc'){ tag.classList.add(tbCal.trDisc);}
		else if(kf=='discPrcCalc'){
			tag.classList.add(tbCal.trDisc+'Calc');
			tag.setAttribute('disabled','disabled');
		}
		else if(kf=='vatId'){ tag.classList.add(tbCal.trVat);}
		else if(kf=='rteId'){ tag.classList.add(tbCal.trRte); };
		if(tagN=='select'){
			tag.onchange=function(){ $DocTb.docTotal(R); };
		}
		else if(tagN=='input' || tagN=='number'){ tag.keyChange(function(){ $DocTb.docTotal(R); }); }
		if(PD.keyChange){ tag.keyChange(PD.keyChange); }
		if(tF.noCls && tag.classList){ tag.classList.remove(jsN); }
	}
	if(R.xDel!='N'){
		var td=$1.t('td',0,tr);
		if(L.id && R.xDel!='x'){
			$1.T.ckLabel({t:'Eliminar',I:{'class':jsN,name:'delete',AJs:{id:L.id}},P:tr,func:function(ck,T){
				if(ck=='Y'){ T.P.classList.remove(tbCal.trLine); }
				else if(ck=='N'){  T.P.classList.add(tbCal.trLine); }
				$DocTb.docTotal(R);
			}},td);
		}
		else{
			$1.T.btnFa({fa:'fa_close',title:'Eliminar Linea',P:{tr:tr,L:L},func:function(T){
				if(typeof(R.xDel)=='function'){ R.xDel(T.P.L); }
				$1.delet(T.P.tr);
				$DocTb.docTotal(R);
			}},td);
		}
	}

	$DocTb.docTotal(R);
	$DocTb.n++;
	return tr;
},
docTotal:function(P){
	var P=(P)?P:{}; var tb=P.tb;
	if(P.docTotal!='Y'){ return true; }
	var tbTotalDivs=$1.q('.'+tbCal.tbTotalDivs,tb);
	var tbDisc=$1.q('.'+tbCal.tbDisc,tb);
	var tbVat=$1.q('.'+tbCal.tbVat);
	var tbRte=$1.q('.'+tbCal.tbRte,tb);
	var dTo={baseAmntList:0,baseAmnt:0,vatSum:0,rteSum:0,discTotal:0,discSum:0,docTotal:0};
	var _Vat={}; var _Rte={};
	var trs=$1.q('.'+tbCal.trLine,tb,'all');
	var lineTotal=0;
	for(var i=0; i<trs.length; i++){
		var pTag=$1.q('.'+tbCal.trPrice,trs[i]);
		var price=tbCal.val(pTag);
		if(pTag){ var priceList=pTag.priceList*1; }
		var qty=tbCal.val($1.q('.'+tbCal.trQty,trs[i]));
		var discTag=$1.q('.'+tbCal.trDisc,trs[i]);
		var disc=tbCal.val(discTag);
		var discCalc=$1.q('.'+tbCal.trDisc+'Calc',trs[i]);
		if(discCalc){ disc=0; }
		var baseLine=(price*qty)*(1-(disc/100));
		lineTotal=baseLine;
		vatSum=rteSum=0;
		if(pTag){
			if(!pTag.AJs){ pTag.AJs={}; }
			delete(pTag.AJs.vatId); delete(pTag.AJs.vatRate); delete(pTag.AJs.vatSum);
		}
		if(!pTag){ return false; }
		if(vat=$1.q('.'+tbCal.trVat,trs[i])){//IVAs
			var vatId=$1.qOpt(vat);
			if(vatId){
				vat=_gO(vatId,$Tb.otaxI);
				pTag.AJs.vatId=vatId;
				var vatRate=vat.rate*1;
				pTag.AJs.vatRate=(vat.rate)?vatRate:0;
				vatSum=pTag.AJs.vatSum=baseLine*(pTag.AJs.vatRate/100);
				lineTotal =lineTotal+vatSum;
				if(!_Vat[vatId]){ _Vat[vatId]={t:vat.v,vatRate:vatRate,vatBase:0,value:0}; }
				_Vat[vatId].vatBase+=baseLine;
				_Vat[vatId].value+=pTag.AJs.vatSum*1;
			}
		}
		delete(pTag.AJs.rteId); delete(pTag.AJs.rteRate); delete(pTag.AJs.rteSum);
		if(rte=$1.q('.'+tbCal.trRte,trs[i])){//Rtes
			var rteId=$1.qOpt(rte);
			if(rteId){
				rte=_gO(rteId,$Tb.otaxR);
				var vatRate=rte.rate*1;
				pTag.AJs.rteId=rteId; pTag.AJs.rteRate=(rte.rate)?vatRate:0;
				rteSum=pTag.AJs.rteSum=baseLine*(pTag.AJs.rteRate/100);
				lineTotal =lineTotal-vatSum;
				if(!_Rte[rteId]){ _Rte[rteId]={t:rte.v,vatRate:vatRate,vatBase:0,value:0}; }
				_Rte[rteId].vatBase+=baseLine;
				_Rte[rteId].value+=pTag.AJs.rteSum*1;
			}
		}
		if(P.vatOnLine){ var priceLine=baseLine+vatSum-rteSum; }
		else{ var priceLine=baseLine; }
		var priceLineTag=$1.q('.'+tbCal.trTotal,trs[i]);
		if(priceLineTag){
			priceLineTag.innerText= $Str.money(priceLine);
		}
		pTag.AJs.priceLine=priceLine;
		pTag.AJs.lineTotal=lineTotal;
		pTag.AJs.lineTotalList=priceList*qty;
		pTag.AJs.discSum=pTag.AJs.lineTotalList-baseLine;
		pTag.AJs.discTotal=$js.toFixed(pTag.AJs.discSum/pTag.AJs.lineTotalList*100.2);
		if(discCalc){
			discCalc.value=pTag.AJs.discTotal;
		}
		/* total */
		dTo.baseAmnt+=priceLine;
		dTo.vatSum+=vatSum;
		dTo.rteSum+=rteSum;
		dTo.discSum+=pTag.AJs.discSum;
		dTo.baseAmntList+=pTag.AJs.lineTotalList;
		dTo.docTotal+=pTag.AJs.priceLine;
		dTo.discTotal=$js.toFixed(dTo.discSum/dTo.baseAmntList*100,2);
	}
	/* draw vat and ret */
	if(tbTotalDivs){ tbTotalDivs.innerHTML='';
		dTo.Vats=[];
		dTo.vatSum=0; dTo.rteSum=0;
		trSubTotal({t:'Subtotal',value:dTo.baseAmnt});
		for(var i in _Vat){ valor=_Vat[i].value*1;
			dTo.vatSum +=valor;
			dTo.docTotal+=valor;
			dTo.Vats.push({vatId:i,vatRate:_Vat[i].vatRate,lineType:'iva',vatBase:_Vat[i].vatBase*1,vatSum:valor});
			trTotals(_Vat[i],'vatId'+i);
		}
		for(var i in _Rte){
			var valor=_Rte[i].value*1;
			dTo.docTotal-=valor;
			dTo.rteSum += valor;
			dTo.Vats.push({vatId:i,vatRate:_Rte[i].vatRate,lineType:'rte',vatBase:_Rte[i].vatBase*1,vatSum:_Rte[i].value*1});
			_Rte[i].value=-valor;
			trTotals(_Rte[i],'vatId'+i);
			//dTo.Rtes.push({vatId:i,vatBase:L.base*1,vatSum:valor});
		}
		/* Otras retenciones */
		var tagRteIva=$1.q('.'+tbCal.tbRteIva,tb);
		var vatId=$1.qOpt(tagRteIva);
		vat=_gO(vatId,$Tb.gfiTaxRiva);
		if(tagRteIva && vat && vat.rate){
			if(vat.rate && dTo.vatSum>0){
				var valor=(vat.rate/100)*dTo.vatSum;
				dTo.docTotal-=valor;
				trTotals({t:'Rte IVA',value:-valor},'vatId'+vat.k);
				dTo.Vats.push({vatId:vat.k,vatRate:vat.rate*1,lineType:'rteIva',vatBase:dTo.vatSum,vatSum:valor});
			}else{ valor=0; }
			tagRteIva.AJs={rteIvaSum:valor};
		}
		var tagRteIca=$1.q('.'+tbCal.tbRteIca,tb);
		var vatId=$1.qOpt(tagRteIca);
		vat=_gO(vatId,$Tb.gfiTaxIca);
		if(tagRteIca && vat && vat.rate){
			if(vat.rate && dTo.baseAmnt>0){
				var valor=(vat.rate/100)*dTo.baseAmnt;
				trTotals({t:'Rte ICA',value:-valor},'vatId'+vat.k);
				dTo.Vats.push({vatId:vat.k,vatRate:vat.rate*1,lineType:'rteIca',vatBase:dTo.baseAmnt,vatSum:valor});
				dTo.docTotal-=valor;
			}else{ valor=0; }
			tagRteIca.AJs={rteIcaSum:valor};
		}
		trTotal({t:'Total',value:dTo.docTotal});
		tbTotalDivs.AJs=dTo;
	}
	function trTotals(L,k){
		var div=$1.t('div',0,tbTotalDivs);
		$1.t('b',{textNode:L.t},div);
		$1.t('span',{textNode:$Str.money(L.value),'class':'docTotal_'+k,value:L.value*1},div);
	}
	function trSubTotal(L){
		var div=$1.t('div',{'class':tbCal.tbSubTotal+'_wrap'},tbTotalDivs);
		$1.t('b',{textNode:L.t},div);
		$1.t('span',{textNode:$Str.money(L.value),'class':tbCal.tbSubTotal,value:L.value*1},div);
	}
	function trTotal(L){
		var div=$1.t('div',{'class':'gvtDoc_totalLine'},tbTotalDivs);
		$1.t('b',{textNode:L.t},div);
		$1.t('span',{textNode:$Str.money(L.value),'class':'gvtDoc_totalLine_td '+tbCal.tbTotal,value:L.value*1},div);
	}
},
}

$Doc.FtbList={};//definir campos para listado gvtInv:'cardName,balDue'

$Doc.Fx={
clspymId:'inp_pymId',clsdocDate:'inp_docDate',clsdueDate:'inp_dueDate',
calcDue:function(cont,ini,t){
	var inp_pym=$1.q('.'+$Doc.Fx.clspymId,cont);
	var inp_dueDate=$1.q('.'+$Doc.Fx.clsdueDate,cont);
	var inp_docDate=$1.q('.'+$Doc.Fx.clsdocDate,cont);
	if(t=='due'){
		var extr=$Api.JS.kData(inp_pym,$Tb.gfiOpym,'extraDays',0);
		inp_docDate.value=$2d.add(inp_dueDate.value,'-'+extr+'days');
	}
	else{
		var extr=$Api.JS.kData(inp_pym,$Tb.gfiOpym,'extraDays',0);
		inp_dueDate.value=$2d.add(inp_docDate.value,'+'+extr+'days');
	}
	if(ini){
		inp_pym.onchange=function(){ $Doc.Fx.calcDue(cont) };
		inp_docDate.tdClick=function(){ $Doc.Fx.calcDue(cont) };
		inp_dueDate.tdClick=function(){ $Doc.Fx.calcDue(cont,0,'due') };
	}
}
}

function iDoc(P){
	this.tbSerie=P.tbSerie;
	this.funcAdd=P.funcAdd;
	this.api=P.api; //GET /doc, /doc/form, /doc/view, POST,PUST /doc
	this.G=P.G;//TD:[],tbExport
	this.V=P.V;
	this.F=P.F;
	this.oLi=(P.oLi)?P.oLi:[];
	if(!P.F){} else{ this.form=this.formC; }
	this.oLiSett=function(LD){
		var tLi=[];
		var mdlAcc=$MdlStatus.isY('gfiAcc');
		for(var i in this.oLi){
			var L=(this.oLi[i]);
			L.P=LD;
			if(L.k=='view'){
				L.textNode='Visualizar';
				L.ico='fa fa-eye';
				L.func=function(T){ $Doc.go(P.tbSerie,'v',T.P,1); }
			}
			else if(L.k=='edit'){
				L.textNode='Modificar';
				L.ico='fa fa-pencil';
				L.func=function(T){ $Doc.go(P.tbSerie,'f',T.P,1); }
			}
			else if(L.k=='statusC'){
				L.textNode='Cerrar';
				L.ico='fa fa-lock';
				L.X=L;
				L.X.api=this.api+'/statusClose';
				L.func=function(T){
					T.X.docEntry=T.P.docEntry;
					if(!T.X.text){ T.X.text='Se va a cerrar el documento'; }
					$Doc.statusDefine(T.X);
				}
			}
			else if(L.k=='statusN'){
				L.textNode='Anular';
				L.ico='fa fa_prio_high';
				L.X=L;
				L.X.api=this.api+'/statusCancel';
				L.func=function(T){
					T.X.docEntry=T.P.docEntry;
					if(!T.X.text){ T.X.text='Se va a anular el documento'; }
					$Doc.statusDefine(T.X);
				}
			}
			else if(L.k=='logs'){
				L.textNode='Historial';
				L.ico='fa fa-history';
				L.X=L;
				L.X.api=this.api+'/tb99';//reqMemo,opts,text
				L.func=function(T){
					T.X.docEntry=T.P.docEntry;
					$Doc.tb99(T.X);
				}
			}
			else if(L.k=='viewDac'){
				if(mdlAcc){
					L.textNode=' Contabilización';
					L.ico='fa fa-file-o';
					L.func=function(T){
						Gfi.Dcc.quickView({tt:P.tbSerie,tr:T.P.docEntry});
					}
				}else{ continue; }
			}
			tLi.push(L);
		}
		return $Opts.add(P.tbSerie,tLi,LD);
	};
}
iDoc.prototype.get=function(){
	var cont=$M.Ht.cont; ThiS=this;
	ThiS.G.api=ThiS.api;
	ThiS.G.tbSerie=ThiS.tbSerie;
	ThiS.G.inputs=$1.G.filter();
	ThiS.G.view='Y';
	ThiS.G.fOpts=function(T,td){
		$1.Menu.winLiRel({Li:ThiS.oLiSett(T.L),PB:T.L},td);
	}
	$Doc.tbList(ThiS.G,cont);
};
iDoc.prototype.view=function(){
		var ThiS=this;
		var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
		$Api.get({f:ThiS.api+'/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
			if(Jr.errNo){ return $Api.resp(cont,Jr); }
			var sNum=(ThiS.V.sortNum)?ThiS.V.sortNum:'lineNum';
			if(ThiS.V.sortNum!='N'){
				Jr.L=$js.sortBy(sNum,Jr.L);
			}
			ThiS.V.tbSerie=ThiS.tbSerie;
			ThiS.V.D=Jr;
			if(ThiS.V.btnsTop){
				var ksb='print,edit,statusC,statusN,logs,viewDac,';
				ThiS.V.btnsTop.ks=(ThiS.V.btnsTop.ks)?ThiS.V.btnsTop.ks+','+ksb:ksb;
				ThiS.V.btnsTop.Li=function(){ return ThiS.oLiSett(Jr) };
			}
			$Doc.view(cont,ThiS.V);
		}});
	};
iDoc.prototype.iForm=function(F,ThiS){//usar este, xk directo no usa variables JsV
		var Px=(Px)?Px:{};
		var P=$M.T.d(0,{D:{}}); var Pa=$M.read();
		var D=P.D;
		var cont=$M.Ht.cont;
		var AJs={};
		if(!D.docDate){ D.docDate=$2d.today; }
		$Api.get({f:ThiS.api+'/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
			if(Jr){ D=Jr; }
			F.tbSerie=ThiS.tbSerie;
			F.docEdit=Pa.docEntry;
			F.cont=cont;
			F.POST=ThiS.api;
			if(F.tbH){;
				for(var i in F.tbH.L){ var xL=F.tbH.L[i];
					if(!xL.I){ xL.I={}; }
					if(xL._topPare){ xL.I.topPare=cont; }//crd
					if(xL._D){ xL.I.D=D; }//crd
					if(xL._k){ xL.I.value=D[xL._k]; }
					else{ xL.I.value=D[xL.k]; }
				}
			}
			if(F.tbL){ F.tbL.L=D.L; }
			$Doc.form(F);
		}});
}
iDoc.prototype.formC=function(){
		var ThiS=this;
		var P=$M.T.d(0,{D:{}}); var Pa=$M.read();
		var D=P.D;
		var cont=$M.Ht.cont;
		var AJs={};
		if(!D.docDate){ D.docDate=$2d.today; }
		$Api.get({f:ThiS.api+'/form',inputs:'docEntry='+Pa.docEntry,loadVerif:!Pa.docEntry,loade:cont,func:function(Jr){
			if(Jr){ D=Jr; }
			ThiS.F.tbSerie=ThiS.tbSerie;
			ThiS.F.docEdit=Pa.docEntry;
			ThiS.F.cont=cont;
			ThiS.F.POST=ThiS.api;
			if(ThiS.F.tbH){;
				for(var i in ThiS.F.tbH.L){ var xL=ThiS.F.tbH.L[i];
					if(!xL.I){ xL.I={}; }
					if(xL._topPare){ xL.I.topPare=cont; }//crd
					if(xL._D){ xL.I.D=D; }//crd
					if(xL._k){ xL.I.value=D[xL._k]; }
					else{ xL.I.value=D[xL.k]; }
				}
			}
			if(ThiS.F.tbL){
				ThiS.F.tbL.L=D.L;
			}
			/* tbL:{xNum:'Y',xDel:'Y',docTotal:'Y',L:D.L,itmSea:'sell',rteIva:D.rteIva,rteIca:D.rteIca,
		kTb:'gvtItmL',AJs:[{k:'sellFactor',a:'numFactor'}], */
			$Doc.form(ThiS.F);
		}});

};

/* end Doc.v3 */
$Doc.formv0=function(P2){P2=(P2)?P2:{};
	cont=(P2.cont)?P2.cont:$M.Ht.cont;
	var contData=(P2.contData)?P2.contData:cont;
	jsF=(P2.jsF)?P2.jsF:'jsFields3';
	var nr=0; var Jr=P2.Jr;
	if(P2.Li){ P2.tbHead=P2.Li; }
	var handNum=false;
	if(P2.tbSerie){ P2.docEntry='N'; P2.go=P2.tbSerie;
		P2.serieOpts=$Tb.docSerie[P2.tbSerie];
	}
	else if(typeof(P2.Series)=='object'){ P2.serieOpts=P2.Series; }
	else if(P2.Series && P2.Series!='N'){ P2.serieOpts=$Doc.Series[P2.Series]; }
	else if($Doc.Serie[P2.serieOpts]){ P2.serieOpts=$Doc.Serie[P2.serieOpts]; }
	var divL=$1.T.divL({divLine:1,wxn:'wrapx10',L:'Serie',I:{tag:'select','class':jsF+' serieRow',name:'serieId',opts:P2.serieOpts,noBlank:1}},cont);
	if(P2.Series=='N' || P2.serieOpts=='N'){ $1.delet(divL.firstChild); }
	var qSerie=$1.q('.serieRow',cont);
	if(qSerie){ qSerie.onchange=function(){ handNum(); } }
	var tCont=divL;
	handNum=function(){
		if(qSerie){
			var o=_gO(qSerie.value,$Tb.docSerie[P2.tbSerie]);
			var div0=qSerie.parentNode;
			var clS='_serieHandNum';
			var antEx=$1.q('.'+clS,cont);
			if(antEx){ $1.delet(antEx.parentNode); }
			if(o && o.numAuto=='N'){
				var div=$1.T.divL({wxn:'wrapx10',L:'N°.',I:{tag:'input',type:'text','class':jsF+' '+clS,name:'docNum',value:P2.docNum}});
				$1.I.after(div,div0);
			}
		}
	}
	handNum();
	if(P2.docEntry!='N'){
		var inpDoc=$1.t('input',{type:'text','class':jsF,name:'docEntry',value:P2.docEntry,disabled:'disabled'});
		$1.T.divL({wxn:'wrapx10',L:{textNode:'N°.'},Inode:inpDoc},divL);
	}
	if(P2.tbH){
		if(!$DocTb.kTb[P2.tbH.kTb]){ $1.Win.message({text:'kTb no ha sido definido en la matriz para usar $Doc.form()-tbH'}); }
		else{
			var nFo=$js.clone($DocTb.kTb[P2.tbH.kTb]);
			for(var l in P2.tbH.L){ var Ld=P2.tbH.L[l];
				var dL=nFo[Ld.k];//fType, divL,
				var newLine=(dL.divLine || dL.nL);
				if(!dL.I){ dL.I={}; }
				for(var i3 in Ld.I){ dL.I[i3]=Ld.I[i3]; }
				for(var i2 in Ld){
					if(i2!=='I'){dL[i2]=Ld[i2]; }
				}
				if(newLine){ tCont=cont; }//agrega cont
				dL.I.tag=dL.lTag; delete(dL.lTag);
				if(dL.I['class']){ dL.I['class']=jsF+' '+dL.I['class']; }
				if(!dL.I['class']){ dL.I['class']=jsF; }
				if(dL.lt=='D'){
					if(newLine){ divT2=$1.t('div',0,cont); }
					$1.lTag(dL.I,divT2);
				}
				else{
					dL.Inode=$1.lTag(dL.I);
					divL=$1.T.divL(dL,tCont);
				}
				if(newLine){ tCont=divL; }//agrega siguientes en divL
			}
		}
	}
	if(P2.tbHead){ for(var l in P2.tbHead){ dL=P2.tbHead[l];//fType, divL,
		var newLine=(dL.divLine || dL.nL);
		if(!dL.I){ dL.I={}; }
		if(newLine){ tCont=cont; }//agrega cont
		var fType=(dL.fType)?dL.fType:false; delete(dL.fType);
		if(dL.lTag){ fType='lTag'; dL.tag=dL.lTag; delete(dL.lTag); }
		if(dL['class']){ dL['class']=jsF+' '+dL['class']; }
		if(dL.lt=='D'){ delete(dL.lt); delete(dL.nL);
			if(newLine){ divT2=$1.t('div',0,cont); }
			$1.lTag(dL,divT2);
		}
		else{
			switch(fType){
				case 'lTag':{
					dL.I.tag=dL.tag;
					dL.Inode=$1.lTag(dL.I);
					divL=$1.T.divL(dL,tCont);
				break;}
				case 'user':{
					divL=$1.T.divL({wxn:'wrapx10',L:'Usuario',I:{tag:'input',type:'text',value:$0s.userName,disabled:'disabled'}},tCont);
				break; }
				case 'date':{
					dL.wxn=(dL.wxn)?dL.wxn:'wrapx8';
					if(!dL.L){ dL.L='Fecha'; }
					var def={tag:'input','class':jsF,name:dL.name,type:'date',value:dL.value};
					if(!dL.I){ dL.I={}; }
					for(var id in def){ dL.I[id]=def[id]; }
					divL=$1.T.divL(dL,tCont);
				break;}
				case 'crd':{/*desuso,usar lTag crd */
					var _jsV={cardId:dL.cardId,cardName:dL.cardName};
				var sea= $crd.Fx.inpSeaCrd({_jsV:_jsV,value:dL.cardName,vPost:dL.vPost,jsF:jsF},null,cont);
				divL=$1.T.divL({divLine:dL.divLine,wxn:dL.wxn,L:dL.L,Inode:sea},tCont);
				break;}
				default:{//divL
					divL=$1.T.divL(dL,tCont);
				break;}
			}
		}
		if(newLine){ tCont=divL; }//agrega siguientes en divL
	}}
	if(P2.midCont){ cont.appendChild(P2.midCont); }
	if(P2.tbLines && !P2.tbLines.tagName && typeof(P2.tbLines)=='object'){ P2.tbLines.jsF=jsF;
		//P2.tbLines.itmAdd='N';
		var Rd=$DocTb.ini(P2.tbLines);
		P2.tbLines=Rd.fieldset;
		cont.appendChild(P2.tbLines);
	}
	if(P2.addC){ for(var i in P2.addC){ cont.appendChild(P2.addC[i]); } }
	var resp=$1.t('div',0,cont);
	var api=(P2.api)?P2.api:'';
	var addInp=(P2.addInputs)?'&'+P2.addInputs:'';
	if(P2.POST || P2.GET || P2.PUT || P2.DELETE){
		Prs={jsBody:cont,
			loade:resp, respDiv:resp, func:function(Jr2){
			if(Jr2.docEntry && inpDoc){ inpDoc.value=Jr2.docEntry; }
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo){
				if(P2.go && P2.func){ P2.funcx=function(){ $Doc.go(P2.go,'v',Jr2,1); P2.func(Jr2); } }
				else if(P2.go){ P2.funcx=function(){ $Doc.go(P2.go,'v',Jr2,1);} }
				if(P2.funcx){ P2.funcx(Jr2); }
				else if(P2.func){ P2.func(Jr2); }
			}
		}};
		if(P2.PUT){ Prs.PUT=P2.PUT; }
		else if(P2.DELETE){ Prs.DELETE=P2.DELETE; }
		else if(P2.POST){ Prs.POST=P2.POST; }
		$Api.send(Prs,cont);
	}
	else{
		Prs={f:api,jsBody:cont, loade:resp, respDiv:resp, func:function(Jr2){
			if(Jr2.docEntry){ inpDoc.value=Jr2.docEntry; }
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo){ if(P2.func){ P2.func(Jr2); } }
		}};
		Prs.textNode='Guardar Documento';
		$Api.send({textNode:'Guardar Documento'},cont);
	}
	if(P2.Forms){
		var dForms=$1.t('div',{'class':'DocForm_forms'},cont);
		for(var i in P2.Forms){
			var div=$1.t('div',{'class':'docFormsN_'+i},dForms);
			if(P2.Forms[i].divL){
				for(var i2 in P2.Forms[i].divL){
					var Lx=P2.Forms[i].divL[i2];
					Lx.Inode=$1.lTag(Lx.I);
					var divL=$1.T.divL(Lx);
					if(Lx.divLine){ div.appendChild(divL); tCont=divL; }
					else{ tCont.appendChild(divL); }

				}
			}
			else{
				var Lx=P2.Forms[i];
				if(Lx.L && Lx.L.errNo==1){ $Api.resp(div,Lx.L); }
				if(Lx.L && Lx.L.errNo){ Lx.L=[]; }
				if(Lx.sortBy){ Lx.L=$js.sortNum(Lx.L,{k:Lx.sortBy}); }
				var Rd=$DocTb.ini(Lx);
				div.appendChild(Rd.fieldset);
			}
		}
	}
},

$Doc.form0=function(P2){P2=(P2)?P2:{};
	cont=(P2.cont)?P2.cont:$M.Ht.cont;
	var contData=(P2.contData)?P2.contData:cont;
	jsF=(P2.jsF)?P2.jsF:'jsFields3';
	var nr=0; var Jr=P2.Jr;
	if($Doc.Serie[P2.serieOpts]){ P2.serieOpts=$Doc.Serie[P2.serieOpts]; }
	var divL=$1.T.divL({divLine:1,wxn:'wrapx10',L:'Serie',I:{tag:'select','class':jsF+' serieRow',name:'serieId',opts:P2.serieOpts,noBlank:1}},cont);
	if(P2.serieOpts=='N'){
		$1.delet(divL.firstChild);
	}
		var inpDoc=$1.t('input',{type:'text','class':jsF,name:'docEntry',value:P2.docEntry,disabled:'disabled'});
	var tCont=divL;
	$1.T.divL({wxn:'wrapx10',L:{textNode:'N°.'},Inode:inpDoc},divL);
	for(var l in P2.Li){ dL=P2.Li[l];//fType, divL,
		if(!dL.I){ dL.I={}; }
		if(dL.divLine){ tCont=cont; }//agrega cont
		var fType=(dL.fType)?dL.fType:'divL'; delete(dL.fType);
		if(dL.lTag){ fType='lTag'; dL.tag=dL.lTag; delete(dL.lTag); }
		if(dL['class']){ dL['class']=jsF+' '+dL['class']; }
		switch(fType){
			case 'user':{
				divL=$1.T.divL({wxn:'wrapx10',L:'Usuario',I:{tag:'input',type:'text',value:$0s.userName,disabled:'disabled'}},tCont);
			break; }
			case 'date':{
				dL.wxn=(dL.wxn)?dL.wxn:'wrapx8';
				if(!dL.L){ dL.L='Fecha'; }
				var def={tag:'input','class':jsF,name:dL.name,type:'date',value:dL.value};
				if(!dL.I){ dL.I={}; }
				for(var id in def){ dL.I[id]=def[id]; }
				divL=$1.T.divL(dL,tCont);
			break;}
			case 'crd':{/*desuso,usar lTag crd */
				var _jsV={cardId:dL.cardId,cardName:dL.cardName};
			var sea= $crd.Fx.inpSeaCrd({_jsV:_jsV,value:dL.cardName,vPost:dL.vPost,jsF:jsF},null,cont);
			divL=$1.T.divL({divLine:dL.divLine,wxn:dL.wxn,L:dL.L,Inode:sea},tCont);
			break;}
			case 'lTag':{
				dL.I.tag=dL.tag;
				dL.Inode=$1.lTag(dL.I);
				divL=$1.T.divL(dL,tCont);
			break;}
			default:{//divL
				divL=$1.T.divL(dL,tCont);
			break;}
		}
		if(dL.divLine){ tCont=divL; }//agrega siguientes en divL
	}
	if(P2.tbLines){
		cont.appendChild(P2.tbLines);
	}
	var resp=$1.t('div',0,cont);
	var api=(P2.api)?P2.api:'';
	var addInp=(P2.addInputs)?'&'+P2.addInputs:'';
	if(P2.POST || P2.GET || P2.PUT || P2.DELETE){
		Prs={jsBody:cont,
			loade:resp, respDiv:resp, func:function(Jr2){
			if(Jr2.docEntry){ inpDoc.value=Jr2.docEntry; }
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo){ if(P2.func){ P2.func(Jr2); } }
		}};
		if(P2.PUT){ Prs.PUT=P2.PUT; }
		else if(P2.DELETE){ Prs.DELETE=P2.DELETE; }
		else if(P2.POST){ Prs.POST=P2.POST; }
		$Api.send(Prs,cont);
	}
	else{
		Prs={f:api,jsBody:cont, loade:resp, respDiv:resp, func:function(Jr2){
			if(Jr2.docEntry){ inpDoc.value=Jr2.docEntry; }
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo){ if(P2.func){ P2.func(Jr2); } }
		}};
		Prs.textNode='Guardar Documento';
		$Api.send({textNode:'Guardar Documento'},cont);
	}
},


$Doc.btnsTop=function(k,P,cont){
	var pare=$1.t('div',{style:'padding:0.25rem; borderBottom:0.0625rem solid #000;'});
	cont.insertBefore(pare,cont.firstChild);
	if(k.match(/print,/g)){
		if(!P.contPrint){ P.contPrint=cont; }
		if(!P.Li){ P.Li=[]; }
		P.Li.unshift({k:'print',fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(P.contPrint); }});
	}
	for(var i in P.Li){ var L=P.Li[i];
		if(P.icoFa!='N' && L.ico){ L.fa=L.ico; }
		if(P.icons){
			L.title=L.textNode; L.textNode='';
		}
		var re = new RegExp(L.k+',', 'g');
		if(L.k && k.match(re)){
			$1.T.btnFa(L,pare);
			$1.t('span',{'textNode':' '},pare);
		}
	}
	return pare;
};
$Doc.tbList=function(P, cont){
	// adapter v2023.1.1
	if (P.req) {
		P.api = APIs.withPath(P.req.path, P.req.apiName);
		P.inputs = P.req.queryParams;
	}

	if (P.table) {
		P.TD = [];
		let i = 0
		for(const row of P.table) {
			P.TD[i] = {H:row.name, k:row.key}
			i++
		}
	}

	// end adapter
	if(P.justOne=='Y'){
		if(cont.classList.contains('_docTbList')){ return false; }
	}
	if(!cont.classList.contains('_docTbList')){
		cont.classList.add('_docTbList');
	 }
	var vPost=(P.inputs)?P.inputs:'';
	if(P.tbSerie){ P.tt=P.tbSerie; }
	else if(P.tt){ P.tbSerie=P.tt; }
	var trSum={};
	var getFields=false;
	if(P.tt && $Doc.FtbList && $Doc.FtbList[P.tt]){ getFields=$Doc.FtbList[P.tt]; }
	if(getFields){ vPost += '&getFields='+getFields; }
	$Api.get({f:P.api, inputs:vPost, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp(cont,Jr); }
		else if(Jr.L && Jr.L.errNo){ $Api.resp(cont,Jr.L); }
		else{
			var btns=(P.btns);
			var PTD=$js.clone(P.TD);
			var btnEdit=(P.btns && P.btns.match(/edit/));
			td0=false; td1=false;
			if(P._fView || P.docTo || P.viewTo){ td1='..'; P.view='N'; }
			if(!P.view || (P.view && P.view!='N')){ td1='N°.'; }
			if(P.edit || P._fEdit || P.fOpts || P.main || btns){ td0=true; }

			if(td1){ PTD.unshift({H:{textNode:td1,title:'_td1'},k:'_td1'});}
			if(td0){ PTD.unshift({H:{textNode:'.',title:'_td0'},k:'_td0'});}
			if(P.viewUid){ PTD.push({H:'uid',k:P.uidn}); }
			if(P.docBy){ PTD.push({H:'Realizado',k:'_docBy',docBy:P.docBy}); }
			if(P.docByUpd){ PTD.push({H:'Actualizado',k:'_docBy',docByUpd:P.docByUpd}); }
			if(P.docUpd){ PTD.push({H:'Actualizado',k:'_docBy',docByUpd:P.docUpd}); }
			var TV=false;
			var TH=[];
			var TL=[];
			var np=2;
			if(getFields){
				var s=getFields.split(',');
				TV={};
				for(var i in s){
				TV[(s[i]).replace(/.*\./,'')]=np; np++;
				}
			}
			for(var i in PTD){ var R=PTD[i];
				var agr=false; var iP=i;
				if(R.k=='_td0' || R.k=='_td1'){
					TH[iP]=R.H; TL[iP]=R;
				}
				else{ agr=true; }
				if(TV){
					if(TV[R.k]){ iP=TV[R.k]; agr=true; }
				}
				if(agr){ TH[iP]=R.H; TL[iP]=R; }
				if(P.trSum && P.trSum[R.k]){ trSum[R.k]=0; }
			}
			var trSepReps=0; /* repetir trs */
			var tb=$1.T.table(TH); /* */
			var nCols=TH.length;
			var tBody=$1.t('tbody',0,tb);
			for(var i in Jr.L){ var L =Jr.L[i];
				if(P.docEntryAlias){ L.docEntry=L[P.docEntryAlias]; }
				/* tr Separador */
				if(P.trSep && trSepReps<P.trSep.r){
					var rtt=P.trSep.func(L);
					if(rtt){ trSepReps++;
						var tr=$1.t('tr',0,tBody);
						rtt.colspan=nCols;  rtt.style='backgroundColor:#DDD';
						$1.t('td',rtt,tr);
					}
				}
				/* end Separador */
				var tr=$1.t('tr',0,tBody);
				var tdMenu=$1.t('td',{'class':'tdOpts'});
				var tdView=$1.t('td',{'class':'tdViews'});
				var nn=0;
				vidn=(P.vidn)?P.vidn:'docEntry';
				vid=(L[vidn])?L[vidn]:L.docEntry;
				if(P.uidn){ vidn=P.uidn; vid=L[vidn]; }
				vidt=vidn+':'+vid;
				if(btnEdit){ }
				/* dibujar cols para cada L */
				if (P.modify) {
					$1.T.btnFa({
						fa: 'fa-edit', title: 'Modificar', P: L, func: (T) => {
							if (typeof P.modify == 'string') {
								$M.to(P.modify , P.key_id +':' + T.P[P.key_id]);
							} else {
								P.modify(T.P);
							}
						}
					}, tdMenu);
				}
				else if(P.edit){
					$1.T.btnFa({fa:'fa-edit',title:'Modificar',P:{vidt:vidt},func:function(T){
						$M.to(P.tbSerie+'.form',T.P.vidt);
					}},tdMenu);
				}

				if(P._fEdit){
					$1.T.btnFa({fa:'fa-edit',title:'Modificar',P:L,func:(T)=>{
						P._fEdit(T.P);
					}},tdMenu);
				}
				if(P.fOpts){ P.fOpts({L:L},tdMenu); }
				if(P.main){
					Li={Li:P.main(L),PB:L,textNode:P.mainText};
					var mnu=$1.Menu.winLiRel(Li);
					tdMenu.appendChild(mnu);
				}
				//docNum
				if(P.viewTo){
					$1.t('a',{href:P.viewTo(L),'class':'fa fa-eye'},tdView);
				}
				if(P.docTo){
					$1.t('a',{href:P.docTo(L),textNode:L.docEntry,'class':'fa fa-eye'},tdView);
				}
				else if(P._fView){ 
					var tdView=$1.t('td',0,tdView);
					P._fView(L,tdView);
				}
				else if(!P.view || (P.view && P.view!='N')){ $Doc.TbSerie.a(P,L,tdView); }
				if(td0){ tr.appendChild(tdMenu); }
				if(td1){ tr.appendChild(tdView); }
				for(var n in TL){ var K=TL[n];
					if(K.k=='_td0' || K.k=='_td1'){ continue; }
					if(P.trSum && P.trSum[K.k]){
						trSum[K.k]+=L[K.k]*1;
					}
					if(K.tt && L[K.tr]>0){
						var tdView=$1.t('td',0,tr);
						var ttz=(L[K.tt])?L[K.tt]:L['tt'];
						var trz=(L[K.tr])?L[K.tr]:L['tr'];
						$Doc.ttGo(ttz,{docEntry:trz},tdView);
					}
					else{
						var tT=$1.setTag(K,L);
						if(!tT.style){ tT.style=''; }
						if(K._colMt){ tT.style += ColMt.get(K._colMt.k,L[K._colMt.v]); }
						var tdx=$1.t('td',tT,tr);
						
					}
					nn++;
				}
			}
			/* totales */
			if(P.trSum){
				var tr=$1.t('tr',0,tBody);
				for(var n in TL){ var tk=TL[n].k;
					var val=(trSum && trSum[tk])?trSum[tk]:'';
					if(P.trSum[tk]){ switch(P.trSum[tk].f){
						case '$': val=$Str.money(val); break;
						default : val=val*1; break;
					}}
					$1.t('td',{textNode:val},tBody);
				}
			}
			if(P.tbExport){
				tb=$1.T.tbExport(tb,P.tbExport);
			}
			cont.appendChild(tb);
		}
		if(P.aftFunc){ P.aftFunc(pare,Jr,P); }
	}});
}
$Doc.numSer=function(L,pare){
	return $Doc.href(L.tt,{docEntry:L.tr},{pare:pare,format:'serie'});
}

$Doc.TBs={
rep:function(K,tb){
	var R={};
var tb=($Doc.TBs[tb])?$Doc.TBs[tb]:{};
	for(var i in tb){ var L=tb[i];
		var tk=L.k; var k=L.k;
		if(K[k]){ tk=L.t;
			var text=K[k];
			if(L._g){
				var O=eval(L._g);
				text= (O && O[text])?O[text]:text;
			}
			else if(L.type=='object'){
				var O=eval(L.O);
				text= (O && O[text])?O[text]:text;
			}
			switch(tb[i].format){
				case 'money': text=$Str.money(text); break;
				case 'mil': text=$Str.toMil(text); break;
			}
			R[tk]=text;
		}
	}
	return R;
}
}
$Doc.ordBy=[
{k:'dateCDesc',v:'Fecha Creado. Z-A'},{k:'dateCAsc',v:'Fecha Creado. A-Z'},
{k:'docDateDesc',v:'Fecha Doc. Z-A'},{k:'docDateAsc',v:'Fecha Doc. A-Z'},
{k:'docEntryDesc',v:'Número Z-A'},{k:'docEntryAsc',v:'Número A-Z'}
];
$Doc.repLen={parcial:'Parcial','full':'Completo'};

$Doc.L={
itmWinSz:function(tBody,Pr){
	Drw.itemReader({cont:Pr.cont,tBody:tBody,fields:Pr.fields},{func:function(tBody,P){
		if(Pr.noWin=='Y'){ Pr.func({},P.JrS); }
		else{
			Itm.winAdd({priceDefiner:Pr.priceDefiner,can0:Pr.can0,func:function(Ds,L){
				for(var i in Ds.T){ L['itemSzId']=i; L['quantity']=Ds.T[i]; }
				Pr.func(Ds.T,L);
			}},P.JrS);
		}
		}});
},
winItem:function(tBody,Pr){
	Drw.itemReader({cont:Pr.cont,tBody:tBody,fields:Pr.fields},{func:function(tBody,P){
		if(Pr.noWin=='Y'){ Pr.func({},P.JrS); }
		else{
			Itm.winAdd({priceDefiner:Pr.priceDefiner,func:function(Ds,L){
				for(var i in Ds.T){ L['itemSzId']=i; L['quantity']=Ds.T[i];
					Pr.func(L);
				}
			}},P.JrS);
		}
		}});
}
}

$DocT={};//Doc Templates
$DocT.B={ /* funcional mayo 2019 */
h:function(P,cont){
	//t,v,vSty,ln, cs,
	var D=(P.D)?P.D:{};
	var dateC=(D.dateC)?D.dateC:P.dateC;
	var docEntry=(D.docEntry)?D.docEntry:P.docEntry;
	serie=($V.docSerieType[P.serieType])?$V.docSerieType[P.serieType]:P.serieType;
	if($Doc.a[P.serieType] && $Doc.a[P.serieType].docT){ serie=$Doc.a[P.serieType].docT; }
	if(P.print){ //parentNode debe definirse
		var divTop=$1.t('div',{style:'marginBottom:0.5rem;'});
		cont.parentNode.insertBefore(divTop,cont);
		var btnPrint=$1.T.btnFa({fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(cont); }});
		divTop.appendChild(btnPrint);
	}
	if(P.divTop){
		if(!divTop){
			var divTop=$1.t('div',{style:'marginBottom:0.5rem;'});
			cont.parentNode.insertBefore(divTop,cont);
		}
		divTop.appendChild(P.divTop);
	}
	//cols y columna media
	if(!P.cols){ P.cols=8; }
	else{ if(P.cols<4){ P.cols=4; }
		if(P.cols && P.cols>10){ P.cols=10; }
		else{ P.cols=P.cols; }
	}
	var mcols=P.cols-2;
	var middCols=mcols-2; //texto
	var no=$1.t('div',0); $1.t('b',{textNode:'N°.: '},no); $1.t('span',{textNode:docEntry},no);
	var serieT=$1.t('div',{textNode:serie,style:'text-align:center; font-weight:bold;'});
	var ct=$1.t('div',0); $1.t('b',{textNode:'Creado: '},ct); $1.t('span',{textNode:dateC},ct);
	if(P.base!='N'){
		Ls=[
		{v:no,vSty:'width:6rem;'},{v:serieT,cs:mcols-1,ln:1},{v:ct,cs:2,ln:1,vSty:'width:14rem;'}
		];
	}
	for(var i in P.Ls){ var t=P.Ls[i];
		if(t.middleInfo){
			var tmdcols=(t.middleInfo!='Y' && t.middleInfo>0)?t.middleInfo:middCols;
			var td=$1.t('div');
			$1.t('div',{textNode:$Soc.licTradType+':\u0020'+$Soc.licTradNum},td);
			$1.t('div',{textNode:$Soc.address},td);
			$1.t('div',{textNode:$Soc.pbx},td);
			$1.t('div',{textNode:$Soc.mail},td);
			$1.t('div',{textNode:$Soc.web},td);
			t={v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:tmdcols,rs:3};
		}
		else if(t.tag=='docEntry'){ t.v=no; }
		else if(t.tag=='dateC'){ t.v=no; }
		else if(t.tag=='docDate'){ t.t='Fecha'; t.v=D.docDate; }
		else if(t.tag=='cliente'){ t.t='Cliente'; t.v=D.cardName; }
		else if(t.tag=='lineMemo'){ t.v=D.lineMemo; }
		else if(t.tag=='serieName'){ t.v=serieT; }
		else if(t.logoRight){
			var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo});
			t={v:logo,vSty:'width:20rem;text-align:right;',ln:1,rs:3,cs:2};
			if(t.logoRight!='Y' && t.logoRight>1){ t.cs=t.logoRight; }
		}
		Ls.push(t);
	}
	var tb=$1.Tb.trCols(Ls,{cols:P.cols,styT:P.styT,styDef:P.styDef},cont);
},
l:function(P,tBodyr){
	if(!tBodyr){
		var tb=$1.T.table(P.tb);
		var fie=$1.T.fieldset(tb,{L:{textNode:'Lineas Documento'}});
		var tBody=$1.t('tbody',0,tb);
	}else{ tBody=tBodyr; }
	if(P.pare){ P.pare.appendChild(fie); }
	var tr=$1.t('tr',0,tBody);
	for(var i in P.Td){ var L=P.Td[i];
		if((typeof(L)=='object')){
			if(L.tdNode){ tr.appendChild(L.tdNode); }
			else if(L.node){ $1.t('td',0,tr).appendChild(L.node); }
			else{ $1.t('td',((typeof(L)=='object')?L:{textNode:L}),tr); }
		}
		else{ $1.t('td',{textNode:L},tr); }
	}
	if(P.softFrom=='Y'){
			$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},fie.parentNode);
	}
	if(!tBodyr){ return tb; }
}
}

$Tpt={
T:{},
use:function(k,cont,P){//define cual usar con mensaje
	if($Tpt.T[k]){ $Tpt.T[k](cont,P); return true; }
	else{ $Api.resp(cont,{errNo:3,text:'La plantilla no ha sido definida ('+k+') on[$Tpt.T]'}); return false; }
},
draw:function(cont,P){
	var tb=$1.T.table(P.Tb);
	var tBody=$1.t('tbody',0,tb);
	$Tpt.h({base:P.base,serieType:P.serieType,print:'Y',D:P.D,styDef:'width:6rem;',styT:'font-weight:bold;',Ls:P.Ls},cont);
	if(P.middleCont){ $1.t('div',{style:'margin:0.5rem 0; padding:0.5rem;',node:P.middleCont},cont); }
	else{ $1.t('p',0,cont); }
	if(P.fieldset){
		var fie=$1.T.fieldset(tb,{L:{textNode:P.fieldset}}); cont.appendChild(fie);
	}else{ cont.appendChild(tb); }
	tb.classList.add('table_x100');
	for(var i in P.Trs){
		var tR=(P.Trs[i].tr)?P.Trs[i].tr:0;
		if(P.trPrp){ tR=P.trPrp; }
		var tr=$1.t('tr',tR,tBody);
		for(var i2 in P.Trs[i]){
			var td=$1.t('td',P.Trs[i][i2],tr);
		}
	}
	if(P.bottomCont){ $1.t('div',{style:'font-size:0.75rem; text-align:center;',node:P.bottomCont},cont); }
	if(P.softFrom=='Y'){
		if($Soc.softFrom==undefined){
			$Soc.softFrom = 'Realizado para '+$0s.Soc.ocardName+' desde ADM Sistems';
		}
		$1.t('div',{textNode:$Soc.softFrom,style:'font-size:0.75rem; text-align:center; padding:0.25rem;'},cont);
	}
	if(P.Foot){
		var tFo=$1.t('tfoot',0,tb);
		for(var i in P.Foot){
			var tr=$1.t('tr',0,tFo);
			for(var i2 in P.Foot[i]){
				var L=P.Foot[i][i2];
				L.style=(L.style)?'text-align:right; '+L.style:'text-align:right;';
				$1.t('td',L,tr);
			}
		}
	}
},
h:function(P,cont){
	//t,v,vSty,ln, cs,
	var D=(P.D)?P.D:{};
	var dateC=(D.dateC)?D.dateC:P.dateC;
	var docEntry=(D.docEntry)?D.docEntry:P.docEntry;
	serie=($V.docSerieType[P.serieType])?$V.docSerieType[P.serieType]:P.serieType;
	if($Doc.a[P.serieType] && $Doc.a[P.serieType].docT){ serie=$Doc.a[P.serieType].docT; }
	if(P.print){ //parentNode debe definirse
		var divTop=$1.t('div',{style:'marginBottom:0.5rem;'});
		cont.parentNode.insertBefore(divTop,cont);
		var btnPrint=$1.T.btnFa({fa:'fa_print',textNode:' Imprimir', func:function(){ $1.Win.print(cont); }});
		divTop.appendChild(btnPrint);
	}
	//cols y columna media
	if(!P.cols){ P.cols=8; }
	else{ if(P.cols<4){ P.cols=4; }
		if(P.cols && P.cols>10){ P.cols=10; }
		else{ P.cols=P.cols; }
	}
	var mcols=P.cols-3;
	Ls=[];
	//for(var ix=1; ix<=P.cols; ix++){ Ls.push({t:ix}); }
	var colMid=P.cols-4;
	var no=$1.t('div',0); $1.t('b',{textNode:'N°.: '});
	$1.t('span',{textNode:docEntry},no);
	var serieT=$1.t('div',{textNode:serie,style:'text-align:center; font-weight:bold;'});
	var ct=$1.t('div',0); $1.t('b',{textNode:'Creado: '},ct); $1.t('span',{textNode:dateC},ct);
	if(P.base!='N'){
		Ls=[
		{v:no,vSty:'width:6rem;'},{v:serieT,cs:mcols,ln:1},{v:ct,cs:2,ln:1,vSty:'width:14rem;'}
		];
	}
	for(var i in P.Ls){ var t=P.Ls[i];
		if(t.middleInfo){
			var td=$1.t('div');
				$1.t('div',{textNode:$Soc.licTradType+':\u0020'+$Soc.licTradNum},td);
			$1.t('div',{textNode:$Soc.address},td);
			$1.t('div',{textNode:$Soc.pbx},td);
			$1.t('div',{textNode:$Soc.mail},td);
			$1.t('div',{textNode:$Soc.web},td);
			t={v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:colMid,rs:3};
		}
		else if(t.tag=='docEntry'){ t.v=no; }
		else if(t.tag=='dateC'){ t.v=no; }
		else if(t.tag=='docDate'){ t.t='Fecha'; t.v=D.docDate; }
		else if(t.tag=='cliente'){ t.t='Cliente'; t.v=D.cardName; }
		else if(t.tag=='lineMemo'){ t.v=D.lineMemo; }
		else if(t.tag=='serieName'){ t.v=serieT; }
		else if(t.logoLeft){
			var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo});
			t={v:logo,vSty:'width:20rem;text-align:left;',rs:3};
		}
		else if(t.logoRight){
			var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo});
			t={v:logo,vSty:'width:20rem;text-align:right;',ln:1,cs:2,rs:3};
			if(t.logoRight!='Y' && t.logoRight>0){ t.cs=t.logoRight; }
		}
		Ls.push(t);
	}
	var tb=$1.Tb.trCols(Ls,{cols:P.cols,styT:P.styT,styDef:P.styDef},cont);
},
}

$DocF={
line:function(D,P,tb){
	var lineName=P.lineName;
	var jsF=(P.jsF)?P.jsF:'jsFields';
	var tr=$1.t('tr');
	for(var n in P.F){
		var tF=P.F[n];
		var k=(tF.kn)?tF.kn:tF.k;/* definido. defWhs--> whsId*/
		var kd=(tF.kd)?tF.kd:tF.k;/* definido. defWhs--> whsId*/
		var td=$1.t('td');
		var name=lineName+'['+k+']';
		if(tF.kty=='data-vPost'){
			tr.setAttribute('data-vPost','Y');
			tr.vPost= $Doc.vPName(tF.vPost,D,lineName);
			continue;
		};
		if(tF.I){ tF.I.name = name;
			if(tF.I['class']){ tF.I['class']=jsF+' '+tF.I['class']; }
			else{ tF.I['class']=jsF; }
		}
		var tval=D[kd];
		if(tF.ccat){/*Concatenar campos 140 dcm*/
			tval='';
			for(var i in tF.ccat){ var kf=tF.ccat[i];
				tval += D[kf];
			}
		}
		switch(tF.kty){
			case 'quantity':{
			var Ls={type:'number','class':jsF+' '+tbSum.tdNum,name:name,inputmode:'numeric',min:0,style:'width:6rem;',value:tval};
			Ls.onkeychange=function(T){ tbSum.get(T.parentNode.parentNode.parentNode.parentNode); }
			var inp=$1.t('input',Ls,td);
			break};
			case 'price':{
			var Ls={type:'text','class':jsF+' '+tbSum.tdNum2,name:name,numberfomat:'mil',style:'width:6rem;',value:tval};
			Ls.onkeychange=function(T){ tbSum.get(T.parentNode.parentNode.parentNode.parentNode); }
			var inp=$1.t('input',Ls,td);
			break};
			case 'priceLine': var td=$1.t('td',{'class':tbSum.tdTotal,vformat:'money',style:'width:8rem;'}); break;
			case 'factor': var td=$1.t('td',{'class':jsF+' '+tbSum.tdFactor,style:'width:8rem;',textNode:tval}); break;
			case 'select':{
				var inp=$1.T.sel({'class':jsF,name:name,opts:tF.opts,selected:tval});
				td.appendChild(inp);
			}break;
			case 'input': var inp=$1.t('input',tF.I,td); break;
			case 'delete':
				var inp=$1.t('input',tF.I,td);
			break;
			default:
				var text=(tF.funcText)?tF.funcText(D):tval;
				td.appendChild($1.t('textNode',text));
			break;
		}
		if(td){ td.setAttribute('k-line',k); }
		tr.appendChild(td);
		if(inp && tF.vPost){
			inp.setAttribute('data-vPost','Y');
			inp.vPost=$Doc.vPName(tF.vPost,D,lineName);;
		}
		else if(inp && tF.vPost){
			inp.vPost={};
			for(var nn in tF.vPost){ var k2=tF.vPost[nn];//[itemId,itemSzId]
				var name=lineName+'['+k+']';
				{O:{vPost:name+'='+D[k]+'&'}};
			}
		}
		if(inp && tF.O){ for(var e in tF.O){ inp[e]=tF.O[e]; } }
	}
	if(P.tdDel!='N'){
		var td=$1.t('td',0,tr);
		var btnFa=$1.T.btnFa({fa:'fa fa_close',textNode:' Eliminar',func:function(T){ $1.delet(T.parentNode.parentNode); }},td);
	}
	if(tb){ tBody=$1.q('tbody',tb);
		if(tBody){ tBody.appendChild(tr); }
		tbSum.get(tb);
	}
	return tr;
}

};//parametrizar forms

var $dTb={/* designTable */
/* Fields para table
[invMov]={docDate:{t}}
*/
F:{},
line:function(D,L){
	/*D{tHead,tBody,tHs,F,k}  */
	var F=($dTb.F[D.k])?$dTb.F[D.k]:{};
	if(D['#']){ F['#']={t:'#'}; }
	if(D.F){ F=D.F; }
	if(D.tHead){
		var tr=$1.t('tr',0,D.tHead); var nl=0;
		for(var i in D.tHs){
			if(i=='__quit'){ D.tHs[i]={t:''}; }
			var X=D.tHs[i];
			var t=(F[i])?F[i].t:i;
			if(X.rt){ t=X.rt; }/* reemplaza texto, oClass por Fase */
			$1.t('td',{textNode:t},tr);
		}
	}
	if(D.tBody && L){
		var tr=$1.t('tr',0,D.tBody);
		for(var i in D.tHs){ var X=D.tHs[i]; var tL={};
			if(X.rk){ i=X.rk; }/* reemplaza texto, oClass por Fase */
			var tex=(L[i])?L[i]:'';
			if(typeof(L[i])=='object'){ tL=L[i]; tL.Y=true; };
			if(i=='__quit'){
				if(typeof(L[i])!='object'){ L[i]={}; }
				tL=L[i]; tL.Y=true;
				tL.node=$1.T.btnFa({fa:'fa_close',textNode:'Quitar',func:function(T){ $1.delet(T.parentNode.parentNode); }})
			}

			if(i=='created'){ tex=$Doc.by('userDate',L); }
			else if(i=='modified'){ tex=$Doc.by('userDate',{userId:L.userUpd,dateC:L.dateUpd}); }
			if(tL.Y){
				var td=$1.t('td',0,tr);
				if(tL.tag){ var tag=tL.tag;
					tL.T=(tL.T)?tL.T:{};
					if(tag=='select'){
						$1.T.sel(tL.T,td);
					}
					else{
						if(tag=='number'){ tag='input'; tL.T.type='number'; tL.T.inputmode='numeric'; }
						else if(tag=='text'){ tag='input'; tL.T.type='text'; }
						$1.t(tag,tL.T,td);
					}
				}
				else if(tL.node){ td.appendChild(tL.node); }
			}
			else{ var td=$1.t('td',{textNode:tex},tr); }
		}
	}
}
}

sHt={};//headTopHTML
sHt.docHeadBase=function(Jr,cont){
	var td=$1.t('div');
		$1.t('div',{textNode:$Soc.licTradType+':\u0020'+$Soc.licTradNum},td);
	$1.t('div',{textNode:$Soc.address},td);
	$1.t('div',{textNode:$Soc.pbx},td);
	$1.t('div',{textNode:$Soc.mail},td);
	$1.t('div',{textNode:$Soc.web},td);
	var logo=$1.t('img',{style:'width:20rem;',src:$Soc.logo});
	var tr4_1=(Jr.tr4_1)?Jr.tr4_1:{t:'',v:''};
	var Ls=[
	{v:'Estado: '+Jr.docStatusText},{v:Jr.docTitle,vSty:'text-align:center; font-weight:bold;',cs:6,ln:1},{v:'Creado: '+Jr.dateC,ln:1},
	{t:'Número',v:Jr.docEntry},
		{v:td,vSty:'width:20rem; text-align:center; vertical-align:middle',ln:1,cs:4,rs:3},
		{v:logo,vSty:'width:20rem;text-align:right;',ln:1,cs:2,rs:3},
	{t:'Fecha Doc.',v:Jr.docDate,vSty:'width:7rem;'},
	{t:tr4_1.t,v:tr4_1.v},
	{t:'Notas',v:Jr.lineMemo,cs:7}
	];
	var tb=$1.Tb.trCols(Ls,{cols:8,styT:'width:7rem; font-weight:bold;'},cont);
}
