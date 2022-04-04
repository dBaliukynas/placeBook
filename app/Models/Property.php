<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'country',
        'city',
        'region',
        'postcode',
        'type',
        'price',
        'author_id',
        'description',
        'rating',
        'review_count',
        'image_path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
