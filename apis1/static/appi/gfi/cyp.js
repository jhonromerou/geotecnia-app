Api.Cyp={pr:'/appi/private/cyp/'};

$V.Mdls['cyp']={t:'PrestApp',ico:'fa fa-money'};
$V.cypDateForm='d mmm';
$oB.push($V.docTT,[{k:'cypCon',v:'Prestamos'}]);
$V.jcypType=[{k:'simple',v:'Simple'},{k:'cDefine',v:'Cuota Definida'}
//{k:'frances',v:'Frances'},
];
$V.jcypFrec=[{k:'month',v:'Mensuales'},
{k:'wquin',v:'Quincenal 1-16'},
{k:'week',v:'Semanales'},
{k:'days',v:'Diarias'},
{k:'week2',v:'2 Semanas'},

//{k:'bim',v:'Bimestral'},
//{k:'trim',v:'Trimestral'},
//{k:'sem',v:'Semestral'},
];
$V.jcypDecm=0;

_Fi['cypCrd']=function(wrap){
	$Doc.filter({func:JCyp.Crd.get,docNum:'Y'},[
  {L:'No. Documento',wxn:'wrapx8',I:{lTag:'input',name:'C.licTradNum(E_like3)'}},{k:'card'},
  {L:'Resp. Ventas',wxn:'wrapx8',I:{lTag:'select',name:'C.slpId',opts:$Tb.oslp}},
  {L:'Grupo',wxn:'wrapx8',I:{lTag:'select',name:'C.grId',opts:$JsV.parGrC}},
  {divLine:1,L:'Resp. Ventas',wxn:'wrapx8',I:{lTag:'select',name:'A.slpId',opts:$Tb.oslp}},
  {L:'Sede',wxn:'wrapx8',I:{lTag:'select',name:'A.sucSede',opts:$Tb.cypSede}},
  {L:'Zona',wxn:'wrapx8',I:{lTag:'select',name:'C.logZone',opts:$JsV.cypZone}},
  {L:'Ruta',wxn:'wrapx8',I:{lTag:'select',name:'C.logRoute',opts:$JsV.cypRoute}},
  {L:'Cobrador',wxn:'wrapx8',I:{lTag:'select',name:'C.lgcId',opts:$Tb.crdLgc}},
  {L:'Frecuencia',wxn:'wrapx8',I:{lTag:'select',name:'A.cuoUdm',opts:$V.jcypFrec}},
  {L:'Prestado',wxn:'wrapx8',I:{lTag:'$',name:'A.vPre'}},
  {L:'Pendiente >=',wxn:'wrapx8',I:{lTag:'$',name:'A.balDue(E_mayIgual)'}},
	],wrap);
};
_Fi['cypCon']=function(wrap){
	$Doc.filter({func:JCyp.Con.get,docNum:'Y'},[
  {k:'d1'},{k:'d2'},{k:'docStatus'},{tbSerie:'cypCon'},{k:'docNum'},{k:'card'},{k:'ordBy'},
  {divLine:1,L:'Cobrador',wxn:'wrapx8',I:{lTag:'select',name:'A.slpId',opts:$Tb.oslp}},
  {L:'Ruta',wxn:'wrapx8',I:{lTag:'select',name:'C.logRoute',opts:$JsV.cypRoute}},
  {L:'Frecuencia',wxn:'wrapx8',I:{lTag:'select',name:'A.cuoUdm',opts:$V.jcypFrec}},
  {L:'Prestado',wxn:'wrapx8',I:{lTag:'$',name:'A.vPre'}},
  {L:'Pendiente >=',wxn:'wrapx8',I:{lTag:'$',name:'A.balDue(E_mayIgual)'}},
  {L:'Pendiente <=',wxn:'wrapx8',I:{lTag:'$',name:'A.balDue(E_menIgual)'}},
	],wrap);
};
_Fi['cypAps']=function(wrap){
	$Doc.filter({func:JCyp.Aps.get},[
  {k:'d1'},{k:'d2'},{k:'docStatus'},{L:'Socio',k:'card'},{k:'ordBy'},
  {L:'Detalles',wxn:'wrapx4',I:{lTag:'input',name:'A.lineMemo(E_like3)'}},
	],wrap);
};

var JCyp={
  getData:function(cont,P){
    P=(P)?P:$Api.jsBody(cont);
    P.vPre *=1;
    P.iTasa *=1;
    P.cuoNum *=1;
    P.cuoV *=1;
    return P;
  }
};

JCyp.Con={
  OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Cyp.pr+'con',tbSerie:'cypCon'});
		ab.add('N',{addText:'Se anulará el contrato, no se puede modificar está acción.'});
		return $Opts.add('cypCon',Li,L);
	},
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[{H:'Estado',k:'docStatus',_g:$V.docStatusOPC},
    {H:'Fecha',k:'docDate',dateText:'mmm d'},
    {H:'Prestado',k:'vPre',format:'$'},
    {H:'Saldo',k:'balDue',format:'$'},
    {H:'Tercero',k:'cardName'},
    {H:'Valor Cuota',k:'cuoV',format:'$'},
    {H:'Frecuencia',k:'cuoUdm',_g:$V.jcypFrec},
    {H:'Cobrador',k:'slpId',_g:$Tb.oslp},
    {H:'Ruta',k:'logRoute',_g:$JsV.cypRoute},
    {H:'Cuotas',k:'cuoNum',format:'number'},
    {H:'',k:'cuoNum',fTag:function(L){//% pagado
      if(L.lineNums>0){ return $1.t('progress',{value:L.lineNumsComp/L.lineNums,style:'width:40px',title:L.lineNumsComp+' de '+L.lineNums}); }
      else{ return ''; }
    }},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'con',inputs:$1.G.filter(),tbSerie:'cypCon',
    edit:'Y',view:'Y',main:JCyp.Con.OLg,docBy:'userDate',docUpd:'userDate', TD:Cols
    },cont);
  },
  form:function(){
    D={}; Pa=$M.read();
    jsF=$Api.JS.cls; cont=$M.Ht.cont;
    D.docDate=$2d.today;
    $Api.get({f:Api.Cyp.pr+'con/form',loadVerif:!Pa.docEntry,inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
      if(Jr.errNo){ return $Api.resp(cont,Jr); }
      if(Jr.docEntry){ D=Jr; }
      var card=$1.lTag({tag:'card','class':'_crd',cardType:'C',D:D,fie:'slpId,logRoute',boxRep:'Y',topPare:cont});
      $Api.form2({api:Api.Cyp.pr+'con',jsF:'Y',AJs:{L:[]},PUTid:Pa.docEntry,JrD:D,vidn:'docEntry',to:'cypCon.view',midTag:'Y',
        tbH:[
          {req:'Y',wxn:'wrapx8',L:'Serie',I:{xtag:'docSeries',tbSerie:'cypCon',jsF:jsF}},	
        {L:'Tercero',req:'Y',wxn:'wrapx4',Inode:card},
        {wxn:'wrapx8',L:'Fecha Apertura',I:{lTag:'date',name:'docDate',value:D.docDate}},
        {wxn:'wrapx8',L:'Cobrador',I:{lTag:'select',name:'slpId','class':$Api.Sea.clsBox,k:'slpId',opts:$Tb.oslp,value:D.slpId}},
        {wxn:'wrapx8',L:'Ruta',I:{lTag:'select',name:'logRoute',opts:$JsV.cypRoute,'class':$Api.Sea.clsBox,k:'logRoute',value:D.logRoute}},
        {divLine:1,req:'Y',wxn:'wrapx8',L:'Monto Solicitado',I:{lTag:'$',name:'vPre','class':'_vPre'}},
        {L:'Tipo',req:'Y',wxn:'wrapx8',I:{lTag:'select',opts:$V.jcypType,name:'docType',value:D.docType}},
        {L:'% Interes',req:'Y',wxn:'wrapx9',I:{lTag:'number',name:'iTasa','class':' _iTasa',value:D.iTasa,min:0,max:100}},
        {L:'# Cuotas',req:'Y',wxn:'wrapx9',I:{lTag:'number',name:'cuoNum','class':' _cuoNum',value:D.cuoNum}},
        {L:'Frecuencia',req:'Y',wxn:'wrapx8',I:{lTag:'select',opts:$V.jcypFrec,name:'cuoUdm','class':' _cuoUdm',value:D.cuoUdm}},
        {L:'Valor Cuota',req:'Y',wxn:'wrapx8',I:{lTag:'$',name:'cuoV','class':' _cuoV',value:D.cuoV}},
        {L:'Total a Pagar',req:'Y',wxn:'wrapx8',I:{lTag:'$',name:'vFut',value:D.vFut}},
        {divLine:1,L:'Detalles',wxn:'wrapx2',I:{lTag:'textarea',name:'lineMemo',value:D.lineMemo}},
        ],
        reqFields:{
          D:[{k:'cardId',iMsg:'Tercero'},{k:'docDate',iMsg:'Fecha Apertura'},{k:'vPre',iMsg:'Valor del contrato'}]
        },
      },cont);
      midCont=$1.q('.midCont',cont);
      apiAJS=$1.q('._apiFormAJs',cont);
      $1.onchange('[name="docType"]',ch,cont);
      $1.q('[name="vPre"]',cont).keyChange(ch);
      $1.q('[name="iTasa"]',cont).keyChange(ch);
      $1.q('[name="cuoNum"]',cont).keyChange(ch);
      $1.onchange('[name="cuoUdm"]',ch,cont);
      $1.q('[name="cuoV"]',cont).keyChange(ch);
      function ch(){
        midCont.innerHTML='';
        docType=$1.q('[name="docType"]',cont).value;
        P=JCyp.getData(cont);
        $1.tagSet('[name="iTasa"]',(tt)=>{ tt.parentNode.classList.remove('hidden'); },cont);
        R=false;
        if(docType=='simple'){ R=JCyp.CR.simple(cont,P); }
        if(docType=='frances'){ R=JCyp.CR.frances(cont,P); }
        if(docType=='cDefine'){ R=JCyp.CR.cDefine(cont,P); }
        if(R && R.cuoV){
          $1.tagSet('[name="cuoV"]',(tt)=>{
            tt.value=$Str.money(R.cuoV);
            if(P.docType=='cDefine'){ tt.removeAttribute('disabled'); }
            else{ tt.setAttribute('disabled','disabled'); }
          },cont); 
          $1.tagSet('[name="vFut"]',(tt)=>{
            tt.value=$Str.money(R.vFut);
            tt.setAttribute('disabled','disabled');
          },cont);
        }
        //cuotas
        if(P.vPre>0 && P.docType && P.iTasa>0 && P.cuoNum && P.cuoUdm){
          R=JCyp.CR.quotes(R);
          apiAJS.AJs={L:R.L};
          fie=$1.T.fieset({L:{textNode:'Proyección de Cuotas'}},midCont);
          var tb=$1.T.table(['#','Fecha','Cuota','a Interes','a Capital','Saldo Capital','Pendiente'],0,fie);
          tBody=$1.t('tbody',0,tb);
          ln=1;
          for(i in R.L){ Lc=R.L[i];
            var tr=$1.t('tr',0,tBody);
            $1.t('td',{textNode:ln},tr); ln++;
            $1.t('td',{textNode:$2d.f(Lc.lineDue,'d mmm')},tr);
            $1.t('td',{textNode:$Str.money(Lc.cuoV)},tr);
            $1.t('td',{textNode:$Str.money(Lc.cuoInt)},tr);
            $1.t('td',{textNode:$Str.money(Lc.cuoCap)},tr);
            $1.t('td',{textNode:$Str.money(Lc.capAt)},tr);
            $1.t('td',{textNode:$Str.money(Lc.cuoSaldo)},tr);
          }
        }
      }
      if(Jr.docEntry){ ch(); }
    }});
  },
  view:function(){
    var cont=$M.Ht.cont;
    $Api.get({f:Api.Cyp.pr+'con/view',inputs:'docEntry='+$M.Pa.docEntry,loade:cont,errWrap:cont,func:function(Jr){
      midCont=$1.t('div');
      Jr.cuoText=Jr.cuoNum+' de '+$Str.money(Jr.cuoV);
      var tP={tbSerie:'cypCon',D:Jr,midCont:midCont,main:JCyp.Con.OLg,
      THs:[
        {docEntry:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Ruta',k:'logRoute',_g:$JsV.cypRoute,ln:1,cs:2},
        {t:'Tipo',k:'docType',_g:$V.cardType},{middleInfo:'Y'},{logo:'Y'},
        {t:'Estado',k:'docStatus',_g:$V.docStatusAll},
        {t:'Apertura',k:'docDate'},
        {k:'licTradType',_g:$V.licTradType},
        {k:'licTradNum',ln:1},
        {k:'cardName',cs:4,ln:1},
        {k:'slpId',_g:$Tb.oslp,ln:1,cs:2},
        {t:'Prestado',k:'vPre',format:'$'},
        {k:'vPre',format:'num2Text',ln:1,cs:4},
        {tlabel:'Cuotas: ',k:'cuoText',ln:1,cs:2},
      ],
      Tabs:[
        {k:'plugsCmts',P:{tt:'cypCon',tr:Jr.docEntry,getList:'Y'}},
        {textNode:'Recargos',winClass:'pays','class':'fa fa-money',func:function(T){ JCyp.Rec.get(T.win); }},
        //{textNode:'Pagos',winClass:'pays','class':'fa fa-money',func:function(T){ JCyp.Rcv.pays({docEntry:$Pa.docEntry}); }},
        //{k:'plugsFiles',P:{tt:'cypCon',tr:Jr.docEntry,getList:'Y'}},
      ]};
      $Doc.view(cont,tP);
      if(Jr.L){
        var tb=$1.T.table(['#','$ Pendiente','','Cuota','Recargos','','a Interes','a Capital','','Saldo Capital','Saldo Deuda','Vencimiento','']);
        tb.classList.add('table_x100');
        $1.T.fieset({L:{textNode:'Proyección de Cuotas'}},midCont,tb);
        tb.parentNode.insertBefore($1.barProgress({format:'$',total:Jr.docTotal,comp:(Jr.docTotal*1-Jr.balDue*1)}),tb);
        var tBody=$1.t('tbody',0,tb);
        if(Jr.L && !Jr.L.errNo){ for(var i2 in Jr.L){ L=Jr.L[i2];
          var tr=$1.t('tr',0,tBody);
          $1.t('td',{textNode:L.lineNum,style:'width:40px'},tr);
          $1.t('td',{textNode:$Str.money(L.balDue),style:'width:120px'},tr);
          $1.t('td',{style:'backgroundColor:#EEE; width:20px'},tr);
          $1.t('td',{textNode:$Str.money(L.cuoV),style:'width:120px'},tr);
          $1.t('td',{textNode:$Str.money(L.balRec),style:'width:120px'},tr);
          $1.t('td',{style:'backgroundColor:#EEE; width:20px'},tr);
          $1.t('td',{textNode:$Str.money(L.cuoInt),style:'width:120px'},tr);
          $1.t('td',{textNode:$Str.money(L.cuoCap),style:'width:120px'},tr);
          $1.t('td',{style:'backgroundColor:#EEE; width:20px'},tr);
          $1.t('td',{textNode:$Str.money(L.capAt),style:'width:120px'},tr);
          $1.t('td',{textNode:$Str.money(L.cuoSaldo),style:'width:120px'},tr);
          $1.t('td',{textNode:$2d.f(L.lineDue,'d mmm'),style:'width:120px'},tr);
          $1.t('td',0,tr);
        } }
      }
    }});
  }
};
JCyp.intNum=function(t){  return (t/100); };
JCyp.CR={
  simple:function(cont,P){
    P=JCyp.getData(cont);
    iTasa=JCyp.intNum(P.iTasa);
    iCuo=JCyp.Fx.round(P.vPre*iTasa);
    vFut=(P.vPre+iCuo);
    iTotal=vFut-P.vPre;
    iTTotal=JCyp.Fx.round((iTotal/P.vPre)*100);
    cuoV=JCyp.Fx.round(vFut/P.cuoNum);
    cuoPerInt=JCyp.Fx.round(iTotal/P.cuoNum);
    cuoPerCap=JCyp.Fx.round(cuoV-cuoPerInt);
    R={
    'docType':P.docType,docDate:P.docDate,
    'vPre':P.vPre,'iTasa':P.iTasa,
    'cuoNum':P.cuoNum,'cuoV':cuoV,
    'vFut':vFut,'iTTotal':iTTotal,
    'cuoPerCap':cuoPerCap,'cuoPerInt':cuoPerInt,
    };
    return R;
  },
  frances:function(cont,P){
    P=JCyp.getData(cont);
    cuoV=JCyp.Fx.cuotaFija(P);
    iTasa=JCyp.intNum(P.iTasa);
    iCuo=JCyp.Fx.round(P.vPre*iTasa);
    vFut=cuoV*P.cuoNum;
    iTotal=vFut-P.vPre;
    iTTotal=JCyp.Fx.round((iTotal/P.vPre)*100);
    cuoPerInt=JCyp.Fx.round(iTotal/P.cuoNum);
    cuoPerCap=JCyp.Fx.round(cuoV-cuoPerInt);
    R={
    'docType':P.docType,docDate:P.docDate,
    'vPre':P.vPre,'iTasa':P.iTasa,
    'cuoNum':P.cuoNum,'cuoV':cuoV,
    'vFut':vFut,'iTTotal':iTTotal,
    'cuoPerCap':cuoPerCap,'cuoPerInt':cuoPerInt,
    };
    return R;
  },
  cDefine:function(cont,P){
    P=JCyp.getData(cont,P);
    cuoV=P.cuoV;
    iTasa=0;
    vFut=cuoV*P.cuoNum;
    iTotal=vFut-P.vPre;
    iTTotal=JCyp.Fx.round((iTotal/P.vPre)*100);
    cuoPerInt=JCyp.Fx.round(iTotal/P.cuoNum);
    cuoPerCap=JCyp.Fx.round(cuoV-cuoPerInt);
    R={
    'docType':P.docType,docDate:P.docDate,
    'vPre':P.vPre,'iTasa':P.iTasa,
    'cuoNum':P.cuoNum,'cuoV':cuoV,
    'vFut':vFut,'iTTotal':iTTotal,
    'cuoPerCap':cuoPerCap,'cuoPerInt':cuoPerInt,
    };
    $1.q('[name="iTasa"]',cont).parentNode.classList.add('hidden');
    $1.tagSet('[name="cuoV"]',(tt)=>{
      tt.removeAttribute('disabled');
    },cont);
    return R;
  },
  quotes:function(R){
    period=$1.q('[name="cuoUdm"]').value;
    switch(period){
      case 'week': reps={d:7}; break;
      case 'week2': reps={d:14}; break;
      case 'wquin': reps={q:1}; break;
      default: reps={m:1}; break;
    }
    R.L=[]; dueDate=R.docDate;
    var capAt=R.vPre; var cuoSaldo=R.vFut;
    for(e=1; e<=R.cuoNum; e++){
      dueDate=$2d.addDate(dueDate,reps);
      if(R.docType=='simple'){
        cuoV=R.cuoV;
        cuoInt=R.cuoPerInt;
        cuoCap=cuoV-cuoInt;
        capAt=capAt-cuoCap;
        cuoSaldo=cuoSaldo-R.cuoV;
      }
      else if(R.docType=='frances'){
        cuoV=R.cuoV;
        cuoInt=JCyp.Fx.cuotaPeri(capAt,R.iTasa);
        cuoCap=JCyp.Fx.round(cuoV-cuoInt);
        capAt=capAt-cuoCap;
        cuoSaldo=cuoSaldo-R.cuoV;
      }
      else if(R.docType=='cDefine'){
        cuoV=R.cuoV;
        cuoInt=R.cuoPerInt;
        cuoCap=cuoV-cuoInt;
        capAt=capAt-cuoCap;
        cuoSaldo=cuoSaldo-R.cuoV;
      }
      R.L.push({cuoV:cuoV,capAt:capAt,cuoCap:cuoCap,cuoInt:cuoInt,cuoSaldo:cuoSaldo,lineDue:dueDate});
    }
    return R;
  }

}

JCyp.Crd={
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[
      {H:'Documento',k:'licTradNum'},
      {H:'Nombre cliente',k:'cardName'},
      {H:'Cobrador',k:'slpId',_g:$Tb.oslp},
      {H:'Sede',k:'sucSede',_g:$Tb.cypSede},
      {H:'Ruta',k:'logRoute',_g:$JsV.cypRoute},
      {H:'Telefono',k:'phone1'},
      {H:'',k:'phone2'},
      {H:'Celular',k:'cellular'},
      {H:'Direccion',k:'address'},
      {H:'email',k:'email'},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'crd',inputs:'cardType=C&'+$1.G.filter(),
    main:JCyp.Crd.opts,tbSerie:'cypCrd',edit:'Y',vidn:'cardId',view:'N',
    TD:Cols,
    },cont);
  },
  form:function(){
    D={};
    var jsF=$Api.JS.cls; var cont=$M.Ht.cont;
    var Pa=$M.read(); Pac=$M.read('!');
    cardType=(Pac=='cypCrd.form')?'C':'';
    $Api.get({f:Api.Cyp.pr+'crd/form',loadVerif:!Pa.cardId, inputs:'cardId='+Pa.cardId, loade:cont, func:function(Jr){
    D=(Jr.cardId)?Jr:D;
    AF=$Api.form2({api:Api.Cyp.pr+'crd',AJs:{cardType:cardType},PUTid:Pa.cardId,JrD:D,vidn:'cardId',jsF:'Y',midTag:'Y',
    tbH:[
      {L:'Nombre Cliente',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'cardName',value:D.cardName}},
      //{wxn:'wrapx8',L:'Cobrador',aGo:'crdLgc',I:{lTag:'select',name:'lgcId',opts:$Tb.crdLgc,value:D.lgcId}},
      {L:'Cobrador',req:'Y',wxn:'wrapx8',aGo:'tb.oslp',I:{lTag:'select',name:'slpId',opts:$Tb.oslp,value:D.slpId}},
      {wxn:'wrapx8',L:'Ruta',aGo:'jsv.cypRoute',I:{lTag:'select',name:'logRoute',opts:$JsV.cypRoute,value:D.logRoute}},
      {wxn:'wrapx10',L:'Tipo Documento',I:{lTag:'select',name:'licTradType',opts:$V.crdLicTradType,value:D.licTradType}},
      {L:'No. Documento',wxn:'wrapx8',I:{lTag:'input',name:'licTradNum',value:D.licTradNum}},
      {wxn:'wrapx8',L:'Activo',I:{lTag:'select',name:'actived',opts:$V.YN,noBlank:1,value:D.actived}},
    ],
    Tabs:[
      {textNode:'General',winClass:'gen',active:'Y'}
    ]});
	  var lisGen=[
		{t:'Municipio',node:$1.T.sel({'class':jsF,name:'cityCode',opts:$V.AddrCity,selected:Jr.cityCode})},
		{t:'Departamento',node:$1.T.sel({'class':jsF,name:'countyCode',opts:$V.AddrCounty,selected:Jr.countyCode})},
		{t:'Dirección',node:$1.t('input',{type:'text','class':jsF,name:'address',value:Jr.address})},
		{t:'Teléfono 1',node:$1.t('input',{type:'text','class':jsF,name:'phone1',value:Jr.phone1})},
		{t:'Teléfono 2',node:$1.t('input',{type:'text','class':jsF,name:'phone2',value:Jr.phone2})},
		{t:'Tel. Movil',node:$1.t('input',{type:'text','class':jsF,name:'cellular',value:Jr.cellular})},
		{t:'Correo',node:$1.t('input',{type:'text','class':jsF,name:'email',value:Jr.email,placeholder:'empresa@gmail.com'})},
		{t:'Referido por',node:$1.t('input',{type:'text','class':jsF,name:'referFrom',value:Jr.referFrom})}
		];
    $1.Tb.trsI(lisGen,AF.Tabs.gen);
  }});
},
}
JCyp.Cso={
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[
      {H:'Documento',k:'licTradNum'},
      {H:'Nombre cliente',k:'cardName'},
      {H:'Sede Principal',k:'crdSede',_g:$Tb.cypSede},
      {H:'Inversión',k:'debBal',format:'$'},
      {H:'Retiros',k:'creBal',format:'$'},
      {H:'Telefono',k:'phone1'},
      {H:'',k:'phone2'},
      {H:'Celular',k:'cellular'},
      {H:'email',k:'email'},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'crd',inputs:'cardType=A&'+$1.G.filter(),
    tbSerie:'cypCso',edit:'Y',vidn:'cardId',view:'N', TD:Cols,
    },cont);
  },
  form:function(){
    D={};
    var jsF=$Api.JS.cls; var cont=$M.Ht.cont;
    Pac=$M.read('!');
    cardType=(Pac=='cypCso.form')?'A':'';
    function midConf(Jr,cont,AF){
      var lisGen=[
        {t:'Municipio',node:$1.T.sel({'class':jsF,name:'cityCode',opts:$V.AddrCity,selected:Jr.cityCode})},
        {t:'Departamento',node:$1.T.sel({'class':jsF,name:'countyCode',opts:$V.AddrCounty,selected:Jr.countyCode})},
        {t:'Dirección',node:$1.t('input',{type:'text','class':jsF,name:'address',value:Jr.address})},
        {t:'Teléfono 1',node:$1.t('input',{type:'text','class':jsF,name:'phone1',value:Jr.phone1})},
        {t:'Teléfono 2',node:$1.t('input',{type:'text','class':jsF,name:'phone2',value:Jr.phone2})},
        {t:'Tel. Movil',node:$1.t('input',{type:'text','class':jsF,name:'cellular',value:Jr.cellular})},
        {t:'Correo',node:$1.t('input',{type:'text','class':jsF,name:'email',value:Jr.email,placeholder:'empresa@gmail.com'})},
        ];
        $1.Tb.trsI(lisGen,AF.Tabs.gen);
    }
    $Api.form2({api:Api.Cyp.pr+'crd',AJs:{cardType:cardType},JrD:D,canEdit:'Y',uidn:'cardId',jsF:'Y',midCont:midConf,
    tbH:[
      {L:'Nombre Socio',req:'Y',wxn:'wrapx4',I:{lTag:'input',name:'cardName',value:D.cardName}},
      {wxn:'wrapx10',L:'Tipo Documento',I:{lTag:'select',name:'licTradType',opts:$V.crdLicTradType,value:D.licTradType}},
      {L:'No. Documento',wxn:'wrapx8',I:{lTag:'input',name:'licTradNum',value:D.licTradNum}},
      {wxn:'wrapx8',L:'Sede',aGo:'cypSede',I:{lTag:'select',name:'sucSede',opts:$Tb.cypSede,value:D.sucSede}},
      {wxn:'wrapx8',L:'Activo',I:{lTag:'select',name:'actived',opts:$V.YN,noBlank:1,value:D.actived}},
    ],
    Tabs:[
      {textNode:'General',winClass:'gen',active:'Y'}
    ]});
},
}

JCyp.Rcv={
  OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Cyp.pr+'rcv',tbSerie:'cypRcv'});
		ab.add('N',{addText:'Se anulará el pago, todos los contratos relacionados a el también serán afectados. No se puede modificar está acción.'});
		return $Opts.add('cypRcv',Li,L);
	},
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[{H:'Estado',k:'docStatus',_g:$V.docStatusAll},
    {H:'Fecha',k:'docDate',dateText:'mmm d'},
    {H:'Valor',k:'docTotal',format:'$'},
    {H:'Cliente',k:'cardName'},
    {H:'Cobrador',k:'lgcId',_g:$Tb.crdLgc},
    {H:'Resp',k:'slpId',_g:$Tb.oslp},
    {H:'Sede',k:'sucSede',_g:$Tb.cypSede},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'rcv',inputs:$1.G.filter(),tbSerie:'cypRcv',
    view:'Y',main:JCyp.Rcv.OLg,docBy:'userDate', TD:Cols
    },cont);
  },
  form:function(){
    var cont=$M.Ht.cont; var Pa=$M.read(); var D={};
    if(!D.docDate){ D.docDate=$2d.today; }
    var card=$1.lTag({tag:'card','class':'_crd',cardType:'C',fie:'slpId,sucSede,lgcId',AJsPut:['slpId','sucSede','lgcId'],funcAll:function(){
      reLoa();
    }});
    $Api.form2({api:Api.Cyp.pr+'rcv',AJs:D.AJs,PUTid:Pa.docEntry,JrD:D,vidn:'docEntry',to:'cypRcv.view',jsF:'Y',midTag:'Y',
      tbH:[
      {divLine:1,L:'Fecha',req:'Y',wxn:'wrapx8',I:{tag:'date',name:'docDate',value:D.docDate}},
      {L:'Cliente',req:'Y',wxn:'wrapx2',Inode:card},
      {wxn:'wrapx8',L:'Cobrador',req:'Y',I:{lTag:'select',name:'lgcId',opts:$Tb.crdLgc,'class':$Api.Sea.clsBox,k:'lgcId'}},
      {divLine:1,wxn:'wrapx8',L:'Valor Recibido',I:{lTag:'$',name:'docTotal',disabled:'disabled'}},
      {wxn:'wrapx8',L:'Deuda Total',I:{lTag:'input','class':'dueTotal',disabled:'disabled'}},
      {L:'Detalles',wxn:'wrapx2',I:{lTag:'textarea',name:'lineMemo',value:D.lineMemo}},
      ],
      reqFields:{
        D:[{k:'docDate',iMsg:'Fecha'},{k:'cardId',iMsg:'Cliente'},{k:'lgcId',iMsg:'Cobrador'}
        ],
        L:['_req',{_t:'Cuotas a pagar'}]
      },
      befSend:(JS)=>{
        L=[];
        for(var i in JS.L){
          if(JS.L[i].payTo=='Y'){ L.push(JS.L[i]); }
        }
        JS.L=L;
        return JS;
      }
    },cont);
    var midCont=$1.q('.midCont',cont);
    midCont.innerHTML='<h3 class="input_info">Seleccione un cliente para ver las cuotas por activas</h3>';
    var crd=$1.q('._crd');
    function reLoa(tv){
      midCont.innerHTML='<h3 class="input_info">Seleccione un cliente para ver las cuotas por activas</h3>';
      if(crd.AJs && crd.AJs.cardId){ JCyp.Rcv.getCon(crd.AJs,midCont); }
      else{ $Api.resp(tBody,{text:'Se debe definir un cliente'}); }
    }
  },
  view:function(){
    var cont=$M.Ht.cont; var Pa=$M.read();
    $Api.get({f:Api.Cyp.pr+'rcv/view',inputs:'docEntry='+Pa.docEntry,loade:cont,errWrap:cont,func:function(Jr){
      midCont=$1.t('div');
      var tP={tbSerie:'cypRcv',D:Jr,midCont:midCont,main:JCyp.Rcv.OLg,
        THs:[
          {docEntry:'Y'},{sdocTitle:'Y',cs:5,ln:1},{t:'Sede',k:'crdSede',_g:$Tb.cypSede,ln:1,cs:2},
          {t:'Estado',k:'docStatus',_g:$V.docStatusOPC},{t:'Resp.',k:'slpId',ln:1,cs:3},{logo:'Y'},
          {t:'Fecha',k:'docDate'},
          {t:'Cobrador',k:'lgcId',_g:$Tb.crdLgc,ln:1,cs:3},
          {t:' ',cs:4},
          {k:'licTradType',_g:$V.licTradType},
          {k:'licTradNum',ln:1},
          {k:'cardName',cs:6,ln:1},
          {t:'Cobrado',k:'docTotal',format:'$'},
          {k:'docTotal',format:'num2Text',ln:1,cs:6},
          {k:'lineMemo',cs:8},
        ],
      };
      $Doc.view(cont,tP);
      if(Jr.L){
        var tb=$1.T.table(['Contrato','# Cuota','$ Pagado','','$ Pendiente','Vencia','$ Cuota','Recargos','']);
        tb.classList.add('table_x100');
        $1.T.fieset({L:{textNode:'Cuotas Pagadas'}},midCont,tb);
        var tBody=$1.t('tbody',0,tb);
        if(Jr.L && !Jr.L.errNo){ for(var i2 in Jr.L){ L=Jr.L[i2];
          var tr=$1.t('tr',0,tBody);
          $1.t('td',{textNode:L.docEntry,style:'width:120px'},tr);
          $1.t('td',{textNode:L.lineNum,style:'width:120px'},tr);
          $1.t('td',{textNode:$Str.money(L.bal),style:'width:160px'},tr);
          $1.t('td',{style:'width:30px; backgroundColor:#EEE'},tr);
          $1.t('td',{textNode:$Str.money(L.balDue),style:'width:160px'},tr);
          $1.t('td',{textNode:$2d.f(L.lineDue,$V.cypDateForm),style:'width:120px'},tr);
          $1.t('td',{textNode:$Str.money(L.cuoV),style:'width:160px'},tr);
          $1.t('td',{textNode:$Str.money(L.balRec),style:'width:160px'},tr);
          $1.t('td',0,tr);
        } }
      }
    }});
  },
  getCon:function(Px,midCont){
    $Api.get({f:Api.Cyp.pr+'con/topay',inputs:'cardId='+Px.cardId,loade:midCont,func:function(Jr){
      if(Jr.errNo){ return $Api.resp(midCont,Jr); }
      { 
        var tb=$1.T.table(['','# Cuota','Vence','$ Pagar','$ Pendiente','$ Cuota','$ Recargos']);
        $1.T.fieset({L:{textNode:'Contratos Abiertos'}},midCont,tb);
        var tBody=$1.t('tbody',{},tb);
        var jsF=$Api.JS.clsLN;
        lastdEntry=0;
        function balTotal(Cols){
          $1.tagSet('[name="docTotal"]',(tt)=>{
            console.log(tt);
            tt.value=$Str.money(Cols[1].v);
          },midCont.parentNode);;
        }
        dueTotal=0;
        $Api.foreach(Jr.L,function(L){
          dueTotal+=L.balDue*1;
          if(lastdEntry!=L.docEntry){
            tr=$1.t('tr',0,tBody);
            $1.t('td',{textNode:'Contrato # '+L.docEntry,colspan:4,style:'fontWeight:bold; backgroundColor:#DDD;'},tr);
            td=$1.t('td',{textNode:(L.cuoNum*1+' '+_g(L.cuoUdm,$V.jcypFrec)+' de '+$Str.money(L.cuoV)),colspan:3,style:'fontWeight:bold; backgroundColor:#DDD;'},tr);
          }
          lastdEntry=L.docEntry;
          var tr=$1.t('tr',{'class':$Api.JS.clsL+' '+tbCal._row},tBody);
          var tcheck=$1.t('input',{type:'checkbox','class':jsF,name:'payTo',tabindex:-1},$1.t('td',0,tr));
          tcheck.AJs={docEntry:L.docEntry,cuoid:L.id,lineNum:L.lineNum};
          tcheck.balDue=L.balDue*1;
          tcheck.onclick=function(){
            var val=$1.q('.val',this.parentNode.parentNode);
            if(this.checked){ val.value=this.balDue; }
            else{ val.value=''; }
            tbCal.sumCells(tBody,balTotal);
          }
          $1.t('td',{textNode:L.lineNum},tr); n++;
          td=$1.t('td',{textNode:$2d.f(L.lineDue,$V.cypDateForm)},tr);
          if(L.lineDue<$2d.today){ td.classList.add('bf-danger'); }
          var td=$1.t('td',0,tr);
          tBal=$1.lTag({tag:'$','class':jsF+' '+tbCal._cell+' val',ncol:1,name:'bal',min:0,max:L.balDue,style:'width:8rem',placeholder:L.balDue*1,AJs:{acId:L.acId}, keyChange:((T)=>{
            if(T.value!='' && T.value!=0){ T.tcheck.checked=true; }
            else{ T.tcheck.checked=false; }
            tbCal.sumCells(tBody,balTotal);
          })},td);
          tBal.tcheck=tcheck;
          $1.t('td',{textNode:$Str.money(L.balDue)},tr);
          $1.t('td',{textNode:$Str.money(L.cuoV)},tr);
          $1.t('td',{textNode:$Str.money(L.balRec)},tr);
        });
        $1.tagSet('.dueTotal',(tt)=>{ tt.value=$Str.money(dueTotal); },midCont.parentNode);
        var tr=$1.t('tr',0,tBody);
        $1.t('td',{colspan:3,textNode:'Total'},tr); n++;
        $1.t('td',{'class':tbCal._cell+'_1',format:'$'},tr);
        $1.t('td',{colspan:3},tr);
      }
    }});
  }
}
JCyp.Rec={
  OLg:function(L){
		var Li=[];
		var ab=new $Doc.liBtn(Li,L,{api:Api.Cyp.pr+'rec',tbSerie:'cypRec'});
		ab.add('N',{addText:'Se anulará el recargo. No se puede modificar está acción.'});
		return $Opts.add('cypRec',Li,L);
	},
  get:function(cont){
    var Cols=[
    {H:'Estado',k:'docStatus',_g:$V.docStatusAll},
    {H:'Fecha',k:'docDate',dateText:'mmm d'},
    {H:'Valor',k:'docTotal',format:'$'},
    {H:'Concepto',k:'docClass',_g:$JsV.cypRecClass},
    {H:'Detalles',k:'lineMemo'},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'rec',justOne:'Y',inputs:'otr='+$M.Pa.docEntry,
    tbSerie:'cypRec',view:'N',main:JCyp.Rec.OLg,docBy:'userDate',TD:Cols,
    aftFunc:(cont)=>{
      btn=$1.btnGo({textNode:'Nuevo',func:JCyp.Rec.form});
      cont.insertBefore(btn,cont.firstChild);
    }},cont);
  },
  form:function(){
    var cont=$1.t('div'); var D={};
    $1.Win.open(cont,{winSize:'medium',winTitle:'Recargo'});
    if(!D.docDate){ D.docDate=$2d.today; }
    $Api.form2({api:Api.Cyp.pr+'rec',AJs:D.AJs,JrD:D,uidn:'docEntry',jsF:'Y',
      tbH:[
      {L:'No. Cuota',req:'Y',wxn:'wrapx4',I:{lTag:'number',name:'lineNum',value:D.lineNum}},
      {L:'Fecha',req:'Y',wxn:'wrapx4',I:{lTag:'date',name:'docDate',value:D.docDate}},
      {wxn:'wrapx4',L:'Concepto',req:'Y',I:{lTag:'select',name:'docClass',opts:$JsV.cypRecClass}},
      {wxn:'wrapx4',L:'Valor Recargo',req:'Y',I:{lTag:'$',name:'docTotal'}},,
      {divLine:1,L:'Detalles',wxn:'wrapx1',I:{lTag:'textarea',name:'lineMemo',value:D.lineMemo}},
      ],
      reqFields:{
        D:[{k:'lineNum',iMsg:'No. Cuota'},{k:'docDate',iMsg:'Fecha'},{k:'docClass',iMsg:'Concepto'},{k:'docTotal',iMsg:'Valor Recargo'}
        ]
      }
    },cont);
  },
}
JCyp.Aps={
  OLg:function(L){
		var Li=[];
    L.docEntry=L.id;
		var ab=new $Doc.liBtn(Li,L,{api:Api.Cyp.pr+'aps',tbSerie:'cypAps'});
		ab.add('L');
		ab.add('N',{addText:'Se anulará el aporte. No se puede reversar está acción.'});
		return $Opts.add('cypAps',Li,L);
	},
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[
    {H:'Estado',k:'docStatus',_g:$V.docStatusAll},
    {H:'Fecha',k:'docDate',dateText:$V.cypDateForm},
    {H:'Valor',k:'debBal',format:'$'},
    {H:'Socio',k:'cardName'},
    {H:'Detalles',k:'lineMemo'},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'aps',inputs:$1.G.filter(),
    tbSerie:'cypAps', _fEdit:JCyp.Aps.form,view:'N',main:JCyp.Aps.OLg,docBy:'userDate',TD:Cols},cont);
  },
  form:function(Pa){
    Pa=(Pa)?Pa:{};
    var cont=$1.t('div'); var D={};
    $1.Win.open(cont,{winSize:'medium',winTitle:'Aporte de Socio'});
    if(!D.docDate){ D.docDate=$2d.today; }
    $Api.form2({api:Api.Cyp.pr+'aps',AJs:D.AJs,JrD:D,uid:{k:'id',v:Pa.id},jsF:'Y',clearForm:'Y',func:JCyp.Aps.get,
      tbH:[
      {L:'Fecha',req:'Y',wxn:'wrapx4',I:{lTag:'date',name:'docDate',value:D.docDate}},
      {L:'Socio',req:'Y',wxn:'wrapx4',I:{lTag:'card',_D:'Y','class':'_crd',cardType:'A',fie:'sucSede'}},
      {L:'Sede',req:'Y',wxn:'wrapx4',I:{lTag:'select',name:'sucSede',opts:$Tb.cypSede}},
      {L:'Monto',req:'Y',wxn:'wrapx4',I:{lTag:'$',name:'debBal'}},,
      {divLine:1,L:'Detalles',wxn:'wrapx1',I:{lTag:'textarea',name:'lineMemo',value:D.lineMemo}},
      {addIf:(L,P)=>{  if(L.id>0){ return 'Y'; } return 'N'; },divLine:1,L:'Motivo modificación',wxn:'wrapx1',I:{lTag:'textarea',name:'lineMemoUpd',value:D.lineMemoUpd}},
      ],
      reqFields:{
        D:[{k:'docDate',iMsg:'Fecha'},{k:'cardId',iMsg:'Socio'},{k:'sucSede',iMsg:'Sede'},{k:'debBal',iMsg:'Monto del aporte'}
        ]
      }
    },cont);
  },
}
JCyp.Rds={
  OLg:function(L){
		var Li=[];
    L.docEntry=L.id;
		var ab=new $Doc.liBtn(Li,L,{api:Api.Cyp.pr+'rds',tbSerie:'cypRds'});
		ab.add('L');
		ab.add('N',{addText:'Se anulará el retiro. No se puede reversar está acción.'});
		return $Opts.add('cypRds',Li,L);
	},
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[
    {H:'Estado',k:'docStatus',_g:$V.docStatusAll},
    {H:'Fecha',k:'docDate',dateText:$V.cypDateForm},
    {H:'Valor',k:'creBal',format:'$'},
    {H:'Socio',k:'cardName'},
    {H:'Detalles',k:'lineMemo'},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'rds',inputs:$1.G.filter(),
    tbSerie:'cypRds', _fEdit:JCyp.Rds.form,view:'N',main:JCyp.Rds.OLg,docBy:'userDate',TD:Cols},cont);
  },
  form:function(Pa){
    Pa=(Pa)?Pa:{}; var D={};
    if(!D.docDate){ D.docDate=$2d.today; }
    $Api.form2({api:Api.Cyp.pr+'aps',AJs:D.AJs,JrD:D,uid:{k:'id',v:Pa.id},jsF:'Y',
    Win:{winSize:'medium',winTitle:'Retiro de Socio'},clearForm:'Y',func:JCyp.Aps.get,
      tbH:[
      {L:'Fecha',req:'Y',wxn:'wrapx4',I:{lTag:'date',name:'docDate',value:D.docDate}},
      {L:'Socio',req:'Y',wxn:'wrapx4',I:{lTag:'card',_D:'Y','class':'_crd',cardType:'A',fie:'sucSede'}},
      {L:'Sede',req:'Y',wxn:'wrapx4',I:{lTag:'select',name:'sucSede',opts:$Tb.cypSede}},
      {L:'Monto',req:'Y',wxn:'wrapx4',I:{lTag:'$',name:'creBal'}},,
      {divLine:1,L:'Detalles',wxn:'wrapx1',I:{lTag:'textarea',name:'lineMemo',value:D.lineMemo}},
      {addIf:(L,P)=>{  if(L.id>0){ return 'Y'; } return 'N'; },divLine:1,L:'Motivo modificación',wxn:'wrapx1',I:{lTag:'textarea',name:'lineMemoUpd',value:D.lineMemoUpd}},
      ],
      reqFields:{
        D:[{k:'docDate',iMsg:'Fecha'},{k:'cardId',iMsg:'Socio'},{k:'sucSede',iMsg:'Sede'},{k:'debBal',iMsg:'Monto del retiro'}
        ]
      }
    });
  },
}

JCyp.Cuo={
  opens:function(){
    var cont=$M.Ht.cont;
    var Cols=[
    {H:'Pendiente',k:'balDue',format:'$'},
    {H:'$ Cuota',k:'cuoV',format:'$'},
    {H:'Vencimiento',k:'lineDue',dateFormat:$V.cypDateForm},
    {H:'Contrato',k:'docEntry'},
    {H:'# Cuota',k:'lineNum',format:'number'},
    {H:'Cliente',k:'cardName'},
    {H:'Resp.',k:'slpId',_g:$Tb.oslp},
    {H:'Cobrador',k:'lgcId',_g:$Tb.crdLgc},
    {H:'Sede',k:'sucSede',_g:$Tb.cypSede},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'cuo/opens',inputs:$1.G.filter(),tbSerie:'N',
    view:'N',fOpts:null,
    TD:Cols,
    },cont);
  },
}
//mast
JCyp.Sede={
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[
      {H:'Nombre',k:'name'},
      {H:'Saldo',k:'balTotal',format:'$'},
      {H:'Responsable',k:'prsAssg'},
      {H:'Apertura',k:'docOpen'},
      {H:'Dirección',k:'address'},
      {H:'Teléfono',k:'phone1'},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'sede',inputs:$1.G.filter(),tbSerie:'N',
    edit:'Y',tbSerie:'cypSede',vidn:'vid',fOpts:JCyp.Sede.opts,docUpd:'userDate',
    viewTo:function(L){
      return $M.to('cypSede.history','vid:'+L.vid,'r');
    },
    TD:Cols,
    },cont);
  },
  form:function(){
    var cont=$M.Ht.cont; var Pa=$M.read(); var D={};
    $Api.get({f:Api.Cyp.pr+'sede/form',loadVerif:!Pa.vid, inputs:'vid='+Pa.vid,loade:cont,func:function(Jr){
      if(Jr.vid){ D=Jr; }
      $Api.form2({api:Api.Cyp.pr+'sede',AJs:D.AJs,PUTid:Pa.vid,JrD:D,jsF:'Y',
      func:function(Jr2,o){
        $Sysd.TbUpd('cypSede',o);
      },
        tbH:[
        {L:'Nombre',wxn:'wrapx4',I:{lTag:'input',name:'name'}},
        {L:'Responsable',wxn:'wrapx4',I:{lTag:'input',name:'prsAssg'}},
        {L:'Apertura',req:'Y',wxn:'wrapx8',I:{lTag:'date',name:'docOpen'}},
        {L:'Saldo Inicial',req:'Y',wxn:'wrapx8',I:{lTag:'$',name:'balIni'}},
        {divLine:1,L:'Dirección',wxn:'wrapx4',I:{lTag:'input',name:'address'}},
        {L:'Teléfono',wxn:'wrapx8',I:{lTag:'input',name:'phone1'}},
        ],
      },cont);
    }});
  },
  history:function(){
    var cont=$M.Ht.cont;
    var Cols=[
      {H:'Entrada',k:'debBal',format:'$'},
      {H:'Salida',k:'creBal',format:'$'},
      {H:'Origen',k:'tt'},
      {H:'Fecha',k:'docDate'},
      {H:'Tercero',k:'cardName'},
    ];
    $Doc.tbList({api:Api.Cyp.pr+'sede/history',inputs:$1.G.filter(),view:'N',
    TD:Cols,
    },cont);
  },
}

JCyp.Fx={
  round:function(val){
    return $js.round(val,$V.jcypDecm);;
  },
  cuotaPeri:function(capAt,iTasa){
    return JCyp.Fx.round(capAt*iTasa/100);
  },
  cuotaFija:function(P){
    //metodo frances o constante
    it=P.iTasa/100;
    np=JCyp.Fx.toPers(P.cuoUdm);
    if(P.docType=='frances'){}
    else{ it=JCyp.Fx.nom2EA(it,np); }
    console.log('Frec:'+P.cuoUdm+', np:'+np+', i:'+P.iTasa+'---> EA'+it);
    nP=P.cuoNum*1;
    v1=it*(Math.pow(1+it,nP));
    v2=(Math.pow(1+it,nP))-1;
    c= P.vPre*(v1/v2);
    return JCyp.Fx.round(c/12); //x es anual
  },
  toPers:function(pers){
    //pers=$1.q('name["cuoUdm"]').value;
    np=1;
    switch(pers){
      case 'month': np=12; break;
      case 'wquin': np=24; break;
      case 'week': np=52; break;
      case 'week2': np=26; break;
      case 'day': np=365.25; break;
      case 'bim': np=6; break;
      case 'trim': np=4; break;
      case 'sem': np=2; break;
    }
    return np;
  },
  nom2EA:function(tasa,n){
    //EA=[ (1+ (i/n))^n) -1
    return (Math.pow(1+(tasa/n),n))-1;
  }
}

$M.liAdd('cyp',[
  {_lineText:'Cobros y Prestamos'},
  {k:'cypCrd',t:'Clientes',ini:{btnGo:'cypCrd.form',f:'cypCrd',g:JCyp.Crd.get}},
  {k:'cypCrd.form',t:'Cliente',ini:{g:JCyp.Crd.form}},
  {k:'cypCso',t:'Socios',ini:{btnGo:'cypCso.form',f:'cypCso',g:JCyp.Cso.get}},
  {k:'cypCso.form',t:'Socio',ini:{g:JCyp.Cso.form}},

  {k:'cypCon',t:'Prestamos',ini:{btnGo:'cypCon.form',f:'cypCon',g:JCyp.Con.get}},
  {k:'cypCon.form',t:'Prestamo',ini:{g:JCyp.Con.form}},
  {k:'cypCon.view',t:'Prestamo',noTitle:'Y',ini:{g:JCyp.Con.view}},

  {k:'cypAps',t:'Aportes Socios',ini:{f:'cypAps',fNew:JCyp.Aps.form,gyp:JCyp.Aps.get}},
  {k:'cypRds',t:'Retiros Socios',ini:{f:'cypRds',fNew:JCyp.Aps.form,gyp:JCyp.Rds.get}},

  {k:'cypRcv',t:'Pagos',ini:{btnGo:'cypRcv.form',f:'cypRcv',gyp:JCyp.Rcv.get}},
  {k:'cypRcv.form',t:'Pago',ini:{g:JCyp.Rcv.form}},
  {k:'cypRcv.view',t:'Pago',noTitle:'Y',ini:{g:JCyp.Rcv.view}},


  {k:'cypCuo.opens',t:'Cobros Pendientes',ini:{f:'cypCuo.opens',g:JCyp.Cuo.opens}},
  /*cnf*/
  {k:'cypSede',t:'Sedes',ini:{btnGo:'bt.cypSede.form',gyp:JCyp.Sede.get}},
  {k:'cypSede.form',t:'Sede',ini:{g:JCyp.Sede.form}},
  {k:'cypSede.history',t:'Historial Movimiento Dinero',ini:{g:JCyp.Sede.history}},
],{prp:{mdlActive:'cyp'}});

$JsV.liAdd([
  {kMdl:'cyp',kObj:'cypZone',mdl:'a1',liTxtG:'Zonas',liTxtF:'Zona'},
  {kMdl:'cyp',kObj:'cypRoute',mdl:'a1',liTxtG:'Rutas',liTxtF:'Ruta'},
  {kMdl:'cyp',kObj:'cypRecClass',mdl:'a1',liTxtG:'Concepto Recargos',liTxtF:'Concepto Recargo'},
],{});
