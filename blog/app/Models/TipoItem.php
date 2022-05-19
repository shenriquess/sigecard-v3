<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TipoItem extends Model
{
  use Notifiable;

  protected $fillable = [
      'nome', 'descricao',
  ];
}
