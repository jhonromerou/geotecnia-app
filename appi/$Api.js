var Api ={}; var $Uri={};
var _err ={
	$err:false,
	errText:false,
	reset:function(no){
		if(_err.$err && !no){ _err.$err=false; }
	},
	err:function(iff,msg,res){
		_err.$err=false;
		if(iff){ return _err.$err={errNo:3,text:msg}; }
		return false;
	}
}
var $Http=[];
var $Api={
	reqNums:{},//guardar numero peticiones
	xFields:'_ApixFields',/* formData */
	lastReq:false,
	v:'v1',
	err:false,
	imgLoad1:'http://static1.admsistems.com/_img/loaderline.gif',
	imgLoadFull1:'http://static1.admsistems.com/_img/loaderfull.gif',
	sett:function(P){
		if(P.furl){ P.f=P.furl; }
		return P;
	},
	get:function(P){ P=$Api.sett(P); P.GET=P.f; $Api.req(P); },
	post:function(P){ P=$Api.sett(P); P.POST=P.f; $Api.req(P); },
	put:function(P){ P=$Api.sett(P); P.PUT=P.f; $Api.req(P); },
	delete:function(P){ P=$Api.sett(P); P.DELETE=P.f; $Api.req(P); },
	abort:function(kid){
		if(kid && $Http[kid]){ $Http[kid].abort(); }
		else if($Api.lastReq){ $Api.lastReq.abort(); }
	},
	doc:function(uri){
		var req=false;
		try{ req=new XMLHttpRequest(); }
		catch(err1){
			try{ req=new ActiveXObject("Msxml2.XMLHTTP"); }
			catch(err2){
				try{ req=new ActiveXObject("Microsoft.XMLHTTP"); }
				catch(err3) { req = false; }
			}
		}
		if(req==false){ return false; }
		if(uri){
			$Http[uri]=req;
			index=uri;
		}
		else{
			$Http.push(req);
			var index=$Http.length-1;
		}
		$Api.lastReq=req;
		console.log($Http);
		return index;
	},
	req:function(P){
		// More:{func: w:wrap}
		if(P.xConf){
			$1.Win.confirm({text:P.xConf,func:function(wResp){
				delete(P.xConf);
				P.winMsg=1;
				$Api.req(P);
			}});
			return false;
		}
		if(P.confirm){
			P.confirm.func=function(wResp){
				if(!P.loade){ P.loade=wResp; }
				if(!P.winResp){ P.winResp=wResp; }
				delete(P.confirm);
				$Api.req(P);
			}
			$1.Win.confirm(P.confirm);
			return false;
		}
		if(P.loadVerif){
			if(P.func){ P.func({_BLANK:'Y'}); }
			Intv.jsC();
			return true;
		}
		if(P.rone){//1 peticion activa
			if($Http[P.rone] && $Http[P.rone].readyState>0){
				$Http[P.rone].abort();
			}
			var ix=$Api.doc(P.rone); 
		}
		else{ 
			var ix=(P.rid)?$Api.doc(P.rid):$Api.doc(uri);
		}
		var httpExt=false;
		var uri=''; var getSend=postSend='';
		var useM= ($M && $M.read);
		P.method = (P.method != undefined) ? P.method : 'POST';
		P.addGet = (P.addGet) ? P.addGet : '';
		P.addGet = ($ps_DB.addGet != '') ? $ps_DB.addGet : P.addGet;
		P.respDiv=(P.respDiv)?P.respDiv:P.loade;
		if($Api.err){ P.respDiv.innerHTML='';
			if($tB.msg.length>0){
				for(var xm in $tB.msg){
					var tE=$tB.msg[xm];
					if(tE.t){ tE.textNode=tE.t; delete(tE.t); }
					var terr=$1.t('div',tE,P.respDiv);
					terr.classList.add('input_warning');
				}
			}
			else{ $Api.resp(P.respDiv,{errNo:2,text:'Se deben deligenciar los campos obligatorios (*)'}); }
			return false;
		}
		else if(P.respDiv && $1.G.dataok=='N'){
			$Api.resp(P.respDiv,{errNo:2,text:'Debes deligenciar los campos obligatorios (*)'});
			return false;
		}
		function clearSend(ix){
			delete($Http[ix]);
			if(P.btnDisabled){  P.btnDisabled.removeAttribute('disabled'); }
			Intv.jsC();
			$1.delet('psLoadAjaxPoints'); $1.delet('_loadJSFull'); $1.delet('_loadJSFull');
			if(P.funcErr){ P.funcErr(JS); $1.delet('psLoadAjaxPoints'); }
			$1.delet('psLoadAjaxPoints');
			$1.delet('admsDBLoaderFull');
			$1.clear(P.loade);
		}
		/* Metodos to get */
		if(P.Met){ P[P.Met]=P.f; }
		if(P.GET){ uri=P.GET; method='GET'; getSend='?'+P.inputs; }
		else if(P.POST){ uri=P.POST; method='POST'; postSend=P.inputs; }
		else if(P.PUT){ uri=P.PUT; method='PUT'; postSend=P.inputs; }
		else if(P.DELETE){ uri=P.DELETE; method='DELETE'; postSend=P.inputs; }
		else { uri=P.f; method='GET'; getSend='?'+P.inputs; }
		//paginado--
		var pager = $1.q('.__pagerMove',P.wrapPager);
		if(pager){
			var num = $1.q('.__pagerNumber',pager);
			if(num){ P.addGet += '&_pnext='+num.value; }
		}
		var formParms = (P.inputs) ? P.inputs : '';
		if(P._pageNum){ formParms+='&_pnext='+P._pageNum; }

		ApiMethod='';
		$1.delet('psAjaxError404');
		var cache='';
		console.log(P);
		if(P.cache!='Y'){ cache= '&_alet='+(new Date().getTime()); }
		if(P.furl){ var uri=''; P.file=P.furl; }
		else{
			if(uri.match(/^\/1\//)){  }
			else if(uri.match(/^\/v\//)){ uri=uri.replace(/^\/v\//,'/'+$Api.v+'/'); }
			P.fileSimple = (P.method == 'GET') ? P.file+'?'+'&'+formParms : P.file+'?';
			if(useM){ _Pa=$M.read('!'); ApiMethod += '&_haskKey='+_Pa; }
			P.file = (method == 'GET') ? uri+'?'+ApiMethod+'&'+formParms : uri+'?'+ApiMethod;
			if(P.url){ P.file=P.url+P.file; }
			else if($y.apiURI){ P.file=$y.apiURI+P.file; }
			P.file =P.file+'&'+P.addGet+cache;
		}
		if(P.file){
			if(!P.btnDisabled && useM && $M.Ht.filt){ P.btnDisabled=$1.q('.__btnAjaxFilter',$M.Ht.filt); }
			if(P.btnDisabled){ P.btnDisabled.setAttribute('disabled','disabled'); }
			$Http[ix].open(method,P.file,true);
			var sendTooken=false;
			if(P.HE){ P.headers=P.HE; }
			if(P.headers){
				for(var h in P.headers){$Http[ix].setRequestHeader(h,P.headers[h]);
				if(h=='ocardtooken'){ sendTooken=true; }
				}
			}
			if($s.Headers){
				for(var h in $s.Headers){ $Http[ix].setRequestHeader(h,$s.Headers[h]);
				if(h=='ocardtooken'){ sendTooken=true; }
				}
			}
			}
			if($c.H){
			for(var h in $c.H){ $Http[ix].setRequestHeader(h,$c.H[h]);
			}
			if(sendTooken==false){ $Http[ix].setRequestHeader('ocardtooken',$0s.stor('ocardtooken')); }
			var cTypeBase=true;
			if(P.formData){ cTypeBase=false; }
			else if(P.jsBody || P.jsAdd){/*send json */
				cTypeBase=false;
				$Http[ix].setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			}
			if(cTypeBase){ $Http[ix].setRequestHeader('Content-Type','application/x-www-form-urlencoded'); }
			if(!P.loade || P.loaderFull){
				var loadw = $1.t('div',{'id':'_loadJSFull',style:'position:fixed; left:0; top:0; background:rgba(0,0,0,0.5); width:100%; height:100%; z-index:10;'},$1.body);
				var wrapxx=$1.t('div',{style:'margin:0 auto; max-width:6rem; padding-top:1rem;'},loadw);
				$1.t('img',{'src':$Api.imgLoad1, alt:' Cargando...', title:' Cargando',style:'margin:0 auto;'},wrapxx);
				$1.t('h5',{textNode:'Cargando...'},wrapxx);
			}
			if(P.loade){
				var loadw = $1.t('div',{'id':'psLoadAjaxPoints','class':'psLoadAjaxPoints'});
				ADMS.urlTop = (ADMS.urlTop) ? ADMS.urlTop : '';
				loadw.appendChild($1.t('img',{'id':'psLoadAjaxPoints','src':$Api.imgLoad1, alt:' Cargando...', title:' Cargando'}));
				loadw.appendChild($1.t('i',{textNode:' Cargando...'}));
				$1.clear(P.loade);
				if((P.loade).tagName){ (P.loade).appendChild(loadw); }
			}
			/* resp 0=no init, 1=conection, 2=received, 3=procesando 4=finalizado*/
			$Http[ix].onreadystatechange = function(){
				if(this.readyState === 4 && this.status === 200){
					clearSend(ix);
					if(this.responseText == ''){
					var dat = $1.t('div');
						dat.appendChild($1.t('p',{textNod:'No se obtuvieron resultados.'}));
						dat.appendChild($1.t('li',{textNode:'FILE: '+uri}));
						dat.appendChild($1.t('li',{textNode:'Method: '+method}));
						$1.Win.message({'title':'Error de Respuesta','text':dat});
						return false;
					}
					var resp = this.responseText;
					if(resp.match(/SMTP/m)){
						resp = resp.split(/\{\"/);
						resp = '{"'+(resp[1]).replace(/<\/p\>/gi,'');
						resp = (resp).replace(/[\n|\r]/gi,'');
					}
					else if(resp.match(/^RESPONSETEXT/i)){
						resp = resp.replace(/RESPONSETEXT/i,'');
						var pr = $1.t('div',{'class':'ajusTextAll',textNode:resp});
						$1.Win.message({text:pr});
						return false;
					}
					else if(resp.match(/^ALERTJSON/i)){
						resp = resp.replace(/ALERTJSON/i,'');
						var pr = $1.t('div',{'class':'ajusTextAll'});
						pr.innerHTML=resp;
						$1.Win.message({text:pr})
					}
					else{
						var fatalErr = resp.match(/\<b\>(Fatal error)\<\/b\>\:(.*)/i);
						fatalErr = (fatalErr == null) ? resp.match(/\<b\>(Warning)\<\/b\>\:(.*)/i) : fatalErr;
						fatalErr = (fatalErr == null) ? resp.match(/\<b\>(Parse error)\<\/b\>\:(.*)/i) : fatalErr;
					}
					if(fatalErr != null){
						$1.delet('psAjaxError500');
						var divnofound = $1.t("div",{'id':'psAjaxError500', style:'position:fixed; top:0; left:0; width:100%; height:100%; backgroundColor:rgba(255,0,0,0.7); color:#FFF; z-index:1000;'});
						var nofound = $1.t("div",{style:'position:absolute; margin:0 auto; height:100px; widht:100%; padding:30px 10px;'});
						nofound.appendChild($1.t('h1',{'textNode':fatalErr[1]}));
						nofound.appendChild($1.t('p',{'textNode':'Error desde el Servidor en el archivo:'+P.file }));
						nofound.appendChild($1.t('p',{'textNode':fatalErr[2]}));
						var reloaded = $1.t('a',{href:document.location, 'textNode':'Actualizar'});
						reloaded.onclick = document.location.reload;
						nofound.appendChild(reloaded);
						var iClose = $1.t('input',{type:'button',value:'Cerrar Ventana',style:'display:block; margin:6px 0;'});
						iClose.onclick = function(){ $1.delet('psAjaxError500'); }
						nofound.appendChild(iClose);
						divnofound.appendChild(nofound);
						document.body.appendChild(divnofound);
						iClose.focus(); iClose.blur();
					}
					else{
					{//
							var JS = JSON.parse(resp);
							if(P.winMsg){$1.Win.message(JS); }
							if(JS.errNo && JS.requireLogin=='Y'){
								localStorage.clear();
								location.href ='/login?out=1';
							}
							//Paginador
							var pager = $1.q('.__pagerMove',P.wrapPager);
							if(pager && JS.rows==0 && JS._pnext){
								var numb = $1.q('.__pagerNumber',pager); numb.value = numb.lastValue;
							}
							var _nextPage=(JS.__nextPager=='Y');
							if(pager){
								var numP=$1.q('.__pagerNumber',pager);
								var befp=$1.q('.__pagerBack',pager);
								var nextp=$1.q('.__pagerNext',pager);
								nextp.removeAttribute('disabled');
								befp.removeAttribute('disabled');
								if(numP.value<=1){ befp.setAttribute('disabled','disabled'); }
								if(JS.rows==0 || JS.__rows<JS.__limitDef){ nextp.setAttribute('disabled','disabled'); }//si no son iguales, es porque se llego al maximo
								if(JS.__limitDef=='N' || JS.__hidePager=='Y'){ pager.style.display = 'none'; }
								//else if(JS.__nextPager!='Y'){ pager.style.display = 'none'; }
								else if(_nextPage){ pager.style.display = 'block'; }
							}
							//end Pagi
							var errNo = (JS.errNo) ? JS.errNo : '';
							var JS0 = (JS.respChild) ? JS.respChild[0] : {}
							if(JS.errNo || JS0.errNo){ JS.ajaxFile = P.fileSimple; }
							if(JS0.errNo){
								title = (JS0.title) ? JS0.title : 'Error General (Und)';
								$1.Win.message({title:title, text:JS0.text });
							}
							else if(JS.error_auth == true || JS.errNo==4){ $1.Win.message({text:JS.text, btnText:'Iniciar Sesión', func:function(){ location.href ='/login?out=1';}}); }
							else if(JS.alert=='Y' || JS.errNo == 1 || JS.errNo == 4 || JS.errNo == 5 || JS.errNo == '4_'){
								$1.Win.message(JS);
							}
							else if(P.errWrap && JS.errNo){ $Api.resp(P.errWrap,JS); }
							else if(JS.errNo==1 && P.winErr1){ $1.Win.message(JS); }
							else if(JS.errNo && P.winErr3){ $1.Win.message(JS); }
							else if(JS.errNo && P.winErr){ $1.Win.message(JS); }
							else{
								if(P.winResp){ $Api.resp(P.winResp,JS); }
								//$5n.room.a(JS);
								if(P.func){
									P.func(JS,JS._o);
									if($ps_DB.then != false){ $ps_DB.then(); $ps_DB.then = false; }
								}
								else if(P.VAR){ P.VAR = JS; }
								if(!P.func && $ps_DB.then != false){ $ps_DB.then(); $ps_DB.then = false; }
								//vers page 2
								if(P.More){
									$1.delet($1.q('.apiReqBtnMore',P.More.w));
								if(_nextPage){
									btn=$1.T.btnFa({faBtn:'fa fa-spinner',textNode:'Cargar más resultados...',P:P,func:function(X2){
										P.loade=null;
										P.func=P.More.func;
										P._pageNum=(P._pageNum)?JS.__lastPage*1+1:2;
										$Api.req(P)
									}},P.More.w);
									btn.classList.add('apiReqBtnMore');
								}
								}
							}
						}
						try{}
						catch(e){
							var cot = $1.t('p');
							cot.appendChild($1.t('li',{textNode:'Nombre Error: '+e.name}));
							cot.appendChild($1.t('li',{textNode:'At: '+e.at}));
							cot.appendChild($1.t('li',{textNode:'on: '+P.fileSimple}));
							cot.appendChild($1.t('p',{textNode:'Text: '+e.stack}));
							if(typeof(JS) != 'object'){
								cot.appendChild($1.t('pre',{textNode:resp,style:'background:#F00; color:#FFF;'}));
							}
						$1.win.open(cot,{onBody:true,winTitle:'Error de Ejecución',zIndex:1000});
							console.error(e);
						}
					}
				}
				else if(this.readyState !== 4){ /* errore */}
				else if(this.status === 404){
					var divnofound = $1.t("div",{'id':'psAjaxError404', style:'position:fixed; top:0; z-index:1000; left:0; width:100%; height:100%; backgroundColor:rgba(255,0,0,0.8); color:#FFF;'});
					var nofound = $1.t("div",{style:'position:absolute; margin:0 auto; height:100px; widht:100%; padding:30px 10px;'});
					nofound.appendChild($1.t('h1',{'textNode':'Error 404'}));
					nofound.appendChild($1.t('p',{'textNode':'No se ha encontrado el archivo:'+P.fileSimple}));
					var reloaded = $1.t('a',{href:document.location, 'textNode':'Intenta Actualizar o Comunicate con el Supersu.'});
					reloaded.onclick = document.location.reload;
					nofound.appendChild(reloaded);
					var iClose = $1.t('input',{type:'button',value:'Cerrar Ventana',style:'display:block; margin:6px 0;'});
						iClose.onclick = function(){ $1.delet('psAjaxError404'); }
					nofound.appendChild(iClose);
					divnofound.appendChild(nofound);
					document.body.appendChild(divnofound);
				}
				else if(this.status === 500){
					var divnofound = $1.t("div",{'id':'psAjaxError500', style:'position:fixed; top:0; left:0; width:100%; height:100%; backgroundColor:rgba(255,0,0,0.7); color:#FFF;'});
					var nofound = $1.t("div",{style:'position:absolute; margin:0 auto; height:100px; widht:100%; padding:30px 10px;'});
					nofound.appendChild($1.t('h1',{'textNode':'Error 500 (1)'}));
					nofound.appendChild($1.t('p',{'textNode':'Error desde el Servidor en el archivo:'+P.file}));
					var reloaded = $1.t('a',{href:document.location, 'textNode':'Intenta Actualizar o Comunicate con el Supersu.'});
					reloaded.onclick = document.location.reload;
					var iClose = $1.t('input',{type:'button',value:'Cerrar Ventana',style:'display:block; margin:6px 0;'});
						iClose.onclick = function(){ $1.delet('psAjaxError500'); }
					nofound.appendChild(iClose);
					nofound.appendChild(reloaded);
					divnofound.appendChild(nofound);
					document.body.appendChild(divnofound);
				}
			}
			//Enviar Datos
			var p_ost='';
			if(P.formData){/* subida archivos */
				var send=true;
				var formData = new FormData();
				var tx=$1.q('.'+$Api.xFields,P.formData,'all');
				for(var i=0; i<tx.length; i++){
					var fName=tx[i].name;
					if(tx[i].files){ if(!$Api.appendFile(tx[i],formData)){ send=false; break; } }
					else{ formData.set(fName,tx[i].value); }
					if(tx[i].AJs){
						for(var i2 in tx[i].AJs){ formData.set(i2,tx[i].AJs[i2]); }
					}
				}
				if(send){ $Http[ix].send(formData); }
			}
			else{
				var errReq=false;
				if(P.jsAdd){
					if(P.jsBody){ p_ost = $Api.jsBody(P.jsBody,false); }
					p_ost=(typeof(p_ost)=='string')?{}:p_ost;
					for(var i in P.jsAdd){ p_ost[i]=P.jsAdd[i]; }
					if(P.reqFields){ errReq=$Api.reqFields(p_ost,P.reqFields,P); }
				}
				else if(P.jsBody){
					p_ost = $Api.jsBody(P.jsBody);
					if(P.reqFields){ errReq=$Api.reqFields(p_ost,P.reqFields,P); }
				}
				else{ p_ost = (formParms); }
				if(errReq){ clearSend(ix); P.func(errReq); }
				else{
					if(P.befSend){ _err.reset(); p_ost=P.befSend(p_ost,P.resp); }
					if(_err.$err){ clearSend(ix); $Api.resp(P.resp,_err.$err); }
					else{
						if(typeof(p_ost)=='object'){ p_ost=JSON.stringify(p_ost); }
						$Http[ix].send(p_ost);
					}
				}
			}
		}
		$ps_DB.addGet = '';
	},
	reqFields:function(JSDATA,req,P){
		var err=false;
		//{D:['whsId',{k:'docDate',iMsg:'Fecha Doc.'}, {k:'dueDate',msg:'Fecha vencimiento debe estar definida'}]
		//L[0]=_req, L[1]{_t:Los productos debes definirse}
	 if(typeof(JSDATA)=='string'){ JSDATA=$js.parse(JSDATA); }
		if(req){
			var msgBase='Se deben completar todos los campos obligatorios del formulario *';
			for(var i in req.D){ var X=req.D[i];
				var k=(X.k)?X.k:X;
				msg=(X.iMsg)?X.iMsg+' debe estar definido':msgBase;
			 if(X.msg){ msg=X.msg; }
				if(JSDATA[k]==undefined || JSDATA[k]==''){ err={errNo:3,text:msg}; break; }
			}
			if(err==false){
				_salida1: for(var kF in req){ var Lx=req[kF];
					if(kF=='D'){ continue; }
					if(Lx[0]=='_req' && !JSDATA[kF]){
						err={errNo:3,text:((Lx[1]._t)?Lx[1]._t:'Las lineas tipo ('+kF+') deben definirse')};
						break _salida1;
					}
					var ln=1;
					for(var z in JSDATA[kF]){ var L=JSDATA[kF][z];
						var lnt='Linea '+ln+': '; ln++;
						for(var z2 in Lx){
							if(z2==0 || (z2==1 && Lx[z2]._t)){ continue; }
							var k=Lx[z2].k;
							msg=(Lx[z2].iMsg)?Lx[z2].iMsg+' debe estar definido':msgBase;
							if(L[k]==undefined || L[k]==''){ 
								err={errNo:3,text:lnt+msg};
								break _salida1;;
							}
						}
					}
				}
			}
		}
		if(err){
			if(P.func){}
			else{ $1.Win.message(err); }
		}
		return err; 
	},
	btnDisabled:function(sii,pare){
		var btn=$1.q('.apiSendBtn',pare);
		if(sii==true){ btn.removeAttribute('disabled'); }
		else{ btn.setAttribute('disabled','disabled'); }
	},
	send:function(x,pare){
		var B=(x.B)?x.B:{}; var func=false;
		var jsF=(x.jsF)?x.jsF:'jsFields';
		var tebtn=(x.textNode)?x.textNode:'Guardar Información';
		var P = {'class':'ui_button apiSendBtn',textNode:tebtn,'x-title':'$Api.send'};
		if(x['class']){ P['class']=x['class']; }
		var Conf = (B && B.confirm)?B.confirm:false;
	if(x.Conf){ Conf=x.Conf; delete(x.Confi); }
		delete(B.confirm);
		if(B && B.func){ var func = B.func; delete(B.func); }
		if(B.value){ B.textNode = B.value; }
		P.textNode += ' * ';
		var vPost=(x.vPost)?x.vPost+'&':'';
		if(B){ pushO(P,B); }
		var iSend = $1.t('button',P);
		if(func){ iSend.onclick = function(){ func(this); } }
		else if(x){
			if(x.resp){ x.loade=x.resp; }
			iSend.onclick = function(){ T=this;
				x.btnDisabled = this;
				if(x.inputsFrom){ x.inputs = vPost+$1.G.inputs(x.inputsFrom,jsF); }
				if(Conf){
					$1.Win.confirm({text:Conf.text,func:function(){
						if(x.getInputs){ x.inputs = vPost+x.getInputs(T); }
						$Api.req(x);
					}});
				}
				else{
					if(x.getInputs){ x.inputs = vPost+x.getInputs(T); }
					$Api.req(x);
				}
			}
		}
		if(pare){ pare.appendChild(iSend); }
		return iSend;
	},
	btnSend:function(D,x,pare){
		var P = {'class':'ui_button',textNode:'Enviar Información'};
		var Conf = (D && D.confirm)?D.confirm:false; delete(D.confirm);
		if(D && D.func){ var func = D.func; delete(D.func); }
		if(D.value){ D.textNode = D.value; }
		if(D){ pushO(P,D); }
		var iSend = $1.t('button',P);
		if(x){//para $ps_DB, getInputs
			iSend.onclick = function(){ T=this;
				x.btnDisabled = this;
				if(Conf){
					$1.Win.confirm({text:Conf.text,func:function(){
						if(x.getInputs){ x.inputs = x.getInputs(T); }
						$Api.req(x);
					}});
				}
				else{
					if(x.getInputs){ x.inputs = x.getInputs(T); }
					$Api.req(x);
				}
			}
		}
		else if(func){ iSend.onclick = function(){ func(this); } }
		return iSend;
	},
	respWarn:function(resp,Jr){
		if(Jr.errWarn){
			var err={errNo:3,text:Jr.errWarn};
			if(Jr.winAlert=='Y'){ $1.Win.message(err); }
			var dr=$Api.resp(resp,err);
			dr.style.height='10rem';
			dr.style.fontSize='2.25rem';
		}
	},
	resp:function(ev,Jq){
		$1.clear(ev);
		var cls='input_info';
		var errs = new Array();;
		if(Jq.errs){ errs = Jq; delete(Jq.errs); }
		else{ errs[0] = Jq; }
		for(var n in errs){ D = errs[n];
			if(D.errNo == 1 || D.errNo == 4 || D.errNo ==5){ cls='input_error'; }
			else if(D.errNo == 2 || D.errNo == 3){ cls='input_warning'; }
			else { cls='input_info'; }
			var divr=$1.t('div',{'class':cls},ev);
			if(D._format=='html'){
				divr.innerHTML=D.text;
			}
			else{ divr.appendChild($1.t('textNode',D.text)); }
		}
		var iFocus = $1.t('input',{type:'button'},ev);
		iFocus.focus(); iFocus.blur(); $1.delet(iFocus);
		return divr;
	}
}

$Api.Rep={
	base:function(P,pare){
		//Fs[{k,t}
		var cont=(pare)?pare:$M.Ht.cont;
		$Api.get({f:P.f,inputs:P.inputs,loade:cont,errWrap:cont,func:function(Jr){
			if(Jr.errNo){ return $Api.resp(cont,Jr); }
			else if(Jr.L && Jr.L.errNo){ return $Api.resp(cont,Jr.L); }
			var _tbf=[];
			var totals=false;
			var XL=(P.Fs)?P.Fs:{};
			//usar una vista diferente defininiend V_{D=viewType}
			funcA=false; CHARS=false;
			if(Jr._view){ XL=P['V_'+Jr._view]; }
			if(typeof(XL)=='undefined'){ $Api.resp(cont,{errNo:3,text:'La función para generar el reporte no ha sido definida correctamente ('+Jr._view+')'}); }
			else if(typeof(XL)=='function'){ XL(Jr,cont); }
			else{
				if(XL[0].CHARS){ CHARS=XL[0].CHARS; XL.splice(0,1); }
				if(CHARS){  $myChart.CHARS(cont,CHARS,{Lx:Jr.L}); }
				for(var x in XL){ _tbf.push(XL[x].t); }
				var tb=$1.T.table(_tbf);
				var tBody=$1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr=$1.t('tr',{'class':tbCal._row},tBody);
					var ncol=1;
					for(var x in XL){ var Fs=XL[x];
						if(Fs.func){ Fs.func(L,$1.t('td',0,tr)); ncol++; continue; }//tag
						if(Fs.fType){ Fs.format=Fs.fType; }
						if(Fs.k){ Fs.f=Fs.k; }
						val=''; valx=L[Fs.f];
						if(typeof(valx)!='undefined'){
							if(Fs._g){ val=_g(valx,Fs._g,Fs._gDef); }
							else if(Fs.fText){ val=Fs.fText(L); }
							else{ val=valx; }
						}
						if(val && Fs.format=='number'){ val=val*1; }
						else if(val && Fs.format=='$'){ val=$Str.money(val); }
						valT=val;
						var val=(val && val.tagName)?{node:val}:{textNode:val,style:''};
						if(!val.node){
							if(Fs.sBg){ val.style +='backgroundColor:'+Fs.sBg+';'; }
							if(Fs.style){ val.style+=(typeof(Fs.style)=='function')?Fs.style(L):Fs.style; }
						}
						var td=$1.t('td',val,tr);
						if(Fs.totals=='Y'){ totals=true;
							td.classList.add(tbCal._cell);
							td.setAttribute('ncol',ncol);
						}
						ncol++;
					}
				}
				if(totals){
					var ncol=1;
					var tr=$1.t('tr',{'class':tbCal._row},tBody);
					for(var x in XL){ var Fs=XL[x];
						td=$1.t('td',{'class':tbCal._cell+'_'+ncol},tr);
						td.setAttribute('format',Fs.fType);
						ncol++;
					}
					tbCal.sumCells(tb);
				}
				$1.T.tbExport(tb,{ext:'xlsx',print:'Y'},cont);
			}
		}});
	}
}
$Api.toPars=function(X){
	var v='';
	if(typeof X == 'object'){
		for(var k in X){ v +=k+'='+X[k]+'&'; }
		v=v.replace(/\&$/,'');
	}
	return v;
}
$Api.copyFrom=function(P){
	$Cche.d(0,{});
	$Api.get({f:P.f,winErr:1,inputs:P.inputs, func:function(Jr3){
		if(P.func){ P.func(Jr3); }
		if(!Jr3.errNo){
			Jr3.AJs={};// k,val
			if(P.AJs){ for(var x in P.AJs){
				var T=P.AJs[x];
				if(T.kv){ Jr3[T.k]=Jr3[T.kv]; }
				else if(T.v){ Jr3.AJs[T.k]=T.v; }//definir [ {k:ott,v:gvtSor},{k:otr,v:docEntry} ]
			}}
			if(!P.noId){ delete(Jr3.docEntry); }
			for(var i in P.DA){ delete(Jr3[P.DA[i]]); }//eliminar docEntry
			if(Jr3.L){/* eliminar campos de lineas */
				for(var x in Jr3.L){
					if(P.idL){/* nombre de id Linea */
						Jr3.L[x][P.idL]=Jr3.L[x].id;
					}
					if(!P.noId){ delete(Jr3.L[x].id); }
					for(var i in P.DL){ delete(Jr3.L[x][i]); }//eliminar id,etc
				}
			}
			if(P.AJsL){ Jr3.AJsL=P.AJsL; }
			$Cche.d(Jr3);
			if(P.to){ $M.to(P.to); }
		}
	}});
}
$Api.foreach=function(Lx,func,D){
	if(!Lx.errNo){ for(var i in Lx){
		func(Lx[i],D);
	}}
}
$Api.Sea={
clsBox:'_apiSeaBoxRep',
input:function(P,cont){
	/* vSea= campos adicionales solo para buscar */
	var wrap=$1.t('div',{style:'position:relative;'},cont);
	var iD={type:'text','class':'iBg iBg_search2',placeholder:'Digita 3 caracteres...',value:P.value,'data-vPost':'Y'};
	if(P['class']){ iD['class'] +=' '+P['class']; }
	if(P.I){ for(var i in P.I){
		if(!i.match(/(class|type)/)){ iD[i]=P.I[i]; }
	} }
	iD.O={};
	if(P.clearInp=='Y'){ delete(iD['data-vPost']); }
	//if(P.vPost){ iD.O={vPost:P.vPost}; }
	var inp=$1.t('input',iD,wrap);
	if(P.vPost){ inp.vPost=P.vPost; } /*data-vPost=Y */
	if(P._jsV){ inp._jsV=P._jsV; } /*data-vPost=Y */
	if(P.jsF){ inp.classList.add(P.jsF); }
	inp.pare=cont; /* padre del div donde pongo */
	inp.P=P.P; /* parametrps */
	var btn=$1.T.btnFa({fa:'fa faBtn fa_close',title:'Eliminar Relación',func:function(){
			if(P.vPostClear){ inp.vPost=P.vPostClear; }
			inp.O={}; inp.value=''; inp._jsV=null;
		}},wrap);
		btn.style.position='absolute';
		btn.style.top=0;
		btn.style.right=0;
	var wList=$1.t('div',{style:'position:absolute; border:0.0625rem solid #000; padding:0.25rem; display:none; top:100%; left:0; backgroundColor:#FFF; width:100%;'},wrap);
	$1.T.btnFa({fa:'fa faBtn fa_close',textNode:'Cerrar ventana',func:function(){
			wList.style.display='none';
		}},wList);
	var wResp=$1.t('div',0,wList);
	var intv = false;
	inp.onkeypress = function(){  clearTimeout(intv); };
	inp.onblur = function(){ setTimeout(function(){ wList.style.zIndex='';},300); };
	inp.onkeyup = function(){ val = this.value; clearTimeout(intv);
	wList.style.zIndex=1; var Tinp=this;
	if(val.length==0){ Tinp.value=''; Tinp.O={}; }
	if(val.length<3){ return true; }
		intv = setTimeout(function(){
			wList.style.display='';
			var vPost=(P.vPost)?P.vPost+'&':'';
			vPost +='textSearch='+Tinp.value;
			if(P.vSea){ vPost +='&'+P.vSea; }
			$Api.get({f:P.api,inputs:vPost,loade:wResp,func:function(Jr){
				if(Jr.errNo){ $Api.resp(wResp,Jr); }
				for(var i in Jr.L){ var L=Jr.L[i];
					var linetext='';
					if(L.lineText){ linetext=L.lineText; }
					if(P.linek && L[P.linek]){ linetext=L[P.linek]; }
					if(P.lineTfunc){ linetext=P.lineTfunc(L); }
					var inp=$1.t('button',{'class':'btnOnSearch',textNode:linetext},wResp);
					inp.L=L;
					inp.onclick=function(){ var Tx=this;
						Tinp.value=Tx.innerText;
						if(P.clearInp=='Y'){ Tinp.value=''; }
						P.func(Tx.L,Tinp);
						wList.style.display='none';
					}
				}
			}});
		},500);
	}
	return wrap;
}
};
$Api.Sea.box=function(P,cont){ //lTag=apiSeaBox
	/* - vSea= campos adicionales solo para buscar
		- fSea() => funcion para obtener mas campos
		- _fie=campos, class
	*/
	var jsVB={};
	if(P.funcAll){
		P.func=P.funcAll;
		P.fReset=P.funcAll;
	}
	var PD=(P.D)?P.D:{};
	var vtext='';
	if(P.jsKF){ P.jsVB=null; }/* borrar por defecto */
	for(var x1 in P.jsVB){ var xk=P.jsVB[x1]; //[cardId,cardName]
		jsVB[xk]=(PD[xk])?PD[xk]:'';
		vtext +=(PD[xk])?PD[xk]+' ':''; /*texto base */
	}
	if(P._jsVp){ var sp=P._jsVp.split(',');
		for(var x1 in sp){ var xk=sp[x1];
			jsVB[xk]=(PD[xk])?PD[xk]:'';
		}
	}
	if(!P.value){ P.value=vtext; }
	var wrap=$1.t('div',{style:'position:relative;'},cont);
	var iD={type:'text','class':'iBg iBg_search2',placeholder:'Digita 3 caracteres...',value:P.value};
	if(P['class']){ iD['class'] +=' '+P['class']; }
	if(P.I){ for(var i in P.I){
		if(!i.match(/(class|type)/)){ iD[i]=P.I[i]; }
	} }
	if(P.name){ iD.name=P.name; }
	var inp=$1.t('input',iD,wrap);
	inp.style.borderBottom='solid #4285f4';
	if(jsVB){ inp.AJs=jsVB; } /*data-vPost=Y */
	if(P.AJsPut){
		for(var x1 in P.AJsPut){
			var KX1=P.AJsPut[x1];
			var xk1=(KX1.k)?KX1.k:KX1;
			var xk2=(KX1.a)?KX1.a:xk1;
			if(KX1.v){ inp.AJs[xk2]=KX1.v; }//definido
			else{ inp.AJs[xk2]=PD[xk1]; }//whsIdSep from whsId
		}
	}
	if(P.jsF){ inp.classList.add(P.jsF); }
	inp.pare=cont; /* padre del div donde pongo */
	inp.P=P.P; /* parametrps */
	var btn=$1.T.btnFa({fa:'fa faBtn fa_close',title:'Resetear campo',func:function(T){
			if(inp.AJs){
				for(var x in inp.AJs){ inp.AJs[x]=''; }
			}
			inp.value='';
			inp.classList.replace('iBg_add','iBg_search2');
			if(P.fReset){ P.fReset(T); }
		}},wrap);
		btn.style.position='absolute';
		btn.style.top=0;
		btn.style.right=0;
	var wList=$1.t('div',{style:'position:absolute; border:0.0625rem solid #000; padding:0.25rem; display:none; top:100%; left:0; backgroundColor:#FFF; width:100%;'},wrap);
	$1.T.btnFa({fa:'fa faBtn fa_close',textNode:'Cerrar ventana',func:function(){
			wList.style.display='none';
		}},wList);
	var wResp=$1.t('div',0,wList);
	var intv = false;
	inp.classList.add('_apiSeaBoxInp');
	inp.onkeypress = function(){  clearTimeout(intv); };
	inp.onblur = function(){ setTimeout(function(){ wList.style.zIndex='';},300); };
	inp.onkeyup = function(){ val = this.value; clearTimeout(intv);
	wList.style.zIndex=1; 
	var Tinp=$1.q('._apiSeaBoxInp',cont);
	if(val.length==0){ Tinp.value=''; Tinp.O={}; }
	if(val.length<3){ return true; }
		intv = setTimeout(function(Tinp,wList,P){ //pasando
			Tinp.classList.replace('iBg_add','iBg_search2');
			Tinp._jsV=null;
			wList.style.display='';
			var vSea ='textSearch='+Tinp.value;
			if(P.vSea){ vSea +='&'+P.vSea; }
			if(P.fSea){ vSea += '&'+P.fSea(Tinp); } //añadir antes de enviar
			if(P.fie){ vSea +='&_fie='+P.fie; }
			$Api.get({f:P.api,inputs:vSea,loade:wResp,
				rone:P.rone,/* 1 peticion activa */
				func:function(Jr){
				if(Jr.errNo){ $Api.resp(wResp,Jr); }
				for(var i in Jr.L){ var L=Jr.L[i];
					var linetext=''; /* dibujar texto en input */
					if(L.lineText){ linetext=L.lineText; }
					if(P.linek && L[P.linek]){ linetext=L[P.linek]; }
					if(P.lineTfunc){ linetext=P.lineTfunc(L); }
					var inp=$1.t('button',{'class':'btnOnSearch',textNode:linetext},wResp);
					inp.L=L;
					inp.onclick=function(){ var Tx=this;
						var trPare=Tinp.parentNode.parentNode.parentNode;
						if(P.lFunc){ //convertir campos
							L=P.lFunc(Tx.L,Tinp,trPare); 
						}
						Tinp.classList.replace('iBg_search2','iBg_add');
						Tinp.value=Tx.innerText;
						delete(Tx.L.lineText);
						if(P.clearInp=='Y'){ Tinp.value=''; }
						Tinp.AJs={};//Definir AJs
						if(P.AJsPut){//J:new Solo usar este
							for(var x1 in P.AJsPut){//asignar datos a enviar
								var KX1=P.AJsPut[x1];
								var xk1=(KX1.k)?KX1.k:KX1;
								var xk2=(KX1.a)?KX1.a:xk1;
								if(KX1.v){ Tinp.AJs[xk2]=KX1.v; }//definido
								else{ Tinp.AJs[xk2]=Tx.L[xk1]; }//whsIdSep from whsId
							}
						}
						else{
							for(var kr in P.jsKF){/* {accId:antAccId}*/
								Tinp.AJs[P.jsKF[kr]]=Tx.L[kr];
							}
							for(var x1 in jsVB){
								Tinp.AJs[x1]=Tx.L[x1];
							}
							if(P._jsVp=='all'){
								for(var x1 in Tx.L){ Tinp.AJs[x1]=Tx.L[x1]; }
							}
						}
						//L, input, tr
						if(P.func){ P.func(Tx.L,Tinp,trPare); }
						if(P.lineText){
							Tinp.value='';
							for(var i9 in P.lineText){
								var tx2=P.lineText[i9];
								Tinp.value +=(tx2==' ')?' ':Tx.L[tx2]
							}
						}
						if(P.boxRep && P.boxRep.tagName){
							$Api.Sea.boxRep(Tx.L,P.boxRep);
						}
						else if(P.boxRep!='N' && P.fieDefAt){ //no reemplazar
							$Api.Sea.boxRep(Tx.L,P.fieDefAt);
						}
						if(P.tdClick){ P.tdClick(Tx.L,Tinp); }
						wList.style.display='none';
					}
				}
			}});
		},500,Tinp,wList,P);
	}
	return wrap;
}
$Api.Sea.boxRep=function(D,pare){
	//$Api.Sea.clsBox con k=name a reemplazar
	var cs=$1.q('.'+$Api.Sea.clsBox,pare,'all');
	for(var i=0; i<cs.length; i++){
		var t=cs[i];
		var k=t.getAttribute('k'); //_s _s_itemName
		if(t.AiJs){
			if(!t.AJs){ t.AJs={}; }/*[slpId,fdpId] añadir campos adicionales */
			for(var k4_ in t.AiJs){ k4=t.AiJs[k4_];
				t.AJs[k4]=D[k4];
			}
		}
		var tag=(t.tagName).toLowerCase();
		var val=valt=D[k];
		if(!D[k]){ continue; }
		switch(t.getAttribute('kformat')){
			case 'money' : valt=$Str.money(val); break;
		}
		if(tag=='input'){ t.value=valt; }
		else if(tag=='select'){
			var opts=$1.q('option',t);
			var is=0;
			for(var i2=0; i2<opts.length; i2++){
				opts[i2].removeAttribute('selected');
				if(opts[i2].value==valt){ opts[i2].setAttribute('selected','selected'); is=1; }
			}
			t.value=valt;
		}
		else if(k){ t.innerText = valt; }
	}
}

$Api.boxi=function(P,pare){ P=(P)?P:{};
	var cls='apiBoxi';
	if(P.maxi){
		var qs=$1.q('.'+cls,pare,'all');
		if(qs && qs.length+1>P.maxi){
			var tx={errNo:3,text:'No se puede añadir más de '+P.maxi};
			$1.Win.message(tx);
			return false;
		}
	}
	var ln=(P.ln)?P.ln:'';
	var jsF=(P.jsF)?P.jsF:$Api.JS.clsArName;
	var name=(P.name)?P.name:'Lb';
	var dp={'class':cls+' '+jsF,name:P.name};
	if(P.uid){
		dp.id = cls+'_uniqueId__'+P.uid;
		if($1.q('#'+dp.id,pare)){ return false; }
	}
	var div=$1.t('div',dp,pare);
	div.AJs=(P.AJs)?P.AJs:{};
	var btn=$1.t('button',{'class':cls+'_close fa faBtn fa-close',P:P,title:'close'},div);
	btn.onclick=function(T){
		var tdiv=this.parentNode;
		tdiv.style.display='none';
		tdiv.AJs['delete']='Y';
		//if id no esta defini borro y ya
		if(this.P.xIf && !tdiv.AJs[this.P.xIf]){ $1.delet(tdiv); }
	}
	if(P.line1){ $1.t('div',{textNode:P.line1,'class':cls+'_line'},div); };
	if(P.line2){ $1.t('div',{textNode:P.line2,'class':cls+'_line'},div); };
	if(P.lineBlue){ $1.t('div',{textNode:P.lineBlue,'class':cls+'_line '+cls+'_lineBlue'},div); };
}


$Api.tbSea=function(P,cont){
	/* vSea= campos adicionales solo para buscar */
	/*get, Trs[{k,n,t}], */
	var Trs=P.Trs; var jsF='jsFiltVars';
	var vPost=(P.vPost)?P.vPost:'';
	if(P.vSea){ vPost +='&'+P.vSea; }
	var tb=$1.t('table',{'class':'table_zh'},cont);
	var tH=$1.t('thead',0,tb);
	var tBody=$1.t('tbody',0,tb);
	var trH=$1.t('tr',0,tH); var tds=1;
	var td1=$1.t('td','',trH);
	for(var i in Trs){ var Tr=Trs[i]; tds++;
		var td=$1.t('td',0,trH);
		var st=(Tr.style)?Tr.style:'width:4rem;';
		$1.t('div',{textNode:Tr.t,style:'fontWeight:bold; margin-bottom:0.25rem;'},td);
		var iName=(Tr.n)?Tr.n:Tr.k;
		if(Tr.opts){
			var inp=$1.T.sel({'class':jsF,sty:st,name:iName,opts:Tr.opts});
		}
		else{ var inp=$1.t('input',{type:'text',name:iName,'class':jsF,style:st}); }
		if(Tr.dis=='Y'){ inp.setAttribute('disabled','disabled'); }
		td.appendChild(inp);
	}
	var oneRw=(P.oneRow=='Y');
	var Ds=[];
	var btn=$Api.send({GET:P.get,textNode:' ','class':'fa faBtn faBtnCt fa_search',loade:tBody,getInputs:function(){
		return vPost+'&'+$1.G.inputs(tH,jsF);
	},func:function(Jr){
		if(Jr.errNo){ return $Api.resp($1.t('td',{colspan:tds},tBody),Jr); }
		for(var i in Jr.L){ var L=Jr.L[i];
			var tr=$1.t('tr',0,tBody);
			var td=$1.t('td',0,tr);
			var inpCk=$1.t('input',{type:'checkbox'},td);
			inpCk.L=L;
			if(oneRw){
				inpCk.onclick=function(){ $1.delet(bk); P.func(this.L); }
			}
			for(var f in Trs){/* resto columnas ---> */
				var Tr=Trs[f];
				var k=(Tr.k)?Tr.k:Tr.n;
				var val=(L[k])?L[k]:'';
				if(Tr.funcText){ val=Tr.funcText(L[k]); }
				if(Tr._g){ val= _g(L[k],Tr._g); }
				if(Tr.opts){ val= _g(L[k],Tr.opts); }
				$1.t('td',{textNode:val},tr);
			}
		}
	}},td1);
	var tdFin=$1.t('td',{colspan:tds},$1.t('tr',0,$1.t('tfoot',0,tb)));
	if(!oneRw){
		$1.T.btnFa({faBtn:'fa_arrowNext',textNode:'Añadir',func:function(){
			var Ds=[];
			var cks=$1.q('input[type=checkbox]',tBody,'all');
			for(var i=0; i<cks.length; i++){
				if(cks[i].checked){ Ds.push(cks[i].L); }
			}
			$1.delet(bk);
			P.func(Ds)
		}},tdFin);
	}
	var w=(P.Wi)?P.Wi:{};
	if(w.onBody!='N'){ w.onBody=1; }
	if(!w.winSize){ w.winSize='medium'; }
	if(!w.winTitle){ w.winTitle='Tabla de busqueda...'; }
	var bk=$1.Win.open(tb,w);
	return tb;
}
$Api.inputs=function(pare,jsF){
	var jsF=(jsF)?jsF:'jsFields';
	var c=$1.q('.'+jsF,pare,'all');
	var sDa='';
	for(var i=0; i<c.length; i++){
		var tag=c[i];
		var kn=tag.getAttribute('name');
		sDa += kn+'='+tag.value+'&';
		var lTy=tag.getAttribute('js-vPost');
		if(lTy && tag._jsV){
			for(var x in tag._jsV){
				sDa += x+'='+tag._jsV[x];
			}
		}
		if(tag.AJs){
			for(var i9 in tag.AJs){ sDa += i9+'='+tag.AJs[i9]+'&'; }
		}
		if(tag.O && tag.O.vPost){ sDa +=tag.O.vPost+'&'; }
		if(tag.vPost){ sDa +=tag.vPost+'&'; }
	}
	/* Lineas */
	var jsF=(jsF)?jsF:'jsFields';
	var c0=$1.q('.'+jsF+'-L',pare,'all');
	if(c0.length>0){
		for(var i0=0; i0<c0.length; i0++){
			var c=$1.q('.'+jsF+'-Name',c0[i0],'all');
			var dl={};
			for(var i=0; i<c.length; i++){
				var tag=c[i];
				var kn=tag.getAttribute('name');
					sDa += 'L['+i0+']['+kn+']='+tag.value+'&';
				if(tag.getAttribute('js-vPost')){
					if(tag._jsV){/*define to post */
						for(var x in tag._jsV){ sDa += 'L['+i0+']['+x+']='+tag._jsV[x]+'&'; }
					}
				}
			}
		}
	}
	return sDa;
}
$Api.getFilter=function(pare,jsF){
	return $Api.inputs(((pare)?pare:$M.Ht.filt),'jsFiltVars');
}
$Api.appendFile=function(tFile,formData){
	if(tFile.files.length>3){ $1.Win.message({text:'No se pueden cargar más de 3 archivos a la vez.'}); return false; }
	else{
		for(var i=0; i<tFile.files.length; i++){
			var file = tFile.files[i];
			var fileSize= Math.round(file.size/1024/1024).toFixed(2);
			if($0s.cFile.maxSize<fileSize){
				$1.Win.message({text:'El archivo supera el tamaño máximo por archivo a subir de '+$0s.cFile.maxSize+'Mb. ('+fileSize+')'});
				return false;
			}
			formData.set(tFile.name+'['+i+']', file, file.name);
		}
	}
	return true;
}

/* jsBody */
$1.Bolb={
	fie:'adms-fiebold',
	txtRow:'<//@/>',/*esto separa */
	sett:function(k,L,F){/*lee campo y crea estructura */
		//k=content, L{}, F:['time','location','reglas']
		if(L[k]){ 
			var re=new RegExp($1.Bolb.txtRow,'g');
			var sep=L[k].split(re);
			for(var i in sep){
				L[F[i]]=sep[i];
			}
		}
		return L;
	}
}
$Api.Cls={
a:'js-vBody',
L:'js-vBody-L',
};
$Api.jsBody=function(pare,toStr){
	function iVal(Fi,antVal){
		var val=Fi.value;
		val = (val==undefined || val=='undefined') ? '' : val;
		if(Fi.tagName=='SELECT' && Fi.getAttribute('multiple')){
			iLen=Fi.options.length;
			val=''; var Px=[];
			for (var i=0; i<iLen; i++){
				if(Fi.options[i].selected){ Px.push(Fi.options[i].value); }
			}
			val=Px.join();
		}
		if(Fi.getAttribute('type')=='checkbox'){
			val=(Fi.checked)?'Y':'N';
			if(Fi.getAttribute('NisY')=='Y'){
				val=(Fi.checked)?'N':'Y';
			}
		}
		if(Fi.getAttribute('numberformat') == 'mil' || Fi.numberformat == 'mil'){
			val = $Str.toNumber(val);
		}
		if(Fi && Fi.tagName && Fi.getAttribute('apijsfie')==$1.Bolb.fie){
			if(!$js.isNull(antVal)){
				antVal=(antVal)?antVal:'';
				val=antVal+$1.Bolb.txtRow+val;
			}
		}
		return val;
	}
	function iName(Fi,free){
		var kn=Fi.getAttribute('name');
		if(kn==null || kn==undefined){ return false; }
		if(free){ return (kn+''); }
		return (kn+'').replace(/\./,'_');
	}
	function AJsInt(Fi,Ld){//jsinterno
		var kn=iName(Fi);
		if(kn){ Ld[kn]=iVal(Fi); }
		AJs=(Fi.AJs)?Fi.AJs:false;
		if(AJs){ for(var x in AJs){ Ld[x]=AJs[x]; } }
		if(Fi.tagName=='SELECT'){
			tOpt=false;
			for (var i=0; i<Fi.options.length; i++){
				if(Fi.options[i].selected){ tOpt=Fi.options[i]; break; }
			}
			if(tOpt && tOpt.AJs){;
				if(tOpt.AJs){ for(var x in tOpt.AJs){ Ld[x]=tOpt.AJs[x]; } }
			}
		}
		return Ld;
	}
	function jsOn(Fi,Ld){
		var k=Fi.getAttribute('jsOn');
		var kn=iName(Fi);
		if(kn && k){
			if(!Ld[k]){ Ld[k]={}; }
			Ld[k][kn]=iVal(Fi);
		}
		else if(kn){ Ld[kn]=iVal(Fi); }
		AJs=(Fi.AJs)?Fi.AJs:false;
		if(Fi.tagName=='SELECT'){
			tOpt=false;
			for (var i=0; i<Fi.options.length; i++){
				if(Fi.options[i].selected){ tOpt=Fi.options[i]; break; }
			}
			if(tOpt && tOpt.AJs){ AJs=tOpt.AJs; }
			console.log('Pepa-->');
			console.log(AJs);
		}
		if(AJs){/*define to post */
			for(var x in AJs){ Ld[x]=AJs[x]; }
		}
		return Ld;
	}
	var sDa={};
	/* campos unicos */
	var c=$1.q('.'+$Api.JS.cls,pare,'all');
	for(var i=0; i<c.length; i++){
		var tag=c[i];
		var kn=iName(tag);
		if(kn){ sDa[kn]=iVal(tag,sDa[kn]); }
		if(tag._jsV){ tag.AJs=tag._jsV; }
		if(tag.AJs){
			for(var x in tag.AJs){ sDa[x]=tag.AJs[x]; }
		}
	}
	/* Lineas con 1 solo campo*/
	var c=$1.q('.'+$Api.JS.clsL1,pare,'all');
	if(c.length>0){
		sDa.L=[];
		for(var i=0; i<c.length; i++){
			var tag=c[i]; var ld={};
			if(tag._jsV){ tag.AJs=tag._jsV; }
			ld=jsOn(tag,ld);
			sDa.L.push(ld);
		}
	}
	/* Crea array con name, L[], F[] */
	var c=$1.q('.'+$Api.JS.clsArName,pare,'all');
	if(c){
		for(var i=0; i<c.length; i++){
			var tag=c[i];
			var kn=iName(tag);
			var val=iVal(tag);
			if(!kn){ kn='_uname'; }
			var keyname=tag.getAttribute('keyname');
			if(!sDa[kn]){ sDa[kn]=(keyname)?{}:[]; }
			if(keyname){ sDa[kn][keyname]=val; }// agregar tipo key-value
			if(tag.AJs){
				for(var x in tag.AJs){ sDa[kn]=tag.AJs[x]; }
			}
		}
	}
	/* Lineas que crea array con name, L[], F[] -revisar para quitar */
	var c=$1.q('.'+$Api.JS.clsAr,pare,'all');
	for(var i=0; i<c.length; i++){
		var tag=c[i];
		var kn=iName(tag);
		if(kn && !sDa[kn]){ sDa[kn]=[]; }
		sDa[kn].push(iVal(tag));
		if(tag.AJs){
			for(var x in tag.AJs){ sDa[kn][x]=tag.AJs[x]; }
		}
	}
	
	/* linea con nombres [tr.name] ={td.name=valor, td.name.valor...} */
	var c0=$1.q('.'+$Api.JS.clsLName,pare,'all');
	if(c0.length>0){
		for(var i0=0; i0<c0.length; i0++){
			var jsk=c0[i0].getAttribute('jsk'); /* tr L, Lf */
			if(jsk){} else{ jsk='L'; }
			if(!sDa[jsk]){ sDa[jsk]=[]; }
			var ld={};
			var c=$1.q('.'+$Api.JS.clsLNames,c0[i0],'all');
			for(var i=0; i<c.length; i++){
				var tag=c[i];
				var kn=iName(tag);
				if(kn){ ld[kn]=iVal(tag); }
				if(tag.AJs){
					for(var x in tag.AJs){ ld[x]=tag.AJs[x]; }
				}
			}
			sDa[jsk].push(ld);
		}
	}
	/* Lineas, tr con -L, jsk=L.F,X inputs con -N */
	var c0=$1.q('.'+$Api.JS.clsL,pare,'all');
	if(c0.length>0){ 
		for(var i0=0; i0<c0.length; i0++){
		var jsk=c0[i0].getAttribute('jsk'); /* tr L, Lf */
		if(jsk){} else{ jsk='L'; }
		var addLine=true;
		/*añadir como nombre y no array */
		var c=$1.q('.'+$Api.JS.clsLk,c0[i0],'all');
		if(c && c.length>0){ addLine=false;
			if(!sDa[jsk]){ sDa[jsk]={}; }
			for(var i=0; i<c.length; i++){
				var tag=c[i];
				var kn=iName(tag);
				if(kn){ sDa[jsk][kn]=iVal(tag,sDa[jsk][kn]); }
				if(tag.AJs){
					for(var x in tag.AJs){ sDa[jsk][x]=tag.AJs[x]; }
				}
			}
		}
		else{//añadir como array[]
			if(!sDa[jsk]){ sDa[jsk]=[]; }
			var ld={};
			var c=$1.q('.'+$Api.JS.clsLN,c0[i0],'all');
			for(var i=0; i<c.length; i++){
				var tag=c[i];
				if(tag._jsV){ tag.AJs=tag._jsV; }
				console.log(tag.AJs);
				ld=jsOn(tag,ld); //da ceros
				//ld=AJsInt(tag,ld);
			}
		}
		if(c0[i0].addLnIf){ /*  añadir linea if algun campo tiene valor */
			var addLine=false;
			for(var z1 in c0[i0].addLnIf){ var zL=c0[i0].addLnIf[z1];
				var k=(zL.k)?zL.k:zL;
				if(zL.nV){ //{k:delete,nV:N}->
					if(zL.nV!=ld[k]){ addLine=true; break; }
				}
				else if(ld[k]!=''){ addLine=true; break; }
			}
		}
		if(addLine){
			sDa[jsk].push(ld);
		}
	}
	}
	/* clsOnK: allsElements on arrayKey */
	var c0=$1.q('.'+$Api.JS.clsOnK,pare,'all');
	if(c0.length>0){
		for(var i0=0; i0<c0.length; i0++){
			var tag=c0[i0];
			var jsk=tag.getAttribute('jsk'); /*  L, Lf */
			var jstype=tag.getAttribute('jstype'); /* A=array[],D=data{} */
			jstype=(jstype)?jstype:'A';
			if(jsk){} else{ jsk='L2'; }
			var ld={};
			var kn=iName(tag,true);
			if(kn){ ld[kn]=iVal(tag); }
			if(tag.AJs){
				for(var x in tag.AJs){ ld[x]=tag.AJs[x]; }
			}
			if(!sDa[jsk]){ sDa[jsk]=(jstype=='D')?{}:[]; }
			if(jstype=='D'){ for(var x2 in ld){ sDa[jsk][x2]=ld[x2]; } }
			else{ sDa[jsk].push(ld); }
		}
	}
	if(toStr && typeof(sDa)=='object'){ return JSON.stringify(sDa); }
	else{ return sDa; }
}
$Api.JS={
cls:'js-vBody',
//tr con tds[] o tr con campos
clsOnK:'js-vBody-OnK',//lee y segun onk, añade a L[], R:[]
clsL:'js-vBody-L', clsLN:'js-vBody-N',clsLk:'js-vBody-k',
 /* L contiene N,N,N */
clsL1:'js-vBody-L1',
clsLName:'js-vBody-LName', clsLNames:'js-vBody-LNames',
clsAr:'js-vBody-Ar',/* cada uno agrega array con base a name */
clsArName:'js-vBody-ArName',/* cada uno agrega array con base a name */
/* obtener datos de un select */
kData:function(tag,O,k,d){
	var D={};
	if(tag.tagName=='SELECT'){
		D =_gO($1.G.sel(tag,'value'),O,k);
	}
	if(!D && d){ return d; }
	return D;
},
addF:function(X,pare,isLN){
	var Inps=[]; nn=0;
	if(!X[0]){ X=[X]; }
	for(var n in X){ P=X[nn]; nn++;
		if(!P.jsF){ P.jsF=$Api.JS.cls; }
		var eT={type:'hidden','class':P.jsF};
		if(P.name){ eT.name=P.name; eT.value=P.value; }
		Inps[nn]=$1.t('input',eT,pare);
		if(P.AJs){ Inps[nn].AJs=P.AJs; }
	}
	if(nn>1){ return Inps; }
	return Inps[nn];
},
get:function(pare,toStr){
	return $Api.jsBody(pare,toStro);
},
defAJs:function(tag,js){
	tag.AJs=js;
},
addAJs:function(tag,js){
	if(!tag.AJs){ tag.AJs={}; }
	for(var i in js){ tag.AJs[i]=js[i]; }
},
uniqAJs:function(tag,AJs,P,pare){
	//tag se vuelve JS-data para enviar y se mete en <div L>
	var P=(P)?P:{};
	if(!$Htm.uniqLine(P.uniq,pare)){
		var c1=(P.L)?$Api.JS.clsL:'';
		var c2=(P.L)?$Api.JS.clsLN:Api.JS.clsL;
		var d1=$1.t('div',{'class':c1},pare);
		$Htm.uniqCls(P.uniq,d1);
		d1.appendChild(tag);
		tag.classList.add(c2);
		tag.AJs=AJs;
	}
	else{ d1=$1.q('.'+$Htm.uniqGet(P.uniq),pare); }
	return d1;
}
};

$xhr={
c:function(){
	if(window.XMLHttpRequest){ var xhr = new XMLHttpRequest(); }
	else if(window.ActiveXObject){ var xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
	return xhr;
},
open:function(P,wrapPar){
	var wResp = $1.q('._wrapResp',wrapPar); $1.clear(wResp);
	var formData = new FormData();
	var btnDis=(P.btnDisabled && P.btnDisabled.tagName);
	if(btnDis){ P.btnDisabled.setAttribute('disabled','disabled'); }
	if(P._FI){
		for(var f=0; f<P._FI.files.length; f++){
			var file = P._FI.files[f];
			formData.append('file['+f+']', file, file.name);
		}
	}
	xhr=$xhr.c();
	P.method=(P.method)?P.method:'GET';
	xhr.open(P.method, P.url, true);
	var abt = $1.t('button',{'class':'iBg iBg_closeSmall',textNode:'Cancelar'},wResp);
	abt.onclick = function(){ xhr.abort(); $1.clear(wResp); }
	var progress = $1.t('progress',{value:0,max:100,style:'width:50%; background-color:#0F0;'},wResp);
	xhr.upload.addEventListener("progress", function(e){
		if(P.loadFull){ $load.open(); }
		progress.value = ((e.loaded/e.total)*100);
	}, false);
	xhr.onreadystatechange = function(){
		if(xhr.readyState ===4){
			$load.close();
			if(btnDis){ P.btnDisabled.removeAttribute('disabled'); }
		}
		var ok200=$xhr.isOk(xhr,P,wResp);
		if(ok200){
			var Jq = JSON.parse(xhr.responseText);
			$Api.resp(wResp,Jq);
			if(P.func){ P.func(Jq); }
		}
	}
	xhr.send(formData);
},
isOk:function(xhr,P,wResp){
	r=true; var resp = xhr.responseText;
	if(xhr.readyState==4 && xhr.status==200){
	if(resp==''){ r=false;
		var dat = $1.t('div');
		$1.t('p',{'textNode':'No se obtuvieron resultados.'},dat);
		$1.t('li',{'textNode':'FILE: '+P.url},dat);
		$1.t('li',{'textNode':'Method: '+P.method},da);
		$1.Win.message({'title':'Error de Respuesta','text':dat});

	}
	if(resp.match(/SMTP/m)){
		resp = resp.split(/\{\"/);
		resp = '{"'+(resp[1]).replace(/<\/p\>/gi,'');
		resp = (resp).replace(/[\n|\r]/gi,'');
	}
	else{
		var fatalErr = resp.match(/\<b\>(Fatal error)\<\/b\>\:(.*)/i);
		fatalErr = (fatalErr == null) ? resp.match(/\<b\>(Warning)\<\/b\>\:(.*)/i) : fatalErr;
		fatalErr = (fatalErr == null) ? resp.match(/\<b\>(Parse error)\<\/b\>\:(.*)/i) : fatalErr;
	}
	if(fatalErr!=null){ r=false;
		$1.delet('psAjaxError500');
		var div = $1.t("div",{id:'psAjaxError500', style:'position:fixed; top:0; left:0; width:100%; height:100%; backgroundColor:rgba(255,0,0,0.7); color:#FFF; z-index:1000;'},document.body);
		var nofound = $1.t("div",{style:'position:absolute; margin:0 auto; height:100px; widht:100%; padding:30px 10px;'},div);
		$1.t('h1',{'textNode':fatalErr[1]},nofound);
		$1.t('p',{'textNode':'Error desde el Servidor en el archivo:'+P.url},nofound);
		$1.t('p',{'textNode':fatalErr[2]},nofound);
		var iClose = $1.T.btnFa({fa:'fa_close',textNode:'Cerrar Ventana', func:function(){ $1.delet('psAjaxError500'); }},nofound);
		iClose.focus(); iClose.blur();
	}
	}
	else{ r=false; }
	//if(wResp){ $Ap.resp(wResp,{errNo:3,text:'Err Status: '+xhr.status}); }
	return r;
}
};

$Api.Filt=function(P){
	this.cols=P.cols;
	this.ordByT=P.ordByT;//ASC,DESC
	this.ordBy=P.ordBy;//opts
	this.func=P.func;
	this.F=P.F//Campos de Filtros
	this.jsF=(P.jsF)?P.jsF:'jsFiltVars';
	this.cont=(P.cont)?P.cont:$M.Ht.filt//Campos de Filtros
	this.active=P.active//Campos de Filtros
	this.get=function(){
		return $1.G.inputs(this.cont,this.jsF,{blankFie:'N'});
	}
this.form=function(P){ ThiS=this;
	var cls='__1WP_filter';
	if(P.cont){ ThiS.cont=P.cont; }
	var realCont=ThiS.cont;
	var div=$1.q('.'+cls,realCont);
	if(P.clear){ $1.delet(div); return true; }
	if(P.reset){ $1.delet(div); }
	if(!div){
		var div=$1.t('div',{style:'display:inline-block; position:relative;','class':cls},realCont);
		//ver ocultar
		var btn=$1.t('span',{'class':'faBtn fa fa-filter '+$Filt.clsBtn,textNode:'Filtros'},div);
		btn.onclick=function(){ ThiS.hider(div); }
		if(ThiS.active){ btn.style.color='#0F0'; }
		//Contendor Filtros
		var fls=$1.t('div',{'class':'noDisplay '+$Filt.clswList,style:'position:absolute; left:0; top:100%; z-index:1; background-color:#FFF; border:0.0625rem solid #000; padding:0.25rem;'},div);
		//Dibujar Campos
		ThiS.v1({wh:P.wh,one:1},fls);
	}
}
this.hider=function(pare){
	var fls=$1.q('.'+$Filt.clswList,pare);
	if(fls){ fls.classList.toggle('noDisplay'); }
}
}
$Api.Filt.prototype.v1=function(P,pare){ ThiS=this;
	var clsId='__1Filt_v1';
	var P=(P)?P:{};
	var jsF=ThiS.jsF;
	if(P.one){
		if($1.q('.'+clsId,pare)){ return true; }
	}
	var wx=$1.t('div',{'class':clsId},pare);
	if(ThiS.ordBy){
		var wx2=$1.t('div',{style:'padding:5px 0'},wx);
		$1.T.sel({'class':jsF,name:'ordByT',opts:[{k:'DESC',v:'Descendente'},{k:'ASC',v:'Ascendente'}],noBlank:'Y'},wx2);
		$1.t('span',{textNode:' | '},wx2);
		$1.T.sel({'class':jsF,name:'ordBy',opts:ThiS.ordBy,noBlank:'Y'},wx);
	}
	var tds=(ThiS.cols>1)?ThiS.cols:1;
	var Tb=['Campo','Valor Buscado'];
	for(var nn=1; nn<tds; nn++){ Tb.push(''); Tb.push('Campo'); Tb.push('Valor Buscado'); }
	var tb=$1.T.table(Tb,0,wx);
	var tBody=$1.t('tbody',0,tb);
	var ntds=0;
	for(var i in ThiS.F){ var L=ThiS.F[i];
		if(ntds%tds==0){
			var tr=$1.t('tr',0,tBody);
		}ntds++;
		L[0]=(!L[0].textNode)?{textNode:L[0]}:L[0];
		$1.t('td',L[0],tr);
		var td2=$1.t('td',{},tr);
		tdA(L[1],td2);
		if(tds>1){ $1.t('td',{style:'backgroundColor:#CCC;'},tr); }
	}
	$1.T.btnFa({fa:'faBtnCt fa-search',textNode:'Actualizar',P:ThiS,func:function(Tbt){
		ThiS.hider(pare.parentNode);
		if(Tbt.P.func){ Tbt.P.func(Tbt); }
	}},wx);
	$1.T.btnFa({fa:'faBtnCt fa-close',textNode:'Borrar',func:function(){ $1.clearInps(wx); }},wx);
	function tdA(Lx,td){
		if(Lx.tag){ Lx=[Lx]; }
		else{ Lx=Lx.TA; }
		for(var i in Lx){ L=$js.clone(Lx[i]);
			if(P.wh!='N'){ L.name='wh['+L.name+']'; }
			if(L['class']){ L['class']=L['class']+' '+jsF; }
			else { L['class']=jsF; }
			$1.lTag(L,td);
		}
	}
	return tb;
}
$Api.form2=function(P,cont){
	AF={wrapper:false, midCont:false,Tabs:{}};
	var pareTop=false;
	if(P.Win){
		cont=$1.t('div');
		pareTop=$1.Win.open(cont,P.Win);
	}
	else if(cont){ pareTop=cont; }
	else{ var cont=(P.cont)?P.cont:$M.Ht.cont; pareTop=cont; }
	AF.wrapper = cont;
	var Pa=(P.Pa)?P.Pa:$M.Pa;
	var vidn=(P.vidn)?P.vidn:'vid';
	var vid=P[vidn];
	if(P.uid){ vid=P.uid; }//pasar valor de: docEntry,vid, etc
	if(P.uidn){ vidn=P.uidn; vid=Pa[vidn]; }//pasar docEntry,vid, etc
	if(P.f){ P.api=P.f; }
	if(P.uri){ P.api=P.uri; } //POST /user, PUT /user, GET /user/{id}, DELETE /user
	if(P.furl){ P.api='_furl_'; }
	var apiGet=(P.apiGet)?P.api+P.apiGet:P.api; // api[/form]
	loadVerif=false;
	if(P.uid && P.uid.k){ //pasar {k:docEntry,v:Pa.docEntry (opt)}
		vidn=P.uid.k; vid=false;
		if(P.uid.v){ loadVerif=true; vid=P.uid.v; }
		else if(Pa[P.uid.k]){ loadVerif=true; vid=Pa[vidn]; }
		if(loadVerif){ 
			if(P.f){} //ambos iguales
			else if(P.uri){ apiGet=P.uri+'/show'; }
			else{ apiGet += (P.apiForm)?'/'+P.apiForm:'/one'; }
		}
	}
	else if(P.canEdit){ loadVerif=true; //obsoleto
		if(P.apiForm){ apiGet +='/'+P.apiForm; }
		else{ apiGet +='/form'; }
	}
	var vGet=(vid)?''+vidn+'='+vid:'';
	$Api.get({furl:P.furl,f:apiGet,loadVerif:!loadVerif, inputs:vGet,loade:cont,func:function(Jr){
		if(Jr[vidn]){}//usar los datos obtenidos
		else if(P.JrD){ Jr=P.JrD; }//recibido anteriormente Jr para poder usar 
		if(P.err!='N' && Jr.errNo){ return $Api.resp(cont,Jr); }
		else if(P.err==1 ||Jr.errNo==1){ return $Api.resp(cont,Jr); }
		else if(P.err==2 || Jr.errNo==2){ return $Api.resp(cont,Jr); }
		if(P.AJs){ $Api.JS.addF({AJs:P.AJs},cont); }
		var jsF=$Api.JS.cls;
		jsFF=false;
		if(P.jsF){ jsFF=(P.jsF=='Y')?jsF:P.jsF; }
		var hid=$1.t('input',{type:'hidden','class':jsF+' _apiFormAJs',name:vidn,AJs:{}},cont);
		if(vidn=='N'){ hid.classList.remove(jsF); }
		if(vid){ hid.value=vid; }
		var pare=cont; n=0;
		for(var i in P.tbH){
			var taL=P.tbH[i];
			if(taL.addIf){
				if(typeof(taL.addIf)=='function' && taL.addIf(Jr,P)=='N'){ continue; } // return true omite añadir campo
				else if(taL.addIf=='N'){ continue; } // omite añadir campo
			}
			if(n==0 && !taL.divLine){ taL.divLine=1;} n=1;
			var tI=taL.I;
			//asignar value
			if(tI && tI.lTag=='card' && tI._D=='Y'){ tI.D=Jr; }
			if(tI && tI.name && Jr[tI.name]){ taL.I.value=Jr[tI.name]; }
			if(jsFF && tI){
				if(taL.I['class']){ taL.I['class'] += ' '+jsFF; }
				else{ taL.I['class'] = jsFF; }
			}
			if(taL.divLine){
				pare=$1.T.divL(taL,cont);
			}
			else{ $1.T.divL(taL,pare); }
		}
		if(P.midTag){ $1.t('div',{'class':'midCont'},cont); }
		if(P.Tabs){ AF.Tabs=$1.tabs(P.Tabs,$1.t('div',{'class':'apiFormTabs'},cont),{P:Jr}); }
		if(P.midCont){ P.midCont(Jr,cont,AF); }
		var resp=$1.t('div',0,cont);
		var tP={furl:P.furl,POST:P.api,resp:resp,loade:resp, jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && P.delCont){ $1.delet(pareTop); }
			if(!Jr2.errNo && P.clearForm){
				cont.innerHTML='';
				$Api.resp(cont,Jr2);
			}
			if(!Jr2.errNo && Jr2[vidn]){ hid.value =Jr2[vidn]; }
			if(!Jr2.errNo && o && o[vidn]){ 
				hid.value =o[vidn];
				if(P.TbUpd){ $Sysd.TbUpd(P.TbUpd,o); }
			}
			if(!Jr2.errNo && P.func){ P.func(Jr,o); }
			if(!Jr2.errNo && P.to){ 
				$M.to(P.to,vidn+':'+hid.value); //docEntry
			}
		}};

		if(P.PUTid){ tP.PUT=tP.POST; delete(tP.POST);
			hid.value=P.PUTid; //pasar docEntry
		}
		if(P.canEdit=='Y' && vid){ 
			tP.PUT=tP.POST; delete(tP.POST);
			hid.value=vid; //pasar docEntry
		}
		else if(P.uidn && vid){ }//no PUT
		else if(vid){ tP.PUT=tP.POST; delete(tP.POST); }
		tP.reqFields=P.reqFields;
		tP.befSend=P.befSend;//antes de enviar
		$Api.send(tP,cont);
		btn=$1.q('.apiSendBtn',cont);
		if(btn){ btn.innerText += '^'; }
		//Ejecutar luego
		if(P.aftFunc){ P.aftFunc(cont,Jr,P); }
		if(P.funcAf){ P.funcAf(cont,Jr,P); }
	}});
	return AF;
}
$Api.form=function(ThiS,funcAf){//formulario base
	//delCont,
	var pareTop=false;
	if(ThiS.Win){
		cont=$1.t('div');
		pareTop=$1.Win.open(cont,ThiS.Win);
	}
	//COls[texto,{k:, T:}
	else{ var cont=(ThiS.cont)?ThiS.cont:$M.Ht.cont; pareTop=cont; }
	var vidn=(ThiS.vidn)?ThiS.vidn:'vid';
	var vid=ThiS[vidn];
	var vPost=(vid)?''+vidn+'='+vid:'';
	$Api.get({f:ThiS.api+'/form',addGet:ThiS.gSend,loadVerif:!vid, inputs:vPost,loade:cont,func:function(Jr){
		if(ThiS.err!='N' && Jr.errNo){ return $Api.resp(cont,Jr); }
		else if(ThiS.err==1 && Jr.errNo==1){ return $Api.resp(cont,Jr); }
		else if(ThiS.err==2 && Jr.errNo==2){ return $Api.resp(cont,Jr); }
		var jsF=$Api.JS.cls;
		var hid=$1.t('input',{type:'hidden','class':jsF,name:vidn},cont);
		if(vid){ hid.value=vid; }
		var pare=cont; var ln0=true;
		for(var i in ThiS.Cols){
			var taL=ThiS.Cols[i][1];
			if(taL.TNO){ continue; }
			if(!taL.t){ taL.t=(ThiS.Cols[i][0].textNode)?ThiS.Cols[i][0].textNode:ThiS.Cols[i][0]; }
			var dL=(taL.T);
			dL.name=(dL.name)?dL.name:taL.k;
			dL.value=Jr[taL.k];
			wxn=(dL.wxn)?dL.wxn:'wrapx1';
			if(!dL['class']){ dL['class']=jsF; }
			else{ dL['class']=jsF+' '+dL['class']; }
			if(dL.divLine){
				pare=$1.T.divL({divLine:1,wxn:wxn,L:taL.t,Inode:$1.lTag(dL,0,Jr)},cont);
			}
			else{ $1.T.divL({wxn:wxn,L:taL.t,Inode:$1.lTag(dL,0,Jr)},pare); }
		}
		if(ThiS.fCont){//Añadir contenido
			var cadd=$1.t('div',0,cont);
			ThiS.fCont(Jr,cadd,{jsF:jsF});
		}
		var resp=$1.t('div',0,cont);
		var tP={POST:ThiS.api,addGet:ThiS.gSend,loade:resp, jsBody:cont, func:function(Jr2,o){
			$Api.resp(resp,Jr2);
			if(!Jr2.errNo && o && ThiS.oFunc){ ThiS.oFunc(o,pareTop); }
			if(!Jr2.errNo && ThiS.delCont){ $1.delet(pareTop); }
			if(!Jr2.errNo && o && o[vidn]){
				hid.value =o[vidn];
				if(ThiS._ty=='Tb'){ $Tb._upd(o,ThiS.kObj); }
				if(ThiS._ty=='JsV'){ $JsV._upd(o,ThiS.kObj); }
			}
		}};
		if(vid){ tP.PUT=tP.POST; delete(tP.POST); }
		tP.jsAdd=ThiS.jsAdd
		$Api.send(tP,cont);
		$1.t('p',{textNode:'$Api.form v3.1',style:'fontSize:9px;'},cont);
		//Ejecutar luego
		if(funcAf){ funcAf(cont,Jr,ThiS); }
	}});
}
$Api.formWin=function(P,P2){
	var jsF=(P.jsF)?P.jsF:$Api.JS.cls;
	P.jsF=jsF;
	var divW=$1.t('div');
	if(P.fTag){ P.fTag(divW,P,P2); }
	var winTitle=(P.winTitle)?P.winTitle:'';
	var text=(P.text)?P.text:null;
	$1.Win.confirm({noClose:1,btnText:'Aceptar *', winTitle:winTitle,text:text, Inode:divW, InodeBot:P.InodeBot, func:function(resp,wrapC,btn){
		$Api.put({f:P.api,btnDisabled:btn,loade:resp, inputs:$1.G.inputs(wrapC,jsF), func:function(Jr){ $Api.resp(resp,Jr); } });
	}});
}

$Filt={
cls:'__Filt_',
clsBtn:'__Filt_btn',
clswList:'__Filt_wList'
}

/* borrar */
var $ps_DB= {
then:false,
addGet:'',
Loader:{//barras de cargar
	full:function(P){P=(P)?P:{};
		var ide = (P.id)?P.id:'admsDBLoaderFull';
		$1.delet(ide);
		var div = $1.t('div',{id:ide,style:'position:fixed; left:0; top:0; width:100%; height:100%; scroll:hidden; background-color:rgba(255,255,255,0.8)'});
		var img = $1.t('img',{src:$Ap.imgLoadFull1});
		var h5 = $1.t('h2',{textNode:'Cargando...'});
		div.appendChild(img);
		div.appendChild(h5);
		document.body.appendChild(div);
	}
}
,
V:{
	Fields:{datec:'Creado',
	userName:'Creado Por',
	userAuthName:'Autorizado Por', dateAuth:'Autorizado el'
	}
}
,
http:'', response:'',
doc:function(){
	var req = false;
	try { req = new XMLHttpRequest(); }
	catch(err1){
		try{ req = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch(err2){
			try{ req = new ActiveXObject("Microsoft.XMLHTTP"); }
			catch(err3) { req = false; }
		}
	}
	return req;
}
,
simple:function(url,P){
	if(window.XMLHttpRequest){ var xhr = new XMLHttpRequest();}
	else if(window.ActiveXObject){
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open('POST', url, true);
	xhr.onload = function(E){
		if(xhr.status == 200){
			var r= xhr.responseText;
			if(P.mimeType=='json'){ r=JSON.parse(r); }
			if(P.func){ P.func(r); }
		}
	}
	xhr.send(P.inputs);
},
get:function(PARS){
	if(PARS.loadVerif){
		if(PARS.func){ PARS.func({}); }
		Intv.jsC();
		return true;
	}
	if(PARS.m){ PARS.method=PARS.m; }
	if(PARS.nogetData){
		if(PARS.func){ PARS.func(PARS.nogetData); }
		return true;
	}
	http = $ps_DB.doc();
	PARS.method = (PARS.method != undefined) ? PARS.method : 'POST';
	PARS.addGet = (PARS.addGet) ? PARS.addGet : '';
	PARS.addGet = ($ps_DB.addGet != '') ? $ps_DB.addGet : PARS.addGet;
	if(PARS.respDiv && $1.G.dataok=='N'){
		$ps_DB.response(PARS.respDiv,{errNo:2,text:'Debes deligenciar los campos obligatorios (*)'});
		return false;
	}
	//paginado--
	var pager = $1.q('.__pagerMove',PARS.wrapPager);
	if(pager){
		var num = $1.q('.__pagerNumber',pager);
		if(num){ PARS.addGet += '&_pnext='+num.value; }
	}
	if(PARS.f){ var fr = PARS.f;
		PARS.f = fr.replace(/^\_?(POST|PUT|GET|DELETE) ?/,"$1");
		var si = ''; var iniUri='';
		if(fr.match(/^\_?(POST|PUT|GET|DELETE) ?/)){ iniUri='/'; }
		if(fr.match(/^\_(GET)/)){PARS.method = 'GET'; si = '?'+PARS.inputs; }
		else if(fr.match(/^\_(POST)/)){ PARS.method = 'POST'; si = ''; }

		PARS.file = (PARS.f.match(/^http/))? PARS.f: iniUri+PARS.f;
		PARS.ApiMethod = PARS.f.replace(/^(POST|PUT|GET|DELETE).*/,"$1");
		//PARS.f = PARS.f.replace(/^(POST|PUT|GET|DELETE)/,"$1 ")
	}
	else{
	var methodFile = (PARS.file).match(/^(POST|PUT|GET|DELETE)/);
	if(methodFile){
		PARS.ApiMethod = methodFile[1];
		PARS.file = (PARS.file).replace(/^(POST|PUT|GET|DELETE|GETs)\ ?/,'');
	}
	var ApiMethod = (PARS.ApiMethod != undefined && PARS.ApiMethod != '')
	? 'ADMS_API_METHOD='+PARS.ApiMethod
	: 'ADMS_API_METHOD=GET';
	methodFile = (methodFile && methodFile[1]) ? methodFile[1] : 'GET_n';
	}
	ApiMethod = (ApiMethod)?ApiMethod:'';
	var formParms = (PARS.inputs) ? PARS.inputs : '';
	PARS.fileSimple = (PARS.method == 'GET') ? PARS.file+'?'+ApiMethod+'&'+formParms : PARS.file+'?'+ApiMethod;
	if($M){ _Pa=$M.read('!'); ApiMethod += '&_haskKey='+_Pa;}
	PARS.file = (PARS.method == 'GET') ? PARS.file+'?'+ApiMethod+'&'+formParms : PARS.file+'?'+ApiMethod;
	$1.delet('psAjaxError404');
	if(PARS.file){
		if(!PARS.btnDisabled && $M && $M.Ht.filt){
			PARS.btnDisabled=$1.q('.__btnAjaxFilter',$M.Ht.filt);
		}
		if(PARS.btnDisabled){ PARS.btnDisabled.setAttribute('disabled','disabled'); }
		if($y.apiURI){ PARS.file=$y.apiURI+PARS.file; }
		http.open(PARS.method,PARS.file+'&'+PARS.addGet,true);
		var sendTooken=false;
		if(PARS.headers){
			for(var h in PARS.headers){ http.setRequestHeader(h,PARS.headers[h]);
			if(h=='ocardtooken'){ sendTooken=true; }
			}
		}
		if($s.Headers){
			for(var h in $s.Headers){ http.setRequestHeader(h,$s.Headers[h]);
			if(h=='ocardtooken'){ sendTooken=true; }
			}
		}
		if(sendTooken==false){ http.setRequestHeader('ocardtooken',$0s.stor('ocardtooken')); }
		if(!PARS.loade || PARS.loaderFull){
			var loadw = $1.t('div',{'id':'_loadJSFull',style:'position:fixed; left:0; top:0; background:rgba(0,0,0,0.5); width:100%; height:100%; z-index:10;'},$1.body);
			var wrapxx=$1.t('div',{style:'margin:0 auto; max-width:6rem; padding-top:1rem;'},loadw);
			$1.t('img',{'src':$Api.imgLoad1, alt:' Cargando...', title:' Cargando',style:'margin:0 auto;'},wrapxx);
			$1.t('h5',{textNode:'Cargando...'},wrapxx);
		}
		if(PARS.loade){
			var loadw = $1.t('div',{'id':'psLoadAjaxPoints','class':'psLoadAjaxPoints'});
			ADMS.urlTop = (ADMS.urlTop) ? ADMS.urlTop : '';
			loadw.appendChild($1.t('img',{'id':'psLoadAjaxPoints','src':$Api.imgLoad1, alt:' Cargando...', title:' Cargando'}));
			loadw.appendChild($1.t('i',{textNode:' Cargando...'}));
			$1.clear(PARS.loade);
			if((PARS.loade).tagName){ (PARS.loade).appendChild(loadw); }
		}
		http.onreadystatechange = function(){
		if(http.readyState === 4 && PARS.btnDisabled){
			PARS.btnDisabled.removeAttribute('disabled');
		}
		if(http.readyState === 4 && http.status === 200){
			Intv.jsC();
			$1.delet('psLoadAjaxPoints'); $1.delet('_loadJSFull');
			if(PARS.funcErr){ PARS.funcErr(JS); $1.delet('psLoadAjaxPoints'); }
			$1.delet('psLoadAjaxPoints');
			$1.delet('admsDBLoaderFull');
			$1.clear(PARS.loade);
			if(http.responseText == ''){
			var dat = $1.t('div');
				dat.appendChild($1.t('p',{'textNode':'No se obtuvieron resultados.'}));
				dat.appendChild($1.t('li',{'textNode':'FILE: '+PARS.fileSimple}));
				dat.appendChild($1.t('li',{'textNode':'ApiMethod: '+PARS.ApiMethod}));
				dat.appendChild($1.t('li',{'textNode':'Method: '+PARS.method}));
				//dat.appendChild($1.t('li',{'textNode':'vPost: '+PARS.inputs}));
				$1.Win.message({'title':'Error de Respuesta','text':dat});
				return false;
			}
			var resp = http.responseText;
			if(resp.match(/SMTP/m)){
				resp = resp.split(/\{\"/);
				resp = '{"'+(resp[1]).replace(/<\/p\>/gi,'');
				resp = (resp).replace(/[\n|\r]/gi,'');
			}
			else if(resp.match(/^RESPONSETEXT/i)){
				resp = resp.replace(/RESPONSETEXT/i,'');
				var pr = $1.t('div',{'class':'ajusTextAll',textNode:resp});
				$1.Win.message({text:pr});
				return false;
			}
			else if(resp.match(/^ALERTJSON/i)){
				resp = resp.replace(/ALERTJSON/i,'');
				var pr = $1.t('div',{'class':'ajusTextAll'});
				pr.innerHTML=resp;
				$1.Win.message({text:pr})
			}
			else{
			var fatalErr = resp.match(/\<b\>(Fatal error)\<\/b\>\:(.*)/i);
			fatalErr = (fatalErr == null) ? resp.match(/\<b\>(Warning)\<\/b\>\:(.*)/i) : fatalErr;
			fatalErr = (fatalErr == null) ? resp.match(/\<b\>(Parse error)\<\/b\>\:(.*)/i) : fatalErr;
			}
			if(fatalErr != null){
				$1.delet('psAjaxError500');
				var divnofound = $1.t("div",{'id':'psAjaxError500', style:'position:fixed; top:0; left:0; width:100%; height:100%; backgroundColor:rgba(255,0,0,0.7); color:#FFF; z-index:1000;'});
				var nofound = $1.t("div",{style:'position:absolute; margin:0 auto; height:100px; widht:100%; padding:30px 10px;'});
				nofound.appendChild($1.t('h1',{'textNode':fatalErr[1]}));
				nofound.appendChild($1.t('p',{'textNode':'Error desde el Servidor en el archivo:'+PARS.file }));
				nofound.appendChild($1.t('p',{'textNode':fatalErr[2]}));
				var reloaded = $1.t('a',{href:document.location, 'textNode':'Actualizar'});
				reloaded.onclick = document.location.reload;
				nofound.appendChild(reloaded);
				var iClose = $1.t('input',{type:'button',value:'Cerrar Ventana',style:'display:block; margin:6px 0;'});
				iClose.onclick = function(){ $1.delet('psAjaxError500'); }
				nofound.appendChild(iClose);
				divnofound.appendChild(nofound);
				document.body.appendChild(divnofound);
				iClose.focus(); iClose.blur();
			}
			else{
			{//
					//var JS = JSON.parse(decodeURI(resp));
					var JS = JSON.parse(resp);
					if(pager && JS.rows==0 && JS._pnext){
						var numb = $1.q('.__pagerNumber',pager); numb.value = numb.lastValue;
					}
					if(JS.errNo && JS.requireLogin=='Y'){
						localStorage.clear();
						location.href ='/login?out=1';
					}
					//eliminar pager si es necesario
						var pager = $1.q('.__pagerMove',PARS.wrapPager);
						var numP=$1.q('.__pagerNumber',pager);
						var befp=$1.q('.__pagerBack',pager);
						var nextp=$1.q('.__pagerNext',pager);
						if(pager){
							nextp.removeAttribute('disabled');
							befp.removeAttribute('disabled');
							if(numP.value<=1){ befp.setAttribute('disabled','disabled'); }
							if(JS.rows==0 || JS.__rows<JS.__limitDef || JS.__nextPager=='N'){ nextp.setAttribute('disabled','disabled'); }//si no son iguales, es porque se llego al maximo
						}
						if(JS.__limitDef=='N' && pager){ pager.style.display = 'none'; }
						else if(JS.__nextPager=='Y' && pager){ pager.style.display = 'block'; }
						else if(JS.__nextPager!='Y' && pager){ pager.style.display = 'none'; }

					var errNo = (JS.errNo) ? JS.errNo : '';
					var JS0 = (JS.respChild) ? JS.respChild[0] : {}
					if(JS.errNo || JS0.errNo){ JS.ajaxFile = PARS.fileSimple; }
					if(JS0.errNo){
						title = (JS0.title) ? JS0.title : 'Error General (Und)';
						$1.Win.message({title:title, text:JS0.text });
					}
					else if(JS.error_auth == true || JS.errNo==4){ $1.Win.message({text:JS.text, btnText:'Iniciar Sesión', func:function(){ location.href ='/login?out=1';}}); }
					else if(JS.alert=='Y' || JS.errNo == 1 || JS.errNo == 4 || JS.errNo == 5 || JS.errNo == '4_'){
						$1.Win.message(JS);
					}
					else if(PARS.errWrap && JS.errNo){ $ps_DB.response(PARS.errWrap,JS); }
					else{
						//$5n.room.a(JS);
						if(PARS.func){
							PARS.func(JS);
							if($ps_DB.then != false){ $ps_DB.then(); $ps_DB.then = false; }
						}
						else if(PARS.VAR){ PARS.VAR = JS; }
						if(!PARS.func && $ps_DB.then != false){ $ps_DB.then(); $ps_DB.then = false; }
					}
				}
				try{}
				catch(e){
					var cot = $1.t('p');
					cot.appendChild($1.t('li',{textNode:'Nombre Error: '+e.name}));
					cot.appendChild($1.t('li',{textNode:'At: '+e.at}));
					cot.appendChild($1.t('li',{textNode:'on: '+PARS.fileSimple}));
					cot.appendChild($1.t('p',{textNode:'Text: '+e.stack}));
					if(typeof(JS) != 'object'){
						cot.appendChild($1.t('pre',{textNode:resp,style:'background:#F00; color:#FFF;'}));
					}
				$1.win.open(cot,{onBody:true,winTitle:'Error de Ejecución',zIndex:1000});
					console.error(e);
				}
			}
		}
		else if(http.readyState !== 4){ /* errore */}
		else if(http.status === 404){
			var divnofound = $1.t("div",{'id':'psAjaxError404', style:'position:fixed; top:0; z-index:1000; left:0; width:100%; height:100%; backgroundColor:rgba(255,0,0,0.8); color:#FFF;'});
			var nofound = $1.t("div",{style:'position:absolute; margin:0 auto; height:100px; widht:100%; padding:30px 10px;'});
			nofound.appendChild($1.t('h1',{'textNode':'Error 404'}));
			nofound.appendChild($1.t('p',{'textNode':'No se ha encontrado el archivo:'+PARS.fileSimple}));
			var reloaded = $1.t('a',{href:document.location, 'textNode':'Intenta Actualizar o Comunicate con el Supersu.'});
			reloaded.onclick = document.location.reload;
			nofound.appendChild(reloaded);
			var iClose = $1.t('input',{type:'button',value:'Cerrar Ventana',style:'display:block; margin:6px 0;'});
				iClose.onclick = function(){ $1.delet('psAjaxError404'); }
			nofound.appendChild(iClose);
			divnofound.appendChild(nofound);
			document.body.appendChild(divnofound);
		}
		else if(http.status === 500){
			var divnofound = $1.t("div",{'id':'psAjaxError500', style:'position:fixed; top:0; left:0; width:100%; height:100%; backgroundColor:rgba(255,0,0,0.7); color:#FFF;'});
			var nofound = $1.t("div",{style:'position:absolute; margin:0 auto; height:100px; widht:100%; padding:30px 10px;'});
			nofound.appendChild($1.t('h1',{'textNode':'Error 500 (1)'}));
			nofound.appendChild($1.t('p',{'textNode':'Error desde el Servidor en el archivo:'+PARS.file}));
			var reloaded = $1.t('a',{href:document.location, 'textNode':'Intenta Actualizar o Comunicate con el Supersu.'});
			reloaded.onclick = document.location.reload;
			var iClose = $1.t('input',{type:'button',value:'Cerrar Ventana',style:'display:block; margin:6px 0;'});
				iClose.onclick = function(){ $1.delet('psAjaxError500'); }
			nofound.appendChild(iClose);
			nofound.appendChild(reloaded);
			divnofound.appendChild(nofound);
			document.body.appendChild(divnofound);
		}
		}
		http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		var noCache = "alet="+parseInt(Math.random()*999999999999999);
		p_ost = (formParms+"&"+noCache);
		http.send(p_ost);
	}
	$ps_DB.addGet = '';
},
Tab:{
sel:function(CF,wrapSel){
	$ps_DB.get({file:CF.file, inputs:CF.vPost, ApiMethod:CF.ApiMethod,
		func:function(D){
			var OPTS = (D.DATA) ? D.DATA : D;
			var sel = $1.T.select({
			sel:{'class':'jsFiltVars jsFields',name:CF.nameTo}, opts:OPTS});
			wrapSel.appendChild(sel);
		}
	});
}
},
response:function(ev,Jq,noFocus){
	$1.clear(ev);
	var errs = new Array();;
	if(Jq.respChild){ errs = Jq.respChild; }
	else if(Jq.errs){ errs = Jq; delete(Jq.errs); }
	else if(Jq.errNo && !Jq.errNo.errors){ errs[0] = Jq; }
	else if(Jq.errNo){ errs = Jq.errNo; }
	else{ errs[0] = Jq; }
	for(var n in errs){ D = errs[n];
		if(D.errNo == 1 || D.errNo == 4 || D.errNo ==5){ ev.appendChild($1.t('div',{'class':'input_error','textNode':D.text})); }
		else if(D.errNo == 2 || D.errNo == 3){ ev.appendChild($1.t('div',{'class':'input_warning','textNode':D.text})); }
		else { ev.appendChild($1.t('div',{'class':'input_info','textNode':D.text})); }
	}
	if(noFocus){
		var iFocus = $1.t('input',{type:'button'});
		ev.appendChild(iFocus); iFocus.focus(); iFocus.blur(); $1.delet(iFocus);
	}
}
,
Export:{
	tbTab:function(P,tbObj,P2){
		var P = (P) ? P : {};
		var P2 = (P2) ? P2 : {};
		var table2Export = (P.table2Export) ? P.table2Export : 'table2Export';
		var tb = (tbObj) ? tbObj : document.getElementById(table2Export);
		if(!tb){
			$1.Win.message({text:'No se he encontrado la tabla con los datos'}); return 0;
		}
		var docType = (P.docType) ? P.docType : 'xls';
		var tHead = tb.getElementsByTagName('thead')[0];
		var ths = tHead.getElementsByTagName('td');
		var fi = '';
		var data = '{"THS":{';
		var fPos = 0;
		for(var f=0; f<ths.length; f++){
			if(ths[f].classList.contains('expNoCol')){ continue; }
			//fi += '"p_'+f+'":"'+ths[f].innerText+'",';
			fi += '"p_'+f+'":"tdN'+f+'",';
			data += '"tdN'+f+'":"'+ths[f].innerText+'",';
			var colSpan = (ths[f].getAttribute('colspan')*1);
			fPos++;
			if(colSpan>0){
				for(var cl=1; cl<(colSpan); cl++){
					fi += '"p_'+fPos+'":"xx",';
					data += '"xxx'+fPos+'":"x2",';
					fPos++;
				}
			}
		}
		fi = JSON.parse('{'+fi.substring(0,fi.length-1)+'}');
		data = data.substring(0,data.length-1)+'}, "TDS":[';
		var tHead = tb.getElementsByTagName('tbody')[0];
		var TRS = tHead.getElementsByTagName('tr');
		for(var tr=0; tr<TRS.length; tr++){
			var tds = TRS[tr].getElementsByTagName('td');
			if(tds[0].classList.contains('noRow')){ continue; }
			data += '{';
			var is1Line = (tds[0].classList.contains('oneRow')) ? true : false;
			if(is1Line){
					var realText = (tds[0].firstChild.D && tds[0].firstChild.D.realText) ? tds[0].firstChild.D.realText : tds[0].firstChild.innerText;
				data += '"'+fi['p_0']+'":"'+realText+'",';
				for(var f=1; f<ths.length-1; f++){
					data += '"'+fi['p_'+f]+'":"",';
				}
			}
			else{
				var fPos = 0;
				for(var f=0; f<tds.length; f++){
						var realText = (tds[f].D && tds[f].D.realText) ? tds[f].D.realText : tds[f].innerText;
					if(tds[f].classList.contains('expNoCol')){ continue; }
					var tText = (realText).replace(/(\\<br\/?\>|\n|\t)/gi,'');
					var colSpan = (tds[f].getAttribute('colspan')*1);
					data += '"'+fi['p_'+f]+'":"'+tText+'",';
					fPos++;
					if(colSpan>0){
						for(var cl=1; cl<(colSpan); cl++){
							data += '"'+fi['p_'+fPos]+'":"",';
							fPos++;
						}
					}
				}
			}
			data = data.substring(0,data.length-1)+'},';
		}
		data = data.substring(0,data.length-1)+']}';
		var form = $1.t('form',{method:'POST','id':'formToExportFile','action':'/s/tools/export/tab'});
		var inps =  $1.t('textarea',{'name':'DATA'});
		inps.value = data;
		form.appendChild($1.t('input',{type:'hidden','name':'fileName',value:P2.fileName}));
		form.appendChild($1.t('input',{type:'hidden','name':'docType',value:docType}));
		form.appendChild(inps);
		document.body.appendChild(form);
		form.submit();
		$1.delet('formToExportFile');
	}
	,
	simple:function(TH,TD,docType){
		var send = '{"THS":{';
		for(var i in TH){
			send += '"th'+i+'":"'+TH[i]+'",';
		}
		send = send.substring(0,send.length-1)+'},';
		send += '"TDS":{';
		for(var i in TD){ send += '"td'+i+'":"'+TD[i]+'",'; }
		send = send.substring(0,send.length-1)+'}';
		var form = $1.t('form',{method:'POST','id':'formToExportFile','action':'/s/tools/export/Simple'});
		var inps =  $1.t('textarea',{'name':'DATA'});
		inps.value = send;
		form.appendChild($1.t('input',{type:'hidden','name':'docType',value:docType}));
		form.appendChild(inps);
		document.body.appendChild(form);
		form.submit();
		$1.delet('formToExportFile');
	}
}

}
$ps_DB.get1=$ps_DB.get;
