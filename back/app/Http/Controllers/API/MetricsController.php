<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Response;
use App\Models\Session;
use PDF;

class MetricsController extends Controller
{
    public function getSessionMetrics(Session $session)
    {
        return response()->json($this->retrieveSessionMetrics($session));
    }

    public function exportSessionMetrics(Session $session)
    {
        $data = $this->retrieveSessionMetrics($session);

        $questions = array();

        foreach ($data['metrics'] as $key => $value) {
            $questions[$value->question] = array();

            foreach ($value['responses'] as $rep) {
                $questions[$value->question]['responses'][] = $rep->response;
                $questions[$value->question]['values'][] = $rep->total;
            }
            $questions[$value->question]['responses'] = json_encode($questions[$value->question]['responses']);
            $questions[$value->question]['values'] = json_encode($questions[$value->question]['values']);
        }
        view()->share('data', $data);
        view()->share('questions', $questions);
        $pdf = PDF::loadView('pdf_view', $data);
        return $pdf->download('pdf_file.pdf');
    }

    private function retrieveSessionMetrics(Session $session)
    {
        $countUsers = $session->userSessions()->count();

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
        return ['totalUsers' =>  $countUsers, 'metrics' => $res];
    }
}
