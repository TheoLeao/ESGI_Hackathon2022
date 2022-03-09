<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    protected $fillable = [
        'response',
        'value',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function userResponses()
    {
        return $this->hasMany(UserResponse::class);
    }
}
