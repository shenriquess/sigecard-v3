function enviarPreparacao(id){

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });


  $.ajax({
            url: '/preparation/destroy',
            type: 'post',
            dataType: "text",
            data: { testdata : id},
            success: function (data, status) {
              location.reload();
            },
            error: function (xhr, desc, err) {
              alert('Erro');
            }
        });

}

$(document).ready(function($){

    var energia = 0, carboidratos = 0, proteinas = 0, lipidios = 0, fibras = 0, vitamina_a = 0,
        vitamina_c = 0, vitamina_d = 0, vitamina_e = 0, vitamina_b1 = 0, vitamina_b2 = 0,
        vitamina_b6 = 0, vitamina_b12 = 0, niacina = 0, folico = 0, pantotenico = 0, calcio = 0,
        ferro = 0, magnesio = 0, potassio = 0, selenio = 0, fosforo = 0, iodo = 0, cobre = 0,
        zinco = 0, sodio = 0, gordura_total = 0, colesterol = 0, gordura_saturada = 0,
        gordura_poliinsaturada = 0, gordura_monoinsaturada = 0, valor = 0;
    var stringHTML = '';
    var stringHTMLDelete = '';

    for (var i in preparacoes){

            stringHTMLDelete +=  '<div class="modal fade" id="modalDelete' + preparacoes[i].id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'
                            +        '<div class="modal-dialog modal-lg" role="document">'
                            +          '<div class="modal-content">'
                            +            '<div class="modal-header">'
                            +              '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                            +                      '<div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Preparação</h4></div>'
                            +            '</div>'
                            +            '<div class="modal-body">'
                            +              '<div class="row">'
                            +                '<div class="col-md-12"><h4>Tem certeza que deseja excluir esta Preparação?</h4></div>'
                            +              '</div>'
                            +               '<div class="row">'
                            +                 '<div class="col-md-5"><h4><strong>Nome:</strong> ' + preparacoes[i].nome + '</h4></div>'
                            +                 '<div class="col-md-5"><h4><strong>Grupo:</strong> ' + preparacoes[i].nome_tipo_preparacao + '</h4></div>'
                            +               '</div>'
                            +               '<br/>'
                            +                '<div class="row">'
                            +                    '<div class="col-md-3">'
                            +                        '<hr/>'
                            +                    '</div>'
                            +                    '<div class="col-md-6">'
                            +                        '<div class="text-center"><h5><strong>Lista de ingredientes</strong></h5></div>'
                            +                    '</div>'
                            +                   '<div class="col-md-3">'
                            +                        '<hr/>'
                            +                    '</div>'
                            +               '</div>';
            for (j in itens_preparacao){
              if(itens_preparacao[j].id_preparacao == preparacoes[i].id){
                  stringHTMLDelete +=  '<div class="listaItem">'
                               +           '<div class="row">'
                               +               '<div class="col-md-3 item" style="margin-top: 5px">'
                               +                      itens_preparacao[j].nome
                               +                '</div>'
                               +            '</div>'
                               +        '</div>';
              }


            }



           stringHTMLDelete +=            '</div>'
                            +            '<div class="modal-footer">'
                            +              '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>'
                            +              '<a href="javascript:enviarPreparacao(' + preparacoes[i].id +' );" class="btn btn-danger">Excluir</a>'
                            +            '</div>'
                            +          '</div>'
                            +        '</div>'
                            +      '</div>';
            $('#listaModalDelete').append(stringHTMLDelete);
     }


});
