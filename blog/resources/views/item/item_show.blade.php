@extends('layouts.geral')

@section('content')

<?php $posicao = 3 ?>
<div class="panel panel-default">
    <div class="panel-heading">
      <h4>
          <div class="btn-toolbar text-primary">
            <i class="fa fa-align-justify"></i>&nbsp;&nbsp;<strong>Alimentos</strong>
            <a class="btn btn-primary btn-spinner btn-xs pull-right m-b-0 ml-10" href="{{route('item_type.show')}}"><i class="fas fa-hamburger"></i>&nbsp; Grupos de Alimentos</a>
            <a class="btn btn-primary btn-spinner btn-xs pull-right m-b-0 ml-2" href="{{route('source.show')}}"><i class="fas fa-calculator"></i>&nbsp; Fontes de Composição Nutricional</a>
            <a class="btn btn-primary btn-spinner btn-xs pull-right m-b-0 ml-2" href="{{route('item.create')}}"><i class="fa fa-plus"></i>&nbsp; Novo Alimento</a>
          </div>
      </h4>
    </div>
      <div class="panel-body">
        <form class="" action="{{route('item.show')}}" method="post">
          {{ csrf_field() }}
        <div class="row">
          <div class="form-group col-md-5">
            <label for="search">Nome:</label>
          </div>
          <div class="form-group col-md-5">
            <label for="search2">Grupo:</label>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-5" id="div_search">
              <input type="text" class="form-control"  id="search" name="search" autofocus>
          </div>
          <div class="form-group col-md-5" id="div_search2">
            <select name="search2" id="search2" onchange="" class="form-control form-control">
               <option value="0" selected="selected">Selecione uma opção</option>
                 @foreach($tipo_itens as $tipo_item)
                   <option value="{{$tipo_item->id}}">{{$tipo_item->nome}}</option>
                 @endforeach
               </select>
          </div>
          <div class="form-group col-md-2">
            <input type="submit" name="btnEnviar" class="btn btn-default btn-block" value="Pesquisar">
          </div>
        </div>

        <div class="row">
          <br/>
          <div class="col-md-12" id="conteudo">
            @if (isset($itens) && $itens)
            <div class="table-responsive no-padding">
              <table class="table table-hover"  id="tabela_itens">
                <thead>
                  <tr>
                    <th class="col-md-9">ITEM</th>
                    <th class="col-md-1 text-center" class="text-center">&nbsp;</th>
                    <th class="col-md-1 text-center" class="text-center">&nbsp;</th>
                    <th class="col-md-1 text-center" class="text-center">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                      @foreach ($itens as $item)
                        @foreach ($fontes as $fonte)
                          @if ($item->id_fonte == $fonte->id)
                            <tr>
                              <td class="col-md-9">{{$item->nome}} ({{$fonte->nome}})</td>
                              <td class="col-md-1 text-center">
                                <a class="btn btn-primary btn-sm" href="{{route('item.edit', $item)}}"><i class="fa fa-edit"></i></a>
                              </td>
                              <td class="col-md-1 text-center">
                                <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modalExemplo{{$item->id}}"><i class="fas fa-eye"></i></a>
                              </td>
                              <td class="col-md-1 text-center"><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modalExcluir{{$item->id}}">
                                  <span class="fa fa-trash excluir"></span></button>
                              </td>

                            </tr>
                          @endif
                        @endforeach
                      @endforeach

                </tbody>
              </table>
            </div>
              <div class="col-md-12 text-center">{{ $itens->appends(['search' => $search,'search2' => $search2])->links() }}</div>
              @else
                  <br/>
                  <div class="col-md-12 text-center alert alert-warning"><strong>Não há registros para exibir.</strong></div>
              @endif

            </div>
          </div>


          <div class="row">
              <div class="col-md-12">
                  @if (isset($itens) && $itens)
                      @foreach ($itens as $item)
                        <div class="row">
                          <div class="modal fade" id="modalExemplo{{$item->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-lg" role="document">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                          <div class="text-center">
                                              <h4 class="modal-title" id="myModalLabel">Informações Nutricionais</h4>
                                          </div>
                                      </div>
                                      <div class="modal-body">
                                          <label for="nome">
                                              <h6><i>(Valores por {{$item->medida_base}}
                                                @if($item->unidade_medida == 1)
                                                    Kg
                                                @elseif($item->unidade_medida == 2)
                                                    g
                                                @elseif($item->unidade_medida == 3)
                                                    L
                                                @else
                                                    ml
                                                @endif
                                                    do Alimento)</i></h6></label>
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <h4><strong>Item:</strong> {{$item->nome}}</h4>
                                              </div>

                                              <div class="col-md-6">
                                                  <h4><strong>Grupo: </strong>
                                                            @foreach ($tipo_itens as $tipo_item)
                                                              @if($tipo_item->id == $item->id_tipo_item)
                                                                  {{$tipo_item->nome}}
                                                              @endif
                                                            @endforeach
                                                          </h4>
                                              </div>
                                          </div>
                                          <div class="row">&nbsp;</div>

                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Calorias:</strong> {{$item->calorias}} Kcal</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Carboidratos:</strong> {{$item->carboidratos}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Proteínas:</strong> {{$item->proteinas}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Lipídios:</strong> {{$item->lipidios }} g</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Fibras:</strong> {{$item->fibras}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina A:</strong> {{$item->vitamina_a}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina C:</strong> {{$item->vitamina_c}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina D:</strong> {{$item->vitamina_d }} µg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina E:</strong> {{$item->vitamina_e}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B1:</strong> {{$item->vitamina_b1}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B2:</strong> {{$item->vitamina_b2}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B6:</strong> {{$item->vitamina_b6}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B12:</strong> {{$item->vitamina_b12}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Niacina:</strong> {{$item->niacina}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Ácido Fólico:</strong> {{$item->folico}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Ácido Pant.:</strong> {{$item->pantotenico}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Cálcio:</strong> {{$item->calcio}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Ferro:</strong> {{$item->ferro}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Magnésio:</strong> {{$item->magnesio}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Potássio:</strong> {{$item->potassio}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Selênio:</strong> {{$item->selenio}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Fósforo:</strong> {{$item->fosforo}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Iodo:</strong> {{$item->iodo}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Cobre:</strong> {{$item->cobre}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Zinco:</strong> {{$item->zinco}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Sódio:</strong> {{$item->sodio}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>G. Total:</strong> {{$item->gordura_total}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Colesterol:</strong> {{$item->colesterol}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>G. Sat.:</strong> {{$item->gordura_saturada}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>G. Poli.:</strong> {{$item->gordura_poliinsaturada }} g</h6>
                                              </div>
                                              <div class="col-md-4">
                                                  <h6><strong>G. Mono.:</strong> {{$item->gordura_monoinsaturada}} g</h6>
                                              </div>
                                              <div class="col-md-4">
                                                  <h4><strong>Preço:</strong> R$ {{$item->valor}} </h4>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="modal-footer">
                                          <button type="button" class="btn btn-primary" data-dismiss="modal">Voltar</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="modal fade" id="modalExcluir{{$item->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-lg" role="document">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                          <div class="text-center">
                                              <h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Item</h4>
                                          </div>
                                      </div>
                                      <div class="modal-body">
                                          <label for="nome">
                                              <h6><i>(Valores por {{$item->medida_base}}
                                                @if($item->unidade_medida == 1)
                                                    Kg
                                                @elseif($item->unidade_medida == 2)
                                                    g
                                                @elseif($item->unidade_medida == 3)
                                                    L
                                                @else
                                                    ml
                                                @endif
                                                    do Alimento)</i></h6></label>
                                          <div class="row">
                                            <div class="col-md-12"><h4>Tem certeza que deseja excluir este Item?</h4></div>
                                          </div>
                                          <div class="row">&nbsp;</div>
                                          <div class="row">
                                              <div class="col-md-6">
                                                  <h4><strong>Item:</strong> {{$item->nome}}</h4>
                                              </div>

                                              <div class="col-md-6">
                                                  <h4><strong>Grupo: </strong>
                                                            @foreach ($tipo_itens as $tipo_item)
                                                              @if($tipo_item->id == $item->id_tipo_item)
                                                                  {{$tipo_item->nome}}
                                                              @endif
                                                            @endforeach
                                                          </h4>
                                              </div>
                                          </div>
                                          <div class="row">&nbsp;</div>

                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Calorias:</strong> {{$item->calorias}} Kcal</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Carboidratos:</strong> {{$item->carboidratos}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Proteínas:</strong> {{$item->proteinas}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Lipídios:</strong> {{$item->lipidios }} g</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Fibras:</strong> {{$item->fibras}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina A:</strong> {{$item->vitamina_a}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina C:</strong> {{$item->vitamina_c}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina D:</strong> {{$item->vitamina_d }} µg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina E:</strong> {{$item->vitamina_e}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B1:</strong> {{$item->vitamina_b1}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B2:</strong> {{$item->vitamina_b2}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B6:</strong> {{$item->vitamina_b6}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Vitamina B12:</strong> {{$item->vitamina_b12}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Niacina:</strong> {{$item->niacina}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Ácido Fólico:</strong> {{$item->folico}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Ácido Pant.:</strong> {{$item->pantotenico}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Cálcio:</strong> {{$item->calcio}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Ferro:</strong> {{$item->ferro}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Magnésio:</strong> {{$item->magnesio}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Potássio:</strong> {{$item->potassio}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Selênio:</strong> {{$item->selenio}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Fósforo:</strong> {{$item->fosforo}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Iodo:</strong> {{$item->iodo}} µg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Cobre:</strong> {{$item->cobre}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>Zinco:</strong> {{$item->zinco}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Sódio:</strong> {{$item->sodio}} mg</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>G. Total:</strong> {{$item->gordura_total}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>Colesterol:</strong> {{$item->colesterol}} mg</h6>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-md-3">
                                                  <h6><strong>G. Sat.:</strong> {{$item->gordura_saturada}} g</h6>
                                              </div>
                                              <div class="col-md-3">
                                                  <h6><strong>G. Poli.:</strong> {{$item->gordura_poliinsaturada }} g</h6>
                                              </div>
                                              <div class="col-md-4">
                                                  <h6><strong>G. Mono.:</strong> {{$item->gordura_monoinsaturada}} g</h6>
                                              </div>
                                              <div class="col-md-4">
                                                  <h4><strong>Preço:</strong> R$ {{$item->valor}} </h4>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="modal-footer">
                                          <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                                          <a href="{{route('item.destroy', $item)}}" class="btn btn-danger btnExcluir">Excluir</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                      @endforeach
                  @endif
              </div>
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
    <script src="/js/item/carregar_itens.min.js"></script>
@endsection
