<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Enquiry;
use App\Models\EnquiryItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalEnquiries = Enquiry::count();

        // Enquiries trend: percentage change from previous month
        $currentMonthCount = Enquiry::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $previousMonthCount = Enquiry::whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->count();

        $enquiriesTrend = $previousMonthCount > 0
            ? round((($currentMonthCount - $previousMonthCount) / $previousMonthCount) * 100, 1)
            : ($currentMonthCount > 0 ? 100 : 0);

        // Top product: most enquired
        $topProductData = EnquiryItem::select('product_id', DB::raw('count(*) as enquiry_count'))
            ->groupBy('product_id')
            ->orderByDesc('enquiry_count')
            ->first();

        $topProduct = null;
        if ($topProductData) {
            $product = Product::find($topProductData->product_id);
            $topProduct = [
                'name' => $product->name ?? 'N/A',
                'enquiry_count' => $topProductData->enquiry_count,
            ];
        }

        // Top region
        $topRegion = Enquiry::select('country', DB::raw('count(*) as count'))
            ->groupBy('country')
            ->orderByDesc('count')
            ->first();

        // Recent enquiries
        $recentEnquiries = Enquiry::with('items.product')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_enquiries' => $totalEnquiries,
            'enquiries_trend' => $enquiriesTrend,
            'top_product' => $topProduct,
            'top_region' => $topRegion ? $topRegion->country : null,
            'recent_enquiries' => $recentEnquiries,
            'products_count' => Product::count(),
            'categories_count' => Category::count(),
            'branches_count' => Branch::count(),
        ]);
    }
}
