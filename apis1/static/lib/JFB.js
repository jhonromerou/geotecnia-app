
var JFB = {apps:0,
	on:false,
	ini:function(P){
		if(firebase.apps.length ==0){ firebase.initializeApp($ys.JFB.Cnf); JFB.on=true; }
		JFB.apps = firebase.apps.length;
	}
};
JFB.auth={
	one:true,
	open:function(P){
		P=(P)?P:{};
		if(!JFB.on){ JFB.ini(); }
		if(JFB.auth.one){ /* login obligatorio 1 vez */
			firebase.auth().signInWithEmailAndPassword($ys.JFB.user, $ys.JFB.pass)
			.then(function(u){ if(P.func){ P.func(u); }
			})
			.catch(function(error){
				$1.Win.message({text:JSON.stringify(error)});
				if(P.func){ P.func({errNo:3,text:JSON.stringify(error)}); }
			});
		}
		else if(firebase.auth().currentUser){
			if(P.func){ P.func(firebase.auth().currentUser); }
		}
		else{
			if(P.func){ P.func(); }
		}
		JFB.auth.one=false;
	},
	updInfo:function(){
		var user=firebase.auth().currentUser;
		user.updateProfile({
			displayName:'Jhon'
		})
	}
}

JFB.Stor={
	iFile:function(iFile,func,Px){
		var Px=(Px)?Px:{};
		JFB.auth.open({});
		this.uid=false;
		this.totalBytes=0;
		this.bytesTransferred=0;
		this.progress=0;
		this.completed=false;
		this.pare=false;
		this.D={
			totalBytes:0,
			L:[]//Archivos
		}
		this.Upds=[]; //cargas completas?
		this.ini=function(){ /* iniciar carga */
			This.totalBytes=0;
			This.bytesTransferred=0;
			This.progress=0;
			This.completed=false;
			This.D={
				totalBytes:0,
				L:[]//Archivos
			}
		}
		This=this; 
		iFile.onchange=function(e){
			This.pare=$1.t('div',{'class':'progresss'},this.parentNode);
			This.Upds=[]; This.ini();
			for(var i=0; i<e.target.files.length; i++){
				This.put(e.target.files[i],i);
			}
		}
		this.put=function(file,i){
			This=this; var una=true;
			var Meta={
				customMetadata:{'fpath':$ys.JFB.fpath}
			};
			var nName=JStor.newName(file.name,Px.fileName);
			var fpath='s/'+$ys.JFB.fpath;//fpnor
			if(Px.path){ fpath += '/'+Px.path.replace(/\/$/,''); } // ck o /ck/ =>ck/
			fpath +='/'+nName; //file.pdf
			var uTask= firebase.storage().ref().child(fpath).put(file,Meta);
			return uTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snap){
				if(una){
					This.totalBytes += snap.totalBytes;
					This.D.totalBytes += snap.totalBytes;
				} una=false; //solo 1 vez
				This.bytesTransferred += snap.bytesTransferred;
				This.Upds[i]='N';
				progress = (snap.bytesTransferred / snap.totalBytes) * 100;
				JStor.progress({i:i,name:file.name,progress:progress},This.pare);
			},
			function error(){},
			function complete(){
				var Td=uTask.snapshot; //contentType,downloadURL
				This.D.L.push({svr:'FB',fileName:file.name,purl:Td.downloadURL,fileSize:JStor.getSize(Td.totalBytes),fileSizeText:JStor.getSizeText(Td.totalBytes),'file':fpath,fileType:JStor.getTypeMe(Td.ref.name)});
				This.Upds[i]='Y';
				This.isCompleted();
			}
			);
		}
		/* Verify if all ups completed */
		this.isCompleted=function(){ This=this;
			completed=true;
			for(var i in This.Upds){
				if(This.Upds[i]!='Y'){ completed=false; break; }
			}
			if(completed){ $1.delet(This.pare);
				if(Px.Data!='N'){ func(This.D.L,This.D.L); } // solo L, sino con mas datos+L
				else{ func(This.D.L,This.D.L); }
				This.ini();
			}
		}
	},
	delete:function(P,func){
		JFB.auth.open();
		var refDel = firebase.storage().refFromURL(P.purl);
		if(refDel){ refDel.delete(); }
		if(func){ func(); }
	}
}

$M.liAdd('firebase',[
{k:'firebase.demo1',t:'Firebase Demo',func:function(){
	$M.Ht.ini({g:function(){
			var wrap=$M.Ht.cont;
			var iFile=$1.t('input',{type:'file',multiple:'multiple'},wrap);
			var msg=$1.t('pre',{textNode:msg},wrap);
			JStor.iFile(iFile,{func:function(TD){
				console.log(TD);
			}});
	}});
}}
]);