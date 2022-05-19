@extends('layouts.geral')

@section('content')

<?php $posicao = 7 ?>

<div class="panel panel-default">
    <div class="panel-heading">
        <h4><strong>Relatório de Despesas</strong></h4></div>
    <div class="panel-body">
        <form class="" action="{{route('report.costs')}}" method="post">
            {{ csrf_field() }}
            <div class="row">
                <div class="form-group col-md-6" id="div_search">
                  <label for="search_escola">Escola:</label>
                    <select name="search_escola" id="search_escola" onchange="" class="form-control form-control">
                        <option value="0" selected="selected">Todas as Escolas</option>
                        @foreach($escolas as $escola)
                        <option value="{{$escola->id}}">{{$escola->nome}}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-md-6" id="div_categoria">
                  <label for="search_categoria_ensino">Modalidade de Ensino:</label>
                  <select name="search_categoria_ensino" id="search_categoria_ensino" onchange="" class="form-control form-control">
                     <option value="0" selected="selected">Todas as Modalidades</option>
                     <option value="1">Creche</option>
                     <option value="2">Pré-escola</option>
                     <option value="3">Ensino Fundamental</option>
                     <option value="4">Ensino Médio</option>
                     <option value="5">EJA</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-5" id="div_periodo">
                  <label for="search_ensino">Ensino:</label>
                  <select name="search_ensino" id="search_ensino" onchange="" class="form-control form-control">
                     <option value="0" selected="selected">Todos os Tipos</option>
                     <option value="1">Parcial</option>
                     <option value="2">Integral</option>
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
                    <input type="submit" formtarget="_blank" name="btnEnviar" class="btn btn-primary" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gerar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
                </div>
            </div>

            <div class="col-md-9">
                    @yield('conteudo')
            </div>
        <div class="row">
           <hr/>
           <div class="form-group col-md-5"></div>
           <div class="form-group col-md-2" align="center">
             <a href="{{route('home.index')}}" class="btn btn-default btn-block">Voltar</a>
           </div>
           <div class="form-group col-md-5"></div>
         </div>
      </form>
   </div>
</div>

@endsection

@section('scripts')
    <script src="/js/relatorios/calendario.js"></script>
@endsection
