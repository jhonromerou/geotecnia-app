$M.sAdd([
/*admin*/
{fatherId:'mast',L:[{folId:'gvtMast',folName:'Ventas'}]},
{fatherId:'gvtMast',MLis:['sysd.slp','sysd.gvtSell']},
/*s*/
{L:[
{folId:'gvtSell',folName:'Ventas',ico:'fa fa_tags',folColor:'#00E'},
{folId:'gvtBuy',folName:'Compras',ico:'fa fa_shopcart',folColor:'#00E'}
]},
{fatherId:'gvtSell',MLis:['gvtOcvt','sellOrd.get','sellOrd.formLib','sellOrd.p','sellDlv.get','gvtRdn.get']},
{fatherId:'gvtSell',
L:[
{folId:'sellTools',folName:'Herramientas',ico:'fa fa-magic'},
{fatherId:'sellTools',MLis:['sellDlv.labelPacking']},
{folId:'sellRep',folName:'Reportes',ico:'fa fa_bolt'}
]
},
{fatherId:'sellRep',MLis:['gvtPvt.repOpenQty','gvtPvt.repItemCanceled','gvtRdn.repStatus']},
{fatherId:'gvtBuy',MLis:['gvtPor','gvtPdn']}
]);