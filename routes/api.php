<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserGroupController;

Route::apiResource('users', UserController::class);
Route::apiResource('videos', VideoController::class);
Route::apiResource('comments', CommentController::class);
Route::apiResource('groups', GroupController::class);
Route::apiResource('projects', ProjectController::class);
Route::get('user-groups/{group_id}', [UserGroupController::class, 'show']);
Route::post('user-groups', [UserGroupController::class, 'store']);
Route::post('user-groups/delete', [UserGroupController::class, 'destroy']);



