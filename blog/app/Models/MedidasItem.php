<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedidasItem extends Model
{
  protected $fillable = [
      'id_item','nome_medida', 'unidade_medida', 'medida',
  ];
}
