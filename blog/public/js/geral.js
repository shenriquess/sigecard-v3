function data_MySQL_para_normal($data) {
    if($data != NULL) {
        $formatarData = explode('-', $data);

        return $formatarData[2] + '/' + $formatarData[1] + '/' + $formatarData[0];
    }

    return FALSE;
}


function data_normal_para_MySQL($data) {
    if($data != NULL) {
        $formatarData = explode('/', $data);

        return $formatarData[2] + '-' + $formatarData[1] + '-' + $formatarData[0];
    }

    return FALSE;
}


function notificacao_alerta(string) {

    var alerta = new PNotify({
        text: string,
        type: 'warning',
        icon: false,
        mouse_reset: false
    });
    alerta.get().click(function () {
        alerta.remove();
    })
}

/**
 * Notificação do tipo erro.
 *
 * @param string Frase a ser mostrada na tela.
 */
function notificacao_erro(string) {
    var alerta = new PNotify({
        text: string,
        type: 'erro',
        icon: false,
        mouse_reset: false
    });
    alerta.get().click(function () {
        alerta.remove();
    })
}

/**
 * Notificação do tipo sucesso.
 *
 * @param string Frase a ser mostrada na tela.
 */
function notificacao_sucesso(string) {
    var alerta = new PNotify({
        text: string,
        type: 'success',
        icon: false,
        mouse_reset: false
    });
    alerta.get().click(function () {
        alerta.remove();
    })
}

function contarLetra(string, caracter) {
    return string.split(caracter).length - 1;
}

function validarCampo(campo,div,span) {

  $(campo).change(function(){
    $(div).removeClass("has-error");
    $(span).hide();
  });
}

function tipoUsuario() {

  $("#type").change(function() {
    $('#div_crn').hide();
    if(this.value == "2" || this.value == "1")
      $('#div_crn').show();
  });
}

function mostraDialogo(mensagem, tipo){
  swal({
    title: "Aviso!",
    text: mensagem,
    icon: tipo,
  });
}

/*function mostraDialogo(mensagem, tipo, tempo, icone){

    // se houver outro alert desse sendo exibido, cancela essa requisição
    if($("#message").is(":visible")){
        return false;
    }

    // se não setar o tempo, o padrão é 3 segundos
    if(!tempo){
        var tempo = 3000;
    }

    // se não setar o tipo, o padrão é alert-info
    if(!tipo){
        var tipo = "info";
    }

    // monta o css da mensagem para que fique flutuando na frente de todos elementos da página
    var cssMessage = "display: block; position: fixed; top: 0; left: 52%; right: 20%; width: 40%; padding-top: 45px; z-index: 9999";
    var cssInner = "margin: 0 auto; box-shadow: 1px 1px 5px black;";

    // monta o html da mensagem com Bootstrap
    var dialogo = "";
    dialogo += '<div id="message" style="'+cssMessage+'">';
    dialogo += '    <div class="alert alert-'+tipo+' alert-dismissable" style="'+cssInner+'">';
    dialogo += '    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
    dialogo += ' <h4><i class="icon fa fa-'+icone+'"></i> Aviso </h4> '
    dialogo +=          mensagem;
    dialogo += '    </div>';
    dialogo += '</div>';

    // adiciona ao body a mensagem com o efeito de fade
    $("body").append(dialogo);
    $("#message").hide();
    $("#message").fadeIn(200);

    // contador de tempo para a mensagem sumir
    setTimeout(function() {
        $('#message').fadeOut(300, function(){
            $(this).remove();
        });
    }, tempo); // milliseconds
}*/


function validaCamposUsuario(){
    validarCampo('#nome','#div_nome','#span_nome');
    validarCampo('#username','#div_username','#span_username');
    validarCampo('#email','#div_email','#span_email');
    validarCampo('#type','#div_type','#span_type');
    validarCampo('#password','#div_password','#span_password');
}


$(document).ready(function($){

  $('#reservation').daterangepicker({
  "locale": {
      "format": "DD/MM/YYYY",
      "separator": " - ",
      "applyLabel": "Aplicar",
      "cancelLabel": "Cancelar",
      "fromLabel": "De",
      "toLabel": "Até",
      "customRangeLabel": "Custom",
      "daysOfWeek": [
          "Do",
          "Se",
          "Te",
          "Qu",
          "Qu",
          "Sx",
          "Sa"
      ],
      "monthNames": [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro"
      ],
      "firstDay": 1
    }
  });


    $('[data-toggle="popover"]').popover({
        trigger : 'hover',
        html: true
    });

  validaCamposUsuario();
  tipoUsuario();

  $('#quantidade_c').mask("0000.000", {reverse: true});
  $('#medida_base').mask("00000.000", {reverse: true});
  $('#calorias').mask("000000.000", {reverse: true});
  $('#carboidratos').mask("00000.000", {reverse: true});
  $('#proteinas').mask("00000.000", {reverse: true});
  $('#lipidios').mask("00000.000", {reverse: true});
  $('#fibras').mask("00000.000", {reverse: true});
  $('#vitamina_a').mask("00000.000", {reverse: true});
  $('#vitamina_c').mask("00000.000", {reverse: true});
  $('#vitamina_d').mask("00000.000", {reverse: true});
  $('#vitamina_e').mask("0000.000", {reverse: true});
  $('#vitamina_b1').mask("00000.000", {reverse: true});
  $('#vitamina_b2').mask("00000.000", {reverse: true});
  $('#vitamina_b6').mask("00000.000", {reverse: true});
  $('#vitamina_b12').mask("00000.000", {reverse: true});
  $('#niacina').mask("00000.000", {reverse: true});
  $('#folico').mask("00000.000", {reverse: true});
  $('#pantotenico').mask("00000.000", {reverse: true});
  $('#calcio').mask("00000.000", {reverse: true});
  $('#ferro').mask("00000.000", {reverse: true});
  $('#potassio').mask("00000.000", {reverse: true});
  $('#selenio').mask("00000.000", {reverse: true});
  $('#fosforo').mask("00000.000", {reverse: true});
  $('#iodo').mask("00000.000", {reverse: true});
  $('#cobre').mask("00000.000", {reverse: true});
  $('#zinco').mask("00000.000", {reverse: true});
  $('#sodio').mask("00000.000", {reverse: true});
  $('#gordura_total').mask("00000.000", {reverse: true});
  $('#colesterol').mask("00000.000", {reverse: true});
  $('#gordura_saturada').mask("00000.000", {reverse: true});
  $('#gordura_poliinsaturada').mask("00000.000", {reverse: true});
  $('#gordura_monoinsaturada').mask("00000.000", {reverse: true});
  $('#valor').mask("00000.00", {reverse: true});
  $("#horario").inputmask("h:s",{ "placeholder": "hh/mm" });
  $('#num_alunos').mask("00000");
  $('#num_alunos_edit').mask("00000");
  $('#crn').inputmask("CRN9-9999[*][*][*][*]");
  $('#p_bruto').mask("00000.000", {reverse: true});
  $('#p_liquido').mask("00000.000", {reverse: true});
  $('#p_bruto_edit').mask("00000.000", {reverse: true});
  $('#p_liquido_edit').mask("00000.000", {reverse: true});
  $('#r_total').mask("00000.000", {reverse: true});

  if (typeof msg !== "undefined"){
    mostraDialogo(msg, tipo_msg);
  }

  if (typeof errors !== "undefined"){
    console.log(errors);
    for(var i in errors){
      notificacao_erro(errors[i]);
    }
  }

  //ativação dos menus
  if(ativarMenu[1] == "active" || ativarMenu[2] == "active" || ativarMenu[3] == "active"){
    $('#collapseOne').collapse();
  }else{
    $('#collapseOne').collapse('hide');
  }

  $('#collapseOne').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseNine').collapse('hide');
  })


  if(ativarMenu[4] == "active" || ativarMenu[5] == "active"){
    $('#collapseTwo').collapse();
  }else{
    $('#collapseTwo').collapse('hide');
  }

  $('#collapseTwo').on('show.bs.collapse', function () {
    $('#collapseOne').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseNine').collapse('hide');
  })

  if(ativarMenu[6] == "active" || ativarMenu[7] == "active" || ativarMenu[8] == "active" || ativarMenu[9] == "active"){
    $('#collapseThree').collapse();
  }else{
    $('#collapseThree').collapse('hide');
  }

  $('#collapseThree').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseOne').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseNine').collapse('hide');
  })

  if(ativarMenu[10] == "active" || ativarMenu[11] == "active" || ativarMenu[12] == "active" ||  ativarMenu[13] == "active" || ativarMenu[14] == "active"|| ativarMenu[15] == "active"){
    $('#collapseFour').collapse();
  }else{
    $('#collapseFour').collapse('hide');
  }

  $('#collapseFour').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseOne').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseNine').collapse('hide');
  })

  if(ativarMenu[16] == "active" || ativarMenu[17] == "active"){
    $('#collapseFive').collapse();
  }else{
    $('#collapseFive').collapse('hide');
  }

  $('#collapseFive').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseOne').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseNine').collapse('hide');
  })

  if(ativarMenu[18] == "active" || ativarMenu[19] == "active"){
    $('#collapseSix').collapse();
  }else{
    $('#collapseSix').collapse('hide');
  }

  $('#collapseSix').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseOne').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseNine').collapse('hide');
  })

  if(ativarMenu[20] == "active" || ativarMenu[21] == "active"|| ativarMenu[26] == "active"){
    $('#collapseSeven').collapse();
  }else{
    $('#collapseSeven').collapse('hide');
  }

  $('#collapseSeven').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseOne').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseNine').collapse('hide');
  })

  if(ativarMenu[22] == "active" || ativarMenu[23] == "active"){
    $('#collapseEight').collapse();
  }else{
    $('#collapseEight').collapse('hide');
  }

  $('#collapseEight').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseNine').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseOne').collapse('hide');
  })

  if(ativarMenu[24] == "active" || ativarMenu[25] == "active"){
    $('#collapseNine').collapse();
  }else{
    $('#collapseNine').collapse('hide');
  }

  $('#collapseNine').on('show.bs.collapse', function () {
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('hide');
    $('#collapseFive').collapse('hide');
    $('#collapseSix').collapse('hide');
    $('#collapseSeven').collapse('hide');
    $('#collapseEight').collapse('hide');
    $('#collapseOne').collapse('hide');
  })


});
