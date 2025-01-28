<?php

use App\Http\Controllers\AccountsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


Route::get('/', [HomeController::class, 'index'])->name('home');

Route::group(['prefix' => 'receitas'], function () {
    Route::get('/', [AccountsController::class, 'index'])->name('receitas');
    Route::post('/', [AccountsController::class, 'store'])->name('store');
    Route::put('/{id}', [AccountsController::class, 'update'])->name('update');
});

Route::group(['prefix' => 'despesas'], function () {
    Route::get('/', [AccountsController::class, 'index'])->name('despesas');
    Route::post('/', [AccountsController::class, 'store'])->name('store');
    Route::put('/{id}', [AccountsController::class, 'update'])->name('update');
});

Route::get('/welcome', function () {
    return view('welcome');
});
