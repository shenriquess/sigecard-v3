@extends('layouts.geral')

@section('content')

  <?php $posicao = 4 ?>
  <div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Cadastrar Tipo de Refeição</strong><h4></div>
      <div class="panel-body">
        <form class="" action="{{route('meal_type.save')}}" method="POST">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-6" id="div_nome">
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
           </div>
           <div class="row">
             <div class="form-group col-md-12" align="center">
              <hr/>
              <input type="submit"  onclick="this.disabled = true; this.value = 'Enviando…'; this.form.submit();" name="btnSalvar" class="btn btn-primary" value="Cadastrar">
              <a href="{{ url('/home') }}" class="btn btn-danger">Cancelar</a>
            </div>
           </div>
        </form>
      </div>
  </div>




@endsection
