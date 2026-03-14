<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('api_sync_logs', function (Blueprint $table) {
            $table->id();
            $table->string('endpoint');
            $table->enum('status', ['success', 'failed', 'pending'])->default('pending');
            $table->integer('response_code')->nullable();
            $table->text('response_data')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamp('synced_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('api_sync_logs');
    }
};
