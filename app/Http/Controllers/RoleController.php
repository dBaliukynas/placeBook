<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{

    public function index()
    {
        //
    }

    public function create()
    {
    }


    public function read_all()
    {
        if (!Auth::check() || Auth::user()->role != "admin") {
            return response()->json(403);
        }

        $roles = Role::all();

        return response()->json($roles, 200);
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
