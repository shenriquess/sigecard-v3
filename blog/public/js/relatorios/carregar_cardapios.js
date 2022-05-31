function mostraDialogo2(mensagem, tipo){
  swal({
    title: "Aviso!",
    text: mensagem,
    icon: tipo,
  })
  .then((value) => {
    location.href = APP_URL + '/report/menus';
  });
}

function criaOpcaoModalidades(id_escola) {
      var $select_modalidade = $('#search3');
      var string = '<option value="0">Selecione uma opção</option>';
      var nomeModalidade = "";
      if(id_escola > 0){
        if (typeof modalidades_escola !== "undefined"){
              for(i in modalidades_escola){
                  if(id_escola == modalidades_escola[i].id_escola){
                    if(modalidades_escola[i].categoria_ensino == 1 && modalidades_escola[i].idade_alunos == 1){
                      nomeModalidade = 'Creche (7 - 11 meses)';
                    }else if (modalidades_escola[i].categoria_ensino == 1 && modalidades_escola[i].idade_alunos == 2) {
                      nomeModalidade = 'Creche (1 - 3 anos)';
                    }else if (modalidades_escola[i].categoria_ensino == 2 && modalidades_escola[i].idade_alunos == 3) {
                      nomeModalidade = 'Pré-escola (4 - 5 anos)';
                    }else if (modalidades_escola[i].categoria_ensino == 3 && modalidades_escola[i].idade_alunos == 4) {
                      nomeModalidade = 'Ensino Fundamental (6 - 10 anos)';
                    }else if (modalidades_escola[i].categoria_ensino == 3 && modalidades_escola[i].idade_alunos == 5) {
                        nomeModalidade = 'Ensino Fundamental (11 - 15 anos)';
                    }else if (modalidades_escola[i].categoria_ensino == 4 && modalidades_escola[i].idade_alunos == 6) {
                      nomeModalidade = 'Ensino Fundamental (16 - 18 anos)';
                    }else if (modalidades_escola[i].categoria_ensino == 5 && modalidades_escola[i].idade_alunos == 7) {
                      nomeModalidade = 'EJA (19 - 30 anos)';
                    }else{
                      nomeModalidade = 'EJA (31 - 60 anos)';
                    }
                    string += '<option value= "' + modalidades_escola[i].id + '">' + nomeModalidade + '</option>';
                  }
              }
          }
      }else{
        string = '<option value="0">Selecione uma opção</option>';
      }
      $select_modalidade.empty();
      $select_modalidade.html(string);
  }


$(document).ready(function($){

    $('#search').change(function () {
          var $id_escola = $('#search').val();
          if ($id_escola > 0){
            criaOpcaoModalidades($id_escola);
          }else{
            $('#search3').empty();
            $('#search3').html('<option value="0">Selecione uma opção</option>')
          }

    });

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

    $('input[name="reservation2"]').on('cancel.daterangepicker', function(ev, picker) {
    });

    $('#tabela_cardapios').DataTable( {
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

      "paging": true,
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

    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

  function enviarCadastro() {
    $.ajax({
              url: '/report/menus_pdf',
              type: 'post',
              dataType: "text",
              data: { testdata : JSON.stringify(cardapios) },
                success: function (data, status) {
                  window.open(APP_URL + '/report/' + data + '/merger_pdf', '_blank');
                  mostraDialogo2("Relatório gerado com sucesso","success");
                  //location.href = APP_URL + '/menu/create';
                  console.log('sucesso');

                },
                error: function (xhr, desc, err) {
                  alert('Erro');
              }
      });
    }

    $('#confBotaoEnviar').click(function () {
            if(cardapios.length > 0){
              $(this).addClass('disabled');
              $(this).text("Enviando...");
              enviarCadastro();
            }else{
              mostraDialogo2("Não há cardápios!","info");
            }

      });

});
