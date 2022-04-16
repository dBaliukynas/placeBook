<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:web')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/property', '\App\Http\Controllers\PropertyController@create');
Route::get('/property/{property}', '\App\Http\Controllers\PropertyController@read');
Route::get('/properties', '\App\Http\Controllers\PropertyController@read_all');

Route::get('/users', '\App\Http\Controllers\UserController@read_all');
Route::get('/roles', '\App\Http\Controllers\RoleController@read_all');
Route::get('/reviews', '\App\Http\Controllers\ReviewController@read_all');


Route::post('/property/{id}/review', '\App\Http\Controllers\ReviewController@create');
Route::get('/property/{id}/reviews', '\App\Http\Controllers\ReviewController@read_property_reviews');

// Route::post('/editor', '\App\Http\Controllers\PropertyController@test');
