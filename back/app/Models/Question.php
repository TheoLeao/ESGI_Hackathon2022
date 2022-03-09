<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function userResponses()
    {
        return $this->belongsToMany(UserResponse::class);
    }

    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
