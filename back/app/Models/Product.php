<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'brand',
        'code_product',
        'category',
        'picture',
    ];

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
}
