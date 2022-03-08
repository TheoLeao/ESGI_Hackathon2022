<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère tous les utilisateurs
        $users = User::all();

        // On retourne les informations des utilisateurs en JSON
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // La validation de données
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'email' => 'string',
            'password' => 'string',
            'phone' => 'string',
            'age' => 'int',
            'size' => 'int',
            'weight' => 'float',
            'address_id' => 'required'
        ]);

        // On crée un nouvel user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'phone' => $request->phone,
            'age' => $request->age,
            'size' => $request->size,
            'weight' => $request->weight,
            'address_id' => $request->address_id,
        ]);

        // On retourne les informations de la nouvelle catégorie en JSON
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        // On retourne les informations de l'utilisateur en JSON
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // La validation de données
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'email' => 'string',
            'password' => 'string',
            'phone' => 'string',
            'age' => 'int',
            'size' => 'int',
            'weight' => 'float',
            'address_id' => 'required'
        ]);

        // On modifie les informations du user
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'phone' => $request->phone,
            'age' => $request->age,
            'size' => $request->size,
            'weight' => $request->weight,
            'address_id' => $request->address_id,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }
}
