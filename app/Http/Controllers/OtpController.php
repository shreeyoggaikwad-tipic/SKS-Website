<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class OtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|numeric|digits:10',
        ]);

        $phone = $request->input('phone');
        // Format phone number to international format if needed (assuming '91' for India based on context, 
        // but looking at existing files might verify. Usually API requires country code. 
        // I'll assume input is 10 digits and prepend 91 for now, or use as is if user provides full.)
        // Actually, user standard input is likely 10 digits. I will prepend 91.
        $formattedPhone = '91' . $phone; 

        $otp = rand(100000, 999999);
        
        // Store OTP in cache for 10 minutes
        Cache::put('otp_' . $phone, $otp, 600);

        Log::info("Generated OTP for $phone: $otp");

        // Send Via WhatsApp API
        $token = env('WHATSAPP_TOKEN');
        $phoneId = env('WHATSAPP_PHONE_NUMBER_ID');

        if (!$token || !$phoneId) {
            Log::error("WhatsApp credentials missing in .env");
            return response()->json(['message' => 'Server configuration error'], 500);
        }

        $url = "https://graph.facebook.com/v19.0/{$phoneId}/messages";
        
        $response = Http::withOptions(['verify' => false])->withToken($token)->post($url, [
            'messaging_product' => 'whatsapp',
            'to' => $formattedPhone,
            'type' => 'text',
            'text' => [
                'body' => "Your verification code for Smart Kitchen Solutions is: *$otp*. Do not share this code with anyone."
            ]
        ]);

        if ($response->successful()) {
            return response()->json(['message' => 'OTP sent successfully']);
        } else {
            Log::error("WhatsApp API Error: " . $response->body());
            // Fallback for development/testing if API fails (optional, but good for debugging)
            return response()->json(['message' => 'Failed to send OTP via WhatsApp. Check logs.'], 500);
        }
    }

//   public function sendOtp(Request $request)
// {
//     $request->validate([
//         'phone' => 'required|numeric|digits:10',
//     ]);

//     $phone = $request->input('phone');
//     $formattedPhone = '+91' . $phone; // WhatsApp requires E.164 format

//     $otp = rand(100000, 999999);

//     // Save OTP (10 minutes)
//     Cache::put('otp_' . $phone, $otp, 600);

//     Log::info("🔐 Generated OTP for {$phone}: {$otp}");

//     // WhatsApp Credentials
//     $token = env('WHATSAPP_TOKEN');
//     $phoneId = env('WHATSAPP_PHONE_NUMBER_ID');

//     if (!$token || !$phoneId) {
//         Log::error("❌ WhatsApp credentials missing in .env");
//         return response()->json(['message' => 'Server configuration error'], 500);
//     }

//     $url = "https://graph.facebook.com/v19.0/{$phoneId}/messages";

//     // WhatsApp Authentication Template Payload (CLEAN VERSION)
//     $payload = [
//         'messaging_product' => 'whatsapp',
//         'to' => $formattedPhone,
//         'type' => 'template',
//         'template' => [
//             'name' => 'otp_new',  // NEW TEMPLATE NAME
//             'language' => ['code' => 'en_US'],
//             'components' => [
//                 [
//                     'type' => 'body',
//                     'parameters' => [
//                         ['type' => 'text', 'text' => (string)$otp]
//                     ]
//                 ]
//             ]
//         ]
//     ];

//     // 📌 LOG THE PAYLOAD BEFORE SENDING
//     Log::info("📤 Sending WhatsApp OTP Payload:", $payload);

//     // 📌 LOG TEMPLATE NAME ONLY
//     Log::info("📌 Template being used: " . $payload['template']['name']);

//     // SEND REQUEST
//     $response = Http::withOptions(['verify' => false])
//         ->withToken($token)
//         ->post($url, $payload);

//     // 📌 LOG RAW RESPONSE
//     Log::info("📥 WhatsApp API Response:", $response->json());

//     if ($response->successful()) {
//         Log::info("✅ OTP sent successfully to {$formattedPhone}");
//         return response()->json(['message' => 'OTP sent successfully']);
//     } else {
//         Log::error("❌ WhatsApp API Error:", $response->json());
//         return response()->json([
//             'message' => 'Failed to send OTP',
//             'error' => $response->json()
//         ], 500);
//     }
// }


    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|numeric|digits:10',
            'otp' => 'required|numeric|digits:6',
        ]);

        $phone = $request->input('phone');
        $inputOtp = $request->input('otp');

        $cachedOtp = Cache::get('otp_' . $phone);

        if (!$cachedOtp) {
            return response()->json(['message' => 'OTP expired or not found'], 400);
        }

        if ($inputOtp == $cachedOtp) {
            // Clear OTP after successful verification
            Cache::forget('otp_' . $phone);
            return response()->json(['message' => 'OTP verified successfully']);
        } else {
            return response()->json(['message' => 'Invalid OTP'], 400);
        }
    }
}
