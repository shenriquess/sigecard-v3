<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ModalidadesEscola extends Model
{
    protected $fillable = [
        'id_escola', 'id_referencia', 'categoria_ensino', 'idade_alunos',
        'periodo', 'num_alunos', 'num_refeicoes',
    ];
}
