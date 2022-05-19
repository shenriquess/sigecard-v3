<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use App\Models\Referencias;
use DB;


class ReferenciasController extends Controller
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
      $referencias= Referencias::orderBy('nome')->get();

      return view('ref_nutricional.referencias_show', compact('referencias'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('ref_nutricional.create');
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
            'nome.required'              => 'Digite um <strong>Nome</strong>.',
            'nome.max'              => 'O campo <strong>Nome</strong> não deve exceder 150 caracteres.',
            'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 250 caracteres.',
            'num_refeicoes.required'               => 'O campo <strong>Número de Refeições</strong> é obrigatório.',
            'num_refeicoes.not_in'               => 'Selecione o <strong>Número de Refeições</strong>.',
            'categoria_ensino.required'               => 'O campo <strong>Categoria de Ensino</strong> é obrigatório.',
            'categoria_ensino.not_in'               => 'Selecione a <strong>Categoria de Ensino</strong>.',
            'idade_alunos.required'                 => 'O campo <strong>Faixa de Idade dos Alunos</strong> é obrigatório.',
            'idade_alunos.not_in'                 => 'Selecione a <strong>Faixa de Idade dos Alunos</strong>.',
            'periodo.required'                 => 'O campo <strong>Período</strong> é obrigatório.',
            'periodo.not_in'                 => 'Selecione o <strong>Período</strong>.',
            'calorias.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Calorias</b>.',
            'carboidratos.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Carboidratos</b>.',
            'proteinas.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Proteínas</b>.',
            'lipidios.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Lipídios</b>.',
            'fibras.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Fibras</b>.',
            'vitamina_a.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina A</b>.',
            'vitamina_c.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina C</b>.',
            'vitamina_d.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina D</b>.',
            'vitamina_e.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina E</b>.',
            'vitamina_b1.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B1</b>.',
            'vitamina_b2.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B2</b>.',
            'vitamina_b6.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B6</b>.',
            'vitamina_b12.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B12</b>.',
            'niacina.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Niacina</b>.',
            'folico.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Ácido Fólico</b>.',
            'pantotenico.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Ácido Pantotênico</b>.',
            'calcio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Cálcio</b>.',
            'ferro.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Ferro</b>.',
            'magnesio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Magnésio</b>.',
            'potassio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Potássio</b>.',
            'selenio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Selênio</b>',
            'fosforo.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Fósforo</b>.',
            'iodo.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Iodo</b>.',
            'cobre.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Cobre</b>.',
            'zinco.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Zinco</b>.',
            'sodio.required'               => 'Insira um valor maior ou igual a 0 (zero) em <b>Sódio</b>.',
            'gordura_total.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Total</b>.',
            'colesterol.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Colesterol</b>.',
            'gordura_saturada.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Saturada</b>.',
            'gordura_poliinsaturada.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Poliinsaturada</b>.',
            'gordura_monoinsaturada.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Monoinsaturada</b>.'
        ];


        $validatedData = $request->validate([
          'nome' => 'required|max:150',
          'descricao' => 'max:150',
          'num_refeicoes' => 'required|not_in:0',
          'categoria_ensino' => 'required|not_in:0',
          'idade_alunos' => 'required|not_in:0',
          'periodo' => 'required|not_in:0',
          'calorias' => 'required',
          'carboidratos' => 'required',
          'proteinas' => 'required',
          'lipidios' => 'required',
          'fibras' => 'required',
          'vitamina_a' => 'required',
          'vitamina_c' => 'required',
          'vitamina_d' => 'required',
          'vitamina_e' => 'required',
          'vitamina_b1' => 'required',
          'vitamina_b2' => 'required',
          'vitamina_b6' => 'required',
          'vitamina_b12' => 'required',
          'niacina' => 'required',
          'folico' => 'required',
          'pantotenico' => 'required',
          'calcio' => 'required',
          'ferro' => 'required',
          'magnesio' => 'required',
          'potassio' => 'required',
          'selenio' => 'required',
          'fosforo' => 'required',
          'iodo' => 'required',
          'cobre' => 'required',
          'zinco' => 'required',
          'sodio' => 'required',
          'gordura_total' => 'required',
          'colesterol' => 'required',
          'gordura_saturada' => 'required',
          'gordura_poliinsaturada' => 'required',
          'gordura_monoinsaturada' => 'required',],$mensagens);

        $data = [
          'nome' => request('nome'),
          'descricao' => request('descricao'),
          'num_refeicoes' => request('num_refeicoes'),
          'categoria_ensino' => request('categoria_ensino'),
          'idade_alunos' => request('idade_alunos'),
          'periodo' => request('periodo'),
          'calorias' => request('calorias'),
          'carboidratos' => request('carboidratos'),
          'proteinas' => request('proteinas'),
          'lipidios' => request('lipidios'),
          'fibras' => request('fibras'),
          'vitamina_a' => request('vitamina_a'),
          'vitamina_c' => request('vitamina_c'),
          'vitamina_d' => request('vitamina_d'),
          'vitamina_e' => request('vitamina_e'),
          'vitamina_b1' => request('vitamina_b1'),
          'vitamina_b2' => request('vitamina_b2'),
          'vitamina_b6' => request('vitamina_b6'),
          'vitamina_b12' => request('vitamina_b12'),
          'niacina' => request('niacina'),
          'folico' => request('folico'),
          'pantotenico' => request('pantotenico'),
          'calcio' => request('calcio'),
          'ferro' => request('ferro'),
          'magnesio' => request('magnesio'),
          'potassio' => request('potassio'),
          'selenio' => request('selenio'),
          'fosforo' => request('fosforo'),
          'iodo' => request('iodo'),
          'cobre' => request('cobre'),
          'zinco' => request('zinco'),
          'sodio' => request('sodio'),
          'gordura_total' => request('gordura_total'),
          'colesterol' => request('colesterol'),
          'gordura_saturada' => request('gordura_saturada'),
          'gordura_poliinsaturada' => request('gordura_poliinsaturada'),
          'gordura_monoinsaturada' => request('gordura_monoinsaturada') ];


          try {
            Referencias::create($data);
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
    public function edit(Referencias $referencia)
    {
        return view('ref_nutricional.referencias_edit', compact('referencia'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Referencias $referencia)
    {
        $mensagens = [
          'nome.required'              => 'Digite um <strong>Nome</strong>.',
          'nome.max'              => 'O campo <strong>Nome</strong> não deve exceder 150 caracteres.',
          'descricao.max'              => 'O campo <strong>Descrição</strong> não deve exceder 250 caracteres.',
          'num_refeicoes.required'               => 'O campo <strong>Número de Refeições</strong> é obrigatório.',
          'num_refeicoes.not_in'               => 'Selecione o <strong>Número de Refeições</strong>.',
          'categoria_ensino.required'               => 'O campo <strong>Categoria de Ensino</strong> é obrigatório.',
          'categoria_ensino.not_in'               => 'Selecione a <strong>Categoria de Ensino</strong>.',
          'idade_alunos.required'                 => 'O campo <strong>Faixa de Idade dos Alunos</strong> é obrigatório.',
          'idade_alunos.not_in'                 => 'Selecione a <strong>Faixa de Idade dos Alunos</strong>.',
          'periodo.required'                 => 'O campo <strong>Período</strong> é obrigatório.',
          'periodo.not_in'                 => 'Selecione o <strong>Período</strong>.',
          'calorias.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Calorias</b>.',
          'carboidratos.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Carboidratos</b>.',
          'proteinas.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Proteínas</b>.',
          'lipidios.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Lipídios</b>.',
          'fibras.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Fibras</b>.',
          'vitamina_a.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina A</b>.',
          'vitamina_c.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina C</b>.',
          'vitamina_d.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina D</b>.',
          'vitamina_e.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina E</b>.',
          'vitamina_b1.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B1</b>.',
          'vitamina_b2.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B2</b>.',
          'vitamina_b6.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B6</b>.',
          'vitamina_b12.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Vitamina B12</b>.',
          'niacina.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Niacina</b>.',
          'folico.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Ácido Fólico</b>.',
          'pantotenico.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Ácido Pantotênico</b>.',
          'calcio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Cálcio</b>.',
          'ferro.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Ferro</b>.',
          'magnesio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Magnésio</b>.',
          'potassio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Potássio</b>.',
          'selenio.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Selênio</b>',
          'fosforo.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Fósforo</b>.',
          'iodo.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Iodo</b>.',
          'cobre.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Cobre</b>.',
          'zinco.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Zinco</b>.',
          'sodio.required'               => 'Insira um valor maior ou igual a 0 (zero) em <b>Sódio</b>.',
          'gordura_total.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Total</b>.',
          'colesterol.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Colesterol</b>.',
          'gordura_saturada.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Saturada</b>.',
          'gordura_poliinsaturada.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Poliinsaturada</b>.',
          'gordura_monoinsaturada.required'                 => 'Insira um valor maior ou igual a 0 (zero) em <b>Gordura Monoinsaturada</b>.'
        ];

        $validatedData = $request->validate([
          'nome' => 'required|max:150',
          'descricao' => 'max:150',
          'num_refeicoes' => 'required|not_in:0',
          'categoria_ensino' => 'required|not_in:0',
          'idade_alunos' => 'required|not_in:0',
          'periodo' => 'required|not_in:0',
          'calorias' => 'required',
          'carboidratos' => 'required',
          'proteinas' => 'required',
          'lipidios' => 'required',
          'fibras' => 'required',
          'vitamina_a' => 'required',
          'vitamina_c' => 'required',
          'vitamina_d' => 'required',
          'vitamina_e' => 'required',
          'vitamina_b1' => 'required',
          'vitamina_b2' => 'required',
          'vitamina_b6' => 'required',
          'vitamina_b12' => 'required',
          'niacina' => 'required',
          'folico' => 'required',
          'pantotenico' => 'required',
          'calcio' => 'required',
          'ferro' => 'required',
          'magnesio' => 'required',
          'potassio' => 'required',
          'selenio' => 'required',
          'fosforo' => 'required',
          'iodo' => 'required',
          'cobre' => 'required',
          'zinco' => 'required',
          'sodio' => 'required',
          'gordura_total' => 'required',
          'colesterol' => 'required',
          'gordura_saturada' => 'required',
          'gordura_poliinsaturada' => 'required',
          'gordura_monoinsaturada' => 'required',],$mensagens);

          $referencia->nome = request('nome');
          $referencia->descricao = request('descricao');
          $referencia->num_refeicoes = request('num_refeicoes');
          $referencia->categoria_ensino = request('categoria_ensino');
          $referencia->idade_alunos = request('idade_alunos');
          $referencia->periodo = request('periodo');
          $referencia->calorias = request('calorias');
          $referencia->carboidratos = request('carboidratos');
          $referencia->proteinas = request('proteinas');
          $referencia->lipidios = request('lipidios');
          $referencia->fibras = request('fibras');
          $referencia->vitamina_a = request('vitamina_a');
          $referencia->vitamina_c = request('vitamina_c');
          $referencia->vitamina_d= request('vitamina_d');
          $referencia->vitamina_e = request('vitamina_e');
          $referencia->vitamina_b1 = request('vitamina_b1');
          $referencia->vitamina_b2 = request('vitamina_b2');
          $referencia->vitamina_b6 = request('vitamina_b6');
          $referencia->vitamina_b12 = request('vitamina_b12');
          $referencia->niacina = request('niacina');
          $referencia->folico = request('folico');
          $referencia->pantotenico = request('pantotenico');
          $referencia->calcio = request('calcio');
          $referencia->ferro = request('ferro');
          $referencia->magnesio = request('magnesio');
          $referencia->potassio = request('potassio');
          $referencia->selenio = request('selenio');
          $referencia->fosforo= request('fosforo');
          $referencia->iodo = request('iodo');
          $referencia->cobre = request('cobre');
          $referencia->zinco = request('zinco');
          $referencia->sodio = request('sodio');
          $referencia->gordura_total = request('gordura_total');
          $referencia->colesterol = request('colesterol');
          $referencia->gordura_saturada = request('gordura_saturada');
          $referencia->gordura_poliinsaturada = request('gordura_poliinsaturada');
          $referencia->gordura_monoinsaturada = request('gordura_monoinsaturada');

          try {
            $referencia->save();
          } catch (QueryException $e) {
              session()->flash('mensagem-erro','Erro ao atualizar o registro.');
              $referencias= Referencias::orderBy('nome')->get();
              return view('ref_nutricional.referencias_show', compact('referencias'));
          }

          session()->flash('mensagem-sucesso','Dados alterados com sucesso!');
          $referencias= Referencias::orderBy('nome')->get();
          return view('ref_nutricional.referencias_show', compact('referencias'));
    }

    public function delete(Referencias $referencia)
    {
        //
        return view('ref_nutricional.referencias_delete', compact('referencia'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Referencias $referencia)
    {
      try {
            $referencia->delete();
          } catch (QueryException $e) {
              session()->flash('mensagem-erro','Erro ao excluir o registro.');
              return redirect()->route('references.show');
          }

          session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

          return redirect()->route('references.show');
      }
}
