@extends('layouts.geral')

@section('content')

<?php $posicao = 1 ?>

<div class="panel panel-default">
    <div class="panel-heading">
      <h4>
        <p class="text-primary">
          <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Cardápios</strong>
          <a class="btn btn-primary btn-spinner btn-xs pull-right m-b-0" href="{{route('menu.create')}}"><i class="fa fa-plus"></i>&nbsp; Novo Cardápio</a>
        </p>
      </h4>
    </div>
    <div class="panel-body">
        <form class="" action="{{route('menu.show')}}" method="post">
            {{ csrf_field() }}

            <div class="row">
                <div class="form-group col-md-5" id="div_search">
                  <label for="search">Escola:</label>
                    <select name="search" id="search" onchange="" class="form-control form-control">
                        <option value="0" selected="selected">Selecione uma opção</option>
                        @foreach($escolas as $escola)
                        <option value="{{$escola->id}}">{{$escola->nome}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-md-5">
                  <label>Período:</label>
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                    </div>
                    <input type="text" class="form-control pull-right" id="reservation2" name="reservation2">
                  </div>
                  <!-- /.input group -->
                </div>
                <div class="form-group col-md-2">
                  <label for="btnEnviar">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="submit" name="btnEnviar" class="btn btn-default btn-block" value="Pesquisar">
                </div>

            </div>
            <div class="row">
                <div class="col-md-12" id="conteudo">
                  <br/>
                  @if (isset($cardapios) && count($cardapios) > 0)
                <div class="table-responsive no-padding">
                  <table class="table table-hover" id="tabela_cardapios">
                      <thead>
                        <tr>
                          <th class="col-md-3">Nome</th>
                          <th class="col-md-3">Escola</th>
                          <th class="col-md-2">Período</th>
                          <th class="col-md-1 text-center"></th>
                          <th class="col-md-1 text-center"></th>
                          <th class="col-md-1 text-center"></th>
                          <th class="col-md-1 text-center"></th>
                        </tr>
                      </thead>
                      <tbody id=teste3>
                            @foreach ($cardapios as $cardapio)
                              @php
                                {{
                                  $datai = date("d-m-Y",strtotime($cardapio->data_inicio));
                                  $data_inicio = str_replace('-','/',$datai);
                                  $dataf = date("d-m-Y",strtotime($cardapio->data_fim));
                                  $data_fim = str_replace('-','/',$dataf);
                                  foreach($modalidades_escola as $modalidade_escola){
                                    if($cardapio->id_modalidade == $modalidade_escola->id){
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
                                  }
                                }}
                              @endphp
                              <tr>
                                <td class="col-md-3">{{$cardapio->nome}}</td>
                                <td class="col-md-3">{{$cardapio->nome_escola}} - {{$nomeModalidade}}</td>
                                <td class="col-md-2">{{$data_inicio}} a {{$data_fim}}</td>
                                <td class="col-md-1 text-center">
                                  <a class="btn btn-primary btn-sm" href="{{route('menu.edit',$cardapio->id)}}"><i class="fa fa-edit"></i></a>
                                </td>
                                <td class="col-md-1 text-center">
                                  <a class="btn btn-info btn-sm" href="{{route('menu.modal',$cardapio->id)}}"><i class="fas fa-eye"></i></a>
                                </td>
                                <td class="col-md-1 text-center align-middle">
                                  <a class="btn bg-purple btn-sm" href="{{route('menu.import',$cardapio->id)}}"><i class="fas fa-file-import"></i></a>
                                </td>
                                <td class="col-md-1 text-center"><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modalDelete{{$cardapio->id}}">
                                    <span class="fa fa-trash excluir"></span></button>
                                </td>
                              </tr>
                              @endforeach

                      </tbody>
                      <tfoot>
                    </table>
                    <div class="col-md-12 text-center">{{ $cardapios->appends(['search' => $search,'reservation2' => $search2])->links() }}</div>

                  </div>

                    @else
                        <br/>
                        <div class="col-md-12 text-center alert alert-warning"><strong>Não há registros para exibir.</strong></div>
                    @endif
              </div>
            </div>
            <div class="col-md-9">
                    @yield('conteudo')
            </div>
            @if (isset($cardapios) && count($cardapios) >= 1)
              @foreach ($cardapios as $cardapio)
                  <div class="modal fade" id="modalDelete{{$cardapio->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                    <div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Cardápio</h4></div>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-md-12"><h4>Tem certeza que deseja excluir este Cardápio?</h4></div>
                            </div>
                            <div class="row">
                              <div class="col-md-12"><h4><strong>Nome:</strong>  {{$cardapio->nome}} </h4></div>
                            </div>
                            <div class="row">
                              <div class="col-md-12"><h4><strong>Escola:</strong> {{$cardapio->nome_escola}} </h4></div>
                            </div>
                             <div class="row">
                               @php
                                 {{
                                   $datai = date("d-m-Y",strtotime($cardapio->data_inicio));
                                   $data_inicio = str_replace('-','/',$datai);
                                   $dataf = date("d-m-Y",strtotime($cardapio->data_fim));
                                   $data_fim = str_replace('-','/',$dataf);
                                 }}
                               @endphp
                                 <div class="col-md-12"><h4><strong>Período: </strong>{{$data_inicio}} a {{$data_fim}}</h4></div>
                               </div>
                             <br/>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        <a href="{{route('menu.destroy', $cardapio->id)}}" class="btn btn-danger btnExcluir">Excluir</a>
                      </div>
                    </div>
                  </div>
                </div>
            @endforeach
        @endif
        <!--div class="row">
           <hr/>
           <div class="form-group col-md-5"></div>
           <div class="form-group col-md-2" align="center">
             <a href="{{route('home.index')}}" class="btn btn-default btn-block">Voltar</a>
           </div>
           <div class="form-group col-md-5"></div>
         </div -->
      </form>
   </div>
</div>

@endsection

@section('scripts')
    <script src="/js/cardapios/carregar_cardapios.js"></script>
@endsection
