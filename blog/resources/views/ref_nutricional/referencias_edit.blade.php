@extends('layouts.geral')

@section('content')

  <?php $posicao = 6 ?>
  <div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Editar Referência Nutricional</strong><h4></div>

      <div class="panel-body">

        <form class="" action="{{route('references.update', $referencia)}}" method="post">
          {{ csrf_field() }}
          {{ method_field('PUT') }}
           <div class="row">
             <div class="form-group col-md-4" id="div_nome">
               <label for="nome">Nome:</label>
               <input type="text" class="form-control"  id="nome" name="nome" value="{{ $referencia->nome }}" required autofocus>
             </div>
             <div class="form-group col-md-4" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" name="descricao" value="{{ $referencia->descricao }}" autofocus>
             </div>
             <div class="form-group col-md-4" id="div_refeicoes">
               <label for="num_refeicoes" data-toggle="tooltip" data-placement="top" title="Número Mínimo de Refeições">Nº Mín. de Refeições:</label>
               <select name="num_refeicoes" id="num_refeicoes" onchange="" class="form-control form-control">
                  <option value="0" selected="selected">Selecione uma opção</option>
                  <option value="1"
                  @if($referencia->num_refeicoes == 1)
                    selected
                  @endif>1</option>
                  <option value="2"
                  @if($referencia->num_refeicoes == 2)
                    selected
                  @endif>2</option>
                  <option value="3"
                  @if($referencia->num_refeicoes == 3)
                    selected
                  @endif>3</option>
               </select>
             </div>
           </div>
           <div class="row">
             <div class="form-group col-md-4" id="div_categoria">
               <label for="categoria_ensino">Categoria de Ensino:</label>
               <select name="categoria_ensino" id="categoria_ensino" onchange="" class="form-control form-control">
          				<option value="0" selected="selected">Selecione uma opção</option>
          				<option value="1"
                  @if($referencia->categoria_ensino == 1)
                    selected
                  @endif>Creche</option>
          				<option value="2"
                  @if($referencia->categoria_ensino == 2)
                    selected
                  @endif>Pré-escola</option>
                  <option value="3"
                  @if($referencia->categoria_ensino == 3)
                    selected
                  @endif>Ensino Fundamental</option>
                  <option value="4"
                  @if($referencia->categoria_ensino == 4)
                    selected
                  @endif>Ensino Médio</option>
                  <option value="5"
                  @if($referencia->categoria_ensino == 5)
                    selected
                  @endif>EJA</option>
               </select>
             </div>
             <div class="form-group col-md-4" id="div_idade">
               <label for="idade_alunos">Faixa de Idade dos Alunos:</label>
               <select name="idade_alunos" id="idade_alunos" onchange="" class="form-control form-control">
          				<option value="0" selected="selected">Selecione uma opção</option>
          				<option value="1"
                  @if($referencia->idade_alunos == 1)
                    selected
                  @endif>7 - 11 meses</option>
          				<option value="2"
                  @if($referencia->idade_alunos == 2)
                    selected
                  @endif>1 - 3 anos</option>
                  <option value="3"
                  @if($referencia->idade_alunos == 3)
                    selected
                  @endif>4 - 5 anos</option>
                  <option value="4"
                  @if($referencia->idade_alunos == 4)
                    selected
                  @endif>6 - 10 anos</option>
                  <option value="5"
                  @if($referencia->idade_alunos == 5)
                    selected
                  @endif>11 - 15 anos</option>
                  <option value="6"
                  @if($referencia->idade_alunos == 6)
                    selected
                  @endif>16 - 18 anos</option>
                  <option value="7"
                  @if($referencia->idade_alunos == 7)
                    selected
                  @endif>19 - 30 anos</option>
                  <option value="8"
                  @if($referencia->idade_alunos == 8)
                    selected
                  @endif>31 - 60 anos</option>
               </select>
             </div>
             <div class="form-group col-md-4" id="div_periodo">
               <label for="periodo">Período</label>
               <select name="periodo" id="periodo" onchange="" class="form-control form-control">
                  <option value="0" selected="selected">Selecione uma opção</option>
                  <option value="1"
                  @if($referencia->periodo == 1)
                    selected
                  @endif>Parcial</option>
          				<option value="2"
                  @if($referencia->periodo == 2)
                    selected
                  @endif>Integral</option>
               </select>
             </div>
           </div>
           <br/><br/>
           <div class="row">
             <div class="form-group col-md-4 text-center"></div>
             <div class="form-group col-md-4 text-center">
               <button type="button" class="btn btn-default btn-block" data-toggle="modal" data-target="#modalValoresN">Editar Valores Nutricionais</button>
             </div>
            <div class="form-group col-md-4 text-center"></div>
           </div>
           <br/>
           <!-- Modal -->
           <div class="modal fade" id="modalValoresN" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog modal-lg" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                   class="sr-only">Close</span></button>
                           <div class="text-center"><h4 class="modal-title" id="myModalLabel">Alterar Valores Nutricionais</h4></div>
                 </div>
                 <div class="modal-body">
                   <div class="row">
                      <div class="form-group col-md-2" id="div_calorias">
                        <label for="calorias">Energia:</label>
                        <div class="input-group  input-group-sm">
                          <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="calorias" name="calorias" value="{{  number_format($referencia->calorias, 3, '.', '') }}"  >
                          <span class="input-group-addon">Kcal</span>
                        </div>
                      </div>
                      <div class="form-group col-md-2" id="div_carboidratos">
                          <label for="carboidratos">Carboidratos:</label>
                          <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="carboidratos" name="carboidratos" value="{{ number_format($referencia->carboidratos, 3, '.', '') }}"  >
                            <span class="input-group-addon">g</span>
                          </div>
                     </div>
                     <div class="form-group col-md-2" id="div_proteinas">
                       <label for="proteinas">Proteínas:</label>
                          <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="proteinas" name="proteinas" value="{{  number_format($referencia->proteinas, 3, '.', '') }}"  >
                            <span class="input-group-addon">g</span>
                          </div>
                     </div>
                     <div class="form-group col-md-2" id="div_lipidios">
                        <label for="lipidios">Lipídios:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="lipidios" name="lipidios" value="{{  number_format($referencia->lipidios, 3, '.', '') }}"  >
                            <span class="input-group-addon">g</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_fibras">
                       <label for="fibras">Fibras:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="fibras" name="fibras" value="{{  number_format($referencia->fibras, 3, '.', '') }}"  >
                           <span class="input-group-addon">g</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vita">
                       <label for="vitamina_a">Vitamina A:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="vitamina_a" name="vitamina_a" value="{{  number_format($referencia->vitamina_a, 3, '.', '') }}"  >
                           <span class="input-group-addon">μg</span>
                       </div>
                    </div>
                   </div>
                   <div class="row">
                     <div class="form-group col-md-2" id="div_vitc">
                        <label for="vitamina_c">Vitamina C:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="vitamina_c" name="vitamina_c" value="{{  number_format($referencia->vitamina_c, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vitd">
                        <label for="vitamina_d">Vitamina D</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="vitamina_d" name="vitamina_d" value="{{  number_format($referencia->vitamina_d, 3, '.', '') }}"  >
                            <span class="input-group-addon">µg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vite">
                       <label for="vitamina_e">Vitamina E:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="vitamina_e" name="vitamina_e" value="{{  number_format($referencia->vitamina_e, 3, '.', '')}}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vitb1">
                       <label for="vitamina_b1">Vitamina B1:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="vitamina_b1" name="vitamina_b1" value="{{  number_format($referencia->vitamina_b1, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                    <div class="form-group col-md-2" id="div_vitb2">
                       <label for="vitamina_b2">Vitamina B2:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="vitamina_b2" name="vitamina_b2" value="{{  number_format($referencia->vitamina_b2, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                    <div class="form-group col-md-2" id="div_vitb6">
                       <label for="vitamina_b6">Vitamina B6</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="vitamina_b6" name="vitamina_b6" value="{{  number_format($referencia->vitamina_b6, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                   </div>

                   <div class="row">
                      <div class="form-group col-md-2" id="div_vitb12">
                        <label for="vitamina_b12">Vitamina B12:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="vitamina_b12" name="vitamina_b12" value="{{  number_format($referencia->vitamina_b12, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                      </div>
                      <div class="form-group col-md-2" id="div_niacina">
                        <label for="niacina">Niacina:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="niacina" name="niacina" value="{{  number_format($referencia->niacina, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_folico">
                        <label for="folico">Ácido Fólico:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="folico" name="folico" value="{{  number_format($referencia->folico, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_pantotenico">
                        <label for="pantotenico" data-toggle="tooltip" data-placement="top" title="Ácido Pantotênico">Ácido Pant:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="pantotenico" name="pantotenico" value="{{  number_format($referencia->pantotenico, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_calcio">
                       <label for="calcio">Cálcio:</label>
                       <div class="input-group  input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="calcio" name="calcio" value="{{  number_format($referencia->calcio, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_ferro">
                       <label for="ferro">Ferro:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="ferro" name="ferro" value="{{  number_format($referencia->ferro, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                   </div>

                   <div class="row">
                     <div class="form-group col-md-2" id="div_magnesio">
                        <label for="magnesio">Magnésio:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="magnesio" name="magnesio" value="{{  number_format($referencia->magnesio, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_potassio">
                        <label for="potassio">Potássio</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="potassio" name="potassio" value="{{  number_format($referencia->potassio, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_selenio">
                       <label for="selenio">Selênio:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="selenio" name="selenio" value="{{  number_format($referencia->selenio, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_fosforo">
                       <label for="fosforo">Fósforo:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="fosforo" name="fosforo" value="{{  number_format($referencia->fosforo, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                    <div class="form-group col-md-2" id="div_iodo">
                       <label for="iodo">Iodo:</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="iodo" name="iodo" value="{{  number_format($referencia->iodo, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                    <div class="form-group col-md-2" id="div_cobre">
                       <label for="cobre">Cobre</label>
                       <div class="input-group input-group-sm">
                           <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="cobre" name="cobre" value="{{  number_format($referencia->cobre, 3, '.', '') }}"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                   </div>
                   <div class="row">
                      <div class="form-group col-md-2" id="div_zinco">
                        <label for="zinco">Zinco:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="zinco" name="zinco" value="{{  number_format($referencia->zinco, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                      </div>
                      <div class="form-group col-md-2" id="div_sodio">
                        <label for="sodio">Sódio:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="sodio" name="sodio" value="{{  number_format($referencia->sodio, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_gtotal">
                        <label for="gordura_total">Gordura Total:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="gordura_total" name="gordura_total" value="{{  number_format($referencia->gordura_total, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_colesterol">
                        <label for="colesterol">Colesterol:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="colesterol" name="colesterol" value="{{  number_format($referencia->colesterol, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_gsaturada">
                        <label for="gordura_saturada" data-toggle="tooltip" data-placement="top" title="Gordura Saturada">G. Saturada:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control" id="gordura_saturada" name="gordura_saturada" value="{{  number_format($referencia->gordura_saturada, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_gpoliinsaturada">
                        <label for="gordura_poliinsaturada" data-toggle="tooltip" data-placement="top" title="Gordura Poliinsaturada">G. Poli:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="gordura_poliinsaturada" name="gordura_poliinsaturada" value="{{  number_format($referencia->gordura_poliinsaturada, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                   </div>

                   <div class="row">
                     <div class="form-group col-md-2" id="div_gmonoinsaturada">
                        <label for="gordura_monoinsaturada" data-toggle="tooltip" data-placement="top" title="Gordura Monoinsaturada">G. Mono:</label>
                        <div class="input-group input-group-sm">
                            <input type="number" pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" class="form-control"  id="gordura_monoinsaturada" name="gordura_monoinsaturada" value="{{  number_format($referencia->gordura_monoinsaturada, 3, '.', '') }}"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>

                   </div>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-dismiss="modal">Concluir</button>
                 </div>
               </div>
             </div>
           </div>
           <div class="row">
             <div class="form-group col-md-12" align="center">
              <hr/>
              <input type="submit"  onclick="this.disabled = true; this.value = 'Enviando…'; this.form.submit();" name="btnSalvar" class="btn btn-primary" value="Salvar">
              <a href="{{route('references.show', $referencia)}}" class="btn btn-danger">Cancelar</a>
            </div>
           </div>
        </form>
      </div>
  </div>

@endsection

@section('scripts')

    <script src="/js/ref_nutricional/cadastro_ref_nutricional.min.js"></script>

@endsection
