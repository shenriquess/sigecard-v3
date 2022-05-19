$(document).ready(function($){

  var stringHTML = '';



  for(var i in medidas_itens){
    if(medidas_itens && medidas_itens[0].hasOwnProperty('nome_medida')){
          $('#listaVazia').hide();
          listaVazia = false;
          stringHTML += ''
              + '<div class="listaItem">'
              + '<li class="panel label-azul">'
              + '<div class="row">'
              + '<var class="idMedida" style="display: none">' + medidas_itens[i].unidade_medida + '</var>'
              + '<var class="nome_medida" style="display: none">' + medidas_itens[i].nome_medida + '</var>'
              + '<var class="quantidade" style="display: none">' + medidas_itens[i].medida + '</var>'
              + '<div class="col-md-6 wrapper nome_medida" style="margin-top: 5px">'
              + medidas_itens[i].nome_medida
              + '</div>'
              + '<div class="col-md-4 wrapper valor_medida" style="margin-top: 5px">'+  medidas_itens[i].medida + ' ' + 'g</div>'
              + '<div class="col-md-2 text-center">'
              + '<button class="btn btn-danger botaoRemover data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
              + '</div>'
              + '</div>'
              + '</li>'
              + '</div>';
              listaTamanho++;
        }
    }

    $('#listaItens').append(stringHTML);


    function enviarCadastroUpdate() {

      var nome = $("#nome").val();
      var id_tipo_item = $("#id_tipo_item option:selected").val();
      var id_fonte = $("#id_fonte option:selected").val();
      var id_unidade_medida = 2;
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
      var id_item =  medidas_itens[0].id_item;
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
                  id_item: id_item,
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
                id_item: id_item,
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
                id_item: id_item,
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
          id_item: id_item,
        };
      }


      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });


      $.ajax({
                url: '/item/update',
                type: 'post',
                dataType: "text",
                data: { testdata : JSON.stringify(jsonListaItens) },
                success: function (data, status) {
                  location.href = APP_URL + '/item/show';
                },
                error: function (xhr, desc, err) {
                  alert('Erro');
                }
            });



    }


    $('#confBotaoEnviarUpdate').click(function () {
          if (!validaEnviarFormulario()) {
              $(this).addClass('disabled');
              $(this).text("Enviando...");
              enviarCadastroUpdate();

          }
      });

});
