<?php
_Mdl::$jsMdl[]=array('h'=>'api1','src'=>'itm/itm');
_Mdl::$JsV[]=array('mdl'=>'itm','tbk'=>'itm_ojsv','qf'=>'prp1');

if (c::isActiveModule('itmItp')) {
    _Mdl::$fromTb['itmOitp']=array('tbk'=>'itm_oitp','k'=>'prpId','v'=>'name');
}

if (c::isActiveModule('itmActivos')) {
    _Mdl::$jsMdl[] =['h'=>'api1' ,"src"=>"itm/itm.ai"];
    _Mdl::$jsMdl[] =['h'=>'api1' ,"src"=>"itm/itm.af"];
}

_Mdl::$fromTb['otaxI']=array('tbk'=>'gfi_otax','k'=>'vatId','v'=>'taxName','wh'=>'taxType=\'iva\'','addFie'=>'rate,dCode');
_Mdl::$fromTb['otaxR']=array('tbk'=>'gfi_otax','k'=>'vatId','v'=>'taxName','wh'=>'taxType=\'rte\'','addFie'=>'rate');
_Mdl::$fromTb['oiac']=array('tbk'=>'itm_oiac','k'=>'accgrId','v'=>'accgrName','wh'=>'itmGr=\'I\'');

/* tallas */
$ogrs=$grs1=$grs2=array(); $itmSz=[]; $uniqSize=$uniqGrId='';
	$q=a_sql::query('SELECT A.itemSzId, A.itemSize, A.uniqSize
	FROM itm_grs1 A');
	if(a_sql::$errNo==1){ $htxt = '/* err1 ogrs1 */ '; }
	else if(a_sql::$errNo==2){ $htxt = '/*err2 grs1 */'; }
	else{
		while($L=$q->fetch_assoc()){
			if($L['uniqSize']=='Y'){ $uniqSize=$L['itemSzId']; }
			$k2=$L['itemSzId'];
			$grs1[$k2]=$L['itemSize'];
			$itmSz[]=['k'=>$k2,'v'=>$L['itemSize']];
		}
	}
	$q=a_sql::query('SELECT A.grsId, A.grsName, B.itemSzId, B.itemSize, B.uniqSize
	FROM itm_ogrs A
	JOIN itm_grs2 C ON (C.grsId=A.grsId) JOIN itm_grs1 B ON (B.itemSzId=C.itemSzId) WHERE 1 LIMIT 20000');
	if(a_sql::$errNo==1){ $htxt = '/* err 1 _ogrs */ '; }
	else if(a_sql::$errNo==2){ $htxt = '/*err 2 _ogrs */'; }
	else{
		while($L=$q->fetch_assoc()){
			$k=$L['grsId']; $k2=$L['itemSzId'];
			if($uniqSize==$k2){ $uniqGrId=$L['grsId']; }
			$ogrs[$k]=$L['grsName'];
			$grs2[$k][$k2]=$L['itemSize'];
		}
	}
		$htxt = '$V.uniqSize="'.$uniqSize.'";
$V.uniqGrId="'.$uniqGrId.'";
'.$htxt.'
$V.ogrs= '.json_encode($ogrs).';
$V.grs1= '.json_encode($grs1).';
$Tb.itmGrs1= '.json_encode($itmSz).';
$V.grs2= '.json_encode($grs2).';';
	_Mdl::$fromTb['$V.grs2']=array('txt'=>$htxt);
	unset($grs2,$htxt,$itmSz);
//_Mdl::$fromTb['$V.itmGrs']=array('V'=>'$V.itmGrs','tbk'=>'itm_oitg','k'=>'grId','v'=>'grName','wh'=>'itemType IN(\'P\',\'MP\',\'SE\')');
//_Mdl::$fromTb['$V.itemGrP']=array('V'=>'$V.itemGrP','tbk'=>'itm_oitg','k'=>'grId','v'=>'grName','wh'=>'itemType=\'P\'');
//_Mdl::$fromTb['$V.itemGrMP']=array('V'=>'$V.itemGrMP','tbk'=>'itm_oitg','k'=>'grId','v'=>'grName','wh'=>'itemType=\'MP\'');
//_Mdl::$fromTb['$V.itemGrSE']=array('V'=>'$V.itemGrSE','tbk'=>'itm_oitg','k'=>'grId','v'=>'grName','wh'=>'itemType=\'SE\'');


?>
