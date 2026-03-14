<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\EnquiryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class EnquiryController extends Controller
{
    public function index(Request $request)
    {
        $query = Enquiry::with('items.product');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('country')) {
            $query->where('country', $request->country);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $enquiries = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($enquiries);
    }

    public function show(Enquiry $enquiry)
    {
        $enquiry->load('items.product');

        return response()->json($enquiry);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'country' => 'required|string|max:100',
            'message' => 'nullable|string',
            'product_ids' => 'required|array|min:1',
            'product_ids.*' => 'exists:products,id',
        ]);

        $enquiry = Enquiry::create([
            'customer_name' => $request->customer_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'country' => $request->country,
            'message' => $request->message,
            'status' => 'new',
            'ip_address' => $request->ip(),
        ]);

        foreach ($request->product_ids as $productId) {
            EnquiryItem::create([
                'enquiry_id' => $enquiry->id,
                'product_id' => $productId,
            ]);
        }

        // Send notification email to admin
        $adminEmail = config('mail.admin_address', 'admin@minecoreglobal.com');
        Mail::raw(
            "New enquiry #{$enquiry->id} from {$enquiry->customer_name} ({$enquiry->country}).\nEmail: {$enquiry->email}\nPhone: {$enquiry->phone}\nMessage: {$enquiry->message}",
            function ($message) use ($adminEmail, $enquiry) {
                $message->to($adminEmail)
                    ->subject("New Enquiry #{$enquiry->id} - MineCore Global");
            }
        );

        return response()->json([
            'message' => 'Enquiry submitted successfully.',
            'enquiry_id' => $enquiry->id,
        ], 201);
    }

    public function updateStatus(Request $request, Enquiry $enquiry)
    {
        $request->validate([
            'status' => 'required|string|in:new,in_progress,resolved,closed',
        ]);

        $enquiry->update(['status' => $request->status]);

        return response()->json($enquiry);
    }

    public function export(Request $request)
    {
        $query = Enquiry::with('items.product');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('country')) {
            $query->where('country', $request->country);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $enquiries = $query->orderBy('created_at', 'desc')->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="enquiries.csv"',
        ];

        $callback = function () use ($enquiries) {
            $file = fopen('php://output', 'w');

            fputcsv($file, ['ID', 'Customer Name', 'Email', 'Phone', 'Country', 'Status', 'Products', 'Message', 'Date']);

            foreach ($enquiries as $enquiry) {
                $products = $enquiry->items->map(fn($item) => $item->product->name ?? 'N/A')->implode('; ');
                fputcsv($file, [
                    $enquiry->id,
                    $enquiry->customer_name,
                    $enquiry->email,
                    $enquiry->phone,
                    $enquiry->country,
                    $enquiry->status,
                    $products,
                    $enquiry->message,
                    $enquiry->created_at->toDateTimeString(),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function stats()
    {
        $total = Enquiry::count();

        $byStatus = Enquiry::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        $byCountry = Enquiry::select('country', DB::raw('count(*) as count'))
            ->groupBy('country')
            ->orderByDesc('count')
            ->limit(5)
            ->pluck('count', 'country');

        $monthlyTrend = Enquiry::select(
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
                DB::raw('count(*) as count')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        return response()->json([
            'total' => $total,
            'by_status' => $byStatus,
            'by_country' => $byCountry,
            'monthly_trend' => $monthlyTrend,
        ]);
    }
}
