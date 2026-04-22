
$M.liReset(true);
$M.iniSet={
nty:'N',help:'N',menu:'L',
mliDel:['sysreports']};

$M.liTable([
	{
		MLis:['gvp.form', 'gvtSin', 'gvtRcv', 'crd.c', 'itm.p']
	},
{mdlActive:'gvp',folId:'gvp',folName:'POS',ico:'fa fa-tags',MLis:['gvp.form','gvpTurn'],_F:[
	{mas:['gvpCr','gvpPc']}
]},

{mdlActive:'ivt',folId:'ivt',folName:'Inventarios',ico:'fa fa-cubes',folColor:'#00E',_F:[
	{folId:'Itm',folName:'Articulos',MLis:['itm.p','itm.mp','itm.se','itmSub','itmSub.gr']},
	{mdlActive:'ivtHandle', doc:['ivtIng','ivtEgr','ivtWht','ivtAwh','ivtRiv']},
	{mas:['tb.itmOwhs','jsv.itmGr','tb.itmOitp','gfiItmGr','ivtStock.mmr']},
	{mdlActive:'ivtHandle', rep:['ivtStock.p','ivtStock.pHistory','ivtStock.mp','ivtStock.mpHistory','ivtRep.ivtBal','ivtRep.rota','ivtRep.kardex']},
	{mdlActive:'wma',folId:'Cost',folName:'Costes',MLis:['ipc','ipc.mpDiff']},
	{mdlActive:'ivtGes',folId:'Bit',folName:'Gestión Lotes'},
]},
	{mdlActive:'ivtGes',fatherId:'ivtBit', acliccemprendedorMLis:['ivtBitL']},
	{mdlActive:'ivtGes',fatherId:'ivtBit', _F:[
		{doc:['ivtBitO','ivtBitE','ivtBitI','ivtBitD']},
		{rep:['ivtBit.stock','ivtBit.stock.history','ivtBitRep.down']},
		{mas:['jsv.ivtBitDType']},
	]},

{mdlActive:'gvtSell', folId:'gvtSell',folName:'Ventas',ico:'fa fa-tags',folColor:'#00E',MLis:['crd.c',],_F:[
	{doc:['gvtSop','gvtSor','gvtSdn','gvtSrd','gvtSin','gvtSnc','gvtSnd']},
	{mas:['tb.oslp','jsv.parGrC','jsv.parCprPos']},
	{rep:['finRep.cxc','finRep.estadcuenta','gvtRep.sor','gvtRep.sin']}
]},

{mdlActive:'gvtPur',folId:'gvtBuy',folName:'Compras',ico:'fa fa-shopping-cart',folColor:'#00E',MLis:['crd.s'],_F:[
	{doc:['gvtPor','gvtPdn','gvtPrd','gvtPin','gvtPnc','gvtPnd']},
	{mas:['jsv.gvtPrdRea']},
	{rep:['gvtRep.pin','finRep.cxp']}
]},
{folId:'crd',folName:'Terceros',ico:'fa fa-handshake-o',folColor:'purple',MLis:['crd.c','crd.s','cpr'],_F:[
	{mas:['jsv.parGrC','tb.oslp','jsv.parCprPos','jsv.parDpto']}
]},
{mdlActive:'crdNov',fatherId:'crd',folId:'crdNov',folName:'Seguimiento',ico:'fa fa-heartbeat',folColor:'var(--blue)',MLis:['crdNov'],_F:[
	{mas:['jsv.crdNovType','jsv.crdNovOri','jsv.crdNovPrio']},
	{rep:['crdRep.nov']}
]},

{folId:'gfi',folName:'Finanzas',ico:'fa fa-bank',MLis:['gfiBan'],_F:[
	{doc:['gvtRcv','gvtRce']},
	{mas:['gfiFdp','gfiPym','gfiTax','gfiTie','tb.gfiOcdc']},
	{rep:['finRep.ing','finRep.egr']},
]},
{mdlActive:'sgc',folId:'sgc',folName:'S.G.C',ico:'fa fa-line-chart',
MLis:[],
_F:[
	{doc:['sgcAcm','sgcPqr']},
	{mas:['jsv.sgcAcmClass','jsv.sgcPqrClass','jsv.sgcPqrClassL']},
	{mdlActive:'sgc',rep:['sgcRep.acm','sgcRep.pqr']},
]},
{folId:'acc',folName:'Contabilidad',ico:'fa fa-balance-scale',MLis:[],_F:[
	{mdlActive:'gfiAcc',doc:['gfiDcc']},
	{mas:['gfiPdc']},
	{mdlActive:'gfiAcc',rep:['gfiAccRep.daily','gfiAccRep.major','gfiAccRep.auxAcc','gfiAccRep.taxes','gfiAccRep.sf','gfiAccRep.er']},
]},

/* produccion */
{mdlActive:'wma',folId:'wma',folName:'Producción',ico:'iBg iBg_produccion',_F:[
	{doc:['wmaPdp','wmaDdp','wmaDpf','wmaDrs','wma3.oodp']},
	//{mdlActive:'wma',folId:'Pdp',folName:'Planificación',MLis:['wmaPdp','wmaPdp.consol','wmaPdp.consolGroup',/* 'wmaPdp.auxCumpProd','wmaPdp.corteProg' */]},
	//{mdlActive:'wma',folId:'Odp',folName:'Orden de Producción',MLis:['wma3.oodp','wmaOdp.docHistory','wma3.odp.tbFase']},
	{mdlActive:'wmaPep',folId:'Pep',folName:'Inventario en Proceso',ico:'fa fa_cubes'},
	{mdlActive:'wma',folId:'Bom',folName:'Composición',MLis:['wmaMpg','wmaBom','ipc','ipc.mpDiff']},
	{mdlActive:'wma',folId:'Mrp',folName:'Requerimientos',MLis:['wmaMrp.fromPdp','wmaMrp.fromPep','wmaMrp.fromOdp']},
	{mdlActive:'wmaWpt',folId:'Wpt',folName:'Partes de Trabajo',ico:'fa fa-tags',MLis:['wmaWpt.tickets','wmaWpt']},
	{mdlActive:'wma',mas:['wmaFas','wmaWop','wmaIsv','wmaMaq','wmaCif','jsv.wmaWopGr']},
	{mdlActive:'wma',rep:['wmaRep.ddp','wmaRep.ipc','wmaPdp.consol','wmaRep.wpt']}
]},
{mdlActive:'wmaPep',fatherId:'wmaPep',_F:[
	{doc:['pepWht','pepIng','pepEgr','pepAwh','pepMov','pep.lopCat']},
	{rep:['pepWhs','pepWhs.history','pepRep.handAt','pepRep.stockValue']},
]},

{mdlActive:'mpa',folId:'mpa',folName:'Gestión',ico:'fa fa-rocket',folColor:'#ffc107',MLis:['cpr','mpaCrd.list','mpaNov','mpaTas','mpaEve','mpaCas','mpaOpo'], _F:[
	{mdlActive:'mpa',mas:['jsv.mpaTasType','jsv.mpaTasPrio','jsv.mpaTasStatus','jsv.mpaNovType','jsv.mpaNovPrio','jsv.mpaNovOri',,'jsv.mpaCasType','jsv.mpaCasPrio','jsv.mpaCasStatus','jsv.mpaCasOri','jsv.mpaEveType','jsv.mpaEvePrio']},
	]
},

{kLiTable:'gfp',folId:'gfp',folName:'Finanzas Pers.',ico:'fa fa-money',folColor:'blue'},
{kLiTable:'cyp',folId:'cyp',folName:'PrestApp',ico:'fa fa-money'},

{mdlActive:'JDoc',folId:'mpa',folName:'Archivos',ico:'fa fa-archive',folColor:'#c1ff07',MLis:['JDoc.fWork.folders'], _F:[
	{mdlActive:'JDoc',mas:[]},
	]
},
{folId:'sys',folName:'Sistema',ico:'fa fa-user-secret',folColor:'green'},
{fatherId:'sys',folId:'cnf',folName:'Configuración',ico:'fa fa-cog',MLis:['cnf.mecrd','cnf.docserie','cnf.meusr'],_F:[
	{mdlActive:'sysUsers',folId:'User',folName:'Usuarios',MLis:['cnf.ousr','cnf.ousp','cnf.ousa','cnf.repAssg']}
]},

/* interfaces */
{fatherId:'sys',mdlActive:'itf',folId:'itf',folName:'Interfaces',ico:'fa fa-rocket',folColor:'red'},
{mdlActive:'itf',fatherId:'itf',_F:[
	{mdlActive:'itmImp',folId:'DT',folName:'Importaciones',ico:'fa fa-upload'},
	{mdlActive:'itmExp',folId:'DTe',folName:'Exportaciones',ico:'fa fa-download'},
]},
{mdlActive:'itmImp',fatherId:'itfDT',_F:[
	{mdlActive:'itmImp',folId:'Ivt',folName:'Inventarios',MLis:['itfDT.ivtItm','itfDT.ivtAwh','itfDT.ivtRiv']}
]},
{mdlActive:'itmExp',fatherId:'itfDTe',_F:[
	{mdlActive:'itmExp',folId:'Ivt',folName:'Inventarios',MLis:['itfE.itm']}
]},
	{folId: 'reports', folName: 'Reportes', ico: 'fa fa-line-chart', folColor: '#1fa67a',
		MLis: ['crdRep.cards', 'report/products']}
]);

$M.kauTable([
{fatherId:'adm',rootFolder:'Administración',
	L:['sysd.supersu','sysd.sumaster','sysd.suadmin']
 },
	{fatherId:'itm',rootFolder:'Articulos',
		L:['itm.p','itm.mp','itm.se','itm.bc','ipc','ipc.mpDiff'],
	},
	{fatherId:'ivt',rootFolder:'Inventario',ico:'fa fa-cubes',
		L:['ivtIng','ivtEgr','ivtWht','ivtAwh','ivtRiv','ivtStock.p','ivtStock.history'],
	},
	{fatherId:'gvt',rootFolder:'Ventas',ico:'fa fa-tags',L:['gvp','gvtSop','gvtSor','gvtSdn','gvtSrd','gvtSin','gvtSnc','gvtSnd','gvtRep','finRep.cxc','gvtRep.renta','gvtRep.sin','ivtRep.ivtBal','ivtRep.rota','ivtRep.kardex']},
	{fatherId:'gvtPur',rootFolder:'Compras',ico:'fa fa-shopping-cart',L:['gvtPor','gvtPdn','gvtPrd','gvtPin','gvtPnc','finRep.cxp','gvtPnd','gvtRep.pin']},
	{fatherId:'crd',rootFolder:'Terceros', ico:'fa fa-handshake-o',
	L:['crd.c','crd.s','crdNov','crdNov.sup']},
	{fatherId:'gfi',rootFolder:'Contabilidad y Finanzas',ico:'fa fa-tags',L:['gfi.suadmin','gfiDcc','gfiBan','gfiAccRep','gvtRcv','gvtRce','finRep.ingegr','finRep.egr','finRep.estadcuenta']},
	]);
