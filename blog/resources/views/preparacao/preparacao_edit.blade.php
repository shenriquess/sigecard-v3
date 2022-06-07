@extends('layouts.geral')

@section('content')

  <?php $posicao = 2 ?>
  <div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Editar Preparação</strong><h4></div>

      <div class="panel-body">
        <form class="" action="#" id="id_form" method="post">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-4" id="div_nome">
               <label for="nome">Nome da Preparação:</label>
               <input type="text" class="form-control" value="{{ $preparacao->nome }}"  id="nome" name="nome" autofocus>
             </div>
             <div class="form-group col-md-4" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" value="{{ $preparacao->descricao }}" name="descricao"  autofocus>
             </div>
             <div class="form-group col-md-4" id="div_tipo_preparacao">
               <label for="tipo_preparacao">Grupo:</label>
               <select name="tipo_preparacao" id="select_tipo_preparacao" onchange="" class="form-control form-control">
                 <option value="0" selected="selected">Selecione uma opção</option>
                 @foreach($tipo_preparacoes as $tipo_preparacao)
                   <option value="{{$tipo_preparacao->id}}"
                   @if($preparacao->id_tipo_preparacao == $tipo_preparacao->id)
                     selected
                   @endif>{{$tipo_preparacao->nome}}</option>
                 @endforeach
              </select>
             </div>
           </div>
           <fieldset class="scheduler-border">
             <legend class="scheduler-border"><h5>Adicionar ou Remover Ingrediente:</h5></legend>
               <div class="row">
                 <div class="form-group col-md-6" id="div_fonte'">
                   <label for="select_fonte">Fonte de Informações Nutricionais:</label>
                   <select name="select_fonte" id="select_fonte" onchange="" class="form-control form-control">
                      <option value="0" selected="selected">Todas as fontes</option>
                      <?php
                        if($fontes && isset($fontes)){
                            foreach($fontes as $fonte){
                              echo '<option value="' . $fonte->id . '">' . $fonte->nome . '</option>';
                            }
                        }else{

                          session()->flash('mensagem-info','<strong>Por favor, primeiro cadastre um Alimento.</strong>');
                        }

                        ?>
                    </select>
                 </div>
                 <div class="form-group col-md-6" id="div_item">
                   <label for="item">Item:</label>
                   <select name="item" data-live-search="true" title="Selecione uma opção" id="select_item" onchange="" class="form-control btn selectpicker">
                      <option value="0" selected="selected">Selecione uma opção</option>
                    </select>
                 </div>
               </div>
               <div class="row">
                 <div class="form-group col-md-4" id="div_medida">
                   <label for="medida">Medida:</label>
                   <select name="medida" id="select_medida" onchange="" class="form-control form-control">
                      <option value="0" selected="selected">Selecione uma opção</option>
                    </select>
                 </div>
                  <div class="form-group col-md-3" id="div_pb">
                    <label for="p_bruto" data-toggle="tooltip" data-placement="top" title="Per Capta Bruto">PC Bruto:</label>
                    <div class="input-group">
                      <input  disabled type="number" onfocus="this.value='';" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_bruto" name="p_bruto"  >
                      <span id="span_bruto" class="input-group-addon">g</span>
                    </div>
                  </div>
                  <div class="form-group col-md-3" id="div_pl">
                    <label for="p_liquido" data-toggle="tooltip" data-placement="top" title="Per Capta Líquido">PC Líquido:</label>
                    <div class="input-group">
                      <input disabled  type="number" onfocus="this.value='';" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido" name="p_liquido"  >
                      <span id="span_liquido" class="input-group-addon">g</span>
                    </div>
                  </div>
                  <div class="form-group col-md-2" id="div_fc">
                    <label for="f_correcao" data-toggle="tooltip" data-placement="top" title="Fator de Correção">FC:</label>
                      <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="f_correcao" name="f_correcao"  >
                  </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <a id="botaoAdicionar" class="btn btn-default btn-block">Adicionar a Lista</a>
                    </div>
                </div>
                <br/>
                <div class="row">
                        <div class="col-md-3">
                            <hr/>
                        </div>
                        <div class="col-md-6">
                            <div class="text-center"><h5><b>Lista dos ingredientes cadastrados</b></h5></div>
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
                          <div class="col-md-4" style="margin-top: 5px">
                              <h5><b>ITEM</b></h5>
                          </div>
                          <div class="col-md-2" style="margin-top: 5px">
                              <h5><b> <span data-container="body" data-toggle="popover" data-placement="right" data-content="Per Capta Bruto">PB</span></b></h5>
                          </div>
                          <div class="col-md-2" style="margin-top: 5px">
                              <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Per Capta Líquido">PL</span></b></h5>
                          </div>
                          <div class="col-md-2" style="margin-top: 5px">
                              <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Fator de Correção">FC</span></b></h5>
                          </div>
                          <div class="col-md-1 text-center" style="margin-top: 5px">
                              <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                          </div>
                          <div class="col-md-1 text-center" style="margin-top: 5px">
                              <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                          </div>
                      </div>
                    </li>
                   </ul>

                    <ul class="lista-itens pre-scrollable">
                        <div id="listaVazia">
                          <div class="text-center">
                              <div class="alert alert-warning" role="alert">
                                  <b>Lista Vazia</b>
                              </div>
                          </div>
                        </div>
                        <div id="listaItens"></div>
                    </ul>
                  </div>
              </div>
              <br/>
              <div class="row">
                <div class="col-md-3"></div>
                <div class="form-group col-md-3" id="div_total">
                  <label for="p_liquido">Rendimento Total:</label>
                  <div class="input-group">
                    <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any"  class="form-control" id="r_total" name="r_total" value="{{  number_format($preparacao->medida_total, 3, '.', '') }}"  >
                    <span id="span_r_total" class="input-group-addon">g</span>
                  </div>
                </div>
                 <div class="form-group col-md-3" id="div_fcoc">
                   <label for="f_coccao">Fator de Coccão:</label>
                     <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="f_coccao" name="f_coccao"  >
                 </div>
                 <div class="col-md-3"></div>
               </div>
           </fieldset>
           <div class="row">
             <div class="form-group col-md-12">
                    <label for="modo_preparo">Modo de Preparo:</label>
                    <textarea style="resize: none" class="form-control" rows="3" placeholder="" id="modo_preparo" name="modo_preparo">{{ $preparacao->modo_preparo }}</textarea>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-4">
                <button type="button" class="btn btn-default btn-block" data-placement="top" title="Informações Nutricionais da Preparação" data-toggle="modal" data-target="#myModal">
                  Inf. Nutricionais da Preparação
                </button>
              </div>
              <div class="form-group col-md-3" align="center">
                <button type="button" class="btn btn-default btn-block" data-toggle="modal" data-target="#myModalTable">
                  Visualizar Preparação
                </button>

              </div>
              <div class="col-md-2"><h5><p class="text-right"><strong>Valor Total:</strong></p></h5></div>
              <div class="form-group col-md-3" id="div_valor">
                <div class="input-group">
                    <span class="input-group-addon">R$</span>
                    <input type="number" disabled pattern="[0-9]+([,\.][0-9]+)?" max="100000"  min="0" step="any" value="0.00" class="form-control" id="valor" name="valor"  >
                </div>
             </div>
           </div>
           <br/>
           <div class="row">
             <div class="form-group col-md-12" align="center">
              <hr/>
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
          <h4 class="modal-title" id="myModalLabel">Informações Nutricionais</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="row">
             <div class="form-group col-md-2" id="div_calorias">
               <label for="calorias">Calorias:</label>
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
  <div class="modal fade" id="editar_item" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                  <div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Preparação</h4></div>
        </div>
        <div class="modal-body">
          <fieldset class="scheduler-border">
            <legend class="scheduler-border"><h5>Editar:</h5></legend>
            <div class="row">
              <div class="form-group col-md-6" id="div_fonte'">
                <label for="select_fonte_edit">Fonte:</label>
                <select disabled name="select_fonte_edit" id="select_fonte_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Todas as fontes</option>
                   <?php
                     if($fontes && isset($fontes)){
                         foreach($fontes as $fonte){
                           echo '<option value="' . $fonte->id . '">' . $fonte->nome . '</option>';
                         }
                     }else{

                       session()->flash('mensagem-info','<strong>Por favor, primeiro cadastre um Alimento.</strong>');
                     }

                     ?>
                 </select>
              </div>
              <div class="form-group col-md-6" id="div_item">
                <label for="item_edit">Item:</label>
                <select disabled name="item_edit" data-live-search="true" title="Selecione uma opção" id="select_item_edit" onchange="" class="form-control btn selectpicker">
                   <option value="0" selected="selected">Selecione uma opção</option>
                 </select>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6" id="div_medida">
                <label for="medida_edit">Medida:</label>
                <select name="medida_edit" id="select_medida_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Selecione uma opção</option>
                 </select>
              </div>

               <div class="form-group col-md-2" id="div_pb">
                 <label for="p_bruto_edit">PC Bruto:</label>
                 <div class="input-group">
                   <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_bruto_edit" name="p_bruto_edit"  >
                   <span id="span_bruto_edit" class="input-group-addon">g</span>
                 </div>
               </div>
               <div class="form-group col-md-2" id="div_pl_edit">
                 <label for="p_liquido_edit">PC Liquido:</label>
                 <div class="input-group">
                   <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido_edit" name="p_liquido_edit"  >
                   <span id="span_liquido_edit" class="input-group-addon">g</span>
                 </div>
               </div>
               <div class="form-group col-md-2" id="div_fc_edit">
                 <label for="f_correcao_edit">FC:</label>
                   <input disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="f_correcao_edit" name="f_correcao_edit"  >
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

  <!-- Modal Modelo Preparação -->
  <div class="modal fade" id="myModalTable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lx" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabelref">Informações da Preparação</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body"  id="renderPDF">
          <div class="table-responsive no-padding">
            <table class="table table-bordered table-condensed" id='table_preparacao'>
              <thead>
                <tr class="alert alert-success">
                  <th colspan="17" class="text-center"><strong>SECRETARIA MUNICIPAL DE EDUCAÇÃO DE SÃO GONÇALO DO RIO ABAIXO</strong></th>
                </tr>
                <tr>
                  <th colspan="17" class="text-center"></th>
                </tr>
                <tr class="alert alert-success">
                  <td colspan="17" class="text-center"><strong><span id="td_modalidade">FICHA TÉCNICA DE PREPARO</span></strong></td>
                </tr>
                <tr class="success">
                  <td colspan="5" class="text-center"><strong><font size=2>NOME DA PREPARAÇÃO: </strong><span id="span_nome_preparacao"></span></font></td>
                  <td colspan="12" class="text-center"><strong><font size=2>COMPOSIÇÃO NUTRICIONAL</font></strong></td>
                </tr>
                <tr class="success">
                  <td class="text-center" colspan="1"><strong><font size=2>Ingredientes</font></strong></td>
                  <td class="text-center" colspan="1"><strong><font size=2>PB (g)</font></strong></td>
                  <td class="text-center" colspan="1"><strong><font size=2>PL (g)</font></strong></td>
                  <td class="text-center" colspan="1"><strong><font size=2>FC</font></strong></td>
                  <td class="text-center" colspan="1"><strong><font size=2>Custo Unitário</font></strong></td>
                  <td class="text-center"><font size=2><strong>Calorias</strong><br>(Kcal)</font></td>
                  <td class="text-center"><font size=2><strong>CHO</strong><br>(g)</font></td>
                  <td class="text-center"><font size=2><strong>PTN</strong><br>(g)</font></td>
                  <td class="text-center"><font size=2><strong>LPD</strong><br>(g)</font></td>
                  <td class="text-center"><font size=2><strong>Fibras</strong><br>(g)</font></td>
                  <td class="text-center"><font size=2><strong>Vit. A</strong><br>(μg)</font></td>
                  <td class="text-center"><font size=2><strong>Vit. C</strong><br>(mg)</font></td>
                  <td class="text-center"><font size=2><strong>Cálcio</strong><br>(mg)</font></td>
                  <td class="text-center"><font size=2><strong>Ferro</strong><br>(mg)</font></td>
                  <td class="text-center"><font size=2><strong>Magnésio</strong><br>(mg)</font></td>
                  <td class="text-center"><font size=2><strong>Zinco</strong><br>(mg)</font></td>
                  <td class="text-center"><font size=2><strong>Sódio</strong><br>(mg)</font></td>
                </tr>
              </thead>
              <tbody>

              </tbody>
              <tfoot>
                <tr class="success">
                  <td class="text-right" colspan="4"><strong><font size=2>Total: </font></strong></td>
                  <td class="text-center"><font size=1>R$ <span id="td_span_valor">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_calorias">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_carboidratos">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_proteinas">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_lipidios">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_fibras">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_vit_a">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_vit_c">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_calcio">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_ferro">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_magnesio">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_zinco">0,000</span></font></td>
                  <td class="text-center"><font size=1><span id="td_span_sodio"><font size=1>0,000</span></font></td>
                </tr>
                <tr class="success">
                  <td colspan="17"><strong>&nbsp;&nbsp;&nbsp;&nbsp;Modo de Preparo: </strong>
                    <span id="span_modo_preparo"></span>
                  </td>
                </tr>
                <tr class="success">
                  <td colspan="17" class="text-right"><font size=2>{{Auth::user()->name}}, {{Auth::user()->crn}} - Assinatura: ______________________.</font></td>
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

@endsection

@section('scripts')
    <script type="application/javascript">
          <?php
              $update = 1;
              if(isset($itens)) {
                  echo 'var itens = '.json_encode($itens).';';
              }
              if(isset($preparacao)) {
                  echo 'var preparacao = '.json_encode($preparacao).';';
              }
              if(isset($fontes)) {
                 echo 'var fontes = '.json_encode($fontes).';';
              }
              if(isset($itens_preparacao)) {
                 echo 'var itens_preparacao = '.json_encode($itens_preparacao).';';
              }
              if(isset($medidas_itens)) {
                 echo 'var medidas_itens = '.json_encode($medidas_itens).';';
              }
              echo 'var update = '.json_encode($update).';';
          ?>
    </script>
    <script src="/js/preparacoes/editar_preparacoes.min.js"></script>
    <script src="/js/preparacoes/cadastro_preparacoes.js"></script>

@endsection
