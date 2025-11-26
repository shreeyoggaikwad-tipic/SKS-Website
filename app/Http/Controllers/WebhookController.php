<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    // STEP 1: Webhook verification
    public function verifyWebhook(Request $request)
{
    $verifyToken = env('WHATSAPP_VERIFY_TOKEN');

    if ($request->hub_verify_token === $verifyToken) {
        return response($request->hub_challenge, 200);
    }
    return response('Invalid verification token', 403);
}


    // STEP 2: Handle incoming webhook events
    public function handleWebhook(Request $request)
    {
        Log::info('WhatsApp Webhook Received:', $request->all());

        // Example: Check message status
        if (isset($request->entry[0]['changes'][0]['value']['statuses'])) {
            $status = $request->entry[0]['changes'][0]['value']['statuses'][0];
            Log::info("📩 WhatsApp Message Status:", $status);
        }

        return response()->json(['status' => 'received'], 200);
    }
}
