<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class UserController extends Controller
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
        $users= User::orderBy('name')->get();

        // Repassando para a view
        return view('auth.users_show', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('auth.register');

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
    public function edit(User $user)
    {
        //
        $user = Auth::user();

        return view('auth.edit', compact('user'));
    }

    public function edit_users(User $user)
    {
        //
        return view('auth.users_edit', compact('user'));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function update(User $user)
    {
        //


                $this->validate(request(), [
                    'name' => 'required',
                    'username' => 'required|unique:users,username,'. $user->id,
                    'crn' => 'max:15',
                    'email' => 'required|email|unique:users,email,'. $user->id,
                    'password' => 'required|min:6|confirmed'
                ]);

                $user->name = request('name');
                $user->username = request('username');
                $user->crn = request('crn');
                $user->email = request('email');

                $user->password = bcrypt(request('password'));



        try {
            $user->save();
        } catch (QueryException $e) {
            session()->flash('mensagem-erro','Erro ao salvar o registro.');
            return redirect()->route('home.index');
        }

        session()->flash('mensagem-sucesso','Dados alterados com sucesso!');
        return redirect()->route('home.index');
    }


    public function update_users(User $user)
    {

                $this->validate(request(), [
                  'name' => 'required',
                  'username' => 'required|unique:users,username,'. $user->id,
                  'crn' => ' max:15',
                  'email' => 'required|email|unique:users,email,'. $user->id,
                  'type' => 'required|not_in:0',
                  'password' => 'required|min:6|confirmed'
                ]);

                $user->name = request('name');
                $user->username = request('username');
                $user->crn = request('crn');
                $user->email = request('email');
                $user->type = request('type');
                $user->password = bcrypt(request('password'));

                //dd($user->crn);

        try {
            $user->save();
        } catch (QueryException $e) {
            session()->flash('mensagem-erro','Erro ao atualizar o registro.');
            return redirect()->route('users.show');
        }

        session()->flash('mensagem-sucesso','Dados alterados com sucesso');

        return redirect()->route('users.show');
    }


    public function delete(User $user)
    {
        //
        return view('auth.users_delete', compact('user'));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //

        try {
            $user->delete();
        } catch (QueryException $e) {
            session()->flash('mensagem-erro','Erro ao excluir o registro.');
            return redirect()->route('users.show');
        }

        session()->flash('mensagem-sucesso','Usuário excluído com sucesso.');

        return redirect()->route('users.show');
    }
}
