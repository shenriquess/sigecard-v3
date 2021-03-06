$(document).ready(function($){
  var $formFC = '0.000';
  var stringHTML = '';
  $('#listaVazia').hide();
  listaVazia = false;

  for(var i in itens_preparacao){
            medida_total = parseFloat(medida_total) + parseFloat(itens_preparacao[i].p_liquido);
            energia = parseFloat(energia.toFixed(3)) + parseFloat((itens_preparacao[i].calorias * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            carboidratos = parseFloat(carboidratos.toFixed(3)) + parseFloat((itens_preparacao[i].carboidratos * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((itens_preparacao[i].proteinas * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((itens_preparacao[i].lipidios * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            fibras = parseFloat(fibras.toFixed(3)) + parseFloat((itens_preparacao[i].fibras * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_a * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_c * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_d * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_e * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_b1 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_b2 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_b6 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((itens_preparacao[i].vitamina_b12 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            niacina = parseFloat(niacina.toFixed(3)) + parseFloat((itens_preparacao[i].niacina * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            folico = parseFloat(folico.toFixed(3)) + parseFloat((itens_preparacao[i].folico * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((itens_preparacao[i].pantotenico * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            calcio = parseFloat(calcio.toFixed(3)) + parseFloat((itens_preparacao[i].calcio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            ferro = parseFloat(ferro.toFixed(3)) + parseFloat((itens_preparacao[i].ferro * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((itens_preparacao[i].magnesio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            potassio = parseFloat(potassio.toFixed(3)) + parseFloat((itens_preparacao[i].potassio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            selenio = parseFloat(selenio.toFixed(3)) + parseFloat((itens_preparacao[i].selenio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((itens_preparacao[i].fosforo * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            iodo = parseFloat(iodo.toFixed(3)) + parseFloat((itens_preparacao[i].iodo * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            cobre = parseFloat(cobre.toFixed(3)) + parseFloat((itens_preparacao[i].cobre * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            zinco = parseFloat(zinco.toFixed(3)) + parseFloat((itens_preparacao[i].zinco * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            sodio = parseFloat(sodio.toFixed(3)) + parseFloat((itens_preparacao[i].sodio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((itens_preparacao[i].gordura_total * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((itens_preparacao[i].colesterol * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((itens_preparacao[i].gordura_saturada * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((itens_preparacao[i].gordura_poliinsaturada * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((itens_preparacao[i].gordura_monoinsaturada * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(3));
            valor = parseFloat(valor.toFixed(2)) + parseFloat((itens_preparacao[i].valor * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base).toFixed(2));

            var nome_fonte ='';
            for (var j in fontes){
              if(fontes[j].id == itens_preparacao[i].id_fonte){
                nome_fonte = fontes[j].nome;
              }
            }

            $formFC = parseFloat((itens_preparacao[i].p_bruto/itens_preparacao[i].p_liquido).toFixed(3));
            stringHTML += ''
                    + '<div class="listaItem">'
                    + '<li class="panel label-azul">'
                    + '<div class="row">'
                    + '<var class="idItem" style="display: none">' + itens_preparacao[i].id + '</var>'
                    + '<var class="idFonte" style="display: none">' + itens_preparacao[i].id_fonte + '</var>'
                    + '<var class="valorPB" style="display: none">' + itens_preparacao[i].p_bruto + '</var>'
                    + '<var class="valorPL" style="display: none">' + itens_preparacao[i].p_liquido + '</var>'
                    + '<var class="valorFC" style="display: none">' + $formFC + '</var>'
                    + '<var class="idMedida" style="display: none">' + 1 + '</var>'
                    + '<div class="col-md-4 item">'
                    + itens_preparacao[i].nome + ' (' + nome_fonte + ')'
                    + '</div>'
                    + '<div class="col-md-2 pb">'
                    + itens_preparacao[i].p_bruto + ' g'
                    + '</div>'
                    + '<div class="col-md-2 pl">'
                    + itens_preparacao[i].p_liquido + ' g'
                    + '</div>'
                    + '<div class="col-md-2 fc">'
                    + $formFC
                    + '</div>'
                    + '<div class="col-md-1 text-center">'
                    + '<a class="btn btn-default botaoEditar" data-toggle="modal" data-target="#editar_item"><i class="fa fa-edit"></i></a>'
                    + '</div>'
                    + '<div class="col-md-1 text-center">'
                    + '<button class="btn btn-danger botaoRemover"><i class="fa fa-trash"></i></button>'
                    + '</div>'
                    + '</div>'
                    + '</li>'
                    + '</div>';


          listaTamanho++;

        }
    if(medida_total > 0){
      var coccao = parseFloat((preparacao.medida_total / medida_total).toFixed(3));
      $('#f_coccao').val(coccao);
    }else{
      $('#f_coccao').val(parseFloat(0).toFixed(3));
    }

    var coccao = preparacao.medida_total / medida_total;
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
    $('#listaItens').append(stringHTML);

    adicionaLinhaTabela();

    function enviarCadastroUpdate() {

      var id_tipo_preparacao = $("#select_tipo_preparacao option:selected").val();
      var nome = $("#nome").val();
      var descricao = $("#descricao").val();
      var modo_preparo = $("#modo_preparo").val();
      var id_preparacao = itens_preparacao[0].id_preparacao;
      var rendimento = $("#r_total").val();

      var jsonListaItens = [];

      $('var[class="idFonte"]').each(function (pos, item) {
          if (!jsonListaItens.hasOwnProperty(pos)) {
              jsonListaItens[pos] = {
                  id_tipo_preparacao: id_tipo_preparacao,
                  nome: nome,
                  descricao: descricao,
                  modo_preparo: modo_preparo,
                  id_preparacao: id_preparacao,
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
                  id_preparacao: id_preparacao,
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
                  id_preparacao: id_preparacao,
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
                  id_preparacao: id_preparacao,
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
                  id_preparacao: id_preparacao,
                  medida_total: rendimento,

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
                url: '/preparation/update',
                type: 'post',
                dataType: "text",
                data: { testdata : JSON.stringify(jsonListaItens) },
                success: function (data, status) {
                  location.href = APP_URL + '/preparation/show';
                },
                error: function (xhr, desc, err) {
                  alert('Erro');
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
