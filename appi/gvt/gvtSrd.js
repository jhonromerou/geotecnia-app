CNF.SERIE.GVT_SRD = 'gvtSrd'

CNF.AG.GVT_SRD = {id: 'gvtSrd', t: 'Devolución de Venta', mode: CNF.AG_MODE_RW}

$M.registerAG([CNF.AG.GVT_SRD]);


CNF.URL.GVT_SRD = {id: 'gvtSrd', ac: CNF.AG.GVT_SRD, t: 'Devolución de Venta', type: 'list'}
CNF.URL.GVT_SRD_FORM = {id: 'gvtSrd.form', ac: CNF.AG.GVT_SRD, t: 'Devolución de Venta', type: 'form'}
CNF.URL.GVT_SRD_VIEW = {id: 'gvtSrd.view', ac: 'gvtSrd', title: 'Devolución de venta', type: 'doc'}

CNF.URL.GVT_SRD.drawFilter = (ctx) => {
    return $Doc.filterComponent({action: Gvt.Srd.get}, [
        {id: FILTER_CNF.CRT.DATE_FROM},
        {id: FILTER_CNF.CRT.DATE_TO},
        {id: FILTER_CNF.CRT.DOC_STATUS, values: FILTER_CNF.OPTS.DOC_STATUS_CN},
        {id: FILTER_CNF.CRT.DOC_SERIES, values: $Tb.docSerie['gvtSrd']},
        {id: FILTER_CNF.CRT.DOC_NUMBER},
        {id: FILTER_CNF.CRT.CARD_NAME},
        {
            id: FILTER_CNF.CRT.DOC_ORDER,
            values: FILTER_CNF.groupingOrders([FILTER_CNF.ORDERS.BY_CREATED,
                FILTER_CNF.ORDERS.BY_DOC_DATE,
                FILTER_CNF.ORDERS.BY_DOC_NUMBER])
        }
    ]);
}

Gvt.Srd = {
    OLg: function (L) {
        var Li = [];
        var n = 0;
        var ab = new $Doc.liBtn(Li, L, {api: Api.Gvt.pr + 'srd', tbSerie: CNF.SERIE.GVT_SRD});
        ab.add('v');
        ab.add('E', {canEdit: (L.docStatus == 'S')});
        if (L.docStatus == 'D') {
            Li.push({
                k: 'statusS', ico: 'fa fa-paper-plane-o', textNode: ' Enviar Documento', P: L, func: function (T) {
                    divL = false;
                    //var divL=$1.T.divL({divLine:1,wxn:'wrapx1',supText:'Defina Almacen',L:'Almacen',I:{tag:'select','class':'jsFields',name:'whsIdSep',opts:$Tb.itmOwhs}});
                    $Doc.statusDefine({
                        reqMemo: 'N',
                        docEntry: T.P.docEntry,
                        api: Api.Gvt.pr + 'srd/statusSend',
                        node: divL,
                        text: 'Se va a enviar el documento, no se puede modificar.'
                    });
                }
            });
        }
        if (L.docStatus == 'S') {
            var divL = $1.T.divL({
                divLine: 1,
                wxn: 'wrapx1',
                subText: 'Defina Almacen',
                L: 'Almacen',
                I: {tag: 'select', 'class': 'jsFields', name: 'whsId', opts: $Tb.itmOwhs}
            });
            Li.push({
                k: 'statusC', ico: 'fa fa-lock', textNode: ' Cerrar Documento', P: L, func: function (T) {
                    $Doc.statusDefine({
                        docEntry: T.P.docEntry,
                        api: Api.Gvt.pr + 'srd/statusClose',
                        reqMemo: 'N',
                        node: divL,
                        text: 'Se va cerrar el documento. Defina una de bodega de ingreso para la mercancia.'
                    });
                }
            });
        }
        ab.add('AC');
        ab.add('R');
        ab.add('L');
        return $Opts.add(CNF.SERIE.GVT_SRD, Li, L);
    },
    opts: function (P, pare) {
        Li = {Li: Gvt.Srd.OLg(P.L), PB: P.L, textNode: P.textNode};
        var mnu = $1.Menu.winLiRel(Li);
        if (pare) {
            pare.appendChild(mnu);
        }
        return mnu;
    },
    get: function () {
        var cont = $M.Ht.cont;
        $Doc.tbList({
            api: Api.Gvt.pr + 'srd', inputs: $1.G.filter(),
            fOpts: Gvt.Srd.opts, view: 'Y', docBy: 'userDate',
            tbSerie: CNF.SERIE.GVT_SRD,
            TD: [
                {H: 'Estado', k: 'docStatus', _V: 'docStatusAll'},
                {H: 'Fecha', k: 'docDate'},
                {H: 'Cliente', k: 'cardName'},
                {H: 'Total', k: 'docTotal', format: '$'}
            ],
            tbExport: {ext: 'xlsx', fileName: 'Devolución de Mercancia - Venta'}
        }, cont);
    },
    form: function () {
        var D = $Cche.d(0, {});
        var Pa = $M.read();
        var cont = $M.Ht.cont;
        var jsF = $Api.JS.cls;
        var AJs = {};
        $Api.get({
            f: Api.Gvt.pr + 'srd/form',
            inputs: 'docEntry=' + Pa.docEntry,
            loadVerif: !Pa.docEntry,
            loade: cont,
            func: function (Jr) {
                if (Jr.docEntry) {
                    D = Jr;
                }
                if (!D.docDate) {
                    D.docDate = $2d.today;
                }
                var Dire = Addr.basic(D, null, {nodes: 'Y'});
                var crdVal = (D.cardId) ? D.cardName : '';
                $Doc.form({
                    tbSerie: CNF.SERIE.GVT_SRD,
                    cont: cont,
                    jsF: jsF,
                    docEdit: Pa.docEntry,
                    POST: Api.Gvt.pr + 'srd',
                    AJs: D.AJs,
                    func: D.func,
                    HLs: [
                        {
                            lTag: 'card',
                            L: 'Cliente',
                            wxn: 'wrapx3',
                            req: 'Y',
                            I: {
                                topPare: cont,
                                D: D,
                                fie: 'slpId,pymId,countyCode,cityCode,address',
                                AJsPut: ['cardName']
                            }
                        },
                        {lTag: 'date', L: 'Fecha', wxn: 'wrapx8', req: 'Y', I: {name: 'docDate', value: D.docDate}},
                        {
                            lTag: 'select',
                            L: 'Condic. Pago',
                            wxn: 'wrapx8',
                            I: {name: 'pymId', selected: D.pymId, opts: $Tb.gfiOpym}
                        },
                        {lTag: 'slp', L: 'Resp. Venta', wxn: 'wrapx8', I: {name: 'slpId', selected: D.slpId}},
                        {divLine: 1, L: 'Departamento', wxn: 'wrapx4', Inode: Dire[1]},
                        {L: 'Ciudad', wxn: 'wrapx4', Inode: Dire[2]},
                        {L: 'Dirección', wxn: 'wrapx2', Inode: Dire[3]},
                        {divLine: 1, lTag: 'input', L: 'Ref 1', wxn: 'wrapx8', I: {name: 'ref1', value: D.ref1}},
                        {lTag: 'input', L: 'Ref 2', wxn: 'wrapx8', I: {name: 'ref2', value: D.ref2}},
                        {
                            lTag: 'select',
                            L: 'Almacen',
                            wxn: 'wrapx8',
                            I: {name: 'whsId', selected: D.whsId, opts: $Tb.itmOwhs},
                            noAdd: $MdlStatus.isY('ivt')
                        },
                        {
                            divLine: 1,
                            lTag: 'textarea',
                            L: 'Detalles',
                            wxn: 'wrapx1',
                            I: {name: 'lineMemo', textNode: D.lineMemo}
                        }
                    ],
                    tbL: {
                        xNum: 'Y', xDel: 'Y', docTotal: 'Y', L: D.L, itmSea: 'sellIvt', bCode: 'Y', uniqLine: 'Y',
                        kTb: 'gvtItmL', AJs: [{k: 'sellFactor', a: 'numFactor'}],
                        kFie: 'itemCode,itemName,price,quantity,udm,priceLine,lineText'
                    }
                });
            }
        });
    },
    view: function () {
        var cont = $M.Ht.cont;
        var Pa = $M.read();
        var jsF = $Api.JS.cls;
        $Api.get({
            f: Api.Gvt.pr + 'srd/view', inputs: 'docEntry=' + Pa.docEntry, loade: cont, func: function (Jr) {
                var tP = {
                    tbSerie: CNF.SERIE.GVT_SRD, D: Jr,
                    btnsTop: {ks: 'edit,print,logs,statusS,statusN,statusC,viewDac,', icons: 'Y', Li: Gvt.Srd.OLg},
                    THs: [
                        {sdocNum: 'Y'}, {sdocTitle: 'Y', cs: 7, ln: 1},
                        , {t: 'Estado', k: 'docStatus', _V: 'docStatusAll'}, {middleInfo: 'Y'}, {logo: 'Y'},
                        {t: 'Fecha', k: 'docDate'},
                        {k: 'licTradType', _V: 'licTradType'}, {k: 'licTradNum', ln: 1},
                        {k: 'cardName', cs: 4}, {k: 'slpId', cs: 2, ln: 1, _gTb: 'oslp'}, {
                            k: 'whsId',
                            _gTb: 'itmOwhs',
                            cs: 2,
                            ln: 1
                        },
                        {t: 'Ref. 1', k: 'ref1'}, {t: 'Ref.2 ', k: 'ref2', ln: 1, cs: 5},
                        {
                            k: 'lineMemo',
                            cs: 8,
                            addB: $1.t('b', {textNode: 'Detalles:\u0020'}),
                            HTML: 1,
                            Tag: {'class': 'pre'}
                        },
                    ],
                    mTL: [
                        {
                            L: 'L', fieldset: 'Lineas', tb: {style: 'fontSize:14px'}, TLs: [
                                {t: 'Código', k: 'itemCode', fText: Itm.Txt.code},
                                {t: 'Descripción', k: 'itemName', fText: Itm.Txt.name},
                                {t: 'Precio', k: 'price', format: '$'},
                                {t: 'Cant.', k: 'quantity', format: 'number'},
                                {t: 'Total', k: 'priceLine', format: '$'},
                                {t: 'Detalles', k: 'lineText'}
                            ]
                        }
                    ],
                    footTotal: {cs1: 3, cs2: 5},
                    TFs: null
                };
                $Doc.view(cont, tP);
            }
        });
    },
}


$M.registerUrls({module: CNF.MDL.GVT_SELL}, [
    {MKEY: CNF.URL.GVT_SRD, ini: {btnGo: CNF.URL.GVT_SRD_FORM.id, gyp: Gvt.Srd.get}},
    {MKEY: CNF.URL.GVT_SRD_FORM, ini: {g: Gvt.Srd.form}},
    {MKEY: CNF.URL.GVT_SRD_VIEW, ini: {g: Gvt.Srd.view}},
])