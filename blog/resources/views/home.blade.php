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
                        <h4><strong>SIGECARD</strong> - é um sistema que tem como objetivo otimizar os processos de planejamento e elaboração de cardápios e preparações alimentícias. O software fornece ferramentas que permitem avaliar a qualidade e a composição nutricional das refeições ofertadas nas escolas públicas e o seu atendimento às exigências do Programa Nacional de Alimentação Escolar (PNAE), além de permitir o controle de despesas com alimentação escolar<h4>
                    </div>
                    <div class="row text-center">

                        <br/>
                        <button type="button" class="btn btn-secondary mb-1" data-toggle="modal" data-target="#largeModal">
    										Large
    									  </button>
                        <img src="{{ asset('img/seulogo.png') }}"  width="50%" id= "seulogo">
                    </div>
                    <br/><br/>
                </div>
            </div>
  <!-- modal large -->
  	<div class="modal fade" id="largeModal" tabindex="-1" role="dialog" aria-labelledby="largeModalLabel" aria-hidden="true">
  		<div class="modal-dialog modal-lg" role="document">
  			<div class="modal-content">
  				<div class="modal-header">
  					<h5 class="modal-title" id="largeModalLabel">Large Modal</h5>
  					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
  						<span aria-hidden="true">&times;</span>
  					</button>
  				</div>
  				<div class="modal-body">
  					<p>
  						There are three species of zebras: the plains zebra, the mountain zebra and the Grévy's zebra. The plains zebra and the mountain
  						zebra belong to the subgenus Hippotigris, but Grévy's zebra is the sole species of subgenus Dolichohippus. The latter
  						resembles an ass, to which it is closely related, while the former two are more horse-like. All three belong to the
  						genus Equus, along with other living equids.
  					</p>
  				</div>
  				<div class="modal-footer">
  					<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
  					<button type="button" class="btn btn-primary">Confirm</button>
  				</div>
  			</div>
  		</div>
  	</div>
  	<!-- end modal large -->


@endsection
