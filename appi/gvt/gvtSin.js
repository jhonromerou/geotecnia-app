// package: unclicc.com.fe
CNF.SERIE.GVT_SIN = 'gvtSin'

CNF.AG.GVT_SIN = {id: 'gvtSin', t: 'Factura de venta', mode: CNF.AG_MODE_RW}

$M.registerAG([CNF.AG.GVT_SIN]);

CNF.URL.GVT_SIN = {id: 'gvtSin', t: 'Factura de Venta', ac: CNF.AG.GVT_SIN, drawFilter: null, type: 'list'}
CNF.URL.GVT_SIN_FORM = {id: 'gvtSin.form', t: 'Factura de Venta', ac: CNF.AG.GVT_SIN, type: 'form'}
CNF.URL.GVT_SIN_VIEW = {id: 'gvtSin.view', t: 'Factura de Venta', ac: CNF.AG.GVT_SIN, type: 'doc'}

CNF.URL.GVT_SIN.drawFilter = (ctx) => {
    return $Doc.filterComponent({action: Gvt.Sin.get,}, [
        {
            id: FILTER_CNF.CRT.DOC_ORDER,
            values: FILTER_CNF.groupingOrders([FILTER_CNF.ORDERS.BY_CREATED,
                FILTER_CNF.ORDERS.BY_DOC_DATE,
                FILTER_CNF.ORDERS.BY_DOC_NUMBER])
        },
        {id: FILTER_CNF.CRT.DATE_FROM},
        {id: FILTER_CNF.CRT.DATE_TO},
        {id: FILTER_CNF.CRT.DOC_STATUS, values: FILTER_CNF.OPTS.DOC_STATUS_CN},
        {id: FILTER_CNF.CRT.DOC_SERIES, values: $Tb.docSerie[CNF.SERIE.GVT_SIN]},
        {id: FILTER_CNF.CRT.DOC_NUMBER},
        {id: FILTER_CNF.CRT.CARD_NAME},
        {
            new_line: true,
            id: FILTER_CNF.CRT.NUMBER_GTE,
            rp: {
                with: 8,
                label: 'Saldo >=',
                name: 'A.balDue'
            }
        },
    ]);
}

Gvt.Sin = {
    OLg: function (L) {
        var Li = [];
        var ab = new $Doc.liBtn(Li, L, {api: Api.Gvt.js + 'sin', tbSerie: CNF.SERIE.GVT_SIN});
        ab.add('v');
        ab.add('down', {
            k: 'pdf',
            textNode: 'PDF',
            ico: 'fa fa-file-pdf-o',
            href: Api.Tpd.a + 'gvt/sin?docEntry=' + L.docEntry
        });
        ab.add('AC');
        ab.add('R');
        ab.add('L');
        ab.add('N', {addText: 'La anulación no afecta las cantidades de los articulos inventariables.'});
        return $Opts.add('gvtSin', Li, L);
        ;
    },
    get: function () {
        var cont = $M.Ht.cont;
        var Cols = [{H: 'Estado', k: 'docStatus', _V: 'dStatus'},
            {H: 'Fecha', k: 'docDate', dateText: 'mmm d'},
            {H: 'Cliente', k: 'cardName'},
            {H: 'Condición Pago', k: 'pymId', _gTb: 'gfiOpym'},
            {H: 'Total', k: 'docTotal', kTy: 'price'},
            {H: 'Saldo Pendiente', k: 'balDue', kTy: 'price'},
            {H: 'Responsable', k: 'slpId', _gTb: 'oslp'}];
        if ($MdlStatus.isY('DFE')) {
            Cols.splice(2, 0, {H: 'N.F.E', k: 'dfeNumber'});
        }
        $Doc.tbList({
            api: Api.Gvt.js + 'sin', inputs: $1.G.filter(),
            main: Gvt.Sin.OLg, view: 'Y', docBy: 'userDate', tbSerie: CNF.SERIE.GVT_SIN,
            TD: Cols,
            tbExport: {ext: 'xlsx', fileName: 'Listado de Facturas'}
        }, cont);
    },
    form: function () {
        var D = $Cche.d(0, {});
        if (!D.uniqLine) {
            D.uniqLine = 'Y';
        }
        var cont = $M.Ht.cont;
        var jsF = $Api.JS.cls;
        if (!D.rteIva) {
            D.rteIva = 'Y';
        }
        if (!D.rteIca) {
            D.rteIca = 'Y';
        }
        var crdVal = (D.cardId) ? D.cardName : '';
        if (!D.docDate) {
            D.docDate = $2d.today;
        }
        var Dire = Addr.basic(D, null, {nodes: 'Y'});
        $Doc.form({
            tbSerie: CNF.SERIE.GVT_SIN, calcDue: 'Y', cont: cont, POST: Api.Gvt.js + 'sin',
            func: D.func, AJs: D.AJs,
            HLs: [
                {
                    lTag: 'card',
                    L: 'Cliente',
                    wxn: 'wrapx3',
                    req: 'Y',
                    I: {
                        topPare: cont,
                        D: D,
                        fie: 'slpId,pymId,countyCode,cityCode,address,phone1,rteIva,rteIca,email',
                        AJsPut: ['cardName']
                    }
                },
                {
                    L: 'Fecha',
                    wxn: 'wrapx8',
                    req: 'Y',
                    I: {lTag: 'date', name: 'docDate', value: D.docDate, 'class': $Doc.Fx.clsdocDate}
                },
                {
                    L: 'Condic. Pago',
                    wxn: 'wrapx8',
                    I: {
                        lTag: 'select',
                        name: 'pymId',
                        selected: D.pymId,
                        opts: $Tb.gfiOpym,
                        'class': $Api.Sea.clsBox + ' ' + $Doc.Fx.clspymId,
                        k: 'pymId'
                    }
                },
                {
                    L: 'Vencimiento',
                    wxn: 'wrapx8',
                    req: 'Y',
                    I: {lTag: 'date', name: 'dueDate', value: D.dueDate, 'class': $Doc.Fx.clsdueDate}
                },
                {
                    L: 'Resp. Venta',
                    wxn: 'wrapx8',
                    I: {lTag: 'slp', name: 'slpId', selected: D.slpId, 'class': $Api.Sea.clsBox, k: 'slpId'}
                },
                {divLine: 1, L: 'Departamento', wxn: 'wrapx8', Inode: Dire[1]},
                {L: 'Ciudad', wxn: 'wrapx8', Inode: Dire[2]},
                {L: 'Dirección', wxn: 'wrapx4', Inode: Dire[3]},
                {
                    L: 'Telefono',
                    wxn: 'wrapx8',
                    I: {lTag: 'input', name: 'phone1', value: D.phone1, 'class': $Api.Sea.clsBox, k: 'phone1'}
                },
                {
                    L: 'Email',
                    wxn: 'wrapx8',
                    I: {lTag: 'input', name: 'email', value: D.email, 'class': $Api.Sea.clsBox, k: 'email'}
                },
                {divLine: 1, L: 'Ref 1', wxn: 'wrapx8', I: {lTag: 'input', name: 'ref1', value: D.ref1}},
                {L: 'Ref 2', wxn: 'wrapx8', I: {lTag: 'input', name: 'ref2', value: D.ref2}},
                {
                    L: 'Almacen',
                    wxn: 'wrapx8',
                    I: {lTag: 'select', name: 'whsId', selected: D.whsId, opts: $Tb.itmOwhs},
                    noAdd: $MdlStatus.isY('ivt')
                },
                $V.tagFromDlv,
                {divLine: 1, L: 'Detalles', wxn: 'wrapx1', I: {tag: 'textarea', name: 'lineMemo', textNode: D.lineMemo}}
            ],
            tbL: {
                xNum: 'Y',
                xDel: 'Y',
                docTotal: 'Y',
                L: D.L,
                itmSea: 'sell',
                bCode: 'Y',
                uniqLine: D.uniqLine,
                rteIva: D.rteIva,
                rteIca: D.rteIca,
                kTb: 'gvtItmL',
                AJs: [{k: 'sellFactor', a: 'numFactor'}],
                kFie: 'itemCode,itemName,price,quantity,udm,descPrc,vatId,rteId,priceLine,lineText'
            },
        });
    },
    view: function () {
        var cont = $M.Ht.cont;
        var Pa = $M.read();
        var jsF = $Api.JS.cls;
        $Api.get({
            f: Api.Gvt.js + 'sin/view', inputs: 'docEntry=' + Pa.docEntry, loade: cont, func: function (Jr) {
                if (Pa.pos && Gvp.Ticket[Pa.pos]) {
                    Gvp.Ticket[Pa.pos](Jr);
                }
                var tP = {
                    tbSerie: CNF.SERIE.GVT_SIN, D: Jr, main: Gvt.Sin.OLg,
                    THs: [
                        {sdocNum: 'Y'}, {sdocTitle: 'Y', cs: 3, ln: 1}, {
                            t: 'Fecha',
                            k: 'docDate',
                            ln: 1
                        }, {t: 'Vencimiento', k: 'dueDate', ln: 1},
                        {k: 'pymId', _gTb: 'gfiOpym', cs: 2}, {middleInfo: 'Y'}, {logo: 'Y'},
                        {t: 'Teléfono', k: 'phone1'},
                        {k: 'licTradType', _V: 'licTradType'}, {k: 'licTradNum', ln: 1},
                        {k: 'cardName', cs: 5}, {k: 'email', cs: 3, ln: 1},
                        {t: 'Ciudad', k: 'cityCode', _g: $V_Mmag}, {
                            t: 'Dirección',
                            k: 'address',
                            ln: 1,
                            cs: 3
                        }, {k: 'slpId', _gTb: 'oslp', cs: 2, ln: 1},
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
                                {t: 'Udm', k: 'sellUdm', _V: 'Udm'},
                                {t: 'Imp.', k: 'vatId', _gTb: 'otaxI'},
                                {t: 'Rte.', k: 'rteId', _gTb: 'otaxR'},
                                {t: 'Total', k: 'priceLine', format: '$'},
                                {t: 'Detalles', k: 'lineText'}
                            ]
                        }
                    ],
                    docTotals: 'Y',
                };
                $Doc.view(cont, tP);
            }
        });
    }
}


$M.registerUrls({module: CNF.MDL.GVT_SELL}, [
    {MKEY: CNF.URL.GVT_SIN, ini: {btnGo: CNF.URL.GVT_SIN_FORM.id, gyp: Gvt.Sin.get}},
    {MKEY: CNF.URL.GVT_SIN_FORM, ini: {g: Gvt.Sin.form}},
    {MKEY: CNF.URL.GVT_SIN_VIEW, ini: {g: Gvt.Sin.view}},

])
