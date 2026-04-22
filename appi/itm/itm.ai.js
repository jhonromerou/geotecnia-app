
$M.kauAssg('itm',[
{k:'itmAi',t:'Articulos Internos'}, {k:'ivtStockAi',t:'Inventario Art. Internos'}
]);
$M.liAdd('itm',[
{_lineText:'Articulos Internos'},
{k:'itm.ai',t:'Articulos Internos', kau:'itmAi',ini:{btnGo:'itm.ai.form',f:'itmPget',gyp:Itm.get}},
{k:'itm.ai.form',t:'Articulo Interno (form)', kau:'itmAi',ini:{g:Itm.form}},
{k:'ivtStock.ai',t:'Stock',d:'Stock de articulos internos',kau:'ivtStockAi',ini:{f:function(wf){ _Fi['ivtStock'](wf,'AI'); }, gyp:()=>{ Ivt.Stock.get(); }}},
{k:'ivtStock.ai.history',t:'Histórico',d:'Histórico de movimiento de articulos internos', kau:'ivtStockAi',ini:{f:function(wf){ _Fi['ivtStock.history'](wf,'AI'); }, gyp:()=>{} }}
],{prp:{mdlActive:'itmAi'}});
