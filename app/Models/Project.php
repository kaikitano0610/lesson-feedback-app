<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo; 

class Project extends Model
{
    protected $guarded = ['id'];

    public function groups() :HasMany
    {
        return $this->hasMany(Group::class);
    }
}
