$(document).ready(function($){

  function diasNoMes(mes, ano) {
       var data = new Date(ano, mes, 0);
       return data.getDate();
   }

  function adicionarDiasData(dias,data){
    var novaData    = new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    return novaData;
  }

  function removerDiasData(dias,data){
    var novaData    = new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
    return novaData;
  }


  function ordenaRefeicoes(listaItem,listaItens){
      var divList = $(listaItem);
      divList.sort(function(a, b) {
      // para ordem decrescente; use a - b para crescente
      return $(a).attr("horario_ref") - $(b).attr("horario_ref")
      });
      $(listaItens).html(divList);
  }

  function retornaIndiceMaiorValor(array) {
      var maior = array[0];
      var indice = 0;
      for (var i = 1; i < array.length; i++) {
          if (array[i] > maior) {
              maior = array[i];
              indice = i;
          }
      }
      return indice;
  }

  /// Gera o cardápio para a visualização do usuário
  function adicionaLinhaTabela(){
    $("#table_cardapio tbody tr").remove();

    var refeicoes_table1 = [], itens_table1 = [] , refeicoes_table2 = [], itens_table2 = [] , refeicoes_table3 = [], itens_table3 = [],
        refeicoes_table4 = [], itens_table4 = [], refeicoes_table5 = [], itens_table5 = [], refeicoes_table6 = [], itens_table6 = [];

    /*Armazena as refeicoes do cardápio de um dia da semana, o array pode conter refeições duplicadas,
      visto que cada linha da lista de alimentos armazena o nome da refeição e o nome do alimento*/
    $('.refeicao1').each(function (pos, item) {
      refeicoes_table1[pos] = $(this).html();
    });

    //Armazena os itens do cardápio de um dia da semana, na mesma ordem em que as refeições
    $('.item1').each(function (pos, item) {
       itens_table1[pos] = $(this).html();
    });

    $('.refeicao2').each(function (pos, item) {
      refeicoes_table2[pos] = $(this).html();
    });

    $('.item2').each(function (pos, item) {
       itens_table2[pos] = $(this).html();
    });

    $('.refeicao3').each(function (pos, item) {
      refeicoes_table3[pos] = $(this).html();
    });

    $('.item3').each(function (pos, item) {
       itens_table3[pos] = $(this).html();
    });

    $('.refeicao4').each(function (pos, item) {
      refeicoes_table4[pos] = $(this).html();
    });

    $('.item4').each(function (pos, item) {
       itens_table4[pos] = $(this).html();
    });

    $('.refeicao5').each(function (pos, item) {
      refeicoes_table5[pos] = $(this).html();
    });

    $('.item5').each(function (pos, item) {
       itens_table5[pos] = $(this).html();
    });

    $('.refeicao6').each(function (pos, item) {
      refeicoes_table6[pos] = $(this).html();
    });

    $('.item6').each(function (pos, item) {
       itens_table6[pos] = $(this).html();
    });

    var itens_refeicao1 = [''], itens_refeicao2 = [''], itens_refeicao3 = [''], itens_refeicao4 = [''], itens_refeicao5 = [''], itens_refeicao6 = [''] ;
    var count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0;

    //concatena os itens pertencentes a uma mesma refeição
    for(var i =0; i < refeicoes_table1.length; i++){
      if(refeicoes_table1[i] == refeicoes_table1[i+1]){
        itens_refeicao1[count1] += itens_table1[i] + '<br>';
      }else{
        itens_refeicao1[count1] += itens_table1[i];
        if(i < refeicoes_table1.length-1 ){
          count1++;
          itens_refeicao1[count1] = '';
        }
      }
    }

    for(var i =0; i < refeicoes_table2.length; i++){
      if(refeicoes_table2[i] == refeicoes_table2[i+1]){
        itens_refeicao2[count2] += itens_table2[i] + '<br>';
      }else{
        itens_refeicao2[count2] += itens_table2[i];
        if(i < refeicoes_table2.length-1 ){
          count2++;
          itens_refeicao2[count2] = '';
        }
      }
    }

    for(var i =0; i < refeicoes_table3.length; i++){
      if(refeicoes_table3[i] == refeicoes_table3[i+1]){
        itens_refeicao3[count3] += itens_table3[i] + '<br>';
      }else{
        itens_refeicao3[count3] += itens_table3[i];
        if(i < refeicoes_table3.length-1 ){
          count3++;
          itens_refeicao3[count3] = '';
        }
      }
    }

    for(var i =0; i < refeicoes_table4.length; i++){
      if(refeicoes_table4[i] == refeicoes_table4[i+1]){
        itens_refeicao4[count4] += itens_table4[i] + '<br>';
      }else{
        itens_refeicao4[count4] += itens_table4[i];
        if(i < refeicoes_table4.length-1 ){
          count4++;
          itens_refeicao4[count4] = '';
        }
      }
    }

    for(var i =0; i < refeicoes_table5.length; i++){
      if(refeicoes_table5[i] == refeicoes_table5[i+1]){
        itens_refeicao5[count5] += itens_table5[i] + '<br>';
      }else{
        itens_refeicao5[count5] += itens_table5[i];
        if(i < refeicoes_table5.length-1 ){
          count5++;
          itens_refeicao5[count5] = '';
        }
      }
    }

    for(var i =0; i < refeicoes_table6.length; i++){
      if(refeicoes_table6[i] == refeicoes_table6[i+1]){
        itens_refeicao6[count6] += itens_table6[i] + '<br>';
      }else{
        itens_refeicao6[count6] += itens_table6[i];
        if(i < refeicoes_table6.length-1 ){
          count6++;
          itens_refeicao6[count6] = '';
        }
      }
    }

    /*Exclui as refeições repetidas do array refeicoes_tableX. Desta forma os arrays intens_refeicaoX
      terão o mesmo tamanho dos arrays refeicoesUnicasX*/
    var refeicoesUnicas1 = [];
    $.each(refeicoes_table1, function(i, el){
      if($.inArray(el, refeicoesUnicas1) === -1) refeicoesUnicas1.push(el);
    });

    var refeicoesUnicas1 = [];
    $.each(refeicoes_table1, function(i, el){
      if($.inArray(el, refeicoesUnicas1) === -1) refeicoesUnicas1.push(el);
    });

    var refeicoesUnicas2 = [];
    $.each(refeicoes_table2, function(i, el){
      if($.inArray(el, refeicoesUnicas2) === -1) refeicoesUnicas2.push(el);
    });

    var refeicoesUnicas3 = [];
    $.each(refeicoes_table3, function(i, el){
      if($.inArray(el, refeicoesUnicas3) === -1) refeicoesUnicas3.push(el);
    });

    var refeicoesUnicas4 = [];
    $.each(refeicoes_table4, function(i, el){
      if($.inArray(el, refeicoesUnicas4) === -1) refeicoesUnicas4.push(el);
    });

    var refeicoesUnicas5 = [];
    $.each(refeicoes_table5, function(i, el){
      if($.inArray(el, refeicoesUnicas5) === -1) refeicoesUnicas5.push(el);
    });

    var refeicoesUnicas6 = [];
    $.each(refeicoes_table6, function(i, el){
      if($.inArray(el, refeicoesUnicas6) === -1) refeicoesUnicas6.push(el);
    });

    var $select_escola = $('#select_escola option:selected');
    var $select_modalidade = $('#select_modalidade').val();
    var total_refeicoes = [];
    var $id_referencia = 0;
    var $referencia =[];
    var aux = [];

    /*//Armazena todas as refeições de um destino
    if(typeof refeicoes_destino !== "undefined"){
        for (var i in refeicoes_destino) {
            if (refeicoes_destino.hasOwnProperty(i) != null && refeicoes_destino[i].id_destino == $select_destino) {
                total_refeicoes[aux] = refeicoes_destino[i];
                aux++;
            }
        }
    }*/

    aux[0] = refeicoesUnicas1.length;
    aux[1] = refeicoesUnicas2.length;
    aux[2] = refeicoesUnicas3.length;
    aux[3] = refeicoesUnicas4.length;
    aux[4] = refeicoesUnicas5.length;
    aux[5] = refeicoesUnicas6.length;

    var listaRefeicoes = retornaIndiceMaiorValor(aux);

    if (listaRefeicoes == 0) {
      total_refeicoes = refeicoesUnicas1;
    }else if (listaRefeicoes == 1) {
      total_refeicoes = refeicoesUnicas2;
    }else if (listaRefeicoes == 2) {
      total_refeicoes = refeicoesUnicas3;
    }else if (listaRefeicoes == 3) {
      total_refeicoes = refeicoesUnicas4;
    }else if (listaRefeicoes == 4) {
      total_refeicoes = refeicoesUnicas5;
    }else {
      total_refeicoes = refeicoesUnicas6;
    }


    //Armazena as informações de uma modalidade
    var $nome_escola = $select_escola.text();

    if(typeof modalidades_escola !== "undefined"){

        for (var i in modalidades_escola) {
          if(modalidades_escola.hasOwnProperty(i) != null && modalidades_escola[i].id == $select_modalidade){
            $id_referencia = modalidades_escola[i].id_referencia;
          }
        }


    }

    //Armazena as informações da referência nutricional associada a um destino
    if(typeof referencias !== "undefined"){
        for (var i in referencias) {
            if (referencias.hasOwnProperty(i) != null && referencias[i].id == $id_referencia) {
                $referencia = referencias[i];
            }
        }
    }

    //Variáveis auxiliares
    var contador1 = 0, contador2 = 0, contador3 = 0, contador4 = 0, contador5 = 0, contador6 = 0;

    //Adiciona as refeições e os itens de cada dia da semana tabela de vizualização do cardápio
    for(var i =0; i < total_refeicoes.length; i++){

      var newRow = $("<tr class='success'>");
      var cols = "";
      var horario_ref ="";

      for (var j = 0; j < tipo_refeicoes.length; j++){
        if (total_refeicoes[i] == tipo_refeicoes[j].nome) {
          horario_ref = (tipo_refeicoes[j].horario).split(':');
        }
      }

      cols+= '<td class="text-center"style="width:100px;" colspan="3"><font size=2><strong>' + total_refeicoes[i] + '</strong><br>' + horario_ref[0] + ':' + horario_ref[1] +'</font></td>'
      if(refeicoesUnicas1[contador1] == total_refeicoes[i]){
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2>'+ itens_refeicao1[contador1] +'</font></td>';
        contador1++;
      }else{
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2></font></td>'
      }
      if(refeicoesUnicas2[contador2] == total_refeicoes[i]){
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2>'+ itens_refeicao2[contador2] +'</font></td>';
        contador2++;
      }else {
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2></font></td>';
      }
      if(refeicoesUnicas3[contador3] == total_refeicoes[i]){
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2>'+ itens_refeicao3[contador3] +'</font></td>';
        contador3++;
      }else {
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2></font></td>';
      }
      if(refeicoesUnicas4[contador4] == total_refeicoes[i]){
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2>'+ itens_refeicao4[contador4] +'</font></td>';
        contador4++;
      }else {
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2></font></td>';
      }
      if(refeicoesUnicas5[contador5] == total_refeicoes[i]){
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2>'+ itens_refeicao5[contador5] +'</font></td>';
        contador5++;
      }else {
        cols+= '<td class="text-center" colspan="2" style="width:220px;"><font size=2></font></td>';
      }
      if(refeicoesUnicas6[contador6] == total_refeicoes[i]){
        cols+= '<td class="text-center" colspan="2" style="width:290px;"><font size=2>'+ itens_refeicao6[contador6] +'</font></td>';
        contador6++;
      }else {
        cols+= '<td class="text-center" colspan="2" style="width:290px;"><font size=2></font></td>';
      }

      newRow.append(cols);
      $("#table_cardapio").append(newRow);

    }

    var segunda = new Date(), terca = new Date(), quarta = new Date(), quinta = new Date(), sexta = new Date(), sabado = new Date();

    /*Armazena os dias (número) do mês.
    (Função criada especialmente para as semanas que são divididas entre dois meses diferentes)*/

    if(d.getDay() ==1){
      segunda = d;
      terca = adicionarDiasData(1,d);
      quarta = adicionarDiasData(2,d);
      quinta = adicionarDiasData(3,d);
      sexta = adicionarDiasData(4,d);
      sabado = adicionarDiasData(5,d);
    }else if (d.getDay() ==2) {
      segunda = removerDiasData(1,d);
      terca = d;
      quarta = adicionarDiasData(1,d) ;
      quinta = adicionarDiasData(2,d);
      sexta = adicionarDiasData(3,d);
      sabado = adicionarDiasData(4,d);
    }else if (d.getDay() ==3) {
      segunda =removerDiasData(2,d);
      terca = removerDiasData(1,d);
      quarta = d;
      quinta = adicionarDiasData(1,d);
      sexta = adicionarDiasData(2,d);
      sabado = adicionarDiasData(3,d);
    }else if (d.getDay() ==4) {
      segunda = removerDiasData(3,d);
      terca = removerDiasData(2,d);
      quarta = removerDiasData(1,d);
      quinta = d;
      sexta = adicionarDiasData(1,d);
      sabado = adicionarDiasData(2,d);
    }else if (d.getDay() ==5) {
      segunda = removerDiasData(4,d);
      terca = removerDiasData(3,d);
      quarta = removerDiasData(2,d);
      quinta = removerDiasData(1,d);
      sexta = d;
      sabado = adicionarDiasData(1,d);
    }else {
      segunda = removerDiasData(5,d);
      terca = removerDiasData(4,d);
      quarta = removerDiasData(3,d);
      quinta = removerDiasData(2,d);
      sexta = removerDiasData(1,d);
      sabado = d;
    }

    /*Adiciona um 0 para os dias menores que 10 (Ex.: Dia 2 -> Dia 02) e
      para os meses menores que 10 (Ex.: Mês 2 -> Mês 02) */
    if(segunda.getDate() < 10 && (segunda.getMonth()+1) < 10){
        $("#td_dia1").html('0' + segunda.getDate() + '/0' + (segunda.getMonth()+1));
    }else if (segunda.getDate() < 10 && (segunda.getMonth()+1) >= 10) {
        $("#td_dia1").html('0' + segunda.getDate() + '/' + (segunda.getMonth()+1));
    }else if (segunda.getDate() >= 10 && (segunda.getMonth()+1) < 10) {
        $("#td_dia1").html(segunda.getDate() + '/0' + (segunda.getMonth()+1));
    }else {
        $("#td_dia1").html(segunda.getDate() + '/' + (segunda.getMonth()+1));
    }

    if(terca.getDate() < 10 && (terca.getMonth()+1) < 10){
        $("#td_dia2").html('0' + terca.getDate() + '/0' + (terca.getMonth()+1));
    }else if (terca.getDate() < 10 && (terca.getMonth()+1) >= 10) {
        $("#td_dia2").html('0' + terca.getDate() + '/' + (terca.getMonth()+1));
    }else if (terca.getDate() >= 10 && (terca.getMonth()+1) < 10) {
        $("#td_dia2").html(terca.getDate() + '/0' + (terca.getMonth()+1));
    }else {
        $("#td_dia2").html(terca.getDate() + '/' + (terca.getMonth()+1));
    }

    if(quarta.getDate() < 10 && (quarta.getMonth()+1) < 10){
        $("#td_dia3").html('0' + quarta.getDate() + '/0' + (quarta.getMonth()+1));
    }else if (quarta.getDate() < 10 && (quarta.getMonth()+1) >= 10) {
        $("#td_dia3").html('0' + quarta.getDate() + '/' + (quarta.getMonth()+1));
    }else if (quarta.getDate() >= 10 && (quarta.getMonth()+1) < 10) {
        $("#td_dia3").html(quarta.getDate() + '/0' + (quarta.getMonth()+1));
    }else {
          $("#td_dia3").html(quarta.getDate() + '/' + (quarta.getMonth()+1));
    }

    if(quinta.getDate() < 10 && (quinta.getMonth()+1) < 10){
        $("#td_dia4").html('0' + quinta.getDate() + '/0' + (quinta.getMonth()+1));
    }else if (quinta.getDate() < 10 && (quinta.getMonth()+1) >= 10) {
        $("#td_dia4").html('0' + quinta.getDate() + '/' + (quinta.getMonth()+1));
    }else if (quinta.getDate() >= 10 && (quinta.getMonth()+1) < 10) {
        $("#td_dia4").html(quinta.getDate() + '/0' + (quinta.getMonth()+1));
    }else {
        $("#td_dia4").html(quinta.getDate() + '/' + (quinta.getMonth()+1));
    }

    if(sexta.getDate() < 10 && (sexta.getMonth()+1) < 10){
        $("#td_dia5").html('0' + sexta.getDate() + '/0' + (sexta.getMonth()+1));
    }else if (sexta.getDate() < 10 && (sexta.getMonth()+1) >= 10) {
        $("#td_dia5").html('0' + sexta.getDate() + '/' + (sexta.getMonth()+1));
    }else if (sexta.getDate() >= 10 && (sexta.getMonth()+1) < 10) {
        $("#td_dia5").html(sexta.getDate() + '/0' + (sexta.getMonth()+1));
    }else {
      $("#td_dia5").html(sexta.getDate() + '/' + (sexta.getMonth()+1));
    }

    if(sabado.getDate() < 10 && (sabado.getMonth()+1) < 10){
        $("#td_dia6").html('0' + sabado.getDate() + '/0' + (sabado.getMonth()+1));
    }else if (sabado.getDate() < 10 && (sabado.getMonth()+1) >= 10) {
        $("#td_dia6").html('0' + sabado.getDate() + '/' + (sabado.getMonth()+1));
    }else if (sabado.getDate() >= 10 && (sabado.getMonth()+1) < 10) {
        $("#td_dia6").html(sabado.getDate() + '/0' + (sabado.getMonth()+1));
    }else{
        $("#td_dia6").html(sabado.getDate() + '/' + (sabado.getMonth()+1));
    }

    $("#span_mes_ano").html(meses[d.getMonth()] + ' / ' + d.getFullYear());

    var $categoria = '';
    var $faixa_idade = '';

    if($referencia.categoria_ensino == 1){
      $categoria ='CRECHE';
    }else if ($referencia.categoria_ensino == 2) {
      $categoria = 'PRÉ-ESCOLA';
    }else if ($referencia.categoria_ensino == 3) {
      $categoria = 'ENSINO FUNDAMENTAL';
    }else if ($referencia.categoria_ensino == 4) {
      $categoria = 'ENSINO MÉDIO';
    }else{
      $categoria = 'EJA';
    }

    if($referencia.idade_alunos == 1){
      $faixa_idade ='7 - 11 MESES';
    }else if ($referencia.idade_alunos == 2) {
      $faixa_idade = '1 - 3 ANOS';
    }else if ($referencia.idade_alunos == 3) {
      $faixa_idade = '4 - 5 ANOS';
    }else if ($referencia.idade_alunos == 4) {
      $faixa_idade = '6 - 10 ANOS';
    }else if ($referencia.idade_alunos == 5) {
      $faixa_idade = '11 - 15 ANOS';
    }else if ($referencia.idade_alunos == 6) {
      $faixa_idade = '16 - 18 ANOS';
    }else if ($referencia.idade_alunos == 7) {
      $faixa_idade = '19 - 30 anos';
    }else{
      $faixa_idade = '31 - 60 anos';
    }
    $("#td_modalidade").html('CARDÁPIO ' + $categoria + ' (' + $faixa_idade + ')' + ' ' + '<strong>' + $nome_escola.toUpperCase() + '</strong>');
    $("#td_span_calorias").html((energia/numero_dias).toFixed(2));
    $("#td_span_carboidratos").html((carboidratos/numero_dias).toFixed(2));
    $("#td_span_proteinas").html((proteinas/numero_dias).toFixed(2));
    $("#td_span_lipidios").html((lipidios/numero_dias).toFixed(2));
    $("#td_span_fibras").html((fibras/numero_dias).toFixed(2));
    $("#td_span_vit_a").html((vitamina_a/numero_dias).toFixed(2));
    $("#td_span_vit_c").html((vitamina_c/numero_dias).toFixed(2));
    $("#td_span_calcio").html((calcio/numero_dias).toFixed(2));
    $("#td_span_ferro").html((ferro/numero_dias).toFixed(2));
    $("#td_span_magnesio").html((magnesio/numero_dias).toFixed(2));
    $("#td_span_zinco").html((zinco/numero_dias).toFixed(2));
    $("#td_span_sodio").html((sodio/numero_dias).toFixed(2));


  }

  $('#reservation').daterangepicker({ timePicker: false, timePickerIncrement: 0, locale: { format: 'DD/MM/YYYY' }});var d = [];

  var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


  var energia = 0, carboidratos = 0, proteinas = 0, lipidios = 0, fibras = 0, vitamina_a = 0,
      vitamina_c = 0, vitamina_d = 0, vitamina_e = 0, vitamina_b1 = 0, vitamina_b2 = 0,
      vitamina_b6 = 0, vitamina_b12 = 0, niacina = 0, folico = 0, pantotenico = 0, calcio = 0,
      ferro = 0, magnesio = 0, potassio = 0, selenio = 0, fosforo = 0, iodo = 0, cobre = 0,
      zinco = 0, sodio = 0, gordura_total = 0, colesterol = 0, gordura_saturada = 0,
      gordura_poliinsaturada = 0, gordura_monoinsaturada = 0, valor = 0;

  referencia_modalidade = [];




  var data = moment(cardapio.data_inicio, "YYYY-MM-DD");
  var data2 = moment(cardapio.data_fim, "YYYY-MM-DD");

  for(var i in modalidades_escola){
    if(cardapio.id_escola == modalidades_escola[i].id_escola){
      for(var j in referencias){
        if(modalidades_escola[i].id_referencia == referencias[j].id){
          referencia_modalidade = referencias[j];
        }
      }

    }
  }

  $('#reservation').data('daterangepicker').setStartDate(data);
  $('#reservation').data('daterangepicker').setEndDate(data2);

  var oldData = ($('#reservation').val()).split(" - ");
  var datai = moment(oldData[0], "DD/MM/YYYY");
  var dataf = moment(oldData[1], "DD/MM/YYYY");
  var oldDatai = moment(datai.format("YYYY-MM-DD"),"YYYY-MM-DD");
  var oldDataf = moment(dataf.format("YYYY-MM-DD"),"YYYY-MM-DD");
  var separa = ($('#reservation').val()).split(" - ");
  var data = moment(separa[0], "DD/MM/YYYY");
  var data2 = moment(separa[1], "DD/MM/YYYY");

  var arr = data.format("YYYY-MM-DD");
  var arr2 = data2.format("YYYY-MM-DD");
  var partes = arr.match(/(\d+)/g);
  var partes2 = arr2.match(/(\d+)/g);
  var d = new Date(partes[0], partes[1]-1, partes[2],new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds());
  var d2 = new Date(partes2[0], partes2[1]-1, partes2[2]);
  var numero_dias = Math.abs(d2.getDay()-d.getDay()) + 1;

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
        //removeClasse('#li_' + itens_cardapio[j].dia_semana,'disabled');
        //removeClasse('#li_' + itens_cardapio[j].dia_semana,'active');
        //adicionaAtributo('#a_' + itens_cardapio[j].dia_semana,'data-toggle','tab');
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
          + '<div class="col-md-2 text-center">'
          + '<button class="btn btn-danger botaoRemover' + itens_cardapio[j].dia_semana + ' data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
          + '</div>'
          + '</div>'
          + '</li>'
          + '</div>';
          $('#listaVazia' + itens_cardapio[j].dia_semana).hide();
          $('#listaItens' + itens_cardapio[j].dia_semana).append(stringHTML);
          ordenaRefeicoes('.listaItem' + itens_cardapio[j].dia_semana,'#listaItens' + itens_cardapio[j].dia_semana);


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


        adicionaLinhaTabela();





});
