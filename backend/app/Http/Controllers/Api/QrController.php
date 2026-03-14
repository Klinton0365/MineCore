<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\QrScan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QrController extends Controller
{
    /**
     * Public: Record a scan and return the product slug for redirect.
     * Called when someone scans a QR code — GET /api/qr/{productId}/scan
     */
    public function scan(Request $request, int $productId)
    {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Record the scan
        QrScan::create([
            'product_id' => $product->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'referer' => $request->header('referer'),
            'source' => $request->query('source', 'qr'),
        ]);

        return response()->json([
            'slug' => $product->slug,
            'name' => $product->name,
            'product_id' => $product->id,
        ]);
    }

    /**
     * Admin: Get scan analytics for all products.
     */
    public function analytics(Request $request)
    {
        $days = (int) $request->query('days', 30);
        $since = now()->subDays($days);

        // Total scans
        $totalScans = QrScan::where('created_at', '>=', $since)->count();

        // Scans by day (for chart)
        $scansByDay = QrScan::where('created_at', '>=', $since)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top scanned products
        $topProducts = QrScan::where('qr_scans.created_at', '>=', $since)
            ->join('products', 'products.id', '=', 'qr_scans.product_id')
            ->select('products.id', 'products.name', 'products.slug', DB::raw('COUNT(*) as scan_count'))
            ->groupBy('products.id', 'products.name', 'products.slug')
            ->orderByDesc('scan_count')
            ->limit(10)
            ->get();

        // Recent scans
        $recentScans = QrScan::with('product:id,name,slug')
            ->latest()
            ->limit(20)
            ->get();

        // Scans by source
        $scansBySource = QrScan::where('created_at', '>=', $since)
            ->select('source', DB::raw('COUNT(*) as count'))
            ->groupBy('source')
            ->get();

        return response()->json([
            'total_scans' => $totalScans,
            'scans_by_day' => $scansByDay,
            'top_products' => $topProducts,
            'recent_scans' => $recentScans,
            'scans_by_source' => $scansBySource,
        ]);
    }

    /**
     * Admin: Get scan stats for a specific product.
     */
    public function productScans(int $productId)
    {
        $product = Product::findOrFail($productId);

        $totalScans = QrScan::where('product_id', $productId)->count();
        $last30Days = QrScan::where('product_id', $productId)
            ->where('created_at', '>=', now()->subDays(30))
            ->count();

        $scansByDay = QrScan::where('product_id', $productId)
            ->where('created_at', '>=', now()->subDays(30))
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $recentScans = QrScan::where('product_id', $productId)
            ->latest()
            ->limit(10)
            ->get(['id', 'ip_address', 'source', 'created_at']);

        return response()->json([
            'product' => ['id' => $product->id, 'name' => $product->name, 'slug' => $product->slug],
            'total_scans' => $totalScans,
            'last_30_days' => $last30Days,
            'scans_by_day' => $scansByDay,
            'recent_scans' => $recentScans,
        ]);
    }
}
