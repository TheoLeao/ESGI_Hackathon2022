<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Question;
use App\Models\Response;
use App\Models\Session;
use App\Models\User;
use App\Models\UserSession;
use Carbon\Carbon;
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

    public function getDashboardMetrics()
    {
        $months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];
        $month = now()->month;

        $users = User::where("created_at", ">", Carbon::now()->subMonths(12))
            ->orderBy('created_at')
            ->get()
            ->groupBy(function ($d) {
                return Carbon::parse($d->date)->format('F');
            })
            ->map
            ->count();

        $usersResult = [];

        $campaigns = Campaign::where("created_at", ">", Carbon::now()->subMonths(12))
            ->orderBy('created_at')
            ->get()
            ->groupBy(function ($d) {
                return Carbon::parse($d->date)->format('F');
            })
            ->map
            ->count();

        $campaignsResult = [];

        $sessions = User::where("created_at", ">", Carbon::now()->subMonths(12))
            ->orderBy('created_at')
            ->get()
            ->groupBy(function ($d) {
                return Carbon::parse($d->date)->format('F');
            })
            ->map
            ->count();

        $sessionsResult = [];

        $userSessions = UserSession::join('sessions', 'sessions.id', '=', 'user_sessions.session_id')
            ->where("user_sessions.created_at", ">", Carbon::now()->subMonths(12))
            ->where("sessions.created_at", ">", Carbon::now()->subMonths(12))
            ->orderBy('user_sessions.created_at')
            ->get()
            ->groupBy(function ($d) {
                return Carbon::parse($d->date)->format('F');
            })
            ->map
            ->count();

        $userSessionsResult = [];

        $ordered_months = array_merge(array_slice($months, $month - 10), array_slice($months, 0, $month + 1));

        foreach ($ordered_months as $month) {
            $usersResult[$month] = $users[$month] ?? 0;
            $campaignsResult[$month] = $campaigns[$month] ?? 0;
            $sessionsResult[$month] = $sessions[$month] ?? 0;
            $userSessionsResult[$month] = $userSessions[$month] ?? 0;
        }

        return response()->json(array('users' => $usersResult, 'campaigns' => $campaignsResult, 'sessions' => $sessionsResult, 'userSessions' => $userSessionsResult));
    }
}
