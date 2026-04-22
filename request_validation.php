<?php
if ($_GET['ADMS_ocardcode']) {
    $ocardcode = $_GET['ADMS_ocardcode'];
} else {
    $ocardcode = a_ses::ocardcode();
}

if (!$ocardcode) {
    die(_js::e(3, 'cardcode from tooken undefined on __1_rest_2'));
}
