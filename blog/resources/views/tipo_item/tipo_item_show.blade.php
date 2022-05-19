@extends('layouts.geral')

@section('content')

<?php $posicao = 13 ?>
<div class="panel panel-default">
    <div class="panel-heading">
      <h4>
          <div class="btn-toolbar text-primary">
            <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Grupos de Alimentos</strong>
          </div>
      </h4>
    </div>
      <div class="panel-body">
        <form class="" action="{{route('item_type.save')}}" method="POST">
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
            @if (isset($tipo_itens) && $tipo_itens)
            <div class="table-responsive no-padding">
              <table class="table table-hover" id="tabela_tipo_itens">
                  <thead>
                    <tr>
                      <th class="col-md-5">NOME</th>
                      <th class="col-md-5">DESCRIÇÃO</th>
                      <th class="col-md-1 text-center">EDITAR</th>
                      <th class="col-md-1 text-center">EXCLUIR</th>
                    </tr>
                  </thead>
                  <tbody>
                        @foreach ($tipo_itens as $tipo_item)
                          <tr>
                            <td class="col-md-5">{{$tipo_item->nome}}</td>
                            <td class="col-md-5">{{$tipo_item->descricao}}</td>
                            <td class="col-md-1 text-center"><a class="btn btn-default btn-sm" href="{{route('item_type.edit', $tipo_item)}}"><i class="fa fa-edit"></i></a></td>
                            <td class="col-md-1 text-center">&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modalExcluir{{$tipo_item->id}}">
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
            if (isset($tipo_itens) && $tipo_itens) {
                echo '<br/>';
                foreach ($tipo_itens as $tipo_item) {

                    echo '<div class="modal fade" id="modalExcluir'. $tipo_item->id .'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
                    echo '<div class="modal-dialog" role="document">';
                    echo '<div class="modal-content">';
                    echo '<div class="modal-header">';
                    echo '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
                    echo '<div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Grupo de Alimentos</h4></div>';
                    echo '</div>';
                    echo '<div class="modal-body">';
                    echo '<div class="row">';
                    echo '<div class="col-md-12"><h4>Tem certeza que deseja excluir este Grupo de Alimentos?</h4></div>';
                    echo '</div>';
                    echo '<div class="row">&nbsp;</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-12">';
                    echo '<h4><strong>Nome: </strong>' . $tipo_item->nome . '</h4>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-12">';
                    echo '<h4><strong>Descrição: </strong>' . $tipo_item->descricao . '</h4>';
                    echo '</div>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="modal-footer">';
                    echo '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>';
                    echo '<a href="'.route('item_type.destroy', $tipo_item).'" class="btn btn-danger btnExcluir">Excluir</a>';
                    echo '</div>';
                    echo '</div>';
                    echo '</div>';
                    echo '</div>';

                  }

            }
          ?>
          <div class="row">
             <hr/>
             <div class="form-group col-md-5"></div>
             <div class="form-group col-md-2" align="center">
               <a href="{{route('home.index')}}" class="btn btn-default btn-block">Voltar</a>
             </div>
             <div class="form-group col-md-5"></div>
          </div>
        </div>
      </div>

@endsection
@section('scripts')
    <script src="/js/tipo_itens/carregar_tipo_itens.min.js"></script>
@endsection
