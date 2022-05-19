<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Database\QueryException;
use DB;
use Illuminate\Http\Request;
use App\Models\Escola;
use App\Models\ModalidadesEscola;
use App\Models\Referencias;

class EscolaController extends Controller
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
        $referencias = Referencias::orderBy('nome')->get();
        if(is_null($referencias) || $referencias->count() == 0)
        {
            $referencias = null;
        }

        $escolas = Escola::orderBy('nome', 'asc')->get();
        if(is_null($escolas) || $escolas->count() == 0)
        {
            $escolas = null;
        }
        // Repassando para a view
        return view('escola.escola_show', compact('escolas','referencias'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $referencias = Referencias::orderBy('nome')->get();
        if(is_null($referencias) || $referencias->count() == 0)
        {
            $referencias = null;
            session()->flash('mensagem-info','Não existem Referências Nutricionais cadastradas.');
            return redirect()->route('home.index');
        }
        return view('escola.create', compact('referencias'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Escola $data)
    {

        $modalidades_escola = json_decode($request->testdata);

        if ($modalidades_escola && isset($modalidades_escola[0])) {

            $data = [
              'nome' => $modalidades_escola[0]->nome,
              'descricao' => $modalidades_escola[0]->descricao];

              try {

                DB::transaction(function () use ($data, $modalidades_escola) {
                    $new = Escola::create($data);
                    foreach ($modalidades_escola as $modalidade_escola) {
                      $data2 = [
                        'id_referencia' => $modalidade_escola->idReferencia,
                        'categoria_ensino' => $modalidade_escola->idCategoria,
                        'idade_alunos' => $modalidade_escola->idIdade,
                        'periodo' => $modalidade_escola->idPeriodo,
                        'num_alunos' => $modalidade_escola->numAlunos,
                        'num_refeicoes' => $modalidade_escola->idRefeicao,
                        'id_escola' => $new->id];
                         ModalidadesEscola::create($data2);
                    }

                });
              } catch (QueryException $e) {
                  session()->flash('mensagem-erro','Erro ao salvar o registro.');
                  return response()->json($e);
              }
          }
          session()->flash('mensagem-sucesso','Dados inseridos com sucesso!');

          return response()->json($data);

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
        $escola = DB::table('escolas')->find($id);

        if($escola && isset($escola)){
            $modalidades_escola = DB::select('SELECT m.*, r.nome as nome_referencia
                                     FROM modalidades_escolas m
                                     INNER JOIN referencias r
                                     ON (m.id_referencia = r.id)
                                     WHERE (m.id_escola = '. $id .')

                                  ');
            $referencias= Referencias::get();
            if(is_null($referencias) || $referencias->count() == 0)
            {
                $referencias = null;
            }
            return view('escola.escola_edit', compact('escola','referencias','modalidades_escola'));
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
    public function update(Request $request, Escola $data)
    {
        $modalidades_escola = json_decode($request->testdata);
        if ($modalidades_escola && isset($modalidades_escola[0])) {
            $dds = Escola::find($modalidades_escola[0]->id_escola);
            $data = [
              'nome' => $modalidades_escola[0]->nome,
              'descricao' => $modalidades_escola[0]->descricao];
            try {


                  DB::transaction(function () use ($data, $dds, $modalidades_escola) {
                      $dds->update($data);
                      $exists = false;
                      $old_modalidades_escola = DB::table('modalidades_escolas')
                                  ->where('id_escola', $modalidades_escola[0]->id_escola)->get();

                      foreach ($old_modalidades_escola as $old_modalidade_escola) {
                        $exists = false;
                        $exists_in_cardapio = DB::table('cardapios')->where('id_modalidade', $old_modalidade_escola->id)->exists();
                        foreach ($modalidades_escola as $modalidade_escola) {
                          if ($old_modalidade_escola->id == $modalidade_escola->idModalidade) {
                            $exists = true;
                          }
                        }
                        if(!$exists && !$exists_in_cardapio){
                          $affectedRows = ModalidadesEscola::where('id', '=', $old_modalidade_escola->id)->delete();
                        }else if (!$exists && $exists_in_cardapio) {
                          session()->flash('mensagem-erro','Uma das modalidades não pôde ser excluída.');
                        }else{
                          //
                        }
                      }

                      foreach ($modalidades_escola as $modalidade_escola) {
                        $exists2 = DB::table('cardapios')->where('id_modalidade', $modalidade_escola->idModalidade)->exists();
                        if (!$exists2 && $modalidade_escola->idModalidade != 99999999) {
                          $dds2 = ModalidadesEscola::find($modalidade_escola->idModalidade);
                          $data2 = [
                            'id_referencia' => $modalidade_escola->idReferencia,
                            'categoria_ensino' => $modalidade_escola->idCategoria,
                            'idade_alunos' => $modalidade_escola->idIdade,
                            'periodo' => $modalidade_escola->idPeriodo,
                            'num_alunos' => $modalidade_escola->numAlunos,
                            'num_refeicoes' => $modalidade_escola->idRefeicao,
                            'id_escola' => $modalidade_escola->id_escola];
                             $dds2->update($data2);
                        }else if ($exists2 && $modalidade_escola->idModalidade != 99999999) {
                          $dds2 = ModalidadesEscola::find($modalidade_escola->idModalidade);
                          $data2 = [
                            'num_alunos' => $modalidade_escola->numAlunos];
                             $dds2->update($data2);
                        }else if (!$exists2 && $modalidade_escola->idModalidade == 99999999){
                          $data3 = [
                            'id_referencia' => $modalidade_escola->idReferencia,
                            'categoria_ensino' => $modalidade_escola->idCategoria,
                            'idade_alunos' => $modalidade_escola->idIdade,
                            'periodo' => $modalidade_escola->idPeriodo,
                            'num_alunos' => $modalidade_escola->numAlunos,
                            'num_refeicoes' => $modalidade_escola->idRefeicao,
                            'id_escola' => $modalidade_escola->id_escola];
                             ModalidadesEscola::create($data3);
                        }else{
                          //
                        }
                    }
                  });
              } catch (QueryException $e) {
                session()->flash('mensagem-erro','Erro ao atualizar o registro.');
                return response()->json($e);
              }
        }

        session()->flash('mensagem-sucesso','Dados alterados com sucesso!');

        return response()->json($modalidades_escola);
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
                $affectedRows = ModalidadesEscola::where('id_escola', '=', $id)->delete();
                $affectedRows2 = Escola::where('id', '=', $id)->delete();

              });
            } catch (QueryException $e) {
                session()->flash('mensagem-erro','Erro ao excluir o registro.');
                return redirect()->route('school.show');
            }

            session()->flash('mensagem-sucesso','Registro excluído com sucesso.');

            return redirect()->route('school.show');

    }
}
