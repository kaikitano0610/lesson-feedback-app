<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Project::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $validatedData = $request->validated();
        $project = Project::create([
            'project_name' => $validatedData['project_name'],
        ]);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $project = Project::with('groups')->findOrFail($id);

        return response()->json($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, int $id)
    {
        $project = Project::findOrFail($id);

        $project->update([
            'project_name' => $request->input('project_name'),
        ]);

        return response()->json($project);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json('Project deleted successfully!', 200);
    }
}
