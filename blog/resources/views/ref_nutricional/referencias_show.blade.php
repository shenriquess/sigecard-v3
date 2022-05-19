@extends('layouts.geral')

@section('content')

<?php $posicao = 6 ?>
<div class="panel panel-default">
  <div class="panel-heading">
    <h4>
      <p class="text-primary">
        <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Referências Nutricionais</strong>
        <a class="btn btn-primary btn-spinner btn-xs pull-right m-b-0" href="{{route('references.create')}}"><i class="fa fa-plus"></i>&nbsp; Nova Referência</a>
      </p>
    </h4>
  </div>
      <div class="panel-body">
        <div class="row">

          <div class="col-md-12" id="conteudo">

            <br/>
            @if (isset($referencias) && $referencias->count() > 0)
            <div class="table-responsive no-padding">
              <table class="table table-hover" id="tabela_referencias">
                <thead>
                  <tr>
                    <th class="col-md-7">NOME</th>
                    <th class="col-md-4">DESCRIÇÃO</th>
                    <th class="col-md-1 text-center" class="text-center">EDITAR</th>
                    <th class="col-md-1 text-center" class="text-center">EXCLUIR</th>
                  </tr>
                </thead>
                <tbody>
                      @foreach ($referencias as $referencia)
                        <tr>
                          <td class="col-md-7">{{$referencia->nome}}</td>
                          <td class="col-md-4">{{$referencia->descricao}}</td>
                          <td class="col-md-1 text-center"><a class="btn btn-default btn-sm" href="{{route('references.edit', $referencia)}}"><i class="fa fa-edit"></i></a></td>
                          <td class="col-md-1 text-center">&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modalExcluir{{$referencia->id}}">
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
            <?php
            if (isset($referencias) && $referencias->count() > 0) {
                foreach ($referencias as $referencia) {
                    echo '<div class="modal fade" id="modalExcluir' . $referencia->id. '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
                    echo '<div class="modal-dialog modal-lg" role="document">';
                    echo '<div class="modal-content">';
                    echo '<div class="modal-header">';
                    echo '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
                    echo '<div class="text-center">';
                    echo '<h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Referência Nutricional</h4>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="modal-body">';
                    echo '<div class="row">';
                    echo '<div class="col-md-12"><h4>Tem certeza que deseja excluir esta Referência?</h4></div>';
                    echo '</div>';
                    echo '<div class="row">&nbsp;</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-6">';
                    echo '<h4><strong>Nome: </strong>' .$referencia->nome. '</h4>';
                    echo '</div>';
                    echo '<div class="col-md-6">';
                    echo '<h4><strong>Descrição: </strong>' .$referencia->descricao. '</h4>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-6">';
                    echo '<h4><strong>Categoria de Ensino: </strong>';
                    if($referencia->categoria_ensino == 1){
                      echo 'Creche';
                    }elseif ($referencia->categoria_ensino == 2) {
                      echo 'Pré-escola';
                    }elseif ($referencia->categoria_ensino == 3) {
                      echo 'Ensino Fundamental';
                    }elseif ($referencia->categoria_ensino == 4) {
                      echo 'Ensino Médio';
                    }else {
                      echo 'EJA';
                    }

                    echo '</h4>';
                    echo '</div>';
                    echo '<div class="col-md-6">';
                    echo '<h4><strong>Idade dos Alunos: </strong>';
                    if($referencia->idade_alunos == 1){
                      echo '7 - 11 meses';
                    }elseif ($referencia->idade_alunos == 2) {
                      echo '1 - 3 anos';
                    }elseif ($referencia->idade_alunos == 3) {
                      echo '4 - 5 anos';
                    }elseif ($referencia->idade_alunos == 4) {
                      echo '6 - 10 anos';
                    }elseif ($referencia->idade_alunos == 5) {
                      echo '11 - 15 anos';
                    }elseif ($referencia->idade_alunos == 6) {
                      echo '16 - 18 anos';
                    }elseif ($referencia->idade_alunos == 7) {
                      echo '19 - 30';
                    }else {
                      echo '31 - 60';
                    }

                    echo '</h4>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">&nbsp;</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Calorias: </strong>'. $referencia->calorias. ' Kcal</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Carboidratos: </strong>' . $referencia->carboidratos . ' g</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Proteínas: </strong>' . $referencia->proteinas . ' g</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Lipídios: </strong>' . $referencia->lipidios . ' g</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Fibras: </strong>' . $referencia->fibras . ' g</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina A: </strong>' . $referencia->vitamina_a . ' µg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina C: </strong>' . $referencia->vitamina_c . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina D: </strong>' . $referencia->vitamina_d . ' µg</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina E: </strong>' . $referencia->vitamina_e . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina B1: </strong>' . $referencia->vitamina_b1 . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina B2: </strong>' . $referencia->vitamina_b2 . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina B6 :</strong>' . $referencia->vitamina_b6 . ' mg</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Vitamina B12: </strong>' . $referencia->vitamina_b12 . ' µg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Niacina: </strong>' . $referencia->niacina . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Ácido Fólico:</strong>' . $referencia->folico . 'µg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Ácido Pant.: </strong>' . $referencia->pantotenico . ' mg</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Cálcio: </strong>' . $referencia->calcio . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Ferro: </strong>' . $referencia->ferro . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Magnésio: </strong>' . $referencia->magnesio . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Potássio: </strong>' . $referencia->potassio . ' mg</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Selênio: </strong>' . $referencia->selenio . ' µg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Fósforo: </strong>' . $referencia->fosforo . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Iodo: </strong>' . $referencia->iodo . ' µg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Cobre: </strong>'  . $referencia->cobre . ' mg</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Zinco: </strong>' . $referencia->zinco . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Sódio: </strong>' . $referencia->sodio . ' mg</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>G. Total:</strong>' . $referencia->gordura_total . ' g</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>Colesterol: </strong>' . $referencia->colesterol . ' mg</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="row">';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>G. Sat.: </strong>' . $referencia->gordura_saturada . ' g</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>G. Poli.: </strong>' . $referencia->gordura_poliinsaturada . ' g</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3">';
                    echo '<h6><strong>G. Mono.: </strong>' . $referencia->gordura_monoinsaturada . ' g</h6>';
                    echo '</div>';
                    echo '<div class="col-md-3"></div>';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="modal-footer">';
                    echo '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>';
                    echo '<a href="'. route('references.destroy', $referencia). '" class="btn btn-danger btnExcluir">Excluir</a>';
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
    <script src="/js/ref_nutricional/carregar_referencias.min.js"></script>
@endsection
