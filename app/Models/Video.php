<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $guarded = ['id'];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class,'group_id');
    }
}
