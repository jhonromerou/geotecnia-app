

var JFVal={
K:{},//por ejemplo itm.p, itm.mp, gvtInv, etc
err:function(t){ return JFVal.errText=t; },
errText:false,
verif:function(kx,contSea){
	JFVal.errText=false;
	if(JFVal.K[kx]){
		var VR=JFVal.K[kx].req.split(',');
		for(var i in VR){ k=VR[i]; //itemCode
			var L=(JFVal.K[kx].F[k])?JFVal.K[kx].F[k]:false;
			var t=$1.q('._JFVal-'+k,contSea);
			if(t && L){
				var val=t.value;
				if(L.req=='Y' && val==''){ JFVal.err(L.fN+' debe estar definido'); break; }
				else if(L.minLen && val.length <L.minLen){ JFVal.err(L.fN+' no puede tener menos de '+L.minLen+' caracteres'); break; }
				else if(!(val>=L.rang[0] && val<=L.rang[1])){ JFVal.err(L.fN+' debe ser un número entre '+L.rang[0]+' y '+L.rang[1]); break; }
				else if(L.maxLen && val.length >L.maxLen){ JFVal.err(L.fN+' no puede ser tener más '+L.minLen+' caracteres'); break; }
			}
		}
	}
}
}

JFVal.K['itm']={
req:'itemCode,itemName,price',//campos a verificar
F:{
itemName:{k:'itemName', req:'Y', fN:'Nombre',
	minLen:1,
	maxLen:10,
	matchh:{v:'[a-z0-9]',t:'Nombre debe contener solo numeros o letras'}
},
qualify:{k:'calificacion',fN:'Calificación',
	rang:[0,10]
}
}};