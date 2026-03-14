<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'description',
        'specifications',
        'is_featured',
        'is_product_of_week',
        'featured_badge',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'specifications' => 'array',
            'is_featured' => 'boolean',
            'is_product_of_week' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function branches()
    {
        return $this->belongsToMany(Branch::class, 'branch_product')
            ->withPivot('stock_status', 'is_override');
    }

    public function countries()
    {
        return $this->hasMany(ProductCountry::class);
    }

    public function enquiryItems()
    {
        return $this->hasMany(EnquiryItem::class);
    }

    public function featuredSchedules()
    {
        return $this->hasMany(FeaturedSchedule::class);
    }
}
