<?php
class Nty{
static $err=false;
static $errText='';
static public function post($P=array()){
	$uL=array(); $reqoTy=false;
	$reqIns=($P['reqInsert']=='Y');
	if($reqIns && $js=_js::ise($P['oTy'],'Se debe definir oTy on Nyt::post.')){ self::$err=true; self::$errText=$js; }
	else if($reqIns && $js=_js::ise($P['gid'],'Se debe definir gid on Nyt::post.')){ self::$err=true; self::$errText=$js; }
	else if($reqIns && $js=_js::ise($P['lineMemo'],'Se debe definir lineMemo on Nyt::post.')){ self::$err=true; self::$errText=$js; }
	if($P['uids']){
		$us=explode(',',$P['uids']);
		foreach($us as $n =>$k){ $uL[]=array('userId'=>$k);}
	}//userId,
	else{ $uL=Obj::users(array('oTy'=>$P['oTy'],'gid'=>$P['gid'])); }
	if(Obj::$err){ self::$err=true; self::$errText=Obj::$errText; }
	else{
		$dateC=date('Y-m-d H:i:s');
		foreach($uL as $n => $U){
			if($U['userId']==a_ses::$userId){ continue; }
			$D=array('dateC'=>$dateC,'userId'=>$U['userId'],'fromUserId'=>a_ses::$userId,'vb'=>$P['vb'],'oTy'=>$P['oTy'],'gid'=>$P['gid'],'lineMemo'=>$P['lineMemo']);
			$ins=a_sql::insert($D,array('tbk'=>'app_onfy','qDo'=>'insert'));
			if($ins['err']){ self::$err=true; self::$errText=_js::e(1,'Error generando notificación: '.$ins['text']); break; }
		}
	}
	return self::$err;
}
}
?>