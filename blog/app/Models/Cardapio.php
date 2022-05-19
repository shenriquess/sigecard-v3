<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cardapio extends Model
{
  protected $fillable = [
      'nome', 'id_escola', 'id_usuario', 'descricao', 'data_inicio',
      'data_fim', 'quantidade_dias', 'valor','id_modalidade',
  ];
}
