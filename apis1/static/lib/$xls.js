/* align:"L T" o "R B"*/
var $Xls={
spaces:false,/* define:~ to replace \u0020 */
extDef:false,
trNo:'__xls_trNoExport', tdNo:'__xls_tdNoExport',
rowFormat:function(L,P){
	P.xls={t:L.t}
	if(P._d){
		P.xls.style={format:'dd-mm-yyyy'};
	}
	return P; //textNode, etc
},
down:function(P){
	$1.delet('#xlsDownloadFile');
	var mimeType=(P.ext=='txt')?'text/tab-separated-values':'text/plain';
	var ext=(P.ext)?P.ext:'xls';
	var chars='utf-8';
	var tFile=new Blob(P.data,{type:mimeType+';charset='+chars,encoding:chars});
	var dLink = $1.t('a',{id:'xlsDownloadFile',style:'display:none;'},document.body);
	dLink.download = (P.fileName)?P.fileName+'.'+ext:'exportData';
	dLink.href = window.URL.createObjectURL(tFile);
	dLink.click();
},
get:function(P){
	if($Xls_extDef){ P.ext=$Xls_extDef; }
	if(P.xls_spaces){ $Xls_spaces=P.xls_spaces;}
	switch(P.ext){
		case 'xlsx': $Xls.xlsx(P); break;
		case 'tab': $Xls.txt(P); break;
		default: $Xls.txt(P); break;
	}
},
xlsx:function(P){
	var excel = $JExcel.new("Calibri light 10 #333333");
//excel.set(hoja,columna-td,fila-tr,celda,styleValue)
//excel.set({sheet:sheetValue,column:columnValue,row:rowValue,value:cellValue,style:styleValue })
	excel.set({sheet:0,value:"Hoja 1" } );
	//excel.addSheet("Sheet 2");
	for(var i in P.TH){ excel.set(0,i,0,P.TH[i],'auto'); }
	var tr=0;
	var D=$Xls.readTb(P.tb);
	for(var i in D.B){
		var td=0;
		for(var k in D.B[i]){ var TD=D.B[i][k];
			if(TD.style){//xls:{style
				/* border:none,none,none,this #333333
					font:"calibri 12 #000000 B",
					align:"R", "L T", "C C", "R B"
					format:"yyyy.mm.dd hh:mm:ss" "#.###.00"
			 */
				var sty=excel.addStyle(TD.style);
				excel.set(0,td,tr,TD.t,sty);
			}
			else{ excel.set(0,td,tr,TD.t,'auto'); }//estaba sin else
			td++;
		}
		tr++;
	}
	excel.generate(((P.fileName)?P.fileName:'exportData')+'.xlsx')
},
txt:function(P){
	var D=$Xls.readTb(P.tb);
	var txt=[]; var n=0;
	for(var i in D.B){
		txt[i]='';
		for(var k in D.B[i]){ var TD=D.B[i][k];
			var text=TD.t; text=text.replace(/\t/,'');
			txt[i]+=text+"\t";
		}
		txt[i]+="\r\n";
		//if(n==0 && $0s.userId==1){ alert(txt[i]); $1.Win.message({text:txt[i]}); }
		n++;
	}
	P.data=txt;
	$Xls.down(P);
},
readTb:function(tb){
	var tr=$1.q('tr',tb,'all'); var P={H:[],B:[]};
	var n1=n2=0; var nNo={}; //omitir estos
	for(var i=0; i<tr.length; i++){
		if(tr[i].classList && tr[i].classList.contains($Xls.trNo)){ continue;}
		P.B[n1]=[];
		var td=$1.q('th, td',tr[i],'all');
		var n2=0;
		for(var i2=0; i2<td.length; i2++){
			if(td[i2].classList && td[i2].classList.contains($Xls.tdNo)){ nNo[i2]='O'; }
			if(nNo[i2]){ continue; }
			var el=td[i2]; var x=(el.xls)?el.xls:{};
			var t=(x.t)?x.t:el.innerText;
			if($Xls_spaces){ t=t.replace($Xls_spaces,'\u0020'); console.log(t); }
			var style=(x.style)?x.style:null;
			P.B[n1][n2]={t:t,style:style};
			n2++;
		}
		n1++;
	}
	$Xls_spaces=false;
	return P;
},
plain:function(tb,filename=''){
	var downloadLink;
	var dataType = 'application/vnd.ms-excel';
	var tableSelect = tb;
	var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
	filename = filename?filename+'.xls':'excel_data.xls';
	downloadLink = document.createElement("a");
	document.body.appendChild(downloadLink);
	if(navigator.msSaveOrOpenBlob){
					var blob = new Blob(['ufeff', tableHTML], {
									type: dataType
					});
					navigator.msSaveOrOpenBlob( blob, filename);
	}else{
					// Create a link to the file
					downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

					// Setting the file name
					downloadLink.download = filename;

					//triggering the function
					downloadLink.click();
	}
}
};
$Xls.Cls={
trs:'__xls_trs',tds:'__xls_tds'
};
$Xls.downFrom=function(wrap,P){ P=(P)?P:{};
	var fiel = $1.t('fieldset',P.fieldset);
	var leg = $1.t('legend',0,fiel);
	if(P.L){ $1.t('span',{textNode:' '+P.L},leg); }
	delete(P.fieldset); delete(P.L);
	var xls = $1.t('button',{'class':'btn iBg_icoxls'});
	xls.onclick = function(){ $Xls.fromWrap(P,wrap.parentNode); }
	leg.appendChild(xls);
	fiel.appendChild(wrap);
	return fiel;
}
$Xls.fromWrap=function(P,pare){
	var trs=$1.q('.'+$Xls.Cls.trs,pare,'all');
	var tb=$1.T.table(P.Tb);
	var tBody=$1.t('tbody',0,tb);
	for(var i=0; i<trs.length; i++){
		var tds=$1.q('.'+$Xls.Cls.tds,trs[i],'all');
		var tr=$1.t('tr',{},tBody);
		for(var i2=0; i2<tds.length; i2++){
		var tXls={};
		if(tds[i2].xls){ tXls=tds[i2].xls; }
		if(tXls.textNode==undefined){ tXls.textNode=tds[i2].innerText; }
			var td=$1.t('td',tXls,tr);
		}
	}
	P.tb=tb; $Xls.get(P);
}
