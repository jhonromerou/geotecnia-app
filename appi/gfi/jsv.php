<?php

if (c::isActiveModule('gfi')) {
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'gfi/gfi');

    _Mdl::$JsV[]=array('mdl'=>'gfi','tbk'=>'gfi_ojsv','qf'=>'prp1');
    _Mdl::$fromTb['gfiOfdp']=array('tbk'=>'gfi_ofdp','k'=>'fpId','v'=>'fpName','addFie'=>'cType');
    _Mdl::$fromTb['gfiOtie']=array('tbk'=>'gfi_otie','k'=>'vid','v'=>'value','addFie'=>'vType,accId');
    _Mdl::$fromTb['gfiOcdc']=array('tbk'=>'gfi_ocdc','k'=>'cdcId','v'=>'cdcName');
    _Mdl::$fromTb['gfiOpym']=array('tbk'=>'gfi_opym','k'=>'pymId','v'=>'pymName','addFie'=>'extraDays');
    _Mdl::$fromTb['gfiOban']=array('tbk'=>'gfi_oban','k'=>'banId','v'=>'banName','addFie'=>'accId,banType');
    _Mdl::$fromTb['accGrAf']=array('tbk'=>'itm_oiac','k'=>'accGrId','v'=>'accGrName','wh'=>'itmGr=\'I\'');
    /* Impuestos, otros en inventario */
    _Mdl::$fromTb['gfiTaxRiva']=array('tbk'=>'gfi_otax','k'=>'vatId','v'=>'taxName','wh'=>'taxType=\'rteIva\'','addFie'=>'rate,dCode');
    _Mdl::$fromTb['gfiTaxIca']=array('tbk'=>'gfi_otax','k'=>'vatId','v'=>'taxName','wh'=>'taxType=\'rteIca\'','addFie'=>'rate');

    /* Impuestos, otros en inventario */

    _Mdl::$fromTb['gfiPdcBank']=array('tbk'=>'gfi_opdc','k'=>'accId','v'=>'accName','wh'=>'comp = \'bank\' AND lvType=\'D\' ');
    _Mdl::$fromTb['gfiPdcing']=array('tbk'=>'gfi_opdc','k'=>'accId','v'=>'accName','wh'=>'comp = \'ing\' AND lvType=\'D\' ');
    _Mdl::$fromTb['gfiPdcAntCxc']=array('tbk'=>'gfi_opdc','k'=>'accId','v'=>'accName','wh'=>'sysType= \'A\' AND lvType=\'D\' ');
    _Mdl::$fromTb['gfiPdcAntCxp']=array('txtVal'=>'$Tb.gfiPdcAntCxc');
}

if (c::isActiveModule('gfiAcc')) {
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'gfi/gfi.Acc');
}
