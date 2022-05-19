<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preparacao extends Model
{
  protected $fillable = [
      'nome', 'modo_preparo', 'descricao', 'medida_total', 'id_tipo_preparacao', 'valor',
  ];
}
