<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Property;

class PropertyController extends Controller
{

    public function index()
    {
        //
    }

    public function create(Request $request)
    {
        $data = $request->input();

        $property = Property::create([
            'name' => $data['propertyName'],
            'description' => str_replace(['"', "'"], ['\"', "\'"], $data['propertyDescription']),
            'user_id' => Auth::user()->id,
            'country' => $data['propertyCountry'],
            'city' => $data['propertyCity'],
            'address' => $data['propertyAddress'],
            'region' => $data['propertyRegion'],
            'postcode' => $data['propertyPostcode'],
            'type' => $data['propertyType'],
            'price' => $data['propertyPrice'],
            'image_path' => 'Test',
        ]);

        return response($property, 200);
    }


    public function read_all()
    {
        $properties = Property::all();

        return response($properties, 200);
    }

    public function read($id)
    {
        $property = Property::find($id);

        if ($property == null) {
            return response()->json(null, 404);
        }

        return response($property, 200);
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function test(Request $request)
    {
        $path = $request->image->storeAs('public/images', 'filename.jpg');

        return response($path);
    }

    public function delete($id)
    {
        //
    }
}
