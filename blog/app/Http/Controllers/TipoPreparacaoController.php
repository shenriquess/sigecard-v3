<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Models\TipoPreparacao;
use DB;

class TipoPreparacaoController extends Controller
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
      $tipo_preparacoes= TipoPreparacao::orderBy("nome")->get();
      if(is_null($tipo_preparacoes) || $tipo_preparacoes->count() == 0)
      {
        $tipo_preparacao = null;
      }

      // Repassando para a view
      return view('tipo_preparacao.tipo_preparacao_show', compact('tipo_preparacoes'));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
      //
        return view('tipo_preparacao.create');
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
        'descricao' => 'max:150',],$mensagens);


      $data = [
        'nome' => request('nome'),
        'descricao' => request('descricao')];


        try {
          TipoPreparacao::create($data);
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
  public function edit(TipoPreparacao $tipo_preparacao)
  {
    return view('tipo_preparacao.tipo_preparacao_edit', compact('tipo_preparacao'));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, TipoPreparacao $tipo_preparacao)
  {
      $mensagens = [
        'nome.required'              => 'O campo <strong>Nome</strong> é obrigatório.',
        'nome.max'              => 'O campo <strong>Nome</strong> não deve exceder 150 caracteres.',
        'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 150 caracteres.'
      ];

      $validatedData = $request->validate([
        'nome' => 'required|max:150',
        'descricao' => 'max:150',],$mensagens);

        $tipo_preparacao->nome = request('nome');
        $tipo_preparacao->descricao = request('descricao');

        try {
          $tipo_preparacao->save();
        } catch (QueryException $e) {
            session()->flash('mensagem-erro','Erro ao atualizar o registro.');
            $tipo_preparacoes = TipoPreparacao::orderBy('nome')->get();
            return view('tipo_preparacao.tipo_preparacao_show', compact('tipo_preparacoes'));
        }

        session()->flash('mensagem-sucesso','Dados alterados com sucesso!');
        $tipo_preparacoes = TipoPreparacao::orderBy('nome')->get();
        return view('tipo_preparacao.tipo_preparacao_show', compact('tipo_preparacoes'));
  }

  public function delete(TipoPreparacao $tipo_preparacao)
  {
      //
      return view('tipo_preparacao.tipo_preparacao_delete', compact('tipo_preparacao'));
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(TipoPreparacao $tipo_preparacao)
  {
    try {
          $tipo_preparacao->delete();
        } catch (QueryException $e) {
            session()->flash('mensagem-erro','Erro ao excluir o registro.');
            return redirect()->route('preparation_type.show');
        }

        session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

        return redirect()->route('preparation_type.show');
  }
}
