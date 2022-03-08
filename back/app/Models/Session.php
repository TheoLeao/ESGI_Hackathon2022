<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start',
        'end'
    ];

    public function userSession()
    {
        return $this->belongsToMany(UserSession::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
