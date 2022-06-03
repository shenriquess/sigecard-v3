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
                        <img src="{{ asset('img/seulogo.png') }}"  width="50%" id= "seulogo">
                    </div>
                    <br/><br/>
                </div>
            </div>  
</div>

@endsection
