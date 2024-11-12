<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    // コンストラクタメソッド
    public function __construct()
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Video::all());
    }

    //バリデーションの記述
    protected function validateVideo(Request $request, int $id = null)
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'youtube_link' => 'required|url',
            'subject' => 'required|string|max:255',
            'school_type' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'pdf_path' => 'required|string|max:255'

        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $this->validateVideo($request);

        $video = Video::create([
            'title' => $validatedData['title'],
            'user_id' => auth()->id(),  
            'youtube_link' => $validatedData['youtube_link'],
            'posted_date' => now(),
            'subject' => $validatedData['subject'],
            'school_type' => $validatedData['school_type'],
            'grade' => $validatedData['grade'],
            'pdf_path' => $validatedData['pdf_path'],
        ]);

        return response()->json($video,201);
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
    public function update(Request $request, string $id)
    {
        $video = Video::findOrFail($id);
        $validatedData = $this->validateVideo($request,$id);

        $video->update([
            'title' => $validatedData['title'],
            'user_id' => auth()->id(),
            'youtube_link' => $validatedData['youtube_link'],
            // posted_dateは変更なし
            'subject' => $validatedData['subject'],
            'school_type' => $validatedData['school_type'],
            'grade' => $validatedData['grade'],
            'pdf_path' => $validatedData['pdf_path'],
        ]);
        return response()->json($video);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $video = Video::findOrFail($id);
        $video -> delete();
        return response()->json('Video deleted successfully!',200);
    }
}
