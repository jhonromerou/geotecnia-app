<?php

class PersistenceManager
{
    public static function fetch(string $query, array $errors = []) : StreamResponse
    {
        if (!isset($error[1])) {
            $errors[1] = 'persisten error';
        }
        if (!isset($error[2])) {
            $errors[2] = 'sin resultados';
        }

        if ($_GET['ADMS_DEBUG']) {
            print($query);
        }

        $results = a_sql::query($query, $errors);
        if (a_sql::$errNo == 1) {
            die(_err::$errText);
        }
        if (a_sql::$errNo == 2) {
            return new StreamResponse(false, []);
        }
        return new StreamResponse(false, $results);
    }
}

class StreamResponse
{
    private bool $error;
    private $rows;

    public function __construct(bool $error, $rows) {
        $this->error = $error;
        $this->rows = $rows;
    }

    public function isEmpty(): bool
    {
        return is_array($this->rows) && sizeof($this->rows) < 1;
    }

    public function first(): array
    {
        return $this->isEmpty() ? [] : $this->rows->fetch_assoc();
    }

    public function iterator()
    {
        return $this->isEmpty() ? [] : $this->rows->fetch_assoc();
    }
}

class _uniK{
static $numSels=0;
static $k='__null__';
static $D=array();

static public function ini($P=array()){
	self::$D=array(); self::$k='__null__';
}

static public function fromQuery($P=array()){
	//k=itemCode, f=itemId, from=tbk, wh=where, 1=>, 2=>
	self::$k=$P['k'];
	if(!array_key_exists(self::$k,self::$D)){
		$fie=($P['f'])?$P['f']:'\'1\' as nada_';
		self::$numSels++;
		$q2=a_sql::fetch('SELECT '.$fie.' FROM '.$P['from'].' WHERE '.$P['wh'].' LIMIT 1',array(1=>$P[1].' (nSel:'.self::$numSels.')',2=>$P[2].' (nSel:'.self::$numSels.')'));
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		self::$D[self::$k]=$q2;
	}
	return self::get();
}
static public function put($k='',$D=array()){
	self::$k=$k;
	if(!array_key_exists(self::$k,self::$D)){
		$fie=($P['f'])?','.$P['f']:'';
		self::$D[self::$k]=$D;
	}
	return self::get();
}
static public function get(){
	$ori=' on[_uniK::get()]';
	if(self::$k=='__null__'){ _err::err('Clave no definida para continuar __null__.'.$ori);; }
	else if(self::$D[self::$k]){ return self::$D[self::$k]; }
	else{ _err::err('Clave ('.self::$k.') no definida para continuar .'.$ori);;; }
}
}

class a_sql{
static $numCon=0;
static $Rtemp=array();//respuesta temporal
static $lastFetch=array();
static $aff_rows=0;
static $R=''; //Se usa en a_ses para verificar
static $testRemoteDB='Y';// deprecated N para trabajar con lh_(h,u,p,db)
static $textLocal='N';//
static $qCtrl=array('get'=>'N','len'=>0,'seg'=>0);
static $limitDef=20; static $limitDefBef=10;
static $limitFull=false; //definir como full
static $lastPage=1;
static $host = '-undefined-'; static $user = ''; static $pass = '';
static $define_host = '';
static $dbase = '';
static $DB = false;
static $DBm = array(); /* guardar conexion y numero */
static $DBn=false;
static $err = false; static $errNo = -1; static $errNoText = false;
static $errText ='';
static $setRows='Y'; //guardar para paginador
static $numRows = -1;
static $jsonBegN = true;
static $onTrans=false;
static $AordBy='A'; //Alias para order by
static $SqlsMulti=array(); //$FIELDS
/* ojo,solo afecta conexion DB */
static public function transaction($comi=false,$v=false){
	if($v){
echo "\n".'commit: ('.$comi.') ontrans ('.self::$onTrans.')'."\n";
	}
	if(self::$onTrans==true && ($comi==='rollback' || $comi==false)){
		a_sql::$DB->rollback(); self::$onTrans=false;
		if($v){ echo "\n".' rollback'."\n"; }
	}
	else if(self::$onTrans===true && $comi!==false){
		if($v){ echo 'commit'; }
		a_sql::$DB->commit(); self::$onTrans=false;
	}
	else if(self::$onTrans===false){
		a_sql::$DB->begin_transaction(); self::$onTrans=true;
	}
}
static public function qCtrl($a=false,$qDo=''){
	if($a=='open'){
		self::$qCtrl['timeIni']=microtime(1);
		self::$qCtrl['get']='Y'; $qCtrl['sleeps']=0;
	}
	else if($a=='close'){
		self::$qCtrl['max_time']=_0s::$Memory['max_time'];
		self::$qCtrl['seg']=microtime(1)-self::$qCtrl['timeIni'];
		self::$qCtrl['get']='N'; unset(self::$qCtrl['timeIni']);
		self::$qCtrl['memoryUsage']=_To::file_getSizeText(memory_get_usage());
	}
	else{
		if(self::$qCtrl['len']>0 && self::$qCtrl['len']%100==0){
			//sleep(1/6); self::$qCtrl['sleeps']+=1;
		}
		self::$qCtrl['segAt']=microtime(1)-self::$qCtrl['timeIni'];
		if(self::$qCtrl['get']=='Y'){
			self::$qCtrl['len']+=1;
			if($qDo!=''){ self::$qCtrl[$qDo]+=1; }
		}
		else{
			self::$qCtrl['len']=$qCtrl['sleeps']=self::$qCtrl['select']=self::$qCtrl['update']=self::$qCtrl['insert']=self::$qCtrl['delete']=0;
			self::$qCtrl['memoryUsage']=0;
		}
	}
}
static public function toSe($v='',$e='like3'){
	$v = str_replace('*','%',$v);
	switch($e){
		case '=' : $t = '=\''.$v.'\''; break;
		case '!=' : $t = '!=\''.$v.'\''; break;
		case 'like' : $t = 'LIKE \''.$v.'\''; break;
		case 'like1' : $t = 'LIKE \'%'.$v.'\''; break;
		case 'like2' : $t = 'LIKE \''.$v.'%\''; break;
		case 'like3' : $t = 'LIKE \'%'.$v.'%\''; break;
		case 'notLike' : $t = 'NOT LIKE \''.$v.'\''; break;
		case 'in': $ins = '';
			$sep = explode(',',$v);
			foreach($sep as $va){ $ins .= '\''.$va.'\','; }
			$ins = substr($ins,0,-1);
			$t = 'IN ('.$ins.') ';
		break;
	}
	return $t;
}
static public function nextLimit($limit=false){
	self::$limitDef=self::$limitDefBef;
	$befLimit=self::$limitDef;
	if($limit=='null' || self::$limitFull=='Y'){
		self::$limitDef='N';
		self::$limitFull=false;
		return '';
	}
	if($limit){ self::$limitDef=$limit; }
	$P= (is_array(c::$Page))?c::$Page : array();
	$n=($P['limit'] &&$P['limit']>0)?$P['limit']:self::$limitDef;
	$p = ($P['next'] && $P['next']>0)?($P['next']-1): 0;//200,100
	$pag = ($p>0)?$n*($p).','.$n: $n;//200,100
	self::$lastPage=($P['next'])?$P['next']:1;
	return ' LIMIT '.$pag;
}
static public function dbase($C=array(),$errLine='N/D'){
	self::$numCon++;
	$C['numCon']=self::$numCon;
	{
		if($C['sql_h']){ self::$host = $C['sql_h']; } else if($C['h']){ self::$host = $C['h']; }
		if($C['sql_u']){ self::$user = $C['sql_u']; } else if($C['u']){ self::$user = $C['u']; }
		if($C['sql_p']){ self::$pass = $C['sql_p']; } else if($C['p']){ self::$pass = $C['p']; }
		if($C['sql_db']){ self::$dbase = $C['sql_db']; } else if($C['dbase']){ self::$dbase = $C['dbase'];  }
		if($C['db']){ self::$dbase = $C['db'];  }
	}
	if($_GET['__dbprint']=='Y'){ unset($_GET['__dbprint']);
		$hfrom=$_SERVER['HTTP_HOST'];
		echo 'from: '.$hfrom.' -h '.self::$host.' -db '.self::$dbase."\n";
	}
	$INF = array('null'=>'null');
	@self::$DB = $qT = new mysqli(self::$host,self::$user,self::$pass);
	if(self::$DBn!==false){ self::$DBm[self::$DBn]=self::$DB; }
	else{ self::$DBm[0]=self::$DB; }/* guardar primaria */
	if(self::$DB->connect_errno > 0){
		$errNoDB=self::$DB->connect_errno;
		$perr=self::$DB->connect_error;
		$INF['errNo'] = 1;
		$INF['error_sql']['errno'] = self::$DB->connect_errno;
		$text2= ': '.self::$DB->connect_error.' FROM phpbase';
		$text='Error en conexión a la bases de datos ('.self::$DB->connect_errno.')... '.$text2;
		if($errNoDB==1045){ $text='No se puede conectar a la base de datos con el usuario: '.preg_replace('/.*\@\'(.*)\'.*/',self::$user.'@$1',$text2).' ('.$text2.') '.$errLine; }
		else if($errNoDB==2002){ $text='Error en conexión al servidor (2002): El host no existe o rechaza la conexión: '.self::$host.' '.$errLine;}
		$INF['error']=$INF['text']=$text;
		$err++;
	}
	else if(self::$DB->errno){
			$INF['errNo'] = 1;
			$textErr='Error en conexión a la basess de datos ('.self::$DB->errno.'): '.self::$DB->error.' FROM phpbase';
		$INF['error_sql']['errno'] = self::$DB->error;
		$INF['error']=$INF['text']= $textErr;
		;
		$err++;
	}
	else{
		$qdb=self::$DB->query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = \''.self::$dbase.'\' LIMIT 1');
		if($qdb->num_rows==0){
			$INF['error_sql']['errno'] = 1;
			$INF['errNo'] = 3;
			$INF['text'] = 'Err connect, database ('.self::$dbase.') no exists.';
			$err++;
		}
	}
	if($err>0){
		$INF['js'] = _js::e(1,$INF['error']);
		if(_js::$dieResp=='die'){ print($INF); }
		else{ die(_js::e($INF)); }
		die();
	}
	mysqli_select_db(self::$DB,self::$dbase);
	self::$DB->query('SET NAMES \'utf8\'');
	//ONLY_FULL_GROUP_BY,NO_ENGINE_SUBSTITUTION,NO_UNSIGNED_SUBTRACTION
	self::$DB->query("SET SESSION sql_mode = '".c::$Db['sqlMode']."'");
	return $qT;
}
static public function qDo($q=''){
	if(preg_match('/^SELECT/is',$q)){ $qDo='select'; }
	else if(preg_match('/^UPDATE/is',$q)){ $qDo='update'; }
	else if(preg_match('/^DELETE/is',$q)){ $qDo='delete'; }
	else if(preg_match('/^INSERT/is',$q)){ $qDo='insert'; }
	return $qDo;
}
static public function delet($tbk='',$wh=''){
	if($js=_js::ise($tbk,'No se ha definido la tabla.')){ return $js; }
	else if($js=_js::ise($wh,'WHERE to delete must be declare.')){ return $js; }
	else{
		self::query('DELETE FROM '.$tbk.' WHERE '.$wh);
	}
}


static public function query($query='',$PARS=array()){
	self::$lastFetch=array();
	self::$errNo = -1; self::$err=false;
	self::$errNoText = false;
	if(self::$setRows=='Y'){ self::$numRows = -1; }
	self::$aff_rows=-1;
	if(c::$V['sqlExplain']){ 
		if(c::$V['sqlExplain']=='Arr'){
			c::$V['sqlExplain']=false;
			$q=a_sql::query('EXPLAIN '.$query);
			$tb='<table class="table_zh">';
			$n=0;
			while($L=$q->fetch_assoc()){
				if($n==0){ $n=1;
					$tb.='<thead><tr>';
					foreach($L as $k=>$v){ $tb .='<td>'.$k.'</td>'; }
					$tb.='</tr></thead><tbody>';
				}
				$tb .='<tr>';
				foreach($L as $k=>$v){ $tb .='<td>'.$v.'</td>'; }
				$tb .='</tr>';
			}
			die('ALERTJSON '.$tb.'</tbody></table><p><b>Query</b> <span class="pre">'.$query.'</span></p>');
		}
		else{ die('ALERTJSON EXPLAIN '.$query); }
	}
	$INF['query'] = $query;
	$err1_noText=(isset($PARS['err1_noText'])); unset($PARS['err1_noText']);
	if(is_array($PARS) && count($PARS)){
		$PARS['errNo'] = ($PARS['errNo'])?$PARS['errNo']:$PARS;
	}
	if($query == ''){ self::$errNo = 1; $INF['error_sql']=$INF['text'] = 'Empty Query';  }
	else{
		if(self::$DBn!==false){ self::$DB=self::$DBm[self::$DBn]; }
		else{ self::$DB=self::$DBm[0]; } /* recuperar el 0 */
		if(!self::$DB){ self::dbase(); }
		$Qu = self::$DB;
        try {
            $Query = $Qu->query($query);
        } catch (Exception $e) {
        }
		if($Qu->errno){
			if(preg_match('/SELECT.*FROM ([\w]+)\s/is',$query,$rt)){ $tbS = $rt[1]; $qDo='insert'; }
			else if(preg_match('/UPDATE ([\w]+)\s/is',$query,$rt)){ $tbS = $rt[1]; $qDo='update'; }
			else if(preg_match('/DELETE FROM ([\w]+)\s/is',$query,$rt)){ $tbS = $rt[1]; $qDo='delete'; }
			else if(preg_match('/INSERT INTO ([\w]+)\s/is',$query,$rt)){ $tbS = $rt[1]; $qDo='insert'; }
            self::$err = true; self::$errNo = 1;
			$errSql=$Qu->errno;
			$errText = '0q001 ('.$errSql.') '.$Qu->error;
			$errText = ($errSql == 1146) ? 'Table undefined. '.$errText : $errText;
			$errText = ($errSql == 1064) ? 'SQL Struct. '.$errText : $errText;
			$errText = ($errSql == 1054) ? $errText.' on \''.$tbS.'\'' : $errText;
			$errText = ($errSql == 1062) ? 'No se permiten valores duplicados '.$errText : $errText;
			$INF['error_sql'] = $errText;
			$INF['errno'] = $errSql;
			if($errSql==1062){
				$INF['errDuplicate']='Y';
				$INF['key']=preg_replace('/.*key.*\'(.*?)\'$/is','$1',$Qu->error);
			}
			$INF['text'] = $errText;
			$INF['error'] = 'Error en consulta ('.$INF['errno'].')';
		}
		else{
			$qDo=self::qDo($query); $updRows=0;
			if($qDo=='select'){
				$INF['num_rows']  = $Query->num_rows;
				/* si defino=N no almacen resultados para paginador */
				if(self::$setRows=='Y'){ self::$numRows=$INF['num_rows']; }
				if($INF['num_rows'] == 0){ self::$errNo = 2; $INF['error'] = 'No se encontraron resultados'; }
				else if($INF['num_rows'] > 0){ $INF = $Query; }
			}
			else if($qDo=='insert'){ $INF['num_rowsi'] = 1; }
			else if($qDo=='update' || $qDo=='delete'){
				$INF['aff_rows'] = $Qu->affected_rows;
				self::$aff_rows=$Qu->affected_rows;
				if($qDo=='update' && $INF['aff_rows']>0){ $updRows=$INF['aff_rows']; }
			}
			else{ $INF = $Query; }
		}
	}
	self::qCtrl(false,$qDo);
//    if (is_array($INF) && $INF['num_rows'] === 0) {
//        self::$errNo = 2;
//        $PARS['errNo'] = [2 => 'no se encontraron resultados'];
//    }

	if($PARS['errNo']){//1,2,-1,3
		$addJs=$PARS['addJs'];
		if(self::$errNo == 1 && ($PARS['errNo'][1] || $PARS['errNo']['1_'])){
			if($PARS['errNo']['1_']){ $INF['errNoText'] = self::$errNoText = _js::e(1,$PARS['errNo']['1_'],$addJs); }
			else if($err1_noText){ $INF['errNoText'] = self::$errNoText = _js::e(1,$PARS['errNo'][1],$addJs); }
			else{ $INF['errNoText'] = self::$errNoText = _js::e(1,$PARS['errNo'][1].$INF['error_sql'],$addJs); }
		}
		else if($PARS['errNo'][2] && self::$errNo == 2 && !array_key_exists('-1',$PARS['errNo'])){
			$INF['errNoText'] = self::$errNoText = _js::e(2,$PARS['errNo'][2],$addJs);
		}
		else if($PARS['errNo'][3] && $updRows==0){
			$INF['errNoText'] = self::$errNoText = _js::e(2,$PARS['errNo'][3],$addJs);
		}
		else if($PARS['errNo']['-1'] && self::$numRows>0){
			$INF = array('errNo'=>'-1');
			if(is_array($PARS['errNo']['-1_f'])){
				$k = ($PARS['errNo']['-1_f'][1])?$PARS['errNo']['-1_f'][1]:'';
				$q_f = $Query->fetch_assoc();
				$k = ($q_f[$k])?$q_f[$k]:'?';
				$text = $PARS['errNo']['-1_f'][0] . $k . $PARS['errNo']['-1_f'][2];
				$INF['errNoText'] = self::$errNoText = _js::e(3,$text,$addJs);
			}
			else{ $INF['errNoText'] = self::$errNoText = _js::e(3,$PARS['errNo']['-1'].$text,$addJs); }
		}
		if($PARS['die']){ die(self::$errNoText); }
	}
	if(self::$errNoText!=''){ self::$err=true; }
	return $INF;
}
static public function q($query='',$PARS=array()){
	return self::query($query,$PARS);
}

/* news */
static public function nextID($tb='',$P=[]){
	$nerr='(1-out)';
	if(!$P['db']){ $P['db']=c::$Sql['sql_db']; }
	if($P['AI']){
		$qF=a_sql::fetch('select MAX('.$P['AI'].')+1 id FROM '.$P['db'].'.'.$tb.' LIMIT 1',[1=>'Error obteniendo proximo consecutivo (2)',2=>'La DB o TB no existen para obtener el consecutivo (2).']);
		$nerr=' (on MAX)';
		if(a_sql::$err){ _err::err(a_sql::$errNoText); }
		else if($qF['id']<=0){ $qF['id']=1;}
	}
	else{
		$nerr='(on AI)';
		$qF=a_sql::fetch('select auto_increment id from information_schema.tables where table_schema=\''.$P['db'].'\' and table_name=\''.$tb.'\' LIMIT 1',[1=>'Error obteniendo proximo consecutivo',2=>'La DB o TB no existen para obtener el consecutivo.']);
	}
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else{
		if(_js::iseErr($qF['id'],'Error nextID on table. AI is NULL'.$nerr,'numeric>0')){ }
		else if($P['r']){ return $qF; }
		else{ return $qF['id']; }
	}
}
static public function nextAI($P=[]){
	if(!$P['db']){ $P['db']=c::$Sql['sql_db']; }
	$qF=a_sql::fetch('select auto_increment id from information_schema.tables where table_schema=\''.$P['db'].'\' and table_name=\''.$P['tb'].'\' LIMIT 1',[1=>'Error obteniendo proximo consecutivo',2=>'La DB o TB no existen para obtener el consecutivo.']);
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if($P['r']){ return $qF; }
	else{ return $qF['id']; }
}
static public function nextTokenId($P=[],$rAgain=1){
	$ori=' on[a_sql::nextToken()]'; //ide,tb,len,type
	$fie=($P['ide'])?$P['ide']:'tokenId'; //tokenId
	$tokenId=_js::numAlet($P['len'],$P['type']);// 1Z
	$qL=a_sql::fetch('SELECT '.$fie.' FROM '.$P['tb'].' WHERE '.$fie.'=\''.$tokenId.'\' LIMIT 1',[1=>'Error obtiendo tokenId.'.$ori]);
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){ _err::err('tokenId exist on '.$P['tb'].'.'.$ori,3); }
	if(!_err::$err){ return $tokenId; }
	else{
		if($rAgain>4){ _err::err('Se superaron los '.$rAgain.' de generar el tokenId en '.$P['tb'].'.'.$ori); }
		else{ return self::nextTokenId($P,$rAgain+1); }
	}
}
static public function fUnique($P=[],$txtIni){
	$fie=($P['fie'])?','.$P['fie']:'';
	$qL=a_sql::fetch('SELECT \'_blank\' _blank'.$fie.' FROM '.$P['from'].' LIMIT 1');
	if(a_sql::$errNo==1){
		$err1=($P[1])?$P[1]:$txtIni.'error verificando que valor sea único. '.$qL['text'];
		_err::err($err1,3);
	}
	else if(a_sql::$errNo==-1){
		$err1=($P[-1])?$P[-1]:$txtIni.'ya existe un registro con ese valor ('.$qL[$P['fie']].')';
		_err::err($err1,3);
	}
}
static public function ordBy2($orderBy=''){
	$ordBy=''; $tbAlias=self::$AordBy;
	switch($orderBy){
		case 'newest' : $ordBy='ORDER BY '.$tbAlias.'.dateC DESC'; break;
		case 'oldest' : $ordBy='ORDER BY '.$tbAlias.'.dateC ASC'; break;
		case 'dateCAsc' : $ordBy='ORDER BY '.$tbAlias.'.dateC ASC'; break;
		case 'dateCDesc' : $ordBy='ORDER BY '.$tbAlias.'.dateC DESC'; break;
		case 'docDateAsc' : $ordBy='ORDER BY '.$tbAlias.'.docDate ASC'; break;
		case 'docDateDesc' : $ordBy='ORDER BY '.$tbAlias.'.docDate DESC'; break;
		case 'uoldest' : $ordBy='ORDER BY '.$tbAlias.'.dateUpd ASC'; break;
		case 'unewest' : $ordBy='ORDER BY '.$tbAlias.'.dateUpd DESC'; break;
		case 'docEntryAsc' : $ordBy='ORDER BY '.$tbAlias.'.docEntry ASC'; break;
		case 'docEntryDesc' : $ordBy='ORDER BY '.$tbAlias.'.docEntry DESC'; break;
		case 'docNumAsc' : $ordBy='ORDER BY '.$tbAlias.'.docNum ASC'; break;
		case 'docNumDesc' : $ordBy='ORDER BY '.$tbAlias.'.docNum DESC'; break;
		case '' : $ordBy=''; break;
		default: $ordBy='ORDER BY '.$orderBy; break;
	}
	self::$AordBy='A';
	return $ordBy;
}
static public function _err($msg=''){
	self::$err=1;
	self::$errText=$msg;
	_err::err($msg,3);
	return false;
}

static public function xUpd($tbk,$seet,$wh='',$P=array()){
	$e1=($P[1])?$P[1].' ':'Error realizando actualización ';
	$q=self::query('UPDATE '.$tbk.' SET '.$seet.' WHERE '.$wh,[1=>$e1]);
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	return $q;
}

static public function fetchL($q='',$P=array(),$js=false){
	//k=L, $js
	$ori=' on[a_sql::fetchL()]';
	if(!$P[1]){ $P[1]='Error obteniendo información.'.$ori; }
	if($P[2]=='N'){ unset($P[2]); }
	else if(!$P[2]){ $P[2]='No se encuentraron resultados. fetchL()'; }
	$Lx=array();
	if($P['D']){ $Lx=$P['D']; }
	$lk=($P['k'])?$P['k']:false;
	if($lk){ $Lx[$lk]=array();; }//L[]
	$q=(is_string($q))?a_sql::query($q,$P):$q;
	if(a_sql::$err){ $Lx= json_decode(a_sql::$errNoText,1); }
	else if(a_sql::$errNo==-1){
		while($L=$q->fetch_assoc()){
			if($P['kf']){ $kf=$L[$P['kf']]; unset($L[$P['kf']]);
				$Lx[$kf]=$L;
			}
			else if($lk){ $Lx[$lk][]=$L; }
			else{ $Lx[]=$L; }
		}
	}
	return ($js)?_js::enc2($Lx):$Lx;
}
static public function Lrows($P=array(),$P2=array()){
	$Mx=array();
	$ordBy='';
	$err1=($P2[1])?$P2[1]:'Error obteniendo listado ';
	$err2=($P2[2])?$P2[2]:'No se encontraron resultados.';
	if($P['orderByDef']){ $ordBy='ORDER BY '.$P['orderByDef']; }
	if($P['orderBy']){ $ordBy=self::ordBy2($P['orderBy']); }
	$fromA=$P['from'];
	$whA =($P['whA'])?' '.$P['whA']:'';
	$whA =($P['wh'])?' AND ('.$P['wh'].')':$whA;
	$gBy =($P['gBy'])?' GROUP BY '.$P['gBy']:'';
	unset($P['fie'],$P['orderBy'],$P['orderByDef'],$P['__dbReportLen'],$P['._dbReportLen'],$P['from'],$P['whA'],$P['wh'],$P['gBy']);
	$wh='';
	_ADMS::_lb('sql/filter');
	if(!$omitFilt){ $wh.=a_sql_filter($P).' '; }
	$wh .=$whA;
	$q=a_sql::query('SELECT '.$fromA.' WHERE 1 '.$wh.' '.$gBy.' '.$ordBy.'',array(1=>$err1,2=>$err2));
	if(a_sql::$err){ $Lx=($ar)?json_decode(a_sql::$errNoText,1):a_sql::$errNoText; return $Lx; }
	else{
		if($P['_r']==1){ $Lx=$q->fetch_assoc(); }
		else{
			while($L=$q->fetch_assoc()){
				$Lx[]=$L;
			}
		}
	}
	if($ar){ return $Lx; }
	return _js::enc2(['L'=>$Lx]);
}

static public function rPaging($P=array(),$ar=false,$P2=array()){
	$q=self::qPaging($P,$P2); $Lx=array();
	if(_err::$err){
        return ($ar) ? json_decode(_err::$errText, 1) : _err::$errText;
    }
	else{
		if($P['_r']==1){ $Lx=$q->fetch_assoc(); }
		else if(a_sql::$errNo==-1){
			while($L=$q->fetch_assoc()){
				$Lx[]=$L;
			}
		}
	}

	if($ar){ return $Lx; }
	return _js::enc2(['L'=>$Lx]);
}
static public function qPaging($P=array(),$P2=array()){
	$Mx=array();
	$ordBy='';
	$err1=($P2[1])?$P2[1]:'Error obteniendo listado ';
	$err2=($P2[2])?$P2[2]:'No se encontraron resultados...';
	if($P['orderByDef']){ $ordBy='ORDER BY '.$P['orderByDef']; }
	if($P['orderBy']){ $ordBy=self::ordBy2($P['orderBy']); }
	if($P['__dbReportLen']=='full'){ $limit='null'; }
	else if($P['__dbReportLen'] && preg_match('/^max[0-9]+$/',$P['__dbReportLen'])){
		$limit=str_replace('max','',$P['__dbReportLen']);
	}
	else if($P['__limit']>0){ $limit=$P['__limit']; }
	$fromA=$P['from'];
	$wh='';
	$whA =($P['whA'])?' '.$P['whA']:'';
	$whA =($P['wh'])?' AND ('.$P['wh'].')':$whA;
	$gBy =($P['gBy'])?' GROUP BY '.$P['gBy']:'';
	if($P['permsBy']=='slps'){ $wh .=a_ses::ousp('slps',array('tbA'=>'A')); }
	else if($P['permsBy']=='lcs'){ $wh .=a_ses::ousp('lcs',array('tbA'=>'A')); }
	unset($P['fie'],$P['orderBy'],$P['orderByDef'],$P['__dbReportLen'],$P['._dbReportLen'],$P['from'],$P['whA'],$P['wh'],$P['gBy'],$P['__limit'],$P['permsBy']);
	_ADMS::lib('sql/filter');
	if(!$omitFilt){ $wh.=a_sql_filtByT($P).' '; }
	$wh .=$whA;
	$q=a_sql::query('SELECT '.$fromA.' WHERE 1 '.$wh.' '.$gBy.' '.$ordBy.' '.a_sql::nextLimit($limit),array(1=>$err1,));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==2 && $P2[2]!='N'){ _err::err($err2,3); }
	return $q;
}
static public function rQuery($q='',$P=array()){
	$q=a_sql::query($q,$P);
	if(a_sql::$err){ return a_sql::$errNoText; }
	else{
		if($P['_r']==1){ return _js::enc2($q->fetch_assoc()); }
		else{
			$Lx=array();
			while($L=$q->fetch_assoc()){
				$Lx[]=$L;
			}
			return _js::enc2(['L'=>$Lx]);
		}
	}
}
static public function queryJs($q='',$P=array()){
	return self::queryL($q,$P);
}
static public function queryL($q='',$P=array()){
	$err1=($P[1])?$P[1]:'Error realizando la consulta: ';
	$err2=($P[2])?$P[2]:'No se encontraron registros.';
	unset($P[1],$P[2]);
	$Lx=false;
	$q=a_sql::query($q,array(1=>$err1,2=>$err2));
	if(a_sql::$err){
		if($P['enc']!='N'){ return a_sql::$errNoText; }
		else{ return json_decode(a_sql::$errNoText,1); }
	}
	else if(a_sql::$errNo==-1){
		$Lx=($P['Mx'])?$P['Mx']:array();
		$Lx['L']=array();
		while($L=$q->fetch_assoc()){
			$Lr=array();
			if($P['k'] && $L[$P['k']]){ $L['k']=$L[$P['k']]; }
			if($P['v'] && $L[$P['v']]){ $L['v']=$L[$P['v']]; }
			if($P['ky']){
				$ky=$L[$P['ky']];
				$Lx['L'][$ky]=$L;
			}
			else{ $Lx['L'][]=$L; }
		}
		if($P['L']=='one'){ $Lx=$Lx['L'][0]; }
		if($P['L'] && $P['L']=='N'){ $Lx=$Lx['L']; }
		if($P['enc']!='N'){ $Lx=_js::enc2($Lx); }
	}
	return $Lx;
}

static public function toL($q,$P=array()){
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if(a_sql::$errNo==-1){
		$Lx=array('L'=>array());
		while($L=$q->fetch_assoc()){
			if($P['k'] && $L[$P['k']]){ $L['k']=$L[$P['k']]; }
			if($P['v'] && $L[$P['v']]){ $L['v']=$L[$P['v']]; }
			if($P['ky']){
				$ky=$L[$P['ky']];
				$Lx['L'][$ky]=$L;
			}
			else{ $Lx['L'][]=$L; }
		}
		if($P['enc']!='N'){ $Lx=_js::enc2($Lx); }
	}
	return $Lx;
}

static public function txtInsert($qus=array(),$P=array()){
	$nu=1;
	$ql='';
	$tbk=$P['tbk']; unset($P['tbk']);
	foreach($qus as $n =>$L){
		if($nu==1){/*campos */
			$q1='INSERT INTO '.$tbk.' ( ';
			foreach($L as $k=>$v){ //user=1, date=2019
				$q1 .='`'.$k.'`,';
			}
			$q1 = substr($q1,0,-1).') VALUES ';
		}
		if($nu==1){ $ql .= $q1; }
		if($nu%20==0){ $ql = substr($ql,0,-1).";\n".$q1; }
		$ql .='(';
		foreach($L as $k=>$v){
			if($P[$k]){ $v=$P[$k]; } /* _docEntry para todos */
			$ql .= '\''.$v.'\',';
		}
		$ql = substr($ql,0,-1).'),';
		$nu++;
	}
	$ql = substr($ql,0,-1).';';
	return $ql;
}
static $maxQuerys=500;
static $maxOne=40;
static public function multiInsert($tbk='',$Q=array(),$P=array()){
	$qu=a_sql::txtInsert($Q,array('tbk'=>$tbk));
	return self::multiQuery($qu,$P);
}
static public function toQuerys($Lx=array(),$P=array(),$pAdd=false){
	/* L[0]=i,u,d    L[1]=tbk
	L[2]=ud, udUpd, u, udU[userUpd,dateUpd]
	*/
	$R=''; $ori=' [on a_sql::toQuerys()]';
	$rows=count($Lx); $dateC=date('Y-m-d H:i:s');
	if($rows>self::$maxQuerys){ _err::err('No se pueden ejecutar más de '.self::$maxQuerys.' en bloque.'.$ori,3); }
	else{
		//[insert, table, qk[ud], _wh ]
		foreach($Lx as $nx => $L){
			$ty=$L[0]; $tbk=$L[1];
			if($ty=='p'){/* Consulta plana tal cual */
				$R .=$tbk.';'."\n"; continue;
			}
			//21marzo-20
			if($tbk==''){
				_err::err('q#'.$nx.': [1-tbk] debe estar definido para ejecutar.'.$ori,3);
				break;
			}
			else if(!preg_match('/^(i|r|u|s|d)$/',$ty)){
				_err::err('q#'.$nx.': [0-acc] ('.$ty.') debe estar definido para ejecutar.'.$ori,3);
				break;
			}
			//Si este campo esta, actualizar o eliminar
			if($L['_unik']){
				$_unik=($L[$L['_unik']])?true:false;
				if($_unik){
					$L[0]='u';
					$L['_wh'] = $L['_unik'].'=\''.$L[$L['_unik']].'\' '.$L['_unikWh'].' LIMIT 1';
					if($L['delete']=='Y'){ $L[0]='d'; }
				}
				else{ $L[0]='i'; }
			}
			if($L['delete']=='Y'){ $L[0]='d'; }
			//if(a_ses::$userId==1){ print_r($L); }
			unset($L['delete']); //OJO!
			switch($L[2]){
				case 'ud': $L['userId']=a_ses::$userId; $L['dateC']=$dateC; break;
				case 'udUpd':
					$L['userId']=a_ses::$userId; $L['dateC']=$dateC;
					$L['userUpd']=a_ses::$userId; $L['dateupd']=$dateC;
				break;
				case 'udU':
					$L['userUpd']=a_ses::$userId; $L['dateupd']=$dateC;
				break;
				case 'u': $L['userId']=a_ses::$userId; break;
				case 'd': $L['dateC']=$dateC; break;
			}
			if($ty=='d' && $L['_wh']==''){
				_err::err('Las consultas delete deben tener definido [_wh].'.$ori,3);
				break;
			}
			else if($ty=='u' && $L['_wh']==''){
				_err::err('Las consultas update deben tener definido [_wh].'.$ori,3);
				break;
			}
			$ty=$L[0]; $tbk=$L[1];
			$wh=($L['_wh'])?$L['_wh']:' xds=\'_WH_UNDEFINED_\' ';
			unset($L[0],$L[1],$L[2],$L['_wh'],$L['_err1'],$L['_unik'],$L['_unikWh']);
			$pAdd=($P['i'])?$P['i']:$pAdd;
			if(is_array($L)){
				if(is_array($pAdd)){
					foreach($pAdd as $k0=>$v0){
						if(is_array($v0)){
							if($v0['_tbk']==$tbk)foreach($v0 as $k1=>$v1){
								if($k1=='_tbk'){ continue; }
								$L[$k1]=$v1;
							}
						}
						else{ $L[$k0]=$v0; }
					}
				}
				$sel=$ins=$upd=''; $len=count($L)-1; $n=0;
				foreach($L as $k =>$v){
				if($ty=='s'){ $sel .=$k;  }
				else if($ty=='i' || $ty=='r'){ $sel .= $k; $ins .= '\''.addslashes($v).'\''; }
				else if($ty=='u'){
					if(preg_match('/\=$/',$k)){ $upd .=$k.''.addslashes($v).''; }
					else{ $upd .=$k.'=\''.addslashes($v).'\''; }
				}
				if($n<$len){ $sel .=','; $ins .=','; $upd .=','; }
				$n++;
			}
			}
			if($ty=='s'){ $R .='SELECT '.$sel.' FROM '.$tbk.' WHERE '.$wh.';'."\n"; }
			else if($ty=='i'){ $R .='INSERT INTO '.$tbk.' ('.$sel.') VALUES ('.$ins.');'."\n"; }
			else if($ty=='r'){ $R .='REPLACE INTO '.$tbk.' ('.$sel.') VALUES ('.$ins.');'."\n"; }
			else if($ty=='u'){ $R .='UPDATE '.$tbk.' SET '.$upd.' WHERE '.$wh.';'."\n"; }
			else if($ty=='d'){ $R .='DELETE FROM '.$tbk.' WHERE '.$wh.';'."\n"; }
		}
	}
	return $R;
}
static $affected_rows=0;
static public function multiQuery($Q=array(),$P=array(),$pAdd=false){
	$R=array('qus'=>0,'affected_rows'=>0);
	self::$affected_rows=0;//poner en 0 siempre
	$ori=' on[a_sql::multiQuery()]';
	$err1=(isset($P[1]))?$P[1]:'Una de las consultas fallo';
	$isArr=(is_array($Q));
	$qu=($isArr)?self::toQuerys($Q,$P,$pAdd):$Q;
	if($P['mReturn']){ return $qu; }
	if(_err::$err){}
	else if($qu == ''){ _err::err('Empty Query',3); }
	else{
		if(!self::$DB){ self::dbase(); }
		$Qu = self::$DB;
		$Query = @$Qu->multi_query($qu);
		$n=1;
		if($Query){
			do{ $n++; $R['qus']++; self::$affected_rows +=@$Qu->affected_rows;
			} while($Qu->more_results() && $Qu->next_result());
		}
		$errno=$Qu->errno;
		if($errno){
			$errt = $Qu->error;
			switch($errno){
				case 1146 : $errt=' [Table undefined. '.preg_replace('/\'.*\./','\'',$errt).']'; break;
				case 1064 : $errt=' [Query Struct error]'; break;
				case 1062 : $errt=' [Valor Duplicado. '.$errt.']'; break;
			}
			$s=explode("\n",$qu);
			$R['q']=$s[$n-1];
			$errT=$err1;
			if($isArr && $Q[$n-1]['_err1']){ $errT =$Q[$n-1]['_err1']; }
			_err::err($errT.': '.' (#'. $n.' / errno '.$errno.') '.$errt.$ori,3);
		}
	}
	$R['affected_rows']=self::$affected_rows;
	return $R;
}
static public function Arr2Sqls($D=array(),$P=array()){
	$NOUk=array();//evitar update de dateC,userId
	$daten=date('Y-m-d H:i:s');
	if($P['qk']=='ud'){
		$D['userId'] = a_ses::$userId; $NOUk['userId']=1;
		$D['dateC'] = $daten; $NOUk['dateC']=1;;
	}
	else if($P['qk']=='uid'){ $D['userId'] = a_ses::$userId; $NOUk['userId']=1; }
	else if($P['qk']=='dateC'){ $D['dateC'] = $daten; $NOUk['dateC']=1;; }
	unset($D['delete']); $NOREP=array();
	if($P['qku']=='ud'){ $D['userUpd'] = a_ses::$userId; $D['dateUpd'] = $daten; }
	else if($P['qku']=='d'){ $D['dateUpd'] = $daten; }
	$sel=$ins=$upd='';
	foreach($D as $kr => $v){
		$k=$kr;
		$isUpd=preg_match('/\=$/',$kr);
		if($isUpd && !$NOREP[$k]){ unset($D[$kr]);
			$k= str_replace('=','',$kr);
			if(!$NOUk[$k]){ $upd .=$k.'='.$v.', '; }
			$NOREP[$k]=$k;//evito repet on select,
		}
		else{
			$sel .= $k.',';
			$ins .= '\''.addslashes($v).'\', ';
			if(!$NOREP[$k] && !$NOUk[$k]){ $upd .=$k.'=\''.addslashes($v).'\', '; }
		}
	}
	if($P['FIELDS']){ self::$FIELDS=$D; }
	if($P['retD']){
		$D['_D']=$D; /* insert */
	}
	$sel = substr($sel,0,-1);
	$ins = substr($ins,0,-2);
	$upd = substr($upd,0,-2);
	$D['insert'] = 'INSERT INTO '.$P['tbk'].' ('.$sel.') VALUES ('.$ins.')';
	$D['select'] = 'SELECT '.$sel.' FROM '.$P['tbk'].' WHERE  '.$P['wh_change'].' ';
	$D['update'] = 'UPDATE '.$P['tbk'].' SET '.$upd.' WHERE '.$P['wh_change'].' ';
	$D['delete'] = 'DELETE FROM '.$P['tbk'].' WHERE '.$P['wh_change'].' ';
	return $D;
}

static public function uniRow($D=array(),$P=array()){
	$P['qDo']='uniRow';
	return self::oneMulti($D,$P);
}
static $FIELDS=array();
static public function oneMulti($D=array(),$P=array()){
	self::$FIELDS=array();//guardar temporalmente
	/*PARS['qDo'] noUpdateIfExist: if existe, no actualice */
	$ori =' on[a_sql::oneMulti()]';
	$qDo = $P['qDo']; unset($P['qDo']);
	if($P['tbk'] == ''){ return self::_err('(ins0001) Table name is undefined.'); }
	if(!is_array($D) || count($D) == 0){ return self::_err('DATA: No se recibieron datos.'.$ori); }
	if(array_key_exists('fieAllow',$P)){
		$noFie=a_sql::fieAllow($D,$P['fieAllow']);
		if($noFie){ self::$err=true;
			return self::_err('Error en consulta, campo '.$noFie.' no permitido.'.$ori);
		}
	}
	if(preg_match('/^(update|delete|deleteInsert|updateInsert)$/is',$qDo)){
		if(!array_key_exists('wh_change',$P)){
			return self::_err('Se debe definir wh_change.'.$ori);
		}
	}
	$just1 = ($qDo)?'Y':'N';//si es POST solamente por ejemplo
	$ins_txt_q = ' ';
	$ins_values_q = ' ';
	$DELETE = (array_key_exists('delete',$D))?true:false;
	if($DELETE && $D['delete'] == 'N'){ $DELETE=false; }
	unset($D['delete']);
	$sel_id = (array_key_exists('sel_id',$P)) ? $P['sel_id'].',' : '';
	$INFO = array('qact'=>'null','num_rows'=>0,'num_rowsi'=>0,'affected_rows'=>0,'affected'=>0,'text'=>'','step'=>'',
	'qControl_len'=>self::$qCtrl['len'],'qControl_segAt'=>self::$qCtrl['segAt']);

	{/* querys */
		$FIELDS = self::Arr2Sqls($D,$P);
		if($P['SqlsMulti']=='Y'){ self::$SqlsMulti=$FIELDS; }
		unset($P['nocampos'],$P['noUpdate']);
		if($P['get'] == 'querys'){ return $FIELDS; }
		if($P['querys'] == 'get'){ $INFO['quss']=$FIELDS; }
		if($qDo=='deleteInsert'){/* Eliminar e insertar */
			$del= self::query('DELETE FROM '.$P['tbk'].' WHERE '.$P['deleteInsert']);
			if(self::$errNo == 1){ return self::_err('Error to deleteInsert. '.$del['text']); }
			else{ $qDo='insert'; }
		}
		else if($qDo=='uniRow'){/* If exist,update then insert */
			$ori2=' on[a_sql::oneMulti() -->uniRow]';
			$sel = self::query($FIELDS['select']);
			$INFO['step'] .='s ';

			if(self::$errNo == 1){ return self::_err('Error de consulta. '.$ori2.' '.$sel['text']); }
			else if(self::$errNo==-1){
				if($DELETE){ $qDo='delete'; }
				else{ $qDo='update'; }
			}
			else{
				if($DELETE){ $qDo='BREAK'; }
				else{ $qDo='insert'; }
			}
		}
		else if($qDo == 'insertUni'){/* insert if no exists */
			$ori2=' on[a_sql::oneMulti() -->insertUni]';
			$sel = self::query($FIELDS['select']);
			$INFO['step'] .='s ';
			if(self::$err){ return self::_err('Error de consulta. '.$ori2.' '.$sel['text']); }
			else if(self::$errNo==-1){return self::_err('No se pueda realizar insert, ya existe resultado.'.$ori2); }
			else if(self::$errNo==2){ $qDo='insert'; }
		}
		else if($qDo == 'insertOrDelete'){/* insert if no existe o eliminar */
			$ori2=' on[a_sql::insert -->insertOrDelete]';
			$sel = self::query($FIELDS['select']);
			$INFO['step'] .='s ';
			if(self::$err){ return self::_err('Error de consulta. '.$sel['text'].$ori2); }
			else if(self::$errNo==-1){ $qDo='delete'; }
			else if(self::$errNo==2){ $qDo='insert'; }
		}

		if($qDo == 'insert'){
			$ins = a_sql::query($FIELDS['insert']);
			$INFO['step'] .='i, ';
			if(a_sql::$errNo == 1){ return self::_err($ins['text'].$ori); }
			else{
				$INFO['qact'] = 'insert';
				$INFO['insertId'] = a_sql::$DB->insert_id;
				$INFO['num_rowsi'] +=1;
			}
		}
		else if($qDo=='update'){
			$upd = a_sql::query($FIELDS['update']);
			$INFO['step'] .='u ';
			$INFO['qact'] = 'update';
			if(self::$errNo==1){ return self::_err($upd['text'].$ori); }
			else if(a_sql::$DB->affected_rows>0){
				$INFO['affected_rows'] = a_sql::$DB->affected_rows;
				$INFO['affected'] = a_sql::$DB->affected_rows;
				$INFO['text'] = 'Actualización correcta (1)';
			}
		}
		else if($qDo=='delete' || $DELETE){ $INFO['qact'] = 'delete';
			$del = self::query($FIELDS['delete']);
			$INFO['step'] .='d ';
			if(self::$errNo==1){ return self::_err($del['text'].$ori); }
			else{ $affect = $INFO['affected'] = a_sql::$DB->affected_rows; }
		}
	}
	/* Respuesta */
	/* P[affectedFie]: detect change on specify fields  */
	$upds=$INFO['affected']+$INFO['num_rowsi'];
	if($upds>0 && array_key_exists('affectedFie',$P)){
		$qD=$P['affectedFie']; $INFO['affectedFie']['_rows']=0;
		if($sel_q->num_rows>0){ $qD=$sel_q->fetch_assoc(); }
		foreach($P['affectedFie'] as $n => $f){
			$v=($qD[$f]!=$D[$f]);
			$INFO['affectedFie'][$f]= $v;
			if($v){ $INFO['affectedFie']['_rows']++; }
		}
	}
	$insertId = $INFO['insertId'];
	if($INFO['qact']=='null'){ self::$err=true;
		return self::_err('No se realizo ninguna acción on sql::insert');
	}
	if($P['retD'] && $qDo=='insert'){
		$INFO['_D']=$FIELDS['_D']; /*return userId,dateC */
		if($INFO['insertId']){
			$k=($P['insertId'])?$P['insertId']:'id';
			$INFO['_D'][$k]=$INFO['insertId'];
		}
	}
	return $INFO;
}
static public function qInsert($D=array(),$P=array()){
	$P['qDo']='insert';
	$ins=self::oneMulti($D,$P);
	if(is_array($ins)){ return $ins['insertId']; }
}
static public function qUpdate($D=array(),$P=array()){
	$P['qDo']='update';
	$qd=self::oneMulti($D,$P);
	if(is_array($qd)){ return $qd['affected']; }
}
/* end news */

static public function multi_query($query='',$PARS=array()){
	self::$errNo = -1; self::$err=false;
	self::$errNoText = false;
	self::$numRows = -1;
	$INF['query'] = $query;
	$err1_noText=(isset($PARS['err1_noText'])); unset($PARS['err1_noText']);
	if(count($PARS)){ $PARS['errNo'] = ($PARS['errNo'])?$PARS['errNo']:$PARS; }
	if($query == ''){ self::$errNo = 1; $INF['error_sql'] = 'Empty Query';  }
	else{
		if(!self::$DB){ self::dbase(); }
		$Qu = self::$DB;
		$Query = @$Qu->multi_query($query);
		$errno=$Qu->errno;
		if($Qu->errno){
			self::$err=true;
			self::$errNo = 1;
			$errText = '0q001 ('.$errno.') '.$Qu->error;
			$errText = ($errno == 1146) ? 'Table undefined. '.$errText : $errText;
			$errText = ($errno == 1064) ? 'SQL Struct. '.$errText : $errText;
			$errText = ($errno == 1054) ? $errText.' on \''.$tbS.'\'' : $errText;
			$INF['error_sql'] = $errText;
			$INF['errno'] = $errno;
			$INF['error'] = 'Error en consulta ('.$INF['errno'].')';
		}
		else{ $INF = $Query; }
	}
	self::qCtrl(false,$qDo);
	if($PARS['errNo']){//1,2,-1
		if(self::$errNo == 1 && ($PARS['errNo'][1] || $PARS['errNo']['1_'])){
			if($PARS['errNo']['1_']){  $INF['errNoText'] = self::$errNoText = _js::e(1,$PARS['errNo']['1_']); }
			else if($err1_noText){  $INF['errNoText'] = self::$errNoText = _js::e(1,$PARS['errNo'][1]); }
			else{ $INF['errNoText'] = self::$errNoText = _js::e(1,$PARS['errNo'][1].$INF['error_sql']); }
		}
		else if($PARS['errNo'][2] && self::$errNo == 2 && !array_key_exists('-1',$PARS['errNo'])){
			$INF['errNoText'] = self::$errNoText = _js::e(2,$PARS['errNo'][2]);
		}
		if($PARS['die']){ die(self::$errNoText); }
	}
	if(self::$errNoText!=''){ self::$err=true; }
	return $INF;
}

static public function fetch($query='',$PARS=array(),$js=false){
	$RET = array();
	$Qu = self::query($query,$PARS);
	if(a_sql::$errNo!=-1){ $RET = $Qu; }
	else{
		if($PARS['campo']){
			$q_f = $Qu->fetch_assoc();
			$RET= $q_f[$PARS['campo']];
		}
		if($PARS['byArray']){ #id para agrupar
			$k = ($PARS['byArray']);
			while($D = $Qu->fetch_assoc()){ $RET[$D[$k]] = $D; }
		}
		else{ $RET= $Qu->fetch_assoc(); }
	}
	if($js){ return _js::enc2($RET); }
	return $RET;
}
static public function JSONText($Text=''){
	$text = str_replace("\n",'',$Text);
	$text = str_replace("\t",'\t',$text);
	$text = str_replace("\r",'',$text);
	$text = preg_replace('!\\r?\\n!','', $text);
	$text = str_replace('\"','',$text);
	$text = str_replace("\'","'",$text);
	return $text;
}
static public function fields2Qu($DATOS=array(),$PARS=array()){
	$NOUk=array();//evitar update de dateC,userId
	if($PARS['qk']){ $PARS['kui']=$PARS['qk']; unset($PARS['qk']); }
	$daten=date('Y-m-d H:i:s');
	if($PARS['kui']=='uid_dateC' || $PARS['kui']=='ud'){
		$DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1;
		$DATOS['dateC'] = $daten; $NOUk['dateC']=1;;
	}
	else if($PARS['kui']=='uid'){ $DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1; }
	else if($PARS['kui']=='dateC'){
		$DATOS['dateC'] = $daten; $NOUk['dateC']=1;;
	}
	else if($PARS['kui']=='user_dateC'){
		$DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1;
		$DATOS['userName'] = a_ses::$userId; $NOUk['userName']=1;
		$DATOS['dateC'] = $daten; $NOUk['dateC']=1;;
	}
	else if($PARS['kui']=='uid_oc'){
		$DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1;
	}
	else if($PARS['kui']=='uc_dateC'){
		$DATOS['userCr'] = a_ses::$userId; $NOUk['userCr']=1;
		$DATOS['dateC'] = $daten; $NOUk['dateC']=1;;
	}
	else if($PARS['kui']=='uid_ocs'){
		$DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1;
	}
	else{
	if($PARS['user_dateC']){
		$DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1;
		$DATOS['dateC'] = $daten; $NOUk['dateC']=1;
	}
	if($PARS['u_dateFollow2']){
		$PARS['u_dateC'] = 1; $PARS['u_dateUpd'] = 1;
		$NOUk['dateC']=1;
	}
	if($PARS['userId']){ $DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1; }
	if($PARS['u']){
		$DATOS['userId'] = a_ses::$userId; $NOUk['userId']=1; $NOUk['userName']=1;
		$DATOS['userName'] = a_ses::$userName;
	}
	if($PARS['dateC']){ $DATOS['dateC'] =$daten; $NOUk['dateC']=1; }
	if($PARS['dateUpd']){
		$DATOS['dateUpd'] =$daten; $NOUk['dateC']=1; $NOUk['dateUpd']=1;
	}
	if($PARS['u_dateC']){
		$DATOS['userId'] = a_ses::$userId; $DATOS['userName'] = a_ses::$userName; $DATOS['dateC'] = date('Y-m-d H:i:s');
		$NOUk['userId']=1; $NOUk['userName']=1; $NOUk['dateC']=1;
	}
	if($PARS['u_dateUpd']){ $DATOS['userUp'] = a_ses::$userId; $DATOS['dateUpd'] =$daten; }
	if($PARS['uid_dateUpd']){ $DATOS['userUpd'] = a_ses::$userId; $DATOS['dateUpd'] =$daten; }
	if($PARS['oc_u_dateC']){
		$DATOS['userId'] = a_ses::$userId;
		$DATOS['userName'] = a_ses::$userName;
		$DATOS['dateC'] = date('Y-m-d H:i:s');
		$NOUk['userId']=1; $NOUk['userName']=1; $NOUk['dateC']=1; $NOUk['ocardId']=1;
	}
	if($PARS['ou_dateC']){
		$DATOS['userId'] = a_ses::$userId;
		$DATOS['userName'] = a_ses::$userName;
		$DATOS['dateC'] = date('Y-m-d H:i:s');
		$NOUk['userId']=1; $NOUk['userName']=1; $NOUk['dateC']=1;
	}
	if($PARS['oc_date']){
		$DATOS['dateC'] = date('Y-m-d H:i:s'); $NOUk['dateC']=1;
	}
	}
	unset($DATOS['delete']); $NOREP=array();
	if($PARS['updater']=='uid_dateC'){
		$DATOS['userUpd'] = a_ses::$userId;
		$DATOS['dateUpd'] = $daten;
	}
	foreach($DATOS as $kr => $v){
		$k=$kr; $punt=preg_match('/^\.\./',$kr);
		$updNoRep=preg_match('/^\.\_\./',$kr);
		if($updNoRep){ $k= str_replace('._.','',$k); }
		if($punt){ $k= str_replace('..','',$k); }
		//if(a_ses::$userId==1 && $updNoRep){ echo $kr.'- '; }
		$_mm=(preg_match('/^\+\-\+/',$v));
		$upd_v='\''.addslashes($v).'\'';
		if($_mm){ $upd_v=(preg_replace('/^\+\-\+/','',$v)); }
		;
		if(!$updNoRep && !$NOREP[$k]){//._. nunca estaran xk uso kr
			$sel .= $k.', ';
			$ins .= '\''.addslashes($v).'\', ';
		}
		if($updNoRep){//evito poner 2 veces
			if(!$NOUk[$k]){ $upd .=$k.'='.$upd_v.', '; }
		}
		else if($punt){ //onHand+22 = 22
			if(!$NOUk[$k]){ $upd .= $k.'='.$upd_v.', '; }
			$v=preg_replace('/^.*(\+|\-)(.*)/','$2',$v);
			$ins .= '\''.addslashes($v).'\', ';
		}
		else{
			//$ins .= '\''.addslashes($v).'\', ';
			if(!$NOREP[$k]){
				if(!$NOUk[$k]){ $upd .= ' '.$k.'='.$upd_v.', '; }
			}
		}
		if($updNoRep){ $NOUk[$k]=1; }
		$NOREP[$kr]=$kr;//evito repet on select,
	}
	if(array_key_exists('no_update',$PARS)){ $upd = '';
		$noUpd = explode(',',$PARS['no_update']);
		foreach($noUpd as $k){ unset($DATOS[$k]); }
		foreach($DATOS as $k => $v){ $upd .= ' '.$k.'=\''.addslashes($v).'\', '; }
	}
	$D['sel'] = substr($sel,0,-2);
	$D['ins'] = substr($ins,0,-2);
	$D['upd'] = substr($upd,0,-2);
	if($PARS['retD']){
		$D['_D']=$DATOS;
	}
	return $D;
}
static public function insert($DATOS=array(),$PARS=array()){
	/*PARS['qDo'] noUpdateIfExist: if existe, no actualice */
		if($PARS['POST']){ $PARS['qDo'] = 'insert'; }
	$qDo = $PARS['qDo']; unset($PARS['qDo']);
	if(array_key_exists('fieAllow',$PARS)){
		$noFie=a_sql::fieAllow($DATOS,$PARS['fieAllow']);
		if($noFie){ self::$err=true;
			return array('err'=>true,'errNo'=>3,'text'=>'Error en consulta, campo '.$noFie.' no permitido en: '.$qDo.'->a_sql::insert');
		}
	}
	if(preg_match('/^(update|delete)$/is',$qDo)){
		if(!array_key_exists('wh_change',$PARS) || !preg_match('/^WHERE/is',$PARS['wh_change'])){
			return array('err'=>true,'errNo'=>3,'text'=>'Se debe definir wh_change on '.$qDo.'->a_sql::insert');
		}
	}
	$just1 = ($qDo)?'Y':'N';//si es POST solamente por ejemplo
	$ins_txt_q = ' ';
	$ins_values_q = ' ';
	if($PARS['tbk']){ $PARS['table'] = $PARS['tbk']; }
	$table_sql = $PARS['table'];
	$alias =($PARS['A'])?$PARS['A']:'';//'I.';
	$DELETE = (array_key_exists('delete',$DATOS))?true:false;
	if($DELETE && $DATOS['delete'] == 'N'){ $DELETE=false; }
	unset($DATOS['delete']);
	$sel_id = (array_key_exists('sel_id',$PARS)) ? $PARS['sel_id'].',' : '';
	$INFO = array('qact'=>'null','num_rows'=>0,'num_rowsi'=>0,'affected_rows'=>0,'text'=>'',
	'qControl_len'=>self::$qCtrl['len'],'qControl_segAt'=>self::$qCtrl['segAt']);
	if(!is_array($DATOS) || count($DATOS) == 0){ $INFO['error'] = $INFO['err']['error_sql'] = 'DATA: No se recibieron datos'; }
	else if($table_sql == ''){ self::$err=true;
		return array('err'=>1,'errNo'=>1,'text'=>'(ins0001) Table name is undefined.');
	}
	else if($PARS['_OC'] && ($PARS['_OC']['kid']=='' || $PARS['_OC']['objt']=='')){ self::$err=true;
		return array('err'=>1,'errNo'=>1,'text'=>'(ins0002) _OC error: must be declare. kid='.$PARS['_OC']['kid'].', objt='.$PARS['_OC']['objt']);
	}
	else{
		unset($DATOS['__BLANK']);
		$FIELDS = self::fields2Qu($DATOS,$PARS);
		$fields_txt_q = $FIELDS['sel'];
		$ins_txt_q = $FIELDS['ins'];
		$upd_values_q = $FIELDS['upd'];
		unset($PARS['nocampos'],$PARS['no_update']);
		$INFO['insert'] = 'INSERT INTO '.$table_sql.' ('.$fields_txt_q.') VALUES ('.$ins_txt_q.')';
		$INFO['select'] = 'SELECT '.$sel_id.$fields_txt_q.' FROM '.$table_sql.' '.$alias.' '.$PARS['wh_change'].' ';
		$INFO['update'] = 'UPDATE '.$table_sql.' '.$alias.' SET '.$upd_values_q.' '.$PARS['wh_change'].' ';
		$INFO['delete'] = 'DELETE FROM '.$table_sql.' '.$alias.' '.$PARS['wh_change'].' ';
		if($PARS['get'] == 'querys'){ return $INFO; }
		if($PARS['deleteInsert']){
			$ins_q = a_sql::query('DELETE FROM '.$table_sql.' '.$alias.' WHERE '.$PARS['deleteInsert']);
			if(a_sql::$errNo == 1){
				self::$err=true;
				return array('err'=>1,'errNo'=>1,'text'=>'Error to deleteInsert: '.$ins_q['error_sql']);
			}
			$qDo='insert';
		}
		if($qDo == 'insert' || $PARS['POST'] == true){
			$ins_q = a_sql::query($INFO['insert']);
			if(a_sql::$errNo == 1){ $INFO = array('err'=>$ins_q); }
			else{
				$INFO['qact'] = 'insert';
				$INFO['insertId'] = a_sql::$DB->insert_id;
				$INFO['num_rowsi'] +=1;
			}
		}
		else if($qDo == 'insertUni'){/* insert if no existe */
			$ori2=' on[a_sql::insert -->insertUni]';
			$sel_q = a_sql::query($INFO['select'],array(1=>'Error de consulta. '.$ori2));
			if(a_sql::$err){
				$INFO['err']=$sel_q; $INFO['text']=a_sql::$errNoText;
			}
			else if(a_sql::$errNo==-1){ $INFO['qact'] = 'noInsertUni'; }
			else if(a_sql::$errNo==2){
				$ins_q = a_sql::query($INFO['insert']);
				if(a_sql::$errNo == 1){ $INFO = array('err'=>$ins_q); }
				else{
					$INFO['qact'] = 'insert';
					$INFO['insertId'] = a_sql::$DB->insert_id;
					$INFO['num_rowsi'] +=1;
				}
			}
		}
		else if($qDo == 'insertOrDelete'){/* insert if no existe */
			$ori2=' on[a_sql::insert -->insertOrDelete]';
			$sel_q = a_sql::query($INFO['select'],array(1=>'Error de consulta. '.$ori2));
			if(a_sql::$err){
				$INFO['err']=$sel_q; $INFO['text']=a_sql::$errNoText;
			}
			else if(a_sql::$errNo==-1){ $INFO['qact'] = 'deleteInsert';
				$del_q = self::query($INFO['delete']);
				if(self::$errNo==1){ $INFO['err'] = $del_q; }
				else{ $affect = $INFO['affected_rows'] = a_sql::$DB->affected_rows; }
			}
			else if(a_sql::$errNo==2){
				$ins_q = a_sql::query($INFO['insert']);
				if(a_sql::$errNo == 1){ $INFO = array('err'=>$ins_q); }
				else{
					$INFO['qact'] = 'insert';
					$INFO['insertId'] = a_sql::$DB->insert_id;
					$INFO['num_rowsi'] +=1;
				}
			}
		}
		else if($qDo=='update'){
			$upd_q = a_sql::query($INFO['update']); $INFO['qact'] = 'update';
			if(self::$errNo==1){ $INFO['err'] = $upd_q; }
			else if(a_sql::$DB->affected_rows>0){
				$INFO['affected_rows'] = a_sql::$DB->affected_rows;
				$INFO['text'] = 'Actualización correcta (1)';
			}
		}
		else if($qDo=='delete' || $DELETE){ $INFO['qact'] = 'delete';
			$del_q = self::query($INFO['delete']);
			if(self::$errNo==1){ $INFO['err'] = $del_q; }
			else{ $affect = $INFO['affected_rows'] = a_sql::$DB->affected_rows; }
		}
		else{
			$INFO['qact'] = 'select';
			$sel_q = a_sql::query($INFO['select']);
			if(self::$errNo==1){ $INFO['err'] = $sel_q; }
			else if($sel_q->num_rows >0){//update
				$INFO['num_rows'] = $sel_q->num_rows;
				if(array_key_exists('getFieSel',$PARS)){ $sFe = $sel_q->fetch_assoc(); $INFO['getFieSel'] = $sFe[$PARS['getFieSel']]; }
				if($PARS['getSel']){ $INFO['getSel'] = $sel_q->fetch_assoc(); }
				if($qDo=='noUpdateIfExist'){ $INFO['qDo'] = $qDo; }
				else{
					$upd_q = a_sql::query($INFO['update']);
					if(self::$errNo==1){ $INFO['text'] = $upd_q['error']; $INFO['err'] = $upd_q; }
					else if(a_sql::$DB->affected_rows>0){
						$INFO['qact'] = 'update';
						$INFO['affected_rows'] = a_sql::$DB->affected_rows;
						$INFO['text'] = 'Actualizado correctamente (2)';
					}
				}
			}
			else{//insert
				$ins_q = a_sql::query($INFO['insert']);
				if(self::$errNo==1){ $INFO['err'] = $ins_q; }
				else{
					$INFO['qact'] ='insert';
					$INFO['insertId'] = a_sql::$DB->insert_id;
					$INFO['num_rowsi'] +=1;
					$INFO['text'] = 'Insert ok (Not exists, then insert)';
				}
			}
		}
	}
	//query ok, then error if
	if($PARS['jsdie_err'] && $INFO['err']){
		die(_js::e(1,$PARS['jsdie_err'].$INFO['err']['error_sql']));
	}
	if($INFO['err']){ $INFO['errNo']=1; $INFO['text'] = $INFO['err']['error_sql']; }
	if(array_key_exists('errNo',$PARS) && $INFO['err']){
		switch($INFO['errNo']){
			case '-1': $js= _js::r($PARS['errNo']['-1']); break;
			case 1: $js= _js::e(1,$PARS['errNo'][1].' '.$INFO['text']); break;
			case 2: $js= _js::e(2,$PARS['errNo'][2]); break;
			default: $js=_js::e($INFO); break;
		}
		$INFO['js'] = $js;
	}
	/* detect change on specify fields */
	$upds=$INFO['affected_rows']+$INFO['num_rowsi'];
	if($upds>0 && array_key_exists('affectedFie',$PARS)){
		$qD=$PARS['affectedFie']; $INFO['affectedFie']['_rows']=0;
		if($sel_q->num_rows>0){ $qD=$sel_q->fetch_assoc(); }
		foreach($PARS['affectedFie'] as $n => $f){
			$v=($qD[$f]!=$DATOS[$f]);
			$INFO['affectedFie'][$f]= $v;
			if($v){ $INFO['affectedFie']['_rows']++; }
		}
	}
	/* CREATE OBJECT ON {OBJ_OCTR} ocardId, osocId, objt, objr [objt y kid]*/
	$insertId = $INFO['insertId'];
	if($INFO['qact']=='null'){ self::$err=true;
		return array('err'=>1,'errNo'=>1,'text'=>'No se realizo ninguna acción on sql::insert');
	}
	if($INFO['qact']=='insert' && $PARS['_OC']){
		_ADMS::_lb('_OC');
		$OC=$PARS['_OC'];//1. get next number
		$handNum=_OC::insertId(array('objt'=>$OC['objt']));//next handNum+1
		if(is_array($handNum) && $handNum['err']){ $INFO=$handNum; }
		else{//2. insertar numero en octr
		$OC['objr']=$insertId; $OC['handNum']=$handNum;
		unset($OC['kid']);
		$ins2 = _OC::post($OC);//create insertId,handNum
		if($ins2['err']){
			$del=a_sql::query('DELETE FROM '.$table_sql.' WHERE '.$OC['kid'].'=\''.$insertId.'\' LIMIT 1');
			$ins2['text'] = '(ins0003) Error _OC delete-kid='.$insertId.': '.$ins2['text'];
			$INFO = $ins2;
		}
		else{ $INFO['_OC'] = array('objId'=>$ins2['insertId'],'handNum'=>$handNum); }
		}
	}
	if($PARS['retD']){
		$INFO['_D']=$FIELDS['_D']; /*return userId,dateC */
		if($INFO['insertId']){
			$k=($PARS['insertId'])?$PARS['insertId']:'id';
			$INFO['_D'][$k]=$INFO['insertId'];
		}
	}
	return $INFO;
}
static public function ordBy($ordText=''){
	#id.DESC,name.ASC
	$vP = explode(',',$ordText); $ordBy = '';
	foreach($vP as $D){ preg_match('/(.*)\.(ASC|DESC)/is',$D,$sep);;
		$ordBy .= $sep[1].' '.$sep[2].',';
	}
	$ordBy = substr($ordBy,0,-1);
	return $ordBy;
}
static public function deletes($D=array()){
	foreach($D as $n => $L){
		$wh=($L['wh']!='')?$L['wh']:'error_no_wh_delete';
		$lim=($L['l'])? 'LIMIT '.$L['l']*1: 'LIMIT 1';
		$lim=($L['l']=='all')?'':$lim;
		$q = self::query('DELETE FROM '.$L['tbk'].' WHERE '.$wh.' '.$lim);
	}
}
static public function freeR($li){
	mysqli_free_result($li);
}
static public function valueFrom($P=array()){
	$q=a_sql::fetch('SELECT '.$P['f'].' FROM '.$P['tbk'].' WHERE '.$P['wh'].' LIMIT 1',$P['err']);
	if(a_sql::$errNoText!=''){ return false; }
	return $q;
}
static public function noExists($P=array()){
	$whO=($P['owh'])?a_ses::get_owh('',$P['owh']):'';
	$fie=$P['fie'];
	$err2=($P[2])?$P[2]:'El recurso consultado no existe.';
	$q=a_sql::query('SELECT '.$fie.' FROM '.$P['tbk'].' WHERE '.$P['wh'].' '.$whO.' LIMIT 1',array(1=>'Error en consulta noExists: ',2=>$err2));
	if(a_sql::$err){ return a_sql::$errNoText; }
	if($P['lastFetch']=='Y'){ self::$lastFetch=$q->fetch_assoc(); }
	return false;
}

static public function fieAllow($D=array(),$P=''){
	$r=false; $P2=array();
	$P=explode(',',$P);
	if(is_array($P)) foreach($P as $n => $k){ $P2[$k]=$k; } unset($P);
	foreach($D as $k => $v){
		if(!array_key_exists($k,$P2)){ $r=$k; break; }
	}
	return $r;
}

static public function getL($P=array(),$P2=array()){
	//from,wh,orderBy
	$ordBy='';
	if($P['orderBy']){
		switch($P['orderBy']){
			default: $ordBy='ORDER BY A.docDate DESC, A.docEntry DESC'; break;
			case 'docDateAsc' : $ordBy='ORDER BY A.docDate ASC, A.docEntry ASC'; break;
			case 'dateCAsc' : $ordBy='ORDER BY A.dateC ASC'; break;
			case 'dateCDesc' : $ordBy='ORDER BY A.dateC DESC'; break;
			case 'docTotalAsc' : $ordBy='ORDER BY A.docTotal ASC'; break;
			case 'docTotalDesc' : $ordBy='ORDER BY A.docTotal DESC'; break;
			case 'docEntryAsc' : $ordBy='ORDER BY A.docEntry ASC'; break;
			case 'docEntryDesc' : $ordBy='ORDER BY A.docEntry DESC'; break;
			case 'system' : $ordBy=''; break;
		}
	}
	if(array_key_exists('slps',$P2)){
		if($P2['slps']=='Y'){ $slps=a_ses::U_slpIds(array('f'=>'A.slpId','r'=>'a')); }
		else { $slps=array('join'=>'LEFT JOIN par_oslp S ON (S.slpId=A.slpId) '); }
	}
	if($P['__dbReportLen']=='full'){ $limit='null'; }
	$fromA=$P['from'];
	$wh=''; _ADMS::lib('sql/filter');
	if(is_array($P['wh'])){ $wh .=a_sql_filtByT($P['wh']); }
	else if($P['wh']){ $wh .=$P['wh']; }
	unset($P['fie'],$P['orderBy'],$P['__dbReportLen'],$P['from'],$P['wh']);
	$wh .=a_sql_filtByT($P);
	$err1=($P2[1])?$P2[1]:'Error obteniendo listado : ';
	$err2=($P2[2])?$P2[2]:'No se encontraron resultados.';
	$q=a_sql::query('SELECT '.$fromA.' '.$slps['join'].' WHERE 1 '.$slps['wh'].' '.$wh.' '.$ordBy.' '.a_sql::nextLimit($limit),array(1=>$err1,2=>$err2));
	$js=false;
	if(a_sql::$err){ $js=a_sql::$errNoText; }
	else{ $Mx=array('L'=>array());
		while($L=$q->fetch_assoc()){
			$Mx['L'][]=$L;
		}
		$js=_js::enc($Mx);
	}
	return $js;
}

static public function quTrans($Qs=array()){
	$errs=0; $nl=1;
	foreach($Qs as $n=> $L){
		$q=$L['q']; unset($L['q']); $ln='qL #'.$nl.': '; $nl++;
		$err1=($L[1])?$ln.$L[1]:$ln.'Error en consulta (err-1)';
		if($q=='::insert'){
			$ins=a_sql::insert($L['D'],$L['D2']);
			if($ins['err']){ $js=_js::e($err1.' :: '.$ins['text']); $errs++; break; }
		}
		else{
			$q=a_sql::query($q,$L);
			if(a_sql::$err){ $js=a_sql::$errNoText; $errs++; break; }
			else if(a_sql::$errNo==1){ $js=_js::e(3,$err1); $errs++; break; }
		}
	}
	if($errs>0){ _err::err($js); return false; }
	return true;
}

static public function filters($ty='',$v=''){
	if($ty=='IN'){
		$sep = explode(',',$v); 
		$ins='';
		foreach($sep as $va){ $ins .= '\''.$va.'\','; }
		return ' ('.substr($ins,0,-1).') ';
	}
}
static public function duplicat($P=array()){
	$ori=' on[a_sql::duplicat]';
	$q=self::query('SELECT * FROM '.$P['tbk'].' WHERE '.$P['wh'].' LIMIT 1',array(1=>'Error obteniendo información para duplicar'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		$noFie=explode(',',$P['noFie']);
		$L=$q->fetch_assoc();
		foreach($noFie as $k){ unset($L[$k]); }
		if(is_array($P['fN'])) foreach($P['fN'] as $k=>$v){ $L[$k]=$v; }
		//$qi=self::insert($L,array('table'=>$P['tbk'],'qDo'=>'insert'));
		if($qi['err']){ _err::err('Error duplicando '.$ori.': '.$qi['text']);}
	}
}
static public function duplicatGet($P=array()){
	$ori=' on[a_sql::duplicat]';
	$L=array();
	$q=self::query('SELECT * FROM '.$P['tbk'].' WHERE '.$P['wh'].' LIMIT 1',array(1=>'Error obteniendo información para duplicar'.$ori));
	if(a_sql::$err){ _err::err(a_sql::$errNoText); }
	else if(a_sql::$errNo==-1){
		$noFie=explode(',',$P['noFie']);
		$L=$q->fetch_assoc();
		foreach($noFie as $k){ unset($L[$k]); }
		if(is_array($P['fN'])) foreach($P['fN'] as $k=>$v){ $L[$k]=$v; }
	}
	return $L;
}

/* object */

static public function pagingSet($P=array()){
	$P['__limitDef'] = self::$limitDef;
	$P['__lastPage'] = self::$lastPage;
	if(!array_key_exists('rows',$P)){ $P['__rows'] = self::$numRows; }
	if(self::$limitDef=='N'){ $P['__nextPager'] = 'N'; }
	//else if($P['rows']==a_sql::$limitDef || $P['lastPage']>0){ $P['__nextPager'] = 'Y'; }
	else if(($P['__rows']+1)>a_sql::$limitDef && a_sql::$limitDef>0){ $js['__nextPager'] = 'Y'; }
	return $P;
}
static public function pagingRows($q='',$P=array()){
	$err1=($P[1])?$P[1]:'Error realizando la consulta: ';
	$err2=($P[2])?$P[2]:'No se encontraron registros.';
	unset($P[1],$P[2]);
	$Lx=false;
	if($P['__dbReportLen']=='full'){ $limit='null'; }
	$q=a_sql::query($q.' '.a_sql::nextLimit($limit),array(1=>$err1,2=>$err2));
	if(a_sql::$err){ return a_sql::$errNoText; }
	else if(a_sql::$errNo==-1){
		$Lx=array('L'=>[]);
		while($L=$q->fetch_assoc()){
			$Lx['L'][]=$L;
		}
		$Lx=json_encode(self::pagingSet($Lx));
	}
	return $Lx;
}

}
?>