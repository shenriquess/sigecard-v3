<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateViewPreparacaosTable extends Migration {

    public function up()
    {
        DB::statement( 'CREATE VIEW view_preparacaos AS SELECT p.id_item, r.nome as nome_preparacao, r.id_tipo_preparacao as id_tipo_preparacao,
                                                                r.medida_total, p.id_preparacao, p.p_medida, p.p_bruto, p.p_liquido, i.*
                                                     FROM item_preparacaos as p
                                                     INNER JOIN preparacaos as r
                                                     ON (p.id_preparacao = r.id)
                                                     INNER JOIN items i
                                                     ON (p.id_item = i.id)
                                                     ORDER BY p.id_preparacao' );
    }

    public function down()
    {
        DB::statement( 'DROP VIEW view_preparacaos' );
    }

}
