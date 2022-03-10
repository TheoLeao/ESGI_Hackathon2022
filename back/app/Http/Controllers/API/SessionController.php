<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CampaignRequest;
use App\Models\Session;
use App\Models\User;
use App\Models\UserSession;
use Illuminate\Database\QueryException;
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
        // On crée un nouvelle session
        $session = Session::create([
            'name' => $request->name,
            'description' => $request->description,
            'campaign_id' => $request->campaign_id,
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
        // On modifie les informations de la session
        $session->update([
            'name' => $request->name,
            'description' => $request->description,
            'campaign_id' => $request->campaign_id,
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

    public function getSessionsWithUsers()
    {
        $res = [];
        foreach (Session::all() as $session) {
            $campaign = $session->campaign()->first();
            $usersSessions = $session->userSession()->get();

            $res['id-' . $session->id] = $session->id;
            $res['campaign-' . $session->id] = $campaign->id;
            $res['name-' . $session->id] = $session->name;
            $res['description-' . $session->id] = $session->description;

            foreach ($usersSessions as $userSession) {
                if ($userSession->session_id == $session->id) {
                    foreach (User::all() as $user) {
                        if ($userSession->user_id == $user->id) {
                            $res['users-' . $session->id]['user-' . $user->id] = $user;
                        }
                    }
                }
            }
        }
        return response()->json($res);
    }

    public function getSessionsWithUsersById(Session $session)
    {
        $res = [];
        $campaign = $session->campaign()->first();
        $usersSessions = $session->userSession()->get();

        $res['id'] = $session->id;
        $res['campaign'] = $campaign->id;
        $res['name'] = $session->name;
        $res['description'] = $session->description;

        foreach ($usersSessions as $userSession) {
            if ($userSession->session_id == $session->id) {
                foreach (User::all() as $user) {
                    if ($userSession->user_id == $user->id) {
                        $res['users']['user-' . $user->id] = $user;
                    }
                }
            }
        }

        return response()->json($res);
    }

    public function acceptUser(Request $request, Session $session)
    {
        $attr = $request->validate([
            'user_id' => 'required',
        ]);

        $userSession = new UserSession();
        $userSession->session()->associate($session);
        $userSession->user()->associate(User::find($attr['user_id']));
        try {
            $userSession->save();
            $campaignRequest = CampaignRequest::where('campaign_id', $session->campaign()->first()->id)->where('user_id', $attr['user_id'])->first();
            $campaignRequest->delete();
        } catch (QueryException $e) {
            $userSession = UserSession::where('user_id', $attr['user_id'])->where('session_id', $session->id)->first();
            return response()->json(array('userSession' => $userSession, 'alreadyExist' => true));
        }

        return response()->json($userSession);
    }
}
