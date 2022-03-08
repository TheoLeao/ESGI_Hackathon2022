<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les catégories
        $categories = Category::all();

        // On retourne les informations des catégories en JSON
        return response()->json($categories);
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
        ]);

        // On crée un nouvelle catégorie
        $category = Category::create([
            'name' => $request->name,
        ]);

        // On retourne les informations de la nouvelle catégorie en JSON
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        // On retourne les informations de la catégorie en JSON
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        // La validation de données
        $this->validate($request, [
            'name' => 'required|string|max:100',
        ]);

        // On modifie les informations de la catégorie
        $category->update([
            'name' => $request->name,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        // On supprime la catégorie
        $category->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
