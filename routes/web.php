<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('/logout', '\App\Http\Controllers\Auth\LogoutController@logout');

Route::get('/{route}', function () {

    return view('example');
})->where('route', '^(?!api).*');

Route::post('/api/property', '\App\Http\Controllers\PropertyController@create');
Route::get('/api/property/{id}', '\App\Http\Controllers\PropertyController@read');
Route::get('/api/properties', '\App\Http\Controllers\PropertyController@read_all');

Route::post('/api/editor', '\App\Http\Controllers\PropertyController@test');
