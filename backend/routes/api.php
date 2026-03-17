<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\BranchPublicController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FeaturedController;
use App\Http\Controllers\Api\QrController;
use App\Http\Controllers\Api\SettingController;

// Public routes
Route::get('/check', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API is working',
    ]);
});

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

Route::get('/branches/public', [BranchPublicController::class, 'index']);

Route::post('/enquiries', [EnquiryController::class, 'store']);

Route::get('/featured/active', [FeaturedController::class, 'activeProducts']);

Route::get('/qr/{productId}/scan', [QrController::class, 'scan']);

// Protected admin routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('/admin/categories', CategoryController::class)->except(['index', 'show']);
    Route::apiResource('/admin/products', ProductController::class)->except(['index', 'show']);
    Route::post('/admin/products/{product}/images', [ProductController::class, 'uploadImages']);
    Route::delete('/admin/products/{product}/images/{image}', [ProductController::class, 'deleteImage']);

    Route::apiResource('/admin/branches', BranchController::class);
    Route::put('/admin/branches/{branch}/stock', [BranchController::class, 'updateStock']);

    Route::get('/admin/enquiries', [EnquiryController::class, 'index']);
    Route::get('/admin/enquiries/stats', [EnquiryController::class, 'stats']);
    Route::get('/admin/enquiries/export', [EnquiryController::class, 'export']);
    Route::get('/admin/enquiries/{enquiry}', [EnquiryController::class, 'show']);
    Route::put('/admin/enquiries/{enquiry}/status', [EnquiryController::class, 'updateStatus']);

    Route::apiResource('/admin/featured', FeaturedController::class);

    Route::get('/admin/qr/analytics', [QrController::class, 'analytics']);
    Route::get('/admin/qr/products/{productId}', [QrController::class, 'productScans']);

    Route::get('/admin/settings', [SettingController::class, 'index']);
    Route::put('/admin/settings', [SettingController::class, 'update']);
});
