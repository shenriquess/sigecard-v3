@extends('layouts.geral')
@section('content')

<?php $posicao = 8 ?>
<div class="panel panel-default">
      <div class="panel-heading">
        <h4>
          <p class="text-primary">
            <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Usuários</strong>
            <a class="btn btn-primary btn-spinner btn-xs pull-right m-b-0" href="{{route('user.create')}}"><i class="fa fa-plus"></i>&nbsp; Novo usuário</a>
          </p>
        </h4>
      </div>
      <div class="panel-body">
        <form class="" action="{{route('users.show')}}" method="post">
          {{ csrf_field() }}
          <div class="row">
            <div class="col-md-12" id="conteudo">
              @if (isset($users) && count($users) > 1)
              <div class="table-responsive no-padding">
                <table class="table table-hover" id="tabela_usuarios">
                  <thead>
                    <tr>
                      <th class="col-md-7">Nome</th>
                      <th class="col-md-4">E-mail</th>
                      <th class="col-md-1 text-center" class="text-center">Editar</th>
                      <th class="col-md-1 text-center" class="text-center">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                        @foreach ($users as $user)
                          @if($user->id != Auth::user()->id)
                          <tr>
                            <td class="col-md-7">{{$user->name}}</th>
                            <td class="col-md-4">{{$user->email}}</td>
                            <td class="col-md-1 text-center">
                              <a class="btn btn-primary btn-sm" href="{{route('users.edit',$user)}}"><i class="fa fa-edit"></i></a>
                            </td>
                            <td class="col-md-1 text-center"><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modalExemplo{{$user->id}}">
                                <span class="fa fa-trash excluir"></span></button>
                            </td>
                          </tr>
                          @endif
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
            @if($users && count($users) > 1)
                @foreach ($users as $user)
                  @if($user->id != Auth::user()->id)
                    <div class="modal fade" id="modalExemplo{{$user->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                            class="sr-only">Close</span></button>
                            <div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Usuário</h4></div>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-md-12"><h4>Tem certeza que deseja excluir este Usuário?</h4></div>
                            </div>
                            <div class="row">&nbsp;</div>
                            <div class="row">
                              <div class="col-md-12"><h4><strong>Nome:</strong>{{$user->name}}</h4></div>
                            </div>
                            <div class="row">
                              <div class="col-md-12"><h4><strong>Nome de Usuário:</strong>{{$user->username}}</h4></div>
                            </div>
                            <div class="row">
                              <div class="col-md-12"><h4><strong>E-mail:</strong>{{$user->email}}</h4></div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                            <a href="'. route('users.destroy', $user) . '" class="btn btn-danger">Excluir</a>
                          </div>
                        </div>
                      </div>
                    </div>
                 @endif
              @endforeach
            @endif
            <div class="row">
              <br/>

             </div>
          </form>
        </div>
      </div>
@endsection

@section('scripts')
    <script src="/js/usuarios/carregar_usuarios.min.js"></script>
@endsection
