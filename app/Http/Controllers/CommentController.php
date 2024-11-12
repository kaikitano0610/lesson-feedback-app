<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $videoId = $request->query('video_id');
        $comments = Comment::where('video_id',$videoId)->get();
        return response()->json($comments);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request)
    {
        $comment = Comment::create([
            'video_id' => $request->input('video_id'),
            'user_id' => auth()->id(),
            'time' => $request->input('time'),
            'evaluation' => $request->input('evaluation'),
            'feedback_category' => $request->input('feedback_category'),
            'comment_content' => $request->input('comment_content'),
            'x_coordinate' => $request->input('x_coordinate'),
            'y_coordinate' => $request->input('y_coordinate'),
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
    public function update(CommentRequest $request, string $id)
    {
        $comment = Comment::findOrFail($id);

        $this->authorize('update', $comment);

        $comment->update([
            'time' => $request->input('time'),
            'evaluation' => $request->input('evaluation'),
            'feedback_category' => $request->input('feedback_category'),
            'comment_content' => $request->input('comment_content'),
            'x_coordinate' => $request->input('x_coordinate'),
            'y_coordinate' => $request->input('y_coordinate'),
        ]);
        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);

        $this->authorize('delete', $comment);

        $comment->delete();
        return response()->json('Comment deleted successfully!',200);
    }
}
