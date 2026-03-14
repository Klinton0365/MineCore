<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images', 'branches', 'countries']);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('country_code')) {
            $query->whereHas('countries', function ($q) use ($request) {
                $q->where('country_code', $request->country_code)
                  ->where('is_available', true);
            });
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->boolean('product_of_week')) {
            $query->where('is_product_of_week', true);
        }

        $products = $query->paginate(15);

        return response()->json($products);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->with(['category', 'images', 'branches', 'countries', 'featuredSchedules'])
            ->firstOrFail();

        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'specifications' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'is_product_of_week' => 'nullable|boolean',
            'featured_badge' => 'nullable|string|max:100',
            'is_active' => 'nullable|boolean',
            'branch_ids' => 'nullable|array',
            'branch_ids.*.branch_id' => 'required_with:branch_ids|exists:branches,id',
            'branch_ids.*.stock_status' => 'required_with:branch_ids|string',
            'country_codes' => 'nullable|array',
            'country_codes.*.country_code' => 'required_with:country_codes|string',
            'country_codes.*.country_name' => 'required_with:country_codes|string',
        ]);

        $data = $request->only([
            'name', 'category_id', 'description', 'specifications',
            'is_featured', 'is_product_of_week', 'featured_badge', 'is_active',
        ]);
        $data['slug'] = Str::slug($request->name);

        $product = Product::create($data);

        if ($request->filled('branch_ids')) {
            $branches = collect($request->branch_ids)->mapWithKeys(function ($item) {
                return [$item['branch_id'] => ['stock_status' => $item['stock_status']]];
            });
            $product->branches()->sync($branches);
        }

        if ($request->filled('country_codes')) {
            foreach ($request->country_codes as $country) {
                $product->countries()->create([
                    'country_code' => $country['country_code'],
                    'country_name' => $country['country_name'],
                    'is_available' => $country['is_available'] ?? true,
                ]);
            }
        }

        return response()->json($product->load(['category', 'images', 'branches', 'countries']), 201);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'description' => 'nullable|string',
            'specifications' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'is_product_of_week' => 'nullable|boolean',
            'featured_badge' => 'nullable|string|max:100',
            'is_active' => 'nullable|boolean',
            'branch_ids' => 'nullable|array',
            'branch_ids.*.branch_id' => 'required_with:branch_ids|exists:branches,id',
            'branch_ids.*.stock_status' => 'required_with:branch_ids|string',
            'country_codes' => 'nullable|array',
            'country_codes.*.country_code' => 'required_with:country_codes|string',
            'country_codes.*.country_name' => 'required_with:country_codes|string',
        ]);

        $data = $request->only([
            'name', 'category_id', 'description', 'specifications',
            'is_featured', 'is_product_of_week', 'featured_badge', 'is_active',
        ]);

        if ($request->has('name')) {
            $data['slug'] = Str::slug($request->name);
        }

        $product->update($data);

        if ($request->has('branch_ids')) {
            $branches = collect($request->branch_ids)->mapWithKeys(function ($item) {
                return [$item['branch_id'] => ['stock_status' => $item['stock_status']]];
            });
            $product->branches()->sync($branches);
        }

        if ($request->has('country_codes')) {
            $product->countries()->delete();
            foreach ($request->country_codes as $country) {
                $product->countries()->create([
                    'country_code' => $country['country_code'],
                    'country_name' => $country['country_name'],
                    'is_available' => $country['is_available'] ?? true,
                ]);
            }
        }

        return response()->json($product->load(['category', 'images', 'branches', 'countries']));
    }

    public function destroy(Product $product)
    {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted.']);
    }

    public function uploadImages(Request $request, Product $product)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|max:5120',
        ]);

        $uploaded = [];

        try {
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('products', 'public');
                $uploaded[] = $product->images()->create([
                    'image_path' => $path,
                    'display_order' => $product->images()->count() + $index,
                    'is_primary' => $product->images()->count() === 0 && $index === 0,
                ]);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to upload images.'], 500);
        }

        return response()->json($uploaded, 201);
    }

    public function deleteImage(Product $product, ProductImage $image)
    {
        if ($image->product_id !== $product->id) {
            return response()->json(['message' => 'Image does not belong to this product.'], 404);
        }

        try {
            Storage::disk('public')->delete($image->image_path);
        } catch (\Exception $e) {
            // Continue with DB deletion even if file removal fails
        }

        $image->delete();

        return response()->json(['message' => 'Image deleted.']);
    }

    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:1',
        ]);

        $products = Product::where('name', 'like', "%{$request->q}%")
            ->orWhere('description', 'like', "%{$request->q}%")
            ->with('category')
            ->limit(10)
            ->get(['id', 'name', 'slug', 'category_id']);

        return response()->json($products);
    }
}
