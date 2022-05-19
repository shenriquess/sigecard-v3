<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemPreparacaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_preparacaos', function (Blueprint $table) {
          $table->unsignedinteger('id_item');
          $table->unsignedinteger('id_preparacao');
          $table->primary(['id_item', 'id_preparacao']);
          $table->integer('p_medida')->default('0');
          $table->float('p_bruto', 8, 3)->default('0');
          $table->float('p_liquido', 8, 3)->default('0');
          $table->foreign('id_item')->references('id')->on('items');
          $table->foreign('id_preparacao')->references('id')->on('preparacaos');
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
        Schema::dropIfExists('item_preparacaos');
    }
}
