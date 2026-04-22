$M.liReset();
var _m=$M.read('!');
if(_m=='' || _m=='no.index'){ $M.to('geoCard.proj'); }
$M.sAdd([
{L:[
{folId:'geoProy',MLis:['geoCard.proj']}
]}
]);
$_GeoPrint.copyNC=true;
$M.liAdd('geoCard',[
{_lineText:'Facturación'},
{k:'geoCard.proj',t:'Proyectos',func:function(){
	$M.Ht.ini({fieldset:'Y',f:'geoCard.proj',func_pageAndCont:$_GeoCard.Proj.get });
}},
{k:'geoCard.proj.view',noTitle:'Y',t:'Proyecto', func:function(){
	var btnA=$1.T.btnFa({fa:'faBtnCt fa_doc',textNode:'Nueva Cotización',func:function(){ $M.to('gvtCvt.form'); }});
	$M.Ht.ini({fieldset:'Y',f:function(w){ $_Geo.callEns(w); } });
}},
]);
