<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/admin/home');
});

Route::get('{any}', function () {
    return view('app');
})->where('any','.*');