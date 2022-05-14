<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class PropertyPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (Auth::check()) {
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
            'propertyName' => 'required|min:2|max:40',
            'propertyType' => 'required',
            'propertyAddress' => 'required|max:100',
            'propertyCountry' => 'required|max:100',
            'propertyCity' => 'required|max:100',
            'propertyRegion' => 'nullable|max:100',
            'propertyPostcode' => 'nullable|max:100',
            'propertyPrice' => 'required|max:10001',
            'propertyDescription' => 'required|max:10000',
            'propertyImage' => 'image|nullable|mimes:jpg,jpeg,png|max:4096'

        ];
    }
}
