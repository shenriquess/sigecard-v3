<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\TipoItem;
use App\Models\MedidasItem;
use App\Models\FonteAlimento;
use DB;
use PDF;

class ItemController extends Controller
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
        //
        $fontes = FonteAlimento::orderBy('nome')->get();
        $search = $request->get('search');

        $search2 = $request->get('search2');

        if ($search2 == 0 && $search != ''){
            $itens = Item::where('nome', 'like', '%'.$search.'%')->orderBy('nome', 'asc')->paginate(10);
        }else if($search == '' && $search2 > 0){
            $itens = Item::where('id_tipo_item', '=', $search2)->orderBy('nome', 'asc')->paginate(10);
        }else{
            $itens = Item::orderBy('nome')->paginate(10);
        }

        $tipo_itens = TipoItem::orderBy('nome')->get();

        if(is_null($itens) || $itens->count() == 0)
        {
            $itens = null;
        }

        return view('item.item_show', compact('itens','search','search2','tipo_itens','fontes'));

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $tipo_itens = TipoItem::orderBy('nome')->get();
        if(is_null($tipo_itens) || $tipo_itens->count() == 0)
        {
            $tipo_itens = null;
            session()->flash('mensagem-info','Não existem Tipos de Item cadastrados.');
            return redirect()->route('home.index');
        }
        $fontes = FonteAlimento::orderBy('nome')->get();
        if(is_null($fontes) || $fontes->count() == 0)
        {
            $fontes = null;
            session()->flash('mensagem-info','Não existem Fontes de Alimentos cadastradas.');
            return redirect()->route('home.index');
        }
        return view('item.create', compact('tipo_itens','fontes'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Item $data)
    {

        $medidas_itens = json_decode($request->testdata);


        $data = [
          'id_tipo_item' => $medidas_itens[0]->id_tipo_item,
          'id_fonte' => $medidas_itens[0]->id_fonte,
          'nome' => $medidas_itens[0]->nome,
          'unidade_medida' => $medidas_itens[0]->id_unidade_medida,
          'medida_base' => $medidas_itens[0]->medida_base,
          'calorias' => $medidas_itens[0]->calorias,
          'carboidratos' => $medidas_itens[0]->carboidratos,
          'proteinas' => $medidas_itens[0]->proteinas,
          'lipidios' => $medidas_itens[0]->lipidios,
          'fibras' => $medidas_itens[0]->fibras,
          'vitamina_a' => $medidas_itens[0]->vitamina_a,
          'vitamina_c' => $medidas_itens[0]->vitamina_c,
          'vitamina_d' => $medidas_itens[0]->vitamina_d,
          'vitamina_e' => $medidas_itens[0]->vitamina_e,
          'vitamina_b1' => $medidas_itens[0]->vitamina_b1,
          'vitamina_b2' => $medidas_itens[0]->vitamina_b2,
          'vitamina_b6' => $medidas_itens[0]->vitamina_b6,
          'vitamina_b12' => $medidas_itens[0]->vitamina_b12,
          'niacina' => $medidas_itens[0]->niacina,
          'folico' => $medidas_itens[0]->folico,
          'pantotenico' => $medidas_itens[0]->pantotenico,
          'calcio' => $medidas_itens[0]->calcio,
          'ferro' => $medidas_itens[0]->ferro,
          'magnesio' => $medidas_itens[0]->magnesio,
          'potassio' => $medidas_itens[0]->potassio,
          'selenio' => $medidas_itens[0]->selenio,
          'fosforo' => $medidas_itens[0]->fosforo,
          'iodo' => $medidas_itens[0]->iodo,
          'cobre' => $medidas_itens[0]->cobre,
          'zinco' => $medidas_itens[0]->zinco,
          'sodio' => $medidas_itens[0]->sodio,
          'gordura_total' => $medidas_itens[0]->gordura_total,
          'colesterol' => $medidas_itens[0]->colesterol,
          'gordura_saturada' => $medidas_itens[0]->gordura_saturada,
          'gordura_poliinsaturada' => $medidas_itens[0]->gordura_poliinsaturada,
          'gordura_monoinsaturada' => $medidas_itens[0]->gordura_monoinsaturada,
          'valor' => $medidas_itens[0]->valor];

          try {
              DB::transaction(function () use ($data, $medidas_itens) {
                  $new = Item::create($data);
                  foreach ($medidas_itens as $medidas_item) {
                    if($medidas_item && isset($medidas_item->nome_medida)){
                        $data2 = [
                          'nome_medida' => $medidas_item->nome_medida,
                          'unidade_medida' => $medidas_item->idMedida,
                          'medida' => $medidas_item->quantidade,
                          'id_item' => $new->id];
                        MedidasItem::create($data2);
                     }
                  }

              });
          } catch (QueryException $e) {

              session()->flash('mensagem-erro','Erro ao salvar o registro.');
              return response()->json($e);
          }

          session()->flash('mensagem-sucesso','Dados inseridos com sucesso!');

          return response()->json($medidas_itens);


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
    public function edit(Item $item)
    {
        $tipo_itens = TipoItem::get();
        $fontes = FonteAlimento::get();
        $medidas_itens = DB::table('medidas_items')->where('id_item','=', $item->id)->get();
        if($medidas_itens->count() <= 0){
          $medidas_itens[0] = ['id_item' => $item->id];
          //dd($medidas_itens);
        }
        return view('item.item_edit', compact('item','tipo_itens','fontes', 'medidas_itens'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $data)
    {
      $medidas_itens = json_decode($request->testdata);

      if ($medidas_itens && isset($medidas_itens[0])) {

          $dds = Item::find($medidas_itens[0]->id_item);

          $data = [
            'id_tipo_item' => $medidas_itens[0]->id_tipo_item,
            'id_fonte' => $medidas_itens[0]->id_fonte,
            'nome' => $medidas_itens[0]->nome,
            'unidade_medida' => $medidas_itens[0]->id_unidade_medida,
            'medida_base' => $medidas_itens[0]->medida_base,
            'calorias' => $medidas_itens[0]->calorias,
            'carboidratos' => $medidas_itens[0]->carboidratos,
            'proteinas' => $medidas_itens[0]->proteinas,
            'lipidios' => $medidas_itens[0]->lipidios,
            'fibras' => $medidas_itens[0]->fibras,
            'vitamina_a' => $medidas_itens[0]->vitamina_a,
            'vitamina_c' => $medidas_itens[0]->vitamina_c,
            'vitamina_d' => $medidas_itens[0]->vitamina_d,
            'vitamina_e' => $medidas_itens[0]->vitamina_e,
            'vitamina_b1' => $medidas_itens[0]->vitamina_b1,
            'vitamina_b2' => $medidas_itens[0]->vitamina_b2,
            'vitamina_b6' => $medidas_itens[0]->vitamina_b6,
            'vitamina_b12' => $medidas_itens[0]->vitamina_b12,
            'niacina' => $medidas_itens[0]->niacina,
            'folico' => $medidas_itens[0]->folico,
            'pantotenico' => $medidas_itens[0]->pantotenico,
            'calcio' => $medidas_itens[0]->calcio,
            'ferro' => $medidas_itens[0]->ferro,
            'magnesio' => $medidas_itens[0]->magnesio,
            'potassio' => $medidas_itens[0]->potassio,
            'selenio' => $medidas_itens[0]->selenio,
            'fosforo' => $medidas_itens[0]->fosforo,
            'iodo' => $medidas_itens[0]->iodo,
            'cobre' => $medidas_itens[0]->cobre,
            'zinco' => $medidas_itens[0]->zinco,
            'sodio' => $medidas_itens[0]->sodio,
            'gordura_total' => $medidas_itens[0]->gordura_total,
            'colesterol' => $medidas_itens[0]->colesterol,
            'gordura_saturada' => $medidas_itens[0]->gordura_saturada,
            'gordura_poliinsaturada' => $medidas_itens[0]->gordura_poliinsaturada,
            'gordura_monoinsaturada' => $medidas_itens[0]->gordura_monoinsaturada,
            'valor' => $medidas_itens[0]->valor];

            try {
                DB::transaction(function () use ($data, $dds, $medidas_itens) {
                    $dds->update($data);
                    $affectedRows = MedidasItem::where('id_item', '=', $medidas_itens[0]->id_item)->delete();
                    foreach ($medidas_itens as $medidas_item) {
                      if($medidas_item && isset($medidas_item->nome_medida)){
                          $data2 = [
                            'nome_medida' => $medidas_item->nome_medida,
                            'unidade_medida' => $medidas_item->idMedida,
                            'medida' => $medidas_item->quantidade,
                            'id_item' => $medidas_item->id_item];
                          MedidasItem::create($data2);
                       }
                    }

                });
            } catch (QueryException $e) {

                session()->flash('mensagem-erro','Erro ao atualizar o registro.');
                return response()->json($e);
            }

        }

        session()->flash('mensagem-sucesso','Dados atualizados com sucesso!');

        return response()->json($medidas_itens);

    }

    public function delete(Item $item)
    {
        return view('item.item_delete', compact('item'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {

        try {
            DB::transaction(function () use ($item) {
              $affectedRows = MedidasItem::where('id_item', '=', $item->id)->delete();
              $item->delete();

            });
        } catch (QueryException $e) {

            session()->flash('mensagem-erro','Erro ao excluir o registro.');
            return redirect()->route('item.show');
        }

        session()->flash('mensagem-sucesso','Registro excluído com sucesso.');
        return redirect()->route('item.show');

    }
}
