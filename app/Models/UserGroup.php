<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // 明示的にテーブル名を指定
    protected $table = 'user_group';
}
