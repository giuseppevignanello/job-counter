<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TargetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


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



Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user-profile', [AuthController::class, 'userProfile'])->name('user-profile');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::middleware([EnsureFrontendRequestsAreStateful::class])->group(function () {
        Route::get('/jobs', [JobController::class, 'index']);
        Route::post('/jobs', [JobController::class, 'store']);
        Route::get('/jobs/{job}', [JobController::class, 'show']);
        Route::put('/jobs/{job}', [JobController::class, 'update']);
        Route::delete('/jobs/{job}', [JobController::class, 'delete']);
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::get('/categories/{category}', [CategoryController::class, 'show']);
        Route::get('/jobs-by-category/{category_id}', [JobController::class, "jobsByCategory"]);
        Route::get('/target', [TargetController::class, 'index']);
        Route::post('/target', [TargetController::class, 'store']);
        Route::put('/target/{target}', [TargetController::class, 'update']);
        Route::delete('target/{target}', [TargetController::class, 'delete']);
    });
});

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });