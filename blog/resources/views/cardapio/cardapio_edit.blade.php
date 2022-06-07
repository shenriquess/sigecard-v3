@extends('layouts.geral')

@section('content')

  <?php $posicao = 1 ?>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>
        <p class="text-primary">
          <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Editar Cardápio</strong>
        </p>
        <h4>
    </div>

      <div class="panel-body">

        <form class="" action="#" id="id_form" method="POST">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-4">
               <label for="nome">Nome do Cardápio:</label>
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
             <div class="form-group col-md-6" id="div_referencia">
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
               <label>Período:</label>
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
                               <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>

                        </div>
                        <div class="row">
                          <div class="form-group col-md-5" id="div_item1">
                            <label for="select_item_add1">Item:</label>
                            <select name="select_item_add1" data-live-search="true" title="Selecione uma opção" id="select_item_add1" onchange="" class="form-control btn selectpicker">
                               <option value="0" selected="selected">Selecione uma opção</option>
                             </select>
                          </div>
                          <div class="form-group col-md-4" id="div_unidade1">
                            <div class="input-group">
                              <label for="select_medida1">Unidade de Medida:</label>
                              <select disabled name="select_medida1" id="select_medida1" onchange="" class="form-control form-control">
                         				<option value="0" selected="selected">Selecione uma opção</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group col-md-3" id="div_pl1">
                            <label for="p_liquido1">Quantidade:</label>
                            <div class="input-group">
                              <input  disabled type="number" onfocus="this.value='';" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido1" name="p_liquido1">
                              <span id="span_liquido1" class="input-group-addon">g</span>
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
                                         <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Quantidade">QTDE.</span></b></h5>
                                     </div>
                                     <div class="col-md-1 text-center">
                                         <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                                     </div>
                                     <div class="col-md-1 text-center">
                                         <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                                     </div>
                                 </div>
                               </li>
                             </ul>
                             <ul class="lista-itens pre-scrollable">
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
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>

                      </div>
                      <div class="row">
                        <div class="form-group col-md-5" id="div_item2">
                          <label for="select_item_add2">Item:</label>
                          <select name="select_item_add2" data-live-search="true" title="Selecione uma opção" id="select_item_add2" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-4" id="div_unidade2">
                          <div class="input-group">
                            <label for="select_medida2">Unidade de Medida:</label>
                            <select disabled name="select_medida2" id="select_medida2" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl2">
                          <label for="p_liquido2">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido2" name="p_liquido2"  >
                            <span id="span_liquido2" class="input-group-addon">g</span>
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
                                     <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Quantidade">QTDE.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable">
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
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>

                      </div>
                      <div class="row">
                        <div class="form-group col-md-5" id="div_item3">
                          <label for="select_item_add3">Item:</label>
                          <select name="select_item_add3" data-live-search="true" title="Selecione uma opção" id="select_item_add3" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-4" id="div_unidade3">
                          <div class="input-group">
                            <label for="select_medida3">Unidade de Medida:</label>
                            <select disabled name="select_medida3" id="select_medida3" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl3">
                          <label for="p_liquido3">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido3" name="p_liquido3"  >
                            <span id="span_liquido3" class="input-group-addon">g</span>
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
                                     <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Quantidade">QTDE.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable">
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
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-5" id="div_item4">
                          <label for="select_item_add4">Item:</label>
                          <select name="select_item_add4" data-live-search="true" title="Selecione uma opção" id="select_item_add4" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-4" id="div_unidade4">
                          <div class="input-group">
                            <label for="select_medida4">Unidade de Medida:</label>
                            <select disabled name="select_medida4" id="select_medida4" onchange="" class="form-control form-control">
                              <option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl4">
                          <label for="p_liquido4">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido4" name="p_liquido4"  >
                            <span id="span_liquido4" class="input-group-addon">g</span>
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
                                     <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Quantidade">QTDE.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable">
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
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-5" id="div_item5">
                          <label for="select_item_add5">Item:</label>
                          <select name="select_item_add5" data-live-search="true" title="Selecione uma opção" id="select_item_add5" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-4" id="div_unidade5">
                          <div class="input-group">
                            <label for="select_medida5">Unidade de Medida:</label>
                            <select disabled name="select_medida5" id="select_medida5" onchange="" class="form-control form-control">
                       				<option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl">
                          <label for="p_liquido5">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido5" name="p_liquido5"  >
                            <span id="span_liquido5" class="input-group-addon">g</span>
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
                                     <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Quantidade">QTDE.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable">
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
                          <select name="select_fonte6" id="select_fonte6" onchange="" class="form-control form-control">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col-md-5" id="div_item6">
                          <label for="select_item_add6">Item:</label>
                          <select name="select_item_add6" data-live-search="true" title="Selecione uma opção" id="select_item_add6" onchange="" class="form-control btn selectpicker">
                             <option value="0" selected="selected">Selecione uma opção</option>
                           </select>
                        </div>
                        <div class="form-group col-md-4" id="div_unidade6">
                          <div class="input-group">
                            <label for="select_medida6">Unidade de Medida:</label>
                            <select disabled name="select_medida6" id="select_medida6" onchange="" class="form-control form-control">
                       				<option value="0" selected="selected">Selecione uma opção</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-md-3" id="div_pl6">
                          <label for="p_liquido6">Quantidade:</label>
                          <div class="input-group">
                            <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido6" name="p_liquido6" >
                            <span id="span_liquido6" class="input-group-addon">g</span>
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
                                     <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Quantidade">QTDE.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                                   </div>
                                   <div class="col-md-1 text-center">
                                       <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                                   </div>
                               </div>
                             </li>
                           </ul>
                           <ul class="lista-itens pre-scrollable">
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
                <div class="row">
                  <div class="col-md-3 text-center">
                    <a class="btn btn-primary btn-spinner btn-xs  m-b-0" data-toggle="modal" data-target="#myModalTable"><i class="fas fa-eye"></i></i>&nbsp; Visualizar Cardápio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a><br />
                  </div>
                  <div class="col-md-3 text-center">
                    <a class="btn btn-info btn-spinner btn-xs m-b-0" data-placement="top" title="Informações Nutricionais do Cardápio" data-toggle="modal" data-target="#myModal"><i class="fas fa-info-circle"></i>&nbsp; Informações Nutricionais</a><br />
                  </div>
                  <div class="col-md-3 text-center">
                    <a class="btn btn-info btn-spinner btn-xs  m-b-0" data-placement="top" title="Valores da Referência Nutricional" data-toggle="modal" data-target="#myModalRef"><i class="fas fa-info-circle"></i>&nbsp; Referência Nutricional</a>
                  </div>
                  <div class="col-md-3 text-center">
                    <a class="btn btn-success btn-spinner btn-xs  m-b-0" data-toggle="modal" data-target="#modalExpandirGrafico"><i class="fas fa-chart-bar"></i>&nbsp; Gráfico Comparativo</a>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="form-group col-md-4"></div>
                  <div class="form-group col-md-4" id="div_pl">
                    <label for="p_liquido5">Valor Total do Cardápio:</label>
                    <div class="input-group">
                      <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="valor" name="valor"  >
                      <span id="valor" class="input-group-addon">R$</span>
                    </div>
                  </div>
                  <div class="form-group col-md-4"></div>

                </div>
                <br />
              </div>
              <!-- nav-tabs-custom -->
            </div>

           </div>
           <div class="box-body" hidden>
             <div class="chart" id="div_chart">
               <canvas id="barChart" style="height:230px"></canvas>
             </div>
           </div>

           <div class="row">
             <div class="form-group col-md-12" align="center">
              <button id="confBotaoEnviarUpdate" type="button" class="btn btn-primary">Salvar</button>
              <a href="{{ URL::previous() }}" class="btn btn-danger" id="btn_cancelar">Cancelar</a>
            </div>
           </div>

        </form>

      </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="text-center"><h4 class="modal-title" id="myModalLabel">Informações Nutricionais</h4></div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="row">
             <div class="form-group col-md-2" id="div_calorias">
               <label for="calorias">Energia:</label>
               <div class="input-group  input-group-sm">
                 <input  type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.00" class="form-control" id="calorias" name="calorias"  >
                 <span class="input-group-addon">Kcal</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_carboidratos">
                 <label for="carboidratos">Carboidratos:</label>
                 <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="carboidratos" name="carboidratos"  >
                   <span class="input-group-addon">g</span>
                 </div>
            </div>
            <div class="form-group col-md-2" id="div_proteinas">
              <label for="proteinas">Proteínas:</label>
                 <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="proteinas" name="proteinas"  >
                   <span class="input-group-addon">g</span>
                 </div>
            </div>
            <div class="form-group col-md-2" id="div_lipidios">
               <label for="lipidios">Lipídios:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="lipidios" name="lipidios"  >
                   <span class="input-group-addon">g</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_fibras">
              <label for="fibras">Fibras:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any"value="0.000" class="form-control" id="fibras" name="fibras"  >
                  <span class="input-group-addon">g</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_vitamina_a">
              <label for="vitamina_a">Vitamina A:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_a" name="vitamina_a"  >
                  <span class="input-group-addon">μg</span>
              </div>
           </div>
          </div>

          <div class="row">
            <div class="form-group col-md-2" id="div_vitc">
               <label for="vitamina_c">Vitamina C:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_c" name="vitamina_c"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_vitd">
               <label for="vitamina_d">Vitamina D:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_d" name="vitamina_d"  >
                   <span class="input-group-addon">µg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_vite">
              <label for="vitamina_e">Vitamina E:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_e" name="vitamina_e"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_vitb1">
              <label for="vitamina_b1">Vitamina B1:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_b1" name="vitamina_b1"  >
                  <span class="input-group-addon">mg</span>
              </div>
           </div>
           <div class="form-group col-md-2" id="div_vitb2">
              <label for="vitamina_b2">Vitamina B2:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_b2" name="vitamina_b2"  >
                  <span class="input-group-addon">mg</span>
              </div>
           </div>
           <div class="form-group col-md-2" id="div_vitb6">
              <label for="vitamina_b6">Vitamina B6:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_b6" name="vitamina_b6"  >
                  <span class="input-group-addon">mg</span>
              </div>
           </div>
          </div>

          <div class="row">
             <div class="form-group col-md-2" id="div_vitb12">
               <label for="vitamina_b12">Vitamina B12:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_b12" name="vitamina_b12"  >
                   <span class="input-group-addon">µg</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_niacina">
               <label for="niacina">Niacina:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="niacina" name="niacina"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_folico">
               <label for="folico">Ácido Fólico:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="folico" name="folico"  >
                   <span class="input-group-addon">µg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_pantotenico">
               <label for="pantotenico" data-toggle="tooltip" data-placement="top" title="Ácido Pantotênico">Ácido Pant:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="pantotenico" name="pantotenico"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_calcio">
              <label for="calcio">Calcio:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="calcio" name="calcio"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_ferro">
               <label for="ferro">Ferro:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="ferro" name="ferro"  >
                   <span class="input-group-addon">mg</span>
               </div>
             </div>
          </div>

          <div class="row">
             <div class="form-group col-md-2" id="div_magnesio">
               <label for="magnesio">Magnésio:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="magnesio" name="magnesio"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_potassio">
              <label for="potassio">Potássio:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="potassio" name="potassio"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_selenio">
              <label for="selenio">Selênio:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="selenio" name="selenio"  >
                  <span class="input-group-addon">µg</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_fosforo">
               <label for="fosforo">Fósforo:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="fosforo" name="fosforo"  >
                   <span class="input-group-addon">mg</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_iodo">
               <label for="iodo">Iodo:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="iodo" name="iodo"  >
                   <span class="input-group-addon">µg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_cobre">
              <label for="cobre">Cobre:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="cobre" name="cobre"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="form-group col-md-2" id="div_zinco">
              <label for="zinco">Zinco:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="zinco" name="zinco"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_sodio">
               <label for="sodio">Sódio</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="sodio" name="sodio"  >
                   <span class="input-group-addon">mg</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_gtotal">
               <label for="gordura_total">Gordura Total:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_total" name="gordura_total"  >
                   <span class="input-group-addon">g</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_colesterol">
              <label for="colesterol">Colesterol:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="colesterol" name="colesterol"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_gsaturada">
              <label for="gordura_saturada" data-toggle="tooltip" data-placement="top" title="Gordura Saturada">G. Saturada:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_saturada" name="gordura_saturada"  >
                  <span class="input-group-addon">g</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_gpoliinsaturada">
               <label for="gordura_poliinsaturada" data-toggle="tooltip" data-placement="top" title="Gordura Poliinsaturada">G. Poli:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_poliinsaturada" name="gordura_poliinsaturada"  >
                   <span class="input-group-addon">g</span>
               </div>
             </div>
          </div>

          <div class="row">
             <div class="form-group col-md-2" id="div_gmonoinsaturada">
               <label for="gordura_monoinsaturada" data-toggle="tooltip" data-placement="top" title="Gordura Monoinsaturada">G. Mono:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000"  min="0" step="any" value="0.000" class="form-control" id="gordura_monoinsaturada" name="gordura_monoinsaturada"  >
                   <span class="input-group-addon">g</span>
               </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Ref. Nutricional -->
  <div class="modal fade" id="myModalRef" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="text-center"><h4 class="modal-title" id="myModalLabelref">Informações Nutricionais da Referência</h4></div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="form-group col-md-6">
              <h4><strong>Nome: </strong><span id="nome_referencia"></span></h4>
            </div>
            <div class="form-group col-md-6">
              <h4><strong>Descrição: </strong><span id="descricao_referencia"></span></h4>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <h4><strong>Categoria de Ensino: </strong><span id="categoria_referencia"></span></h4>
            </div>
            <div class="form-group col-md-6">
              <h4><strong>Idade dos Alunos: </strong><span id="idade_referencia"></span></h4>
            </div>
          </div>
          <div class="row">
             <div class="form-group col-md-2" id="div_calorias_ref">
               <label for="calorias_ref">Calorias:</label>
               <div class="input-group  input-group-sm">
                 <input  type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.00" class="form-control" id="calorias_ref" name="calorias_ref"  >
                 <span class="input-group-addon">Kcal</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_carboidratos_ref">
                 <label for="carboidratos_ref">Carboidratos:</label>
                 <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="carboidratos_ref" name="carboidratos_ref"  >
                   <span class="input-group-addon">g</span>
                 </div>
            </div>
            <div class="form-group col-md-2" id="div_proteinas_ref">
              <label for="proteinas_ref">Proteínas:</label>
                 <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="proteinas_ref" name="proteinas_ref"  >
                   <span class="input-group-addon">g</span>
                 </div>
            </div>
            <div class="form-group col-md-2" id="div_lipidios_ref">
               <label for="lipidios_ref">Lipídios:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="lipidios_ref" name="lipidios_ref"  >
                   <span class="input-group-addon">g</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_fibras_ref">
              <label for="fibras_ref">Fibras:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any"value="0.000" class="form-control" id="fibras_ref" name="fibras_ref"  >
                  <span class="input-group-addon">g</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_vitamina_a_ref">
              <label for="vitamina_a_ref">Vitamina A:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_a_ref" name="vitamina_a_ref"  >
                  <span class="input-group-addon">μg</span>
              </div>
           </div>
          </div>

          <div class="row">
            <div class="form-group col-md-2" id="div_vitamina_c_ref">
               <label for="vitamina_c_ref">Vitamina C:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_c_ref" name="vitamina_c_ref"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_vitamina_d_ref">
               <label for="vitamina_d_ref">Vitamina D:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_d_ref" name="vitamina_d_ref"  >
                   <span class="input-group-addon">µg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_vitamina_e_ref">
              <label for="vitamina_e_ref">Vitamina E:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_e_ref" name="vitamina_e_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_vitamina_b1_ref">
              <label for="vitamina_b1_ref">Vitamina B1:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_b1_ref" name="vitamina_b1_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
           </div>
           <div class="form-group col-md-2" id="div_vitamina_b2_ref">
              <label for="vitamina_b2_ref">Vitamina B2:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_b2_ref" name="vitamina_b2_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
           </div>
           <div class="form-group col-md-2" id="div_vitamina_b6_ref">
              <label for="vitamina_b6_ref">Vitamina B6:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_b6_ref" name="vitamina_b6_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
           </div>
          </div>
          <div class="row">
             <div class="form-group col-md-2" id="div_vitamina_b12_ref">
               <label for="vitamina_b12_ref">Vitamina B12:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_b12_ref" name="vitamina_b12_ref"  >
                   <span class="input-group-addon">µg</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_niacina_ref">
               <label for="niacina_ref">Niacina:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="niacina_ref" name="niacina_ref"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_folico_ref">
               <label for="folico_ref">Ácido Fólico:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="folico_ref" name="folico_ref"  >
                   <span class="input-group-addon">µg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_pantotenico_ref">
               <label for="pantotenico_ref" data-toggle="tooltip" data-placement="top" title="Ácido Pantotênico">Ácido Pant:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="pantotenico_ref" name="pantotenico_ref"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_calcio_ref">
              <label for="calcio_ref">Calcio:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="calcio_ref" name="calcio_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_ferro_ref">
               <label for="ferro_ref">Ferro:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="ferro_ref" name="ferro_ref"  >
                   <span class="input-group-addon">mg</span>
               </div>
             </div>
          </div>
          <div class="row">
             <div class="form-group col-md-2" id="div_magnesio_ref">
               <label for="magnesio_ref">Magnésio:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="magnesio_ref" name="magnesio_ref"  >
                   <span class="input-group-addon">mg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_potassio_ref">
              <label for="potassio_ref">Potássio:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="potassio_ref" name="potassio_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_selenio_ref">
              <label for="selenio_ref">Selênio:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="selenio_ref" name="selenio_ref"  >
                  <span class="input-group-addon">µg</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_fosforo_ref">
               <label for="fosforo_ref">Fósforo:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="fosforo_ref" name="fosforo_ref"  >
                   <span class="input-group-addon">mg</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_iodo_ref">
               <label for="iodo_ref">Iodo:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="iodo_ref" name="iodo_ref"  >
                   <span class="input-group-addon">µg</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_cobre_ref">
              <label for="cobre_ref">Cobre:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="cobre_ref" name="cobre_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-2" id="div_zinco_ref">
              <label for="zinco_ref">Zinco:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="zinco_ref" name="zinco_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_sodio_ref">
               <label for="sodio_ref">Sódio</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="sodio_ref" name="sodio_ref"  >
                   <span class="input-group-addon">mg</span>
               </div>
             </div>
             <div class="form-group col-md-2" id="div_gtotal_ref">
               <label for="gordura_total_ref">Gordura Total:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_total_ref" name="gordura_total_ref"  >
                   <span class="input-group-addon">g</span>
               </div>
            </div>
            <div class="form-group col-md-2" id="div_colesterol_ref">
              <label for="colesterol_ref">Colesterol:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="colesterol_ref" name="colesterol_ref"  >
                  <span class="input-group-addon">mg</span>
              </div>
            </div>
            <div class="form-group col-md-2" id="div_gsaturada_ref">
              <label for="gordura_saturada_ref" data-toggle="tooltip" data-placement="top" title="Gordura Saturada">G. Saturada:</label>
              <div class="input-group input-group-sm">
                  <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_saturada_ref" name="gordura_saturada_ref"  >
                  <span class="input-group-addon">g</span>
              </div>
            </div>
             <div class="form-group col-md-2" id="div_gpoliinsaturada_ref">
               <label for="gordura_poliinsaturada_ref" data-toggle="tooltip" data-placement="top" title="Gordura Poliinsaturada">G. Poli:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_poliinsaturada_ref" name="gordura_poliinsaturada_ref"  >
                   <span class="input-group-addon">g</span>
               </div>
             </div>
          </div>
          <div class="row">
             <div class="form-group col-md-2" id="div_gmonoinsaturada_ref">
               <label for="gordura_monoinsaturada_ref" data-toggle="tooltip" data-placement="top" title="Gordura Monoinsaturada">G. Mono:</label>
               <div class="input-group input-group-sm">
                   <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000"  min="0" step="any" value="0.000" class="form-control" id="gordura_monoinsaturada_ref" name="gordura_monoinsaturada_ref"  >
                   <span class="input-group-addon">g</span>
               </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="editar_item" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="text-center"><h4 class="modal-title" id="myModalLabel">Editar Item</h4></div>
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        </div>
        <div class="modal-body">
          <fieldset class="scheduler-border">
            <legend class="scheduler-border"><h5>Editar:</h5></legend>
            <div hidden class="row">
                <div class="form-group col-md-4" id="div_tipo_refeicao_edit">
                  <label for="tipo_refeicao_edit">Tipo de Refeição:</label>
                  <select name="tipo_refeicao_edit" id="select_tipo_refeicao_edit" onchange="" class="form-control form-control">
                    <option value="0" selected="selected">Selecione uma opção</option>
                   </select>
                </div>
                <div class="form-group col-md-4" id="div_tipo_item_edit">
                  <label for="select_tipo_item_edit">Tipo do Item:</label>
                  <select name="select_tipo_item_edit" id="select_tipo_item_edit" onchange="" class="form-control form-control">
                    <option value="0" selected="selected">Selecione uma opção</option>
                  </select>
                </div>
              <div class="form-group col-md-4" id="div_fonte_edit">
                <label for="select_fonte_edit">Fonte:</label>
                <select name="select_fonte_edit" id="select_fonte_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Selecione uma opção</option>
                 </select>
              </div>

            </div>
            <div class="row">
              <div class="form-group col-md-5" id="div_item_edit">
                <label for="select_item_add_edit">Item:</label>
                <select name="select_item_add_edit" data-live-search="true" title="Selecione uma opção" id="select_item_add_edit" onchange="" class="form-control btn selectpicker">
                   <option value="0" selected="selected">Selecione uma opção</option>
                 </select>
              </div>
              <div class="form-group col-md-4" id="div_unidade_edit">
                <div class="input-group">
                  <label for="select_medida_edit">Unidade de Medida:</label>
                  <select disabled name="select_medida_edit" id="select_medida_edit" onchange="" class="form-control form-control">
                    <option value="0" selected="selected">Selecione uma opção</option>
                  </select>
                </div>
              </div>
              <div class="form-group col-md-3" id="div_pl_edit">
                <label for="p_liquido_edit">Quantidade:</label>
                <div class="input-group">
                  <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido_edit" name="p_liquido_edit">
                  <span id="span_liquido1" class="input-group-addon">g</span>
                </div>
              </div>
            </div>
             <br/>
             <div class="row">
               <div class="col-md-4 col-md-offset-4">
                   <a id="concluir_edicao" class="btn btn-primary btn-block">Concluir</a>
               </div>
             </div>
           </fieldset>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Cardápio -->
  <div class="modal fade" id="myModalTable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lx" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="text-center"><h4 class="modal-title" id="myModalLabelref">Informações do Cardápio</h4></div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body"  id="renderPDF">
          <div class="table-responsive no-padding">
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
                  <td class="text-center" colspan="3" rowspan="2"><strong><br>Composição nutricional (Média semanal)</strong></td>
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
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Expandir Gráfico-->
  <div class="modal fade" id="modalExpandirGrafico" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lx" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="text-center"><h4 class="modal-title" id="myModalLabel">Gráfico De Comparação de Nutrientes</h4></div>
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                          class="sr-only">Close</span></button>
        </div>
        <div class="modal-body">
          <!-- BAR CHART -->
          <div>
            <div class="box-body">
              <div class="chart" id="div_chart2">
                <canvas id="barChart2" style="height:230px"></canvas>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

@endsection
@section('scripts')
    <script src="/js/cardapios/editar_cardapios.min.js"></script>
    <script src="/js/cardapios/cadastro_cardapios.min.js"></script>
    <script src="/js/cardapios/grafico.min.js"></script>

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

              if(isset($itens_cardapio)) {
                 echo 'var itens_cardapio = '.json_encode($itens_cardapio).';';
              }

              if(isset($view_preparacoes)) {
                 echo 'var view_preparacoes= '.json_encode($view_preparacoes).';';
              }

              if(isset($cardapio)) {
                 echo 'var cardapio= '.json_encode($cardapio).';';
              }
              if(isset($modalidades_escola)) {
                 echo 'var modalidades_escola= '.json_encode($modalidades_escola).';';
              }
              if(isset($referencias)) {
                 echo 'var referencias= '.json_encode($referencias).';';
              }
              if(isset($escolas)) {
                 echo 'var escolas= '.json_encode($escolas).';';
              }
              if(isset($medidas_itens)) {
                 echo 'var medidas_itens = '.json_encode($medidas_itens).';';
              }

              $user = Auth::user()->id;
              echo 'var user = '.json_encode($user).';';
          ?>
    </script>

@endsection
