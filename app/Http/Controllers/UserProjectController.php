<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProjectController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        //ログインしてるユーザーが所属しているグループをプロジェクトと一緒に取得
        $groups = $user->groups()->with('project')->get();
        //上記で取得したものを、projectだけのデータにして、同じidのプロジェクトを削除し、連番になおす
        $projects = $groups->pluck('project')->unique('id')->values();

        return response()->json($projects);
    }
}
