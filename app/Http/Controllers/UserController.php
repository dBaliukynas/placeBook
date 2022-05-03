<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserPostRequest;
use App\Http\Requests\UserPutRequest;

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

    public function update(UserPutRequest $request)
    {
        $data = $request->validated();

        foreach ($data['users'] as &$edited_user_values) {
            $user = User::find($edited_user_values['id']);
            $user->role = $edited_user_values['role'];
            $user->name = $edited_user_values['name'];
            $user->email = $edited_user_values['email'];
            $user->save();
        }
        return response()->json($data, 200);
    }

    public function delete(User $user)
    {

        if (Auth::user()->role == "admin") {
            $user->delete();
            return response()->json($user, 200);
        }
        return response()->json(403);
    }

    public function delete_users(Request $request)
    {
        $data = $request->input();

        foreach ($data['userIds'] as &$user_id) {
            $user = User::find($user_id);
            $user->delete();
        }
        return response()->json($data, 200);
    }
}
