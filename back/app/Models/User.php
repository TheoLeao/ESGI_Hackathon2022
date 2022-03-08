<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the address for the user
     */
    public function address()
    {
        return $this->hasOne(Address::class);
    }

    /**
     * Get all products for the user
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get all sessions for the user
     */
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    /**
     * Get all answers for the user
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
