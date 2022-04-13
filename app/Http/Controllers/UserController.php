<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        //
    }

    public function create(Request $request)
    {
    }


    public function read_all()
    {
        $users = User::all();
        if (Auth::user()->role != "admin") {
            return response()->json(403);
        }
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
