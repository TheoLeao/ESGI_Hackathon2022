<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function createAccount(Request $request)
    {

        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);

        return response()->json([
            'token' => $user->createToken('tokens')->plainTextToken
        ]);
    }

    public function login(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'message' => 'Credentials not match'
            ], 401);
        }

        /** @var User $user */
        $user = auth()->user();

        return response()->json([
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function logout()
    {
        /** @var User $user */
        $user = auth()->user();
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Tokens Revoked'
        ]);
    }
}
