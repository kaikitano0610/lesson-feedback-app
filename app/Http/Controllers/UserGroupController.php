<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserGroup;
use App\Models\Group;


class UserGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function show(int $groupId)
    {
        $group = Group::with('users')->find($groupId);
        return response()->json($group);
    }

    public function validateUserGroup(Request $request)
    {
        return $request->validate([
            'user_id' => 'required|exists:users,id',
            'group_id' => 'required|exists:groups,id',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $this->validateUserGroup($request);

        $user_group = UserGroup::create([
            'user_id' => $validateData['user_id'],
            'group_id' => $validateData['group_id']
        ]);

        return response()->json($user_group,201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validatedData = $this->validateUserGroup($request);

        $userId = $validatedData['user_id'];
        $groupId = $validatedData['group_id'];

        // Groupモデルからリレーションを使用してデータを削除
        $group = Group::find($groupId);

        if (!$group) {
            return response()->json(['message' => 'Group not found'], 404);
        }

        // リレーションからユーザーを削除
        $deleted = $group->users()->detach($userId);

        if ($deleted) {
            return response()->json(['message' => 'User removed from group successfully'], 200);
        } else {
            return response()->json(['message' => 'Relation not found or already removed'], 404);
        }
    }

}
