$(document).ready(function($){
    $('#reservation2').daterangepicker({ timePicker: false, timePickerIncrement: 0, locale: { format: 'DD/MM/YYYY', cancelLabel: 'Limpar' }});
    $('#reservation2').daterangepicker({
    "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Aplicar",
        "cancelLabel": "Cancelar",
        "fromLabel": "De",
        "toLabel": "Até",
        "customRangeLabel": "Custom",
        "daysOfWeek": [
            "Do",
            "Se",
            "Te",
            "Qu",
            "Qu",
            "Sx",
            "Sa"
        ],
        "monthNames": [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ],
        "firstDay": 1
    }
    });
});
