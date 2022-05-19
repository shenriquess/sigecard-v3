@extends('layouts.geral')

@section('content')

<?php $posicao = 7 ?>

<div class="panel panel-default">
    <div class="panel-heading">
        <h4><strong>Imprimir Cardápios</strong></h4></div>
    <div class="panel-body">
        <form class="" action="{{route('report.menus')}}" method="post">
            {{ csrf_field() }}

            <div class="row">
                <div class="form-group col-md-4" id="div_search">
                  <label for="search">Escola:</label>
                    <select name="search" id="search" onchange="" class="form-control form-control">
                        <option value="0" selected="selected">Selecione uma opção</option>
                        @foreach($escolas as $escola)
                        <option value="{{$escola->id}}">{{$escola->nome}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-md-4" id="div_search3">
                  <label for="search3">Modalidade:</label>
                    <select name="search3" id="search3" onchange="" class="form-control form-control">
                        <option value="0" selected="selected">Selecione uma opção</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                  <label>Período:</label>
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                    </div>
                    <input type="text" class="form-control pull-right" id="reservation2" name="reservation2">
                  </div>
                  <!-- /.input group -->
                </div>

            </div>
            <div class="row">
              <br/>
              <div class="form-group col-md-4">
                <hr/>
              </div>
              <div class="form-group col-md-4">
                  <input type="submit" name="btnEnviar" class="btn btn-default btn-block" value="Pesquisar">
              </div>
              <div class="form-group col-md-4">
                <hr/>
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
                          <th class="col-md-4">NOME</th>
                          <th class="col-md-4">ESCOLA</th>
                          <th class="col-md-3">PERÍODO</th>
                          <th class="col-md-1 text-center">PDF</th>
                        </tr>
                      </thead>
                      <tbody>
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
                                <td class="col-md-4">{{$cardapio->nome}}</td>
                                <td class="col-md-4">{{$cardapio->nome_escola}} - {{$nomeModalidade}}</td>
                                <td class="col-md-3">{{$data_inicio}} a {{$data_fim}}</td>
                                <td class="col-md-1 text-center">
                                  <a class="btn btn-default" href="{{route('report.menu_modal',$cardapio->id)}}"><i class="far fa-file-pdf"></i></a>
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
            <div class="col-md-9">
                    @yield('conteudo')
            </div>
        <div class="row">
           <hr/>
           <div class="form-group col-md-3"></div>
           <div class="form-group col-md-3" align="center">
             <button  id="confBotaoEnviar" type="button" class="btn btn-primary btn-block">Gerar Relatório</button>
           </div>
           <div class="form-group col-md-3" align="center">
             <a href="{{route('home.index')}}" class="btn btn-default btn-block">Voltar</a>
           </div>
           <div class="form-group col-md-3"></div>
         </div>
      </form>
   </div>
</div>

@endsection

@section('scripts')
<script type="application/javascript">
      <?php

          if(isset($modalidades_escola)) {
             echo 'var modalidades_escola = '.json_encode($modalidades_escola).';';
          }
          if(isset($cardapios)) {
             echo 'var cardapios = '.json_encode($cardapios).';';
          }

      ?>
</script>
    <script src="/js/relatorios/carregar_cardapios.min.js"></script>
@endsection
