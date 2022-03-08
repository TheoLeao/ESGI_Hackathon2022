<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserResponse extends Model
{
    use HasFactory;

    /**
     * Get all users for the userResponse
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the question for the userResponse
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Get the response for the userResponse
     */
    public function response()
    {
        return $this->belongsTo(Response::class);
    }
}
