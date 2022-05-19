@extends('layouts.geral')

@section('content')

  <?php $posicao = 9 ?>
  <div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Editar Grupo de Preparação</strong><h4></div>

      <div class="panel-body">
        <form class="" action="{{route('preparation_type.update', $tipo_preparacao)}}" method="post">
          {{ csrf_field() }}
          {{ method_field('PUT') }}
           <div class="row">
             <div class="form-group col-md-4" id="div_nome">
               <label for="nome">Nome:</label>
               <input type="text" class="form-control"  id="nome" name="nome" value="{{ $tipo_preparacao->nome }}" required autofocus>
             </div>
             <div class="form-group col-md-8" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" name="descricao" value="{{ $tipo_preparacao->descricao }}" autofocus>
             </div>
           </div>
           <div class="row">
             <div class="form-group col-md-12" align="center">
              <hr/>
              <input type="submit"  onclick="this.disabled = true; this.value = 'Enviando…'; this.form.submit();" name="btnSalvar" class="btn btn-primary" value="Salvar">
              <a href="{{route('preparation_type.show', $tipo_preparacao)}}" class="btn btn-danger">Cancelar</a>
            </div>
           </div>
        </form>
      </div>
  </div>

@endsection
