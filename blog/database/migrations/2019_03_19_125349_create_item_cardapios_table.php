<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemCardapiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_cardapios', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedinteger('id_cardapio');
            $table->unsignedinteger('id_preparacao')->nullable();
            $table->unsignedinteger('id_alimento')->nullable();
            $table->unsignedinteger('id_refeicao');
            $table->integer('tipo');
            $table->integer('id_unidade_medida')->default('0');
            $table->float('per_capta_alimento')->default('0');
            $table->integer('dia_semana');
            $table->foreign('id_cardapio')->references('id')->on('cardapios');
            $table->foreign('id_preparacao')->references('id')->on('preparacaos');
            $table->foreign('id_alimento')->references('id')->on('items');
            $table->foreign('id_refeicao')->references('id')->on('tipo_refeicaos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_cardapios');
    }
}
