<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * Get all users for the product
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get all questions for the product
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
