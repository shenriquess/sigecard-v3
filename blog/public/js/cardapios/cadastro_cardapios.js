
//Variáveis que receberão a média de nutrientes do cardápio
var energia = 0, carboidratos = 0, proteinas = 0, lipidios = 0, fibras = 0, vitamina_a = 0,
vitamina_c = 0, vitamina_d = 0, vitamina_e = 0, vitamina_b1 = 0, vitamina_b2 = 0,
vitamina_b6 = 0, vitamina_b12 = 0, niacina = 0, folico = 0, pantotenico = 0, calcio = 0,
ferro = 0, magnesio = 0, potassio = 0, selenio = 0, fosforo = 0, iodo = 0, cobre = 0,
zinco = 0, sodio = 0, gordura_total = 0, colesterol = 0, gordura_saturada = 0,
gordura_poliinsaturada = 0, gordura_monoinsaturada = 0, valor = 0;


//Variáveis que controlam se as listas dos cardápios estão vazias ou não
var listaVazia1 = true;
var listaVazia2 = true;
var listaVazia3 = true;
var listaVazia4 = true;
var listaVazia5 = true;
var listaVazia6 = true;

//Variável que controla o tamanho total, somando a lista de cada dia da semana (segunda à sábado)
var listaTamanhoTotal = 0;

//Variáveis que controlam o tamnho da lista de alimentos de cada dia da semana (segunda à sábado)
var listaTamanho1 =  0;
var listaTamanho2 =  0;
var listaTamanho3 =  0;
var listaTamanho4 =  0;
var listaTamanho5 =  0;
var listaTamanho6 =  0;

var editando1 = false;
var editando2 = false;
var editando3 = false;
var editando4 = false;
var editando5 = false;
var editando6 = false;

/**
* Posição do item que está sendo editado no momento.
* @type {number}
*/
var posicaoEditar1 = 0;
var posicaoEditar2 = 0;
var posicaoEditar3 = 0;
var posicaoEditar4 = 0;
var posicaoEditar5 = 0;
var posicaoEditar6 = 0;

var referencia_modalidade = [];

//Ativa o calendário DataRangePicker
$('#reservation').daterangepicker({ timePicker: false, timePickerIncrement: 0, locale: { format: 'DD/MM/YYYY' }});

//Variáveis que controlam as datas
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

var numero_dias = numero_dias = Math.abs(d2.getDay()-d.getDay()) + 1;
var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

//Retorna se o mês tem 28, 29, 30 ou 31 dias
function diasNoMes(mes, ano) {
  var data = new Date(ano, mes, 0);
  return data.getDate();
}

//Adiciona dias à uma data
function adicionarDiasData(dias,data){
  var novaData    = new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
  return novaData;
}

//Remove dias de uma data
function removerDiasData(dias,data){
  var novaData    = new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
  return novaData;
}

//Funcões que removem ou adicionam classes e/ou atributos aos elementos
function removeClasse(elemento,valor) {
  $(elemento).removeClass(valor);
}

function adicionaClasse(elemento,valor) {
  $(elemento).addClass(valor);
}

function removeAtributo(elemento,valor) {
  $(elemento).removeAttr(valor);
}

function adicionaAtributo(elemento,valor1,valor2) {
  $(elemento).attr(valor1,valor2);
}

//Ordena as refeições (div's)  do cardápio pelo horário da refeição
function ordenaRefeicoes(listaItem,listaItens){
  var divList = $(listaItem);
  divList.sort(function(a, b) {
    // para ordem decrescente; use a - b para crescente
    return $(a).attr("horario_ref") - $(b).attr("horario_ref")
  });
  $(listaItens).html(divList);
}

function mostraDialogo2(mensagem, tipo){
  swal({
    title: "Aviso!",
    text: mensagem,
    icon: tipo,
  })
  .then((value) => {
    location.href = APP_URL + '/menu/create';
  });
}

function mostraDialogo3(data){
  swal("Deseja gerar o PDF do cardápio agora?", {
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
      window.open(APP_URL + '/menu/' + data + '/pdf', '_blank');
      mostraDialogo2("Dados inseridos com sucesso","success");
      break;

      default:
      mostraDialogo2("Dados inseridos com sucesso","success");
    }
  });
}

//Valida os campos do formulário retornando se houve algum erro ou não
function validaEnviarFormulario() {
  var erro = false;
  var $formNome = $('#nome');
  var $formModalidadeSelected = $('#select_modalidade');
  var $formData= $('#reservation');
  if ($formNome.val() == "") {
    erro = true;
    notificacao_alerta('Digite um <b>Nome</b>.');
  }else if ($formModalidadeSelected.val() <= 0) {
    erro = true;
    notificacao_alerta('Selecine um <b>Modalidade</b>.');
  }else if ($formData.val() == "") {
    erro = true;
    notificacao_alerta('Defina uma <b>Data</b>.');
  }else{
    erro = false;
  }
  return erro;
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

// Gera o cardápio para a visualização do usuário
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

//Atualiza a tabela que compara o nutrientes do cardápio com a referência nutricional, em porcentagem
function atualizaTabelaReferencia(nutriente,nutriente_referencia,span_nutriente){
  var porcentagem = 0;

  if((nutriente > 0) && (nutriente_referencia > 0)){
    porcentagem = (nutriente/nutriente_referencia)*100;
  }else if ((nutriente == 0) && (nutriente_referencia == 0)){
    porcentagem = 100;
  }else if ((nutriente == 0) && (nutriente_referencia > 0)){
    porcentagem = 0;
  }else{
    porcentagem =  -1;
  }

  if (porcentagem == 100){
    $(span_nutriente).removeClass();
    adicionaClasse(span_nutriente,"badge bg-green");
    $(span_nutriente).empty();
    $(span_nutriente).html(porcentagem.toFixed(1) + ' %');
    $(span_nutriente).attr('data-content','<strong>Valor do Cardápio</strong>: ' + parseFloat(nutriente).toFixed(2) + '<br><strong>Valor da Referência</strong>: ' + parseFloat(nutriente_referencia).toFixed(2));

  }else if (porcentagem > 100 && span_nutriente != '#span_p_sodio') {
    $(span_nutriente).removeClass();
    adicionaClasse(span_nutriente,"badge bg-blue");
    $(span_nutriente).empty();
    $(span_nutriente).html(porcentagem.toFixed(1) + ' %');
    $(span_nutriente).attr('data-content','<strong>Valor do Cardápio</strong>: ' + parseFloat(nutriente).toFixed(2) + '<br><strong>Valor da Referência</strong>: ' + parseFloat(nutriente_referencia).toFixed(2));

  }else if (porcentagem == -1) {
    $(span_nutriente).removeClass();
    adicionaClasse(span_nutriente,"badge bg-blue");
    $(span_nutriente).empty();
    $(span_nutriente).html('N/A');
    $(span_nutriente).attr('data-content','<strong>Valor do Cardápio</strong>: ' + parseFloat(nutriente).toFixed(2) + '<br><strong>Valor da Referência</strong>: Não Aplicável');
  }else if (porcentagem < 100 && span_nutriente == '#span_p_sodio') {
    $(span_nutriente).removeClass();
    adicionaClasse(span_nutriente,"badge bg-green");
    $(span_nutriente).empty();
    $(span_nutriente).html(porcentagem.toFixed(1) + ' %');
    $(span_nutriente).attr('data-content','<strong>Valor do Cardápio</strong>: ' + parseFloat(nutriente).toFixed(2) + '<br><strong>Valor da Referência</strong>: ' + parseFloat(nutriente_referencia).toFixed(2));

  }else{
    $(span_nutriente).removeClass();
    adicionaClasse(span_nutriente,"badge bg-red");
    $(span_nutriente).empty();
    $(span_nutriente).html(porcentagem.toFixed(1) + ' %');
    $(span_nutriente).attr('data-content','<strong>Valor do Cardápio</strong>: ' + parseFloat(nutriente).toFixed(2) + '<br><strong>Valor da Referência</strong>: ' + parseFloat(nutriente_referencia).toFixed(2));
  }

}


//Verifica se a lista de algum dia da semana (habilitado pelo usuário) está vazia.
function validaListaVazia(dia) {
  var $tab_1 = $('#li_1').hasClass('disabled');
  var $tab_2 = $('#li_2').hasClass('disabled');
  var $tab_3 = $('#li_3').hasClass('disabled');
  var $tab_4 = $('#li_4').hasClass('disabled');
  var $tab_5 = $('#li_5').hasClass('disabled');
  var $tab_6 = $('#li_6').hasClass('disabled');

  var erro = false;
  if(dia == 1 && listaTamanho1 == 0 && !$tab_1){
    notificacao_alerta('A lista de Itens da Segunda-Feira está <b>Vazia</b>.');
    erro = true;
  }
  if(dia == 2 && listaTamanho2 == 0 && !$tab_2){
    notificacao_alerta('A lista de tens da Terça-Feira está <b>Vazia</b>.');
    erro = true;
  }

  if(dia == 3 && listaTamanho3 == 0 && !$tab_3){
    notificacao_alerta('A lista de tens da Quarta-Feira está <b>Vazia</b>.');
    erro = true;
  }
  if(dia == 4 && listaTamanho4 == 0 && !$tab_4){
    notificacao_alerta('A lista de tens da Quinta-Feira está <b>Vazia</b>.');
    erro = true;
  }
  if(dia == 5 && listaTamanho5 == 0 && !$tab_5){
    notificacao_alerta('A lista de tens da Sexta-Feira está <b>Vazia</b>.');
    erro = true;
  }
  if(dia == 6 && listaTamanho6 == 0 && !$tab_6){
    notificacao_alerta('A lista de tens do Sábado está <b>Vazia</b>.');
    erro = true;
  }
  return erro;
}


function limparCamposItem(dia) {
  if($('#select_tipo_refeicao' + dia).val() == 0 || $('#select_modalidade').val() == 0 || $('#select_escola').val() == 0 ){
    $('#select_fonte' + dia).empty();
    $('#select_fonte' + dia).html('<option value="0">Selecione uma opção</option>');
  }
  $('#select_fonte' + dia).val(0);
  $('#select_item_add' + dia).val(0);
  $('#select_item_add' + dia).selectpicker('refresh');
  $('#select_medida' + dia).empty();
  $('#select_medida' + dia).html('<option value="0">Selecione uma opção</option>');
  $('#p_liquido' + dia).val(parseFloat(0).toFixed(3));
  $('#p_liquido' + dia).prop('disabled', true);
}

function criaOpcaoRefeicoes(dia){
  var string = '<option value="0">Selecione uma opção</option>';
  if(typeof tipo_refeicoes !== "undefined"){
    for (var i in tipo_refeicoes) {
      string += '<option value="' + tipo_refeicoes[i].id + '">' + tipo_refeicoes[i].nome + '</option>';
    }
  }else {
    mostraDialogo('<strong>Por favor, primeiro cadastre um Tipo de Refeição.</strong>', 'info', 4000, 'info');
  }

  $('#select_tipo_refeicao' + dia).empty();
  $('#select_tipo_refeicao' + dia).html(string);

}

function criaOpcaoRefeicoesEdit(){
  var string = '<option value="0">Selecione uma opção</option>';
  if(typeof tipo_refeicoes !== "undefined"){
    for (var i in tipo_refeicoes) {
      string += '<option value="' + tipo_refeicoes[i].id + '">' + tipo_refeicoes[i].nome + '</option>';
    }
  }else {
    mostraDialogo('<strong>Por favor, primeiro cadastre um Tipo de Refeição.</strong>', 'info', 4000, 'info');
  }

  $('#select_tipo_refeicao_edit').empty();
  $('#select_tipo_refeicao_edit').html(string);

}


$(document).ready(function($){
  $( function(){ var init_form = $('#id_form').serialize(); // Result example: "name=&email=&message="
  // Cancel event onbeforeunload when Submit form
  $('#confBotaoEnviar').click(function() { window.onbeforeunload = null; });
  $('#confBotaoEnviarUpdate').click(function() { window.onbeforeunload = null; });
  $('#btn_cancelar').click(function() { window.onbeforeunload = null; });
  $('.btn').click(function() { window.onbeforeunload = null; });

  window.onbeforeunload = function(){ var check_form = $('#id_form').serialize();
  if( check_form === init_form ) return null; return 'Os dados do formulário não foram salvos, deseja permanecer nesta página?'; };
});

$('#p_liquido1').mask("0000.000", {reverse: true});
$('#p_liquido2').mask("0000.000", {reverse: true});
$('#p_liquido3').mask("0000.000", {reverse: true});
$('#p_liquido4').mask("0000.000", {reverse: true});
$('#p_liquido5').mask("0000.000", {reverse: true});
$('#p_liquido6').mask("0000.000", {reverse: true});

//Habilita o Popover
$('[data-toggle="popover"]').popover();

//Habilita o SelectPicker
$('#select_item_add1').selectpicker();
$('#select_item_add2').selectpicker();
$('#select_item_add3').selectpicker();
$('#select_item_add4').selectpicker();
$('#select_item_add5').selectpicker();
$('#select_item_add6').selectpicker();

/*Popup exibida ao usuário com opção de "Não exibir essa mensagem novamente"
O status é armazenado no computador do usuário.
if (!window.localStorage.getItem("popup-exibida" + user))
{
$('#Responsivo').popover({
trigger: 'manual',
container: '#div_import',
placement: 'my-popover',
html: true,
sanitize: false,
title: 'Importar Cardápio',
content: $('#div-popover').html() // Adiciona o conteúdo da div oculta para dentro do popover.
}).popover('show');

var isChecked = false;
$('body').on('click', '#defaultCheck1', function(){
isChecked = $(this).is(":checked");
});

$(document).on('click', '#close', function() {
$('#Responsivo').popover('hide');
if(isChecked){
window.localStorage.setItem("popup-exibida" + user, "1");
}
});
}

window.localStorage.removeItem("popup-exibida" + user);*/

$('#div_collapsed').boxWidget('collapse')

$('#table_calc').prop('hidden', false);

function criaOpcaoModalidades(id_escola) {
  var $select_modalidade = $('#select_modalidade');
  var string = '<option value="0">Selecione uma opção</option>';
  var nomeModalidade = "";
  if(id_escola > 0){
    if (typeof modalidades_escola !== "undefined"){
      for(i in modalidades_escola){
        if(id_escola == modalidades_escola[i].id_escola){
          if(modalidades_escola[i].categoria_ensino == 1 && modalidades_escola[i].idade_alunos == 1){
            nomeModalidade = 'Creche (7 - 11 meses)';
          }else if (modalidades_escola[i].categoria_ensino == 1 && modalidades_escola[i].idade_alunos == 2) {
            nomeModalidade = 'Creche (1 - 3 anos)';
          }else if (modalidades_escola[i].categoria_ensino == 2 && modalidades_escola[i].idade_alunos == 3) {
            nomeModalidade = 'Pré-escola (4 - 5 anos)';
          }else if (modalidades_escola[i].categoria_ensino == 3 && modalidades_escola[i].idade_alunos == 4) {
            nomeModalidade = 'Ensino Fundamental (6 - 10 anos)';
          }else if (modalidades_escola[i].categoria_ensino == 3 && modalidades_escola[i].idade_alunos == 5) {
            nomeModalidade = 'Ensino Fundamental (11 - 15 anos)';
          }else if (modalidades_escola[i].categoria_ensino == 4 && modalidades_escola[i].idade_alunos == 6) {
            nomeModalidade = 'Ensino Fundamental (16 - 18 anos)';
          }else if (modalidades_escola[i].categoria_ensino == 5 && modalidades_escola[i].idade_alunos == 7) {
            nomeModalidade = 'EJA (19 - 30 anos)';
          }else{
            nomeModalidade = 'EJA (31 - 60 anos)';
          }
          string += '<option value= "' + modalidades_escola[i].id + '">' + nomeModalidade + '</option>';
        }
      }
    }
  }else{
    string = '<option value="0">Selecione uma opção</option>';
  }
  $select_modalidade.empty();
  $select_modalidade.html(string);
}


function criaOpcaoTipoItens(dia){

  var string = '<option value="0">Selecione uma opção</option>';
  var $select_tipo_item = $('#select_tipo_item' + dia);
  $select_tipo_item.empty();

  string += '<option value= "1">Alimento</option>'
  +  '<option value= "2">Preparação</option>';

  $select_tipo_item.html(string);
}

function criaOpcaoTipoItensEdit(){

  var string = '<option value="0">Selecione uma opção</option>';
  var $select_tipo_item = $('#select_tipo_item_edit');
  $select_tipo_item.empty();

  string += '<option value= "1">Alimento</option>'
  +  '<option value= "2">Preparação</option>';

  $select_tipo_item.html(string);

}

function criaOpcaoFonteItens(dia) {
  var $select_fonte = $('#select_fonte' + dia);
  $select_fonte.empty();

  var string = '<option value="0">Todas as Fontes</option>';

  if (fontes){
    for(i in fontes){
      string += '<option value= "' + fontes[i].id + '">' + fontes[i].nome + '</option>';
    }
  }

  $select_fonte.empty();
  $select_fonte.html(string);
}

function criaOpcaoFonteItensEdit(dia) {
  var $select_fonte = $('#select_fonte_edit');
  $select_fonte.empty();

  var string = '<option value="0">Todas as Fontes</option>';

  if (fontes){
    for(i in fontes){
      string += '<option value= "' + fontes[i].id + '">' + fontes[i].nome + '</option>';
    }
  }
  $select_fonte.empty();
  $select_fonte.html(string);
}

function criaOpcaoItens(dia) {

  var $select_item_add = $('#select_item_add' + dia);
  var $select_tipo_item = $('#select_tipo_item' + dia).val();
  var $select_fonte = $('#select_fonte' + dia).val();

  var $idPreparacao = 0;
  $select_item_add.empty();
  var string = '<option value="0">Selecione uma opção</option>';
  if($select_tipo_item == 1){
    if (itens){
      if($select_fonte > 0){
        for(i in itens){
          for(j in fontes){
            if(itens[i].id_fonte == $select_fonte && itens[i].id_fonte == fontes[j].id){
              string += '<option value= "' + itens[i].id + '">' + itens[i].nome + '</option>';
            }
          }
        }
      }else{
        for(i in itens){
          for(j in fontes){
            if(itens[i].id_fonte == fontes[j].id)
            string += '<option value= "' + itens[i].id + '">' + itens[i].nome + '</option>';
          }
        }
      }
    }

  }else if ($select_tipo_item == 2) {
    if (view_preparacoes){
      for(i in view_preparacoes){
        if(view_preparacoes[i].id_preparacao != $idPreparacao){
          string += '<option value= "' + view_preparacoes[i].id_preparacao + '">' + view_preparacoes[i].nome_preparacao + '</option>';
          $idPreparacao = view_preparacoes[i].id_preparacao;
        }
      }
    }

  }else {
    //
  }

  $select_item_add.html(string);
  $select_item_add.selectpicker('refresh');

}

function criaOpcaoItensEdit() {

  var $select_item_add = $('#select_item_add_edit');
  var $select_tipo_item = $('#select_tipo_item_edit').val();
  var $select_fonte = $('#select_fonte_edit').val();

  var $idPreparacao = 0;
  $select_item_add.empty();
  var string = '<option value="0">Selecione uma opção</option>';
  if($select_tipo_item == 1){
    if (itens){
      if($select_fonte > 0){
        for(i in itens){
          for(j in fontes){
            if(itens[i].id_fonte == $select_fonte && itens[i].id_fonte == fontes[j].id){
              string += '<option value= "' + itens[i].id + '">' + itens[i].nome + '</option>';
            }
          }
        }
      }else{
        for(i in itens){
          for(j in fontes){
            if(itens[i].id_fonte == fontes[j].id)
            string += '<option value= "' + itens[i].id + '">' + itens[i].nome + '</option>';
          }
        }
      }
    }

  }else if ($select_tipo_item == 2) {
    if (view_preparacoes){
      for(i in view_preparacoes){
        if(view_preparacoes[i].id_preparacao != $idPreparacao){
          string += '<option value= "' + view_preparacoes[i].id_preparacao + '">' + view_preparacoes[i].nome_preparacao + '</option>';
          $idPreparacao = view_preparacoes[i].id_preparacao;
        }
      }
    }

  }else {
    mostraDialogo('<strong>Por favor, primeiro cadastre um Alimento.</strong>', 'info', 4000, 'info');
  }

  $select_item_add.html(string);
  $select_item_add.selectpicker('refresh');

}


//Verifica se o dia atual é válido. (Domingo é inválido)
if(d.getDay()>0){
  removeClasse('#li_' + d.getDay(),'disabled');
  adicionaClasse('#li_' + d.getDay(),'active');
  adicionaAtributo('#a_' + d.getDay(),'data-toggle','tab');
  adicionaClasse('#tab_' + d.getDay(),'active');
}else{
  document.getElementById("data_invalida").style.display = "inline";
}

//Volta o cardápio à data antiga, caso o usuário tenha escolhido uma nova data inválida
function rollbackDias(d,d2){
  for(var i=1;i<=6;i++){
    if(i == d.getDay() ){
      removeClasse('#li_' + i,'disabled');
      adicionaClasse('#li_' + i,'active');
      adicionaAtributo('#a_' + i,'data-toggle','tab');
      adicionaClasse('#tab_' + i,'active');
    }else if (i > d.getDay() && i <= d2.getDay()) {
      removeClasse('#li_' + i,'disabled');
      removeClasse('#li_' + i,'active');
      adicionaAtributo('#a_' + i,'data-toggle','tab');
      removeClasse('#tab_' + i,'active');
    }else{
      removeAtributo('#a_' + i,'data-toggle');
      removeClasse('#li_' + i,'active');
      removeClasse('#tab_' + i,'active');
      adicionaClasse('#li_' + i,'disabled');
    }
  }
}

/*Valida a data informada pelo usuário. E habilita/desabilita os dias no cardápio.
- Não é permitido escolher dias entre duas semanas distintas.
- Não é permitido escolher mais de uma semana.
- Não é permitido escolher Domingos.
*/

function validaData(){
  var hoje = new Date();
  separa = ($('#reservation').val()).split(" - ");
  data = moment(separa[0], "DD/MM/YYYY");
  data2 = moment(separa[1], "DD/MM/YYYY");
  arr = data.format("YYYY-MM-DD");
  arr2 = data2.format("YYYY-MM-DD");
  partes = arr.match(/(\d+)/g);
  partes2 = arr2.match(/(\d+)/g);
  d = new Date(partes[0], partes[1]-1, partes[2],new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds());
  d2 = new Date(partes2[0], partes2[1]-1, partes2[2]);

  numero_dias = Math.abs(d2.getDay()-d.getDay()) + 1;

  if(d.getDay() == d2.getDay() && d.getMonth() == d2.getMonth() && d.getDay() > 0  &&
  d >= hoje && (parseInt(partes2[2]) - parseInt(partes[2]) <= 5)){
    for(var i=1;i<=6;i++){
      criaOpcaoRefeicoes(i);
      if(i == d.getDay()){
        removeClasse('#li_' + i,'disabled');
        adicionaClasse('#li_' + i,'active');
        adicionaAtributo('#a_' + i,'data-toggle','tab');
        adicionaClasse('#tab_' + i,'active');
      }else{
        if($('var[class="idItem' + i + '"]').html() > 0){
          notificacao_alerta('Exclua os itens do cardápio de  <b>' + semana[i] + '</b>.');
          $('#reservation').data('daterangepicker').setStartDate(oldDatai);
          $('#reservation').data('daterangepicker').setEndDate(oldDataf);
          arr = datai.format("YYYY-MM-DD");
          arr2 = dataf.format("YYYY-MM-DD");
          partes = arr.match(/(\d+)/g);
          partes2 = arr2.match(/(\d+)/g);
          d = new Date(partes[0], partes[1]-1, partes[2],new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds());
          d2 = new Date(partes2[0], partes2[1]-1, partes2[2]);
          rollbackDias(d,d2);
        }else{
          removeAtributo('#a_' + i,'data-toggle');
          removeClasse('#li_' + i,'active');
          removeClasse('#tab_' + i,'active');
          adicionaClasse('#li_' + i,'disabled');
        }
      }
    }

    oldData = ($('#reservation').val()).split(" - ");
    datai = moment(oldData[0], "DD/MM/YYYY");
    dataf = moment(oldData[1], "DD/MM/YYYY");
    oldDatai = moment(datai.format("YYYY-MM-DD"),"YYYY-MM-DD");
    oldDataf = moment(dataf.format("YYYY-MM-DD"),"YYYY-MM-DD");
    return false;

  }else if ((d.getDay() < d2.getDay() && d.getMonth() == d2.getMonth())  &&
  d.getDay() > 0 && (d >= hoje) && (parseInt(partes2[2]) - parseInt(partes[2]) <= 5)) {
    for(var i=1;i<=6;i++){
      criaOpcaoRefeicoes(i);
      if(i == d.getDay() ){
        removeClasse('#li_' + i,'disabled');
        adicionaClasse('#li_' + i,'active');
        adicionaAtributo('#a_' + i,'data-toggle','tab');
        adicionaClasse('#tab_' + i,'active');
      }else if (i > d.getDay() && i <= d2.getDay()) {
        removeClasse('#li_' + i,'disabled');
        removeClasse('#li_' + i,'active');
        adicionaAtributo('#a_' + i,'data-toggle','tab');
        removeClasse('#tab_' + i,'active');
      }else{
        if($('var[class="idItem' + i + '"]').html() > 0){
          notificacao_alerta('Exclua os itens do cardápio de <b>' + semana[i] + '</b>.');
          $('#reservation').data('daterangepicker').setStartDate(oldDatai);
          $('#reservation').data('daterangepicker').setEndDate(oldDataf);
          arr = datai.format("YYYY-MM-DD");
          arr2 = dataf.format("YYYY-MM-DD");
          partes = arr.match(/(\d+)/g);
          partes2 = arr2.match(/(\d+)/g);
          d = new Date(partes[0], partes[1]-1, partes[2],new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds());
          d2 = new Date(partes2[0], partes2[1]-1, partes2[2]);
          rollbackDias(d,d2);
        }else{
          removeAtributo('#a_' + i,'data-toggle');
          removeClasse('#li_' + i,'active');
          removeClasse('#tab_' + i,'active');
          adicionaClasse('#li_' + i,'disabled');

        }
      }
    }
    oldData = ($('#reservation').val()).split(" - ");
    datai = moment(oldData[0], "DD/MM/YYYY");
    dataf = moment(oldData[1], "DD/MM/YYYY");
    oldDatai = moment(datai.format("YYYY-MM-DD"),"YYYY-MM-DD");
    oldDataf = moment(dataf.format("YYYY-MM-DD"),"YYYY-MM-DD");

    return false;
  }else if ((d.getDay() < d2.getDay() && d.getMonth() < d2.getMonth())  &&  d.getDay() > 0
  && (d >= hoje) && (((diasNoMes(d.getMonth()+1, d.getYear())) - parseInt(partes[2]) + parseInt(partes2[2]))) <= 5) {
    for(var i=1;i<=6;i++){
      criaOpcaoRefeicoes(i);
      if(i == d.getDay() ){
        removeClasse('#li_' + i,'disabled');
        adicionaClasse('#li_' + i,'active');
        adicionaAtributo('#a_' + i,'data-toggle','tab');
        adicionaClasse('#tab_' + i,'active');
      }else if (i > d.getDay() && i <= d2.getDay()) {
        removeClasse('#li_' + i,'disabled');
        removeClasse('#li_' + i,'active');
        adicionaAtributo('#a_' + i,'data-toggle','tab');
        removeClasse('#tab_' + i,'active');
      }else{
        if($('var[class="idItem' + i + '"]').html() > 0){
          notificacao_alerta('Exclua os itens do cardápio de <b>' + semana[i] + '</b>.');
          $('#reservation').data('daterangepicker').setStartDate(oldDatai);
          $('#reservation').data('daterangepicker').setEndDate(oldDataf);
          arr = datai.format("YYYY-MM-DD");
          arr2 = dataf.format("YYYY-MM-DD");
          partes = arr.match(/(\d+)/g);
          partes2 = arr2.match(/(\d+)/g);
          d = new Date(partes[0], partes[1]-1, partes[2],new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds());
          d2 = new Date(partes2[0], partes2[1]-1, partes2[2]);
          rollbackDias(d,d2);
        }else{
          removeAtributo('#a_' + i,'data-toggle');
          removeClasse('#li_' + i,'active');
          removeClasse('#tab_' + i,'active');
          adicionaClasse('#li_' + i,'disabled');
        }
      }
    }
    oldData = ($('#reservation').val()).split(" - ");
    datai = moment(oldData[0], "DD/MM/YYYY");
    dataf = moment(oldData[1], "DD/MM/YYYY");
    oldDatai = moment(datai.format("YYYY-MM-DD"),"YYYY-MM-DD");
    oldDataf = moment(dataf.format("YYYY-MM-DD"),"YYYY-MM-DD");
    return false;

  }else{
    notificacao_alerta('Data(s)  <b>Inválida(s)</b>.');
    $('#reservation').data('daterangepicker').setStartDate(oldDatai);
    $('#reservation').data('daterangepicker').setEndDate(oldDataf);
    separa = ($('#reservation').val()).split(" - ");
    data = moment(separa[0], "DD/MM/YYYY");
    data2 = moment(separa[1], "DD/MM/YYYY");
    arr = data.format("YYYY-MM-DD");
    arr2 = data2.format("YYYY-MM-DD");
    partes = arr.match(/(\d+)/g);
    partes2 = arr2.match(/(\d+)/g);
    d = new Date(partes[0], partes[1]-1, partes[2],new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds());
    d2 = new Date(partes2[0], partes2[1]-1, partes2[2]);
    semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    numero_dias = Math.abs(d2.getDay()-d.getDay()) + 1;

    rollbackDias(d,d2);
    return true;
  }
}

$('input[name="reservation"]').on('apply.daterangepicker', function(ev, picker) {
  var error = validaData();
  if(!error){
    document.getElementById("data_invalida").style.display = "none";
  }
});

function criaOpcaoMedidas2(dia) {
  var $select_medida = $('#select_medida' + dia);
  var $select_item =  $('#select_item_add' + dia).val();
  var $select_tipo_item = $('#select_tipo_item' + dia);

  $select_medida.empty();
  var string = '<option value="0">Selecione uma opção</option>';

  if (typeof itens !== "undefined" && itens.hasOwnProperty($select_item) != null){
    string += '<option value="1">g</option>';
  }

  if($select_item > 0){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id_item == $select_item){
        string += '<option value="' + medidas_itens[i].id + '">' + medidas_itens[i].nome_medida + '</option>';
      }
    }
  }

  $select_medida.empty();
  $select_medida.html(string);


  if($select_tipo_item.val() == 2){
    $select_medida.empty();
    $select_medida.html('<option value="1" option:selected>g</option>');
    for (var i in view_preparacoes){
      if($select_item == view_preparacoes[i].id_preparacao){
        $('#p_liquido' + dia).val(view_preparacoes[i].medida_total);
      }
    }
  }
}

function criaOpcaoMedidas2Edit() {
  var $select_medida = $('#select_medida_edit');
  var $select_item =  $('#select_item_add_edit').val();
  var $select_tipo_item = $('#select_tipo_item_edit');

  $select_medida.empty();
  var string = '<option value="0">Selecione uma opção</option>';

  if (typeof itens !== "undefined" && itens.hasOwnProperty($select_item) != null){
    string += '<option value="1">g</option>';
  }

  if($select_item > 0){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id_item == $select_item){
        string += '<option value="' + medidas_itens[i].id + '">' + medidas_itens[i].nome_medida + '</option>';
      }
    }
  }

  $select_medida.empty();
  $select_medida.html(string);


  if($select_tipo_item.val() == 2){
    $select_medida.empty();
    $select_medida.html('<option value="1" option:selected>g</option>');
    for (var i in view_preparacoes){
      if($select_item == view_preparacoes[i].id_preparacao){
        $('#p_liquido_edit').val(view_preparacoes[i].medida_total);
      }
    }
  }

}


function habilitaMedida(dia){
  var $select_item = $('#select_item_add' + dia);
  var $select_tipo_item = $('#select_tipo_item' + dia);

  if($select_item.val() >= 1 && $select_tipo_item.val() == 1){
    removeAtributo('#select_medida' + dia,'disabled');
  }else if($select_item.val() >= 1 && $select_tipo_item.val() == 2){
    removeAtributo('#select_medida' + dia,'disabled');
    removeAtributo('#p_liquido' + dia,'disabled');
  }else{
    adicionaAtributo('#select_medida' + dia,'disabled','');
    adicionaAtributo('#p_liquido' + dia,'disabled','');
    $('#select_medida' + dia).empty();
    $('#select_medida' + dia).html('<option value="0">Selecione uma opção</option>');
  }

}

function habilitaMedidaEdit(){
  var $select_item = $('#select_item_add_edit');
  var $select_tipo_item = $('#select_tipo_item_edit');

  if($select_item.val() >= 1 && $select_tipo_item.val() == 1){
    removeAtributo('#select_medida_edit','disabled');
  }else if($select_item.val() >= 1 && $select_tipo_item.val() == 2){
    removeAtributo('#select_medida_edit','disabled');
    removeAtributo('#p_liquido_edit','disabled');
  }else{
    adicionaAtributo('#select_medida_edit','disabled','');
    adicionaAtributo('#p_liquido_edit','disabled','');
    $('#select_medida_edit').empty();
    $('#select_medida_edit').html('<option value="0">Selecione uma opção</option>');
  }

}

//"Zera" o cardápio caso o usuário tenha mudado o destino.
function desabilitaCardapio(){
  $("#import_table tbody tr").remove();
  $('#import_table').append('<tr><td colspan= "2">Não há itens para exibir.</td></tr>');

  limparCamposItem(1);
  limparCamposItem(2);
  limparCamposItem(3);
  limparCamposItem(4);
  limparCamposItem(5);
  limparCamposItem(6);

  $('#fieldset_1').prop('disabled', true);
  $('#fieldset_2').prop('disabled', true);
  $('#fieldset_3').prop('disabled', true);
  $('#fieldset_4').prop('disabled', true);
  $('#fieldset_5').prop('disabled', true);
  $('#fieldset_6').prop('disabled', true);

  $('#select_tipo_refeicao1').empty();
  $('#select_tipo_refeicao2').empty();
  $('#select_tipo_refeicao3').empty();
  $('#select_tipo_refeicao4').empty();
  $('#select_tipo_refeicao5').empty();
  $('#select_tipo_refeicao6').empty();

  $('#select_tipo_refeicao1').html('<option value="0">Selecione uma opção</option>');
  $('#select_tipo_refeicao2').html('<option value="0">Selecione uma opção</option>');
  $('#select_tipo_refeicao3').html('<option value="0">Selecione uma opção</option>');
  $('#select_tipo_refeicao4').html('<option value="0">Selecione uma opção</option>');
  $('#select_tipo_refeicao5').html('<option value="0">Selecione uma opção</option>');
  $('#select_tipo_refeicao6').html('<option value="0">Selecione uma opção</option>');

  $('#select_tipo_refeicao1').val(0);
  $('#select_tipo_refeicao2').val(0);
  $('#select_tipo_refeicao3').val(0);
  $('#select_tipo_refeicao4').val(0);
  $('#select_tipo_refeicao5').val(0);
  $('#select_tipo_refeicao6').val(0);


  recarregaTudo(1);
  recarregaTudo(2);
  recarregaTudo(3);
  recarregaTudo(4);
  recarregaTudo(5);
  recarregaTudo(6);

  $('#calorias').val(parseFloat(0).toFixed(3));
  $('#carboidratos').val(parseFloat(0).toFixed(3));
  $('#proteinas').val(parseFloat(0).toFixed(3));
  $('#lipidios').val(parseFloat(0).toFixed(3));
  $('#fibras').val(parseFloat(0).toFixed(3));
  $('#vitamina_a').val(parseFloat(0).toFixed(3));
  $('#vitamina_c').val(parseFloat(0).toFixed(3));
  $('#vitamina_d').val(parseFloat(0).toFixed(3));
  $('#vitamina_e').val(parseFloat(0).toFixed(3));
  $('#vitamina_b1').val(parseFloat(0).toFixed(3));
  $('#vitamina_b2').val(parseFloat(0).toFixed(3));
  $('#vitamina_b6').val(parseFloat(0).toFixed(3));
  $('#vitamina_b12').val(parseFloat(0).toFixed(3));
  $('#niacina').val(parseFloat(0).toFixed(3));
  $('#folico').val(parseFloat(0).toFixed(3));
  $('#pantotenico').val(parseFloat(0).toFixed(3));
  $('#calcio').val(parseFloat(0).toFixed(3));
  $('#ferro').val(parseFloat(0).toFixed(3));
  $('#magnesio').val(parseFloat(0).toFixed(3));
  $('#potassio').val(parseFloat(0).toFixed(3));
  $('#selenio').val(parseFloat(0).toFixed(3));
  $('#fosforo').val(parseFloat(0).toFixed(3));
  $('#iodo').val(parseFloat(0).toFixed(3));
  $('#cobre').val(parseFloat(0).toFixed(3));
  $('#zinco').val(parseFloat(0).toFixed(3));
  $('#sodio').val(parseFloat(0).toFixed(3));
  $('#gordura_total').val(parseFloat(0).toFixed(3));
  $('#colesterol').val(parseFloat(0).toFixed(3));
  $('#gordura_saturada').val(parseFloat(0).toFixed(3));
  $('#gordura_poliinsaturada').val(parseFloat(0).toFixed(3));
  $('#gordura_monoinsaturada').val(parseFloat(0).toFixed(3));

  $("#table_cardapio tbody tr").remove();

  $('#nome_referencia').empty();
  $('#descricao_referencia').empty();
  $('#categoria_referencia').empty();
  $('#idade_referencia').empty();
  $('#nome_referencia').html('');
  $('#descricao_referencia').html('');
  $('#categoria_referencia').html('');
  $('#idade_referencia').html('');
  $('#calorias_ref').val(parseFloat(0).toFixed(3));
  $('#carboidratos_ref').val(parseFloat(0).toFixed(3));
  $('#proteinas_ref').val(parseFloat(0).toFixed(3));
  $('#lipidios_ref').val(parseFloat(0).toFixed(3));
  $('#fibras_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_a_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_c_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_e_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_d_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_b1_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_b2_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_b6_ref').val(parseFloat(0).toFixed(3));
  $('#vitamina_b12_ref').val(parseFloat(0).toFixed(3));
  $('#niacina_ref').val(parseFloat(0).toFixed(3));
  $('#folico_ref').val(parseFloat(0).toFixed(3));
  $('#pantotenico_ref').val(parseFloat(0).toFixed(3));
  $('#calcio_ref').val(parseFloat(0).toFixed(3));
  $('#ferro_ref').val(parseFloat(0).toFixed(3));
  $('#magnesio_ref').val(parseFloat(0).toFixed(3));
  $('#potassio_ref').val(parseFloat(0).toFixed(3));
  $('#selenio_ref').val(parseFloat(0).toFixed(3));
  $('#fosforo_ref').val(parseFloat(0).toFixed(3));
  $('#iodo_ref').val(parseFloat(0).toFixed(3));
  $('#cobre_ref').val(parseFloat(0).toFixed(3));
  $('#zinco_ref').val(parseFloat(0).toFixed(3));
  $('#sodio_ref').val(parseFloat(0).toFixed(3));
  $('#gordura_total_ref').val(parseFloat(0).toFixed(3));
  $('#colesterol_ref').val(parseFloat(0).toFixed(3));
  $('#gordura_saturada_ref').val(parseFloat(0).toFixed(3));
  $('#gordura_poliinsaturada_ref').val(parseFloat(0).toFixed(3));
  $('#gordura_monoinsaturada_ref').val(parseFloat(0).toFixed(3));

  energia = 0, carboidratos = 0, proteinas = 0, lipidios = 0, fibras = 0, vitamina_a = 0,
  vitamina_c = 0, vitamina_d = 0, vitamina_e = 0, vitamina_b1 = 0, vitamina_b2 = 0,
  vitamina_b6 = 0, vitamina_b12 = 0, niacina = 0, folico = 0, pantotenico = 0, calcio = 0,
  ferro = 0, magnesio = 0, potassio = 0, selenio = 0, fosforo = 0, iodo = 0, cobre = 0,
  zinco = 0, sodio = 0, gordura_total = 0, colesterol = 0, gordura_saturada = 0,
  gordura_poliinsaturada = 0, gordura_monoinsaturada = 0, valor = 0;

  atualizaTabelaReferencia(energia/numero_dias,0,'#span_p_calorias');
  atualizaTabelaReferencia(carboidratos/numero_dias,0,'#span_p_carboidratos');
  atualizaTabelaReferencia(proteinas/numero_dias,0,'#span_p_proteinas');
  atualizaTabelaReferencia(lipidios/numero_dias,0,'#span_p_lipidios');
  atualizaTabelaReferencia(fibras/numero_dias,0,'#span_p_fibras');
  atualizaTabelaReferencia(vitamina_a/numero_dias,0,'#span_p_vit_a');
  atualizaTabelaReferencia(vitamina_c/numero_dias,0,'#span_p_vit_c');
  atualizaTabelaReferencia(vitamina_d/numero_dias,0,'#span_p_vit_d');
  atualizaTabelaReferencia(vitamina_e/numero_dias,0,'#span_p_vit_e');
  atualizaTabelaReferencia(vitamina_b1/numero_dias,0,'#span_p_vit_b1');
  atualizaTabelaReferencia(vitamina_b2/numero_dias,0,'#span_p_vit_b2');
  atualizaTabelaReferencia(vitamina_b6/numero_dias,0,'#span_p_vit_b6');
  atualizaTabelaReferencia(vitamina_b12/numero_dias,0,'#span_p_vit_b12');
  atualizaTabelaReferencia(niacina/numero_dias,0,'#span_p_niacina');
  atualizaTabelaReferencia(folico/numero_dias,0,'#span_p_folico');
  atualizaTabelaReferencia(pantotenico/numero_dias,0,'#span_p_pantotenico');
  atualizaTabelaReferencia(calcio/numero_dias,0,'#span_p_calcio');
  atualizaTabelaReferencia(ferro/numero_dias,0,'#span_p_ferro');
  atualizaTabelaReferencia(magnesio/numero_dias,0,'#span_p_magnesio');
  atualizaTabelaReferencia(potassio/numero_dias,0,'#span_p_potassio');
  atualizaTabelaReferencia(selenio/numero_dias,0,'#span_p_selenio');
  atualizaTabelaReferencia(fosforo/numero_dias,0,'#span_p_fosforo');
  atualizaTabelaReferencia(iodo/numero_dias,0,'#span_p_iodo');
  atualizaTabelaReferencia(cobre/numero_dias,0,'#span_p_cobre');
  atualizaTabelaReferencia(zinco/numero_dias,0,'#span_p_zinco');
  atualizaTabelaReferencia(sodio/numero_dias,0,'#span_p_sodio');
  atualizaTabelaReferencia(gordura_total/numero_dias,0,'#span_p_g_total');
  atualizaTabelaReferencia(colesterol/numero_dias,0,'#span_p_colesterol');
  atualizaTabelaReferencia(gordura_saturada/numero_dias,0,'#span_p_g_saturada');
  atualizaTabelaReferencia(gordura_poliinsaturada/numero_dias,0,'#span_p_g_poliinsaturada');
  atualizaTabelaReferencia(gordura_monoinsaturada/numero_dias,0,'#span_p_g_monoinsaturada');

  for(var i = 1; i <= 6; i++){
    $('#listaItens' + i).empty();
    $('#listaVazia' +i).show();
  }
  listaVazia1 = true;
  listaVazia2 = true;
  listaVazia3 = true;
  listaVazia4 = true;
  listaVazia5 = true;
  listaVazia6 = true;

  listaTamanho1 = 0;
  listaTamanho2 = 0;
  listaTamanho3 = 0;
  listaTamanho4 = 0;
  listaTamanho5 = 0;
  listaTamanho6 = 0;
}

$('#select_escola').change(function () {
  var $id_escola = $('#select_escola').val();
  if ($id_escola > 0){
    criaOpcaoModalidades($id_escola);
  }else{
    $('#select_modalidade').empty();
    $('#select_modalidade').html('<option value="0">Selecione uma opção</option>')
    desabilitaCardapio();
  }

});

$('#select_item_add1').change(function () {
  criaOpcaoMedidas2(1);
  habilitaMedida(1);
});

$('#select_item_add2').change(function () {
  criaOpcaoMedidas2(2);
  habilitaMedida(2);
});

$('#select_item_add3').change(function () {
  criaOpcaoMedidas2(3);
  habilitaMedida(3);
});

$('#select_item_add4').change(function () {
  criaOpcaoMedidas2(4);
  habilitaMedida(4);
});

$('#select_item_add5').change(function () {
  criaOpcaoMedidas2(5);
  habilitaMedida(5);
});

$('#select_item_add6').change(function () {
  criaOpcaoMedidas2(6);
  habilitaMedida(6);
});


$('#select_medida1').change(function () {

  var $formMedidaSelected = $('#select_medida1 option:selected');
  if($formMedidaSelected.val() == 1){
    $('#p_liquido1').prop('disabled', false);
  }else if($formMedidaSelected.val() > 1){

    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#p_liquido1').val(parseFloat(medidas_itens[i].medida).toFixed(3));
      }
    }
  }else {
    $('#p_liquido1').empty();
    $('#p_liquido1').prop('disabled', true);
  }
});

$('#select_medida2').change(function () {
  var $formMedidaSelected = $('#select_medida2 option:selected');
  if($formMedidaSelected.val() == 1){
    $('#p_liquido2').prop('disabled', false);
  }else if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#p_liquido2').val(parseFloat(medidas_itens[i].medida).toFixed(3));
      }
    }

  }else {
    $('#p_liquido2').empty();
    $('#p_liquido2').prop('disabled', true);
  }
});

$('#select_medida3').change(function () {
  var $formMedidaSelected = $('#select_medida3 option:selected');
  if($formMedidaSelected.val() == 1){
    $('#p_liquido3').prop('disabled', false);
  }else if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#p_liquido3').val(parseFloat(medidas_itens[i].medida).toFixed(3));
      }
    }

  }else {
    $('#p_liquido3').empty();
    $('#p_liquido3').prop('disabled', true);
  }
});

$('#select_medida4').change(function () {
  var $formMedidaSelected = $('#select_medida4 option:selected');
  if($formMedidaSelected.val() == 1){
    $('#p_liquido4').prop('disabled', false);
  }else if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#p_liquido4').val(parseFloat(medidas_itens[i].medida).toFixed(3));
      }
    }
  }else {
    $('#p_liquido4').empty();
    $('#p_liquido4').prop('disabled', true);
  }
});

$('#select_medida5').change(function () {
  var $formMedidaSelected = $('#select_medida5 option:selected');
  if($formMedidaSelected.val() == 1){
    $('#p_liquido5').prop('disabled', false);
  }else if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#p_liquido5').val(parseFloat(medidas_itens[i].medida).toFixed(3));
      }
    }

  }else {
    $('#p_liquido5').empty();
    $('#p_liquido5').prop('disabled', true);
  }
});

$('#select_medida6').change(function () {
  var $formMedidaSelected = $('#select_medida6 option:selected');
  if($formMedidaSelected.val() == 1){
    $('#p_liquido6').prop('disabled', false);
  }else if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#p_liquido6').val(parseFloat(medidas_itens[i].medida).toFixed(3));
      }
    }

  }else {
    $('#p_liquido6').empty();
    $('#p_liquido6').prop('disabled', true);
  }
});

$('#select_medida_edit').change(function () {

  var $formMedidaSelected = $('#select_medida_edit option:selected');
  if($formMedidaSelected.val() == 1){
    $('#p_liquido_edit').prop('disabled', false);
  }else if($formMedidaSelected.val() > 1){

    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#p_liquido_edit').val(parseFloat(medidas_itens[i].medida).toFixed(3));
      }
    }
  }else {
    $('#p_liquido_edit').empty();
    $('#p_liquido_edit').prop('disabled', true);
  }
});

$('#select_tipo_refeicao1').change(function () {
  if($('#select_tipo_refeicao1 option:selected').val() > 0){
    criaOpcaoTipoItens(1);
    $('#select_item_add1').empty();
    $('#select_item_add1').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add1').selectpicker('refresh');
  }else{
    $('#select_tipo_item1').empty();
    $('#select_fonte1').empty();
    $('#select_item_add1').empty();
    $('#select_tipo_item1').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte1').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add1').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add1').selectpicker('refresh');
  }
});

$('#select_tipo_refeicao2').change(function () {
  if($('#select_tipo_refeicao2 option:selected').val() > 0){
    criaOpcaoTipoItens(2);
    $('#select_item_add2').empty();
    $('#select_item_add2').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add2').selectpicker('refresh');
  }else{
    $('#select_fonte2').empty();
    $('#select_item_add2').empty();
    $('#select_tipo_item2').empty();
    $('#select_tipo_item2').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte2').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add2').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add2').selectpicker('refresh');
  }
});

$('#select_tipo_refeicao3').change(function () {
  if($('#select_tipo_refeicao3 option:selected').val() > 0){
    criaOpcaoTipoItens(3);
    $('#select_item_add3').empty();
    $('#select_item_add3').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add3').selectpicker('refresh');
  }else{
    $('#select_fonte3').empty();
    $('#select_item_add3').empty();
    $('#select_tipo_item3').empty();
    $('#select_tipo_item3').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte3').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add3').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add3').selectpicker('refresh');
  };
});

$('#select_tipo_refeicao4').change(function () {
  if($('#select_tipo_refeicao4 option:selected').val() > 0){
    criaOpcaoTipoItens(4);
    $('#select_item_add4').empty();
    $('#select_item_add4').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add4').selectpicker('refresh');
  }else{
    $('#select_fonte4').empty();
    $('#select_item_add4').empty();
    $('#select_tipo_item4').empty();
    $('#select_tipo_item4').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte4').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add4').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add4').selectpicker('refresh');
  }

});

$('#select_tipo_refeicao5').change(function () {
  if($('#select_tipo_refeicao5 option:selected').val() > 0){
    criaOpcaoTipoItens(5);
    $('#select_item_add5').empty();
    $('#select_item_add5').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add5').selectpicker('refresh');
  }else{
    $('#select_fonte5').empty();
    $('#select_item_add5').empty();
    $('#select_tipo_item5').empty();
    $('#select_tipo_item5').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte5').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add5').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add5').selectpicker('refresh');
  };
});

$('#select_tipo_refeicao6').change(function () {
  if($('#select_tipo_refeicao6 option:selected').val() > 0){
    //criaOpcaoFonteItens(6);
    //criaOpcaoItens(6);
    criaOpcaoTipoItens(6);
    $('#select_item_add6').empty();
    $('#select_item_add6').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add6').selectpicker('refresh');
  }else{
    $('#select_fonte6').empty();
    $('#select_item_add6').empty();
    $('#select_tipo_item6').empty();
    $('#select_tipo_item6').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte6').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add6').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add6').selectpicker('refresh');
  }
});

$('#select_tipo_item1').change(function () {
  criaOpcaoFonteItens(1);
  criaOpcaoItens(1);
  if($('#select_tipo_item1').val() == 1){
    $('#select_fonte1').prop('disabled',false);
  }else if ($('#select_tipo_item1').val() == 2) {
    $('#select_fonte1').prop('disabled',true);
  }else{
    $('#select_fonte1').empty();
    $('#select_fonte1').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte1').prop('disabled',false);
    $('#select_item_add1').empty();
    $('#select_item_add1').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add1').selectpicker('refresh');
  }
});

$('#select_tipo_item2').change(function () {
  criaOpcaoFonteItens(2);
  criaOpcaoItens(2);
  if($('#select_tipo_item2').val() == 1){
    $('#select_fonte2').prop('disabled',false);
  }else if ($('#select_tipo_item2').val() == 2) {
    $('#select_fonte2').prop('disabled',true);
  }else{
    $('#select_fonte2').empty();
    $('#select_fonte2').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte2').prop('disabled',false);
    $('#select_item_add2').empty();
    $('#select_item_add2').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add2').selectpicker('refresh');
  }
});

$('#select_tipo_item3').change(function () {
  criaOpcaoFonteItens(3);
  criaOpcaoItens(3);
  if($('#select_tipo_item3').val() == 1){
    $('#select_fonte3').prop('disabled',false);
  }else if ($('#select_tipo_item3').val() == 2) {
    $('#select_fonte3').prop('disabled',true);
  }else{
    $('#select_fonte3').empty();
    $('#select_fonte3').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte3').prop('disabled',false);
    $('#select_item_add3').empty();
    $('#select_item_add3').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add3').selectpicker('refresh');
  }
});

$('#select_tipo_item4').change(function () {
  criaOpcaoFonteItens(4);
  criaOpcaoItens(4);
  if($('#select_tipo_item4').val() == 1){
    $('#select_fonte4').prop('disabled',false);
  }else if ($('#select_tipo_item4').val() == 2) {
    $('#select_fonte4').prop('disabled',true);
  }else{
    $('#select_fonte4').empty();
    $('#select_fonte4').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte4').prop('disabled',false);
    $('#select_item_add4').empty();
    $('#select_item_add4').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add4').selectpicker('refresh');
  }
});

$('#select_tipo_item5').change(function () {
  criaOpcaoFonteItens(5);
  criaOpcaoItens(5);
  if($('#select_tipo_item5').val() == 1){
    $('#select_fonte5').prop('disabled',false);
  }else if ($('#select_tipo_item5').val() == 2) {
    $('#select_fonte5').prop('disabled',true);
  }else{
    $('#select_fonte5').empty();
    $('#select_fonte5').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte5').prop('disabled',false);
    $('#select_item_add5').empty();
    $('#select_item_add5').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add5').selectpicker('refresh');
  }
});

$('#select_tipo_item6').change(function () {
  criaOpcaoFonteItens(6);
  criaOpcaoItens(6);
  if($('#select_tipo_item6').val() == 1){
    $('#select_fonte6').prop('disabled',false);
  }else if ($('#select_tipo_item6').val() == 2) {
    $('#select_fonte6').prop('disabled',true);
  }else{
    $('#select_fonte6').empty();
    $('#select_fonte6').html('<option value="0">Selecione uma opção</option>');
    $('#select_fonte6').prop('disabled',false);
    $('#select_item_add6').empty();
    $('#select_item_add6').html('<option value="0">Selecione uma opção</option>');
    $('#select_item_add6').selectpicker('refresh');
  }
});

$('#p_liquido1').change(function () {
  var $formMedidaSelected = $('#select_medida1 option:selected');
  if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#select_medida1').val(medidas_itens[i].unidade_medida);
      }
    }

  }
});

$('#p_liquido_edit').change(function () {
  var $formMedidaSelected = $('#select_medida_edit option:selected');
  if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#select_medida_edit').val(medidas_itens[i].unidade_medida);
      }
    }

  }
});

$('#p_liquido2').change(function () {
  var $formMedidaSelected = $('#select_medida2 option:selected');
  if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#select_medida2').val(medidas_itens[i].unidade_medida);
      }
    }

  }
});

$('#p_liquido3').change(function () {
  var $formMedidaSelected = $('#select_medida3 option:selected');
  if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#select_medida3').val(medidas_itens[i].unidade_medida);
      }
    }

  }
});

$('#p_liquido4').change(function () {
  var $formMedidaSelected = $('#select_medida4 option:selected');
  if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#select_medida4').val(medidas_itens[i].unidade_medida);
      }
    }

  }
});

$('#p_liquido5').change(function () {
  var $formMedidaSelected = $('#select_medida5 option:selected');
  if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#select_medida5').val(medidas_itens[i].unidade_medida);
      }
    }

  }
});

$('#p_liquido6').change(function () {
  var $formMedidaSelected = $('#select_medida6 option:selected');
  if($formMedidaSelected.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedidaSelected.val()){
        $('#select_medida6').val(medidas_itens[i].unidade_medida);
      }
    }

  }
});

$('#concluir_edicao').click(function () {
  if (!validaEditarItem()) {
    if(editando1 == true){
      concluiEditarItem(1,posicaoEditar1);
      editando1 = false;
    }else if (editando2 == true) {
      concluiEditarItem(2,posicaoEditar2);
      editando2 = false;
    }else if (editando3 == true) {
      concluiEditarItem(3,posicaoEditar3);
      editando3 = false;
    }else if (editando4 == true) {
      concluiEditarItem(4,posicaoEditar4);
      editando4 = false;
    }else if (editando5 == true) {
      concluiEditarItem(5,posicaoEditar5);
      editando5 = false;
    }else {
      concluiEditarItem(6,posicaoEditar6);
      editando6 = false;
    }

    notificacao_sucesso('Item <b>editado</b> com sucesso.');
    $('#editar_item').modal('hide');
    recarregaTudo();
  }
});

$('#select_modalidade').change(function () {
  $formModalidadeSelected = $('#select_modalidade option:selected');
  if ($formModalidadeSelected.val() == 0) {
    desabilitaCardapio();
  }else {
    $('#fieldset_1').prop('disabled', false);
    $('#fieldset_2').prop('disabled', false);
    $('#fieldset_3').prop('disabled', false);
    $('#fieldset_4').prop('disabled', false);
    $('#fieldset_5').prop('disabled', false);
    $('#fieldset_6').prop('disabled', false);

    $('#select_item_add1').selectpicker('refresh');
    $('#select_item_add2').selectpicker('refresh');
    $('#select_item_add3').selectpicker('refresh');
    $('#select_item_add4').selectpicker('refresh');
    $('#select_item_add5').selectpicker('refresh');
    $('#select_item_add6').selectpicker('refresh');


    for( var i = 1; i<=6; i++){
      criaOpcaoRefeicoes(i);
    }

    for(var i in modalidades_escola){
      if($formModalidadeSelected.val() == modalidades_escola[i].id){
        for(var j in referencias){
          if(modalidades_escola[i].id_referencia == referencias[j].id){
            referencia_modalidade = referencias[j];
          }
        }

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
  }
});



$('#select_fonte1').change(function () {
  criaOpcaoItens(1);
});

$('#select_fonte2').change(function () {
  criaOpcaoItens(2);
});

$('#select_fonte3').change(function () {
  criaOpcaoItens(3);
});

$('#select_fonte4').change(function () {
  criaOpcaoItens(4);
});

$('#select_fonte5').change(function () {
  criaOpcaoItens(5);
});

$('#select_fonte6').change(function () {
  criaOpcaoItens(6);
});


recarregaTudo(1);
recarregaTudo(2);
recarregaTudo(3);
recarregaTudo(4);
recarregaTudo(5);
recarregaTudo(6);

$('#div_collapsed').on('expanded.boxwidget', function (event) {
  grafico();
})

$('#botaoAdicionar1').click(function () {
  if (!validaAdicionarItem(1)) {
    if (listaVazia1 == true) {
      $('#listaVazia1').hide();
    }
    adicionarItem(1);
    listaVazia1 = false;
    listaTamanho1++;
    listaTamanhoTotal++;
    notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
    limparCamposItem(1);
    ordenaRefeicoes('.listaItem1','#listaItens1');
    recarregaTudo(1);
    adicionaLinhaTabela();
  }
});

$('#botaoAdicionar2').click(function () {
  if (!validaAdicionarItem(2)) {
    if (listaVazia2 == true) {
      $('#listaVazia2').hide();
    }
    adicionarItem(2);
    listaVazia2 = false;
    listaTamanho2++;
    listaTamanhoTotal++;
    notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
    limparCamposItem(2);
    ordenaRefeicoes('.listaItem2','#listaItens2');
    recarregaTudo(2);
    adicionaLinhaTabela();
  }

});

$('#botaoAdicionar3').click(function () {
  if (!validaAdicionarItem(3)) {
    if (listaVazia3 == true) {
      $('#listaVazia3').hide();
    }
    adicionarItem(3);
    listaVazia3 = false;
    listaTamanho3++;
    listaTamanhoTotal++;
    notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
    limparCamposItem(3);
    ordenaRefeicoes('.listaItem3','#listaItens3');
    recarregaTudo(3);
    adicionaLinhaTabela();
  }

});

$('#botaoAdicionar4').click(function () {
  if (!validaAdicionarItem(4)) {
    if (listaVazia4 == true) {
      $('#listaVazia4').hide();
    }
    adicionarItem(4);
    listaVazia4 = false;
    listaTamanho4++;
    listaTamanhoTotal++;
    notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
    limparCamposItem(4);
    ordenaRefeicoes('.listaItem4','#listaItens4');
    recarregaTudo(4);
    adicionaLinhaTabela();
  }

});

$('#botaoAdicionar5').click(function () {
  if (!validaAdicionarItem(5)) {
    if (listaVazia5 == true) {
      $('#listaVazia5').hide();
    }
    adicionarItem(5);
    listaVazia5 = false;
    listaTamanho5++;
    listaTamanhoTotal++;
    notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
    limparCamposItem(5);
    ordenaRefeicoes('.listaItem5','#listaItens5');
    recarregaTudo(5);
    adicionaLinhaTabela();
  }
});

$('#botaoAdicionar6').click(function () {
  if (!validaAdicionarItem(6)) {
    if (listaVazia6 == true) {
      $('#listaVazia6').hide();
    }
    adicionarItem(6);
    listaVazia6 = false;
    listaTamanho6++;
    listaTamanhoTotal++;
    notificacao_sucesso('Item <b>adicionado</b> com sucesso.');
    limparCamposItem(6);
    ordenaRefeicoes('.listaItem6','#listaItens6');
    recarregaTudo(6);
    adicionaLinhaTabela();
  }
});

//Verifica se os cardápios estão com a s listas vazias
function validaListaTotalVazia() {
  var erro = false;
  if(listaTamanhoTotal == 0){
    notificacao_alerta('As listas de Itens do Cardápio estão <b>Vazias</b>.');
    erro = true;
  }
  return erro;
}

//Valida a adição de um item no cardápio
function validaAdicionarItem(dia) {
  var erro = false;
  var $formRefeicaoSelected = $('#select_tipo_refeicao' + dia + ' option:selected');
  var $formTipoItemSelected = $('#select_tipo_item' + dia + ' option:selected');
  var $formFonteSelected = $('#select_fonte' + dia + ' option:selected');
  var $formItemSelected = $('#select_item_add' + dia + ' option:selected');
  var $formMedidaSelected = $('#select_medida' + dia + ' option:selected');
  var $formPerCapta = $('#p_liquido' + dia);
  if ($formRefeicaoSelected.val() <= 0) {
    erro = true;
    notificacao_alerta('Selecine uma <b>Refeição</b>.');
  }else if($formFonteSelected.val() < 0) {
    erro = true;
    notificacao_alerta('Selecine a <b>Fonte do Item</b>.');
  }else if($formMedidaSelected.val() <= 0) {
    erro = true;
    notificacao_alerta('Selecine uma Unidade de Medida para o <b>Item</b>.');
  }else if($formPerCapta.val() == 0) {
    erro = true;
    notificacao_alerta('Insira uma Quantidade Per Capta válida para o <b>Item</b>.');
  }else if($formItemSelected.val() <= 0) {
    erro = true;
    notificacao_alerta('Selecine um <b>Item</b>.');
  }else {
    var $id_item = $('var[class="idItem' + dia + '"]');
    var $id_tipo_item =   $('var[class="idTipoItem' + dia + '"]');
    var $id_tipo_refeicao =   $('var[class="idRefeicao' + dia + '"]');
    for(var i = 0; i < $id_item.length;i++ ){
      if($($id_tipo_item[i]).html() == $formTipoItemSelected.val() && $($id_item[i]).html() == $formItemSelected.val()
      && $($id_tipo_refeicao[i]).html() == $formRefeicaoSelected.val()){
        erro = true;
        notificacao_alerta('<b>Itens iguais</b> estão sendo adicionados.');
        return erro;
      }

    }
  }
  return erro;
}

function validaEditarItem(dia) {
  var erro = false;
  var $formMedidaSelected = $('#select_medida_edit option:selected');
  var $formPerCapta = $('#p_liquido_edit');
  if($formMedidaSelected.val() <= 0) {
    erro = true;
    notificacao_alerta('Selecine uma Unidade de Medida para o <b>Item</b>.');
  }else if($formPerCapta.val() == 0) {
    erro = true;
    notificacao_alerta('Insira uma Quantidade Per Capta válida para o <b>Item</b>.');
  } else {
    //
  }
  return erro;
}

//Adiciona um item na lista do cardápio de acordo com o dia da semana selecionado
function adicionarItem(dia) {
  var horas = '';
  var minutos = '';
  var $formRefeicao = $('#select_tipo_refeicao' + dia + ' option:selected');
  var $formTipoItem = $('#select_tipo_item' + dia + ' option:selected');
  var $formFonte = $('#select_fonte' + dia + ' option:selected');
  var $formItem = $('#select_item_add' + dia + ' option:selected');
  var $formMedida = $('#select_medida' + dia + ' option:selected');
  if($formMedida.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedida.val()){
        $('#select_medida' + dia).val(medidas_itens[i].unidade_medida);
        $formMedida = $('#select_medida' + dia + ' option:selected');
      }
    }

  }
  var $formPC = $('#p_liquido' + dia);
  for(var i in tipo_refeicoes){
    if(tipo_refeicoes[i].id == $formRefeicao.val()){
      horario = (tipo_refeicoes[i].horario).split(":");
      minutos = horario[0] * 60 + horario[1];
    }
  }
  if($formTipoItem.val() == 1){
    for (var i in itens) {
      if (itens.hasOwnProperty(i) != null && itens[i].id == $formItem.val()) {
        energia = parseFloat(energia.toFixed(3)) + parseFloat((itens[i].calorias * $formPC.val()/itens[i].medida_base).toFixed(3));
        carboidratos = parseFloat(carboidratos.toFixed(3)) + parseFloat((itens[i].carboidratos * $formPC.val()/itens[i].medida_base).toFixed(3));
        proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((itens[i].proteinas * $formPC.val()/itens[i].medida_base).toFixed(3));
        lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((itens[i].lipidios * $formPC.val()/itens[i].medida_base).toFixed(3));
        fibras = parseFloat(fibras.toFixed(3)) + parseFloat((itens[i].fibras * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((itens[i].vitamina_a * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((itens[i].vitamina_c* $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((itens[i].vitamina_d * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((itens[i].vitamina_e * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((itens[i].vitamina_b1 * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((itens[i].vitamina_b2 * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((itens[i].vitamina_b6 * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((itens[i].vitamina_b12 * $formPC.val()/itens[i].medida_base).toFixed(3));
        niacina = parseFloat(niacina.toFixed(3)) + parseFloat((itens[i].niacina * $formPC.val()/itens[i].medida_base).toFixed(3));
        folico = parseFloat(folico.toFixed(3)) + parseFloat((itens[i].folico * $formPC.val()/itens[i].medida_base).toFixed(3));
        pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((itens[i].pantotenico * $formPC.val()/itens[i].medida_base).toFixed(3));
        calcio = parseFloat(calcio.toFixed(3)) + parseFloat((itens[i].calcio * $formPC.val()/itens[i].medida_base).toFixed(3));
        ferro = parseFloat(ferro.toFixed(3)) + parseFloat((itens[i].ferro* $formPC.val()/itens[i].medida_base).toFixed(3));
        magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((itens[i].magnesio * $formPC.val()/itens[i].medida_base).toFixed(3));
        potassio = parseFloat(potassio.toFixed(3)) + parseFloat((itens[i].potassio * $formPC.val()/itens[i].medida_base).toFixed(3));
        selenio = parseFloat(selenio.toFixed(3)) + parseFloat((itens[i].selenio * $formPC.val()/itens[i].medida_base).toFixed(3));
        fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((itens[i].fosforo * $formPC.val()/itens[i].medida_base).toFixed(3));
        iodo = parseFloat(iodo.toFixed(3)) + parseFloat((itens[i].iodo * $formPC.val()/itens[i].medida_base).toFixed(3));
        cobre = parseFloat(cobre.toFixed(3)) + parseFloat((itens[i].cobre * $formPC.val()/itens[i].medida_base).toFixed(3));
        zinco = parseFloat(zinco.toFixed(3)) + parseFloat((itens[i].zinco * $formPC.val()/itens[i].medida_base).toFixed(3));
        sodio = parseFloat(sodio.toFixed(3)) + parseFloat((itens[i].sodio * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((itens[i].gordura_total * $formPC.val()/itens[i].medida_base).toFixed(3));
        colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((itens[i].colesterol * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((itens[i].gordura_saturada * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_poliinsaturada * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_monoinsaturada * $formPC.val()/itens[i].medida_base).toFixed(3));
        valor = parseFloat(valor.toFixed(2)) + parseFloat((itens[i].valor * $formPC.val()/itens[i].medida_base).toFixed(2));
      }
    }
  }

  var energia_aux = 0, carboidratos_aux = 0, proteinas_aux = 0, lipidios_aux = 0, fibras_aux = 0, vitamina_a_aux = 0,
  vitamina_c_aux = 0, vitamina_d_aux = 0, vitamina_e_aux = 0, vitamina_b1_aux = 0, vitamina_b2_aux = 0,
  vitamina_b6_aux = 0, vitamina_b12_aux = 0, niacina_aux = 0, folico_aux = 0, pantotenico_aux = 0, calcio_aux = 0,
  ferro_aux = 0, magnesio_aux = 0, potassio_aux = 0, selenio_aux = 0, fosforo_aux = 0, iodo_aux = 0, cobre_aux = 0,
  zinco_aux = 0, sodio_aux = 0, gordura_total_aux = 0, colesterol_aux = 0, gordura_saturada_aux = 0,
  gordura_poliinsaturada_aux = 0, gordura_monoinsaturada_aux = 0, valor_aux = 0;

  if($formTipoItem.val() == 2){
    var posicao_preparacao = 0
    for (var i in view_preparacoes) {
      if (view_preparacoes.hasOwnProperty(i) != null && view_preparacoes[i].id_preparacao == $formItem.val()) {
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
    energia = parseFloat(energia.toFixed(3)) + parseFloat((energia_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    carboidratos =  parseFloat(carboidratos.toFixed(3)) + parseFloat((carboidratos_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((proteinas_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((lipidios_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    fibras = parseFloat(fibras.toFixed(3)) + parseFloat((fibras_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((vitamina_a_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((vitamina_c_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((vitamina_d_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((vitamina_e_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((vitamina_b1_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((vitamina_b2_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((vitamina_b6_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((vitamina_b12_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    niacina = parseFloat(niacina.toFixed(3)) + parseFloat((niacina_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    folico = parseFloat(folico.toFixed(3)) + parseFloat((folico_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((pantotenico_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    calcio = parseFloat(calcio.toFixed(3)) + parseFloat((calcio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    ferro = parseFloat(ferro.toFixed(3)) + parseFloat((ferro_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((magnesio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    potassio = parseFloat(potassio.toFixed(3)) + parseFloat((potassio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    selenio = parseFloat(selenio.toFixed(3)) + parseFloat((selenio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((fosforo_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    iodo = parseFloat(iodo.toFixed(3)) + parseFloat((iodo_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    cobre = parseFloat(cobre.toFixed(3)) + parseFloat((cobre_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    zinco = parseFloat(zinco.toFixed(3)) + parseFloat((zinco_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    sodio = parseFloat(sodio.toFixed(3)) + parseFloat((sodio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((gordura_total_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((colesterol_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((gordura_saturada_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((gordura_poliinsaturada_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((gordura_monoinsaturada_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    valor = parseFloat(valor.toFixed(2)) + parseFloat((valor_aux * $formPC.val()/view_preparacoes[posicao_preparacao].medida_total).toFixed(2));
  }

  var stringHTML = ''
  + '<div class="listaItem' + dia + '" horario_ref="' + minutos + '">'
  + '<li class="panel label-azul">'
  + '<div class="row">'
  + '<var class="idRefeicao' + dia + '" style="display: none">' + $formRefeicao.val() + '</var>'
  + '<var class="idTipoItem' + dia + '" style="display: none">' + $formTipoItem.val() + '</var>'
  + '<var class="idItem' + dia + '" style="display: none">' + $formItem.val() + '</var>'
  + '<var class="diaSemana' + dia + '" style="display: none">' + dia + '</var>'
  + '<var class="idFonte' + dia + '" style="display: none">' + $formFonte.val() + '</var>'
  + '<var class="idMedida' + dia + '" style="display: none">' + $formMedida.val() + '</var>'
  + '<var class="perCapta' + dia + '" style="display: none">' + $formPC.val() + '</var>'
  + '<div class="col-md-3 wrapper refeicao' + dia + '" style="margin-top: 5px">'
  + $formRefeicao.text()
  + '</div>'
  + '<div class="col-md-5 wrapper item' + dia + '" style="margin-top: 5px">'
  + $formItem.text()
  + '</div>'
  + '<div class="col-md-2 wrapper medida' + dia + '" style="margin-top: 5px">'
  + $formPC.val() + ' g'
  + '</div>'
  + '<div class="col-md-1 text-center">'
  + '<a class="btn btn-default botaoEditar' + dia + '" data-toggle="modal" data-target="#editar_item"><i class="fa fa-edit"></i></a>'
  + '</div>'
  + '<div class="col-md-1 text-center">'
  + '<button class="btn btn-danger botaoRemover' + dia + ' data-toggle="tooltip" data-placement="top" title="Excluir"><i class="fa fa-trash"></i></button>'
  + '</div>'
  + '</div>'
  + '</li>'
  + '</div>';

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

  grafico();

  $('#listaItens' + dia + '').append(stringHTML);
  $('#calorias').val(parseFloat((energia/numero_dias)).toFixed(3));
  $('#carboidratos').val(parseFloat((carboidratos/numero_dias)).toFixed(3));
  $('#proteinas').val(parseFloat((proteinas/numero_dias)).toFixed(3));
  $('#lipidios').val(parseFloat((lipidios/numero_dias)).toFixed(3));
  $('#fibras').val(parseFloat((fibras/numero_dias)).toFixed(3));
  $('#vitamina_a').val(parseFloat((vitamina_a/numero_dias)).toFixed(3));
  $('#vitamina_c').val(parseFloat((vitamina_c/numero_dias)).toFixed(3));
  $('#vitamina_d').val(parseFloat((vitamina_d/numero_dias)).toFixed(3));
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
}

function concluiEditarItem(dia,posicaoEditar) {

  var $formTipoItem = $('#select_tipo_item_edit option:selected');
  var $formItem = $('#select_item_add_edit option:selected');
  var $formMedida = $('#select_medida_edit option:selected');
  if($formMedida.val() > 1){
    for (var i in medidas_itens){
      if(medidas_itens.hasOwnProperty(i)!= null && medidas_itens[i].id == $formMedida.val()){
        $('#select_medida_edit').val(medidas_itens[i].unidade_medida);
        $formMedida = $('#select_medida_edit option:selected');
      }
    }

  }
  var $formPC = $('#p_liquido_edit');


  $($('.idMedida' + dia)[posicaoEditar]).html($formMedida.val());
  $($('.perCapta' + dia)[posicaoEditar]).html($formPC.val());
  $($('.medida' + dia)[posicaoEditar]).html($formPC.val() + ' g');
  if($formTipoItem.val() == 1){
    for (var i in itens) {
      if (itens.hasOwnProperty(i) != null && itens[i].id == $formItem.val()) {

        energia = parseFloat(energia.toFixed(3)) + parseFloat((itens[i].calorias * $formPC.val()/itens[i].medida_base).toFixed(3));
        carboidratos = parseFloat(carboidratos.toFixed(3)) + parseFloat((itens[i].carboidratos * $formPC.val()/itens[i].medida_base).toFixed(3));
        proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((itens[i].proteinas * $formPC.val()/itens[i].medida_base).toFixed(3));
        lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((itens[i].lipidios * $formPC.val()/itens[i].medida_base).toFixed(3));
        fibras = parseFloat(fibras.toFixed(3)) + parseFloat((itens[i].fibras * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((itens[i].vitamina_a * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((itens[i].vitamina_c* $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((itens[i].vitamina_d * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((itens[i].vitamina_e * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((itens[i].vitamina_b1 * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((itens[i].vitamina_b2 * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((itens[i].vitamina_b6 * $formPC.val()/itens[i].medida_base).toFixed(3));
        vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((itens[i].vitamina_b12 * $formPC.val()/itens[i].medida_base).toFixed(3));
        niacina = parseFloat(niacina.toFixed(3)) + parseFloat((itens[i].niacina * $formPC.val()/itens[i].medida_base).toFixed(3));
        folico = parseFloat(folico.toFixed(3)) + parseFloat((itens[i].folico * $formPC.val()/itens[i].medida_base).toFixed(3));
        pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((itens[i].pantotenico * $formPC.val()/itens[i].medida_base).toFixed(3));
        calcio = parseFloat(calcio.toFixed(3)) + parseFloat((itens[i].calcio * $formPC.val()/itens[i].medida_base).toFixed(3));
        ferro = parseFloat(ferro.toFixed(3)) + parseFloat((itens[i].ferro* $formPC.val()/itens[i].medida_base).toFixed(3));
        magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((itens[i].magnesio * $formPC.val()/itens[i].medida_base).toFixed(3));
        potassio = parseFloat(potassio.toFixed(3)) + parseFloat((itens[i].potassio * $formPC.val()/itens[i].medida_base).toFixed(3));
        selenio = parseFloat(selenio.toFixed(3)) + parseFloat((itens[i].selenio * $formPC.val()/itens[i].medida_base).toFixed(3));
        fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((itens[i].fosforo * $formPC.val()/itens[i].medida_base).toFixed(3));
        iodo = parseFloat(iodo.toFixed(3)) + parseFloat((itens[i].iodo * $formPC.val()/itens[i].medida_base).toFixed(3));
        cobre = parseFloat(cobre.toFixed(3)) + parseFloat((itens[i].cobre * $formPC.val()/itens[i].medida_base).toFixed(3));
        zinco = parseFloat(zinco.toFixed(3)) + parseFloat((itens[i].zinco * $formPC.val()/itens[i].medida_base).toFixed(3));
        sodio = parseFloat(sodio.toFixed(3)) + parseFloat((itens[i].sodio * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((itens[i].gordura_total * $formPC.val()/itens[i].medida_base).toFixed(3));
        colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((itens[i].colesterol * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((itens[i].gordura_saturada * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_poliinsaturada * $formPC.val()/itens[i].medida_base).toFixed(3));
        gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((itens[i].gordura_monoinsaturada * $formPC.val()/itens[i].medida_base).toFixed(3));
        valor = parseFloat(valor.toFixed(2)) + parseFloat((itens[i].valor * $formPC.val()/itens[i].medida_base).toFixed(2));
      }
    }
  }

  var energia_aux = 0, carboidratos_aux = 0, proteinas_aux = 0, lipidios_aux = 0, fibras_aux = 0, vitamina_a_aux = 0,
  vitamina_c_aux = 0, vitamina_d_aux = 0, vitamina_e_aux = 0, vitamina_b1_aux = 0, vitamina_b2_aux = 0,
  vitamina_b6_aux = 0, vitamina_b12_aux = 0, niacina_aux = 0, folico_aux = 0, pantotenico_aux = 0, calcio_aux = 0,
  ferro_aux = 0, magnesio_aux = 0, potassio_aux = 0, selenio_aux = 0, fosforo_aux = 0, iodo_aux = 0, cobre_aux = 0,
  zinco_aux = 0, sodio_aux = 0, gordura_total_aux = 0, colesterol_aux = 0, gordura_saturada_aux = 0,
  gordura_poliinsaturada_aux = 0, gordura_monoinsaturada_aux = 0, valor_aux = 0;

  if($formTipoItem.val() == 2){
    var posicao_preparacao = 0;
    for (var i in view_preparacoes) {
      if (view_preparacoes.hasOwnProperty(i) != null && view_preparacoes[i].id_preparacao == $formItem.val()) {
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
    energia = parseFloat(energia.toFixed(3)) + parseFloat((energia_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    carboidratos =  parseFloat(carboidratos.toFixed(3)) + parseFloat((carboidratos_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    proteinas = parseFloat(proteinas.toFixed(3)) + parseFloat((proteinas_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    lipidios = parseFloat(lipidios.toFixed(3)) + parseFloat((lipidios_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    fibras = parseFloat(fibras.toFixed(3)) + parseFloat((fibras_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_a = parseFloat(vitamina_a.toFixed(3)) + parseFloat((vitamina_a_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_c = parseFloat(vitamina_c.toFixed(3)) + parseFloat((vitamina_c_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_d = parseFloat(vitamina_d.toFixed(3)) + parseFloat((vitamina_d_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_e = parseFloat(vitamina_e.toFixed(3)) + parseFloat((vitamina_e_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) + parseFloat((vitamina_b1_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) + parseFloat((vitamina_b2_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) + parseFloat((vitamina_b6_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) + parseFloat((vitamina_b12_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    niacina = parseFloat(niacina.toFixed(3)) + parseFloat((niacina_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    folico = parseFloat(folico.toFixed(3)) + parseFloat((folico_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    pantotenico = parseFloat(pantotenico.toFixed(3)) + parseFloat((pantotenico_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    calcio = parseFloat(calcio.toFixed(3)) + parseFloat((calcio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    ferro = parseFloat(ferro.toFixed(3)) + parseFloat((ferro_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    magnesio = parseFloat(magnesio.toFixed(3)) + parseFloat((magnesio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    potassio = parseFloat(potassio.toFixed(3)) + parseFloat((potassio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    selenio = parseFloat(selenio.toFixed(3)) + parseFloat((selenio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    fosforo = parseFloat(fosforo.toFixed(3)) + parseFloat((fosforo_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    iodo = parseFloat(iodo.toFixed(3)) + parseFloat((iodo_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    cobre = parseFloat(cobre.toFixed(3)) + parseFloat((cobre_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    zinco = parseFloat(zinco.toFixed(3)) + parseFloat((zinco_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    sodio = parseFloat(sodio.toFixed(3)) + parseFloat((sodio_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_total = parseFloat(gordura_total.toFixed(3)) + parseFloat((gordura_total_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    colesterol = parseFloat(colesterol.toFixed(3)) + parseFloat((colesterol_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) + parseFloat((gordura_saturada_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) + parseFloat((gordura_poliinsaturada_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) + parseFloat((gordura_monoinsaturada_aux * $formPC.val()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
    valor = parseFloat(valor.toFixed(2)) + parseFloat((valor_aux * $formPC.val()/view_preparacoes[posicao_preparacao].medida_total).toFixed(2));
  }

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

  adicionaLinhaTabela();
  grafico();

  $('#calorias').val(parseFloat((energia/numero_dias)).toFixed(3));
  $('#carboidratos').val(parseFloat((carboidratos/numero_dias)).toFixed(3));
  $('#proteinas').val(parseFloat((proteinas/numero_dias)).toFixed(3));
  $('#lipidios').val(parseFloat((lipidios/numero_dias)).toFixed(3));
  $('#fibras').val(parseFloat((fibras/numero_dias)).toFixed(3));
  $('#vitamina_a').val(parseFloat((vitamina_a/numero_dias)).toFixed(3));
  $('#vitamina_c').val(parseFloat((vitamina_c/numero_dias)).toFixed(3));
  $('#vitamina_d').val(parseFloat((vitamina_d/numero_dias)).toFixed(3));
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

}

function recarregaEditarItem(dia) {

  var $botaoEditar = $('.botaoEditar' + dia);

  $botaoEditar.off();
  $botaoEditar.each(function (posicao, botaoEditar) {
    $(botaoEditar).click(function () {

      var $idRefeicao = $($('.idRefeicao' + dia)[posicao]);
      var $idTipoItem = $($('.idTipoItem' + dia)[posicao]);
      var $formItem = $($('.idItem' + dia)[posicao]);
      var $formFonte = $($('.idFonte' + dia)[posicao]);
      var $formMedida= $($('.idMedida' + dia)[posicao]);
      var $formPC= $($('.perCapta' + dia)[posicao]);

      if(dia == 1){
        posicaoEditar1 = posicao;
        editando1 = true;
      }else if (dia == 2) {
        posicaoEditar2 = posicao;
        editando2 = true;
      }else if (dia == 3) {
        posicaoEditar3 = posicao;
        editando3 = true;
      }else if (dia == 4) {
        posicaoEditar4 = posicao;
        editando4 = true;
      }else if (dia == 5) {
        posicaoEditar5 = posicao;
        editando5 = true;
      }else{
        posicaoEditar6 = posicao;
        editando6 = true;
      }
      criaOpcaoRefeicoesEdit(dia);
      $('#select_tipo_refeicao_edit').val($idRefeicao.html());
      criaOpcaoTipoItensEdit(dia);
      $('#select_tipo_item_edit').val($idTipoItem.html());
      criaOpcaoFonteItensEdit(dia);
      $('#select_fonte_edit').val($formFonte.html());
      criaOpcaoItensEdit();
      $('#select_item_add_edit').val($formItem.html());
      $('#select_item_add_edit').prop('disabled','true');
      $('#select_item_add_edit').selectpicker('refresh');
      criaOpcaoMedidas2Edit();
      $('#select_medida_edit').val($formMedida.html());
      habilitaMedidaEdit();
      $('#p_liquido_edit').val($formPC.html());

      if($idTipoItem.html() == 1){
        for (var i in itens) {
          if (itens.hasOwnProperty(i) != null && itens[i].id == $formItem.html()) {
            energia = parseFloat(energia.toFixed(3)) - parseFloat((itens[i].calorias * $formPC.html()/itens[i].medida_base).toFixed(3));
            carboidratos = parseFloat(carboidratos.toFixed(3)) - parseFloat((itens[i].carboidratos * $formPC.html()/itens[i].medida_base).toFixed(3));
            proteinas = parseFloat(proteinas.toFixed(3)) - parseFloat((itens[i].proteinas * $formPC.html()/itens[i].medida_base).toFixed(3));
            lipidios = parseFloat(lipidios.toFixed(3)) - parseFloat((itens[i].lipidios * $formPC.html()/itens[i].medida_base).toFixed(3));
            fibras = parseFloat(fibras.toFixed(3)) - parseFloat((itens[i].fibras * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_a = parseFloat(vitamina_a.toFixed(3)) - parseFloat((itens[i].vitamina_a * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_c = parseFloat(vitamina_c.toFixed(3)) - parseFloat((itens[i].vitamina_c* $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_d = parseFloat(vitamina_d.toFixed(3)) - parseFloat((itens[i].vitamina_d * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_e = parseFloat(vitamina_e.toFixed(3)) - parseFloat((itens[i].vitamina_e * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) - parseFloat((itens[i].vitamina_b1 * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) - parseFloat((itens[i].vitamina_b2 * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) - parseFloat((itens[i].vitamina_b6 * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) - parseFloat((itens[i].vitamina_b12 * $formPC.html()/itens[i].medida_base).toFixed(3));
            niacina = parseFloat(niacina.toFixed(3)) - parseFloat((itens[i].niacina * $formPC.html()/itens[i].medida_base).toFixed(3));
            folico = parseFloat(folico.toFixed(3)) - parseFloat((itens[i].folico * $formPC.html()/itens[i].medida_base).toFixed(3));
            pantotenico = parseFloat(pantotenico.toFixed(3)) - parseFloat((itens[i].pantotenico * $formPC.html()/itens[i].medida_base).toFixed(3));
            calcio = parseFloat(calcio.toFixed(3)) - parseFloat((itens[i].calcio * $formPC.html()/itens[i].medida_base).toFixed(3));
            ferro = parseFloat(ferro.toFixed(3)) - parseFloat((itens[i].ferro* $formPC.html()/itens[i].medida_base).toFixed(3));
            magnesio = parseFloat(magnesio.toFixed(3)) - parseFloat((itens[i].magnesio * $formPC.html()/itens[i].medida_base).toFixed(3));
            potassio = parseFloat(potassio.toFixed(3)) - parseFloat((itens[i].potassio * $formPC.html()/itens[i].medida_base).toFixed(3));
            selenio = parseFloat(selenio.toFixed(3)) - parseFloat((itens[i].selenio * $formPC.html()/itens[i].medida_base).toFixed(3));
            fosforo = parseFloat(fosforo.toFixed(3)) - parseFloat((itens[i].fosforo * $formPC.html()/itens[i].medida_base).toFixed(3));
            iodo = parseFloat(iodo.toFixed(3)) - parseFloat((itens[i].iodo * $formPC.html()/itens[i].medida_base).toFixed(3));
            cobre = parseFloat(cobre.toFixed(3)) - parseFloat((itens[i].cobre * $formPC.html()/itens[i].medida_base).toFixed(3));
            zinco = parseFloat(zinco.toFixed(3)) - parseFloat((itens[i].zinco * $formPC.html()/itens[i].medida_base).toFixed(3));
            sodio = parseFloat(sodio.toFixed(3)) - parseFloat((itens[i].sodio * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_total = parseFloat(gordura_total.toFixed(3)) - parseFloat((itens[i].gordura_total * $formPC.html()/itens[i].medida_base).toFixed(3));
            colesterol = parseFloat(colesterol.toFixed(3)) - parseFloat((itens[i].colesterol * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) - parseFloat((itens[i].gordura_saturada * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_poliinsaturada * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_monoinsaturada * $formPC.html()/itens[i].medida_base).toFixed(3));
            valor = parseFloat(valor.toFixed(3)) - parseFloat((itens[i].valor * $formPC.html()/itens[i].medida_base).toFixed(2));
          }
        }
      }

      var energia_aux = 0, carboidratos_aux = 0, proteinas_aux = 0, lipidios_aux = 0, fibras_aux = 0, vitamina_a_aux = 0,
      vitamina_c_aux = 0, vitamina_d_aux = 0, vitamina_e_aux = 0, vitamina_b1_aux = 0, vitamina_b2_aux = 0,
      vitamina_b6_aux = 0, vitamina_b12_aux = 0, niacina_aux = 0, folico_aux = 0, pantotenico_aux = 0, calcio_aux = 0,
      ferro_aux = 0, magnesio_aux = 0, potassio_aux = 0, selenio_aux = 0, fosforo_aux = 0, iodo_aux = 0, cobre_aux = 0,
      zinco_aux = 0, sodio_aux = 0, gordura_total_aux = 0, colesterol_aux = 0, gordura_saturada_aux = 0,
      gordura_poliinsaturada_aux = 0, gordura_monoinsaturada_aux = 0, valor_aux = 0;

      if($idTipoItem.html() == 2){
        var posicao_preparacao = 0
        for (var i in view_preparacoes) {
          if (view_preparacoes.hasOwnProperty(i) != null && view_preparacoes[i].id_preparacao == $formItem.html()) {
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
        energia = parseFloat(energia.toFixed(3)) - parseFloat((energia_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        carboidratos =  parseFloat(carboidratos.toFixed(3)) - parseFloat((carboidratos_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        proteinas = parseFloat(proteinas.toFixed(3)) - parseFloat((proteinas_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        lipidios = parseFloat(lipidios.toFixed(3)) - parseFloat((lipidios_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        fibras = parseFloat(fibras.toFixed(3)) - parseFloat((fibras_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_a = parseFloat(vitamina_a.toFixed(3)) - parseFloat((vitamina_a_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_c = parseFloat(vitamina_c.toFixed(3)) - parseFloat((vitamina_c_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_d = parseFloat(vitamina_d.toFixed(3)) - parseFloat((vitamina_d_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_e = parseFloat(vitamina_e.toFixed(3)) - parseFloat((vitamina_e_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) - parseFloat((vitamina_b1_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) - parseFloat((vitamina_b2_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) - parseFloat((vitamina_b6_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) - parseFloat((vitamina_b12_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        niacina = parseFloat(niacina.toFixed(3)) - parseFloat((niacina_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        folico = parseFloat(folico.toFixed(3)) - parseFloat((folico_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        pantotenico = parseFloat(pantotenico.toFixed(3)) - parseFloat((pantotenico_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        calcio = parseFloat(calcio.toFixed(3)) - parseFloat((calcio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        ferro = parseFloat(ferro.toFixed(3)) - parseFloat((ferro_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        magnesio = parseFloat(magnesio.toFixed(3)) - parseFloat((magnesio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        potassio = parseFloat(potassio.toFixed(3)) - parseFloat((potassio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        selenio = parseFloat(selenio.toFixed(3)) - parseFloat((selenio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        fosforo = parseFloat(fosforo.toFixed(3)) - parseFloat((fosforo_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        iodo = parseFloat(iodo.toFixed(3)) - parseFloat((iodo_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        cobre = parseFloat(cobre.toFixed(3)) - parseFloat((cobre_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        zinco = parseFloat(zinco.toFixed(3)) - parseFloat((zinco_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        sodio = parseFloat(sodio.toFixed(3)) - parseFloat((sodio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_total = parseFloat(gordura_total.toFixed(3)) - parseFloat((gordura_total_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        colesterol = parseFloat(colesterol.toFixed(3)) - parseFloat((colesterol_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) - parseFloat((gordura_saturada_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) - parseFloat((gordura_poliinsaturada_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) - parseFloat((gordura_monoinsaturada_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        valor = parseFloat(valor.toFixed(2)) - parseFloat((valor_aux * $formPC.html()/view_preparacoes[posicao_preparacao].medida_total).toFixed(2));
      }

    });

  });

}

function recarregaRemoverItem(dia) {
  var $botaoRemover = $('.botaoRemover' + dia);
  $botaoRemover.off();
  $botaoRemover.each(function (posicao, botaoRemover) {
    $(botaoRemover).click(function () {
      var $idRefeicao = $($('.idRefeicao' + dia)[posicao]);
      var $idTipoItem = $($('.idTipoItem' + dia)[posicao]);
      var $idFonte = $($('.idFonte' + dia)[posicao]);
      var $formItem = $($('.idItem' + dia)[posicao]);
      var $formPC = $($('.perCapta' + dia)[posicao]);
      var $formMedida = $($('.idMedida' + dia)[posicao]);
      $($('.listaItem' + dia)[posicao]).remove();
      if(dia == 1){
        listaTamanho1--;
      }else if (dia == 2) {
        listaTamanho2--;
      }else if (dia == 3) {
        listaTamanho3--;
      }else if (dia == 4) {
        listaTamanho4--;
      }else if (dia == 5) {
        listaTamanho5--;
      }else{
        listaTamanho6--;
      }
      listaTamanhoTotal--;
      recarregaTudo(dia);
      if (listaTamanho1 == 0 && dia == 1) {
        $('#listaVazia1').show();
        listaVazia1 = true;
      }
      if (listaTamanho2 == 0 && dia == 2) {
        $('#listaVazia2').show();
        listaVazia2 = true;
      }
      if (listaTamanho3 == 0 && dia == 3) {
        $('#listaVazia3').show();
        listaVazia3 = true;
      }
      if (listaTamanho4 == 0 && dia == 4) {
        $('#listaVazia4').show();
        listaVazia4 = true;
      }
      if (listaTamanho5 == 0 && dia == 5) {
        $('#listaVazia5').show();
        listaVazia5 = true;
      }
      if (listaTamanho6 == 0 && dia == 6) {
        $('#listaVazia6').show();
        listaVazia6 = true;
      }
      if($idTipoItem.html() == 1){
        for (var i in itens) {

          if (itens.hasOwnProperty(i) != null && itens[i].id == $formItem.html()) {
            energia = parseFloat(energia.toFixed(3)) - parseFloat((itens[i].calorias * $formPC.html()/itens[i].medida_base).toFixed(3));
            carboidratos = parseFloat(carboidratos.toFixed(3)) - parseFloat((itens[i].carboidratos * $formPC.html()/itens[i].medida_base).toFixed(3));
            proteinas = parseFloat(proteinas.toFixed(3)) - parseFloat((itens[i].proteinas * $formPC.html()/itens[i].medida_base).toFixed(3));
            lipidios = parseFloat(lipidios.toFixed(3)) - parseFloat((itens[i].lipidios * $formPC.html()/itens[i].medida_base).toFixed(3));
            fibras = parseFloat(fibras.toFixed(3)) - parseFloat((itens[i].fibras * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_a = parseFloat(vitamina_a.toFixed(3)) - parseFloat((itens[i].vitamina_a * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_c = parseFloat(vitamina_c.toFixed(3)) - parseFloat((itens[i].vitamina_c* $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_d = parseFloat(vitamina_d.toFixed(3)) - parseFloat((itens[i].vitamina_d * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_e = parseFloat(vitamina_e.toFixed(3)) - parseFloat((itens[i].vitamina_e * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) - parseFloat((itens[i].vitamina_b1 * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) - parseFloat((itens[i].vitamina_b2 * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) - parseFloat((itens[i].vitamina_b6 * $formPC.html()/itens[i].medida_base).toFixed(3));
            vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) - parseFloat((itens[i].vitamina_b12 * $formPC.html()/itens[i].medida_base).toFixed(3));
            niacina = parseFloat(niacina.toFixed(3)) - parseFloat((itens[i].niacina * $formPC.html()/itens[i].medida_base).toFixed(3));
            folico = parseFloat(folico.toFixed(3)) - parseFloat((itens[i].folico * $formPC.html()/itens[i].medida_base).toFixed(3));
            pantotenico = parseFloat(pantotenico.toFixed(3)) - parseFloat((itens[i].pantotenico * $formPC.html()/itens[i].medida_base).toFixed(3));
            calcio = parseFloat(calcio.toFixed(3)) - parseFloat((itens[i].calcio * $formPC.html()/itens[i].medida_base).toFixed(3));
            ferro = parseFloat(ferro.toFixed(3)) - parseFloat((itens[i].ferro* $formPC.html()/itens[i].medida_base).toFixed(3));
            magnesio = parseFloat(magnesio.toFixed(3)) - parseFloat((itens[i].magnesio * $formPC.html()/itens[i].medida_base).toFixed(3));
            potassio = parseFloat(potassio.toFixed(3)) - parseFloat((itens[i].potassio * $formPC.html()/itens[i].medida_base).toFixed(3));
            selenio = parseFloat(selenio.toFixed(3)) - parseFloat((itens[i].selenio * $formPC.html()/itens[i].medida_base).toFixed(3));
            fosforo = parseFloat(fosforo.toFixed(3)) - parseFloat((itens[i].fosforo * $formPC.html()/itens[i].medida_base).toFixed(3));
            iodo = parseFloat(iodo.toFixed(3)) - parseFloat((itens[i].iodo * $formPC.html()/itens[i].medida_base).toFixed(3));
            cobre = parseFloat(cobre.toFixed(3)) - parseFloat((itens[i].cobre * $formPC.html()/itens[i].medida_base).toFixed(3));
            zinco = parseFloat(zinco.toFixed(3)) - parseFloat((itens[i].zinco * $formPC.html()/itens[i].medida_base).toFixed(3));
            sodio = parseFloat(sodio.toFixed(3)) - parseFloat((itens[i].sodio * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_total = parseFloat(gordura_total.toFixed(3)) - parseFloat((itens[i].gordura_total * $formPC.html()/itens[i].medida_base).toFixed(3));
            colesterol = parseFloat(colesterol.toFixed(3)) - parseFloat((itens[i].colesterol * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) - parseFloat((itens[i].gordura_saturada * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_poliinsaturada * $formPC.html()/itens[i].medida_base).toFixed(3));
            gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) - parseFloat((itens[i].gordura_monoinsaturada * $formPC.html()/itens[i].medida_base).toFixed(3));
            valor = parseFloat(valor.toFixed(3)) - parseFloat((itens[i].valor * $formPC.html()/itens[i].medida_base).toFixed(2));
          }
        }
      }

      var energia_aux = 0, carboidratos_aux = 0, proteinas_aux = 0, lipidios_aux = 0, fibras_aux = 0, vitamina_a_aux = 0,
      vitamina_c_aux = 0, vitamina_d_aux = 0, vitamina_e_aux = 0, vitamina_b1_aux = 0, vitamina_b2_aux = 0,
      vitamina_b6_aux = 0, vitamina_b12_aux = 0, niacina_aux = 0, folico_aux = 0, pantotenico_aux = 0, calcio_aux = 0,
      ferro_aux = 0, magnesio_aux = 0, potassio_aux = 0, selenio_aux = 0, fosforo_aux = 0, iodo_aux = 0, cobre_aux = 0,
      zinco_aux = 0, sodio_aux = 0, gordura_total_aux = 0, colesterol_aux = 0, gordura_saturada_aux = 0,
      gordura_poliinsaturada_aux = 0, gordura_monoinsaturada_aux = 0, valor_aux = 0;

      if($idTipoItem.html() == 2){
        var posicao_preparacao = 0
        for (var i in view_preparacoes) {
          if (view_preparacoes.hasOwnProperty(i) != null && view_preparacoes[i].id_preparacao == $formItem.html()) {
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
        energia = parseFloat(energia.toFixed(3)) - parseFloat((energia_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        carboidratos =  parseFloat(carboidratos.toFixed(3)) - parseFloat((carboidratos_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        proteinas = parseFloat(proteinas.toFixed(3)) - parseFloat((proteinas_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        lipidios = parseFloat(lipidios.toFixed(3)) - parseFloat((lipidios_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        fibras = parseFloat(fibras.toFixed(3)) - parseFloat((fibras_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_a = parseFloat(vitamina_a.toFixed(3)) - parseFloat((vitamina_a_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_c = parseFloat(vitamina_c.toFixed(3)) - parseFloat((vitamina_c_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_d = parseFloat(vitamina_d.toFixed(3)) - parseFloat((vitamina_d_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_e = parseFloat(vitamina_e.toFixed(3)) - parseFloat((vitamina_e_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b1 = parseFloat(vitamina_b1.toFixed(3)) - parseFloat((vitamina_b1_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b2 = parseFloat(vitamina_b2.toFixed(3)) - parseFloat((vitamina_b2_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b6 = parseFloat(vitamina_b6.toFixed(3)) - parseFloat((vitamina_b6_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        vitamina_b12 = parseFloat(vitamina_b12.toFixed(3)) - parseFloat((vitamina_b12_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        niacina = parseFloat(niacina.toFixed(3)) - parseFloat((niacina_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        folico = parseFloat(folico.toFixed(3)) - parseFloat((folico_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        pantotenico = parseFloat(pantotenico.toFixed(3)) - parseFloat((pantotenico_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        calcio = parseFloat(calcio.toFixed(3)) - parseFloat((calcio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        ferro = parseFloat(ferro.toFixed(3)) - parseFloat((ferro_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        magnesio = parseFloat(magnesio.toFixed(3)) - parseFloat((magnesio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        potassio = parseFloat(potassio.toFixed(3)) - parseFloat((potassio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        selenio = parseFloat(selenio.toFixed(3)) - parseFloat((selenio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        fosforo = parseFloat(fosforo.toFixed(3)) - parseFloat((fosforo_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        iodo = parseFloat(iodo.toFixed(3)) - parseFloat((iodo_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        cobre = parseFloat(cobre.toFixed(3)) - parseFloat((cobre_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        zinco = parseFloat(zinco.toFixed(3)) - parseFloat((zinco_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        sodio = parseFloat(sodio.toFixed(3)) - parseFloat((sodio_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_total = parseFloat(gordura_total.toFixed(3)) - parseFloat((gordura_total_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        colesterol = parseFloat(colesterol.toFixed(3)) - parseFloat((colesterol_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_saturada = parseFloat(gordura_saturada.toFixed(3)) - parseFloat((gordura_saturada_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_poliinsaturada = parseFloat(gordura_poliinsaturada.toFixed(3)) - parseFloat((gordura_poliinsaturada_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        gordura_monoinsaturada = parseFloat(gordura_monoinsaturada.toFixed(3)) - parseFloat((gordura_monoinsaturada_aux * $formPC.html()/view_preparacoes[posicao_preparacao] .medida_total).toFixed(3));
        valor = parseFloat(valor.toFixed(2)) - parseFloat((valor_aux * $formPC.html()/view_preparacoes[posicao_preparacao].medida_total).toFixed(2));
      }

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

      adicionaLinhaTabela();
      grafico();

      $('#calorias').val(parseFloat((energia/numero_dias)).toFixed(3));
      $('#carboidratos').val(parseFloat((carboidratos/numero_dias)).toFixed(3));
      $('#proteinas').val(parseFloat((proteinas/numero_dias)).toFixed(3));
      $('#lipidios').val(parseFloat((lipidios/numero_dias)).toFixed(3));
      $('#fibras').val(parseFloat((fibras/numero_dias)).toFixed(3));
      $('#vitamina_a').val(parseFloat((vitamina_a/numero_dias)).toFixed(3));
      $('#vitamina_c').val(parseFloat((vitamina_c/numero_dias)).toFixed(3));
      $('#vitamina_d').val(parseFloat((vitamina_d/numero_dias)).toFixed(3));
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
      notificacao_sucesso('Item <b>removido</b> com sucesso.');

    });
  });
}

function recarregaTudo(dia) {
  recarregaRemoverItem(dia);
  recarregaEditarItem(dia);
}

//Envia o formulário para o controller
function enviarCadastro() {
  var nome = $("#nome").val();
  var descricao = $("#descricao").val();
  var modalidade = $("#select_modalidade option:selected").val();
  var escola = $("#select_escola option:selected").val();
  var data = $("#reservation").val();
  var valor =  $("#valor").val();
  var jsonListaItens = [];

  var count1 = 0, count2 = 0, count3 = 0, count5 = 0, count6 = 0, count7 = 0;

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
          };
        }
        jsonListaItens[count1]['idRefeicao'] = $(this).html();
        count1++;
      });

      $('var[class="idTipoItem' + j + '"]').each(function (pos, item) {
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
          };
        }
        jsonListaItens[count2]['idTipoItem'] = $(this).html();
        count2++;
      });

      $('var[class="diaSemana' + j + '"]').each(function (pos, item) {
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
          };
        }
        jsonListaItens[count3]['diaSemana'] = $(this).html();
        count3++;
      });


      $('var[class="idItem' + j + '"]').each(function (pos, item) {
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
          };
        }
        jsonListaItens[count5]['idItem'] = $(this).html();
        count5++;
      });

      $('var[class="idMedida' + j + '"]').each(function (pos, item) {
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
          };
        }
        jsonListaItens[count6]['idMedida'] = $(this).html();
        count6++;
      });

      $('var[class="perCapta' + j + '"]').each(function (pos, item) {
        if (!jsonListaItens.hasOwnProperty(count7)) {
          jsonListaItens[count7] = {
            nome: nome,
            descricao: descricao,
            modalidade: modalidade,
            escola: escola,
            data_inicio: arr,
            data_fim: arr2,
            numero_dias: numero_dias,
            valor: valor,
          };
        }
        jsonListaItens[count7]['perCapta'] = $(this).html();
        count7++;
      });

    }
  }

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $.ajax({
    url: '/menu/save',
    type: 'post',
    dataType: "text",
    data: { testdata : JSON.stringify(jsonListaItens) },
    success: function (data, status) {

      //window.open(APP_URL + '/menu/' + data + '/pdf', '_blank');
      mostraDialogo3(data);
      //mostraDialogo2("Dados inseridos com sucesso","success");
      //location.href = APP_URL + '/menu/create';

    },
    error: function (xhr, desc, err) {
      alert('Erro');
    }
  });

}

$('#confBotaoEnviar').click(function () {
  if (!validaEnviarFormulario() && !validaData()) {
    var erro = 0;
    for(var i = 1; i<=6; i++){
      if(validaListaVazia(i)){
        erro = 1;
      }
    }
    if (erro == 0){
      $(this).addClass('disabled');
      $(this).text("Enviando...");
      enviarCadastro();
    }
  }
});

});
