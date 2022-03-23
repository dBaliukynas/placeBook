<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Property;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{

    public function index()
    {
        //
    }

    public function create(Request $request)
    {
        $data = $request->input();

        $validator = Validator::make($data, [
            'propertyName' => 'required|min:4|max:40',
            'propertyType' => 'required',
            'propertyAddress' => 'required',
            'propertyCountry' => 'required',
            'propertyCity' => 'required',
            'propertyRegion' => 'required|max:100',
            'propertyPostcode' => 'required|max:100',
            'propertyPrice' => 'required|max:10001',
            'propertyDescription' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

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

        return response()->json($property);
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
