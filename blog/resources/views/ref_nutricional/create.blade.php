@extends('layouts.geral')

@section('content')
  <?php $posicao = 6 ?>
  <div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Cadastrar Referência Nutricional</strong><h4></div>
      <div class="panel-body">
        <form class="" action="{{route('references.save')}}" method="post">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-4" id="div_nome">
               <label for="nome">Nome:</label>
               <input type="text" class="form-control"  id="nome" name="nome" required autofocus>
             </div>
             <div class="form-group col-md-4" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" name="descricao" autofocus>
             </div>
             <div class="form-group col-md-4" id="div_refeicoes">
               <label for="num_refeicoes" data-toggle="tooltip" data-placement="top" title="Número Mínimo de Refeições">Nº Mín. de Refeições:</label>
               <select name="num_refeicoes" id="num_refeicoes" onchange="" class="form-control form-control">
                  <option value="0" selected="selected">Selecione uma opção</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
               </select>
             </div>
           </div>
           <div class="row">
             <div class="form-group col-md-4" id="div_categoria">
               <label for="categoria_ensino">Categoria de Ensino:</label>
               <select name="categoria_ensino" id="categoria_ensino" onchange="" class="form-control form-control">
          				<option value="0" selected="selected">Selecione uma opção</option>
          				<option value="1">Creche</option>
          				<option value="2">Pré-escola</option>
                  <option value="3">Ensino Fundamental</option>
                  <option value="4">Ensino Médio</option>
                  <option value="5">EJA</option>
               </select>
             </div>
             <div class="form-group col-md-4" id="div_idade">
               <label for="idade_alunos">Faixa de Idade dos Alunos:</label>
               <select name="idade_alunos" id="idade_alunos" onchange="" class="form-control form-control">
          				<option value="0" selected="selected">Selecione uma opção</option>
               </select>
             </div>
             <div class="form-group col-md-4" id="div_periodo">
               <label for="periodo">Período:</label>
               <select name="periodo" id="periodo" onchange="" class="form-control form-control">
                  <option value="0" selected="selected">Selecione uma opção</option>
                  <option value="1">Parcial</option>
                  <option value="2">Integral</option>
               </select>
             </div>
           </div>
           <br/><br/>
           <div class="row">
             <div class="form-group col-md-4 text-center"></div>
             <div class="form-group col-md-4 text-center">
               <button type="button" class="btn btn-default btn-block" data-toggle="modal" data-target="#modalValoresN">Cadastrar Valores Nutricionais</button>
             </div>
            <div class="form-group col-md-4 text-center"></div>
           </div>
           <br/>
           <div class="modal fade" id="modalValoresN" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div class="modal-dialog modal-lg" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                   class="sr-only">Close</span></button>
                           <div class="text-center"><h4 class="modal-title" id="myModalLabel">Cadastrar Valores Nutricionais</h4></div>
                 </div>
                 <div class="modal-body">
                   <div class="row">
                      <div class="form-group col-md-2" id="div_calorias">
                        <label for="calorias">Calorias:</label>
                        <div class="input-group  input-group-sm">
                          <input  type="number"  onfocus="this.value='';" pattern="[0-9]+([,\.][0-9]+)?"  max="100000" min="0" step="any" value="0" class="form-control" id="calorias" name="calorias"  >
                          <span class="input-group-addon">Kcal</span>
                        </div>
                      </div>
                      <div class="form-group col-md-2" id="div_carboidratos">

                          <label for="carboidratos">Carboidratos:</label>
                          <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="carboidratos" name="carboidratos"  >
                            <span class="input-group-addon">g</span>
                          </div>
                     </div>
                     <div class="form-group col-md-2" id="div_proteinas">
                       <label for="proteinas">Proteínas:</label>
                          <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="proteinas" name="proteinas"  >
                            <span class="input-group-addon">g</span>
                          </div>
                     </div>
                     <div class="form-group col-md-2" id="div_lipidios">
                        <label for="lipidios">Lipídios:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="lipidios" name="lipidios"  >
                            <span class="input-group-addon">g</span>
                        </div>
                    </div>
                     <div class="form-group col-md-2" id="div_fibras">
                       <label for="fibras">Fibras:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any"value="0.000" class="form-control" id="fibras" name="fibras"  >
                           <span class="input-group-addon">g</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vitamina_a">
                       <label for="vitamina_a">Vitamina A:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_a" name="vitamina_a"  >
                           <span class="input-group-addon">μg</span>
                       </div>
                    </div>
                   </div>
                   <div class="row">
                     <div class="form-group col-md-2" id="div_vitc">
                        <label for="vitamina_c">Vitamina C:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_c" name="vitamina_c"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vitd">
                        <label for="vitamina_d">Vitamina D:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_d" name="vitamina_d"  >
                            <span class="input-group-addon">µg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vite">
                       <label for="vitamina_e">Vitamina E:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_e" name="vitamina_e"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_vitb1">
                       <label for="vitamina_b1">Vitamina B1:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_b1" name="vitamina_b1"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                    <div class="form-group col-md-2" id="div_vitb2">
                       <label for="vitamina_b2">Vitamina B2:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_b2" name="vitamina_b2"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                    <div class="form-group col-md-2" id="div_vitb6">
                       <label for="vitamina_b6">Vitamina B6:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="vitamina_b6" name="vitamina_b6"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                    </div>
                   </div>
                   <div class="row">
                      <div class="form-group col-md-2" id="div_vitb12">
                        <label for="vitamina_b12">Vitamina B12:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="vitamina_b12" name="vitamina_b12"  >
                            <span class="input-group-addon">µg</span>
                        </div>
                      </div>
                      <div class="form-group col-md-2" id="div_niacina">
                        <label for="niacina">Niacina:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="niacina" name="niacina"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_folico">
                        <label for="folico">Ácido Fólico:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="folico" name="folico"  >
                            <span class="input-group-addon">µg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_pantotenico">
                        <label for="pantotenico" data-toggle="tooltip" data-placement="top" title="Ácido Pantotênico">Ácido Pant:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control"  id="pantotenico" name="pantotenico"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_calcio">
                       <label for="calcio">Calcio:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="calcio" name="calcio"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                      <div class="form-group col-md-2" id="div_ferro">
                        <label for="ferro">Ferro:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="ferro" name="ferro"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                      </div>
                   </div>
                   <div class="row">
                      <div class="form-group col-md-2" id="div_magnesio">
                        <label for="magnesio">Magnésio:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="magnesio" name="magnesio"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_potassio">
                       <label for="potassio">Potássio:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="potassio" name="potassio"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_selenio">
                       <label for="selenio">Selênio:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="selenio" name="selenio"  >
                           <span class="input-group-addon">µg</span>
                       </div>
                     </div>
                      <div class="form-group col-md-2" id="div_fosforo">
                        <label for="fosforo">Fósforo:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="fosforo" name="fosforo"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                      </div>
                      <div class="form-group col-md-2" id="div_iodo">
                        <label for="iodo">Iodo:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="iodo" name="iodo"  >
                            <span class="input-group-addon">µg</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_cobre">
                       <label for="cobre">Cobre:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="cobre" name="cobre"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                   </div>


                   <div class="row">
                     <div class="form-group col-md-2" id="div_zinco">
                       <label for="zinco">Zinco:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="zinco" name="zinco"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                      <div class="form-group col-md-2" id="div_sodio">
                        <label for="sodio">Sódio</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="sodio" name="sodio"  >
                            <span class="input-group-addon">mg</span>
                        </div>
                      </div>
                      <div class="form-group col-md-2" id="div_gtotal">
                        <label for="gordura_total">Gordura Total:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_total" name="gordura_total"  >
                            <span class="input-group-addon">g</span>
                        </div>
                     </div>
                     <div class="form-group col-md-2" id="div_colesterol">
                       <label for="colesterol">Colesterol:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="colesterol" name="colesterol"  >
                           <span class="input-group-addon">mg</span>
                       </div>
                     </div>
                     <div class="form-group col-md-2" id="div_gsaturada">
                       <label for="gordura_saturada" data-toggle="tooltip" data-placement="top" title="Gordura Saturada">G. Saturada:</label>
                       <div class="input-group input-group-sm">
                           <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_saturada" name="gordura_saturada"  >
                           <span class="input-group-addon">g</span>
                       </div>
                     </div>
                      <div class="form-group col-md-2" id="div_gpoliinsaturada">
                        <label for="gordura_poliinsaturada" data-toggle="tooltip" data-placement="top" title="Gordura Poliinsaturada">G. Poli:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000" min="0" step="any" value="0.000" class="form-control" id="gordura_poliinsaturada" name="gordura_poliinsaturada"  >
                            <span class="input-group-addon">g</span>
                        </div>
                      </div>
                   </div>
                   <div class="row">
                      <div class="form-group col-md-2" id="div_gmonoinsaturada">
                        <label for="gordura_monoinsaturada" data-toggle="tooltip" data-placement="top" title="Gordura Monoinsaturada">G. Mono:</label>
                        <div class="input-group input-group-sm">
                            <input type="number"  onfocus="this.value='';"   pattern="[0-9]+([,\.][0-9]+)?" max="100000"  min="0" step="any" value="0.000" class="form-control" id="gordura_monoinsaturada" name="gordura_monoinsaturada"  >
                            <span class="input-group-addon">g</span>
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
                <input type="submit"  onclick="this.disabled = true; this.value = 'Enviando…'; this.form.submit();" name="btnSalvar" class="btn btn-primary" value="Cadastrar">
                <a href="{{ url('/home') }}" class="btn btn-danger">Cancelar</a>
             </div>
           </div>
        </form>
      </div>
  </div>

@endsection

@section('scripts')

    <script src="/js/ref_nutricional/cadastro_ref_nutricional.min.js"></script>

@endsection
