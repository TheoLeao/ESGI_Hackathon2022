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
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
