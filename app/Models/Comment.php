<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo; 
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = ['id'];

    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
