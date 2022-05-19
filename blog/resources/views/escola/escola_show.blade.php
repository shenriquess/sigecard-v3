@extends('layouts.geral')

@section('content')

<?php $posicao = 5 ?>
<div class="panel panel-default">
    <div class="panel-heading">
      <h4>
        <p class="text-primary">
          <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Escolas</strong>
          <a class="btn btn-primary btn-spinner btn-xs pull-right m-b-0" href="{{route('school.create')}}"><i class="fa fa-plus"></i>&nbsp; Nova Escola</a>
        </p>
      </h4>
    </div>
      <div class="panel-body">
        <br/>
        <div class="row">

            <div class="col-md-12" id="conteudo">
            @if (isset($escolas) && $escolas)
            <div class="table-responsive no-padding">
              <table class="table table-hover" id="tabela_escolas">
                  <thead>
                    <tr>
                      <th class="col-md-5">NOME</th>
                      <th class="col-md-5">DESCRIÇÃO</th>
                      <th class="col-md-1 text-center">EDITAR</th>
                      <th class="col-md-1 text-center">EXCLUIR</th>
                    </tr>
                  </thead>
                  <tbody>
                        @foreach ($escolas as $escola)
                          <tr>
                            <td class="col-md-5">{{$escola->nome}}</td>
                            <td class="col-md-5">{{$escola->descricao}}</td>
                            <td class="col-md-1 text-center"><a class="btn btn-default btn-sm" href="{{route('school.edit', $escola)}}"><i class="fa fa-edit"></i></a></td>
                            <td class="col-md-1 text-center">&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modalExcluir{{$escola->id}}">
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
          if (isset($escolas) && $escolas) {
              echo '<br/>';
              foreach ($escolas as $escola) {

                  echo '<div class="modal fade" id="modalExcluir'. $escola->id .'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
                  echo '<div class="modal-dialog" role="document">';
                  echo '<div class="modal-content">';
                  echo '<div class="modal-header">';
                  echo '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
                  echo '<div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Escola</h4></div>';
                  echo '</div>';
                  echo '<div class="modal-body">';
                  echo '<div class="row">';
                  echo '<div class="col-md-12"><h4>Tem certeza que deseja excluir esta Escola?</h4></div>';
                  echo '</div>';
                  echo '<div class="row">&nbsp;</div>';
                  echo '<div class="row">';
                  echo '<div class="col-md-12">';
                  echo '<h4><strong>Nome: </strong>' . $escola->nome . '</h4>';
                  echo '</div>';
                  echo '</div>';
                  echo '<div class="row">';
                  echo '<div class="col-md-12">';
                  echo '<h4><strong>Descrição: </strong>' . $escola->descricao . '</h4>';
                  echo '</div>';
                  echo '</div>';
                  echo '</div>';
                  echo '<div class="modal-footer">';
                  echo '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>';
                  echo '<a href="'.route('school.destroy', $escola->id).'" class="btn btn-danger btnExcluir">Excluir</a>';
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
    <script src="/js/escolas/carregar_escolas.min.js"></script>
@endsection
