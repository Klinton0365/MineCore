<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'name',
        'region_code',
        'country',
        'description',
        'address',
        'is_visible',
        'display_logic',
    ];

    protected function casts(): array
    {
        return [
            'is_visible' => 'boolean',
        ];
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'branch_product')
            ->withPivot('stock_status', 'is_override');
    }
}
