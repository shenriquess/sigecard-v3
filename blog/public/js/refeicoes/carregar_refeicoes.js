$(document).ready(function($){

  $('.btn-sm').click(function () {
      $("#modalEdit").modal('show');
  });

  $('#tabela_refeicoes').DataTable( {
    columnDefs: [
      { targets: [0],
       createdCell: function (td, cellData, rowData, row, col){
        $(td).css('border-bottom-left-radius', '5px');
        $(td).css('border-top-left-radius', '5px');
        $(td).css('border-right', 'none');
        $(td).css('border-left', '5px solid #529d52');
        $(td).css('border-bottom', '1px solid #E2DFDF');
        $(td).css('border-top', '1px solid #E2DFDF');
      }


    },{ targets: [1,2],
     createdCell: function (td, cellData, rowData, row, col){
       $(td).css('border-top', '1px solid #E2DFDF');

      $(td).css('border-bottom', '1px solid #E2DFDF');
    }


  },
  { targets: [3],
   createdCell: function (td, cellData, rowData, row, col){
     $(td).css('border-bottom-right-radius', '5px');
     $(td).css('border-top-right-radius', '5px');
     $(td).css('border-left', 'none');
     $(td).css('border-right', '5px solid #529d52');
     $(td).css('border-bottom', '1px solid #E2DFDF');
     $(td).css('border-top', '1px solid #E2DFDF');
  }


}],

    "paging": false,
    "ordering": false,
    "info": true,
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
        "sSearch": "Filtrar: ",
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
