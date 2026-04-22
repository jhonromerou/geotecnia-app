var JStor={
	getExt:function(fName){
		var sep=fName.split('.');
		if(sep[1]){ return sep[sep.length-1]; }
		return '';
	},
	newName:function(fName,newName){
		var ext=JStor.getExt(fName);
		if(newName){ return newName+'.'+ext; } //siempre logodcp.
		return $js.genCode(8,4)+'.'+ext;
	},
	getTypeMe:function(fName,ext){
		if(!ext){ ext=JStor.getExt(fName); }
		var fileType='';
		if(ext.match(/(png|jpeg|jpg|gif|jfif)/is)){ fileType = 'img'; }
		else if(ext.match(/(doc|docx)/is)){ fileType = 'doc';}
		else if(ext.match(/(pdf)/is)){ fileType = 'pdf';}
		else if(ext.match(/(xls|xlsx)/is)){ fileType = 'xls'; }
		else if(ext.match(/(csv)/is)){ fileType = 'csv'; }
		else if(ext.match(/(tsv)/is)){ fileType = 'tsv'; }
		else if(ext.match(/(txt|rtf)/is)){ fileType = 'txt';}
		else if(ext.match(/(html|htmlx)/is)){ fileType = 'html';}
		else if(ext.match(/(avi|mpeg|mp4)/is)){ fileType = 'video';}
		else if(ext.match(/(mp3|wav|ra|au|aiff)/is)){ fileType = 'audio';}
		else { fileType = ext; }
		return fileType;
	},
	iFile:function(iFile,Px){
		// new JStor();
		if(!Px){ Px={}; }
		if($ys.storage=='FB'){
			var nFi=new JFB.Stor.iFile(iFile,Px.func,Px);
			return false;
		}
		This=this;
		iFile.onchange=function(e){ This.put(e.target,Px,this.parentNode); }
		this.bucket=(Px.bucket)?Px.bucket:$ys.storBucket;
		//if(c.V.storBucket){ this.bucket=c.V.storBucket; }
		this.name=(Px.name)?Px.name:'file';
		this.path=(Px.path)?Px.path:'/';
		this.fileName=Px.fileName; //usar siempre este nombre
		this.Heads=Px.Heads;
		this.ref=function(path){
			if(path){ this.path=path; }
			return this;
		},
		this.child=function(path){
			if(path){ this.path=this.path+'/'+path; }
			return this;
		}
		this.put=function(iFile,P,wResp){
			var This=this;
			var formData = new FormData();
			for(var f=0; f<iFile.files.length; f++){
				var file = iFile.files[f];
				var fName=(P.fileNum)?This.name:This.name+'['+f+']';
				formData.append(fName, file, file.name);
			}
			formData.append('filePath',This.path);
			if(This.fileName){ formData.append('fileName',This.fileName); }
			if(P.AJs){ for(var k in P.AJs){ formData.append(k,P.AJs[k]); } }
			if(window.XMLHttpRequest){ var xhr = new XMLHttpRequest();}
			else if(window.ActiveXObject){ var xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
			if(P.fView){
				let reader = new FileReader();
				reader.readAsDataURL(iFile.files[0]);
				reader.onload = function(){ P.fView(reader); }
			}
			/* Procesar */
			xhr.open('POST',This.bucket, true);
			for(var k in This.Heads){
				xhr.setRequestHeader(k,This.Heads[k]);
			}
			xhr.setRequestHeader('ocardcode',$0s.ocardcode);
			if($0s.stor('ocardtooken')){ xhr.setRequestHeader('ocardtooken',$0s.stor('ocardtooken')); }
			var abt = $1.t('button',{'class':'iBg iBg_closeSmall',title:'Cancelar Operación'},wResp);
			abt.onclick = function(){ xhr.abort(); }
			var progress = $1.t('progress',{value:0,max:100,style:'width:90%; background-color:#0F0;'},wResp);
			xhr.upload.addEventListener("progress", function(e){
				progress.value = ((e.loaded/e.total)*100);
			}, false);
			xhr.onload = function(ev){
				if(xhr.status == 200){
					$1.delet(progress);
					var Jq = JSON.parse(xhr.responseText);
					if(Jq.errNo || Jq.errs){ $1.Win.message(Jq); }
					else{
						if(P.func){ P.func(Jq,iFile); }
					}
				}
				else{ if(!Jq){ Jq={}; }
					$1.Win.message(Jq);
				}
			};
			xhr.send(formData);
			this.value = '';
		}
		this.del=function(filePath,P){
			JStor.del(filePath,P);
		}
	},
	delete:function(P,func){
		var P=(P)?P:{};
		if(P.confirm!='N'){
			$1.Win.confirm({text:'Se va eliminar el archivo, no se podrá recuperar esta información (3)', func:funcDel});
		}else{ funcDel(); }
		function funcDel(){
			if(!P.svr){ 
				if((P.purl+'').match(/firebasestorage/)){ P.svr='FB'; }
			}
			if(P.svr=='FB'){ JFB.Stor.delete(P,func); }
			else{
				try{
					$Api.delete({furl:P.purl, inputs:'DELETE=Y',headers:{ocardcode:$0s.ocardcode},func:function(Jr){
						if(Jr.errNo && P.winErr!='N'){ $1.Win.message(Jr); }
						if(!Jr.errNo && func){ func(Jr); }
					}});
				}catch (e){ $1.Win.message({errNo:3,text:'Error eliminando archivo: '+e.message}); }
			}
		}
	},
	getSize:function(bytes,mb){
		mb=(mb)?mb:'Mb';
		bytes=(bytes==0)?16:bytes;
		switch(mb){
			case 'Gb': b = $js.toFixed(bytes/1073741824,3); break;
			case 'Mb': b = $js.toFixed(bytes/1048576,3); break;
			case 'Kb': b = $js.toFixed(bytes/1024,2); break;
			default: b = $js.toFixed(bytes/1048576,2); break;
		}
		return b;
	},
	getSizeText:function(numBytes){
		numBytes=(numBytes==0)?16:numBytes;
		if (numBytes >= 1073741824){ numBytes = $js.toFixed(numBytes / 1073741824,2) + ' Gb'; }
		else if (numBytes >= 1048576){ numBytes = $js.toFixed(numBytes / 1048576,2) + ' Mb'; }
		else if (numBytes >= 1024){ numBytes = $js.toFixed(numBytes / 1024,2) + ' Kb'; }
		else if (numBytes > 1){ numBytes = numBytes + ' Bytes'; }
		else if (numBytes == 1){ numBytes = numBytes+ ' Byte'; }
		else{ numBytes = '0 Bytes'; }
		return numBytes;
	},
	progress:function(Task,wrap){
		var cls='JStorProgress_'+Task.i;
		var tag=$1.q('.'+cls,wrap);
		if(tag){
			tag.style.width=Task.progress+'%';
		}
		else{
			tag=$1.t('div',{'class':'JStorProgressWrap'},wrap);
			var wid=$1.t('div',{style:'border:1px solid #000; width:100%; position:relative; height:16px;',textNode:'.'},tag);
			$1.t('div',{style:'position:absolute; top:0; height:100%; background-color:#0F0; width:0','class':cls},wid);
			$1.t('div',{style:'position:absolute; top:0;',textNode:Task.name},wid);
		}
	},
	
	maxSize:function(tFile){
		var total=0;
		if($ys.fileMaxSize>0){
			for(var i=0; i<tFile.length; i++){
				var fileSize= Math.round(tFile[i].size/1024/1024).toFixed(2);
				if($ys.fileMaxSize<fileSize){ return {errNo:3,text:'El archivo supera el tamaño máximo por archivo a subir de '+$ys.fileMaxSize+'Mb. ('+fileSize+')'}; }
			}
		}
		return false;
	},
	/* vista previa y definir en campo */
	imgInput:function(P,pare){
		var This=this;
		var cont=$1.t('div',{style:'display:inline-block; border:0.0625rem solid #000; border-radius:0.25rem; padding:0.15rem;'});
		if(P.ttile){
			$1.t('b',{textNode:P.ttile,style:'display:block; padding:0.15rem; font-size:0.85rem;'},cont);
		}
		var imgw=$1.t('div',{style:' width:10rem; height:10rem; display:table-cell; verticalAlign:middle; cursor:pointer;'},cont);
		var jsF=(P.jsF)?P.jsF:'jsFields';
		var name=(P.name)?P.name:'-imgUpdNullName';
		var src1=P.value;
		var textNode=(P.textNode)?P.textNode:'Definir';
		var tI={type:'hidden','class':jsF,name:name,value:src1};
		if(P.I){ for(var z in P.I){ tI[z]=P.I[z]; } }
		var inpSrc=$1.t('input',tI,cont);
		var iFile = $1.t('input',{type:'file',name:name,style:'display:none'},cont);
		imgw.onclick=function(){ iFile.click(); }
		This.onchange(iFile,{func:function(Jq){
			inpSrc.value=Jq[0].purl;
			img.src=Jq[0].purl;
		}});
		$1.T.btnFa({fa:'fa-trash',title:'Eliminar',func:function(){
			This.del(inpSrc.value,{fOk:function(){
				inpSrc.value=''; img.src='';
			}});
		}},cont);
		var img = $1.t('img',{src:src1,style:'display:block; height:100%; widht:100%;'},imgw);
		if(pare){ pare.appendChild(cont); }
		return cont;
	}
}
