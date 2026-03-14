<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    protected $fillable = [
        'customer_name',
        'phone',
        'email',
        'country',
        'message',
        'status',
        'ip_address',
    ];

    public function items()
    {
        return $this->hasMany(EnquiryItem::class);
    }

    public function products()
    {
        return $this->hasManyThrough(
            Product::class,
            EnquiryItem::class,
            'enquiry_id',
            'id',
            'id',
            'product_id'
        );
    }
}
