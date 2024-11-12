<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate(['video_id' => 'required|exists:videos,id']);
        $videoId = $request->query('video_id');
        $comments = Comment::where('video_id',$videoId)->get();
        return response()->json($comments);

    }

    //バリデーション
    protected function validateComment(Request $request, int $id = null)
    {
        return $request->validate([
            'video_id' => 'required|exists:videos,id',
            'time' => 'required',
            'evaluation' => 'required|in:good,improvement',
            'feedback_category' => 'required|in:speech/communication,board/materials,activity/development',
            'comment_content' => 'required|string|max:140',
            'x_coordinate' => 'required|numeric',
            'y_coordinate' => 'required|numeric',
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        $validatedData = $this->validateComment($request);

        $comment = Comment::create([
            'video_id' => $validatedData['video_id'],
            'user_id' => auth()->id(),
            'time' => $validatedData['time'],
            'evaluation' => $validatedData['evaluation'],
            'feedback_category' => $validatedData['feedback_category'],
            'comment_content' => $validatedData['comment_content'],
            'x_coordinate' => $validatedData['x_coordinate'],
            'y_coordinate' => $validatedData['y_coordinate'],
        ]);
        return response()->json($comment,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::findOrFail($id);
        return response()->json($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comment = Comment::findorFail($id);
        $validatedData = $this->validateComment($request,$id);

        if ($comment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->update([
            'time' => $validatedData['time'],
            'evaluation' => $validatedData['evaluation'],
            'feedback_category' => $validatedData['feedback_category'],
            'comment_content' => $validatedData['comment_content'],
            'x_coordinate' => $validatedData['x_coordinate'],
            'y_coordinate' => $validatedData['y_coordinate'],
        ]);
        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment -> delete();
        return response()->json('Comment deleted successfully!',200);
    }
}
