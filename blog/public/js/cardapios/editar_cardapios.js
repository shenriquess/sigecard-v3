var edit = 1;

$(document).ready(function($){

  energia = 0, carboidratos = 0, proteinas = 0, lipidios = 0, fibras = 0, vitamina_a = 0,
  vitamina_c = 0, vitamina_d = 0, vitamina_e = 0, vitamina_b1 = 0, vitamina_b2 = 0,
  vitamina_b6 = 0, vitamina_b12 = 0, niacina = 0, folico = 0, pantotenico = 0, calcio = 0,
  ferro = 0, magnesio = 0, potassio = 0, selenio = 0, fosforo = 0, iodo = 0, cobre = 0,
  zinco = 0, sodio = 0, gordura_total = 0, colesterol = 0, gordura_saturada = 0,
  gordura_poliinsaturada = 0, gordura_monoinsaturada = 0, valor = 0;
  referencia_modalidade = [];

  removeClasse('#li_' + itens_cardapio[0].dia_semana,'disabled');
  adicionaClasse('#li_' + itens_cardapio[0].dia_semana,'active');
  adicionaClasse('#tab_' + itens_cardapio[0].dia_semana,'active');
  adicionaAtributo('#a_' + itens_cardapio[0].dia_semana,'data-toggle','tab');

  for( var i = 1; i<=6; i++){
    criaOpcaoRefeicoes(i);
  }

  var data = moment(cardapio.data_inicio, "YYYY-MM-DD");
  var data2 = moment(cardapio.data_fim, "YYYY-MM-DD");

  for(var i in modalidades_escola){
    if(cardapio.id_modalidade== modalidades_escola[i].id){
      for(var j in referencias){
        if(modalidades_escola[i].id_referencia == referencias[j].id){
          referencia_modalidade = referencias[j];
        }
      }

    }
  }

  $('#reservation').data('daterangepicker').setStartDate(data);
  $('#reservation').data('daterangepicker').setEndDate(data2);

  oldData = ($('#reservation').val()).split(" - ");
  datai = moment(oldData[0], "DD/MM/YYYY");
  dataf = moment(oldData[1], "DD/MM/YYYY");
  oldDatai = moment(datai.format("YYYY-MM-DD"),"YYYY-MM-DD");
  oldDataf = moment(dataf.format("YYYY-MM-DD"),"YYYY-MM-DD");
  separa = ($('#reservation').val()).split(" - ");
  data = moment(separa[0], "DD/MM/YYYY");
  data2 = moment(separa[1], "DD/MM/YYYY");

  $('#fieldset_1').prop('disabled', false);
  $('#fieldset_2').prop('disabled', false);
  $('#fieldset_3').prop('disabled', false);
  $('#fieldset_4').prop('disabled', false);
  $('#fieldset_5').prop('disabled', false);
  $('#fieldset_6').prop('disabled', false);

  arr = data.format("YYYY-MM-DD");
  arr2 = data2.format("YYYY-MM-DD");
  partes = arr.match(/(\d+)/g);
  partes2 = arr2.match(/(\d+)/g);
  d = new Date(partes[0], partes[1]-1, partes[2],new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds());
  d2 = new Date(partes2[0], partes2[1]-1, partes2[2]);
  numero_dias = Math.abs(d2.getDay()-d.getDay()) + 1;

  var horas = '';
  var minutos = '';
  var aux = itens_cardapio[0].dia_semana;

  for(var j in itens_cardapio){
      if(itens_cardapio[j].tipo == 1){
        for (var i in itens) {
            if (itens.hasOwnProperty(i) != null && itens[i].id == itens_cardapio[j].id_item) {
                energia = parseFloat(energia.toFixed(3)) + parseFloat((itens[i].calorias * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                carboidratos = parseFloat(carboidratos.toFixed(3)) + parseFloat((itens[i].carboidratos * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((itens[i].proteinas * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((itens[i].lipidios * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                fibras = parseFloat(fibras.toFixed(3)) + parseFloat((itens[i].fibras * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((itens[i].vitamina_a * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((itens[i].vitamina_c* itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((itens[i].vitamina_d * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((itens[i].vitamina_e * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((itens[i].vitamina_b1 * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((itens[i].vitamina_b2 * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((itens[i].vitamina_b6 * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((itens[i].vitamina_b12 * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                niacina = parseFloat(niacina.toFixed(3)) + parseFloat((itens[i].niacina * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                folico = parseFloat(folico.toFixed(3)) + parseFloat((itens[i].folico * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((itens[i].pantotenico * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                calcio = parseFloat(calcio.toFixed(3)) + parseFloat((itens[i].calcio * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                ferro = parseFloat(ferro.toFixed(3)) + parseFloat((itens[i].ferro* itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((itens[i].magnesio * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                potassio = parseFloat(potassio.toFixed(3)) + parseFloat((itens[i].potassio * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                selenio = parseFloat(selenio.toFixed(3)) + parseFloat((itens[i].selenio * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((itens[i].fosforo * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                iodo = parseFloat(iodo.toFixed(3)) + parseFloat((itens[i].iodo * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                cobre = parseFloat(cobre.toFixed(3)) + parseFloat((itens[i].cobre * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                zinco = parseFloat(zinco.toFixed(3)) + parseFloat((itens[i].zinco * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                sodio = parseFloat(sodio.toFixed(3)) + parseFloat((itens[i].sodio * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((itens[i].gordura_total * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((itens[i].colesterol * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((itens[i].gordura_saturada * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_poliinsaturada * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_monoinsaturada * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(3));
                valor = parseFloat(valor.toFixed(2)) + parseFloat((itens[i].valor * itens_cardapio[j].per_capta_alimento/itens[i].medida_base).toFixed(2));

          }
       }
     }

     var energia_aux = 0, carboidratos_aux = 0, proteinas_aux = 0, lipidios_aux = 0, fibras_aux = 0, vitamina_a_aux = 0,
     vitamina_c_aux = 0, vitamina_d_aux = 0, vitamina_e_aux = 0, vitamina_b1_aux = 0, vitamina_b2_aux = 0,
     vitamina_b6_aux = 0, vitamina_b12_aux = 0, niacina_aux = 0, folico_aux = 0, pantotenico_aux = 0, calcio_aux = 0,
     ferro_aux = 0, magnesio_aux = 0, potassio_aux = 0, selenio_aux = 0, fosforo_aux = 0, iodo_aux = 0, cobre_aux = 0,
     zinco_aux = 0, sodio_aux = 0, gordura_total_aux = 0, colesterol_aux = 0, gordura_saturada_aux = 0,
     gordura_poliinsaturada_aux = 0, gordura_monoinsaturada_aux = 0, valor_aux = 0;
     if(itens_cardapio[j].tipo == 2){
       var posicao_preparacao = 0;
       for (var i in view_preparacoes) {
         if (view_preparacoes.hasOwnProperty(i) != null && view_preparacoes[i].id_preparacao == itens_cardapio[j].id_item) {
             posicao_preparacao = i;
             energia_aux = parseFloat(energia_aux.toFixed(3)) +  parseFloat((view_preparacoes[i].calorias * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             carboidratos_aux = parseFloat(carboidratos_aux.toFixed(3)) + parseFloat((view_preparacoes[i].carboidratos * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             proteinas_aux = parseFloat(proteinas_aux.toFixed(3)) + parseFloat((view_preparacoes[i].proteinas * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             lipidios_aux = parseFloat(lipidios_aux.toFixed(3)) + parseFloat((view_preparacoes[i].lipidios * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             fibras_aux = parseFloat(fibras_aux.toFixed(3)) + parseFloat((view_preparacoes[i].fibras * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_a_aux = parseFloat(vitamina_a_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_a * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_c_aux = parseFloat(vitamina_c_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_c* view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_d_aux = parseFloat(vitamina_d_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_d * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_e_aux = parseFloat(vitamina_e_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_e * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_b1_aux = parseFloat(vitamina_b1_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_b1 * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_b2_aux = parseFloat(vitamina_b2_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_b2 * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_b6_aux = parseFloat(vitamina_b6_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_b6 * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             vitamina_b12_aux = parseFloat(vitamina_b12_aux.toFixed(3)) + parseFloat((view_preparacoes[i].vitamina_b12 * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             niacina_aux = parseFloat(niacina_aux.toFixed(3)) + parseFloat((view_preparacoes[i].niacina * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             folico_aux = parseFloat(folico_aux.toFixed(3)) + parseFloat((view_preparacoes[i].folico * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             pantotenico_aux = parseFloat(pantotenico_aux.toFixed(3)) + parseFloat((view_preparacoes[i].pantotenico * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             calcio_aux = parseFloat(calcio_aux.toFixed(3)) + parseFloat((view_preparacoes[i].calcio * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             ferro_aux = parseFloat(ferro_aux.toFixed(3)) + parseFloat((view_preparacoes[i].ferro* view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             magnesio_aux = parseFloat(magnesio_aux.toFixed(3)) + parseFloat((view_preparacoes[i].magnesio * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             potassio_aux = parseFloat(potassio_aux.toFixed(3)) + parseFloat((view_preparacoes[i].potassio * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             selenio_aux = parseFloat(selenio_aux.toFixed(3)) + parseFloat((view_preparacoes[i].selenio * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             fosforo_aux = parseFloat(fosforo_aux.toFixed(3)) + parseFloat((view_preparacoes[i].fosforo * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             iodo_aux = parseFloat(iodo_aux.toFixed(3)) + parseFloat((view_preparacoes[i].iodo * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             cobre_aux = parseFloat(cobre_aux.toFixed(3)) + parseFloat((view_preparacoes[i].cobre * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             zinco_aux = parseFloat(zinco_aux.toFixed(3)) + parseFloat((view_preparacoes[i].zinco * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             sodio_aux = parseFloat(sodio_aux.toFixed(3)) + parseFloat((view_preparacoes[i].sodio * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             gordura_total_aux = parseFloat(gordura_total_aux.toFixed(3)) + parseFloat((view_preparacoes[i].gordura_total * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             colesterol_aux = parseFloat(colesterol_aux.toFixed(3)) +  parseFloat((view_preparacoes[i].colesterol * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             gordura_saturada_aux = parseFloat(gordura_saturada_aux.toFixed(3)) + parseFloat((view_preparacoes[i].gordura_saturada * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             gordura_poliinsaturada_aux = parseFloat(gordura_poliinsaturada_aux.toFixed(3)) + parseFloat((view_preparacoes[i].gordura_poliinsaturada * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             gordura_monoinsaturada_aux = parseFloat(gordura_monoinsaturada_aux.toFixed(3)) + parseFloat((view_preparacoes[i].gordura_monoinsaturada * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(3));
             valor_aux = parseFloat(valor_aux.toFixed(2)) + parseFloat((view_preparacoes[i].valor * view_preparacoes[i].p_liquido/view_preparacoes[i].medida_base).toFixed(2));

            }
         }
         energia = parseFloat(energia.toFixed(3)) + parseFloat((energia_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         carboidratos = parseFloat(carboidratos.toFixed(3)) + parseFloat((carboidratos_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((proteinas_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((lipidios_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         fibras = parseFloat(fibras.toFixed(3)) + parseFloat((fibras_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((vitamina_a_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((vitamina_c_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((vitamina_d_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((vitamina_e_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((vitamina_b1_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((vitamina_b2_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((vitamina_b6_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((vitamina_b12_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         niacina = parseFloat(niacina.toFixed(3)) + parseFloat((niacina_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         folico = parseFloat(folico.toFixed(3)) + parseFloat((folico_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((pantotenico_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         calcio = parseFloat(calcio.toFixed(3)) + parseFloat((calcio_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         ferro = parseFloat(ferro.toFixed(3)) + parseFloat((ferro_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((magnesio_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         potassio = parseFloat(potassio.toFixed(3)) + parseFloat((potassio_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         selenio = parseFloat(selenio.toFixed(3)) + parseFloat((selenio_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((fosforo_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         iodo = parseFloat(iodo.toFixed(3)) + parseFloat((iodo_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         cobre = parseFloat(cobre.toFixed(3)) + parseFloat((cobre_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         zinco = parseFloat(zinco.toFixed(3)) + parseFloat((zinco_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         sodio = parseFloat(sodio.toFixed(3)) + parseFloat((sodio_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((gordura_total_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((colesterol_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((gordura_saturada_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((gordura_poliinsaturada_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((gordura_monoinsaturada_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(3));
         valor = parseFloat(valor.toFixed(2)) + parseFloat((valor_aux * itens_cardapio[j].per_capta_alimento/view_preparacoes[posicao_preparacao].medida_total).toFixed(2));


      }

      if(itens_cardapio.length > 1 && i > 0 && itens_cardapio[j].dia_semana != itens_cardapio[0].dia_semana &&  itens_cardapio[j].dia_semana != aux){
        removeClasse('#li_' + itens_cardapio[j].dia_semana,'disabled');
        removeClasse('#li_' + itens_cardapio[j].dia_semana,'active');
        adicionaAtributo('#a_' + itens_cardapio[j].dia_semana,'data-toggle','tab');
        aux = itens_cardapio[j].dia_semana;
      }

      for(var i in tipo_refeicoes){
        if(tipo_refeicoes[i].id == itens_cardapio[j].id_refeicao){
          horario = (tipo_refeicoes[i].horario).split(":");
          minutos = horario[0] * 60 + horario[1];
        }
      }
      var unidade_medida_alimento = '';

      if(itens_cardapio[j].id_unidade_medida >= 1){
        unidade_medida_alimento = 'g';
      }else {
        unidade_medida_alimento = '';
      }

      var stringHTML = ''
          + '<div class="listaItem' + itens_cardapio[j].dia_semana + '" horario_ref="' + minutos + '">'
          + '<li class="panel label-azul">'
          + '<div class="row">'
          + '<var class="idRefeicao' + itens_cardapio[j].dia_semana + '" style="display: none">' + itens_cardapio[j].id_refeicao + '</var>'
          + '<var class="idTipoItem' + itens_cardapio[j].dia_semana + '" style="display: none">' + itens_cardapio[j].tipo + '</var>'
          + '<var class="idItem' + itens_cardapio[j].dia_semana + '" style="display: none">' + itens_cardapio[j].id_item + '</var>'
          + '<var class="diaSemana' + itens_cardapio[j].dia_semana + '" style="display: none">' + itens_cardapio[j].dia_semana + '</var>'
          + '<var class="idMedida' + itens_cardapio[j].dia_semana + '" style="display: none">' + itens_cardapio[j].id_unidade_medida + '</var>'
          + '<var class="perCapta' + itens_cardapio[j].dia_semana + '" style="display: none">' + itens_cardapio[j].per_capta_alimento + '</var>'
          + '<div class="col-md-3 wrapper refeicao' + itens_cardapio[j].dia_semana + '" style="margin-top: 5px">'
          + itens_cardapio[j].nome_refeicao
          + '</div>'
          + '<div class="col-md-5 wrapper item' + itens_cardapio[j].dia_semana + '" style="margin-top: 5px">'
          + itens_cardapio[j].nome_item
          + '</div>'
          + '<div class="col-md-2 wrapper medida' + itens_cardapio[j].dia_semana + '" style="margin-top: 5px">'
          + itens_cardapio[j].per_capta_alimento + ' ' +  unidade_medida_alimento
          + '</div>'
          + '<div class="col-md-1 text-center">'
          + '<a class="btn btn-default botaoEditar' + itens_cardapio[j].dia_semana + '" data-toggle="modal" data-target="#editar_item"><i class="fa fa-edit"></i></a>'
          + '</div>'
          + '<div class="col-md-1 text-center">'
          + '<button class="btn btn-danger botaoRemover' + itens_cardapio[j].dia_semana + ' data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
          + '</div>'
          + '</div>'
          + '</li>'
          + '</div>';
          $('#listaVazia' + itens_cardapio[j].dia_semana).hide();
          $('#listaItens' + itens_cardapio[j].dia_semana).append(stringHTML);
          ordenaRefeicoes('.listaItem' + itens_cardapio[j].dia_semana,'#listaItens' + itens_cardapio[j].dia_semana);
          criaOpcaoRefeicoes(itens_cardapio[j].dia_semana);

          listaTamanhoTotal++;

          if(itens_cardapio[j].dia_semana == 1){
            listaTamanho1++;
            listaVazia1 = false;
          }else if (itens_cardapio[j].dia_semana == 2) {
            listaTamanho2++;
            listaVazia2 = false;
          }else if (itens_cardapio[j].dia_semana == 3) {
            listaTamanho3++;
            listaVazia3 = false;
          }else if (itens_cardapio[j].dia_semana == 4) {
            listaTamanho4++;
            listaVazia4 = false;
          }else if (itens_cardapio[j].dia_semana == 5) {
            listaTamanho5++;
            listaVazia5= false;
          }else {
            listaTamanho6++;
            listaVazia6 = false;
          }
        }

        $('#nome_referencia').empty();
        $('#nome_referencia').html(referencia_modalidade.nome);
        $('#descricao_referencia').empty();
        $('#descricao_referencia').html(referencia_modalidade.descricao);
        $('#categoria_referencia').empty();
        $('#idade_referencia').empty();
        if(referencia_modalidade.categoria_ensino == 1){
          $('#categoria_referencia').html('Creche');
          if(referencia_modalidade.idade_alunos == 1){
            $('#idade_referencia').html('7 - 11 meses');
          }else{
            $('#idade_referencia').html('1 - 3 anos');
          }
        }else if (referencia_modalidade.categoria_ensino == 2) {
          $('#categoria_referencia').html('Pré-escola');
          $('#idade_referencia').html('4 - 5 anos');
        }else if (referencia_modalidade.categoria_ensino == 3) {
          $('#categoria_referencia').html('Ensino Fundamental');
          if(referencia_modalidade.idade_alunos == 4){
            $('#idade_referencia').html('6 - 10 anos');
          }else{
            $('#idade_referencia').html('11 - 15 anos');
          }
        }else if (referencia_modalidade.categoria_ensino == 4) {
          $('#categoria_referencia').html('Ensino Médio');
          $('#idade_referencia').html('16 - 18 anos');
        }else {
          $('#categoria_referencia').html('EJA');
          if(referencia_modalidade.idade_alunos == 7){
            $('#idade_referencia').html('19 - 30 anos');
          }else{
            $('#idade_referencia').html('31 - 60 anos');
          }
        }

        $('#calorias_ref').val(referencia_modalidade.calorias);
        $('#carboidratos_ref').val(referencia_modalidade.carboidratos);
        $('#proteinas_ref').val(referencia_modalidade.proteinas);
        $('#lipidios_ref').val(referencia_modalidade.lipidios);
        $('#fibras_ref').val(referencia_modalidade.fibras);
        $('#vitamina_a_ref').val(referencia_modalidade.vitamina_a);
        $('#vitamina_c_ref').val(referencia_modalidade.vitamina_c);
        $('#vitamina_d_ref').val(referencia_modalidade.vitamina_d);
        $('#vitamina_e_ref').val(referencia_modalidade.vitamina_e);
        $('#vitamina_b1_ref').val(referencia_modalidade.vitamina_b1);
        $('#vitamina_b2_ref').val(referencia_modalidade.vitamina_b2);
        $('#vitamina_b6_ref').val(referencia_modalidade.vitamina_b6);
        $('#vitamina_b12_ref').val(referencia_modalidade.vitamina_b12);
        $('#niacina_ref').val(referencia_modalidade.niacina);
        $('#folico_ref').val(referencia_modalidade.folico);
        $('#pantotenico_ref').val(referencia_modalidade.pantotenico);
        $('#calcio_ref').val(referencia_modalidade.calcio);
        $('#ferro_ref').val(referencia_modalidade.ferro);
        $('#magnesio_ref').val(referencia_modalidade.magnesio);
        $('#potassio_ref').val(referencia_modalidade.potassio);
        $('#selenio_ref').val(referencia_modalidade.selenio);
        $('#fosforo_ref').val(referencia_modalidade.fosforo);
        $('#iodo_ref').val(referencia_modalidade.iodo);
        $('#cobre_ref').val(referencia_modalidade.cobre);
        $('#zinco_ref').val(referencia_modalidade.zinco);
        $('#sodio_ref').val(referencia_modalidade.sodio);
        $('#gordura_total_ref').val(referencia_modalidade.gordura_total);
        $('#colesterol_ref').val(referencia_modalidade.colesterol);
        $('#gordura_saturada_ref').val(referencia_modalidade.gordura_saturada);
        $('#gordura_poliinsaturada_ref').val(referencia_modalidade.gordura_poliinsaturada);
        $('#gordura_monoinsaturada_ref').val(referencia_modalidade.gordura_monoinsaturada);

        atualizaTabelaReferencia(energia/numero_dias,referencia_modalidade.calorias,'#span_p_calorias');
        atualizaTabelaReferencia(carboidratos/numero_dias,referencia_modalidade.carboidratos,'#span_p_carboidratos');
        atualizaTabelaReferencia(proteinas/numero_dias,referencia_modalidade.proteinas,'#span_p_proteinas');
        atualizaTabelaReferencia(lipidios/numero_dias,referencia_modalidade.lipidios,'#span_p_lipidios');
        atualizaTabelaReferencia(fibras/numero_dias,referencia_modalidade.fibras,'#span_p_fibras');
        atualizaTabelaReferencia(vitamina_a/numero_dias,referencia_modalidade.vitamina_a,'#span_p_vit_a');
        atualizaTabelaReferencia(vitamina_c/numero_dias,referencia_modalidade.vitamina_c,'#span_p_vit_c');
        atualizaTabelaReferencia(vitamina_d/numero_dias,referencia_modalidade.vitamina_d,'#span_p_vit_d');
        atualizaTabelaReferencia(vitamina_e/numero_dias,referencia_modalidade.vitamina_e,'#span_p_vit_e');
        atualizaTabelaReferencia(vitamina_b1/numero_dias,referencia_modalidade.vitamina_b1,'#span_p_vit_b1');
        atualizaTabelaReferencia(vitamina_b2/numero_dias,referencia_modalidade.vitamina_b2,'#span_p_vit_b2');
        atualizaTabelaReferencia(vitamina_b6/numero_dias,referencia_modalidade.vitamina_b6,'#span_p_vit_b6');
        atualizaTabelaReferencia(vitamina_b12/numero_dias,referencia_modalidade.vitamina_b12,'#span_p_vit_b12');
        atualizaTabelaReferencia(niacina/numero_dias,referencia_modalidade.niacina,'#span_p_niacina');
        atualizaTabelaReferencia(folico/numero_dias,referencia_modalidade.folico,'#span_p_folico');
        atualizaTabelaReferencia(pantotenico/numero_dias,referencia_modalidade.pantotenico,'#span_p_pantotenico');
        atualizaTabelaReferencia(calcio/numero_dias,referencia_modalidade.calcio,'#span_p_calcio');
        atualizaTabelaReferencia(ferro/numero_dias,referencia_modalidade.ferro,'#span_p_ferro');
        atualizaTabelaReferencia(magnesio/numero_dias,referencia_modalidade.magnesio,'#span_p_magnesio');
        atualizaTabelaReferencia(potassio/numero_dias,referencia_modalidade.potassio,'#span_p_potassio');
        atualizaTabelaReferencia(selenio/numero_dias,referencia_modalidade.selenio,'#span_p_selenio');
        atualizaTabelaReferencia(fosforo/numero_dias,referencia_modalidade.fosforo,'#span_p_fosforo');
        atualizaTabelaReferencia(iodo/numero_dias,referencia_modalidade.iodo,'#span_p_iodo');
        atualizaTabelaReferencia(cobre/numero_dias,referencia_modalidade.cobre,'#span_p_cobre');
        atualizaTabelaReferencia(zinco/numero_dias,referencia_modalidade.zinco,'#span_p_zinco');
        atualizaTabelaReferencia(sodio/numero_dias,referencia_modalidade.sodio,'#span_p_sodio');
        atualizaTabelaReferencia(gordura_total/numero_dias,referencia_modalidade.gordura_total,'#span_p_g_total');
        atualizaTabelaReferencia(colesterol/numero_dias,referencia_modalidade.colesterol,'#span_p_colesterol');
        atualizaTabelaReferencia(gordura_saturada/numero_dias,referencia_modalidade.gordura_saturada,'#span_p_g_saturada');
        atualizaTabelaReferencia(gordura_poliinsaturada/numero_dias,referencia_modalidade.gordura_poliinsaturada,'#span_p_g_poliinsaturada');
        atualizaTabelaReferencia(gordura_monoinsaturada/numero_dias,referencia_modalidade.gordura_monoinsaturada,'#span_p_g_monoinsaturada');

        $('#calorias').val(parseFloat((energia/numero_dias)).toFixed(3));
        $('#carboidratos').val(parseFloat((carboidratos/numero_dias)).toFixed(3));
        $('#proteinas').val(parseFloat((proteinas/numero_dias)).toFixed(3));
        $('#lipidios').val(parseFloat((lipidios/numero_dias)).toFixed(3));
        $('#fibras').val(parseFloat((fibras/numero_dias)).toFixed(3));
        $('#vitamina_a').val(parseFloat((vitamina_a/numero_dias)).toFixed(3));
        $('#vitamina_c').val(parseFloat((vitamina_c/numero_dias)).toFixed(3));
        $('#vitamina_d').val(parseFloat((vitamina_d/numero_dias/numero_dias)).toFixed(3));
        $('#vitamina_e').val(parseFloat((vitamina_e/numero_dias)).toFixed(3));
        $('#vitamina_b1').val(parseFloat((vitamina_b1/numero_dias)).toFixed(3));
        $('#vitamina_b2').val(parseFloat((vitamina_b2/numero_dias)).toFixed(3));
        $('#vitamina_b6').val(parseFloat((vitamina_b6/numero_dias)).toFixed(3));
        $('#vitamina_b12').val(parseFloat((vitamina_b12/numero_dias)).toFixed(3));
        $('#niacina').val(parseFloat((niacina/numero_dias)).toFixed(3));
        $('#folico').val(parseFloat((folico/numero_dias)).toFixed(3));
        $('#pantotenico').val(parseFloat((pantotenico/numero_dias)).toFixed(3));
        $('#calcio').val(parseFloat((calcio/numero_dias)).toFixed(3));
        $('#ferro').val(parseFloat((ferro/numero_dias)).toFixed(3));
        $('#magnesio').val(parseFloat((magnesio/numero_dias)).toFixed(3));
        $('#potassio').val(parseFloat((potassio/numero_dias)).toFixed(3));
        $('#selenio').val(parseFloat((selenio/numero_dias)).toFixed(3));
        $('#fosforo').val(parseFloat((fosforo/numero_dias)).toFixed(3));
        $('#iodo').val(parseFloat((iodo/numero_dias)).toFixed(3));
        $('#cobre').val(parseFloat((cobre/numero_dias)).toFixed(3));
        $('#zinco').val(parseFloat((zinco/numero_dias)).toFixed(3));
        $('#sodio').val(parseFloat((sodio/numero_dias)).toFixed(3));
        $('#gordura_total').val(parseFloat((gordura_total/numero_dias)).toFixed(3));
        $('#colesterol').val(parseFloat((colesterol/numero_dias)).toFixed(3));
        $('#gordura_saturada').val(parseFloat((gordura_saturada/numero_dias)).toFixed(3));
        $('#gordura_poliinsaturada').val(parseFloat((gordura_poliinsaturada/numero_dias)).toFixed(3));
        $('#gordura_monoinsaturada').val(parseFloat((gordura_monoinsaturada/numero_dias)).toFixed(3));

        $('#valor').val(parseFloat(valor).toFixed(2));

        adicionaLinhaTabela();


        function enviarCadastroUpdate() {

          var nome = $("#nome").val();
          var descricao = $("#descricao").val();
          var modalidade = $("#select_modalidade option:selected").val();
          var escola = $("#select_escola option:selected").val();
          var data = $("#reservation").val();
          var valor = $("#valor").val();
          var id_cardapio = cardapio.id;
          var jsonListaItens = [];



          var count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0;

          for(var j=1;j<=6;j++){

              if(!($('#li_' + j).hasClass('disabled')) && !(validaListaVazia(j))){

                $('var[class="idRefeicao' + j + '"]').each(function (pos, item) {
                    if (!jsonListaItens.hasOwnProperty(count1)) {
                        jsonListaItens[count1] = {
                            nome: nome,
                            descricao: descricao,
                            modalidade: modalidade,
                            escola: escola,
                            data_inicio: arr,
                            data_fim: arr2,
                            numero_dias: numero_dias,
                            valor: valor,
                            id_cardapio: id_cardapio,
                        };
                    }
                    jsonListaItens[count1]['idRefeicao'] = $(this).html();
                    count1++;
                });


                $('var[class="diaSemana' + j + '"]').each(function (pos, item) {
                    if (!jsonListaItens.hasOwnProperty(count2)) {
                        jsonListaItens[count2] = {
                            nome: nome,
                            descricao: descricao,
                            modalidade: modalidade,
                            escola: escola,
                            data_inicio: arr,
                            data_fim: arr2,
                            numero_dias: numero_dias,
                            valor: valor,
                            id_cardapio: id_cardapio,
                        };
                    }
                    jsonListaItens[count2]['diaSemana'] = $(this).html();
                    count2++;
                });

                $('var[class="idTipoItem' + j + '"]').each(function (pos, item) {
                    if (!jsonListaItens.hasOwnProperty(count3)) {
                        jsonListaItens[count3] = {
                            nome: nome,
                            descricao: descricao,
                            modalidade: modalidade,
                            escola: escola,
                            data_inicio: arr,
                            data_fim: arr2,
                            numero_dias: numero_dias,
                            valor: valor,
                            id_cardapio: id_cardapio,
                        };
                    }
                    jsonListaItens[count3]['idTipoItem'] = $(this).html();
                    count3++;
                });


                $('var[class="idItem' + j + '"]').each(function (pos, item) {
                    if (!jsonListaItens.hasOwnProperty(count4)) {
                        jsonListaItens[count4] = {
                            nome: nome,
                            descricao: descricao,
                            modalidade: modalidade,
                            escola: escola,
                            data_inicio: arr,
                            data_fim: arr2,
                            numero_dias: numero_dias,
                            valor: valor,
                            id_cardapio: id_cardapio,
                        };
                    }
                    jsonListaItens[count4]['idItem'] = $(this).html();
                    count4++;
                });

                $('var[class="idMedida' + j + '"]').each(function (pos, item) {
                    if (!jsonListaItens.hasOwnProperty(count5)) {
                        jsonListaItens[count5] = {
                            nome: nome,
                            descricao: descricao,
                            modalidade: modalidade,
                            escola: escola,
                            data_inicio: arr,
                            data_fim: arr2,
                            numero_dias: numero_dias,
                            valor: valor,
                            id_cardapio: id_cardapio,
                        };
                    }
                    jsonListaItens[count5]['idMedida'] = $(this).html();
                    count5++;
                });

                $('var[class="perCapta' + j + '"]').each(function (pos, item) {
                    if (!jsonListaItens.hasOwnProperty(count6)) {
                        jsonListaItens[count6] = {
                            nome: nome,
                            descricao: descricao,
                            modalidade: modalidade,
                            escola: escola,
                            data_inicio: arr,
                            data_fim: arr2,
                            numero_dias: numero_dias,
                            valor: valor,
                            id_cardapio: id_cardapio,
                        };
                    }
                    jsonListaItens[count6]['perCapta'] = $(this).html();
                    count6++;
                });

              }
          }


          // Contrato novo.

        $.ajaxSetup({
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
          });


          $.ajax({
                    url: '/menu/update',
                    type: 'post',
                    dataType: "text",
                    data: { testdata : JSON.stringify(jsonListaItens) },
                    success: function (data, status) {
                    location.href = APP_URL + '/menu/show';
                    },
                    error: function (xhr, desc, err) {
                      alert('Erro');
                    }
                });



        }







        $('#confBotaoEnviarUpdate').click(function () {
              if (!validaEnviarFormulario()) {
                var erro = 0;
                for(var i = 1; i<=6; i++){
                  if(validaListaVazia(i)){
                    erro = 1;

                  }

                }
                if (erro == 0){
                  $(this).addClass('disabled');
                  $(this).text("Enviando...");
                  enviarCadastroUpdate();
                }
              }
          });





});
