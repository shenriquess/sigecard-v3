<?php

namespace App\Http\Controllers;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Preparacao;
use App\Models\Item;
use App\Models\TipoPreparacao;
use App\Models\FonteAlimento;
use App\Models\ItemPreparacao;
use App\Models\MedidasItem;
use SnappyPDF;
use DB;

class PreparacaoController extends Controller
{
    //
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
        //
        $search = $request->get('search');


        if ($search == 0 ){
            //$preparacoes = Preparacao::orderBy('nome')->get();
            $preparacoes = DB::table('preparacaos')
                    ->join('tipo_preparacaos', function ($join) use ($search) {
                          $join->on('tipo_preparacaos.id', '=', 'preparacaos.id_tipo_preparacao');
                      })
                      ->select('preparacaos.*', 'tipo_preparacaos.nome as nome_tipo_preparacao')
                      ->orderBy('preparacaos.nome')
                      ->paginate(10);

        }else{
            //$preparacoes = Preparacao::where('id_tipo_preparacao', '=', $search)->orderBy('nome', 'asc')->get();
            $preparacoes = DB::table('preparacaos')
                    ->join('tipo_preparacaos', function ($join) use ($search) {
                          $join->on('tipo_preparacaos.id', '=', 'preparacaos.id_tipo_preparacao')
                               ->where('tipo_preparacaos.id', '=', $search);
                      })
                      ->select('preparacaos.*', 'tipo_preparacaos.nome as nome_tipo_preparacao')
                      ->orderBy('preparacaos.nome')
                      ->paginate(10);
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



       /*$total = count($sql);//total de linhas da query

        $my_query = $sql; //query

        $quant = 5; //total por página

        //paginação
        $currentPage = $request->get('page', 1); //pega a página
        $query_slice = array_slice($my_query, ($currentPage - 1) * $quant, $quant); //fatia o resultado da query
        $collect = collect($query_slice);
        $preparacoes = new LengthAwarePaginator($collect, $total, $quant, $currentPage); //chama a paginação
        $preparacoes->setPath($request->url());*/


        if(is_null($preparacoes))
        {
            $preparacoes = null;
        }

        return view('preparacao.preparacao_show', compact('preparacoes','search','tipo_preparacoes','itens_preparacao'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
      $tipo_preparacoes = TipoPreparacao::orderBy('nome')->get();
      if(is_null($tipo_preparacoes) || $tipo_preparacoes->count() == 0)
      {
          $tipo_preparacoes = null;
          session()->flash('mensagem-info','Não existem Grupos de Preparações cadastrados.');
          return redirect()->route('home.index');
      }

      $itens = Item::orderBy('nome')->get();
      if(is_null($itens) || $itens->count() == 0)
      {
          $itens = null;
          session()->flash('mensagem-info','Não existem Alimentos cadastrados.');
          return redirect()->route('home.index');
      }

      $medidas_itens = DB::table('medidas_items')->get();
      $fontes = FonteAlimento::orderBy('nome')->get();

      return view('preparacao.create', compact('itens','tipo_preparacoes','fontes','medidas_itens'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Preparacao $data)
    {
          $itens_preparacao = json_decode($request->testdata);
          $id_preparacao = 0;

          if ($itens_preparacao && isset($itens_preparacao[0])) {


              $data = [
                'nome' => $itens_preparacao[0]->nome,
                'modo_preparo' => $itens_preparacao[0]->modo_preparo,
                'descricao' => $itens_preparacao[0]->descricao,
                'medida_total' => $itens_preparacao[0]->medida_total,
                'id_tipo_preparacao' => $itens_preparacao[0]->id_tipo_preparacao];

                try {
                    $id_preparacao = DB::transaction(function () use ($data, $itens_preparacao) {
                        $new = Preparacao::create($data);
                        foreach ($itens_preparacao as $item_preparacao) {
                          $data2 = [
                            'id_item' => $item_preparacao->idItem,
                            'p_bruto' => $item_preparacao->valorPB,
                            'p_liquido' => $item_preparacao->valorPL,
                            'p_medida' => $item_preparacao->idMedida,
                            'id_preparacao' => $new->id];
                             ItemPreparacao::create($data2);
                        }
                        return $new->id;

                    });
                } catch (QueryException $e) {

                    session()->flash('mensagem-erro','Erro ao salvar o registro.');
                    response()->json($e);
                    return redirect()->back();
                }

                return response()->json($id_preparacao);
          }
          session()->flash('mensagem-erro','Erro ao salvar o registro.');
          return response()->json('Erro!!!');
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
      $preparacao = DB::table('preparacaos')->find($id);

      if($preparacao && isset($preparacao)){

            $itens_preparacao = DB::select('SELECT p.id_preparacao, p.p_bruto, p.p_liquido, p.p_medida,
                                        t.nome as nome_fonte, i.*, c.medida_total, c.nome as nome_preparacao
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
            return view('preparacao.preparacao_edit', compact('preparacao', 'itens_preparacao','tipo_preparacoes', 'fontes', 'itens','medidas_itens'));
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
    public function update(Request $request, Preparacao $data)
    {
        //
        $itens_preparacao = json_decode($request->testdata);

        if ($itens_preparacao && isset($itens_preparacao[0])) {

            $dds = Preparacao::find($itens_preparacao[0]->id_preparacao);
            $data = [
              'nome' => $itens_preparacao[0]->nome,
              'modo_preparo' => $itens_preparacao[0]->modo_preparo,
              'descricao' => $itens_preparacao[0]->descricao,
              'medida_total' => $itens_preparacao[0]->medida_total,
              'id_tipo_preparacao' => $itens_preparacao[0]->id_tipo_preparacao];

              try {
                  DB::transaction(function () use ($data, $dds, $itens_preparacao) {
                    $dds->update($data);
                    $affectedRows = ItemPreparacao::where('id_preparacao', '=', $itens_preparacao[0]->id_preparacao)->delete();
                    foreach ($itens_preparacao as $item_preparacao) {
                      $data2 = [
                        'id_item' => $item_preparacao->idItem,
                        'p_bruto' => $item_preparacao->valorPB,
                        'p_liquido' => $item_preparacao->valorPL,
                        'p_medida' => $item_preparacao->idMedida,
                        'id_preparacao' => $item_preparacao->id_preparacao];
                      ItemPreparacao::create($data2);

                    }
                  });
              } catch (QueryException $e) {

                  session()->flash('mensagem-erro','Erro ao atualizar o registro.');
                  return response()->json($e);
              }


              session()->flash('mensagem-sucesso','Dados alterados com sucesso!');

              return response()->json('Sucesso!!');


        }

        session()->flash('mensagem-erro','Erro ao atualizar o registro.');
        return response()->json('Erro');
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
            $pdf = SnappyPDF::loadView('preparacao.preparacao_pdf', compact('preparacao', 'itens_preparacao','tipo_preparacoes', 'fontes', 'itens','medidas_itens'))->setPaper('a4')->setOrientation('landscape')->setOption('margin-bottom', 0);
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
            return view('preparacao.preparacao_modal', compact('preparacao', 'itens_preparacao','tipo_preparacoes', 'fontes', 'itens','medidas_itens'));
      }else{
        return view('errors.404');

      }

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
              $affectedRows = ItemPreparacao::where('id_preparacao', '=', $id)->delete();
              $affectedRows2 = Preparacao::where('id', '=', $id)->delete();

            });
        } catch (QueryException $e) {

            session()->flash('mensagem-erro','Erro ao excluir o registro.');
            return redirect()->back();
        }

        session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

        return redirect()->back();

    }
}
