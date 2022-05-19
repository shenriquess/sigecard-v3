@extends('layouts.geral')

@section('content')

<?php $posicao = 8 ?>
<div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Alterar Dados do Usuário: </strong>{{$user->name}}</h4></div>
      <div class="panel-body">
        <form class="form-horizontal" method="POST" action="{{route('users.update', $user)}}">

            {{ csrf_field() }}
            {{ method_field('PUT') }}
            <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}" id="div_nome">
                <label for="name" class="col-md-4 control-label">Nome:</label>

                <div class="col-md-6">
                    <input id="name" type="text" class="form-control" name="name" value="{{ $user->name }}" required autofocus>

                    @if ($errors->has('name'))
                        <span class="help-block" id="span_nome">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
            </div>
            <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}" id="div_username">
                <label for="name" class="col-md-4 control-label">Nome de Usuário:</label>

                <div class="col-md-6">
                    <input id="username" type="text" class="form-control" name="username" value="{{ $user->username }}" required autofocus>

                    @if ($errors->has('username'))
                        <span class="help-block" id="span_username">
                            <strong>{{ $errors->first('username') }}</strong>
                        </span>
                    @endif
                </div>
            </div>
            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}" id="div_email">
                <label for="email" class="col-md-4 control-label">E-Mail:</label>

                <div class="col-md-6">
                    <input id="email" type="text" class="form-control" name="email" value="{{ $user->email }}" required autofocus>

                    @if ($errors->has('email'))
                        <span class="help-block" id="span_email">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
            </div>
            <div class="form-group{{ $errors->has('type') ? ' has-error' : '' }}" id="div_type">
              <label for="type" class="col-md-4 control-label">Nível de Permissão:</label>
              <div class="col-md-6">

                  <select class="form-control" name="type" id="type">
                        <option value="3"
                        @if($user->type == 3)
                          selected
                        @endif>Usuário Básico</option>
                        <option value="2"
                        @if($user->type == 2)
                          selected
                        @endif>Nutricionista</option>
                        <option value="1"
                        @if($user->type== 1)
                          selected
                        @endif>Administrador</option>
                  </select>
                  @if ($errors->has('type'))
                      <span class="help-block" id="span_type">
                          <strong>{{ $errors->first('type') }}</strong>
                      </span>
                  @endif
              </div>
            </div>

            <div class="form-group{{ $errors->has('crn') ? ' has-error' : '' }}"
                @if($user->type == 3)style="display:none;" @endif
                id="div_crn">
                <label for="crn" class="col-md-4 control-label">Nº do CRN:</label>

                <div class="col-md-6">

                    <input id="crn" type="text" class="form-control" name="crn"
                    @if(($user->type == 1)||($user->type == 2))
                      value="{{ $user->crn }}"
                    @else
                        value=""
                    @endif>

                    @if ($errors->has('crn'))
                        <span class="help-block" id="span_crn">
                            <strong>{{ $errors->first('crn') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}" id="div_password">
                <label for="password" class="col-md-4 control-label">Senha:</label>

                <div class="col-md-6">
                    <input id="password" type="password" class="form-control" name="password"  required autofocus>

                    @if ($errors->has('password'))
                        <span class="help-block" id="span_password">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>
            </div>
            <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                <label for="password_confirmation" class="col-md-4 control-label">Confirmar Senha:</label>

                <div class="col-md-6">
                    <input id="password_confirmation" type="password" class="form-control" name="password_confirmation"  required autofocus>


                </div>
            </div>

            <div class="form-group">
                <div class="col-md-12" align="center">
                    <hr/>
                    <button type="submit" class="btn btn-primary">
                        Salvar
                    </button>
                    <a href="{{route('users.show', $user)}}" class="btn btn-default">Voltar</a>
                </div>
            </div>
        </form>
      </div>
  </div>



@endsection
