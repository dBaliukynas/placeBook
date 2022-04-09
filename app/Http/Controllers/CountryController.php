<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class CountryController extends Controller
{
    public function read_all(Request $request)
    {
        ignore_user_abort(true);

        // $search_text = $request->query('search');

        // $properties = Property::where("name", "LIKE", "{$search_text}%")->get();
        $file = Storage::disk('local')->get('data/cities.json');

        $countries = json_decode($file);
        
        return response()->json($countries);
    }
}
