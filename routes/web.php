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

Route::get('/', function () {
    return view('example');
});

Route::get('/{route}', function () {
    return view('example');
});

Route::post('/api/property', '\App\Http\Controllers\PropertyController@create');
