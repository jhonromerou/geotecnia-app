<?php

if(_0s::$router=='GET ndv'){
	$___D['fromA']='A.*,3
	DV.dianStatus,DV.emailStatus,DV.numberr,DV.cufe,DV.pdfUrl,DV.xmlUrl,DV.dateC DdateC,DV.userId DuserId
	FROM gvt_oinv A
	LEFT JOIN gvt_dndv DV ON (DV.docEntry=A.docEntry)';
	echo Doc::get($___D);
}
else if(_0s::$router=='POST ndv'){
	if($js=_js::ise($___D['docEntry'],'Se debe definir Id de nota crédito','numeric>0')){}
	else{
		$Q=a_sql::fetch('SELECT DV.docEntry,DV.numberr,
		A.canceled,DV.dianStatus,
		A.docDate,A.dueDate, C.email, C.phone1,C.RF_tipEnt, C.licTradNum,C.licTradType,C.RF_regTrib,A.cardName,A.countyCode,A.cityCode,A.address,
		C.RF_firstName,C.RF_lastName
		FROM gvt_ondv A
		LEFT JOIN gvt_dndv DV ON (DV.docEntry=A.docEntry)
		JOIN par_ocrd C ON (C.cardId=A.cardId)
		WHERE A.docEntry=\''.$___D['docEntry'].'\' LIMIT 1',array(1=>'Error obteniendo información de la nota crédito.',2=>'La nota crédito no existe'));
		if(a_sql::$err){ $js=a_sql::$errNoText; }
		else if($js=_err::iff($Q['canceled']=='Y','La nota está anulada.')){}
		else if($js=_err::iff($Q['docEntry']>0,'La nota credito ya fue generada electrónicamente ('.$Q['numberr'].').')){}
		else{
			_ADMS::mApps('gfi/daneMuni');
			$RDi=__daneMuni::get($Q['cityCode'],$Q['countyCode']);
			
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
				$Q['dpto']=$RDi['d']; $Q['cityCode']=$RDi['m'];
				$Q['email']='johnromero492@gmail.com';
				_ADMS::lib('xCurl,pApp');
				$R=pApp::dataico('invPost',$Q);
				if(_err::$err){ $js=_err::$errText; }
				else{
					$R['docEntry']=$___D['docEntry'];
					$ins=a_sql::insert($R,array('table'=>'gvt_dinv','qDo'=>'insert','kui'=>'ud'));
					if($ins['err']){ $js=_js::e(3,'Factura electrónica generada. Informe de este error y NO REALICÉ DE NUEVO ESTA OPCIÓN. Generará 2 facturas electrónicas iguales.'); }
					else{ $js=_js::r('Factura electrónica generada correctamente. Numero: '.$R['numberr']); }
				}
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
			_ADMS::lib('xCurl,pApp');
			$Ds=array('uuid'=>$Q['uuid'],'send_email'=>($_J['sendEmail']=='Y'),'send_dian'=>($_J['sendDian']=='Y'));
			$R=pApp::dataico('invPut',$Ds);
			if(_err::$err){ $js=_err::$errText; }
			else{
				$Ds=array('emailStatus'=>$R['emailStatus'],'dianStatus'=>$R['dianStatus']);
				$ins=a_sql::insert($Ds,array('table'=>'gvt_dinv','qDo'=>'update','wh_change'=>'WHERE docEntry=\''.$_J['docEntry'].'\' LIMIT 1'));
				if($ins['err']){ $js=_js::e(3,'Factura electrónica actualizada. Informe de este error y NO REALICÉ DE NUEVO ESTA OPCIÓN.'); }
				else{ $js=_js::r('Factura electrónica actualizada correctamente. Numero: '.$R['numberr']); }
			}
		}
	}
	echo $js;
}

//['sku'=>'SKU_11','quantity'=>1,'description'=>'Prueba','price'=>5400,'discount_rate'=>0]
?>