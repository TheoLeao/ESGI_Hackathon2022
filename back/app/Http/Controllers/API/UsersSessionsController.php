<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\UserSession;
use Illuminate\Http\Request;

class UserSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les users sessions
        $userSession = UserSession::all();

        // On retourne les informations des users sessions en JSON
        return response()->json($userSession);
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

        // On crée une nouvelle userSession
        $userSession = UserSession::create([
            'user_id' => $request->user_id,
            'session_id' => $request->session_id,
        ]);

        // On retourne les informations de la nouvelle userSession en JSON
        return response()->json($userSession, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserSession  $userSession
     * @return \Illuminate\Http\Response
     */
    public function show(UserSession $userSession)
    {
        // On retourne les informations de la userSession en JSON
        return response()->json($userSession);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserSession  $userSession
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserSession $userSession)
    {
        // La validation de données
        $this->validate($request, [
            'user_id' => 'required',
            'session_id' => 'required',
        ]);

        // On modifie les informations de la réponse utilisateur
        $userSession->update([
            'user_id' => $request->user_id,
            'session_id' => $request->session_id,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserSession  $userSession
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserSession $userSession)
    {
        // On supprime la userSession
        $userSession->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
