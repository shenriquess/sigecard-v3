$(document).ready(function($){

  var $formFC = '0.000';
  var stringHTML = '';

  $('#listaVazia').hide();
  listaVazia = false;

  for(var i in modalidades_escola){
      stringHTML += ''
          + '<div class="listaItem">'
          + '<li class="panel label-azul">'
          + '<div class="row">'
          + '<var class="idModalidade" style="display: none">' + modalidades_escola[i].id + '</var>'
          + '<var class="idCategoria" style="display: none">' + modalidades_escola[i].categoria_ensino + '</var>'
          + '<var class="idIdade" style="display: none">' + modalidades_escola[i].idade_alunos + '</var>'
          + '<var class="idPeriodo" style="display: none">' + modalidades_escola[i].periodo + '</var>'
          + '<var class="numAlunos" style="display: none">' + modalidades_escola[i].num_alunos + '</var>'
          + '<var class="idRefeicao" style="display: none">' + modalidades_escola[i].num_refeicoes + '</var>'
          + '<var class="idReferencia" style="display: none">' + modalidades_escola[i].id_referencia + '</var>'
          + '<div class="col-md-3 wrapper categoria" style="margin-top: 5px">';
          if(modalidades_escola[i].categoria_ensino == 1){
            stringHTML += 'Creche';
          }else if (modalidades_escola[i].categoria_ensino == 2) {
            stringHTML += 'Pré-escola';
          }else if (modalidades_escola[i].categoria_ensino == 3) {
            stringHTML += 'Ensino Fundamental';
          }else if (modalidades_escola[i].categoria_ensino == 4) {
            stringHTML += 'Ensino Médio';
          }else {
            stringHTML += 'EJA';
          }
      stringHTML += '</div>'
          + '<div class="col-md-3 wrapper idade" style="margin-top: 5px">';
          if (modalidades_escola[i].idade_alunos == 1) {
            stringHTML += '7 - 11 meses';
          }else if (modalidades_escola[i].idade_alunos == 2) {
            stringHTML += '1 - 3 anos';
          }else if (modalidades_escola[i].idade_alunos == 3) {
            stringHTML += '4 - 5 anos';
          }else if (modalidades_escola[i].idade_alunos == 4) {
            stringHTML += '6 - 10 anos';
          }else if (modalidades_escola[i].idade_alunos == 5) {
            stringHTML += '11 - 15 anos';
          }else if (modalidades_escola[i].idade_alunos == 6) {
            stringHTML += '16 - 18 anos';
          }else if (modalidades_escola[i].idade_alunos == 7) {
            stringHTML += '19 - 30 anos';
          }else {
            stringHTML += '31 - 60 anos';
          }
      stringHTML += '</div>'
          + '<div class="col-md-2 wrapper periodo" style="margin-top: 5px">';
          if (modalidades_escola[i].periodo == 1) {
            stringHTML += 'Parcial';
          }else {
            stringHTML += 'Integral';
          }
      stringHTML += '</div>'
          + '<div class="col-md-2 wrapper alunos" style="margin-top: 5px">'
          + modalidades_escola[i].num_alunos
          + '</div>'
          + '<div class="col-md-1 text-center">'
          + '<a class="btn btn-default botaoEditar" data-toggle="modal" data-target="#editar_modalidade"><i class="fa fa-edit"></i></a>'
          + '</div>'
          + '<div class="col-md-1 text-center">'
          + '<button class="btn btn-danger botaoRemover" data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
          + '</div>'
          + '</div>'
          + '</li>'
          + '</div>';

          listaTamanho++;
    }
    $('#listaItens').append(stringHTML);

    function enviarCadastroUpdate() {

      var nome = $("#nome").val();
      var descricao = $("#descricao").val();
      var id_escola = modalidades_escola[0].id_escola;
      var jsonListaItens = [];

      $('var[class="idCategoria"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
                  id_escola: id_escola,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idModalidade"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
                  id_escola: id_escola,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idIdade"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
                  id_escola: id_escola,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idPeriodo"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
                  id_escola: id_escola,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idRefeicao"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
                  id_escola: id_escola,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="numAlunos"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
                  id_escola: id_escola,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idReferencia"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
                  id_escola: id_escola,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });


        $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });


      $.ajax({
                url: '/school/update',
                type: 'post',
                dataType: "text",
                data: { testdata : JSON.stringify(jsonListaItens) },
                success: function (data, status) {
                  location.href = APP_URL + '/school/show';
                },
                error: function (xhr, desc, err) {
                  alert(err);
                }
            });

    }


    $('#confBotaoEnviarUpdate').click(function () {
          if (!validaEnviarFormulario()) {
            if(!validaListaVazia()){
              $(this).addClass('disabled');
              $(this).text("Enviando...");
              enviarCadastroUpdate();
            }
          }
      });

});
