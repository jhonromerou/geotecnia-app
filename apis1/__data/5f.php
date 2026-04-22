<?php
header('Content-Type: application/json');
_ADMS::_lb('com/_5f,com/_5o,com/_6');
$D= $_POST;
if($ADMS_KEY == 'fireb'){
_ADMS::_lb('com/_5f2');
if($ADMS_KEYo[1] == 'review' && $ADMS_MET == 'PUT') echo _5f2::putReview($_POST);
else{
if($ADMS_MET == 'PUT') echo _5f2::put($_POST);
}
}

else if($ADMS_KEY == 'o' && $ADMS_KEYo[1] =='byId'){
if($ADMS_MET == 'DELETE') echo _5f::deleteById($D); 
}

else if($ADMS_KEY == 'Sea'){
_ADMS::_lb('com/_5f2');
if($ADMS_KEYo[1] == 'fim' && $ADMS_MET == 'GET') echo _5f::Sea_fim($D);
}

else{
_5f::$rootPATH = $rootPATH;
if($ADMS_KEY == '__upload'){ echo _5f::put($_POST); }
else if($ADMS_MET == 'GET') echo _5f::get($_POST);
else if($ADMS_MET == 'DELETE') echo _5f::deleteSave($_POST); 
else if($ADMS->ACCESS == 'byId'){
	if($ADMS_MET == 'DELETE') echo _5f::deleteSave($_GET); 
}

}
?>