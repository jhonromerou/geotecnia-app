<?php
if (c::isActiveModule('ivt')) {
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'ivt/ivt');
    _Mdl::$jsMdl[]=array('h'=>'api1','src'=>'ivt/ivtPacki');

    _Mdl::$fromTb['itmOwhs']=array('tbk'=>'ivt_owhs','k'=>'whsId','v'=>'CONCAT(whsCode,\') \',whsName)','wh'=>'whsType!=\'PeP\'','addFie'=>'whsType');
    _Mdl::$fromTb['itmOwhsPeP']=array('tbk'=>'ivt_owhs','k'=>'whsId','v'=>'whsName','wh'=>'whsType=\'PeP\'');
    _Mdl::$fromTb['$V.whsCode']=array('txt'=>'
    $V.whsCode=$Tb.itmOwhs;
    $Tb.whsPeP=$Tb.itmOwhsPeP;
    /* Asignacion */');
}

if (c::isActiveModule('ivtDot')) {
    _Mdl::$jsMdl[] = ['h'=>'api1',"type"=>"js","src"=>"ivt/ivtDot"];
}
if (c::isActiveModule('ivtGes')) {
    _Mdl::$jsMdl[] = ['h'=>'api1',"type"=>"js","src"=>"ivt/ivtBit"];
}
