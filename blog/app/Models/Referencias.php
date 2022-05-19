<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Referencias extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'descricao','num_refeicoes','categoria_ensino', 'idade_alunos', 'periodo', 'calorias',
        'carboidratos', 'proteinas', 'lipidios', 'fibras', 'vitamina_a',
        'vitamina_c', 'vitamina_d', 'vitamina_e', 'vitamina_b1', 'vitamina_b2',
        'vitamina_b6', 'vitamina_b12', 'niacina', 'folico', 'pantotenico',
        'calcio', 'ferro', 'magnesio', 'potassio', 'selenio', 'fosforo',
        'iodo', 'cobre', 'zinco', 'sodio', 'gordura_total', 'colesterol',
        'gordura_saturada', 'gordura_poliinsaturada', 'gordura_monoinsaturada',
    ];
}
