<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebhookController;

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

// Contact/Inquiry submission (public)
Route::post('/inquiries', [InquiryController::class, 'store']);
Route::post('/send-otp', [\App\Http\Controllers\OtpController::class, 'sendOtp']);
Route::post('/verify-otp', [\App\Http\Controllers\OtpController::class, 'verifyOtp']);

Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/webhook/whatsapp', [WebhookController::class, 'verifyWebhook']); // for GET validation
Route::post('/webhook/whatsapp', [WebhookController::class, 'handleWebhook']); // for actual events

// Protected Admin routes
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    
    // View inquiries (Admin only)
    Route::get('/inquiries', [InquiryController::class, 'index']);
    Route::get('/inquiries/export', [InquiryController::class, 'export']);
    Route::delete('/inquiries/{id}', [InquiryController::class, 'destroy']);
    Route::patch('/inquiries/{id}/toggle-served', [InquiryController::class, 'toggleRequestServed']);

    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/profile', [AuthController::class, 'getAdminProfile']);
    Route::put('/profile', [AuthController::class, 'updateAdminProfile']);
});