<?php
if (c::IsActiveModule('crd')) {
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'crd/crd');
    _Mdl::$JsV[]=array('mdl'=>'crd','tbk'=>'par_ojsv','qf'=>'prp1');
    _Mdl::$fromTb['oslp']=array('tbk'=>'par_oslp','k'=>'slpId','v'=>'slpName','addFie'=>'active,phone1,slpEmail');
    _Mdl::$fromTb['crdLgc']=array('tbk'=>'par_olgc','k'=>'uid','v'=>'name');
    _Mdl::$fromTb['parPrPC']=array('tbk'=>'par_oprp','k'=>'prpNum','v'=>'prpName','wh'=>'prpType=\'C\'','addFie'=>'jsD');
}

if (c::IsActiveModule('crdNov')) {
   _Mdl::$jsMdl[] = ['h'=>'api1',"src"=>"crd/crdNov"];
}
