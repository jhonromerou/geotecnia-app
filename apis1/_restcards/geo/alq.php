<?php

unset($_J['serieId'],$_J['slpId']);
if(_0s::$router=='GET alq'){ //a_ses::hashKey('geo.remi.read');
	$_GET['C.cardName(E_like3)']=$_GET['A_cardName(E_like3)'];
	unset($_GET['A_cardName(E_like3)']);
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.*,C.cardName FROM xdp_oalq A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	echo iDoc::get($_GET);
}
else if(_0s::$router=='GET alq/form'){ //a_ses::hashKey('geo.remi.read');
	_ADMS::lib('iDoc');
	$_GET['fromA']='A.*,C.cardName FROM xdp_oalq A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)';
	$_GET['fromB']='B.* FROM xdp_alq1 B';
	echo iDoc::getOne($_GET);
}
else if(_0s::$router=='POST alq'){
	if($js=_js::ise($_J['cardId'],'Se debe definir el cliente')){}
	else if($js=_js::ise($_J['docDate'],'Se debe definir la fecha')){}
	else{
		$L=$_J['L']; unset($_J['cardName'],$_J['L']);
		a_sql::transaction(); $cmt=false;
		$docEntry=a_sql::qInsert($_J,array('tbk'=>'xdp_oalq','qk'=>'ud'));
		if(a_sql::$err){ $errs=1; $js=_js::e(3,'Error guardando información: '.a_sql::$errText); }
		else{
			$qI=array();
			if(is_array($L)){
				foreach($L as $X){
					$X[0]='i';
					$X[1]='xdp_alq1';
					$qI[]=$X;
				}
				a_sql::multiQuery($qI,0,array('docEntry'=>$docEntry));
				if(_err::$err){ $errs=1; $js=_err::$errText; }
			}
			
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Información guardada correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}
else if(_0s::$router=='PUT alq'){
	if($js=_js::ise($_J['docEntry'],'Se debe definir Id de documento')){}
	else if($js=_js::ise($_J['cardId'],'Se debe definir el cliente')){}
	else if($js=_js::ise($_J['docDate'],'Se debe definir la fecha')){}
	else{
		$L=$_J['L']; unset($_J['cardName'],$_J['L']);
		a_sql::transaction(); $cmt=false;
		$docEntry=$_J['docEntry'];
		a_sql::qUpdate($_J,array('tbk'=>'xdp_oalq','qk'=>'ud','wh_change'=>'docEntry=\''.$docEntry.'\' LIMIT 1'));
		if(a_sql::$err){ $errs=1; $js=_js::e(3,'Error guardando información: '.a_sql::$errText); }
		else{
			$qI=array();
			if(is_array($L)){
				foreach($L as $X){
					$X[0]='i';
					$X[1]='xdp_alq1';
					$X['docEntry']=$docEntry;
					$X['_unik']='id';
					$qI[]=$X;
				}
				a_sql::multiQuery($qI);
				if(_err::$err){ $errs=1; $js=_err::$errText; }
			}
			
		}
		if($errs==0){ $cmt=true;
			$js=_js::r('Información guardada correctamente.');
		}
		a_sql::transaction($cmt);
	}
	echo $js;
}
?>