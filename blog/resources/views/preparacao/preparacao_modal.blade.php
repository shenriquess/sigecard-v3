@extends('layouts.geral')

@section('content')

  <?php $posicao = 2 ?>
  <div class="panel panel-default" hidden>
    <div class="panel-heading"><h4><strong>Editar Preparação</strong><h4></div>

      <div class="panel-body">
        <form class="" action="#" method="post">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-4" id="div_nome">
               <label for="nome">Nome:</label>
               <input type="text" class="form-control" value="{{ $preparacao->nome }}"  id="nome" name="nome" autofocus>
             </div>
             <div class="form-group col-md-4" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" value="{{ $preparacao->descricao }}" name="descricao"  autofocus>
             </div>
             <div class="form-group col-md-4" id="div_tipo_preparacao">
               <label for="tipo_preparacao">Tipo:</label>
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
                   <label for="select_fonte">Categoria:</label>
                   <select name="select_fonte" id="select_fonte" onchange="" class="form-control form-control">
                      <option value="0" selected="selected">Selecione uma opção</option>
                      <?php
                        if($fontes && isset($fontes)){
                            echo '<option value="30">Todas as fontes</option>';
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
                   <select name="item" data-live-search="true" title="Selecione uma opção" id="select_item" onchange="" class="form-control form-control">
                      <option value="0" selected="selected">Selecione uma opção</option>
                    </select>
                 </div>
               </div>
               <div class="row">
                 <div class="form-group col-md-3" id="div_medida">
                   <label for="medida">Medida:</label>
                   <select name="medida" id="select_medida" onchange="" class="form-control form-control">
                      <option value="0" selected="selected">Selecione uma opção</option>
                    </select>
                 </div>
                  <div class="form-group col-md-3" id="div_pb">
                    <label for="p_bruto">Per Capta Bruto:</label>
                    <div class="input-group">
                      <input  disabled type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_bruto" name="p_bruto"  >
                      <span id="span_bruto" class="input-group-addon">&nbsp;</span>
                    </div>
                  </div>
                  <div class="form-group col-md-3" id="div_pl">
                    <label for="p_liquido">Per Capta Liquido:</label>
                    <div class="input-group">
                      <input disabled  type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="p_liquido" name="p_liquido"  >
                      <span id="span_liquido" class="input-group-addon">&nbsp;</span>
                    </div>
                  </div>
                  <div class="form-group col-md-3" id="div_fc">
                    <label for="f_correcao">Fator Correção:</label>
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
                <div class="row">
                  <div class="col-md-12">
                    <div class="col-md-4">
                        <h5><b>ITEM</b></h5>
                    </div>

                    <div class="col-md-2" data-toggle="tooltip" data-placement="bottom" title="Per Capta Bruto">
                        <h5><b>PB</b></h5>
                    </div>
                    <div class="col-md-2" data-toggle="tooltip" data-placement="bottom" title="Per Capta Líquido">
                        <h5><b>PL</b></h5>
                    </div>
                    <div class="col-md-2" data-toggle="tooltip" data-placement="bottom" title="Fator Correção">
                        <h5><b>FC</b></h5>
                    </div>
                    <div class="col-md-2">
                        <h5><b>EXCLUIR</b></h5>
                    </div>
                  </div>
                </div>
                <br/>
                <div class="col-md-12 pre-scrollable scrollbar-dusty-grass thin square">
                  <div id="listaVazia">
                      <div class="row">
                          <div class="col-md-12">
                              <div class="text-center">
                                  <div class="alert alert-warning" role="alert">
                                      <b>Lista Vazia</b>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div id="listaItens">
                  </div>
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
                <button type="button" class="btn btn-default btn-block" data-toggle="modal" data-target="#myModal">
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
              <a href="{{ URL::previous() }}" class="btn btn-danger">Cancelar</a>
            </div>
            </div>
            </form>
          </div>
      </div>


  <!-- Modal Modelo Preparação -->
  <div class="modal fade" data-backdrop="static" data-keyboard="false"  id="myModalTable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" id="largeModal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalLabelref">Informações da Preparação</h4>
          <a href="{{route('preparation.show')}}" class="close"><span aria-hidden="true">&times;</span></a>          
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
          <a class="btn btn-primary" href="{{route('preparation.pdf', $preparacao->id)}}" target="_blank">Gerar PDF</i></a>
          <a href="{{route('preparation.show')}}" class="btn btn-default">Fechar</a>
        </div>
      </div>
    </div>
  </div>

@endsection

@section('scripts')
    <script src="/js/preparacoes/gerar_pdf_preparacoes.min.js"></script>
    <script src="/js/preparacoes/exibir_modal_preparacao.js"></script>
    <script type="application/javascript">
          <?php
              $update = 1;
              if(isset($itens)) {
                  echo 'var itens = '.json_encode($itens).';';
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


@endsection
