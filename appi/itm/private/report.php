<?php
JRoute::get('itm/report', function ($D) {
    _ADMS::lib('sql/filter');
    $filtersMappers = [
        'item_type' => 'I.itemType',
        'webStatus' => 'I.webStatus',
        'group_id' => 'I.itemGr'
    ];

    $filters = [];
    foreach ($filtersMappers as $key => $filter) {
        $value = $D[$key];
        if ($value != '') {
            $filters[$filter] = $value;
        }
    }
    $vt = $D['viewType'];
    $query = 'SELECT I.* FROM itm_oitm I WHERE 1 ' . a_sql_filtByT($filters) . ' LIMIT 1000';
    return a_sql::fetchL($query,
        ['k' => 'L',
         'D' => ['_view' => $vt]], true);
}, []);