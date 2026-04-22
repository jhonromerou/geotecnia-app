var $Packi={
/*BCodes */
cInp:{},/* Inputs guardados */
form:function(P,cont){
	$Packi.formBC({api:P.api,docEntry:P.docEntry,btnPut:'Y'},cont); 
},
sBC:{},
Reads:{},/* Capturas */
inputBC:function(P,pare){
	var liner=$1.t('input',{type:'text','class':'iBg iBg_barcode',id:'__invInpBarCode',placeholder:'Lea o digité el código'});
	if(P.box!='N'){
		var box=$1.t('input',{type:'text',id:'__invInpBoxData','class':'iBg iBg_recibir',placeholder:'1,A4'});
		var divL= $1.T.divL({divLine:1,wxn:'wrapx8',wxT:{style:'width:5rem;'},Inode:box});
		$1.T.divL({wxn:'wrapx2',wxT:{style:'min-width:70%;'},Inode:liner},divL);
	}
	else{ 
		var divL= $1.T.divL({divLine:1, supText:'Código de Barras...',wxn:'wrapx1',Inode:liner});
	}
	inp= $1.q('#__invInpBarCode',divL);
	inp.onkeyup = function(ev){ This=this;
		$js.isKey(ev,'enter',{func:function(){//onRead
			$Packi.readBC(This.value,P); This.value='';
		}});
	}
	if(pare){ pare.appendChild(divL); }
	return divL;
},
readBC:function(barCode,P){ P=(P)?P:{};
	boxNum='';
	var boxN=$1.q('#__invInpBoxData'); if(boxN){ boxNum=boxN.value; }
	if(!$Packi.sBC){ $Packi.sBC ={}; }
	if($Packi.sBC[barCode]){
		if(P.func){ P.func($Packi.sBC[barCode],boxNum); }
	}
	else{
	$Api.get({f:Api.Itm.b+'sea/barcode', inputs:'barCode='+barCode, func:function(Jr){
		if(Jr.errNo){ $1.Win.message(Jr); }
		else{
			$Packi.sBC[barCode] = Jr;
			if(P.func){ P.func($Packi.sBC[barCode],boxNum); }
		}
	}});
	}
},
formBC:function(P,cont){
	//api,
	var P=(P)?P:{};
	cont=(cont)?cont:$M.Ht.cont;
	$Api.get({f:P.api,inputs:'docEntry='+P.docEntry, loadVerif:!P.docEntry, loade:cont, func:function(Jr){
		if(Jr.errNo){ $Api.resp($1.t('div',0,cont),Jr); return false; }
			$1.t('h3',{textNode:'Doc.: '+P.docEntry},cont);
		$1.t('b',{textNode:'Estado: '+_g(Jr.docStatus,$V.docStatus)},cont);
		var wList=$1.t('div',0,cont);
		//barcode
		var tbBase=(P.tbBase=='Y');
		$Packi.sBC={};
		$Packi.cInp={}; $Packi.dB={T:{},I:{}};
		$Packi.Reads={n:1,nuM:{},T:{},Tb:[{_null:'Y'}]};
		//n contador, nuM:key, T:Tallas, I:Total items, Tb:C1-501-40
		$Packi.inputBC({func:function(Jr,boxNum){
			Jr.boxNum=boxNum;
			$Packi.setReadBC(Jr,{func:function(){
				$Packi.drawTb(wrapCons);
				if(tbBase){
					$Packi.recalDb(Jr);
					$Packi.tbBase(cont);
				}
			}});
		}},cont);
		var wrapCons=$1.t('div',{id:'_tableConsol'},cont);
		var resp = $1.t('div',0,cont);
		$1.T.btn({textNode:'Guardar *',func:function(T){
			var tD=$Packi.getData();
			if(P.btnPut){
				$Api.put({f:P.api,jsAdd:{docEntry:P.docEntry,I:tD.Ix,L:tD.Lx},func:function(Jr2){
				$Api.resp(resp,Jr2);
					if(P.func){ P.func(Jr2,{L:$Packi.Reads.L},resp,T); }
				}});
			}
			else{
				if(P.func){ P.func(Jr2,{I:Ix,L:$Packi.Reads.L},resp,T); }
			}
		}},cont);
		if(tbBase){
			var tb=$1.t('fieldset',0,cont);
			$1.t('legend',{textNode:'Table de Totales y Capturas'},tb);
			var wConsol = $1.t('div',{'class':'_ivtPackiTbBase'},tb);
			if(tbBase && Jr.Lb && !Jr.Lb.errNo){
				for(var i in Jr.Lb){
					Jr.Lb[i].openQty*=1;
					$Packi.setDb(Jr.Lb[i]);
				}
			}
		}
		if(Jr.L && !Jr.L.errNo){
			for(var i in Jr.L){ Jr.L[i].quantity*=1; Jr.L[i].breads*=1;
				if(tbBase){ $Packi.setDb(Jr.L[i]); }
				$Packi.setReadBC(Jr.L[i],P,cont);
			}
			$Packi.drawTb(wrapCons);
			if(tbBase){ $Packi.tbBase(cont); }
		}
	}
	});
},
getData:function(){
	var Ix={}; var Lx=[];
	var uno=1;
	for(var i in $Packi.cInp){ 
		var Tag=$Packi.cInp[i].D;
		var k=Tag.itemId+'_'+Tag.itemSzId;
		if(!Ix[k]){ Ix[k]=$js.clone(Tag);}
		else{
			Ix[k].quantity += Tag.quantity;
			Ix[k].breads +=Tag.breads*1;
		}
		Lx.push(Tag);
	}
	return {Ix:Ix,Lx:Lx};
},
setReadBC:function(O,P,cont){
	var k ='_'+O.itemId;
	P=(P)?P:{}; var boxNum='';
	if(O.boxNum){ boxNum=O.boxNum;
		if(!isNaN(boxNum)){ boxNum = boxNum*1; }
		var k ='_'+boxNum+'_'+O.itemId;
	}
	/* L:Datos, Tb: Para tabla con datos */
	var ta = O.itemSzId;
	$Packi.Reads.T[ta] = _g(ta,$V.grs1)+'--'+ta;
	var qtyAdd=(O.quantity)?O.quantity:1;
	var bReaAdd=(O.breads)?O.breads:1;
	if(!$Packi.Reads.nuM[k]){
			var n=$Packi.Reads.n;
		$Packi.Reads.nuM[k] =n; $Packi.Reads.n++;
	}
	var n =$Packi.Reads.nuM[k];
	if(!$Packi.Reads.Tb[n]){
		$Packi.Reads.Tb[n] = {boxNum:boxNum,itemCode:O.itemCode,itemName:O.itemName};
		$Packi.Reads.Tb[n]['T'] = {};
	}
	if(!$Packi.Reads.Tb[n]['T'][ta]){ 
		$Packi.Reads.Tb[n]['T'][ta] = {boxNum:boxNum,itemId:O.itemId,itemSzId:O.itemSzId,quantity:0,breads:0 };
		if(O.id){ $Packi.Reads.Tb[n]['T'][ta].id=O.id; }
	}
	var kkey='_'+boxNum+'_'+O.itemId+'_'+O.itemSzId;
	if($Packi.cInp[kkey]){
		$Packi.cInp[kkey].value=$Packi.cInp[kkey].value*1+1;
		$Packi.Reads.Tb[n]['T'][ta].quantity=$Packi.cInp[kkey].value;
	}
	else{ $Packi.Reads.Tb[n]['T'][ta].quantity += qtyAdd; }
	$Packi.Reads.Tb[n]['T'][ta].breads += bReaAdd;
	if(P.func){ P.func(); }
	
},
drawTb:function(cont){/*Dibujar capturas */
	cont.innerHTML='';
	var TH=[{textNode:''},'Código','Nombre'];
	for(var i in $Packi.Reads.T){
		TH.push($Packi.Reads.T[i]);
	}
	TH.push({textNode:'Total'});
	var tb=$1.T.table(TH,0,cont);
	var tBody=$1.t('tbody',0,tb);
	for(var i in $Packi.Reads.Tb){
		var X=$Packi.Reads.Tb[i];
		if(X._null){ continue; }
		var tr=$1.t('tr',{'class':$Api.JS.clsL},tBody);
		$1.t('td',{textNode:X.boxNum},tr);
		$1.t('td',{textNode:X.itemCode},tr);
		$1.t('td',{textNode:X.itemName},tr);
		var total=0;
		for(var i2 in $Packi.Reads.T){
			var Xt=X.T[i2];
			if(Xt && Xt.quantity){
				var val=Xt.quantity*1; total+=val;
				var td=$1.t('td',0,tr);
				var kkey='_'+Xt.boxNum+'_'+Xt.itemId+'_'+Xt.itemSzId;
				$Packi.cInp[kkey]=$1.t('input',{type:'text',inputmode:'numeric',min:0,value:val,'class':'__tdQty '+$Api.JS.clsLN,style:'width:3rem;'},td);
				$Packi.cInp[kkey].D={boxNum:Xt.boxNum,itemId:Xt.itemId,itemSzId:Xt.itemSzId,breads:Xt.breads,quantity:val,breads:Xt.breads};
				if(Xt.id){ $Packi.cInp[kkey].D.id=Xt.id; }
				$Packi.cInp[kkey].keyChange(function(T){ trTotal(T.parentNode.parentNode,T); });
			}
			else{ $1.t('td',{textNode:''},tr); }
		}
		$1.t('td',{textNode:total,'class':'__tdTotal'},tr);
	}
	function trTotal(tr,T){
		var s=$1.q('.__tdQty',tr,'all');
		var total=0; var tdTotal=$1.q('.__tdTotal',tr);
		for(var i=0; i<s.length; i++){
			total += s[i].value*1;
		}
		T.D.quantity=T.value*1;
		$Packi.recalDb(T.D);
		tdTotal.innerText=total;
		$Packi.tbBase();
	}
},
dB:{T:{},I:{}},/* itemId-itemSzId */
recalDb:function(D){
	var qty=0;
	for(var i in $Packi.cInp){
		var L=$Packi.cInp[i].D;
		if(L.itemId==D.itemId && L.itemSzId==D.itemSzId){ qty+= $Packi.cInp[i].value*1; }
	}
	$Packi.setDb(D,{quantity:qty});
},
setDb:function(L,Sett){
	var ite=L.itemId; var ta=L.itemSzId;
	if(!$Packi.dB.T[ta]){ $Packi.dB.T[ta]=_g(ta,$V.grs1); }
	if(!$Packi.dB.I[ite]){ $Packi.dB.I[ite]=L; $Packi.dB.I[ite].T={}; }
	if(!$Packi.dB.I[ite].T[ta]){ $Packi.dB.I[ite].T[ta]={quantity:0,openQty:0}; }
	if(Sett){
		$Packi.dB.I[ite].T[ta].quantity =Sett.quantity;
	}
	else{
		if(L.quantity){ $Packi.dB.I[ite].T[ta].quantity += L.quantity; }
		if(L.openQty){ $Packi.dB.I[ite].T[ta].openQty += L.openQty; }
	}
},
tbBase:function(pare){
	var cont=$1.q('._ivtPackiTbBase',pare);
	cont.innerHTML='';
	var TH=['Código','Descripción'];
	for(var i in $Packi.dB.T){
		TH.push($Packi.dB.T[i]);
	}
	TH.push({textNode:'Total'});
	var tb=$1.T.table(TH,0,cont);
	var tBody=$1.t('tbody',0,tb);
	for(var i in $Packi.dB.I){ var L=$Packi.dB.I[i];
		var tr=$1.t('tr',0,tBody);
		var tr2=$1.t('tr',0,tBody);
		$1.t('td',{textNode:L.itemCode},tr);
		$1.t('td',{textNode:L.itemName},tr);
		$1.t('td',0,tr2);
		$1.t('td',0,tr2);
		var total=0; var total2=0;
		for(var i in $Packi.dB.T){
			var tC=L.T[i];
			var val=val2='';
			if(tC && tC.openQty){ val=tC.openQty*1; total +=val; }
			if(tC && tC.quantity){ val2=tC.quantity*1; total2 +=val2; }
			var css2='';
			if(val=='' && val2>0){ css2='backgroundColor:purple;'; }
			else if(val!='' && val2==''){ css2='backgroundColor:yellow;'; }
			else if(val2>val){ css2='backgroundColor:orange;'; }
			else if(val==val2){ css2='backgroundColor:green;'; }
			else if(val!=val2){ css2='backgroundColor:blue;'; }
			$1.t('td',{textNode:val},tr);
			$1.t('td',{textNode:val2,style:css2},tr2);
		}
		$1.t('td',{textNode:total},tr);
		$1.t('td',{textNode:total2},tr2);
	}
}
}