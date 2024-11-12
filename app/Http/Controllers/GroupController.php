<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

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

    // バリデーション
    protected function validateGroup(Request $request, int $id = null)
    {
        return $request->validate([
            'group_name' => 'required|string|max:255',
            'project_id' => 'required|integer|exists:projects,id',
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $this->validateGroup($request);

        $group = Group::create([
            'group_name' => $validatedData['group_name'],
            'project_id' => $validatedData['project_id']
        ]);

        return response()->json($group->load('project'),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $group = Group::with(['users:id,name,email', 'project:id,project_name'])->findOrFail($id);
        return response()->json($group);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $group = Group::findOrFail($id);
        $validatedData = $this->validateGroup($request,$id);

        $group->update($validatedData);
        return response()->json($group);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $group = Group::findOrFail($id);
        $group->delete();
        return response()->json('Group deleted successfully!',200);
    }
}
