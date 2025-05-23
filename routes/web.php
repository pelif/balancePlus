<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


Route::get('/login', [AuthController::class, 'index'])->name('login.index');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('auth');

Route::group(['prefix' => 'receitas', 'middleware' => 'auth'], function () {
    Route::get('/', [AccountsController::class, 'index'])->name('receitas');
    Route::post('/', [AccountsController::class, 'store'])->name('store');
    Route::put('/{id}', [AccountsController::class, 'update'])->name('update');
});

Route::group(['prefix' => 'despesas', 'middleware' => 'auth'], function () {
    Route::get('/', [AccountsController::class, 'index'])->name('despesas');
    Route::post('/', [AccountsController::class, 'store'])->name('store');
    Route::put('/{id}', [AccountsController::class, 'update'])->name('update');
});

Route::get('/welcome', function () {
    return abort(404);
});
