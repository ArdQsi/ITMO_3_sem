jQuery('document').ready(function () {
    $.ajax({
        url: './php/main.php',
        method: 'POST',
        dataType: 'html',
        success: (html) => {
            $('#content-table').remove();
            $('.table-content').append(html);
        }
    })

    function isNumber(n) {
        return !isNaN(parseFloat(n) && isFinite(n));
    }

    function validateX() {
        const xMin = -5;
        const xMax = 3;
        x = parseFloat(document.getElementById('x-textinput').value.replace(/,/, '.'));
        if (x >= xMin && x <= xMax && isNumber(x)) {
            $('#x-textinput').removeClass("text-error");
            return true;
        } else {
            $('#x-textinput').addClass("text-error");
            return false;
        }
    }

    let flag;
    let y;
    let button = document.querySelectorAll('#number [type="button"]');
    const massiveY = ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];
    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', takeNumber, false);
    }

    function takeNumber() {
        y = this.value;
        $('.y-button').removeClass("active");
        $(this).addClass("active");
        flag = true;
    }

    function validateY() {
        if (flag) {
            $('.y-button').removeClass("text-error");
            if (isNumber(y) && massiveY.includes(y)) {
                return true;
            } else {
                return false;
            }
        }
        else {
            $('.y-button').addClass("text-error");
        }
    }

    function validateR() {
        const rMin = 1;
        const rMax = 4;

        r = parseFloat(document.getElementById('r-textinput').value.replace(/,/, '.'));

        if (isNumber(r) && r >= rMin && r <= rMax) {
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

    document.getElementById("reset").onclick = function(e) {
        $('.y-button').removeClass("active");
        flag = false;
      }

    $('#form-input').on('submit', function (event) {
        event.preventDefault();
        if (!validateAll()) return;
        $.ajax({
            url: './php/main.php',
            method: 'GET',
            data: $(this).serialize() + "&yval=" + y + "&timeZone=" + new Date().getTimezoneOffset(),
            dataType: "html",
            success: (html) => {
                $('#content-table').remove();
                $('.table-content').append(html);
            }
        });
    });

});



