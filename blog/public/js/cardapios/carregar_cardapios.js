$(document).ready(function($){

    $('#reservation2').daterangepicker({ timePicker: false, timePickerIncrement: 0, locale: { format: 'DD/MM/YYYY', cancelLabel: 'Limpar' }});

    $('#reservation2').val('');

    $('input[name="reservation2"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

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

    $('#tabela_cardapios').DataTable( {
      columnDefs: [
        { targets: [0],
         createdCell: function (td, cellData, rowData, row, col){
          $(td).css('border-bottom-left-radius', '5px');
          $(td).css('border-top-left-radius', '5px');
          $(td).css('border-right', 'none');
          $(td).css('border-left', '5px solid #5bc0de');
          $(td).css('border-bottom', '1px solid #E2DFDF');
          $(td).css('border-top', '1px solid #E2DFDF');
        }


      },{ targets: [1,2,3,4,5],
       createdCell: function (td, cellData, rowData, row, col){
         $(td).css('border-top', '1px solid #E2DFDF');

        $(td).css('border-bottom', '1px solid #E2DFDF');
      }


    },
    { targets: [6],
     createdCell: function (td, cellData, rowData, row, col){
       $(td).css('border-bottom-right-radius', '5px');
       $(td).css('border-top-right-radius', '5px');
       $(td).css('border-left', 'none');
       $(td).css('border-right', '5px solid #5bc0de');
       $(td).css('border-bottom', '1px solid #E2DFDF');
       $(td).css('border-top', '1px solid #E2DFDF');
    }


  }],

      "paging": false,
      "ordering": false,
      "info": false,
      "oLanguage": {
          "sEmptyTable":     "Nenhum registro encontrado na tabela",
          "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros",
          "sInfoEmpty": "Mostrando 0 a 0 de 0 Registros",
          "sInfoFiltered": "(Filtrado(s) de um total de _MAX_ registros)",
          "sInfoPostFix":    "",
          "sInfoThousands":  ".",
          "sLengthMenu": "Mostrar _MENU_ registros por página",
          "sLoadingRecords": "Carregando...",
          "sProcessing":     "Processando...",
          "sZeroRecords": "Nenhum registro encontrado",
          "sSearch": "Filtrar nesta página: ",
          "oPaginate": {
              "sNext": "Próximo",
              "sPrevious": "Anterior",
              "sFirst": "Primeiro",
              "sLast":"Último"
          },
          "oAria": {
              "sSortAscending":  ": Ordenar colunas de forma ascendente",
              "sSortDescending": ": Ordenar colunas de forma descendente"
          }
      }
    } );

});
