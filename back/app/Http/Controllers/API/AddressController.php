<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // On récupère toutes les adresses
        $addresses = Address::all();

        // On retourne les informations des adresses en JSON
        return response()->json($addresses);
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
            'street' => 'string|max:100',
            'city' => 'string|max:100',
            'zipcode' => 'string|max:10',
            'country' => 'string|max:100',
            'latitude' => 'float|max:100',
            'longitude' => 'float|max:100',
        ]);

        // On crée un nouvelle adresse
        $address = Address::create([
            'street' => $request->street,
            'city' => $request->city,
            'zipcode' => $request->zipcode,
            'country' => $request->country,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        // On retourne les informations de la nouvelle adresse en JSON
        return response()->json($address, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function show(Address $address)
    {
        // On retourne les informations de l'adresse en JSON
        return response()->json($address);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        // La validation de données
        $this->validate($request, [
            'street' => 'string|max:100',
            'city' => 'string|max:100',
            'zipcode' => 'string|max:10',
            'country' => 'string|max:100',
            'latitude' => 'float|max:100',
            'longitude' => 'float|max:100',
        ]);

        // On modifie les informations de l'adresse
        $address->update([
            'street' => $request->street,
            'city' => $request->city,
            'zipcode' => $request->zipcode,
            'country' => $request->country,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        // On retourne la réponse JSON
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        // On supprime l'adresse
        $address->delete();

        // On retourne la réponse JSON
        return response()->json();
    }
}
