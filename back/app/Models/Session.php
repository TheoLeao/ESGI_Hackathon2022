<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    /**
     * Get all users for the session
     */
    public function usersSessions()
    {
        return $this->hasMany(UsersSessions::class);
    }

    /**
     * Get campaign for the session
     */
    public function campaign()
    {
        return $this->belongsTo(Compaign::class);
    }
}
