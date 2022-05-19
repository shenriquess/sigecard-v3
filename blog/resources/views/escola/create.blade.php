@extends('layouts.geral')

@section('content')

  <?php $posicao = 5 ?>
  <div class="panel panel-default">
    <div class="panel-heading"><h4><strong>Cadastrar Escola</strong><h4></div>

      <div class="panel-body">

        <form class="" action="#" id="id_form" method="POST">
           {{ csrf_field() }}
           <div class="row">
             <div class="form-group col-md-6" id="div_nome">
               <label for="nome">Nome:</label>
               <input type="text" class="form-control"  id="nome" name="nome" required autofocus>
             </div>
             <div class="form-group col-md-6" id="div_descricao">
               <label for="descricao">Descrição:</label>
               <input type="text" class="form-control"  id="descricao" name="descricao" autofocus>
             </div>
           </div>
           <fieldset class="scheduler-border">
             <legend class="scheduler-border"><h5>Adicionar Modalidades:</h5></legend>
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
               <div class="row">

                 <div class="form-group col-md-5" id="div_refeicoes">
                   <label for="num_refeicoes">Nº de Refeições Ofertadas:</label>
                   <select name="num_refeicoes" id="num_refeicoes" onchange="" class="form-control form-control">
                      <option value="0" selected="selected">Selecione uma opção</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                   </select>
                 </div>
                 <div class="form-group col-md-5" id="div_referencia">
                   <label for="id_referencia">Referência Nutricional:</label>
                   <select name="id_referencia" id="id_referencia" onchange="" class="form-control form-control">
              				<option value="0" selected="selected">Selecione uma opção</option>
                   </select>
                 </div>
                 <div class="form-group col-md-2" id="div_alunos">
                   <label for="num_alunos">Nº de Alunos:</label>
                   <input type="text"  onfocus="this.value='';"  value="0" class="form-control"  id="num_alunos" name="num_alunos" required autofocus>
                 </div>
               </div>
                <br/>
                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <a id="botaoAdicionar" class="btn btn-default btn-block">Adicionar a Lista</a>
                    </div>
                </div>
                <br/>
                <div class="row">
                        <div class="col-md-3">
                            <hr/>
                        </div>
                        <div class="col-md-6">
                            <div class="text-center"><h5><b>Lista de Modalidades Adicionadas</b></h5></div>
                        </div>
                        <div class="col-md-3">
                            <hr/>
                        </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-body panel-lista">
                    <ul class="titulo">
                      <li class="panel">
                        <div class="row">
                            <div class="col-md-3">
                                <h5><b>CATEGORIA</b></h5>
                            </div>
                            <div class="col-md-3">
                                <h5><b>FAIXA DE IDADE</b></h5>
                            </div>
                            <div class="col-md-2">
                                <h5><b>PERÍODO</b></h5>
                            </div>
                            <div class="col-md-2">
                                <h5><b>Nº ALUNOS</b></h5>
                            </div>
                            <div class="col-md-1 text-center">
                                <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Editar">EDIT.</span></b></h5>
                            </div>
                            <div class="col-md-1 text-center">
                                <h5><b><span data-container="body" data-toggle="popover" data-placement="right" data-content="Excluir">EXCL.</span></b></h5>
                            </div>
                        </div>
                      </li>
                    </ul>
                    <ul class="lista-itens pre-scrollable">
                      <div id="listaVazia">
                          <div class="text-center">
                              <div class="alert alert-warning" role="alert">
                                  <b>Lista Vazia</b>
                              </div>
                          </div>
                      </div>
                      <div id="listaItens"></div>
                   </ul>
                 </div>
              </div>
           </fieldset>
           <div class="row">
             <div class="form-group col-md-12" align="center">
              <hr/>
              <button  id="confBotaoEnviar" type="button" class="btn btn-primary">Cadastrar</button>
              <a href="{{ url('/home') }}" class="btn btn-danger" id="btn_cancelar">Cancelar</a>
            </div>
           </div>
        </form>
      </div>
  </div>

  <div class="modal fade" id="editar_modalidade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                  <div class="text-center"><h4 class="modal-title" id="myModalLabel">Confirmação de Exclusão de Preparação</h4></div>
        </div>
        <div class="modal-body">
          <fieldset class="scheduler-border">
            <legend class="scheduler-border"><h5>Editar Modalidade:</h5></legend>
            <div class="row">
              <div class="form-group col-md-4" id="div_categoria_edit">
                <label for="categoria_ensino_edit">Categoria de Ensino:</label>
                <select disabled name="categoria_ensino_edit" id="categoria_ensino_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Selecione uma opção</option>
                   <option value="1">Creche</option>
                   <option value="2">Pré-escola</option>
                   <option value="3">Ensino Fundamental</option>
                   <option value="4">Ensino Médio</option>
                   <option value="5">EJA</option>
                </select>
              </div>
              <div class="form-group col-md-4" id="div_idade_edit">
                <label for="idade_alunos_edit">Faixa de Idade dos Alunos:</label>
                <select disabled name="idade_alunos_edit" id="idade_alunos_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Selecione uma opção</option>
                </select>
              </div>
              <div class="form-group col-md-4" id="div_periodo_edit">
                <label for="periodo_edit">Período:</label>
                <select disabled name="periodo_edit" id="periodo_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Selecione uma opção</option>
                   <option value="1">Parcial</option>
                   <option value="2">Integral</option>
                </select>
              </div>

            </div>
            <div class="row">

              <div class="form-group col-md-5" id="div_refeicoes_edit">
                <label for="num_refeicoes_edit">Nº de Refeições Ofertadas:</label>
                <select name="num_refeicoes_edit" id="num_refeicoes_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Selecione uma opção</option>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                   <option value="6">6</option>
                </select>
              </div>
              <div class="form-group col-md-5" id="div_referencia_edit">
                <label for="id_referencia_edit">Referência Nutricional:</label>
                <select name="id_referencia_edit" id="id_referencia_edit" onchange="" class="form-control form-control">
                   <option value="0" selected="selected">Selecione uma opção</option>
                </select>
              </div>
              <div class="form-group col-md-2" id="div_alunos_edit">
                <label for="num_alunos_edit">Nº de Alunos:</label>
                <input type="text"  onfocus="this.value='';"  value="0" class="form-control"  id="num_alunos_edit" name="num_alunos_edit" required autofocus>
              </div>
            </div>
             <br/>
             <div class="row">
               <div class="col-md-4 col-md-offset-4">
                   <a id="concluir_edicao" class="btn btn-primary btn-block">Concluir</a>
               </div>
             </div>
           </fieldset>
        </div>
      </div>
    </div>
  </div>


@endsection

@section('scripts')
    <script src="/js/escolas/cadastro_escolas.min.js"></script>
    <script type="application/javascript">
      <?php
          if(isset($referencias)) {
             echo 'var referencias= '.json_encode($referencias).';';
          }
      ?>
    </script>
@endsection
