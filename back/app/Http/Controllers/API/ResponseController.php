<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Response;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les réponses
        $response = Response::all();

        // On retourne les informations des réponses en JSON
        return response()->json($response);
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
            'response' => 'string|max:100',
            'question_id' => 'required'
        ]);

        // On crée un nouvelle réponse
        $response = Response::create([
            'response' => $request->response,
            'question_id' => $request->question_id
        ]);

        // On retourne les informations de la nouvelle réponse en JSON
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function show(Response $response)
    {
        // On retourne les informations de la réponse en JSON
        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Response $response)
    {
        // La validation de données
        $this->validate($request, [
            'response' => 'string|max:100',
            'question_id' => 'required'
        ]);

        // On modifie les informations de la réponser
        $category->update([
            'response' => $request->response,
            'question_id' => $request->question_id
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function destroy(Response $response)
    {
        // On supprime la réponse
        $response->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
