/*
options.title= {display:, text, position[top,left,bottom,right]
options.legend={display, position, onClick, onHover, reverse, labels}
*/
$bgColor={
blue:'#3da5ec',purple:'#FF6383',
yellow2:'#ffeb3b',
}
var $myChart={
color:['#059BFF','#22CECE','#FFCD56','#FF9124','#FF3D67','#FFE6AA','#4BC0C0','#FF6384'],
cls:'myChartRow_',
conf:function(P){
	var Da={
		type:P.type,
		data:{
			datasets:[ {data:P.data} ],
		},
		options:{}
	};
	if(P.label){ Da.data.datasets[0].label=P.label; } //tag
	if(P.fill){ Da.data.datasets[0].fill=P.fill; } //tag
	if(P.bgColor){ Da.data.datasets[0].backgroundColor=P.bgColor; }
	if(P.labels){ Da.data.labels=P.labels; }
	if(P.legend){ Da.data.legend=P.legend; }
	if(P.title){ Da.options.title={};
		Da.options.title.display=true;
		Da.options.title.text='???';
		if(typeof(P.title)=='string'){
			Da.options.title.text=P.title;
		}
	}
	if(P.yformat=='$'){
		Da.options.scales={yAxes:[{
		ticks:{callback:function(value,index,values){return  ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
		}}]};
	}
	switch(P.forma){
		case 'semiCircle': 
			Da.options.circumference = Math.PI;
			Da.options.rotation = -Math.PI;
		break;
		case 'circle': 
			Da.options.circumference = 2*Math.PI;
			Da.options.rotation = -Math.PI/2;
		break;
	}
	return Da;
},
labels:function(TC,Lx){
	if(!TC.data.labels){ TC.data.labels=[]; }
	for(var i in Lx){
		if(typeof TC._labels=='function'){
			tval=TC._labels(Lx[i]);
		}
		else{ var tval=Lx[i][TC._labels]; } //docDate, mes
		if(tval){
			TC.data.labels.push(tval);
		}
	}
},
datasets:function(TC,Lx){
	for(var i in Lx){
		for(var i2 in TC._data){
			var tval=Lx[i][TC._data[i2]];
			if(tval && TC.data.datasets[i2]){ //solo si definido
				if(!TC.data.datasets[i2].data){ TC.data.datasets[i2].data=[]; }
				TC.data.datasets[i2].data.push(tval*1);
			} // docTotal, cantidad, etc
		}
	}
},
CHARS:function(cont,CHARS,P2){
	/* 
	data: labels[], borderColor, 
	datasets:[
		data:[
			borderColor, backgroundColor, borderColor, borderWidth,
			backgroundColor:[color,color2] => colores de barras
		]
	]
	*/
	if(!CHARS[0]){ CHARS=[CHARS]; }
	var P2=(P2)?P2:{};
	for(var i0 in CHARS){
		var TC=CHARS[i0];
		if(!TC.options){ TC.options={}; }
		var tWrap=$1.t('div',{style:'maxWidth:600px; maxHeight:450px; border:0.0625rem solid #000; borderRadius:0.25rem; backgroundColor:#FFF; margin:0 0.25rem 0.25rem 0; position:relative; paddingTop:22px'},cont);
		var tTop=$1.t('div',{style:'position:absolute; top:4px; left:0;'},tWrap);
		var canv=$1.t('canvas',0,tWrap);
		if(P2.print!='N'){
			$1.T.btnFa({fa:'fa-print',P:canv,title:'Copiar Grafico al portapapeles',func:function(T){ $1.Win.print(T.P); } },tTop); 
		}
		//if(P2.copy!='N'){ $1.T.btnFa({fa:'fa-clipboard',P:canv,title:'Copiar Grafico al portapapeles',func:function(T){ $1.copyCanv(T.P); } },tTop); }
		if(P2.down!='N'){ $1.T.btnFa({fa:'fa-download',P:canv,title:'Descargar Imagen del Grafico ',func:function(T){ $1.downCanv(T.P,TC._title); } },tTop); }
		if(P2.topTitle!='N'){ $1.t('b',{textNode:' Gráfica'},tTop); }
		//canvas
		var ctx=canv.getContext('2d');
		ctx.fillStyle='#FF0';
		if(TC._labels && P2.Lx){ $myChart.labels(TC,P2.Lx); };
		if(TC._data && P2.Lx){//Ldata['docTotal','quantitys'] cada uno crea data, Lx=Jr.L
			$myChart.datasets(TC,P2.Lx);
		}
		if(!TC.options.scales){ TC.options.scales={}; }
		if(TC._yformat=='$'){
			TC.options.scales.yAxes=[{
			ticks:{callback:function(value,index,values){ return $Str.money(value.toString()); }
			}}];
		}
		if(TC._xformat=='mmm y'){
			TC.options.scales.xAxes=[{
			ticks:{callback:function(value,index,values){ return $2d.txtMonth(value,TC._xformat); ;}
			}}];
		}
		if(TC._xhidden=='Y'){ TC.options.scales.xAxes=[{ticks:{display:false}}]; }
		if(TC.legend=='N'){ TC.options.legend={display:false}; };
		if(TC._title){ TC.options.title={};
			TC.options.title.display=true;
			TC.options.title.text=TC._title;
		}
		new Chart(ctx,TC);
		if(P2.labels=='float%'){ $myChart.labPerc(); }
	}
},
get:function(canv,P,P2){
	var ctx=canv.getContext('2d');
	ctx.fillStyle='#FF0';
	Da=$myChart.conf(P);
	new Chart(ctx,Da);
	var P2=(P2)?P2:{};
	if(P2.labels=='float%'){
		$myChart.labPerc();
	}
},
fromTb:function(o,pare){
	var idw='myChartWin_'+o.k;
	$1.delet(idw);
	var tds=$1.q('.'+$myChart.cls+o.k,pare,'all');//tr->table
	var Dat=[]; var La=[]; var bgC=[];
	var Exs={};
	for(var i=0; i<tds.length; i++){
		var my=tds[i].myChart;
		if(my){
			if(!Exs[my.v]){ Exs[my.v]=0; La.push(my.l);
				if($myChart.color[i]){ bgC.push($myChart.color[i]); }
				else{ bgC.push('#DDD'); }
			}
			Exs[my.v]++;
		}
	}
	for(var i in Exs){ Dat.push(Exs[i]); }
	var canv=$1.t('canvas');
	$myChart.get(canv,{type:'doughnut',forma:'semiCircle',
		title:o.title,
		data:Dat,legend:false,labels:La, bgColor:bgC,
	});
	$1.Win.open(canv,{winId:idw,winSize:'medium',onBody:1});
}
}
$myChart.plugPerc=function(TC){

	if(!TC.plugins){ TC.plugins={}; }
	TC.plugins.datalabels={
		color: '#fff',
		formatter: (value, ctx) => {
			let sum = 0;
			let dataArr = ctx.chart.data.datasets[0].data; //leer datos
			dataArr.map(data => {
					sum += data;
			});
			let percentage = (value*100 / sum).toFixed(2)+"%";
			return percentage;
		}
	}
}
$myChart.labPerc=function(){
Chart.plugins.register({
afterDatasetsDraw: function(chartInstance, easing) {
		// To only draw at the end of animation, check for easing === 1
		var ctx = chartInstance.chart.ctx;
		chartInstance.data.datasets.forEach(function(dataset, i){
				var total=0;
				for(var e in dataset.data){
					var v=dataset.data[e].toString()*1;
					total+=v;
				}
				var meta = chartInstance.getDatasetMeta(i);
				if (!meta.hidden) {
						meta.data.forEach(function(element, index) {
							var dataString = $js.toFixed((dataset.data[index].toString()*1)/total*100);
							if(dataString>0){  /* omitir en 0 */
								// Draw the text in black, with the specified font
								ctx.fillStyle = 'black';
								var fontSize = 12;
								var fontStyle = 'normal';
								var fontFamily = 'Arial';
								ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
								// Just naively convert to string for now
								//var dataString = dataset.data[index].toString();
								// Make sure alignment settings are correct
								ctx.textAlign = 'center';
								ctx.textBaseline = 'middle';
								var padding = 5;
								var position = element.tooltipPosition();
								ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
							}
						});
				}
		});
}
});
}