<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Models\TipoItem;
use DB;

class TipoItemController extends Controller
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
    public function index()
    {
        //
        $tipo_itens= TipoItem::orderBy('nome', 'asc')->get();
        if(is_null($tipo_itens) || $tipo_itens->count() == 0)
        {
          $tipo_itens = null;
        }

        // Repassando para a view
        return view('tipo_item.tipo_item_show', compact('tipo_itens'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
          return view('tipo_item.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $mensagens = [
            'nome.required'              => 'O campo <strong>Nome</strong> é obrigatório.',
            'nome.max'              => 'O campo <strong>Nome</strong> não deve exceder 150 caracteres.',
            'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 150 caracteres.'
        ];



        $validatedData = $request->validate([
          'nome' => 'required|max:150',
          'descricao' => 'max:250',],$mensagens);


        $data = [
          'nome' => request('nome'),
          'descricao' => request('descricao')];


          try {
            TipoItem::create($data);
          } catch (QueryException $e) {

              session()->flash('mensagem-erro','Erro ao salvar o registro.');
              return redirect()->back();
          }

          session()->flash('mensagem-sucesso','Dados inseridos com sucesso!');

          return redirect()->back();
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
    public function edit(TipoItem $tipo_item)
    {
      return view('tipo_item.tipo_item_edit', compact('tipo_item'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoItem $tipo_item)
    {
        $mensagens = [
          'nome.required'              => 'O campo <strong>Nome</strong> é obrigatório.',
          'nome.max'              => 'O campo <strong>Nome</strong> não deve exceder 150 caracteres.',
          'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 150 caracteres.'
        ];

        $validatedData = $request->validate([
          'nome' => 'required|max:150',
          'descricao' => 'max:150',],$mensagens);

          $tipo_item->nome = request('nome');
          $tipo_item->descricao = request('descricao');


          try {
            $tipo_item->save();
          } catch (QueryException $e) {
              session()->flash('mensagem-erro','Erro ao atualizar o registro.');
              $tipo_itens= TipoItem::orderBy('nome')->paginate(5);
              return view('tipo_item.tipo_item_show', compact('tipo_item'));
          }

          session()->flash('mensagem-sucesso','Dados alterados com sucesso!');
          $tipo_itens= TipoItem::orderBy('nome')->paginate(5);
          return view('tipo_item.tipo_item_show', compact('tipo_itens'));
    }

    public function delete(TipoItem $tipo_item)
    {
        //
        return view('tipo_item.tipo_item_delete', compact('tipo_item'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoItem $tipo_item)
    {
      try {
            $tipo_item->delete();
          } catch (QueryException $e) {
              session()->flash('mensagem-erro','Erro ao excluir o registro.');
              return redirect()->route('item_type.show');
          }

          session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

          return redirect()->route('item_type.show');
    }
}
