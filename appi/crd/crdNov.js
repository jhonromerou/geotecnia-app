// package: unclicc.com.fe
$V.Mdls['crd']={t:'Socios Negocios',ico:'fa fa-handshake-o'};

_Fi['crdNov']=function(wrap){
	$Doc.filter({func:$crd.Nov.get,docNum:'Y'},[
  {k:'docStatus',opts:$V.docStatusOPC,selected:'O'},{k:'d1'},{k:'d2'},
  {L:'Tipo',wxn:'wrapx8',I:{lTag:'select',name:'A.docType',opts:$JsV.crdNovType}},
  {L:'Origen',wxn:'wrapx8',I:{lTag:'select',name:'A.docOri',opts:$JsV.crdNovOri}},
  {L:'Prioridad',wxn:'wrapx8',I:{lTag:'select',name:'A.docPrio',opts:$JsV.crdNovPrio}},
  {k:'ordBy'},
  {divLine:1,L:'Asunto',wxn:'wrapx4',I:{lTag:'input',name:'A.docTitle(E_like3)'}},
  {k:'card',f:'C.cardName'},
  {L:'Venc.',wxn:'wrapx8',I:{lTag:'date',name:'A.dueDate(E_mayIgual)'}},
  {L:'Venc. Corte',wxn:'wrapx8',I:{lTag:'date',name:'A.dueDate(E_menIgual)'}},
  {L:'Contacto',wxn:'wrapx8',I:{lTag:'input',name:'A.cntText(E_like3)'}},
  {L:'Responsable',wxn:'wrapx8',I:{lTag:'select',name:'A.slpId',opts:$Tb.oslp}},
	],wrap);
};
_Fi['crdRep.nov']=function(wrap){
	opt1=[{k:'C',v:'General'},{k:'T',v:'Con Tareas'}];
  $Doc.filter({func:$crd.Rep.nov},[
    {k:'rep',opts:opt1},
    {k:'d1',value:$2d.last7},{k:'d2',value:$2d.today},{k:'docStatus',opts:$V.docStatusOPC,selected:'O'},
    {L:'Tipo',wxn:'wrapx8',I:{lTag:'select',name:'A.docType',opts:$JsV.crdNovType}},
    {L:'Origen',wxn:'wrapx8',I:{lTag:'select',name:'A.docOri',opts:$JsV.crdNovOri}},
    {L:'Prioridad',wxn:'wrapx8',I:{lTag:'select',name:'A.docPrio',opts:$JsV.crdNovPrio}},
    {divLine:1,L:'Asunto',wxn:'wrapx4',I:{lTag:'input',name:'A.docTitle(E_like3)'}},
    {k:'card'},
    {L:'Venc.',wxn:'wrapx8',I:{lTag:'date',name:'A.dueDate(E_mayIgual)'}},
    {L:'Venc. Corte',wxn:'wrapx8',I:{lTag:'date',name:'A.dueDate(E_menIgual)'}},
    {L:'Contacto',wxn:'wrapx8',I:{lTag:'input',name:'A.cntText(E_like3)'}},
    {L:'Responsable',wxn:'wrapx8',I:{lTag:'select',name:'A.slpId',opts:$Tb.oslp}},
    ],wrap);
};

$crd.Nov={
  OLg:function(L){
    var Li=[];
    var ab=new $Doc.liBtn(Li,L,{api:Api.Crd.pr+'nov',tbSerie:'crdNov'});
    ab.add('v');
    ab.add('E',{canEdit:true});
    return $Opts.add('crdNov',Li,L);
  },
  opts:function(P,pare){
    Li={Li:$crd.Nov.OLg($js.clone(P.L)),PB:P.L,textNode:P.textNode};
    var mnu=$1.Menu.winLiRel(Li);
    if(pare){ pare.appendChild(mnu); }
    return mnu;
  },
  get:function(){
    var cont=$M.Ht.cont;
    var Cols=[{H:'Estado',k:'docStatus',_g:$V.docStatusAll},
    {H:'Fecha',k:'docDate',dateText:'mmm d'},
    {H:'Estado',k:'docStatus',_g:$V.docStatusOPC},
    {H:'Tipo',k:'docType',_g:$JsV.crdNovType},
    {H:'Asunto',k:'docTitle'},
    {H:'T',k:'lineNums',fTag:function(L){
      if(L.lineNums>0){ return $1.t('progress',{value:L.lineNumsComp/L.lineNums,style:'width:40px',title:L.lineNumsComp+' de '+L.lineNums}); }
      else{ return ''; }
    }},
    {H:'Cliente',k:'cardName'},
    {H:'Responsable',k:'slpId',_g:$Tb.oslp},
    {H:'Vencimiento',k:'dueDate'},
    {H:'Origen',k:'docOri',_g:$JsV.crdNovOri},
    {H:'Prioridad',k:'docPrio',_g:$JsV.crdNovPrio},
    ];
    $Doc.tbList({api:Api.Crd.pr+'nov',inputs:$1.G.filter(),
    fOpts:$crd.Nov.opts,view:'Y',docBy:'userDate',
    _fView:(L,td)=>{
      $1.t('a',{href:$M.to('crdNov.view','docEntry:'+L.docEntry,'r'),textNode:'','class':'fa fa-eye'},td);
    },
    TD:Cols,
    tbExport:{ext:'xlsx'}
    },cont);
  },
  form:function(){
    var D=$Cche.d(0,{});
    var cont=$M.Ht.cont;
    D.docDate=$2d.today;
    var cont =$M.Ht.cont; var Pa=$M.read();
		$Api.get({f:Api.Crd.pr+'nov/form',loadVerif:!Pa.docEntry,inputs:'docEntry='+Pa.docEntry,loade:cont,errWrap:cont,func:function(Jr){
			if(Jr.docEntry){ D=Jr; }
      var jsF=$Api.JS.cls;
      var card=$1.lTag({tag:'card','class':'_crd',cardType:'C',topPare:cont,D:D,fie:'slpId'});
      $Api.form2({api:Api.Crd.pr+'nov',AJs:D.AJs,PUTid:Pa.docEntry,JrD:D,vidn:'docEntry',to:'crdNov.view',midTag:'Y',
      tbH:[
        {divLine:1,L:'Tercero',req:'Y',wxn:'wrapx2',Inode:card},
        {L:'Responsable',req:'Y',wxn:'wrapx8',I:{lTag:'slp',name:'slpId',selected:D.slpId,'class':$Api.Sea.clsBox,k:'slpId','class':jsF}},
        {L:'Contacto',wxn:'wrapx3',I:{lTag:'input',name:'cntText',value:D.cntTxt}},
        {divLine:1,L:'Asunto',wxn:'wrapx8_1',req:'Y',I:{lTag:'input','class':jsF,name:'docTitle',value:D.docTitle}},
        {L:'Tipo',wxn:'wrapx8',req:'Y',I:{lTag:'select',name:'docType',selected:D.docType,opts:$JsV.crdNovType,'class':jsF}},
        {divLine:1,L:'Estado',wxn:'wraxp8',req:'Y',I:{lTag:'select',name:'docStatus',opts:$V.docStatusOPC,'class':jsF,noBlank:'Y'}},
        {L:'Fecha',wxn:'wrapx8',req:'Y',I:{lTag:'date',name:'docDate',value:D.docDate,'class':jsF}},
        {L:'Vencimiento',wxn:'wrapx8',I:{lTag:'date',name:'dueDate',value:D.dueDate,'class':jsF}},
        {L:'Origen',wxn:'wrapx8',I:{lTag:'select',name:'docOri',selected:D.docOri,opts:$JsV.crdNovOri,'class':jsF}},
        {L:'Prioridad',wxn:'wrapx8',I:{lTag:'select',name:'docPrio',selected:D.docPrio,opts:$JsV.crdNovPrio,'class':jsF}},
        {divLine:1,L:'Descripción',wxn:'wrapx1',I:{tag:'textarea',name:'longDesc',textNode:D.longDesc,'class':'tareamulti '+jsF}}
      ],
      reqFields:{
        D:[{k:'cardId',iMsg:'Tercero'},{k:'slpId',iMsg:'Responsable'},{k:'docTitle',iMsg:'Asunto'},{k:'docType',iMsg:'Tipo'},{k:'docStatus',iMsg:'Estado'},{k:'docDate',iMsg:'Fecha'}]},
        L:[{k:'lineText',iMsg:'Actividad'}]
      },cont);
      midCont=$1.q('.midCont',cont);
      fie=$1.T.fieset({L:{textNode:'Actividades'}},midCont);
			var tb=$1.T.table(['','','Actividad','Responsable','Vencimiento'],0,fie);
			var tBody=$1.t('tbody',0,tb);
			$1.T.btnFa({faBtn:'fa-plus-circle',textNode:'Añadir',func:function(){ trA({},tBody); }},midCont);
			function trA(L,tBody){
        var tr=$1.t('tr',{'class':$Api.JS.clsL},tBody);
        jsFLN=$Api.JS.clsLN;
        var td=$1.t('td',0,tr);
				$1.Move.btns({},td);
        var td=$1.t('td',0,tr);
				$1.lTag({tag:'ckLabel',I:{name:'completed','class':jsFLN,checked:(L.completed=='Y')}},td);
				var td=$1.t('td',0,tr);
				$1.lTag({tag:'input',name:'lineText','class':jsFLN,value:L.lineText,style:'width:420px',maxLen:300},td);
				var td=$1.t('td',0,tr);
				$1.lTag({tag:'input',name:'lineAssg','class':jsFLN,value:L.lineAssg},td);
				var td=$1.t('td',0,tr);
				$1.lTag({tag:'date',name:'lineDue','class':jsFLN,value:L.lineDue,style:'width:140px'},td);
        $1.lineDel(L,{},$1.t('td',0,tr));
			}
			if(Jr.L && !Jr.L.errNo){ for(var i2 in Jr.L){
				trA(Jr.L[i2],tBody);
			} }
      
    }});
  },
  view:function(){
    var cont=$M.Ht.cont; var Pa=$M.read(); var jsF=$Api.JS.cls;
    $Api.get({f:Api.Crd.pr+'nov/view',inputs:'docEntry='+Pa.docEntry,loade:cont,func:function(Jr){
      midCont=$1.t('div');
      var tP={D:Jr,midCont:midCont,
        main:$crd.Nov.OLg,
        THs:[
          {tlabel:'Tipo',k:'docType',_g:$JsV.crdNovType,cs:2},
          {tlabel:'Origen',k:'gOri',_g:$JsV.crdNovOri,ln:1,cs:2},
          {tlabel:'Prioridad',k:'gPrio',_g:$JsV.crdNovPrio,ln:1,cs:2},
          {t:'Estado',k:'docStatus',_g:$V.docStatusOPC,ln:1},
          {t:'Asunto',k:'docTitle',cs:5},
          {t:'Fecha',k:'docDate',ln:1},
          {k:'licTradType',_g:$V.licTradType},
          {k:'licTradNum',ln:1},
          {k:'cardName',cs:4,ln:1},
          {t:'Vencimiento',k:'dueDate',ln:1},
          {t:'Contacto',k:'cntText',cs:5},
          {k:'slpId',_g:$Tb.oslp,ln:1,cs:2},
          {k:'longDesc',cs:8,tlabel:'Descripción:'},
        ],
      };
      tP.Tabs=[
        {k:'plugsCmts',P:{tt:'crdNov',tr:Jr.docEntry,getList:'Y'}},
        {k:'plugsFiles',P:{tt:'crdNov',tr:Jr.docEntry,getList:'Y'}},
      ];
      $Doc.view(cont,tP);
      if(Jr.lineNums>0){
        var tb=$1.T.table(['','Actividad','Responsable','Vencimiento']);
        tb.classList.add('table_x100');
        $1.T.fieset({L:{textNode:'Actividades'}},midCont,tb);
        tb.parentNode.insertBefore($1.t('progress',{value:Jr.lineNumsComp/Jr.lineNums}),tb);
        var tBody=$1.t('tbody',0,tb);
        if(Jr.L && !Jr.L.errNo){ for(var i2 in Jr.L){ L=Jr.L[i2];
          var tr=$1.t('tr',0,tBody);
          td=$1.t('td',{style:'width:40px'},tr);
          $1.lTag({tag:'ckLabel',I:{disabled:'disabled',checked:(L.completed=='Y')}},td);
          $1.t('td',{textNode:L.lineText,style:'width:420px'},tr);
          $1.t('td',{textNode:L.lineAssg},tr);
          $1.t('td',{textNode:L.lineDue},tr);
        } }
      }
    }});
  }
}

$crd.Rep.nov=function(){
  $Api.Rep.base({f:Api.Crd.pr+'rep/nov',inputs:$1.G.filter(),
  V_C:[
    {t:'No.',k:'docEntry'},{t:'Estado',k:'docStatus',_g:$V.docStatusOPC},
    {t:'Tipo',k:'docType',_g:$JsV.crdNovType},
    {t:'Origen',k:'docOri',_g:$JsV.crdNovOri},
    {t:'Prioridad',k:'docPrio',_g:$JsV.crdNovPrio},
    {t:'Fecha',k:'docDate',fType:'date'},
    {t:'Vencimiento',k:'dueDate',fType:'date'},
    {t:'Asunto',k:'docTitle'},
    {t:'Descripcion',k:'lineMemo'},
    {t:'Responsable',k:'slpId',_g:$Tb.oslp},
    {t:'Cliente',k:'cardName'},
    {t:'Contacto',k:'cntText'},
    {t:'Tareas',k:'lineNums',format:'number'},
    {t:'Completas',k:'lineNumsComp',format:'number'},
  ],
  V_T:[
    {t:'No.',k:'docEntry'},{t:'Estado',k:'docStatus',_g:$V.docStatusOPC},
    {t:'Tipo',k:'docType',_g:$JsV.crdNovType},
    {t:'[x]',k:'completed',_g:$V.YN},
    {t:'Actividad',k:'lineText'},
    {t:'Responsable',k:'lineAssg'},
    {t:'Vence',k:'lineDue'},
    {t:'Completa?',k:'completAt',fText:(L)=>{
      return (L.completed=='Y')?L.completAt:'Pendiente';
    }},
    {t:'Origen',k:'docOri',_g:$JsV.crdNovOri},
    {t:'Prioridad',k:'docPrio',_g:$JsV.crdNovPrio},
    {t:'Fecha',k:'docDate',fType:'date'},
    {t:'Vencimiento',k:'dueDate',fType:'date'},
    {t:'Asunto',k:'docTitle'},
    {t:'Descripcion',k:'lineMemo'},
    {t:'Responsable',k:'slpId',_g:$Tb.oslp},
    {t:'Cliente',k:'cardName'},
    {t:'Contacto',k:'cntText'},
    {t:'Tareas',k:'lineNums',format:'number'},
    {t:'Completas',k:'lineNumsComp',format:'number'},
  ],
},$M.Ht.cont);
}
$JsV._i({kMdl:'crdNov',kObj:'crdNovOri',mdl:'a1',liTxtG:'Origenes Novedades',liTxtF:'Origen Novedad'});
$JsV._i({kMdl:'crdNov',kObj:'crdNovType',mdl:'a1',liTxtG:'Tipos Novedades',liTxtF:'Tipo Novedad'});
$JsV._i({kMdl:'crdNov',kObj:'crdNovPrio',mdl:'a1',liTxtG:'Prioridades Novedades',liTxtF:'Prioridad Novedad'});

$M.kauAssg('crd',[
	{k:'crdNov',t:'Novedades Socios Negocios'},
	{k:'crdNov.sup',t:'Novedades Socios Negocios - Supervisor'}
]);

$M.liAdd('crd',[
	{k:'crdNov',t:'Novedades Terceros',kau:'crdNov',ini:{f:'crdNov', btnGo:'crdNov.form',gyp:$crd.Nov.get }},
	{k:'crdNov.form',t:'Novedad de Tercero', kau:'crdNov',ini:{g:$crd.Nov.form }},
	{k:'crdNov.view',noTitle:'Y',t:'Novedad de Tercero', kau:'crdNov',ini:{g:$crd.Nov.view }},
],{prp:{mdlActive:'crdNov'}});
	
$M.liRep('crd',[
	{_lineText:'_REP'},
	{k:'crdRep.nov',t:'Reporte de Novedades', kauAssg:'crdNov.sup',ini:{f:'crdRep.nov'}}
],{repM:['crd']});
