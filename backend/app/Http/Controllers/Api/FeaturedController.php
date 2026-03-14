<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeaturedSchedule;
use Illuminate\Http\Request;

class FeaturedController extends Controller
{
    public function index()
    {
        $schedules = FeaturedSchedule::with('product')->get();

        return response()->json($schedules);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'countdown_end' => 'nullable|date',
            'is_active' => 'nullable|boolean',
        ]);

        $schedule = FeaturedSchedule::create($request->only([
            'product_id', 'start_date', 'end_date', 'countdown_end', 'is_active',
        ]));

        return response()->json($schedule->load('product'), 201);
    }

    public function show(FeaturedSchedule $schedule)
    {
        return response()->json($schedule->load('product'));
    }

    public function update(Request $request, FeaturedSchedule $schedule)
    {
        $request->validate([
            'product_id' => 'sometimes|required|exists:products,id',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'countdown_end' => 'nullable|date',
            'is_active' => 'nullable|boolean',
        ]);

        $schedule->update($request->only([
            'product_id', 'start_date', 'end_date', 'countdown_end', 'is_active',
        ]));

        return response()->json($schedule->load('product'));
    }

    public function destroy(FeaturedSchedule $schedule)
    {
        $schedule->delete();

        return response()->json(['message' => 'Featured schedule deleted.']);
    }

    public function activeProducts()
    {
        $schedules = FeaturedSchedule::where('is_active', true)
            ->whereDate('start_date', '<=', now())
            ->whereDate('end_date', '>=', now())
            ->with(['product.images', 'product.branches'])
            ->get();

        return response()->json($schedules);
    }
}
