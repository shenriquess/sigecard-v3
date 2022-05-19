<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Http\Response;
use App\Models\TipoRefeicao;
use DB;
use SnappyPDF;
use App;

class TipoRefeicaoController extends Controller
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
      $tipo_refeicao = TipoRefeicao::orderBy('horario')->get();

      // Repassando para a view
      return view('tipo_refeicao.tipo_refeicao_show', compact('tipo_refeicao'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('tipo_refeicao.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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
          'descricao' => request('descricao'),
          'horario' => request('horario')];


          try {
            TipoRefeicao::create($data);
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
    public function edit(TipoRefeicao $tipo_refeicao)
    {
      return view('tipo_refeicao.tipo_refeicao_edit', compact('tipo_refeicao'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoRefeicao $tipo_refeicao)
    {
        $mensagens = [
          'nome.required'              => 'O campo <strong>Nome</strong> é obrigatório.',
          'nome.max'              => 'O campo <strong>Nome</strong> não deve exceder 150 caracteres.',
          'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 150 caracteres.'
        ];

        $validatedData = $request->validate([
          'nome' => 'required|max:150',
          'descricao' => 'max:150',],$mensagens);

          $tipo_refeicao->nome = request('nome');
          $tipo_refeicao->descricao = request('descricao');
          $tipo_refeicao->horario = request('horario');


          try {
            $tipo_refeicao->save();
          } catch (QueryException $e) {
              session()->flash('mensagem-erro','Erro ao atualizar o registro.');
              $tipo_refeicao= TipoItem::orderBy('nome')->paginate(5);
              return view('tipo_refeicao.tipo_refeicao_show', compact('tipo_refeicao'));
          }

          session()->flash('mensagem-sucesso','Dados alterados com sucesso!');
          $tipo_refeicao= TipoRefeicao::orderBy('nome')->paginate(5);
          return view('tipo_refeicao.tipo_refeicao_show', compact('tipo_refeicao'));
    }


    public function delete(TipoRefeicao $tipo_refeicao)
    {
        //
        return view('tipo_refeicao.tipo_refeicao_delete', compact('tipo_refeicao'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoRefeicao $tipo_refeicao)
    {
      try {
            $tipo_refeicao->delete();
          } catch (QueryException $e) {
              session()->flash('mensagem-erro','Erro ao excluir o registro.');
              return redirect()->route('meal_type.show');
          }

          session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

          return redirect()->route('meal_type.show');
    }
}
