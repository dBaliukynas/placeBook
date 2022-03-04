<?php

namespace App\Http\Controllers;

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
            'description' => $data['propertyDescription'],
            'image_path' => 'Test',
        ]);
        return response($property, 200);
    }


    public function read()
    {
        $properties = Property::all();


        return response($properties, 200);
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
