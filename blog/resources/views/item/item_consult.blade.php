@extends('layouts.geral')

@section('content')

<div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Consultar Alimento</strong></h4></div>
      <div class="panel-body">
       <form class="" action="{{route('item.search')}}" method="post">
         {{ csrf_field() }}
        <div class="row">
          <div class="form-group col-md-12{{ $errors->has('search') ? ' has-error' : '' }}" id="div_search">
            <label for="search">Nome:</label>
            <input type="text" class="form-control"  id="search" name="search" required autofocus>
            @if ($errors->has('search'))
                <span class="help-block" id="span_search">
                    <strong>{{ $errors->first('search') }}</strong>
                </span>
            @endif
          </div>

        </div>
        <div class="col-md-12">
                      <div class="row">
                          <div class="col-md-12">
                              <div class="row">
                                <div class="col-md-5"><h5><b>NOME</b></h5></div>
                                <div class="col-md-5"><h5><b>Calorias</b></h5></div>
                                <div class="col-md-2">
                                  <div class="pull-right">
                                      <h5><b>Detalhes</b></h5>
                                    </div>
                                  </div>
                              </div>

                          </div>
                      </div>

                      <div class="row thumbnail">
                          <div class="col-md-12 pre-scrollable">
                              <?php
                              if (isset($itens) && $itens) {
                                  echo '<br/>';
                                  $count = 0;
                                  foreach ($itens as $item) {
                                    $count++;
                                    echo '<div class="row">';
                                    echo '<div class="col-md-5"><h5>' . $item->nome . '</h5></div>';
                                    echo '<div class="col-md-5"><h5>&nbsp;' . $item->calorias . '</h5></div>';
                                    echo '<div class="col-md-2">';
                                    echo '<div class="pull-right">';
                                    echo '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalExemplo' . $count . '">';
                                    echo '<span class="fa fa-info"></span>';
                                    echo '</button>';
                                    echo '</div>';
                                    echo '</div>';

                                    echo '<div class="modal fade" id="modalExemplo' . $count . '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
                                    echo '<div class="modal-dialog" role="document">';
                                    echo '<div class="modal-content">';
                                    echo '<div class="modal-header">';
                                    echo '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                                            class="sr-only">Close</span></button>';
                                    echo '<div class="text-center"><h4 class="modal-title" id="myModalLabel">Informações Nutricionais</h4></div>';
                                    echo '</div>';
                                    echo '<div class="modal-body">';
                                    echo '<div class="row">';
                                    echo '<div class="col-md-12">Informações Nutricionais</div>';
                                    echo '</div>';
                                    echo '<div class="row">&nbsp;</div>';

                                    echo '<div class="row">';
                                    echo '<div class="col-md-5"><h5><strong>Nome:</strong> ' . $item->nome. '</h5></div>';
                                    echo '<div class="col-md-5"><h5><strong>Carboidratos:</strong> ' . $item->carboidratos. '</h5></div>';
                                    echo '</div>';
                                    echo '<div class="row">';
                                    echo '<div class="col-md-12"><h5><strong>Lipídios:</strong> ' . $item->lipidios . '</h5></div>';
                                    echo '</div>';
                                    echo '</div>';
                                    echo '<div class="modal-footer">';
                                    echo '<button type="button" class="btn btn-primary" data-dismiss="modal">Voltar</button>';
                                    echo '</div>';
                                    echo '</div>';
                                    echo '</div>';
                                    echo '</div>';

                                    echo '</div>';
                                    echo '<hr/>';
                                  }

                              } else {
                                  echo '<h5 class="text-center">Não há outros registros cadastrados.</h5>';
                              }
                              ?>
                          </div>
                      </div>
                  </div>


      </div>

    <div class="row">
      <div class="form-group col-md-12" align="center">
       <hr/>
       <input type="submit" name="btnEnviar" class="btn btn-primary" value="Pesquisar">
       <a href="{{route('home.index')}}" class="btn btn-danger">Cancelar</a>
     </div>
    </div>
  </div>

 </form>

    <!-- Modal -->
    <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                            class="sr-only">Close</span></button>
                    <div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Alteração de
                            Saída</h4></div>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

@endsection
