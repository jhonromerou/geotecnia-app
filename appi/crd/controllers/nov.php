<?php
class crdNov extends JxDoc{
static $serie='crdNov';
static $AI='docEntry';
static $tbk='par_onov';
static $tbk1='app_ckl1';
static $tbk99='mpa_doc99';
static public function get($D){
	_ADMS::lib('iDoc,sql/filter');
  $D['from']='A.docEntry,A.docDate,A.dueDate,A.docStatus,A.docType,A.docOri,A.docPrio,A.slpId,A.dateC,A.userId,A.dateUpd,A.userUpd,A.lineNums,A.lineNumsComp,C.cardName,A.docTitle
  FROM '.self::$tbk.' A
	JOIN par_ocrd C ON C.cardId=A.cardId';
	$D['permsBy']='slps';
	return a_sql::rPaging($D);
}
static public function getOne($D){
	if($js=_js::ise($D['docEntry'],'No se ha definido el número de documento.','numeric>0')){ die($js); }
	$M=a_sql::fetch('SELECT C.licTradType,C.licTradNum,A.*,C.cardName 
	FROM '.self::$tbk.' A 
	LEFT JOIN par_ocrd C ON (C.cardId=A.cardId)
	WHERE A.docEntry=\''.$D['docEntry'].'\' LIMIT 1',[1=>'error obteniendo documento',2=>'El documento no existe']);
	if(a_sql::$err){ die(a_sql::$errNoText); }
	else if(JRoute::pathMatch('form$') && a_ses::nis_slp($M['slpId'])){ return _err::$errText; }
	else{
		$M['L']=a_sql::fetchL('SELECT B.id,B.completed,B.lineText,B.lineAssg,B.lineDue
		FROM '.self::$tbk1.' B 
		WHERE B.tt=\''.self::$serie.'\' AND tr=\''.$D['docEntry'].'\' ORDER BY B.lineNum ASC',[1=>'error obteniendo lineas documento',2=>'El documento no tiene lineas registradas']);
	}
	return _js::enc2($M);
}
static public function fieldsRequire(){
  return [
    ['k'=>'cardId','ty'=>'id','iMsg'=>'Tercero'],
    ['k'=>'slpId','ty'=>'id','iMsg'=>'Responsable de Venta'],
    ['k'=>'docTitle','ty'=>'R','maxLen'=>200,'iMsg'=>'Asunto'],
    ['k'=>'docType','ty'=>'id','iMsg'=>'Tipo'],
    ['k'=>'docDate','ty'=>'date','iMsg'=>'Fecha'],
    ['k'=>'docStatus','ty'=>'R','iMsg'=>'Estado'],
    ['k'=>'lineMemo','maxLen'=>1000,'iMsg'=>'Descripcion'],
    ['ty'=>'L','k'=>'L','req'=>'N','iMsg'=>'Actividades','L'=>[
      ['k'=>'lineText','ty'=>'R','iMsg'=>'Actividad']
    ]
    ]
  ];
}
static public function lineNumsComp($D=[],$L=[],$sii=true){
  if($L['delete']=='N'){ $D['lineNums']++;
    if($L['completed']=='Y'){ $D['lineNumsComp']++; }
  }
  return $D;
}
static public function post($_J=array()){
  unset($_J['docEntry']);
	self::formRequire($_J);
	a_sql::transaction(); $c=false;
	if(!_err::$err){
    _ADMS::lib('docSeries,JLog');
    $_J['docEntry']=$docEntryN=self::nextID();
  }
  $qI=[];
  $dateC=date('Y-m-d H:i:s');
  if(!_err::$err){
    $Lx=$_J['L']; unset($_J['L']);
    $_J[0]='i'; $_J[1]=self::$tbk; $_J[2]='udUpd';
    $_J['lineNums']=$_J['lineNumsComp']=0;
    $ln=1;
    if(!_js::isArray($Lx)){ foreach($Lx as $n=>$L){
      $L[0]='i'; $L[1]=self::$tbk1;
      $L['tt']=self::$serie; $L['tr']=$docEntryN;
      $L[2]='ud';
      $L['lineNum']=$ln; $ln++;
      $_J['lineNums']++;
      if($L['completed']=='Y'){ $_J['lineNumsComp']++; }
      if($L['completed']=='Y'){ $L['completAt']=$dateC; }
      else{ $L['completAt']='0000-00-00 00:00:00'; }
      $qI[]=$L;
    }}
    $qI[]=$_J;
    a_sql::multiQuery($qI);
  }
  if(!_err::$err){ $c=true; $js=_js::r('Novedad creada correctamente','"docEntry":"'.$docEntryN.'"'); }
	a_sql::transaction($c);
	_err::errDie();
	return $js;
}
static public function put($_J=array()){
  $docEntryN=$_J['docEntry']; unset($_J['docEntry']);
	self::formRequire($_J);
	a_sql::transaction(); $c=false;
  $qI=[];
  if(!_err::$err){
    $Lx=$_J['L']; unset($_J['L']);
    $_J[0]='u'; $_J[1]=self::$tbk; $_J[2]='udU';
    $_J['_wh']='docEntry=\''.$docEntryN.'\' LIMIT 1';
    $_J['lineNums']=0;$_J['lineNumsComp']=0;
    $ln=1; $dateC=date('Y-m-d H:i:s');
    if(!_js::isArray($Lx)){ foreach($Lx as $n=>$L){
      $L[0]='i'; $L[1]=self::$tbk1;
      $L['_unik']='id';
      $L['tt']=self::$serie; $L['tr']=$docEntryN;
      $L[2]='ud';
      $L['lineNum']=$ln; $ln++;
      if($L['delete']!='Y'){ $_J['lineNums']++;
        if($L['completed']=='Y'){ $_J['lineNumsComp']++; }
      }
      if($L['completed']=='Y'){ $L['completAt']=$dateC; }
      else{ $L['completAt']='0000-00-00 00:00:00'; }
      $qI[]=$L;
    }}
    $qI[]=$_J;
    a_sql::multiQuery($qI);
  }
  if(!_err::$err){ $c=true; $js=_js::r('Novedad actualizada correctamente','"docEntry":"'.$docEntryN.'"'); }
	a_sql::transaction($c);
	_err::errDie();
	return $js;
}
static public function statusC($D=array()){
	if(_js::iseErr($D['docAccep'],'Se debe definir estado de aceptación')){}
	else if($js=_js::textMax($D['lineMemoClose'],200,'Detalles de cierre')){ $js=_err::err($js); }
	else{
		a_sql::transaction(); $cmt=false;
		_ADMS::lib('iDoc,JLog');
		$ori=' on[gvtPqr::statusOpen()]';
		if(iDoc::vStatus(array('tbk'=>self::$tbk,'docEntry'=>$D['docEntry'],'D'=>'Y'))){ return _err::$errText; }
		else if(iDoc::$D['docStatus']!='O'){ return _err::err('Solo una orden abierta se puede cerrar .'.iDoc::$D['docStatus'].'.',3); }
		else{
			a_sql::query('UPDATE '.self::$tbk.' SET docStatus=\'C\',docAccep=\''.$D['docAccep'].'\',docCost=\''.$D['docCost'].'\',lineMemoClose=\''.$D['lineMemoClose'].'\' WHERE docEntry=\''.$D['docEntry'].'\' LIMIT 1',[1=>'Error actualizando estado del documento']);
			if(a_sql::$err){ _err::err(a_sql::$errNoText); }
			else{ $cmt=true;
				self::tb99P(['docEntry'=>$D['docEntry'],'docStatus'=>'C']);
				$js=_js::r('Estado actualizado correctamente');
			}

		}
		a_sql::transaction($cmt);
	}
	_err::errDie();
	return $js;
}
static public function statusN($_J=array()){
	$js=''; a_sql::transaction(); $cmt=false;
	$ori=' on[gvtRce::putCancel()]';
	Doc::putStatus(array('closeOmit'=>'Y','t'=>'N','tbk'=>self::$tbk,'docEntry'=>$_J['docEntry'],'serieType'=>self::$serie,'reqMemo'=>'Y','lineMemo'=>$_J['lineMemo']));
	if(_err::$err){ $js=_err::$errText; }
	else{
		_ADMS::mApps('gfi/Acc');
		gfiDac::putCancel(array('tt'=>self::$serie,'tr'=>$_J['docEntry']));
		if(_err::$err){ return _err::$errText; }
		$q=a_sql::query('SELECT A.canceled,B.lineType,B.acId,B.tt,B.tr,B.debBal
		FROM '.self::$tbk.' A 
		JOIN '.self::$tbk1.' B ON (B.docEntry=A.docEntry)
		WHERE A.docEntry=\''.$_J['docEntry'].'\'',array(1=>'Error consultando recibo de pago.',2=>'No se encontró información del pago a anular.'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else{
			$errs=0;
			$qU=array();
			while($L=$q->fetch_assoc()){
				$qU[]=array('u','gfi_dac1','creBalDue='=>'creBalDue+'.$L['debBal'],'_wh'=>'acId=\''.$L['acId'].'\' LIMIT 1');
				if($L['tr']>0){//Revertir Doc
					$Q=self::revTT($L);
					if(_err::$err){ $errs=1; break; }
					$qU[]=array('u',$Q['tbk'],'balDue='=>'balDue+'.$L['debBal'],'_wh'=>'docEntry=\''.$L['tr'].'\' LIMIT 1');
				}
			}
			if($errs==0){/*actualizar */
				a_sql::multiQuery($qU);
				if(_err::$err){}
				else{ $cmt=true; $js=_js::r('Recibido anulado correctamente.');
					Doc::logPost(array('tbk'=>self::$tbk99,'serieType'=>self::$serie,'docEntry'=>$_J['docEntry'],'dateC'=>1));
				}
			}
		}
	}
	a_sql::transaction($cmt);
	return $js;
}

}
?>