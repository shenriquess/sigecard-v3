<!doctype html>
<html>
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SIGECARD</title>

        <!-- Fonts -->

        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-1/js/all.min.js" integrity="sha512-NBPDzmbzjlbKiCJ4gojF6V5hwwaiATqKnSRisMaVpJVECLJ10Dd88t/YV42Y8PMWBlqvIOJtXVBz79wgYlTY7w==" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <link rel="stylesheet" href="http://localhost:8000//css/AdminLTE.min.css" >
        <!-- Date Picker -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/css/bootstrap-datepicker.min.css" integrity="sha512-x2MVs84VwuTYP0I99+3A4LWPZ9g+zT4got7diQzWB4bijVsfwhNZU2ithpKaq6wTuHeLhqJICjqE6HffNlYO7w==" crossorigin="anonymous" />
        <!-- Daterange picker -->
        <link rel="stylesheet" href="http://localhost:8000//css/daterangepicker.css">
        <link rel="stylesheet" href="http://localhost:8000//css/pnotify.custom.min.css">
    </head>
    <body>

          <div class="panel-body" hidden>

            <form class="" action="#" method="POST">
               {{ csrf_field() }}
               <div class="row">
                 <div class="form-group col-md-4">
                   <label for="nome">Nome:</label>
                   <input type="text" class="form-control" value="{{ $cardapio->nome }}"  id="nome" name="nome">
                 </div>
                 <div class="form-group col-md-4">
                   <label for="descricao">Descrição:</label>
                   <input type="text" class="form-control" value="{{ $cardapio->descricao }}" id="descricao" name="descricao">
                 </div>
                 <div class="form-group col-md-4" id="div_escola">
                   <label for="select_escola">Escola:</label>
                   <select name="select_escola" id="select_escola" onchange="" class="form-control form-control">
                     <option value="0" selected="selected">Selecione uma opção</option>
                     @foreach($escolas as $escola)
                       <option value="{{$escola->id}}"
                       @if($cardapio->id_escola == $escola->id)
                         selected
                       @endif>{{$escola->nome}}</option>
                     @endforeach
                  </select>
                 </div>
               </div>

               <div class="row">
                 <<div class="form-group col-md-6" id="div_referencia">
                   <label for="select_modalidade">Modalidade:</label>
                   <select name="select_modalidade" id="select_modalidade" onchange="" class="form-control form-control">
                     <option value="0" selected="selected">Selecione uma opção</option>
                     @foreach($modalidades_escola as $modalidade_escola)
                       @php
                         {{
                           $nomeModalidade ='';
                           if($cardapio->id_escola == $modalidade_escola->id_escola){
                             if($modalidade_escola->categoria_ensino == 1 && $modalidade_escola->idade_alunos == 1){
                               $nomeModalidade = 'Creche (7 - 11 meses)';
                             }else if ($modalidade_escola->categoria_ensino == 1 && $modalidade_escola->idade_alunos == 2) {
                               $nomeModalidade = 'Creche (1 - 3 anos)';
                             }else if ($modalidade_escola->categoria_ensino == 2 && $modalidade_escola->idade_alunos == 3) {
                               $nomeModalidade = 'Pré-escola (4 - 5 anos)';
                             }else if ($modalidade_escola->categoria_ensino == 3 && $modalidade_escola->idade_alunos == 4) {
                               $nomeModalidade = 'Ensino Fundamental (6 - 10 anos)';
                             }else if ($modalidade_escola->categoria_ensino == 3 && $modalidade_escola->idade_alunos == 5) {
                               $nomeModalidade = 'Ensino Fundamental (11 - 15 anos)';
                             }else if ($modalidade_escola->categoria_ensino == 4 && $modalidade_escola->idade_alunos == 6) {
                               $nomeModalidade = 'Ensino Fundamental (16 - 18 anos)';
                             }else if ($modalidade_escola->categoria_ensino == 5 && $modalidade_escola->idade_alunos == 7) {
                               $nomeModalidade = 'EJA (19 - 30 anos)';
                             }else{
                               $nomeModalidade = 'EJA (31 - 60 anos)';
                             }
                           }
                         }}
                       @endphp
                       @if($cardapio->id_escola == $modalidade_escola->id_escola)
                         <option value="{{$modalidade_escola->id}}"
                         @if($cardapio->id_modalidade == $modalidade_escola->id)
                           selected
                         @endif>{{$nomeModalidade}}</option>
                       @endif
                     @endforeach
                      </select>
                 </div>
                 <div class="form-group col-md-6">
                   <label>Periodo:</label>
                   <div class="input-group">
                     <div class="input-group-addon">
                       <i class="fa fa-calendar"></i>
                     </div>
                     <input type="text" class="form-control pull-right" id="reservation" name="reservation">
                   </div>
                 </div>
               </div>
               <div class="row">&nbsp;</div>
               <div class="row">
                 <div class="col-md-12">
              <!-- Custom Tabs -->
              <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                  <li class="pull-left header"><span style="font-size: 1em; color: #726E6E"><i class="fas fa-clipboard-list"></i></span> Cardápios</li>
                  <li id="li_1" class="disabled"><a id="a_1" href="#tab_1">Segunda-feira</a></li>
                  <li id="li_2" class="disabled"><a id="a_2" href="#tab_2">Terça-feira</a></li>
                  <li id="li_3" class="disabled"><a id="a_3" href="#tab_3">Quarta-feira</a></li>
                  <li id="li_4" class="disabled"><a id="a_4" href="#tab_4">Quinta-feira</a></li>
                  <li id="li_5" class="disabled"><a id="a_5" href="#tab_5">Sexta-feira</a></li>
                  <li id="li_6" class="disabled"><a id="a_6" href="#tab_6">Sábado</a></li>
                  <li class="pull-right"><a href="#" class="text-muted"><i class="fa fa-gear"></i></a></li>
                </ul>
                <div class="col-md-12" style="display: none" id="data_invalida">
                  <div class="text-center">
                      <div class="alert alert-warning" role="alert">
                          <b>Data Inválida! Escolha outra data.</b>
                      </div>
                  </div>
                </div>
                <div class="tab-content">
                  <div class="tab-pane" id="tab_1">
                      <fieldset disabled id="fieldset_1" class="scheduler-border">
                        <legend class="scheduler-border"><h5>Adicionar Item:</h5></legend>
                        <div class="row">
                            <div class="form-group col-md-4" id="div_tipo_refeicao1">
                              <label for="tipo_refeicao1">Tipo de Refeição:</label>
                              <select name="tipo_refeicao1" id="select_tipo_refeicao1" onchange="" class="form-control form-control">
                                <option value="0" selected="selected">Selecione uma opção</option>
                               </select>
                            </div>
                            <div class="form-group col-md-4" id="div_tipo_item1">
                              <label for="select_tipo_item1">Tipo do Item:</label>
                              <select name="select_tipo_item1" id="select_tipo_item1" onchange="" class="form-control form-control">
                                <option value="0" selected="selected">Selecione uma opção</option>
                              </select>
                            </div>
                          <div class="form-group col-md-4" id="div_fonte1">
                            <label for="select_fonte1">Fonte:</label>
                            <select name="select_fonte1" id="select_fonte1" onchange="" class="form-control form-control">
                               <option value="0" selected="selected">Todas as fontes</option>
                             </select>
                          </div>

                        </div>
                        <div class="row">
                          <div class="form-group col-md-7" id="div_item1">
                            <label for="select_item_add1">Item:</label>
                            <select disabled name="select_item_add1" data-live-search="true" title="Selecione uma opção" id="select_item_add1" onchange="" class="form-control btn selectpicker">
                               <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>
                          <div class="form-group col-md-2" id="div_unidade1">
                            <div class="input-group">
                              <label for="select_medida1" data-toggle="tooltip" data-placement="top" title="Unidade de Medida">Unidade:</label>
                              <select disabled name="select_medida1" id="select_medida1" onchange="" class="form-control form-control">
                                <option value="0" selected="selected">Selecione uma opção</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group col-md-3" id="div_pl1">
                            <label for="p_liquido1">Quantidade:</label>
                            <div class="input-group">
                              <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido1" name="p_liquido1">
                              <span id="span_liquido1" class="input-group-addon">&nbsp;</span>
                            </div>
                          </div>
                        </div>
                         <br/>
                         <div class="row">
                             <div class="col-md-4 col-md-offset-4">
                                 <a id="botaoAdicionar1" class="btn btn-default btn-block">Adicionar a Lista</a>
                             </div>
                         </div>
                         <br/>
                         <div class="row">
                                 <div class="col-md-3">
                                     <hr/>
                                 </div>
                                 <div class="col-md-6">
                                     <div class="text-center"><h5><b>Lista dos itens cadastrados</b></h5></div>
                                 </div>
                                 <div class="col-md-3">
                                     <hr/>
                                 </div>
                         </div>
                         <div class="panel panel-default">
                           <div class="panel-body panel-lista">
                             <ul class="titulo">
                               <li class="panel">
                                 <div class="row">
                                     <div class="col-md-3">
                                         <h5><b>REFEICÃO</b></h5>
                                     </div>
                                     <div class="col-md-5">
                                         <h5><b>ITEM</b></h5>
                                     </div>
                                     <div class="col-md-2">
                                         <h5><b>QUANTIDADE</b></h5>
                                     </div>
                                     <div class="col-md-2 text-center">
                                         <h5><b>EXCLUIR</b></h5>
                                     </div>
                                 </div>
                               </li>
                             </ul>
                             <ul class="lista-itens pre-scrollable" id="nicescroll1">
                               <div id="listaVazia1">
                                   <div class="text-center">
                                       <div class="alert alert-warning" role="alert">
                                           <b>Lista Vazia</b>
                                       </div>
                                   </div>
                               </div>
                               <div id="listaItens1"></div>
                             </ul>
                          </div>
                       </div>
                    </fieldset>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="tab_2">
                    <fieldset disabled id="fieldset_2" class="scheduler-border">
                      <legend class="scheduler-border"><h5>Adicionar Item:</h5></legend>
                      <div class="row">
                          <div class="form-group col-md-4" id="div_tipo_refeicao2">
                            <label for="tipo_refeicao2">Tipo de Refeição:</label>
                            <select name="tipo_refeicao2" id="select_tipo_refeicao2" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>
                        <div class="form-group col-md-4" id="div_tipo_item2">
                          <label for="select_tipo_item2">Tipo do Item:</label>
                          <select name="select_tipo_item2" id="select_tipo_item2" onchange="" class="form-control form-control">
                            <option value="0" selected="selected">Selecione uma opção</option>
                          </select>
                        </div>
                        <div class="form-group col-md-4" id="div_fonte2">
                          <label for="select_fonte2">Fonte:</label>
                          <select name="select_fonte2" id="select_fonte2" onchange="" class="form-control form-control">
                             <option value="0" selected="selected">Todas as fontes</option>
                           </select>
                        </div>

                      </div>
                      <div class="row">
                        <div class="form-group col-md-7" id="div_item2">
                          <label for="select_item_add2">Item:</label>
                          <select disabled name="select_item_add2" data-live-search="true" title="Selecione uma opção" id="select_item_add2" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-2" id="div_unidade2">
                          <div class="input-group">
                            <label for="select_medida2" data-toggle="tooltip" data-placement="top" title="Unidade de Medida">Unidade:</label>
                            <select disabled name="select_medida2" id="select_medida2" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl2">
                          <label for="p_liquido2">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido2" name="p_liquido2"  >
                            <span id="span_liquido2" class="input-group-addon">&nbsp;</span>
                          </div>
                        </div>
                      </div>
                       <br/>
                       <div class="row">
                           <div class="col-md-4 col-md-offset-4">
                               <a id="botaoAdicionar2" class="btn btn-default btn-block">Adicionar a Lista</a>
                           </div>
                       </div>
                       <br/>
                       <div class="row">
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                               <div class="col-md-6">
                                   <div class="text-center"><h5><b>Lista dos itens cadastrados</b></h5></div>
                               </div>
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                       </div>
                       <div class="panel panel-default">
                         <div class="panel-body panel-lista">
                           <ul class="titulo">
                             <li class="panel">
                               <div class="row">
                                   <div class="col-md-3">
                                       <h5><b>REFEICÃO</b></h5>
                                   </div>
                                   <div class="col-md-5">
                                       <h5><b>ITEM</b></h5>
                                   </div>
                                   <div class="col-md-2">
                                       <h5><b>QUANTIDADE</b></h5>
                                   </div>
                                   <div class="col-md-2 text-center">
                                       <h5><b>EXCLUIR</b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable" id="nicescroll2">
                             <div id="listaVazia2">
                                 <div class="text-center">
                                     <div class="alert alert-warning" role="alert">
                                         <b>Lista Vazia</b>
                                     </div>
                                 </div>
                             </div>
                             <div id="listaItens2"></div>
                           </ul>
                        </div>
                     </div>
                   </fieldset>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="tab_3">
                    <fieldset disabled id="fieldset_3" class="scheduler-border">
                      <legend class="scheduler-border"><h5>Adicionar Item:</h5></legend>
                      <div class="row">
                          <div class="form-group col-md-4" id="div_tipo_refeicao3">
                            <label for="tipo_refeicao3">Tipo de Refeição:</label>
                            <select name="tipo_refeicao3" id="select_tipo_refeicao3" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>
                          <div class="form-group col-md-4" id="div_tipo_item3">
                            <label for="select_tipo_item3">Tipo do Item:</label>
                            <select name="select_tipo_item3" id="select_tipo_item3" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        <div class="form-group col-md-4" id="div_fonte3">
                          <label for="select_fonte3">Fonte:</label>
                          <select name="select_fonte3" id="select_fonte3" onchange="" class="form-control form-control">
                             <option value="0" selected="selected">Todas as fontes</option>
                           </select>
                        </div>

                      </div>
                      <div class="row">
                        <div class="form-group col-md-7" id="div_item3">
                          <label for="select_item_add3">Item:</label>
                          <select disabled name="select_item_add3" data-live-search="true" title="Selecione uma opção" id="select_item_add3" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-2" id="div_unidade3">
                          <div class="input-group">
                            <label for="select_medida3" data-toggle="tooltip" data-placement="top" title="Unidade de Medida">Unidade:</label>
                            <select disabled name="select_medida3" id="select_medida3" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl3">
                          <label for="p_liquido3">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido3" name="p_liquido3"  >
                            <span id="span_liquido3" class="input-group-addon">&nbsp;</span>
                          </div>
                        </div>
                      </div>
                       <br/>
                       <div class="row">
                           <div class="col-md-4 col-md-offset-4">
                               <a id="botaoAdicionar3" class="btn btn-default btn-block">Adicionar a Lista</a>
                           </div>
                       </div>
                       <br/>
                       <div class="row">
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                               <div class="col-md-6">
                                   <div class="text-center"><h5><b>Lista dos itens cadastrados</b></h5></div>
                               </div>
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                       </div>
                       <div class="panel panel-default">
                         <div class="panel-body panel-lista">
                           <ul class="titulo">
                             <li class="panel">
                               <div class="row">
                                   <div class="col-md-3">
                                       <h5><b>REFEICÃO</b></h5>
                                   </div>
                                   <div class="col-md-5">
                                       <h5><b>ITEM</b></h5>
                                   </div>
                                   <div class="col-md-2">
                                       <h5><b>QUANTIDADE</b></h5>
                                   </div>
                                   <div class="col-md-2 text-center">
                                       <h5><b>EXCLUIR</b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable" id="nicescroll3">
                             <div id="listaVazia3">
                                 <div class="text-center">
                                     <div class="alert alert-warning" role="alert">
                                         <b>Lista Vazia</b>
                                     </div>
                                 </div>
                             </div>
                             <div id="listaItens3"></div>
                           </ul>
                        </div>
                     </div>
                   </fieldset>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="tab_4">
                    <fieldset disabled id="fieldset_4" class="scheduler-border">
                      <legend class="scheduler-border"><h5>Adicionar Item:</h5></legend>
                      <div class="row">
                          <div class="form-group col-md-4" id="div_tipo_refeicao4">
                            <label for="tipo_refeicao4">Tipo de Refeição:</label>
                            <select name="tipo_refeicao4" id="select_tipo_refeicao4" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>
                          <div class="form-group col-md-4" id="div_tipo_item4">
                            <label for="select_tipo_item4">Tipo do Item:</label>
                            <select name="select_tipo_item4" id="select_tipo_item4" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        <div class="form-group col-md-4" id="div_fonte4">
                          <label for="select_fonte4">Fonte:</label>
                          <select name="select_fonte4" id="select_fonte4" onchange="" class="form-control form-control">
                             <option value="0" selected="selected">Todas as fontes</option>
                           </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-7" id="div_item4">
                          <label for="select_item_add4">Item:</label>
                          <select disabled name="select_item_add4" data-live-search="true" title="Selecione uma opção" id="select_item_add4" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-2" id="div_unidade4">
                          <div class="input-group">
                            <label for="select_medida4" data-toggle="tooltip" data-placement="top" title="Unidade de Medida">Unidade:</label>
                            <select disabled name="select_medida4" id="select_medida4" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl4">
                          <label for="p_liquido4">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido4" name="p_liquido4"  >
                            <span id="span_liquido4" class="input-group-addon">&nbsp;</span>
                          </div>
                        </div>
                      </div>
                       <br/>
                       <div class="row">
                           <div class="col-md-4 col-md-offset-4">
                               <a id="botaoAdicionar4" class="btn btn-default btn-block">Adicionar a Lista</a>
                           </div>
                       </div>
                       <br/>
                       <div class="row">
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                               <div class="col-md-6">
                                   <div class="text-center"><h5><b>Lista dos itens cadastrados</b></h5></div>
                               </div>
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                       </div>
                       <div class="panel panel-default">
                         <div class="panel-body panel-lista">
                           <ul class="titulo">
                             <li class="panel">
                               <div class="row">
                                   <div class="col-md-3">
                                       <h5><b>REFEICÃO</b></h5>
                                   </div>
                                   <div class="col-md-5">
                                       <h5><b>ITEM</b></h5>
                                   </div>
                                   <div class="col-md-2">
                                       <h5><b>QUANTIDADE</b></h5>
                                   </div>
                                   <div class="col-md-2 text-center">
                                       <h5><b>EXCLUIR</b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable" id="nicescroll4">
                             <div id="listaVazia4">
                                 <div class="text-center">
                                     <div class="alert alert-warning" role="alert">
                                         <b>Lista Vazia</b>
                                     </div>
                                 </div>
                             </div>
                             <div id="listaItens4"></div>
                           </ul>
                        </div>
                     </div>
                   </fieldset>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="tab_5">
                    <fieldset disabled id="fieldset_5" class="scheduler-border">
                      <legend class="scheduler-border"><h5>Adicionar Item:</h5></legend>
                      <div class="row">
                          <div class="form-group col-md-4" id="div_tipo_refeicao5">
                            <label for="tipo_refeicao5">Tipo de Refeição:</label>
                            <select name="tipo_refeicao5" id="select_tipo_refeicao5" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>
                          <div class="form-group col-md-4" id="div_tipo_item5">
                            <label for="select_tipo_item5">Tipo do Item:</label>
                            <select name="select_tipo_item5" id="select_tipo_item5" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        <div class="form-group col-md-4" id="div_fonte5">
                          <label for="select_fonte5">Fonte:</label>
                          <select name="select_fonte5" id="select_fonte5" onchange="" class="form-control form-control">
                             <option value="0" selected="selected">Todas as fontes</option>
                           </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-7" id="div_item5">
                          <label for="select_item_add5">Item:</label>
                          <select disabled name="select_item_add5" data-live-search="true" title="Selecione uma opção" id="select_item_add5" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-2" id="div_unidade5">
                          <div class="input-group">
                            <label for="select_medida5" data-toggle="tooltip" data-placement="top" title="Unidade de Medida">Unidade:</label>
                            <select disabled name="select_medida5" id="select_medida5" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl">
                          <label for="p_liquido5">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido5" name="p_liquido5"  >
                            <span id="span_liquido5" class="input-group-addon">&nbsp;</span>
                          </div>
                        </div>
                      </div>
                       <br/>
                       <div class="row">
                           <div class="col-md-4 col-md-offset-4">
                               <a id="botaoAdicionar5" class="btn btn-default btn-block">Adicionar a Lista</a>
                           </div>
                       </div>
                       <br/>
                       <div class="row">
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                               <div class="col-md-6">
                                   <div class="text-center"><h5><b>Lista dos itens cadastrados</b></h5></div>
                               </div>
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                       </div>
                       <div class="panel panel-default">
                         <div class="panel-body panel-lista">
                           <ul class="titulo">
                             <li class="panel">
                               <div class="row">
                                   <div class="col-md-3">
                                       <h5><b>REFEICÃO</b></h5>
                                   </div>
                                   <div class="col-md-5">
                                       <h5><b>ITEM</b></h5>
                                   </div>
                                   <div class="col-md-2">
                                       <h5><b>QUANTIDADE</b></h5>
                                   </div>
                                   <div class="col-md-2 text-center">
                                       <h5><b>EXCLUIR</b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable" id="nicescroll5">
                             <div id="listaVazia5">
                                 <div class="text-center">
                                     <div class="alert alert-warning" role="alert">
                                         <b>Lista Vazia</b>
                                     </div>
                                 </div>
                             </div>
                             <div id="listaItens5"></div>
                           </ul>
                        </div>
                     </div>
                   </fieldset>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="tab_6">
                    <fieldset disabled id="fieldset_6" class="scheduler-border">
                      <legend class="scheduler-border"><h5>Adicionar Item:</h5></legend>
                      <div class="row">
                          <div class="form-group col-md-4" id="div_tipo_refeicao6">
                            <label for="tipo_refeicao6">Tipo de Refeição:</label>
                            <select name="tipo_refeicao6" id="select_tipo_refeicao6" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>
                          <div class="form-group col-md-4" id="div_tipo_item6">
                            <label for="select_tipo_item6">Tipo do Item:</label>
                            <select name="select_tipo_item6" id="select_tipo_item6" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        <div class="form-group col-md-4" id="div_fonte6">
                          <label for="select_fonte6">Fonte:</label>
                          <select disabled name="select_fonte6" id="select_fonte6" onchange="" class="form-control form-control">
                             <option value="0" selected="selected">Todas as fontes</option>
                           </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-7" id="div_item6">
                          <label for="select_item_add6">Item:</label>
                          <select disabled name="select_item_add6" data-live-search="true" title="Selecione uma opção" id="select_item_add6" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-2" id="div_unidade6">
                          <div class="input-group">
                            <label for="select_medida6" data-toggle="tooltip" data-placement="top" title="Unidade de Medida">Unidade:</label>
                            <select disabled name="select_medida6" id="select_medida6" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl6">
                          <label for="p_liquido6">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido6" name="p_liquido6" >
                            <span id="span_liquido6" class="input-group-addon">&nbsp;</span>
                          </div>
                        </div>
                      </div>

                       <br/>
                       <div class="row">
                           <div class="col-md-4 col-md-offset-4">
                               <a id="botaoAdicionar6" class="btn btn-default btn-block">Adicionar a Lista</a>
                           </div>
                       </div>
                       <br/>
                       <div class="row">
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                               <div class="col-md-6">
                                   <div class="text-center"><h5><b>Lista dos itens cadastrados</b></h5></div>
                               </div>
                               <div class="col-md-3">
                                   <hr/>
                               </div>
                       </div>
                       <div class="panel panel-default">
                         <div class="panel-body panel-lista">
                           <ul class="titulo">
                             <li class="panel">
                               <div class="row">
                                   <div class="col-md-3">
                                       <h5><b>REFEICÃO</b></h5>
                                   </div>
                                   <div class="col-md-5">
                                       <h5><b>ITEM</b></h5>
                                   </div>
                                   <div class="col-md-2">
                                       <h5><b>QUANTIDADE</b></h5>
                                   </div>
                                   <div class="col-md-2 text-center">
                                       <h5><b>EXCLUIR</b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable" id="nicescroll6">
                             <div id="listaVazia6">
                                 <div class="text-center">
                                     <div class="alert alert-warning" role="alert">
                                         <b>Lista Vazia</b>
                                     </div>
                                 </div>
                             </div>
                             <div id="listaItens6"></div>
                           </ul>
                        </div>
                     </div>
                   </fieldset>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- nav-tabs-custom -->
                </div>

               </div>

            </form>

          </div>
      </div>

        <div id="renderPDF">
          <table class="table table-bordered table-condensed" id='table_cardapio'>
            <thead>
              <tr class="alert alert-success">
                <th colspan="15" class="text-center"><strong>SECRETARIA MUNICIPAL DE EDUCAÇÃO DE SÃO GONÇALO DO RIO ABAIXO</strong></th>
              </tr>
              <tr>
                <th colspan="15" class="text-center"></th>
              </tr>
              <tr class="alert alert-success">
                <td colspan="15" class="text-center"><strong><span id="td_modalidade">CARDÁPIO ETAPA/MODALIDADE DE ENSINO (FAIXA ETÁRIA)</span></strong></td>
              </tr>
              <tr class="success">
                <td colspan="15" class="text-center"><strong><span id="span_mes_ano">Mês/Ano</span></strong></td>
              </tr>
              <tr class="success">
                <td class="text-center" colspan="3"><strong>Refeição<br/>Horário</strong></td>
                <td class="text-center" colspan="2"><strong>2ª FEIRA</strong><br><span id="td_dia1">dia/mês</span></td>
                <td class="text-center" colspan="2"><strong>3ª FEIRA</strong><br><span id="td_dia2">dia/mês</span></td>
                <td class="text-center" colspan="2"><strong>4ª FEIRA</strong><br><span id="td_dia3">dia/mês</span></td>
                <td class="text-center" colspan="2"><strong>5ª FEIRA</strong><br><span id="td_dia4">dia/mês</span></td>
                <td class="text-center" colspan="2"><strong>6ª FEIRA</strong><br><span id="td_dia5">dia/mês</span></td>
                <td class="text-center" colspan="2"><strong>SÁBADO</strong><br><span id="td_dia6">dia/mês</span></td>
              </tr>
            </thead>
            <tbody>

            </tbody>
            <tfoot>
              <tr class="success">
                <td class="text-center" colspan="3" rowspan="2"><br><strong>Composição nutricional&nbsp;&nbsp;&nbsp;&nbsp; (Média semanal)</strong></td>
                <td colspan="1" class="text-center"><font size=2><strong>Calorias</strong><br>(Kcal)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Carboidratos</strong><br>(g)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Proteínas</strong><br>(g)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Lipídios</strong><br>(g)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Fibras</strong><br>(g)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Vitamina A</strong><br>(μg)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Vitamina C</strong><br>(mg)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Cálcio</strong><br>(mg)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Ferro</strong><br>(mg)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Magnésio</strong><br>(mg)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Zinco</strong><br>(mg)</font></td>
                <td colspan="1" class="text-center"><font size=2><strong>Sódio</strong><br>(mg)</font></td>

              </tr>
              <tr class="success">
                <td colspan="1" class="text-center"><font size=2><span id="td_span_calorias">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_carboidratos">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_proteinas">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_lipidios">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_fibras">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_vit_a">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_vit_c">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_calcio">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_ferro">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_magnesio">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_zinco">0.00</span></font></td>
                <td colspan="1" class="text-center"><font size=2><span id="td_span_sodio">0.00</span></font></td>
              </tr>

              <tr class="success">
                <td colspan="15" class="text-right"><font size=1>{{Auth::user()->name}}, {{Auth::user()->crn}} - Assinatura: ______________________.</font></td>
              </tr>
            </tfoot>
          </table>
          <!--table class="table table-bordered table-condensed" id='table_cardapio'>
            <thead>
              <tr class="alert alert-success">
                <th colspan="20" class="text-center"><strong>SECRETARIA MUNICIPAL DE EDUCAÇÃO DE SÃO GONÇALO DO RIO ABAIXO</strong></th>
              </tr>
              <tr>
                <th colspan="20" class="text-center"></th>
              </tr>
              <tr class="alert alert-success">
                <td colspan="20" class="text-center"><strong><span id="td_modalidade">CARDÁPIO ETAPA/MODALIDADE DE ENSINO (FAIXA ETÁRIA)</span></strong></td>
              </tr>
              <tr class="success">
                <td colspan="20" class="text-center"><strong><span id="span_mes_ano">Mês/Ano</span></strong></td>
              </tr>
              <tr class="success">
                <td></td>
                <td class="text-center" colspan="3"><strong>2ª FEIRA</strong><br><span id="td_dia1">dia/mês</span></td>
                <td class="text-center" colspan="3"><strong>3ª FEIRA</strong><br><span id="td_dia2">dia/mês</span></td>
                <td class="text-center" colspan="3"><strong>4ª FEIRA</strong><br><span id="td_dia3">dia/mês</span></td>
                <td class="text-center" colspan="3"><strong>5ª FEIRA</strong><br><span id="td_dia4">dia/mês</span></td>
                <td class="text-center" colspan="3"><strong>6ª FEIRA</strong><br><span id="td_dia5">dia/mês</span></td>
                <td class="text-center" colspan="4"><strong>SÁBADO</strong><br><span id="td_dia6">dia/mês</span></td>
              </tr>
            </thead>
            <tbody>

            </tbody>
            <tfoot>
              <tr class="success">
                <td class="text-center" colspan="4" rowspan="4"><br><br></br><strong>Composição nutricional<br>(Média semanal)</ strong></td>
                <td class="text-center"><font size=1><strong>Calorias</strong><br>(Kcal)</font></td>
                <td class="text-center"><font size=1><strong>CHO</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>PTN</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>LPD</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>Fibras</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>Vit. A</strong><br>(μg)</font></td>
                <td class="text-center"><font size=1><strong>Vit. C</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Vit. D</strong><br>(μg)</font></td>
                <td class="text-center"><font size=1><strong>Vit. E</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Vit. B1</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Vit. B2</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Vit. B6</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Vit. B12</strong><br>(μg)</font></td>
                <td class="text-center"><font size=1><strong>Niacina</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Ac. Fól.</strong><br>(μg)</font></td>
                <td class="text-center"><font size=1><strong>Ác. Pant.</strong><br>(mg)</font></td>
              </tr>
              <tr class="success">
                <td class="text-center"><font size=1><span id="td_span_calorias">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_carboidratos">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_proteinas">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_lipidios">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_fibras">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_a">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_c">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_d">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_e">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_b1">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_b2">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_b6">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_vit_b12">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_niacina">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_folico">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_pantotenico">0.00</span></font></td>
              </tr>
              <tr class="success">
                <td class="text-center"><font size=1><strong>Cálcio</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Ferro</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Magnésio</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Potássio</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Selênio</strong><br>(μg)</font></td>
                <td class="text-center"><font size=1><strong>Fósforo</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Iodo</strong><br>(μg)</font></td>
                <td class="text-center"><font size=1><strong>Cobre</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>Zinco</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>Sódio</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>G. Total</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>Colest.</strong><br>(mg)</font></td>
                <td class="text-center"><font size=1><strong>G. Sat.</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>G. Poli.</strong><br>(g)</font></td>
                <td class="text-center"><font size=1><strong>G. Mono.</strong><br>(g)</font></td>
                <td class="text-center" rowspan="2"></td>
              </tr>
              <tr class="success">
                <td class="text-center"><font size=1><span id="td_span_calcio">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_ferro">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_magnesio">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_potassio">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_selenio">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_fosforo">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_iodo">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_cobre">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_zinco">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_sodio">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_g_total">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_colesterol">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_g_saturada">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_g_poliinsaturada">0.00</span></font></td>
                <td class="text-center"><font size=1><span id="td_span_g_monoinsaturada">0.00</span></font></td>
              </tr>
              <tr class="success">
                <td colspan="20" class="text-right"><font size=1>{{Auth::user()->name}}, {{Auth::user()->crn}} - Assinatura: ______________________.</font></td>
              </tr>
            </tfoot>
          </table-->
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js" integrity="sha512-jKxp7JHEN6peEmzmg6a7XJBORNTB0ITD2Pi+6FUkc16PCaNAJX2ahZ1ejn1p1uY37Pxyirn/0OMNZbITbEg3jw==" crossorigin="anonymous"></script>
        <script src="http://localhost:8000/js/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>

        <script src="http://localhost:8000/js/jquery.mask.min.js"></script>
        <script src="http://localhost:8000/js/pnotify.custom.min.js"></script>
        <script src="http://localhost:8000/js/jquery.maskMoney.min.js"></script>
        <script src="http://localhost:8000/js/jquery.inputmask.js"></script>
        <script src="http://localhost:8000/js/jquery.inputmask.extensions.js"></script>
        <script src="http://localhost:8000/js/jquery.inputmask.date.extensions.js"></script>
        <!-- daterangepicker -->
        <script src="http://localhost:8000/js/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/2.1.27/daterangepicker.min.js" integrity="sha512-d954S1Yc34Z+zNUtvoomoCtG1lCzfoENszxOXmqB784muP6G6qEXCug2HXLFn93H05wr3jfHTQwDdLQrUtXxrQ==" crossorigin="anonymous"></script>
        <!-- datepicker -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/js/bootstrap-datepicker.min.js" integrity="sha512-cOGL6gI01KK2Bws211W8S3COhzrorBbzKvLPWYOVtSEYet3yG1fzJrimtwh8rUyvMy9qjgY2e7Rt6IwyaiX1Mg==" crossorigin="anonymous"></script>
        <!-- AdminLTE App -->
        <script src="http://localhost:8000/js/adminlte.min.js"></script>
        <script src="http://localhost:8000/js/dashboard.js"></script>
        <script src="http://localhost:8000/js/relatorios/gerar_pdf_cardapios.min.js"></script>
        <script type="application/javascript">
            <?php
                if(isset($itens)) {
                    echo 'var itens = '.json_encode($itens).';';
                }
                if(isset($fontes)) {
                   echo 'var fontes = '.json_encode($fontes).';';
                }
                if(isset($tipo_refeicoes)) {
                   echo 'var tipo_refeicoes = '.json_encode($tipo_refeicoes).';';
                }
                if(isset($view_preparacoes)) {
                   echo 'var view_preparacoes= '.json_encode($view_preparacoes).';';
                }
                if(isset($itens_cardapio)) {
                   echo 'var itens_cardapio = '.json_encode($itens_cardapio).';';
                }
                if(isset($modalidades_escola)) {
                   echo 'var modalidades_escola= '.json_encode($modalidades_escola).';';
                }
                if(isset($cardapio)) {
                   echo 'var cardapio= '.json_encode($cardapio).';';
                }

                if(isset($referencias)) {
                   echo 'var referencias= '.json_encode($referencias).';';
                }
                if(isset($escolas)) {
                   echo 'var escolas= '.json_encode($escolas).';';
                }
            ?>
        </script>
    </body>
</html>
