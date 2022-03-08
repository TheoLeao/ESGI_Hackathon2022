<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    /**
     * Get product for the question
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get anwser for the question
     */
    public function answers()
    {
        return $this->belongsToMany(Answer::class);
    }

    /**
     * Get all responses for the question
     */
    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
