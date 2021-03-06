<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'state',
        'description',
        'product_id'
    ];

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function requests()
    {
        return $this->hasMany(CampaignRequest::class);
    }
}
