<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    /**
     * Get all sessions for the session
     */
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}
