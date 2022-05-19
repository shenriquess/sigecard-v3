


$(document).ready(function($){

  var energia = 0, carboidratos = 0, proteinas = 0, lipidios = 0, fibras = 0, vitamina_a = 0,
      vitamina_c = 0, vitamina_d = 0, vitamina_e = 0, vitamina_b1 = 0, vitamina_b2 = 0,
      vitamina_b6 = 0, vitamina_b12 = 0, niacina = 0, folico = 0, pantotenico = 0, calcio = 0,
      ferro = 0, magnesio = 0, potassio = 0, selenio = 0, fosforo = 0, iodo = 0, cobre = 0,
      zinco = 0, sodio = 0, gordura_total = 0, colesterol = 0, gordura_saturada = 0,
      gordura_poliinsaturada = 0, gordura_monoinsaturada = 0, valor = 0;

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
      cols+= '<td class="text-center"style="width:100px;" colspan="1"><font size=1>' + fator_correcao[i] + '</font></td>'
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

  var $formFC = '0.000';
  var stringHTML = '';

  $('#listaVazia').hide();

  for(var i in itens_preparacao){

            energia += itens_preparacao[i].calorias * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            carboidratos += itens_preparacao[i].carboidratos * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            proteinas += itens_preparacao[i].proteinas * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            lipidios += itens_preparacao[i].lipidios * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            fibras += itens_preparacao[i].fibras * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_a += itens_preparacao[i].vitamina_a * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_c += itens_preparacao[i].vitamina_c* itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_d += itens_preparacao[i].vitamina_d * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_e += itens_preparacao[i].vitamina_e * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_b1 += itens_preparacao[i].vitamina_b1 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_b2 += itens_preparacao[i].vitamina_b2 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_b6 += itens_preparacao[i].vitamina_b6 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            vitamina_b12 += itens_preparacao[i].vitamina_b12 * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            niacina += itens_preparacao[i].niacina * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            folico += itens_preparacao[i].folico * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            pantotenico += itens_preparacao[i].pantotenico * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            calcio += itens_preparacao[i].calcio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            ferro += itens_preparacao[i].ferro* itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            magnesio += itens_preparacao[i].magnesio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            potassio += itens_preparacao[i].potassio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            selenio += itens_preparacao[i].selenio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            fosforo += itens_preparacao[i].fosforo * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            iodo += itens_preparacao[i].iodo * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            cobre += itens_preparacao[i].cobre * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            zinco += itens_preparacao[i].zinco * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            sodio += itens_preparacao[i].sodio * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            gordura_total += itens_preparacao[i].gordura_total * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            colesterol += itens_preparacao[i].colesterol * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            gordura_saturada += itens_preparacao[i].gordura_saturada * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            gordura_poliinsaturada += itens_preparacao[i].gordura_poliinsaturada * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            gordura_monoinsaturada += itens_preparacao[i].gordura_monoinsaturada * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;
            valor += itens_preparacao[i].valor * itens_preparacao[i].p_liquido/itens_preparacao[i].medida_base;

            if(itens_preparacao[i].p_bruto > 0){
              $formFC =  parseFloat((itens_preparacao[i].p_bruto/itens_preparacao[i].p_liquido).toFixed(3));
              stringHTML += ''
                      + '<div class="listaItem">'
                      + '<div class="row">'
                      + '<var class="idItem" style="display: none">' + itens_preparacao[i].id + '</var>'
                      + '<var class="idFonte" style="display: none">' + itens_preparacao[i].id_fonte + '</var>'
                      + '<var class="valorPB" style="display: none">' + itens_preparacao[i].p_bruto + '</var>'
                      + '<var class="valorPL" style="display: none">' + itens_preparacao[i].p_liquido + '</var>'
                      + '<var class="valorFC" style="display: none">' + $formFC + '</var>'
                      + '<var class="idMedida" style="display: none">' + itens_preparacao[i].p_medida + '</var>'
                      + '<div class="col-md-4 item" style="margin-top: 5px">'
                      + itens_preparacao[i].nome
                      + '</div>'
                      + '<div class="col-md-2 pb" style="margin-top: 5px">'
                      + parseFloat(itens_preparacao[i].p_bruto).toFixed(3) + ' g'
                      + '</div>'
                      + '<div class="col-md-2 pl" style="margin-top: 5px">'
                      + parseFloat(itens_preparacao[i].p_liquido).toFixed(3) + ' g'
                      + '</div>'
                      + '<div class="col-md-2 fc" style="margin-top: 5px">'
                      + $formFC
                      + '</div>'
                      + '<div class="col-md-2">'
                      + '<div class="text-center">'
                      + '<button class="btn btn-danger botaoRemover data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
                      + '</div>'
                      + '</div>'
                      + '</div>'
                      + '<hr/>'
                      + '</div>';
            }else{
              stringHTML += ''
                      + '<div class="listaItem">'
                      + '<div class="row">'
                      + '<var class="idItem" style="display: none">' + itens_preparacao[i].id + '</var>'
                      + '<var class="idFonte" style="display: none">' + itens_preparacao[i].id_fonte + '</var>'
                      + '<var class="valorPB" style="display: none">' + itens_preparacao[i].p_bruto + '</var>'
                      + '<var class="valorPL" style="display: none">' + itens_preparacao[i].p_liquido + '</var>'
                      + '<var class="valorFC" style="display: none">' + $formFC + '</var>'
                      + '<var class="idMedida" style="display: none">' + itens_preparacao[i].p_medida + '</var>'
                      + '<div class="col-md-4 item" style="margin-top: 5px">'
                      + itens_preparacao[i].nome
                      + '</div>'
                      + '<div class="col-md-2 pb" style="margin-top: 5px">'
                      + 'N/A'
                      + '</div>'
                      + '<div class="col-md-2 pl" style="margin-top: 5px">'
                      + parseFloat(itens_preparacao[i].p_liquido).toFixed(3) + ' g'
                      + '</div>'
                      + '<div class="col-md-2 fc" style="margin-top: 5px">'
                      + 'N/A'
                      + '</div>'
                      + '<div class="col-md-2">'
                      + '<div class="text-center">'
                      + '<button class="btn btn-danger botaoRemover data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
                      + '</div>'
                      + '</div>'
                      + '</div>'
                      + '<hr/>'
                      + '</div>';
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

});
