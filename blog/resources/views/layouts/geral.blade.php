<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'SIGECARD') }}</title>


    <!-- Required meta tags-->
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="au theme template">
      <meta name="author" content="Hau Nguyen">
      <meta name="keywords" content="au theme template">

      <!-- Title Page-->
      <title>Dashboard</title>

      <!-- Bootstrap CSS-->

      <!-- Vendor CSS-->
      <link href="/css/animsition.min.css" rel="stylesheet" >
      <link href="/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" >
      <link href="/css/animate.css" rel="stylesheet" >
      <link href="/css/hamburgers.min.css" rel="stylesheet" >
      <link href="/css/slick.css" rel="stylesheet" >
      <link href="/css/select2.min.css" rel="stylesheet" >
      <link href="/css/perfect-scrollbar.css" rel="stylesheet" >

      <!-- Main CSS-->
      <link href="/css/theme.css" rel="stylesheet" >



    <!-- Styles -->

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <!--link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous"-->
    <link href="{{ asset('css/app2.css') }}" rel="stylesheet">
    <link href="{{ asset('css/AdminLTE.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="/css/listas.min.css">
    <!-- Date Picker -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/css/bootstrap-datepicker.min.css" integrity="sha512-x2MVs84VwuTYP0I99+3A4LWPZ9g+zT4got7diQzWB4bijVsfwhNZU2ithpKaq6wTuHeLhqJICjqE6HffNlYO7w==" crossorigin="anonymous" />
    <!-- Daterange picker -->
    <link rel="stylesheet" href="/css/daterangepicker.css">
    <link rel="stylesheet" href="/css/pnotify.custom.min.css">
    <link rel="stylesheet" href="/datatables.net-bs/css/dataTables.bootstrap.min.css">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="/css/bootstrap-select.min.css">
    <style>
        #carregando {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: fixed;
          display: block;
          opacity: 0.7;
          background-color: #fff;
          z-index: 99;
          text-align: center;
        }
        #loading-image {
          position: absolute;
          top: 250px;
          left: 630px;
          z-index: 100;
        }
    </style>

</head>
<body class="hold-transition skin-blue sidebar-mini">
  <div id="carregando">
    <img id="loading-image" src="{{ asset('img/giphy.gif') }}" alt="Loading..." />
  </div>
    <?php
        $ativarMenu = array(
          1 => "panel panel-primary",
          2 => "panel panel-primary",
          3 => "panel panel-primary",
          4 => "panel panel-primary",
          5 => "panel panel-primary",
          6 => "panel panel-primary",
          7 => "panel panel-primary",
          8 => "panel panel-primary",
        );
        $ativarMenu[$posicao] = "panel panel-info";
    ?>

    <div class="wrapper">
      <header class="main-header">
        <!--
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image
                    <a class="navbar-brand" href="{{ url('/home') }}">
                        <p class="text-primary"><strong>SIGECARD</strong></p>
                    </a>

                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar

                    <ul class="nav navbar-nav navbar-left">
                      <li class="dropdown">

                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                            <i class="far fa-question-circle"></i>&nbsp;Tutorial <span class="caret"></span>
                          </a>

                          <ul class="dropdown-menu">
                              <li>
                                  <a href=" https://youtu.be/7qeyvg3eMGI" target="_blank"><i class="fab fa-youtube"></i>&nbsp;&nbsp;Assista ao tutorial no YouTube</a>
                              </li>


                          </ul>
                      </li>
                    </ul>

                    <!-- Right Side Of Navbar
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links
                        @guest
                            <!--li><a href="{{ route('login') }}">Login</a></li-->
                            <!--li><a href="{{ route('register') }}">Register</a></li
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                                  <i class="far fa-user"></i>&nbsp;&nbsp;{{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="{{ route('user.edit') }}">
                                            <i class="fas fa-user-edit"></i> Alterar dados
                                        </a>
                                    </li>
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            <i class="fas fa-sign-out-alt"></i> Sair
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>

                                </ul>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
      -->
      </header>
    <div class="page-container">
        <!-- HEADER MOBILE-->
        <header class="header-mobile d-block d-lg-none">
            <div class="header-mobile__bar">
                <div class="container-fluid">
                    <div class="header-mobile-inner">
                        <a class="logo" href="index.html">
                            <img src="img/logo.png" alt="CoolAdmin" />
                        </a>
                        <button class="hamburger hamburger--slider" type="button">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <nav class="navbar-mobile">
                <div class="container-fluid">
                    <ul class="navbar-mobile__list list-unstyled">
                        <li>
                            <a href="{{route('menu.show')}}">
                                <i class="fas fa-book-open"></i>Cardápios</a>
                        </li>
                        <li>
                            <a href="{{route('preparation.show')}}">
                                <i class="fas fa-stopwatch"></i>Preparações</a>
                        </li>
                        <li>
                            <a href="{{route('item.show')}}">
                                <i class="fas fa-apple-alt"></i>Alimentos</a>
                        </li>
                        <li>
                            <a href="{{route('meal_type.show')}}">
                                <i class="fas fa-utensils"></i>Refeições</a>
                        </li>
                        <li>
                            <a href="{{route('school.show')}}">
                                <i class="fas fa-school"></i>Escolas</a>
                        </li>
                        <li>
                            <a href="{{route('references.show')}}">
                                <i class="fas fa-balance-scale"></i>referencias Nutricionais</a>
                        </li>
                        <li class="has-sub">
                            <a class="js-arrow" href="#">
                                <i class="fas fa-copy"></i>Relatorios</a>
                            <ul class="navbar-mobile-sub__list list-unstyled js-sub-list">
                                <li>
                                    <a href="{{route('report.preparations')}}">Login</a>
                                </li>
                                <li>
                                    <a href="register.html">Register</a>
                                </li>
                                <li>
                                    <a href="forget-pass.html">Forget Password</a>
                                </li>
                            </ul>
                        </li>
                        <li class="has-sub">
                            <a class="js-arrow" href="{{route('users.show')}}">
                                <i class="fas  fa-users"></i>Usuários</a>
                        </li>
                        <li class="has-sub">
                            <a class="js-arrow" href="https://youtu.be/7qeyvg3eMGI">
                                <i class="fab  fa-youtube"></i>Tutorial</a>
                        </li>
                        <li class="has-sub">
                            <a class="js-arrow" href="{{ route('logout') }}">
                                <i class="fas  fa-door-open"></i>Sair</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- END HEADER MOBILE-->
        <div class="container">
          <div class="content-wrapper">
            <section class="content">
                <div class="row" id="rowbox">
                  <div class="col-md-3" id="contentmd3">
                <!-- MENU SIDEBAR-->
                     <aside class="menu-sidebar d-none d-lg-block">
                         <div class="logo">
                             <a href="{{route('home.index')}}">
                                 <img src="/img/logo.png" alt="Cool Admin" />
                             </a>
                         </div>
                         <div class="menu-sidebar__content js-scrollbar1">
                             <nav class="navbar-sidebar">
                                 <ul class="list-unstyled navbar__list">
                                     <li class="active has-sub">
                                         <a class="js-arrow" href="{{route('menu.show')}}">
                                             <i class="fas fa-book-open"></i>Cardápios</a>
                                      </li>
                                     <li>
                                         <a href="{{route('preparation.show')}}">
                                             <i class="fas fa-stopwatch"></i>Preparações</a>
                                     </li>
                                     <li>
                                         <a href="{{route('item.show')}}">
                                             <i class="fas fa-apple-alt"></i>Alimentos</a>
                                     </li>
                                     <li>
                                         <a href="{{route('meal_type.show')}}">
                                             <i class="fas fa-utensils"></i>Refeições</a>
                                     </li>
                                     <li>
                                         <a href="{{route('school.show')}}">
                                             <i class="fas fa-school"></i>Escolas</a>
                                     </li>
                                     <li>
                                         <a href="{{route('references.show')}}">
                                             <i class="fas fa-balance-scale"></i>Referências Nutricionais</a>
                                     </li>
                                     <li class="has-sub">
                                         <a class="js-arrow" href="#">
                                             <i class="fas fa-copy"></i>Relatorios</a>
                                             <ul class="list-unstyled navbar__sub-list js-sub-list">
                                               <li>
                                                 <a href="{{route('report.preparations')}}">Button</a>
                                               </li>
                                               <li>
                                                 <a href="badge.html">Badges</a>
                                               </li>
                                               <li>
                                                 <a href="tab.html">Tabs</a>
                                               </li>
                                              </ul>

                                     <li class="has-sub">
                                         <a class="js-arrow" href="{{route('users.show')}}">
                                             <i class="fas  fa-users"></i>Usuários</a>
                                     </li>
                                     <li class="has-sub">
                                         <a class="js-arrow" href="https://youtu.be/7qeyvg3eMGI">
                                             <i class="fab  fa-youtube"></i>Tutorial</a>
                                     </li>
                                     <li class="has-sub">
                                      <a class="js-arrow" href="{{ route('logout') }}">
                                                <i class="fas  fa-door-open"></i> Sair</a>

                                     </li>
                                 </ul>
                             </nav>
                         </div>
                     </aside>
                    </div>
                 <!-- END MENU SIDEBAR-->
                 <!-- PAGE CONTAINER-->
   <!--div class="row">
      <div class="page-container">

                    <!--
                      <div class="panel-group" id="accordion">
                        @if(Auth::user()->type == 1 || Auth::user()->type == 2)
                            <div class="{{$ativarMenu[1]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a  href="{{route('menu.show')}}" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-book-open"></i></span>&nbsp;&nbsp;Cardápios</a>
                                    </h4>
                                </div>

                            </div>


                            <div class="{{$ativarMenu[2]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a  href="{{route('preparation.show')}}" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-stopwatch"></i></span>&nbsp;&nbsp;&nbsp;Preparações</a>
                                    </h4>
                                </div>

                            </div>
                            <div class="{{$ativarMenu[3]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="{{route('item.show')}}" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-apple-alt"></i></span>&nbsp;&nbsp;&nbsp;Alimentos</a>
                                    </h4>
                                </div>

                            </div>
                            <div class="{{$ativarMenu[4]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="{{route('meal_type.show')}}" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-utensils"></i></span>&nbsp;&nbsp;&nbsp;Refeições</a>
                                    </h4>
                                </div>

                            </div>
                            <div class="{{$ativarMenu[5]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="{{route('school.show')}}" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-school"></i></span>&nbsp;&nbsp;Escolas</a>
                                    </h4>
                                </div>

                            </div>

                            <div class="{{$ativarMenu[6]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="{{route('references.show')}}" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-balance-scale"></i></span>&nbsp;&nbsp;Referências Nutricionais</a>
                                    </h4>
                                </div>

                            </div>

                            @endif
                            <div class="{{$ativarMenu[7]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="#" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-file-medical-alt"></i></span>&nbsp;&nbsp;&nbsp;Relatórios</a>
                                    </h4>
                                </div>

                            </div>
                            @if(Auth::user()->type == 1)
                            <div class="{{$ativarMenu[8]}}">
                                <div class="panel-heading">
                                    <h4 class="panel-title ">
                                        <a href="{{route('users.show')}}" style="text-decoration:none" class="fill-div">
                                        <span style="font-size: 1em;"><i class="fas fa-users"></i></span>&nbsp;&nbsp;Usuários</a>
                                    </h4>
                                </div>

                            </div>
                            @endif

                        </div>
                              -->

                        <!--div class="row">
                          <div class="col-md-12" hidden id="table_calc">


                            <div class="box box-primary collapsed-box">
                              <div class="box-header with-border">
                                <h3 class="box-title" data-container="body" data-toggle="popover" data-placement="right" data-content="Média dos valores nutricionais do cardápio comparada a referência nutricional associada ao destino.">Valores Nutricionais</h3>

                                <div class="box-tools pull-right">
                                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i>
                                  </button>
                                </div>
                                < /.box-tools -->
                              <!--/div-->
                              <!-- /.box-header -->
                              <!--div class="box-body">
                                <table class="table table-striped" id="table_valor_nuticional">
                                  <tr>
                                    <th>Nutriente</th>
                                    <th style="width: 40px">%</th>
                                  </tr>
                                  <tr id="tr_calorias">
                                    <td >Calorias (Kcal)</td>
                                    <td id="td_calorias"><span class="badge bg-red" id="span_p_calorias" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_carboidratos">
                                    <td>Carboidratos (g)</td>
                                    <td id="td_carboidratos"><span class="badge bg-red" id="span_p_carboidratos" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_proteinas">
                                    <td>Proteínas (g)</td>
                                    <td id="td_proteinas"><span class="badge bg-red" id="span_p_proteinas" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_lipidios">
                                    <td>Lipídios (g)</td>
                                    <td id="td_lipidios"><span class="badge bg-red" id="span_p_lipidios" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_fibras">
                                    <td>Fibras (g)</td>
                                    <td id="td_fibras"><span class="badge bg-red" id="span_p_fibras" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_a">
                                    <td>Vitamina A (μg)</td>
                                    <td id="td_vit_a"><span class="badge bg-red" id="span_p_vit_a" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_c">
                                    <td>Vitamina C (mg)</td>
                                    <td id="td_vit_c"><span class="badge bg-red" id="span_p_vit_c" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_d">
                                    <td>Vitamina D (μg)</td>
                                    <td id="td_vit_d"><span class="badge bg-red" id="span_p_vit_d" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_e">
                                    <td>Vitamina E (mg)</td>
                                    <td id="td_vit_e"><span class="badge bg-red" id="span_p_vit_e" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_b1">
                                    <td>Vitamina B1 (mg)</td>
                                    <td id="td_vit_b1"><span class="badge bg-red" id="span_p_vit_b1" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_b2">
                                    <td>Vitamina B2 (mg)</td>
                                    <td id="td_vit_b2"><span class="badge bg-red" id="span_p_vit_b2" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_b6">
                                    <td>Vitamina B6 (mg)</td>
                                    <td id="td_vit_b6"><span class="badge bg-red" id="span_p_vit_b6" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_vit_b12">
                                    <td>Vitamina B12 (μg)</td>
                                    <td id="td_vit_b12"><span class="badge bg-red" id="span_p_vit_b12" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_niacina">
                                    <td>Niacina (mg)</td>
                                    <td id="td_niacina"><span class="badge bg-red" id="span_p_niacina" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_folico">
                                    <td>Áciodo Fólico (μg)</td>
                                    <td id="td_folico"><span class="badge bg-red" id="span_p_folico" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_pantotenico">
                                    <td>Ácido Pant.(mg)</td>
                                    <td id="td_pantotenico"><span class="badge bg-red" id="span_p_pantotenico" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_calcio">
                                    <td>Cálcio (mg)</td>
                                    <td id="td_calcio"><span class="badge bg-red" id="span_p_calcio" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_ferro">
                                    <td>Ferro (mg)</td>
                                    <td id="td_ferro"><span class="badge bg-red" id="span_p_ferro" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_magnesio">
                                    <td>Magnésio (mg)</td>
                                    <td id="td_magnesio"><span class="badge bg-red" id="span_p_magnesio" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_potassio">
                                    <td>Potássio (mg)</td>
                                    <td id="td_potassio"><span class="badge bg-red" id="span_p_potassio" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_selenio">
                                    <td>Selênio (μg)</td>
                                    <td id="td_selenio"><span class="badge bg-red" id="span_p_selenio" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_fosforo">
                                    <td>Fósforo (mg)</td>
                                    <td id="td_fosforo"><span class="badge bg-red" id="span_p_fosforo" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_iodo">
                                    <td>Iodo (μg)</td>
                                    <td id="td_iodo"><span class="badge bg-red" id="span_p_iodo" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_cobre">
                                    <td>Cobre (mg)</td>
                                    <td id="td_cobre"><span class="badge bg-red" id="span_p_cobre" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_zinco">
                                    <td>Zinco (mg)</td>
                                    <td id="td_zinco"><span class="badge bg-red" id="span_p_zinco" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_sodio">
                                    <td>Sódio (mg)</td>
                                    <td id="td_sodio"><span class="badge bg-red" id="span_p_sodio" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_g_total">
                                    <td>G. Total (g)</td>
                                    <td id="td_g_total"><span class="badge bg-red" id="span_p_g_total" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_colesterol">
                                    <td>Colesterol (mg)</td>
                                    <td id="td_colesterol"><span class="badge bg-red" id="span_p_colesterol" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_g_saturada">
                                    <td>G. Saturada (g)</td>
                                    <td id="td_g_saturada"><span class="badge bg-red" id="span_p_g_saturada" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_g_poliinsaturada">
                                    <td>G. Poli. (g)</td>
                                    <td id="td_g_poliinsaturada"><span class="badge bg-red" id="span_p_g_poliinsaturada" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                  <tr id="tr_g_monoinsaturada">
                                    <td>G. Mono. (g)</td>
                                    <td id="td_g_monoinsaturada"><span class="badge bg-red" id="span_p_g_monoinsaturada" data-container="body" data-toggle="popover" data-placement="right">0.0 %</span></td>
                                  </tr>
                                </table>
                              </div>
                              <!-- /.box-body -->
                            </div>
                            <!-- /.box -->
                          <!--/div>
                        </div>
                      </div>
                    </div>
                  </div-->
                      <div class="col-md-9"  >
                              @yield('content')
                      </div>
                  </div>
              </section>
            </div>
        </div>
        <!--footer class="text-center text-white">
            <div class="d-flex flex-row">

            <div class="col-md-12">


            <div class="bg-dark text-center p-2" style="background-color: rgba(0, 0, 0, 0.2);">
              © 2022 Diretoria de Desenvolvimento Tecnológico - SEPLAG
            </div>
          </div>
          </div>
        </footer-->
      </div>

    <!--Scripts-->
    @if($errors->any())
        <script type="application/javascript">
              <?php
                echo 'var errors = '.json_encode($errors->all()).';';
              ?>
        </script>
     @endif
    @if (Session::has('mensagem-sucesso'))
        <script type="application/javascript">
            var msg = <?=json_encode(Session::get('mensagem-sucesso'))?>;
            var tipo_msg = <?=json_encode("success")?>;
        </script>
        <?php Session::pull('mensagem-sucesso') ?>
    @endif
    @if (Session::has('mensagem-erro'))
        <script>
            var msg = <?=json_encode(Session::get('mensagem-erro'))?>;
            var tipo_msg = <?=json_encode("error")?>;
        </script>
        <?php Session::pull('mensagem-erro') ?>
    @endif
    @if (Session::has('mensagem-info'))
        <script>
            var msg = <?=json_encode(Session::get('mensagem-info'))?>;
            var tipo_msg = <?=json_encode("info")?>;
        </script>
        <?php Session::pull('mensagem-info') ?>
    @endif







    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js" integrity="sha512-jKxp7JHEN6peEmzmg6a7XJBORNTB0ITD2Pi+6FUkc16PCaNAJX2ahZ1ejn1p1uY37Pxyirn/0OMNZbITbEg3jw==" crossorigin="anonymous"></script>
    <script src="/js/popper.min.js"></script>
    <!--script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>




    <!-- Vendor JS       -->
    <script src="js/tema/slick/slick.min.js">
    </script>
    <script src="js/tema/wow/wow.min.js"></script>
    <script src="js/tema/animsition/animsition.min.js"></script>
    <script src="js/tema/bootstrap-progressbar/bootstrap-progressbar.min.js">
    </script>
    <script src="js/tema/counter-up/jquery.waypoints.min.js"></script>
    <script src="js/tema/counter-up/jquery.counterup.min.js">
    </script>
    <script src="js/tema/circle-progress/circle-progress.min.js"></script>
    <script src="js/tema/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="js/tema/chartjs/Chart.bundle.min.js"></script>
    <script src="js/tema/select2/select2.min.js">
    </script>






    <script src="/js/main.js"></script>
    <script src="/js/jquery.mask.min.js"></script>
    <script src="/js/geral.min.js"></script>
    <script src="/js/pnotify.custom.min.js"></script>
    <script src="/js/jquery.inputmask.js"></script>
    <script src="/js/jquery.inputmask.date.extensions.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.1.1/Chart.min.js" integrity="sha512-5yz1xB3xcSOSDB8htV5Xe66z1E6zQvhnivyySyk0JzEFgBNbMPjPi5eez0W3U5qDU8y1oe9AwkUM4RuuIZEB1A==" crossorigin="anonymous"></script>
    <!-- daterangepicker -->
    <script src="/js/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/2.1.27/daterangepicker.min.js" integrity="sha512-d954S1Yc34Z+zNUtvoomoCtG1lCzfoENszxOXmqB784muP6G6qEXCug2HXLFn93H05wr3jfHTQwDdLQrUtXxrQ==" crossorigin="anonymous"></script>
    <!-- datepicker -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/js/bootstrap-datepicker.min.js" integrity="sha512-cOGL6gI01KK2Bws211W8S3COhzrorBbzKvLPWYOVtSEYet3yG1fzJrimtwh8rUyvMy9qjgY2e7Rt6IwyaiX1Mg==" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/locales/bootstrap-datepicker.pt-BR.min.js"></script>

    <!-- AdminLTE App -->
    <script src="/js/adminlte.min.js"></script>
    <script src="/js/dashboard.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.js" integrity="sha512-3cliQNYUH45H/VTmQNv/y6tb+P8oFZj4O9xrlRFDksT5LtqQb25pK7g6NHha3+yxSYwSVeGyf+WGpJU/JX9U7Q==" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/dataTables.bootstrap.min.js" integrity="sha512-1PHS58TJ+J/Qh98wpT8voc7lw1miMeBm9IA5h4TPaA5acfXwQIErGE+NPvmD22n+iBVTbudSp0WBl2TFkRUmlA==" crossorigin="anonymous"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/js/bootstrap-select.min.js" integrity="sha512-qhZ17YtOBrOuBteWuCoH/UVUETTYTOPkKleSc1+yD1E4sjVB+GEff2r7lDBnVbfavKrG9b+A2LGpJrtB05G9HQ==" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js" integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA==" crossorigin="anonymous"></script>


    <script type="text/javascript">
      var APP_URL = {!! json_encode(url('/')) !!}
    </script>

    <script type="application/javascript">
          <?php
              if(isset($ativarMenu)) {
                  echo 'var ativarMenu = '.json_encode($ativarMenu).';';
              }
          ?>
    </script>
    @yield('scripts')
    <!--script src="{{ asset('js/app.js') }}"></script-->
    <script>
      $(window).load(function() {
        $('#carregando').hide();
      });
    </script>
</body>

</html>
