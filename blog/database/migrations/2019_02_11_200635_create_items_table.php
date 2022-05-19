<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedinteger('id_tipo_item');
            $table->unsignedinteger('id_fonte');
            $table->string('nome',100);
            $table->double('valor', 8, 2)->default('0');
            $table->integer('unidade_medida');
            $table->float('medida_base', 8, 3)->default('0');
            $table->float('calorias', 8, 3)->default('0');
            $table->float('carboidratos', 8, 3)->default('0');
            $table->float('proteinas', 8, 3)->default('0');
            $table->float('lipidios', 8, 3)->default('0');
            $table->float('fibras', 8, 3)->default('0');
            $table->float('vitamina_a', 8, 3)->default('0');
            $table->float('vitamina_c', 8, 3)->default('0');
            $table->float('vitamina_d', 8, 3)->default('0');
            $table->float('vitamina_e', 8, 3)->default('0');
            $table->float('vitamina_b1', 8, 3)->default('0');
            $table->float('vitamina_b2', 8, 3)->default('0');
            $table->float('vitamina_b6', 8, 3)->default('0');
            $table->float('vitamina_b12', 8, 3)->default('0');
            $table->float('niacina')->default('0');
            $table->float('folico', 8, 3)->default('0');
            $table->float('pantotenico', 8, 3)->default('0');
            $table->float('calcio', 8, 3)->default('0');
            $table->float('ferro', 8, 3)->default('0');
            $table->float('magnesio', 8, 3)->default('0');
            $table->float('potassio', 8, 3)->default('0');
            $table->float('selenio', 8, 3)->default('0');
            $table->float('fosforo', 8, 3)->default('0');
            $table->float('iodo', 8, 3)->default('0');
            $table->float('cobre', 8, 3)->default('0');
            $table->float('zinco', 8, 3)->default('0');
            $table->float('sodio', 8, 3)->default('0');
            $table->float('gordura_total', 8, 3)->default('0');
            $table->float('colesterol', 8, 3)->default('0');
            $table->float('gordura_saturada', 8, 3)->default('0');
            $table->float('gordura_poliinsaturada', 8, 3)->default('0');
            $table->float('gordura_monoinsaturada', 8, 3)->default('0');
            $table->foreign('id_tipo_item')->references('id')->on('tipo_items');
            $table->foreign('id_fonte')->references('id')->on('fonte_alimentos');
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
        Schema::dropIfExists('items');
    }
}
