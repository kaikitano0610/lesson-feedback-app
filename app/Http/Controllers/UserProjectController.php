<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class UserProjectController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        //ログインしてるユーザーが所属している全グループの中からプロジェクトidのみを抽出
        $projectIds = $user->groups()->pluck('project_id')->unique()->toArray();
        //上記で取得したものプロジェクトIDを検索してとってくる
        $projects = Project::whereIn('id', $projectIds)->paginate(10);

        return response()->json($projects);
    }
}
