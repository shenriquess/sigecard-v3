<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemPreparacao extends Model
{
  protected $fillable = [
      'id_item', 'id_preparacao', 'p_bruto', 'p_liquido', 'p_medida',
  ];
}
