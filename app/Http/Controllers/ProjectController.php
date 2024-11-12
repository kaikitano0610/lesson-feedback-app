<?php

namespace App\Http\Controllers;
use App\Models\Project;
use Illuminate\Http\Request;



class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Project::all());
    }

    //バリデーション
    protected function validateProject(Request $request)
    {
        return $request->validate([
            'project_name' => 'required|string|max:255'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $this->validateProject($request);
        $project = Project::create([
            'project_name' => $validatedData['project_name']
        ]);
        return response()->json($project,201);
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
    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);
        $validatedData = $this->validateProject($request ,$id);
        
        $project->update($validatedData);
        return response()->json($project);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $project = Project::findOrFail($id);
        $project -> delete();
        return response()->json('Project deleted successfully!',200);
    }
}
