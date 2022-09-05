jQuery('document').ready(function () {

    function isNumber(n) {
        return /^-?\d+$/.test(n);
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    function validateX() {
        const xMin = -5;
        const xMax = 3;

        var x = document.getElementById("x-textinput").value;

        if (isNumber(x) && x >= xMin && x <= xMax) {
            $('#x-textinput').removeClass("text-error");
            return true;
        } else {
            $('#x-textinput').addClass("text-error");
            return false;
        }
    }


    // кнопки y:
    let y;
    let flag;
    $('.y-button').click(function (e) {
        $('.y-button').removeClass("active");
        $(this).addClass("active");
        y = e.target.value;
        flag = true;
    });

    function validateY() {
        if (flag) {
            return true;
        }
        else {
            alert("Вы не выбрали значение 'Y'");
        }
    }


    function validateR() {
        const rMin = 1;
        const rMax = 4;

        var r = document.getElementById("r-textinput").value;

        if (isNumeric(r) && r >= rMin && r <= rMax) {
            $('#r-textinput').removeClass("text-error");
            return true;
        } else {
            $('#r-textinput').addClass("text-error");
            return false;
        }
    }

    function validateAll() {
        return validateX() & validateR() & validateY();
    }


    $('#form-input').on('submit', function (event) {
        event.preventDefault();
        if (!validateAll()) return;
        $.ajax({
            url: './php/main.php',
            method: 'get',
            data: $(this).serialize() + "&yval=" + y,
            dataType: "json",
            success: function (data) {
                if (data.validate) {
                newRow = '<tr>';
                newRow += '<td class="coordinates-col">' + data.xval + '</td>';
                newRow += '<td class="coordinates-col">' + data.yval + '</td>';
                newRow += '<td class="coordinates-col">' + data.rval + '</td>';
                newRow += '<td class = "time-col">' + data.curtime + '</td>';
                newRow += '<td class = "time-col">' + data.exectime + '</td>';
                newRow += '<td class="hit-col">' + data.hitres + '</td>';
                $('#content-table').append(newRow);
                }
            }
        });

    });

});



