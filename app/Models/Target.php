<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'target',
        'deadline',
        'motivationalDescription'
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    public function getJobCounterAttribute()
    {
        return $this->jobs()->count();
    }
}
