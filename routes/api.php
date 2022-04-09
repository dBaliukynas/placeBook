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
Route::get('/property/{id}', '\App\Http\Controllers\PropertyController@read');
Route::get('/properties', '\App\Http\Controllers\PropertyController@read_all');


Route::post('/property/{id}/review', '\App\Http\Controllers\ReviewController@create');
Route::get('/property/{id}/reviews', '\App\Http\Controllers\ReviewController@read_all');

Route::post('/editor', '\App\Http\Controllers\PropertyController@test');
