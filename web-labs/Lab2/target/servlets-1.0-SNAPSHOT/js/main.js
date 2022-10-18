$(function() {
    function isNumber(n) {
        return !isNaN(parseFloat(n) && isFinite(n));
    }

    function validateY() {
        const yMin = -3;
        const yMax = 3;
        y = parseFloat(document.getElementById('.input_form_label_y').value.replace(/,/, '.'));
        if (y >= yMin && y <= yMax && isNumber(y)) {
            $('.input_form_label_y').removeClass("text-error");
            return true;
        } else {
            $('.input_form_label_y').addClass("text-error");
            return false;
        }
    }

    function validateForm() {
        return validateY();
    }


})
