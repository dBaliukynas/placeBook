<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserPostRequest;

class UserController extends Controller
{

    public function index()
    {
        //
    }

    public function create(UserPostRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' =>  $data['email'],
            'role' => $data['role'],
            'password' =>  Hash::make('123'),
        ]);
        return response()->json($user, 200);
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
