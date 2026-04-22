<?php
class JBarcode{
	static $path='';
	static public function get($D=array()){
		if($D['text']==''){ 'error-(1)'; _err::err('El código debe definirse para generar la imagen',3); }
		else{
			$type=($D['type'])?$D['type']:'code128';
			$code=self::load($type);
			self::draw($code,$D);
		}
	}
	static public function load($type=''){
		$code=array();
		require_once(self::$path.'class/BCGFontFile.php');
		require_once(self::$path.'class/BCGColor.php');
		require_once(self::$path.'class/BCGDrawing.php');
		if($type=='code39'){
			require_once(self::$path.'class/BCGcode39.barcode.php');
			$code=new BCGcode39();
		}
		else if($type=='code128'){
			require_once(self::$path.'class/BCGcode128.barcode.php');
			$code=new BCGcode128();
		}
		return $code;
	}
	static public function draw($code,$D){
		$width = isset($D['w']) ? $D['w'] : 2;
		$height = isset($D['h']) ? $D['h'] : 30;
		$drawException = null;
		// Loading Font
		$font = self::setFont($D);
		// The arguments are R, G, B for color.
		$col1=new BCGColor(0, 0, 0);
		$col2=new BCGColor(255, 255, 255);
		$bgCol=new BCGColor(255,255,255);
		try {
			$code->setScale($width); // Resolution
			$code->setThickness($height);/// aumenta con fuente
			$code->setForegroundColor($col1); // Color of bars
			$code->setBackgroundColor($col2); // Color of spaces
			$code->setFont($font); // Font (or 0)
			if($D['hidden']=='Y'){ $code->setLabel(''); }
			$code->parse($D['text']); // Text
		}catch(Exception $exception){
			$drawException = $exception;
		}
		/* Here is the list of the arguments
		1 - Filename (empty : display on screen)
		2 - Background color */
		$drawing = new BCGDrawing('', $bgCol);
		if($drawException){
			$drawing->drawException($drawException);
		} else {
						$drawing->setBarcode($code);
						$drawing->draw();
		}
		// Header that says it is an image (remove it if you save the barcode to a file)
		header('Content-Type: image/png');
		header('Content-Disposition: inline; filename="barcode.png"');
		// Draw (or save) the image into PNG format.
		$drawing->finish(BCGDrawing::IMG_FORMAT_PNG);
	}
	static public function setFont($D){
		$fSize=($D['fSize'])?$D['fSize']:14;
		$fFamily=($D['fFamily'])?$D['fFamily']:'Arial.ttf';
		$font=new BCGFontFile(self::$path.'font/'.$fFamily, $fSize);
		return $font;
	}
}
JBarcode::$path=c::$V['PATH_libexterna'].'JBarcode/';

?>
