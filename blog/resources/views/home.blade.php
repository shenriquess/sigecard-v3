@extends('layouts.geral')

@section('content')

          <?php $posicao = -1 ?>


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
                        <h4><strong>SIGECARD</strong> - Sistema de Gestão de Alimentação Escolar<h4>
                    </div>
                    <div class="row text-center">

                        <br/>
                        <img src="{{ asset('img/brasaosaogoncalo.jpg') }}"  width="43%">
                    </div>
                    <br/><br/>
                </div>
            </div>

@endsection
