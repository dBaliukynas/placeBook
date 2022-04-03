<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Review;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{

    public function index()
    {
        //
    }

    public function create(Request $request, $property_id)
    {
        $data = $request->input();

        $validator = Validator::make($data, [
            'selectedRating' => 'required|min:1|max:10',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

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


    public function read_all()
    {
    }

    public function read($id)
    {
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
