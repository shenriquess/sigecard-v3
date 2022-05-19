<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePreparacaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preparacaos', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedinteger('id_tipo_preparacao');
            $table->string('nome',200);
            $table->string('descricao',250);
            $table->text('modo_preparo');
            $table->double('valor', 8, 2)->default('0');
            $table->float('medida_total', 8, 3)->default('0');
            $table->foreign('id_tipo_preparacao')->references('id')->on('tipo_preparacaos');
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
        Schema::dropIfExists('preparacaos');
    }
}
