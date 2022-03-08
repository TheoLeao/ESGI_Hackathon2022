<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère tous les produits
        $products = Product::all();

        // On retourne les informations des produits en JSON
        return response()->json($products);
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
            'brand' => 'string|max:100',
            'code_product' => 'string|max:100',
            'category' => 'string',
            'state' => 'string|max:100',
            'start' => 'date|max:100',
            'end' => 'date|max:100',
        ]);

        // On crée un produit
        $product = Product::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'code_product' => $request->code_product,
            'category' => $request->category,
            'state' => $request->state,
            'start' => $request->start,
            'end' => $request->end,
        ]);

        // On retourne les informations du nouveau produit en JSON
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        // On retourne les informations du produit en JSON
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        // La validation de données
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'brand' => 'string|max:100',
            'code_product' => 'string|max:100',
            'category' => 'string',
            'state' => 'string|max:100',
            'start' => 'date',
            'end' => 'date',
        ]);

        // On modifie les informations du produit
        $product->update([
            'name' => $request->name,
            'brand' => $request->brand,
            'code_product' => $request->code_product,
            'category' => $request->category,
            'state' => $request->state,
            'start' => $request->start,
            'end' => $request->end,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        // On supprime le produit
        $product->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
