<?php
/*
demo
{"D":{"env":"PRUEBAS","aid":"6bfa9eb7-c878-4607-83db-06392775cf2f","token":"29b48e0f1a3c2aced43e4e1f2803b350","sendDian":"N","sendEmail":"N"}, "notes":["Regimen Comun. Somos Autoretenedores?","FAVOR CONSIGNAR: CUENTA DE AHORROS No. xxxxxx BANCO zzz"]
}
--end demo
geo {"D":{"aid":"6bfa9eb7-c878-4607-83db-06392775cf2f","env":"PRODUCCION","token":"29b48e0f1a3c2aced43e4e1f2803b350","sendDian":"N","sendEmail":"N"},
"notes":["Regimen Comun. Somos Autoretenedores de ICA","FAVOR CONSIGNAR: CUENTA DE AHORROS No. 5782001916 BANCO COLPATRIA"]}

*/
class __dataIco{
static $D=array(
'sendDian'=>false,'sendEmail'=>false,
'token'=>false,
'aid'=>false,
'env'=>false,
);

static $uri0='http://dataico-factura-staging.herokuapp.com/dataico_api/v1/';
static $uri='http://api.dataico.com/direct/dataico_api/v2/';

static $IVAS=array('iva'=>'IVA','ico'=>'IMP_CONSUMO','ibol'=>'IMP_BOLSA_PLASTICA','rteIva'=>'RET_IVA','rteIca'=>'RET_ICA');
//"IVA", "IMP_CONSUMO", "IMP_CONSUMO_NACIONAL", "IMP_BOLSA_PLASTICA"
static $tipEnt=array('PJ'=>'PERSONA_JURIDICA','PN'=>'PERSONA_NATURAL');
static $regTrib=array('RC'=>'COMUN','RS'=>'SIMPLIFICADO');
static $licTradType=array('nit'=>'NIT','dni'=>'CC','pp'=>'PASAPORTE');
//"CC", "NIT", "PASAPORTE"
static $err=false;
static $errText='';
static public function response($R=array()){
	self::$errText=''; self::$err=false;
	if(!is_array($R)){ self::$err=true; self::$errText='No se obtuvo una respuesta en matriz [..]'; return $R; }
	if($R['errors'] && !is_array($R['errors'])){ $R['errors']=array(['error'=>$R['errors']]); }
	if($R['errors']){ self::$err=true; $rn=1;
		foreach($R['errors'] as $n =>$L){
			$rm=($L['path'])?'('.$L['path'][count($L['path'])-1].') ':'';
			self::$errText .= $rm.$L['error']."  ";
			$rn++;
		}
		return $R;
	}
	else if($R['dian_status']){
		$X=array('uuid'=>$R['uuid'],'numberr'=>$R['number'],'cufe'=>$R['cufe'],'xmlUrl'=>$R['xml_url'],'pdfUrl'=>$R['pdf_url']);
		$X['dianStatus']='P';
		if($R['dian_status']=='DIAN_RECHAZADO'){ $X['dianStatus']='R'; }
		else if($R['dian_status']=='DIAN_ACEPTADO'){ $X['dianStatus']='E'; }
		$X['emailStatus']=($R['email_status']=='CORREO_ENVIADO')?'E':'P';
		return $X;
	}
}
static public function convFie($P=array()){
	$ori = ' on[dxxico::convFie()]';
	if($js=_js::ise(self::$D['token'],'token: no esta definido para el cliente.'.$ori)){ die($js); }
	if($js=_js::ise(self::$D['aid'],'aid: no esta definido para el cliente.'.$ori)){ die($js); }
	if($js=_js::ise(self::$D['env'],'env: no esta definido para el cliente.'.$ori)){ die($js); }
	$rfTipEnt=$P['RF_tipEnt'];
	if($P['RF_tipEnt']){ $P['party_type']=self::$tipEnt[$rfTipEnt]; }
	if($P['RF_regTrib']){ $P['tax_level_code']=self::$regTrib[$P['RF_regTrib']]; }
	//if($P['licTradType']){ $P['party_identification_type']=self::$licTradType[$P['licTradType']]; }
	$X=array(
	'actions'=>array(
	'send_dian'=>(self::$D['sendDian']=='Y'),
	'send_email'=>(self::$D['sendEmail']=='Y')
	));
	if($P['RF_tipEnt']=='PJ'){
		$P['txtTop']=$P['cardName'];
	}
		if($P['lineMemo']){ $P['notes']=explode("\n",$P['lineMemo']); unset($P['lineMemo']); }
		if(!is_array($P['notes'])){ $P['notes']=array(); }
	{$X['invoice']=array(
		'env'=>self::$D['env'],
		'dataico_account_id'=>self::$D['aid'],
		'payment_date'=>date("d/m/Y",strtotime($P['dueDate'])),
		'issue_date'=>date("d/m/Y",strtotime($P['docDate'])),
		'order_reference'=>'OR '.$P['oc'],
		'invoice_type_code'=>'FACTURA_VENTA',// "FACTURA_EXPORTACION", "FACTURA_CONTINGENCIA"
		'payment_means'=>'DEBIT_INTERBANK_TRANSFER', /* "CREDIT_ACH", "DEBIT_ACH", "CASH",
			"CREDIT_AHORRO", "DEBIT_AHORRO", "CHEQUE", "CREDIT_TRANSFER", "DEBIT_TRANSFER", "BANK_TRANSFER", "CREDIT_BANK_TRANSFER", "c", "DEBIT_BANK_TRANSFER", "CREDIT_CARD", "DEBIT_CARD"
		*/
		'payment_means_type'=>'DEBITO',// [ "DEBITO", "CREDITO" ]
		//'number'=>396,
		'numbering'=>[
			'resolution_number'=>'18764099323979',
			'prefix'=>'GEO',
			//'number'=>true,
			//'flexible'=>true,
		],
		'customer'=>array(
			'email'=>$P['email'],
			'phone'=>$P['phone1'],
			'party_type'=>$P['party_type'],//List [ "PERSONA_JURIDICA", "PERSONA_NATURAL" ]
			'party_identification'=>preg_replace('/\-.*?$/','',$P['licTradNum']),
			// 'party_identification_type'=>$P['licTradType'],// [ "CC", "NIT", "PASAPORTE" ]
			'regimen'=>'ORDINARIO',// "SIMPLE", "ORDINARIO"
			'tax_level_code'=>$P['tax_level_code'],// [ "COMUN", "SIMPLIFICADO" ]
			'department'=>$P['dpto'],
			'city'=>$P['cityCode'],
			'address_line'=>$P['address'],
			'country_code'=>'CO',
			'company_name'=>$P['txtTop'].'',/*PJ - nit */
			),
		'items'=>array(),/* sku, quantity, description, price, discount_rate,
			taxes:[
					tax_category: IVA, [ "IVA", "IMP_CONSUMO", "IMP_CONSUMO_NACIONAL", "IMP_BOLSA_PLASTICA" ]
					tax_rate: 19
				],
				retentions:[
					tax_category: RTE_FUENTE, [ "RET_FUENTE" ]
					tax_rate: 19
				]
		*/
	);}
	if(is_array($P['notes'])){ $X['invoice']['notes']=$P['notes']; }
	if($rfTipEnt=='PN'){
		$X['invoice']['customer']['first_name']=$P['RF_firstName'];
		$X['invoice']['customer']['family_name']=$P['RF_lastName'];
	}
	return $X;
}
static public function invPost($P=array()){
	$ori = ' on[dxxico::invPost()]';
	if($js=_js::ise($P['docDate'],'Se debe definir la fecha para la factura.'.$ori)){}
	else if($js=_js::ise($P['dueDate'],'Se debe definir la fecha de vencimiento para la factura.'.$ori)){}
	else if($js=_js::ise($P['number'],'number: Error recibiendo parametro.'.$ori)){}
	else if($P['RF_tipEnt']=='PN' && $js=_js::ise($P['RF_firstName'],'El tipo de persona requiere que se defina nombre.'.$ori)){}
	else if($P['RF_tipEnt']=='PN' && $js=_js::ise($P['RF_lastName'],'El tipo de persona requiere que se defina apellido.'.$ori)){}
	else{
	$Lx=$P['L']; $RteB=$P['RteB'];
	unset($P['L'],$P['RteB']);
	$X=self::convFie($P);
	$Li=array();
	foreach($Lx as $n=>$L){/* Retenciones items */
		$Li[$n]=array('sku'=>$L['itemCode'],'quantity'=>$L['quantity']*1,'description'=>$L['itemName'],'price'=>$L['price']*1,'discount_rate'=>$L['disc']*1);
		if($Li[$n]['discount_rate']==0){ unset($Li[$n]['discount_rate']); }
		if($L['vatId']>0){
			$Li[$n]['taxes']=array(['tax_category'=>self::$IVAS[$L['taxType']],'tax_rate'=>$L['vatRate']*1]);
		}
		if($L['rteId']>0){
			$Li[$n]['retentions']=array(['tax_category'=>'RET_FUENTE','tax_rate'=>$L['rteRate']*1]);
		}
	}
	if(is_array($RteB)){
		$X['invoice']['retentions']=array();
		foreach($RteB as $n=>$L){/* Retenciones pie pagina*/
		$X['invoice']['retentions'][]=array('tax_category'=>self::$IVAS[$L['lineType']],'tax_rate'=>$L['vatRate']*1);
	}}
	unset($RteB);
	$X['invoice']['items']=$Li;
	//echo '---s-dsd'; die(json_encode($X,JSON_PRETTY_PRINT));
	$R=xCurl::post(self::$uri.'invoices',array('__JSON'=>$X), array('h'=>array('auth-token: '.self::$D['token']),'utf8Plain'=>'Y'));
	if(xCurl::$errno){
		die(xCurl::$errno_text);
	}
	$R=self::response($R);
	if(self::$err){ $js=_js::e(3,'Errores en generación con proveedor [18764099323979]'.]: '.self::$errText.$ori); }
	else{ $R['number'] = $P['number'];
		$js=json_encode($R); }
	}
	return $js;
}
static public function invPut($P=array()){
	$ori=' on[xxxico::invPut()]';
	if($js=_js::ise($P['uuid'],'Se debe definir uuid de factura.'.$ori)){}
	else{
		$uuid=$P['uuid']; unset($P['uuid']);
		$uri=self::$uri.'invoices/'.$uuid;
	$P['send_email']=($P['send_email'])?true:false;
	$P['send_dian']=($P['send_dian'])?true:false;
		$R=xCurl::put($uri,array('__JSON'=>$P), array('h'=>array('auth-token: '.self::$D['token']),'utf8Plain'=>'Y'));
		$R=self::response($R);
		if(self::$err){ $js=_js::e(3,'Errores en actualización: '.self::$errText.$ori,'"uri":"'.$uri.'"'); }
		else{ $js=json_encode($R); }
	}
	return $js;
}

}
?>
