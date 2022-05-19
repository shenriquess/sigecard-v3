@extends('layouts.geral')

@section('content')

            <?php $posicao = 8 ?>
            <div class="panel panel-default">
                <div class="panel-heading"><h4><strong>Cadastrar Usuário</strong><h4></div>

                <div class="panel-body">
                    <form class="form-horizontal" autocomplete="off" method="POST" action="{{ route('register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Nome:</label>

                            <div class="col-md-6">
                                <input autocomplete="off" id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                            <label for="username" class="col-md-4 control-label">Nome de Usuário:</label>

                            <div class="col-md-6">
                                <input autocomplete="off" id="username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autofocus>

                                @if ($errors->has('username'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group{{ $errors->has('type') ? ' has-error' : '' }}" id="div_type">
                          <label for="type" class="col-md-4 control-label">Nível de Permissão:</label>
                          <div class="col-md-6">

                              <select class="form-control" name="type" id="type">
                                    <option value="0">Selecione uma opção</option>
                                    <option value="3">Usuário Básico</option>
                                    <option value="2">Nutricionista</option>
                                    <option value="1">Administrador</option>
                              </select>
                              @if ($errors->has('type'))
                                  <span class="help-block" id="span_type">
                                      <strong>{{ $errors->first('type') }}</strong>
                                  </span>
                              @endif
                          </div>
                        </div>

                        <div class="form-group{{ $errors->has('crn') ? ' has-error' : '' }}" style="display:none;" id="div_crn">
                            <label for="crn" class="col-md-4 control-label">Nº do CRN:</label>

                            <div class="col-md-6">
                                <input id="crn" type="text" class="form-control" name="crn" value="{{ old('crn') }}"  autofocus>

                                @if ($errors->has('crn'))
                                    <span class="help-block" id="span_crn">
                                        <strong>{{ $errors->first('crn') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}" id="div_email">
                            <label for="email" class="col-md-4 control-label">E-Mail:</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="help-block" id="span_email">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}" id="div_password">
                            <label for="password" class="col-md-4 control-label">Senha:</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block" id="span_password">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm" class="col-md-4 control-label">Confirmar Senha:</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12" align="center">
                                <hr/>
                                <button type="submit" class="btn btn-primary">
                                    Cadastrar
                                </button>
                                <a href="{{ url('/home') }}" class="btn btn-danger">Cancelar</a>

                            </div>
                        </div>
                    </form>
                </div>
            </div>


@endsection
