<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Http\Requests\PropertyPostRequest;

class PropertyController extends Controller
{

    public function index()
    {
        //
    }

    public function create(PropertyPostRequest $request)
    {
        $data = $request->validated();

        $property = Property::create([
            'name' => $data['propertyName'],
            'description' => str_replace(['"', "'"], ['\"', "\'"], $data['propertyDescription']),
            'author_id' => Auth::user()->id,
            'country' => $data['propertyCountry'],
            'city' => $data['propertyCity'],
            'address' => $data['propertyAddress'],
            'region' => $data['propertyRegion'],
            'postcode' => $data['propertyPostcode'],
            'type' => $data['propertyType'],
            'price' => $data['propertyPrice'],
            'image_path' => 'Test',
        ]);

        return response()->json($property, 200);
    }


    public function read_all(Request $request)
    {

        if ($request->has('search')) {
            ignore_user_abort(true);

            $search_text = $request->query('search');

            $properties = Property::where("name", "LIKE", "{$search_text}%")->get();
        } else if ($request->has('sort')) {
            if ($request->query('sort') == "new") {
                $properties = Property::latest("created_at")->get();
            } else if ($request->query('sort') == "favorite") {
                $properties = Property::orderBy("rating", "desc")->get();
            }
        } else {
            $properties = Property::all();
        }
        return response()->json($properties, 200);
    }

    public function read(Property $property)
    {
        if ($property == null) {
            return response()->json(null, 404);
        }

        return response($property, 200);
    }

    public function update(Request $request, Property $property)
    {
        $data = $request->input();
        $validation_result = $this->validate_property($data);

        if ($validation_result) {
            return $validation_result;
        }

        $property->name =  $data['propertyName'];
        $property->description = str_replace(['"', "'"], ['\"', "\'"], $data['propertyDescription']);
        $property->author_id =  Auth::user()->id;
        $property->country =  $data['propertyCountry'];
        $property->city =  $data['propertyCity'];
        $property->address = $data['propertyAddress'];
        $property->region = $data['propertyRegion'];
        $property->postcode = $data['propertyPostcode'];
        $property->type = $data['propertyType'];
        $property->price =  $data['propertyPrice'];
        $property->image_path = 'Test';

        $property->save();


        return response()->json($property);
    }

    // public function test(Request $request)
    // {
    //     $path = $request->image->storeAs('public/images', 'filename.jpg');

    //     return response($path);
    // }

    public function delete(Property $property)
    {
        if (Auth::user()->role == "admin" || Auth::user()->id == $property->author_id) {
            $property->reviews()->delete();
            $property->delete();
            return response()->json($property, 200);
        }
        return response()->json(403);
    }
}
