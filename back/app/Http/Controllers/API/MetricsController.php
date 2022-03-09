<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Response;
use App\Models\Session;

class MetricsController extends Controller
{
    public function getSessionMetrics(Session $session)
    {
        $countUsers = $session->userSession()->count();

        $questions = $session->questions()->get();
        $res = [];
        foreach ($questions as $question) {
            $res[$question->id] = Question::with('responses')->where('id', '=', $question->id)->first();
            foreach ($res[$question->id]['responses'] as $response) {
                /** @var Response $response */
                $total = $response->userResponses()->count();
                $response['total'] = $total;
            }
        }
        return response()->json(['totalUsers' =>  $countUsers, 'metrics' => $res]);
    }
}
