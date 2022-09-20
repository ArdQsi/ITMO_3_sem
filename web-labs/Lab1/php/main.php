<?php
session_start();
?>

<table id="content-table">
    <tr class="table-header">
        <th class="coordinates-col">X</th>
        <th class="coordinates-col">Y</th>
        <th class="coordinates-col">R</th>
        <th class="time-col">Current time</th>
        <th class="time-col">Execution time</th>
        <th class="hit-col">Hit result</th>
    </tr>

    <?php
    function validateX($x)
    {
        $xMin = -5;
        $xMax = 3;

        return is_numeric($x) and $x >= $xMin and $x <= $xMax;
    }

    function validateY($y)
    {
        return is_numeric($y);
    }

    function validateR($r)
    {
        $rMin = 1;
        $rMax = 4;

        if (!isset($r)) {
            return false;
        }

        return is_numeric($r) and $r >= $rMin and $r <= $rMax;
    }


    function validateForm($x, $y, $r)
    {
        return validateX($x) && validateY($y) && validateR($r);
    }

    function checkCircle($x, $y, $r)
    {
        return $x <= 0 && $y >= 0 && pow($x, 2) + pow($y, 2) <= pow($r, 2);
    }

    function checkTriangle($x, $y, $r)
    {
        return $x >= 0 && $y >= 0 && $x - $r <= - ($y);
    }

    function checkRectangle($x, $y, $r)
    {
        return $x >= 0 && $y <= 0 && $x <= $r / 2 && $y <= $r;
    }

    function checkHit($x, $y, $r)
    {
        return checkCircle($x, $y, $r) or checkRectangle($x, $y, $r) or checkRectangle($x, $y, $r);
    }

    $_SESSION['x'][] = null;
    $_SESSION['y'][] = null;
    $_SESSION['r'][] = null;
    $_SESSION['curtime'][] = null;
    $_SESSION['exectime'][] = null;
    $_SESSION['hitres'][] = null;
    

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $xVal = str_replace(",", ".", $_GET['xval']);
        $yVal = str_replace(",", ".", $_GET['yval']);
        $rVal = str_replace(",", ".", $_GET['rval']);
        $timezoneOffset = $_GET['timeZone'];

        if (validateForm($xVal, $yVal, $rVal)) {
            $isHit = checkHit($xVal, $yVal, $rVal) ? 'true' : 'false';
            $currentTime = date('H:i:s', time()-$timezoneOffset*60-2*3600);
            $executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

            $_SESSION['x'][] = $xVal;
            $_SESSION['y'][] = $yVal;
            $_SESSION['r'][] = $rVal;
            $_SESSION['curtime'][] = $currentTime;
            $_SESSION['exectime'][] = $executionTime;
            $_SESSION['hitres'][] = $isHit;
        }
    }
    

    $table = '';
    for ($i = 0; $i < count($_SESSION['x']); $i++) {
        if (!$_SESSION['x'][$i]==null){
        $table .=  '<tr><td class="coordinates-col">' . $_SESSION['x'][$i] . '</td><td class="coordinates-col">' . $_SESSION['y'][$i] . '</td><td class="coordinates-col">' .
            $_SESSION['r'][$i] . '</td><td class = "time-col">' . $_SESSION['curtime'][$i] . '</td><td class = "time-col">' . $_SESSION['exectime'][$i] . '</td><td class="hit-col">' .
            $_SESSION['hitres'][$i] . '</td></tr>';
        }
    }
    echo $table;
    ?>
</table>