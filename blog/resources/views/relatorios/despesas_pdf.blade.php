<!doctype html>
<html>
    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SIGECARD</title>

        <!-- Fonts -->

        <link rel="stylesheet" href="{{public_path('/bootstrap/css/bootstrap.min.css')}}">
        <!-- Date Picker -->
        <link rel="stylesheet" href="{{public_path('/css/bootstrap-datepicker.css')}}">
        <!-- Daterange picker -->
        <link rel="stylesheet" href="{{public_path('/css/daterangepicker.css')}}">
        <link rel="stylesheet" href="{{public_path('/css/pnotify.custom.min.css')}}">

        <style>
            /** Define the margins of your page **/
            @page {
                margin: 100px 25px;
            }

            header {
                position: fixed;
                top: -60px;
                left: 0px;
                right: 0px;
                height: 35px;

                /** Extra personal styles **/
                background-color: #DCDCDC;
                color: #4F4F4F;
                text-align: center;
                line-height: 35px;
            }

            footer {
                position: fixed;
                bottom: -80px;
                left: 0px;
                right: 0px;
                height: 90px;

                /** Extra personal styles **/
                background-color: #DCDCDC;
                color: #4F4F4F;
                text-align: center;
                line-height: 35px;
            }
           .page-number:after { content: counter(page); }
        </style>
    </head>
    <body>
      <header>
          <h4><strong>Relatório de Despesas Alimentares <span class="page-number"> - Página </span></strong></h4>
      </header>
      <footer class="main-footer">
            <h5 class="text-center"><b>Secretaria de Educação</b></h5>
            <h5 class="text-center"><b>Prefeitura de São Gonçalo do Rio Abaixo</b></h5>
            <h5 class="text-center"><b>SIGECARD - Sistema de Gestão de Alimentação Escolar</b></h5>
      </footer>
                <main>
                 <p>
                        @if (isset($cardapios) && count($cardapios) > 0)
                        <table class="table table-hover" id="tabela_cardapios">
                            <thead>
                              <tr>
                                <th class="col-md-3">CARDÁPIO</th>
                                <th class="col-md-3">ESCOLA</th>
                                <th class="col-md-2">Nº ALUNOS</th>
                                <th class="col-md-3">PERÍODO</th>
                                <th class="col-md-1 text-center">VALOR</th>
                              </tr>
                            </thead>
                            <tbody>
                                  @php
                                    {{
                                      $total = 0;
                                    }}
                                  @endphp
                                  @foreach ($cardapios as $cardapio)
                                    @php
                                      {{
                                        $datai = date("d-m-Y",strtotime($cardapio->data_inicio));
                                        $data_inicio = str_replace('-','/',$datai);
                                        $dataf = date("d-m-Y",strtotime($cardapio->data_fim));
                                        $data_fim = str_replace('-','/',$dataf);
                                        foreach($modalidades_escola as $modalidade_escola){
                                          if($cardapio->id_modalidade == $modalidade_escola->id){
                                            if($modalidade_escola->categoria_ensino == 1 && $modalidade_escola->idade_alunos == 1){
                                              $nomeModalidade = 'Creche (7 - 11 meses)';
                                            }else if ($modalidade_escola->categoria_ensino == 1 && $modalidade_escola->idade_alunos == 2) {
                                              $nomeModalidade = 'Creche (1 - 3 anos)';
                                            }else if ($modalidade_escola->categoria_ensino == 2 && $modalidade_escola->idade_alunos == 3) {
                                              $nomeModalidade = 'Pré-escola (4 - 5 anos)';
                                            }else if ($modalidade_escola->categoria_ensino == 3 && $modalidade_escola->idade_alunos == 4) {
                                              $nomeModalidade = 'Ensino Fundamental (6 - 10 anos)';
                                            }else if ($modalidade_escola->categoria_ensino == 3 && $modalidade_escola->idade_alunos == 5) {
                                              $nomeModalidade = 'Ensino Fundamental (11 - 15 anos)';
                                            }else if ($modalidade_escola->categoria_ensino == 4 && $modalidade_escola->idade_alunos == 6) {
                                              $nomeModalidade = 'Ensino Fundamental (16 - 18 anos)';
                                            }else if ($modalidade_escola->categoria_ensino == 5 && $modalidade_escola->idade_alunos == 7) {
                                              $nomeModalidade = 'EJA (19 - 30 anos)';
                                            }else{
                                              $nomeModalidade = 'EJA (31 - 60 anos)';
                                            }
                                          }
                                        }
                                        $total = $total + ($cardapio->valor * $cardapio->alunos);
                                      }}
                                    @endphp
                                    <tr>
                                      <td class="col-md-3">{{$cardapio->nome}}</td>
                                      <td class="col-md-3">{{$cardapio->nome_escola}} - {{$nomeModalidade}}</td>
                                      <td class="col-md-2">{{$cardapio->alunos}}</td>
                                      <td class="col-md-3">{{$data_inicio}} a {{$data_fim}}</td>
                                      <td class="col-md-1 text-center">R$ {{$cardapio->valor * $cardapio->alunos}}</td>
                                    </tr>
                                    @endforeach
                                    <tr>
                                      <td colspan="3"></td>
                                      <td><strong>TOTAL:</strong></td>
                                      <td class="col-md-1 text-center">R$ {{$total}}</td>
                                    </tr>
                            </tbody>
                          </table>

                          @else
                              <br/>
                              <div class="col-md-12 text-center alert alert-warning"><strong>Não há registros para exibir.</strong></div>
                          @endif
              </p>
            </main>


            <script src="{{public_path('/js/jquery-1.12.4.min.js')}}"></script>
            <script src="{{public_path('/js/popper.min.js')}}"></script>
            <script src="{{public_path('/bootstrap/js/bootstrap.min.js')}}"></script>
            <script src="{{public_path('/js/jquery.mask.min.js')}}"></script>
            <script src="{{public_path('/js/pnotify.custom.min.js')}}"></script>
            <script src="{{public_path('/js/jquery.maskMoney.min.js')}}"></script>
            <script src="{{public_path('/js/jquery.inputmask.js')}}"></script>
            <script src="{{public_path('/js/jquery.inputmask.extensions.js')}}"></script>
            <script src="{{public_path('/js/jquery.inputmask.date.extensions.js')}}"></script>
            <!-- daterangepicker -->
            <script src="{{public_path('/js/moment.min.js')}}"></script>
            <script src="{{public_path('/js/daterangepicker.js')}}"></script>
            <!-- datepicker -->
            <script src="{{public_path('/js/bootstrap-datepicker.js')}}"></script>
            <!-- AdminLTE App -->
            <script src="{{public_path('/js/adminlte.min.js')}}"></script>
            <script src="{{public_path('/js/dashboard.js')}}"></script>
            <script src="{{public_path('/js/relatorios/gerar_pdf_cardapios.min.js')}}"></script>
      </body>
</html>
