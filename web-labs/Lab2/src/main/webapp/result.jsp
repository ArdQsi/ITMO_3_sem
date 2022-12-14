<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="rus">
<head>
    <meta charset="UTF-8">
    <title>
        Web_Lab_2
    </title>
    <link rel="stylesheet" href="./css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>

<section class="main_container_item content_table">
    <h2 class="content_item content-table-header">
        Таблица
    </h2>
    <div class="table_result_container">
        <table class="table_result">
            <tr class="table_result_header">
                <th class="result_x">X</th>
                <th class="result_y">Y</th>
                <th class="result_r">R</th>
                <th class="time">Время запроса</th>
                <th class="executionTime">Время выполнения</th>
                <th class="hit">Результат работы</th>
            </tr>


            <c:forEach var="row" items="${rows}">
                <tr>${row}</tr>
            </c:forEach>
        </table>
    </div>
</section>


<form action="${pageContext.request.contextPath}/controller" method="GET">

    <div id="m-booked-weather-bl250-32566">
        <div class="booked-wzs-250-175 weather-customize" style="background-color:#137AE9;width:160px;" id="width1">
            <div class="booked-wzs-250-175_in">
                <div class="booked-wzs-250-175-data">
                    <div class="booked-wzs-250-175-left-img wrz-18"></div>
                    <div class="booked-wzs-250-175-right">
                        <div class="booked-wzs-day-deck">
                            <div class="booked-wzs-day-val">
                                <div class="booked-wzs-day-number"><span class="plus">+</span>9</div>
                                <div class="booked-wzs-day-dergee">
                                    <div class="booked-wzs-day-dergee-val">&deg;</div>
                                    <div class="booked-wzs-day-dergee-name">C</div>
                                </div>
                            </div>
                            <div class="booked-wzs-day">
                                <div class="booked-wzs-day-d">H: <span class="plus">+</span>9&deg;</div>
                                <div class="booked-wzs-day-n">L: <span class="plus">+</span>7&deg;</div>
                            </div>
                        </div>
                        <div class="booked-wzs-250-175-info">
                            <div class="booked-wzs-250-175-city smolest">Санкт-Петербург</div>
                            <div class="booked-wzs-250-175-date">Вторник, 18 Октябрь</div>
                            <div class="booked-wzs-left"><span class="booked-wzs-bottom-l">Прогноз на неделю</span>
                            </div>
                        </div>
                    </div>
                </div>
                <table cellpadding="0" cellspacing="0" class="booked-wzs-table-250">
                    <tr>
                        <td>Пн</td>
                        <td>Ср</td>
                        <td>Чт</td>
                        <td>Пт</td>
                        <td>Сб</td>
                        <td>Вс</td>
                    </tr>
                    <tr>
                        <td class="week-day-ico">
                            <div class="wrz-sml wrzs-18"></div>
                        </td>
                        <td class="week-day-ico">
                            <div class="wrz-sml wrzs-18"></div>
                        </td>
                        <td class="week-day-ico">
                            <div class="wrz-sml wrzs-03"></div>
                        </td>
                        <td class="week-day-ico">
                            <div class="wrz-sml wrzs-18"></div>
                        </td>
                        <td class="week-day-ico">
                            <div class="wrz-sml wrzs-03"></div>
                        </td>
                        <td class="week-day-ico">
                            <div class="wrz-sml wrzs-03"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="week-day-val"><span class="plus">+</span>13&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>7&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>7&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>8&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>8&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>7&deg;</td>
                    </tr>
                    <tr>
                        <td class="week-day-val"><span class="plus">+</span>9&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>4&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>2&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>3&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>5&deg;</td>
                        <td class="week-day-val"><span class="plus">+</span>4&deg;</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <script type="text/javascript"> var css_file = document.createElement("link");
    var widgetUrl = location.href;
    css_file.setAttribute("rel", "stylesheet");
    css_file.setAttribute("type", "text/css");
    css_file.setAttribute("href", 'https://s.bookcdn.com/css/w/booked-wzs-widget-275.css?v=0.0.1');
    document.getElementsByTagName("head")[0].appendChild(css_file);

    function setWidgetData_32566(data) {
        if (typeof (data) != 'undefined' && data.results.length > 0) {
            for (var i = 0; i < data.results.length; ++i) {
                var objMainBlock = document.getElementById('m-booked-weather-bl250-32566');
                if (objMainBlock !== null) {
                    var copyBlock = document.getElementById('m-bookew-weather-copy-' + data.results[i].widget_type);
                    objMainBlock.innerHTML = data.results[i].html_code;
                    if (copyBlock !== null) objMainBlock.appendChild(copyBlock);
                }
            }
        } else {
            alert('data=undefined||data.results is empty');
        }
    }

    var widgetSrc = "https://widgets.booked.net/weather/info?action=get_weather_info;ver=7;cityID=18398;type=3;scode=124;ltid=3539;domid=589;anc_id=31491;countday=undefined;cmetric=1;wlangID=20;color=137AE9;wwidth=160;header_color=ffffff;text_color=333333;link_color=08488D;border_form=1;footer_color=ffffff;footer_text_color=333333;transparent=0;v=0.0.1";
    widgetSrc += ';ref=' + widgetUrl;
    widgetSrc += ';rand_id=32566';
    var weatherBookedScript = document.createElement("script");
    weatherBookedScript.setAttribute("type", "text/javascript");
    weatherBookedScript.src = widgetSrc;
    document.body.appendChild(weatherBookedScript) </script><!-- weather widget end -->


    <input type="submit" value="Вернуться на страницу с веб-формой">
</form>
</body>
</html>
