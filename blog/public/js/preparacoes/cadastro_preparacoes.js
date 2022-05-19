
var energia = 0, carboidratos = 0, proteinas = 0, lipidios = 0, fibras = 0, vitamina_a = 0,
    vitamina_c = 0, vitamina_d = 0, vitamina_e = 0, vitamina_b1 = 0, vitamina_b2 = 0,
    vitamina_b6 = 0, vitamina_b12 = 0, niacina = 0, folico = 0, pantotenico = 0, calcio = 0,
    ferro = 0, magnesio = 0, potassio = 0, selenio = 0, fosforo = 0, iodo = 0, cobre = 0,
    zinco = 0, sodio = 0, gordura_total = 0, colesterol = 0, gordura_saturada = 0,
    gordura_poliinsaturada = 0, gordura_monoinsaturada = 0, valor = 0, medida_total = 0;

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

function mostraDialogo3(mensagem, tipo){
  swal({
    title: "Aviso!",
    text: mensagem,
    icon: tipo,
  })
  .then((value) => {
    location.href = APP_URL + '/preparation/create';
  });
}

function mostraDialogo4(data){
    swal("Deseja gerar o PDF da preparação agora?", {
        buttons: {
          cancel: "Cancelar",
          catch: {
            text: "Confirmar",
            value: "catch",
          },
          defeat: false,
        },
      })
      .then((value) => {
        switch (value) {

          case "catch":
            window.open(APP_URL + '/preparation/' + data + '/pdf', '_blank');
            mostraDialogo3("Dados inseridos com sucesso","success");
            break;

          default:
              mostraDialogo3("Dados inseridos com sucesso","success");
        }
      });
}

function criaOpcaoItens(idFonte) {

      var $select_item = $('#select_item');
      var string = '<option value="0">Selecione uma opção</option>';

      if(typeof itens !== "undefined"){
          if(idFonte > 0){
              for (var i in itens) {
                for (var j in fontes){
                  if (itens.hasOwnProperty(i) != null && itens[i].id_fonte == idFonte && itens[i].id_fonte == fontes[j].id ) {
                      string += '<option value="' + itens[i].id + '">' + itens[i].nome + '</option>';
                  }
                }
              }
          }else {
              for (var i in itens) {
                for (var j in fontes){
                  if (itens[i].id_fonte == fontes[j].id) {
                      string += '<option value="' + itens[i].id + '">' + itens[i].nome + '</option>';
                  }
                }
              }

          }


        }else {
            mostraDialogo('<strong>Por favor, primeiro cadastre um Alimento.</strong>', 'info', 4000, 'info');
        }
        $select_item.empty();
        $select_item.html(string);
        $('#select_item').selectpicker('refresh');
}

function criaOpcaoItensEdit(idFonte) {

      var $select_item = $('#select_item_edit');
      var string = '<option value="0">Selecione uma opção</option>';

      if(typeof itens !== "undefined"){
          if(idFonte > 0){
              for (var i in itens) {
                for (var j in fontes){
                  if (itens.hasOwnProperty(i) != null && itens[i].id_fonte == idFonte && itens[i].id_fonte == fontes[j].id ) {
                      string += '<option value="' + itens[i].id + '">' + itens[i].nome + ' (' + fontes[j].nome + ')</option>';
                  }
                }
              }
          }else {
              for (var i in itens) {
                for (var j in fontes){
                  if (itens[i].id_fonte == fontes[j].id) {
                      string += '<option value="' + itens[i].id + '">' + itens[i].nome + ' (' + fontes[j].nome + ')</option>';
                  }
                }
              }

          }


        }else {
            mostraDialogo('<strong>Por favor, primeiro cadastre um Alimento.</strong>', 'info', 4000, 'info');
        }
        $select_item.empty();
        $select_item.html(string);
        $('#select_item_edit').selectpicker('refresh');
}


function criaOpcaoMedidas(idItem) {

      var $select_medida = $('#select_medida');
      $select_medida.empty();
      var string = '<option value="0">Selecione uma opção</option>';

      if (typeof itens !== "undefined" && itens.hasOwnProperty(idItem) != null){
        string += '<option value="1">g</option>';
      }else {
            mostraDialogo('<strong>Por favor, primeiro cadastre um Alimento.</strong>', 'info', 4000, 'info');
      }
        $select_medida.empty();
        $select_medida.html(string);
}

function criaOpcaoMedidasEdit(idItem) {

      var $select_medida = $('#select_medida_edit');
      $select_medida.empty();
      var string = '<option value="0">Selecione uma opção</option>';

      if (typeof itens !== "undefined" && itens.hasOwnProperty(idItem) != null){
        string += '<option value="1">g</option>';
      }else {
            mostraDialogo('<strong>Por favor, primeiro cadastre um Alimento.</strong>', 'info', 4000, 'info');
      }
        $select_medida.empty();
        $select_medida.html(string);
}

function validaEnviarFormulario() {
      var erro = false;

      var $formNome = $('#nome');
      var $formTipoSelected = $('#select_tipo_preparacao');
      var $formPreparo = $('#modo_preparo');
      var $formRendimento = $('#r_total');


      if ($formNome.val() == "") {
            erro = true;
            notificacao_alerta('Digite um <b>Nome</b>.');
      }else if ($formTipoSelected.val() <= 0) {
            erro = true;
            notificacao_alerta('Selecine um <b>Tipo de Preparação</b>.');
      }else if ($formRendimento.val() <= 0) {
            erro = true;
            notificacao_alerta('Insira <b>o Rendimento total da Preparação</b>.');
      }else if ($formPreparo.val() == "") {
            erro = true;
            notificacao_alerta('Digite o <b>Modo de Preparo</b>.');
      }else{
        erro = false;
      }
      return erro;

}

function validaListaVazia() {
    var erro = false;
    if(listaTamanho == 0){
        notificacao_alerta('A lista de Ingredientes está <b>Vazia</b>.');
        erro = true;
    }
    return erro;
}

function adicionaLinhaTabela(){

  $("#table_preparacao tbody tr").remove();

  var nome_item = [], per_capta_bruto = [], per_capta_liquido = [], $p_liquido = [], fator_correcao = [], id_item = [], id_medida = [], $valor = [], $energia = [],
      $carboidratos = [], $proteinas = [], $lipidios = [], $fibras = [], $vitamina_a = [], $vitamina_c = [],
      $calcio = [], $ferro = [], $magnesio = [], $zinco = [], $sodio = [];

  $('var[class="idItem"]').each(function (pos, item) {
    id_item[pos] = $(this).html();
  });

  $('var[class="idMedida"]').each(function (pos, item) {
    id_medida[pos] = $(this).html();
  });

  $('var[class="valorPL"]').each(function (pos, item) {
    per_capta_liquido[pos] = $(this).html();
  });

  $('.item').each(function (pos, item) {
    nome_item[pos] = $(this).html();
  });

  $('.pb').each(function (pos, item) {
    per_capta_bruto[pos] = $(this).html();
  });

  $('.pl').each(function (pos, item) {
     $p_liquido[pos] = $(this).html();
  });

  $('.fc').each(function (pos, item) {
    fator_correcao[pos] = $(this).html();
  });

  for (var j = 0; j < nome_item.length; j++) {

      for (var i in itens) {
        if (itens.hasOwnProperty(i) != null && itens[i].id == id_item[j]) {

            $energia[j] = itens[i].calorias * per_capta_liquido[j]/itens[i].medida_base;
            $carboidratos[j] = itens[i].carboidratos * per_capta_liquido[j]/itens[i].medida_base;
            $proteinas[j] = itens[i].proteinas * per_capta_liquido[j]/itens[i].medida_base;
            $lipidios[j] = itens[i].lipidios * per_capta_liquido[j]/itens[i].medida_base;
            $fibras[j] = itens[i].fibras * per_capta_liquido[j]/itens[i].medida_base;
            $vitamina_a[j] = itens[i].vitamina_a * per_capta_liquido[j]/itens[i].medida_base;
            $vitamina_c[j] = itens[i].vitamina_c* per_capta_liquido[j]/itens[i].medida_base;
            $calcio[j] = itens[i].calcio * per_capta_liquido[j]/itens[i].medida_base;
            $ferro[j] = itens[i].ferro* per_capta_liquido[j]/itens[i].medida_base;
            $magnesio[j] = itens[i].magnesio * per_capta_liquido[j]/itens[i].medida_base;
            $zinco[j] = itens[i].zinco * per_capta_liquido[j]/itens[i].medida_base;
            $sodio[j] = itens[i].sodio * per_capta_liquido[j]/itens[i].medida_base;
            $valor[j] = itens[i].valor * per_capta_liquido[j]/itens[i].medida_base;
        }
      }
    }

  var $nome_preparacao = $('#nome').val();

  var $modo_preparo = $('#modo_preparo').val();

  var contador1 = 0, contador2 = 0, contador3 = 0, contador4 = 0, contador5 = 0, contador6 = 0;
  for(var i = 0; i < nome_item.length; i++){

    var newRow = $("<tr class='success'>");
    var cols = "";
    var p_b = (per_capta_bruto[i]).split(' ');
    var p_l = ($p_liquido[i]).split(' ');
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=2>' + nome_item[i] + '</td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat(p_b[0]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat(p_l[0]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat(fator_correcao[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>R$ ' + parseFloat($valor[i]).toFixed(2) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($energia[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($carboidratos[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($proteinas[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($lipidios[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($fibras[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($vitamina_a[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($vitamina_c[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($calcio[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($ferro[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($magnesio[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($zinco[i]).toFixed(3) + '</font></td>'
    cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + parseFloat($sodio[i]).toFixed(3) + '</font></td>'



    newRow.append(cols);
    $("#table_preparacao").append(newRow);

  }
  $("#td_span_valor").html((valor).toFixed(2));
  $("#td_span_calorias").html((energia).toFixed(3));
  $("#td_span_carboidratos").html((carboidratos).toFixed(3));
  $("#td_span_proteinas").html((proteinas).toFixed(3));
  $("#td_span_lipidios").html((lipidios).toFixed(3));
  $("#td_span_fibras").html((fibras).toFixed(3));
  $("#td_span_vit_a").html((vitamina_a).toFixed(3));
  $("#td_span_vit_c").html((vitamina_c).toFixed(3));
  $("#td_span_calcio").html((calcio).toFixed(3));
  $("#td_span_ferro").html((ferro).toFixed(3));
  $("#td_span_magnesio").html((magnesio).toFixed(3));
  $("#td_span_zinco").html((zinco).toFixed(3));
  $("#td_span_sodio").html((sodio).toFixed(3));
  $("#span_modo_preparo").html(($('#modo_preparo').val()));
  $("#span_nome_preparacao").html(($('#nome').val()));





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


    $('#select_item').selectpicker();

    $('#select_item_edit').selectpicker();

    criaOpcaoItens(0);

    $('#select_fonte').change(function () {
          $('#select_item').empty();
          $('#select_item').html(criaOpcaoItens($('#select_fonte option:selected').val()));
          $('#select_medida').empty();
          $('#select_medida').append('<option value="0" option:selected>Selecione uma opção</option>');
          $('#p_bruto').prop('disabled', true);
          $('#p_liquido').prop('disabled', true);

    });

    $('#select_fonte_edit').change(function () {
          $('#select_item_edit').empty();
          $('#select_item_edit').html(criaOpcaoItensEdit($('#select_fonte_edit option:selected').val()));
          $('#select_medida_edit').empty();
          $('#select_medida_edit').append('<option value="0" option:selected>Selecione uma opção</option>');
          $('#p_bruto_edit').prop('disabled', true);
          $('#p_liquido_edit').prop('disabled', true);

    });

    $('#nome').change(function () {
        adicionaLinhaTabela();
    });

    $('#modo_preparo').change(function () {
        adicionaLinhaTabela();
    });

    $('#select_item').change(function () {
          $('#select_medida').empty();
          $('#select_medida').html(criaOpcaoMedidas($('#select_item option:selected').val()));
          $idItem = $('#select_item option:selected').val();
          if($idItem > 0){
            for (var i in medidas_itens){
              if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id_item == $idItem){
                var string = '<option value="' + medidas_itens[i].id + '">' + medidas_itens[i].nome_medida + '</option>';
                $('#select_medida').append(string);
              }
            }
          }
          $('#p_bruto').val(parseFloat(0).toFixed(3));
          $('#p_liquido').val(parseFloat(0).toFixed(3));
          $('#f_correcao').val(parseFloat(0).toFixed(3));
          $('#p_bruto').prop('disabled', true);
          $('#p_liquido').prop('disabled', true);

    });

    $('#select_item_edit').change(function () {
          $('#select_medida_edit').empty();
          $('#select_medida_edit').html(criaOpcaoMedidasEdit($('#select_item_edit option:selected').val()));
          $idItem = $('#select_item_edit option:selected').val();
          if($idItem > 0){
            for (var i in medidas_itens){
              if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id_item == $idItem){
                var string = '<option value="' + medidas_itens[i].id + '">' + medidas_itens[i].nome_medida + '</option>';
                $('#select_medida_edit').append(string);
              }
            }
          }
          $('#p_bruto_edit').val(parseFloat(0).toFixed(3));
          $('#p_liquido_edit').val(parseFloat(0).toFixed(3));
          $('#f_correcao').val(parseFloat(0).toFixed(3));
          $('#p_bruto_edit').prop('disabled', true);
          $('#p_liquido_edit').prop('disabled', true);

    });

    $('#select_medida').change(function () {
        var $formMedidaSelected = $('#select_medida option:selected');
        $('#f_correcao').val(parseFloat(0).toFixed(3));
        if($formMedidaSelected.val()==1){
          $('#p_bruto').prop('disabled', false);
          $('#p_liquido').prop('disabled', false);
          $('#p_bruto').val(parseFloat(0).toFixed(3));
          $('#p_liquido').val(parseFloat(0).toFixed(3));
          $('#f_correcao').val(parseFloat(0).toFixed(3));
        }else if($formMedidaSelected.val() > 1){
          for (var i in medidas_itens){
            if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
              $('#p_bruto').prop('disabled', false);
              $('#p_liquido').prop('disabled', false);
              $('#p_bruto').val(parseFloat(medidas_itens[i].medida).toFixed(3));
              $('#p_liquido').val(parseFloat(medidas_itens[i].medida).toFixed(3));
              $('#f_correcao').val(parseFloat(1).toFixed(3));
            }
          }
        }else{
          $('#p_bruto').prop('disabled', true);
          $('#p_liquido').prop('disabled', true);
        }
    });

    $('#select_medida_edit').change(function () {
        var $formMedidaSelected = $('#select_medida_edit option:selected');
        $('#f_correcao_edit').val(parseFloat(0).toFixed(3));
        if($formMedidaSelected.val()==1){
          $('#p_bruto_edit').prop('disabled', false);
          $('#p_liquido_edit').prop('disabled', false);
          $('#p_bruto_edit').val(parseFloat(0).toFixed(3));
          $('#p_liquido_edit').val(parseFloat(0).toFixed(3));
          $('#f_correcao_edit').val(parseFloat(0).toFixed(3));
        }else if($formMedidaSelected.val() > 1){
          for (var i in medidas_itens){
            if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
              $('#p_bruto_edit').prop('disabled', false);
              $('#p_liquido_edit').prop('disabled', false);
              $('#p_bruto_edit').val(parseFloat(medidas_itens[i].medida).toFixed(3));
              $('#p_liquido_edit').val(parseFloat(medidas_itens[i].medida).toFixed(3));
              $('#f_correcao_edit').val(parseFloat(1).toFixed(3));
            }
          }
        }else{
          $('#p_bruto_edit').prop('disabled', true);
          $('#p_liquido_edit').prop('disabled', true);
        }
    });

    $('#p_liquido').change(function () {
          var $formMedidaSelected = $('#select_medida option:selected');
          var $p_liquido = $('#p_liquido').val();
          if(($('#p_bruto').val()) > 0 && ($('#p_liquido').val()) > 0 && ($('#p_bruto').val()) >= ($('#p_liquido').val()) ){
            var $fator =  ($('#p_bruto').val()) / ($('#p_liquido').val());
            $('#f_correcao').val($fator);
          }else{
            $('#f_correcao').val(parseFloat(0).toFixed(3));
          }
          if($formMedidaSelected.val() > 4){
            for (var i in medidas_itens){
              if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
                $('#select_medida').val(medidas_itens[i].unidade_medida);
              }
            }

          }

    });

    $('#p_liquido_edit').change(function () {
          var $formMedidaSelected = $('#select_medida_edit option:selected');
          var $p_liquido = $('#p_liquido_edit').val();
          if(($('#p_bruto_edit').val()) > 0 && ($('#p_liquido_edit').val()) > 0 && ($('#p_bruto_edit').val()) >= ($('#p_liquido_edit').val()) ){
            var $fator =  ($('#p_bruto_edit').val()) / ($('#p_liquido_edit').val());
            $('#f_correcao_edit').val($fator);
          }else{
            $('#f_correcao_edit').val(parseFloat(0).toFixed(3));
          }

          if($formMedidaSelected.val() > 4){
            for (var i in medidas_itens){
              if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
                $('#select_medida_edit').val(medidas_itens[i].unidade_medida);
              }
            }

          }

    });


    $('#p_bruto').change(function () {

          var $formMedidaSelected = $('#select_medida option:selected');

          if(($('#p_bruto').val()) > 0 && ($('#p_liquido').val()) > 0 && ($('#p_bruto').val()) >= ($('#p_liquido').val()) ){
            var $fator =  ($('#p_bruto').val()) / ($('#p_liquido').val());
            $('#f_correcao').val($fator);
          }else{
            $('#f_correcao').val(parseFloat(0).toFixed(3));
          }

          if($formMedidaSelected.val() > 4){
            for (var i in medidas_itens){
              if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
                $('#select_medida').val(medidas_itens[i].unidade_medida);
              }
            }

          }

    });

    $('#p_bruto_edit').change(function () {

          var $formMedidaSelected = $('#select_medida_edit option:selected');

          if(($('#p_bruto_edit').val()) > 0 && ($('#p_liquido_edit').val()) > 0 && ($('#p_bruto_edit').val()) >= ($('#p_liquido_edit').val()) ){
            var $fator =  ($('#p_bruto_edit').val()) / ($('#p_liquido_edit').val());
            $('#f_correcao_edit').val($fator);
          }else{
            $('#f_correcao_edit').val(parseFloat(0).toFixed(3));
          }

          if($formMedidaSelected.val() > 4){
            for (var i in medidas_itens){
              if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
                $('#select_medida_edit').val(medidas_itens[i].unidade_medida);
              }
            }

          }

    });


    $('#r_total').change(function () {
        if(medida_total > 0){
          var coccao =  parseFloat((($('#r_total').val()) / medida_total).toFixed(3));
          $('#f_coccao').val(coccao);
        }else{
          $('#f_coccao').val(parseFloat(0).toFixed(3));
        }

    });

    recarregaTudo();
    $('#botaoAdicionar').click(function () {
        if (!validaAdicionarItem()) {
            if (listaVazia == true) {
                $('#listaVazia').hide();
            }
            adicionarItem();
            listaTamanho++;
            listaVazia = false;
            notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
            limparCamposItem();
            recarregaTudo();
        }
    });

    $('#concluir_edicao').click(function () {
        if (!validaEditarItem()) {
          concluiEditarItem();
          editando = false;
          notificacao_sucesso('Item <b>editado</b> com sucesso.');
          $('#editar_item').modal('hide');
          recarregaTudo();
        }
    });

    function validaAdicionarItem() {
          var erro = false;

          var $formFonteSelected = $('#select_fonte option:selected');
          var $formItemSelected = $('#select_item option:selected');
          var $formMedidaSelected = $('#select_medida option:selected');
          var $formPB = $('#p_bruto');
          var $formPL = $('#p_liquido');
          var $formFC = $('#f_correcao');


          // Trocar vírgula por ponto no valor ou preço do item.
          if (contarLetra($formPB.val(), ',') == 1) {
              var valor = $formPB.val();
              $formPB.val(valor.replace(/,/g, '.'));
          }
          $formPB.val(parseFloat($formPB.val()).toFixed(3));

          if (contarLetra($formPL.val(), ',') == 1) {
              var valor = $formPL.val();
              $formPL.val(valor.replace(/,/g, '.'));
          }
          $formPL.val(parseFloat($formPL.val()).toFixed(3));

          if (contarLetra($formFC.val(), ',') == 1) {
              var valor = $formFC.val();
              $formPB.val(valor.replace(/,/g, '.'));
          }
          $formFC.val(parseFloat($formFC.val()).toFixed(3));

          if ($formFonteSelected.val() < 0) {
              erro = true;
              notificacao_alerta('Selecione uma <b>Fonte</b>.');

          }else if($formItemSelected.val() <= 0) {
              erro = true;
              notificacao_alerta('Selecione um <b>Item</b>.');
          }else if($formMedidaSelected.val() <= 0) {
              erro = true;
              notificacao_alerta('Selecione uma <b>Medida</b>.');
          }

          else if (!$.isNumeric($formPB.val())) {
              erro = true;
              notificacao_alerta('Insira um número em <b>Peso Bruto</b>.');
          }
          else if ($formPB.val() <=0) {
              erro = true;
              notificacao_alerta('Insira um valor maior que 0 (zero) em <b>Per Capta Bruto</b>.');
          }
          else if (!$.isNumeric($formPL.val())) {
              erro = true;
              notificacao_alerta('Insira um número em <b>Peso Líquido</b>.');
          }
          else if ($formPL.val() <= 0) {
              erro = true;
              notificacao_alerta('Insira um valor maior que 0 (zero) em <b>Per Capta Líquido</b>.');
          }else {
              $('var[class="idItem"]').each(function (position, idItem) {
                  if ($(idItem).html() == $formItemSelected.val()) {
                      erro = true;
                      notificacao_alerta('<b>Itens iguais</b> estão sendo adicionados.');
                  }
              });

          }

          return erro;
      }

      function validaEditarItem() {
            var erro = false;

            var $formFonteSelected = $('#select_fonte_edit option:selected');
            var $formItemSelected = $('#select_item_edit option:selected');
            var $formMedidaSelected = $('#select_medida_edit option:selected');
            var $formPB = $('#p_bruto_edit');
            var $formPL = $('#p_liquido_edit');
            var $formFC = $('#f_correcao_edit');


            // Trocar vírgula por ponto no valor ou preço do item.
            if (contarLetra($formPB.val(), ',') == 1) {
                var valor = $formPB.val();
                $formPB.val(valor.replace(/,/g, '.'));
            }
            $formPB.val(parseFloat($formPB.val()).toFixed(3));

            if (contarLetra($formPL.val(), ',') == 1) {
                var valor = $formPL.val();
                $formPL.val(valor.replace(/,/g, '.'));
            }
            $formPL.val(parseFloat($formPL.val()).toFixed(3));

            if (contarLetra($formFC.val(), ',') == 1) {
                var valor = $formFC.val();
                $formPB.val(valor.replace(/,/g, '.'));
            }
            $formFC.val(parseFloat($formFC.val()).toFixed(3));

            if ($formFonteSelected.val() < 0) {
                erro = true;
                notificacao_alerta('Selecine uma <b>Fonte</b>.');

            }else if($formItemSelected.val() <= 0) {
                erro = true;
                notificacao_alerta('Selecine um <b>Item</b>.');
            }else if($formMedidaSelected.val() <= 0) {
                erro = true;
                notificacao_alerta('Selecine uma <b>Medida</b>.');
            }

            else if (!$.isNumeric($formPB.val())) {
                erro = true;
                notificacao_alerta('Insira um número em <b>Peso Bruto</b>.');
            }
            else if ($formPB.val() <0) {
                erro = true;
                notificacao_alerta('Insira um valor maior ou igual a 0 (zero) em <b>Per Capta Bruto</b>.');
            }
            else if (!$.isNumeric($formPL.val())) {
                erro = true;
                notificacao_alerta('Insira um número em <b>Peso Líquido</b>.');
            }
            else if ($formPL.val() <= 0) {
                erro = true;
                notificacao_alerta('Insira um valor maior que 0 (zero) em <b>Per Capta Líquido</b>.');
            }else {
              $('var[class="idItem"]').each(function (position, idItem) {
                  if ($(idItem).html() == $formItemSelected.val() && position != posicaoEditar) {
                      erro = true;
                      notificacao_alerta('<b>Itens iguais</b> estão sendo adicionados.');
                  }
              });
            }

            return erro;
        }

      function limparCamposItem() {
          $('#select_fonte').val(0);
          criaOpcaoItens(0);
          $('#select_medida').empty();
          $('#select_medida').append('<option value="0" option:selected>Selecione uma opção</option>');
          $('#p_bruto').val(parseFloat(0).toFixed(3));
          $('#p_liquido').val(parseFloat(0).toFixed(3));
          $('#f_correcao').val(parseFloat(0).toFixed(3));
          $('#p_bruto').prop('disabled', true);
          $('#p_liquido').prop('disabled', true);

      }

      function adicionarItem() {
          var $formItem = $('#select_item option:selected');
          var $formFonte = $('#select_fonte option:selected');
          var $formMedida = $('#select_medida option:selected');
          var $formPB = $('#p_bruto');
          var $formPL = $('#p_liquido');
          var $formFC = $('#f_correcao');

          if($formMedida.val() > 4){
            for (var i in medidas_itens){
              if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedida.val()){
                $('#select_medida').val(medidas_itens[i].unidade_medida);
                $formMedida = $('#select_medida option:selected');
              }
            }

          }

          var stringHTML = ''
              + '<div class="listaItem">'
              + '<li class="panel label-azul">'
              + '<div class="row">'
              + '<var class="idItem" style="display: none">' + $formItem.val() + '</var>'
              + '<var class="idFonte" style="display: none">' + $formFonte.val() + '</var>'
              + '<var class="idMedida" style="display: none">' + 1 + '</var>'
              + '<var class="valorPB" style="display: none">' + $formPB.val() + '</var>'
              + '<var class="valorPL" style="display: none">' + $formPL.val() + '</var>'
              + '<var class="valorFC" style="display: none">' + $formFC.val() + '</var>'
              + '<div class="col-md-4 wrapper item" style="margin-top: 5px">'
              + $formItem.text()
              + '</div>'
              + '<div class="col-md-2 wrapper pb" style="margin-top: 5px">'
              + (parseFloat($formPB.val())).toFixed(3) + ' ' + $formMedida.text()
              + '</div>'
              + '<div class="col-md-2 wrapper pl" style="margin-top: 5px">'
              + (parseFloat($formPL.val())).toFixed(3) + ' ' + $formMedida.text()
              + '</div>'
              + '<div class="col-md-2 wrapper fc" style="margin-top: 5px">'
              + (parseFloat($formFC.val())).toFixed(3)
              + '</div>'
              + '<div class="col-md-1 text-center">'
              + '<a class="btn btn-default botaoEditar" data-toggle="modal" data-target="#editar_item"><i class="fa fa-edit"></i></a>'
              + '</div>'
              + '<div class="col-md-1 text-center">'
              + '<button class="btn btn-danger botaoRemover data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
              + '</div>'
              + '</div>'
              + '</li>'
              + '</div>';

              for (var i in itens) {
                if (itens.hasOwnProperty(i) != null && itens[i].id == $formItem.val()) {
                  energia = parseFloat(energia.toFixed(3)) + parseFloat((itens[i].calorias * ($formPL.val())/itens[i].medida_base).toFixed(3));
                  carboidratos = parseFloat(carboidratos.toFixed(3)) + parseFloat((itens[i].carboidratos * $formPL.val()/itens[i].medida_base).toFixed(3));
                  proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((itens[i].proteinas * $formPL.val()/itens[i].medida_base).toFixed(3));
                  lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((itens[i].lipidios * $formPL.val()/itens[i].medida_base).toFixed(3));
                  fibras = parseFloat(fibras.toFixed(3)) + parseFloat((itens[i].fibras * $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((itens[i].vitamina_a * $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((itens[i].vitamina_c* $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((itens[i].vitamina_d * $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((itens[i].vitamina_e * $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((itens[i].vitamina_b1 * $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((itens[i].vitamina_b2 * $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((itens[i].vitamina_b6 * $formPL.val()/itens[i].medida_base).toFixed(3));
                  vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((itens[i].vitamina_b12 * $formPL.val()/itens[i].medida_base).toFixed(3));
                  niacina = parseFloat(niacina.toFixed(3)) + parseFloat((itens[i].niacina * $formPL.val()/itens[i].medida_base).toFixed(3));
                  folico = parseFloat(folico.toFixed(3)) + parseFloat((itens[i].folico * $formPL.val()/itens[i].medida_base).toFixed(3));
                  pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((itens[i].pantotenico * $formPL.val()/itens[i].medida_base).toFixed(3));
                  calcio = parseFloat(calcio.toFixed(3)) + parseFloat((itens[i].calcio * $formPL.val()/itens[i].medida_base).toFixed(3));
                  ferro = parseFloat(ferro.toFixed(3)) + parseFloat((itens[i].ferro* $formPL.val()/itens[i].medida_base).toFixed(3));
                  magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((itens[i].magnesio * $formPL.val()/itens[i].medida_base).toFixed(3));
                  potassio = parseFloat(potassio.toFixed(3)) + parseFloat((itens[i].potassio * $formPL.val()/itens[i].medida_base).toFixed(3));
                  selenio = parseFloat(selenio.toFixed(3)) + parseFloat((itens[i].selenio * $formPL.val()/itens[i].medida_base).toFixed(3));
                  fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((itens[i].fosforo * $formPL.val()/itens[i].medida_base).toFixed(3));
                  iodo = parseFloat(iodo.toFixed(3)) + parseFloat((itens[i].iodo * $formPL.val()/itens[i].medida_base).toFixed(3));
                  cobre = parseFloat(cobre.toFixed(3)) + parseFloat((itens[i].cobre * $formPL.val()/itens[i].medida_base).toFixed(3));
                  zinco = parseFloat(zinco.toFixed(3)) + parseFloat((itens[i].zinco * $formPL.val()/itens[i].medida_base).toFixed(3));
                  sodio = parseFloat(sodio.toFixed(3)) + parseFloat((itens[i].sodio * $formPL.val()/itens[i].medida_base).toFixed(3));
                  gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((itens[i].gordura_total * $formPL.val()/itens[i].medida_base).toFixed(3));
                  colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((itens[i].colesterol * $formPL.val()/itens[i].medida_base).toFixed(3));
                  gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((itens[i].gordura_saturada * $formPL.val()/itens[i].medida_base).toFixed(3));
                  gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_poliinsaturada * $formPL.val()/itens[i].medida_base).toFixed(3));
                  gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_monoinsaturada * $formPL.val()/itens[i].medida_base).toFixed(3));
                  medida_total =  parseFloat(medida_total) + parseFloat($formPL.val());
                  valor = parseFloat(valor.toFixed(2)) + parseFloat((itens[i].valor * $formPL.val()/itens[i].medida_base).toFixed(2));
              }
            }
              $('#calorias').val(energia);
              $('#carboidratos').val(carboidratos);
              $('#proteinas').val(proteinas);
              $('#lipidios').val(lipidios);
              $('#fibras').val(fibras);
              $('#vitamina_a').val(vitamina_a);
              $('#vitamina_c').val(vitamina_c);
              $('#vitamina_d').val(vitamina_d);
              $('#vitamina_e').val(vitamina_e);
              $('#vitamina_b1').val(vitamina_b1);
              $('#vitamina_b2').val(vitamina_b2);
              $('#vitamina_b6').val(vitamina_b6);
              $('#vitamina_b12').val(vitamina_b12);
              $('#niacina').val(niacina);
              $('#folico').val(folico);
              $('#pantotenico').val(pantotenico);
              $('#calcio').val(calcio);
              $('#ferro').val(ferro);
              $('#magnesio').val(magnesio);
              $('#potassio').val(potassio);
              $('#selenio').val(selenio);
              $('#fosforo').val(fosforo);
              $('#iodo').val(iodo);
              $('#cobre').val(cobre);
              $('#zinco').val(zinco);
              $('#sodio').val(sodio);
              $('#gordura_total').val(gordura_total);
              $('#colesterol').val(colesterol);
              $('#gordura_saturada').val(gordura_saturada);
              $('#gordura_poliinsaturada').val(gordura_poliinsaturada);
              $('#gordura_monoinsaturada').val(gordura_monoinsaturada);
              $('#valor').val(parseFloat(valor).toFixed(2));



          $('#listaItens').append(stringHTML);
          adicionaLinhaTabela();
      }

      function concluiEditarItem() {
        var $formItemSelected = $('#select_item_edit option:selected');
        var $formTipoSelected = $('#select_tipo_edit option:selected');
        var $formMedidaSelected = $('#select_medida_edit option:selected');
        var $formPB = $('#p_bruto_edit');
        var $formPL = $('#p_liquido_edit');
        var $formFC = $('#f_correcao_edit');
        if(listaVazia == true){
          $('#listaVazia').show();
        }

        $($('.idTipo')[posicaoEditar]).html($formTipoSelected.val());
        $($('.idItem')[posicaoEditar]).html($formItemSelected.val());
        $($('.idMedida')[posicaoEditar]).html($formMedidaSelected.val());

        $($('.valorPL')[posicaoEditar]).html($formPL.val());
        $($('.valorPB')[posicaoEditar]).html($formPB.val());
        $($('.valorFC')[posicaoEditar]).html((parseFloat($formFC.val())).toFixed(3));

        $($('.tipo')[posicaoEditar]).html($formTipoSelected.text());
        $($('.item')[posicaoEditar]).html($formItemSelected.text());

        if($formPB.val() > 0){
          $($('.pb')[posicaoEditar]).html($formPB.val() + ' g');
          $($('.fc')[posicaoEditar]).html((parseFloat($formFC.val())).toFixed(3));
        }else {
          $($('.pb')[posicaoEditar]).html('N/A');
          $($('.fc')[posicaoEditar]).html('N/A');
        }
        $($('.pl')[posicaoEditar]).html($formPL.val() + ' g');



        for (var i in itens) {
          if (itens.hasOwnProperty(i) != null && itens[i].id == $formItemSelected.val()) {
              energia = parseFloat(energia.toFixed(3)) + parseFloat((itens[i].calorias * $formPL.val()/itens[i].medida_base).toFixed(3));
              carboidratos = parseFloat(carboidratos.toFixed(3)) + parseFloat((itens[i].carboidratos * $formPL.val()/itens[i].medida_base).toFixed(3));
              proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((itens[i].proteinas * $formPL.val()/itens[i].medida_base).toFixed(3));
              lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((itens[i].lipidios * $formPL.val()/itens[i].medida_base).toFixed(3));
              fibras = parseFloat(fibras.toFixed(3)) + parseFloat((itens[i].fibras * $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((itens[i].vitamina_a * $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((itens[i].vitamina_c* $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((itens[i].vitamina_d * $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((itens[i].vitamina_e * $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((itens[i].vitamina_b1 * $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((itens[i].vitamina_b2 * $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((itens[i].vitamina_b6 * $formPL.val()/itens[i].medida_base).toFixed(3));
              vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((itens[i].vitamina_b12 * $formPL.val()/itens[i].medida_base).toFixed(3));
              niacina = parseFloat(niacina.toFixed(3)) + parseFloat((itens[i].niacina * $formPL.val()/itens[i].medida_base).toFixed(3));
              folico = parseFloat(folico.toFixed(3)) + parseFloat((itens[i].folico * $formPL.val()/itens[i].medida_base).toFixed(3));
              pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((itens[i].pantotenico * $formPL.val()/itens[i].medida_base).toFixed(3));
              calcio = parseFloat(calcio.toFixed(3)) + parseFloat((itens[i].calcio * $formPL.val()/itens[i].medida_base).toFixed(3));
              ferro = parseFloat(ferro.toFixed(3)) + parseFloat((itens[i].ferro* $formPL.val()/itens[i].medida_base).toFixed(3));
              magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((itens[i].magnesio * $formPL.val()/itens[i].medida_base).toFixed(3));
              potassio = parseFloat(potassio.toFixed(3)) + parseFloat((itens[i].potassio * $formPL.val()/itens[i].medida_base).toFixed(3));
              selenio = parseFloat(selenio.toFixed(3)) + parseFloat((itens[i].selenio * $formPL.val()/itens[i].medida_base).toFixed(3));
              fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((itens[i].fosforo * $formPL.val()/itens[i].medida_base).toFixed(3));
              iodo = parseFloat(iodo.toFixed(3)) + parseFloat((itens[i].iodo * $formPL.val()/itens[i].medida_base).toFixed(3));
              cobre = parseFloat(cobre.toFixed(3)) + parseFloat((itens[i].cobre * $formPL.val()/itens[i].medida_base).toFixed(3));
              zinco = parseFloat(zinco.toFixed(3)) + parseFloat((itens[i].zinco * $formPL.val()/itens[i].medida_base).toFixed(3));
              sodio = parseFloat(sodio.toFixed(3)) + parseFloat((itens[i].sodio * $formPL.val()/itens[i].medida_base).toFixed(3));
              gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((itens[i].gordura_total * $formPL.val()/itens[i].medida_base).toFixed(3));
              colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((itens[i].colesterol * $formPL.val()/itens[i].medida_base).toFixed(3));
              gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((itens[i].gordura_saturada * $formPL.val()/itens[i].medida_base).toFixed(3));
              gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_poliinsaturada * $formPL.val()/itens[i].medida_base).toFixed(3));
              gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_monoinsaturada * $formPL.val()/itens[i].medida_base).toFixed(3));
              medida_total =  parseFloat(medida_total) + parseFloat($formPL.val());
              valor = parseFloat(valor.toFixed(2)) + parseFloat((itens[i].valor * $formPL.val()/itens[i].medida_base).toFixed(2));
          }
        }

        $('#calorias').val(parseFloat(energia).toFixed(3));
        $('#carboidratos').val(parseFloat(carboidratos).toFixed(3));
        $('#proteinas').val(parseFloat(proteinas).toFixed(3));
        $('#lipidios').val(parseFloat(lipidios).toFixed(3));
        $('#fibras').val(parseFloat(fibras).toFixed(3));
        $('#vitamina_a').val(parseFloat(vitamina_a).toFixed(3));
        $('#vitamina_c').val(parseFloat(vitamina_c).toFixed(3));
        $('#vitamina_d').val(parseFloat(vitamina_d).toFixed(3));
        $('#vitamina_e').val(parseFloat(vitamina_e).toFixed(3));
        $('#vitamina_b1').val(parseFloat(vitamina_b1).toFixed(3));
        $('#vitamina_b2').val(parseFloat(vitamina_b2).toFixed(3));
        $('#vitamina_b6').val(parseFloat(vitamina_b6).toFixed(3));
        $('#vitamina_b12').val(parseFloat(vitamina_b12).toFixed(3));
        $('#niacina').val(parseFloat(niacina).toFixed(3));
        $('#folico').val(parseFloat(folico).toFixed(3));
        $('#pantotenico').val(parseFloat(pantotenico).toFixed(3));
        $('#calcio').val(parseFloat(calcio).toFixed(3));
        $('#ferro').val(parseFloat(ferro).toFixed(3));
        $('#magnesio').val(parseFloat(magnesio).toFixed(3));
        $('#potassio').val(parseFloat(potassio).toFixed(3));
        $('#selenio').val(parseFloat(selenio).toFixed(3));
        $('#fosforo').val(parseFloat(fosforo).toFixed(3));
        $('#iodo').val(parseFloat(iodo).toFixed(3));
        $('#cobre').val(parseFloat(cobre).toFixed(3));
        $('#zinco').val(parseFloat(zinco).toFixed(3));
        $('#sodio').val(parseFloat(sodio).toFixed(3));
        $('#gordura_total').val(parseFloat(gordura_total).toFixed(3));
        $('#colesterol').val(parseFloat(colesterol).toFixed(3));
        $('#gordura_saturada').val(parseFloat(gordura_saturada).toFixed(3));
        $('#gordura_poliinsaturada').val(parseFloat(gordura_poliinsaturada).toFixed(3));
        $('#gordura_monoinsaturada').val(parseFloat(gordura_monoinsaturada).toFixed(3));
        $('#valor').val(parseFloat(valor).toFixed(2));
        adicionaLinhaTabela();
      }



      function recarregaEditarItem() {
        var $botaoEditar = $('.botaoEditar');

        $botaoEditar.off();
        $botaoEditar.each(function (posicao, botaoEditar) {
            $(botaoEditar).click(function () {
                var $idFonte = $($('.idFonte')[posicao]);
                var $idItem = $($('.idItem')[posicao]);
                var $idMedida = $($('.idMedida')[posicao]);
                var $p_bruto = $($('.valorPB')[posicao]);
                var $p_liquido = $($('.valorPL')[posicao]);
                var $f_correcao = $($('.valorFC')[posicao]);



                posicaoEditar = posicao;
                editando = true;

                $('#select_fonte_edit').val($idFonte.html());
                criaOpcaoItensEdit($idFonte.html());
                $('#select_item_edit').val($idItem.html());
                criaOpcaoMedidasEdit($idItem.html());
                $('#select_item_edit').selectpicker('refresh');
                $('#select_medida_edit').val($idMedida.html());
                $('#p_bruto_edit').val($p_bruto.html());
                $('#p_liquido_edit').val($p_liquido.html());
                $('#f_correcao_edit').val($f_correcao.html());

                for (var i in itens){
                  if (itens.hasOwnProperty(i) != null && itens[i].id == $idItem.html()){
                      energia = parseFloat(energia.toFixed(3)) - parseFloat((itens[i].calorias * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      carboidratos = parseFloat(carboidratos.toFixed(3)) - parseFloat((itens[i].carboidratos * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      proteinas = parseFloat(proteinas.toFixed(3)) - parseFloat((itens[i].proteinas * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      lipidios = parseFloat(lipidios.toFixed(3)) - parseFloat((itens[i].lipidios * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      fibras = parseFloat(fibras.toFixed(3)) - parseFloat((itens[i].fibras * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_a = parseFloat(vitamina_a.toFixed(3)) - parseFloat((itens[i].vitamina_a * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_c = parseFloat(vitamina_c.toFixed(3)) - parseFloat((itens[i].vitamina_c* $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_d = parseFloat(vitamina_d.toFixed(3)) - parseFloat((itens[i].vitamina_d * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_e = parseFloat(vitamina_e.toFixed(3)) - parseFloat((itens[i].vitamina_e * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) - parseFloat((itens[i].vitamina_b1 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) - parseFloat((itens[i].vitamina_b2 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) - parseFloat((itens[i].vitamina_b6 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) - parseFloat((itens[i].vitamina_b12 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      niacina = parseFloat(niacina.toFixed(3)) - parseFloat((itens[i].niacina * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      folico = parseFloat(folico.toFixed(3)) - parseFloat((itens[i].folico * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      pantotenico = parseFloat(pantotenico.toFixed(3)) - parseFloat((itens[i].pantotenico * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      calcio = parseFloat(calcio.toFixed(3)) - parseFloat((itens[i].calcio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      ferro = parseFloat(ferro.toFixed(3)) - parseFloat((itens[i].ferro* $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      magnesio = parseFloat(magnesio.toFixed(3)) - parseFloat((itens[i].magnesio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      potassio = parseFloat(potassio.toFixed(3)) - parseFloat((itens[i].potassio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      selenio = parseFloat(selenio.toFixed(3)) - parseFloat((itens[i].selenio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      fosforo = parseFloat(fosforo.toFixed(3)) - parseFloat((itens[i].fosforo * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      iodo = parseFloat(iodo.toFixed(3)) - parseFloat((itens[i].iodo * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      cobre = parseFloat(cobre.toFixed(3)) - parseFloat((itens[i].cobre * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      zinco = parseFloat(zinco.toFixed(3)) - parseFloat((itens[i].zinco * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      sodio = parseFloat(sodio.toFixed(3)) - parseFloat((itens[i].sodio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_total = parseFloat(gordura_total.toFixed(3)) - parseFloat((itens[i].gordura_total * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      colesterol = parseFloat(colesterol.toFixed(3)) - parseFloat((itens[i].colesterol * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) - parseFloat((itens[i].gordura_saturada * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_poliinsaturada * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_monoinsaturada * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      medida_total =  parseFloat(medida_total) - parseFloat($p_liquido.html());
                      valor = parseFloat(valor.toFixed(2)) - parseFloat((itens[i].valor * $p_liquido.html()/itens[i].medida_base).toFixed(2));
                  }
                }

            });
        });
      }


      function recarregaRemoverItem() {
        var $botaoRemover = $('.botaoRemover');

        $botaoRemover.off();
        $botaoRemover.each(function (posicao, botaoRemover) {
            $(botaoRemover).click(function () {
                var $idItem = $($('.idItem')[posicao]);
                var $p_liquido = $($('.valorPL')[posicao]);
                var $p_medida = $($('.idMedida')[posicao]);
                $($('.listaItem')[posicao]).remove();
                $($('.label-azul')[posicao]).remove();
                listaTamanho--;
                if (listaTamanho == 0) {
                    $('#listaVazia').show();
                    listaVazia = true;
                }

                for (var i in itens){
                  if (itens.hasOwnProperty(i) != null && itens[i].id == $idItem.html()){
                      energia = parseFloat(energia.toFixed(3)) - parseFloat((itens[i].calorias * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      carboidratos = parseFloat(carboidratos.toFixed(3)) - parseFloat((itens[i].carboidratos * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      proteinas = parseFloat(proteinas.toFixed(3)) - parseFloat((itens[i].proteinas * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      lipidios = parseFloat(lipidios.toFixed(3)) - parseFloat((itens[i].lipidios * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      fibras = parseFloat(fibras.toFixed(3)) - parseFloat((itens[i].fibras * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_a = parseFloat(vitamina_a.toFixed(3)) - parseFloat((itens[i].vitamina_a * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_c = parseFloat(vitamina_c.toFixed(3)) - parseFloat((itens[i].vitamina_c* $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_d = parseFloat(vitamina_d.toFixed(3)) - parseFloat((itens[i].vitamina_d * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_e = parseFloat(vitamina_e.toFixed(3)) - parseFloat((itens[i].vitamina_e * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) - parseFloat((itens[i].vitamina_b1 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) - parseFloat((itens[i].vitamina_b2 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) - parseFloat((itens[i].vitamina_b6 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) - parseFloat((itens[i].vitamina_b12 * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      niacina = parseFloat(niacina.toFixed(3)) - parseFloat((itens[i].niacina * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      folico = parseFloat(folico.toFixed(3)) - parseFloat((itens[i].folico * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      pantotenico = parseFloat(pantotenico.toFixed(3)) - parseFloat((itens[i].pantotenico * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      calcio = parseFloat(calcio.toFixed(3)) - parseFloat((itens[i].calcio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      ferro = parseFloat(ferro.toFixed(3)) - parseFloat((itens[i].ferro* $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      magnesio = parseFloat(magnesio.toFixed(3)) - parseFloat((itens[i].magnesio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      potassio = parseFloat(potassio.toFixed(3)) - parseFloat((itens[i].potassio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      selenio = parseFloat(selenio.toFixed(3)) - parseFloat((itens[i].selenio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      fosforo = parseFloat(fosforo.toFixed(3)) - parseFloat((itens[i].fosforo * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      iodo = parseFloat(iodo.toFixed(3)) - parseFloat((itens[i].iodo * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      cobre = parseFloat(cobre.toFixed(3)) - parseFloat((itens[i].cobre * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      zinco = parseFloat(zinco.toFixed(3)) - parseFloat((itens[i].zinco * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      sodio = parseFloat(sodio.toFixed(3)) - parseFloat((itens[i].sodio * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_total = parseFloat(gordura_total.toFixed(3)) - parseFloat((itens[i].gordura_total * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      colesterol = parseFloat(colesterol.toFixed(3)) - parseFloat((itens[i].colesterol * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) - parseFloat((itens[i].gordura_saturada * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_poliinsaturada * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_monoinsaturada * $p_liquido.html()/itens[i].medida_base).toFixed(3));
                      medida_total =  parseFloat(medida_total) - parseFloat($p_liquido.html());
                      valor = parseFloat(valor.toFixed(2)) - parseFloat((itens[i].valor * $p_liquido.html()/itens[i].medida_base).toFixed(2));

                  }
                }
                $('#calorias').val(parseFloat(energia).toFixed(3));
                $('#carboidratos').val(parseFloat(carboidratos).toFixed(3));
                $('#proteinas').val(parseFloat(proteinas).toFixed(3));
                $('#lipidios').val(parseFloat(lipidios).toFixed(3));
                $('#fibras').val(parseFloat(fibras).toFixed(3));
                $('#vitamina_a').val(parseFloat(vitamina_a).toFixed(3));
                $('#vitamina_c').val(parseFloat(vitamina_c).toFixed(3));
                $('#vitamina_d').val(parseFloat(vitamina_d).toFixed(3));
                $('#vitamina_e').val(parseFloat(vitamina_e).toFixed(3));
                $('#vitamina_b1').val(parseFloat(vitamina_b1).toFixed(3));
                $('#vitamina_b2').val(parseFloat(vitamina_b2).toFixed(3));
                $('#vitamina_b6').val(parseFloat(vitamina_b6).toFixed(3));
                $('#vitamina_b12').val(parseFloat(vitamina_b12).toFixed(3));
                $('#niacina').val(parseFloat(niacina).toFixed(3));
                $('#folico').val(parseFloat(folico).toFixed(3));
                $('#pantotenico').val(parseFloat(pantotenico).toFixed(3));
                $('#calcio').val(parseFloat(calcio).toFixed(3));
                $('#ferro').val(parseFloat(ferro).toFixed(3));
                $('#magnesio').val(parseFloat(magnesio).toFixed(3));
                $('#potassio').val(parseFloat(potassio).toFixed(3));
                $('#selenio').val(parseFloat(selenio).toFixed(3));
                $('#fosforo').val(parseFloat(fosforo).toFixed(3));
                $('#iodo').val(parseFloat(iodo).toFixed(3));
                $('#cobre').val(parseFloat(cobre).toFixed(3));
                $('#zinco').val(parseFloat(zinco).toFixed(3));
                $('#sodio').val(parseFloat(sodio).toFixed(3));
                $('#gordura_total').val(parseFloat(gordura_total).toFixed(3));
                $('#colesterol').val(parseFloat(colesterol).toFixed(3));
                $('#gordura_saturada').val(parseFloat(gordura_saturada).toFixed(3));
                $('#gordura_poliinsaturada').val(parseFloat(gordura_poliinsaturada).toFixed(3));
                $('#gordura_monoinsaturada').val(parseFloat(gordura_monoinsaturada).toFixed(3));
                $('#valor').val(parseFloat(valor).toFixed(2));

                adicionaLinhaTabela();
                recarregaTudo();
                if (listaTamanho == 0) {
                    $('#listaVazia').show();
                    listaVazia = true;
                }
                notificacao_sucesso('Item <b>removido</b> com sucesso.');
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
        recarregaRemoverItem();
        recarregaEditarItem();
      }

      function enviarCadastro() {

        var id_tipo_preparacao = $("#select_tipo_preparacao option:selected").val();
        var nome = $("#nome").val();
        var descricao = $("#descricao").val();
        var modo_preparo = $("#modo_preparo").val();
        var rendimento = $("#r_total").val();


        var jsonListaItens = [];

        $('var[class="idFonte"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                    id_tipo_preparacao: id_tipo_preparacao,
                    nome: nome,
                    descricao: descricao,
                    modo_preparo: modo_preparo,
                    medida_total: rendimento,
                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });
        $('var[class="idItem"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                    id_tipo_preparacao: id_tipo_preparacao,
                    nome: nome,
                    descricao: descricao,
                    modo_preparo: modo_preparo,
                    medida_total: rendimento,

                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });
        $('var[class="valorPB"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                    id_tipo_preparacao: id_tipo_preparacao,
                    nome: nome,
                    descricao: descricao,
                    modo_preparo: modo_preparo,
                    medida_total: rendimento,
                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });
        $('var[class="valorPL"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                    id_tipo_preparacao: id_tipo_preparacao,
                    nome: nome,
                    descricao: descricao,
                    modo_preparo: modo_preparo,
                    medida_total: rendimento,

                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });

        $('var[class="idMedida"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                    id_tipo_preparacao: id_tipo_preparacao,
                    nome: nome,
                    descricao: descricao,
                    modo_preparo: modo_preparo,
                    medida_total: rendimento,

                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });

        // Contrato novo.

        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });


        $.ajax({
                  url: '/preparation/save',
                  type: 'post',
                  dataType: "text",
                  data: { testdata : JSON.stringify(jsonListaItens) },
                  success: function (data, status) {
                      mostraDialogo4(data);

                  },
                  error: function (xhr, desc, err) {
                    alert('Erro');
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
