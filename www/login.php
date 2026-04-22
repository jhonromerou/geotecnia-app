<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sistema de Pruebas</title>
<script type="text/javascript">
if(localStorage.getItem('ocardtooken')){
	location.href ='/';
}
</script>
<link rel="stylesheet" href="public/_css/loginstyle.css">
<script type="text/javascript" src="public/static/lib/$y.js" ></script>
<script type="text/javascript" src="public/static/lib/$a.js" ></script>
<script type="text/javascript" src="public/static/lib/$Api.js" ></script>
<script type="text/javascript" src="public/_js/$Login.js" ></script>
<script type="text/javascript" async="async">
$y.st2 = 'http://static.geotecniaingenieria.co'
$y.apiURI = 'http:///h-api.geotecniaingenieria.co'
//st2:'https://gstatic1.admsistems.com',
    //sapi:'https://stapi1.admsistems.com/',
$Login.win({cont:document.body,logoSrc:'http://static1.admsistems.com/shareImg/logogeotecnia.png'});
$s.Headers={ocardcode:'geotecnia'};
</script>

</head>
<body></body>
</html>
