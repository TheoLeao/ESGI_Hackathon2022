<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    /**
     * Get the question for the response
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Get the answer for the response
     */
    public function answers()
    {
        return $this->belongsToMany(Answer::class);
    }
}
