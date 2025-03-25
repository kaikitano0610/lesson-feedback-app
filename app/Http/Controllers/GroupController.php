<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Models\Group;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Group::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GroupRequest $request)
    {
        $group = Group::create([
            'group_name' => $request->input('group_name'),
            'project_id' => $request->input('project_id'),
        ]);

        return response()->json($group->load('project'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $group = Group::with(['users:id,name,email', 'project:id,project_name', 'videos'])->findOrFail($id);

        return response()->json($group);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GroupRequest $request, int $id)
    {
        $group = Group::findOrFail($id);

        $group->update([
            'group_name' => $request->input('group_name'),
            'project_id' => $request->input('project_id'),
        ]);

        return response()->json($group);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return response()->json('Group deleted successfully!', 200);
    }
}
