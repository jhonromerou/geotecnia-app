/* Activo Fijo */
$V.itmType.push({k:'AF',v:'Activo Fijo'});
_Fi['itmAf']=function(wrap){
	var jsV = 'jsFiltVars';
	var divL=$1.T.divL({divLine:1, wxn:'wrapx8', L:'Código',I:{tag:'input',type:'text','class':jsV,name:'I.itemCode(E_like3)'}},wrap);
	$1.T.divL({wxn:'wrapx6', L:'Nombre',I:{tag:'input',type:'text','class':jsV,name:'I.itemName(E_like3)',placeholder:'Nombre...'}},divL);
	$1.T.divL({wxn:'wrapx8', L:'Grupo',I:{tag:'select','class':jsV,name:'I.itemGr',opts:$JsV.itmGr,kIf:{prp1:'AF'}}},divL);
	$1.T.btnSend({textNode:'Actualizar Listado',func:()=>{ Itm.Af.get(); }},wrap);
};

$M.kauAssg('itm',[
{k:'itmAf',t:'Activos Fijos'}
]);
Itm.Af={
	Lg:function(L,men){
		var Li=[];;
		Li= $Opts.add('itmAf',Li,L);
		if(men){
			$1.T.btnFa({faBtn:'fa-pencil',title:'Modificar',P:L,func:function(T){ $M.to('itmAf.form','itemId:'+T.P.itemId); } },men);
			if(Li.length>0){ Li={Li:Li,PB:L};
			return $1.Menu.winLiRel(Li,men); }
		}
		return Li;
	},
	get:function(){
		cont =$M.Ht.cont;
		var vPost=$1.G.filter();
		$Api.get({f:Api.Itm.pr+'af', inputs:vPost,errWrap:cont, loade:cont,
		func:function(Jr){
			var tdf=['','Código','Nombre','Grupo','Activo'];
			{
				var tb = $1.T.table(tdf,0,cont);
				var tBody = $1.t('tbody',0,tb);
				for(var i in Jr.L){ L=Jr.L[i];
					var tr = $1.t('tr',0,tBody);
					var td = $1.t('td',0,tr);
					Itm.Af.Lg(L,td);
					$1.t('td',{textNode:L.itemCode},tr);
					$1.t('td',{textNode:L.itemName},tr);
					$1.t('td',{textNode:_g(L.itemGr,$JsV.itmGr)},tr);
					$1.t('td',{textNode:_g(L.webStatus,$V.active)},tr);
				};
			}
		}});
	},
	form:function(cont,Jr,P){
		jsF=$Api.JS.cls; var Pa=$M.read();
		$Api.get({f:Api.Itm.pr+'af/form',loadVerif:!Pa.itemId,loade:cont,inputs:'itemId='+Pa.itemId,func:function(Jr){
			var vid=$Api.JS.addF({name:'itemId',value:Jr.itemId},cont);
			var divL=$1.T.divL({divLine:1, wxn:'wrapx10',req:'Y',L:'Código',I:{lTag:'input','class':jsF+' _itemCode',name:'itemCode',value:Jr.itemCode}},cont);
			$1.T.divL({wxn:'wrapx3',req:'Y',L:'Nombre',I:{lTag:'input','class':jsF,name:'itemName',value:Jr.itemName}},divL);
			$1.T.divL({wxn:'wrapx8',req:'Y',L:'Grupo',aGo:'jsv.itmGr',I:{lTag:'select','class':jsF,name:'itemGr',opts:$JsV.itmGr,kIf:{prp1:'AF'},selected:Jr.itemGr}},divL);
			$1.T.divL({wxn:'wrapx10',req:'Y',L:'Estado',I:{lTag:'select','class':jsF,name:'webStatus',opts:{active:'Activo',inactive:'Inactivo'},selected:Jr.webStatus,noBlank:1}},divL);
			var div=$1.t('div',{style:'padding:0.5rem 0;',textNode:'Artículo de: '},cont);
			$1.T.ckLabel({t:'Compra',I:{'class':jsF,name:'buyItem',checked:(Jr.buyItem=='Y')}},div);
			$1.T.ckLabel({t:'Venta',I:{'class':jsF,name:'sellItem',checked:(Jr.sellItem=='Y')}},div);
			Pm=[
			{textNode:'General',winClass:'general',active:'Y'},
			];
			var Wins = $1M.tabs(Pm,cont,{});
			var wGen=[
				{t:'Grupo Contable',node:$1.T.sel({'class':jsF,name:'accgrId',opts:$Tb.oiac,selected:Jr.accgrId}),aGo:'gfiItmGr'},
				{t:'Descripción',node:$1.t('textarea',{'class':jsF,name:'description',style:'width:100%;',textNode:Jr.description,maxlength:200,style:'minWidth:400px'})},
				{t:'ID Adicional',node:$1.t('input',{type:'text','class':jsF,name:'idAdd',value:Jr.idAdd})}
			];
			$1.Tb.trsI(wGen,Wins.general);
			var resp=$1.t('div',0,cont);
			$Api.send({PUT:Api.Itm.pr+'af', jsBody:cont, loade:resp, func:function(Jr2){
			if(!Jr2.errNo){ vid.value=Jr2.itemId; }
			$Api.resp(resp,Jr2);
		}},cont);
		}});
	}
}

$M.liAdd('itm',[
	{_lineText:'Activos Fijos'},
	{k:'itmAf',t:'Activos Fijos', kau:'itmAf',ini:{btnGo:'itmAf.form',f:'itmAf',gyp:Itm.Af.get }},
	{k:'itmAf.form',t:'Activo Fijo (form)', kau:'itmAf',ini:{g:Itm.Af.form}}
],{prp:{mdlActive:'itmAf'}});
	
