<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersSessions extends Model
{
    use HasFactory;

    /**
     * Get user for the usersSessions
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get session for the usersSessions
     */
    public function session()
    {
        return $this->belongsTo(Session::class);
    }
}
