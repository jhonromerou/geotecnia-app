<?php
if (c::isActiveModule('gvtSell')) {
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'gvt/gvtSell');
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'gvt/gvtSin');
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'gvt/gvtSrd');
    _Mdl::$fromTb['oslp']=array('tbk'=>'par_oslp','type'=>'k-v','k'=>'slpId','v'=>'slpName');
}

if (c::isActiveModule('gvtPur')) {
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'gvt/gvt.Pur');
}
