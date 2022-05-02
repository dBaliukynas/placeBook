<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UserPutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (Auth::user()->role == "admin") {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'users.*.id' => 'required',
            'users.*.name' => 'required|min:1|max:100',
            'users.*.email' => 'required|unique:users|email:rfc,dns',
            'users.*.role' => 'required|exists:roles,name',
        ];
    }
}
