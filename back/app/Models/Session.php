<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'campaign_id',
        'start',
        'end'
    ];

    public function userSessions()
    {
        return $this->hasMany(UserSession::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
