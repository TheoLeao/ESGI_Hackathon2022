<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function createAccount(Request $request)
    {

        $attr = $request->validate([
            'street' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'zipcode' => 'required|string|max:10',
            'country' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'required|string',
            'birth' => 'required|date',
            'size' => 'required|integer',
            'weight' => 'required',
        ]);

        $address = Address::create([
            'street' => $attr['street'],
            'city' => $attr['city'],
            'zipcode' => $attr['zipcode'],
            'country' => $attr['country'],
            'latitude' => $attr['latitude'],
            'longitude' => $attr['longitude'],
        ]);

        /** @var User $user */
        $user = User::create([
            'name' => $attr['name'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email'],
            'phone' => $attr['phone'],
            'birth' => $attr['birth'],
            'size' => $attr['size'],
            'weight' => $attr['weight'],
            'role' => 'tester',
        ]);

        $user->address()->associate($address);
        $user->save();

        return response()->json([
            'token' => $user->createToken('tokens')->plainTextToken,
            'role' => $user->role
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
            'token' => $user->createToken('API Token')->plainTextToken,
            'role' => $user->role
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
