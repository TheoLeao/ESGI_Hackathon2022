<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    /**
     * Get all users for the answer
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get the question for the answer
     */
    public function question()
    {
        return $this->hasOne(Question::class);
    }

    /**
     * Get the response for the answer
     */
    public function response()
    {
        return $this->hasOne(Response::class);
    }
}
