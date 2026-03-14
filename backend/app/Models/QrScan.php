<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrScan extends Model
{
    protected $fillable = ['product_id', 'ip_address', 'user_agent', 'referer', 'country', 'city', 'source'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
