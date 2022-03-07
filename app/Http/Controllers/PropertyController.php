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
            'user_id' => Auth::user()->id,
            'description' => str_replace(['"', "'"], ['\"', "\'"], $data['propertyDescription']),
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
