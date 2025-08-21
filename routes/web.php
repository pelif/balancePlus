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
    Route::get('/{dataInicial?}/{dataFinal?}', [AccountsController::class, 'index'])->name('receitas.index');
    Route::post('/', [AccountsController::class, 'store'])->name('receitas.store');
    Route::put('/{id}', [AccountsController::class, 'update'])->name('receitas.update');
    Route::delete('/{id}', [AccountsController::class, 'destroy'])->name('receitas.destroy');
});

Route::group(['prefix' => 'despesas', 'middleware' => 'auth'], function () {
    Route::get('/{dataInicial?}/{dataFinal?}', [AccountsController::class, 'index'])->name('despesas.index');
    Route::post('/', [AccountsController::class, 'store'])->name('despesas.store');
    Route::put('/{id}', [AccountsController::class, 'update'])->name('despesas.update');
    Route::delete('/{id}', [AccountsController::class, 'destroy'])->name('despesas.destroy');
});

Route::get('/welcome', function () {
    return abort(404);
});
