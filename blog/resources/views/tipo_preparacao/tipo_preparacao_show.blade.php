@extends('layouts.geral')

@section('content')

<?php $posicao = 9 ?>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>
          <p class="text-primary">
            <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Grupo de Preparações</strong>
          </p>
        </h4>
      </div>
      <div class="panel-body">
        <form class="" action="{{route('preparation_type.save')}}" method="POST">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-5" id="div_nome">
               <label for="nome">Nome:</label>
               <input type="text" class="form-control"  id="nome" name="nome" required autofocus>
             </div>
             <div class="form-group col-md-5" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" name="descricao" autofocus>
             </div>
             <div class="form-group col-md-2" align="center">
               <label for="btnSalvar">&nbsp;</label>
               <input type="submit"  onclick="this.disabled = true; this.value = 'Enviando…'; this.form.submit();" name="btnSalvar" class="btn btn-primary btn-block" value="Cadastrar">
            </div>
           </div>
        </form>
        <br/>
        <div class="row">
            <div class="col-md-12" id="conteudo">
            @if (isset($tipo_preparacoes) && count($tipo_preparacoes) > 0)
            <div class="table-responsive no-padding">
              <table class="table table-hover" id="tabela_tipo_preparacoes">
                  <thead>
                    <tr>
                      <th class="col-md-5">NOME</th>
                      <th class="col-md-5">DESCRIÇÃO<S/th>
                      <th class="col-md-1 text-center">&nbsp;</th>
                      <th class="col-md-1 text-center">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                        @foreach ($tipo_preparacoes as $tipo_preparacao)
                          <tr>
                            <td class="col-md-5">{{$tipo_preparacao->nome}}</td>
                            <td class="col-md-5">{{$tipo_preparacao->descricao}}</td>
                            <td class="col-md-1 text-center">
                              <a class="btn btn-primary btn-sm" href="{{route('preparation_type.edit', $tipo_preparacao)}}"><i class="fa fa-edit"></i></a>
                            </td>
                            <td class="col-md-1 text-center"><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modalExcluir{{$tipo_preparacao->id}}">
                                <span class="fa fa-trash excluir"></span></button>
                            </td>
                          </tr>
                          @endforeach
                  </tbody>

                </table>
              </div>
              @else
                  <br/>
                  <div class="col-md-12 text-center alert alert-warning"><strong>Não há registros para exibir.</strong></div>
              @endif
            </div>
          </div>


          <?php
            if (isset($tipo_preparacoes) && $tipo_preparacoes) {
                foreach ($tipo_preparacoes as $tipo_preparacao) {

                    echo '<div class="modal fade" id="modalExcluir'. $tipo_preparacao->id .'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
                    echo '<div class="modal-dialog" role="document">';
                    echo '<div class="modal-content">';
                    echo '<div class="modal-header">';
                    echo '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
                    echo '<div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Grupo de Preparações</h4></div>';
                    echo '</div>';
                    echo '<div class="modal-body">';
                    echo '<div class="row">';
                    echo '<div class="col-md-12"><h4>Tem certeza que deseja excluir este Grupo de Preparações?</h4></div>';
                    echo '</div>';
                    echo '<div class="row">&nbsp;</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-12">';
                    echo '<h4><strong>Nome: </strong>' . $tipo_preparacao->nome . '</h4>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-12">';
                    echo '<h4><strong>Descrição: </strong>' . $tipo_preparacao->descricao . '</h4>';
                    echo '</div>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="modal-footer">';
                    echo '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>';
                    echo '<a href="'.route('preparation_type.destroy', $tipo_preparacao).'" class="btn btn-danger btnExcluir">Excluir</a>';
                    echo '</div>';
                    echo '</div>';
                    echo '</div>';
                    echo '</div>';

                  }

            } else {
                echo '<h5 class="text-center">Não há outros registros cadastrados.</h5>';
            }
            ?>
      </div>
    </div>

@endsection
@section('scripts')
    <script src="/js/tipo_preparacoes/carregar_tipo_preparacoes.min.js"></script>
@endsection
