<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class BranchProduct extends Pivot
{
    protected $table = 'branch_product';

    protected $fillable = [
        'branch_id',
        'product_id',
        'stock_status',
        'is_override',
    ];

    protected function casts(): array
    {
        return [
            'is_override' => 'boolean',
        ];
    }
}
