let jsV = 'jsFiltVars';

let FILTER_CNF = {
    ORDERS: {
        BY_DOC_NUMBER: {
            id: '',
            values: [
                {k: 'docNumDesc', v: 'Número 9-1'},
                {k: 'docNumAsc', v: 'Número 1-9'}
            ]
        },
        BY_CREATED: {
            id: 'order_by_created',
            values: [
                {k: 'newest', v: 'Más Nuevos'},
                {k: 'oldest', v: 'Más Antiguos'}
            ]
        },
        BY_DOC_DATE: {
            id: 'order_by_doc',
            values: [
                {k: 'docDateDesc', v: 'Fecha Doc. Desc.'},
                {k: 'docDateAsc', v: 'Fecha Doc. Asc.'}
            ]
        },
        BY_UPDATED: {
            id: 'order_by_updated',
            values: [
                {k: 'unewest', v: 'Modif. Reciente'},
                {k: 'uoldest', v: 'Modif. Antigüa'}
            ]
        },
    },
    CRT: {}
}
FILTER_CNF.groupingOrders = (orders) => {
    let newOrders = []
    for (let index in orders) {
        for (let value_index in orders[index].values) {
            newOrders.push(orders[index].values[value_index])
        }
    }

    return newOrders
}

FILTER_CNF.CRT = {
    DATE_FROM: {id: 'A.docDate(E_mayIgual)', label: 'Fecha inicio', lTag: 'date'},
    DATE_TO: {id: 'A.docDate(E_menIgual)', label: 'Fecha final', lTag: 'date'},
    CARD_NAME: {id: 'A.cardName(E_like3)', label: 'Tercero', lTag: 'input'},
    DOC_NUMBER: {id: 'A.docNum', label: 'No documento', lTag: 'input'},
    DOC_STATUS: {id: 'A.docStatus', label: 'Estado', lTag: 'select'},
    DOC_SERIES: {id: 'A.serieId', label: 'Series', lTag: 'select'},
    DOC_ORDER: {id: 'orderBy', label: 'Ordenar', lTag: 'select'},
    NUMBER_GTE: {id: '(E_mayIgual)', lTag: 'number'}
}

FILTER_CNF.OPTS = {
    DOC_STATUS_CN: [
        {k: 'C', v: 'Cerrado'},
        {k: 'N', v: 'Anulado'},
    ],
    DOC_STATUS_OCN: [
        {k: 'O', v: 'Abierto'},
        {k: 'C', v: 'Cerrado'},
        {k: 'N', v: 'Anulado'},
    ],
    ORDER_CDN: []
}

/**
 * @param {{action:callback}} P
 * @param {{id: string, values: [{}]=, rp: {}=}[]} filter_conf
 * @return {HTMLDivElement}
 */
$Doc.filterComponent = (P, filter_conf) => {
    let div = $1.t('div', {'class': 'doc_filter_wrapper'})
    __DOC_GENERATE_FILTER(filter_conf, div)

    $1.T.btnSend({textNode: 'Actualizar', func: P.action}, div);
    return div;
}

const __DOC_GENERATE_FILTER = (Li, parentWrapper) => {
    let wrapper = parentWrapper
    let index = 0
    for (let key in Li) {
        let setAnyOption = false
        let tag = 'input'
        let currentFilter = Li[key]
        let divLine = {
            wxn: 'wrapx8',
            L: '???',
            I: {
                lTag: tag,
                'class': jsV,
                name: 'input_name'
            }
        }
        if (currentFilter.id) {
            let filTemplate = currentFilter.id
            divLine.L = filTemplate.label
            divLine.I.lTag = tag = filTemplate.lTag
            divLine.I.name = filTemplate.id

            if (filTemplate === FILTER_CNF.CRT.DOC_ORDER) {
                setAnyOption = true
            }
        }

        if (tag === 'select') {
            divLine.I.opts = currentFilter.values
        }

        if (currentFilter.rp) {
            let cp = currentFilter.rp
            if (cp.with) {
                divLine.wxn = 'wrapx' + cp.with
            }
            if (cp.setFirstOption) {
                setAnyOption = cp.setFirstOption
            }

            if (cp.label) {
                divLine.L = cp.label
            }
            if (cp.name) {
                divLine.I.name = cp.name + divLine.I.name
            }
        }

        if (setAnyOption) {
            divLine.I.noBlank = 1;
        }

        if (index === 0 || currentFilter.new_line) {
            divLine.divLine = 1;
            wrapper = $1.T.divL(divLine, parentWrapper)
        } else {
            $1.T.divL(divLine, wrapper)
        }
        index++
    }
}