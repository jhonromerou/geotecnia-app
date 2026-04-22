$y.timeJS= '?2019-01-30--9-43';
document.title = 'Geo';
$y.css(['fa']);
$y.load([
{req:'Y',type:'sys',sys:'0s2'},
{type:'lib', src:'ubl/measures'},
{type:'lib', src:'dian/mmag'},
{type:'xls'},
],function(){
	$s.iniApp(
	{sys0s:false,storage:'L',apiURI:$y.apiURI},
	{bottomInfo:'Y',func:function(){
		$jSoc.ocvt_cntData='Y';
		$M.onload();
	}});
},{a:1});
