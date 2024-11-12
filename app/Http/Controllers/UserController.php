<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // コンストラクタメソッド
    public function __construct()
    {
        // // authミドルウェアを適用
        // $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::all());
    }

    //バリデーションの記述
    protected function validateUser(Request $request, int $id = null)
    {
        return $request->validate([
            'name' => 'required|string|max:225',
            'email' => 'required|email|unique:users,email' .($id ? ','.$id : '') ,
            'password' => $id ? 'nullable|string|min:8' :'required|string|min:8',
            'role' => 'required|string'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $this->validateUser($request);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'role' => $validatedData['role'],
        ]);

        return response()->json($user,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $user = User::findOrFail($id);
        $validatedData = $this->validateUser($request,$id);

        if(filled($validatedData['password'])){
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        $user->update($validatedData);
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $user = User::findOrFail($id);
        $user -> delete();
        return response()->json('User deleted successfully!',200);
    }
}
