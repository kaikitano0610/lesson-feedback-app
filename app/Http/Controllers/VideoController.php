<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoRequest;
use App\Models\Video;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexByGroup(int $group_id)
    {
        $videos = Video::where('group_id', $group_id)->get();

        return response()->json($videos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VideoRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = auth()->id();
        $validatedData['posted_date'] = now();

        $video = Video::create($validatedData);

        return response()->json($video, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $video = Video::findOrFail($id);

        return response()->json($video);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VideoRequest $request, string $id)
    {
        $video = Video::findOrFail($id);
        $validatedData = $request->validated();

        $video->update($validatedData);

        return response()->json($video);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $video = Video::findOrFail($id);
        $video->delete();

        return response()->json('Video deleted successfully!', 200);
    }
}
