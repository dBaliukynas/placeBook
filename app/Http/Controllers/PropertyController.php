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
            'propertyName' => 'required|min:2|max:40',
            'propertyType' => 'required',
            'propertyAddress' => 'required',
            'propertyCountry' => 'required',
            'propertyCity' => 'required',
            'propertyRegion' => 'max:100',
            'propertyPostcode' => 'max:100',
            'propertyPrice' => 'required|max:10001',
            'propertyDescription' => 'required|max:10000',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

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

        return response()->json($property);
    }


    public function read_all(Request $request)
    {

        if ($request->has('search')) {

            ignore_user_abort(true);

            $search_text = $request->query('search');

            $properties = Property::where("name", "LIKE", "{$search_text}%")->get();

            return response()->json($properties);
        } else {
            $properties = Property::all();

            return response()->json($properties);
        }
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
