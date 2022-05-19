<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardapiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cardapios', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedinteger('id_escola');
            $table->unsignedinteger('id_usuario');
            $table->string('nome',200);
            $table->string('descricao',250);
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->integer('quantidade_dias');
            $table->integer('id_modalidade');
            $table->double('valor', 8, 2)->default('0');
            $table->foreign('id_escola')->references('id')->on('escolas');
            $table->foreign('id_usuario')->references('id')->on('users');
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
        Schema::dropIfExists('cardapios');
    }
}
