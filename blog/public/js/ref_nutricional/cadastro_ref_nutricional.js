$(document).ready(function($){

  function criaOpcaoIdade(idCategoria) {

        var $select_idade = $('#idade_alunos');
        var string = '<option value="0">Selecione uma opção</option>';

        if (idCategoria == 1){

          string += '<option value="1">7 - 11 meses</option>'
                  + '<option value="2">1 - 3 anos</option>';

        }else if (idCategoria == 2) {
          string += '<option value="3">4 - 5 anos</option>';
        }else if (idCategoria == 3) {
          string += '<option value="4">6 - 10 anos</option>'
                  + '<option value="5">11 - 15 anos</option>';
        }else if (idCategoria == 4) {
          string += '<option value="6">16 - 18 anos</option>';
        }else if (idCategoria == 5) {
          string += '<option value="7">19 - 30 anos</option>'
                  + '<option value="8">31 - 60 anos</option>';
        }else{
          notificacao_alerta('Selecione uma  <b>Categoria de Ensino</b>.');
        }
          $select_idade.empty();
          $select_idade.html(string);
  }
  $('#categoria_ensino').change(function () {
        $('#idade_alunos').empty();
        $('#idade_alunos').html(criaOpcaoIdade($('#categoria_ensino option:selected').val()));
  });








});
