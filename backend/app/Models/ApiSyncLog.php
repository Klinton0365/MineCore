<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApiSyncLog extends Model
{
    protected $fillable = [
        'endpoint',
        'status',
        'response_code',
        'response_data',
        'error_message',
        'synced_at',
    ];

    protected function casts(): array
    {
        return [
            'synced_at' => 'datetime',
        ];
    }
}
