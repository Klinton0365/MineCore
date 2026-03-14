<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;

class BranchPublicController extends Controller
{
    public function index()
    {
        $branches = Branch::where('is_visible', true)->get();

        return response()->json($branches);
    }
}
