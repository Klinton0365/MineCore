<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        if ($request->boolean('all')) {
            $categories = Category::orderBy('display_order')->get();
            return response()->json($categories);
        }

        $categories = Category::whereNull('parent_id')
            ->with('children')
            ->orderBy('display_order')
            ->get();

        return response()->json($categories);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->with(['children', 'products.images'])
            ->firstOrFail();

        return response()->json($category);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $data = $request->only(['name', 'parent_id', 'description', 'display_order', 'is_active']);
        $data['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            try {
                $data['image'] = $request->file('image')->store('categories', 'public');
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to upload image.'], 500);
            }
        }

        $category = Category::create($data);

        return response()->json($category, 201);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $data = $request->only(['name', 'parent_id', 'description', 'display_order', 'is_active']);

        if ($request->has('name')) {
            $data['slug'] = Str::slug($request->name);
        }

        if ($request->hasFile('image')) {
            try {
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }
                $data['image'] = $request->file('image')->store('categories', 'public');
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to upload image.'], 500);
            }
        }

        $category->update($data);

        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted.'], 200);
    }
}
