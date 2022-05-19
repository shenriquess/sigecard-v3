<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateMedidasItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medidas_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedinteger('id_item');
            $table->string('nome_medida',100);
            $table->integer('unidade_medida');
            $table->float('medida')->default('0');
            $table->foreign('id_item')->references('id')->on('items');
            $table->timestamps();
        });

        DB::update("ALTER TABLE medidas_items AUTO_INCREMENT = 2;");

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medidas_items');
    }
}
