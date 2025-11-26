<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class InquiryController extends Controller
{
    /**
     * Display a listing of inquiries (Admin only)
     */
    public function index(): JsonResponse
{
    $inquiries = Inquiry::where('company_id', 1)
                        ->latest()
                        ->get();

    return response()->json([
        'success' => true,
        'data' => $inquiries
    ]);
}


     /**
     * Store a newly created inquiry (Public - Contact Form Submission)
     */
    public function store(Request $request): JsonResponse
    {
        // Auto-set company_id
        $request->merge(['company_id' => 1]);

        // Validate input
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'phone'       => 'nullable|string|max:20',
            'message'     => 'nullable|string|max:5000',
            'company_id'  => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if (!$request->email && !$request->phone) {
            return response()->json([
                'success' => false,
                'message' => 'Please provide either email or phone number.'
            ], 422);
        }

        // 1️⃣ Save inquiry to DB
        $inquiry = Inquiry::create($request->all());

        // 2️⃣ Send WhatsApp Notification to Admin using Template
        $this->sendWhatsAppToAdmin($inquiry);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your inquiry! We will contact you soon.',
            'data' => $inquiry
        ], 201);
    }

    /**
     * Send WhatsApp template notification to Admin
     */
    // private function sendWhatsAppToAdmin($inquiry)
    // {
    //     try {
    //         $token = env('WHATSAPP_TOKEN');
    //         $phoneNumberId = env('WHATSAPP_PHONE_NUMBER_ID');
    //         $adminPhone = env('ADMIN_PHONE');  // e.g., "91XXXXXXXXXX"
    //         $templateName = "sks"; // Approved template name

    //         $response = Http::withOptions(['verify' => false])
    // ->withToken(env('WHATSAPP_TOKEN'))
    // ->post("https://graph.facebook.com/v19.0/{$phoneNumberId}/messages", [
    //     "messaging_product" => "whatsapp",
    //     "to" => $adminPhone,
    //     "type" => "template",
    //     "template" => [
    //         "name" => $templateName,
    //         "language" => ["code" => "en"],
    //         "components" => [
    //             [
    //                 "type" => "body",
    //                 "parameters" => [
    //                     ["type" => "text", "text" => $inquiry->name ?? "N/A"],
    //                     ["type" => "text", "text" => $inquiry->email ?? "N/A"],
    //                     ["type" => "text", "text" => $inquiry->phone ?? "N/A"],
    //                     ["type" => "text", "text" => $inquiry->message ?? "N/A"],
    //                 ]
    //             ]
    //         ]
    //     ]
    // ]);


    //         // Log response (just for debugging)
    //         \Log::info('WhatsApp API Response: ' . $response->body());
    //     } catch (\Exception $e) {
    //         \Log::error('WhatsApp API Error: ' . $e->getMessage());
    //     }
    // }

    private function sendWhatsAppToAdmin($inquiry)
{
    try {
        $token = env('WHATSAPP_TOKEN');
        $phoneNumberId = env('WHATSAPP_PHONE_NUMBER_ID');
        $adminPhone = env('ADMIN_PHONE');  // e.g., "91XXXXXXXXXX"
        $templateName = "hello_world"; // WhatsApp default template

        $response = Http::withOptions(['verify' => false])
            ->withToken($token)
            ->post("https://graph.facebook.com/v19.0/{$phoneNumberId}/messages", [
                "messaging_product" => "whatsapp",
                "to" => $adminPhone,
                "type" => "template",
                "template" => [
                    "name" => $templateName,
                    "language" => ["code" => "en_US"], // For hello_world default
                ]
            ]);

        \Log::info('WhatsApp API Response: ' . $response->body());
    } catch (\Exception $e) {
        \Log::error('WhatsApp API Error: ' . $e->getMessage());
    }
}


    /**
     * Display the specified inquiry (Admin only)
     */
    public function show(string $id): JsonResponse
    {
        $inquiry = Inquiry::find($id);
        
        if (!$inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Inquiry not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $inquiry
        ]);
    }




    /**
     * Remove the specified inquiry (Admin only)
     */
    public function destroy(string $id): JsonResponse
    {
        $inquiry = Inquiry::find($id);
        
        if (!$inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Inquiry not found'
            ], 404);
        }

        $inquiry->delete();

        return response()->json([
            'success' => true,
            'message' => 'Inquiry deleted successfully'
        ]);
    }

    /**
     * Export inquiries to CSV (Admin only)
     */
public function export()
{
    $inquiries = \App\Models\Inquiry::all();

    $csvData = "Name,Email,Phone,Message\n";
    foreach ($inquiries as $inq) {
        $csvData .= "\"{$inq->name}\",\"{$inq->email}\",\"{$inq->phone}\",\"{$inq->message}\"\n";
    }

    return response($csvData)
        ->header('Content-Type', 'text/csv')
        ->header('Content-Disposition', 'attachment; filename="inquiries.csv"');
}

public function toggleRequestServed($id)
{
    $inquiry = Inquiry::findOrFail($id);
    $inquiry->request_served = !$inquiry->request_served;
    $inquiry->save();

    return response()->json([
        'success' => true,
        'request_served' => $inquiry->request_served
    ]);
}



}