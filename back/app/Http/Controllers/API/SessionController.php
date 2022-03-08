<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les sessions
        $sessions = Session::all();

        // On retourne les informations des sessions en JSON
        return response()->json($sessions);
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
            'product_id' => 'required',
            'start' => 'date',
            'end' => 'date',
        ]);

        // On crée un nouvelle session
        $session = Session::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'start' => $request->start,
            'end' => $request->end,
        ]);

        // On retourne les informations de la nouvelle session en JSON
        return response()->json($session, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function show(Session $session)
    {
        // On retourne les informations de la session en JSON
        return response()->json($session);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Session $session)
    {
        // La validation de données
        $this->validate($request, [
            'user_id' => 'required',
            'product_id' => 'required',
            'start' => 'date',
            'end' => 'date',
        ]);

        // On modifie les informations de la session
        $session->update([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'start' => $request->start,
            'end' => $request->end,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function destroy(Session $session)
    {
        // On supprime le session
        $session->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
