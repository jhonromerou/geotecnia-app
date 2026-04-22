<?php
function btnHead(){
	echo '<div style="padding:0.375rem; 0;" class="no-print">
	<input type="button" value="Imprimir" class="btnAddText iBg_print" onclick="print();"/>
	</div>';
}

function print_format_ISO($code='RE-PN',$style=''){
 $format_q = a_sql::fetch('SELECT * FROM dt_calidad.iso_format WHERE code=\''.$code.'\' ');
 $codigo = $format_q['code'];
 $version  = $format_q['version'];
 $top_type = strtoupper($format_q['type']);
 $registro_text  = $format_q['descrip'];
 $fcreate = substr($format_q['fcreate'],0,10);
 $fupdate = substr($format_q['fupdate'],0,10);
 return '<table class="ISO_format" style="'.$style.'">
  <tr style="display:none !important;"><td></td></tr>
<tr>
 <td rowspan="4" colspan="3" style="width:150px;">
  <img src="/img/logoformat.jpg" />
 </td>
 <td colspan="2" style="text-align:center;"><b>'.$top_type.'</b></td>
 <td colspan="2"><b>CODIGO</b></td>
 <td><b>'.$codigo.'</b></td>
</tr>
<tr>
 <td rowspan="3" colspan="2" style="text-align:center;"><b style="">'.$registro_text.'</b></td>
 <td colspan="2">Versión</td>
 <td colspan="2">'.$version.'</td>
</tr>
<tr>
 <td rowspan="2" colspan="2"><b>Fec. Elaboración:</b><br />'.$fcreate.'</td>
 <td rowspan="2" colspan="2"><b>Fec. Última Revisión:</b><br />'.$fupdate.'</td>
</tr>
</table>';
}

?>