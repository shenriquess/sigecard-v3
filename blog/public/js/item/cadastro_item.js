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

function validaListaVazia() {
    var erro = false;
    if(listaTamanho == 0){
        notificacao_alerta('A lista de Ingredientes está <b>Vazia</b>.');
        erro = true;
    }
    return erro;
}

function validaEnviarFormulario() {
      var erro = false;

      var nome = $("#nome");
      var id_tipo_item = $("#id_tipo_item option:selected");
      var id_fonte = $("#id_fonte option:selected");
      var id_unidade_medida = $("#unidade_medida option:selected");
      var medida_base = $("#medida_base");
      var calorias = $("#calorias");
      var carboidratos = $("#carboidratos");
      var proteinas = $("#proteinas");
      var lipidios = $("#lipidios");
      var fibras = $("#fibras");
      var vitamina_a = $("#vitamina_a");
      var vitamina_c = $("#vitamina_c");
      var vitamina_d = $("#vitamina_d");
      var vitamina_e = $("#vitamina_e");
      var vitamina_b1 = $("#vitamina_b1");
      var vitamina_b2 = $("#vitamina_b2");
      var vitamina_b6 = $("#vitamina_b6");
      var vitamina_b12 = $("#vitamina_b12");
      var niacina = $("#niacina");
      var folico = $("#folico");
      var pantotenico = $("#pantotenico");
      var calcio = $("#calcio");
      var ferro = $("#ferro");
      var magnesio = $("#magnesio");
      var potassio = $("#potassio");
      var selenio = $("#selenio");
      var fosforo = $("#fosforo");
      var iodo = $("#iodo");
      var cobre = $("#cobre");
      var zinco = $("#zinco");
      var sodio = $("#sodio");
      var gordura_total = $("#gordura_total");
      var colesterol = $("#colesterol");
      var gordura_saturada = $("#gordura_saturada");
      var gordura_poliinsaturada = $("#gordura_poliinsaturada");
      var gordura_monoinsaturada = $("#gordura_monoinsaturada");
      var valor = $("#valor");


      if (nome.val() == "") {
            erro = true;
            notificacao_alerta('Digite um <b>Nome</b>.');
      }else if (id_tipo_item.val() <= 0) {
            erro = true;
            notificacao_alerta('Selecine um <b>Grupo de Alimentos</b>.');
      }else if (id_fonte.val() <= 0) {
            erro = true;
            notificacao_alerta('Selecine uma <b>Fonte de Informações Nutricionais</b>.');
      }else if (valor.val() < 0) {
            erro = true;
            notificacao_alerta('Insira um valor válido em <b>Preço</b>.');
      }else if (!$.isNumeric(medida_base.val()) || medida_base.val() <= 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido em <b>Medida Base</b>.');
      }else if (!$.isNumeric(calorias.val()) || calorias.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Calorias</b>.');
      }else if (!$.isNumeric(carboidratos.val()) || carboidratos.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Carboidratos</b>.');
      }else if (!$.isNumeric(proteinas.val()) || proteinas.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Proteínas</b>.');
      }else if (!$.isNumeric(lipidios.val()) || lipidios.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Lipídios</b>.');
      }else if (!$.isNumeric(fibras.val()) || fibras.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Fibras</b>.');
      }else if (!$.isNumeric(vitamina_a.val()) || vitamina_a.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina A</b>.');
      }else if (!$.isNumeric(vitamina_c.val()) || vitamina_c.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina C</b>.');
      }else if (!$.isNumeric(vitamina_d.val()) || vitamina_d.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina D</b>.');
      }else if (!$.isNumeric(vitamina_e.val()) || vitamina_e.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina E</b>.');
      }else if (!$.isNumeric(vitamina_b1.val()) || vitamina_b1.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina B1</b>.');
      }else if (!$.isNumeric(vitamina_b2.val()) || vitamina_b2.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina B2</b>.');
      }else if (!$.isNumeric(vitamina_b6.val()) || vitamina_b6.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina B6</b>.');
      }else if (!$.isNumeric(vitamina_b12.val()) || vitamina_b12.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Vitamina B12</b>.');
      }else if (!$.isNumeric(niacina.val()) || niacina.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Niacia</b>.');
      }else if (!$.isNumeric(folico.val()) || folico.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Ácido Fólico</b>.');
      }else if (!$.isNumeric(pantotenico.val()) || pantotenico.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Ácido Pantotênico</b>.');
      }else if (!$.isNumeric(calcio.val()) || calcio.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Cálcio</b>.');
      }else if (!$.isNumeric(ferro.val()) || ferro.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Ferro</b>.');
      }else if (!$.isNumeric(magnesio.val()) || magnesio.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Magnésio</b>.');
      }else if (!$.isNumeric(potassio.val()) || potassio.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Potássio</b>.');
      }else if (!$.isNumeric(selenio.val()) || selenio.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Selênio</b>.');
      }else if (!$.isNumeric(fosforo.val()) || fosforo.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Fósforo</b>.');
      }else if (!$.isNumeric(iodo.val()) || iodo.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Iodo</b>.');
      }else if (!$.isNumeric(cobre.val()) || cobre.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Cobre</b>.');
      }else if (!$.isNumeric(zinco.val()) || zinco.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Zinco</b>.');
      }else if (!$.isNumeric(sodio.val()) ||sodio.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Sódio</b>.');
      }else if (!$.isNumeric(gordura_total.val()) || gordura_total.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Gordura Total</b>.');
      }else if (!$.isNumeric(colesterol.val()) || colesterol.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Colesterol</b>.');
      }else if (!$.isNumeric(gordura_saturada.val()) || gordura_saturada.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Gordura Saturada</b>.');
      }else if (!$.isNumeric(gordura_poliinsaturada.val()) || gordura_poliinsaturada.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Gordura Poliinsaturada</b>.');
      }else if (!$.isNumeric(gordura_monoinsaturada.val()) || gordura_monoinsaturada.val() < 0 ) {
            erro = true;
            notificacao_alerta('Insira um valor válido no Valor Nutricional <b>Gordura Monoinsaturada</b>.');
      }else{
        erro = false;
      }
      return erro;

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


    /*var unidadePreco1 = '<option value="0">Unidade de Medida</option>'
                      + '<option value="1">Kg</option>'
                      + '<option value="2">g</option>';

    var unidadePreco2 = '<option value="0">Unidade de Medida</option>'
                      + '<option value="3">L</option>'
                      + '<option value="4">ml</option>';

    var $formUnidadeMedida2 = $('#unidade_medida2');

    var $formUnidadeMedida3 = $('#select_medida_caseira');

    $('#unidade_medida').change(function () {

      var $formUnidadeSelected = $('#unidade_medida option:selected');


      $('#span_base').empty();


      $('#span_base').html($formUnidadeSelected.text());

      $formUnidadeMedida2.empty();

      $formUnidadeMedida3.empty();

      if($formUnidadeSelected.val() > 0){
        $('#span_base').empty();
        $('#span_base').html($formUnidadeSelected.text());
        $('#medida_base').prop('disabled', false);
        $('#medida_base2').prop('disabled', false);
        $('#valor2').prop('disabled', false);
        $('#unidade_medida2').prop('disabled', false);
        if($formUnidadeSelected.val() == 1 || $formUnidadeSelected.val() == 2){
            $formUnidadeMedida2.html(unidadePreco1);
            $formUnidadeMedida3.html(unidadePreco1);
        }else{
            $formUnidadeMedida2.html(unidadePreco2);
            $formUnidadeMedida3.html(unidadePreco2);
        }
      }else {
        $('#span_base').empty();
        $('#span_base').html('');
        $('#medida_base').val(0);
        $('#medida_base').prop('disabled', true);
        $('#medida_base').val('');
        $('#medida_base2').prop('placeholder', 'Quantidade');
        $('#medida_base2').prop('disabled', true);
        $('#valor2').val(0);
        $('#valor2').prop('disabled', true);
        $formUnidadeMedida2.prop('disabled', true);
        $formUnidadeMedida2.empty();
        $formUnidadeMedida2.html('<option value="0">Unidade de Medida</option>');
        $formUnidadeMedida3.empty();
        $formUnidadeMedida3.html('<option value="0">Unidade de Medida</option>');

      }



    });*/


    /*$('#select_medida_caseira').change(function () {

      var $formUnidadeSelected = $('#select_medida_caseira option:selected');


      $('#span_quantidade_c').empty();


      $('#span_quantidade_c').html($formUnidadeSelected.text());


      if($formUnidadeSelected.val() > 0){
        $('#span_quantidade_c').empty();
        $('#span_quantidade_c').html($formUnidadeSelected.text());
        $('#quantidade_c').prop('disabled', false);
        $('#quantidade_c').prop('disabled', false);

      }else {
        $('#span_quantidade_c').empty();
        $('#span_quantidade_c').html('');
        $('#quantidade_c').val(0);
        $('#quantidade_c').prop('disabled', true);

      }

    });*/

    /*if($('#medida_base').val() >= 0  && $('#unidade_medida option:selected').val() >0){
      $('#span_base2').empty();
      $('#span_base2').html('/ '+ $('#medida_base').val() + ' ' +   $('#unidade_medida option:selected').text());
      $('#valor2').prop('disabled', false);
      $('#unidade_medida2').prop('disabled', false);
      $('#medida_base2').prop('disabled', false);
      var $formUnidadeSelected = $('#unidade_medida option:selected');


      $('#span_base').empty();


      $('#span_base').html($formUnidadeSelected.text());

      $formUnidadeMedida2.empty();

      $formUnidadeMedida3.empty();

      if($formUnidadeSelected.val() > 0){
        $('#span_base').empty();
        $('#span_base').html($formUnidadeSelected.text());
        $('#medida_base').prop('disabled', false);
        $('#medida_base2').prop('disabled', false);
        $('#valor2').prop('disabled', false);
        $('#unidade_medida2').prop('disabled', false);
        if($formUnidadeSelected.val() == 1 || $formUnidadeSelected.val() == 2){
            $formUnidadeMedida2.html(unidadePreco1);
            $formUnidadeMedida3.html(unidadePreco1);
        }else{
            $formUnidadeMedida2.html(unidadePreco2);
            $formUnidadeMedida4.html(unidadePreco1);
        }
      }else {
        $('#span_base').empty();
        $('#span_base').html('');
        $('#medida_base').val(0);
        $('#medida_base').prop('disabled', true);
        $('#medida_base').val('');
        $('#medida_base2').prop('placeholder', 'Quantidade');
        $('#medida_base2').prop('disabled', true);
        $('#valor2').val(0);
        $('#valor2').prop('disabled', true);
        $formUnidadeMedida2.prop('disabled', true);
        $formUnidadeMedida2.empty();
        $formUnidadeMedida2.html('<option value="0">Unidade de Medida</option>');
        $formUnidadeMedida3.empty();
        $formUnidadeMedida3.html('<option value="0">Unidade de Medida</option>');

      }
    }*/

    /*$('#botaoCalcular').click(function () {

        var $formUnidadeSelected = $('#unidade_medida option:selected');
        var $formUnidadeSelected2 = $('#unidade_medida2 option:selected');
        var $medidaBase = $('#medida_base').val();
        var $medidaBase2 = $('#medida_base2').val();
        var $valor = $('#valor');
        var $valor2 = $('#valor2').val();


        if (($formUnidadeSelected.val() == 1 || $formUnidadeSelected.val() ==3) &&
            ($formUnidadeSelected2.val() == 2 || $formUnidadeSelected2.val() == 4) &&
              ($medidaBase2 > 0 && $medidaBase2!='')){
            $valor.val($valor2*$medidaBase/($medidaBase2/1000));
            if($formUnidadeSelected.val() == 1){
              $('#span_base2').empty();
              $('#span_base2').html('/ '+ $medidaBase + ' Kg');
            }else{
              $('#span_base2').empty();
              $('#span_base2').html('/ '+ $medidaBase + ' L');
            }

        }else if (($formUnidadeSelected.val() == 2|| $formUnidadeSelected.val() == 4) &&
                  ($formUnidadeSelected2.val() == 1 || $formUnidadeSelected2.val() == 3) &&
                  ($medidaBase2 > 0 && $medidaBase2!='')) {
            $valor.val($valor2*$medidaBase/($medidaBase2*1000));
            if($formUnidadeSelected.val() == 2){
              $('#span_base2').empty();
              $('#span_base2').html('/ '+ $medidaBase + ' g');
            }else{
              $('#span_base2').empty();
              $('#span_base2').html('/ '+ $medidaBase + ' ml');
            }
        }else if (($formUnidadeSelected.val() ==  $formUnidadeSelected2.val()) &&
                  ($medidaBase2 >0 && $medidaBase2!='')) {
            $valor.val($valor2*$medidaBase/($medidaBase2));
            if($formUnidadeSelected2.val() == 2){
              $('#span_base2').empty();
              $('#span_base2').html('/ '+ $medidaBase + ' '  + $formUnidadeSelected.text());
            }else{
              $('#span_base2').empty();
              $('#span_base2').html('/ '+ $medidaBase + ' ' + $formUnidadeSelected.text());
            }
        }else{
            if($formUnidadeSelected.val() > 0){
              $('#span_base2').empty();
              $('#span_base2').html('/ '+ $medidaBase + ' ' + $formUnidadeSelected.text());
            }else{
                $('#span_base2').empty();
                $valor.val(0);
            }
            $valor.val(0);
        }



    });*/

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

    $('#botaoCalcDensidade').click(function () {
      $selectItem = $('#select_item option:selected');
      $mililitros = $('#valor_ml');
      $gramas = 0;
      $densidade =0;
      if($mililitros.val <= 0 || $mililitros.val() == ""){
        notificacao_alerta('Digite um valor válido em <b>Medida em <i>ml</i></b>.');
      }else if ($selectItem.val() <= 0) {
        notificacao_alerta('Selecione um <b>Item</b>.');
      }else {
        for(var i in densidades){
          if(densidades[i].id == $selectItem.val()){
            $densidade = densidades[i].valor;
          }
        }
        $gramas = parseFloat(($mililitros.val() * $densidade).toFixed(3));
        $('#valor_g').val($gramas);
      }

    });


    function validaAdicionarItem() {
          var erro = false;


          var $formMedidaSelected = $('#select_medida_caseira option:selected');
          var $formNomeMedida = $('#nome_medida');
          var $formQuantidade = $('#quantidade_c');

          // Trocar vírgula por ponto no valor ou preço do item.
          if (contarLetra($formQuantidade.val(), ',') == 1) {
              var valor = $formQuantidade.val();
              $formQuantidade.val(valor.replace(/,/g, '.'));
          }
          $formQuantidade.val(parseFloat($formQuantidade.val()).toFixed(3));

          if (!$.isNumeric($formQuantidade.val())) {
              erro = true;
              notificacao_alerta('Insira um número em <b>Quantidade</b>.');
          }
          else if ($formQuantidade.val() <= 0) {
              erro = true;
              notificacao_alerta('Insira um valor maior que 0 (zero) em <b>Qauntidade</b>.');
          }
          else if ($formNomeMedida.val() == '') {
              erro = true;
              notificacao_alerta('Insira um nome em <b>Nome da Medida</b>.');
          }
          else {
              $('var[class="nome"]').each(function (position, nome) {
                  if ($(nome).html() == $formNomeMedida.val()) {
                      erro = true;
                      notificacao_alerta('<b>Medidas com nomes iguais</b> estão sendo adicionadas.');
                  }
              });

          }

          return erro;
      }

      function limparCamposItem() {
          $('#nome_medida').val('');
          $('#quantidade_c').val('0.000');
      }

      function adicionarItem() {
          var $formNomeMedida = $('#nome_medida');
          var $formQuantidade = $('#quantidade_c');

          var stringHTML = ''
              + '<div class="listaItem">'
              + '<li class="panel label-azul">'
              + '<div class="row">'
              + '<var class="idMedida" style="display: none">' + 1 + '</var>'
              + '<var class="nome_medida" style="display: none">' + $formNomeMedida.val() + '</var>'
              + '<var class="quantidade" style="display: none">' + $formQuantidade.val() + '</var>'
              + '<div class="col-md-6 wrapper nome_medida" style="margin-top: 5px">'
              + $formNomeMedida.val()
              + '</div>'
              + '<div class="col-md-4 wrapper valor_medida" style="margin-top: 5px">'
              + $formQuantidade.val() + ' ' + 'g'
              + '</div>'
              + '<div class="col-md-2 text-center">'
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

      function recarregaRemoverItem() {
        var $botaoRemover = $('.botaoRemover');

        $botaoRemover.off();
        $botaoRemover.each(function (posicao, botaoRemover) {
            $(botaoRemover).click(function () {
                var $nomeMedida = $($('.nome')[posicao]);
                var $quantidade = $($('.quantidade')[posicao]);
                $($('.listaItem')[posicao]).remove();
                listaTamanho--;
                if (listaTamanho == 0) {
                    $('#listaVazia').show();
                    listaVazia = true;
                }

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
        recarregaRemoverItem();
      }


      function enviarCadastro() {

        var nome = $("#nome").val();
        var id_tipo_item = $("#id_tipo_item option:selected").val();
        var id_fonte = $("#id_fonte option:selected").val();
        var id_unidade_medida = 1;
        var medida_base = $("#medida_base").val();
        var calorias = $("#calorias").val();
        var carboidratos = $("#carboidratos").val();
        var proteinas = $("#proteinas").val();
        var lipidios = $("#lipidios").val();
        var fibras = $("#fibras").val();
        var vitamina_a = $("#vitamina_a").val();
        var vitamina_c = $("#vitamina_c").val();
        var vitamina_d = $("#vitamina_d").val();
        var vitamina_e = $("#vitamina_e").val();
        var vitamina_b1 = $("#vitamina_b1").val();
        var vitamina_b2 = $("#vitamina_b2").val();
        var vitamina_b6 = $("#vitamina_b6").val();
        var vitamina_b12 = $("#vitamina_b12").val();
        var niacina = $("#niacina").val();
        var folico = $("#folico").val();
        var pantotenico = $("#pantotenico").val();
        var calcio = $("#calcio").val();
        var ferro = $("#ferro").val();
        var magnesio = $("#magnesio").val();
        var potassio = $("#potassio").val();
        var selenio = $("#selenio").val();
        var fosforo = $("#fosforo").val();
        var iodo = $("#iodo").val();
        var cobre = $("#cobre").val();
        var zinco = $("#zinco").val();
        var sodio = $("#sodio").val();
        var gordura_total = $("#gordura_total").val();
        var colesterol = $("#colesterol").val();
        var gordura_saturada = $("#gordura_saturada").val();
        var gordura_poliinsaturada = $("#gordura_poliinsaturada").val();
        var gordura_monoinsaturada = $("#gordura_monoinsaturada").val();
        var valor = $("#valor").val();

        var jsonListaItens = [];

        $('var[class="idMedida"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                    nome: nome,
                    id_tipo_item: id_tipo_item,
                    id_fonte: id_fonte,
                    id_unidade_medida: id_unidade_medida,
                    medida_base: medida_base,
                    calorias: calorias,
                    carboidratos: carboidratos,
                    proteinas: proteinas,
                    lipidios: lipidios,
                    fibras: fibras,
                    vitamina_a: vitamina_a,
                    vitamina_c: vitamina_c,
                    vitamina_d: vitamina_d,
                    vitamina_e: vitamina_e,
                    vitamina_b1: vitamina_b1,
                    vitamina_b2: vitamina_b2,
                    vitamina_b6: vitamina_b6,
                    vitamina_b12: vitamina_b12,
                    niacina: niacina,
                    folico: folico,
                    pantotenico: pantotenico,
                    calcio: calcio,
                    ferro: ferro,
                    magnesio: magnesio,
                    potassio: potassio,
                    selenio: selenio,
                    fosforo: fosforo,
                    iodo: iodo,
                    cobre: cobre,
                    zinco: zinco,
                    sodio: sodio,
                    gordura_total: gordura_total,
                    colesterol: colesterol,
                    gordura_saturada: gordura_saturada,
                    gordura_poliinsaturada: gordura_poliinsaturada,
                    gordura_monoinsaturada: gordura_monoinsaturada,
                    valor: valor,
                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });
        $('var[class="nome_medida"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                  nome: nome,
                  id_tipo_item: id_tipo_item,
                  id_fonte: id_fonte,
                  id_unidade_medida: id_unidade_medida,
                  medida_base: medida_base,
                  calorias: calorias,
                  carboidratos: carboidratos,
                  proteinas: proteinas,
                  lipidios: lipidios,
                  fibras: fibras,
                  vitamina_a: vitamina_a,
                  vitamina_c: vitamina_c,
                  vitamina_d: vitamina_d,
                  vitamina_e: vitamina_e,
                  vitamina_b1: vitamina_b1,
                  vitamina_b2: vitamina_b2,
                  vitamina_b6: vitamina_b6,
                  vitamina_b12: vitamina_b12,
                  niacina: niacina,
                  folico: folico,
                  pantotenico: pantotenico,
                  calcio: calcio,
                  ferro: ferro,
                  magnesio: magnesio,
                  potassio: potassio,
                  selenio: selenio,
                  fosforo: fosforo,
                  iodo: iodo,
                  cobre: cobre,
                  zinco: zinco,
                  sodio: sodio,
                  gordura_total: gordura_total,
                  colesterol: colesterol,
                  gordura_saturada: gordura_saturada,
                  gordura_poliinsaturada: gordura_poliinsaturada,
                  gordura_monoinsaturada: gordura_monoinsaturada,
                  valor: valor,
                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });
        $('var[class="quantidade"]').each(function (pos, item) {
            if (!jsonListaItens.hasOwnProperty(pos)) {
                jsonListaItens[pos] = {
                  nome: nome,
                  id_tipo_item: id_tipo_item,
                  id_fonte: id_fonte,
                  id_unidade_medida: id_unidade_medida,
                  medida_base: medida_base,
                  calorias: calorias,
                  carboidratos: carboidratos,
                  proteinas: proteinas,
                  lipidios: lipidios,
                  fibras: fibras,
                  vitamina_a: vitamina_a,
                  vitamina_c: vitamina_c,
                  vitamina_d: vitamina_d,
                  vitamina_e: vitamina_e,
                  vitamina_b1: vitamina_b1,
                  vitamina_b2: vitamina_b2,
                  vitamina_b6: vitamina_b6,
                  vitamina_b12: vitamina_b12,
                  niacina: niacina,
                  folico: folico,
                  pantotenico: pantotenico,
                  calcio: calcio,
                  ferro: ferro,
                  magnesio: magnesio,
                  potassio: potassio,
                  selenio: selenio,
                  fosforo: fosforo,
                  iodo: iodo,
                  cobre: cobre,
                  zinco: zinco,
                  sodio: sodio,
                  gordura_total: gordura_total,
                  colesterol: colesterol,
                  gordura_saturada: gordura_saturada,
                  gordura_poliinsaturada: gordura_poliinsaturada,
                  gordura_monoinsaturada: gordura_monoinsaturada,
                  valor: valor,
                };
            }
            jsonListaItens[pos][$(this).attr('class')] = $(this).html();
        });

        if(Object.keys(jsonListaItens).length === 0){
          jsonListaItens[0] = {
            nome: nome,
            id_tipo_item: id_tipo_item,
            id_fonte: id_fonte,
            id_unidade_medida: id_unidade_medida,
            medida_base: medida_base,
            calorias: calorias,
            carboidratos: carboidratos,
            proteinas: proteinas,
            lipidios: lipidios,
            fibras: fibras,
            vitamina_a: vitamina_a,
            vitamina_c: vitamina_c,
            vitamina_d: vitamina_d,
            vitamina_e: vitamina_e,
            vitamina_b1: vitamina_b1,
            vitamina_b2: vitamina_b2,
            vitamina_b6: vitamina_b6,
            vitamina_b12: vitamina_b12,
            niacina: niacina,
            folico: folico,
            pantotenico: pantotenico,
            calcio: calcio,
            ferro: ferro,
            magnesio: magnesio,
            potassio: potassio,
            selenio: selenio,
            fosforo: fosforo,
            iodo: iodo,
            cobre: cobre,
            zinco: zinco,
            sodio: sodio,
            gordura_total: gordura_total,
            colesterol: colesterol,
            gordura_saturada: gordura_saturada,
            gordura_poliinsaturada: gordura_poliinsaturada,
            gordura_monoinsaturada: gordura_monoinsaturada,
            valor: valor,
          };
        }
        // Contrato novo.

        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });


        $.ajax({
                  url: '/item/save',
                  type: 'post',
                  dataType: "text",
                  data: { testdata : JSON.stringify(jsonListaItens) },
                  success: function (data, status) {
                    location.reload();
                  },
                  error: function (xhr, desc, err) {
                    alert('Erro');
                  }
              });



    }


    $('#confBotaoEnviar').click(function () {
          if (!validaEnviarFormulario()) {
              $(this).addClass('disabled');
              $(this).text("Enviando...");
              enviarCadastro();
          }
      });

});
