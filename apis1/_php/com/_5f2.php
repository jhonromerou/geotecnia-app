<?php
class _5f2{
static $objType = 'fileUpd';
static $historyObjType = 'fileUpd';
static $historyTargetType = 'fileUpdData';

function putReview($P=array(),$D=array()){
	$rv = _5f::putReview($P,array('firebaseUpd'=>'Y','files'=>$P['files']));
	if($rv['jsErr']){ $js = $rv['jsErr']; }
	else{ $js = _ADMS::jsonResp('Revisión firebase correcta'); }
	return $js;
}

function put($P=array()){
	$filesUpd = 0; $err = 0; $jsA = array();
	$fileSizeTotal = 0;
	$F = $P['F']; unset($P['F']);
	if($P['relRef']){ $P['relId'] = $P['relRef']; unset($P['relRef']); }
	foreach($F as $i =>$Li){
		foreach($Li as $k=>$v){ $P[$k]= $v;}//fileName=x
		$jsR = _5f::putLine($P);
		if($jsR['errNo']){ $errNo++;
			$jsX[] = _ADMS::jsonError($jsR['errNo'],$jsR['text']); 
		}
		else{ $fileSizeTotal += $Li['fileSize']; }
	}
	$jsX[] = _o::plan_updVar(_o::$Ty['fileUpd'],array('qact'=>'insert','fileSizeTotal'=>$fileSizeTotal));
	$js = _ADMS::jsonRespNode($jsX);
	echo $js;
}
}
?>