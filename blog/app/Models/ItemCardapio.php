<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemCardapio extends Model
{
  protected $fillable = [
      'id_cardapio', 'id_preparacao', 'id_alimento', 'id_refeicao', 'tipo', 'dia_semana',
      'id_unidade_medida', 'per_capta_alimento'
  ];
}
