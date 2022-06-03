@extends('layouts.geral')

@section('content')

          <?php $posicao = -1 ?>

          <div class="animsition">


            <div class="panel panel-default">
                <div class="panel-heading">
                      <h4 class="text-center"><p class="text-primary"><strong>SIGECARD - HOMEPAGE</strong></p></h4>
                </div>
                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="row text-center">
                        <h4><strong>SIGECARD</strong> - é um sistema que tem como objetivo otimizar os processos de planejamento e elaboração de cardápios e preparações alimentícias. O software fornece ferramentas que permitem avaliar a qualidade e a composição nutricional das refeições ofertadas nas escolas públicas e o seu atendimento às exigências do Programa Nacional de Alimentação Escolar (PNAE), além de permitir o controle de despesas com alimentação escolar<h4>
                    </div>
                    <div class="row text-center">

                        <br/>
                        <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
              </button>
                        <img src="{{ asset('img/seulogo.png') }}"  width="50%" id= "seulogo">
                    </div>
                    <br/><br/>
                </div>
            </div>




  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

@endsection
