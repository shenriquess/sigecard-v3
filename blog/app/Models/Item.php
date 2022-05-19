<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Item extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_tipo_item','id_fonte', 'nome', 'unidade_medida',
        'medida_base', 'calorias', 'carboidratos', 'proteinas', 'lipidios', 'fibras',
        'vitamina_a', 'vitamina_c', 'vitamina_d', 'vitamina_e', 'vitamina_b1', 'vitamina_b2',
        'vitamina_b6', 'vitamina_b12', 'niacina', 'folico', 'pantotenico',
        'calcio', 'ferro', 'magnesio', 'potassio', 'selenio', 'fosforo',
        'iodo', 'cobre', 'zinco', 'sodio', 'gordura_total', 'colesterol',
        'gordura_saturada', 'gordura_poliinsaturada', 'gordura_monoinsaturada', 'valor',
    ];
}
