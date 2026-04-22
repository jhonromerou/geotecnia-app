<!DOCTYPE html>
<?php
$st2 = 'http://gstatic1.admsistems.com';
$apiURI = 'http://gapi.admsistems.com';
?>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sistema</title>
<script type="text/javascript">
if(localStorage.getItem('ocardtooken')){
	location.href ='/';
}
</script>
<link rel="stylesheet" href="<?php echo $st2; ?>/_css/loginstyle.css">
<script type="text/javascript" src="<?php echo $st2; ?>/_js/$y.js?<?php echo $timeJS; ?>" ></script>
<script type="text/javascript" src="<?php echo $st2; ?>/static/lib/$a.js?<?php echo $timeJS; ?>" ></script>
<script type="text/javascript" src="<?php echo $st2; ?>/static/lib/$Api.js?<?php echo $timeJS; ?>" ></script>
<script type="text/javascript" src="<?php echo $st2; ?>/_js/$Login.js?<?php echo $timeJS; ?>" ></script>
<script type="text/javascript" async="async">
<?php 
$ocardcode='geotecnia';
echo '$y.st2=\''.$st2.'\';'
?>
	$Login.win({cont:document.body,cardLogin:'Y',logoSrc:'<?php echo $st2; ?>/shareImg/logogeotecnia.png'});
	$s.apiURI='<?php echo $apiURI; ?>';
	$s.Headers={ocardcode:'<?php echo $ocardcode; ?>'};
</script>
<link rel="stylesheet" href="<?php echo $st2; ?>/ocl/progtributario.style.css" />

</head>
<body></body>
</html>