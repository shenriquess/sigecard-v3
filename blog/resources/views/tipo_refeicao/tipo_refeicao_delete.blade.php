@extends('layouts.geral')

@section('content')
    <?php $posicao = 4 ?>
    <div class="panel panel-default">
        <div class="panel-heading"><h4><strong>Excluir Tipo de Refeição</strong><h4></div>
          <div class="panel-body">
            <div class="row">
                <div class="col-md-4">
                    <h5>Nome:</h5>
                </div>
                <div class="col-md-8">
                    <h5><b>{{$tipo_refeicao->nome}}</b></h5>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <h5>Descrição:</h5>
                </div>
                <div class="col-md-8">
                    <h5><b>{{$tipo_refeicao->descricao}}</b></h5>
                </div>
            </div>

            <hr/>
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <h5><b>Tem certeza que deseja excluir o Tipo de Refeição acima?</b></h5>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <a class="btn btn-default"
                           href="{{route('meal_type.show', $tipo_refeicao)}}"><b>Não</b></a>
                        <a href="{{route('meal_type.destroy', $tipo_refeicao)}}" class="btn btn-danger"><b>Sim</b></a>
                    </div>
                </div>
            </div>
          </div>
      </div>
@endsection
