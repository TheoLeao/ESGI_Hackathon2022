<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Product;
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
        $res = [];
        foreach (Campaign::all() as $campaign) {
            $product = $campaign->product()->get();
            $sessions = $campaign->sessions()->get();
            $res['id-' . $campaign->id] = $campaign->id;
            $res['name-' . $campaign->id] = $campaign->name;
            $res['description-' . $campaign->id] = $campaign->description;
            $res['product-' . $campaign->id] = $product;
            $res['sessions-' . $campaign->id] = $sessions;
        }

        return response()->json($res);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $product = Product::create([
            'name' => $request->product_name,
            'brand' => $request->product_brand,
            'code_product' => $request->product_code,
            'category' => $request->product_category,
            'picture' => $request->product_picture,
            'description' => $request->product_description
        ]);

        // On crée un nouvelle campagne
        $campaign = Campaign::create([
            'name' => $request->name,
            'state' => $request->state,
            'description' => $request->description,
            'product_id' => $product->id,
        ]);

        // On retourne les informations de la nouvelle campagne en JSON
        return $this->show($campaign);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function show(Campaign $campaign)
    {
        $product = $campaign->product()->get();
        $sessions = $campaign->sessions()->get();
        $res = [];
        $res['id'] = $campaign->id;
        $res['name'] = $campaign->name;
        $res['description'] = $campaign->description;
        $res['product'] = $product;
        $res['sessions'] = $sessions;
        return response()->json($res);
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
