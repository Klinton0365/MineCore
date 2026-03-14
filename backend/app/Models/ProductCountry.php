<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCountry extends Model
{
    protected $fillable = [
        'product_id',
        'country_code',
        'country_name',
        'is_available',
    ];

    protected function casts(): array
    {
        return [
            'is_available' => 'boolean',
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
