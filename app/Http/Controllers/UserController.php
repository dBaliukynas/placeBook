<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function index()
    {
        //
    }

    public function validate_user($data)
    {
        
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
        } else {
            return null;
        }
    }

    public function create(Request $request)
    {
        $data = $request->input();
        $validation_result = $this->validate_property($data);

        if ($validation_result) {
            return $validation_result;
        }
    }


    public function read_all()
    {
        if (!Auth::check() || Auth::user()->role != "admin") {
            return response()->json(403);
        }

        $users = User::all();

        return response()->json($users, 200);
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
