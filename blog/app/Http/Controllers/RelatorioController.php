<?php

namespace App\Http\Controllers;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
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
use Barryvdh\DomPDF\Facade as PDF;
use LynX39\LaraPdfMerger\Facades\PdfMerger;
use App;


class RelatorioController extends Controller
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
     public function indexCardapio(Request $request)
     {
       $search = $request->get('search');

       $search2 = $request->get('reservation2');

       $search3 = $request->get('search3');
       if (!is_null($search2) && $search > 0 && $search3 > 0) {
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT c.*, e.nome as nome_escola
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    INNER JOIN modalidades_escolas m
                                    ON (c.id_modalidade = m.id)
                                    WHERE c.data_inicio >= "'.$datai.'"
                                    AND c.data_fim <= "'.$dataf.'"
                                    AND c.id_escola = "'.$search.'"
                                    AND m.id = "'.$search3.'"
                                    ORDER BY c.nome
                                    ');


       }elseif (!is_null($search2) && $search == 0) {
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT c.*, e.nome as nome_escola
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    WHERE c.data_inicio >= "'.$datai.'"
                                    AND c.data_fim <= "'.$dataf.'"
                                    ORDER BY c.nome
                                    ');


      }elseif (is_null($search2) && $search > 0 && $search3 == 0) {
           $data = date("Y-m-d");
           $cardapios = DB::table('cardapios')
                   ->join('escolas', function ($join) use ($search, $data) {
                         $join->on('escolas.id', '=', 'cardapios.id_escola')
                              ->where(function($query) use ($search, $data)
                                {
                                    $query->where('escolas.id', '=', $search)
                                          ->where('cardapios.data_inicio', '=' ,$data);
                                });



                              //where('escolas.id', '=', $search);
                     })
                     ->select('cardapios.*', 'escolas.nome as nome_escola')
                     ->orderBy('cardapios.nome')
                     ->get();
       }elseif (is_null($search2) && $search > 0 && $search3 > 0) {
           $data = date("Y-m-d");
           $cardapios = DB::table('cardapios')
                   ->join('escolas', function ($join) use ($search) {
                         $join->on('escolas.id', '=', 'cardapios.id_escola')
                              ->where('escolas.id', '=', $search);
                     })
                     ->join('modalidades_escolas', function ($join) use ($search3) {
                           $join->on('cardapios.id_modalidade', '=', 'modalidades_escolas.id')
                                ->where('modalidades_escolas.id', '=', $search3);
                       })
                       ->where(function($query) use ($data)
                         {
                             $query->where('cardapios.data_inicio', '=' ,$data);
                         })
                     ->select('cardapios.*', 'escolas.nome as nome_escola')
                     ->orderBy('cardapios.nome')
                     ->get();
       }else {

           //$cardapios = Cardapio::orderBy('nome')->get();
           $data = date("Y-m-d");
           $cardapios = DB::table('cardapios')
             ->join('escolas', 'escolas.id', '=', 'cardapios.id_escola')
             ->where(function($query) use ($data)
               {
                   $query->where('cardapios.data_inicio', '=' ,$data);
               })
             ->select('cardapios.*', 'escolas.nome as nome_escola')
             ->orderBy('cardapios.nome')
             ->get();
       }

       /**/

       $escolas = Escola::orderBy('nome')->get();
       $modalidades_escola = DB::table('modalidades_escolas')->get();
       return view('relatorios.cardapio_lista', compact('search','search2','escolas','cardapios','modalidades_escola'));

     }

     public function Merger($count)
     {
       $pdfMerger = PDFMerger::init(); //Initialize the merger

       for($i =1; $i <= $count; $i++ ){
         $pdfMerger->addPDF('storage/app/public/cardapios/cardapio'. $i . '.pdf', 'all');
       }

       $pdfMerger->merge();
       $dirPath = 'storage/app/public/cardapios';
       if (! is_dir($dirPath)) {
           throw new InvalidArgumentException("$dirPath must be a directory");
       }
       if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
           $dirPath .= '/';
       }

       $files = glob($dirPath . '*', GLOB_MARK);
       foreach ($files as $file) {
           if (is_dir($file)) {
               self::deleteDir($file);
           } else {
               unlink($file);
           }
       }

       return $pdfMerger->save("relatorio". date("d/m/Y h:i:s") .".pdf", "download");


     }


     public function RelatorioCardapio(Request $request)
     {

       $modalidades_escola = ModalidadesEscola::get();
       $itens = Item::get();
       $escolas = Escola::get();
       $cardapios = json_decode($request->testdata);

       $referencias = Referencias::get();
       $view_preparacoes = ViewPreparacao::all();

       $tipo_refeicoes = TipoRefeicao::orderBy('nome')->get();

       $dirPath = 'storage/app/public/cardapios';
       if (! is_dir($dirPath)) {
           throw new InvalidArgumentException("$dirPath must be a directory");
       }
       if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
           $dirPath .= '/';
       }

       $files = glob($dirPath . '*', GLOB_MARK);
       foreach ($files as $file) {
           if (is_dir($file)) {
               self::deleteDir($file);
           } else {
               unlink($file);
           }
       }

       rmdir($dirPath);

       $count = 0;
       foreach ($cardapios as $cardapio) {
         $count++;
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



           $pdf = SnappyPDF::loadView('relatorios.cardapio_pdf', compact('cardapio', 'itens_cardapio','escolas','itens','tipo_refeicoes','view_preparacoes','modalidades_escola','referencias'))->setPaper('a4')->setOrientation('landscape')->setOption('margin-bottom', 0);
           //return $pdf->download('cardapio'. $id . '.pdf');
           $pdf->save('storage/app/public/cardapios/cardapio'. $count . '.pdf');
           //return $pdf->download('cardapio'. $id . '.pdf');

           //return $pdf->stream('cardapio'. $id . '.pdf');

       }

         return response()->json($count);

    }


     public function indexPreparacao(Request $request)
     {
         $search = $request->get('search');
         if ($search == 0 ){
             //$preparacoes = Preparacao::orderBy('nome')->get();
             $preparacoes = DB::table('preparacaos')
                     ->join('tipo_preparacaos', function ($join) use ($search) {
                           $join->on('tipo_preparacaos.id', '=', 'preparacaos.id_tipo_preparacao');
                       })
                       ->select('preparacaos.*', 'tipo_preparacaos.nome as nome_tipo_preparacao')
                       ->orderBy('preparacaos.nome')
                       ->get();

         }else{
             //$preparacoes = Preparacao::where('id_tipo_preparacao', '=', $search)->orderBy('nome', 'asc')->get();
             $preparacoes = DB::table('preparacaos')
                     ->join('tipo_preparacaos', function ($join) use ($search) {
                           $join->on('tipo_preparacaos.id', '=', 'preparacaos.id_tipo_preparacao')
                                ->where('tipo_preparacaos.id', '=', $search);
                       })
                       ->select('preparacaos.*', 'tipo_preparacaos.nome as nome_tipo_preparacao')
                       ->orderBy('preparacaos.nome')
                       ->get();
         }

         $itens_preparacao = DB::select('SELECT p.id_preparacao, p.p_bruto, p.p_liquido, p.p_medida,
                                       t.nome as nome_fonte, i.*, c.nome as nome_preparacao
                                FROM item_preparacaos p
                                INNER JOIN items i
                                ON (p.id_item = i.id)
                                INNER JOIN fonte_alimentos t
                                ON (i.id_fonte= t.id )
                                INNER JOIN preparacaos c
                                ON (p.id_preparacao = c.id )
                                ORDER BY i.nome'

                                 );

         $tipo_preparacoes = TipoPreparacao::orderBy('nome')->get();

         if(is_null($preparacoes))
         {
             $preparacoes = null;
         }

         return view('relatorios.preparacao_lista', compact('preparacoes','search','tipo_preparacoes','itens_preparacao'));
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

               $pdf = SnappyPDF::loadView('relatorios.cardapio_pdf', compact('cardapio', 'itens_cardapio','escolas','itens','tipo_refeicoes','view_preparacoes','modalidades_escola','referencias'))->setPaper('a4')->setOrientation('landscape')->setOption('margin-bottom', 0);
               //return $pdf->download('cardapio'. $id . '.pdf');
               return $pdf->stream('cardapio'. $id . '.pdf');
               //return view('cardapio.cardapio_pdf', compact('cardapio', 'itens_cardapio','tipo_preparacoes', 'tipo_itens','destinos','itens','tipo_refeicoes', 'view_preparacoes', 'refeicoes_destino','referencias'));

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



               return view('relatorios.cardapio_modal', compact('cardapio', 'itens_cardapio','escolas','itens','tipo_refeicoes','view_preparacoes', 'modalidades_escola','referencias'));

           }else{
               return view('errors.404');
           }

             return view('errors.404');
               //return response()->json($id_cardapio);
     }

     public function gerarPDFPreparacao($id)
     {
       $medidas_itens = DB::table('medidas_items')->get();
       $preparacao = DB::table('preparacaos')->find($id);

       if($preparacao && isset($preparacao)){

             $itens_preparacao = DB::select('SELECT p.id_preparacao, p.p_bruto, p.p_liquido, p.p_medida,
                                         t.nome as nome_fonte, i.*, c.nome as nome_preparacao
                                  FROM item_preparacaos p
                                  INNER JOIN items i
                                  ON (p.id_item = i.id)
                                  INNER JOIN fonte_alimentos t
                                  ON (i.id_fonte = t.id )
                                  INNER JOIN preparacaos c
                                  ON (p.id_preparacao = c.id )
                                  WHERE (c.id = '. $id .')
                                  ORDER BY i.nome'

                                   );

             $tipo_preparacoes  = TipoPreparacao::get();
             $fontes = FonteAlimento::get();
             $itens = Item::get();
             $pdf = SnappyPDF::loadView('relatorios.preparacao_pdf', compact('preparacao', 'itens_preparacao','tipo_preparacoes', 'fontes', 'itens','medidas_itens'))->setPaper('a4')->setOrientation('landscape')->setOption('margin-bottom', 0);
             return $pdf->stream('preparacao'. $id . '.pdf');
       }else{
         return view('errors.404');

       }

     }

     public function preparacaoShowModal($id)
     {
       $medidas_itens = DB::table('medidas_items')->get();
       $preparacao = DB::table('preparacaos')->find($id);

       if($preparacao && isset($preparacao)){

             $itens_preparacao = DB::select('SELECT p.id_preparacao, p.p_bruto, p.p_liquido, p.p_medida,
                                         t.nome as nome_fonte, i.*, c.nome as nome_preparacao
                                  FROM item_preparacaos p
                                  INNER JOIN items i
                                  ON (p.id_item = i.id)
                                  INNER JOIN fonte_alimentos t
                                  ON (i.id_fonte = t.id )
                                  INNER JOIN preparacaos c
                                  ON (p.id_preparacao = c.id )
                                  WHERE (c.id = '. $id .')
                                  ORDER BY i.nome'

                                   );

             $tipo_preparacoes  = TipoPreparacao::get();
             $fontes = FonteAlimento::get();
             $itens = Item::get();
             return view('relatorios.preparacao_modal', compact('preparacao', 'itens_preparacao','tipo_preparacoes', 'fontes', 'itens','medidas_itens'));
       }else{
         return view('errors.404');

       }

     }

     public function despesas(Request $request)
     {
       $escolas = Escola::orderBy('nome')->get();
       return view('relatorios.despesas_lista', compact('escolas'));

     }

     public function relatorioCardapios(Request $request)
     {
       $search = $request->get('search_escola');
       $search_categoria_ensino = $request->get('search_categoria_ensino');
       $search_ensino = $request->get('search_ensino');
       $search2 = $request->get('reservation2');

       if (!is_null($search2) && $search > 0 && $search_categoria_ensino == 0 && $search_ensino == 0 ) {
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    INNER JOIN modalidades_escolas m
                                    ON (m.id = c.id_modalidade)
                                    WHERE c.data_inicio >= "'.$datai.'"
                                    AND c.data_fim <= "'.$dataf.'"
                                    AND c.id_escola = "'.$search.'"
                                    ');
       }elseif (!is_null($search2) && $search > 0 && $search_categoria_ensino > 0 && $search_ensino == 0) {
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    INNER JOIN modalidades_escolas m
                                    ON (m.id = c.id_modalidade)
                                    WHERE c.data_inicio >= "'.$datai.'"
                                    AND c.data_fim <= "'.$dataf.'"
                                    AND c.id_escola = "'.$search.'"
                                    AND m.categoria_ensino = "'.$search_categoria_ensino.'"
                                    ');
      }elseif (!is_null($search2) && $search > 0 && $search_categoria_ensino == 0 && $search_ensino > 0) {
        $data = explode(" - ", $search2);
        $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
        $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
        $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                   FROM cardapios c
                                   INNER JOIN escolas e
                                   ON (c.id_escola = e.id)
                                   INNER JOIN modalidades_escolas m
                                   ON (m.id = c.id_modalidade)
                                   WHERE c.data_inicio >= "'.$datai.'"
                                   AND c.data_fim <= "'.$dataf.'"
                                   AND c.id_escola = "'.$search.'"
                                   AND m.periodo = "'.$search_ensino.'"
                                   ');
      }elseif (!is_null($search2) && $search > 0 && $search_categoria_ensino > 0 && $search_ensino > 0) {
        $data = explode(" - ", $search2);
        $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
        $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
        $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                   FROM cardapios c
                                   INNER JOIN escolas e
                                   ON (c.id_escola = e.id)
                                   INNER JOIN modalidades_escolas m
                                   ON (m.id = c.id_modalidade)
                                   WHERE c.data_inicio >= "'.$datai.'"
                                   AND c.data_fim <= "'.$dataf.'"
                                   AND c.id_escola = "'.$search.'"
                                   AND m.categoria_ensino = "'.$search_categoria_ensino.'"
                                   AND m.periodo = "'.$search_ensino.'"
                                   ');
      }elseif (!is_null($search2) && $search == 0 && $search_categoria_ensino > 0 && $search_ensino > 0) {
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    INNER JOIN modalidades_escolas m
                                    ON (m.id = c.id_modalidade)
                                    WHERE c.data_inicio >= "'.$datai.'"
                                    AND c.data_fim <= "'.$dataf.'"
                                    AND m.categoria_ensino = "'.$search_categoria_ensino.'"
                                    AND m.periodo = "'.$search_ensino.'"
                                    ');
        }elseif (!is_null($search2) && $search == 0 && $search_categoria_ensino > 0 && $search_ensino == 0) {
           $data = explode(" - ", $search2);
           $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
           $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
           $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                      FROM cardapios c
                                      INNER JOIN escolas e
                                      ON (c.id_escola = e.id)
                                      INNER JOIN modalidades_escolas m
                                      ON (m.id = c.id_modalidade)
                                      WHERE c.data_inicio >= "'.$datai.'"
                                      AND c.data_fim <= "'.$dataf.'"
                                      AND m.categoria_ensino = "'.$search_categoria_ensino.'"
                                      ');

      }elseif (!is_null($search2) && $search == 0 && $search_categoria_ensino == 0 && $search_ensino > 0) {
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    INNER JOIN modalidades_escolas m
                                    ON (m.id = c.id_modalidade)
                                    WHERE c.data_inicio >= "'.$datai.'"
                                    AND c.data_fim <= "'.$dataf.'"
                                    AND m.periodo = "'.$search_ensino.'"
                                    ');
      }elseif (!is_null($search2) && $search == 0 && $search_categoria_ensino == 0 && $search_ensino == 0) {
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    INNER JOIN modalidades_escolas m
                                    ON (m.id = c.id_modalidade)
                                    WHERE c.data_inicio >= "'.$datai.'"
                                    AND c.data_fim <= "'.$dataf.'"
                                    ');

       }else{
         $data = explode(" - ", $search2);
         $datai = date("Y-m-d",strtotime(str_replace('/','-',$data[0])));
         $dataf = date("Y-m-d",strtotime(str_replace('/','-',$data[1])));
         $cardapios = DB::select('SELECT DISTINCT c.*, e.nome as nome_escola, m.num_alunos as alunos
                                    FROM cardapios c
                                    INNER JOIN escolas e
                                    ON (c.id_escola = e.id)
                                    INNER JOIN modalidades_escolas m
                                    ON (m.id = c.id_modalidade)
                                    ');
       }

       $escolas = Escola::orderBy('nome')->get();
       $modalidades_escola = DB::table('modalidades_escolas')->get();
       $returnHTML = view('relatorios.despesas_pdf', compact('escolas','cardapios','modalidades_escola'))->render();
       $pdf = PDF::loadHTML($returnHTML)->setPaper('a4', 'landscape');
       return $pdf->stream('relatorio'. $dataf. '.pdf');
       //$pdf = SnappyPDF::loadView('relatorios.despesas_pdf', compact('escolas','cardapios','modalidades_escola'))->setPaper('a4')->setOrientation('landscape')->setOption('margin-bottom', 0);
       //return $pdf->inline('relatorio'. $dataf. '.pdf');
     }

}
