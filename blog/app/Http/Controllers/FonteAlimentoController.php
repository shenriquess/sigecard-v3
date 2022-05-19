<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\FonteAlimento;

class FonteAlimentoController extends Controller
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
    public function index()
    {
        //
        $fonte_alimentos = FonteAlimento::orderBy('nome', 'asc')->get();
        if(is_null($fonte_alimentos) || $fonte_alimentos->count() == 0)
        {
            $fonte_alimentos = null;
        }
        // Repassando para a view
        return view('fonte.fonte_show', compact('fonte_alimentos'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('fonte.create');
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
          'descricao.max'              => 'O campo <strong>Descrição</strong> é obrigatório.',
          'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 250 caracteres.',
        ];

        $validatedData = $request->validate([
          'nome' => 'required|max:150',
          'descricao' => 'max:250',],$mensagens);


        $data = [
          'nome' => request('nome'),
          'descricao' => request('descricao')];


          try {
            FonteAlimento::create($data);
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
    public function edit(FonteAlimento $fonte_alimento)
    {
        return view('fonte.fonte_edit', compact('fonte_alimento'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FonteAlimento $fonte_alimento)
    {
        //
        $mensagens = [
          'nome.required'              => 'O campo <strong>Nome</strong> é obrigatório.',
          'nome.max'              => 'O campo <strong>Nome</strong> não deve exceder 150 caracteres.',
          'descricao.max'              => 'O campo <strong>Descrição</strong> é obrigatório.',
          'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 250 caracteres.',

        ];

        $validatedData = $request->validate([
          'nome' => 'required|max:150',
          'descricao' => 'max:250',],$mensagens);

        $fonte_alimento->nome = request('nome');
        $fonte_alimento->descricao = request('descricao');

        try {
          $fonte_alimento->save();
        } catch (QueryException $e) {
            session()->flash('mensagem-erro','Erro ao atualizar o registro.');
            $fonte_alimentos=  FonteAlimento::orderBy('nome')->get();
            return view('fonte.fonte_show', compact('fonte_alimentos'));
        }

        session()->flash('mensagem-sucesso','Dados alterados com sucesso!');

        $fonte_alimentos= FonteAlimento::orderBy('nome')->get();
        return view('fonte.fonte_show', compact('fonte_alimentos'));
    }

    public function delete(FonteAlimento $fonte_alimento)
    {
        //
        return view('fonte.fonte_delete', compact('fonte_alimento'));
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(FonteAlimento $fonte_alimento)
    {
        //
        try {
              $fonte_alimento->delete();
            } catch (QueryException $e) {
                session()->flash('mensagem-erro','Erro ao excluir o registro.');
                return redirect()->route('source.show');
            }

            session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

            return redirect()->route('source.show');

    }
}
