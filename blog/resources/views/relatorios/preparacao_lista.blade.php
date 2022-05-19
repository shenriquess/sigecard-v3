@extends('layouts.geral')

@section('content')

<?php $posicao = 7 ?>
<div class="panel panel-default">
    <div class="panel-heading">
        <h4><strong>Imprimir Preparações</strong></h4></div>
    <div class="panel-body">
        <form class="" action="{{route('preparation.show')}}" method="post">
            {{ csrf_field() }}
            <div class="row">
                <div class="form-group col-md-4">
                    <label for="search2">Grupo:</label>
                </div>
            </div>
            <div class="row">
              <div class="form-group col-md-10" id="div_search">
                  <select name="search" id="search" onchange="" class="form-control form-control">
                      <option value="0" selected="selected">Selecione uma opção</option>
                      @foreach($tipo_preparacoes as $tipo_preparacao)
                      <option value="{{$tipo_preparacao->id}}">{{$tipo_preparacao->nome}}</option>
                      @endforeach
                  </select>
              </div>

                <div class="form-group col-md-2">
                    <input type="submit" name="btnEnviar" class="btn btn-primary" value="Pesquisar">
                </div>
            </div>
            <div class="row">
                <div class="col-md-12" id="conteudo">
                  <br/>
                  @if (isset($preparacoes) && count($preparacoes) > 0)

                <div class="table-responsive no-padding">
                  <table class="table table-hover" id="tabela_preparacoes">
                      <thead>
                        <tr>
                          <th class="col-md-5">PREPARAÇÃO</th>
                          <th class="col-md-5">DESCRIÇÃO</th>
                          <th class="col-md-2 text-center">PDF</th>
                        </tr>
                      </thead>
                      <tbody>
                            @foreach ($preparacoes as $preparacao)
                              <tr>
                                <td class="col-md-5">{{$preparacao->nome}}</td>
                                <td class="col-md-5">{{$preparacao->descricao}}</td>
                                <td class="col-md-2 text-center">
                                  <a class="btn btn-default" href="{{route('report.preparation_modal', $preparacao->id)}}"><i class="far fa-file-pdf"></i></a>
                                </td>
                              </tr>
                              @endforeach

                      </tbody>
                      <tfoot>
                    </table>
                  </div>

                    @else
                        <br/>
                        <div class="col-md-12 text-center alert alert-warning"><strong>Não há registros para exibir.</strong></div>
                    @endif
              </div>
            </div>
            @if (isset($preparacoes) && $preparacoes)
              @foreach ($preparacoes as $preparacao)
                  <div class="modal fade" id="modalDelete{{$preparacao->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                    <div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Preparação</h4></div>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-md-12"><h4>Tem certeza que deseja excluir esta Preparação?</h4></div>
                            </div>
                             <div class="row">
                               <div class="col-md-5"><h4><strong>Nome:</strong>  {{$preparacao->nome}} </h4></div>
                               <div class="col-md-5"><h4><strong>Grupo:</strong> {{$preparacao->nome_tipo_preparacao}} </h4></div>
                             </div>
                             <br/>
                              <div class="row">
                                  <div class="col-md-3">
                                      <hr/>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="text-center"><h5><strong>Lista de ingredientes</strong></h5></div>
                                  </div>
                                 <div class="col-md-3">
                                      <hr/>
                                  </div>
                             </div>
                            @foreach ($itens_preparacao as $item_preparacao)
                              @if($item_preparacao->id_preparacao == $preparacao->id)
                                  <div class="listaItem">
                                      <div class="row">
                                          <div class="col-md-3 item" style="margin-top: 5px">
                                                 {{$item_preparacao->nome}}
                                           </div>
                                       </div>
                                   </div>
                              @endif
                          @endforeach
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        <a href="{{route('preparation.destroy', $preparacao->id)}}" class="btn btn-danger">Excluir</a>
                      </div>
                    </div>
                  </div>
                </div>
            @endforeach
        @endif
        <div class="row">
           <hr/>
           <div class="form-group col-md-5"></div>
           <div class="form-group col-md-2" align="center">
             <a href="{{route('home.index')}}" class="btn btn-default btn-block">Voltar</a>
           </div>
           <div class="form-group col-md-5"></div>
         </div>
        </form>
    </div>
</div>

@endsection

@section('scripts')
    <script src="/js/relatorios/carregar_preparacoes.min.js"></script>
@endsection
