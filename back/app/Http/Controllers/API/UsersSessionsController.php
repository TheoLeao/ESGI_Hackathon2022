<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\UsersSessions;
use Illuminate\Http\Request;

class UsersSessionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les users sessions
        $usersSessions = UsersSessions::all();

        // On retourne les informations des users sessions en JSON
        return response()->json($usersSessions);
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
            'user_id' => 'required',
            'session_id' => 'required',
        ]);

        // On crée une nouvelle usersSessions
        $usersSessions = UsersSessions::create([
            'user_id' => $request->user_id,
            'session_id' => $request->session_id,
        ]);

        // On retourne les informations de la nouvelle usersSessions en JSON
        return response()->json($usersSessions, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UsersSessions  $usersSessions
     * @return \Illuminate\Http\Response
     */
    public function show(UsersSessions $usersSessions)
    {
        // On retourne les informations de la usersSessions en JSON
        return response()->json($usersSessions);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UsersSessions  $usersSessions
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UsersSessions $usersSessions)
    {
        // La validation de données
        $this->validate($request, [
            'user_id' => 'required',
            'session_id' => 'required',
        ]);

        // On modifie les informations de la réponse utilisateur
        $usersSessions->update([
            'user_id' => $request->user_id,
            'session_id' => $request->session_id,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UsersSessions  $usersSessions
     * @return \Illuminate\Http\Response
     */
    public function destroy(UsersSessions $usersSessions)
    {
        // On supprime la usersSessions
        $usersSessions->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
