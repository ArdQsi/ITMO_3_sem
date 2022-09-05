<?php

function validateX($x){
    $xMin = -5;
    $xMax = 3;

    if (!isset($x)) {
        return false;
    }

    return is_numeric($x) and $x >= $xMin and $x <= $xMax;
}

function validateY($y){
    return isset($y);
}

function validateR($r){
    $rMin = 1;
    $rMax = 4;

    if (!isset($r)) {
        return false;
    }

    return is_numeric($r) and $r >= $rMin and $r <= $rMax;
}


function validateForm($x, $y, $r) {
    return validateX($x) && validateY($y) && validateR($r);
}

function checkCircle($x, $y, $r) {
    return $x <= 0 && $y >= 0 && pow($x,2) + pow($y,2) <= pow($r, 2);
}


function checkTriangle($x, $y, $r) {
    return $x >= 0 && $y >= 0 && $x-$r <= -($y);
}

function checkRectangle($x, $y, $r) {
    return $x >= 0 && $y <=0 && $x <= $r/2 && $y <= $r;
}

function checkHit($x, $y, $r) {
    return checkCircle($x, $y, $r) or checkRectangle($x, $y, $r) or checkRectangle($x, $y, $r);
}

$xVal = $_GET['xval'];
$yVal = $_GET['yval'];
$rVal = $_GET['rval'];

$isHit = checkHit($xVal, $yVal, $rVal) ? 'true' : 'false';
date_default_timezone_set('Europe/Moscow');
$currentTime = date("H:i:s");
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
$isValid = validateForm($xVal, $yVal, $rVal);

$jsonData = '{' .   
    "\"validate\":$isValid," .
    "\"xval\":\"$xVal\"," .
    "\"yval\":\"$yVal\"," .
    "\"rval\":\"$rVal\"," .
    "\"curtime\":\"$currentTime\"," .
    "\"exectime\":\"$executionTime\"," .
    "\"hitres\":$isHit" .
    "}";

echo $jsonData;
