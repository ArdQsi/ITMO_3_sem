<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
    <head>
        <meta charset="UTF-8">
        <title>
            Web_Lab_2
        </title>
        <link rel="stylesheet" href="./css/style.css">
<%--        <script type="text/javascript" src="jquery-3.6.0.min.js"></script>--%>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </head>

    <body>
        <header class = "header">
            <span id="header_info">
                ФИО: Кравец Роман Денисович. Группа: P32091. Вариант: 209113
            </span>
        </header>

        <main class="main">
            <div class="main_container">
                <section class="main_container_item content-graph">
                    <h2 class="content_item content-graph-header">
                        График
                    </h2>
                    <div class="content-graph-container">
                        <!-- <img src="img/graph.PNG"> -->
                        <!-- TODO:
                            заменить на svg
                            взаимодействие canvas -->
                            <object class="result-graph" type="image/svg+xml" data="img/Frame 2.svg">
                                <img src="img/graph.PNG" width="220" height="220" alt="График">
                            </object>
                    </div>
                </section>

                <section class="main_container_item content-values">
                    <h2 class="content_item content-values-header">
                        Значения
                    </h2>

                    <form class="input_form" action="servlets.ControllerServlet" method="GET">

                        <!-- x-value -->
                        <div class="input_form_container input_form_checkbox">
                            <!-- checkbox -->
                            <label class="input-form__label input-form__label_r">X:</label>
                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox1">-5</label>
                                <input class="x-checkbox" id="x-checkbox1" type="checkbox" name="xval" value="-5">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox2">-4</label>
                                <input class="x-checkbox" id="x-checkbox2" type="checkbox" name="xval" value="-4">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox3">-3</label>
                                <input class="x-checkbox" id="x-checkbox3" type="checkbox" name="xval" value="-3">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox4">-2</label>
                                <input class="x-checkbox" id="x-checkbox4" type="checkbox" name="xval" value="-2">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox5">-1</label>
                                <input class="x-checkbox" id="x-checkbox5" type="checkbox" name="xval" value="-1">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox6">0</label>
                                <input class="x-checkbox" id="x-checkbox6" type="checkbox" name="xval" value="0">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox7">1</label>
                                <input class="x-checkbox" id="x-checkbox7" type="checkbox" name="xval" value="1">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox8">2</label>
                                <input class="x-checkbox" id="x-checkbox8" type="checkbox" name="xval" value="2">
                            </div>

                            <div class="center-labeled">
                                <label class="xbox-label" for="x-checkbox9">3</label>
                                <input class="x-checkbox" id="x-checkbox9" type="checkbox" name="xval" value="3">
                            </div>


                        </div>

                        <!-- y-value -->
                        <div class="input_form_container input_form_text">
                            <label class ="input_form_label input_form_label_y" for="y-textinput">Y:</label>

                            <input class="input_form_text_y center-labeled" id="y-textinput" type="text" name ="yval" maxlength="10" autocomplete="off" placeholder="Число от -3 до 3...">
                        </div>

                        <!-- r-value -->
                        <div class="input_form_container input_form_buttons">
                            <label class ="input_form_label input_form_label_r">R:</label>

                            <div class="center-labeled">
                                <input class="input_form_button_r" type="button" name="yval" value="1">
                                <input class="input_form_button_r" type="button" name="yval" value="2">
                                <input class="input_form_button_r" type="button" name="yval" value="3">
                                <input class="input_form_button_r" type="button" name="yval" value="4">
                                <input class="input_form_button_r" type="button" name="yval" value="5">
                            </div>
                        </div>

                        <div class="input-form__button">
                            <button class="input-form__button_submit"
                                    type="submit">Отправить</button>
                            <button class="input-form__button_reset"
                                    type="submit">Очистить</button>
                        </div>

                    </form>
                </section>
            </div>

            <section class="main_container_item content_table">
                <h2 class="content_item content-table-header">
                    Таблица
                </h2>
                <div class="table_result_container">
                    <table class="table_result">
                        <tr class="table_result_header">
                            <th class="coordinates-col">X</th>
                            <th class="coordinates-col">Y</th>
                            <th class="coordinates-col">R</th>
                            <th class="time-col">Время запроса</th>
                            <th class="time-col">Время выполнения</th>
                            <th class="hit-col">Результат работы</th>
                        </tr>
                    </table>
                </div>
            </section>
        </main>
    </body>
</html>