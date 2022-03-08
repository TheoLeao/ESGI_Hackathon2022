<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les questions
        $questions = Question::all();

        // On retourne les informations des questions en JSON
        return response()->json($questions);
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
            'question' => 'required|string|max:100',
            'product_id' => 'required'
        ]);

        // On crée un nouvelle question
        $question = Question::create([
            'name' => $request->name,
            'product_id' => $request->product_id
        ]);

        // On retourne les informations de la nouvelle question en JSON
        return response()->json($question, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        // On retourne les informations de la question en JSON
        return response()->json($question);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        // La validation de données
        $this->validate($request, [
            'question' => 'required|string|max:100',
            'product_id' => 'required'
        ]);

        // On modifie les informations de la question
        $question->update([
            'name' => $request->name,
            'product_id' => $request->product_id
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        // On supprime la question
        $question->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
