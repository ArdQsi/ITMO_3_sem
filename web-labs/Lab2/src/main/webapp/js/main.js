$(function() {
    const X_VALUES = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
    const R_VALUES = ['1', '2', '3', '4', '5'];
    const Y_MIN = -3;
    const Y_MAX = 3;
    let canvas = $('.graph-canvas');

    function isNumber(n) {
        return !isNaN(parseFloat(n) && isFinite(n));
    }

    function validateY() {
        const yMin = -3;
        const yMax = 3;


        let y = parseFloat(document.getElementById('y-textinput').value.replace(/,/, '.'));
        if (y >= yMin && y <= yMax && isNumber(y)) {
            $('.input_form_text_y').removeClass("text-error");
            return true;
        } else {
            $('.input_form_text_y').addClass("text-error");
            return false;
        }
    }

    var rval;
    let flag;
    let button = document.querySelectorAll('.number_r [type="button"]');

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", takeNumber, false);
    }

    function takeNumber() {
        rval = this.value;
        $('.input_form_button_r').removeClass("active");
        $(this).addClass("active");
        flag = true;
    }

    function validateR() {
        console.log("a");
        console.log(flag);
        console.log(rval);
        if (flag) {
            $(".input_form_button_r").removeClass("text-error");
            if (isNumber(rval) && R_VALUES.includes(rval)) {
                console.log("yes");
                return true;

            } else {
                console.log("no");
                return false;

            }
        } else {
            $('.input_form_button_r').addClass("text-error");
            console.log('err');
        }
    }

    function validateForm() {
        return  validateR() && validateY();
    }

    $('.input-form_button_submit').on('click', function (event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            $('.input-form_hidden_r').val(rval);
            $('.input-form_hidden_timezone').val(new Date().getTimezoneOffset());
        }
    });

    $('.x-checkbox[type=checkbox]').change(function(){
        if($('.x-checkbox[type=checkbox]:checked').length >= 1){
            $('.x-checkbox[type=checkbox]:not(:checked)').attr('disabled', "disabled");
        } else{
            $('.x-checkbox[type=checkbox]:disabled').removeAttr('disabled');
        }
    });
//    работа с рисунком
    let red_dot = new Image(), green_dot = new Image();
    red_dot.src = './img/red_dot.svg';
    green_dot.src = './img/green_dot.svg'
    let image_array = [green_dot, red_dot], imagesLoaded = 0;

    $(image_array).on('load', () => {
        imagesLoaded++;

        if (imagesLoaded === image_array.length) {
            allImagesLoaded();
        }
    })

    function allImagesLoaded() {
        let canvas = document.getElementById("graph-canvas");
        let context = canvas.getContext('2d');

        let x = $('td.result_x');
        let y = $('td.result_y');
        let r = $('td.result_r');
        let verdict = $('td.hit');

        for (let index = 0; index < verdict.length; index++) {
            let size = 300 / 2 *0.95 / r[index].innerHTML;
            switch (verdict[index].innerHTML) {
                case "true": {
                    context.drawImage(green_dot, x[index].innerHTML * size + 300 / 2
                        - green_dot.width/2 , (-1 * y[index].innerHTML * size + 300 / 2
                        - green_dot.height/2));
                    break;
                }
                case "false": {
                    context.drawImage(red_dot, x[index].innerHTML * size + 300 / 2 - red_dot.width / 2,
                        (-1 * y[index].innerHTML * size + 300 / 2 - red_dot.height / 2));
                    break;
                }
            }
        }
    }

    $('#graph-canvas').on("click", (event) => {
        let offset = $('#graph-canvas').offset();
        let width = -1 * (300 / 2 - Math.abs(event.pageX - offset.left));
        let height = 300 / 2 - Math.abs(event.pageY - offset.top);

        if (flag) {
            let size = 300 / 2 * 0.935 / rval;
            let form = $('#picture_form');

            form.append(() => {
                return $('<input>', {
                    type: 'hidden',
                    name: 'xval',
                    value: (width / size).toFixed(1)
                })
            })

            form.append(() => {
                return $('<input>', {
                    type: 'hidden',
                    name: 'yval',
                    value: (height / size).toFixed(1)
                })
            })

            form.append(() => {
                return $('<input>', {
                    type: 'hidden',
                    name: 'rval',
                    value: rval
                })
            })

            form.append(() => {
                return $('<input>', {
                    type: 'hidden',
                    name: 'timezone',
                    value: new Date().getTimezoneOffset()
                })
            })

            form.append(() => {
                return $('<input>', {
                    type: 'hidden',
                    name: 'type',
                    value: "picture"
                })
            })

            form.submit();
        } else {
            $('#picture + p.error').remove();
            $('#picture').after($('<p class="error">Необходимо указать радиус!</p>'));
        }

    })

});