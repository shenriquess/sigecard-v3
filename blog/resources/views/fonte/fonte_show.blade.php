@extends('layouts.geral')

@section('content')

<?php $posicao = 3 ?>
<div class="panel panel-default">
    <div class="panel-heading">  <h4>
          <div class="btn-toolbar text-primary">
            <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Fontes de Composição Nutricional</strong>
          </div>
      </h4>
    </div>
      <div class="panel-body">
        <br/>
        <form class="" action="{{route('source.save')}}" method="POST">
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
        <br />
        <div class="row">

            <div class="col-md-12" id="conteudo">
            @if (isset($fonte_alimentos) && $fonte_alimentos)
            <div class="table-responsive no-padding">
              <table class="table table-hover" id="tabela_fontes">
                  <thead>
                    <tr>
                      <th class="col-md-5">NOME</th>
                      <th class="col-md-5">DESCRICAO</th>
                      <th class="col-md-1 text-center">EDITAR</th>
                      <th class="col-md-1 text-center">EXCLUIR</th>
                    </tr>
                  </thead>
                  <tbody>
                        @foreach ($fonte_alimentos as $fonte_alimento)
                          <tr>
                            <td class="col-md-5">{{$fonte_alimento->nome}}</td>
                            <td class="col-md-5">{{$fonte_alimento->descricao}}</td>
                            <td class="col-md-1 text-center"><a class="btn btn-default btn-sm" href="{{route('source.edit', $fonte_alimento)}}"><i class="fa fa-edit"></i></a></td>
                            <td class="col-md-1 text-center">&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modalExcluir{{$fonte_alimento->id}}">
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
          if (isset($fonte_alimentos) && $fonte_alimentos) {
              echo '<br/>';
              foreach ($fonte_alimentos as $fonte_alimento) {

                  echo '<div class="modal fade" id="modalExcluir'. $fonte_alimento->id .'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
                  echo '<div class="modal-dialog" role="document">';
                  echo '<div class="modal-content">';
                  echo '<div class="modal-header">';
                  echo '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
                  echo '<div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Fonte de Inf. Nutricionais</h4></div>';
                  echo '</div>';
                  echo '<div class="modal-body">';
                  echo '<div class="row">';
                  echo '<div class="col-md-12"><h4>Tem certeza que deseja excluir esta Fonte de Inf. Nutricionais?</h4></div>';
                  echo '</div>';
                  echo '<div class="row">&nbsp;</div>';
                  echo '<div class="row">';
                  echo '<div class="col-md-12">';
                  echo '<h4><strong>Nome: </strong>' . $fonte_alimento->nome . '</h4>';
                  echo '</div>';
                  echo '</div>';
                  echo '<div class="row">';
                  echo '<div class="col-md-12">';
                  echo '<h4><strong>Descrição: </strong>' . $fonte_alimento->descricao . '</h4>';
                  echo '</div>';
                  echo '</div>';
                  echo '</div>';
                  echo '<div class="modal-footer">';
                  echo '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>';
                  echo '<a href="'.route('source.destroy', $fonte_alimento).'" class="btn btn-danger btnExcluir">Excluir</a>';
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
    <script src="/js/fontes/carregar_fontes.min.js"></script>
@endsection
