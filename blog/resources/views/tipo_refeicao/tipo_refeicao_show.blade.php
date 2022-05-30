@extends('layouts.geral')

@section('content')

<?php $posicao = 4 ?>
<div class="panel panel-default">
  <div class="panel-heading">
    <h4>
        <div class="btn-toolbar text-primary">
          <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Tipos de refeições</strong>
        </div>
    </h4>
  </div>
      <div class="panel-body">
        <form class="" action="{{route('meal_type.save')}}" method="POST">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-4">
               <label for="nome">Nome:</label>
               <input type="text" class="form-control"  id="nome" name="nome" required autofocus>
             </div>
             <div class="form-group col-md-4" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" name="descricao" required autofocus>
             </div>
             <div class="form-group col-md-2" id="div_horario">
               <label for="horario">Horario:</label>
               <input type="text" class="form-control"  id="horario" name="horario" required autofocus>
             </div>
             <div class="form-group col-md-2" align="center">
               <label for="btnSalvar">&nbsp;</label>
               <input type="submit"  onclick="this.disabled = true; this.value = 'Enviando…'; this.form.submit();" name="btnSalvar" class="btn btn-primary btn-block" value="Cadastrar">
            </div>
           </div>
        </form>
        <br/>
        <div class="row">
            <div class="col-md-12">
              @if (isset($tipo_refeicao) && $tipo_refeicao->count() > 0)
              <div class="table-responsive no-padding">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th class="col-md-7">NOME</th>
                      <th class="col-md-4">DESCRIÇÃO</th>
                      <th class="col-md-1 text-center" class="text-center">EDITAR</th>
                      <th class="col-md-1 text-center" class="text-center">EXCLUIR</th>
                    </tr>
                  </thead>
                  <tbody>
                        @foreach ($tipo_refeicao as $tipo_ref)
                          <tr>
                            <td class="col-md-7">{{$tipo_ref->nome}}</td>
                            <td class="col-md-4">{{$tipo_ref->descricao}}</td>
                            <td class="col-md-1 text-center">&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modalEdit{{$tipo_ref->id}}">
                                <span class="fa fa-edit editar"></span></button></td>
                            <td class="col-md-1 text-center">&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modalExcluir{{$tipo_ref->id}}">
                                <span class="fa fa-trash excluir"></span></button></td>
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
          @if (isset($tipo_refeicao) && count($tipo_refeicao) > 0)
          @foreach ($tipo_refeicao as $tipo_ref)
                <div class="modal fade" id="modalExcluir{{$tipo_ref->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                          <div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Refeição</h4></div>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <div class="col-md-12"><h4>Tem certeza que deseja excluir esta Refeição?</h4></div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 wrapper"><h4><strong>Nome: </strong>{{$tipo_ref->nome}}</h4></div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 wrapper"><h4><strong>Descricao: </strong>{{$tipo_ref->descricao}}</h4></div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 wrapper"><h4><strong>Horário: </strong>{{strftime( '%H:%M', strtotime($tipo_ref->horario) )}}</h4></div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <a href="{{route('meal_type.destroy', $tipo_ref)}}" class="btn btn-danger btnExcluir">Excluir</a>
                          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal fade" id="modalEdit{{$tipo_ref->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                          class="sr-only">Close</span></button>
                            <div class="text-center"><h4 class="modal-title" id="myModalLabel">Editar Refeição</h4></div>
                        </div>
                        <div class="modal-body">
                          <form class="" action="{{route('meal_type.update', $tipo_ref)}}" method="post">
                            {{ csrf_field() }}
                            {{ method_field('PUT') }}
                             <div class="row">
                               <div class="form-group col-md-6" id="div_nome">
                                 <label for="nome">Nome:</label>
                                 <input type="text" class="form-control"  id="nome" name="nome" value="{{ $tipo_ref->nome }}" required autofocus>
                               </div>
                               <div class="form-group col-md-4" id="div_descricao">
                                 <label for="descricao">Descrição:</label>
                                 <input type="text" class="form-control"  id="descricao" name="descricao" value="{{ $tipo_ref->descricao }}" required autofocus>
                               </div>
                               <div class="form-group col-md-2" id="div_horario">
                                 <label for="horario">Horario:</label>
                                 <input type="text" class="form-control"  id="horario" name="horario" value="{{ $tipo_ref->horario }}" required autofocus>
                               </div>
                             </div>
                        </div>
                        <div class="modal-footer">
                          <input type="submit"  onclick="this.disabled = true; this.value = 'Enviando…'; this.form.submit();" name="btnSalvar" class="btn btn-primary" value="Salvar">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        </div>
                      </div>
                      </form>
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
      </div>

    </div>


@endsection

@section('scripts')
    <script src="/js/refeicoes/carregar_refeicoes.min.js"></script>
@endsection
