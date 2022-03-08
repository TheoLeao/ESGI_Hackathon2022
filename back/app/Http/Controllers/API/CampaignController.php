<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les campagnes
        $campaigns = Campaign::all();

        // On retourne les informations des campagnes en JSON
        return response()->json($campaigns);
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
            'state' => 'boolean',
            'product_id' => 'required'
        ]);

        // On crée un nouvelle campagne
        $campaign = Campaign::create([
            'name' => $request->name,
            'state' => $request->state,
            'product_id' => $request->product_id
        ]);

        // On retourne les informations de la nouvelle campagne en JSON
        return response()->json($campaign, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function show(Campaign $campaign)
    {
        // On retourne les informations de la catégorie en JSON
        return response()->json($campaign);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Campaign $campaign)
    {
        // La validation de données
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'state' => 'boolean',
            'product_id' => 'required'
        ]);

        // On modifie les informations de la campagne
        $campaign->update([
            'name' => $request->name,
            'state' => $request->state,
            'product_id' => $request->product_id
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campaign $campaign)
    {
        // On supprime la campagne
        $campaign->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
