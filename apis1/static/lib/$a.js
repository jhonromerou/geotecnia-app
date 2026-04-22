/* Relations to Mdls */
var $i = {};
var $TbV = {};
$V = {}; //Definición nomDocTypes
$TXT = {}; // variables TXT, por ejemplo itemSize=> talla o s/P
$VsU = []; //Variables Sistema para Usar {k:'$JsV.nomLeaveRea',v:'Motivos Retiro',sep:'Nómina'}
var _Fi = {};
$fCall = {};
var $VH = {};
var $ccH = {};
ADMS = {};
var Api = {};
$jSoc = {};
$M = {};
$M.li = $M.liA = {};
$Soc = {};
$4 = {};
$oTy = {};
var $5, $5c, $5f;
var $4m = {};//viewReports

$Xls_spaces = false; //define on

$tB = {};
var Attach_svrLocal = '';
$Fi = {};//Campos para filtrosvar $Extends = {} //Extenders clases, .CRD
$2io = {};
$MdlK = {}; //Cargar desde adms.ocard.mdlDef
$MdlStatus = {/* Activar y verificar estado modulos */
    K: {},
    put: function (k, v) {
        $MdlStatus.K[k] = v;
    },
    isY: function (k, cont, msg) {
        var r = false;
        if ($MdlStatus.K[k] == 'Y') {
            r = true;
        } else if ($Mdl.K[k] == 'Y') {
            r = true;
        } else {
            var tmsg = 'Módulo o Opción de módulo no disponible. ';
            tmsg += (msg) ? msg : '';
            tmsg += "\n" + 'k[' + k + ']';
            if (cont) {
                $Api.resp($1.t('div', {'class': 'pre'}, cont), {errNo: 3, text: tmsg});
            }
        }
        return r;
    },
    isActive:(k) => {
        return $MdlStatus.isY(k)
    }
};
$MCnf = {
    get: function (k) {
        var k = k.split('.');
        mdl = k[0];
        k = k[1];
        if ($MCnf[mdl] && $MCnf[mdl][k]) {
            return $MCnf[mdl][k];
        }
    },
    put: function (mdl, D) {
        if (!$MCnf[mdl]) {
            $MCnf[mdl] = {};
        }
        for (var i in D) {
            $MCnf[mdl][i] = D[i];
        }
    }
}
$Mdl = {
    K: {},
    set: function (k, v) {
        $Mdl.K[k] = v;
    },
    get: function (k, d) {
        return ($Mdl.K[k]) ? $Mdl.K[k] : d;
    },
    status: function (k, val, cont, msg) {
        var r = false;
        var v = (val) ? val : 'Y';
        if ($Mdl.K[k] == v || $MdlK[k] == v) {
            r = true;
        } else {
            var tmsg = 'Módulo o Opción de módulo no disponible. ';
            tmsg += (msg) ? msg : '';
            tmsg += "\n" + 'k[' + k + ']';
            if (cont) {
                $Api.resp($1.t('div', {'class': 'pre'}, cont), {errNo: 3, text: tmsg});
            }
        }
        return r;
    },
    McnfV: {}, /* Se obtiene de a0_mcnf */
    defCnf: function (k, v) {
        v = (v) ? v : 'Y';
        if ($Mdl.McnfV[k] == v) {
            return true;
        }
        return false;
    },
    Mcnf: function (k, v) {
        if ($Mdl.McnfV[k] == v) {
            return true;
        }
        return false;
    },
    McnfDef: function (k, v) {
        if ($Mdl.McnfV[k]) {
            $Mdl.McnfV[k] = v;
        }
    },
    Cnf: {},//Config Modules
    itemLi: {},
    itemLiD: function (k, pare, P) { /* añadir btns en tag de menu */
        if ($Mdl.itemLi[k]) {
            Li = $js.clone($Mdl.itemLi[k]);
            for (var i in Li) {
                var L = Li[i];
                if (P) {
                    L.P = P;
                }
                L.P = $js.clone(L.P);
                L.P.hrefTo = L.hrefTo;
                L.func = function (T) {
                    $M.hrefTo(T.P.hrefTo, T.P, 'to');
                }
                $1.T.btnFa(L, pare);
            }
        }
    }
}

var $Cche = {//cache app2app
    D: false,
    d: function (D, Def) {/* temporales */
        var r = false;
        if (D) {
            $Cche.D = D;
        } else {
            r = $Cche.D;
            $Cche.D = false;
            if (Def && !r) {
                r = Def;
            }
        }
        return r;
    }
}
$Vs = []; /* Variables a usar en el sistema */
$Vs.push({k: 'YN', v: 'Si/No', o: '$V.YN'});
$V = {
    N999: {},
    EmailNotifWorkers: {},
    _g: function (k, tr, df) {
        k = (k) ? k : 'null_';
        tr = (tr) ? tr : 'null_';
        t = '???';
        if (df) {
            var t = vNull(df, '???');
        } else if (typeof ($V.N999) == 'object' && $V.N999[k]) {
            t = $V.N999[k]; /*dar valor segun variable N999 */
        }
        if ($V[k] && typeof ($V[k]) == 'object') {
            if ($V[k][0] && $V[k][0].k) {
                for (var i in $V[k]) {
                    if ($V[k][i].k == tr) {
                        t = $V[k][i].v;
                        break;
                    }
                }
            } else {
                t = ($V[k][tr]) ? $V[k][tr] : t;
            }
        }
        return t;
    }
};
$V.Mdls = {}; //gvt={t:ventas,ico:'fa fa-tags',color}
$V.dStatus = {O: 'Abierto', C: 'Cerrado', N: 'Anulado'};
$V.docStatus1 = {O: 'Abierto', C: 'Cerrado'};
$V.docStatus2 = {C: 'Cerrado', N: 'Anulado'};
$V.docStatus = {D: 'Borrador', O: 'Abierto', C: 'Cerrado', N: 'Anulado'};
$V.docStatusAll = {D: 'Borrador', S: 'Enviado', O: 'Abierto', C: 'Cerrado', N: 'Anulado'};
$V.docStatusOC = {O: 'Abierto', C: 'Cerrado'};
$V.docStatusOPC = [{k: 'O', v: 'Abierto'}, {k: 'P', v: 'Pendiente'}, {k: 'C', v: 'Cerrado'}];
$V.docStatusSOC = [{k: 'S', v: 'Enviado'}, {k: 'O', v: 'Abierto'}, {k: 'C', v: 'Cerrado'}];
$V.docStatusCN = [{k: 'C', v: 'Cerrado'}, {k: 'N', v: 'Anulado'}];
$V.docStatusOCN = [{k: 'O', v: 'Abierto'}, {k: 'C', v: 'Cerrado'}, {k: 'N', v: 'Anulado'}];
$V.NY = {N: 'No', Y: 'Sí'};
$V.YN = {Y: 'Sí', N: 'No'};
$V.docSerieType = {};
$V.CRD = {};
$V.accountBank = {1: 'General'};
$V.payMethod = {
    efectivo: 'Efectivo',
    dcard: 'T. Débito',
    ccard: 'T. Crédito',
    cheque: 'Cheque',
    transfer: 'Transferencia Bancaria'
};

$V.carteraEdad = {
    '0_': {t: 'Corriente', men: 1}, '1_': {t: 'Vencido', may: 0}
};
$V.gCarteraEdad = function (days) {
    var tR = {};
    var to = typeof (days);
    if (!to.match(/(number|string)/)) {
        return tR;
    }
    for (var k in $V.carteraEdad) {
        var R = $V.carteraEdad[k];
        R.k = k;
        if (typeof (R.igual) == 'number' && days == R.igual) {
            tR = R;
            break;
        } else if (typeof (R.men) == 'number' && days < R.men) {
            tR = R;
            break;
        } else if (typeof (R.may) == 'number' && days > R.may) {
            tR = R;
            break;
        } else if (typeof (R.a) == 'number' && (days >= R.a && days <= R.b)) {
            tR = R;
            break;
        }
    }
    return tR;
}
$V.payConditions = {
    'contado_0': 'De contado', 'days_15': 'Quince días', 'days_30': '30 días'
}
$V.cardLicType = {dni: 'Documento Identificación', nit: 'NIT'};

$Xls_extDef = false; //xls export
ColMt = {//ColorMetria {opvt:[k:O, v:#00ff00}] }
    _g: function (k, kd, o) {
        var sOb = (typeof (kd) == 'object') ? kd : ColMt[kd];
        var styb = '';
        sty = '';
        if (sOb) {
            styb = 'background-color:' + _g(k, sOb) + ';';
        }
        if (typeof (o) == 'object') {
            var sty = {};
            for (var i in o) {
                sty[i] = o[i];
            }
            sty.style = styb;
            styb = sty;
        }
        return styb;
    },
    get: function (k1, k, o) {
        var sty = '';
        styb = '';
        if (ColMt[k1] && ColMt[k1][k]) {
            styb = 'background-color:' + ColMt[k1][k] + ';';
        }
        if (o) {
            var sty = {};
            if (typeof (o) == 'object') {
                for (var i in o) {
                    sty[i] = o[i];
                }
            }
            sty.style = styb;
        } else {
            sty = styb;
        }
        return sty;
    },
    base: {O: '#0F0', C: 'blue', N: '#B1B1B1'},
};

var $ChT = {
    _i: function (k) {
        $ChT[k] = [];
    },
    _g: function (k, err) {
        if ($ChT[k]) {
            return $ChT[k];
        }
        ;
        if (err) {
            var re = (err.errText) ? err : {errNo: 3, text: err};
            re._err = true;
            return re;
        }
        return {};
    },
    _a: function (k, L, WH) {
        if (WH) {
            $ChT.upd(k, L, WH);
        } else {
            if (!$ChT[k]) {
                $ChT[k] = [];
            }
            $ChT[k].push(L);
        }
    },
    upd: function (k, L, WH) {
        if (!$ChT[k]) {
            $ChT[k] = [];
            $ChT[k].push(L);
        }/* si no existe nada, agregr */
        else {
            var f = WH.f;
            var v = WH.v;
            for (var i in $ChT[k]) {
                if ($ChT[k][i][f] && $ChT[k][i][f] == v) {
                    $ChT[k][i] = L;
                    break;
                }
            }
        }
    }
};
var $Opts = {
    L: {},/*put wmaPdp */
};
$Opts.add = function (k, Li, P) {
    RORD = {};
    if (Ls = $Opts[k]) {
        for (var n in Ls) {
            tL = $js.clone(Ls[n]);
            if (P) {
                tL.P = P;
            } /* definir paramtros a pasar func(T.P) */
            if (Ls[n].func) {
                tL.func = Ls[n].func;
            }
            if (!$js.isNull(tL.orden)) {
                nk = 'k' + tL.orden;
                if (!RORD[nk]) {
                    RORD[nk] = [];
                }
                RORD[nk].push(tL);
            }
            Li.push(tL);
        }
    }
    LiN = [];
    //las que no tiene orden se agregan, las que tienen se agregan luego de n+1
    for (n1 in Li) {
        if (!Li[n1].orden) {
            LiN.push(Li[n1]);
        }//view
        nk = 'k' + (n1 * 1 + 1);
        if (RORD[nk]) {
            for (var n2 in RORD[nk]) {
                LiN.push(RORD[nk][n2]);
            } //ticket
        }
    }
    return LiN;
}

$TbExp = {/* [gvtPvt] reemplaza campos discPf=Desc. Pie Factura */
    rep: function (K, tb) {
        var R = {};
        var tb = $TbExp[tb];
        for (var i in tb) {
            var L = tb[i];
            var tk = L.k;
            var k = L.k;
            if (K[k]) {
                tk = L.t;
                var text = K[k];
                if (L._g) {
                    var O = eval(L._g);
                    text = (O && O[text]) ? O[text] : text;
                } else if (L.type == 'object') {
                    var O = eval(L.O);
                    text = (O && O[text]) ? O[text] : text;
                }
                switch (tb[i].format) {
                    case 'money':
                        text = $Str.money(text);
                        break;
                    case 'mil':
                        text = $Str.toMil(text);
                        break;
                }
                R[tk] = text;
            }
        }
        return R;
    }
}

$jSoc_iniv = function (k, P) {
    if ($jSoc[k]) {
        return eval('' + $jSoc[k]);
    } else {
        return P;
    }
}

isIE = (navigator.appName.indexOf("Explorer") === -1) ? false : true;
var isIE_8 = (navigator.appVersion.indexOf('MSIE 8.0') === -1) ? false : true;

function vNull(vari, v) {
    var nula = false;
    if (vari == null || vari == undefined) {
        nula = true;
    }
    if (nula && v) {
        return v;
    } //devuelve v examp: ???
    else if (nula == false) {
        return vari;
    } //devuelve valor de vari
    return nula;
}

function isNullo(vari, valu) {
    var nula = (vari == null || vari == undefined) ? true : false;
    if (!nula && vari == valu) {
        nula = true;
    }
    return nula;
}

var $s = {
    Headers: {},//send on Ajax
    apiURI: 'http://api0.admsistems.com',
    sys0s: 'Y',
    storage: 'L',
    iniApp: function (P, P2) {
        var P = (P) ? P : {};
        var P2 = (P2) ? P2 : {};
        for (var i in P) {
            if (i.match(/^(storage|Headers|apiURI|sys0s)$/)) {
                $s[i] = P[i];
            }
        }
        var func = function () {
            if (P2.bottomInfo == 'Y') {
                var _socInf = $1.q('#_wrapBottomSocInfo');
                _socInf.childNodes[0].innerHTML = '<b class="fa fa_handshake">' + $0s.Soc.osocName + '</b>&nbsp;&nbsp;<span class="fa fa_user">' + $0s.user + '</span>';
            }
            if (P2.func) {
                P2.func();
            }
        }
        if (0 && $s.sys0s) { //ya no se usa
            $js.getScript($y.apiURI + '/sys/0s?___ocardtooken=' + $0s.stor('ocardtooken'), {func: func});
        } else {
            func();
        }
    }
};

var $oB = {/*obj work */
    upd: function (N, O, rk) {
        /* actualiza objeto, si N.k existe, sino definir rk */
        var tk = (N.k) ? N.k : rk;
        var e = 0;
        for (var i in O) {
            if (O[i].k) {
                if (O[i].k == tk) {
                    O[i] = N;
                    e = 0;
                    break;
                } else {
                    e++;
                }
            } else if (i == tk) {
                O[i] = N;
                e = 0;
                break
            } else {
                e++;
            }
        }
        if (!O) {
            O = [];
        }
        if (e) {
            O.push(N);
        }
        return O;
    },
    get: function (k, O, R) {
        /* obtener objeto por k */
        for (var i in O) {
            if (O[i].k) {
                if (O[i].k == k) {
                    return O[i];
                }
            } else if (i == k) {
                return O[i];
            }
        }
        return R; /*return */
    },
    pus: function (k, O, Li) {
        if (!O[k]) {
            O[k] = [];
        }
        for (var i in Li) {
            O[k].push(Li[i]);
        }
    },
    push: function (O, Li) {
        if (!O) {
            O = [];
        }
        for (var i in Li) {
            O.push(Li[i]);
        }
    }
}

var _g = function (val, O, df, gKey) {
    //si pago gKey=v, y val=SI, devuelvo k=Y
    k = (k) ? k : 'null_';
    val = (val) ? val : 'null_';
    var t = vNull(df, '? ' + val + ' ?');
    if (O) {
        if (O[0] && O[0].k) {
            for (var i in O) {
                if (O[i].k == val) {
                    t = O[i].v;
                    break;
                }
                if (gKey && O[i][gKey] == val) {
                    t = O[i].k;
                    break;
                }
            }
        } else {
            t = (O[val]) ? O[val] : t;
        }
    }
    return t;
}
var _gK = function (val, O, df, gKey) {
    //si pago gKey=v, y val=SI, devuelvo k=Y
    var gKey = (gKey) ? gKey : 'v';
    k = (k) ? k : 'null_';
    val = (val) ? val : 'null_';
    var t = vNull(df, '? ' + val + ' ?');
    if (O) {
        if (O[0] && O[0].k) {
            for (var i in O) {
                if (gKey && O[i][gKey] == val) {
                    t = O[i].k;
                    break;
                }
            }
        } else {
            t = (O[val]) ? O[val] : t;
        }
    }
    return t;
}

var _gO = function (k, O, fie, def) {
    var t = (def || def == null) ? def : {};
    if (O && typeof (O) == 'object') {
        for (var i in O) {
            if (O[i].k == k) {
                t = O[i];
                break;
            }
        }
    }
    if (fie && t && t[fie]) {
        t = t[fie];
    }
    return t;
}
var _gTb = function (txt, k) {
    return _g(txt, $Tb[k], '');
}
var _gV = function () {
    return _g(txt, $V[k], '');
}

$Tb = {
    N999: {},
    _get: function (k, tr, df) {
        k = (k) ? k : 'null_';
        tr = (tr) ? tr : 'null_';
        var t = vNull(df, '???');
        if ($Tb[k]) {
            if (typeof ($Tb[k]) == 'object') {
                for (var i in $Tb[k]) {
                    if ($Tb[k][i].k == tr) {
                        t = $Tb[k][i];
                    }
                }
            } else {
                t = ($Tb[k][tr]) ? $Tb[k][tr] : t;
            }
        }
        return t;
    },
    _g: function (k, tr, df) {
        k = (k) ? k : 'null_';
        tr = (tr) ? tr : 'null_';
        if (df) {
            var t = vNull(df, '???');
        } else if (typeof ($Tb.N999) == 'object' && $Tb.N999[k]) {
            t = $Tb.N999[k]; /*dar valor segun variable N999 */
        }
        if ($Tb[k] && typeof ($Tb[k]) == 'object') {
            if ($Tb[k][0] && $Tb[k][0].k) {
                for (var i in $Tb[k]) {
                    if ($Tb[k][i].k == tr) {
                        t = $Tb[k][i].v;
                        break;
                    }
                }
            } else {
                t = ($Tb[k][tr]) ? $Tb[k][tr] : t;
            }
        }
        return t;
    }
}
$JsV = {}
$TbV = {
    _get: function (k, tr, df) {
        k = (k) ? k : 'null_';
        tr = (tr) ? tr : 'null_';
        var t = vNull(df, '???');
        ;
        if ($TbV[k]) {
            t = ($TbV[k][tr]) ? $TbV[k][tr] : t;
        }
        return t;
    },
    _g: function (k, tr, df) {
        k = (k) ? k : 'null_';
        tr = (tr) ? tr : 'null_';
        var t = vNull(df, '???');
        if ($TbV[k] && typeof ($TbV[k]) == 'object') {
            if ($TbV[k][0] && $TbV[k][0].k) {
                for (var i in $TbV[k]) {
                    if ($TbV[k][i].k == tr) {
                        t = $TbV[k][i].v;
                        break;
                    }
                }
            } else {
                t = ($TbV[k][tr]) ? $TbV[k][tr] : t;
            }
        }
        return t;
    }
}

$i = { //ayuda
    t: function (k, pare, pre) {
        btn = $1.t('span', {'class': 'fa faBtn fa_info', style: 'color:#0F0'}, pare);
        var div = $1.t('div', {'class': '_i', title: 'Obtener Información'}, pare);
        btn.onclick = function () {
            $i.open(k, this.parentNode, pre);
        }
        return div;
    },
    open: function (k, pare, pre) {
        var wto = $1.q('._i_wrap', pare);
        if (!wto) {
            var wt = $1.t('div', {'class': '_i_wrap'}, pare);
        } else {
            wt = wto;
        }
        var disp = 'block';
        switch (wt.style.display) {
            case 'block':
                disp = 'none';
                break;
            case 'none':
                disp = 'block';
                break;
        }
        wt.style.display = disp;
        var tval = ($i[k] && $i[k].t) ? $i[k].t : k;
        if (typeof (k) == 'object' && pare.parentNode) {
            tval = (k.t) ? k.t : k.ititle;
        }
        if (!wto) {
            wt.innerHTML = tval;
        }
        if (pre != 'N' || (wt && wt.childNodes[1])) {
            wt.classList.add('pre');
        }
        return wt;
    }
};

$load = {
    ide: '___jsLoader1',
    i: false,
    open: function () {
        clearInterval($load.i);
        lo = $1.q('.' + $load.ide);
        $1.delet(lo);
        $load.i = setInterval(function () {
            var lo = $1.q('#' + $load.ide);
            if (!lo) {
                var lo = $1.t('div', {id: $load.ide, 'class': '___jsLoader1', style: ''}, document.body);
            }
            lo.style.zIndex = 10000;
        }, 300);
    },
    close: function () {
        clearInterval($load.i);
        $1.delet($1.q('#' + $load.ide));
    },
    line: function (cont) {
        cont = (cont) ? cont : $M.Ht.cont;
        $1.clear(cont);
        var loadw = $1.t('div', {id: 'psLoadAjaxPoints', 'class': 'psLoadAjaxPoints'}, cont);
        $1.t('img', {'id': 'psLoadAjaxPoints', 'src': $Api.imgLoad1, alt: ' Cargando...', title: ' Cargando'}, loadw);
        $1.t('i', {textNode: ' Cargando...'}, loadw);
    }
};

var $js = {
    A: {}, N: [], n: 0,
    copy: function (o, atr) {
        if (o) {
            var txt = '';
            if (o.getAttribute(atr)) {
                txt = o.getAttribute(atr);
            } else if (!o.tagName) {
                txt = o;
            }
            var aux = document.createElement("input");
            aux.setAttribute("type", 'hidden');
            aux.setAttribute("value", txt);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
        }
    },
    isNull: function (vari, valu) {
        var nula = (vari == null || vari == undefined) ? true : false;
        if (!nula && vari == valu) {
            nula = true;
        }
        return nula;
    },
    keyExist: function (k, O) {
        if (typeof (O) == 'undefined') {
            return false;
        }
        if (typeof (O[k]) == 'undefined') {
            return false;
        }
        return true;
    },
    one: function (O, def, num) {
        D1 = (def) ? def : null;
        if (O) {
            for (var x in O) {
                D1 = O[x];
                if (num) {
                    if (num == x) {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        return D1;
    },
    forIf: function (O, F, func, P) {
        R = []; //for if cumple con F
        for (var i in O) {
            var ok = false;
            for (var k in F) {
                if (O[i][k] == F[k]) {
                    ok = true;
                } else {
                    ok = false;
                }
            }
            if (ok) {
                func(O[i], P);
            }
        }
        return R;
    },
    active: function (TV, X) {
        for (var i in TV) {
            k = TV[i].k;
            var reg = new RegExp(k + ',', 'g');
            if (X.match(reg)) {
                TV[i]._active = 'Y';
            }
        }
    },
    clone: function (O, f) {
        var C = JSON.parse(JSON.stringify(O));
        if (f != 'Nf') {
            for (var i in O) {
                var ty = typeof (O[i]);
                if (ty == 'function') {
                    C[i] = O[i];
                } else if (ty == 'object') {
                    C[i] = O[i];
                }//ojo puede generar error
            }
        }
        return C;
    },
    load: function (tbk, func) {
        if (typeof (tbk) != 'string') {
            P = tbk;
            tbk = P.tbk;
        }
        P = (P) ? P : {};
        if (P.noReload && $js.A[tbk]) {
            return func();
        }
        if ($js.A[tbk]) {
            $1.delet($js.A[tbk]);
            delete ($js.A[tbk]);
        }
        var s = document.createElement('script');
        s.setAttribute('src', $y.apiURI + '/jsLoad?tbk=' + tbk + '&___ocardtooken=' + $0s.stor('ocardtooken'));
        s.onload = func;
        $js.A[tbk] = s;
        document.body.appendChild(s);
    },
    getScript: function (tbk, P) {
        var func = (P && typeof (P) == 'object') ? false : P;
        var P = (P && typeof (P) == 'object') ? P : {};
        if (P.loadeN && !$js.N[P.loadeN]) {
            setTimeout(function () {
                $js.getScript(tbk, P);
            }, 500);
            return 'verifiy exists...';
        }
        if (P.func) {
            func = P.func;
        }
        if (typeof (tbk) != 'string') {
            P = tbk;
            tbk = P.tbk;
        }
        var P = (P) ? P : {};
        if (P.noReload) {
            return func();
        }
        var s = document.createElement('script');
        s.setAttribute('src', tbk);
        s.setAttribute('charset', 'UTF-8');
        for (var i in P) {
            if (i != 'func') {
                s.setAttribute(i, P[i]);
            }
        }
        s.onload = function () {
            if (func) {
                func();
            }
            this.isLoad = 'Y';
            $js.N[$js.n] = this;
            $js.n++;
        }
        $js.A[tbk] = s;
        document.head.appendChild(s);
    },
    length: function (o) {
        var n = null;
        if (typeof (o) == 'object') {
            for (var i in o) {
                n++;
            }
        }
        return n;
    },
    undConv: function (q, D) {
        var num = q;
        if (D.t == 'inv') {
            num = (D.o == 'x') ? q / D.f : num;
            num = (D.o == '/') ? q * D.f : num;
        } else {
            num = (D.o == 'x') ? q * D.f : num;
            num = (D.o == '/') ? q / D.f : num;
        }
        return num;
    },
    js2Url: function (D, P) {
        var P = (P) ? P : {};
        var qu = '';
        var n1 = (P.A) ? P.A + '[' : '';
        var n2 = (P.A) ? ']' : '';
        for (var f in D) {
            qu += n1 + f + n2 + '=' + D[f] + '&';
        }
        return qu;
    },
    focus: function (div) {
        var div = (div.tagName) ? div : $1.q(div);
        var o = $1.t('input', {type: 'text', style: ''});
        if (div.firstChild) {
            div.insertBefore(o, div.firstChild);
        } else {
            div.appendChild(o);
        }
        o.focus();
        $1.delet(o);
    },
    push: function (o1, oadd, Px) { //oadd = lo que se añade
        if (!o1) {
            o1 = (Px) ? [] : {};
        }
        if (Px) {
            o1.push(oadd);
        } else {
            for (var i in oadd) {
                k = i;
                if (oadd[i]._k) {
                    k = oadd[i]._k;
                    delete (oadd[i]._k);
                }
                o1[k] = oadd[i];
            }
        }
        return o1;
    },
    srand: function (max, min) {
        var date = new Date().getTime();
        var min = (min) ? date - min : date - 100;
        var max = (max) ? date + max : date + 100;
        return Math.floor(Math.random() * (max - min)) + min;
    },
    genCode: function (len, timeLen) {
        len = (len) ? len : 6;
        code = "";
        var lt = 'abcdefghijklmnopqrstuvwxyz';
        lt += lt.toUpperCase();
        var nt = '1234056789';
        chars = lt + nt;
        var clen = chars.length;
        for (x = 0; x < len; x++) {
            rand = Math.floor(Math.random() * clen);
            code += chars.substr(rand, 1);
        }
        if (timeLen) {
            timt = new Date().getTime();
            code = ('' + timt).substr(0, timeLen) + code;
        }
        return code;
    },
    afind: function (opts, n) {
        var n = (n) ? n : 0;
        var nu = 0;
        var kr = null;
        for (var k in opts) {
            if (nu == n) {
                kr = k;
                break;
            }
            nu++;
        }
        return kr;
    },
    isNumber: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    round: function (num, dec) {
        var res = num % 1;
        if (res != 0 && num.toFixed) {
            return num.toFixed(dec);
        } else {
            return num * 1;
        }
    },
    toFixed(num, dec) {
        var res = num % 1;
        if (res != 0 && num.toFixed) {
            return num.toFixed(dec);
        } else {
            return num;
        }
    },
    toRound(num, n) {
        var tn = (n == 5)
            ? Math.round(num)
            : Math.ceil(num);
        //round 2.49 =2
        return tn;
    },
    perc: function (n1, n2, dec = 0, txt = '%') {
        var n = ((n1 * 1 / n2 * 1));
        if (txt == '%') {
            return (n * 100).toFixed(dec) + txt;
        } else {
            return n.toFixed(dec + 2);
        } //0.01
    },
    textLimit: function (text, limit) {
        return $Str.limit(text, limit);
    },
    textContain: function (t, m) {
        return $Str.contain(t, m);
    },
    textChange: function (cl, t, pare) {
        var el = $1.q(cl, pare, 'all');
        for (var e = 0; e < el.length; e++) {
            if (el[e].value) {
                el[e].value = t;
            }
            if (el[e].innerText) {
                el[e].innerText = t;
            }
        }
    },
    fieChange: function (cl, t, pare) {
        var el = $1.q(cl, pare, 'all');
        for (var e = 0; e < el.length; e++) {
            var tag = (el[e].tagName).toLowerCase();
            if (tag == 'input') {
                el[e].value = t;
            } else if (tag == 'select') {
                alert('fieChange:: SELECT to change no');
            } else if (tag == 'textarea') {
                el[e].innerText = t;
            } else {
                el[e].innerText = t;
            }
        }
    },
    reload: function (fileName) {
        var a = $1.q('script', 0, 'all');
        var old = false;
        for (var i = 0; i < a.length; i++) {
            if ((a[i].src).indexOf(fileName) != -1) {
                old = a[i];
            }
        }
        if (old) {
            var n = $1.t('script', {src: old.src});
            old.parentNode.replaceChild(n, old);
        }
    },
    isKey: function (evt, keyCod, P) { //13 = enter
        P = (P) ? P : {};
        var cc = (evt.which) ? evt.which : event.keyCode;
        if (P.alert) {
            alert(cc);
        }
        if (keyCod == 'enter' && cc == 13) {
            keyCod = 13;
        } else if (keyCod == 'tab' && cc == 9) {
            keyCod = 9;
        }
        if (cc == keyCod) {
            if (typeof (P) == 'function') {
                P();
            } else if (P.func) {
                P.func();
            }
            return true;
        } else {
            return false;
        }
    },
    sortBy: function (k, O, P) {
        P = (P) ? P : {};
        P.k = k;
        return $js.sortNum(O, P);
    },
    sortByKeys: function (O, P) {
        P = (P) ? P : {};
        if (typeof (O) != 'object') {
            return {};
        }
        O.sort(function (a, b) {
            var S1 = (P[0]).split('.');
            k1 = S1[0];
            var S2 = (P[1]) ? P[1].split('.') : [P[1]];
            k2 = S2[0];
            var a1 = a[k1];
            var b1 = b[k1];
            var a2 = a[k2];
            var b2 = b[k2];
            if (S1[1] == '0-9') {
                a1 = a1 * 1;
                b1 = b1 * 1;
            }
            if (S2[1] == '0-9') {
                a2 = a2 * 1;
                b2 = b2 * 1;
            }
            if (a1 > b1) {
                return 1;
            } else if (a1 < b1) {
                return -1;
            } else {
                if (a2 > b2) {
                    return -1;
                } else if (a2 < b2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
        return O;
    },
    sortNum: function (O, P) {
        P = (P) ? P : {};
        if (typeof (O) != 'object') {
            return {};
        }
        var k = P.k;
        O.sort(function (a, b) {
            var a = (k) ? a[k] : a;
            var b = (k) ? b[k] : b;
            if (!isNaN(a) && !isNaN(b)) {
                var is1 = (P.ksort) ? 1 : -1;
                var is1b = (P.ksort) ? -1 : 1;
                if (a * 1 < b * 1) {
                    return is1;
                }//-1
                if (a * 1 > b * 1) {
                    return is1b;
                }
            } else {
                var is1 = (P.ksort) ? 1 : -1;
                var is1b = (P.ksort) ? -1 : 1;
                if (a < b) {
                    return is1;
                }//-1
                if (a > b) {
                    return is1b;
                }
            }
        });
        return O;
    },
    uriT: function (t) {
        return encodeURIComponent(t);
    },
    encUri: function (L) {
        var r = '&';
        for (var i in L) {
            r += i + '=' + encodeURIComponent(L[i]) + '&';
        }
        return r;
    },
    del: function (wh, O) {
        if (O) {
            var isO = (typeof (wh) == 'object');
            for (var i in O) {
                if (isO) {
                    var yesDel = 'N';
                    for (var e in wh) {
                        if (O[i][e] && O[i][e] == wh[e]) {
                            yesDel = 'Y';
                        } else {
                            yesDel = 'N';
                        }
                    }
                    if (yesDel == 'Y') {
                        delete (O[i]);
                    }/* debe coincidir todo lo anterior para borrar */
                } else if (i == wh) {
                    delete (O[i]);
                }
            }
        }
        return O;
    },
    max: function (M) {
        var maxA = 0;
        var len = M.length;
        for (var i = 0; i < len; i++) {
            if (maxA < M[i]) {
                maxA = M[i];
            }
        }
        return maxA;
    },
    parse: function (txt, def, addTo) {
        var ret = null;
        var txt = (txt + '').replace(/\\\\"/, '"');
        (txt + '').replace(/\\\"/, '"');
        if (typeof (txt) == 'string') {
            if (txt.match(/^(\[|\{)/)) {
                ret = JSON.parse(txt);
            }
        }
        if (typeof (ret) !== 'object') {
            ret = def;
        }
        if (addTo) {
            /*añadir a otro obj */
            for (i in ret) {
                addTo[i] = ret[i];
            }
            ret = addTo;
        }
        return ret;
    }
}
$js.k = function (PV, k, df) {
    k = (k) ? k : null;
    var t = k;
    if (typeof (PV) == 'object') {
        if (PV[0] && PV[0].k) {
            for (var i in PV) {
                if (PV[i].k == k) {
                    t = PV[i].v;
                    break;
                }
            }
        } else {
            t = (PV[k]) ? PV[k] : t;
        }
    }
    return t;
}
$js.Lb = {
    itv: false,//wrapersave
    onLoad: function (func) {
        var n = 0;
        clearInterval($js.Lb.itv);
        for (var i in $js.N) {
            var S = $js.N[i];
            if (S && S.isLoad == 'Y') {
            } else {
                n++;
            }
        }
        if (n == 0) {
            func();
        } else {
            $js.Lb.itv = setInterval(function () {
                $js.Lb.onLoad(func);
            }, 10);
        }
    }
}
$js._upd = function (N, tObj, ty) {
    /* actualiza objeto, si N.k existe, sino definir rk */
    var e = 0;
    var tk = N.k;
    if (ty == 'v') {
        N = N.v;
    }// clave=valor simple
    if (!tObj) {
        tObj = [];
        e++;
    }
    for (var i in tObj) {
        if (tObj[i].k) {
            if (tObj[i].k == tk) {
                tObj[i] = N;
                e = 0;
                break;
            } else {
                e++;
            }
        } else if (i == tk) {
            tObj[i] = N;
            e = 0;
            break
        } else {
            e++;
        }
    }
    if (e && tObj[0]) {
        tObj.push(N);
    } else if (e) {
        tObj[tk] = N;
    }
}

var $Tol = {
    sumTotal: function (lineC, lineT, pare) {
        var a = $1.q(lineC, pare, 'all');
        var total = 0;
        for (var i = 0; i < a.length; i++) {
            var t = (a[i].value) ? a[i].value * 1 : 0;
            t = (a[i].innerText) ? a[i].innerText * 1 : t;
            total += t;
        }
        var trTo = $1.q(lineT, pare);
        if (trTo.value) {
            trTo.value = total;
        }
        if (trTo.innerText) {
            trTo.innerText = total;
        }
    },
    tbSum: function (tb, P) {
        /*
	tbCurr: moneda
	tdNum: cantidad
	tdNum:2 cantidad 2 (precio)
	tdNumDisc: Descuento para linea
	tdTotal: Suma de tdNum*tdNum2
	tbTotal: Suma de tdTotal
	tbDisc: % Descuento
	tbDiscText: $ Descuento
	tbTotal2: tdTotal con descuento
	*/
        var k = (P && P.k) ? '_' + P.k : '';
        var kcur = (P && P.cur) ? '_' + P.kcur : '';
        //sum tr tds total
        var trNums = $1.q('.' + tbSum.trNums, tb, 'all');
        if (trNums) {//sum tr on total
            for (var i = 0; i < trNums.length; i++) {
                var tdn = $1.q('.' + tbSum.trTdNums, trNums[i], 'all');
                var total = 0;
                for (var i2 = 0; i2 < tdn.length; i2++) {
                    var vt = val(tdn[i2]);
                    total += vt * 1;
                }
                var tdto = $1.q('.' + tbSum.trTdNumTotal, trNums[i]);
                if (tdto) {
                    tdto.innerText = total;
                }
            }
        }

        var trn1 = $1.q('.__tdNumGroup' + k, tb, 'all');//tr que tiene varias tdNum
        var n2 = $1.q('.__tdNum2' + k, tb, 'all');
        var tdToNum = $1.q('.__tdTotalNum' + k, tb, 'all');
        var tdTo = $1.q('.__tdTotal' + k, tb, 'all');//always tr->td
        var tdDisc = $1.q('.__tdNumDisc' + k, tb, 'all');//always tr->td
        var tbTo = $1.q('.__tbTotal' + k, tb);
        //.__tbCol1'+k,tb)
        var Tot = {col1: 0, col2: 0};
        var tbTo2 = $1.q('.__tbTotal2' + k, tb);//total-disc
        var tdNum = $1.q('.__tdNum' + k, tb, 'all');//variacion de desc. dado vs lista
        var tdNumBase = $1.q('.' + tbSum.tbNumBase, tb, 'all');//variacion de desc. dado vs lista
        var tdNumDiscVar = $1.q('.__tdNumDiscVar' + k, tb, 'all');//variacion de desc. dado vs lista
        var tbDisc = $1.q('.__tbDisc' + k, tb);
        var tbDiscT = $1.q('.__tbDiscText' + k, tb);
        var tbCurr = $1.q('.__tbCurr' + kcur);
        var tdFactor = $1.q('.' + tbSum.tbFactor + kcur, tb, 'all');
        var tdFactorText = $1.q('.' + tbSum.tbFactorText + kcur, tb, 'all');
        var cur = (tbCurr) ? tbCurr.value : false;
        if (trn1 && trn1.length > 0) {//sumar tds que sean tallas (grupos)
            for (var i = 0; i < trn1.length; i++) {
                var n1 = $1.q('.__tdNum' + k, trn1[i], 'all');
                var total = 0;
                var totaln = 0;
                for (var i2 = 0; i2 < n1.length; i2++) {
                    num = val(n1[i2]);
                    Tot.col1 += num;
                    totaln += num;
                }
                if (n2[i]) {
                    var num2 = val(n2[i]);
                    Tot.col2 += num2;
                    total = totaln * num2;
                }
                if (tdToNum[i]) {
                    tdToNum[i].innerText = totaln;
                }
                upd_tdTotal({tdTo: tdTo[i], i: i, total: total, cur: cur});
            }
        } else {//suma solo 1
            var n1 = $1.q('.__tdNum' + k, tb, 'all');
            var totalNum = 0;
            var totalNumBase = 0;
            for (var i = 0; i < n1.length; i++) {
                var total = 0;
                num = val(n1[i]);
                Tot.col1 += num;
                if (n2[i]) {
                    var num2 = val(n2[i]);
                    Tot.col2 += num2;
                    total = num * num2;
                } else {
                    total = num;
                }
                totalNum += total;
                if (n1[i].numBase) {
                    totalNumBase += n1[i].numBase * num2;
                }
                totalt = total;
                if (tdTo[i]) {/*totales */
                    if (tdTo[i].getAttribute('vformat') == 'money') {
                        totalt = $Str.money({value: total, curr: cur});
                    }
                    tdTo[i].innerText = totalt;
                }
                if (tdFactor[i] && tdFactorText[i]) { /*factor */
                    var tfa = tdFactor[i].innerText;
                    var numFac = tfa.replace(/^(x|\/)/, '') * 1;
                    var numC = num;
                    if (tfa.match(/x/)) {
                        numC = num * numFac;
                    } else if (tfa.match(/\//)) {
                        numC = num / numFac;
                    }
                    tdFactorText[i].value = numC;
                }
                upd_tdTotal({tdTo: tdTo[i], i: i, total: total, cur: cur});
            }
        }
        var total = 0;
        for (var i = 0; i < tdTo.length; i++) {//sumar totales tr
            if (tdTo[i].classList.contains('__tdTotalNoCount')) {
                continue; //evitar sumar en el total
            }
            var num = val(tdTo[i]);
            total += num * 1;
        }
        totalt = total;
        if (tbTo) {
            tbTo.innerText = $Str.f(tbTo, totalt);
            ;
        }
        disc = 0;
        /* priceList */
        if (tdNumBase) {
            totalNumBase = 0;
            for (var i = 0; i < tdNumBase.length; i++) {
                var valu = val(tdNumBase[i]);
                if (n2[i]) {
                    valu = valu * val(n2[i]);
                }
                totalNumBase += valu;
            }
        }
        if (tbDisc && tbDiscT) {
            var disc = total * (tbDisc.value / 100);
            if (tbDiscT.getAttribute('vformat') == 'money') {
                discT2 = $Str.money({value: disc, curr: cur});
            }
            tbDiscT.innerText = discT2;
        }
        if (totalNumBase > 0) { //desc real
            var totalCon = totalt - disc;
            var discReal = $js.toFixed((totalNumBase - totalCon) / totalNumBase * 100, 1);
            $1.t('span', {
                style: 'font-weight:normal; color:#00F;',
                textNode: ' (' + discReal + '%)',
                title: 'Descuento Real'
            }, tbDiscT);
        }
        if (tbTo2) {
            var totalt2 = total - disc;
            if (tbTo2.getAttribute('vformat') == 'money') {
                totalt2 = $Str.money({value: totalt2, curr: cur});
            }
            tbTo2.innerText = totalt2;
        }
        //get tbTotal of tdOrder
        var tbColNums = $1.q('.__tbColNums', tb, 'all');// tbColsNums{tbColNum} y tbColNumTotal1
        if (tbColNums) {
            var tbCol = {};
            for (var i = 0; i < tbColNums.length; i++) {
                var t = tbColNums[i];
                var ncol = t.getAttribute('tbColNum');
                if (!tbCol[ncol]) {
                    tbCol[ncol] = 0;
                }
                tbCol[ncol] += val(t);
            }
            for (var n in tbCol) {
                var tbColNums = $1.q('.__tbColNumTotal' + n, tb);
                if (tbColNums) {
                    var total = tbCol[n];
                    if (tbColNums.getAttribute('vformat') == 'money') {
                        total = $Str.money(total);
                    }
                    tbColNums.innerText = total;
                }
            }
        }
        for (var c in Tot) {
            var tdT = $1.q('.__tbTotal_' + c, tb);//_tbTotalcol1
            if (tdT) {
                tdT.innerText = $Str.f(tdT, Tot[c] * 1);
            }
        }

        function val(t) {
            num2 = 0;
            if (!t) {
                return 0;
            }
            switch ((t.tagName).toLowerCase()) {
                case 'input':
                    num2 = t.value;
                    break;
                default:
                    num2 = t.innerText;
                    break;
            }
            var tn = $Str.toNumber(num2);
            return tn * 1;
        }

        function upd_tdTotal(P) {//actualizar td total
            if (P.tdTo) {
                var disc = val(tdDisc[P.i]);
                if (tdDisc[P.i] && tdDisc[P.i]) {
                    P.total = P.total - (P.total * (disc / 100));
                }
                if (tdNumDiscVar && tdNumDiscVar[P.i]) {
                    var num1 = val(tdNum[P.i]);
                    var numBase = tdNum[P.i].numBase * 1;
                    tdNumDiscVar[P.i].title = num1 + '-' + numBase + '/' + numBase;
                    tdNumDiscVar[P.i].value = $js.toFixed((num1 * 1 - numBase) / numBase * -100, 1);
                }
                var totalt = P.total;
                if (P.tdTo.getAttribute('vformat') == 'money') {
                    totalt = $Str.money({value: P.total, curr: P.cur});
                }
                P.tdTo.innerText = totalt;
            }
        }
    }
}

var tbSum = {
    trLine: '__trLine',
    tdNum: '__tdNum', tdNum2: '__tdNum2', tdNumDisc: '__tdNumDisc', tdNumDisVar: '__tdNumDiscVar',
    tdNumBase: '__tdNumBase',/* priceList */
    tdTotal: '__tdTotal', trTotal: '__tdTotal',
    tdIva: '__tdIva', tdRteFte: '__tdRteFte',
    tdFactor: '__tdFactor', tdFactorText: '__tdFactorText',
    tbColNums: '__tbColNums', tbColNumTotal: '__tbColNumTotal',//+n
    trNums: '__trNums', trTdNums: '__trTdNums', trTdNumTotal: '__trTdNumTotal',
    tbTotal: '__tbTotal', tbTotal2: '__tbTotal2',
    tbDisc: '__tbDisc', tbDiscText: '__tbDiscText',
    tbRteFte: '__tbRteFte', tbIva: '__tbIva',
    get: function (tb, P) {
        P = (P) ? P : {};
        if (P.tdTotals) {
            var tds = $1.q('.' + P.tdTotals, tb, 'all');
            for (var i = 0; i < tds.length; i++) {
                tds[i].classList.replace(P.tdTotals, tbSum.tdTotal);
            }
        }
        return $Tol.tbSum(tb, P);
    }
}

/*  $a */
HTMLElement.prototype.keyPresi = function (keyName, func, P, r) {
    this.onkeyup = function (ev) {
        This = this;
        //keyName (enter)
        $js.isKey(ev, keyName, {
            func: function () {//onRead
                if (r) {
                    This.value = '';
                }
                func(This, P);
            }
        });
    }
}
HTMLElement.prototype.keyChange = function (func, P) {
    /*arrows: 37 a 40, page:33 a 36 */
    var P = (P) ? P : {};
    var lastV = this.value;
    P.noKeys = (P.noKeys) ? P.noKeys + 'enter,tab' : 'enter,tab';
    if (P.P) {
        this.P = P.P;
    }
    var omitKey = false;
    this.onkeydown = function () {
        var cc = event.keyCode;
        lastV = this.value;
        if (cc == 46) {
            console.log('keyCode del');
            lastV = null;
        }
    };
    pulsando = function (T) {
        omitKey = false;
        T._nVal = Y.value;
        var cc = event.keyCode;
        var isArrow = (cc >= 37 && cc <= 40);
        var isArrowL = (cc == 37 || cc == 39);
        var isMm = (cc == 38 || cc == 40);
        var isPage = (cc >= 33 && cc <= 36);
        if (T.getAttribute('inputmode') == 'numeric') {
            if (isPage || isArrowL) {
                omitKey = 1;
            }
        }
        if (P.noKeys) {
            if (P.noKeys.match(/enter/) && cc == 13) {
                omitKey = true;
            } else if (P.noKeys.match(/tab/) && cc == 9) {
                omitKey = true;
            }
        }
        if (!omitKey) {
            T.onchange();
        } else {
            console.log('omit --> ' + cc);
        }
    }
    var intv = false;
    this.onkeyup = function () {
        forma = this.getAttribute('numberformat');
        if (forma && forma == 'mil') {
            this.value = $Str.toMil(this.value);
        }
        if (P.wait) {
            clearTimeout(intv);
            intv = setTimeout(pulsando, 5000, this);
        } else {
            pulsando(this);
        }
    };
    this.onchange = function () {
        if (this.value != lastV) {
            console.log('cambio!');
            func(this);
        }
    }
}
HTMLElement.prototype.disable = function (func) {
    this.setAttribute('disabled', 'disabled');
    if (func) {
        func(this);
    }
}
String.prototype.in = function (reg) {
    var reg = new RegExp(reg, 'g');
    var b = this.match(reg);
    return b;
}
var forEach = function (O, func, P, P2) {
    P = (P) ? P : {};
    for (var k1 in O) {
        var r = true;
        for (var k2 in P) {
            if (P[k2] != O[k1][k2]) {
                r = false;
                break;
            }
        }
        if (r) {
            func(O[k1], P2);
        }
    }
}

var Intv = {
    js: false,//interval
    jsO: function () {
        Intv.js = setInterval(function () {
            var lo = $1.q('.___jsLoader1');
            if (!lo) {
                var w = $1.t('div', {'class': '___jsLoader1', style: ''}, $1.body);
            }
        }, 300);
    },
    jsC: function () {
        clearInterval(Intv.js);
        $1.delet($1.q('.___jsLoader1'));
    }
}

function pushO(o1, oadd) {//oadd = lo que se añade
    for (var i in oadd) {
        o1[i] = oadd[i];
    }
}

var $1 = {
    body: false,
    textIs: {}, //is, then, end para evitar texto
    nullBlank: false,//evitar poner null o undefined
    clear: function (nod, NODEL) {
        var nodE = (top.document.getElementById(nod)) ? top.document.getElementById(nod) : nod;
        while (nodE && nodE.firstChild) {
            var quit = true;
            if (quit) {
                nodE.removeChild(nodE.firstChild);
            }
        }
    },
    e: {//event
        winBlur: function (P) {
            setTimeout(function () {
                document.body.onclick = function (e) {
                    var ele = $1.G.parentTo(e.target, P.cls);
                    if (P.e != ele) {
                        $1.delet(P.pare);
                        document.body.onclick = '';
                    }
                }
            }, 500);
        }
    },
    qOpt: function (obj, r) {
        var obj = (typeof (obj) != 'string') ? obj : $1.q(obj);
        if (obj && obj.tagName && obj.options && obj.options[obj.selectedIndex]) {
            if (r) {
                return obj.options[obj.selectedIndex].getAttribute(r);
            } else {
                return obj.options[obj.selectedIndex].getAttribute('value');
            }
        } else return null;
    },
    q: function (querySel, objPare, n) {
        var obj;
        if (typeof (querySel) != 'string') {
            alert('Error to $1.q: ' + querySel + ', not string!');
        }
        if (objPare && objPare.tagName) {
            obj = objPare.querySelectorAll(querySel);
        } else {
            obj = document.querySelectorAll(querySel);
        }
        if (n && n == 'all') {
            return obj;
        }
        return obj[0];
    },
    qClsId: function (clsId, pare, n) {
        return $1.q('.__clsId_' + clsId, pare, n);
    },
    clearInps: function (obj, P) {
        var P = (P) ? P : {};
        var vPostClear = (P.vPost != 'N');
        var inp1 = $1.q('.__btnDateText', obj, 'all');//databtn
        for (var i in inp1) {
            inp1[i].innerText = '';
        }
        var inp = obj.getElementsByTagName('input');
        for (var i in inp) {
            var cL = ((inp[i]).classList);
            var noClear = (cL && cL.contains('noInputClear')) ? true : false;
            if (noClear) {
                continue;
            }
            if (vPostClear) {
                inp[i].O = {};
            }
            if (inp[i].type == 'text' || inp[i].type == 'hidden' || inp[i].type == 'number' || inp[i].type == 'date') {
                inp[i].value = (inp[i].getAttribute('default')) ? inp[i].getAttribute('default') : '';
            } else if (inp[i].type == 'radio' || inp[i].type == 'checkbox') {
                inp[i].checked = inp[i].defaultChecked;
            } else if (cL && cL.contains('divSelect')) {
                inp[i].value = 'Seleccione';
                var boxn = (cL.contains('boxi1NM')) ? 'boxi1NM' : 'boxi1';
                var defOpt = ((inp[i]).getAttribute('defaultClass')) ? (inp[i]).getAttribute('defaultClass') : 'iBg_arrowSel ';
                inp[i].className = boxn + ' divSelect iBg ' + defOpt;
            }
        }
        var inp = obj.getElementsByTagName('select');
        for (var i in inp) {
            var noClear = ((inp[i]).classList);
            var noClear = (noClear && noClear.contains('noInputClear')) ? true : false;
            if (noClear) {
                continue;
            }
            if (vPostClear) {
                inp[i].O = {};
            }
            inp[i].selectedIndex = 0;
        }
        var inp = obj.getElementsByTagName('textarea');
        for (var i in inp) {
            var noClear = ((inp[i]).classList);
            var noClear = (noClear && noClear.contains('noInputClear')) ? true : false;
            if (noClear) {
                continue;
            }
            if (vPostClear) {
                inp[i].O = {};
            }
            inp[i].value = '';
            inp[i].innerText = '';
        }
        var inp = $1.q('.clearInnerText', obj, 'all');
        for (var i = 0; i < inp.length; i++) {
            var noClear = ((inp[i]).classList);
            var noClear = (noClear && noClear.contains('noInputClear')) ? true : false;
            if (noClear) {
                continue;
            }
            inp[i].value = '';
            inp[i].innerText = '';
        }
    },
    G: {
        dataok: 'Y',//usar en ajax para enviar o no info
        noGet: ['undefined', 'null'], noGetB: ['undefined', 'null'],
        filter: function (pare) {
            return $1.G.inputs(((pare) ? pare : $M.Ht.filt), 'jsFiltVars');
        },
        byId: function (id) {
            var objq = document.getElementById(id);
            return objq;
        },
        inputs: function (tObj, jsFields, P) {
            var P = (P) ? P : {};
            jsFields = (jsFields == undefined || jsFields == null) ? 'jsFields' : jsFields;
            $1.G.dataok = 'Y';
            $Api.err = false;
            $tB.msg = [];//mensajes para errores $Api.send
            var toJSON = (P.JSON) ? true : false;
            var byId = (typeof (tObj) == 'string') ? $1.q('#' + tObj) : false;
            var obj = (tObj != undefined && tObj != false) ? tObj : document;
            obj = (tObj != undefined && tObj != false) ? tObj : document;
            obj = (byId && byId.tagName) ? byId : obj;
            if (obj && obj.getElementsByClassName) {
                var parE = obj.getElementsByClassName(jsFields);
                var DATA = (toJSON) ? {} : '';
                for (var i = 0; i < parE.length; i++) {
                    var Fi = parE[i];
                    Fi.style.borderColor = Fi.style.backgroundColor = '';
                    if (Fi.classList.contains('__inputSearch') && Fi.name == 'textSearch') {
                        continue;
                    }
                    var tag = (Fi.tagName).toLowerCase();
                    var val = '';
                    var inputNamer = (Fi.getAttribute('optnamer'));
                    if (tag == 'select' && Fi.getAttribute('multiple')) {
                        var opts = Fi.options;
                        if (1 || inputNamer == 'IN') {
                            for (var o = 0; o < opts.length; o++) {
                                if (opts[o].selected && opts[o].value != '') {
                                    val += opts[o].value + ',';
                                }
                            }
                            val = val.replace(/\,$/, '');
                        }
                    } else {
                        var val = (Fi.type == 'checkbox' && Fi.checked) ? 'on' : 'off';
                        val = (Fi.type == 'radio' && Fi.checked) ? Fi.value : val;
                        val = (Fi.type != 'checkbox' && Fi.type != 'radio') ? Fi.value : val;
                        val = (Fi.tagName == 'TEXTAREA' && Fi.value != '') ? Fi.value : val;
                        val = (Fi.tagName == 'TEXTAREA' && Fi.innerText != '') ? Fi.innerText : val;
                        if (tag == 'select') {
                            if (Fi.options[Fi.selectedIndex]) {
                                val = Fi.options[Fi.selectedIndex].value;
                            }
                        }
                    }
                    var fieldData = ((Fi.fieldData == 'Y' || Fi.getAttribute('fielddata') == 'Y'));
                    var onOff = (P.onOff == 'Y' || Fi.getAttribute('YN')) ? 'Y' : '';
                    //fieldData es para enviar data por vPost;
                    if (Fi.type == 'checkbox' && onOff == 'Y') {
                        var val = (Fi.checked) ? 'Y' : 'N';
                    }
                    ;
                    var xReq = Fi.getAttribute('x-req');
                    if (xReq && xReq != '') {
                        $tB.verif(xReq, {o: Fi});
                    }
                    if (Fi.getAttribute('datareq') == 'Y' && (!val || val == '')) {
                        Fi.style.borderColor = 'green';
                        Fi.style.backgroundColor = 'red';
                        $Api.err = true;
                        $1.G.dataok = 'N';
                        return ''; //envio a $ajax
                    }
                    if (fieldData) {
                        DATA += Fi.O.vPost + '&';
                    } else if (onOff == 'Y' ||
                        ((Fi.type == 'checkbox' && Fi.checked) ||
                            (Fi.type == 'radio' && Fi.checked) ||
                            (Fi.type != 'checkbox' && Fi.type != 'radio')
                        )
                    ) {
                        var fName = (P.attrName) ? Fi.getAttribute(P.attrName) : Fi.name;
                        val = (val == undefined || val == 'undefined') ? '' : val;
                        if (Fi.getAttribute('numberformat') == 'mil' || Fi.numberformat == 'mil') {
                            val = $Str.toNumber(val);
                        }
                        var noPut = false;
                        for (var x in $1.G.noGet) {
                            var tv = $1.G.noGet[x];
                            if (tv == 'BLANK' && val == '') {
                                noPut = true;
                                break;
                            }
                            if (tv == '0' && val == 0) {
                                noPut = true;
                                break;
                            } else if (tv == val) {
                                noPut = true;
                                break;
                            }
                        }
                        if (noPut) {
                        } else if (Fi.getAttribute('datareq') == 'Y' && (!val || val == '')) {
                            Fi.style.borderColor = 'red';
                        } else if (toJSON) {
                            var iName = fName.replace(/\([\w\_]+\)/gi, '')
                            DATA[iName] = (val); //W(and,or) T text, E: equal,like
                            var E = fName.match(/\(E\_([a-z0-9]*)\)/gi);
                        } else {
                            /* Saltar si esta en blanco */
                            if (P.blankFie == 'N' && val == '') {
                                continue;
                            }
                            DATA += (fName) + '=' + encodeURIComponent(val) + '&';
                            //INCLUIR textNode de option para guardar con texto, en T.sel(nameSendText:)
                            if (Fi.tagName == 'SELECT' && Fi.options[Fi.selectedIndex]) {
                                var Opt = Fi.options[Fi.selectedIndex];
                                var nameSendText = Opt.getAttribute('nameSendText');
                                if (nameSendText) {
                                    DATA += nameSendText + '=' + encodeURIComponent(Opt.innerText) + '&'
                                }
                            }
                            if (Fi.O && Fi.O.vPost) {
                                DATA += Fi.O.vPost + '&';
                            }
                        }
                        if (P.alerta) {
                            P.alerta.innerHTML += (JSON.stringify(Fi.O));
                        }
                    }
                }
                /* get from data-vPost */
                var parE = $1.q('[data-vPost]', obj, 'all');
                var re = '';
                for (var i = 0; i < parE.length; i++) {
                    DATA += (parE[i].vPost) ? parE[i].vPost + '&' : '';
                }
                //ORDERS
                var opts = $1.q('.admsFiltOrder_item', tObj);
                var t = '';
                if (opts && opts.length > 0) {
                    for (var o = 0; o < opts.length; o++) {
                        t += opts[o].getAttribute('ordText') + ',';
                    }
                    if (toJSON) {
                        DATA['ordBy'] = t.substring(0, t.length - 1);
                    } else {
                        DATA += '&ordBy=' + t.substring(0, t.length - 1);
                    }
                }
            }
            $1.G.noGet = $1.G.noGetB;
            return DATA.replace(/\&$/, '');
        },
        qSel: function (querySel, objPare, n) {
            return $1.q(querySel, objPare, n);
        },
        parentTo: function (chil, classN) {
            //buscar padre hasta que cumpla condicion y retur
            var noParent = chil.parentNode;
            if (!noParent) {
                return false;
            }
            var b = chil.classList.contains(classN);
            if (b) {
                return chil;
            }
            return $1.G.parentTo(chil.parentNode, classN);
        },
        radio: function (iName) {
            var obj = document.getElementsByName(iName);
            for (i = 0; i < obj.length; i++) {
                if (obj[i].checked == true) {
                    return obj[i];
                }
            }
        },
        sel: function (obj, atr) {
            var obj = (typeof (obj) != 'string') ? obj : document.getElementsByName(obj);
            if (obj.tagName) {
                if (atr) {
                    if (obj.options[obj.selectedIndex]) {
                        return obj.options[obj.selectedIndex].getAttribute(atr);
                    } else {
                        return null;
                    }
                } else {
                    return obj.options[obj.selectedIndex];
                }
            } else return null;
        }
    },
    selDef: function (k, sel) {
        $1.S.sel(k, sel);
    },
    S: {
        sel: function (k, sel) {
            var sel = (sel.tagName) ? sel : $1.q(sel);
            var opts = sel.options;
            var os = sel.selectedIndex;
            for (var i = 0; i < opts.length; i++) {
                if (opts[i].value == k) {
                    opts[i].selected = 'selected';
                } else {
                    delete (opts[i].selected);
                }
            }
        }
    },
    delet: function (nodE, timeC) {
        if (typeof (nodE) == 'string' && nodE.match(/^[\.|\#]/)) {
            $1.delet($1.q(nodE));
        }
        if (timeC) {
            var nS = (timeC) ? timeC * 1000 : 1000;
            var t = setTimeout($1.delet, nS, nodE);
        } else {
            if (IDE = top.document.getElementById(nodE)) {
                IDE.parentNode.removeChild(IDE);
            } else if (nodE && nodE.parentNode) {
                nodE.parentNode.removeChild(nodE);
            }
            ;
        }
    },
    deletAll: function (qSel, pare) {
        var li = $1.G.qSel(qSel, pare, 'all');
        for (var i = 0; i < li.length; i++) {
            li[i].parentNode.removeChild(li[i]);
        }
    },
    aGo: function (href, PARS, pare) {
        if (href.func) {
            var a = $1.t('a', {
                href: $M.read('!!'),
                'class': 'fa fa_arrowNext',
                style: 'color:#ff00f7; font-size:110%; margin:0 0.25rem;'
            }, pare);
            a.onclick = function () {
                href.func(href.P);
            }
            return a;
        }
        PARS = (PARS) ? PARS : {};
        PARS.h = href;
        PARS.style = 'color:#ff00f7; font-size:110%; margin:0 0.25rem;';
        return $1.t('aGo', PARS, pare);
    },
    t: function (tag, PARS, pare) {
        if (tag == 'lTag') {
            PARS.tag = PARS.lTag;
            return $1.lTag(PARS, pare);
        }
        PARS = (PARS) ? PARS : {};
        if (tag == 'disabled') {
            tag = 'input';
            PARS.type = 'text';
            PARS.disabled = 'disabled';
        }
        if (tag == 'aGo') {
            PARS.title = (PARS.t) ? PARS.t : 'Acceder';
            PARS['class'] = 'fa fa_arrowNext';
            PARS['href'] = $M.to(PARS.h, PARS.p, 'r');
            return $1.t('a', PARS, pare);
        }
        var faIco = PARS.faIco;
        delete (PARS.faIco);
        if (PARS && PARS.textNode && PARS.pformat) {
            if (PARS.pformat == 'money') {
                PARS.textNode = $Str.money(PARS.textNode);
            } else if (arr = (PARS.pformat).match(/float\_([1-9]{1,4})/)) {
                PARS.textNode = $js.toFixed(PARS.textNode * 1, arr[1]);
            }
        }
        if (PARS.tagName) {
            PARS = 0;
            pare = PARS;
        }
        var openInf = (PARS.openInf) ? PARS.openInf : false;
        delete (PARS.openInf);
        if (PARS._iHelp) {
            PARS._i = {t: PARS._iHelp};
            delete (PARS._iHelp);
        }
        var _i = (PARS._i) ? PARS._i : false;
        delete (PARS._i);
        if (tag == 'date') {
            tag = 'input';
            PARS.type = 'date';
        }
        if (tag == 'textarea' && PARS.textNode == undefined) {
            PARS.textNode = '';
        }
        var inpType = '';
        var tagNode = false;
        if (PARS && PARS.node) {
            tagNode = PARS.node;
            delete (PARS.node);
        }
        var bodyAjax = $1.q('#bodyAjax');
        if ($1.textIs && $1.textIs.is) {
            if (PARS.textNode) {
                PARS.textNode = ($1.textIs.is == PARS.textNode) ? $1.textIs.then : $1.textIs.end;
            }
        }
        if ($1.body == '') {
            $1.body = bodyAjax;
        } else if (!$1.body) {
            $1.body = document.body;
        }
        $1.body = $1.body;
        var atrNs = (tag == 'sgv') ? true : false;
        if (tag == 'sgv') {
            var elemento = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        } else if (tag == "textNode") {
            PARS = (PARS + '').replace(/\\n/g, "\n");
            var t = document.createTextNode(PARS);
            if (pare) {
                pare.appendChild(t);
            }
            return t;
        } else if (tag == "clear") {
            var t = $1.t('br', {clear: 'all'}, pare);
            return t;
        } else {
            var elemento = document.createElement(tag);
        }
        if (faIco) { /* crea fa ico antes de todo */
            xP = (typeof (faIco) == 'string') ? {'class': faIco} : {'class': faIco.fa};
            var span = $1.t('span', xP, elemento);
            if (faIco.color) {
                span.style.color = faIco.color;
            }
        }
        if (PARS) {
            if (PARS.disabled == null || PARS.disabled == undefined) {
                delete (PARS.disabled);
            }
            if (PARS.numberformat && !PARS.placeholder) {
                PARS.placeholder = '100,000.50';
            }
            var inpType = PARS.type;
            if (tag == 'input' && PARS.value == undefined) {
                PARS.value = '';
            }
            if ((typeof (PARS)).match(/^string|number$/)) {
                elemento.appendChild(document.createTextNode(PARS));
                return elemento;
            }
            if (tag == 'textarea' && PARS.value) {
                PARS.textNode = PARS.value;
                delete (PARS.value);
            }
            if (tag == 'input' && PARS.type == 'radio') {
                elemento.onclick = function () {
                    if (!this.checked) {
                        this.removeAttribute('checked');
                    }
                }
            } else if (tag == 'input' && inpType == 'date') {
                PARS.type = 'text';
                elemento.style.cursor = 'pointer';
                elemento.HH = PARS.HH;
                elemento.tdClick = PARS.tdClick;
                elemento.onclick = function () {
                    ADMS_Calendar.Simple.opeN(this);
                }
                //elemento.onfocus = function(){ ADMS_Calendar.Simple.opeN(this); }
                if (isIE_8) {
                    elemento.setAttribute('class', PARS['class']);
                } else {
                    elemento.setAttribute('class', PARS['class']);
                }
                delete (PARS['class']);
                elemento.classList.add('JDate', 'iBg2', 'iBg_date');
                elemento.setAttribute('placeholder', 'YYYY-mm-dd');
                delete (PARS.placeholder);
                if (PARS.value == undefined || PARS.value == '0000-00-00' || PARS.value == ' ') {
                    PARS.value = '';
                }
            }
            if (PARS.abbr) {
                PARS.title = PARS.textNode;
                PARS.textNode = (PARS.textNode && PARS.textNode.length > PARS.abbr) ? (PARS.textNode).substring(0, PARS.abbr) + '...' : PARS.textNode;
                delete (PARS.abbr);
            }
            if ((tag == 'input' || tag == 'textarea') && !PARS.autocomplete) {
                PARS.autocomplete = "off";
            }
            if (PARS['data-vPost'] && PARS.vPost) {
                elemento.vPost = PARS.vPost;
                delete (PARS.vPost);
            }
            for (Atr in PARS) {
                var valor = PARS[Atr];
                if (tag == 'input' && PARS.value != '' && !isNaN(PARS.value)) {
                    PARS.value = PARS.value * 1;
                }
                if (Atr != "style" && Atr != 'textNode') {
                    if (isIE && (Atr.toLowerCase()) == "class") {
                        if (isIE_8) {
                            elemento.setAttribute('class', valor);
                        } else {
                            elemento.setAttribute('className', valor);
                        }
                    } else if (typeof (PARS[Atr]) == 'object') {
                        elemento[Atr] = PARS[Atr];
                    } else if (typeof (PARS[Atr]) == 'function') { /* nada */
                    } else if (tag == 'input' && (PARS.type == 'checkbox' || PARS.type == 'radio') && Atr == 'checked' && PARS[Atr] == false) { /* no poner checked */
                    } else if ((tag == 'input' || tag == 'select') && Atr == 'disabled' && PARS[Atr] == false) { /* no poner checked */
                    } else {
                        if (atrNs) {
                            elemento.setAttributeNS(null, Atr, valor);
                        } else {
                            elemento.setAttribute(Atr, valor);
                        }
                    }
                } else if (Atr == "style" && valor) {
                    var styls = (valor).split(/;/g);
                    var styleDe = '';
                    for (s = 0; s < styls.length; s++) {
                        styls[s] = styls[s].replace(/; ?/gi, "");
                        var pars = (styls[s]).split(":");
                        pars[0] = (pars[0]).replace('-radius', 'Radius');
                        var vv = (pars[1]) ? pars[1] : '';
                        var impt = (vv.match(/\!important/)) ? 'important' : '';
                        imp = (impt != '');
                        vv = vv.replace(/\!important/, '');
                        valSty = pars[0];
                        if (!imp) { //no borderLeft
                            var exp = /-([a-z])/;
                            exp.test(pars[0]);
                            pars[0] = pars[0].replace(exp, RegExp.$1.toUpperCase());
                            var exp = /-([a-z])/;
                            exp.test(pars[0]);
                            var valSty = pars[0].replace(exp, RegExp.$1.toUpperCase());
                        }
                        if (isIE) {
                            valSty = valSty.replace(/float/gi, 'styleFloat');
                        } else {
                            valSty = valSty.replace(/float/gi, 'cssFloat');
                        }
                        if (valSty != "" && valSty != " " && valSty) {
                            if (imp) {
                                elemento.style.setProperty(valSty, vv, impt);
                            } else {
                                eval('elemento.style.' + valSty + ' = "' + vv + '"');
                            }
                        }
                    }
                } else if (Atr == "textNode") {
                    if ((valor == null || valor == undefined) && $1.nullBlank !== false) {
                        valor = $1.nullBlank;
                    } else {
                        valor = (valor + '').replace(/\\n/g, "\n");
                    }
                    elemento.appendChild(document.createTextNode(valor));
                }
            }
        }
        if (tag == 'input' && inpType == 'date') {
            var span = $1.t('span', {style: 'display:inline-block; position:relative;'});
            span.appendChild(elemento);
            var clear = $1.t('button', {
                'class': 'iBg iBg_closeSmall',
                style: 'position:absolute; top:25%; right:0.125rem;'
            });
            clear.onclick = function () {
                $1.clearInps(this.parentNode);
            }
            span.appendChild(clear);
            elemento = span;
        } else if (PARS.keyChange) {
            elemento.keyChange(PARS.keyChange);
        } else if (tag == 'input' && PARS.numberformat == 'mil') {
            elemento.onkeyup = function () {
                this.value = $Str.toMil(this.value);
                if (PARS.onkeychange) {
                    PARS.onkeychange(this);
                }
            }
            elemento.value = $Str.toMil(elemento.value);
        } else if (PARS.onkeychange) {
            elemento.onkeyup = function () {
                PARS.onkeychange(this);
            }
            elemento.onchange = function () {
                PARS.onkeychange(this);
            }
        }
        if (tagNode) {
            elemento.appendChild(tagNode);
        }
        if (pare) {
            pare.appendChild(elemento);
        }
        if (_i) {
            $i.t(_i, elemento);
        }
        if (openInf) {
            var o = $1.t('span', {'class': 'fa faBtn fa_info', style: 'font-size:0.7rem; color:blue;'}, elemento);
            o.onclick = function () {
                $ps_DB.simple('/tuto/' + openInf, {
                    func: function (r) {
                        var wrap = $1.t('div');
                        wrap.innerHTML = r;
                        $1.t('br', 0, wrap);
                        var close = $1.T.btnNew({
                            textNode: 'Cerrar esta Ventana', func: function () {
                                $1.delet('sysInformationWin');
                            }
                        });
                        wrap.appendChild(close);
                        $1.Win.open(wrap, {
                            winTitle: 'Información Adicional',
                            winId: 'sysInformationWin',
                            winSize: 'medium',
                            onBody: 1
                        });
                    }
                });
            }
        }
        return elemento;
    },
    append: function (pare, chi, P) {
        P = (P) ? P : {};
        if (!pare || !pare.appendChild) {
            $1.Win.message({
                title: 'Error de Ejecución',
                text: 'El elemento padre no ha sido encontrado o no es forma parte del DOM, Error JS: ' + typeof (pare)
            });
        } else {
            if (P.noInsertIf) {
                var obj = $1.q(P.noInsertIf, pare);
                if (obj && obj.tagName) {
                    return '';
                } else {
                    pare.appendChild(chi);
                }
            } else {
                pare.appendChild(chi);
            }
        }

    },
    I: {
        after: function (iNode, old) {
            old.parentNode.insertBefore(iNode, old.nextSibling);
        },
        before: function (i, old) {
            if (old.parentNode) {
                if (old.parentNode.firstChild == null) {
                    old.appendChild(i);
                } else {
                    old.parentNode.insertBefore(i, old);
                }
            }
        }
    }
}
$1.i = {//conteos
    nexT: function (k) {
        $1.i[k]++;
        return $1.i[k];
    },
    cks: 0,
}
$1.Win = {
    print: function (contOrig, P, appendCont) {
        var P = (P) ? P : {};
        if (P && P.btn) {
            var printTo = $1.t('button', {
                'class': 'iBg iBg_print no-print cPointer',
                style: 'margin:0.5rem;',
                textNode: ((P.btn.textNode) ? P.btn.textNode : ''),
                title: 'Imprimir'
            }, P.pare);
            delete (P.pare);
            delete (P.btn);
            printTo.onclick = function () {
                $1.Win.print(contOrig, P, appendCont);
            }
            return printTo;
        }
        pareOri = contOrig.parentNode;
        content = contOrig;//content.cloneNode(1);
        if ($1.body) {
            $1.body = $1.q('#bodyAjax');
        }
        content.classList.add('section-to-print');
        if (P.margin != 'N') {
            content.classList.add('Page1');
        }
        var P = (P == undefined) ? {} : P;
        var tStyle = (P.zIndex) ? 'z-index:' + P.zIndex + ';' : 'z-index:1000;';
        var ide = (P.id) ? P.id : 'admsWinPrinter';
        $1.delet(ide);
        var wrapBk = $1.t('div', {
            id: ide,
            'class': 'admsWinPrinter',
            style: 'position:relative; top:0; left:0; ' + tStyle + ' background-color:#FFF;'
        });
        if (!P.noClose) {
            var clos = $1.t('button', {'class': 'iBg iBg_close  no-print', textNode: 'Cancelar'});
            clos.onclick = function () {
                if (P.funcOnClose) {
                    P.funcOnClose();
                }
                $1.body.style.display = '';
                $1.delet(wrapBk);
            }
            //wrapBk.appendChild(clos);
        }
        var printTo = $1.t('button', {
            'class': 'btnAddText iBg_print no-print',
            style: 'margin:0.5rem;',
            textNode: 'Imprimir Nuevamente'
        });
        printTo.onclick = function () {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            print();
        }
        $1.body.style.display = 'none';
        //wrapBk.appendChild(printTo);
        var nchild = 0;
        var childs = content.parentNode.childNodes;
        for (var i = 0; i < childs.length; i++) {
            if (content == childs[i]) {
                nchild = i;
            }
        }
        if (appendCont) {
            wrapBk.appendChild(appendCont);
        }
        wrapBk.appendChild(content);
        document.body.appendChild(wrapBk);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        printTo.click();
        pareOri.insertBefore(content, pareOri.childNodes[nchild]);
        //pareOri.appendChild(content);
        $1.body.style.display = '';
        $1.delet(wrapBk);
    },
    printO: function (cont) {
        var cls = 'admsPrinterFrame';
        $1.delet($1.q('#__frameprint'));
        var win = $1.t('iframe', {id: '__frameprint', src: 'print?cls=' + cls, style: 'display:none;'});
        cont.classList.add(cls);
        document.body.appendChild(win);
    },
    prompt: function (content, P, appendCont) {
        //use divLine en content. para que el input ocupe todo
        var P = (P == undefined) ? {} : P;
        var tStyle = (P.zIndex) ? 'z-index:' + P.zIndex + ';' : 'z-index:1000;';
        var ide = (P.winId) ? P.winId : 'admsWinPrompt';
        $1.delet(ide);
        var wrapBk = $1.t('div', {
            id: ide,
            'class': 'admsWinPrompt',
            style: 'position:fixed; top:0; left:0; width:100%; height:100%; overflow-y:auto; ' + tStyle + ' background-color:rgba(0,0,0,0.7);'
        });
        var wrap = $1.t('div', {style: 'max-width:50%; margin:10% auto 0 auto; background:#FFF; padding:1rem; position:relative;'});
        wrapBk.appendChild(wrap);
        if (!P.noClose) {
            var clos = $1.t('input', {type: 'button', 'class': 'iBg iBg_close', style: 'position:absolute; right:0;'});
            clos.onclick = function () {
                if (P.funcOnClose) {
                    P.funcOnClose();
                }
                $1.delet(wrapBk);
            }
            wrap.appendChild(clos);
        }
        if (appendCont) {
            wrapBk.appendChild(appendCont);
        }
        wrap.appendChild(content);
        wrap.appendChild($1.T.btnSend({
            value: 'Aceptar', func: function () {
                if (P.func) {
                    P.func();
                }
            }
        }));
        wrap.appendChild($1.T.btnSend({
            value: 'Cancelar', func: function () {
                $1.delet(wrapBk);
            }
        }));
        document.body.appendChild(wrapBk);
    },
    confirm: function (D) {
        //text, textConfirm,winTitle, func
        winId = (D.winId) ? D.winId : 'winConfirmV1';
        $1.delet(winId);
        var wrapC = $1.t('div', {id: winId, 'class': 'winConfirm'});
        var wrap = $1.t('div', {'class': 'winConfirm-content'});
        var titl = (D.winTitle) ? D.winTitle : 'Confirmar Operación';
        $1.t('h3', {textNode: titl}, wrap);
        if (D.text) {
            wrap.appendChild($1.t('p', {textNode: D.text}));
        }
        var textConfirm = (D.textConfirm) ? D.textConfirm : '¿Desea Continuar?';
        if (D.Inode) {
            wrap.appendChild(D.Inode);
        }
        $1.t('div', {'class': 'input_info', textNode: textConfirm}, wrap);
        if (D.InodeBot) {
            wrap.appendChild(D.InodeBot);
        }
        var resp = $1.t('div', 0, wrap);
        if (D.apiSend) {
            var aP = {
                getInputs: function () {
                    return $1.G.inputs(wrapC);
                }, loade: resp, func: function (Jr) {
                    $Api.resp(resp, Jr);
                    if (D.func) {
                        D.func(Jr);
                    }
                    if (!D.noClose) {
                        $1.delet(wrapC);
                    }
                }
            };
            if (typeof (D.apiSend) == 'object') {
                for (var iz in D.apiSend) {
                    aP[iz] = D.apiSend[iz];
                }
            } else {
                aP.f = D.apiSend;
            }
            var yBtn = $Api.send(aP);
        } else {
            var btnText = (D.btnText) ? D.btnText : 'Aceptar';
            var yBtn = $1.t('input', {
                type: 'button',
                'class': 'btns btns-submit',
                value: btnText,
                style: 'margin-top:10px;'
            });
            yBtn.onclick = function () {
                if (D.func) {
                    D.func(resp, wrapC, this);
                }
                if (!D.noClose) {
                    $1.delet(wrapC);
                }
            }
        }
        var nBtn = $1.t('input', {
            type: 'button',
            'class': 'btns btns-reset',
            value: 'Cancelar / Cerrar',
            style: 'margin-top:10px;'
        });
        nBtn.onclick = function () {
            $1.delet(wrapC);
        }
        wrap.appendChild(yBtn);
        wrap.appendChild(nBtn);
        wrapC.appendChild(wrap);
        $1.body.appendChild(wrapC);
    },
    confirmAndClose: function (Jq, D) {
        var D = (D) ? D : {};
        var psWin = document.getElementsByClassName('psWinMessageAutoResp')[0];
        $1.delet(psWin);
        var wrapC = $1.t('div', {
            'class': 'psWinMessageAutoResp',
            style: 'position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(255,255,255,0.7); z-index:10;'
        });
        var wrap = $1.t('div', {style: 'margin:5% auto 0 auto; width:400px; max-height:250px; padding:10px; background:#FFF; border:1px solid #CCC; overflow-y:auto;'});
        var titl = (D.winTitle != undefined) ? D.winTitle : 'Respuesta de Proceso';
        var cont = (typeof (Jq.text) == 'string') ? $1.t('p', {'textNode': Jq.text}) : Jq.text;
        wrap.appendChild($1.t('h3', {'textNode': titl}));
        wrap.appendChild(cont);
        var iClose = $1.t('input', {type: 'reset', 'value': 'Continuar', style: 'margin-top:10px;'});
        iClose.onclick = function () {
            $1.delet(wrapC);
            if (D.func) {
                if (typeof (D.func) == 'string') {
                    eval('D.func()')
                } else {
                    D.func();
                }
            }
        }
        wrap.appendChild(iClose);
        var iClose = $1.t('input', {type: 'reset', 'value': 'Cerrar Ventana', style: 'margin-top:10px;'});
        iClose.onclick = function () {
            $1.delet(wrapC);
        }
        wrap.appendChild($1.t('span', ' | '));
        wrap.appendChild(iClose);
        wrapC.appendChild(wrap);
        $1.body.appendChild(wrapC);
        iClose.focus();
    }
    ,
    lastOpen: {l: 6, t: 2},
    open: function (data, P) {
        var P = (P == undefined) ? {} : P;
        $1.delet(P.winId);
        var nw = $1.q('.DOMwin_open', 0, 'all').length;
        var lastWin = nw * 1;
        winTitle = (P.winTitle != undefined) ? P.winTitle : 'Ventana de Proceso';
        var tStyle = (P.zIndex) ? 'z-index:' + P.zIndex + ';' : 'z-index:5;';
        var intHeight = (P.intHeight != undefined) ? ' height:' + P.intHeight + ';' : 'min-height:120px;';
        var intMaxWidth = (P.intMaxWidth != undefined) ? P.intMaxWidth : '50rem';
        P.minWidth = (P.minWidth == 'medium') ? 620 : P.minWidth;
        var minWidth = (P.minWidth != undefined) ? 'min-width:' + (P.minWidth / 16) + 'rem;' : '';
        var winStyle = ' max-width:' + intMaxWidth + ';' + intHeight + minWidth + '; ';
        if (P.winSize == 'medium-small') {
            winStyle = 'width:32.5rem; max-height:95%;;';
        } else if (P.winSize == 'medium') {
            winStyle = 'width:38.75rem; max-height:95%;';
        } else if (P.winSize == 'medium-2') {
            winStyle = 'width:48.75rem; max-height:95%;';
        } else if (P.winSize == 'm-full') {
            winStyle = 'width:95%; height:90%; left:0; top:0;';
        } else if (P.winSize == 'full') {
            winStyle = 'width:100%; height:100%; left:0; top:0;';
        } else if (P.winSize == 'auto') {
            winStyle = 'width:auto; height:auto; left:10%; top:8%;';
        } else {
            winStyle = 'left:' + ($1.Win.lastOpen.l + lastWin) + '%; top:' + ($1.Win.lastOpen.t + lastWin) + '%; ';
        }
        var winIs = 'iBg_winMax';
        var winIsBk = '';
        var wrapBk = $1.t('div', {'class': 'DOMwin_open winCanMove ', style: 'height:80%;' + tStyle + winStyle});
        if (P.winId) {
            wrapBk.setAttribute('id', P.winId);
        }
        var wrap = $1.t('div', {'class': 'winWrap'});
        var move = $1.t('input', {type: 'button', 'class': 'iBg iBg_move'});
        $1.EV.winMove(move, wrapBk);
        var resi = $1.t('input', {type: 'button', 'class': 'iBg ' + winIs + ' btnResize'});
        resi.onclick = function () {
            var tc = this.classList;
            if (tc.contains('iBg_winMax')) {
                tc.remove('iBg_winMax');
                tc.add('iBg_winMin');
                wrapBk.classList.add('DOMwin_openFull');
            } else {
                tc.remove('iBg_winMin');
                tc.add('iBg_winMax');
                wrapBk.classList.remove('DOMwin_openFull');
            }
        }
        var clos = $1.t('input', {type: 'button', 'class': 'iBg iBg_close'});
        clos.onclick = function () {
            if (P.funcOnClose) {
                P.funcOnClose();
            }
            if (P.onClose) {
                P.onClose(wrapBk);
            } else {
                $1.delet(wrapBk);
            }
        }
        var wrapTop = $1.t('div', {'class': 'winWrapTop'});
        if (P.winTitle) {
            wrapTop.appendChild($1.t('h4', {'class': 'winTitle', 'textNode': P.winTitle}));
        }
        if (P.winSize != 'full') {
            wrapTop.appendChild(resi);
            wrapTop.appendChild(move);
        }
        wrapTop.appendChild(clos);
        wrap.appendChild(wrapTop);
        wrapCont = $1.t('div', {'class': 'winWrapCont'});
        if (P.print) {
            var pri = $1.t('button', {'class': 'btn iBg_print'}, wrapCont);
            pri.onclick = function () {
                $1.Win.print(data);
            }
        }
        wrapCont.appendChild(data);
        if (P.bottomCont) {
            var bot = $1.t('div', {style: 'position:absolute; bottom:0.5rem; font-size:0.75rem;'});
            bot.appendChild(P.bottomCont);
            wrapCont.appendChild(bot);
        }
        wrap.appendChild(wrapCont);
        wrapBk.appendChild(wrap);
        if ($1.body) {
            $1.body.appendChild(wrapBk);
            return wrapBk;
            ;
        } else if (P.onBody) {
            document.appendChild(wrapBk);
            return wrapBk;
        }
        return wrapBk;
    }
    ,
    openBk: function (contAdd, P) {
        var P = (P) ? P : {};
        if (!contAdd.classList.contains('__wrapContent')) {
            contAdd.classList.add('__wrapContent');
        }
        var winId = (P.winId) ? P.winId : '_winopenBk';
        $1.delet(winId);

        var bkFull = $1.t('div', {
            id: winId,
            style: 'position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.4); z-index:0; overflow:auto;'
        });
        var sty = '';
        sty = (P.minWi) ? 'min-width:' + P.minWi + ';' : '';
        sty = (P.winWi) ? 'width:' + P.winWi + ';' : sty;
        var wrapBk = $1.t('div', {'class': '_winOpenBk', style: sty});
        var clos = $1.t('input', {
            type: 'button',
            'class': 'iBg iBg_close',
            style: 'position:absolute; top:8px; right:6px;'
        });
        var overf = document.body.style.overflow;
        clos.onclick = function () {
            if (P.funcOnClose) {
                P.funcOnClose();
            }
            document.body.style.overflow = overf;
            $1.delet(bkFull);
        }
        if (P.winTitle) {
            wrapBk.appendChild($1.t('h4', P.winTitle));
        }
        wrapBk.appendChild(clos);
        wrapBk.appendChild(contAdd);
        bkFull.appendChild(wrapBk);
        document.body.style.overflow = 'hidden';
        if (P.ret) {
            return bkFull;
        } else {
            $1.body.appendChild(bkFull);
        }
    }
    ,
    title: function (contAdd, P) {
        var winId = (P.winId) ? P.winId : '_1winTitle';
        $1.delet(winId);
        var pare = P.pare;
        var oldP = pare.style.position;
        var bkFull = $1.t('div', {
            id: winId,
            style: 'position:absolute; top:100%; left:0; padding:0.25rem; background-color:rgba(0,0,0,0.75); color:#FFF; font-size:0.6rem;'
        });
        var clos = $1.t('input', {
            type: 'button',
            'class': 'iBg iBg_closeSmall',
            style: 'position:absolute; top:0.25rem; right:0; border:0.0625 solid #CCC; border-radius:0.25rem;'
        });
        clos.onclick = function () {
            if (P.funcOnClose) {
                P.funcOnClose();
            }
            pare.style.position = oldP;
            $1.delet(bkFull);
        }
        bkFull.appendChild(clos);
        bkFull.appendChild(contAdd);
        if (pare) {
            pare.style.position = 'relative';
            pare.appendChild(bkFull);
        } else if (P.ret) {
            return bkFull;
        }
    }
    ,
    message: function (H) {
        winId = 'psWinMessageAutoResp';
        if (H.winId == 'rand') {
            winId = '_' + $js.srand(1, 100);
        } else if (H.winId) {
            winId = H.winId;
        }
        var psWin = $1.q('#' + winId);
        $1.delet(psWin);
        var zIndex = (H.errNo == 1 || H.errNo == 4 || H.errNo == 5) ? 'z-index:99999;' : 'z-index:10;';
        var wrapC = $1.t('div', {
            id: winId,
            'class': 'psWinMessageAutoResp ',
            style: 'position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(255,255,255,0.7);' + zIndex
        });
        var wrap = $1.t('div', {style: 'margin:5% auto 0 auto; width:95%; max-height:250px; padding:0.25rem; background:#FFF; border:0.0625rem solid #CCC; overflow-y:auto;'});
        var titl = (H.title != undefined) ? H.title : 'Información de Proceso';
        var cont = (typeof (H.text) == 'string') ? $1.t('p', {'textNode': H.text}) : H.text;
        wrap.appendChild($1.t('h3', {'textNode': titl}));
        if (H.errs) {
            delete (H.errs);
            for (var i in H) {
                $1.t('p', {textNode: H[i].text}, wrap);
            }
        } else {
            wrap.appendChild(cont);
        }
        if (H.Msg) {
            for (var i in H.Msg) {
                var lT = H.Msg[i];
                var p = $1.t('p', {style: 'border:1px solid #CCC; padding:.25rem;'}, wrap);
                if (lT.tag) {
                    $1.t('div', {'class': 'badge', textNode: lT.tag}, p);
                }
                if (lT.errCode) {
                    $1.t('div', {'class': 'badge bf-danger', textNode: lT.errCode}, p);
                }
                $1.t('span', {textNode: lT.text}, p);
            }
            delete (H.Msg);
        }
        if (H.ajaxFile) {
            wrap.appendChild($1.t('h5', {textNode: 'on: ' + H.ajaxFile}));
        }
        if (H.phpErr) {
            wrap.appendChild($1.t('h5', {textNode: 'Server: ' + H.phpErr}));
        }
        $1.t('br', {}, wrap);
        if (H.func) {
            btnText = (H.btnText) ? H.btnText : 'Continuar';
            var iClose = $1.t('input', {type: 'reset', 'value': btnText, style: 'margin-top:10px;'}, wrap);
            iClose.onclick = function () {
                $1.delet(wrapC);
                H.func();
            }
            $1.t('span', {textNode: ' | '}, wrap);
        }
        var iClose = $1.t('input', {type: 'reset', 'value': 'Cerrar Ventana', style: 'margin-top:10px;'});
        iClose.onclick = function () {
            $1.delet(wrapC);
        }

        wrap.appendChild(iClose);
        wrapC.appendChild(wrap);
        $1.body.appendChild(wrapC);
        iClose.focus();
    }
    ,
    relative: function (contAdd, wrapRel, P) {
        var wrapRelDiv = (wrapRel == 'return') ? {} : wrapRel;
        var P = (P) ? P : {};
        if (!contAdd.classList.contains('__wrapContent')) {
            contAdd.classList.add('__wrapContent');
        }
        var winId = (P.winId) ? P.winId : '_winAbsoluteRel';
        $1.delet(winId);
        var bkFull = $1.t('div', {
            id: winId,
            style: 'position:fixed; top:0; left:0; overflow-y:auto; width:100%; height:100%; background-color:rgba(0,0,0,0.4); z-index:0;'
        })
        var winPos = 'top:' + wrapRel.offsetTop + '; left:' + wrapRel.offsetLeft + ';';
        var wrapBk = $1.t('div', {
            'class': 'admsWinRelative',
            style: 'position:absolute; ' + winPos + ' background-color:rgba(255,255,255,0.95); padding:6px; border:1px solid #CCC;'
        });
        var clos = $1.t('input', {
            type: 'button',
            'class': 'iBg iBg_close',
            style: 'position:relative; top:-16px; left:98%;'
        });
        clos.onclick = function () {
            if (P.funcOnClose) {
                P.funcOnClose();
            }
            $1.delet(bkFull);
        }
        if (P.winTitle) {
            wrapBk.appendChild($1.t('h6', P.winTitle));
        }
        wrapBk.appendChild(clos);
        wrapBk.appendChild(contAdd);
        bkFull.appendChild(wrapBk);
        if (P.ret) {
            return bkFull;
        } else {
            $1.body.appendChild(bkFull);
        }
    }
    ,
    minRel: function (data, P, pare) {
        if (!data.classList.contains('__wrapContent')) {
            data.classList.add('__wrapContent');
        }
        var P = (P) ? P : {};
        var winId = (P.winId) ? P.winId : 'winMiniRelativeOf';
        $1.delet(winId);
        var pos = 'top:0px; left:100%;';
        var intMaxWidth = (P.intMaxWidth != undefined) ? P.intMaxWidth : '200px';
        if (P.winPosition) {
            var pos = P.winPosition + ';';
        }
        winTitle = (P.winTitle) ? P.winTitle : 'Ventana de Proceso';
        var noTitle = P.noTitle;
        if (!P.w) {
            P.w = {};
        }
        P.w.id = winId;
        P.w['class'] = '_winMinRel';
        if (!P.w.style) {
            P.w.style = '';
        }
        if (P.width) {
            P.w.style += 'width:' + P.width + 'rem; max-width:100%;';
        }
        if (P.posi == 'r') {
            P.w.style += 'right:0; top:100%;';
        }
        if (P.posi == 'rCal') {
            P.w['class'] += ' _rightCalc';
        }
        var wrapBk = $1.t('div', P.w, pare);
        var wrapInt = $1.t('div', {'class': '_winMinRel_intWrap'}, wrapBk);
        if (P.winTitle) {
            $1.t('h5', {'class': '_winMinReal_title', textNode: P.winTitle}, wrapInt);
        }
        wrapInt.appendChild(data);
        if (pare) {
            pare.style.position = 'relative';
        } else if (P.onBody) {
            document.body.appendChild(wrapBk);
        }
        return wrapBk;
    }
    ,
};
$1.optsFromTxt = function (k, O) {
    O = [];
    if (k) {
        var S = (k).split(',');
        var n = 1;
        for (var i in S) {
            O.push({k: n, v: S[i]});
            n++;
        }
    }
    return O;
}
$1.T = {
    selOpts: false,/* opt1:{}, opt9 */
    sel: function (P, sel) {
        //_active=N,
        if (P.optAll) {
            P.noBlank = 'Y';
        }
        var reLoad = (P.reLoad) ? true : false;
        pare = false;
        var xLoad = P.xLoad;
        if (reLoad && !P.xLoad) {
            P.reLoad.style.display = 'none';
            if (P.reLoad.parentNode) {
                xLoad = $1.t('span', {textNode: 'Cargando...', style: 'fontSize:10px;'}, P.reLoad.parentNode);
            }
            setTimeout(function () {
                P.xLoad = xLoad;
                $1.T.sel(P, sel);
            }, 10);
            return false;
        }
        var tSel = {};
        if (!reLoad) {
            if (P.sel) {
                for (var k in P.sel) {
                    tSel[k] = P.sel[k];
                }
            }
            if (!P.sel) {
                P.sel = {};
            }
            for (var k in P) {
                if ((k + '').match(/(sel|opt0|opt1|opt9|opts|kIf|noBlank|noBlank|struc|view|nameSendText|kR|selected)/)) {
                    continue;
                }
                P.sel[k] = P[k];
            }
        }
        if (sel && sel.tagName != 'SELECT') {
            pare = sel;
            sel = false;
        }
        if (reLoad) {
            sel = P.reLoad;
            $1.clear(sel);
            sel.setAttribute('reLoad', 'Y');
        } else {
            sel = $1.t('select', P.sel);
        }
        var blankText = (P.blankText) ? P.blankText : 'Seleccione';
        if (P.opt0 != undefined && P.opt0 != null) {
            $1.t('option', {value: P.opt0, 'textNode': blankText}, sel);
        }
        if (P.noBlank == undefined && P.opts && P.opts[''] == undefined) {
            var opt = $1.t('option', {value: '', 'textNode': blankText}, sel);
        }
        if (typeof ($1.T.selOpts) == 'object') {
            if ($1.T.selOpts.opt1) {
                P.opt1 = $1.T.selOpts.opt1;
            }
            if ($1.T.selOpts.opt9) {
                P.opt9 = $1.T.selOpts.opt9;
            }
        }
        var n = 0;
        if (P.opt1) {
            var opt = $1.t('option', {value: P.opt1.k, textNode: ((P.opt1.t) ? P.opt1.t : 'Ninguna')}, sel);
            if (P.selected == P.opt1.k) {
                opt.setAttribute('selected', 'selected');
                sel.defaultOption = n;
                n++;
            }
        }
        if (P.opts && P.opts.errNo) {
            sel.appendChild($1.t('option', {value: null, 'textNode': 'Error Obtieniendo el Listado'}));
        } else {
            var optOmit = false;
            if (P.optOmit) {
                optOmit = {};
                var optS2 = (P.optOmit) ? P.optOmit.split(',') : false;
                for (var i in optS2) {
                    optOmit[optS2[i]] = 1;
                }
            }
            var optGroups = {};
            var nGroup;//para agregar a opts Groups
            for (var s in P.opts) {
                var Ox = P.opts[s];
                var k = s;
                var v = Ox;
                if (typeof (Ox) == 'object') {
                    if (Ox._inactive == 'Y' || Ox._active == 'N') {
                        continue;
                    }/*definir para no mostrar */
                    k = Ox.k;
                    v = Ox.v;
                }
                if (optOmit && optOmit[k]) {
                    continue;
                }
                if (P.v) {
                    v = Ox[P.v];
                }
                var omit = 0;
                var k = (P.kIsV) ? v : k;
                k = (P.addValBegin) ? P.addValBegin + k : k;
                if (P.matchh) {
                    var xr = new RegExp(P.matchh, 'g');
                    if (!k.match(xr)) {
                        continue;
                    }
                }
                if (P.kIf) {//whsType:P si
                    for (var kz in P.kIf) {
                        if (Ox[kz] != P.kIf[kz]) {
                            omit = 1;
                            break;
                        }
                    }
                }
                if (omit > 0) {
                    continue;
                }
                var tPare = sel;
                if (Ox.optGroup) {
                    //crear optGroup y usarlo si aplica
                    if (!optGroups[Ox.optGroup]) {
                        optGroups[Ox.optGroup] = $1.t('optGroup', {label: Ox.optGroup}, sel);
                        ;
                    }
                    tPare = optGroups[Ox.optGroup];
                }
                var val = (P.struct == 'k-v' || P.view == 'k-v') ? k + ' - ' + v : v;
                if (P.optsFTxt) {//convertir en formato
                    val = P.optsFTxt({k: k, value: val});//with return
                }
                if (P.view == 'k)v') {
                    val = k + ') ' + v;
                }
                var opt = $1.t('option', {value: k, textNode: val}, tPare);
                if (P.AJs) { //Añadir a option y luego obtenerlos de option para select
                    opt.AJs = {};
                    for (var k9 in P.AJs) {
                        opt.AJs[P.AJs[k9]] = Ox[P.AJs[k9]];
                    }
                }
                if (Ox && Ox.tit) {
                    opt.setAttribute('title', Ox.tit);
                }
                if (P.nameSendText) {
                    opt.setAttribute('namesendtext', P.nameSendText);
                }
                if (P.kR) {
                    opt.setAttribute('kr', s);
                }
                if (P.P == 'Y') {
                    opt.P = Ox;
                }
                if (k == P.selected) {
                    opt.setAttribute('selected', 'selected');
                    sel.defaultOption = n;
                }
                var mm = new RegExp(k + '\,?');
                if (P.value && P.multiple && (P.value).match(mm)) {
                    opt.setAttribute('selected', 'selected');
                    sel.defaultOption = n;
                }
                n++;
            }
        }
        if (P.opt9) {
            var opt = $1.t('option', {value: P.opt9.k, textNode: ((P.opt9.v) ? P.opt9.v : 'Última')}, sel);
            if (P.selected == P.opt9.k) {
                opt.setAttribute('selected', 'selected');
                sel.defaultOption = n;
            }
        }
        if (P.optAll) {
            var opt = $1.t('option', {value: '', textNode: 'Todos'}, sel);
            if (P.selected && P.selected == P.optAll) {
                opt.setAttribute('selected', 'selected');
                sel.defaultOption = n;
            }
        }
        if (pare) {
            pare.appendChild(sel);
        }
        if (reLoad) {
            sel.style.display = '';
            $1.delet(xLoad);
        } else {
            return sel;
        }
    },
    table: function (TDS, P, pare) {
        var P = (P) ? P : {};
        if (P.L) {
            P.DATA = P.L;
        }
        var DAT = (P.DATA) ? P.DATA : false;
        var pare = (P.pare) ? P.pare : pare;
        var trHead = (P.trHead) ? P.trHead : 0;
        var rBody = false;
        if (P.rBody) {
            rBody = true;
            P.tBody = true, delete (P.rBody);
        }
        var tBody = (P.tBody) ? P.tBody : 0;
        if (P.tb) {
            P = P.tb;
        }
        if (P.tbData) {
            P = P.tbData;
        }
        if (!P['class']) {
            P['class'] = 'table_zh';
        }
        if (P.addClass) {
            P['class'] += ' ' + P.addClass;
        }
        delete (P.L);
        delete (P.DATA);
        delete (P.pare);
        delete (P.trHead);
        delete (P.tb);
        delete (P.tbData);
        delete (P.tBody);
        delete (P.addClass);
        var tb = $1.t('table', P, pare);
        var tHead = $1.t('thead', 0, tb);
        if (tBody) {
            var tBody = $1.t('tbody', P.tBody, tb);
        }
        var tr0 = $1.t('tr', trHead, tHead);
        for (var t in TDS) {
            tr0.appendChild($1.t('th', TDS[t]));
        }
        if (DAT) {
            var tBody = $1.t('tbody');
            for (var e in DAT) {
                var tr = $1.t('tr');
                for (var t in TDS) {
                    if (DAT[e] && DAT[e][t] && DAT[e][t].Inode) {
                        var tdl = $1.t('td');
                        tdl.appendChild(DAT[e][t].Inode);
                    } else {
                        var tdl = $1.t('td', DAT[e][t]);
                    }
                    tr.appendChild(tdl);
                }
                tBody.appendChild(tr);
            }
            tb.appendChild(tBody);
        }
        if (rBody) {
            return tBody;
        }
        return tb;
    },
    tbtr: function (TDS, pare) {
        var tr0 = $1.t('tr');
        for (var t in TDS) {
            if (TDS[t].node) {
                node = TDS[t].node;
                delete (TDS[t].node);
                var td = $1.t('td', TDS[t]);
                td.appendChild(node);
            } else {
                var td = $1.t('td', TDS[t]);
            }
            tr0.appendChild(td);
        }
        if (pare) {
            pare.appendChild(tr0);
        } else {
            return tr0;
        }
    },
    divLTitle: function (txt, pare, tag) {
        tag = (tag) ? tag : 'h5';
        return $1.t(tag, {'class': 'divLineTitleSection', textNode: txt}, pare);
    },
    divLinewx: function (P, pare) {
        var P = (P) ? P : {};
        if (P.divLine) {
            var divLine = $1.t('div', {'class': 'divLine'});
        }
        var wn = (P.wxn) ? P.wxn : 'wrapx1';
        wxD = (P.wxT) ? P.wxT : {};
        $js.push(wxD, {'class': 'jcol ' + wn});
        var wxn = $1.t('div', wxD);
        P.L = (P.Label) ? P.Label : P.L;
        var topPos = (P.L) ? 'top:15%;' : '';
        if (wn == 'wrapx8' && P.L && !P.L.abbr) {
            P.L.abbr = 17;
        }
        if (wn == 'wrapx3' && P.L && !P.L.abbr) {
            P.L.abbr = 14;
        }
        if (P.L) {
            if (typeof (P.L) == 'string') {
                P.L = {textNode: P.L};
            }
            var lab = $1.t('label', P.L, wxn);
            if (P.req == 'Y') {
                if (P.I && P.I.sel) {
                    P.I.sel['datareq'] = 'Y';
                }
                if (P.I) {
                    P.I['datareq'] = 'Y';
                }
                var spa = $1.t('span', {textNode: '* ', style: 'color:#F00;'});
                lab.insertBefore(spa, lab.firstChild);
            }
            if (P._i) {
                $i.t(P._i, lab);
            }
            if (P.aGo) {
                $1.aGo(P.aGo, null, lab);
            }
        }
        if (P.supText) {
            $1.t('div', {style: 'font-size:0.7rem; padding:0.3rem 0;', textNode: P.supText}), wxn;
        }
        ;
        if (P.Inode) {
            wxn.appendChild(P.Inode);
        }
        if (P.I && P.I.xtag) {
            $1.xtag(P.I.xtag, P.I, wxn);
        } else if (P.I) {
            if (P.I.lTag) {
                P.I.tag = 'lTag';
                P.I.lTag;
            }
            var tagName = P.I.tag;
            delete (P.I.tag);
            //alert(tagName);
            if (tagName == 'select') {
                var tag = $1.T.sel(P.I);
            } else if (tagName == 'divSelect') {
                var tag = $1.T.divSelect(P.I);
                tag.style.display = 'block';
            } else {
                var tag = $1.t(tagName, P.I);
            }
            if (P.btnR) {
                P.btnR.P = {inp: tag};
                $1.T.btnFa(P.btnR, lab);
            }
            if (P.btnLeft) {
                var inp = $1.t('button', {
                    'class': 'btn iBg_search2',
                    style: 'position:absolute; right:1.25rem;' + topPos
                });
                var cle = $1.t('button', {
                    type: 'button',
                    'class': 'btn iBg_closeSmall',
                    style: 'position:absolute; right:0;' + topPos
                });
                inp.onclick = function () {
                    P.btnLeft.func(this);
                }
                cle.onclick = function () {
                    $1.clearInps(wxn);
                }
                tag.style.paddingLeft = '1.02rem';
                wxn.style.position = 'relative';
                wxn.appendChild(inp);
                wxn.appendChild(cle);
            }
            tag.classList.add('divL-field'); //para obtener input en otras partes
            wxn.appendChild(tag);
            if (P.addNodes) {
                wxn.appendChild(P.addNodes);
            }
        }
        if (P.subText) {
            wxn.appendChild($1.t('div', {style: 'font-size:0.7rem; padding:0.3rem 0;', textNode: P.subText}));
        }
        var r;
        if (P.divLine) {
            divLine.appendChild(wxn);
            r = divLine;
        } else {
            r = wxn
        }
        ;
        if (pare) {
            pare.appendChild(r);
        }
        return r;
    },
    divL: function (P, wrap) {
        return $1.T.divLinewx(P, wrap);
    },
    tbf: function (Lx, pare, LD) {
        var dl = false;
        for (var i in Lx) {
            var L = Lx[i];
            if (!L.L) {
                L.L = {};
            }
            var LT = L;
            if (L.T) {
                for (var i in L.T) {
                    LT[i] = L.T[i];
                }
            }
            if (L.t) {
                L.L.textNode = L.t;
            }
            if (L.v) {
                LT.textNode = L.v;
            }
            if (L.line) {
                dl = $1.t('div', {'class': 'tbf'}, pare);
            }
            var dx = $1.t('div', 0, dl);
            dx.classList.add(L.wxn);
            delete (LT.wxn);
            var ta = $1.t('div', L.L, dx);
            ta.classList.add('tbf_label');
            if (L.iT) {
                LT = $1.setTag(L.iT, LD, L.iT);
            }
            var ta = $1.t('div', LT, dx);
            if (L.node) {
                ta.appendChild(L.node);
            }
            ta.classList.add('tbf_txt');
        }
    },
    ffLine: function (P, pare) {//t:No, v:2640
        if (P.ffLine) {
            var ffLine = $1.t('div', {'class': 'ffLine'});
        }
        var wn = (P.w) ? P.w : 'ffx1';
        wxD = (P.wxT) ? P.wxT : {};
        $js.push(wxD, {'class': 'ffx_ ' + wn});
        var wxn = $1.t('div', wxD);
        if (!P.L) {
            P.L = {textNode: P.t};
        }
        if (!P.I) {
            P.I = {textNode: P.v};
        }
        if (P.L) {
            wxn.appendChild($1.t('label', P.L));
        }
        if (P.Inode) {
            wxn.appendChild(P.Inode);
        } else if (P.I) {
            if (!P.I.textNode) {
                P.I.textNode = '';
            }
            var w = $1.t('div', P.I);
            wxn.appendChild(w);
        }
        if (P.ffLine) {
            ffLine.appendChild(wxn);
            re = ffLine;
        } else {
            re = wxn
        }
        ;
        if (pare) {
            pare.appendChild(re);
        }
        return re;
    },
    btnSend: function (D, x) {
        //var val = (D.value) ? D.value : 'Enviar Información';
        var P = {'class': 'ui_button', textNode: 'Enviar Información'};
        var Conf = (D && D.confirm) ? D.confirm : false;
        delete (D.confirm);

        if (D && D.func) {
            var func = D.func;
            delete (D.func);
        }
        if (D.value) {
            D.textNode = D.value;
        }
        if (D) {
            pushO(P, D);
        }
        pare = null;
        if (x && x.tagName) {
            pare = x;
            x = false;
        }
        var iSend = $1.t('button', P, pare);
        if (x) {//para $Api, getInputs
            iSend.onclick = function () {
                T = this;
                x.btnDisabled = this;
                if (Conf) {
                    $1.Win.confirm({
                        text: Conf.text, func: function () {
                            if (x.getInputs) {
                                x.inputs = x.getInputs(T);
                            }
                            $Api.get(x);
                        }
                    });
                } else {
                    if (x.getInputs) {
                        x.inputs = x.getInputs(T);
                    }
                    $Api.get(x);
                }
            }
        } else if (func) {
            iSend.onclick = function () {
                func(this);
            }
        }
        return iSend;
    },
    btnFa: function (D, pare) {
        var val = (D.textNode) ? D.textNode : '';
        btn = '';
        if (D.faBtn) {
            btn = 'faBtnCt ';
            D.fa = D.faBtn;
        }
        faCls = (D.btnCls) ? D.btnCls : 'fa faBtn ' + btn + D.fa;
        var P = {'class': faCls, textNode: val};
        delete (D.fa);
        if (D && D.func) {
            var func = D.func;
            delete (D.func);
        }
        var Conf = D.Conf;
        if (D.Conf) {
            delete (D.Conf);
        }
        if (D) {
            pushO(P, D);
        }
        var iSend = $1.t('button', P);
        if (func) {
            iSend.onclick = function () {
                var T = this;
                if (Conf) {
                    $1.Win.confirm({
                        text: Conf.text, func: function () {
                            func(T);
                        }
                    });
                } else {
                    func(T);
                }
            }
        }
        if (pare) {
            pare.appendChild(iSend);
        }
        return iSend;
    },
    btnSpan: function (D, pare) {
        var Conf = func = false;
        if (D && D.func) {
            var func = D.func;
            delete (D.func);
        }
        if (D.Conf) {
            Conf = D.Conf;
        }
        var sty = '';
        var iSend = $1.t('div', {style: 'display:inline-block; padding:0.125rem 0.25rem; cursor:pointer;'}, pare);
        if (D.Ico) {
            var fc = (typeof (D.Ico) == 'object') ? D.Ico : {};
            if (fc.color) {
                sty += ';color:' + fc.color;
            }
            fc.style = (fc.style) ? fc.style + sty : sty;
            $1.t('span', fc, iSend)
        }
        delete (D.ico);
        span = $1.t('span', D, iSend)
        if (func) {
            iSend.onclick = function () {
                var T = this;
                if (Conf) {
                    $1.Win.confirm({
                        text: Conf.text, func: function () {
                            func(T);
                        }
                    });
                } else {
                    func(T);
                }
            }
        }
        return iSend;
    },
    btn: function (D, pare) {
        var val = (D.textNode) ? ' ' + D.textNode : '';
        var P = {'class': 'ui_button fa ' + D.fa, textNode: val};
        if (D && D.func) {
            var func = D.func;
            delete (D.func);
        }
        if (D) {
            pushO(P, D);
        }
        var iSend = $1.t('button', P, pare);
        if (func) {
            iSend.onclick = function () {
                func(this);
            }
        }
        return iSend;
    },
    btnNew: function (D, pare) {
        var val = (D.textNode) ? ' ' + D.textNode : '';
        var P = {'class': 'ui_button fa ' + D.fa, textNode: val};
        if (D && D.func) {
            var func = D.func;
            delete (D.func);
        }
        if (D) {
            pushO(P, D);
        }
        var iSend = $1.t('button', P, pare);
        if (func) {
            iSend.onclick = function () {
                func(this);
            }
        }
        return iSend;
    },
    inputSearch: function (P) {
        var wrap = $1.t('div', {style: 'position:relative;'});
        var tag = $1.t('input', {type: 'text', readonly: 'readonly'});
        var inp = $1.t('input', {type: 'button', 'class': 'btn iBg_search2', style: 'position:absolute; left:0;'});
        var cle = $1.t('input', {
            type: 'button',
            'class': 'btn iBg_closeSmall',
            style: 'position:absolute; right:0; top:1.02rem;'
        });
        inp.onclick = function () {
            P.funcLeft();
        }
        cle.onclick = function () {
            $1.clearInps(wxn);
        }
        tag.style.paddingLeft = '1.02rem';
        wrap.appendChild(inp);
        wrap.appendChild(cle);
        return wrap;
    },
    btnMain: function (D, objThis) {
        var objThis = (objThis) ? objThis : null;
        var P = {type: 'button', 'class': 'iBg iBg_menuList', title: 'Abrir Menu de Opciones'};
        if (D && D.func) {
            var func = D.func;
            delete (D.func);
        }
        if (D) {
            pushO(P, D);
        }
        var iSend = $1.t('input', P);
        if (func) {
            iSend.onclick = function () {
                func(this);
            }
        }
        return iSend;
    },
    btnClear: function (del) {
        var inp = $1.t('input', {type: 'button', 'class': 'btnClear iBg iBg_closeSmall'});
        inp.onclick = function () {
            if (del == 'delete') {
                $1.delet(this.parentNode);
            } else {
                $1.clearInps(this.parentNode);
            }
        }
        return inp;
    },
    nAddr: 1,
    btnPrint: function (cn) {
        b = $1.T.btnFa({
            fa: 'faBtnCt fa-print', func: function () {
                $1.Win.print(cn);
            }
        });
        cn.parentNode.insertBefore(b, cn);
        return b;
    },
    addr: function (obj, JSON, C) {
        var nP = $1.T.nAddr;
        obj = (obj == '') ? $i.G.byId('add_address') : obj;
        obj = (obj.tagName == undefined) ? $i.G.byId(obj) : obj;
        for (i_name in JSON) {
            var L = JSON[i_name];
            var nP = $1.T.nAddr;
            var iName = 'Address[' + nP + ']';
            var sWrap = $1.t('div', {style: 'border:1px solid #DDD; background-color:#EEE; border-radius:3px; margin-bottom:3px; position:relative;'});
            if (L.addrId) {
                sWrap.appendChild($1.T.ckLabel({
                    I: {
                        'class': 'jsFields checkSel checkSel_trash',
                        name: iName + '[delete]'
                    }, L: {textNode: 'Eliminar'}
                }));
            } else {
                sWrap.appendChild($1.T.btnClear('delete'));
            }
            var wrap = $1.t('div', {'class': 'divLine divLine_noBd'});
            var wx2 = $1.t('div', {'class': 'wrapx4'});
            var optType = $1.T.sel({
                sel: {
                    name: iName + '[addrType]',
                    'class': 'jsFields',
                    O: {vPost: iName + '[addrId]=' + L.addrId}
                }, opts: $V.AddressTypes, selected: L.addrType
            })
            wx2.appendChild(optType);
            wrap.appendChild(wx2);
            var wx2 = $1.t('div', {'class': 'wrapx4_1'});
            wx2.appendChild($1.t('input', {
                'type': 'text',
                'name': iName + '[address]',
                'placeholder': 'Dirección: Calle Carrera Av. Edf.',
                'class': 'jsFields',
                value: L.address
            }));
            wrap.appendChild(wx2);
            sWrap.appendChild(wrap);
            var wrap = $1.t('div', {'class': 'divLine divLine_noBd'});
            var wx2 = $1.t('div', {'class': 'wrapx4'});
            wx2.appendChild($1.t('input', {
                'type': 'text',
                'name': iName + '[city]',
                'placeholder': 'Ciudad',
                'class': 'jsFields',
                value: L.city
            }));
            wrap.appendChild(wx2);
            var wx2 = $1.t('div', {'class': 'wrapx4'});
            wx2.appendChild($1.t('input', {
                'type': 'text',
                'name': iName + '[zipCode]',
                'placeholder': 'Código Postal',
                'class': 'jsFields',
                value: L.zipCode
            }));
            wrap.appendChild(wx2);
            var wx2 = $1.t('div', {'class': 'wrapx4'});
            wx2.appendChild($1.t('input', {
                'type': 'text',
                'name': iName + '[county]',
                'placeholder': 'Departamento / Región',
                'class': 'jsFields',
                value: L.county
            }));
            wrap.appendChild(wx2);
            var wx2 = $1.t('div', {'class': 'wrapx4'});
            wx2.appendChild($1.t('input', {
                'type': 'text',
                'name': iName + '[country]',
                'placeholder': 'País',
                'class': 'jsFields',
                value: L.country
            }));
            wrap.appendChild(wx2);
            sWrap.appendChild(wrap);
            obj.appendChild(sWrap);
            $1.T.nAddr++;
        }
        $1.delet(obj.getElementsByClassName('addByJs')[0]);
        if (C && C.btnAdd != undefined) {
            var btnAdd = $1.t('div', {
                'class': 'addByJs btnAddText iBg_tbaddrow',
                'textNode': 'Añadir Otra Dirección...'
            });
            btnAdd.onclick = function () {
                $1.T.addr(obj, [{}], {btnAdd: true});
            };
            obj.appendChild(btnAdd);
        }
    },
    nNum: 1,
    phones4: function (obj, Jq, C) {
        var nP = $1.T.nNum;
        obj = (obj == '') ? $1.G.byId('add_phones') : obj;
        obj = (obj.tagName == undefined) ? $1.G.byId(obj) : obj;
        for (i in Jq) {
            var nP = $1.T.nNum;
            var L = Jq[i];
            var iName = 'Phones[' + nP + ']';
            var divLine = $1.T.divLinewx({
                divLine: true,
                wxn: 'wrapx8',
                I: {
                    'tag': 'select',
                    sel: {'class': 'jsFields', name: iName + '[numType]'},
                    opts: $V.PhoneTypes,
                    selected: L.numType
                }
            });
            $1.t('div', {'class': 'wrapx4'});
            divLine.appendChild($1.T.divLinewx({
                wxn: 'wrapx4',
                I: {
                    tag: 'input',
                    type: 'text',
                    'class': 'jsFields',
                    name: iName + '[number]',
                    placeholder: 'Número...',
                    value: L.number,
                    O: {vPost: iName + '[phoneId]=' + L.phoneId}
                }
            }));
            divLine.appendChild($1.T.divLinewx({
                wxn: 'wrapx4',
                I: {
                    tag: 'input',
                    type: 'text',
                    'class': 'jsFields',
                    name: iName + '[numExt]',
                    placeholder: 'Extensión...',
                    value: L.numExt
                }
            }));
            divLine.appendChild($1.T.divLinewx({
                wxn: 'wrapx4',
                I: {
                    tag: 'input',
                    type: 'text',
                    'class': 'jsFields',
                    name: iName + '[numHorary]',
                    placeholder: 'Atención: 7 a 12, 1 a 5',
                    value: L.numHorary
                }
            }));
            if (L.phoneId) {
                divLine.appendChild($1.T.ckLabel({
                    I: {
                        'class': 'jsFields checkSel checkSel_trash',
                        name: iName + '[delete]'
                    }, L: {textNode: 'Eliminar'}
                }));
            } else {
                divLine.appendChild($1.T.btnClear('delete'));
            }
            obj.appendChild(divLine);
            $1.T.nNum++;
        }
        $1.delet(obj.getElementsByClassName('addByJs')[0]);
        if (C && C.btnAdd != undefined) {
            var btnAdd = $1.t('div', {'class': 'addByJs btnAddText iBg_tbaddrow', 'textNode': 'Añadir Otro Número...'});
            btnAdd.onclick = function () {
                $1.T.phones4(obj, [{}], {btnAdd: true});
            };
            obj.appendChild(btnAdd);
        }
    },
    eNum: 1,
    emails2: function (obj, Jq, C) {
        var nP = $1.T.eNum;
        obj = (obj == '') ? $1.G.byId('add_emails') : obj;
        obj = (obj.tagName == undefined) ? $1.G.byId(obj) : obj;
        for (i in Jq) {
            var nP = $1.T.eNum;
            var L = Jq[i];
            var iName = 'Emails[' + nP + ']';
            var divLine = $1.T.divLinewx({
                divLine: 1,
                wxn: 'wrapx8',
                I: {
                    'tag': 'select',
                    sel: {'class': 'jsFields', name: iName + '[emailType]'},
                    blankText: 'Tipo de Email...',
                    opts: $V.EmailTypes,
                    selected: L.emailType
                }
            });
            $1.t('div', {'class': 'wrapx4'});
            if ($V.EmailWorkerTypes) {
                divLine.appendChild($1.T.divLinewx({
                    wxn: 'wrapx8',
                    I: {
                        'tag': 'select',
                        sel: {'class': 'jsFields', name: iName + '[workerType]'},
                        blankText: 'Cargo Propietario...',
                        opts: $V.EmailWorkerTypes,
                        selected: L.workerType
                    }
                }));
            }
            divLine.appendChild($1.T.divLinewx({
                wxn: 'wrapx3',
                I: {
                    tag: 'input',
                    type: 'text',
                    'class': 'jsFields',
                    name: iName + '[email]',
                    placeholder: 'Correo, email...',
                    value: L.email,
                    O: {vPost: iName + '[emailId]=' + L.emailId}
                }
            }));
            if (L.emailId) {
                divLine.appendChild($1.T.ckLabel({
                    I: {
                        'class': 'jsFields checkSel checkSel_trash',
                        name: iName + '[delete]'
                    }, L: {textNode: 'Eliminar'}
                }));
            } else {
                divLine.appendChild($1.T.btnClear('delete'));
            }
            obj.appendChild(divLine);
            $1.T.eNum++;
        }
        $1.delet(obj.getElementsByClassName('addByJs')[0]);
        if (C && C.btnAdd != undefined) {
            var btnAdd = $1.t('div', {'class': 'addByJs btnAddText iBg_tbaddrow', 'textNode': 'Añadir Otro Email...'});
            btnAdd.onclick = function () {
                $1.T.emails2(obj, [{}], {btnAdd: true});
            };
            obj.appendChild(btnAdd);
        }
    },
    curr: function (P, pare) {
        var jsF = (P.jsF) ? P.jsF : 'jsFields';
        var name = (P.name) ? P.name : 'curr';
        var curr = (P.curr) ? P.curr : $0s.currDefault;
        var sel = $1.T.sel({sel: {'class': jsF, name: name}, opts: $0s.Curr, selected: curr, noBlank: 1});
        sel.onchage = function () {
            if (this.value != $0s.currDefault) {
                /* obtener trm segun la moneda */
            }
        }
        if (pare) {
            pare.appendChild(sel);
        }
        return sel;
    },
    currency: function (P, addNodes) {
        /*
		ml:{v:Valor, n:Nombre del input} //local
		me:{v:valor, r:rate, n:nombre del input} //moneda extranjera
		r:{v:valor TRM, n:nombre campo} //rate
		c:{v:nombre moneda}
		*/
        var jsF = (P.jsF) ? P.jsF : 'jsFields';
        if (P.ml) {
            P.l = P.ml;
        }
        if (P.me) {
            P.e = P.me;
        }
        var nCur = (P.Name && P.Name.currency) ? P.Name.currency : 'curr';
        var nRate = (P.Name && P.Name.rate) ? P.Name.rate : 'rate'; //trm
        var nvalMonEX = (P.Name && P.Name.cME) ? P.Name.cME : 'valueME';
        var nvalMonLO = (P.Name && P.Name.cLO) ? P.Name.cLO : 'value';

        var nvalMonLO = (P.l && P.l.n) ? P.l.n : nvalMonLO;
        var nvalMonEX = (P.e && P.e.n) ? P.e.n : nvalMonEX;
        var nCur = (P.c && P.c.n) ? P.c.n : nCur;
        var nRate = (P.r && P.r.n) ? P.r.n : nRate;
        var v_lo = (P.l && P.l.v) ? P.l.v : P[nvalMonLO];
        var v_ex = (P.e && P.e.v) ? P.e.v : P[nvalMonEX];
        var v_curr = ($0s.currDefault) ? $0s.currDefault : P.curr;
        v_curr = (P.c && P.c.v) ? P.c.v : v_curr;
        var v_rate = ($0s.rate) ? $0s.rate : P[nRate];
        v_rate = (P.r && P.r.v) ? P.r.v : v_rate;
        //currency:USD, rate:3.000, valueME: 150, value:45.000
        var id = 'docRateTempToOpport';
        var tWrap = $1.t('div', {'class': 'divLine'});
        var curr = $1.t('div', {'class': 'wrapx8'});
        curr.appendChild($1.t('label', {'textNode': 'Moneda'}));
        var iSel = $1.T.sel({
            sel: {'class': jsF + ' _inpCur_cur', name: nCur},
            opts: $0s.Curr,
            selected: v_curr,
            noBlank: true
        });
        var noDisplay = (v_curr != $0s.currDefault) ? 'display:none;' : ';';
        var estimV = $1.t('div', {'class': 'wrapx8', style: noDisplay});
        estimV.appendChild($1.t('label', {'textNode': 'Valor'}));
        var monLO = $1.t('input', {
            type: 'text',
            numberformat: 'mil',
            'class': jsF + ' _inpCur_ML',
            name: nvalMonLO,
            value: v_lo
        });
        estimV.appendChild(monLO);
        iSel.onchange = function () {
            if (this.value != $0s.currDefault) {
                monLO.value = '';
                estimV.style.display = 'none';
                docRate.style.display = '';
                docME.style.display = '';
            } else {
                rate.value = valME.value = '';
                estimV.style.display = '';
                docRate.style.display = 'none';
                docME.style.display = 'none';
            }
        }
        curr.appendChild(iSel);
        tWrap.appendChild(curr);
        tWrap.appendChild(estimV);
        if (addNodes) {
            tWrap.appendChild(addNodes);
        }
        var hid_EX = (v_curr == $0s.currDefault) ? 'display:none;' : '';
        ;
        var docRate = $1.t('div', {'class': 'wrapx8 cur_rate', style: hid_EX});
        docRate.appendChild($1.t('label', {'textNode': 'Tasa'}));
        var rate = $1.t('input', {
            type: 'text',
            numberformat: 'mil',
            'class': jsF + ' _inpCur_rate',
            name: nRate,
            value: v_rate,
            placeholder: 'TRM en Moneda Local'
        });
        rate.onkeyup = rate.onchange = function () {
            monLO.value = rate.value * valME.value;
        }
        docRate.appendChild(rate);
        tWrap.appendChild(docRate);
        var docME = $1.t('div', {'class': 'wrapx8 cur_monEX', style: hid_EX});
        docME.appendChild($1.t('label', {'textNode': 'Valor ME'}));
        var valME = $1.t('input', {
            type: 'text',
            numberformat: 'mil',
            'class': jsF + ' _inpCur_ME',
            name: nvalMonEX,
            value: v_ex,
            placeholder: 'Valor Moneda Extranjera'
        });
        valME.onkeyup = valME.onchange = function () {
            monLO.value = $Str.toNumber(rate.value) * $Str.toNumber(valME.value);
        }
        docME.appendChild(valME);
        tWrap.appendChild(docME);
        return tWrap;
    }
    ,
    ckLabel: function (P, pare) {
        var span = $1.t('div', P.s);
        span.style.display = 'inline-block';
        span.style.verticalAlign = 'middle';
        span.classList.add('J-checkbox');
        span.classList.add('J-ckLabel');
        if (!P.I) {
            P.I = {};
        }
        if (!P.I.name) {
            P.I.name = '';
        }
        if (!P.I['class']) {
            P.I['class'] = '';
        }
        var id_ow = (P.id) ? P.id : 'ckLabel_' + P.I.name + '_' + $1.i.nexT('cks');
        P.I.type = 'checkbox';
        P.I.id = id_ow;
        P.I['class'] += ' checkSel';
        P.I.YN = 'Y';
        if (P.checked) {
            P.I.checked = P.I.checked;
        }
        var ck = $1.t('input', P.I, span);
        var L = (P.L) ? P.L : {};
        if (P.t) {
            L.textNode = P.t;
        }
        L['for'] = (L['for']) ? L['for'] : id_ow;
        $1.t('label', L, span);
        if (pare) {
            pare.appendChild(span);
        }
        if (P.P) {
            ck.P = P.P;
        }
        if (P.func) {
            ck.onclick = function () {
                var ck = ((this.checked == true) ? 'Y' : 'N');
                P.func(ck, this);
            }
        }
        if (_i = $1.q('._i', ck)) {
            span.appendChild(_i);
        }
        return span;
    },
    check: function (P, pare) {//news 23Jun-2021
        var span = $1.t('div', P.s);
        span.style.display = 'inline-block';
        span.classList.add('J-checkbox');
        span.style.verticalAlign = 'middle';
        if (P.iClass) {
            span.classList.add(P.iClass);
            delete (P.iClass);
        }
        var L = (P.L) ? P.L : {};
        delete (P.L);
        if (P.t) {
            L.textNode = P.t;
        }
        delete (P.t);
        var func = (P.func) ? P.func : false;
        delete (P.func);
        if (!P.name) {
            P.name = '';
        }
        if (!P['class']) {
            P['class'] = '';
        }
        var id_ow = (P.id) ? P.id : 'ckLabel_' + P.name + '_' + $1.i.nexT('cks');
        P.type = 'checkbox';
        P.id = id_ow;
        P['class'] += ' checkSel';
        if (P.clsId) {
            P['class'] += ' __clsId_' + P.clsId;
        }
        P.YN = 'Y';
        var ckP = (P.P) ? P.P : {};
        delete (P.P);
        if (P.value == 'Y') {
            P.checked = 'checked';
        }
        delete (P.value);
        if (P.checked == false || P.checked == 'N') {
            delete (P.checked);
        }
        var ck = $1.t('input', P, span);
        if (func) {
            ck.P = ckP;
            ck.pare = span;
            ck.onclick = function () {
                func(this);
            }
        }
        L['for'] = (L['for']) ? L['for'] : id_ow;
        $1.t('label', L, span);
        if (pare) {
            pare.appendChild(span);
        }
        return span;
    },
    upDown: function (td, tr) {
        var toNext = $1.t('input', {type: 'button', 'class': 'iBg iBg_arrowMinDown'});
        toNext.onclick = function () {
            $1.Move.to('next', tr);
        }
        var toBefore = $1.t('input', {type: 'button', 'class': 'iBg iBg_arrowMinUp'});
        toBefore.onclick = function () {
            $1.Move.to('before', tr);
        }
        td.appendChild(toBefore);
        td.appendChild(toNext);
    },
    movNode: function wrap(node, tag) {
        node.parentNode.insertBefore(document.createElement(tag), node);
        node.previousElementSibling.appendChild(node);
    }
    ,
    tbFieldsLeft: function (R) {
        var tb = $1.t('table', {'class': 'table_fieldsLeft'});
        for (var n in R) {
            var tr = $1.t('tr');
            var td2 = $1.t('td');
            if (R[n].oneRow) {
                var td2 = $1.t('td', {colspan: 2});
            } else {
                var td = $1.t('td');
                tr.appendChild(td);
                td.appendChild($1.t('label', R[n].L));
            }
            tr.appendChild(td2);
            if (R[n].node) {
                td2.appendChild(R[n].node);
            } else {
                tag = R[n].I.tag;
                delete (R[n].I.tag);
                td2.appendChild($1.t(tag, R[n].I));
            }
            tb.appendChild(tr);
        }
        return tb;
    }
    ,
    fieset: function (P, pare, cont) {
        P = (P) ? P : {};
        if (!P.F) {
            P.F = {};
        }
        var fie = $1.t('fieldset', P.F, pare);
        if (P.display == 'none') {
            P.display = 'block';
        }//convertir para ocultar, necesario
        if (P.L) {
            var cls = (P.display) ? 'fa fa_filter' : '';
            P.L['class'] = (P.L['class']) ? P.L['class'] : cls;
            P.L.textNode = ' ' + P.L.textNode;
            var l = fie.appendChild($1.t('legend', P.L));
            l.onclick = function () {
                upd();
            }
        }

        function upd() {
            if (P.display) {
                var st = rc.style.display;
                if (st == 'block') {
                    rc.style.display = 'none';
                    fie.style.borderStyle = 'none';
                    fie.style.borderTopStyle = 'dashed';
                } else {
                    rc.style.display = 'block';
                    fie.style.borderStyle = 'solid';
                }
            }
        }

        var rc = $1.t('div', {style: 'display:' + P.display + ';'}, fie);
        if (cont) {
            rc.appendChild(cont);
        }
        upd();
        return rc;
    },
    fieldset: function (cont, P) {//obsoleto
        P = (P) ? P : {};
        var fie = $1.t('fieldset', {style: 'margin:0.5rem 0;'});
        if (P.display == 'none') {
            P.display = 'block';
        }//convertir para ocultar, necesario
        if (P.L) {
            var cls = (P.display) ? 'fa fa_filter' : '';
            P.L['class'] = (P.L['class']) ? P.L['class'] : cls;
            P.L.textNode = ' ' + P.L.textNode;
            var l = fie.appendChild($1.t('legend', P.L));
            l.onclick = function () {
                upd();
            }
        }

        function upd() {
            if (P.display) {
                var st = rc.style.display;
                if (st == 'block') {
                    rc.style.display = 'none';
                    fie.style.borderStyle = 'none';
                    fie.style.borderTopStyle = 'dashed';
                } else {
                    rc.style.display = 'block';
                    fie.style.borderStyle = 'solid';
                }
            }
        }

        var rc = $1.t('div', {style: 'display:' + P.display + ';'}, fie);
        rc.appendChild(cont);
        upd();
        return fie;
    }
    ,
    gooDate: function (wrapCont, P) {
        P = (P) ? P : {};
        var tw = $1.q('.gooMovDate_wrap', wrapCont);
        var rang = (P.rang) ? P.rang : 'month';
        if (tw && tw.getAttribute('rang') != rang) {
            $1.delet(tw);
        } else if (tw) {
            tw.style.display = 'block';
            return true;
        }
        var goTo = $1.t('div', {'class': 'gooMovDate_wrap', rang: rang});
        var Dt = $2d.goRang({date1: P.date1, rang: rang});
        var valDate1 = $1.t('input', {type: 'hidden', 'class': 'gooMovDate_1', value: Dt.date1});
        var valDate2 = $1.t('input', {type: 'hidden', 'class': 'gooMovDate_2', value: Dt.date2});
        var dateText1 = $1.t('span', {'class': 'gooMovDateText_1'});
        var dateText2 = $1.t('span', {'class': 'gooMovDateText_2'});
        var today = $1.t('input', {type: 'button', 'class': 'googBtn', value: 'Hoy'});
        today.onclick = function () {
            upd('today');
        };
        goTo.appendChild(today);
        var toBef = $1.t('input', {type: 'button', 'class': 'googBtn', value: '≪'});
        toBef.onclick = function () {
            upd('--');
        };
        goTo.appendChild(toBef);
        var toAft = $1.t('input', {type: 'button', 'class': 'googBtn', value: '≫'});
        toAft.onclick = function () {
            upd('++');
        };
        goTo.appendChild(toAft);
        goTo.appendChild(dateText1);
        goTo.appendChild($1.t('span', ' – '));
        goTo.appendChild(dateText2);
        goTo.appendChild(valDate1);
        goTo.appendChild(valDate2);
        wrapCont.appendChild(goTo);

        function upd(movDateType) {
            var rang = (P.rang) ? P.rang : 'month';
            var Di = $2d.goRang({date1: valDate1.value, date2: valDate2.value, rang: rang, movType: movDateType});
            valDate1.value = Di.date1;
            dateText1.innerText = Di.date1;
            valDate2.value = Di.date2;
            dateText2.innerText = Di.date2;
            if (P.func) {
                P.func();
            }
        }
    },
    divSelect: function (P, pare) {
        var winId = (P.winId) ? 'divSelectWin_' + P.winId : 'divSelectWin';
        var icok = (P.icok) ? P.icok : '';
        var icokNull = (P.icokNull) ? ' ' + P.icokNull : '';
        var icokDefine = (P.icokDefine) ? ' ' + P.icokDefine : '';
        var icokBtn = icok;
        var addiBg = (P.iBgOpts) ? P.iBgOpts : '';
        var addiBg = (P.clsFa) ? P.clsFa : addiBg;
        var cls = (P.classWrap) ? P.classWrap : '';
        var selCont = $1.t('div', {'class': 'divSel ' + cls}, pare);
        var dftText = 'Seleccione';
        var optSel = $js.k(P.opts, P.selected);
        if (P.noBlank && !optSel) {
            for (var n in P.opts) {
                if (typeof (P.opts[n]) == 'object') {
                    n = P.opts[n].k;
                }
                P.selected = n;
                break;
            }
        }
        if (P.selected) {
            P.sel.value = P.selected;
            P.sel.default = P.selected;
            dftText = P.opts[P.selected];
            if (typeof (P.opts[P.selected]) == 'object') {
                dftText = P.opts[P.selected].v;
                if (P.kt) {
                    dftText = P.opts[P.selected][P.kt];
                }
            }
            icokBtn = icok + '_' + P.selected;
        }
        var clsBtn = (P.classBtn) ? P.classBtn + ' ' + icokBtn : 'boxi1 ' + icokBtn;
        clsBtn += ' ' + icokNull;
        if (P.ico == 'Y') {
            clsBtn = clsBtn + ' boxi1Ico';
        }
        var wid = '';
        if (P.width) {
            if (P.width == 'Y') {
                P.width = '7';
            }
            wid = 'width:' + P.width + 'rem; max-width:' + P.width + 'rem;';
        }
        sel = $1.t('button', {
            textNode: dftText,
            'style': wid + ' ' + P.style,
            'class': 'options _selWrap ' + clsBtn + ' divSelect _arrowSel',
            icok: icokBtn
        }, selCont);
        var wrapList = $1.t('div', {'class': 'divSelect'});
        if (P.reset != 'N' && !P.noBlank) {
            var line = $1.t('button', {
                textNode: 'Borrar',
                k: '',
                'class': 'line btnList fa fa_trash',
                style: 'width:98%; text-align:left;'
            }, wrapList);
            line.onclick = function () {
                oldv = this.innerText;
                this.innerText = 'Seleccione';
                chLine(this, {reset: 'Y'});
                this.innerText = oldv;
            }
        }
        P.sel.type = 'hidden';
        var optCk = false;
        var opt = $1.t('input', P.sel, selCont);
        var valText = '';
        for (var s in P.opts) {
            var _o = P.opts[s];
            var k = s;
            var v = _o;
            if (typeof (_o) == 'object') {
                k = _o.k;
                v = _o.v;
                if (P.kt) {
                    v = _o[P.kt];
                }
            }
            var icokLine = (P.icok) ? P.icok + '_' + k : '';
            if (_o.ico) {
                icokLine = _o.ico;
            }
            var line = $1.t('button', {
                textNode: v,
                k: k,
                'class': 'line btnList ' + icokLine,
                style: 'width:98%; text-align:left;',
                icok: icokLine
            }, wrapList);
            line.k = k;
            line.o = _o;
            line.onclick = function () {
                chLine(this);
            }
            if (k == P.selected) {
                optCk = line;
            }
        }
        sel.onclick = function () {
            var iexi = $1.q('#' + winId);
            if (iexi) {
                $1.delet(iexi);
                selCont.style.position = '';
            } else {
                selCont.style.position = 'relative';
                selCont.appendChild($1.Win.minRel(wrapList, {
                    winId: winId,
                    noTitle: true,
                    winPosition: 'z-index:100; top:100%; left:0;'
                }));
            }
        }
        if (P.arrow) {
            var btnl = $1.t('button', {
                'class': 'fa faBtn fa_arrowSel',
                style: 'position:absolute; right:0.25rem; top:20%;'
            }, selCont);
            btnl.onclick = sel.onclick;

        }
        selCont.appendChild(sel);
        if (optCk) {
            chLine(optCk, {ini: 'Y'});
        }

        function chLine(T, Px) {
            var Px = (Px) ? Px : {};
            var Dr = {value: T.getAttribute('k'), t: T.innerText};
            if (P.onchange && Px.ini != 'Y') {
                if (P.change == 'always') {
                    chLineOk(T, Px);
                }
                P.onchange(T, Dr, function () {
                    chLineOk(T, Px)
                }); //llamar para actualizar
            } else {
                chLineOk(T, Px);
            }
        }

        function chLineOk(T, Px) {
            var Px = (Px) ? Px : {};
            var sel = $1.q('._selWrap', selCont);
            var icokOld = sel.getAttribute('icok');
            var icokNew = T.getAttribute('icok');
            opt.value = T.getAttribute('k');
            sel.className = (sel.className).replace(icokNull, '');
            sel.className = (sel.className).replace(icokDefine, '');
            if (Px.reset) {
                sel.className += icokNull;
            } else {
                if (icokDefine != '') {
                    sel.className += icokDefine;
                }
                if (icokOld) {
                    sel.className = (sel.className).replace(icokOld, icokNew);
                } else {
                    sel.className += ' ' + icokNew;
                }
                sel.setAttribute('icok', icokNew);
            }
            opt.innerText = T.innerText;
            sel.innerText = T.innerText;
            sel.title = T.innerText;
            $1.delet($1.q('#' + winId));
        }

        sel.default = sel;

        return selCont;
    },
    tbExport: function (tbIn, P, pare) {
        var P = (P) ? P : {};
        tbInRet = false;
        if (!tbIn) {
            tbIn = $1.t('div', {'class': 'tbExport'});
            tbInRet = tbIn;
        }
        var fiel = $1.t('fieldset', P.fieldset, pare);
        var leg = $1.t('legend');
        var tbXls = (P.tbXls) ? P.tbXls : tbIn;
        var tbPrint = (P.printWrap) ? P.printWrap : tbIn;
        if (P.down != 'N') {
            var xls = $1.t('button', {'class': 'btn iBg_icoxls', title: 'XLSX'}, leg);
            xls.onclick = function () {
                if (P.fileName == 'fromLegend') {
                    P.fileName = leg.innerText;
                }
                P.tb = tbXls;
                $Xls.get(P);
            }
        }
        if (P.tab) {
            var xls = $1.t('button', {'class': 'btn iBg_icoxls', title: 'Archivos por Tabulaciones'}, leg);
            xls.onclick = function () {
                P = $js.clone(P);
                P.ext = 'txt';
                if (P.fileName == 'fromLegend') {
                    P.fileName = leg.innerText;
                }
                P.tb = tbXls;
                $Xls.get(P);
            }
        }
        if (P.print) {
            var pri = $1.t('button', {'class': 'btn iBg_print'});
            pri.onclick = function () {
                $1.Win.print(tbPrint);
            }
            leg.appendChild(pri);
        }
        if (P.copy != 'N') {
            var xls = $1.t('button', {'class': 'btn iBg_doc', title: 'Copiar Contenido a Portapapeles'}, leg);
            xls.onclick = function () {
                $1.copyContent(tbXls);
            }
        }
        if (P.legend) {
            $1.t('span', {textNode: ' ' + P.legend}, leg);
        }
        if (P.L) {
            $1.t('span', {textNode: ' ' + P.L}, leg);
        } else {
            $1.t('span', {textNode: ' '}, leg);
        }
        fiel.appendChild(leg);
        if (P.t) {
            fiel.appendChild($1.t('h4', P.t));
        }
        fiel.appendChild(tbPrint);
        if (tbInRet) {
            return tbInRet;
        }//crea y devuelve div
        return fiel;
    },
    imgUpd: function (P, pare) {//logo
        var cont = $1.t('div', {style: 'display:inline-block; border:0.0625rem solid #000; border-radius:0.25rem; padding:0.15rem;'});
        $1.t('b', {
            textNode: ((P.title) ? P.title : 'Seleccione Imagen'),
            style: 'display:block; padding:0.15rem; font-size:0.85rem;'
        }, cont);
        var imgw = $1.t('div', {style: ' width:10rem; height:10rem; display:table-cell; verticalAlign:middle;'}, cont);
        var jsF = (P.jsF) ? P.jsF : 'jsFields';
        if (P['class']) {
            jsF = P['class'];
        }
        var name = (P.name) ? P.name : '-imgUpdNullName';
        var src1 = P.value;
        var textNode = (P.textNode) ? P.textNode : 'Definir';
        var inpSrc = $1.t('input', {type: 'hidden', 'class': jsF, name: name, value: src1}, cont);
        var iFile = $1.t('input', {type: 'file', style: 'display:none'}, cont);
        var btn = $1.T.btnFa({
            fa: 'fa_attach', textNode: textNode, func: function () {
                iFile.click();
                JStor.iFile(iFile, {
                    fileName: P.fileName, func: function (JrL) {
                        if (JrL) {
                            if (inpSrc.value && P.sameName != 'Y') {
                                JStor.delete({purl: inpSrc.value, confirm: 'N', winErr: 'N'});
                            }
                            img.src = JrL[0].purl;
                            inpSrc.value = JrL[0].purl;
                        }
                    }
                });
            }
        });
        cont.appendChild(btn);
        btnDel = $1.T.btnFa({
            fa: 'fa_close', func: function () {
                JStor.delete({purl: inpSrc.value}, () => {
                    inpSrc.value = '';
                    img.src = '';
                });
            }
        }, cont);
        var img = $1.t('img', {src: src1, style: 'display:block;'}, imgw);
        if (pare) {
            pare.appendChild(cont);
        }
        return cont;
    },
    imgUpd2: function (P, pare) {
        var cont = $1.t('div', {style: 'display:inline-block; border:0.0625rem solid #000; border-radius:0.25rem; padding:0.15rem;'});
        if (P.ttile) {
            $1.t('b', {textNode: P.ttile, style: 'display:block; padding:0.15rem; font-size:0.85rem;'}, cont);
        }
        var imgw = $1.t('div', {style: ' width:10rem; height:10rem; display:table-cell; verticalAlign:middle; cursor:pointer;'}, cont);
        var jsF = (P.jsF) ? P.jsF : 'jsFields';
        var name = (P.name) ? P.name : '-imgUpdNullName';
        var src1 = P.value;
        var textNode = (P.textNode) ? P.textNode : 'Definir';
        var inpSrc = $1.t('input', {type: 'hidden', 'class': jsF, name: name, value: src1}, cont);
        var iFile = $1.t('input', {type: 'file', name: name}, cont);
        imgw.onclick = function () {
            iFile.click();
        }
        var imgUp = new JStor.iFile(iFile, {
            fView: function (reader) {
                img.src = reader.result;
            }
        });
        btnDel = $1.T.btnFa({
            fa: 'fa_close', func: function () {
                inpSrc.value = '';
                img.src = '';
            }
        });
        cont.appendChild(btnDel);
        var img = $1.t('img', {src: src1, style: 'display:block; height:100%; widht:100%;'}, imgw);
        if (pare) {
            pare.appendChild(cont);
        }
        return cont;
    },
    updFile: function (P, pare) {
        var cont = $1.t('div', {style: 'display:inline-block; border:0.0625rem solid #000; border-radius:0.25rem; padding:0.15rem; position:relative;'});
        var divName = $1.t('div', {
            style: 'display:none; verticalAlign:middle; cursor:pointer; padding:2px 5px;',
            'class': 'fa fa-paperclip'
        }, cont);
        var divNameA = $1.t('a', {href: P.value, textNode: 'Ver Archivo', target: '_BLANK'}, divName);
        var divUpd = $1.t('div', {
            style: 'display:inline-block; verticalAlign:middle; cursor:pointer; padding:2px 5px;',
            'class': 'fa fa-paperclip'
        }, cont);
        var jsF = (P['class']) ? P['class'] : $Api.JS.cls;
        var name = (P.name) ? P.name : 'updFile';
        var src1 = P.value;
        divUpd.innerText = (P.textNode) ? P.textNode : 'Seleccione';
        var inpSrc = $1.t('input', {type: 'hidden', 'class': jsF, name: name, value: src1, AJs: P.AJs}, cont);
        var iFile = $1.t('input', {type: 'file', style: 'display:none'}, cont);
        divUpd.onclick = function () {
            iFile.click();
        }
        new JStor.iFile(iFile, {
            path: P.path, func: function (L) {
                inpSrc.value = L[0].purl;
                cambio(L[0].purl);
            }
        });
        btnDel = $1.T.btnFa({
            fa: 'fa_close', func: function () {
                JStor.delete({purl: inpSrc.value}, function () {
                    cambio();
                    inpSrc.value = '';
                });
            }
        }, cont);
        if (pare) {
            pare.appendChild(cont);
        }
        cambio(src1);

        function cambio(src) {
            if (src) {
                divUpd.style.display = 'none';
                divName.style.display = 'inline-block';
                divNameA.setAttribute('href', src);
                btnDel.style.visibility = '';
            } else {
                divUpd.style.display = 'inline-block';
                divName.style.display = 'none';
                divNameA.setAttribute('href', '');
                btnDel.style.visibility = 'hidden';
            }
        }

        return cont;
    },
    msgs: function (H, wrap) {
        if (H.Msg) {
            var cls = (H.cls) ? H.cls : 'bf-danger';
            for (var i in H.Msg) {
                var lT = H.Msg[i];
                var p = $1.t('p', {style: 'border:1px solid #CCC; padding:.25rem;'}, wrap);
                if (lT.tag) {
                    $1.t('div', {'class': 'badge ' + cls, textNode: lT.tag}, p);
                }
                if (lT.errCode) {
                    $1.t('div', {'class': 'badge ' + cls, textNode: lT.errCode}, p);
                }
                $1.t('span', {textNode: lT.text}, p);
            }
            delete (H.Msg);
        }
    },
};
$1.uniRow = function (cls, tBody, tr) {
    var q = $1.q('.' + cls, tBody);
    if (q) {
        return false;
    } else {
        //si tr no existe, añado a tBody
        if (tr) {
            tr.classList.add(cls);
        }
        if (tr && tBody) {
            tBody.appendChild(tr);
        }
        return true;
    }
}

$1.uniRowsField = function (P, pare, ini) {
    //crear fieldset donde se van añadiendo datos
    //uniq,L:all data,lineText,AJs:{},
    rEmp = $1.q('._uniRowsField', pare);
    if (!rEmp) {
        var rEmp = $1.t('div', {'class': '_uniRowsField'}, $1.T.fieset({L: {textNode: P.title}}, pare));
    }
    if (!ini) {
        tag = $1.t('div', {textNode: P.lineText});
        $Api.JS.uniqAJs(tag, P.AJs, {L: 'Y', uniq: P.uniq}, rEmp);
        $1.lineDel(P.L, null, tag);
    }
}

$1.lineDel = function (L, P, td) {
    P = (P) ? P : {};
    var tid = (P.id) ? L[P.id] : L.id;
    var AJs = (P.AJs) ? P.AJs : {};
    if (P.id) {
        AJs[P.id] = tid;
    } else {
        AJs['id'] = tid;
    }
    var jsFL = (P.jsFL) ? P.jsFL : $Api.JS.clsLN;
    if (tid) {
        $1.T.check({'class': jsFL + ' checkSel_trash', name: 'delete', AJs: AJs}, td);
    } else {
        $1.T.btnFa({
            faBtn: 'fa-trash', title: 'Quitar', P: L, func: function (T) {
                if (P.func) {
                    P.func(td.parentNode, L);
                } else {
                    $1.delet(td.parentNode);
                }
            }
        }, td);
    }
}
$1.display = function (wrap, pare, noHidden) {
    btn = $1.T.btnFa({
        faBtn: 'fa_minusSquare', title: 'Ver/Ocultar datos', func: function (T) {
            if (wrap.classList.contains('hidden')) {
                wrap.classList.remove('hidden');
                T.classList.replace('fa_plusSquare', 'fa_minusSquare');
            } else {
                wrap.classList.add('hidden');
                T.classList.replace('fa_minusSquare', 'fa_plusSquare');
            }
        }
    }, pare);
    if (!noHidden) {
        wrap.classList.add('hidden');
        btn.classList.replace('fa_plusSquare', 'fa_minusSquare');
    }
    return btn;
}
$1.setText = function (valor, tag) {
    if (tag.tagName == 'INPUT' && tag.value != undefined) {
        tag.value = valor;
    } else {
        tag.innerText = valor;
    }
}
$1.Move = {
    to: function (act, chil, P) {
        var i = 0;//chil = tr
        var pare = chil.parentNode;
        var len = pare.childNodes.length;
        while ((chil = chil.previousSibling) != null) {
            i++;
        }
        var n = (pare.childNodes[i]);
        //+2 xk debe estar antes de ese */
        var nOld = (act == 'next') ? pare.childNodes[i + 2] : pare.childNodes[i - 1];
        var nUbi = nOld;
        if (i < len && act == 'next') {
            nUbi = pare.childNodes[i + 1];/* real tr */
            if (nUbi && nUbi.getAttribute('_1moveLimits')) {
                return false;
            }
            pare.insertBefore(n, nOld);
        } else if (i > 0 && act == 'before') {
            if (nUbi && nUbi.getAttribute('_1moveLimits')) {
                return false;
            }
            pare.insertBefore(n, nOld);
        }
        if (P.func) {
            if (P.rev) {
                if (nUbi) {
                    P.func(nUbi);
                }/*revisar antes */
            } else {
                P.func(nUbi);
            }
        }
    },
    btns: function (P, td) {
        $1.T.btnFa({
            fa: 'fa-caret-up', title: 'Poner Abajo', tabindex: -1, func: function (T) {
                $1.Move.to('before', td.parentNode, {
                    rev: 'Y', func: function (trAnt) {
                        if (P.func) {
                            P.func(trAnt);
                        }
                    }
                });
            }
        }, td);
        $1.T.btnFa({
            fa: 'fa-caret-down', title: 'Poner Abajo', tabindex: -1, func: function (T) {
                $1.Move.to('next', td.parentNode, {
                    rev: 'Y', func: function (trAnt) {
                        if (P.func) {
                            P.func(trAnt);
                        }
                    }
                });
            }
        }, td);
    }
}
$1.filter = function (P, pare) {
    var wrap = $1.t('div', {'class': '_1Filter_wrap'}, pare);
    var wTop = $1.t('div', 0, wrap);
    var wFilt = $1.t('div', {'class': 'noDisplay _1Filter_wFilt'}, wrap);
    $1.T.btnFa({
        faBtn: 'fa-filter', textNode: 'Filtros...', func: function (T) {
            wFilt.classList.toggle('noDisplay');
        }
    }, wTop);
    for (var i in P.LBef) {
        P.L.unshift(P.LBef[i]);
    }
    for (var i in P.LAft) {
        P.L.push(P.LAft[i]);
    }
    var divLA = false;
    for (var i in P.L) {
        var L = P.L[i];
        if (L.divLine) {
            divLA = divL = $1.T.divL(L, wFilt);
        } else {
            divLA = $1.T.divL(L, divL);
        }
        var inp = $1.q('.divL-field', divLA);
        if (inp) {
            inp.classList.add('jsFiltVars');
        }
    }
    $1.T.btnFa({faBtn: 'fa-search ui_button', textNode: 'Buscar', func: P.func}, wFilt);
    $1.T.btnFa({
        faBtn: 'fa-trash', textNode: 'Limpiar', func: function () {
            $1.filterClear(wrap);
        }
    }, wFilt);
}
$1.filterGet = function (tagFilt, P, jsFields) {
    var P = (P) ? P : {};
    var JS = {};
    var data = '';
    tagFilt = (tagFilt) ? tagFilt : $M.Ht.filt;
    jsFields = (jsFields) ? jsFields : 'jsFiltVars';
    if (tagFilt && tagFilt.getElementsByClassName) {
        var parE = tagFilt.getElementsByClassName(jsFields);
        for (var i = 0; i < parE.length; i++) {
            var Fi = parE[i];
            Fi.style.borderColor = Fi.style.backgroundColor = '';
            var tag = (Fi.tagName).toLowerCase();
            var val = '';
            var inputNamer = (Fi.getAttribute('optnamer'));
            /* obtener nombre */
            var fName = (P.attrName) ? Fi.getAttribute(P.attrName) : Fi.name;
            /* obtener valor */
            if (tag == 'select' && Fi.getAttribute('multiple')) {
                var opts = Fi.options;
                if (1 || inputNamer == 'IN') {
                    for (var o = 0; o < opts.length; o++) {
                        if (opts[o].selected && opts[o].value != '') {
                            val += opts[o].value + ',';
                        }
                    }
                    val = val.replace(/\,$/, '');
                }
            } else {
                var val = (Fi.type == 'checkbox' && Fi.checked) ? 'Y' : 'N';
                val = (Fi.type == 'radio' && Fi.checked) ? Fi.value : val;
                val = (Fi.type != 'checkbox' && Fi.type != 'radio') ? Fi.value : val;
                val = (tag == 'textarea' && Fi.value != '') ? Fi.value : val;
                val = (tag == 'textarea' && Fi.innerText != '') ? Fi.innerText : val;
                if (tag == 'select') {
                    if (Fi.options[Fi.selectedIndex]) {
                        val = Fi.options[Fi.selectedIndex].value;
                    }
                }
            }
            if (Fi.getAttribute('numberformat') == 'mil' || Fi.numberformat == 'mil') {
                val = $Str.toNumber(val);
            }
            val = (val == undefined || val == 'undefined') ? '' : val;
            if (P.blankFie == 'N' && val == '') {
                continue;
            }
            JS[fName] = val;
            if (Fi.AJs) {
                for (var k in Fi.AJs) {
                    JS[k] = Fi.AJs[k];
                }
            }
        }
    }
    //Alias de campos
    if (P.Ali) {
        for (var k in P.Ali) {
            if (JS[k]) {
                JS[P.Ali[k]] = JS[k];
            }
            delete (JS[k]); //cardId:tr
        }
    }
    for (var k in JS) {
        data += (k) + '=' + encodeURIComponent(JS[k]) + '&';
    }
    if (P.ini) {
        data = P.ini + data;
    }
    return data.replace(/\&$/, '');
}
$1.filterClear = function (tagFilt, jsFields) {
    tagFilt = (tagFilt) ? tagFilt : $M.Ht.filt;
    jsFields = (jsFields) ? jsFields : 'jsFiltVars';
    if (tagFilt && tagFilt.getElementsByClassName) {
        var parE = tagFilt.getElementsByClassName(jsFields);
        for (var i = 0; i < parE.length; i++) {
            var Fi = parE[i];
            switch (Fi.tagName) {
                case 'CHECKBOX':
                    Fi.checked = Fi.defaultChecked;
                    break;
                case 'SELECT':
                    Fi.selectedIndex = 0;
                    break;
                default :
                    Fi.value = '';
                    Fi.innerText = '';
                    break;
            }
        }
    }
}
$1.multiDivL = function (Lx, cont, P2) {
    P2 = (P2) ? P2 : {};
    var pare = cont;
    for (var i in Lx) {
        var taL = Lx[i];
        if (i == 0) {
            taL.divLine = 1;
        }
        if (taL.divLine) {
            pare = $1.T.divL(taL, cont);
            tEle = pare;
        } else {
            tEle = $1.T.divL(taL, pare);
        }
        divLF = $1.q('.divL-field', tEle);
        if (divLF && P2.jsF) {
            divLF.classList.add(P2.jsF);
        }
    }
}

$1.Sys = {
    stor: function (Pd) {
        var P = (typeof (Pd) == 'string') ? Pd : Pd;
        if (P.set && !P.k) {
            P.k = P.set;
        }
        if (P.remove && !P.k) {
            P.k = P.remove;
        }
        ;
        a = 1;
        if (P.set) {
            localStorage.setItem(P.k, P.v);
        } else if (P.remove) {
            localStorage.removeItem(P.k);
        } else if (P.clear) {
            localStorage.clear();
        } else {
            return localStorage.getItem(Pd);
        }
    },
    storAr: function (K) {
        R = {};
        for (var i in K) {
            R[K[i]] = localStorage.getItem(K[i]);
        }
        return R;
    }
}

$1.barCode = function (Px, pare) { /*require JsBarcode.all.min */
    var P = (Px) ? Px : {};
    var bcode = (typeof (Px) == 'string') ? Px : P.code;
    var txt = (P.txt) ? P.txt : bcode;
    var img = $1.t('img', P.T);
    var Opts = {
        format: 'CODE128', width: 2, height: ((P.height) ? P.height : 60),
        displayValue: (!P.hidden), text: txt,
        fontSize: 8, background_: "#000000", // Color de fondo
        lineColor: "#000000", // Color de cada barra,
        textPosition: "top",
    };
    if (P.format == '39') {
        Opts.format = 'CODE39';
    }
    if (pare) {
        pare.appendChild(img);
    }
    JsBarcode(img, bcode, Opts);
    return img;
}
$1.T.barCode = function (P, pare) {
    jsF = (P.jsF) ? P.jsF : $Api.JS.cls;
    var divL = $1.T.divL({
        divLine: 1,
        L: ((P.L) ? P.L : 'Código'),
        wxn: 'wrapx1',
        I: {
            tag: 'input',
            type: 'text',
            placeholder: ((P.placeholder) ? P.placeholder : 'Leer código...'),
            'class': jsF + ' bcLeer',
            name: 'lineCode',
            style: 'fontSize:20px;'
        }
    }, pare);
    var bc = $1.q('.bcLeer', divL);
    bc.keyPresi('enter', function (Tv) {
        P.func(bc.value, pare);
        bc.value = '';
    });
}
$1.T.iHelp = function (HTML, pare, P) {
    var div = $1.t('div', {'class': '_i', title: 'Obtener Información'}, pare);
    P = (P) ? P : {};
    if (P.onDiv) {
        div.style.height = 'auto';
        div.style.float = 'none';
        delete (P.onDiv);
    }
    P['class'] = 'fa faBtn fa_info';
    btn = $1.t('span', P, div);
    btn.onclick = function () {
        opene(HTML);
    }

    function opene(HTML) {
        var wto = $1.q('._i_wrap', div);
        if (wto) {
            var disp = wto.style.display;
            if (disp == '' || disp == 'block') {
                wto.style.display = 'none';
            } else {
                wto.style.display = 'block';
            }
        } else {
            var wt = $1.t('div', {'class': '_i_wrap pre', style: 'display:block'}, div);
            if (HTML.tagName) {
                wt.appendChild(HTML);
            }
        }
    }
}

$1.gVal = function (t, Px) {
    var P = (Px) ? Px : {};
    var rt = null;
    if (!t || t.tagName == undefined) {
        rt = null;
    } else {
        switch ((t.tagName).toLowerCase()) {
            case 'input':
                rt = t.value;
                if (Px == 'tag') {
                    rt = t;
                }
                break;
            case 'select':
                optSel = (t.options && t.options[t.selectedIndex]) ? t.options[t.selectedIndex] : '';
                if (Px == 'tag') {
                    rt = optSel;
                } else {
                    rt = (optSel.value) ? optSel.value : '';
                }
                break;
            default:
                rt = t.innerText;
                break;
        }
    }
    if (P.format == 'number') {
        rt = (rt == null) ? 0 : $Str.toNumber('' + rt);
        rt = rt * 1;
    }
    return rt;
}

$1.replaces = function (acc = '', ori = []) {
    //tags[origin,new,origin,new...]
    var docHead = document.head;
    console.log(ori);
    for (var i = 0; i < ori.length; i += 2) {
        ori[i].classList.remove('hidden');
        ori[i + 1].classList.remove('hidden');
        if (acc == 'hi1') {
            ori[i].classList.add('hidden');
        } else if (acc == 'hi2') {
            ori[i + 1].classList.add('hidden');
        }
        //ocultar en head
        else if (acc == 'oci') {
            docHead.appendChild(ori[i + 1]);
            ori[i]._paretop = ori[i].parentNode;
            ori[i + 1]._paretop = ori[+1].parentNode;
        } else if (acc == 'oc1') {
            docHead.appendChild(ori[i]);
            ori[i + 1]._paretop.appendChild(ori[i + 1]);
        } else if (acc == 'oc2') {
            docHead.appendChild(ori[i + 1]);
            ori[i]._paretop.appendChild(ori[i]);
        }
    }
}

$1.boxvPost = function (P, pare) {
    P = (P) ? P : {};
    var ln = (P.ln) ? P.ln : '';
    var dp = {'class': 'boxvPost', 'data-vPost': 'Y'};
    if (P.uid) {
        dp.id = 'boxvPost_uniqueId__' + P.uid;
        if ($1.q('#' + dp.id, pare)) {
            return false;
        }
    }
    var div = $1.t('div', dp, pare);
    var btn = $1.t('button', {'class': 'boxvPost_close fa faBtn fa-close', title: 'close'}, div);
    btn.ln = ln;
    btn.ide = (P.ide) ? P.ide : false;
    btn.onclick = function () {
        div.style.display = 'none';
        div.vPost += '&' + this.ln + '[delete]=Y';
        if (this.ide) {

        }
        //else{ $1.delet(this.parentNode); }
    }
    div.vPost = (P.vPost) ? P.vPost : '';
    if (P.line1) {
        $1.t('div', {textNode: P.line1, 'class': 'boxvPost_line'}, div);
    }
    ;
    if (P.line2) {
        $1.t('div', {textNode: P.line2, 'class': 'boxvPost_line'}, div);
    }
    ;
    if (P.lineBlue) {
        $1.t('div', {textNode: P.lineBlue, 'class': 'boxvPost_line boxvPost_lineBlue'}, div);
    }
    ;
}

$1.EV = {
    winMove: function (obj, objMove, text) {
        var moz = document.getElementById && !document.all;
        obj.onmousedown = function (e) {
            document.onmousemove = function (e) {
                l = moz ? e.clientX : event.clientX;
                t = moz ? e.clientY : event.clientY;
                var winW = window.innerWidth
                var w = parseInt(objMove.offsetWidth);
                var h = parseInt(objMove.offsetHeight);
                if (t < -20) {
                    document.onmousemove = false;
                    objMove.style.top = 0;
                } else if (l < (w / 4)) {
                    document.onmousemove = false;
                    objMove.style.left = 0;
                } else {
                    objMove.style.left = l - w + 45;
                    objMove.style.top = t - 20;
                }
            }
            document.onmouseup = function () {
                document.onmousemove = false;
            }
        }
    }
}

$1.Wi = {
    basic: function (P) {
        P = (P) ? P : {};
        //wrapTop, winI{}
        var wrap = $1.t('div');
        if (P.wrapTop) {
            wrap.appendChild(P.wrapTop);
        }
        if (!P.objTyp) {
            P.objTyp = {};
        }
        //P.objType {targetType, targetRef, FR:{} }
        var wrapMenu = $1.t('div');
        var Opts = {};
        var active_5c = ' active';
        if (P.winI) {
            active_5c = '';
            Opts['_0winInfo'] = {
                li: {
                    textNode: P.winI.textNode,
                    'class': 'active ' + P.winI['class'],
                    winClass: 'winOInfo',
                    func: P.winI.func
                }
            }
        }
        Opts['_5c'] = {
            li: {
                textNode: 'Comentarios',
                'class': 'fa fa_comment' + active_5c,
                winClass: 'win5c',
                func: function () {
                    $3.F.$5c(P.objTyp, {getList: 'Y'})
                }
            }
        };
        Opts['_5f'] = {
            li: {
                textNode: 'Archivos', 'class': 'fa fa_fileUpd', winClass: 'win5f', func: function () {
                    $3.F.$5f(P.objTyp, {getList: 'Y'});
                }
            }
        };
        var menu = $1.Menu.inLine(Opts, wrap);
        wrapMenu.appendChild(menu);
        if (P.winI) {
            wrapMenu.appendChild(P.winI.wrap);
            P.winI.wrap.classList.add('winMenuInline', 'winOInfo');
            wrapMenu.appendChild($3.F.$5c(P.objTyp, {getList: 'N'}));
            wrapMenu.appendChild($3.F.$5f(P.objTyp, {getList: 'N'}));
        } else {
            wrapMenu.appendChild($3.F.$5c(P.objTyp, {getList: 'Y'}));
            wrapMenu.appendChild($3.F.$5f(P.objTyp, {getList: 'N'}));
        }
        wrap.appendChild(wrapMenu);
        var wrapInf = $1.t('div', {style: 'font-size:0.6rem; position:absolute; bottom:0.25rem;'});
        wrapInf.appendChild($1.t('b', {textNode: 'target: ' + P.objTyp.targetType + ' / ' + P.objTyp.targetRef}));
        wrap.appendChild(wrapInf);
        $1.Win.open(wrap, {onBody: 1, winTitle: P.winTitle, winSize: 'medium'});
    },
}

$1.Tb = {
    topCols: function (P, pare) {
        var P = (P) ? P : {};
        var tbC = {'class': 'table_zh table_x100'};
        if (P['class']) {
            tbC = P['class'];
        }
        var tb = $1.t('table', tbC, pare);
        var tBody = $1.t('tbody', 0, tb);
        var tr = $1.t('tr', {'class': 'tb_trCols'}, tBody);
        var cols = (P.cols) ? P.cols : 4;
        w = (100 / cols) - 0.5;
        for (var i = 1; i <= P.cols; i++) {
            $1.t('td', {'class': 'tdTop', style: 'width:' + w + '%;'}, tr);
        }
        return tb;
    },
    trFieVal: function (P, cont) {
        var wrap = $1.t('div');
        if (P.winDescrip != undefined) {
            var p = $1.t('p', {'textNode': P.winDescrip}, wrap);
        }
        var Th = (P.Th) ? P.Th : ['Campo', 'Valor'];
        var Tb = (P.Tb) ? P.Tb : {};
        var tb = $1.T.table(Th, Tb);
        wrap.appendChild(tb);
        var tBody = $1.t('tbody', 0, tb);
        for (var f in P.L) {
            var tr = $1.t('tr', 0, tBody);
            $1.t('td', {'textNode': f}, tr);
            $1.t('td', {'textNode': P.L[f]}, tr);
        }
        if (cont) {
            cont.appendChild(wrap);
        } else {
            $1.Win.open(wrap, {winSize: 'medium', winTitle: P.winTitle, onBody: 1});
        }
    },
    trsI: function (L, cont, P) {
        P = (P) ? P : {};
        var wrap = $1.t('div');
        if (P.winDescrip != undefined) {
            var p = $1.t('p', {'textNode': P.winDescrip}, wrap);
        }
        var tb = $1.T.table();
        tb.style.fontSize = '0.8rem';
        var tBody = $1.t('tbody', 0, tb);
        var th = 'font-weight:bold;';
        for (var f in L) {
            var tr = $1.t('tr', L[f].tr, tBody);
            if (L[f].tds) {
                LF = L[f].tds;
                for (var i in LF) {
                    var td = $1.t('td', {});
                    aGo = LF[i].aGo;
                    delete (LF[i].aGo);
                    if (LF[i].tagName) {
                        td.appendChild(LF[i]);
                    } else if (LF[i].node) {
                        td.appendChild(LF[i].node);
                    } else {
                        td = $1.t('td', LF[i]);
                    }
                    if (aGo) {
                        $1.aGo(aGo, null, td);
                    }
                    tr.appendChild(td);
                }
            } else {
                var tdT = {'textNode': L[f].t, style: th};
                if (L[f].tP) {
                    for (var z in L[f].tP) {
                        tdT[z] = L[f].tP[z];
                    }
                }
                $1.t('td', tdT, tr);
                var td = $1.t('td', 0, tr);
                if (L[f].node) {
                    td.appendChild(L[f].node);
                }
                if (L[f].aGo) {
                    $1.aGo(L[f].aGo, null, td);
                }
            }
        }
        if (cont) {
            cont.appendChild(tb);
        } else {
            return tb;
        }
    },
    trCols: function (Ls, P, pare) {
        var P = (P) ? P : {};
        var tb = $1.t('table', {'class': 'table_zh table_x100'});
        var tBody = $1.t('tbody', 0, tb);
        var tr = $1.t('tr', {'class': 'tb_trCols'}, tBody);
        var cols = (P.cols) ? P.cols : 4;
        w = (100 / cols) - 0.5;
        for (var i = 1; i <= P.cols; i++) {
            $1.t('td', {'class': 'tdTop', style: 'width:' + w + '%;'}, tr);
        }
        if (Ls) {
            var styT = (P.styT) ? P.styT : '';
            var styD = (P.styDef) ? P.styDef : '';
            for (var i in Ls) {
                var L = Ls[i];
                if (!L.vSty) {
                    L.vSty = '';
                }
                if (L.vB) {
                    L.v = $1.t('b', {textNode: L.vB});
                }
                if (!L.ln) {
                    var tr = $1.t('tr', 0, tBody);
                }//ln=true then new tr
                var teS = {textNode: L.t, style: styD + styT};
                var kt = {
                    colspan: ((L.cs) ? L.cs : null),
                    rowspan: ((L.rs) ? L.rs : null),
                    style: styD + L.vSty
                };
                if (L.tlabel) {
                    L.addB = $1.t('b', {textNode: L.tlabel + '\u0020'});
                }
                if (L.blank == 'Y') {
                    var td = $1.t('td', kt, tr);
                    td.innerHTML = '&nbsp;';
                    if (L.addB && td) {
                        td.insertBefore(L.addB, td.firstChild);
                    }
                    continue;
                }
                if (L.t) {
                    if (L.tCs) {
                        teS.colspan = L.tCs;
                    }
                    if (L.tRs) {
                        teS.rowspan = L.tRs;
                    }
                    teS['trCols'] = 't';
                    $1.t('td', teS, tr);
                }
                if (L.Tag) {/*añadir pars tag */
                    for (var i9 in L.Tag) {
                        kt[i9] = L.Tag[i9];
                    }
                }
                if (L.v === false || L.v == null || L.v == undefined) {
                } else if (L.v && L.v.tagName) {
                    var td = $1.t('td', kt, tr);
                    td.appendChild(L.v);
                } else {
                    var td = $1.t('td', kt, tr);
                    if (L.HTML) {
                        td.innerHTML = L.v;
                    } else {
                        td.innerText = L.v;
                    }
                }
                if (L.addB && td) {
                    td.insertBefore(L.addB, td.firstChild);
                }
            }
        }
        if (pare) {
            pare.appendChild(tb);
        }
        return tb;
    }

}

$1.Menu = {
    tabs: function (P, pare) {
        var R = {};
        var wrap = $1.t('div', {'class': '__1menuTabs'}, pare);
        R._top = wrap;
        var Lw = (P.w) ? P.w : {};
        if (Lw['class']) {
            Lw['class'] = 'menuInline ' + Lw['class'];
        } else {
            Lw['class'] = 'menuInline ';
        }
        var winMenu = $1.t('div', Lw, wrap);
        var wins = $1.t('div', {'class': '__1menuTabs_wins'}, wrap);

        function active(obj) {
            var lis = $1.q('li', wrap, 'all');
            for (var i = 0; i < lis.length; i++) {
                var li = lis[i];
                li.classList.remove('active');
                if (obj.getAttribute('winClass') == li.getAttribute('winClass')) {
                    obj.classList.add('active');
                }
            }
            var wins = $1.q('.winMenuInLine', wrap, 'all');
            for (var i = 0; i < lis.length; i++) {
                if (wins[i]) {
                    wins[i].style.display = 'none';
                    if (wins[i].classList.contains(obj.getAttribute('winClass'))) {
                        wins[i].style.display = 'block';
                    }
                }
            }
        }

        var ul = $1.t('ul', 0, winMenu);
        for (var i in P.L) {
            var D = P.L[i];
            var sty = (D.actived) ? '' : 'display:none';
            R[D.winClass] = $1.t('div', {'class': 'winMenuInLine ' + D.winClass, style: sty}, wins);
            var node = false;
            if (D && D.node) {
                node = D.node;
                delete (D.node);
            }
            var li = $1.t('li', D, ul);
            li.D = D;
            R['li_' + D.winClass] = li;
            if (D.actived) {
                li.classList.add('active');
            }
            if (node) {
                li.appendChild(node);
                continue;
            }
            li.P = D.P;
            li.onclick = function () {
                active(this);
                if (this.D.func) {
                    this.D.func(this.P);
                }
            }
        }
        $1.t('clear', 0, winMenu);
        return R;
    },
    inLine: function (P, P2) {
        pare = P2;
        P2 = (P2) ? P2 : {};
        if (P2.cont) {
            pare = P2.cont;
        }
        if (P2.winCont) {//todo en un div
            var pare = $1.t('div', {style: 'border:0.0625rem solid #EEE;', 'class': 'menuInline_winTopAll'});
        }
        var Lw = (P.w) ? P.w : {};
        if (Lw['class']) {
            Lw['class'] = 'menuInline ' + Lw['class'];
        } else {
            Lw['class'] = 'menuInline ';
        }
        var winMenu = $1.t('div', Lw, pare);
        var ul = $1.t('ul', 0, winMenu);
        if (P2.winsDraw) {
            var winM = $1.t('div', {'class': '_1MenuInLine_wins'}, winMenu);
        }
        //P:{id,text,func:() }
        var Li = (P.Li) ? P.Li : P;

        function active(obj) {
            var lis = $1.q('li', pare, 'all');
            for (var i = 0; i < lis.length; i++) {
                var li = lis[i];
                li.classList.remove('active');
                if (obj.getAttribute('winClass') == li.getAttribute('winClass')) {
                    obj.classList.add('active');
                }
            }
            var wins = $1.q('.winMenuInLine', pare, 'all');
            for (var i = 0; i < wins.length; i++) {
                if (wins[i]) {
                    wins[i].style.display = 'none';
                    if (wins[i].classList.contains(obj.getAttribute('winClass'))) {
                        wins[i].style.display = 'block';
                    }
                }
            }
        }

        var Wins = {};
        for (var i in Li) {
            var D = Li[i];
            if (P2.winsDraw) {
                var winCont = $1.t('div', {'class': 'winMenuInLine ' + D.winClass, style: 'display:none'}, winM);
                Wins[D.winClass] = winCont;
            }
            if (D.li) {
                D = D.li;
            }
            var node = false;
            if (D && D.node) {
                node = D.node;
                delete (D.node);
            }
            var li = $1.t('li', D, ul);
            li.D = D;
            li.win = winCont;
            if (node) {
                li.appendChild(node);
                continue;
            }
            li.onclick = function () {
                active(this);
                if (this.D.func && !this.D.funcPars) {
                    this.D.func(this);
                } else if (this.D.func) {
                    this.D.func(this.D.funcPars);
                }
            }
        }
        //$1.t('clear',0,winMenu);
        if (P2.winsDraw) {
            return Wins;
        }
        if (P2.winCont) {
            return pare;
        }
        return winMenu;
    },
    winLiRel: function (D, pare) {
        var D = (D) ? D : {};
        if (D.tagBtn) {
            btn = D.tagBtn;
        } else {
            var bd = {
                'class': 'btnB btn-drop dropdown-toggle',
                title: 'Opciones',
                textNode: ((D.textNode) ? D.textNode : '')
            };
            if (D.L) {
                bd.ld = 'Y';
                bd.L = D.L;
            }
            var pare = $1.t('div', {'class': 'dropdown d-inlineblock'}, pare);
            var btn = $1.t('button', bd, pare);
            //$1.t('i',{'class':'fa fa-bars'},btn);
        }
        //var el=JSON.stringify(D);
        if (D.textNode) {
            btn.classList.add('btnAddText');
        }
        var winId = (D.winId) ? D.winId : '_1WinLiRelWrap_' + $js.srand();
        btn.winId = winId;
        btn.D = D;
        btn.PB = D.PB /* dato base para todos {docentry...}*/
        btn.onclick = function () {
            var D2 = this.D;
            var PB = this.PB;
            var Tbtn = this;
            var twin = $1.q('#' + this.winId);
            if (twin) {
                $1.delet(twin);
            } else {
                var wrap = $1.t('div');
                var pare = this.parentNode;
                var ul = $1.t('ul', {'class': 'ulList'});
                wrap.appendChild(ul);
                //Listado de opciones
                for (var i in D2.Li) {
                    L = D2.Li[i];
                    var ico = (L.ico) ? ' ' + L.ico : '';
                    var li = $1.t('li', {'class': ico});
                    if (L.P) {
                        li.P = L.P;
                    } else {
                        li.P = L;
                    }
                    if (this.PB) {
                        li.P = this.PB;
                    }
                    li.X = L.X;
                    if (L.href) {//como tag a
                        XL = {href: L.href, textNode: L.textNode};
                        if (L.target) {
                            XL.target = L.target;
                        }
                        $1.t('a', XL, li);
                    } else if (L.hrefTo) {//como tag a
                        var pars = '';
                        for (var z1 in L.hrefTo) {
                            var tk1 = L.hrefTo[z1];
                            if (z1 == 0) {
                                continue;
                            }
                            if (L.P && L.P[tk1]) {
                                pars += tk1 + ':' + L.P[tk1] + ',';
                            }
                        }
                        $1.t('a', {href: $M.to(L.hrefTo[0], pars, 'r'), textNode: L.textNode}, li);
                    } else if (L.mTo) {//como tag a
                        var paL = (Tbtn.L) ? Tbtn.L : L.P;
                        if (PB) {
                            paL = PB;
                        }
                        var pars = $M.pars(L.mPars, paL);
                        $1.t('a', {href: $M.to(L.mTo, pars, 'r'), textNode: L.textNode}, li);
                    } else {
                        li.appendChild($1.t('span', {textNode: L.textNode, typedata: 'plain'}));
                    }
                    if (L.func) {
                        li.func = L.func;
                    }
                    ul.appendChild(li);
                    li.onclick = function () {
                        pare.style.position = '';
                        if (this.func) {
                            this.func(this);
                        }
                        $1.delet(winRel);
                    }
                }
                var winRel = $1.Win.minRel(wrap, {
                    winId: winId,
                    wrapBtn: pare,
                    winTitle: D.winTitle,
                    winPosition: 'left:0.5rem; top:0.5rem',
                    posi: D.posi
                });
                pare.style.position = 'relative';
                pare.appendChild(winRel);
            }
        }
        if (D.tagBtn) {
            btn.click();
        }//auoclick
        else {
            return btn;
        }
    }
};
$1.tabsExts = {};//Extensiones como plugsCmts, plugFiles
$1.tabs = function (Li, pare, P2) {
    P2 = (P2) ? P2 : {};
    var winsDraw = (P2.winsDraw != 'N');
    var Lw = (P2.w) ? P2.w : {};
    var winMenu = $1.t('div', Lw, pare);
    Lw.style
    winMenu.classList.add('_1Mtabs', 'menuInline');
    var ul = $1.t('ul', {style: 'borderBottom:1px solid #CCC'}, winMenu);
    if (winsDraw) {
        var winM = $1.t('div', {'class': '_1MenuInLine_wins'}, winMenu);
    }
    var Wins = [];

    function active(obj) {
        var lis = $1.q('li', pare, 'all');
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            li.classList.remove('active');
            if (obj.getAttribute('winClass') == li.getAttribute('winClass')) {
                obj.classList.add('active');
            }
        }
        var wins = $1.q('.winMenuInLine', pare, 'all');
        for (var i = 0; i < wins.length; i++) {
            wins[i].style.display = 'none';
            if (wins[i].classList.contains(obj.getAttribute('winClass'))) {
                wins[i].style.display = 'block';
            }
        }
    }

    for (var i in Li) {
        var D = Li[i];
        if (D.k) {
            if (Dx = $1.tabsExts[D.k]) {
                Dx.P = D.P;//tt,tr,getList
                if (D.mdlActive) {
                    Dx.mdlActive = D.mdlActive;
                }
                D = Dx;
            }
        }
        if (D.mdlActive && !$Mdl.status(D.mdlActive)) {
            continue;
        }
        var node = false;
        if (D && D.node) {
            node = D.node;
            delete (D.node);
        }
        var li = $1.t('li', D, ul);
        if (D.active) {
            li.classList.add('active');
        }
        li.D = D;
        if (winsDraw) {
            var dis = 'display:none';
            if (D.active) {
                dis = '';
            }
            var winCont = $1.t('div', {'class': 'winMenuInLine ' + D.winClass, style: dis}, winM);
            Wins[D.winClass] = winCont;
            Wins['_' + D.winClass] = li;
            if (D.nDivs) {
                for (var z in D.nDivs) {
                    var nid = D.winClass + '_n' + (z + 1);
                    D.nDivs[z]['class'] = nid;
                    Wins[nid] = winCont;
                    $1.t('div', D.nDivs[z], winCont);
                }
            }
            li.win = winCont;
        }
        if (P2.P) {
            li.P = P2.P;
        }
        if (node) {
            li.appendChild(node);
            continue;
        }/* evitar por clic */
        li.onclick = function () {
            active(this);
            if (this.D.func) {
                if (this.D.justOne == 'Y') {
                    if (this.winOpen != 'Y') {
                        this.D.func(this);
                    }
                } else {
                    this.D.func(this);
                }
            }
            this.winOpen = 'Y'; //ya abierto
        }
        if (D.active && li.D.func) {
            li.click();
        }
    }
    return Wins;
}
$1M = {/* new */
    tabs: function (Li, pare, P2) {
        return $1.tabs(Li, pare, P2);
    }
};

$1.click = {
    disp: function (w, child) {
        var st = w.style.display;
        var pare = (child) ? child.parentNode : false;

        if (st == '' || st == 'none') {
            w.style.display = 'block';
            if (pare) {
                pare.style.position = 'relative';
            }
        }
        if (st == 'block') {
            w.style.display = 'none';
            pare.style.position = '';
        }
    },
    hide: function (liCl, wUl) {
        var btn = $1.q('.winUl_hide_btnOpen', wUl.parentNode);//
        if (liCl == btn) {
            btn.style.display = 'block';
        }
        var st = wUl.style.display;
        var li = $1.q('.winUl_hide_wrapList ul > li', wUl.parentNode, 'all');
        for (var i = 0; i < li.length; i++) {
            li[i].style.backgroundColor = '';
            if (li[i] == liCl) {
                li[i].style.backgroundColor = '#CCC';
            }
        }
        if ((btn.style.display == '' || btn.style.display == 'none')) {
            return true;
        }
        var pare = (wUl) ? wUl.parentNode : false;
        if (st == '' || st == 'none') {
            wUl.style.display = 'block';
            if (pare) {
                pare.style.position = 'relative';
            }
        }
        if (st == 'block') {
            wUl.style.display = 'none';
            pare.style.position = '';
        }
    }
}

$1.Ul = {
    disp: function (D, P, wrap) {
        P = (P) ? P : {};
        if (P.funcC) {
            var funcC = P.funcC;
            delete (P.funcC);
        }
        var sty = {}//on css;{position:'absolute', top:'100%', left:'0.25rem', border:'0.0625rem solid #CCC', display:'none', backgroundColor:'#FFF', padding:'0.25rem', maxWidth:'15rem'}
        if (!wrap) {
            var wrap = $1.t('div', {id: P.id});
        }
        wrap.classList.add('__topWinUldisp');//usar para reposicionar rel
        for (var i in sty) {
            wrap.style[i] = sty[i];
        }
        var ul = $1.t('ul', {'class': 'ulList'});
        wrap.appendChild(ul);
        for (var i in D) {
            L = D[i];
            var ico = (L.ico) ? ' ' + L.ico : '';
            var li = $1.t('li', {'class': ico, textNode: L.textNode});
            if (L.P) {
                li.P = L.P;
            }
            if (L.func) {
                li.func = L.func;
            }
            ul.appendChild(li);
            li.onclick = function () {
                //wrap debe ser hijo nivel 1 para poder posicionar
                if (funcC) {
                    funcC(this);
                }
                if (this.func) {
                    this.func(this);
                }
                $1.click.disp(wrap, wrap);
            }
        }
        return wrap;
    },
    hide: function (D, P, wrap) {
        P = (P) ? P : {};
        if (P.funcC) {
            var funcC = P.funcC;
            delete (P.funcC);
        }
        var sty = {}
        if (!wrap) {
            var wrap = $1.t('div', {id: P.id, 'class': 'winUl_hide_wrapList'});
        }
        for (var i in sty) {
            wrap.style[i] = sty[i];
        }
        var ul = $1.t('ul', {'class': 'ulList'});
        wrap.appendChild(ul);
        for (var i in D) {
            L = D[i];
            var ico = (L.ico) ? ' ' + L.ico : '';
            if (L.icoT) {
                var li = $1.t('li', {'class': ico});
                li.appendChild($1.t('span', {'class': L.icoT, style: L.icoTsty}));
                li.appendChild($1.t('span', {textNode: L.textNode}));
            } else {
                var li = $1.t('li', {'class': ico, textNode: L.textNode});
            }
            if (L.P) {
                li.P = L.P;
            }
            if (L.func) {
                li.func = L.func;
            }
            ul.appendChild(li);
            li.onclick = function () {
                This = this;
                //wrap debe ser hijo nivel 1 para poder posicionar
                if (funcC) {
                    funcC(This);
                }
                if (This.func) {
                    This.func(This);
                }
                $1.click.hide(This, wrap);
            }
        }
        return wrap;
    }
}

$1.disp = function (pare) {/* display and hidden wrappers */
    var d = $1.q('._1dispWrap', pare, 'all');
    for (var i = 0; i < d.length; i++) {
        var btn = $1.q('._1dispBtn', d[i]);
        if (!btn) {
            btn = $1.q('legend', d[i]);
        }
        alert(d[i] + '--' + btn);
        if (btn) {
            if (!btn.contains('fa')) {
                btn.classList.add('fa');
            }
            if (!btn.contains('fa_plusSquare')) {
                btn.classList.add('fa_plusSquare');
            }
            btn.onclick = function () {
                var wp = $1.q('._1dispCont', this.parentNode);
                var disA = wp.style.display;
                if (disA == 'hidden' || disA == '') {
                    wp.style.display = 'block';
                    this.classList.replace('fa_plusSquare', 'fa_minusSquare');
                } else {
                    wp.style.display = 'hidden';
                    this.classList.replace('fa_plusSquare', 'fa_minusSquare');
                }
            }
        }
    }
};
$1.dnd = {//drag and drog
    i: function (qItem, qWraps, P) {
        P = (P) ? P : {};
        var items = $1.G.qSel(qItem, null, 'all');
        var wraps = $1.G.qSel(qWraps, null, 'all');
        for (var i = 0; i < wraps.length; i++) {
            var col = wraps[i];
            col.addEventListener('dragover', $1.dnd.dragOver, false);
            //col.addEventListener('touchmove',$1.dnd.tochMove,false)
            col.addEventListener('drop', function (e) {
                $1.dnd.drop(e, P);
            }, false)
            col.addEventListener('dragenter', $1.dnd.dragEnter, false)
            col.addEventListener('dragleave', $1.dnd.dragLeave, false)
            col.addEventListener('dragend', $1.dnd.dragEnd, false)
        }
        for (var i = 0; i < items.length; i++) {
            var col = items[i];
            col.setAttribute('draggable', 'true', false);
            col.addEventListener('dragstart', function (e) {
                $1.dnd.dragStart(e, P);
            }, false)
            //col.addEventListener('touchstar',$1.dnd.touchStart,false);
        }
    }
    ,
    dragStart: function (e, P) {
        e.dataTransfer.setData('text', e.target.id);
        var item = $1.G.byId(e.target.id);
        if ("ontouchstart" in document.documentElement) {
            if (P.funcTouch) {
                P.funcTouch(item);
            }
        }
    }
    ,
    dragOver: function (e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    ,
    dragEnter: function (e) {
        var data = e.dataTransfer.getData("text");
        var item = document.getElementById(data);
        var wrap = e.target;
        var wrapCont = $1.G.parentTo(wrap, 'cardCanvas_drag_wrap');
        var itemBefore = $1.G.parentTo(wrap, 'cardCanvas_drag_item');
        this.classList.add('over');
    }
    ,
    dragLeave: function (e) {
        var data = e.dataTransfer.getData("text");
        var item = document.getElementById(data);
        var wrap = e.target;
        //$1.delet('cardCanvas_drag_ghost');
        this.classList.remove('over');
    }
    ,
    drop: function (e, P) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        $1.delet('cardCanvas_drag_ghost');
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        var wrap = e.target;
        itemBefore = false;
        var wrapCont = $1.G.parentTo(wrap, 'cardCanvas_drag_wrap');
        //var itemBefore = $1.G.parentTo(wrap,'cardCanvas_drag_item');
        if (wrapCont) {
            var realWrap = $1.G.qSel('.cardCanvas_drag_wrapReal', wrapCont);
            if (realWrap) {
                wrapCont = realWrap;
            }
            var item = document.getElementById(data);
            if (P.onDrop) {
                P.onDrop({O: {i: item, w: wrapCont}, i: item.Odnd, w: wrapCont.Odnd});
            }
            if (itemBefore) {
                wrapCont.insertBefore(item, itemBefore);
            } else {
                wrapCont.appendChild(item);
            }
        }
        return false;
    }
    ,
    dragEnd: function (e) {
        this.classList.remove('over');
    }
    ,
    touchStart: function (e) {
        e.preventDefault();
        e.dataTransfer.setData('text', e.target.id);
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    }
    ,
    touchMove: function (e) {
        alert(e);
    }
}

$1.Color = {
    colors: ['#FE5621', '#AA47BC', '#01BBD4', '#109D59', '#7BD148', '#F691B2'],
    sel: function (P) {
        P = (P) ? P : {};
        var bgDef = (P.bgDef && !P.value) ? P.bgDef : '#FFF';
        var bgDef = (P.value) ? P.value : bgDef;
        var wrap = $1.t('div', {style: 'display:inline-block; position:relative;'});
        var l = {
            type: 'button',
            style: 'border:none; background:' + bgDef + '; color:' + bgDef + '; width:2rem; height:2rem; border:0.0625rem solid #000;',
            value: bgDef
        };
        if (P['class']) {
            l['class'] = P['class'];
        }
        if (P.name) {
            l.name = P.name;
        }
        var inp = $1.t('input', l);
        wrap.appendChild(inp);
        inp.onclick = function () {
            wrap.style.zIndex = 1;
            pal.style.display = 'block';
        };
        var pal = $1.t('div', {style: 'display:none; position:absolute; left:100%; top:0; width:14rem; backgroundColor:#FFF; padding:0.5rem; border:0.0625rem solid #000;'});
        wrap.appendChild(pal);
        for (var c in $1.Color.colors) {
            color = $1.Color.colors[c];
            var span = $1.t('button', {
                style: 'width:2rem; height:2rem; margin:0 0.25rem 0.25rem 0; border:none; background:' + color,
                color: color
            });
            span.onclick = function () {
                var color = this.getAttribute('color');
                ;
                inp.value = color;
                inp.style.background = color;
                inp.style.color = color;
                wrap.style.zIndex = false;
                pal.style.display = 'none';
            }
            pal.appendChild(span);
        }
        return wrap;
    }
}

$1.ulLvl = function (Li, ulTop, P) {
    //Li:[{ico,t,k, L{} }]
    P = (P) ? P : {};
    for (var i in Li) {
        var L = Li[i];
        var css = (L.ico) ? 'fa ' + L.ico : '';
        if (!L.L) {//no tiene hijos
            var li = $1.t('li', {'class': css}, ulTop);
            var k = (L.k) ? L.k : Li[i];
            if (P.liF) {
                P.liF({L: L, li: li, k: k});
            }
        } else {
            var li = $1.t('li', 0, ulTop);
            $1.t('button', {textNode: L.t, 'class': css}, li);
            var uln = $1.t('ul', {style: 'padding-left:1rem;'}, li);
            $1.ulLvl(L.L, uln, P);
        }
    }
}

$1.Ht = {
    multiSet: function (tSel, val) {
        var val = (val) ? val : tSel.value;
        val += val + ',';
        for (var i = 0; i < tSel.options.length; i++) {
            if (val.match('/' + tSel.options[i].value + '\,?/')) {
                tSel.options[i].selected = true;
            } else {
                tSel.options[i].selected = false;
            }
        }
    }
}

$1.Pager = {//usar en $M
    form: function (cont, P) {
        var wrap = $1.t('div', {'class': '__pagerMove', style: 'margin:0.5rem 0;'}, cont);
        var bef = $1.T.btnFa({
            fa: 'pager_btn __pagerBack', textNode: ' Anterior', func: function () {
                upd('--');
            }
        });
        wrap.appendChild(bef);
        var numb = $1.t('input', {type: 'text', 'class': '__pagerNumber pager_num soc_bg', value: 1}, wrap);
        numb.lastValue = 1;
        numb.onblur = function () {
            upd();
        }
        var nex = $1.T.btnFa({
            fa: 'pager_btn __pagerNext', textNode: ' Siguiente', func: function () {
                upd('++');
            }
        });
        wrap.appendChild(nex);

        function upd(t) {
            var np = (numb.value > 0) ? numb.value * 1 : 1;
            if (t == '++') {
                numb.value = np + 1;
            } else if (t == '--' && np > 1) {
                numb.value = np - 1;
            }
            if (P.func) {
                P.func();
            }
            numb.lastValue = np;
        }
    }
}

$1.copyContent = function (el) {
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand("copy");
    sel.removeAllRanges();
}
$1.download = function (mimeType, data, cvt, fileName) {
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', ((fileName) ? fileName : 'file-unname'));
    if (cvt) {
        link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + data);
    } else {
        link.setAttribute('href', data);
    }
    link.click();
}
$1.downCanv = function (cv, fileName) {
    blob = cv.toDataURL("image/jpeg");
    $1.download('image/jpeg', blob, null, fileName);
}
$1.copyCanv = function (cv) {
    /* no funciona */
    blob = cv.toDataURL("image/jpeg");
    const item = new ClipboardItem({"image/jpeg": blob});
    navigator.clipboard.write([item]);
}
$1.viewRangFilter = function (divL, P, Tagsc = []) {
    P = (P) ? P : {};
    jsV = (P.jsV) ? P.jsV : 'jsFiltVars';
    opt1 = [{k: 'M', v: 'Por mes'}, {k: 'D', v: 'Por fechas'},];
    $1.T.divL({
        wxn: 'wrapx8',
        L: 'Rango',
        I: {
            lTag: 'select',
            'class': jsV + ' viewRang',
            name: 'viewRang',
            opts: opt1,
            noBlank: 'Y',
            selected: P.selected
        }
    }, divL);
    date1 = $1.T.divL({
        wxn: 'wrapx8',
        L: 'Fecha',
        I: {tag: 'input', type: 'date', 'class': jsV, name: 'date1', value: $2d.today}
    }, divL);
    date2 = $1.T.divL({
        wxn: 'wrapx8',
        L: 'Fecha Fin',
        I: {tag: 'input', type: 'date', 'class': jsV, name: 'date2', value: $2d.today}
    }, divL);
    month1 = $1.T.divL({wxn: 'wrapx10', L: 'Desde', I: {lTag: 'month', 'class': jsV, name: 'month1'}}, divL);
    month2 = $1.T.divL({wxn: 'wrapx10', L: 'Hasta', I: {lTag: 'month', 'class': jsV, name: 'month2'}}, divL);
    year2 = $1.T.divL({
        wxn: 'wrapx10',
        L: 'Año Corte',
        I: {lTag: 'number', 'class': jsV, name: 'year2', value: $2d.today.substr(0, 4)}
    }, divL);
    Tagsc.push(date1, month1, date2, year2, date2, month2);
    $1.q('.viewRang', divL).onchange = function () {
        if (this.value == 'M') {
            $1.replaces('hi1', Tagsc);
        } else {
            $1.replaces('hi2', Tagsc);
        }
    }
    if (P.selected == 'D') {
        $1.replaces('hi2', Tagsc);
    } else {
        $1.replaces('hi1', Tagsc);
    }
}
$1.dateSelRang = function (topPare) {
    opts = [{k: '', v: 'Manual'}, {k: 'T', v: 'Hoy'}, {k: 'Y', v: 'Ayer'}, {k: 'LW', v: 'Semana Pasada'}, {
        k: 'LM',
        v: 'Mes Pasado'
    }, {k: 'TY', v: 'Este Año'}, {k: 'LY', v: 'Año Pasado'}];
    sel = $1.T.sel({lTag: 'select', opts: opts});
    $1.onchange(sel, (val, tag) => {
        dates = $1.q('.JDate', topPare, 'all');
        if (val == '') {
            $1.setValue('', dates[0]);
            $1.setValue('', dates[1]);
        } else if (val == 'T') {
            $1.setValue($2d.today, dates[0]);
            $1.setValue($2d.today, dates[1]);
        }
    });
    return sel;
}
$1.getOffset = function (el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: _y, left: _x};
}
$1.onchange = function (ele, func, pare) {
    ele = (ele && ele.tagName) ? ele : $1.q(ele, pare);
    if (ele) {
        ele.onchange = function () {
            func(this.value, $1.gVal(this, 'tag'));
        }
    }
}
$1.setValue = function (value, ele, pare) {
    ele = (ele && ele.tagName) ? ele : $1.q(ele, pare);
    if (ele) {
        if (ele.tagName == 'SELECT') {
            for (var i = 0; i < ele.options.length; ++i) {
                ele[i].selected = false;
                if (ele.options[i].value === value) {
                    ele[i].selected = true;
                }
            }
        } else {
            ele.value = value;
        }
    }
}
$1.tagSet = function (ele, func, pare) {
    ele = (ele && ele.tagName) ? ele : $1.q(ele, pare);
    if (ele) {
        func(ele);
    }
}
$1.barProgress = function (P, pare) {
    val1 = P.comp * 1;
    val2 = P.total * 1;
    prc = $js.round((val1 / val2) * 100, P.dec);
    if (P.format == '$') {
        val1 = $Str.money(val1);
        val2 = $Str.money(val2);
    }
    txt = val1 + ' de ' + val2 + ' (' + prc + '%)';
    if (P.i != 'N') {
        tba = $1.t('div', {style: 'display:inline-block', _i: txt}, pare);
        $1.t('progress', {value: prc / 100, title: txt}, tba);
    } else {
        tab = $1.t('progress', {value: prc, title: txt}, pare);
    }
    return tba;
}
$1.btnGo = function (P, pare) {
    btn = $1.t('button', {
        textNode: ((P.textNode) ? P.textNode : 'Nuevo'),
        'class': 'btnB btn-drop fa fa-plus-circle',
        P: P.P
    }, pare)
    btn.onclick = function () {
        P.func(this);
    }
    if (P.br) {
        $1.t('div', {style: 'height:10px; width:100%;'}, pare);
    }
    return btn;
}
$1.downNow = function (src, iid) {
    iid = (iid) ? 'downNowIframe' : iid;
    $1.delet('#' + iid);
    $1.t('iframe', {id: iid, src: src, style: 'display:none'}, document.body);
}
$1.mailSend = function (P) {
    P.maxSend = (P.maxSend) ? P.maxSend : 1;
    $Api.form2({
        furl: P.furl, jsF: 'Y',
        tbH: [
            {divLine: 1, L: 'Asunto', req: 'Y', wxn: 'wrapx2', I: {lTag: 'input', name: 'subject', value: P.subject}},
            {L: 'Para', req: 'Y', wxn: 'wrapx2', I: {lTag: 'input', name: 'to', value: P.to}},
            {divLine: 1, L: 'Mensaje', wxn: 'wrapx1', I: {lTag: 'textarea', name: 'msgBody'}},
        ],
        reqFields: {
            D: [{k: 'subject', iMsg: 'Asunto'}, {k: 'to', iMsg: 'Destinatario/Para'}]
        },
        befSend: function (JS, resp) {
            mails = JS.to.split(',');
            if (_err.err(mails.length > P.maxSend, 'No se pueden definir más de ' + P.maxSend + ' destinario/s'))
                console.log(JS);
            return JS;
        },
        Win: {winTitle: 'Enviar Mensaje', winSize: 'medium'},
    });
}
$1.headTags = function (X) {
    if (X.js) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', X.js);
        s.setAttribute('charset', 'UTF-8');
    } else if (X.css) {
        var s = document.createElement('link');
        s.setAttribute('rel', 'stylesheet');
        s.setAttribute('href', X.css);
        s.setAttribute('charset', 'UTF-8');
    }
    if (s) {
        s.onload = function () {
            if (X.func) {
                X.func();
            }
        }
        document.head.appendChild(s);
        return s;
    }
}

var $Str = {
    useCur: false,
    f: function (typ, t) {//10.00 = 10
        if (typeof (typ) != 'string') {
            typ = typ.getAttribute('vformat');
        }
        switch (typ) {
            case 'number':
                t = t * 1;
                break;
            case 'mil':
                t = $Str.toMil(t);
                break;
            case 'money':
                t = $Str.money(t);
                break;
        }
        return t;
    },
    format: function (t) {//10.00 = 10
        switch (typeof (t)) {
            case 'number':
                t = t * 1;
                break;
        }
        return t;
    },
    toNumber: function (t) {
        if (t) {
            var sig = (t.match(/^\-/)) ? '-' : '';
            var numb = t.replace(/[^\d\.]/g, "");
            return sig + numb;
        }
        return 0;
    },
    toMil: function (input) {
        var tag = (typeof (input) == 'object') ? true : false;
        var v = (tag) ? input.value : input + '';
        v = v.replace(/^0([0-9]+)/, '$1');
        var sig = (v.match(/^\-/)) ? '-' : '';
        var decr = v.match(/\.(\d+)?/g);
        var dec = '';
        if (decr) {
            dec = decr;
            v = v.replace(/\.\d+$/g, '');
        }
        var numb = v.replace(/\D/g, "");
        r = sig + numb.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',') + dec;
        ;
        if (tag) {
            input.value = r;
        }
        return r;
    },
    money: function (obj, k) {
        if ($js.isNull(obj)) {
            return '';
        }
        obj = (typeof (obj) != 'object') ? {value: obj} : obj;
        if ($Str.useCurr) {
            mo = $Str.useCurr;
        } else if (obj.curr) {
            mo = obj.curr;
        } else {
            mo = (obj.money) ? obj.money : $0s.currDefault;
        }
        if (k === 0) {
            numDec = 0;
        } else {
            var numDec = (obj.dec) ? obj.dec + 1 : 3;
        }
        if (!mo) {
            mo = '$';
        }
        if (k && obj[k]) {
            obj.value = obj[k];
        }
        if (obj.price) {
            obj.value = obj.price;
        }
        if (obj.priceME && mo != $0s.currDefault) {
            obj.value = obj.priceME;
        }
        texT = '' + obj.value + '';
        var sign = texT.substring(0, 1);
        texT = texT.replace('\u0001', '').replace(/\,(\d+)$/, '.$1');
        var deci = texT.match(/(\..*)$/);
        var dec = (deci != null) ? (deci[0]) : '';
        var num = (texT.replace(dec, '').replace(/[^\d]/g, ''));
        mo = mo + '\u0020';//no separación
        if (!isNaN(num)) {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1,');
            num = num.split('').reverse().join('').replace(/^[\,]/, '');
            dec = dec.substring(0, numDec);
            if (dec.match(/\.0+$/)) {
                dec = '';
            }
            if ((num + dec) * 1 == 0) {
                return mo + (num);
            }
            if (sign == '-') return '(' + mo + (num) + dec + ')';
            return mo + (num) + dec;
        }
        return '';
    },
    limit: function (text, limit) {
        var text = (text) ? text : '';
        var limit = (limit) ? limit : 10;
        var len = text.length;
        return (len > limit) ? text.substring(0, limit) + '...' : text
    },
    contain: function (t, m) {
        var r = new RegExp('^(' + m + ')$');
        if (t && t.match(r)) {
            return true;
        } else {
            return false;
        }
    },
    round: function (num, dec) {
        var res = num / 1;
        var resto = num % 1;
        dec = (resto == 0) ? 0 : dec;
        if (res != 0) {
            return num.toFixed(dec);
        } else {
            return num;
        }
    }
}

/* end $a */

var tbCal = {
    _row: '_tbCal_row',//tr
    _col: '_tbCal_col',//td hacia abajo
    _cell: '_tbCal_cell',//tr->td
    oper: function (num1, op, num2) {
        var num = 0;
        switch (op) {
            case '+':
                num = num1 + num2;
                break;
            case '-':
                num = num1 - num2;
                break;
            case 'x':
                num = num1 * num2;
                break;
            case '/':
                num = num1 / num2;
                break;
            case '%':
                num = num1 * (num2 / 100);
                break;
            case '+%':
                num = num1 + (num * (num2 / 100));
                break;
            case '-%':
                num = num1 - (num * (num2 / 100));
                break;
        }
        return num;
    },
    val: function (t) {
        num2 = 0;
        if (!t) {
            return 0;
        }
        switch ((t.tagName).toLowerCase()) {
            case 'input':
                num2 = t.value;
                break;
            case 'select':
                return t.value;
                break;
            default:
                num2 = t.innerText;
                break;
        }
        var isNeg = (num2 && num2.match(/^\(.*\)$/));
        var tn = $Str.toNumber(num2);
        if (isNeg) {
            return tn * -1;
        }
        return tn * 1;
    },
    get: function (tb, OP) {
        var OP = (OP) ? OP : {};
        //[cn1,x,cn2] cant x precio
        if (!OP.nT && OP[0]) {
            OP = {nT: OP};
        }
        var trs = $1.q('.' + tbCal._row, tb, 'all');
        var TR = [];
        for (var i = 0; i < trs.length; i++) {
            var cells = $1.q('.' + tbCal._cell, trs[i], 'all');
            TR[i] = {};
            for (var i2 = 0; i2 < cells.length; i2++) {
                var atr = (cells[i2] && cells[i2].getAttribute('cn')) ? cells[i2].getAttribute('cn') : false;
                if (atr) {
                    var kt = 'cn' + atr;
                    if (atr == 'nT') {
                        TR[i].nT = cells[i2];
                    } else {
                        TR[i][kt] = {v: tbCal.val(cells[i2])};
                    }
                }
            }
            TR[i].nT = (TR[i].nT) ? TR[i].nT : false;
        }
        for (var r in TR) {
            if (OP.nT) {
                var tag = TR[r].nT;
                var nTag = (TR[r].nT && TR[r].nT.tagName) ? TR[r].nT.tagName.toLowerCase() : false;
                if (nTag) {
                    var val = calx(OP.nT, TR[r]);
                    var format = tag.getAttribute('format');
                    if (format == '$') {
                        val = $Str.money(val);
                    }
                    if (nTag == 'input') {
                        tag.value = val;
                    } else {
                        tag.innerText = val;
                    }
                    TR[r].nT = {v: val};
                }
            }
        }

        function calx(oP, L) {
            var num = 0;/* [num, x, num2, -%, num3]*/
            if (oP[1]) {
                num1 = L[oP[0]].v;
                num2 = L[oP[2]].v;
                num = tbCal.oper(num1, oP[1], num2)
            }
            if (oP[3]) {/* -% */
                num3 = L[oP[4]].v;
                num = tbCal.oper(num, oP[3], num3)
            }
            return num;
        }

        delete (TR);
    },
    trLine: 'tbCal_trLine',
    trPrice: 'tbCal_trPrice', trPriceList: 'tbCal_trPriceList',
    /*añadir priceList como attibute-propiedad */
    trQty: 'tbCal_trQty', trTotal: 'tbCal_trTotal',
    trDisc: 'tbCal_trDisc',/*desc %*/
    trDiscSum: 'tbCal_trDiscSum', tbDiscTotal: 'tbCal_tbDiscTotal',
    trCols: 'tbCal_trCols', tbCols: 'tbCal_tbCols',/*nums para totales*/
    tbQty: 'tbCal_tbQty',
    tbSubTotal: 'tbCal_tbSubTotal',
    tbDisc: 'tbCal_tbDisc',
    tbTotal: 'tbCal_tbTotal',
    tbTotalDivs: 'tbTotalDivs',/* dibuja tr.t, tr.v */
    tbVPost: 'tbCal_vPost',
    discRecal: 'N',/*Y para actualizar precio con base a desc */
    trLnName: '',/*nombre para campos adicionales */
    /*imp */
    trVat: 'tbCal_trVat', tbVat: 'tbCal_tbVat',
    trRte: 'tbCal_trRte', tbRte: 'tbCal_tbRte',
    tbRteIva: 'tbCal_rteIva', tbRteIca: 'tbCal_rteIca',
    trLnNamer: function (n, v) {
        var t = n;
        if (tbCal.trLnName != '') {
            t = tbCal.trLnName + '[' + n + ']';
        }
        if (v) {
            t = t + '=' + v;
        }
        return t;
    },
    rcellsA: 'tbCal_rcellsA', rcellsB: 'tbCal_rcellsB',
    rcells: function (pare, func, name, P) {//con un id se recalculan todas
        //A-cant[x] recalcula muchas-B, lista materiales
        var P = (P) ? P : {};
        if (name) {
            name = (name) ? '-' + name : '';
            tbCal.rcellsA += name;
            tbCal.rcellsB += name;
        }
        var glob = $1.q('.' + tbCal.rcellsA, pare);
        glob.keyChange(function (T) {
            nDecim = (P.dec) ? P.dec * 1 : 2;
            valGlobal = (T.value) ? T.value * 1 : 1;
            var ch = $1.q('.' + tbCal.rcellsB, pare, 'all');
            for (var i = 0; i < ch.length; i++) {
                var base = (ch[i].baseQty) ? ch[i].baseQty : 1;
                val = $js.round(base * valGlobal, nDecim);
                $1.setText(val, ch[i]);
            }
            if (func) {
                func(T);
            }
        });
    },
    trIni: function (P) {
        for (var i in P) {
            tbCal[i] = P[i];
        }
    },
    trEnd: function () {
        tbCal.discRecal = 'N';
        tbCal.trLnName = '';
    },
    docTotal: function (tb, P) {
        //trLine->trPrice,trQty,trTotal
        // tbTotal
        var P = (P) ? P : {};
        nDecim = ($js.isNull(P.dec)) ? 2 : P.dec * 1;
        var ev = (P.e) ? P.e : 'N';//event from: price, disc
        if (P.trsCont) {
            trs = $1.q('tr', tb, 'all');
        } else {
            var trs = $1.q('.' + tbCal.trLine, tb, 'all');
        }
        var T = {qty: 0, lineTotal: 0, lineTotalList: 0};
        var tbDiscA = $1.q('.' + tbCal.tbDisc, tb);
        var discPf = tbCal.val(tbDiscA);
        for (var i = 0; i < trs.length; i++) {
            tbCal.trLnName = trs[i].ln;
            var priceA = $1.q('.' + tbCal.trPrice, trs[i]);
            var priceListA = $1.q('.' + tbCal.trPriceList, trs[i]);
            var qtyA = $1.q('.' + tbCal.trQty, trs[i]);
            var descA = $1.q('.' + tbCal.trDisc, trs[i]);
            var trTotalA = $1.q('.' + tbCal.trTotal, trs[i]);
            var priceList = (priceA && priceA.priceList) ? priceA.priceList : price;
            if (priceListA) {
                priceList = tbCal.val(priceListA);
            }
            /*vals*/
            var price = tbCal.val(priceA);
            var qty = tbCal.val(qtyA);
            var desc = tbCal.val(descA);
            if (tbCal.discRecal == 'Y') {
                if (ev == 'disc') {
                    priceA.value = priceList * (1 - (descA.value / 100));
                    var price = tbCal.val(priceA);
                } else {
                    descA.value = Math.round((1 - (price / priceList)) * 100, nDecim);
                }
            } else {
                price = price * (1 - (desc / 100));
            }
            var priceLine = price * qty;
            var lineTotal = priceLine * (1 - (discPf / 100));
            var lineTotalList = priceList * qty;
            var discSum = lineTotalList - lineTotal;
            /* depurar */
            if (trTotalA) {
                trTotalA.innerText = $Str.money(priceLine);
                if (trTotalA.getAttribute('data-vPost')) {
                    trTotalA.vPost = tbCal.trLnNamer('priceLine', priceLine) + '&' + tbCal.trLnNamer('lineTotal', lineTotal) + '&' + tbCal.trLnNamer('lineTotalList', lineTotalList) + '&' + tbCal.trLnNamer('discSum', discSum);
                }
            }
            T.qty += qty;
            T.lineTotal += priceLine;/*sin descpf */
            T.lineTotalList += lineTotalList;
        }
        var lineTotal = T.lineTotal;
        //10 und, 20% ($20), 80
        var tbQtyA = $1.q('.' + tbCal.tbQty, tb);
        if (tbQtyA) {
            tbQtyA.innerText = T.qty;
        }
        var tbSubTotalA = $1.q('.' + tbCal.tbSubTotal, tb);
        if (tbSubTotalA) {
            tbSubTotalA.innerText = lineTotal;
        }
        var docTotal = lineTotal * (1 - (discPf / 100));
        var discSum = Math.round(T.lineTotalList - docTotal, nDecim);
        var discTotal = Math.round(discSum / T.lineTotalList * 100, nDecim);
        var tbDiscTotalA = $1.q('.' + tbCal.tbDiscTotal, tb);//20% \n $20
        if (tbDiscTotalA) {
            tbDiscTotalA.innerText = discTotal + "%\n " + $Str.money(discSum);
            tbDiscTotalA.title = discSum + '/' + T.lineTotalList;
        }
        /* poner total */
        var tbTotalA = $1.q('.' + tbCal.tbTotal, tb);
        if (tbTotalA) {
            T.docTotal = docTotal;
            tbTotalA.innerText = $Str.money(docTotal);
        }
        /* depurar */
        var tbVPostA = $1.q('.' + tbCal.tbVPost, tb);
        if (tbVPostA && tbVPostA.getAttribute('data-vPost')) {
            tbVPostA.vPost = 'lineTotal=' + T.lineTotal + '&lineTotalList=' + T.lineTotalList + '&discTotal=' + discTotal + '&discSum=' + discSum + '&docTotal=' + docTotal;
            tbVPostA.innerText += '*';
        }
        if (P.func) {
            P.func(T);
        }
    },
    sumCells: function (tb, OP) {
        //_row [_cell, ncol, coper, format]
        var trs = $1.q('.' + tbCal._row, tb, 'all');
        var T = {};
        for (var i = 0; i < trs.length; i++) {
            var cells = $1.q('.' + tbCal._cell, trs[i], 'all');
            for (var i2 = 0; i2 < cells.length; i2++) {
                var ncol = (cells[i2].getAttribute('ncol')) ? cells[i2].getAttribute('ncol') : false;
                var coper = (cells[i2].getAttribute('coper')) ? cells[i2].getAttribute('coper') : '+';
                if (ncol) {
                    if (!T[ncol]) {
                        T[ncol] = 0;
                    }
                    if (coper == '-') {
                        T[ncol] -= tbCal.val(cells[i2]);
                    } else {
                        T[ncol] += tbCal.val(cells[i2]);
                    }
                }
            }
        }
        var Cols = [];
        for (var ncol in T) {
            var tc = $1.q('.' + tbCal._cell + '_' + ncol, tb);
            var valr = val = T[ncol];
            if (tc) {
                var format = tc.getAttribute('format');
                if (format == '$') {
                    val = $Str.money(valr);
                }
                tc.innerText = val;
            }
            Cols[ncol] = {v: valr, tag: tc};
        }
        if (typeof (OP) == 'function') {
            OP(Cols);
        }
    },
    totalOf: function (cls, pare, tag, func) { //totales segun cls pasado
        var qtys = $1.q(cls, pare, 'all');
        var total = 0;
        for (var z = 0; z < qtys.length; z++) {
            total += tbCal.val(qtys[z]);
        }
        if (func) {
            func(total);
        }
        if (tag) {
            tag.innerText = total;
        }
        return total;
    }
}

Uli = {
    i: {
        folColor: '#eeae4a'
    },
    liCs: '_ulFoldLi',
    ini: function (Lb, lef) {
        var Li = (Lb.Li) ? Lb.Li : {};
        var oldColor = Uli.i.folColor;
        if (Lb.folColor) {
            Uli.i.folColor = Lb.folColor;
        }
        /* folId,fatherId,folName, folColor, func */
        var c0 = '__GtdfolId_0';
        var div = $1.t('div', {'class': 'ulWrapLevel'}, lef);
        var ul = $1.t('ul', {'class': c0}, div);
        var Fa = {};
        var Ex = {};
        var n = 0;
        /* liOpen:Y, btnPlus:N,liReplace:Y */
        for (var i in Li) {
            Lb.L = Li[i];
            Uli.fold(Lb, lef);
        }
        /*quitar botones de los que no tenga hijos */
        Uli.clearBtn(Lb, lef);
        Uli.i.folColor = oldColor;
    },
    addFolder: function (Lb, wrap) {
        for (var i in Lb.Li) {
            Lb.L = Lb.Li[i];
            if (!Lb.L.liOpen) {
                Lb.L.liOpen = 'Y';
            }
            if (!Lb.L.liReplace) {
                Lb.L.liReplace = 'Y';
            }
            Uli.fold(Lb, wrap);
        }
    },
    addFol: function (Lb, wrap) {
        for (var i in Lb.Li) {
            Lb.L = Lb.Li[i];
            Uli.fold(Lb, wrap);
        }
    },
    clearBtn: function (Lb, lef, rep) {
        var ulv = $1.q('li._ulFoldLi', lef, 'all');//cada li
        for (var i = 0; i < ulv.length; i++) {
            var ulc = $1.q('ul', ulv[i]);
            var ulPare = ulv[i].parentNode;
            var plus = $1.q('.__btnPlus', ulv[i]);
            var totalc = 0// $1.q('li._ulFoldLi',ulv[i],'all');
            var totalc2 = $1.q('div ._ulFolderEle', ulv[i], 'all');//a o div btn span
            totalc = (totalc && totalc.length) ? totalc.length : 0;
            totalc += (totalc2 && totalc2.length) ? totalc2.length : 0;
            if (ulv[i].getAttribute('lv') != 'top') {
                ulPare.setAttribute('nchilds', 'Y');
                ulPare.setAttribute('xchilds', totalc);
            }
            ulv[i].setAttribute('nchilds', 'Y');
            ulv[i].setAttribute('xchilds', totalc);
            if (!ulc) {
                $1.delet(plus);
            }//ul is paret
            if (Lb.open == 'Y' && plus) {
                plus.click();
            }
        }
        if (!rep) {
            var ulv = $1.q('[nchilds="Y"]', lef, 'all');
            for (var i = 0; i < ulv.length; i++) {
                if (ulv[i].classList.contains('__GtdfolId_0')) {
                    continue;
                }
                if (ulv[i].getAttribute('xchilds') == 0) {
                    $1.delet(ulv[i]);
                }
            }
        }
    },
    fold: function (F, wrap) {
        L = (F.L) ? F.L : {};
        var fatherId = (!$js.isNull(F.fatherId))
            ? F.fatherId
            : ((!$js.isNull(L.fatherId)) ? L.fatherId : 0);
        var folId = (!$js.isNull(F.folId))
            ? F.folId
            : ((!$js.isNull(L.folId)) ? L.folId : 0);
        L.folId = folId;
        L.folName = (F.folName) ? F.folName : ((L.folName) ? L.folName : '???');
        var cls = '__GtdfolWrap';
        var c0 = '__GtdfolId_0';
        var c1 = '__GtdfolId_' + fatherId;
        var c2 = Uli.liCs + ' __GtdfolId_' + folId;
        var liRow = '__GtdfolId_' + folId + '_div'; // base donde se agrgan li
        var fat1 = $1.q('.' + c1, wrap);
        var fat0 = $1.q('.' + c0, wrap);
        var fat2 = $1.q('.' +liRow, fat1) // base donde se agrgan li
        var divWithLinks = $1.q('.' + liRow, wrap); // li parentNode
        var divPrp = {'class': liRow, folId: folId, style: 'display:inline-block'};
        if (L.liReplace == 'Y' && divWithLinks) {
            var divLi = $1.t('div', divPrp);
            var li = divWithLinks.parentNode;
            li.replaceChild(divLi, divWithLinks);
        } else {
            if (!fat1 || fatherId == 0) {
                var li = $1.t('li', {'class': c2, ttitle: fatherId + '-' + folId, lv: 'top'}, fat0);
            }
            else {
                var li0 = $1.q('ul li', fat1);
                if ((fat1 && !li0) || (fat1 && folId != 0)) {
                    var disp = (L.liOpen == 'Y') ? 'block' : 'none';
                    var ul = $1.t('ul', {style: 'display:' + disp + ';'});
                    var li = $1.t('li', {'class': c2, ttitle: fatherId + '-' + folId, 'lv': '2new'}, ul);
                    var uls = $1.q('ul', fat1, 'all');
                    if (L.pos && uls && uls[L.pos - 1]) {
                        fat1.insertBefore(ul, uls[L.pos - 1]);
                    } else {
                        fat1.appendChild(ul);
                    }
                } else if (fat1 && li0) {
                    li = li0;
                } else {
                    var li = $1.t('li', {'class': c1, ttitle: fatherId + '-' + folId, 'lv': 2}, fat0);
                }
            }
            var divLi = fat2 ? fat2 : $1.t('div', divPrp, li);
        }
        Uli.btn(L, divLi, F);//boton de accion
        if (L.rBtn == 'Y') {
            var spa = $1.t('div', {'class': '_r fa faBtn fa_3pointsv', title: 'Opciones'}, divLi);
            spa.L = L;
            spa.onclick = function () {
                if (F.rFunc) {
                    F.rFunc(this.L, this);
                }
            }
        }
        if (L.fEdit) {
            $1.T.btnFa({
                fa: 'fa-pencil', title: 'Modificar', P: L, func: function (T) {
                    L.fEdit(T);
                }
            }, $1.t('div', {style: 'display:inline-block; fontSize:10px'}, divLi));
        }
        if (L.fAdd) {
            $1.T.btnFa({
                fa: 'fa_plusCircle', title: 'Añadir', P: L, func: function (T) {
                    L.fAdd(T);
                }
            }, $1.t('div', {style: 'display:inline-block; fontSize:10px'}, divLi));
        }
        if (L.InodeBef && L.InodeBef.tagName) {
            divLi.insertBefore(L.InodeBef, divLi.firstChild);
        }
        if (L.InodeAft && L.InodeAft.tagName) {
            divLi.appendChild(L.InodeAft);
        }
    },
    btn: function (L, liWrap, F) {
        var cA = 'fa_plusSquare';
        var cB = 'fa_minusSquare';
        if (L.btnPlus != 'N' && L.folId != '??') {
            var copen = $1.t('span', {'class': '__btnPlus fa faBtn ' + cA}, liWrap);
            if (!L.folColor) {
                L.folColor = Uli.i.folColor;
            }
            copen.onclick = function () {
                T = this;
                var liParent = T.parentNode.parentNode; //li <- div
                var uli = $1.q('ul', liParent, 'all'); /* tiene hijos */
                if (uli && uli.length > 0) {
                    var isOpen = T.classList.contains(cB);
                    if (isOpen) {
                        T.classList.replace(cB, cA);
                    } else {
                        T.classList.replace(cA, cB);
                    }
                    for (var f = 0; f < uli.length; f++) {
                        if (uli[f].parentNode == liParent) {
                            var disp = uli[f].style.display;
                            if (disp == 'none') {
                                uli[f].style.display = 'block';
                            } else {
                                uli[f].style.display = 'none';
                            }
                        }
                    }
                }
            }
        }
        if (F.folIcon == 'N') {
            var Ico = {};
        } else {
            var Ico = {'class': 'fa fa_fol', color: L.folColor};
        }
        if (L.ico) {
            Ico['class'] = L.ico;
        }
        if (L.folIco) {
            Ico['class'] = L.folIco;
        }
        for (var e in L.Ico) {
            Ico[e] = L.Ico[e];
        }

        function href(L) {/* generar enlace */
            var El = {href: L.href, id: L.id, textNode: L.textNode};
            if (L.mTo) {
                El.href = $M.to(L.mTo, '', 'r');
            }
            El['class'] = 'fa fa_arrowCircleR';
            if (L.ico) {
                El['class'] = L.ico;
            }
            El.style = 'padding:0.25rem; text-decoration:none; display:block;';
            var tag = $1.t('a', El, liWrap);
            tag.classList.add('_ulFolderEle');
            if (F.liFunc) {
                tag.onclick = function () {
                    F.liFunc(this);
                }
            }
        }

        if (L.mTo) {
            href(L);
        } else if (L.MLis) { /*Si paso MLis[crd.s] buscar en $M.Li[k] */
            for (var z in L.MLis) {
                var z = L.MLis[z];
                var to = ($M.li[z] && $M.li[z].t) ? $M.li[z].t : z;
                href({mTo: z, id: 'mli_' + (z + '').replace('.', ''), textNode: to, ico: L.ico});
            }
        } else {
            var btn = $1.T.btnSpan({
                textNode: L.folName, title: L.folName,
                Ico: Ico, func: function (T) {
                    if (L.func) {
                        L.func();
                    } /*funcion de linea */
                    if (F.openText == 'Y' && copen) {
                        copen.click();
                    }
                    if (F.mTo) {
                        F.mTo(L);
                    } /* primero esta */
                    if (F.uriSet) {
                        var kp = {};
                        var mFunc = false;
                        for (var z in F.uriSet) {
                            var TK = F.uriSet[z];
                            if (typeof (TK) == 'function') {
                                mFunc = TK;
                                continue;
                            }
                            var k = (TK.k) ? TK.k : TK;
                            var ka = (TK.a) ? TK.a : k;
                            kp[ka] = L[k]; //tr=1, o cardId:1 con alias definido
                        }
                        $M.uriSet(kp, mFunc);
                    }
                    if (F.mFunc) {
                        $M.uriFunc = function () {
                            F.mFunc(L)
                        };
                    }
                    if (F.func) {
                        F.func(L);
                    }
                }
            }, liWrap);
            btn.classList.add('_ulFolderEle');
            /*Si defino esto, abro carpeta al hacer clic en el texto */
        }
    },
    openTop: function (folId, pare) {
        var li = $1.q('.__GtdfolId_' + folId, pare);
    },
    openTop2: function (li) {
        var ul = li.parentNode;
        if (ul && ul.parentNode) {
            ul = ul.parentNode;
        } //ul
    }

}

$Dch = {/*Data change */
    ck_vPost: '',/* vPost checkbox */
    ck: function (pare) {
        var ck = $1.q('input[type=checkbox]', pare, 'all');
        var Da = {};
        $Dch.ck_vPost = '';
        for (var i = 0; i < ck.length; i++) {
            ck[i].lastV = ck[i].checked;
            ck[i].i = i;
            ck[i].onchange = function () {
                $Dch.ck_vPost = '';
                if (this.lastV == this.checked) {
                    delete (Da[this.i]);
                }
                if (this.lastV != this.checked) {
                    Da[this.i] = this
                    for (var i2 in Da) {
                        var ck = (Da[i2].checked) ? 'Y' : 'N';
                        $Dch.ck_vPost += Da[i2].name + '=' + ck + '&';
                    }
                }
            }
        }

    }
}

$V.dateMonths = [
    {k: '01', v: 'Enero'}, {k: '02', v: 'Febrero'}, {k: '03', v: 'Marzo'},
    {k: '04', v: 'Abril'}, {k: '05', v: 'Mayo'}, {k: '06', v: 'Marzo'},
    {k: '07', v: 'Julio'}, {k: '08', v: 'Agosto'}, {k: '09', v: 'Septiembre'},
    {k: '10', v: 'Octubre'}, {k: '11', v: 'Noviembre'}, {k: '12', v: 'Diciembre'},
];
var $2d = {
    txtMonth: function (dat, abr = true) {
        var sep = dat.split('-');
        var mes = _g(sep[1], $V.dateMonths);
        if (abr) {
            mes = mes.substr(0, 3) + '.';
        }
        if (sep[1] != $2d.today.substr(0, 4)) {
            mes += ' ' + sep[1].substr(2, 2);
        }
        return mes;
    },
    D: {today: false, tom: false, next7: false},
    explode: function (d) {
        var sep1 = d.split(' '); //a h:i
        var x = sep1[0].split('-');
        return {Y: x[0], m: x[1], d: x[2]};
    },
    dates: function () {
        $2d.D.today = $2d.f('today', 'time');
        $2d.D.tom = $2d.f('tomorrow', 'time');
        $2d.D.next7 = $2d.f('next7', 'time');
    },
    isD: function (date) {
        var k = $2d.f(('' + date).substr(0, 10), 'time', {is0: 0});
        kd = 'future';
        if (k == 0) {
            kd = 'noDate';
        } else if (k < $2d.D.today) {
            kd = 'due';
        } else if (k == $2d.D.today) {
            kd = 'today';
        } else if (k == $2d.D.tom) {
            kd = 'tomorrow';
        } else if (k > $2d.D.tom && k <= $2d.D.next7) {
            kd = 'next7';
        }
        return kd;
    },
    fdef: '',//mmm d H:iam'
    rexp: /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/,
    daysW: {'1': 'Lun', '2': 'Mar', '3': 'Mie', '4': 'Jue', '5': 'Vie', '6': 'Sáb', '7': 'Dom'},
    dayW: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monW: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    Vs: {
        day1: 86400000,
        Days: {
            m: {t: 'Lunes', k: 1},
            t: {t: 'Martes', k: 2},
            w: {t: 'Miercoles', k: 3},
            tr: {t: 'Jueves', k: 4},
            f: {t: 'Viernes', k: 5},
            s: {t: 'Sabado', k: 6},
            su: {t: 'Domingo', k: 7}
        },
        nMo: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    }
    ,
    g: function (k, date) {//like php
        var t = '';
        var isSe = (typeof (date) == 'number');
        if (!isSe && $2d.is0(date)) {
            return 'e';
        }
        if (isSe) {
            times = (new Date());
            times.setTime(date * 1);
            date = $2d.f(times, 'Y-m-d');
        } else {
            var times = new Date($2d.toTime(date));
        }
        switch (k) {
            case 'z' :
                t = $2d.doY(date, 'PHP');
                t = (isNaN(t)) ? 'e' : t;
                break;
            case 'w' :
                t = times.getDay();
                t = (t == 0) ? 7 : t;
                break;
            case 'w_' :
                t = $2d.getDays(times);
                break;
            case 'W' :
                t = $2d.numWeek(date);
                break;
            case 'Y' :
                t = times.getFullYear();
                break;
            case 'Y-W' :
                t = times.getFullYear() + '-' + $2d.numWeek(date);
                break;
            case 'Y-z' :
                t = times.getFullYear() + '-' + $2d.doY(date, 'PHP');
                break;
            case 'n' :
                t = (times.getMonth()) + 1;
                break;
            case 'Y-W-z' :
                w = times.getDay();
                w = (w == 0) ? 7 : w;
                t = times.getFullYear() + '-' + $2d.numWeek(date) + '-' + $2d.doY(date, 'PHP');
                break;
        }
        return t;
    }
    ,
    rang: function (P) {
        P = (P) ? P : {};
        var date0 = (P.date1) ? P.date1 : $2d.today;
        date1 = date2 = date0;
        switch (P.rang) {
            case 'weeks':
                if (P.n && P.n > 1) {
                    date0 = $2d.add(date0, '+' + P.n + 'weeks');
                }
                date1 = ($2d.weekB(date0));
                var date2 = $2d.add(date1, '+13days');
                break;
            case 'days++':
                var date1 = date0;
                if (P.n && P.n > 1) {
                    date2 = $2d.add(date1, '+' + P.n + 'days');
                } else {
                    date2 = date1;
                }
                break;
            case 'days--':
                var date1 = date0;
                if (P.n && P.n > 1) {
                    date2 = $2d.add(date1, '-' + P.n + 'days');
                } else {
                    date2 = date1;
                }
                break;
        }
        return {r: 'r', date1: date1, date2: date2};
    },
    goRang: function (P) {
        P.date1 = (P.date1) ? P.date1 : $2d.today;
        var date0 = date1 = P.date1;
        var date2 = P.date2;
        var movType = (P.movType) ? P.movType : 'today';
        if (date0 == '') {
            movType = 'today';
        }
        if (movType == 'today') {
            date0 = $2d.today;
        }
        ;
        var viewType = P.rang;
        if (viewType == 'noDate') {
            date1 = '0000-00-00';
            date2 = '0000-00-00';
        }
        if (viewType == '14days') {
            if (movType == 'today') {
                var date1 = $2d.add(date0, '-14days');
                var date2 = $2d.add(date1, '+16days');
            } else if (movType == '++') {
                var date1 = $2d.add(date0, '+17days');
                var date2 = $2d.add(date1, '+16days');
            } else if (movType == '--') {
                var date1 = $2d.add(date0, '-17days');
                var date2 = $2d.add(date1, '+16days');
            }
        } else if (viewType == 'week' || viewType == 'weekh') {
            if (movType == 'today') {
                var date1 = ($2d.weekB(date0));
                var date2 = $2d.add(date1, '+6days');
            } else if (movType == '++') {
                date0 = $2d.add(date0, '+1weeks');
                date1 = ($2d.weekB(date0));
                var date2 = $2d.add(date1, '+6days');
            } else if (movType == '--') {
                date0 = $2d.add(date0, '-1weeks');
                date1 = ($2d.weekB(date0));
                date2 = $2d.add(date1, '+6days');
            }
        } else if (viewType == '2week') {
            if (movType == '++') {
                date0 = $2d.add(date0, '+2weeks');
                date1 = ($2d.weekB(date0));
                var date2 = $2d.add(date1, '+13days');
            } else if (movType == '--') {
                date0 = $2d.add(date0, '-2weeks');
                date1 = ($2d.weekB(date0));
                date2 = $2d.add(date1, '+13days');
            } else {
                var date1 = ($2d.weekB(date0));
                var date2 = $2d.add(date1, '+13days');
            }
        } else if (viewType == 'month') {
            if (movType == 'today') {
                dateG = ($2d.monthBE(date0));
                date1 = dateG.date1;
                date2 = dateG.date2;
            } else if (movType == '++') {
                var date0 = $2d.add(date2, '+27days');
                dateG = ($2d.monthBE(date0));
                date1 = dateG.date1;
                date2 = dateG.date2;
            } else if (movType == '--') {
                var date0 = $2d.add(date0, '-27days');
                dateG = ($2d.monthBE(date0));
                date1 = dateG.date1;
                date2 = dateG.date2;
            }
        } else if (viewType == 'diary' || viewType == 'daily') {
            if (movType == '==') {
            } else if (movType == 'today') {
                date1 = date0;
                var date2 = date1; //$2d.add(date1,'+1days');
            } else if (movType == '++') {
                var date1 = $2d.add(date0, '+1days');
                var date2 = date1; //$2d.add(date1,'+1days');
            } else {
                var date1 = $2d.add(date0, '-1days');
                var date2 = date1; //$2d.add(date1,'+1days');
            }
        } else if (P.viewType && P.viewType == 'nMonths') {
            if (movType == '==') {
            } else if (movType == 'today') {
                dateG = ($2d.monthBE(date0));
                date1 = dateG.date1;
                var date2 = $2d.add(date1, '+' + (P.nMonths - 1) + 'months');
                dateG = ($2d.monthBE(date2));
                date2 = dateG.date2;
            } else if (movType == '++') {
                date0 = $2d.add(date2, '+1months');
                date1 = ($2d.monthBE(date0)).date1;
                var date2 = $2d.add(date1, '+' + P.nMonths + 'months');
                date2 = ($2d.monthBE(date2)).date2;
            } else {
                date0 = $2d.add(date0, '-' + (P.nMonths) + 'months');
                date1 = ($2d.monthBE(date0)).date1;
                var date2 = $2d.add(date1, '+' + P.nMonths + 'months');
                date2 = ($2d.monthBE(date2)).date2;
            }
        }
        return {r: 'r', date1: date1, date2: date2};
    },
    addDate: function (date0, A, format) {//news jun 2021
        var datTe = date0.match(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})(\s|T)?([0-9]{2})?\:?\ ?([0-9]{2})?\:?\ ?([0-9]{2})?/i);
        if (datTe) {
            var h = (datTe[5]) ? datTe[5] : 0;//s
            var m = (datTe[6]) ? datTe[6] : 0;
            var s = (datTe[7]) ? datTe[7] : 0;
            var dateX = new Date(datTe[1], (datTe[2] * 1 - 1), datTe[3], h, m, s);
            if (A.m) {
                date0 = dateX.setMonth(dateX.getMonth() + A.m);
            } else if (A.d) {
                date0 = dateX.setDate(dateX.getDate() + A.d);
            } else if (A.q) { //quincenal
                dueDate = $2d.f(date0, format);
                var lastQ = dueDate.replace(/.*\-(\d+)$/, '$1') * 1;
                if (lastQ == 1) {
                    dueDate = dueDate.replace(/\-(\d+)$/, '-16');
                } else if (lastQ == 16) {
                    dueDate = $2d.addDate(dueDate, {m: 1});
                    dueDate = dueDate.replace(/\-(\d+)$/, '-01');
                }
                date0 = dueDate;
            }
        }
        return $2d.f(date0, format);
    },
    add: function (date0, strToTime, format) {
        var milSec = $2d.toTime(date0);
        var milSecA = (strToTime) ? milSec + $2d.toTime(strToTime) : milSec;
        return $2d.f(milSecA, format);
    },
    f: function (date, format, P) {//Obtener fecha con formato
        if (!date) {
            return '';
        }
        var P = (P) ? P : {};
        var nd = new Date();
        var ye = nd.getFullYear();
        var mo = nd.getMonth() + 1;
        mo = (mo < 10) ? '0' + mo : mo;
        var da = nd.getDate();
        da = (da < 10) ? '0' + da : da;
        var h = nd.getHours();
        h = (h < 10) ? '0' + h : h;
        var m = nd.getMinutes();
        m = (m < 10) ? '0' + m : m;
        var hoy = ye + '-' + mo + '-' + da;
        var day1 = 86400000;
        var hoyf = hoy + ' ' + h + ':' + m;
        if (date == 'today') {
            sec = $2d.toTime(hoy);
        } else if (date == 'todayHI') {
            sec = $2d.toTime(hoyf);
        } else if (date == 'tomorrow') {
            sec = $2d.toTime(hoy) + day1;
            ;
        } else if (('' + date).match(/^next[0-9]*/)) {
            sec = $2d.toTime(hoy) + (day1 * date.replace(/^next/, ''));
        } else {
            if (P.is0 != undefined && $2d.is0(date)) {
                return P.is0;
            }
            if (date && date != '' && date != ' ') {
                sec = $2d.toTime(date);
            } else {
                sec = Date.now();
            }
        }
        if (P.alert == 'Y') {
            alert(format + ' Date: ' + date + '=' + sec + ', Hoy: ' + hoy);
        }
        var d = new Date();
        d.setTime(sec);
        var year = d.getFullYear();
        var dayR = d.getDate();
        var day = (dayR < 10) ? '0' + dayR : dayR;
        var monthR = d.getMonth() + 1;
        month = (monthR < 10) ? '0' + monthR : monthR;
        var H = d.getHours();
        H = (H < 10) ? '0' + H : H;
        var i = d.getMinutes();
        i = (i < 10) ? '0' + i : i;
        var s = d.getSeconds();
        s = (s < 10) ? '0' + s : s;
        var ms = d.getMilliseconds();
        ms = (ms < 10) ? '0' + ms : ms;
        format = ($2d.fdef != '') ? $2d.fdef : format;
        if (format) {
            if (format == 'ms') {
                return sec;
            } else if (format == 'time') {
                return sec;
            }
            if (format == 's') {
                return sec / 1000;
            }
            var Ob = {
                Ymd: year + '-' + month + '-' + day,
                Y: year,
                m: month,
                mR: monthR - 1,
                d: day,
                H: H,
                i: i,
                s: s,
                ms: ms
            };
            Ob.j = dayR;
            Ob.w = d.getDay();
            Ob.l = $2d.dayW[Ob.w];
            Ob.D = (Ob.l + '').substr(0, 3);
            Ob.M = $2d.monW[monthR - 1];
            if (format == 'object') {
                return Ob;
            } else {
                return $2d._format(Ob, format, P);
            }
        } else {
            return year + '-' + month + '-' + day;
        }
    },
    validate: function (str, rev) {
        s1 = str.substr(0, 10).split('-');
        s2 = str.substr(11, 8).split(':');
        r = [s1[0], s1[1], s1[2], s2[0], s2[1], s2[2]];
        txt = false;
        if (rev == 'h:i') {
            h = s2[0];
            m = s2[1];
            if (h == undefined) {
                txt = 'Formato de hora incorrecto. Actual: ' + h;
            } else if (m == undefined) {
                txt = 'Formato de minutos incorrecto. Actual: ' + m;
            } else if (h < 0 || h > 23) {
                txt = 'La hora debe estar entre las 00 y las 23. Actual: ' + h;
            } else if (m < 0 || m > 59) {
                txt = 'Los minutos debe estar entre las 00 y los 59. Actual: ' + m;
            } else if (!h.match(/^(0[0-9]|1[0-9]|2[0-3])$/)) {
                txt = 'Formato de hora incorrecto. Actual: ' + h;
            } else if (!m.match(/^[0-5][0-9]$/)) {
                txt = 'Formato de minutos incorrecto. Actual: ' + m;
            }
        }
        r.err = txt;
        return r;
    },
    toTime: function (str) {
        if (!isNaN(str)) {
            return str;
        }
        var str = (str) ? str + ' ' : ' ';
        var datTe = str.match(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})(\s|T)?([0-9]{2})?\:?\ ?([0-9]{2})?\:?\ ?([0-9]{2})?/i);
        if (datTe) {
            var h = (datTe[5]) ? datTe[5] : 0;//s
            var m = (datTe[6]) ? datTe[6] : 0;
            var s = (datTe[7]) ? datTe[7] : 0;
            var milSec = new Date(datTe[1], (datTe[2] - 1), datTe[3], h, m, s);
            return milSec.getTime();
        } else {
            var str = (str) ? str : ' ';
            var sig = str.match(/^(\+|\-)/g);
            sig = (sig == '-') ? -1 : 1;
            var num = str.replace(/[^0-9\.]/g, '');
            var type0 = str.match(/(days|weeks|months|hours|minutes)/);
            type = (type0) ? type0[0] : '';
            var tim = 0;
            if (type == 'days') tim = 86400 * num;
            else if (type == 'weeks') tim = 86400 * 7 * num;
            else if (type == 'months') tim = 86400 * 30 * num;
            else if (type == 'minutes') tim = 60 * num;
            else if (type == 'hours') tim = 3600 * num;
            tim = sig * tim * 1000;
            return tim;

        }
    }
    ,
    is0: function (date) {
        var date = date + ' ';
        if (date == ' ') {
            return true;
        } else if (date.match(/^0000\-/)) {
            return true;
        } else if (!date.match(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})/)) {
            return true;
        }
        return false;
    }
    ,
    diff: function (D, f) {
        if (D.dueDate) {
            D.date2 = D.dueDate;
        }
        if (D.docDate) {
            D.date1 = D.docDate;
        }
        if (!D.date2) {
            D.date2 = $2d.today;
        }
        if ($2d.is0(D.date1) || $2d.is0(D.date2)) {
            return 0;
        }
        var minD = $2d.toTime(D.date1);
        var maxD = $2d.toTime(D.date2);
        var dif = maxD - minD;
        if (D.g == 'days{}') {
            var minD = $2d.toTime((D.date1).substr(0, 10));
            var maxD = $2d.toTime((D.date2).substr(0, 10));
            var dif2 = maxD - minD;
        }
        if (f && !D.g) {
            D.g = f;
        }
        switch (D.g) {
            case 'sec' :
                break;
            case 'min' :
                break;
            case 'days' :
                d = (dif / $2d.Vs.day1);
                break;
            case 'd' :
                d = (dif / $2d.Vs.day1);
                break;
            case 'days{}':
                d = (dif / $2d.Vs.day1);
                d2 = (dif2 / $2d.Vs.day1);
                d = {a: d, b: d2};
                break;
            default :
                d = (dif / $2d.Vs.day1) + 1;
                break;
        }
        if (D.round) {
            return Math.round(d);
        } else {
            return d;
        }
    }
    ,
//Auxiliar
    doY: function (dateAct1, yearDef) {
        if (dateAct1 == '') {
            return null;
        }
        var dateAct1 = $2d.toTime((dateAct1).replace(/([0-9]{4}\-[0-9]{2}\-[0-9]{2})/, '$1-'));
        var dateAct = (dateAct1) ? new Date(dateAct1) : new Date();
        var yearAct = dateAct.getTime();
        var year = (yearDef && yearDef != 'PHP') ? yearDef : dateAct.getFullYear();
        var yearIni = new Date(year, 0, 0).getTime();
        var dif = yearAct - yearIni;
        var dayYear = Math.ceil(dif / $2d.Vs.day1);
        if (yearDef == 'PHP') {
            return dayYear - 1;
        }
        return dayYear;
    }
    ,
    weekDay: function (dayDate) {
        var wDay = new Date(dayDate);//añadir 00:00
        return (wDay == 0) ? 6 : wDay - 1;
    },
    weekB: function (date) {
        var Dat = new Date();
        Dat.setTime($2d.toTime(date));
        var dayW = Dat.getDay();
        dayW = (dayW == 0) ? 7 : dayW;
        var ad = '-' + ((dayW - 1)) + 'days';
        return $2d.add(date, ad);
    },
    weekE: function (date) {
        var Dat = new Date();
        Dat.setTime($2d.toTime(date));
        var dayW = Dat.getDay();
        var ad = '+' + (7 - dayW - 0) + 'days';//-1 para fin semana sea sabado
        return $2d.add(date, ad);
    },
    weekBtw: function (date) {
        return {d1: $2d.weekB(date), d2: $2d.weekE(date)};
    }
    ,
    numWeek: function ($fecha, P) {
        var P = (P) ? P : {}
        $const = [2, 1, 7, 6, 5, 4, 3];
        var isN = (typeof ($fecha) == 'number');
        if (isN) {
            var d = new Date();
            d.setTime($fecha);
            var $dia = d.getDate();
            var $mes = d.getMonth();
            var $ano = d.getFullYear();
        } else {
            if ($fecha.match(/\//)) {
                $fecha = $fecha.replace(/\//g, "-", $fecha);
            }
            ;
            $fecha = $fecha.split("-");
            $dia = eval($fecha[2]);
            $mes = eval($fecha[1]);
            $ano = eval($fecha[0]);
        }
        if ($mes != 0) {
            $mes--;
        }
        ;
        if ($dia < 10) {
            $dia = '0' + $dia;
        }
        ;
        $dia_pri = new Date($ano, 0, 1);
        $dia_pri = $dayWeek = $dia_pri.getDay(); // dayWekk 1 January
        $dia_pri = eval($const[$dia_pri]); // Obtenemos el valor de la constante
        $tiempo0 = new Date($ano, 0, $dia_pri);//fecha inicial año
        //$dia = ($dia);
        // Sumamos el valor de la constante a la fecha ingresada para mantener
        // los lapsos de tiempo
        $tiempo1 = new Date($ano, $mes, $dia);
        $lapso = ($tiempo1 - $tiempo0);
        $semanas = Math.floor($lapso / 1000 / 60 / 60 / 24 / 7);
        semanaCalc = $semanas + 1;
        if ($dia_pri != 1) {
            $semanas++;
        }
        ;
        // Si el 1 de enero es lunes le sumamos 1 a la semana caso contrarios el
        // calculo nos daria 0 y nos presentaria la semana como semana 52 del
        // año anterior
        if ($semanas == 0) {
            $semanas = 52;
            $ano--;
        }
        ;
        // Establecemos que si el resultado de semanas es 0 lo cambie a 52 y
        // reste 1 al año esto funciona para todos los años en donde el 1 de
        // Enero no es Lunes
        if (P.get == '0-52') {
            return $semanas;
        }
        return semanaCalc; //31dic = 52, 1 ener = 0
    }
    ,
    relMove: function (date, X) {
        var Dat = new Date();
        X = (X) ? X : {};
        if (date && date != '' && date != ' ') {
            Dat.setTime($2d.toTime(date));
        }
        if (X.m) {
            var d1 = new Date(Dat.getFullYear(), Dat.getMonth() + X.m, 1);
        }
        d1 = $2d.f(d1.getTime(), 'Y-m-d');
        return d1;
    },
    monthBE: function (date) {
        var Dat = new Date();
        if (date && date != '' && date != ' ') {
            Dat.setTime($2d.toTime(date));
        }
        var d1 = new Date(Dat.getFullYear(), Dat.getMonth(), 1);
        var d2 = new Date(Dat.getFullYear(), Dat.getMonth() + 1, 0);
        d1 = $2d.f(d1.getTime(), 'Y-m-d');
        d2 = $2d.f(d2.getTime(), 'Y-m-d');
        return {date1: d1, date2: d2};
    },
    f2: function (date, format, P) {
        return $2d._format();
    },
    _format: function (date, format, P) {
        P = (P) ? P : {};
        var o = (typeof (date) == 'object') ? date : $2d.f(date, 'object');
        var t = new Date();
        Y = t.getFullYear();
        var ad = (o.Y != Y || P.writeYear) ? ', ' + o.Y + ' ' : '';
        var am = '';
        if (format && format.match(/am$/)) {
            var oHr = o.H * 1;
            var oH = (oHr > 12) ? oHr - 12 : oHr;
            oH = (oH == 0) ? 12 : oH;
            oH = (oH < 10) ? '0' + oH : oH;
            var am = (oHr > 12) ? 'pm' : 'am';
            am = (oHr == 12) ? 'pm' : am;
        }
        var m3 = ($2d.Vs.nMo[o.mR]).substring(0, 3) + '.';
        var y2 = (o.Y + '').substring(2);
        if (format.match(/^T\s/)) {
            var sep = (format.replace('T ', '')).split('');
            var tr = '';
            for (var x in sep) {
                if (o[sep[x]]) {
                    tr += o[sep[x]];
                } else {
                    tr += sep[x];
                }
            }
            return tr;
        } else if (format == 'Y-m-d') {
            return o.Y + '-' + o.m + '-' + o.d;
        } else if (format == 'Y-m-d H:i') {
            return o.Y + '-' + o.m + '-' + o.d + ' ' + o.H + ':' + o.i;
        } else if (format == 'Y--ms') {
            return o.Y + o.m + o.d + o.H + o.i + o.s + o.ms;
        } else if (format == 'H:i') {
            return o.H + ':' + o.i;
        } else if (format == 'H:iam') {
            return oH + ':' + o.i + ' ' + am;
            ;
        } else if (format == 'mmm d') {
            return m3 + ' ' + o.d + ad;
        } else if (format == 'd') {
            return o.d;
        } else if (format == 'D d M') {
            return o.D + ', ' + o.d + ' ' + o.M;
        } else if (format == 'd mmm') {
            return o.d + ' ' + m3 + ad;
        } else if (format == 'd-mmm-y2') {
            return o.d + '-' + m3 + '-' + y2;
        } else if (format == 'Y-m-d H:i') {
            return o.Y + '-' + o.m + '-' + o.d + ' ' + o.H + ':' + o.i;
        } else if (format == 'Y-m-d H:iam') {
            return o.Y + '-' + o.m + '-' + o.d + ' ' + oH + ':' + o.i + ' ' + am;
        } else if (format == 'timestamp') {
            return o.Y + '-' + o.m + '-' + o.d + ' ' + o.H + ':' + o.i + ':' + o.s;
        } else if (format == 'mmm') {
            return m3 + ad;
        } else if (format == 'mmm d H:i') {
            return m3 + ' ' + o.d + ', ' + o.H + ':' + o.i + ad;
        } else if (format == 'mmm d H:iam') {
            return m3 + ' ' + o.d + ', ' + oH + ':' + o.i + ' ' + am + ad;
            ;
        } else if (format == 'mes') {
            return ($2d.Vs.nMo[o.mR]) + ad;
        } else {
            return o.Y + '-' + o.m + '-' + o.d;
        }
    }
}

$2d.tdCalClick = null; /* funcion a exec dia calendario */
$2d.yesterday = $2d.f('next-1', 'Y-m-d');
$2d.last7 = $2d.f('next-7', 'Y-m-d');
$2d.today = $2d.f('today', 'Y-m-d');
$2d.todayHI = $2d.f('todayHI', 'Y-m-d H:i');
$2d.todayMs = $2d.f('', 'ms');
$2d.tomorrow = $2d.add($2d.today, '+1days', 'Y-m-d');
$2d.days7 = $2d.add($2d.today, '+7days', 'Y-m-d');
$2d.longDays = function (L, LiA) {
    var Lix = (LiA) ? LiA : [];
    L.kday = $2d.g('Y-z', L.doDate);
    if (L.doDate != L.endDate) {/*multiples dias */
        L.nextDay = 'Y'; /* → */
        L.hText = L.doDateAt.substring(0, 5) + ' → ';
        Lix.push(L);
        var diff = $2d.diff({date1: L.doDate, date2: L.endDate, round: 1});
        var n = 2;
        for (var i2 = 1; i2 < diff; i2++) {
            var Ld = $js.clone(L);
            var tDat = $2d.add(L.doDate, '+' + i2 + 'days');
            Ld.doDate = tDat;
            Ld.kday = $2d.g('Y-z', tDat);
            if (L.endDate == tDat) {
                Ld.doDateAt = '00:00';
                Ld.endDateAt = L.endDateAt;
                Ld.hText = '00:00 a ' + L.endDateAt.substring(0, 5);
            } else {
                Ld.doDateAt = '00:00';
                Ld.endDateAt = '23:59';
                Ld.allDay = 'Y';
                Ld.nextDay = 'Y';
                Ld.hText = 'Todo el dia';
            }
            Lix.push(Ld);
            if (L.endDate == tDat) {
                break;
            }
        }
    } else {
        L.hText = L.doDateAt.substring(0, 5) + ' a ' + L.endDateAt.substring(0, 5);
        Lix.push(L);
    }
    return Lix;
}

$2d.Draw = {
    Wd: function (P) {
        P = (P) ? P : {};
        var Days = $2d.Vs.Days;
        if (!P.date1) {
            var ra = $2d.goRang({rang: P.rang});
            P.date1 = ra.date1;
            P.date2 = ra.date2;
        }
        var mI = $2d.g('n', P.date1);
        var date1 = $2d.weekB(P.date1);
        var date2 = $2d.weekE(P.date2);
        var l = $2d.diff({date1: date1, date2: date2});//13=1semana
        var lastWY = '';
        var lastTk = '';
        var tdWeek = {};
        var Wd = {};
        var befW = 1;
        for (var d = 0; d < l + 1; d++) {
            var nd = $2d.add(date1, d + 'days');
            var wy = $2d.g('W', nd);
            var y = nd.substring(0, 4);
            var tk = y + '_' + wy;//wy
            if (l == 13 && lastTk != '' && lastTk != tk) {
                break;
            }
            var wd = $2d.g('w', nd);
            var z = $2d.g('z', nd);
            var n = $2d.g('n', nd);
            //if((wy== 1 && befW>1) || wy == 0){ wy = 53; }
            befW = wy;
            lastTk = tk;
            if (!Wd[tk]) {
                Wd[tk] = {wy: wy};
            }
            var yzId = y + '_' + z;//id para calc unico año_dia
            Wd[tk][wd] = {date: nd, z: z, n: n, wd: wd, y: y, yzId: yzId};
        }
        return Wd;
    }
}

var $Htm = {
    uLk: '__uniqLine_k_',
    uniqCls: function (k, ele) {
        if (ele.tagName) {
            ele.classList.add($Htm.uLk + k);
        }
    },
    uniqGet: function (k) {
        return $Htm.uLk + k;
    },
    uniqLine: function (k, pare, R) {/* revisión unica de linea, items */
        var kc = $Htm.uLk + k;
        if (kc && !kc.match(/^(\#|\.)/)) {
            kc = '.' + kc;
        }

        var l = $1.q(kc, pare);
        var R = (R) ? R : {};
        var err = 0;
        var r = false;
        if (l && l.tagName) {
            err = true;
        }
        if (err && R == 'ele') {
            return l;
        }
        if (err) {
            var elm = (R.cNode != undefined && l.childNodes && l.childNodes[R.cNode])
                ? ' (' + l.childNodes[R.cNode].innerText + ')'
                : ' (' + k + ')';
            if (R.text) {
                r = {errNo: 3, text: R.text};
            } else {
                r = {errNo: 3, text: 'Linea ya definida en el documento' + elm};
            }
        }
        if (r && R.win == 'Y') {
            $1.Win.message(r);
        }
        return r; /* false si todo ok */
    }
};

var $0s = {
    currency: '$',
    rate: 1,
    iniApp: function (func, P) {
        var P = (P) ? P : {};
        $js.getScript($y.apiURI + '/sys/0s?___ocardtooken=' + $0s.stor('ocardtooken'), {func: func});
    },
    stor: function (Pd) {
        var P = (typeof (Pd) == 'string') ? Pd : {};
        if (P.set) {
            localStorage.setItem(P.k, P.v);
        } else if (P.remove) {
            localStorage.removeItem(P.k);
        } else if (P.clear) {
            localStorage.clear();
        } else {
            return localStorage.getItem(Pd);
        }
    }
}

$0s.console = {
    put: function (t, type) {
        type = (type) ? type : '';
        if ($0s.consLogApi) {
            switch (type) {
                case 'error' :
                    console.error(t);
                    break;
                case 'api' :
                    console.log('* ' + t);
                    break;
                default :
                    console.log(t);
                    break;
            }
        }
    }
}
$0s.Report = {
    api: '/sys/report/',
    m: 1,
    get: function () {
        $Api.get({
            f: $0s.Report.api + 'byForm', inputs: '',
            func: function (Jq) {
                $0s.Report.list(Jq, null);
            }
        });
    },
    list: function (O, k, wrapList) {
        var cont = (wrapList) ? wrapList : $M.Ht.cont;
        if (O.errNo) {
            $Api.resp(cont, O);
            return true;
        }
        if (O.L) {
            O = O.L;
        }
        if (!wrapList && !cont.classList.contains('authsMain_v02')) {
            cont.classList.add('authsMain_v02');
        }
        var ul = $1.t('ul', {'class': 'ulBase'}, cont);
        var m = $0s.Report.m;
        $0s.Report.m++;
        if (k && O[k]) {
            O = O[k].opts;
        }
        for (var i in O) {
            var T = O[i];
            var li = $1.t('li', 0, ul);
            if (T.opts) {
                T.text = (T.text) ? T.text : i;//dpto
                li.classList.add('opts');
                var span = $1.t('div', {
                    textNode: T.text,
                    style: 'padding:0.25rem; margin-left:-0.375rem;',
                    'class': 'nextUl iBgBlock iBg_folderplus'
                });
                span.m = m;
                span.onclick = function () {
                    var ne = $1.q('.nextUl_m' + this.m, this.parentNode, 'all');
                    for (var c = 0; c < ne.length; c++) {
                        var tdisp = ne[c].style.display;
                        if (tdisp == 'block') {
                            this.classList.replace('iBg_folderminus', 'iBg_folderplus');
                            ne[c].style.display = 'none';
                        } else {
                            this.classList.replace('iBg_folderplus', 'iBg_folderminus');
                            ne[c].style.display = 'block';
                        }
                    }
                }
                li.appendChild(span);
                var wList = $1.t('div', {
                    'class': 'nextUl_m' + m,
                    style: 'display:none; borderLeft:1px dashed #FBE983'
                });
                $0s.Report.list(T.opts, false, wList);
                li.appendChild(wList);
            } else {
                li.appendChild($1.t('span', {
                    textNode: T.text + ' (' + T.reportId + ')',
                    'class': 'iBgBlock iBg_arrowGo',
                    title: 'Id :' + T.reportId
                }));
                li.T = T;
                li.onclick = function () {
                    if (this.T.type == 'data') {
                        $0s.DT.form(this.T)
                    } else {
                        $0s.Report.form(this.T);
                    }
                }
            }
        }
    },
    form3: function (D) {
        var wrap = $1.t('div');
        var wrapList = $1.t('div', 0, wrap);
        var n = 0;
        var GETq = $0s.Report.api + 'byForm.query';
        $Api.get({
            f: $0s.Report.api + 'byForm.form', inputs: 'reportId=' + D.reportId, loade: wrapList,
            func: function (Jqr) {
                //if(Jqr.type == 'req'){ GETq = '/sr/'+Jqr.qu; }
                if (Jqr.descrip != '') {
                    $1.t('div', {
                        'class': 'pre',
                        textNode: Jqr.descrip,
                        style: 'padding:0.25rem; border:0.0625rem solid #CCC;'
                    }, wrapList);
                }
                var Jq = Jqr.qwh;
                var nL = 0;
                var wFilt = $1.t('div', {id: '_sysReportFilt'});
                var wFilt = $1.T.fieldset(wFilt);
                wrapList.appendChild(wFilt);
                //filteros
                for (var i in Jq) {
                    var iL = Jq[i];
                    nL++;
                    var req = (iL.req == 'Y') ? 'Y' : false;
                    if (!iL.I) {
                        iL.I = {};
                    }
                    if (iL.lTag) {
                        iL.I.lTag = iL.lTag;
                    }
                    iL.I.name = 'FIE[' + n + '][' + iL.name + ']';
                    delete (iL.name, iL.lTag);
                    if (iL.I['class']) {
                        iL.I['class'] = 'jsFields ' + iL.I['class'];
                    } else {
                        iL.I['class'] = 'jsFields';
                    }
                    if (iL.divLine) {
                        var divLine = $1.T.divL(iL, wFilt);
                    } else {
                        $1.T.divL(iL, divLine);
                    }

                    n++;
                }
                var resp = $1.t('div', 0, wrap);
                $Api.send({
                    textNode: 'Generar Reporte', GET: GETq, getInputs: function () {
                        return 'reportId=' + D.reportId + '&' + $1.G.inputs(wrap);
                    }, loade: resp, func: function (Jq2) {
                        if (Jq2.errNo) {
                            $Api.resp(resp, Jq2);
                        } else {
                            var fileName = (Jq2.fileName) ? Jq2.fileName : 'Archivo de Reporte';
                            var Fmt = {};
                            var TDS = (Jq2.TDS) ? Jq2.TDS : {};
                            var TRS = (Jq2.TRS) ? Jq2.TRS : {};
                            var jsConf = Jq2.jsConf;
                            if (typeof (jsConf) != 'object') {
                                jsConf = {};
                            }
                            var tOpts = (jsConf && jsConf.Opts) ? jsConf.Opts : {};
                            /* sustituir textos si */
                            var textIs = (jsConf && jsConf.textIs) ? jsConf.textIs : {};
                            var tbFie = ['#'];
                            n = 0;
                            //definir encabezados
                            for (var f in Jq2.FIE) { /* docTotal_number=Total Doc. */
                                var tVal = Jq2.FIE[f];
                                var format = 'plain';
                                var fK = '';
                                var f2 = f;
                                var serieType = 'nulle';
                                if (f.match(/\_\$$/)) {
                                    format = '$';
                                    var f2 = f.replace(/\_\$$/, '');
                                } else if (f.match(/\_number$/)) {
                                    format = 'number';
                                    var f2 = f.replace(/\_number$/, '');
                                }
                                Jq2.FIE[f] = f2;
                                Fmt[f] = {k: f2, v: format, t: fK, fr: f};
                                var tbT = {textNode: f2};
                                if (jsConf && jsConf.FIEkv === 'Y') {
                                    tbT = {textNode: tVal};
                                }
                                tbFie.push(tbT);
                            }
                            var tb = $1.T.table(tbFie);
                            var tBody = $1.t('tbody', 0, tb);
                            var n = 1;
                            if (Jq2.kOrder && Jq2.FIE[Jq2.kOrder]) {
                                Jq2.L = $js.sortNum(Jq2.L, {k: Jq2.kOrder});
                            }
                            for (var e in Jq2.L) {
                                var Ld = Jq2.L[e];
                                var tr = $1.t('tr', 0, tBody);
                                $1.t('td', {textNode: n}, tr);
                                n++;
                                var tdn = 2;
                                var tdr = 1; //col real report
                                for (var f in Jq2.FIE) {
                                    var tF = Fmt[f];
                                    var te = (Ld[tF.fr]) ? Ld[tF.fr] : '';
                                    te = (Ld[tF.k]) ? Ld[tF.k] : te;
                                    if ((opts = tOpts['col' + tdr])) {
                                        opts = (typeof (opts) == 'string') ? eval(opts) : {};
                                        if (opts && opts[0] && opts[0].k) {
                                            te = _g(te, opts);
                                        } else {
                                            te = opts[te];
                                        }
                                    }
                                    if (textIs) {
                                        if (textIs['undefined'] && te == undefined) {
                                            te = textIs['undefined'];
                                        } else if (textIs['col' + tdr]) {
                                            te = textIs['col' + tdr];
                                        }
                                    }
                                    if (jsConf && jsConf.serieType && jsConf.serieType['col' + tdr]) {
                                        var td = $1.t('td', 0, tr);
                                        $Doc.href(jsConf.serieType['col' + tdr], {docEntry: te}, {
                                            pare: td,
                                            format: 'id'
                                        });
                                    } else {
                                        if (te != '' && tF.v != 'plain') {
                                            switch (tF.v) {
                                                case '$':
                                                    te = $Str.money(te);
                                                    break;
                                                case 'number':
                                                    te = te * 1;
                                                    break;
                                            }
                                        }
                                        var td = $1.t('td', {
                                            textNode: te,
                                            'class': tbSum.tbColNums,
                                            'tbColNum': tdn
                                        }, tr);
                                        ;
                                    }
                                    tdn++;
                                    tdr++;
                                }
                            }
                            var tbC = $1.t('div');
                            tbC.appendChild(tb);
                            tb = $1.T.tbExport(tb, {print: true, printWrap: tbC, fileName: fileName});
                            resp.appendChild(tb);
                            if ($Soc && $Soc.softFrom) {
                                $1.t('div', {
                                    textNode: $Soc.softFrom,
                                    style: 'font-size:0.75rem; padding:1rem 0;'
                                }, tbC);
                            }
                        }
                    }
                }, wrap);
            }
        });
        $1.Win.open(wrap, {winTitle: D.text, onBody: true, winId: 'reportWinSys'});
    },
    form: function (D) {
        if (D.repVers == 2) {
            $Report.form(D);
            return true;
        }
        if (D.repVers == 3) {
            $0s.Report.form3(D);
            return true;
        }
        var wrap = $1.t('div');
        var wrapList = $1.t('div', 0, wrap);
        var n = 0;
        var GETq = $0s.Report.api + 'byForm.query';
        $Api.get({
            f: $0s.Report.api + 'byForm.form', inputs: 'reportId=' + D.reportId, loade: wrapList,
            func: function (Jqr) {
                if (Jqr.type == 'req') {
                    GETq = '/sr/' + Jqr.qu;
                }
                if (Jqr.descrip != '') {
                    $1.t('div', {
                        'class': 'pre',
                        textNode: Jqr.descrip,
                        style: 'padding:0.25rem; border:0.0625rem solid #CCC;'
                    }, wrapList);
                }
                var Jq = Jqr.qwh;
                var nL = 0;
                var wFilt = $1.t('div', {id: '_sysReportFilt'});
                var wFilt = $1.T.fieldset(wFilt);
                wrapList.appendChild(wFilt);
                for (var i in Jq) {//draq form
                    var iL = Jq[i];
                    var divLineT = (lastType == iL.type && lastType == 'date' && nL % 3 != 0) ? true : false;
                    divLineT = (iL.wxn && !iL.br) ? true : divLineT;
                    var wxn = (Jq[i].type == 'date' || Jq[i].wxn) ? 'wrapxauto' : 'wrapx1';
                    wxn = (Jq[i].wxn && Jq[i].wxn != '') ? Jq[i].wxn : wxn;
                    wxn2 = (Jq[i].wxn && Jq[i].wxn != '') ? Jq[i].wxn : wxn;
                    var placeholder = (Jq[i].placeholder) ? Jq[i].placeholder : '';
                    nL++;
                    var tConf = {};
                    var req = (iL.req == 'Y') ? 'Y' : false;
                    if (iL.type == 'select') {
                        var opts = iL.opts;
                        opts = (typeof (opts) == 'string') ? eval(opts) : opts;
                        tConf = {
                            wxn: wxn2,
                            req: req,
                            L: {textNode: iL.text},
                            I: {
                                tag: 'select',
                                'class': 'jsFields',
                                name: 'FIE[' + n + '][' + iL.name + ']',
                                opts: opts,
                                noBlank: iL.noBlank,
                                selected: iL.value
                            }
                        };
                    } else {
                        tConf = {
                            wxn: wxn2,
                            req: req,
                            L: Jq[i].text,
                            I: {
                                tag: 'input',
                                type: Jq[i].type,
                                'class': 'jsFields',
                                name: 'FIE[' + n + '][' + Jq[i].name + ']',
                                placeholder: placeholder,
                                value: iL.value
                            }
                        };
                    }
                    if (divLine && divLineT) {
                        divLine.appendChild($1.T.divLinewx(tConf));
                    } else {
                        tConf.divLine = true;
                        var divLine = $1.T.divLinewx(tConf);
                    }
                    if (divLine || !divLineT) {
                        wFilt.appendChild(divLine);
                    }
                    n++;
                    var lastType = Jq[i].type;
                }
                var resp = $1.t('div');
                var iSend = $1.T.btnSend({textNode: 'Generar Reporte'}, {
                    f: GETq, getInputs: function () {
                        return 'reportId=' + D.reportId + '&' + $1.G.inputs(wrap);
                    }, loade: resp, func: function (Jq2) {
                        if (Jq2.errNo) {
                            $Api.resp(resp, Jq2);
                        } else {
                            var fileName = (Jq2.fileName) ? Jq2.fileName : 'Archivo de Reporte';
                            var Fmt = {};
                            var TDS = (Jq2.TDS) ? Jq2.TDS : {};
                            var TRS = (Jq2.TRS) ? Jq2.TRS : {};
                            var jsConf = Jq2.jsConf;
                            if (typeof (jsConf) != 'object') {
                                jsConf = {};
                            }
                            var tOpts = (jsConf && jsConf.Opts) ? jsConf.Opts : {};
                            /* sustituir textos si */
                            var textIs = (jsConf && jsConf.textIs) ? jsConf.textIs : {};
                            var tbFie = [];
                            n = 0;
                            for (var f in Jq2.FIE) { /* docTotal_number=Total Doc. */
                                var tVal = Jq2.FIE[f];
                                var format = 'plain';
                                var fK = '';
                                var f2 = f;
                                var serieType = 'nulle';
                                if (f.match(/\_\$$/)) {
                                    format = '$';
                                    var f2 = f.replace(/\_\$$/, '');
                                } else if (f.match(/\_number$/)) {
                                    format = 'number';
                                    var f2 = f.replace(/\_number$/, '');
                                }
                                Jq2.FIE[f] = f2;
                                Fmt[f] = {k: f2, v: format, t: fK, fr: f};
                                var tbT = {textNode: f2};
                                if (jsConf && jsConf.FIEkv === 'Y') {
                                    tbT = {textNode: tVal};
                                }
                                tbFie.push(tbT);
                            }
                            var tb = $1.T.table(tbFie);
                            var tr0 = $1.q('thead tr', tb);
                            tr0.insertBefore($1.t('td', '#'), tr0.childNodes[0]);
                            var tBody = $1.t('tbody');
                            var n = 1;
                            if (Jq2.kOrder && Jq2.FIE[Jq2.kOrder]) {
                                Jq2.L = $js.sortNum(Jq2.L, {k: Jq2.kOrder});
                            }
                            for (var e in Jq2.L) {
                                var Ld = Jq2.L[e];
                                var tr = $1.t('tr');
                                tr.appendChild($1.t('td', n));
                                n++;
                                var tdn = 2;
                                var tdr = 1; //col real report
                                for (var f in Jq2.FIE) {
                                    var tF = Fmt[f];
                                    var te = (Ld[tF.fr]) ? Ld[tF.fr] : '';
                                    te = (Ld[tF.k]) ? Ld[tF.k] : te;
                                    if ((opts = tOpts['col' + tdr])) {
                                        opts = (typeof (opts) == 'string') ? eval(opts) : {};
                                        if (opts && opts[0] && opts[0].k) {
                                            te = _g(te, opts);
                                        } else {
                                            te = opts[te];
                                        }
                                    }
                                    if (textIs) {
                                        if (textIs['undefined'] && te == undefined) {
                                            te = textIs['undefined'];
                                        } else if (textIs['col' + tdr]) {
                                            te = textIs['col' + tdr];
                                        }
                                    }
                                    if (jsConf && jsConf.serieType && jsConf.serieType['col' + tdr]) {
                                        var td = $1.t('td', 0, tr);
                                        $Doc.href(jsConf.serieType['col' + tdr], {docEntry: te}, {
                                            pare: td,
                                            format: 'id'
                                        });
                                    } else {
                                        if (te != '' && tF.v != 'plain') {
                                            switch (tF.v) {
                                                case '$':
                                                    te = $Str.money(te);
                                                    break;
                                                case 'number':
                                                    te = te * 1;
                                                    break;
                                            }
                                        }
                                        var td = $1.t('td', {
                                            textNode: te,
                                            'class': tbSum.tbColNums,
                                            'tbColNum': tdn
                                        }, tr);
                                        ;
                                    }
                                    tdn++;
                                    tdr++;
                                }
                                tBody.appendChild(tr);
                            }
                            tb.appendChild(tBody);
                            var tbC = $1.t('div');
                            tbC.appendChild(tb);
                            tb = $1.T.tbExport(tb, {print: true, printWrap: tbC, fileName: fileName});
                            resp.appendChild(tb);
                            if ($Soc && $Soc.softFrom) {
                                $1.t('div', {
                                    textNode: $Soc.softFrom,
                                    style: 'font-size:0.75rem; padding:1rem 0;'
                                }, tbC);
                            }
                        }
                    }
                });
                wrap.appendChild(iSend);
                wrap.appendChild(resp);
            }
        });
        $1.Win.open(wrap, {winTitle: D.text, onBody: true, winId: 'reportWinSys'});
    }
}

var $2dW = {
    btn: function (P, pare, P3) {
        var P = (P) ? P : {};
        var def = (!$js.isNull(P.defValue)) ? P.defValue : $2d.today;
        var date = (P.value && P.value != '') ? P.value : def;
        P.value = date;
        var wDiv = (P.wDiv) ? 'width:' + P.wDiv : '';
        var div = $1.t('div', {style: 'display:inline-block; position:relative;' + wDiv}, pare);
        if (P.divBlock) {
            div.style.display = 'block';
        }
        var tf = (P.f) ? P.f : 'd mmm';
        var Pb = {func: P.func, f: tf, value: P.value};
        var val = $2d.f(date, tf, {is0: ''});
        var I = {'class': 'boxi1 nowrap __btnDateText fa fa_calendar', textNode: val, style: ''};
        switch (tf) {
            case 'd':
                P.w = '2.4';
                break;
        }
        I.style = (P.w) ? 'width:' + P.w + 'rem;' : 'width:4rem;';
        I.style = (P.wDiv) ? 'width:99%;' : I.style;
        if (P.I) {
            for (var i in P.I) {
                I[i] = P.I[i];
            }
        }
        btn = $1.t('button', I, div);
        P.type = 'hidden';
        P.value = P.value;
        inp = $1.t('input', P, div);
        btn.i = {Pb: Pb, P3: P3, inp: inp};
        btn.onclick = function () {
            var btn = this.i;
            //if(!pare){ pare=this.parentNode; }
            pare = this.parentNode;
            btn.Pb.value = btn.inp.value;
            var exi = $1.q('.admsCalendarSimple', pare);
            if (exi) {
                $1.delet(exi);
            } else {
                $2dW.open(btn.Pb, pare, btn.P3);
            }
        }
        delete (P.func);
        var c = $1.t('button', {
            'class': 'iBg iBg_closeSmall',
            title: 'Borrar Fecha (2)',
            style: 'position:absolute; right:-0.75rem; top:-0.5rem;',
            tabindex: -1
        }, div);
        c.i = {Pb: Pb, P3: P3};
        c.onclick = function () {
            var c = this.i;
            var tinp = $1.q('input', this.parentNode);
            tinp.value = '';
            var tBtn = $1.q('.__btnDateText', this.parentNode);
            tBtn.innerText = '';
            if (c.Pb.func) {
                c.Pb.func({d: ''});
            }
            //this.blur();
        }
        return div;
    },
    open: function (P2, pare, P3) {
        var P2 = (P2) ? P2 : {};
        var P3 = (P3) ? P3 : {};
        if (P3.time) {
            P2.time = P3.time;
        }
        var formatt = (P2.f) ? P2.f : 'Y-m-d';
        var tBtn = $1.q('.__btnDateText', pare);
        var inp = $1.q('input', pare);
        var tf = (P2.f) ? P2.f : 'mmm d';
        var fya = $2d.f('today', 'Y-m-d H:i');
        P2.value = (P2.value) ? P2.value : fya;
        var tD = {date: P2.value.substr(0, 10), h: P2.value.substr(11, 2), m: P2.value.substr(14, 2)};
        if (tD.h == '') {
            tD.h = '00';
        }
        if (tD.m == '') {
            tD.m = '00';
        }
        var oldPosit = '';
        $1.delet($1.q('.admsCalendarSimple', pare));
        var month = (P2.value) ? P2.value : $2d.today;
        var wrap = $1.t('div', {
            style: 'position:absolute; top:100%; left:0; background-color:#FFF; padding:6px; border:2px solid #CCC; z-index:1; min-width:180px;',
            'class': 'admsCalendarSimple'
        }, pare);
        var iClose = $1.t('input', {
            type: 'button',
            'class': 'iBg iBg_closeSmall',
            style: 'position:relative; right:-8px; top:-8px; float:right;'
        }, wrap);
        iClose.onclick = function () {
            $1.delet(wrap);
        }
        var tDate = $2d.f(month, 'Y-m-d');
        var top = $1.t('div', 0, wrap);
        var goToday = $1.t('button', {'class': 'iBg iBg_sun'}, top);
        goToday.onclick = function () {
            if (P2.time) {
                var bda = $2d.f('today', formatt);
            } else {
                var bda = $2d.f('today', formatt);
            }
            $1.delet(wrap);
            tBtn.innerText = $2d.f('today', tf);
            inp.value = (P2.time) ? $2d.f('today', 'Y-m-d H:i') : $2d.f('today', 'Y-m-d');
            if (P2.func) {
                P2.func({d: bda});
            }
        };
        var a = $1.t('button', {'class': 'iBg iBg_arrowMinUp'}, top);
        a.onclick = function () {
            var bDate = $2d.add(tText.date, '-1months');
            $2dW.draW(P2, wCont, {month: bDate});
            tText.date = bDate;
            tText.innerText = $2d.f(bDate, 'mes');
        }
        var b = $1.t('button', {'class': 'iBg iBg_arrowMinDown'}, top);
        b.onclick = function () {
            var bDate = $2d.add(tText.date, '+1months');
            $2dW.draW(P2, wCont, {month: bDate});
            tText.date = bDate;
            tText.innerText = $2d.f(bDate, 'mes');
        }
        var tText = $1.t('div', {'class': 'spanLine', textNode: $2d.f(month, 'mes'), style: 'font-size:12px;'}, top);
        tText.date = tDate;
        var P2d = {month: month};
        var wCont = $1.t('div', 0, wrap);
        /* definir time */
        if (P2.time) {
            tHours = [];
            for (var i9 = 0; i9 <= 23; i9++) {
                tHours.push({k: ('x0' + i9).substr(-2), v: i9});
            }
            tMins = [];
            for (var i9 = 0; i9 <= 59; i9++) {
                tMins.push({k: ('x0' + i9).substr(-2), v: i9});
            }
            var p = $1.t('p', 0, wrap);
            var inpTdate = $1.t('input', {type: 'hidden', 'class': '_2dW_timeDate', value: tD.date}, p);
            var ho = $1.t('div', {style: 'display:inline-table; font-size:0.75rem;'}, p);
            //var inph=$1.t('input',{type:'text','class':'_2dW_timeHour',style:'font-size:0.8rem; border:none; width:2.6rem;',value:('x0'+tD.h).substr(-2)},ho);
            var inph = $1.lTag({
                tag: 'select',
                'class': '_2dW_timeHour',
                style: 'font-size:0.8rem; width:4rem;',
                opts: tHours,
                value: ('x0' + tD.h).substr(-2)
            }, ho);
            $1.t('div', {textNode: 'Hora'}, ho);
            $1.t('b', {textNode: ':'}, p);
            var mi = $1.t('div', {style: 'display:inline-table; font-size:0.75rem;'}, p);
            var inpm = $1.lTag({
                tag: 'select',
                'class': '_2dW_timeMinute',
                style: 'font-size:0.8rem;  width:4rem;',
                opts: tMins,
                value: ('x0' + tD.m).substr(-2)
            }, mi);
            inph.onkeyup = function () {
                this.value = $2dW.defH(this.value);
            }
            inpm.onkeyup = function () {
                this.value = $2dW.defM(this.value);
            }
            $1.t('div', {textNode: 'Minuto'}, mi);
            $1.T.btnFa({
                fa: 'fa_history', textNode: ' Definir', func: function () {
                    inp.value = $2dW.getDate(inpTdate, pare);
                    if (_err.$err) {
                        $1.Win.message(_err.$err);
                    } else {
                        if (P2.func) {
                            P2.func({d: inp.value});
                        }
                        tBtn.innerText = $2d.f(inp.value, tf);
                        $1.delet(wCont.parentNode);
                    }
                }
            }, p);
            P2d.time = 'Y';
        }
        $2dW.draW(P2, wCont, P2d);
        pare.style.position = 'relative';
        return wrap;
    },
    draW: function (P, wCont, P2) {
        var wrapCal = wCont.parentNode.parentNode;
        var P2 = (P2) ? P2 : {};
        var tBtn = $1.q('.__btnDateText', wrapCal);
        var inp = $1.q('input', wrapCal);
        var tf = (P.f) ? P.f : 'd mmm';
        var ymd = inp.value.substr(0, 10);
        var month = (P2.month) ? P2.month : ymd;
        $1.clear(wCont);
        var today = $2d.today;
        var monD = $2d.monthBE(month);
        var tb = $1.t('table', {'class': 'tbCal_min'}, wCont);
        var tHead = $1.t('thead', 0, tb);
        var tr0 = $1.t('tr', 0, tHead);
        for (var wD in $2d.daysW) {
            $1.t('td', {textNode: $2d.daysW[wD]}, tr0);
        }
        var week1 = $2d.numWeek(monD.date1);
        var week2 = $2d.numWeek(monD.date2);
        var mDays = $2d.diff({date2: monD.date2, date1: monD.date1});
        var tBody = $1.t('tbody', 0, tb);
        for (var w = week1; w <= week2; w++) {
            var trL = $1.t('tr', 0, tBody);
            for (var d = 1; d <= 7; d++) {
                $1.t('td', {textNode: ' '}, trL);
            }
        }
        var tdToday = {};
        for (var d = 1; d <= mDays; d++) {
            if (d == 1) {
                var sem = 0;
            }
            var dayDate = $2d.add(monD.date1, '+' + (d - 1) + 'days');
            var dayTim = new Date(dayDate + ' 00:00'); //sino da 28 febre el 1 marzo
            var wDay = dayTim.getDay();
            var trN = (wDay == 0) ? 6 : wDay - 1;
            var dayN = dayTim.getDate();
            var tdN = tBody.childNodes[sem].childNodes[trN];
            var sel = '#2F97FA';
            var cssTo = '';
            if (today == dayDate) {
                cssTo = 'red';
                tdToday = tdN;
            }
            var cssTo = (dayDate == ymd) ? sel : cssTo;
            $1.clear(tdN);
            tdN.appendChild($1.t('textNode', dayN));
            tdN.Ymd = dayDate;
            tdN.style.backgroundColor = cssTo;
            tdN.onclick = function () {
                if (P.time) {
                    reCol();
                    var inpTdate = $1.q('._2dW_timeDate', wrapCal);
                    this.style.backgroundColor = sel;
                    inpTdate.value = this.Ymd;
                    inp.value = $2dW.getDate(inpTdate, wrapCal);
                } else {
                    tBtn.innerText = $2d.f(this.Ymd, tf);
                    inp.value = this.Ymd;
                    if (P.func) {
                        P.func({d: this.Ymd});
                    }
                    $1.delet(wCont.parentNode);
                }
            }
            if (wDay == 0) {
                sem++;
            }
            ;
        }

        function reCol() {
            var tds = $1.q('td', tBody, 'all');
            for (var r = 0; r < tds.length; r++) {
                tds[r].style.backgroundColor = '';
                if (tds[r] == tdToday) {
                    tds[r].style.backgroundColor = 'red';
                }
            }
        }
    },
    getDate: function (date, wrap) {
        var date = (date) ? date : $1.q('._2dW_timeDate', wrap);
        var h = $1.q('._2dW_timeHour', wrap).value;
        var m = $1.q('._2dW_timeMinute', wrap).value;
        if (date.value) {
            date = date.value;
        }
        txt = date + ' ' + h + ':' + m;
        isVal = $2d.validate(txt, 'h:i');
        _err.err(isVal.err, isVal.err);
        return date + ' ' + h + ':' + m;
    },
    defH: function (num) {
        var nt = '' + num;
        var num = num * 1;
        if (nt == '') {
            return '';
        }
        ;
        if (num > 23) {
            num = 23;
        } else if (num < 0) {
            num = 0;
        }
        ;
        if (num < 10) {
            num = '0' + num;
        }
        if (nt.length > 2) {
            return (num + '').substr(-2);
        }
        return num;
    },
    defM: function (num) {
        var num = num * 1;
        if (num > 59) {
            num = 59;
        } else if (num < 0) {
            num = 0;
        } else if (num < 10) {
            num = '0' + num;
        }
        if (num.length > 2) {
            return (num + '').substr(-2);
        }
        return num;
    }
}

var ADMS_Calendar = {
    VARS: {
        weekDaysSh: {'1': 'Lun', '2': 'Mar', '3': 'Mie', '4': 'Jue', '5': 'Vie', '6': 'Sáb', '7': 'Dom'}
    },
    Simple: {
        opeN: function (objTarget, P2) {
            var P2 = (P2) ? P2 : {};
            var Th = objTarget.parentNode;//span->input
            var pare = objTarget.parentNode;
            var oldPosit = '';
            $1.delet($1.q('.admsCalendarSimple', pare));
            var month = (objTarget.value != '') ? objTarget.value : $2d.today;
            var wrap = $1.t('div', {
                style: 'position:absolute; top:100%; left:0; background-color:#FFF; padding:6px; border:2px solid #CCC; z-index:1; min-width:180px;',
                'class': 'admsCalendarSimple'
            }, pare);
            var iClose = $1.t('input', {
                type: 'button',
                'class': 'iBg iBg_closeSmall',
                style: 'position:relative; right:-8px; top:-8px; float:right;'
            }, wrap);
            iClose.onclick = function () {
                $1.delet(wrap);
            }
            var tDate = $2d.f(month, 'Y-m-d');
            var top = $1.t('div', 0, wrap);
            var goToday = $1.t('button', {'class': 'iBg iBg_sun'}, top);
            goToday.onclick = function () {
                objTarget.value = $2d.f('today', 'Y-m-d');
                $1.delet(wrap);
                if (objTarget.tdClick) {
                    objTarget.tdClick(objTarget);
                }
                if (P2.func) {
                    P2.func({d: objTarget.value, inp: objTarget});
                }
            };
            var a = $1.t('button', {'class': 'iBg iBg_arrowMinUp 2dBef'}, top);
            a.onclick = function () {
                var bDate = $2d.relMove(tText.date, {m: -1});
                ADMS_Calendar.Simple.draW(wCont, objTarget, {month: bDate}, P2);
                tText.date = bDate;
                tText.innerText = $2d.f(bDate, 'mes');
            }
            var b = $1.t('button', {'class': 'iBg iBg_arrowMinDown 2dNext'}, top);
            b.onclick = function () {
                var bDate = $2d.relMove(tText.date, {m: 1});
                ADMS_Calendar.Simple.draW(wCont, objTarget, {month: bDate}, P2);
                tText.date = bDate;
                tText.innerText = $2d.f(bDate, 'mes');
            }
            var tText = $1.t('div', {
                'class': 'spanLine',
                textNode: $2d.f(month, 'mes'),
                style: 'font-size:12px;'
            }, top);
            tText.date = tDate;
            var wCont = $1.t('div', 0, wrap);
            ADMS_Calendar.Simple.draW(wCont, objTarget, {month: month}, P2);
            pare.style.position = 'relative';
            return wrap;
        }
        ,
        draW: function (wCont, objTarget, P, P2) {
            P = (P) ? P : {};
            P2 = (P2) ? P2 : {};
            var pare = objTarget.parentNode;
            var HH = objTarget.HH;
            var tdClick = objTarget.tdClick;
            var Th = objTarget;
            var ymd = Th.value.substr(0, 10);
            var month = (P.month) ? P.month : new Date();
            $1.clear(wCont);
            var today = $2d.today;
            var monD = $2d.monthBE(month);
            var tb = $1.t('table', {'class': 'tbCal_min'}, wCont);
            var tHead = $1.t('thead', 0, tb);
            var tr0 = $1.t('tr', 0, tHead);
            for (var wD in ADMS_Calendar.VARS.weekDaysSh) {
                $1.t('td', {textNode: ADMS_Calendar.VARS.weekDaysSh[wD]}, tr0);
            }
            var diaIni = $2d.weekB(monD.date1);
            var diaFin = $2d.weekE(monD.date2);
            var week1 = $2d.numWeek(diaIni);
            var daysDiff = $2d.diff({date1: diaIni, date2: diaFin});
            var week2 = week1 + Math.round(daysDiff / 7);
            mesAct = monD.date1.substr(5, 2);
            var tBody = $1.t('tbody', 0, tb);
            var numD = 0;
            for (var w = week1; w <= week2; w++) {
                var trL = $1.t('tr', {_2dweek: w}, tBody);
                if (w == week1) {
                    trL.setAttribute('_2dBegin', diaIni);
                }
                for (var d = 1; d <= 7; d++) {
                    var dayDate = $2d.add(diaIni, '+' + numD + 'days');
                    numD++;
                    var dayTim = new Date(dayDate + ' 00:00'); //sino da 4 marzo el 3 marzo
                    var wDay = $2d.weekDay(dayDate + ' 00:00');
                    var dayN = dayTim.getDate();
                    mesDraw = dayDate.substr(5, 2);
                    var cssTo = (today == dayDate) ? 'red' : '';
                    var cssTo = (dayDate == ymd) ? '#2F97FA' : cssTo;

                    var tdN = $1.t('td', {textNode: dayN}, trL);
                    tdN.style.backgroundColor = cssTo;
                    if (mesAct != mesDraw) {
                        tdN.style.color = '#BBB';
                    }
                    if (w == week2 && d == 7) {
                        trL.setAttribute('_2dEnd', diaFin);
                    }
                    tdN.Ymd = dayDate;
                    tdN.tdClick = tdClick;
                    tdN.onclick = function () {
                        if (Th.value != this.Ymd && this.tdClick) {
                            Th.value = this.Ymd;
                            this.tdClick(Th);
                        }
                        Th.value = this.Ymd;
                        if (hour) {
                            hour.Ymd = this.Ymd;
                        }
                        if (HH && HH.value != '') {
                            Th.value += ' ' + HH.value;
                        }
                        if (!HH) {
                            $1.delet(wCont.parentNode);
                        }
                        if (P2.func) {
                            P2.func({d: this.Ymd, inp: Th});
                        }
                    }

                }
            }
            var lastDate = monD.date1;
            if (HH) {
                HH.value = (HH.value) ? HH.value : Th.value.substr(11, 5);
                var ho = $1.t('div', {style: 'margin:0.5rem 0;'});
                wCont.appendChild(ho);
                var hour = $1.t('input', {type: 'text', placeholder: 'hh:mm', value: HH.value, style: 'width:4rem;'});
                ho.appendChild(hour);
                hour.Ymd = ymd; //definir para ecita undedf
                var btn = $1.t('button', {textNode: 'Usar'}, ho);
                btn.onclick = function () {
                    var te = (hour.value != '') ? hour.Ymd + ' ' + hour.value : hour.Ymd;
                    if (te) {
                        objTarget.value = te;
                        $1.delet(wCont.parentNode);
                    }
                }

            }
        }
    }
}

$Sea = {
    api: '/api/sea/',
    clsName: '_inputSeaFie',
    clsNameInp: '_inputSeaFie _inputSeaFie_',
    addInputs: '',//definirlo para enviar adicional a &text=search
    input: function (wPare, P) {
        P = (P) ? P : {};
        /* {fPars:{} } parametros para funcion click */
        var vPo = (P.vPost && typeof (P.vPost) == 'object') ? true : false;
        var inputs = (P.inputs) ? '&' + P.inputs : '';
        var sepApi = (P.api) ? P.api.split('.') : null;
        api = (sepApi && sepApi[1]) ? sepApi[0] : P.api;
        var wrap = $1.t('div', {style: 'position:relative;', 'class': 'divLines'}, wPare);
        if (P.divClass) {
            wrap.classList.add(P.divClass);
        }
        if (P.subText) {
            $1.t('div', {textNode: P.subText, style: 'font-size:0.9rem; padding:0.25rem;'}, wrap);
        }
        if (!P.placeholder) {
            switch (api) {
                case 'itemPict':
                    P.placeholder = 'Buscar por código o nombre...';
                    break;
                case 'itm_owhs':
                    P.placeholder = 'Buscar por ID o nombre...';
                    break;
                case 'ocrd':
                    P.placeholder = 'Buscar por nombre o código..';
                    break;
            }
        }
        if (!P.placeholder) {
            P.placeholder = 'Digite 3 caracteres...';
        }
        var clear = $1.t('button', {
            'class': 'iBg iBg_closeSmall',
            style: 'position:absolute; bottom:0.25rem; right:0.25rem;',
            tabindex: '-1'
        }, wrap);
        clear.onclick = function () {
            $1.clearInps(wrap);
            wrap.style.zIndex = '';
            if (P.vPost) {
                inp.O.vPost = '';
            }
            if (P.inpVPost) {
                P.inpVPost.O = {};
            }//reset
            inp.vS = {};
        }
        var Ida = {
            type: 'text',
            name: 'textSearch',
            'class': 'iBg iBg_search2 ' + P['class'],
            placeholder: P.placeholder,
            k: ((P.k) ? P.k : null),
            style: 'width:99.5%;'
        };
        if (P.req) {
            Ida['datareq'] = P.req;
        }
        if (P.classKey) {
            Ida['class'] += ' ' + P.classKey;
        }
        var inp = $1.t('input', Ida, wrap);
        inp.pare = wPare;
        if (!inp.O) {
            inp.O = {vPost: ''};
        }
        if (P.vS) {
            inp.vS = P.vS;
        }
        if (P.vPost) {
            if (vPo) {
                for (var i in P.vPost) {
                    inp.O.vPost += i + '=' + encodeURIComponent(P.vPost[i]) + '&';
                }
            } else {
                inp.O = {vPost: P.vPost};
            }
        }
        if (P.defLineText) {
            inp.value = P.defLineText;
        }
        var intv = false;
        var tApi = $Sea.api + P.api;//itemPict,wareHouse
        inp.onkeypress = function () {
            clearTimeout(intv);
        };
        inp.onblur = function () {
            setTimeout(function () {
                wrap.style.zIndex = '';
            }, 300);
        };
        inp.onkeyup = function () {
            val = this.value;
            clearTimeout(intv);
            wrap.style.zIndex = 1;
            if (val.length == 0) {
                this.value = '';
                this.O = {};
            }
            if (val.length < 3) {
                return true;
            }
            intv = setTimeout(function () {
                if (P.funcAddInputs) {//obtener dinamicamente por ejemplo ___ocardId
                    inputs += '&' + P.funcAddInputs();
                }
                $Api.get({
                    f: tApi,
                    inputs: 'text=' + encodeURIComponent(val) + '&' + inputs + '&' + $Sea.addInputs,
                    func: function (Jq) {
                        switch (P.api) {
                            case 'itemPict':
                                $Sea.itemPict(Jq, P, wList, inp, wrap);
                                break;
                            default:
                                $Sea.simple(Jq, P, wList, inp, wrap);
                                break;
                        }
                    }
                });
            }, 900);
        }
        var wList = $1.t('div', {style: 'position:absolute; border:0.0625rem solid #000; padding:0.25rem; display:none; width:98%; backgroundColor:#FFF;'}, wrap);
        return wrap;
    },
    replaceData: function (JqL, pare) {
        var cs = $1.q('.' + $Sea.clsName, pare, 'all');
        for (var i = 0; i < cs.length; i++) {
            var t = cs[i];
            var k = t.getAttribute('k'); //_s _s_itemName
            var tag = (t.tagName).toLowerCase();
            var val = valt = JqL[k];
            if (!JqL[k]) {
                continue;
            }
            switch (t.getAttribute('kformat')) {
                case 'money' :
                    valt = $Str.money(val);
                    break;
            }
            if (k && tag == 'input') {
                t.value = valt;
            } else if (k && tag == 'select') {
                var opts = $1.q('option', t);
                var is = 0;
                for (var i2 = 0; i2 < opts.length; i2++) {
                    opts[i2].removeAttribute('selected');
                    if (opts[i2].value == valt) {
                        opts[i2].setAttribute('selected', 'selected');
                        is = 1;
                    }
                }
                t.value = valt;
            } else if (k) {
                t.innerText = valt;
            }
        }
    },
    simple: function (Jq, P, wList, inp, wrap) {
        $1.clear(wList);
        wList.style.display = 'block';
        var resp = $1.t('div', 0, wList);
        var clo = $1.T.btnFa({
            fa: 'fa_close', textNode: ' Cerrar esta lista', func: function () {
                wList.style.display = 'none';
            }
        }, wList);
        if (Jq.errNo) {
            $Api.resp(resp, Jq);
        } else {
            for (var i in Jq.L) {
                L = Jq.L[i];
                var tr = $1.t('button', {'class': 'btnOnSearch', textNode: L.lineText, L: L}, wList);
                tr.onclick = function () {
                    $1.clear(wList);
                    wList.style.display = 'none';
                    wrap.style.zIndex = '';
                    inp.vS = {};//variables obtenidas, guardarlas
                    for (var e in this.L) {
                        inp.vS[e] = this.L[e];
                    }
                    if (!P.inpBlank) {
                        inp.value = this.L.lineText;
                    }
                    if (P.func) {
                        P.func(this.L, inp, P.fPars);
                    }//fPars parametros de funcion
                }
            }
        }
    },
    itemPict: function (Jq, P, wList, inp) {
        $1.clear(wList);
        if (!Jq.errNo) {
            wList.style.display = 'block';
            var clo = $1.T.btnFa({
                fa: 'fa_close', textNode: ' Cerrar esta lista', func: function () {
                    wList.style.display = 'none';
                }
            });
            wList.appendChild(clo);
            var tb = $1.t('table', {'class': 'table_zh'}, wList);
            var tBody = $1.t('tbody', 0, tb);
            for (var i in Jq) {
                L = Jq[i];
                var tr = $1.t('tr', {style: 'cursor:pointer', L: L}, tBody);
                var td = $1.t('td', 0, tr);
                tr.onclick = function () {
                    $1.clear(wList);
                    wList.style.display = 'none';
                    if (P.func) {
                        P.func(this.L);
                    }
                }
                $1.t('img', {src: L.src1, title: 'Imagen del Producto', alt: 'N/D', style: 'width:3rem;'}, td);
                var td = $1.t('td', 0, tr);
                $1.t('div', {textNode: L.itemName}, td);
                var info = $1.t('div', 0, td);
                $1.t('span', {textNode: 'Disp.: ' + L.onHand + ' '}, info);
                $1.t('b', {textNode: ' P.V' + $Str.money({value: L.price})}, info);
            }
        }
    }
}

ColMt = {//ColorMetria {opvt:[k:O, v:#00ff00}] }
    _g: function (k, kd, o) {
        var sOb = (typeof (kd) == 'object') ? kd : ColMt[kd];
        var styb = '';
        sty = '';
        if (sOb) {
            styb = 'background-color:' + _g(k, sOb) + ';';
        }
        if (typeof (o) == 'object') {
            var sty = {};
            for (var i in o) {
                sty[i] = o[i];
            }
            sty.style = styb;
            styb = sty;
        }
        return styb;
    },
    get: function (k1, k, o) {
        //k1=gvtPor,k1=Open,o:{color:blue}
        var sty = '';
        styb = '';
        if (ColMt[k1] && ColMt[k1][k]) {
            styb = 'background-color:' + ColMt[k1][k] + ';';
        }
        if (o) {
            var sty = {};
            if (typeof (o) == 'object') {
                for (var i in o) {
                    sty[i] = o[i];
                }
            }
            sty.style = styb;
        } else {
            sty = styb;
        }
        return sty;
    },
    base: {O: '#0F0', C: 'blue', N: '#B1B1B1'},
}