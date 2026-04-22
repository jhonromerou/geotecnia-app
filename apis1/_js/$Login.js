
$Login = {
	set:function(T){
		let user = document.getElementById('user_id');
		let lastValue = user.value;
		let values = lastValue.split('@');
		user.value = values[0];
		var vPost = $1.G.inputs($1.q('.login'));
		var resp = $1.q('#resp');
		user.value = lastValue
		$Api.post({f:'/xs_login', loade:resp,inputs:vPost, btnDisabled:T, func:function(Jq){
				$Api.resp(resp,Jq);
				if(!Jq.errNo){
					if(!Jq.domainUrl){ Jq.domainUrl='/'; }
					{//acceso directo o por sociedad
						if(Jq.FB && Jq.FB.user!=null && typeof(JFB)!=null){
							JFB.auth({});
						}
						if(!Jq.localStor && T.P.cardLogin=='Y'){
							T.innerText='Iniciar Sesión';
						}
						else{
							if(Jq.localStor){
								for(var k in Jq.localStor){ $1.Sys.stor({set:'Y',k:k,v:Jq.localStor[k]}); }
							}
							location.href = Jq.domainUrl;
						}
					}
				}
			}
		});
	},
}
$Login.intL=false;
$Login.win=function(P){
	if(document.body){
		clearInterval($Login.intL);
		var P=(P)?P:{}; var jsF='jsFields';
		var cont=(P.cont)?P.cont:document.body;
		var sec=$1.t('section',{'class':'container'},cont);
		var form=$1.t('div',{'class':'login'},sec);
		var lT={h1:'Bienvenido',btnTxt:'Iniciar Sesión'};
		var ph1='Usuario';
		var ph2='Contraseña';
		if(P.cardLogin){
			lT.h1='Acceso Clientes';
			lT.btnTxt='Generar Clave de Inicio';
			ph1='NIT'; ph2='Clave Dinámica';
		}
		$1.t('h1',{textNode:lT.h1},form);
		if(P.logoSrc){
		$1.t('img',{src:P.logoSrc,title:'Logo Personalizado para Inicio de Sesión a sistema ModulApps',alt:'Logo personalizado para inicio de sesión a sistema ModulApps',style:'width:100%'},form);
		}
		var p=$1.t('p',0,form);
		let userInput = $1.t('input',{type:'text',name:'user',id:'user_id', 'class':jsF,placeholder:ph1},p);
		let firstCardCode = $s.Headers.ocardcode;
		console.log('headers:' + $s.Headers)
		userInput.addEventListener('keyup', (evt) => {
			let value = evt.target.value;
			let values = value.split('@');
			if (values[1]) {
				$s.Headers={ocardcode:values[1]};
			} else {
				$s.Headers={ocardcode:firstCardCode};
			}
			console.log($s.Headers)

		});
		
		var p=$1.t('p',0,form);
		var pwd=$1.t('input',{type:'password',name:'pass','class':jsF,placeholder:ph2},p);
		if(P.cardLogin){
				$1.t('input',{type:'hidden',name:'cardLogin','class':jsF,value:'Y'},p);
		}
		if(P.Fie){
			for(var k in P.Fie){
				$1.t('input',{type:'hidden',name:k,'class':jsF,value:P.Fie[k]},form);
			}
		}
		$1.t('p',{id:'resp'},form);
		$1.T.btnSend({textNode:lT.btnTxt,P:P,func:$Login.set},form);
		var bot=$1.t('div',{'class':'login-help'},sec);
		var p=$1.t('p',0,bot);
		var logText=(P.bottomText)?P.bottomText:'Login from admsistems.com | Developed By ADM Sistems';
		$1.t('a',{textNode:logText},p);
	}
	else{
		$Login.intL=setInterval(function(){ $Login.win(P); },300);
	}
}