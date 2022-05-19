<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Cardapio;
use App\Models\TipoRefeicao;
use App\Models\TipoPreparacao;
use App\Models\TipoItem;
use App\Models\FonteAlimento;
use App\Models\Preparacao;
use App\Models\Item;
use App\Models\ItemCardapio;
use App\Models\ViewPreparacao;
use App\Models\Referencias;
use App\Models\MedidasItem;
use App\Models\ModalidadesEscola;
use App\Models\Escola;
use DB;
use SnappyPDF;
use App;


class CardapioController extends Controller
{

    public function __construct()
     {
       $this->middleware('auth');
     }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $search = $request->get('search');

      $search2 = $request->get('reservation2');

      if (!is_null($search2) && $search > 0) {
        $data = explode(" - ", $search2);
        $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
        $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
        $sql = DB::select('SELECT c.*, e.nome as nome_escola
                                   FROM cardapios c
                                   INNER JOIN escolas e
                                   ON (c.id_escola = e.id)
                                   WHERE c.data_inicio >= "'.$datai.'"
                                   AND c.data_fim <= "'.$dataf.'"
                                   AND c.id_escola = "'.$search.'"
                                   ORDER BY c.data_inicio DESC
                                   ');
         $total = count($sql);//total de linhas da query

         $my_query = $sql; //query

         $quant = 10; //total por página

         //paginação
         $currentPage = $request->get('page', 1); //pega a página
         $query_slice = array_slice($my_query, ($currentPage - 1) * $quant, $quant); //fatia o resultado da query
         $collect = collect($query_slice);
         $cardapios = new LengthAwarePaginator($collect, $total, $quant, $currentPage); //chama a paginação
         $cardapios->setPath($request->url());

      }elseif (!is_null($search2) && $search == 0) {
        $data = explode(" - ", $search2);
        $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
        $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
        $sql = DB::select('SELECT c.*, e.nome as nome_escola
                                   FROM cardapios c
                                   INNER JOIN escolas e
                                   ON (c.id_escola = e.id)
                                   WHERE c.data_inicio >= "'.$datai.'"
                                   AND c.data_fim <= "'.$dataf.'"
                                   ORDER BY c.data_inicio DESC
                                   ');
       $total = count($sql);//total de linhas da query

       $my_query = $sql; //query

       $quant = 10; //total por página

       //paginação
       $currentPage = $request->get('page', 1); //pega a página
       $query_slice = array_slice($my_query, ($currentPage - 1) * $quant, $quant); //fatia o resultado da query
       $collect = collect($query_slice);
       $cardapios = new LengthAwarePaginator($collect, $total, $quant, $currentPage); //chama a paginação
       $cardapios->setPath($request->url());

      }elseif (is_null($search2) && $search > 0) {
          $cardapios = DB::table('cardapios')
                  ->join('escolas', function ($join) use ($search) {
                        $join->on('escolas.id', '=', 'cardapios.id_escola')
                             ->where('escolas.id', '=', $search);
                    })
                    ->select('cardapios.*', 'escolas.nome as nome_escola')
                    ->orderByDesc('cardapios.data_inicio')
                    ->paginate(10);
      }else {

          //$cardapios = Cardapio::orderBy('nome')->get();
          $cardapios = DB::table('cardapios')
            ->join('escolas', 'escolas.id', '=', 'cardapios.id_escola')
            ->select('cardapios.*', 'escolas.nome as nome_escola')
            ->orderByDesc('cardapios.data_inicio')
            ->paginate(10);
      }

      /**/

      $escolas = Escola::orderBy('nome')->get();
      $modalidades_escola = DB::table('modalidades_escolas')->get();
      return view('cardapio.cardapio_show', compact('search','search2','escolas','cardapios','modalidades_escola'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $escolas = Escola::orderBy('nome')->get();
        if(is_null($escolas) || $escolas->count() == 0)
        {
            $escolas= null;
            session()->flash('mensagem-info','Não existem Escolas cadastradas.');
            return redirect()->route('home.index');
        }

        $modalidades_escola = DB::table('modalidades_escolas')->get();
        if(is_null($modalidades_escola) || $modalidades_escola->count() == 0)
        {
            $modalidades_escola = null;
            session()->flash('mensagem-info','Não existem Modalidades de Ensino cadastradas.');
            return redirect()->route('home.index');
        }

        $referencias = Referencias::get();
        if(is_null($referencias) || $referencias->count() == 0)
        {
            $referencias= null;
            session()->flash('mensagem-info','Não existem Referências Nutricionais cadastradas.');
            return redirect()->route('home.index');
        }

        $tipo_refeicoes = TipoRefeicao::orderBy('horario')->get();
        if(is_null($tipo_refeicoes) || $tipo_refeicoes->count() == 0)
        {
            $tipo_refeicoes = null;
            session()->flash('mensagem-info','Não existem Tipos de Refeições cadastrados.');
            return redirect()->route('home.index');
        }

        $itens = Item::orderBy('nome')->get();
        if(is_null($itens) || $itens->count() == 0)
        {
            $itens = null;
            session()->flash('mensagem-info','Não existem Alimentos cadastrados.');
            return redirect()->route('home.index');
        }

        $tipo_itens = TipoItem::orderBy('nome')->get();

        $fontes = FonteAlimento::orderBy('nome')->get();

        $tipo_preparacoes = TipoPreparacao::orderBy('nome')->get();
        if(is_null($tipo_preparacoes) || $tipo_preparacoes->count() == 0)
        {
            $tipo_preparacoes = null;
        }

        $medidas_itens = DB::table('medidas_items')->get();

        $cardapios = Cardapio::orderBy('nome')->get();

        $view_preparacoes = ViewPreparacao::all();

        return view('cardapio.create', compact('modalidades_escola','tipo_refeicoes', 'tipo_preparacoes','tipo_itens','fontes','itens',
                    'view_preparacoes','referencias','cardapios','medidas_itens','escolas'));

    }


    public function import($id)
    {
    //  dd($id);
      $medidas_itens = DB::table('medidas_items')->get();
      $escolas = Escola::orderBy('nome')->get();
      $cardapios = Cardapio::orderBy('nome')->get();
      $cardapio = DB::table('cardapios')->find($id);

      if($cardapio && isset($cardapio)){
            $referencias = Referencias::get();
            $view_preparacoes = ViewPreparacao::all();

            $itens_cardapio = DB::select('SELECT id_item, tipo, id_tipo_item, nome_tipo_item,
                                                nome_item, nome_refeicao, id_refeicao, dia_semana,
                                                id_unidade_medida, per_capta_alimento
                                   FROM (
                                     SELECT i.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                            i.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                            ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                            ic.per_capta_alimento as per_capta_alimento
                                      FROM item_cardapios as ic
                                      INNER JOIN tipo_refeicaos as r
                                      ON (ic.id_refeicao = r.id)
                                      INNER JOIN items i
                                      ON (ic.id_alimento = i.id)
                                      INNER JOIN tipo_items t
                                      ON (i.id_tipo_item = t.id )
                                      WHERE (ic.id_cardapio = ?)

                                      UNION

                                      SELECT p.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                             p.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                             ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                             ic.per_capta_alimento as per_capta_alimento
                                       FROM item_cardapios as ic
                                       INNER JOIN tipo_refeicaos as r
                                       ON (ic.id_refeicao = r.id)
                                       INNER JOIN preparacaos p
                                       ON (ic.id_preparacao = p.id)
                                       INNER JOIN tipo_preparacaos t
                                       ON (p.id_tipo_preparacao = t.id )
                                        WHERE (ic.id_cardapio = ?)

                                     ) as aux
                                     ORDER BY (dia_semana)
                              ',[$cardapio->id,$cardapio->id]);

              $tipo_preparacoes  = TipoPreparacao::get();
              $tipo_itens = TipoItem::get();
              $fontes = FonteAlimento::get();
              $itens = Item::get();
              $modalidades_escola = ModalidadesEscola::get();
              $tipo_refeicoes = TipoRefeicao::orderBy('horario')->get();

              return view('cardapio.cardapio_import', compact('cardapio', 'itens_cardapio', 'fontes', 'tipo_preparacoes', 'tipo_itens', 'itens','escolas',
                                                              'tipo_refeicoes', 'view_preparacoes','referencias','cardapios','modalidades_escola','medidas_itens'));

          }else{
              return view('errors.404');
          }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Cardapio $data)
    {
      $itens_cardapio = json_decode($request->testdata);
      $id_cardapio = 0;
      if ($itens_cardapio && isset($itens_cardapio[0])) {


          $data = [
            'nome' => $itens_cardapio[0]->nome,
            'id_modalidade' => $itens_cardapio[0]->modalidade,
            'id_escola' => $itens_cardapio[0]->escola,
            'id_usuario' => Auth::user()->id,
            'descricao' => $itens_cardapio[0]->descricao,
            'data_inicio' => $itens_cardapio[0]->data_inicio,
            'data_fim' => $itens_cardapio[0]->data_fim,
            'valor' => $itens_cardapio[0]->valor,
            'quantidade_dias' => $itens_cardapio[0]->numero_dias];

            try {
                $id_cardapio = DB::transaction(function () use ($data, $itens_cardapio) {
                $new = Cardapio::create($data);
                foreach ($itens_cardapio as $item_cardapio) {

                      if($item_cardapio->idTipoItem == 1){
                        $data2 = [
                          'id_preparacao' => NULL,
                          'id_alimento' => $item_cardapio->idItem,
                          'id_refeicao' => $item_cardapio->idRefeicao,
                          'tipo' => $item_cardapio->idTipoItem,
                          'dia_semana' => $item_cardapio->diaSemana,
                          'id_unidade_medida' => $item_cardapio->idMedida,
                          'per_capta_alimento' => $item_cardapio->perCapta,
                          'id_cardapio' => $new->id];
                      }else{
                          $data2 = [
                            'id_preparacao' => $item_cardapio->idItem,
                            'id_alimento' => NULL,
                            'id_refeicao' => $item_cardapio->idRefeicao,
                            'tipo' => $item_cardapio->idTipoItem,
                            'dia_semana' => $item_cardapio->diaSemana,
                            'id_unidade_medida' => $item_cardapio->idMedida,
                            'per_capta_alimento' => $item_cardapio->perCapta,
                            'id_cardapio' => $new->id];
                      }
                      ItemCardapio::create($data2);

                }
                return $new->id;

              });

            } catch (QueryException $e) {

                session()->flash('mensagem-erro','Erro ao salvar o registro.');
                response()->json($e);
                return redirect()->back();
            }


            return response()->json($id_cardapio);

      }

      session()->flash('mensagem-erro','Erro ao salvar o registro.');
      return response()->json($itens_cardapio);

    }


    function gerarPDFCardapio($id){

      $cardapio = DB::table('cardapios')->find($id);


      if($cardapio && isset($cardapio)){
            $referencias = Referencias::get();
            $view_preparacoes = ViewPreparacao::all();
            $itens_cardapio = DB::select('SELECT id_item, tipo, id_tipo_item, nome_tipo_item,
                                                nome_item, nome_refeicao, id_refeicao, dia_semana,
                                                id_unidade_medida, per_capta_alimento
                                   FROM (
                                     SELECT i.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                            i.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                            ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                            ic.per_capta_alimento as per_capta_alimento
                                      FROM item_cardapios as ic
                                      INNER JOIN tipo_refeicaos as r
                                      ON (ic.id_refeicao = r.id)
                                      INNER JOIN items i
                                      ON (ic.id_alimento = i.id)
                                      INNER JOIN tipo_items t
                                      ON (i.id_tipo_item = t.id )
                                      WHERE (ic.id_cardapio = ?)

                                      UNION

                                      SELECT p.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                             p.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                             ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                             ic.per_capta_alimento as per_capta_alimento
                                       FROM item_cardapios as ic
                                       INNER JOIN tipo_refeicaos as r
                                       ON (ic.id_refeicao = r.id)
                                       INNER JOIN preparacaos p
                                       ON (ic.id_preparacao = p.id)
                                       INNER JOIN tipo_preparacaos t
                                       ON (p.id_tipo_preparacao = t.id )
                                        WHERE (ic.id_cardapio = ?)

                                     ) as aux
                                     ORDER BY (dia_semana)
                              ',[$cardapio->id,$cardapio->id]);

              $modalidades_escola = ModalidadesEscola::get();
              $itens = Item::get();
              $escolas = Escola::get();
              $tipo_refeicoes = TipoRefeicao::orderBy('nome')->get();

              $pdf = SnappyPDF::loadView('cardapio.cardapio_pdf', compact('cardapio', 'itens_cardapio','escolas','itens','tipo_refeicoes','view_preparacoes','modalidades_escola','referencias'))->setPaper('a4')->setOrientation('landscape')->setOption('margin-bottom', 0);
              //return $pdf->download('cardapio'. $id . '.pdf');
              return $pdf->stream('cardapio'. $id . '.pdf');
              //return view('cardapio.cardapio_pdf', compact('cardapio', 'itens_cardapio','tipo_preparacoes', 'tipo_itens','destinos','itens','tipo_refeicoes', 'view_preparacoes', 'refeicoes_destino','referencias'));

              /*  $phpWord = new \PhpOffice\PhpWord\PhpWord();

                  $section = $phpWord->addSection();
                  $view = SnappyPDF::loadView('cardapio.cardapio_pdf', compact('cardapio', 'itens_cardapio','escolas','itens','tipo_refeicoes','view_preparacoes','modalidades_escola','referencias'));
                  $html = $view->html;
                  dd($html);
                  \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);

                  // Save file
                  $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
                          $objWriter->save('Appdividend.docx');
                          return response()->download(public_path('Appdividend.docx'));*/
          }else{
              return view('errors.404');
          }

            return view('errors.404');
              //return response()->json($id_cardapio);
    }


    function cardapioShowModal($id){
      $cardapio = DB::table('cardapios')->find($id);
      //dd($cardapio);
      if($cardapio && isset($cardapio)){
            $referencias = Referencias::get();
            $view_preparacoes = ViewPreparacao::all();
            $itens_cardapio = DB::select('SELECT id_item, tipo, id_tipo_item, nome_tipo_item,
                                                nome_item, nome_refeicao, id_refeicao, dia_semana,
                                                id_unidade_medida, per_capta_alimento
                                   FROM (
                                     SELECT i.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                            i.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                            ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                            ic.per_capta_alimento as per_capta_alimento
                                      FROM item_cardapios as ic
                                      INNER JOIN tipo_refeicaos as r
                                      ON (ic.id_refeicao = r.id)
                                      INNER JOIN items i
                                      ON (ic.id_alimento = i.id)
                                      INNER JOIN tipo_items t
                                      ON (i.id_tipo_item = t.id )
                                      WHERE (ic.id_cardapio = ?)

                                      UNION

                                      SELECT p.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                             p.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                             ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                             ic.per_capta_alimento as per_capta_alimento
                                       FROM item_cardapios as ic
                                       INNER JOIN tipo_refeicaos as r
                                       ON (ic.id_refeicao = r.id)
                                       INNER JOIN preparacaos p
                                       ON (ic.id_preparacao = p.id)
                                       INNER JOIN tipo_preparacaos t
                                       ON (p.id_tipo_preparacao = t.id )
                                        WHERE (ic.id_cardapio = ?)

                                     ) as aux
                                     ORDER BY (dia_semana)
                              ',[$cardapio->id,$cardapio->id]);

              $modalidades_escola = ModalidadesEscola::get();
              $itens = Item::get();
              $escolas = Escola::get();
              $tipo_refeicoes = TipoRefeicao::orderBy('nome')->get();



              return view('cardapio.cardapio_modal', compact('cardapio', 'itens_cardapio','escolas','itens','tipo_refeicoes','view_preparacoes', 'modalidades_escola','referencias'));

          }else{
              return view('errors.404');
          }

            return view('errors.404');
              //return response()->json($id_cardapio);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

      $medidas_itens = DB::table('medidas_items')->get();
      $escolas = Escola::orderBy('nome')->get();
      $cardapio = DB::table('cardapios')->find($id);
      if($cardapio && isset($cardapio)){
            $referencias = Referencias::get();
            $view_preparacoes = ViewPreparacao::all();
            $itens_cardapio = DB::select('SELECT id_item, tipo, id_tipo_item, nome_tipo_item,
                                                nome_item, nome_refeicao, id_refeicao, dia_semana,
                                                id_unidade_medida, per_capta_alimento
                                   FROM (
                                     SELECT i.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                            i.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                            ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                            ic.per_capta_alimento as per_capta_alimento
                                      FROM item_cardapios as ic
                                      INNER JOIN tipo_refeicaos as r
                                      ON (ic.id_refeicao = r.id)
                                      INNER JOIN items i
                                      ON (ic.id_alimento = i.id)
                                      INNER JOIN tipo_items t
                                      ON (i.id_tipo_item = t.id )
                                      WHERE (ic.id_cardapio = ?)

                                      UNION

                                      SELECT p.id as id_item, ic.tipo as tipo, t.id as id_tipo_item, t.nome as nome_tipo_item,
                                             p.nome as nome_item, r.nome as nome_refeicao, r.id as id_refeicao,
                                             ic.dia_semana as dia_semana, ic.id_unidade_medida as id_unidade_medida,
                                             ic.per_capta_alimento as per_capta_alimento
                                       FROM item_cardapios as ic
                                       INNER JOIN tipo_refeicaos as r
                                       ON (ic.id_refeicao = r.id)
                                       INNER JOIN preparacaos p
                                       ON (ic.id_preparacao = p.id)
                                       INNER JOIN tipo_preparacaos t
                                       ON (p.id_tipo_preparacao = t.id )
                                        WHERE (ic.id_cardapio = ?)

                                     ) as aux
                                     ORDER BY (dia_semana)
                              ',[$cardapio->id,$cardapio->id]);


              $fontes = FonteAlimento::get();
              $itens = Item::get();
              $modalidades_escola = ModalidadesEscola::get();
              $tipo_refeicoes = TipoRefeicao::orderBy('horario')->get();
              return view('cardapio.cardapio_edit', compact('cardapio', 'itens_cardapio', 'fontes','modalidades_escola','itens','tipo_refeicoes','view_preparacoes','referencias','medidas_itens','escolas'));

          }else{
              return view('errors.404');
            }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cardapio $data)
    {
      $itens_cardapio = json_decode($request->testdata);


      if ($itens_cardapio && isset($itens_cardapio[0])) {

          $dds = Cardapio::find($itens_cardapio[0]->id_cardapio);
          $data = [
            'nome' => $itens_cardapio[0]->nome,
            'id_modalidade' => $itens_cardapio[0]->modalidade,
            'id_escola' => $itens_cardapio[0]->escola,
            'id_usuario' => Auth::user()->id,
            'descricao' => $itens_cardapio[0]->descricao,
            'data_inicio' => $itens_cardapio[0]->data_inicio,
            'data_fim' => $itens_cardapio[0]->data_fim,
            'valor' => $itens_cardapio[0]->valor,
            'quantidade_dias' => $itens_cardapio[0]->numero_dias];

            try {
              DB::transaction(function () use ($data, $dds, $itens_cardapio) {
                $dds->update($data);
                $affectedRows = ItemCardapio::where('id_cardapio', '=', $itens_cardapio[0]->id_cardapio)->delete();
                foreach ($itens_cardapio as $item_cardapio) {

                      if($item_cardapio->idTipoItem == 1){
                        $data2 = [
                          'id_preparacao' => NULL,
                          'id_alimento' => $item_cardapio->idItem,
                          'id_refeicao' => $item_cardapio->idRefeicao,
                          'tipo' => $item_cardapio->idTipoItem,
                          'dia_semana' => $item_cardapio->diaSemana,
                          'id_unidade_medida' => $item_cardapio->idMedida,
                          'per_capta_alimento' => $item_cardapio->perCapta,
                          'id_cardapio' =>  $item_cardapio->id_cardapio];
                      }else{
                        $data2 = [
                          'id_preparacao' => $item_cardapio->idItem,
                          'id_alimento' => NULL,
                          'id_refeicao' => $item_cardapio->idRefeicao,
                          'tipo' => $item_cardapio->idTipoItem,
                          'dia_semana' => $item_cardapio->diaSemana,
                          'id_unidade_medida' => $item_cardapio->idMedida,
                          'per_capta_alimento' => $item_cardapio->perCapta,
                          'id_cardapio' =>  $item_cardapio->id_cardapio];
                      }

                      ItemCardapio::create($data2);

                }

              });

            } catch (QueryException $e) {

                session()->flash('mensagem-erro','Erro ao atualizar o registro.');
                return response()->json($e);
            }

            session()->flash('mensagem-sucesso','Dados alterados com sucesso!');

            return response()->json($itens_cardapio);

      }

      session()->flash('mensagem-erro','Erro ao atualizar o registro.');
      return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function destroy($id)
     {
         //
         try {
             DB::transaction(function () use ($id) {
               $affectedRows = ItemCardapio::where('id_cardapio', '=', $id)->delete();
               $affectedRows2 = Cardapio::where('id', '=', $id)->delete();

             });
         } catch (QueryException $e) {

             session()->flash('mensagem-erro','Erro ao excluir o registro.');
             return redirect()->back();
         }

         session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

         return redirect()->back();

     }
}
