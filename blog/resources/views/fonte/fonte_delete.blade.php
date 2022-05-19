@extends('layouts.geral')

@section('content')
    <?php $posicao = 15 ?>
    <div class="panel panel-default">
        <div class="panel-heading"><h4><strong>Excluir Fonte de Informações Nutricionais</strong><h4></div>
          <div class="panel-body">
            <div class="row">
                <div class="col-md-4">
                    <h5>Nome:</h5>
                </div>
                <div class="col-md-8">
                    <h5><b>{{$fonte_alimento->nome}}</b></h5>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <h5>Descrição:</h5>
                </div>
                <div class="col-md-8">
                    <h5><b>{{$fonte_alimento->descricao}}</b></h5>
                </div>
            </div>

            <hr/>
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <h5><b>Tem certeza que deseja excluir o Tipo Item acima?</b></h5>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <a class="btn btn-default"
                           href="{{route('source.show', $fonte_alimento)}}"><b>Não</b></a>
                        <a href="{{route('source.destroy', $fonte_alimento)}}" class="btn btn-danger"><b>Sim</b></a>
                    </div>
                </div>
            </div>
          </div>
      </div>

@endsection
