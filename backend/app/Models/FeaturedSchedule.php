<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturedSchedule extends Model
{
    protected $fillable = [
        'product_id',
        'start_date',
        'end_date',
        'countdown_end',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'countdown_end' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
