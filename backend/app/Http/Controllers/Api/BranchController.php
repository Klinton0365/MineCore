<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function index()
    {
        $branches = Branch::withCount('products')->get();

        return response()->json($branches);
    }

    public function show(Branch $branch)
    {
        $branch->load('products');

        return response()->json($branch);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'region_code' => 'nullable|string|max:10',
            'country' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'is_visible' => 'nullable|boolean',
            'display_logic' => 'nullable|string',
        ]);

        $branch = Branch::create($request->only([
            'name', 'region_code', 'country', 'description',
            'address', 'is_visible', 'display_logic',
        ]));

        return response()->json($branch, 201);
    }

    public function update(Request $request, Branch $branch)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'region_code' => 'nullable|string|max:10',
            'country' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'is_visible' => 'nullable|boolean',
            'display_logic' => 'nullable|string',
        ]);

        $branch->update($request->only([
            'name', 'region_code', 'country', 'description',
            'address', 'is_visible', 'display_logic',
        ]));

        return response()->json($branch);
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();

        return response()->json(['message' => 'Branch deleted.']);
    }

    public function updateStock(Request $request, Branch $branch)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'stock_status' => 'required|string',
        ]);

        $branch->products()->syncWithoutDetaching([
            $request->product_id => ['stock_status' => $request->stock_status],
        ]);

        return response()->json(['message' => 'Stock status updated.']);
    }
}
