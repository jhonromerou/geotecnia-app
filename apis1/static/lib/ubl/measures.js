var Udm={
T:function(k,o){
	var t=k; var m=k;
	if(o && Udm.O[k] && Udm.O[k].t){ t=Udm.O[k].tit; }
	if(Udm.O[k]){ m= Udm.O[k].v; }
	if(o){ return {k:m,t:t} }
	return m;
},O:[
{k:"PR",v:"par",tit:"Par"},
{k:"NPT",v:"und",tit:"Unidad"},
{k:"CMT",v:"cm",tit:"Centimetros"},
{k:"DMT",v:"dcm",tit:"Decimetros"},
{k:"CMK",v:"cm2",tit:"Centrimetro Cuadrado"},
{k:"CS",v:"caja",tit:"Caja"},
{k:"MTR",v:"mt",tit:"Metros"},
{k:"PK",v:"paq",tit:"Paquete"},
{k:"WSD",v:"Serv.",tit:"Servicio"},
{k:"GRM",v:"gr",tit:"Gramos"},
{k:"LBR",v:"lbr",tit:"Libra"},
{k:"KGM",v:"kg",tit:"Kilogramos"},
{k:"GLI",v:"galon",tit:"Galón"},
{k:"KT",v:"kit",tit:"Kit"},
{k:"BG",v:"bolsa",tit:"Bolsa"},
{k:"RO",v:"rollo",tit:"Rollo"},
{k:"BO",v:"botella",tit:"Botella"},
{k:"CMQ",v:"cm3",tit:"Centimetro Cubico"},
{k:"D97",v:"pallet",tit:"Pallet"},
{k:"DAY",v:"dia",tit:"Día"},
{k:"HUR",v:"hora",tit:"Hora"},
{k:"MIN",v:"min.",tit:"Mínuto"},
{k:"DMQ",v:"dcm3",tit:"Decimetro Cúbico"},
{k:"KTM",v:"km",tit:"Kilometros"},
{k:"MGM",v:"mlg",tit:"Miligramos"},
{k:"MMT",v:"mmt",tit:"Milimetros"},
{k:"MTQ",v:"mt3",tit:"Metro Cúbico"},
{k:"NAR",v:"nar",tit:"Número de Artículos"},
{k:"TY",v:"Bidon",tit:"Bidon"},
{k:"DZN",v:"docena",tit:"Docena"},
	/*Extends not ubl */
{k:'OTH',v:'Otro',title:'Otro'}
],
O1:{
	PR:{k:"PR",v:"par",tit:"Par"},
	NPT:{k:"NPT",v:"und",tit:"Unidad"},
	CMT:{k:"CMT",v:"cm",tit:"Centimetros"},
	DMT:{k:"DMT",v:"dcm",tit:"Decimetros"},
	CMK:{k:"CMK",v:"cm2",tit:"Centrimetro Cuadrado"},
	CS:{k:"CS",v:"caja",tit:"Caja"},
	MTR:{k:"MTR",v:"mt",tit:"Metros"},
	PK:{k:"PK",v:"paq",tit:"Paquete"},
	WSD:{k:"WSD",v:"Serv.",tit:"Servicio"},
	GRM:{k:"GRM",v:"gr",tit:"Gramos"},
	LBR:{k:"LBR",v:"lbr",tit:"Libra"},
	KGM:{k:"KGM",v:"kg",tit:"Kilogramos"},
	GLI:{k:"GLI",v:"galon",tit:"Galón"},
	KT:{k:"KT",v:"kit",tit:"Kit"},
	BG:{k:"BG",v:"bolsa",tit:"Bolsa"},
	RO:{k:"RO",v:"rollo",tit:"Rollo"},
	BO:{k:"BO",v:"botella",tit:"Botella"},
	CMQ:{k:"CMQ",v:"cm3",tit:"Centimetro Cubico"},
	D97:{k:"D97",v:"pallet",tit:"Pallet"},
	DAY:{k:"DAY",v:"dia",tit:"Día"},
	HUR:{k:"HUR",v:"hora",tit:"Hora"},
	DMQ:{k:"DMQ",v:"dcm3",tit:"Decimetro Cúbico"},
	KTM:{k:"KTM",v:"km",tit:"Kilometros"},
	MGM:{k:"MGM",v:"mlg",tit:"Miligramos"},
	MMT:{k:"MMT",v:"mmt",tit:"Milimetros"},
	MTQ:{k:"MTQ",v:"mt3",tit:"Metro Cúbico"},
	NAR:{k:"NAR",v:"nar",tit:"Número de Artículos"},
	TY:{k:"TY",v:"Bidon",tit:"Bidon"},
	DZN:{k:"DZN",v:"docena",tit:"Docena"},
	/*Extends not ubl */
	OTH:{k:'OTH',v:'Otro',title:'Otro'}
}
}
$V.Udm=Udm.O;