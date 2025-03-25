<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserGroupController;
use App\Http\Controllers\UserProjectController;
use App\Http\Controllers\VideoController;

Route::post('login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('videos', VideoController::class);
    Route::get('/groups/{group_id}/videos', [VideoController::class, 'indexByGroup']);
    Route::apiResource('comments', CommentController::class);
    Route::apiResource('groups', GroupController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::get('user-groups/{group_id}', [UserGroupController::class, 'show']);
    Route::post('user-groups', [UserGroupController::class, 'store']);
    Route::post('user-groups/delete', [UserGroupController::class, 'destroy']);
    Route::get('user-projects', [UserProjectController::class, 'index']);
    // Route::post('logout', [LoginController::class, 'logout']);
});
