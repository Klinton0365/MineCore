<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_countries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('country_code', 5);
            $table->string('country_name');
            $table->boolean('is_available')->default(true);
            $table->timestamps();

            $table->unique(['product_id', 'country_code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_countries');
    }
};
