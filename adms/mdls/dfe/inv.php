<?php

if(_0s::$router=='GET inv'){
	$___D['fromA']='A.*,
	DV.dianStatus,DV.emailStatus,DV.numberr,DV.cufe,DV.pdfUrl,DV.xmlUrl,DV.dateC DdateC,DV.userId DuserId
	FROM gvt_oinv A
	LEFT JOIN gvt_dinv DV ON (DV.docEntry=A.docEntry)';
	echo Doc::get($___D);
}
else if(_0s::$router=='POST inv'){
	if($js=_js::ise($___D['docEntry'],'Se debe definir Id de factura','numeric>0')){}
	else{
		$Q=a_sql::fetch('SELECT DV.docEntry,DV.numberr,
		A.canceled,DV.dianStatus,
		A.docDate,A.dueDate, C.email,C.phone1,C.RF_tipEnt,C.licTradNum,C.licTradType,C.RF_regTrib,A.cardName,A.countyCode,A.cityCode,A.address,
		C.RF_firstName,C.RF_lastName,A.lineMemo
		FROM gvt_oinv A
		LEFT JOIN gvt_dinv DV ON (DV.docEntry=A.docEntry)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE A.docEntry=\''.$___D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de la factura.',2=>'La factura no existe'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else if($js=_err::iff($Q['canceled']=='Y','La factura está anulada.')){}
		else if($js=_err::iff($Q['docEntry']>0,'La factura ya fue generada electrónicamente ('.$Q['numberr'].').')){}
		else{
			_ADMS::mApps('gfi/daneMuni');
			$RDi=__daneMuni::get($Q['cityCode'],$Q['countyCode']);
			/* Retenciones */
			$Q['RteB']=array();
			$q=a_sql::query('SELECT lineType,vatRate
			FROM gvt_inv2 B
			WHERE B.docEntry=\''.$___D['docEntry'].'\' AND B.lineType IN (\'rteIva\',\'rteIca\') ',array(1=>'Error obteniendo información lineas retenciones pie pagina.'));
			if(a_sql::$err){ return a_sql::$errNoText; }
			else if(a_sql::$errNo==-1){
					while($L=$q->fetch_assoc()){ 
							$Q['RteB'][]=$L;
					}
			}
			/* end Retenciones */
			$Q['L']=array();
			$q=a_sql::query('SELECT I.itemCode,I.itemName,B.quantity,B.price,B.disc,
			B.vatId,T1.taxType,B.vatRate,
			B.rteId,B.rteRate
			FROM gvt_inv1 B
			LEFT JOIN itm_oitm I ON (I.itemId=B.itemId) 
			LEFT JOIN gfi_otax T1 ON (T1.vatId=B.vatId)
			WHERE B.docEntry=\''.$___D['docEntry'].'\' ',array(1=>'Error obteniendo información lineas de la factura.',2=>'La factura no tiene lineas registradas'));
			if(a_sql::$err){ $js=a_sql::$errNoText; }
			else{
				while($L=$q->fetch_assoc()){ $Q['L'][]=$L; }
				$Q['dpto']=$RDi['d'];
				$Q['cityCode']=$RDi['m'];
				//$Q['email']='administrativo@geotecniaingenieria.co'; //usar en pruebas
				//if(a_ses::$userId==1){ $Q['email']='johnromero492@gmail.com'; } //usar en pruebas
				_ADMS::lib('xCurl,pApp');
				/* get next number */
				$nextNum = a_sql::fetch('SELECT MAX(number)+1 number FROM gvt_dinv ',
					[
						1 => 'Error obteniendo proximo consecutivo'
					]
				);
				if (a_sql::$errNo == 1) { die(_err::err(a_sql::$errNoText)); }
				elseif (a_sql::$errNo == 2) { $nextNum = 1;  }
				else { $nextNum = $nextNum['number']; }
				$Q['number'] = $nextNum;
				//$R=pApp::dataico('invPost',$Q);
				_ADMS::libx('dataico');
				$result = __dataIco::invPost($Q);
                $R = json_decode($result,1);
				if(_err::$err){ $js=_err::$errText; }
				else if($R['error']){ $R['_data_'] = $Q; die(json_encode($R)); }
				else{
					a_sql::query('UPDATE gvt_oinv SET dfeNumber=\''.$R['numberr'].'\' WHERE docEntry=\''.$___D['docEntry'].'\' LIMIT 1');
					$R['docEntry']= $___D['docEntry'];
					$ins=a_sql::qInsert($R,array('tbk'=>'gvt_dinv','qk'=>'ud'));
					if(a_sql::$err){ $js=_js::e(3,'Factura electrónica generada. Informe de este error y NO REALICÉ DE NUEVO ESTA OPCIÓN. Generará 2 facturas electrónicas iguales. '.a_sql::$errText); }
					else{
						$js=_js::r('Factura electrónica generada correctamente. Numero: '.$R['numberr']);
					}
				}
				a_sql::transaction($cmt);
			}
		}
	}
	echo $js;
}
else if(_0s::$router=='PUT inv'){
	if($js=_js::ise($_J['docEntry'],'Se debe definir Id de factura','numeric>0')){}
	else{
		$Q=a_sql::fetch('SELECT DV.uuid,DV.docEntry,DV.numberr,
		A.canceled,DV.dianStatus,DV.emailStatus
		FROM gvt_oinv A
		LEFT JOIN gvt_dinv DV ON (DV.docEntry=A.docEntry)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE A.docEntry=\''.$_J['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de la factura.',2=>'La factura no existe'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else if($js=_err::iff($Q['canceled']=='Y','La factura está anulada.')){}
		else if($js=_err::iff(($_J['sendEmail']=='Y' && $Q['emailStatus']=='E'),'La factura ya fue enviada por correo anteriormente.')){}
		else if($js=_err::iff(($_J['sendDian']=='Y' && $Q['dianStatus']=='E'),'La factura ya fue recibida por la DIAN.')){}
		else{
			a_sql::query('UPDATE gvt_oinv SET dfeNumber=\''.$Q['numberr'].'\' WHERE docEntry=\''.$_J['docEntry'].'\' LIMIT 1');
			_ADMS::lib('xCurl,pApp');
			$Ds=array('uuid'=>$Q['uuid'],'send_email'=>($_J['sendEmail']=='Y'),'send_dian'=>($_J['sendDian']=='Y'));
			if($_J['sendEmail']=='Y' || $_J['sendDian']=='Y'){
				$R=pApp::dataico('invPut',$Ds);
			}
			if(_err::$err){ $js=_err::$errText; }
			else{
				$Ds=array('emailStatus'=>$R['emailStatus'],'dianStatus'=>$R['dianStatus']);
				$ins=a_sql::insert($Ds,array('table'=>'gvt_dinv','qDo'=>'update','wh_change'=>'WHERE docEntry=\''.$_J['docEntry'].'\' LIMIT 1'));
				if($ins['err']){ $js=_js::e(3,'Factura electrónica actualizada. Informe de este error y NO REALICÉ DE NUEVO ESTA OPCIÓN.'); }
				else{ $js=_js::r('Factura electrónica actualizada correctamente. Numero: '.$Q['numberr']); }
			}
		}
	}
	echo $js;
}

//['sku'=>'SKU_11','quantity'=>1,'description'=>'Prueba','price'=>5400,'discount_rate'=>0]
?>