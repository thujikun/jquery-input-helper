(function($) {
    $(function() {
        $('[data-input-helper]').inputHelper().on('ditectcredit', function(e, result) {
            var $inputRow = $(this).closest('.input-row');

            $inputRow.find('.credit-icon').removeClass('active');
            switch(result.creditCardType) {
                case 'visa':
                    $inputRow.find('.visa').addClass('active');
                    break;
                case 'master':
                    $inputRow.find('.master').addClass('active');
                    break;
                case 'jcb':
                    $inputRow.find('.jcb').addClass('active');
                    break;
            }
        });
    });
}.call(window, $));
