
var myWys={
clsEdit:'myWys_contentEdit',
clsHtml:'myWys_contentHtml',
area:'__myWysTarea',
areaSave:false,
o1:false,
range:false,
saveAt:false,
ini:function(pare,P){ P=(P)?P:{};
	pare=(pare.tagName)?pare:$1.q(pare);
	$1.clear(pare);
	pare.classList.remove(myWys.clsHtml);
	var divWrap=$1.t('div',{'class':'myWysADM'},pare);
	var btool=myWys.bTool({},divWrap);
	myWys.o1=$1.t('div',{'class':myWys.clsEdit+' '+myWys.clsHtml},divWrap);
	sDefTxt = mpyWys.o1.innerHTML;
	myWys.areaSave=$1.q('.'+myWys.area);;
	myWys.setDocMod(true);
	var rig=$1.t('div',{'class':'btnsRight'},btool);
	if(P.value){ myWys.o1.innerHTML=P.value;}
	if(P.save){
		var btn=$1.t('span',{'class':'fa faBtn fa-save',textNode:'Guardar',title:'Guardar'},rig);
		btn.onclick=function(){ P.save(myWys.getVal(1)); }
		$1.t('spam',{textNode:' | '},rig);
		var btn=$1.t('span',{'class':'fa faBtn fa-close',textNode:'Cerrar',title:'Cerrar sin Guardar'},rig);
		btn.onclick=function(){ P.save(null,'close'); }
	}
	myWys.saveAt=false;
	if(P.saveAt){ //textarea to save
		myWys.saveAt=P.saveAt;
		myWys.o1.onkeyup=function(){
			myWys.saveAt.innerText = this.innerHTML;
		}
	}
	return myWys.o1;
},
getVal:function(r){
	if(r){ return myWys.o1.innerHTML; }
	else{
		if(myWys.areaSave){ myWys.areaSave.innerText= myWys.o1.innerHTML; }
	}
},
bTool:function(B,wys){
	var btool=$1.t('div',{'class':'myWys_btool'},wys);
	var ul=$1.t('ul',{'class':'btnUl',style:'position:relative;'},btool);
	var Btn=[
	{t:'Negrita',fa:'fa-bold',cmd:'bold'},
	{t:'Cursiva',fa:'fa-italic',cmd:'italic'},
	{t:'Subrayada',fa:'fa-underline',cmd:'underline'},
	{t:'Lista Ordenada',fa:'fa fa-list-ol',cmd:'insertorderedList'},
	{t:'Lista viñetas',fa:'fa fa-list-ul',cmd:'insertUnorderedList'},
	{t:'Insertar Enlace',fa:'fa fa-link',cmd:'CreateLink'},
	{t:'Insertar Imagen',fa:'fa fa-image',cmd:'InsertImg'},
	{t:'Sangria',fa:'fa-indent',cmd:'indent'},
	{t:'Quitar Sangria',fa:'fa-dedent',cmd:'outdent'},
	];
	for(var i in Btn){ var B=Btn[i];
		var li=$1.t('li',{title:B.t,style:'cursor:pointer'},ul);
		li.cmd=B.cmd;
		$1.t('i',{'class':'fa '+B.fa},li);
		switch(B.cmd){
			case 'CreateLink': 
			li.onmousedown=function(event){ Sltion.save();
			event.preventDefault; myWys.F.link(this.parentNode); }
			break;
			case 'InsertImg': 
			li.onmousedown=function(event){ Sltion.save();
			event.preventDefault; myWys.F.img(this.parentNode); }
			break;
			default:
				li.onmousedown=function(event){ Sltion.save();
				event.preventDefault; myWys.f(this.cmd); }
			break;
		}
	}
	return btool;
},
validateMode:function() {
	return true;
	if (!document.compForm.switchMode.checked) { return true ; }
	alert("Uncheck \"Show HTML\".");
	return false;
},
setDocMod:function e(bToSource) {
	myWys.o1.contentEditable = true;
	document.execCommand("defaultParagraphSeparator", false, "div");
},
f:function(cmd, value,P){
	var P=(P)?P:{};
	Sltion.rest(Sltion.last);
	if(cmd =='CreateLink'){ 
		document.execCommand('insertHTML', true, '<a href="'+value+'">'+P.text+'</a>');
	}
	else if(cmd =='InsertImg'){  alert(value+'-'+P.text);
		var img='<img src="'+value+'" alt="'+P.text+'" title="'+P.text+'"';
		if(P.w){ img += ' width="'+P.w+'px"'; }
		if(P.h){ img += ' height="'+P.h+'px"'; }
		img +=' />';
		document.execCommand('insertHTML',true,img);
	}
	else { document.execCommand(cmd, false, null); }
	if(myWys.saveAt){ myWys.saveAt.innerText = myWys.o1.innerHTML; }
}
}

myWys.F={
link:function(paRel){
	var cls='__myWys_createLink';
	$1.delet($1.q('.'+cls));
	var div=$1.t('div',{'class':cls,style:'padding:0.25rem; border:0.0625rem solid #CCC; position:absolute; backgroundColor:#FFF; '},paRel);
	var t=$1.t('input',{type:'text',placeholder:'Texto Enlace',value:sel},div);
	$1.t('br',0,div);
	var enl=$1.t('input',{type:'text',placeholder:'http://pagina.com'},div);
	btnFa=$1.T.btnFa({textNode:'Añadir',func:function(){
		myWys.f('CreateLink',enl.value,{text:t.value});
			$1.delet($1.q('.'+cls));
	}},div);
	btnFa=$1.T.btnFa({textNode:'Cancelar',func:function(){
		$1.delet($1.q('.'+cls));
	}},div);
},
img:function(paRel){
	var cls='__myWys_createLink';
	$1.delet($1.q('.'+cls));
	var div=$1.t('div',{'class':cls,style:'padding:0.25rem; border:0.0625rem solid #CCC; position:absolute; backgroundColor:#FFF; '},paRel);
	var t=$1.t('input',{type:'text',placeholder:'Texto Alterno',value:sel},div);
	$1.t('br',0,div);
	var enl=$1.t('input',{type:'text',placeholder:'http://pagina.com/imagen.jpg'},div);
	$1.t('br',0,div); $1.t('br',0,div);
	$1.t('b',{textNode:'Ancho: '},div);
	var w=$1.t('input',{type:'number',inputmode:'numeric',min:8,max:1024,placeholder:'200',value:200,style:'width:3rem;'},div);
	$1.t('b',{textNode:'Alto: '},div);
	var h=$1.t('input',{type:'number',inputmode:'numeric',min:8,max:1024,placeholder:'140',style:'width:3rem;'},div);
	$1.t('br',0,div);
	btnFa=$1.T.btnFa({textNode:'Añadir',func:function(){
		myWys.f('InsertImg',enl.value,{text:t.value,w:w.value,h:h.value});
			$1.delet($1.q('.'+cls));
	}},div);
	btnFa=$1.T.btnFa({textNode:'Cancelar',func:function(){
		$1.delet($1.q('.'+cls));
	}},div);
}
}
myWys.exec={
link:function(e){
	if(e.target){ //get ATL
		var a = window.getSelection().getRangeAt(0);
		var b = a.toString();  
		var z = document.createElement("span");
		var l2 = prompt("Enter URL:", "http://");
		b = b.link(l2);
		z.innerHTML=b;
		a.deleteContents();
		a.insertNode(z)
	}
	else{//get the ATW
		document.execCommand("CreateLink");
	}
}
}

var Sltion={
last:null,
save:function(){
	r=false;
	if (window.getSelection){
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
						var ranges = [];
						for (var i = 0, len = sel.rangeCount; i < len; ++i) {
										ranges.push(sel.getRangeAt(i));
						}
						r=ranges;
		}
	} else if (document.selection && document.selection.createRange) {
		r= document.selection.createRange();
	}
	Sltion.last=r;
	return r;
},
rest:function(savedSel) {
	if (savedSel) {
		if (window.getSelection) {
			sel = window.getSelection();
			sel.removeAllRanges();
			for (var i = 0, len = savedSel.length; i < len; ++i) {
							sel.addRange(savedSel[i]);
			}
		}
		else if (document.selection && savedSel.select) {
			savedSel.select();
		}
	}
	}
}
