<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Review;
use App\Http\Requests\ReviewPostRequest;

class ReviewController extends Controller
{

    public function index()
    {
        //
    }

    public function create(ReviewPostRequest $request, $property_id)
    {

        $data = $request->validated();

        $review = Review::create([
            'author_id' => Auth::user()->id,
            'property_id' => $property_id,
            'rating' =>  $data['selectedRating'],
            'description' => str_replace(['"', "'"], ['\"', "\'"], $data['reviewDescription']),
        ]);

        $property = Property::find($property_id);
        $property->rating = ($property->rating * (float)$property->review_count + $data['selectedRating']) / (float)($property->review_count + 1);
        $property->review_count += 1;
        $property->save();

        return response()->json($review);
    }

    public function read_all(Request $request)
    {
        if ($request->query('sort') == "new") {
            $reviews = Review::latest("created_at")->with('user')->get();
        } else {
            $reviews = Review::all();
        }

        return response()->json($reviews, 200);
    }

    public function read_property_reviews($property_id)
    {
        $reviews = Review::where('property_id', $property_id)->with('user')->latest("updated_at")->get();
        return response($reviews, 200);
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function delete($id)
    {
        //
    }
}
