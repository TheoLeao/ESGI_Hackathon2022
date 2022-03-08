<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les réponses utilisateurs
        $answers = Answer::all();

        // On retourne les informations des réponses utilisateurs en JSON
        return response()->json($answers);
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
            'response_id' => 'required',
            'question_id' => 'required',
            'user_id' => 'required',
        ]);

        // On crée un nouvelle réponse utilisateur
        $answer = Answer::create([
            'response_id' => $request->response_id,
            'question_id' => $request->question_id,
            'user_id' => $request->user_id,
        ]);

        // On retourne les informations de la nouvelle réponse utilisateur en JSON
        return response()->json($answer, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function show(Answer $answer)
    {
        // On retourne les informations de la réponse utilisateur en JSON
        return response()->json($answer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Answer $answer)
    {
        // La validation de données
        $this->validate($request, [
            'response_id' => 'required',
            'question_id' => 'required',
            'user_id' => 'required',
        ]);

        // On modifie les informations de la réponse utilisateur
        $user->update([
            'response_id' => $request->response_id,
            'question_id' => $request->question_id,
            'user_id' => $request->user_id,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Answer  $answer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Answer $answer)
    {
        // On supprime la réponse utilisateur
        $answer->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
