<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Http\Requests\RolePostRequest;
use App\Http\Requests\RolePutRequest;

class RoleController extends Controller
{

    public function index()
    {
        //
    }

    public function create(RolePostRequest $request)
    {
        $data = $request->validated();

        $role = Role::create([
            'name' => $data['name'],
        ]);
        return response()->json($role, 200);
    }


    public function read_all()
    {
        if (!Auth::check() || Auth::user()->role != "admin") {
            return response()->json(403);
        }

        $roles = Role::all();

        return response()->json($roles, 200);
    }

    public function update(RolePutRequest $request)
    {
        $data = $request->validated();

        foreach ($data['roles'] as &$edited_role_values) {
            $role = Role::find($edited_role_values['id']);
            $role->name = $edited_role_values['name'];
            $role->save();
        }
        return response()->json($data, 200);
    }

    public function delete(Role $role)
    {
        if (Auth::user()->role == "admin") {
            $role->delete();
            return response()->json($role, 200);
        }
        return response()->json(403);
    }

    public function delete_roles(Request $request)
    {
        $data = $request->input();

        foreach ($data['roleIds'] as &$role_id) {
            $role = Role::find($role_id);
            $role->delete();
        }
        return response()->json($data, 200);
    }
}
