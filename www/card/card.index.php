<html>
<head>
<?php
$st2 = 'http://static1.admsistems.com';
$apiURI = 'http://api0.admsistems.com';

$timeJS = ($_GET['getFileTemps'])?$_GET['getFileTemps']:'2019-08-28--13-56';
$timeCSS = '&cssUpd=2019-06';
?>
<meta charset="utf-8" />
<title>SGA</title>
<script type="text/javascript" src="<?php echo $st2; ?>/_js/$loginout.js?timeJS=<?php echo $timeJS; ?>" ></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="<?php echo $st2; ?>/_css/reset.css" />
<link rel="stylesheet" href="<?php echo $st2; ?>/_css/01sys.css?<?php echo $timeCSS; ?>" />
<link rel="stylesheet" href="<?php echo $st2; ?>/_css/adms_icon.css" />
<link rel="stylesheet" href="<?php echo $st2; ?>/_css/x_geo.css" />
<script type="text/javascript" src="<?php echo $st2; ?>/_js/$y.js?timeJS=<?php echo $timeJS; ?>" ></script>
<script type="text/javascript" >
<?php
echo '
$y.apiURI=\''.$apiURI.'\';
$y.st2 =\''.$st2.'\';
';
?>
</script>
<script type="text/javascript" async="async">
$y.timeJS= '?2019-01-30--9-43';
document.title = 'SGA';
$y.css(['fa']);
$y.load([
{req:'Y',type:'sys',sys:'0s2.card'},
{type:'xls'},
],function(){
	$s.iniApp(
	{sys0s:false,storage:'L',apiURI:$y.apiURI},
	{bottomInfo:'Y',func:function(){
		$jSoc.ocvt_cntData='Y';
		$M.onload();
	}});
},{a:1});
</script>
</head>
<body>
<div id="wbo_header" class="no-print">
	<div id="__menuList"></div>
	<div id="__menuAddit" style="display:inline-block;"></div>
</div>
<div id="bodyAjax">
<div id="adms_dinamycWrap"></div>
</div>
<div id="_wrapBottomSocInfo" class="no-print" style="position:fixed; bottom:0; left:0; width:calc(100% - 0.5rem); padding:0.25rem; background-color:#EEE; font-size:0.65rem !important;"><div name="dbSoc"></div>
</div>
</body>
</html>