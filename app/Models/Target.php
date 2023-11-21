<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Target extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'target',
        'deadline',
        'motivationalDescription',
        'user_id'
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    public function getJobCounterAttribute()
    {
        return $this->jobs()->count();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
