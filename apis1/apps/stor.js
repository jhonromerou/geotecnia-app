Api.Stor='/v1/5f/';
var $Stor={
wid:'winFileUpd_',
svr:'http://api0.admsistems.com/xl/pubapps/uploadFile',
svrV:'http://stor1.admsistems.com/view',
formLine:function(P,pare){
	delete(P.getList);
	P.apiG='updAndTable';
	return $Stor.btn(P,pare);
},
btn:function(P,pare){ P=(P)?P:{};
	if($s.storage=='L'){ $Stor.svr='/_files/uploadFile.php'; }
	var wrap = $1.t('div',P.wT,pare);
	if(!P.vP){ P.vP={}; }
	var wid=(P.wid)?P.wid:'storUpd';
	var formu = $1.t('form',{name:'psUploadFileForm','style':'padding:5px 0;'},wrap);
	var dFile = $1.t('div');
	var iFile = $1.t('input',{type:'file', id:'file', 'class':'psUFile psUFile_x32', name:'file'},formu);
	var resp = $1.t('div',{'class':'__storUpdResp'},formu);
	var iLabel = $1.t('label',{'for':'file',textNode:'Selección de Archivo'},formu);
	$1.t('span',{'class':'fa fa-info',title:'Storage: '+$s.storage+', svr: '+$Stor.svr},formu);
	iFile.setAttribute('multiple',true);
	iFile.onchange = function(){
		if(this.files.length>3){ $1.Win.message({text:'No puede seleccionar más de 3 archivos.'}); }
		else{ $Stor.revStor(this,P,wrap); $1.clearInps(this.parentNode); }
	}
	var wList = $1.t('div',{id:wid,'class':'_5f_wrapList',style:'margin-top:15px;'},wrap);
	P.wList=wList;
	var inpS=$1.t('input',{type:'hidden','class':'jsFiltVars',name:'searchFie',value:'',O:{vPost:vPostBase}},wrap);
	if(P.open=='Y'){ iFile.click(); }
	if(P.getList=='tt'){ $Stor.ttgetL(P); }
	if(P.winTitle){
		$1.delet(wid+'_');
		$1.Win.open(wrap,{winTitle:P.winTitle,onBody:1,winSize:'medium',winId:wid+'_'});
	}
	return wrap;
},
revStor:function(Tfile,P,wPare){
	var total=0; var r=false;
	var tFile=Tfile.files; var maxFi=0;
	for(var i=0; i<tFile.length; i++){
		var fiSize=tFile[i].size;
		if(maxFi<fiSize){ maxFi=fiSize; }
		total += fiSize;
	}
	var vPost='storGet=Y&ocardCode='+$0s.ocardCode+'&maxFile='+maxFi+'&upTotal='+total
	$Api.get({url:$Stor.svr,f:'',inputs:vPost,func:function(Jr){
		if(Jr.errNo){ $1.Win.message(Jr); return false; }
		if(Jr.tooken){ P.vP['tooken']=Jr.tooken; }
		if(P.put){ $Stor.put(Tfile,P,wPare); }
		else{ $Stor.post(Tfile,P,wPare); }
	}});
},
post:function(Tfile,Po,wPare){
	var Po = (Po) ? Po : {};
	var Func = (Po.func)?Po.func: null;
	var formData = new FormData();
	var wResp = $1.q('.__storUpdResp',wPare);
	if(!wResp){ wResp = $1.t('div',{'class':'__storUpdResp'},wPare); }
	for(var f=0; f<Tfile.files.length; f++){
		var file = Tfile.files[f];
		formData.append('file_'+f, file, file.name);
	}
	for(var k in Po.vP){ formData.append(k,Po.vP[k]); }
	/* create req */
	if(window.XMLHttpRequest){ var xhr = new XMLHttpRequest();}
	else if(window.ActiveXObject){
		var xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
	var url = $Stor.svr;
	xhr.open('POST', url, true);
	if(Po.H){
		for(var h in Po.H){ xhr.setRequestHeader(h,Po.H[h]); }
	}
	var abt = $1.t('button',{'class':'iBg iBg_closeSmall',title:'Cancelar Operación'},wResp);
	abt.onclick = function(){
		xhr.abort(); $1.clear(wResp);
	}
	var progress = $1.t('progress',{value:0,max:100,style:'width:90%; background-color:#0F0;'},wResp);
	xhr.upload.addEventListener("progress", function(e){
		progress.value = ((e.loaded/e.total)*100);
	}, false);
	xhr.onload = function(Event){
		if(xhr.status == 200){
			$1.clear(wResp);
			var Jq = JSON.parse(xhr.responseText);
			if(Jq.errNo || Jq.errs){ $1.Win.message(Jq); }
			else if(Po.saveJs='Y'){ Attach.saveJS(Jq,Po,{cont:wResp}) } 
			else{ if(Func){ Func(Jq); } }
		}
		else{
			$Api.resp(wResp,{errNo:5,text:'Err Status: '+xhr.status});
		}
	};
	xhr.send(formData);
	Tfile.value = '';
}
};

$Stor.Tt={
post:function(Js,P,P2){//saveJs
	P2=(P2)?P2:{};
	var vPost='tt='+P.tt+'&tr='+P.tr;
	vPost += '&L='+encodeURIComponent(JSON.stringify(Js));
	$Api.post({f:Api.Stor+'saveJs',inputs:vPost,func:function(Jr,o){
		$Api.resp(P2.cont,Jr);
		if(P.func){ P.func(o,P); }
	}});
},
get:function(P){
	var wList=P.wList;
	var vPost=(P.gP)?P.gP:'tt='+P.tt+'&tr='+P.tr;
	$Api.get({f:Api.Stor, inputs:vPost, loade:wList,
	func:function(Jq){
		wList.classList.add($Stor.wid+'opened');
		if(Jq.errNo){ $Api.resp(wList,Jq); }
		for(var c in Jq.L){ $Stor.Ht.drawL(Jq.L[c],wList); }
	}
	});
},
win:function(P,pare){
	if(pare){
		$1.T.btnFa({fa:'fa_attach',style:'color:blue',func:function(){ iope(P); } },pare); 
	}
	else{ iope(P); }
	function iope(P){
		P.winTitle=(P.title)?'Archivos Relacionados: '+P.title:'Archivos Relacionados: '+P.tt+'-'+P.tr;
		P.saveJS='Y';
		P.getList='tt';
		P.func=function(o,P1){ 
			if(o){ for(var c in o){ o[c].canDelete='Y'; $Stor.Ht.drawL(o[c],P1.wList); } }
		}
		$Stor.btn(P);
	}
}
};

$Stor.Ht={
drawL:function(J,wList){
	var wrap = $1.t('div',{'class':'_o_'+$o.T.fileUpd+'_'+J.id+' psUpdList_Item',style:'position:relative;'},wList);
	var fileName = $1.t('a',{'href':J.url,'target':'_BLANK','class':'iName'},wrap);
	$1.t('span',{'class':'iBg iBg_ico'+J.fileType},fileName);
	$1.t('span',{textNode:J.fileName},fileName);
	if(J.canDelete == 'Y'){ btnDel = $Stor.Ht.delById(J); wrap.appendChild(btnDel) }
	var docInf= $1.t('div',{'class':'docInfo'},wrap);
	$1.t('span',{'class':'userName','textNode':J.userName},docInf);
	$1.t('span',{'class':'dateC','textNode':J.dateC},docInf);
	$1.t('span',{'class':'dateC','textNode':J.fileSizeText},docInf);
},
delById:function(P){
	var btnDel = $1.t('input',{type:'button','class':'btn iBg_trash btn2Right',title:'Eliminar este archivo'});
	btnDel.fileName = P.fileName; btnDel.fileId = P.id;
	btnDel.onclick = function(){
		var objDel = this.parentNode;
		$1.Win.confirm({text:'Se va eliminar el archivo, no se podrá recuperar esta información', func:function(){
			if($0s.fireb && $0s.fireb.apps>0){
				var refDel = firebase.storage().refFromURL(P.url);
				if(refDel){ refDel.delete(); }
			}
			$Api.delete({f:Api.Stor,inputs:'fileId='+P.id,
			func:function(J2){ if(!J2.errNo){ $1.delet(objDel);
			} }
			});
		}});
	}
	return btnDel;
}
}

$Stor.Dw={
html:function(L,pare,P){/* poner html */
	var P=(P)?P:{};
	var wrap=$1.t('div',{},pare);
	for(var i in L){
		L[i]['class']='__StorDwFile';
		var t=$1.t('span',L[i],wrap);
	}
	if(P.conv){ $Stor.Dw.conv(wrap); }
	return wrap;
},
conv:function(pare){
	var a=$1.q('.__StorDwFile',pare,'all');
	for(var i=0; i<a.length; i++){
		var fType=a[i].getAttribute('fileType');
		var tn=$1.t('div',{style:'display:inline-block; border:1px solid #CCC; padding:3px;'});
		tn._fileType=fType;
		tn._fileName=a[i].getAttribute('fileName');
		tn._file=a[i].getAttribute('file');
		var url=$Stor.svrV+tn._file+'?fileName='+tn._fileName;
		switch(fType){
			case 'img': ; break;
			default : $1.t('a',{href:url,textNode:a[i].getAttribute('fileName')},tn); break;
		}
		pare.replaceChild(tn,a[i]);
	}
}
}