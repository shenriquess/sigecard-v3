<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/', [
	'uses' => 'HomeController@index',
	'as' => 'home.index']);


Route::get('/home', 'HomeController@index')->name('home');


Route::group(['prefix' => '/user'], function(){
	Route::get('create',  ['as' => 'user.create', 'uses' => 'UserController@create'])->middleware(['check.type'])->middleware(['check.type2']);
	Route::get('edit',  ['as' => 'user.edit', 'uses' => 'UserController@edit']);
	Route::put('{user}/update', [
		'uses' => 'UserController@update',
		'as' => 'user.update']);
});


Route::group(['prefix' => '/users'], function(){
	Route::get('{user}/edit',  ['as' => 'users.edit', 'uses' => 'UserController@edit_users'])->middleware(['check.type2']);
	Route::get('show',  ['as' => 'users.show', 'uses' => 'UserController@index'])->middleware(['check.type']);
	Route::put('{user}/update', [
		'uses' => 'UserController@update_users',
		'as' => 'users.update'])->middleware(['check.type'])->middleware(['check.type2']);
	Route::get('{user}/delete', [
		'uses' => 'UserController@delete',
		'as' => 'users.delete'])->middleware(['check.type'])->middleware(['check.type2']);
	Route::get('{user}/destroy', [
		'uses' => 'UserController@destroy',
		'as' => 'users.destroy'])->middleware(['check.type2']);
});


Route::group(['prefix' => '/item'], function(){
	Route::get('create',  ['as' => 'item.create', 'uses' => 'ItemController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'ItemController@store',
		'as' => 'item.save'])->middleware(['check.type']);
	Route::get('{item}/edit',  ['as' => 'item.edit', 'uses' => 'ItemController@edit'])->middleware(['check.type']);
	Route::any('show',  ['as' => 'item.show', 'uses' => 'ItemController@index'])->middleware(['check.type']);
	Route::any('update', [
		'uses' => 'ItemController@update',
		'as' => 'item.update'])->middleware(['check.type']);
	Route::get('{item}/delete', [
		'uses' => 'ItemController@delete',
		'as' => 'item.delete'])->middleware(['check.type']);
	Route::get('{item}/destroy', [
		'uses' => 'ItemController@destroy',
		'as' => 'item.destroy'])->middleware(['check.type']);
});


Route::group(['prefix' => '/item_type'], function(){
	Route::get('create',  ['as' => 'item_type.create', 'uses' => 'TipoItemController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'TipoItemController@store',
		'as' => 'item_type.save'])->middleware(['check.type']);
	Route::get('show',  ['as' => 'item_type.show', 'uses' => 'TipoItemController@index'])->middleware(['check.type']);
	Route::get('{tipo_item}/edit',  ['as' => 'item_type.edit', 'uses' => 'TipoItemController@edit'])->middleware(['check.type']);
	Route::put('{tipo_item}/update', [
		'uses' => 'TipoItemController@update',
		'as' => 'item_type.update'])->middleware(['check.type']);
	Route::get('{tipo_item}/delete', [
		'uses' => 'TipoItemController@delete',
		'as' => 'item_type.delete'])->middleware(['check.type']);
	Route::get('{tipo_item}/destroy', [
		'uses' => 'TipoItemController@destroy',
		'as' => 'item_type.destroy'])->middleware(['check.type']);
});

Route::group(['prefix' => '/meal_type'], function(){
	Route::get('create',  ['as' => 'meal_type.create', 'uses' => 'TipoRefeicaoController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'TipoRefeicaoController@store',
		'as' => 'meal_type.save'])->middleware(['check.type']);
	Route::get('show',  ['as' => 'meal_type.show', 'uses' => 'TipoRefeicaoController@index'])->middleware(['check.type']);
	Route::get('{tipo_refeicao}/edit',  ['as' => 'meal_type.edit', 'uses' => 'TipoRefeicaoController@edit'])->middleware(['check.type']);
	Route::put('{tipo_refeicao}/update', [
		'uses' => 'TipoRefeicaoController@update',
		'as' => 'meal_type.update'])->middleware(['check.type']);
	Route::get('{tipo_refeicao}/delete', [
		'uses' => 'TipoRefeicaoController@delete',
		'as' => 'meal_type.delete'])->middleware(['check.type']);
	Route::get('{tipo_refeicao}/destroy', [
		'uses' => 'TipoRefeicaoController@destroy',
		'as' => 'meal_type.destroy'])->middleware(['check.type']);
});

Route::group(['prefix' => '/source'], function(){
	Route::get('create',  ['as' => 'source.create', 'uses' => 'FonteAlimentoController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'FonteAlimentoController@store',
		'as' => 'source.save'])->middleware(['check.type']);
	Route::get('show',  ['as' => 'source.show', 'uses' => 'FonteAlimentoController@index'])->middleware(['check.type']);
	Route::get('{fonte_alimento}/edit',  ['as' => 'source.edit', 'uses' => 'FonteAlimentoController@edit'])->middleware(['check.type']);
	Route::put('{fonte_alimento}/update', [
		'uses' => 'FonteAlimentoController@update',
		'as' => 'source.update'])->middleware(['check.type']);
	Route::get('{fonte_alimento}/delete', [
		'uses' => 'FonteAlimentoController@delete',
		'as' => 'source.delete'])->middleware(['check.type']);
	Route::get('{fonte_alimento}/destroy', [
		'uses' => 'FonteAlimentoController@destroy',
		'as' => 'source.destroy'])->middleware(['check.type']);
});

Route::group(['prefix' => '/school'], function(){
	Route::get('create',  ['as' => 'school.create', 'uses' => 'EscolaController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'EscolaController@store',
		'as' => 'school.save'])->middleware(['check.type']);
	Route::get('show',  ['as' => 'school.show', 'uses' => 'EscolaController@index'])->middleware(['check.type']);
	Route::get('{id}/edit',  ['as' => 'school.edit', 'uses' => 'EscolaController@edit'])->middleware(['check.type']);
	Route::any('update', [
		'uses' => 'EscolaController@update',
		'as' => 'school.update'])->middleware(['check.type']);
	Route::get('{escola}/delete', [
		'uses' => 'EscolaController@delete',
		'as' => 'school.delete'])->middleware(['check.type']);
	Route::get('{id}/destroy', [
		'uses' => 'EscolaController@destroy',
		'as' => 'school.destroy'])->middleware(['check.type']);
});


Route::group(['prefix' => '/references'], function(){
	Route::get('create',  ['as' => 'references.create', 'uses' => 'ReferenciasController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'ReferenciasController@store',
		'as' => 'references.save'])->middleware(['check.type']);
	Route::get('show',  ['as' => 'references.show', 'uses' => 'ReferenciasController@index'])->middleware(['check.type']);
	Route::get('{referencia}/edit',  ['as' => 'references.edit', 'uses' => 'ReferenciasController@edit'])->middleware(['check.type']);
	Route::put('{referencia}/update', [
		'uses' => 'ReferenciasController@update',
		'as' => 'references.update'])->middleware(['check.type']);
	Route::get('{referencia}/delete', [
		'uses' => 'ReferenciasController@delete',
		'as' => 'references.delete'])->middleware(['check.type']);
	Route::get('{referencia}/destroy', [
		'uses' => 'ReferenciasController@destroy',
		'as' => 'references.destroy'])->middleware(['check.type']);
});

Route::group(['prefix' => '/preparation'], function(){
	Route::get('create',  ['as' => 'preparation.create', 'uses' => 'PreparacaoController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'PreparacaoController@store',
		'as' => 'preparation.save']);
	Route::get('{id}/preparation_modal',  ['as' => 'preparation.modal', 'uses' => 'PreparacaoController@preparacaoShowModal'])->middleware(['check.type']);
	Route::any('{id}/pdf',  ['as' => 'preparation.pdf', 'uses' => 'PreparacaoController@gerarPDFPreparacao'])->middleware(['check.type']);
	Route::any('show',  ['as' => 'preparation.show', 'uses' => 'PreparacaoController@index'])->middleware(['check.type']);
	Route::get('{id}/edit',  ['as' => 'preparation.edit', 'uses' => 'PreparacaoController@edit'])->middleware(['check.type']);
	Route::any('update', [
		'uses' => 'PreparacaoController@update',
		'as' => 'preparation.update'])->middleware(['check.type']);
	Route::get('{id}/destroy', [
		'uses' => 'PreparacaoController@destroy',
		'as' => 'preparation.destroy'])->middleware(['check.type']);
});


Route::group(['prefix' => '/preparation_type'], function(){
	Route::get('create',  ['as' => 'preparation_type.create', 'uses' => 'TipoPreparacaoController@create'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'TipoPreparacaoController@store',
		'as' => 'preparation_type.save'])->middleware(['check.type']);
	Route::get('show',  ['as' => 'preparation_type.show', 'uses' => 'TipoPreparacaoController@index'])->middleware(['check.type']);
	Route::get('{tipo_preparacao}/edit',  ['as' => 'preparation_type.edit', 'uses' => 'TipoPreparacaoController@edit'])->middleware(['check.type']);
	Route::put('{tipo_preparacao}/update', [
		'uses' => 'TipoPreparacaoController@update',
		'as' => 'preparation_type.update'])->middleware(['check.type']);
	Route::get('{tipo_preparacao}/delete', [
		'uses' => 'TipoPreparacaoController@delete',
		'as' => 'preparation_type.delete'])->middleware(['check.type']);
	Route::get('{tipo_preparacao}/destroy', [
		'uses' => 'TipoPreparacaoController@destroy',
		'as' => 'preparation_type.destroy'])->middleware(['check.type']);
});

Route::group(['prefix' => '/report'], function(){
	Route::any('expenses',  ['as' => 'report.expenses', 'uses' => 'RelatorioController@despesas'])->middleware(['check.type']);
	Route::any('costs',  ['as' => 'report.costs', 'uses' => 'RelatorioController@relatorioCardapios'])->middleware(['check.type']);
	Route::any('menus',  ['as' => 'report.menus', 'uses' => 'RelatorioController@indexCardapio']);
	Route::any('preparations',  ['as' => 'report.preparations', 'uses' => 'RelatorioController@indexPreparacao']);
	Route::get('{id}/menu_modal',  ['as' => 'report.menu_modal', 'uses' => 'RelatorioController@cardapioShowModal']);
	Route::get('{id}/preparation_modal',  ['as' => 'report.preparation_modal', 'uses' => 'RelatorioController@preparacaoShowModal']);
	Route::any('{id}/menu_pdf',  ['as' => 'report.menu_pdf', 'uses' => 'RelatorioController@gerarPDFCardapio']);
	Route::post('menus_pdf',  ['as' => 'report.menus_pdf', 'uses' => 'RelatorioController@RelatorioCardapio']);
	Route::any('{id}/merger_pdf',  ['as' => 'report.merge', 'uses' => 'RelatorioController@Merger']);
	Route::any('{id}/preparation_pdf',  ['as' => 'report.preparation_pdf', 'uses' => 'RelatorioController@gerarPDFPreparacao']);
});

Route::group(['prefix' => '/menu'], function(){
	Route::get('create',  ['as' => 'menu.create', 'uses' => 'CardapioController@create']);
	Route::get('{id}/menu_modal',  ['as' => 'menu.modal', 'uses' => 'CardapioController@cardapioShowModal'])->middleware(['check.type']);
	Route::any('{id}/pdf',  ['as' => 'menu.pdf', 'uses' => 'CardapioController@gerarPDFCardapio'])->middleware(['check.type']);
	Route::get('{id}/import',  ['as' => 'menu.import', 'uses' => 'CardapioController@import'])->middleware(['check.type']);
	Route::post('save', [
		'uses' => 'CardapioController@store',
		'as' => 'menu.save'])->middleware(['check.type']);
	Route::any('show',  ['as' => 'menu.show', 'uses' => 'CardapioController@index'])->middleware(['check.type']);
	Route::get('{id}/edit',  ['as' => 'menu.edit', 'uses' => 'CardapioController@edit'])->middleware(['check.type']);
	Route::any('update', [
		'uses' => 'CardapioController@update',
		'as' => 'menu.update'])->middleware(['check.type']);
	Route::get('{id}/destroy', [
		'uses' => 'CardapioController@destroy',
		'as' => 'menu.destroy'])->middleware(['check.type']);
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');
