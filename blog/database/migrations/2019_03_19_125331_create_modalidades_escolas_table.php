<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModalidadesEscolasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modalidades_escolas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedinteger('id_escola');
            $table->unsignedinteger('id_referencia');
            $table->integer('categoria_ensino');
            $table->integer('idade_alunos');
            $table->integer('periodo');
            $table->integer('num_alunos');
            $table->integer('num_refeicoes');
            $table->foreign('id_escola')->references('id')->on('escolas');
            $table->foreign('id_referencia')->references('id')->on('referencias');
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
        Schema::dropIfExists('modalidades_escolas');
    }
}
