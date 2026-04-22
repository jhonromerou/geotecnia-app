/* 2021: form y getL, */

$1.tabsExts['plugsCmts']={textNode:'Comentarios',active:'Y','winClass':'cmts','class':'fa fa-comments',func:(T)=>{
	$5c.form(T.P,T.win); //D={tt,tr,getList}
}};

var $5c= {
api:{a:'/appi/private/plugs/cmts/'},
wid:'winComment_',
form:function(P,pare){
	var tid=P.tt+'_'+P.tr;
	if($1.q('.plugsCmts_'+tid)){ return false; }
	var wrap=$1.t('div',P.wT,pare);
	var id=$5c.wid+tid;
	wrap.classList.add('plugsCmts_'+tid);
	var AJs={tt:P.tt,tr:P.tr};
	var vPost=gPost='tt='+P.tt+'&tr='+P.tr+'&';
	if(!P.tt || !P.tr){ $Api.resp(wrap,{errNo:3,text:'No se ha definido tt-tr correctamente, no se puede renderizar el formulario.'}); }
	else{
		for(var i in P.vP){ vPost +=i+'='+P.vP[i]+'&'; AJs[i]=P.vP[i]; }
		for(var i in P.gP){ gPost +=i+'='+P.vP[i]+'&'; }
		var jsF=$Api.JS.cls;
		$Api.form2({api:$5c.api.a,AJs:AJs,vidn:'id',
		func:function(Jr2){
			if(!Jr2.errNo){ $1.clearInps(wrap); $5c.getL({gP:gPost},wList); }
		},
		tbH:[
			{divLine:1,wxn:'wrapx1',I:{lTag:'textarea','class':jsF+' plugsCmts_tarea',name:'comment',placeholder:'(v.4) Realice un comentario, observación o duda...'}}
		]},wrap);
		var wList = $1.t('div',{id:id,'class':'_5c_wrapList plugsCmts_wrap',style:'margin-top:15px;'},wrap);
		if(P.getList=='Y'){ $5c.getL({gP:gPost},wList); }
	}
	if(P.winTitle){
		$1.delet(id+'_');
		$1.Win.open(wrap,{winTitle:P.winTitle,onBody:1,winSize:'medium',winId:id+'_'});
	}
	return wrap;
},
getL:function(P,wList){
	var vPost=(P.gP)?P.gP:'tt='+P.tt+'&tr='+P.tr;
	$Api.get({f:$5c.api.a+'',inputs:vPost, loade:wList,
	func:function(Jq){
		wList.classList.add($5c.wid+'opened');
		if(Jq.errNo==1){ $Api.resp(wList,Jq); return false; }
		var contList = $1.t('div',{'class':'psCommentFloatListWrap'},wList);
		for(var c in Jq.L){ var J = Jq.L[c];
			var wrap0 = $1.t('div',{'class':' psCommentFloatList_Item'},contList);
			var iName = $1.t('b',{'class':'iName'},wrap0);
			$1.t('span',{'class':'iBg iBg_user'},iName);
			var iDate = $1.t('span',{'class':'iDate'},wrap0);
			$1.t('span',{'class':'iBg iBg_date',textNode:J.dateC},iDate);
			$1.t('textNode',_g(J.userId,$Tb.ousr),iName);
			var iText = $1.t('div',{'class':'iComment pre'},wrap0);
			iText.innerHTML = J.comment;
			if(J.canDelete == 'Y'){
				var btnDel = $1.t('input',{type:'button',title:'Eliminar este comentario','class':'btn iBg_closeSmall',style:'position:absolute; top:3px; right:3px;'},wrap0);
				btnDel.id = J.id;
				btnDel.onclick = function(){
					var objDel = this.parentNode;
					var cf = confirm('Se va a eliminar el comentario, ¿Está seguro?');
					if(cf){
						$Api.delete({f:$5c.api.a,inputs:'commentId='+this.id,
						func:function(J){
							if(!J.errNo){ $1.delet(objDel); }
						}
						});
					}
				}
			}
		}
	}
	});
},
open:function(P,wrapCont){
	var wrap = $1.t('div');
	P.relId2 = (P.relId2) ? P.relId2 : '';
	var iResp = $1.t('div');
	var relRef = (P.relId) ? P.relId : P.relRef;
	var getPost = 'targetType='+P.targetType+'&targetRef='+P.targetRef;
	var sendPost = getPost;
	sendPost += (P.relType) ? '&relType='+P.relType : '';
	sendPost += (P.relRef) ? '&relRef='+P.relRef : '';
	sendPost += (P.relId2) ? '&relId2='+P.relId2 : '';
	var wrapList = $1.t('div',{'class':'_5c_wrapList',style:'margin-top:15px;'});
	var dComment = $1.t('textarea',{'class':'jsFields _5c_formWrap',name:'comment','placeholder':'(v.2) Realice un comentario, observación o duda...'});
	if(P.MR){
		for(var m in P.MR){ sendPost += '&'+m+'='+P.MR[m]; }
	}
	if(P.FR){
		for(var m in P.FR){ sendPost += '&FR['+m+']='+P.FR[m]; }
	}
	for(var m in P.getPars){ getPost += '&'+m+'='+P.getPars[m]; }
	var dSend = $1.t('input',{type:'button','class':'ui_button',value:'Enviar Comentario'});
	dSend.vPost = sendPost;
	dComment.O = {vPost:getPost};
	var globRoom = {objType:$o.T.comment, objRef:'newS', targetType:P.targetType, targetRef:P.targetRef, movType:'add'};
	dSend.onclick = function(){
		if(dComment.value == ''){ return ''; }
		var vPost = $1.G.inputs(wrap)+'&'+this.vPost;
		$ps_DB.get({f:'PUT '+$5c.api.a+'', inputs:vPost, loade:iResp,
		func:function(J){
			$ps_DB.response(iResp,J);
			if(!J.errNo){ dComment.value = dComment.textNode = '';
				$2io.worksp.emit(globRoom);
				$5c.get(P,wrap);
			}
		}});
	}
	wrap.appendChild(dComment);
	wrap.appendChild(iResp);
	wrap.appendChild(dSend);
	wrap.appendChild(wrapList);
	if(P.btnGetList){
		var btn = $1.t('a',{'textNode':'Ver Comentarios','style':'padding:10px; font-size:14px; font-weight:bold;'});
		btn.onclick = function(){ $5c.get(P,wrapList); }
		wrapList.appendChild(btn);
	}
	else if(typeof(P.listData) == 'object'){ $5c.get(P.listData,wrap); ; }
	if(P.noLoad || P.getList=='N'){ /* no load from $3F.c*/}
	else{ $5c.get(P,wrap); }
	if(wrapCont && wrapCont == 'r'){ return wrap; }
	else if(wrapCont){ wrapCont.appendChild(wrap); }
	else{
		ps_DOM.Tag.Win.bkFixed(wrap,{winTitle:'Comentario',onBody:true});
	}
},
get:function(P,wrapP){
	//var vPost = P.vPost;
	if(P.getList=='N'){ return true; }
	var wList = $1.q('._5c_wrapList',wrapP);
	var vPost = $1.q('._5c_formWrap',wrapP).O.vPost;
	$Api.get({f:$5c.api.a+'',inputs:vPost, loade:wList,
	func:function(Jq){
		if(Jq.errNo){ $ps_DB.response(wList,Jq); return false; }
		var contList = $1.t('div',{'class':'psCommentFloatListWrap'});
		var DaF = (Jq.Pagination) ? Jq.Pagination : {};
		DaF.func = function(){ $5c.get(P,wList); }
		wList.appendChild($ps_DB.getPager(DaF));
		for(var c in Jq.DATA){ var J = Jq.DATA[c];
			var wrap0 = $1.t('div',{'class':'_o_'+$o.T.comment+'_'+J.id+' psCommentFloatList_Item'});
			var iDate = $1.t('span',{'class':'iDate'});
			iDate.appendChild($1.t('span',{'class':'iBg iBg_date'}));
			iDate.appendChild($1.t('textNode',J.dateC));
			var iName = $1.t('b',{'class':'iName'});
			iName.appendChild($1.t('span',{'class':'iBg iBg_user'}));
			iName.appendChild($1.t('textNode',J.userName));
			var iText = $1.t('div',{'class':'iComment pre'});
			iText.innerHTML = J.comment;
			wrap0.appendChild(iDate); wrap0.appendChild(iName);
			wrap0.appendChild(iText);
			if(J.canDelete == 'Y'){
				var btnDel = $1.t('input',{type:'button',title:'Eliminar este comentario','class':'btn iBg_closeSmall',style:'position:absolute; top:3px; right:3px;'});
				btnDel.id = J.id; 
				btnDel.globRoom = {objType:$o.T.comment, objRef:J.id, targetType:P.targetType, targetRef:P.targetRef, movType:'delete'};
				btnDel.onclick = function(){ var globRoom = this.globRoom;
					var objDel = this.parentNode;
					var cf = confirm('Se va a eliminar el comentario, ¿Está seguro?');
					if(cf){
						$ps_DB.get({f:'DELETE '+$5c.api.a+'',inputs:'commentId='+this.id,
						func:function(J){
							if(J.ok){ $2io.worksp.emit(globRoom); ps_DOM.delet(objDel); }
						}
						});
					}
				}
				wrap0.appendChild(btnDel);
			}
			contList.appendChild(wrap0);
		}//sfor
		wList.appendChild(contList);
	}
	});
}
}

/*new 2019*/
$5c.formLine=function(P,pare){
	delete(P.getList);
	return $5c.form(P,pare);
};
$5c.openOne=function(P){
	var wList=$1.q('#'+$5c.wid+P.tt+'_'+P.tr);
	if(wList && wList.classList && wList.classList.contains($5c.wid+'opened')){}
	else{ $5c.getL(P,wList); }
}

$Ch={ /* cache */
_u:function(_id,ko,L){
	var E={};
	if($Ch[ko]){
		if($Ch[ko][_id]){
			for(var e in L){ $Ch[ko][_id][e]=L[e]; }
			E=$Ch[ko][_id];
		}
	}
	return E;
},
_push:function(ko,L){
	if(!$Ch[ko]){ $Ch[ko]=[]; }
	var ni=$Ch[ko].length; L._id=ni;
	$Ch[ko].push(L);
	return L;
},
_d:function(ko,k,id){
	if($Ch[ko]){
		for(var e in $Ch[ko]){
			if($Ch[ko][e][k]==id){ delete($Ch[ko][e]); break; }
		}
	}
},
_ini:function(ko,D,P){
	$Ch[ko]=[]; P=(P)?P:{};
	var ni=0;
	for(var i in D){
		if(P.omit && (''+D[i][P.omit]).match(P.m)){ continue; } /* omit:listName, m:inbox */
		D[i]._id=ni; ni++;
		$Ch[ko].push(D[i]);
	}
	return $Ch[ko];
},
list:[],
Task:[],
}
$Dom={
c:{},//cache
upd:function(L){
	/* [ {cks:_taskName, nv:new Value, on:'value|innerText' } ]*/
	if(L.nv || L.csk || L.clsRe){ L=[L]; }
	for(var i in L){
		var Z=L[i]; 
		var _on=(Z.on)?''+Z.on:'';
		var qk=(Z.idk)?'#'+Z.idk:'.'+Z.csk;
		var tag=$1.q(qk,null,'all');
		for(var z=0; z<tag.length;z++){
			var T=tag[z];
			if(Z.del=='Y'){ $1.delet(T); continue; }
			if(Z.display){ T.style.display=Z.display; }
			if(T.value && _on.match(/value/)){ T.value=Z.nv; }
			if(T.innerText && _on.match(/innerText/)){ T.innerText=Z.nv; }
			if(Z.clsRe){T.classList.replace(Z.clsRe[0],Z.clsRe[1]); }
		}
		
	}
}
}

Api.Commt={a:'/1/commt/'};
var Commt={ /*2020*/
wid:'_commtWrapper_',
formLine:function(P,pare){
	Api.Commt={a:'/1/commt/'};
	var id=Commt.wid+P.tt+'_'+P.tr;
	if($1.q('#'+id,pare)){ return false; }
	var wrap=$1.t('div',P.wT,pare);
	var AJs={tt:P.tt,tr:P.tr};
	if(!P.tt || !P.tr){ $Api.resp(wrap,{errNo:3,text:'No se ha definido tt-tr correctamente, no se puede renderizar el formulario.'}); }
	else{
		if(P.vP){ for(var i in P.vP){ AJs[i]=P.vP[i]; } }
		var jsF='jsFields';
		var wList = $1.t('div',{id:id,'class':Commt.wid,style:'margin-top:15px;'},wrap);
		var dComment = $1.t('textarea',{'class':$Api.JS.cls+' _5c_formWrap',name:'comment','placeholder':'(v.4.2) Digite su comentario...',AJs:AJs},wrap);
		var resp=$1.t('div',0,wrap);
		$Api.send({textNode:'Guardar Comentario',POST:Api.Commt.a,jsBody:wrap, loade:resp, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo){ $1.clearInps(wrap); }
			if(o){
				Commt.Dw.line(o,wList,P);
			}
		}},wrap);
	}
	if(P.winTitle){
		$1.delet(id+'_');
		$1.Win.open(wrap,{winTitle:P.winTitle,winSize:'medium',winId:id+'_'});
	}
	if(P.load=='Y'){
		Commt.openOne(P);
	}
	return wrap;
},
openOne:function(P){
	var wList=$1.q('#'+Commt.wid+P.tt+'_'+P.tr);
	if(wList && wList.classList && wList.classList.contains(Commt.wid+'opened')){}
	else{ Commt.get(P,wList); }
},
get:function(P,wList){
	var vPost=(P.gP)?P.gP:'tt='+P.tt+'&tr='+P.tr;
	$Api.get({f:Api.Commt.a+'',inputs:vPost, loade:wList,
	func:function(Jq,o){
		wList.classList.add(Commt.wid+'opened');
		if(Jq.errNo){ $Api.resp(wList,Jq); return false; }
		if(P.func){ P.func(Jq,o); }
		else{
			for(var c in Jq.L){ Commt.Dw.line(Jq.L[c],wList,P); }
		}
	}
	});
},

}

Commt.Dw={
line:function(J,wList,P){
	var wrap0 = $1.t('div',{'class':'gid_commt_'+J.id+' psCommentFloatList_Item'},wList);
	var iDate = $1.t('span',{'class':'iDate'},wrap0);
	$1.t('span',{'class':'iBg iBg_date',textNode:J.dateC},iDate);
	var iName = $1.t('b',{'class':'iName'},wrap0);
	$1.t('span',{'class':'fa fa-user',textNode:$Tb._g('ousr',J.userId)},iName);
	var iText = $1.t('div',{'class':'iComment pre'},wrap0);
	iText.innerHTML = J.comment;
	if(J.userId == $0s.userId){
		var btnDel = $1.t('input',{type:'button',title:'Eliminar este comentario','class':'btn iBg_closeSmall',style:'position:absolute; top:3px; right:3px;'},wrap0);
		btnDel.vPost ='commentId='+J.id;
		if(P.vP){ for(var i in P.vP){ btnDel.vPost +='&'+i+'='+P.vP[i]; } }
		btnDel.onclick = function(){
			var objDel = this.parentNode;
			var cf = confirm('Se va a eliminar el comentario, ¿Está seguro?');
			if(cf){
				$Api.delete({f:Api.Commt.a,inputs:this.vPost,winErr:1,func:function(J){
					if(!J.errNo){ $1.delet(objDel); }
				}
				});
			}
		}
	}
}
}