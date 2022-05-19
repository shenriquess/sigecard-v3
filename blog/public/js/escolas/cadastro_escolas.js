
var editando = false;

/**
 * Posição do item que está sendo editado no momento.
 * @type {number}
 */
var posicaoEditar = 0;


/**
 * Se a lista está vazia igual a true, senão false.
 * @type {boolean}
 */
var listaVazia = true;
/**
 * Tamanho da lista.
 * @type {number}
 */
var listaTamanho = 0;

function validaEnviarFormulario() {
      var erro = false;

      var $formNome = $('#nome');


      if ($formNome.val() == "") {
            erro = true;
            notificacao_alerta('Digite um <b>Nome</b>.');
      }else{
        erro = false;
      }
      return erro;

}

function validaListaVazia() {
    var erro = false;
    if(listaTamanho == 0){
        notificacao_alerta('A lista de Modalidades está <b>Vazia</b>.');
        erro = true;
    }
    return erro;
}

function criaOpcaoReferencia() {

      var $categoria = $('#categoria_ensino option:selected');
      var $idade = $('#idade_alunos option:selected');
      var $periodo = $('#periodo option:selected');
      var $refeicoes = $('#num_refeicoes option:selected');
      var $select_referencia = $('#id_referencia');
      var string = '<option value="0">Selecione uma opção</option>';

      for(i in referencias){

        if(referencias[i].categoria_ensino == $categoria.val() && referencias[i].idade_alunos == $idade.val()
            && referencias[i].periodo == $periodo.val() && referencias[i].num_refeicoes <= $refeicoes.val()){
              string += '<option value="' + referencias[i].id +  '">' + referencias[i].nome + '</option>';
            }
      }
        $select_referencia.empty();
        $select_referencia.html(string);
}

function criaOpcaoReferenciaEdit() {

      var $categoria = $('#categoria_ensino_edit option:selected');
      var $idade = $('#idade_alunos_edit option:selected');
      var $periodo = $('#periodo_edit option:selected');
      var $refeicoes = $('#num_refeicoes_edit option:selected');
      var $select_referencia = $('#id_referencia_edit');
      var string = '<option value="0">Selecione uma opção</option>';

      for(i in referencias){

        if(referencias[i].categoria_ensino == $categoria.val() && referencias[i].idade_alunos == $idade.val()
            && referencias[i].periodo == $periodo.val() && referencias[i].num_refeicoes <= $refeicoes.val()){
              string += '<option value="' + referencias[i].id +  '">' + referencias[i].nome + '</option>';
          }
      }
        $select_referencia.empty();
        $select_referencia.html(string);
}

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
        string = '<option value="0">Selecione uma opção</option>';
      }
        $select_idade.empty();
        $select_idade.html(string);
}

function criaOpcaoIdadeEdit(idCategoria) {

      var $select_idade = $('#idade_alunos_edit');
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
        string = '<option value="0">Selecione uma opção</option>';
      }
        $select_idade.empty();
        $select_idade.html(string);
}

function criaOpcaoNumRefeicoes(idCategoria,idIdade,idPeriodo) {
      var $select_num_refeicoes = $('#num_refeicoes');
      var string = '<option value="0">Selecione uma opção</option>';

      if (idCategoria == 1 && idPeriodo == 1){
        string += '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 1 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 2 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 2 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==3 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==3 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==4 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==4 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==5 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 5 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else{
        string = '<option value="0">Selecione uma opção</option>';
      }
        $select_num_refeicoes.empty();
        $select_num_refeicoes.html(string);
}

function criaOpcaoNumRefeicoesEdit(idCategoria,idIdade,idPeriodo) {
      var $select_num_refeicoes = $('#num_refeicoes_edit');
      var string = '<option value="0">Selecione uma opção</option>';

      if (idCategoria == 1 && idPeriodo == 1){
        string += '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 1 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 2 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 2 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==3 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==3 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==4 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==4 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria ==5 && idPeriodo == 1) {
        string += '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else if (idCategoria == 5 && idPeriodo == 2) {
        string += '<option value="3">3</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>';
      }else{
        string = '<option value="0">Selecione uma opção</option>';
      }
        $select_num_refeicoes.empty();
        $select_num_refeicoes.html(string);
}


$(document).ready(function($){
  $( function(){ var init_form = $('#id_form').serialize(); // Result example: "name=&email=&message="
      // Cancel event onbeforeunload when Submit form
      $('#confBotaoEnviar').click(function() { window.onbeforeunload = null; });
      $('#confBotaoEnviarUpdate').click(function() { window.onbeforeunload = null; });
      $('#btn_cancelar').click(function() { window.onbeforeunload = null; });
      window.onbeforeunload = function(){ var check_form = $('#id_form').serialize();
      if( check_form === init_form ) return null; return 'Os dados do formulário não foram salvos, deseja permanecer nesta página?'; };
  });

    $("#nicescroll").niceScroll();

    $('#categoria_ensino').change(function () {
          $('#idade_alunos').empty();
          $('#idade_alunos').html(criaOpcaoIdade($('#categoria_ensino option:selected').val()));
          $('#periodo').val(0);
          $('#num_refeicoes').empty();
          $('#num_refeicoes').html('<option>Selecione uma opção</option>');
          $('#id_referencia').empty();
          $('#id_referencia').html('<option>Selecione uma opção</option>');
          $('#num_alunos').val(0);
    });

    $('#categoria_ensino_edit').change(function () {
          $('#idade_alunos_edit').empty();
          $('#idade_alunos_edit').html(criaOpcaoIdadeEdit($('#categoria_ensino_edit option:selected').val()));
          $('#periodo_edit').val(0);
          $('#num_refeicoes_edit').empty();
          $('#num_refeicoes_edit').html('<option>Selecione uma opção</option>');
          $('#id_referencia_edit').empty();
          $('#id_referencia_edit').html('<option>Selecione uma opção</option>');
          $('#num_alunos_edit').val(0);
    });

    $('#idade_alunos').change(function () {
          $('#periodo').val(0);
          $('#num_refeicoes').empty();
          $('#num_refeicoes').html('<option>Selecione uma opção</option>');
          $('#id_referencia').empty();
          $('#id_referencia').html('<option>Selecione uma opção</option>');
          $('#num_alunos').val(0);
    });

    $('#idade_alunos_edit').change(function () {
          $('#periodo_edit').val(0);
          $('#num_refeicoes_edit').empty();
          $('#num_refeicoes_edit').html('<option>Selecione uma opção</option>');
          $('#id_referencia_edit').empty();
          $('#id_referencia_edit').html('<option>Selecione uma opção</option>');
          $('#num_alunos_edit').val(0);
    });

    $('#periodo').change(function () {
          $('#num_refeicoes').empty();
          $('#num_refeicoes').html(criaOpcaoNumRefeicoes($('#categoria_ensino option:selected').val(),
                                    $('#idade_alunos option:selected').val(),$('#periodo option:selected').val()));
          $('#id_referencia').empty();
          $('#id_referencia').html('<option>Selecione uma opção</option>');
    });

    $('#periodo_edit').change(function () {
          $('#num_refeicoes_edit').empty();
          $('#num_refeicoes_edit').html(criaOpcaoNumRefeicoesEdit($('#categoria_ensino_edit option:selected').val(),
                                        $('#idade_alunos_edit option:selected').val(),$('#periodo_edit option:selected').val()));
          $('#id_referencia_edit').empty();
          $('#id_referencia_edit').html('<option>Selecione uma opção</option>');
    });

    $('#num_refeicoes').change(function () {
          criaOpcaoReferencia();
    });

    $('#num_refeicoes_edit').change(function () {
          criaOpcaoReferenciaEdit();
    });

    recarregaTudo();
    $('#botaoAdicionar').click(function () {
        if (!validaAdicionarItem()) {
            if (listaVazia == true) {
                $('#listaVazia').hide();
            }
            adicionarItem();
            listaTamanho++;
            notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
            limparCamposItem();
            recarregaTudo();
        }
    });


    function validaAdicionarItem() {
          var erro = false;

          var $formCategoria = $('#categoria_ensino option:selected');
          var $formIdade = $('#idade_alunos option:selected');
          var $formPeriodo = $('#periodo option:selected');
          var $formNumAlunos = $('#num_alunos');
          var $formNumRefeicoes = $('#num_refeicoes option:selected');
          var $formReferencia = $('#id_referencia option:selected');

          if ($formCategoria.val() <= 0) {
              erro = true;
              notificacao_alerta('Selecine uma <b>Categoria de Ensino</b>.');
          }else if ($formIdade.val() <= 0) {
                erro = true;
                notificacao_alerta('Selecine um <b>Faixa de Idade</b>.');
          }else if ($formPeriodo.val() <= 0) {
                erro = true;
                notificacao_alerta('Selecine um <b>Período</b>.');
          }else if ($formNumAlunos.val() <= 0 || $formNumAlunos.val() == '') {
                erro = true;
                notificacao_alerta('Digite o <b>Número de Alunos</b>.');
          }else if ($formNumRefeicoes.val() <= 0) {
                erro = true;
                notificacao_alerta('Selecione um <b>Número de Refeições</b>.');
          }else if ($formReferencia.val() <= 0) {
                erro = true;
                notificacao_alerta('Selecione uma <b>Referência Nutricional</b>.');
          }else {
              var $categoria = $('var[class="idCategoria"]');
              var $idade =   $('var[class="idIdade"]');
              var $periodo =   $('var[class="idPeriodo"]');
              for(var i = 0; i < $categoria.length;i++ ){
                if($($categoria[i]).html() == $formCategoria.val() && $($idade[i]).html() == $formIdade.val()
                  && $($periodo[i]).html() == $formPeriodo.val()){
                  erro = true;
                  notificacao_alerta('<b>Modalidade</b> já incluída.');
                  return erro;
                }

              }

          }

          return erro;
      }

      function limparCamposItem() {
          $('#categoria_ensino').val(0);
          $('#idade_alunos').empty();
          $('#idade_alunos').html('<option>Escolha uma opção</option>');
          $('#periodo').val(0);
          $('#num_alunos').val(0);
          $('#num_refeicoes').empty();
          $('#num_refeicoes').html('<option>Escolha uma opção</option>');
          $('#id_referencia').empty();
          $('#id_referencia').html('<option>Escolha uma opção</option>');
      }

      function adicionarItem() {

          var $formCategoria = $('#categoria_ensino option:selected');
          var $formIdade = $('#idade_alunos option:selected');
          var $formPeriodo = $('#periodo option:selected');
          var $formNumAlunos = $('#num_alunos');
          var $formNumRefeicoes = $('#num_refeicoes option:selected');
          var $formReferencia = $('#id_referencia option:selected');

          var stringHTML = ''
              + '<div class="listaItem">'
              + '<li class="panel label-azul">'
              + '<div class="row">'
              + '<var class="idModalidade" style="display: none">' + 99999999 + '</var>'
              + '<var class="idCategoria" style="display: none">' + $formCategoria.val() + '</var>'
              + '<var class="idIdade" style="display: none">' + $formIdade.val() + '</var>'
              + '<var class="idPeriodo" style="display: none">' + $formPeriodo.val() + '</var>'
              + '<var class="numAlunos" style="display: none">' + $formNumAlunos.val() + '</var>'
              + '<var class="idRefeicao" style="display: none">' + $formNumRefeicoes.val() + '</var>'
              + '<var class="idReferencia" style="display: none">' + $formReferencia.val() + '</var>'
              + '<div class="col-md-3 wrapper categoria" style="margin-top: 5px">'
              + $formCategoria.text()
              + '</div>'
              + '<div class="col-md-3 wrapper idade" style="margin-top: 5px">'
              + $formIdade.text()
              + '</div>'
              + '<div class="col-md-2 wrapper periodo" style="margin-top: 5px">'
              + $formPeriodo.text()
              + '</div>'
              + '<div class="col-md-2 wrapper alunos" style="margin-top: 5px">'
              + $formNumAlunos.val()
              + '</div>'
              + '<div class="col-md-1 text-center">'
              + '<a class="btn btn-default botaoEditar" data-toggle="modal" data-target="#editar_modalidade"><i class="fa fa-edit"></i></a>'
              + '</div>'
              + '<div class="col-md-1 text-center">'
              + '<button class="btn btn-danger botaoRemover data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
              + '</div>'
              + '</div>'
              + '</li>'
              + '</div>';


          $('#listaItens').append(stringHTML);
          $("#nicescroll").getNiceScroll().resize();

      }

      function limparLista() {
          $('#listaItens').empty();
          $('#listaVazia').show();
          listaTamanho = 0;
          listaVazia = true;
      }

      function validaEditarItem() {
            var erro = false;

            var $formCategoria = $('#categoria_ensino_edit option:selected');
            var $formIdade = $('#idade_alunos_edit option:selected');
            var $formPeriodo = $('#periodo_edit option:selected');
            var $formNumAlunos = $('#num_alunos_edit');
            var $formNumRefeicoes = $('#num_refeicoes_edit option:selected');
            var $formReferencia = $('#id_referencia_edit option:selected');

            if ($formCategoria.val() <= 0) {
                erro = true;
                notificacao_alerta('Selecine uma <b>Categoria de Ensino</b>.');
            }else if ($formIdade.val() <= 0) {
                  erro = true;
                  notificacao_alerta('Selecine um <b>Faixa de Idade</b>.');
            }else if ($formPeriodo.val() <= 0) {
                  erro = true;
                  notificacao_alerta('Selecine um <b>Período</b>.');
            }else if ($formNumAlunos.val() <= 0 || $formNumAlunos.val() == '') {
                  erro = true;
                  notificacao_alerta('Digite o <b>Número de Alunos</b>.');
            }else if ($formNumRefeicoes.val() <= 0) {
                  erro = true;
                  notificacao_alerta('Selecione um <b>Número de Refeições</b>.');
            }else if ($formReferencia.val() <= 0) {
                  erro = true;
                  notificacao_alerta('Selecione uma <b>Referência Nutricional</b>.');
            }else {
                var $categoria = $('var[class="idCategoria"]');
                var $idade =   $('var[class="idIdade"]');
                var $periodo =   $('var[class="idPeriodo"]');
                for(var i = 0; i < $categoria.length;i++ ){
                  if($($categoria[i]).html() == $formCategoria.val() && $($idade[i]).html() == $formIdade.val()
                    && $($periodo[i]).html() == $formPeriodo.val() && i != posicaoEditar){
                    erro = true;
                    notificacao_alerta('<b>Modalidade</b> já incluída.');
                    return erro;
                  }

                }

            }

            return erro;
      }

      function concluiEditarItem() {
        var $formCategoria = $('#categoria_ensino_edit option:selected');
        var $formIdade = $('#idade_alunos_edit option:selected');
        var $formPeriodo = $('#periodo_edit option:selected');
        var $formNumAlunos = $('#num_alunos_edit');
        var $formNumRefeicoes = $('#num_refeicoes_edit option:selected');
        var $formReferencia = $('#id_referencia_edit option:selected');

        $($('.idCategoria')[posicaoEditar]).html($formCategoria.val());
        $($('.idIdade')[posicaoEditar]).html($formIdade.val());
        $($('.idPeriodo')[posicaoEditar]).html($formPeriodo.val());
        $($('.idRefeicao')[posicaoEditar]).html($formNumRefeicoes.val());
        $($('.numAlunos')[posicaoEditar]).html($formNumAlunos.val());
        $($('.idReferencia')[posicaoEditar]).html($formReferencia.val());

        $($('.categoria')[posicaoEditar]).html($formCategoria.text());
        $($('.idade')[posicaoEditar]).html($formIdade.text());
        $($('.periodo')[posicaoEditar]).html($formPeriodo.text());
        $($('.alunos')[posicaoEditar]).html($formNumAlunos.val());

      }

      $('#concluir_edicao').click(function () {
          if (!validaEditarItem()) {
            concluiEditarItem();
            editando = false;
            notificacao_sucesso('Item <b>editado</b> com sucesso.');
            $('#editar_modalidade').modal('hide');
            recarregaTudo();
          }
      });

      function recarregaEditarItem() {
        var $botaoEditar = $('.botaoEditar');
        $botaoEditar.off();
        $botaoEditar.each(function (posicao, botaoEditar) {
            $(botaoEditar).click(function () {
                var $idCategoria = $($('.idCategoria')[posicao]);
                var $idIdade= $($('.idIdade')[posicao]);
                var $idPeriodo = $($('.idPeriodo')[posicao]);
                var $idRefeicao = $($('.idRefeicao')[posicao]);
                var $numAlunos = $($('.numAlunos')[posicao]);
                var $idReferencia = $($('.idReferencia')[posicao]);



                posicaoEditar = posicao;
                editando = true;

                $('#categoria_ensino_edit').val($idCategoria.html());
                criaOpcaoIdadeEdit($idCategoria.html());
                $('#idade_alunos_edit').val($idIdade.html());
                $('#periodo_edit').val($idPeriodo.html());
                criaOpcaoNumRefeicoesEdit($idCategoria.html(),$idIdade.html(),$idPeriodo.html());
                $('#num_alunos_edit').val($numAlunos.html());
                $('#num_refeicoes_edit').val($idRefeicao.html());
                criaOpcaoReferenciaEdit();
                $('#id_referencia_edit').val($idReferencia.html());

            });
        });
      }

      function recarregaRemoverItem() {
        var $botaoRemover = $('.botaoRemover');

        $botaoRemover.off();
        $botaoRemover.each(function (posicao, botaoRemover) {
            $(botaoRemover).click(function () {
                var $idCategoria = $($('.idCategoria')[posicao]);
                var $idIdade= $($('.idIdade')[posicao]);
                var $idPeriodo = $($('.idPeriodo')[posicao]);
                var $idRefeicao = $($('.idRefeicao')[posicao]);
                var $numAlunos = $($('.numAlunos')[posicao]);
                var $idReferencia = $($('.idReferencia')[posicao]);

                $($('.listaItem')[posicao]).remove();
                listaTamanho--;
                recarregaTudo();
                if (listaTamanho == 0) {
                    $('#listaVazia').show();
                    listaVazia = true;
                }
                notificacao_sucesso('Item <b>removido</b> com sucesso.');
                $("#nicescroll").getNiceScroll().resize();
            });
        });
      }


      function limparTudo() {
        limparCamposItem();
        limparLista();
      }

      function limparLista() {
        $('#listaItens').empty();
        $('#listaVazia').show();
        listaTamanho = 0;
        listaVazia = true;
      }

      function recarregaTudo() {
        recarregaEditarItem();
        recarregaRemoverItem();
    }

    function enviarCadastro() {


      var nome = $("#nome").val();
      var descricao = $("#descricao").val();
      var jsonListaItens = [];

      $('var[class="idCategoria"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idIdade"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idPeriodo"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idRefeicao"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="numAlunos"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
              };
          }
          jsonListaItens[pos][$(this).attr('class')] = $(this).html();
      });

      $('var[class="idReferencia"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  nome: nome,
                  descricao: descricao,
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
                url: '/school/save',
                type: 'post',
                dataType: "text",
                data: { testdata : JSON.stringify(jsonListaItens) },
                success: function (data, status) {
                  location.reload();
                },
                error: function (xhr, desc, err) {
                  console.log(err);
                }
            });



  }


  $('#confBotaoEnviar').click(function () {
        if (!validaEnviarFormulario()) {
          if(!validaListaVazia()){
            $(this).addClass('disabled');
            $(this).text("Enviando...");
            enviarCadastro();

          }
        }
    });

});
