<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    /**
     * Get the users for the address
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
